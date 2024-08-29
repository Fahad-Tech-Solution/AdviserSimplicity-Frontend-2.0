import React, { useEffect, useState } from "react";
import "./AdditionalQueries.css";
import piggybank1 from "../svgs/piggy-bank.svg";
import piggybank2 from "../svgs/piggy-bank-new.svg";
import calender from "../svgs/calendar.png";

import { useRecoilState, useRecoilValue } from "recoil";
import { QuestionShift, CRState, defaultUrl } from "../../../Store/Store";
import { Form, Formik } from "formik";
import { GetAxios, PatchAxios, PostAxios } from "../../Assets/Api/Api";
import { Image } from "react-bootstrap";
import DynamicQuestionBlocks from "../../Assets/DynamicQuestionBlocks/DynamicQuestionBlocks";
const AdditionalQueriesSuperAndRetirement = (props) => {

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


  let QuestionArray = [
    {
      title: "Do you have any Money in Superannuation?",
      img: piggybank1,
      key: "superAnnuationIssues",
    },
    {
      title: "Do you have any Money in Account Based Pension ?",
      img: piggybank2,
      key: "accountBasedPensionIssues",
    },
    {
      title: "Do you have any money invested in Annuities ?",
      img: calender,
      key: "annuitiesIssues",
    }
  ]
  const QuestionClick = (index, elem, values, setFieldValue) => {
    // console.log("image clicked in goals", index, elem.key, values);
    if (values[elem.key] == "No") {
      setFieldValue(elem.key, "Yes");
    }
    if (values[elem.key] == "Yes") {
      setFieldValue(elem.key, "No");
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
          {({ values, handleChange, setFieldValue }) => <Form>
            <div className="col-md-12 text-center">
              <h4 className="heading d-none">Super and Retirement</h4>

              <div className="row my-3 justify-content-center">
                <DynamicQuestionBlocks QuestionArray={QuestionArray} QuestionClick={QuestionClick} values={values} setFieldValue={setFieldValue} />

                <div className="col-md-12 d-none">
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

              <div className="row my-3 d-none">
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

              <div className="row my-3 d-none">
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
