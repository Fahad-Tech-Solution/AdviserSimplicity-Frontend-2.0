import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Questions_People from "../svgs/Questions_People.png";
import Questions_loan from "../svgs/loan.svg";
import Questions_Bank from "../svgs/property-value.svg";
import QuestionMoney from "../svgs/QuestionMoney.jpg";

import { useRecoilState } from "recoil";
import { QuestionShift, CRState, StepState } from "../../../Store/Store";

import { NavLink, useNavigate } from "react-router-dom";

const QuestionsInvestmentTrust = (props) => {
  let [CRObject, setCRObject] = useRecoilState(CRState);
  let [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);
  let [Steps, setSteps] = useRecoilState(StepState);

  let Navigation = useNavigate();

  let onSubmit = (values) => {


    if (props.flagState) {
      props.setFlagState(false);
    }


    setCRObject(values);
    localStorage.setItem("QuestionsState", JSON.stringify(values));
    props.setQuestionChange(false);
    // setQuestionChange("QuestionCards");
    // localStorage.setItem("Question", "QuestionCards");
    

    // setSteps(2);
    // localStorage.setItem("Steps", 2);
    // setCRObject(values);
    // localStorage.setItem("QuestionsState", JSON.stringify(values));
    // Navigation("/Business-Tax-Structure");
    // localStorage.removeItem("Question");
  };

  return (
    <div className="container-fluid my-4">
      <div className="row m-0">
        <Formik
          initialValues={CRObject}
          onSubmit={onSubmit}
          enableReinitialize
          innerRef={props.formRef}
        >
          {({ values, handleChange }) => (
            <Form>
              <div className="col-md-12 text-center">
                <h4 className="heading d-none">Investment Trust</h4>
                <div className="row my-3">
                  <div className="col-md-12 ">
                    <div className="mb-3">
                      <label className="form-label">
                        Do you have an Investment Trust?{" "}
                      </label>
                      <div className="QuestionIcon">
                        <img
                          className="img-fluid"
                          src={Questions_People}
                          alt=""
                        />
                      </div>
                      {/* switch button style */}
                      <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                        <div className="radiobutton">
                          <input
                            type="radio"
                            name="InvestmentTrust"
                            className="form-check-input"
                            id="InvestmentTrust1"
                            value="No"
                            onChange={handleChange}
                            checked={values.InvestmentTrust === "No"}
                          />
                          <label
                            htmlFor="InvestmentTrust1"
                            className="label1"
                            onClick={() => {
                              handleChange({ target: { name: "ITTermSharesManaged", value: "No", } });
                              handleChange({ target: { name: "ITInvestmentLoans", value: "No", } });
                              handleChange({ target: { name: "ITDirectProperty", value: "No", } });
                            }}
                          >
                            <span>No</span>
                          </label>
                          <input
                            type="radio"
                            name="InvestmentTrust"
                            id="InvestmentTrust2"
                            className="form-check-input"
                            value="Yes"
                            onChange={handleChange}
                            checked={values.InvestmentTrust === "Yes"}
                          />
                          <label
                            htmlFor="InvestmentTrust2"
                            className="label2"
                          >
                            <span>Yes</span>
                          </label>
                        </div>
                      </div>
                      {/* switch button style */}
                    </div>
                  </div>
                </div>

                {values.InvestmentTrust == "Yes" && (
                  <div className="row my-3">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Does its own any Investments such as Term Deposits,
                          Shares or Managed Funds?{" "}
                        </label>
                        <div className="QuestionIcon">
                          <img
                            className="img-fluid"
                            src={QuestionMoney}
                            alt=""
                          />
                        </div>
                        {/* health button style */}

                        <div className="form-check form-switch m-0 p-0 QuestionYesNoCenter col-md-12 ">
                          <div className="radiobutton">
                            <input
                              type="radio"
                              name="ITTermSharesManaged"
                              id="TermSharesManaged1"
                              value="No"
                              onChange={handleChange}
                              checked={values.ITTermSharesManaged === "No"}
                            />
                            <label
                              htmlFor="TermSharesManaged1"
                              className="label1"
                            >
                              <span>No</span>
                            </label>
                            <input
                              type="radio"
                              name="ITTermSharesManaged"
                              id="TermSharesManaged2"
                              value="Yes"
                              onChange={handleChange}
                              checked={values.ITTermSharesManaged === "Yes"}
                            />
                            <label
                              htmlFor="TermSharesManaged2"
                              className="label2"
                            >
                              <span>Yes</span>
                            </label>
                          </div>
                        </div>

                        {/* health switch button style */}
                      </div>
                    </div>
                  </div>
                )}

                {values.InvestmentTrust == "Yes" && (
                  <div className="row my-3">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Does its have any Investment Loans ?{" "}
                        </label>
                        <div className="QuestionIcon">
                          <img
                            className="img-fluid"
                            src={Questions_loan}
                            alt=""
                          />
                        </div>
                        {/* health button style */}

                        <div className="form-check form-switch m-0 p-0 QuestionYesNoCenter col-md-12 ">
                          <div className="radiobutton">
                            <input
                              type="radio"
                              name="ITInvestmentLoans"
                              id="InvestmentLoans1"
                              value="No"
                              onChange={handleChange}
                              checked={values.ITInvestmentLoans === "No"}
                            />
                            <label
                              htmlFor="InvestmentLoans1"
                              className="label1"
                            >
                              <span>No</span>
                            </label>
                            <input
                              type="radio"
                              name="ITInvestmentLoans"
                              id="InvestmentLoans2"
                              value="Yes"
                              onChange={handleChange}
                              checked={values.ITInvestmentLoans === "Yes"}
                            />
                            <label
                              htmlFor="InvestmentLoans2"
                              className="label2"
                            >
                              <span>Yes</span>
                            </label>
                          </div>
                        </div>

                        {/* health switch button style */}
                      </div>
                    </div>
                  </div>
                )}

                {values.InvestmentTrust == "Yes" && (
                  <div className="row my-3">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Does its own any Direct Property?{" "}
                        </label>
                        <div className="QuestionIcon">
                          <img
                            className="img-fluid"
                            src={Questions_Bank}
                            alt=""
                          />
                        </div>
                        {/* health button style */}

                        <div className="form-check form-switch m-0 p-0 QuestionYesNoCenter col-md-12 ">
                          <div className="radiobutton ">
                            <input
                              type="radio"
                              name="ITDirectProperty"
                              id="DirectProperty1"
                              value="No"
                              onChange={handleChange}
                              checked={values.ITDirectProperty === "No"}
                            />
                            <label
                              htmlFor="DirectProperty1"
                              className="label1"
                            >
                              <span>No</span>
                            </label>
                            <input
                              type="radio"
                              name="ITDirectProperty"
                              id="DirectProperty2"
                              value="Yes"
                              onChange={handleChange}
                              checked={values.ITDirectProperty === "Yes"}
                            />
                            <label
                              htmlFor="DirectProperty2"
                              className="label2"
                            >
                              <span>Yes</span>
                            </label>
                          </div>
                        </div>

                        {/* health switch button style */}
                      </div>
                    </div>
                  </div>
                )}

                <div className="row mt-2 d-none">
                  <div className="col-md-12">
                    <button
                      type="submit"
                      onClick={() => {
                        
                      }}
                      className="float-end btn w-25  bgColor modalBtn"
                    >
                      Next
                    </button>
                    <button className="float-end btn w-25  btn-outline  backBtn mx-3"
                      onClick={() => {
                        
                        setQuestionChange("SMSF")
                      }}
                    >
                      Back
                    </button>
                  </div>
                </div>

                {/*end children details form */}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default QuestionsInvestmentTrust;
