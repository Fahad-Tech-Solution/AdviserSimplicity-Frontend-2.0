import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  defaultUrl,
  PersonalDetailsData,
  QuestionDetail,
} from "../../../Store/Store";
// import { openNotificationSuccess, PatchAxios, PostAxios } from "../../Assets/Api/Api";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
} from "../../../Components/Assets/Api/Api";

import { FaRegBuilding } from "react-icons/fa6";
// import DynamicTableRow from "../../../Components/Assets/Dynamic/DynamicTableRow";
// import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";

// import HomeLoan from "./HomeLoan";
import { object } from "yup";
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

  useEffect(() => {}, []);

  const fillInitialValues = (setFieldValue) => {
    console.log(familyHome);
    setFieldValue(`address`, PersonalData.client.clientHomeAddress || "");
    if (familyHome && familyHome._id) {
      setFieldValue(`currentValue`, familyHome.currentValue || "");
      setFieldValue(`clientOwnership`, familyHome.clientOwnership || "");
      setFieldValue(`partnerOwnership`, familyHome.partnerOwnership || "");

      // setFieldValue(`costBase`, familyHome.costBase || "");

      setFieldValue(`loanBalance`, familyHome.loanAttached || "");
      // setFieldValue(`HomeLoanModal`, familyHome.HomeLoanModal || "");

      // setFieldValue(`loanAmount`, familyHome?.HomeLoanModal?.loanBalance || "");
      // setFieldValue(`annualRepayments`, familyHome?.HomeLoanModal?.annualRepayments || "");
    }
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

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

    let obj = {
      currentValue: values.currentValue,
      costBase: values.costBase,
      clientOwnership: values.clientOwnership,
      partnerOwnership: values.partnerOwnership,
      loanAttached: values.loanAttached,

      HomeLoanModal:
        values.loanAttached === "Yes"
          ? Object.keys(values.HomeLoanModal).length > 0
            ? values.HomeLoanModal
            : undefined
          : undefined,
      // loanAmount: values.loanAmount,
      // annualRepayments: values.annualRepayments,
    };

    obj.clientFK = localStorage.getItem("UserID");

    // Calculate total currentBalance

    obj["clientTotal"] = obj.currentValue;

    console.log(obj, "final obj");

    const bankAccountArray = familyHome.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(`${DefaultUrl}/api/familyHome/Add`, obj);
      } else {
        res = await PatchAxios(`${DefaultUrl}/api/familyHome/Update`, obj);
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, familyHome: res };
        setQuestionDetail(updatedData);
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        'Data of "' + props.modalObject.title + '" is Saved'
      );
      // Reset the flag state if necessary
      if (props.flagState) {
        props.setFlagState(false);
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        'Data of "' +
          props.modalObject.title +
          '" is not Saved Please! try again'
      );
    }
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
      placeholder: "Client Ownership",
    },
    {
      name: "partnerOwnership",
      type: "number-toPercent",
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
                          {/* <th>No#</th> */}
                          <th>Street Address</th>
                          <th>Current Value</th>
                          {/* <th>Cost base</th> */}
                          <th>Client Ownership</th>
                          <th>Partner Ownership</th>
                          <th>Year Of Purchase</th>
                          <th>Total Cost Base</th>
                          <th>Loan Balance</th>
                          <th>Expected Growth Rate</th>
                          <th>Sell Propertry In Year</th>
                          {/* <th>Loan Attached</th> */}
                          {/* <th>Loan Amount</th> */}
                          {/* <th>Annual Repayments</th> */}
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
