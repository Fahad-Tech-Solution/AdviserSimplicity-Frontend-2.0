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
      route: "/PersonalDetail",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Question",
      statusStep: 8,
      icon: "FaPlus",
      route: "/ImportantQuestion",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Personal Income and Expenses",
      statusStep: 16,
      icon: "FaMoneyCheckDollar",
      route: "/PersonalIncome",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Personal Assets and Debt",
      statusStep: 24,
      icon: "FaHome",
      route: "/PersonalAssets",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Financial Investments",
      statusStep: 32,
      icon: "RiCoinsFill",
      route: "/FinancialInvestments",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Estate Planning & Professional Advisers",
      statusStep: 40,
      icon: "FaQuestionCircle",
      route: "/EstatePlanning",
      condition: (CRObject) => true,
    },
    {
      subTitle: "Personal Insurance",
      statusStep: 48,
      icon: "FaMoneyCheckDollar",
      route: "/PersonalInsurance",
      condition: (CRObject) => CRObject?.personalInsuranceTab === "Yes",
    },
    {
      subTitle: "Business Entities",
      statusStep: 56,
      icon: "FaBriefcase",
      route: "/BusinessEntities",
      condition: (CRObject) =>
        CRObject?.BusinessAsCompanyStructure === "Yes" ||
        CRObject?.BusinessAsTrusts === "Yes",
    },
    {
      subTitle: "SMSF",
      statusStep: 64,
      icon: "FaGift",
      route: "/SMSF",
      condition: (CRObject) => CRObject?.SMSFManagedFundsTab === "Yes",
    },
    {
      subTitle: "Investment Trust",
      statusStep: 72,
      icon: "MdFamilyRestroom",
      route: "/FamilyTrust",
      condition: (CRObject) => CRObject?.businessAsInvestmentTab === "Yes",
    },
  ],
  itemsQuestion: [
    {
      subTitle: "Desired Liquidity",
      statusStep: 12,
      icon: "FaMoneyBillWave",
      route: "/Q1",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Rate of return",
      statusStep: 24,
      icon: "FaChartLine",
      route: "/Q2",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Capital Risk",
      statusStep: 36,
      icon: "FaTriangleExclamation",
      route: "/Q3",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Inflation",
      statusStep: 48,
      icon: "RiDiscountPercentFill",
      route: "/Q4",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Legislative Risk",
      statusStep: 62,
      icon: "MdOutlineBalance",
      route: "/Q5",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Investment knowledge",
      statusStep: 74,
      icon: "FaGraduationCap",
      route: "/Q6",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Volatility",
      statusStep: 86,
      icon: "MdOutlineTimeline",
      route: "/Q7",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Asset allocation",
      statusStep: 98,
      icon: "FaChartPie",
      route: "/Q8",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
  ],
  RiskGoals: [
    {
      title: "Cash Management",
      value: "Cash Management",
      img: LOW1,
      des: "<b>Cash Management</b> - Your responses indicate an extremely low tolerance to investment risk or, alternatively, you have a short investment time frame. The only appropriate investment for this risk profile or time frame is a cash-based investment such as bank accounts, cash management trusts and term deposits.",
    },
    {
      title: "Conservative",
      value: "Conservative",
      img: ModeratelyLOW,
      des: "<b>Conservative</b> - As a Conservative investor, you really don't like risk. Your risk profile suggests you are most concerned with keeping what you have. As a result, you are prepared to accept lower returns to reduce the risk of losing capital. Based on your risk profile you would generally prefer an investment mix that is positioned defensively to produce a stable return with a higher proportion invested in bonds and cash and a smaller proportion of money in shares and property investments. Minimum Investment Term: 2 years",
    },
    {
      title: "Moderately Conservative",
      value: "Moderately Conservative",
      img: Moderate,
      des: "<b>Moderately Conservative</b> - As a Moderately Conservative investor, you seek consistent returns using a steady growth strategy. Your risk profile suggests you want some potential for capital growth, but prefer not to have large fluctuations in short term performance. Based on your risk profile, you would generally prefer a diversified portfolio with a balance of defensive assets, such as bonds and cash and growth assets such as shares and property. Minimum Investment Term: 3 years",
    },
    {
      title: "Balanced",
      value: "Balanced",
      img: ModeratelyHigh,
      des: "<b>Balanced</b> - As a Balanced investor, you seek a portfolio that will give you the best opportunity to achieve your medium to long term financial goals. Your risk profile suggests you are prepared to experience short term fluctuations in performance for potentially higher returns over the long term. Based on your risk profile, you would generally prefer a diversified portfolio with a bias towards growth assets such as shares and property. Minimum Investment Term: 5 years",
    },
    {
      title: "Growth",
      value: "Growth",
      img: High,
      des: "<b>Growth</b> - As a Growth investor, you focus on assets with greater growth potential. Your risk profile suggests you are prepared to accept short term fluctuations in performance for potentially greater returns over the longer term. Based on your risk profile, you would generally prefer a diversified portfolio with a strong bias towards growth investments such as shares and property. Minimum Investment Term: 5 years",
    },
    {
      title: "High Growth",
      value: "High Growth",
      img: VeryHigh,
      des: "<b>High Growth</b> - As a High Growth investor, you are prepared to compromise portfolio balance to pursue potential long-term gains. Your risk profile suggests you acknowledge there will be short term fluctuations in performance and are comfortable to invest in high risk investments. Based on your risk profile you would generally prefer a portfolio comprising solely growth assets such as shares and property. Minimum Investment Term: 7 years. ",
    },
  ],
  superAdmin: [
    {
      subTitle: "Financial Institutions",
      statusStep: 0,
      icon: "RiCoinsFill",
      route: "/FinancialInstitutions",
      key: "FinancialInstitutions",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Investment Platforms",
      statusStep: 10,
      icon: "MdFamilyRestroom",
      route: "/InvestmentPlatforms",
      key: "InvestmentPlatforms",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Investment Bonds",
      statusStep: 20,
      icon: "FaCertificate",
      route: "/InvestmentBonds",
      key: "InvestmentBonds",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Superannuation Funds",
      statusStep: 30,
      icon: "FaMoneyBillWave",
      route: "/SuperannuationFunds",
      key: "SuperannuationFunds",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Account Based Pensions",
      statusStep: 40,
      icon: "FaUserShield",
      route: "/AccountBasedPensions",
      key: "AccountBasedPensions",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Annuities",
      statusStep: 50,
      icon: "BiDollarCircle",
      route: "/Annuities",
      key: "Annuities",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Personal Insurances",
      statusStep: 60,
      icon: "RiDiscountPercentFill",
      route: "/PersonalInsurances",
      key: "PersonalInsurances",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
  ],
  cashFlow: [
    {
      subTitle: "All Users of CashFlow",
      statusStep: 0,
      icon: "FaUser",
      route: "/AllUsers",
      condition: (CRObject) => false, // Always true, as this step is always needed.
    },
    {
      subTitle: "Personal Details",
      statusStep: 0,
      icon: "FaUser",
      route: "/PersonalDetail",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Income & Expenses",
      statusStep: 10,
      icon: "FaMoneyCheckDollar",
      route: "/Income-And-Expenses",
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
      route: "/Personal-Assets",
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
      route: "/Investments",
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
      route: "/Business-Entitles",
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
      route: "/SMSF",
      condition: (CRObject) => true, // Always true, as this step is always needed.
    },
    {
      subTitle: "Investment Trust",
      statusStep: 60,
      icon: "MdFamilyRestroom",
      route: "/InvestmentTrust",
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
};
