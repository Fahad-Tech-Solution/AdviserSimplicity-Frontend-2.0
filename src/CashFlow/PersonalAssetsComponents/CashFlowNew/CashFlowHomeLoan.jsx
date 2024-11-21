import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { BankDetail, defaultUrl, QuestionDetail } from "../../../Store/Store";
import DynamicTableRow from "../../../Components/Assets/Dynamic/DynamicTableRow";
import InnerModal from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import CashFlowLoanBelanceLVR from "./CashFlowLoanBelanceLVR";

const CashFlowHomeLoan = (props) => {
  let initialValues = {
  loanTerm:"30",
  "repayLoanInYear":"No"
  };
  let questionDetail = useRecoilValue(QuestionDetail);

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});
  let bankDetailObj = useRecoilValue(BankDetail);

  let [lenderOption, setLenderOption] = useState(() => {
    if (!bankDetailObj?.FinancialInstitutions) return [];

    // Create an options array
    const optionsArray = bankDetailObj.FinancialInstitutions.map((elem) => ({
      value: elem._id,
      label: elem.platformName,
    }));

    return optionsArray;
  });

  let familyHome =
  Object.keys(questionDetail.familyHome || {}).length > 0
    ? questionDetail.familyHome
    : {
        client: [],
        partner: [],
        joint: [],
      };


  const fillInitialValues = (setFieldValue) => {
    // console.log(props.modalObject, "kuch Chala");
    console.log("Home Loan");
    console.log("familyHome ", familyHome)
    setFieldValue(`costBaseExisting`, familyHome.costBase);
    setFieldValue(`initialInterestRatePA`, familyHome.HomeLoanModal.interestRatePA);
    setFieldValue(`loanType`, familyHome.HomeLoanModal.loanType);
    
};

  const repayInYearNo = [
    { value: "No", label: "No" },
    ...Array.from({ length: 30 }, (_, i) => ({
      value: (i + 1).toString(),
      label: "Year " + (i + 1),
    })),
  ];

  let onSubmit = async (values) => {
    console.log("values", values);

    props.setFieldValue(`HomeLoanModal`, values);
    props.setFieldValue(`loanAmount`, values.loanBalance);
    props.setFieldValue(`annualRepayments`, values.annualRepayments);

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
    value: (i + 1).toString(),
    label: ("Year " + (i + 1)).toString(),
  }));

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
      name: "loanBalance",
      innerModalTitle: "Loan Balance",
      type: "number-toComma-Modal",
      placeholder: "Loan Balance",
      key:"CashFlowLoanBelanceLVR",
      func: handleInnerModal,
      callBack: true,
    },

//     name: "totalCostBase",
//     innerModalTitle: "Total Cost Base",
//     type: "number-toComma-Modal",
//   //   callBack: true,
//     key: "totalCostBase",
//     func: handleInnerModal,
//   },
    {
      name: "loanType",
      type: "select",
      options: [
        { value: "i/only", label: "i/only" },
        { value: "P&i", label: "P&i" },
      ],
    },

    {
        name: "loanTerm",
        type: "select",
        options: loanTermOptions,
      },

      {
        name: "initialInterestRatePA",
        type: "number-toPercent",
        placeholder: "Interest Rate (p.a)",
      },
    {
      name: "minimumRepaymentsPA",
      type: "number-toComma",
      placeholder: "Minimum Repayments (p.a)",
  
    },

    {
      name: "actualAnnualRepayments",
      type: "number-toComma",
      placeholder: "Actual Annual Repayments",
    },


    // {
    //         innerModalTitle: "Loan to Value Ratio (LVR) ",
    //         type: "yesnoModal",
    //         callBack: true,
    //         name: "LoanToValueRatio",
    //         key: "LVR",
    //         func: handleInnerModal,
    // },

    {
      name: "repayLoanInYear",
      type: "select",
      options: repayInYearNo,
    },
  ];

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
        }, [values.NumberOfMap]);

        return (
          <Form>
            <InnerModal
              modalObject={modalObject}
              setFieldValue={setFieldValue}
              setFlagState={setFlagState}
              flagState={flagState}

            >
                {modalObject.key === "CashFlowLoanBelanceLVR" ? (
                      <CashFlowLoanBelanceLVR/>
                    ) :''}
            </InnerModal>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="mt-4">
                    <Table striped bordered responsive hover>
                      <thead>
                        <tr>
                          {/* <th>No#</th> */}
                   
                          <th>Loan Balance</th>
                          <th>Loan Type</th>
                          <th>Loan Term </th>
                          <th>Interest Rate (p.a)</th>
                          <th>Minimum Repayments (p.a)</th>
                          <th>Actual Annual Repayments</th>
                          <th>Repay Loan in Year</th>
                         
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
export default CashFlowHomeLoan;
