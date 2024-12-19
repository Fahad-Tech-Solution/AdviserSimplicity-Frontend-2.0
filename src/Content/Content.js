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

export const content = {
    itemsOpt: [
        {
            subTitle: 'Personal Details',
            statusStep: 0,
            icon: 'FaUser',
            route: '/PersonalDetail',
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Question',
            statusStep: 8,
            icon: 'FaPlus',
            route: '/ImportantQuestion',
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Personal Income and Expenses',
            statusStep: 16,
            icon: 'FaMoneyCheckDollar',
            route: '/PersonalIncome',
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Personal Assets and Debt',
            statusStep: 24,
            icon: 'FaHome',
            route: '/PersonalAssets',
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Financial Investments',
            statusStep: 32,
            icon: 'RiCoinsFill',
            route: '/FinancialInvestments',
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        // {
        //     subTitle: 'Super and Retirement',
        //     statusStep: 40,
        //     icon: 'RiCoinsFill',
        //     route: '/SuperAndRetirement',
        //     condition: (CRObject) => true // Always true, as this step is always needed.
        // },
        // {
        //     subTitle: 'Property',
        //     statusStep: 48,
        //     icon: 'FaKey',
        //     route: '/Lifestyle',
        //     condition: (CRObject) => true // Always true, as this step is always needed.
        // },
        // {
        //     subTitle: 'Investment',
        //     statusStep: 56,
        //     icon: 'FaKey',
        //     route: '/Investment',
        //     condition: (CRObject) => CRObject.investmentPropertyTab === "Yes"
        // },
        {
            subTitle: 'Estate Planning & Professional Advisers',
            statusStep: 40,
            icon: 'FaQuestionCircle',
            route: '/EstatePlanning',
            condition: (CRObject) => true
        },
        {
            subTitle: 'Personal Insurance',
            statusStep: 48,
            icon: 'FaMoneyCheckDollar',
            route: '/PersonalInsurance',
            condition: (CRObject) => CRObject?.personalInsuranceTab === "Yes"
        },
        {
            subTitle: 'Business Entities',
            statusStep: 56,
            icon: 'FaBriefcase',
            route: '/BusinessEntities',
            condition: (CRObject) => CRObject?.BusinessAsCompanyStructure === "Yes" || CRObject?.BusinessAsTrusts === "Yes"
        },
        {
            subTitle: 'SMSF',
            statusStep: 64,
            icon: 'FaGift',
            route: '/SMSF',
            condition: (CRObject) => CRObject?.SMSFManagedFundsTab === "Yes"
        },
        {
            subTitle: 'Investment Trust',
            statusStep: 72,
            icon: 'MdFamilyRestroom',
            route: '/FamilyTrust',
            condition: (CRObject) => CRObject?.businessAsInvestmentTab === "Yes"
        },
    ],
    itemsQuestion: [
        {
            subTitle: 'Desired Liquidity',
            statusStep: 12,
            icon: 'FaMoneyBillWave',
            route: '/Q1',
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Rate of return',
            statusStep: 24,
            icon: 'FaChartLine',
            route: '/Q2',
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Capital Risk',
            statusStep: 36,
            icon: 'FaTriangleExclamation',
            route: '/Q3',
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Inflation',
            statusStep: 48,
            icon: 'RiDiscountPercentFill',
            route: '/Q4',
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Legislative Risk',
            statusStep: 62,
            icon: 'MdOutlineBalance',
            route: '/Q5',
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Investment knowledge',
            statusStep: 74,
            icon: 'FaGraduationCap',
            route: '/Q6',
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Volatility',
            statusStep: 86,
            icon: 'MdOutlineTimeline',
            route: '/Q7',
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Asset allocation',
            statusStep: 98,
            icon: 'FaChartPie',
            route: '/Q8',
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
    ],
    RiskGoals: [
        {
            title: "Cash Management",
            value: "Cash Management",
            img: LOW1,
            des: "<b>Cash Management</b> - Your responses indicate an extremely low tolerance to investment risk or, alternatively, you have a short investment time frame. The only appropriate investment for this risk profile or time frame is a cash-based investment such as bank accounts, cash management trusts and term deposits."
        },
        {
            title: "Conservative",
            value: "Conservative",
            img: ModeratelyLOW,
            des: "<b>Conservative</b> - As a Conservative investor, you really don't like risk. Your risk profile suggests you are most concerned with keeping what you have. As a result, you are prepared to accept lower returns to reduce the risk of losing capital. Based on your risk profile you would generally prefer an investment mix that is positioned defensively to produce a stable return with a higher proportion invested in bonds and cash and a smaller proportion of money in shares and property investments. Minimum Investment Term: 2 years"
        },
        {
            title: "Moderately Conservative",
            value: "Moderately Conservative",
            img: Moderate,
            des: "<b>Moderately Conservative</b> - As a Moderately Conservative investor, you seek consistent returns using a steady growth strategy. Your risk profile suggests you want some potential for capital growth, but prefer not to have large fluctuations in short term performance. Based on your risk profile, you would generally prefer a diversified portfolio with a balance of defensive assets, such as bonds and cash and growth assets such as shares and property. Minimum Investment Term: 3 years"
        },
        {
            title: "Balanced",
            value: "Balanced",
            img: ModeratelyHigh,
            des: "<b>Balanced</b> - As a Balanced investor, you seek a portfolio that will give you the best opportunity to achieve your medium to long term financial goals. Your risk profile suggests you are prepared to experience short term fluctuations in performance for potentially higher returns over the long term. Based on your risk profile, you would generally prefer a diversified portfolio with a bias towards growth assets such as shares and property. Minimum Investment Term: 5 years"
        },
        {
            title: "Growth",
            value: "Growth",
            img: High,
            des: "<b>Growth</b> - As a Growth investor, you focus on assets with greater growth potential. Your risk profile suggests you are prepared to accept short term fluctuations in performance for potentially greater returns over the longer term. Based on your risk profile, you would generally prefer a diversified portfolio with a strong bias towards growth investments such as shares and property. Minimum Investment Term: 5 years"
        },
        {
            title: "High Growth",
            value: "High Growth",
            img: VeryHigh,
            des: "<b>High Growth</b> - As a High Growth investor, you are prepared to compromise portfolio balance to pursue potential long-term gains. Your risk profile suggests you acknowledge there will be short term fluctuations in performance and are comfortable to invest in high risk investments. Based on your risk profile you would generally prefer a portfolio comprising solely growth assets such as shares and property. Minimum Investment Term: 7 years. "
        }
    ],
    superAdmin: [
        {
            subTitle: 'Financial Institutions',
            statusStep: 0,
            icon: 'RiCoinsFill',
            route: '/',
            key: "FinancialInstitutions",
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Investment Platforms',
            statusStep: 10,
            icon: 'MdFamilyRestroom',
            route: '/InvestmentPlatforms',
            key: "InvestmentPlatforms",
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Investment Bonds',
            statusStep: 20,
            icon: 'FaCertificate',
            route: '/InvestmentBonds',
            key: "InvestmentBonds",
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Superannuation Funds',
            statusStep: 30,
            icon: 'FaMoneyBillWave',
            route: '/SuperannuationFunds',
            key: "SuperannuationFunds",
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Account Based Pensions',
            statusStep: 40,
            icon: 'FaUserShield',
            route: '/AccountBasedPensions',
            key: "AccountBasedPensions",
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Annuities',
            statusStep: 50,
            icon: 'BiDollarCircle',
            route: '/Annuities',
            key: "Annuities",
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Personal Insurances',
            statusStep: 60,
            icon: 'RiDiscountPercentFill',
            route: '/PersonalInsurances',
            key: "PersonalInsurances",
            condition: (CRObject) => true // Always true, as this step is always needed.
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
                {
                    title: "Business Income",
                    key: "cf_incomeFromBusiness",
                    img: businessIncomeCase,
                },
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
        },  //? all inner Cards Done without APi
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
                {
                    title: "Motor Vehicle 2",
                    key: "cf_motorVehicle2",
                    img: jeep,
                },
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
                    img: funds,
                    key: "cf_cash",
                    // sourceKey: "bankAccountFinance",
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
                },
                {
                    title: "Investment Loans (LOC)",
                    img: loan,
                    key: "cf_investmentLoansLOC",
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
            subTitle: "Business Entitles",
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
            subTitle: "Super and Retirement",
            statusStep: 50,
            icon: "FaMoneyCheckDollar",
            QuestionsArray: [],
            route: "/Super-and-Retirement",
            condition: (CRObject) => true, // Always true, as this step is always needed.
        },
        {
            subTitle: "Investment",
            statusStep: 60,
            icon: "FaBriefcase",
            route: "/Investment",
            QuestionsArray: [],
            condition: (CRObject) => true, // Always true, as this step is always needed.
        },
        {
            subTitle: "SMSF",
            statusStep: 70,
            icon: "FaGift",
            route: "/SMSF",
            QuestionsArray: [],
            condition: (CRObject) => true, // Always true, as this step is always needed.
        },
    ],
}
