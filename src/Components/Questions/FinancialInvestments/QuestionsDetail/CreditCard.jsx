import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BankDetail, defaultUrl, QuestionDetail } from '../../../../Store/Store';
import { handleInputBlur, handleInputChange, handleInputFocus, handleInputKeyDown, openNotificationSuccess, PatchAxios, PostAxios, toCommaAndDollar, toPercentage } from '../../../Assets/Api/Api';
import axios from 'axios';

const CreditCard = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
    let bankDetailObj = useRecoilValue(BankDetail)

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

    let creditCards = Object.keys(questionDetail.creditCards).length > 0 ? questionDetail.creditCards : {
        client: [],
        partner: [],
        joint: [],

    }; // Use an empty object as default if creditCards is undefined


    let initialValues = creditCards[props.modalObject.Input].length ? { NumberOfMap: creditCards[props.modalObject.Input].length } : { NumberOfMap: "" };

    const [dynamicFields, setDynamicFields] = useState([]);

    useEffect(() => {
        // console.log(questionDetail.creditCards, ":questionDetail.creditCards")
        if (creditCards[props.modalObject.Input] && creditCards[props.modalObject.Input].length) {

            let arr = []

            for (let i = 0; i < creditCards[props.modalObject.Input].length; i++) {
                arr.push("");
            }

            setDynamicFields(arr);

        }
    }, [])

    const fillInitialValues = (setFieldValue) => {

        if (creditCards[props.modalObject.Input] && creditCards[props.modalObject.Input].length) {

            creditCards[props.modalObject.Input].forEach((data, i) => {
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
                    // setFieldValue(`DeductibleLoanAmount${i}`, data.DeductibleLoanAmount || '');
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
                AnnualRepayments: values[`AnnualRepayments${i}`] || "",
                InterestRate: values[`InterestRate${i}`] || "",
                LoanTerm: values[`LoanTerm${i}`] || "",
                LoanTermRemaining: values[`LoanTermRemaining${i}`] || "",
                // DeductibleLoanAmount: values[`DeductibleLoanAmount${i}`] || "",
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
        obj[DataOf + "Total"] = toCommaAndDollar(newEntries.reduce((total, entry) => total + parseFloat(entry.AnnualRepayments.replace(/[^0-9.-]+/g, "")), 0));

        console.log(obj, "final obj")

        // Check if creditCards and the array at props.modalObject.Input exist
        // const bankAccountArray = creditCards[props.modalObject.Input] || [];
        const bankAccountArray = creditCards.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(`${DefaultUrl}/api/creditCards/Add`, obj);
            } else {
                obj.collection = props.modalObject.Input
                res = await PatchAxios(`${DefaultUrl}/api/creditCards/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, creditCards: res };
                setQuestionDetail(updatedData);
            }

            openNotificationSuccess("success", "topRight", "Success Notification", "Data of \"" + props.modalObject.title + "\" is Saved");
            // Reset the flag state if necessary
            if (props.flagState) {
                props.setFlagState(false);
            }
        } catch (error) {
            console.error("Error occurred while making API call:", error);
            openNotificationSuccess("error", "topRight", "Error Notification", "Data of \"" + props.modalObject.title + "\" is not Saved Please! try again");
        }
    };


    const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
        value: (i + 1).toString(),
        label: ("Year " + (i + 1)).toString(),
    }))

    let AnnualFormula = (values, setFieldValue, currentInput, index) => {

        let RepaymentsAmount = parseFloat(values[`RepaymentsAmount${index}`].replace(/[^0-9.-]+/g, ""));
        let Frequency = values[`Frequency${index}`];
        let AnnualRepayments = values[`AnnualRepayments${index}`];

        switch (currentInput.name.replace(/[0-9]/g, "")) {
            case "RepaymentsAmount":
                RepaymentsAmount = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
                break;
            case "Frequency":
                Frequency = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
                break;
            default:
                console.log("wrong Input")
                break;
        }

        AnnualRepayments = Frequency * RepaymentsAmount;

        console.log(RepaymentsAmount, Frequency, AnnualRepayments,);

        setFieldValue(`AnnualRepayments${index}`, toCommaAndDollar(AnnualRepayments))


    }

    let FormulaSetting = () => { }


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

                                    <div className="d-flex justify-content-center align-items-center gap-4">
                                        <p className='text-end mt-1 pt-2'>
                                            How many {props.modalObject.title} does {nameSet} have :
                                        </p>
                                        <div style={{ minWidth: "10%" }}>
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
                                                        <th>Lender</th>
                                                        <th>Loan Balance</th>
                                                        <th>Loan Type</th>
                                                        <th>Repayments Amount</th>
                                                        <th>Frequency</th>
                                                        <th>Annual Repayments</th>
                                                        <th>Interest Rate (p.a)</th>
                                                        <th>Loan Term </th>
                                                        <th>Loan Term Remaining  </th>
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
                                                                        as="select"
                                                                        placeholder="Lender Current"
                                                                        id={`LenderCurrent${i}`}
                                                                        name={`LenderCurrent${i}`}
                                                                        className="form-select inputDesignDoubleInput"
                                                                    >
                                                                        <option value={""}>Please Select</option>
                                                                        {bankDetailObj?.FinancialInstitutions.map((elem, index) => {
                                                                            return (<option key={index} value={elem._id}>{elem.platformName}</option>)
                                                                        })}
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
                                                                            setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")))
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
                                                                            setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")))
                                                                            AnnualFormula(values, setFieldValue, e.target, i);
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td style={{ width: "150px" }}>
                                                                    <Field
                                                                        as="select"
                                                                        placeholder="Lender Current"
                                                                        id={`Frequency${i}`}
                                                                        name={`Frequency${i}`}
                                                                        className="form-select inputDesignDoubleInput"
                                                                        onChange={(e) => {
                                                                            setFieldValue(e.target.name, e.target.value)
                                                                            AnnualFormula(values, setFieldValue, e.target, i);
                                                                        }}
                                                                    >
                                                                        <option value={""}>Please Select</option>
                                                                        <option value={52}>Weekly </option>
                                                                        <option value={26}>Fortnightly </option>
                                                                        <option value={12}>Monthly </option>
                                                                        <option value={1}>Annually</option>

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
                                                                    />
                                                                </td>
                                                                <td style={{ width: "150px" }}>
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

export default CreditCard;
