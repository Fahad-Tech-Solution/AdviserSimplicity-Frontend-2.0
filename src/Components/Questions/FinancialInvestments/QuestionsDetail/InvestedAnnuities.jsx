import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, InputGroup, Row, Table } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { BankDetail, defaultUrl, QuestionDetail } from '../../../../Store/Store';
import { openNotificationSuccess, RenderName, toCommaAndDollar } from '../../../Assets/Api/Api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import InnerModal from './InnerModal';
import PortfolioValue from './PortfolioValue';
import DynamicYesNo from './DynamicYesNo';
import MemberNumber from './MemberNumber';
import GroupInsurance from './GroupInsurance';
import Contributions from './Contributions';
import Beneficiaries from './Beneficiaries';
import AnnualPensionPaymentInnerModal from './AnnualPensionPaymentInnerModal';

const InvestedAnnuities = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);

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

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});


    let annuitiesIssues = Object.keys(questionDetail.annuitiesIssues).length > 0 ? questionDetail.annuitiesIssues : {
        client: [],
        partner: [],
        joint: [],
    };  // Use an empty object as default if annuitiesIssues is undefined


    let initialValues = { NumberOfMap: "" };

    const [dynamicFields, setDynamicFields] = useState([]);


    useEffect(() => {
        if (props.modalObject.values[props.modalObject.Input] && props.modalObject.values[props.modalObject.Input].length) {
            let arr = []

            for (let i = 0; i < props.modalObject.values[props.modalObject.Input].length; i++) {
                arr.push("");
            }
            setDynamicFields(arr);
        }
    }, [])

    const fillInitialValues = (setFieldValue) => {

        if (props.modalObject.values[props.modalObject.Input] && props.modalObject.values[props.modalObject.Input].length > 0) {
            setFieldValue(`NumberOfMap`, props.modalObject.values[props.modalObject.Input].length || '');

            let FoundArray = props.modalObject.values[props.modalObject.Input];
            // alert(FoundArray.length)
            FoundArray.forEach((data, i) => {
                if (data) {
                    setFieldValue(`productProvider${i}`, data.productProvider || '');
                    setFieldValue(`accountNumber${i}`, data.accountNumber || '');
                    setFieldValue(`sourceFunds${i}`, data.sourceFunds || '');
                    setFieldValue(`originalInvestmentAmount${i}`, data.originalInvestmentAmount || '');
                    setFieldValue(`returnCapitalValue${i}`, data.returnCapitalValue || '');
                    setFieldValue(`annualAnnuityPayment${i}`, data.annualAnnuityPayment || '');
                    setFieldValue(`annualPensionPaymentArray${i}`, data.annualPensionPaymentArray || '');
                    setFieldValue(`annuityType${i}`, data.annuityType || '');
                    setFieldValue(`term${i}`, data.term || '');
                    setFieldValue(`yearsMaturity${i}`, data.yearsMaturity || '');
                    setFieldValue(`beneficiariesArray${i}`, data.beneficiariesArray || '');
                    setFieldValue(`nominatedBeneficiaries${i}`, data.nominatedBeneficiaries || '');
                    setFieldValue(`annualAdvice${i}`, data.annualAdvice || '');
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

    let handleInnerModal = (title, question, key, mainKey, key3, editArray, index, values) => {
        console.log(values);
        let ParentModal = props.modalObject.title;
        setModalObject({
            title,
            question,
            key,
            mainKey,
            key3,
            editArray: editArray || [],
            index,
            values,
            ParentModal
        })
        setFlagState(true);
    }

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
                productProvider: values[`productProvider${i}`] || "",
                accountNumber: values[`accountNumber${i}`] || "",
                sourceFunds: values[`sourceFunds${i}`] || "",
                originalInvestmentAmount: values[`originalInvestmentAmount${i}`] || "",
                returnCapitalValue: values[`returnCapitalValue${i}`] || "",
                annualAnnuityPayment: values[`annualAnnuityPayment${i}`] || "",
                annualPensionPaymentArray: values[`annualPensionPaymentArray${i}`] || "",
                annuityType: values[`annuityType${i}`] || "",
                term: values[`term${i}`] || "",
                yearsMaturity: values[`yearsMaturity${i}`] || "",
                nominatedBeneficiaries: values[`nominatedBeneficiaries${i}`] || "",
                beneficiariesArray: values[`beneficiariesArray${i}`] || "",
                annualAdvice: values[`annualAdvice${i}`] || "",
            };


            newEntries.push(newEntry);
        }

        // Log the new entries to verify
        console.log(newEntries);

        let DataOf = props.modalObject.Input;

        props.setFieldValue(DataOf, newEntries);

        let total = newEntries.reduce((total, entry) => total + parseFloat((entry.originalInvestmentAmount).replace(/[^0-9.-]+/g, "")), 0);

        props.setFieldValue(DataOf + "CurrentBalance", toCommaAndDollar(total));


        props.modalObject.setShowError(prevState => ({
            ...prevState,
            [`${DataOf + "CurrentBalance"}Error`]: false,
            [`${DataOf + "CurrentBalance"}Message`]: "",
        }))

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }

    };

    const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
        value: (i + 1).toString(),
        label: ("Year " + (i + 1)).toString(),
    }))

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
                }, []);

                return (
                    <Form>
                        <Row>
                            <InnerModal modalObject={modalObject} setFieldValue={setFieldValue} setFlagState={setFlagState} flagState={flagState} >
                                {
                                    modalObject.key === "portfolioArray" ? <PortfolioValue /> :
                                        modalObject.key === "memberArray" ? <MemberNumber /> :
                                            modalObject.key === "groupInsuranceArray" ? <GroupInsurance /> :
                                                modalObject.key === "ContributionsArray" ? <Contributions /> :
                                                    modalObject.key === "beneficiariesArray" ? <Beneficiaries /> :
                                                        modalObject.key === "annualPensionPaymentArray" ? <AnnualPensionPaymentInnerModal /> : ""

                                }
                            </InnerModal>
                            <div className="col-md-12">
                                <div className='row justify-content-center'>
                                    <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                        <p className='text-end mt-3'>
                                            How many Annuities does {nameSet} have :
                                        </p>

                                        <div style={{ width: "8%" }}>
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
                                                        <th onClick={() => { console.log(values) }}>No#</th>
                                                        <th>Product Provider</th>
                                                        <th>Account Number</th>
                                                        <th>Source of Funds</th>
                                                        <th>Original Investment Amount</th>
                                                        <th>Return of Capital Value</th>
                                                        <th>Annual Annuity Payment</th>
                                                        <th>Annuity Type</th>
                                                        <th>Term</th>
                                                        <th>Years to Maturity</th>
                                                        <th>Nominated Beneficiaries</th>
                                                        <th>Annual Advice Service Fee </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dynamicFields.map((elem, i) => {
                                                        return (<tr key={i}>
                                                            <td>{1 + i}</td>
                                                            <td>
                                                                <Field
                                                                    as="select"
                                                                    placeholder="Product Provider"
                                                                    id={`productProvider${i}`}
                                                                    name={`productProvider${i}`}
                                                                    className="form-select inputDesignDoubleInput"
                                                                >
                                                                    <option value={""}>Please Select</option>
                                                                    {
                                                                        bankDetailObj?.Annuities && bankDetailObj.Annuities.length > 0 ? (
                                                                            bankDetailObj.Annuities.map((elem, index) => (
                                                                                <option key={index} value={elem._id}>
                                                                                    {elem.platformName}
                                                                                </option>
                                                                            ))
                                                                        ) : (
                                                                            <option disabled>No Platforms Added in Annuities</option>
                                                                        )
                                                                    }
                                                                </Field>
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    style={{ minWidth: "100px" }}
                                                                    type="number"
                                                                    placeholder="Account Number"
                                                                    id={`accountNumber${i}`}
                                                                    name={`accountNumber${i}`}
                                                                    className="form-control inputDesignDoubleInput"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    style={{ minWidth: "100px" }}
                                                                    placeholder="Source of Funds"
                                                                    id={`sourceFunds${i}`}
                                                                    as="select"
                                                                    name={`sourceFunds${i}`}
                                                                    className="form-select inputDesignDoubleInput"
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value="Ordinary">Ordinary</option>
                                                                    <option value="Super">Super</option>
                                                                </Field>

                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="text"
                                                                    style={{ minWidth: "100px" }}
                                                                    placeholder="Original Investment Amount"
                                                                    id={`originalInvestmentAmount${i}`}
                                                                    name={`originalInvestmentAmount${i}`}
                                                                    className="form-control inputDesignDoubleInput"
                                                                    onChange={(e) => {
                                                                        setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                    }}
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    style={{ minWidth: "100px" }}
                                                                    type="text"
                                                                    placeholder="Return of Capital Value"
                                                                    id={`returnCapitalValue${i}`}
                                                                    name={`returnCapitalValue${i}`}
                                                                    className="form-control inputDesignDoubleInput"
                                                                    onChange={(e) => {
                                                                        setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                    }}
                                                                />
                                                            </td>
                                                            <td>
                                                                <InputGroup className="mb-3" style={{ width: "150px" }}>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Pension Payment"
                                                                        id={`annualAnnuityPayment${i}`}
                                                                        name={`annualAnnuityPayment${i}`}
                                                                        className="form-control inputDesignDoubleInput"
                                                                        onChange={(e) => {
                                                                            setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                        }}
                                                                    />
                                                                    <Button className='btn bgColor modalBtn border-0' id="button-addon2" onClick={() => {
                                                                        // if (values[`productProvider${i}`]) {
                                                                        let name = RenderName(props.modalObject.Input);
                                                                        //     bankDetailObj.map((elem, index) => {

                                                                        //         if (elem._id === values[`productProvider${i}`]) {
                                                                        //             name = elem.platformName
                                                                        //         }

                                                                        //     });
                                                                        handleInnerModal(name + "_Annual Pension Payment", '', "annualPensionPaymentArray", "annualAnnuityPayment", "", values[`annualPensionPaymentArray${i}`], i, values)
                                                                        // }
                                                                        // else {
                                                                        //     // type, placement, message, description
                                                                        //     openNotificationSuccess("error", 'topRight', "Error Notification", "Please! Select Fund Name First")
                                                                        // }
                                                                    }}>
                                                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                    </Button>
                                                                </InputGroup>
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    style={{ minWidth: "100px" }}
                                                                    type="text"
                                                                    placeholder="Annuity Type"
                                                                    id={`annuityType${i}`}
                                                                    name={`annuityType${i}`}
                                                                    as="select"
                                                                    className="form-select inputDesignDoubleInput"
                                                                    onChange={(e) => {
                                                                        setFieldValue(e.target.name, e.target.value);
                                                                        if (e.target.value === "Lifetime") {
                                                                            setFieldValue(`term${i}`, "");
                                                                            setFieldValue(`yearsMaturity${i}`, "");
                                                                        }
                                                                    }}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value="Fixed Term">Fixed Term</option>
                                                                    <option value="Lifetime">Life Time</option>
                                                                </Field>
                                                            </td>
                                                            <td>
                                                                {values[`annuityType${i}`] !== "Fixed Term" &&
                                                                    <Field
                                                                        style={{ minWidth: "100px" }}
                                                                        type="number"
                                                                        placeholder="Term"
                                                                        id={`term${i}`}
                                                                        name={`term${i}`}
                                                                        className="form-control inputDesignDoubleInput"
                                                                        disabled={values[`annuityType${i}`] == "Lifetime"}
                                                                    />}
                                                                {values[`annuityType${i}`] === "Fixed Term" &&
                                                                    <Field
                                                                        placeholder="Term"
                                                                        id={`term${i}`}
                                                                        name={`term${i}`}
                                                                        as="select"
                                                                        className="form-select inputDesignDoubleInput"
                                                                    >
                                                                        <option value="">Select</option>
                                                                        {loanTermOptions.map((option) => (
                                                                            <option key={option.value} value={option.value}>
                                                                                {option.label}
                                                                            </option>
                                                                        ))}
                                                                    </Field>
                                                                }
                                                            </td>
                                                            <td>
                                                                {values[`annuityType${i}`] !== "Fixed Term" &&
                                                                    <Field
                                                                        style={{ minWidth: "100px" }}
                                                                        type="number"
                                                                        placeholder="Years to Maturity"
                                                                        disabled={values[`annuityType${i}`] == "Lifetime"}
                                                                        id={`yearsMaturity${i}`}
                                                                        name={`yearsMaturity${i}`}
                                                                        className="form-control inputDesignDoubleInput"
                                                                    />}
                                                                {values[`annuityType${i}`] === "Fixed Term" &&
                                                                    <Field
                                                                        placeholder="Years to Maturity"
                                                                        id={`yearsMaturity${i}`}
                                                                        name={`yearsMaturity${i}`}
                                                                        as="select"
                                                                        className="form-select inputDesignDoubleInput"
                                                                    >
                                                                        <option value="">Select</option>
                                                                        {loanTermOptions.map((option) => (
                                                                            <option key={option.value} value={option.value}>
                                                                                {option.label}
                                                                            </option>
                                                                        ))}
                                                                    </Field>
                                                                }
                                                            </td>
                                                            <td>
                                                                <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                                    <DynamicYesNo name={`nominatedBeneficiaries${i}`} values={values} handleChange={handleChange} />
                                                                    {values[`nominatedBeneficiaries${i}`] === "Yes" &&
                                                                        <Button className='btn bgColor modalBtn border-0' id="button-addon2" onClick={() => {
                                                                            // if (values[`productProvider${i}`]) {
                                                                            let name = RenderName(props.modalObject.Input);
                                                                            //     bankDetailObj.map((elem, index) => {

                                                                            //         if (elem._id === values[`productProvider${i}`]) {
                                                                            //             name = elem.platformName
                                                                            //         }

                                                                            //     });
                                                                            handleInnerModal(name + "_Beneficiaries", `How many beneficiaries do ${nameSet} have :`, "beneficiariesArray", "", "", values[`beneficiariesArray${i}`], i)
                                                                            // }
                                                                            // else {
                                                                            //     // type, placement, message, description
                                                                            //     openNotificationSuccess("error", 'topRight', "Error Notification", "Please! Select Fund Name First")
                                                                            // }
                                                                        }}>
                                                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                        </Button>
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Annual Advice Service Fee"
                                                                    id={`annualAdvice${i}`}
                                                                    name={`annualAdvice${i}`}
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

export default InvestedAnnuities;
