import { Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../../Store/Store";
import {
  toCommaAndDollar,
  openNotificationSuccess,
  PostAxios,
  PatchAxios,
} from "../../../Assets/Api/Api";
import axios from "axios";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";
import {
  Alert,
  Button,
  ConfigProvider,
  message,
  Select,
  Space,
  Tooltip,
} from "antd";
import { FaInfoCircle } from "react-icons/fa";
import * as Yup from "yup";
import { IoReload, IoWarning } from "react-icons/io5";

const ShareSchema = Yup.object().shape({
  NumberOfMap: Yup.number().nullable(),
  shares: Yup.array().of(
    Yup.object().shape({
      ASXCode: Yup.string()
        .nullable()
        .matches(/^[A-Za-z0-9]+\.AX$/, "Format must be ASX Stock Code.AX"),
      companyName: Yup.string().nullable(),
      sharePrice: Yup.string().nullable(),
      // shares: Yup.string().nullable(),
      shares: Yup.string()
        .nullable()
        .when("companyName", {
          is: (val) => val && val.trim() !== "",
          then: (schema) => schema.required("Shares is required"),
        }),
      costBase: Yup.string().nullable(),
      currentBalance: Yup.string().nullable(),
    }),
  ),
});

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const AustralianShares = (props) => {
  // const questionDetail = useRecoilValue(QuestionDetail);
  const [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);

  const Data = questionDetail[props.modalObject.key] || {};

  // 🏷️ Clean title
  const [title] = useState(() => {
    let currentTitle = props.modalObject.title;
    if (currentTitle.includes("_")) {
      currentTitle = currentTitle.split("_").slice(1).join("_");
    }
    return currentTitle;
  });

  const existingData =
    props.modalObject.values?.[
      props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "")
    ]?.[props.modalObject.Input + "Array"] || [];

  const initialValues = {
    NumberOfMap: existingData.length || "",
    shares: existingData.length ? existingData : [],
  };

  const [dynamicFields, setDynamicFields] = useState([]);
  const [previousDataExists, setPreviousDataExists] = useState(false);
  const [updatingData, setUpdatingData] = useState(false);
  const DefaultUrl = useRecoilValue(defaultUrl);

  useEffect(() => {
    if (existingData.length) {
      setDynamicFields(Array(existingData.length).fill(""));
    }
  }, [existingData]);

  const fillInitialValues = (setFieldValue) => {
    if (existingData.length) {
      setFieldValue("shares", existingData);
      setPreviousDataExists(true);
    } else {
      props.setIsEditing(true);
      setPreviousDataExists(false);
    }
  };

  const handleASXCodeChange = async (
    values,
    setFieldValue,
    input,
    stakeHolder,
  ) => {
    let code = input.value.toUpperCase();
    let index = stakeHolder.replace(/[^0-9-]+/g, "");

    if (!code.endsWith(".AX")) {
      input.classList.add("is-invalid");
      return;
    } else {
      input.classList.remove("is-invalid");
    }

    setFieldValue(`shares[${index}].ASXCode`, code);

    const settings = {
      headers: {
        "X-RapidAPI-Key": "5e10294d2amsh7867e98a73e61abp176da5jsn21b129bfc40a",
        "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      },
    };

    try {
      const res = await axios.get(
        `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=AU&symbols=${code}`,
        settings,
      );
      const company = res?.data?.quoteResponse?.result?.[0];

      if (company) {
        setFieldValue(`shares[${index}].companyName`, company.longName || "");
        setFieldValue(
          `shares[${index}].sharePrice`,
          "$" + (company.regularMarketPrice || 0),
        );
        if (values.shares?.[index]?.shares) {
          setFieldValue(
            `shares[${index}].currentBalance`,
            toCommaAndDollar(
              company.regularMarketPrice * values.shares[index].shares,
            ),
          );
        }
      } else {
        clearFields(setFieldValue, index);
        alert("This company does not exist");
      }
    } catch (error) {
      console.error(error);
      clearFields(setFieldValue, index);
    }
  };

  const clearFields = (setFieldValue, index) => {
    const fields = [
      "ASXCode",
      "companyName",
      "sharePrice",
      "shares",
      "costBase",
      "currentBalance",
    ];
    fields.forEach((f) => setFieldValue(`shares[${index}].${f}`, ""));
  };

  const handleUpdateShares = async (values, setFieldValue) => {
    setUpdatingData(true);
    // console.log("Data:", Data, "key:", props.modalObject);
    const settings = {
      headers: {
        "X-RapidAPI-Key": "5e10294d2amsh7867e98a73e61abp176da5jsn21b129bfc40a",
        "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      },
    };

    // Filter shares that have valid ASX codes
    const sharesToUpdate = values.shares
      .map((share, index) => ({ share, index }))
      .filter(
        ({ share }) =>
          share?.ASXCode && share.ASXCode.match(/^[A-Za-z0-9]+\.AX$/),
      );

    if (sharesToUpdate.length === 0) {
      alert("No valid ASX codes to update");
      return;
    }

    try {
      // Make all API calls in parallel
      const updatePromises = sharesToUpdate.map(({ share, index }) =>
        axios
          .get(
            `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=AU&symbols=${share.ASXCode}`,
            settings,
          )
          .then((res) => ({
            index,
            company: res?.data?.quoteResponse?.result?.[0],
            success: true,
          }))
          .catch((error) => ({
            index,
            success: false,
            error,
          })),
      );

      const results = await Promise.all(updatePromises);

      // Update form fields with results
      results.forEach(({ index, company, success }) => {
        if (success && company) {
          const sharePrice = "$" + (company.regularMarketPrice || 0);
          return { index, sharePrice };
        }
      });

      results.forEach(({ index, company, success }) => {
        if (success && company) {
          const sharePrice = "$" + (company.regularMarketPrice || 0);

          setFieldValue(`shares[${index}].sharePrice`, sharePrice);
          setFieldValue(`shares[${index}].companyName`, company.longName || "");

          // Recalculate balance if shares count exists
          if (values.shares?.[index]?.shares) {
            setFieldValue(
              `shares[${index}].currentBalance`,
              toCommaAndDollar(
                company.regularMarketPrice * values.shares[index].shares,
              ),
            );
          }
        }
      });

      // Clone shares to avoid mutating form state
      const updatedShares = values.shares.map((share) => ({ ...share }));

      results.forEach(({ index, company, success }) => {
        if (!success || !company || !updatedShares[index]) return;

        const price = company.regularMarketPrice || 0;
        const sharesCount = Number(updatedShares[index].shares || 0);

        updatedShares[index] = {
          ...updatedShares[index],
          sharePrice: "$" + (price || 0),
          companyName: company.longName || "",
          currentBalance: toCommaAndDollar(price * sharesCount),
        };
      });

      // message.success("Share prices updated successfully!");
      // props.setIsEditing(!props.isEditing);

      /** 🔹 Call DB Update API AFTER all updates */
      if (results.length) {
        let payload = {
          ...Data,
          [props.modalObject.stakeHolder.replace(".", "")]: updatedShares,
          [props.modalObject.stakeHolder.replace(".", "") + "CurrentBalance"]:
            toCommaAndDollar(
              updatedShares
                .slice(0, values.NumberOfMap)
                .reduce(
                  (t, e) =>
                    t +
                    parseFloat(
                      (e.currentBalance || "$0").replace(/[^0-9.-]+/g, ""),
                    ),
                  0,
                ),
            ),
          [props.modalObject.stakeHolder.replace(".", "") + "CostBaseTemp"]:
            toCommaAndDollar(
              updatedShares
                .slice(0, values.NumberOfMap)
                .reduce(
                  (t, e) =>
                    t +
                    parseFloat((e.costBase || "$0").replace(/[^0-9.-]+/g, "")),
                  0,
                ),
            ),
          [props.modalObject.stakeHolder.replace(".", "") + "Total"]:
            toCommaAndDollar(
              parseFloat(
                updatedShares
                  .slice(0, values.NumberOfMap)
                  .reduce(
                    (t, e) =>
                      t +
                      parseFloat(
                        (e.currentBalance || "$0").replace(/[^0-9.-]+/g, ""),
                      ),
                    0,
                  ),
              ) +
                parseFloat(
                  Data.jointCurrentBalance.replace(/[^0-9.-]+/g, "") || 0,
                ) /
                  2,
            ),
        };

        // return false;
        let res = await PatchAxios(
          DefaultUrl + "/api/" + props.modalObject.key + "/Update",
          payload,
        );

        if (res) {
          console.log("DB Update Response:", res);

          setQuestionDetail((prev) => ({
            ...prev,
            [props.modalObject.key]: res,
          }));
          message.success("Share prices updated successfully!");
        }
      }
    } catch (error) {
      console.error("Error updating shares:", error);
      message.error("Failed to update share prices. Please try again.");
    } finally {
      setUpdatingData(false);
    }
  };

  const calculateBalance = (values, setFieldValue, input, stakeHolder) => {
    if (!stakeHolder) return;

    const index = stakeHolder.replace(/[^0-9-]+/g, "");
    const BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");

    let sharePrice = parseFloat(
      values?.[BaseKey]?.[index]?.sharePrice.replace(/[^0-9.-]+/g, "") || 0,
    );
    let shareCount = parseFloat(values?.[BaseKey]?.[index]?.shares || 0);

    switch (input.name) {
      case `${stakeHolder}sharePrice`:
        sharePrice = input.value.replace(/[^0-9.-]+/g, "");
        break;
      default:
        shareCount = input.value;
        break;
    }

    setFieldValue(
      stakeHolder + "currentBalance",
      toCommaAndDollar(shareCount * sharePrice),
    );
  };

  const onSubmit = async (values) => {
    console.log("Submitted Values:", values);

    const count =
      Number(values.NumberOfMap || 0) || values.bankAccounts?.length || 0;

    const shares = Array.isArray(values.shares)
      ? values.shares.slice(0, count)
      : [];

    const DataOf = props.modalObject.Input;

    const newEntries = shares.map((entry) => ({ ...entry }));

    const total = newEntries.reduce(
      (t, e) =>
        t + parseFloat((e.currentBalance || "$0").replace(/[^0-9.-]+/g, "")),
      0,
    );
    const totalCostBase = newEntries.reduce(
      (t, e) => t + parseFloat((e.costBase || "$0").replace(/[^0-9.-]+/g, "")),
      0,
    );

    props.setFieldValue(
      props.modalObject.stakeHolder + DataOf + "Array",
      newEntries || [],
    );

    props.setFieldValue(
      props.modalObject.stakeHolder + "currentBalance",
      toCommaAndDollar(total),
    );

    props.setFieldValue(
      props.modalObject.stakeHolder + "costBase",
      toCommaAndDollar(totalCostBase),
    );

    props.modalObject.setShowError?.((prev) => ({
      ...prev,
      [`${DataOf + "currentBalance"}Error`]: false,
      [`${DataOf + "costBaseTemp"}Error`]: false,
    }));

    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  const columns = [
    {
      title: "No#",
      dataIndex: "owner",
      key: "owner",
      width: 60,
    },
    {
      title: (
        <>
          ASX Code{" "}
          <Tooltip
            title={
              "Correct format: Use the ASX code followed by “.AX” Example: QAN.AX (Qantas)"
            }
          >
            <FaInfoCircle />
          </Tooltip>
        </>
      ),
      dataIndex: "ASXCode",
      key: "ASXCode",
      type: "text",
      placeholder: "ASX Code",
      callBack: true,
      CheckError: true,
      func: handleASXCodeChange,
      // ✅ CONDITIONAL ATTRIBUTE for sorting
      ...(!props?.isEditing && {
        sorter: (a, b) => {
          const valA = (a.ASXCode || "").toString().toUpperCase();
          const valB = (b.ASXCode || "").toString().toUpperCase();
          return valA.localeCompare(valB);
        },
      }),
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      type: "text",
      placeholder: "Company Name",
      disabled: true,
      // ✅ CONDITIONAL ATTRIBUTE for sorting
      ...(!props?.isEditing && {
        sorter: (a, b) => {
          const valA = (a.companyName || "").toString().toUpperCase();
          const valB = (b.companyName || "").toString().toUpperCase();
          return valA.localeCompare(valB);
        },
      }),
    },
    {
      title: "Share Price",
      dataIndex: "sharePrice",
      key: "sharePrice",
      type: "text",
      disabled: true,
      // ✅ CONDITIONAL ATTRIBUTE for sorting
      ...(!props?.isEditing && {
        sorter: (a, b) => {
          const parse = (val) =>
            parseFloat(String(val || "0").replace(/[^0-9.-]+/g, "")) || 0;

          return parse(a.sharePrice) - parse(b.sharePrice);
        },
      }),
    },
    {
      title: "Shares",
      dataIndex: "shares",
      key: "shares",
      type: "number",
      placeholder: "Number of Shares",
      CheckError: true,
      callBack: true,
      func: calculateBalance,
      disabled: (values, stakeHolder) => {
        const index = stakeHolder.replace(/[^0-9-]+/g, "");
        const BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");
        return !values?.[BaseKey]?.[index]?.sharePrice;
      },
    },
    {
      title: "Cost Base",
      dataIndex: "costBase",
      key: "costBase",
      type: "number-toComma",
      placeholder: "Cost Base",
      disabled: (values, stakeHolder) => {
        const index = stakeHolder.replace(/[^0-9-]+/g, "");
        const BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");
        return !values?.[BaseKey]?.[index]?.sharePrice;
      },
    },
    {
      title: "Current Balance",
      dataIndex: "currentBalance",
      key: "currentBalance",
      type: "number-toComma",
      disabled: true,
      // ✅ CONDITIONAL ATTRIBUTE for sorting
      ...(!props?.isEditing && {
        sorter: (a, b) => {
          const parse = (val) =>
            parseFloat(String(val || "0").replace(/[^0-9.-]+/g, "")) || 0;

          return parse(a.currentBalance) - parse(b.currentBalance);
        },
      }),
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      innerRef={props.formRef}
      validationSchema={ShareSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, handleBlur, handleChange }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [existingData]);

        const dataRows = useMemo(() => {
          const num = Number(values.NumberOfMap) || 0;
          return Array.from({ length: num }, (_, i) => ({
            key: `share.${i}`,
            stakeHolder: `shares[${i}]`,
            owner: i + 1,
            ASXCode: values.shares?.[i]?.ASXCode || "",
            companyName: values.shares?.[i]?.companyName || "",
            sharePrice: values.shares?.[i]?.sharePrice || "",
            shares: values.shares?.[i]?.shares || "",
            costBase: values.shares?.[i]?.costBase || "",
            currentBalance: values.shares?.[i]?.currentBalance || "",
          }));
        }, [values.NumberOfMap, values.shares]);

        return (
          <Form>
            <div className="d-flex justify-content-center align-items-center gap-4">
              <p
                className="text-end mt-1 pt-2"
                onClick={() => {
                  console.log(values);
                }}
              >
                Number of {title} :
              </p>
              <div style={{ minWidth: "10%" }}>
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        colorBorder: "#36b446",
                      },
                    },
                  }}
                >
                  <Select
                    id="NumberOfMap"
                    name="NumberOfMap"
                    className="w-100 h-100"
                    placeholder="Select"
                    size="large"
                    disabled={!props?.isEditing}
                    value={values.NumberOfMap || undefined}
                    onChange={(value) => {
                      setFieldValue("NumberOfMap", value);
                    }}
                    onBlur={handleBlur}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  >
                    {Array.from({ length: 50 }, (_, i) => (
                      <Option key={i} value={i + 1}>
                        {i + 1}
                      </Option>
                    ))}
                  </Select>
                </ConfigProvider>
              </div>
            </div>

            {previousDataExists && (
              <Alert
                type="warning"
                showIcon
                icon={<IoWarning />}
                message={
                  <Space
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Please press this button to update share price</span>

                    <Button
                      type="default"
                      icon={<IoReload />}
                      onClick={() => {
                        handleUpdateShares(values, setFieldValue);
                      }} // your function
                    />
                  </Space>
                }
              />
            )}

            {values.NumberOfMap && (
              <div className="mt-4 All_Client reportSection">
                <AntdTable
                  columns={columns}
                  data={dataRows}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  pagination={true} // 🚫 pagination removed
                  handleSubmit={props?.handleOk}
                  isEditing={props?.isEditing}
                  setIsEditing={props?.setIsEditing}
                  deleteButton={true}
                  loading={updatingData}
                />
              </div>
            )}

            <button type="submit" style={{ display: "none" }}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AustralianShares;
