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

        termDepositsFinance: "No",
        BankAccountFinance: "No",
        australianSharesFinance: "No",
        investmentBondFinance: "No",
        managedFunds: "No",
        managedFundsLOC: "No",
        managedFundsMarginLoan: "No",

        cars: "No",
        boat: "No",
        caravan: "No",
        personalAssets: "No",
        personalLoans: "No",
        creditCards: "No",

        familyHome: "No",
        familyHomeLoan: "No",
        numberOfHolidayHome: "",

        investmentPropertyDetails: "No",
        investmentPropertyLoan: "No",
        incomeExpenses: "No",

        superAnnuationIssues: "No",
        accountBasedPensionIssues: "No",
        annuitiesIssues: "No",

        will: "No",
        POA: "No",
        professionalAdviser: "No",

               
        incomeFromOwnBusiness:"No",
        incomeFromSoleTrader:"No",
        incomeFromPartnership:"No",
        incomeFromCentrelink:"No",
        incomeFromSuperPayment:"No",
        incomeFromOverseasPension:"No",
        incomeFromInheritance:"No",
        incomeFromLumpsumExpense: "No",
        incomeFromRegularLivingExpenses: "Yes", // this one should be yes always
        
        BusinessAsCompanyStructure:"No",

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
    default: "http://192.168.100.27:7000",
    // default: "http://192.168.1.5:7000",
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
        Partner: {},
        Client: {},
        Child: []
    },
});

export const QuestionDetail = atom({
    key: "QuestionDetail",
    default: {},
});
