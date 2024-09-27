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
import { GetAxios, openNotificationSuccess, PatchAxios, PostAxios } from "../../Assets/Api/Api";
import { Image } from "react-bootstrap";
import DynamicQuestionBlocks from "../../Assets/DynamicQuestionBlocks/DynamicQuestionBlocks";
const QuestionsSMSF = (props) => {

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
      openNotificationSuccess("success", "topRight", "Success Notification", "Data of \"" + props.modalObject.title + "\" is Saved");
    } catch (error) {
      console.error("Error submitting form:", error);
      openNotificationSuccess("error", "topRight", "Error Notification", "Data of \"" + props.modalObject.title + "\" is not Saved Please! try again");
    }
  };

  let QuestionArray = [
    {
      title: "Does your SMSF have any Money invested in Term Deposits?",
      img: TermImg,
      key: "SMSFTermDeposits",
    },
    {
      title: "Does  your SMSF have any Money invested Australian Shares?",
      img: PortFolio,
      key: "SMSFAustralianShares",
    },
    {
      title: "Do you SMSF have any Money invested in Managed Funds or via a Platform?",
      img: funds,
      key: "SMSFManagedFunds",
    },
    {
      title: "Does  your SMSF have an  Investment Loan (LOC)  attached to any of its investments?",
      img: analytics,
      key: "SMSFInvestmentLoan",
    },
    {
      title: "Does your SMSF have any investment Properties?",
      img: property,
      key: "SMSFInvestmentProperties",
    },
    {
      title: "Does your SMSF have any money in Pension Phase?",
      img: people,
      key: "SMSFPensionPhase",
    },
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
                <h4 className="heading d-none">Self Manged Super Fund </h4>

                <div className="row my-3 justify-content-center">
                  <DynamicQuestionBlocks QuestionArray={QuestionArray} QuestionClick={QuestionClick} values={values} setFieldValue={setFieldValue} />



                  <div className="col-md-12 d-none">
                    <div className="mb-3">
                      <label className="form-label">
                        Does your SMSF have any Money invested in Term Deposits?{" "}
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
                            name="SMSFTermDeposits"
                            className="form-check-input"
                            id="SMSFTermDeposits1"
                            value="No"
                            onChange={handleChange}
                            checked={values.SMSFTermDeposits === "No"}
                          />
                          <label
                            htmlFor="SMSFTermDeposits1"
                            className="label1"
                          >
                            <span>No</span>
                          </label>
                          <input
                            type="radio"
                            name="SMSFTermDeposits"
                            id="SMSFTermDeposits2"
                            className="form-check-input"
                            value="Yes"
                            onChange={handleChange}
                            checked={values.SMSFTermDeposits === "Yes"}
                          />
                          <label
                            htmlFor="SMSFTermDeposits2"
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
                        Does  your SMSF have any Money invested Australian Shares?{" "}
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
                            name="SMSFAustralianShares"
                            className="form-check-input"
                            id="SMSFAustralianShares1"
                            value="No"
                            onChange={handleChange}
                            checked={values.SMSFAustralianShares === "No"}
                          />
                          <label
                            htmlFor="SMSFAustralianShares1"
                            className="label1"
                          >
                            <span>No</span>
                          </label>
                          <input
                            type="radio"
                            name="SMSFAustralianShares"
                            id="SMSFAustralianShares2"
                            className="form-check-input"
                            value="Yes"
                            onChange={handleChange}
                            checked={values.SMSFAustralianShares === "Yes"}
                          />
                          <label
                            htmlFor="SMSFAustralianShares2"
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
                        Do you SMSF have any Money invested in Managed Funds or via a Platform?{" "}
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
                            name="SMSFManagedFunds"
                            className="form-check-input"
                            id="SMSFManagedFunds1"
                            value="No"
                            onChange={handleChange}
                            checked={values.SMSFManagedFunds === "No"}
                          />
                          <label
                            htmlFor="SMSFManagedFunds1"
                            className="label1"
                          >
                            <span>No</span>
                          </label>
                          <input
                            type="radio"
                            name="SMSFManagedFunds"
                            id="SMSFManagedFunds2"
                            className="form-check-input"
                            value="Yes"
                            onChange={handleChange}
                            checked={values.SMSFManagedFunds === "Yes"}
                          />
                          <label
                            htmlFor="SMSFManagedFunds2"
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
                        Does  your SMSF have an  Investment Loan (LOC)  attached to any of its investments?{" "}
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
                            name="SMSFInvestmentLoan"
                            className="form-check-input"
                            id="SMSFInvestmentLoan1"
                            value="No"
                            onChange={handleChange}
                            checked={values.SMSFInvestmentLoan === "No"}
                          />
                          <label
                            htmlFor="SMSFInvestmentLoan1"
                            className="label1"
                          >
                            <span>No</span>
                          </label>
                          <input
                            type="radio"
                            name="SMSFInvestmentLoan"
                            id="SMSFInvestmentLoan2"
                            className="form-check-input"
                            value="Yes"
                            onChange={handleChange}
                            checked={values.SMSFInvestmentLoan === "Yes"}
                          />
                          <label
                            htmlFor="SMSFInvestmentLoan2"
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
                        Does your SMSF have any investment Properties?{" "}
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
                            name="SMSFInvestmentProperties"
                            className="form-check-input"
                            id="SMSFInvestmentProperties1"
                            value="No"
                            onChange={handleChange}
                            checked={values.SMSFInvestmentProperties === "No"}
                          />
                          <label
                            htmlFor="SMSFInvestmentProperties1"
                            className="label1"
                          >
                            <span>No</span>
                          </label>
                          <input
                            type="radio"
                            name="SMSFInvestmentProperties"
                            id="SMSFInvestmentProperties2"
                            className="form-check-input"
                            value="Yes"
                            onChange={handleChange}
                            checked={values.SMSFInvestmentProperties === "Yes"}
                          />
                          <label
                            htmlFor="SMSFInvestmentProperties2"
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

                {values.SMSFInvestmentProperties === "Yes" &&
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
                        name="numberOfSMSFInvestmentProperties"
                        id="numberOfSMSFInvestmentProperties"
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

                <div className="row my-3 d-none">
                  <div className="col-md-12 ">
                    <div className="mb-3">
                      <label className="form-label">
                        Does your SMSF have any money in Pension Phase?{" "}
                      </label>
                      <div className="QuestionIcon ">
                        <img
                          className="img-fluid "
                          src={people}
                          alt=""
                        />
                      </div>
                      {/* switch button style */}
                      <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                        <div className="radiobutton">
                          <input
                            type="radio"
                            name="SMSFPensionPhase"
                            className="form-check-input"
                            id="SMSFPensionPhase1"
                            value="No"
                            onChange={handleChange}
                            checked={values.SMSFPensionPhase === "No"}
                          />
                          <label
                            htmlFor="SMSFPensionPhase1"
                            className="label1"
                          >
                            <span>No</span>
                          </label>
                          <input
                            type="radio"
                            name="SMSFPensionPhase"
                            id="SMSFPensionPhase2"
                            className="form-check-input"
                            value="Yes"
                            onChange={handleChange}
                            checked={values.SMSFPensionPhase === "Yes"}
                          />
                          <label
                            htmlFor="SMSFPensionPhase2"
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

export default QuestionsSMSF;
