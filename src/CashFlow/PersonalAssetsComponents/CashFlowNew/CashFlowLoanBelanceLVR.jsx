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

    const fillInitialValues = (setFieldValue) => {
        try {
            if (Object.keys(props.modalObject.values[props.modalObject.key + "CashFlowLoanBelanceLVR"] || {}).length > 0) {
                let Data = props.modalObject.values[props.modalObject.key + "CashFlowLoanBelanceLVR"];
                setFieldValue("LVR", Data.LVR);
                setFieldValue("loanAmount", Data.loanAmount || "");
                setFieldValue("loanBalance", Data.loanBalance || "");
                setFieldValue("clientOwnership", Data.clientOwnership);
                setFieldValue("partnerOwnership", Data.partnerOwnership);
            }
            else if (props.modalObject && props.modalObject.ParentObject && props.modalObject.ParentObject.values) {
                let dataParent = props.modalObject.ParentObject.values[props.modalObject.ParentObject.key] || {};
                console.log(dataParent.loanBalance, "dataParent.loanBalance");

                setFieldValue("loanAmount", dataParent.loanBalance || "");
            }
        } catch (error) {
            console.error("Error filling initial values:", error);
        }
    };



    let onSubmit = async (values) => {
        console.log("values", values);

        props.setFieldValue(props.modalObject.key + "CashFlowLoanBelanceLVR", values);
        props.setFieldValue(props.modalObject.key, values.loanBalance);

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }
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
            callBack: true,
            func: CalculatePercentage,
            placeholder: "Client Ownership",

        },

        {
            name: "partnerOwnership",
            type: 'number-toPercent',
            callBack: true,
            func: CalculatePercentage,
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
                                                    <th>Loan to Value Ratio (LVR) </th>
                                                    <th>Loan Amount</th>
                                                    <th>Loan Balance {props.modalObject.ParentObject.title}</th>
                                                    {props.modalObject.ParentObject.title !== "SMSF Investment Properties" &&
                                                        <React.Fragment>
                                                            <th>Client %Ownership</th>
                                                            <th>Partner %Ownership</th>
                                                        </React.Fragment>
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <DynamicTableRow
                                                    rowConfig={rowConfig.filter(row =>
                                                        props.modalObject.ParentObject.title !== "SMSF Investment Properties" ||
                                                        (row.name !== "clientOwnership" && row.name !== "partnerOwnership")
                                                    )}
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