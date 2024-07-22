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

const EstatePlanningWill = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});


    let will = questionDetail.will || {
        client: [],
        partner: [],
        joint: [],

    }; // Use an empty object as default if will is undefined


    let initialValues = will[props.modalObject.Input].length ? { NumberOfMap: will[props.modalObject.Input].length } : { NumberOfMap: "" };

    const [dynamicFields, setDynamicFields] = useState([]);


    useEffect(() => {
        if (will[props.modalObject.Input] && will[props.modalObject.Input].length) {
            let arr = []

            for (let i = 0; i < will[props.modalObject.Input].length; i++) {
                arr.push("");
            }

            setDynamicFields(arr);

        }
    }, [])

    const fillInitialValues = (setFieldValue) => {

        if (will[props.modalObject.Input] && will[props.modalObject.Input].length) {

            will[props.modalObject.Input].forEach((data, i) => {
                if (data) {
                    setFieldValue(`yearSetUp${i}`, data.yearSetUp || '');
                    setFieldValue(`willsCurrent${i}`, data.willsCurrent || '');
                    setFieldValue(`executor${i}`, data.executor || '');
                    setFieldValue(`enduringGuardianship${i}`, data.enduringGuardianship || '');
                    setFieldValue(`testamentaryTrust${i}`, data.testamentaryTrust || '');
                    setFieldValue(`estatePlanning${i}`, data.estatePlanning || '');
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
                yearSetUp: values[`yearSetUp${i}`] || "",
                willsCurrent: values[`willsCurrent${i}`] || "",
                executor: values[`executor${i}`] || "",
                enduringGuardianship: values[`enduringGuardianship${i}`] || "",
                testamentaryTrust: values[`testamentaryTrust${i}`] || "",
                estatePlanning: values[`estatePlanning${i}`] || "",
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
        obj[DataOf + "Total"] = newEntries.reduce((total, entry) => total + entry.estatePlanning, 0);

        console.log(obj, "final obj")

        // Check if will and the array at props.modalObject.Input exist
        // const bankAccountArray = will[props.modalObject.Input] || [];
        const bankAccountArray = will.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(`${DefaultUrl}/api/will/Add`, obj);
            } else {
                obj.collection = props.modalObject.Input
                res = await PatchAxios(`${DefaultUrl}/api/will/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, will: res };
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
                            <div className="col-md-12">
                                <div className='row justify-content-center'>
                                    <div className='col-md-5'>
                                        <p className='text-end mt-1'>
                                            How many Super Funds does {props.modalObject.Input} have:
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
                                                        <th>Year set up</th>
                                                        <th>Are Your Wills Current</th>
                                                        <th>executor/s</th>
                                                        <th>Enduring Guardianship</th>
                                                        <th>Testamentary Trust</th>
                                                        <th>Any specific estate planning requirements/needs?</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dynamicFields.map((elem, i) => {
                                                        return (<tr key={i}>
                                                            <td>{1 + i}</td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Year set up"
                                                                    id={`yearSetUp${i}`}
                                                                    name={`yearSetUp${i}`}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                                    <DynamicYesNo name={`willsCurrent${i}`} values={values} handleChange={handleChange} />

                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="text"
                                                                    placeholder="executor/s"
                                                                    id={`executor${i}`}
                                                                    name={`executor${i}`}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                                    <DynamicYesNo name={`enduringGuardianship${i}`} values={values} handleChange={handleChange} />

                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                                    <DynamicYesNo name={`testamentaryTrust${i}`} values={values} handleChange={handleChange} />

                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="test"
                                                                    placeholder="Any specific estate planning requirements/needs?"
                                                                    id={`estatePlanning${i}`}
                                                                    name={`estatePlanning${i}`}
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

export default EstatePlanningWill;
