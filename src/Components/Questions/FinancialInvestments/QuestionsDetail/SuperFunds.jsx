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
  replacePlaceholderWithLabel,
} from "../../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";
import InnerModal from "./InnerModal";
import PortfolioValue from "./PortfolioValue";
import MemberNumber from "./MemberNumber";
import GroupInsurance from "./GroupInsurance";
import Contributions from "./Contributions";
import Beneficiaries from "./Beneficiaries";
import { ConfigProvider, Select } from "antd";
import ServiceFee from "./ServiceFee";

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
    let StackHolder = props.modalObject.stakeHolder.replace(".", "");

    if (StackHolder === "client") {
      return localStorage.getItem("UserName");
    } else if (StackHolder === "partner") {
      return localStorage.getItem("PartnerName");
    } else if (StackHolder === "joint") {
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
    props.modalObject.values?.[
      props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "")
    ]?.[props.modalObject.Input + "Array"] || [];

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

  const handleInnerModal = (
    innerModalTitle,
    key,
    stakeHolder,
    values,
    type,
    question
  ) => {
    const index = parseFloat(stakeHolder.replace(/[^0-9-]+/g, ""));
    const BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");

    const selectedPlatformId = values?.[BaseKey]?.[index]?.platformName || "";

    if (!selectedPlatformId) {
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

    let title = `${RenderName(
      props.modalObject.stakeHolder.replace(".", "")
    )}_${replacePlaceholderWithLabel(
      bankDetailObj?.SuperannuationFunds?.map((elem) => ({
        value: elem._id,
        label: elem.platformName,
      })),
      values?.[BaseKey]?.[index].platformName,
      innerModalTitle
    )}`;

    setModalObject({
      title,
      question,
      key,
      stakeHolder,
      editArray:
        key === "annualAdvice"
          ? values?.[BaseKey]?.[index]?.[key + "Array"] || []
          : values?.[BaseKey]?.[index]?.[key] || [],
      values,
      Platform,
      ParentModalObject: props.modalObject,
    });
    setFlagState(true);
  };

  // const CheckInputValue = (
  //   values,
  //   setFieldValue,
  //   currentInput,
  //   stakeHolder
  // ) => {
  //   const index = parseFloat(stakeHolder.replace(/[^0-9-]+/g, ""));
  //   const BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");

  //   const portfolioArray = values?.[BaseKey]?.[index]?.portfolioArray || [];
  //   const ExpectedSum = portfolioArray.reduce(
  //     (total, entry) =>
  //       total +
  //       parseFloat(entry.investmentValue?.replace(/[^0-9.-]+/g, "") || 0),
  //     0
  //   );

  //   const data = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, ""));
  //   if (ExpectedSum !== data) {
  //     setShowError((prev) => ({
  //       ...prev,
  //       [`portfolioValue${index}Error`]: true,
  //       [`portfolioValue${index}Message`]:
  //         "Total must equal the sum of all investment values in the popup. The sum is " +
  //         toCommaAndDollar(ExpectedSum),
  //     }));
  //   } else {
  //     setShowError((prev) => ({
  //       ...prev,
  //       [`portfolioValue${index}Error`]: false,
  //       [`portfolioValue${index}Message`]: "",
  //     }));
  //   }
  // };

  const onSubmit = async (values) => {
    const DataOf = props.modalObject.Input;
    const fundData = values.superFunds || [];

    const totalAdvice = fundData.reduce(
      (sum, entry) =>
        sum + parseFloat(entry.balanceBenefit?.replace(/[^0-9.-]+/g, "") || 0),
      0
    );

    props.setFieldValue(
      props.modalObject.stakeHolder + DataOf + "Array",
      fundData
    );
    props.setFieldValue(
      props.modalObject.stakeHolder + "currentBalance",
      toCommaAndDollar(totalAdvice)
    );

    props.modalObject.setShowError?.((prev) => ({
      ...prev,
      [`${DataOf + "currentBalance"}Error`]: false,
      [`${DataOf + "currentBalance"}Message`]: "",
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
      title: "Balance and Details",
      dataIndex: "balanceBenefit",
      key: "balanceBenefit",
      type: "number-toComma-Modal",
      disabled: true,
      innerModalTitle: "<CFE>_Balnace and Benefits",
      placeholder: "Balance Benefit",
      func: (innerModalTitle, values, key, stakeHolder) =>
        handleInnerModal(
          innerModalTitle,
          key,
          stakeHolder,
          values,
          "Balance Benefit Details",
          `How many Benefit Details and Components do ${nameSet} have ?`
        ),
    },
    {
      title: "Group Insurance Attached",
      dataIndex: "groupInsurance",
      key: "groupInsurance",
      type: "yesnoModal",
      innerModalTitle: "<CFE>_Group Insurance",
      placeholder: "Group Insurance",
      callBack: true,
      func: (innerModalTitle, values, key, stakeHolder) =>
        handleInnerModal(
          innerModalTitle,
          key,
          stakeHolder,
          values,
          "Group Insurance",
          `How many Group Insurance ${nameSet} have :`
        ),
    },
    {
      title: "Contributions",
      dataIndex: "contributions",
      key: "contributions",
      type: "yesnoModal",
      innerModalTitle: "<CFE>_Contributions",
      placeholder: "Contributions",
      callBack: true,
      func: (innerModalTitle, values, key, stakeHolder) =>
        handleInnerModal(
          innerModalTitle,
          key,
          stakeHolder,
          values,
          "<CFE>_Contributions",
          `Financial year Start Date:`
        ),
    },
    {
      title: "Nominated Beneficiaries",
      dataIndex: "nominatedBeneficiaries",
      key: "nominatedBeneficiaries",
      type: "yesnoModal",
      innerModalTitle: "<CFE>_Beneficiaries",
      placeholder: "Beneficiaries",
      callBack: true,
      func: (innerModalTitle, values, key, stakeHolder) =>
        handleInnerModal(
          innerModalTitle,
          key,
          stakeHolder,
          values,
          "Beneficiaries",
          `Number of Beneficiaries:`
        ),
    },
    {
      title: "Annual Service Fee",
      dataIndex: "annualAdvice",
      key: "annualAdvice",
      type: "number-toComma-Modal",
      placeholder: "Annual Service Fee",
      innerModalTitle: "_<CFE>_Annual Ongoing Fee",
      callBack: true,
      func: (innerModalTitle, values, key, stakeHolder) =>
        handleInnerModal(
          innerModalTitle,
          key,
          stakeHolder,
          values,
          "Beneficiaries",
          `Number of Beneficiaries:`
        ),
      errorHandler: ShowError,
      disabled: true,
    },
  ];

  let componentMapping = {
    portfolioArray: <PortfolioValue />,
    balanceBenefit: <MemberNumber />,
    groupInsurance: <GroupInsurance />,
    contributions: <Contributions />,
    nominatedBeneficiaries: <Beneficiaries />,
    annualAdvice: <ServiceFee />,
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
              // portfolioValue: values.superFunds?.[i]?.portfolioValue || "",
              balanceBenefitDetails:
                values.superFunds?.[i]?.balanceBenefitDetails || "",
              balanceBenefit: values.superFunds?.[i]?.balanceBenefit || "",
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
              setIsEditing={props.setIsEditing}
            >
              {ModalContent(modalObject)}
            </InnerModal>

            <div className="d-flex justify-content-center align-items-center gap-4">
              <p
                className="text-end mt-1 pt-2"
                onClick={() => {
                  console.log(values);
                }}
              >
                Number of Super Funds
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
                      setFieldValue("NumberOfMap", value);
                    }}
                    onBlur={handleBlur}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  >
                    {Array.from({ length: 10 }, (_, i) => (
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
          </Form>
        );
      }}
    </Formik>
  );
};

export default SuperFunds;
