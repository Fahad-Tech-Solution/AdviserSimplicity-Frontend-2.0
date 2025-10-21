import { Field, Form, Formik } from "formik";
import React, { useEffect, useState, useMemo } from "react";
import { Button, InputGroup, Modal, Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
  validateName,
} from "../../Assets/Api/Api";
import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
import DynamicYesNo from "../FinancialInvestments/QuestionsDetail/DynamicYesNo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

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

    props.setFieldValue("directorsOfCorporateTrustee", newEntries);

    if (props.flagState) {
      props.setFlagState(false);
    }
  };
  let handleInput = (e, setFieldValue, limit) => {
    const value = e.target.value > limit ? limit : e.target.value;
    setFieldValue(e.target.id, value);
  };

  let innerfillInitialValues = (setFieldValue) => {
    console.log(
      props.modalObject.values,
      props.modalObject.values[`directorsOfCorporateTrustee`]
    );

    setFieldValue(
      "NumberOfDirectors",
      props.modalObject.values[`directorsOfCorporateTrustee`].length > 0
        ? props.modalObject.values[`directorsOfCorporateTrustee`].length
        : ""
    );

    let director =
      props.modalObject.values[`directorsOfCorporateTrustee`] || [];

    director.forEach((element, index) => {
      setFieldValue("directorName" + index, element.directorName);
    });
  };

  return (
    <Modal
      centered
      size={"md"}
      backdrop="static"
      show={props.flagState}
      onHide={() => props.setFlagState(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Directors</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={innerinitialValues}
        onSubmit={handleInnerSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue, handleChange }) => {
          useEffect(() => {
            innerfillInitialValues(setFieldValue);
          }, []);
          return (
            <Form>
              <Modal.Body className="px-4">
                <div className="col-md-12">
                  <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                    <label htmlFor="" className="">
                      How many directors does the Corporate Trustee have :
                    </label>

                    <div
                      style={{
                        width: "40%",
                      }}
                    >
                      <Field
                        type="number"
                        id={`NumberOfDirectors`}
                        name={`NumberOfDirectors`}
                        className="form-control inputDesignDoubleInput"
                        onChange={(e) => handleInput(e, setFieldValue, 6)}
                      />
                    </div>
                  </div>

                  <div className="row justify-content-center">
                    {values.NumberOfDirectors && (
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
                              <th>Director Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.from({
                              length: values.NumberOfDirectors,
                            }).map((_, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  {" "}
                                  <Field
                                    type="text"
                                    placeholder="Director Name"
                                    id={`directorName${index}`}
                                    name={`directorName${index}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(
                                        e.target.name,
                                        validateName(e.target.value)
                                      );
                                    }}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    props.setFlagState(false);
                  }}
                >
                  Close
                </Button>
                <Button type="submit" className="btn bgColor modalBtn">
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
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
    };

    // props.setFieldValue("NumberOfDirectors", parseFloat(values.NumberOfDirectors))
    props.setFieldValue("directorsOfBareTrust", Obj);

    if (props.flagState) {
      props.setFlagState(false);
    }
  };
  let handleInput = (e, setFieldValue, limit) => {
    const value = e.target.value > limit ? limit : e.target.value;
    setFieldValue(e.target.id, value);
  };

  let innerfillInitialValues = (setFieldValue) => {
    console.log(props.modalObject.values);

    if (
      Object.keys(props.modalObject.values[`directorsOfBareTrust`]).length > 0
    ) {
      let Data = props.modalObject.values[`directorsOfBareTrust`] || {};
      setFieldValue("bareTrusteeName", Data.bareTrusteeName);
      setFieldValue("ACN", Data.ACN);

      if (Data.directorNameArray.length > 0) {
        setFieldValue("NumberOfDirectors", Data.directorNameArray.length);
        Data.directorNameArray.forEach((elem, index) => {
          setFieldValue("directorName" + index, elem.directorName);
        });
      }
    }
  };

  return (
    <Modal
      centered
      size={"xl"}
      show={props.flagState}
      backdrop="static"
      onHide={() => props.setFlagState(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Directors Of Bare Trust</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={innerinitialValues}
        onSubmit={handleInnerSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue, handleChange }) => {
          useEffect(() => {
            innerfillInitialValues(setFieldValue);
          }, []);
          return (
            <Form>
              <Modal.Body className="px-4">
                <div className="col-md-12">
                  <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                    <label htmlFor="" className="">
                      How many directors does the bare trust have ?
                    </label>

                    <div
                      style={{
                        width: "5%",
                      }}
                    >
                      <Field
                        type="number"
                        id={`NumberOfDirectors`}
                        name={`NumberOfDirectors`}
                        className="form-control inputDesignDoubleInput"
                        onChange={(e) => handleInput(e, setFieldValue, 6)}
                      />
                    </div>
                  </div>

                  <div className="row justify-content-center">
                    {values.NumberOfDirectors && (
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
                              <th>Bare Trustee Name</th>
                              <th>ACN</th>

                              {Array.from({
                                length: values.NumberOfDirectors,
                              }).map((_, index) => (
                                <th key={index}>Director {index + 1} Name</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>
                                <Field
                                  type="text"
                                  placeholder="Bare Trustee Name"
                                  id={`bareTrusteeName`}
                                  name={`bareTrusteeName`}
                                  className="form-control inputDesignDoubleInput"
                                  onChange={(e) => {
                                    setFieldValue(
                                      e.target.name,
                                      validateName(e.target.value)
                                    );
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
                              {Array.from({
                                length: values.NumberOfDirectors,
                              }).map((_, index) => (
                                <td key={index}>
                                  <Field
                                    as="select"
                                    placeholder="Director Name"
                                    id={`directorName${index}`}
                                    name={`directorName${index}`}
                                    className="form-select inputDesignDoubleInput"
                                  >
                                    <option value="">Select</option>
                                    {props.modalObject.values[
                                      `directorsOfCorporateTrustee`
                                    ].map((elem, i) => {
                                      return (
                                        <option values={elem.directorName}>
                                          {elem.directorName}
                                        </option>
                                      );
                                    })}
                                  </Field>
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    props.setFlagState(false);
                  }}
                >
                  Close
                </Button>
                <Button type="submit" className="btn bgColor modalBtn">
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          );
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
  const AntDTableHOC = DynamicTableForInputsSection("antd");

  let SMSFDetails =
    Object.keys(questionDetail.SMSFDetails).length > 0
      ? questionDetail.SMSFDetails
      : {
          client: [],
          partner: [],
          joint: [],
        }; // Use an empty object as default if SMSFDetails is undefined

  let initialValues = {
    fundName: "qq",
    ABN: "",
    registeredOffice: "",
    placeOfBusiness: "",
    establishmentDate: "",
    trusteeType: "",
    directorsOfCorporateTrustee: [],
    trusteeName: "",
    nameOfAccountant: "",
    ACN: "",
    bareTrust: "No",
    directorsOfBareTrust: {},
  };

  const fillInitialValues = (setFieldValue) => {
    let data = SMSFDetails.SMSFOwner || {};
    console.log(SMSFDetails, "data of SMSFDetails");

    // setFieldValue("owner", data.owner || []);
    // setFieldValue("fundName", data.fundName || "");
    // setFieldValue("ABN", data.ABN || "");
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
    });
    setFlagState1(true);
  };

  let handleInnerModal2 = (title, key, mainKey, values) => {
    setModalObject({
      title,
      key,
      mainKey,
      values,
    });
    setFlagState2(true);
  };

  const columns = [
    {
      title: "No#",
      dataIndex: "owner",
      key: "owner",
      render: (_, __, i) => i + 1,
      width: 60,
    },
    {
      title: "Fund Name",
      dataIndex: "fundName",
      key: "fundName",
      type: "text",
      placeholder: "Fund Name",
      width: 200,
    },
    {
      title: "ABN",
      dataIndex: "ABN",
      key: "ABN",
      type: "number",
      placeholder: "ABN",
      width: 150,
    },
    {
      title: "Registered Office",
      dataIndex: "registeredOffice",
      key: "registeredOffice",
      type: "text",
      placeholder: "Registered Office",
      width: 250,
    },
    {
      title: "Place Of Business",
      dataIndex: "placeOfBusiness",
      key: "placeOfBusiness",
      type: "text",
      placeholder: "Place Of Business",
      width: 220,
    },
    {
      title: "Establishment Date",
      dataIndex: "establishmentDate",
      key: "establishmentDate",
      type: "antdate",
      placeholder: "dd/mm/yyyy",
      width: 170,
    },
    {
      title: "Trustee Type",
      dataIndex: "trusteeType",
      key: "trusteeType",
      type: "selectModal",
      options: ["Corporate", "Individual"].map((v) => ({ label: v, value: v })),
      placeholder: "Trustee Type",
      width: 180,
      ModalOption: ["Corporate", "Individual"], // 👈 add this — triggers modal icon when selected
      innerModalTitle: "Corporate Trustee Details", // optional but recommended
    },
    {
      title: "Trustee Name",
      dataIndex: "trusteeName",
      key: "trusteeName",
      type: "text",
      placeholder: "Trustee Name",
      width: 220,
    },
    {
      title: "ACN",
      dataIndex: "ACN",
      key: "ACN",
      type: "number",
      placeholder: "ACN",
      width: 150,
    },
    {
      title: "Bare Trust",
      dataIndex: "bareTrust",
      key: "bareTrust",
      type: "yesno",
      placeholder: "Bare Trust",
      width: 120,
      // we'll use the AntDHOC to render a Yes/No control or call back to render custom
      // The AntD HOC in your sample already knows how to render various `type` values.
    },
    {
      title: "Name of Accountant",
      dataIndex: "nameOfAccountant",
      key: "nameOfAccountant",
      type: "text",
      placeholder: "Name of Accountant",
      width: 220,
    },
  ];

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
        res = await PostAxios(`${DefaultUrl}/api/SMSFDetails/Add`, obj);
      } else {
        obj._id = SMSFDetails._id;
        res = await PatchAxios(`${DefaultUrl}/api/SMSFDetails/Update`, obj);
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, SMSFDetails: res };
        setQuestionDetail(updatedData);
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

        const tableData = useMemo(() => {
          const rows = [];
          console.log(values, "values of SMSFDetails");

 
            rows.push({
              key: "client",
              // stakeHolder: "client",
              owner: RenderName("client"),
              ...values,
            });
        

       

          return rows;
        }, [values]);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="mt-4 All_Client reportSection">
                    <AntDTableHOC
                      columns={columns}
                      data={tableData}
                      values={values}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </div>
                </div>
              </div>
              <InnerDirectors
                setFieldValue={setFieldValue}
                flagState={flagState1}
                setFlagState={setFlagState1}
                modalObject={modalObject}
              ></InnerDirectors>
              <InnerDirectorsOfBareTrust
                setFieldValue={setFieldValue}
                flagState={flagState2}
                setFlagState={setFlagState2}
                modalObject={modalObject}
              ></InnerDirectorsOfBareTrust>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SmsfDetails;
