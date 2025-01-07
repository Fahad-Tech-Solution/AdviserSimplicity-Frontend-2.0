import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import DynamicTableRow from "../../../Components/Assets/Dynamic/DynamicTableRow";
import InnerModal from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import CashFlowLoanBelanceLVR from "./CashFlowLoanBelanceLVR";

const CashFlowHomeLoan = (props) => {

  /*
     This component is a dynamic and reusable modal component designed to handle the following modal types:
     1. "Home Loan"  inner Modal
     2. "Financial Investment/Investment Loan/Loan Balance" inner Modal
     3. "SMSF/Investment Loan/Loan Balance" inner Modal
     4. "Family trust Investment Loan/Loan Balance" inner Modal
 
     TODO-IMPORTANT:
     - Ensure any changes to this component are planned carefully to avoid unintended effects on all supported modals.
     - If specific modifications are required for one modal type, consider implementing targeted logic or extensions 
       to maintain the integrity of the shared functionality.
 */


  let initialValues = {
    loanTerm: "30",
    "repayLoanInYear": "No",
    "deductibleInterest": "100%",
  };

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let [addInputFlag, setAddInputFlag] = useState(false);
  let [clientPartnerPer, setClientPartnerPer] = useState(false);

  let DeductibleInterestFormsArray = ["SMSF Investment Properties", "Investments Property", "Family Trust Investment Properties"];
  let clientPartnerPercentageFormsArray = ["SMSF Investment Properties", "Family Trust Investment Properties"];

  const fillInitialValues = (setFieldValue) => {
    console.log(props.modalObject.ParentObject, "kuch Chala");
    console.log(clientPartnerPercentageFormsArray.includes(props.modalObject.ParentObject.title), "clientPartnerPercentageFormsArray.includes(props.modalObject.ParentObject.title)")
    console.log(DeductibleInterestFormsArray.includes(props.modalObject.ParentObject.title), "DeductibleInterestFormsArray.includes(props.modalObject.ParentObject.title)")

    setAddInputFlag(DeductibleInterestFormsArray.includes(props.modalObject.ParentObject.title));
    setClientPartnerPer(clientPartnerPercentageFormsArray.includes(props.modalObject.ParentObject.title));

    console.log("Home Loan");
    if (Object.keys(props.modalObject.values[props.modalObject.key] || {}).length > 0) {
      let Data = props.modalObject.values[props.modalObject.key]
      setFieldValue("loanBalance", Data.loanBalance || Data.LoanBalance)
      setFieldValue("loanBalanceCashFlowLoanBelanceLVR", Data.loanBalanceCashFlowLoanBelanceLVR || {
        loanAmount: Data.loanBalance || Data.LoanBalance || "",
      } || {})
      setFieldValue("loanType", Data.loanType || Data.LoanType || "")
      setFieldValue("loanTerm", Data.loanTerm || Data.LoanTerm || "30")
      setFieldValue("initialInterestRatePA", Data.initialInterestRatePA || Data.interestRatePA || Data.InterestRate || "")
      setFieldValue("minimumRepaymentsPA", Data.minimumRepaymentsPA)
      setFieldValue("actualAnnualRepayments", Data.actualAnnualRepayments || Data.annualRepayments || Data.AnnualRepayments || "")
      setFieldValue("repayLoanInYear", Data.repayLoanInYear || "No")

      if (DeductibleInterestFormsArray.includes(props.modalObject.ParentObject.title)) {
        setFieldValue("deductibleInterest", Data.deductibleInterest || Data.DeductibleLoanAmount || "100%")
      }

    }
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

    if (!addInputFlag) {
      values.deductibleInterest = undefined;
    }

    props.setFieldValue(props.modalObject.key, values);

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
      ParentObject: props.modalObject,
      clientPartnerPer,
    });
    setFlagState(true);
  };

  const rowConfig = [

    {
      name: "loanBalance",
      innerModalTitle: "Loan Balance",
      type: "number-toComma-Modal",
      placeholder: "Loan Balance",
      disabled: true,
      key: "loanBalance",
      func: handleInnerModal,
      callBack: true,
    },
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
      disabled: true,
    },
    {
      name: "actualAnnualRepayments",
      type: "number-toComma",
      placeholder: "Actual Annual Repayments",
    },
    {
      name: "repayLoanInYear",
      type: "select",
      options: repayInYearNo,
    },
  ];



  const rowConfigWithDeductibleInterest = [
    ...rowConfig.slice(0, 4), // Slice the array up to the index of 'initialInterestRatePA'
    {
      name: "deductibleInterest",
      type: "number-toPercent",
      placeholder: "Deductible Interest %",
    },
    ...rowConfig.slice(4) // Slice the array from the index of 'minimumRepaymentsPA' onwards
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
        }, []);

        return (
          <Form>
            <InnerModal
              modalObject={modalObject}
              setFieldValue={setFieldValue}
              setFlagState={setFlagState}
              flagState={flagState}

            >
              {modalObject.key === "loanBalance" ? (
                <CashFlowLoanBelanceLVR />
              ) : ''}
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
                          {addInputFlag && <th>Deductible interest %</th>}
                          <th>Minimum Repayments (p.a)</th>
                          <th>Actual Annual Repayments</th>
                          <th>Repay Loan in Year</th>

                        </tr>
                      </thead>
                      <tbody>
                        <DynamicTableRow
                          // rowConfig={rowConfig}
                          rowConfig={addInputFlag ? rowConfigWithDeductibleInterest : rowConfig}
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
