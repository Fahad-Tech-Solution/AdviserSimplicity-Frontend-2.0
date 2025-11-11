import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Card, InputGroup } from "react-bootstrap";

//images or SVGs import for Goals

// import BankImg from "../Questions/svgs/bank.svg";
import nursingcare from "../Questions/svgs/nursingcare.svg";
import bill from "../Questions/svgs/bill.png";
import credit from "../Questions/svgs/credit-card-refund-svgrepo-com.svg";
import FamilyProtection from "../Questions/svgs/WhatsApp Image 2023-08-11 at 19.13.12.jpg";
import beachChair from "../Questions/svgs/beach-chair.png";
import jeepCar from "../Questions/svgs/jeep-car-svgrepo-com.svg";
import briefcase from "../Questions/svgs/briefcase.png";
import clipboard from "../Questions/svgs/clipboard.png";
import home from "../Questions/svgs/home-svgrepo-com.svg";
import boat from "../Questions/svgs/boat.svg";
import caravan from "../Questions/svgs/trailer-caravan.svg";
import upgradeHome from "../Questions/svgs/upgradeHome.png";
import paintHome from "../Questions/svgs/paintHome.png";
import shiftHome from "../Questions/svgs/shift.png";
import investment from "../Questions/svgs/investment.png";
import loan from "../Questions/svgs/loan.svg";
import BuildingSmall from "../Questions/svgs/building-small-svgrepo-com.svg";
import graduationMortarboard from "../Questions/svgs/graduation-mortarboard.svg";
import timeMoney from "../Questions/svgs/time-is-money.svg";
import familySilhouette from "../Questions/svgs/family-silhouette.svg";
import inheritance from "../Questions/svgs/inheritance.png";
import shareholders from "../Questions/svgs/shareholders.png";
import gearsGear from "../Questions/svgs/gears-gear-svgrepo-com.svg";
import Questions_People from "../Questions/svgs/Questions_People.png";
import moneyBagSvgRepo from "../Questions/svgs/money-bag-svgrepo-com.svg";
import marriageRings from "../Questions/svgs/marriage-rings.svg";
import will from "../Questions/svgs/page-with-curl-svgrepo-com.svg";
import portfolio from "../Questions/svgs/portfolio copy.svg";
import investmentChart from "../Questions/svgs/investmentChart.png";
import taxCutting from "../Questions/svgs/taxCutting.png";
import piggyBank from "../Questions/svgs/piggy-bank.svg";
import piggyBankNew from "../Questions/svgs/piggy-bank-new.svg";
import businessPersonConsultant from "../Questions/svgs/business-Person-consultant.svg";
import piggyBankPNG from "../Questions/svgs/piggy-bank.png";
import piggyBankFull from "../Questions/svgs/piggy-bank-Full.png";
import insurance from "../Questions/svgs/insurance.png";
import insuranceProtection from "../Questions/svgs/insuranceProtection.png";
import insuranceSecurity from "../Questions/svgs/insurance Security.png";
import socialInsurance from "../Questions/svgs/social-insurance.png";
import savingMoney from "../Questions/svgs/saving-money.png";
import calendar from "../Questions/svgs/calendar.png";

//Goals and Objective Questions
import Add from "../Questions/svgs/add-circle-solid-svgrepo-com.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalComponent from "../Questions/FinancialInvestments/ModalComponent";
import GoalsForm from "./GoalsForm";
import { defaultUrl, GoalsDetail, GQState } from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import { GetAxios } from "../Assets/Api/Api";
import GoalsObjectivesQuestions from "./GoalsObjectivesQuestions";

const GoalsObjectiveNew = () => {
  useEffect(() => {
    GetGoals();
    GetGoalsQuestion();
  }, []);

  let DefaultUrl = useRecoilValue(defaultUrl);
  let GQSObj = useRecoilValue(GQState);

  let [GQObject, setGQObject] = useRecoilState(GQState);

  let [goalsDetail, setGoalsDetail] = useRecoilState(GoalsDetail);

  let GetGoals = async () => {
    try {
      const res = await GetAxios(
        `${DefaultUrl}/api/CombinedGoalsAndObjectives/${localStorage.getItem(
          "UserID"
        )}`
      );
      // console.log(JSON.stringify(res))
      if (res) {
        setGoalsDetail(res);
      }
    } catch (error) {
      console.error("Error fetching Goals:", error);
    }
  };

  let GetGoalsQuestion = async () => {
    try {
      const res = await GetAxios(
        `${DefaultUrl}/api/goalsQuestions/getByClient/${localStorage.getItem(
          "UserID"
        )}`
      );
      // console.log(JSON.stringify(res))
      if (res) {
        setGQObject(res);
      }
    } catch (error) {
      console.error("Error fetching Goals:", error);
    }
  };

  let allGoals = {
    AgeCare: [
      {
        title: "Care for Ageing Family Member",
        key: "careGoal",
        // img: BankImg,
        img: nursingcare,
        modalBtn: "label",
        whenScopeIs: "",
        descriptionArray: [],
        scopeOfAdvice: "Age Care",
      },
    ],
    Cashflow: [
      {
        title: "Set up a Budget",
        key: "budgetGoal",
        img: bill,
        modalBtn: "label",
        whenScopeIs: "",
        descriptionArray: [],
        scopeOfAdvice: "Cashflow",
      },
      {
        title: "Accumulate Emergency Fund",
        key: "emergencyFundGoal",
        img: briefcase,
        modalBtn: "label",
        whenScopeIs: "",
        descriptionArray: [],
        scopeOfAdvice: "Cashflow",
      },
      {
        title: "Advice on Surplus Income",
        key: "adviceOnSurplusIncomeGoal",
        img: savingMoney,
        modalBtn: "label",
        whenScopeIs: "",
        descriptionArray: [],
        scopeOfAdvice: "Cashflow",
      },
      {
        title: "Save for a Wedding",
        key: "weddingGoal",
        img: marriageRings,
        modalBtn: "label",
        whenScopeIs: "",
        descriptionArray: [],
        scopeOfAdvice: "Cashflow",
      },
      {
        title: "Take a Holiday",
        key: "holidayGoal",
        img: beachChair,
        modalBtn: "label",
        whenScopeIs: "Cashflow",
        descriptionArray: [
          {
            text: "<span>We/I</span> would like to take a holiday to <span>XXXXXX</span> and want to allow an amount of <span>$XX.000</span> to do this comfortable so <span>I/we</span> can enjoy ourselves like <span>I/we</span> e want to.    <span>We/I</span> will use the funds <span>I/we have sitting in cash/in super/from  the inheritance/other</span>",
          },
        ],
        scopeOfAdvice: "Cashflow",
      },
      {
        title: "Buy a Car",
        key: "carGoal",
        img: jeepCar,
        modalBtn: "label",
        whenScopeIs: "Cashflow",
        descriptionArray: [
          {
            text: "<span>We/I</span> would like to <span>upgrade our car/buy</span> a new car  and want to get <span>car make/model</span>. <span>We/I</span> want to allow an amount of <span>$XX.000</span> to do this.  <span>We/I</span> will use the funds <span>I/we have sitting in cash/in super/from the inheritance/other</span>",
          },
        ],
        scopeOfAdvice: "Cashflow",
      },
      {
        title: "Buy a Boat",
        key: "boatGoal",
        img: boat,
        modalBtn: "label",
        whenScopeIs: "Cashflow",
        descriptionArray: [
          {
            text: "<span>We/I</span> would like to buy a boat and want to allow an amount of <span>$XX.000</span> to do this. <span>We/I</span> will use the funds <span>I/we have sitting in cash/in super/from the inheritance/other</span>",
          },
        ],
        scopeOfAdvice: "Cashflow",
      },
      {
        title: "Buy a Carvan",
        key: "caravanGoal",
        img: caravan,
        modalBtn: "label",
        whenScopeIs: "Cashflow",
        descriptionArray: [
          {
            text: "<span>We/I</span> would like to buy a caravan so we can take more road trips around <span>Australia/name of State</span> and want to allow an amount of <span>$XX.000</span> to do this. <span>We/I</span> will use the funds <span>I/we have sitting in cash/in super/from the inheritance/other</span>",
          },
        ],
        scopeOfAdvice: "Cashflow",
      },
      {
        title: "Buy a House",
        key: "houseGoal",
        img: home,
        modalBtn: "label",
        whenScopeIs: "",
        descriptionArray: [],
        scopeOfAdvice: "Cashflow",
      },
      {
        title: "Upgrade Family Home",
        key: "upgradeFamilyHomeGoal",
        img: upgradeHome,
        modalBtn: "label",
        whenScopeIs: "",
        descriptionArray: [],
        scopeOfAdvice: "Cashflow",
      },
      {
        title: "Renovate Family Home",
        key: "renovateFamilyHomeGoal",
        img: paintHome,
        modalBtn: "label",
        whenScopeIs: "Cashflow",
        descriptionArray: [
          {
            text: "<span>We/I</span> would like to renovate <span>my/our</span> home and want to allow an amount of <span>$XX.000</span> to do this. <span>We/I</span> will use the funds <span>I/we have sitting in cash/in super/from the inheritance/other</span>. ",
          },
        ],
        scopeOfAdvice: "Cashflow",
      },
      {
        title: "Downsize Family Home",
        key: "downSizeFamilyHomeGoal",
        img: shiftHome,
        modalBtn: "label",
        whenScopeIs: "",
        descriptionArray: [],
        scopeOfAdvice: "Cashflow",
      },
      {
        title: "Buy an Investment Property",
        key: "investmentPropertyGoal",
        img: investment,
        modalBtn: "label",
        whenScopeIs: "",
        descriptionArray: [],
        scopeOfAdvice: "Cashflow",
      },
    ],
    Centrelink: [
      {
        title: "Eligibility to Centrelink",
        key: "centreLinkEligibilityGoal",
        img: gearsGear,
        modalBtn: "label",
        whenScopeIs: "Centrelink",
        descriptionArray: [
          {
            text: "<span>We/I</span>  would like to know if <span>We/I</span> will get any Age pension entitlements now that <span>We/I</span> had reached age pension age. It would be great if <span>We/I</span> could get a small amount of age pension and this would give <span>us/me</span> the Pension Card. <span>We/I</span> really want the benefits that come with the cards such as cheaper medicine, and other discounts on <span>our/my</span> bills such as Council and Water rates, utilities (Gas and Electricity) and <span>our/my</span> Car registration.",
          },
          {
            text: "<span>We/I</span> like to know if <span>we/I am/are</span> entitled to any health care cards from Centrelink because <span>I/we are/am</span> paying too much on <span>our/my</span> regular medication on a monthly basis.",
          },
        ],
        scopeOfAdvice: "Centrelink",
      },
    ],
    DebtManagement: [
      {
        title: "Pay off Home Loan",
        key: "homeLoanGoal",
        img: loan,
        modalBtn: "label",
        whenScopeIs: "Debt Management",
        descriptionArray: [
          {
            text: "<span>I/We</span> would like Reduce <span>our/my</span> current home loan <span>as soon as possible /ahead of retirement.</span>",
          },
          {
            text: "<span>I/We</span> want to know how much <span>I/We</span> need  to pay off <span>our/my</span> home loan  each <span>week/fortnight/month</span> so <span>I/we can be debt free in retirement/pay it off in the next XX Years</span>",
          },
        ],
        scopeOfAdvice: "Debt Management",
      },
      {
        title: "Pay off Credit Card/Debt",
        key: "creditCardGoal",
        img: credit,
        modalBtn: "label",
        whenScopeIs: "Debt Management",
        descriptionArray: [
          {
            text: "<span>I/We</span> would like Reduce <span>our/my</span> current <span>personal loan/credit cards as soon as possible /ahead of retirement.</span>",
          },
          {
            text: "<span>I/We</span> want to know how much <span>I/We</span> need  to pay off <span>our/my personal loan/credit cards</span> each month so <span>I/we can be debt free in retirement/pay it off in the next XX Years</span>",
          },
        ],
        scopeOfAdvice: "Debt Management",
      },
    ],
    EstatePlanning: [
      {
        title: "Estate Planning",
        key: "estatePlanningGoal",
        img: will,
        modalBtn: "label",
        whenScopeIs: "",
        descriptionArray: [],
        scopeOfAdvice: "Estate Planning",
      },
      {
        title: "Leave an Inheritance",
        key: "leaveInheritanceGoal",
        img: shareholders,
        modalBtn: "label",
        whenScopeIs: "",
        descriptionArray: [],
        scopeOfAdvice: "Estate Planning",
      },
    ],
    Investment: [
      {
        title: "Set up an Investment Portfolio",
        key: "investmentPortfolioGoal",
        img: portfolio,
        modalBtn: "label",
        whenScopeIs: "Investments",
        descriptionArray: [
          {
            text: "<span>I/We</span> like to  Invest an amount of <span>$XXX,000</span> from <span>our/my</span> cash sitting in <span>my/our</span> bank account into managed investments where <span>our/my</span> money will  grow in value over time. <span>I/We</span> want to start slow and <span>are/am</span> happy to invest a regular amount of <span>$XXX</span> per month as <span>I/we</span> can  afford to spare this amount of money each month <span>I/we</span> would like to keep building up this investment.",
          },
        ],
        scopeOfAdvice: "Investment",
      },
      {
        title: "Review Investment Portfolio",
        key: "reviewInvestmentPortfolioGoal",
        img: investmentChart,
        modalBtn: "label",
        whenScopeIs: "",
        descriptionArray: [],
        scopeOfAdvice: "Investment",
      },
      {
        title: "Receive an Inheritance",
        key: "inheritanceGoal",
        img: inheritance,
        modalBtn: "label",
        whenScopeIs: "",
        descriptionArray: [],
        scopeOfAdvice: "Investment",
      },
      {
        title: "Pay Less Tax",
        key: "payLessTaxGoal",
        img: taxCutting,
        modalBtn: "label",
        whenScopeIs: "",
        descriptionArray: [],
        scopeOfAdvice: "Investment",
      },
      {
        title: "Save for Children’s Education",
        key: "childrenEducationGoal",
        img: graduationMortarboard,
        modalBtn: "label",
        whenScopeIs: "",
        descriptionArray: [],
        scopeOfAdvice: "Investment",
      },
      {
        title: "Regular Savings Plan",
        key: "regularSavingsGoal",
        img: clipboard,
        modalBtn: "label",
        whenScopeIs: "",
        descriptionArray: [],
        scopeOfAdvice: "Investment",
      },
      {
        title: "Set up a Family Trust",
        key: "familyTrustGoal",
        img: Questions_People,
        modalBtn: "label",
        whenScopeIs: "",
        descriptionArray: [],
        scopeOfAdvice: "Investment",
      },
    ],
    Other: [
      {
        title: "Ongoing Financial Advice",
        key: "financialAdviceGoal",
        img: businessPersonConsultant,
        modalBtn: "label",
        whenScopeIs: "Other",
        descriptionArray: [
          {
            text: "<span>I/We</span> would like to have someone help <span>us/me</span> manage <span>our/my</span> money in <span>our/my</span> retirement to make sure that <span>our/my</span>  money will last <span>us/me</span> and that <span>I/We are/am</span> adjusting our strategy every year so we continue to meet <span>our/my</span> goals.",
          },
        ],
        scopeOfAdvice: "Other",
      },
      {
        title: "Start a Family",
        key: "startFamilyGoal",
        img: familySilhouette,
        modalBtn: "label",
        whenScopeIs: "",
        descriptionArray: [],
        scopeOfAdvice: "Other",
      },
      {
        title: "Start a Business",
        key: "businessGoal",
        img: BuildingSmall,
        modalBtn: "label",
        whenScopeIs: "",
        descriptionArray: [],
        scopeOfAdvice: "Other",
      },
    ],
    PersonalInsurance: [
      {
        title: "Protect my Lifestyle & Family",
        key: "familyLifeStyleGoal",
        img: FamilyProtection,
        modalBtn: "label",
        whenScopeIs: "Personal Insurance",
        descriptionArray: [
          {
            text: "<span>I/We</span> want  to make sure in  the event <span>we/I were/was</span>  to  die prematurely or <span>are/am</span> unable to work due to sickness, injury or every again that <span>our/my</span> family will be protected financially. <span>I/We</span> would like to consider all types of personal insurance cover. <span>I/We are  able/happy to  spend up to $XX0 per month from our/my  own  personal cashflow and were possible we would like to have any insurance cover funded an paid through our/my super.</span> <strong>(Full Insurance review)</strong>.",
          },
          {
            text: "<span>I/We</span> would specifically like to take out <span>Life cover of $XXX,XXX and TPD of $XXX,XXX</span> to make sure <span>that our/my</span> family is protected if <span>I/we to</span> die or become total and permanently disabled. <span>This would also us/me to pay off our /my current home loan/debts and be debt free. Where possible I/we would like to have these premiums funded via super.</span> <strong>(Life and TPD cover)</strong>",
          },
          {
            text: "<span>I/We</span> want to make sure <span>if I/we</span> suffered a medical event such as a cancer or a heart attack  that <span>we/I</span> could receive a lumpsum payout of <span>$XXX,XXX</span> to help out financially while <span>I/we</span> focus on <span>my/our  recovery/so my  spouse could take time off work if needed to look after me  so this wouldn’t affect us  financially while I recovered</span><strong>(Trauma cover)</strong>",
          },
          {
            text: "<span>I/We</span> want to make sure that <span>my/our</span> income is protected in the event <span>I/we am/are</span> unable to work due to an injury or became sick so <span>we/I</span> can receive a regular income during this period to help <span>us/me</span> pay <span>my/our  home loan repayments and all other bills. Where possible I/we would like to have these premiums funded via super</span>  <strong>(Income protection only)</strong>",
          },
        ],
        scopeOfAdvice: "Personal Insurance",
      },
      {
        title: "Review your Current Personal Insurance Cover",
        key: "reviewPersonalInsuranceCoverGoal",
        img: insurance,
        modalBtn: "label",
        whenScopeIs: "Personal Insurance",
        descriptionArray: [
          {
            text: "<span>We/I</span> would like to Review <span>my/our</span> current levels of personal insurance cover <span>I/we</span> have in place and consider what would be the right levels and types of cover for <span>us/me</span>.",
          },
        ],
        scopeOfAdvice: "Personal Insurance",
      },
      {
        title: "Analysis of your Personal Insurance needs",
        key: "analysisOfPersonalInsuranceGoal",
        img: insuranceProtection,
        modalBtn: "label",
        whenScopeIs: "Personal Insurance",
        descriptionArray: [
          {
            text: "<span>I/We</span> want  to make sure in  the event <span>we/I were/was</span> to die prematurely or <span>are/am</span> unable to work due to sickness, injury or every again that <span>our/my</span> family will be protected financially. <span>I/We</span> would like to consider all types of personal insurance cover. <span>I/We are able/happy to spend up to $XX0 per month from our/my own personal cashflow and were possible we would like to have any insurance cover funded an paid through our/my  super.</span> <strong>(Full Insurance review)</strong>.",
          },
        ],
        scopeOfAdvice: "Personal Insurance",
      },
      {
        title: "Retain Current Personal Insurances as is",
        key: "retainCurrentPersonalInsurancesGoal",
        img: socialInsurance,
        modalBtn: "label",
        whenScopeIs: "Personal Insurance",
        descriptionArray: [
          {
            text: "<span>We/I</span> would like to retain our current personal insurances  with <span>XXXX</span> as they are for now and not have these reviewed. We would like you to take over the servicing rights of <span>our/my</span> polices so <span>we/I</span> can obtain all relevant policy details as required.",
          },
        ],
        scopeOfAdvice: "Personal Insurance",
      },
      {
        title: "Reduce my Current Personal Insurance Cover",
        key: "reducePersonalInsuranceCoverGoal",
        img: insuranceSecurity,
        modalBtn: "label",
        whenScopeIs: "Personal Insurance",
        descriptionArray: [
          {
            text: "<span>We/I</span> would like to Reduce <span>our/my Life cover down to $XXX, XXX and   TPD to $XXX,XXX</span> so <span>we/I can</span> reduce the premiums down as they are now starting to get costly. <span>Given our/my current</span> financial situation now <span>I/we don’t</span>  need this level of cover anymore <span>as this was taken out a long time ago when our/my situation was different and the kids were younger.</span>  <strong>(Reduce Life and TPD)</strong>",
          },
          {
            text: "<span>We/I</span> would like to Reduce <span>our/my</span> Trauma cover down to <span>$XXX,XXX</span> so <span>we/I</span> can reduce the premiums down as they are now starting to get costly. <strong>( Reduce Trauma cover)</strong>",
          },
          {
            text: "<span>We/I</span> would like to change the the waiting period on  <span>my/our</span>  income protection policy with <span>Name of Provider</span> to a <span>XX</span> Day waiting period to help reduce the cost of these premiums.<span> We/I currently have over XX days in Sick/Annual Leave/Long Service Leave available that I/we  could use  if  I/we wasn’t/weren’t  able to work during this period.</span> <strong>(Reduce Waiting Period on Income protection)</strong>.",
          },
        ],
        scopeOfAdvice: "Personal Insurance",
      },
    ],
    RetirementPlanning: [
      {
        title: "Generate a Retirement Income Stream",
        key: "retirementIncomeStreamGoal",
        img: calendar,
        modalBtn: "label",
        whenScopeIs: "Retirement Planning",
        descriptionArray: [
          {
            text: "<span>I/We</span> like to use be able to receive an amount of <span>$X,000</span> per <span>week/fortnight/month</span> for <span>us/me</span> to be comfortable in <span>my/our</span> retirement and live the way <span>I/We</span> want to.",
          },
        ],
        scopeOfAdvice: "Retirement Planning",
      },
      {
        title: "Set up a Super Income Stream",
        key: "setSuperIncomeStreamGoal",
        img: piggyBankNew,
        modalBtn: "label",
        whenScopeIs: "Retirement Planning",
        descriptionArray: [
          {
            text: "<span>I/We</span> like to use my super to draw an income from it like a regular wage to help <span>us/me meet our/my</span> living expenses. <span>I/We</span> feel that we need an amount of <span>$X,000</span> per <span>week/fortnight/month</span> for <span>us/me</span> to be comfortable in <span>my/our</span> retirement and live the way <span>I/We</span> want to.",
          },
        ],
        scopeOfAdvice: "Retirement Planning",
      },
      {
        title: "Plan for Retirement",
        key: "planForRetirementGoal",
        img: timeMoney,
        modalBtn: "label",
        whenScopeIs: "",
        descriptionArray: [],
        scopeOfAdvice: "Retirement Planning",
      },
    ],
    Superannuation: [
      {
        title: "Set up an SMSF",
        key: "SMSFGoal",
        img: moneyBagSvgRepo,
        modalBtn: "label",
        whenScopeIs: "Superannuation",
        descriptionArray: [
          {
            text: "We would like set up our own Self-Managed Super Fund (SMSF) and combine our superannuation money and have it invested together as a <span>couple/family. I/We</span> feel this will provide <span>us/me</span> with more flexibility and control of <span>our/my</span> retirement savings. <span>I/We</span> would like to retain the insurances <span>I/we</span> have attached to <span>our/my</span> current fund/s.",
          },
          {
            text: "<span>I/We</span> would like set up our own Self-Managed Super Fund (SMSF) and use <span>our/my</span> superannuation money to buy a <span>business premises/factory</span> so <span>I/we</span> can use it to run <span>our/my</span> business from. <span>I/We</span> feel this will provide <span>us/me</span> with more flexibility and control of <span>our/my</span> retirement savings. <span>I/We</span> would like to retain the insurances <span>I/we</span> have attached to <span>our/my</span> current fund/s.",
          },
        ],
        scopeOfAdvice: "Superannuation",
      },
      {
        title: "Review my Super",
        key: "reviewSuperGoal",
        img: piggyBank,
        modalBtn: "label",
        whenScopeIs: "Superannuation",
        descriptionArray: [
          {
            text: "<span>I/We</span> would like to review <span>our/my</span> current super fund/s and considering other products that are more suitable for <span>us/me</span> and give <span>us/me</span> more flexibility and ease of use when <span>I/We</span> are dealing with the product. <span>I/We</span> would like to retain the insurances <span>I/we</span> have attached to <span>our/my</span> current fund/s. <strong>(Consider a better product)</strong>",
          },
          {
            text: "<span>I/We</span> would like to review <span>our/my</span> current super fund/s and considering other products that are more suitable for <span>us/me</span> and help <span>us/me</span> reduce the overall fees if possible. <span>I/We</span> would like to retain the insurances <span>I/we</span> have attached to <span>our/my</span> current fund/s. <strong>(Consider a more cost effective product)</strong>",
          },
        ],
        scopeOfAdvice: "Superannuation",
      },
      {
        title: "Combine my Super into One",
        key: "combinedSuperIntoOneGoal",
        img: piggyBankFull,
        modalBtn: "label",
        whenScopeIs: "Superannuation",
        descriptionArray: [
          {
            text: "I would like to consider rolling my <span>X super funds</span> into the one if possible to help me reduce the fees and statements that I currently receive so it can help me track my super better.",
          },
        ],
        scopeOfAdvice: "Superannuation",
      },
      {
        title: "Contribute Money into Super",
        key: "contributeMoneyIntoSuperGoal",
        img: piggyBankPNG,
        modalBtn: "label",
        whenScopeIs: "Superannuation",
        descriptionArray: [
          {
            text: "<span>I/We</span> would like to build up <span>our/my</span> super as much as <span>I/we</span> can before <span>I/we</span> retire so <span>I/we</span> can have more for <span>our/my</span> retirement and if possible, allow us to reduce the amount to tax <span>I/we</span> currently pay. <strong>(concessional contributions)</strong>",
          },
          {
            text: "<span>I/We</span> would like to start contributing some money into <span>our/my</span> super so <span>I/we</span> can start building it up. For now we are happy to contribute an net amount of <span>$X,000</span> per <span>week/fortnight/month</span> as this is how much <span>I/We</span> are <span>able/comfortable</span> to contribute based upon <span>my/our</span> own cashflow perspective. <strong>(regular contributions concessional or non-concessional)</strong>",
          },
          {
            text: "<span>I/We</span> like to know what <span>I/We</span> should do with the money <span>I/we</span> have sitting in <span>my/our</span> bank account <span>from the sale of an investment property/from the inheritance we have/will receive from Client/Partners mum/dad’s estate. I/We</span> currently had an amount of approximately <span>$XXX,000</span> in cash and wanted to invest an amount of <span>$XXX,000</span> and retain an amount of <span>$XXX,000 as buffer for emergencies/for home renovations/purchase of a new car/to take a holiday to XXXX.  I/We</span> wanted to know <span>if I/We</span> could invest this money into superannuation if possible so <span>I/We</span> can build up this investment. <strong>(Investing money into super as NCC)</strong>.",
          },
        ],
        scopeOfAdvice: "Superannuation",
      },
    ],
  };

  let ReorderFunction = (goalArray) => {
    if (goalArray.length <= 1) {
      return goalArray; // If array has 0 or 1 item, no need to reorder
    }

    const categoryOrder = [
      "Now",
      "Ongoing",
      "Year 1",
      "Year 2",
      "Year 3",
      "Year 4",
      "Year 5",
      "Year 6",
      "Year 7",
      "Year 8",
      "Year 9",
      "Year 10",
    ];

    // Map to store goals by their category
    const goalsByCategory = new Map(
      categoryOrder.map((category) => [category, []]) // Initialize an array for each category
    );

    // Create a separate array for uncategorized goals
    const uncategorizedGoals = [];

    // Group goals by their time category or handle uncategorized goals
    goalArray.forEach((elem) => {
      const goalDetail = goalsDetail[elem.key];

      if (!goalDetail || Object.keys(goalDetail).length === 0) {
        // Case 1: If the key is not in goalsDetail or it's an empty object, keep the goal as uncategorized
        uncategorizedGoals.push(elem);
      } else if (goalsByCategory.has(goalDetail.when)) {
        // If the goal belongs to a known category, add it to the corresponding category
        goalsByCategory.get(goalDetail.when).push(elem);
      } else {
        // If it has a goalDetail but no recognized category, treat it as uncategorized
        uncategorizedGoals.push(elem);
      }
    });

    // Flatten the categorized goals back into a single array based on the categoryOrder
    const reorderedArray = categoryOrder
      .flatMap((category) => goalsByCategory.get(category))
      .concat(uncategorizedGoals); // Add the uncategorized goals at the end in their original order

    return reorderedArray;
  };

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let modalOpen = (Values) => {
    setModalObject(Values);
    setFlagState(true);
  };

  let modalOpenQuestions = (Values) => {
    setModalObject(Values);
    setFlagState(true);
  };

  return (
    <div className="container-fluid minheight73" style={{ marginTop: "-80px" }}>
      <ModalComponent
        modalObject={modalObject}
        setFlagState={setFlagState}
        flagState={flagState}
      >
        {modalObject.key !== "MainModal" ? (
          <GoalsForm />
        ) : (
          <GoalsObjectivesQuestions />
        )}
      </ModalComponent>

      <div className="row">
        <div className="col-md-12">
          <div className="pb-4 px-4 my-3">
            <h3
              className="text-center GreenColor"
              onClick={() => {
                console.log(goalsDetail);
              }}
            >
              <b>Goals & Objectives</b>
            </h3>
          </div>
        </div>

        <div className="col-md-12">
          <div className="d-flex justify-content-center ">
            <div
              className="QuestionIcon p-3 curser-pointer"
              style={{ marginTop: "-50px", width: "9%" }}
              onClick={() => {
                modalOpenQuestions({
                  title: "Goals and Objectives",
                  key: "MainModal",
                  allGoals,
                });
              }}
            >
              <img className="img-fluid" src={Add} alt="" />
            </div>
            {/* <h3>komail</h3> */}
          </div>
          <h3 className="text-center d-none" style={{ marginTop: "-20px" }}>
            Add Your Goals
          </h3>
          {/* <hr /> */}
        </div>
      </div>

      <div className="row justify-content-center">
        {/* object renter */}
        {Object.entries(allGoals).map(([category, goals]) => {
          let reorderdGoals = ReorderFunction(goals);

          return (
            <React.Fragment>
              {reorderdGoals.map((goal, index) => {
                if (GQSObj[goal.key] === "Yes") {
                  // count how many entries in GQSObj are "Yes" and determine even/odd
                  const yesKeys = Object.keys(GQSObj || {}).filter(
                    (k) => GQSObj[k] === "Yes"
                  );
                  const numberOfYes = yesKeys.length;
                  const isEvenNumberOfYes = numberOfYes % 2 === 0;

                  // (optional) expose values for layout decisions
                  console.log(
                    "Goals with Yes:",
                    numberOfYes,
                    "isEven:",
                    isEvenNumberOfYes
                  );

                  return (
                    <div
                      className={`${evenClass ? "col-md-3" : "col-md-4"}  mb-4`}
                      key={index}
                    >
                      <Card
                        className="py-4 shadow GoalsobjectiveCard px-4"
                        style={{ borderRadius: "20px", height: "100%" }}
                      >
                        <h5
                          className="text-center mt-2 capitalize"
                          onClick={() => {
                            console.log(goalsDetail[goal.key]);
                          }}
                        >
                          {goal.title}
                        </h5>
                        <div className="QuestionIcon CardImg">
                          <img className="img-fluid" src={goal.img} alt="" />
                        </div>

                        <div className="d-flex justify-content-center align-items-center gap-3 d-none">
                          <div className="">
                            <h5
                              className="text-center mt-2 capitalize"
                              onClick={() => {
                                console.log(goalsDetail[goal.key]);
                              }}
                            >
                              {goal.title}
                            </h5>
                          </div>
                          {goal.modalBtn === "head" && (
                            <div className="">
                              <label className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer">
                                <div>
                                  <FontAwesomeIcon
                                    icon={faArrowUpRightFromSquare}
                                  />
                                </div>
                              </label>
                            </div>
                          )}
                        </div>
                        <Formik
                          initialValues={{
                            scopeOfAdvice: "",
                            when: "",
                            estimatedValue: "",
                            description: "",
                          }}
                          onSubmit={() => {}}
                          enableReinitialize
                        >
                          {({ values, setFieldValue }) => {
                            return (
                              <Form className="smallerInput">
                                <div className="row justify-content-center align-items-center my-2 ">
                                  <div className="col-12 p-0 ">
                                    <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                                      <label
                                        className=" d-block text-center"
                                        htmlFor={"scopeOfAdvice" + [goal.key]}
                                      >
                                        Scope of Advice
                                      </label>

                                      {goal.modalBtn === "label" && (
                                        <label
                                          role="button"
                                          className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                          onClick={() => {
                                            modalOpen(goal);
                                          }}
                                        >
                                          <div>
                                            <FontAwesomeIcon
                                              icon={faArrowUpRightFromSquare}
                                            />
                                          </div>
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="d-flex justify-content-center align-items-center">
                                  <Field
                                    type="text"
                                    className="form-control inputDesign"
                                    id={"scopeOfAdvice" + [goal.key]}
                                    placeholder="Scope of Advice"
                                    name="scopeOfAdvice"
                                    readOnly
                                    value={
                                      goalsDetail[goal.key]?.scopeOfAdvice || ""
                                    }
                                  />
                                </div>

                                <div
                                  className={`row justify-content-center align-items-center my-2 `}
                                >
                                  <div className="col-12 p-0 ">
                                    <label
                                      className=" d-block text-center"
                                      htmlFor={"estimatedValue" + [goal.key]}
                                    >
                                      Amount{" "}
                                    </label>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                  <Field
                                    type="text"
                                    className={`form-control inputDesign `}
                                    id={"estimatedValue" + [goal.key]}
                                    placeholder={"Amount"}
                                    name={"estimatedValue"}
                                    readOnly
                                    value={
                                      goalsDetail[goal.key]?.estimatedValue
                                        ? `${
                                            goalsDetail[goal.key].estimatedValue
                                          }`
                                        : ""
                                    }
                                  />
                                </div>

                                {goal.modalBtn === "button" && (
                                  <button className=" btn btn-outline-secondary w-100 mt-3">
                                    Enter Details
                                    <div className="iconContainer ms-3">
                                      {/*
                                                                    <img className="img-fluid" src={plus} alt="" />
                                                                    */}
                                      <label className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer">
                                        <div>
                                          <FontAwesomeIcon
                                            icon={faArrowUpRightFromSquare}
                                          />
                                        </div>
                                      </label>
                                    </div>
                                  </button>
                                )}
                              </Form>
                            );
                          }}
                        </Formik>
                      </Card>
                    </div>
                  );
                }
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default GoalsObjectiveNew;
