import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, InputGroup, Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../../Store/Store';
import { PatchAxios, PostAxios } from '../../../Assets/Api/Api';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import InnerModal from './InnerModal';
import PortfolioValue from './PortfolioValue';
import DynamicYesNo from './DynamicYesNo';
import MemberNumber from './MemberNumber';
import GroupInsurance from './GroupInsurance';
import Contributions from './Contributions';
import Beneficiaries from './Beneficiaries';

const InvestedAnnuities = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});


    let annuitiesIssues = questionDetail.annuitiesIssues || {
        client: [],
        partner: [],
        joint: [],

    }; // Use an empty object as default if annuitiesIssues is undefined


    let initialValues = annuitiesIssues[props.modalObject.Input].length ? { NumberOfMap: annuitiesIssues[props.modalObject.Input].length } : { NumberOfMap: "" };

    const [dynamicFields, setDynamicFields] = useState([]);


    useEffect(() => {

        if (annuitiesIssues[props.modalObject.Input] && annuitiesIssues[props.modalObject.Input].length) {

            let arr = []

            for (let i = 0; i < annuitiesIssues[props.modalObject.Input].length; i++) {
                arr.push("");
            }

            setDynamicFields(arr);

        }
    }, [])

    const fillInitialValues = (setFieldValue) => {

        if (annuitiesIssues[props.modalObject.Input] && annuitiesIssues[props.modalObject.Input].length) {

            annuitiesIssues[props.modalObject.Input].forEach((data, i) => {
                if (data) {
                    setFieldValue(`productProvider${i}`, data.productProvider || '');
                    setFieldValue(`accountNumber${i}`, data.accountNumber || '');
                    setFieldValue(`returnCapitalValue${i}`, data.returnCapitalValue || '');
                    setFieldValue(`annuityPayment${i}`, data.annuityPayment || '');
                    setFieldValue(`annuityType${i}`, data.annuityType || '');
                    setFieldValue(`term${i}`, data.term || '');
                    setFieldValue(`nominatedBeneficiaries${i}`, data.nominatedBeneficiaries || '');
                    setFieldValue(`beneficiariesArray${i}`, data.beneficiariesArray || '');
                    setFieldValue(`annualAdvice${i}`, data.annualAdvice || '');
                    setFieldValue(`loginInPage${i}`, data.loginInPage || '');
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
        setModalObject({
            title,
            question,
            key,
            mainKey,
            key3,
            editArray: editArray || [],
            index,
            values
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
                returnCapitalValue: values[`returnCapitalValue${i}`] || "",
                annuityPayment: values[`annuityPayment${i}`] || "",
                annuityType: values[`annuityType${i}`] || "",
                term: values[`term${i}`] || "",
                nominatedBeneficiaries: values[`nominatedBeneficiaries${i}`] || "",
                beneficiariesArray: values[`beneficiariesArray${i}`] || "",
                annualAdvice: values[`annualAdvice${i}`] || "",
                loginInPage: values[`loginInPage${i}`] || "",
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
        obj[DataOf + "Total"] = newEntries.reduce((total, entry) => total + entry.term, 0);

        console.log(obj, "final obj")

        // Check if annuitiesIssues and the array at props.modalObject.Input exist
        // const bankAccountArray = annuitiesIssues[props.modalObject.Input] || [];
        const bankAccountArray = annuitiesIssues.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(`${DefaultUrl}/api/annuitiesIssues/Add`, obj);
            } else {
                obj.collection = props.modalObject.Input
                res = await PatchAxios(`${DefaultUrl}/api/annuitiesIssues/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, annuitiesIssues: res };
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
                }, [values.NumberOfMap]);

                return (
                    <Form>
                        <Row>
                            <InnerModal modalObject={modalObject} setFieldValue={setFieldValue} setFlagState={setFlagState} flagState={flagState} >
                                {
                                    modalObject.key === "portfolioArray" ? <PortfolioValue /> :
                                        modalObject.key === "memberArray" ? <MemberNumber /> :
                                            modalObject.key === "groupInsuranceArray" ? <GroupInsurance /> :
                                                modalObject.key === "ContributionsArray" ? <Contributions /> :
                                                    modalObject.key === "beneficiariesArray" ? <Beneficiaries /> : ""
                                }
                            </InnerModal>
                            <div className="col-md-12">
                                <div className='row justify-content-center'>
                                    <div className='col-md-5'>
                                        <p className='text-end mt-1'>
                                            How many Annuities does {props.modalObject.Input} have:
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
                                                        <th onClick={() => { console.log(values) }}>No#</th>
                                                        <th>Product Provider</th>
                                                        <th>Account Number</th>
                                                        <th>Return of Capital Value</th>
                                                        <th>Annuity  Payment</th>
                                                        <th>Annuity Type</th>
                                                        <th>Term</th>
                                                        <th>Nominated Beneficiaries</th>
                                                        <th>Annual  Advice Service Fee</th>
                                                        <th>Login in Page</th>
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
                                                                    type="number"
                                                                    placeholder="Account Number"
                                                                    id={`accountNumber${i}`}
                                                                    name={`accountNumber${i}`}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Return of Capital Value"
                                                                    id={`returnCapitalValue${i}`}
                                                                    name={`returnCapitalValue${i}`}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Annuity  Payment"
                                                                    id={`annuityPayment${i}`}
                                                                    name={`annuityPayment${i}`}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Annuity Type"
                                                                    id={`annuityType${i}`}
                                                                    name={`annuityType${i}`}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Term"
                                                                    id={`term${i}`}
                                                                    name={`term${i}`}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                                    <DynamicYesNo name={`nominatedBeneficiaries${i}`} values={values} handleChange={handleChange} />
                                                                    {values[`nominatedBeneficiaries${i}`] === "Yes" &&
                                                                        <Button className='btn bgColor modalBtn border-0' id="button-addon2" onClick={() => { handleInnerModal("Beneficiaries", "How many beneficiaries do you have?", "beneficiariesArray", "", "", values[`beneficiariesArray${i}`], i) }}>
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
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Login in Page"
                                                                    id={`loginInPage${i}`}
                                                                    name={`loginInPage${i}`}
                                                                    className="form-control inputDesign"
                                                                    disabled
                                                                    value={100}
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
