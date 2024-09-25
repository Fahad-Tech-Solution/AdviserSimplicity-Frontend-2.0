import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, InputGroup, Row, Table } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { BankDetail, defaultUrl, QuestionDetail } from '../../../../Store/Store';
import { openNotificationSuccess, toCommaAndDollar } from '../../../Assets/Api/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import InnerModal from './InnerModal';
import PortfolioValue from './PortfolioValue';

const ManagedFunds = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
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

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});


    let managedFunds = Object.keys(questionDetail[props.modalObject.key] || {}).length > 0 ? questionDetail[props.modalObject.key] : {
        client: [],
        partner: [],
        joint: [],

    }; // Use an empty object as default if managedFunds is undefined


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

                console.log(data.platformName);
                setFieldValue(`platformName${i}`, data.platformName || '');

                setFieldValue(`accountNumber${i}`, data.accountNumber || '');
                setFieldValue(`portfolioValue${i}`, data.portfolioValue || '');
                setFieldValue(`portfolioArray${i}`, data.portfolioArray || '');
                setFieldValue(`totalPortfolioCost${i}`, data.totalPortfolioCost || '');
                setFieldValue(`serviceFee${i}`, data.serviceFee || '');

            });
        }
    };

    let handleInput = (e, setFieldValue) => {
        const value = e.target.value > 5 ? 5 : e.target.value;
        setFieldValue(e.target.id, value);

        let arr = []

        for (let i = 0; i < value; i++) {
            arr.push("");
        }

        setDynamicFields(arr);

    };

    let handleInnerModal = (title, question, key, mainKey, key3, editArray, index, values) => {
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

        props.setFieldValue(DataOf, newEntries);

        let total = newEntries.reduce((total, entry) => total + parseFloat((entry.portfolioValue).replace(/[^0-9.-]+/g, "")), 0);
        let totalCostBase = newEntries.reduce((total, entry) => total + parseFloat((entry.totalPortfolioCost).replace(/[^0-9.-]+/g, "")), 0);

        props.setFieldValue(DataOf + "CurrentBalance", toCommaAndDollar(total));
        props.setFieldValue(DataOf + "CostBaseTemp", toCommaAndDollar(totalCostBase));

        console.log(newEntries, "final obj")


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
            {({ values, setFieldValue }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, []);

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
                                    <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                        <p className='text-end mt-3'>
                                            How many Platforms does {nameSet} have:
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
                                                        <th>Platform Name</th>
                                                        <th>Account Number </th>
                                                        <th>Portfolio Value</th>
                                                        <th>Portfolio Cost Base</th>
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
                                                                    placeholder="Platform Name"
                                                                    id={`platformName${i}`}
                                                                    name={`platformName${i}`}
                                                                    className="form-select inputDesignDoubleInput"
                                                                >
                                                                    <option value={""}>Please Select</option>
                                                                    {bankDetailObj.map((elem, index) => {
                                                                        return (<option key={index} value={elem._id}>{elem.name}</option>)
                                                                    })}
                                                                </Field>
                                                            </td>
                                                            <td style={{ minWidth: "160px" }}>
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
                                                                        type="text"
                                                                        placeholder="Portfolio Value"
                                                                        id={`portfolioValue${i}`}
                                                                        name={`portfolioValue${i}`}
                                                                        className="form-control inputDesignDoubleInput"
                                                                        onChange={(e) => {
                                                                            setFieldValue(e.target.name,
                                                                                toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                        }}
                                                                    />
                                                                    <Button className='btn bgColor modalBtn border-0' id="button-addon2"
                                                                        onClick={() => {

                                                                            if (values[`platformName${i}`]) {
                                                                                let name = "";
                                                                                bankDetailObj.map((elem, index) => {

                                                                                    if (elem._id === values[`platformName${i}`]) {
                                                                                        name = elem.name
                                                                                    }

                                                                                });

                                                                                handleInnerModal(name + "_Portfolio Value",
                                                                                    `How many Underlying Investments do ${nameSet} have ?`,
                                                                                    "portfolioArray", "portfolioValue", "totalPortfolioCost",
                                                                                    values[`portfolioArray${i}`], i, values)
                                                                            }
                                                                            else {
                                                                                // type, placement, message, description
                                                                                openNotificationSuccess("error", 'topRight', "Error Notification", "Please! Select Platform Name First")
                                                                            }
                                                                        }}>
                                                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                    </Button>
                                                                </InputGroup>
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Total Portfolio Cost"
                                                                    id={`totalPortfolioCost${i}`}
                                                                    name={`totalPortfolioCost${i}`}
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
                                                                    placeholder="Service Fee"
                                                                    id={`serviceFee${i}`}
                                                                    name={`serviceFee${i}`}
                                                                    className="form-control inputDesignDoubleInput"
                                                                    onChange={(e) => {
                                                                        setFieldValue(e.target.name,
                                                                            toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                    }}
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

export default ManagedFunds;
