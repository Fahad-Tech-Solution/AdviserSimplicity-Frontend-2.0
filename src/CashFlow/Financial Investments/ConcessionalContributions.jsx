import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";
import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import ContributionSplittingInner from "./ContributionSplittingInner";
import OtherPercentageAmount from "./OtherPercentageAmount";
import { RenderName } from "../../Components/Assets/Api/Api";

const AntdTable = DynamicTableForInputsSection("antd");

const ConcessionalContributions = (props) => {
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  /* ===============================
     Initial Values
  =============================== */
  const initialValues = {
    employerSGContributions: "",
    personalSalarySacrifice: "",
    personalSalarySacrificeObj: {},
    affordabilityOtherAmount: "",
    indexationOfOtherAmount: "",
    contributionsFund: "",
    yearCommence: "",
    yearsInclude: "",
    catchUpContribution: "",
    contributionsToFund: "",
    contributionSplitting: "",
    contributionSplittingObj: {},
  };

  /* ===============================
     Fill Initial Values
  =============================== */
  const fillInitialValues = (setFieldValue) => {
    const stakeKey = props.modalObject.stakeHolder.replace(".", "");
    const stored =
      props.modalObject.values?.[stakeKey]?.[props.modalObject.key + "Obj"];

    if (!stored) return;

    Object.entries(stored).forEach(([key, value]) => {
      setFieldValue(key, value);
    });
  };

  /* ===============================
     Submit
  =============================== */
  const onSubmit = (values) => {
    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key + "Obj",
      values
    );

    props?.setFlagState?.(false);
  };

  /* ===============================
     Options
  =============================== */
  const yearsIncludedOptions = Array.from({ length: 31 }, (_, i) => ({
    value: i.toString(),
    label: `Year ${i}`,
  }));

  const employerSGOptions = [
    { value: "SGC", label: "SGC" },
    { value: "Capped at Max", label: "Capped at Max" },
    { value: "Other", label: "Other" },
    { value: "Self-Employed", label: "Self-Employed" },
  ];

  const personalSalaryOptions = [
    { value: "Up Until CC Cap", label: "Up Until CC Cap" },
    { value: "Other", label: "Other" },
    { value: "Match Net Income", label: "Match Net Income" },
  ];

  const indexationOptions = Array.from({ length: 11 }, (_, i) => ({
    value: `${(i * 0.5).toFixed(2)}%`,
    label: `${(i * 0.5).toFixed(2)}%`,
  }));

  const contributionsFundOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "SMSF", label: "SMSF" },
  ];

  const contributionsToFundOptions = [
    { value: "1", label: "1" },
    { value: "SMSF", label: "SMSF" },
  ];

  /* ===============================
     Inner Modal Handler
  =============================== */
  const handleInnerModal = (title, values, key) => {
    setModalObject({
      title,
      values,
      key,
      stakeHolder: props.modalObject.stakeHolder,
    });
    setFlagState(true);
  };

  /* ===============================
     AntD Columns
  =============================== */
  const columns = [
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      type: "plainText2.0",
    },
    {
      title: "Employer SG Contributions",
      dataIndex: "employerSGContributions",
      key: "employerSGContributions",
      selectedOptionValue: true,
      type: "select",
      options: employerSGOptions,
    },
    {
      title: "Personal / Salary Sacrifice",
      dataIndex: "personalSalarySacrifice",
      key: "personalSalarySacrifice",
      type: "selectModal",
      options: personalSalaryOptions,
      ModalOption: "Other",
      innerModalTitle: "Other Percentage Amount",
      callBack: true,
      func: handleInnerModal,
    },
    {
      title: "Affordability / Other Amount",
      placholder: "Affordability / Other Amount",
      dataIndex: "affordabilityOtherAmount",
      key: "affordabilityOtherAmount",
      type: "number-toComma",
    },
    {
      title: "Indexation of Other Amount",
      dataIndex: "indexationOfOtherAmount",
      key: "indexationOfOtherAmount",
      selectedOptionValue: true,
      type: "select",
      options: indexationOptions,
    },
    {
      title: "Contributions Fund",
      dataIndex: "contributionsFund",
      key: "contributionsFund",
      selectedOptionValue: true,
      type: "select",
      options: contributionsFundOptions,
    },
    {
      title: "Year to Commence",
      dataIndex: "yearCommence",
      key: "yearCommence",
      selectedOptionValue: true,
      type: "select",
      options: yearsIncludedOptions,
    },
    {
      title: "Years to Include",
      dataIndex: "yearsInclude",
      key: "yearsInclude",
      selectedOptionValue: true,
      type: "select",
      options: yearsIncludedOptions,
    },
    {
      title: "Catch Up Contribution",
      placeholder: "Catch Up Contribution",
      dataIndex: "catchUpContribution",
      key: "catchUpContribution",
      type: "number-toComma",
    },
    {
      title: "Contributions To Fund",
      dataIndex: "contributionsToFund",
      key: "contributionsToFund",
      type: "select",
      options: contributionsToFundOptions,
      selectedOptionValue: true,
    },
    {
      title: "Contribution Splitting",
      dataIndex: "contributionSplitting",
      key: "contributionSplitting",
      type: "yesnoModal",
      innerModalTitle: "Contribution Splitting",
      callBack: true,
      func: handleInnerModal,
    },
  ];

  /* ===============================
     Modal Content Map
  =============================== */
  const componentMapping = {
    "Other Percentage Amount": <OtherPercentageAmount />,
    "Contribution Splitting": <ContributionSplittingInner />,
  };

  const ModalContent = (obj) => componentMapping[obj.title] || null;

  /* ===============================
     Render
  =============================== */
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        const tableData = [
          {
            key: "ownerRow",
            owner: RenderName(props.modalObject.stakeHolder.replace(".", "")),
            ...values,
          },
        ];

        return (
          <Form>
            <Row>
              <InnerModal
                modalObject={modalObject}
                setFieldValue={setFieldValue}
                setFlagState={setFlagState}
                flagState={flagState}
              >
                {ModalContent(modalObject)}
              </InnerModal>

              <div className="col-md-12 mt-4 All_Client reportSection">
                <AntdTable
                  columns={columns}
                  data={tableData}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  handleInnerModal={handleInnerModal}
                  isEditing={props?.isEditing}
                  setIsEditing={props?.setIsEditing}
                />
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ConcessionalContributions;
