import React, { useEffect, useState } from 'react'
import DynamicTableRow from '../../Components/Assets/Dynamic/DynamicTableRow';
import { Form, Formik } from 'formik';
import { Row, Table } from 'react-bootstrap';

const ApplyDeeming = (props) => {

    let initialValues = {
        purchasePrice: "",
        centreLinkRelevantNumber: "",
    }

    let fillInitialValues = (setFieldValue) => {
        console.log(props.modalObject);
        if (props.modalObject.values[props.modalObject.key + "Obj"]) {
            let Data = props.modalObject.values[props.modalObject.key + "Obj"]
            setFieldValue("purchasePrice", Data.purchasePrice)
            setFieldValue("centreLinkRelevantNumber", Data.centreLinkRelevantNumber)
        }
    }

    let onSubmit = (values) => {
        props.setFieldValue(props.modalObject.key + "Obj", values)

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }
    }

    let number2DecimalHandler = (values, setFieldValue, CurrentInput, stackHolder) => {
        if (CurrentInput.value) {
            setFieldValue(CurrentInput.name, parseFloat(CurrentInput.value).toFixed(2));
        }
    }



    let rowConfig = [
        {
            name: "purchasePrice",
            type: "number-toComma",
            placeholder: "Purchase Price (Less Commut)"
        },
        {
            name: "centreLinkRelevantNumber",
            placeholder: "Centrelink Relevant Number",
            type: "number",
            BlurHandler: number2DecimalHandler
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
                                                    <th>Purchase Price (Less Commut)</th>
                                                    <th>Centrelink Relevant Number</th>
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

export default ApplyDeeming