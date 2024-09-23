import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../../Store/Store';
import { PatchAxios, PostAxios, toCommaAndDollar } from '../../../Assets/Api/Api';

const GroupInsurance = (props) => {


    let initialValues = {
        lifeCover: "",
        TPDCover: "",
        coverType: "",
        cost: "",
        monthlyIncome: "",
        waitingPeriod: "",
        BenefitPeriod: "",
        coverType2: "",
        cost2: "",
    };


    const fillInitialValues = (setFieldValue) => {

        console.log(props.modalObject.editArray)

        if (Object.keys(props.modalObject.editArray).length > 0) {
            let data = props.modalObject.editArray
            setFieldValue("lifeCover", data.lifeCover)
            setFieldValue("TPDCover", data.TPDCover)
            setFieldValue("coverType", data.coverType)
            setFieldValue("cost", data.cost)
            setFieldValue("monthlyIncome", data.monthlyIncome)
            setFieldValue("waitingPeriod", data.waitingPeriod)
            setFieldValue("BenefitPeriod", data.BenefitPeriod)
            setFieldValue("coverType2", data.coverType2)
            setFieldValue("cost2", data.cost2)
        }
    };


    let DefaultUrl = useRecoilValue(defaultUrl)

    let onSubmit = async (values) => {

        console.log(values)

        props.setFieldValue(`${props.modalObject.key}${props.modalObject.index}`, values)

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
                                                    <th>Life Cover</th>
                                                    <th>TPD Cover</th>
                                                    <th>Cover type</th>
                                                    <th>Cost p.a.</th>
                                                    <th>Monthly Income Protection</th>
                                                    <th>Waiting Period</th>
                                                    <th>Benefit Period</th>
                                                    <th>Cover type</th>
                                                    <th>Cost p.a.</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <Field
                                                            type="text"
                                                            placeholder="Life Cover"
                                                            id={`lifeCover`}
                                                            name={`lifeCover`}
                                                            className="form-control inputDesign"
                                                            onChange={(e) => {
                                                                setFieldValue(e.target.name,
                                                                    toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Field
                                                            type="text"
                                                            placeholder="TPD Cover"
                                                            id={`TPDCover`}
                                                            name={`TPDCover`}
                                                            className="form-control inputDesign"
                                                            onChange={(e) => {
                                                                setFieldValue(e.target.name,
                                                                    toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Field
                                                            type="text"
                                                            placeholder="Cover type"
                                                            id={`coverType`}
                                                            name={`coverType`}
                                                            className="form-control inputDesign"
                                                            value={"Unitised Fixed"}
                                                            disabled
                                                        />
                                                    </td>
                                                    <td>
                                                        <Field
                                                            type="text"
                                                            placeholder="Cost p.a."
                                                            id={`cost`}
                                                            name={`cost`}
                                                            className="form-control inputDesign"
                                                            onChange={(e) => {
                                                                setFieldValue(e.target.name,
                                                                    toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Field
                                                            type="text"
                                                            placeholder="Monthly Income Protection"
                                                            id={`monthlyIncome`}
                                                            name={`monthlyIncome`}
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
                                                            id={`waitingPeriod`}
                                                            name={`waitingPeriod`}
                                                            className="form-select inputDesign"
                                                        >
                                                            <option value={30}>30 Days</option>
                                                            <option value={60}>60Days </option>
                                                            <option value={90}>90 Days</option>
                                                            <option value={180}>180 Days</option>

                                                        </Field>
                                                    </td>
                                                    <td>
                                                        <Field
                                                            as="select"
                                                            id={`BenefitPeriod`}
                                                            name={`BenefitPeriod`}
                                                            className="form-select inputDesign"
                                                        >
                                                            <option value={"2 Years"}>2 Years</option>
                                                            <option value={"5 years "}>5 years </option>
                                                            <option value={"To age 60"}>To age 60</option>
                                                            <option value={"To Age 65"}>To Age 65</option>
                                                            <option value={"To Age 67"}>To Age 67</option>

                                                        </Field>
                                                    </td>
                                                    <td>
                                                        <Field
                                                            type="text"
                                                            placeholder="Cover type"
                                                            id={`coverType2`}
                                                            name={`coverType2`}
                                                            className="form-control inputDesign"
                                                            value={"Unitised Fixed"}
                                                            disabled
                                                        />
                                                    </td>
                                                    <td>
                                                        <Field
                                                            type="text"
                                                            placeholder="Cost p.a."
                                                            id={`cost2`}
                                                            name={`cost2`}
                                                            className="form-control inputDesign"
                                                            onChange={(e) => {
                                                                setFieldValue(e.target.name,
                                                                    toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                            }}
                                                        />
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

export default GroupInsurance;


// <td>
//                         <Field
//                             as="select"
//                             id={`investmentOption`}
//                             name={`investmentOption`}
//                             className="form-select inputDesign"
//                         >
//                             <option value={""}>Please Select</option>
//                             {options.map((elem, index) => {
//                                 return (<option key={index} value={elem}>{elem}</option>)
//                             })}
//                         </Field>
//                     </td>
//                     <td>
//                         <Field
//                             type="text"
//                             placeholder="Investment Code"
//                             id={`investmentCode`}
//                             name={`investmentCode`}
//                             className="form-control inputDesign"
//                             disabled
//                         />
//                     </td>