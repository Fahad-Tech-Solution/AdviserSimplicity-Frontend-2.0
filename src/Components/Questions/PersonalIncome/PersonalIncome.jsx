import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

// import React from "react";

import Businessman from "../svgs/businessman.svg";
import businessIncome from "../svgs/business-income.png";
import businessPartnership from "../svgs/businessPartnership.png";
import Gears from "../svgs/gears-gear-svgrepo-com.svg";
import money from "../svgs/money-3.svg";
import overseas from "../svgs/overseas.svg";
import inheritance from "../svgs/inheritance.png";
import moneyBag from "../svgs/money-bag-svgrepo-com.svg";

import { useRecoilState, useRecoilValue } from "recoil";
import { QuestionShift, CRState, defaultUrl } from "../../../Store/Store";
import {
  GetAxios,
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
} from "../../Assets/Api/Api";
import { Image } from "react-bootstrap";
import DynamicQuestionBlocks from "../../Assets/DynamicQuestionBlocks/DynamicQuestionBlocks";

const PersonalIncome = (props) => {
  let [CRObject, setCRObject] = useRecoilState(CRState);

  const [flagState, setFlagState] = useState(false);

  let DefaultUrl = useRecoilValue(defaultUrl);

  const FetchQuestions = async () => {
    try {
      const res = await GetAxios(
        `${DefaultUrl}/api/questions/${localStorage.getItem("UserID")}`
      );
      if (res) {
        setCRObject(res);
        setFlagState(true);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    if (CRObject._id) {
      setFlagState(true);
    } else {
      FetchQuestions();
    }
  }, []);

  const handleResponse = (values) => {
    setCRObject(values);
    localStorage.setItem("QuestionsState", JSON.stringify(values));
    props.setQuestionChange(false);
    localStorage.setItem("Question", "PersonalAssets");
  };

  const onSubmit = async (values) => {
    let obj = JSON.parse(JSON.stringify(values));
    obj.clientFK = localStorage.getItem("UserID");

    try {
      if (!flagState) {
        const PostRes = await PostAxios(`${DefaultUrl}/api/questions/Add`, obj);
        if (PostRes) {
          if (props.flagState) {
            props.setFlagState(false);
          }
          handleResponse(PostRes);
        }
      } else {
        const PatchRes = await PatchAxios(
          `${DefaultUrl}/api/questions/Update/${localStorage.getItem(
            "UserID"
          )}`,
          obj
        );
        if (PatchRes) {
          if (props.flagState) {
            props.setFlagState(false);
          }
          handleResponse(PatchRes);
        }
      }
      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        'Data of "' + props.modalObject.title + '" is Saved'
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        'Data of "' +
          props.modalObject.title +
          '" is not Saved Please! try again'
      );
    }
  };

  let QuestionArray = [
    {
      title: "Employment Income",
      key: "incomeFromOwnBusiness",
      img: Businessman,
    },
    {
      title: "Sole Trader Income",
      key: "incomeFromSoleTrader",
      img: businessIncome,
    },
    {
      title: "Partnership Income",
      img: businessPartnership,
      key: "incomeFromPartnership",
    },
    {
      title: "Centrelink Payments/Benefits",
      img: Gears,
      key: "incomeFromCentrelink",
      info: "This includes Family Tax Benefit (A&B) Payments and any Centrelink Cards",
    },
    {
      title: "Lifetime/Defined Benefit Super Pensions",
      img: money,
      key: "incomeFromSuperPayment",
    },
    {
      title: "Overseas Pensions",
      img: overseas,
      key: "incomeFromOverseasPension",
    },
  ];
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
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <div className="col-md-12 text-center">
                <div className="row my-3 justify-content-center">
                  <DynamicQuestionBlocks
                    QuestionArray={QuestionArray}
                    QuestionClick={QuestionClick}
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                </div>

                <div className="row mt-2 d-none">
                  <div className="col-md-12">
                    <button
                      onClick={() => {}}
                      type="submit"
                      className="float-end btn w-25  bgColor modalBtn"
                    >
                      Next
                    </button>
                    <button
                      onClick={() => {}}
                      className="float-end btn w-25  btn-outline  backBtn mx-3 d-none"
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

export default PersonalIncome;
