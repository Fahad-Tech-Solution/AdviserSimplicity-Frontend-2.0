import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, InputGroup, Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { PatchAxios, PostAxios } from "../../Assets/Api/Api";
import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
import DynamicYesNo from "../FinancialInvestments/QuestionsDetail/DynamicYesNo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
// import PortfolioValue from "./fundName";
// import fundName from "./fundName";
// import SuperFunds from "./SuperFunds";
// import CenterLinkPayments from "./CenterLinkPayments";
// import fundName from "./fundName";
// import Select from "react-select";

const SmsfDetails = (props) => {
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

  let SMSFDetails = questionDetail.SMSFDetails || {
    client: [],
    partner: [],
    joint: [],
  }; // Use an empty object as default if SMSFDetails is undefined

  let initialValues = SMSFDetails[props.modalObject.Input].length
    ? { NumberOfMap: SMSFDetails[props.modalObject.Input].length }
    : { NumberOfMap: "" };

  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
    if (
      SMSFDetails[props.modalObject.Input] &&
      SMSFDetails[props.modalObject.Input].length
    ) {
      let arr = [];

      for (
        let i = 0;
        i < SMSFDetails[props.modalObject.Input].length;
        i++
      ) {
        arr.push("");
      }

      setDynamicFields(arr);
    }
  }, []);

  const fillInitialValues = (setFieldValue) => {
    if (
      SMSFDetails[props.modalObject.Input] &&
      SMSFDetails[props.modalObject.Input].length
    ) {
      SMSFDetails[props.modalObject.Input].forEach((data, i) => {
        if (data) {
          setFieldValue(`fundName${i}`, data.fundName || "");
          setFieldValue(`aBN${i}`, data.aBN || "");
          setFieldValue(`Address${i}`, data.Address || "");
          setFieldValue(`pensionType${i}`, data.pensionType || "");
          setFieldValue(`trusteeType${i}`, data.trusteeType || "");
          setFieldValue(`trusteeName${i}`, data.trusteeName || "");
          setFieldValue(`noOfAccountant${i}`, data.noOfAccountant || "");
          setFieldValue(`fundAndAuditFee${i}`, data.fundAndAuditFee || "");
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

  let handleInnerModal = (
    title,
    question,
    key,
    mainKey,
    key3,
    editArray,
    index,
    values
  ) => {
    console.log(values);
    setModalObject({
      title,
      question,
      key,
      mainKey,
      key3,
      editArray: editArray || [],
      index,
      values,
    });
    setFlagState(true);
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
        fundName: values[`fundName${i}`] || "",
        aBN: values[`aBN${i}`] || "",
        Address: values[`Address${i}`] || "",
        pensionType: values[`pensionType${i}`] || "",
        trusteeType: values[`trusteeType${i}`] || "",
        trusteeName: values[`trusteeName${i}`] || "",
        noOfAccountant: values[`noOfAccountant${i}`] || "",
        fundAndAuditFee: values[`fundAndAuditFee${i}`] || "",
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
      (total, entry) => total + entry.fundAndAuditFee,
      0
    );

    console.log(obj, "final obj");

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
        obj.collection = props.modalObject.Input;
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

      // Reset the flag state if necessary
      if (props.flagState) {
        props.setFlagState(false);
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
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
                  <div className="col-md-5">
                    <p className="text-end mt-1">
                      How many {props.modalObject.title} does{" "}
                      {nameSet} have:
                    </p>
                  </div>
                  <div className="col-md-2">
                    <Field
                      type="number"
                      id="NumberOfMap"
                      name="NumberOfMap"
                      className="form-control inputDesign"
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
                            <th>Fund Name</th>
                            <th>ABN</th>
                            <th>Fund  Address</th>
                            <th>Establishment Date</th>
                            <th>Trustee Type</th>
                            <th>Trustee Name</th>
                            <th>Name of Accountant</th>
                            <th>Fund and Audit Fees</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dynamicFields.map((elem, i) => {
                            return (
                              <tr key={i}>
                                <td>{1 + i}</td>
                                <td>
                                  {/* <InputGroup className="mb-3">  */}
                                  <Field
                                    type="text"
                                    placeholder="Fund Name  "
                                    id={`fundName${i}`}
                                    name={`fundName${i}`}
                                    className="form-control inputDesign"
                                  />

                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="ABN"
                                    id={`aBN${i}`}
                                    name={`aBN${i}`}
                                    className="form-control inputDesign"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Address"
                                    id={`Address${i}`}
                                    name={`Address${i}`}
                                    className="form-control inputDesign"
                                  />
                                </td>
                                <td>
                                  <DatePicker
                                    className="form-control inputDesign shadow"
                                    showIcon
                                    id={`pensionType${i}`}
                                    name={`pensionType${i}`}
                                    selected={values[`pensionType${i}`]}
                                    onChange={(date) =>
                                      setFieldValue(
                                        `pensionType${i}`,
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
                                  <Field
                                    as="select"
                                    placeholder="Trustee Type"
                                    id={`trusteeType${i}`}
                                    name={`trusteeType${i}`}
                                    className="form-select inputDesign"
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
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Trustee Name  "
                                    id={`trusteeName${i}`}
                                    name={`trusteeName${i}`}
                                    className="form-control inputDesign"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Number of Accountants Name  "
                                    id={`noOfAccountant${i}`}
                                    name={`noOfAccountant${i}`}
                                    className="form-control inputDesign"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="Fund and Audit Fees"
                                    id={`fundAndAuditFee${i}`}
                                    name={`fundAndAuditFee${i}`}
                                    className="form-control inputDesign"
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

export default SmsfDetails;
