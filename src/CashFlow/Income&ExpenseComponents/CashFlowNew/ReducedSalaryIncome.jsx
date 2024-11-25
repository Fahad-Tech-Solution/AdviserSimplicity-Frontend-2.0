import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { RenderName, toCommaAndDollar } from '../../../Components/Assets/Api/Api';


const ReducedSalaryIncome = (props) => {

    let initialValues = {
        ReducedSalaryIncome: "",
        IncludeFromYear: "",
        UpUntilYear: "",
    };


    const fillInitialValues = (setFieldValue) => {
        let SourceObj = props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")] || {}
        if (Object.keys(SourceObj).length > 0) {
            console.log(props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")])
            if (SourceObj[props.modalObject.key]) {
                let Data = SourceObj[props.modalObject.key];
                setFieldValue("ReducedSalaryIncome", Data.ReducedSalaryIncome);
                setFieldValue("IncludeFromYear", Data.IncludeFromYear);
                setFieldValue("UpUntilYear", Data.UpUntilYear);
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
                                                    <th>Reduced Salary Income</th>
                                                    <th>Include From Year</th>
                                                    <th>Up Until Year</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>
                                                    <td>
                                                        {RenderName(props.modalObject.stakeHolder.replace(".", ""))}
                                                    </td>
                                                    <td style={{ width: "20rem" }}>
                                                        <Field
                                                            type="text"
                                                            placeholder="Reduced Salary Income"
                                                            id={`ReducedSalaryIncome`}
                                                            name={`ReducedSalaryIncome`}
                                                            className="form-control inputDesignDoubleInput"
                                                            onChange={(e) => {
                                                                setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")))
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Field
                                                            as="select"
                                                            placeholder="Include From Year"
                                                            id={`IncludeFromYear`}
                                                            name={`IncludeFromYear`}
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
                                                            id={`UpUntilYear`}
                                                            name={`UpUntilYear`}
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

export default ReducedSalaryIncome;
