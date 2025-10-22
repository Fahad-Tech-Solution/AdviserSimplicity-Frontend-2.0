import React, { useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Field, Form, Formik } from "formik";
import { Button, InputGroup } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  defaultUrl,
  PersonalDetailsData,
  QuestionDetail,
} from "../../../Store/Store";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  toCommaAndDollar,
} from "../../Assets/Api/Api";
import ModalComponent from "./ModalComponent";

/* SVG imports */
import homeSvg from "../svgs/home-svgrepo-com.svg";
import carSvg from "../svgs/car.svg";
import houseHoldSvg from "../svgs/warehouse-.svg";
import boatSvg from "../svgs/boat.svg";
import settingMoneySvg from "../svgs/settingMoney.svg";
import moneyGivingPng from "../svgs/moneyGiving.png";
import businessmanSvg from "../svgs/businessman.svg";
import businessIncomePng from "../svgs/business-income.png";
import businessPartnershipPng from "../svgs/businessPartnership.png";
import gearsSvg from "../svgs/gears-gear-svgrepo-com.svg";
import moneySvg from "../svgs/money-3.svg";
import overseasSvg from "../svgs/overseas.svg";
import moneyBagPng from "../svgs/money-bag.png";
import BankImg from "../svgs/bank.svg";
import TermImg from "../svgs/TermDepositCanva.png";
import PortFolio from "../svgs/portfolio.svg";
import analytics from "../svgs/analytics.png";
import funds from "../svgs/funds.svg";
import certificate from "../svgs/certificate.svg";
import property from "../svgs/property-value.svg";
import loan from "../svgs/loan.svg";
import piggybank1 from "../svgs/piggy-bank.svg";
import calender from "../svgs/calendar.png";
import piggybank2 from "../svgs/piggy-bank-new.svg";
import will from "../svgs/page-with-curl-svgrepo-com.svg";
import advisor from "../svgs/online-interview-male-svgrepo-com.svg";
import POA from "../svgs/conversation-person-svgrepo-com.svg";
import lifeImg from "../svgs/lifeimg.svg";
import TPDImg from "../svgs/tpdimg.svg";
import incomeImg from "../svgs/asd.png";
import traumaImg from "../svgs/traumaimg.svg";
import Business_building from "../svgs/building-small-svgrepo-com.svg";
import people from "../svgs/property-value.svg";
import investmentCircle from "../svgs/investmentCircle.png";

/* Components */
import OwnFamilyHome from "../AdditionalQueriesPersonalAssets/OwnFamilyHome";
import AssetInfo from "../AdditionalQueriesPersonalAssets/AssetInfo";
import PersonalLoan from "./QuestionsDetail/PersonalLoan";
import CreditCard from "./QuestionsDetail/CreditCard";
import EmploymentIncome from "../PersonalIncome/EmploymentIncome";
import Partnership from "../PersonalIncome/Partnership";
import CenterLinkPayments from "../PersonalIncome/CenterLinkPayments";
import LifeTimeBeneFits from "../PersonalIncome/LifetimeBenefits";
import OverseasPension from "../PersonalIncome/OverseasPension";
import RegularLivingExpenses from "../PersonalIncome/RegularLivingExpenses";
import SoleTrader from "../PersonalIncome/SoleTrader";
import { FaRegSave } from "react-icons/fa";
import MiddleWare from "./MiddleWare";
import InvestmentPropertyDetails from "./QuestionsDetail/InvestmentPropertyDetails";
import InvestmentLoan from "./QuestionsDetail/InvestmentLoan";
import MarginLoan from "./QuestionsDetail/MarginLoan";
import EstatePlanningWill from "../EstatePlanning/EstatePlanningWill";
import EstatePlanningPOA from "../EstatePlanning/EstatePlanningPOA";
import EstatePlanningProfessionalAdviser from "../EstatePlanning/EstatePlanningProfessionalAdviser";
import trailer from "../svgs/trailer-caravan.svg";
import PersonalInsuranceLife from "../PersonalInsurance/LifeInsurance";
import OtherInvestmentsDynamic from "../QuestoinsSMSF/OtherInvestmentsDynamic";
import SmsfDetails from "../QuestoinsSMSF/SmsfDetails";
import SmsfAccumulationDetails from "../QuestoinsSMSF/SmsfAccumulationDetails";
import SmsfPensionAccountMiddleWare from "../QuestoinsSMSF/PensionAccount";
import FamilyDetails from "../QuestoinsFamilyTrust/FamilyDetails";
/*------------------------------------ CONFIG ------------------------------------*/
const questionConfig = {
  "/user/personal-income": [
    {
      title: "Employment Income",
      keyName: "incomeFromOwnBusiness",
      img: businessmanSvg,
      component: <EmploymentIncome />,
      DrawerWidth: "80%",
      Drawerheight: 300,
    },
    {
      title: "Sole Trader",
      keyName: "incomeFromSoleTrader",
      img: businessIncomePng,
      component: <SoleTrader />,
    },
    {
      title: "Partnership",
      keyName: "incomeFromPartnership",
      img: businessPartnershipPng,
      component: <Partnership />,
    },
    {
      title: "Centerlink Payments",
      keyName: "incomeFromCentrelink",
      img: gearsSvg,
      component: <CenterLinkPayments />,
    },
    {
      title: "LifeTime Benefits",
      keyName: "incomeFromSuperPayment",
      img: moneySvg,
      component: <LifeTimeBeneFits />,
    },
    {
      title: "Overseas Pension",
      keyName: "incomeFromOverseasPension",
      img: overseasSvg,
      component: <OverseasPension />,
    },
    {
      title: "Regular Living Expenses",
      keyName: "incomeFromRegularLivingExpenses",
      img: moneyBagPng,
      component: <RegularLivingExpenses />,
      variant: "case3",
      Labels: ["General Living", "Retirement Living"],
      dataKey: "generalLivingExpenses",
      BaceKeys: {
        client: "generalLivingExpensesTotal",
      },
      customButtonAction: async (
        values,
        questionDetail,
        setQuestionDetail,
        DefaultUrl,
        personalDetailObj
      ) => {
        try {
          if (!values?.retirementLivingExpense) {
            openNotificationSuccess(
              "error",
              "topRight",
              "Validation Error",
              "Please enter a valid retirement living expense value."
            );
            return;
          }

          const existing = questionDetail?.retirementLivingExpenses;
          const isUpdate = Boolean(existing?._id);
          const payload = {
            _id: isUpdate ? existing._id : undefined,
            retirementLivingExpense: values.retirementLivingExpense,
            clientFK: personalDetailObj?._id,
          };

          const apiUrl = `${DefaultUrl}/api/retirementLivingExpenses/${
            isUpdate ? "Update" : "Add"
          }`;
          const res = isUpdate
            ? await PatchAxios(apiUrl, payload)
            : await PostAxios(apiUrl, payload);

          if (!res) throw new Error("No response from API");

          setQuestionDetail((prev) => ({
            ...prev,
            retirementLivingExpenses: res,
          }));

          openNotificationSuccess(
            "success",
            "topRight",
            "Success",
            `Retirement Living Expense ${
              isUpdate ? "updated" : "added"
            } successfully!`
          );
        } catch (err) {
          console.error(err);
          openNotificationSuccess(
            "error",
            "topRight",
            "Error",
            "Failed to save retirement living data."
          );
        }
      },
      getInitialValues: (questionDetail) => {
        if (!questionDetail) return {};

        const sectionData = questionDetail["retirementLivingExpenses"];

        // ✅ Return data only if it exists and has a valid _id
        if (sectionData && sectionData._id) {
          return { ...sectionData };
        }

        // ✅ Otherwise return empty defaults
        return {};
      },
    },
  ],
  "/user/personal-assets": [
    {
      title: "Family Home",
      keyName: "familyHome",
      img: homeSvg,
      component: <OwnFamilyHome />,
      clientOnly: true,
    },
    {
      title: "Car",
      keyName: "car",
      img: carSvg,
      api: "/car",
      component: <AssetInfo />,
    },
    {
      title: "Contents",
      keyName: "houseHold",
      img: houseHoldSvg,
      variant: "case4",
      api: "/houseHold",
      component: <AssetInfo />,
      DrawerWidth: "60%",
      Drawerheight: 200,
    },
    {
      title: "Boat",
      keyName: "boat",
      img: boatSvg,
      variant: "case4",
      api: "/boat",
      component: <AssetInfo />,
      DrawerWidth: "60%",
      Drawerheight: 200,
    },
    {
      title: "Caravan",
      keyName: "caravan",
      img: trailer,
      variant: "case4",
      api: "/caravan",
      component: <AssetInfo />,
      DrawerWidth: "60%",
      Drawerheight: 200,
    },
    {
      title: "Other Assets",
      keyName: "otherAssets",
      api: "/personalAssets",
      img: settingMoneySvg,
      variant: "case2",
      component: <AssetInfo />,
      Labels: [
        {
          label: "Other Assets",
          value: (questionDetail) =>
            questionDetail?.otherAssets?.clientTotal ?? "",
          component: <AssetInfo />,
          key: "otherAssets",
        },
      ],
    },
    {
      title: "Personal Debt",
      keyName: "personalLoans",
      img: moneyGivingPng,
      variant: "case2",
      Labels: [
        {
          label: "Credit Card",
          value: (questionDetail) =>
            questionDetail?.creditCards?.clientTotal ?? "",
          component: <CreditCard />,
          key: "creditCards",
        },
        {
          label: "Personal Loan",
          value: (questionDetail) =>
            questionDetail?.personalLoans?.clientTotal ?? "",
          component: <PersonalLoan />,
          key: "personalLoans",
        },
      ],
    },
  ],
  "/user/financial-investments": [
    {
      title: "Bank Accounts",
      keyName: "bankAccountFinance",
      img: BankImg,
      component: <MiddleWare />,
    },
    {
      title: "Term Deposits",
      keyName: "termDepositsFinance",
      img: TermImg,
      component: <MiddleWare />,
    },
    {
      title: "Australian Shares/ETFs",
      keyName: "australianShareMarket",
      img: PortFolio,
      component: <MiddleWare />,
    },
    {
      title: "Platform Investments",
      keyName: "managedFund",
      img: funds,
      component: <MiddleWare />,
    },
    {
      title: "Investment Bond",
      keyName: "investmentBondFinance",
      img: certificate,
      component: <MiddleWare />,
    },
    //SuperAndRetirement
    {
      title: "Super Funds",
      keyName: "superAnnuationIssues",
      img: piggybank1,
      component: <MiddleWare />,
    },
    {
      title: "Account Based Pension",
      keyName: "accountBasedPensionIssues",
      img: piggybank2,
      component: <MiddleWare />,
    },
    {
      title: "Annuities",
      keyName: "annuitiesIssues",
      img: calender,
      component: <MiddleWare />,
    },
    // Investment
    {
      title: "Investment Properties",
      keyName: "investmentPropertyDetails",
      img: property,
      component: <InvestmentPropertyDetails />,
      Labels: ["Total Market Value", "Total Loan"],
    },
    {
      title: "Investment Loan",
      keyName: "managedFundsLOC",
      img: loan,
      component: <InvestmentLoan />,
    },
    {
      title: "Margin Loan",
      keyName: "managedFundsMarginLoan",
      img: analytics,
      component: <MarginLoan />,
    },
  ],
  "/user/estate-planning": [
    {
      title: "Wills",
      keyName: "will",
      img: will,
      component: <EstatePlanningWill />,
    },
    {
      title: "Power of Attorneys",
      keyName: "POA",
      img: POA,
      component: <EstatePlanningPOA />,
    },
    {
      title: "Professional Advisers",
      keyName: "professionalAdviser",
      img: advisor,
      showPartnerButton: true,
      component: <EstatePlanningProfessionalAdviser />,
    },
  ],
  "/user/personal-insurance": [
    {
      title: "Life Insurance",
      keyName: "life",
      dataKey: "personalInsurance",
      img: lifeImg,
      component: <PersonalInsuranceLife />,
      BaceKeys: {
        client: "clientLifeInsuranceTotal",
        partner: "partnerLifeInsuranceTotal",
      },
    },
    {
      title: "TPD",
      keyName: "life",
      dataKey: "personalInsurance",
      img: TPDImg,
      component: <PersonalInsuranceLife />,
      BaceKeys: {
        client: "clientTPDTotal",
        partner: "partnerTPDTotal",
      },
    },
    {
      title: "Trauma",
      keyName: "life",
      img: traumaImg,
      dataKey: "personalInsurance",
      component: <PersonalInsuranceLife />,
      BaceKeys: {
        client: "clientTraumaTotal",
        partner: "partnerTraumaTotal",
      },
    },
    {
      title: "Income Protection",
      keyName: "life",
      img: incomeImg,
      dataKey: "personalInsurance",
      component: <PersonalInsuranceLife />,
      BaceKeys: {
        client: "clientIncomeProtectionTotal",
        partner: "partnerIncomeProtectionTotal",
      },
    },
  ],
  "/user/business-entities": [
    {
      title: "Business as Company Structure",
      keyName: "BusinessAsCompanyStructure",
      img: Business_building,
      component: <MiddleWare />,
    },
    {
      title: "Business as Trusts",
      keyName: "BusinessAsTrusts",
      img: businessIncomePng,
      component: <MiddleWare />,
    },
  ],
  "/user/SMSF": [
    {
      title: "SMSF Details",
      keyName: "SMSFDetails",
      component: <SmsfDetails />,
      img: will,
    },
    {
      title: "SMSF Accumulation Details",
      keyName: "SMSFAccumulationDetails",
      component: <SmsfAccumulationDetails />,
      img: property,
    },
    {
      title: "SMSF Pension Phase",
      keyName: "SMSFPensionPhase",
      component: <SmsfPensionAccountMiddleWare />,
      img: calender,
    },
    {
      title: "SMSF Bank Accounts",
      keyName: "SMSFBank",
      img: BankImg,
      component: <MiddleWare />,
    },
    {
      title: "SMSF Term Deposits",
      keyName: "SMSFTermDeposits",
      img: TermImg,
      component: <MiddleWare />,
    },
    {
      title: "SMSF Australian Shares/ETFs",
      keyName: "SMSFAustralianShares",
      img: PortFolio,
      component: <MiddleWare />,
    },
    {
      title: "SMSF Platform Investments",
      keyName: "SMSFManagedFunds",
      img: funds,
      component: <MiddleWare />,
    },

    {
      title: "SMSF Investment Loan",
      keyName: "SMSFInvestmentLoan",
      img: analytics,
      component: <InvestmentLoan />,
    },
    {
      title: "SMSF Investment Properties",
      keyName: "SMSFInvestmentProperties",
      img: people,
      component: <InvestmentPropertyDetails />,
    },
    {
      title: "Other Investments",
      keyName: "SMSFOtherInvestment",
      img: investmentCircle,
      component: <OtherInvestmentsDynamic />,
    },
  ],
  "/user/family-trust": [
    {
      title: "Family Trust Details",
      keyName: "familyDetails",
      img: will,
      component: <FamilyDetails />,
    },
    {
      title: "Family Trust Bank Accounts",
      keyName: "familyBank",
      img: BankImg,
      component: <MiddleWare />,
    },
    {
      title: "Family Trust Term Deposits",
      keyName: "familyTermDeposit",
      img: TermImg,
      component: <MiddleWare />,
    },
    {
      title: "Family Trust Australian Shares/ETFs",
      keyName: "familyAustralianShare",
      img: PortFolio,
      component: <MiddleWare />,
    },
    {
      title: "Family Trust Platform Investments",
      keyName: "familyMangedFunds",
      img: funds,
      component: <MiddleWare />,
    },
    {
      title: "Family Trust Investment Loan",
      keyName: "familyInvestmentHomeLoan",
      img: analytics,
      component: <InvestmentLoan />,
    },
    {
      title: "Family Trust Investment Property",
      keyName: "familyInvestmentProperties",
      img: people,
      component: <InvestmentPropertyDetails />,
    },
    {
      title: "Other Family Investments",
      keyName: "familyOtherInvestment",
      img: investmentCircle,
      component: <OtherInvestmentsDynamic />,
    },
  ],
};

/*------------------------------------ CARD ------------------------------------*/
const QuestionCard = (props) => {
  const {
    title,
    keyName,
    img,
    variant = "case1", // "case1" | "case2" | "case3" | "case4"
    partnerModal = false,
    clientOnly = false,
    onOpen,
    questionDetail = {},
    personalDetailObj = {},
    customText = null,
    customButtonIcon = null,
    customButtonAction = null,
    hidePartner = false,
    Labels = [],
    getInitialValues = null,
    component = null,
    PopoverContent = null,
    evenClass,
    BaceKeys = null,
    dataKey = null,
  } = props;

  const clientName =
    Labels.length > 0
      ? Labels[0]
      : personalDetailObj.client?.clientPreferredName || "Client";
  const partnerName =
    Labels.length > 1
      ? Labels[1]
      : personalDetailObj.partner?.partnerPreferredName || "Partner";

  const jointName = personalDetailObj.client?.clientPreferredName +
          personalDetailObj.partner?.partnerPreferredName || "joint";

  const isSingle = ["Single", "Widowed"].includes(
    personalDetailObj.client?.clientMaritalStatus
  );

  const sourceKey = dataKey || keyName;

  const clientValue =
    questionDetail?.[sourceKey]?.[
      BaceKeys && Object.keys(BaceKeys).length > 0
        ? BaceKeys.client
        : "clientTotal"
    ] ?? "$0";
  const partnerValue =
    questionDetail?.[sourceKey]?.[
      BaceKeys && Object.keys(BaceKeys).length > 0
        ? BaceKeys.partner
        : "partnerTotal"
    ] ?? "$0";
  const jointValue =
    questionDetail?.[sourceKey]?.[
      BaceKeys && Object.keys(BaceKeys).length > 0
        ? BaceKeys.joint
        : "jointTotal"
    ] ?? "$0";

  const initialValues = getInitialValues?.(questionDetail) || {};

  // 🧩 CASE 1: Default
  const renderCase1 = () => {
    return (
      <>
        <div className="text-center mb-3">
          <img src={img} alt={title} width={60} height={60} />
        </div>

        {/* Client */}
        <div className="mb-3 text-center d-flex flex-column align-items-center justify-content-center">
          <button
            className="btn btn-sm bg-secondary rounded-circle text-light mb-2 d-flex align-items-center justify-content-center"
            onClick={() =>
              onOpen(title, keyName, component, "client", props?.api)
            }
            style={{ width: 28, height: 28, padding: 0 }}
          >
            <FaArrowUpRightFromSquare size={14} />
          </button>
          <div className="mb-2">{clientName}</div>
          <input
            className="form-control inputDesign text-center"
            value={clientValue || "$0"}
            readOnly
            placeholder={title}
          />
        </div>

        {/* Partner */}
        {!isSingle && !clientOnly && (
          <div className="mb-3 text-center d-flex flex-column align-items-center justify-content-center">
            {props?.showPartnerButton && (
              <button
                className="btn btn-sm bg-secondary rounded-circle text-light mb-2 d-flex align-items-center justify-content-center"
                onClick={() =>
                  onOpen(title, keyName, component, "partner", props?.api)
                }
                style={{ width: 28, height: 28, padding: 0 }}
              >
                <FaArrowUpRightFromSquare size={14} />
              </button>
            )}
            <div className="mb-2">{partnerName}</div>
            <input
              className="form-control inputDesign text-center"
              value={partnerValue || "$0"}
              readOnly
              placeholder={title}
            />
          </div>
        )}
      </>
    );
  };

  const LabelItem = ({
    lbl,
    title,
    questionDetail,
    Drawerheight,
    DrawerWidth,
    onOpen, // Add this prop
  }) => {
    const handleOpen = () => {
      // Pass the specific label's data to the modal
      onOpen(lbl.label, lbl.key, lbl.component);
    };

    return (
      <div className="mb-3 text-center">
        <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
          <span>{lbl.label}</span>

          <button
            className="btn btn-sm bg-secondary rounded-circle text-light d-flex align-items-center justify-content-center"
            onClick={handleOpen} // Use the local handleOpen
            style={{ width: 28, height: 28, padding: 0 }}
          >
            <FaArrowUpRightFromSquare size={14} />
          </button>
        </div>
        <div className="d-flex align-item-center justify-content-center">
          <input
            className="form-control inputDesign text-center"
            value={lbl.value?.(questionDetail) || "$0"}
            readOnly
            placeholder={title}
          />
        </div>
      </div>
    );
  };

  // 🧩 CASE 2: Labels with icon
  const renderCase2 = () => (
    <>
      <div className="text-center mb-3">
        <img src={img} alt={title} width={60} height={60} />
      </div>
      {Labels.map((lbl, i) => (
        <LabelItem
          key={i}
          lbl={lbl}
          title={title}
          questionDetail={questionDetail}
          Drawerheight={props?.Drawerheight}
          DrawerWidth={props?.DrawerWidth}
          onOpen={onOpen} // Pass the onOpen prop down
        />
      ))}
    </>
  );

  // 🧩 CASE 3: Form input + button
  const renderCase3 = () => (
    <>
      <div className="text-center mb-4">
        <img src={img} alt={title} width={60} height={60} />
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
          <span className="fw-medium">{Labels[0]}</span>
          <button
            className="btn btn-sm bg-secondary rounded-circle text-light d-flex align-items-center justify-content-center"
            style={{ width: 28, height: 28, padding: 0 }}
            onClick={() => onOpen?.(title, keyName, component)}
          >
            <FaArrowUpRightFromSquare size={14} />
          </button>
        </div>
        <div className="input-group justify-content-center">
          <input
            className="form-control inputDesign text-center"
            placeholder={Labels[0]}
            value={clientValue || "$0"}
            readOnly
          />
        </div>
      </div>

      <label className="d-block text-center mb-2 fw-medium">{Labels[1]} </label>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) =>
          customButtonAction?.(
            values,
            questionDetail,
            props.setQuestionDetail,
            props.DefaultUrl,
            personalDetailObj
          )
        }
        enableReinitialize
      >
        {({ setFieldValue }) => (
          <Form className="d-flex justify-content-center align-items-stretch">
            <InputGroup className="inputDesign justify-content-center p-0 flex-nowrap">
              <Field
                name="retirementLivingExpense"
                className="form-control inputDesignDoubleInput text-center"
                placeholder="Retirement Living Expense"
                onChange={(e) =>
                  setFieldValue(
                    e.target.name,
                    toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, ""))
                  )
                }
              />
              <Button type="submit" className="btn bgColor modalBtn border-0">
                <FaRegSave size={16} />
              </Button>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </>
  );

  // 🧩 CASE 4: Simple one-input
  const renderCase4 = () => (
    <>
      <div className="text-center mb-3">
        <img src={img} alt={title} width={60} height={60} />
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <button
          className="btn btn-sm bg-secondary rounded-circle text-light mb-2 d-flex align-items-center justify-content-center"
          onClick={() => onOpen(title, keyName, component, "joint", props.api)}
          style={{ width: 28, height: 28, padding: 0 }}
        >
          <FaArrowUpRightFromSquare size={14} />
        </button>
      </div>
      <div className="text-center mb-2">
        {clientName} & {partnerName}
      </div>
      <div className="d-flex align-item-center justify-content-center">
        <input
          className="form-control inputDesign text-center"
          value={jointValue || clientValue || "$0"}
          readOnly
          placeholder={title}
        />
      </div>
    </>
  );

  const renderVariant = {
    case1: renderCase1,
    case2: renderCase2,
    case3: renderCase3,
    case4: renderCase4,
  }[variant];

  return (
    <div className={`${evenClass ? "col-md-3" : "col-md-4"} mb-4`}>
      <div className="card shadow px-4 py-4 h-100 borderOverAll GoalsobjectiveCard rounded-4">
        <h5
          className="text-center fw-bold mb-3"
          onClick={() => {
            console.log(questionDetail?.[sourceKey]);
          }}
        >
          {props.title2}
        </h5>
        {renderVariant ? renderVariant() : renderCase1()}
      </div>
    </div>
  );
};

/*------------------------------------ DEMO WRAPPER ------------------------------------*/
const QuestionCardsDemo = ({ questionKey, CRObject }) => {
  const personalDetailObj = useRecoilValue(PersonalDetailsData);
  const DefaultUrl = useRecoilValue(defaultUrl);
  const [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);
  const [modalInfo, setModalInfo] = useState(null);
  const [flagState, setFlagState] = useState(false);

  const handleOpen = (title, keyName, component, Input) => {
    // console.log(title, keyName);
    setModalInfo({ title, key: keyName, component, Input });
    setFlagState(true);
  };

  const questions = questionConfig[questionKey] || [];

  const specialVisibilityRules = {
    "/user/SMSF": (q, index, questionDetail) => {
      if (index <= 1) return true;
      return !!questionDetail?.SMSFDetails?.SMSFOwner?.fundName?.trim();
    },
    // add more keys here later if needed
  };

  const visibleQuestions = questions.filter((q, index) => {
    const baseVisible = !CRObject || CRObject[q.keyName] === "Yes";
    const rule = specialVisibilityRules[questionKey];
    return rule ? baseVisible && rule(q, index, questionDetail) : baseVisible;
  });

  const numberOfCards = visibleQuestions.length;

  const evenClass =
    numberOfCards <= 4 || numberOfCards === 7 || numberOfCards >= 8;

  const PopoverContent = (title, keyName, component, Input) => {
    let modalObject = {
      title: title,
      key: keyName,
      Input,
    };
    return (
      <div
        style={{
          height: "80px",
          margin: "-20px 0px 0px 0px",
        }}
      >
        {component
          ? React.cloneElement(component, {
              modalObject,
            })
          : "no Child exist"}
      </div>
    );
  };

  const generateTitle = (data) => {
    if (data.title === "SMSF Details") {
      return questionDetail?.SMSFDetails?.SMSFOwner?.fundName || data.title;
    }
    return data.title;
  };

  return (
    <div className="container-fluid my-4" style={{ minHeight: "100vh" }}>
      <ModalComponent
        modalObject={modalInfo}
        flagState={flagState}
        setFlagState={setFlagState}
      >
        {modalInfo?.component || null}
      </ModalComponent>

      <div className="row justify-content-center ">
        {visibleQuestions.map((q, idx) => {
          return (
            <QuestionCard
              key={idx}
              {...q}
              title2={generateTitle(q)}
              onOpen={handleOpen}
              personalDetailObj={personalDetailObj}
              questionDetail={questionDetail}
              setQuestionDetail={setQuestionDetail}
              DefaultUrl={DefaultUrl}
              PopoverContent={PopoverContent}
              evenClass={evenClass}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCardsDemo;
