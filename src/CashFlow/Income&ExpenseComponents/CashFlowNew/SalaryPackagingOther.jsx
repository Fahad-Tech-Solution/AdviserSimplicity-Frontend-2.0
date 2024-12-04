import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { RenderName, toCommaAndDollar } from '../../../Components/Assets/Api/Api';


const SalaryPackagingOther = (props) => {

    let initialValues = {
        salaryPackagingOther: "",
        GSTStatus: "Without GST",
        includeFromYear: "",
        upUntilYear: "",

    };


    const fillInitialValues = (setFieldValue) => {
        let SourceObj = props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")] || {}
        if (Object.keys(SourceObj).length > 0) {
            console.log(props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")])
            if (SourceObj[props.modalObject.key]) {
                let Data = SourceObj[props.modalObject.key];
                setFieldValue("salaryPackagingOther", Data.salaryPackagingOther);
                setFieldValue("GSTStatus", Data.GSTStatus);
                setFieldValue("includeFromYear", Data.includeFromYear);
                setFieldValue("upUntilYear", Data.upUntilYear);
            }
        }
    };



    let onSubmit = async (values) => {
        console.log(values);

        props.setFieldValue(props.modalObject.stakeHolder + props.modalObject.key, values);

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }

    };


    const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
        value: (i + 1).toString(),
        label: ("Year " + (i + 1)).toString(),
    }));

    const indexation = Array.from({ length: 21 }, (_, i) => ({
        value: (i * 0.5).toFixed(2) + "%",
        label: (i * 0.5).toFixed(2) + "%",
    }));


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            innerRef={props.formRef}
        >
            {({ values, handleChange, setFieldValue }) => {

                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, []);

                return (
                    <Form>
                        <Row>
                            <div className="col-md-12">
                                <div className='row justify-content-center'>

                                    <div className='mt-4'>
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Owner</th>
                                                    <th>Salary Packaging (Other)</th>
                                                    <th>GST Status</th>
                                                    <th>Include From Year</th>
                                                    <th>Up Until Year</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>
                                                    <td>
                                                        {RenderName(props.modalObject.stakeHolder.replace(".", ""))}
                                                    </td>
                                                    <td>
                                                        <Field
                                                            as="select"
                                                            placeholder="Salary Packaging (Other)"
                                                            id={`salaryPackagingOther`}
                                                            name={`salaryPackagingOther`}
                                                            className="form-select inputDesignDoubleInput"
                                                        >
                                                            <option value={""}>Please Select</option>
                                                            <option value={"Full FBT/Rebatable/Exempt (17K Cap)"}>Full FBT/Rebatable/Exempt (17K Cap)</option>
                                                            <option value={"Exempt (30K Cap)"}>Exempt (30K Cap)</option>
                                                        </Field>
                                                    </td>
                                                    <td>
                                                        <Field
                                                            as="select"
                                                            placeholder="GST Status"
                                                            id={`GSTStatus`}
                                                            name={`GSTStatus`}
                                                            className="form-select inputDesignDoubleInput"
                                                        >
                                                            <option value={""}>Please Select</option>
                                                            <option value={"With GST"}>With GST</option>
                                                            <option value={"Without GST"}>Without GST</option>
                                                        </Field>
                                                    </td>

                                                    <td>
                                                        <Field
                                                            as="select"
                                                            placeholder="Include From Year"
                                                            id={`includeFromYear`}
                                                            name={`includeFromYear`}
                                                            className="form-select inputDesignDoubleInput"
                                                        >
                                                            <option value={""}>Please Select</option>
                                                            {loanTermOptions.map((elem, index) => {
                                                                return (<option key={index} value={elem.value}>{elem.label}</option>)
                                                            })}
                                                        </Field>
                                                    </td>
                                                    <td>
                                                        <Field
                                                            as="select"
                                                            placeholder="Up Until Year"
                                                            id={`upUntilYear`}
                                                            name={`upUntilYear`}
                                                            className="form-select inputDesignDoubleInput"
                                                        >
                                                            <option value={""}>Please Select</option>
                                                            {loanTermOptions.map((elem, index) => {
                                                                return (<option key={index} value={elem.value}>{elem.label}</option>)
                                                            })}
                                                        </Field>
                                                    </td>
                                                </tr>
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

export default SalaryPackagingOther;
