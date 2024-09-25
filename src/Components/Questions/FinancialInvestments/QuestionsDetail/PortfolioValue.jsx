import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { BankDetail, defaultUrl } from '../../../../Store/Store';
import { toCommaAndDollar } from '../../../Assets/Api/Api';
import { Pagination } from 'antd';
import { SimpleSelectField } from './CreatableMultiSelectField';

const PortfolioValue = (props) => {


    let initialValues = props.modalObject.editArray.length ? { NumberOfMap: props.modalObject.editArray.length } : { NumberOfMap: "" };
    let bankDetailObj = useRecoilValue(BankDetail);


    // const options = [
    //     "Adelaide Bank",
    //     "Alliance Bank",
    //     "AMP",
    //     "ANZ",
    //     "Arab Bank Australia",
    //     "Australian Military Bank (ADCU)",
    //     "Australian Mutual Bank",
    //     "Australian Unity",
    //     "Auswide Bank",
    //     "AWA Alliance Bank",
    //     "Bank Australia (bankmecu)",
    //     "Bank First",
    //     "Bank of Melbourne",
    //     "Bank of Queensland (BOQ)",
    //     "Bank of Sydney",
    //     "BankSA",
    //     "BankVic",
    //     "Bankwest",
    //     "BCU",
    //     "BDCU Alliance Bank",
    //     "Bendigo Bank",
    //     "Beyond Bank",
    //     "Border Bank",
    //     "Circle Alliance Bank",
    //     "Citi",
    //     "Commonwealth Bank",
    //     "Community First Bank",
    //     "Credit Union SA",
    //     "Defence Bank",
    //     "Delphi Bank",
    //     "Easy Street",
    //     "First Choice Credit Union",
    //     "First Option Bank",
    //     "firstmac",
    //     "G&C Mutual",
    //     "Gateway Bank Ltd",
    //     "Geelong Bank",
    //     "Great Southern Bank",
    //     "Greater Bank",
    //     "Hay",
    //     "Heartland Bank",
    //     "Heritage Bank",
    //     "Horizon Bank",
    //     "HSBC Australia",
    //     "Hume Bank",
    //     "Illawarra Credit Union",
    //     "IMB",
    //     "ING",
    //     "Judo Bank",
    //     "Macquarie Bank",
    //     "ME",
    //     "MOVE Bank",
    //     "MyState Bank",
    //     "NAB",
    //     "Newcastle Permanent",
    //     "P&N Bank",
    //     "People’s Choice CU",
    //     "Policebank",
    //     "Prospa",
    //     "Qudos Bank",
    //     "Rabobank",
    //     "RACQ",
    //     "RAMS",
    //     "Regional Australia Bank",
    //     "Rural Bank",
    //     "Service One Alliance Bank",
    //     "St.George",
    //     "Suncorp Bank",
    //     "Teachers Mutual Bank",
    //     "Ubank",
    //     "UniBank",
    //     "Up Bank",
    //     "Virgin Money",
    //     "Westpac",
    //     "Zeller"
    // ];

    const [dynamicFields, setDynamicFields] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const fillInitialValues = (setFieldValue) => {



        let arr = []

        for (let index = 0; index < props.modalObject.editArray.length; index++) {

            arr.push("")

        }

        setDynamicFields(arr)

        if (props.modalObject.editArray) {
            setFieldValue(`NumberOfMap`, props.modalObject.editArray.length || '');

            props.modalObject.editArray.forEach((data, i) => {
                if (data) {
                    console.log(data.investmentOption)
                    setFieldValue(`investmentOption${i}`, data.investmentOption || '');
                    setFieldValue(`investmentCode${i}`, data.investmentCode || '');
                    setFieldValue(`investmentValue${i}`, data.investmentValue || '');
                }
            });
        }
    };

    let handleInput = (e, setFieldValue) => {
        const value = e.target.value > 50 ? 50 : e.target.value;
        setFieldValue(e.target.id, value);

        let arr = []

        for (let index = 0; index < value; index++) {

            arr.push("")

        }

        setDynamicFields(arr)


        // generateFields(value);
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
                investmentOption: values[`investmentOption${i}`] || "",
                investmentCode: values[`investmentCode${i}`] || "",
                investmentValue: values[`investmentValue${i}`] || "",
            };
            newEntries.push(newEntry);
        }

        // Log the new entries to verify
        console.log(newEntries);

        let total = newEntries.reduce((total, entry) => total + parseFloat((entry.investmentValue).replace(/[^0-9.-]+/g, "")), 0);


        props.setFieldValue(`${props.modalObject.key}${props.modalObject.index}`, newEntries)
        // props.setFieldValue(`${props.modalObject.key3}${props.modalObject.index}`, toCommaAndDollar(total))
        // props.setFieldValue(`${props.modalObject.mainKey}${props.modalObject.index}`, toCommaAndDollar(total - 475721))
        props.setFieldValue(`${props.modalObject.mainKey}${props.modalObject.index}`, toCommaAndDollar(total))

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }
    };


    const generateOptions = (bankDetailObj, platformName) => {
        const InstituteOptions = [];

        if (Array.isArray(bankDetailObj) && bankDetailObj.length > 0) {
            bankDetailObj.forEach((elem) => {
                // Check if the platform name matches
                if (platformName === elem._id) {
                    // Add the main option for the element
                    // InstituteOptions.push({ value: elem._id, label: `${elem.name} (${elem.arrayOfOffers.length} offers)` });

                    // Add InstituteOptions from arrayOfOffers if available
                    if (Array.isArray(elem.arrayOfOffers) && elem.arrayOfOffers.length > 0) {
                        elem.arrayOfOffers.forEach((offerElem) => {
                            InstituteOptions.push({ value: offerElem._id, label: `${offerElem.name} (${offerElem.code})` });
                        });
                    }
                }
            });
        }


        // console.log(InstituteOptions, bankDetailObj, platformName, "data")

        return InstituteOptions;
    };


    let getCodeForOption = (SelectedOffer, platformName) => {
        let code = "";
        if (Array.isArray(bankDetailObj) && bankDetailObj.length > 0) {
            bankDetailObj.forEach((elem) => {
                // Check if the platform name matches
                if (platformName === elem._id) {
                    // Add the main option for the element
                    // InstituteOptions.push({ value: elem._id, label: `${elem.name} (${elem.arrayOfOffers.length} offers)` });

                    // Add InstituteOptions from arrayOfOffers if available
                    if (Array.isArray(elem.arrayOfOffers) && elem.arrayOfOffers.length > 0) {
                        elem.arrayOfOffers.forEach((offerElem) => {
                            // InstituteOptions.push({ value: offerElem.name, label: offerElem.name });
                            if (SelectedOffer == offerElem._id) {
                                code = offerElem.code
                            }

                        });
                    }
                }
            });
        }

        return code;
    }

    const renderRows = (currentPage, setFieldValue, values, handleChange) => {
        const pageSize = 10;
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        return dynamicFields.map((_, i) => {
            if (i >= startIndex && i < endIndex) {
                return (
                    <tr key={i}>
                        <td>{1 + i}</td>
                        <td style={{ width: "35%" }}>

                            <Field
                                name={`investmentOption${i}`}
                                component={SimpleSelectField}
                                label="Multi Select Field"
                                options={generateOptions(bankDetailObj, props.modalObject.values[`platformName${props.modalObject.index}`])}
                                onChange={(selectedOption) => {

                                    const code = getCodeForOption(selectedOption.value, props.modalObject.values[`platformName${props.modalObject.index}`]);
                                    // Custom function on change
                                    console.log(`Selected option: ${selectedOption.value}`, "code is :", code);
                                    // Run additional logic or actions

                                    setFieldValue(`investmentOption${i}`, selectedOption.value)

                                    setFieldValue(`investmentCode${i}`, code)

                                }}
                            />

                        </td>
                        <td style={{ width: "150px" }}>
                            <Field
                                type="text"
                                placeholder="Investment Code"
                                id={`investmentCode${i}`}
                                name={`investmentCode${i}`}
                                className="form-control inputDesignDoubleInput"
                                disabled
                            />
                        </td>
                        <td>
                            <Field
                                type="text"
                                placeholder="Investment Value"
                                id={`investmentValue${i}`}
                                name={`investmentValue${i}`}
                                className="form-control inputDesignDoubleInput"
                                onChange={(e) => {
                                    setFieldValue(e.target.name,
                                        toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                }}
                            />
                        </td>
                    </tr>
                );
            }
            return null;
        });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
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
                                            className="form-control inputDesignDoubleInput"
                                            onChange={(e) => handleInput(e, setFieldValue)}
                                        />
                                    </div>
                                    {values.NumberOfMap && (
                                        <div className='mt-4'>
                                            <Table striped bordered responsive hover>
                                                <thead>
                                                    <tr>
                                                        <th>No#</th>
                                                        <th>Investment Option</th>
                                                        <th>Investment Code</th>
                                                        <th>Investment Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {renderRows(currentPage, setFieldValue, values, handleChange)}
                                                </tbody>
                                            </Table>

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

export default PortfolioValue;
