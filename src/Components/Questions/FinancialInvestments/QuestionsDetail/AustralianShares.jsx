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
import { ConfigProvider, Select, Tooltip } from "antd";
import { FaInfoCircle } from "react-icons/fa";
import * as Yup from "yup";

const ShareSchema = Yup.object().shape({
  NumberOfMap: Yup.number().required("Required"),
  shares: Yup.array().of(
    Yup.object().shape({
      ASXCode: Yup.string()
        .nullable()
        .matches(/^[A-Za-z0-9]+\.AX$/, "Format must be NAME.AX"),
      companyName: Yup.string().nullable(),
      sharePrice: Yup.string().nullable(),
      shares: Yup.string().nullable(),
      costBase: Yup.string().nullable(),
      currentBalance: Yup.string().nullable(),
    })
  ),
});

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const AustralianShares = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  const DefaultUrl = useRecoilValue(defaultUrl);

  // 🏷️ Clean title
  const [title] = useState(() => {
    let currentTitle = props.modalObject.title;
    if (currentTitle.includes("_")) {
      currentTitle = currentTitle.split("_").slice(1).join("_");
    }
    return currentTitle;
  });

  // 👤 Set name based on Input type
  const [nameSet] = useState(() => {
    if (props.modalObject.Input === "client") {
      return localStorage.getItem("UserName");
    } else if (props.modalObject.Input === "partner") {
      return localStorage.getItem("PartnerName");
    } else if (props.modalObject.Input === "joint") {
      return (
        localStorage.getItem("UserName") +
        " & " +
        localStorage.getItem("PartnerName")
      );
    }
    return "";
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

  useEffect(() => {
    if (existingData.length) {
      setDynamicFields(Array(existingData.length).fill(""));
    }
  }, [existingData]);

  const fillInitialValues = (setFieldValue) => {
    if (existingData.length) {
      setFieldValue("shares", existingData);
    }
  };

  const handleInput = (e, setFieldValue) => {
    const value = e.target.value > 50 ? 50 : e.target.value;
    setFieldValue("NumberOfMap", value);
    setDynamicFields(Array(Number(value)).fill(""));
    setFieldValue(
      "shares",
      Array(Number(value))
        .fill()
        .map((_, i) => ({
          ASXCode: "",
          companyName: "",
          sharePrice: "",
          shares: "",
          costBase: "",
          currentBalance: "",
          ...(initialValues.shares[i] || {}),
        }))
    );
  };

  const handleASXCodeChange = async (
    values,
    setFieldValue,
    input,
    stakeHolder
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
        settings
      );
      const company = res?.data?.quoteResponse?.result?.[0];

      if (company) {
        setFieldValue(`shares[${index}].companyName`, company.longName || "");
        setFieldValue(
          `shares[${index}].sharePrice`,
          "$" + (company.regularMarketPrice || 0)
        );
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

  const calculateBalance = (values, setFieldValue, input, stakeHolder) => {
    if (!stakeHolder) return;

    const index = stakeHolder.replace(/[^0-9-]+/g, "");
    const BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");

    let sharePrice = parseFloat(
      values?.[BaseKey]?.[index]?.sharePrice.replace(/[^0-9.-]+/g, "") || 0
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
      toCommaAndDollar(shareCount * sharePrice)
    );
  };

  const onSubmit = async (values) => {
    const DataOf = props.modalObject.Input;
    const newEntries = values.shares.map((entry) => ({ ...entry }));

    const total = newEntries.reduce(
      (t, e) =>
        t + parseFloat((e.currentBalance || "$0").replace(/[^0-9.-]+/g, "")),
      0
    );
    const totalCostBase = newEntries.reduce(
      (t, e) => t + parseFloat((e.costBase || "$0").replace(/[^0-9.-]+/g, "")),
      0
    );

    props.setFieldValue(
      props.modalObject.stakeHolder + DataOf + "Array",
      newEntries
    );

    props.setFieldValue(
      props.modalObject.stakeHolder + "currentBalance",
      toCommaAndDollar(total)
    );

    props.setFieldValue(
      props.modalObject.stakeHolder + "costBase",
      toCommaAndDollar(totalCostBase)
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
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      type: "text",
      placeholder: "Company Name",
      disabled: true,
    },
    {
      title: "Share Price",
      dataIndex: "sharePrice",
      key: "sharePrice",
      type: "text",
      disabled: true,
    },
    {
      title: "Shares",
      dataIndex: "shares",
      key: "shares",
      type: "number",
      placeholder: "Number of Shares",
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
              <p className="text-end mt-1 pt-2">Number of {title} :</p>
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
                    value={values.NumberOfMap || undefined}
                    onChange={(value) => {
                      handleInput({ target: { value } }, setFieldValue);
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
