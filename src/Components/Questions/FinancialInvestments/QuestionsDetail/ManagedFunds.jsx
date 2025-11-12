import { Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  BankDetail,
  defaultUrl,
  QuestionDetail,
} from "../../../../Store/Store";
import {
  openNotificationSuccess,
  toCommaAndDollar,
  PostAxios,
  PatchAxios,
  RenderName,
} from "../../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";
import InnerModal from "./InnerModal";
import PortfolioValue from "./PortfolioValue";
import ServiceFee from "./ServiceFee";
import { ConfigProvider, Select } from "antd";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const ManagedFunds = (props) => {
  const bankDetailObj = useRecoilValue(BankDetail);

  const [ShowError, setShowError] = useState({});
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  const [title] = useState(() => {
    let currentTitle = props.modalObject.title;
    if (currentTitle.includes("_")) {
      currentTitle = currentTitle.split("_").slice(1).join("_");
    }
    return currentTitle;
  });

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

  // Existing data for that input type (client / partner / joint)
  const existingData =
    props.modalObject.values?.[
      props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "")
    ]?.[props.modalObject.Input + "Array"] || [];

  const initialValues = {
    NumberOfMap: existingData.length || "",
    managedFunds: existingData.length ? existingData : [],
  };

  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
    if (existingData.length) {
      setDynamicFields(Array(existingData.length).fill(""));
    }
  }, [existingData]);

  const fillInitialValues = (setFieldValue) => {
    if (existingData.length) {
      setFieldValue("managedFunds", existingData);
    }
  };

  const handleInput = (e, setFieldValue) => {
    const value = e.target.value > 5 ? 5 : e.target.value;
    setFieldValue("NumberOfMap", value);
    setDynamicFields(Array(Number(value)).fill(""));
    setFieldValue(
      "managedFunds",
      Array(Number(value))
        .fill()
        .map((_, i) => ({
          platformName: "",
          accountNumber: "",
          portfolioValue: "",
          portfolioArray: "",
          totalPortfolioCost: "",
          serviceFee: "",
          serviceFeeType: "",
          ...(initialValues.managedFunds[i] || {}),
        }))
    );
  };

  const handleInnerModal = (innerModalTitle, values, key, stakeHolder) => {
    let index = stakeHolder.replace(/[^0-9-]+/g, "");
    let BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");
    let selectedPlatformId = values?.[BaseKey]?.[index]?.platformName || "";
    if (!selectedPlatformId) {
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Please! select platform name first`
      );
      return false;
    }
    const platforms =
      title === "Platform Investments Detail" ||
      title == "SMSF Platform Investments Detail" ||
      title == "Family Trust Platform Investments Detail"
        ? bankDetailObj?.InvestmentPlatforms
        : bankDetailObj?.InvestmentBonds;

    let Platform =
      platforms?.find((elem) => elem._id === selectedPlatformId) || [];

    console.log(Platform);

    setModalObject({
      title:
        RenderName(props.modalObject.stakeHolder.replace(".", "")) +
        innerModalTitle,
      question: `How many Underlying Investments does ${RenderName(
        props.modalObject.stakeHolder.replace(".", "")
      )} have :`,
      key,
      stakeHolder,
      editArray: values?.[BaseKey]?.[index]?.[key + "Array"] || [],
      values,
      Platform,
    });
    setFlagState(true);
  };

  const InvestmentPlatformsBanks = [
    "Platform Investments Detail",
    "Family Trust Platform Investments Detail",
    "SMSF Platform Investments Detail",
  ];

  const CheckInputValue = (
    values,
    setFieldValue,
    currentInput,
    stakeHolder
  ) => {
    if (!stakeHolder) {
      return false;
    }

    let index = parseFloat(stakeHolder.replace(/[^0-9-]+/g, ""));
    let BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");

    const portfolioArray = values?.[BaseKey]?.[index]?.portfolioArray || [];
    const ExpectedSum = portfolioArray.reduce(
      (total, entry) =>
        total +
        parseFloat(entry.investmentValue?.replace(/[^0-9.-]+/g, "") || 0),
      0
    );
    const data = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, ""));
    if (ExpectedSum !== data) {
      setShowError((prev) => ({
        ...prev,
        [`portfolioValue${index}Error`]: true,
        [`portfolioValue${index}Message`]:
          "Total must equal the sum of all investment values filled in the popup. The sum is " +
          toCommaAndDollar(ExpectedSum),
      }));
    } else {
      setShowError((prev) => ({
        ...prev,
        [`portfolioValue${index}Error`]: false,
        [`portfolioValue${index}Message`]: "",
      }));
    }
  };

  const onSubmit = async (values) => {
    const DataOf = props.modalObject.Input;
    const fundData = values.managedFunds || [];

    console.log("Managed Fund Submit:", props.modalObject, values);

    // 🧮 Compute totals
    const totalFee = fundData.reduce(
      (sum, entry) =>
        sum +
        parseFloat(entry.serviceFee?.replace(/[^0-9.-]+/g, "") || 0) *
          parseFloat(entry.serviceFeeType || 1),
      0
    );

    const totalCostBase = fundData.reduce(
      (sum, entry) =>
        sum +
        parseFloat(entry.totalPortfolioCost?.replace(/[^0-9.-]+/g, "") || 0),
      0
    );

    // 🧾 Save computed values into Formik state
    props.setFieldValue(
      props.modalObject.stakeHolder + DataOf + "Array",
      fundData
    );

    props.setFieldValue(
      props.modalObject.stakeHolder + "currentBalance",
      toCommaAndDollar(totalCostBase)
    );

    props.setFieldValue(
      props.modalObject.stakeHolder + "costBase",
      toCommaAndDollar(totalFee)
    );

    // 🚫 Clear related validation errors (if any)
    props.modalObject.setShowError?.((prev) => ({
      ...prev,
      [`${DataOf + "currentBalance"}Error`]: false,
      [`${DataOf + "costBaseTemp"}Error`]: false,
    }));

    // 🏁 Close modal if flag is set
    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  const getPlatformOptions = () => {
    if (InvestmentPlatformsBanks.includes(title)) {
      return (
        bankDetailObj?.InvestmentPlatforms?.map((elem) => ({
          value: elem._id,
          label: elem.platformName,
        })) || []
      );
    }
    return (
      bankDetailObj?.InvestmentBonds?.map((elem) => ({
        value: elem._id,
        label: elem.platformName,
      })) || []
    );
  };

  const columns = [
    {
      title: "No#",
      dataIndex: "owner",
      key: "owner",
      width: 60,
    },
    {
      title: "Platform Name",
      dataIndex: "platformName",
      key: "platformName",
      type: "select",
      options: getPlatformOptions(),
      placeholder: "Select Platform",
      selectedOptionValue: true,
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
      type: "text",
      placeholder: "Account Number",
    },
    {
      title: "Portfolio Value",
      dataIndex: "portfolioValue",
      key: "portfolioValue",
      type: "number-toComma-Modal",
      placeholder: "Portfolio Value",
      innerModalTitle: "_Portfolio Value",
      callBack: true,
      inputChangeFunc: CheckInputValue,
      func: handleInnerModal,
      errorHandler: ShowError,
    },
    {
      title: "Total Costbase",
      dataIndex: "totalPortfolioCost",
      key: "totalPortfolioCost",
      type: "number-toComma",
      placeholder: "Portfolio Cost Base",
    },
    {
      title: "Annual Service Fee",
      dataIndex: "serviceFee",
      key: "serviceFee",
      type: "number-toComma-Modal",
      placeholder: "Service Fee",
      innerModalTitle: "_Service Fee",
      callBack: true,
      inputChangeFunc: CheckInputValue,
      func: handleInnerModal,
      errorHandler: ShowError,
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      innerRef={props.formRef}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [existingData]);

        const dataRows = useMemo(() => {
          const num = Number(values.NumberOfMap) || 0;
          if (num > 0) {
            return Array.from({ length: num }, (_, i) => ({
              key: `managedFund.${i}`,
              owner: i + 1,
              stakeHolder: `managedFunds[${i}]`,
              platformName: values.managedFunds?.[i]?.platformName || "",
              accountNumber: values.managedFunds?.[i]?.accountNumber || "",
              portfolioValue: values.managedFunds?.[i]?.portfolioValue || "",
              portfolioArray: values.managedFunds?.[i]?.portfolioArray || "",
              totalPortfolioCost:
                values.managedFunds?.[i]?.totalPortfolioCost || "",
              serviceFee: values.managedFunds?.[i]?.serviceFee || "",
              serviceFeeType: values.managedFunds?.[i]?.serviceFeeType || "",
            }));
          }
          return [];
        }, [values.NumberOfMap, values.managedFunds]);

        return (
          <Form>
            <InnerModal
              modalObject={modalObject}
              setFieldValue={setFieldValue}
              setFlagState={setFlagState}
              flagState={flagState}
            >
              {modalObject.key === "portfolioValue" ? (
                <PortfolioValue />
              ) : modalObject.key === "serviceFee" ? (
                <ServiceFee />
              ) : (
                ""
              )}
            </InnerModal>

            <div className="d-flex justify-content-center align-items-center gap-4">
              <p className="text-end mt-1 pt-2 ">
                How many Platforms does {nameSet} have :
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
                    value={values.NumberOfMap || undefined}
                    onChange={(value) => {
                      handleInput({ target: { value } }, setFieldValue);
                    }}
                    onBlur={handleBlur}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  >
                    {Array.from({ length: 5 }, (_, i) => (
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
                  handleChange={handleChange}
                  handleBlur={handleBlur}
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

export default ManagedFunds;
