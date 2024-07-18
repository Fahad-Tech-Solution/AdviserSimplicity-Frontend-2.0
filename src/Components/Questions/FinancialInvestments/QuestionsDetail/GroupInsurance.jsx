import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../../Store/Store';
import { PatchAxios, PostAxios } from '../../../Assets/Api/Api';

const GroupInsurance = (props) => {


    let initialValues = { NumberOfMap: 1 };

    useEffect(() => {
        if (initialValues.NumberOfMap) {
            generateFields(1);
        }
    }, []);

    const [dynamicFields, setDynamicFields] = useState([]);

    const generateFields = (iteration) => {
        const upTill = parseFloat(iteration);
        const rows = [];

        for (let i = 0; i < upTill; i++) {
            rows.push(
                <tr key={i}>
                    <td>{1 + i}</td>
                    <td>
                        <Field
                            type="number"
                            placeholder="Life Cover"
                            id={`lifeCover${i}`}
                            name={`lifeCover${i}`}
                            className="form-control inputDesign"
                        />
                    </td>
                    <td>
                        <Field
                            type="number"
                            placeholder="TPD Cover"
                            id={`TPDCover${i}`}
                            name={`TPDCover${i}`}
                            className="form-control inputDesign"
                        />
                    </td>
                    <td>
                        <Field
                            type="text"
                            placeholder="Cover type"
                            id={`coverType${i}`}
                            name={`coverType${i}`}
                            className="form-control inputDesign"
                            value={"Unitised Fixed"}
                        />
                    </td>
                    <td>
                        <Field
                            type="number"
                            placeholder="Cost p.a."
                            id={`cost${i}`}
                            name={`cost${i}`}
                            className="form-control inputDesign"
                        />
                    </td>
                    <td>
                        <Field
                            type="number"
                            placeholder="Monthly Income Protection"
                            id={`monthlyIncome${i}`}
                            name={`monthlyIncome${i}`}
                            className="form-control inputDesign"
                        />
                    </td>
                    <td>
                        <Field
                            as="select"
                            id={`waitingPeriod${i}`}
                            name={`waitingPeriod${i}`}
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
                            id={`BenefitPeriod${i}`}
                            name={`BenefitPeriod${i}`}
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
                            id={`coverType2${i}`}
                            name={`coverType2${i}`}
                            className="form-control inputDesign"
                            value={"Unitised Fixed"}
                        />
                    </td>
                    <td>
                        <Field
                            type="number"
                            placeholder="Cost p.a."
                            id={`cost2${i}`}
                            name={`cost2${i}`}
                            className="form-control inputDesign"
                        />
                    </td>
                </tr>
            );
        }

        setDynamicFields(rows);
    };

    const fillInitialValues = (setFieldValue) => {

        if (props.modalObject.editArray.length) {
            generateFields(props.modalObject.editArray.length)
        }

        // setTimeout(() => {

        if (props.modalObject.editArray) {
            props.modalObject.editArray.forEach((data, i) => {
                if (data) {
                    setFieldValue(`lifeCover${i}`, data.lifeCover || '');
                    setFieldValue(`TPDCover${i}`, data.TPDCover || '');
                    setFieldValue(`coverType${i}`, data.coverType || '');
                    setFieldValue(`cost${i}`, data.cost || '');
                    setFieldValue(`monthlyIncome${i}`, data.monthlyIncome || '');
                    setFieldValue(`waitingPeriod${i}`, data.waitingPeriod || '');
                    setFieldValue(`BenefitPeriod${i}`, data.BenefitPeriod || '');
                    setFieldValue(`coverType2${i}`, data.coverType2 || '');
                    setFieldValue(`cost2${i}`, data.cost2 || '');
                }
            });
        }
        // }, 500);
    };

    let handleInput = (e, setFieldValue) => {
        const value = e.target.value > 10 ? 10 : e.target.value;
        setFieldValue(e.target.id, value);
        generateFields(value);
    };

    let DefaultUrl = useRecoilValue(defaultUrl)

    let onSubmit = async (values) => {

        console.log(values)

        const newEntries = [];

        let loopLength = parseFloat(values.NumberOfMap)

        // Iterate through each map entry and create a new object
        for (let i = 0; i < loopLength; i++) {
            // alert("loop chala")
            const newEntry = {
                lifeCover: values[`lifeCover${i}`] || "",
                TPDCover: values[`TPDCover${i}`] || "",
                coverType: values[`coverType${i}`] || "",
                cost: values[`cost${i}`] || "",
                monthlyIncome: values[`monthlyIncome${i}`] || "",
                waitingPeriod: values[`waitingPeriod${i}`] || "",
                BenefitPeriod: values[`BenefitPeriod${i}`] || "",
                coverType2: values[`coverType2${i}`] || "",
                cost2: values[`cost2${i}`] || "",
            };
            newEntries.push(newEntry);
        }

        // Log the new entries to verify
        console.log(newEntries);

        // let total = newEntries.reduce((total, entry) => total + entry.investmentValue, 0);


        props.setFieldValue(`${props.modalObject.key}${props.modalObject.index}`, newEntries)
        // props.setFieldValue(`${props.modalObject.key3}${props.modalObject.index}`, total)
        // props.setFieldValue(`${props.modalObject.mainKey}${props.modalObject.index}`, total - 475721)

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
                                    <div className='col-md-7 d-none'>
                                        <p className='text-end mt-1'>
                                            {props.modalObject.question}
                                        </p>
                                    </div>
                                    <div className='col-md-3 d-none'>
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
                                                        <th>No#</th>
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
                                                    {dynamicFields}
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

export default GroupInsurance;


// <td>
//                         <Field
//                             as="select"
//                             id={`investmentOption${i}`}
//                             name={`investmentOption${i}`}
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
//                             id={`investmentCode${i}`}
//                             name={`investmentCode${i}`}
//                             className="form-control inputDesign"
//                             disabled
//                         />
//                     </td>