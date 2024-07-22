import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, InputGroup, Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { PatchAxios, PostAxios } from "../../Assets/Api/Api";
// import Select from "react-select";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
import PortfolioValue from "../FinancialInvestments/QuestionsDetail/PortfolioValue";
import DynamicYesNo from "../FinancialInvestments/QuestionsDetail/DynamicYesNo";
import MemberNumber from "../FinancialInvestments/QuestionsDetail/MemberNumber";
import GroupInsurance from "../FinancialInvestments/QuestionsDetail/GroupInsurance";
import Contributions from "../FinancialInvestments/QuestionsDetail/Contributions";
import Beneficiaries from "../FinancialInvestments/QuestionsDetail/Beneficiaries";

const LifeTimeBeneFits = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let incomeFromSuperPayment = questionDetail.incomeFromSuperPayment || {
    client: [],
    partner: [],
    joint: [],
  }; // Use an empty object as default if incomeFromSuperPayment is undefined

  let initialValues = incomeFromSuperPayment[props.modalObject.Input].length
    ? { NumberOfMap: incomeFromSuperPayment[props.modalObject.Input].length }
    : { NumberOfMap: "" };

  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
    if (
      incomeFromSuperPayment[props.modalObject.Input] &&
      incomeFromSuperPayment[props.modalObject.Input].length
    ) {
      let arr = [];

      for (
        let i = 0;
        i < incomeFromSuperPayment[props.modalObject.Input].length;
        i++
      ) {
        arr.push("");
      }

      setDynamicFields(arr);
    }
  }, []);

  const fillInitialValues = (setFieldValue) => {
    if (
      incomeFromSuperPayment[props.modalObject.Input] &&
      incomeFromSuperPayment[props.modalObject.Input].length
    ) {
      incomeFromSuperPayment[props.modalObject.Input].forEach((data, i) => {
        if (data) {
          setFieldValue(`fundName${i}`, data.fundName || "");
          setFieldValue(`incomePA${i}`, data.incomePA || "");
          setFieldValue(
            `centreLinkDeductibleAmount${i}`,
            data.centreLinkDeductibleAmount || ""
          );
          setFieldValue(
            `pensionTaxFee${i}`,
            data.pensionTaxFee || ""
          );
          setFieldValue(`centrelinkcards${i}`, data.centrelinkcards || "");
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
          incomePA: values[`incomePA${i}`] || "",
        fundName: values[`fundName${i}`] || "",
        centreLinkDeductibleAmount: values[`centreLinkDeductibleAmount${i}`] || "",
        pensionTaxFee: values[`pensionTaxFee${i}`] || "",
        // centrelinkcards: values[`centrelinkcards${i}`] || "",
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
      (total, entry) => total + entry.centreLinkDeductibleAmount,
      0
    );

    console.log(obj, "final obj");

    // Check if incomeFromSuperPayment and the array at props.modalObject.Input exist
    // const bankAccountArray = incomeFromSuperPayment[props.modalObject.Input] || [];
    const bankAccountArray = incomeFromSuperPayment.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/incomeFromSuperPayment/Add`,
          obj
        );
      } else {
        obj.collection = props.modalObject.Input;
        res = await PatchAxios(
          `${DefaultUrl}/api/incomeFromSuperPayment/Update`,
          obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, incomeFromSuperPayment: res };
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

  const options = [
    "ESS Super ",
    "PSS ",
    "CSC",
    "Uni Super ",
    "Telstra ",
    "Other",
  ];
  const options2 = [
    "Pensioner Card ",
    "Low Income Card ",
    "Commonwealth Seniors Card",
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);

  //   const options2 = [
  //     { value: 'Pensioner Card', label: 'Pensioner Card' },
  //     { value: 'Low Income Card', label: 'Low Income Card' },
  //     { value: 'Commonwealth Seniors Card', label: 'Commonwealth Seniors Card' },
  //     // Add more options as needed
  //   ];
  const handleChange1 = (selected) => {
    setSelectedOptions(selected);
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
                {modalObject.key === "pensionTaxFee" ? (
                  <PortfolioValue />
                ) : modalObject.key === "memberArray" ? (
                  <MemberNumber />
                ) : modalObject.key === "groupInsuranceArray" ? (
                  <GroupInsurance />
                ) : modalObject.key === "ContributionsArray" ? (
                  <Contributions />
                ) : modalObject.key === "beneficiariesArray" ? (
                  <Beneficiaries />
                ) : (
                  ""
                )}
              </InnerModal>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="col-md-5">
                    <p className="text-end mt-1">
                      How many {props.modalObject.title} does {props.modalObject.Input} have:
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
                            <th>Regular Income p.a </th>
                            <th>Centrelink Deductible Amount</th>
                            <th>Is Pension Tax Fee</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dynamicFields.map((elem, i) => {
                            return (
                              <tr key={i}>
                                <td>{1 + i}</td>
                                <td>
                                  <Field
                                    as="select"
                                    placeholder="Fund Name"
                                    id={`fundName${i}`}
                                    name={`fundName${i}`}
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
                                  {" "}
                                  <Field
                                    type="number"
                                    placeholder="Income p.a"
                                    id={`incomePA${i}`}
                                    name={`incomePA${i}`}
                                    className="form-control inputDesign"
                                  />
                                </td>
                                <td>
                                  {/* <InputGroup className="mb-3"> */}
                                  <Field
                                    type="number"
                                    placeholder="Centrelink Deductible Amount"
                                    id={`centreLinkDeductibleAmount${i}`}
                                    name={`centreLinkDeductibleAmount${i}`}
                                    className="form-control inputDesign"
                                  />
                                  {/* <Button
                                      className="btn bgColor modalBtn border-0"
                                      id="button-addon2"
                                      onClick={() => {
                                        handleInnerModal(
                                          "Member Number & Details",
                                          "How many Member Number & Details do you have ?",
                                          "memberArray",
                                          "incomePA",
                                          "totalPortfolioCost",
                                          values[`memberArray${i}`],
                                          i,
                                          values
                                        );
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faArrowUpRightFromSquare}
                                      />
                                    </Button>
                                  </InputGroup> */}
                                </td>
                                <td>
                                  {/* <InputGroup className="mb-3"> */}
                                  <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                                    <DynamicYesNo
                                      name={`pensionTaxFee${i}`}
                                      values={values}
                                      handleChange={handleChange}
                                    />
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

export default LifeTimeBeneFits;
