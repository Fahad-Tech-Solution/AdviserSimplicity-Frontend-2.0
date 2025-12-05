import LOW1 from "../Components/RiskProfile/METER/1- LOW.png";
import ModeratelyLOW from "../Components/RiskProfile/METER/2-Moderately Low.png";
import Moderate from "../Components/RiskProfile/METER/3- Moderate.png";
import ModeratelyHigh from "../Components/RiskProfile/METER/4- Moderately high.png";
import High from "../Components/RiskProfile/METER/5-  High.png";
import VeryHigh from "../Components/RiskProfile/METER/6- Very High.png";

import overseas from "../Components/Questions/svgs/overseas.svg";
import Businessman from "../Components/Questions/svgs/businessman.svg";
import businessIncome from "../Components/Questions/svgs/business-income.png";
import businessPartnership from "../Components/Questions/svgs/businessPartnership.png";
import Gears from "../Components/Questions/svgs/gears-gear-svgrepo-com.svg";
import money from "../Components/Questions/svgs/money-3.svg";
import businessIncomeCase from "../Components/Questions/svgs/business-income.png";
import OtherTaxable from "../Components/Questions/svgs/no-tax.png";
import moneyBagPng from "../Components/Questions/svgs/money-bag.png";
import Education from "../Components/Questions/svgs/Education.png";

import car from "../Components/Questions/svgs/car.svg";
import jeep from "../Components/Questions/svgs/jeep-car-svgrepo-com.svg";
import boat from "../Components/Questions/svgs/boat.svg";
import trailer from "../Components/Questions/svgs/trailer-caravan.svg";
import settingMoney from "../Components/Questions/svgs/settingMoney.svg";
import PersonalDebt from "../Components/Questions/svgs/credit-card-refund-svgrepo-com.svg";
import Questions_Home from "../Components/Questions/svgs/home-svgrepo-com.svg";
import houseHold from "../Components/Questions/svgs/warehouse-.svg";

import PortFolio from "../Components/Questions/svgs/portfolio.svg";
import funds from "../Components/Questions/svgs/funds.svg";
import certificate from "../Components/Questions/svgs/certificate.svg";
import piggybank1 from "../Components/Questions/svgs/piggy-bank.svg";
import piggybank2 from "../Components/Questions/svgs/piggy-bank-new.svg";
import calender from "../Components/Questions/svgs/calendar.png";
import TermImg from "../Components/Questions/svgs/TermDepositCanva.png";
import analytics from "../Components/Questions/svgs/analytics.png";
import property from "../Components/Questions/svgs/property-value.svg";
import loan from "../Components/Questions/svgs/loan.svg";
import otherInvestment from "../Components/Questions/svgs/investmentCircle.png";

import Business_building from "../Components/Questions/svgs/building-small-svgrepo-com.svg";
import BusinessTeam_Handshake from "../Components/Questions/svgs/team_Handshake.png";
import Business_fund from "../Components/Questions/svgs/Business-fund.png";

import SMSFBank from "../Components/Questions/svgs/bank.svg";
import { RenderName } from "../Components/Assets/Api/Api";
import AllSubscriptions from "../Components/SuperAdminComponent/AllSubscriptions";

export const content = {
  itemsOpt: [
    {
      subTitle: "Personal Details",
      statusStep: 0,
      icon: "FaUser",
      route: "/user/personal-detail",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    // {
    //   subTitle: "Question",
    //   statusStep: 8,
    //   icon: "FaPlus",
    //   route: "/user/important-question",
    //   condition: (CRObject) => true, // Always true, as this step is always needed.
    // },
    {
      subTitle: "Personal Income & Expenses",
      statusStep: 16,
      icon: "FaMoneyCheckDollar",
      route: "/user/personal-income",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Personal Assets & Debt",
      statusStep: 24,
      icon: "FaHome",
      route: "/user/personal-assets",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Financial Investments",
      statusStep: 32,
      icon: "RiCoinsFill",
      route: "/user/financial-investments",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Estate Planning & Professional Advisers",
      statusStep: 40,
      icon: "IoDocumentTextOutline",
      route: "/user/estate-planning",
      condition: (CRObject) => true,
    },
    {
      subTitle: "Personal Insurance",
      statusStep: 48,
      icon: "IoShieldCheckmark",
      route: "/user/personal-insurance",
      condition: (CRObject) => CRObject?.personalInsuranceTab === "Yes",
    },
    {
      subTitle: "Business Entities",
      statusStep: 56,
      icon: "FaRegBuilding",
      route: "/user/business-entities",
      condition: (CRObject) =>
        CRObject?.BusinessAsCompanyStructure === "Yes" ||
        CRObject?.BusinessAsTrusts === "Yes",
    },
    {
      subTitle: "SMSF",
      statusStep: 64,
      icon: "FaPiggyBank",
      route: "/user/SMSF",
      condition: (CRObject) => CRObject?.SMSFManagedFundsTab === "Yes",
    },
    {
      subTitle: "Investment Trust",
      statusStep: 72,
      icon: "FaRegHandshake",
      route: "/user/family-trust",
      condition: (CRObject) => CRObject?.businessAsInvestmentTab === "Yes",
    },
  ],
  itemsQuestion: [
    {
      subTitle: "Desired Liquidity",
      statusStep: 10,
      icon: "FaMoneyBillWave",
      route: "/Q1",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Rate of return",
      statusStep: 20,
      icon: "FaChartLine",
      route: "/Q2",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Capital Risk",
      statusStep: 30,
      icon: "FaTriangleExclamation",
      route: "/Q3",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Inflation",
      statusStep: 40,
      icon: "RiDiscountPercentFill",
      route: "/Q4",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Legislative Risk",
      statusStep: 50,
      icon: "MdOutlineBalance",
      route: "/Q5",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Investment knowledge",
      statusStep: 60,
      icon: "FaGraduationCap",
      route: "/Q6",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Volatility",
      statusStep: 70,
      icon: "MdOutlineTimeline",
      route: "/Q7",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Asset allocation",
      statusStep: 80,
      icon: "FaChartPie",
      route: "/Q8",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Detection Matrix",
      statusStep: 90,
      icon: "HiOutlineViewGridAdd",
      route: "/detection-matrix",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
  ],
  RiskGoals: [
    {
      title: "Cash Management",
      value: "Cash Management",
      range: {
        lowest: 9,
        highest: 13,
      },
      img: LOW1,
      des: "Your responses indicate an extremely low tolerance to investment risk or, alternatively, you have a short investment time frame. The only appropriate investment for this risk profile or time frame is a cash-based investment such as bank accounts, cash management trusts and term deposits.",
    },
    {
      title: "Conservative",
      value: "Conservative",
         range: {
        lowest: 14,
        highest: 18,
      },
      img: ModeratelyLOW,
      des: "As a Conservative investor, you really don't like risk. Your risk profile suggests you are most concerned with keeping what you have. As a result, you are prepared to accept lower returns to reduce the risk of losing capital. Based on your risk profile you would generally prefer an investment mix that is positioned defensively to produce a stable return with a higher proportion invested in bonds and cash and a smaller proportion of money in shares and property investments. Minimum Investment Term: 2 years",
    },
    {
      title: "Moderately Conservative",
      value: "Moderately Conservative",
         range: {
        lowest: 19,
        highest: 23,
      },
      img: Moderate,
      des: "As a Moderately Conservative investor, you seek consistent returns using a steady growth strategy. Your risk profile suggests you want some potential for capital growth, but prefer not to have large fluctuations in short term performance. Based on your risk profile, you would generally prefer a diversified portfolio with a balance of defensive assets, such as bonds and cash and growth assets such as shares and property. Minimum Investment Term: 3 years",
    },
    {
      title: "Balanced",
      value: "Balanced",
         range: {
        lowest: 24,
        highest: 28,
      },
      img: ModeratelyHigh,
      des: "As a Balanced investor, you seek a portfolio that will give you the best opportunity to achieve your medium to long term financial goals. Your risk profile suggests you are prepared to experience short term fluctuations in performance for potentially higher returns over the long term. Based on your risk profile, you would generally prefer a diversified portfolio with a bias towards growth assets such as shares and property. Minimum Investment Term: 5 years",
    },
    {
      title: "Growth",
      value: "Growth",
           range: {
        lowest: 29,
        highest: 33,
      },
      img: High,
      des: "As a Growth investor, you focus on assets with greater growth potential. Your risk profile suggests you are prepared to accept short term fluctuations in performance for potentially greater returns over the longer term. Based on your risk profile, you would generally prefer a diversified portfolio with a strong bias towards growth investments such as shares and property. Minimum Investment Term: 5 years",
    },
    {
      title: "High Growth",
      value: "High Growth",
           range: {
        lowest: 34,
        highest: 100,
      },
      img: VeryHigh,
      des: "As a High Growth investor, you are prepared to compromise portfolio balance to pursue potential long-term gains. Your risk profile suggests you acknowledge there will be short term fluctuations in performance and are comfortable to invest in high risk investments. Based on your risk profile you would generally prefer a portfolio comprising solely growth assets such as shares and property. Minimum Investment Term: 7 years. ",
    },
  ],
  superAdmin: [
    {
      subTitle: "Financial Institutions",
      statusStep: 0,
      icon: "RiCoinsFill",
      route: "/financial-institutions",
      key: "FinancialInstitutions",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Investment Platforms",
      statusStep: 10,
      icon: "MdFamilyRestroom",
      route: "/investmen-platforms",
      key: "InvestmentPlatforms",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Investment Bonds",
      statusStep: 20,
      icon: "FaCertificate",
      route: "/investment-bonds",
      key: "InvestmentBonds",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Superannuation Funds",
      statusStep: 30,
      icon: "FaMoneyBillWave",
      route: "/super-annuation-funds",
      key: "SuperannuationFunds",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Account Based Pensions",
      statusStep: 40,
      icon: "FaUserShield",
      route: "/account-based-pensions",
      key: "AccountBasedPensions",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Annuities",
      statusStep: 50,
      icon: "BiDollarCircle",
      route: "/annuities",
      key: "Annuities",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Personal Insurances",
      statusStep: 60,
      icon: "RiDiscountPercentFill",
      route: "/personal-insurances",
      key: "PersonalInsurances",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
  ],
  cashFlow: [
    {
      subTitle: "All Users of CashFlow",
      statusStep: 0,
      icon: "FaUser",
      route: "/user/cashflow/allusers",
      condition: (CRObject) => false, // Always true, as this step is always needed.
    },
    {
      subTitle: "Personal Details",
      statusStep: 0,
      icon: "FaUser",
      route: "/user/cashflow/personal-detail",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Income & Expenses",
      statusStep: 10,
      icon: "FaMoneyCheckDollar",
      route: "/user/cashflow/income-and-expenses",
      key: "CashFlow_Income_And_Expenses",
      QuestionsArray: [
        {
          title: "Overseas Pensions",
          img: overseas,
          key: "cf_incomeFromOverseas",
        },
        {
          title: "Sole Trader Income",
          key: "cf_incomeFromSoleTrade",
          img: businessIncome,
        },
        {
          title: "Partnership Income",
          img: businessPartnership,
          key: "cf_incomeFromPartnership",
        },
        {
          title: "Centrelink Payments/Benefits",
          img: Gears,
          key: "cf_incomeFromCentrelink",
          info: "This includes Family Tax Benefit (A&B) Payments and any Centrelink Cards",
        },
        {
          title: "Lifetime Benefits",
          img: money,
          key: "cf_incomeFromLifeTimePension",
        },
        {
          title: "Employment Income",
          key: "cf_employmentIncome",
          img: Businessman,
        },
        // {
        //   title: "Business Income",
        //   key: "cf_incomeFromBusiness",
        //   img: businessIncomeCase,
        // },
        {
          title: "Other Non-Taxable",
          key: "cf_incomeFromOtherNonTaxable",
          img: OtherTaxable,
        },
        {
          title: "Regular Living Expenses",
          key: "cf_incomeFromRegularLivingExpense",
          img: moneyBagPng,
        },
        {
          title: "Education Expenses",
          key: "cf_incomeFromEducation",
          img: Education,
        },
      ],
      condition: (CRObject) => true, // Always true, as this step is always needed.
    }, //? all inner Cards Done without APi
    {
      subTitle: "Lifestyle Assets & Debt",
      statusStep: 20,
      icon: "FaHome",
      route: "/user/cashflow/personal-assets",
      QuestionsArray: [
        {
          title: "Own a Family Home",
          key: "cf_familyHome",
          img: Questions_Home,
        },
        {
          title: "Contents",
          key: "cf_contents",
          img: houseHold,
        },
        {
          title: "Car",
          key: "cf_car",
          img: car,
        },
        // {
        //     title: "Motor Vehicle 2",
        //     key: "cf_motorVehicle2",
        //     img: jeep,
        // },
        {
          title: "Boat",
          key: "cf_boat",
          img: boat,
        },
        {
          title: "Caravan",
          key: "cf_caravan",
          img: trailer,
        },
        {
          title: "Other Assets",
          key: "cf_otherAssets",
          img: settingMoney,
        },
        {
          title: "Personal Debt",
          key: "cf_personalDebt",
          img: PersonalDebt,
        },
      ],
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Financial Investments",
      statusStep: 30,
      icon: "RiCoinsFill",
      route: "/user/cashflow/investments",
      QuestionsArray: [
        {
          title: "Australian Shares",
          img: PortFolio,
          key: "cf_AustralianShares",
          sourceKey: "australianShareMarket",
        },
        {
          title: "Platform Investment",
          img: funds,
          key: "cf_platformInvestment",
          sourceKey: "managedFund",
        },
        {
          title: "Other Investments",
          img: otherInvestment,
          key: "cf_otherInvestments",
          // sourceKey: "otherInvestments",
        },
        {
          title: "Cash",
          img: SMSFBank,
          key: "cf_cash",
          sourceKey: "bankAccountFinance",
        },
        {
          title: "Term Deposits",
          img: TermImg,
          key: "cf_termDeposits",
          sourceKey: "termDepositsFinance",
        },
        {
          title: "Investment Bonds",
          img: certificate,
          key: "cf_investmentBonds",
          sourceKey: "investmentBondFinance",
        },
        {
          title: "Investment Loans (LOC)",
          img: loan,
          key: "cf_investmentLoansLOC",
          cal: true,
        },
        {
          title: "Margin Loan",
          img: analytics,
          key: "cf_marginLoan",
        },
        {
          title: "Investments Property",
          img: property,
          key: "cf_investmentsProperty",
          cal: true,
        },
        {
          title: "Super Fund",
          img: piggybank1,
          key: "cf_superFund",
        },
        {
          title: "Account Based Pension",
          img: piggybank2,
          key: "cf_accountBasedPension",
        },
        {
          title: "Annuities",
          img: calender,
          key: "cf_annuities",
        },
      ],
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Business Entities",
      statusStep: 40,
      icon: "FaBriefcase",
      route: "/user/cashflow/business-entitles",
      QuestionsArray: [
        {
          title: "Dividend Income",
          key: "cf_DividendIncome",
          img: Business_building,
        },
        {
          title: "Business as Trusts",
          key: "cf_BusinessAsTrusts",
          img: BusinessTeam_Handshake,
        },
        {
          title: "Bucket Company",
          key: "cf_BucketCompany",
          img: Business_fund,
        },
      ],
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "SMSF",
      statusStep: 50,
      icon: "FaGift",
      QuestionsArray: [
        {
          title: "SMSF Accumulation Details",
          key: "cf_SMSFAccumulationDetails",
          img: property,
        },
        {
          title: "SMSF Pension Account Details",
          key: "cf_SMSFPensionAccountDetails",
          img: calender,
        },
        {
          title: "SMSF Bank",
          key: "cf_SMSFBank",
          img: SMSFBank,
          sourceKey: "SMSFBank",
        },
        {
          title: "SMSF Term Deposit",
          key: "cf_SMSFTermDeposit",
          img: TermImg,
          sourceKey: "SMSFTermDeposits",
        },
        {
          title: "SMSF Australian Shares",
          key: "cf_SMSFAustralianShares",
          img: PortFolio,
          sourceKey: "SMSFAustralianShares",
        },
        {
          title: "SMSF Platform Investment",
          key: "cf_SMSFPlatformInvestment",
          img: funds,
          sourceKey: "SMSFManagedFunds",
        },
        {
          title: "SMSF",
          key: "cf_SMSF",
          img: otherInvestment,
        },
        {
          title: "SMSF Investment Loan",
          key: "cf_SMSFInvestmentLoan",
          img: loan,
          sourceKey: "SMSFInvestmentLoan",
          cal: true,
        },
        {
          title: "SMSF Investment Properties",
          key: "cf_SMSFInvestmentProperties",
          img: property,
          sourceKey: "SMSFInvestmentProperties",
        },
      ],
      route: "/user/cashflow/smsf",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Investment Trust",
      statusStep: 60,
      icon: "MdFamilyRestroom",
      route: "/user/cashflow/investment-trust",
      QuestionsArray: [
        {
          title: "West Family Trust Investment",
          key: "cf_WestFamilyTrustInvestment",
          img: BusinessTeam_Handshake,
          cal: true,
        },
        {
          title: "Family Trust Bank Account",
          key: "cf_FamilyTrustBankAccount",
          img: SMSFBank,
          sourceKey: "familyBank",
        },
        {
          title: "Family Trust Term Deposits",
          key: "cf_WestFamilyTrustTermDeposits",
          img: TermImg,
          sourceKey: "familyTermDeposit",
        },
        {
          title: "Family Trust Australian Shares",
          key: "cf_FamilyTrustAustralianShares",
          img: PortFolio,
          sourceKey: "familyAustralianShare",
        },
        {
          title: "Family Trust Platform Investment",
          key: "cf_FamilyTrustPlatformInvestment",
          img: funds,
          sourceKey: "familyMangedFunds",
        },
        {
          title: "Family Trust",
          key: "cf_FamilyTrust",
          img: otherInvestment,
        },
        {
          title: "Family Trust Investment Loan",
          key: "cf_FamilyTrustInvestmentLoan",
          img: loan,
          sourceKey: "familyInvestmentHomeLoan",
          cal: true,
        },
        {
          title: "Family Trust Investment Properties",
          key: "cf_FamilyTrustInvestmentProperties",
          img: property,
          sourceKey: "familyInvestmentProperties",
        },
      ],
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
  ],
  cashFlowReport: [
    {
      subTitle: "Income & Expenses",
      statusStep: 10,
      icon: "FaMoneyCheckDollar",
      stepNumber: 0,
      key: "CashFlow_Income_And_Expenses",
      reportsArray: {
        Age: [
          {
            parent: "{{client}}",
            children: [],
          },
          {
            parent: "{{partner}}",
            children: [],
          },
        ],
        cashflow: [
          {
            parent: "Total Inflows",
            children: [
              "Salary Income",
              "Other Taxable income",
              "Net Business Income",
              "Net Income From Business (Coy & Trust)",
              "Other Non-Taxable income",
              "Rental Income",
              "Investment Income",
              "Interest Income ",
              "Trust Distributions",
              "Family Tax Payments (A & B)",
              "Centrelink Payments",
              "Child Maintenance Received",
              "Super Pensions",
              "Annuity Income",
              "Lumpsum Super & Pension W/Drawals",
              "Investment Redemptions",
              "Loan Additions",
              "Other Lumpsum Additions",
              "Total Inflows",
            ],
          },
          {
            parent: "Total Outflows",
            children: [
              "General Living Expenses",
              "Holidays",
              "Other Expenses",
              "Personal Insurances",
              "Education Expenses",
              "Child Maintenance Payed",
              "Other Lumpsum Purchases",
              "Property Expenses",
              "Non-Deductible Loan Repayments",
              "Loan Repayments (Property Loans)",
              "Investment Loan Repayments",
              "Additional Purchases of Investments",
              "Tax ",
              "Concessional Super Contributions",
              "Non-Concessional/Downsizer Super Contributions",
              "Total Outflows",
            ],
          },
          {
            parent: "Surplus/Deficit",
            children: [
              "Surplus/Deficit",
              "Home Loan End",
              "Cash Savings Year End",
            ],
          },
        ],
        inflows: [
          {
            parent: "Total Inflows",
            children: [
              "Salary Income",
              "Other Taxable income",
              "Net Business Income",
              "Net Income From Business (Coy & Trust)",
              "Other Non-Taxable income",
              "Rental Income",
              "Investment Income",
              "Interest Income ",
              "Trust Distributions",
              "Family Tax Payments (A & B)",
              "Centrelink Payments",
              "Child Maintenance Received",
              "Super Pensions",
              "Annuity Income",
              "Lumpsum Super & Pension W/Drawals",
              "Investment Redemptions",
              "Loan Additions",
              "Other Lumpsum Additions",
              "Total Inflows",
            ],
          },
        ],
        outFlow: [
          {
            parent: "Total Outflows",
            children: [
              "General Living Expenses",
              "Holidays",
              "Other Expenses",
              "Personal Insurances",
              "Education Expenses",
              "Child Maintenance Payed",
              "Other Lumpsum Purchases",
              "Property Expenses",
              "Non-Deductible Loan Repayments",
              "Loan Repayments (Property Loans)",
              "Investment Loan Repayments",
              "Additional Purchases of Investments",
              "Tax ",
              "Concessional Super Contributions",
              "Non-Concessional/Downsizer Super Contributions",
              "Total Outflows",
            ],
          },
        ],
        surplus: [
          {
            parent: "Surplus/Deficit",
            children: [
              "Surplus/Deficit",
              "Home Loan End",
              "Cash Savings Year End",
            ],
          },
        ],
        clientTaxPosition: [
          {
            parent: "Total Assessable income",
            children: [
              "Gross Employment Income",
              "Other taxable Income",
              "Investment Income(Shares & Mgd Funds)",
              "Interest Income",
              "Other Investment Income",
              "Franking Credits",
              "Capital Gains Tax",
              "Rental Income",
              "Net Trust Distribution",
              "Centrelink",
              "Annuity Income",
              "Lifetime Pension ",
              "Super Pension",
              "Total Assessable income",
            ],
          },
          {
            parent: "Total Allowable Deductions",
            children: [
              "Deductible Superannuation Contributions",
              "Other Deductible Expenses",
              "Deductible interest Costs",
              "Income Protection Insurance",
              "Annuity Deductible Amount",
              "Lifetime Pension ",
              "Tax Free Pension amount",
              "Total Allowable Deductions",
            ],
          },
          {
            parent: "Total Taxable Income",
            children: [], // no child, appears standalone
          },
          {
            parent: "Total Tax payable",
            children: [
              "Basic Tax payable",
              "Budget Repair Levy",
              "Medicare levy",
              "Medicare Levy Surcharge",
              "Total Tax payable",
            ],
          },
          {
            parent: "Total Rebates",
            children: [
              "15% Pension Rebate",
              "10% Pension Rebate",
              "Spouse Super Rebate",
              "SAPTO",
              "30% Rebate for insurance Bonds",
              "LITO",
              "Total Rebates",
            ],
          },
          {
            parent: "Total Tax payable",
            children: [
              "Franking Credits",
              "Reportable Fringe Benefits",
              "Unused SAPTO",
              "Additional Contributions Tax",
              "Total Tax payable",
            ],
          },
        ],
        centerLinkAllowanceDataSet: [
          {
            parent: "Total Assets",
            children: [
              "Personal Assets",
              `{{client}}'s Financial Assets`,
              `{{partner}}'s Financial Assets`,
              `{{client}}'s Superannuation`,
              `{{partner}}'s Superannuation`,
              `{{client}}'s Pension Assets`,
              `{{partner}}'s Pension Assets`,
              `{{client}}'s Annuity`,
              `{{partner}}'s Annuity`,
              "Rental Properties",
              "Trading Company Net Assets",
              "Business Trust Net Assets",
              "Family Trust Net Assets",
              "Less",
              "Investment Loans",
              "Investment Property Loan",
              "Total Assets",
              "Lower - Pensions",
              "Lower - Allowance",
              "Upper",
              "Excess Assets",
            ],
          },
        ],
        centerLinkIncomeDataSet: [
          {
            parent: "Total Income",
            children: [
              "Deemed Financial Income",
              "Net Rental Income",
              "Trust Distributions & Company Income",
              `{{client}}'s Salary Income`,
              `{{partner}}'s Salary Income`,
              `{{client}}'s Other Income`,
              `{{partner}}'s Other Income`,
              `{{client}}'s Pension Income`,
              `{{partner}}'s Pension Income`,
              `{{client}}'s Annuity Income`,
              `{{partner}}'s Annuity Income`,
              "Less",
              `{{client}}'s Deductible Pension Income`,
              `{{partner}}'s Deductible Pension Income`,
              `{{client}}'s Work Bonus`,
              `{{partner}}'s Work Bonus`,
              "Total Income",
              "Lower ",
              "Upper",
              "Excess Income",
            ],
          },
        ],
        centerLinkIncomeTestAllowancesDataSet: [
          {
            parent: "Total Income",
            children: [
              "Total Income",
              "Lower ",
              "Upper",
              "Partner Balance over",
            ],
          },
        ],
        centerLinkClientIncomeDataSet: [
          {
            parent: "Total Income",
            children: [
              "Deemed Income ",
              "Net Rental Income",
              "Trust Distributions & Company Income",
              "Salary Income",
              "Other Income ",
              "Annuity Income",
              "Pension Income",
              "Less",
              "Deductible Pension Income",
              "Total Income",
            ],
          },
        ],
        centerLinkPartnerIncomeDataSet: [
          {
            parent: "Total Income",
            children: [
              "Deemed Income ",
              "Net Rental Income",
              "Trust Distributions & Company Income",
              "Salary Income",
              "Other Income ",
              "Annuity Income",
              "Pension Income",
              "Less",
              "Deductible Pension Income",
              "Total Income",
              "Lower ",
              "Upper",
              "Partner Balance Over",
            ],
          },
        ],
        centerLinkClientPaymnetDataSet: [
          {
            parent: "Payment Amount",
            children: ["Payment Amount", "Asset Test Reduction "],
          },
          {
            parent: "Under Asset Test",
            children: ["Under Asset Test", "Income Test Reduction "],
          },
          {
            parent: "Under Income Test",
            children: [],
          },
          {
            parent: "Actual Payment",
            children: [],
          },
        ],
        familyTaxBanifit: [
          {
            parent: "Total Adjusted Family Income",
            children: [
              "Total Maximum rate of FTB- Part A",
              "Base Rate of FTB-Part A",
              "Total Adjusted Family Income",
            ],
          },
          {
            parent: "Total FTB- Part A (including Supplement)",
            children: [
              "Income Level For Maximum Rate of FTB-Part A",
              "Income Level For Base Rate of FTB-Part A",
              "Income Mantaince Free Area",
              "Total FTB- Part A (including Supplement)",
            ],
          },
          {
            parent: "Total Income For Primary Income Earner",
            children: [
              "Total Payment rate of FTB-Part B",
              "Total Income For Primary Income Earner",
            ],
          },
          {
            parent: "Total Income For Secondary Income Earner",
            children: [
              "Income Level Threshold Primary",
              "Total Income For Secondary Income Earner",
            ],
          },
          {
            parent: "Total FTB- Part B (including Supplement)",
            children: [
              "Income Level Threshold Secondary",
              "Total FTB- Part B (including Supplement)",
            ],
          },
          {
            parent: "Total Family tax Benefits (Part A & B)",
            children: [],
          },
        ],
      },
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Lifestyle Assets & Debt",
      statusStep: 20,
      icon: "FaHome",
      stepNumber: 1,
      condition: (CRObject) => true, // Always true, as this step is always needed.
      reportsArray: {
        assets: [
          {
            parent: "Total Assets",
            children: [
              "Lifestyle Assets",
              "Family Home",
              "Direct Share Portfolios",
              "Managed Funds",
              "Other Investments",
              "Cash ",
              "Term Deposits",
              "Insurance Bonds",
              "Investment Properties",
              "Superannuation",
              "Account Based Pensions",
              "Annuity Investments",
              "Trading Company",
              "Bucket Company",
              "Business Trust",
              "SMSF Net Assets",
              "Family Trust Net Assets",
              "Total Assets",
            ],
          },
        ],
        liabilities: [
          {
            parent: "Total Liabilities",
            children: [
              "Home Loan",
              "Personal Loans",
              "Credit Cards",
              "Investment Loans",
              "Investment Property Loans",
              "Total Liabilities",
            ],
          },
          {
            parent: "Total Net Worth",
            children: [],
          },
          {
            parent: "Total Net Worth (PV)",
            children: [],
          },
        ],
        home: [
          {
            parent: "Closing Value",
            children: ["Opening Value", "Growth", "Closing Value", "Costbase"],
          },
          {
            parent: "Year End Loan Balance",
            children: [
              "Opening Balance",
              "Principal Repayments/Withdrawals",
              "Interest Repayments",
              "Year End Loan Balance",
              "Net proceeds after Sale",
            ],
          },
        ],
        personalLoan1: [
          {
            parent: "Year End Loan Balance",
            children: [
              "Opening Balance",
              "Principal Repayments",
              "Interest Repayments",
              "Year End Loan Balance",
            ],
          },
        ],
        personalLoan2: [
          {
            parent: "Year End Loan Balance",
            children: [
              "Opening Balance",
              "Principal Repayments",
              "Interest Repayments",
              "Year End Loan Balance",
            ],
          },
        ],
        personalAsset: [
          {
            parent: "Total Personal Assets",
            children: [
              "Contents",
              "Cleint - Motor Vehicle ",
              "Partner - Motor Vehicle ",
              "Boat",
              "Caravan",
              "Other",
              "Total Personal Assets",
            ],
          },
        ],
        creditCard1: [
          {
            parent: "Year End Loan Balance",
            children: [
              "Opening Balance",
              "Principal Repayments",
              "Interest Repayments",
              "Year End Loan Balance",
            ],
          },
        ],
        creditCard2: [
          {
            parent: "Year End Loan Balance",
            children: [
              "Opening Balance",
              "Principal Repayments",
              "Interest Repayments",
              "Year End Loan Balance",
            ],
          },
        ],
      },
    },
    {
      subTitle: "Financial Investments",
      statusStep: 30,
      icon: "RiCoinsFill",
      stepNumber: 2,
      condition: (CRObject) => true, // Always true, as this step is always needed.
      reportsArray: {
        "Direct Shares": [
          {
            parent: "Value at Year End",
            children: [
              "Opening Balance",
              "Regular Additions",
              "Lumpsum Additions",
              "Lumpsum Withdrawals",
              "Income Reinvested",
              "Growth ",
              "Value at Year End",
              "Cost base",
              "Unrealised Capital Gain/Loss",
              "Actual Realised CG ",
            ],
          },
        ],
        "Managed Funds": [
          {
            parent: "Value at Year End",
            children: [
              "Opening Balance",
              "Regular Additions",
              "Lumpsum Additions",
              "Lumpsum Withdrawals",
              "Income Reinvested",
              "Managment Fees",
              "Growth ",
              "Value at Year End",
              "Cost base",
              "Unrealised Capital Gain/Loss",
              "Actual Realised CG ",
            ],
          },
        ],
        "Investment Bonds": [
          {
            parent: "Value at Year End",
            children: [
              "Opening Balance",
              "Regular Additions",
              "Lumpsum Additions",
              "Lumpsum Withdrawals",
              "Managment Fees",
              "Net Earnings (After 30%)",
              "Value at Year End",
              "Gross Contributions",
              "Taxable Component (All earnings)",
              "Actual Assessable Amount",
            ],
          },
        ],
        Other: [
          {
            parent: "Value at Year End",
            children: [
              "Opening Balance",
              "Regular Additions",
              "Lumpsum Additions",
              "Lumpsum Withdrawals",
              "Income Reinvested",
              "Managment Fees",
              "Growth ",
              "Value at Year End",
              "Cost base",
              "Unrealised Capital Gain/Loss",
              "Actual Realised CG ",
            ],
          },
        ],
        Cash: [
          {
            parent: "Value at Year End",
            children: [
              "Opening Balance",
              "Regular Additions",
              "Lumpsum Additions",
              "Lumpsum Withdrawals",
              "Income Reinvested",
              "Value at Year End",
              "Additional Surplus/Defict From CF",
              "Value at Year End (Post surplus/Defict)",
            ],
          },
        ],
        "Term Deposits": [
          {
            parent: "Value at Year End",
            children: [
              "Opening Balance",
              "Regular Additions",
              "Lumpsum Additions",
              "Lumpsum Withdrawals",
              "Income Reinvested",
              "Value at Year End",
            ],
          },
        ],
        "Investment Loans": [
          {
            parent: "Value at Year End",
            children: [
              "Opening Balance",
              "Interest Repayments",
              "Principal Repayments",
              "Loan Additions",
              "Year End Loan Balance",
              "Deductible Interest",
            ],
          },
        ],
        "Margin Loans": [
          {
            parent: "Value at Year End",
            children: [
              "Opening Balance",
              "Additional Loan Contributions",
              "Interest Repayments",
              "Loan Lumpsum Repayment",
              "Year End Loan Balance",
              "Repay Loan",
              "Deductible Interest",
            ],
          },
        ],
        Property: [
          {
            parent: "Total Expenses",
            children: [
              "Rental Income",
              "Agent Commisions",
              "Interest Expenses",
              "Annual Expenses",
              "Total Expenses",
            ],
          },
          {
            parent: "Net Rental Income/Loss",
            children: [],
          },
        ],
        PositionProperty: [
          {
            parent: "Closing Value",
            children: [
              "Opening Value",
              "Growth",
              "Closing Value",
              "Costbase",
              "Unrealised Capital Gain/Loss at Year End",
              "Realised Capital Gain/Loss",
            ],
          },
          {
            parent: "Year End Loan Balance",
            children: [
              "Opening Balance",
              "Principal Repayments",
              "Interest Repayments",
              "Year End Loan Balance",
              "Deductible Interest",
              "Net proceeds after Sale",
            ],
          },
        ],
        Superannuation: [
          {
            parent: "Non Conessional Contributions Cap",
            children: [],
          },
          {
            parent: "Concessional Contributions Cap",
            children: [],
          },
          {
            parent: "Opening Balance",
            children: [
              "Opening Balance",
              "Rollovers-transfer in",
              "Employer Contributions",
              "Salary Sacrfice/Personal Deductible",
              "Spouse Splitting",
              "Non Concessional Contributions",
              "Government Co-Contribution/Low income",
              "Income Received",
              "Growth",
            ],
          },
          {
            parent: "Closing Member Balance",
            children: [
              "Fees",
              "Insurance",
              "Tax payable",
              "Other Lumpsum Withdrawals",
              "Rollover to another Fund",
              "Closing Member Balance",
              "Franking Credits",
              "Tax-free Component",
              "Taxable Component",
            ],
          },
        ],
        Pensionannuation: [
          {
            parent: "Opening Balance",
            children: ["Opening Balance", "Income Received", "Growth"],
          },
          {
            parent: "Closing Member Balance",
            children: [
              "Fees",
              "Tax payable",
              "Lumpsum Commutations",
              "Pension Payments",
              "Closing Member Balance",
              "Franking Credits",
              "Tax-free Component",
              "Taxable Component",
              "Centrelink Deductible Amount",
              "Tax Free Pension Amount",
            ],
          },
        ],
        annuities: [
          {
            parent: "Value at Year End",
            children: [
              "Centrelink Value",
              "Deductible Amount (ROC)",
              "Value at Year End",
              "Annuity Income",
              "Assessable Annuity Income",
              "Centrelink Deemed Investments",
              "Centrelink Assesable income",
            ],
          },
        ],
      },
    },
    {
      subTitle: "Business Entities",
      statusStep: 40,
      icon: "FaBriefcase",
      stepNumber: 3,
      condition: (CRObject) => true, // Always true, as this step is always needed.
      reportsArray: {
        tradingCompany: [
          {
            parent: "Value at Year End",
            children: [
              "{{client}}'s  Net Equity Value",
              "{{partner}}'s  Net Equity Value",
              "Value at Year End",
            ],
          },
        ],
        businessTrust: [
          {
            parent: "Value at Year End",
            children: [
              "{{client}}'s  Net Equity Value",
              "{{partner}}'s  Net Equity Value",
              "Value at Year End",
            ],
          },
        ],
        bucketCompany: [
          {
            parent: "Value at Year End",
            children: [
              "Opening Balance",
              "Distribution Received",
              "Growth",
              "Tax",
              "Dividend Paid",
              "Value at Year End",
            ],
          },
        ],
      },
    },
    {
      subTitle: "SMSF",
      statusStep: 50,
      icon: "FaGift",
      stepNumber: 4,
      condition: (CRObject) => true, // Always true, as this step is always needed.
      reportsArray: {
        cashFlow: [
          {
            parent: "Total Inflows",
            children: [
              "Rental Income",
              "Investment Income",
              "Interest Income ",
              "Other ",
              "Super Rollovers Transferred in",
              "Contributions",
              "Investment Redemptions",
              "Loan Additions",
              "Total Inflows",
            ],
          },
          {
            parent: "Total Outflows",
            children: [
              "Property Expenses",
              "Loan Repayments (Property Loans)",
              "Loan Repayments (Investment Loan)",
              "Selling Cost on Sale of Properties",
              "Additional Purchases of Investments",
              "Insurance Premiums",
              "Accounting & Auditing",
              "Adviser Service Fees ",
              "Tax ",
              "Pensions ",
              "Lumpsum Super & Pension Withdrawals",
              "Total Outflows",
            ],
          },
          {
            parent: "Surplus/Deficit",
            children: [],
          },
        ],
        Tax: [
          {
            parent: "Total Assessable Fund Income",
            children: [
              "Net Rental Income",
              "Investment Income",
              "Interest Income ",
              "Concessional Contributions",
              "Other ",
              "Investment Income Received",
              "Capital Gains ",
              "Franking Credits",
              "Total Assessable Fund Income",
            ],
          },
          {
            parent: "Total Deductions",
            children: [
              "Rental Expenses",
              "Insurance Premiums",
              "Interest on Property Loans",
              "Loan interest",
              "Accounting and Auditing Fees",
              "ATO Levy",
              "Adviser Service Fees ",
              "Total Deductions",
            ],
          },
          {
            parent: "Total Taxable income",
            children: [],
          },
        ],
        "Balance Sheets": [
          {
            parent: "Total Assets",
            children: [
              "Property Value",
              "Share Portfolio",
              "Managed Funds",
              "Other",
              "Term Deposit",
              "Cash at Bank",
              "Total Assets",
            ],
          },
          {
            parent: "Total Liabilities",
            children: [
              "Property Loans",
              "Investment Loans",
              "Total Liabilities",
            ],
          },
          {
            parent: "Total Net Asset",
            children: [],
          },
          {
            parent: "Total Member Balance",
            children: [
              "{{client}}'s Accumulation Balance",
              "{{partner}}'s Accumulation Balance",
              "{{client}}'s Pension Balance",
              "{{partner}}'s Pension Balance",
              "Total Member Balance",
            ],
          },
          {
            parent: "Difference",
            children: [],
          },
        ],
        "Accumilation Account": [
          {
            parent: "Non Concessional Contributions Cap",
            children: [],
          },
          {
            parent: "Concessional Contributions Cap",
            children: [],
          },
          {
            parent: "Opening Balance",
            children: [
              "Opening Balance",
              "Rollovers-tranfer in",
              "Employer Contributions",
              "Salary Sacrfice/Personal Deductible",
              "Spouse Splitting",
              "Non Concessional Contributions",
              "Government Co-Contribution/Low income ",
              "Share of Profit",
            ],
          },
          {
            parent: "Closing Member Balance",
            children: [
              "Insurance",
              "Tax payable",
              "Other Lumpsum Withdrawals",
              "Closing Member Balance",
              "Tax-free Component",
              "Taxable Component",
            ],
          },
        ],
        "Pension Account": [
          {
            parent: "Opening Balance",
            children: ["Opening Balance", "Share of Profit"],
          },
          {
            parent: "Closing Member Balance",
            children: [
              "Tax payable",
              "Lumpsum Commutations",
              "Pension Payments",
              "Closing Member Balance",
              "Tax-free Component",
              "Taxable Component",
              "Centrelink Deductible Amount",
              "Tax Free Pension Amount",
            ],
          },
        ],
        "Direct Shares": [
          {
            parent: "Value at Year End",
            children: [
              "Opening Balance",
              "Regular Additions",
              "Lumpsum Additions",
              "Lumpsum Withdrawals",
              "Income Reinvested",
              "Growth",
              "Value at Year End",
              "Cost base",
              "Unrealised Capital Gain/Loss",
              "Actual Realised CG ",
            ],
          },
        ],
        "Managed Funds": [
          {
            parent: "Value at Year End",
            children: [
              "Opening Balance",
              "Regular Additions",
              "Lumpsum Additions",
              "Lumpsum Withdrawals",
              "Income Reinvested",
              "Managment Fees",
              "Growth",
              "Value at Year End",
              "Cost base",
              "Unrealised Capital Gain/Loss",
              "Actual Realised CG ",
            ],
          },
        ],
        Other: [
          {
            parent: "Value at Year End",
            children: [
              "Opening Balance",
              "Regular Additions",
              "Lumpsum Additions",
              "Lumpsum Withdrawals",
              "Income Reinvested",
              "Managment Fees",
              "Growth",
              "Value at Year End",
              "Cost base",
              "Unrealised Capital Gain/Loss",
              "Actual Realised CG ",
            ],
          },
        ],
        Cash: [
          {
            parent: "Value at Year End",
            children: [
              "Opening Balance",
              "Surplus/Deficit From Cashflow",
              "Value at Year End",
              "Income Reinvested",
            ],
          },
        ],
        "Term Deposits": [
          {
            parent: "Value at Year End",
            children: [
              "Opening Balance",
              "Lumpsum Additions",
              "Lumpsum Withdrawals",
              "Income Reinvested",
              "Value at Year End",
              "Income Reinvested",
              "Income",
            ],
          },
        ],
        "Investment Loans": [
          {
            parent: "Year End Loan Balance",
            children: [
              "Opening Balance",
              "Principal Repayments",
              "Interest Repayments",
              "Loan Additions",
              "Year End Loan Balance",
              "Deductible Interest",
            ],
          },
        ],
        "SMSF Property": [
          {
            parent: "Total Expenses",
            children: [
              "Rental Income",
              "Agent Commisions",
              "Interest Expenses",
              "Annual Expenses",
              "Total Expenses",
            ],
          },
          {
            parent: "Net Rental Income/Loss",
            children: [],
          },
          {
            parent: "Closing Value",
            children: [
              "Opening Value",
              "Growth",
              "Closing Value",
              "Costbase",
              "Unrealised Capital Gain/Loss at Year End",
              "Realised Capital Gain/Loss",
            ],
          },
          {
            parent: "Year End Loan Balance",
            children: [
              "Opening Balance",
              "Principal Repayments",
              "Interest Repayments",
              "Year End Loan Balance",
              "Deductible Interest",
              "Net proceeds after Sale",
            ],
          },
        ],
      },
    },
    {
      subTitle: "Investment Trust",
      statusStep: 60,
      icon: "MdFamilyRestroom",
      stepNumber: 5,
      condition: (CRObject) => true, // Always true, as this step is always needed.
      reportsArray: {
        cashFlow: [
          {
            parent: "Total Inflows",
            children: [
              "Rental Income",
              "Investment Income",
              "Interest Income ",
              "Other",
              "Investment Redemptions",
              "Loan Additions",
              "Total Inflows",
            ],
          },
          {
            parent: "Total Outflows",
            children: [
              "Property Expenses",
              "Loan Repayments (Property Loans)",
              "Loan Repayments (Investment Loan)",
              "Selling Cost on Sale of Properties",
              "Additional Purchases of Investments",
              "Accounting & Auditing",
              "Advsier Service Fees",
              "Total Outflows",
            ],
          },
          {
            parent: "Surplus/Deficit",
            children: [],
          },
        ],
        "Profit and Loss": [
          {
            parent: "Investment Income Received",
            children: [
              "Net Rental Income",
              "Investment Income",
              "Interest Income",
              "Other ",
              "Investment Income Received",
            ],
          },
          {
            parent: "Total Deductions",
            children: [
              "Rental Expenses",
              "Interest on Property Loans",
              "Loan interest",
              "Accounting and Auditing Fees",
              "Adviser Service Fees",
              "Total Deductions",
            ],
          },
          {
            parent: "Net Income ",
            children: [],
          },
          {
            parent: "Total Trust Net Income",
            children: [
              "Net Capital Gains ",
              "Franking Credits",
              "Total Trust Net Income",
            ],
          },
          {
            parent: "Actual Trust Distribution",
            children: ["Accumlated Losses", "Actual Trust Distribution"],
          },
        ],
        "Balance Sheets": [
          {
            parent: "Total Assets",
            children: [
              "Property Value",
              "Share Portfolio",
              "Managed Funds",
              "Other",
              "Term Deposit",
              "Cash at Bank",
              "Total Assets",
            ],
          },
          {
            parent: "Total Liabilities",
            children: [
              "Property Loans",
              "Investment Loans",
              "Total Liabilities",
            ],
          },
          {
            parent: "Total Net Trust Assets",
            children: [],
          },
          {
            parent: "Total Beneficay Loans",
            children: [
              "Beneficiary Loan-{{client}}",
              "Beneficiary Loan-{{partner}}",
              "Total Beneficay Loans",
            ],
          },
          {
            parent: "Difference",
            children: [],
          },
        ],
        "Direct Shares": [
          {
            parent: "Value at Year End",
            children: [
              "Opening Balance",
              "Regular Additions",
              "Lumpsum Additions",
              "Lumpsum Withdrawals",
              "Income Reinvested",
              "Growth",
              "Value at Year End",
              "Cost base",
              "Unrealised Capital Gain/Loss",
              "Actual Realised CG ",
            ],
          },
        ],
        "Managed Funds": [
          {
            parent: "Value at Year End",
            children: [
              "Opening Balance",
              "Regular Additions",
              "Lumpsum Additions",
              "Lumpsum Withdrawals",
              "Income Reinvested",
              "Managment Fees",
              "Growth ",
              "Value at Year End",
              "Cost base",
              "Unrealised Capital Gain/Loss",
              "Actual Realised CG ",
            ],
          },
        ],
        Other: [
          {
            parent: "Value at Year End",
            children: [
              "Opening Balance",
              "Regular Additions",
              "Lumpsum Additions",
              "Lumpsum Withdrawals",
              "Income Reinvested",
              "Managment Fees",
              "Growth ",
              "Value at Year End",
              "Cost base",
              "Unrealised Capital Gain/Loss",
              "Actual Realised CG ",
            ],
          },
        ],
        Cash: [
          {
            parent: "Value at Year End",
            children: [
              "Opening Balance",
              "Surplus/Deficit From Cashflow",
              "Lumpsum Additions",
              "Lumpsum Withdrawals",
              "Distribution taken as cash",
              "Value at Year End",
              "Income Reinvested",
            ],
          },
        ],
        "Term Deposits": [
          {
            parent: "Value at Year End",
            children: [
              "Opening Balance",
              "Lumpsum Additions",
              "Lumpsum Withdrawals",
              "Income Reinvested",
              "Value at Year End",
              "Income Reinvested",
              "Income",
            ],
          },
        ],
        "Investment Loans": [
          {
            parent: "Value at Year End",
            children: [
              "Opening Balance",
              "Principal Repayments",
              "Interest Repayments",
              "Loan Additions",
              "Year End Loan Balance",
              "Deductible Interest",
            ],
          },
        ],
        "Trust Property": [
          {
            parent: "Total Expenses",
            children: [
              "Rental Income",
              "Agent Commisions",
              "Interest Expenses",
              "Annual Expenses",
              "Total Expenses",
            ],
          },
          {
            parent: "Net Rental Income/Loss",
            children: [],
          },
          {
            parent: "Closing Value",
            children: [
              "Opening Value",
              "Growth",
              "Closing Value",
              "Costbase",
              "Unrealised Capital Gain/Loss at Year End",
              "Realised Capital Gain/Loss",
            ],
          },
          {
            parent: "Year End Loan Balance",
            children: [
              "Opening Balance",
              "Principal Repayments",
              "Interest Repayments",
              "Year End Loan Balance",
              "Deductible Interest",
              "Net proceeds after Sale",
            ],
          },
        ],
      },
    },
  ],
  AdviserObject: [
    {
      AFSNumber: "218600",
      AFSName: "IPIB PTY LTD",
    },
    {
      AFSNumber: "218678",
      AFSName: "IMC PACIFIC PTY LTD",
    },
    {
      AFSNumber: "218705",
      AFSName: "TELSTRA SUPER FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "218770",
      AFSName: "TRILOGY GROUP AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "219140",
      AFSName: "HAWKESBRIDGE CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "219195",
      AFSName: "HAYES STERLING PTY. LIMITED",
    },
    {
      AFSNumber: "219326",
      AFSName: "TOWNSHEND CAPITAL PTY LTD",
    },
    {
      AFSNumber: "219431",
      AFSName: "ODYSSEY EQUITY FINANCE PTY. LTD.",
    },
    {
      AFSNumber: "219462",
      AFSName: "PENGANA INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "219582",
      AFSName: "VIRTU ITG AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "219612",
      AFSName: "RELI CAPITAL LTD",
    },
    {
      AFSNumber: "219723",
      AFSName: "PRIME SUPER PTY LTD",
    },
    {
      AFSNumber: "220242",
      AFSName: "WOTSO FUND SERVICES LIMITED",
    },
    {
      AFSNumber: "220383",
      AFSName: "PULSE MARKETS PTY LTD",
    },
    {
      AFSNumber: "220647",
      AFSName: "BACCUS INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "220705",
      AFSName: "RUSSELL INVESTMENTS EMPLOYEE BENEFITS PTY LTD",
    },
    {
      AFSNumber: "220718",
      AFSName: "MIRVAC FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "220897",
      AFSName: "HOOD SWEENEY SECURITIES PTY LTD",
    },
    {
      AFSNumber: "220977",
      AFSName: "WAN, VICTOR KIT",
    },
    {
      AFSNumber: "221146",
      AFSName: "CLIME ASSET MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "221183",
      AFSName: "COLUMBUS INVESTMENT SERVICES LTD",
    },
    {
      AFSNumber: "221184",
      AFSName: "PACKER & CO LTD",
    },
    {
      AFSNumber: "221218",
      AFSName: "THOMAS INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "221235",
      AFSName: "OZPLAN FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "221315",
      AFSName: "BGC PARTNERS (AUSTRALIA) PTY LIMITED",
    },
    {
      AFSNumber: "221409",
      AFSName: "BW CAPITAL PTY LTD",
    },
    {
      AFSNumber: "221474",
      AFSName: "360 CAPITAL FM LIMITED",
    },
    {
      AFSNumber: "221476",
      AFSName: "ARGONAUT PCF LIMITED",
    },
    {
      AFSNumber: "221530",
      AFSName: "STAFFORD CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "221531",
      AFSName: "RADFORD ALLEN FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "221556",
      AFSName: "RURAL DIRECTIONS PTY LTD",
    },
    {
      AFSNumber: "221671",
      AFSName: "TITANIUM EQUITIES PTY. LTD.",
    },
    {
      AFSNumber: "221794",
      AFSName: "COOPER INVESTORS PTY LIMITED",
    },
    {
      AFSNumber: "221896",
      AFSName: "CUA MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "221933",
      AFSName: "ACCOUNTANTS INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "221935",
      AFSName: "PLATINUM INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "221937",
      AFSName: "THROUGHLIFE FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "221938",
      AFSName: "R M CAPITAL PTY LTD",
    },
    {
      AFSNumber: "222029",
      AFSName: "HORSEY JAMESON BIRD PTY. LTD.",
    },
    {
      AFSNumber: "222040",
      AFSName: "ZIPMONEY SECURITIES LTD",
    },
    {
      AFSNumber: "222050",
      AFSName: "PKF MELBOURNE CORPORATE PTY LTD",
    },
    {
      AFSNumber: "222055",
      AFSName: "PRIME VALUE ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "222107",
      AFSName: "ALMAN PARTNERS PTY. LTD.",
    },
    {
      AFSNumber: "222110",
      AFSName: "AURORA FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "222154",
      AFSName: "GILD WEALTH PTY LTD",
    },
    {
      AFSNumber: "222213",
      AFSName: "LA TROBE FINANCIAL ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "222266",
      AFSName: "BDHSTERLING AFSL PTY LTD",
    },
    {
      AFSNumber: "222334",
      AFSName: "PROVIDENCE FUND SERVICES PTY LTD",
    },
    {
      AFSNumber: "222444",
      AFSName: "TRAVELEX LIMITED",
    },
    {
      AFSNumber: "222445",
      AFSName: "CELESTE FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "222497",
      AFSName: "MY FINANCIAL ADVISOR PTY LTD",
    },
    {
      AFSNumber: "222600",
      AFSName: "MGD WEALTH LTD",
    },
    {
      AFSNumber: "222605",
      AFSName: "UBS ASSET MANAGEMENT (AUSTRALIA) LTD",
    },
    {
      AFSNumber: "222640",
      AFSName: "GLOBAL MUTUAL FUNDS PTY LTD",
    },
    {
      AFSNumber: "222650",
      AFSName: "DOO FINANCIAL AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "222690",
      AFSName: "ETHICAL INVESTMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "222756",
      AFSName: "JUPITER INTERNATIONAL (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "222769",
      AFSName: "LANHAM FINANCIAL ADVICE PTY LTD",
    },
    {
      AFSNumber: "222828",
      AFSName: "STRATEGIC FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "222835",
      AFSName: "PLANNING PARTNERS PTY. LTD.",
    },
    {
      AFSNumber: "223100",
      AFSName: "ALLARD PARTNERS AUSTRALIA PTY. LIMITED",
    },
    {
      AFSNumber: "223135",
      AFSName: "CAPSTONE FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "223191",
      AFSName: "NEXT LEVEL CORPORATE PTY LTD",
    },
    {
      AFSNumber: "223231",
      AFSName: "MAM PTY LIMITED",
    },
    {
      AFSNumber: "223246",
      AFSName: "RMBL INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "223260",
      AFSName: "AYLESBURY FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "223271",
      AFSName: "EQT RESPONSIBLE ENTITY SERVICES LTD",
    },
    {
      AFSNumber: "223280",
      AFSName: "SECURINVEST FINANCIAL PLANNERS PTY. LTD.",
    },
    {
      AFSNumber: "223409",
      AFSName: "AGRI ADVISORS PTY LIMITED",
    },
    {
      AFSNumber: "223418",
      AFSName: "BNP PARIBAS ASSET MANAGEMENT AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "223419",
      AFSName: "LEYLAND PRIVATE ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "223621",
      AFSName: "GOODMAN FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "223627",
      AFSName: "BUSINESS INSURANCE SPECIALISTS PTY LTD",
    },
    {
      AFSNumber: "223670",
      AFSName: "THORNTON GROUP (AUSTRALIA) PTY LIMITED",
    },
    {
      AFSNumber: "223671",
      AFSName: "SIRE CUSTODIANS LTD",
    },
    {
      AFSNumber: "223687",
      AFSName: "FOSTER STOCKBROKING PTY LIMITED",
    },
    {
      AFSNumber: "223688",
      AFSName: "AGRISK MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "223718",
      AFSName: "ETHINVEST PTY. LIMITED",
    },
    {
      AFSNumber: "223809",
      AFSName: "BROOKFIELD CAPITAL MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "223947",
      AFSName: "TOWNSHEND PRUDENTIAL PTY LTD",
    },
    {
      AFSNumber: "223988",
      AFSName: "FIRST SUPER PTY LIMITED",
    },
    {
      AFSNumber: "224022",
      AFSName: "MONEY CAT GROUP PTY LTD",
    },
    {
      AFSNumber: "224034",
      AFSName: "SLM CORPORATE PTY LTD",
    },
    {
      AFSNumber: "224035",
      AFSName: "BMF ASSET MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "224037",
      AFSName: "M.W.Y. FINANCIAL SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "224077",
      AFSName: "ACCRETION INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "224107",
      AFSName: "PRIMARY SECURITIES LTD",
    },
    {
      AFSNumber: "224108",
      AFSName: "SMALLCO INVESTMENT MANAGER LIMITED",
    },
    {
      AFSNumber: "224150",
      AFSName: "ARA CONSULTANTS PTY LTD",
    },
    {
      AFSNumber: "224158",
      AFSName: "PARADICE INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "224221",
      AFSName: "BLACKWOOD CAPITAL PTY LTD",
    },
    {
      AFSNumber: "224274",
      AFSName: "HEWITT, DOUGLAS HOWARD",
    },
    {
      AFSNumber: "224313",
      AFSName: "MELBOURNE VENTURE SECURITIES PTY. LTD.",
    },
    {
      AFSNumber: "224315",
      AFSName: "PSF SERVICES LTD",
    },
    {
      AFSNumber: "224426",
      AFSName: "RICHARD RAY & ASSOCIATES PTY. LTD.",
    },
    {
      AFSNumber: "224482",
      AFSName: "GREENHILL & CO. AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "224485",
      AFSName: "OPHELEO HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "224496",
      AFSName: "XENTINEL FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "224543",
      AFSName: "FYG PLANNERS PTY LTD",
    },
    {
      AFSNumber: "224558",
      AFSName: "KR SECURITIES PTY LTD",
    },
    {
      AFSNumber: "224616",
      AFSName: "COYNE HOLDINGS PTY LIMITED",
    },
    {
      AFSNumber: "224636",
      AFSName: "MIDWINE CONSULTING PTY. LTD.",
    },
    {
      AFSNumber: "224659",
      AFSName: "FIIG SECURITIES LIMITED",
    },
    {
      AFSNumber: "224663",
      AFSName: "MOOMOO SECURITIES AUSTRALIA LTD",
    },
    {
      AFSNumber: "224815",
      AFSName: "ARGONAUT FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "224818",
      AFSName: "ELEY GRIFFITHS GROUP PTY LIMITED",
    },
    {
      AFSNumber: "224852",
      AFSName: "TULLETT PREBON (AUSTRALIA) PTY LIMITED",
    },
    {
      AFSNumber: "224855",
      AFSName: "IPS INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "224900",
      AFSName: "MELMAIN INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "224952",
      AFSName: "ESI FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "225029",
      AFSName: "THE PRINCIPAL EDGE PTY. LTD.",
    },
    {
      AFSNumber: "225047",
      AFSName: "ACTION INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "225051",
      AFSName: "INTEGRITY FINANCIAL PLANNERS PTY. LTD.",
    },
    {
      AFSNumber: "225054",
      AFSName: "VISION SUPER PTY LTD",
    },
    {
      AFSNumber: "225064",
      AFSName: "ONE INVESTMENT ADMINISTRATION LTD",
    },
    {
      AFSNumber: "225071",
      AFSName: "RESULTS FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "225132",
      AFSName: "GALL, ALLAN J",
    },
    {
      AFSNumber: "225136",
      AFSName: "ABN AMRO CLEARING SYDNEY PTY LTD",
    },
    {
      AFSNumber: "225200",
      AFSName: "WYNDHAM VACATION CLUBS SOUTH PACIFIC LTD",
    },
    {
      AFSNumber: "225216",
      AFSName: "HNW PLANNING PTY LTD",
    },
    {
      AFSNumber: "225316",
      AFSName: "SELECTOR FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "225330",
      AFSName: "GOLDSBOROUGH FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "225357",
      AFSName: "AIMS INVESTMENT MANAGERS LTD.",
    },
    {
      AFSNumber: "225385",
      AFSName: "PRINCIPAL GLOBAL INVESTORS (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "225397",
      AFSName: "INTEGER SECURITIES LIMITED",
    },
    {
      AFSNumber: "225405",
      AFSName: "FIRST SAMUEL LIMITED",
    },
    {
      AFSNumber: "225408",
      AFSName: "GENERATION LIFE LIMITED",
    },
    {
      AFSNumber: "225417",
      AFSName: "ARCADIA FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "225486",
      AFSName: "LEE CLARKE AND CO PTY LTD",
    },
    {
      AFSNumber: "225715",
      AFSName: "WESTMOUNT SECURITIES PTY LTD",
    },
    {
      AFSNumber: "225721",
      AFSName: "ELSTREE INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "225738",
      AFSName: "BOSTON REED PTY LTD",
    },
    {
      AFSNumber: "225758",
      AFSName: "MACQUARIE ALTERNATIVE ASSETS MANAGEMENT LTD",
    },
    {
      AFSNumber: "225759",
      AFSName: "LUNAWAVE PTY. LIMITED",
    },
    {
      AFSNumber: "225781",
      AFSName: "GROWTH EQUITIES PTY LTD",
    },
    {
      AFSNumber: "225858",
      AFSName: "FIRST CITY CORPORATE ADVISORY SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "225889",
      AFSName: "POLYGON HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "225920",
      AFSName: "PARKSIDE INVESTORPLUS SOLUTIONS PTY LIMITED",
    },
    {
      AFSNumber: "225921",
      AFSName: "KEY PACIFIC ADVISORY PARTNERS PTY LTD",
    },
    {
      AFSNumber: "225931",
      AFSName: "GDA FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "225936",
      AFSName: "INTERNATIONAL PACIFIC CAPITAL LIMITED",
    },
    {
      AFSNumber: "225962",
      AFSName: "HUNTER GREEN PTY LTD",
    },
    {
      AFSNumber: "226035",
      AFSName: "AUSTRALIAN WEALTH ADVISERS PTY LTD",
    },
    {
      AFSNumber: "226143",
      AFSName: "PWM FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "226184",
      AFSName: "ASHFORDS WEALTH ADVISORS PTY LTD",
    },
    {
      AFSNumber: "226199",
      AFSName: "GLENEAGLE ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "226230",
      AFSName: "DOO INSURANCE BROKER AU PTY LTD",
    },
    {
      AFSNumber: "226238",
      AFSName: "PROFILE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "226319",
      AFSName: "DDH GRAHAM LIMITED",
    },
    {
      AFSNumber: "226347",
      AFSName: "WEALTH WITHIN LIMITED",
    },
    {
      AFSNumber: "226348",
      AFSName: "SHAKESPEARE HANEY SECURITIES LIMITED",
    },
    {
      AFSNumber: "226367",
      AFSName: "ON Q SECURITIES PTY LTD",
    },
    {
      AFSNumber: "226373",
      AFSName: "SLADE BLOODSTOCK PTY LTD",
    },
    {
      AFSNumber: "226384",
      AFSName: "WOODS & PARTNERS PTY. LTD.",
    },
    {
      AFSNumber: "226395",
      AFSName: "ONEILL, JOSEPH VINCENT",
    },
    {
      AFSNumber: "226402",
      AFSName: "STAR THOROUGHBREDS PTY. LTD.",
    },
    {
      AFSNumber: "226403",
      AFSName: "AUSTRALIAN LIFE INSURANCE DISTRIBUTION PTY LTD",
    },
    {
      AFSNumber: "226404",
      AFSName: "ALFA INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "226405",
      AFSName: "B. SILVER EXCHANGE PTY LTD",
    },
    {
      AFSNumber: "226415",
      AFSName: "MERLEA INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "226435",
      AFSName: "INVESTSMART FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "226442",
      AFSName: "BROOKFIELD CAPITAL SECURITIES LIMITED",
    },
    {
      AFSNumber: "226470",
      AFSName: "ABC FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "226473",
      AFSName: "SCHRODER INVESTMENT MANAGEMENT AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "226484",
      AFSName: "OZFOREX LIMITED",
    },
    {
      AFSNumber: "226566",
      AFSName: "PENGANA CAPITAL LTD",
    },
    {
      AFSNumber: "226601",
      AFSName: "JOHANSEN INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "226693",
      AFSName: "MORLEY, PETER VIVIAN",
    },
    {
      AFSNumber: "226701",
      AFSName: "RURAL FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "226787",
      AFSName: "LAWRENCE, SHARON L",
    },
    {
      AFSNumber: "226827",
      AFSName: "JLT RISK SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "226842",
      AFSName: "INVESTORLINK DIRECT PTY LIMITED",
    },
    {
      AFSNumber: "226849",
      AFSName: "CHARTER HALL DIRECT PROPERTY MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "226872",
      AFSName: "ZENITH INVESTMENT PARTNERS PTY LTD",
    },
    {
      AFSNumber: "226873",
      AFSName: "GREAT WALL INSURANCE SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "226904",
      AFSName: "KOCH BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "227051",
      AFSName: "IFM (SECURITIES) PTY LTD",
    },
    {
      AFSNumber: "227064",
      AFSName: "NEPEAN BROKERS & ASSOCIATES PROPRIETARY LIMITED",
    },
    {
      AFSNumber: "227065",
      AFSName: "KESTREL CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "227074",
      AFSName: "RENAISSANCE SMALLER COMPANIES PTY LTD",
    },
    {
      AFSNumber: "227096",
      AFSName: "LFG FINANCIAL SERVICES LTD",
    },
    {
      AFSNumber: "227114",
      AFSName: "MPG FUNDS MANAGEMENT LTD",
    },
    {
      AFSNumber: "227138",
      AFSName: "BARRY BALDOCK PTY LTD",
    },
    {
      AFSNumber: "227148",
      AFSName: "CAPITAL PARTNERS CONSULTING PTY LTD",
    },
    {
      AFSNumber: "227163",
      AFSName: "JACANDA CAPITAL PTY. LIMITED",
    },
    {
      AFSNumber: "227164",
      AFSName: "EMJAY INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "227169",
      AFSName: "SYNSTRAT MANAGEMENT PTY. LTD.",
    },
    {
      AFSNumber: "227184",
      AFSName: "VICTORIAN THOROUGHBREDS PTY. LTD.",
    },
    {
      AFSNumber: "227185",
      AFSName: "HEWISON & ASSOCIATES PTY. LTD.",
    },
    {
      AFSNumber: "227186",
      AFSName: "NM INSURANCE PTY LTD",
    },
    {
      AFSNumber: "227190",
      AFSName: "RIACT PTY LTD",
    },
    {
      AFSNumber: "227200",
      AFSName: "COVERFORCE AUGHTERSONS PTY LTD",
    },
    {
      AFSNumber: "227201",
      AFSName: "QUESTUS CAPITAL SOLUTIONS LIMITED",
    },
    {
      AFSNumber: "227232",
      AFSName: "COUNT FINANCIAL LIMITED",
    },
    {
      AFSNumber: "227250",
      AFSName: "COLLINS FINANCIAL PLANNING PTY. LTD",
    },
    {
      AFSNumber: "227263",
      AFSName: "VANGUARD INVESTMENTS AUSTRALIA LTD",
    },
    {
      AFSNumber: "227357",
      AFSName: "CUNNINGHAM FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "227365",
      AFSName: "HANCOX BLOODSTOCK PTY. LTD.",
    },
    {
      AFSNumber: "227554",
      AFSName: "QUBE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "227605",
      AFSName: "ACORN CAPITAL LIMITED",
    },
    {
      AFSNumber: "227611",
      AFSName: "SCIVENTURES INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "227673",
      AFSName: "STACKS MANAGED INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "227675",
      AFSName: "CHOICE PRIVATE CLIENTS PTY LTD",
    },
    {
      AFSNumber: "227676",
      AFSName: "IAG ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "227677",
      AFSName: "HUMAN FINANCIAL MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "227678",
      AFSName: "INSURANCE MANUFACTURERS OF AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "227681",
      AFSName: "INSURANCE AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "227682",
      AFSName: "CLEARVIEW LIFE ASSURANCE LIMITED",
    },
    {
      AFSNumber: "227724",
      AFSName: "MULTI SECURE INSURANCE SOLUTIONS PTY LIMITED",
    },
    {
      AFSNumber: "227747",
      AFSName: "LEISHMAN FINANCIAL SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "227748",
      AFSName: "SENTRY ADVICE PTY LTD",
    },
    {
      AFSNumber: "227819",
      AFSName: "ABACUS FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "227820",
      AFSName: "CLARKE & BARWOOD LAWYERS COLAC LTD",
    },
    {
      AFSNumber: "227836",
      AFSName: "YORKWAY SECURITIES PTY LTD",
    },
    {
      AFSNumber: "227843",
      AFSName: "GREENSTONE PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "227858",
      AFSName: "MASEFIELD HOLDINGS PTY. LTD.",
    },
    {
      AFSNumber: "227867",
      AFSName: "ART FINANCIAL ADVICE PTY LTD",
    },
    {
      AFSNumber: "227870",
      AFSName: "KODA CAPITAL WA PTY LTD",
    },
    {
      AFSNumber: "227900",
      AFSName: "SOLUTIONS 2 RETIREMENT PTY LTD",
    },
    {
      AFSNumber: "227902",
      AFSName: "HALL CHADWICK CORPORATE (NSW) LIMITED",
    },
    {
      AFSNumber: "227908",
      AFSName: "RENAISSANCE PROPERTY SECURITIES PTY LTD",
    },
    {
      AFSNumber: "227928",
      AFSName: "PERSONAL PORTFOLIO ONLINE PTY LTD",
    },
    {
      AFSNumber: "227931",
      AFSName: "FIRST MORTGAGE MANAGED INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "227933",
      AFSName: "ASPEN FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "228820",
      AFSName: "THE INTELLIGENT FINANCIAL SERVICES GROUP PTY LTD",
    },
    {
      AFSNumber: "228837",
      AFSName: "AUSTRALAND INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "228894",
      AFSName: "UNISON ADVICE SERVICES LTD",
    },
    {
      AFSNumber: "228914",
      AFSName: "ONEFOCUS PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "228944",
      AFSName: "PRINCIPAL FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "228948",
      AFSName: "GOLDMAN SACHS ASSET MANAGEMENT AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "228949",
      AFSName: "WRI INSURANCE BROKERS PTY. LIMITED",
    },
    {
      AFSNumber: "228975",
      AFSName: "AUSTRALIAN RETIREMENT TRUST PTY LTD",
    },
    {
      AFSNumber: "228986",
      AFSName: "MORNINGSTAR INVESTMENT MANAGEMENT AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "228991",
      AFSName: "AUSTRALIAN RISK APPLICATIONS PTY LTD",
    },
    {
      AFSNumber: "229021",
      AFSName: "GREATER NATIONAL LIMITED",
    },
    {
      AFSNumber: "229069",
      AFSName: "PETER J. WOODFORD PTY. LTD.",
    },
    {
      AFSNumber: "229072",
      AFSName: "AUSTRAL CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "229076",
      AFSName: "RACT INSURANCE PTY. LTD.",
    },
    {
      AFSNumber: "229092",
      AFSName: "WHITBREAD ASSOCIATES PTY. LTD.",
    },
    {
      AFSNumber: "229168",
      AFSName: "STRATEGIC SOLUTIONS AUSTRALIA PTY. LTD.",
    },
    {
      AFSNumber: "229170",
      AFSName: "INTERFINANZ PTY LTD",
    },
    {
      AFSNumber: "229183",
      AFSName: "FAT PROPHETS PTY LTD",
    },
    {
      AFSNumber: "229186",
      AFSName: "UNITED OVERSEAS BANK LIMITED",
    },
    {
      AFSNumber: "229238",
      AFSName: "SINCLAIR WILSON INVESTMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "229242",
      AFSName: "INNATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "229253",
      AFSName: "PROFESSIONAL INSURANCE BROKERS (MCKINNON) PTY LTD",
    },
    {
      AFSNumber: "229264",
      AFSName: "NEWELL PALMER SECURITIES PTY LTD",
    },
    {
      AFSNumber: "229302",
      AFSName: "PETER VICKERS INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "229316",
      AFSName: "COPIA INVESTMENT PARTNERS LTD",
    },
    {
      AFSNumber: "229344",
      AFSName: "IMC INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "229401",
      AFSName: "GILHAM FINANCIAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "229454",
      AFSName: "AUSTASIA FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "229455",
      AFSName: "MONEYPLAN AUSTRALIA (M.P.) PTY. LTD.",
    },
    {
      AFSNumber: "229456",
      AFSName: "SELF FUNDED RETIREMENT PLANNERS PTY LTD",
    },
    {
      AFSNumber: "229462",
      AFSName: "P.I. DIRECT INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "229464",
      AFSName: "BUTLER & BUTLER INVESTMENT SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "229471",
      AFSName: "RGM FINANCIAL PLANNERS PTY LTD",
    },
    {
      AFSNumber: "229568",
      AFSName: "AUSTRALASIA INSURANCE BROKERS PTY LIMITED",
    },
    {
      AFSNumber: "229613",
      AFSName: "ASSETPLAN FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "229696",
      AFSName: "PPF ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "229697",
      AFSName: "CENTRAL VICTORIAN INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "229722",
      AFSName: "AUSBIL INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "229754",
      AFSName: "LLA EQUITY LIMITED",
    },
    {
      AFSNumber: "229757",
      AFSName: "EQUITY TRUSTEES SUPERANNUATION LIMITED",
    },
    {
      AFSNumber: "229760",
      AFSName: "ACCESS FINANCIAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "229809",
      AFSName: "EILDON FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "229823",
      AFSName: "ING BANK (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "229832",
      AFSName: "JULLIARD ADVISORY GROUP PTY LIMITED",
    },
    {
      AFSNumber: "229841",
      AFSName: "PITCHER PARTNERS CORPORATE PTY. LTD.",
    },
    {
      AFSNumber: "229843",
      AFSName: "WHITEFIELD CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "229846",
      AFSName: "OMNIPORT LIMITED",
    },
    {
      AFSNumber: "229847",
      AFSName: "PHOENIX INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "229848",
      AFSName: "TAG INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "229850",
      AFSName: "RUSSELL INVESTMENTS FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "229867",
      AFSName: "NETVEST PTY LTD",
    },
    {
      AFSNumber: "229881",
      AFSName: "INDUSTRY FUNDS INVESTMENTS LTD",
    },
    {
      AFSNumber: "229882",
      AFSName: "NORFINA LIMITED",
    },
    {
      AFSNumber: "229883",
      AFSName: "MCPHERSON & ASSOCIATES PTY. LTD.",
    },
    {
      AFSNumber: "229887",
      AFSName: "PITCHER PARTNERS INVESTMENT SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "229892",
      AFSName: "LIFESPAN FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "229916",
      AFSName: "MACQUARIE SPECIALIST INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "229920",
      AFSName: "FLINDERS PARTNERS FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "229921",
      AFSName: "TOWERS WATSON AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "229935",
      AFSName: "MERCARI PTY LTD",
    },
    {
      AFSNumber: "229939",
      AFSName: "360 FARM AND REGIONAL PTY LTD",
    },
    {
      AFSNumber: "229949",
      AFSName: "AUSTRALIAN ETHICAL INVESTMENT LTD",
    },
    {
      AFSNumber: "229986",
      AFSName: "PRECISE ADVICE FINANCIAL SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "229988",
      AFSName: "INVESTORS MUTUAL LIMITED",
    },
    {
      AFSNumber: "230009",
      AFSName: "H.W. WOOD AUSTRALIA PTY. LTD.",
    },
    {
      AFSNumber: "230016",
      AFSName: "TROJAN INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "230038",
      AFSName: "CAPRICORN MUTUAL LIMITED",
    },
    {
      AFSNumber: "230039",
      AFSName: "RACV INSURANCE SERVICES PTY LTD",
    },
    {
      AFSNumber: "230041",
      AFSName: "EAST WEST INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "230043",
      AFSName: "AIA AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "230052",
      AFSName: "EUROZ HARTLEYS LIMITED",
    },
    {
      AFSNumber: "230095",
      AFSName: "GILKISON GROUP PTY LTD",
    },
    {
      AFSNumber: "230142",
      AFSName: "TRANS-WEST INSURANCE BROKERS (NSW) PTY LTD",
    },
    {
      AFSNumber: "230161",
      AFSName: "TRANSOCEAN SECURITIES PTY LTD",
    },
    {
      AFSNumber: "230163",
      AFSName: "LIKEWIZE SERVICES PTY LTD",
    },
    {
      AFSNumber: "230172",
      AFSName: "ALLIED FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "230173",
      AFSName: "CREDIT CONNECT CAPITAL LIMITED",
    },
    {
      AFSNumber: "230176",
      AFSName: "JAPHENER PTY LTD",
    },
    {
      AFSNumber: "230184",
      AFSName: "DONEGAL WEALTH PTY LTD",
    },
    {
      AFSNumber: "230208",
      AFSName: "FARM MORTGAGES LTD.",
    },
    {
      AFSNumber: "230212",
      AFSName: "CLARENCE PROPERTY CORPORATION LIMITED",
    },
    {
      AFSNumber: "230219",
      AFSName: "MICORAH PTY LTD",
    },
    {
      AFSNumber: "230222",
      AFSName: "PM CAPITAL LIMITED",
    },
    {
      AFSNumber: "230251",
      AFSName: "YARRA FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "230253",
      AFSName: "WEALTHADVICE.COM.AU PTY. LIMITED",
    },
    {
      AFSNumber: "230286",
      AFSName: "GLOBEX FINANCE PTY LTD",
    },
    {
      AFSNumber: "230323",
      AFSName: "CONSULTUM FINANCIAL ADVISERS PTY LTD",
    },
    {
      AFSNumber: "230325",
      AFSName: "FOSTER WEST SECURITIES PTY LTD",
    },
    {
      AFSNumber: "230329",
      AFSName: "SCENTRE MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "230347",
      AFSName: "MUTUAL LIMITED",
    },
    {
      AFSNumber: "230417",
      AFSName: "LEADERS INVESTMENT MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "230418",
      AFSName: "SELBY WESTHORPE FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "230454",
      AFSName: "FISHER GT FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "230458",
      AFSName: "TOTALLY INTEGRATED FINANCIAL PLANNING PTY. LTD.",
    },
    {
      AFSNumber: "230498",
      AFSName: "INTELLIGENT INSURANCE SERVICES (VIC) PTY. LTD.",
    },
    {
      AFSNumber: "230511",
      AFSName: " BRIGHTER SUPER TRUSTEE",
    },
    {
      AFSNumber: "230522",
      AFSName: "AUSTRALIAN UNITY LIFE BONDS PTY LTD",
    },
    {
      AFSNumber: "230523",
      AFSName: "BLACKROCK INVESTMENT MANAGEMENT (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "230524",
      AFSName: "I.O.O.F. INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "230541",
      AFSName: "INSIGHT INVESTMENT AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "230542",
      AFSName: "SENTINEL FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "230547",
      AFSName: "BANK OF CHINA LIMITED",
    },
    {
      AFSNumber: "230557",
      AFSName: "TFS AUSTRALIA PTY. LIMITED",
    },
    {
      AFSNumber: "230559",
      AFSName: "MAHER DIGBY SECURITIES PTY LTD",
    },
    {
      AFSNumber: "230631",
      AFSName: "NATIONAL AUSTRALIA MANAGERS LIMITED",
    },
    {
      AFSNumber: "230634",
      AFSName: "BALLYGLISHEEN PTY. LTD.",
    },
    {
      AFSNumber: "230635",
      AFSName: "HARPER BERNAYS LIMITED",
    },
    {
      AFSNumber: "230637",
      AFSName: "WILLIAM BUCK WEALTH ADVISORS (SA) PTY LTD",
    },
    {
      AFSNumber: "230650",
      AFSName: "DON HUTTON INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "230673",
      AFSName: "RISK BROKING PTY LTD",
    },
    {
      AFSNumber: "230680",
      AFSName: "NEXTEC CORPORATION PTY LTD",
    },
    {
      AFSNumber: "230683",
      AFSName: "ALLIANCEBERNSTEIN INVESTMENT MANAGEMENT AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "230684",
      AFSName: "CLEARSTREAM AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "230686",
      AFSName: "NATIONAL AUSTRALIA BANK LIMITED",
    },
    {
      AFSNumber: "230687",
      AFSName: "MLC ASSET MANAGEMENT SERVICES LIMITED",
    },
    {
      AFSNumber: "230693",
      AFSName: "JANA INVESTMENT ADVISERS PTY LTD",
    },
    {
      AFSNumber: "230694",
      AFSName: "MLC LIMITED",
    },
    {
      AFSNumber: "230698",
      AFSName: "ALLIANCEBERNSTEIN AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "230703",
      AFSName: "IOOF INVESTMENT SERVICES LTD",
    },
    {
      AFSNumber: "230704",
      AFSName: "WEALTHHUB SECURITIES LIMITED",
    },
    {
      AFSNumber: "230705",
      AFSName: "MLC INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "230706",
      AFSName: "BAJADA & ASSOCIATES PTY LTD",
    },
    {
      AFSNumber: "230747",
      AFSName: "WINDSOR MANAGEMENT INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "230749",
      AFSName:
        "AUSTRALIAN LEISURE AND ENTERTAINMENT PROPERTY MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "230765",
      AFSName: "DCB NOMINEES PTY LTD",
    },
    {
      AFSNumber: "230772",
      AFSName: "TRADITIONAL VALUES MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "230778",
      AFSName: "TRITON BROKING SERVICES (WA) PTY LTD",
    },
    {
      AFSNumber: "230846",
      AFSName: "TAG ASSET CONSULTING GROUP PTY LTD",
    },
    {
      AFSNumber: "230859",
      AFSName: "AAI LIMITED",
    },
    {
      AFSNumber: "230867",
      AFSName: "CENTURIA LIFE LIMITED",
    },
    {
      AFSNumber: "230914",
      AFSName: "SPORTSCOVER AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "230917",
      AFSName: "FUSION SPECIALTY MGA SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "230920",
      AFSName: "THETA ASSET MANAGEMENT LTD",
    },
    {
      AFSNumber: "230975",
      AFSName: "NETWEALTH INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "231087",
      AFSName: "UBS AG",
    },
    {
      AFSNumber: "231088",
      AFSName: "UBS NOMINEES PTY LTD",
    },
    {
      AFSNumber: "231091",
      AFSName: "BELL ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "231093",
      AFSName: "IFFINITY PTY LTD",
    },
    {
      AFSNumber: "231098",
      AFSName: "UBS SECURITIES AUSTRALIA LTD",
    },
    {
      AFSNumber: "231101",
      AFSName: "FIDUCIAN PORTFOLIO SERVICES LIMITED",
    },
    {
      AFSNumber: "231103",
      AFSName: "FIDUCIAN FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "231104",
      AFSName: "SPECIALIST UNDERWRITING AGENCIES PTY LTD",
    },
    {
      AFSNumber: "231109",
      AFSName: "AIA FINANCIAL SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "231110",
      AFSName: "FIRE & GENERAL INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "231115",
      AFSName: "BROOKFIELD AUSTRALIA FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "231127",
      AFSName: "LGT CRESTONE WEALTH MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "231138",
      AFSName: "FINANCIAL WISDOM LIMITED",
    },
    {
      AFSNumber: "231139",
      AFSName: "COMMONWEALTH FINANCIAL PLANNING LIMITED",
    },
    {
      AFSNumber: "231140",
      AFSName: "MASU FINANCIAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "231141",
      AFSName: "BROOKFIELD FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "231145",
      AFSName: "MORAN INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "231146",
      AFSName: "DELANEY KELLY GOLDING PTY LIMITED",
    },
    {
      AFSNumber: "231149",
      AFSName: "CENTURIA PROPERTY FUNDS LIMITED",
    },
    {
      AFSNumber: "231155",
      AFSName: "FLINDERS FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "231160",
      AFSName: "MCCLUSKEY INSURANCE BROKERS PTY LIMITED",
    },
    {
      AFSNumber: "231175",
      AFSName: "GEMI ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "231181",
      AFSName: "TACTICAL GLOBAL MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "231182",
      AFSName: "PAUL DONNELLY INSURANCE BROKERS PTY LIMITED",
    },
    {
      AFSNumber: "231183",
      AFSName: "COMMERCIAL & GENERAL INSURANCE BROKERS (AUST) PTY LTD",
    },
    {
      AFSNumber: "231203",
      AFSName: "IBL LIMITED",
    },
    {
      AFSNumber: "231204",
      AFSName: "COMMUNITY FIRST CREDIT UNION LIMITED",
    },
    {
      AFSNumber: "231208",
      AFSName: "FOLEY WILSON & CO. PTY. LTD.",
    },
    {
      AFSNumber: "231214",
      AFSName: "SUMNER HALL ASSOCIATES PTY LTD",
    },
    {
      AFSNumber: "231222",
      AFSName: "RAC INSURANCE PTY LIMITED",
    },
    {
      AFSNumber: "231240",
      AFSName: "MIZUHO BANK  LTD.",
    },
    {
      AFSNumber: "231247",
      AFSName: "PAUL MELLING & ASSOCIATES PTY. LIMITED",
    },
    {
      AFSNumber: "231297",
      AFSName: "NEWEALTH PTY LTD",
    },
    {
      AFSNumber: "231311",
      AFSName: "STATEWIDE INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "232374",
      AFSName: "FORMAN FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "232446",
      AFSName: "PSC RELIANCE PTY LTD",
    },
    {
      AFSNumber: "232459",
      AFSName: "PARADIGM WEALTH ADVISORS PTY LTD",
    },
    {
      AFSNumber: "232468",
      AFSName: "COLONIAL FIRST STATE INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "232479",
      AFSName: "ANGAS SECURITIES LIMITED",
    },
    {
      AFSNumber: "232496",
      AFSName: "DEXUS CAPITAL INVESTMENT SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "232497",
      AFSName: "DEXUS CAPITAL INVESTORS LIMITED",
    },
    {
      AFSNumber: "232500",
      AFSName: "HTFS NOMINEES PTY LTD",
    },
    {
      AFSNumber: "232507",
      AFSName: "ZURICH AUSTRALIAN INSURANCE LIMITED",
    },
    {
      AFSNumber: "232510",
      AFSName: "ZURICH AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "232511",
      AFSName: "ZURICH INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "232514",
      AFSName: "INDUSTRY FUND SERVICES LIMITED",
    },
    {
      AFSNumber: "232525",
      AFSName: "ALLIANZ SOUTH AUSTRALIA INSURANCE LIMITED",
    },
    {
      AFSNumber: "232591",
      AFSName: "WHITTLE & SKOK FINANCIAL SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "232595",
      AFSName: "HSBC BANK AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "232602",
      AFSName: "CAMBRIDGE INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "232703",
      AFSName: "ARETE RISK & INSURANCE PARTNERS PTY LTD",
    },
    {
      AFSNumber: "232705",
      AFSName: "HILLROSS FINANCIAL SERVICES LIMITED",
    },
    {
      AFSNumber: "232706",
      AFSName: "AKUMIN FINANCIAL PLANNING PTY LIMITED",
    },
    {
      AFSNumber: "232747",
      AFSName: "MAB FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "232977",
      AFSName: "FMD ADVISORY SERVICES PTY LTD",
    },
    {
      AFSNumber: "232984",
      AFSName: "STEPHEN GOOD CAPITAL PTY LTD",
    },
    {
      AFSNumber: "232987",
      AFSName: "MCLARDY MCSHANE PARTNERS PTY LTD",
    },
    {
      AFSNumber: "233013",
      AFSName: "GDA SECURITIES LTD",
    },
    {
      AFSNumber: "233045",
      AFSName: "FUNDHOST LIMITED",
    },
    {
      AFSNumber: "233081",
      AFSName: "PRINCIPLED MORTGAGE INVESTMENTS LTD",
    },
    {
      AFSNumber: "233082",
      AFSName: "RACQ INSURANCE LIMITED",
    },
    {
      AFSNumber: "233116",
      AFSName: "AAPC MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "233121",
      AFSName: "MIRVAC FUNDS LIMITED",
    },
    {
      AFSNumber: "233154",
      AFSName: "NGS SUPER PTY LIMITED",
    },
    {
      AFSNumber: "233189",
      AFSName: "GLOBAL CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "233209",
      AFSName: "MODORAS PTY LTD",
    },
    {
      AFSNumber: "233214",
      AFSName: "RFC AMBRIAN LTD",
    },
    {
      AFSNumber: "233671",
      AFSName: "RESOLUTION LIFE AUSTRALASIA LIMITED",
    },
    {
      AFSNumber: "233680",
      AFSName: "AXIS FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "233713",
      AFSName: "GROVE SECURITIES PTY LTD",
    },
    {
      AFSNumber: "233714",
      AFSName: "WESTPAC BANKING CORPORATION",
    },
    {
      AFSNumber: "233715",
      AFSName: "BT PORTFOLIO SERVICES LTD",
    },
    {
      AFSNumber: "233716",
      AFSName: "WESTPAC FINANCIAL SERVICES LIMITED",
    },
    {
      AFSNumber: "233720",
      AFSName: "BT FUNDS MANAGEMENT NO. 2 LIMITED",
    },
    {
      AFSNumber: "233722",
      AFSName: "BT SECURITIES LTD",
    },
    {
      AFSNumber: "233723",
      AFSName: "WESTPAC SECURITIES LIMITED",
    },
    {
      AFSNumber: "233724",
      AFSName: "BT FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "233727",
      AFSName: "GIS PRIVATE NOMINEES PTY LIMITED",
    },
    {
      AFSNumber: "233728",
      AFSName: "TAL LIFE INSURANCE SERVICES LIMITED",
    },
    {
      AFSNumber: "233741",
      AFSName: "MORGAN STANLEY AUSTRALIA SECURITIES LIMITED",
    },
    {
      AFSNumber: "233742",
      AFSName: "MORGAN STANLEY AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "233743",
      AFSName: "ARNOTT CAPITAL PTY LTD",
    },
    {
      AFSNumber: "233750",
      AFSName: "COMMUNITY BROKER NETWORK PTY LTD",
    },
    {
      AFSNumber: "233760",
      AFSName: "FINANCIAL ACUITY LIMITED",
    },
    {
      AFSNumber: "233761",
      AFSName: "MANAGED PORTFOLIO SERVICES LIMITED",
    },
    {
      AFSNumber: "233763",
      AFSName: "CARNBREA & CO. LTD.",
    },
    {
      AFSNumber: "233765",
      AFSName: "WILLIS TEMBY INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "233769",
      AFSName: "NADIC INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "233781",
      AFSName: "VICTORIAN OLIVE OIL PROJECT LIMITED",
    },
    {
      AFSNumber: "233784",
      AFSName: "F.D. BECK AND SONS PTY. LTD.",
    },
    {
      AFSNumber: "233788",
      AFSName: "AUSTRALIANSUPER PTY LTD",
    },
    {
      AFSNumber: "233789",
      AFSName: "LOGAN INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "233791",
      AFSName: "GUILD INSURANCE LIMITED",
    },
    {
      AFSNumber: "233792",
      AFSName: "UNITED SUPER PTY LTD",
    },
    {
      AFSNumber: "233798",
      AFSName: "WEATHER RISK MANAGEMENT SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "233808",
      AFSName: "LETS MAKE MONEY PTY LTD.",
    },
    {
      AFSNumber: "233817",
      AFSName: "NATIONAL CREDIT INSURANCE (BROKERS) PTY. LTD.",
    },
    {
      AFSNumber: "234421",
      AFSName: "PSC MEDICAL & GENERAL INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "234426",
      AFSName: "PERPETUAL INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "234437",
      AFSName: "SGUAS PTY LTD",
    },
    {
      AFSNumber: "234454",
      AFSName: "AUSTRALIAN UNITY FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "234455",
      AFSName: "ASA FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "234457",
      AFSName: "AB PHILLIPS PTY LTD",
    },
    {
      AFSNumber: "234459",
      AFSName: "PERSONAL FINANCIAL SERVICES LTD",
    },
    {
      AFSNumber: "234483",
      AFSName: "ANTARES CAPITAL PARTNERS LTD",
    },
    {
      AFSNumber: "234500",
      AFSName: "GRANT THORNTON WEALTH ADVISORY SERVICES PTY LTD",
    },
    {
      AFSNumber: "234502",
      AFSName: "AWIB PTY. LTD.",
    },
    {
      AFSNumber: "234517",
      AFSName: "AMP BANK LIMITED",
    },
    {
      AFSNumber: "234521",
      AFSName: "BROOKVALE INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "234525",
      AFSName: "INVESTMENT PROFESSIONALS PTY LTD",
    },
    {
      AFSNumber: "234526",
      AFSName: "HOLDFAST INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "234527",
      AFSName: "AUSTRALIA AND NEW ZEALAND BANKING GROUP LIMITED",
    },
    {
      AFSNumber: "234528",
      AFSName: "EQUITY TRUSTEES WEALTH SERVICES LIMITED",
    },
    {
      AFSNumber: "234530",
      AFSName: "MENROC PTY. LTD.",
    },
    {
      AFSNumber: "234533",
      AFSName: "BLACKBURN (INSURANCE BROKERS) PTY LTD",
    },
    {
      AFSNumber: "234536",
      AFSName: "RAILWAYS CREDIT UNION LIMITED",
    },
    {
      AFSNumber: "234543",
      AFSName: "POOLEDFUNDS PTY LTD",
    },
    {
      AFSNumber: "234555",
      AFSName: "INTEGRITAS FIDUCIARY PTY LTD",
    },
    {
      AFSNumber: "234557",
      AFSName: "ING BANK N.V.",
    },
    {
      AFSNumber: "234561",
      AFSName: "MUFG BANK  LTD.",
    },
    {
      AFSNumber: "234563",
      AFSName: "ARAB BANK AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "234579",
      AFSName: "ICAP FUTURES (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "234582",
      AFSName: "DEFENCE BANK LIMITED",
    },
    {
      AFSNumber: "234588",
      AFSName: "SELECT INSURANCE BROKERS PTY. LTD",
    },
    {
      AFSNumber: "234590",
      AFSName: "MUTUAL TRUST PTY LTD",
    },
    {
      AFSNumber: "234593",
      AFSName: "ICAP BROKERS PTY LIMITED",
    },
    {
      AFSNumber: "234599",
      AFSName: "UTILITIES OF AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "234624",
      AFSName: "INSURANCE ADVISORY SERVICE (N S W) PTY LTD",
    },
    {
      AFSNumber: "234630",
      AFSName: "TPT WEALTH LTD",
    },
    {
      AFSNumber: "234647",
      AFSName: "DESMOND INSURANCE BROKERS PTY LIMITED",
    },
    {
      AFSNumber: "234652",
      AFSName: "NATIONAL MUTUAL FUNDS MANAGEMENT LTD.",
    },
    {
      AFSNumber: "234653",
      AFSName: "NMMT LIMITED",
    },
    {
      AFSNumber: "234654",
      AFSName: "N. M. SUPERANNUATION PROPRIETARY LIMITED",
    },
    {
      AFSNumber: "234655",
      AFSName: "IPAC ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "234656",
      AFSName: "PSK ADVISORY SERVICES PTY LTD",
    },
    {
      AFSNumber: "234665",
      AFSName: "CHARTER FINANCIAL PLANNING LIMITED",
    },
    {
      AFSNumber: "234666",
      AFSName: "CANACCORD GENUITY (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "234668",
      AFSName: "FIDANTE PARTNERS LIMITED",
    },
    {
      AFSNumber: "234670",
      AFSName: "CHALLENGER LIFE COMPANY LIMITED",
    },
    {
      AFSNumber: "234678",
      AFSName: "CHALLENGER INVESTMENT PARTNERS LIMITED",
    },
    {
      AFSNumber: "234689",
      AFSName: "ICE DATA SERVICES AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "234700",
      AFSName: "RABOBANK AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "234701",
      AFSName: "PAS PERSONNEL (NSW) PTY. LIMITED",
    },
    {
      AFSNumber: "234704",
      AFSName: "DARRYL J ELSLEY INSURANCE NOMINEES PTY LTD",
    },
    {
      AFSNumber: "234708",
      AFSName: "ALLIANZ AUSTRALIA INSURANCE LIMITED",
    },
    {
      AFSNumber: "234715",
      AFSName: "COMPUTERSHARE CLEARING PTY LIMITED",
    },
    {
      AFSNumber: "234721",
      AFSName: "RUBICON FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "234722",
      AFSName: "STRATA SOLUTIONS INTERNATIONAL PTY LTD",
    },
    {
      AFSNumber: "234763",
      AFSName: "ASCENT FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "234939",
      AFSName: "M & R INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "234941",
      AFSName: "MILLMERRAN POWER MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "234942",
      AFSName: "GENUITY SERVICES PTY LTD",
    },
    {
      AFSNumber: "234943",
      AFSName: "IG POWER MARKETING PTY LTD",
    },
    {
      AFSNumber: "234945",
      AFSName: "COMMONWEALTH BANK OF AUSTRALIA",
    },
    {
      AFSNumber: "234951",
      AFSName: "PROFESSIONAL INVESTMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "234971",
      AFSName: "WEBSTER DOLILTA FINANCE LTD",
    },
    {
      AFSNumber: "234972",
      AFSName: "LIPMAN BURGON AND PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "235017",
      AFSName: "METROPOLIS PTY. LTD.",
    },
    {
      AFSNumber: "235022",
      AFSName: "NORTHERN INLAND CREDIT UNION LIMITED",
    },
    {
      AFSNumber: "235030",
      AFSName: "HOLLARD INSURANCE PARTNERS LIMITED",
    },
    {
      AFSNumber: "235070",
      AFSName: "BARCLAY WELLS LTD",
    },
    {
      AFSNumber: "235096",
      AFSName: "MWL FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "235126",
      AFSName: "BNY TRUST (AUSTRALIA) REGISTRY LIMITED",
    },
    {
      AFSNumber: "235128",
      AFSName: "THE TRUST COMPANY (PTAL) LIMITED",
    },
    {
      AFSNumber: "235129",
      AFSName: "PERMANENT CUSTODIANS LIMITED",
    },
    {
      AFSNumber: "235130",
      AFSName: "BREEZE UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "235131",
      AFSName: "CANTERBURY HILL ADVISORY PTY LTD",
    },
    {
      AFSNumber: "235132",
      AFSName: "MERRILL LYNCH EQUITIES (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "235140",
      AFSName: "THE TRUST COMPANY (NOMINEES) LIMITED",
    },
    {
      AFSNumber: "235143",
      AFSName: "MERRILL LYNCH (AUSTRALIA) FUTURES LIMITED",
    },
    {
      AFSNumber: "235145",
      AFSName: "THE TRUST COMPANY (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "235148",
      AFSName: "THE TRUST COMPANY LIMITED",
    },
    {
      AFSNumber: "235150",
      AFSName: "THE TRUST COMPANY (RE SERVICES) LIMITED",
    },
    {
      AFSNumber: "235152",
      AFSName: "MERRILL LYNCH (AUSTRALIA) NOMINEES PTY. LIMITED",
    },
    {
      AFSNumber: "235153",
      AFSName: "DIVERSA TRUSTEES LIMITED",
    },
    {
      AFSNumber: "235170",
      AFSName: "THE TRUST COMPANY (UTCCL) LIMITED",
    },
    {
      AFSNumber: "235231",
      AFSName: "ARCHER CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "235249",
      AFSName: "H.E.S.T. AUSTRALIA LTD.",
    },
    {
      AFSNumber: "235259",
      AFSName: "HUNTER GREEN INSTITUTIONAL BROKING PTY LTD",
    },
    {
      AFSNumber: "235269",
      AFSName: "PRIME MORTGAGE GROUP LTD.",
    },
    {
      AFSNumber: "235311",
      AFSName: "ROXBURGH SECURITIES PTY LTD",
    },
    {
      AFSNumber: "235312",
      AFSName: "AMACIS PTY LTD",
    },
    {
      AFSNumber: "235322",
      AFSName: "PILGRIM PRIVATE PTY LTD",
    },
    {
      AFSNumber: "235362",
      AFSName: "AKELA  VENTURES PTY LTD",
    },
    {
      AFSNumber: "235364",
      AFSName: "EQ FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "235365",
      AFSName: "QIB SPECIALTY PTY LTD",
    },
    {
      AFSNumber: "235366",
      AFSName: "BERKREY INSURANCE CONSULTANTS PTY. LIMITED",
    },
    {
      AFSNumber: "235381",
      AFSName: "MAKO TRADING AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "235384",
      AFSName: "VICINITY FUNDS RE LTD",
    },
    {
      AFSNumber: "235407",
      AFSName: "MORGANS CORPORATE LIMITED",
    },
    {
      AFSNumber: "235408",
      AFSName: "MORGANS FINANCIAL PLANNING PTY LIMITED",
    },
    {
      AFSNumber: "235409",
      AFSName: "ARCURI & ASSOCIATES PTY. LTD.",
    },
    {
      AFSNumber: "235410",
      AFSName: "MORGANS FINANCIAL LIMITED",
    },
    {
      AFSNumber: "235411",
      AFSName: "JUA UNDERWRITING AGENCY PTY LTD",
    },
    {
      AFSNumber: "235415",
      AFSName: "CATHOLIC CHURCH INSURANCE LIMITED",
    },
    {
      AFSNumber: "235656",
      AFSName: "BAILEY ROBERTS GROUP PTY. LIMITED",
    },
    {
      AFSNumber: "235662",
      AFSName: "PODIUM CONNECT PTY LTD",
    },
    {
      AFSNumber: "235666",
      AFSName: "HOWDEN EQUINE PTY LTD",
    },
    {
      AFSNumber: "235756",
      AFSName: "MANDURAH INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "235906",
      AFSName: "MERCER SUPERANNUATION (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "235907",
      AFSName: "UNISUPER MANAGEMENT PTY. LTD.",
    },
    {
      AFSNumber: "235915",
      AFSName: "MCEWEN INVESTMENT SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "236048",
      AFSName: "SHAW AND PARTNERS LIMITED",
    },
    {
      AFSNumber: "236049",
      AFSName: "TOWERS WATSON SUPERANNUATION PTY LTD",
    },
    {
      AFSNumber: "236463",
      AFSName: "CARTWRIGHT INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "236465",
      AFSName: "NULIS NOMINEES (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "236466",
      AFSName: "NAVIGATOR AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "236476",
      AFSName: "AUSTRALIAN MUTUAL BANK LTD",
    },
    {
      AFSNumber: "236509",
      AFSName: "FIRST OPTION BANK LTD",
    },
    {
      AFSNumber: "236523",
      AFSName: "INFOCUS SECURITIES AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "236551",
      AFSName: "PERKS PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "236556",
      AFSName: "SHINEWING AUSTRALIA WEALTH PTY LTD",
    },
    {
      AFSNumber: "236608",
      AFSName: "VINCENTS CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "236643",
      AFSName: "PERPETUAL TRUSTEE COMPANY LIMITED",
    },
    {
      AFSNumber: "236648",
      AFSName: "PERPETUAL TRUST SERVICES LIMITED",
    },
    {
      AFSNumber: "236650",
      AFSName: "AXIS UNDERWRITING SERVICES PTY LTD",
    },
    {
      AFSNumber: "236653",
      AFSName: "ONE UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "236656",
      AFSName: "GMO AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "236657",
      AFSName: "AEGON INSIGHTS AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "236663",
      AFSName: "THE PROPLAB GROUP PTY LTD",
    },
    {
      AFSNumber: "236665",
      AFSName: "FUTURITY INVESTMENT GROUP LIMITED",
    },
    {
      AFSNumber: "236677",
      AFSName: "BAILESTI PTY LTD",
    },
    {
      AFSNumber: "236709",
      AFSName: "TELSTRA SUPER PTY LTD",
    },
    {
      AFSNumber: "236739",
      AFSName: "SHORTLAND INSURANCE BROKERS PTY LIMITED",
    },
    {
      AFSNumber: "236776",
      AFSName: "AUSTRALIAN PRIVATE CAPITAL ADVISORY SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "236781",
      AFSName: "WILSHIRE GLOBAL ADVISORS LIMITED",
    },
    {
      AFSNumber: "236783",
      AFSName: "FABAL ADVISORY PTY LTD",
    },
    {
      AFSNumber: "236784",
      AFSName: "IAN JONES INSURANCE BROKERS PTY LIMITED",
    },
    {
      AFSNumber: "236806",
      AFSName: "HCF LIFE INSURANCE COMPANY PTY LTD",
    },
    {
      AFSNumber: "236855",
      AFSName: "DIRECT ADVISERS PTY LTD.",
    },
    {
      AFSNumber: "236870",
      AFSName: "B & E LTD",
    },
    {
      AFSNumber: "236880",
      AFSName: "AMT MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "236915",
      AFSName: "BAYSIDE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "236916",
      AFSName: "CLUB MARINE LIMITED",
    },
    {
      AFSNumber: "237058",
      AFSName: "AD ADVISORY SERVICES PTY LTD",
    },
    {
      AFSNumber: "237062",
      AFSName: "EQUITY WEST SECURITIES PTY LTD",
    },
    {
      AFSNumber: "237117",
      AFSName: "AUSTBROKERS SPT PTY LTD",
    },
    {
      AFSNumber: "237121",
      AFSName: "ORD MINNETT LIMITED",
    },
    {
      AFSNumber: "237123",
      AFSName: "ORD MINNETT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "237186",
      AFSName: "AUSTRALIAN FINANCIAL RISK MANAGEMENT PTY. LTD.",
    },
    {
      AFSNumber: "237188",
      AFSName: "BRIGDENS FINANCIAL SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "237235",
      AFSName: "BALDRY FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "237236",
      AFSName: "SOUTHERN CROSS UNDERWRITING PTY. LIMITED",
    },
    {
      AFSNumber: "237244",
      AFSName: "ALPHA TRADE PTY LTD",
    },
    {
      AFSNumber: "237246",
      AFSName: "NTI LIMITED",
    },
    {
      AFSNumber: "237257",
      AFSName: "HMC FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "237267",
      AFSName: "HALO UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "237268",
      AFSName: "SLE WORLDWIDE AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "237269",
      AFSName: "DRIESSEN INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "237270",
      AFSName: "PACIFIC UNDERWRITING CORPORATION PTY LTD",
    },
    {
      AFSNumber: "237271",
      AFSName: "PRIMACY UNDERWRITING MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "237296",
      AFSName: "MAPLE-BROWN ABBOTT LTD",
    },
    {
      AFSNumber: "237314",
      AFSName: "LORICA PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "237359",
      AFSName: "SCHNEIDER ELECTRIC SUSTAINABILITY BUSINESS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "237360",
      AFSName: "TRIDENT INSURANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "237391",
      AFSName: "IMB LTD",
    },
    {
      AFSNumber: "237400",
      AFSName: "ANCHORAGE MARINE UNDERWRITING AGENCY PTY LTD",
    },
    {
      AFSNumber: "237401",
      AFSName: "HATTE GILBERT INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "237402",
      AFSName: "ARMADA UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "237439",
      AFSName: "FINANCIAL FOUNDATIONS AUSTRALIA PTY. LTD.",
    },
    {
      AFSNumber: "237466",
      AFSName: "WESTMINSTER COVERFORCE PTY LTD",
    },
    {
      AFSNumber: "237489",
      AFSName: "BOND STREET CUSTODIANS LIMITED",
    },
    {
      AFSNumber: "237491",
      AFSName: "CITY RURAL INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "237492",
      AFSName: "MACQUARIE INVESTMENT MANAGEMENT LTD",
    },
    {
      AFSNumber: "237495",
      AFSName: "MACQUARIE INVESTMENT SERVICES LIMITED",
    },
    {
      AFSNumber: "237496",
      AFSName: "DUNROSS FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "237500",
      AFSName: "DEXUS ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "237502",
      AFSName: "MACQUARIE BANK LIMITED",
    },
    {
      AFSNumber: "237504",
      AFSName: "MACQUARIE EQUITIES LIMITED",
    },
    {
      AFSNumber: "237505",
      AFSName: "MACQUARIE PRISM PTY LIMITED",
    },
    {
      AFSNumber: "237510",
      AFSName: "ASHE MORGAN FUNDS MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "237515",
      AFSName: "FIRE SERVICE CREDIT UNION LIMITED",
    },
    {
      AFSNumber: "237516",
      AFSName: "INFRASTRUCTURE SPECIALIST ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "237518",
      AFSName: "FORESIGHT AUSTRALIA FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "237531",
      AFSName: "ANZ SECURITIES LIMITED",
    },
    {
      AFSNumber: "237549",
      AFSName: "PENDRAGON CAPITAL LIMITED",
    },
    {
      AFSNumber: "237556",
      AFSName: "IRONBRIDGE CAPITAL MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "237561",
      AFSName: "GROUP FINANCIAL ADVISING PTY LTD",
    },
    {
      AFSNumber: "237563",
      AFSName: "YARRA CAPITAL MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "237572",
      AFSName: "THE INSURANCE CENTRE PTY LTD",
    },
    {
      AFSNumber: "237585",
      AFSName: "OVERSEA-CHINESE BANKING CORPORATION LIMITED",
    },
    {
      AFSNumber: "237588",
      AFSName: "LASALLE FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "237627",
      AFSName: "INSTITUTIONAL SECURITISATION SERVICES LIMITED",
    },
    {
      AFSNumber: "237628",
      AFSName: "LEXDEN FINANCIAL SERVICES LTD",
    },
    {
      AFSNumber: "237633",
      AFSName: "INSURANCE LOGIC PTY. LIMITED",
    },
    {
      AFSNumber: "237662",
      AFSName: "ORIGIN SECURITIES PTY LIMITED",
    },
    {
      AFSNumber: "237663",
      AFSName: "WYUNA PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "237757",
      AFSName: "ELDERS RURAL SERVICES AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "237822",
      AFSName: "PNOINSURANCE PTY LTD",
    },
    {
      AFSNumber: "237824",
      AFSName: "TRAINER CONNECTIONS PTY LIMITED",
    },
    {
      AFSNumber: "237826",
      AFSName: "ANSVAR INSURANCE LIMITED",
    },
    {
      AFSNumber: "237827",
      AFSName: "SCOTT & BROAD PTY LTD",
    },
    {
      AFSNumber: "237842",
      AFSName: "FINANCE & INSURANCE (BROKERS) AUSTRALIA PTY. LTD.",
    },
    {
      AFSNumber: "237843",
      AFSName: "MACQUARIE INVESTMENT MANAGEMENT GLOBAL LIMITED",
    },
    {
      AFSNumber: "237847",
      AFSName: "MACQUARIE FINANCIAL PRODUCTS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "237848",
      AFSName: "TAL LIFE LIMITED",
    },
    {
      AFSNumber: "237854",
      AFSName: "TAL AUSTRALIA DISTRIBUTION LIMITED",
    },
    {
      AFSNumber: "237855",
      AFSName: "ASTER UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "237856",
      AFSName: "BEYOND BANK AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "237858",
      AFSName: "PEREGRINE CORPORATE LIMITED",
    },
    {
      AFSNumber: "237860",
      AFSName: "BUSS (QUEENSLAND) PTY LTD",
    },
    {
      AFSNumber: "237861",
      AFSName: "PRIVATE MORTGAGE FUNDING & MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "237862",
      AFSName: "ORBIS INVESTMENT ADVISORY PTY LIMITED",
    },
    {
      AFSNumber: "237863",
      AFSName: "MACQUARIE SECURITISATION LIMITED",
    },
    {
      AFSNumber: "237865",
      AFSName: "FIL INVESTMENT MANAGEMENT (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "237874",
      AFSName: "PLAN 2 PTY LTD",
    },
    {
      AFSNumber: "237879",
      AFSName: "BENDIGO AND ADELAIDE BANK LIMITED",
    },
    {
      AFSNumber: "237880",
      AFSName: "STERLING INSURANCE PTY LIMITED",
    },
    {
      AFSNumber: "237898",
      AFSName: "BENDIGO FINANCIAL PLANNING LIMITED",
    },
    {
      AFSNumber: "237905",
      AFSName: "SUPER TRUSTEES AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "237906",
      AFSName: "SANDHURST TRUSTEES LIMITED",
    },
    {
      AFSNumber: "237936",
      AFSName: "IAN BELL INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "237946",
      AFSName: "CREDIT AGRICOLE CIB AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "237971",
      AFSName: "SMITH COFFEY SECURITIES PTY LTD",
    },
    {
      AFSNumber: "237972",
      AFSName: "SMITH COFFEY PTY LTD",
    },
    {
      AFSNumber: "237973",
      AFSName: "ASCEND INSURANCE ADVICE NETWORK PTY LTD",
    },
    {
      AFSNumber: "237985",
      AFSName: "RIVER CAPITAL PTY LTD",
    },
    {
      AFSNumber: "237988",
      AFSName: "AUSTRALIAN MILITARY BANK LTD",
    },
    {
      AFSNumber: "237989",
      AFSName: "LIFEPLAN AUSTRALIA FRIENDLY SOCIETY LIMITED",
    },
    {
      AFSNumber: "237993",
      AFSName: "BERRY ACTUARIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "237994",
      AFSName: "AUSTRALIAN UNITY BANK LIMITED",
    },
    {
      AFSNumber: "238020",
      AFSName: "THE BROKEN HILL COMMUNITY CREDIT UNION LTD",
    },
    {
      AFSNumber: "238023",
      AFSName: "H & L LEWIS PTY LTD",
    },
    {
      AFSNumber: "238037",
      AFSName: "STATE TRUSTEES LIMITED",
    },
    {
      AFSNumber: "238039",
      AFSName: "SAGE ADVISERS PTY LTD",
    },
    {
      AFSNumber: "238043",
      AFSName: "BNP PARIBAS",
    },
    {
      AFSNumber: "238050",
      AFSName: "GOODMAN, SYDNEY TREVOR",
    },
    {
      AFSNumber: "238052",
      AFSName: "CROMWELL PROPERTY SECURITIES LIMITED",
    },
    {
      AFSNumber: "238054",
      AFSName: "CMC MARKETS ASIA PACIFIC PTY LTD",
    },
    {
      AFSNumber: "238060",
      AFSName: "SBA FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "238064",
      AFSName: "PERITUS PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "238066",
      AFSName: "J.P. MORGAN SECURITIES AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "238069",
      AFSName: "COMMONWEALTH SUPERANNUATION CORPORATION",
    },
    {
      AFSNumber: "238073",
      AFSName: "MDA NATIONAL INSURANCE PTY LTD",
    },
    {
      AFSNumber: "238093",
      AFSName: "DFA AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "238096",
      AFSName: "METLIFE INSURANCE LIMITED",
    },
    {
      AFSNumber: "238098",
      AFSName: "CITIGROUP PTY LIMITED",
    },
    {
      AFSNumber: "238127",
      AFSName: "R. & M. STANTON PTY. LTD.",
    },
    {
      AFSNumber: "238128",
      AFSName: "SAPIEN CAPITAL PARTNERS LIMITED",
    },
    {
      AFSNumber: "238135",
      AFSName: "CFSG PTY LTD",
    },
    {
      AFSNumber: "238139",
      AFSName: "MAITLAND MUTUAL LIMITED",
    },
    {
      AFSNumber: "238151",
      AFSName: "FLEETSURE PTY LTD",
    },
    {
      AFSNumber: "238152",
      AFSName: "IOOF INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "238153",
      AFSName: "DEUTSCHE BANK AKTIENGESELLSCHAFT",
    },
    {
      AFSNumber: "238154",
      AFSName: "PEACHEYS INVESTMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "238155",
      AFSName: "COMBINED COMMUNICATIONS NETWORK PTY LTD",
    },
    {
      AFSNumber: "238157",
      AFSName: "DEUTSCHE AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "238161",
      AFSName: "DEUTSCHE CAPITAL MARKETS AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "238163",
      AFSName: "DEXUS FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "238164",
      AFSName: "BELIKE NOMINEES PTY. LIMITED",
    },
    {
      AFSNumber: "238166",
      AFSName: "DEXUS WHOLESALE PROPERTY LIMITED",
    },
    {
      AFSNumber: "238167",
      AFSName: "ERNST & YOUNG ABC PTY LIMITED",
    },
    {
      AFSNumber: "238168",
      AFSName: "NOVUS CAPITAL LIMITED",
    },
    {
      AFSNumber: "238177",
      AFSName: "GALLAGHER RISK PLACEMENTS PTY LTD",
    },
    {
      AFSNumber: "238179",
      AFSName: "SUSSMAN FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "238184",
      AFSName: "TRUE OAK INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "238189",
      AFSName: "GABCUS INVESTMENT PTY LTD",
    },
    {
      AFSNumber: "238191",
      AFSName: "TUCKER MCNEIL PTY LIMITED",
    },
    {
      AFSNumber: "238198",
      AFSName: "WICKLOW FUND SERVICES PTY LTD",
    },
    {
      AFSNumber: "238211",
      AFSName: "REX SILVER INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "238244",
      AFSName: "FINDEX FINANCIAL ADVICE PTY LTD",
    },
    {
      AFSNumber: "238256",
      AFSName: "MATRIX PLANNING SOLUTIONS LIMITED",
    },
    {
      AFSNumber: "238261",
      AFSName: "ACCIDENT & HEALTH INTERNATIONAL UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "238262",
      AFSName: "ORIGIN ENERGY ELECTRICITY LIMITED",
    },
    {
      AFSNumber: "238268",
      AFSName: "ANZ STAFF SUPERANNUATION (AUSTRALIA) PTY. LIMITED",
    },
    {
      AFSNumber: "238271",
      AFSName: "QUAY MARINE HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "238272",
      AFSName: "ANDOVER CORPORATE FINANCE PTY LIMITED",
    },
    {
      AFSNumber: "238273",
      AFSName: "NEWCASTLE GREATER MUTUAL GROUP LTD",
    },
    {
      AFSNumber: "238274",
      AFSName: "QINVEST LIMITED",
    },
    {
      AFSNumber: "238276",
      AFSName: "STATE STREET GLOBAL ADVISORS  AUSTRALIA  LIMITED",
    },
    {
      AFSNumber: "238278",
      AFSName: "C.N. BOTTING & ASSOCIATES (BROKING) PTY. LTD.",
    },
    {
      AFSNumber: "238279",
      AFSName: "ERIC INSURANCE LIMITED",
    },
    {
      AFSNumber: "238280",
      AFSName: "BDO PRIVATE WEALTH ADVISERS PTY LTD",
    },
    {
      AFSNumber: "238281",
      AFSName: "GUARDIAN ASSOCIATES PTY LTD",
    },
    {
      AFSNumber: "238282",
      AFSName: "RSM FINANCIAL SERVICES AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "238293",
      AFSName: "GATEWAY BANK LTD",
    },
    {
      AFSNumber: "238305",
      AFSName: "QUDOS MUTUAL LTD",
    },
    {
      AFSNumber: "238311",
      AFSName: "UNITY BANK LIMITED",
    },
    {
      AFSNumber: "238312",
      AFSName: "ARTHUR J. GALLAGHER & CO (AUS) LIMITED",
    },
    {
      AFSNumber: "238314",
      AFSName: "MUTUAL CAPITAL LTD",
    },
    {
      AFSNumber: "238317",
      AFSName: "CREDIT UNION AUSTRALIA LTD",
    },
    {
      AFSNumber: "238321",
      AFSName: "MACQUARIE INVESTMENT MANAGEMENT AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "238326",
      AFSName: "GARNAUT PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "238334",
      AFSName: "RICHARD OLIVER UNDERWRITING MANAGERS PTY. LTD.",
    },
    {
      AFSNumber: "238335",
      AFSName: "CREDICORP INSURANCE PTY. LTD.",
    },
    {
      AFSNumber: "238337",
      AFSName: "FINANCIAL FORCE PTY LTD",
    },
    {
      AFSNumber: "238340",
      AFSName: "STATE BANK OF INDIA",
    },
    {
      AFSNumber: "238342",
      AFSName: "ONEPATH FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "238346",
      AFSName: "ONEPATH CUSTODIANS PTY LIMITED",
    },
    {
      AFSNumber: "238349",
      AFSName: "CHARTER HALL PROPERTY SECURITIES MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "238353",
      AFSName: "DOMINA GENERAL INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "238354",
      AFSName: "DMG FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "238356",
      AFSName: "JMD ROSS INSURANCE BROKERS PTY. LIMITED",
    },
    {
      AFSNumber: "238363",
      AFSName: "GOODMAN PRIVATE WEALTH LTD",
    },
    {
      AFSNumber: "238367",
      AFSName: "JPMORGAN CHASE BANK  NATIONAL ASSOCIATION",
    },
    {
      AFSNumber: "238369",
      AFSName: "MARSH ADVANTAGE INSURANCE PTY LTD",
    },
    {
      AFSNumber: "238371",
      AFSName: "PINNACLE FUND SERVICES LIMITED",
    },
    {
      AFSNumber: "238375",
      AFSName: "WILSONS ADVISORY AND STOCKBROKING LIMITED",
    },
    {
      AFSNumber: "238380",
      AFSName: "HYPERION ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "238383",
      AFSName: "WILSONS CORPORATE FINANCE LIMITED",
    },
    {
      AFSNumber: "238384",
      AFSName: "AUSTRALIAN INSURANCE COMPANY PTY LTD",
    },
    {
      AFSNumber: "238386",
      AFSName: "WESTBRIDGE PROPERTY SECURITIES LIMITED",
    },
    {
      AFSNumber: "238394",
      AFSName: "CQP CAPITAL PTY LTD",
    },
    {
      AFSNumber: "238397",
      AFSName: "JM FINANCIAL GROUP LIMITED",
    },
    {
      AFSNumber: "238428",
      AFSName: "TMT PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "238429",
      AFSName: "RI ADVICE GROUP PTY LTD",
    },
    {
      AFSNumber: "238430",
      AFSName: "AWARE FINANCIAL SERVICES AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "238431",
      AFSName: "BANK AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "238432",
      AFSName: "LAZARD ASSET MANAGEMENT PACIFIC CO.",
    },
    {
      AFSNumber: "238433",
      AFSName: "AUSURE PTY LTD",
    },
    {
      AFSNumber: "238443",
      AFSName: "MBT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "238446",
      AFSName: "COOPERATIEVE RABOBANK U.A.",
    },
    {
      AFSNumber: "238449",
      AFSName: "PROSOLUTION GROUP PTY LTD",
    },
    {
      AFSNumber: "238450",
      AFSName: "ABBEY BEACH RESORT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "238451",
      AFSName: "STEADFAST TASWIDE INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "238460",
      AFSName: "BELLWETHER PARTNERS LTD",
    },
    {
      AFSNumber: "238463",
      AFSName: "STANWELL CORPORATION LIMITED",
    },
    {
      AFSNumber: "238477",
      AFSName: "GSA INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "238478",
      AFSName: "FUTURO FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "238479",
      AFSName: "LINK INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "238506",
      AFSName: "CHARTER HALL CONVENIENCE RETAIL LIMITED",
    },
    {
      AFSNumber: "238507",
      AFSName: "APEX SUPERANNUATION (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "238517",
      AFSName: "UNDERWRITING AGENCIES OF AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "238519",
      AFSName: "ARMYTAGE PRIVATE PTY LTD",
    },
    {
      AFSNumber: "238520",
      AFSName: "ACCRU WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "238521",
      AFSName: "STARFISH VENTURES PTY LTD",
    },
    {
      AFSNumber: "238522",
      AFSName: "TEMPLAR WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "238523",
      AFSName: "EG CAPITAL FINANCE PTY LTD",
    },
    {
      AFSNumber: "238526",
      AFSName: "ASM INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "238542",
      AFSName: "KAISER TRADING GROUP PTY LTD",
    },
    {
      AFSNumber: "238546",
      AFSName: "RF CREDIT LIMITED",
    },
    {
      AFSNumber: "238549",
      AFSName: "FINSTEAD RISK SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "238564",
      AFSName: "LENDLEASE IMT (LLITST) LIMITED",
    },
    {
      AFSNumber: "238706",
      AFSName: "DGA INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "238717",
      AFSName: "NORTHLAKE HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "238718",
      AFSName: "CARESUPER PTY LTD",
    },
    {
      AFSNumber: "238765",
      AFSName: "AVANT INSURANCE LIMITED",
    },
    {
      AFSNumber: "238770",
      AFSName: "ASCENT FINANCIAL STRATEGIES PTY. LIMITED",
    },
    {
      AFSNumber: "238773",
      AFSName: "AIIB PTY LIMITED",
    },
    {
      AFSNumber: "238777",
      AFSName: "SEXTON INSURANCE BROKING PTY. LTD.",
    },
    {
      AFSNumber: "238778",
      AFSName: "BESTMARK PTY. LTD.",
    },
    {
      AFSNumber: "238780",
      AFSName: "OSMAN INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "238790",
      AFSName: "TOTAL RISK MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "238795",
      AFSName: "AUSTRALASIAN PROPERTY INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "238814",
      AFSName: "COMMONWEALTH SECURITIES LIMITED",
    },
    {
      AFSNumber: "238815",
      AFSName: "PROTECSURE PTY LTD",
    },
    {
      AFSNumber: "238816",
      AFSName: "TOP QUARTILE MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "238829",
      AFSName: "AUSTRALIAN MEAT INDUSTRY SUPERANNUATION PTY LTD",
    },
    {
      AFSNumber: "238874",
      AFSName: "COVERFORCE PTY LIMITED",
    },
    {
      AFSNumber: "238901",
      AFSName: "LAVARO PTY LTD",
    },
    {
      AFSNumber: "238917",
      AFSName: "BRUCE INSURANCE PTY LTD",
    },
    {
      AFSNumber: "238945",
      AFSName: "NESS SUPER PTY LTD",
    },
    {
      AFSNumber: "238947",
      AFSName: "MACQUARIE SECURITIES (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "238959",
      AFSName: "LOGAN LIVESTOCK INSURANCE AGENCY PTY LTD",
    },
    {
      AFSNumber: "238963",
      AFSName: "MIDLAND INSURANCE BROKERS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "238977",
      AFSName: "BONGIORNO FINANCIAL ADVISERS PTY LTD",
    },
    {
      AFSNumber: "238978",
      AFSName: "MELBOURNE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "238979",
      AFSName: "MCCORMICK HARRIS & ASSOCIATES PTY. LTD.",
    },
    {
      AFSNumber: "238981",
      AFSName: "TEACHERS MUTUAL BANK LIMITED",
    },
    {
      AFSNumber: "238982",
      AFSName: "BRUCE CHIENE PTY LTD",
    },
    {
      AFSNumber: "238983",
      AFSName: "MARSH PTY LTD",
    },
    {
      AFSNumber: "238984",
      AFSName: "MARSH & MCLENNAN AGENCY PTY LTD",
    },
    {
      AFSNumber: "238986",
      AFSName: "MERCURY INSURANCE SERVICES PTY LTD",
    },
    {
      AFSNumber: "238991",
      AFSName: "POLICE CREDIT UNION LIMITED",
    },
    {
      AFSNumber: "239010",
      AFSName: "ALLSTATE INSURANCE PTY LTD",
    },
    {
      AFSNumber: "239041",
      AFSName: "AVISO BROKING PTY LTD",
    },
    {
      AFSNumber: "239048",
      AFSName: "BNY TRUST COMPANY OF AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "239052",
      AFSName: "CANACCORD GENUITY FINANCIAL LIMITED",
    },
    {
      AFSNumber: "239053",
      AFSName: "BTA INSTITUTIONAL SERVICES AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "239059",
      AFSName: "ROTHSCHILD & CO AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "239069",
      AFSName: "ANDREWS INSURANCE SERVICES PTY LTD",
    },
    {
      AFSNumber: "239070",
      AFSName: "TRIBECA INVESTMENT PARTNERS PTY LTD",
    },
    {
      AFSNumber: "239075",
      AFSName: "INGOT CAPITAL MANAGEMENT PTY. LIMITED",
    },
    {
      AFSNumber: "239079",
      AFSName: "FOUNDATION MANAGEMENT (WA) PTY LTD",
    },
    {
      AFSNumber: "239101",
      AFSName: "INSURANCE BROKERS OF NSW PTY LTD",
    },
    {
      AFSNumber: "239112",
      AFSName: "BAILIWICK LIFESTYLE FINANCIAL PLANNERS PTY LTD",
    },
    {
      AFSNumber: "239117",
      AFSName: "INVESTMENT GATEWAY PTY LTD",
    },
    {
      AFSNumber: "239120",
      AFSName: "GUARDIAN INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "239121",
      AFSName: "GLYNDE INSURANCE BROKERS PTY. LIMITED",
    },
    {
      AFSNumber: "239122",
      AFSName: "HUB24 CUSTODIAL SERVICES LTD",
    },
    {
      AFSNumber: "239125",
      AFSName: "J.W. BELL & ASSOCIATES PTY. LTD.",
    },
    {
      AFSNumber: "239127",
      AFSName: "LANTERI PARTNERS FINANCIAL MANAGEMENT PTY. LTD.",
    },
    {
      AFSNumber: "239131",
      AFSName: "WILLIAM INGLIS & SON LIMITED",
    },
    {
      AFSNumber: "239163",
      AFSName: "T W U NOMINEES PTY LTD",
    },
    {
      AFSNumber: "239166",
      AFSName: "SNELLEMAN TOM FINANCIAL SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "239168",
      AFSName: "KENNAS FINANCIAL SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "239169",
      AFSName: "IFM INVESTORS (NOMINEES) LIMITED",
    },
    {
      AFSNumber: "239170",
      AFSName: "FINDEX CORPORATE FINANCE (AUST) LTD",
    },
    {
      AFSNumber: "239175",
      AFSName: "COASTLINE CREDIT UNION LIMITED",
    },
    {
      AFSNumber: "239179",
      AFSName: "COMSURE INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "239180",
      AFSName: "PRIMESTOCK SECURITIES LIMITED",
    },
    {
      AFSNumber: "239200",
      AFSName: "QUANTUM FINANCIAL SERVICES AUSTRALIA PTY. LIMITED",
    },
    {
      AFSNumber: "239233",
      AFSName: "R & M INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "239238",
      AFSName: "SUMMERLAND FINANCIAL SERVICES LIMITED",
    },
    {
      AFSNumber: "239291",
      AFSName: "AUSTBROKERS RIS PTY LTD",
    },
    {
      AFSNumber: "239445",
      AFSName: "ARK TOTAL WEALTH PTY LTD",
    },
    {
      AFSNumber: "239446",
      AFSName: "CENTRAL MURRAY CREDIT UNION LIMITED",
    },
    {
      AFSNumber: "239545",
      AFSName: "QBE INSURANCE (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "239631",
      AFSName: "RSM GROUP PTY LTD",
    },
    {
      AFSNumber: "239645",
      AFSName: "MCMILLAN FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "239651",
      AFSName: "IGM FINANCIAL PLANNING PTY. LTD.",
    },
    {
      AFSNumber: "239679",
      AFSName: "STATE STREET BANK AND TRUST COMPANY",
    },
    {
      AFSNumber: "239686",
      AFSName: "AUSWIDE BANK LTD",
    },
    {
      AFSNumber: "239687",
      AFSName: "CHUBB INSURANCE AUSTRALIA LTD",
    },
    {
      AFSNumber: "239690",
      AFSName: "DOQUILE PERRETT MEADE FINANCIAL SERVICES LTD",
    },
    {
      AFSNumber: "239780",
      AFSName: "ALBANY DISTRICT INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "239782",
      AFSName: "SNOWY HYDRO LIMITED",
    },
    {
      AFSNumber: "239882",
      AFSName: "HCW FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "239904",
      AFSName: "EQUITY PARTNERS PTY LTD",
    },
    {
      AFSNumber: "239911",
      AFSName: "O'DONOHUE NOMINEES PTY. LTD.",
    },
    {
      AFSNumber: "239912",
      AFSName: "MTA INSURANCE PTY LTD",
    },
    {
      AFSNumber: "239916",
      AFSName: "INVESCO AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "239926",
      AFSName: "ASIA MIDEAST INSURANCE AND REINSURANCE PTY LTD",
    },
    {
      AFSNumber: "239927",
      AFSName: "APA GROUP LIMITED",
    },
    {
      AFSNumber: "239929",
      AFSName: "LINK FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "239933",
      AFSName: "MACARTHUR CREDIT UNION LTD",
    },
    {
      AFSNumber: "239948",
      AFSName: "DAVID W LEE & ASSOCIATES PTY LTD",
    },
    {
      AFSNumber: "239952",
      AFSName: "FURLONG INSURANCE SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "239953",
      AFSName: "MEAT INDUSTRY EMPLOYEES SUPERANNUATION FUND PTY. LTD.",
    },
    {
      AFSNumber: "239958",
      AFSName: "BROKERNET AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "240003",
      AFSName: "RETAIL EMPLOYEES SUPERANNUATION PTY. LIMITED",
    },
    {
      AFSNumber: "240004",
      AFSName: "SUPER INVESTMENT MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "240018",
      AFSName: "POLICE BANK LTD",
    },
    {
      AFSNumber: "240023",
      AFSName: "AUSTRALIAN EXECUTOR TRUSTEES LIMITED",
    },
    {
      AFSNumber: "240024",
      AFSName: "LAMBDA INVESTMENT SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "240260",
      AFSName: "CONSIDINES INSURANCE SERVICES PTY LTD",
    },
    {
      AFSNumber: "240276",
      AFSName: "TERRAIN CAPITAL LIMITED",
    },
    {
      AFSNumber: "240277",
      AFSName: "PRIMESTOCK WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "240284",
      AFSName: "TERRAIN CAPITAL MARKETS LIMITED",
    },
    {
      AFSNumber: "240293",
      AFSName: "POLICE FINANCIAL SERVICES LIMITED",
    },
    {
      AFSNumber: "240348",
      AFSName: "BAC INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "240399",
      AFSName: "ABN 11087650315 LIMITED",
    },
    {
      AFSNumber: "240409",
      AFSName: "ACTIVUS FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "240429",
      AFSName: "THOMAS MILLER (AUSTRALASIA) PTY LIMITED",
    },
    {
      AFSNumber: "240430",
      AFSName: "4D PTY LTD",
    },
    {
      AFSNumber: "240506",
      AFSName: "GUARDIAN SECURITIES LIMITED",
    },
    {
      AFSNumber: "240520",
      AFSName: "AB MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "240521",
      AFSName: "PIRIE STREET CUSTODIAN LTD",
    },
    {
      AFSNumber: "240526",
      AFSName: "ASSOCIATED CONCEPTS PTY. LTD.",
    },
    {
      AFSNumber: "240537",
      AFSName: "KAYE CONSULTING PTY LTD",
    },
    {
      AFSNumber: "240546",
      AFSName: "O'KEEFE, ANTHONY JOHN",
    },
    {
      AFSNumber: "240549",
      AFSName: "INSURANCE ADVISERNET AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "240550",
      AFSName: "FIRST SENTIER INVESTORS (AUSTRALIA) RE LTD",
    },
    {
      AFSNumber: "240553",
      AFSName: "NSP INSURANCE BROKERS PTY. LIMITED",
    },
    {
      AFSNumber: "240554",
      AFSName: "GIBSON INSURANCE BROKERS PTY. LIMITED",
    },
    {
      AFSNumber: "240556",
      AFSName: "WARWICK CREDIT UNION LTD",
    },
    {
      AFSNumber: "240559",
      AFSName: "FINANCIAL INDEX AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "240561",
      AFSName: "OXLEY INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "240567",
      AFSName: "MARKEY GROUP PTY LIMITED",
    },
    {
      AFSNumber: "240569",
      AFSName: "REI SUPERANNUATION FUND PTY LIMITED",
    },
    {
      AFSNumber: "240573",
      AFSName: "HORIZON CREDIT UNION LTD",
    },
    {
      AFSNumber: "240581",
      AFSName: "MAN INVESTMENTS AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "240583",
      AFSName: "ONEFOCUS INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "240585",
      AFSName: "EY-PARTHENON LIMITED",
    },
    {
      AFSNumber: "240600",
      AFSName: "WILLIS AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "240603",
      AFSName: "CIBC AUSTRALIA LTD",
    },
    {
      AFSNumber: "240618",
      AFSName: "CAPITAL CREATION PTY. LTD.",
    },
    {
      AFSNumber: "240667",
      AFSName: "KEYINVEST LTD",
    },
    {
      AFSNumber: "240673",
      AFSName: "DNISTER UKRAINIAN CREDIT CO-OPERATIVE LIMITED",
    },
    {
      AFSNumber: "240679",
      AFSName: "SG HISCOCK & COMPANY LIMITED",
    },
    {
      AFSNumber: "240685",
      AFSName: "DAIWA CAPITAL MARKETS AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "240689",
      AFSName: "MBA WEALTH SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "240695",
      AFSName: "ASGARD CAPITAL MANAGEMENT LTD",
    },
    {
      AFSNumber: "240701",
      AFSName: "POLICE & NURSES LIMITED",
    },
    {
      AFSNumber: "240712",
      AFSName: "SOUTH WEST SLOPES CREDIT UNION LTD",
    },
    {
      AFSNumber: "240713",
      AFSName: "KOSEC GROUP PTY LIMITED",
    },
    {
      AFSNumber: "240714",
      AFSName: "GLOBAL TRANSPORT & AUTOMOTIVE INSURANCE SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "240718",
      AFSName: "TRANSPORT MUTUAL CREDIT UNION LIMITED",
    },
    {
      AFSNumber: "240720",
      AFSName: "WOOLWORTHS TEAM BANK LIMITED",
    },
    {
      AFSNumber: "240722",
      AFSName: "FIRST CHOICE CREDIT UNION LTD",
    },
    {
      AFSNumber: "240763",
      AFSName: "KISCO PTY. LTD.",
    },
    {
      AFSNumber: "240768",
      AFSName: "ORANGE CREDIT UNION LIMITED",
    },
    {
      AFSNumber: "240769",
      AFSName: "WILLIAM BUCK WEALTH ADVISORS (NSW) PTY LTD",
    },
    {
      AFSNumber: "240773",
      AFSName: "MOORE AUSTRALIA CORPORATE FINANCE (WA) PTY LTD",
    },
    {
      AFSNumber: "240775",
      AFSName: "TRIUMPH FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "240776",
      AFSName: "THE LEADERS INVESTMENT MANAGER PTY LIMITED",
    },
    {
      AFSNumber: "240807",
      AFSName: "LABORATORIES CREDIT UNION LIMITED",
    },
    {
      AFSNumber: "240808",
      AFSName: "JENKI HOLDINGS PTY LIMITED",
    },
    {
      AFSNumber: "240813",
      AFSName: "MORGAN STANLEY WEALTH MANAGEMENT AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "240815",
      AFSName: "KAPLAN FUNDS MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "240816",
      AFSName: "MITSUI SUMITOMO INSURANCE COMPANY  LIMITED",
    },
    {
      AFSNumber: "240819",
      AFSName: "BRUCE PARK PTY LTD",
    },
    {
      AFSNumber: "240827",
      AFSName: "FRANKLIN TEMPLETON AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "240837",
      AFSName: "BRIDGES FINANCIAL SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "240867",
      AFSName: "SAVILL HICKS CORP. PTY. LTD.",
    },
    {
      AFSNumber: "240877",
      AFSName: "CENTEC SECURITIES PTY LTD",
    },
    {
      AFSNumber: "240892",
      AFSName: "MORNINGSTAR AUSTRALASIA PTY LIMITED",
    },
    {
      AFSNumber: "240893",
      AFSName: "SECURE INVESTMENTS F.I.B. PTY. LTD.",
    },
    {
      AFSNumber: "240896",
      AFSName: "MYSTATE BANK LIMITED",
    },
    {
      AFSNumber: "240901",
      AFSName: "WIN SECURITIES LIMITED",
    },
    {
      AFSNumber: "240915",
      AFSName: "BRETT GRANT & ASSOCIATES PTY. LTD.",
    },
    {
      AFSNumber: "240917",
      AFSName: "HIFX AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "240922",
      AFSName: "MACEY INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "240939",
      AFSName: "WARREN SAUNDERS INSURANCE BROKERS (AUST.) PTY. LIMITED",
    },
    {
      AFSNumber: "240942",
      AFSName: "MCA INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "240954",
      AFSName: "INSURANCE HOUSE PTY. LTD.",
    },
    {
      AFSNumber: "240959",
      AFSName: "ACTUATE ALLIANCE SERVICES PTY LTD",
    },
    {
      AFSNumber: "240960",
      AFSName: "VICTORIA TEACHERS LIMITED",
    },
    {
      AFSNumber: "240975",
      AFSName: "EQUITY TRUSTEES LIMITED",
    },
    {
      AFSNumber: "240985",
      AFSName: "GRANT SAMUEL & ASSOCIATES PTY LIMITED",
    },
    {
      AFSNumber: "240988",
      AFSName: "HLB MANN JUDD CORPORATE FINANCE PTY LTD",
    },
    {
      AFSNumber: "240992",
      AFSName: "CITIGROUP GLOBAL MARKETS AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "241000",
      AFSName: "SOUTHERN CROSS CREDIT UNION LTD",
    },
    {
      AFSNumber: "241010",
      AFSName: "GRANT SAMUEL CAPITAL ADVISORY PTY LIMITED",
    },
    {
      AFSNumber: "241014",
      AFSName: "CAPITAL MANAGED INVESTMENTS LTD",
    },
    {
      AFSNumber: "241040",
      AFSName: "GRANT SAMUEL CORPORATE FINANCE PTY LIMITED",
    },
    {
      AFSNumber: "241041",
      AFSName: "EMERALD FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "241050",
      AFSName: "SYMES WARNE & ASSOCIATES PTY LTD",
    },
    {
      AFSNumber: "241055",
      AFSName: "INSURTECH SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "241057",
      AFSName: "GRANDBRIDGE SECURITIES PTY LTD",
    },
    {
      AFSNumber: "241058",
      AFSName: "PRIVATE PORTFOLIO MANAGERS PTY LIMITED",
    },
    {
      AFSNumber: "241059",
      AFSName: "MYOB AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "241060",
      AFSName: "FINANCIAL SYSTEMS PTY LTD",
    },
    {
      AFSNumber: "241061",
      AFSName: "ASSENT FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "241064",
      AFSName: "KINNANE INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "241065",
      AFSName: "COWDEN LIMITED",
    },
    {
      AFSNumber: "241066",
      AFSName: "CREDIT UNION SA LTD",
    },
    {
      AFSNumber: "241068",
      AFSName: "FAMILY FIRST CREDIT UNION LIMITED",
    },
    {
      AFSNumber: "241075",
      AFSName: "DIRECT INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "241076",
      AFSName: "MAPLERIDGE PTY LTD",
    },
    {
      AFSNumber: "241080",
      AFSName: "BNP PARIBAS FUND SERVICES AUSTRALASIA PTY LTD",
    },
    {
      AFSNumber: "241087",
      AFSName: "CITYCOVER (AUST) PTY. LTD.",
    },
    {
      AFSNumber: "241092",
      AFSName: "GAVIN ROSS & CO. PTY. LTD.",
    },
    {
      AFSNumber: "241095",
      AFSName: "CYGNET SECURITIES AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "241097",
      AFSName: "INGWERSEN & LANSDOWN SECURITIES LIMITED",
    },
    {
      AFSNumber: "241104",
      AFSName: "MACQUARIE SPECIALISED ASSET MANAGEMENT LTD",
    },
    {
      AFSNumber: "241106",
      AFSName: "MACQUARIE AUSTRALIAN INFRASTRUCTURE MANAGEMENT 1 LIMITED",
    },
    {
      AFSNumber: "241135",
      AFSName: "EA INSURANCE SERVICES PTY LTD",
    },
    {
      AFSNumber: "241141",
      AFSName: "AON RISK SERVICES AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "241142",
      AFSName: "UNIMUTUAL LIMITED",
    },
    {
      AFSNumber: "241143",
      AFSName: "GOULBURN INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "241167",
      AFSName: "REGIONAL AUSTRALIA BANK LTD",
    },
    {
      AFSNumber: "241170",
      AFSName: "GALE INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "241175",
      AFSName: "CREMORNE CAPITAL LIMITED",
    },
    {
      AFSNumber: "241177",
      AFSName: "MAINVIEW SECURITIES PTY. LTD.",
    },
    {
      AFSNumber: "241178",
      AFSName: "BROOKFIELD MANAGEMENT EQUITY PLANS LIMITED",
    },
    {
      AFSNumber: "241188",
      AFSName: "STOCKLAND CAPITAL PARTNERS LIMITED",
    },
    {
      AFSNumber: "241190",
      AFSName: "STOCKLAND TRUST MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "241192",
      AFSName: "SANDALWOOD PROPERTIES LTD",
    },
    {
      AFSNumber: "241195",
      AFSName: "MEMBERS BANKING GROUP LIMITED",
    },
    {
      AFSNumber: "241216",
      AFSName: "SECURITISATION ADVISORY SERVICES PTY. LIMITED",
    },
    {
      AFSNumber: "241226",
      AFSName: "ASSURED MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "241230",
      AFSName: "HARGRAVES SECURED INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "241233",
      AFSName: "ENDEAVOUR EQUITIES PTY LTD",
    },
    {
      AFSNumber: "241254",
      AFSName: "MCKILLOP INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "241257",
      AFSName: "BOLDERSTON & ASSOCIATES INSURANCE BROKERS PTY. LIMITED",
    },
    {
      AFSNumber: "241266",
      AFSName: "FRONTIER ADVISORS PTY LTD",
    },
    {
      AFSNumber: "241307",
      AFSName: "MANIFEST CAPITAL MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "241364",
      AFSName: "GOULBURN MURRAY CREDIT UNION CO-OPERATIVE LIMITED",
    },
    {
      AFSNumber: "241365",
      AFSName: "AVISO INTEGRAL PTY LTD",
    },
    {
      AFSNumber: "241366",
      AFSName: "ONEVUE SUPER MEMBER ADMINISTRATION PTY LIMITED",
    },
    {
      AFSNumber: "241367",
      AFSName: "JOHNSON PACIFIC PTY. LTD.",
    },
    {
      AFSNumber: "241371",
      AFSName: "COMMODITY HEDGING COMPANY PTY. LTD.",
    },
    {
      AFSNumber: "241372",
      AFSName: "ALL-STATES CORPORATION LIMITED",
    },
    {
      AFSNumber: "241380",
      AFSName: "BUTLER MCINTYRE INVESTMENTS LTD",
    },
    {
      AFSNumber: "241381",
      AFSName: "TERRACE INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "241382",
      AFSName: "BALANCED SECURITIES LIMITED",
    },
    {
      AFSNumber: "241390",
      AFSName: "LONSFORD INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "241400",
      AFSName: "AUSTRALIAN INVESTMENT EXCHANGE LIMITED",
    },
    {
      AFSNumber: "241404",
      AFSName: "MACQUARIE SPECIALISED ASSET MANAGEMENT 2 LIMITED",
    },
    {
      AFSNumber: "241411",
      AFSName: "AUTO & GENERAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "241413",
      AFSName: "QPCU LIMITED",
    },
    {
      AFSNumber: "241414",
      AFSName: "THE HOSPITALS CONTRIBUTION FUND OF AUSTRALIA LTD",
    },
    {
      AFSNumber: "241418",
      AFSName: "LEA INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "241419",
      AFSName: "STATE STREET AUSTRALIA LTD",
    },
    {
      AFSNumber: "241420",
      AFSName: "ACUMEN ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "241421",
      AFSName: "FORESTERS FINANCIAL LIMITED",
    },
    {
      AFSNumber: "241423",
      AFSName: "DARLING DOWNS INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "241424",
      AFSName: "ANDERSON'S INVESTMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "241436",
      AFSName: "THE HOLLARD INSURANCE COMPANY PTY LTD",
    },
    {
      AFSNumber: "241457",
      AFSName: "DELOITTE CORPORATE FINANCE PTY LIMITED",
    },
    {
      AFSNumber: "241459",
      AFSName: "COLLINS PARTNERS ADVISORY PTY LTD & CRADOC NOMINEES PTY LTD",
    },
    {
      AFSNumber: "241466",
      AFSName: "BJS BODY CORPORATE INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "241506",
      AFSName: "IFS INSURANCE SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "241685",
      AFSName: "MULTI-FUNCTIONAL POLICIES PTY. LTD.",
    },
    {
      AFSNumber: "241713",
      AFSName: "COVER-MORE INSURANCE SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "241715",
      AFSName: "NW ADVICE PTY LIMITED",
    },
    {
      AFSNumber: "241717",
      AFSName: "PILAT INVESTMENT PTY LTD",
    },
    {
      AFSNumber: "241737",
      AFSName: "MORRISON SECURITIES PTY LIMITED",
    },
    {
      AFSNumber: "241739",
      AFSName: "HEFFRON CONSULTING PTY LTD",
    },
    {
      AFSNumber: "241742",
      AFSName: "COWDEN (S.A.) PTY. LTD.",
    },
    {
      AFSNumber: "241799",
      AFSName: "AUSTCOVER PTY. LTD.",
    },
    {
      AFSNumber: "243173",
      AFSName: "UNITY INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "243174",
      AFSName: "LES MUMME PTY LTD",
    },
    {
      AFSNumber: "243221",
      AFSName: "D'ANGELO, VINCENT ",
    },
    {
      AFSNumber: "243253",
      AFSName: "FINDEX ADVICE SERVICES PTY LTD",
    },
    {
      AFSNumber: "243260",
      AFSName: "TAL DIRECT PTY LIMITED",
    },
    {
      AFSNumber: "243261",
      AFSName: "CHU UNDERWRITING AGENCIES PTY LTD",
    },
    {
      AFSNumber: "243264",
      AFSName: "FINSURA INSURANCE BROKING (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "243268",
      AFSName: "ADAMS & ASSOCIATES FINANCIAL PLANNERS PTY LTD",
    },
    {
      AFSNumber: "243270",
      AFSName: "ARC WEALTH PTY LTD",
    },
    {
      AFSNumber: "243287",
      AFSName: "MUIRFIELD FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "243289",
      AFSName: "GEELONG INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "243293",
      AFSName: "SAFEGUARD INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "243299",
      AFSName: "TUDOR INSURANCE AUSTRALIA (INSURANCE BROKERS) PTY. LTD.",
    },
    {
      AFSNumber: "243305",
      AFSName: "COLLINS ST. INVESTMENT ADVISORS PTY. LTD.",
    },
    {
      AFSNumber: "243311",
      AFSName: "SEDDON LANE INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "243313",
      AFSName: "SYNCHRON ADVICE PTY LTD",
    },
    {
      AFSNumber: "243320",
      AFSName: "DEVERE AUSTRALIA GROUP PTY LTD",
    },
    {
      AFSNumber: "243346",
      AFSName: "GOLDMAN SACHS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "243358",
      AFSName: "LINEAR FUNDS MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "243361",
      AFSName: "CPG RESEARCH & ADVISORY PTY. LIMITED",
    },
    {
      AFSNumber: "243384",
      AFSName: "GAMMAN INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "243388",
      AFSName: "B G CAPITAL CORPORATION PTY LIMITED",
    },
    {
      AFSNumber: "243442",
      AFSName: "CAMBOOYA PTY. LTD.",
    },
    {
      AFSNumber: "243444",
      AFSName: "BANK OF SYDNEY LTD",
    },
    {
      AFSNumber: "243469",
      AFSName: "HALLMARK LIFE INSURANCE COMPANY LTD.",
    },
    {
      AFSNumber: "243478",
      AFSName: "HALLMARK GENERAL INSURANCE COMPANY LTD.",
    },
    {
      AFSNumber: "243480",
      AFSName: "BELL POTTER SECURITIES LIMITED",
    },
    {
      AFSNumber: "243509",
      AFSName: "COVERFORCE PCIB PTY LTD",
    },
    {
      AFSNumber: "243522",
      AFSName: "MB INSURANCE GROUP PTY LIMITED",
    },
    {
      AFSNumber: "243532",
      AFSName: "STENING SIMPSON (INTERNATIONAL) PTY. LIMITED",
    },
    {
      AFSNumber: "243534",
      AFSName: "HAYWOOD WILKINS & ASSOCIATES (VIC) PTY. LTD.",
    },
    {
      AFSNumber: "243556",
      AFSName: "E & G CONSULTANTS PTY LTD",
    },
    {
      AFSNumber: "243559",
      AFSName: "ANNIS GROUP PTY LIMITED",
    },
    {
      AFSNumber: "243653",
      AFSName: "COWDEN (NSW) PTY. LTD.",
    },
    {
      AFSNumber: "243662",
      AFSName: "DERIVATIVES.COM.AU PTY LIMITED",
    },
    {
      AFSNumber: "244040",
      AFSName: "ZERO SECURITIES PTY LTD",
    },
    {
      AFSNumber: "244115",
      AFSName: "APS BENEFITS GROUP LTD",
    },
    {
      AFSNumber: "244116",
      AFSName: "CUSCAL LIMITED",
    },
    {
      AFSNumber: "244119",
      AFSName: "MORROWS PRIVATE WEALTH PTY. LTD.",
    },
    {
      AFSNumber: "244145",
      AFSName: "OPTIVER AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "244222",
      AFSName: "STRATEGEM INVESTMENT SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "244244",
      AFSName: "AUSTBROKERS SYDNEY PTY LIMITED",
    },
    {
      AFSNumber: "244245",
      AFSName: "EQUITY FINANCIAL SERVICES AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "244246",
      AFSName: "GIBSON KILLER PTY. LTD.",
    },
    {
      AFSNumber: "244248",
      AFSName: "HUME BANK LIMITED",
    },
    {
      AFSNumber: "244252",
      AFSName: "MILLENNIUM 3 FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "244255",
      AFSName: "TRADITIONAL CREDIT UNION LIMITED",
    },
    {
      AFSNumber: "244259",
      AFSName: "TEAM CARE PTY LTD",
    },
    {
      AFSNumber: "244310",
      AFSName: "HERITAGE AND PEOPLE'S CHOICE LIMITED",
    },
    {
      AFSNumber: "244319",
      AFSName: "AGVISE (WA) PTY LTD",
    },
    {
      AFSNumber: "244324",
      AFSName: "CAIRNS PENNY SAVINGS & LOANS LIMITED",
    },
    {
      AFSNumber: "244326",
      AFSName: "INSUREX PTY LTD",
    },
    {
      AFSNumber: "244330",
      AFSName: "QIB COMMERCIAL PTY LTD",
    },
    {
      AFSNumber: "244332",
      AFSName: "PETER L BROWN & ASSOCIATES PTY LTD",
    },
    {
      AFSNumber: "244335",
      AFSName: "YOUR INSURANCE BROKER PTY LTD",
    },
    {
      AFSNumber: "244351",
      AFSName: "FORD CO-OPERATIVE CREDIT SOCIETY LIMITED",
    },
    {
      AFSNumber: "244360",
      AFSName: "FB WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "244369",
      AFSName: "AUSTRAL INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "244370",
      AFSName: "HIGH STREET UNDERWRITING AGENCY PTY. LIMITED",
    },
    {
      AFSNumber: "244385",
      AFSName: "MERCER INVESTMENTS (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "244386",
      AFSName: "AVISO SPECIALTY PTY LTD",
    },
    {
      AFSNumber: "244392",
      AFSName: "HOST-PLUS PTY. LIMITED",
    },
    {
      AFSNumber: "244393",
      AFSName: "K2 ASSET MANAGEMENT LTD",
    },
    {
      AFSNumber: "244395",
      AFSName: "HOLIDAY CONCEPTS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "244412",
      AFSName: "GOLD 4LIFE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "244427",
      AFSName: "WATKINS INSURANCE BROKERS PTY LIMITED",
    },
    {
      AFSNumber: "244434",
      AFSName: "PATRIZIA PTY LTD",
    },
    {
      AFSNumber: "244435",
      AFSName: "WA PRESTIGE INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "244521",
      AFSName: "SARACENS PTY LTD",
    },
    {
      AFSNumber: "244529",
      AFSName: "BODY CORPORATE BROKERS PTY LTD",
    },
    {
      AFSNumber: "244530",
      AFSName: "KILARA FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "244533",
      AFSName: "QUEENSLAND COUNTRY BANK LIMITED",
    },
    {
      AFSNumber: "244540",
      AFSName: "THE MOORINGS DEVELOPMENTS LTD",
    },
    {
      AFSNumber: "244542",
      AFSName: "GOODALL FINANCIAL SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "244565",
      AFSName: "SECURITY NATIONAL FINANCIAL SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "244572",
      AFSName: "PRICEWATERHOUSECOOPERS SECURITIES LTD",
    },
    {
      AFSNumber: "244576",
      AFSName: "DELOITTE ACTUARIES & CONSULTANTS LIMITED",
    },
    {
      AFSNumber: "244578",
      AFSName: "ACN 054 261 371 PTY. LTD.",
    },
    {
      AFSNumber: "244582",
      AFSName: "SUSQUEHANNA PACIFIC PTY LTD",
    },
    {
      AFSNumber: "244583",
      AFSName: "FIRST PRIORITY FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "244584",
      AFSName: "AUSTAGENCIES PTY LTD",
    },
    {
      AFSNumber: "244593",
      AFSName: "CHALLENGER SECURITISATION MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "244594",
      AFSName: "BARRINGTON TREASURY SERVICES PTY LTD",
    },
    {
      AFSNumber: "244596",
      AFSName: "TAIWAN BUSINESS BANK  LTD.",
    },
    {
      AFSNumber: "244601",
      AFSName: "M.G.A. INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "244616",
      AFSName: "BANK OF QUEENSLAND LIMITED",
    },
    {
      AFSNumber: "244617",
      AFSName: "B.Q.L. MANAGEMENT PTY. LTD.",
    },
    {
      AFSNumber: "244618",
      AFSName: "AUSTBROKERS CENTRAL COAST PTY LTD",
    },
    {
      AFSNumber: "245361",
      AFSName: "ROSS FORSYTH INSURANCE PTY LTD",
    },
    {
      AFSNumber: "245374",
      AFSName: "PSC NFIB MARKETS PTY LTD",
    },
    {
      AFSNumber: "245375",
      AFSName: "GRAYSTONE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "245377",
      AFSName: "COVERFORCE PARTNERS PTY LTD",
    },
    {
      AFSNumber: "245387",
      AFSName: "ACT SUPER MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "245406",
      AFSName: "SPARAXIS PTY. LTD.",
    },
    {
      AFSNumber: "245415",
      AFSName: "CENTRAL WEST CREDIT UNION LIMITED",
    },
    {
      AFSNumber: "245418",
      AFSName: "HIB INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "245430",
      AFSName: "LEDERMAN INSURANCE BROKERS PTY. LIMITED",
    },
    {
      AFSNumber: "245432",
      AFSName: "GOW-GATES INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "245433",
      AFSName: "GOW-GATES INSURANCE BROKERS (AUSTRALASIA) PTY LTD",
    },
    {
      AFSNumber: "245438",
      AFSName: "AUSTRALIAN INSURANCE AGENCY POOL PTY LIMITED",
    },
    {
      AFSNumber: "245443",
      AFSName: "M & S INSURANCE (BROKER) SERVICES PTY LTD",
    },
    {
      AFSNumber: "245451",
      AFSName: "GODFREY PEMBROKE GROUP PTY LTD",
    },
    {
      AFSNumber: "245453",
      AFSName: "STERLING STRATEGIES PTY LTD",
    },
    {
      AFSNumber: "245456",
      AFSName: "OPTIMUS 1 PTY LTD",
    },
    {
      AFSNumber: "245460",
      AFSName: "SOUTH COAST INSURANCE BROKERS W.A. PTY LTD",
    },
    {
      AFSNumber: "245481",
      AFSName: "TAURUS MANAGEMENT LTD",
    },
    {
      AFSNumber: "245489",
      AFSName: "MCNAUGHTON GARDINER INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "245506",
      AFSName: "SYDNEY WYDE MORTGAGE MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "245509",
      AFSName: "BLOOMBERG TRADEBOOK AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "245511",
      AFSName: "JOHN FRASER INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "245513",
      AFSName: "BDO CORPORATE FINANCE LTD",
    },
    {
      AFSNumber: "245514",
      AFSName: "BRUINING PARTNERS PTY LTD",
    },
    {
      AFSNumber: "245515",
      AFSName: "A.P.V.C. LTD.",
    },
    {
      AFSNumber: "245522",
      AFSName: "SUREPLAN FRIENDLY SOCIETY LTD",
    },
    {
      AFSNumber: "245531",
      AFSName: "AVANTEOS INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "245537",
      AFSName: "HILL YOUNG & ASSOCIATES LIMITED",
    },
    {
      AFSNumber: "245555",
      AFSName: "ROSE STANTON INSURANCE BROKERS PTY LIMITED",
    },
    {
      AFSNumber: "245558",
      AFSName: "BENTLEYS WEALTH (VICTORIA) PTY LTD",
    },
    {
      AFSNumber: "245562",
      AFSName: "ROSTAND PTY. LTD.",
    },
    {
      AFSNumber: "245566",
      AFSName: "SHANEBRIDGE PTY. LTD.",
    },
    {
      AFSNumber: "245578",
      AFSName: "ASF CAPITAL PTY LTD",
    },
    {
      AFSNumber: "245579",
      AFSName: "VIRGINIA SURETY COMPANY  INC.",
    },
    {
      AFSNumber: "245584",
      AFSName: "CONSOLIDATED INSURANCE AGENCIES PTY. LTD.",
    },
    {
      AFSNumber: "245591",
      AFSName: "MERCER ADMINISTRATION SERVICES (AUSTRALIA) PTY LIMITED",
    },
    {
      AFSNumber: "245606",
      AFSName: "HEARTLAND BANK AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "245612",
      AFSName: "EPSILON INSURANCE BROKING SERVICES PTY LTD",
    },
    {
      AFSNumber: "245627",
      AFSName: "NORTHHAVEN FINANCIAL MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "245628",
      AFSName: "COMBINED LIFE INSURANCE COMPANY OF AUSTRALIA LTD",
    },
    {
      AFSNumber: "245629",
      AFSName: "LAND REAL PTY LIMITED",
    },
    {
      AFSNumber: "245631",
      AFSName: "AWP AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "245643",
      AFSName: "PROVIDENCE WEALTH ADVISORY GROUP PTY LTD",
    },
    {
      AFSNumber: "245647",
      AFSName: "NORTH QUEENSLAND INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "245649",
      AFSName: "ADVENT PARTNERS PTY LTD",
    },
    {
      AFSNumber: "245652",
      AFSName: "DEAN EVANS & ASSOCIATES PTY. LIMITED",
    },
    {
      AFSNumber: "245658",
      AFSName: "COWDEN (VIC) PTY LTD",
    },
    {
      AFSNumber: "245663",
      AFSName: "PETPLAN AUSTRALASIA PTY LTD",
    },
    {
      AFSNumber: "245675",
      AFSName: "GREIG & HARRISON PTY. LTD",
    },
    {
      AFSNumber: "245788",
      AFSName: "TIMESHARE BROKERS PTY LTD",
    },
    {
      AFSNumber: "246232",
      AFSName: "CLASSIC CLUBS LIMITED",
    },
    {
      AFSNumber: "246250",
      AFSName: "AURORA ENERGY PTY LTD",
    },
    {
      AFSNumber: "246263",
      AFSName: "MEDITERRANEAN OLIVES ESTATE LIMITED",
    },
    {
      AFSNumber: "246264",
      AFSName: "W.A. BLUE GUM LIMITED",
    },
    {
      AFSNumber: "246271",
      AFSName: "LODGE PARTNERS PTY LTD",
    },
    {
      AFSNumber: "246282",
      AFSName: "AIB PTY. LIMITED",
    },
    {
      AFSNumber: "246305",
      AFSName: "CHALICE NOMINEES PTY. LTD.",
    },
    {
      AFSNumber: "246309",
      AFSName: "SUPER GROUP HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "246315",
      AFSName: "LEGAL SUPER PTY LTD",
    },
    {
      AFSNumber: "246323",
      AFSName: "EMMARK INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "246368",
      AFSName: "CENTURIA HEALTHCARE ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "246369",
      AFSName: "ATLANTIC INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "246381",
      AFSName: "CMC MARKETS STOCKBROKING LIMITED",
    },
    {
      AFSNumber: "246383",
      AFSName: "TOGETHR TRUSTEES PTY LTD",
    },
    {
      AFSNumber: "246410",
      AFSName: "AUSTBROKERS CITY STATE PTY LTD",
    },
    {
      AFSNumber: "246411",
      AFSName: "QUINN FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "246412",
      AFSName: "NOMURA AUSTRALIA LTD",
    },
    {
      AFSNumber: "246415",
      AFSName: "BELLEVUE HILL CAPITAL LTD",
    },
    {
      AFSNumber: "246427",
      AFSName: "NOMURA ASSET MANAGEMENT AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "246441",
      AFSName: "INVESTSMART FUNDS MANAGEMENT LTD",
    },
    {
      AFSNumber: "246469",
      AFSName: "AUSTRALIAN WARRANTY NETWORK PTY LTD",
    },
    {
      AFSNumber: "246488",
      AFSName: "PROPEX 24 PTY LTD",
    },
    {
      AFSNumber: "246507",
      AFSName: "HERITAGE INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "246520",
      AFSName: "WESTLAWN INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "246521",
      AFSName: "ROYAL BANK OF CANADA",
    },
    {
      AFSNumber: "246532",
      AFSName: "LONERGAN EDWARDS & ASSOCIATES LIMITED",
    },
    {
      AFSNumber: "246542",
      AFSName: "CHIMAERA CAPITAL LTD",
    },
    {
      AFSNumber: "246543",
      AFSName: "CAPE LEVEQUE SECURITIES PTY. LTD.",
    },
    {
      AFSNumber: "246548",
      AFSName: "TOKIO MARINE & NICHIDO FIRE INSURANCE CO.  LTD.",
    },
    {
      AFSNumber: "246560",
      AFSName: "PROMOTIONAL INSURANCE AGENCY PTY. LTD.",
    },
    {
      AFSNumber: "246564",
      AFSName: "ALLCOVER INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "246566",
      AFSName: "EASYMARKETS PTY LTD",
    },
    {
      AFSNumber: "246568",
      AFSName: "INVESTWEST PTY. LTD.",
    },
    {
      AFSNumber: "246580",
      AFSName:
        "GENIUM INVESTMENT CONSULTANTS PTY LTD & GENIUM INVESTMENT RESEARCH PTY LTD",
    },
    {
      AFSNumber: "246583",
      AFSName: "RISK MITIGATION SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "246584",
      AFSName: "COVERFORCE COMPLETE INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "246585",
      AFSName: "TRANSURBAN INFRASTRUCTURE MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "246589",
      AFSName: "GLOBAL CAPITAL RESOURCES PTY. LTD.",
    },
    {
      AFSNumber: "246604",
      AFSName: "PRECISION ADMINISTRATION SERVICES PTY LTD",
    },
    {
      AFSNumber: "246613",
      AFSName: "RODERICK INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "246618",
      AFSName: "COVERSAFE INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "246621",
      AFSName: "TIP TRUSTEES LIMITED",
    },
    {
      AFSNumber: "246622",
      AFSName: "CRM BROKERS PTY LIMITED",
    },
    {
      AFSNumber: "246623",
      AFSName: "CONSILIUM ADVICE AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "246632",
      AFSName: "CARRIERS INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "246638",
      AFSName: "INTERPRAC FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "246670",
      AFSName: "WISE-OWL.COM PTY LIMITED",
    },
    {
      AFSNumber: "246679",
      AFSName: "MADISON FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "246682",
      AFSName: "SPINIFEX CAPITAL PTY LTD",
    },
    {
      AFSNumber: "246699",
      AFSName: "REEF CORPORATE SERVICES LIMITED",
    },
    {
      AFSNumber: "246705",
      AFSName: "OPENMARKETS AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "246712",
      AFSName: "PRITCHARD & PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "246714",
      AFSName: "GARDA CAPITAL LIMITED",
    },
    {
      AFSNumber: "246719",
      AFSName: "STRATA UNIT UNDERWRITING AGENCY PTY LIMITED",
    },
    {
      AFSNumber: "246721",
      AFSName: "MILLENNIUM UNDERWRITING AGENCIES PTY LTD",
    },
    {
      AFSNumber: "246725",
      AFSName: "COMPLETE FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "246734",
      AFSName: "THE STRUCTURED PRODUCTS GROUP PTY LTD",
    },
    {
      AFSNumber: "246735",
      AFSName: "BAKER YOUNG LIMITED",
    },
    {
      AFSNumber: "246737",
      AFSName: "KWC FUNDS PTY LTD",
    },
    {
      AFSNumber: "246740",
      AFSName: "BRADY & ASSOCIATES PTY. LTD",
    },
    {
      AFSNumber: "246742",
      AFSName: "FAWKNER CAPITAL MANAGEMENT PTY. LTD.",
    },
    {
      AFSNumber: "246744",
      AFSName: "SPECIALISED PRIVATE CAPITAL LTD",
    },
    {
      AFSNumber: "246747",
      AFSName: "LONGREACH ALTERNATIVES LTD",
    },
    {
      AFSNumber: "246749",
      AFSName: "HONAN INSURANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "246780",
      AFSName: "THE CAPRICORNIAN LTD",
    },
    {
      AFSNumber: "246782",
      AFSName: "WARAKIRRI ASSET MANAGEMENT LTD",
    },
    {
      AFSNumber: "246784",
      AFSName: "ULTIQA LIFESTYLE POINTS LIMITED",
    },
    {
      AFSNumber: "246796",
      AFSName: "DECODE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "246797",
      AFSName: "AON REINSURANCE AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "246803",
      AFSName: "CP2 LIMITED",
    },
    {
      AFSNumber: "246812",
      AFSName: "BERKLEY INVESTMENT CORPORATION PTY LIMITED",
    },
    {
      AFSNumber: "246827",
      AFSName: "PHILLIP CAPITAL LIMITED",
    },
    {
      AFSNumber: "246830",
      AFSName: "NATIXIS INVESTMENT MANAGERS AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "246833",
      AFSName: "STANDARD CHARTERED BANK",
    },
    {
      AFSNumber: "246834",
      AFSName:
        "QUEENSLAND MASTER BUILDERS ASSOCIATION INDUSTRIAL ORGANISATION OF EMPLOYERS",
    },
    {
      AFSNumber: "246838",
      AFSName: "TOR FX PTY LIMITED",
    },
    {
      AFSNumber: "246842",
      AFSName: "FINCLEAR EXECUTION LIMITED",
    },
    {
      AFSNumber: "246845",
      AFSName: "STRATEGIC FINANCIAL PLANNERS PTY LTD",
    },
    {
      AFSNumber: "246848",
      AFSName: "PHILLIP ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "246857",
      AFSName: "AGM FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "246860",
      AFSName: "V J RYAN SECURITIES LIMITED",
    },
    {
      AFSNumber: "246862",
      AFSName: "PIMCO AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "246864",
      AFSName: "TEAM SUPER PTY LTD",
    },
    {
      AFSNumber: "246883",
      AFSName: "APEX SUPER SERVICES PTY LTD",
    },
    {
      AFSNumber: "246884",
      AFSName: "BNK BANKING CORPORATION LIMITED",
    },
    {
      AFSNumber: "246901",
      AFSName: "KPMG FINANCIAL ADVISORY SERVICES (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "246925",
      AFSName: "PINN DEAVIN SECURITIES PTY LTD",
    },
    {
      AFSNumber: "246937",
      AFSName: "LIFESTYLE INSURANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "246943",
      AFSName: "ZANK CAPITAL LTD",
    },
    {
      AFSNumber: "246986",
      AFSName: "ELKINGTON BISHOP MOLINEAUX INSURANCE BROKERS PTY LIMITED",
    },
    {
      AFSNumber: "246988",
      AFSName: "MCKENZIE ROSS & CO. PTY. LTD.",
    },
    {
      AFSNumber: "246992",
      AFSName: "MELBOURNE INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "246996",
      AFSName: "CHARTER HALL RETAIL MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "247006",
      AFSName: "DODGE, WALTER ",
    },
    {
      AFSNumber: "247008",
      AFSName: "PELORUS PRIVATE EQUITY LIMITED",
    },
    {
      AFSNumber: "247012",
      AFSName: "BLUESTONE MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "247014",
      AFSName: "KELVIN ANDERSON FINANCIAL SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "247017",
      AFSName: "DBG MARKETS (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "247020",
      AFSName: "IRT INSURANCE PTY LIMITED",
    },
    {
      AFSNumber: "247024",
      AFSName: "INTERNATIONAL POWER (ENERGY) PTY LTD",
    },
    {
      AFSNumber: "247036",
      AFSName: "COASTAL CAPITAL LIMITED",
    },
    {
      AFSNumber: "247062",
      AFSName: "RETIREWELL FINANCIAL PLANNING PTY. LTD.",
    },
    {
      AFSNumber: "247067",
      AFSName: "F PALMER & M E PALMER",
    },
    {
      AFSNumber: "247069",
      AFSName: "INTEGRITY CAR CARE PTY. LTD.",
    },
    {
      AFSNumber: "247071",
      AFSName: "NATIONAL CORPORATE BROKING PTY. LIMITED",
    },
    {
      AFSNumber: "247074",
      AFSName: "OLIVER HUME PROPERTY FUNDS LIMITED",
    },
    {
      AFSNumber: "247075",
      AFSName: "CHARTER HALL WHOLESALE MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "247082",
      AFSName: "INVIA CUSTODIAN PTY. LIMITED",
    },
    {
      AFSNumber: "247083",
      AFSName: "TAYLOR COLLISON LIMITED",
    },
    {
      AFSNumber: "247093",
      AFSName: "RIVERS INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "247096",
      AFSName: "TRANSPORT AND GENERAL PTY LTD",
    },
    {
      AFSNumber: "247097",
      AFSName: "PROPERTY INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "247098",
      AFSName: "WILLIAM BUCK FINANCIAL SERVICES (W.A.) PTY LTD",
    },
    {
      AFSNumber: "247100",
      AFSName: "PHILLIP SECURITIES (AUS) LIMITED",
    },
    {
      AFSNumber: "247101",
      AFSName: "MONEYPLAN AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "247104",
      AFSName: "ACCUVEST PTY LTD",
    },
    {
      AFSNumber: "247106",
      AFSName: "XANTIAS FINANCIAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "247110",
      AFSName: "GRESHAM PARTNERS CAPITAL LTD",
    },
    {
      AFSNumber: "247112",
      AFSName: "GRESHAM PROPERTY FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "247113",
      AFSName: "GRESHAM ADVISORY PARTNERS LIMITED",
    },
    {
      AFSNumber: "247114",
      AFSName: "POINTONS FINANCIAL PLANNERS PTY LTD",
    },
    {
      AFSNumber: "247117",
      AFSName: "SHIELD INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "247118",
      AFSName: "MURDOCH INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "247122",
      AFSName: "AFA PTY LTD",
    },
    {
      AFSNumber: "247124",
      AFSName: "WREN ADVISERS PTY LTD",
    },
    {
      AFSNumber: "247140",
      AFSName: "GRANT THORNTON CORPORATE FINANCE PTY LIMITED",
    },
    {
      AFSNumber: "247143",
      AFSName: "SHELL COVE CAPITAL MANAGEMENT LTD",
    },
    {
      AFSNumber: "247147",
      AFSName: "GOLDMAN SACHS FINANCIAL MARKETS PTY LTD",
    },
    {
      AFSNumber: "247149",
      AFSName: "K T M CAPITAL PTY LTD",
    },
    {
      AFSNumber: "247164",
      AFSName: "GLENFERRIE GROUP FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "247172",
      AFSName: "RUSSELL INVESTMENT GROUP PTY LTD",
    },
    {
      AFSNumber: "247180",
      AFSName: "FINANCIAL PLANNING WORKS PTY. LTD.",
    },
    {
      AFSNumber: "247184",
      AFSName: "PREMA CAPITAL LIMITED",
    },
    {
      AFSNumber: "247185",
      AFSName: "RUSSELL INVESTMENT MANAGEMENT LTD.",
    },
    {
      AFSNumber: "247187",
      AFSName: "FINANCIAL PATHFINDERS PTY LTD",
    },
    {
      AFSNumber: "247190",
      AFSName: "AMGUN HOLDINGS PTY. LTD.",
    },
    {
      AFSNumber: "247212",
      AFSName: "RPC CONSULTING PTY LIMITED",
    },
    {
      AFSNumber: "247219",
      AFSName: "G.J. QUINN & ASSOCIATES PTY. LTD.",
    },
    {
      AFSNumber: "247223",
      AFSName: "BARON PARTNERS LIMITED",
    },
    {
      AFSNumber: "247247",
      AFSName: "LDC ENTERPRISES AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "247258",
      AFSName: "GLENOWAR PTY. LTD.",
    },
    {
      AFSNumber: "247259",
      AFSName: "PACIFIC EQUITY PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "247261",
      AFSName: "FORTREND SECURITIES PTY. LTD.",
    },
    {
      AFSNumber: "247262",
      AFSName: "MOORE AUSTRALIA (VIC) PTY LTD",
    },
    {
      AFSNumber: "247264",
      AFSName: "BRECKENRIDGE FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "247271",
      AFSName: "MERCEDES-BENZ FINANCIAL SERVICES AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "247274",
      AFSName: "GP MORTGAGE CORPORATION LIMITED",
    },
    {
      AFSNumber: "247275",
      AFSName: "MIDAS INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "247276",
      AFSName:
        "MANULIFE INVESTMENT MANAGEMENT TIMBERLAND AND AGRICULTURE (AUSTRALASIA) PTY LIMITED",
    },
    {
      AFSNumber: "247278",
      AFSName: "KELLY & COE INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "247280",
      AFSName: "ISPT PTY LTD",
    },
    {
      AFSNumber: "247283",
      AFSName: "RESIMAC LIMITED",
    },
    {
      AFSNumber: "247284",
      AFSName: "CENTRE IN FINANCE PTY. LTD.",
    },
    {
      AFSNumber: "247289",
      AFSName: "BELL POTTER PLATFORMS PTY LTD",
    },
    {
      AFSNumber: "247293",
      AFSName: "PERENNIAL VALUE MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "247298",
      AFSName: "WAW CREDIT UNION CO-OPERATIVE LIMITED",
    },
    {
      AFSNumber: "247300",
      AFSName: "NEXIA SYDNEY FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "247301",
      AFSName: "MIPS INSURANCE PTY LTD",
    },
    {
      AFSNumber: "247302",
      AFSName: "NOBLEOAK LIFE LIMITED",
    },
    {
      AFSNumber: "247307",
      AFSName: "BDO CORPORATE (SA) PTY LTD",
    },
    {
      AFSNumber: "247319",
      AFSName: "EMBRUN PTY. LTD.",
    },
    {
      AFSNumber: "247333",
      AFSName: "WILSON ASSET MANAGEMENT (INTERNATIONAL) PTY LTD",
    },
    {
      AFSNumber: "247340",
      AFSName: "ARCH UNDERWRITING AGENCY (AUSTRALIA) PTY. LTD.",
    },
    {
      AFSNumber: "247342",
      AFSName: "HUNTINGTON GROUP PTY LIMITED",
    },
    {
      AFSNumber: "247344",
      AFSName: "FIDUCIARY FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "247346",
      AFSName: "MEGA INTERNATIONAL COMMERCIAL BANK CO.  LTD.",
    },
    {
      AFSNumber: "247360",
      AFSName: "MONEYLINK FINANCIAL PLANNING PTY. LIMITED",
    },
    {
      AFSNumber: "247366",
      AFSName: "OPTIMAL FUND MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "247378",
      AFSName: "STRATAPAY PTY. LTD.",
    },
    {
      AFSNumber: "247379",
      AFSName: "OPTUS INSURANCE SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "247386",
      AFSName: "KILLARA SECURITIES PTY LTD",
    },
    {
      AFSNumber: "247387",
      AFSName: "BURNVOIR CORPORATE FINANCE LIMITED",
    },
    {
      AFSNumber: "247388",
      AFSName: "ACS FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "247412",
      AFSName: "IVANHOE INTERNATIONAL PTY LTD",
    },
    {
      AFSNumber: "247417",
      AFSName: "PSC INSURANCE BROKERS GOLD COAST PTY LTD",
    },
    {
      AFSNumber: "247420",
      AFSName: "BDO CORPORATE FINANCE AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "247427",
      AFSName: "CROWE HORWATH PROPERTY SECURITIES LTD",
    },
    {
      AFSNumber: "247429",
      AFSName: "FITZPATRICKS PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "247430",
      AFSName: "AUSTRALIAN FINANCIAL PLANNING GROUP PTY LIMITED",
    },
    {
      AFSNumber: "247431",
      AFSName: "BURRELL STOCKBROKING PTY LTD",
    },
    {
      AFSNumber: "247433",
      AFSName: "HMH FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "247441",
      AFSName: "SHIRE INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "247459",
      AFSName: "FINPLAN AUSTRALIA PTY. LTD.",
    },
    {
      AFSNumber: "247830",
      AFSName: "BWP MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "247831",
      AFSName: "AUSTRALIAN LIFE PLANNERS PTY LTD",
    },
    {
      AFSNumber: "247843",
      AFSName: "786 INTERNATIONAL (AUST) PTY. LTD.",
    },
    {
      AFSNumber: "247858",
      AFSName: "BARDIN CAPITAL PTY LTD",
    },
    {
      AFSNumber: "247868",
      AFSName: "OVIB PTY. LTD.",
    },
    {
      AFSNumber: "250095",
      AFSName: "LENDLEASE REAL ESTATE INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "250126",
      AFSName: "LENDLEASE FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "250897",
      AFSName: "WATERMARK FUNDS MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "250899",
      AFSName: "BLIGH SECURITIES PTY LIMITED",
    },
    {
      AFSNumber: "250900",
      AFSName: "SHARE WEALTH SYSTEMS PTY LTD",
    },
    {
      AFSNumber: "250903",
      AFSName: "HLB MANN JUDD CORPORATE (WA) PTY LTD",
    },
    {
      AFSNumber: "250963",
      AFSName: "CENTURIA PROPERTY FUNDS NO. 3 LIMITED",
    },
    {
      AFSNumber: "250978",
      AFSName: "JONES LANG LASALLE PROPERTY FUND ADVISORS LIMITED",
    },
    {
      AFSNumber: "252530",
      AFSName: "HAREDS PTY LTD",
    },
    {
      AFSNumber: "252538",
      AFSName: "THE HERON PARTNERSHIP PTY LIMITED",
    },
    {
      AFSNumber: "252547",
      AFSName: "BRADFIELD PARTNERS PTY LTD",
    },
    {
      AFSNumber: "252590",
      AFSName: "FINPAC INSURANCE ADVISORS PTY. LTD.",
    },
    {
      AFSNumber: "252651",
      AFSName: "MPS INSURANCE BROKERS PTY LIMITED",
    },
    {
      AFSNumber: "252673",
      AFSName: "MAJOR PROFESSIONAL SERVICES (QLD) PTY. LIMITED",
    },
    {
      AFSNumber: "252745",
      AFSName: "CADENCE ASSET MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "252976",
      AFSName: "JOHN L MAHER INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "252992",
      AFSName: "PPT FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "253003",
      AFSName: "FAR EAST CAPITAL LIMITED",
    },
    {
      AFSNumber: "253045",
      AFSName: "VENTURA INVESTMENT MANAGEMENT LTD",
    },
    {
      AFSNumber: "253102",
      AFSName: "LORNE RESORT APARTMENTS LIMITED",
    },
    {
      AFSNumber: "253106",
      AFSName: "MECON INSURANCE PTY LTD",
    },
    {
      AFSNumber: "253119",
      AFSName: "THE OUTLOOK GROUP PTY LIMITED",
    },
    {
      AFSNumber: "253125",
      AFSName: "POLITIS INVESTMENT STRATEGIES PTY LTD",
    },
    {
      AFSNumber: "253127",
      AFSName: "ILLINGWORTH DAVID FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "253128",
      AFSName: "WESTPAC SECURITISATION MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "253131",
      AFSName: "AUSTRALIAN BROKER NETWORK PTY LTD",
    },
    {
      AFSNumber: "253134",
      AFSName: "HLB MANN JUDD CORPORATE (NSW) PTY LTD",
    },
    {
      AFSNumber: "253142",
      AFSName: "GDI FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "253197",
      AFSName: "KNIGHTS GUARD PTY. LIMITED",
    },
    {
      AFSNumber: "253214",
      AFSName: "JARRETT DA ROZA FINANCIAL PLANNING PTY LIMITED",
    },
    {
      AFSNumber: "253275",
      AFSName: "CAPITAL FINANCIAL ADVISERS PTY LTD",
    },
    {
      AFSNumber: "253472",
      AFSName: "AUSTINSURANCE BROKING GROUP PTY LTD",
    },
    {
      AFSNumber: "253583",
      AFSName: "CREDIT INSURANCE BROKERS PTY. LIMITED",
    },
    {
      AFSNumber: "254432",
      AFSName: "CALEDONIA (PRIVATE) INVESTMENTS PTY LIMITED",
    },
    {
      AFSNumber: "254514",
      AFSName: "CHESS DEPOSITARY NOMINEES PTY LIMITED",
    },
    {
      AFSNumber: "254544",
      AFSName: "GPS WEALTH LTD",
    },
    {
      AFSNumber: "254928",
      AFSName: "STEADFAST GROUP LTD",
    },
    {
      AFSNumber: "254959",
      AFSName: "CONNECTEAST MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "254963",
      AFSName: "GO MARKETS PTY LTD",
    },
    {
      AFSNumber: "255003",
      AFSName: "BMIA BROKER NETWORK PTY LTD",
    },
    {
      AFSNumber: "255080",
      AFSName: "AUSTBROKERS CORPORATE PTY LTD",
    },
    {
      AFSNumber: "255231",
      AFSName: "OAKWOOD FINANCIAL GROUP PTY LIMITED",
    },
    {
      AFSNumber: "255238",
      AFSName: "INTERRE INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "255257",
      AFSName: "SEGUE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "255291",
      AFSName: "ROSE OAK INVESTMENTS & CO PTY LTD",
    },
    {
      AFSNumber: "255301",
      AFSName: "WHITING, JOHN RAYMOND",
    },
    {
      AFSNumber: "255304",
      AFSName: "A.I.S. INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "255376",
      AFSName: "MCI INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "255475",
      AFSName: "TREND INVESTOR SERVICES PROPRIETARY LIMITED",
    },
    {
      AFSNumber: "255488",
      AFSName: "AUSTRALIAN THOROUGHBRED BLOODSTOCK PTY LTD",
    },
    {
      AFSNumber: "255507",
      AFSName: "FUTURES FINANCIAL GROUP PTY. LTD.",
    },
    {
      AFSNumber: "255516",
      AFSName: "PITCHER PARTNERS CORPORATE FINANCE LIMITED",
    },
    {
      AFSNumber: "255789",
      AFSName: "WESTAR CAPITAL LIMITED",
    },
    {
      AFSNumber: "255847",
      AFSName: "RSM CORPORATE AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "255906",
      AFSName: "MEDICAL INSURANCE AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "256530",
      AFSName: "T H N PTY LIMITED",
    },
    {
      AFSNumber: "256861",
      AFSName: "ACCESS INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "257679",
      AFSName: "ADVANCE TRADING AUSTRALASIA PTY LIMITED",
    },
    {
      AFSNumber: "257706",
      AFSName: "SEAR & ASSOCIATES INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "257751",
      AFSName: 'LITHUANIAN CO-OPERATIVE CREDIT SOCIETY "TALKA" LIMITED',
    },
    {
      AFSNumber: "257772",
      AFSName: "ROBERTSON STRUAN AND COMPANY PTY LIMITED",
    },
    {
      AFSNumber: "257803",
      AFSName: "MARK PROLISKO INSURANCE AGENCY PTY. LTD.",
    },
    {
      AFSNumber: "257853",
      AFSName: "MAXRIN PTY. LTD.",
    },
    {
      AFSNumber: "257871",
      AFSName: "CARTESIAN CORPORATE FINANCE LIMITED",
    },
    {
      AFSNumber: "257989",
      AFSName: "BENDIGO INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "258032",
      AFSName: "BLAKE INDUSTRY AND MARKET ANALYSIS PTY LTD",
    },
    {
      AFSNumber: "258052",
      AFSName: "AIMS FUND MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "258057",
      AFSName: "PROPRIETARY & FIDUCIARY SERVICES PTY LTD",
    },
    {
      AFSNumber: "258145",
      AFSName: "MUFG RETIRE360 PTY LIMITED",
    },
    {
      AFSNumber: "258715",
      AFSName: "CERYLIN PTY LTD",
    },
    {
      AFSNumber: "258829",
      AFSName: "CERTANE CT PTY LTD",
    },
    {
      AFSNumber: "258832",
      AFSName: "BENWEST INVESTMENT SERVICES PTY. LIMITED",
    },
    {
      AFSNumber: "259094",
      AFSName: "LEITHNER & COMPANY LTD",
    },
    {
      AFSNumber: "259487",
      AFSName: "PAN ASIA INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "259491",
      AFSName: "LAUREL OAK THOROUGHBREDS PTY LTD",
    },
    {
      AFSNumber: "259671",
      AFSName: "FIRE AND EMERGENCY SERVICES SUPERANNUATION BOARD",
    },
    {
      AFSNumber: "259763",
      AFSName: "FOREX PLUS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "259938",
      AFSName: "FORSYTHS FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "259983",
      AFSName: "BDO CORPORATE FINANCE (SA) PTY LTD",
    },
    {
      AFSNumber: "260006",
      AFSName: "TASMEA CORPORATE SERVICES PTY LTD",
    },
    {
      AFSNumber: "260038",
      AFSName: "TRUSTEES AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "260214",
      AFSName: "CLANBROOKE PTY. LTD.",
    },
    {
      AFSNumber: "260358",
      AFSName: "GREATER INVESTMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "260499",
      AFSName: "AUSTRALIAN SECURITIES LIMITED",
    },
    {
      AFSNumber: "260570",
      AFSName: "CLUB NOOSA TIMESHARE OWNERSHIP LIMITED",
    },
    {
      AFSNumber: "260668",
      AFSName: "CERBEROS BROKERS PTY LIMITED",
    },
    {
      AFSNumber: "260669",
      AFSName: "CITY COMMERCIAL INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "260789",
      AFSName: "PROPERTY CAPITAL AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "260836",
      AFSName: "INTERRETIRE PTY LTD",
    },
    {
      AFSNumber: "260967",
      AFSName: "HENLEY UNDERWRITING & INVESTMENT COMPANY PTY LTD",
    },
    {
      AFSNumber: "261076",
      AFSName: "CLAYMORE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "261425",
      AFSName: "TRILOGY FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "262001",
      AFSName: "NEWPORT CAPITAL GROUP PTY. LIMITED",
    },
    {
      AFSNumber: "262082",
      AFSName: "PURE COMMERCE PTY LIMITED",
    },
    {
      AFSNumber: "262091",
      AFSName: "WETHERILL, PAUL ",
    },
    {
      AFSNumber: "262861",
      AFSName: "CHARTER HALL FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "263623",
      AFSName: "MCLAREN, WILLIAM ",
    },
    {
      AFSNumber: "263710",
      AFSName: "TANGALOOMA TS LIMITED",
    },
    {
      AFSNumber: "263713",
      AFSName: "BARRISTERS' SICKNESS & ACCIDENT FUND PTY LTD",
    },
    {
      AFSNumber: "263876",
      AFSName:
        "FIRST AMERICAN TITLE INSURANCE COMPANY OF AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "264125",
      AFSName: "DWA MANAGED ACCOUNTS PTY LTD",
    },
    {
      AFSNumber: "264258",
      AFSName: "FINDLAY, IVOR ",
    },
    {
      AFSNumber: "264671",
      AFSName: "FITTON INSURANCE (BROKERS) AUSTRALIA PTY. LTD.",
    },
    {
      AFSNumber: "264682",
      AFSName: "BRISBANE CONVENTION CENTRE HOTEL (DEVELOPMENT) LIMITED",
    },
    {
      AFSNumber: "264772",
      AFSName: "GRANGE CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "266712",
      AFSName: "VENTUREAXESS FUND MANAGERS LIMITED",
    },
    {
      AFSNumber: "266807",
      AFSName: "CHIFLEY INVESTOR GROUP PTY LIMITED",
    },
    {
      AFSNumber: "267744",
      AFSName: "ST HILLIERS FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "267819",
      AFSName: "AUSWIDE MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "267899",
      AFSName: "PATERSONS ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "268411",
      AFSName: "OXFORD INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "268501",
      AFSName: "MARSHALL INVESTMENTS CREDIT SERVICES  PTY LTD",
    },
    {
      AFSNumber: "268672",
      AFSName: "ASSET SELECTION ADVISORS PTY. LIMITED",
    },
    {
      AFSNumber: "268726",
      AFSName: "COAST INSURANCE PTY LTD",
    },
    {
      AFSNumber: "269076",
      AFSName: "TROTSYND PTY LTD",
    },
    {
      AFSNumber: "269158",
      AFSName: "UHY HAINES NORTON CORPORATE FINANCE PTY LIMITED",
    },
    {
      AFSNumber: "269277",
      AFSName: "SAXILD, BRUCE EDMOND",
    },
    {
      AFSNumber: "269278",
      AFSName: "BELL POTTER NOMINEES LIMITED",
    },
    {
      AFSNumber: "269323",
      AFSName: "DFB (AUSTRALIA) PTY. LIMITED",
    },
    {
      AFSNumber: "269543",
      AFSName: "BUTLER SETTINERI SUPERANNUATION SERVICES PTY LTD",
    },
    {
      AFSNumber: "269743",
      AFSName: "CBH GRAIN PTY LTD",
    },
    {
      AFSNumber: "269820",
      AFSName: "BTCDANA AUST PTY LTD",
    },
    {
      AFSNumber: "269822",
      AFSName: "PROGRESSIVE MORTGAGE COMPANY LIMITED",
    },
    {
      AFSNumber: "269868",
      AFSName: "AUSTRALIAN FINANCIAL LICENCING GROUP PTY LTD",
    },
    {
      AFSNumber: "269926",
      AFSName: "BEERWORTH & PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "270413",
      AFSName: "HARMONY PROPERTY SYNDICATION PTY LTD",
    },
    {
      AFSNumber: "271438",
      AFSName: "MUNICIPAL ASSOCIATION OF VICTORIA",
    },
    {
      AFSNumber: "271471",
      AFSName: "ATTUARE PTY. LTD.",
    },
    {
      AFSNumber: "271837",
      AFSName: "PERSHING LLC",
    },
    {
      AFSNumber: "273228",
      AFSName: "BENTON ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "273320",
      AFSName: "AXA INVESTMENT MANAGERS AUSTRALIA LTD",
    },
    {
      AFSNumber: "273321",
      AFSName: "DIVERSA INSURANCE LIMITED",
    },
    {
      AFSNumber: "273364",
      AFSName: "K SELIKMAN & ASSOCIATES PTY LIMITED",
    },
    {
      AFSNumber: "273529",
      AFSName: "NAOS ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "273537",
      AFSName: "KEYSTONE FINANCIAL PLANNING PTY LIMITED",
    },
    {
      AFSNumber: "274063",
      AFSName: "THE FINANCIAL SERVICES MANAGEMENT & MARKETING NETWORK PTY LTD",
    },
    {
      AFSNumber: "274099",
      AFSName: "ARGONAUT SECURITIES PTY LIMITED",
    },
    {
      AFSNumber: "274331",
      AFSName: "OASIS FUND MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "274444",
      AFSName: "BENTLEYS (QLD) ADVISORY PTY LTD",
    },
    {
      AFSNumber: "274491",
      AFSName: "RESOLUTION CAPITAL LIMITED",
    },
    {
      AFSNumber: "274531",
      AFSName: "REAL CONSULTING SERVICES PTY LTD",
    },
    {
      AFSNumber: "274900",
      AFSName: "STATE STREET GLOBAL ADVISORS  AUSTRALIA SERVICES LIMITED",
    },
    {
      AFSNumber: "275101",
      AFSName: "PERENNIAL INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "276082",
      AFSName: "PROTECHT.ALM PTY LTD",
    },
    {
      AFSNumber: "276100",
      AFSName: "ACCOUNTANCY INSURANCE PTY LTD",
    },
    {
      AFSNumber: "276264",
      AFSName: "333 CAPITAL PTY LTD",
    },
    {
      AFSNumber: "276323",
      AFSName: "PITT CAPITAL PARTNERS LIMITED",
    },
    {
      AFSNumber: "276468",
      AFSName: "VERITA FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "276544",
      AFSName: "ETHICAL INVESTMENT ADVISERS PTY LTD",
    },
    {
      AFSNumber: "276569",
      AFSName: "AZURE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "276735",
      AFSName: "CANDOR FAMILY OFFICE PTY LTD",
    },
    {
      AFSNumber: "276771",
      AFSName: "CLARITY FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "276899",
      AFSName: "WINGATE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "276914",
      AFSName: "ASPIRE FINANCIAL CONSULTING PTY LTD",
    },
    {
      AFSNumber: "276918",
      AFSName: "FARRELLY RESEARCH & MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "277100",
      AFSName: "FALKINER GLOBAL INVESTORS PTY LTD",
    },
    {
      AFSNumber: "277313",
      AFSName: "MATIC CAPITAL PTY LTD",
    },
    {
      AFSNumber: "277318",
      AFSName: "EQUITY-ONE MORTGAGE FUND LIMITED",
    },
    {
      AFSNumber: "277357",
      AFSName: "ABACUS STORAGE FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "277493",
      AFSName: "DP WEALTH ADVISORY PTY LTD",
    },
    {
      AFSNumber: "277681",
      AFSName: "LIFE PLAN FP AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "277725",
      AFSName: "BJS INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "277737",
      AFSName: "REGAL FUNDS MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "277740",
      AFSName: "CVC PROPERTY GROUP PTY LTD",
    },
    {
      AFSNumber: "277780",
      AFSName: "REDGUM WEALTH GROUP PTY LTD",
    },
    {
      AFSNumber: "277842",
      AFSName: "WEBSTER HYDE HEATH INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "277860",
      AFSName: "BLUEPOINT CONSULTING PTY LIMITED",
    },
    {
      AFSNumber: "277933",
      AFSName: "MARKS HENDERSON FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "277935",
      AFSName: "DELTA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "278054",
      AFSName: "LCC ASIA PACIFIC PTY LIMITED",
    },
    {
      AFSNumber: "278161",
      AFSName: "THE COMPLETE PLANNER PTY LTD",
    },
    {
      AFSNumber: "278294",
      AFSName: "SAMUEL TERRY ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "278348",
      AFSName: "WILSON WHITE INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "278361",
      AFSName: "LIFESTYLE INVESTMENT PLANNING PTY LTD",
    },
    {
      AFSNumber: "278423",
      AFSName: "SIRA GROUP PTY LTD",
    },
    {
      AFSNumber: "278530",
      AFSName: "FRESHWATER FUNDS MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "278811",
      AFSName: "WEALTH SOLUTION PARTNERS PTY LTD",
    },
    {
      AFSNumber: "278856",
      AFSName: "ALLERON INVESTMENT MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "278937",
      AFSName: "THE ADVICE EXCHANGE PTY LTD",
    },
    {
      AFSNumber: "279022",
      AFSName: "CARLING CAPITAL PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "279099",
      AFSName: "ACNS CAPITAL MARKETS PTY LTD",
    },
    {
      AFSNumber: "279186",
      AFSName: "VANTAGE ASSET MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "279207",
      AFSName: "QUEST ASSET PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "279367",
      AFSName: "BUILDSAFE INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "279615",
      AFSName: "LIFEWEALTH PTY LTD",
    },
    {
      AFSNumber: "279796",
      AFSName: "HYDRO-ELECTRIC CORPORATION",
    },
    {
      AFSNumber: "279854",
      AFSName: "ASSOCIATED GENERAL & DEALER UNDERWRITING AGENCY PTY LTD",
    },
    {
      AFSNumber: "280061",
      AFSName: "LEVEL ONE FINANCIAL ADVISERS PTY LIMITED",
    },
    {
      AFSNumber: "280193",
      AFSName: "DUAL AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "280201",
      AFSName: "CHPW FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "280230",
      AFSName: "HARLOCK INVESTMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "280232",
      AFSName: "POOLE & PARTNERS INVESTMENT SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "280285",
      AFSName: "QUOTIENT CAPITAL PTY LTD",
    },
    {
      AFSNumber: "280372",
      AFSName: "SAXO CAPITAL MARKETS (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "280420",
      AFSName: "SHAREWISE COMPLIANCE AND ADMINISTRATION PTY LTD",
    },
    {
      AFSNumber: "280595",
      AFSName: "AP FINANCIAL SERVICES GROUP PTY LTD",
    },
    {
      AFSNumber: "280616",
      AFSName: "ABACUS AUSTRALIA LTD.",
    },
    {
      AFSNumber: "280881",
      AFSName: "D F S ADVISORY SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "280928",
      AFSName: "MONEYTAX FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "280970",
      AFSName: "PENDULUM CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "281052",
      AFSName: "HYPERION PROPERTY SYNDICATES LTD",
    },
    {
      AFSNumber: "281193",
      AFSName: "FIRST CAPITAL FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "281268",
      AFSName: "CONICKLAIRD PTY LTD",
    },
    {
      AFSNumber: "281326",
      AFSName: "NORTH RIDGE PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "281344",
      AFSName: "AFM INVESTMENT PARTNERS PTY LTD",
    },
    {
      AFSNumber: "281356",
      AFSName: "KEY ENERGY & RESOURCES PTY LTD",
    },
    {
      AFSNumber: "281394",
      AFSName: "CORE ADVISOR GROUP PTY LTD",
    },
    {
      AFSNumber: "281481",
      AFSName: "THE PORTLAND HOUSE GROUP PTY. LIMITED",
    },
    {
      AFSNumber: "281544",
      AFSName: "CHARTER HALL SOCIAL INFRASTRUCTURE LIMITED",
    },
    {
      AFSNumber: "281568",
      AFSName: "COLONIAL FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "281689",
      AFSName: "ALL RISK PROTECTION PTY LIMITED",
    },
    {
      AFSNumber: "281729",
      AFSName: "MASTER BUILDERS INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "281767",
      AFSName: "NORTHCAPE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "281846",
      AFSName: "PMCG PTY LTD",
    },
    {
      AFSNumber: "281904",
      AFSName: "GOENERGY PTY LTD",
    },
    {
      AFSNumber: "282033",
      AFSName: "DRANSFIELD MANAGEMENT SERVICES LIMITED",
    },
    {
      AFSNumber: "282153",
      AFSName: "SELECT EQUITIES PTY LTD",
    },
    {
      AFSNumber: "282189",
      AFSName: "TUDOR CAPITAL AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "282288",
      AFSName: "ROCKGLOBAL CAPITAL MARKETS PTY LTD",
    },
    {
      AFSNumber: "282335",
      AFSName: "MILL HILL CAPITAL PTY LTD",
    },
    {
      AFSNumber: "282590",
      AFSName: "RBC SECURITIES AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "283000",
      AFSName: "ELLERSTON CAPITAL LIMITED",
    },
    {
      AFSNumber: "283043",
      AFSName: "SUPERFAST AM PTY LTD",
    },
    {
      AFSNumber: "283119",
      AFSName: "IAM CAPITAL MARKETS LIMITED",
    },
    {
      AFSNumber: "283141",
      AFSName: "BENNETTO FINANCE PTY LTD",
    },
    {
      AFSNumber: "283290",
      AFSName: "FLUKES VALUE MANAGEMENT SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "283650",
      AFSName: "PROFESSIONAL FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "283777",
      AFSName: "LMI GROUP PTY LTD",
    },
    {
      AFSNumber: "284182",
      AFSName: "NATIONAL FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "284280",
      AFSName: "HMC PRIVATE CREDIT FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "284284",
      AFSName: "POTENTIA ENERGY MARKETS PTY LTD",
    },
    {
      AFSNumber: "284302",
      AFSName: "WHITES IFM PTY LTD",
    },
    {
      AFSNumber: "284316",
      AFSName: "INVESTMENT ADMINISTRATION SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "284336",
      AFSName: "MILLINIUM CAPITAL MANAGERS LIMITED",
    },
    {
      AFSNumber: "284342",
      AFSName: "SIMPLEX INSURANCE SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "284395",
      AFSName: "STOCKLAND MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "284404",
      AFSName: "IFM INVESTORS PTY LTD",
    },
    {
      AFSNumber: "284426",
      AFSName: "ENERGYAUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "284442",
      AFSName: "AZ SESTANTE LIMITED",
    },
    {
      AFSNumber: "284443",
      AFSName: "CARESUPER ADVICE PTY LTD",
    },
    {
      AFSNumber: "284492",
      AFSName: "ARTESIAN VENTURE PARTNERS PTY LTD",
    },
    {
      AFSNumber: "284621",
      AFSName: "MACQUARIE INFRASTRUCTURE MANAGEMENT (ASIA) PTY LIMITED",
    },
    {
      AFSNumber: "284807",
      AFSName: "BEAM CORP. PTY LIMITED",
    },
    {
      AFSNumber: "284901",
      AFSName: "DUNBAR HOUSE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "284909",
      AFSName: "HARVEST FINANCIAL GROUP PTY LIMITED",
    },
    {
      AFSNumber: "284956",
      AFSName: "CITIGROUP SECURITIES CLEARING AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "284969",
      AFSName: "ROMIAN PTY LIMITED",
    },
    {
      AFSNumber: "285043",
      AFSName: "CHAIRMONT CAPITAL PTY LTD",
    },
    {
      AFSNumber: "285413",
      AFSName: "JR TRADE PTY LTD",
    },
    {
      AFSNumber: "285456",
      AFSName: "AUSTRALIAN UNDERWRITERS PTY LTD",
    },
    {
      AFSNumber: "285503",
      AFSName: "ACP CORUM PTY LTD",
    },
    {
      AFSNumber: "285571",
      AFSName: "AUTO & GENERAL INSURANCE COMPANY LIMITED",
    },
    {
      AFSNumber: "285607",
      AFSName: "WESTOZ FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "285643",
      AFSName: "BEANSTALK INVESTMENT MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "286005",
      AFSName: "CAUSEWAY ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "286219",
      AFSName: "FOCUSED FINANCIAL ADVICE PTY LTD",
    },
    {
      AFSNumber: "286318",
      AFSName: "QUESTUS FUNDS MANAGEMENT LTD",
    },
    {
      AFSNumber: "286324",
      AFSName: "FINITY CONSULTING PTY LIMITED",
    },
    {
      AFSNumber: "286354",
      AFSName: "FIRST PRUDENTIAL MARKETS PTY LTD",
    },
    {
      AFSNumber: "286507",
      AFSName: "HADLEY GREEN SECURITIES PTY LTD",
    },
    {
      AFSNumber: "286510",
      AFSName: "LTG GOLD ROCK PTY LTD",
    },
    {
      AFSNumber: "286511",
      AFSName: "GPT RE LIMITED",
    },
    {
      AFSNumber: "286531",
      AFSName: "SWITZER FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "286596",
      AFSName: "LIBERTY FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "286655",
      AFSName: "PEPPER MONEY LIMITED",
    },
    {
      AFSNumber: "286660",
      AFSName: "PRIORITY ONE AGENCY SERVICES PTY LTD",
    },
    {
      AFSNumber: "286786",
      AFSName: "SENTRY FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "286798",
      AFSName: "NOBLEOAK SERVICES LIMITED",
    },
    {
      AFSNumber: "286854",
      AFSName: "CUSTOM ACCOUNTING PTY LTD",
    },
    {
      AFSNumber: "286869",
      AFSName: "VIRGIN MONEY FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "286904",
      AFSName: "HELM CAPITAL PTY LTD",
    },
    {
      AFSNumber: "286912",
      AFSName: "72 FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "287084",
      AFSName: "CCSL LIMITED",
    },
    {
      AFSNumber: "287322",
      AFSName: "BANK OF CHINA (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "287347",
      AFSName: "ALIGN FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "287367",
      AFSName: "SHARE PRICES AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "287378",
      AFSName: "LAURIE EBERT PTY LIMITED",
    },
    {
      AFSNumber: "287466",
      AFSName: "DEVWEST SECURITIES PTY LTD",
    },
    {
      AFSNumber: "287526",
      AFSName: "MICROEQUITIES ASSET MANAGEMENT GROUP LIMITED",
    },
    {
      AFSNumber: "287611",
      AFSName: "MCLEAN LESLIE & CHAMPION",
    },
    {
      AFSNumber: "287619",
      AFSName: "AUSTRALIAN FINANCIAL ADVISORY SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "287660",
      AFSName: "ETHOS FINANCIAL ADVISERS PTY LTD",
    },
    {
      AFSNumber: "287725",
      AFSName: "KEY CAPITAL LIMITED",
    },
    {
      AFSNumber: "287730",
      AFSName: "BSMN PARTNERSHIP",
    },
    {
      AFSNumber: "287804",
      AFSName: "MONEYWISE PERSONAL FINANCIAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "287846",
      AFSName: "AIMS SECURITISATION PTY LIMITED",
    },
    {
      AFSNumber: "288132",
      AFSName: "MYCFA - MY CHIEF FINANCIAL ADVISOR AND STRATEGIST PTY. LTD.",
    },
    {
      AFSNumber: "288213",
      AFSName: "THOROUGHBRED TRAINERS SERVICE CENTRE LTD",
    },
    {
      AFSNumber: "288290",
      AFSName: "WIDCAP SECURITIES PTY. LTD.",
    },
    {
      AFSNumber: "288298",
      AFSName: "PORTNORDICA LIMITED",
    },
    {
      AFSNumber: "288303",
      AFSName: "ALKIMIA FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "288318",
      AFSName: "IMPERIAL PACIFIC ASSET MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "288412",
      AFSName: "KATANA ASSET MANAGEMENT LTD",
    },
    {
      AFSNumber: "288421",
      AFSName: "LIFESTYLE ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "288519",
      AFSName: "SUMITOMO MITSUI BANKING CORPORATION",
    },
    {
      AFSNumber: "288723",
      AFSName: "WESTFIELD GIFT CARDS PTY LIMITED",
    },
    {
      AFSNumber: "289009",
      AFSName: "KEMOSABE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "289017",
      AFSName: "FIRST SENTIER INVESTORS (AUSTRALIA) IM LTD",
    },
    {
      AFSNumber: "289100",
      AFSName: "GOODMAN FUNDS MANAGEMENT AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "289244",
      AFSName: "GROWTHPOINT INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "289358",
      AFSName: "NEXIA PERTH CORPORATE FINANCE PTY LTD",
    },
    {
      AFSNumber: "289407",
      AFSName: "BYRON CAPITAL PTY LTD",
    },
    {
      AFSNumber: "289450",
      AFSName: "INSURANCE FACILITATORS PTY LTD",
    },
    {
      AFSNumber: "289559",
      AFSName: "HUNTER REDDING FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "289677",
      AFSName: "CONNECT ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "289762",
      AFSName: "NEXT CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "289791",
      AFSName: "SOCIETE GENERALE SECURITIES AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "289811",
      AFSName: "AVOCA GROUP PTY LTD",
    },
    {
      AFSNumber: "289817",
      AFSName: "ARGUS PARTNERS MANAGED INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "289821",
      AFSName: "BELL PARTNERSHIP FP PTY LTD",
    },
    {
      AFSNumber: "289898",
      AFSName: "FLOTILLA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "290054",
      AFSName: "ALPHA STRUCTURED INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "290098",
      AFSName: "TANARRA CAPITAL AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "290328",
      AFSName: "A.C.N. 114 733 569 LIMITED",
    },
    {
      AFSNumber: "290368",
      AFSName: "IMB SECURITISATION SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "290518",
      AFSName: "PEN UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "290600",
      AFSName: "FIRSTMAC LIMITED",
    },
    {
      AFSNumber: "290618",
      AFSName: "HALES DOUGLASS FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "290771",
      AFSName: "STRATEGY FIRST FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "290776",
      AFSName: "ADVICEGPS PTY LTD",
    },
    {
      AFSNumber: "290909",
      AFSName: "IRONGATE FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "290932",
      AFSName: "VERITY CAPITAL MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "290934",
      AFSName: "PROVIDUS CAPITAL PTY LTD",
    },
    {
      AFSNumber: "290981",
      AFSName: "COMPOUND CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "291102",
      AFSName: "AUSTRALIAN HERITAGE GROUP PTY LTD",
    },
    {
      AFSNumber: "291195",
      AFSName: "SMSF ADMINISTRATION SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "291214",
      AFSName: "THYRA INVESTMENT MANAGEMENT PTY. LTD.",
    },
    {
      AFSNumber: "291307",
      AFSName: "SOLUTIONS 2 WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "291313",
      AFSName: "AMERICAN EXPRESS AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "291314",
      AFSName: "ALTX FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "291356",
      AFSName: "MCCA ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "291363",
      AFSName: "GANES CAPITAL MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "291385",
      AFSName: "PKF PERTH CAPITAL PTY LTD",
    },
    {
      AFSNumber: "291390",
      AFSName: "CFMG EQUITY AND INCOME FUNDS LIMITED",
    },
    {
      AFSNumber: "291459",
      AFSName: "CHIEF TRADE CREDIT INSURANCE PTY LIMITED",
    },
    {
      AFSNumber: "291466",
      AFSName: "HMC CAPITAL AFSL 1 PTY LTD",
    },
    {
      AFSNumber: "291471",
      AFSName: "DIRECT FX LIMITED",
    },
    {
      AFSNumber: "291522",
      AFSName: "ASR UNDERWRITING AGENCIES PTY LTD",
    },
    {
      AFSNumber: "291523",
      AFSName: "AXIS FINANCIAL ADVISERS PTY LTD",
    },
    {
      AFSNumber: "291570",
      AFSName: "PREMIUM CHINA FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "291655",
      AFSName: "TECHNICAL INVESTING PTY LTD",
    },
    {
      AFSNumber: "291787",
      AFSName: "SA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "291813",
      AFSName: "PETER AND SUSAN JONES TA PAGASA EXPRESS",
    },
    {
      AFSNumber: "291872",
      AFSName: "ACADIAN ASSET MANAGEMENT (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "291954",
      AFSName: "LOCKTON COMPANIES AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "292155",
      AFSName: "MACQUARIE REAL ESTATE MANAGEMENT (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "292168",
      AFSName: "NOAH'S RULE PTY LTD",
    },
    {
      AFSNumber: "292177",
      AFSName: "FOUR HATS CAPITAL PTY LTD",
    },
    {
      AFSNumber: "292186",
      AFSName: "THE UNITING CHURCH (N S W) TRUST ASSOCIATION LIMITED",
    },
    {
      AFSNumber: "292281",
      AFSName: "RISK PARTNERS PTY LTD",
    },
    {
      AFSNumber: "292298",
      AFSName: "SAKKARA INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "292464",
      AFSName: "TW FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "292469",
      AFSName: "CORE VALUE ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "292516",
      AFSName: "DOMAIN CAPITAL PTY. LTD.",
    },
    {
      AFSNumber: "292523",
      AFSName: "GRANGE INSURANCE SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "292528",
      AFSName: "NBFI SECURED INVESTMENTS LTD",
    },
    {
      AFSNumber: "292674",
      AFSName: "TRIDENT CAPITAL PTY LTD",
    },
    {
      AFSNumber: "292888",
      AFSName: "TAXI CARE CLUB LIMITED",
    },
    {
      AFSNumber: "292925",
      AFSName: "BEST INTEREST ADVICE PTY LTD",
    },
    {
      AFSNumber: "293334",
      AFSName: "GRIMSEY WEALTH PTY LTD",
    },
    {
      AFSNumber: "293340",
      AFSName: "AWARE SUPER PTY LTD",
    },
    {
      AFSNumber: "293538",
      AFSName: "PDFP PTY LTD",
    },
    {
      AFSNumber: "293586",
      AFSName: "LEADENHALL CORPORATE ADVISORY PTY LTD",
    },
    {
      AFSNumber: "293636",
      AFSName: "BP ENERGY ASIA PTE. LIMITED",
    },
    {
      AFSNumber: "293655",
      AFSName: "MAINSTREET PARTNERS PTY LTD",
    },
    {
      AFSNumber: "293734",
      AFSName: "CHURCHILL SECURITIES PTY LTD",
    },
    {
      AFSNumber: "293770",
      AFSName: "OASIS INSURANCE PTY LTD",
    },
    {
      AFSNumber: "293802",
      AFSName: "BARLINGS CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "293846",
      AFSName: "JALANDONI MONEY CHANGER PTY LIMITED",
    },
    {
      AFSNumber: "293876",
      AFSName: "ECON FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "293987",
      AFSName: "A.C.N. 115 965 609 PTY LTD",
    },
    {
      AFSNumber: "294098",
      AFSName: "DAISH & CO PTY LTD",
    },
    {
      AFSNumber: "294138",
      AFSName: "MONDARI CAPITAL GROUP PTY LTD",
    },
    {
      AFSNumber: "294147",
      AFSName: "UNITING ETHICAL INVESTORS LIMITED",
    },
    {
      AFSNumber: "294171",
      AFSName: "BEO - EXPORT AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "294313",
      AFSName: "SURA PTY LTD",
    },
    {
      AFSNumber: "294368",
      AFSName: "NORTHWARD CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "294393",
      AFSName: "EAST WEST CAPITAL LIMITED",
    },
    {
      AFSNumber: "294398",
      AFSName: "PIER CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "294595",
      AFSName: "SIRVA PTY LTD",
    },
    {
      AFSNumber: "294848",
      AFSName: "CPS CAPITAL GROUP PTY LTD",
    },
    {
      AFSNumber: "295142",
      AFSName: "PACIFIC CUSTODIANS PTY LIMITED",
    },
    {
      AFSNumber: "295436",
      AFSName: "WHITE GROUP (VIC) PTY LTD",
    },
    {
      AFSNumber: "295473",
      AFSName: "BURNETT INSURANCE PTY LTD",
    },
    {
      AFSNumber: "295642",
      AFSName: "CHALLENGER RETIREMENT AND INVESTMENT SERVICES LIMITED",
    },
    {
      AFSNumber: "295699",
      AFSName: "38TH PARALLEL PTY LTD",
    },
    {
      AFSNumber: "295814",
      AFSName: "BAILLIE ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "295872",
      AFSName: "PKF CORPORATE FINANCE (NSW) PTY LIMITED",
    },
    {
      AFSNumber: "295887",
      AFSName: "THE OAKTOWER PARTNERSHIP PTY LTD",
    },
    {
      AFSNumber: "295894",
      AFSName: "LONDON AUSTRALIA UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "296023",
      AFSName: "MILES ADVISORY PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "296152",
      AFSName: "BENNELONG PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "296182",
      AFSName: "LIFE FINANCIAL PLANNERS PTY LTD",
    },
    {
      AFSNumber: "296193",
      AFSName: "NEWMARKET GRANDWEST PTY LTD",
    },
    {
      AFSNumber: "296198",
      AFSName: "PETERSMCKEOWN PTY LTD",
    },
    {
      AFSNumber: "296209",
      AFSName: "SOUTHSIDE INSURANCE BROKERS PTY LIMITED",
    },
    {
      AFSNumber: "296337",
      AFSName: "FIFE CAPITAL MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "296466",
      AFSName: "EDEN ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "296559",
      AFSName: "ALLIANZ AUSTRALIA LIFE INSURANCE LIMITED",
    },
    {
      AFSNumber: "296637",
      AFSName: "JOLIMONT CAPITAL PTY LTD",
    },
    {
      AFSNumber: "296737",
      AFSName: "INSURANCE SERVICES AND MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "296758",
      AFSName: "MURDOCH CLARKE MORTGAGE MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "296805",
      AFSName: "DLS MARKETS (AUST) PTY LTD",
    },
    {
      AFSNumber: "296806",
      AFSName: "BENNELONG FUNDS MANAGEMENT LTD",
    },
    {
      AFSNumber: "296861",
      AFSName: "INVESTOR WEALTH PTY LTD",
    },
    {
      AFSNumber: "296874",
      AFSName: "WAM GLOBAL GROWTH FUND PTY LIMITED",
    },
    {
      AFSNumber: "296877",
      AFSName: "LEMESSURIER SECURITIES PTY LTD",
    },
    {
      AFSNumber: "296890",
      AFSName: "SYDNEY CAPITAL PARTNERS",
    },
    {
      AFSNumber: "297008",
      AFSName: "INSTITUTIONAL SHAREHOLDER SERVICES (AUSTRALIA) PTY. LTD.",
    },
    {
      AFSNumber: "297042",
      AFSName: "ONE MANAGED INVESTMENT FUNDS LIMITED",
    },
    {
      AFSNumber: "297043",
      AFSName: "VERITAS SECURITIES LIMITED",
    },
    {
      AFSNumber: "297069",
      AFSName: "ANDIKA PTY LTD",
    },
    {
      AFSNumber: "297161",
      AFSName: "ROCKLANDS CORPORATE ADVISORY SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "297276",
      AFSName: "PARAGEM PTY LIMITED",
    },
    {
      AFSNumber: "297283",
      AFSName: "ODYSSEY CAPITAL FUNDS MANAGEMENT LTD",
    },
    {
      AFSNumber: "297298",
      AFSName: "DIOGENES RESEARCH PTY LTD",
    },
    {
      AFSNumber: "297330",
      AFSName: "KINGSTON FINANCIAL PTY LIMITED",
    },
    {
      AFSNumber: "297331",
      AFSName: "CANTERBURY PARTNERS PTY LTD",
    },
    {
      AFSNumber: "297385",
      AFSName: "ATTUNGA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "297465",
      AFSName: "PARADIGM WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "297499",
      AFSName: "ECHUCA TRADING PTY LTD",
    },
    {
      AFSNumber: "297851",
      AFSName: "BPC SECURITIES PTY LIMITED",
    },
    {
      AFSNumber: "297950",
      AFSName: "VIRIATHUS CAPITAL PTY LTD",
    },
    {
      AFSNumber: "297956",
      AFSName: "PRAEMIUM AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "298171",
      AFSName: "GENERATION SECURITIES PTY LTD",
    },
    {
      AFSNumber: "298210",
      AFSName: "SPRING STREET ASSET MANAGEMENT LTD",
    },
    {
      AFSNumber: "298221",
      AFSName: "FINANCIAL MARKETS (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "298248",
      AFSName: "GPT FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "298311",
      AFSName: "FORREST CAPITAL PTY LTD",
    },
    {
      AFSNumber: "298313",
      AFSName: "SOUTHMORE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "298349",
      AFSName: "URE LYNAM FINANCIAL SERVICES PTY. LIMITED",
    },
    {
      AFSNumber: "298398",
      AFSName: "ANTIPODEAN CAPITAL MANAGEMENT PTY. LIMITED",
    },
    {
      AFSNumber: "298444",
      AFSName: "STEADFAST ART PTY LTD",
    },
    {
      AFSNumber: "298445",
      AFSName: "BARWON INVESTMENT PARTNERS PTY LTD",
    },
    {
      AFSNumber: "298464",
      AFSName: "BINFINITY SECURITIES LTD",
    },
    {
      AFSNumber: "298480",
      AFSName: "STRUCTURED INVESTMENT SOLUTIONS PTY LIMITED",
    },
    {
      AFSNumber: "298487",
      AFSName: "ALLAN GRAY AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "298626",
      AFSName: "IRONBARK ASSET MANAGEMENT (FUND SERVICES) LIMITED",
    },
    {
      AFSNumber: "298710",
      AFSName: "QIC PRIVATE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "298750",
      AFSName: "PONSFORD, DEREK MICHAEL",
    },
    {
      AFSNumber: "298757",
      AFSName: "CATALYST INVESTMENT MANAGERS PTY LIMITED",
    },
    {
      AFSNumber: "298851",
      AFSName: "SHEPHERD-GRAY PTY LTD",
    },
    {
      AFSNumber: "298902",
      AFSName: "SHED ENTERPRISES PTY LIMITED",
    },
    {
      AFSNumber: "298916",
      AFSName: "DALE ADVISERS PTY LTD",
    },
    {
      AFSNumber: "298979",
      AFSName: "TRIDENT FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "299023",
      AFSName: "BBB CAPITAL PTY LTD",
    },
    {
      AFSNumber: "299054",
      AFSName: "MCMILLAN SHAKESPEARE LIMITED",
    },
    {
      AFSNumber: "299074",
      AFSName: "QUATTRO RE LIMITED",
    },
    {
      AFSNumber: "299171",
      AFSName: "ACORN FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "299325",
      AFSName: "MAIDEN CAPITAL PTY LTD",
    },
    {
      AFSNumber: "299352",
      AFSName: "SCOPE PROPERTY GROUP PTY LTD",
    },
    {
      AFSNumber: "299767",
      AFSName: "FOUNDEVER FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "299812",
      AFSName: "RICARD SECURITIES PTY LTD",
    },
    {
      AFSNumber: "299814",
      AFSName: "I BROKER PTY. LTD.",
    },
    {
      AFSNumber: "299900",
      AFSName: "UIIT PTY LTD",
    },
    {
      AFSNumber: "299940",
      AFSName: "NAVIGATE FUNDS MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "300038",
      AFSName: "SUMMERHILL FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "300250",
      AFSName: "ARGON CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "300302",
      AFSName: "PHOENIX PORTFOLIOS PTY LTD",
    },
    {
      AFSNumber: "300336",
      AFSName: "CRESCENT CAPITAL PARTNERS MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "300337",
      AFSName: "ONE FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "300442",
      AFSName: "THE VILLAGE BUILDING CO. LIMITED",
    },
    {
      AFSNumber: "300458",
      AFSName: "KIDDER WILLIAMS LIMITED",
    },
    {
      AFSNumber: "300641",
      AFSName: "FLEMING FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "300692",
      AFSName: "ALTA INVESTMENT MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "300767",
      AFSName: "TIGER BROKERS (AU) PTY LIMITED",
    },
    {
      AFSNumber: "300776",
      AFSName: "PINNACLE EQUITIES PTY LTD",
    },
    {
      AFSNumber: "300810",
      AFSName: "QUILL GROUP FINANCIAL PLANNERS PTY LTD",
    },
    {
      AFSNumber: "300842",
      AFSName: "TIBRA TRADING PTY LIMITED",
    },
    {
      AFSNumber: "300878",
      AFSName: "CONNECTUS AFSL LTD",
    },
    {
      AFSNumber: "301210",
      AFSName: "WP INVEST PTY LTD",
    },
    {
      AFSNumber: "301294",
      AFSName: "PLATYPUS ASSET MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "301359",
      AFSName: "PBF (AUSTRALIA) LTD.",
    },
    {
      AFSNumber: "301441",
      AFSName: "SOUTHERN CROSS VENTURE PARTNERS PTY LTD",
    },
    {
      AFSNumber: "301464",
      AFSName: "PROVEN THOROUGHBREDS PTY. LIMITED",
    },
    {
      AFSNumber: "301556",
      AFSName: "NEW FORESTS ADVISORY PTY LIMITED",
    },
    {
      AFSNumber: "301617",
      AFSName: "CATLIN AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "301658",
      AFSName: "DNR AFSL PTY LTD",
    },
    {
      AFSNumber: "301682",
      AFSName: "AUSTRALIAN STOCK REPORT PTY LIMITED",
    },
    {
      AFSNumber: "301712",
      AFSName: "ASPIRE RETIRE PTY LTD",
    },
    {
      AFSNumber: "301737",
      AFSName: "THE HONGKONG AND SHANGHAI BANKING CORPORATION LIMITED",
    },
    {
      AFSNumber: "301796",
      AFSName: "MARKETSMART COMMODITY MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "301808",
      AFSName: "PHILO CAPITAL ADVISERS PTY LTD",
    },
    {
      AFSNumber: "301912",
      AFSName: "MEDICAL INDEMNITY PROTECTION SOCIETY LIMITED",
    },
    {
      AFSNumber: "302051",
      AFSName: "AIMS CAPITAL MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "302182",
      AFSName: "RURAL AFFINITY INSURANCE AGENCY PTY LTD",
    },
    {
      AFSNumber: "302484",
      AFSName: "SPORTS UNDERWRITING AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "302520",
      AFSName: "QUANTA INSURANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "302522",
      AFSName: "COVERFORCE INSURANCE BROKING PTY LTD",
    },
    {
      AFSNumber: "302538",
      AFSName: "FALCON CAPITAL LIMITED",
    },
    {
      AFSNumber: "302670",
      AFSName: "TUPICOFFS PTY LTD",
    },
    {
      AFSNumber: "302802",
      AFSName: "WESTFERRY OPERATIONS PTY LTD",
    },
    {
      AFSNumber: "302929",
      AFSName: "FINANCIAL CLARITY PTY LIMITED",
    },
    {
      AFSNumber: "303000",
      AFSName: "THE WEALTH PARTNERSHIP PTY LTD",
    },
    {
      AFSNumber: "303051",
      AFSName: "URQUHART SEXTON FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "303137",
      AFSName: "LIBERTY FIDUCIARY LTD",
    },
    {
      AFSNumber: "303138",
      AFSName: "ABBOTTS WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "303160",
      AFSName: "WESTERN ASSET MANAGEMENT COMPANY PTY LTD",
    },
    {
      AFSNumber: "303209",
      AFSName: "AUSTRALIAN INVESTMENT COMPANY SERVICES LIMITED",
    },
    {
      AFSNumber: "303253",
      AFSName: "APEX FUND SERVICES PTY LTD",
    },
    {
      AFSNumber: "303260",
      AFSName: "MAJELLA WEALTH ADVISERS PTY LIMITED",
    },
    {
      AFSNumber: "303263",
      AFSName: "PACIFIC CAPITAL PARTNERS LIMITED",
    },
    {
      AFSNumber: "303566",
      AFSName: "DRAUPNER INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "303903",
      AFSName: "GREENCAPE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "303969",
      AFSName: "CRABB TUDER FINANCIAL SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "304008",
      AFSName: "PEAK INVESTMENT HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "304301",
      AFSName: "MAGELLAN ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "304366",
      AFSName: "AAA PRIVATE WEALTH ADVISORS PTY LTD",
    },
    {
      AFSNumber: "304542",
      AFSName: "RESPONSIBLE ENTITY PARTNERS LIMITED",
    },
    {
      AFSNumber: "304872",
      AFSName: "NACORA INSURANCE SERVICES PTY LTD",
    },
    {
      AFSNumber: "304962",
      AFSName: "PAYPAL AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "305391",
      AFSName: "MAGIC MILLIONS INSURANCE BROKERS PTY LIMITED",
    },
    {
      AFSNumber: "305408",
      AFSName: "2MG ASSET MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "305429",
      AFSName: "GALILEO JAPAN FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "305491",
      AFSName: "PROFESSIONAL SERVICES CORPORATION PTY LTD",
    },
    {
      AFSNumber: "305570",
      AFSName: "SUPRA CAPITAL LTD",
    },
    {
      AFSNumber: "305573",
      AFSName: "EMINENCE GLOBAL ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "305603",
      AFSName: "AQR PTY LIMITED",
    },
    {
      AFSNumber: "305604",
      AFSName: "ACCLAIM MANAGEMENT GROUP LIMITED",
    },
    {
      AFSNumber: "305740",
      AFSName: "TCAP INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "305802",
      AFSName: "ATC INSURANCE SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "305908",
      AFSName: "ROCKCAND CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "305918",
      AFSName: "CENTRAL SECURITIES PTY LTD",
    },
    {
      AFSNumber: "305927",
      AFSName: "PFG PTY. LTD.",
    },
    {
      AFSNumber: "306207",
      AFSName: "CHURCHILL CAPITAL AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "306326",
      AFSName: "BENSONS FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "306396",
      AFSName: "J.D.I. (YOUNG) PTY. LIMITED",
    },
    {
      AFSNumber: "306458",
      AFSName: "ERGON ENERGY QUEENSLAND PTY LTD",
    },
    {
      AFSNumber: "306534",
      AFSName: "BHG ONE PTY LTD",
    },
    {
      AFSNumber: "306552",
      AFSName: "RED ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "306630",
      AFSName: "GANTFM PTY LIMITED",
    },
    {
      AFSNumber: "306691",
      AFSName: "CORPORATE AND COMMERCIAL INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "306803",
      AFSName: "CASHEL FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "306837",
      AFSName: "PACIFIC ROAD CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "306931",
      AFSName: "INTEGRATED INSURANCE SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "306986",
      AFSName: "BACK9 CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "306994",
      AFSName: "DORADO FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "307040",
      AFSName: "TITAN SECURITIES PTY LTD",
    },
    {
      AFSNumber: "307070",
      AFSName: "AROWANA CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "307083",
      AFSName: "PROFESSIONAL & RELIABLE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "307086",
      AFSName: "MACQUARIE AGRICULTURAL FUNDS MANAGEMENT LTD",
    },
    {
      AFSNumber: "307107",
      AFSName: "INTERNATIONAL IMMOBILIARI (AUSTRALIA) PTY LIMITED",
    },
    {
      AFSNumber: "307169",
      AFSName: "FITZWEALTH FINANCIAL ADVICE PTY LTD",
    },
    {
      AFSNumber: "307209",
      AFSName: "TURNER SECURITIES LTD",
    },
    {
      AFSNumber: "307308",
      AFSName: "ASCENDIA PTY LTD",
    },
    {
      AFSNumber: "307377",
      AFSName: "TRIPLE CROWN BLOODSTOCK PTY LTD",
    },
    {
      AFSNumber: "307379",
      AFSName: "ALPHA INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "307398",
      AFSName: "GRANNUS SECURITIES PTY LTD",
    },
    {
      AFSNumber: "307501",
      AFSName: "CGI GLASS LEWIS PTY LIMITED",
    },
    {
      AFSNumber: "307650",
      AFSName: "POTTINGER CO PTY LTD",
    },
    {
      AFSNumber: "307654",
      AFSName: "EDGEWISE INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "307706",
      AFSName: "APP SECURITIES PTY LTD",
    },
    {
      AFSNumber: "307723",
      AFSName: "TAURUS FUNDS MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "307727",
      AFSName: "CLEARBRIDGE INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "307949",
      AFSName: "EYE MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "308070",
      AFSName: "STERLING EQUITY PTY LTD",
    },
    {
      AFSNumber: "308076",
      AFSName: "PROFESSIONAL RISK UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "308159",
      AFSName: "ACCM AUS PTY LIMITED",
    },
    {
      AFSNumber: "308200",
      AFSName: "CLIME ADVICE PTY LTD",
    },
    {
      AFSNumber: "308241",
      AFSName: "MA MOELIS AUSTRALIA SECURITIES PTY LTD",
    },
    {
      AFSNumber: "308275",
      AFSName: "PERSONAL ASSET SERVICES PTY LTD",
    },
    {
      AFSNumber: "308279",
      AFSName: "EARLYPAY MANAGEMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "308297",
      AFSName: "RENAISSANCE WEALTH ADVISORS PTY LTD",
    },
    {
      AFSNumber: "308461",
      AFSName: "NIB TRAVEL SERVICES (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "308697",
      AFSName: "DV01 FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "308705",
      AFSName: "AUSTRALIAN OWNER BUILDERS INSURANCE SERVICES PTY LTD",
    },
    {
      AFSNumber: "308725",
      AFSName: "STRATEGY FIRST FINANCIAL PLANNERS PTY LTD",
    },
    {
      AFSNumber: "308836",
      AFSName: "AGF INTERNATIONAL ADVISORS COMPANY LIMITED",
    },
    {
      AFSNumber: "308837",
      AFSName: "TENNYSON CAPITAL PTY. LIMITED",
    },
    {
      AFSNumber: "308868",
      AFSName: "ONEVUE WEALTH SERVICES LTD",
    },
    {
      AFSNumber: "308870",
      AFSName: "KAPSTREAM CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "308953",
      AFSName: "MLC ASSET MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "308971",
      AFSName: "SALTER BROTHERS ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "308983",
      AFSName: "LENDLEASE RESPONSIBLE ENTITY LIMITED",
    },
    {
      AFSNumber: "309265",
      AFSName: "INSURANCE BROKERS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "309481",
      AFSName: "ALEXIS WEALTH ADVISORS PTY LTD",
    },
    {
      AFSNumber: "309763",
      AFSName: "STRATOS TRADING PTY. LIMITED",
    },
    {
      AFSNumber: "309866",
      AFSName: "PELLICANO FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "309870",
      AFSName: "JGS ADVISORY PTY LIMITED",
    },
    {
      AFSNumber: "309883",
      AFSName: "COMPUTERSHARE PLAN MANAGERS PTY LTD",
    },
    {
      AFSNumber: "309884",
      AFSName: "CPU SHARE PLANS PTY LIMITED",
    },
    {
      AFSNumber: "309996",
      AFSName: "INSIGHT INVESTMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "310242",
      AFSName: "ANACACIA CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "310441",
      AFSName: "VILLAWOOD ONE PTY LTD",
    },
    {
      AFSNumber: "310497",
      AFSName: "RATCH-AUSTRALIA INFRASTRUCTURE MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "310545",
      AFSName: "BELLROCK BROKING PTY LIMITED",
    },
    {
      AFSNumber: "310607",
      AFSName: "GMP FINANCIAL PTY LIMITED",
    },
    {
      AFSNumber: "310688",
      AFSName: "REDGATE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "310689",
      AFSName: "LIGHTHOUSE INFRASTRUCTURE MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "310789",
      AFSName: "GCC CORPORATE GROUP PTY LTD",
    },
    {
      AFSNumber: "311062",
      AFSName: "BAPTIST FINANCIAL SERVICES AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "311127",
      AFSName: "SOUTHERN CROSS FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "311128",
      AFSName: "REDZED LENDING SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "311489",
      AFSName: "ADVANTAGE ADVISORS CORPORATE PTY LTD",
    },
    {
      AFSNumber: "311549",
      AFSName: "ALBANY CAPITAL INVESTORS PTY LTD",
    },
    {
      AFSNumber: "311662",
      AFSName: "NOLAN SECURITIES PTY LTD",
    },
    {
      AFSNumber: "311705",
      AFSName: "CAPITAL VALUE SECURITIES PTY LTD",
    },
    {
      AFSNumber: "311711",
      AFSName: "ARAGON CAPITAL PTY LTD",
    },
    {
      AFSNumber: "311718",
      AFSName: "RISE FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "311720",
      AFSName: "E.F.D.B. PTY LIMITED",
    },
    {
      AFSNumber: "311737",
      AFSName: "WHISTLE FUNDS MANAGEMENT COMPANY PTY LIMITED",
    },
    {
      AFSNumber: "311831",
      AFSName: "INSURANCE SPECIALIST GROUP PTY LTD",
    },
    {
      AFSNumber: "311835",
      AFSName: "ELEMENT CAPITAL PTY LTD",
    },
    {
      AFSNumber: "311948",
      AFSName: "PRIMEBROKER SECURITIES LTD",
    },
    {
      AFSNumber: "312032",
      AFSName: "PROPEL INVESTMENTS PTY LIMITED",
    },
    {
      AFSNumber: "312047",
      AFSName: "PROFESSIONAL WEALTH SERVICES PTY LTD",
    },
    {
      AFSNumber: "312078",
      AFSName: "AUTOMATIC DATA PROCESSING LIMITED",
    },
    {
      AFSNumber: "312108",
      AFSName: "FRASERS PROPERTY FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "312247",
      AFSName: "AGP INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "312415",
      AFSName: "IPM FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "312489",
      AFSName: "MW PLANNING PTY LTD",
    },
    {
      AFSNumber: "312525",
      AFSName: "LIQUIDNET AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "312912",
      AFSName: "MORTGAGE HOUSE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "312916",
      AFSName: "AUSTRALIAN CENTRAL SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "313016",
      AFSName: "AETOS CAPITAL GROUP PTY LTD",
    },
    {
      AFSNumber: "313033",
      AFSName: "ARIADNE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "313143",
      AFSName: "ADELAIDE EQUITY PARTNERS LIMITED",
    },
    {
      AFSNumber: "313203",
      AFSName: "CBRE INVESTMENT MANAGEMENT LISTED REAL ASSETS PTY LTD",
    },
    {
      AFSNumber: "313207",
      AFSName: "HARPER FINANCIAL GROUP PTY. LTD.",
    },
    {
      AFSNumber: "313217",
      AFSName: "QI FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "313389",
      AFSName: "BRAVIUM PTY LTD",
    },
    {
      AFSNumber: "313422",
      AFSName: "AXIOM WEALTH PTY. LTD.",
    },
    {
      AFSNumber: "313465",
      AFSName: "HOLLAND INSURANCE BROKERS (QLD) PTY LTD",
    },
    {
      AFSNumber: "313618",
      AFSName: "NORTHSTAR FINANCIAL ADVISERS PTY LTD",
    },
    {
      AFSNumber: "313681",
      AFSName: "INTERNATIONAL OTHELLO CAPITAL PTY LTD",
    },
    {
      AFSNumber: "313890",
      AFSName: "DEFENCE HEALTH LIMITED",
    },
    {
      AFSNumber: "313995",
      AFSName: "M2 ENERGY PTY LTD",
    },
    {
      AFSNumber: "314018",
      AFSName: "COMMONWEALTH PRIVATE LIMITED",
    },
    {
      AFSNumber: "314176",
      AFSName: "MIRAMAR UNDERWRITING AGENCY PTY LIMITED",
    },
    {
      AFSNumber: "314182",
      AFSName: "MORGAN STANLEY INVESTMENT MANAGEMENT (AUSTRALIA) PTY LIMITED",
    },
    {
      AFSNumber: "314302",
      AFSName: "L1 CAPITAL PTY LTD",
    },
    {
      AFSNumber: "314341",
      AFSName: "THIRD PARTY PLATFORM PTY LTD",
    },
    {
      AFSNumber: "314353",
      AFSName: "DIVERSUS INVESTMENT ADVISERS PTY LIMITED",
    },
    {
      AFSNumber: "314357",
      AFSName: "PAYCLEAR SERVICES PTY LTD",
    },
    {
      AFSNumber: "314365",
      AFSName: "BALANCED INVESTMENT STRATEGIES PTY LTD",
    },
    {
      AFSNumber: "314416",
      AFSName: "MACQUARIE CAPITAL (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "314585",
      AFSName: "JFM PTY. LTD.",
    },
    {
      AFSNumber: "314614",
      AFSName: "AMALGAMATED AUSTRALIAN INVESTMENT SOLUTIONS PTY LIMITED",
    },
    {
      AFSNumber: "314848",
      AFSName: "CITTA FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "314872",
      AFSName: "WEALTH FOCUS PTY. LTD.",
    },
    {
      AFSNumber: "314889",
      AFSName: "5 WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "314970",
      AFSName: "THE NORTHERN TRUST COMPANY",
    },
    {
      AFSNumber: "315163",
      AFSName: "MAYFIELD INVESTMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "315235",
      AFSName: "TEMPLAR CORPORATE PTY LTD",
    },
    {
      AFSNumber: "315347",
      AFSName: "TREASURY SERVICES GROUP PTY LTD",
    },
    {
      AFSNumber: "315388",
      AFSName: "EZI MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "315598",
      AFSName: "THE PRACTICE WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "315794",
      AFSName: "E-QUINE INSURANCE SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "315809",
      AFSName: "TASMAN CAPITAL INVESTMENTS (AUSTRALIA) PTY LIMITED",
    },
    {
      AFSNumber: "316158",
      AFSName: "BDO CORPORATE FINANCE (WA) PTY LTD",
    },
    {
      AFSNumber: "316409",
      AFSName: "GROWTHPOINT PROPERTIES AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "316455",
      AFSName: "PENDAL INSTITUTIONAL LIMITED",
    },
    {
      AFSNumber: "316511",
      AFSName: "YOUI PTY LTD",
    },
    {
      AFSNumber: "316516",
      AFSName: "AG CONCEPTS UNLIMITED PTY LTD",
    },
    {
      AFSNumber: "316809",
      AFSName: "MORE4LIFE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "316844",
      AFSName: "ASET WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "316870",
      AFSName: "SPYRE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "316880",
      AFSName: "K S CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "316972",
      AFSName: "PRIME TIME ADVISORY PTY LTD",
    },
    {
      AFSNumber: "317049",
      AFSName: "CASTELLAN CAPITAL PTY LTD",
    },
    {
      AFSNumber: "317114",
      AFSName: "NATIXIS AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "317155",
      AFSName: "H&G INVESTMENT MANAGEMENT LTD",
    },
    {
      AFSNumber: "317217",
      AFSName: "PRIME UNDERWRITING AGENCY PTY LTD",
    },
    {
      AFSNumber: "317238",
      AFSName: "AGRIWEALTH CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "317251",
      AFSName: "MGI DOBBYN CARAFA PTY LTD",
    },
    {
      AFSNumber: "317301",
      AFSName: "JILLMILL PTY LTD",
    },
    {
      AFSNumber: "317391",
      AFSName: "AUSTRALIAN INCOME FUND LIMITED",
    },
    {
      AFSNumber: "317587",
      AFSName: "GSFM PTY LIMITED",
    },
    {
      AFSNumber: "317617",
      AFSName: "ARENA UNDERWRITING PTY LIMITED",
    },
    {
      AFSNumber: "317716",
      AFSName: "GALILEO DIRECT PROPERTY FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "317743",
      AFSName: "CHIMAERA PRIVATE LIMITED",
    },
    {
      AFSNumber: "317799",
      AFSName: "CENTRE CAPITAL SECURITIES PTY LTD",
    },
    {
      AFSNumber: "317817",
      AFSName: "TRADING LEVELS PTY LTD",
    },
    {
      AFSNumber: "317944",
      AFSName: "PETRA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "318062",
      AFSName: "MACQUARIE GROUP LIMITED",
    },
    {
      AFSNumber: "318075",
      AFSName: "EVANS AND PARTNERS PTY. LTD.",
    },
    {
      AFSNumber: "318105",
      AFSName: "WATERFALL WAY ASSOCIATES PTY LTD",
    },
    {
      AFSNumber: "318123",
      AFSName: "MACQUARIE FUND ADVISERS PTY LIMITED",
    },
    {
      AFSNumber: "318232",
      AFSName: "AXICORP FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "318261",
      AFSName: "AIMS ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "318318",
      AFSName: "FARQUHARSON SECURITIES PTY. LTD.",
    },
    {
      AFSNumber: "318368",
      AFSName: "CASTLEROCK INVESTMENT MANAGEMENT LTD",
    },
    {
      AFSNumber: "318544",
      AFSName: "VEHICLE INSURANCE UNDERWRITERS PTY. LTD.",
    },
    {
      AFSNumber: "318597",
      AFSName: "CHRYSALIS LIFESTYLE PLANNING PTY LTD",
    },
    {
      AFSNumber: "318603",
      AFSName: "GREAT LAKES INSURANCE SE",
    },
    {
      AFSNumber: "318613",
      AFSName: "SHADFORTH FINANCIAL GROUP LIMITED",
    },
    {
      AFSNumber: "318755",
      AFSName: "GOOGLE PAYMENT AUSTRALIA PTY. LTD.",
    },
    {
      AFSNumber: "318926",
      AFSName: "WEALTHMED FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "318930",
      AFSName: "BLICENSED PTY LTD",
    },
    {
      AFSNumber: "318961",
      AFSName: "PT ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "319038",
      AFSName: "NLC INSURANCE PTY LTD",
    },
    {
      AFSNumber: "319138",
      AFSName: "INVESTSERVE AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "319181",
      AFSName: "360 UNDERWRITING SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "319197",
      AFSName: "MARKETS NOMINEES PTY LTD",
    },
    {
      AFSNumber: "319256",
      AFSName: "ANCHORAGE CAPITAL PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "319372",
      AFSName: "NEWMARK CAPITAL LIMITED",
    },
    {
      AFSNumber: "319402",
      AFSName: "MACQUARIE GIG FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "319405",
      AFSName: "DIAMOND ENERGY PTY LTD",
    },
    {
      AFSNumber: "319477",
      AFSName: "MERRICKS CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "319516",
      AFSName: "TECH EQUITY PTY LIMITED",
    },
    {
      AFSNumber: "319640",
      AFSName: "VIBURNUM FUNDS PTY LTD",
    },
    {
      AFSNumber: "319738",
      AFSName: "ETORO ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "319830",
      AFSName: "KERR ALLAN FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "320019",
      AFSName: "MITCHELL ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "320173",
      AFSName: "GARDIOR PTY LTD",
    },
    {
      AFSNumber: "320204",
      AFSName: "INDUE LTD",
    },
    {
      AFSNumber: "320237",
      AFSName: "BMF INTERNATIONAL ASSET MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "320240",
      AFSName: "BANKSIA MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "320404",
      AFSName: "PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "320497",
      AFSName: "TRIVESTA CAPITAL LTD",
    },
    {
      AFSNumber: "320499",
      AFSName: "BLUE QUAY INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "320505",
      AFSName: "FIDANTE PARTNERS SERVICES LIMITED",
    },
    {
      AFSNumber: "320533",
      AFSName: "REDSTONE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "320562",
      AFSName: "LACHSTOCK CONSULTING PTY LTD",
    },
    {
      AFSNumber: "320580",
      AFSName: "VINCENTS ADVISORY PTY LTD",
    },
    {
      AFSNumber: "320666",
      AFSName: "DOMESTIC & GENERAL INSURANCE PLC",
    },
    {
      AFSNumber: "320686",
      AFSName: "PHOENIX WEALTH MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "320797",
      AFSName: "SA CAPITAL FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "320820",
      AFSName: "FDX PTY. LTD.",
    },
    {
      AFSNumber: "320961",
      AFSName: "BTIG AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "321048",
      AFSName: "GROSVENOR EQUITIES PTY LTD",
    },
    {
      AFSNumber: "321117",
      AFSName: "AUSTBROKERS AEI PTY LIMITED",
    },
    {
      AFSNumber: "321254",
      AFSName: "ENEVITA PTY LTD",
    },
    {
      AFSNumber: "321435",
      AFSName: "IBERDROLA AUSTRALIA ENERGY MARKETS PTY LIMITED",
    },
    {
      AFSNumber: "321517",
      AFSName: "GSFM RESPONSIBLE ENTITY SERVICES LIMITED",
    },
    {
      AFSNumber: "321529",
      AFSName: "BARRENJOEY LIFESTYLE PTY LIMITED",
    },
    {
      AFSNumber: "321611",
      AFSName: "THIRD LINK INVESTMENT MANAGERS PTY LIMITED",
    },
    {
      AFSNumber: "321654",
      AFSName: "AIRPLUS INTERNATIONAL GMBH",
    },
    {
      AFSNumber: "321877",
      AFSName: "QUS PTY LTD",
    },
    {
      AFSNumber: "321882",
      AFSName: "AZORA FINANCE (MANAGEMENT) PTY LTD",
    },
    {
      AFSNumber: "321895",
      AFSName: "THE PROFESSIONAL SUPER ADVISERS PTY LTD",
    },
    {
      AFSNumber: "321924",
      AFSName: "WEALTH MERCHANTS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "321955",
      AFSName: "ACCORDIUS PTY LTD",
    },
    {
      AFSNumber: "322056",
      AFSName: "AKAMBO PTY LTD",
    },
    {
      AFSNumber: "322059",
      AFSName: "CENTAUR ENERGY PTY LTD",
    },
    {
      AFSNumber: "322080",
      AFSName: "PLUS CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "322140",
      AFSName: "PINNACLE INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "322207",
      AFSName: "MKS WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "322211",
      AFSName: "SENTINEL WEALTH MANAGERS PTY LTD",
    },
    {
      AFSNumber: "322220",
      AFSName: "MOMENTUM PLANNING PTY LTD",
    },
    {
      AFSNumber: "322536",
      AFSName: "UNDERWRITING AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "322592",
      AFSName: "ERBEN CAPITAL PTY LTD",
    },
    {
      AFSNumber: "322800",
      AFSName: "ECLIPSE FINANCIAL ADVISERS PTY LTD",
    },
    {
      AFSNumber: "322891",
      AFSName: "INSYNC FUNDS MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "323106",
      AFSName: "TIMELIO FUND MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "323255",
      AFSName: "TORRENS CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "323379",
      AFSName: "ACCORD FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "323389",
      AFSName: "ETHICUS WEALTH PTY LTD",
    },
    {
      AFSNumber: "323430",
      AFSName: "SPM INVESTMENT GROUP PTY LTD",
    },
    {
      AFSNumber: "323462",
      AFSName: "CARWARDINE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "323671",
      AFSName: "IBG INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "323719",
      AFSName: "HUGHES FORBES FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "323727",
      AFSName: "NERO FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "323729",
      AFSName: "ACTOCUE PTY LTD",
    },
    {
      AFSNumber: "323823",
      AFSName: "STRATACASH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "323988",
      AFSName: "FAT TAIL INVESTMENT RESEARCH PTY LTD",
    },
    {
      AFSNumber: "324233",
      AFSName: "INDUSTRIAL AND COMMERCIAL BANK OF CHINA LIMITED",
    },
    {
      AFSNumber: "324234",
      AFSName: "SECURE INVESTMENT PLANNING PTY LTD",
    },
    {
      AFSNumber: "324390",
      AFSName: "HARTS FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "324472",
      AFSName: "PRIORITY1 WEALTH MANAGEMENT GROUP (AUSTRALIA) PTY. LTD.",
    },
    {
      AFSNumber: "324476",
      AFSName: "AUSTRALIAN FUND MONITORS PTY LTD",
    },
    {
      AFSNumber: "324686",
      AFSName: "RISK ADVISORY SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "324759",
      AFSName: "CACHEWISE PTY LTD",
    },
    {
      AFSNumber: "324767",
      AFSName: "NOVA UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "324908",
      AFSName: "SWISS RE LIFE & HEALTH AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "324987",
      AFSName: "CHOICE FINANCIAL ADVISORS PTY LTD",
    },
    {
      AFSNumber: "325159",
      AFSName: "ARCO INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "325252",
      AFSName: "EP FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "325379",
      AFSName: "SAPPHIRE COMMODITIES PTY LTD",
    },
    {
      AFSNumber: "325652",
      AFSName: "TMG LICENSEE SERVICES PTY LTD",
    },
    {
      AFSNumber: "325906",
      AFSName: "LION ADVISORY PTY LTD",
    },
    {
      AFSNumber: "325936",
      AFSName: "MARKETAG PTY LTD",
    },
    {
      AFSNumber: "326117",
      AFSName: "KEYSTONE PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "326118",
      AFSName: "CORVAL PARTNERS LIMITED",
    },
    {
      AFSNumber: "326147",
      AFSName: "ADK INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "326283",
      AFSName: "CAPITAL DYNAMICS (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "326403",
      AFSName: "FINANCIAL STRATEGIES (SA) PTY LTD",
    },
    {
      AFSNumber: "326451",
      AFSName: "COVERCORP PTY LTD",
    },
    {
      AFSNumber: "326514",
      AFSName: "EIGHT CARAT SECURITIES PTY LTD",
    },
    {
      AFSNumber: "326792",
      AFSName: "MACQUARIE AUSTRALIAN INFRASTRUCTURE MANAGEMENT 2 LIMITED",
    },
    {
      AFSNumber: "326907",
      AFSName: "HANTEC MARKETS (AUSTRALIA) PTY LIMITED",
    },
    {
      AFSNumber: "326922",
      AFSName: "ROAN FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "327033",
      AFSName: "COOPER PARTNERS FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "327075",
      AFSName: "QUAD CODE AU LTD",
    },
    {
      AFSNumber: "327131",
      AFSName: "UNITED INSURANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "327156",
      AFSName: "CO-INVEST UNITED PTY LTD",
    },
    {
      AFSNumber: "327277",
      AFSName: "FM FINANCIAL SOLUTIONS PTY. LTD.",
    },
    {
      AFSNumber: "327278",
      AFSName: "GENUITY RETAIL PTY LTD",
    },
    {
      AFSNumber: "327505",
      AFSName: "AUSTRALIAN CAPITAL FUNDS MANAGEMENT LTD",
    },
    {
      AFSNumber: "327520",
      AFSName: "GRAHAM FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "327834",
      AFSName: "INSTINET AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "327868",
      AFSName: "BUSINESS INSURANCE SERVICES PTY LTD",
    },
    {
      AFSNumber: "327933",
      AFSName: "FINGUARD FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "328056",
      AFSName: "TI SECURITIES GROUP PTY LTD",
    },
    {
      AFSNumber: "328140",
      AFSName: "UNIQUE ADVISERS PTY LTD",
    },
    {
      AFSNumber: "328141",
      AFSName: "MOZO PTY. LTD.",
    },
    {
      AFSNumber: "328214",
      AFSName: "MAC CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "328515",
      AFSName: "WESTBOURNE CREDIT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "328663",
      AFSName: "CLEARWAY CAPITAL SOLUTIONS PTY. LTD.",
    },
    {
      AFSNumber: "328794",
      AFSName: "BACERA CO PTY LTD",
    },
    {
      AFSNumber: "328866",
      AFSName: "TOP 500 SEC PTY LTD",
    },
    {
      AFSNumber: "328971",
      AFSName: "RYDER INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "329004",
      AFSName: "PLATINUM MORTGAGE SECURITIES PTY LTD",
    },
    {
      AFSNumber: "329052",
      AFSName: "FAIRVIEW EQUITY PARTNERS PTY LTD",
    },
    {
      AFSNumber: "329063",
      AFSName: "TEN TIGERS GRAIN MARKETING PTY LTD",
    },
    {
      AFSNumber: "329133",
      AFSName: "API CAPITAL ADVISORY PTY LTD",
    },
    {
      AFSNumber: "329339",
      AFSName: "LUTHERAN LAYPEOPLE'S LEAGUE OF AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "329342",
      AFSName: "TODD CAPITAL PTY LTD",
    },
    {
      AFSNumber: "329408",
      AFSName: "ONE26 PTY LTD",
    },
    {
      AFSNumber: "329438",
      AFSName: "TG FINANCIAL PTY. LTD.",
    },
    {
      AFSNumber: "329616",
      AFSName: "FAMILY DAY CARE AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "329634",
      AFSName: "EMERGENCE INSURANCE PTY LTD",
    },
    {
      AFSNumber: "329636",
      AFSName: "NINETY ONE AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "329733",
      AFSName: "CHARTER GROUP GENERAL INSURANCE PTY LTD",
    },
    {
      AFSNumber: "329800",
      AFSName: "NORTH RUN PTY LTD",
    },
    {
      AFSNumber: "329813",
      AFSName: "VELOCITY TRADE LIMITED",
    },
    {
      AFSNumber: "329828",
      AFSName: "ARDEA INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "329829",
      AFSName: "POWERWRAP LIMITED",
    },
    {
      AFSNumber: "329868",
      AFSName:
        "PATTERSON FAMILY TRUST & THE BYE INVESTMENT TRUST & TRUSTEE HICKEY FAMILY TRUST & TRUSTEE MCCANN WEA",
    },
    {
      AFSNumber: "329935",
      AFSName: "ERM AUSTRALIA SUSTAINABILITY PTY LTD",
    },
    {
      AFSNumber: "329948",
      AFSName: "BATTERHAM AND ASSOCIATES PTY LTD",
    },
    {
      AFSNumber: "330181",
      AFSName: "BELVEDERE SHARE MANAGERS PTY LIMITED",
    },
    {
      AFSNumber: "330294",
      AFSName: "EAGLESTONE CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "330371",
      AFSName: "SOLUTIONS BENDIGO PTY LTD",
    },
    {
      AFSNumber: "330505",
      AFSName: "SOLARIS INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "330521",
      AFSName: "VERISURE  PTY LTD",
    },
    {
      AFSNumber: "330737",
      AFSName: "INTRALINK WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "330742",
      AFSName: "CAPROCK INSTITUTIONAL PTY LIMITED",
    },
    {
      AFSNumber: "330757",
      AFSName: "ALPHA SECURITIES PTY LTD",
    },
    {
      AFSNumber: "330951",
      AFSName: "BEULAH CAPITAL PTY LTD",
    },
    {
      AFSNumber: "331058",
      AFSName: "SOUTHERN CROSS BENEFITS LIMITED",
    },
    {
      AFSNumber: "331087",
      AFSName: "TDM GROWTH PARTNERS PTY LTD",
    },
    {
      AFSNumber: "331128",
      AFSName: "ISELECT LIFE PTY LTD",
    },
    {
      AFSNumber: "331132",
      AFSName: "DOMINION ADMIN SERVICES PTY LTD",
    },
    {
      AFSNumber: "331147",
      AFSName: "LUGARNO HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "331235",
      AFSName: "QUEST SECURITIES (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "331535",
      AFSName: "MANDALAY WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "331624",
      AFSName: "MANAGEMENT ADVISORS PTY. LTD.",
    },
    {
      AFSNumber: "331625",
      AFSName: "BELLMONT SECURITIES PTY LTD",
    },
    {
      AFSNumber: "331644",
      AFSName: "WAVESTONE CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "331663",
      AFSName: "SANDON CAPITAL PTY LTD",
    },
    {
      AFSNumber: "331717",
      AFSName: "AMBASSADOR FUNDS MANAGEMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "331840",
      AFSName: "AFFIRMATIVE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "331945",
      AFSName: "WORLD FIRST PTY LTD",
    },
    {
      AFSNumber: "331955",
      AFSName: "CHINSHA PTY LTD",
    },
    {
      AFSNumber: "331990",
      AFSName: "ACCESSION3 FINANCIAL ADVISERS PTY LTD",
    },
    {
      AFSNumber: "332100",
      AFSName: "HCAP PTY LIMITED",
    },
    {
      AFSNumber: "332389",
      AFSName: "FIRST COMMERCIAL BANK  LTD.",
    },
    {
      AFSNumber: "332417",
      AFSName: "NAVIGATE WEALTH PTY. LTD.",
    },
    {
      AFSNumber: "332484",
      AFSName: "ARNHEM INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "332513",
      AFSName: "MINARET CAPITAL PTY LTD",
    },
    {
      AFSNumber: "332556",
      AFSName: "MADDERN FINANCIAL ADVISERS PTY. LTD.",
    },
    {
      AFSNumber: "332802",
      AFSName: "RIVKIN SECURITIES PTY LTD",
    },
    {
      AFSNumber: "332836",
      AFSName: "PHILLIPSONS FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "332957",
      AFSName: "ADVICEIQ PARTNERS PTY LTD",
    },
    {
      AFSNumber: "332959",
      AFSName: "BOSTONIQ PTY LTD",
    },
    {
      AFSNumber: "333008",
      AFSName: "TMS PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "333092",
      AFSName: "M & A PARTNERS PTY LTD",
    },
    {
      AFSNumber: "333163",
      AFSName: "THINK TANK NOMINEES PTY LTD",
    },
    {
      AFSNumber: "333165",
      AFSName: "CPEC FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "333213",
      AFSName: "BALMAIN FUND ADMINISTRATION LIMITED",
    },
    {
      AFSNumber: "333214",
      AFSName: "CROMWELL FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "333215",
      AFSName: "MONITOR WEALTH SERVICES PTY LTD",
    },
    {
      AFSNumber: "333234",
      AFSName: "ATL INSURANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "333244",
      AFSName: "DARBY RACING PTY LTD",
    },
    {
      AFSNumber: "333297",
      AFSName: "REACH FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "333543",
      AFSName: "GCR FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "333649",
      AFSName: "KNOWITDIGITAL PTY LTD",
    },
    {
      AFSNumber: "333732",
      AFSName: "TALARIA ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "333835",
      AFSName: "HOWDEN SPECIALTY LIMITED",
    },
    {
      AFSNumber: "334028",
      AFSName: "FUNDAMENTAL FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "334036",
      AFSName: "INVESTOGAIN PTY LTD",
    },
    {
      AFSNumber: "334040",
      AFSName: "GAMMA WEALTH GROUP PTY LTD",
    },
    {
      AFSNumber: "334107",
      AFSName: "INVESTSMART ADVICE PTY LIMITED",
    },
    {
      AFSNumber: "334115",
      AFSName: "ISELECT GENERAL PTY LTD",
    },
    {
      AFSNumber: "334290",
      AFSName: "ARGUS WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "334293",
      AFSName: "KVB GLOBAL MARKETS PTY LTD",
    },
    {
      AFSNumber: "334325",
      AFSName: "BRONTE CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "334339",
      AFSName: "TEAMINVEST PTY LTD",
    },
    {
      AFSNumber: "334490",
      AFSName: "LEGACY PROPERTY CAPITAL PTY LTD",
    },
    {
      AFSNumber: "334546",
      AFSName: "ART GROUP SERVICES LTD",
    },
    {
      AFSNumber: "334657",
      AFSName: "ADVISERCHOICE PTY LTD",
    },
    {
      AFSNumber: "334760",
      AFSName: "CHAMPION THOROUGHBREDS PTY LTD",
    },
    {
      AFSNumber: "334838",
      AFSName: "HELMSEC GLOBAL CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "334846",
      AFSName: "INTEGRITY FINANCIAL (SA) PTY LTD",
    },
    {
      AFSNumber: "334906",
      AFSName: "BK CONSULTING (AUST) PTY LTD",
    },
    {
      AFSNumber: "335001",
      AFSName: "MILLBROOK ASSET MANAGEMENT LTD",
    },
    {
      AFSNumber: "335126",
      AFSName: "NEEX PRIME PTY LTD",
    },
    {
      AFSNumber: "335172",
      AFSName: "SECURITISED PRODUCTS ADVISORY PTY LIMITED",
    },
    {
      AFSNumber: "335238",
      AFSName: "C & M INSURANCE PTY LTD",
    },
    {
      AFSNumber: "335327",
      AFSName: "PACIFIC HYDRO AFSL PTY LTD",
    },
    {
      AFSNumber: "335374",
      AFSName: "PAC ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "335381",
      AFSName: "FIRST SENTIER INVESTORS RQI PTY LTD",
    },
    {
      AFSNumber: "335588",
      AFSName: "BLUE ROCK INVESTMENTS (MELB) PTY LTD",
    },
    {
      AFSNumber: "335662",
      AFSName: "STRADA GROUP PTY LIMITED",
    },
    {
      AFSNumber: "335692",
      AFSName: "INTERNATIONAL CAPITAL MARKETS PTY. LTD.",
    },
    {
      AFSNumber: "335783",
      AFSName: "MAAM RE LTD",
    },
    {
      AFSNumber: "335815",
      AFSName: "EVENTUS WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "336127",
      AFSName: "KKR AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "336276",
      AFSName: "ALLIER CAPITAL PTY. LTD.",
    },
    {
      AFSNumber: "336349",
      AFSName: "PAMPLONA PTY LTD",
    },
    {
      AFSNumber: "336409",
      AFSName: "INDIAN OCEAN MANAGEMENT GROUP PTY LTD",
    },
    {
      AFSNumber: "336426",
      AFSName: "SENTINEL WEALTH MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "336733",
      AFSName: "EQUITY ADVISERS PTY LTD",
    },
    {
      AFSNumber: "336808",
      AFSName: "DEAN WATT THOROUGHBREDS PTY LTD",
    },
    {
      AFSNumber: "336815",
      AFSName: "LEMPRIERE MCGREGOR PTY LTD",
    },
    {
      AFSNumber: "336940",
      AFSName: "ALFRED STREET NOMINEES PTY LIMITED",
    },
    {
      AFSNumber: "336950",
      AFSName: "VIOLA PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "336955",
      AFSName: "TERRY S. LEE PTY LTD",
    },
    {
      AFSNumber: "336964",
      AFSName: "STABLE CONNECT LIMITED",
    },
    {
      AFSNumber: "336969",
      AFSName: "MOODY'S INVESTORS SERVICE PTY LIMITED",
    },
    {
      AFSNumber: "337065",
      AFSName: "QUEEN STREET PARTNERS PTY. LIMITED",
    },
    {
      AFSNumber: "337123",
      AFSName: "FITCH AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "337303",
      AFSName: "COLUMBUS CAPITAL PTY. LIMITED",
    },
    {
      AFSNumber: "337367",
      AFSName: "HYECORP PROPERTY FUNDS MANAGEMENT LTD",
    },
    {
      AFSNumber: "337565",
      AFSName: "S&P GLOBAL RATINGS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "337568",
      AFSName: "MGS FINANCIAL PTY LIMITED",
    },
    {
      AFSNumber: "337724",
      AFSName: "N.J. RENTON AND PARTNERS CAPITAL PTY LTD",
    },
    {
      AFSNumber: "337755",
      AFSName: "TFG AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "337805",
      AFSName: "CLICKSUPER PTY LTD",
    },
    {
      AFSNumber: "337806",
      AFSName: "ASTUTE ADVISORY SERVICES PTY LTD",
    },
    {
      AFSNumber: "337867",
      AFSName: "HORIZON FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "337872",
      AFSName: "AQUASIA PTY LTD",
    },
    {
      AFSNumber: "337927",
      AFSName: "SANLAM PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "337968",
      AFSName: "ARCHIWOODS CAPITAL PTY LTD",
    },
    {
      AFSNumber: "337970",
      AFSName: "TASMAN FOREIGN EXCHANGE PTY LTD",
    },
    {
      AFSNumber: "337984",
      AFSName: "CLOUD BREAK ADVISORY PTY LTD",
    },
    {
      AFSNumber: "337985",
      AFSName: "GLENEAGLE SECURITIES (AUST) PTY LIMITED",
    },
    {
      AFSNumber: "338020",
      AFSName: "HENDERSONS FP PTY LTD",
    },
    {
      AFSNumber: "338030",
      AFSName: "VANILLA PROPERTY INVESTMENTS PTY. LTD.",
    },
    {
      AFSNumber: "338141",
      AFSName: "MWH CAPITAL PTY. LTD.",
    },
    {
      AFSNumber: "338156",
      AFSName: "REGIS LICENSING PTY LTD",
    },
    {
      AFSNumber: "338189",
      AFSName: "ESR RIM (AUSTRALIA) LTD",
    },
    {
      AFSNumber: "338256",
      AFSName: "TRANSACTION SERVICES HOLDINGS LIMITED",
    },
    {
      AFSNumber: "338264",
      AFSName: "FINCLEAR SERVICES PTY LTD",
    },
    {
      AFSNumber: "338301",
      AFSName: "BOARDROOM FINANCIAL SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "338360",
      AFSName: "PRIMARY FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "338401",
      AFSName: "CENTURION CAPITAL LIMITED",
    },
    {
      AFSNumber: "338528",
      AFSName: "SNAPS INSURANCE PTY LTD",
    },
    {
      AFSNumber: "338550",
      AFSName: "RIVIERA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "338567",
      AFSName: "GLENNON CAPITAL PTY LTD",
    },
    {
      AFSNumber: "338600",
      AFSName: "SPARK CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "338634",
      AFSName: "ATRIUM INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "338645",
      AFSName: "CERNO REAL ESTATE INVESTORS LIMITED",
    },
    {
      AFSNumber: "338671",
      AFSName: "BARINGS AUSTRALIA PROPERTY PTY LTD",
    },
    {
      AFSNumber: "338688",
      AFSName: "SENTINEL INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "338731",
      AFSName: "MAC EQUITY PARTNERS PTY LTD",
    },
    {
      AFSNumber: "338885",
      AFSName: "E&P CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "338959",
      AFSName: "BALLINGERS FP PTY LTD",
    },
    {
      AFSNumber: "339008",
      AFSName: "TSF INVESTMENT HOLDINGS LIMITED",
    },
    {
      AFSNumber: "339044",
      AFSName: "PORTFOLIO PLANNERS PTY LTD",
    },
    {
      AFSNumber: "339045",
      AFSName: "CONSULT INSURANCE SOLUTIONS PTY. LTD.",
    },
    {
      AFSNumber: "339074",
      AFSName: "CENTURIA PROPERTY FUNDS NO. 4 LIMITED",
    },
    {
      AFSNumber: "339083",
      AFSName: "LIMBERG ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "339151",
      AFSName: "AUSTRALIA PACIFIC FUNDS MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "339166",
      AFSName: "1KW ADELAIDE PTY LTD",
    },
    {
      AFSNumber: "339211",
      AFSName: "PURSUIT CAPITAL PTY LTD",
    },
    {
      AFSNumber: "339300",
      AFSName: "EAST COAST CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "339360",
      AFSName: "COVENANT CUSTODIAN PTY LTD",
    },
    {
      AFSNumber: "339383",
      AFSName: "ELITE GENERAL INSURANCE SERVICES PTY LTD",
    },
    {
      AFSNumber: "339384",
      AFSName: "AXIES PTY. LTD.",
    },
    {
      AFSNumber: "339481",
      AFSName: "PLANTATION CAPITAL LIMITED",
    },
    {
      AFSNumber: "339557",
      AFSName: "LEARN TO TRADE PTY LIMITED",
    },
    {
      AFSNumber: "339567",
      AFSName: "LOCUMSGROUP ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "339583",
      AFSName: "HEJAZ FUNDS MANAGEMENT LTD",
    },
    {
      AFSNumber: "339769",
      AFSName: "UNITED PF LTD.",
    },
    {
      AFSNumber: "339844",
      AFSName: "SOCIAL INVESTMENT AUSTRALIA LTD",
    },
    {
      AFSNumber: "340083",
      AFSName: "CAERUS CAPITAL PTY LTD",
    },
    {
      AFSNumber: "340094",
      AFSName: "MULCAHY & CO FINANCIAL PLANNING PTY. LTD.",
    },
    {
      AFSNumber: "340218",
      AFSName: "OCEAN SECURITIES PTY LTD",
    },
    {
      AFSNumber: "340235",
      AFSName: "PINNACLE RE SERVICES LIMITED",
    },
    {
      AFSNumber: "340286",
      AFSName: "FLEET PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "340289",
      AFSName: "WEALTH TODAY PTY LTD",
    },
    {
      AFSNumber: "340304",
      AFSName: "CENTURIA PROPERTY FUNDS NO. 2 LIMITED",
    },
    {
      AFSNumber: "340355",
      AFSName: "GGBWEALTHCARE PTY LTD",
    },
    {
      AFSNumber: "340502",
      AFSName: "MORRISON PRIVATE MARKETS PTY LIMITED",
    },
    {
      AFSNumber: "340679",
      AFSName: "MILLIMAN PTY LTD",
    },
    {
      AFSNumber: "340731",
      AFSName: "ACCOUNTANCY INSURANCE UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "340744",
      AFSName: "STERLING MANAGED INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "340749",
      AFSName: "FINANCIAL SENSE AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "340762",
      AFSName: "ESUPERFUND PTY LTD",
    },
    {
      AFSNumber: "340799",
      AFSName: "GANNET CAPITAL PTY. LTD.",
    },
    {
      AFSNumber: "340958",
      AFSName: "GROW SUPER AFSL PTY LTD",
    },
    {
      AFSNumber: "340965",
      AFSName: "ELDERS INSURANCE (UNDERWRITING AGENCY) PTY LIMITED",
    },
    {
      AFSNumber: "340990",
      AFSName: "CHARTER HALL FLK FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "341020",
      AFSName: "IRONBARK ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "341162",
      AFSName: "JBWERE LTD",
    },
    {
      AFSNumber: "341181",
      AFSName: "BETASHARES CAPITAL LTD",
    },
    {
      AFSNumber: "341190",
      AFSName: "CENTAUR SECURITIES PTY LTD",
    },
    {
      AFSNumber: "341220",
      AFSName: "HEALTH PROFESSIONALS PLUS PTY LTD",
    },
    {
      AFSNumber: "341332",
      AFSName: "EAC PARTNERS PTY LTD",
    },
    {
      AFSNumber: "341391",
      AFSName: "EQUIFAX AUSTRALASIA CREDIT RATINGS PTY LIMITED",
    },
    {
      AFSNumber: "341401",
      AFSName: "AUSTRALIAN FINANCIAL SOLUTIONS GROUP PTY LTD",
    },
    {
      AFSNumber: "341474",
      AFSName: "LONG TAIL ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "341506",
      AFSName: "SEQUOIA ASSET MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "341546",
      AFSName: "TOLEHOUSE RISK SERVICES PTY LTD",
    },
    {
      AFSNumber: "341675",
      AFSName: "INTERFINANCIAL CORPORATE FINANCE LIMITED",
    },
    {
      AFSNumber: "341678",
      AFSName: "FINANCIAL DECISIONS PTY LTD",
    },
    {
      AFSNumber: "341759",
      AFSName: "CURRAWONG FUND SERVICES PTY LTD",
    },
    {
      AFSNumber: "341864",
      AFSName: "ACCRU FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "341926",
      AFSName: "AUSTRALIAN WEALTH SERVICES PTY LTD",
    },
    {
      AFSNumber: "341988",
      AFSName: "KAIZEN CAPITAL PTY LTD",
    },
    {
      AFSNumber: "341990",
      AFSName: "STAPLETON ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "341991",
      AFSName: "BESPOKE PORTFOLIO PTY LTD",
    },
    {
      AFSNumber: "342143",
      AFSName: "ELDERTON CAPITAL PTY LTD",
    },
    {
      AFSNumber: "342169",
      AFSName: "QDRA PTY LTD",
    },
    {
      AFSNumber: "342242",
      AFSName: "QUALITAS SECURITIES PTY LTD",
    },
    {
      AFSNumber: "342385",
      AFSName: "PSC INSURANCE BROKERS (AUST) PTY LTD",
    },
    {
      AFSNumber: "342420",
      AFSName: "WILLIAM BUCK WEALTH ADVISORS (VIC) PTY LTD",
    },
    {
      AFSNumber: "342511",
      AFSName: "BRICKTOP GROUP PTY LTD",
    },
    {
      AFSNumber: "342515",
      AFSName: "HABEN PROPERTY FUND LTD",
    },
    {
      AFSNumber: "342516",
      AFSName: "SOVEREIGN INSURANCE AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "342526",
      AFSName: "FINDEX INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "342546",
      AFSName: "GENERAL INSURANCE BROKERS OF AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "342578",
      AFSName: "EIG GLOBAL ENERGY (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "342627",
      AFSName: "RYKAN ENTERPRISES PTY LTD",
    },
    {
      AFSNumber: "342673",
      AFSName: "STRATEGIC ELEMENTS LTD",
    },
    {
      AFSNumber: "342692",
      AFSName: "KNIGHTCORP HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "342716",
      AFSName: "STADIA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "342766",
      AFSName: "LIONSGATE FINANCIAL GROUP PTY. LTD.",
    },
    {
      AFSNumber: "342771",
      AFSName: "RALLYVILLE FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "342787",
      AFSName: "BARINGS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "342880",
      AFSName: "ADVICE EVOLUTION PTY LTD",
    },
    {
      AFSNumber: "342893",
      AFSName: "DJA CAPITAL PTY. LTD.",
    },
    {
      AFSNumber: "342895",
      AFSName: "SHENTON LIMITED",
    },
    {
      AFSNumber: "342901",
      AFSName: "ATOMOS ASSETS PTY LTD",
    },
    {
      AFSNumber: "342955",
      AFSName: "LANYON ASSET MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "343023",
      AFSName: "CATAPULT PARTNERS PTY LTD",
    },
    {
      AFSNumber: "343079",
      AFSName: "GREENSTONE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "343088",
      AFSName: "ALLIED BEEF PTY LTD",
    },
    {
      AFSNumber: "343239",
      AFSName: "BARNS FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "343496",
      AFSName: "LCM ADVISORY LIMITED",
    },
    {
      AFSNumber: "343514",
      AFSName: "GONDWANA SECURITIES PTY LTD",
    },
    {
      AFSNumber: "343546",
      AFSName: "HAMILTON ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "343560",
      AFSName: "FORTUNE SECURITIES PTY LTD",
    },
    {
      AFSNumber: "343574",
      AFSName: "KINGSLANE SECURITIES PTY LTD",
    },
    {
      AFSNumber: "343582",
      AFSName: "IWM ADVISORS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "343671",
      AFSName: "M FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "343672",
      AFSName: "ENLIHTAN CAPITAL MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "343678",
      AFSName: "SOUTHBANK CAPITAL PTY LTD",
    },
    {
      AFSNumber: "343710",
      AFSName:
        "CAPELLA CAPITAL LEND LEASE PTY LIMITED & CAPELLA PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "343753",
      AFSName: "MERLON CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "343937",
      AFSName: "EQUITY STORY PTY LIMITED",
    },
    {
      AFSNumber: "344082",
      AFSName: "BRANDON CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "344099",
      AFSName: "MONEYWISE FINANCIAL PLANNING PTY. LTD.",
    },
    {
      AFSNumber: "344121",
      AFSName: "CONSOLIDATED INSURANCES PTY LTD",
    },
    {
      AFSNumber: "344139",
      AFSName: "AURUM PLANNING PTY LTD",
    },
    {
      AFSNumber: "344203",
      AFSName: "TAUPE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "344231",
      AFSName: "AUZI PTY LTD",
    },
    {
      AFSNumber: "344259",
      AFSName: "AUSTAIR PILOTS PTY LTD",
    },
    {
      AFSNumber: "344269",
      AFSName: "GRAMERCY SECURITIES ADVISORS PTY LTD",
    },
    {
      AFSNumber: "344361",
      AFSName: "PROFESSIONAL ADVISER ALLIANCE PTY LTD",
    },
    {
      AFSNumber: "344365",
      AFSName: "SPIRE CAPITAL LTD",
    },
    {
      AFSNumber: "344369",
      AFSName: "CW RM LIMITED",
    },
    {
      AFSNumber: "344448",
      AFSName: "MAFIP LIMITED",
    },
    {
      AFSNumber: "344457",
      AFSName: "INCOME GUARD PTY LTD",
    },
    {
      AFSNumber: "344486",
      AFSName: "VASCO TRUSTEES LIMITED",
    },
    {
      AFSNumber: "344502",
      AFSName: "FINSBURY CAPITAL ADVISORS PTY LIMITED",
    },
    {
      AFSNumber: "344582",
      AFSName: "TTDS HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "344601",
      AFSName: "PPI CAPITAL LTD",
    },
    {
      AFSNumber: "344648",
      AFSName: "PSC CONNECT PTY LTD",
    },
    {
      AFSNumber: "344748",
      AFSName: "RAHALI CORPORATION PTY. LTD.",
    },
    {
      AFSNumber: "344971",
      AFSName: "AUSTRALIAN FINANCIAL DIRECTIONS PTY LTD",
    },
    {
      AFSNumber: "345009",
      AFSName: "SHIELD FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "345050",
      AFSName: "ASCOT CAPITAL LIMITED",
    },
    {
      AFSNumber: "345143",
      AFSName: "IMPLEMENTED PORTFOLIOS PTY LTD",
    },
    {
      AFSNumber: "345313",
      AFSName: "BONGIORNO WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "345404",
      AFSName: "STRATFORD ADVISORY GROUP (NSW) PTY LIMITED",
    },
    {
      AFSNumber: "345443",
      AFSName: "APSEC COMPLIANCE AND ADMINISTRATION PTY LTD",
    },
    {
      AFSNumber: "345470",
      AFSName: "SHENTON PTY LTD",
    },
    {
      AFSNumber: "345499",
      AFSName: "MA MOELIS AUSTRALIA ADVISORY PTY LTD",
    },
    {
      AFSNumber: "345646",
      AFSName: "STONEX FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "345663",
      AFSName: "THE AFOOFA GROUP AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "345674",
      AFSName: "LOWELL RESOURCES FUNDS MANAGEMENT LTD",
    },
    {
      AFSNumber: "345692",
      AFSName: "ALCEON GROUP PTY LTD",
    },
    {
      AFSNumber: "345744",
      AFSName: "VWM FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "345908",
      AFSName: "ORION CAPITAL PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "345927",
      AFSName: "HALLBAR GROUP CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "345929",
      AFSName: "FORZA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "345963",
      AFSName: "THOMAS PRICE PTY LTD",
    },
    {
      AFSNumber: "345995",
      AFSName: "ALLEGRO FUNDS PTY LTD",
    },
    {
      AFSNumber: "346034",
      AFSName: "GCI AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "346036",
      AFSName: "SOUTHPEAK INVESTMENT MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "346067",
      AFSName: "ASSOCIATION OF LIKE MINDED ADVISERS (ALMA) GROUP PTY LTD",
    },
    {
      AFSNumber: "346122",
      AFSName: "ARROW ENERGY TRADING PTY. LTD.",
    },
    {
      AFSNumber: "346138",
      AFSName: "AUSTRALIA RATINGS PTY LTD",
    },
    {
      AFSNumber: "346282",
      AFSName: "EASY TRADING ONLINE PTY LTD",
    },
    {
      AFSNumber: "347541",
      AFSName: "DACLAND CAPITAL LIMITED",
    },
    {
      AFSNumber: "347953",
      AFSName: "QUINTESSENTIAL EQUITY PTY LTD",
    },
    {
      AFSNumber: "348370",
      AFSName: "FLAGSTAFF PARTNERS PTY LTD",
    },
    {
      AFSNumber: "348677",
      AFSName: "ARCH FP PTY. LTD.",
    },
    {
      AFSNumber: "348972",
      AFSName: "RETIRE HEALTHY PTY LTD",
    },
    {
      AFSNumber: "349026",
      AFSName: "HUMBLE GOODE FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "349445",
      AFSName: "INFOCHOICE PTY LTD",
    },
    {
      AFSNumber: "349846",
      AFSName: "HORIZON ADVISORY SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "350159",
      AFSName: "CLSA AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "351058",
      AFSName: "VINVA INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "351278",
      AFSName: "CAMBRIDGE MERCANTILE (AUSTRALIA) PTY. LTD.",
    },
    {
      AFSNumber: "351527",
      AFSName: "FTS FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "351578",
      AFSName: "MASON STEVENS LIMITED",
    },
    {
      AFSNumber: "351958",
      AFSName: "AUSTRALIAN CONTINENTAL ENERGY PTY LTD",
    },
    {
      AFSNumber: "352203",
      AFSName: "BURRELL & CO HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "352826",
      AFSName: "FWOS PTY LTD",
    },
    {
      AFSNumber: "352828",
      AFSName: "DDM SECURITIES PTY LTD",
    },
    {
      AFSNumber: "353001",
      AFSName: "D H FLINDERS PTY LTD",
    },
    {
      AFSNumber: "353387",
      AFSName: "HORIZON WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "353500",
      AFSName: "ARROWFIELD PROPERTY GROUP PTY LTD",
    },
    {
      AFSNumber: "353502",
      AFSName: "SUMMIT INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "353848",
      AFSName: "JOHNSONS MME FINANCIAL ADVISORY PTY LTD",
    },
    {
      AFSNumber: "353890",
      AFSName: "ROPAN LICENSEES PTY. LTD.",
    },
    {
      AFSNumber: "354564",
      AFSName: "MONTGOMERY INVESTMENT MANAGEMENT PTY. LTD.",
    },
    {
      AFSNumber: "354933",
      AFSName: "WEALTH PI CAPITAL PTY LTD",
    },
    {
      AFSNumber: "355088",
      AFSName: "SWISS RE INTERNATIONAL SE",
    },
    {
      AFSNumber: "355094",
      AFSName: "BAYTULMAAL FINANCES LIMITED",
    },
    {
      AFSNumber: "355134",
      AFSName: "STEWART BROWN ADVISORY PTY LTD",
    },
    {
      AFSNumber: "355296",
      AFSName: "NICHE TRADE CREDIT PTY LTD",
    },
    {
      AFSNumber: "355414",
      AFSName: "DEVENIR NOMINEES PTY LTD",
    },
    {
      AFSNumber: "356199",
      AFSName: "BENTHAM ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "356648",
      AFSName: "IMPACT FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "356895",
      AFSName: "ALPHINITY INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "357306",
      AFSName: "FORTNUM PRIVATE WEALTH LTD",
    },
    {
      AFSNumber: "357636",
      AFSName: "PITCHER PARTNERS WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "357875",
      AFSName: "ACE AFSL PTY LTD",
    },
    {
      AFSNumber: "357917",
      AFSName: "BENNETT FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "357980",
      AFSName: "HARBOUR MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "358029",
      AFSName: "ENDEAVOR ASSET MANAGEMENT PTY. LTD.",
    },
    {
      AFSNumber: "358144",
      AFSName: "EXCLUSIVELY SUPER PTY LTD",
    },
    {
      AFSNumber: "358245",
      AFSName: "PROJECTS & INFRASTRUCTURE HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "358587",
      AFSName: "PROVENANCE FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "358782",
      AFSName: "TULLOCH CORPORATE ADVISORY PTY LTD",
    },
    {
      AFSNumber: "360011",
      AFSName: "AUSTRALIAN DEVELOPMENT CAPITAL PTY LTD",
    },
    {
      AFSNumber: "360118",
      AFSName: "LEVERAGED EQUITIES LIMITED",
    },
    {
      AFSNumber: "360138",
      AFSName: "TRAVEL INSURANCE PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "360387",
      AFSName: "BEA INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "360457",
      AFSName: "BELL POTTER CAPITAL LIMITED",
    },
    {
      AFSNumber: "361276",
      AFSName: "ROCHFORD CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "362215",
      AFSName: "ANZO CAPITAL (AUST) PTY LTD",
    },
    {
      AFSNumber: "362429",
      AFSName: "STURT CAPITAL PTY LTD",
    },
    {
      AFSNumber: "362843",
      AFSName: "ENERGY ACTION (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "363233",
      AFSName: "BARRINGTON ASSET CONSULTING PTY LTD",
    },
    {
      AFSNumber: "363407",
      AFSName: "CRAIGS INVESTMENT PARTNERS LIMITED",
    },
    {
      AFSNumber: "363494",
      AFSName: "PANTHER TRADING PTY LTD",
    },
    {
      AFSNumber: "363610",
      AFSName: "ORACLE GROUP (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "363909",
      AFSName: "ROYALTY FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "363972",
      AFSName: "MACRO GLOBAL MARKETS PTY LTD",
    },
    {
      AFSNumber: "364411",
      AFSName: "BLUEBERRY PRIME PARTNERS PTY LTD",
    },
    {
      AFSNumber: "364512",
      AFSName: "DOLPHIN PARTNERS PTY LTD",
    },
    {
      AFSNumber: "364861",
      AFSName: "CAMBRIDGE SECURITIES PTY LTD",
    },
    {
      AFSNumber: "365260",
      AFSName: "SALAAM WEALTH FUNDS MANAGEMENT (AUST) PTY LIMITED",
    },
    {
      AFSNumber: "365432",
      AFSName: "INTAS INSURANCE SERVICES PTY LTD",
    },
    {
      AFSNumber: "365601",
      AFSName: "ENVEX SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "365948",
      AFSName: "KAKARIKI CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "366121",
      AFSName: "AWM SERVICES PTY LTD",
    },
    {
      AFSNumber: "366230",
      AFSName: "AURA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "368175",
      AFSName: "INSIGHT INVESTMENT PARTNERS PTY LTD",
    },
    {
      AFSNumber: "370951",
      AFSName: "LYTHGO CREW WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "373752",
      AFSName: "LIEF PTY LTD",
    },
    {
      AFSNumber: "374409",
      AFSName: "XS PRIME LTD",
    },
    {
      AFSNumber: "374686",
      AFSName: "AUGS MARKETS PTY LTD",
    },
    {
      AFSNumber: "375889",
      AFSName: "QENERGY LIMITED",
    },
    {
      AFSNumber: "375898",
      AFSName: "SUPERCOM CONSULTANTS PTY LTD",
    },
    {
      AFSNumber: "376102",
      AFSName: "ALLEN  ALLEN & PARTNERS PTY LTD",
    },
    {
      AFSNumber: "376105",
      AFSName: "HEITMAN INTERNATIONAL REAL ESTATE SECURITIES PTY LIMITED",
    },
    {
      AFSNumber: "376122",
      AFSName: "CONTINUITY CAPITAL INVESTMENT SERVICES LIMITED",
    },
    {
      AFSNumber: "376420",
      AFSName: "EFP WEALTH PTY LTD",
    },
    {
      AFSNumber: "376719",
      AFSName: "PALMER PORTFOLIOS GROUP PTY LTD",
    },
    {
      AFSNumber: "376919",
      AFSName: "JPMORGAN ASSET MANAGEMENT (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "377293",
      AFSName: "CHINA CONSTRUCTION BANK CORPORATION",
    },
    {
      AFSNumber: "377925",
      AFSName: "E G FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "378107",
      AFSName: "HORVAT FINANCIAL ADVISORS PTY. LTD.",
    },
    {
      AFSNumber: "378434",
      AFSName: "TERRAPLEX PTY LTD",
    },
    {
      AFSNumber: "378656",
      AFSName: "SATORI ADVISORY PTY LTD",
    },
    {
      AFSNumber: "378693",
      AFSName: "INDEPENDENT CAPITAL ADVISERS PTY LTD",
    },
    {
      AFSNumber: "379035",
      AFSName: "OKX AUSTRALIA FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "379049",
      AFSName: "OAKWOOD LIFESTYLE ADVISERS PTY LTD",
    },
    {
      AFSNumber: "379454",
      AFSName:
        "LA TROBE FINANCIAL CUSTODY & SECURITISATION SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "379565",
      AFSName: "AUSTRALIAN GROUP INSURANCES PTY LTD",
    },
    {
      AFSNumber: "380023",
      AFSName: "ARGURION FINANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "380202",
      AFSName: "RE1 LIMITED",
    },
    {
      AFSNumber: "380203",
      AFSName: "RE2 LIMITED",
    },
    {
      AFSNumber: "380552",
      AFSName: "SPARK ADVISORS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "381117",
      AFSName: "KILCOR INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "381667",
      AFSName: "BURRELL SECURITIES LIMITED",
    },
    {
      AFSNumber: "381686",
      AFSName: "AIG AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "382641",
      AFSName: "THE SILVERFERN GROUP PTY LTD",
    },
    {
      AFSNumber: "382714",
      AFSName: "ALDER AND PARTNERS PTY LTD",
    },
    {
      AFSNumber: "382724",
      AFSName: "MELBOURNE CAPITAL GROUP ADVISORY PTY LTD",
    },
    {
      AFSNumber: "382882",
      AFSName: "FORWARD FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "383080",
      AFSName: "GPS INVESTMENT FUND LIMITED",
    },
    {
      AFSNumber: "383131",
      AFSName: "NATIONAL FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "383169",
      AFSName: "WATTLE PARTNERS PTY LTD",
    },
    {
      AFSNumber: "383416",
      AFSName: "SOVEREIGN FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "383569",
      AFSName: "MOODY'S ANALYTICS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "383580",
      AFSName: "DMP ASSET MANAGEMENT LTD",
    },
    {
      AFSNumber: "383590",
      AFSName: "COVERDIRECT PTY LIMITED",
    },
    {
      AFSNumber: "384047",
      AFSName: "ASSET BUILDER FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "384126",
      AFSName: "GLOBIQ TRADER PTY LTD",
    },
    {
      AFSNumber: "384483",
      AFSName: "HMT GROUP PTY LTD",
    },
    {
      AFSNumber: "384499",
      AFSName: "VENTURE ADVISORY PTY LTD",
    },
    {
      AFSNumber: "384591",
      AFSName: "DCP SYNDICATION PTY LTD",
    },
    {
      AFSNumber: "384713",
      AFSName: "PGW FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "384727",
      AFSName: "DDM FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "385129",
      AFSName: "SINTEX CONSOLIDATED PTY LIMITED",
    },
    {
      AFSNumber: "385212",
      AFSName: "JIM'S INSURANCE SERVICES PTY LTD",
    },
    {
      AFSNumber: "385348",
      AFSName: "BLACKWATTLE INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "385384",
      AFSName: "MARKIEWICZ & COMPANY PTY LTD",
    },
    {
      AFSNumber: "385620",
      AFSName: "FMGP TRADING GROUP PTY LTD",
    },
    {
      AFSNumber: "385827",
      AFSName: "INVESTORS DIRECT FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "386039",
      AFSName: "YOUR MONEY MANAGER PTY LTD",
    },
    {
      AFSNumber: "386279",
      AFSName: "708 CAPITAL PTY LTD",
    },
    {
      AFSNumber: "386837",
      AFSName: "MASTERCARD PREPAID MANAGEMENT SERVICES AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "387079",
      AFSName: "EQUITIES FIRST HOLDINGS (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "387140",
      AFSName: "ECLIPSE FUTURES (HK) LIMITED",
    },
    {
      AFSNumber: "387267",
      AFSName: "AJ FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "387899",
      AFSName: "D. & A. WHITE PTY LTD",
    },
    {
      AFSNumber: "387951",
      AFSName: "ERM FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "387963",
      AFSName: "FIDUCIA ASSET MANAGEMENT PTY. LTD.",
    },
    {
      AFSNumber: "388086",
      AFSName: "CO2 GROUP FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "388088",
      AFSName: "MERCURY CAPITAL INVESTMENTS PTY LIMITED",
    },
    {
      AFSNumber: "388263",
      AFSName: "KJ RISK GROUP PTY LTD",
    },
    {
      AFSNumber: "388737",
      AFSName: "ECN TRADE PTY LTD",
    },
    {
      AFSNumber: "389100",
      AFSName: "BRIDGEWOOD PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "389206",
      AFSName: "AUSTRALIAN MORTGAGE AND FINANCIAL ADVISERS PTY LTD",
    },
    {
      AFSNumber: "389315",
      AFSName: "CODA ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "389344",
      AFSName: "VOLKSWAGEN FINANCIAL SERVICES AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "389353",
      AFSName: "BW EQUITIES PTY LTD",
    },
    {
      AFSNumber: "389518",
      AFSName: "FLUID FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "389528",
      AFSName: "WEALTH FORUM PTY LTD",
    },
    {
      AFSNumber: "389663",
      AFSName: "OPTIMUS FINANCIAL ADVISORY PTY LTD",
    },
    {
      AFSNumber: "389676",
      AFSName: "WEALTH PSYCHOLOGY PTY LTD",
    },
    {
      AFSNumber: "389753",
      AFSName: "WISE HARBOUR GROUP PTY LTD",
    },
    {
      AFSNumber: "390172",
      AFSName: "HASSELBRING, DIRK ",
    },
    {
      AFSNumber: "390210",
      AFSName: "FOXFIRE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "390627",
      AFSName: "STARR UNDERWRITING AGENTS (ASIA) LIMITED",
    },
    {
      AFSNumber: "390786",
      AFSName: "WI MARKETS PTY LIMITED",
    },
    {
      AFSNumber: "391401",
      AFSName: "NEUBERGER BERMAN AUSTRALIA LTD",
    },
    {
      AFSNumber: "391441",
      AFSName: "EIGHTCAP PTY LTD",
    },
    {
      AFSNumber: "391452",
      AFSName: "EQUITI CAPITAL LIMITED",
    },
    {
      AFSNumber: "391655",
      AFSName: "SFGW PTY LTD",
    },
    {
      AFSNumber: "391759",
      AFSName: "MYBUDGET PTY LTD",
    },
    {
      AFSNumber: "391761",
      AFSName: "TIERNAN PARSONS FINANCIAL SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "392050",
      AFSName: "KPMG FINANCIAL SERVICES CONSULTING PTY LTD",
    },
    {
      AFSNumber: "392362",
      AFSName: "COVE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "392401",
      AFSName: "MACRO CAPITAL LIMITED",
    },
    {
      AFSNumber: "392536",
      AFSName: "TOYOTA FINANCE AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "392547",
      AFSName: "HANRAHANS FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "392673",
      AFSName: "PERPETUAL CORPORATE TRUST LIMITED",
    },
    {
      AFSNumber: "392924",
      AFSName: "FORTRESS INVESTMENT GROUP (AUSTRALIA) PTY LIMITED",
    },
    {
      AFSNumber: "392959",
      AFSName: "KIRKDON FINANCIAL SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "392999",
      AFSName: "GERSH SECURITIES PTY LTD",
    },
    {
      AFSNumber: "393254",
      AFSName: "INTREPID WEALTH PTY LTD",
    },
    {
      AFSNumber: "393451",
      AFSName: "CHAMPION ACCOUNTANTS GROUP PTY LTD",
    },
    {
      AFSNumber: "393606",
      AFSName: "HUB WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "393967",
      AFSName: "CARGILL AUSTRALIA FINANCIAL SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "394583",
      AFSName: "VISIS PTY LTD",
    },
    {
      AFSNumber: "394642",
      AFSName: "ELRIG INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "394797",
      AFSName: "ALPHA LEASE FUND AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "394913",
      AFSName: "GOODMAN INDUSTRIAL FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "396268",
      AFSName: "RDC ADVISORS PTY LTD",
    },
    {
      AFSNumber: "396369",
      AFSName: "WATSON FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "396716",
      AFSName: "ENTHUSIAST UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "397302",
      AFSName: "PREMIER SMSF SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "397602",
      AFSName: "BRIAN SULLIVAN PROPERTY PTY LTD",
    },
    {
      AFSNumber: "397877",
      AFSName: "FINANCE WISE GLOBAL SECURITIES PTY LTD",
    },
    {
      AFSNumber: "398034",
      AFSName: "LANE FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "398104",
      AFSName: "GFA CAPITAL MARKETS LTD",
    },
    {
      AFSNumber: "398196",
      AFSName: "ELANOR FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "398309",
      AFSName: "NHC ADVISORS PTY LTD",
    },
    {
      AFSNumber: "398350",
      AFSName: "ZODIAC SECURITIES PTY LTD",
    },
    {
      AFSNumber: "398473",
      AFSName: "FRONTIER WEALTH ADVISERS PTY. LTD.",
    },
    {
      AFSNumber: "398526",
      AFSName: "MARQUETTE INVESTMENT MANAGERS PTY LTD",
    },
    {
      AFSNumber: "398528",
      AFSName: "MITRADE GLOBAL PTY LTD",
    },
    {
      AFSNumber: "398693",
      AFSName: "MEGA FUSION GROUP PTY LTD",
    },
    {
      AFSNumber: "398764",
      AFSName: "GARDA FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "399636",
      AFSName: "FIXED INCOME SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "400209",
      AFSName: "LIFEBROKER PTY. LTD.",
    },
    {
      AFSNumber: "400364",
      AFSName: "FORTUNE PRIME GLOBAL CAPITAL PTY LTD",
    },
    {
      AFSNumber: "400439",
      AFSName: "ESSENTIAL FINANCIAL PLANNING AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "400598",
      AFSName: "WINDSOR INCOME PROTECTION PTY LTD",
    },
    {
      AFSNumber: "400691",
      AFSName: "THE MOTLEY FOOL AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "400811",
      AFSName: "BAILADOR INVESTMENT MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "400964",
      AFSName: "OUF HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "401072",
      AFSName: "HVB MARKETS PTY LTD",
    },
    {
      AFSNumber: "401108",
      AFSName: "KWM FINANCIAL CONSULTANTS PTY LTD",
    },
    {
      AFSNumber: "401180",
      AFSName: "TRANSCASH INTERNATIONAL PTY LTD",
    },
    {
      AFSNumber: "401224",
      AFSName: "ZENTAURUS INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "401379",
      AFSName: "FOREX SPORT PTY. LTD.",
    },
    {
      AFSNumber: "401414",
      AFSName: "INVESTA LISTED FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "401425",
      AFSName: "TAIWAN COOPERATIVE BANK LTD.",
    },
    {
      AFSNumber: "401610",
      AFSName: "REV AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "401661",
      AFSName: "T & A ADVICE GROUP PTY LTD",
    },
    {
      AFSNumber: "401812",
      AFSName: "MF AFSL PTY LTD",
    },
    {
      AFSNumber: "401858",
      AFSName: "INVESTA WHOLESALE FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "401869",
      AFSName: "JBS INVESTMENTS AUSTRALIA HOLDING PTY LTD",
    },
    {
      AFSNumber: "401882",
      AFSName: "DAP AFSL PTY LTD",
    },
    {
      AFSNumber: "401915",
      AFSName: "EQUITAS ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "402003",
      AFSName: "BENTON INSURANCE SERVICES PTY LTD",
    },
    {
      AFSNumber: "402024",
      AFSName: "JENCAY CAPITAL PTY LTD",
    },
    {
      AFSNumber: "402042",
      AFSName: "FINANCIAL PLANNING EXPERT PTY LTD",
    },
    {
      AFSNumber: "402043",
      AFSName: "OPO FINANCE PTY LTD",
    },
    {
      AFSNumber: "402148",
      AFSName: "MCFARLANE CAMERON PTY LTD",
    },
    {
      AFSNumber: "402217",
      AFSName: "HOXTON CAPITAL MANAGEMENT (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "402234",
      AFSName: "ORA PARTNERS PTY LTD",
    },
    {
      AFSNumber: "402304",
      AFSName: "ONEFOCUS FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "402367",
      AFSName: "PRICE FINANCIAL INTELLIGENCE PTY LTD",
    },
    {
      AFSNumber: "402370",
      AFSName: "ALTERIS FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "402397",
      AFSName: "CHOOSI PTY LTD",
    },
    {
      AFSNumber: "402552",
      AFSName: "ARCHER CAPITAL GROWTH FUNDS PTY LTD",
    },
    {
      AFSNumber: "402709",
      AFSName: "CURRENCYFAIR AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "402900",
      AFSName: "MILLBROOK FUNDS PTY LTD",
    },
    {
      AFSNumber: "402979",
      AFSName: "FEXCO PROPRIETARY LIMITED",
    },
    {
      AFSNumber: "402998",
      AFSName: "CREST FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "403193",
      AFSName: "RF CAPITAL (NOMINEES) PTY LIMITED",
    },
    {
      AFSNumber: "403504",
      AFSName: "BETA INVESTING PTY LTD",
    },
    {
      AFSNumber: "403566",
      AFSName: "WESTERN ADVISORY PTY LTD",
    },
    {
      AFSNumber: "403639",
      AFSName: "GLOBAL INFRASTRUCTURE MANAGEMENT AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "403727",
      AFSName: "APOLLO RISK SERVICES PTY LTD",
    },
    {
      AFSNumber: "403863",
      AFSName: "ACY SECURITIES PTY LTD",
    },
    {
      AFSNumber: "403905",
      AFSName: "ENRIZEN PTY. LTD.",
    },
    {
      AFSNumber: "404045",
      AFSName: "TITAN FUND MANAGEMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "404092",
      AFSName: "CONVERA AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "404131",
      AFSName: "EML PAYMENT SOLUTIONS LIMITED",
    },
    {
      AFSNumber: "404300",
      AFSName: "ARGAMON MARKETS PTY LTD",
    },
    {
      AFSNumber: "404335",
      AFSName: "WEALTHTRAC PTY LTD",
    },
    {
      AFSNumber: "404367",
      AFSName: "FLEXIGROUP MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "404501",
      AFSName: "PLANFARM MARKETING PTY LTD",
    },
    {
      AFSNumber: "404698",
      AFSName: "TORONTO DOMINION AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "404782",
      AFSName: "GO UNLIMITED PTY LTD",
    },
    {
      AFSNumber: "404855",
      AFSName: "EJS INSURANCE CONSULTANTS PTY LTD",
    },
    {
      AFSNumber: "404921",
      AFSName: "GILT INVESTMENTS PTY. LTD.",
    },
    {
      AFSNumber: "404967",
      AFSName: "NGC CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "405106",
      AFSName: "PURVIS BARR AND ASSOCIATES PTY LTD",
    },
    {
      AFSNumber: "405364",
      AFSName: "PERPETUITY CAPITAL PTY LTD",
    },
    {
      AFSNumber: "405452",
      AFSName: "VALOR FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "405462",
      AFSName: "SENTINEL PROPERTY GROUP PTY LTD",
    },
    {
      AFSNumber: "405469",
      AFSName: "AVENIR CAPITAL PTY LTD",
    },
    {
      AFSNumber: "405539",
      AFSName: "KENTGROVE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "405576",
      AFSName: "ADVOCATE ADVISORY PTY. LTD.",
    },
    {
      AFSNumber: "405751",
      AFSName: "CURVE SECURITIES PTY LTD",
    },
    {
      AFSNumber: "405814",
      AFSName: "AUSTRALIAN PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "405890",
      AFSName: "EVERGREEN CAPITAL PTY LTD",
    },
    {
      AFSNumber: "405894",
      AFSName: "AIMS CAPITAL PTY LTD",
    },
    {
      AFSNumber: "405897",
      AFSName: "INTEGRATED EXECUTION SERVICES PTY LTD",
    },
    {
      AFSNumber: "405934",
      AFSName: "APS SAVINGS LIMITED",
    },
    {
      AFSNumber: "406040",
      AFSName: "PELOTON CAPITAL PTY LTD",
    },
    {
      AFSNumber: "406083",
      AFSName: "MAYFIELD GREEN PTY LTD",
    },
    {
      AFSNumber: "406136",
      AFSName: "SINTRA INVESTOR SERVICES PTY LTD",
    },
    {
      AFSNumber: "406275",
      AFSName: "A2Z LICENCE PTY LTD",
    },
    {
      AFSNumber: "406684",
      AFSName: "AVA CAPITAL MARKETS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "407075",
      AFSName: "PWW LICENSEE PTY LTD",
    },
    {
      AFSNumber: "407092",
      AFSName: "SKYBRIDGE PORTFOLIOS PTY LTD",
    },
    {
      AFSNumber: "407100",
      AFSName: "SPECIALISED INVESTMENT AND LENDING CORPORATION LTD",
    },
    {
      AFSNumber: "407113",
      AFSName: "SPI FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "407238",
      AFSName: "AMALGAMATED FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "407409",
      AFSName: "NORTHLAND GROUP HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "407505",
      AFSName: "COVERSURE PTY LTD",
    },
    {
      AFSNumber: "407682",
      AFSName: "EDGE UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "407780",
      AFSName: "CFC UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "408024",
      AFSName: "FEI FINANCE PTY LTD",
    },
    {
      AFSNumber: "408315",
      AFSName: "CARLYLE AUSTRALIA EQUITY MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "408376",
      AFSName: "THE BLACKSTONE GROUP (AUSTRALIA) PTY LIMITED",
    },
    {
      AFSNumber: "408634",
      AFSName: "FINTECH FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "408649",
      AFSName: "RINGMER PACIFIC MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "408735",
      AFSName: "PNI FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "408764",
      AFSName: "JAK INVESTMENT GROUP PTY. LTD.",
    },
    {
      AFSNumber: "408800",
      AFSName: "IS FSL PTY LIMITED",
    },
    {
      AFSNumber: "408843",
      AFSName: "GROWTH EQUITY PARTNERS PTY LTD",
    },
    {
      AFSNumber: "408867",
      AFSName: "ARTESIAN FUND INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "409070",
      AFSName: "ASSET INTERNATIONAL AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "409144",
      AFSName: "ASSETSECURE PTY. LIMITED",
    },
    {
      AFSNumber: "409149",
      AFSName: "HAWKVIEW PARTNERS PTY LTD",
    },
    {
      AFSNumber: "409340",
      AFSName: "FIL RESPONSIBLE ENTITY (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "409361",
      AFSName: "MERIT WEALTH PTY LTD",
    },
    {
      AFSNumber: "409423",
      AFSName: "MERIDIAN ENERGY LIMITED",
    },
    {
      AFSNumber: "409424",
      AFSName: "CLIMB WEALTH PTY LTD",
    },
    {
      AFSNumber: "409468",
      AFSName: "TOTUS CAPITAL PTY LTD",
    },
    {
      AFSNumber: "409518",
      AFSName: "UNDER THE RADAR REPORT PTY LTD",
    },
    {
      AFSNumber: "409535",
      AFSName: "STEWARDS CAPITAL GROUP PTY LTD",
    },
    {
      AFSNumber: "409721",
      AFSName: "COMMUNITY CPS SERVICES PTY LTD",
    },
    {
      AFSNumber: "409830",
      AFSName: "HUA NAN COMMERCIAL BANK LTD.",
    },
    {
      AFSNumber: "409837",
      AFSName: "BANK OF COMMUNICATIONS CO.  LTD.",
    },
    {
      AFSNumber: "409847",
      AFSName: "SKYBOUND FIDELIS INVESTMENT LTD",
    },
    {
      AFSNumber: "410022",
      AFSName: "VIRTU FINANCIAL ASIA PTY LTD",
    },
    {
      AFSNumber: "410041",
      AFSName: "EQUITY & SUPER PTY LTD",
    },
    {
      AFSNumber: "410109",
      AFSName: "CARDINAL FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "410134",
      AFSName: "PILOT WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "410224",
      AFSName: "VICINITY CENTRES RE LTD",
    },
    {
      AFSNumber: "410316",
      AFSName: "EMR CAPITAL PTY LTD",
    },
    {
      AFSNumber: "410381",
      AFSName: "CONTEGO INVESTMENT PARTNERS PTY LTD",
    },
    {
      AFSNumber: "410437",
      AFSName: "SHEFFIELD INSURANCE PTY LTD",
    },
    {
      AFSNumber: "410502",
      AFSName: "PANTAENIUS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "410554",
      AFSName: "IKON COMMODITIES PTY LIMITED",
    },
    {
      AFSNumber: "410588",
      AFSName: "EVERSTONE WEALTH PTY LTD",
    },
    {
      AFSNumber: "410681",
      AFSName: "PU PRIME TRADING PTY LTD",
    },
    {
      AFSNumber: "410967",
      AFSName: "MILESTONE ADVISORS PTY LTD",
    },
    {
      AFSNumber: "411056",
      AFSName: "ACURE FUNDS MANAGEMENT LTD",
    },
    {
      AFSNumber: "411082",
      AFSName: "OUR RETIREMENT PTY. LTD.",
    },
    {
      AFSNumber: "411126",
      AFSName: "VANTAGE PI PTY LTD",
    },
    {
      AFSNumber: "411136",
      AFSName: "MAX CAPITAL PTY LTD",
    },
    {
      AFSNumber: "411216",
      AFSName: "M.H. CARNEGIE & CO. PTY LTD",
    },
    {
      AFSNumber: "411227",
      AFSName: "NOW FINANCIAL GROUP PTY LIMITED",
    },
    {
      AFSNumber: "411324",
      AFSName: "SPECIALIST INVESTMENT MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "411440",
      AFSName: "MY SUPER FUTURE PTY LTD",
    },
    {
      AFSNumber: "411478",
      AFSName: "SUPERWISE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "411655",
      AFSName: "LIFE RISK PARTNERS PTY LTD",
    },
    {
      AFSNumber: "411699",
      AFSName: "YOUR FINANCIAL WELLBEING PTY LTD",
    },
    {
      AFSNumber: "411766",
      AFSName: "MERCER FINANCIAL ADVICE (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "411770",
      AFSName: "MERCER CONSULTING (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "411846",
      AFSName: "BLUEWATER FINANCIAL ADVISORS PTY LTD",
    },
    {
      AFSNumber: "411919",
      AFSName: "TRIPLE 5 LIMITED",
    },
    {
      AFSNumber: "411980",
      AFSName: "MERCER OUTSOURCING (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "412063",
      AFSName: "EVOLUTION ADVISORY PTY LTD",
    },
    {
      AFSNumber: "412079",
      AFSName: "WEALTHSTREAM FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "412113",
      AFSName: "DIVITIA PTY LTD",
    },
    {
      AFSNumber: "412146",
      AFSName: "ASENA FAMILY OFFICE PTY LTD",
    },
    {
      AFSNumber: "412226",
      AFSName: "CRYSTAL WEALTH PARTNERS LTD",
    },
    {
      AFSNumber: "412302",
      AFSName: "APP FINANCIAL ADVISERS PTY. LTD.",
    },
    {
      AFSNumber: "412370",
      AFSName: "BLUE SUMMIT FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "412452",
      AFSName: "CAMERON HARRISON PRIVATE PTY LTD",
    },
    {
      AFSNumber: "412454",
      AFSName: "CAMERON HARRISON ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "412585",
      AFSName: "UBIQUE ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "412681",
      AFSName: "MEDISURE INDEMNITY AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "412765",
      AFSName: "BLUE OCEAN EQUITIES PTY LIMITED",
    },
    {
      AFSNumber: "412816",
      AFSName: "TF GLOBAL SECURITIES (AUST) PTY LTD",
    },
    {
      AFSNumber: "412820",
      AFSName: "HOWARD-OSMOND FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "412862",
      AFSName: "SOUTHERN CROSS EQUITY GROUP PTY LTD",
    },
    {
      AFSNumber: "412901",
      AFSName: "BANK OF AMERICA  NATIONAL ASSOCIATION",
    },
    {
      AFSNumber: "412935",
      AFSName: "PROSERPINE CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "412981",
      AFSName: "OANDA AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "413272",
      AFSName: "ADVICE PROFESSIONALS PTY LTD",
    },
    {
      AFSNumber: "413564",
      AFSName: "ANASTASIOU FINANCIAL SERVICES PTY. LIMITED",
    },
    {
      AFSNumber: "413585",
      AFSName: "BLUEBLOOD THOROUGHBREDS (AUST) PTY LTD",
    },
    {
      AFSNumber: "413613",
      AFSName: "LFI GROUP PTY LTD",
    },
    {
      AFSNumber: "413674",
      AFSName: "FUTURE ASSIST FINANCIAL SERVICES GROUP PTY LTD",
    },
    {
      AFSNumber: "413749",
      AFSName: "ALTRINSIC GLOBAL ADVISORS (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "413980",
      AFSName: "ELKCORP PTY LTD",
    },
    {
      AFSNumber: "414142",
      AFSName: "KILTER INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "414198",
      AFSName: "EC MARKETS FINANCIAL LIMITED",
    },
    {
      AFSNumber: "414225",
      AFSName: "SECVEST CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "414252",
      AFSName: "PROGRESSIVE GREEN TRADING PTY LTD",
    },
    {
      AFSNumber: "414530",
      AFSName: "PEPPERSTONE GROUP LIMITED",
    },
    {
      AFSNumber: "414570",
      AFSName: "SOCIAL ENTERPRISE FINANCE AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "414823",
      AFSName: "JUST FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "415160",
      AFSName: "TASMANIAN INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "415209",
      AFSName: "OAK HILL ADVISORS (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "415314",
      AFSName: "SIRIUS FINANCIAL ADVISERS PTY LTD",
    },
    {
      AFSNumber: "415324",
      AFSName: "AMO FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "415416",
      AFSName: "CIGNA INTERNATIONAL SERVICES AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "415611",
      AFSName: "ADARA ADVISORS PTY. LIMITED",
    },
    {
      AFSNumber: "415632",
      AFSName: "TAG FINANCIAL ADVISORS PTY LTD",
    },
    {
      AFSNumber: "415657",
      AFSName: "HINDMARSH CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "415723",
      AFSName: "MARKHAM REAL ESTATE PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "415753",
      AFSName: "PEET FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "415833",
      AFSName: "PAYMATE PTY LTD",
    },
    {
      AFSNumber: "415862",
      AFSName: "INGENIA COMMUNITIES RE LIMITED",
    },
    {
      AFSNumber: "416019",
      AFSName: "INSURE ME NOW PTY. LIMITED",
    },
    {
      AFSNumber: "416146",
      AFSName: "METRICS CREDIT PARTNERS PTY LTD",
    },
    {
      AFSNumber: "416279",
      AFSName: "MEX AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "416353",
      AFSName: "GLENDON SOUTHERN BROKERS PTY LTD",
    },
    {
      AFSNumber: "416354",
      AFSName: "STELLAN CAPITAL GROUP PTY LTD",
    },
    {
      AFSNumber: "416441",
      AFSName: "AUSTRALIA PACIFIC MORTGAGE FUND LTD",
    },
    {
      AFSNumber: "416570",
      AFSName: "MONASH PRIVATE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "416755",
      AFSName: "VANECK INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "416775",
      AFSName: "PLAYFAIRTAN PTY LTD",
    },
    {
      AFSNumber: "416778",
      AFSName: "ST FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "416879",
      AFSName: "ACTUITY CAPITAL PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "416956",
      AFSName: "ALPHA NODE ADVISORS PTY LTD",
    },
    {
      AFSNumber: "417204",
      AFSName: "UPRIGHT FUNDS PTY LTD",
    },
    {
      AFSNumber: "417218",
      AFSName: "DREAM THOROUGHBREDS PTY LTD",
    },
    {
      AFSNumber: "417371",
      AFSName: "OPEN CORP FUNDS MANAGEMENT LTD",
    },
    {
      AFSNumber: "417441",
      AFSName: "OPTION FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "417488",
      AFSName: "MCKINNON FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "417585",
      AFSName: "SHELL ENERGY RETAIL MARKETS PTY LTD",
    },
    {
      AFSNumber: "417684",
      AFSName: "ST. MICHAEL'S FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "417727",
      AFSName: "PLUS500AU PTY. LTD.",
    },
    {
      AFSNumber: "417744",
      AFSName: "FIRST LIGHT RACING PTY LTD",
    },
    {
      AFSNumber: "417964",
      AFSName: "JLT GROUP SERVICES PTY LTD",
    },
    {
      AFSNumber: "418017",
      AFSName: "AFG SECURITIES PTY LTD",
    },
    {
      AFSNumber: "418036",
      AFSName: "AT GLOBAL MARKETS (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "418105",
      AFSName: "PAYRIX AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "418194",
      AFSName: "LENDLEASE IMT (SM) PTY LTD",
    },
    {
      AFSNumber: "418198",
      AFSName: "PAS ADVISORY SERVICES PTY LTD",
    },
    {
      AFSNumber: "418418",
      AFSName: "VERTICAL CAPITAL MARKETS PTY. LTD.",
    },
    {
      AFSNumber: "418445",
      AFSName: "LIGHTHOUSE WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "418476",
      AFSName: "CROMWELL REAL ESTATE PARTNERS LIMITED",
    },
    {
      AFSNumber: "418504",
      AFSName: "MAVEN CAPITAL PTY LTD",
    },
    {
      AFSNumber: "418512",
      AFSName: "ELLIOTT AUSTRALIA GROUP PTY LTD",
    },
    {
      AFSNumber: "418700",
      AFSName: "PARETO GROUP PTY LTD",
    },
    {
      AFSNumber: "418747",
      AFSName: "HLB WEALTH MANAGEMENT (WOLLONGONG) PTY LTD",
    },
    {
      AFSNumber: "418755",
      AFSName: "WOODINA UNDERWRITING AGENCY PTY LIMITED",
    },
    {
      AFSNumber: "418872",
      AFSName: "BULL & BEAR FINANCIAL STRATEGIES PTY LTD",
    },
    {
      AFSNumber: "418895",
      AFSName: "IDA SECURITIES PTY LTD",
    },
    {
      AFSNumber: "418953",
      AFSName: "AQUILA SECURITIES PTY. LTD.",
    },
    {
      AFSNumber: "418958",
      AFSName: "WMS CORPORATE SERVICES PTY LTD",
    },
    {
      AFSNumber: "419007",
      AFSName: "TILT RENEWABLES MARKET SERVICES PTY LTD",
    },
    {
      AFSNumber: "419010",
      AFSName: "VIVIENNE COURT TRADING PTY LTD",
    },
    {
      AFSNumber: "419016",
      AFSName: "GINN & PENNY PTY LTD",
    },
    {
      AFSNumber: "419043",
      AFSName: "CAPITALAND AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "419306",
      AFSName: "TATARELLI SECURITIES PTY LTD",
    },
    {
      AFSNumber: "419715",
      AFSName: "EM ADVISORY PTY LTD",
    },
    {
      AFSNumber: "419916",
      AFSName: "MORPHIC ASSET MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "419924",
      AFSName: "COR CAPITAL PTY LTD",
    },
    {
      AFSNumber: "420069",
      AFSName: "CREDIT PROTECTION INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "420082",
      AFSName: "OPHIR ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "420085",
      AFSName: "KKR AUSTRALIA INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "420093",
      AFSName: "DELTA RESEARCH & ADVISORY PTY LTD",
    },
    {
      AFSNumber: "420125",
      AFSName: "ALLEGRA WEALTH PTY LIMITED",
    },
    {
      AFSNumber: "420170",
      AFSName: "SAMUEL ALLGATE INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "420174",
      AFSName: "WILLIAM BUCK NOMINEES (SA) PTY LTD",
    },
    {
      AFSNumber: "420183",
      AFSName: "PETSURE (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "420220",
      AFSName: "RESOURCE SUPER PTY LTD",
    },
    {
      AFSNumber: "420224",
      AFSName: "ETO GROUP PTY LTD",
    },
    {
      AFSNumber: "420225",
      AFSName: "ABC FUND MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "420237",
      AFSName: "COLONIAL NOMINEES PROPRIETARY LIMITED",
    },
    {
      AFSNumber: "420268",
      AFSName: "ROYAL FINANCIAL TRADING PTY LTD",
    },
    {
      AFSNumber: "420274",
      AFSName: "MARGARET STREET PROMOTER SERVICES PTY LTD",
    },
    {
      AFSNumber: "420367",
      AFSName: "GUIDEWAY FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "420378",
      AFSName: "MBFS PTY LTD",
    },
    {
      AFSNumber: "420464",
      AFSName: "BLUE LANTERN FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "420509",
      AFSName: "ARGYLE SECURITIES PTY LTD",
    },
    {
      AFSNumber: "420784",
      AFSName: "BLACKOAK SECURITIES PTY LTD",
    },
    {
      AFSNumber: "421031",
      AFSName: "DAWSON INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "421077",
      AFSName: "FEDERATION CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "421125",
      AFSName: "CVS LANE CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "421210",
      AFSName: "STARTRADER PRIME GLOBAL PTY LTD",
    },
    {
      AFSNumber: "421214",
      AFSName: "J.B. NORTH & CO PTY LTD",
    },
    {
      AFSNumber: "421246",
      AFSName: "MGF CAPITAL PTY LTD",
    },
    {
      AFSNumber: "421290",
      AFSName: "B. MOSES INVESTMENT SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "421310",
      AFSName: "BERKHOLTS INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "421336",
      AFSName: "REALM PTY. LTD.",
    },
    {
      AFSNumber: "421414",
      AFSName: "MONOOVA GLOBAL PAYMENTS PTY LTD",
    },
    {
      AFSNumber: "421445",
      AFSName: "LONSEC RESEARCH PTY LTD",
    },
    {
      AFSNumber: "421458",
      AFSName: "ACCIONA ENERGY OCEANIA FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "421469",
      AFSName: "CTSP FUNDS MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "421478",
      AFSName: "SHERBROOK PRIVATE PTY LTD",
    },
    {
      AFSNumber: "421535",
      AFSName: "ON-MARKET BOOKBUILDS PTY LIMITED",
    },
    {
      AFSNumber: "421584",
      AFSName: "VESTYN CAPITAL PTY LTD",
    },
    {
      AFSNumber: "421704",
      AFSName: "EC POHL & CO PTY LTD",
    },
    {
      AFSNumber: "421789",
      AFSName: "SELFWEALTH PTY LTD",
    },
    {
      AFSNumber: "421904",
      AFSName: "STEADFAST LIFE PTY LTD",
    },
    {
      AFSNumber: "421913",
      AFSName: "SQM RESEARCH PTY LTD",
    },
    {
      AFSNumber: "422018",
      AFSName: "HDL INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "422120",
      AFSName: "NEWHAVEN WEALTH PTY LTD",
    },
    {
      AFSNumber: "422216",
      AFSName: "ASURION FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "422409",
      AFSName: "SHARTRU WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "422477",
      AFSName: "ALPINE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "422555",
      AFSName: "HART ENSOLE PTY LTD",
    },
    {
      AFSNumber: "422593",
      AFSName: "PRIVATE CAPITAL ADVISERS PTY LTD",
    },
    {
      AFSNumber: "422608",
      AFSName: "CRE INSURANCE BROKING PTY LTD",
    },
    {
      AFSNumber: "422661",
      AFSName: "TRADE NATION AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "422672",
      AFSName: "A.C.N. 152 571 741 PTY LTD",
    },
    {
      AFSNumber: "422704",
      AFSName: "CENTRA WEALTH PTY LTD",
    },
    {
      AFSNumber: "422713",
      AFSName: "HCUT PTY LTD",
    },
    {
      AFSNumber: "422723",
      AFSName: "LEWIS EQUITY SERVICES PTY LTD",
    },
    {
      AFSNumber: "422756",
      AFSName: "IFM FIDUCIARY PTY LTD",
    },
    {
      AFSNumber: "422757",
      AFSName: "IFM FIDUCIARY NO. 2 PTY LTD",
    },
    {
      AFSNumber: "422763",
      AFSName: "LIBERTAS WEALTH CONSULTING PTY LTD",
    },
    {
      AFSNumber: "422902",
      AFSName: "SKYRING ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "422926",
      AFSName: "COMPARE THE MARKET PTY LTD",
    },
    {
      AFSNumber: "423168",
      AFSName: "OWNERSHIP MATTERS PTY LTD",
    },
    {
      AFSNumber: "423636",
      AFSName: "ACCTPRO FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "423647",
      AFSName: "GOAL ADVISORY PTY. LTD.",
    },
    {
      AFSNumber: "423658",
      AFSName: "TALLSHIP CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "423710",
      AFSName: "FIRST MUTUAL AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "423918",
      AFSName: "COVERIGHT INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "423984",
      AFSName: "MAGMA CAPITAL ADVISORY PTY LIMITED",
    },
    {
      AFSNumber: "424008",
      AFSName: "FINALTO (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "424016",
      AFSName: "ELLIOTT DAVIES PTY. LTD.",
    },
    {
      AFSNumber: "424122",
      AFSName: "TRIVE FINANCIAL SERVICES AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "424494",
      AFSName: "ENVA AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "424585",
      AFSName: "DECANTE CAPITAL ADVISORS PTY. LTD.",
    },
    {
      AFSNumber: "424605",
      AFSName: "PROGRESSIVE WEALTH SERVICES PTY LTD",
    },
    {
      AFSNumber: "424658",
      AFSName: "BAIOCCHI GRIFFIN PRIVATE WEALTH PTY. LTD.",
    },
    {
      AFSNumber: "424670",
      AFSName: "INTROVEST PTY LTD",
    },
    {
      AFSNumber: "424700",
      AFSName: "TF GLOBAL MARKETS (AUST) PTY LTD",
    },
    {
      AFSNumber: "424970",
      AFSName: "TORO LIBERTY PTY. LTD.",
    },
    {
      AFSNumber: "424974",
      AFSName: "CONSILIUM ADVICE PTY LTD",
    },
    {
      AFSNumber: "425187",
      AFSName: "EMC SECURITIES PTY. LTD.",
    },
    {
      AFSNumber: "425272",
      AFSName: "BLUE NRG PTY. LTD.",
    },
    {
      AFSNumber: "425278",
      AFSName: "KIMBER CAPITAL PTY LTD",
    },
    {
      AFSNumber: "425334",
      AFSName: "HARVEST LANE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "425376",
      AFSName: "KALKINE PTY LIMITED",
    },
    {
      AFSNumber: "425398",
      AFSName: "GM PROPERTY CAPITAL PTY LTD",
    },
    {
      AFSNumber: "425488",
      AFSName: "WEACT PTY LTD",
    },
    {
      AFSNumber: "425511",
      AFSName: "PFA ADVISER SERVICES PTY LTD",
    },
    {
      AFSNumber: "425512",
      AFSName: "AUSTRALIAN CARBON TRADERS PTY LTD",
    },
    {
      AFSNumber: "425530",
      AFSName: "PALOMA INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "425565",
      AFSName: "SIGMA GLOBAL PTY LTD",
    },
    {
      AFSNumber: "425572",
      AFSName: "EDGE ENERGY TRADING PTY LTD",
    },
    {
      AFSNumber: "425573",
      AFSName: "SMS INSURANCE PTY LTD",
    },
    {
      AFSNumber: "425609",
      AFSName: "NAVITUS PTY LTD",
    },
    {
      AFSNumber: "425610",
      AFSName: "AUSTRALIAN INTEGRATED CARBON FINANCIAL SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "425614",
      AFSName: "WHITECOVE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "425618",
      AFSName: "PREFERRED CARBON AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "425803",
      AFSName: "ADDISON TAYLOR HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "425925",
      AFSName: "TAF CAPITAL PTY LTD",
    },
    {
      AFSNumber: "425966",
      AFSName: "RESOLUTE PROPERTY PROTECT PTY LTD",
    },
    {
      AFSNumber: "426359",
      AFSName: "INTELLIGENT FINANCIAL MARKETS PTY LTD",
    },
    {
      AFSNumber: "426369",
      AFSName: "RAVEN CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "426385",
      AFSName: "SYMMETRY GROUP PTY LTD",
    },
    {
      AFSNumber: "426455",
      AFSName: "DEXUS CAPITAL FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "426503",
      AFSName: "ONE WHOLESALE FUND SERVICES LTD",
    },
    {
      AFSNumber: "426565",
      AFSName: "SOLSTICE FINANCIAL SERVICES (SFS) PTY LTD",
    },
    {
      AFSNumber: "426603",
      AFSName: "REGION RE LIMITED",
    },
    {
      AFSNumber: "426687",
      AFSName: "COURTLEY ROY PTY LTD",
    },
    {
      AFSNumber: "426722",
      AFSName: "PRINCIPAL PARTNERS (VIC) PTY LTD",
    },
    {
      AFSNumber: "426746",
      AFSName: "ARCH UNDERWRITING AT LLOYD'S (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "426782",
      AFSName: "PEAK ADVISORS PTY. LTD.",
    },
    {
      AFSNumber: "426797",
      AFSName: "FOCUS INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "426800",
      AFSName: "POWER TRADING CAPITAL LTD",
    },
    {
      AFSNumber: "426801",
      AFSName: "DEXUS WHOLESALE MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "426810",
      AFSName: "EBONFX AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "426939",
      AFSName: "SENTINEL FUND MANAGER AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "427216",
      AFSName: "CONSCIOUS CAPITAL LIMITED",
    },
    {
      AFSNumber: "427218",
      AFSName: "GUIDED WEALTH PTY LTD",
    },
    {
      AFSNumber: "427275",
      AFSName: "TITAN PARTNERS CORPORATE FINANCE PTY LTD",
    },
    {
      AFSNumber: "427277",
      AFSName: "BRINCA PROPERTY MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "427278",
      AFSName: "USS SERVICES PTY LTD",
    },
    {
      AFSNumber: "427283",
      AFSName: "DS CAPITAL PTY LTD",
    },
    {
      AFSNumber: "427401",
      AFSName: "PALADIN WEALTH ADVISERS PTY LTD",
    },
    {
      AFSNumber: "427406",
      AFSName: "ARABIN-FOYE PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "427515",
      AFSName: "MA ASSET MANAGEMENT LTD",
    },
    {
      AFSNumber: "427552",
      AFSName: "NCXHUB PTY LTD",
    },
    {
      AFSNumber: "427666",
      AFSName: "ALTERNATIVE SECURITIES PTY LTD",
    },
    {
      AFSNumber: "427704",
      AFSName: "BANK OF BARODA",
    },
    {
      AFSNumber: "427730",
      AFSName: "MCGING ADVISORY & ACTUARIAL PTY LTD",
    },
    {
      AFSNumber: "427848",
      AFSName: "AUS GLOBAL FINANCIAL (AU) PTY. LTD.",
    },
    {
      AFSNumber: "427921",
      AFSName: "GREEN B AUSTRALIA PTY. LTD.",
    },
    {
      AFSNumber: "427925",
      AFSName: "BEDBROOK PARTNERS PTY LTD",
    },
    {
      AFSNumber: "428014",
      AFSName: "AUSCAP ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "428015",
      AFSName: "INGOT AU PTY LTD",
    },
    {
      AFSNumber: "428272",
      AFSName: "EXELSUPER ADVICE PTY LTD",
    },
    {
      AFSNumber: "428289",
      AFSName: "MELBOURNE SECURITIES CORPORATION LIMITED",
    },
    {
      AFSNumber: "428337",
      AFSName: "HAYBERRY ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "428451",
      AFSName: "NEW WORLD ADVISERS GROUP PTY LTD",
    },
    {
      AFSNumber: "428738",
      AFSName: "ASX COLLATERAL MANAGEMENT SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "428848",
      AFSName: "MPFINPLAN PTY. LTD.",
    },
    {
      AFSNumber: "428865",
      AFSName: "SOCIAL VENTURES AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "428885",
      AFSName: "EMR CAPITAL ADVISORS PTY LTD",
    },
    {
      AFSNumber: "428901",
      AFSName: "VANTAGE GLOBAL PRIME PTY LTD",
    },
    {
      AFSNumber: "428989",
      AFSName: "VICTORIA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "429035",
      AFSName: "BRIDGELANE ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "429066",
      AFSName: "CAPITAL AND TREASURY SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "429377",
      AFSName: "ROSKOW INDEPENDENT ADVISORY PTY LTD",
    },
    {
      AFSNumber: "429443",
      AFSName: "SAICMB AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "429459",
      AFSName: "AUSTRALIAN FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "429511",
      AFSName: "PRINCETON FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "429513",
      AFSName: "CONGEN INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "429711",
      AFSName: "APTIXLAB PTY LTD",
    },
    {
      AFSNumber: "429738",
      AFSName: "POINT ZERO INTERNATIONAL PTY LTD",
    },
    {
      AFSNumber: "429768",
      AFSName: "CHECKVAULT PTY LTD",
    },
    {
      AFSNumber: "429777",
      AFSName: "LIVERPOOL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "429778",
      AFSName: "WOORI BANK",
    },
    {
      AFSNumber: "429874",
      AFSName: "360 QUICK CONSTRUCT PTY LTD",
    },
    {
      AFSNumber: "430036",
      AFSName: "TEM FINANCIAL SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "430062",
      AFSName: "SMSF ADVISERS NETWORK PTY LTD",
    },
    {
      AFSNumber: "430126",
      AFSName: "NON CORRELATED ADVISORS PTY LTD",
    },
    {
      AFSNumber: "430130",
      AFSName: "SORRENTO CAPITAL ADVISERS PTY. LTD.",
    },
    {
      AFSNumber: "430135",
      AFSName: "CARBON FARMERS OF AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "430150",
      AFSName: "SUPERHERO SECURITIES LIMITED",
    },
    {
      AFSNumber: "430166",
      AFSName: "UNIFIED PROPERTY GROUP LTD",
    },
    {
      AFSNumber: "430190",
      AFSName: "EXPERIEN GENERAL INSURANCE SERVICES PTY LTD",
    },
    {
      AFSNumber: "430197",
      AFSName: "BRIGHTSTONE CAPITAL ADVISORS PTY. LTD.",
    },
    {
      AFSNumber: "430199",
      AFSName: "CORPORATE CARBON ADVISORY PTY LTD",
    },
    {
      AFSNumber: "430250",
      AFSName: "CLIMATE FRIENDLY FINANCIAL SOLUTIONS PTY. LIMITED",
    },
    {
      AFSNumber: "430319",
      AFSName: "PORTFOLIO PLANNERS PRIVATE PTY LTD",
    },
    {
      AFSNumber: "430450",
      AFSName: "IVY SECURITIES PTY LTD",
    },
    {
      AFSNumber: "430572",
      AFSName: "ANSELL FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "430574",
      AFSName: "ORACLE INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "430631",
      AFSName: "EDL CONTRACTING PTY LTD",
    },
    {
      AFSNumber: "430694",
      AFSName: "HARRINGTON CUSTODIAN PTY LIMITED",
    },
    {
      AFSNumber: "431079",
      AFSName: "DOMUS MANAGEMENT CO. PTY LIMITED",
    },
    {
      AFSNumber: "431090",
      AFSName: "MANIFORD PTY LIMITED",
    },
    {
      AFSNumber: "431182",
      AFSName: "TURRET INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "431183",
      AFSName: "XCA MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "431245",
      AFSName: "FC FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "431258",
      AFSName: "OPTIMAL AFSL PTY LTD",
    },
    {
      AFSNumber: "431344",
      AFSName: "BEDROCK CAPITAL PTY LTD",
    },
    {
      AFSNumber: "431354",
      AFSName: "AUSSIE FOREX & FINANCE PTY LTD",
    },
    {
      AFSNumber: "431382",
      AFSName: "GATEWAY FINANCIAL MARKETING PTY LTD",
    },
    {
      AFSNumber: "431387",
      AFSName: "JAMESON GLOBAL INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "431426",
      AFSName: "PENDAL FUND SERVICES LIMITED",
    },
    {
      AFSNumber: "431530",
      AFSName: "WOODCHESTER CAPITAL PTY LTD",
    },
    {
      AFSNumber: "431622",
      AFSName: "EMERGE CAPITAL PARTNERS (TRANSACTIONS) PTY LTD",
    },
    {
      AFSNumber: "431747",
      AFSName: "A.C.N. 153 702 008 PTY LTD",
    },
    {
      AFSNumber: "431904",
      AFSName: "THE MARKETS ACADEMY PTY LTD",
    },
    {
      AFSNumber: "432001",
      AFSName: "STONEHOUSE CORPORATION PTY LTD",
    },
    {
      AFSNumber: "432092",
      AFSName: "VESPARUM CAPITAL PTY LTD",
    },
    {
      AFSNumber: "432119",
      AFSName: "NANUK ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "432197",
      AFSName: "STEWARD WEALTH PTY LTD",
    },
    {
      AFSNumber: "432297",
      AFSName: "CAIP SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "432322",
      AFSName: "HAWKESBURY PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "432424",
      AFSName: "MERRILL LYNCH MARKETS (AUSTRALIA) PTY. LIMITED.",
    },
    {
      AFSNumber: "432426",
      AFSName: "STAMFORD (WEALTH MANAGEMENT) PTY LTD",
    },
    {
      AFSNumber: "432619",
      AFSName: "SIRONA CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "432636",
      AFSName: "WALSHS FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "432670",
      AFSName: "INVESTORY PTY LTD",
    },
    {
      AFSNumber: "432787",
      AFSName: "AUSTRALASIA FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "432803",
      AFSName: "AVIATOR CAPITAL PTY LTD",
    },
    {
      AFSNumber: "432882",
      AFSName: "AUSSIE INSURANCE BROKERS PTY. LTD.",
    },
    {
      AFSNumber: "432993",
      AFSName: "VERITAS WEALTH SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "433022",
      AFSName: "DRAPAC ADVISORY PTY LTD",
    },
    {
      AFSNumber: "433133",
      AFSName: "THE MILLS ADMINISTRATION PTY LTD",
    },
    {
      AFSNumber: "433227",
      AFSName: "OZPROP CAPITAL PTY LTD",
    },
    {
      AFSNumber: "433312",
      AFSName: "FISHER INVESTMENTS AUSTRALASIA PTY LTD",
    },
    {
      AFSNumber: "433439",
      AFSName: "THE FINANCIAL ADVISER HOUSE PTY LTD",
    },
    {
      AFSNumber: "433442",
      AFSName: "FLINDERS LANE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "433465",
      AFSName: "ARDROSSAN INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "433688",
      AFSName: "COMMERCIAL & GENERAL FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "433814",
      AFSName: "CUTCHER & NEALE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "433831",
      AFSName: "FEDERATED INVESTORS AUSTRALIA SERVICES LTD.",
    },
    {
      AFSNumber: "433984",
      AFSName: "ACHMEA SCHADEVERZEKERINGEN N.V.",
    },
    {
      AFSNumber: "434065",
      AFSName: "THE WELFARE FUND LIMITED",
    },
    {
      AFSNumber: "434071",
      AFSName: "PBA CORPORATION PTY. LTD.",
    },
    {
      AFSNumber: "434276",
      AFSName: "GREENWICH INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "434376",
      AFSName: "FINANCIAL INCLUSION PTY LIMITED",
    },
    {
      AFSNumber: "434377",
      AFSName: "CMT FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "434533",
      AFSName: "VASCO RESPONSIBLE ENTITY SERVICES LIMITED",
    },
    {
      AFSNumber: "434558",
      AFSName: "NOONTIDE INVESTMENTS LTD",
    },
    {
      AFSNumber: "434566",
      AFSName: "HIGHBURY PARTNERSHIP PTY LTD",
    },
    {
      AFSNumber: "434704",
      AFSName: "ABILITY ONE FINANCIAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "434776",
      AFSName: "INSTREET INVESTMENT LIMITED",
    },
    {
      AFSNumber: "434894",
      AFSName: "FISCAL ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "434899",
      AFSName: "BALMEDIE FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "434976",
      AFSName: "TOTALENERGIES GAS & POWER ASIA PRIVATE LIMITED",
    },
    {
      AFSNumber: "434990",
      AFSName: "SUREFIRE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "435101",
      AFSName: "MITSUI & CO. RISK SOLUTIONS LTD.",
    },
    {
      AFSNumber: "435197",
      AFSName: "CAPRICORN INSURANCE SERVICES PTY LTD",
    },
    {
      AFSNumber: "435200",
      AFSName: "HERMES CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "435235",
      AFSName: "HUDSON GORE PTY LTD",
    },
    {
      AFSNumber: "435500",
      AFSName: "BC CAPITAL PTY LTD",
    },
    {
      AFSNumber: "435538",
      AFSName: "STEADFAST IRS PTY LIMITED",
    },
    {
      AFSNumber: "435725",
      AFSName: "RIGHT CLICK CAPITAL MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "435732",
      AFSName: "FORTITUDE PRIVATE WEALTH PTY LTD.",
    },
    {
      AFSNumber: "435751",
      AFSName: "SUPERVISION SMSF SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "435808",
      AFSName: "FLINDERS WEALTH PTY LTD",
    },
    {
      AFSNumber: "435823",
      AFSName: "CROWN AUSTRALIA ASSET MANAGEMENT PTY. LTD.",
    },
    {
      AFSNumber: "436121",
      AFSName: "APT WEALTH PARTNERS PTY LTD",
    },
    {
      AFSNumber: "436171",
      AFSName: "CBRE CAPITAL ADVISORS (ASIA PACIFIC) PTY LIMITED",
    },
    {
      AFSNumber: "436232",
      AFSName: "YX BALL FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "436292",
      AFSName: "OPTIMUS PRIVATE EQUITY PTY LTD",
    },
    {
      AFSNumber: "436298",
      AFSName: "INTEGRITY PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "436347",
      AFSName: "MCGRATHNICOL TRANSACTION ADVISORY PTY LTD",
    },
    {
      AFSNumber: "436357",
      AFSName: "WATERSHED DEALER SERVICES PTY LTD",
    },
    {
      AFSNumber: "436416",
      AFSName: "TRADEMAX AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "436740",
      AFSName: "CWM PERTH FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "436802",
      AFSName: "CPG FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "436836",
      AFSName: "CLAN CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "436859",
      AFSName: "ELLERFIELD PRIVATE WEALTH PTY LIMITED",
    },
    {
      AFSNumber: "436915",
      AFSName: "SECURITY CAPITAL AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "436967",
      AFSName: "RESOLUTE FINANCIAL ADVISORY PTY LTD",
    },
    {
      AFSNumber: "437164",
      AFSName: "LDB FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "437334",
      AFSName: "FAWKNER PROPERTY LTD",
    },
    {
      AFSNumber: "437398",
      AFSName: "BLOOM ADVISORY GROUP PTY LTD",
    },
    {
      AFSNumber: "437518",
      AFSName: "AVALONFS PTY LTD",
    },
    {
      AFSNumber: "437543",
      AFSName: "CORPSURE IPL PTY LTD",
    },
    {
      AFSNumber: "437581",
      AFSName: "STOCKWELL FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "437669",
      AFSName: "GPV PROPERTY PTY LIMITED",
    },
    {
      AFSNumber: "437838",
      AFSName: "PIPECLAY LAWSON LTD",
    },
    {
      AFSNumber: "437907",
      AFSName: "PANOPTIC WEALTH HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "437917",
      AFSName: "CANSTAR RESEARCH PTY LTD",
    },
    {
      AFSNumber: "437971",
      AFSName: "SAPPHIRE STAR PTY LTD",
    },
    {
      AFSNumber: "438077",
      AFSName: "THREE BRIDGE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "438152",
      AFSName: "PROPERTIES & PATHWAYS PTY LTD",
    },
    {
      AFSNumber: "438157",
      AFSName: "DAVANTAGE GROUP PTY LTD",
    },
    {
      AFSNumber: "438226",
      AFSName: "PLATINUM GATE PROPRIETARY LIMITED",
    },
    {
      AFSNumber: "438262",
      AFSName: "ROYSTON CAPITAL PTY LTD",
    },
    {
      AFSNumber: "438283",
      AFSName: "26 DEGREES GLOBAL MARKETS PTY LTD",
    },
    {
      AFSNumber: "438285",
      AFSName: "LHC CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "438287",
      AFSName: "PHOENIX PRIVATE WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "438402",
      AFSName: "OX SECURITIES PTY LTD",
    },
    {
      AFSNumber: "438458",
      AFSName: "LJFD PTY LTD",
    },
    {
      AFSNumber: "438603",
      AFSName: "LWM FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "438605",
      AFSName: "HAMPTON PROPERTY GROUP PTY LTD",
    },
    {
      AFSNumber: "438631",
      AFSName: "NKH KNIGHT HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "438644",
      AFSName: "ROYALE WEALTH CO PTY LTD",
    },
    {
      AFSNumber: "438659",
      AFSName: "OAK CAPITAL MORTGAGE FUND LIMITED",
    },
    {
      AFSNumber: "438693",
      AFSName: "FIFE CAPITAL FUNDS LIMITED",
    },
    {
      AFSNumber: "438941",
      AFSName: "INTEGRALIFE PTY LTD",
    },
    {
      AFSNumber: "438949",
      AFSName: "OSTERMEYER INVESTMENT PARTNERS PTY LTD",
    },
    {
      AFSNumber: "438950",
      AFSName: "STRATEGIC FINANCIAL MANAGEMENT PTY. LTD.",
    },
    {
      AFSNumber: "438982",
      AFSName: "FOCUS CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "438986",
      AFSName: "INFRADEBT PTY LTD",
    },
    {
      AFSNumber: "439007",
      AFSName: "CHANNEL INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "439065",
      AFSName: "BOMBORA ADVICE PTY LTD",
    },
    {
      AFSNumber: "439095",
      AFSName: "ARROW FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "439184",
      AFSName: "GLOBAL CAPITAL ASSETS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "439327",
      AFSName: "KEYSTONE CAPITAL LIMITED",
    },
    {
      AFSNumber: "439452",
      AFSName: "ADVISER SERVICES PTY LTD",
    },
    {
      AFSNumber: "439732",
      AFSName: "STATEWIDE NOVATED LEASING PTY LTD",
    },
    {
      AFSNumber: "440046",
      AFSName: "HAMILTON WEALTH PARTNERS PTY LTD",
    },
    {
      AFSNumber: "440143",
      AFSName: "DOMUS PRIVATE CLIENTS PTY LTD",
    },
    {
      AFSNumber: "440242",
      AFSName: "APRIBA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "440382",
      AFSName: "ARQUERO INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "440641",
      AFSName: "CATALYST HEALTH REIT PTY LTD",
    },
    {
      AFSNumber: "440821",
      AFSName: "SPITFIRE OPERATIONS PTY LTD",
    },
    {
      AFSNumber: "440900",
      AFSName: "AUSFUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "441213",
      AFSName: "JEMENNA CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "441277",
      AFSName: "R S FINANCE PTY LTD",
    },
    {
      AFSNumber: "441376",
      AFSName: "ENETT INTERNATIONAL (SINGAPORE) PTE. LTD.",
    },
    {
      AFSNumber: "441581",
      AFSName: "SOLIUM CAPITAL (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "441845",
      AFSName: "KORDAMENTHA FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "441891",
      AFSName: "CAPITAL 19 PTY LTD",
    },
    {
      AFSNumber: "442377",
      AFSName: "BELLINGER ASSET MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "442477",
      AFSName: "CAMBIAN CAPITAL ADVISORY PTY LTD",
    },
    {
      AFSNumber: "442806",
      AFSName: "KM PROPERTY FUNDS LTD",
    },
    {
      AFSNumber: "442840",
      AFSName: "WERATON CONSULTING PTY LTD",
    },
    {
      AFSNumber: "442901",
      AFSName: "SIMPLY ADVICE PTY LTD",
    },
    {
      AFSNumber: "443025",
      AFSName: "MP CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "443031",
      AFSName: "IJ FINANCIAL SERVICES LIMITED",
    },
    {
      AFSNumber: "443118",
      AFSName: "CAPITAL GROUP INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "443131",
      AFSName: "BURGES, RICHARD WILLIAM",
    },
    {
      AFSNumber: "443540",
      AFSName: "AIOI NISSAY DOWA INSURANCE COMPANY AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "443670",
      AFSName: "TRADING.COM MARKETS PTY LTD",
    },
    {
      AFSNumber: "443886",
      AFSName: "AW FINTECH PTY LTD",
    },
    {
      AFSNumber: "444062",
      AFSName: "DOO PAYMENT TECHNOLOGY AU PTY LIMITED",
    },
    {
      AFSNumber: "444078",
      AFSName: "POWER 2 FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "444079",
      AFSName: "TRANSCEND CORPORATE PTY LTD",
    },
    {
      AFSNumber: "444144",
      AFSName: "AHB INSURANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "444266",
      AFSName:
        "JANUS HENDERSON INVESTORS (AUSTRALIA) INSTITUTIONAL FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "444268",
      AFSName: "JANUS HENDERSON INVESTORS (AUSTRALIA) FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "444283",
      AFSName: "MAWSON CAPITAL LICENCE PTY LTD",
    },
    {
      AFSNumber: "444365",
      AFSName: "ASSETORA AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "444369",
      AFSName: "THORNEY MANAGEMENT SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "444415",
      AFSName: "AERIS CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "444494",
      AFSName: "AUSTBROKERS DALBY PTY. LTD.",
    },
    {
      AFSNumber: "444609",
      AFSName: "GOBSMACKED LOYALTY PTY LTD",
    },
    {
      AFSNumber: "444649",
      AFSName: "ADVANCED MARKETS LTD.",
    },
    {
      AFSNumber: "444712",
      AFSName: "CALOW NOMINEES PTY LTD",
    },
    {
      AFSNumber: "444731",
      AFSName: "WENVEST FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "444803",
      AFSName: "RED STAR INSURANCE PTY LTD",
    },
    {
      AFSNumber: "445489",
      AFSName: "PARK STREET GROUP PTY LTD",
    },
    {
      AFSNumber: "445570",
      AFSName: "AUGMENTUM CORPORATE PTY LTD",
    },
    {
      AFSNumber: "445825",
      AFSName: "IA ADVICE PTY LTD",
    },
    {
      AFSNumber: "445924",
      AFSName: "IMAC (QLD) PTY LIMITED",
    },
    {
      AFSNumber: "446096",
      AFSName: "QMG PTY LTD",
    },
    {
      AFSNumber: "446176",
      AFSName: "ASVW FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "446258",
      AFSName: "ORIMCO PTY LTD",
    },
    {
      AFSNumber: "446375",
      AFSName: "AKINDRED PTY LTD",
    },
    {
      AFSNumber: "446382",
      AFSName: "CAISSA HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "446448",
      AFSName: "MERIDIAN WEALTH MANAGEMENT PTY. LTD.",
    },
    {
      AFSNumber: "446872",
      AFSName: "ORION RESOURCE PARTNERS (AUS) PTY LTD",
    },
    {
      AFSNumber: "446874",
      AFSName: "GARNSEY PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "446895",
      AFSName: "AGRICAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "447094",
      AFSName: "M FUNDS LIMITED",
    },
    {
      AFSNumber: "447345",
      AFSName: "MANDA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "447578",
      AFSName: "AZUR PACIFIC CAPITAL ADVISORS PTY LTD",
    },
    {
      AFSNumber: "447616",
      AFSName: "PROVIDENT STRATEGIES PTY LTD",
    },
    {
      AFSNumber: "447657",
      AFSName: "100 DOORS PTY. LTD.",
    },
    {
      AFSNumber: "447927",
      AFSName: "MEDINA EQUITY FUND LTD",
    },
    {
      AFSNumber: "448066",
      AFSName: "FLEXEWALLET PTY LTD",
    },
    {
      AFSNumber: "448217",
      AFSName: "EZE SOFTWARE GROUP PTY LIMITED",
    },
    {
      AFSNumber: "448218",
      AFSName: "STEPHENS CAPITAL PTY LTD",
    },
    {
      AFSNumber: "448274",
      AFSName: "COMMUNITY UNDERWRITING AGENCY PTY LTD",
    },
    {
      AFSNumber: "448411",
      AFSName: "FIVEMARK CAPITAL PTY LTD",
    },
    {
      AFSNumber: "448486",
      AFSName: "PEMBA CAPITAL PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "448540",
      AFSName: "REGINSUN FUNDS PTY LTD",
    },
    {
      AFSNumber: "448697",
      AFSName: "STANTONS CORPORATE FINANCE PTY LTD",
    },
    {
      AFSNumber: "448754",
      AFSName: "QA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "448803",
      AFSName: "KELLY PARTNERS CAPITAL PTY LTD",
    },
    {
      AFSNumber: "449005",
      AFSName: "TBLESS FUNDS LIMITED",
    },
    {
      AFSNumber: "449060",
      AFSName: "BALANCED UNDERWRITING GROUP PTY LTD",
    },
    {
      AFSNumber: "449146",
      AFSName: "COLLINS HOUSE PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "449176",
      AFSName: "PLENTI RE LIMITED",
    },
    {
      AFSNumber: "449221",
      AFSName: "ALLIANCE WEALTH PTY LTD",
    },
    {
      AFSNumber: "449262",
      AFSName: "AGRICULTURAL BANK OF CHINA LIMITED",
    },
    {
      AFSNumber: "449265",
      AFSName: "GREENLANE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "449481",
      AFSName: "TREADSTONE RESOURCE PARTNERS PTY LTD",
    },
    {
      AFSNumber: "449553",
      AFSName: "SWMG PTY LTD",
    },
    {
      AFSNumber: "449576",
      AFSName: "ZG ADVISORS PTY LTD",
    },
    {
      AFSNumber: "449768",
      AFSName: "STEADFAST EASTERN INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "450094",
      AFSName: "TIAN AN FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "450191",
      AFSName: "GENESIS UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "450198",
      AFSName: "STEWARDS TMG PTY LTD",
    },
    {
      AFSNumber: "450218",
      AFSName: "DUXTON CAPITAL (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "450257",
      AFSName: "E&P FUNDS MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "450428",
      AFSName: "MEGAWATT CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "450526",
      AFSName: "KEB HANA BANK",
    },
    {
      AFSNumber: "450541",
      AFSName: "AUSTRALIA CAPITAL FINANCIAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "450822",
      AFSName: "ICONIC PARTNERS PTY LTD",
    },
    {
      AFSNumber: "450874",
      AFSName: "CARBON IQ TRADING PTY LTD",
    },
    {
      AFSNumber: "450928",
      AFSName: "COLLINGTON SECURITIES PTY LTD",
    },
    {
      AFSNumber: "450968",
      AFSName: "CHATHAM FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "451004",
      AFSName: "CARBON NEUTRAL PTY LTD",
    },
    {
      AFSNumber: "451134",
      AFSName: "QUANTUM INSURANCE HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "451289",
      AFSName: "MONEYSHERPA PTY LTD",
    },
    {
      AFSNumber: "451350",
      AFSName: "LINCOLN HOLLAND PTY LTD",
    },
    {
      AFSNumber: "451450",
      AFSName: "CRUCIAL INSURANCE AND RISK ADVISORS PTY LTD",
    },
    {
      AFSNumber: "451703",
      AFSName: "WEALTH ADVICE SERVICES PTY LTD",
    },
    {
      AFSNumber: "451712",
      AFSName: "OPEN INSURANCE PTY LTD",
    },
    {
      AFSNumber: "451820",
      AFSName: "NEWPORT PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "451867",
      AFSName: "IMALIA PTY LIMITED",
    },
    {
      AFSNumber: "451953",
      AFSName: "BROGAN, CHRISTOPHER GERARD",
    },
    {
      AFSNumber: "452054",
      AFSName: "KLI ACCOUNTANTS AND WEALTH MANAGERS PTY LTD",
    },
    {
      AFSNumber: "452187",
      AFSName: "OXYGEN GLOBAL PTY LTD",
    },
    {
      AFSNumber: "452448",
      AFSName: "SHERIDANS FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "452449",
      AFSName: "YSC CAPITAL PTY LTD",
    },
    {
      AFSNumber: "452548",
      AFSName: "PRO-INSURE PTY LTD",
    },
    {
      AFSNumber: "452581",
      AFSName: "KODA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "452645",
      AFSName: "CUMULUS FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "452659",
      AFSName: "UBS REAL ESTATE INVESTMENT MANAGEMENT AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "452719",
      AFSName: "NORTHWEST HEALTHCARE AUSTRALIAN PROPERTY LIMITED",
    },
    {
      AFSNumber: "452804",
      AFSName: "WEALTH OF NATIONS ADVISORS PTY LTD",
    },
    {
      AFSNumber: "452917",
      AFSName: "GYROSTAT CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "452996",
      AFSName: "NEXTPLAN FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "453140",
      AFSName: "VONTOBEL ASSET MANAGEMENT AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "453149",
      AFSName: "CARSON CAPITAL HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "453209",
      AFSName: "CYAN INVESTMENT MANAGEMENT PTY. LTD.",
    },
    {
      AFSNumber: "453267",
      AFSName: "AVATAR BROKERS PTY LTD",
    },
    {
      AFSNumber: "453296",
      AFSName: "BLUE CHIP SUPER PTY LTD",
    },
    {
      AFSNumber: "453301",
      AFSName: "GRAMPIANS INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "453311",
      AFSName: "EPM INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "453345",
      AFSName: "TORIA FINANCE PTY. LTD.",
    },
    {
      AFSNumber: "453554",
      AFSName: "INTERACTIVE BROKERS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "453825",
      AFSName: "PROPERTY FUNDS MANAGEMENT AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "453855",
      AFSName: "ARCHER CAPITAL NOMINEES PTY LTD",
    },
    {
      AFSNumber: "453863",
      AFSName: "SAGE ALLIANCE PTY LIMITED",
    },
    {
      AFSNumber: "454131",
      AFSName: "PARETO SECURITIES PTY LTD",
    },
    {
      AFSNumber: "454195",
      AFSName: "PREMIUM CLIENT SERVICES AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "454210",
      AFSName: "PERDAMAN FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "454251",
      AFSName: "PACIFIC EQUITY PARTNERS INVESTORS ADMINISTRATION PTY LTD",
    },
    {
      AFSNumber: "454344",
      AFSName: "CHASE UNDERWRITING SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "454350",
      AFSName: "AUSTRAL ASSET MANAGEMENT PTY. LTD.",
    },
    {
      AFSNumber: "454484",
      AFSName: "TIG GEELONG PTY LTD",
    },
    {
      AFSNumber: "454552",
      AFSName: "GRYPHON CAPITAL INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "454566",
      AFSName: "ALLEGIANT IRS PTY LTD",
    },
    {
      AFSNumber: "454625",
      AFSName: "DAS INSURE PTY. LTD.",
    },
    {
      AFSNumber: "454666",
      AFSName: "HEWITT TAYLOR PTY LIMITED",
    },
    {
      AFSNumber: "454895",
      AFSName: "MOMENTUM WEALTH MANAGEMENT CORPORATION PTY LTD",
    },
    {
      AFSNumber: "455010",
      AFSName: "TOGETHR FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "455364",
      AFSName: "CASTRA LICENSEE PTY LTD",
    },
    {
      AFSNumber: "455388",
      AFSName: "MOHICANS MARKETS CAPITAL PTY LTD",
    },
    {
      AFSNumber: "455592",
      AFSName: "COHORT SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "455657",
      AFSName: "JRP SECURITIES PTY LTD",
    },
    {
      AFSNumber: "455769",
      AFSName: "RAMPERSAND MANAGEMENT PROPRIETARY LIMITED",
    },
    {
      AFSNumber: "455982",
      AFSName: "REVTECH MEDIA PTY LTD",
    },
    {
      AFSNumber: "456207",
      AFSName: "ESCALA WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "456327",
      AFSName: "RISC A&D PTY LTD",
    },
    {
      AFSNumber: "456469",
      AFSName: "RAPTOR GLOBAL CORPORATION LTD",
    },
    {
      AFSNumber: "456663",
      AFSName: "BR SECURITIES AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "456691",
      AFSName: "AZURE HOLDINGS PTY. LTD.",
    },
    {
      AFSNumber: "456766",
      AFSName: "AIRTREE VENTURES PTY LIMITED",
    },
    {
      AFSNumber: "456783",
      AFSName: "BOND ADVISER PTY LIMITED",
    },
    {
      AFSNumber: "457078",
      AFSName: "CAMPBELL FINANCIAL GROUP PTY LIMITED",
    },
    {
      AFSNumber: "457139",
      AFSName: "CONTENTED CAPITAL PTY LTD",
    },
    {
      AFSNumber: "457155",
      AFSName: "ALLWORTHS WEALTH MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "457161",
      AFSName: "PUZZLE CORPORATE FINANCE PTY LTD",
    },
    {
      AFSNumber: "457309",
      AFSName: "CORIOLIS CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "457333",
      AFSName: "STRATA INSURANCE SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "457446",
      AFSName: "ABL FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "457453",
      AFSName: "APD CAPITAL PTY. LTD.",
    },
    {
      AFSNumber: "457506",
      AFSName: "THE GARDIAN GROUP PTY LTD",
    },
    {
      AFSNumber: "457551",
      AFSName: "AUSTRALIA POST SERVICES PTY LTD",
    },
    {
      AFSNumber: "457600",
      AFSName: "NSW COMPLETE FINANCIAL SERVICES GROUP PTY LTD",
    },
    {
      AFSNumber: "457787",
      AFSName: "STRATA COMMUNITY INSURANCE AGENCIES PTY LTD",
    },
    {
      AFSNumber: "457823",
      AFSName: "THRIVE FS PTY. LTD.",
    },
    {
      AFSNumber: "458013",
      AFSName: "PEAK EQUITIES PTY LTD",
    },
    {
      AFSNumber: "458097",
      AFSName: "ALTUS INVESTIUM LTD",
    },
    {
      AFSNumber: "458328",
      AFSName: "REGIONAL WEALTH SERVICES PTY LTD",
    },
    {
      AFSNumber: "458375",
      AFSName: "APOSTLE FUNDS MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "458495",
      AFSName: "STEWARDS FOUNDATION OF CHRISTIAN BRETHREN",
    },
    {
      AFSNumber: "458535",
      AFSName: "STURT STREET ABS PTY LTD",
    },
    {
      AFSNumber: "458537",
      AFSName: "WEALTHLINK CAPITAL GROUP PTY LTD",
    },
    {
      AFSNumber: "458572",
      AFSName: "WISR FINANCE PTY LTD",
    },
    {
      AFSNumber: "458669",
      AFSName: "360PRIVATE PTY LIMITED",
    },
    {
      AFSNumber: "458703",
      AFSName: "HINES (AUS) INVESTMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "458715",
      AFSName: "CHARTER HALL INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "458776",
      AFSName: "HDI GLOBAL SPECIALTY SE",
    },
    {
      AFSNumber: "458895",
      AFSName: "STRATA UNITED INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "458943",
      AFSName: "THE PARINITY GROUP PTY. LTD.",
    },
    {
      AFSNumber: "458978",
      AFSName: "AAM LICENSEES PTY LTD",
    },
    {
      AFSNumber: "458993",
      AFSName: "PRIME PARTNERS FINANCIAL ADVICE PTY LTD",
    },
    {
      AFSNumber: "459018",
      AFSName: "JAMIESONCOOTEBONDS PTY LTD",
    },
    {
      AFSNumber: "459049",
      AFSName: "PPN WEALTH PTY LTD",
    },
    {
      AFSNumber: "459050",
      AFSName: "FX CORP PTY LTD",
    },
    {
      AFSNumber: "459074",
      AFSName: "FRANZESE, PASQUALE ",
    },
    {
      AFSNumber: "459120",
      AFSName: "DMX ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "459215",
      AFSName: "STERLING ASSETS & SECURITIES PTY LTD",
    },
    {
      AFSNumber: "459312",
      AFSName: "FORAGER FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "459314",
      AFSName: "MAXMILLIAN FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "459495",
      AFSName: "FLAG ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "460296",
      AFSName: "LAM, PAUL CHIU",
    },
    {
      AFSNumber: "460382",
      AFSName: "RESILIUM INSURANCE BROKING PTY LTD",
    },
    {
      AFSNumber: "460412",
      AFSName: "SMART GUYS PTY LTD",
    },
    {
      AFSNumber: "460458",
      AFSName: "HARTMANN PLANNING PTY LTD",
    },
    {
      AFSNumber: "460464",
      AFSName: "ROC CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "460572",
      AFSName: "HUGHES FUNDS MANAGEMENT PTY. LTD.",
    },
    {
      AFSNumber: "460629",
      AFSName: "FIRST MARKETS ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "460701",
      AFSName: "FUND AUSTRALIA LTD",
    },
    {
      AFSNumber: "460770",
      AFSName: "NUVEEN AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "460778",
      AFSName: "ELEMENTSFP PTY LTD",
    },
    {
      AFSNumber: "460870",
      AFSName: "GXE FUND SERVICES PTY LTD",
    },
    {
      AFSNumber: "460886",
      AFSName: "PEREGRINE PROJECTS PTY LTD",
    },
    {
      AFSNumber: "460940",
      AFSName: "AFSL HOLDINGS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "461047",
      AFSName: "ALIGNED FM PTY LTD",
    },
    {
      AFSNumber: "461135",
      AFSName: "LBPC SERVICES PTY LTD",
    },
    {
      AFSNumber: "461253",
      AFSName: "MILFORD AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "461299",
      AFSName: "YOURCOVER PTY LTD",
    },
    {
      AFSNumber: "461521",
      AFSName: "FULCRUM WEALTH MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "461594",
      AFSName: "BMS RISK SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "461605",
      AFSName: "RICHMOND WEALTH PTY LTD",
    },
    {
      AFSNumber: "461653",
      AFSName: "DOMINIUM CAPITAL PTY. LTD.",
    },
    {
      AFSNumber: "461710",
      AFSName: "FINANCIAL PLANNING ADVICE AUSTRALIA PTY. LTD.",
    },
    {
      AFSNumber: "461816",
      AFSName: "RAINMAKER INFORMATION PTY LIMITED",
    },
    {
      AFSNumber: "461933",
      AFSName: "PIONEER INVESTMENT GROUP PTY LTD",
    },
    {
      AFSNumber: "461974",
      AFSName: "LGT CAPITAL PARTNERS (AUSTRALIA) PTY LIMITED",
    },
    {
      AFSNumber: "461981",
      AFSName: "SANDFORD CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "462065",
      AFSName: "PAN-TRIBAL ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "462070",
      AFSName: "ASCIENTA PTY LTD",
    },
    {
      AFSNumber: "462086",
      AFSName: "MAXCAP INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "462087",
      AFSName: "INSTANZ LICENCEE PTY LTD",
    },
    {
      AFSNumber: "462160",
      AFSName: "SQUIRREL SUPERANNUATION SERVICES PTY LTD",
    },
    {
      AFSNumber: "462825",
      AFSName: "ONEVENTURES NOMINEES PTY LIMITED",
    },
    {
      AFSNumber: "462871",
      AFSName: "PRO-INVEST ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "462912",
      AFSName: "WELLINGTON MANAGEMENT AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "463108",
      AFSName: "TIPALEA FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "463129",
      AFSName: "BERKLEY INSURANCE COMPANY",
    },
    {
      AFSNumber: "463130",
      AFSName: "FIVE V CAPITAL PTY LTD",
    },
    {
      AFSNumber: "463364",
      AFSName: "ACN 601 209 170 PTY LTD",
    },
    {
      AFSNumber: "463394",
      AFSName: "WINIM FUNDS MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "463497",
      AFSName: "BETTER VISION INVESTMENT FUND PTY LTD",
    },
    {
      AFSNumber: "463571",
      AFSName: "INDIGO EMPIRE PTY LTD",
    },
    {
      AFSNumber: "463672",
      AFSName: "ARCHER GROWTH CUSTODIANS PTY LTD",
    },
    {
      AFSNumber: "463703",
      AFSName: "MAGNETIC NORTH GROUP PTY LTD",
    },
    {
      AFSNumber: "463807",
      AFSName: "COVAU PTY LIMITED",
    },
    {
      AFSNumber: "463846",
      AFSName: "CARTHONA CAPITAL FS PTY LTD",
    },
    {
      AFSNumber: "463887",
      AFSName: "RIAKA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "463919",
      AFSName: "ENVISAGER SECURITIES LIMITED",
    },
    {
      AFSNumber: "464467",
      AFSName: "ENTERPRISE UNDERWRITING SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "464545",
      AFSName: "HC MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "464627",
      AFSName: "NIUM PTY LIMITED",
    },
    {
      AFSNumber: "464628",
      AFSName: "P3 FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "464629",
      AFSName: "INDEPENDENT FINANCIAL ADVISERS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "464772",
      AFSName: "RHODES ASSET MANAGEMENT LTD",
    },
    {
      AFSNumber: "464933",
      AFSName: "PRIVATE FINANCIAL ADVISORY PTY LTD",
    },
    {
      AFSNumber: "464948",
      AFSName: "X CAP HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "465168",
      AFSName: "WEALTH ON TRACK PTY LTD",
    },
    {
      AFSNumber: "465193",
      AFSName: "SOLIUM NOMINEES (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "465263",
      AFSName: "YOC SECURITIES PTY LTD",
    },
    {
      AFSNumber: "465368",
      AFSName: "LEDGER FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "465404",
      AFSName: "BANNER CAPITAL MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "465524",
      AFSName: "CUSTODIAN FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "465579",
      AFSName: "RAJOMON CAPITAL LIMITED",
    },
    {
      AFSNumber: "465658",
      AFSName: "AUSTRALIAN FIDUCIARIES LIMITED",
    },
    {
      AFSNumber: "465754",
      AFSName: "ARENA REIT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "465897",
      AFSName: "CCM INSURANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "466393",
      AFSName: "EDGEHAVEN PTY LTD",
    },
    {
      AFSNumber: "466495",
      AFSName: "E R SYNDICATIONS PTY LTD",
    },
    {
      AFSNumber: "466713",
      AFSName: "BERKSHIRE HATHAWAY SPECIALTY INSURANCE COMPANY",
    },
    {
      AFSNumber: "466719",
      AFSName: "CRESTMOUNT FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "466735",
      AFSName: "SUMNER CAPITAL PTY LTD",
    },
    {
      AFSNumber: "466742",
      AFSName: "EVA PACIFIC PTY LTD",
    },
    {
      AFSNumber: "466760",
      AFSName: "FENGATE CAPITAL MANAGEMENT (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "466778",
      AFSName: "GLOBAL X MANAGEMENT (AUS) LIMITED",
    },
    {
      AFSNumber: "466877",
      AFSName: "WHOLESALE SECURITIES PTY LTD",
    },
    {
      AFSNumber: "466893",
      AFSName: "SUPERTRAC PTY LTD",
    },
    {
      AFSNumber: "467054",
      AFSName: "TAVERNERS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "467065",
      AFSName: "WE ARE GEN Y PTY LTD",
    },
    {
      AFSNumber: "467297",
      AFSName: "PPI FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "467369",
      AFSName: "TOP SALE HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "467443",
      AFSName: "PSC LIFE PTY LTD",
    },
    {
      AFSNumber: "467461",
      AFSName: "FORVIS MAZARS CORPORATE FINANCE PTY LIMITED",
    },
    {
      AFSNumber: "467462",
      AFSName: "FORIS GFS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "467641",
      AFSName: "AUSTAR FINANCE PTY LTD",
    },
    {
      AFSNumber: "467702",
      AFSName: "MELLING CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "468033",
      AFSName: "FUNDIT LIMITED",
    },
    {
      AFSNumber: "468046",
      AFSName: "ASIA PRINCIPAL CAPITAL OPERATIONS PTY LIMITED",
    },
    {
      AFSNumber: "468057",
      AFSName: "CREST CAPITAL ASIA LIMITED",
    },
    {
      AFSNumber: "468112",
      AFSName: "SUPER PLUS TAX PTY LTD",
    },
    {
      AFSNumber: "468145",
      AFSName: "PRUDENTIAL INVESTMENT SERVICES CORP PTY LTD",
    },
    {
      AFSNumber: "468163",
      AFSName: "THE TRADING GAME PTY LTD",
    },
    {
      AFSNumber: "468166",
      AFSName: "MCQUA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "468211",
      AFSName: "FIDUCIAN INVESTMENT MANAGEMENT SERVICES LIMITED",
    },
    {
      AFSNumber: "468749",
      AFSName: "HERITAGE PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "468859",
      AFSName: "SUPERED PTY LTD",
    },
    {
      AFSNumber: "468900",
      AFSName: "FINFIT WEALTH SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "468923",
      AFSName: "TREND FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "468935",
      AFSName: "COLLINS ST ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "468980",
      AFSName: "PACIFIC INTERNATIONAL FUND MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "469081",
      AFSName: "BOAG ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "469103",
      AFSName: "PAN AUSTRALIA FUND MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "469195",
      AFSName: "TCHTC GROUP PTY LTD",
    },
    {
      AFSNumber: "469288",
      AFSName: "BLACKBIRD VENTURES PTY LTD",
    },
    {
      AFSNumber: "469418",
      AFSName: "WH CAPITAL PTY LTD",
    },
    {
      AFSNumber: "469551",
      AFSName: "ASCIA ADVISORY PTY LTD",
    },
    {
      AFSNumber: "469556",
      AFSName: "WINSTON CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "469658",
      AFSName: "AERAN PTY LTD",
    },
    {
      AFSNumber: "469808",
      AFSName: "BOSTON MANAGED INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "469885",
      AFSName: "BENSTEAD HOLDAWAY CAPITAL PTY LTD",
    },
    {
      AFSNumber: "470003",
      AFSName: "ICA PARTNERS PTY LTD",
    },
    {
      AFSNumber: "470050",
      AFSName: "PRIMETIME GLOBAL MARKETS PTY LTD",
    },
    {
      AFSNumber: "470094",
      AFSName: "OPPORTUNITY INTERNATIONAL AUSTRALIA CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "470477",
      AFSName: "ARGO SERVICE COMPANY PTY LTD",
    },
    {
      AFSNumber: "470507",
      AFSName: "OREON FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "470573",
      AFSName: "AUS FINANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "470646",
      AFSName: "ORBITREMIT LIMITED",
    },
    {
      AFSNumber: "470722",
      AFSName: "AVALON FUNDS MANAGEMENT LTD",
    },
    {
      AFSNumber: "470793",
      AFSName: "PPF ADVISORY PTY LTD",
    },
    {
      AFSNumber: "470803",
      AFSName: "MASTER CAPITAL HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "470948",
      AFSName: "THE LUNAR GROUP PTY LIMITED",
    },
    {
      AFSNumber: "471003",
      AFSName: "WHARTON CAPITAL LIMITED",
    },
    {
      AFSNumber: "471017",
      AFSName: "JGS PRIVATE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "471028",
      AFSName: "UNION BANK OF INDIA",
    },
    {
      AFSNumber: "471094",
      AFSName: "AUSCHINA INTERNATIONAL INVESTMENT PTY. LTD.",
    },
    {
      AFSNumber: "471236",
      AFSName: "NEXA FINANICAL PTY LTD",
    },
    {
      AFSNumber: "471282",
      AFSName: "IAG AGENCIES PTY LTD",
    },
    {
      AFSNumber: "471335",
      AFSName: "LUMINIS PARTNERS PTY LTD",
    },
    {
      AFSNumber: "471558",
      AFSName: "INLOOP PTY LTD",
    },
    {
      AFSNumber: "471631",
      AFSName: "NORDLYS INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "471728",
      AFSName: "CIP LICENSING LIMITED",
    },
    {
      AFSNumber: "471826",
      AFSName: "LIGHTHOUSE FINANCIAL ADVISERS (TOWNSVILLE) PTY LTD",
    },
    {
      AFSNumber: "471951",
      AFSName: "TYRO PAYMENTS LIMITED",
    },
    {
      AFSNumber: "472131",
      AFSName: "FOURTHREE PTY LTD",
    },
    {
      AFSNumber: "472170",
      AFSName: "MELBOURNE ADVISORY & PARTNERS PTY LTD",
    },
    {
      AFSNumber: "472189",
      AFSName: "IMH SQUARED PTY LTD",
    },
    {
      AFSNumber: "472195",
      AFSName: "WISEMAN FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "472221",
      AFSName: "BLACKPEAK CAPITAL PTY LTD",
    },
    {
      AFSNumber: "472222",
      AFSName: "AVARI HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "472387",
      AFSName: "SEQUOIA WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "472429",
      AFSName: "EVARO WEALTH PARTNERS PTY LTD",
    },
    {
      AFSNumber: "472457",
      AFSName: "COFFRE-FORT PTY LTD",
    },
    {
      AFSNumber: "472500",
      AFSName: "GUNN AGRI PARTNERS PTY LTD",
    },
    {
      AFSNumber: "472548",
      AFSName: "PREMIUM ADVISORY PTY LTD",
    },
    {
      AFSNumber: "472718",
      AFSName: "SYNERGY RISK CONSULTANTS PTY. LTD.",
    },
    {
      AFSNumber: "472901",
      AFSName: "AUSTRALIAN ADVICE NETWORK PTY LTD",
    },
    {
      AFSNumber: "473034",
      AFSName: "PILOT ADVISORY PTY LTD",
    },
    {
      AFSNumber: "473135",
      AFSName: "LIFE INSURANCE DIRECT AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "473141",
      AFSName: "PRIMECARE FINANCIAL PLANNING PTY. LTD.",
    },
    {
      AFSNumber: "473202",
      AFSName: "SANKOFA FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "473466",
      AFSName: "MERCURY PRIVATE PTY LTD",
    },
    {
      AFSNumber: "473475",
      AFSName: "PALLAS FUNDS PTY LTD",
    },
    {
      AFSNumber: "473495",
      AFSName: "CARDEN TREASURY CORPORATION PTY LIMITED",
    },
    {
      AFSNumber: "473534",
      AFSName: "CONSTANTIA INVESTMENT PARTNERS PTY LTD",
    },
    {
      AFSNumber: "473800",
      AFSName: "TYCHE ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "473934",
      AFSName: "WEALTHBRIDGE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "473968",
      AFSName: "ACORN MANAGED INVESTMENTS PTY. LTD.",
    },
    {
      AFSNumber: "473981",
      AFSName: "WISE INVESTMENT ADVISERS PTY LTD",
    },
    {
      AFSNumber: "473984",
      AFSName: "MARQ PRIVATE FUNDS PTY LTD",
    },
    {
      AFSNumber: "474103",
      AFSName: "HLB CHESSBOARD PTY LTD",
    },
    {
      AFSNumber: "474127",
      AFSName: "NEXT BUSINESS ENERGY PTY LTD",
    },
    {
      AFSNumber: "474395",
      AFSName: "DEMAND MANAGER PTY. LTD.",
    },
    {
      AFSNumber: "474520",
      AFSName: "ADVISOR PLUS PTY. LTD.",
    },
    {
      AFSNumber: "474540",
      AFSName: "HOLLARD COMMERCIAL INSURANCE PTY LTD",
    },
    {
      AFSNumber: "474592",
      AFSName: "BIG START PTY LTD",
    },
    {
      AFSNumber: "474620",
      AFSName: "DEXUS WHOLESALE FUNDS LIMITED",
    },
    {
      AFSNumber: "474629",
      AFSName: "BAIN CAPITAL CREDIT (AUSTRALIA) PTY. LTD.",
    },
    {
      AFSNumber: "474726",
      AFSName: "HARMONEY AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "474738",
      AFSName: "ACY CAPITAL PTY LTD",
    },
    {
      AFSNumber: "474743",
      AFSName: "NEXT PAYMENTS PTY LTD",
    },
    {
      AFSNumber: "474745",
      AFSName: "FINFLEX SECURITIES PTY LTD",
    },
    {
      AFSNumber: "474767",
      AFSName: "TRITON INVESTMENT SERVICES PROPRIETARY LIMITED",
    },
    {
      AFSNumber: "474772",
      AFSName: "QR FINANCIAL GROUP PTY. LTD.",
    },
    {
      AFSNumber: "474805",
      AFSName: "WEAL PAR PTY LTD",
    },
    {
      AFSNumber: "474829",
      AFSName: "WOODS & ASSOCIATES INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "474871",
      AFSName: "NARROW ROAD CAPITAL PTY. LTD.",
    },
    {
      AFSNumber: "474905",
      AFSName: "OLIREK PARTNERS PTY LTD",
    },
    {
      AFSNumber: "474953",
      AFSName: "HOULIHAN LOKEY (AUSTRALIA) PTY LIMITED",
    },
    {
      AFSNumber: "474992",
      AFSName: "LENDLEASE IMT (OITST) LIMITED",
    },
    {
      AFSNumber: "475064",
      AFSName: "TOTAL ADVICE SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "475072",
      AFSName: "QUANTUMM AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "475078",
      AFSName: "CURRAN & CO PTY LTD",
    },
    {
      AFSNumber: "475123",
      AFSName: "STAMFORD CAPITAL FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "475125",
      AFSName: "ICF PROTECTION PLUS PTY LTD",
    },
    {
      AFSNumber: "475135",
      AFSName: "INTRINSIC PARTNERS PTY LTD",
    },
    {
      AFSNumber: "475207",
      AFSName: "POSITIVE INVESTMENT PARTNERS PTY LTD",
    },
    {
      AFSNumber: "475210",
      AFSName: "DELCOR ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "475215",
      AFSName: "WEALTH MASTERS PTY LTD",
    },
    {
      AFSNumber: "475228",
      AFSName: "NATIONAL STORAGE FINANCIAL SERVICES LIMITED",
    },
    {
      AFSNumber: "475260",
      AFSName: "CLINTON CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "475300",
      AFSName: "AUSTRALIAN FINANCIAL ADVISORY GROUP PTY LTD",
    },
    {
      AFSNumber: "475313",
      AFSName: "ENDEAVOUR INVESTMENTS INTERNATIONAL MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "475940",
      AFSName: "AFFLUENCE FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "475946",
      AFSName: "DBS BANK LTD.",
    },
    {
      AFSNumber: "475964",
      AFSName: "TWD LICENSEE SERVICES PTY LTD",
    },
    {
      AFSNumber: "476067",
      AFSName: "ALLUVIUM ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "476078",
      AFSName: "BENSHAY PTY. LTD.",
    },
    {
      AFSNumber: "476202",
      AFSName: "A PARTNER IN PLANNING (AUS) PTY. LTD",
    },
    {
      AFSNumber: "476209",
      AFSName: "ARK CAPITAL FUNDS LIMITED",
    },
    {
      AFSNumber: "476223",
      AFSName: "VIRIDIAN ADVISORY PTY LTD",
    },
    {
      AFSNumber: "476351",
      AFSName: "PARADIGM COMMERCIAL PROPERTY GROUP PTY LTD",
    },
    {
      AFSNumber: "476427",
      AFSName: "STEPHAN INDEPENDENT ADVISORY PTY LTD",
    },
    {
      AFSNumber: "476564",
      AFSName: "IPG FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "476599",
      AFSName: "EIGHTH GATE PTY LTD",
    },
    {
      AFSNumber: "476641",
      AFSName: "AUSTRALIAN AFFORDABLE HOUSING SECURITIES LIMITED",
    },
    {
      AFSNumber: "476673",
      AFSName: "GENERATION WEALTH GROUP PTY LTD",
    },
    {
      AFSNumber: "476686",
      AFSName: "PERPETUAL CAPITAL MARKETS PTY LTD",
    },
    {
      AFSNumber: "476697",
      AFSName: "ALEXANDER FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "476816",
      AFSName: "GUARDIAN CAPITAL AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "476920",
      AFSName: "PENTALPHA HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "476976",
      AFSName: "GLOBAL CREDIT INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "477075",
      AFSName: "QUANTA HOLDING CO LTD",
    },
    {
      AFSNumber: "477145",
      AFSName: "WHOST PTY LTD",
    },
    {
      AFSNumber: "477186",
      AFSName: "PD FINANCIAL GROUP PTY LIMITED",
    },
    {
      AFSNumber: "477204",
      AFSName: "ARGUS PROPERTY INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "477272",
      AFSName: "ALPHA INVESTMENT PARTNERS AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "477365",
      AFSName: "SOCIETYONE INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "477413",
      AFSName: "BLACKFOX PROPERTY PTY LTD",
    },
    {
      AFSNumber: "477434",
      AFSName: "AUSTRALIAN UNITY INVESTMENT REAL ESTATE LIMITED",
    },
    {
      AFSNumber: "477445",
      AFSName: "EPOCH DERIVATIVES TRADING PTY LTD",
    },
    {
      AFSNumber: "477448",
      AFSName: "ALINTA ENERGY CEA FUTURES TRADING PTY LTD",
    },
    {
      AFSNumber: "477449",
      AFSName: "ALINTA ENERGY CEA TRADING PTY LTD",
    },
    {
      AFSNumber: "477450",
      AFSName: "PRESTBURY FINANCIAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "477471",
      AFSName: "POINT UNDERWRITING AGENCY PTY LTD",
    },
    {
      AFSNumber: "477506",
      AFSName: "BASILE & BASILE PTY. LTD.",
    },
    {
      AFSNumber: "477543",
      AFSName: "THE INTELLIGENT FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "477690",
      AFSName: "MAINSTAY UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "477691",
      AFSName: "TOMKINS TURNER CAPITAL PTY LTD",
    },
    {
      AFSNumber: "477693",
      AFSName: "CAPITAL PARTNERS AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "477840",
      AFSName: "WARATAH FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "477879",
      AFSName: "N1 VENTURE PTY LTD",
    },
    {
      AFSNumber: "477891",
      AFSName: "EQUITY T S PTY LTD",
    },
    {
      AFSNumber: "477975",
      AFSName: "RMHEDGE PTY LTD",
    },
    {
      AFSNumber: "478061",
      AFSName: "HMC CAPITAL INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "478066",
      AFSName: "GOLDFINCH CONSULTING & MANAGEMENT GROUP PTY LTD",
    },
    {
      AFSNumber: "478233",
      AFSName: "INDIA AVENUE INVESTMENT MANAGEMENT AUSTRALIA PTY. LTD.",
    },
    {
      AFSNumber: "478249",
      AFSName: "PRIVATE WEALTH ADVISORY PTY LTD",
    },
    {
      AFSNumber: "478338",
      AFSName: "TARONGA GROUP INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "478428",
      AFSName: "AXIOM INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "478531",
      AFSName: "360 WEALTH PTY LTD",
    },
    {
      AFSNumber: "478534",
      AFSName: "MOORE AUSTRALIA CORPORATE FINANCE PTY LTD",
    },
    {
      AFSNumber: "478547",
      AFSName: "PARKHILL HOME LOANS PTY LIMITED",
    },
    {
      AFSNumber: "478589",
      AFSName: "SPECTRUM LICENSING SERVICES PTY LTD",
    },
    {
      AFSNumber: "478606",
      AFSName: "SOUTHERN CROSS WEALTH ADVISORS PTY LTD",
    },
    {
      AFSNumber: "478766",
      AFSName: "SAMBE INVESTMENTS PTY. LIMITED",
    },
    {
      AFSNumber: "478775",
      AFSName: "PPS MUTUAL INSURANCE PTY LTD",
    },
    {
      AFSNumber: "478847",
      AFSName: "TSL CAPITAL PTY LTD",
    },
    {
      AFSNumber: "478848",
      AFSName: "WISE FIN PTY LTD",
    },
    {
      AFSNumber: "478863",
      AFSName: "MDJ FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "478891",
      AFSName: "PRESTIGE WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "478935",
      AFSName: "MASLOW DRIVE PTY LTD",
    },
    {
      AFSNumber: "478937",
      AFSName: "VIVID FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "478958",
      AFSName: "LION BLUE PTY LTD",
    },
    {
      AFSNumber: "478959",
      AFSName: "SPHERE INSURANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "478976",
      AFSName: "GOCARDLESS LTD",
    },
    {
      AFSNumber: "478978",
      AFSName: "ASSUREINVEST PTY LTD",
    },
    {
      AFSNumber: "478987",
      AFSName: "VESTED EQUITIES PTY LTD",
    },
    {
      AFSNumber: "478994",
      AFSName: "EXTO PARTNERS PTY LTD",
    },
    {
      AFSNumber: "479125",
      AFSName: "GARD INSURANCE PTY LTD",
    },
    {
      AFSNumber: "479263",
      AFSName: "CONTINENTAL WEALTH PTY LTD",
    },
    {
      AFSNumber: "479381",
      AFSName: "STERLING & FREEMAN ADVISORY PTY LTD",
    },
    {
      AFSNumber: "479499",
      AFSName: "DFP CORPORATE PTY LTD",
    },
    {
      AFSNumber: "479535",
      AFSName: "PLANUM CAPITAL PTY LTD",
    },
    {
      AFSNumber: "479621",
      AFSName: "CLUB HOLIDAYS AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "479719",
      AFSName: "HOTEL PROPERTY INVESTMENTS LTD",
    },
    {
      AFSNumber: "479771",
      AFSName: "JAXEN FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "479792",
      AFSName: "EDWARDS MARSHALL ADVISORY PTY LTD",
    },
    {
      AFSNumber: "479803",
      AFSName: "CORP-PLAN WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "479840",
      AFSName: "RYNCO PTY LTD",
    },
    {
      AFSNumber: "479859",
      AFSName: "INTERIM FINANCE CORPORATION PTY LTD",
    },
    {
      AFSNumber: "479873",
      AFSName: "CENTURIA FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "479974",
      AFSName: "ALPHA NODE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "479993",
      AFSName: "BELLWETHER FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "480009",
      AFSName: "CORE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "480042",
      AFSName: "TYNANS PTY LTD",
    },
    {
      AFSNumber: "480054",
      AFSName: "TRIUMPH INVESTMENT GROUP PTY LTD",
    },
    {
      AFSNumber: "480086",
      AFSName: "CATALYST CONSULTING (AUST) PTY. LTD.",
    },
    {
      AFSNumber: "480176",
      AFSName: "1ST ENERGY PTY LTD",
    },
    {
      AFSNumber: "480194",
      AFSName: "MINCHIN MOORE PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "480196",
      AFSName: "MORAY PTY LTD",
    },
    {
      AFSNumber: "480258",
      AFSName: "ALPHA ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "480284",
      AFSName: "MERCURIEN INSURANCE PTY LTD",
    },
    {
      AFSNumber: "480290",
      AFSName: "RECORD POINT OPERATIONS PTY LTD",
    },
    {
      AFSNumber: "480291",
      AFSName: "GDFS TRADE INTERNATIONAL PTY LTD",
    },
    {
      AFSNumber: "480309",
      AFSName: "MURRAY BUSINESS SOLUTIONS PTY. LTD.",
    },
    {
      AFSNumber: "480318",
      AFSName: "CHAUCER GROUP PTY LTD",
    },
    {
      AFSNumber: "480387",
      AFSName: "CORE VALUE FA PTY LTD",
    },
    {
      AFSNumber: "480392",
      AFSName: "ASHTHORN CA PTY LTD",
    },
    {
      AFSNumber: "480438",
      AFSName: "DOUGLAS FUNDS CONSULTING PTY LTD",
    },
    {
      AFSNumber: "480476",
      AFSName: "SMATS CONSORTIUM PTY LTD",
    },
    {
      AFSNumber: "480493",
      AFSName: "THINK INDEPENDENT PTY LIMITED",
    },
    {
      AFSNumber: "480508",
      AFSName: "PACIFIC 8 PTY LTD",
    },
    {
      AFSNumber: "480509",
      AFSName: "MUNRO ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "480585",
      AFSName: "ACACIA PARTNERS PTY LTD",
    },
    {
      AFSNumber: "480599",
      AFSName: "MYAFS PTY LTD",
    },
    {
      AFSNumber: "480649",
      AFSName: "MSC ADVISORY PTY LTD",
    },
    {
      AFSNumber: "480703",
      AFSName: "EUTILITY TRADING PTY LTD",
    },
    {
      AFSNumber: "480716",
      AFSName: "AG GUARD PTY LTD",
    },
    {
      AFSNumber: "480751",
      AFSName: "HARTLEY FINANCIAL PTY. LTD.",
    },
    {
      AFSNumber: "480797",
      AFSName: "KAIZEN WEALTH PTY LTD",
    },
    {
      AFSNumber: "480834",
      AFSName: "FLASH PARTNERS PTY LTD",
    },
    {
      AFSNumber: "480851",
      AFSName: "FINANCIAL HUB FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "480863",
      AFSName: "PACIFIC INDEMNITY UNDERWRITING SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "480872",
      AFSName: "INTRINSIC PRIVATE WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "480957",
      AFSName: "STRONGHOLD INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "480991",
      AFSName: "DOLLAR GROWTH FINANCIAL ADVICE PTY LTD",
    },
    {
      AFSNumber: "481017",
      AFSName: "FINCLEAR PTY LTD",
    },
    {
      AFSNumber: "481024",
      AFSName: "AGC CAPITAL SECURITIES PTY LTD",
    },
    {
      AFSNumber: "481098",
      AFSName: "FIRST FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "481112",
      AFSName: "FUTURE GEN WEALTH PTY LTD",
    },
    {
      AFSNumber: "481118",
      AFSName: "INHERITANCE CAPITAL ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "481202",
      AFSName: "ARTEMIS INVESTMENTS (NSW) PTY LTD",
    },
    {
      AFSNumber: "481217",
      AFSName: "A.C.N. 606 629 538 PTY LTD",
    },
    {
      AFSNumber: "481247",
      AFSName: "IBERICO CONSULTING PTY LTD",
    },
    {
      AFSNumber: "481349",
      AFSName: "R E LEDGER PTY LTD",
    },
    {
      AFSNumber: "481393",
      AFSName: "ACUMEN INSURANCE PTY LTD",
    },
    {
      AFSNumber: "481427",
      AFSName: "MILLENNIUM CAPITAL MANAGEMENT (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "481528",
      AFSName: "ATTICUS WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "481561",
      AFSName: "WARRINGTON PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "481565",
      AFSName: "YOUR FINANCIAL ADVISOR PTY. LTD.",
    },
    {
      AFSNumber: "481580",
      AFSName: "ANTIPODES PARTNERS LIMITED",
    },
    {
      AFSNumber: "481586",
      AFSName: "INFINITY MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "481605",
      AFSName: "E.SUN COMMERCIAL BANK  LTD.",
    },
    {
      AFSNumber: "481623",
      AFSName: "STERLING GROUP VIC PTY LTD",
    },
    {
      AFSNumber: "481626",
      AFSName: "MVA BENNETT HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "481674",
      AFSName: "AUSTRALIAN WEALTH HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "481749",
      AFSName: "ACCORD PROPERTY FUNDS MANAGEMENT PTY. LTD.",
    },
    {
      AFSNumber: "481792",
      AFSName: "ALARIE PTY LTD",
    },
    {
      AFSNumber: "481914",
      AFSName: "THE CLEVER FOX FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "481923",
      AFSName: "THE GROWTH FUND PTY LTD",
    },
    {
      AFSNumber: "481944",
      AFSName: "HOLDEN CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "482029",
      AFSName: "AMAZON UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "482050",
      AFSName: "VALPARAISO AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "482051",
      AFSName: "VELLUM AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "482173",
      AFSName: "A.C.N. 608 646 251 PTY LTD",
    },
    {
      AFSNumber: "482211",
      AFSName: "GFM INVESTMENT MANAGEMENT LTD",
    },
    {
      AFSNumber: "482234",
      AFSName: "OREANA FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "482238",
      AFSName: "COOLABAH CAPITAL INSTITUTIONAL INVESTMENTS PTY LIMITED",
    },
    {
      AFSNumber: "482375",
      AFSName: "WELLKINS CAPITAL LIMITED",
    },
    {
      AFSNumber: "482454",
      AFSName: "DOYLE PARTNERS FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "482467",
      AFSName: "TEGO INSURANCE PTY LTD",
    },
    {
      AFSNumber: "482639",
      AFSName: "DELTA POWER & ENERGY (VALES POINT) PTY LTD",
    },
    {
      AFSNumber: "482656",
      AFSName: "R.J.C. EVANS & CO. PTY. LIMITED",
    },
    {
      AFSNumber: "482668",
      AFSName: "NONPUBLIC PTY LTD",
    },
    {
      AFSNumber: "482684",
      AFSName: "FUTURE GROUP FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "482701",
      AFSName: "CHESTERFIELDS WEALTH PTY LTD",
    },
    {
      AFSNumber: "482722",
      AFSName: "DEFENDER ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "482725",
      AFSName: "ARGENTA UNDERWRITING ASIA PTE. LTD.",
    },
    {
      AFSNumber: "482777",
      AFSName: "DENNIS FAMILY AFSL PTY LTD",
    },
    {
      AFSNumber: "482800",
      AFSName: "GRAMPIANS INVESTMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "482823",
      AFSName: "LGAA INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "482848",
      AFSName: "UP FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "482849",
      AFSName: "CRESCENT CUSTODIAN PTY LIMITED",
    },
    {
      AFSNumber: "482913",
      AFSName: "HORIZON FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "482926",
      AFSName: "NEXIA PERTH FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "482927",
      AFSName: "INSIGHT CAPITAL ADVISORS PTY LTD",
    },
    {
      AFSNumber: "482937",
      AFSName: "LAVERNE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "483004",
      AFSName: "FIRST POINT WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "483033",
      AFSName: "BOW FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "483057",
      AFSName: "ART LIFE INSURANCE LTD",
    },
    {
      AFSNumber: "483102",
      AFSName: "DELTAPLAN FINANCIAL SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "483109",
      AFSName: "INTERGEN FUNDS MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "483119",
      AFSName: "INTEGRATED FINANCIAL ADVICE PTY LTD",
    },
    {
      AFSNumber: "483167",
      AFSName: "LINCOLN FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "483168",
      AFSName: "HENSLOW PTY LTD",
    },
    {
      AFSNumber: "483210",
      AFSName: "ABOUT UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "483214",
      AFSName: "ARAVEST AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "483220",
      AFSName: "AUSTRALIAN UNITY TRUSTEES LIMITED",
    },
    {
      AFSNumber: "483286",
      AFSName: "MM CONSULTANCY PTY. LIMITED",
    },
    {
      AFSNumber: "483288",
      AFSName: "RESIDENTIAL HOUSING & COMMERCIAL PTY LTD",
    },
    {
      AFSNumber: "483326",
      AFSName: "LIGHTHOUSE INVESTMENT GROUP PTY LTD",
    },
    {
      AFSNumber: "483374",
      AFSName: "AGILE UNDERWRITING SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "483459",
      AFSName: "AMAL TRUSTEES PTY LIMITED",
    },
    {
      AFSNumber: "483461",
      AFSName: "AMAL SECURITY SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "483489",
      AFSName: "SMARTERACCOUNTING PTY LTD",
    },
    {
      AFSNumber: "483575",
      AFSName: "THE BANK OF NOVA SCOTIA",
    },
    {
      AFSNumber: "483612",
      AFSName: "SAWERES, SHERENE ",
    },
    {
      AFSNumber: "483663",
      AFSName: "ADELAIDE FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "483679",
      AFSName: "SHINHAN BANK CO.  LTD",
    },
    {
      AFSNumber: "483761",
      AFSName: "HATCHSTONE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "483762",
      AFSName: "LEYTON FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "483781",
      AFSName: "DOCTORS' CHOICE MEDICAL INDEMNITY ADVISERS PTY. LTD.",
    },
    {
      AFSNumber: "483795",
      AFSName: "VER LIMITED",
    },
    {
      AFSNumber: "483842",
      AFSName: "PARTNERS WEALTH GROUP INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "483942",
      AFSName: "ROCKWORTH CAPITAL PTY LTD",
    },
    {
      AFSNumber: "483977",
      AFSName: "UHY HAINES NORTON SUPER ADVISORY PERTH PTY LTD",
    },
    {
      AFSNumber: "483990",
      AFSName: "COMPLETE LATITUDE PTY LTD",
    },
    {
      AFSNumber: "484045",
      AFSName: "BEYOND CAPITAL ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "484059",
      AFSName: "ICG RE FUNDS MANAGEMENT AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "484062",
      AFSName: "ENTAIN GROUP PTY LTD",
    },
    {
      AFSNumber: "484091",
      AFSName: "FIRST ADVICE LICENSEE SERVICES PTY LTD",
    },
    {
      AFSNumber: "484103",
      AFSName: "POSITIVE DYNAMICS PTY. LTD.",
    },
    {
      AFSNumber: "484139",
      AFSName: "BANYAN SECURITIES PTY LTD",
    },
    {
      AFSNumber: "484146",
      AFSName: "ASG INSURANCES PTY LIMITED",
    },
    {
      AFSNumber: "484198",
      AFSName: "BPW LICENSEE SERVICES PTY LTD",
    },
    {
      AFSNumber: "484222",
      AFSName: "VINARC PTY LTD",
    },
    {
      AFSNumber: "484227",
      AFSName: "R.J. SANDERSON & ASSOCIATES PTY. LTD.",
    },
    {
      AFSNumber: "484252",
      AFSName: "MADDERN SMSF PTY LTD",
    },
    {
      AFSNumber: "484255",
      AFSName: "MAX ACCOUNTANTS PTY LTD",
    },
    {
      AFSNumber: "484263",
      AFSName: "REAL ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "484264",
      AFSName: "MACROVUE PTY LIMITED",
    },
    {
      AFSNumber: "484446",
      AFSName: "M.A. BACON PTY LTD & SELECT SAMPLES PTY. LTD.",
    },
    {
      AFSNumber: "484453",
      AFSName: "AUSTRALIAN BOND EXCHANGE PTY. LTD.",
    },
    {
      AFSNumber: "484547",
      AFSName: "CK SHINE PTY LTD",
    },
    {
      AFSNumber: "484563",
      AFSName: "LEGG FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "484569",
      AFSName: "EMPIRE INSURANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "484576",
      AFSName: "G. D. BRAYBROOK PTY. LTD.",
    },
    {
      AFSNumber: "484609",
      AFSName: "MORRIS CAPITAL AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "484737",
      AFSName: "PRIVATE WEALTH PARTNERS GROUP PTY LIMITED",
    },
    {
      AFSNumber: "484743",
      AFSName: "KEE PARTNERS PTY LTD",
    },
    {
      AFSNumber: "484784",
      AFSName: "PAPADOPOULOS, NIKOLAOS ",
    },
    {
      AFSNumber: "484789",
      AFSName: "METRIX INSURANCE PTY. LTD.",
    },
    {
      AFSNumber: "484793",
      AFSName: "O'CONNOR, SUSAN ",
    },
    {
      AFSNumber: "484794",
      AFSName: "SMSF PATHWAYS PTY LTD",
    },
    {
      AFSNumber: "484816",
      AFSName: "MIRAE ASSET GLOBAL INVESTMENTS (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "484834",
      AFSName: "HUGHES PETTIT FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "484839",
      AFSName: "BILLINGTONS ACCOUNTING PTY. LTD.",
    },
    {
      AFSNumber: "484846",
      AFSName: "XPERION PTY LTD",
    },
    {
      AFSNumber: "484851",
      AFSName: "PENINSULA FINANCIAL CONSULTING PTY LTD",
    },
    {
      AFSNumber: "484852",
      AFSName: "STAR & CO FINANCIAL SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "484855",
      AFSName: "FIRST PRIORITY ACCOUNTING & TAXATION PTY LTD",
    },
    {
      AFSNumber: "484865",
      AFSName: "ARMADA ACCOUNTANTS PTY LTD",
    },
    {
      AFSNumber: "484866",
      AFSName: "CAPITALUS PTY LTD",
    },
    {
      AFSNumber: "484885",
      AFSName: "FORVIS MAZARS WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "484916",
      AFSName: "JULIE BLAND CONSULTING PTY LTD",
    },
    {
      AFSNumber: "484924",
      AFSName: "BUCHANAN, CARLITA ",
    },
    {
      AFSNumber: "484998",
      AFSName: "AUSTRALIAN FINANCIAL FREEDOM PTY LTD",
    },
    {
      AFSNumber: "485018",
      AFSName: "CONEXUS GROUP PTY LTD",
    },
    {
      AFSNumber: "485026",
      AFSName: "DE MARCO FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "485044",
      AFSName: "HANY ABDEL-SAYED & CO PTY LTD",
    },
    {
      AFSNumber: "485113",
      AFSName: "KEY FINANCIAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "485135",
      AFSName: "STRATEGIC SELF MANAGED SUPER ADVISORS PTY LTD",
    },
    {
      AFSNumber: "485152",
      AFSName: "SUPERANNUATION ACCOUNTING PTY LTD",
    },
    {
      AFSNumber: "485153",
      AFSName: "NORTH CITY ACCOUNTING PTY LTD",
    },
    {
      AFSNumber: "485160",
      AFSName: "METRISCOPE FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "485203",
      AFSName: "ALLAN HALL SMSF ADVISORY PTY LTD",
    },
    {
      AFSNumber: "485226",
      AFSName: "NETWORTH ADVISORS PTY LTD",
    },
    {
      AFSNumber: "485258",
      AFSName: "HAINES NORTON SYDNEY ADVISERS PTY LTD",
    },
    {
      AFSNumber: "485276",
      AFSName: "FINANCIAL PLANNERS ALLIANCE PTY LTD",
    },
    {
      AFSNumber: "485306",
      AFSName: "HALL CHADWICK WEALTH ADVISORY PTY LTD",
    },
    {
      AFSNumber: "485343",
      AFSName: "MFS INTERNATIONAL AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "485351",
      AFSName: "JARDEN AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "485363",
      AFSName: "WIZDOM WEALTH PTY LTD",
    },
    {
      AFSNumber: "485435",
      AFSName: "MOORE AUSTRALIA FINANCIAL SERVICES (QLD/NNSW) PTY LTD",
    },
    {
      AFSNumber: "485478",
      AFSName: "MIPLAN ADVISORY PTY LTD",
    },
    {
      AFSNumber: "485546",
      AFSName: "WHAMPOA NEW RICH PTY LTD",
    },
    {
      AFSNumber: "485573",
      AFSName: "RAPID FINANCIAL SERVICES SOLUTIONS PTY LIMITED",
    },
    {
      AFSNumber: "485588",
      AFSName: "GLENMORE ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "485616",
      AFSName: "WCP SUPER ADVICE PTY LTD",
    },
    {
      AFSNumber: "485634",
      AFSName: "AUSGEN PTY LTD",
    },
    {
      AFSNumber: "485643",
      AFSName: "SUPERGUARDIAN PTY LTD",
    },
    {
      AFSNumber: "485665",
      AFSName: "OTIVO PTY LTD",
    },
    {
      AFSNumber: "485683",
      AFSName: "MY DEDICATED ADVISORY PTY LTD",
    },
    {
      AFSNumber: "485716",
      AFSName: "BLACKSTONE REAL ESTATE AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "485720",
      AFSName: "LEE AND ASSOCIATES (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "485736",
      AFSName: "ARCHER INSURANCE CORP PTY. LTD.",
    },
    {
      AFSNumber: "485760",
      AFSName: "FINEXIA SECURITIES LTD",
    },
    {
      AFSNumber: "485811",
      AFSName: "AFFINITY ACCOUNTANTS PTY LTD",
    },
    {
      AFSNumber: "485819",
      AFSName: "SUPER FUNDS ACCOUNTING PTY LTD",
    },
    {
      AFSNumber: "485825",
      AFSName: "CHANDRU FINANCIAL SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "485840",
      AFSName: "M POINT SUPERANNUATION SERVICES PTY LTD",
    },
    {
      AFSNumber: "485843",
      AFSName: "THE MACRO GROUP PTY LTD",
    },
    {
      AFSNumber: "485866",
      AFSName: "INCEPTION FIDUCIARY PTY LIMITED",
    },
    {
      AFSNumber: "485873",
      AFSName: "BLUESTONE ACCOUNTANTS & BUSINESS ADVISERS PTY LTD",
    },
    {
      AFSNumber: "485879",
      AFSName: "ZENITH SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "485946",
      AFSName: "ADVISER SOLUTIONS GROUP PTY LTD",
    },
    {
      AFSNumber: "485954",
      AFSName: "GILSHENAN CAPITAL PTY LTD",
    },
    {
      AFSNumber: "485971",
      AFSName: "ADAM SPRAINGER ACCOUNTING SERVICES PTY LTD",
    },
    {
      AFSNumber: "486044",
      AFSName: "MCCORQUODALE & CO. PTY LTD",
    },
    {
      AFSNumber: "486126",
      AFSName: "MJC PARTNERS SUPERANNUATION PTY LTD",
    },
    {
      AFSNumber: "486128",
      AFSName: "KOUSTAS & CO SMSF ADVISORY PTY LTD",
    },
    {
      AFSNumber: "486133",
      AFSName: "DO, DAT TRONG",
    },
    {
      AFSNumber: "486146",
      AFSName: "PAULINE R. MURRAY ACCOUNTANTS PTY. LTD.",
    },
    {
      AFSNumber: "486148",
      AFSName: "EASY FINANCIAL SERVICES AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "486159",
      AFSName: "LOW, FUI SING",
    },
    {
      AFSNumber: "486196",
      AFSName: "GCC LICENSEE PTY LTD",
    },
    {
      AFSNumber: "486217",
      AFSName: "EVOLUTION TRUSTEES LIMITED",
    },
    {
      AFSNumber: "486236",
      AFSName: "FOUNDATION ADVISORY PTY LTD",
    },
    {
      AFSNumber: "486245",
      AFSName: "R.G. CROTHERS PTY LTD",
    },
    {
      AFSNumber: "486275",
      AFSName: "EVERGREEN FUND MANAGERS PTY LTD",
    },
    {
      AFSNumber: "486279",
      AFSName: "BANYAN TREE INVESTMENT GROUP PTY. LTD.",
    },
    {
      AFSNumber: "486326",
      AFSName: "ALTERNATIVE MEDIA PTY LTD",
    },
    {
      AFSNumber: "486361",
      AFSName: "ALLISON JANE LEBUSQUE",
    },
    {
      AFSNumber: "486455",
      AFSName: "PRAESCIUS FINANCIAL HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "486470",
      AFSName: "SB PARTNERS PTY LTD",
    },
    {
      AFSNumber: "486505",
      AFSName: "PRINCIPAL PARTNERS SECURITIES PTY LTD",
    },
    {
      AFSNumber: "486652",
      AFSName: "MULPHA FUNDS SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "486674",
      AFSName: "JBS FINANCIAL STRATEGISTS PTY LTD",
    },
    {
      AFSNumber: "486680",
      AFSName: "L JACK & ASSOCIATES STRATEGIC ADVISORY PTY LTD",
    },
    {
      AFSNumber: "486685",
      AFSName: "DEMPSEY, KENETH RONALD",
    },
    {
      AFSNumber: "486695",
      AFSName: "YH CAPITAL GROUP PTY LTD",
    },
    {
      AFSNumber: "486720",
      AFSName: "DAVID J. GIBNEY PTY LTD",
    },
    {
      AFSNumber: "486721",
      AFSName: "CHARTER HALL WALE LIMITED",
    },
    {
      AFSNumber: "486723",
      AFSName: "AGED CARE STEPS PTY LIMITED",
    },
    {
      AFSNumber: "486725",
      AFSName: "KOMPLETE ADVISORY GROUP PTY LTD",
    },
    {
      AFSNumber: "486731",
      AFSName: "D C & S J KLENK INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "486775",
      AFSName: "TAXPERTS PTY LTD",
    },
    {
      AFSNumber: "486798",
      AFSName: "KM PRIVATE CLIENTS PTY LTD",
    },
    {
      AFSNumber: "486800",
      AFSName: "AJ FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "486878",
      AFSName: "MORPHEUS ADVISORS (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "486892",
      AFSName: "CTE INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "486912",
      AFSName: "GLOBAL MINING RESEARCH PTY LTD",
    },
    {
      AFSNumber: "486931",
      AFSName: "CARLSHURST INVESTMENTS PTY LIMITED",
    },
    {
      AFSNumber: "487103",
      AFSName: "WEALTH PLUS SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "487125",
      AFSName: "CAMBIO GROUP AFSL PTY LTD",
    },
    {
      AFSNumber: "487177",
      AFSName: "INSURANCE INVESTMENT SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "487183",
      AFSName: "CB WEALTH SERVICES PTY LTD",
    },
    {
      AFSNumber: "487205",
      AFSName: "BOURSE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "487221",
      AFSName: "AIRWALLEX PTY LTD",
    },
    {
      AFSNumber: "487247",
      AFSName: "MEARNS, CHARRON LOUISE",
    },
    {
      AFSNumber: "487256",
      AFSName: "BLAND, MICHAEL COCKBURN",
    },
    {
      AFSNumber: "487261",
      AFSName: "BMT INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "487263",
      AFSName: "JEFFERIES (AUSTRALIA) SECURITIES PTY LTD",
    },
    {
      AFSNumber: "487279",
      AFSName: "BELLTREES SECURITIES PTY LIMITED",
    },
    {
      AFSNumber: "487318",
      AFSName: "3P WEALTH PTY. LTD.",
    },
    {
      AFSNumber: "487325",
      AFSName: "PROFESSIONAL INVESTMENT SOLUTIONS PTY. LTD.",
    },
    {
      AFSNumber: "487354",
      AFSName: "CHALLENGER INVESTMENT SOLUTIONS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "487355",
      AFSName: "ZENOBIA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "487363",
      AFSName: "KENNEDY KING PTY LTD",
    },
    {
      AFSNumber: "487370",
      AFSName: "ADAMS TRIGLONE PTY LIMITED",
    },
    {
      AFSNumber: "487372",
      AFSName: "ONLINE POWER AND GAS ADMINISTRATION PTY LTD",
    },
    {
      AFSNumber: "487374",
      AFSName: "ASAP FINANCE SOLUTIONS PTY. LTD.",
    },
    {
      AFSNumber: "487419",
      AFSName: "PROVIDENCE EQUITY HOLDINGS PTY. LTD.",
    },
    {
      AFSNumber: "487440",
      AFSName: "MARPROP FINANCIAL SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "487450",
      AFSName: "SMSF MADEASY PTY LTD",
    },
    {
      AFSNumber: "487505",
      AFSName: "PIMCO AUSTRALIA MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "487510",
      AFSName: "ARK INVESTMENT PARTNERS PTY LTD",
    },
    {
      AFSNumber: "487590",
      AFSName: "HALLAM ACCOUNTING PTY LTD",
    },
    {
      AFSNumber: "487618",
      AFSName: "TOWNSEND COBAIN PTY LTD",
    },
    {
      AFSNumber: "487626",
      AFSName: "OPTAR PTY LTD",
    },
    {
      AFSNumber: "487629",
      AFSName: "ELITE TAXATION SERVICES PTY. LIMITED",
    },
    {
      AFSNumber: "487633",
      AFSName: "ELYSIUM STRATEGIC SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "487646",
      AFSName: "WHITEOAK PTY. LIMITED",
    },
    {
      AFSNumber: "487717",
      AFSName: "TRIEBEL PTY LTD",
    },
    {
      AFSNumber: "487758",
      AFSName: "DOCTORS FINANCIAL SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "487858",
      AFSName: "DANIEL ALLISON & ASSOCIATES SUPERANNUATION PTY LTD",
    },
    {
      AFSNumber: "487878",
      AFSName: "WALSH BAY PARTNERS PTY LTD",
    },
    {
      AFSNumber: "487884",
      AFSName: "CAPITAL ADVICE PARTNERS PTY LTD",
    },
    {
      AFSNumber: "487885",
      AFSName: "CATAMA PTY. LTD.",
    },
    {
      AFSNumber: "487912",
      AFSName: "GALLEY ASSOCIATES PTY. LTD.",
    },
    {
      AFSNumber: "487918",
      AFSName: "TOWEMER PTY LTD",
    },
    {
      AFSNumber: "487945",
      AFSName: "FIRST CHOICE SUPER PTY LTD",
    },
    {
      AFSNumber: "487986",
      AFSName: "BIZZACA & BUHARI FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "488001",
      AFSName: "GALLAGHER BENEFIT SERVICES PTY LTD",
    },
    {
      AFSNumber: "488036",
      AFSName: "WISDOM WEALTH PTY LTD",
    },
    {
      AFSNumber: "488045",
      AFSName: "PACREEF ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "488120",
      AFSName: "TRUE ELITE BUSINESS SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "488136",
      AFSName: "ESR WIM (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "488196",
      AFSName: "CFG AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "488235",
      AFSName: "CENTRAL COAST BUSINESS SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "488236",
      AFSName: "MUNRO SPAUL FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "488256",
      AFSName: "BARTLETT ACCOUNTING SERVICES PTY LTD",
    },
    {
      AFSNumber: "488267",
      AFSName: "K ONG & K.H TAY",
    },
    {
      AFSNumber: "488271",
      AFSName: "ESOFT SOLUTIONS PTY. LTD.",
    },
    {
      AFSNumber: "488294",
      AFSName: "MORIAH FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "488301",
      AFSName: "SBA ADVICE PTY LTD",
    },
    {
      AFSNumber: "488306",
      AFSName: "CAPITAL STAR WEALTH & FINANCE PTY LTD",
    },
    {
      AFSNumber: "488331",
      AFSName: "VENN MILNER SUPERANNUATION SERVICES PTY LTD",
    },
    {
      AFSNumber: "488345",
      AFSName: "KODA CAPITAL MARKETS PTY LTD",
    },
    {
      AFSNumber: "488390",
      AFSName: "I2 ADVISORY FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "488396",
      AFSName: "SALMON HEIST PTY LTD",
    },
    {
      AFSNumber: "488403",
      AFSName: "ASSETINSURE PTY LIMITED",
    },
    {
      AFSNumber: "488421",
      AFSName: "LEITH, DIANE ALISON",
    },
    {
      AFSNumber: "488429",
      AFSName: "CLEAR SKY PROPERTIES PTY LTD",
    },
    {
      AFSNumber: "488443",
      AFSName: "4C CONSULTING (SA) PTY LTD",
    },
    {
      AFSNumber: "488458",
      AFSName: "ARAPIDIS & PARTNERS PTY LTD",
    },
    {
      AFSNumber: "488465",
      AFSName: "WEBBER INSURANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "488468",
      AFSName: "WIGGINS TAXATION SERVICES PTY LTD",
    },
    {
      AFSNumber: "488493",
      AFSName: "MULPHA FUNDS MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "488497",
      AFSName: "GU, LI ",
    },
    {
      AFSNumber: "488505",
      AFSName: "PLAN FOR SUPER PTY LTD",
    },
    {
      AFSNumber: "488564",
      AFSName: "SYNDEO ACCOUNTING SERVICES PTY LTD",
    },
    {
      AFSNumber: "488567",
      AFSName: "N P FINANCIALS PTY LTD",
    },
    {
      AFSNumber: "488588",
      AFSName: "AUSTANDARD INDUSTRIAL INTERNATIONAL PTY. LTD.",
    },
    {
      AFSNumber: "488609",
      AFSName: "GRANGE FINANCIAL SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "488612",
      AFSName: "HOUSE OF WEALTH FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "488637",
      AFSName: "XIE, WEI MIN",
    },
    {
      AFSNumber: "488655",
      AFSName: "BR ADVICE PTY LTD",
    },
    {
      AFSNumber: "488666",
      AFSName: "DAVIS WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "488678",
      AFSName: "RICHARDSON FINANCIAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "488685",
      AFSName: "MITROPOULOS, HELEN ",
    },
    {
      AFSNumber: "488689",
      AFSName: "HEMDAN, AYMAN ",
    },
    {
      AFSNumber: "488697",
      AFSName: "ZAHOUL ACCOUNTING PTY LTD",
    },
    {
      AFSNumber: "488701",
      AFSName: "KENWORTHY, GERARD ",
    },
    {
      AFSNumber: "488721",
      AFSName: "SPECIALIST ACCOUNTING & BUSINESS ADVISORY PTY LTD",
    },
    {
      AFSNumber: "488726",
      AFSName: "WEALTHMALL FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "488736",
      AFSName: "HALLETTS FINANCIAL SERVICES GROUP PTY LTD",
    },
    {
      AFSNumber: "488739",
      AFSName: "POYNTON STAVRIANOU PTY LTD",
    },
    {
      AFSNumber: "488756",
      AFSName: "M R ADVISORY PTY LTD",
    },
    {
      AFSNumber: "488798",
      AFSName: "MARKETMATTERS PTY LTD",
    },
    {
      AFSNumber: "488803",
      AFSName: "ZEITOUNEH, MALEK ",
    },
    {
      AFSNumber: "488816",
      AFSName: "VEGA PARTNERS PTY LTD",
    },
    {
      AFSNumber: "488823",
      AFSName: "TDK GROUP PTY LTD",
    },
    {
      AFSNumber: "488824",
      AFSName: "HRH PARTNERS PTY LTD",
    },
    {
      AFSNumber: "488825",
      AFSName: "AFP FINANCIAL PLANNING & CONSULTING PTY LTD",
    },
    {
      AFSNumber: "488828",
      AFSName: "STAR FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "488831",
      AFSName: "BEXCEED TAX & ACCOUNTING SERVICES PTY LTD",
    },
    {
      AFSNumber: "488841",
      AFSName: "BLACK GREEN EQUITY PTY LTD",
    },
    {
      AFSNumber: "488846",
      AFSName: "ZUO, MING ",
    },
    {
      AFSNumber: "488853",
      AFSName: "KAPLANIS, CON ",
    },
    {
      AFSNumber: "488905",
      AFSName: "ROSICA, GIACINTA GIANNA",
    },
    {
      AFSNumber: "488917",
      AFSName: "TAC AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "488931",
      AFSName: "AMA BUSINESS SERVICES PTY LTD",
    },
    {
      AFSNumber: "488936",
      AFSName: "PRIMASSURE (AUSTRALIA) PTY. LTD.",
    },
    {
      AFSNumber: "488940",
      AFSName: "ORACLE WEALTH ADVISORY PTY. LTD.",
    },
    {
      AFSNumber: "488955",
      AFSName: "JENS, JANE TUAZON",
    },
    {
      AFSNumber: "488964",
      AFSName: "SHAH TAX & AUDIT SERVICES PTY LTD",
    },
    {
      AFSNumber: "488968",
      AFSName: "SUN, PAUL ",
    },
    {
      AFSNumber: "488978",
      AFSName: "MW & KL HACKETT PTY LTD",
    },
    {
      AFSNumber: "488980",
      AFSName: "WHITFORD, KENNETH DEAN",
    },
    {
      AFSNumber: "488993",
      AFSName: "SHAW DOWNIE PTY LIMITED",
    },
    {
      AFSNumber: "488996",
      AFSName: "FISHER, MARK STEPHEN",
    },
    {
      AFSNumber: "488998",
      AFSName: "GODDARD, RICHARD JEFFREY",
    },
    {
      AFSNumber: "488999",
      AFSName: "ESTENS AND RANKMORE PTY LTD",
    },
    {
      AFSNumber: "489001",
      AFSName: "PMA STRATEGIC ADVISORY SERVICES PTY LTD",
    },
    {
      AFSNumber: "489002",
      AFSName: "PETRUS SUPERANNUATION PTY LIMITED",
    },
    {
      AFSNumber: "489005",
      AFSName: "LGO ACCOUNTING & TAXATION SERVICES PTY LTD",
    },
    {
      AFSNumber: "489010",
      AFSName: "THE STELLUM GROUP STRATEGIC ADVICE PTY LTD",
    },
    {
      AFSNumber: "489012",
      AFSName: "THOMAS, NOBLE ",
    },
    {
      AFSNumber: "489016",
      AFSName: "GUPTA, PREETI ",
    },
    {
      AFSNumber: "489043",
      AFSName: "HLV FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "489044",
      AFSName: "DGZ PARTNERS PTY LTD",
    },
    {
      AFSNumber: "489048",
      AFSName: "2020 TAX PTY LIMITED",
    },
    {
      AFSNumber: "489060",
      AFSName: "SINGH, RAJENDER ",
    },
    {
      AFSNumber: "489061",
      AFSName: "SYED, ABID ALAM",
    },
    {
      AFSNumber: "489063",
      AFSName: "SPENCER, NICOLE LEE",
    },
    {
      AFSNumber: "489070",
      AFSName: "KUMARASIRI, GUNARATNAM ",
    },
    {
      AFSNumber: "489071",
      AFSName: "JUBB FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "489075",
      AFSName: "HADLEY, MICHAEL ANTHONY",
    },
    {
      AFSNumber: "489082",
      AFSName: "MUN ACCOUNTANTS & TAX ADVISERS PTY LTD",
    },
    {
      AFSNumber: "489096",
      AFSName: "RR CONSULTANCY PTY LTD",
    },
    {
      AFSNumber: "489104",
      AFSName: "HONG & COMPANY PTY LTD",
    },
    {
      AFSNumber: "489107",
      AFSName: "MARK NEAVERSON & ASSOCIATES PTY LIMITED",
    },
    {
      AFSNumber: "489111",
      AFSName: "ACCOUNTANCY IN THE HILLS PTY LTD",
    },
    {
      AFSNumber: "489121",
      AFSName: "SMART TAX PARTNERS PTY LTD",
    },
    {
      AFSNumber: "489136",
      AFSName: "PUSHPANATHAN TRADING PTY LTD",
    },
    {
      AFSNumber: "489151",
      AFSName: "KNIGHTSBRIDGE WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "489188",
      AFSName: "GUPTA, NADIA PERVEEN",
    },
    {
      AFSNumber: "489190",
      AFSName: "PRIESTLEYS ACCOUNTING PTY LTD",
    },
    {
      AFSNumber: "489195",
      AFSName: "LEGGETT ADVISORY PTY LTD",
    },
    {
      AFSNumber: "489202",
      AFSName: "SETHI RAJESH & CO. PTY LTD",
    },
    {
      AFSNumber: "489203",
      AFSName: "AUSTRALIA FORESIGHT GROUP PTY LTD",
    },
    {
      AFSNumber: "489212",
      AFSName: "SUPERFECT PTY LTD",
    },
    {
      AFSNumber: "489219",
      AFSName: "WEALTHPRENEUR PTY LTD",
    },
    {
      AFSNumber: "489222",
      AFSName: "HAYES JOHNSTON PTY LTD",
    },
    {
      AFSNumber: "489225",
      AFSName: "SUPA ADVISORY PTY LIMITED",
    },
    {
      AFSNumber: "489228",
      AFSName: "OP SMSF SERVICES PTY LTD",
    },
    {
      AFSNumber: "489230",
      AFSName: "BDS ACCOUNTING PTY LTD",
    },
    {
      AFSNumber: "489232",
      AFSName: "DPA CORP PTY LTD",
    },
    {
      AFSNumber: "489235",
      AFSName: "SUPER BY DESIGN - ADMIN PTY LTD",
    },
    {
      AFSNumber: "489251",
      AFSName: "AGEIS ACCOUNTING AND TAX PTY LIMITED",
    },
    {
      AFSNumber: "489261",
      AFSName: "INSYT PTY. LTD.",
    },
    {
      AFSNumber: "489281",
      AFSName: "COMPLETE COMMERCE FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "489315",
      AFSName: "CROSS MARC PTY. LTD.",
    },
    {
      AFSNumber: "489340",
      AFSName: "LIGHTHOUSE FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "489437",
      AFSName: "KOHLE CAPITAL MARKETS PTY LTD",
    },
    {
      AFSNumber: "489444",
      AFSName: "INTEGRO HOLDINGS (WA) PTY LTD",
    },
    {
      AFSNumber: "489445",
      AFSName: "NORTHWEST HEALTHCARE AUSTRALIA RE LIMITED",
    },
    {
      AFSNumber: "489502",
      AFSName: "ENOVA COMMUNITY ENERGY LTD",
    },
    {
      AFSNumber: "489650",
      AFSName: "QSUPER BOARD PTY LIMITED",
    },
    {
      AFSNumber: "489781",
      AFSName: "PROFICIENT CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "489820",
      AFSName: "SFS LICENCE PTY LTD",
    },
    {
      AFSNumber: "489902",
      AFSName: "BILLTRADER PTY. LTD.",
    },
    {
      AFSNumber: "490023",
      AFSName: "FERGUSON HYAMS INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "490058",
      AFSName: "COVER GENIUS PTY LTD",
    },
    {
      AFSNumber: "490210",
      AFSName: "DOZZI PTY LTD",
    },
    {
      AFSNumber: "490284",
      AFSName: "EXCEED CAPITAL PTY LTD",
    },
    {
      AFSNumber: "490348",
      AFSName: "BARCHESTER FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "490448",
      AFSName: "THORNTON & LEE PTY LTD",
    },
    {
      AFSNumber: "490514",
      AFSName: "STEWARDSHIP ACCOUNTANTS PTY LTD",
    },
    {
      AFSNumber: "490523",
      AFSName: "SGN FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "490539",
      AFSName: "ION WHOLESALE PTY LTD",
    },
    {
      AFSNumber: "490542",
      AFSName: "ANC WEALTH PTY LTD",
    },
    {
      AFSNumber: "490596",
      AFSName: "YENDYS CAPITAL PTY LTD",
    },
    {
      AFSNumber: "490721",
      AFSName: "IO2 INSURANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "490749",
      AFSName: "AURORA CAPITAL MARKETS PTY LTD",
    },
    {
      AFSNumber: "490750",
      AFSName: "CAMPBELL PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "490768",
      AFSName: "THE INSURANCE BROKER (NSW) PTY LTD",
    },
    {
      AFSNumber: "491024",
      AFSName: "20:20 INSURANCE SERVICES PTY LTD",
    },
    {
      AFSNumber: "491029",
      AFSName: "INGLIS INSURANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "491106",
      AFSName: "347 DARLING PTY LTD",
    },
    {
      AFSNumber: "491113",
      AFSName: "CHUISAVER UNDERWRITING AGENCY PTY LTD",
    },
    {
      AFSNumber: "491118",
      AFSName: "SCP CORPORATION PTY LTD",
    },
    {
      AFSNumber: "491119",
      AFSName: "RC GLOBAL FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "491139",
      AFSName: "ETORO AUS CAPITAL LIMITED",
    },
    {
      AFSNumber: "491151",
      AFSName: "KBH FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "491165",
      AFSName: "INSURANCE SERVICE HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "491201",
      AFSName: "AUSTRALIAN SECURE CAPITAL FUND LTD",
    },
    {
      AFSNumber: "491215",
      AFSName: "THAMES CAPITAL GROUP PTY LTD",
    },
    {
      AFSNumber: "491268",
      AFSName: "MSI FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "491287",
      AFSName: "PRIVATEINVEST CAPITAL SECURITIES LIMITED",
    },
    {
      AFSNumber: "491309",
      AFSName: "YOUSEF, WASEEM ",
    },
    {
      AFSNumber: "491352",
      AFSName: "REDSEASON PTY LTD",
    },
    {
      AFSNumber: "491395",
      AFSName: "ATLAS FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "491411",
      AFSName: "THE AFSL PTY LTD",
    },
    {
      AFSNumber: "491432",
      AFSName: "PRECISION FINANCIAL CONSULTING PTY LTD",
    },
    {
      AFSNumber: "491461",
      AFSName: "XEC PARTNERS PTY LTD",
    },
    {
      AFSNumber: "491477",
      AFSName: "KEYSTONE ASSET MANAGEMENT LTD",
    },
    {
      AFSNumber: "491513",
      AFSName: "LBW STRATEGIC PTY LTD",
    },
    {
      AFSNumber: "491530",
      AFSName: "IVCM (AUST) PTY LTD",
    },
    {
      AFSNumber: "491551",
      AFSName: "BLENKHORN KIRKWOOD FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "491619",
      AFSName: "WEALTH MANAGEMENT MATTERS PTY LTD",
    },
    {
      AFSNumber: "491754",
      AFSName: "D&M FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "491793",
      AFSName: "LION UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "491887",
      AFSName: "WISDOM FUNDS PTY LIMITED",
    },
    {
      AFSNumber: "492022",
      AFSName: "KEY FINANCIAL PLANNERS PTY LTD",
    },
    {
      AFSNumber: "492049",
      AFSName: "DESIGN ADVISORY GROUP PTY LTD",
    },
    {
      AFSNumber: "492075",
      AFSName: "EFN (AUSTRALIA) PTY LIMITED",
    },
    {
      AFSNumber: "492077",
      AFSName: "NETWORK ADVISORY PTY LTD",
    },
    {
      AFSNumber: "492134",
      AFSName: "SCOPE LICENSEE SERVICES PTY LTD",
    },
    {
      AFSNumber: "492256",
      AFSName: "PROGUARD PTY LTD",
    },
    {
      AFSNumber: "492354",
      AFSName: "ZAGGA INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "492410",
      AFSName: "WRS LICENSEE PTY LTD",
    },
    {
      AFSNumber: "492452",
      AFSName: "MANTIS FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "492490",
      AFSName: "FORTE SECURITIES AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "492534",
      AFSName: "ACRUX CAPITAL PTY LTD",
    },
    {
      AFSNumber: "492686",
      AFSName: "SENECA FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "492712",
      AFSName: "FORREST PRIVATE WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "492717",
      AFSName: "ADAMANTEM CAPITAL PTY LTD",
    },
    {
      AFSNumber: "492806",
      AFSName: "UNISUPER LIMITED",
    },
    {
      AFSNumber: "492807",
      AFSName: "VISION PLANNING & FINANCE (AUST) PTY LTD",
    },
    {
      AFSNumber: "492814",
      AFSName: "INTERVATE CAPITAL LIMITED",
    },
    {
      AFSNumber: "492850",
      AFSName: "CHIEFTAIN SECURITIES PTY LTD",
    },
    {
      AFSNumber: "492953",
      AFSName: "DIRECTION ADVICE GROUP PTY LTD",
    },
    {
      AFSNumber: "492973",
      AFSName: "SEED PARTNERSHIPS PTY LTD",
    },
    {
      AFSNumber: "493066",
      AFSName: "QUADRANT INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "493121",
      AFSName: "K1 CAPITAL PTY LTD",
    },
    {
      AFSNumber: "493145",
      AFSName: "WENTWORTH CAPITAL PRIVATE EQUITY PTY LTD",
    },
    {
      AFSNumber: "493204",
      AFSName: "ASHANTI CAPITAL PTY LTD",
    },
    {
      AFSNumber: "493251",
      AFSName: "PAXTON BRIDGE PTY LTD",
    },
    {
      AFSNumber: "493337",
      AFSName: "VCF CAPITAL PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "493340",
      AFSName: "CLARITY SUCCESS FREEDOM PTY LTD",
    },
    {
      AFSNumber: "493341",
      AFSName: "GOKANI, KANTILAL RATANSHI",
    },
    {
      AFSNumber: "493361",
      AFSName: "BLUE OCEAN FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "493372",
      AFSName: "BC PAYMENTS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "493386",
      AFSName: "STEVE DAVIES PTY LTD",
    },
    {
      AFSNumber: "493421",
      AFSName: "ONE FUND SERVICES LTD",
    },
    {
      AFSNumber: "493441",
      AFSName: "AUSTRALIAN COUNCIL OF SUPERANNUATION INVESTORS LIMITED",
    },
    {
      AFSNumber: "493459",
      AFSName: "INDEPENDENT WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "493520",
      AFSName: "FORT SECURITIES AUSTRALIA PTY. LTD.",
    },
    {
      AFSNumber: "493576",
      AFSName: "NGC FUND MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "493579",
      AFSName: "WARANA CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "493589",
      AFSName: "EQUIS AUSTRALIA MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "493599",
      AFSName: "TRUMEN INVESTMENT COMPANY PTY LTD",
    },
    {
      AFSNumber: "493605",
      AFSName: "CAPITAL MANAGEMENT AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "493660",
      AFSName: "BRIGHTLIGHT GROUP PTY LTD",
    },
    {
      AFSNumber: "493670",
      AFSName: "LINARGO CAPITAL PTY LTD",
    },
    {
      AFSNumber: "493713",
      AFSName: "FTA INSURANCE PTY LTD",
    },
    {
      AFSNumber: "493772",
      AFSName: "GOLDEN AGE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "493778",
      AFSName: "GREENFORT IM PTY LTD",
    },
    {
      AFSNumber: "493789",
      AFSName: "CIVIC RISK MUTUAL LTD",
    },
    {
      AFSNumber: "493790",
      AFSName: "LUMEN INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "493803",
      AFSName: "WHOLESALE INVESTOR AFSL PTY. LTD.",
    },
    {
      AFSNumber: "493813",
      AFSName: "GIBRALTAR CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "493844",
      AFSName: "STRATEGIC ASSET ADVISORY PTY LTD",
    },
    {
      AFSNumber: "493852",
      AFSName: "FREQUENCY VENTURES MANAGEMENT PTY. LTD.",
    },
    {
      AFSNumber: "493924",
      AFSName: "WAKEFIELD PARTNERS PTY LTD",
    },
    {
      AFSNumber: "494009",
      AFSName: "SUMO SIV PTY LTD",
    },
    {
      AFSNumber: "494022",
      AFSName: "FAIRMONT EQUITIES AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "494045",
      AFSName: "CONTACT ASSET MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "494066",
      AFSName: "RED & CO FUNDS PTY LTD",
    },
    {
      AFSNumber: "494108",
      AFSName: "PARRISH ADVISORY PTY LTD",
    },
    {
      AFSNumber: "494111",
      AFSName: "CSIRO FINANCIAL SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "494127",
      AFSName: "OTIRA CAPITAL PTY. LTD.",
    },
    {
      AFSNumber: "494176",
      AFSName: "BILLZY PTY LTD",
    },
    {
      AFSNumber: "494185",
      AFSName: "LENDLEASE INVESTMENT MANAGEMENT (AFSL) PTY LIMITED",
    },
    {
      AFSNumber: "494196",
      AFSName: "INSPIRED FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "494198",
      AFSName: "XANTUS PTY LTD",
    },
    {
      AFSNumber: "494253",
      AFSName: "BOUTIQUE WEALTH AUSTRALIA PTY. LTD.",
    },
    {
      AFSNumber: "494272",
      AFSName: "VAIRE WOOD PTY LTD",
    },
    {
      AFSNumber: "494275",
      AFSName: "ETICORE SD PTY LTD",
    },
    {
      AFSNumber: "494360",
      AFSName: "PLATFORM ADVISORY PARTNERS PTY. LTD.",
    },
    {
      AFSNumber: "494364",
      AFSName: "YELLOWCHIP FUNDS GROUP PTY LTD",
    },
    {
      AFSNumber: "494420",
      AFSName: "HOWARD CAPITAL MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "494552",
      AFSName: "FORESIGHT ANALYTICS & RATINGS PTY LTD",
    },
    {
      AFSNumber: "494625",
      AFSName: "MACRO STRATEGY ADVISORS PTY. LTD.",
    },
    {
      AFSNumber: "494636",
      AFSName: "AROAU CAPITAL HOLDING PTY LTD",
    },
    {
      AFSNumber: "494696",
      AFSName: "WATTLE HILL CAPITAL INTERNATIONAL PTY LTD",
    },
    {
      AFSNumber: "494702",
      AFSName: "AWARD GLOBAL CAPITAL PTY LTD",
    },
    {
      AFSNumber: "494792",
      AFSName: "KBI GROUP PTY LTD",
    },
    {
      AFSNumber: "494799",
      AFSName: "CAPSTONE GLOBAL AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "494800",
      AFSName: "OPE FINANCIAL SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "494836",
      AFSName: "ALL PARKS INSURANCE PTY LTD",
    },
    {
      AFSNumber: "494857",
      AFSName: "VIZ INSURANCE PTY LTD",
    },
    {
      AFSNumber: "494858",
      AFSName: "KEEP WEALTH PARTNERS PTY LTD",
    },
    {
      AFSNumber: "494878",
      AFSName: "BRICKX FINANCIAL SERVICES LIMITED",
    },
    {
      AFSNumber: "494886",
      AFSName: "CACHE (RE SERVICES) LTD",
    },
    {
      AFSNumber: "495009",
      AFSName: "XTO CAPITAL PTY LTD",
    },
    {
      AFSNumber: "495025",
      AFSName: "OMIPAY PTY. LTD.",
    },
    {
      AFSNumber: "495082",
      AFSName: "MEGA LINES PTY. LTD.",
    },
    {
      AFSNumber: "495301",
      AFSName: "TIMJAMWAY PTY LTD",
    },
    {
      AFSNumber: "495401",
      AFSName: "CONSORTIUM PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "495417",
      AFSName: "BLUE STAMP COMPANY PTY LTD",
    },
    {
      AFSNumber: "495472",
      AFSName: "BOTT INSURANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "495480",
      AFSName: "FRANKLIN ADVISORY PTY LTD",
    },
    {
      AFSNumber: "495539",
      AFSName: "ACN 615 197 745 PTY LTD",
    },
    {
      AFSNumber: "495546",
      AFSName: "SPROUT FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "495639",
      AFSName: "C.S. & CO MANAGERS PTY. LIMITED",
    },
    {
      AFSNumber: "495647",
      AFSName: "AC AFSL PTY LTD",
    },
    {
      AFSNumber: "495738",
      AFSName: "WOODLEIGH FIELDS PTY. LTD.",
    },
    {
      AFSNumber: "495804",
      AFSName: "KEYMAX ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "495938",
      AFSName: "TAISHIN INTERNATIONAL BANK CO.  LTD.",
    },
    {
      AFSNumber: "495981",
      AFSName: "TOTAL LICENSING SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "496025",
      AFSName: "ALPHAXO RISK PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "496089",
      AFSName: "MG WEALTH ADVISORS PTY LTD",
    },
    {
      AFSNumber: "496177",
      AFSName: "SAVANT GLOBAL CAPITAL PTY LTD",
    },
    {
      AFSNumber: "496178",
      AFSName: "ALTITUDE FINANCIAL ADVISERS PTY LTD",
    },
    {
      AFSNumber: "496260",
      AFSName: "SHARPKEY PTY LTD",
    },
    {
      AFSNumber: "496321",
      AFSName: "I.R STEVENS & D STEVENS",
    },
    {
      AFSNumber: "496348",
      AFSName: "BG WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "496362",
      AFSName: "FORTUNITY ADVICE PTY LTD",
    },
    {
      AFSNumber: "496371",
      AFSName: "GTC GLOBAL (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "496444",
      AFSName: "EQUITIFUND SECURITIES PTY LTD",
    },
    {
      AFSNumber: "496469",
      AFSName: "BCS BROKING PTY LTD",
    },
    {
      AFSNumber: "496692",
      AFSName: "ADVICE ASSIST AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "496959",
      AFSName: "COLINTON CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "497000",
      AFSName: "FORT STREET CAPITAL PTY LTD",
    },
    {
      AFSNumber: "497040",
      AFSName: "CDF AFSL NSW LTD",
    },
    {
      AFSNumber: "497051",
      AFSName: "CHINSIRO PTY LTD",
    },
    {
      AFSNumber: "497169",
      AFSName: "RIVWEST FINANCE LTD",
    },
    {
      AFSNumber: "497196",
      AFSName: "KHI CBIS (AUST) PTY LTD",
    },
    {
      AFSNumber: "497198",
      AFSName: "YAMAHA MOTOR INSURANCE AUSTRALIA PTY. LTD.",
    },
    {
      AFSNumber: "497211",
      AFSName: "SAVILLS INVESTMENT MANAGEMENT (AUSTRALIA) PTY LIMITED",
    },
    {
      AFSNumber: "497263",
      AFSName: "NAB TRUST SERVICES LIMITED",
    },
    {
      AFSNumber: "497333",
      AFSName: "LONGREACH CAPITAL PTY. LTD.",
    },
    {
      AFSNumber: "497475",
      AFSName: "ATLAS INFRASTRUCTURE (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "497505",
      AFSName: "NEW RIVER ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "497721",
      AFSName: "ULTON WEALTH SERVICES PTY LTD",
    },
    {
      AFSNumber: "497783",
      AFSName: "STIRLING PROPERTY FUNDS LTD",
    },
    {
      AFSNumber: "497829",
      AFSName: "HEPHZIBAH FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "497949",
      AFSName: "SHERRIN PARTNERS SERVICES PTY LTD",
    },
    {
      AFSNumber: "498167",
      AFSName: "PROPRIUM CAPITAL PARTNERS (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "498219",
      AFSName: "LIBERTATE ADVISORY PTY LTD",
    },
    {
      AFSNumber: "498227",
      AFSName: "POTENTIA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "498384",
      AFSName: "CLEARWATER CAPITAL CORPORATION PTY LTD",
    },
    {
      AFSNumber: "498434",
      AFSName: "CAPITAL GUARD AU PTY LTD",
    },
    {
      AFSNumber: "498460",
      AFSName: "CIVIC INSURANCE PTY LTD",
    },
    {
      AFSNumber: "498519",
      AFSName: "DYNAMIC INSURANCE SERVICES PTY LTD",
    },
    {
      AFSNumber: "498531",
      AFSName: "CHINA MERCHANTS BANK CO.  LTD.",
    },
    {
      AFSNumber: "498585",
      AFSName: "CELSIUS PRO (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "498715",
      AFSName: "APEX MACRO FINANCIAL GROUP PTY. LTD.",
    },
    {
      AFSNumber: "498737",
      AFSName: "LENNOX CAPITAL PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "498778",
      AFSName: "DEXUS INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "498819",
      AFSName: "TAIM INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "498871",
      AFSName: "RICHLINK CAPITAL INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "498952",
      AFSName: "ELEVENTEN ADVISORY SERVICES PTY LTD",
    },
    {
      AFSNumber: "499010",
      AFSName: "MFG ADVICE PTY LTD",
    },
    {
      AFSNumber: "499066",
      AFSName: "AXIUS SERVICES PTY LTD",
    },
    {
      AFSNumber: "499092",
      AFSName: "HYPERWALLET SYSTEMS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "499098",
      AFSName: "SALIENT CORPORATE PTY LTD",
    },
    {
      AFSNumber: "499141",
      AFSName: "ARCH FINANCE PTY LTD",
    },
    {
      AFSNumber: "499173",
      AFSName: "ADVISE AND ASSIST PTY LIMITED",
    },
    {
      AFSNumber: "499193",
      AFSName: "EGP CAPITAL PTY LTD",
    },
    {
      AFSNumber: "499250",
      AFSName: "LUDOSH PTY LTD",
    },
    {
      AFSNumber: "499272",
      AFSName: "ELECT WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "499339",
      AFSName: "CENTURIA BASS FINANCIAL SERVICES LIMITED",
    },
    {
      AFSNumber: "499407",
      AFSName: "BANK OF TAIWAN",
    },
    {
      AFSNumber: "499409",
      AFSName: "BGH CAPITAL PTY LTD",
    },
    {
      AFSNumber: "499444",
      AFSName: "TRUWEALTH GROUP PTY LTD",
    },
    {
      AFSNumber: "499517",
      AFSName: "JINDING FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "499542",
      AFSName: "ENERVANCE PTY. LTD.",
    },
    {
      AFSNumber: "499615",
      AFSName: "HEADWAY CAPITAL PTY LTD",
    },
    {
      AFSNumber: "499628",
      AFSName: "REALMONT REAL ASSETS PTY LTD",
    },
    {
      AFSNumber: "499640",
      AFSName: "DWS INVESTMENTS AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "499666",
      AFSName: "FIRST RUNG PTY. LTD.",
    },
    {
      AFSNumber: "499720",
      AFSName: "QUINBROOK ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "499761",
      AFSName: "MSQUARE GROUP PTY LTD",
    },
    {
      AFSNumber: "499766",
      AFSName: "WEALTH INTEGRITY PTY LTD",
    },
    {
      AFSNumber: "499786",
      AFSName: "PROFESSIONAL SUPERANNUATION MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "499827",
      AFSName: "EVERGREEN FINANCIAL ADVISERS PTY LTD",
    },
    {
      AFSNumber: "499882",
      AFSName: "NON CORRELATED CAPITAL PTY LTD",
    },
    {
      AFSNumber: "499919",
      AFSName: "TETRIS CAPITAL PTY LTD",
    },
    {
      AFSNumber: "499923",
      AFSName: "GLOBE FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "499929",
      AFSName: "BLUEBIRD CAPITAL PTY LTD",
    },
    {
      AFSNumber: "499932",
      AFSName: "RANGER FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "499958",
      AFSName: "AP LICENCE PTY LTD",
    },
    {
      AFSNumber: "499987",
      AFSName: "EVOLUTION FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "500014",
      AFSName: "CASTRAY CAPITAL PTY LTD",
    },
    {
      AFSNumber: "500017",
      AFSName: "LIVE PAYMENTS A&I PTY LTD",
    },
    {
      AFSNumber: "500032",
      AFSName: "DASH INVESTMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "500063",
      AFSName: "DOUUGH AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "500088",
      AFSName: "MIRO CAPITAL PTY LTD",
    },
    {
      AFSNumber: "500101",
      AFSName: "KVD TM PTY LTD",
    },
    {
      AFSNumber: "500105",
      AFSName: "STRIPE PAYMENTS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "500149",
      AFSName: "BRINDABELLA INSURANCE BROKERS PTY LIMITED",
    },
    {
      AFSNumber: "500223",
      AFSName: "DISCOVERY CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "500252",
      AFSName: "LATITUDE TECHNOLOGIES PTY LTD",
    },
    {
      AFSNumber: "500323",
      AFSName: "THE FAMILY WEALTH ADVISORY GROUP PTY LTD",
    },
    {
      AFSNumber: "500435",
      AFSName: "HAVANA FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "500551",
      AFSName: "COMMUNITAS WEALTH PTY LTD",
    },
    {
      AFSNumber: "500557",
      AFSName: "MST FINANCIAL SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "500574",
      AFSName: "XTRAS HEALTH PLAN LTD.",
    },
    {
      AFSNumber: "500656",
      AFSName: "HEIGHT CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "500701",
      AFSName: "VELOS GLOBAL MARKETS PTY LTD",
    },
    {
      AFSNumber: "500712",
      AFSName: "ARTIFEX PROPERTY GROUP PTY LIMITED",
    },
    {
      AFSNumber: "500768",
      AFSName: "BLEND INSURANCE SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "500818",
      AFSName: "GLOBAL TRADE WALLET (AU) PTY LIMITED",
    },
    {
      AFSNumber: "500823",
      AFSName: "OMNIUM TECHNOLOGIES PTY LTD",
    },
    {
      AFSNumber: "500876",
      AFSName: "SENERGY PTY LTD",
    },
    {
      AFSNumber: "500991",
      AFSName: "EBC FINANCIAL GROUP (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "501019",
      AFSName: "KINECT ENERGY PTY LIMITED",
    },
    {
      AFSNumber: "501022",
      AFSName: "UNITING CHURCH SA INVESTMENT FUND LIMITED",
    },
    {
      AFSNumber: "501045",
      AFSName: "KEYLAND CAPITAL PTY LTD",
    },
    {
      AFSNumber: "501075",
      AFSName: "XEAL PTY LTD",
    },
    {
      AFSNumber: "501091",
      AFSName: "JUDO BANK PTY LTD",
    },
    {
      AFSNumber: "501119",
      AFSName: "SOVEREIGN PRIVATE CORPORATE FINANCE PTY LTD",
    },
    {
      AFSNumber: "501143",
      AFSName: "SOLIDO CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "501175",
      AFSName: "REINVENTURE GROUP PTY. LTD.",
    },
    {
      AFSNumber: "501215",
      AFSName: "PAYMENTS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "501258",
      AFSName: "TRANSACT1 PTY LTD",
    },
    {
      AFSNumber: "501260",
      AFSName: "COPPIN INVESTMENT PARTNERS LIMITED",
    },
    {
      AFSNumber: "501290",
      AFSName: "LOYALIZE FUND MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "501311",
      AFSName: "LIPPER AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "501454",
      AFSName: "OAKLEIGH FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "501527",
      AFSName: "314 FINANCIAL PARTNERSHIP PTY LTD",
    },
    {
      AFSNumber: "501551",
      AFSName: "CANADIAN IMPERIAL BANK OF COMMERCE",
    },
    {
      AFSNumber: "501605",
      AFSName: "SPACESHIP CAPITAL LIMITED",
    },
    {
      AFSNumber: "501762",
      AFSName: "SESSION EQUITY PTY LTD",
    },
    {
      AFSNumber: "501769",
      AFSName: "BIZCOVER PTY LTD",
    },
    {
      AFSNumber: "501857",
      AFSName: "CFG ADVICE PTY LTD",
    },
    {
      AFSNumber: "501891",
      AFSName: "HAE FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "501895",
      AFSName: "RATCH ENERGY AUSTRALIA MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "501929",
      AFSName: "WEALTH PARTNERS HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "501971",
      AFSName: "RIMOR EQUITY RESEARCH PTY LTD",
    },
    {
      AFSNumber: "501994",
      AFSName: "SARTO ADVISORY PTY LTD",
    },
    {
      AFSNumber: "502080",
      AFSName: "HPS INVESTMENT PARTNERS (AUS) PTY LTD",
    },
    {
      AFSNumber: "502092",
      AFSName: "WEALTHAVEN PTY LTD",
    },
    {
      AFSNumber: "502165",
      AFSName: "MELBOURNE ANGLICAN TRUST CORPORATION",
    },
    {
      AFSNumber: "502171",
      AFSName: "C2 FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "502179",
      AFSName: "ALIRO GROUP PTY LTD",
    },
    {
      AFSNumber: "502290",
      AFSName: "NORTHERLY CAPITAL PTY LTD",
    },
    {
      AFSNumber: "502306",
      AFSName: "BOWERY CAPITAL PTY LTD",
    },
    {
      AFSNumber: "502391",
      AFSName: "MKW HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "502401",
      AFSName: "BD FINANCIAL ADVISORY PTY LTD",
    },
    {
      AFSNumber: "502430",
      AFSName: "LLA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "502479",
      AFSName: "CBRE INVESTMENT MANAGEMENT AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "502497",
      AFSName: "BG FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "502602",
      AFSName: "ARMITAGE ASSOCIATES PTY LTD",
    },
    {
      AFSNumber: "502605",
      AFSName: "SRS BROKING PTY LTD",
    },
    {
      AFSNumber: "502618",
      AFSName: "BIRCHAL FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "502623",
      AFSName: "DYNAMIC ASSET CONSULTING PTY LIMITED",
    },
    {
      AFSNumber: "502629",
      AFSName: "JSM MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "502646",
      AFSName: "HILTON GROUP PTY LTD",
    },
    {
      AFSNumber: "502700",
      AFSName: "TEAM SUPER SERVICES PTY LTD",
    },
    {
      AFSNumber: "502707",
      AFSName: "REGIS FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "502711",
      AFSName: "NAVIGATE GLOBAL PAYMENTS PTY LTD",
    },
    {
      AFSNumber: "502728",
      AFSName: "ENLIGHTENED FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "502758",
      AFSName: "LAZARUS SECURITIES PTY LTD",
    },
    {
      AFSNumber: "502759",
      AFSName: "AUSTRALIAN LIFE DEVELOPMENT PTY LTD",
    },
    {
      AFSNumber: "502770",
      AFSName: "KEYTON HOLDING PTY LIMITED",
    },
    {
      AFSNumber: "502791",
      AFSName: "IPARTNERS PTY. LTD.",
    },
    {
      AFSNumber: "502836",
      AFSName: "GEM CAPITAL FINANCIAL ADVICE PTY LTD",
    },
    {
      AFSNumber: "502934",
      AFSName: "FREEDOM WEALTH SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "502980",
      AFSName: "LANTANA PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "503085",
      AFSName: "SUPER STRATEGISTS (AFSL) PTY LTD",
    },
    {
      AFSNumber: "503087",
      AFSName: "SALA FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "503165",
      AFSName: "REUNION CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "503221",
      AFSName: "INDUSTRIA PROFESSIONAL PTY LTD",
    },
    {
      AFSNumber: "503228",
      AFSName: "HARVEST ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "503230",
      AFSName: "MX CAPITAL PTY LTD",
    },
    {
      AFSNumber: "503238",
      AFSName: "1868 CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "503243",
      AFSName: "REDHILL PROPERTY PARTNERS PTY LTD",
    },
    {
      AFSNumber: "503261",
      AFSName: "BARCLAY PEARCE CAPITAL MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "503266",
      AFSName: "SUNBIRD PORTFOLIOS PTY LTD",
    },
    {
      AFSNumber: "503322",
      AFSName: "BILLFOLDA PTY LIMITED",
    },
    {
      AFSNumber: "503365",
      AFSName: "LEFTFIELD INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "503381",
      AFSName: "VENTURECROWD PTY LTD",
    },
    {
      AFSNumber: "503397",
      AFSName: "TIY LOY CHINESE COMMUNITY INCORPORATED",
    },
    {
      AFSNumber: "503402",
      AFSName: "ELITE THOROUGHBREDS PTY LTD",
    },
    {
      AFSNumber: "503537",
      AFSName:
        "THE TRUSTEES OF THE ROMAN CATHOLIC CHURCH FOR THE DIOCESE OF LISMORE",
    },
    {
      AFSNumber: "503565",
      AFSName: "VIEW ADVISORY PTY LTD",
    },
    {
      AFSNumber: "503571",
      AFSName: "LOFTUS PEAK PTY LTD",
    },
    {
      AFSNumber: "503622",
      AFSName: "BREAKAWAY RESEARCH PTY LTD",
    },
    {
      AFSNumber: "503629",
      AFSName: "COVESTA FINANCIAL SERVICES LIMITED",
    },
    {
      AFSNumber: "503710",
      AFSName: "SHELL ENERGY AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "503726",
      AFSName: "SO INVE PTY LIMITED",
    },
    {
      AFSNumber: "503734",
      AFSName: "NATIONAL PLANNING PARTNERS PTY LTD",
    },
    {
      AFSNumber: "503737",
      AFSName: "MNM GROUP FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "503741",
      AFSName: "T. ROWE PRICE AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "503796",
      AFSName: "TYNDALL CAPITAL PTY. LTD.",
    },
    {
      AFSNumber: "503827",
      AFSName: "STIRLING ADVICE PTY LTD",
    },
    {
      AFSNumber: "503881",
      AFSName: "MONEYCLIP MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "503883",
      AFSName: "CEDAR ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "503886",
      AFSName: "KVB WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "503889",
      AFSName: "ASPIRATIONS PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "503908",
      AFSName: "HANDPAY FUND MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "503946",
      AFSName: "FORTAS INVESTMENT PTY LTD",
    },
    {
      AFSNumber: "504074",
      AFSName: "LATEVO UNDERWRITING AGENCY PTY LIMITED",
    },
    {
      AFSNumber: "504088",
      AFSName: "BERKSHIRE GLOBAL ADVISORS PTY LTD",
    },
    {
      AFSNumber: "504130",
      AFSName: "BLUE ZEBRA INSURANCE PTY LTD",
    },
    {
      AFSNumber: "504151",
      AFSName: "RYZENA INVESTMENT PTY LTD",
    },
    {
      AFSNumber: "504155",
      AFSName: "OPENINVEST LIMITED",
    },
    {
      AFSNumber: "504169",
      AFSName: "G & S FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "504182",
      AFSName: "CDFMN AFSL LIMITED",
    },
    {
      AFSNumber: "504202",
      AFSName: "CDFCF AFSL LIMITED",
    },
    {
      AFSNumber: "504204",
      AFSName: "FTI CAPITAL ADVISORS (AUSTRALIA) PTY LTD.",
    },
    {
      AFSNumber: "504206",
      AFSName: "FIREFLY FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "504220",
      AFSName: "RICHMOND PARTNERS PTY LTD",
    },
    {
      AFSNumber: "504276",
      AFSName: "SOMERSET CAPITAL FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "504318",
      AFSName: "HUNT PROSPERITY PTY LTD",
    },
    {
      AFSNumber: "504325",
      AFSName: "JP WEALTH SECURITIES PTY LTD",
    },
    {
      AFSNumber: "504332",
      AFSName: "CAPITAL GUARDIANS PTY. LTD.",
    },
    {
      AFSNumber: "504434",
      AFSName: "GENERATION ADVISERS PTY LTD",
    },
    {
      AFSNumber: "504485",
      AFSName: "FINWEALTH PTY LTD",
    },
    {
      AFSNumber: "504517",
      AFSName: "OMERS INFRASTRUCTURE AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "504537",
      AFSName: "SUSQUEHANNA ASIA TRADING PTY LTD",
    },
    {
      AFSNumber: "504577",
      AFSName: "VERTEX ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "504586",
      AFSName: "ARCHERY CAPITAL PTY LTD",
    },
    {
      AFSNumber: "504596",
      AFSName: "AUSTRALIS INVESTMENT MANAGEMENT COMPANY PTY LTD",
    },
    {
      AFSNumber: "504616",
      AFSName: "PLATO INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "504642",
      AFSName: "VANTISCO CAPITAL ADVISERS PTY LTD",
    },
    {
      AFSNumber: "504662",
      AFSName: "ANDAZ PRIVATE INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "504663",
      AFSName: "HALO FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "504681",
      AFSName: "ANNEX WEALTH ADVISORY PTY LTD",
    },
    {
      AFSNumber: "504712",
      AFSName: "JEFFERIES (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "504773",
      AFSName: "MIQ PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "504795",
      AFSName: "TRUEBELL CAPITAL PTY LTD",
    },
    {
      AFSNumber: "504803",
      AFSName: "PAYONEER AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "504804",
      AFSName: "GOOD RETURN LIMITED",
    },
    {
      AFSNumber: "504818",
      AFSName: "QUANTACO SECURITIES PTY LTD",
    },
    {
      AFSNumber: "504902",
      AFSName: "MAHER SECURITIES PTY LTD",
    },
    {
      AFSNumber: "505077",
      AFSName: "BEEMARKETS PTY LTD",
    },
    {
      AFSNumber: "505118",
      AFSName: "CURRENC PTY LTD",
    },
    {
      AFSNumber: "505332",
      AFSName: "BMYG CAPITAL PTY LTD",
    },
    {
      AFSNumber: "505375",
      AFSName: "DYNAMIC PAYMENT PTY LTD",
    },
    {
      AFSNumber: "505437",
      AFSName: "EQUITY PLAN SERVICES PTY LTD",
    },
    {
      AFSNumber: "505578",
      AFSName: "T.P.R.E. LTD",
    },
    {
      AFSNumber: "505613",
      AFSName: "WATZDORF NOMINEES PTY LTD",
    },
    {
      AFSNumber: "505615",
      AFSName: "ETHICAL PLANNERS PTY LTD",
    },
    {
      AFSNumber: "505699",
      AFSName: "LOGOS INVESTMENT MANAGER PTY LIMITED",
    },
    {
      AFSNumber: "505704",
      AFSName: "SUMO FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "505824",
      AFSName: "EQUITABLE INVESTORS PTY LTD",
    },
    {
      AFSNumber: "505929",
      AFSName: "AMPLUS GLOBAL PTY LTD",
    },
    {
      AFSNumber: "505932",
      AFSName: "MA REDCAPE HOTEL FUND RE LIMITED",
    },
    {
      AFSNumber: "505959",
      AFSName: "APRIL INVEST PTY LTD",
    },
    {
      AFSNumber: "506003",
      AFSName: "GRIOLI AND COMPANY PTY LTD",
    },
    {
      AFSNumber: "506053",
      AFSName: "FORTY SEVEN GROUP PTY LTD",
    },
    {
      AFSNumber: "506127",
      AFSName: "MILLPOINT INSURANCE PTY LTD",
    },
    {
      AFSNumber: "506199",
      AFSName: "MARKET ST FINANCIAL ADVISORY GROUP PTY LIMITED",
    },
    {
      AFSNumber: "506202",
      AFSName: "EXCELSIUS ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "506255",
      AFSName: "OAK CAPITAL WHOLESALE FUND PTY LTD",
    },
    {
      AFSNumber: "506302",
      AFSName: "EDISON PARTNERS PTY LTD",
    },
    {
      AFSNumber: "506314",
      AFSName: "FB ADVICE PTY LTD",
    },
    {
      AFSNumber: "506315",
      AFSName: "CONTRARIUS INVESTMENT ADVISORY PTY LIMITED",
    },
    {
      AFSNumber: "506347",
      AFSName: "GALLERY SECURITIES PTY LTD",
    },
    {
      AFSNumber: "506378",
      AFSName: "SURE INSURANCE PTY LTD",
    },
    {
      AFSNumber: "506390",
      AFSName: "WEALTH FACTOR PTY LTD",
    },
    {
      AFSNumber: "506425",
      AFSName: "PROFUSION ADVISORY GROUP PTY LTD",
    },
    {
      AFSNumber: "506547",
      AFSName: "BYRONS CORPORATE FINANCE PTY LTD",
    },
    {
      AFSNumber: "506557",
      AFSName: "MEDICAL FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "506558",
      AFSName: "FUTURE INSURANCE GROUP INTERNATIONAL PTY LTD",
    },
    {
      AFSNumber: "506819",
      AFSName: "AWFP GROUP PTY LTD",
    },
    {
      AFSNumber: "506938",
      AFSName: "EOS UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "506982",
      AFSName: "OSCAR OLIVER CAPITAL LTD",
    },
    {
      AFSNumber: "507070",
      AFSName: "QVG CAPITAL PTY LTD",
    },
    {
      AFSNumber: "507074",
      AFSName: "NORTHSTANDARD LIMITED",
    },
    {
      AFSNumber: "507130",
      AFSName: "LIVING ROOM OF SATOSHI PTY LTD",
    },
    {
      AFSNumber: "507143",
      AFSName: "PETCOVER AUST PTY LTD",
    },
    {
      AFSNumber: "507144",
      AFSName: "CONNEXIAN ONE PTY LIMITED",
    },
    {
      AFSNumber: "507160",
      AFSName: "HAMILTON MORELLO WEALTH SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "507216",
      AFSName: "FIRST HEDGE PTY LTD",
    },
    {
      AFSNumber: "507281",
      AFSName: "AORIS INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "507353",
      AFSName: "REVOLUTION ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "507423",
      AFSName: "AFTA PTY LTD",
    },
    {
      AFSNumber: "507452",
      AFSName: "FNZ CUSTODIANS (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "507465",
      AFSName: "TRICHOTOMY CONSULTING PTY LTD",
    },
    {
      AFSNumber: "507506",
      AFSName: "BYFIELDS ADVICE PTY LTD",
    },
    {
      AFSNumber: "507614",
      AFSName: "QUINTET PARTNERS PTY LTD",
    },
    {
      AFSNumber: "507617",
      AFSName: "BGH CAPITAL CUSTODY SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "507622",
      AFSName: "ORBE SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "507650",
      AFSName: "ORANA MANAGED INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "507652",
      AFSName: "WYBENGA FINANCIAL PTY LIMITED",
    },
    {
      AFSNumber: "507668",
      AFSName: "CAVENDISH ASSOCIATES PTY LTD",
    },
    {
      AFSNumber: "507683",
      AFSName: "QUADRANT WEALTH PTY LTD",
    },
    {
      AFSNumber: "507741",
      AFSName: "ELEUTHERA INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "507753",
      AFSName: "GAUGE LENDING PTY LTD",
    },
    {
      AFSNumber: "507849",
      AFSName: "MANDALA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "507853",
      AFSName: "BRIX SECURITIES PTY LTD",
    },
    {
      AFSNumber: "507865",
      AFSName: "ADDITION WEALTH PTY LTD",
    },
    {
      AFSNumber: "507867",
      AFSName: "SWARMER PTY LTD",
    },
    {
      AFSNumber: "507890",
      AFSName: "DIRECT UNDERWRITING AGENCY PTY LTD",
    },
    {
      AFSNumber: "508000",
      AFSName: "RESPECT FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "508008",
      AFSName: "TRG AFSL PTY LTD",
    },
    {
      AFSNumber: "508011",
      AFSName: "BOUTIQUE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "508171",
      AFSName: "IMPACT AGRICULTURE PTY LTD",
    },
    {
      AFSNumber: "508215",
      AFSName: "STRATFUND LIMITED",
    },
    {
      AFSNumber: "508259",
      AFSName: "IRONARB CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "508290",
      AFSName: "GBA KOTKIS PTY LTD",
    },
    {
      AFSNumber: "508309",
      AFSName: "SINGX AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "508424",
      AFSName: "FOUNDATION FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "508485",
      AFSName: "CHANNEL FINANCE PTY LTD",
    },
    {
      AFSNumber: "508559",
      AFSName: "MY AFSL PTY LTD",
    },
    {
      AFSNumber: "508564",
      AFSName: "ASPECT ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "508614",
      AFSName: "SIA FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "508677",
      AFSName: "MGD CAPITAL ADVISORS PTY LTD",
    },
    {
      AFSNumber: "508686",
      AFSName: "CHINA EVERBRIGHT BANK CO.  LTD.",
    },
    {
      AFSNumber: "508696",
      AFSName: "W2 WEALTH PTY LTD",
    },
    {
      AFSNumber: "508731",
      AFSName: "IP2IPO AUSTRALIA MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "508773",
      AFSName: "WEALTH PARTNERS WA PTY LTD",
    },
    {
      AFSNumber: "508775",
      AFSName: "PRO VISIONARY PTY LTD",
    },
    {
      AFSNumber: "508797",
      AFSName: "ODYSSEY SPECIALIST GROUP PTY LTD",
    },
    {
      AFSNumber: "508806",
      AFSName: "MY FORTRESS PTY LTD",
    },
    {
      AFSNumber: "508864",
      AFSName: "OUSON CAPITAL PTY. LTD.",
    },
    {
      AFSNumber: "508867",
      AFSName: "TASTYTRADE AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "508873",
      AFSName: "GARDA CAPITAL RE LIMITED",
    },
    {
      AFSNumber: "508934",
      AFSName: "LUGARNO PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "508998",
      AFSName: "PRIORITY WEALTH ADVISERS PTY LTD",
    },
    {
      AFSNumber: "509011",
      AFSName: "FORBES AFSL PTY LTD",
    },
    {
      AFSNumber: "509026",
      AFSName: "SHINEWING AUSTRALIA SECURITIES PTY LTD",
    },
    {
      AFSNumber: "509033",
      AFSName: "AVANTI FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "509114",
      AFSName: "CROWDFUNDING AFSL PTY LTD",
    },
    {
      AFSNumber: "509157",
      AFSName: "HC FINANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "509196",
      AFSName: "PINNACLE FP PTY LTD",
    },
    {
      AFSNumber: "509225",
      AFSName: "CARTER BAR SECURITIES PTY LTD",
    },
    {
      AFSNumber: "509230",
      AFSName: "EXECUTIVE WEALTH SOLUTIONS PTY LIMITED",
    },
    {
      AFSNumber: "509274",
      AFSName: "JEPS MGT PTY LTD",
    },
    {
      AFSNumber: "509285",
      AFSName: "PARTNERS GROUP PRIVATE MARKETS (AUSTRALIA) PTY. LTD.",
    },
    {
      AFSNumber: "509305",
      AFSName: "WALKER LANE PTY LTD",
    },
    {
      AFSNumber: "509319",
      AFSName: "DIRECT FX (AUSTRALIA) PTY LIMITED",
    },
    {
      AFSNumber: "509322",
      AFSName: "GOLDEN GROUP INTERNATIONAL CONSULTING PTY LTD",
    },
    {
      AFSNumber: "509400",
      AFSName: "PAYVANTAGE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "509404",
      AFSName: "ACUTE FINANCIAL SERVICES LICENCE PTY LTD",
    },
    {
      AFSNumber: "509434",
      AFSName: "UNIQUE GROUP BROKER SERVICES PTY LTD",
    },
    {
      AFSNumber: "509444",
      AFSName: "EMC FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "509454",
      AFSName: "PK INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "509458",
      AFSName: "CLIENTS 1ST AUSTRALIAN FINANCIAL SERVICES GROUP PTY LTD",
    },
    {
      AFSNumber: "509481",
      AFSName: "YARD FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "509493",
      AFSName: "SFDS PTY LTD",
    },
    {
      AFSNumber: "509506",
      AFSName: "FIIG INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "509519",
      AFSName: "ICT WEALTH PTY LTD",
    },
    {
      AFSNumber: "509529",
      AFSName: "SOCIAL IT GROUP PTY LTD",
    },
    {
      AFSNumber: "509561",
      AFSName: "MANNING ASSET MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "509563",
      AFSName: "WEALTH INITIATIVES PTY LTD",
    },
    {
      AFSNumber: "509564",
      AFSName: "EGU FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "509574",
      AFSName: "WHITMORE PROPERTY PTY LTD",
    },
    {
      AFSNumber: "509578",
      AFSName: "INNOVA INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "509609",
      AFSName: "PREMIER COMPLIANCE SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "509628",
      AFSName: "WACC PTY LTD",
    },
    {
      AFSNumber: "509631",
      AFSName: "ACOVA CAPITAL PTY. LTD.",
    },
    {
      AFSNumber: "509635",
      AFSName: "SENDFX LIMITED",
    },
    {
      AFSNumber: "509642",
      AFSName: "CORPORATE PREPAID CARDS PTY LTD",
    },
    {
      AFSNumber: "509648",
      AFSName: "CY FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "509650",
      AFSName: "CLEAN POWER ENERGY PTY LTD",
    },
    {
      AFSNumber: "509652",
      AFSName: "LEAVEN CAPITAL PTY LTD",
    },
    {
      AFSNumber: "509665",
      AFSName: "VALUEPOINT ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "509709",
      AFSName: "MARKET LANE INSURANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "509831",
      AFSName: "STRIVE FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "509930",
      AFSName: "FINANCIAL KEYS ADVICE PTY LTD",
    },
    {
      AFSNumber: "509932",
      AFSName: "DHF INVESTMENT MANAGERS PTY LTD",
    },
    {
      AFSNumber: "510066",
      AFSName: "RAIGLIS PTY LTD",
    },
    {
      AFSNumber: "510086",
      AFSName: "BISAN FUND MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "510097",
      AFSName: "RED LEAF SECURITIES PTY LIMITED",
    },
    {
      AFSNumber: "510110",
      AFSName: "EQUINOX FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "510116",
      AFSName: "TRADE VIEW INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "510118",
      AFSName: "HARVIS CAPITAL PTY LTD",
    },
    {
      AFSNumber: "510131",
      AFSName: "SYNCRONI PTY LTD",
    },
    {
      AFSNumber: "510185",
      AFSName: "AUSTRALASIA UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "510222",
      AFSName: "RESOLUTE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "510226",
      AFSName: "SOURCE FUNDING PTY LTD",
    },
    {
      AFSNumber: "510237",
      AFSName: "MY PRACTICAL SUPPORT PTY LTD",
    },
    {
      AFSNumber: "510252",
      AFSName: "JY FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "510315",
      AFSName: "AUSTRALIAN STANDFIRST FUNDS MANAGEMENT LTD.",
    },
    {
      AFSNumber: "510440",
      AFSName: "KEYINVEST MANAGED INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "510570",
      AFSName: "DELTAPEER FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "510646",
      AFSName: "OTI MANAGEMENT PTY. LTD.",
    },
    {
      AFSNumber: "510677",
      AFSName: "COSCA LICENSEE PTY LTD",
    },
    {
      AFSNumber: "510682",
      AFSName: "MODUS CAPITAL AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "510685",
      AFSName: "DEXUS RE LIMITED",
    },
    {
      AFSNumber: "510700",
      AFSName: "ARRUMAR PRIVATE PTY LTD",
    },
    {
      AFSNumber: "510708",
      AFSName: "GLEN ELGIN INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "510735",
      AFSName: "BRINDABELLA INVESTMENT GROUP PTY LTD",
    },
    {
      AFSNumber: "510793",
      AFSName: "DJT WEALTH PTY LTD",
    },
    {
      AFSNumber: "510805",
      AFSName: "ALEX BANK PTY LTD",
    },
    {
      AFSNumber: "510865",
      AFSName: "RSI INTERNATIONAL PTY LTD",
    },
    {
      AFSNumber: "510873",
      AFSName: "IMAGINEERING FS PTY LTD",
    },
    {
      AFSNumber: "510928",
      AFSName: "INTEGRAL WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "511051",
      AFSName: "IFS PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "511061",
      AFSName: "MONT PARTNERS PTY LTD",
    },
    {
      AFSNumber: "511088",
      AFSName: "SARONA ASSET MANAGEMENT AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "511101",
      AFSName: "AXIAL WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "511188",
      AFSName: "MIDSHORE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "511218",
      AFSName: "OAKTREE CAPITAL (AUSTRALIA) PTY LIMITED",
    },
    {
      AFSNumber: "511226",
      AFSName: "QUEST PAYMENT SYSTEMS HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "511239",
      AFSName: "BEYOND SECURITIES PTY LTD",
    },
    {
      AFSNumber: "511269",
      AFSName: "CARRINGTON FINANCIAL HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "511301",
      AFSName: "FORTITUDE WEALTH SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "511363",
      AFSName: "COUNTRYWIDE INSURANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "511377",
      AFSName: "YOUR FINANCIAL GUIDE PTY LTD",
    },
    {
      AFSNumber: "511382",
      AFSName: "BRAND FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "511401",
      AFSName: "QUILLA CONSULTING PTY LTD",
    },
    {
      AFSNumber: "511408",
      AFSName: "PWK PRIVATE WEALTH AFSL PTY LTD",
    },
    {
      AFSNumber: "511427",
      AFSName: "COLLECTIVE INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "511440",
      AFSName: "LUMIERE PRIVATE ADVISORY PTY LTD",
    },
    {
      AFSNumber: "511447",
      AFSName: "4 PILLARS ADVISER SERVICES PTY LTD",
    },
    {
      AFSNumber: "511532",
      AFSName: "ESENCIA WEALTH PARTNERS PTY LTD",
    },
    {
      AFSNumber: "511584",
      AFSName: "HAITONG INTERNATIONAL SECURITIES (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "511639",
      AFSName: "APERTURE AG PTY LTD",
    },
    {
      AFSNumber: "511640",
      AFSName: "PRASIDIUM PTY. LTD.",
    },
    {
      AFSNumber: "511660",
      AFSName: "WELLINGTON UNDERWRITING AGENCIES PTY LTD",
    },
    {
      AFSNumber: "511679",
      AFSName: "AUSTRALIAN ADVISOR COLLECTIVE PTY LTD",
    },
    {
      AFSNumber: "511738",
      AFSName: "GAMEPLAY CAPITAL PTY LTD",
    },
    {
      AFSNumber: "511759",
      AFSName: "RESONANT ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "511772",
      AFSName: "CNHICA SECURITISATION MANAGER PTY LTD",
    },
    {
      AFSNumber: "511783",
      AFSName: "STERLING PRIVATE GROUP PTY LTD",
    },
    {
      AFSNumber: "511851",
      AFSName: "MWM CAPITAL PTY LTD",
    },
    {
      AFSNumber: "511863",
      AFSName: "CHO, YOUN ",
    },
    {
      AFSNumber: "511867",
      AFSName: "AKUNA CAPITAL AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "511886",
      AFSName: "MATLEBEL PTY LTD",
    },
    {
      AFSNumber: "511904",
      AFSName: "URD SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "511917",
      AFSName: "PRECISION UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "511956",
      AFSName: "SOCIETE GENERALE",
    },
    {
      AFSNumber: "511972",
      AFSName: "MAXIM PRIVATE CLIENTS PTY LIMITED",
    },
    {
      AFSNumber: "512023",
      AFSName: "ASTUTE PLANNING SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "512044",
      AFSName: "NEXA ACCOUNTING & BUSINESS ADVISORY PTY LTD",
    },
    {
      AFSNumber: "512059",
      AFSName: "AGENTIA PTY LTD",
    },
    {
      AFSNumber: "512062",
      AFSName: "TIP WEALTH RE NO.1 LTD",
    },
    {
      AFSNumber: "512111",
      AFSName: "FIFTH AVENUE FINANCE GROUP (WA) PTY LTD",
    },
    {
      AFSNumber: "512180",
      AFSName: "LAMMERMOOR FP PTY LTD",
    },
    {
      AFSNumber: "512210",
      AFSName: "AWHINA FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "512270",
      AFSName: "BOAB CAPITAL GROUP PTY. LTD.",
    },
    {
      AFSNumber: "512276",
      AFSName: "IDSINVEST LICENSEE PTY LTD",
    },
    {
      AFSNumber: "512291",
      AFSName: "HYWOOD PARTNERS PTY LTD",
    },
    {
      AFSNumber: "512372",
      AFSName: "TUNNY, ANDREW DOMINIC",
    },
    {
      AFSNumber: "512401",
      AFSName: "AUSTRALIAN ADVISER GROUP PTY LTD",
    },
    {
      AFSNumber: "512433",
      AFSName: "INDEPENDENT WEALTH SERVICES PTY LTD",
    },
    {
      AFSNumber: "512465",
      AFSName: "BARBACANE ADVISORS PTY LTD",
    },
    {
      AFSNumber: "512468",
      AFSName: "P G CAMERON PTY. LTD.",
    },
    {
      AFSNumber: "512495",
      AFSName: "HALL CHADWICK CONSULTANTS PTY LTD",
    },
    {
      AFSNumber: "512507",
      AFSName: "GARNAUT PRIVATE CLIENTS PTY LTD",
    },
    {
      AFSNumber: "512509",
      AFSName: "STEP UP FINANCIAL GROUP PTY. LTD.",
    },
    {
      AFSNumber: "512529",
      AFSName: "JP EQUITY PARTNERS PTY LTD",
    },
    {
      AFSNumber: "512536",
      AFSName: "FSOFT PTY LTD",
    },
    {
      AFSNumber: "512550",
      AFSName: "COBALT ADVISERS PTY LTD",
    },
    {
      AFSNumber: "512639",
      AFSName: "FOR LIFE FINANCIAL SOLUTIONS PTY. LTD.",
    },
    {
      AFSNumber: "512670",
      AFSName: "WELLADVISED ASSOCIATES PTY LTD",
    },
    {
      AFSNumber: "512730",
      AFSName: "PRFP PTY LTD",
    },
    {
      AFSNumber: "512840",
      AFSName: "BRELA GROUP PTY LIMITED",
    },
    {
      AFSNumber: "512864",
      AFSName: "ZEBRA FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "512898",
      AFSName: "MOODY KIDDELL & PARTNERS (INSURANCE) PTY LIMITED",
    },
    {
      AFSNumber: "512904",
      AFSName: "CAPITAL BRIDGING FINANCE PTY LTD",
    },
    {
      AFSNumber: "512986",
      AFSName: "YUNS ADVISORY PTY LTD",
    },
    {
      AFSNumber: "512993",
      AFSName: "TEAM GOODIN PTY LTD",
    },
    {
      AFSNumber: "513012",
      AFSName: "COEUS FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "513013",
      AFSName: "BRIDGE PRIVATE WEALTH AFSL PTY LTD",
    },
    {
      AFSNumber: "513052",
      AFSName: "ADVISORY CIRCLE PTY LTD",
    },
    {
      AFSNumber: "513055",
      AFSName: "CONFOY INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "513068",
      AFSName: "OAKVIEW FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "513086",
      AFSName: "MAPLE LEAF MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "513100",
      AFSName: "NEMEAN GROUP PTY LTD",
    },
    {
      AFSNumber: "513101",
      AFSName: "FIRSTUNITY FINANCIAL SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "513142",
      AFSName: "GTG ADVICE PTY LTD",
    },
    {
      AFSNumber: "513200",
      AFSName: "SEN CAPITAL PTY LTD",
    },
    {
      AFSNumber: "513209",
      AFSName: "PARAKEET TRADING PTY LTD",
    },
    {
      AFSNumber: "513220",
      AFSName: "LION AND SHIELD FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "513235",
      AFSName: "PLENARY ORIGINATION PTY LTD",
    },
    {
      AFSNumber: "513239",
      AFSName: "CHURCHILL TRUSTEES PTY LTD",
    },
    {
      AFSNumber: "513299",
      AFSName: "GLOBAL BLUE AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "513308",
      AFSName: "HALCYON WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "513311",
      AFSName: "EVP MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "513332",
      AFSName: "FIRMUS INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "513393",
      AFSName: "CAPITAL COM AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "513532",
      AFSName: "JANE CLARK PTY LTD",
    },
    {
      AFSNumber: "513547",
      AFSName: "ARAG SERVICES AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "513615",
      AFSName: "WEALTH SIMPLICITY GROUP PTY LTD",
    },
    {
      AFSNumber: "513625",
      AFSName: "HMC CAPITAL FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "513647",
      AFSName: "CARDINAL MARK LICENSEE PTY LTD",
    },
    {
      AFSNumber: "513685",
      AFSName: "MARKUAN MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "513690",
      AFSName: "ADELAIDE WEALTH MANAGEMENT (AUST) PTY LTD",
    },
    {
      AFSNumber: "513693",
      AFSName: "WMOA FUND MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "513743",
      AFSName: "PINNACLE DEALER SERVICES PTY LTD",
    },
    {
      AFSNumber: "513745",
      AFSName: "LISTEDRESERVE PTY LIMITED",
    },
    {
      AFSNumber: "513758",
      AFSName: "GTSE CAPITAL GROUP PTY LTD",
    },
    {
      AFSNumber: "513762",
      AFSName: "RIVVA PTY. LTD.",
    },
    {
      AFSNumber: "513763",
      AFSName: "KNOX WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "513764",
      AFSName: "WISE AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "513856",
      AFSName: "DENNING INVESTMENT PARTNERS PTY LTD",
    },
    {
      AFSNumber: "513862",
      AFSName: "RAINBOW COAST INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "513895",
      AFSName: "PROFESSIONAL RETIREMENT ADVICE PTY LIMITED",
    },
    {
      AFSNumber: "513929",
      AFSName: "SQUARE AU PTY LTD",
    },
    {
      AFSNumber: "513974",
      AFSName: "SALT MARINE RISKS PTY LIMITED",
    },
    {
      AFSNumber: "513984",
      AFSName: "PAM FINANCE PTY LIMITED",
    },
    {
      AFSNumber: "514002",
      AFSName: "OMAKAPITAL PTY LTD",
    },
    {
      AFSNumber: "514021",
      AFSName: "AVITZ FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "514038",
      AFSName: "EKO FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "514063",
      AFSName: "TYJC PTY LTD",
    },
    {
      AFSNumber: "514156",
      AFSName: "A DE LIBASIC PTY LTD",
    },
    {
      AFSNumber: "514164",
      AFSName: "GLOBAL PACIFIC SOLUTIONS GROUP PTY LTD",
    },
    {
      AFSNumber: "514171",
      AFSName: "BRIARS FUNDS MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "514174",
      AFSName: "KINGSTON PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "514202",
      AFSName: "MAVEN FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "514279",
      AFSName: "ON POINT WEALTH SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "514281",
      AFSName: "FINPLAN ADVICE PTY LTD",
    },
    {
      AFSNumber: "514345",
      AFSName: "INTERNATIONAL INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "514357",
      AFSName: "HIGH STREET WEALTH PTY LTD",
    },
    {
      AFSNumber: "514360",
      AFSName: "CACHE INVESTMENT MANAGEMENT LTD",
    },
    {
      AFSNumber: "514394",
      AFSName: "SPARTAN CAPITAL MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "514425",
      AFSName: "FOCUS MARKETS PTY LTD",
    },
    {
      AFSNumber: "514437",
      AFSName: "WEALTH EFFECT ADVISORY PTY LTD",
    },
    {
      AFSNumber: "514449",
      AFSName: "CIRE SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "514452",
      AFSName: "MULTIFI AU PTY LTD",
    },
    {
      AFSNumber: "514484",
      AFSName: "RAM PROPERTY FUNDS MANAGEMENT LTD",
    },
    {
      AFSNumber: "514528",
      AFSName: "CYGNET FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "514585",
      AFSName: "SWINBOURNE FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "514612",
      AFSName: "TROPHY ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "514654",
      AFSName: "HABIT FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "514682",
      AFSName: "AS1 LV PTY LTD",
    },
    {
      AFSNumber: "514836",
      AFSName: "CEDAR PACIFIC PTY LTD",
    },
    {
      AFSNumber: "514841",
      AFSName: "RIGHTWAY FINANCIAL ADVICE PTY LTD",
    },
    {
      AFSNumber: "514843",
      AFSName: "INTERWEST FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "514850",
      AFSName: "DKG GROUP INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "514851",
      AFSName: "TRANSFERMATE PTY LIMITED",
    },
    {
      AFSNumber: "514855",
      AFSName: "KNIGHTSBRIDGE INSURANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "514857",
      AFSName: "BAPTIST INSURANCE SERVICES LTD",
    },
    {
      AFSNumber: "514897",
      AFSName: "SCOTT WINTON NOMINEES PTY LTD",
    },
    {
      AFSNumber: "514905",
      AFSName: "IVY LEAGUE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "514908",
      AFSName: "GUIDE SURE PTY LTD",
    },
    {
      AFSNumber: "514910",
      AFSName: "DIMENSION ADVICE PTY LTD",
    },
    {
      AFSNumber: "514919",
      AFSName: "LECULIER FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "515106",
      AFSName: "IG AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "515107",
      AFSName: "SWM (AUST) PTY LTD",
    },
    {
      AFSNumber: "515139",
      AFSName: "JOHN CAMERON FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "515203",
      AFSName: "RDL.FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "515204",
      AFSName: "TCM MACRO PTY LTD",
    },
    {
      AFSNumber: "515251",
      AFSName: "PITCHER PARTNERS PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "515270",
      AFSName: "DIGITAL WALLET PTY LTD",
    },
    {
      AFSNumber: "515459",
      AFSName: "HAY LIMITED",
    },
    {
      AFSNumber: "515518",
      AFSName: "HARBOUR FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "515613",
      AFSName: "STANTON ROAD PARTNERS PTY LTD",
    },
    {
      AFSNumber: "515631",
      AFSName: "SWILKEN CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "515656",
      AFSName: "IBOA VENTURES PTY LTD",
    },
    {
      AFSNumber: "515673",
      AFSName: "GQG PARTNERS (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "515674",
      AFSName: "PILLARVIEW INVEST PTY LTD",
    },
    {
      AFSNumber: "515733",
      AFSName: "PKF WEALTH TMW PTY LTD",
    },
    {
      AFSNumber: "515738",
      AFSName: "FENWICKE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "515748",
      AFSName: "WGFC PTY LTD",
    },
    {
      AFSNumber: "515762",
      AFSName: "INFINITY CAPITAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "515795",
      AFSName: "EFG ADVICE AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "515796",
      AFSName: "NUCLEUS ADVICE PTY LTD",
    },
    {
      AFSNumber: "515804",
      AFSName: "KURRABA ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "515838",
      AFSName: "SOUTH POLE AUSTRALIA FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "515843",
      AFSName: "SAVINGS.COM.AU PTY LTD",
    },
    {
      AFSNumber: "515859",
      AFSName: "HESPERIA FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "515865",
      AFSName: "CENTURY ADVISORY SERVICES PTY LTD",
    },
    {
      AFSNumber: "515872",
      AFSName: "1851 CAPITAL PTY LTD",
    },
    {
      AFSNumber: "515887",
      AFSName: "CENTENNIAL ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "515926",
      AFSName: "IN1BANK LTD",
    },
    {
      AFSNumber: "515936",
      AFSName: "BWP ADVISORY PTY LTD",
    },
    {
      AFSNumber: "515946",
      AFSName: "ZENITH PLANNING PTY LTD",
    },
    {
      AFSNumber: "515947",
      AFSName: "INVESTORPLAN PTY LTD",
    },
    {
      AFSNumber: "515965",
      AFSName: "LONEY BELL CAPITAL PTY LTD",
    },
    {
      AFSNumber: "515982",
      AFSName: "SPENCER FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "516081",
      AFSName: "ECLIPSE INSURANCE PTY LIMITED",
    },
    {
      AFSNumber: "516082",
      AFSName: "HKS GROUP LICENSEE PTY LTD",
    },
    {
      AFSNumber: "516102",
      AFSName: "TRILOGY & CO PTY LTD",
    },
    {
      AFSNumber: "516107",
      AFSName: "CONCORD LICENSEE SERVICES PTY LTD",
    },
    {
      AFSNumber: "516127",
      AFSName: "TT ADVISORS PTY LTD",
    },
    {
      AFSNumber: "516137",
      AFSName: "CONVERGENCE WEALTH HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "516163",
      AFSName: "MONEY OPTIONS PTY LTD",
    },
    {
      AFSNumber: "516197",
      AFSName: "SIEHAY PTY LTD",
    },
    {
      AFSNumber: "516203",
      AFSName: "PRINCIPLE FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "516246",
      AFSName: "VINALYTICS AU PTY LTD",
    },
    {
      AFSNumber: "516271",
      AFSName: "NEWSURE INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "516311",
      AFSName: "JK MENZIES PTY LTD",
    },
    {
      AFSNumber: "516313",
      AFSName: "GENCAP PTY LTD",
    },
    {
      AFSNumber: "516325",
      AFSName: "AVANA FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "516350",
      AFSName: "CARPEESH PTY LTD",
    },
    {
      AFSNumber: "516358",
      AFSName: "JEMM WEALTH ADVISERS PTY LTD",
    },
    {
      AFSNumber: "516376",
      AFSName: "ALTITUDE WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "516413",
      AFSName: "PITCHER PARTNERS SYDNEY CORPORATE FINANCE PTY LTD",
    },
    {
      AFSNumber: "516420",
      AFSName: "ACTON ADVISORY PTY LTD",
    },
    {
      AFSNumber: "516435",
      AFSName: "ENDURE WEALTH PTY LTD",
    },
    {
      AFSNumber: "516442",
      AFSName: "HANWHA ENERGY RETAIL AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "516488",
      AFSName: "COMPASS GRAIN PTY LTD",
    },
    {
      AFSNumber: "516518",
      AFSName: "SECURED WEALTH ADVICE PTY LTD",
    },
    {
      AFSNumber: "516528",
      AFSName: "PHRONIMOS PTY LTD",
    },
    {
      AFSNumber: "516550",
      AFSName: "ADYEN AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "516560",
      AFSName: "FEDERATION ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "516594",
      AFSName: "NEWLINE AUSTRALIA INSURANCE PTY. LTD.",
    },
    {
      AFSNumber: "516624",
      AFSName: "COTHAM ADVISORY PTY LTD",
    },
    {
      AFSNumber: "516629",
      AFSName: "FORBES GRAINGER FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "516642",
      AFSName: "KDM FINANCIAL AND ESTATE PLANNING PTY LTD",
    },
    {
      AFSNumber: "516646",
      AFSName: "AVC ENTERPRISES INTERNATIONAL PTY LTD",
    },
    {
      AFSNumber: "516652",
      AFSName: "JFP ADVISORY PTY LTD",
    },
    {
      AFSNumber: "516656",
      AFSName: "ARVENSYS GROUP INVESTMENT PTY LTD",
    },
    {
      AFSNumber: "516657",
      AFSName: "WAY FORWARD DEBT SOLUTIONS LIMITED",
    },
    {
      AFSNumber: "516672",
      AFSName: "HORDERN WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "516673",
      AFSName: "SCANCORP PTY LTD",
    },
    {
      AFSNumber: "516704",
      AFSName: "KELLY PARTNERS PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "516707",
      AFSName: "ENERGY LOCALS PTY LTD",
    },
    {
      AFSNumber: "516708",
      AFSName: "COLLECTIVE CAPITAL INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "516751",
      AFSName: "EIGER CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "516752",
      AFSName: "CLARKE ADVISORY GROUP PTY LTD",
    },
    {
      AFSNumber: "516821",
      AFSName: "FIRETRAIL INVESTMENTS PTY LIMITED",
    },
    {
      AFSNumber: "516834",
      AFSName: "LAM, ESTHER HING",
    },
    {
      AFSNumber: "516835",
      AFSName: "JAN24 INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "516934",
      AFSName: "BARRACK BROKING PTY LTD",
    },
    {
      AFSNumber: "516941",
      AFSName: "CT GROUP ADVISORY SERVICES PTY LTD",
    },
    {
      AFSNumber: "516942",
      AFSName: "MONTAKA GLOBAL PTY LTD",
    },
    {
      AFSNumber: "516954",
      AFSName: "NORTH HARBOUR PARTNERS SERVICES PTY LTD",
    },
    {
      AFSNumber: "517061",
      AFSName: "FINANCIAL ADVISER NETWORK PTY LTD",
    },
    {
      AFSNumber: "517083",
      AFSName: "PIER 12 PTY LTD",
    },
    {
      AFSNumber: "517131",
      AFSName: "OPULEN FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "517156",
      AFSName: "TATHRA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "517199",
      AFSName: "VP CAPITAL PTY LTD",
    },
    {
      AFSNumber: "517210",
      AFSName: "HALPIN WEALTH PARTNERS PTY LTD",
    },
    {
      AFSNumber: "517218",
      AFSName: "CPG RM PTY LTD",
    },
    {
      AFSNumber: "517246",
      AFSName: "MAHE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "517453",
      AFSName: "SKYPAC FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "517504",
      AFSName: "GWP FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "517546",
      AFSName: "LINK PRIVATE PTY LTD",
    },
    {
      AFSNumber: "517589",
      AFSName: "REVOLUT PAYMENTS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "517593",
      AFSName: "WEALTHPOOL ADVISERS PTY LTD",
    },
    {
      AFSNumber: "517629",
      AFSName: "REALSIDE ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "517661",
      AFSName: "HARVEY MADISON CAPITAL PTY LTD",
    },
    {
      AFSNumber: "517686",
      AFSName: "HEJAZ FINANCIAL ADVISERS PTY LTD",
    },
    {
      AFSNumber: "517694",
      AFSName: "ECON FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "517703",
      AFSName: "AUTOMIC MARKETS PTY LTD",
    },
    {
      AFSNumber: "517713",
      AFSName: "JW CAPITAL ADVISORS PTY LTD",
    },
    {
      AFSNumber: "517755",
      AFSName: "OURCROWD AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "517759",
      AFSName: "ECLIPSE LICENSEE PTY LTD",
    },
    {
      AFSNumber: "517775",
      AFSName: "XENON UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "517790",
      AFSName: "BOLD TRADING PTY LIMITED",
    },
    {
      AFSNumber: "517824",
      AFSName: "BLINC FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "517879",
      AFSName: "EIKON FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "517893",
      AFSName: "CLIFFBROOK CAPITAL FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "517901",
      AFSName: "INSURED CREATIVITY PTY LTD",
    },
    {
      AFSNumber: "517935",
      AFSName: "AITKEN MOUNT CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "517944",
      AFSName: "PLUTUS INDEPENDENT ADVISORS PTY LTD",
    },
    {
      AFSNumber: "517945",
      AFSName: "TREND WEALTH PTY LTD",
    },
    {
      AFSNumber: "517950",
      AFSName: "FIRESTONE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "517955",
      AFSName: "ADVICE LINKS PTY LTD",
    },
    {
      AFSNumber: "518031",
      AFSName: "POINT CAPITAL GROUP PTY LTD",
    },
    {
      AFSNumber: "518039",
      AFSName: "HALL CAPITAL FINANCE PTY LTD",
    },
    {
      AFSNumber: "518088",
      AFSName: "GREVILLEA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "518138",
      AFSName: "HERITAGE CAPITAL GROUP PTY LTD",
    },
    {
      AFSNumber: "518159",
      AFSName: "SUPERB CAR CARE CLUB PTY LTD",
    },
    {
      AFSNumber: "518168",
      AFSName: "MCFA PTY LTD",
    },
    {
      AFSNumber: "518171",
      AFSName: "CLEANCO QUEENSLAND LIMITED",
    },
    {
      AFSNumber: "518176",
      AFSName: "POTENTUM PARTNERS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "518185",
      AFSName: "STEPHEN FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "518220",
      AFSName: "EBN HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "518221",
      AFSName: "LIFE PATH FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "518224",
      AFSName: "KEYSTONE UNDERWRITING AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "518264",
      AFSName: "ONEVENTURES NOMINEES #2 PTY LTD",
    },
    {
      AFSNumber: "518285",
      AFSName: "GPL READ PTY LTD",
    },
    {
      AFSNumber: "518309",
      AFSName: "MDRC WEALTH PTY LTD",
    },
    {
      AFSNumber: "518316",
      AFSName: "EQUITEQ AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "518320",
      AFSName: "CORE PROPERTY RESEARCH HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "518338",
      AFSName: "WATCHSTONE CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "518407",
      AFSName: "ICA INVESTMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "518417",
      AFSName: "AMERICAN CENTURY INVESTMENT MANAGEMENT (AU) PTY LIMITED",
    },
    {
      AFSNumber: "518445",
      AFSName: "MOONEYS INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "518453",
      AFSName: "AFSL LICENSEE PTY. LTD.",
    },
    {
      AFSNumber: "518488",
      AFSName: "IVX FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "518509",
      AFSName: "ACUITY ADVISERS PTY LTD",
    },
    {
      AFSNumber: "518532",
      AFSName: "KABEL ADVICE PTY LTD",
    },
    {
      AFSNumber: "518626",
      AFSName: "ED LEUENBERGER PTY LTD",
    },
    {
      AFSNumber: "518648",
      AFSName: "WESTLAWN FINANCIAL SERVICES LIMITED",
    },
    {
      AFSNumber: "518706",
      AFSName: "MAI FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "518735",
      AFSName: "NINE MILE FINANCIAL PTY. LTD.",
    },
    {
      AFSNumber: "518743",
      AFSName: "INVESTPLAN PTY LTD",
    },
    {
      AFSNumber: "518744",
      AFSName: "ARCANA CAPITAL FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "518762",
      AFSName: "OZ DIRECT MORTGAGES PTY LTD",
    },
    {
      AFSNumber: "518784",
      AFSName: "RUBICONEM PTY LTD",
    },
    {
      AFSNumber: "518850",
      AFSName: "PLANET MONEY PTY LTD",
    },
    {
      AFSNumber: "518851",
      AFSName: "BALMORAL ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "518873",
      AFSName: "WEST END LICENSEE GROUP PTY LTD",
    },
    {
      AFSNumber: "518902",
      AFSName: "MANA PAYMENT AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "518931",
      AFSName: "ADSUM CAPITAL PTY LTD",
    },
    {
      AFSNumber: "518990",
      AFSName: "PAYANY1 PTY LTD",
    },
    {
      AFSNumber: "519073",
      AFSName: "JWFS FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "519082",
      AFSName: "SYNERGY AUSTRALIA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "519089",
      AFSName: "LIFETIME FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "519099",
      AFSName: "TASSIE WEALTH PTY. LTD.",
    },
    {
      AFSNumber: "519133",
      AFSName: "SQUARE PEG INVEST PTY LTD",
    },
    {
      AFSNumber: "519172",
      AFSName: "ADVICE LOOP PTY LTD",
    },
    {
      AFSNumber: "519190",
      AFSName: "FORTNUM ADVICE PTY LTD",
    },
    {
      AFSNumber: "519265",
      AFSName: "AUSTVICE PTY LTD",
    },
    {
      AFSNumber: "519295",
      AFSName: "INFINITY ADVISOR AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "519309",
      AFSName: "LAUDERS GROUP CAPITAL PTY LTD",
    },
    {
      AFSNumber: "519319",
      AFSName: "THUNDERING HERD FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "519344",
      AFSName: "PARKER WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "519374",
      AFSName:
        "GLOBAL LOAN AGENCY SERVICES AUSTRALIA SPECIALIST ACTIVITIES PTY LIMITED",
    },
    {
      AFSNumber: "519446",
      AFSName: "LEGACY FINANCIAL PLANNING PTY. LTD.",
    },
    {
      AFSNumber: "519447",
      AFSName: "ROCHIS CAPITAL PTY LTD",
    },
    {
      AFSNumber: "519450",
      AFSName: "BELAY CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "519498",
      AFSName: "GRAVITAS INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "519552",
      AFSName: "IPLATFORMS NOMINEES PTY. LTD.",
    },
    {
      AFSNumber: "519564",
      AFSName: "SAGE FINANCIAL AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "519569",
      AFSName: "NEST ADVISORY HQ PTY LTD",
    },
    {
      AFSNumber: "519599",
      AFSName: "EXTRASJAR PTY LTD",
    },
    {
      AFSNumber: "519620",
      AFSName: "MI PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "519686",
      AFSName: "RANGE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "519741",
      AFSName: "RW FPL PTY LTD",
    },
    {
      AFSNumber: "519744",
      AFSName: "LIDDICOAT FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "519769",
      AFSName: "SANDERS FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "519834",
      AFSName: "YOUR BEACON PTY LTD",
    },
    {
      AFSNumber: "519872",
      AFSName: "SHAREX PTY LTD",
    },
    {
      AFSNumber: "519884",
      AFSName: "MONARK SECURITIES PTY LTD",
    },
    {
      AFSNumber: "519985",
      AFSName: "JAAIMS TECHNOLOGIES PTY. LTD.",
    },
    {
      AFSNumber: "520030",
      AFSName: "FAIRBRIDGE WEALTH PTY LTD",
    },
    {
      AFSNumber: "520040",
      AFSName: "PEMBROKE MORTGAGE INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "520048",
      AFSName: "REID WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "520049",
      AFSName: "DELEGATES FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "520053",
      AFSName: "FINTERLIESE PTY LTD",
    },
    {
      AFSNumber: "520093",
      AFSName: "RIVERSIDE AUSTRALIA MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "520121",
      AFSName: "OCTOPUS INVESTMENTS AUST PTY LTD",
    },
    {
      AFSNumber: "520160",
      AFSName: "ESR INVESTMENT MANAGEMENT 1 (AUSTRALIA) PTY LIMITED",
    },
    {
      AFSNumber: "520185",
      AFSName: "SEMPER SECURITIES PTY LTD",
    },
    {
      AFSNumber: "520186",
      AFSName: "THATCHER FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "520218",
      AFSName: "GPS CAPITAL MARKETS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "520230",
      AFSName: "DAVID J. NEWBERRY PTY LIMITED",
    },
    {
      AFSNumber: "520239",
      AFSName: "AVENUE BANK LTD",
    },
    {
      AFSNumber: "520249",
      AFSName: "MRC FINANCIAL ADVICE PTY LTD",
    },
    {
      AFSNumber: "520252",
      AFSName: "INTESA SANPAOLO SPA",
    },
    {
      AFSNumber: "520266",
      AFSName: "ALTUS FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "520268",
      AFSName: "LEAD PARTNERS PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "520270",
      AFSName: "AMICAA INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "520271",
      AFSName: "AMICAA ADVISORS PTY LTD",
    },
    {
      AFSNumber: "520281",
      AFSName: "BELLROCK ADVISORY PTY LTD",
    },
    {
      AFSNumber: "520293",
      AFSName: "MSQUARED CAPITAL PTY LTD",
    },
    {
      AFSNumber: "520310",
      AFSName: "FP ADVICE PTY LIMITED",
    },
    {
      AFSNumber: "520339",
      AFSName: "STONEHOUSE FINANCIAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "520341",
      AFSName: "CANOPIUS ASIA PTE. LTD.",
    },
    {
      AFSNumber: "520383",
      AFSName: "OMNIA CAPITAL PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "520396",
      AFSName: "PURE ASSET MANAGEMENT PTY. LTD.",
    },
    {
      AFSNumber: "520408",
      AFSName: "MOMENTUM ADVICE PTY LTD",
    },
    {
      AFSNumber: "520428",
      AFSName: "ELM RESPONSIBLE INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "520431",
      AFSName: "FLP LICENCE HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "520442",
      AFSName: "MF & CO. ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "520445",
      AFSName: "SCAPE AUSTRALIA MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "520446",
      AFSName: "THOMAS GROUP ACCOUNTING & TAXATION PTY LTD",
    },
    {
      AFSNumber: "520453",
      AFSName: "KINGSMEDE PARTNERS PTY LTD",
    },
    {
      AFSNumber: "520524",
      AFSName: "KASA INVESTMENT PARTNERS PTY LTD",
    },
    {
      AFSNumber: "520526",
      AFSName: "BRERONA CAPITAL ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "520527",
      AFSName: "EDGE (AUST) FINANCIAL INTELLIGENCE PTY LTD",
    },
    {
      AFSNumber: "520548",
      AFSName: "EBURY PARTNERS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "520579",
      AFSName: "GARTEN PTY LTD",
    },
    {
      AFSNumber: "520582",
      AFSName: "@ RISK UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "520585",
      AFSName: "TK ADVISERS PTY LTD",
    },
    {
      AFSNumber: "520785",
      AFSName: "DAYTEK CAPITAL PTY LTD",
    },
    {
      AFSNumber: "520884",
      AFSName: "WFS CAPITAL PTY LTD",
    },
    {
      AFSNumber: "520907",
      AFSName: "SUPERPAY GLOBAL PTY LTD",
    },
    {
      AFSNumber: "520958",
      AFSName: "BLYTHE GROUP PTY LTD",
    },
    {
      AFSNumber: "520963",
      AFSName: "INDEPENDENT FINANCIAL ADVICE & EDUCATION PTY LTD",
    },
    {
      AFSNumber: "521132",
      AFSName: "AGNEW FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "521138",
      AFSName: "WEALTHSENSE PTY LTD",
    },
    {
      AFSNumber: "521214",
      AFSName: "RMBLACK PTY LTD",
    },
    {
      AFSNumber: "521367",
      AFSName: "NAVIGATE LICENCE PTY LTD",
    },
    {
      AFSNumber: "521368",
      AFSName: "SMARTESTENERGY AUSTRALIA FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "521389",
      AFSName: "PRP FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "521404",
      AFSName: "DAYLIGHT FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "521445",
      AFSName: "FRAZIS CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "521472",
      AFSName: "WHITECHAPEL LANE PTY LTD",
    },
    {
      AFSNumber: "521476",
      AFSName: "LINCOLN PLACE IM PTY LTD",
    },
    {
      AFSNumber: "521479",
      AFSName: "SOUTH YARRA FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "521512",
      AFSName: "CAAM INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "521516",
      AFSName: "WEALTH TRAIL PTY LTD",
    },
    {
      AFSNumber: "521588",
      AFSName: "FINTECH EQUITY PTY LTD",
    },
    {
      AFSNumber: "521616",
      AFSName: "CLASS LEADING SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "521666",
      AFSName: "EMR SERVICES PTY LTD",
    },
    {
      AFSNumber: "521687",
      AFSName: "WHISTLER WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "521741",
      AFSName: "ITG AUSTRALIA TS PTY LTD",
    },
    {
      AFSNumber: "521767",
      AFSName: "MATRIX CAPITAL MANAGEMENT CORPORATION PTY LTD",
    },
    {
      AFSNumber: "521769",
      AFSName: "EQUITEM FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "521777",
      AFSName: "PREFERRED FINANCIAL SERVICES PTY LTD.",
    },
    {
      AFSNumber: "521786",
      AFSName: "MULTIPLY WEALTH ADVISORY PTY LTD",
    },
    {
      AFSNumber: "521800",
      AFSName: "BARRENJOEY MARKETS PTY LIMITED",
    },
    {
      AFSNumber: "521801",
      AFSName: "BARRENJOEY ADVISORY PTY LIMITED",
    },
    {
      AFSNumber: "521808",
      AFSName: "GI INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "521837",
      AFSName: "VIRIDIOS CAPITAL PTY LTD",
    },
    {
      AFSNumber: "521887",
      AFSName: "ORACLE CAPITAL GROUP PTY LTD",
    },
    {
      AFSNumber: "521901",
      AFSName: "LATERAL PAYMENT SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "521930",
      AFSName: "HARVEST FUNDS PTY LTD",
    },
    {
      AFSNumber: "521956",
      AFSName: "PAYWISE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "522028",
      AFSName: "AUSTRALIA NATIONAL INVESTMENT GROUP PTY LTD",
    },
    {
      AFSNumber: "522050",
      AFSName: "LIFE MONEY CO SERVICES PTY LTD",
    },
    {
      AFSNumber: "522076",
      AFSName: "COJAG PTY. LTD.",
    },
    {
      AFSNumber: "522099",
      AFSName: "WEALTH POINT PTY LTD",
    },
    {
      AFSNumber: "522145",
      AFSName: "SILC FIDUCIARY SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "522238",
      AFSName: "BELAY ADVICE PTY LTD",
    },
    {
      AFSNumber: "522267",
      AFSName: "MA MONEY FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "522386",
      AFSName: "BASE CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "522392",
      AFSName: "NEW HORIZONS FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "522397",
      AFSName: "GBA SECURITIES HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "522416",
      AFSName: "PROFINANCIAL PTY LTD",
    },
    {
      AFSNumber: "522418",
      AFSName: "AUSTRALIAN CONSOLIDATED PLANNING AND INSURANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "522565",
      AFSName: "SS&C BLUEDOOR PTY LIMITED",
    },
    {
      AFSNumber: "522572",
      AFSName: "BOLT CAPITAL PTY LTD",
    },
    {
      AFSNumber: "522608",
      AFSName: "ADCOR RISK CONSULTANTS PTY LTD",
    },
    {
      AFSNumber: "522613",
      AFSName: "ARETE LIFE SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "522658",
      AFSName: "CANEHERD PTY. LTD.",
    },
    {
      AFSNumber: "522661",
      AFSName: "FINEXIA WEALTH PTY LTD",
    },
    {
      AFSNumber: "522707",
      AFSName: "AFFINITY PRIVATE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "522710",
      AFSName: "GENUS WEALTH AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "522727",
      AFSName: "G CAPITAL PTY LTD",
    },
    {
      AFSNumber: "522734",
      AFSName: "ASPIRE PRIVATE WEALTH GROUP PTY LTD",
    },
    {
      AFSNumber: "522814",
      AFSName: "FENCHURCH INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "522822",
      AFSName: "APEX PARTNERS PTY LTD",
    },
    {
      AFSNumber: "522830",
      AFSName: "DYNAMI FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "522835",
      AFSName: "NATIONAL & GENERAL ADMINISTRATION PTY LTD",
    },
    {
      AFSNumber: "522840",
      AFSName: "GARTORA ENTERPRISES PTY. LTD.",
    },
    {
      AFSNumber: "522841",
      AFSName: "ADRIANS WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "522843",
      AFSName: "BURTONWOOD CAPITAL PTY LTD",
    },
    {
      AFSNumber: "522851",
      AFSName: "CAPTIVE HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "522880",
      AFSName: "THE UPDATED INVESTOR PTY LTD",
    },
    {
      AFSNumber: "522904",
      AFSName: "LEWIS FINANCIAL SERVICES LICENCE PTY LTD",
    },
    {
      AFSNumber: "522916",
      AFSName: "CABLE HOUSE FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "522922",
      AFSName: "FRANK MACDONAGH & ASSOCIATES PTY LIMITED",
    },
    {
      AFSNumber: "522942",
      AFSName: "CONSONE WEALTH PTY. LTD.",
    },
    {
      AFSNumber: "522947",
      AFSName: "JLS FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "522950",
      AFSName: "TLK FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "522956",
      AFSName: "PROSPER FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "522995",
      AFSName: "RM SPECIALTY PTY LTD",
    },
    {
      AFSNumber: "523004",
      AFSName: "LIFE MAP FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "523015",
      AFSName: "LIFE ADVISORS PTY LTD",
    },
    {
      AFSNumber: "523025",
      AFSName: "STAC CAPITAL ADVISORY SERVICES PTY LTD",
    },
    {
      AFSNumber: "523026",
      AFSName: "LT ADVICE PTY LTD",
    },
    {
      AFSNumber: "523044",
      AFSName: "EQT PARTNERS AUSTRALIA II PTY LTD",
    },
    {
      AFSNumber: "523055",
      AFSName: "AZ PRIVATE WEALTH SERVICES PTY LTD",
    },
    {
      AFSNumber: "523061",
      AFSName: "PORT JACKSON FAMILY OFFICE (LICENCE) PTY LTD",
    },
    {
      AFSNumber: "523150",
      AFSName: "ORDE CAPITAL MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "523157",
      AFSName: "VEYE PTY LTD",
    },
    {
      AFSNumber: "523167",
      AFSName: "ALVIA LICENSEES PTY LTD",
    },
    {
      AFSNumber: "523178",
      AFSName: "M PRIVATE FUNDS PTY LTD",
    },
    {
      AFSNumber: "523195",
      AFSName: "ACCESS FP PTY LTD",
    },
    {
      AFSNumber: "523207",
      AFSName: "UPRISE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "523218",
      AFSName: "COPLEY CAPITAL PTY LTD",
    },
    {
      AFSNumber: "523225",
      AFSName: "RESI WHOLESALE FUNDING PTY LIMITED",
    },
    {
      AFSNumber: "523228",
      AFSName: "CONTRARIAN ADVISORY SERVICES PTY LTD",
    },
    {
      AFSNumber: "523245",
      AFSName: "BIRLING PTY LTD",
    },
    {
      AFSNumber: "523247",
      AFSName: "FUNDING CAPITAL PTY LTD",
    },
    {
      AFSNumber: "523251",
      AFSName: "ROUNDED WEALTH ADVISORY PTY LTD",
    },
    {
      AFSNumber: "523289",
      AFSName: "AKIDNA LTD",
    },
    {
      AFSNumber: "523297",
      AFSName: "INTELLECT WEALTH PTY LTD",
    },
    {
      AFSNumber: "523317",
      AFSName: "THE WEALTH CONNECTION PTY LTD",
    },
    {
      AFSNumber: "523332",
      AFSName: "UNITED ADVICE PTY LTD",
    },
    {
      AFSNumber: "523344",
      AFSName: "RED PANDA FUTURE WEALTH PTY LTD",
    },
    {
      AFSNumber: "523351",
      AFSName: "CORPORATE ALLIANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "523401",
      AFSName: "RESOLUTE ADVISORY PTY LTD",
    },
    {
      AFSNumber: "523439",
      AFSName: "STOIC ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "523441",
      AFSName: "BLACK & WHITE FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "523464",
      AFSName: "AXIIS CAPITAL PTY LTD",
    },
    {
      AFSNumber: "523517",
      AFSName: "EMERGING MANAGER CAPITAL PTY LTD",
    },
    {
      AFSNumber: "523541",
      AFSName: "VERSE WEALTH LICENSEE SERVICES PTY LTD",
    },
    {
      AFSNumber: "523627",
      AFSName: "HIVE GROUP PTY LTD",
    },
    {
      AFSNumber: "523647",
      AFSName: "COVERRADAR GROUP PTY LTD",
    },
    {
      AFSNumber: "523648",
      AFSName: "AL CAPITAL HOLDING PTY LTD",
    },
    {
      AFSNumber: "523661",
      AFSName: "KINGSFORD YORK FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "523677",
      AFSName: "KYCU FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "523684",
      AFSName: "CHEVALIER CAPITAL PTY LTD",
    },
    {
      AFSNumber: "523703",
      AFSName: "STRATEGIC ADVICE AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "523727",
      AFSName: "WJD ADVISORY PTY LTD",
    },
    {
      AFSNumber: "523785",
      AFSName: "ASTUTE CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "523808",
      AFSName: "DAIWA CAPITAL MARKETS SINGAPORE LIMITED",
    },
    {
      AFSNumber: "523829",
      AFSName: "JADIG PRUDENTIAL PTY LTD",
    },
    {
      AFSNumber: "523830",
      AFSName: "KEYS LICENSEE PTY LTD",
    },
    {
      AFSNumber: "523831",
      AFSName: "TEMPLESTONE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "523862",
      AFSName: "GLOBAL INVESTMENT ADVISERS PTY LTD",
    },
    {
      AFSNumber: "523882",
      AFSName: "ARBT PREFAB PTY LTD",
    },
    {
      AFSNumber: "523889",
      AFSName: "ENERGY SERVICES MANAGEMENT ADMINISTRATION PTY LTD",
    },
    {
      AFSNumber: "523921",
      AFSName: "PACIFIC INTERNATIONAL INSURANCE PTY LIMITED",
    },
    {
      AFSNumber: "523965",
      AFSName: "ENGAGED FINANCIAL SERVICES  PTY LTD",
    },
    {
      AFSNumber: "523970",
      AFSName: "PERITIA WEALTH PTY LTD",
    },
    {
      AFSNumber: "523979",
      AFSName: "MARLSTON FORREST WEALTH PTY LTD",
    },
    {
      AFSNumber: "524015",
      AFSName: "MICHANNA WEALTH PTY LTD",
    },
    {
      AFSNumber: "524041",
      AFSName: "ATLAS INVESTMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "524044",
      AFSName: "NUVEI AUSTRALIA MERCHANT SERVICES PTY LTD",
    },
    {
      AFSNumber: "524103",
      AFSName: "IFA PRIVATE WEALTH ADVISORS PTY LTD",
    },
    {
      AFSNumber: "524106",
      AFSName: "KHT WEALTH PTY LTD",
    },
    {
      AFSNumber: "524124",
      AFSName: "MIDSEC LICENCING PTY LTD",
    },
    {
      AFSNumber: "524161",
      AFSName: "EQ PRIVATE PTY LTD",
    },
    {
      AFSNumber: "524167",
      AFSName: "LLS INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "524353",
      AFSName: "OVER FIFTY GUARDIAN FRIENDLY SOCIETY LIMITED",
    },
    {
      AFSNumber: "524359",
      AFSName: "BONA FIDE ADVICE PTY LTD",
    },
    {
      AFSNumber: "524371",
      AFSName: "DIRIGERE ADVISORY PTY LIMITED",
    },
    {
      AFSNumber: "524401",
      AFSName: "WJ FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "524426",
      AFSName: "REALM NETWORK PTY LTD",
    },
    {
      AFSNumber: "524448",
      AFSName: "ORSARO CAPITAL PTY LTD",
    },
    {
      AFSNumber: "524450",
      AFSName: "CUMULUS WEALTH PTY LTD",
    },
    {
      AFSNumber: "524454",
      AFSName: "COMMONCENTS ADVICE GROUP PTY LTD",
    },
    {
      AFSNumber: "524630",
      AFSName: "TILBROOK SECURITIES PTY LTD",
    },
    {
      AFSNumber: "524639",
      AFSName: "PEAK LITIGATION FUNDING PTY LTD",
    },
    {
      AFSNumber: "524725",
      AFSName: "CAPITAL PRUDENTIAL FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "524810",
      AFSName: "EIGHT BAYS INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "524853",
      AFSName: "KING OF THE MOUNTAIN FINANCIAL ADVICE PTY LTD",
    },
    {
      AFSNumber: "524892",
      AFSName: "ALTIORA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "524945",
      AFSName: "AUSTRALIAN CAPITAL INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "524976",
      AFSName: "FRONTIER GLOBAL UW (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "524987",
      AFSName: "ELYSIAN WHOLESALE PTY LTD",
    },
    {
      AFSNumber: "524989",
      AFSName: "DRUMMOND KNIGHT ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "525051",
      AFSName: "BAPTIST EDUCATION FUND LTD",
    },
    {
      AFSNumber: "525067",
      AFSName: "IQ360 PTY LTD",
    },
    {
      AFSNumber: "525069",
      AFSName: "AGP CAPITAL MANAGEMENT AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "525072",
      AFSName: "DIVERSIFIED INVESTMENTS COMPANY LIMITED",
    },
    {
      AFSNumber: "525093",
      AFSName: "LINARA WEALTH PTY LTD",
    },
    {
      AFSNumber: "525174",
      AFSName: "HJC FINANCIAL ADVISERS PTY LTD",
    },
    {
      AFSNumber: "525177",
      AFSName: "SUREINSURE PTY LTD",
    },
    {
      AFSNumber: "525278",
      AFSName: "VANTAGE POINT ASSET MANAGEMENT (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "525368",
      AFSName: "GANE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "525450",
      AFSName: "CBCA PTY LTD",
    },
    {
      AFSNumber: "525455",
      AFSName: "NEOEN AUSTRALIA PTY. LTD.",
    },
    {
      AFSNumber: "525458",
      AFSName: "POLAR 993 LIMITED",
    },
    {
      AFSNumber: "525465",
      AFSName: "BCP2 PTY LTD",
    },
    {
      AFSNumber: "525467",
      AFSName: "BCP3 PTY LTD",
    },
    {
      AFSNumber: "525491",
      AFSName: "METRIX CONNECT PTY LTD",
    },
    {
      AFSNumber: "525506",
      AFSName: "TITLE CAPITAL LICENCE CO. PTY LTD",
    },
    {
      AFSNumber: "525533",
      AFSName: "GFG CAPITAL PTY LTD",
    },
    {
      AFSNumber: "525558",
      AFSName: "LAMBERT GROUP MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "525624",
      AFSName: "ALARA FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "525625",
      AFSName: "ADVISER SERVICES HUB PTY LTD",
    },
    {
      AFSNumber: "525627",
      AFSName: "SA WEALTH SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "525628",
      AFSName: "SQUARETRADE AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "525631",
      AFSName: "MULTIFORTE GROUP PTY LTD",
    },
    {
      AFSNumber: "525640",
      AFSName: "BETTERMENT FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "525655",
      AFSName: "PKFWAFSL PTY LTD",
    },
    {
      AFSNumber: "525674",
      AFSName: "EFS ADVICE PTY LTD",
    },
    {
      AFSNumber: "525676",
      AFSName: "IMPACT WEALTH SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "525686",
      AFSName: "PREMIUM ADVISERS PTY LTD",
    },
    {
      AFSNumber: "525752",
      AFSName: "WLTH PTY LTD",
    },
    {
      AFSNumber: "525757",
      AFSName: "VRGK TECH PTY LTD",
    },
    {
      AFSNumber: "525758",
      AFSName: "ARRIVE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "525760",
      AFSName: "APOLLO CRYPTO MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "525769",
      AFSName: "SUPERCLEAR FX PTY LTD",
    },
    {
      AFSNumber: "525803",
      AFSName: "LOYAL PRIMUS PTY LTD",
    },
    {
      AFSNumber: "525804",
      AFSName: "AIG ADVICE PTY LTD",
    },
    {
      AFSNumber: "525827",
      AFSName: "HONAN INVESTMENT PARTNERS PTY. LIMITED",
    },
    {
      AFSNumber: "525840",
      AFSName: "BTCM PAYMENTS LIMITED",
    },
    {
      AFSNumber: "525866",
      AFSName: "INSURTECH GATEWAY AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "525889",
      AFSName: "CASL GOVERNANCE LTD",
    },
    {
      AFSNumber: "525931",
      AFSName: "CURATED CAPITAL PTY LTD",
    },
    {
      AFSNumber: "525955",
      AFSName: "RISKCORP PTY LTD",
    },
    {
      AFSNumber: "526020",
      AFSName: "CELSIUS DEVELOPMENTS PTY LTD",
    },
    {
      AFSNumber: "526026",
      AFSName: "KFS INVESTMENT MANAGER PTY LTD",
    },
    {
      AFSNumber: "526047",
      AFSName: "ALLIED CREDIT MANAGEMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "526052",
      AFSName: "HLB MANN JUDD WEALTH MANAGEMENT (NSW) PTY LIMITED",
    },
    {
      AFSNumber: "526055",
      AFSName: "AUSTRALIAN ETHICAL SUPERANNUATION PTY LTD",
    },
    {
      AFSNumber: "526061",
      AFSName: "AP LLOYDS PTY LTD",
    },
    {
      AFSNumber: "526072",
      AFSName: "CARRARA INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "526125",
      AFSName: "AURIC INTERNATIONAL MARKETS (AU) PTY LTD",
    },
    {
      AFSNumber: "526129",
      AFSName: "PERTINAX LRC PTY LTD",
    },
    {
      AFSNumber: "526143",
      AFSName: "PLANNINGSOLO LICENSING PTY LTD",
    },
    {
      AFSNumber: "526147",
      AFSName: "TRIM CAPITAL PTY LTD",
    },
    {
      AFSNumber: "526173",
      AFSName: "DISCOVER ENERGY FINANCE PTY LTD",
    },
    {
      AFSNumber: "526187",
      AFSName: "VSTAR FINANCE PTY LTD",
    },
    {
      AFSNumber: "526189",
      AFSName: "VADO PRIVATE PTY LIMITED",
    },
    {
      AFSNumber: "526194",
      AFSName: "AIRPAY FINANCIAL TECHNOLOGIES PTY LTD",
    },
    {
      AFSNumber: "526201",
      AFSName: "MKT SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "526206",
      AFSName: "AUSTRALIAN INVESTMENT MANAGEMENT PTY. LTD.",
    },
    {
      AFSNumber: "526270",
      AFSName: "VANGUARD SUPER PTY LTD",
    },
    {
      AFSNumber: "526279",
      AFSName: "KING RIVER CAPITAL HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "526280",
      AFSName: "KING RIVER CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "526282",
      AFSName: "WPFP GROUP PTY LTD",
    },
    {
      AFSNumber: "526288",
      AFSName: "AUSS LIFE PTY LTD",
    },
    {
      AFSNumber: "526297",
      AFSName: "PEAR TREE FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "526334",
      AFSName: "VMG MANAGEMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "526358",
      AFSName: "RUFFER LLP",
    },
    {
      AFSNumber: "526373",
      AFSName: "CLARITY ADVISER SERVICES PTY LTD",
    },
    {
      AFSNumber: "526464",
      AFSName: "CORSAIR CAPITAL AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "526479",
      AFSName: "XTON INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "526482",
      AFSName: "SOVEREIGN GLOBAL CAPITAL MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "526485",
      AFSName: "EL DORADO CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "526600",
      AFSName: "LFC GROUP PTY LIMITED",
    },
    {
      AFSNumber: "526603",
      AFSName: "PRIVEST LICENSEE SERVICES PTY LTD",
    },
    {
      AFSNumber: "526620",
      AFSName: "DDMA PTY LTD",
    },
    {
      AFSNumber: "526670",
      AFSName: "MILESTONE OPERATIONS LIMITED",
    },
    {
      AFSNumber: "526686",
      AFSName: "FLYWIRE (SINGAPORE) PTE. LTD.",
    },
    {
      AFSNumber: "526688",
      AFSName: "ROSE BAY EQUITIES PTY LTD",
    },
    {
      AFSNumber: "526689",
      AFSName: "THORNBURG INVESTMENT MANAGEMENT INC",
    },
    {
      AFSNumber: "526690",
      AFSName: "NPR MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "526700",
      AFSName: "IADVICE TECHNOLOGY PTY LTD",
    },
    {
      AFSNumber: "526707",
      AFSName: "SPECIALIST LICENSEE PTY LTD",
    },
    {
      AFSNumber: "526724",
      AFSName: "SINAPRISE PTY LTD",
    },
    {
      AFSNumber: "526742",
      AFSName: "NOW ACCOUNTING PTY LTD",
    },
    {
      AFSNumber: "526747",
      AFSName: "MONTARA SERVICES PTY LTD",
    },
    {
      AFSNumber: "526748",
      AFSName: "LOWE LIPPMANN WEALTH ADVISERS PTY LTD",
    },
    {
      AFSNumber: "526756",
      AFSName: "NEW URBAN VILLAGES FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "526798",
      AFSName: "LONGVIEW CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "526820",
      AFSName: "CONSCIOUS INVESTMENT MANAGEMENT FUNDS PTY LTD",
    },
    {
      AFSNumber: "526842",
      AFSName: "LAKEHOUSE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "526845",
      AFSName: "MZL NOMINEES PTY LTD",
    },
    {
      AFSNumber: "526866",
      AFSName: "FINSTYLE PLANNING SOLUTIONS PTY. LTD.",
    },
    {
      AFSNumber: "526868",
      AFSName: "STATTON PTY LTD",
    },
    {
      AFSNumber: "526878",
      AFSName: "AIRRAILS PTY LTD",
    },
    {
      AFSNumber: "526885",
      AFSName: "PFM FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "526888",
      AFSName: "FORTUNAE PTY LTD",
    },
    {
      AFSNumber: "526892",
      AFSName: "THE VIRTUOUS LICENSEE PTY LTD",
    },
    {
      AFSNumber: "526954",
      AFSName: "INNOVUS LICENSEE SERVICES PTY LTD",
    },
    {
      AFSNumber: "526972",
      AFSName: "ACUMEN INVESTORS PTY LTD",
    },
    {
      AFSNumber: "527059",
      AFSName: "RADIAN FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "527072",
      AFSName: "INITIUM CAPITAL PTY LTD",
    },
    {
      AFSNumber: "527076",
      AFSName: "THERA TFS PTY LTD",
    },
    {
      AFSNumber: "527080",
      AFSName: "KATNISS PTY LTD",
    },
    {
      AFSNumber: "527096",
      AFSName: "BTG ASSOCIATES (ADMIN) PTY LTD",
    },
    {
      AFSNumber: "527099",
      AFSName: "CADRE CORPORATE PTY LTD",
    },
    {
      AFSNumber: "527159",
      AFSName: "CPW ADVISORY PTY LTD",
    },
    {
      AFSNumber: "527164",
      AFSName: "DWYERMA PTY LIMITED",
    },
    {
      AFSNumber: "527182",
      AFSName: "PROFETA INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "527238",
      AFSName: "DUNDAS PARTNERS LLP",
    },
    {
      AFSNumber: "527243",
      AFSName: "FUTURE PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "527270",
      AFSName: "QT PAY PTY LTD",
    },
    {
      AFSNumber: "527319",
      AFSName: "FLY WALLET PTY LTD",
    },
    {
      AFSNumber: "527320",
      AFSName: "PTRN PTY LTD",
    },
    {
      AFSNumber: "527370",
      AFSName: "ZAI AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "527381",
      AFSName: "GO.FARM SECURITIES PTY LTD",
    },
    {
      AFSNumber: "527434",
      AFSName: "FIDUCIARY DUTY ADVISERS PTY LTD",
    },
    {
      AFSNumber: "527435",
      AFSName: "HB BIOTECHNOLOGY LTD",
    },
    {
      AFSNumber: "527456",
      AFSName: "QUALITY ADVISERS PTY LIMITED",
    },
    {
      AFSNumber: "527462",
      AFSName: "HORIZON INVESTMENT SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "527485",
      AFSName: "KAYNE ANDERSON CAPITAL ADVISORS  L.P.",
    },
    {
      AFSNumber: "527535",
      AFSName: "HLB MANN JUDD WEALTH PTY LTD",
    },
    {
      AFSNumber: "527536",
      AFSName: "WEALTH ADVISERS FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "527598",
      AFSName: "RICHMOND HILL CAPITAL PTY LTD",
    },
    {
      AFSNumber: "527599",
      AFSName: "TRADING MASTERY PTY LTD",
    },
    {
      AFSNumber: "527623",
      AFSName: "NAJMAA GROUP PTY LTD",
    },
    {
      AFSNumber: "527642",
      AFSName: "CUBE FINANCIAL SERVICES QLD PTY LTD",
    },
    {
      AFSNumber: "527657",
      AFSName: "IMFG PTY LTD",
    },
    {
      AFSNumber: "527733",
      AFSName: "R.G. WITHERS SERVICES PTY LTD",
    },
    {
      AFSNumber: "527745",
      AFSName: "CUSTODIA WEALTH SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "527750",
      AFSName: "GREEN SQUARES CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "527791",
      AFSName: "JSW PARTNERS PTY LTD",
    },
    {
      AFSNumber: "527855",
      AFSName: "DXC INSURANCE SOLUTIONS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "527866",
      AFSName: "TRIPLE EIGHT CAPITAL PTY LTD",
    },
    {
      AFSNumber: "527867",
      AFSName: "S & R FINANCIAL SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "527875",
      AFSName: "INVESTMENT MARKETS (AUST) PTY LTD",
    },
    {
      AFSNumber: "527880",
      AFSName: "WEALTH IQ GROUP PTY LTD",
    },
    {
      AFSNumber: "527881",
      AFSName: "BEACON INVESTMENT PUBLISHING PTY LTD",
    },
    {
      AFSNumber: "527890",
      AFSName: "BILLD OPERATIONS PTY LTD",
    },
    {
      AFSNumber: "527915",
      AFSName: "PASPALIS CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "527917",
      AFSName: "THE BANK OF NEW YORK MELLON",
    },
    {
      AFSNumber: "527931",
      AFSName: "MELIORA MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "527949",
      AFSName: "AUSTRALIA PRUDENTIAL INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "528022",
      AFSName: "W & C BARBER PTY LTD",
    },
    {
      AFSNumber: "528032",
      AFSName: "NETWEALTH SUPERANNUATION SERVICES PTY LTD",
    },
    {
      AFSNumber: "528085",
      AFSName: "PACIFIC WEALTH PTY. LTD.",
    },
    {
      AFSNumber: "528160",
      AFSName: "ALLIED ADVICE PTY LTD",
    },
    {
      AFSNumber: "528216",
      AFSName: "CHAPMAN CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "528220",
      AFSName: "MY PLAN GROUP PTY LTD",
    },
    {
      AFSNumber: "528241",
      AFSName: "KPS WEALTH PTY LTD",
    },
    {
      AFSNumber: "528244",
      AFSName: "HONEY INSURANCE PTY LTD",
    },
    {
      AFSNumber: "528250",
      AFSName: "BERYLLIUM ADVISERS PTY LTD",
    },
    {
      AFSNumber: "528306",
      AFSName: "STRATA ADVICE PTY LTD",
    },
    {
      AFSNumber: "528312",
      AFSName: "SUNRISE BROKERS (HONG KONG) LIMITED",
    },
    {
      AFSNumber: "528330",
      AFSName: "TRK FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "528351",
      AFSName: "THESAN ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "528369",
      AFSName: "MITSUI & CO. WOOD RESOURCES OCEANIA PTY. LTD.",
    },
    {
      AFSNumber: "528423",
      AFSName: "SLMC PROPERTY AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "528433",
      AFSName: "MITTI INSURANCE PTY LTD",
    },
    {
      AFSNumber: "528444",
      AFSName: "WEXTED FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "528448",
      AFSName: "JADA ADVISORY GROUP PTY LTD",
    },
    {
      AFSNumber: "528449",
      AFSName: "AUSTRALIAN FSL PTY LTD",
    },
    {
      AFSNumber: "528472",
      AFSName: "VICTORY CAPITAL MANAGEMENT INC.",
    },
    {
      AFSNumber: "528512",
      AFSName: "COASTAL FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "528526",
      AFSName: "QUAY WHOLESALE FUND SERVICES PTY LTD",
    },
    {
      AFSNumber: "528534",
      AFSName: "INSURX PTY LTD",
    },
    {
      AFSNumber: "528562",
      AFSName: "NORTHERN PLATEAU WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "528593",
      AFSName: "EVOLUTION MIT SERVICES PTY LTD",
    },
    {
      AFSNumber: "528626",
      AFSName: "TYCOON CAPITAL GROUP PTY LTD",
    },
    {
      AFSNumber: "528669",
      AFSName: "INTERGEN CAPITAL PTY LTD",
    },
    {
      AFSNumber: "528678",
      AFSName: "ZENPAY PTY LTD",
    },
    {
      AFSNumber: "528717",
      AFSName: "KOROLL FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "528721",
      AFSName: "PINNACLE WEALTH PARTNERS PTY LTD",
    },
    {
      AFSNumber: "528836",
      AFSName: "MEPAY HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "528885",
      AFSName: "TORONTO DOMINION (SOUTH EAST ASIA) LIMITED",
    },
    {
      AFSNumber: "528900",
      AFSName: "MAVEN FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "528911",
      AFSName: "BAILLIE GIFFORD OVERSEAS LIMITED",
    },
    {
      AFSNumber: "528963",
      AFSName: "ARCINVEST PTY LTD",
    },
    {
      AFSNumber: "528971",
      AFSName: "PLOTIO (AU) GLOBAL FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "528981",
      AFSName: "MAD ABOUT LIFE FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "528982",
      AFSName: "POLAR CAPITAL  LLP",
    },
    {
      AFSNumber: "529018",
      AFSName: "DAVID J. PEACOCK PTY LTD",
    },
    {
      AFSNumber: "529097",
      AFSName: "108 TAMAR PTY LTD",
    },
    {
      AFSNumber: "529099",
      AFSName: "OPPENHEIM PTY LTD",
    },
    {
      AFSNumber: "529109",
      AFSName: "BOUNCE FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "529124",
      AFSName: "ABSOLUTELY FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "529155",
      AFSName: "MAREX AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "529187",
      AFSName: "TJL WEALTH SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "529259",
      AFSName: "ENSTAR AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "529260",
      AFSName: "FINCHLEY INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "529273",
      AFSName: "EPG WEALTH PTY LTD",
    },
    {
      AFSNumber: "529284",
      AFSName: "INTEGRUM CAPITAL LTD",
    },
    {
      AFSNumber: "529362",
      AFSName: "LIFEWISE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "529426",
      AFSName: "PUTTING PLANNING INTO PRACTICE PTY LTD",
    },
    {
      AFSNumber: "529435",
      AFSName: "CARPETA PTY LTD",
    },
    {
      AFSNumber: "529560",
      AFSName: "MOUNTAIN ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "529568",
      AFSName: "DAWSON FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "529576",
      AFSName: "COBDEN REID ADVISORY PTY LIMITED",
    },
    {
      AFSNumber: "529610",
      AFSName: "IUX MARKETS AU PTY LTD.",
    },
    {
      AFSNumber: "529628",
      AFSName: "FREIGHTWISE SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "529637",
      AFSName: "RED LION WEALTH SERVICES PTY LTD",
    },
    {
      AFSNumber: "529677",
      AFSName: "TIMARK CASUALTY SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "529695",
      AFSName: "ECLIPTIC FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "529722",
      AFSName: "IRONPLAN FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "529733",
      AFSName: "AXEL PRIVATE MARKET PTY LTD",
    },
    {
      AFSNumber: "529763",
      AFSName: "HSBCOMGT PTY LTD",
    },
    {
      AFSNumber: "529764",
      AFSName: "ADDI FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "529878",
      AFSName: "APG FINANCE SERVICES PTY LTD",
    },
    {
      AFSNumber: "529881",
      AFSName: "TERRAFORM ASSET MANAGEMENT (AUS) PTY LTD",
    },
    {
      AFSNumber: "529890",
      AFSName: "NFP GROUP PTY LTD",
    },
    {
      AFSNumber: "529893",
      AFSName: "SHARESIES AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "529894",
      AFSName: "NORTHERN TRUST SECURITIES AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "529895",
      AFSName: "NORTHERN TRUST ASSET MANAGEMENT AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "529906",
      AFSName: "MEDIQ WEALTH SERVICES PTY LTD",
    },
    {
      AFSNumber: "529952",
      AFSName: "LATIMER PARTNERS PTY LTD",
    },
    {
      AFSNumber: "529999",
      AFSName: "MPFS PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "530120",
      AFSName: "QUEENSLAND VALUE PTY LTD",
    },
    {
      AFSNumber: "530128",
      AFSName: "WHOLESALE INVESTOR SERVICES PTY LTD",
    },
    {
      AFSNumber: "530166",
      AFSName: "CONQUEST CAPITAL INVESTMENTS PTY LIMITED",
    },
    {
      AFSNumber: "530176",
      AFSName: "BOWDEN LICENSING PTY LTD",
    },
    {
      AFSNumber: "530255",
      AFSName: "DALTON FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "530257",
      AFSName: "OAK ADVISORY GROUP PTY LTD",
    },
    {
      AFSNumber: "530260",
      AFSName: "MORPLAN PTY LTD",
    },
    {
      AFSNumber: "530266",
      AFSName: "RADIUS WEALTH PTY LTD",
    },
    {
      AFSNumber: "530269",
      AFSName: "NSW FIRE BRIGADES SUPERANNUATION PTY LIMITED",
    },
    {
      AFSNumber: "530275",
      AFSName: "PROSURA PTY LTD",
    },
    {
      AFSNumber: "530393",
      AFSName: "WPP LICENSEE SERVICES PTY LTD",
    },
    {
      AFSNumber: "530442",
      AFSName: "TRACTION CAPITAL PTY LTD",
    },
    {
      AFSNumber: "530452",
      AFSName: "21 TEN FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "530475",
      AFSName: "AAG FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "530487",
      AFSName: "YOUR CLAIM PTY LTD",
    },
    {
      AFSNumber: "530501",
      AFSName: "LOFGREN FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "530504",
      AFSName: "AUSTRALIAN BROKER MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "530512",
      AFSName: "ARCHIBALD CAPITAL LICENCE PTY LIMITED",
    },
    {
      AFSNumber: "530557",
      AFSName: "ELGAR MIDDLETON INFRASTRUCTURE AND ENERGY FINANCE LLP",
    },
    {
      AFSNumber: "530587",
      AFSName: "EPOCH INVESTMENT PARTNERS  INC.",
    },
    {
      AFSNumber: "530588",
      AFSName: "ARK51 VENTURES PTY LIMITED",
    },
    {
      AFSNumber: "530596",
      AFSName: "ABLE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "530658",
      AFSName: "MULBERRY SECURITIES PTY LTD",
    },
    {
      AFSNumber: "530665",
      AFSName: "CATALPA PTY LTD",
    },
    {
      AFSNumber: "530682",
      AFSName: "VASCO CUSTODIANS PTY LTD",
    },
    {
      AFSNumber: "530707",
      AFSName: "PENTAGON ADVISORY PTY LTD",
    },
    {
      AFSNumber: "530724",
      AFSName: "MSM LOSS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "530733",
      AFSName: "LOFTUS NOMINEES PTY LTD",
    },
    {
      AFSNumber: "530740",
      AFSName: "INTEGRATED CLAIMS SERVICES PTY LTD",
    },
    {
      AFSNumber: "530748",
      AFSName: "CLAIMS MANAGEMENT AUSTRALASIA PTY LTD",
    },
    {
      AFSNumber: "530784",
      AFSName: "NICHE INSURANCE PTY LTD",
    },
    {
      AFSNumber: "530789",
      AFSName: "PICTURE WEALTH ADVISORY PTY LTD",
    },
    {
      AFSNumber: "530811",
      AFSName: "HANNOVER LIFE RE OF AUSTRALASIA LTD",
    },
    {
      AFSNumber: "530816",
      AFSName: "CRAWFORD & COMPANY (AUSTRALIA) PTY. LTD.",
    },
    {
      AFSNumber: "530823",
      AFSName: "SOLVD GROUP AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "530839",
      AFSName: "STEADFAST CLAIMS SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "530842",
      AFSName: "LIBERTY MUTUAL INSURANCE COMPANY",
    },
    {
      AFSNumber: "530849",
      AFSName: "ADVENT INSURANCE MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "530851",
      AFSName: "DWF CLAIMS (AUSTRALIA) PTY LIMITED",
    },
    {
      AFSNumber: "530859",
      AFSName: "RISKSMART CLAIMS SOLUTIONS PTY LIMITED",
    },
    {
      AFSNumber: "530867",
      AFSName: "GALLAGHER BASSETT SERVICES PTY LTD",
    },
    {
      AFSNumber: "530875",
      AFSName: "EMPLOYERS MUTUAL LIMITED",
    },
    {
      AFSNumber: "530877",
      AFSName: "EML SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "530878",
      AFSName: "EMPLOYERS MUTUAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "530884",
      AFSName: "THE PROCARE GROUP PTY LTD",
    },
    {
      AFSNumber: "530885",
      AFSName: "PROCLAIM MANAGEMENT SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "530887",
      AFSName: "CLAIMS MANAGEMENT INTERNATIONAL PTY LTD",
    },
    {
      AFSNumber: "530893",
      AFSName: "ALTERNATIVE RISK MANAGEMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "530894",
      AFSName: "CLAIMS X PTY LTD",
    },
    {
      AFSNumber: "530895",
      AFSName: "CLAIMO PTY LTD",
    },
    {
      AFSNumber: "530897",
      AFSName: "TOPAZ CLAIMS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "530898",
      AFSName: "SEDGWICK AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "530900",
      AFSName: "SOMPO JAPAN INSURANCE INC.",
    },
    {
      AFSNumber: "530925",
      AFSName: "CLAIMSCO PTY LTD",
    },
    {
      AFSNumber: "530939",
      AFSName: "PEMBA CAPITAL NOMINEES PTY LTD",
    },
    {
      AFSNumber: "530957",
      AFSName: "MACKWELL CAPITAL LIMITED",
    },
    {
      AFSNumber: "530960",
      AFSName: "ARCO FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "530975",
      AFSName: "PWG SECURITIES PTY LTD",
    },
    {
      AFSNumber: "531009",
      AFSName: "TERRITORY PRIVATE PTY LTD",
    },
    {
      AFSNumber: "531027",
      AFSName: "MANTIS FUNDS SERVICES PTY LTD",
    },
    {
      AFSNumber: "531039",
      AFSName: "STORM SUPPORT SERVICES PTY LTD",
    },
    {
      AFSNumber: "531079",
      AFSName: "CITADEL SECURITIES AUSTRALIA TRADING PTY LIMITED",
    },
    {
      AFSNumber: "531084",
      AFSName: "MTJ WEALTH HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "531122",
      AFSName: "CREST WEALTH ADVICE PTY LTD",
    },
    {
      AFSNumber: "531137",
      AFSName: "CLAIMS ADVOCATE PTY LTD",
    },
    {
      AFSNumber: "531145",
      AFSName: "RAMPED PTY LTD",
    },
    {
      AFSNumber: "531197",
      AFSName: "POLAR 993 ADVISORY PTY LTD",
    },
    {
      AFSNumber: "531262",
      AFSName: "BWM LICENCE PTY LTD",
    },
    {
      AFSNumber: "531349",
      AFSName: "WELCOME (AUST) PTY LTD",
    },
    {
      AFSNumber: "531350",
      AFSName: "PARTNERSHIP HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "531406",
      AFSName: "COURT HOUSE CAPITAL MANAGEMENT LTD",
    },
    {
      AFSNumber: "531419",
      AFSName: "W.E. COX (AUSTRALASIA) PTY LTD",
    },
    {
      AFSNumber: "531480",
      AFSName: "MPF REPRESENTATIVES PTY LTD",
    },
    {
      AFSNumber: "531587",
      AFSName: "BELFAST WEALTH ADVICE PTY LTD",
    },
    {
      AFSNumber: "531610",
      AFSName: "SHEEHAN WEALTH PTY LTD",
    },
    {
      AFSNumber: "531652",
      AFSName: "OIF SERVICES PTY LTD",
    },
    {
      AFSNumber: "531680",
      AFSName: "KEEP INSURANCE CO PTY LTD",
    },
    {
      AFSNumber: "531681",
      AFSName: "PWS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "531701",
      AFSName: "LAZARD AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "531705",
      AFSName: "CLAIMS CONSULTING GROUP HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "531729",
      AFSName: "YP SECURITIES LIMITED",
    },
    {
      AFSNumber: "531770",
      AFSName: "MARINE CONSULT PTY LTD",
    },
    {
      AFSNumber: "531845",
      AFSName: "MADIGAN FUNDS MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "531849",
      AFSName: "PBO FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "531891",
      AFSName: "CLAIM SOLUTIONS PTY. LTD.",
    },
    {
      AFSNumber: "531931",
      AFSName: "REGAL ADVICE PTY LTD",
    },
    {
      AFSNumber: "531934",
      AFSName: "TRIDENT CAPITAL GROUP PTY LTD",
    },
    {
      AFSNumber: "531943",
      AFSName: "MAREX FINANCIAL",
    },
    {
      AFSNumber: "531949",
      AFSName: "ZEPHYR CAPITAL PTY LTD",
    },
    {
      AFSNumber: "531982",
      AFSName: "SIXTY TWO GLOBAL PTY LTD",
    },
    {
      AFSNumber: "532049",
      AFSName: "MMXI PTY LTD",
    },
    {
      AFSNumber: "532061",
      AFSName: "HULME, TAYLOR EMILY",
    },
    {
      AFSNumber: "532064",
      AFSName: "OMEGA FINANCIAL STRATEGISTS PTY LTD",
    },
    {
      AFSNumber: "532141",
      AFSName: "TFS NATIONAL PTY LTD",
    },
    {
      AFSNumber: "532191",
      AFSName: "GLOBAL CARBON HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "532193",
      AFSName: "CRUZ FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "532199",
      AFSName: "ADVICE & WEALTH PARTNERS PTY LTD",
    },
    {
      AFSNumber: "532217",
      AFSName: "MSM CLAIMS HANDLING PTY LTD",
    },
    {
      AFSNumber: "532226",
      AFSName: "ROCKTON PTY LTD",
    },
    {
      AFSNumber: "532231",
      AFSName: "KERR & HOLLAND PTY. LIMITED",
    },
    {
      AFSNumber: "532247",
      AFSName: "DECADE PARTNERS PTY LTD",
    },
    {
      AFSNumber: "532260",
      AFSName: "GUAVA LIME CAPITAL PTY LTD",
    },
    {
      AFSNumber: "532286",
      AFSName: "TW LICENSEE SERVICES PTY LTD",
    },
    {
      AFSNumber: "532360",
      AFSName: "COMBINE INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "532361",
      AFSName: "ASSESSDIRECT PTY LTD",
    },
    {
      AFSNumber: "532368",
      AFSName: "MAXIM BUILDING PTY LTD",
    },
    {
      AFSNumber: "532369",
      AFSName: "FINANCIAL DESIGN GROUP PTY LTD",
    },
    {
      AFSNumber: "532389",
      AFSName: "SULLIVAN GLOBAL PTY LTD",
    },
    {
      AFSNumber: "532413",
      AFSName: "GET MY REFUND PTY LTD",
    },
    {
      AFSNumber: "532417",
      AFSName: "MARTIN MINETT PTY LIMITED",
    },
    {
      AFSNumber: "532426",
      AFSName: "WHEATLEY WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "532429",
      AFSName: "MHN ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "532431",
      AFSName: "A.J. GRANT BUILDING PTY LTD",
    },
    {
      AFSNumber: "532459",
      AFSName: "BNP PARIBAS FINANCIAL MARKETS",
    },
    {
      AFSNumber: "532467",
      AFSName: "MCLARENS HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "532487",
      AFSName: "LIFE MATTERS CLAIMS PTY LTD",
    },
    {
      AFSNumber: "532496",
      AFSName: "MASTERY CLAIMS MANAGEMENT SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "532509",
      AFSName: "A AND R INSURANCE MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "532517",
      AFSName: "INDIGO VEHICLE SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "532532",
      AFSName: "INTEGRITY INSURANCE SERVICES PTY LTD",
    },
    {
      AFSNumber: "532540",
      AFSName: "PICNIC LICENSING PTY LTD",
    },
    {
      AFSNumber: "532544",
      AFSName: "EASY HAIL CLAIM PTY LTD",
    },
    {
      AFSNumber: "532545",
      AFSName: "ALTIVE LIMITED",
    },
    {
      AFSNumber: "532565",
      AFSName: "WALSH CAPITAL AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "532567",
      AFSName: "3PD PTY LIMITED",
    },
    {
      AFSNumber: "532643",
      AFSName: "PARC CAPITAL INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "532718",
      AFSName: "TOORONGA ADVISORY GROUP PTY LTD",
    },
    {
      AFSNumber: "532796",
      AFSName: "ARBITRIUM CREDIT PARTNERS PTY LTD",
    },
    {
      AFSNumber: "532878",
      AFSName: "ZUPPE INTERNATIONAL PTY LIMITED",
    },
    {
      AFSNumber: "532917",
      AFSName: "ACRES FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "532918",
      AFSName: "PALLADIA LICENSEE SERVICES PTY LTD",
    },
    {
      AFSNumber: "532931",
      AFSName: "EIA ADVISORY PTY LTD",
    },
    {
      AFSNumber: "532976",
      AFSName: "SECURE ADVICE PTY LTD",
    },
    {
      AFSNumber: "533055",
      AFSName: "FISH TACOS PTY LTD",
    },
    {
      AFSNumber: "533092",
      AFSName: "GPT PLATFORM PTY LIMITED",
    },
    {
      AFSNumber: "533207",
      AFSName: "INTEGRITY WEALTH SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "533212",
      AFSName: "GEOMETRICA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "533233",
      AFSName: "OCEANA LICENSEE PTY LTD",
    },
    {
      AFSNumber: "533273",
      AFSName: "SOMAR MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "533278",
      AFSName: "FORIS CAPITAL AU PTY LTD",
    },
    {
      AFSNumber: "533284",
      AFSName: "FINANCIAL LIFESTYLE PARTNERS (NORTH VIC) PTY. LTD.",
    },
    {
      AFSNumber: "533297",
      AFSName: "NORTHPOINT INVESTMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "533317",
      AFSName: "GONDWANA GROUP LIMITED",
    },
    {
      AFSNumber: "533383",
      AFSName: "BOARDROOM PTY LIMITED",
    },
    {
      AFSNumber: "533442",
      AFSName: "CLEAR WEALTH PLANNERS PTY LTD",
    },
    {
      AFSNumber: "533443",
      AFSName: "STROPRO COMPLIANCE PTY LTD",
    },
    {
      AFSNumber: "533463",
      AFSName: "LONDON PAY PTY LTD",
    },
    {
      AFSNumber: "533468",
      AFSName: "CURVE WEALTH PTY LTD",
    },
    {
      AFSNumber: "533476",
      AFSName: "CORE INDEPENDENT FINANCIAL ADVICE PTY LTD",
    },
    {
      AFSNumber: "533530",
      AFSName: "CYBERSIDE INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "533532",
      AFSName: "COLLINS WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "533555",
      AFSName: "TRIMONT REA AU PTY LIMITED",
    },
    {
      AFSNumber: "533594",
      AFSName: "HALE CAPITAL FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "533631",
      AFSName: "LIGHTHOUSE ADVICE GROUP PTY LTD",
    },
    {
      AFSNumber: "533661",
      AFSName: "ASIRE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "533675",
      AFSName: "PROSPERITY WEALTH ADVISORY SERVICES PTY LTD",
    },
    {
      AFSNumber: "533684",
      AFSName: "IMPARTIAL FINANCIAL ADVISERS PTY LTD",
    },
    {
      AFSNumber: "533719",
      AFSName: "FORZA WEALTH PTY LTD",
    },
    {
      AFSNumber: "533762",
      AFSName: "BEE FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "533763",
      AFSName: "NEOWEALTH GROUP PTY LTD",
    },
    {
      AFSNumber: "533776",
      AFSName: "MERLYN LICENCING PTY LTD",
    },
    {
      AFSNumber: "533816",
      AFSName: "CUBE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "533827",
      AFSName: "LIFE EXPERTS PTY LTD",
    },
    {
      AFSNumber: "533828",
      AFSName: "OX CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "533841",
      AFSName: "WAYFINDER CAPITAL MANAGERS PTY LTD",
    },
    {
      AFSNumber: "533856",
      AFSName: "AGL FINANCIAL ENERGY SOLUTIONS PTY LIMITED",
    },
    {
      AFSNumber: "533862",
      AFSName: "AKRJ FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "533901",
      AFSName: "SMART FINANCIAL CAPITAL PTY LTD",
    },
    {
      AFSNumber: "533923",
      AFSName: "SENSIBLY PTY LTD",
    },
    {
      AFSNumber: "533927",
      AFSName: "NORTHMORE GORDON ENVIRONMENTAL PTY LTD",
    },
    {
      AFSNumber: "533936",
      AFSName: "WESTBRIDGE FUNDS PTY LTD",
    },
    {
      AFSNumber: "533937",
      AFSName: "SOCKEYE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "533938",
      AFSName: "CAPITAL PLUS 1 PTY LTD",
    },
    {
      AFSNumber: "534006",
      AFSName: "BENDIGO SUPERANNUATION PTY LTD",
    },
    {
      AFSNumber: "534023",
      AFSName: "INSURANCE ADJUSTING SERVICES PTY LTD",
    },
    {
      AFSNumber: "534041",
      AFSName: "BRIGHTPATH FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "534073",
      AFSName: "MACKAY PRIVATE PARTNERS PTY LTD",
    },
    {
      AFSNumber: "534108",
      AFSName: "INVESTA CUSTODIAN (1) PTY LTD",
    },
    {
      AFSNumber: "534213",
      AFSName: "DRUMMOND CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "534248",
      AFSName: "CSIRO CUSTODIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "534281",
      AFSName: "ZELLER AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "534289",
      AFSName: "W. WIGHTMAN INVESTMENT PARTNERS PTY LTD.",
    },
    {
      AFSNumber: "534310",
      AFSName: "PAC FINANCIAL PTY. LTD.",
    },
    {
      AFSNumber: "534355",
      AFSName: "ISLAMIC MONEY AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "534358",
      AFSName: "MONT WEALTH ADVISORS PTY LTD",
    },
    {
      AFSNumber: "534366",
      AFSName: "ASSETZ WEALTH PTY LTD",
    },
    {
      AFSNumber: "534384",
      AFSName: "WORLDPAY PTY LTD",
    },
    {
      AFSNumber: "534400",
      AFSName: "EDGE FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "534407",
      AFSName: "MACCAP COMPLIANCE PTY LTD",
    },
    {
      AFSNumber: "534455",
      AFSName: "EQUITY ANALYST PTY LTD",
    },
    {
      AFSNumber: "534466",
      AFSName: "HINDSIGHT GROUP PTY LTD",
    },
    {
      AFSNumber: "534499",
      AFSName: "STELLAR GLOBAL CAPITAL PTY LTD",
    },
    {
      AFSNumber: "534501",
      AFSName: "AUS FINANCIAL ADVISERS PTY LTD",
    },
    {
      AFSNumber: "534525",
      AFSName: "ARGENT WEALTH LICENSING PTY LTD",
    },
    {
      AFSNumber: "534567",
      AFSName: "SUPER FIERCE PTY LTD",
    },
    {
      AFSNumber: "534569",
      AFSName: "LBW WEALTH PTY LTD",
    },
    {
      AFSNumber: "534584",
      AFSName: "ARC FUNDS OPERATIONS PTY LTD",
    },
    {
      AFSNumber: "534602",
      AFSName: "ALLMAN FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "534626",
      AFSName: "INTUITIVE ADVICE GROUP PTY LTD",
    },
    {
      AFSNumber: "534637",
      AFSName: "TELSTRA ENERGY (MARKETS) PTY LTD",
    },
    {
      AFSNumber: "534669",
      AFSName: "CK WEALTH SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "534815",
      AFSName: "AFFIRMATIVE INVESTMENT MANAGEMENT PARTNERS LIMITED",
    },
    {
      AFSNumber: "534843",
      AFSName: "MIRVAC FUNDS MANAGEMENT AUSTRALIA LIMITED",
    },
    {
      AFSNumber: "534880",
      AFSName: "QIC INFRASTRUCTURE MANAGEMENT NO. 2 PTY LTD",
    },
    {
      AFSNumber: "534881",
      AFSName: "QIC INFRASTRUCTURE MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "534882",
      AFSName: "QIC INVESTMENTS NO. 1 PTY LTD",
    },
    {
      AFSNumber: "534883",
      AFSName: "QIC INVESTMENTS NO. 2 PTY LTD",
    },
    {
      AFSNumber: "534884",
      AFSName: "QIC INVESTMENTS NO. 3 PTY LTD",
    },
    {
      AFSNumber: "534885",
      AFSName: "QIC RETAIL PTY LTD",
    },
    {
      AFSNumber: "534886",
      AFSName: "QIC ACTIVE RETAIL PROPERTY FUND TT COMPANY PTY LTD",
    },
    {
      AFSNumber: "534887",
      AFSName: "QIC AUSTRALIA CORE PLUS FUND TT COMPANY PTY LTD",
    },
    {
      AFSNumber: "534888",
      AFSName: "QIC OFFICE FUND TT COMPANY PTY LTD",
    },
    {
      AFSNumber: "534889",
      AFSName: "QIC PROPERTY FUND TT COMPANY PTY LTD",
    },
    {
      AFSNumber: "534890",
      AFSName: "QIC TOWN CENTRE FUND TT COMPANY PTY LTD",
    },
    {
      AFSNumber: "534901",
      AFSName: "CHANGE FINANCIAL PAYMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "534968",
      AFSName: "ARCADIA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "534971",
      AFSName: "FINTEGRITY WEALTH ADVISERS PTY LTD",
    },
    {
      AFSNumber: "534974",
      AFSName: "COSGROVE GROUP PTY LTD",
    },
    {
      AFSNumber: "534976",
      AFSName: "CCCFS PTY LTD",
    },
    {
      AFSNumber: "534982",
      AFSName: "BUGDEN WEALTH SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "534999",
      AFSName: "GUIDANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "535001",
      AFSName: "GLOW FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "535002",
      AFSName: "GLOW INVESTMENT MANAGERS PTY LTD",
    },
    {
      AFSNumber: "535023",
      AFSName: "CORE WEALTH GROUP PTY LTD",
    },
    {
      AFSNumber: "535047",
      AFSName: "IQ FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "535090",
      AFSName: "PARC WEALTH GROUP PTY LTD",
    },
    {
      AFSNumber: "535095",
      AFSName: "ONE LICENCE PTY LTD",
    },
    {
      AFSNumber: "535106",
      AFSName: "ENERGYX SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "535126",
      AFSName: "WEALTH SERVICES PARTNERS PTY LTD",
    },
    {
      AFSNumber: "535218",
      AFSName: "CONTEXT GROUP PTY LTD",
    },
    {
      AFSNumber: "535240",
      AFSName: "MCALLISTER WEALTH GROUP PTY LTD",
    },
    {
      AFSNumber: "535248",
      AFSName: "CORNERSTONE HEALTHCARE FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "535263",
      AFSName: "EXCALIBUR WEALTH GROUP PTY LTD",
    },
    {
      AFSNumber: "535284",
      AFSName: "SHOREBEAM AUSTRALIA FINANCIAL SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "535303",
      AFSName: "SFC MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "535344",
      AFSName: "HILLS FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "535371",
      AFSName: "PAYNOW TECHNOLOGY PTY LTD",
    },
    {
      AFSNumber: "535390",
      AFSName: "DILIGENT FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "535397",
      AFSName: "PELLUCID WEALTH PTY LTD",
    },
    {
      AFSNumber: "535427",
      AFSName: "DIA LICENCE PTY LTD",
    },
    {
      AFSNumber: "535439",
      AFSName: "BLUE CHIP FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "535443",
      AFSName: "GARDIAN FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "535456",
      AFSName: "OXLADE FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "535484",
      AFSName: "PFP FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "535500",
      AFSName: "STARA INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "535509",
      AFSName: "AUDITCOVER AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "535544",
      AFSName: "HIDDEN ROAD PARTNERS CIV UK LTD",
    },
    {
      AFSNumber: "535586",
      AFSName: "GATEWAY CAPITAL INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "535601",
      AFSName: "PLENARY FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "535613",
      AFSName: "AMBER FUND MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "535619",
      AFSName: "PARAGON WEALTH NOMINEES PTY LTD",
    },
    {
      AFSNumber: "535620",
      AFSName: "BLACKBIRD FUND SERVICES PTY LTD",
    },
    {
      AFSNumber: "535632",
      AFSName: "RIGHTTRAC FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "535653",
      AFSName: "O'KANE INVESTMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "535700",
      AFSName: "KUTTABUL CAPITAL MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "535701",
      AFSName: "WOODSIDE ENERGY (FINANCIAL ADVISORY SERVICES) PTY LTD",
    },
    {
      AFSNumber: "535750",
      AFSName: "VALIANT FLB PTY LTD",
    },
    {
      AFSNumber: "535781",
      AFSName: "TOUCHPOINT FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "535838",
      AFSName: "NONGHYUP BANK",
    },
    {
      AFSNumber: "535844",
      AFSName: "OPAL CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "535848",
      AFSName: "PROVINCIAL WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "535887",
      AFSName: "BLUEBERRY AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "535889",
      AFSName: "INSURANCE & SUPERANNUATION ADMINISTRATION SERVICES PTY LTD",
    },
    {
      AFSNumber: "535976",
      AFSName: "ASFIN FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "535978",
      AFSName: "ARMADA WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "535997",
      AFSName: "STRATEGIC FINANCIAL ADVISERS PTY. LTD.",
    },
    {
      AFSNumber: "536012",
      AFSName: "PROSPA ADVANCE PTY LTD",
    },
    {
      AFSNumber: "536049",
      AFSName: "INTEGRATED PATHWAYS FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "536053",
      AFSName: "MB CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "536068",
      AFSName: "COACH INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "536082",
      AFSName: "STOCKSPOT PTY LTD",
    },
    {
      AFSNumber: "536083",
      AFSName: "ARES MANAGEMENT ASIA (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "536093",
      AFSName: "VISA AUSTRALIA SERVICES PTY LTD",
    },
    {
      AFSNumber: "536120",
      AFSName: "HLB MANN JUDD WM (SA) PTY LTD",
    },
    {
      AFSNumber: "536203",
      AFSName: "WE ALL COUNT WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "536279",
      AFSName: "LANCASHIRE UNDERWRITING AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "536280",
      AFSName: "BATTLEFACE INSURANCE SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "536301",
      AFSName: "FUTURE WEALTH ADVISORY PTY LTD",
    },
    {
      AFSNumber: "536305",
      AFSName: "GROWTHPOINT FUNDS MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "536315",
      AFSName: "BETACARBON PTY LTD",
    },
    {
      AFSNumber: "536347",
      AFSName: "FERROFUNDS PTY LTD",
    },
    {
      AFSNumber: "536535",
      AFSName: "REGIONAL WEALTH PTY LTD",
    },
    {
      AFSNumber: "536536",
      AFSName: "GRANGE RISK SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "536542",
      AFSName: "ASVW CAPITAL PTY LTD",
    },
    {
      AFSNumber: "536603",
      AFSName: "NEWTON ADVISORY PARTNERS PTY LTD",
    },
    {
      AFSNumber: "536651",
      AFSName: "THEPETINSURANCECOMPANY.COM.AU PTY LTD",
    },
    {
      AFSNumber: "536661",
      AFSName: "JARRAH BRIDGE PTY LTD",
    },
    {
      AFSNumber: "536679",
      AFSName: "MK3 PTY. LIMITED",
    },
    {
      AFSNumber: "536684",
      AFSName: "LEDA LICENSING PTY LTD",
    },
    {
      AFSNumber: "536693",
      AFSName: "CATALYST FUNDS MANAGEMENT LH PTY LTD",
    },
    {
      AFSNumber: "536745",
      AFSName: "ARROW FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "536776",
      AFSName: "TRUE INFRASTRUCTURE MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "536825",
      AFSName: "CBL MARKETS (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "536826",
      AFSName: "IC ADVICE PTY LTD",
    },
    {
      AFSNumber: "536830",
      AFSName: "ASYMMETRIC ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "536864",
      AFSName: "APPROVED FINANCIAL PLANNERS PTY LTD",
    },
    {
      AFSNumber: "536915",
      AFSName: "ASSETLY AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "536933",
      AFSName: "HARLEN FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "536937",
      AFSName: "DATUS WEALTH PTY LTD",
    },
    {
      AFSNumber: "536941",
      AFSName: "ARGYLE INSURANCE PTY LTD",
    },
    {
      AFSNumber: "536957",
      AFSName: "ARKTOS SECURITIES PTY LTD",
    },
    {
      AFSNumber: "536958",
      AFSName: "OPG TC HOLDING PTY LTD",
    },
    {
      AFSNumber: "536960",
      AFSName: "FINEX WEALTH PTY LTD",
    },
    {
      AFSNumber: "536964",
      AFSName: "F.P.D SOLUTIONS (AUST) PTY LTD",
    },
    {
      AFSNumber: "536966",
      AFSName: "SUSTAINABLE LIFE SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "536975",
      AFSName: "PLATA CAPITAL AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "536980",
      AFSName: "WEBULL SECURITIES (AUSTRALIA) PTY. LTD.",
    },
    {
      AFSNumber: "536983",
      AFSName: "MBS ADVICE LICENCE PTY LTD",
    },
    {
      AFSNumber: "536984",
      AFSName: "BANO PTY LTD",
    },
    {
      AFSNumber: "537019",
      AFSName: "DOLPHIN TECHNOLOGY PTY LTD",
    },
    {
      AFSNumber: "537043",
      AFSName: "PENINSULA WEALTH & FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "537046",
      AFSName: "MOLOKAI CAPITAL PTY LTD",
    },
    {
      AFSNumber: "537088",
      AFSName: "C CAPITAL FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "537091",
      AFSName: "COLLISION SAFETY CONSULTANTS NSW PTY LTD",
    },
    {
      AFSNumber: "537104",
      AFSName: "BAYLEY STUART FUNDS MANAGEMENT LTD",
    },
    {
      AFSNumber: "537118",
      AFSName: "PHASE3WEALTH PTY LTD",
    },
    {
      AFSNumber: "537119",
      AFSName: "SHIFT FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "537192",
      AFSName: "FRAIS CAPITAL GROUP PTY LTD",
    },
    {
      AFSNumber: "537318",
      AFSName: "DURANT WYOT FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "537339",
      AFSName: "CORAL COAST ADVICE PTY LTD",
    },
    {
      AFSNumber: "537363",
      AFSName: "AUSTRALIAN COLLECTIVE INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "537399",
      AFSName: "RISE WEALTH GROUP PTY LTD",
    },
    {
      AFSNumber: "537415",
      AFSName: "MY WEALTH GARDEN PTY LTD",
    },
    {
      AFSNumber: "537442",
      AFSName: "DESCARTES UNDERWRITING AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "537452",
      AFSName: "INVESTMENT & RETIREMENT SERVICES PTY LTD",
    },
    {
      AFSNumber: "537458",
      AFSName: "WP WEALTH PROFESSIONALS PTY LTD",
    },
    {
      AFSNumber: "537462",
      AFSName: "SIMPLE FINANCIAL CHOICES PTY LTD",
    },
    {
      AFSNumber: "537472",
      AFSName: "VISIA LICENSEE SERVICES PTY LTD",
    },
    {
      AFSNumber: "537486",
      AFSName: "INTERGENERATIONAL WEALTH GROUP PTY LTD",
    },
    {
      AFSNumber: "537488",
      AFSName: "CORNERSTONE WEALTH SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "537530",
      AFSName: "STK MARKETS PTY LTD",
    },
    {
      AFSNumber: "537552",
      AFSName: "MY CLAIM CONSULTING PTY LTD",
    },
    {
      AFSNumber: "537616",
      AFSName: "SULEJMAN CLAIMS PTY LTD",
    },
    {
      AFSNumber: "537645",
      AFSName: "AZUPAY TRADING PTY LTD",
    },
    {
      AFSNumber: "537646",
      AFSName: "EZI POWER FINANCE ADMINISTRATION PTY LTD",
    },
    {
      AFSNumber: "537666",
      AFSName: "ARES AUSTRALIA MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "537864",
      AFSName: "GLIDE DIGITAL PTY LTD",
    },
    {
      AFSNumber: "537885",
      AFSName: "BAYSIDE LICENSEE PTY LTD",
    },
    {
      AFSNumber: "537916",
      AFSName: "ANOVA ADVICE GROUP PTY LTD",
    },
    {
      AFSNumber: "537941",
      AFSName: "GOSHAWK RISK CONSULTING PTY LTD",
    },
    {
      AFSNumber: "537992",
      AFSName: "H&H CAPITAL MORTGAGE FUND PTY LTD",
    },
    {
      AFSNumber: "537994",
      AFSName: "AINTREE GROUP WEALTH PTY LTD",
    },
    {
      AFSNumber: "537999",
      AFSName: "AXM SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "538004",
      AFSName: "C&L ADVISORY PTY LTD",
    },
    {
      AFSNumber: "538070",
      AFSName: "SMARTER CASHFLOW SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "538113",
      AFSName: "JARRA FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "538157",
      AFSName: "DEVON FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "538197",
      AFSName: "BP ENERGY AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "538287",
      AFSName: "EXPERT WEALTH PTY LTD",
    },
    {
      AFSNumber: "538364",
      AFSName: "NICHOLSON WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "538367",
      AFSName: "O&I WEALTH PTY LTD",
    },
    {
      AFSNumber: "538392",
      AFSName: "CAVENDISH PLACE CONSULTING PTY LTD",
    },
    {
      AFSNumber: "538408",
      AFSName: "PEMBERTON CAPITAL ADVISORS LLP",
    },
    {
      AFSNumber: "538411",
      AFSName: "GIBB GROUP CAPITAL PTY LTD",
    },
    {
      AFSNumber: "538432",
      AFSName: "CIIOR CC PTY LTD",
    },
    {
      AFSNumber: "538460",
      AFSName: "INTERCEPT INFORMATION SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "538461",
      AFSName: "VESTA FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "538479",
      AFSName: "LOCALVOLTS MERCHANT SERVICES PTY LTD",
    },
    {
      AFSNumber: "538489",
      AFSName: "BCA CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "538499",
      AFSName: "REDPAY PTY LTD",
    },
    {
      AFSNumber: "538513",
      AFSName: "GCQ FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "538528",
      AFSName: "CLOVER INSURANCE PTY LTD",
    },
    {
      AFSNumber: "538532",
      AFSName: "OMADA WEALTH PTY LTD",
    },
    {
      AFSNumber: "538537",
      AFSName: "MATRIX INTEGRATED PROFESSIONAL ADVICE PTY LTD",
    },
    {
      AFSNumber: "538550",
      AFSName: "MIKE BEAL PTY LTD",
    },
    {
      AFSNumber: "538563",
      AFSName: "BRAESIDE WEALTH PTY LTD",
    },
    {
      AFSNumber: "538619",
      AFSName: "NWG FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "538682",
      AFSName: "BANPU ENERGY AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "538708",
      AFSName: "FAST COVER PTY LTD",
    },
    {
      AFSNumber: "538821",
      AFSName: "MEGACAP PTY LTD",
    },
    {
      AFSNumber: "538833",
      AFSName: "WEALTH COLLECTIVE ADVISER SERVICES PTY LTD",
    },
    {
      AFSNumber: "538863",
      AFSName: "ZURICH ASSURE AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "538864",
      AFSName: "BANXLY INVESTMENT GROUP PTY LTD",
    },
    {
      AFSNumber: "538868",
      AFSName: "INGENIOUS BROKERS PTY LTD",
    },
    {
      AFSNumber: "538916",
      AFSName: "WRIGHT EVANS WEALTH PTY LTD",
    },
    {
      AFSNumber: "538949",
      AFSName: "STATESMAN FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "539011",
      AFSName: "ICEHOUSE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "539037",
      AFSName: "CORE PRIVATE PTY LTD",
    },
    {
      AFSNumber: "539049",
      AFSName: "BAROLO INVESTMENT PARTNERS PTY LTD",
    },
    {
      AFSNumber: "539078",
      AFSName: "EXPERIENCE INSURANCE SERVICES PTY LTD",
    },
    {
      AFSNumber: "539094",
      AFSName: "OASIS FINANCIAL HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "539098",
      AFSName: "LUME FS PTY LTD",
    },
    {
      AFSNumber: "539116",
      AFSName: "VIXORY CAPITAL PTY LTD",
    },
    {
      AFSNumber: "539165",
      AFSName: "MONEYME TM PTY LTD",
    },
    {
      AFSNumber: "539218",
      AFSName: "ADVICE HOUSE PTY LTD",
    },
    {
      AFSNumber: "539236",
      AFSName: "HYGGE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "539244",
      AFSName: "APEX FSG PTY LTD",
    },
    {
      AFSNumber: "539273",
      AFSName: "BARON VANILLA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "539312",
      AFSName: "GEMLIFE FUNDS LIMITED",
    },
    {
      AFSNumber: "539352",
      AFSName: "POLLINATION FINANCIAL SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "539360",
      AFSName: "SECURE PORT PTY LTD",
    },
    {
      AFSNumber: "539386",
      AFSName: "ELLA ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "539391",
      AFSName: "SCA ADVISORY PTY LTD",
    },
    {
      AFSNumber: "539406",
      AFSName: "MFP SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "539555",
      AFSName: "OCP ASIA (AUSTRALIA) PTY LIMITED",
    },
    {
      AFSNumber: "539612",
      AFSName: "AUSTRALIA UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "539613",
      AFSName: "HOWDEN INSURANCE BROKERS (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "539661",
      AFSName: "FINANCIAL STREAMS SERVICES PTY LTD",
    },
    {
      AFSNumber: "539730",
      AFSName: "OCTAVIAN ADVISORS PTY LTD",
    },
    {
      AFSNumber: "539748",
      AFSName: "AFFINITY GROUP ADVISERS PTY LTD",
    },
    {
      AFSNumber: "539778",
      AFSName: "NS FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "539782",
      AFSName: "REDWOOD NORTH FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "539816",
      AFSName: "C6 INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "539846",
      AFSName: "COALITION INSURANCE SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "540052",
      AFSName: "AD ASTRA FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "540060",
      AFSName: "GFS MORTGAGE MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "540074",
      AFSName: "EQUANIMITY PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "540081",
      AFSName: "TENEO CAPITAL PTY LTD",
    },
    {
      AFSNumber: "540109",
      AFSName: "DENARAU ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "540132",
      AFSName: "PERIDOT INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "540185",
      AFSName: "EWL PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "540205",
      AFSName: "JUNO MARKETS PTY LTD",
    },
    {
      AFSNumber: "540233",
      AFSName: "SATTERLEY FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "540265",
      AFSName: "A.M. BEST ASIA-PACIFIC (SINGAPORE) PTE. LTD.",
    },
    {
      AFSNumber: "540290",
      AFSName: "PMC TREASURY LIMITED",
    },
    {
      AFSNumber: "540341",
      AFSName: "GUIDANCE ADVISERS PTY LTD",
    },
    {
      AFSNumber: "540368",
      AFSName: "NASH LC PTY LTD",
    },
    {
      AFSNumber: "540383",
      AFSName: "SPOTTER FINANCE PTY LTD",
    },
    {
      AFSNumber: "540394",
      AFSName: "WILSON AUTO INSURANCE PTY LTD",
    },
    {
      AFSNumber: "540418",
      AFSName: "APAC FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "540419",
      AFSName: "FINCAP CUSTODIANS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "540427",
      AFSName: "GALLIPOLI FUNERAL FUND LIMITED",
    },
    {
      AFSNumber: "540430",
      AFSName: "ARGENTEX PTY LTD",
    },
    {
      AFSNumber: "540514",
      AFSName: "HARBOURVEST PARTNERS (SINGAPORE) PTE. LTD.",
    },
    {
      AFSNumber: "540531",
      AFSName: "CCAFP WEALTH PTY LTD",
    },
    {
      AFSNumber: "540543",
      AFSName: "INVESTIFY PTY LTD",
    },
    {
      AFSNumber: "540551",
      AFSName: "ARROW CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "540553",
      AFSName: "6CAPITAL FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "540596",
      AFSName: "LWP CAPITAL PTY LTD",
    },
    {
      AFSNumber: "540626",
      AFSName: "TROON FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "540635",
      AFSName: "HUA MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "540646",
      AFSName: "AFFINITY CAPITAL GROUP PTY LTD",
    },
    {
      AFSNumber: "540697",
      AFSName: "EQUITY MATES MEDIA PTY LTD",
    },
    {
      AFSNumber: "540761",
      AFSName: "LINK ASSET MANAGEMENT (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "540762",
      AFSName: "FETCH PET HEALTH PTY LTD",
    },
    {
      AFSNumber: "540799",
      AFSName: "AURENDA PARTNERS HOLDINGS PTY LIMITED",
    },
    {
      AFSNumber: "540806",
      AFSName: "ORACLE ADVISORY GROUP PTY. LTD.",
    },
    {
      AFSNumber: "540818",
      AFSName: "TORICA FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "540840",
      AFSName: "NEW HOLLAND FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "540850",
      AFSName: "RENAISSANCE FINANCIAL ADVICE PTY LTD",
    },
    {
      AFSNumber: "540851",
      AFSName: "MIR MUCHBETTER AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "540870",
      AFSName: "APERTURE CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "540872",
      AFSName: "R&S WEALTH GROUP PTY LTD",
    },
    {
      AFSNumber: "540933",
      AFSName: "WISDOM TREE FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "540954",
      AFSName: "EVANITA PTY. LTD.",
    },
    {
      AFSNumber: "540986",
      AFSName: "CLEAR CLAIMS PTY LTD",
    },
    {
      AFSNumber: "541011",
      AFSName: "ZEPTO PAYMENTS PTY LTD",
    },
    {
      AFSNumber: "541026",
      AFSName: "SKALATA VENTURES PTY LTD",
    },
    {
      AFSNumber: "541038",
      AFSName: "AUSTGROUP FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "541043",
      AFSName: "AMPOL ENERGY (WHOLESALE) PTY LTD",
    },
    {
      AFSNumber: "541102",
      AFSName: "ALPHA FX LIMITED",
    },
    {
      AFSNumber: "541106",
      AFSName: "CLOVER FINANCIAL SERVICES PTY. LTD.",
    },
    {
      AFSNumber: "541122",
      AFSName: "TRADING 212 AU PTY LTD",
    },
    {
      AFSNumber: "541240",
      AFSName: "DAZZLING XCHANGE PTY LTD",
    },
    {
      AFSNumber: "541317",
      AFSName: "KBRZ CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "541327",
      AFSName: "PELLA GLOBAL PTY LIMITED",
    },
    {
      AFSNumber: "541328",
      AFSName: "WHEELHOUSE INVESTMENT PARTNERS PTY LTD",
    },
    {
      AFSNumber: "541336",
      AFSName: "BIG PICTURE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "541401",
      AFSName: "ALPINE FINANCIAL ADVICE PTY LTD",
    },
    {
      AFSNumber: "541421",
      AFSName: "AVENOR INVESTMENT PARTNERS PTY LTD",
    },
    {
      AFSNumber: "541482",
      AFSName: "BLUE CAPITAL (WA) PTY LTD",
    },
    {
      AFSNumber: "541581",
      AFSName: "5CAP PTY LTD",
    },
    {
      AFSNumber: "541587",
      AFSName: "WALSHE CLANCY O'NEILL FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "541642",
      AFSName: "CVC ASIA PACIFIC LIMITED",
    },
    {
      AFSNumber: "541681",
      AFSName: "248 GP MANAGERS PTY LIMITED",
    },
    {
      AFSNumber: "541736",
      AFSName: "GPT INVESTMENT MANAGEMENT LTD",
    },
    {
      AFSNumber: "541740",
      AFSName: "DNM INSURANCE SERVICES GROUP PTY LTD",
    },
    {
      AFSNumber: "541944",
      AFSName: "INTUITIVE SERVICES PTY LTD",
    },
    {
      AFSNumber: "541976",
      AFSName: "BOUGH FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "541984",
      AFSName: "GF ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "541991",
      AFSName: "STRATTON BUSINESS SERVICES PTY LTD",
    },
    {
      AFSNumber: "541997",
      AFSName: "BOWEN ADVICE SERVICE EXCHANGE PTY LTD",
    },
    {
      AFSNumber: "542056",
      AFSName: "AMAL FUND SERVICES LTD",
    },
    {
      AFSNumber: "542100",
      AFSName: "DATT CAPITAL PTY LTD",
    },
    {
      AFSNumber: "542188",
      AFSName: "P2P ADVICE PTY LTD",
    },
    {
      AFSNumber: "542245",
      AFSName: "QA INSURANCE PTY LTD",
    },
    {
      AFSNumber: "542262",
      AFSName: "JS ADVISORY GROUP PTY LTD",
    },
    {
      AFSNumber: "542285",
      AFSName: "CHARLES TAYLOR ADJUSTING (AUSTRALIA ) PTY LTD",
    },
    {
      AFSNumber: "542310",
      AFSName: "NATURAL ADVANTAGE PTY LTD",
    },
    {
      AFSNumber: "542326",
      AFSName: "TIPS POLARIS PTY LTD",
    },
    {
      AFSNumber: "542371",
      AFSName: "SMART FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "542418",
      AFSName: "PERIAPT ADVISORY PTY LTD",
    },
    {
      AFSNumber: "542428",
      AFSName: "ETERNITY GROUP (AUSTRALIA) PTY. LTD.",
    },
    {
      AFSNumber: "542429",
      AFSName: "GCP CONSULTING PTY LTD",
    },
    {
      AFSNumber: "542469",
      AFSName: "VOLANTE ANZ PTY LTD",
    },
    {
      AFSNumber: "542514",
      AFSName: "FOORD ASSET MANAGEMENT (SINGAPORE) PTE. LIMITED",
    },
    {
      AFSNumber: "542585",
      AFSName: "CS ENERGY FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "542660",
      AFSName: "AFSL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "542662",
      AFSName: "LIGHTBULB FINANCIAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "542757",
      AFSName: "QUBIK GLOBAL PTY LTD",
    },
    {
      AFSNumber: "542771",
      AFSName: "POINT KING CAPITAL FUND SERVICES PTY LTD",
    },
    {
      AFSNumber: "542821",
      AFSName: "BPM FIN PTY LTD",
    },
    {
      AFSNumber: "542842",
      AFSName: "OCEAN UNDERWRITING PTY LIMITED",
    },
    {
      AFSNumber: "542876",
      AFSName: "LATITUDE PRIVATE WEALTH LICENSEE SERVICES PTY LTD",
    },
    {
      AFSNumber: "542892",
      AFSName: "HS CONSORTIUM CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "542914",
      AFSName: "ATHENA INVESTMENT COMPANY PTY LTD",
    },
    {
      AFSNumber: "542923",
      AFSName: "FUNDS 4 U PTY LTD",
    },
    {
      AFSNumber: "542924",
      AFSName: "ANTLER FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "542944",
      AFSName: "AEI INSURANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "542956",
      AFSName: "AUSTWIDE FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "542958",
      AFSName: "CLEARPLAN LICENSING PTY LTD",
    },
    {
      AFSNumber: "542969",
      AFSName: "AVATARA BROKERS PTY LTD",
    },
    {
      AFSNumber: "542979",
      AFSName: "CANNY WEALTH SERVICES PTY LTD",
    },
    {
      AFSNumber: "543021",
      AFSName: "TRUE ALIGNMENT CAPITAL PTY LTD",
    },
    {
      AFSNumber: "543023",
      AFSName: "FINANCIAL ADVICE CO PTY LTD",
    },
    {
      AFSNumber: "543082",
      AFSName: "MODENA VENTURES PTY LTD",
    },
    {
      AFSNumber: "543084",
      AFSName: "EVERGLOBE PROPERTY PTY LTD",
    },
    {
      AFSNumber: "543135",
      AFSName: "ROYAL OAK AFSL PTY LIMITED",
    },
    {
      AFSNumber: "543158",
      AFSName: "NOVUS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "543198",
      AFSName: "DB5 ADVISERS PTY LTD",
    },
    {
      AFSNumber: "543251",
      AFSName: "OBT WEALTH SERVICES PTY LTD",
    },
    {
      AFSNumber: "543254",
      AFSName: "AHR PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "543267",
      AFSName: "ICF INSURANCE BROKERS (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "543296",
      AFSName: "CHAPTER AND CO PTY LTD",
    },
    {
      AFSNumber: "543328",
      AFSName: "SAGE IN TIME PTY LTD",
    },
    {
      AFSNumber: "543382",
      AFSName: "ABLE ADVICE PTY LTD",
    },
    {
      AFSNumber: "543386",
      AFSName: "EFFECTIVE TRADING SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "543396",
      AFSName: "WEALTHSPAN FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "543444",
      AFSName: "ABC INSURANCE PTY LTD",
    },
    {
      AFSNumber: "543481",
      AFSName: "CLOUDY HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "543482",
      AFSName: "REDWOOD FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "543486",
      AFSName: "FIRE DRAGON CAPITAL PTY LTD",
    },
    {
      AFSNumber: "543527",
      AFSName: "FP CONSULTING AFSL HOLDING PTY LTD",
    },
    {
      AFSNumber: "543639",
      AFSName: "DIMENSION IV WEALTH PARTNERS PTY LTD",
    },
    {
      AFSNumber: "543676",
      AFSName: "POLISEA PTY LTD",
    },
    {
      AFSNumber: "543693",
      AFSName: "4-4-2 CAPITAL PTY LTD",
    },
    {
      AFSNumber: "543696",
      AFSName: "STATIC INSURANCE PTY LTD",
    },
    {
      AFSNumber: "543698",
      AFSName: "YUNS FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "543715",
      AFSName: "RICHMOND BRIDGE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "543761",
      AFSName: "EAGLE STREET ADVISORY PTY LTD",
    },
    {
      AFSNumber: "543780",
      AFSName: "FROST, KYLE CLIFFORD",
    },
    {
      AFSNumber: "543788",
      AFSName: "FOCUS PARTNERS FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "543808",
      AFSName: "DISCOVERY WEALTH PTY LTD",
    },
    {
      AFSNumber: "543826",
      AFSName: "MHC & CO MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "543834",
      AFSName: "DNP FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "543842",
      AFSName: "ASHMORE INVESTMENT MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "543858",
      AFSName: "ALTERNATIVE CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "543879",
      AFSName: "WM MANAGEMENT AU PTY LTD",
    },
    {
      AFSNumber: "543907",
      AFSName: "G FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "543961",
      AFSName: "FOUNDATION CAPITAL (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "543994",
      AFSName: "PROPER INSURANCE PTY LTD",
    },
    {
      AFSNumber: "544106",
      AFSName: "AIRTREE VENTURES CUSTODY PTY LTD",
    },
    {
      AFSNumber: "544112",
      AFSName: "OCCASIO SECURITIES PTY LTD",
    },
    {
      AFSNumber: "544118",
      AFSName: "PRUDENTIA FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "544133",
      AFSName: "POLARIS AUSTRALIS CAPITAL PTY LTD",
    },
    {
      AFSNumber: "544155",
      AFSName: "DPWM FINANCIAL ADVICE PTY LTD",
    },
    {
      AFSNumber: "544230",
      AFSName: "ATWOOD GLOBAL INVESTORS PTY LTD",
    },
    {
      AFSNumber: "544232",
      AFSName: "PENINSULA MUTUAL LIMITED",
    },
    {
      AFSNumber: "544306",
      AFSName: "SAFETYCULTURE CARE AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "544310",
      AFSName: "ZONE ADVISORY PTY LTD",
    },
    {
      AFSNumber: "544311",
      AFSName: "SMW ADVISORY PTY LTD",
    },
    {
      AFSNumber: "544396",
      AFSName: "CANDOUR PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "544402",
      AFSName: "HARROW ROAD CAPITAL PTY LTD",
    },
    {
      AFSNumber: "544541",
      AFSName: "HASTINGS WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "544582",
      AFSName: "SYDNEY METRO PROPERTIES PTY LTD",
    },
    {
      AFSNumber: "544583",
      AFSName: "RTG CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "544624",
      AFSName: "WETRADE CAPITAL (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "544636",
      AFSName: "CROWN FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "544656",
      AFSName: "HOWDEN REINSURANCE BROKERS (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "544667",
      AFSName: "FINWEST WEALTH SERVICES PTY LTD",
    },
    {
      AFSNumber: "544672",
      AFSName: "SHANE TIBBS FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "544680",
      AFSName: "GBA CAPITAL HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "544717",
      AFSName: "TDM CUSTODIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "544723",
      AFSName: "LANYON RE SERVICES LIMITED",
    },
    {
      AFSNumber: "544735",
      AFSName: "YOU ONLY GET ONE LIFE PTY LTD",
    },
    {
      AFSNumber: "544749",
      AFSName: "A'VANT GUARD FINANCIAL GROUP PTY. LTD.",
    },
    {
      AFSNumber: "544785",
      AFSName: "WEALTHYER ADVICE ASSURANCE PTY LTD",
    },
    {
      AFSNumber: "544806",
      AFSName: "PRECINCT FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "544855",
      AFSName: "KR FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "544860",
      AFSName: "JKG SECURITIES LICENSING PTY LTD",
    },
    {
      AFSNumber: "544917",
      AFSName: "PROSPERITAS PARTNERS PTY. LTD.",
    },
    {
      AFSNumber: "544946",
      AFSName: "PGIM (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "544979",
      AFSName: "LELLCO PTY LTD",
    },
    {
      AFSNumber: "544987",
      AFSName: "KEOPS CAPITAL PTY LTD",
    },
    {
      AFSNumber: "544989",
      AFSName: "FINANCIAL MENTORS AFSL PTY LTD",
    },
    {
      AFSNumber: "545047",
      AFSName: "PACIFIC ENERGY TRADING PTY. LTD.",
    },
    {
      AFSNumber: "545056",
      AFSName: "PROVENANCE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "545082",
      AFSName: "PROBITAS 1492 (PACIFIC) PTY LTD",
    },
    {
      AFSNumber: "545124",
      AFSName: "BEAUFORT FIDUCIARIES PTY LTD",
    },
    {
      AFSNumber: "545212",
      AFSName: "MAISON FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "545218",
      AFSName: "REIMANN WEALTH PARTNERS PTY LTD",
    },
    {
      AFSNumber: "545222",
      AFSName: "KPW LICENSEE SERVICES PTY LTD",
    },
    {
      AFSNumber: "545226",
      AFSName: "PHOENIX PROPERTY INVESTORS (AUSTRALIA) LIMITED",
    },
    {
      AFSNumber: "545242",
      AFSName: "TIDAL VENTURES FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "545290",
      AFSName: "BAYSIDE INVEST LIMITED",
    },
    {
      AFSNumber: "545291",
      AFSName: "AP SECURITIES PTY LTD",
    },
    {
      AFSNumber: "545302",
      AFSName: "BRIGHTE HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "545313",
      AFSName: "SKYE MONEY PTY LTD",
    },
    {
      AFSNumber: "545324",
      AFSName: "WILLIAM BUCK CORPORATE FINANCE (VIC) PTY LTD",
    },
    {
      AFSNumber: "545328",
      AFSName: "GOLFIN PTY LTD",
    },
    {
      AFSNumber: "545329",
      AFSName: "TCW AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "545345",
      AFSName: "BARCAP FINANCE PTY LIMITED",
    },
    {
      AFSNumber: "545354",
      AFSName: "NICHOLSON FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "545361",
      AFSName: "ELEMENTAL WEALTH FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "545380",
      AFSName: "SECURE GROWTH PROPERTY FUNDS PTY LTD",
    },
    {
      AFSNumber: "545386",
      AFSName: "EMKC CUBED PTY LTD",
    },
    {
      AFSNumber: "545391",
      AFSName: "YONDR MONEY PTY LTD",
    },
    {
      AFSNumber: "545408",
      AFSName: "TRIBECA PRIVATE PTY LTD",
    },
    {
      AFSNumber: "545411",
      AFSName: "WISE AUSTRALIA INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "545485",
      AFSName: "SUNTOP FUND MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "545554",
      AFSName: "STRATHMORE INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "545559",
      AFSName: "DINA MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "545560",
      AFSName: "SPRING GOLD MARKET GROUP PTY LTD",
    },
    {
      AFSNumber: "545579",
      AFSName: "CULTIV8 FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "545641",
      AFSName: "PETROCHINA INTERNATIONAL (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "545687",
      AFSName: "HK FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "545804",
      AFSName: "AFSN PTY LTD",
    },
    {
      AFSNumber: "545863",
      AFSName: "DMG LICENSEE SERVICES PTY LTD",
    },
    {
      AFSNumber: "545884",
      AFSName: "HMW CAPITAL PTY LTD",
    },
    {
      AFSNumber: "545909",
      AFSName: "FEEL GOOD FINANCIAL AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "545910",
      AFSName: "JCE ADVISORY PTY LTD",
    },
    {
      AFSNumber: "545925",
      AFSName: "IMMERSVE PTY LTD",
    },
    {
      AFSNumber: "546006",
      AFSName: "BFS GROUP (SA) PTY LTD",
    },
    {
      AFSNumber: "546029",
      AFSName: "RIXON ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "546046",
      AFSName: "REMARA INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "546090",
      AFSName: "PVT CAPITAL PTY LTD",
    },
    {
      AFSNumber: "546157",
      AFSName: "INSTANTIAPAY PTY LTD",
    },
    {
      AFSNumber: "546217",
      AFSName: "EVIDENTIA FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "546246",
      AFSName: "KEYVIEW INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "546248",
      AFSName: "EUREE ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "546257",
      AFSName: "BRIEFCASE PTY LTD",
    },
    {
      AFSNumber: "546278",
      AFSName: "REAL WORLD ASSETS PROPRIETARY LIMITED",
    },
    {
      AFSNumber: "546280",
      AFSName: "TRUE WEALTH FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "546325",
      AFSName: "VECTOR PROPERTY AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "546441",
      AFSName: "KARDINIA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "546444",
      AFSName: "CLEARLIFE LICENSING PTY LTD",
    },
    {
      AFSNumber: "546487",
      AFSName: "SEED FIELD INVESTMENT PTY LTD",
    },
    {
      AFSNumber: "546505",
      AFSName: "TYLER CAPITAL PTY LTD",
    },
    {
      AFSNumber: "546561",
      AFSName: "HIGHVIEW WEALTH SOLUTIONS (AUST) PTY LTD",
    },
    {
      AFSNumber: "546569",
      AFSName: "VOLTAIC CAPITAL PTY LTD",
    },
    {
      AFSNumber: "546581",
      AFSName: "COMPOUND FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "546596",
      AFSName: "PRECISION FUNDS MANAGEMENT PTY. LTD.",
    },
    {
      AFSNumber: "546603",
      AFSName: "PENNYWISE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "546614",
      AFSName: "HAUGESUND PTY LTD",
    },
    {
      AFSNumber: "546642",
      AFSName: "YARRAPORT CAPITAL PTY LTD",
    },
    {
      AFSNumber: "546799",
      AFSName: "MARIN FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "546819",
      AFSName: "MCCONAGHY SECURITIES PTY LTD",
    },
    {
      AFSNumber: "546987",
      AFSName: "NEWADVICE PTY LIMITED",
    },
    {
      AFSNumber: "546992",
      AFSName: "SC FINANCIAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "547020",
      AFSName: "EPAY AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "547049",
      AFSName: "BOMBORA LICENSEE PTY LTD",
    },
    {
      AFSNumber: "547072",
      AFSName: "DIVGRO SERVICES PTY LTD",
    },
    {
      AFSNumber: "547110",
      AFSName: "REDWHEEL AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "547119",
      AFSName: "NDLI PTY LIMITED",
    },
    {
      AFSNumber: "547129",
      AFSName: "DOMO INSURANCE PTY LTD",
    },
    {
      AFSNumber: "547150",
      AFSName: "ENVIRONMENTAL MARKETS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "547160",
      AFSName: "SIMPLIFY LICENSING PTY LTD",
    },
    {
      AFSNumber: "547193",
      AFSName: "EMERALD WEALTH PTY LTD",
    },
    {
      AFSNumber: "547197",
      AFSName: "AUBURN CAPITAL PTY LTD",
    },
    {
      AFSNumber: "547262",
      AFSName: "ELVEST CO PTY LIMITED",
    },
    {
      AFSNumber: "547263",
      AFSName: "ANTIPODEAN PRIVATE PTY LTD",
    },
    {
      AFSNumber: "547270",
      AFSName: "SIG EVERGREEN TRADING PTY LTD",
    },
    {
      AFSNumber: "547310",
      AFSName: "FINDER.COM.AU PTY LTD",
    },
    {
      AFSNumber: "547355",
      AFSName: "SYDNEY FINANCIAL CENTER PTY. LTD.",
    },
    {
      AFSNumber: "547401",
      AFSName: "IPW WHOLESALE PTY LTD",
    },
    {
      AFSNumber: "547454",
      AFSName: "FINLIT PTY LTD",
    },
    {
      AFSNumber: "547457",
      AFSName: "SECURITAS FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "547554",
      AFSName: "CU FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "547617",
      AFSName: "BLACKWATTLE LICENSING PTY LTD",
    },
    {
      AFSNumber: "547622",
      AFSName: "VIVA WEALTH FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "547677",
      AFSName: "ACACIA CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "547681",
      AFSName: "LIQUIDISE LIMITED",
    },
    {
      AFSNumber: "547749",
      AFSName: "SMSF WEALTH LICENSING PTY LTD",
    },
    {
      AFSNumber: "547759",
      AFSName: "AQWIRE WEALTH PTY LTD",
    },
    {
      AFSNumber: "547820",
      AFSName: "WEALTH DIFFERENTLY PTY LTD",
    },
    {
      AFSNumber: "547826",
      AFSName: "YOU FIRST STRATEGY PTY LTD",
    },
    {
      AFSNumber: "547939",
      AFSName: "AUSTRALIAN GA SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "547945",
      AFSName: "ONE MILE INVESTMENT GROUP PTY LTD",
    },
    {
      AFSNumber: "548020",
      AFSName: "MARILLION HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "548038",
      AFSName: "ROADNIGHT FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "548095",
      AFSName: "FUTURE FORWARD FUNDS PTY LTD",
    },
    {
      AFSNumber: "548196",
      AFSName: "STAKESHOP AFSL PTY LTD",
    },
    {
      AFSNumber: "548231",
      AFSName: "OZWIDE AFSL PTY LTD",
    },
    {
      AFSNumber: "548263",
      AFSName: "ARCHER WEALTH CAPITAL PTY LTD",
    },
    {
      AFSNumber: "548344",
      AFSName: "SEED WEALTH AUSTRALIA FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "548347",
      AFSName: "ORDE SECURITISATION MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "548360",
      AFSName: "CUSTOMISED FINANCIAL PTY LIMITED",
    },
    {
      AFSNumber: "548370",
      AFSName: "ADVISORY LMC PTY LTD",
    },
    {
      AFSNumber: "548371",
      AFSName: "BMG FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "548383",
      AFSName: "HOLMES MARINE ASSESSING PTY LTD",
    },
    {
      AFSNumber: "548392",
      AFSName: "LANDEN FUNDS AFSL LTD",
    },
    {
      AFSNumber: "548394",
      AFSName: "THE CJ PARTNERSHIP PTY LTD",
    },
    {
      AFSNumber: "548401",
      AFSName: "LINKED FUND MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "548419",
      AFSName: "VAS FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "548573",
      AFSName: "62 CONSULTING PTY LTD",
    },
    {
      AFSNumber: "548586",
      AFSName: "KLAY CAPITAL PTY LTD",
    },
    {
      AFSNumber: "548613",
      AFSName: "TAPANDA GROUP PTY LTD",
    },
    {
      AFSNumber: "548668",
      AFSName: "ALLIED WORLD ASSURANCE COMPANY  LTD",
    },
    {
      AFSNumber: "548675",
      AFSName: "TRIPLEK RE PTY LTD",
    },
    {
      AFSNumber: "548739",
      AFSName: "FORUM PARTNERS ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "548748",
      AFSName: "NEXIA MELBOURNE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "548754",
      AFSName: "BPW PARTNERS PTY LTD",
    },
    {
      AFSNumber: "548813",
      AFSName: "WEALTH ADVISER INVESTMENT SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "548820",
      AFSName: "GREEN ENERGY TRADING PTY LTD",
    },
    {
      AFSNumber: "548844",
      AFSName: "WEALTH 23 DEALER GROUP SERVICES PTY LTD",
    },
    {
      AFSNumber: "548901",
      AFSName: "RPP FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "548941",
      AFSName: "IRON POT EQUITIES PTY LTD",
    },
    {
      AFSNumber: "548942",
      AFSName: "LOAM FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "548953",
      AFSName: "CLEAR INSURANCE PTY LTD",
    },
    {
      AFSNumber: "549001",
      AFSName: "FIRST CHOICE WEALTH GROUP PTY LTD",
    },
    {
      AFSNumber: "549020",
      AFSName: "ARCH LMI PTY LTD",
    },
    {
      AFSNumber: "549026",
      AFSName: "AIRWALLEX CAPITAL PTY LTD",
    },
    {
      AFSNumber: "549034",
      AFSName: "ACCELA FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "549044",
      AFSName: "SCARCITY CORPORATE SERVICES PTY LTD",
    },
    {
      AFSNumber: "549100",
      AFSName: "AFMOOM TRADING PTY LTD",
    },
    {
      AFSNumber: "549123",
      AFSName: "SHEARWATER FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "549198",
      AFSName: "GENERATE WEALTH FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "549199",
      AFSName: "MW GROUPING PTY LTD",
    },
    {
      AFSNumber: "549205",
      AFSName: "FLYING FOX NOMINEES PTY LTD",
    },
    {
      AFSNumber: "549224",
      AFSName: "WATTLESTONE MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "549226",
      AFSName: "HVTA PTY LTD",
    },
    {
      AFSNumber: "549234",
      AFSName: "LISLE GROUP PTY LTD",
    },
    {
      AFSNumber: "549237",
      AFSName: "QUARTET FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "549258",
      AFSName: "BELFORD WEALTH MANAGEMENT HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "549293",
      AFSName: "RESOLVIT INSURE PTY LIMITED",
    },
    {
      AFSNumber: "549295",
      AFSName: "KILARA FINCO PTY LTD",
    },
    {
      AFSNumber: "549296",
      AFSName: "FSG PTY LTD",
    },
    {
      AFSNumber: "549415",
      AFSName: "VEST FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "549453",
      AFSName: "FF SOLUTIONS GROUP PTY LTD",
    },
    {
      AFSNumber: "549506",
      AFSName: "BLUEWELL PTY LTD",
    },
    {
      AFSNumber: "549534",
      AFSName: "FLYING FOX LICENSEE PTY LTD",
    },
    {
      AFSNumber: "549617",
      AFSName: "STONE LEAF CAPITAL SECURITIES LIMITED",
    },
    {
      AFSNumber: "549618",
      AFSName: "COWDEN (WA) PTY LTD",
    },
    {
      AFSNumber: "549627",
      AFSName: "FOSSE WAY PTY LTD",
    },
    {
      AFSNumber: "549629",
      AFSName: "TRUECOVER PTY LTD",
    },
    {
      AFSNumber: "549631",
      AFSName: "JFP ADVISER SERVICES PTY LTD",
    },
    {
      AFSNumber: "549637",
      AFSName: "EPONA LICENSEE SERVICES PTY LTD",
    },
    {
      AFSNumber: "549640",
      AFSName: "RWE TRADING SERVICES AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "549651",
      AFSName: "FAMILLE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "549662",
      AFSName: "FREIGHTINSURE PTY LTD",
    },
    {
      AFSNumber: "549697",
      AFSName: "PROVIDENT ADVISORY PTY LTD",
    },
    {
      AFSNumber: "549718",
      AFSName: "TREFOR CAPITAL PTY LTD",
    },
    {
      AFSNumber: "549719",
      AFSName: "YPW WEALTH PTY LTD",
    },
    {
      AFSNumber: "549825",
      AFSName: "HAYBOROUGH ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "549856",
      AFSName: "PLAYFAIR ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "549857",
      AFSName: "SL PREMIUM INCOME FUND PTY LIMITED",
    },
    {
      AFSNumber: "549895",
      AFSName: "PBA FINANCIAL LICENSING PTY LTD",
    },
    {
      AFSNumber: "549913",
      AFSName: "UDAMON WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "549937",
      AFSName: "ARTEGA INVESTMENT ADMINISTRATION PTY LIMITED",
    },
    {
      AFSNumber: "549945",
      AFSName: "DARK HORSE CAPITAL & CO PTY LTD",
    },
    {
      AFSNumber: "549964",
      AFSName: "VIRTCA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "549992",
      AFSName: "FUTURO ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "550009",
      AFSName: "HEJAZ ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "550105",
      AFSName: "GREATER BRISBANE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "550122",
      AFSName: "WOODBRIDGE FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "550125",
      AFSName: "CAPELLA ADVISORY PTY LTD",
    },
    {
      AFSNumber: "550129",
      AFSName: "SMARTER FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "550139",
      AFSName: "ACA INSIGHT PTY LTD",
    },
    {
      AFSNumber: "550205",
      AFSName: "MULTIPLUS PROPERTIES PTY LTD",
    },
    {
      AFSNumber: "550221",
      AFSName: "SYMMETRY FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "550265",
      AFSName: "LSN CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "550275",
      AFSName: "ARDENT RISK MANAGEMENT GROUP PTY LTD",
    },
    {
      AFSNumber: "550379",
      AFSName: "HAPPENCO FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "550389",
      AFSName: "UPSCALE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "550438",
      AFSName: "HONEYWELL CAPITAL PTY LTD",
    },
    {
      AFSNumber: "550443",
      AFSName: "CO:ACT CAPITAL PTY LTD",
    },
    {
      AFSNumber: "550444",
      AFSName: "GW AFSL PTY LTD",
    },
    {
      AFSNumber: "550455",
      AFSName: "SMARTMOVE ADVICE PTY LTD",
    },
    {
      AFSNumber: "550478",
      AFSName: "FORTLAKE ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "550631",
      AFSName: "BAKER ADVICE PTY LTD",
    },
    {
      AFSNumber: "550637",
      AFSName: "TCM FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "550651",
      AFSName: "INDEPENDENT FINANCIAL ADVISORS & MEDIA PTY LTD",
    },
    {
      AFSNumber: "550689",
      AFSName: "APOLLO FUND MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "550704",
      AFSName: "PACIFIC PRIVATE ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "550709",
      AFSName: "APEX FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "550722",
      AFSName: "FORVIS MAZARS TRANSACTION ADVISORY SERVICES PTY LTD",
    },
    {
      AFSNumber: "550752",
      AFSName: "ELITE CAPITAL SECURITIES PTY LTD",
    },
    {
      AFSNumber: "550793",
      AFSName: "AGR FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "550824",
      AFSName: "SA FINANCIAL ADVISERS PTY LTD",
    },
    {
      AFSNumber: "550826",
      AFSName: "GROW FINANCIAL ADVISORS PTY LTD",
    },
    {
      AFSNumber: "550830",
      AFSName: "RIVER GROUP FUND SERVICES PTY LTD",
    },
    {
      AFSNumber: "550838",
      AFSName: "ALTIOC LIMITED",
    },
    {
      AFSNumber: "550862",
      AFSName: "AWS PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "550872",
      AFSName: "HARBOURSIDE WM GROUP PTY LTD",
    },
    {
      AFSNumber: "550946",
      AFSName: "SIRIUS INSURANCE PTY LTD",
    },
    {
      AFSNumber: "551057",
      AFSName: "PASSPORTCARD AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "551084",
      AFSName: "EMIT CAPITAL ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "551091",
      AFSName: "PRIVATA GROUP PTY LTD",
    },
    {
      AFSNumber: "551094",
      AFSName: "EVOLUTION CAPITAL SECURITIES PTY LTD",
    },
    {
      AFSNumber: "551107",
      AFSName: "NF SECURITIES PTY LTD",
    },
    {
      AFSNumber: "551139",
      AFSName: "FRONTIER IMPACT HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "551141",
      AFSName: "UNO CAPITAL GROUP PTY LTD",
    },
    {
      AFSNumber: "551170",
      AFSName: "CBP FINANCE PTY LTD",
    },
    {
      AFSNumber: "551188",
      AFSName: "A3D CAPITAL PTY LTD",
    },
    {
      AFSNumber: "551189",
      AFSName: "AVALON ADVISORS PTY LTD",
    },
    {
      AFSNumber: "551201",
      AFSName: "RIVKIN WEALTH ADVISORS PTY LTD",
    },
    {
      AFSNumber: "551283",
      AFSName: "ABIGAIL FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "551294",
      AFSName: "IGODIRECT GROUP PTY LTD",
    },
    {
      AFSNumber: "551305",
      AFSName: "STAR BETA TECHNOLOGIES PTY LIMITED",
    },
    {
      AFSNumber: "551366",
      AFSName: "PINNACLE INSURANCE GROUP PTY LTD",
    },
    {
      AFSNumber: "551391",
      AFSName: "NOBLE PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "551497",
      AFSName: "ILA PARTNERS PTY LTD",
    },
    {
      AFSNumber: "551505",
      AFSName: "MJPW CAPITAL PTY LIMITED",
    },
    {
      AFSNumber: "551529",
      AFSName: "GRAND PLAN WEALTH PTY LTD",
    },
    {
      AFSNumber: "551560",
      AFSName: "GILL AND CO ADVISORY PTY LTD",
    },
    {
      AFSNumber: "551565",
      AFSName: "KINETIC FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "551581",
      AFSName: "SUPER HOUSING PARTNERSHIPS (LICENCE) PTY LTD",
    },
    {
      AFSNumber: "551601",
      AFSName: "LIFE STAGES GROUP PTY LTD",
    },
    {
      AFSNumber: "551634",
      AFSName: "LENDMARK FUNDS PTY LTD",
    },
    {
      AFSNumber: "551695",
      AFSName: "OTG CAPITAL PTY LTD",
    },
    {
      AFSNumber: "551703",
      AFSName: "OSE MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "551748",
      AFSName: "BENCHMARK FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "551759",
      AFSName: "ICARE FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "551814",
      AFSName: "EQUION FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "551821",
      AFSName: "HERO GROUP SERVICES PTY LTD",
    },
    {
      AFSNumber: "551841",
      AFSName: "BROADWATER ASSOCIATES PTY LTD",
    },
    {
      AFSNumber: "551876",
      AFSName: "DEPENDABLE FINANCIAL ADVICE PTY LTD",
    },
    {
      AFSNumber: "551958",
      AFSName: "IMPORT RACING PTY LTD",
    },
    {
      AFSNumber: "552009",
      AFSName: "EBC ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "552045",
      AFSName: "BRISTLEMOON CAPITAL PTY LTD",
    },
    {
      AFSNumber: "552081",
      AFSName: "ENKORE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "552088",
      AFSName: "SALT FINANCIAL GROUP AFSL PTY LTD",
    },
    {
      AFSNumber: "552093",
      AFSName: "HARLAND GREEN PTY LTD",
    },
    {
      AFSNumber: "552106",
      AFSName: "EUROP ASSISTANCE AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "552131",
      AFSName: "THE COLLECTIVE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "552144",
      AFSName: "HORSHAM LICENSING SERVICES PTY LTD",
    },
    {
      AFSNumber: "552198",
      AFSName: "INDEPENDENT WEALTH ADVISORY AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "552265",
      AFSName: "MENTOR FINANCIAL SERVICES (WA) PTY LTD",
    },
    {
      AFSNumber: "552284",
      AFSName: "NEILSON FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "552319",
      AFSName: "INTERSTELLAR FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "552346",
      AFSName: "JOHN MORETON FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "552414",
      AFSName: "STEADFAST DISCRETIONARY PTY LTD",
    },
    {
      AFSNumber: "552419",
      AFSName: "ACHIEVING YOUR DREAMS PTY LTD",
    },
    {
      AFSNumber: "552424",
      AFSName: "VALUE PROCESS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "552440",
      AFSName: "FORESTRY ACCUS PTY LTD",
    },
    {
      AFSNumber: "552467",
      AFSName: "ADVICE PRACTICE ALLIANCE PTY LTD",
    },
    {
      AFSNumber: "552472",
      AFSName: "NATURAL RESOURCES INVESTOR PTY LTD",
    },
    {
      AFSNumber: "552476",
      AFSName: "EQUITY & ADVISORY LIMITED",
    },
    {
      AFSNumber: "552580",
      AFSName: "ATLAS SP AUSTRALIA SERVICES PTY LTD",
    },
    {
      AFSNumber: "552676",
      AFSName: "THE WEALTH EMPORIUM PTY LTD",
    },
    {
      AFSNumber: "552698",
      AFSName: "O'DEA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "552726",
      AFSName: "MULIPAY PTY LTD",
    },
    {
      AFSNumber: "552784",
      AFSName: "ENGIE ENERGY MARKETING AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "552817",
      AFSName: "OPULON PTY LTD",
    },
    {
      AFSNumber: "552819",
      AFSName: "MAWSON WEALTH PTY LIMITED",
    },
    {
      AFSNumber: "552870",
      AFSName: "CC REAL AUSTRALIA AFS LICENSEE PTY LTD",
    },
    {
      AFSNumber: "552873",
      AFSName: "GLOBAL ALTERNATIVE FUNDS PTY LTD",
    },
    {
      AFSNumber: "552881",
      AFSName: "JPA ENERGY PTY LTD",
    },
    {
      AFSNumber: "552883",
      AFSName: "BURSARIA FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "552929",
      AFSName: "LIGHTSOURCE ENERGY MARKETS PTY LTD",
    },
    {
      AFSNumber: "552957",
      AFSName: "BBB FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "553008",
      AFSName: "FB VENTURES PTY LIMITED",
    },
    {
      AFSNumber: "553019",
      AFSName: "EVERYSTEP FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "553061",
      AFSName: "NORTHERN BEACHES INVESTMENT PLANNING PTY LTD",
    },
    {
      AFSNumber: "553161",
      AFSName: "MUTUALS MATTER PTY LTD",
    },
    {
      AFSNumber: "553201",
      AFSName: "FOLKLORE FS PTY LTD",
    },
    {
      AFSNumber: "553242",
      AFSName: "MARKEL AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "553326",
      AFSName: "ANOVA FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "553339",
      AFSName: "SYNERGY UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "553384",
      AFSName: "ARTISAN UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "553529",
      AFSName: "OASIS ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "553554",
      AFSName: "ARCHER PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "553672",
      AFSName: "CERES CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "553673",
      AFSName: "DMG CAPITAL PTY LTD",
    },
    {
      AFSNumber: "553717",
      AFSName: "EL CALAMAR CAPITAL PTY LTD",
    },
    {
      AFSNumber: "553719",
      AFSName: "NAVINCI GLOBAL MARKETS PTY LTD",
    },
    {
      AFSNumber: "553722",
      AFSName: "HILLER MARINE PTY LTD",
    },
    {
      AFSNumber: "553759",
      AFSName: "PARK FINANCE PTY LTD",
    },
    {
      AFSNumber: "553794",
      AFSName: "US MASTERS RESPONSIBLE ENTITY LIMITED",
    },
    {
      AFSNumber: "553808",
      AFSName: "AFFINITY LICENSING PLUS PTY LTD",
    },
    {
      AFSNumber: "553926",
      AFSName: "ALPIN INVESTMENTS PTY LIMITED",
    },
    {
      AFSNumber: "553949",
      AFSName: "VOLARE WEALTH PTY LTD",
    },
    {
      AFSNumber: "553987",
      AFSName: "FF FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "554017",
      AFSName: "SHED CAPITAL PTY LTD",
    },
    {
      AFSNumber: "554025",
      AFSName: "HANSA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "554026",
      AFSName: "CASTLE HALL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "554046",
      AFSName: "NATGEN CORPORATE PTY LTD",
    },
    {
      AFSNumber: "554049",
      AFSName: "QUEENSCLIFF CAPITAL PTY LTD",
    },
    {
      AFSNumber: "554106",
      AFSName: "PROFESSIONAL WEALTH ADVICE PTY LTD",
    },
    {
      AFSNumber: "554110",
      AFSName: "RESPONSIBLE INVESTMENT ASSOCIATION AUSTRALASIA LTD",
    },
    {
      AFSNumber: "554115",
      AFSName: "XIN WEALTH PTY LTD",
    },
    {
      AFSNumber: "554124",
      AFSName: "ADMIRALTY CAPITAL GROUP PTY LTD",
    },
    {
      AFSNumber: "554126",
      AFSName: "WEALTH PLUS FUND PTY LTD",
    },
    {
      AFSNumber: "554251",
      AFSName: "GOODMAN WHOLESALE FUNDS MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "554301",
      AFSName: "PROVIDENT SUPER STRATEGIES (AUST) PTY LTD",
    },
    {
      AFSNumber: "554302",
      AFSName: "DENISON PARTNERS PTY LTD",
    },
    {
      AFSNumber: "554320",
      AFSName: "DEMPSEY CAPITAL PTY LTD",
    },
    {
      AFSNumber: "554324",
      AFSName: "SUREFIRE INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "554438",
      AFSName: "VELOSURE PTY LTD",
    },
    {
      AFSNumber: "554475",
      AFSName: "CURRENCY OVERLAY PARTNERS PTY LTD",
    },
    {
      AFSNumber: "554488",
      AFSName: "ANGLO AMERICAN ENERGY SOLUTIONS (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "554517",
      AFSName: "T VENTURES MANAGEMENT (AUS) PTY LTD",
    },
    {
      AFSNumber: "554518",
      AFSName: "T VENTURES CUSTODIAN PTY LTD",
    },
    {
      AFSNumber: "554582",
      AFSName: "AFT AU PTY LTD",
    },
    {
      AFSNumber: "554587",
      AFSName: "SENALAND PTY LTD",
    },
    {
      AFSNumber: "554591",
      AFSName: "HAYDON PARTNERS PTY LTD",
    },
    {
      AFSNumber: "554599",
      AFSName: "ASCALON CAPITAL PTY LTD",
    },
    {
      AFSNumber: "554604",
      AFSName: "NERDWALLET AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "554607",
      AFSName: "MITSUI & CO. ENERGY TRADING SINGAPORE PTE. LTD.",
    },
    {
      AFSNumber: "554608",
      AFSName: "VISION INSURANCE PLACEMENTS PTY LTD",
    },
    {
      AFSNumber: "554636",
      AFSName: "STRATEGIC UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "554638",
      AFSName: "BENCHMARK PROPERTY RM PTY LTD",
    },
    {
      AFSNumber: "554640",
      AFSName: "AUSTRALIAN UNITY INVESTMENTS LIMITED",
    },
    {
      AFSNumber: "554643",
      AFSName: "LITICA AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "554646",
      AFSName: "POINT CAPITAL IM PTY LTD",
    },
    {
      AFSNumber: "554648",
      AFSName: "PRIVATE WEALTH ARCHITECTS LICENSEE PTY LTD",
    },
    {
      AFSNumber: "554650",
      AFSName: "BOUTIQUE ADVISERS PTY LTD",
    },
    {
      AFSNumber: "554658",
      AFSName: "UNIFIED CAPITAL PARTNERS PTY LTD",
    },
    {
      AFSNumber: "554769",
      AFSName: "EC POHL & CO RE LTD",
    },
    {
      AFSNumber: "554850",
      AFSName: "CAPITAL MARKETS 1 PTY LTD",
    },
    {
      AFSNumber: "554867",
      AFSName: "ANGLE AUTO FINANCE TM PTY LTD",
    },
    {
      AFSNumber: "554869",
      AFSName: "KALYAN PARK THOROUGHBREDS PTY LTD",
    },
    {
      AFSNumber: "554884",
      AFSName: "ADAPTIVE ALPHA RESEARCH PTY LTD",
    },
    {
      AFSNumber: "554888",
      AFSName: "EMERGE FINANCIAL PTY LIMITED",
    },
    {
      AFSNumber: "554889",
      AFSName: "HUA FINANCE PTY LTD",
    },
    {
      AFSNumber: "555048",
      AFSName: "FINMAR ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "555056",
      AFSName: "IFA LICENCING SERVICES PTY LTD",
    },
    {
      AFSNumber: "555169",
      AFSName: "FINCHLEY & KENT PTY LTD",
    },
    {
      AFSNumber: "555193",
      AFSName: "SOLAS ASSET MANAGEMENT LIMITED",
    },
    {
      AFSNumber: "555199",
      AFSName: "ANGLE ASSET FINANCE TM PTY LIMITED",
    },
    {
      AFSNumber: "555205",
      AFSName: "1688 UNDERWRITING PTY LTD",
    },
    {
      AFSNumber: "555222",
      AFSName: "MERCURIA COMMODITY MARKETS (ASIA) PTE. LTD.",
    },
    {
      AFSNumber: "555282",
      AFSName: "OPULRICH AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "555304",
      AFSName: "FA FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "555325",
      AFSName: "BELUS CAPITAL PTY LTD",
    },
    {
      AFSNumber: "555335",
      AFSName: "SJH FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "555360",
      AFSName: "ALTERNATIVES DIGITALISATION PTY LTD",
    },
    {
      AFSNumber: "555362",
      AFSName: "IEXI PTY LTD",
    },
    {
      AFSNumber: "555463",
      AFSName: "CENTENARY SECURITIES PTY LTD",
    },
    {
      AFSNumber: "555517",
      AFSName: "PRESTIGE AFSL PTY LTD",
    },
    {
      AFSNumber: "555545",
      AFSName: "BLOCKCHAIN ASSETS PTY. LTD.",
    },
    {
      AFSNumber: "555615",
      AFSName: "BLACKCREST GROUP PTY LTD",
    },
    {
      AFSNumber: "555727",
      AFSName: "GRIZZLY FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "555758",
      AFSName: "CAPSPACE FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "555799",
      AFSName: "REKSONS INSURANCE INTERNATIONAL AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "555843",
      AFSName: "MOONCUNNINGHAM FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "555859",
      AFSName: "PASTORAL PARTNERS AUSTRALIA LICENCE CO PTY LTD",
    },
    {
      AFSNumber: "555906",
      AFSName: "COVE PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "555979",
      AFSName: "JOHN MURRAY ADVISORY PTY LTD",
    },
    {
      AFSNumber: "555989",
      AFSName: "ZILLER ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "556003",
      AFSName: "BARRENJOEY PRIVATE CAPITAL NOMINEES PTY LIMITED",
    },
    {
      AFSNumber: "556043",
      AFSName: "OZ PREMIUM FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "556125",
      AFSName: "LUCERNE WEALTH PTY LTD",
    },
    {
      AFSNumber: "556133",
      AFSName: "PTWO PTY LTD",
    },
    {
      AFSNumber: "556150",
      AFSName: "RANGE CAPITAL INVESTMENT PARTNERS PTY LTD",
    },
    {
      AFSNumber: "556158",
      AFSName: "DAVOS AND MILES PTY LTD",
    },
    {
      AFSNumber: "556182",
      AFSName: "SHARPER CAPITAL LIMITED",
    },
    {
      AFSNumber: "556234",
      AFSName: "G&K LICENSING SERVICES PTY LTD",
    },
    {
      AFSNumber: "556301",
      AFSName: "HOLDFAST FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "556385",
      AFSName: "YTA PARTNERS PTY LTD",
    },
    {
      AFSNumber: "556404",
      AFSName: "LAND BANK OF TAIWAN CO.  LTD.",
    },
    {
      AFSNumber: "556422",
      AFSName: "DY HAMILTON PTY LTD",
    },
    {
      AFSNumber: "556448",
      AFSName: "OTERRA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "556458",
      AFSName: "RIVER X FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "556525",
      AFSName: "JEWELLERS LOOP PTY LTD",
    },
    {
      AFSNumber: "556530",
      AFSName: "EVERSON PROPERTY PARTNERS PTY LTD",
    },
    {
      AFSNumber: "556570",
      AFSName: "KINGSTON INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "556578",
      AFSName: "ALTRUIST ADVISERS AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "556604",
      AFSName: "MPFP AFSL PTY LTD",
    },
    {
      AFSNumber: "556668",
      AFSName: "CMP PARTNERS PTY LTD",
    },
    {
      AFSNumber: "556700",
      AFSName: "ALPHA FX AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "556701",
      AFSName: "MIDAS MARKETS PTY LTD",
    },
    {
      AFSNumber: "556732",
      AFSName: "ARC ASSETS PTY LTD",
    },
    {
      AFSNumber: "556892",
      AFSName: "LAMBOURNE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "556897",
      AFSName: "SKYONE LV PTY LTD",
    },
    {
      AFSNumber: "556939",
      AFSName: "3CAPITAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "557000",
      AFSName: "ATLAS WEALTH GROUP PTY LTD",
    },
    {
      AFSNumber: "557056",
      AFSName: "WINIM CAPITAL LIMITED",
    },
    {
      AFSNumber: "557057",
      AFSName: "CAM FINANCIAL ADVICE PTY LTD",
    },
    {
      AFSNumber: "557074",
      AFSName: "GATEKEEPER 77 PTY LTD",
    },
    {
      AFSNumber: "557075",
      AFSName: "SURETY ADVISERS PTY LTD",
    },
    {
      AFSNumber: "557079",
      AFSName: "OMNI BRIDGEWAY LIMITED",
    },
    {
      AFSNumber: "557080",
      AFSName: "MINOTAUR LICENSING PTY LTD",
    },
    {
      AFSNumber: "557092",
      AFSName: "SUSTAINABLE INVESTMENT EXCHANGE PTY LTD",
    },
    {
      AFSNumber: "557097",
      AFSName: "LICENCE HOLDING PTY LTD",
    },
    {
      AFSNumber: "557103",
      AFSName: "UNITED CURRENCY EXCHANGE PTY LTD",
    },
    {
      AFSNumber: "557166",
      AFSName: "PROLIFIC ADVISORY SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "557217",
      AFSName: "VITA POINT PTY LTD",
    },
    {
      AFSNumber: "557218",
      AFSName: "DIOGENES FUNDS MANAGEMENT LTD",
    },
    {
      AFSNumber: "557420",
      AFSName: "NICHOFACE PTY LTD",
    },
    {
      AFSNumber: "557423",
      AFSName: "CERTUS FSL PTY LTD",
    },
    {
      AFSNumber: "557559",
      AFSName: "APEX LICENSING SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "557683",
      AFSName: "INVESTUP SECURITIES PTY LTD",
    },
    {
      AFSNumber: "557726",
      AFSName: "ARK CAPITAL CORPORATE SERVICES PTY LTD",
    },
    {
      AFSNumber: "557729",
      AFSName: "ALETHIA PARTNERS PTY LTD",
    },
    {
      AFSNumber: "557746",
      AFSName: "MAXIMISE FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "557810",
      AFSName: "FB CORP LIMITED",
    },
    {
      AFSNumber: "558013",
      AFSName: "RHOMBUS ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "558059",
      AFSName: "YOU TECHNOLOGIES GROUP (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "558126",
      AFSName: "IPARTNERS RETAIL LTD",
    },
    {
      AFSNumber: "558166",
      AFSName: "TRAJET PTY LTD",
    },
    {
      AFSNumber: "558201",
      AFSName: "AFRICHANGE AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "558284",
      AFSName: "PETRUS WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "558287",
      AFSName: "VERITY OZ TRADING PTY LTD",
    },
    {
      AFSNumber: "558342",
      AFSName: "INSIDE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "558356",
      AFSName: "MTA ENERGY (WHOLESALE) PTY LIMITED",
    },
    {
      AFSNumber: "558395",
      AFSName: "RHHM PTY LTD",
    },
    {
      AFSNumber: "558406",
      AFSName: "EVEREST SERVICE COMPANY (UK)  LTD.",
    },
    {
      AFSNumber: "558417",
      AFSName: "HAL UNITED CAPITAL PTY LTD",
    },
    {
      AFSNumber: "558504",
      AFSName: "DORSET WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "558524",
      AFSName: "UNIFY INSURANCE HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "558532",
      AFSName: "SHERLOCK WEALTH ADVISORY SERVICES PTY LTD",
    },
    {
      AFSNumber: "558544",
      AFSName: "FOREST STONE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "558563",
      AFSName: "PARTNERS WEALTH GROUP FINANCIAL ADVICE PTY LTD",
    },
    {
      AFSNumber: "558581",
      AFSName: "GJ PRIVATE GROUP PTY LTD",
    },
    {
      AFSNumber: "558610",
      AFSName: "AIPRIME PTY LTD",
    },
    {
      AFSNumber: "558756",
      AFSName: "GLIOCAS INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "558762",
      AFSName: "SODOR CAPITAL PTY LTD",
    },
    {
      AFSNumber: "558788",
      AFSName: "PLATINUM WEALTH ADVISORY PTY LTD",
    },
    {
      AFSNumber: "558797",
      AFSName: "COOGEE CAPITAL LICENSEE PTY LTD",
    },
    {
      AFSNumber: "558799",
      AFSName: "MELLOY INDEPENDENT WEALTH SERVICES PTY LTD",
    },
    {
      AFSNumber: "558821",
      AFSName: "FMK ADVISORY PTY LTD",
    },
    {
      AFSNumber: "558895",
      AFSName: "WALLABI GROUP PTY LTD",
    },
    {
      AFSNumber: "558899",
      AFSName: "NDT CAPITAL PTY LTD",
    },
    {
      AFSNumber: "558947",
      AFSName: "PARASOL ADVISORY PTY LIMITED",
    },
    {
      AFSNumber: "558973",
      AFSName: "PRIVATUS ADVISORY PTY LTD",
    },
    {
      AFSNumber: "558983",
      AFSName: "ARGENTA INTERNATIONAL LIMITED",
    },
    {
      AFSNumber: "559015",
      AFSName: "NEXT LEVEL WA PTY LTD",
    },
    {
      AFSNumber: "559076",
      AFSName: "QUALFIN ADVISERS PTY LTD",
    },
    {
      AFSNumber: "559109",
      AFSName: "CROESO FINANCIAL ADVICE PTY LTD",
    },
    {
      AFSNumber: "559207",
      AFSName: "NORTHHAVEN PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "559300",
      AFSName: "SEQ ADVICE WEALTH PTY LIMITED",
    },
    {
      AFSNumber: "559321",
      AFSName: "AMILLEX GLOBAL PTY LTD",
    },
    {
      AFSNumber: "559353",
      AFSName: "AVENYOU FINANCE PTY LTD",
    },
    {
      AFSNumber: "559357",
      AFSName: "FLYBRIDGE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "559393",
      AFSName: "TWS PLANNERS PTY LTD",
    },
    {
      AFSNumber: "559424",
      AFSName: "SOBU CAPITAL PTY LTD",
    },
    {
      AFSNumber: "559460",
      AFSName: "FINTOR GROUP PTY LTD",
    },
    {
      AFSNumber: "559462",
      AFSName: "LUNA PARTNERS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "559468",
      AFSName: "TAPTAP SEND AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "559566",
      AFSName: "APOLLO INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "559598",
      AFSName: "SWIFT ADVICE PTY LTD",
    },
    {
      AFSNumber: "559619",
      AFSName: "GREEN EXCHANGE PTY LTD",
    },
    {
      AFSNumber: "559714",
      AFSName: "STRATEGIC FINANCE PARTNERS PTY LTD",
    },
    {
      AFSNumber: "559715",
      AFSName: "G & G PERSONAL INSURANCE ADVISERS PTY LTD",
    },
    {
      AFSNumber: "559723",
      AFSName: "BULL CAPITAL FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "559741",
      AFSName: "RIGEL INVESTMENT AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "559780",
      AFSName: "MANTIS PARTNERS (AUSTRALIA) PTY LTD",
    },
    {
      AFSNumber: "559807",
      AFSName: "PRIME YEARS PTY LTD",
    },
    {
      AFSNumber: "559829",
      AFSName: "CLEARLAKE INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "559862",
      AFSName: "OXLEY CAPITAL INVESTMENTS PTY LIMITED",
    },
    {
      AFSNumber: "559892",
      AFSName: "KASEL ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "559897",
      AFSName: "ARCHERFIELD PROPERTY GROUP PTY LTD",
    },
    {
      AFSNumber: "559898",
      AFSName: "ALEGRA WEALTH PTY LTD",
    },
    {
      AFSNumber: "559915",
      AFSName: "TREEHOUSE FP PTY LTD",
    },
    {
      AFSNumber: "559923",
      AFSName: "SANDHURST PRIVATE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "559956",
      AFSName: "ENERGY BAY FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "559974",
      AFSName: "MME SERVICES PTY LTD",
    },
    {
      AFSNumber: "559977",
      AFSName: "STAUDE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "560035",
      AFSName: "CORONET INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "560040",
      AFSName: "MCS FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "560050",
      AFSName: "PROACCT PLUS FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "560067",
      AFSName: "NASCENT ADVISORY GROUP PTY LTD",
    },
    {
      AFSNumber: "560156",
      AFSName: "SOVEREIGN OAK WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "560168",
      AFSName: "RFC AMBRIAN FUND SERVICES PTY LTD",
    },
    {
      AFSNumber: "560247",
      AFSName: "ZETEO WEALTH PARTNERS PTY LTD",
    },
    {
      AFSNumber: "560471",
      AFSName: "UHOUZZ CAPITAL PTY LTD",
    },
    {
      AFSNumber: "560474",
      AFSName: "CIX FIDUCIARY SERVICES PTY LTD",
    },
    {
      AFSNumber: "560644",
      AFSName: "AINSLIE GROUP HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "560657",
      AFSName: "RMD CAPITAL PTY LTD",
    },
    {
      AFSNumber: "560709",
      AFSName: "LENN LICENCING COMPANY PTY LTD",
    },
    {
      AFSNumber: "560765",
      AFSName: "RKBJ PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "560770",
      AFSName: "WEALTHCYCLE PTY LIMITED",
    },
    {
      AFSNumber: "560782",
      AFSName: "NEXPAY PTY LTD",
    },
    {
      AFSNumber: "560808",
      AFSName: "STIRLING LICENSEE SERVICES PTY LTD",
    },
    {
      AFSNumber: "560833",
      AFSName: "LAYBY PTY LTD",
    },
    {
      AFSNumber: "560868",
      AFSName: "ALTERNATIVE FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "560950",
      AFSName: "KSRPW AFSL PTY LTD",
    },
    {
      AFSNumber: "560989",
      AFSName: "INNOVERA SECURITIES PTY LTD",
    },
    {
      AFSNumber: "560994",
      AFSName: "ARTHURMAC CAPITAL PTY LTD",
    },
    {
      AFSNumber: "560999",
      AFSName: "RESILIENCE INSURANCE PTY LTD",
    },
    {
      AFSNumber: "561011",
      AFSName: "INP JC CAPITAL PTY LTD",
    },
    {
      AFSNumber: "561040",
      AFSName: "SANDSTONE WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "561117",
      AFSName: "CORNERSTONE FP PTY LTD",
    },
    {
      AFSNumber: "561123",
      AFSName: "QUADRANT FINANCIAL SERVICES PTY LIMITED",
    },
    {
      AFSNumber: "561179",
      AFSName: "SJC ADVISORY PTY LTD",
    },
    {
      AFSNumber: "561286",
      AFSName: "OLEA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "561296",
      AFSName: "SKYBRIDGE FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "561305",
      AFSName: "REDSTONE EQUITIES PTY LTD",
    },
    {
      AFSNumber: "561313",
      AFSName: "PLANKTON CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "561419",
      AFSName: "CULSANS PTY LTD",
    },
    {
      AFSNumber: "561425",
      AFSName: "BETA LIFE SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "561430",
      AFSName: "MANTLE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "561460",
      AFSName: "INDEPENDENT ADVISORY PARTNERS PTY LTD",
    },
    {
      AFSNumber: "561535",
      AFSName: "NATIONAL CLAIMS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "561602",
      AFSName: "QUEENS PARK INVESTORS PTY LTD",
    },
    {
      AFSNumber: "561604",
      AFSName: "MA INSURANCE BROKERS PTY LIMITED",
    },
    {
      AFSNumber: "561607",
      AFSName: "8W FUNDS PTY LTD",
    },
    {
      AFSNumber: "561619",
      AFSName: "FORTEM WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "561658",
      AFSName: "REDWOOD FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "561666",
      AFSName: "SHPL INVESTMENT MANAGEMENT PTY LIMITED",
    },
    {
      AFSNumber: "561671",
      AFSName: "SUNTAX FP LICENSING PTY LTD",
    },
    {
      AFSNumber: "561674",
      AFSName: "LEEUWIN WEALTH PTY LTD",
    },
    {
      AFSNumber: "561716",
      AFSName: "TITANFURY PTY LTD",
    },
    {
      AFSNumber: "561869",
      AFSName: "INTERNATIONAL INSURANCE  SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "561874",
      AFSName: "YIELD WEALTH PTY LTD",
    },
    {
      AFSNumber: "561900",
      AFSName: "YANOULIS PARTNERS PTY. LTD.",
    },
    {
      AFSNumber: "561994",
      AFSName: "FOREFRONT FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "562001",
      AFSName: "FIRE WEALTH ADVISERS PTY LTD",
    },
    {
      AFSNumber: "562011",
      AFSName: "CAPRI ASSET MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "562070",
      AFSName: "CERNEMOS CAPITAL PTY. LTD.",
    },
    {
      AFSNumber: "562072",
      AFSName: "SPENDA BUSINESS SERVICES PTY LTD",
    },
    {
      AFSNumber: "562073",
      AFSName: "INPEX AUSTRALIA FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "562112",
      AFSName: "ID INSURANCE SERVICES PTY LTD",
    },
    {
      AFSNumber: "562262",
      AFSName: "ESSENTIAL WEALTH PTY LTD",
    },
    {
      AFSNumber: "562273",
      AFSName: "METRO FINANCE CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "562287",
      AFSName: "ENLIGHTENFS PTY LTD",
    },
    {
      AFSNumber: "562342",
      AFSName: "MONTGOMERY CO PTY LTD",
    },
    {
      AFSNumber: "562372",
      AFSName: "FB INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "562388",
      AFSName: "ACHIEVEIT FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "562414",
      AFSName: "ALLUNGA ADVISORY PTY LTD",
    },
    {
      AFSNumber: "562451",
      AFSName: "JIC ADVISER NETWORK PTY LTD",
    },
    {
      AFSNumber: "562479",
      AFSName: "TAZ CONNECT PTY LTD",
    },
    {
      AFSNumber: "562505",
      AFSName: "SEC ENERGY PTY LTD",
    },
    {
      AFSNumber: "562571",
      AFSName: "NEXT ADVISERS PTY LTD",
    },
    {
      AFSNumber: "562575",
      AFSName: "MJA CAPITAL PTY LTD",
    },
    {
      AFSNumber: "562647",
      AFSName: "WEALTH DESIGNERS ADVISORY PTY LTD",
    },
    {
      AFSNumber: "562697",
      AFSName: "OHPFL PTY LTD",
    },
    {
      AFSNumber: "562698",
      AFSName: "FERN ASSOCIATES PTY LTD",
    },
    {
      AFSNumber: "562705",
      AFSName: "CENTRAL WEALTH SERVICES PTY LTD",
    },
    {
      AFSNumber: "562743",
      AFSName: "PEREGRINE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "562766",
      AFSName: "ETF SHARES MANAGEMENT LTD",
    },
    {
      AFSNumber: "562776",
      AFSName: "COMO SERVICES PTY LTD",
    },
    {
      AFSNumber: "562782",
      AFSName: "CPF FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "562784",
      AFSName: "STRATEGIC INVESTMENT PARTNERS PTY LTD",
    },
    {
      AFSNumber: "562860",
      AFSName: "OREANA INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "562870",
      AFSName: "PX WEALTH PTY. LTD.",
    },
    {
      AFSNumber: "562929",
      AFSName: "TWTG FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "562938",
      AFSName: "XY CAPITAL PTY LTD",
    },
    {
      AFSNumber: "562977",
      AFSName: "TAUTSEC PTY LTD",
    },
    {
      AFSNumber: "563036",
      AFSName: "QUAY ARKTOS RE SERVICES LIMITED",
    },
    {
      AFSNumber: "563038",
      AFSName: "OSK ASSET MANAGEMENT (A) PTY LTD",
    },
    {
      AFSNumber: "563039",
      AFSName: "TELOPEA REAL ESTATE PARTNERS PTY LTD",
    },
    {
      AFSNumber: "563246",
      AFSName: "ASCEND ADVICE PTY LTD",
    },
    {
      AFSNumber: "563260",
      AFSName: "QUADRANT FUNDS PTY LTD",
    },
    {
      AFSNumber: "563261",
      AFSName: "BILLINGHAM ADVISERS PTY LTD",
    },
    {
      AFSNumber: "563292",
      AFSName: "STRAIGHT SIX RACING PTY LTD",
    },
    {
      AFSNumber: "563351",
      AFSName: "SHERWOOD AUS PTY LTD",
    },
    {
      AFSNumber: "563423",
      AFSName: "1 WEALTH PTY LTD",
    },
    {
      AFSNumber: "563425",
      AFSName: "VATEE MARKETS PTY LTD",
    },
    {
      AFSNumber: "563430",
      AFSName: "BACENA FUND MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "563434",
      AFSName: "2DM CAPITAL PTY LTD",
    },
    {
      AFSNumber: "563436",
      AFSName: "NEWCO LICENSEE PTY LTD",
    },
    {
      AFSNumber: "563444",
      AFSName: "PB&RD PTY LTD",
    },
    {
      AFSNumber: "563505",
      AFSName: "BIFA LICENCE PTY LTD",
    },
    {
      AFSNumber: "563550",
      AFSName: "YELVERTON CAPITAL (AFSL) PTY LTD",
    },
    {
      AFSNumber: "563562",
      AFSName: "ADEPT WEALTH PTY LTD",
    },
    {
      AFSNumber: "563589",
      AFSName: "VELKOV FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "563622",
      AFSName: "NEXA LIFE SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "563646",
      AFSName: "WIB CO PTY LTD",
    },
    {
      AFSNumber: "563650",
      AFSName: "TPA IM PTY LTD",
    },
    {
      AFSNumber: "563673",
      AFSName: "SGA ADVICE PTY LTD",
    },
    {
      AFSNumber: "563683",
      AFSName: "PAPERBARK FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "563800",
      AFSName: "FC FINANCIAL GROUP PTY LTD",
    },
    {
      AFSNumber: "563801",
      AFSName: "ZHONGXIN INTERNATIONAL INVESTMENT HOLDING PTY LTD",
    },
    {
      AFSNumber: "563803",
      AFSName: "PITCHER PARTNERS SYDNEY PRIVATE WEALTH PTY LIMITED",
    },
    {
      AFSNumber: "563907",
      AFSName: "RASK LICENSING PTY LTD",
    },
    {
      AFSNumber: "563940",
      AFSName: "IRONARCH INVEST PTY LTD",
    },
    {
      AFSNumber: "563949",
      AFSName: "VECTOR PARTNERS PTY LTD",
    },
    {
      AFSNumber: "564023",
      AFSName: "WESTRIDGE TRADERS PTY LTD",
    },
    {
      AFSNumber: "564026",
      AFSName: "ROSETTA STONE FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "564041",
      AFSName: "FINANCIAL PURPOSE HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "564105",
      AFSName: "ARETE ADVISORY SERVICES PTY LTD",
    },
    {
      AFSNumber: "564114",
      AFSName: "FORTITUDE PRIVATE EQUITY INVESTMENTS PTY LTD",
    },
    {
      AFSNumber: "564115",
      AFSName: "PRUDENTIAL PROPERTY FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "564122",
      AFSName: "HAAST ENERGY TRADING AUSTRALIA PTY LIMITED",
    },
    {
      AFSNumber: "564132",
      AFSName: "INCHOI FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "564161",
      AFSName: "SKYBRIDGE FINANCIAL PLANNING PTY LTD",
    },
    {
      AFSNumber: "564219",
      AFSName: "TOWER HOUSE CAPITAL PTY LTD",
    },
    {
      AFSNumber: "564262",
      AFSName: "MCALLEN WEALTH PTY LTD",
    },
    {
      AFSNumber: "564271",
      AFSName: "EDGE ARK PTY LTD",
    },
    {
      AFSNumber: "564365",
      AFSName: "VANGELD FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "564458",
      AFSName: "AUSSIE CAPITAL COMPLIANCE PTY LTD",
    },
    {
      AFSNumber: "564491",
      AFSName: "EPSILON INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "564497",
      AFSName: "MIMOSA ADVICE SERVICES PTY LTD",
    },
    {
      AFSNumber: "564515",
      AFSName: "COI FUNDS MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "564571",
      AFSName: "CFS ADVICE SERVICES PTY LTD",
    },
    {
      AFSNumber: "564576",
      AFSName: "SPECIALIST CLAIMS ADVOCATES PTY LTD",
    },
    {
      AFSNumber: "564577",
      AFSName: "ARTERRA PTY LTD",
    },
    {
      AFSNumber: "564698",
      AFSName: "BALMORAL INDUSTRIES PTY LTD",
    },
    {
      AFSNumber: "564749",
      AFSName: "ABUNDANT WEALTH PARTNERS PTY LTD.",
    },
    {
      AFSNumber: "564760",
      AFSName: "BEECHBROOK REG AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "564771",
      AFSName: "ZINC HOLDINGS PTY LTD",
    },
    {
      AFSNumber: "564793",
      AFSName: "ONLY ADVICE PTY LTD",
    },
    {
      AFSNumber: "564843",
      AFSName: "NAVIGATE MANLY PTY LTD",
    },
    {
      AFSNumber: "564844",
      AFSName: "QUBE RESEARCH & TECHNOLOGIES SINGAPORE PTE. LTD.",
    },
    {
      AFSNumber: "564853",
      AFSName: "BAMFORD PARTNERS PTY LIMITED",
    },
    {
      AFSNumber: "564859",
      AFSName: "PECUNIA FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "564864",
      AFSName: "CRESCENT EQUITIES TRUSCO PTY LTD",
    },
    {
      AFSNumber: "564865",
      AFSName: "CRESCENT FINANCE PTY LTD",
    },
    {
      AFSNumber: "564878",
      AFSName: "UNLESS WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "564880",
      AFSName: "UNIVERSAL SECURITIES PTY LTD",
    },
    {
      AFSNumber: "564948",
      AFSName: "WESURE INSURANCE PTY LTD",
    },
    {
      AFSNumber: "565077",
      AFSName: "CALCULATED FINANCIAL SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "565123",
      AFSName: "MALLEE ADVISORY PARTNERS PTY LTD",
    },
    {
      AFSNumber: "565227",
      AFSName: "ADVICE LANE PTY LTD",
    },
    {
      AFSNumber: "565564",
      AFSName: "INDEPENDENT INSURANCE BROKERS PTY LTD",
    },
    {
      AFSNumber: "565594",
      AFSName: "AURUM MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "565733",
      AFSName: "OPEN BOOK WEALTH MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "565873",
      AFSName: "PRISM FINANCIAL PLANNERS ADVICE PTY LTD",
    },
    {
      AFSNumber: "566088",
      AFSName: "CALEB AND BROWN FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "566090",
      AFSName: "HELIO CAPITAL MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "566091",
      AFSName: "AUREUS PRIVATE WEALTH PTY LTD",
    },
    {
      AFSNumber: "566096",
      AFSName: "VEOLIA AUSTRALIA GP PTY LTD",
    },
    {
      AFSNumber: "566181",
      AFSName: "DARLING WHOLESALE PTY LTD",
    },
    {
      AFSNumber: "566195",
      AFSName: "HIGHER ADVICE PTY LTD",
    },
    {
      AFSNumber: "566293",
      AFSName: "JOHNSONS CORPORATE PTY LTD",
    },
    {
      AFSNumber: "566306",
      AFSName: "ARX PLACEMENT SOLUTIONS PTY LTD",
    },
    {
      AFSNumber: "566313",
      AFSName: "CATENA DIGITAL PTY LTD",
    },
    {
      AFSNumber: "566468",
      AFSName: "CENTURION ADVISORS AFSL PTY LTD",
    },
    {
      AFSNumber: "566574",
      AFSName: "AFM FUND SERVICES PTY LTD",
    },
    {
      AFSNumber: "566608",
      AFSName: "LIFETIME GROWTH PTY LTD",
    },
    {
      AFSNumber: "567130",
      AFSName: "RACQ DISTRIBUTION SERVICES PTY LTD",
    },
    {
      AFSNumber: "567183",
      AFSName: "KIO INVESTMENT MANAGEMENT PTY LTD",
    },
    {
      AFSNumber: "567610",
      AFSName: "ORENS LH PTY LTD",
    },
    {
      AFSNumber: "567996",
      AFSName: "WHOLESALE CAPITAL ADVISORS PTY LTD",
    },
    {
      AFSNumber: "568490",
      AFSName: "AW FINANCIAL ADVISORY GROUP PTY LTD",
    },
    {
      AFSNumber: "568495",
      AFSName: "FINANCE LIVING PTY LTD",
    },
    {
      AFSNumber: "700011",
      AFSName: "L2 FINANCIAL PTY LTD",
    },
    {
      AFSNumber: "700012",
      AFSName: "LINKS LICENSEE SERVICES PTY LTD",
    },
    {
      AFSNumber: "700014",
      AFSName: "CGU AUSTRALIA PTY LTD",
    },
    {
      AFSNumber: "700015",
      AFSName: "EKA WEALTH PTY LTD",
    },
    {
      AFSNumber: "700016",
      AFSName: "AIP FS PTY LTD",
    },
    {
      AFSNumber: "700017",
      AFSName: "REVA WEALTH PTY LTD",
    },
    {
      AFSNumber: "700018",
      AFSName: "BOYCE PRIVATE WEALTH PTY LIMITED",
    },
    {
      AFSNumber: "700020",
      AFSName: "CARDENA FINANCIAL SERVICES PTY LTD",
    },
    {
      AFSNumber: "700023",
      AFSName: "MARV FINANCIAL SERVICES PTY LTD",
    },
  ],
};
