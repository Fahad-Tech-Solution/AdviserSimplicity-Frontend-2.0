import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { BankDetail, QuestionDetail } from "../../../Store/Store";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const HomeLoan = (props) => {
    const bankDetailObj = useRecoilValue(BankDetail);

    let [lenderOption, setLenderOption] = useState(() => {
        console.log(bankDetailObj, "Bank Deails in Leander Option")
        if (!bankDetailObj?.FinancialInstitutions) return [];

        // Create an options array
        const optionsArray = bankDetailObj.FinancialInstitutions.map((elem) => ({
            value: elem._id,
            label: elem.platformName,
        }));

        return optionsArray;
    })


    const fillInitialValues = (setFieldValue) => {
        if (props.modalObject?.values?.HomeLoanModal) {
            const data = props.modalObject.values.HomeLoanModal;
            Object.keys(data).forEach((key) => {
                setFieldValue(key, data[key]);
            });
        }
    };

    const onSubmit = async (values) => {
        props.setFieldValue("HomeLoanModal", values);
        props.setFieldValue("loanAmount", values.loanBalance);
        props.setFieldValue("annualRepayments", values.annualRepayments);

        if (props.flagState) {
            props.setFlagState(false);
        }
    };

    const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
        value: (i + 1).toString(),
        label: `Year ${i + 1}`,
    }));

    // ✅ AntD column config
    const columns = [
        {
            title: "Lender",
            dataIndex: "lender",
            key: "lender",
            type: "select",

            options: lenderOption,
            placeholder: "Lender",

            width: 260,
        },
        {
            title: "Loan Balance",
            dataIndex: "loanBalance",
            key: "loanBalance",
            type: "number-toComma",
            placeholder: "Loan Balance",
        },
        {
            title: "Loan Type",
            dataIndex: "loanType",
            key: "loanType",
            type: "select",
            options: [
                { value: "i/only", label: "i/only" },
                { value: "P&i", label: "P&i" },
            ],
        },
        {
            title: "Repayments Amount",
            dataIndex: "repaymentsAmount",
            key: "repaymentsAmount",
            type: "number-toComma",
            placeholder: "Repayments Amount",
        },
        {
            title: "Frequency",
            dataIndex: "frequency",
            key: "frequency",
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
            title: "Annual Repayments",
            dataIndex: "annualRepayments",
            key: "annualRepayments",
            type: "number-toComma",
            placeholder: "Annual Repayments",
        },
        {
            title: "Interest Rate (p.a)",
            dataIndex: "interestRatePA",
            key: "interestRatePA",
            type: "number-toPercent",
            placeholder: "Interest Rate (p.a)",
        },
        {
            title: "Loan Term",
            dataIndex: "loanTerm",
            key: "loanTerm",
            type: "select",
            options: loanTermOptions,
        },
        {
            title: "Loan Term Remaining",
            dataIndex: "loanTermRemaining",
            key: "loanTermRemaining",
            type: "select",
            options: loanTermOptions,
        },
    ];

    return (
        <Formik
            initialValues={{}}
            onSubmit={onSubmit}
            enableReinitialize
            innerRef={props.formRef}
        >
            {({ values, setFieldValue, handleChange, handleBlur }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, []);

                const dataRows = [
                    {
                        key: "homeLoan",
                        lender: values.lender,
                        loanBalance: values.loanBalance,
                        loanType: values.loanType,
                        repaymentsAmount: values.repaymentsAmount,
                        frequency: values.frequency,
                        annualRepayments: values.annualRepayments,
                        interestRatePA: values.interestRatePA,
                        loanTerm: values.loanTerm,
                        loanTermRemaining: values.loanTermRemaining,
                    },
                ];

                return (
                    <Form>
                        {dataRows.length > 0 && (
                            <div className="mt-4 All_Client reportSection">
                                <AntdTable
                                    columns={columns}
                                    data={dataRows}
                                    values={values}
                                    setFieldValue={setFieldValue}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />
                            </div>
                        )}
                    </Form>
                );
            }}
        </Formik>
    );
};

export default HomeLoan;
