import React, { useEffect, useState } from 'react'
import DynamicTableRow from '../../Components/Assets/Dynamic/DynamicTableRow';
import { Form, Formik } from 'formik';
import { Row, Table } from 'react-bootstrap';

const DownSizerContributionNonConcessional = (props) => {

    let initialValues = {
        downSizerContribution: "",
        contributionsToFund: "",
    }

    let fillInitialValues = (setFieldValue) => {
        console.log(props.modalObject);
        if (props.modalObject.values[props.modalObject.key + "Obj"]) {
            let Data = props.modalObject.values[props.modalObject.key + "Obj"]
            setFieldValue("downSizerContribution", Data.downSizerContribution)
            setFieldValue("contributionsToFund", Data.contributionsToFund)
        }
    }

    let onSubmit = (values) => {
        props.setFieldValue(props.modalObject.key + "Obj", values)

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }
    }

    const contributionsFundOptions = [
        { value: "1", label: "1", },
        { value: "2", label: "2", },
        { value: "SMSF", label: "SMSF", }
    ]

    let rowConfig = [
        {
            type: "plainText",
            text: props.modalObject.stakeHolder.replace(".", ""),
            styleSet: { fontWeight: "800", fontSize: "16px" }
        },
        {
            name: "downSizerContribution",
            type: "number-toComma",
            placeholder: "Downsizer contribution (Year 1 only)"
        },
        {
            name: "contributionsToFund",
            type: "select",
            options: contributionsFundOptions,
            placeholder: "Contributions To Fund"
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
                                                    <th>Owner</th>
                                                    <th>Downsizer contribution (Year 1 only)</th>
                                                    <th>Contributions To Fund</th>
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
    )
}

export default DownSizerContributionNonConcessional