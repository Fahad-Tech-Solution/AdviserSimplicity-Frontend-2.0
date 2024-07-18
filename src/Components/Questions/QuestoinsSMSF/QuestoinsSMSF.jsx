import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Questions_SMSF from "../svgs/money-bag-svgrepo-com.svg";
import Dollar_Chart from "../svgs/WhatsApp Image 2023-08-11 at 19.42.35.jpg";
import Questions_loan from "../svgs/loan.svg";
import Questions_Bank from "../svgs/property-value.svg";

import { useRecoilState } from "recoil";
import { QuestionShift,CRState } from "../../../Store/Store";
const QuestionsSMSF = (props) => {
  let [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);
  let [CRObject, setCRObject] = useRecoilState(CRState);


  let onSubmit = (values) => {
    
    if (props.flagState) {
      props.setFlagState(false);
    }

    setCRObject(values);
    localStorage.setItem("QuestionsState", JSON.stringify(values));
    props.setQuestionChange(false);
    localStorage.setItem("Question", "InvestmentTrust");
    
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
                  <h4 className="heading">Self Manged Super Fund </h4>
                  <div className="row my-3">
                    <div className="col-md-12 ">
                      <div className="mb-3">
                        <label className="form-label">
                          Do you have a Self Manged Super Fund(SMSF)?{" "}
                        </label>
                        <div className="QuestionIcon ">
                          <img
                            className="img-fluid "
                            src={Questions_SMSF}
                            alt=""
                          />
                        </div>
                        {/* switch button style */}
                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                          <div className="radiobutton">
                            <input
                              type="radio"
                              name="QuestionSMSF"
                              className="form-check-input"
                              id="QuestionSMSF1"
                              value="No"
                              onChange={handleChange}
                              checked={values.QuestionSMSF === "No"}
                            />
                            <label
                              htmlFor="QuestionSMSF1"
                              className="label1"
                              onClick={() => {
                                handleChange({ target: { name: "TermSharesManaged", value: "No", }});
                                handleChange({ target: { name: "InvestmentLoans", value: "No", }});
                                handleChange({ target: { name: "DirectProperty", value: "No", }});
                              }}
                            >
                              <span>No</span>
                            </label>
                            <input
                              type="radio"
                              name="QuestionSMSF"
                              id="QuestionSMSF2"
                              className="form-check-input"
                              value="Yes"
                              onChange={handleChange}
                              checked={values.QuestionSMSF === "Yes"}
                            />
                            <label
                              htmlFor="QuestionSMSF2"
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

                  {values.QuestionSMSF == "Yes" && (
                    <div className="row my-3">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label htmlFor="" className="form-label">
                            Does its own any Investments such as Term Deposits,
                            Shares or Managed Funds?{" "}
                          </label>
                          <div className="QuestionIcon ">
                            <img
                              className="img-fluid"
                              src={Dollar_Chart}
                              alt=""
                            />
                          </div>
                          {/* health button style */}

                          <div className="form-check form-switch m-0 p-0 QuestionYesNoCenter col-md-12 ">
                            <div className="radiobutton">
                              <input
                                type="radio"
                                name="TermSharesManaged"
                                id="TermSharesManaged1"
                                value="No"
                                onChange={handleChange}
                                checked={values.TermSharesManaged === "No"}
                              />
                              <label
                                htmlFor="TermSharesManaged1"
                                className="label1"
                              >
                                <span>No</span>
                              </label>
                              <input
                                type="radio"
                                name="TermSharesManaged"
                                id="TermSharesManaged2"
                                value="Yes"
                                onChange={handleChange}
                                checked={values.TermSharesManaged === "Yes"}
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

                  {values.QuestionSMSF == "Yes" && (
                    <div className="row my-3">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label htmlFor="" className="form-label">
                            Does its have any Investment Loans ?{" "}
                          </label>
                          <div className="QuestionIcon ">
                            <img
                              className="img-fluid "
                              src={Questions_loan}
                              alt=""
                            />
                          </div>
                          {/* health button style */}

                          <div className="form-check form-switch m-0 p-0 QuestionYesNoCenter col-md-12 ">
                            <div className="radiobutton ">
                              <input
                                type="radio"
                                name="InvestmentLoans"
                                id="InvestmentLoans1"
                                value="No"
                                onChange={handleChange}
                                checked={values.InvestmentLoans === "No"}
                              />
                              <label
                                htmlFor="InvestmentLoans1"
                                className="label1"
                              >
                                <span>No</span>
                              </label>
                              <input
                                type="radio"
                                name="InvestmentLoans"
                                id="InvestmentLoans2"
                                value="Yes"
                                onChange={handleChange}
                                checked={values.InvestmentLoans === "Yes"}
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

                  {values.QuestionSMSF == "Yes" && (
                    <div className="row my-3">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label htmlFor="" className="form-label">
                            Does its own any Direct Property?{" "}
                          </label>
                          <div className="QuestionIcon ">
                            <img
                              className="img-fluid "
                              src={Questions_Bank}
                              alt=""
                            />
                          </div>
                          {/* health button style */}

                          <div className="form-check form-switch m-0 p-0 QuestionYesNoCenter col-md-12 ">
                            <div className="radiobutton ">
                              <input
                                type="radio"
                                name="DirectProperty"
                                id="DirectProperty1"
                                value="No"
                                onChange={handleChange}
                                checked={values.DirectProperty === "No"}
                              />
                              <label
                                htmlFor="DirectProperty1"
                                className="label1"
                              >
                                <span>No</span>
                              </label>
                              <input
                                type="radio"
                                name="DirectProperty"
                                id="DirectProperty2"
                                value="Yes"
                                onChange={handleChange}
                                checked={values.DirectProperty === "Yes"}
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
                      onClick={() => {
                        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                      }} 
                        type="submit"
                        className="float-end btn w-25 bgColor modalBtn"
                      >
                        Next
                      </button>
                      <button
                      onClick={() => {
                        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                        setQuestionChange("ProfessionalAdvisor");
                      }} 
                        type="button"
                        className="float-end btn w-25  btn-outline  backBtn mx-3"
                       
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

export default QuestionsSMSF;
