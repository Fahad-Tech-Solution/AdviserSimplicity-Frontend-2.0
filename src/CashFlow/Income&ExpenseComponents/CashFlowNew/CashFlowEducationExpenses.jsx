import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import { Image, Table } from "react-bootstrap";

import childimg from "../../../Components/PersonalDetails/images/child.svg";
import Modal from "react-bootstrap/Modal";
// import DynamicYesNo from '../Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo';

import "yup-phone";
import * as Yup from "yup";
import DynamicYesNo from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo";
import { toCommaAndDollar } from "../../../Components/Assets/Api/Api";
import { differenceInYears } from "date-fns";
import { PersonalDetailsData, QuestionDetail } from "../../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";

const CashFlowEducationExpenses = (props) => {
  let initialValues = {};
  let PersonalDetailObj = useRecoilValue(PersonalDetailsData);

  let handleInput = (e, setFieldValue) => {
    const value = e.target.value > 5 ? 5 : e.target.value;
    setFieldValue(e.target.name, value);
    // generateFields(value);
  };

  let onSubmit = (values) => {
    console.log(values);
    return;
    const numberOfChildren = parseInt(values.numberOfChildren, 10);
    const newEntries = [];

    console.log("numberOfChildren", numberOfChildren);

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
  };

  //   let validationSchema = Yup.object({});



  const fillInitialValues = (setFieldValue) => {
    if (PersonalDetailObj?.children?.numberOfChildren.length > 0) {
      console.log("PersonalDetailObj: ", PersonalDetailObj.children);

      // Set the number of children
      setFieldValue(`numberOfChildren`, PersonalDetailObj.children.numberOfChildren);

      // Loop through the array of children and set values for each child
      PersonalDetailObj.children.arrayOfChildren.forEach((child, i) => {
        setFieldValue(`Name${i}`, child.Name);  // Set the child's name
        setFieldValue(`DOB${i}`, new Date(child.DOB)); // Set the child's DOB as a Date object
        // Set other fields if needed, e.g., Gender, age, etc.
        setFieldValue(`age${i}`, differenceInYears(new Date(), new Date(child.DOB)) || 0);
      });
    }
  };



  const indexation = Array.from({ length: 21 }, (_, i) => ({
    value: (i * 0.5).toFixed(2) + "%",
    label: (i * 0.5).toFixed(2) + "%",
  }));
  return (
    <div className="container-fluid my-4">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            // validationSchema={validationSchema}
            innerRef={props.formRef}
            enableReinitialize
          >
            {({ values, setFieldValue, handleChange, errors, handleBlur }) => {
              useEffect(() => {
                fillInitialValues(setFieldValue);
              }, []);
              return (
                <Form className="">
                  <div className="d-flex  justify-content-center align-items-center gap-4">
                    <p className="text-end mt-3">
                      How many children do you have :
                    </p>

                    <div className="modalNumberWidth">
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
                    <div className="mt-4">
                      <Table striped bordered responsive hover>
                        <thead>
                          <tr>
                            <th>No#</th>
                            <th>Name</th>
                            <th>Dob</th>
                            <th>Age</th>
                            <th>Child Support Received ($)</th>
                            <th>Paid or Received</th>
                            <th>Primary</th>
                            <th>Secondary</th>
                            <th>Education until</th>
                            <th>Uni ($)</th>
                            <th>Course Years</th>
                            <th>Indexation</th>
                            {/* <th>Gender</th>
                            <th>Add in Relationship</th>
                            <th>Add in is Child Depenant</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: values.numberOfChildren }).map(
                            (elem, i) => {
                              return (
                                <tr key={i}>
                                  <td className="text-center pt-3">{1 + i}</td>
                                  <td style={{ minWidth: '9rem' }}>
                                    <Field
                                      placeholder="Enter Child Name"
                                      id={`Name${i}`}
                                      name={`Name${i}`}
                                      type={"text"}
                                      className="form-control inputDesignDoubleInput"
                                    />
                                  </td>
                                  <td style={{ minWidth: '9rem' }}>
                                    <div>
                                      <DatePicker
                                        className="form-control inputDesignDoubleInput shadow DateInputPadding"
                                        showIcon
                                        id={`DOB${i}`}
                                        name={`DOB${i}`}
                                        selected={values[`DOB${i}`]}
                                        onChange={(date) => {
                                          setFieldValue(`DOB${i}`, date);
                                          const age =
                                            differenceInYears(
                                              new Date(),
                                              date
                                            ) || 0;
                                          setFieldValue(`age${i}`, age); // Update specific age field for each i
                                        }}
                                        dateFormat="dd/MM/yyyy"
                                        maxDate={new Date()}
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        onBlur={handleBlur}
                                        wrapperClassName="w-100"
                                      />
                                    </div>
                                  </td>
                                  {/* <td>
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
                                  </td> */}
                                  <td style={{ minWidth: '4rem' }}>
                                    <Field
                                      placeholder="Age"
                                      id={`age${i}`}
                                      name={`age${i}`}
                                      type={"number"}
                                      className="form-control inputDesignDoubleInput"
                                      disabled={true}
                                    />
                                  </td>

                                  <td>
                                    <Field
                                      placeholder="Child Support Received"
                                      id={`childSupportReceived${i}`}
                                      name={`childSupportReceived${i}`}
                                      type={"text"}
                                      className="form-control inputDesignDoubleInput"
                                      onChange={(e) => {
                                        setFieldValue(
                                          e.target.name,
                                          toCommaAndDollar(
                                            e.target.value.replace(
                                              /[^0-9.-]+/g,
                                              ""
                                            )
                                          )
                                        );
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <Field
                                      as="select"
                                      id={`paidOrReceived${i}`}
                                      name={`paidOrReceived${i}`}
                                      className="form-select inputDesignDoubleInput"
                                    >
                                      <option value={""}>Select</option>
                                      <option value={"No"}>No</option>
                                      <option value={"Paid"}>Paid</option>
                                      <option value={"Recieved"}>
                                        Recieved
                                      </option>
                                    </Field>
                                  </td>
                                  <td>
                                    <Field
                                      placeholder="Primary"
                                      id={`primary${i}`}
                                      name={`primary${i}`}
                                      type={"text"}
                                      className="form-control inputDesignDoubleInput"
                                      onChange={(e) => {
                                        setFieldValue(
                                          e.target.name,
                                          toCommaAndDollar(
                                            e.target.value.replace(
                                              /[^0-9.-]+/g,
                                              ""
                                            )
                                          )
                                        );
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <Field
                                      placeholder="Secondary"
                                      id={`secondary${i}`}
                                      name={`secondary${i}`}
                                      type={"text"}
                                      className="form-control inputDesignDoubleInput"
                                      onChange={(e) => {
                                        setFieldValue(
                                          e.target.name,
                                          toCommaAndDollar(
                                            e.target.value.replace(
                                              /[^0-9.-]+/g,
                                              ""
                                            )
                                          )
                                        );
                                      }}
                                    />
                                  </td>

                                  <td>
                                    <Field
                                      as="select"
                                      id={`educationUntil${i}`}
                                      name={`educationUntil${i}`}
                                      className="form-select inputDesignDoubleInput"
                                    >
                                      <option value={""}>Select</option>
                                      <option value={"16"}>16</option>
                                      <option value={"17"}>17</option>
                                      <option value={"18"}>18</option>
                                    </Field>
                                  </td>

                                  <td style={{ minWidth: '6rem' }}>
                                    <Field
                                      placeholder="Uni"
                                      id={`uni${i}`}
                                      name={`uni${i}`}
                                      type={"text"}
                                      className="form-control inputDesignDoubleInput"
                                      onChange={(e) => {
                                        setFieldValue(
                                          e.target.name,
                                          toCommaAndDollar(
                                            e.target.value.replace(
                                              /[^0-9.-]+/g,
                                              ""
                                            )
                                          )
                                        );
                                      }}
                                    />
                                  </td>

                                  <td>
                                    <Field
                                      as="select"
                                      id={`courseYears${i}`}
                                      name={`courseYears${i}`}
                                      className="form-select inputDesignDoubleInput"
                                    >
                                      <option value={""}>Select</option>
                                      <option value={"1"}>1</option>
                                      <option value={"2"}>2</option>
                                      <option value={"3"}>3</option>
                                      <option value={"4"}>4</option>
                                      <option value={"5"}>5</option>
                                      <option value={"6"}>6</option>
                                      <option value={"7"}>7</option>
                                      <option value={"8"}>8</option>
                                      <option value={"9"}>9</option>
                                      <option value={"10"}>10</option>
                                    </Field>
                                  </td>

                                  <td>
                                    <Field
                                      as="select"
                                      id={`indexation${i}`}
                                      name={`indexation${i}`}
                                      className="form-select inputDesignDoubleInput"
                                    >
                                      <option value="">Select</option>
                                      {indexation.map((option, index) => (
                                        <option
                                          key={index}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </option>
                                      ))}
                                    </Field>
                                  </td>
                                  {/* <td>
                                    <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                                      <DynamicYesNo
                                        name={`depenantChild${i}`}
                                        values={values}
                                        handleChange={handleChange}
                                      />
                                    </div>
                                  </td> */}
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CashFlowEducationExpenses;
