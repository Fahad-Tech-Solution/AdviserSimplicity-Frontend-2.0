import React, { useEffect, useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  BankDetail,
  CRState,
  defaultUrl,
  QuestionDetail,
  QuestionShift,
} from "../../Store/Store";
import "./Questions.css";

// import QuestionCards from "./FinancialInvestments/QuestionCards";

import Add from "../Questions/svgs/add-circle-solid-svgrepo-com.svg";

import ModalComponent from "../Questions/FinancialInvestments/ModalComponent";

import { Element, scroller } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";
import { GetAxios } from "../Assets/Api/Api";
import QuestionCards from "../Questions/FinancialInvestments/QuestionCards";
import { content } from "../../Content/Content";

const QuestionsNew = (props) => {
  let [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);
  let [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);
  let CRObject = useRecoilValue(CRState);

  let [flagState, setFlagState] = useState(false);
  let [flagState2, setFlagState2] = useState(true);

  let [modalObject, setModalObject] = useState({
    title: "Questions",
    Input: "Name",
  });

  let location = useLocation();

  let { itemsOpt } = content;

  useEffect(() => {
    // console.log(location)
    selectQuestionSet(location.pathname);
    if (location.pathname === "/user/business-entities") {
      // alert("ma chala")
      setFlagState2(false);
    } else {
      setFlagState2(true);
    }
  }, [location]);

  let selectQuestionSet = async (path) => {
    let cLocation = path;
    // console.log("Question Setting:", cLocation, CRObjectNoUse);

    setQuestionChange(cLocation);

    // console.log("QuestionDetails Data condition :", Object.keys(questionDetail).length)

    if (questionDetail && Object.keys(questionDetail).length <= 0) {
      fetchDataAllInOne();
    }

    if (!CRObjectNoUse?._id) {
      FetchQuestions();
    }
  };

  let [CRObjectNoUse, setCRObject] = useRecoilState(CRState);

  const FetchQuestions = async () => {
    try {
      const res = await GetAxios(
        `${DefaultUrl}/api/questions/${localStorage.getItem("UserID")}`
      );
      if (res) {
        setCRObject(res);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const fetchDataAllInOne = async () => {
    try {
      const res = await GetAxios(
        `${DefaultUrl}/api/dataOfAllSection/${localStorage.getItem("UserID")}`
      );
      // console.log(JSON.stringify(res), ":res of get all inner Question Data")
      if (res) {
        setQuestionDetail(res);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  let Navigation = useNavigate();

  const HandleSubmit = () => {
    // Find the current item index based on the QuestionChange state
    const currentIndex = content.itemsOpt.findIndex(
      (item) => item.route === `${QuestionChange}`
    );
    // alert("Current Index :" + currentIndex);
    // Find the next valid route by incrementing the index and checking the condition
    let nextIndex = currentIndex + 1;

    // console.log("Current Index :", itemsOpt[nextIndex]);
    while (nextIndex < itemsOpt.length) {
      const nextItem = itemsOpt[nextIndex];
      if (nextItem.condition(CRObject)) {
        // alert(nextItem.route);
        Navigation(nextItem.route);
        break;
      }
      nextIndex++;
    }

    // Handle case where no next route is found (end of the list)
    if (nextIndex >= itemsOpt.length) {
      Navigation("/user/goals-and-objectives");

      console.log("End of navigation, no further steps.");
    }
  };

  const BackHandle = () => {
    // Ensure flagState2 check is performed
    if (location.pathname === "/user/business-entities") {
    } else if (!flagState2) {
      setFlagState2(true);
      return;
    }

    // Find the current item index based on the QuestionChange state
    const currentIndex = content.itemsOpt.findIndex(
      (item) => item.route === `${QuestionChange}`
    );

    // Find the previous valid route by decrementing the index and checking the condition
    let prevIndex = currentIndex - 1;
    while (prevIndex >= 0) {
      const prevItem = itemsOpt[prevIndex];
      if (prevItem.condition(CRObject)) {
        if (prevItem.route === "/user/personal-detail") {
          let Email = localStorage.getItem("Email");
          if (Email) {
            Navigation("/user/personal-detail#" + Email);
          } else {
            Navigation("/user/personal-detail");
          }
        } else {
          Navigation(prevItem.route);
        }
        break;
      }
      prevIndex--;
    }

    // Handle case where no previous route is found (start of the list)
    if (prevIndex < 0) {
      console.log("Beginning of navigation, no previous steps.");
    }
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

  let obj = {
    "/user/financial-investments": {
      Title: "Financial Investments",
    },
    "/user/personal-assets": {
      Title: "Personal Assets & Liabilities",
    },
    "/user/life-Style": {
      Title: "Property",
    },
    "/user/investment": {
      Title: "Investment",
    },
    "/user/super-and-retirement": {
      Title: "Super and Retirement",
    },
    "/user/estate-planning": {
      Title: "Estate Planning & Professional Adviser",
    },
    "/user/personal-income": {
      Title: "Personal Income and Expenses",
    },
    "/user/business-entities": {
      Title: "Business Entities & Tax Structures",
    },
    "/user/SMSF": {
      Title: "Self Manged Super Fund",
    },
    "/user/family-trust": {
      Title: "Family Trust",
    },
    "/user/personal-insurance": {
      Title: "Personal Insurance",
    },
  };

  return (
    <div className="container-fluid mb-4 ">
      <Element name="Empty"></Element>
      <div className="row m-0">
        <div className="col-md-12">
          <div className="pb-4 bg-white  borderOverAll  rounded text-center">
            <div>
              <div
                className="QuestionIcon p-3 curser-pointer"
                onClick={() => {
                  setFlagState(true);
                  if (obj[QuestionChange].Title === "Personal Insurance") {
                    setModalObject({
                      title: "Personal Insurance",
                      Input: "Name",
                    });
                  } else {
                    setModalObject({
                      title: "Questions",
                      Input: "Name",
                    });
                  }
                }}
              >
                <img className="img-fluid min-w-25" src={Add} alt="" />
              </div>
            </div>

            <QuestionCards Question={QuestionChange} />

            <ModalComponent
              setQuestionChange={setFlagState2}
              Question={QuestionChange}
              modalObject={modalObject}
              setFlagState={setFlagState}
              flagState={flagState}
            >
              {props.children
                ? React.cloneElement(props.children)
                : "no Child exist"}
            </ModalComponent>

            <div className="row mt-2">
              <div className="col-md-12">
                <button
                  onClick={BackHandle}
                  className="float-center btn w-25 btn-outline backBtn mx-3"
                >
                  Back
                </button>
                <button
                  onClick={HandleSubmit}
                  className="float-center btn w-25  bgColor modalBtn"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsNew;
