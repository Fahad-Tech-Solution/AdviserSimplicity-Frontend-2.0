import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, InputGroup, Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../Store/Store';
import { PatchAxios, PostAxios } from '../../Assets/Api/Api';

const SoleTrader = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

    let incomeFromSoleTrader = questionDetail.incomeFromSoleTrader || {
        client: [],
        partner: [],
        joint: [],

    }; // Use an empty object as default if incomeFromSoleTrader is undefined


    let initialValues = incomeFromSoleTrader[props.modalObject.Input].length ? { NumberOfMap: incomeFromSoleTrader[props.modalObject.Input].length } : { NumberOfMap: "" };

    const [dynamicFields, setDynamicFields] = useState([]);


    useEffect(() => {
        if (incomeFromSoleTrader[props.modalObject.Input] && incomeFromSoleTrader[props.modalObject.Input].length) {
            let arr = []

            for (let i = 0; i < incomeFromSoleTrader[props.modalObject.Input].length; i++) {
                arr.push("");
            }

            setDynamicFields(arr);

        }
    }, [])

    const fillInitialValues = (setFieldValue) => {

        if (incomeFromSoleTrader[props.modalObject.Input] && incomeFromSoleTrader[props.modalObject.Input].length) {

            incomeFromSoleTrader[props.modalObject.Input].forEach((data, i) => {
                if (data) {
                    setFieldValue(`businessName${i}`, data.businessName || '');
                    setFieldValue(`ABN${i}`, data.ABN || '');
                    setFieldValue(`businessAddress${i}`, data.businessAddress || '');
                    setFieldValue(`netSoleTrader${i}`, data.netSoleTrader || '');
                    setFieldValue(`goodWillBusinessValuation${i}`, data.goodWillBusinessValuation || '');

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
        // console.log(values);
        // return (false);
        // Extract the number of maps from the values
        const numberOfMaps = parseInt(values.NumberOfMap, 10);
        const newEntries = [];

        // Iterate through each map entry and create a new object
        for (let i = 0; i < numberOfMaps; i++) {
            const newEntry = {
                businessName: values[`businessName${i}`] || "",
                ABN: values[`ABN${i}`] || "",
                businessAddress: values[`businessAddress${i}`] || "",
                netSoleTrader: values[`netSoleTrader${i}`] || "",
                goodWillBusinessValuation: values[`goodWillBusinessValuation${i}`] || "",
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
        obj[DataOf + "Total"] = newEntries.reduce((total, entry) => total + entry.annualAdvice, 0);

        console.log(obj, "final obj")

        // Check if incomeFromSoleTrader and the array at props.modalObject.Input exist
        // const bankAccountArray = incomeFromSoleTrader[props.modalObject.Input] || [];
        const bankAccountArray = incomeFromSoleTrader.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(`${DefaultUrl}/api/incomeFromSoleTrader/Add`, obj);
            } else {
                obj.collection = props.modalObject.Input
                res = await PatchAxios(`${DefaultUrl}/api/incomeFromSoleTrader/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, incomeFromSoleTrader: res };
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
            {({ values, setFieldValue, handleChange }) => {
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
                                            How many {props.modalObject.title} does {props.modalObject.Input} have:
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
                                                        <th onClick={() => { console.log(values) }}>No#</th>
                                                        <th>Business Name</th>
                                                        <th>ABN</th>
                                                        <th>Business Address</th>
                                                        <th>Net Sole Trader</th>
                                                        <th>Goodwill/Business Valuation</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dynamicFields.map((elem, i) => {
                                                        return (<tr key={i}>
                                                            <td>{1 + i}</td>
                                                            <td>
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Business Name"
                                                                    id={`businessName${i}`}
                                                                    name={`businessName${i}`}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="ABN"
                                                                    id={`ABN${i}`}
                                                                    name={`ABN${i}`}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Business Address"
                                                                    id={`businessAddress${i}`}
                                                                    name={`businessAddress${i}`}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Net Sole Trader"
                                                                    id={`netSoleTrader${i}`}
                                                                    name={`netSoleTrader${i}`}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Goodwill/Business Valuation"
                                                                    id={`goodWillBusinessValuation${i}`}
                                                                    name={`goodWillBusinessValuation${i}`}
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

export default SoleTrader;
