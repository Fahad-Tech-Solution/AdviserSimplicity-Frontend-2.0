import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, InputGroup, Modal, Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { openNotificationSuccess, PatchAxios, PostAxios, validateName } from "../../Assets/Api/Api";
import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
import DynamicYesNo from "../FinancialInvestments/QuestionsDetail/DynamicYesNo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";

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

    props.setFieldValue("directorsOfCorporateTrustee", newEntries)

    if (props.flagState) {
      props.setFlagState(false);
    }

  }
  let handleInput = (e, setFieldValue, limit) => {
    const value = e.target.value > limit ? limit : e.target.value;
    setFieldValue(e.target.id, value);
  };

  let innerfillInitialValues = (setFieldValue) => {

    console.log(props.modalObject.values, props.modalObject.values[`directorsOfCorporateTrustee`])

    setFieldValue("NumberOfDirectors", props.modalObject.values[`directorsOfCorporateTrustee`].length > 0 ? props.modalObject.values[`directorsOfCorporateTrustee`].length : "")

    let director = props.modalObject.values[`directorsOfCorporateTrustee`] || [];

    director.forEach((element, index) => {
      setFieldValue("directorName" + index, element.directorName);
    });

  }


  return (<Modal centered size={"md"} backdrop="static" show={props.flagState} onHide={() => props.setFlagState(false)}>
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
                  <Field type="number" id={`NumberOfDirectors`} name={`NumberOfDirectors`} className="form-control inputDesignDoubleInput" onChange={e => handleInput(e, setFieldValue, 6)} />
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
                          <Field type="text" placeholder="Director Name" id={`directorName${index}`} name={`directorName${index}`} className="form-control inputDesignDoubleInput"
                            onChange={(e) => {
                              setFieldValue(e.target.name, validateName(e.target.value))
                            }}
                          />
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

function InnerDirectorsOfBareTrust(props) {

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

    let Obj = {
      NumberOfDirectors: newEntries.length,
      bareTrusteeName: values.bareTrusteeName,
      ACN: values.ACN,
      directorNameArray: newEntries,
    }

    // props.setFieldValue("NumberOfDirectors", parseFloat(values.NumberOfDirectors))
    props.setFieldValue("directorsOfBareTrust", Obj)

    if (props.flagState) {
      props.setFlagState(false);
    }

  }
  let handleInput = (e, setFieldValue, limit) => {
    const value = e.target.value > limit ? limit : e.target.value;
    setFieldValue(e.target.id, value);
  };

  let innerfillInitialValues = (setFieldValue) => {

    console.log(props.modalObject.values);

    if (Object.keys(props.modalObject.values[`directorsOfBareTrust`]).length > 0) {
      let Data = props.modalObject.values[`directorsOfBareTrust`] || {};
      setFieldValue("bareTrusteeName", Data.bareTrusteeName)
      setFieldValue("ACN", Data.ACN)

      if (Data.directorNameArray.length > 0) {
        setFieldValue("NumberOfDirectors", Data.directorNameArray.length)
        Data.directorNameArray.forEach((elem, index) => {
          setFieldValue("directorName" + index, elem.directorName);
        })
      }
    }
  }


  return (

    <Modal centered size={"xl"} show={props.flagState} backdrop="static" onHide={() => props.setFlagState(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Directors Of Bare Trust</Modal.Title>
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
                    How many directors does the bare trust have ?
                  </label>

                  <div style={{
                    width: "5%"
                  }}>
                    <Field type="number" id={`NumberOfDirectors`} name={`NumberOfDirectors`} className="form-control inputDesignDoubleInput" onChange={e => handleInput(e, setFieldValue, 6)} />
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
                          <th>Bare Trustee Name</th>
                          <th>ACN</th>

                          {Array.from({
                            length: values.NumberOfDirectors
                          }).map((_, index) =>
                            <th key={index}>Director {index + 1} Name</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            1
                          </td>
                          <td>
                            <Field
                              type="text" placeholder="Bare Trustee Name"
                              id={`bareTrusteeName`} name={`bareTrusteeName`} className="form-control inputDesignDoubleInput"
                              onChange={(e) => {
                                setFieldValue(e.target.name, validateName(e.target.value))
                              }}
                            />
                          </td>
                          <td>
                            <Field type="number" placeholder="ACN" id={`ACN`} name={`ACN`} className="form-control inputDesignDoubleInput" />
                          </td>
                          {Array.from({
                            length: values.NumberOfDirectors
                          }).map((_, index) =>
                            <td key={index}>
                              <Field as="select"
                                placeholder="Director Name"
                                id={`directorName${index}`}
                                name={`directorName${index}`}
                                className="form-select inputDesignDoubleInput" >
                                <option value="">Select</option>
                                {
                                  props.modalObject.values[`directorsOfCorporateTrustee`].map((elem, i) => {
                                    return (<option values={elem.directorName}>{elem.directorName}</option>)
                                  })
                                }
                              </Field>
                            </td>
                          )}
                        </tr>
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
    </Modal>

  );
}

const SmsfDetails = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

  let [flagState1, setFlagState1] = useState(false);
  let [flagState2, setFlagState2] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let SMSFDetails = Object.keys(questionDetail.SMSFDetails).length > 0 ? questionDetail.SMSFDetails : {
    client: [],
    partner: [],
    joint: [],

  }; // Use an empty object as default if SMSFDetails is undefined

  let initialValues = {
    "fundName": "",
    "ABN": "",
    "registeredOffice": "",
    "placeOfBusiness": "",
    "establishmentDate": "",
    "trusteeType": "",
    "directorsOfCorporateTrustee": [],
    "trusteeName": "",
    "nameOfAccountant": "",
    "ACN": "",
    "bareTrust": "No",
    "directorsOfBareTrust": {},
  };



  const fillInitialValues = (setFieldValue) => {
    let data = SMSFDetails.SMSFOwner || {};
    // Loop through each property of SMSFDetails and set the field values
    Object.keys(data).forEach((key) => {
      setFieldValue(key, data[key] || ""); // Set each field value or an empty string if the value is null/undefined
    });
  };

  let handleInnerModal = (title, key, mainKey, values) => {
    setModalObject({
      title,
      key,
      mainKey,
      values,
    })
    setFlagState1(true);
  }

  let handleInnerModal2 = (title, key, mainKey, values) => {
    setModalObject({
      title,
      key,
      mainKey,
      values,
    })
    setFlagState2(true);
  }

  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    // console.log(JSON.stringify(values));
    // return (false);

    // Create an object with additional fields
    let obj = {
      clientFK: localStorage.getItem("UserID"),
    };

    obj.SMSFOwner = values;

    console.log(JSON.stringify(obj), "final obj");

    // Check if SMSFDetails and the array at props.modalObject.Input exist
    // const bankAccountArray = SMSFDetails[props.modalObject.Input] || [];
    const bankAccountArray = SMSFDetails.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/SMSFDetails/Add`,
          obj
        );
      } else {
        obj._id = SMSFDetails._id;
        res = await PatchAxios(
          `${DefaultUrl}/api/SMSFDetails/Update`,
          obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, SMSFDetails: res };
        setQuestionDetail(updatedData);
      }
      openNotificationSuccess("success", "topRight", "Success Notification", "Data of \"" + props.modalObject.title + "\" is Saved");

      // Reset the flag state if necessary
      if (props.flagState) {
        props.setFlagState(false);
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess("error", "topRight", "Error Notification", "Data of \"" + props.modalObject.title + "\" is not Saved Please! try again");
    }
  };

  const options = ["Corporate", "Individual"];



  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [values.NumberOfMap]);

        return (
          <Form>
            <Row>

              <div className="col-md-12">
                <div className="row justify-content-center">
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
                          <th>Fund Name</th>
                          <th>ABN</th>
                          <th>Registered Office</th>
                          <th>Place Of Business</th>
                          <th>Establishment Date</th>
                          <th>Trustee Type</th>
                          <th>Trustee Name</th>
                          <th>ACN</th>
                          {values[`trusteeType`] === "Corporate" &&
                            <th>Bare Trust</th>
                          }
                          <th>Name of Accountant</th>
                        </tr>
                      </thead>
                      <tbody>

                        <tr>
                          <td>1</td>
                          <td>
                            {/* <InputGroup className="mb-3">  */}
                            <Field
                              type="text"
                              placeholder="Fund Name"
                              id={`fundName`}
                              name={`fundName`}
                              className="form-control inputDesignDoubleInput"
                              onChange={(e) => {
                                setFieldValue(e.target.name, validateName(e.target.value))
                              }}
                            />
                          </td>
                          <td>
                            <Field
                              type="number"
                              placeholder="ABN"
                              id={`ABN`}
                              name={`ABN`}
                              className="form-control inputDesignDoubleInput"
                            />
                          </td>
                          <td>
                            <Field
                              type="text"
                              placeholder="Registered Office"
                              id={`registeredOffice`}
                              name={`registeredOffice`}
                              className="form-control inputDesignDoubleInput"
                            />
                          </td>
                          <td>
                            <Field
                              type="text"
                              placeholder="Place Of Business"
                              id={`placeOfBusiness`}
                              name={`placeOfBusiness`}
                              className="form-control inputDesignDoubleInput"
                            />
                          </td>
                          <td>
                            <DatePicker
                              className="form-control inputDesignDoubleInput DateInputPadding shadow"
                              showIcon
                              id={`establishmentDate`}
                              name={`establishmentDate`}
                              selected={values[`establishmentDate`]}
                              onChange={(date) =>
                                setFieldValue(
                                  `establishmentDate`,
                                  date
                                )
                              }
                              dateFormat="dd/MM/yyyy"
                              placeholderText="dd/mm/yyyy"
                              maxDate={new Date()}
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              onBlur={handleBlur}
                              wrapperClassName="w-100"
                            />
                          </td>
                          <td>
                            <InputGroup className="mb-3" style={{ minWidth: "150px" }}>
                              <Field
                                as="select"
                                placeholder="Trustee Type"
                                id={`trusteeType`}
                                name={`trusteeType`}
                                className={`form-select inputDesignDoubleInput ${values[`trusteeType`] === "Corporate" ? "no-right-radius" : ""}`}
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

                              {values[`trusteeType`] === "Corporate" && (
                                <Button
                                  className="btn bgColor modalBtn border-0"
                                  id="button-addon2"
                                  onClick={() =>
                                    handleInnerModal(
                                      "Business as Trusts",
                                      "directorsOfCorporateTrustee",
                                      "directorsOfCorporateTrustee",
                                      values,
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
                              id={`trusteeName`}
                              name={`trusteeName`}
                              className="form-control inputDesignDoubleInput"
                              onChange={(e) => {
                                setFieldValue(e.target.name, validateName(e.target.value))
                              }}
                            />
                          </td>
                          <td>
                            <Field
                              type="number"
                              placeholder="ACN"
                              id={`ACN`}
                              name={`ACN`}
                              className="form-control inputDesignDoubleInput"
                            />
                          </td>
                          {values[`trusteeType`] === "Corporate" &&
                            <td>
                              <DynamicYesNo
                                name={`bareTrust`}
                                values={values}
                                handleChange={handleChange}
                              />
                              {values[`bareTrust`] === "Yes" &&
                                <div className="d-flex justify-content-center mt-2">
                                  <Button className='btn bgColor modalBtn border-0' id="button-addon2" onClick={() => {
                                    if (values[`directorsOfCorporateTrustee`].length > 0) {
                                      handleInnerModal2("Directors of Bare Trust", "directorsOfBareTrust", values[`directorsOfBareTrust`], values)
                                    }
                                    else {
                                      openNotificationSuccess("error", "topRight", "Error Notification", "Please! fill Corporate Directer Names First");
                                    }
                                  }}>
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                  </Button>
                                </div>
                              }
                            </td>
                          }

                          <td>
                            <Field
                              type="text"
                              placeholder="Name of Accountants"
                              id={`nameOfAccountant`}
                              name={`nameOfAccountant`}
                              className="form-control inputDesignDoubleInput"
                              onChange={(e) => {
                                setFieldValue(e.target.name, validateName(e.target.value))
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
              <InnerDirectors setFieldValue={setFieldValue} flagState={flagState1} setFlagState={setFlagState1} modalObject={modalObject}></InnerDirectors>
              <InnerDirectorsOfBareTrust setFieldValue={setFieldValue} flagState={flagState2} setFlagState={setFlagState2} modalObject={modalObject}></InnerDirectorsOfBareTrust>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SmsfDetails;
