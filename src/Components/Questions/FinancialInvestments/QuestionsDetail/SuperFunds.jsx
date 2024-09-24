import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, InputGroup, Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BankDetail, defaultUrl, QuestionDetail } from '../../../../Store/Store';
import { openNotificationSuccess, PatchAxios, PostAxios, toCommaAndDollar } from '../../../Assets/Api/Api';
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

const SuperFunds = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
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


    let superAnnuationIssues = Object.keys(questionDetail.superAnnuationIssues || {}).length > 0 ? questionDetail.superAnnuationIssues : {
        client: [],
        partner: [],
        joint: [],

    };  // Use an empty object as default if superAnnuationIssues is undefined


    let initialValues = superAnnuationIssues[props.modalObject.Input].length ? { NumberOfMap: superAnnuationIssues[props.modalObject.Input].length } : { NumberOfMap: "" };

    const [dynamicFields, setDynamicFields] = useState([]);


    useEffect(() => {
        if (superAnnuationIssues[props.modalObject.Input] && superAnnuationIssues[props.modalObject.Input].length) {
            let arr = []

            for (let i = 0; i < superAnnuationIssues[props.modalObject.Input].length; i++) {
                arr.push("");
            }

            setDynamicFields(arr);

        }
    }, [])

    const fillInitialValues = (setFieldValue) => {

        if (superAnnuationIssues[props.modalObject.Input] && superAnnuationIssues[props.modalObject.Input].length) {

            superAnnuationIssues[props.modalObject.Input].forEach((data, i) => {
                if (data) {
                    setFieldValue(`fundName${i}`, data.fundName || '');
                    setFieldValue(`memberNumber${i}`, data.memberNumber || '');
                    setFieldValue(`balanceBenefitDetails${i}`, data.balanceBenefitDetails || '');
                    setFieldValue(`balanceBenefitDetailsArray${i}`, data.balanceBenefitDetailsArray || '');
                    setFieldValue(`groupInsuranceArray${i}`, data.groupInsuranceArray || '');
                    setFieldValue(`ContributionsArray${i}`, data.ContributionsArray || '');
                    setFieldValue(`beneficiariesArray${i}`, data.beneficiariesArray || '');
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
        let ParentModal = props.modalObject.title
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
                fundName: values[`fundName${i}`] || "",
                memberNumber: values[`memberNumber${i}`] || "",
                balanceBenefitDetails: values[`balanceBenefitDetails${i}`] || "",
                balanceBenefitDetailsArray: values[`balanceBenefitDetailsArray${i}`] || "",
                groupInsuranceArray: values[`groupInsuranceArray${i}`] || "",
                ContributionsArray: values[`ContributionsArray${i}`] || "",
                beneficiariesArray: values[`beneficiariesArray${i}`] || "",
                annualAdvice: values[`annualAdvice${i}`] || "",
            };
            newEntries.push(newEntry);
        }

        // Log the new entries to verify
        console.log(newEntries);

        let DataOf = props.modalObject.Input;

        props.setFieldValue(DataOf, newEntries);

        let total = newEntries.reduce((total, entry) => total + parseFloat((entry.annualAdvice).replace(/[^0-9.-]+/g, "")), 0);

        props.setFieldValue(DataOf + "CurrentBalance", toCommaAndDollar(total));

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
                                        modalObject.key === "balanceBenefitDetailsArray" ? <MemberNumber /> :
                                            modalObject.key === "groupInsuranceArray" ? <GroupInsurance /> :
                                                modalObject.key === "ContributionsArray" ? <Contributions /> :
                                                    modalObject.key === "beneficiariesArray" ? <Beneficiaries /> : ""
                                }
                            </InnerModal>
                            <div className="col-md-12">
                                <div className='row justify-content-center'>
                                    <div className='col-md-5'>
                                        <p className='text-end mt-1'>
                                            How many Super Funds does {nameSet} have:
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

                                                        <th onClick={() => { console.log(values) }}>No#</th>
                                                        <th>Fund Name</th>
                                                        <th>Member Number</th>
                                                        <th>Balance</th>
                                                        <th>Group Insurance Attached </th>
                                                        <th>Contributions</th>
                                                        <th>Nominated Beneficiaries</th>
                                                        <th>Annual Advice Service Fee</th>

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
                                                                    id={`fundName${i}`}
                                                                    name={`fundName${i}`}
                                                                    className="form-select inputDesignDoubleInput"
                                                                >
                                                                    <option value={""}>Please Select</option>
                                                                    {bankDetailObj.map((elem, index) => {
                                                                        return (<option key={index} value={elem._id}>{elem.name}</option>)
                                                                    })}
                                                                </Field>
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Member Number & Details"
                                                                    id={`memberNumber${i}`}
                                                                    name={`memberNumber${i}`}
                                                                    className="form-control inputDesignDoubleInput"
                                                                />
                                                            </td>
                                                            <td>
                                                                <InputGroup className="mb-3">
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Balance & Benefit Details"
                                                                        id={`balanceBenefitDetails${i}`}
                                                                        name={`balanceBenefitDetails${i}`}
                                                                        className="form-control inputDesignDoubleInput"
                                                                        onChange={(e) => {
                                                                            setFieldValue(e.target.name,
                                                                                toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                        }}
                                                                    />
                                                                    <Button className='btn bgColor modalBtn border-0' id="button-addon2" onClick={() => {
                                                                        if (values[`fundName${i}`]) {
                                                                            let name = "";
                                                                            bankDetailObj.map((elem, index) => {

                                                                                if (elem._id === values[`fundName${i}`]) {
                                                                                    name = elem.name
                                                                                }

                                                                            });

                                                                            handleInnerModal(name + "_Balance & Benefit Details",
                                                                                `How many Benefit Details and Components do ${nameSet} have ?`,
                                                                                "balanceBenefitDetailsArray", "balanceBenefitDetails", "",
                                                                                values[`balanceBenefitDetailsArray${i}`], i, values)
                                                                        }
                                                                        else {
                                                                            // type, placement, message, description
                                                                            openNotificationSuccess("error", 'topRight', "Error Notification", "Please! Select Fund Name First")
                                                                        }
                                                                    }}>
                                                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                    </Button>
                                                                </InputGroup>
                                                            </td>
                                                            <td>
                                                                <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                                    <DynamicYesNo name={`groupInsurance${i}`} values={values} handleChange={handleChange} />
                                                                    {values[`groupInsurance${i}`] === "Yes" &&
                                                                        <Button className='btn bgColor modalBtn border-0' id="button-addon2" onClick={() => {
                                                                            if (values[`fundName${i}`]) {
                                                                                let name = "";
                                                                                bankDetailObj.map((elem, index) => {

                                                                                    if (elem._id === values[`fundName${i}`]) {
                                                                                        name = elem.name
                                                                                    }

                                                                                });
                                                                                handleInnerModal(name + "_Insurances", `How many Group Insurance ${nameSet} have?`, "groupInsuranceArray", "", "", values[`groupInsuranceArray${i}`], i, values)

                                                                            }
                                                                            else {
                                                                                // type, placement, message, description
                                                                                openNotificationSuccess("error", 'topRight', "Error Notification", "Please! Select Fund Name First")
                                                                            }
                                                                        }}>
                                                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                        </Button>
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                                    <DynamicYesNo name={`contributions${i}`} values={values} handleChange={handleChange} />
                                                                    {values[`contributions${i}`] === "Yes" &&
                                                                        <Button className='btn bgColor modalBtn border-0' id="button-addon2" onClick={() => {
                                                                            if (values[`fundName${i}`]) {
                                                                                let name = "";
                                                                                bankDetailObj.map((elem, index) => {

                                                                                    if (elem._id === values[`fundName${i}`]) {
                                                                                        name = elem.name
                                                                                    }

                                                                                });
                                                                                handleInnerModal(name + "_Contributions", `How many Contributions do ${nameSet} have ?`, "ContributionsArray", "", "", values[`ContributionsArray${i}`], i)

                                                                            }
                                                                            else {
                                                                                // type, placement, message, description
                                                                                openNotificationSuccess("error", 'topRight', "Error Notification", "Please! Select Fund Name First")
                                                                            }
                                                                        }}>
                                                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                        </Button>
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                                    <DynamicYesNo name={`nominatedBeneficiaries${i}`} values={values} handleChange={handleChange} />
                                                                    {values[`nominatedBeneficiaries${i}`] === "Yes" &&
                                                                        <Button className='btn bgColor modalBtn border-0' id="button-addon2" onClick={() => {
                                                                            if (values[`fundName${i}`]) {
                                                                                let name = "";
                                                                                bankDetailObj.map((elem, index) => {

                                                                                    if (elem._id === values[`fundName${i}`]) {
                                                                                        name = elem.name
                                                                                    }

                                                                                });

                                                                                handleInnerModal(name + "_Beneficiaries", `How many beneficiaries do ${nameSet} have?`, "beneficiariesArray", "", "", values[`beneficiariesArray${i}`], i)
                                                                            }
                                                                            else {
                                                                                // type, placement, message, description
                                                                                openNotificationSuccess("error", 'topRight', "Error Notification", "Please! Select Fund Name First")
                                                                            }
                                                                        }}>
                                                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                        </Button>
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Annual Advice Service Fee"
                                                                    id={`annualAdvice${i}`}
                                                                    name={`annualAdvice${i}`}
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

export default SuperFunds;
