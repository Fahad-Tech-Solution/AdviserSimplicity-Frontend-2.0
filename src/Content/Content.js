
export const content = {

    itemsOpt: [

        {
            subTitle: 'Question',
            statusStep: 8,
            icon: 'FaPlus',
            route: '/ImportantQuestion',
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Personal Details',
            statusStep: 16,
            icon: 'FaUser',
            route: '/PersonalDetail',
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Personal Income and Expenses',
            statusStep: 24,
            icon: 'FaMoneyCheckDollar',
            route: '/PersonalIncome',
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Personal Assets and Debt',
            statusStep: 32,
            icon: 'FaHome',
            route: '/PersonalAssets',
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Financial Investments',
            statusStep: 40,
            icon: 'RiCoinsFill',
            route: '/FinancialInvestments',
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Super and Retirement',
            statusStep: 48,
            icon: 'RiCoinsFill',
            route: '/SuperAndRetirement',
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Property',
            statusStep: 56,
            icon: 'FaKey',
            route: '/Lifestyle',
            condition: (CRObject) => true // Always true, as this step is always needed.
        },
        {
            subTitle: 'Investment',
            statusStep: 64,
            icon: 'FaKey',
            route: '/Investment',
            condition: (CRObject) => CRObject.investmentPropertyTab === "Yes"
        },
        {
            subTitle: 'Estate Planning & Professional Advisers',
            statusStep: 72,
            icon: 'FaQuestionCircle',
            route: '/EstatePlanning',
            condition: (CRObject) => true
        },
        {
            subTitle: 'Personal Insurance',
            statusStep: 80,
            icon: 'FaMoneyCheckDollar',
            route: '/PersonalInsurance',
            condition: (CRObject) => CRObject.personalInsuranceTab === "Yes"
        },
        {
            subTitle: 'Business Entities',
            statusStep: 88,
            icon: 'FaBriefcase',
            route: '/BusinessEntities',
            condition: (CRObject) => CRObject.BusinessAsCompanyStructure === "Yes" || CRObject.BusinessAsTrusts === "Yes"
        },
        {
            subTitle: 'SMSF',
            statusStep: 96,
            icon: 'FaGift',
            route: '/SMSF',
            condition: (CRObject) => CRObject.SMSFManagedFundsTab === "Yes"
        },
        {
            subTitle: 'Investment Trust',
            statusStep: 104,
            icon: 'MdFamilyRestroom',
            route: '/FamilyTrust',
            condition: (CRObject) => CRObject.businessAsInvestmentTab === "Yes"
        },
    ]
}