import { atom } from "recoil"

export const QuestionShift = atom({
    key: "QuestionShift",
    default: "FinancialInvestments",
});

export const UserName = atom({
    key: "UserName",
    default: "Welcome User",
});

export const ClientName = atom({
    key: "ClentName",
    default: "nameclient",
});

export const PartnerName = atom({
    key: "PartnerName",
    default: "namepartner",
});

export const CRState = atom({
    key: "CRState",
    default: {
        //Financial Assets 
        QuestionsFlag: false,
        clientFK: "",

        bankAccountFinance: "No",
        termDepositsFinance: "No",
        australianShareMarket: "No",
        managedFund: "No",
        investmentBondFinance: "No",
        managedFundsLOC: "No",
        managedFundsMarginLoan: "No",

        car: "No",
        boat: "No",
        caravan: "No",
        houseHold: "No",
        otherAssets: "No",
        personalAssets: "No",
        personalLoans: "No",
        creditCards: "No",

        familyHome: "No",
        familyHomeLoan: "No",
        numberOfHolidayHome: 0,

        investmentPropertyDetails: "No",
        investmentPropertyLoan: "No",
        incomeExpenses: "No",

        superAnnuationIssues: "No",
        accountBasedPensionIssues: "No",
        annuitiesIssues: "No",

        will: "No",
        POA: "No",
        professionalAdviser: "No",


        incomeFromOwnBusiness: "No",
        incomeFromSoleTrader: "No",
        incomeFromPartnership: "No",
        incomeFromCentrelink: "No",
        incomeFromSuperPayment: "No",
        incomeFromOverseasPension: "No",
        incomeFromInheritance: "No",
        incomeFromLumpsumExpense: "No",
        incomeFromRegularLivingExpenses: "Yes", // this one should be yes always

        BusinessAsCompanyStructure: "No",
        BusinessAsTrusts: "No",

        //keys which just controls rendering 
        investmentPropertyTab: "No",
        personalInsuranceTab: "No",

        // companyStructureBusinessTab: "No",
        // trustStructureBusinessTab: "No",

        SMSFManagedFundsTab: "No",
        businessAsInvestmentTab: "No",

        SMSFBank: "Yes",
        SMSFTermDeposits: "No",
        SMSFAustralianShares: "No",
        SMSFManagedFunds: "No",
        SMSFInvestmentLoan: "No",
        SMSFInvestmentProperties: "No",
        numberOfSMSFInvestmentProperties: 0,
        SMSFPensionPhase: "No",

        //loop keys
        // SMSFInvestmentPropertiesLoan
        // SMSFInvestmentExpenses

        SMSFDetails: "Yes", // this one should be yes always
        SMSFAccumulationDetails: "Yes", // this one should be yes always

        familyBank: "Yes", // this one should be yes always

        familyTermDeposit: "No",
        familyAustralianShare: "No",
        familyMangedFunds: "No",
        familyInvestmentHomeLoan: "No",
        familyInvestmentProperties: "No",
        numberOfFamilyInvestmentProperties: 0,
        familyPensionPhase: "No",

        //loop keys
        // familyInvestmentPropertiesLoan
        // familyInvestmentExpenses

        familyDetails: "Yes", // this one should be yes always


        life: "Yes",
        TPD: "Yes",
        trauma: "Yes",
        incomeProtection: "Yes",

    },
});

export const StepState = atom({
    key: "StepState",
    default: 1,
});

export const Loading = atom({
    key: "Loading",
    default: false,
});

export const OptionRender = atom({
    key: "OptionRender",
    default: "Opt1",
});

export const CurrentPage = atom({
    key: "CurrentPage",
    default: "/",
});

export const defaultUrl = atom({
    key: "defaultUrl",

    // default: "http://localhost:7000",

    // default: "http://192.168.1.54:7000",    // Usama bhai AUSU
    default: "http://192.168.3.71:7000",    // Usama bhai growWork_Beta
    // default: "http://192.168.14.244:7000",  // Usama bhai mara Mobile k sath
    // default: "http://192.168.227.244:7000", // Usama bhai Fahad bhai k sath
    // default: "http://192.168.3.4:7000",
    // default: "http://192.168.211.242:7000",
    // default: "http://ec2-3-25-227-176.ap-southeast-2.compute.amazonaws.com:7000",  // Live link 

    // default: "",
});

export const allAPIs = atom({
    key: "allAPIs",
    default: {
        TestApi: "testRoute",
        Client: "Client",
        Partner: "Partner",
        Child: "Child",
    },
});

export const PersonalDetailsData = atom({
    key: "PersonalDetailsData",
    default: {
        "client": {
            "clientTitle": "Mr.",
            "clientGivenName": "John",
            "clientSurname": "Doe",
            "clientPreferredName": "Johnny",
            "clientGender": "Male",
            "clientDOB": "1990-01-01",
            "clientAge": 34,
            "clientMaritalStatus": "Single",
            "clientEmploymentStatus": "Employed",
            "clientHealth": "Good",
            "clientSmoker": "No",
            "clientPlannedRetirementAge": 65,
            "clientHomeAddress": "123 Main St",
            "clientPostcode": 12345,
            "clientHomePhone": "555-555-5555",
            "clientWorkPhone": "555-555-5556",
            "clientMobile": "555-555-5557",
            "Email": "john.doe@example.com",
            "clientPostalAddress": "123 Main St",
            "clientPostalPostCode": 12345,
            "clientMiddleName": "Michael",
            "clientOccupationID": "OCC123",
            "clientTaxResidentRadio": "Yes",
            "clientPrivateHealthCoverRadio": "Yes",
            "clientHELPSDebtRadio": "No",
            "clientSameAsAbove": true,
            "clientRetirement": "Comfortable",

        },
        "partner": {
        },
        "children": {
            "numberOfChildren": 2,
        },
        "haveAnyChildren": "No",
    },
});

export const AllUsers = atom({
    key: "AllUsers",
    default: [],
});

export const QuestionDetail = atom({
    key: "QuestionDetail",
    default: {},
});

export const GoalsDetail = atom({
    key: "GoalsDetail",
    default: {},
});

export const GQState = atom({
    key: "GQState",
    default: {
        clientFK: "",

        "adviceOnSurplusIncomeGoal": "No",
        "analysisOfPersonalInsuranceGoal": "No",
        "boatGoal": "No",
        "budgetGoal": "No",
        "businessGoal": "No",
        "carGoal": "No",
        "caravanGoal": "No",
        "careGoal": "No",
        "centreLinkEligibilityGoal": "No",
        "childrenEducationGoal": "No",
        "combinedSuperIntoOneGoal": "No",
        "contributeMoneyIntoSuperGoal": "No",
        "creditCardGoal": "No",
        "downSizeFamilyHomeGoal": "No",
        "emergencyFundGoal": "No",
        "estatePlanningGoal": "No",
        "familyLifeStyleGoal": "No",
        "familyTrustGoal": "No",
        "financialAdviceGoal": "No",
        "holidayGoal": "No",
        "homeLoanGoal": "No",
        "houseGoal": "No",
        "retirementIncomeStreamGoal": "No",
        "inheritanceGoal": "No",
        "investmentPortfolioGoal": "No",
        "investmentPropertyGoal": "No",
        "leaveInheritanceGoal": "No",
        "payLessTaxGoal": "No",
        "reducePersonalInsuranceCoverGoal": "No",
        "regularSavingsGoal": "No",
        "renovateFamilyHomeGoal": "No",
        "retainCurrentPersonalInsurancesGoal": "No",
        "planForRetirementGoal": "No",
        "reviewInvestmentPortfolioGoal": "No",
        "reviewPersonalInsuranceCoverGoal": "No",
        "reviewSuperGoal": "No",
        "setSuperIncomeStreamGoal": "No",
        "SMSFGoal": "No",
        "startFamilyGoal": "No",
        "upgradeFamilyHomeGoal": "No",
        "weddingGoal": "No",
    },
});

export const RiskQuestion = atom({
    key: "RiskQuestion",
    default: {
        "client": {
            "question1": 1,
            "question2": 1,
            "question3": 1,
            "question4": 1,
            "question5": 1,
            "question6": 1,
            "question7": 1,
            "question8": 1,
            "riskGoal": "Conservative",
            "riskDescription": "",
            "happyWithResult": false,
            "confirmRiskProfileCheck1": false,
            "confirmRiskProfileCheck2": false,
            "confirmRiskProfileCheck3": false,
            "addNoteDescription": ""
        },
        "partner": {
            "question1": 1,
            "question2": 1,
            "question3": 1,
            "question4": 1,
            "question5": 1,
            "question6": 1,
            "question7": 1,
            "question8": 1,
            "riskGoal": "Conservative",
            "riskDescription": "",
            "happyWithResult": false,
            "confirmRiskProfileCheck1": false,
            "confirmRiskProfileCheck2": false,
            "confirmRiskProfileCheck3": false,
            "addNoteDescription": ""
        },
        "joinedProfile": "No",
        "currentQuestion": "5"
    },
});

export const LoggedInUserData = atom({
    key: "LoggedInUserData",
    default: "",
});

export const LoggedInUserTokenJwt = atom({
    key: "LoggedInUserTokenJwt",
    default: "",
});

export const StepsStatus = atom({
    key: "StepsStatus",
    default: false,
});

export const BankDetail = atom({
    key: "BankDetail",
    default: [],
});
