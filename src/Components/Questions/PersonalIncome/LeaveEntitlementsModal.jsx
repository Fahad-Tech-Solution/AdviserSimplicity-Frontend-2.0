import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../Store/Store';
import { toCommaAndDollar, toPersentage } from '../../Assets/Api/Api';

const LeaveEntitlementsModal = (props) => {

    let { title, key, parentValues, parentKey } = props.modalObject;

    let initialValues = {

        "annualLeave": "Annual Leave",
        "annualLeaveAmount": "",
        "annualLeaveTime": "",

        "sickLeave": "Sick Leave",
        "sickLeaveAmount": "",
        "sickLeaveTime": "",

        "longServiceLeave": "Long Service Leave",
        "longServiceLeaveAmount": "",
        "longServiceLeaveTime": ""
    }

    const fillInitialValues = (setFieldValue) => {
        // if (parentValues._id && parentValues?.key) {
        console.log(JSON.stringify(parentValues));
        if (parentValues?.[`${parentKey}`]?.[`${key}`] && Object.keys(parentValues?.[`${parentKey}`]?.[`${key}`]).length > 0) {
            let Data = parentValues[`${parentKey}`][`${key}`];
            console.log("incondition", JSON.stringify(Data));

            setFieldValue("annualLeave", Data.annualLeave)
            setFieldValue("annualLeaveAmount", Data.annualLeaveAmount)
            setFieldValue("annualLeaveTime", Data.annualLeaveTime)

            setFieldValue("sickLeave", Data.sickLeave)
            setFieldValue("sickLeaveAmount", Data.sickLeaveAmount)
            setFieldValue("sickLeaveTime", Data.sickLeaveTime)

            setFieldValue("longServiceLeave", Data.longServiceLeave)
            setFieldValue("longServiceLeaveAmount", Data.longServiceLeaveAmount)
            setFieldValue("longServiceLeaveTime", Data.longServiceLeaveTime)
        }
    };

    let DefaultUrl = useRecoilValue(defaultUrl)

    let onSubmit = async (values) => {

        console.log(values)

        let Obj = {
            annualLeave: values.annualLeave,
            annualLeaveAmount: values.annualLeaveAmount,
            annualLeaveTime: values.annualLeaveTime,
            sickLeave: values.sickLeave,
            sickLeaveAmount: values.sickLeaveAmount,
            sickLeaveTime: values.sickLeaveTime,
            longServiceLeave: values.longServiceLeave,
            longServiceLeaveAmount: values.longServiceLeaveAmount,
            longServiceLeaveTime: values.longServiceLeaveTime,

        }

        props.setFieldValue(`${parentKey}.${key}`, Obj);



        // props.setFieldValue(`${props.modalObject.key3}${props.modalObject.index}`, total)
        // props.setFieldValue(`${props.modalObject.mainKey}${props.modalObject.index}`, total - 475721)

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }
    };

    let FormulaSettign = (currentInput, values, setFieldValue) => {

        let remunerationType = values.remunerationType;
        let Amount = parseFloat(values.Amount.replace(/[^0-9.-]+/g, "")) || 0;
        let SGPercentage = parseFloat(values.SGPercentage.replace(/[^0-9.-]+/g, "")) || 0;
        let GrossSalary = values.GrossSalary;
        let SGC = values.SGC;

        switch (currentInput.name) {
            case "remunerationType":
                remunerationType = currentInput.value;
                break;
            case "Amount":
                Amount = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, ""));
                break;
            default:
                if (currentInput.value.replace(/[^0-9.-]+/g, "") > 100) {
                    SGPercentage = 100;
                }
                else {
                    SGPercentage = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, ""));
                }
                break;
        }

        if (remunerationType === "Gross Salary") {
            GrossSalary = Amount;
            SGC = (Amount * SGPercentage).toFixed(2);
        }
        else {
            GrossSalary = (Amount / SGPercentage).toFixed(2);
            SGC = (Amount - GrossSalary).toFixed(2);
        }

        console.log("FormulaSettign:", remunerationType, Amount, SGPercentage, GrossSalary, SGC);

        setFieldValue("GrossSalary", GrossSalary);
        setFieldValue("SGC", SGC);


    }




    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            innerRef={props.formRef}
        >
            {({ values, handleChange, setFieldValue }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, [values.NumberOfMap]);

                return (
                    <Form>
                        <Row>
                            <div className="col-md-12">
                                <div className='row justify-content-center'>
                                    <div className='mt-4'>
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Leave Type</th>
                                                    <th>Amount</th>
                                                    <th>Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <Field
                                                            type="text"
                                                            placeholder="Investment Code"
                                                            id={`annualLeave`}
                                                            name={`annualLeave`}
                                                            className="form-control inputDesign"
                                                            disabled
                                                        />
                                                    </td>
                                                    <td>
                                                        <Field
                                                            type="text"
                                                            placeholder="Investment Code"
                                                            id={`annualLeaveAmount`}
                                                            name={`annualLeaveAmount`}
                                                            className="form-control inputDesign"
                                                            onChange={(e) => {
                                                                setFieldValue(e.target.name,
                                                                    toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                            }}
                                                        />
                                                    </td>
                                                    <td style={{ minWidth: "250px" }}>
                                                        <Field
                                                            as="select"
                                                            id={`annualLeaveTime`}
                                                            name={`annualLeaveTime`}
                                                            className="form-select inputDesign"
                                                        >
                                                            <option value={""}>Select</option>
                                                            <option value={"Days"}>Days</option>
                                                            <option value={"Weeks"}>Weeks</option>
                                                            <option value={"Hours"}>Hours</option>

                                                        </Field>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Field
                                                            type="text"
                                                            placeholder="Investment Code"
                                                            id={`sickLeave`}
                                                            name={`sickLeave`}
                                                            className="form-control inputDesign"
                                                            disabled
                                                        />
                                                    </td>
                                                    <td>
                                                        <Field
                                                            type="text"
                                                            placeholder="Investment Code"
                                                            id={`sickLeaveAmount`}
                                                            name={`sickLeaveAmount`}
                                                            className="form-control inputDesign"
                                                            onChange={(e) => {
                                                                setFieldValue(e.target.name,
                                                                    toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Field
                                                            as="select"
                                                            id={`sickLeaveTime`}
                                                            name={`sickLeaveTime`}
                                                            className="form-select inputDesign"
                                                        >
                                                            <option value={""}>Select</option>
                                                            <option value={"Days"}>Days</option>
                                                            <option value={"Weeks"}>Weeks</option>
                                                            <option value={"Hours"}>Hours</option>

                                                        </Field>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Field
                                                            type="text"
                                                            placeholder="Investment Code"
                                                            id={`longServiceLeave`}
                                                            name={`longServiceLeave`}
                                                            className="form-control inputDesign"
                                                            disabled
                                                        />
                                                    </td>
                                                    <td>
                                                        <Field
                                                            type="text"
                                                            placeholder="Investment Code"
                                                            id={`longServiceLeaveAmount`}
                                                            name={`longServiceLeaveAmount`}
                                                            className="form-control inputDesign"
                                                            onChange={(e) => {
                                                                setFieldValue(e.target.name,
                                                                    toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Field
                                                            as="select"
                                                            id={`longServiceLeaveTime`}
                                                            name={`longServiceLeaveTime`}
                                                            className="form-select inputDesign"
                                                        >
                                                            <option value={""}>Select</option>
                                                            <option value={"Days"}>Days</option>
                                                            <option value={"Weeks"}>Weeks</option>
                                                            <option value={"Hours"}>Hours</option>

                                                        </Field>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>

                                </div>
                            </div>
                        </Row>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default LeaveEntitlementsModal;
