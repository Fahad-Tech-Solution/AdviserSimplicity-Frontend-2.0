import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, InputGroup, Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { PatchAxios, PostAxios } from "../../Assets/Api/Api";
// import Select from "react-select";


const TradingCompany = (props) => {
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

  let BusinessAsCompanyStructure = Object.keys(questionDetail.BusinessAsCompanyStructure).length > 0 ? questionDetail.BusinessAsCompanyStructure : {
    client: [],
    partner: [],
    joint: [],

  }; // Use an empty object as default if BusinessAsCompanyStructure is undefined

  let initialValues = BusinessAsCompanyStructure[props.modalObject.Input].length
    ? { NumberOfMap: BusinessAsCompanyStructure[props.modalObject.Input].length }
    : { NumberOfMap: "" };

  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
    if (
      BusinessAsCompanyStructure[props.modalObject.Input] &&
      BusinessAsCompanyStructure[props.modalObject.Input].length
    ) {
      let arr = [];

      for (
        let i = 0;
        i < BusinessAsCompanyStructure[props.modalObject.Input].length;
        i++
      ) {
        arr.push("");
      }

      setDynamicFields(arr);
    }
  }, []);

  const fillInitialValues = (setFieldValue) => {
    if (
      BusinessAsCompanyStructure[props.modalObject.Input] &&
      BusinessAsCompanyStructure[props.modalObject.Input].length
    ) {
      BusinessAsCompanyStructure[props.modalObject.Input].forEach((data, i) => {
        if (data) {
          setFieldValue(`aBNACN${i}`, data.aBNACN || "");
          setFieldValue(`businessName${i}`, data.businessName || "");
          setFieldValue(`businessAddress${i}`, data.businessAddress || "");
          setFieldValue(`numberOfDirectors${i}`, data.numberOfDirectors || "");
          setFieldValue(`directorship${i}`, data.directorship || "");
          setFieldValue(`shareholding${i}`, data.shareholding || "");
          setFieldValue(`dividendReceived${i}`, data.dividendReceived || "");
          setFieldValue(`equityPosition${i}`, data.equityPosition || "");
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

    const numberOfMaps = parseInt(values.NumberOfMap, 10);
    const newEntries = [];

    // Iterate through each map entry and create a new object
    for (let i = 0; i < numberOfMaps; i++) {
      const newEntry = {
        businessName: values[`businessName${i}`] || "",
        aBNACN: values[`aBNACN${i}`] || "",
        businessAddress: values[`businessAddress${i}`] || "",
        numberOfDirectors: values[`numberOfDirectors${i}`] || "",
        directorship: values[`directorship${i}`] || "",
        shareholding: values[`shareholding${i}`] || "",
        dividendReceived: values[`dividendReceived${i}`] || "",
        equityPosition: values[`equityPosition${i}`] || "",

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
      (total, entry) => total + entry.numberOfDirectors,
      0
    );

    console.log(obj, "final obj");

    const bankAccountArray = BusinessAsCompanyStructure.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/BusinessAsCompanyStructure/Add`,
          obj
        );
      } else {
        obj.collection = props.modalObject.Input;
        res = await PatchAxios(
          `${DefaultUrl}/api/BusinessAsCompanyStructure/Update`,
          obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, BusinessAsCompanyStructure: res };
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

  let handleBlur = (setFieldValue, e) => {
    let value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setFieldValue(e.target.id, value.toFixed(2));
    } else {
      setFieldValue(e.target.id, "");
    }
  };


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
                            <th>Business Name</th>
                            <th>ABN/ACN</th>
                            <th>Business Address</th>
                            <th>Number of Directors </th>
                            <th>Directorship</th>
                            <th>Shareholding</th>
                            <th>Dividend Received</th>
                            <th>Equity Position</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dynamicFields.map((elem, i) => {
                            return (
                              <tr key={i}>
                                <td>{1 + i}</td>
                                <td>
                                  {" "}
                                  <Field
                                    type="text"
                                    placeholder="Business Name"
                                    id={`businessName${i}`}
                                    name={`businessName${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="ABN/ACN"
                                    id={`aBNACN${i}`}
                                    name={`aBNACN${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Business Address"
                                    id={`businessAddress${i}`}
                                    name={`businessAddress${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="Number of Directors"
                                    id={`numberOfDirectors${i}`}
                                    name={`numberOfDirectors${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Directorship"
                                    id={`directorship${i}`}
                                    name={`directorship${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="Shareholding "
                                    id={`shareholding${i}`}
                                    name={`shareholding${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onBlur={(e) => handleBlur(setFieldValue, e)}
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="Dividend Received"
                                    id={`dividendReceived${i}`}
                                    name={`dividendReceived${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="Equity Position"
                                    id={`equityPosition${i}`}
                                    name={`equityPosition${i}`}
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
          </Form>
        );
      }}
    </Formik>
  );
};

export default TradingCompany;
