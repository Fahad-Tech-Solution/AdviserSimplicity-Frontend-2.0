import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, InputGroup, Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { PatchAxios, PostAxios } from "../../Assets/Api/Api";
// import Select from "react-select";

const Inheritance = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

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

  let incomeFromInheritance = Object.keys(questionDetail.incomeFromInheritance).length > 0 ? questionDetail.incomeFromInheritance : {
    client: [],
    partner: [],
    joint: [],

  }; // Use an empty object as default if incomeFromInheritance is undefined

  let initialValues = incomeFromInheritance[props.modalObject.Input].length
    ? { NumberOfMap: incomeFromInheritance[props.modalObject.Input].length }
    : { NumberOfMap: "" };

  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
    if (
      incomeFromInheritance[props.modalObject.Input] &&
      incomeFromInheritance[props.modalObject.Input].length
    ) {
      let arr = [];

      for (
        let i = 0;
        i < incomeFromInheritance[props.modalObject.Input].length;
        i++
      ) {
        arr.push("");
      }

      setDynamicFields(arr);
    }
  }, []);

  const fillInitialValues = (setFieldValue) => {
    if (
      incomeFromInheritance[props.modalObject.Input] &&
      incomeFromInheritance[props.modalObject.Input].length
    ) {
      incomeFromInheritance[props.modalObject.Input].forEach((data, i) => {
        if (data) {
          setFieldValue(`year${i}`, data.year || "");
          setFieldValue(`description${i}`, data.description || "");
          setFieldValue(`amount${i}`, data.amount || "");
        }
      });
    }
  };

  let handleInput = (e, setFieldValue) => {
    const value = e.target.value > 10 ? 10 : e.target.value;
    setFieldValue(e.target.id, value);

    let arr = [];

    for (let i = 0; i < value; i++) {
      arr.push("");
    }

    setDynamicFields(arr);
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {

    console.log(JSON.stringify(values));
    // return (false);
    // Extract the number of maps from the values
    const numberOfMaps = parseInt(values.NumberOfMap, 10);
    const newEntries = [];

    // Iterate through each map entry and create a new object
    for (let i = 0; i < numberOfMaps; i++) {
      const newEntry = {
        description: values[`description${i}`] || "",
        year: values[`year${i}`] || "",
        amount: values[`amount${i}`] || "",

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

    obj[DataOf] = newEntries;

    // Calculate total currentBalance
    obj[DataOf + "Total"] = newEntries.reduce(
      (total, entry) => total + entry.amount,
      0
    );

    console.log(obj, "final obj");

    // Check if incomeFromInheritance and the array at props.modalObject.Input exist
    // const bankAccountArray = incomeFromInheritance[props.modalObject.Input] || [];
    const bankAccountArray = incomeFromInheritance.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/incomeFromInheritance/Add`,
          obj
        );
      } else {
        obj.collection = props.modalObject.Input;
        res = await PatchAxios(
          `${DefaultUrl}/api/incomeFromInheritance/Update`,
          obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, incomeFromInheritance: res };
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

  const options = [
    "1 Year",
    "2 Years",
    "3 Years",
    "4 Years",
    "5 Years",
  ];

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
                <div className="row justify-content-center">
                  <div className="col-md-5">
                    <p className="text-end mt-1">
                      How many {props.modalObject.title} does {nameSet} have:
                    </p>
                  </div>
                  <div className="col-md-2">
                    <Field
                      type="number"
                      id="NumberOfMap"
                      name="NumberOfMap"
                      className="form-control inputDesignDoubleInput"
                      onChange={(e) => handleInput(e, setFieldValue)}
                    />
                  </div>
                  {values.NumberOfMap && (
                    <div className="mt-4">
                      <Table striped bordered responsive hover>
                        <thead>
                          <tr>
                            <th
                              onClick={() => {
                                console.log(values);
                              }}
                            >
                              No#
                            </th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Year</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dynamicFields.map((elem, i) => {
                            return (
                              <tr key={i}>
                                <td>{1 + i}</td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Description"
                                    id={`description${i}`}
                                    name={`description${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="Amount"
                                    id={`amount${i}`}
                                    name={`amount${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
                                </td>
                                <td>
                                  <Field
                                    as="select"
                                    placeholder="Income p.a"
                                    id={`year${i}`}
                                    name={`year${i}`}
                                    className="form-select inputDesignDoubleInput"
                                  >
                                    <option value={""}>Please Select</option>
                                    {options.map((elem, index) => {
                                      return (
                                        <option key={index} value={elem}>
                                          {elem}
                                        </option>
                                      );
                                    })}
                                  </Field>
                                </td>
                              </tr>
                            );
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

export default Inheritance;
