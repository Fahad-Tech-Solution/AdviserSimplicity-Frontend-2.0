import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, InputGroup, Modal, Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { handleInputBlur, handleInputChange, handleInputFocus, handleInputKeyDown, PatchAxios, PostAxios, toCommaAndDollar, toPercentage } from "../../Assets/Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
// import Select from "react-select";



function InnerDirectors(props) {


  let innerinitialValues = { NumberOfDirectors: "" };

  let handleInnerSubmit = (values) => {

    console.log(values);

    let newEntries = [];

    for (let i = 0; i < parseFloat(values.NumberOfDirectors); i++) {
      const newEntry = {
        directorName: values[`directorName${i}`] || "",
      };

      newEntries.push(newEntry);
    }



    props.setFieldValue("NumberOfDirectors" + props.modalObject.index, parseFloat(values.NumberOfDirectors))
    props.setFieldValue("directorsNames" + props.modalObject.index, newEntries)


    if (props.flagState) {
      props.setFlagState(false);
    }

  }
  let handleInput = (e, setFieldValue, limit) => {
    const value = e.target.value > limit ? limit : e.target.value;
    setFieldValue(e.target.id, value);
  };

  let innerfillInitialValues = (setFieldValue) => {

    console.log(props.modalObject.values, props.modalObject.values[`directorsNames${props.modalObject.index}`])
    setFieldValue("NumberOfDirectors", props.modalObject.values[`NumberOfDirectors${props.modalObject.index}`])

    let director = props.modalObject.values[`directorsNames${props.modalObject.index}`] || [];

    director.forEach((element, index) => {

      setFieldValue("directorName" + index, element.directorName);
    });

  }


  return (<Modal centered size={"md"} show={props.flagState} onHide={() => props.setFlagState(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Directors</Modal.Title>
    </Modal.Header>
    <Formik initialValues={innerinitialValues} onSubmit={handleInnerSubmit} enableReinitialize>
      {({
        values,
        setFieldValue,
        handleChange
      }) => {
        useEffect(() => {
          innerfillInitialValues(setFieldValue);
        }, []);
        return <Form>
          <Modal.Body className="px-4">
            <div className="col-md-12">
              <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                <label htmlFor='' className=''>
                  How many directors does the Corporate Trustee have :
                </label>

                <div style={{
                  width: "40%"
                }}>
                  <Field type="number" id={`NumberOfDirectors`} name={`NumberOfDirectors`} className="form-control inputDesignDoubleInput" onChange={e => handleInput(e, setFieldValue, 4)} />
                </div>
              </div>


              <div className="row justify-content-center">
                {values.NumberOfDirectors && <div className="mt-4">
                  <Table striped bordered responsive hover>
                    <thead>
                      <tr>
                        <th onClick={() => {
                          console.log(values);
                        }}>
                          No#
                        </th>
                        <th>Director Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({
                        length: values.NumberOfDirectors
                      }).map((_, index) => <tr key={index}>
                        <td>
                          {index + 1}
                        </td>
                        <td>
                          {" "}
                          <Field type="text" placeholder="Director Name" id={`directorName${index}`} name={`directorName${index}`} className="form-control inputDesignDoubleInput" />
                        </td>
                      </tr>)}
                    </tbody>
                  </Table>
                </div>}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
              props.setFlagState(false);
            }}>
              Close
            </Button>
            <Button type='submit' className='btn bgColor modalBtn'>
              Submit
            </Button>
          </Modal.Footer>
        </Form>;
      }}
    </Formik>
  </Modal>);
}


const TradingTrust = (props) => {

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

  // Use an empty object as default if BusinessAsTrusts is undefined

  let initialValues = { NumberOfMap: "" };

  const fillInitialValues = (setFieldValue) => {

    console.log(props.modalObject.values[props.modalObject.key], props.modalObject.key);

    if (props.modalObject.values[props.modalObject.key] && props.modalObject.values[props.modalObject.key].length > 0) {

      let Data = props.modalObject.values[props.modalObject.key]

      setFieldValue("NumberOfMap", Data.length);

      Data.map((elem, i) => {
        setFieldValue("businessName" + i, elem.businessName);
        setFieldValue("aBN" + i, elem.aBN);
        setFieldValue("businessAddress" + i, elem.businessAddress);
        setFieldValue("trusteeType" + i, elem.trusteeType);
        setFieldValue("trusteeName" + i, elem.trusteeName);
        setFieldValue("aNC" + i, elem.aNC);
        setFieldValue("businessOwnership" + i, elem.businessOwnership);
        setFieldValue("distributionReceived" + i, elem.distributionReceived);
        setFieldValue("businessValuation" + i, elem.businessValuation);

        if (elem.trusteeType === "Corporate") {

          setFieldValue("NumberOfDirectors" + i, elem.NumberOfDirectors);
          setFieldValue("directorsNames" + i, elem.directorsNames);

        }

      })


    }




  };

  let handleInput = (e, setFieldValue, limit) => {
    const value = e.target.value > limit ? limit : e.target.value;
    setFieldValue(e.target.id, value);
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
        businessName: values[`businessName${i}`] || "",
        aBN: values[`aBN${i}`] || "",
        businessAddress: values[`businessAddress${i}`] || "",
        trusteeType: values[`trusteeType${i}`] || "",
        trusteeName: values[`trusteeName${i}`] || "",
        aNC: values[`aNC${i}`] || "",
        businessOwnership: values[`businessOwnership${i}`] || "",
        distributionReceived: values[`distributionReceived${i}`] || "",
        businessValuation: values[`businessValuation${i}`] || "",
      };

      if (values[`trusteeType${i}`] === "Corporate") {

        newEntry.NumberOfDirectors = values[`NumberOfDirectors${i}`];
        newEntry.directorsNames = values[`directorsNames${i}`];
      }

      newEntries.push(newEntry);
    }

    // Log the new entries to verify
    console.log(newEntries);

    // Calculate total currentBalance
    let total = newEntries.reduce((total, entry) => total + parseFloat((entry.businessValuation).replace(/[^0-9.-]+/g, "")), 0);

    props.setFieldValue(props.modalObject.key, newEntries);
    props.setFieldValue(props.modalObject.mainKey, toCommaAndDollar(total));

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }

  };

  let FormulaSetting = () => { }

  let handleInnerModal = (title, key, mainKey, values, index) => {
    setModalObject({
      title,
      key,
      mainKey,
      values,
      index
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
                      onChange={(e) => handleInput(e, setFieldValue, 10)}
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
                            <th>ABN</th>
                            <th>Business Address</th>
                            <th>Trustee Type</th>
                            <th>Trustee Name</th>
                            <th>ACN</th>
                            <th>Business Ownership</th>
                            <th>Distribution Received</th>
                            <th>Business Valuation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: values.NumberOfMap }).map((_, i) => (
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
                                  placeholder="ABN"
                                  id={`aBN${i}`}
                                  name={`aBN${i}`}
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
                                <InputGroup className="mb-3" style={{ width: "150px" }}>
                                  <Field
                                    as="select"
                                    placeholder="Trustee Type"
                                    id={`trusteeType${i}`}
                                    name={`trusteeType${i}`}
                                    className={`form-select inputDesignDoubleInput ${values[`trusteeType${i}`] === "Corporate" ? "no-right-radius" : ""}`}
                                    onChange={(e) => {
                                      setFieldValue(e.target.name, e.target.value);
                                      if (e.target.value !== "Corporate") {

                                        setFieldValue("", "");
                                        if (values.NumberOfDirectors) {
                                          Array.from({ length: values.NumberOfDirectors }).map((_, i) => {
                                            setFieldValue(`directorName${i}`, "");
                                          })
                                          setFieldValue("NumberOfDirectors", "");
                                        }
                                      }
                                    }}
                                  >
                                    <option value="">Please Select</option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Individual">Individual</option>
                                  </Field>
                                  {values[`trusteeType${i}`] === "Corporate" && (
                                    <Button
                                      className="btn bgColor modalBtn border-0"
                                      id="button-addon2"
                                      onClick={() =>
                                        handleInnerModal(
                                          "Business as Trusts",
                                          "equityPositionArray",
                                          "equityPosition",
                                          values,
                                          i
                                        )
                                      }
                                    >
                                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                    </Button>
                                  )}
                                </InputGroup>
                              </td>

                              <td>
                                <Field
                                  type="text"
                                  placeholder="Trustee Name"
                                  id={`trusteeName${i}`}
                                  name={`trusteeName${i}`}
                                  className="form-control inputDesignDoubleInput"
                                />
                              </td>
                              <td>
                                <Field
                                  type="number"
                                  placeholder="ANC"
                                  id={`aNC${i}`}
                                  name={`aNC${i}`}
                                  className="form-control inputDesignDoubleInput"
                                />
                              </td>
                              <td>
                                <Field
                                  type="text"
                                  placeholder="Business Ownership"
                                  id={`businessOwnership${i}`}
                                  name={`businessOwnership${i}`}
                                  className="form-control inputDesignDoubleInput"
                                  onChange={(e) => handleInputChange(e, setFieldValue, FormulaSetting, values)}
                                  onFocus={(e) => handleInputFocus(e, setFieldValue)}
                                  onKeyDown={(e) => handleInputKeyDown(e)}
                                  onBlur={(e) => handleInputBlur(e, setFieldValue, toPercentage, FormulaSetting, values)}
                                />
                              </td>
                              <td>
                                <Field
                                  type="number"
                                  placeholder="Distribution Received"
                                  id={`distributionReceived${i}`}
                                  name={`distributionReceived${i}`}
                                  className="form-control inputDesignDoubleInput"
                                />
                              </td>
                              <td>
                                <Field
                                  type="text"
                                  placeholder="Business Valuation"
                                  id={`businessValuation${i}`}
                                  name={`businessValuation${i}`}
                                  className="form-control inputDesignDoubleInput"
                                  onChange={(e) => {
                                    setFieldValue(e.target.name,
                                      toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                  }}
                                />
                              </td>
                            </tr>
                          ))
                          }
                        </tbody>
                      </Table>
                    </div>
                  )}
                </div>

                <InnerDirectors setFieldValue={setFieldValue} flagState={flagState} setFlagState={setFlagState} modalObject={modalObject}></InnerDirectors>

              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default TradingTrust;
