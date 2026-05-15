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
  RenderName,
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
import credit from "../svgs/credit-card-refund-svgrepo-com.svg";
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
import SMSFAccumulationDetails from "../svgs/SMSF-Accumulation-Details.png";
import piggybank2 from "../svgs/piggy-bank-new.svg";
import will from "../svgs/page-with-curl-svgrepo-com.svg";
import familyInvestmentDetails from "../svgs/Family investment Details.png";
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
import SmsfPensionAccountMiddleWare from "../QuestoinsSMSF/SmsfPensionAccountMiddleWare";
import FamilyDetails from "../QuestoinsFamilyTrust/FamilyDetails";
/*------------------------------------ CONFIG ------------------------------------*/
const questionConfig = {
  "/user/personal-income": [
    {
      title: "Employment",
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
      title: "Centerlink",
      keyName: "incomeFromCentrelink",
      img: gearsSvg,
      component: <CenterLinkPayments />,
    },
    {
      title: "Lifetime Pension",
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
      title: "Living Expenses",
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
        personalDetailObj,
      ) => {
        try {
          if (!values?.retirementLivingExpense) {
            openNotificationSuccess(
              "error",
              "topRight",
              "Validation Error",
              "Please enter a valid retirement living expense value.",
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
            } successfully!`,
          );
        } catch (err) {
          console.error(err);
          openNotificationSuccess(
            "error",
            "topRight",
            "Error",
            "Failed to save retirement living data.",
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
      // clientOnly: true,
      // Labels: ["Value", "Loan"],
      variant: "case2",
      Labels: [
        {
          label: "Value",
          value: (questionDetail) =>
            questionDetail?.familyHome?.clientTotal ?? "",
          component: <OwnFamilyHome />,
          key: "familyHome",
          maintitle: true,
        },
        {
          label: "Loan",
          value: (questionDetail) =>
            questionDetail?.familyHome?.partnerTotal ?? "",
          component: <OwnFamilyHome />,
          key: "familyHome",
          maintitle: true,
          modalButton: false,
        },
      ],
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
      Labels: ["Joint"],
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
      Labels: ["Joint"],
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
      Labels: ["Joint"],
    },
    {
      title: "Other Assets",
      keyName: "otherAssets",
      img: settingMoneySvg,
      variant: "case4",
      api: "/personalAssets",
      component: <AssetInfo />,
      Labels: ["Joint"],
    },
    {
      title: "Credit Card",
      keyName: "creditCards",
      img: credit,
      clientOnly: true,
      component: <CreditCard />,
      variant: "case4",
      Labels: ["Joint"],
      BaceKeys: {
        joint: "clientTotal",
      },
    },
    {
      title: "Personal Loan",
      keyName: "personalLoans",
      img: moneyGivingPng,
      clientOnly: true,
      component: <PersonalLoan />,
      variant: "case4",
      Labels: ["Joint"],
      BaceKeys: {
        joint: "clientTotal",
      },
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
      // Labels: ["Property Portfolio", "Total Debt"],
      variant: "case2",
      Labels: [
        {
          label: "Property Portfolio",
          value: (questionDetail) =>
            questionDetail?.investmentPropertyDetails?.propertyPortfolio ?? "",
          component: <InvestmentPropertyDetails />,
          key: "investmentPropertyDetails",
          maintitle: true,
          onTop: true,
        },
        {
          label: "Total Debt",
          value: (questionDetail) =>
            questionDetail?.investmentPropertyDetails?.totalDebt ?? "",
          component: <InvestmentPropertyDetails />,
          key: "investmentPropertyDetails",
          maintitle: true,
          modalButton: false,
        },
      ],
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
      variant: "case2",
      // Labels: ["Property Portfolio", "Total Debt"],
      Labels: [
        {
          label: "client",
          value: (questionDetail) =>
            questionDetail?.professionalAdviser?.clientTotal ?? "No",
          component: <EstatePlanningProfessionalAdviser />,
          key: "professionalAdviser",
          maintitle: true,
          onTop: true,
        },
        {
          label: "partner",
          value: (questionDetail) =>
            questionDetail?.professionalAdviser?.partnerTotal ?? "No",
          component: <EstatePlanningProfessionalAdviser />,
          key: "professionalAdviser",
          maintitle: true,
        },
      ],
    },
  ],
  "/user/personal-insurance": [
    {
      title: "Life",
      keyName: "life",
      dataKey: "personalInsurance",
      img: lifeImg,
      component: <PersonalInsuranceLife />,
      // BaceKeys: {
      //   client: "clientLifeInsuranceTotal",
      //   partner: "partnerLifeInsuranceTotal",
      // },
      variant: "case2",
      Labels: [
        {
          label: "client",
          value: (questionDetail) =>
            questionDetail?.personalInsurance?.clientLifeInsuranceTotal ?? "",
          component: <PersonalInsuranceLife />,
          key: "personalInsurance",
          onTop: true,
        },
        {
          label: "partner",
          value: (questionDetail) =>
            questionDetail?.personalInsurance?.partnerLifeInsuranceTotal ?? "",
          component: <PersonalInsuranceLife />,
          key: "personalInsurance",
        },
      ],
    },
    {
      title: "TPD",
      keyName: "TPD",
      dataKey: "personalInsurance",
      img: TPDImg,
      component: <PersonalInsuranceLife />,
      // BaceKeys: {
      //   client: "clientTPDTotal",
      //   partner: "partnerTPDTotal",
      // },
      variant: "case2",
      Labels: [
        {
          label: "client",
          value: (questionDetail) =>
            questionDetail?.personalInsurance?.clientTPDTotal ?? "",
          component: <PersonalInsuranceLife />,
          key: "personalInsurance",
          onTop: true,
        },
        {
          label: "partner",
          value: (questionDetail) =>
            questionDetail?.personalInsurance?.partnerTPDTotal ?? "",
          component: <PersonalInsuranceLife />,
          key: "personalInsurance",
        },
      ],
    },
    {
      title: "Trauma",
      keyName: "trauma",
      img: traumaImg,
      dataKey: "personalInsurance",
      component: <PersonalInsuranceLife />,
      // BaceKeys: {
      //   client: "clientTraumaTotal",
      //   partner: "partnerTraumaTotal",
      // },
      variant: "case2",
      Labels: [
        {
          label: "client",
          value: (questionDetail) =>
            questionDetail?.personalInsurance?.clientTraumaTotal ?? "",
          component: <PersonalInsuranceLife />,
          key: "personalInsurance",
          onTop: true,
        },
        {
          label: "partner",
          value: (questionDetail) =>
            questionDetail?.personalInsurance?.partnerTraumaTotal ?? "",
          component: <PersonalInsuranceLife />,
          key: "personalInsurance",
        },
      ],
    },
    {
      title: "Income Protection",
      keyName: "incomeProtection",
      img: incomeImg,
      dataKey: "personalInsurance",
      component: <PersonalInsuranceLife />,
      // BaceKeys: {
      //   client: "clientIncomeProtectionTotal",
      //   partner: "partnerIncomeProtectionTotal",
      // },

      variant: "case2",
      Labels: [
        {
          label: "client",
          value: (questionDetail) =>
            questionDetail?.personalInsurance?.clientIncomeProtectionTotal ??
            "",
          component: <PersonalInsuranceLife />,
          key: "personalInsurance",
          onTop: true,
        },
        {
          label: "partner",
          value: (questionDetail) =>
            questionDetail?.personalInsurance?.partnerIncomeProtectionTotal ??
            "",
          component: <PersonalInsuranceLife />,
          key: "personalInsurance",
        },
      ],
    },
  ],
  "/user/business-entities": [
    {
      title: "Trading Company",
      keyName: "BusinessAsCompanyStructure",
      img: Business_building,
      component: <MiddleWare />,
    },
    {
      title: "Business Trust",
      keyName: "BusinessAsTrusts",
      img: businessIncomePng,
      component: <MiddleWare />,
    },
  ],
  "/user/SMSF": [
    {
      title: "Details",
      keyName: "SMSFDetails",
      component: <SmsfDetails />,
      img: will,
      variant: "case2",
      Labels: [
        {
          label: "Details",
          value: (questionDetail, CRObject) => {
            try {
              const parseNum = (val) =>
                val && typeof val === "string"
                  ? parseFloat(val.replace(/[^0-9.-]+/g, "")) || 0
                  : typeof val === "number"
                    ? val
                    : 0;

              // Generic extractor: SMSFTotal → propertyPortfolio → totalDebt → client/partner/joint totals
              const pickTotal = (
                obj,
                prefer = [
                  "SMSFTotal",
                  "propertyPortfolio",
                  "totalDebt",
                  "clientTotal",
                  "partnerTotal",
                  "jointTotal",
                ],
              ) => {
                if (!obj) return 0;
                for (const field of prefer) {
                  if (obj[field] !== undefined && obj[field] !== null) {
                    return parseNum(obj[field]);
                  }
                }
                return 0;
              };

              // -----------------------------
              // ✔ ASSET SECTIONS
              // -----------------------------
              const assetKeys = [
                // "SMSFAccumulationDetails",
                // "SMSFPensionPhase",
                "SMSFBank",
                "SMSFTermDeposits",
                "SMSFAustralianShares",
                "SMSFManagedFunds",
                "SMSFInvestmentProperties", // propertyPortfolio (asset)
                "SMSFOtherInvestment",
              ];

              // -----------------------------
              // ✔ LIABILITY SECTIONS
              // -----------------------------
              const liabilityKeys = [
                "SMSFInvestmentLoan",
                "SMSFInvestmentProperties", // totalDebt (liability)
              ];

              // -----------------------------
              // SUM ALL ASSETS
              // -----------------------------
              const assetsSum = assetKeys.reduce((acc, key) => {
                return (
                  acc +
                  pickTotal(
                    CRObject?.[key] === "Yes" ? questionDetail?.[key] : "$0",
                  )
                );
              }, 0);

              // -----------------------------
              // SUM ALL LIABILITIES
              // -----------------------------
              const liabilitiesSum = liabilityKeys.reduce((acc, key) => {
                return (
                  acc +
                  pickTotal(
                    CRObject?.[key] === "Yes" ? questionDetail?.[key] : "$0",
                    ["totalDebt", "SMSFTotal", "propertyPortfolio"],
                  )
                );
              }, 0);

              const netTotal = assetsSum - liabilitiesSum;

              return toCommaAndDollar(netTotal);
            } catch (error) {
              console.error("Error calculating SMSF totals:", error);
              return "$0";
            }
          },
          component: <SmsfDetails />,
          key: "SMSFDetails",
          maintitle: true,
        },
      ],
    },
    {
      title: "Accumulation Account",
      keyName: "SMSFAccumulationDetails",
      component: <SmsfAccumulationDetails />,
      img: piggybank1,
    },
    {
      title: "Pension Account",
      keyName: "SMSFPensionPhase",
      component: <SmsfPensionAccountMiddleWare />,
      img: piggybank2,
    },
    {
      title: "Bank Accounts",
      keyName: "SMSFBank",
      img: BankImg,
      component: <MiddleWare />,
      variant: "case2",
      Labels: [
        {
          label: "SMSF",
          value: (questionDetail) => questionDetail?.SMSFBank?.SMSFTotal ?? "",
          component: <MiddleWare />,
          key: "SMSFBank",
          maintitle: true,
        },
      ],
    },
    {
      title: "Term Deposits",
      keyName: "SMSFTermDeposits",
      img: TermImg,
      component: <MiddleWare />,
      variant: "case2",
      Labels: [
        {
          label: "SMSF",
          value: (questionDetail) =>
            questionDetail?.SMSFTermDeposits?.SMSFTotal ?? "",
          component: <MiddleWare />,
          key: "SMSFTermDeposits",
          maintitle: true,
        },
      ],
    },
    {
      title: "Australian Shares/ETFs",
      keyName: "SMSFAustralianShares",
      img: PortFolio,
      component: <MiddleWare />,
      variant: "case2",
      Labels: [
        {
          label: "SMSF",
          value: (questionDetail) =>
            questionDetail?.SMSFAustralianShares?.SMSFTotal ?? "",
          component: <MiddleWare />,
          key: "SMSFAustralianShares",
          maintitle: true,
        },
      ],
    },
    {
      title: "Platform Investments",
      keyName: "SMSFManagedFunds",
      img: funds,
      component: <MiddleWare />,
      variant: "case2",
      Labels: [
        {
          label: "SMSF",
          value: (questionDetail) =>
            questionDetail?.SMSFManagedFunds?.SMSFTotal ?? "",
          component: <MiddleWare />,
          key: "SMSFManagedFunds",
          maintitle: true,
        },
      ],
    },
    {
      title: "Investment Loan",
      keyName: "SMSFInvestmentLoan",
      img: analytics,
      component: <InvestmentLoan />,
      variant: "case2",
      Labels: [
        {
          label: "SMSF",
          value: (questionDetail) =>
            questionDetail?.SMSFInvestmentLoan?.SMSFTotal ?? "",
          component: <InvestmentLoan />,
          key: "SMSFInvestmentLoan",
          maintitle: true,
          customTitle: "SMSF_Investment Loan",
        },
      ],
    },
    {
      title: "Investment Properties",
      keyName: "SMSFInvestmentProperties",
      img: people,
      component: <InvestmentPropertyDetails />,
      variant: "case2",
      // Labels: ["Property Portfolio", "Total Debt"],
      Labels: [
        {
          label: "Property Portfolio",
          value: (questionDetail) =>
            questionDetail?.SMSFInvestmentProperties?.propertyPortfolio ?? "",
          component: <InvestmentPropertyDetails />,
          key: "SMSFInvestmentProperties",
          maintitle: true,
          onTop: true,
          customTitle: "SMSF_Investment Properties",
        },
        {
          label: "Total Debt",
          value: (questionDetail) =>
            questionDetail?.SMSFInvestmentProperties?.totalDebt ?? "",
          component: <InvestmentPropertyDetails />,
          key: "SMSFInvestmentProperties",
          maintitle: true,
          modalButton: false,
        },
      ],
    },
    {
      title: "Other Investments",
      keyName: "SMSFOtherInvestment",
      img: investmentCircle,
      component: <OtherInvestmentsDynamic />,
      variant: "case2",
      Labels: [
        {
          label: "SMSF",
          value: (questionDetail) =>
            questionDetail?.SMSFOtherInvestment?.clientTotal ?? "",
          component: <OtherInvestmentsDynamic />,
          key: "SMSFOtherInvestment",
          maintitle: true,
          customTitle: "SMSF_Other Investments",
        },
      ],
    },
  ],
  "/user/family-trust": [
    {
      title: "Details",
      keyName: "familyDetails",
      img: familyInvestmentDetails,
      component: <FamilyDetails />,
      variant: "case2",
      Labels: [
        {
          label: "Details",
          value: (questionDetail, CRObject) => {
            {
              try {
                const parseNum = (val) =>
                  val && typeof val === "string"
                    ? parseFloat(val.replace(/[^0-9.-]+/g, "")) || 0
                    : typeof val === "number"
                      ? val
                      : 0;

                // helper: picks trustTotal → propertyPortfolio → totalDebt → clientTotal → partnerTotal → jointTotal
                const pickTotal = (
                  obj,
                  prefer = [
                    "trustTotal",
                    "propertyPortfolio",
                    "totalDebt",
                    "clientTotal",
                    "partnerTotal",
                    "jointTotal",
                  ],
                ) => {
                  if (!obj) return 0;
                  for (const field of prefer) {
                    if (obj[field] !== undefined && obj[field] !== null) {
                      return parseNum(obj[field]);
                    }
                  }
                  return 0;
                };

                // assets sections
                const assetKeys = [
                  "familyBank",
                  "familyTermDeposit",
                  "familyAustralianShare",
                  "familyMangedFunds",
                  "familyInvestmentProperties", // propertyPortfolio is asset
                  "familyOtherInvestment",
                ];

                // liability sections
                const liabilityKeys = [
                  "familyInvestmentHomeLoan",
                  "familyInvestmentProperties", // totalDebt is liability
                ];

                // sum assets
                const assetsSum = assetKeys.reduce((acc, key) => {
                  return (
                    acc +
                    pickTotal(
                      CRObject?.[key] === "Yes" ? questionDetail?.[key] : "$0",
                    )
                  );
                }, 0);

                // sum liabilities
                const liabilitiesSum = liabilityKeys.reduce((acc, key) => {
                  return (
                    acc +
                    pickTotal(
                      CRObject?.[key] === "Yes" ? questionDetail?.[key] : "$0",
                      ["totalDebt", "trustTotal", "propertyPortfolio"],
                    )
                  );
                }, 0);

                const netTotal = assetsSum - liabilitiesSum;
                return toCommaAndDollar(netTotal);
              } catch (error) {
                console.error("Error calculating Family total:", error);
                return "$0";
              }
            }
          },
          component: <FamilyDetails />,
          key: "familyDetails",
          maintitle: true,
        },
      ],
    },
    {
      title: "Bank Accounts",
      keyName: "familyBank",
      img: BankImg,
      component: <MiddleWare />,
      variant: "case2",
      Labels: [
        {
          label: "Trust",
          value: (questionDetail) =>
            questionDetail?.familyBank?.trustTotal ?? "",
          component: <MiddleWare />,
          key: "familyBank",
          maintitle: true,
        },
      ],
    },
    {
      title: "Term Deposits",
      keyName: "familyTermDeposit",
      img: TermImg,
      component: <MiddleWare />,
      variant: "case2",
      Labels: [
        {
          label: "Trust",
          value: (questionDetail) =>
            questionDetail?.familyTermDeposit?.trustTotal ?? "",
          component: <MiddleWare />,
          key: "familyTermDeposit",
          maintitle: true,
        },
      ],
    },
    {
      title: "Australian Shares/ETFs",
      keyName: "familyAustralianShare",
      img: PortFolio,
      component: <MiddleWare />,
      variant: "case2",
      Labels: [
        {
          label: "Trust",
          value: (questionDetail) =>
            questionDetail?.familyAustralianShare?.trustTotal ?? "",
          component: <MiddleWare />,
          key: "familyAustralianShare",
          maintitle: true,
        },
      ],
    },
    {
      title: "Platform Investments",
      keyName: "familyMangedFunds",
      img: funds,
      component: <MiddleWare />,
      variant: "case2",
      Labels: [
        {
          label: "Trust",
          value: (questionDetail) =>
            questionDetail?.familyMangedFunds?.trustTotal ?? "",
          component: <MiddleWare />,
          key: "familyMangedFunds",
          maintitle: true,
        },
      ],
    },
    {
      title: "Investment Loan",
      keyName: "familyInvestmentHomeLoan",
      img: analytics,
      component: <InvestmentLoan />,
      variant: "case2",
      Labels: [
        {
          label: "Trust",
          value: (questionDetail) =>
            questionDetail?.familyInvestmentHomeLoan?.trustTotal ?? "",
          component: <InvestmentLoan />,
          key: "familyInvestmentHomeLoan",
          maintitle: true,
          customTitle: "Trust_Investment Loan",
        },
      ],
    },
    {
      title: "Investment Property",
      keyName: "familyInvestmentProperties",
      img: people,
      component: <InvestmentPropertyDetails />,
      variant: "case2",
      Labels: [
        {
          label: "Property Portfolio",
          value: (questionDetail) =>
            questionDetail?.familyInvestmentProperties?.propertyPortfolio ?? "",
          component: <InvestmentPropertyDetails />,
          key: "familyInvestmentProperties",
          maintitle: true,
          onTop: true,
          customTitle: "Trust_Investment Property",
        },
        {
          label: "Total Debt",
          value: (questionDetail) =>
            questionDetail?.familyInvestmentProperties?.totalDebt ?? "",
          component: <InvestmentPropertyDetails />,
          key: "familyInvestmentProperties",
          maintitle: true,
          modalButton: false,
        },
      ],
    },
    {
      title: "Other Investments",
      keyName: "familyOtherInvestment",
      img: investmentCircle,
      component: <OtherInvestmentsDynamic />,
      variant: "case2",
      Labels: [
        {
          label: "Trust",
          value: (questionDetail) =>
            questionDetail?.familyOtherInvestment?.clientTotal ?? "",
          component: <OtherInvestmentsDynamic />,
          key: "familyOtherInvestment",
          maintitle: true,
          customTitle: "Trust_Other Investments",
        },
      ],
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
    collapsed = false,
  } = props;

  const clientName =
    Labels.length > 0
      ? Labels[0]
      : personalDetailObj.client?.clientPreferredName || "Client";

  const partnerName =
    Labels.length > 1
      ? Labels[1]
      : personalDetailObj.partner?.partnerPreferredName || "Partner";

  const jointName =
    personalDetailObj.client?.clientPreferredName +
      personalDetailObj.partner?.partnerPreferredName || "joint";

  const isSingle = ["Single", "Widowed"].includes(
    personalDetailObj.client?.clientMaritalStatus,
  );

  const sourceKey = dataKey || keyName;
  const DefaultYesNo = ["will", "POA", "professionalAdviser"];

  const clientValue =
    questionDetail?.[sourceKey]?.[
      BaceKeys && Object.keys(BaceKeys).length > 0
        ? BaceKeys.client
        : "clientTotal"
    ] ?? (DefaultYesNo.includes(keyName) ? "No" : "$0");

  const partnerValue =
    questionDetail?.[sourceKey]?.[
      BaceKeys && Object.keys(BaceKeys).length > 0
        ? BaceKeys.partner
        : "partnerTotal"
    ] ?? (DefaultYesNo.includes(keyName) ? "No" : "$0");

  const jointValue =
    questionDetail?.[sourceKey]?.[
      BaceKeys && Object.keys(BaceKeys).length > 0
        ? BaceKeys.joint
        : "jointTotal"
    ] ?? (DefaultYesNo.includes(keyName) ? "No" : "$0");

  const initialValues = getInitialValues?.(questionDetail) || {};

  // 🧩 CASE 1: Default
  const renderCase1 = () => {
    return (
      <>
        <div className="text-center mb-3">
          <img src={img} alt={title} width={70} height={70} />
        </div>

        {/* Client */}
        <div className="mb-3 text-center d-flex flex-column align-items-center justify-content-center">
          {!props?.showPartnerButton && (
            <>
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
            </>
          )}
          {props?.showPartnerButton && (
            <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
              <div className="mb-2">{clientName}</div>

              <button
                className="btn btn-sm bg-secondary rounded-circle text-light mb-2 d-flex align-items-center justify-content-center"
                onClick={() =>
                  onOpen(title, keyName, component, "client", props?.api)
                }
                style={{ width: 28, height: 28, padding: 0 }}
              >
                <FaArrowUpRightFromSquare size={14} />
              </button>
            </div>
          )}
          <input
            className={
              "form-control inputDesign text-center" +
              (!collapsed && " burgerCollapsed")
            }
            value={clientValue || "$0"}
            readOnly
            placeholder={title}
          />
        </div>

        {/* Partner */}
        {!isSingle && !clientOnly && (
          <div className="mb-3 text-center d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
              <div className="mb-2">{partnerName}</div>

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
            </div>

            <input
              className={
                "form-control inputDesign text-center" +
                (!collapsed && " burgerCollapsed")
              }
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
    const { modalButton = true, onTop = false } = lbl || {};
    const handleOpen = () => {
      let head = lbl?.customTitle
        ? lbl.customTitle
        : lbl?.maintitle
          ? title
          : lbl.label;
      // Pass the specific label's data to the modal
      onOpen(head, lbl.key, lbl.component, lbl.label);
    };

    if (["partner", "joint"].includes(lbl.label) && isSingle) {
      return false;
    }

    return (
      <div className="mb-3 text-center">
        <div
          className={`d-flex justify-content-center align-items-center gap-2 mb-2 ${
            onTop && " flex-column-reverse "
          }`}
        >
          <span>
            {["client", "partner", "joint"].includes(lbl.label)
              ? RenderName(lbl.label)
              : lbl.label}
          </span>
          {modalButton && (
            <button
              className="btn btn-sm bg-secondary rounded-circle text-light d-flex align-items-center justify-content-center"
              onClick={handleOpen} // Use the local handleOpen
              style={{ width: 28, height: 28, padding: 0 }}
            >
              <FaArrowUpRightFromSquare size={14} />
            </button>
          )}
        </div>
        <div className="d-flex align-item-center justify-content-center">
          <input
            className={
              "form-control inputDesign text-center" +
              (!collapsed && " burgerCollapsed")
            }
            value={lbl.value?.(questionDetail, props.CRObject) || "$0"}
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
        <img src={img} alt={title} width={70} height={70} />
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
        <img src={img} alt={title} width={70} height={70} />
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
            className={
              "form-control inputDesign text-center" +
              (!collapsed && " burgerCollapsed")
            }
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
            personalDetailObj,
          )
        }
        enableReinitialize
      >
        {({ setFieldValue }) => (
          <Form className="d-flex justify-content-center align-items-stretch">
            <InputGroup
              className={
                "inputDesign justify-content-center p-0 flex-nowrap" +
                (!collapsed && " burgerCollapsed")
              }
            >
              <Field
                name="retirementLivingExpense"
                className="form-control inputDesignDoubleInput text-center"
                placeholder="Retirement Living Expense"
                onChange={(e) =>
                  setFieldValue(
                    e.target.name,
                    toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")),
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

  const renderCase4 = () => {
    const jointOnlyTitles = [
      "Contents",
      "Boat",
      "Caravan",
      "Other Assets",
      "Credit Card",
      "Personal Loan",
    ];
    const isJointOnly = jointOnlyTitles.includes(title);

    return (
      <>
        <div className="text-center mb-3">
          <img src={img} alt={title} width={70} height={70} />
        </div>

        <div className="d-flex flex-column align-items-center justify-content-center">
          <button
            className="btn btn-sm bg-secondary rounded-circle text-light mb-2 d-flex align-items-center justify-content-center"
            onClick={() =>
              onOpen(
                title,
                keyName,
                component,
                isJointOnly ? "joint" : undefined,
                props.api,
              )
            }
            style={{ width: 28, height: 28, padding: 0 }}
          >
            <FaArrowUpRightFromSquare size={14} />
          </button>
        </div>

        {/* ✅ Show correct owner name */}
        <div className="text-center mb-2">
          {isJointOnly
            ? isSingle
              ? personalDetailObj.client?.clientPreferredName
              : "Joint"
            : `${clientName} & ${partnerName}`}
        </div>

        <div className="d-flex align-item-center justify-content-center">
          <input
            className={
              "form-control inputDesign text-center" +
              (!collapsed && " burgerCollapsed")
            }
            value={jointValue || clientValue || "$0"}
            readOnly
            placeholder={title}
          />
        </div>
      </>
    );
  };

  const renderVariant = {
    case1: renderCase1,
    case2: renderCase2,
    case3: renderCase3,
    case4: renderCase4,
  }[variant];

  return (
    <div className={`${evenClass ? "col-md-3" : "col-md-4"} mb-4`}>
      <div
        className="card shadow px-4 py-4 borderOverAll GoalsobjectiveCard rounded-4"
        style={{ height: "390px" }}
      >
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
const QuestionCardsDemo = ({
  questionKey,
  CRObject,
  setCRObject,
  collapsed,
}) => {
  const personalDetailObj = useRecoilValue(PersonalDetailsData);
  const DefaultUrl = useRecoilValue(defaultUrl);
  const [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);
  const [modalInfo, setModalInfo] = useState(null);
  const [flagState, setFlagState] = useState(false);

  const handleOpen = (title, keyName, component, Input) => {
    console.log(title, keyName);
    let small = ["Contents", "Boat", "Caravan"].includes(title);

    if (keyName === "SMSFAccumulationDetails") {
      let smsfName =
        questionDetail?.SMSFDetails?.SMSFOwner?.fundName +
        "_Accumulation Account";
      setModalInfo({ title: smsfName, key: keyName, component, Input, small });
    } else {
      setModalInfo({ title, key: keyName, component, Input, small });
    }
    setFlagState(true);
  };

  const questions = questionConfig[questionKey] || [];

  const specialVisibilityRules = {
    "/user/SMSF": (q, index, questionDetail) => {
      if (index <= 3) return true;
      return !!questionDetail?.SMSFDetails?.SMSFOwner?.fundName?.trim();
    },
    // add more keys here later if needed
  };

  const visibleQuestions = React.useMemo(() => {
    return questions.filter((q, index) => {
      const baseVisible = !CRObject || CRObject[q.keyName] === "Yes";
      // const rule = specialVisibilityRules[questionKey];
      const rule = false;
      return rule ? baseVisible && rule(q, index, questionDetail) : baseVisible;
    });
  }, [CRObject, setCRObject, questions, questionKey]);

  const numberOfCards = visibleQuestions.length;

  const evenClass =
    numberOfCards <= 4 || numberOfCards === 7 || numberOfCards >= 8;

  const PopoverContent = (title, keyName, component, Input) => {
    let modalObject = {
      title: title,
      key: keyName,
      Input,
      small,
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
    if (data.keyName === "SMSFDetails") {
      return questionDetail?.SMSFDetails?.SMSFOwner?.fundName || data.title;
    }
    if (data.keyName === "familyDetails") {
      return (
        questionDetail?.familyDetails?.familyTrustOwner?.trustName || data.title
      );
    }
    return data.title;
  };

  return (
    <div className="container-fluid my-4">
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
              collapsed={collapsed}
              CRObject={CRObject}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCardsDemo;
