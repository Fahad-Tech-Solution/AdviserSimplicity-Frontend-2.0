import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Card, InputGroup } from "react-bootstrap";
import { defaultUrl, RiskQuestion } from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  GetAxios,
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
} from "../Assets/Api/Api";
import { ErrorMessage, Field, Form, Formik } from "formik";

import InnerModal from "../Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import RiskGoalForm from "./RiskGoalForm";

import single from "../Svgs/single-2.svg";
import couple from "../Svgs/couple-2.svg";
import { content } from "../../Content/Content";
import parse from "html-react-parser";
import { FiPlus } from "react-icons/fi";
import DynamicDescription from "../Questions/EstatePlanning/DynamicDescription";
import RiskTermsAndConditions from "./RiskTermsAndConditions";
import RechartsPieChart from "./RechartsPieChart";

const RiskProfileCards = (props) => {
  let [riskQuestion, setRiskQuestion] = useRecoilState(RiskQuestion);
  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  const {
    setFieldValue,
    values,
    handleChange,
    confirmFlag,
    setConfirmFlag,
    setValues,
  } = props.Obj;
  const { question, key, imgUrl } = props.QuestionProps;
  const { choices = [] } = props.QuestionProps;

  let { RiskGoals } = content;

  let initialValues = {
    client: {
      question1: 1,
      question2: 1,
      question3: 1,
      question4: 1,
      question5: 1,
      question6: 1,
      question7: 1,
      question8: 1,
      riskGoal: "Conservative",
      riskDescription: "",
      happyWithResult: false,
      confirmRiskProfileCheck1: false,
      confirmRiskProfileCheck2: false,
      confirmRiskProfileCheck3: false,
      addNoteDescription: "",
    },
    partner: {
      question1: 1,
      question2: 1,
      question3: 1,
      question4: 1,
      question5: 1,
      question6: 1,
      question7: 1,
      question8: 1,
      riskGoal: "Conservative",
      riskDescription: "",
      happyWithResult: false,
      confirmRiskProfileCheck1: false,
      confirmRiskProfileCheck2: false,
      confirmRiskProfileCheck3: false,
      addNoteDescription: "",
    },
    joinedProfile: "No",
    currentQuestion: "5",
  };

  let OpenModal = (title, values, innerKey, stackHolder, key) => {
    // alert(title + " ++ " + Input);
    setModalObject({
      title,
      values,
      innerKey,
      stackHolder,
      key,
    });
    setFlagState(true);
  };

  let SelectedDiscription = (selectedValue) => {
    const currentIndex = RiskGoals.findIndex((q) => q.value === selectedValue);
    // console.log(currentIndex, selectedValue, RiskGoals[currentIndex].des)
    // if (currentIndex) {
    let { des } = RiskGoals[currentIndex] || "";
    return parse(des || "");
    // }
  };

  return (
    <div className="container-fluid pt-3" style={{ marginTop: "-100px" }}>
      <div className="row px-0 m-0 ">
        {/*  modal */}
        <InnerModal
          modalObject={modalObject}
          setFieldValue={setFieldValue}
          setFlagState={setFlagState}
          flagState={flagState}
        >
          {modalObject.title == "Risk Goals" ? (
            <RiskGoalForm />
          ) : modalObject.title == "Add Note" ? (
            <DynamicDescription />
          ) : modalObject.title == "Terms and Conditions" ? (
            <RiskTermsAndConditions />
          ) : (
            ""
          )}
        </InnerModal>
        {/*  modal */}

        <div className="row justify-content-center align-items-stretch">
          <div className="col-md-6 my-3">
            <Card
              className="py-4 shadow borderOverAll d-flex"
              style={{ borderRadius: "20px", height: "100%" }}
            >
              <h5
                className="text-center"
                onClick={() => {
                  console.log(riskQuestion);
                }}
              >
                Client
                <div className="iconContainerLg m-0 p-0">
                  <img src={single} alt="single svg" className="w-50" />
                </div>
              </h5>

              <div
                className="d-flex justify-content-center align-items-stretch w-100"
                style={{ minHeight: "30vh" }}
              >
                <RechartsPieChart
                  data={[30, 20, 60, 15, 15, 15]}
                  title={values.client.riskGoal}
                />
              </div>

              <div className="row justify-content-center align-items-center my-2">
                <div className="col-12 p-0 ">
                  <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                    <label className=" d-block text-end" htmlFor={"client"}>
                      {" "}
                      {localStorage.getItem("UserName") || "Client"}{" "}
                    </label>
                    <label
                      className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                      onClick={() => {
                        OpenModal("Risk Goals", values, "client");
                      }}
                    >
                      <div>
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <Field
                  id="ClientData"
                  name={"client.riskGoal"}
                  disabled
                  className="form-control inputDesign text-center"
                />{" "}
              </div>

              <div className="row justify-content-center align-items-center my-2">
                <div className="col-12 text-center">
                  {SelectedDiscription(values.client.riskGoal)}
                </div>
              </div>

              {/* <div className='col-md-12 text-center d-flex justify-content-center' style={{ marginTop: "auto" }}>
                                <InputGroup className='cardInputGroup'>
                                    <Button className='btn bgColor modalBtn border-0' id="button-addon2"
                                        onClick={() => { OpenModal("Add Note", values, "client", "client.", "addNoteDescription",) }}
                                    >
                                        <FiPlus />
                                    </Button>
                                    <Field id="ClientData" name={"client.addNoteDescription"} className="form-control  inputDesignDoubleInput text-center" placeholder={"Add Note"} />
                                </InputGroup>
                            </div> */}
              <div className="col-md-12 text-center mt-2">
                <Field
                  type="checkbox"
                  id="ClienthappyWithResult"
                  checked={values.client.happyWithResult}
                  values={false}
                  name={"client.happyWithResult"}
                  className="form-check-input newCheck"
                  onChange={(e) => {
                    const updatedValue = !values.client.happyWithResult;

                    // Batch all the field updates
                    setValues({
                      ...values,
                      client: {
                        ...values.client,
                        happyWithResult: updatedValue,
                        confirmRiskProfileCheck1: updatedValue,
                        confirmRiskProfileCheck2: updatedValue,
                        confirmRiskProfileCheck3: updatedValue,
                      },
                    });
                  }}
                />
                <div className="d-inline-block ms-2">
                  <label htmlFor="ClienthappyWithResult">
                    Please confirm that you are happy with the risk result{" "}
                  </label>
                </div>

                <ErrorMessage
                  component={"div"}
                  className="text-danger"
                  name="client.happyWithResult"
                />
              </div>

              <div className="col-md-12 text-center mt-2">
                <div className="d-inline-block ms-2 text-muted">
                  <a
                    href="#"
                    className="text-reset"
                    onClick={(e) =>
                      OpenModal(
                        "Terms and Conditions",
                        values,
                        "client",
                        "client"
                      )
                    }
                  >
                    Terms & Conditions
                  </a>
                </div>
              </div>

              <div className="col-md-12 text-center mt-2">
                <button
                  type="button"
                  className="btn bgColor modalBtn w-75 cardInputGroup"
                  onClick={() => {
                    setConfirmFlag((prev) => {
                      return {
                        ...prev,
                        client: !confirmFlag.client,
                      };
                    });
                  }}
                >
                  {confirmFlag.client ? "Confirmed" : "Confirm"}
                </button>
              </div>
            </Card>
          </div>
          {values.joinedProfile === "No" && (
            <div className="col-md-6 my-3">
              <Card
                className="py-4 shadow borderOverAll d-flex"
                style={{ borderRadius: "20px", height: "100%" }}
              >
                <h5
                  className="text-center"
                  onClick={() => {
                    console.log(riskQuestion);
                  }}
                >
                  Partner
                  <div className="iconContainerLg">
                    <img src={couple} alt="single svg" className="w-50 " />
                  </div>
                </h5>
                {/*
                                                        <div className="d-flex justify-content-center align-items-stretch w-100" style={{ minHeight: "30vh" }}>
                                                        <ApexChart data={[30, 20, 60, 15, 15, 10]} title={values.riskGoal.partner} />
                                                        </div>
                                                        */}
                <div
                  className="d-flex justify-content-center align-items-stretch w-100"
                  style={{ minHeight: "30vh" }}
                >
                  <RechartsPieChart
                    data={[30, 20, 60, 15, 15, 10]}
                    title={values.partner.riskGoal}
                  />
                </div>
                <div className="row justify-content-center align-items-center my-2">
                  <div className="col-12 p-0 ">
                    <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                      <label className=" d-block text-end" htmlFor={"partner"}>
                        {localStorage.getItem("PartnerName") || "Partner"}
                      </label>
                      <label
                        className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                        onClick={() => {
                          OpenModal("Risk Goals", values, "partner");
                        }}
                      >
                        <div>
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <Field
                    id="partnerData"
                    name={"partner.riskGoal"}
                    disabled
                    className="form-control inputDesign text-center"
                  />
                </div>
                <div className="row justify-content-center align-items-center my-2">
                  <div className="col-12 text-center">
                    {SelectedDiscription(values.partner.riskGoal)}
                  </div>
                </div>

                {/* <div className='col-md-12 text-center d-flex justify-content-center' style={{ marginTop: "auto" }}>
                                    <InputGroup className='cardInputGroup'>
                                        <Button className='btn bgColor modalBtn border-0' id="button-addon2"
                                            onClick={() => { OpenModal("Add Note", values, "partner", "partner.", "addNoteDescription",) }}
                                        >
                                            <FiPlus />
                                        </Button>
                                        <Field id="PartnerData" name={"partner.addNoteDescription"} className="form-control inputDesignDoubleInput text-center" placeholder={"Add Note"} />
                                    </InputGroup>
                                </div> */}
                <div className="col-md-12 text-center  mt-2">
                  <Field
                    type="checkbox"
                    id="partnerhappyWithResult"
                    checked={values.partner.happyWithResult}
                    values={false}
                    onChange={(e) => {
                      const updatedValue = !values.partner.happyWithResult;

                      // Batch all the field updates
                      setValues({
                        ...values,
                        partner: {
                          ...values.partner,
                          happyWithResult: updatedValue,
                          confirmRiskProfileCheck1: updatedValue,
                          confirmRiskProfileCheck2: updatedValue,
                          confirmRiskProfileCheck3: updatedValue,
                        },
                      });
                    }}
                    name={"partner.happyWithResult"}
                    className="form-check-input newCheck"
                  />
                  <div className="d-inline-block ms-2">
                    <label htmlFor="partnerhappyWithResult">
                      Please confirm that you are happy with the risk result{" "}
                    </label>
                  </div>

                  <ErrorMessage
                    component={"div"}
                    className="text-danger"
                    name="partner.happyWithResult"
                  />
                </div>
                <div className="col-md-12 text-center mt-2">
                  <div className="d-inline-block ms-2 text-muted">
                    <a
                      href="#"
                      className="text-reset"
                      onClick={(e) =>
                        OpenModal(
                          "Terms and Conditions",
                          values,
                          "partner",
                          "partner"
                        )
                      }
                    >
                      Terms & Conditions
                    </a>
                  </div>
                </div>

                <div className="col-md-12 text-center mt-2">
                  <button
                    type="button"
                    className="btn bgColor modalBtn w-75 cardInputGroup"
                    onClick={() => {
                      setConfirmFlag((prev) => {
                        return {
                          ...prev,
                          partner: !confirmFlag.partner,
                        };
                      });
                    }}
                  >
                    {confirmFlag.partner ? "Confirmed" : "Confirm"}
                  </button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskProfileCards;
