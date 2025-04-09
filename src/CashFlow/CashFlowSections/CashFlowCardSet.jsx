import React, { useEffect, useState } from "react";
import ModalComponent from "../../Components/Questions/FinancialInvestments/ModalComponent";
import Add from "../../Components/Questions/svgs/add-circle-solid-svgrepo-com.svg";

import { content } from "../../Content/Content";

import { QuestionShift } from "../../Store/Store";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import CFQModal from "./CFQModal";

import CashFlowCarsCards from "./CashFlowCarsCards";
import CashFlowOverseasPensions from "../Income&ExpenseComponents/CashFlowNew/CashFlowOverseasPensions";
import CashFlowOtherNoneTaxable from "../Income&ExpenseComponents/CashFlowNew/CashFlowOtherNoneTaxable";
import CashFlowBusinessIncome from "../Income&ExpenseComponents/CashFlowNew/CashFlowBusinessIncome";
import CashFlowRegularLiving from "../Income&ExpenseComponents/CashFlowNew/CashFlowRegulerLiving";
import CashFlowLifetimeBenefit from "../Income&ExpenseComponents/CashFlowNew/CashFlowLifetimeBenefit";
import CashFlowPartnership from "../Income&ExpenseComponents/CashFlowNew/CashFlowPartnership";
import ChildeCashFlowEducationExpenses from "../Income&ExpenseComponents/CashFlowNew/CashFlowEducationExpenses";
import CashFlowSoleTradeIncome from "../Income&ExpenseComponents/CashFlowNew/CashFlowSoleTradeIncome";
import CashFlowCenterLink from "../Income&ExpenseComponents/CashFlowNew/CashFlowCenterLink";

import CashFlowOtherAsset from "../PersonalAssetsComponents/CashFlowNew/CashFlowOtherAsset";
import CashFlowFamilyHome from "../PersonalAssetsComponents/CashFlowNew/CashFlowFamilyHome";
import CashFlowEmploymentIncome from "../Income&ExpenseComponents/CashFlowNew/CashFlowEmploymentIncome";
import CashFlowPersonalDebt from "../PersonalAssetsComponents/CashFlowNew/CashFlowPersonalDebt";
import CashFlowAustralianShares from "../Financial Investments/CashFlowAustralianShares";
import CashFlowCashBankDetails from "../Financial Investments/CashFlowCashBankDetails";
import CashFlowInvestmentLoansLOC from "../Financial Investments/CashFlowInvestmentLoansLOC";
import CashFlowMarginLoan from "../Financial Investments/CashFlowMarginLoan";
import CashFlowInvestmentsProperty from "../Financial Investments/CashFlowInvestmentsProperty";
import CFSuperFund from "../Financial Investments/CFSuperFund";
import CFAccountBasedPension from "../Financial Investments/CFAccountBasedPension";
import CFAnnuities from "../Financial Investments/CFAnnuities";

import BusinessInvestmentsMiddleware from "../BusinessInvestment/BusinessInvestmentsMiddleware";
import SMSFAccumulationDetails from "../SMSF/SMSFAccumulationDetails";
import SMSFPensionAccountDetails from "../SMSF/SMSFPensionAccountDetails";
import SMSFBank from "../SMSF/SMSFBank";
import SMSFTermDeposit from "../SMSF/SMSFTermDeposit";
import SMSFInvestmentProperties from "../SMSF/SMSFInvestmentProperties";
import SMSFInvestmentLoan from "../SMSF/SMSFInvestmentLoan";
import WestFamilyTrustInvestment from "../Family Trust/WestFamilyTrustInvestment";
import FamilyTrustBankAccount from "../Family Trust/FamilyTrustBankAccount";

const CashFlowCardSet = (props) => {
  let [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});
  let { cashFlow } = content;

  const componentMapping = {
    CFQModal: <CFQModal />, // inner Modal just for Questions Yes/No

    //First Section Modals Income and Expanse
    "Overseas Pensions": <CashFlowOverseasPensions />,
    "Sole Trader Income": <CashFlowSoleTradeIncome />,
    "Partnership Income": <CashFlowPartnership />,
    "Centrelink Payments/Benefits": <CashFlowCenterLink />,
    "Lifetime Benefits": <CashFlowLifetimeBenefit />,
    "Employment Income": <CashFlowEmploymentIncome />,
    "Business Income": <CashFlowBusinessIncome />,
    "Other Non-Taxable": <CashFlowOtherNoneTaxable />,
    "Regular Living Expenses": <CashFlowRegularLiving />,
    "Education Expenses": <ChildeCashFlowEducationExpenses />,

    //Second Section Modals LifeStyle Assets & Debt
    "Own a Family Home": <CashFlowFamilyHome />,
    Contents: <CashFlowOtherAsset />,
    Car: <CashFlowOtherAsset />,
    "Motor Vehicle 2": <CashFlowOtherAsset />,
    Boat: <CashFlowOtherAsset />,
    Caravan: <CashFlowOtherAsset />,
    "Other Assets": <CashFlowOtherAsset />,
    "Personal Loans": <CashFlowPersonalDebt />,
    "Credit Card": <CashFlowPersonalDebt />,

    //Second Section Modals Financial Investments
    "Australian Shares": <CashFlowAustralianShares />,
    "Platform Investment": <CashFlowAustralianShares />,
    "Other Investments": <CashFlowAustralianShares />,

    // Same type of Modal
    Cash: <CashFlowCashBankDetails />,
    "Term Deposits": <CashFlowCashBankDetails />,
    "Investment Bonds": <CashFlowCashBankDetails />,

    "Investment Loans (LOC)": <CashFlowInvestmentLoansLOC />,
    "Margin Loan": <CashFlowMarginLoan />,
    "Investments Property": <CashFlowInvestmentsProperty />,

    // Same type of Modal
    "Super Fund": <CFSuperFund />,
    "Account Based Pension": <CFAccountBasedPension />,
    Annuities: <CFAnnuities />,

    //Business Investments
    "Dividend Income": <BusinessInvestmentsMiddleware />,
    "Business as Trusts": <BusinessInvestmentsMiddleware />,
    "Bucket Company": <BusinessInvestmentsMiddleware />,

    //SMSF Section
    "SMSF Accumulation Details": <SMSFAccumulationDetails />,
    "SMSF Pension Account Details": <SMSFPensionAccountDetails />,
    "SMSF Bank": <SMSFBank />,
    "SMSF Term Deposit": <SMSFTermDeposit />,

    "SMSF Australian Shares": <CashFlowAustralianShares />,
    "SMSF Platform Investment": <CashFlowAustralianShares />,
    SMSF: <CashFlowAustralianShares />,
    "SMSF Investment Loan": <SMSFInvestmentLoan />,
    "SMSF Investment Properties": <SMSFInvestmentProperties />,

    //Family Trust Section
    "West Family Trust Investment": <WestFamilyTrustInvestment />,
    "Family Trust Bank Account": <FamilyTrustBankAccount />,
    "Family Trust Term Deposits": <SMSFTermDeposit />,

    "Family Trust Australian Shares": <CashFlowAustralianShares />,
    "Family Trust Platform Investment": <CashFlowAustralianShares />,
    "Family Trust": <CashFlowAustralianShares />,
    "Family Trust Investment Loan": <SMSFInvestmentLoan />,
    "Family Trust Investment Properties": <SMSFInvestmentProperties />,
  };

  const ModalContent = (obj) => {
    if (obj.key === "CFQ") {
      return componentMapping.CFQModal || null;
    } else {
      return componentMapping[obj.title] || null;
    }
  };

  let Navigation = useNavigate();

  const HandleSubmit = () => {
    console.log(QuestionChange);

    const currentIndex = cashFlow.findIndex(
      (item) =>
        item.route === `/${location.pathname.replace("/Cash-Flow/", "")}`
    );
    let nextIndex = currentIndex + 1;

    const nextItem = cashFlow[nextIndex];

    if (!nextItem) {
      Navigation(`/Cash-Flow/Reports/`);
    } else {
      Navigation(`/Cash-Flow` + nextItem.route);
    }
  };

  const BackHandle = () => {
    // Find the current item index based on the QuestionChange state
    const currentIndex = cashFlow.findIndex(
      (item) =>
        item.route === `/${location.pathname.replace("/Cash-Flow/", "")}`
    );

    let nextIndex = currentIndex - 1;

    const nextItem = cashFlow[nextIndex];

    Navigation(`/Cash-Flow` + nextItem.route);
  };

  let OpenModal = (props) => {
    // console.log(props);
    setFlagState(true);
    setModalObject(props);
  };

  return (
    <div className="container-fluid">
      <ModalComponent
        modalObject={modalObject}
        setFlagState={setFlagState}
        flagState={flagState}
      >
        {ModalContent(modalObject)}
      </ModalComponent>

      <div className="row m-0">
        <div className="col-md-12">
          <div className="pb-4 bg-white  borderOverAll  rounded text-center">
            <div>
              <div
                className="QuestionIcon p-3 curser-pointer"
                onClick={() => {
                  setFlagState(true);
                  setModalObject({
                    title: props.Data.subTitle + " Questions",
                    CashFlowQuestionSetKey: props.Data.key,
                    QuestionsArray: props.Data.QuestionsArray,
                    key: "CFQ",
                  });
                }}
              >
                <img className="img-fluid min-w-25" src={Add} alt="" />
              </div>
            </div>

            <CashFlowCarsCards OpenModal={OpenModal} Data={props.Data} />

            <div className="row mt-2">
              <div className="col-md-12">
                <button
                  onClick={BackHandle}
                  className="float-center btn w-25  btn-outline  backBtn mx-3"
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

export default CashFlowCardSet;
