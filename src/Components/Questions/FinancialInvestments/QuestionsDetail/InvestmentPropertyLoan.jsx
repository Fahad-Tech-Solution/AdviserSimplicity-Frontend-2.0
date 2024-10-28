import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BankDetail, defaultUrl, QuestionDetail } from '../../../../Store/Store';
import { handleInputBlur, handleInputChange, handleInputFocus, handleInputKeyDown, PatchAxios, PostAxios, toCommaAndDollar, toPercentage } from '../../../Assets/Api/Api';
import axios from 'axios';

const InvestmentPropertyLoan = (props) => {

    let bankDetailObj = useRecoilValue(BankDetail);


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


    let initialValues = { NumberOfMap: "1" };

    const fillInitialValues = (setFieldValue) => {
        let arr = []
        if (props.modalObject.editArray.length) {

            props.modalObject.editArray.map((data, index) => {
                setFieldValue(`LenderCurrent${index}`, data.LenderCurrent);
                setFieldValue(`LoanBalance${index}`, data.LoanBalance);
                setFieldValue(`LoanType${index}`, data.LoanType);
                setFieldValue(`RepaymentsAmount${index}`, data.RepaymentsAmount);
                setFieldValue(`Frequency${index}`, data.Frequency);
                setFieldValue(`AnnualRepayments${index}`, data.AnnualRepayments);
                setFieldValue(`InterestRate${index}`, data.InterestRate);
                setFieldValue(`LoanTerm${index}`, data.LoanTerm);
                setFieldValue(`LoanTermRemaining${index}`, data.LoanTermRemaining);
                setFieldValue(`DeductibleLoanAmount${index}`, data.DeductibleLoanAmount);
            })

        }

    };



    let DefaultUrl = useRecoilValue(defaultUrl)


    let onSubmit = async (values) => {
        // Extract the number of maps from the values
        const numberOfMaps = parseInt(values.NumberOfMap, 10);
        const newEntries = [];

        // Iterate through each map entry and create a new object
        for (let i = 0; i < numberOfMaps; i++) {
            const newEntry = {
                LenderCurrent: values[`LenderCurrent${i}`] || "",
                LoanBalance: values[`LoanBalance${i}`] || "",
                LoanType: values[`LoanType${i}`] || "",
                RepaymentsAmount: values[`RepaymentsAmount${i}`] || "",
                Frequency: values[`Frequency${i}`] || "",
                AnnualRepayments: values[`AnnualRepayments${i}`] || "",
                InterestRate: values[`InterestRate${i}`] || "",
                LoanTerm: values[`LoanTerm${i}`] || "",
                LoanTermRemaining: values[`LoanTermRemaining${i}`] || "",
                DeductibleLoanAmount: values[`DeductibleLoanAmount${i}`] || "",
            };
            newEntries.push(newEntry);
        }

        // Log the new entries to verify
        console.log(newEntries);

        let total = newEntries.reduce((total, entry) => total + (parseFloat(entry.AnnualRepayments.replace(/[^0-9.-]+/g, "")) || 0), 0);


        props.setFieldValue(`${props.modalObject.key}${props.modalObject.index}`, newEntries)
        // props.setFieldValue(`${props.modalObject.key3}${props.modalObject.index}`, total)
        props.setFieldValue(`${props.modalObject.mainKey}${props.modalObject.index}`, toCommaAndDollar(total))






        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
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

    const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
        value: (i + 1).toString(),
        label: ("Year " + (i + 1)).toString(),
    }))



    let FormulaSetting = () => {

    }

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
                                    <div className='col-md-5 d-none'>
                                        <p className='text-end mt-1'>
                                            How many {props.modalObject.title} does {nameSet} have :
                                        </p>
                                    </div>
                                    <div className='col-md-2 d-none'>
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
                                                        <th>Lender</th>
                                                        <th>Loan Balance</th>
                                                        <th>Loan Type</th>
                                                        <th>Repayments Amount</th>
                                                        <th>Frequency</th>
                                                        <th>Annual Repayments</th>
                                                        <th>Interest Rate (p.a)</th>
                                                        <th>Loan Term</th>
                                                        <th>Loan Term Remaining</th>
                                                        <th>Deductible Loan Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Array.from({ length: values.NumberOfMap }).map((_, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{1 + i}</td>
                                                                <td>
                                                                    <Field
                                                                        style={{ width: "150px" }}
                                                                        as="select"
                                                                        placeholder="Lender Current"
                                                                        id={`LenderCurrent${i}`}
                                                                        name={`LenderCurrent${i}`}
                                                                        className="form-select inputDesignDoubleInput"
                                                                    >
                                                                        <option value={""}>Please Select</option>
                                                                        {
                                                                            bankDetailObj?.FinancialInstitutions && bankDetailObj.FinancialInstitutions.length > 0 ? (
                                                                                bankDetailObj.FinancialInstitutions.map((elem, index) => (
                                                                                    <option key={index} value={elem._id}>
                                                                                        {elem.platformName}
                                                                                    </option>
                                                                                ))
                                                                            ) : (
                                                                                <option disabled>No Platforms Added in Super Annuation Funds</option>
                                                                            )
                                                                        }
                                                                    </Field>
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Loan Balance"
                                                                        id={`LoanBalance${i}`}
                                                                        name={`LoanBalance${i}`}
                                                                        className="form-control inputDesignDoubleInput"
                                                                        onChange={(e) => {
                                                                            setFieldValue(e.target.name,
                                                                                toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        as="select"
                                                                        placeholder="Lender Current"
                                                                        id={`LoanType${i}`}
                                                                        name={`LoanType${i}`}
                                                                        className="form-select inputDesignDoubleInput"
                                                                    >
                                                                        <option value={""}>Please Select</option>
                                                                        <option value={"i/only"}>i/only</option>
                                                                        <option value={"P&I"}>P&I</option>
                                                                    </Field>
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Repayments Amount"
                                                                        id={`RepaymentsAmount${i}`}
                                                                        name={`RepaymentsAmount${i}`}
                                                                        className="form-control inputDesignDoubleInput"
                                                                        onChange={(e) => {
                                                                            setFieldValue(e.target.name,
                                                                                toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));

                                                                            let frequency = values[`Frequency${i}`] || 0;
                                                                            let RepaymentsAmount = parseFloat(e.target.value.replace(/[^0-9.-]+/g, "")) || 0;

                                                                            setFieldValue(`AnnualRepayments${i}`, toCommaAndDollar(RepaymentsAmount * frequency));


                                                                        }}
                                                                    />
                                                                </td>

                                                                <td>
                                                                    <Field
                                                                        style={{ width: "150px" }}
                                                                        as="select"
                                                                        placeholder="Lender Current"
                                                                        id={`Frequency${i}`}
                                                                        name={`Frequency${i}`}
                                                                        className="form-select inputDesignDoubleInput"
                                                                        onChange={(e) => {
                                                                            setFieldValue(`Frequency${i}`, e.target.value);

                                                                            let frequency = e.target.value;
                                                                            let RepaymentsAmount = parseFloat(values[`RepaymentsAmount${i}`].replace(/[^0-9.-]+/g, ""));

                                                                            setFieldValue(`AnnualRepayments${i}`, toCommaAndDollar(RepaymentsAmount * frequency));
                                                                        }}
                                                                    >
                                                                        <option value={""}>Please Select</option>
                                                                        <option value={52}>Weekly </option>
                                                                        <option value={26}>Fortnightly </option>
                                                                        <option value={12}>Monthly </option>
                                                                        <option value={1}>Annually </option>

                                                                    </Field>
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Annual Repayments"
                                                                        id={`AnnualRepayments${i}`}
                                                                        name={`AnnualRepayments${i}`}
                                                                        disabled
                                                                        className="form-control inputDesignDoubleInput"
                                                                        onChange={(e) => {
                                                                            setFieldValue(e.target.name,
                                                                                toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Interest Rate (p.a)"
                                                                        id={`InterestRate${i}`}
                                                                        name={`InterestRate${i}`}
                                                                        onChange={(e) => handleInputChange(e, setFieldValue, FormulaSetting, values)}
                                                                        onFocus={(e) => handleInputFocus(e, setFieldValue)}
                                                                        onKeyDown={(e) => handleInputKeyDown(e)}
                                                                        onBlur={(e) => handleInputBlur(e, setFieldValue, toPercentage, FormulaSetting, values)}
                                                                        className="form-control inputDesignDoubleInput"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        as="select"
                                                                        placeholder="Lender Current"
                                                                        id={`LoanTerm${i}`}
                                                                        name={`LoanTerm${i}`}
                                                                        className="form-select inputDesignDoubleInput"
                                                                    >
                                                                        <option value={""}>Please Select</option>
                                                                        {loanTermOptions.map((option) => (
                                                                            <option key={option.value} value={option.value}>
                                                                                {option.label}
                                                                            </option>
                                                                        ))}
                                                                    </Field>
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        as="select"
                                                                        placeholder="Lender Current"
                                                                        id={`LoanTermRemaining${i}`}
                                                                        name={`LoanTermRemaining${i}`}
                                                                        className="form-select inputDesignDoubleInput"
                                                                    >
                                                                        <option value={""}>Please Select</option>
                                                                        {loanTermOptions.map((option) => (
                                                                            <option key={option.value} value={option.value}>
                                                                                {option.label}
                                                                            </option>
                                                                        ))}

                                                                    </Field>
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Deductible Loan Amount"
                                                                        id={`DeductibleLoanAmount${i}`}
                                                                        name={`DeductibleLoanAmount${i}`}
                                                                        onChange={(e) => handleInputChange(e, setFieldValue, FormulaSetting, values)}
                                                                        onFocus={(e) => handleInputFocus(e, setFieldValue)}
                                                                        onKeyDown={(e) => handleInputKeyDown(e)}
                                                                        onBlur={(e) => handleInputBlur(e, setFieldValue, toPercentage, FormulaSetting, values)}
                                                                        className="form-control inputDesignDoubleInput"
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

export default InvestmentPropertyLoan;
