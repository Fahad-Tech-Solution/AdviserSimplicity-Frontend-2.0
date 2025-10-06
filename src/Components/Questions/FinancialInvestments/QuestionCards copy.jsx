import React from "react";
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
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { PersonalDetailsData, QuestionDetail } from "../../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
// Example card config
const questionConfig = {
  "/user/personal-assets": [
    {
      title: "Own a Family Home",
      key: "familyHome",
      img: homeSvg,
      variant: "default",
    },
    {
      title: "Car",
      key: "car",
      img: carSvg,
      api: "/car",
      variant: "combined",
    },
    {
      title: "House hold",
      key: "houseHold",
      api: "/houseHold",
      img: houseHoldSvg,
      variant: "combined",
    },
    {
      title: "Boat",
      key: "boat",
      api: "/boat",
      img: boatSvg,
      variant: "combined",
    },
    {
      title: "Caravan",
      key: "caravan",
      api: "/caravan",
      img: trailerSvg,
      variant: "combined",
    },
    {
      title: "Other Assets",
      key: "otherAssets",
      img: settingMoneySvg,
      variant: "reuse",
    },
    {
      title: "Personal Debt",
      key: "personalLoans",
      img: moneyGivingPng,
      variant: "twoInOne",
    },
  ],
  "/user/personal-income": [
    {
      title: "Employment Income",
      key: "incomeFromEmployment",
      img: businessmanSvg,
      variant: "default",
    },
    {
      title: "Sole Trader",
      key: "incomeFromSoleTrader",
      img: businessIncomePng,
      variant: "default",
    },
    {
      title: "Partnership",
      key: "incomeFromPartnership",
      img: businessPartnershipPng,
      variant: "default",
    },
    {
      title: "Centerlink Payments",
      key: "incomeFromCentrelink",
      img: gearsSvg,
      variant: "default",
    },
    {
      title: "LifeTime Benefits",
      key: "incomeFromSuperPayment",
      img: moneySvg,
      variant: "default",
    },
    {
      title: "Overseas Pension",
      key: "incomeFromOverseasPension",
      img: overseasSvg,
      variant: "default",
    },
    {
      title: "Inheritance",
      key: "incomeFromInheritance",
      img: inheritancePng,
      variant: "single",
    },
    {
      title: "Lumpsum Expenses",
      key: "incomeFromLumpsumExpense",
      img: moneyBagSvg,
      variant: "default",
    },
    {
      title: "Regular Living Expenses",
      key: "incomeFromRegularLivingExpenses",
      img: moneyBagPng,
      variant: "twoInOne",
    },
  ],
};

const QuestionCard = ({
  title,
  keyName,
  img,
  partnerModal = false,
  onOpen,
  questionDetail,
  personalDetailObj,
}) => {
  const renderInput = (role, modalIcon = true) => {
    const preferredName =
      role === "client"
        ? personalDetailObj.client?.clientPreferredName || "Client"
        : personalDetailObj.partner?.partnerPreferredName || "Partner";

    const value =
      questionDetail && questionDetail[keyName]?.[`${role}Total`]
        ? questionDetail[keyName][`${role}Total`]
        : "";

    return (
      <>
        {modalIcon && (
          <div className="d-flex mt-2  justify-content-center align-items-center gap-2">
            <label
              role="button"
              className=" bg-secondary rounded-circle text-light py-1 px-2 "
              onClick={() => {
                onOpen(title, role, "General Living");
              }}
            >
              <FaArrowUpRightFromSquare />
            </label>
          </div>
        )}

        <label className="d-block mt-2" htmlFor={role}>
          {preferredName}
        </label>
        <input
          style={{ textAlign: "center" }}
          className="form-control inputDesign mt-2"
          placeholder={title}
          value={value}
          readOnly
        />
      </>
    );
  };

  return (
    <div className="col-md-3 mb-4">
      <div className="card shadow p-3 h-100" style={{ borderRadius: "16px" }}>
        <h5 className="text-center fw-bold mb-4" style={{ fontSize: "19px" }}>
          {title}
        </h5>
        <div className="text-center mb-3">
          <img src={img} alt={title} style={{ width: 60, height: 60 }} />
        </div>

        {/* Client always visible */}
        {renderInput("client")}

        {/* Show Partner only if not single/widowed */}
        {!["Single", "Widowed"].includes(
          personalDetailObj.client?.clientMaritalStatus
        ) && renderInput("partner", partnerModal)}
      </div>
    </div>
  );
};

const QuestionCards = ({ questionKey, CRObject }) => {
  const questions = questionConfig[questionKey] || [];

  // Only render cards where CRObject[key] === "Yes"
  const visibleQuestions = questions.filter(
    (q) => !CRObject || CRObject[q.key] === "Yes"
  );

  const personalDetailObj = useRecoilValue(PersonalDetailsData);
  const [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);

  return (
    <div className="container-fluid my-4">
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
    </div>
  );
};

export default QuestionCards;
