import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { BankDetail, defaultUrl, QuestionDetail } from "../../../Store/Store";
import DynamicTableRow from "../../Assets/Dynamic/DynamicTableRow";

const HomeLoan = (props) => {
    let initialValues = {};


    let bankDetailObj = useRecoilValue(BankDetail);


    let [lenderOption, setLenderOption] = useState(() => {

        if (!bankDetailObj?.FinancialInstitutions) return [];

        // Create an options array
        const optionsArray = bankDetailObj.FinancialInstitutions.map((elem) => ({
            value: elem._id,
            label: elem.platformName,
        }));

        return optionsArray;
    })
    
    let questionDetail = useRecoilValue(QuestionDetail);

    const fillInitialValues = (setFieldValue) => {
        console.log(props.modalObject, "kuch Chala");
        if (props.modalObject.values.HomeLoanModal) {
            let data = props.modalObject.values.HomeLoanModal;

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



    const rowConfig = [
        {
            name: "lender",
            type: "select",
            placeholder: "Lender",
            styleSet: { width: "150px" },
            options: lenderOption
        },
        {
            name: "loanBalance",
            type: 'number-toComma',
            placeholder: "Loan Balance",

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
            name: "repaymentsAmount",
            type: 'number-toComma',
            placeholder: "Repayments Amount",
        },
        {
            name: "frequency",
            type: "select",
            options: [
                { value: "52", label: "Weekly" },
                { value: "26", label: "Fortnightly" },
                { value: "12", label: "Monthly" },
                { value: "1", label: "Annually" },
            ],
            styleSet: { width: "200px" },
        },
        {
            name: "annualRepayments",
            type: 'number-toComma',
            placeholder: "Annual Repayments",
        },
        {
            name: "interestRatePA",
            type: "number-toPercent",
            placeholder: "Interest Rate (p.a)",
        },
        {
            name: "loanTerm",
            type: "select",
            options: loanTermOptions,
        },
        {
            name: "loanTermRemaining",
            type: "select",
            options: loanTermOptions,
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
                        <Row>
                            <div className="col-md-12">
                                <div className="row justify-content-center">
                                    <div className="mt-4">
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    {/* <th>No#</th> */}
                                                    <th>Lender</th>
                                                    <th>Loan Balance</th>
                                                    <th>Loan Type</th>
                                                    <th>Repayments Amount</th>
                                                    <th>Frequency</th>
                                                    <th>Annual Repayments</th>
                                                    <th>Interest Rate (p.a)</th>
                                                    <th>Loan Term </th>
                                                    <th>Loan Term Remaining </th>
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
export default HomeLoan;