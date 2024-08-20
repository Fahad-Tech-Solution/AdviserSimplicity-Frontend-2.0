import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../../Store/Store';
import { PatchAxios, PostAxios } from '../../../Assets/Api/Api';
import axios from 'axios';

const InvestmentPropertyLoan = (props) => {
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

    let investmentPropertyLoan = Object.keys(questionDetail.investmentPropertyLoan).length > 0 ? questionDetail.investmentPropertyLoan : {
        client: [],
        partner: [],
        joint: [],

    }; // Use an empty object as default if investmentPropertyLoan is undefined


    let initialValues = investmentPropertyLoan[props.modalObject.Input].length ? { NumberOfMap: investmentPropertyLoan[props.modalObject.Input].length } : { NumberOfMap: "" };

    const [dynamicFields, setDynamicFields] = useState([]);


    useEffect(() => {
        if (investmentPropertyLoan[props.modalObject.Input] && investmentPropertyLoan[props.modalObject.Input].length) {

            let arr = []

            for (let i = 0; i < investmentPropertyLoan[props.modalObject.Input].length; i++) {
                arr.push("");
            }

            setDynamicFields(arr);

        }
    }, [])

    const fillInitialValues = (setFieldValue) => {

        if (investmentPropertyLoan[props.modalObject.Input] && investmentPropertyLoan[props.modalObject.Input].length) {

            investmentPropertyLoan[props.modalObject.Input].forEach((data, i) => {
                if (data) {
                    setFieldValue(`LenderCurrent${i}`, data.LenderCurrent || '');
                    setFieldValue(`LoanBalance${i}`, data.LoanBalance || '');
                    setFieldValue(`LoanType${i}`, data.LoanType || '');
                    setFieldValue(`RepaymentsAmount${i}`, data.RepaymentsAmount || '');
                    setFieldValue(`Frequency${i}`, data.Frequency || '');
                    setFieldValue(`AnnualRepayments${i}`, data.AnnualRepayments || '');
                    setFieldValue(`InterestRate${i}`, data.InterestRate || '');
                    setFieldValue(`LoanTerm${i}`, data.LoanTerm || '');
                    setFieldValue(`LoanTermRemaining${i}`, data.LoanTermRemaining || '');
                    setFieldValue(`DeductibleLoanAmount${i}`, data.DeductibleLoanAmount || '');
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
                LenderCurrent: values[`LenderCurrent${i}`] || "",
                LoanBalance: values[`LoanBalance${i}`] || "",
                LoanType: values[`LoanType${i}`] || "",
                RepaymentsAmount: values[`RepaymentsAmount${i}`] || "",
                Frequency: values[`Frequency${i}`] || "",
                AnnualRepayments: ((values[`RepaymentsAmount${i}`] || 0) * (values[`Frequency${i}`] || 0)) || "",
                InterestRate: values[`InterestRate${i}`] || "",
                LoanTerm: values[`LoanTerm${i}`] || "",
                LoanTermRemaining: values[`LoanTermRemaining${i}`] || "",
                DeductibleLoanAmount: values[`DeductibleLoanAmount${i}`] || "",
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
        obj[DataOf + "Total"] = newEntries.reduce((total, entry) => total + entry.AnnualRepayments, 0);

        console.log(obj, "final obj")

        // Check if investmentPropertyLoan and the array at props.modalObject.Input exist
        // const bankAccountArray = investmentPropertyLoan[props.modalObject.Input] || [];
        const bankAccountArray = investmentPropertyLoan.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(`${DefaultUrl}/api/investmentPropertyLoan/Add`, obj);
            } else {
                obj.collection = props.modalObject.Input
                res = await PatchAxios(`${DefaultUrl}/api/investmentPropertyLoan/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, investmentPropertyLoan: res };
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
                                            How many {props.modalObject.title} does {nameSet} have:
                                        </p>
                                    </div>
                                    <div className='col-md-2'>
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
                                                        <th>Lender </th>
                                                        <th>Current Loan Balance</th>
                                                        <th>Loan Type</th>
                                                        <th>Repayments Amount</th>
                                                        <th>Frequency</th>
                                                        <th>Annual Repayments</th>
                                                        <th>Interest Rate (p.a)</th>
                                                        <th>Loan Term </th>
                                                        <th>Loan Term Remaining  </th>
                                                        <th>Deductible Loan Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dynamicFields.map((elem, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{1 + i}</td>
                                                                <td>
                                                                    <Field
                                                                        as="select"
                                                                        placeholder="Lender Current"
                                                                        id={`LenderCurrent${i}`}
                                                                        name={`LenderCurrent${i}`}
                                                                        className="form-select inputDesignDoubleInput"
                                                                    >
                                                                        <option value={""}>Please Select</option>
                                                                        {options.map((elem, index) => {
                                                                            return (<option key={index} value={elem}>{elem}</option>)
                                                                        })}
                                                                    </Field>
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="number"
                                                                        placeholder="Loan Balance"
                                                                        id={`LoanBalance${i}`}
                                                                        name={`LoanBalance${i}`}
                                                                        className="form-control inputDesignDoubleInput"
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
                                                                        type="number"
                                                                        placeholder="Repayments Amount"
                                                                        id={`RepaymentsAmount${i}`}
                                                                        name={`RepaymentsAmount${i}`}
                                                                        className="form-control inputDesignDoubleInput"
                                                                    />
                                                                </td>

                                                                <td>
                                                                    <Field
                                                                        as="select"
                                                                        placeholder="Lender Current"
                                                                        id={`Frequency${i}`}
                                                                        name={`Frequency${i}`}
                                                                        className="form-select inputDesignDoubleInput"
                                                                    >
                                                                        <option value={""}>Please Select</option>
                                                                        <option value={52}>Weekly (52)</option>
                                                                        <option value={26}>Fortnightly (26)</option>
                                                                        <option value={12}>Monthly (12)</option>
                                                                        <option value={1}>Annually (1)</option>

                                                                    </Field>
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="number"
                                                                        placeholder="Annual Repayments"
                                                                        id={`AnnualRepayments${i}`}
                                                                        name={`AnnualRepayments${i}`}
                                                                        value={(values[`Frequency${i}`] || 0) * (values[`RepaymentsAmount${i}`] || 0)}
                                                                        className="form-control inputDesignDoubleInput"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Interest Rate (p.a)"
                                                                        id={`InterestRate${i}`}
                                                                        name={`InterestRate${i}`}
                                                                        onBlur={(e) => handleBlur(setFieldValue, e)}
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
                                                                        <option value={"abc"}>abc</option>

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
                                                                        <option value={"abc"}>abc</option>

                                                                    </Field>
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="number"
                                                                        placeholder="Deductible Loan Amount"
                                                                        id={`DeductibleLoanAmount${i}`}
                                                                        name={`DeductibleLoanAmount${i}`}
                                                                        value={100}
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
