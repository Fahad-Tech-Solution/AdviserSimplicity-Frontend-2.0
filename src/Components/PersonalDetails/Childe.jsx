import React, { useEffect, useRef, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import DatePicker from "react-datepicker";
import { Image, Table } from 'react-bootstrap';

import childimg from "./images/child.svg";
import Modal from "react-bootstrap/Modal";
import DynamicYesNo from '../Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo';

import "yup-phone";
import * as Yup from 'yup';

const Childe = (props) => {


    let formRef = props.formRefOfChield;


    let { handleChange, handleBlur, ParentformRef } = props;
    let ParentValues = props.values;
    let ParentSetFieldValue = props.setFieldValue;
    let { client, partner, children } = ParentValues;

    let [show, setShow] = useState(false);

    let handleInput = (e, setFieldValue) => {
        const value = e.target.value > 5 ? 5 : e.target.value;
        setFieldValue(e.target.name, value);
        // generateFields(value);
    };

    const [initialValues, setInitialValues] = useState(() => {
        try {
            let Data = { numberOfChildren: '' };  // Default initial state
            console.log("props.FoundData", props.FoundData)
            // Check if the FoundData object has an ID
            if (props.FoundData) {
                // Check if the FoundData object contains children and their number
                if (props.FoundData.children?.numberOfChildren) {

                    Data.numberOfChildren = props.FoundData.children.numberOfChildren;

                    console.log("props.FoundData.arrayOfChildren:", props.FoundData.children.arrayOfChildren);

                    // Ensure arrayOfChildren is an array before iterating
                    if (Array.isArray(props.FoundData.children.arrayOfChildren)) {
                        props.FoundData.children.arrayOfChildren.forEach((data, i) => {
                            if (data) {
                                Data[`Name${i}`] = data.Name || '';
                                Data[`DOB${i}`] = data.DOB || '';
                                Data[`Gender${i}`] = data.Gender || '';
                                Data[`relationship${i}`] = data.relationship || '';
                                Data[`depenantChild${i}`] = data.depenantChild || '';
                            }
                        });
                    } else {
                        console.warn("props.FoundData.arrayOfChildren is not an array.");
                    }
                }
            }


            console.log("Data", Data);

            return Data;  // Return the prepared data object
        } catch (error) {
            console.error("Error initializing state in YourComponent:", error);
            return { numberOfChildren: '' };  // Return default state on error
        }
    });


    let onSubmit = (values) => {

        // console.log(values);

        const numberOfChildren = parseInt(values.numberOfChildren, 10);
        const newEntries = [];

        console.log("numberOfChildren", numberOfChildren)

        // Iterate through each map entry and create a new object
        for (let i = 0; i < numberOfChildren; i++) {
            const newEntry = {
                Name: values[`Name${i}`] || "",
                DOB: values[`DOB${i}`] || "",
                Gender: values[`Gender${i}`] || "",
                relationship: values[`relationship${i}`] || "",
                depenantChild: values[`depenantChild${i}`] || "",
            };
            newEntries.push(newEntry);
        }

        // Log the new entries to verify
        // console.log(newEntries);

        ParentSetFieldValue("children.numberOfChildren", parseInt(values.numberOfChildren, 10) || 0);
        ParentSetFieldValue("children.arrayOfChildren", newEntries);

        // setShow(false)

        if (ParentformRef.current) {
            ParentformRef.current.handleSubmit();  // Trigger Formik's handleSubmit
        }
    }

    // let validationSchema = Yup.object({

    // });



    return (
        <div className="container-fluid my-4">
            <div className="row m-0">
                <div className="col-md-12">
                    <h3 className=" heading text-center">Children Details</h3>

                    <div className="row my-3">
                        <div className="col-md-12">
                            <div className="mb-3 d-flex flex-column justify-content-center algin-items-center">

                                <label className="form-label text-center">
                                    Do you have any Children/Dependants{" "}
                                </label>
                                {/* health button style */}

                                <div className="QuestionIconChild"
                                    onClick={() => { setShow(true) }}
                                >
                                    <Image src={childimg} alt="child" fluid />
                                </div>


                                <div className="form-check form-switch m-0 p-0 mt-3 mb-4">
                                    <div className="radiobutton">
                                        <input
                                            type="radio"
                                            name="haveAnyChildren"
                                            className="form-check-input"
                                            id="haveAnyChildren1"
                                            value="No"
                                            onChange={handleChange}
                                            checked={
                                                ParentValues.haveAnyChildren === "No"
                                            }
                                        />
                                        <label
                                            htmlFor="haveAnyChildren1"
                                            className="label1"
                                        >
                                            <span>No</span>
                                        </label>
                                        <input
                                            type="radio"
                                            name="haveAnyChildren"
                                            id="haveAnyChildren2"
                                            className="form-check-input"
                                            value="Yes"
                                            onChange={handleChange}
                                            checked={
                                                ParentValues.haveAnyChildren === "Yes"
                                            }
                                        />
                                        <label
                                            htmlFor="haveAnyChildren2"
                                            className="label2"
                                            onClick={() => { setShow(true) }}
                                        >
                                            <span>Yes</span>
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className='row justify-content-center'>
                        <div className='col-md-10'>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={onSubmit}
                                // validationSchema={validationSchema}
                                innerRef={formRef}
                                enableReinitialize
                            >
                                {({ values, setFieldValue, handleChange, errors, handleBlur }) => {


                                    return (
                                        <Form className={`${ParentValues.haveAnyChildren === "Yes" ? "d-block" : "d-none"}`}>
                                            <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                                <p className='text-end mt-3'>
                                                    How many children do you have:
                                                </p>

                                                <div className='modalNumberWidth'>
                                                    <Field
                                                        type="number"
                                                        id="numberOfChildren"
                                                        name="numberOfChildren"
                                                        className="form-control inputDesignDoubleInput"
                                                        onChange={(e) => handleInput(e, setFieldValue)}
                                                    />
                                                </div>
                                            </div>


                                            {values.numberOfChildren && (
                                                <div className='mt-4'>
                                                    <Table striped bordered responsive hover>
                                                        <thead>
                                                            <tr>
                                                                <th>No#</th>
                                                                <th>Name</th>
                                                                <th>Dob</th>
                                                                <th>Gender</th>
                                                                <th>Add in Relationship</th>
                                                                <th>Add in is Child Depenant</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Array.from({ length: values.numberOfChildren }).map((elem, i) => {
                                                                return (<tr key={i}>
                                                                    <td className='text-center pt-3'>{1 + i}</td>
                                                                    <td>
                                                                        <Field
                                                                            placeholder="Enter Child Name"
                                                                            id={`Name${i}`}
                                                                            name={`Name${i}`}
                                                                            type={"text"}
                                                                            className="form-control inputDesignDoubleInput"
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <div>
                                                                            <DatePicker
                                                                                className="form-control inputDesignDoubleInput shadow DateInputPadding"
                                                                                showIcon
                                                                                id={`DOB${i}`}
                                                                                name={`DOB${i}`}
                                                                                selected={values[`DOB${i}`]}
                                                                                onChange={(date) => setFieldValue(`DOB${i}`, date)}
                                                                                dateFormat="dd/MM/yyyy"
                                                                                // placeholderText="dd/mm/yyyy"
                                                                                maxDate={new Date()}
                                                                                showMonthDropdown
                                                                                showYearDropdown
                                                                                dropdownMode="select"
                                                                                onBlur={handleBlur}
                                                                                wrapperClassName="w-100"
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <Field
                                                                            as="select"
                                                                            id={`Gender${i}`}
                                                                            name={`Gender${i}`}
                                                                            className="form-select inputDesignDoubleInput"
                                                                        >
                                                                            <option value={""}>Select</option>
                                                                            <option value={"Male"}>Male</option>
                                                                            <option value={"Female"}>Female</option>
                                                                            <option value={"Other"}>Other</option>

                                                                        </Field>
                                                                    </td>
                                                                    <td>
                                                                        <Field
                                                                            as="select"
                                                                            id={`relationship${i}`}
                                                                            name={`relationship${i}`}
                                                                            className="form-select inputDesignDoubleInput"
                                                                        >
                                                                            <option value={""}>Select</option>
                                                                            <option value={"Son"}>Son</option>
                                                                            <option value={"Daughter"}>Daughter</option>
                                                                            <option value={"Step Son"}>Step Son</option>
                                                                            <option value={"Step Daughter"}>Step Daughter</option>
                                                                            <option value={"Other"}>Other</option>

                                                                        </Field>
                                                                    </td>
                                                                    <td>
                                                                        <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                                            <DynamicYesNo name={`depenantChild${i}`} values={values} handleChange={handleChange} />
                                                                        </div>
                                                                    </td>
                                                                </tr>)
                                                            })}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            )}

                                        </Form>)
                                }}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Childe
