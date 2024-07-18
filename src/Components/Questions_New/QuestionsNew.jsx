import React, { useEffect, useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail, QuestionShift } from "../../Store/Store";
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
  let [flagState, setFlagState] = useState(false);
  let [flagState2, setFlagState2] = useState(true);
  let [modalObject, setModalObject] = useState({
    title: "Questions",
    Input: "Name"
  });

  let location = useLocation();

  useEffect(() => {

    console.log(location)
    selectQuestionSet(location.pathname)
    setFlagState2(true);

  }, [location])


  let selectQuestionSet = (path) => {
    let cLocation = path.replace("/", "");
    console.log(cLocation);
    setQuestionChange(cLocation)
    fetchData();
  }

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

      // if (allSuccessful) {
      //   setFlagState2(false);
      // }
    } catch (error) {
      console.error("An error occurred:", error);
      setQuestionDetail(updatedData);
    }
  }

  let Navigation = useNavigate();

  let HandleSubmit = () => {

    // setFlagState2(true)

    // if (!flagState2) {
    //   setFlagState2(true)
    //   return;
    // }

    switch (QuestionChange) {
      case "FinancialInvestments":
        // Navigation("/PersonalAssets")
        Navigation("/PersonalAssets")
        break;
      case "PersonalAssets":
        Navigation("/Lifestyle")
        break;
      case "Lifestyle":
        Navigation("/Investment")
        break;
      case "Investment":
        Navigation("/SuperAndRetirement")
        break;
      case "SuperAndRetirement":
        Navigation("/EstatePlanning")
        break;
      case "EstatePlanning":
        Navigation("/ProfessionalAdvisor")
        break;
      case "ProfessionalAdvisor":
        Navigation("/SMSF")
        break;
      case "SMSF":
        Navigation("/InvestmentTrust")
        break;
      case "InvestmentTrust":
        Navigation("/Business-Tax-Structure");
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
      case "FinancialInvestments":
        Navigation("/PersonalDetail#" + localStorage.getItem("Email"));
        localStorage.removeItem("Question");
        break;
      case "PersonalAssets":
        Navigation("/FinancialInvestments")
        break;
      case "Lifestyle":
        Navigation("/PersonalAssets")
        break;
      case "Investment":
        Navigation("/Lifestyle")
        break;
      case "SuperAndRetirement":
        Navigation("/Investment")
        break;
      case "EstatePlanning":
        Navigation("/SuperAndRetirement")
        break;
      case "ProfessionalAdvisor":
        Navigation("/EstatePlanning")
        break;
      case "SMSF":
        Navigation("/ProfessionalAdvisor")
        break;
      case "InvestmentTrust":
        Navigation("/SMSF")
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
      apiArray: [
        { url: `${DefaultUrl}/api/bankAccountFinance/${localStorage.getItem("UserID")}`, key: 'BankAccountFinance' },
        { url: `${DefaultUrl}/api/termDeposit/${localStorage.getItem("UserID")}`, key: 'termDepositsFinance' },
        { url: `${DefaultUrl}/api/australianShareMarket/${localStorage.getItem("UserID")}`, key: 'australianSharesFinance' },
        { url: `${DefaultUrl}/api/manageFund/${localStorage.getItem("UserID")}`, key: 'managedFunds' },
        { url: `${DefaultUrl}/api/investmentBondFinance/${localStorage.getItem("UserID")}`, key: 'investmentBondFinance' },
        { url: `${DefaultUrl}/api/managedFundsLOC/${localStorage.getItem("UserID")}`, key: 'managedFundsLOC' },
        { url: `${DefaultUrl}/api/managedFundsMarginLoan/${localStorage.getItem("UserID")}`, key: 'managedFundsMarginLoan' },
      ]
    },
    PersonalAssets: {
      Title: "Personal Assets & Liabilities",
      apiArray: [
        { url: `${DefaultUrl}/api/car/${localStorage.getItem("UserID")}`, key: 'cars' },
        { url: `${DefaultUrl}/api/boat/${localStorage.getItem("UserID")}`, key: 'boat' },
        { url: `${DefaultUrl}/api/caravan/${localStorage.getItem("UserID")}`, key: 'caravan' },
        { url: `${DefaultUrl}/api/personalAssets/${localStorage.getItem("UserID")}`, key: 'personalAssets' },
        { url: `${DefaultUrl}/api/personalLoans/${localStorage.getItem("UserID")}`, key: 'personalLoans' },
        { url: `${DefaultUrl}/api/creditCards/${localStorage.getItem("UserID")}`, key: 'creditCards' },
      ]
    },
    Lifestyle: {
      Title: "Property",
      apiArray: [
        { url: `${DefaultUrl}/api/familyHome/${localStorage.getItem("UserID")}`, key: 'familyHome' },
        { url: `${DefaultUrl}/api/familyHomeLoan/${localStorage.getItem("UserID")}`, key: 'familyHomeLoan' },
        { url: `${DefaultUrl}/api/holidayHome/${localStorage.getItem("UserID")}`, key: 'holidayHome' },
        { url: `${DefaultUrl}/api/holidayHomeLoan/${localStorage.getItem("UserID")}`, key: 'holidayHomeLoan' },
      ]
    },
    Investment: {
      Title: "Investment",
      apiArray: [
        { url: `${DefaultUrl}/api/investmentPropertyDetails/${localStorage.getItem("UserID")}`, key: 'investmentPropertyDetails' },
        { url: `${DefaultUrl}/api/investmentPropertyLoan/${localStorage.getItem("UserID")}`, key: 'investmentPropertyLoan' },
        { url: `${DefaultUrl}/api/incomeExpenses/${localStorage.getItem("UserID")}`, key: 'incomeExpenses' },
      ]
    },
    SuperAndRetirement: {
      Title: "Super and Retirement",
      apiArray: [
        { url: `${DefaultUrl}/api/superAnnuationIssues/${localStorage.getItem("UserID")}`, key: 'superAnnuationIssues' },
        { url: `${DefaultUrl}/api/accountBasedPensionIssues/${localStorage.getItem("UserID")}`, key: 'accountBasedPensionIssues' },
        { url: `${DefaultUrl}/api/annuitiesIssues/${localStorage.getItem("UserID")}`, key: 'annuitiesIssues' },
      ]
    },
    EstatePlanning: {
      Title: "Estate Planning & Professional Adviser",
    },
    ProfessionalAdvisor: {
      Title: "Professional Advisor",
    },
    SMSF: {
      Title: "Self Manged Super Fund ",
    },
    InvestmentTrust: {
      Title: "InvestmentTrust",
    },
  }

  return (
    <div className="container-fluid my-4 ">
      <Element name="Empty"></Element>
      <div className="row m-0">
        <div className="col-md-12">
          <div className="py-4 bg-white  borderOverAll  rounded text-center">

            {flagState2 ?
              <div>
                <h4 className="heading text-green" onClick={() => { console.log("object:", CRObject) }}> {obj[QuestionChange].Title} (Client, Partner, Joint)</h4>
                <div className="QuestionIcon p-3 curser-pointer" onClick={() => setFlagState(true)}>
                  <img className="img-fluid min-w-25" src={Add} alt="" />
                </div>
              </div> :
              <QuestionCards Question={QuestionChange} />
            }

            {/**
              <div> "what to do" </div>
                */}

            <ModalComponent setQuestionChange={setFlagState2} Question={QuestionChange} modalObject={modalObject} setFlagState={setFlagState} flagState={flagState}>

              {props.children ? (
                React.cloneElement(props.children)
              ) : "no Child exist"}

            </ModalComponent>



            <div className="row mt-2">
              <div className="col-md-12">
                <button
                  onClick={HandleSubmit}
                  className="float-end btn w-25  bgColor modalBtn"
                >
                  Next
                </button>

                <button
                  onClick={BackHandle}
                  className="float-end btn w-25  btn-outline  backBtn mx-3">
                  Back
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
