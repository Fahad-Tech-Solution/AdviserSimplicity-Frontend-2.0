import React, { useEffect, useState } from "react";
import LifestyleAssetsAndDebt from "./LifestyleAssetsAndDebt/LifestyleAssetsAndDebt";
import AdditionalQueriesPersonalAssets from "./AdditionalQueriesPersonalAssets/AdditionalQueriesPersonalAssets";
import AdditionalQueriesInvestment from "./AdditionalQueriesInvestment/AdditionalQueriesInvestment";
import QuestionsSMSF from "./QuestoinsSMSF/QuestoinsSMSF";
import QuestionsInvestmentTrust from "./QuestionsInvestmentTrust/QuestionsInvestmentTrust";
import AdditionalQueriesProfessionalAdvisor from "./AdditionalQueriesProfessionalAdvisor/AdditionalQueriesProfessionalAdvisor";
import AdditionalQueriesSuperAndRetirement from "./AdditionalQueriesSuperAndRetirement/AdditionalQueriesSuperAndRetirement";

import { useRecoilState } from "recoil";
import { QuestionShift } from "../../Store/Store";
import './Questions.css'
import FinancialInvestments from "./FinancialInvestments/FinancialInvestments";
import QuestionCards from "./FinancialInvestments/QuestionCards";


import Add from "./svgs/add-circle-solid-svgrepo-com.svg";

import ModalComponent from "./FinancialInvestments/ModalComponent";
import { Element, scroller } from 'react-scroll';
import { useLocation, useNavigate } from "react-router-dom";
import EstatePlanning from "./EstatePlanning/EstatePlanning";

const Questions = () => {

  let [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);
  let [flagState, setFlagState] = useState(false);
  let [flagState2, setFlagState2] = useState(true);
  let [modalObject, setModalObject] = useState({
    title: "Questions",
    Input: "Name"
  });

  let location = useLocation();
  let hashing = location.hash;

  useEffect(() => {
    if (hashing) {
      setQuestionChange(hashing);
    }
    else if (localStorage.getItem("Question")) {
      setQuestionChange(localStorage.getItem("Question"));
    }
  }, [])

  useEffect(() => {

    setModalObject(pre => ({ ...pre, title: obj[QuestionChange] }))

    scroller.scrollTo("Empty", {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });

  }, [QuestionChange]);

  let Navigation = useNavigate();

  let HandleSubmit = () => {

    setFlagState2(true)

    switch (QuestionChange) {
      case "FinancialInvestments":
        setQuestionChange("PersonalAssets")
        break;
      case "PersonalAssets":
        setQuestionChange("Lifestyle")
        break;
      case "Lifestyle":
        setQuestionChange("Investment")
        break;
      case "Investment":
        setQuestionChange("SuperAndRetirement")
        break;
      case "SuperAndRetirement":
        setQuestionChange("EstatePlanning")
        break;
      case "EstatePlanning":
        setQuestionChange("ProfessionalAdvisor")
        break;
      case "ProfessionalAdvisor":
        setQuestionChange("SMSF")
        break;
      case "SMSF":
        setQuestionChange("InvestmentTrust")
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
        Navigation("/PersonalDetail");
        localStorage.removeItem("Question");
        break;
      case "PersonalAssets":
        setQuestionChange("FinancialInvestments")
        setFlagState2(false)
        break;
      case "Lifestyle":
        setQuestionChange("PersonalAssets")
        setFlagState2(false)
        break;
      case "Investment":
        setQuestionChange("Lifestyle")
        setFlagState2(false)
        break;
      case "SuperAndRetirement":
        setQuestionChange("Investment")
        setFlagState2(false)
        break;
      case "EstatePlanning":
        setQuestionChange("SuperAndRetirement")
        setFlagState2(false)
        break;
      case "ProfessionalAdvisor":
        setQuestionChange("EstatePlanning")
        setFlagState2(false)
        break;
      case "SMSF":
        setQuestionChange("ProfessionalAdvisor")
        setFlagState2(false)
        break;
      case "InvestmentTrust":
        setQuestionChange("SMSF")
        setFlagState2(false)
        break;

      default:
        console.log("aywayn")
        break;
    }

  }

  let obj = {
    FinancialInvestments: "Financial Investments",
    PersonalAssets: "Personal Assets & Liabilities ",
    Lifestyle: "Property",
    Investment: "Investment",
    SuperAndRetirement: "Super and Retirement",
    EstatePlanning: "Estate Planning & Professional Adviser",
    ProfessionalAdvisor: "Professional Advisor",
    SMSF: "Self Manged Super Fund ",
    InvestmentTrust: "InvestmentTrust",
  }

  return (
    <div className="container-fluid my-4 ">
      <Element name="Empty"></Element>
      <div className="row m-0">
        <div className="col-md-12">
          <div className="py-4 bg-white  borderOverAll  rounded text-center">

            {flagState2 ?
              <div>
                <h4 className="heading text-green" onClick={() => { console.log("object:", CRObject) }}> {obj[QuestionChange]} (Client, Partner, Joint)</h4>
                <div className="QuestionIcon p-3 curser-pointer" onClick={() => setFlagState(true)}>
                  <img className="img-fluid min-w-25" src={Add} alt="" />
                </div>
              </div> :
              <QuestionCards Question={QuestionChange} />
            }



            <ModalComponent setQuestionChange={setFlagState2} Question={QuestionChange} modalObject={modalObject} setFlagState={setFlagState} flagState={flagState}>

              {QuestionChange == "FinancialInvestments" ? <FinancialInvestments /> :
                QuestionChange == "PersonalAssets" ? <AdditionalQueriesPersonalAssets /> :
                  QuestionChange == "Lifestyle" ? <LifestyleAssetsAndDebt /> :
                    QuestionChange == "Investment" ? <AdditionalQueriesInvestment /> :
                      QuestionChange == "SuperAndRetirement" ? <AdditionalQueriesSuperAndRetirement /> :
                        QuestionChange == "EstatePlanning" ? <EstatePlanning /> :
                          QuestionChange == "ProfessionalAdvisor" ? <AdditionalQueriesProfessionalAdvisor /> :
                            QuestionChange == "SMSF" ? <QuestionsSMSF /> :
                              QuestionChange == "InvestmentTrust" ? <QuestionsInvestmentTrust /> : ""
              }

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

export default Questions;
