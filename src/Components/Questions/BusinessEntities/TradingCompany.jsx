import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, InputGroup, Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { handleInputBlur, handleInputChange, handleInputFocus, handleInputKeyDown, PatchAxios, PostAxios, toCommaAndDollar, toPercentage } from "../../Assets/Api/Api";
import DynamicYesNo from "../FinancialInvestments/QuestionsDetail/DynamicYesNo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import TradingTrust from "./TradingTrust";
import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
// import Select from "react-select";


const TradingCompany = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

  const [title, setTitle] = useState(() => {
    // let head = props.modalObject.title;
    let currentTitle = props.modalObject.title;

    // Check if the title contains an underscore
    if (currentTitle.includes('_')) {
      currentTitle = (currentTitle.split('_').slice(1))[0];
    }

    return currentTitle
  });

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});


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

  let initialValues = { NumberOfMap: "" };

  const [dynamicFields, setDynamicFields] = useState([]);

  const fillInitialValues = (setFieldValue) => {
    console.log("Values", props.modalObject.values[props.modalObject.Input])

    if (props.modalObject?.values[props.modalObject.Input] && props.modalObject.values[props.modalObject.Input].length > 0) {
      setFieldValue("NumberOfMap", props.modalObject.values[props.modalObject.Input].length);

      let data = props.modalObject.values[props.modalObject.Input];

      data.map((elem, i) => {
        setFieldValue("businessName" + i, elem.businessName);
        setFieldValue("aBNACN" + i, elem.aBNACN);
        setFieldValue("businessAddress" + i, elem.businessAddress);
        setFieldValue("numberOfDirectors" + i, elem.numberOfDirectors);
        setFieldValue("directorship" + i, elem.directorship);
        setFieldValue("shareholding" + i, elem.shareholding);
        setFieldValue("dividendReceived" + i, elem.dividendReceived);
        setFieldValue("equityPosition" + i, elem.equityPosition);
        setFieldValue("equityPositionArray" + i, elem.equityPositionArray);
      })

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
        equityPositionArray: values[`equityPositionArray${i}`] || "",
      };
      newEntries.push(newEntry);
    }


    // Log the new entries to verify

    let DataOf = props.modalObject.Input;

    console.log(newEntries, DataOf, values);

    // Calculate total currentBalance
    let total = newEntries.reduce((total, entry) => total + parseFloat((entry.equityPosition).replace(/[^0-9.-]+/g, "")), 0);

    props.setFieldValue(DataOf, newEntries);

    props.setFieldValue(DataOf + "CurrentBalance", toCommaAndDollar(total));


    props.modalObject.setShowError(prevState => ({
      ...prevState,
      [`${DataOf + "CurrentBalance"}Error`]: false,
      [`${DataOf + "CurrentBalance"}Message`]: "",
    }))

    if (props.flagState) {
      props.setFlagState(false);
    }

  };

  let FormulaSetting = () => { }

  let handleInnerModal = (title, key, mainKey, values) => {
    setModalObject({
      title,
      key,
      mainKey,
      values
    })
    setFlagState(true);
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
        }, []);

        return (
          <Form>
            <Row>

              <InnerModal modalObject={modalObject} setFieldValue={setFieldValue} setFlagState={setFlagState} flagState={flagState} >
                {
                  modalObject.title === "Business as Trusts" ? <TradingTrust /> : ""
                }
              </InnerModal>

              <div className="col-md-12">
                <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                  <label htmlFor='' className=''>
                    How many {title} does {nameSet} have :
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
                          {Array.from({ length: values.NumberOfMap }).map((_, i) => {
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
                                    placeholder="Shareholding"
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
                                      handleInnerModal("Business as Trusts", `equityPositionArray${i}`, `equityPosition${i}`, values)
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
