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
    console.log(cLocation);
    setQuestionChange(cLocation)
    // fetchData();
    fetchDataAllInOne();
    FetchQuestions();

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
        if (CRObject.BusinessAsSMSF === "Yes") {
          Navigation("/SMSF")
        }
        else if (CRObject.BusinessAsInvestmentTrust === "Yes") {
          Navigation("/FamilyTrust")
        }
        else {
          Navigation("/Goals-And-Objectives");
          localStorage.removeItem("Question");
        }
        break;
      case "SMSF":
        if (CRObject.BusinessAsInvestmentTrust === "Yes") {
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
        localStorage.removeItem("Question");
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
        if (CRObject.BusinessAsSMSF === "Yes") {
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
      apiArray: [
        { url: `${DefaultUrl}/api/bankAccountFinance/${localStorage.getItem("UserID")}`, key: 'bankAccountFinance' },
        { url: `${DefaultUrl}/api/termDepositsFinance/${localStorage.getItem("UserID")}`, key: 'termDepositsFinance' },
        { url: `${DefaultUrl}/api/australianShareMarket/${localStorage.getItem("UserID")}`, key: 'australianShareMarket' },
        { url: `${DefaultUrl}/api/managedFund/${localStorage.getItem("UserID")}`, key: 'managedFund' },

        { url: `${DefaultUrl}/api/investmentBondFinance/${localStorage.getItem("UserID")}`, key: 'investmentBondFinance' },
        { url: `${DefaultUrl}/api/managedFundsLOC/${localStorage.getItem("UserID")}`, key: 'managedFundsLOC' },
        { url: `${DefaultUrl}/api/managedFundsMarginLoan/${localStorage.getItem("UserID")}`, key: 'managedFundsMarginLoan' },
      ]
    },
    PersonalAssets: {
      Title: "Personal Assets & Liabilities",
      apiArray: [
        { url: `${DefaultUrl}/api/car/${localStorage.getItem("UserID")}`, key: 'car' },
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
      apiArray: [
        { url: `${DefaultUrl}/api/will/${localStorage.getItem("UserID")}`, key: 'will' },
        { url: `${DefaultUrl}/api/POA/${localStorage.getItem("UserID")}`, key: 'POA' },
        { url: `${DefaultUrl}/api/professionalAdviser/${localStorage.getItem("UserID")}`, key: 'professionalAdviser' },
      ]
    },
    PersonalIncome: {
      Title: "Personal Income and Expenses",
      apiArray: [
        { url: `${DefaultUrl}/api/incomeFromOwnBusiness/${localStorage.getItem("UserID")}`, key: 'incomeFromOwnBusiness' },
        { url: `${DefaultUrl}/api/incomeFromSoleTrader/${localStorage.getItem("UserID")}`, key: 'incomeFromSoleTrader' },
        { url: `${DefaultUrl}/api/incomeFromPartnership/${localStorage.getItem("UserID")}`, key: 'incomeFromPartnership' },
        { url: `${DefaultUrl}/api/incomeFromCentrelink/${localStorage.getItem("UserID")}`, key: 'incomeFromCentrelink' },
        { url: `${DefaultUrl}/api/incomeFromSuperPayment/${localStorage.getItem("UserID")}`, key: 'incomeFromSuperPayment' },
        { url: `${DefaultUrl}/api/incomeFromOverseasPension/${localStorage.getItem("UserID")}`, key: 'incomeFromOverseasPension' },
        { url: `${DefaultUrl}/api/incomeFromInheritance/${localStorage.getItem("UserID")}`, key: 'incomeFromInheritance' },
        { url: `${DefaultUrl}/api/incomeFromLumpsumExpense/${localStorage.getItem("UserID")}`, key: 'incomeFromLumpsumExpense' },
        { url: `${DefaultUrl}/api/generalLivingExpenses/${localStorage.getItem("UserID")}`, key: 'generalLivingExpenses' },
        { url: `${DefaultUrl}/api/retirementLivingExpenses/${localStorage.getItem("UserID")}`, key: 'retirementLivingExpenses' },
      ]
    },
    BusinessEntities: {
      Title: "Business Entities & Tax Structures",
      apiArray: [
        { url: `${DefaultUrl}/api/BusinessAsCompanyStructure/${localStorage.getItem("UserID")}`, key: 'BusinessAsCompanyStructure' },
        { url: `${DefaultUrl}/api/BusinessAsTrusts/${localStorage.getItem("UserID")}`, key: 'BusinessAsTrusts' },
        { url: `${DefaultUrl}/api/BusinessAsSMSF/${localStorage.getItem("UserID")}`, key: 'BusinessAsSMSF' },
        { url: `${DefaultUrl}/api/BusinessAsInvestmentTrust/${localStorage.getItem("UserID")}`, key: 'BusinessAsInvestmentTrust' },
      ]
    },
    SMSF: {
      Title: "Self Manged Super Fund",
      apiArray: [
        { url: `${DefaultUrl}/api/SMSFDetails/${localStorage.getItem("UserID")}`, key: 'SMSFDetails' },
        { url: `${DefaultUrl}/api/SMSFAccumulationDetails/${localStorage.getItem("UserID")}`, key: 'SMSFAccumulationDetails' },
        { url: `${DefaultUrl}/api/SMSFBank/${localStorage.getItem("UserID")}`, key: 'SMSFBank' },
        { url: `${DefaultUrl}/api/SMSFTermDeposits/${localStorage.getItem("UserID")}`, key: 'SMSFTermDeposits' },
        { url: `${DefaultUrl}/api/SMSFAustralianShares/${localStorage.getItem("UserID")}`, key: 'SMSFAustralianShares' },
        { url: `${DefaultUrl}/api/SMSFManagedFunds/${localStorage.getItem("UserID")}`, key: 'SMSFManagedFunds' },
        { url: `${DefaultUrl}/api/SMSFInvestmentLoan/${localStorage.getItem("UserID")}`, key: 'SMSFInvestmentLoan' },
        { url: `${DefaultUrl}/api/SMSFInvestmentProperties/${localStorage.getItem("UserID")}`, key: 'SMSFInvestmentProperties' },
        { url: `${DefaultUrl}/api/SMSFInvestmentPropertiesLoan/${localStorage.getItem("UserID")}`, key: 'SMSFInvestmentPropertiesLoan' },
        { url: `${DefaultUrl}/api/SMSFInvestmentExpenses/${localStorage.getItem("UserID")}`, key: 'SMSFInvestmentExpenses' },
        { url: `${DefaultUrl}/api/SMSFPensionPhase/${localStorage.getItem("UserID")}`, key: 'SMSFPensionPhase' },
      ]
    },
    FamilyTrust: {
      Title: "Family Trust",
      apiArray: [
        { url: `${DefaultUrl}/api/familyDetails/${localStorage.getItem("UserID")}`, key: 'familyDetails' },
        { url: `${DefaultUrl}/api/familyBank/${localStorage.getItem("UserID")}`, key: 'familyBank' },
        { url: `${DefaultUrl}/api/familyTermDeposit/${localStorage.getItem("UserID")}`, key: 'familyTermDeposit' },
        { url: `${DefaultUrl}/api/familyAustralianShare/${localStorage.getItem("UserID")}`, key: 'familyAustralianShare' },
        { url: `${DefaultUrl}/api/familyMangedFunds/${localStorage.getItem("UserID")}`, key: 'familyMangedFunds' },
        { url: `${DefaultUrl}/api/familyInvestmentHomeLoan/${localStorage.getItem("UserID")}`, key: 'familyInvestmentHomeLoan' },
        { url: `${DefaultUrl}/api/familyInvestmentProperties/${localStorage.getItem("UserID")}`, key: 'familyInvestmentProperties' },
        { url: `${DefaultUrl}/api/familyInvestmentPropertiesLoan/${localStorage.getItem("UserID")}`, key: 'familyInvestmentPropertiesLoan' },
        { url: `${DefaultUrl}/api/familyInvestmentExpenses/${localStorage.getItem("UserID")}`, key: 'familyInvestmentExpenses' },
      ]
    },
    PersonalInsurance: {
      Title: "Personal Insurance",
      apiArray: [
        { url: `${DefaultUrl}/api/incomeProtection/${localStorage.getItem("UserID")}`, key: "incomeProtection", },
        { url: `${DefaultUrl}/api/TPD/${localStorage.getItem("UserID")}`, key: "TPD", },
        { url: `${DefaultUrl}/api/life/${localStorage.getItem("UserID")}`, key: "life", },
        { url: `${DefaultUrl}/api/trauma/${localStorage.getItem("UserID")}`, key: "trauma", },
      ],
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
