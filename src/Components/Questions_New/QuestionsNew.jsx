import React, { useEffect, useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { CRState, defaultUrl, QuestionDetail, QuestionShift } from "../../Store/Store";
import './Questions.css'

// import QuestionCards from "./FinancialInvestments/QuestionCards";

import Add from "../Questions/svgs/add-circle-solid-svgrepo-com.svg";

import ModalComponent from "../Questions/FinancialInvestments/ModalComponent";

import { Element, scroller } from 'react-scroll';
import { useLocation, useNavigate } from "react-router-dom";
import { GetAxios } from "../Assets/Api/Api";
import QuestionCards from "../Questions/FinancialInvestments/QuestionCards";

const QuestionsNew = (props) => {

  let [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);
  let [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);
  let CRObject = useRecoilValue(CRState);

  let [flagState, setFlagState] = useState(false);
  let [flagState2, setFlagState2] = useState(true);

  let [modalObject, setModalObject] = useState({
    title: "Questions",
    Input: "Name"
  });

  let location = useLocation();

  useEffect(() => {

    // console.log(location)
    selectQuestionSet(location.pathname)
    setFlagState2(true);

  }, [location])

  let selectQuestionSet = async (path) => {
    let cLocation = path.replace("/", "");
    console.log("Question Setting:", cLocation, CRObjectNoUse);
    setQuestionChange(cLocation)
    // fetchData();

    if (questionDetail && Object.keys(questionDetail).length < 0) {
      fetchDataAllInOne();
    }

    if (!CRObjectNoUse?._id) {
      FetchQuestions();
    }

  }

  let [CRObjectNoUse, setCRObject] = useRecoilState(CRState);

  const FetchQuestions = async () => {
    try {
      const res = await GetAxios(`${DefaultUrl}/api/questions/${localStorage.getItem("UserID")}`);
      if (res) {
        setCRObject(res);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const fetchDataAllInOne = async () => {
    try {
      const res = await GetAxios(`${DefaultUrl}/api/dataOfAllSection/${localStorage.getItem("UserID")}`);
      console.log(JSON.stringify(res), ":res of get all inner Question Data")
      if (res) {
        setQuestionDetail(res);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };


  async function fetchData() {
    let updatedData = { ...questionDetail };
    const userID = localStorage.getItem("UserID");

    const apiEndpoints = obj[QuestionChange].apiArray;

    const defaultFinanceData = {
      client: [],
      partner: [],
      joint: [],
    };

    // let allSuccessful = true;

    try {
      const fetchAndUpdateData = async (endpoint) => {
        try {
          const res = await GetAxios(endpoint.url);
          if (res) {
            updatedData = { ...updatedData, [endpoint.key]: res };
          } else {
            updatedData = { ...updatedData, [endpoint.key]: defaultFinanceData };
            // allSuccessful = false;
          }
        } catch (error) {
          updatedData = { ...updatedData, [endpoint.key]: defaultFinanceData };
          // allSuccessful = false;
          console.error(`Error fetching data from ${endpoint.url}:`, error);
        }
      };

      await Promise.all(apiEndpoints.map(fetchAndUpdateData));

      setQuestionDetail(updatedData);

    } catch (error) {
      console.error("An error occurred:", error);
      setQuestionDetail(updatedData);
    }
  }

  let Navigation = useNavigate();

  let HandleSubmit = () => {

    switch (QuestionChange) {

      case "PersonalIncome":
        Navigation("/PersonalAssets")
        break;
      case "PersonalAssets":
        Navigation("/FinancialInvestments")
        break;
      case "FinancialInvestments":
        Navigation("/SuperAndRetirement")
        break;
      case "SuperAndRetirement":
        Navigation("/Lifestyle")
        break;
      case "Lifestyle": //Property
        Navigation("/Investment")
        break;
      case "Investment": //Property investment
        Navigation("/EstatePlanning")
        break;
      case "EstatePlanning":
        Navigation("/PersonalInsurance")
        break;
      case "PersonalInsurance":
        Navigation("/BusinessEntities");
        break;
      case "BusinessEntities":
        if (CRObject.SMSFManagedFundsTab === "Yes") {
          Navigation("/SMSF")
        }
        else if (CRObject.businessAsInvestmentTab === "Yes") {
          Navigation("/FamilyTrust")
        }
        else {
          Navigation("/Goals-And-Objectives");
          localStorage.removeItem("Question");
        }
        break;
      case "SMSF":
        if (CRObject.businessAsInvestmentTab === "Yes") {
          Navigation("/FamilyTrust")
        }
        else {
          Navigation("/Goals-And-Objectives");
          localStorage.removeItem("Question");
        }
        break;
      case "FamilyTrust":
        Navigation("/Goals-And-Objectives");
        localStorage.removeItem("Question");
        break;


      default:
        console.log("aywayn")
        break;
    }

  }

  let BackHandle = () => {

    if (!flagState2) {
      setFlagState2(true)
      return;
    }

    switch (QuestionChange) {
      case "PersonalIncome":
        Navigation("/PersonalDetail#" + localStorage.getItem("Email"));
        // localStorage.removeItem("Question");
        break;
      case "PersonalAssets":
        Navigation("/PersonalIncome")
        break;
      case "FinancialInvestments":
        Navigation("/PersonalAssets")
        break;
      case "SuperAndRetirement":
        Navigation("/FinancialInvestments")
        break;
      case "Lifestyle": //Property
        Navigation("/SuperAndRetirement")
        break;
      case "Investment": //Property investment
        Navigation("/Lifestyle")
        break;
      case "EstatePlanning":
        Navigation("/Investment")
        break;
      case "PersonalInsurance":
        Navigation("/EstatePlanning");
        break;
      case "BusinessEntities":
        Navigation("/PersonalInsurance");
        break;
      case "SMSF":
        Navigation("/BusinessEntities");
        break;
      case "FamilyTrust":
        if (CRObject.SMSFManagedFundsTab === "Yes") {
          Navigation("/SMSF")
        }
        else {
          Navigation("/BusinessEntities");
        }
        break;

      default:
        console.log("")
        break;
    }

  }

  let DefaultUrl = useRecoilValue(defaultUrl)

  let obj = {
    FinancialInvestments: {
      Title: "Financial Investments",
    },
    PersonalAssets: {
      Title: "Personal Assets & Liabilities",
    },
    Lifestyle: {
      Title: "Property",
    },
    Investment: {
      Title: "Investment",
    },
    SuperAndRetirement: {
      Title: "Super and Retirement",
    },
    EstatePlanning: {
      Title: "Estate Planning & Professional Adviser",
    },
    PersonalIncome: {
      Title: "Personal Income and Expenses",
    },
    BusinessEntities: {
      Title: "Business Entities & Tax Structures"
    },
    SMSF: {
      Title: "Self Manged Super Fund",
    },
    FamilyTrust: {
      Title: "Family Trust",
    },
    PersonalInsurance: {
      Title: "Personal Insurance",

    },

  }

  return (
    <div className="container-fluid mb-4 ">
      <Element name="Empty"></Element>
      <div className="row m-0">
        <div className="col-md-12">
          <div className="pb-4 bg-white  borderOverAll  rounded text-center">

            {flagState2 ?
              <div>
                <h4 className="heading text-green d-none" onClick={() => { console.log("object:", CRObject) }}> {obj[QuestionChange].Title} </h4>
                <div className="QuestionIcon p-3 curser-pointer" onClick={() => setFlagState(true)}>
                  <img className="img-fluid min-w-25" src={Add} alt="" />
                </div>
              </div> :
              <QuestionCards Question={QuestionChange} />
            }

            <ModalComponent setQuestionChange={setFlagState2} Question={QuestionChange} modalObject={modalObject} setFlagState={setFlagState} flagState={flagState}>

              {props.children ? (
                React.cloneElement(props.children)
              ) : "no Child exist"}

            </ModalComponent>



            <div className="row mt-2">
              <div className="col-md-12">

                <button
                  onClick={BackHandle}
                  className="float-center btn w-25  btn-outline  backBtn mx-3">
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
