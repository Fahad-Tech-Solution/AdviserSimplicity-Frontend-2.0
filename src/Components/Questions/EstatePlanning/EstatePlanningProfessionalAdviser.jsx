<<<<<<< HEAD
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
=======
import { Form, Formik } from "formik";
import React, { useEffect, useState, useMemo } from "react";
>>>>>>> origin/master
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
} from "../../Assets/Api/Api";
<<<<<<< HEAD

const EstatePlanningProfessionalAdviser = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

  let [nameSet] = useState(RenderName(props.modalObject.Input));

  let professionalAdviser =
=======
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const EstatePlanningProfessionalAdviser = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  const DefaultUrl = useRecoilValue(defaultUrl);
  const [nameSet] = useState(RenderName(props.modalObject.Input));

  const professionalAdviser =
>>>>>>> origin/master
    Object.keys(questionDetail.professionalAdviser || {}).length > 0
      ? questionDetail.professionalAdviser
      : {
          client: [],
          partner: [],
          joint: [],
<<<<<<< HEAD
        }; // Use an empty object as default if professionalAdviser is undefined

  let initialValues = professionalAdviser[props.modalObject.Input].length
=======
        };

  const initialValues = professionalAdviser[props.modalObject.Input]?.length
>>>>>>> origin/master
    ? { NumberOfMap: professionalAdviser[props.modalObject.Input].length }
    : { NumberOfMap: "" };

  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
    if (
      professionalAdviser[props.modalObject.Input] &&
      professionalAdviser[props.modalObject.Input].length
    ) {
<<<<<<< HEAD
      let arr = [];

      for (
        let i = 0;
        i < professionalAdviser[props.modalObject.Input].length;
        i++
      ) {
        arr.push("");
      }

      setDynamicFields(arr);
    }
  }, []);

  const fillInitialValues = (setFieldValue) => {
    console.log("Estate Planning Professional Adviser:", props.modalObject);
=======
      setDynamicFields(
        Array(professionalAdviser[props.modalObject.Input].length).fill("")
      );
    }
  }, [professionalAdviser[props.modalObject.Input]]);

  const fillInitialValues = (setFieldValue) => {
>>>>>>> origin/master
    if (
      professionalAdviser[props.modalObject.Input] &&
      professionalAdviser[props.modalObject.Input].length
    ) {
      professionalAdviser[props.modalObject.Input].forEach((data, i) => {
        if (data) {
<<<<<<< HEAD
          setFieldValue(`POAType${i}`, data.POAType || "");
          setFieldValue(`adviserName${i}`, data.adviserName || "");
          setFieldValue(`company${i}`, data.company || "");
          setFieldValue(`phone${i}`, data.phone || "");
          setFieldValue(`email${i}`, data.email || "");
=======
          setFieldValue(
            `professionalAdviser[${i}].POAType`,
            data.POAType || ""
          );
          setFieldValue(
            `professionalAdviser[${i}].adviserName`,
            data.adviserName || ""
          );
          setFieldValue(
            `professionalAdviser[${i}].company`,
            data.company || ""
          );
          setFieldValue(`professionalAdviser[${i}].phone`, data.phone || "");
          setFieldValue(`professionalAdviser[${i}].email`, data.email || "");
>>>>>>> origin/master
        }
      });
    }
  };

<<<<<<< HEAD
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
    // console.log(values);
    // return (false);
    // Extract the number of maps from the values
    const numberOfMaps = parseInt(values.NumberOfMap, 10);
    const newEntries = [];

    // Iterate through each map entry and create a new object
    for (let i = 0; i < numberOfMaps; i++) {
      const newEntry = {
        POAType: values[`POAType${i}`] || "",
        adviserName: values[`adviserName${i}`] || "",
        company: values[`company${i}`] || "",
        phone: values[`phone${i}`] || "",
        email: values[`email${i}`] || "",
=======
  const handleInput = (e, setFieldValue) => {
    const value = e.target.value > 10 ? 10 : e.target.value;
    setFieldValue("NumberOfMap", value);
    setDynamicFields(Array(Number(value)).fill(""));
    setFieldValue(
      "professionalAdviser",
      Array(Number(value))
        .fill()
        .map(() => ({
          POAType: "",
          adviserName: "",
          company: "",
          phone: "",
          email: "",
        }))
    );
  };

  const onSubmit = async (values) => {
    const numberOfMaps = parseInt(values.NumberOfMap, 10) || 0;
    const newEntries = [];

    for (let i = 0; i < numberOfMaps; i++) {
      const newEntry = {
        POAType: values.professionalAdviser?.[i]?.POAType || "",
        adviserName: values.professionalAdviser?.[i]?.adviserName || "",
        company: values.professionalAdviser?.[i]?.company || "",
        phone: values.professionalAdviser?.[i]?.phone || "",
        email: values.professionalAdviser?.[i]?.email || "",
>>>>>>> origin/master
      };
      newEntries.push(newEntry);
    }

<<<<<<< HEAD
    // Log the new entries to verify
    console.log(newEntries);

    let DataOf = props.modalObject.Input;

    // Create an object with additional fields
    let obj = {
      clientFK: localStorage.getItem("UserID"),
    };

    obj[DataOf] = newEntries;

    // Calculate total currentBalance
    // obj[DataOf + "Total"] = newEntries.reduce((total, entry) => total + entry.annualAdvice, 0);
    obj[DataOf + "Total"] = newEntries.length;

    console.log(obj, "final obj");

    // Check if professionalAdviser and the array at props.modalObject.Input exist
    // const bankAccountArray = professionalAdviser[props.modalObject.Input] || [];
    const bankAccountArray = professionalAdviser.clientFK || "";

    try {
      let res;
=======
    const DataOf = props.modalObject.Input;
    const obj = {
      clientFK: localStorage.getItem("UserID"),
      [DataOf]: newEntries,
      [DataOf + "Total"]: newEntries.length,
    };

    setQuestionDetail((prev) => ({
      ...prev,
      professionalAdviser: {
        ...prev.professionalAdviser,
        [DataOf]: newEntries,
      },
    }));

    try {
      let res;
      const bankAccountArray = professionalAdviser.clientFK || "";
>>>>>>> origin/master
      if (!bankAccountArray) {
        res = await PostAxios(`${DefaultUrl}/api/professionalAdviser/Add`, obj);
      } else {
        obj.collection = props.modalObject.Input;
        res = await PatchAxios(
          `${DefaultUrl}/api/professionalAdviser/Update`,
          obj
        );
      }

      if (res) {
<<<<<<< HEAD
        console.log(res);
=======
>>>>>>> origin/master
        const updatedData = { ...questionDetail, professionalAdviser: res };
        setQuestionDetail(updatedData);
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
<<<<<<< HEAD
        'Data of "' + props.modalObject.title + '" is Saved'
      );
      // Reset the flag state if necessary
=======
        `Data of "${props.modalObject.title}" is Saved`
      );
>>>>>>> origin/master
      if (props.flagState) {
        props.setFlagState(false);
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
<<<<<<< HEAD
        'Data of "' +
          props.modalObject.title +
          '" is not Saved Please! try again'
=======
        `Data of "${props.modalObject.title}" is not Saved. Please try again!`
>>>>>>> origin/master
      );
    }
  };

<<<<<<< HEAD
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
                      How many {props.modalObject.title} does {nameSet} have :
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
                            <th>Adviser Type</th>
                            <th>Adviser Name</th>
                            <th>Company</th>
                            <th>Phone</th>
                            <th>Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dynamicFields.map((elem, i) => {
                            return (
                              <tr key={i}>
                                <td>{1 + i}</td>
                                <td>
                                  <Field
                                    as="select"
                                    placeholder="Fund Name"
                                    id={`POAType${i}`}
                                    name={`POAType${i}`}
                                    className="form-select inputDesignDoubleInput"
                                  >
                                    <option value={""}>Please Select</option>
                                    <option value={"Accountant"}>
                                      Accountant
                                    </option>
                                    <option value={"Lawyer/Solicitor"}>
                                      Lawyer/Solicitor
                                    </option>
                                    <option value={"Insurance adviser"}>
                                      Insurance adviser
                                    </option>
                                    <option value={"Doctor"}>Doctor</option>
                                    <option value={"Other"}>Other</option>
                                  </Field>
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Adviser Name"
                                    id={`adviserName${i}`}
                                    name={`adviserName${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Company"
                                    id={`company${i}`}
                                    name={`company${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="Phone"
                                    id={`phone${i}`}
                                    name={`phone${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="email"
                                    placeholder="Any specific estate planning requirements/needs?"
                                    id={`email${i}`}
                                    name={`email${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
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
=======
  const columns = [
    {
      title: "No#",
      dataIndex: "index",
      key: "owner",
      render: (_, __, i) => i + 1,
      width: 60,
    },
    {
      title: "Adviser Type",
      dataIndex: "POAType",
      key: "POAType",
      type: "select",
      options: [
        { value: "Accountant", label: "Accountant" },
        { value: "Lawyer/Solicitor", label: "Lawyer/Solicitor" },
        { value: "Insurance adviser", label: "Insurance adviser" },
        { value: "Doctor", label: "Doctor" },
        { value: "Other", label: "Other" },
      ],
      placeholder: "Adviser Type",
      width: 200,
    },
    {
      title: "Adviser Name",
      dataIndex: "adviserName",
      key: "adviserName",
      type: "text",
      placeholder: "Adviser Name",
      width: 200,
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      type: "text",
      placeholder: "Company",
      width: 200,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      type: "number",
      placeholder: "Phone",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      type: "text",
      placeholder: "Email",
      width: 250,
    },
  ];

  return (
    <Formik
      initialValues={{
        ...initialValues,
        professionalAdviser: professionalAdviser[props.modalObject.Input] || [],
      }}
      enableReinitialize
      innerRef={props.formRef}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [professionalAdviser[props.modalObject.Input]]);

        const dataRows = useMemo(() => {
          const num = Number(values.NumberOfMap) || 0;
          if (num > 0) {
            return Array.from({ length: num }, (_, i) => ({
              key: `professionalAdviser.${i}`,
              stakeHolder: `professionalAdviser[${i}]`,
              POAType: values.professionalAdviser?.[i]?.POAType || "",
              adviserName: values.professionalAdviser?.[i]?.adviserName || "",
              company: values.professionalAdviser?.[i]?.company || "",
              phone: values.professionalAdviser?.[i]?.phone || "",
              email: values.professionalAdviser?.[i]?.email || "",
            }));
          }
          return [];
        }, [values.NumberOfMap, values.professionalAdviser]);

        return (
          <Form>
            <div className="d-flex justify-content-center align-items-center gap-4">
              <p
                className="text-end mt-1 pt-2"
                onClick={() => {
                  console.log(values);
                }}
              >
                How many {props.modalObject.title} does {nameSet} have :
              </p>
              <div style={{ minWidth: "10%" }}>
                <select
                  id="NumberOfMap"
                  name="NumberOfMap"
                  className="form-select inputDesignDoubleInput"
                  onChange={(e) => handleInput(e, setFieldValue)}
                  value={values.NumberOfMap}
                >
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
            </div>

            {values.NumberOfMap && (
              <div className="mt-4 All_Client reportSection">
                <AntdTable
                  columns={columns}
                  data={dataRows}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </div>
            )}
            <button type="submit" style={{ display: "none" }}>
              Submit
            </button>
>>>>>>> origin/master
          </Form>
        );
      }}
    </Formik>
  );
};

export default EstatePlanningProfessionalAdviser;
