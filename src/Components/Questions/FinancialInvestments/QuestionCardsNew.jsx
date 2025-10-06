// import React from "react";
/*-----"/user/personal-assets"-----------*/
import homeSvg from "../svgs/home-svgrepo-com.svg";
import carSvg from "../svgs/car.svg";
import houseHoldSvg from "../svgs/warehouse-.svg";
import boatSvg from "../svgs/boat.svg";
import trailerSvg from "../svgs/trailer-caravan.svg";
import settingMoneySvg from "../svgs/settingMoney.svg";
import moneyGivingPng from "../svgs/moneyGiving.png";

/*-----"/user/personal-income"-----------*/
import businessmanSvg from "../svgs/businessman.svg";
import businessIncomePng from "../svgs/business-income.png";
import businessPartnershipPng from "../svgs/businessPartnership.png";
import gearsSvg from "../svgs/gears-gear-svgrepo-com.svg";
import moneySvg from "../svgs/money-3.svg";
import overseasSvg from "../svgs/overseas.svg";
import inheritancePng from "../svgs/inheritance.png";
import moneyBagSvg from "../svgs/money-bag-svgrepo-com.svg";
import moneyBagPng from "../svgs/money-bag.png";

/*---------------"Practical imports"----------------------------*/
import React, { useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { PersonalDetailsData, QuestionDetail } from "../../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import EmploymentIncome from "../PersonalIncome/EmploymentIncome";
// // Example card config
const questionConfig = {
  "/user/personal-assets": [
    {
      title: "Own a Family Home",
      keyName: "familyHome",
      img: homeSvg,
    },
    {
      title: "Car",
      keyName: "car",
      img: carSvg,
      api: "/car",
    },
    {
      title: "House hold",
      keyName: "houseHold",
      api: "/houseHold",
      img: houseHoldSvg,
    },
    {
      title: "Boat",
      keyName: "boat",
      api: "/boat",
      img: boatSvg,
    },
    {
      title: "Caravan",
      keyName: "caravan",
      api: "/caravan",
      img: trailerSvg,
    },
    {
      title: "Other Assets",
      keyName: "otherAssets",
      img: settingMoneySvg,
      variant: "reuse",
    },
    {
      title: "Personal Debt",
      keyName: "personalLoans",
      img: moneyGivingPng,
    },
  ],
  "/user/personal-income": [
    {
      title: "Employment Income",
      keyName: "incomeFromOwnBusiness",
      img: businessmanSvg,
      Component: <EmploymentIncome />,
    },
    {
      title: "Sole Trader",
      keyName: "incomeFromSoleTrader",
      img: businessIncomePng,
    },
    {
      title: "Partnership",
      keyName: "incomeFromPartnership",
      img: businessPartnershipPng,
    },
    {
      title: "Centerlink Payments",
      keyName: "incomeFromCentrelink",
      img: gearsSvg,
    },
    {
      title: "LifeTime Benefits",
      keyName: "incomeFromSuperPayment",
      img: moneySvg,
    },
    {
      title: "Overseas Pension",
      keyName: "incomeFromOverseasPension",
      img: overseasSvg,
    },
    {
      title: "Inheritance",
      keyName: "incomeFromInheritance",
      img: inheritancePng,
    },
    {
      title: "Lumpsum Expenses",
      keyName: "incomeFromLumpsumExpense",
      img: moneyBagSvg,
    },
    {
      title: "Regular Living Expenses",
      keyName: "incomeFromRegularLivingExpenses",
      img: moneyBagPng,
    },
  ],
};

// Case 1: Default - Icon top, name below, input field
// Case 2: Personal Debt - Custom text right-aligned, icon, multiple inputs
// Case 3: Regular Living - Name/text, grouped input with custom function button
// Case 4: Contents - Simplified, both names shown, no partner input

const QuestionCard = ({
  title,
  keyName,
  img,
  variant = "case1", // "case1" | "case2" | "case3" | "case4"
  partnerModal = false,
  onOpen,
  questionDetail = {},
  personalDetailObj = {},
  customText = null,
  customButtonIcon = null,
  customButtonAction = null,
  hidePartner = false,
}) => {
  // Get preferred names
  const clientName = personalDetailObj.client?.clientPreferredName || "";
  const partnerName = personalDetailObj.partner?.partnerPreferredName || "";

  // Check if single or widowed
  const isSingleOrWidowed = ["Single", "Widowed"].includes(
    personalDetailObj.client?.clientMaritalStatus
  );
  console.log(questionDetail[keyName], keyName, title);
  // Get values
  const clientValue =
    questionDetail[keyName]?.clientTotal !== undefined
      ? `${questionDetail[keyName].clientTotal}`
      : "";

  const partnerValue =
    questionDetail[keyName]?.partnerTotal !== undefined
      ? `${questionDetail[keyName].partnerTotal}`
      : "";

  // Case 1: Default Layout
  const renderCase1 = () => (
    <>
      <div className="text-center mb-3">
        <img src={img} alt={title} style={{ width: 60, height: 60 }} />
      </div>

      {/* Client Input */}
      <div className="mb-3">
        <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
          <button
            className="btn btn-sm bg-secondary rounded-circle text-light d-flex align-items-center justify-content-center"
            style={{ width: 28, height: 28, padding: 0 }}
            onClick={() => onOpen?.(title, "client")}
          >
            <FaArrowUpRightFromSquare size={14} />
          </button>
        </div>
        <label className="d-block text-center mb-2 fw-medium">
          {clientName}
        </label>
        <input
          className="form-control inputDesign text-center"
          value={clientValue}
          readOnly
          placeholder={title}
        />
      </div>

      {/* Partner Input */}
      {!isSingleOrWidowed && !hidePartner && (
        <div>
          {partnerModal && (
            <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
              <button
                className="btn btn-sm bg-secondary rounded-circle text-light d-flex align-items-center justify-content-center"
                style={{ width: 28, height: 28, padding: 0 }}
                onClick={() => onOpen?.(title, "partner")}
              >
                <FaArrowUpRightFromSquare size={14} />
              </button>
            </div>
          )}
          <label className="d-block text-center mb-2 fw-medium">
            {partnerName}
          </label>
          <input
            className="form-control inputDesign text-center"
            value={partnerValue}
            readOnly
            placeholder={title}
          />
        </div>
      )}
    </>
  );

  // Case 2: Personal Debt Layout
  const renderCase2 = () => (
    <>
      <div className="text-center mb-3">
        <img src={img} alt={title} style={{ width: 60, height: 60 }} />
      </div>

      {/* Credit Card Section */}
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
          <span className="fw-medium">{customText || "Credit Card"}</span>
          <button
            className="btn btn-sm bg-secondary rounded-circle text-light d-flex align-items-center justify-content-center"
            style={{ width: 28, height: 28, padding: 0 }}
            onClick={() => onOpen?.(title, "client", "Credit Card")}
          >
            <FaArrowUpRightFromSquare size={14} />
          </button>
        </div>
        <input
          className="form-control inputDesign text-center"
          value={clientValue}
          readOnly
          placeholder={title}
        />
      </div>

      {/* Personal Loan Section */}
      <div>
        <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
          <span className="fw-medium">Personal Loan</span>
          <button
            className="btn btn-sm bg-secondary rounded-circle text-light d-flex align-items-center justify-content-center"
            style={{ width: 28, height: 28, padding: 0 }}
            onClick={() => onOpen?.(title, "partner", "Personal Loan")}
          >
            <FaArrowUpRightFromSquare size={14} />
          </button>
        </div>
        <input
          className="form-control inputDesign text-center"
          value={partnerValue}
          readOnly
          placeholder={title}
        />
      </div>
    </>
  );

  // Case 3: Regular Living Expenses Layout
  const renderCase3 = () => (
    <>
      <div className="text-center mb-4">
        <img src={img} alt={title} style={{ width: 60, height: 60 }} />
      </div>

      {/* General Living Section */}
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
          <span className="fw-medium">General Living</span>
          <button
            className="btn btn-sm bg-secondary rounded-circle text-light d-flex align-items-center justify-content-center"
            style={{ width: 28, height: 28, padding: 0 }}
            onClick={() => onOpen?.(title, "partner", "Personal Loan")}
          >
            <FaArrowUpRightFromSquare size={14} />
          </button>
        </div>
        <div className="input-group">
          <input
            className="form-control inputDesign text-center"
            placeholder="General Living Expenses"
            value={clientValue}
            readOnly
          />
        </div>
      </div>

      {/* Retirement Living Section */}
      <div>
        <label className="d-block text-center mb-2 fw-medium">
          Retirement Living
        </label>
        <div className="input-group">
          <input
            className="form-control inputDesign text-center"
            placeholder="Regular Living Expenses"
            value={partnerValue}
            readOnly
          />
          <button
            className="btn text-light d-flex align-items-center justify-content-center"
            style={{
              borderRadius: "0 8px 8px 0",
              backgroundColor: "#28a745",
              border: "2px solid #28a745",
              width: 40,
            }}
            onClick={() => customButtonAction?.()}
          >
            {customButtonIcon || <FaArrowUpRightFromSquare size={16} />}
          </button>
        </div>
      </div>
    </>
  );

  // Case 4: Contents Layout (Simplified)
  const renderCase4 = () => (
    <>
      <div className="text-center mb-3">
        <img src={img} alt={title} style={{ width: 60, height: 60 }} />
      </div>

      {/* Icon Button */}
      <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
        <button
          className="btn btn-sm bg-secondary rounded-circle text-light d-flex align-items-center justify-content-center"
          style={{ width: 28, height: 28, padding: 0 }}
          onClick={() => onOpen?.(title, "both")}
        >
          <FaArrowUpRightFromSquare size={14} />
        </button>
      </div>

      {/* Both Names Displayed */}
      <label className="d-block text-center mb-2 fw-medium">
        {clientName} & {partnerName}
      </label>

      {/* Single Input */}
      <input
        className="form-control inputDesign text-center"
        value={clientValue}
        readOnly
        placeholder={title}
      />
    </>
  );

  let allCases = {
    case1: renderCase1(),
    case2: renderCase2(),
    case3: renderCase3(),
    case4: renderCase4(),
  };

  let Rendred = (variant) => {
    return allCases[variant || "case1"];
  };

  return (
    <div className="col-md-3 mb-4">
      <div
        className="card shadow px-4 py-4 h-100 borderOverAll GoalsobjectiveCard"
        style={{ borderRadius: "20px" }}
      >
        <h5 className="text-center fw-bold mb-3">{title}</h5>

        {Rendred(variant)}
      </div>
    </div>
  );
};

// Demo Component
const QuestionCardsDemo = ({ questionKey, CRObject }) => {
  const [modalInfo, setModalInfo] = useState(null);

  const personalDetailObj = useRecoilValue(PersonalDetailsData);
  const [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);

  const handleOpen = (title, role, subType) => {
    setModalInfo({ title, role, subType });
    console.log(
      `Opening modal for ${title} - ${role}${subType ? ` - ${subType}` : ""}`
    );
  };

  const questions = questionConfig[questionKey] || [];

  // Only render cards where CRObject[key] === "Yes"
  const visibleQuestions = questions.filter(
    (q) => !CRObject || CRObject[q.key] === "Yes"
  );

  return (
    <div
      className="container-fluid my-4"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <div className="row">
        {visibleQuestions.map((q, idx) => (
          <QuestionCard
            key={idx}
            {...q}
            onOpen={() => console.log("Open modal for", q.title)}
            personalDetailObj={personalDetailObj}
            questionDetail={questionDetail}
            setQuestionDetail={setQuestionDetail}
          />
        ))}
      </div>

      {modalInfo && (
        <div className="alert alert-info mt-4">
          <strong>Modal Info:</strong> {modalInfo.title} - {modalInfo.role}
          {modalInfo.subType && ` - ${modalInfo.subType}`}
        </div>
      )}
    </div>
  );
};

export default QuestionCardsDemo;
