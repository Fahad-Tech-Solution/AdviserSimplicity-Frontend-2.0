import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import TermImg from "../svgs/Chart.jpg";
import PortFolio from "../svgs/portfolio.svg";
import funds from "../svgs/funds.svg";
import analytics from "../svgs/analytics.png";
import people from "../svgs/Questions_People.png";
import property from "../svgs/property-value.svg";

import { useRecoilState, useRecoilValue } from "recoil";
import { QuestionShift, CRState, defaultUrl } from "../../../Store/Store";
import { GetAxios, PatchAxios, PostAxios } from "../../Assets/Api/Api";
import { Image } from "react-bootstrap";
import DynamicQuestionBlocks from "../../Assets/DynamicQuestionBlocks/DynamicQuestionBlocks";
const QuestionsFamily = (props) => {

  let [CRObject, setCRObject] = useRecoilState(CRState);

  const [flagState, setFlagState] = useState(false);

  let DefaultUrl = useRecoilValue(defaultUrl)

  const FetchQuestions = async () => {
    try {
      const res = await GetAxios(`${DefaultUrl}/api/questions/${localStorage.getItem("UserID")}`);
      if (res) {
        setCRObject(res);
        setFlagState(true);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    FetchQuestions();
  }, []);

  const handleResponse = (values) => {
    setCRObject(values);
    localStorage.setItem("QuestionsState", JSON.stringify(values));
    props.setQuestionChange(false);
    localStorage.setItem("Question", "PersonalAssets");
  };

  const onSubmit = async (values) => {
    try {
      if (!flagState) {
        const PostRes = await PostAxios(`${DefaultUrl}/api/questions/Add`, values);
        if (PostRes) {
          if (props.flagState) {
            props.setFlagState(false);
          }
          handleResponse(values);
        }
      } else {
        const PatchRes = await PatchAxios(`${DefaultUrl}/api/questions/Update/${localStorage.getItem("UserID")}`, values);
        if (PatchRes) {
          if (props.flagState) {
            props.setFlagState(false);
          }
          handleResponse(values);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  let QuestionArray = [
    {
      title: "Does your Family Trust  have any Money invested in Term Deposits?",
      img: TermImg,
      key: "familyTermDeposit",
    },
    {
      title: "Does your Family Trust  have any Money invested Australian Shares?",
      img: PortFolio,
      key: "familyAustralianShare",
    },
    {
      title: "Does your Family Trust have any Money invested   in Managed Funds or via a Platform?",
      img: funds,
      key: "familyMangedFunds",
    },
    {
      title: "Does your Family Trust have any  Investment Loan (LOC)  attached to any of its investments?",
      img: analytics,
      key: "familyInvestmentHomeLoan",
    },
    {
      title: "Does your Family Trust have any investment Properties?",
      img: property,
      key: "familyInvestmentProperties",
    },
  ]
  const QuestionClick = (index, elem, values, setFieldValue) => {
    console.log("image clicked in goals", index, elem.key, values);
    if (values[elem.key] == "No") {
      setFieldValue(elem.key, "Yes");
    }
    if (values[elem.key] == "Yes") {
      setFieldValue(elem.key, "No");
    }
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
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <div className="col-md-12 text-center">
                <h4 className="heading d-none">Family Trust Investment</h4>
                <div className="row my-3 justify-content-center">
                  <DynamicQuestionBlocks QuestionArray={QuestionArray} QuestionClick={QuestionClick} values={values} setFieldValue={setFieldValue} />

                  <div className="col-md-12  d-none">
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

                <div className="row my-3 d-none ">
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

                <div className="row my-3 d-none">
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

                <div className="row my-3 d-none">
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

                <div className="row my-3 d-none">
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
