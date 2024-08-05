import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Dropdown, Row, Table } from 'react-bootstrap';
import CreatableReactSelect from './CreatableReactSelect';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, GoalsDetail } from '../../Store/Store';
import { PatchAxios, PostAxios } from '../Assets/Api/Api';

const GoalsForm = (props) => {

    let [DynamicFields, setDynamicFields] = useState()
    const [rows, setRows] = useState(1); // Initialize state for rows
    const [showDropDown, setShowDropDown] = useState(false); // Initialize state for rows

    let goalsDetail = useRecoilValue(GoalsDetail)
    let [goalsDetailState, setGoalsDetail] = useRecoilState(GoalsDetail)
    let DefaultUrl = useRecoilValue(defaultUrl)


    let CurrentGoalData = goalsDetail[props.modalObject.key] || {
        scopeOfAdvice: "",
        when: "",
        estimatedValue: "",
        description: "",
    };


    let onSubmit = async (values) => {

        console.log(values);
        // return false;

        let DataOf = props.modalObject.Input;

        // Create an object with additional fields
        let obj = values;
        if (!CurrentGoalData.clientFK) {
            obj.clientFK = localStorage.getItem("UserID");
        }
        else {
            obj.clientFK = CurrentGoalData.clientFK;
        }

        console.log(obj, "final obj")

        const ApiSwitch = CurrentGoalData.clientFK || "";

        try {
            let res;
            if (!ApiSwitch) {
                res = await PostAxios(`${DefaultUrl}/api/${props.modalObject.key}/Add`, obj);
            } else {
                obj._id = CurrentGoalData._id
                res = await PatchAxios(`${DefaultUrl}/api/${props.modalObject.key}/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...goalsDetail, [props.modalObject.key]: res };
                setGoalsDetail(updatedData);
            }

            // Reset the flag state if necessary
            if (props.flagState) {
                props.setFlagState(false);
            }
        } catch (error) {
            console.error("Error occurred while making API call:", error);
        }
    }

    let initialValues = {
        scopeOfAdvice: "",
        when: "",
        estimatedValue: "",
        description: "",
    }


    const fillInitialValues = (setFieldValue, loopValue) => {

        if (CurrentGoalData && CurrentGoalData.clientFK) {

            setFieldValue(`scopeOfAdvice`, CurrentGoalData.scopeOfAdvice || '');
            setFieldValue(`when`, CurrentGoalData.when || '');
            setFieldValue(`estimatedValue`, CurrentGoalData.estimatedValue || '');
            setFieldValue(`description`, CurrentGoalData.description || '');
        }
    };

    const [whenOptions, setWhenOptions] = useState([
        { value: "Now", label: "Now" },
        { value: "Ongoing", label: "Ongoing" },
        { value: "Now & Ongoing", label: "Now & Ongoing" },
        { value: "Year 1", label: "Year 1" },
        { value: "Year 2", label: "Year 2" },
        { value: "Year 3", label: "Year 3" },
        { value: "Year 4", label: "Year 4" },
        { value: "Year 5", label: "Year 5" },
        { value: "Year 6", label: "Year 6" },
        { value: "Year 7", label: "Year 7" },
        { value: "Year 8", label: "Year 8" },
        { value: "Year 9", label: "Year 9" },
        { value: "Year 10", label: "Year 10" },
    ]);

    let autoDescription = (e, setFieldValue, handleChange) => {

        if (props.modalObject.whenScopeIs === e.target.value) {
            let arrayData = props.modalObject.descriptionArray;
            if (arrayData.length == 1) {
                setFieldValue("description", arrayData[0].text);
                setRows(10)
                setShowDropDown(false)
            }
            else {
                setShowDropDown(true)
            }
        } else {
            setRows(1)
            setShowDropDown(false)
            setFieldValue("description", "");
        }
        setFieldValue("scopeOfAdvice", e.target.value);
    }

    let StoreText = (e, setFieldValue) => {
        setFieldValue("description", e.text);
        setShowDropDown(false)
        setRows(10)
    }


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            innerRef={props.formRef}
        >
            {({ values, handleChange, setFieldValue, handleBlur }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, []);

                return (
                    <Form>
                        <Row>
                            <div className='mt-4'>
                                <Table striped bordered responsive hover>
                                    <thead>
                                        <tr>
                                            <th>Scope of Advice</th>
                                            <th onClick={() => { console.log(whenOptions) }}>When</th>
                                            <th>Estimated Value</th>
                                            <th>Goal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Field
                                                    as="select"
                                                    id={`scopeOfAdvice`}
                                                    name={`scopeOfAdvice`}
                                                    className="form-select inputDesign"
                                                    onChange={(e) => { autoDescription(e, setFieldValue, handleChange) }}
                                                >
                                                    <option value={""}>Select</option>
                                                    <option value={"Age Care"}>Age Care</option>
                                                    <option value={"Budgeting & Cashflow"}>Budgeting & Cashflow</option>
                                                    <option value={"Business Structure"}>Business Structure </option>
                                                    <option value={"Debt Management"}>Debt Management </option>
                                                    <option value={"Estate Planning"}>Estate Planning</option>
                                                    <option value={"Personal Insurance"}>Personal Insurance </option>
                                                    <option value={"Superannuation"}>Superannuation </option>
                                                    <option value={"Retirement Planning"}>Retirement Planning</option>
                                                    <option value={"Other"}>Other</option>

                                                </Field>
                                            </td>
                                            <td>
                                                <Field
                                                    name={`when`}
                                                    component={CreatableReactSelect}
                                                    label=""
                                                    optionsGiven={whenOptions}
                                                />
                                            </td>
                                            <td>
                                                <Field
                                                    type="number"
                                                    placeholder="Estimated Value"
                                                    id={`estimatedValue`}
                                                    name={`estimatedValue`}
                                                    className="form-control inputDesign"
                                                />
                                            </td>
                                            <td>
                                                <div className='dropDownTd'>
                                                    <Field
                                                        as="textarea"
                                                        type="text"
                                                        placeholder="Description"
                                                        id={`description`}
                                                        name={`description`}
                                                        className="form-control inputDesign"
                                                        rows={rows}
                                                    />
                                                    {showDropDown &&
                                                        <div className={`dropdown-arrow`}></div>
                                                    }
                                                </div>
                                                <Dropdown show={showDropDown} style={{ position: 'absolute', top: '135px', left: "200px", right: "-50px" }}>
                                                    <Dropdown.Menu className="super-colors" style={{ width: '90%' }}>
                                                        {props.modalObject.descriptionArray.map((elem, index) => (
                                                            <Dropdown.Item eventKey={index} onClick={() => { StoreText(elem, setFieldValue) }} className='text-wrap'>{elem.text}</Dropdown.Item>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Row>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default GoalsForm
