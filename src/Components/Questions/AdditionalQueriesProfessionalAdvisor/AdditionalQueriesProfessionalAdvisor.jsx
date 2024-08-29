import React, { useEffect } from "react";
import "./AdditionalQueries.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import umbrela from "../svgs/WhatsApp Image 2023-08-11 at 19.13.12.jpg";
import will from "../svgs/page-with-curl-svgrepo-com.svg";
import advisor from "../svgs/online-interview-male-svgrepo-com.svg";
import building from "../svgs/building-small-svgrepo-com.svg";

import {
  faCircleInfo,
  faCircleQuestion,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import { useRecoilState, useRecoilValue } from "recoil";
import { QuestionShift, CRState, defaultUrl } from "../../../Store/Store";
import { Form, Formik } from "formik";
import { GetAxios, PatchAxios, PostAxios } from "../../Assets/Api/Api";
import DynamicQuestionBlocks from "../../Assets/DynamicQuestionBlocks/DynamicQuestionBlocks";
const AdditionalQueriesProfessionalAdvisor = (props) => {


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
      title: "Do you have any personal Insurance cover (Retail Cover Outside and Inside Super) ?",
      img: umbrela,
      key: "CoverOutsideIssuesradio",
    },
    {
      title: "Do you have Wills or Power of Attornies?",
      img: will,
      key: "PowerofAttorniesIssuesradio",
    },
    {
      title: "Do you have any Professional Advisers",
      img: advisor,
      key: "ProfessionalAdvisersIssuesradio",
    },
    {
      title: "Do you have any Business or Related Entities",
      img: building,
      key: "RelatedEntitiesIssuesradio",
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
              <h4 className="heading d-none">Professional Advisor</h4>

              <div className="row my-3 justify-content-center">
                <DynamicQuestionBlocks QuestionArray={QuestionArray} QuestionClick={QuestionClick} values={values} setFieldValue={setFieldValue} />

                <div className="col-md-12 d-none">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Do you have any personal Insurance cover (Retail Cover
                      Outside and Inside Super) ?
                    </label>
                    <div className="QuestionIcon">
                      <img className="img-fluid" src={umbrela} alt="" />
                    </div>
                    {/* health button style */}

                    <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                      <div className="radiobutton ">
                        <input
                          type="radio"
                          name="CoverOutsideIssuesradio"
                          id="CoverOutsideIssuesopt1"
                          value="No"
                          onChange={handleChange}
                          checked={values.CoverOutsideIssuesradio === "No"}
                        />
                        <label
                          htmlFor="CoverOutsideIssuesopt1"
                          className="label1"
                        >
                          <span>No</span>
                        </label>
                        <input
                          type="radio"
                          name="CoverOutsideIssuesradio"
                          id="CoverOutsideIssuesopt2"
                          value="Yes"
                          onChange={handleChange}
                          checked={values.CoverOutsideIssuesradio === "Yes"}
                        />
                        <label
                          htmlFor="CoverOutsideIssuesopt2"
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
                      Do you have Wills or Power of Attornies?
                    </label>
                    <div className="QuestionIcon">
                      <img className="img-fluid" src={will} alt="" />
                    </div>
                    {/* health button style */}

                    <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                      <div className="radiobutton">
                        <input
                          type="radio"
                          name="PowerofAttorniesIssuesradio"
                          id="PowerofAttorniesIssuesopt1"
                          value="No"
                          onChange={handleChange}
                          checked={values.PowerofAttorniesIssuesradio === "No"}
                        />
                        <label
                          htmlFor="PowerofAttorniesIssuesopt1"
                          className="label1"
                        >
                          <span>No</span>
                        </label>
                        <input
                          type="radio"
                          name="PowerofAttorniesIssuesradio"
                          id="PowerofAttorniesIssuesopt2"
                          value="Yes"
                          onChange={handleChange}
                          checked={values.PowerofAttorniesIssuesradio === "Yes"}
                        />
                        <label
                          htmlFor="PowerofAttorniesIssuesopt2"
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
                      Do you have any Professional Advisers
                    </label>
                    <div className="QuestionIcon">
                      <img className="img-fluid" src={advisor} alt="" />
                    </div>
                    {/* health button style */}

                    <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter ">
                      <div className="radiobutton">
                        <input
                          type="radio"
                          name="ProfessionalAdvisersIssuesradio"
                          id="ProfessionalAdvisersIssuesopt1"
                          value="No"
                          onChange={handleChange}
                          checked={values.ProfessionalAdvisersIssuesradio === "No"}
                        />
                        <label
                          htmlFor="ProfessionalAdvisersIssuesopt1"
                          className="label1"
                        >
                          <span>No</span>
                        </label>
                        <input
                          type="radio"
                          name="ProfessionalAdvisersIssuesradio"
                          id="ProfessionalAdvisersIssuesopt2"
                          value="Yes"
                          onChange={handleChange}
                          checked={values.ProfessionalAdvisersIssuesradio === "Yes"}
                        />
                        <label
                          htmlFor="ProfessionalAdvisersIssuesopt2"
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
                      Do you have any Business or Related Entities
                      <div className="d-inline-block float-end mx-2">
                        <FontAwesomeIcon
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="This includes any business you maybe involved in or other related Tax Structures like a Company , Business Trust  or Bucket Company."
                          icon={faCircleQuestion}
                        ></FontAwesomeIcon>
                      </div>
                    </label>
                    <div className="QuestionIcon">
                      <img className="img-fluid" src={building} alt="" />
                    </div>
                    {/* health button style */}

                    <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                      <div className="radiobutton">
                        <input
                          type="radio"
                          name="RelatedEntitiesIssuesradio"
                          id="RelatedEntitiesIssuesopt1"
                          value="No"
                          onChange={handleChange}
                          checked={values.RelatedEntitiesIssuesradio === "No"}
                        />
                        <label
                          htmlFor="RelatedEntitiesIssuesopt1"
                          className="label1"
                        >
                          <span>No</span>
                        </label>
                        <input
                          type="radio"
                          name="RelatedEntitiesIssuesradio"
                          id="RelatedEntitiesIssuesopt2"
                          value="Yes"
                          onChange={handleChange}
                          checked={values.RelatedEntitiesIssuesradio === "Yes"}
                        />
                        <label
                          htmlFor="RelatedEntitiesIssuesopt2"
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
                  <button
                    type="button" className="float-end btn w-25  btn-outline  backBtn mx-3"
                    onClick={() => {

                      setQuestionChange("SuperAndRetirement")
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

export default AdditionalQueriesProfessionalAdvisor;
