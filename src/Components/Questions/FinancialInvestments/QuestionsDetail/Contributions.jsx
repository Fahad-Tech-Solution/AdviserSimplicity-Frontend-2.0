import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { defaultUrl } from '../../../../Store/Store';

const Contributions = (props) => {


    let initialValues = props.modalObject.editArray.length ? { NumberOfMap: props.modalObject.editArray.length } : { NumberOfMap: "" };

    const [dynamicFields, setDynamicFields] = useState([]);

    const fillInitialValues = (setFieldValue, loopValue) => {

        let arr = []

        for (let i = 0; i < loopValue; i++) {
            arr.push("");
        }

        setDynamicFields(arr);


        if (props.modalObject.editArray) {
            props.modalObject.editArray.forEach((data, i) => {
                if (data) {
                    console.log(data.investmentOption)
                    setFieldValue(`employerContributions${i}`, data.employerContributions || '');
                    setFieldValue(`concessional${i}`, data.concessional || '');
                    setFieldValue(`totalConcessional${i}`, data.totalConcessional || '');
                    setFieldValue(`nonConcessionalContributions${i}`, data.nonConcessionalContributions || '');
                }

            });
        }

    };

    let handleInput = (e, setFieldValue) => {
        const value = e.target.value > 10 ? 10 : e.target.value;
        setFieldValue(e.target.id, value);

        let arr = []

        for (let i = 0; i < value; i++) {
            arr.push("");
        }

        setDynamicFields(arr);

    };

    let DefaultUrl = useRecoilValue(defaultUrl)

    let onSubmit = async (values) => {

        console.log(values)

        const newEntries = [];

        let loopLength = parseFloat(values.NumberOfMap)

        // Iterate through each map entry and create a new object
        for (let i = 0; i < loopLength; i++) {
            // alert("loop chala")
            const newEntry = {
                employerContributions: values[`employerContributions${i}`] || "",
                concessional: values[`concessional${i}`] || "",
                totalConcessional: values[`totalConcessional${i}`] || "",
                nonConcessionalContributions: values[`nonConcessionalContributions${i}`] || "",
            };
            newEntries.push(newEntry);
        }

        // Log the new entries to verify
        console.log(newEntries);

        // let total = newEntries.reduce((total, entry) => total + entry.taxableComponent, 0);
        // let total2 = newEntries.reduce((total, entry) => total + entry.preservedAmount, 0);


        props.setFieldValue(`${props.modalObject.key}${props.modalObject.index}`, newEntries)
        // props.setFieldValue(`${props.modalObject.key3}${props.modalObject.index}`, total)
        // props.setFieldValue(`${props.modalObject.mainKey}${props.modalObject.index}`, total + total2)

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            innerRef={props.formRef}
        >
            {({ values, handleChange, setFieldValue, handleBlur }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue, values.NumberOfMap);
                }, [values.NumberOfMap]);

                return (
                    <Form>
                        <Row>
                            <div className="col-md-12">
                                <div className='row justify-content-center'>
                                    <div className='col-md-7'>
                                        <p className='text-end mt-1'>
                                            {props.modalObject.question}
                                        </p>
                                    </div>
                                    <div className='col-md-3'>
                                        <Field
                                            type="number"
                                            id="NumberOfMap"
                                            name="NumberOfMap"
                                            className="form-control inputDesign"
                                            onChange={(e) => handleInput(e, setFieldValue)}
                                        />
                                    </div>
                                    {values.NumberOfMap && (
                                        <div className='mt-4'>
                                            <Table striped bordered responsive hover>
                                                <thead>
                                                    <tr>
                                                        <th>No#</th>
                                                        <th>Financial Years</th>
                                                        <th>Employer Contributions</th>
                                                        <th>Concessional (Include. Salary Sac)</th>
                                                        <th>Total Concessional Contributions</th>
                                                        <th>Non-Concessional Contributions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dynamicFields.map((elem, i) => {
                                                        const startYear = 2019 + i;
                                                        const endYear = startYear + 1;
                                                        const yearRange = `${startYear}/${endYear}`;

                                                        return (
                                                            <tr key={i}>
                                                                <td>{1 + i}</td>
                                                                <td>{yearRange}</td> {/* Displaying the year range */}
                                                                <td>
                                                                    <Field
                                                                        type="number"
                                                                        placeholder="Employer Contributions"
                                                                        id={`employerContributions${i}`}
                                                                        name={`employerContributions${i}`}
                                                                        className="form-control inputDesign"
                                                                        onChange={(e) => {
                                                                            setFieldValue(`employerContributions${i}`, e.target.value);
                                                                            setFieldValue(`totalConcessional${i}`, (parseFloat(values[`concessional${i}`]) || 0) + parseFloat(e.target.value));
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="number"
                                                                        placeholder="Concessional (Include. Salary Sac)"
                                                                        id={`concessional${i}`}
                                                                        name={`concessional${i}`}
                                                                        className="form-control inputDesign"
                                                                        onChange={(e) => {
                                                                            setFieldValue(`concessional${i}`, e.target.value);
                                                                            setFieldValue(`totalConcessional${i}`, (parseFloat(values[`employerContributions${i}`]) || 0) + parseFloat(e.target.value));
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="number"
                                                                        placeholder="Total Concessional Contributions"
                                                                        id={`totalConcessional${i}`}
                                                                        name={`totalConcessional${i}`}
                                                                        className="form-control inputDesign"
                                                                        disabled
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="number"
                                                                        placeholder="Non-Concessional Contributions"
                                                                        id={`nonConcessionalContributions${i}`}
                                                                        name={`nonConcessionalContributions${i}`}
                                                                        className="form-control inputDesign"
                                                                    />
                                                                </td>

                                                            </tr>)
                                                    })}
                                                </tbody>
                                            </Table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Row>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default Contributions;
