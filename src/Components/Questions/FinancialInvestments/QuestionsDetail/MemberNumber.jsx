import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BankDetail, defaultUrl, QuestionDetail } from '../../../../Store/Store';
import { PatchAxios, PostAxios, toCommaAndDollar } from '../../../Assets/Api/Api';
import DatePicker from 'react-datepicker';
import { SimpleSelectField } from './CreatableMultiSelectField';

const MemberNumber = (props) => {


    let initialValues = { NumberOfMap: 1 };

    let bankDetailObj = useRecoilValue(BankDetail);

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
                    setFieldValue(`fundType${i}`, data.fundType || '');
                    setFieldValue(`portfolioValue${i}`, data.portfolioValue || '');
                    setFieldValue(`eligibleServiceDate${i}`, data.eligibleServiceDate || '');
                    setFieldValue(`commencementDate${i}`, data.commencementDate || '');
                    setFieldValue(`taxFreeComponent${i}`, data.taxFreeComponent || '');
                    setFieldValue(`taxableComponent${i}`, data.taxableComponent || '');
                    setFieldValue(`restrictedNonPreserved${i}`, data.restrictedNonPreserved || '');
                    setFieldValue(`unrestrictedNonPreserved${i}`, data.unrestrictedNonPreserved || '');
                    setFieldValue(`preservedAmount${i}`, data.preservedAmount || '');
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
                fundType: values[`fundType${i}`] || "",
                portfolioValue: values[`portfolioValue${i}`] || "",
                eligibleServiceDate: values[`eligibleServiceDate${i}`] || "",
                commencementDate: values[`commencementDate${i}`] || "",
                taxFreeComponent: values[`taxFreeComponent${i}`] || "",
                taxableComponent: values[`taxableComponent${i}`] || "",
                restrictedNonPreserved: values[`restrictedNonPreserved${i}`] || "",
                unrestrictedNonPreserved: values[`unrestrictedNonPreserved${i}`] || "",
                preservedAmount: values[`preservedAmount${i}`] || "",
            };
            newEntries.push(newEntry);
        }

        // Log the new entries to verify
        console.log(newEntries);

        let total = newEntries.reduce((total, entry) => total + (parseFloat(entry.taxableComponent.replace(/[^0-9.-]+/g, "")) || 0), 0);
        let total2 = newEntries.reduce((total, entry) => total + (parseFloat(entry.preservedAmount.replace(/[^0-9.-]+/g, "")) || 0), 0);


        props.setFieldValue(`${props.modalObject.key}${props.modalObject.index}`, newEntries)
        // props.setFieldValue(`${props.modalObject.key3}${props.modalObject.index}`, total)
        props.setFieldValue(`${props.modalObject.mainKey}${props.modalObject.index}`, toCommaAndDollar(total + total2))

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
                                    <div className='col-md-7 d-none'>
                                        <p className='text-end mt-1'>
                                            {props.modalObject.question}
                                        </p>
                                    </div>
                                    <div className='col-md-3 d-none'>
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
                                                        <th>Fund type</th>
                                                        <th>Portfolio Value</th>
                                                        <th>Commencement Date</th>
                                                        <th>Eligible Service Date</th>
                                                        <th>Tax Free component</th>
                                                        <th>Taxable component</th>
                                                        <th>Restricted non preserved</th>
                                                        <th>Unrestricted non preserved</th>
                                                        <th>Preserved amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dynamicFields.map((elem, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{1 + i}</td>
                                                                <td style={{ minWidth: "150px" }}>
                                                                    <Field
                                                                        name={`fundType${i}`}
                                                                        component={SimpleSelectField}
                                                                        label="Multi Select Field"
                                                                        options={generateOptions(bankDetailObj, props.modalObject.values[`fundName${props.modalObject.index}`])}
                                                                        onChange={(selectedOption) => { setFieldValue(`investmentOption${i}`, selectedOption.value) }}
                                                                    />
                                                                </td>
                                                                <td style={{ minWidth: "90px" }}>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Portfolio Value"
                                                                        id={`portfolioValue${i}`}
                                                                        name={`portfolioValue${i}`}
                                                                        className="form-control inputDesign"
                                                                        onChange={(e) => {

                                                                            setFieldValue(`portfolioValue${i}`, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                            setFieldValue(`taxableComponent${i}`, toCommaAndDollar(parseFloat(e.target.value.replace(/[^0-9.-]+/g, "") || 0) - (parseFloat(values[`taxFreeComponent${i}`].replace(/[^0-9.-]+/g, "")) || 0)));
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td style={{ minWidth: "150px" }}>
                                                                    <div>
                                                                        <DatePicker
                                                                            className="form-control inputDesignDoubleInput shadow DateInputPadding"
                                                                            showIcon
                                                                            id={`eligibleServiceDate${i}`}
                                                                            name={`eligibleServiceDate${i}`}
                                                                            selected={values[`eligibleServiceDate${i}`]}
                                                                            onChange={(date) => setFieldValue(`eligibleServiceDate${i}`, date)}
                                                                            dateFormat="dd/MM/yyyy"
                                                                            placeholderText="dd/mm/yyyy"
                                                                            maxDate={new Date()}
                                                                            showMonthDropdown
                                                                            showYearDropdown
                                                                            dropdownMode="select"
                                                                            onBlur={handleBlur}
                                                                            wrapperClassName="w-100"
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td style={{ minWidth: "150px" }}>
                                                                    <div>
                                                                        <DatePicker
                                                                            className="form-control inputDesignDoubleInput shadow DateInputPadding"
                                                                            showIcon
                                                                            id={`commencementDate${i}`}
                                                                            name={`commencementDate${i}`}
                                                                            selected={values[`commencementDate${i}`]}
                                                                            onChange={(date) => setFieldValue(`commencementDate${i}`, date)}
                                                                            dateFormat="dd/MM/yyyy"
                                                                            placeholderText="dd/mm/yyyy"
                                                                            maxDate={new Date()}
                                                                            showMonthDropdown
                                                                            showYearDropdown
                                                                            dropdownMode="select"
                                                                            onBlur={handleBlur}
                                                                            wrapperClassName="w-100"
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Tax Free component"
                                                                        id={`taxFreeComponent${i}`}
                                                                        name={`taxFreeComponent${i}`}
                                                                        onChange={(e) => {
                                                                            setFieldValue(`taxFreeComponent${i}`, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                            setFieldValue(`taxableComponent${i}`, toCommaAndDollar((parseFloat(values[`portfolioValue${i}`].replace(/[^0-9.-]+/g, "")) || 0) - parseFloat(e.target.value.replace(/[^0-9.-]+/g, "") || 0)));
                                                                        }}
                                                                        className="form-control inputDesign"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Taxable component"
                                                                        id={`taxableComponent${i}`}
                                                                        name={`taxableComponent${i}`}
                                                                        disabled
                                                                        className="form-control inputDesign"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Restricted non preserved"
                                                                        id={`restrictedNonPreserved${i}`}
                                                                        name={`restrictedNonPreserved${i}`}
                                                                        className="form-control inputDesign"
                                                                        onChange={(e) => {
                                                                            setFieldValue(`restrictedNonPreserved${i}`, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                            setFieldValue(`preservedAmount${i}`, toCommaAndDollar((parseFloat(values[`portfolioValue${i}`].replace(/[^0-9.-]+/g, "")) || 0) - parseFloat(e.target.value.replace(/[^0-9.-]+/g, "") || 0) - ((parseFloat(values[`unrestrictedNonPreserved${i}`].replace(/[^0-9.-]+/g, ""))) || 0)));
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Unrestricted non preserved"
                                                                        id={`unrestrictedNonPreserved${i}`}
                                                                        name={`unrestrictedNonPreserved${i}`}
                                                                        className="form-control inputDesign"
                                                                        onChange={(e) => {
                                                                            setFieldValue(`unrestrictedNonPreserved${i}`, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                            setFieldValue(`preservedAmount${i}`, toCommaAndDollar((parseFloat(values[`portfolioValue${i}`].replace(/[^0-9.-]+/g, "")) || 0) - parseFloat(e.target.value.replace(/[^0-9.-]+/g, "") || 0) - ((parseFloat(values[`restrictedNonPreserved${i}`].replace(/[^0-9.-]+/g, ""))) || 0)));
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        disabled
                                                                        placeholder="Preserved amount"
                                                                        id={`preservedAmount${i}`}
                                                                        name={`preservedAmount${i}`}
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

export default MemberNumber;
