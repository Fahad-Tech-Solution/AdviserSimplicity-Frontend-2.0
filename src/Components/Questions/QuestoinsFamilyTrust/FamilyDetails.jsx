import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, InputGroup, Modal, Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { PatchAxios, PostAxios } from "../../Assets/Api/Api";
import DatePicker from "react-datepicker"; import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
;




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


const FamilyDetails = (props) => {
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

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let familyDetails = Object.keys(questionDetail.familyDetails).length > 0 ? questionDetail.familyDetails : {
    client: [],
    partner: [],
    joint: [],

  }; // Use an empty object as default if familyDetails is undefined

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

  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
    if (
      familyDetails[props.modalObject.Input] &&
      familyDetails[props.modalObject.Input].length
    ) {
      let arr = [];

      for (
        let i = 0;
        i < familyDetails[props.modalObject.Input].length;
        i++
      ) {
        arr.push("");
      }

      setDynamicFields(arr);
    }
  }, []);

  const fillInitialValues = (setFieldValue) => {
    if (
      familyDetails[props.modalObject.Input] &&
      familyDetails[props.modalObject.Input].length
    ) {
      familyDetails[props.modalObject.Input].forEach((data, i) => {
        if (data) {
          setFieldValue(`trustName`, data.trustName || "");
          setFieldValue(`trustType`, data.trustType || "");
          setFieldValue(`ABN`, data.ABN || "");
          setFieldValue(`Address`, data.Address || "");
          setFieldValue(`establishmentDate`, data.establishmentDate || "");
          setFieldValue(`trusteeType`, data.trusteeType || "");
          setFieldValue(`trusteeName`, data.trusteeName || "");
          setFieldValue(`noOfAccountant`, data.noOfAccountant || "");
          setFieldValue(`accountantsFee`, data.accountantsFee || "");
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
        trustName: values[`trustName`] || "",
        trustType: values[`trustType`] || "",
        ABN: values[`ABN`] || "",
        Address: values[`Address`] || "",
        establishmentDate: values[`establishmentDate`] || "",
        trusteeType: values[`trusteeType`] || "",
        trusteeName: values[`trusteeName`] || "",
        noOfAccountant: values[`noOfAccountant`] || "",
        accountantsFee: values[`accountantsFee`] || "",
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
      (total, entry) => total + entry.accountantsFee,
      0
    );

    console.log(obj, "final obj");

    // Check if familyDetails and the array at props.modalObject.Input exist
    // const bankAccountArray = familyDetails[props.modalObject.Input] || [];
    const bankAccountArray = familyDetails.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/familyDetails/Add`,
          obj
        );
      } else {
        obj.collection = props.modalObject.Input;
        res = await PatchAxios(
          `${DefaultUrl}/api/familyDetails/Update`,
          obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, familyDetails: res };
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

  const options = ["Corporate",
    "Individual"
  ];

  let handleInnerModal = (title, key, mainKey, values) => {
    setModalObject({
      title,
      key,
      mainKey,
      values,
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
                          <th>Trust Name</th>
                          <th>Trust Type</th>
                          <th>ABN</th>
                          <th>Fund Address</th>
                          <th>Establishment Date</th>
                          <th>Trustee Type</th>
                          <th>Trustee Name</th>
                          <th>Name of Accountant</th>

                        </tr>
                      </thead>
                      <tbody>
                        <tr >
                          <td>1</td>
                          <td>
                            {/* <InputGroup className="mb-3">  */}
                            <Field
                              type="text"
                              placeholder="Trust Name"
                              id={`trustName`}
                              name={`trustName`}
                              className="form-control inputDesignDoubleInput"
                            />


                          </td>
                          <td>
                            <Field
                              as="select"
                              placeholder="Trustee Type"
                              id={`trustType`}
                              name={`trustType`}
                              className="form-select inputDesignDoubleInput"
                            >
                              <option value={""}>Please Select</option>
                              <option value={"Discretionary"}>Discretionary</option>
                              <option value={"Other"}>Other</option>
                            </Field>

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
                              placeholder="Address"
                              id={`Address`}
                              name={`Address`}
                              className="form-control inputDesignDoubleInput"
                            />
                          </td>
                          <td>
                            <DatePicker
                              className="form-control inputDesignDoubleInput shadow DateInputPadding"
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
                              placeholder="Trustee Name  "
                              id={`trusteeName`}
                              name={`trusteeName`}
                              className="form-control inputDesignDoubleInput"
                            />
                          </td>
                          <td>
                            <Field
                              type="text"
                              placeholder="Number of Accountants Name  "
                              id={`noOfAccountant`}
                              name={`noOfAccountant`}
                              className="form-control inputDesignDoubleInput"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </Table>

                    <InnerDirectors setFieldValue={setFieldValue} flagState={flagState} setFlagState={setFlagState} modalObject={modalObject}></InnerDirectors>

                  </div>
                </div>
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FamilyDetails;
