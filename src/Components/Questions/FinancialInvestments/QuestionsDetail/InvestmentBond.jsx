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

const InvestmentBond = (props) => {
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


    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});


    let investmentBondFinance = Object.keys(questionDetail.investmentBondFinance).length > 0 ? questionDetail.investmentBondFinance : {
        client: [],
        partner: [],
        joint: [],

    };
    

     // Use an empty object as default if investmentBondFinance is undefined


    let initialValues = investmentBondFinance[props.modalObject.Input].length ? { NumberOfMap: investmentBondFinance[props.modalObject.Input].length } : { NumberOfMap: "" };

    const [dynamicFields, setDynamicFields] = useState([]);


    useEffect(() => {

        if (investmentBondFinance[props.modalObject.Input] && investmentBondFinance[props.modalObject.Input].length) {

            let arr = []

            for (let i = 0; i < investmentBondFinance[props.modalObject.Input].length; i++) {
                arr.push("");
            }

            setDynamicFields(arr);
        }
    }, [])

    const fillInitialValues = (setFieldValue) => {

        if (investmentBondFinance[props.modalObject.Input] && investmentBondFinance[props.modalObject.Input].length) {

            investmentBondFinance[props.modalObject.Input].forEach((data, i) => {
                if (data) {
                    setFieldValue(`platformName${i}`, data.platformName || '');
                    setFieldValue(`accountNumber${i}`, data.accountNumber || '');
                    setFieldValue(`portfolioValue${i}`, data.portfolioValue || '');
                    setFieldValue(`portfolioArray${i}`, data.portfolioArray || '');
                    setFieldValue(`totalPortfolioCost${i}`, data.totalPortfolioCost || '');
                    setFieldValue(`serviceFee${i}`, data.serviceFee || '');
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

    let handleInnerModal = (title, question, key, mainKey, key3, editArray, index) => {
        setModalObject({
            title,
            question,
            key,
            mainKey,
            key3,
            editArray: editArray || [],
            index,
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
                platformName: values[`platformName${i}`] || "",
                accountNumber: values[`accountNumber${i}`] || "",
                portfolioValue: values[`portfolioValue${i}`] || "",
                portfolioArray: values[`portfolioArray${i}`] || "",
                totalPortfolioCost: values[`totalPortfolioCost${i}`] || "",
                serviceFee: values[`serviceFee${i}`] || "",
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
        obj[DataOf + "Total"] = newEntries.reduce((total, entry) => total + entry.totalPortfolioCost, 0);

        console.log(obj, "final obj")

        // Check if investmentBondFinance and the array at props.modalObject.Input exist
        // const bankAccountArray = investmentBondFinance[props.modalObject.Input] || [];
        const bankAccountArray = investmentBondFinance.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(`${DefaultUrl}/api/investmentBondFinance/Add`, obj);
            } else {
                obj.collection = props.modalObject.Input
                res = await PatchAxios(`${DefaultUrl}/api/investmentBondFinance/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, investmentBondFinance: res };
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
            {({ values, setFieldValue }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, [values.NumberOfMap]);

                return (
                    <Form>
                        <Row>
                            <InnerModal modalObject={modalObject} setFieldValue={setFieldValue} setFlagState={setFlagState} flagState={flagState} >
                                {
                                    modalObject.key === "portfolioArray" ? <PortfolioValue /> : ""
                                }
                            </InnerModal>
                            <div className="col-md-12">
                                <div className='row justify-content-center'>
                                    <div className='col-md-5'>
                                        <p className='text-end mt-1'>
                                            How many Platforms does {nameSet} have :
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
                                                        <th>Platform Name</th>
                                                        <th>Account Number </th>
                                                        <th>Portfolio Value – Need to have another pop</th>
                                                        <th>Total Portfolio Cost Base </th>
                                                        <th>Annual Advice Service Fee </th>
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
                                                                    placeholder="Platform Name"
                                                                    id={`platformName${i}`}
                                                                    name={`platformName${i}`}
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
                                                                    placeholder="Account Number"
                                                                    id={`accountNumber${i}`}
                                                                    name={`accountNumber${i}`}
                                                                    className="form-control inputDesignDoubleInput"
                                                                />
                                                            </td>
                                                            <td>
                                                                <InputGroup className="mb-3">
                                                                    <Field
                                                                        type="number"
                                                                        placeholder="Share Price"
                                                                        id={`portfolioValue${i}`}
                                                                        name={`portfolioValue${i}`}
                                                                        className="form-control inputDesignDoubleInput"
                                                                    />
                                                                    <Button className='btn bgColor modalBtn border-0' id="button-addon2" onClick={() => { handleInnerModal("Portfolio Value", `How many Underlying Investments do ${nameSet} have ?`, "portfolioArray", "portfolioValue", "totalPortfolioCost", values[`portfolioArray${i}`], i) }}>
                                                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                    </Button>
                                                                </InputGroup>

                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Total Portfolio Cost"
                                                                    id={`totalPortfolioCost${i}`}
                                                                    name={`totalPortfolioCost${i}`}
                                                                    className="form-control inputDesignDoubleInput"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Service Fee"
                                                                    id={`serviceFee${i}`}
                                                                    name={`serviceFee${i}`}
                                                                    className="form-control inputDesignDoubleInput"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Login in Page"
                                                                    id={`loginInPage${i}`}
                                                                    name={`loginInPage${i}`}
                                                                    className="form-control inputDesignDoubleInput"
                                                                    disabled
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

export default InvestmentBond;
