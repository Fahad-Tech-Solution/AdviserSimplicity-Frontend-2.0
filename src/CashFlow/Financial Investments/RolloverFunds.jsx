import React, { useEffect, useState } from 'react'
import DynamicTableRow from '../../Components/Assets/Dynamic/DynamicTableRow';
import { Form, Formik } from 'formik';
import { Row, Table } from 'react-bootstrap';

const RolloverFunds = (props) => {

    let initialValues = {
        rolloverBenefitFund: "",
        rolloverBenefitsFear: "",
    }

    let fillInitialValues = (setFieldValue) => {
        if (props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]) {
            let SubObj = props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]
            if (SubObj[props.modalObject.key + "Obj"]) {
                let Data = SubObj[props.modalObject.key + "Obj"];
                setFieldValue("rolloverBenefitFund", Data.rolloverBenefitFund)
                setFieldValue("rolloverBenefitsFear", Data.rolloverBenefitsFear)
                setFieldValue("rolloverBenefitFund1", Data.rolloverBenefitFund1)
                setFieldValue("rolloverBenefitsFear1", Data.rolloverBenefitsFear1)
            }
        }
    }

    let onSubmit = (values) => {
        props.setFieldValue(props.modalObject.stakeHolder + props.modalObject.key + "Obj", values)

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }
    }

    const yearsIncludedArray = Array.from({ length: 30 }, (_, i) => {
        return ({
            value: (i + 1).toString(),
            label: ("Year " + (i + 1)).toString(),
        })
    });

    const rolloverBenefitFundArray = [
        { value: "N/A", label: "N/A", },
        { value: "SMSF", label: "SMSF", }
    ]


    let rowConfig = [
        {
            name: "index",
            type: "plainText2.0",
            value: "Fund 1",
            styleSet: { fontWeight: "800", fontSize: "16px" }
        },
        {
            name: "rolloverBenefitFund",
            type: "select",
            options: rolloverBenefitFundArray,
        },
        {
            name: "rolloverBenefitsFear",
            type: "select",
            options: yearsIncludedArray,
        },
    ]

    let rowConfig1 = [
        {
            name: "index",
            type: "plainText2.0",
            value: "Fund 2",
            styleSet: { fontWeight: "800", fontSize: "16px" }
        },
        {
            name: "rolloverBenefitFund1",
            type: "select",
            options: rolloverBenefitFundArray,
        },
        {
            name: "rolloverBenefitsFear1",
            type: "select",
            options: yearsIncludedArray,
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
                            <div className="col-md-12" >
                                <div className="row justify-content-center">
                                    <div className="mt-4">
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Fund</th>
                                                    <th>Rollover Benefit to fund</th>
                                                    <th>Rollover benefits in Year</th>
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
                                                <DynamicTableRow
                                                    rowConfig={rowConfig1}
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

export default RolloverFunds