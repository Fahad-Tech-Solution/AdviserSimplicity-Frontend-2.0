import React from "react";
import "./AdditionalQueries.css";
import piggybank1 from "../svgs/piggy-bank.svg";
import piggybank2 from "../svgs/piggy-bank-new.svg";
import calender from "../svgs/calendar.png";

import { useRecoilState } from "recoil";
import { QuestionShift, CRState } from "../../../Store/Store";
import { Form, Formik } from "formik";
const AdditionalQueriesSuperAndRetirement = (props) => {
  let [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);
  let [CRObject, setCRObject] = useRecoilState(CRState);

  let onSubmit = (values) => {

    if (props.flagState) {
      props.setFlagState(false);
    }


    setCRObject(values);
    localStorage.setItem("QuestionsState", JSON.stringify(values));
    props.setQuestionChange(false);
    localStorage.setItem("Question", "ProfessionalAdvisor");
    
  };

  return (
    <div className="container-fluid">
      <div className="row m-0">
        <Formik
          initialValues={CRObject}
          onSubmit={onSubmit}
          enableReinitialize
          innerRef={props.formRef}
        >
          {({ values, handleChange }) => <Form>
            <div className="col-md-12 text-center">
              <h4 className="heading d-none">Super and Retirement</h4>

              <div className="row my-3">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Do you have any Money in Superannuation?
                    </label>
                    <div className="QuestionIcon">
                      <img className="img-fluid" src={piggybank1} alt="" />
                    </div>
                    {/* health button style */}

                    <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                      <div className="radiobutton">
                        <input
                          type="radio"
                          name="superAnnuationIssues"
                          id="superAnnuationIssues1"
                          value="No"
                          onChange={handleChange}
                          checked={values.superAnnuationIssues === "No"}
                        />
                        <label
                          htmlFor="superAnnuationIssues1"
                          className="label1"
                        >
                          <span>No</span>
                        </label>
                        <input
                          type="radio"
                          name="superAnnuationIssues"
                          id="superAnnuationIssues2"
                          value="Yes"
                          onChange={handleChange}
                          checked={values.superAnnuationIssues === "Yes"}
                        />
                        <label
                          htmlFor="superAnnuationIssues2"
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

              <div className="row my-3">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Do you have any Money in Account Based Pension ?
                    </label>
                    <div className="QuestionIcon">
                      <img className="img-fluid" src={piggybank2} alt="" />
                    </div>
                    {/* health button style */}

                    <div className="form-check form-switch m-0 p-0  col-md-12 QuestionYesNoCenter">
                      <div className="radiobutton">
                        <input
                          type="radio"
                          name="accountBasedPensionIssues"
                          id="accountBasedPensionIssues1"
                          value="No"
                          onChange={handleChange}
                          checked={values.accountBasedPensionIssues === "No"}
                        />
                        <label
                          htmlFor="accountBasedPensionIssues1"
                          className="label1"
                        >
                          <span>No</span>
                        </label>
                        <input
                          type="radio"
                          name="accountBasedPensionIssues"
                          id="accountBasedPensionIssues2"
                          value="Yes"
                          onChange={handleChange}
                          checked={values.accountBasedPensionIssues === "Yes"}
                        />
                        <label
                          htmlFor="accountBasedPensionIssues2"
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

              <div className="row my-3">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Do you have any money invested in Annuities ?
                    </label>
                    <div className="QuestionIcon">
                      <img className="img-fluid" src={calender} alt="" />
                    </div>
                    {/* health button style */}

                    <div className="form-check form-switch m-0 p-0  col-md-12 QuestionYesNoCenter">
                      <div className="radiobutton">
                        <input
                          type="radio"
                          name="annuitiesIssues"
                          id="annuitiesIssues1"
                          value="No"
                          onChange={handleChange}
                          checked={values.annuitiesIssues === "No"}
                        />
                        <label
                          htmlFor="annuitiesIssues1"
                          className="label1"
                        >
                          <span>No</span>
                        </label>
                        <input
                          type="radio"
                          name="annuitiesIssues"
                          id="annuitiesIssues2"
                          value="Yes"
                          onChange={handleChange}
                          checked={values.annuitiesIssues === "Yes"}
                        />
                        <label
                          htmlFor="annuitiesIssues2"
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

              <div className="row mt-2 d-none">
                <div className="col-md-12">
                  <button
                    onClick={() => {
                      
                    }}
                    type="submit"
                    className="float-end btn w-25  bgColor modalBtn"
                  >
                    Next
                  </button>
                  <button type="button"
                    className="float-end btn w-25  btn-outline  backBtn mx-3"
                    onClick={() => {
                      
                      setQuestionChange("Investment")
                    }}
                  >
                    Back
                  </button>
                </div>
              </div>

            </div>

          </Form>}
        </Formik>
      </div>
    </div>
  );
};

export default AdditionalQueriesSuperAndRetirement;
