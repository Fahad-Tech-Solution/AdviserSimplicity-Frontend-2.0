import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { defaultUrl } from '../../../../Store/Store';
import { toCommaAndDollar } from '../../../Assets/Api/Api';
import DatePicker from 'react-datepicker';

const Contributions = (props) => {


    let initialValues = { NumberOfMap: "" };

    const [dynamicFields, setDynamicFields] = useState([]);

    const fillInitialValues = (setFieldValue) => {


        if (props.modalObject.editArray.newEntries) {

            let arr = []

            for (let i = 0; i < props.modalObject.editArray.newEntries.length; i++) {
                arr.push("");
            }

            setDynamicFields(arr);

            setFieldValue(`NumberOfMap`, props.modalObject.editArray.newEntries.length || '');
            setFieldValue(`startingYear`, props.modalObject.editArray.startingYear || '');

            props.modalObject.editArray.newEntries.forEach((data, i) => {
                if (data) {
                    console.log(data.investmentOption)
                    setFieldValue(`employerContributions${i}`, data.employerContributions || '');
                    setFieldValue(`concessional${i}`, data.concessional || '');
                    setFieldValue(`totalConcessional${i}`, data.totalConcessional || '');
                    setFieldValue(`nonConcessionalContributions${i}`, data.nonConcessionalContributions || '');
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

    let DefaultUrl = useRecoilValue(defaultUrl)

    let onSubmit = async (values) => {

        console.log(values)

        const newEntries = [];

        let loopLength = parseFloat(values.NumberOfMap)

        // Iterate through each map entry and create a new object
        for (let i = 0; i < loopLength; i++) {
            // alert("loop chala")
            const newEntry = {
                employerContributions: values[`employerContributions${i}`] || "",
                concessional: values[`concessional${i}`] || "",
                totalConcessional: values[`totalConcessional${i}`] || "",
                nonConcessionalContributions: values[`nonConcessionalContributions${i}`] || "",
            };
            newEntries.push(newEntry);
        }

        // Log the new entries to verify
        console.log(newEntries);

        let Obj = {
            startingYear: values.startingYear,
            newEntries: newEntries
        }

        props.setFieldValue(`${props.modalObject.key}${props.modalObject.index}`, Obj)


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
            {({ values, handleChange, setFieldValue, handleBlur }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, []);

                return (
                    <Form>
                        <Row>
                            <div className="col-md-12">
                                <div className='row justify-content-center'>

                                    <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                        <p className='text-end mt-3'>
                                            {props.modalObject.question}
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
                                        <p className='text-end mt-3'>
                                            Starting Form
                                        </p>
                                        <div style={{ width: "10%" }}>
                                            <DatePicker
                                                id="Starting Year"
                                                className="form-control inputDesign DateInputPadding"
                                                selected={values.startingYear}
                                                onChange={(date) => {
                                                    setFieldValue("startingYear", date);
                                                }}
                                                dateFormat="yyyy"  // Display year only
                                                showYearPicker       // Enable year picker mode
                                                placeholderText="yyyy"
                                                onBlur={handleBlur}
                                                name="startingYear"
                                                maxDate={new Date()}
                                                wrapperClassName="w-100"
                                                showIcon
                                            />
                                        </div>
                                    </div>

                                    {values.NumberOfMap && (
                                        <div className='mt-4'>
                                            <Table striped bordered responsive hover>
                                                <thead>
                                                    <tr>
                                                        <th>No#</th>
                                                        <th>Financial Years</th>
                                                        <th>Employer Contributions</th>
                                                        <th>Concessional (Include. Salary Sac)</th>
                                                        <th>Total Concessional Contributions</th>
                                                        <th>Non-Concessional Contributions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dynamicFields.map((elem, i) => {
                                                        const DateYear = new Date(values.startingYear).getFullYear() || new Date().getFullYear();
                                                        const startYear = DateYear + i;
                                                        const endYear = startYear + 1;
                                                        const yearRange = `${startYear}/${endYear}`;

                                                        return (
                                                            <tr key={i}>
                                                                <td>{1 + i}</td>
                                                                <td className="pt-3">{yearRange}</td> {/* Displaying the year range */}
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Employer Contributions"
                                                                        id={`employerContributions${i}`}
                                                                        name={`employerContributions${i}`}
                                                                        className="form-control inputDesignDoubleInput"
                                                                        onChange={(e) => {
                                                                            setFieldValue(`employerContributions${i}`, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                            setFieldValue(`totalConcessional${i}`, toCommaAndDollar((parseFloat(values[`concessional${i}`].replace(/[^0-9.-]+/g, "") || 0)) + parseFloat(e.target.value.replace(/[^0-9.-]+/g, "") || 0)));
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Concessional (Include. Salary Sac)"
                                                                        id={`concessional${i}`}
                                                                        name={`concessional${i}`}
                                                                        className="form-control inputDesignDoubleInput"
                                                                        onChange={(e) => {
                                                                            setFieldValue(`concessional${i}`, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                            setFieldValue(`totalConcessional${i}`, toCommaAndDollar(parseFloat(values[`employerContributions${i}`].replace(/[^0-9.-]+/g, "") || 0) + parseFloat(e.target.value.replace(/[^0-9.-]+/g, "") || 0)));
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Total Concessional Contributions"
                                                                        id={`totalConcessional${i}`}
                                                                        name={`totalConcessional${i}`}
                                                                        className="form-control inputDesignDoubleInput"
                                                                        disabled
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Non-Concessional Contributions"
                                                                        id={`nonConcessionalContributions${i}`}
                                                                        name={`nonConcessionalContributions${i}`}
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

export default Contributions;
