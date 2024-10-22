import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { toCommaAndDollar } from '../../../Assets/Api/Api';
import { BankDetail } from '../../../../Store/Store';
import { useRecoilValue } from 'recoil';

const BankTermForm = (props) => {

    let bankDetailObj = useRecoilValue(BankDetail)
    const [title, setTitle] = useState(() => {
        // let head = props.modalObject.title;
        let currentTitle = props.modalObject.title;

        // Check if the title contains an underscore
        if (currentTitle.includes('_')) {
            currentTitle = (currentTitle.split('_').slice(1))[0];
        }

        return currentTitle
    });

    let [nameSet] = useState(() => {
        if (props.modalObject.Input === "client") {
            return (localStorage.getItem("UserName"))
        }
        else if (props.modalObject.Input === "partner") {
            return (localStorage.getItem("PartnerName"))
        }
        else if (props.modalObject.Input === "joint") {
            return (localStorage.getItem("UserName") + " & " + localStorage.getItem("PartnerName"))
        }
    })


    let initialValues = { NumberOfMap: "" };


    const fillInitialValues = (setFieldValue) => {
        if (props.modalObject.values[props.modalObject.Input] && props.modalObject.values[props.modalObject.Input].length > 0) {
            setFieldValue(`NumberOfMap`, props.modalObject.values[props.modalObject.Input].length || '');
            props.modalObject.values[props.modalObject.Input].forEach((data, i) => {
                if (data) {
                    setFieldValue(`Institution${i}`, data.Institution || '');
                    setFieldValue(`accountNumber${i}`, data.accountNumber || '');
                    setFieldValue(`currentBalance${i}`, data.currentBalance || '');
                }
            });
        }
    };

    let handleInput = (e, setFieldValue) => {
        const value = e.target.value > 10 ? 10 : e.target.value;
        setFieldValue(e.target.id, value);
    };


    let onSubmit = async (values) => {
        // Extract the number of maps from the values
        const numberOfMaps = parseInt(values.NumberOfMap, 10);
        const newEntries = [];

        // Iterate through each map entry and create a new object
        for (let i = 0; i < numberOfMaps; i++) {
            const newEntry = {
                Institution: values[`Institution${i}`] || "",
                accountNumber: values[`accountNumber${i}`] || "",
                currentBalance: values[`currentBalance${i}`] || ""
            };
            newEntries.push(newEntry);
        }

        let DataOf = props.modalObject.Input;

        props.setFieldValue(DataOf, newEntries);

        let total = newEntries.reduce((total, entry) => total + parseFloat((entry.currentBalance).replace(/[^0-9.-]+/g, "")), 0);

        props.setFieldValue(DataOf + "CurrentBalance", toCommaAndDollar(total));

        props.modalObject.setShowError(prevState => ({
            ...prevState,
            [`${DataOf + "CurrentBalance"}Error`]: false,
            [`${DataOf + "CurrentBalance"}Message`]: "",

        }))

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
            {({ values, handleChange, setFieldValue }) => {

                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, []);

                return (
                    <Form>
                        <Row>
                            <div className="col-md-12">
                                <div className='row justify-content-center'>
                                    <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                        <p className='text-end mt-3'>
                                            How many {title} does {nameSet} have:
                                        </p>

                                        <div className='w-25'>
                                            <Field
                                                type="number"
                                                id="NumberOfMap"
                                                name="NumberOfMap"
                                                className="form-control inputDesignDoubleInput"
                                                onChange={(e) => handleInput(e, setFieldValue)}
                                            />
                                        </div>
                                    </div>

                                    {values.NumberOfMap && (
                                        <div className='mt-4'>
                                            <Table striped bordered responsive hover>
                                                <thead>
                                                    <tr>
                                                        <th>No#</th>
                                                        <th>Name of Institution</th>
                                                        <th>Account number</th>
                                                        <th>Current Balance</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Array.from({ length: values.NumberOfMap }).map((_, i) => (
                                                        <tr key={i}>
                                                            <td>{1 + i}</td>
                                                            <td>
                                                                <Field
                                                                    as="select"
                                                                    placeholder="Name of Institution"
                                                                    id={`Institution${i}`}
                                                                    name={`Institution${i}`}
                                                                    className="form-select inputDesignDoubleInput"
                                                                >
                                                                    <option value={""}>Please Select</option>
                                                                    {bankDetailObj?.FinancialInstitutions.map((elem, index) => {
                                                                        return (<option key={index} value={elem._id}>{elem.platformName}</option>)
                                                                    })}
                                                                </Field>
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Account number"
                                                                    id={`accountNumber${i}`}
                                                                    name={`accountNumber${i}`}
                                                                    className="form-control inputDesignDoubleInput"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Current Balance"
                                                                    id={`currentBalance${i}`}
                                                                    name={`currentBalance${i}`}
                                                                    className="form-control inputDesignDoubleInput"
                                                                    onChange={(e) => {
                                                                        setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                    }}
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}
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

export default BankTermForm;
