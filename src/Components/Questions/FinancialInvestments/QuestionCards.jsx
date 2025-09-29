import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

// import React from "react";

// import "./AdditionalQueries.css";
import BankImg from "../svgs/bank.svg";
import TermImg from "../svgs/TermDepositCanva.png";
import PortFolio from "../svgs/portfolio.svg";
import analytics from "../svgs/analytics.png";
import funds from "../svgs/funds.svg";
import certificate from "../svgs/certificate.svg";

//Q set 2 new
import car from "../svgs/car.svg";
import boat from "../svgs/boat.svg";
import trailer from "../svgs/trailer-caravan.svg";
import settingMoney from "../svgs/settingMoney.svg";
import moneyGiving from "../svgs/moneyGiving.png";

//Q set 3
import houseHold from "../svgs/warehouse-.svg";
import Questions_Home from "../svgs/home-svgrepo-com.svg";

//Q set 4
import property from "../svgs/property-value.svg";
import loan from "../svgs/loan.svg";
import rent from "../svgs/rent.svg";

//Q set 5
import piggybank1 from "../svgs/piggy-bank.svg";
import piggybank2 from "../svgs/piggy-bank-new.svg";
import calender from "../svgs/calendar.png";

//Q set 6
import will from "../svgs/page-with-curl-svgrepo-com.svg";
import POA from "../svgs/conversation-person-svgrepo-com.svg";
import advisor from "../svgs/online-interview-male-svgrepo-com.svg";

// Q set 7
import Businessman from "../svgs/businessman.svg";
import businessIncome from "../svgs/business-income.png";
import businessPartnership from "../svgs/businessPartnership.png";
import Gears from "../svgs/gears-gear-svgrepo-com.svg";
import money from "../svgs/money-3.svg";
import overseas from "../svgs/overseas.svg";
import inheritance from "../svgs/inheritance.png";
import moneyBag from "../svgs/money-bag-svgrepo-com.svg";
import moneyBagPng from "../svgs/money-bag.png";

import Business_building from "../svgs/building-small-svgrepo-com.svg";

//Q set 8
import people from "../svgs/property-value.svg";
import investmentCircle from "../svgs/investmentCircle.png";

import lifeImg from "../svgs/lifeimg.svg";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  QuestionShift,
  CRState,
  defaultUrl,
  QuestionDetail,
} from "../../../Store/Store";
import { Button, Card, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import ModalComponent from "./ModalComponent";

import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  toCommaAndDollar,
} from "../../Assets/Api/Api";

import InvestmentLoan from "./QuestionsDetail/InvestmentLoan";
import MarginLoan from "./QuestionsDetail/MarginLoan";
import PersonalLoan from "./QuestionsDetail/PersonalLoan";
import CreditCard from "./QuestionsDetail/CreditCard";

import InvestmentPropertyDetails from "./QuestionsDetail/InvestmentPropertyDetails";
import HolidayHome from "./QuestionsDetail/HolidayHome";

import EstatePlanningWill from "../EstatePlanning/EstatePlanningWill";
import EstatePlanningPOA from "../EstatePlanning/EstatePlanningPOA";
import EstatePlanningProfessionalAdviser from "../EstatePlanning/EstatePlanningProfessionalAdviser";

import HolidayHomeLoan from "./QuestionsDetail/HolidayHomeLoan";
import CenterLinkPayments from "../PersonalIncome/CenterLinkPayments";
import EmploymentIncome from "../PersonalIncome/EmploymentIncome";
import SoleTrader from "../PersonalIncome/SoleTrader";
import Partnership from "../PersonalIncome/Partnership";
import RegularLivingExpenses from "../PersonalIncome/RegularLivingExpenses";
import LifeTimeBeneFits from "../PersonalIncome/LifetimeBenefits";
import OverseasPension from "../PersonalIncome/OverseasPension";
import Inheritance from "../PersonalIncome/Inheritance";
import LumpsumExpenses from "../PersonalIncome/LumpsumExpenses";

import SmsfAccumulationDetails from "../QuestoinsSMSF/SmsfAccumulationDetails";
import SmsfDetails from "../QuestoinsSMSF/SmsfDetails";

import FamilyInvestmentProperty from "../QuestoinsFamilyTrust/FamilyInvestmentProperty";
import FamilyDetails from "../QuestoinsFamilyTrust/FamilyDetails";

import PersonalInsuranceLife from "../PersonalInsurance/LifeInsurance";
import CombinedSwitch from "../CombinedSwitch/CombinedSwitch";

//new comment

import { FaRegSave } from "react-icons/fa";
import AssetInfo from "../AdditionalQueriesPersonalAssets/AssetInfo";
import TowInOneSwitch from "../AdditionalQueriesPersonalAssets/TowInOneSwitch";
import OwnFamilyHome from "../AdditionalQueriesPersonalAssets/OwnFamilyHome";
import MiddleWare from "./MiddleWare";
import SampleOne from "../AdditionalQueriesPersonalAssets/SampleOne";
import PersonalInsuranceRenderCard from "./QuestionsDetail/PersonalInsuranceRenderCard";
import SMSFQCards from "../QuestoinsSMSF/SMSFQCards";

import SmsfPensionAccountMiddleWare from "../QuestoinsSMSF/PensionAccount";
import OtherInvestmentsDynamic from "../QuestoinsSMSF/OtherInvestmentsDynamic";

const QuestionCards = (props) => {
  let [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);
  let [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);

  let CRObject = useRecoilValue(CRState);
  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});
  let [arrayCount, setArrayCount] = useState();

  let arrayObj = {
    "/user/personal-assets": [
      {
        title: "Own a Family Home",
        key: "familyHome",
        img: Questions_Home,
      },
      {
        title: "Car",
        key: "car",
        api: "/car",
        img: car,
      },
      {
        title: "House hold",
        key: "houseHold",
        api: "/houseHold",
        img: houseHold,
      },
      {
        title: "Boat",
        key: "boat",
        api: "/boat",
        img: boat,
      },
      {
        title: "Caravan",
        key: "caravan",
        api: "/caravan",
        img: trailer,
      },
      {
        title: "Other Assets",
        key: "otherAssets",
        api: "/personalAssets",
        img: settingMoney,
      },
      {
        title: "Personal Debt",
        key: "personalLoans",
        img: moneyGiving,
      },
    ],
    "/user/life-Style": [
      {
        title: "Own a Family Home",
        key: "familyHome",
        img: Questions_Home,
      },
      {
        title: "Home Loan",
        key: "familyHomeLoan",
        img: loan,
      },
    ],
    "/user/financial-investments": [
      {
        title: "Bank Accounts",
        key: "bankAccountFinance",
        img: BankImg,
      },
      {
        title: "Term Deposits",
        key: "termDepositsFinance",
        img: TermImg,
      },
      {
        title: "Australian Shares/ETFs",
        key: "australianShareMarket",
        img: PortFolio,
      },
      {
        title: "Platform Investments",
        key: "managedFund",
        img: funds,
      },
      {
        title: "Investment Bond",
        key: "investmentBondFinance",
        img: certificate,
      },
      //SuperAndRetirement
      {
        title: "Super Funds",
        key: "superAnnuationIssues",
        img: piggybank1,
      },
      {
        title: "Account Based Pension",
        key: "accountBasedPensionIssues",
        img: piggybank2,
      },
      {
        title: "Annuities",
        key: "annuitiesIssues",
        img: calender,
      },
      // Investment
      {
        title: "Investment Properties",
        key: "investmentPropertyDetails",
        img: property,
      },
      {
        title: "Investment Loan",
        key: "managedFundsLOC",
        img: loan,
      },
      {
        title: "Margin Loan",
        key: "managedFundsMarginLoan",
        img: analytics,
      },
    ],
    "/user/super-and-retirement": [
      {
        title: "Super Funds",
        key: "superAnnuationIssues",
        img: piggybank1,
      },
      {
        title: "Account Based Pension",
        key: "accountBasedPensionIssues",
        img: piggybank2,
      },
      {
        title: "Invested in Annuities",
        key: "annuitiesIssues",
        img: calender,
      },
    ],
    "/user/investment": [
      {
        title: "Investment Properties",
        key: "investmentPropertyDetails",
        img: property,
      },
      {
        title: "Investment Property Loan",
        key: "investmentPropertyLoan",
        img: loan,
      },
      {
        title: "Income & Expenses",
        key: "incomeExpenses",
        img: rent,
      },
    ],
    "/user/estate-planning": [
      {
        title: "Wills",
        key: "will",
        img: will,
      },
      {
        title: "Power of Attorneys",
        key: "POA",
        img: POA,
      },
      {
        title: "Professional Advisers",
        key: "professionalAdviser",
        img: advisor,
      },
    ],
    "/user/personal-income": [
      {
        title: "Employement Income",
        key: "incomeFromOwnBusiness",
        img: Businessman,
      },
      {
        title: "Sole Trader",
        key: "incomeFromSoleTrader",
        img: businessIncome,
      },
      {
        title: "Partnership",
        key: "incomeFromPartnership",
        img: businessPartnership,
      },
      {
        title: "Centerlink Payments",
        key: "incomeFromCentrelink",
        img: Gears,
      },
      {
        title: "LifeTime Benefits",
        key: "incomeFromSuperPayment",
        img: money,
      },
      {
        title: "Overseas Pension",
        key: "incomeFromOverseasPension",
        img: overseas,
      },
      {
        title: "Inheritance",
        key: "incomeFromInheritance",
        img: inheritance,
      },
      {
        title: "Lumpsum Expenses",
        key: "incomeFromLumpsumExpense",
        img: moneyBag,
      },
      {
        title: "Regular Living Expenses",
        key: "incomeFromRegularLivingExpenses",
        img: moneyBagPng,
      },
    ],
    "/user/business-entities": [
      {
        title: "Business as Company Structure",
        key: "BusinessAsCompanyStructure",
        img: Business_building,
      },
    ],
    "/user/SMSF": [
      {
        title: "SMSF Details",
        key: "SMSFDetails",
        img: will,
      },
    ],
    "/user/family-trust": [
      {
        title: "Family Trust Details",
        key: "familyDetails",
        img: will,
      },
      {
        title: "Family Trust Bank Accounts",
        key: "familyBank",
        img: BankImg,
      },
      {
        title: "Family Trust Term Deposits",
        key: "familyTermDeposit",
        img: TermImg,
      },
      {
        title: "Family Trust Australian Shares/ETFs",
        key: "familyAustralianShare",
        img: PortFolio,
      },
      {
        title: "Family Trust Platform Investments",
        key: "familyMangedFunds",
        img: funds,
      },
      {
        title: "Family Trust Investment Loan",
        key: "familyInvestmentHomeLoan",
        img: analytics,
      },
      {
        title: "Family Trust Investment Property",
        key: "familyInvestmentProperties",
        img: people,
      },
      {
        title: "Other Family Investments",
        key: "familyOtherInvestment",
        img: investmentCircle,
      },
    ],
    "/user/personal-insurance": [
      {
        title: "Life Insurance",
        key: "life",
        img: lifeImg,
      },
    ],
  };

  useEffect(() => {
    countYesAttributes();
  }, [CRObject]);

  function countYesAttributes() {
    let a = [];
    let lengthOfa = 0;
    if (props.Question == "/user/family-trust") {
      arrayObj?.[props.Question].map((elem, index) => {
        if (CRObject[elem.key] === "Yes") {
          a.push("yes");
          // console.log("yes")
        }
      });
      lengthOfa = a.length - 1;
      setArrayCount(lengthOfa + CRObject.numberOfFamilyInvestmentProperties);
    } else if (props.Question == "/user/SMSF") {
      arrayObj?.[props.Question].map((elem, index) => {
        if (CRObject[elem.key] === "Yes") {
          a.push("yes");
          // console.log("yes")
        }
      });
      lengthOfa = a.length - 1;
      setArrayCount(lengthOfa + CRObject.numberOfSMSFInvestmentProperties);
    } else if (props.Question == "/user/life-Style") {
      arrayObj?.[props.Question].map((elem, index) => {
        if (CRObject[elem.key] === "Yes") {
          a.push("yes");
          // console.log("yes")
        }
      });
      lengthOfa = a.length - 1;
      setArrayCount(lengthOfa + CRObject.numberOfHolidayHome);
    } else {
      arrayObj?.[props.Question].map((elem, index) => {
        if (CRObject[elem.key] === "Yes") {
          a.push("yes");
          // console.log("yes")
        }
      });
      setArrayCount(a.length);
    }
  }

  let OpenModal = (title, Input) => {
    // alert(title + " ++ " + Input);
    setModalObject({
      title,
      Input,
    });
    setFlagState(true);
  };

  let OpenModalClient2 = (title, Input, title2) => {
    // alert(title + " ++ " + Input);
    setModalObject({
      title,
      Input,
      title2,
    });
    setFlagState(true);
  };

  let OpenModal2 = (title, Input, index) => {
    // alert(title + " ++ " + Input);
    setModalObject({
      title,
      Input,
      index,
    });
    setFlagState(true);
  };

  let OpenReuseModal = (title, Input, key) => {
    // alert(title + " ++ " + Input);
    setModalObject({
      title,
      Input,
      key,
    });
    setFlagState(true);
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

  const JointHidden = [
    "superAnnuationIssues",
    "accountBasedPensionIssues",
    "annuitiesIssues",
    "will",
    "POA",
    "professionalAdviser",
    "incomeFromOwnBusiness",
    "incomeFromSoleTrader",
    "incomeFromPartnership",
    "incomeFromCentrelink",
    "incomeFromSuperPayment",
    "incomeFromOverseasPension",
    "incomeFromInheritance",
    "incomeFromLumpsumExpense",
    "incomeFromRegularLivingExpenses",
    "life",
    "TPD",
    "trauma",
    "incomeProtection",
  ]; // Add other titles that should use "xl" here

  const singleClient = ["incomeFromRegularLivingExpenses"]; // add "Key" of Question on which you want to add Form in Cards only no pop ups

  const combinedArray = [
    "familyInvestmentHomeLoan",
    "incomeFromOwnBusiness",
    "incomeFromOwnBusiness",
    "incomeFromSoleTrader",
    "incomeFromPartnership",
    "incomeFromCentrelink",
    "incomeFromSuperPayment",
    "incomeFromOverseasPension",
    "car",
    "boat",
    "caravan",
    "personalAssets",
    "houseHold",
    "otherAssets",
    "familyHome",
    "investmentBondFinance",
    "managedFundsMarginLoan",
    "managedFundsLOC",
    "will",
    "POA",
  ]; // add "Key" of Question on which you want to add Form in Cards only no pop ups

  const towInOne = ["personalLoans"];

  const sampleOne = ["investmentPropertyDetails", "familyInvestmentProperties"];

  const reuseModal = [
    "bankAccountFinance",
    "termDepositsFinance",
    "australianShareMarket",
    "managedFund",
    "investmentBondFinance",
    "superAnnuationIssues",
    "accountBasedPensionIssues",
    "annuitiesIssues",
    "BusinessAsCompanyStructure",
    "BusinessAsTrusts",
    "familyBank",
    "familyTermDeposit",
    "familyAustralianShare",
    "familyMangedFunds",
  ]; // add "Key" of Question on which you want to add Form in Cards only no pop ups

  const conditionalRender = ["life", "TPD", "trauma", "incomeProtection"]; // add "Key" of Question on which you want to add Form in Cards only no pop ups

  let homeArray = [
    {
      title: "Holiday Home",
      key: "holidayHome",
      img: Questions_Home,
    },
    {
      title: "Holiday Home Loan",
      key: "holidayHomeLoan",
      img: loan,
    },
  ];

  const componentMapping = {
    //Income and Expense
    "Employement Income": <EmploymentIncome />,
    "Centerlink Payments": <CenterLinkPayments />,
    "Sole Trader": <SoleTrader />,
    Partnership: <Partnership />,
    "Regular Living Expenses": <RegularLivingExpenses />,
    "LifeTime Benefits": <LifeTimeBeneFits />,
    "Overseas Pension": <OverseasPension />,
    Inheritance: <Inheritance />,
    "Lumpsum Expenses": <LumpsumExpenses />,

    //Personal Assets & Liabilities
    "Own a Family Home": <OwnFamilyHome />,
    Car: <AssetInfo />,
    Boat: <AssetInfo />,
    Caravan: <AssetInfo />,
    "Personal Assets": <AssetInfo />,
    "House hold": <AssetInfo />,
    "Other Assets": <AssetInfo />,
    "Personal Loan": <PersonalLoan />,
    "Credit Card": <CreditCard />,

    //Financial Investments
    "Bank Accounts": <MiddleWare />, //reuse Component
    "Term Deposits": <MiddleWare />, //reuse Component
    "Australian Shares/ETFs": <MiddleWare />, //reuse Component
    "Platform Investments": <MiddleWare />, //reuse Component
    "Investment Bond": <MiddleWare />,
    "Investment Loan": <InvestmentLoan />, //reuse Component
    "Margin Loan": <MarginLoan />,
    //Following 4 have combined in Financial Investment
    //Super and Requirement
    "Super Funds": <MiddleWare />,
    "Account Based Pension": <MiddleWare />,
    Annuities: <MiddleWare />,
    //Investment Trust
    "Investment Properties": <InvestmentPropertyDetails />,

    //property Home
    // "Own a Family Home": <OwnFamilyHome />,
    // "Home Loan": <HomeLoan />,
    "Holiday Home": <HolidayHome />,
    "Holiday Home Loan": <HolidayHomeLoan />,

    //Investment Trust
    // "Investment Property Loan": <InvestmentPropertyLoan />,  //it became inner Modal of Investment Properties
    // "Income & Expenses": <QuestionIncomeExpanse />,  //it became inner Modal of Investment Properties

    //estate Planing
    Wills: <EstatePlanningWill />,
    "Power of Attorneys": <EstatePlanningPOA />,
    "Professional Advisers": <EstatePlanningProfessionalAdviser />,

    //Business
    "Business as Company Structure": <MiddleWare />,
    "Business as Trusts": <MiddleWare />,

    //SMSF
    "SMSF Bank Accounts": <MiddleWare />, //reuse Component
    "SMSF Term Deposits": <MiddleWare />, //reuse Component
    "SMSF Australian Shares/ETFs": <MiddleWare />, //reuse Component
    "SMSF Platform Investments": <MiddleWare />, //reuse Component
    "SMSF Investment Loan": <InvestmentLoan />, //reuse Component
    //looping Question
    "SMSF Investment Properties": <InvestmentPropertyDetails />,
    "Other Investments": <OtherInvestmentsDynamic />,
    // "Investment Home": <SMSFInvestmentPropertyModalComp />,
    // "Investment Home Loan": <SMSFInvestmentHomeLoanComp />,
    // "Investment Home Expanse": <InvestmentHomeExpanse />,
    //looping Question end
    "SMSF Pension Phase": <SmsfPensionAccountMiddleWare />, //reuse Component
    "SMSF Details": <SmsfDetails />, //reuse Component
    "SMSF Accumulation Details": <SmsfAccumulationDetails />, //reuseComponent

    "Family Trust Bank Accounts": <MiddleWare />,
    "Family Trust Term Deposits": <MiddleWare />,
    "Family Trust Australian Shares/ETFs": <MiddleWare />,
    "Family Trust Platform Investments": <MiddleWare />,
    "Family Trust Investment Loan": <InvestmentLoan />,
    "Family Details": <FamilyDetails />,
    "Other Family Investments": <OtherInvestmentsDynamic />,

    "Family Trust Investment Property": <InvestmentPropertyDetails />,
    // "Family Investment Home": <FamilyInvestmentPropertyModalComp />,
    // "Family Investment Home Loan": <FamilyInvestmentHomeLoanComp />,
    // "Family Investment Home Expanse": <FamilyInvestmentHomeExpanse />,

    // Personal insurance
    "Personal Insurance": <PersonalInsuranceLife />, //reuseComponent
    // all following modals are know in ^ this one Modal   {
    // "Life Insurance": <PersonalInsuranceLife />, //reuseComponent
    // "TPD": <PersonalInsuranceLife />, //reuseComponent
    // "Trauma": <PersonalInsuranceLife />, //reuseComponent
    // "Income Protection": <PersonalInsuranceLife />, //reuseComponent
    // }
  };

  const ModalContent = (obj) => {
    return componentMapping[obj.title] || null;
  };

  const getInitialValuesRegularIncome = () => {
    let initialValues = {};

    if (
      questionDetail?.retirementLivingExpenses &&
      questionDetail?.retirementLivingExpenses?._id
    ) {
      // Ensure questionDetail and its nested properties are defined before accessing them
      const data = questionDetail.retirementLivingExpenses;

      // Check if data is defined and has a property `retirementLivingExpense`
      if (data && data._id) {
        initialValues = data;
      }
    }

    // console.log("asda", initialValues,);

    return initialValues;
  };

  let handleSubmitRegularIncome = async (values) => {
    console.log(values);

    let check =
      questionDetail && questionDetail?.retirementLivingExpenses?._id
        ? true
        : false;

    let obj = {
      retirementLivingExpense: values.retirementLivingExpense,
      clientFK: localStorage.getItem("UserID"),
    };

    try {
      let res;

      if (!check) {
        res = await PostAxios(
          `${DefaultUrl}/api/retirementLivingExpenses/Add`,
          obj
        );
      } else {
        obj._id = questionDetail.retirementLivingExpenses._id;
        res = await PatchAxios(
          `${DefaultUrl}/api/retirementLivingExpenses/Update`,
          obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail };
        updatedData["retirementLivingExpenses"] = res;
        setQuestionDetail(updatedData);
      }
      // type, placement, message, description
      openNotificationSuccess(
        "success",
        "topRight",
        "Notification",
        "Retirement Living Data Successfully Saved!"
      );
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        "Retirement Living Data is not Saved! Please Try Again."
      );
    }
  };

  return (
    <div className="container-fluid my-4 ">
      <ModalComponent
        modalObject={modalObject}
        setFlagState={setFlagState}
        flagState={flagState}
      >
        {ModalContent(modalObject)}
      </ModalComponent>

      <div className="row m-0 justify-content-start align-items-stretch">
        {Array.isArray(arrayObj?.[props.Question]) &&
          arrayObj?.[props.Question].map((elem, index) => {
            if (CRObject[elem.key] === "Yes") {
              // const cardSwitch = CardForms.includes(elem.key) ? true : false;
              const jointClass = JointHidden.includes(elem.key) ? "d-none" : "";
              const singleSwitch = singleClient.includes(elem.key)
                ? true
                : false;
              const reuseSwitch = reuseModal.includes(elem.key) ? true : false;
              const combinedSwitch = combinedArray.includes(elem.key)
                ? true
                : false;
              const TowInSwitch = towInOne.includes(elem.key) ? true : false;
              const SampleOneSwitch = sampleOne.includes(elem.key)
                ? true
                : false;

              const PersonalInsuranceRender = conditionalRender.includes(
                elem.key
              )
                ? true
                : false;

              const SMSFInP = elem.key === "SMSFDetails" ? true : false;

              const OneIndex =
                elem.key === "familyDetails" ||
                elem.key === "familyOtherInvestment"
                  ? true
                  : false;

              const PartnerClass =
                localStorage.getItem("UserStatus") === "Single" ? "d-none" : "";

              if (singleSwitch) {
                return (
                  <div className={`col-md-3 mb-4`} key={index}>
                    <Card
                      className="py-4 shadow borderOverAll GoalsobjectiveCard"
                      style={{ borderRadius: "20px", height: "100%" }}
                    >
                      <h5
                        className="text-center"
                        onClick={() => {
                          console.log(questionDetail);
                        }}
                      >
                        {elem.title}
                      </h5>
                      <div className="QuestionIcon CardImg">
                        <img className="img-fluid" src={elem.img} alt="" />
                      </div>
                      <div className="row justify-content-center align-items-center my-2">
                        <div className="col-12 p-0 ">
                          <div className="d-flex flex-column-reverse justify-content-center align-items-center gap-2">
                            <label
                              className=" d-block "
                              htmlFor={"client" + elem.key}
                            >
                              General Living
                            </label>
                            <ButtonDrawer
                              title="General Living Expenses"
                              placement="top"
                              height={100}
                              width={"60%"}
                              DrawerContent={PopoverContent(elem)}
                              setOpen={setOpen}
                              open={open}
                            >
                              <label
                                className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                onClick={() => {
                                  OpenModalClient2(
                                    elem.title,
                                    "client",
                                    "General Living"
                                  );
                                }}
                              >
                                <div>
                                  <FontAwesomeIcon
                                    icon={faArrowUpRightFromSquare}
                                  />
                                </div>
                              </label>
                            </ButtonDrawer>
                          </div>
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control inputDesign "
                        id={"client" + elem.key}
                        placeholder={"General Living Expenses"}
                        name={"client" + elem.key}
                        value={
                          questionDetail &&
                          questionDetail?.generalLivingExpenses &&
                          questionDetail?.generalLivingExpenses
                            ?.generalLivingExpensesTotal
                            ? questionDetail.generalLivingExpenses
                                .generalLivingExpensesTotal
                            : ""
                        }
                      />
                      <div className="row justify-content-center align-items-center my-2">
                        <div className="col-12 p-0 ">
                          <div className="d-flex flex-column-reverse justify-content-center align-items-center gap-2">
                            <label
                              className=" d-block"
                              htmlFor={"retirementLivingExpense"}
                            >
                              Retirement Living
                            </label>
                          </div>
                        </div>
                      </div>
                      <Formik
                        initialValues={getInitialValuesRegularIncome()}
                        onSubmit={handleSubmitRegularIncome}
                        enableReinitialize
                      >
                        {({ values, setFieldValue }) => {
                          return (
                            <Form>
                              <InputGroup className="inputDesign p-0 flex-nowrap">
                                <Field
                                  type="text"
                                  className="form-control inputDesignDoubleInput "
                                  id={"retirementLivingExpense"}
                                  placeholder={elem.title}
                                  name={"retirementLivingExpense"}
                                  onChange={(e) => {
                                    setFieldValue(
                                      e.target.name,
                                      toCommaAndDollar(
                                        e.target.value.replace(/[^0-9.-]+/g, "")
                                      )
                                    );
                                  }}
                                />
                                <Button
                                  type="submit"
                                  className="btn bgColor modalBtn border-0"
                                >
                                  <FaRegSave />
                                </Button>
                              </InputGroup>
                            </Form>
                          );
                        }}
                      </Formik>
                    </Card>
                  </div>
                );
              } else if (PersonalInsuranceRender) {
                return (
                  <PersonalInsuranceRenderCard
                    PartnerClass={PartnerClass}
                    index={index}
                    jointClass={jointClass}
                    elem={elem}
                    OpenModal={OpenModal2}
                    homeArray={homeArray}
                    arrayCount={arrayCount}
                    evenClass={evenClass}
                  />
                );
              } else if (reuseSwitch) {
                return (
                  <div className={`col-md-3 mb-4`} key={index}>
                    <Card
                      className="py-4 shadow borderOverAll GoalsobjectiveCard d-flex"
                      style={{ borderRadius: "20px", height: "100%" }}
                    >
                      <h5
                        className="text-center"
                        onClick={() => {
                          console.log(questionDetail[elem.key]);
                        }}
                      >
                        {elem.title}
                      </h5>

                      <div className="QuestionIcon CardImg">
                        <img className="img-fluid" src={elem.img} alt="" />
                      </div>
                      <div className="row justify-content-center align-items-center my-2">
                        <div className="col-12 p-0 ">
                          <div className="d-flex flex-column-reverse justify-content-center align-items-center gap-2">
                            <label
                              className=" d-block "
                              htmlFor={"client" + elem.key}
                            >
                              {localStorage.getItem("UserName") || "You"}
                            </label>
                            <ButtonDrawer
                              title={elem.title}
                              placement="top"
                              height={270}
                              width={"60%"}
                              DrawerContent={PopoverContent(
                                elem.title,
                                "client",
                                elem.key
                              )}
                              setOpen={setOpen}
                              open={open}
                            >
                              <label
                                className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                onClick={() => {
                                  OpenReuseModal(
                                    elem.title,
                                    "client",
                                    elem.key
                                  );
                                }}
                                onMouseEnter={() => setOpen(true)}
                                onMouseLeave={() => setOpen(false)}
                              >
                                <div>
                                  <FontAwesomeIcon
                                    icon={faArrowUpRightFromSquare}
                                  />
                                </div>
                              </label>
                            </ButtonDrawer>
                          </div>
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control inputDesign "
                        id={"client" + elem.key}
                        placeholder={elem.title}
                        name={"client" + elem.key}
                        value={
                          questionDetail &&
                          questionDetail[elem.key]?.clientTotal
                            ? questionDetail[elem.key].clientTotal
                            : ""
                        }
                      />
                      <div
                        className={`row justify-content-center align-items-center my-2 ${PartnerClass}`}
                      >
                        <div className="col-12 p-0 ">
                          <div className="d-flex flex-column-reverse justify-content-center align-items-center gap-2">
                            <label
                              className=" d-block "
                              htmlFor={"partner" + elem.key}
                            >
                              {localStorage.getItem("PartnerName") || "Partner"}
                            </label>
                          </div>
                        </div>
                      </div>
                      <input
                        type="text"
                        className={`form-control inputDesign ${PartnerClass}`}
                        id={"partner" + elem.key}
                        placeholder={elem.title}
                        name={"partner" + elem.key}
                        value={
                          questionDetail &&
                          questionDetail[elem.key]?.partnerTotal
                            ? questionDetail[elem.key].partnerTotal
                            : ""
                        }
                      />
                    </Card>
                  </div>
                );
              } else if (SMSFInP) {
                return (
                  <SMSFQCards
                    PartnerClass={PartnerClass}
                    index={index}
                    jointClass={jointClass}
                    elem={elem}
                    OpenModal={OpenModal2}
                    OpenReuseModal={OpenReuseModal}
                    homeArray={homeArray}
                    arrayCount={arrayCount}
                    open={open}
                    setOpen={setOpen}
                    PopoverContent={PopoverContent}
                  />
                );
              } else if (OneIndex) {
                return (
                  <FamilyInvestmentProperty
                    PartnerClass={PartnerClass}
                    index={index}
                    jointClass={jointClass}
                    elem={elem}
                    OpenModal={OpenModal2}
                    homeArray={homeArray}
                    arrayCount={arrayCount}
                  />
                );
              } else if (combinedSwitch) {
                return (
                  <CombinedSwitch
                    PartnerClass={PartnerClass}
                    index={index}
                    jointClass={jointClass}
                    elem={elem}
                    OpenModal={OpenModal2}
                    homeArray={homeArray}
                    arrayCount={arrayCount}
                  />
                );
              } else if (TowInSwitch) {
                return (
                  <TowInOneSwitch
                    PartnerClass={PartnerClass}
                    index={index}
                    jointClass={jointClass}
                    elem={elem}
                    OpenModal={OpenModal2}
                    homeArray={homeArray}
                    arrayCount={arrayCount}
                  />
                );
              } else if (SampleOneSwitch) {
                return (
                  <SampleOne
                    PartnerClass={PartnerClass}
                    index={index}
                    jointClass={jointClass}
                    elem={elem}
                    OpenModal={OpenModal2}
                    homeArray={homeArray}
                    arrayCount={arrayCount}
                  />
                );
              } else {
                return (
                  <div className={`col-md-3 mb-4`} key={index}>
                    <Card
                      className="py-4 shadow borderOverAll GoalsobjectiveCard"
                      style={{ borderRadius: "20px", height: "100%" }}
                    >
                      <h5
                        className="text-center"
                        onClick={() => {
                          console.log(questionDetail[elem.key]);
                        }}
                      >
                        {elem.title}
                      </h5>
                      <div className="QuestionIcon CardImg">
                        <img className="img-fluid" src={elem.img} alt="" />
                      </div>
                      <div className="row justify-content-center align-items-center my-2">
                        <div className="col-12 p-0 ">
                          <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                            <label
                              className=" d-block "
                              htmlFor={"client" + elem.key}
                            >
                              {localStorage.getItem("UserName") || "You"}
                            </label>

                            <label
                              className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                              onClick={() => {
                                OpenModal(elem.title, "client");
                              }}
                            >
                              <div>
                                <FontAwesomeIcon
                                  icon={faArrowUpRightFromSquare}
                                />
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control inputDesign "
                        id={"client" + elem.key}
                        placeholder={elem.title}
                        name={"client" + elem.key}
                        value={
                          questionDetail &&
                          questionDetail[elem.key]?.clientTotal
                            ? questionDetail[elem.key].clientTotal
                            : ""
                        }
                      />
                      <div
                        className={`row justify-content-center align-items-center my-2 ${PartnerClass}`}
                      >
                        <div className="col-12 p-0 ">
                          <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                            <label
                              className=" d-block "
                              htmlFor={"partner" + elem.key}
                            >
                              {localStorage.getItem("PartnerName") || "Partner"}
                            </label>

                            <label
                              className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                              onClick={() => {
                                OpenModal(elem.title, "partner");
                              }}
                            >
                              <div>
                                <FontAwesomeIcon
                                  icon={faArrowUpRightFromSquare}
                                />
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <input
                        type="text"
                        className={`form-control inputDesign ${PartnerClass}`}
                        id={"partner" + elem.key}
                        placeholder={elem.title}
                        name={"partner" + elem.key}
                        value={
                          questionDetail &&
                          questionDetail[elem.key]?.partnerTotal
                            ? questionDetail[elem.key].partnerTotal
                            : ""
                        }
                      />

                      <div
                        className={`row justify-content-center align-items-center my-2  ${jointClass} ${PartnerClass}`}
                      >
                        <div className="col-12 p-0 ">
                          <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                            <label
                              className=" d-block "
                              htmlFor={"joint" + elem.key}
                            >
                              {(localStorage.getItem("UserName") || "You") +
                                " " +
                                (localStorage.getItem("PartnerName") || "")}
                            </label>

                            <label
                              className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                              onClick={() => {
                                OpenModal(elem.title, "joint");
                              }}
                            >
                              <div>
                                <FontAwesomeIcon
                                  icon={faArrowUpRightFromSquare}
                                />
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <input
                        type="text"
                        className={`form-control inputDesign ${jointClass} ${PartnerClass}`}
                        id={"joint" + elem.key}
                        placeholder={elem.title}
                        name={"joint" + elem.key}
                        value={
                          questionDetail && questionDetail[elem.key]?.jointTotal
                            ? questionDetail[elem.key].jointTotal
                            : ""
                        }
                      />
                    </Card>
                  </div>
                );
              }
            }
            return null;
          })}
      </div>

      <div className="row mt-2 d-none">
        <div className="col-md-12">
          <button
            onClick={() => {
              setQuestionChange("income");
            }}
            className="float-end btn w-25  bgColor modalBtn"
          >
            Next
          </button>
          <button
            onClick={() => {
              setQuestionChange("InvestmentTrust");
            }}
            className="float-end btn w-25  btn-outline  backBtn mx-3"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCards;
