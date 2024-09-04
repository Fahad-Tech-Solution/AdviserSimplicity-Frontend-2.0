import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../Store/Store';
import { toCommaAndDollar, toPersentage } from '../../Assets/Api/Api';

const SalaryPackage = (props) => {

    let { title, key, parentValues } = props.modalObject;

    let initialValues = {}


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

    const [dynamicFields, setDynamicFields] = useState([]);

    const generateFields = (iteration) => {
        const upTill = parseFloat(iteration);
        const rows = [];

        for (let i = 0; i < upTill; i++) {
            rows.push(
                <tr key={i}>
                    <td>{1 + i}</td>
                    <td>
                        <Field
                            as="select"
                            id={`investmentOption`}
                            name={`investmentOption`}
                            className="form-select inputDesign"
                        >
                            <option value={""}>Please Select</option>
                            {options.map((elem, index) => {
                                return (<option key={index} value={elem}>{elem}</option>)
                            })}
                        </Field>
                    </td>
                    <td>
                        <Field
                            type="text"
                            placeholder="Investment Code"
                            id={`investmentCode`}
                            name={`investmentCode`}
                            className="form-control inputDesign"
                            disabled
                        />
                    </td>
                    <td>
                        <Field
                            type="number"
                            placeholder="Investment Value"
                            id={`investmentValue`}
                            name={`investmentValue`}
                            className="form-control inputDesign"
                        />
                    </td>
                </tr>
            );
        }

        setDynamicFields(rows);
    };

    const fillInitialValues = (setFieldValue) => {

        // if (props.modalObject.key.length) {
        //     generateFields(props.modalObject.key.length)
        // }

        // // setTimeout(() => {

        // if (props.modalObject.key) {
        //     props.modalObject.key.forEach((data, i) => {
        //         if (data) {
        //             console.log(data.investmentOption)
        //             setFieldValue(`investmentOption`, data.investmentOption || '');
        //             setFieldValue(`investmentCode`, data.investmentCode || '');
        //             setFieldValue(`investmentValue`, data.investmentValue || '');
        //         }
        //     });
        // }
        // }, 500);
    };

    let handleInput = (e, setFieldValue) => {
        const value = e.target.value > 10 ? 10 : e.target.value;
        setFieldValue(e.target.id, value);
        generateFields(value);
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
                investmentOption: values[`investmentOption`] || "",
                investmentCode: values[`investmentCode`] || "",
                investmentValue: values[`investmentValue`] || "",
            };
            newEntries.push(newEntry);
        }

        // Log the new entries to verify
        console.log(newEntries);

        let total = newEntries.reduce((total, entry) => total + entry.investmentValue, 0);


        props.setFieldValue(`${props.modalObject.key}${props.modalObject.index}`, newEntries)
        props.setFieldValue(`${props.modalObject.key3}${props.modalObject.index}`, total)
        props.setFieldValue(`${props.modalObject.mainKey}${props.modalObject.index}`, total - 475721)

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
                }, [values.NumberOfMap]);

                return (
                    <Form>
                        <Row>
                            <div className="col-md-12">
                                <div className='row justify-content-center'>
                                    <div className='mt-4'>
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Remuneration Type</th>
                                                    <th>Amount	</th>
                                                    <th>SG</th>
                                                    <th>Gross Salary</th>
                                                    <th>SGC	</th>
                                                    <th>Salary Sarifice Contributions	</th>
                                                    <th>After Tax Contributions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <Field
                                                            as="select"
                                                            id={`remunerationType`}
                                                            name={`remunerationType`}
                                                            className="form-select inputDesign"
                                                        >
                                                            <option value={""}>Select</option>
                                                            <option value={"Gross Salary"}>Gross Salary</option>
                                                            <option value={"Total Package"}>Total Package</option>

                                                        </Field>
                                                    </td>
                                                    <td style={{ minWidth: "100px" }}>
                                                        <Field
                                                            type="text"
                                                            placeholder="Investment Code"
                                                            id={`Amount`}
                                                            name={`Amount`}
                                                            className="form-control inputDesign"
                                                            onChange={(e) => {
                                                                setFieldValue(e.target.name,
                                                                    toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                            }}
                                                        />
                                                    </td>
                                                    <td style={{ minWidth: "100px" }}>
                                                        <Field
                                                            type="number"
                                                            placeholder="Enter SG value"
                                                            id={`SGPercentage`}
                                                            name={`SGPercentage`}
                                                            className="form-control inputDesign"
                                                            onChange={(e) => {
                                                                setFieldValue(e.target.name,
                                                                    toPersentage(e.target.value));
                                                            }}
                                                        />
                                                    </td>

                                                    <td style={{ minWidth: "100px" }}>
                                                        <Field
                                                            type="text"
                                                            placeholder="Gross Salary"
                                                            id={`GrossSalary`}
                                                            name={`GrossSalary`}
                                                            className="form-control inputDesign"
                                                            disabled
                                                        />
                                                    </td>

                                                    <td style={{ minWidth: "100px" }}>
                                                        <Field
                                                            type="text"
                                                            placeholder="SGC"
                                                            id={`SGC`}
                                                            name={`investmentCode`}
                                                            className="form-control inputDesign"
                                                            disabled
                                                        />
                                                    </td>
                                                    <td style={{ minWidth: "100px" }}>
                                                        <Field
                                                            type="text"
                                                            placeholder="Salary Sarifice Contributions"
                                                            id={`salarySarificeContributions`}
                                                            name={`salarySarificeContributions`}
                                                            className="form-control inputDesign"
                                                        />
                                                    </td>
                                                    <td>
                                                        <Field
                                                            type="text"
                                                            placeholder="After Tax Contributions"
                                                            id={`afterTaxContributions`}
                                                            name={`afterTaxContributions`}
                                                            className="form-control inputDesign"
                                                        />
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

export default SalaryPackage;
