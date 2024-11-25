import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, PersonalDetailsData, QuestionDetail } from "../../../Store/Store";

import { openNotificationSuccess, PatchAxios, PostAxios } from "../../../Components/Assets/Api/Api";

import DynamicTableRow from "../../../Components/Assets/Dynamic/DynamicTableRow";
import InnerModal from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import CashFlowHomeLoan from "./CashFlowHomeLoan";
import CashFlowTotalCost from "./CashFlowTotalCost";

const CashFlowFamilyHome = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let PersonalData = useRecoilValue(PersonalDetailsData);

  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

  let [dis, setDis] = useState("");
  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let familyHome =
    Object.keys(questionDetail.familyHome || {}).length > 0
      ? questionDetail.familyHome
      : {
        client: [],
        partner: [],
        joint: [],
      }; // Use an empty object as default if familyHome is undefined

  let initialValues = {
    expectedGrowthRate: "2.50%",
    sellPropertyInYear: "No",
    yearOfPurchase: familyHome.currentValue ? "Existing" : "",
  };

  useEffect(() => { }, []);

  const fillInitialValues = (setFieldValue) => {
    console.log(familyHome);
    setFieldValue(`address`, PersonalData.client.clientHomeAddress || "");
    if (familyHome && familyHome._id) {
      setFieldValue(`currentValue`, familyHome.currentValue || "");
      setFieldValue(`clientOwnership`, familyHome.clientOwnership || "");
      setFieldValue(`partnerOwnership`, familyHome.partnerOwnership || "");

      setFieldValue(`loanBalance`, familyHome.loanAttached || "");

    }
  };


  const sellPropertyInYearNo = [
    { value: "No", label: "No" },
    ...Array.from({ length: 30 }, (_, i) => ({
      value: (i + 1).toString(),
      label: "Year " + (i + 1),
    })),
  ];

  const indexation = Array.from({ length: 21 }, (_, i) => ({
    value: (i * 0.5).toFixed(2) + "%",
    label: (i * 0.5).toFixed(2) + "%",
  }));

  const yearOfPurchaseExisting = [
    { value: "Existing", label: "Existing" },
    ...Array.from({ length: 30 }, (_, i) => ({
      value: (i + 1).toString(),
      label: "Year " + (i + 1),
    })),
  ];

  let onSubmit = async (values) => {
    console.log(values);
    return;
  };

  let handleInnerModal = (title, values, key) => {
    // console.log(values);

    setModalObject({
      title,
      values,
      key,
    });
    setFlagState(true);
  };

  let CalculatePercentage = (values, setFieldValue, CurrentInput, stakeHolder) => {
    // console.log(values, setFieldValue, CurrentInput, stakeHolder);

    let clientOwnership = values.clientOwnership.replace(/[^0-9.]+/g, "") || 0;
    let partnerOwnership = values.partnerOwnership.replace(/[^0-9.]+/g, "") || 0;

    switch (CurrentInput.name) {
      case "clientOwnership":
        clientOwnership = CurrentInput.value.replace(/[^0-9.]+/g, "");
        setFieldValue("partnerOwnership", (100 - (clientOwnership > 100 ? 100 : clientOwnership)).toFixed(2) + "%")
        break;
      case "partnerOwnership":
        partnerOwnership = CurrentInput.value.replace(/[^0-9.]+/g, "");
        setFieldValue("clientOwnership", (100 - (partnerOwnership > 100 ? 100 : partnerOwnership)).toFixed(2) + "%")
        break;
      default:
        console.log("Ma nahi Btao gha")
        break;
    }
  }

  const rowConfig = [
    {
      name: "address",
      type: "text",
      placeholder: "Address",
      disabled: true,
    },
    {
      name: "currentValue",
      type: "number-toComma",
      placeholder: "Current Value",

    },
    {
      name: "clientOwnership",
      type: "number-toPercent",
      callBack: true,
      func: CalculatePercentage,
      placeholder: "Client Ownership",

    },
    {
      name: "partnerOwnership",
      type: "number-toPercent",
      callBack: true,
      func: CalculatePercentage,
      placeholder: "Partner Ownership",
    },
    {
      name: "yearOfPurchase",
      type: "select",
      options: yearOfPurchaseExisting,
    },

    {
      name: "totalCostBase",
      innerModalTitle: "Total Cost Base",
      type: "number-toComma-Modal",
      placeholder: "Total Cost Base",
      callBack: true,
      key: "totalCostBase",
      func: handleInnerModal,
    },

    {
      name: "loanBalance",
      innerModalTitle: "Home Loan",
      type: "yesnoModal",
      callBack: true,
      key: "familyHomeLoan",
      func: handleInnerModal,
    },
    {
      name: "expectedGrowthRate",
      type: "select",
      options: indexation,
    },
    {
      name: "sellPropertyInYear",
      type: "select",
      options: sellPropertyInYearNo,
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          setDis(values.loanAttached);
        }, [values]);

        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <InnerModal
                    modalObject={modalObject}
                    setFieldValue={setFieldValue}
                    setFlagState={setFlagState}
                    flagState={flagState}
                  >
                    {modalObject.key === "familyHomeLoan" ? (
                      <CashFlowHomeLoan />
                    ) : modalObject.key === "totalCostBase" ? (
                      <CashFlowTotalCost />
                    ) : (
                      ""
                    )}
                  </InnerModal>

                  <div className="mt-2">
                    <Table striped bordered responsive hover>
                      <thead>
                        <tr>
                          <th>Street Address</th>
                          <th>Current Value/Purchase Price </th>
                          <th>Client Ownership</th>
                          <th>Partner Ownership</th>
                          <th>Year Of Purchase</th>
                          <th>Total Cost Base</th>
                          <th>Loan Balance</th>
                          <th>Expected Growth Rate</th>
                          <th>Sell Property In Year</th>
                        </tr>
                      </thead>
                      <tbody>
                        <DynamicTableRow
                          rowConfig={rowConfig}
                          values={values}
                          setFieldValue={setFieldValue}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
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

export default CashFlowFamilyHome;
