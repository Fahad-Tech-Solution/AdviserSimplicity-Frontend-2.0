import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../../Store/Store';
import { PatchAxios, PostAxios } from '../../../Assets/Api/Api';
import axios from 'axios';

const AustralianShares = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

    let australianSharesFinance = questionDetail.australianSharesFinance || {
        client: [],
        partner: [],
        joint: [],

    }; // Use an empty object as default if australianSharesFinance is undefined
    useEffect(() => {
        if (australianSharesFinance[props.modalObject.Input] && australianSharesFinance[props.modalObject.Input].length) {
            let arr = []

            for (let i = 0; i < australianSharesFinance[props.modalObject.Input].length; i++) {
                arr.push("");
            }
            setDynamicFields(arr);
        }
    }, [])


    let initialValues = australianSharesFinance[props.modalObject.Input].length ? { NumberOfMap: australianSharesFinance[props.modalObject.Input].length } : { NumberOfMap: "" };

    const [dynamicFields, setDynamicFields] = useState([]);

    const fillInitialValues = (setFieldValue) => {

        if (australianSharesFinance[props.modalObject.Input] && australianSharesFinance[props.modalObject.Input].length) {

            australianSharesFinance[props.modalObject.Input].forEach((data, i) => {
                if (data) {
                    setFieldValue(`ASXCode${i}`, data.ASXCode || '');
                    setFieldValue(`companyName${i}`, data.companyName || '');
                    setFieldValue(`sharePrice${i}`, data.sharePrice || '');
                    setFieldValue(`shares${i}`, data.shares || '');
                    setFieldValue(`costBase${i}`, data.costBase || '');
                    setFieldValue(`currentBalance${i}`, data.currentBalance || '');
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

    let handleChange = async (e, setFieldValue, i) => {
        const input = e.target;

        if (input.value) {
            const regex = /\.AX$/;
            let a = input.value.toUpperCase();
            setFieldValue(e.target.id, a);

            if (!regex.test(a)) {
                // clearFields(setFieldValue, i);
                return false;
            }

            const settings = {
                headers: {
                    'X-RapidAPI-Key': '5e10294d2amsh7867e98a73e61abp176da5jsn21b129bfc40a',
                    'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
                }
            };

            try {
                let response = await axios.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=AU&symbols=${a}`, settings);
                let ASX_Company = response?.data?.quoteResponse?.result[0];

                if (ASX_Company) {
                    setFieldValue(`companyName${i}`, ASX_Company.longName || "");
                    setFieldValue(`sharePrice${i}`, ASX_Company.regularMarketPrice || 0);
                    // alert(input.value);
                } else {
                    clearFields(setFieldValue, i);
                    alert("This company does not exist");
                }
            } catch (error) {
                console.error(error);
                clearFields(setFieldValue, i);
                console.log("An error occurred while fetching company data");
            }

            return true;
        }
        else {
            clearFields(setFieldValue, i);
        }

        setFieldValue(e.target.id, "");
    };

    let clearFields = (setFieldValue, i) => {
        setFieldValue(`ASXCode${i}`, "");
        setFieldValue(`companyName${i}`, "");
        setFieldValue(`sharePrice${i}`, "");
        setFieldValue(`shares${i}`, "");
        setFieldValue(`costBase${i}`, "");
        setFieldValue(`currentBalance${i}`, "");
    };


    let DefaultUrl = useRecoilValue(defaultUrl)


    let onSubmit = async (values) => {
        // Extract the number of maps from the values
        const numberOfMaps = parseInt(values.NumberOfMap, 10);
        const newEntries = [];

        // Iterate through each map entry and create a new object
        for (let i = 0; i < numberOfMaps; i++) {
            const newEntry = {
                ASXCode: values[`ASXCode${i}`] || "",
                companyName: values[`companyName${i}`] || "",
                sharePrice: values[`sharePrice${i}`] || "",
                shares: values[`shares${i}`] || "",
                costBase: values[`costBase${i}`] || "",
                currentBalance: ((values[`costBase${i}`] || 0) + (values[`shares${i}`] || 0)) * (values[`sharePrice${i}`] || 0) || "",
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
        obj[DataOf + "Total"] = newEntries.reduce((total, entry) => total + entry.currentBalance, 0);

        console.log(obj, "final obj")

        // Check if australianSharesFinance and the array at props.modalObject.Input exist
        // const bankAccountArray = australianSharesFinance[props.modalObject.Input] || [];
        const bankAccountArray = australianSharesFinance.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(`${DefaultUrl}/api/australianShareMarket/Add`, obj);
            } else {
                obj.collection = props.modalObject.Input
                res = await PatchAxios(`${DefaultUrl}/api/australianShareMarket/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, australianSharesFinance: res };
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
                                                        <th>No#</th>
                                                        <th>ASX Code</th>
                                                        <th>Company Name</th>
                                                        <th>Shares Price</th>
                                                        <th>Number of Shares</th>
                                                        <th>Cost base</th>
                                                        <th>Current Balance</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dynamicFields.map((elem, i) => {
                                                        return (<tr key={i}>
                                                            <td>{1 + i}</td>
                                                            <td>
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Name of Institution"
                                                                    id={`ASXCode${i}`}
                                                                    name={`ASXCode${i}`}
                                                                    className="form-control inputDesign"
                                                                    onChange={(e) => { handleChange(e, setFieldValue, i) }}
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Company Name"
                                                                    id={`companyName${i}`}
                                                                    name={`companyName${i}`}
                                                                    disabled
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Share Price"
                                                                    id={`sharePrice${i}`}
                                                                    disabled
                                                                    name={`sharePrice${i}`}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Shares"
                                                                    id={`shares${i}`}
                                                                    name={`shares${i}`}
                                                                    className="form-control inputDesign"
                                                                    disabled={values[`sharePrice${i}`] ? false : true}
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Cost base"
                                                                    id={`costBase${i}`}
                                                                    name={`costBase${i}`}
                                                                    className="form-control inputDesign"
                                                                    disabled={values[`sharePrice${i}`] ? false : true}
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Current Balance"
                                                                    id={`currentBalance${i}`}
                                                                    name={`currentBalance${i}`}
                                                                    disabled
                                                                    value={((values[`costBase${i}`] || 0) + (values[`shares${i}`] || 0)) * (values[`sharePrice${i}`] || 0)}
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

export default AustralianShares;
