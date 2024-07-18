import React from "react";
import "./AdditionalQueries.css";

import bank from "../svgs/bank.svg";
import property from "../svgs/property-value.svg";
import loan from "../svgs/loan.svg";
import rent from "../svgs/rent.svg";

import { useRecoilState } from "recoil";
import { QuestionShift, CRState } from "../../../Store/Store";
import { Form, Formik } from "formik";

const AdditionalQueriesInvestment = (props) => {

  let [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);
  let [CRObject, setCRObject] = useRecoilState(CRState);

  let onSubmit = (values) => {
    // console.log(values);


    if (props.flagState) {
      props.setFlagState(false);
    }


    setCRObject(values);
    localStorage.setItem("QuestionsState", JSON.stringify(values));
    props.setQuestionChange(false);
    localStorage.setItem("Question", "SuperAndRetirement");


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

                <h4 className="heading d-none">Investment</h4>

                <div className="row my-3">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Investment Property Details?
                      </label>
                      <div className="QuestionIcon">
                        <img className="img-fluid" src={property} alt="" />
                      </div>
                      {/* health button style */}

                      <div className="form-check form-switch m-0 p-0 float-center col-md-12 QuestionYesNoCenter">
                        <div className="radiobutton">
                          <input
                            type="radio"
                            name="investmentPropertyDetails"
                            id="investmentPropertyDetails1"
                            value="No"
                            onChange={handleChange}
                            checked={values.investmentPropertyDetails === "No"}
                          />
                          <label
                            htmlFor="investmentPropertyDetails1"
                            className="label1"
                          >
                            <span>No</span>
                          </label>
                          <input
                            type="radio"
                            name="investmentPropertyDetails"
                            id="investmentPropertyDetails2"
                            value="Yes"
                            onChange={handleChange}
                            checked={values.investmentPropertyDetails === "Yes"}
                          />
                          <label
                            htmlFor="investmentPropertyDetails2"
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
                        Investment Property Loan?
                      </label>
                      <div className="QuestionIcon">
                        <img className="img-fluid" src={loan} alt="" />
                      </div>
                      {/* health button style */}

                      <div className="form-check form-switch m-0 p-0 float-center col-md-12 QuestionYesNoCenter">
                        <div className="radiobutton">
                          <input
                            type="radio"
                            name="investmentPropertyLoan"
                            id="investmentPropertyLoan1"
                            value="No"
                            onChange={handleChange}
                            checked={values.investmentPropertyLoan === "No"}
                          />
                          <label
                            htmlFor="investmentPropertyLoan1"
                            className="label1"
                          >
                            <span>No</span>
                          </label>
                          <input
                            type="radio"
                            name="investmentPropertyLoan"
                            id="investmentPropertyLoan2"
                            value="Yes"
                            onChange={handleChange}
                            checked={values.investmentPropertyLoan === "Yes"}
                          />
                          <label
                            htmlFor="investmentPropertyLoan2"
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
                        Income & Expense?
                      </label>
                      <div className="QuestionIcon">
                        <img className="img-fluid" src={rent} alt="" />
                      </div>
                      {/* health button style */}

                      <div className="form-check form-switch m-0 p-0 float-center col-md-12 QuestionYesNoCenter">
                        <div className="radiobutton">
                          <input
                            type="radio"
                            name="incomeExpenses"
                            id="incomeExpenses1"
                            value="No"
                            onChange={handleChange}
                            checked={values.incomeExpenses === "No"}
                          />
                          <label
                            htmlFor="incomeExpenses1"
                            className="label1"
                          >
                            <span>No</span>
                          </label>
                          <input
                            type="radio"
                            name="incomeExpenses"
                            id="incomeExpenses2"
                            value="Yes"
                            onChange={handleChange}
                            checked={values.incomeExpenses === "Yes"}
                          />
                          <label
                            htmlFor="incomeExpenses2"
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
                    <button type="button" className="float-end btn w-25  btn-outline  backBtn mx-3"
                      onClick={() => {

                        setQuestionChange("Lifestyle")
                      }}
                    >
                      Back
                    </button>
                  </div>
                </div>

              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdditionalQueriesInvestment;
