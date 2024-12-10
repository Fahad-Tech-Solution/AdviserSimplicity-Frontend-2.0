import React, { useEffect, useState } from 'react'
import DynamicTableRow from '../../Components/Assets/Dynamic/DynamicTableRow';
import { Form, Formik } from 'formik';
import { Row, Table } from 'react-bootstrap';

const InsurancePremiums = (props) => {

    let initialValues = {
        IncomeYield: "",
        GrowthRate: "",
        Franking: "",
    }

    let fillInitialValues = (setFieldValue) => {
        if (props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]) {
            let SubObj = props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]
            if (SubObj[props.modalObject.key + "Obj"]) {
                let Data = SubObj[props.modalObject.key + "Obj"];
                setFieldValue("IncomeYield", Data.IncomeYield)
                setFieldValue("GrowthRate", Data.GrowthRate)
                setFieldValue("Franking", Data.Franking)
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

    let rowConfig = [
        {
            name: "index",
            type: "plainText2.0",
            value: "Fund 1"
        },
        {
            name: "insurancePremiums",
            type: "number-toPercent",
            placeholder: "Insurance Premiums",
        },
        {
            name: "yearsInclude",
            type: "number-toPercent",
            placeholder: "Years to Include",
        },
        {
            name: "indexationPremiums",
            type: "number-toPercent",
            placeholder: "Indexation of Premiums",
        },
    ]

    let rowConfig1 = [
        {
            name: "index",
            type: "plainText2.0",
            value: "Fund 2"
        },
        {
            name: "insurancePremiums1",
            type: "number-toPercent",
            placeholder: "Insurance Premiums",
        },
        {
            name: "yearsInclude1",
            type: "number-toPercent",
            placeholder: "Years to Include",
        },
        {
            name: "indexationPremiums1",
            type: "number-toPercent",
            placeholder: "Indexation of Premiums",
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
                                                    <th>Fund</th>
                                                    <th>Insurance Premiums</th>
                                                    <th>Years to Include</th>
                                                    <th>Indexation of Premiums</th>
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

export default InsurancePremiums