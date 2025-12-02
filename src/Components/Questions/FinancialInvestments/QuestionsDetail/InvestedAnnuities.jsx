// InvestedAnnuities.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form } from "formik";
import { useRecoilValue } from "recoil";
import { ConfigProvider, Select } from "antd";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";
import InnerModal from "./InnerModal";
import PortfolioValue from "./PortfolioValue";
import MemberNumber from "./MemberNumber";
import GroupInsurance from "./GroupInsurance";
import Contributions from "./Contributions";
import Beneficiaries from "./Beneficiaries";
import AnnualPensionPaymentInnerModal from "./AnnualPensionPaymentInnerModal";

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

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const InvestedAnnuities = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const bankDetailObj = useRecoilValue(BankDetail);
  const DefaultUrl = useRecoilValue(defaultUrl);

  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  const [nameSet] = useState(() => {
    if (props.modalObject.Input === "client")
      return localStorage.getItem("UserName") || "";
    else if (props.modalObject.Input === "partner")
      return localStorage.getItem("PartnerName") || "";
    else if (props.modalObject.Input === "joint")
      return (
        (localStorage.getItem("UserName") || "") +
        " & " +
        (localStorage.getItem("PartnerName") || "")
      );
    return "";
  });

  const existingData =
    props.modalObject.values?.[
      props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "")
    ]?.[props.modalObject.Input + "Array"] || [];

  const initialValues = {
    NumberOfMap: existingData.length || "",
    investedAnnuities: existingData.length ? existingData : [],
  };

  const fillInitialValues = (setFieldValue) => {
    if (existingData.length) {
      setFieldValue("investedAnnuities", existingData);
      setFieldValue("NumberOfMap", existingData.length);
    }
  };

  const handleInput = (e, setFieldValue) => {
    const raw = e?.target?.value ?? e;
    const value = raw > 10 ? 10 : raw;
    setFieldValue("NumberOfMap", value);

    const arrLength = Number(value) || 0;
    const newArray = Array(arrLength)
      .fill()
      .map((_, i) => ({
        productProvider: "",
        accountNumber: "",
        sourceFunds: "",
        originalInvestmentAmount: "",
        returnCapitalValue: "",
        annualAnnuityPayment: "",
        annualPensionPaymentArray: [],
        annuityType: "",
        term: "",
        yearsMaturity: "",
        nominatedBeneficiaries: "",
        beneficiariesArray: [],
        annualAdvice: "",
        ...(initialValues.investedAnnuities[i] || {}),
      }));
    setFieldValue("investedAnnuities", newArray);
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

    const selectedPlatformId =
      values?.[BaseKey]?.[index]?.productProvider ||
      values?.[BaseKey]?.[index]?._id ||
      "";

    // for balanceBenefitDetailsArray we don't force selection; original did not require platform select here
    if (!selectedPlatformId) {
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        "Please! Select Provider Name First"
      );
      return false;
    }

    setModalObject({
      title: `${RenderName(
        props.modalObject.stakeHolder.replace(".", "")
      )}${replacePlaceholderWithLabel(
        bankDetailObj?.Annuities?.map((elem) => ({
          value: elem._id,
          label: elem.platformName,
        })),
        values?.[BaseKey]?.[index]?.productProvider,
        innerModalTitle
      )}`,
      question,
      key,
      stakeHolder,
      editArray: values?.[BaseKey]?.[index]?.[key] || [],
      values,
      ParentModalObject: props.modalObject,
    });
    setFlagState(true);
  };

  const onSubmit = async (values) => {
    const DataOf = props.modalObject.Input;
    const newEntries = values.investedAnnuities || [];

    const total = newEntries.reduce((sum, entry) => {
      const val = parseFloat(
        (entry.originalInvestmentAmount || "0").replace(/[^0-9.-]+/g, "")
      );
      return sum + val;
    }, 0);

    // set parent's field with the array
    props.setFieldValue(
      props.modalObject.stakeHolder + DataOf + "Array",
      newEntries
    );

    props.setFieldValue(
      props.modalObject.stakeHolder + "currentBalance",
      toCommaAndDollar(total)
    );

    props.modalObject.setShowError?.((prev) => ({
      ...prev,
      [`${DataOf + "CurrentBalance"}Error`]: false,
      [`${DataOf + "CurrentBalance"}Message`]: "",
    }));

    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `Year ${i + 1}`,
  }));

  const columns = [
    {
      title: "No#",
      dataIndex: "owner",
      key: "owner",
      width: 60,
    },
    {
      title: "Product Provider",
      dataIndex: "productProvider",
      key: "productProvider",
      type: "select",
      options:
        bankDetailObj?.Annuities?.map((elem) => ({
          value: elem._id,
          label: elem.platformName,
        })) || [],
      placeholder: "Select Provider",
      selectedOptionValue: true,
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
      type: "number",
      placeholder: "Account Number",
    },
    {
      title: "Source of Funds",
      dataIndex: "sourceFunds",
      key: "sourceFunds",
      type: "select",
      options: [
        { value: "Ordinary", label: "Ordinary" },
        { value: "Super", label: "Super" },
      ],
      placeholder: "Select Source",
    },
    {
      title: "Original Investment Amount",
      dataIndex: "originalInvestmentAmount",
      key: "originalInvestmentAmount",
      type: "number-toComma",
      placeholder: "Investment Amount",
    },
    {
      title: "Return of Capital Value",
      dataIndex: "returnCapitalValue",
      key: "returnCapitalValue",
      type: "number-toComma",
      placeholder: "Return of Capital",
    },
    {
      title: "Annual Annuity Payment",
      dataIndex: "annualAnnuityPayment",
      key: "annualAnnuityPayment",
      type: "number-toComma-Modal",
      innerModalTitle: "_<CFE>_Annual Annuity Payment",
      func: (innerModalTitle, values, key, stakeHolder) =>
        handleInnerModal(
          innerModalTitle,
          key,
          stakeHolder,
          values,
          "Annual Pension Payment"
        ),
    },
    {
      title: "Annuity Type",
      dataIndex: "annuityType",
      key: "annuityType",
      type: "select",
      options: [
        { value: "Fixed Term", label: "Fixed Term" },
        { value: "Lifetime", label: "Lifetime" },
      ],
      placeholder: "Select Type",
    },
    {
      title: "Term",
      dataIndex: "term",
      key: "term",
      type: "select",
      options: loanTermOptions,
      placeholder: "Select Term",
      conditionalDisable: (record, values) =>
        values?.[record.baseKey]?.[record.index]?.annuityType === "Lifetime",
    },
    {
      title: "Years to Maturity",
      dataIndex: "yearsMaturity",
      key: "yearsMaturity",
      type: "select",
      options: loanTermOptions,
      placeholder: "Select Years",
      conditionalDisable: (record, values) =>
        values?.[record.baseKey]?.[record.index]?.annuityType === "Lifetime",
    },
    {
      title: "Nominated Beneficiaries",
      dataIndex: "nominatedBeneficiaries",
      key: "nominatedBeneficiaries",
      type: "yesnoModal",
      innerModalTitle: "_<CFE>_Beneficiaries",
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
      title: "Annual Advice Service Fee",
      dataIndex: "annualAdvice",
      key: "annualAdvice",
      type: "number-toComma",
      placeholder: "Annual Fee",
    },
  ];

  const componentMapping = {
    nominatedBeneficiaries: <Beneficiaries />,
    annualAnnuityPayment: <AnnualPensionPaymentInnerModal />,
  };

  const ModalContent = (obj) => componentMapping[obj.key] || null;

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [existingData]);

        const dataRows = useMemo(() => {
          const num = Number(values.NumberOfMap) || 0;
          if (num > 0) {
            return Array.from({ length: num }, (_, i) => ({
              key: `investedAnnuities.${i}`,
              owner: i + 1,
              stakeHolder: `investedAnnuities[${i}]`,
              productProvider:
                values.investedAnnuities?.[i]?.productProvider || "",
              accountNumber: values.investedAnnuities?.[i]?.accountNumber || "",
              sourceFunds: values.investedAnnuities?.[i]?.sourceFunds || "",
              originalInvestmentAmount:
                values.investedAnnuities?.[i]?.originalInvestmentAmount || "",
              returnCapitalValue:
                values.investedAnnuities?.[i]?.returnCapitalValue || "",
              annualAnnuityPayment:
                values.investedAnnuities?.[i]?.annualAnnuityPayment || "",
              annuityType: values.investedAnnuities?.[i]?.annuityType || "",
              term: values.investedAnnuities?.[i]?.term || "",
              yearsMaturity: values.investedAnnuities?.[i]?.yearsMaturity || "",
              nominatedBeneficiaries:
                values.investedAnnuities?.[i]?.nominatedBeneficiaries || "",
              annualAdvice: values.investedAnnuities?.[i]?.annualAdvice || "",
            }));
          }
          return [];
        }, [values.NumberOfMap, values.investedAnnuities]);

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
                Number of Annuities
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
                    onChange={(value) =>
                      handleInput({ target: { value } }, setFieldValue)
                    }
                    onBlur={handleBlur}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  >
                    {Array.from({ length: 3 }, (_, i) => (
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

export default InvestedAnnuities;
