import React, { useEffect, useState } from 'react'
import DynamicTableRow from '../../Components/Assets/Dynamic/DynamicTableRow';
import { Form, Formik } from 'formik';
import { Row, Table } from 'react-bootstrap';
import { toCommaAndDollar } from '../../Components/Assets/Api/Api';

const LoanBalance = (props) => {

    let initialValues = {
        Contribution: "",
        RegularContributions: "",
        ContributeFromYear: "",
        ContributeUpUntil: "",
        Indexation: "",
    }

    let fillInitialValues = (setFieldValue) => {
        console.log(props.modalObject)

        let SubObj = props.modalObject.values
        if (SubObj[props.modalObject.key]) {
            let Data = SubObj[props.modalObject.key];
            setFieldValue("StampDutyType", Data.StampDutyType)
            setFieldValue("StampDutyValue", Data.StampDutyValue)
            setFieldValue("OtherPurchaseCosts", Data.OtherPurchaseCosts)
            setFieldValue("CostBaseExisting", Data.CostBaseExisting)
            setFieldValue("TotalCostBase", Data.TotalCostBase)
        }


    }

    let onSubmit = (values) => {
        props.setFieldValue(props.modalObject.key, values)

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }
    }

    let StampDutyOptions = [
        { value: "Standard Rates", label: "Standard Rates" },
        { value: "Manual", label: "Manual" },
    ]

    let CalculateTotal = (values, setFieldValue, currentInput, stakeHolder) => {
        let StampDutyType = values.StampDutyType;
        let StampDutyValue = values.StampDutyValue.replace(/[^0-9.-]+/g, "");
        let OtherPurchaseCosts = values.OtherPurchaseCosts.replace(/[^0-9.-]+/g, "");

        switch (currentInput.name) {
            case "StampDutyType":
                StampDutyType = currentInput.value;
                break;
            case "StampDutyValue":
                StampDutyValue = currentInput.value.replace(/[^0-9.-]+/g, "");
                break;
            case "OtherPurchaseCosts":
                OtherPurchaseCosts = currentInput.value.replace(/[^0-9.-]+/g, "");
                break;
            default:
                console.warn("No valid input selected"); // Use warn for non-critical issues
                break;
        }

        console.log(StampDutyType, StampDutyValue, OtherPurchaseCosts, props.modalObject.values);

        if (StampDutyType === "Manual") {
            // Try-catch block for parsing and calculation
            try {
                const parsedValueOfProperty = parseFloat(
                    props.modalObject.values.ValueOfProperty.replace(/[^0-9.-]+/g, "")
                ) || 0;
                const totalCostBase = parseFloat(StampDutyValue) + parseFloat(OtherPurchaseCosts) + parsedValueOfProperty;
                console.log(totalCostBase);
                setFieldValue("TotalCostBase", toCommaAndDollar(totalCostBase));
            } catch (error) {
                console.error("Error calculating total cost base:", error);
                // Handle the error here (e.g., display an error message to the user)
            }
        }
    };

    let rowConfig = [
        {
            name: "Loan",
            type: "plainText2.0",
            placeholder: "Loan",
            value: "1",
        },
        {
            name: "LoanBalance",
            type: "number-toComma-Modal",
            placeholder: "Loan Balance",

        },
        {
            name: "LoanType",
            type: "number-toComma",
            placeholder: "Loan Type",

        },
        {
            name: "LoanTerm",
            type: "number-toComma",
            placeholder: "Loan Term",

        },
        {
            name: "InitialInterestRate",
            type: "number-toComma",
            placeholder: "Initial Interest Rate (p.a.)",

        },
        {
            name: "DeductibleInterest",
            type: "number-toComma",
            placeholder: "Deductible interest %",

        },
        {
            name: "MinimumRepayments",
            type: "number-toComma",
            placeholder: "Minimum Repayments (p.a)",

        },
        {
            name: "ActualAnnualRepayments",
            type: "number-toComma",
            placeholder: "Actual Annual Repayments",

        },
        {
            name: "RepayLoanInYear",
            type: "number-toComma",
            placeholder: "Repay Loan in Year",

        },

    ]

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
                            <div className="col-md-12">
                                <div className="row justify-content-center">
                                    <div className="mt-4">
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Loan</th>
                                                    <th>Loan Balance</th>
                                                    <th>Loan Type</th>
                                                    <th>Loan Term</th>
                                                    <th>Initial Interest Rate (p.a.)</th>
                                                    <th>Deductible interest %</th>
                                                    <th>Minimum Repayments (p.a)</th>
                                                    <th>Actual Annual Repayments</th>
                                                    <th>Repay Loan in Year</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <DynamicTableRow
                                                    // rowConfig={rowConfig}
                                                    rowConfig={rowConfig.map(item => ({
                                                        ...item,
                                                        disabled: item.name === 'StampDutyValue' ? (values.StampDutyType !== "Manual") : item.disabled
                                                    }))}
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
    )
}

export default LoanBalance