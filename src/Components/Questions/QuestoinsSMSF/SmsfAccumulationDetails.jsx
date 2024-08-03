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
// import PortfolioValue from "./accumulationBenefits";
// import accumulationBenefits from "./accumulationBenefits";
// import SuperFunds from "./SuperFunds";
// import CenterLinkPayments from "./CenterLinkPayments";
// import accumulationBenefits from "./accumulationBenefits";
import Beneficiaries from "../FinancialInvestments/QuestionsDetail/Beneficiaries";
import AccumulationBenefits from "./AccumulationBenefits";
import Contributions from "../FinancialInvestments/QuestionsDetail/Contributions";
// import Contributions from "./Contributuions";
// import Beneficiaries from "./Beneficiaries";
// import Select from "react-select";

const SmsfAccumulationDetails = (props) => {
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

  let SMSFAccumulationDetails = questionDetail.SMSFAccumulationDetails || {
    client: [],
    partner: [],
    joint: [],
  }; // Use an empty object as default if SMSFAccumulationDetails is undefined

  let initialValues = SMSFAccumulationDetails[props.modalObject.Input].length
    ? { NumberOfMap: SMSFAccumulationDetails[props.modalObject.Input].length }
    : { NumberOfMap: "" };

  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
    if (
      SMSFAccumulationDetails[props.modalObject.Input] &&
      SMSFAccumulationDetails[props.modalObject.Input].length
    ) {
      let arr = [];

      for (
        let i = 0;
        i < SMSFAccumulationDetails[props.modalObject.Input].length;
        i++
      ) {
        arr.push("");
      }

      setDynamicFields(arr);
    }
  }, []);

  const fillInitialValues = (setFieldValue) => {
    if (
      SMSFAccumulationDetails[props.modalObject.Input] &&
      SMSFAccumulationDetails[props.modalObject.Input].length
    ) {
      SMSFAccumulationDetails[props.modalObject.Input].forEach((data, i) => {
        if (data) {
          setFieldValue(`accumulationBenefits${i}`, data.accumulationBenefits || "");
          setFieldValue(`accumulationBenefitsarray${i}`, data.accumulationBenefitsarray || "");
          setFieldValue(`contributions${i}`, data.contributions || "");
          setFieldValue(`contributionsArray${i}`, data.contributionsArray || "");
          setFieldValue(`nominatedBeneficiaries${i}`, data.nominatedBeneficiaries || "");
          setFieldValue(`beneficiariesArray${i}`, data.beneficiariesArray || "");
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
        accumulationBenefits: values[`accumulationBenefits${i}`] || "",
        accumulationBenefitsarray: values[`accumulationBenefitsarray${i}`] || "",
        contributions: values[`contributions${i}`] || "",
        contributionsArray: values[`contributionsArray${i}`] || "",
        nominatedBeneficiaries: values[`nominatedBeneficiaries${i}`] || "",
        beneficiariesArray: values[`beneficiariesArray${i}`] || "",
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
      (total, entry) => total + entry.accumulationBenefits,
      0
    );

    console.log(obj, "final obj");

    // Check if SMSFAccumulationDetails and the array at props.modalObject.Input exist
    // const bankAccountArray = SMSFAccumulationDetails[props.modalObject.Input] || [];
    const bankAccountArray = SMSFAccumulationDetails.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(`${DefaultUrl}/api/SMSFAccumulationDetails/Add`, obj);
      } else {
        obj.collection = props.modalObject.Input;
        res = await PatchAxios(
          `${DefaultUrl}/api/SMSFAccumulationDetails/Update`,
          obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, SMSFAccumulationDetails: res };
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
              <InnerModal
                modalObject={modalObject}
                setFieldValue={setFieldValue}
                setFlagState={setFlagState}
                flagState={flagState}
              >
                {modalObject.key === "accumulationBenefitsarray" ?
                  <AccumulationBenefits />
                  :
                  modalObject.key === "contributionsArray" ?
                    <Contributions />
                    :
                    modalObject.key === "beneficiariesArray" ?
                      <Beneficiaries />
                      :
                      ""
                }
              </InnerModal>
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
                            <th>Accumulation Benefits</th>
                            <th>Contributions</th>
                            <th>Nominated Beneficiaries</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dynamicFields.map((elem, i) => {
                            return (
                              <tr key={i}>
                                <td>{1 + i}</td>
                                <td>
                                  <InputGroup className="mb-3">
                                    <Field
                                      type="number"
                                      placeholder="Accumulation Benefits"
                                      id={`accumulationBenefits${i}`}
                                      name={`accumulationBenefits${i}`}
                                      className="form-control inputDesign"
                                    />
                                    <Button
                                      className="btn bgColor modalBtn border-0"
                                      id="button-addon2"
                                      onClick={() => {
                                        handleInnerModal(
                                          "Accumulations Benefits", //title 
                                          `How many Accumulations Benefits do ${nameSet} have?`, //Question
                                          "accumulationBenefitsarray", //key
                                          "accumulationBenefits", //mainKey
                                          "totalPortfolioCost", // key3
                                          values[`accumulationBenefitsarray${i}`], //editarray
                                          i, //index
                                          values // all form Values
                                        );
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faArrowUpRightFromSquare}
                                      />
                                    </Button>
                                  </InputGroup>
                                </td>


                                <td>
                                  <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                                    <DynamicYesNo
                                      name={`contributions${i}`}
                                      values={values}
                                      handleChange={handleChange}
                                    />
                                    {values[`contributions${i}`] ===
                                      "Yes" && (
                                        <Button
                                          className="btn bgColor modalBtn border-0"
                                          id="button-addon2"
                                          onClick={() => {
                                            handleInnerModal(
                                              "Contributions",
                                              `How many financial years to ${nameSet} want to display?`,
                                              "contributionsArray",
                                              "",
                                              "",
                                              values[`contributionsArray${i}`],
                                              i
                                            );
                                          }}
                                        >
                                          <FontAwesomeIcon
                                            icon={faArrowUpRightFromSquare}
                                          />
                                        </Button>
                                      )}
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                                    <DynamicYesNo
                                      name={`nominatedBeneficiaries${i}`}
                                      values={values}
                                      handleChange={handleChange}
                                    />
                                    {values[`nominatedBeneficiaries${i}`] ===
                                      "Yes" && (
                                        <Button
                                          className="btn bgColor modalBtn border-0"
                                          id="button-addon2"
                                          onClick={() => {
                                            handleInnerModal(
                                              "Beneficiaries",
                                              `How many beneficiaries do ${nameSet} have?`,
                                              "beneficiariesArray",
                                              "",
                                              "",
                                              values[`beneficiariesArray${i}`],
                                              i
                                            );
                                          }}
                                        >
                                          <FontAwesomeIcon
                                            icon={faArrowUpRightFromSquare}
                                          />
                                        </Button>
                                      )}
                                  </div>
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

export default SmsfAccumulationDetails;
