import React, { useEffect, useState } from 'react'
import DynamicTableRow from '../../Components/Assets/Dynamic/DynamicTableRow';
import { Form, Formik } from 'formik';
import { Row, Table } from 'react-bootstrap';
import { toCommaAndDollar } from '../../Components/Assets/Api/Api';

const TotalCostBase = (props) => {

    let initialValues = {
        StampDutyType: "",
        StampDutyValue: "",
        OtherPurchaseCosts: "",
        CostBaseExisting: "",
        TotalCostBase: "",
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
            name: "StampDutyType",
            type: "select",
            placeholder: "Stamp Duty",
            options: StampDutyOptions,
            callBack: true,
            func: CalculateTotal
        },
        {
            name: "StampDutyValue",
            type: "number-toComma",
            placeholder: "Stamp Duty Value",
            disabled: true,
            callBack: true,
            func: CalculateTotal
        },
        {
            name: "OtherPurchaseCosts",
            type: "number-toComma",
            placeholder: "Other Purchase Costs",
            callBack: true,
            func: CalculateTotal
        },
        {
            name: "CostBaseExisting",
            type: "number-toComma",
            placeholder: "Cost Base Existing",
        },
        {
            name: "TotalCostBase",
            type: "number-toComma",
            placeholder: "Total Cost Base",
            disabled: true
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
                                                    <th colSpan={2}>Stamp Duty</th>
                                                    <th>Other Purchase Costs</th>
                                                    <th>Cost Base (Existing)</th>
                                                    <th>Total Cost Base</th>
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

export default TotalCostBase