import LOW1 from "../Components/RiskProfile/METER/1- LOW.png";
import ModeratelyLOW from "../Components/RiskProfile/METER/2-Moderately Low.png";
import Moderate from "../Components/RiskProfile/METER/3- Moderate.png";
import ModeratelyHigh from "../Components/RiskProfile/METER/4- Moderately high.png";
import High from "../Components/RiskProfile/METER/5-  High.png";
import VeryHigh from "../Components/RiskProfile/METER/6- Very High.png";

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
            subTitle: 'investment knowledge',
            statusStep: 74,
            icon: 'FaGraduationCap',
            route: '/Q6',
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'volatility',
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
    ]

}