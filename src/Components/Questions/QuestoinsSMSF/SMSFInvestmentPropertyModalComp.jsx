import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../Store/Store';
import { PatchAxios, PostAxios } from '../../Assets/Api/Api';
import axios from 'axios';

const SMSFInvestmentPropertyModalComp = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

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

    let SMSFInvestmentProperties = questionDetail.SMSFInvestmentProperties[props.modalObject.index] || {
        client: [],
        partner: [],
        joint: [],

    }; // Use an empty object as default if SMSFInvestmentProperties is undefined

    let initialValues = SMSFInvestmentProperties[props.modalObject.Input].length ? { NumberOfMap: SMSFInvestmentProperties[props.modalObject.Input].length } : { NumberOfMap: "" };

    const [dynamicFields, setDynamicFields] = useState([]);

    useEffect(() => {
        if (SMSFInvestmentProperties[props.modalObject.Input] && SMSFInvestmentProperties[props.modalObject.Input].length) {

            let arr = []

            for (let i = 0; i < SMSFInvestmentProperties[props.modalObject.Input].length; i++) {
                arr.push("");
            }

            setDynamicFields(arr);

        }
    }, [])

    const fillInitialValues = (setFieldValue) => {

        if (SMSFInvestmentProperties[props.modalObject.Input] && SMSFInvestmentProperties[props.modalObject.Input].length) {



            SMSFInvestmentProperties[props.modalObject.Input].forEach((data, i) => {
                if (data) {
                    setFieldValue(`propertyAddress${i}`, data.propertyAddress || '');
                    setFieldValue(`currentValue${i}`, data.currentValue || '');
                    setFieldValue(`costBase${i}`, data.costBase || '');
                }
            });
        }
    };

    let handleInput = (e, setFieldValue) => {
        const value = e.target.value > 2 ? 2 : e.target.value;
        setFieldValue(e.target.id, value);

        let arr = []

        for (let i = 0; i < value; i++) {
            arr.push("");
        }

        setDynamicFields(arr);

    };

    let DefaultUrl = useRecoilValue(defaultUrl)

    let onSubmit = async (values) => {
        // Extract the number of maps from the values
        const numberOfMaps = parseInt(values.NumberOfMap, 10);
        const newEntries = [];

        console.log(SMSFInvestmentProperties, "SMSFInvestmentProperties");

        // Iterate through each map entry and create a new object
        for (let i = 0; i < numberOfMaps; i++) {
            const newEntry = {
                propertyAddress: values[`propertyAddress${i}`] || "",
                currentValue: values[`currentValue${i}`] || "",
                costBase: values[`costBase${i}`] || "",
            };
            newEntries.push(newEntry);
        }

        // Log the new entries to verify
        console.log(newEntries);

        let DataOf = props.modalObject.Input;

        // Create an object with additional fields
        let obj = {
            clientFK: localStorage.getItem("UserID"),
        };

        obj[DataOf] = newEntries

        // Calculate total currentBalance
        obj[DataOf + "Total"] = newEntries.reduce((total, entry) => total + entry.costBase, 0);

        console.log(obj, "final obj")

        // Check if SMSFInvestmentProperties and the array at props.modalObject.Input exist
        // const bankAccountArray = SMSFInvestmentProperties[props.modalObject.Input] || [];
        const bankAccountArray = SMSFInvestmentProperties.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(`${DefaultUrl}/api/SMSFInvestmentProperties/Add`, obj);
            } else {
                obj.collection = props.modalObject.Input;
                obj._id = SMSFInvestmentProperties._id;
                res = await PatchAxios(`${DefaultUrl}/api/SMSFInvestmentProperties/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, SMSFInvestmentProperties: res };
                setQuestionDetail(updatedData);
            }

            // Reset the flag state if necessary
            if (props.flagState) {
                props.setFlagState(false);
            }
        } catch (error) {
            console.error("Error occurred while making API call:", error);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            innerRef={props.formRef}
        >
            {({ values, setFieldValue }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, [values.NumberOfMap]);

                return (
                    <Form>
                        <Row>
                            <div className="col-md-12">
                                <div className='row justify-content-center'>
                                    <div className='col-md-5'>
                                        <p className='text-end mt-1'>
                                            How many {props.modalObject.title} does {nameSet} have:
                                        </p>
                                    </div>
                                    <div className='col-md-2'>
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
                                                        <th>Property Address & Postcode</th>
                                                        <th>Current Value – <a href='https://www.property.com.au/' target='_blank' className='text-white'>Calculate Property</a> </th>
                                                        <th>Cost base /(Purchase Price)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dynamicFields.map((elem, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{1 + i}</td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Home Address & Postcode "
                                                                        id={`propertyAddress${i}`}
                                                                        name={`propertyAddress${i}`}
                                                                        className="form-control inputDesign"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="number"
                                                                        placeholder="Current Value – link to URL below "
                                                                        id={`currentValue${i}`}
                                                                        name={`currentValue${i}`}
                                                                        className="form-control inputDesign"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="number"
                                                                        placeholder="Cost base /(Purchase Price)"
                                                                        id={`costBase${i}`}
                                                                        name={`costBase${i}`}
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

export default SMSFInvestmentPropertyModalComp;
