import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../../Store/Store';
import { PatchAxios, PostAxios, toCommaAndDollar } from '../../../Assets/Api/Api';
import axios from 'axios';
import { Pagination } from 'antd';

const AustralianShares = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

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



    // Use an empty object as default if australianSharesFinance is undefined
    useEffect(() => {
        if (props.modalObject.values[props.modalObject.Input] && props.modalObject.values[props.modalObject.Input].length) {
            let arr = []

            for (let i = 0; i < props.modalObject.values[props.modalObject.Input].length; i++) {
                arr.push("");
            }
            setDynamicFields(arr);
        }
    }, [])


    let initialValues = { NumberOfMap: "" };

    const [dynamicFields, setDynamicFields] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // Number of rows per page


    const fillInitialValues = (setFieldValue) => {

        if (props.modalObject.values[props.modalObject.Input] && props.modalObject.values[props.modalObject.Input].length > 0) {
            setFieldValue(`NumberOfMap`, props.modalObject.values[props.modalObject.Input].length || '');

            let FoundArray = props.modalObject.values[props.modalObject.Input];
            // alert(FoundArray.length)
            FoundArray.forEach((data, i) => {

                setFieldValue(`ASXCode${i}`, data.ASXCode || '');
                setFieldValue(`companyName${i}`, data.companyName || '');
                setFieldValue(`sharePrice${i}`, data.sharePrice || '');
                setFieldValue(`shares${i}`, data.shares || '');
                setFieldValue(`costBase${i}`, data.costBase || '');
                setFieldValue(`currentBalance${i}`, data.currentBalance || '');

            });
        }
    };

    let handleInput = (e, setFieldValue) => {

        const value = e.target.value > 50 ? 50 : e.target.value;
        setFieldValue(e.target.id, value);

        let arr = []

        for (let i = 0; i < value; i++) {
            arr.push("");
        }

        setDynamicFields(arr);
        setCurrentPage(1);
    };

    let handleChange = async (e, setFieldValue, i) => {
        const input = e.target;

        if (input.value) {
            const regex = /\.AX$/;
            let a = input.value.toUpperCase();
            setFieldValue(e.target.id, a);

            if (!regex.test(a)) {

                if (!input.className.includes("is-invalid")) {

                    input.className = input.className + " is-invalid "
                }
                return false;
            }
            else {
                input.className = input.className.replace(" is-invalid ", "")
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
                    setFieldValue(`sharePrice${i}`, "$" + ASX_Company.regularMarketPrice || 0);
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
                currentBalance: toCommaAndDollar((
                    (parseFloat((values[`costBase${i}`] || "0").toString().replace(/[^0-9.-]+/g, "")) || 0) +
                    (parseFloat(values[`shares${i}`]) || 0)
                ) * (parseFloat((values[`sharePrice${i}`] || "0").toString().replace(/[^0-9.-]+/g, "")) || 0)),
            };
            newEntries.push(newEntry);
        }

        // Log the new entries to verify
        console.log(newEntries);

        let DataOf = props.modalObject.Input;

        props.setFieldValue(DataOf, newEntries);

        let total = newEntries.reduce((total, entry) => total + parseFloat((entry.currentBalance).replace(/[^0-9.-]+/g, "")), 0);
        let totalCostBase = newEntries.reduce((total, entry) => total + parseFloat((entry.costBase).replace(/[^0-9.-]+/g, "")), 0);

        props.setFieldValue(DataOf + "CurrentBalance", toCommaAndDollar(total));
        props.setFieldValue(DataOf + "CostBaseTemp", toCommaAndDollar(totalCostBase));


        props.modalObject.setShowError(prevState => ({
            ...prevState,
            [`${DataOf + "CurrentBalance"}Error`]: false,
            [`${DataOf + "CurrentBalance"}Message`]: "",
            [`${DataOf + "CostBaseTemp"}Error`]: false,
            [`${DataOf + "CostBaseTemp"}Message`]: "",

        }))


        console.log(newEntries, "final obj")

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const renderRows = (currentPage, setFieldValue, values, handleChange) => {
        const pageSize = 10;
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        return dynamicFields.map((_, i) => {
            if (i >= startIndex && i < endIndex) {
                return (
                    <tr key={i}>
                        <td>{1 + i}</td>
                        <td>
                            <Field
                                type="text"
                                placeholder="Name of Institution"
                                id={`ASXCode${i}`}
                                name={`ASXCode${i}`}
                                className="form-control inputDesignDoubleInput"
                                onChange={(e) => handleChange(e, setFieldValue, i)}
                            />
                            <div className="invalid-feedback">
                                ASX Code is Incorrect it should end with .AX
                            </div>
                        </td>
                        <td style={{minWidth:"20rem"}}>
                            <Field
                                type="text"
                                placeholder="Company Name"
                                id={`companyName${i}`}
                                name={`companyName${i}`}
                                disabled
                                className="form-control inputDesignDoubleInput"
                            />
                        </td>
                        <td>
                            <Field
                                type="text"
                                placeholder="Share Price"
                                id={`sharePrice${i}`}
                                name={`sharePrice${i}`}
                                disabled
                                className="form-control inputDesignDoubleInput"
                            />
                        </td>
                        <td>
                            <Field
                                type="text"
                                placeholder="Shares"
                                id={`shares${i}`}
                                name={`shares${i}`}
                                className="form-control inputDesignDoubleInput"
                                disabled={!values[`sharePrice${i}`]}
                                onChange={(e) => {
                                    if (e.target.value > 1000) {
                                        setFieldValue(e.target.name, "1,000")
                                    }
                                    else {
                                        setFieldValue(e.target.name, parseFloat((e.target.value).toString().replace(/[^0-9.-]+/g, "")))
                                    }
                                }}
                            />
                        </td>
                        <td>
                            <Field
                                type="text"
                                placeholder="Cost base"
                                id={`costBase${i}`}
                                name={`costBase${i}`}
                                className="form-control inputDesignDoubleInput"
                                disabled={!values[`sharePrice${i}`]}
                                onChange={(e) => {

                                    setFieldValue(e.target.name,
                                        toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                }}
                            />
                        </td>
                        <td>
                            <Field
                                type="text"
                                placeholder="Current Balance"
                                id={`currentBalance${i}`}
                                name={`currentBalance${i}`}
                                disabled
                                value={toCommaAndDollar((
                                    (parseFloat((values[`costBase${i}`] || "0").toString().replace(/[^0-9.-]+/g, "")) || 0) +
                                    (parseFloat(values[`shares${i}`]) || 0)
                                ) * (parseFloat((values[`sharePrice${i}`] || "0").toString().replace(/[^0-9.-]+/g, "")) || 0))}

                                className="form-control inputDesignDoubleInput"
                            />
                        </td>
                    </tr>
                );
            }
            return null;
        });
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
                }, []);

                return (
                    <Form>
                        <Row>
                            <div className="col-md-12">
                                <div className='row justify-content-center'>
                                    <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                        <p className='text-end mt-3'>
                                            How many {title} does {nameSet} have :
                                        </p>
                                        <div style={{ width: "15%" }}>
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
                                                        <th>ASX Code</th>
                                                        <th>Company Name</th>
                                                        <th>Shares Price</th>
                                                        <th>Number of Shares</th>
                                                        <th>Cost base</th>
                                                        <th>Current Balance</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {renderRows(currentPage, setFieldValue, values, handleChange)}
                                                </tbody>
                                            </Table>
                                            {/* Ant Design Pagination Component */}
                                            {dynamicFields.length >= 10 && (
                                                <div className='w-100 CustomPaginantion d-flex justify-content-center'>
                                                    <Pagination
                                                        align="start"
                                                        defaultCurrent={1}
                                                        current={currentPage}
                                                        total={dynamicFields.length}
                                                        pageSize={pageSize}
                                                        onChange={handlePageChange}
                                                        showSizeChanger={false} // Optional, you can allow page size change if needed
                                                    />
                                                </div>
                                            )}
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
