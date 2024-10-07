import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, InputGroup, Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { handleInputBlur, handleInputChange, handleInputFocus, handleInputKeyDown, PatchAxios, PostAxios, toCommaAndDollar, toPercentage } from "../../Assets/Api/Api";
import DynamicYesNo from "../FinancialInvestments/QuestionsDetail/DynamicYesNo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
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
    const value = e.target.value > 3 ? 3 : e.target.value;
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
    let total = newEntries.reduce((total, entry) => total + parseFloat((entry.equityPosition).replace(/[^0-9.-]+/g, "")), 0);

    props.setFieldValue(DataOf + "CurrentBalance", toCommaAndDollar(total));

    if (props.flagState) {
      props.setFlagState(false);
    }

  };

  let FormulaSetting = () => {

  }


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


                <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                  <label htmlFor='' className=''>
                    How many {props.modalObject.title} does {nameSet} have:
                  </label>

                  <div style={{ width: "10%" }} >
                    <Field
                      type="number"
                      id="NumberOfMap"
                      name="NumberOfMap"
                      className="form-control inputDesignDoubleInput"
                      onChange={(e) => handleInput(e, setFieldValue)}
                    />
                  </div>
                </div>

                <div className="row justify-content-center">
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
                            <th>Number of Directors</th>
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
                                  <DynamicYesNo
                                    name={`directorship${i}`}
                                    values={values}
                                    handleChange={handleChange}
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Shareholding "
                                    id={`shareholding${i}`}
                                    name={`shareholding${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => handleInputChange(e, setFieldValue, FormulaSetting, values)}
                                    onFocus={(e) => handleInputFocus(e, setFieldValue)}
                                    onKeyDown={(e) => handleInputKeyDown(e)}
                                    onBlur={(e) => handleInputBlur(e, setFieldValue, toPercentage, FormulaSetting, values)}
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Dividend Received"
                                    id={`dividendReceived${i}`}
                                    name={`dividendReceived${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(e.target.name,
                                        toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                    }}
                                  />
                                </td>
                                <td>
                                  <InputGroup className="mb-3" style={{ width: "150px" }}>
                                    <Field
                                      type="text"
                                      placeholder="Equity Position"
                                      id={`equityPosition${i}`}
                                      name={`equityPosition${i}`}
                                      className="form-control inputDesignDoubleInput"
                                      onChange={(e) => {
                                        setFieldValue(e.target.name,
                                          toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                      }}
                                    />
                                    <Button className='btn bgColor modalBtn border-0' id="button-addon2" onClick={() => {
                                    }}>
                                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                    </Button>
                                  </InputGroup>
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
