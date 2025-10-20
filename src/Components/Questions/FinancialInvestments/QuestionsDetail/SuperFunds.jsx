import { Formik, Form } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  BankDetail,
  QuestionDetail,
  defaultUrl,
} from "../../../../Store/Store";
import {
  openNotificationSuccess,
  toCommaAndDollar,
  RenderName,
} from "../../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";
import InnerModal from "./InnerModal";
import PortfolioValue from "./PortfolioValue";
import MemberNumber from "./MemberNumber";
import GroupInsurance from "./GroupInsurance";
import Contributions from "./Contributions";
import Beneficiaries from "./Beneficiaries";
import { ConfigProvider, Select } from "antd";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const SuperFunds = (props) => {
  const bankDetailObj = useRecoilValue(BankDetail);
  const questionDetail = useRecoilValue(QuestionDetail);
  const [ShowError, setShowError] = useState({});
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  // Determine name based on stakeholder
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

  // Load existing data if available
  const existingData =
    questionDetail.superAnnuationIssues?.[props.modalObject.Input] || [];

  const initialValues = {
    NumberOfMap: existingData.length || "",
    superFunds: existingData.length ? existingData : [],
  };

  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
    if (existingData.length) {
      setDynamicFields(Array(existingData.length).fill(""));
    }
  }, [existingData]);

  const fillInitialValues = (setFieldValue) => {
    if (existingData.length) {
      setFieldValue("superFunds", existingData);
    }
  };

  const handleInput = (e, setFieldValue) => {
    const value = e.target.value > 10 ? 10 : e.target.value;
    setFieldValue("NumberOfMap", value);
    setDynamicFields(Array(Number(value)).fill(""));
    setFieldValue(
      "superFunds",
      Array(Number(value))
        .fill()
        .map((_, i) => ({
          platformName: "",
          memberNumber: "",
          portfolioValue: "",
          portfolioArray: "",
          balanceBenefitDetails: "",
          balanceBenefitDetailsArray: "",
          groupInsurance: "",
          groupInsuranceArray: "",
          contributions: "",
          ContributionsArray: "",
          nominatedBeneficiaries: "",
          beneficiariesArray: "",
          annualAdvice: "",
          ...(initialValues.superFunds[i] || {}),
        }))
    );
  };

  const handleInnerModal = (
    innerModalTitle,
    key,
    stakeHolder,
    values,
    type
  ) => {
    const index = parseFloat(stakeHolder.replace(/[^0-9-]+/g, ""));
    const BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");

    const selectedPlatformId = values?.[BaseKey]?.[index]?.platformName || "";
    if (!selectedPlatformId && key === "portfolioArray") {
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        "Please! Select Platform Name First"
      );
      return false;
    }

    const Platform =
      bankDetailObj?.SuperannuationFunds?.find(
        (elem) => elem._id === selectedPlatformId
      ) || [];

    setModalObject({
      title: `${RenderName(props.modalObject.Input)}${innerModalTitle}`,
      question: `Enter details for ${nameSet}'s ${type}`,
      key,
      stakeHolder,
      editArray: values?.[BaseKey]?.[index]?.[key] || [],
      values,
      Platform,
    });
    setFlagState(true);
  };

  const CheckInputValue = (
    values,
    setFieldValue,
    currentInput,
    stakeHolder
  ) => {
    const index = parseFloat(stakeHolder.replace(/[^0-9-]+/g, ""));
    const BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");

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
          "Total must equal the sum of all investment values in the popup. The sum is " +
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
    const fundData = values.superFunds || [];

    const totalAdvice = fundData.reduce(
      (sum, entry) =>
        sum + parseFloat(entry.annualAdvice?.replace(/[^0-9.-]+/g, "") || 0),
      0
    );

    props.setFieldValue(DataOf, fundData);
    props.setFieldValue(
      DataOf + "currentBalance",
      toCommaAndDollar(totalAdvice)
    );

    props.modalObject.setShowError?.((prev) => ({
      ...prev,
      [`${DataOf + "currentBalance"}Error`]: false,
      [`${DataOf + "currentBalance"}Message`]: "",
    }));

    if (props.flagState) props.setFlagState(false);
  };

  const columns = [
    {
      title: "No#",
      dataIndex: "owner",
      key: "owner",
      width: 60,
    },
    {
      title: "Fund Name",
      dataIndex: "platformName",
      key: "platformName",
      type: "select",
      options:
        bankDetailObj?.SuperannuationFunds?.map((elem) => ({
          value: elem._id,
          label: elem.platformName,
        })) || [],
      placeholder: "Select Fund",
      selectedOptionValue: true,
    },
    {
      title: "Member Number",
      dataIndex: "memberNumber",
      key: "memberNumber",
      type: "text",
      placeholder: "Member Number",
    },
    {
      title: "Portfolio Value",
      dataIndex: "portfolioValue",
      key: "portfolioValue",
      type: "number-toComma-Modal",
      innerModalTitle: "_Portfolio Value",
      placeholder: "Portfolio Value",
      callBack: true,
      inputChangeFunc: CheckInputValue,
      func: (title, stakeHolder, values) =>
        handleInnerModal(
          title,
          "portfolioArray",
          stakeHolder,
          values,
          "Portfolio Value"
        ),
      errorHandler: ShowError,
    },
    {
      title: "Balance & Benefit Details",
      dataIndex: "balanceBenefitDetails",
      key: "balanceBenefitDetails",
      type: "number-toComma-Modal",
      innerModalTitle: "_Balance & Benefit Details",
      placeholder: "Balance Benefit",
      callBack: true,
      func: (title, stakeHolder, values) =>
        handleInnerModal(
          title,
          "balanceBenefitDetailsArray",
          stakeHolder,
          values,
          "Balance Benefit Details"
        ),
    },
    {
      title: "Group Insurance Attached",
      dataIndex: "groupInsurance",
      key: "groupInsurance",
      type: "yesnoModal",
      innerModalTitle: "_Group Insurance",
      placeholder: "Group Insurance",
      callBack: true,
      func: (title, stakeHolder, values) =>
        handleInnerModal(
          title,
          "groupInsuranceArray",
          stakeHolder,
          values,
          "Group Insurance"
        ),
    },
    {
      title: "Contributions",
      dataIndex: "contributions",
      key: "contributions",
      type: "yesnoModal",
      innerModalTitle: "_Contributions",
      placeholder: "Contributions",
      callBack: true,
      func: (title, stakeHolder, values) =>
        handleInnerModal(
          title,
          "ContributionsArray",
          stakeHolder,
          values,
          "Contributions"
        ),
    },
    {
      title: "Nominated Beneficiaries",
      dataIndex: "nominatedBeneficiaries",
      key: "nominatedBeneficiaries",
      type: "yesnoModal",
      innerModalTitle: "_Beneficiaries",
      placeholder: "Beneficiaries",
      callBack: true,
      func: (title, stakeHolder, values) =>
        handleInnerModal(
          title,
          "beneficiariesArray",
          stakeHolder,
          values,
          "Beneficiaries"
        ),
    },
    {
      title: "Annual Advice Fee",
      dataIndex: "annualAdvice",
      key: "annualAdvice",
      type: "number-toComma",
      placeholder: "Annual Fee",
    },
  ];

  let componentMapping = {
    portfolioArray: <PortfolioValue />,
    balanceBenefitDetailsArray: <MemberNumber />,
    groupInsuranceArray: <GroupInsurance />,
    ContributionsArray: <Contributions />,
    beneficiariesArray: <Beneficiaries />,
  };

  const ModalContent = (obj) => {
    return componentMapping[obj.key] || null;
  };

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
              key: `superFunds.${i}`,
              owner: i + 1,
              stakeHolder: `superFunds[${i}]`,
              platformName: values.superFunds?.[i]?.platformName || "",
              memberNumber: values.superFunds?.[i]?.memberNumber || "",
              portfolioValue: values.superFunds?.[i]?.portfolioValue || "",
              balanceBenefitDetails:
                values.superFunds?.[i]?.balanceBenefitDetails || "",
              groupInsurance: values.superFunds?.[i]?.groupInsurance || "",
              contributions: values.superFunds?.[i]?.contributions || "",
              nominatedBeneficiaries:
                values.superFunds?.[i]?.nominatedBeneficiaries || "",
              annualAdvice: values.superFunds?.[i]?.annualAdvice || "",
            }));
          }
          return [];
        }, [values.NumberOfMap, values.superFunds]);

        return (
          <Form>
            <InnerModal
              modalObject={modalObject}
              setFieldValue={setFieldValue}
              setFlagState={setFlagState}
              flagState={flagState}
            >
              {ModalContent(modalObject)}
            </InnerModal>

            <div className="d-flex justify-content-center align-items-center gap-4">
              <p className="text-end mt-1 pt-2">
                How many Super Funds does {nameSet} have:
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
                    {Array.from({ length: 20 }, (_, i) => (
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
                />
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default SuperFunds;
