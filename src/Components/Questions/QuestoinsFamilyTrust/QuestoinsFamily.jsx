import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import TermImg from "../svgs/Chart.jpg";
import PortFolio from "../svgs/portfolio.svg";
import funds from "../svgs/funds.svg";
import analytics from "../svgs/analytics.png";
import people from "../svgs/Questions_People.png";
import property from "../svgs/property-value.svg";

import { useRecoilState } from "recoil";
import { QuestionShift, CRState } from "../../../Store/Store";
const QuestionsFamily = (props) => {
  let [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);
  let [CRObject, setCRObject] = useRecoilState(CRState);


  let onSubmit = (values) => {

    if (props.flagState) {
      props.setFlagState(false);
    }

    setCRObject(values);
    localStorage.setItem("QuestionsState", JSON.stringify(values));
    props.setQuestionChange(false);
    localStorage.setItem("Question", "FamilyTrust");

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
                <h4 className="heading">Family Trust Investment</h4>
                <div className="row my-3">
                  <div className="col-md-12 ">
                    <div className="mb-3">
                      <label className="form-label">
                        Does your Family Trust  have any Money invested in Term Deposits?{" "}
                      </label>
                      <div className="QuestionIcon ">
                        <img
                          className="img-fluid "
                          src={TermImg}
                          alt=""
                        />
                      </div>
                      {/* switch button style */}
                      <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                        <div className="radiobutton">
                          <input
                            type="radio"
                            name="familyTermDeposit"
                            className="form-check-input"
                            id="familyTermDeposit1"
                            value="No"
                            onChange={handleChange}
                            checked={values.familyTermDeposit === "No"}
                          />
                          <label
                            htmlFor="familyTermDeposit1"
                            className="label1"
                          >
                            <span>No</span>
                          </label>
                          <input
                            type="radio"
                            name="familyTermDeposit"
                            id="familyTermDeposit2"
                            className="form-check-input"
                            value="Yes"
                            onChange={handleChange}
                            checked={values.familyTermDeposit === "Yes"}
                          />
                          <label
                            htmlFor="familyTermDeposit2"
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
                  <div className="col-md-12 ">
                    <div className="mb-3">
                      <label className="form-label">
                        Does your Family Trust  have any Money invested Australian Shares?{" "}
                      </label>
                      <div className="QuestionIcon ">
                        <img
                          className="img-fluid "
                          src={PortFolio}
                          alt=""
                        />
                      </div>
                      {/* switch button style */}
                      <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                        <div className="radiobutton">
                          <input
                            type="radio"
                            name="familyAustralianShare"
                            className="form-check-input"
                            id="familyAustralianShare1"
                            value="No"
                            onChange={handleChange}
                            checked={values.familyAustralianShare === "No"}
                          />
                          <label
                            htmlFor="familyAustralianShare1"
                            className="label1"
                          >
                            <span>No</span>
                          </label>
                          <input
                            type="radio"
                            name="familyAustralianShare"
                            id="familyAustralianShare2"
                            className="form-check-input"
                            value="Yes"
                            onChange={handleChange}
                            checked={values.familyAustralianShare === "Yes"}
                          />
                          <label
                            htmlFor="familyAustralianShare2"
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
                  <div className="col-md-12 ">
                    <div className="mb-3">
                      <label className="form-label">
                        Does your Family Trust have any Money invested   in Managed Funds or via a Platform?{" "}
                      </label>
                      <div className="QuestionIcon ">
                        <img
                          className="img-fluid "
                          src={funds}
                          alt=""
                        />
                      </div>
                      {/* switch button style */}
                      <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                        <div className="radiobutton">
                          <input
                            type="radio"
                            name="familyMangedFunds"
                            className="form-check-input"
                            id="familyMangedFunds1"
                            value="No"
                            onChange={handleChange}
                            checked={values.familyMangedFunds === "No"}
                          />
                          <label
                            htmlFor="familyMangedFunds1"
                            className="label1"
                          >
                            <span>No</span>
                          </label>
                          <input
                            type="radio"
                            name="familyMangedFunds"
                            id="familyMangedFunds2"
                            className="form-check-input"
                            value="Yes"
                            onChange={handleChange}
                            checked={values.familyMangedFunds === "Yes"}
                          />
                          <label
                            htmlFor="familyMangedFunds2"
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
                  <div className="col-md-12 ">
                    <div className="mb-3">
                      <label className="form-label">
                        Does your Family Trust have any  Investment Loan (LOC)  attached to any of its investments?{" "}
                      </label>
                      <div className="QuestionIcon ">
                        <img
                          className="img-fluid "
                          src={analytics}
                          alt=""
                        />
                      </div>
                      {/* switch button style */}
                      <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                        <div className="radiobutton">
                          <input
                            type="radio"
                            name="familyInvestmentHomeLoan"
                            className="form-check-input"
                            id="familyInvestmentHomeLoan1"
                            value="No"
                            onChange={handleChange}
                            checked={values.familyInvestmentHomeLoan === "No"}
                          />
                          <label
                            htmlFor="familyInvestmentHomeLoan1"
                            className="label1"
                          >
                            <span>No</span>
                          </label>
                          <input
                            type="radio"
                            name="familyInvestmentHomeLoan"
                            id="familyInvestmentHomeLoan2"
                            className="form-check-input"
                            value="Yes"
                            onChange={handleChange}
                            checked={values.familyInvestmentHomeLoan === "Yes"}
                          />
                          <label
                            htmlFor="familyInvestmentHomeLoan2"
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
                  <div className="col-md-12 ">
                    <div className="mb-3">
                      <label className="form-label">
                        Does your Family Trust have any investment Properties?{" "}
                      </label>
                      <div className="QuestionIcon ">
                        <img
                          className="img-fluid "
                          src={property}
                          alt=""
                        />
                      </div>
                      {/* switch button style */}
                      <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                        <div className="radiobutton">
                          <input
                            type="radio"
                            name="familyInvestmentProperties"
                            className="form-check-input"
                            id="familyInvestmentProperties1"
                            value="No"
                            onChange={handleChange}
                            checked={values.familyInvestmentProperties === "No"}
                          />
                          <label
                            htmlFor="familyInvestmentProperties1"
                            className="label1"
                          >
                            <span>No</span>
                          </label>
                          <input
                            type="radio"
                            name="familyInvestmentProperties"
                            id="familyInvestmentProperties2"
                            className="form-check-input"
                            value="Yes"
                            onChange={handleChange}
                            checked={values.familyInvestmentProperties === "Yes"}
                          />
                          <label
                            htmlFor="familyInvestmentProperties2"
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

                {values.familyInvestmentProperties === "Yes" &&
                  <div className="row my-3 justify-content-center">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">
                          How many??{" "}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <Field
                        name="numberOfFamilyInvestmentProperties"
                        id="numberOfFamilyInvestmentProperties"
                        className="form-select inputDesign"
                        as="select"
                      >
                        <option value="">Please Select</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </Field>
                    </div>
                  </div>
                }



                <div className="row mt-2 d-none">
                  <div className="col-md-12">
                    <button
                      onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                      }}
                      type="submit"
                      className="float-end btn w-25 bgColor modalBtn"
                    >
                      Next
                    </button>
                    <button
                      onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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

export default QuestionsFamily;
