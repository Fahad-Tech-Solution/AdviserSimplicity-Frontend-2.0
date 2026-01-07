import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Row } from "react-bootstrap";

import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";
import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";

import LumpsumNonConcessionalNonConcessional from "./LumpsumNonConcessionalNonConcessional";
import DownSizerContributionNonConcessional from "./DownSizerContributionNonConcessional";
import ApplySpouseContribution from "./ApplySpouseContribution";
import { RenderName } from "../../Components/Assets/Api/Api";

const AntdTable = DynamicTableForInputsSection("antd");

const NonConcessionalContributions = (props) => {
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  /* ===============================
     Initial Values
  =============================== */
  const initialValues = {
    lumpsumNonConcessionalYearOne: "",
    contributionsToFund: "",
    lumpsumNonConcessional: "",
    lumpsumNonConcessionalObj: {},
    regularNonConcessional: "",
    yearCommence: "",
    yearsInclude: "",
    contributionsFund: "",
    governmentCoContribution: "",
    downSizerContribution: "",
    downSizerContributionObj: {},
    applySpouseContribution: "",
    applySpouseContributionObj: {},
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

  const contributionsFundOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "SMSF", label: "SMSF" },
  ];

  const contributionsToFundOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
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
      title: "Lumpsum Non-Concessional (Year 1 only)",
      placeholder: "Lumpsum Non-Concessional (Year 1 only)",
      dataIndex: "lumpsumNonConcessionalYearOne",
      key: "lumpsumNonConcessionalYearOne",
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
      title: "Lumpsum Non-Concessional",
      dataIndex: "lumpsumNonConcessional",
      key: "lumpsumNonConcessional",
      type: "yesnoModal",
      innerModalTitle: "Lumpsum Non - Concessional",
      callBack: true,
      func: handleInnerModal,
    },
    {
      title: "Regular Non-Concessional",
      placeholder: "Regular Non-Concessional",
      dataIndex: "regularNonConcessional",
      key: "regularNonConcessional",
      type: "number-toComma",
    },
    {
      title: "Year to Commence",
      dataIndex: "yearCommence",
      key: "yearCommence",
      type: "select",
      selectedOptionValue: true,
      options: yearsIncludedOptions,
    },
    {
      title: "Years to Include",
      dataIndex: "yearsInclude",
      key: "yearsInclude",
      type: "select",
      selectedOptionValue: true,
      options: yearsIncludedOptions,
    },
    {
      title: "Contributions Fund",
      dataIndex: "contributionsFund",
      key: "contributionsFund",
      type: "select",
      selectedOptionValue: true,
      options: contributionsFundOptions,
    },
    {
      title: "Government Co-contribution to",
      dataIndex: "governmentCoContribution",
      key: "governmentCoContribution",
      type: "select",
      selectedOptionValue: true,
      options: contributionsToFundOptions,
    },
    {
      title: "Downsizer Contribution",
      dataIndex: "downSizerContribution",
      key: "downSizerContribution",
      type: "yesnoModal",
      innerModalTitle: "Downsizer contribution",
      callBack: true,
      func: handleInnerModal,
    },
    {
      title: "Apply Spouse Contribution",
      dataIndex: "applySpouseContribution",
      key: "applySpouseContribution",
      type: "yesnoModal",
      innerModalTitle: "Apply Spouse Contribution",
      callBack: true,
      func: handleInnerModal,
    },
  ];

  /* ===============================
     Modal Content Mapping
  =============================== */
  const componentMapping = {
    "Lumpsum Non - Concessional": <LumpsumNonConcessionalNonConcessional />,
    "Downsizer contribution": <DownSizerContributionNonConcessional />,
    "Apply Spouse Contribution": <ApplySpouseContribution />,
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
            key: "nonConcessionalRow",
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

export default NonConcessionalContributions;
