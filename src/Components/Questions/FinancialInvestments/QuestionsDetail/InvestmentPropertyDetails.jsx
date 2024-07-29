import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../../Store/Store';
import { PatchAxios, PostAxios } from '../../../Assets/Api/Api';
import axios from 'axios';

const InvestmentPropertyDetails = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

    let investmentPropertyDetails = questionDetail.investmentPropertyDetails || {
        client: [],
        partner: [],
        joint: [],

    }; // Use an empty object as default if investmentPropertyDetails is undefined


    let initialValues = investmentPropertyDetails[props.modalObject.Input].length ? { NumberOfMap: investmentPropertyDetails[props.modalObject.Input].length } : { NumberOfMap: "" };

    const [dynamicFields, setDynamicFields] = useState([]);


    useEffect(() => {
        if (investmentPropertyDetails[props.modalObject.Input] && investmentPropertyDetails[props.modalObject.Input].length) {

            let arr = []

            for (let i = 0; i < investmentPropertyDetails[props.modalObject.Input].length; i++) {
                arr.push("");
            }

            setDynamicFields(arr);
        }
    }, [])


    const fillInitialValues = (setFieldValue) => {

        if (investmentPropertyDetails[props.modalObject.Input] && investmentPropertyDetails[props.modalObject.Input].length) {

            investmentPropertyDetails[props.modalObject.Input].forEach((data, i) => {
                if (data) {
                    setFieldValue(`PropertyAddress${i}`, data.PropertyAddress || '');
                    setFieldValue(`CurrentValue${i}`, data.CurrentValue || '');
                    setFieldValue(`CostBase${i}`, data.CostBase || '');
                    setFieldValue(`ClientOwnership${i}`, data.ClientOwnership || '');
                    setFieldValue(`PartnerOwnership${i}`, data.PartnerOwnership || '');
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

        // Iterate through each map entry and create a new object
        for (let i = 0; i < numberOfMaps; i++) {
            const newEntry = {
                PropertyAddress: values[`PropertyAddress${i}`] || "",
                CurrentValue: values[`CurrentValue${i}`] || "",
                CostBase: values[`CostBase${i}`] || "",
                ClientOwnership: values[`ClientOwnership${i}`] || "",
                PartnerOwnership: values[`PartnerOwnership${i}`] || "",
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
        obj[DataOf + "Total"] = newEntries.reduce((total, entry) => total + entry.CostBase, 0);

        console.log(obj, "final obj")

        // Check if investmentPropertyDetails and the array at props.modalObject.Input exist
        // const bankAccountArray = investmentPropertyDetails[props.modalObject.Input] || [];
        const bankAccountArray = investmentPropertyDetails.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(`${DefaultUrl}/api/investmentPropertyDetails/Add`, obj);
            } else {
                obj.collection = props.modalObject.Input
                res = await PatchAxios(`${DefaultUrl}/api/investmentPropertyDetails/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, investmentPropertyDetails: res };
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

    const options = [
        "Adelaide Bank",
        "Alliance Bank",
        "AMP",
        "ANZ",
        "Arab Bank Australia",
        "Australian Military Bank (ADCU)",
        "Australian Mutual Bank",
        "Australian Unity",
        "Auswide Bank",
        "AWA Alliance Bank",
        "Bank Australia (bankmecu)",
        "Bank First",
        "Bank of Melbourne",
        "Bank of Queensland (BOQ)",
        "Bank of Sydney",
        "BankSA",
        "BankVic",
        "Bankwest",
        "BCU",
        "BDCU Alliance Bank",
        "Bendigo Bank",
        "Beyond Bank",
        "Border Bank",
        "Circle Alliance Bank",
        "Citi",
        "Commonwealth Bank",
        "Community First Bank",
        "Credit Union SA",
        "Defence Bank",
        "Delphi Bank",
        "Easy Street",
        "First Choice Credit Union",
        "First Option Bank",
        "firstmac",
        "G&C Mutual",
        "Gateway Bank Ltd",
        "Geelong Bank",
        "Great Southern Bank",
        "Greater Bank",
        "Hay",
        "Heartland Bank",
        "Heritage Bank",
        "Horizon Bank",
        "HSBC Australia",
        "Hume Bank",
        "Illawarra Credit Union",
        "IMB",
        "ING",
        "Judo Bank",
        "Macquarie Bank",
        "ME",
        "MOVE Bank",
        "MyState Bank",
        "NAB",
        "Newcastle Permanent",
        "P&N Bank",
        "People’s Choice CU",
        "Policebank",
        "Prospa",
        "Qudos Bank",
        "Rabobank",
        "RACQ",
        "RAMS",
        "Regional Australia Bank",
        "Rural Bank",
        "Service One Alliance Bank",
        "St.George",
        "Suncorp Bank",
        "Teachers Mutual Bank",
        "Ubank",
        "UniBank",
        "Up Bank",
        "Virgin Money",
        "Westpac",
        "Zeller"
    ];

    let handleBlur = (setFieldValue, e) => {
        let value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setFieldValue(e.target.id, value.toFixed(2));
        } else {
            setFieldValue(e.target.id, "");
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
                                                        <th>Property  Address & Postcode</th>
                                                        <th>Current Value - <a href='https://www.property.com.au/' target='_blank' className='text-white'>Calculate Property</a>  </th>
                                                        <th>Cost base /(Purchase Price)</th>
                                                        <th>Client Ownership</th>
                                                        <th>Partner Ownership</th>
                                                        {/*
                                                            <th>Deductible Loan Amount</th>
                                                        */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dynamicFields.map((elem, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{1 + i}</td>
                                                                <td>
                                                                    <Field
                                                                        type="number"
                                                                        placeholder="Property  Address & Postcode"
                                                                        id={`PropertyAddress${i}`}
                                                                        name={`PropertyAddress${i}`}
                                                                        className="form-control inputDesign"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="number"
                                                                        placeholder="Current Value – link to URL below "
                                                                        id={`CurrentValue${i}`}
                                                                        name={`CurrentValue${i}`}
                                                                        className="form-control inputDesign"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="number"
                                                                        placeholder="Cost base /(Purchase Price)"
                                                                        id={`CostBase${i}`}
                                                                        name={`CostBase${i}`}
                                                                        className="form-control inputDesign"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="number"
                                                                        placeholder="Client Ownership"
                                                                        id={`ClientOwnership${i}`}
                                                                        name={`ClientOwnership${i}`}
                                                                        onBlur={(e) => handleBlur(setFieldValue, e)}
                                                                        onChange={(e) => {
                                                                            const clientValue = parseFloat(e.target.value, 10);
                                                                            const partnerValue = Math.min(100, Math.max(0, 100 - clientValue));
                                                                            setFieldValue(`ClientOwnership${i}`, (clientValue > 100 ? 100 : clientValue));
                                                                            setFieldValue(`PartnerOwnership${i}`, partnerValue.toFixed(2));
                                                                        }}
                                                                        className="form-control inputDesign"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="number"
                                                                        placeholder="Partner Ownership"
                                                                        id={`PartnerOwnership${i}`}
                                                                        name={`PartnerOwnership${i}`}
                                                                        onBlur={(e) => handleBlur(setFieldValue, e)}
                                                                        onChange={(e) => {
                                                                            const partnerValue = parseFloat(e.target.value, 10);
                                                                            const clientValue = Math.min(100, Math.max(0, 100 - partnerValue));
                                                                            setFieldValue(`PartnerOwnership${i}`, (partnerValue > 100 ? 100 : partnerValue));
                                                                            setFieldValue(`ClientOwnership${i}`, clientValue.toFixed(2));
                                                                        }}
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

export default InvestmentPropertyDetails;
