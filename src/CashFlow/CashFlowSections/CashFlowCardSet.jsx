import React, { useCallback, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";

import ModalComponent from "../../Components/Questions/FinancialInvestments/ModalComponent";
import Add from "../../Components/Questions/svgs/add-circle-solid-svgrepo-com.svg";

import { content } from "../../Content/Content";
import { QuestionShift } from "../../Store/Store";

import CFQModal from "./CFQModal";
import CashFlowCarsCards from "./CashFlowCarsCards";

// ---- IMPORT MODALS ----
import CashFlowOverseasPensions from "../Income&ExpenseComponents/CashFlowNew/CashFlowOverseasPensions";
import CashFlowOtherNoneTaxable from "../Income&ExpenseComponents/CashFlowNew/CashFlowOtherNoneTaxable";
import CashFlowBusinessIncome from "../Income&ExpenseComponents/CashFlowNew/CashFlowBusinessIncome";
import CashFlowRegularLiving from "../Income&ExpenseComponents/CashFlowNew/CashFlowRegulerLiving";
import CashFlowLifetimeBenefit from "../Income&ExpenseComponents/CashFlowNew/CashFlowLifetimeBenefit";
import CashFlowPartnership from "../Income&ExpenseComponents/CashFlowNew/CashFlowPartnership";
import ChildeCashFlowEducationExpenses from "../Income&ExpenseComponents/CashFlowNew/CashFlowEducationExpenses";
import CashFlowSoleTradeIncome from "../Income&ExpenseComponents/CashFlowNew/CashFlowSoleTradeIncome";
import CashFlowCenterLink from "../Income&ExpenseComponents/CashFlowNew/CashFlowCenterLink";
import CashFlowEmploymentIncome from "../Income&ExpenseComponents/CashFlowNew/CashFlowEmploymentIncome";

import CashFlowOtherAsset from "../PersonalAssetsComponents/CashFlowNew/CashFlowOtherAsset";
import CashFlowFamilyHome from "../PersonalAssetsComponents/CashFlowNew/CashFlowFamilyHome";
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
import SMSFInvestmentLoan from "../SMSF/SMSFInvestmentLoan";
import SMSFInvestmentProperties from "../SMSF/SMSFInvestmentProperties";
import WestFamilyTrustInvestment from "../Family Trust/WestFamilyTrustInvestment";
import FamilyTrustBankAccount from "../Family Trust/FamilyTrustBankAccount";

// ------------------------------------------------

const CashFlowCardSet = ({ Data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cashFlow } = content;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalObject, setModalObject] = useState(null);

  // ---- MODAL COMPONENT MAP (memoized) ----
  const componentMap = useMemo(
    () => ({
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
    }),
    []
  );

  // ---- HELPERS ----
  const getCurrentIndex = useCallback(
    () => cashFlow.findIndex((i) => i.route === location.pathname),
    [cashFlow, location.pathname]
  );

  const openModal = useCallback((obj) => {
    console.log(obj, "new");
    setModalObject(obj);
    setIsModalOpen(true);
  }, []);

  const handleNext = useCallback(() => {
    const index = getCurrentIndex();
    const next = cashFlow[index + 1];

    navigate(next ? next.route : "/user/cashflow/reports/");
  }, [cashFlow, getCurrentIndex, navigate]);

  const handleBack = useCallback(() => {
    const index = getCurrentIndex();
    const prev = cashFlow[index - 1];

    if (prev) navigate(prev.route);
  }, [cashFlow, getCurrentIndex, navigate]);

  // ---- RENDER MODAL CONTENT ----
  const renderModalContent = () => {
    if (modalObject?.key === "CFQ") {
      return componentMap.CFQModal || null;
    } else {
      return componentMap[modalObject?.title] || null;
    }
  };

  return (
    <div className="container-fluid">
      <ModalComponent
        modalObject={modalObject}
        flagState={isModalOpen}
        setFlagState={setIsModalOpen}
      >
        {renderModalContent()}
      </ModalComponent>

      <div className="row m-0">
        <div className="col-md-12">
          <div className="pb-4 bg-white borderOverAll rounded text-center">
            {/* Question Button */}
            <div
              className="QuestionIcon p-3 cursor-pointer"
              onClick={() =>
                openModal({
                  title: `${Data.subTitle} Questions`,
                  CashFlowQuestionSetKey: Data.key,
                  QuestionsArray: Data.QuestionsArray,
                  key: "CFQ",
                })
              }
            >
              <img src={Add} className="img-fluid min-w-25" alt="Add" />
            </div>

            {/* Cards */}
            <CashFlowCarsCards Data={Data} OpenModal={openModal} />

            {/* Navigation */}
            <div className="row mt-2">
              <div className="col-md-12">
                <button
                  className="btn w-25 btn-outline backBtn mx-3"
                  onClick={handleBack}
                >
                  Back
                </button>

                <button
                  className="btn w-25 bgColor modalBtn"
                  onClick={handleNext}
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
