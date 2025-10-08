import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";

import TermImg from "../svgs/TermDepositCanva.png";
import PortFolio from "../svgs/portfolio.svg";
import funds from "../svgs/funds.svg";
import analytics from "../svgs/analytics.png";
import people from "../svgs/Questions_People.png";
import property from "../svgs/property-value.svg";
import investmentCircle from "../svgs/investmentCircle.png";


import { useRecoilState, useRecoilValue } from "recoil";
import { QuestionShift, CRState, defaultUrl } from "../../../Store/Store";
import { GetAxios, openNotificationSuccess, PatchAxios, PostAxios } from "../../Assets/Api/Api";
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
    {
      title: "Other Investment",
      img: investmentCircle,
      key: "SMSFOtherInvestment",
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
