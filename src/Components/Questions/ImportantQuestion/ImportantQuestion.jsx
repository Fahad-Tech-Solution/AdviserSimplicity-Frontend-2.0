import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { scroller, Element } from "react-scroll";
import DynamicQuestionBlocks from "../../Assets/DynamicQuestionBlocks/DynamicQuestionBlocks";
import { useRecoilState, useRecoilValue } from "recoil";
import { CRState, defaultUrl, QuestionDetail } from "../../../Store/Store";

import Business_SMSF from "../svgs/money-bag-svgrepo-com.svg";
import Questions_People from "../svgs/Questions_People.png";

import Business_building from "../svgs/building-small-svgrepo-com.svg";
import Business_TeamHandshake from "../svgs/team_Handshake.png";

import insuranceProtection from "../svgs/insuranceProtection.png";
import propertyValue from "../svgs/property-value.svg";

import { Form, Formik } from "formik";
import {
  GetAxios,
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
} from "../../Assets/Api/Api";

const ImportantQuestion = (props) => {
  let [CRObjectNoUse, setCRObject] = useRecoilState(CRState);
  let CRObject = useRecoilValue(CRState);
  let [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);

  let DefaultUrl = useRecoilValue(defaultUrl);

  let Nav = useNavigate();

  let QuestionArray = [
    {
      title: "Investment Properties",
      img: propertyValue,
      key: "investmentPropertyTab",
    },
    {
      title: "Personal Insurance",
      img: insuranceProtection,
      key: "personalInsuranceTab",
    },
    {
      title: "A Company (Pty Ltd) Structure to run a business ",
      img: Business_building,
      key: "BusinessAsCompanyStructure",
    },
    // {
    //     title: "A Trust Structure to run a business ",
    //     img: Business_TeamHandshake,
    //     key: "BusinessAsTrusts",
    // },
    {
      title: "A Self-Managed Super Fund",
      img: Business_SMSF,
      key: "SMSFManagedFundsTab",
    },
    {
      title: "An Investment Family Trust ",
      img: Questions_People,
      key: "businessAsInvestmentTab",
    },
  ];
  const QuestionClick = (index, elem, values, setFieldValue) => {
    if (values[elem.key] == "No") {
      setFieldValue(elem.key, "Yes");
    }
    if (values[elem.key] == "Yes") {
      setFieldValue(elem.key, "No");
    }
  };

  const handleResponse = (values) => {
    setCRObject(values);
    localStorage.setItem("QuestionsState", JSON.stringify(values));
    localStorage.setItem("Question", "PersonalAssets");
    // Nav("/user/personal-income");
    props.flagState && props.setFlagState(false);
  };

  const onSubmit = async (values) => {
    let obj = JSON.parse(JSON.stringify(values));
    obj.clientFK = localStorage.getItem("UserID");

    try {
      if (!CRObject?._id) {
        // console.log("obj.clientFK", obj);
        const PostRes = await PostAxios(`${DefaultUrl}/api/questions/Add`, obj);
        if (PostRes) {
          // setFlagState(true);
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
          // setFlagState(true);
          handleResponse(PatchRes);
        }
      }

      // type, placement, message, description
      openNotificationSuccess(
        "success",
        "topRight",
        "Notification",
        "User Data Successfully Saved!"
      );
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={CRObject}
        onSubmit={onSubmit}
        enableReinitialize
        innerRef={props.formRef}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <div className="row px-5 mt-4">
              <div className="col-md-12 text-center ">
                <div className="row my-3 justify-content-center">
                  <DynamicQuestionBlocks
                    QuestionArray={QuestionArray}
                    QuestionClick={QuestionClick}
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ImportantQuestion;

// {props.Question ? Question : "Submit"}
