import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import Questions_Home from "../svgs/home-svgrepo-com.svg";
import loan from "../svgs/loan.svg";

import { useRecoilState, useRecoilValue } from "recoil";
import { QuestionShift, CRState, defaultUrl } from "../../../Store/Store";
import { GetAxios, PatchAxios, PostAxios } from "../../Assets/Api/Api";

const LifestyleAssetsAndDebt = (props) => {

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
    values.clientFK = localStorage.getItem("UserID");
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


  return (
    <div className="container-fluid">
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
                <h4 className="heading d-none">Lifestyle Assets and Debt</h4>
                <div className="row my-3">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Do you own a Family Home?{" "}
                      </label>
                      <div className="QuestionIcon">
                        <img
                          className="img-fluid"
                          src={Questions_Home}
                          alt=""
                        />
                      </div>
                      {/* switch button style */}
                      <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                        <div className="radiobutton">
                          <input
                            type="radio"
                            name="familyHome"
                            className="form-check-input"
                            id="familyHome1"
                            value="No"
                            onChange={handleChange}
                            checked={values.familyHome === "No"}
                          />
                          <label htmlFor="familyHome1" className="label1">
                            <span>No</span>
                          </label>
                          <input
                            type="radio"
                            name="familyHome"
                            id="familyHome2"
                            className="form-check-input"
                            value="Yes"
                            onChange={handleChange}
                            checked={values.familyHome === "Yes"}
                          />
                          <label htmlFor="familyHome2" className="label2">
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
                      <label className="form-label">
                        Do you own any investment Properties or Holiday homes in your own name?{" "}
                      </label>
                      <div className="QuestionIcon">
                        <img
                          className="img-fluid"
                          src={loan}
                          alt=""
                        />
                      </div>
                      {/* switch button style */}
                      <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                        <div className="radiobutton">
                          <input
                            type="radio"
                            name="familyHomeLoan"
                            className="form-check-input"
                            id="familyHomeLoan1"
                            value="No"
                            onChange={handleChange}
                            checked={values.familyHomeLoan === "No"}
                          />
                          <label htmlFor="familyHomeLoan1" className="label1">
                            <span>No</span>
                          </label>
                          <input
                            type="radio"
                            name="familyHomeLoan"
                            id="familyHomeLoan2"
                            className="form-check-input"
                            value="Yes"
                            onChange={handleChange}
                            checked={values.familyHomeLoan === "Yes"}
                          />
                          <label htmlFor="familyHomeLoan2" className="label2">
                            <span>Yes</span>
                          </label>
                        </div>
                      </div>
                      {/* switch button style */}
                    </div>
                  </div>
                </div>

                {values.familyHomeLoan === "Yes" &&
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
                        name="numberOfHolidayHome"
                        id="numberOfHolidayHome"
                        className="form-select inputDesign"
                        as="select"
                      >
                        <option value="">Please Select</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>

                      </Field>
                    </div>
                  </div>
                }

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

                        setQuestionChange("income");
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

export default LifestyleAssetsAndDebt;
