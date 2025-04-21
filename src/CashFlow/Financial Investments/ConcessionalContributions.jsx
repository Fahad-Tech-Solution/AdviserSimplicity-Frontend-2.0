import React, { useEffect, useState } from "react";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { Form, Formik } from "formik";
import { Row, Table } from "react-bootstrap";
import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import ContributionSplittingInner from "./ContributionSplittingInner";
import OtherPercentageAmount from "./OtherPercentageAmount";

const ConcessionalContributions = (props) => {
  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let initialValues = {
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

  let fillInitialValues = (setFieldValue) => {
    console.log(props.modalObject);

    if (
      props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]
    ) {
      let SubObj =
        props.modalObject.values[
          props.modalObject.stakeHolder.replace(".", "")
        ];
      if (SubObj[props.modalObject.key + "Obj"]) {
        let Data = SubObj[props.modalObject.key + "Obj"];
        setFieldValue("employerSGContributions", Data.employerSGContributions);
        setFieldValue("personalSalarySacrifice", Data.personalSalarySacrifice);
        setFieldValue(
          "personalSalarySacrificeObj",
          Data.personalSalarySacrificeObj
        );
        setFieldValue(
          "affordabilityOtherAmount",
          Data.affordabilityOtherAmount
        );
        setFieldValue("indexationOfOtherAmount", Data.indexationOfOtherAmount);
        setFieldValue("contributionsFund", Data.contributionsFund);
        setFieldValue("yearCommence", Data.yearCommence);
        setFieldValue("yearsInclude", Data.yearsInclude);
        setFieldValue("catchUpContribution", Data.catchUpContribution);
        setFieldValue("contributionsToFund", Data.contributionsToFund);
        setFieldValue("contributionSplitting", Data.contributionSplitting);
        setFieldValue(
          "contributionSplittingObj",
          Data.contributionSplittingObj
        );
      }
    }
  };

  let onSubmit = (values) => {
    console.log(JSON.stringify(values));

    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key + "Obj",
      values
    );

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  const yearsIncludedArray = Array.from({ length: 31 }, (_, i) => {
    return {
      value: i.toString(),
      label: ("Year " + i).toString(),
    };
  });

  const employerSGContributionsOptions = [
    { value: "SGC", label: "SGC" },
    { value: "Capped at Max", label: "Capped at Max" },
    { value: "Other", label: "Other" },
    { value: "Self-Employed", label: "Self-Employed" },
  ];

  const personalSalarySacrificeOptions = [
    { value: "Up Until CC Cap", label: "Up Until CC Cap" },
    { value: "Other", label: "Other" },
    { value: "Match Net Income", label: "Match Net Income" },
  ];

  const indexation = Array.from({ length: 11 }, (_, i) => ({
    value: (i * 0.5).toFixed(2) + "%",
    label: (i * 0.5).toFixed(2) + "%",
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

  let handleInnerModal = (title, values, key, stakeHolder) => {
    console.log(title, values, key, stakeHolder);
    setModalObject({
      title,
      values,
      key,
      stakeHolder: props.modalObject.stakeHolder,
    });
    setFlagState(true);
  };

  let rowConfig = [
    {
      type: "plainText",
      text: props.modalObject.stakeHolder.replace(".", ""),
      styleSet: { fontWeight: "800", fontSize: "16px" },
    },
    {
      name: "employerSGContributions",
      type: "select",
      options: employerSGContributionsOptions,
      placeholder: "Employer SG Contributions",
    },
    {
      name: "personalSalarySacrifice",
      type: "selectModal",
      options: personalSalarySacrificeOptions,
      placeholder: "Personal/Salary Sacrifice",
      ModalOption: "Other",
      innerModalTitle: "Other Percentage Amount",
      key: "personalSalarySacrifice",
      styleSet: { minWidth: "10vw" },
    },
    {
      name: "affordabilityOtherAmount",
      type: "number-toComma",
      placeholder: "Affordability amount (net p.a.) / Other Amount",
    },
    {
      name: "indexationOfOtherAmount",
      type: "select",
      options: indexation,
      placeholder: "Indexation of Other Amount",
    },
    {
      name: "contributionsFund",
      type: "select",
      options: contributionsFundOptions,
      placeholder: "Contributions To Fund",
    },
    {
      name: "yearCommence",
      type: "select",
      options: yearsIncludedArray,
      placeholder: "Year to Commence",
    },
    {
      name: "yearsInclude",
      type: "select",
      options: yearsIncludedArray,
      placeholder: "Years to Include",
    },
    {
      name: "catchUpContribution",
      type: "number-toComma",
      placeholder: "Catch Up contribution (Year 1 only)",
    },
    {
      name: "contributionsToFund",
      type: "select",
      options: contributionsToFundOptions,
      placeholder: "Contributions To Fund",
    },
    {
      name: "contributionSplitting",
      type: "yesnoModal",
      placeholder: "Contribution Splitting",
      callBack: true,
      key: "contributionSplitting",
      innerModalTitle: "Contribution Splitting",
      func: handleInnerModal,
    },
  ];

  const componentMapping = {
    "Other Percentage Amount": <OtherPercentageAmount />,
    "Contribution Splitting": <ContributionSplittingInner />,
  };

  const ModalContent = (obj) => {
    return componentMapping[obj.title] || null;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, handleChange, setFieldValue, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

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

              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="mt-4">
                    <Table striped bordered responsive hover>
                      <thead>
                        <tr>
                          <th>Owner</th>
                          <th>Employer SG Contributions</th>
                          <th>Personal/Salary Sacrifice</th>
                          <th>
                            Affordability amount (net p.a.) / Other Amount
                          </th>
                          <th>Indexation of Other Amount</th>
                          <th>Contributions To Fund</th>
                          <th>Year to Commence</th>
                          <th>Years to Include</th>
                          <th>Catch Up contribution (Year 1 only)</th>
                          <th>Contributions To Fund</th>
                          <th>Contribution Splitting</th>
                        </tr>
                      </thead>
                      <tbody>
                        <DynamicTableRow
                          rowConfig={rowConfig}
                          values={values}
                          setFieldValue={setFieldValue}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          handleInnerModal={handleInnerModal}
                        />
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ConcessionalContributions;
