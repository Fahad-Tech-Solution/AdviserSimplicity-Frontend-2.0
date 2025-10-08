import React, { useEffect } from "react";
import "./AdditionalQueries.css";
import businessman from "../svgs/businessman.svg";
import money from "../svgs/money-3.svg";
import setting from "../svgs/gears-gear-svgrepo-com.svg";

import { useRecoilState } from "recoil";
import { QuestionShift, CRState } from "../../../Store/Store";
import { Form, Formik } from "formik";



const AdditionalQueries = (props) => {
  let [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);
  let [CRObject, setCRObject] = useRecoilState(CRState);

  let onSubmit = (values) => {


    if (props.flagState) {
      props.setFlagState(false);
    }


    setCRObject(values);
    localStorage.setItem("QuestionsState", JSON.stringify(values));
    props.setQuestionChange(false);
    // localStorage.setItem("Question", "Lifestyle");

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
              <h4 className="heading d-none">Income</h4>
              <div className="row my-3">
                <div className="col-md-12">
                  <div className="mb-3 ">
                    <label htmlFor="" className="form-label">
                      Are you receiving any Income from employment (including form
                      your own company)?
                    </label>
                    <div className="QuestionIcon">
                      <img className="img-fluid" src={businessman} alt="" />
                    </div>
                    {/* switch button style */}
                    <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter ">
                      <div className="radiobutton">
                        <input
                          type="radio"
                          name="IncomeFromEmploymentIssuesradio"
                          id="IncomeFromEmploymentIssuesopt1"
                          value="No"
                          onChange={handleChange}
                          checked={values.IncomeFromEmploymentIssuesradio === "No"}
                        />
                        <label
                          htmlFor="IncomeFromEmploymentIssuesopt1"
                          className="label1"
                        >
                          <span>No</span>
                        </label>
                        <input
                          type="radio"
                          name="IncomeFromEmploymentIssuesradio"
                          id="IncomeFromEmploymentIssuesopt2"
                          value="Yes"
                          onChange={handleChange}
                          checked={values.IncomeFromEmploymentIssuesradio === "Yes"}
                        />
                        <label
                          htmlFor="IncomeFromEmploymentIssuesopt2"
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
              <div className="row my-3">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Are you receiving any Centrelink Payments (including FTBA &
                      B or any Health Care Cards)?
                    </label>
                    <div className="QuestionIcon">
                      <img className="img-fluid" src={setting} alt="" />
                    </div>
                    {/* switch button style */}
                    <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter ">
                      <div className="radiobutton">
                        <input
                          type="radio"
                          name="CentrelinkPaymentsIssuesradio"
                          id="CentrelinkPaymentsIssuesradioIssuesopt1"
                          value="No"
                          onChange={handleChange}
                          checked={values.CentrelinkPaymentsIssuesradio === "No"}
                        />
                        <label
                          htmlFor="CentrelinkPaymentsIssuesradioIssuesopt1"
                          className="label1"
                        >
                          <span>No</span>
                        </label>
                        <input
                          type="radio"
                          name="CentrelinkPaymentsIssuesradio"
                          id="CentrelinkPaymentsIssuesradioIssuesopt2"
                          value="Yes"
                          onChange={handleChange}
                          checked={values.CentrelinkPaymentsIssuesradio === "Yes"}
                        />
                        <label
                          htmlFor="CentrelinkPaymentsIssuesradioIssuesopt2"
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
              <div className="row my-3">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Are you receiving any other Income (Lifetime or Overseas
                      Pension)?
                    </label>
                    <div className="QuestionIcon">
                      <img className="img-fluid" src={money} alt="" />
                    </div>
                    {/* switch button style */}
                    <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                      <div className="radiobutton">
                        <input
                          type="radio"
                          name="otherTaxableIncome"
                          id="LifetimeorOverseasPensionIssuesopt1"
                          value="No"
                          onChange={handleChange}
                          checked={values.otherTaxableIncome === "No"}
                        />
                        <label
                          htmlFor="LifetimeorOverseasPensionIssuesopt1"
                          className="label1"
                        >
                          <span>No</span>
                        </label>
                        <input
                          type="radio"
                          name="otherTaxableIncome"
                          id="LifetimeorOverseasPensionIssuesopt2"
                          value="Yes"
                          onChange={handleChange}
                          checked={values.otherTaxableIncome === "Yes"}
                        />
                        <label
                          htmlFor="LifetimeorOverseasPensionIssuesopt2"
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
                  <button
                    onClick={() => {

                      setQuestionChange("FinancialInvestments");
                    }}
                    className="float-end btn w-25  btn-outline  backBtn mx-3">
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

export default AdditionalQueries;
