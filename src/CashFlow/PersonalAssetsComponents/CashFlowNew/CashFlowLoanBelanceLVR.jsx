import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { BankDetail, defaultUrl, QuestionDetail } from "../../../Store/Store";
import DynamicTableRow from "../../../Components/Assets/Dynamic/DynamicTableRow";
import InnerModal from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";

const CashFlowLoanBelanceLVR = (props) => {
    let initialValues = {

    };

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});
    let bankDetailObj = useRecoilValue(BankDetail);



    let questionDetail = useRecoilValue(QuestionDetail);

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
    setFieldValue(`loanAmount`, familyHome.HomeLoanModal.loanBalance);
};
   


    let onSubmit = async (values) => {
        console.log("values", values);


        props.setFieldValue(`TotalCostModal`, values);
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
            name: "LVR",
            type: 'number-toPercent',
            placeholder: "LVR",

        },
        {
            name: "loanAmount",
            type: 'number-toComma',
            placeholder: "Loan Amount",

        },
        {
            name: "loanBalance",
            type: 'number-toComma',
            placeholder: "Loan Balance",

        },
        {
            name: "clientOwnership",
            type: 'number-toPercent',
            placeholder: "Client Ownership",

        },
   
        {
            name: "partnerOwnership",
            type: 'number-toPercent',
            placeholder: "Partner Ownership",
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
                                        
                                    </InnerModal>
                        <Row>
                            <div className="col-md-12">
                                <div className="row justify-content-center">
                                    <div className="mt-4">
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    {/* <th>No#</th> */}
                                                    <th>Loan to Value Ratio (LVR) </th>
                                                    <th>Loan Amount</th>
                                                    <th>Loan Balance</th>
                                                    <th>Client Ownership</th>
                                                    <th>Partner Ownership</th>
                                                    {/* <th>Frequency</th>
                                                    <th>Annual Repayments</th>
                                                    <th>Interest Rate (p.a)</th>
                                                    <th>Loan Term </th>
                                                    <th>Loan Term Remaining </th> */}
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
export default CashFlowLoanBelanceLVR;