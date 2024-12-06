import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import { Table } from "react-bootstrap";

import "yup-phone";

import { openNotificationSuccess, PatchAxios, PostAxios, toCommaAndDollar } from "../../../Components/Assets/Api/Api";
import { differenceInYears } from "date-fns";
import { CashFlowData, CashFlowScenarioData, defaultUrl, PersonalDetailsData, QuestionDetail } from "../../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";

const CashFlowEducationExpenses = (props) => {

  let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));
  let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

  let DefaultUrl = useRecoilValue(defaultUrl);

  let initialValues = {};
  let PersonalDetailObj = useRecoilValue(PersonalDetailsData);

  let handleInput = (e, setFieldValue) => {
    const value = e.target.value > 5 ? 5 : e.target.value;
    setFieldValue(e.target.name, value);
    // generateFields(value);
  };

  const fillInitialValues = (setFieldValue) => {
    try {
      // Set the object and API key
      setObjAndAPIKey(props.modalObject.key);

      console.log(PersonalDetailObj.children, "Discovery Form Data");
      // console.log(cashFlowData, "cashFlowData Form Data");
      // console.log(CashFlowScenarioDataObj, "CashFlowScenarioDataObj Form Data");

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      // Helper function to update field values
      const updateFields = (data, prefix) => {


        if (!data || !Object.keys(data).length) return;
        const fields = {
          Name: data.Name || "",
          DOB: data.DOB || "",
          age: parseFloat(differenceInYears(new Date(), new Date(data.DOB))) || "",
          childSupportReceived: data.childSupportReceived || "",
          paidOrReceived: data.paidOrReceived || "",
          primary: data.primary || "",
          secondary: data.secondary || "",
          educationUntil: data.educationUntil || "",
          uni: data.uni || "",
          courseYears: data.courseYears || "",
          indexation: data.indexation || "",
        };

        Object.entries(fields).forEach(([key, value]) => {
          setFieldValue(`${key}${prefix}`, value);
        });
      };

      // Update owner field
      if (scenarioObj?.selectedSource === "discoveryForm" && PersonalDetailObj && PersonalDetailObj._id) {
        setFieldValue(`numberOfChildren`, PersonalDetailObj.children.numberOfChildren || 0);

        // Update client-related fields
        if (PersonalDetailObj?.children?.arrayOfChildren) {
          PersonalDetailObj.children.arrayOfChildren.forEach((child, index) => {
            updateFields(child, index);
          })
        }

      }
      else {
        // Handle cashFlowData scenario
        const cashFlowDetails = CashFlowScenarioDataObj?.[objAndAPIKey];
        // console.log(cashFlowDetails, "cashFlowDetails")
        if (cashFlowDetails) {
          setFieldValue(`numberOfChildren`, cashFlowDetails.numberOfChildren || 0);

          if (cashFlowDetails?.arrayOfChildren) {
            cashFlowDetails.arrayOfChildren.forEach((child, index) => {
              updateFields(child, index);
            })
          }
        }
      }


      // Additional data from cashFlowData
      if (cashFlowData?.[objAndAPIKey]?._id) {
        // Handle cashFlowData scenario
        const cashFlowDetails = cashFlowData?.[objAndAPIKey];
        // console.log(cashFlowDetails, "cashFlowDetails")
        if (cashFlowDetails) {
          setFieldValue(`numberOfChildren`, cashFlowDetails.numberOfChildren || 0);

          if (cashFlowDetails?.arrayOfChildren) {
            cashFlowDetails.arrayOfChildren.forEach((child, index) => {
              updateFields(child, index);
            })
          }
        }
      }


    } catch (error) {
      console.error("Error in fillInitialValues:", error);
    }
  };

  let onSubmit = async (values) => {

    const childrenArray = [];
    for (let i = 0; i < values.numberOfChildren; i++) {
      childrenArray.push({
        Name: values[`Name${i}`],
        DOB: values[`DOB${i}`],
        age: values[`age${i}`],
        childSupportReceived: values[`childSupportReceived${i}`],
        paidOrReceived: values[`paidOrReceived${i}`],
        primary: values[`primary${i}`],
        secondary: values[`secondary${i}`],
        educationUntil: values[`educationUntil${i}`],
        uni: values[`uni${i}`],
        courseYears: values[`courseYears${i}`],
        indexation: values[`indexation${i}`],
      });
    }

    // console.log(JSON.stringify(childrenArray));
    // return (false);
    let obj = {
      numberOfChildren: values.numberOfChildren,
      arrayOfChildren: childrenArray,
      clientTotal: toCommaAndDollar(childrenArray.reduce((total, entry) => total + parseFloat(entry.childSupportReceived.replace(/[^0-9.-]+/g, "")), 0))
    }

    obj.scenarioFK = (JSON.parse(localStorage.getItem("ScenarioObj")))._id;

    const bankAccountArray = cashFlowData?.[objAndAPIKey]?._id || "";

    console.log(JSON.stringify(obj), "final obj");

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/CF/${objAndAPIKey}/Add`,
          obj
        );
      } else {
        res = await PatchAxios(
          `${DefaultUrl}/api/CF/${objAndAPIKey}/Update`,
          obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = {
          ...cashFlowData,
          [objAndAPIKey]: res,
        };
        setCashFlowData(updatedData);
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        'Data of "' + props.modalObject.title + '" is Saved'
      );

      // Reset the flag state if necessary
      if (props.flagState) {
        props.setFlagState(false);
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        'Data of "' +
        props.modalObject.title +
        '" is not Saved Please! try again'
      );
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

                  {values.numberOfChildren > 0 && (
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
