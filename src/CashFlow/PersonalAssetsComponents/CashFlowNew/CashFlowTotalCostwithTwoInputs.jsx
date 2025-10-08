import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { BankDetail, defaultUrl, QuestionDetail } from "../../../Store/Store";
import InnerModal from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";

const CashFlowTotalCost = (props) => {
    let initialValues = {};

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});
    let bankDetailObj = useRecoilValue(BankDetail);
    let questionDetail = useRecoilValue(QuestionDetail);

    const fillInitialValues = (setFieldValue) => {
        if (props.modalObject.values.TotalCostModal) {
            let data = props.modalObject.values.TotalCostModal;
            setFieldValue(`lender`, data.lender);
            setFieldValue(`loanBalance`, data.loanBalance);
            setFieldValue(`loanType`, data.loanType);
            setFieldValue(`repaymentsAmount`, data.repaymentsAmount);
            setFieldValue(`frequency`, data.frequency);
            setFieldValue(`annualRepayments`, data.annualRepayments);
            setFieldValue(`interestRatePA`, data.interestRatePA);
            setFieldValue(`loanTerm`, data.loanTerm);
            setFieldValue(`loanTermRemaining`, data.loanTermRemaining);
        }
    };

    let onSubmit = async (values) => {
        props.setFieldValue(`TotalCostModal`, values);
        props.setFieldValue(`loanAmount`, values.loanBalance);
        props.setFieldValue(`annualRepayments`, values.annualRepayments);
        if (props.flagState) {
            props.setFlagState(false);
        }
    };

    const rowConfig = [
        {
            name: "stampDuty",
            type: "custom",
            fields: [
                {
                    name: "stampDutySelect",
                    type: "select",
                    styleSet: { width: "150px" },
                    options: [
                        { value: "Standard Rates", label: "Standard Rates" },
                        { value: "FH Buyer", label: "P&FH Buyer" },
                        { value: "Manual", label: "Manual" },
                    ],
                },
                {
                    name: "stampDutyNumber",
                    type: "number-toComma",
                    placeholder: "Stamp Duty Number",
                }
            ]
        },
        {
            name: "otherPurchaseCosts",
            type: 'number-toComma',
            placeholder: "Other Purchase Costs",
        },
        {
            name: "costBaseExisting",
            type: 'number',
            placeholder: "Cost Base (Existing)",
        },
        {
            name: "totalCostBase",
            type: 'number',
            placeholder: "Total Cost Base",
        },
    ];

    const DynamicTableRow1 = ({ rowConfig, values, setFieldValue, handleChange, handleBlur }) => (
        <tr>
            {rowConfig.map((config, index) => (
                <td key={index}>
                    {config.fields ? (
                        // Wrap multiple fields in a flex container for inline display
                        <div style={{ display: "flex", flex:"wrap" ,gap: "2px" }}> {/* 2px gap between inputs */}
                            {config.fields.map((field, idx) => (
                                <div key={idx} style={{ display: "flex", alignItems: "center" }}>
                                    {field.type === "select" ? (
                                        <Field
                                            as="select"
                                            name={field.name}
                                            className="form-control"
                                            style={{
                                                ...field.styleSet,
                                                appearance: "auto",  // Ensures dropdown icon shows on select
                                                WebkitAppearance: "menulist", // For cross-browser support
                                                MozAppearance: "menulist",
                                                // padding: "0 8px"   // Adjust padding for dropdown icon space
                                            }}
                                        >
                                            {field.options.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </Field>
                                    ) : (
                                        <Field
                                            type="number" // Set as 'number' input
                                            name={field.name}
                                            placeholder={field.placeholder}
                                            className="form-control"
                                            style={{ marginLeft: "2px" }}  // Add 2px margin on the left side
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Render single input for normal configuration
                        <Field
                            type={config.type}
                            name={config.name}
                            placeholder={config.placeholder}
                            className="form-control"
                            style={config.styleSet}
                        />
                    )}
                </td>
            ))}
        </tr>
    );
    
    

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
                        />
                        <Row>
                            <div className="col-md-12">
                                <div className="row justify-content-center">
                                    <div className="mt-4">
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    <th >Stamp Duty</th>
                                                    <th>Other Purchase Costs</th>
                                                    <th>Cost Base (Existing)</th>
                                                    <th>Total Cost Base</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <DynamicTableRow1
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

export default CashFlowTotalCost;
