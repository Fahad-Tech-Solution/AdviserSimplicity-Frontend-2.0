import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'

// import React from "react";

// import "./AdditionalQueries.css";
import BankImg from "../svgs/bank.svg";
import TermImg from "../svgs/Chart.jpg";
import PortFolio from "../svgs/portfolio.svg";
import analytics from "../svgs/analytics.png";
import funds from "../svgs/funds.svg";
import certificate from "../svgs/certificate.svg";

//Q set 2 new
import car from "../svgs/car.svg";
import boat from "../svgs/boat.svg";
import trailer from "../svgs/trailer-caravan.svg";
import settingMoney from "../svgs/settingMoney.svg";
import moneyGiving from "../svgs/moneyGiving.png";
import credit from "../svgs/credit-card-refund-svgrepo-com.svg";


//Q set 3
import houseHold from "../svgs/warehouse-.svg";
import otherAssets from "../svgs/funds.svg";
import Questions_Home from "../svgs/home-svgrepo-com.svg";

//Q set 4
import property from "../svgs/property-value.svg";
import loan from "../svgs/loan.svg";
import rent from "../svgs/rent.svg";

//Q set 5
import piggybank1 from "../svgs/piggy-bank.svg";
import piggybank2 from "../svgs/piggy-bank-new.svg";
import calender from "../svgs/calendar.png";


//Q set 6
import will from "../svgs/page-with-curl-svgrepo-com.svg";
import POA from "../svgs/conversation-person-svgrepo-com.svg";
import advisor from "../svgs/online-interview-male-svgrepo-com.svg";

// Q set 7
import Businessman from "../svgs/businessman.svg";
import businessIncome from "../svgs/business-income.png";
import businessPartnership from "../svgs/businessPartnership.png";
import Gears from "../svgs/gears-gear-svgrepo-com.svg";
import money from "../svgs/money-3.svg";
import overseas from "../svgs/overseas.svg";
import inheritance from "../svgs/inheritance.png";
import moneyBag from "../svgs/money-bag-svgrepo-com.svg";
import moneyBagPng from "../svgs/money-bag.png";



import Business_building from "../svgs/building-small-svgrepo-com.svg";
import Business_TeamHandshake from "../svgs/team_Handshake.png";

//Q set 8
import people from "../svgs/Questions_People.png";

import incomeImg from "../svgs/asd.png";
import traumaImg from "../svgs/traumaimg.svg";
import lifeImg from "../svgs/lifeimg.svg";
import TPDImg from "../svgs/tpdimg.svg";


import { useRecoilState, useRecoilValue } from "recoil";
import { QuestionShift, CRState, defaultUrl, QuestionDetail } from "../../../Store/Store";
import { Button, Card, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import ModalComponent from './ModalComponent';
import BankTermForm from './QuestionsDetail/BankTermForm';
import { openNotificationSuccess, PatchAxios, PostAxios, toCommaAndDollar } from '../../Assets/Api/Api';
import TermDeposit from './QuestionsDetail/TermDeposit';


import AustralianShares from './QuestionsDetail/AustralianShares';
import ManagedFunds from './QuestionsDetail/ManagedFunds';
import InvestmentLoan from './QuestionsDetail/InvestmentLoan';
import MarginLoan from './QuestionsDetail/MarginLoan';
import PersonalLoan from './QuestionsDetail/PersonalLoan';
import CreditCard from './QuestionsDetail/CreditCard';
// import HomeLoan from './QuestionsDetail/HomeLoan';
// import OwnFamilyHome from './QuestionsDetail/OwnFamilyHome';
import InvestmentPropertyDetails from './QuestionsDetail/InvestmentPropertyDetails';
import InvestmentPropertyLoan from './QuestionsDetail/InvestmentPropertyLoan';
import QuestionIncomeExpanse from './QuestionsDetail/QuestionIncomeExpanse';
import HolidayHome from './QuestionsDetail/HolidayHome';

import EstatePlanningWill from '../EstatePlanning/EstatePlanningWill';
import EstatePlanningPOA from '../EstatePlanning/EstatePlanningPOA';
import EstatePlanningProfessionalAdviser from '../EstatePlanning/EstatePlanningProfessionalAdviser';

import HolidayHomeLoan from './QuestionsDetail/HolidayHomeLoan';
import CenterLinkPayments from '../PersonalIncome/CenterLinkPayments';
import EmploymentIncome from '../PersonalIncome/EmploymentIncome';
import SoleTrader from '../PersonalIncome/SoleTrader';
import Partnership from '../PersonalIncome/Partnership';
import RegularLivingExpenses from '../PersonalIncome/RegularLivingExpenses';
import LifeTimeBeneFits from '../PersonalIncome/LifetimeBenefits';
import OverseasPension from '../PersonalIncome/OverseasPension';
import Inheritance from '../PersonalIncome/Inheritance';
import LumpsumExpenses from '../PersonalIncome/LumpsumExpenses';
import TradingCompany from '../BusinessEntities/TradingCompany';
import TradingTrust from '../BusinessEntities/TradingTrust';
import SMSFInvestmentProperty from '../QuestoinsSMSF/SMSFInvestmentProperty';
import SMSFInvestmentPropertyModalComp from '../QuestoinsSMSF/SMSFInvestmentPropertyModalComp';
import SMSFInvestmentHomeLoanComp from '../QuestoinsSMSF/SMSFInvestmentHomeLoanComp';
import InvestmentHomeExpanse from '../QuestoinsSMSF/InvestmentHomeExpanse';
import SmsfAccumulationDetails from '../QuestoinsSMSF/SmsfAccumulationDetails';
import SmsfDetails from '../QuestoinsSMSF/SmsfDetails';
import SmsfPensionAccount from '../QuestoinsSMSF/PensionAccount';
import FamilyInvestmentProperty from '../QuestoinsFamilyTrust/FamilyInvestmentProperty';
import FamilyDetails from '../QuestoinsFamilyTrust/FamilyDetails';
import FamilyInvestmentPropertyModalComp from '../QuestoinsFamilyTrust/FamilyInvestmentPropertyModalComp';
import FamilyInvestmentHomeLoanComp from '../QuestoinsFamilyTrust/FamilyInvestmentHomeLoanComp';
import FamilyInvestmentHomeExpanse from '../QuestoinsFamilyTrust/FamilyInvestmentHomeExpanse';
import PersonalInsuranceLife from '../PersonalInsurance/LifeInsurance';
import PersonalInsuranceTPD from '../PersonalInsurance/TPD';
import PersonalInsuranceTrauma from '../PersonalInsurance/Trauma';
import IncomeProtection from '../PersonalInsurance/IncomeProtection';
import CombinedSwitch from '../CombinedSwitch/CombinedSwitch';

//new comment

import { FaRegSave } from "react-icons/fa";
import AssetInfo from '../AdditionalQueriesPersonalAssets/AssetInfo';
import TowInOneSwitch from '../AdditionalQueriesPersonalAssets/TowInOneSwitch';
import OwnFamilyHome from '../AdditionalQueriesPersonalAssets/OwnFamilyHome';
import MiddleWare from './MiddleWare';
import SampleOne from '../AdditionalQueriesPersonalAssets/SampleOne';

const QuestionCards = (props) => {

    let [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);
    let [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);

    let CRObject = useRecoilValue(CRState);
    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});
    let [arrayCount, setArrayCount] = useState();


    let arrayObj = {

        PersonalAssets: [
            {
                title: "Own a Family Home",
                key: "familyHome",
                img: Questions_Home,
            },
            {
                title: "Car",
                key: "car",
                api: "/car",
                img: car
            },
            {
                title: "House hold",
                key: "houseHold",
                api: "/houseHold",
                img: houseHold
            },
            {
                title: "Boat",
                key: "boat",
                api: "/boat",
                img: boat
            },
            {
                title: "Caravan",
                key: "caravan",
                api: "/caravan",
                img: trailer
            },
            {
                title: "Other Assets",
                key: "otherAssets",
                api: "/personalAssets",
                img: settingMoney
            },
            // {
            //     title: "Personal Assets",
            //     key: "personalAssets",
            //     api: "/personalAssets",
            //     img: settingMoney
            // },
            // {
            //     title: "Credit Card",
            //     key: "creditCards",
            //     img: credit
            // },
            {
                title: "Personal Debt",
                key: "personalLoans",
                img: moneyGiving
            },

        ],
        Lifestyle: [
            {
                title: "Own a Family Home",
                key: "familyHome",
                img: Questions_Home
            },
            {
                title: "Home Loan",
                key: "familyHomeLoan",
                img: loan
            },
        ],
        FinancialInvestments: [
            {
                title: "Bank Accounts",
                key: "bankAccountFinance",
                img: BankImg
            },
            {
                title: "Term Deposits",
                key: "termDepositsFinance",
                img: TermImg
            },
            {
                title: "Australian Shares",
                key: "australianShareMarket",
                img: PortFolio
            },
            {
                title: "Managed Funds",
                key: "managedFund",
                img: funds
            },
            {
                title: "Investment Bond",
                key: "investmentBondFinance",
                img: certificate
            },
            {
                title: "Investment Loan",
                key: "managedFundsLOC",
                img: loan
            },
            {
                title: "Margin Loan",
                key: "managedFundsMarginLoan",
                img: analytics
            },
            //SuperAndRetirement
            {
                title: "Super Funds",
                key: "superAnnuationIssues",
                img: piggybank1
            },
            {
                title: "Account Based Pension",
                key: "accountBasedPensionIssues",
                img: piggybank2
            },
            {
                title: "Invested in Annuities",
                key: "annuitiesIssues",
                img: calender
            },
            // Investment
            {
                title: "Investment Property Details",
                key: "investmentPropertyDetails",
                img: property
            },

        ],
        SuperAndRetirement: [
            {
                title: "Super Funds",
                key: "superAnnuationIssues",
                img: piggybank1
            },
            {
                title: "Account Based Pension",
                key: "accountBasedPensionIssues",
                img: piggybank2
            },
            {
                title: "Invested in Annuities",
                key: "annuitiesIssues",
                img: calender
            },

        ],
        Investment: [
            {
                title: "Investment Property Details",
                key: "investmentPropertyDetails",
                img: property
            },
            {
                title: "Investment Property Loan",
                key: "investmentPropertyLoan",
                img: loan
            },
            {
                title: "Income & Expenses",
                key: "incomeExpenses",
                img: rent
            },
        ],
        EstatePlanning: [
            {
                title: "Wills",
                key: "will",
                img: will
            },
            {
                title: "Power of Attorneys",
                key: "POA",
                img: POA
            },
            {
                title: "Professional Advisers",
                key: "professionalAdviser",
                img: advisor
            },

        ],
        PersonalIncome: [
            {
                title: "Employement Income",
                key: "incomeFromOwnBusiness",
                img: Businessman
            },
            {
                title: "Sole Trader",
                key: "incomeFromSoleTrader",
                img: businessIncome
            },
            {
                title: "Partnership",
                key: "incomeFromPartnership",
                img: businessPartnership
            },
            {
                title: "Centerlink Payments",
                key: "incomeFromCentrelink",
                img: Gears
            },
            {
                title: "LifeTime Benefits",
                key: "incomeFromSuperPayment",
                img: money
            },
            {
                title: "Overseas Pension",
                key: "incomeFromOverseasPension",
                img: overseas
            },
            {
                title: "Inheritance",
                key: "incomeFromInheritance",
                img: inheritance
            },
            {
                title: "Lumpsum Expenses",
                key: "incomeFromLumpsumExpense",
                img: moneyBag
            },
            {
                title: "Regular Living Expenses",
                key: "incomeFromRegularLivingExpenses",
                img: moneyBagPng
            },

        ],
        BusinessEntities: [
            {
                title: "Business as Company Structure",
                key: "BusinessAsCompanyStructure",
                img: Business_building
            },
            // {
            //     title: "Business as Trusts",
            //     key: "BusinessAsTrusts",
            //     img: Business_TeamHandshake
            // },
            // {
            //     title: "Business as SMSF",
            //     key: "SMSFManagedFundsTab",
            //     img: Business_SMSF
            // },
            // {
            //     title: "Business as Investment Trust",
            //     key: "businessAsInvestmentTab",
            //     img: Questions_People
            // },
        ],
        SMSF: [
            {
                title: "SMSF Details",
                key: "SMSFDetails",
                img: will
            },
            {
                title: "SMSF Accumulation Details",
                key: "SMSFAccumulationDetails",
                img: property
            },
            {
                title: "SMSF Bank Accounts",
                key: "SMSFBank",
                img: BankImg
            },
            {
                title: "SMSF Term Deposits",
                key: "SMSFTermDeposits",
                img: TermImg
            },
            {
                title: "SMSF Australian Shares",
                key: "SMSFAustralianShares",
                img: PortFolio
            },
            {
                title: "SMSF Managed Funds",
                key: "SMSFManagedFunds",
                img: funds
            },
            {
                title: "SMSF Investment Loan",
                key: "SMSFInvestmentLoan",
                img: analytics
            },
            {
                title: "SMSF Investment Properties",
                key: "SMSFInvestmentProperties",
                img: people
            },
            {
                title: "SMSF Pension Phase",
                key: "SMSFPensionPhase",
                img: calender
            },
        ],
        FamilyTrust: [
            {
                title: "Family Trust Details",
                key: "familyDetails",
                img: will
            },
            {
                title: "Family Trust Bank Accounts",
                key: "familyBank",
                img: BankImg
            },
            {
                title: "Family Trust Term Deposits",
                key: "familyTermDeposit",
                img: TermImg
            },
            {
                title: "Family Trust Australian Shares",
                key: "familyAustralianShare",
                img: PortFolio
            },
            {
                title: "Family Trust Managed Funds",
                key: "familyMangedFunds",
                img: funds
            },
            {
                title: "Family Trust Investment Loan",
                key: "familyInvestmentHomeLoan",
                img: analytics
            },
            {
                title: "Family Trust Investment Property",
                key: "familyInvestmentProperties",
                img: people
            },
            {
                title: "Family Trust Pension Phase",
                key: "familyPensionPhase",
                img: calender
            },

        ],
        PersonalInsurance: [
            {
                title: "Life Insurance",
                key: "life",
                img: lifeImg,
            },
            {
                title: "TPD",
                key: "TPD",
                img: TPDImg,
            },
            {
                title: "Trauma",
                key: "trauma",
                img: traumaImg,
            },
            {
                title: "Income Protection",
                key: "incomeProtection",
                img: incomeImg,
            },
        ]
    }

    useEffect(() => {
        countYesAttributes();

        // fetchData();
    }, [CRObject])

    function countYesAttributes() {
        let a = []
        let lengthOfa = 0;
        if (props.Question == "FamilyTrust") {
            arrayObj[props.Question].map((elem, index) => {
                if (CRObject[elem.key] === "Yes") {
                    a.push("yes");
                    // console.log("yes")
                }
            })
            lengthOfa = a.length - 1;
            setArrayCount(lengthOfa + CRObject.numberOfFamilyInvestmentProperties)
        }
        else if (props.Question == "SMSF") {
            arrayObj[props.Question].map((elem, index) => {
                if (CRObject[elem.key] === "Yes") {
                    a.push("yes");
                    // console.log("yes")
                }
            })
            lengthOfa = a.length - 1;
            setArrayCount(lengthOfa + CRObject.numberOfSMSFInvestmentProperties)
        }
        else if (props.Question == "Lifestyle") {
            arrayObj[props.Question].map((elem, index) => {
                if (CRObject[elem.key] === "Yes") {
                    a.push("yes");
                    // console.log("yes")
                }
            })
            lengthOfa = a.length - 1;
            setArrayCount(lengthOfa + CRObject.numberOfHolidayHome)
        }
        else {
            arrayObj[props.Question].map((elem, index) => {
                if (CRObject[elem.key] === "Yes") {
                    a.push("yes");
                    // console.log("yes")
                }
            })
            setArrayCount(a.length)
        }

    }

    let OpenModal = (title, Input) => {
        // alert(title + " ++ " + Input);
        setModalObject({
            title,
            Input
        })
        setFlagState(true);
    }
    let OpenModalClient2 = (title, Input, title2) => {
        // alert(title + " ++ " + Input);
        setModalObject({
            title,
            Input,
            title2
        })
        setFlagState(true);
    }
    let OpenModal2 = (title, Input, index) => {
        // alert(title + " ++ " + Input);
        setModalObject({
            title,
            Input,
            index
        })
        setFlagState(true);
    }
    let OpenReuseModal = (title, Input, key) => {
        // alert(title + " ++ " + Input);
        setModalObject({
            title,
            Input,
            key
        })
        setFlagState(true);
    }
    let DefaultUrl = useRecoilValue(defaultUrl)

    // const CardForms = ["car", "boat", "caravan", "personalAssets"]; // add "Key" of Question on which you want to add Form in Cards only no pop ups
    const JointHidden = ["superAnnuationIssues", "accountBasedPensionIssues", "annuitiesIssues", "will", "POA", "professionalAdviser", "incomeFromOwnBusiness", "incomeFromSoleTrader", "incomeFromPartnership", "incomeFromCentrelink", "incomeFromSuperPayment", "incomeFromOverseasPension", "incomeFromInheritance", "incomeFromLumpsumExpense", "incomeFromRegularLivingExpenses", "life", "TPD", "trauma", "incomeProtection"]; // Add other titles that should use "xl" here
    const singleClient = ["incomeFromRegularLivingExpenses"]; // add "Key" of Question on which you want to add Form in Cards only no pop ups

    const combinedArray = ["incomeFromOwnBusiness", "incomeFromOwnBusiness", "incomeFromSoleTrader", "incomeFromPartnership", "incomeFromCentrelink", "incomeFromSuperPayment", "incomeFromOverseasPension", "car", "boat", "caravan", "personalAssets", "houseHold", "otherAssets", "familyHome", "investmentBondFinance", "managedFundsMarginLoan", "managedFundsLOC", "will", "POA",]; // add "Key" of Question on which you want to add Form in Cards only no pop ups

    const towInOne = ["personalLoans"];
    const sampleOne = ["investmentPropertyDetails"];

    const reuseModal = ["bankAccountFinance", "termDepositsFinance", "australianShareMarket", "managedFund", "investmentBondFinance", "SMSFTermDeposits", "SMSFAustralianShares", "SMSFManagedFunds", "SMSFInvestmentLoan", "familyBank", "familyTermDeposit", "familyAustralianShare", "familyMangedFunds", "familyInvestmentHomeLoan", "SMSFBank", "superAnnuationIssues", "accountBasedPensionIssues", "annuitiesIssues", "BusinessAsCompanyStructure", "BusinessAsTrusts"]; // add "Key" of Question on which you want to add Form in Cards only no pop ups

    let homeArray = [
        {
            title: "Holiday Home",
            key: "holidayHome",
            img: Questions_Home
        },
        {
            title: "Holiday Home Loan",
            key: "holidayHomeLoan",
            img: loan
        },
    ]

    const componentMapping = {

        //Income and Expense
        "Employement Income": <EmploymentIncome />,
        "Centerlink Payments": <CenterLinkPayments />,
        "Sole Trader": <SoleTrader />,
        "Partnership": <Partnership />,
        "Regular Living Expenses": <RegularLivingExpenses />,
        "LifeTime Benefits": <LifeTimeBeneFits />,
        "Overseas Pension": <OverseasPension />,
        "Inheritance": <Inheritance />,
        "Lumpsum Expenses": <LumpsumExpenses />,

        //Personal Assets & Liabilities
        "Own a Family Home": <OwnFamilyHome />,
        "Car": <AssetInfo />,
        "Boat": <AssetInfo />,
        "Caravan": <AssetInfo />,
        "Personal Assets": <AssetInfo />,
        "House hold": <AssetInfo />,
        "Other Assets": <AssetInfo />,
        "Personal Loan": <PersonalLoan />,
        "Credit Card": <CreditCard />,


        //Financial Investments
        "Bank Accounts": <MiddleWare />,              //reuse Component
        "Term Deposits": <MiddleWare />,               //reuse Component
        "Australian Shares": <MiddleWare />,      //reuse Component
        "Managed Funds": <MiddleWare />,              //reuse Component
        "Investment Bond": <MiddleWare />,
        "Investment Loan": <InvestmentLoan />,          //reuse Component
        "Margin Loan": <MarginLoan />,
        //Following 4 have combined in Financial Investment
        //Super and Requirement
        "Super Funds": <MiddleWare />,
        "Account Based Pension": <MiddleWare />,
        "Invested in Annuities": <MiddleWare />,
        //Investment Trust
        "Investment Property Details": <InvestmentPropertyDetails />,

        //property Home
        // "Own a Family Home": <OwnFamilyHome />,
        // "Home Loan": <HomeLoan />,
        "Holiday Home": <HolidayHome />,
        "Holiday Home Loan": <HolidayHomeLoan />,

        //Investment Trust
        // "Investment Property Loan": <InvestmentPropertyLoan />,  //it became inner Modal of Investment Property Details
        // "Income & Expenses": <QuestionIncomeExpanse />,  //it became inner Modal of Investment Property Details

        //estate Planing 
        "Wills": <EstatePlanningWill />,
        "Power of Attorneys": <EstatePlanningPOA />,
        "Professional Advisers": <EstatePlanningProfessionalAdviser />,

        //Business
        "Business as Company Structure": <MiddleWare />,
        "Business as Trusts": <MiddleWare />,

        //SMSF
        "SMSF Bank Accounts": <BankTermForm />,         //reuse Component
        "SMSF Term Deposits": <TermDeposit />,          //reuse Component
        "SMSF Australian Shares": <AustralianShares />, //reuse Component
        "SMSF Managed Funds": <ManagedFunds />,         //reuse Component
        "SMSF Investment Loan": <InvestmentLoan />,     //reuse Component
        //looping Question
        "Investment Home": <SMSFInvestmentPropertyModalComp />,
        "Investment Home Loan": <SMSFInvestmentHomeLoanComp />,
        "Investment Home Expanse": <InvestmentHomeExpanse />,
        //looping Question end
        "SMSF Pension Phase": <SmsfPensionAccount />,               //reuse Component
        "SMSF Details": <SmsfDetails />,                            //reuse Component
        "SMSF Accumulation Details": <SmsfAccumulationDetails />,   //reuseComponent

        "Family Trust Bank Accounts": <BankTermForm />,
        "Family Trust Term Deposits": <TermDeposit />,
        "Family Trust Australian Shares": <AustralianShares />,
        "Family Trust Managed Funds": <ManagedFunds />,
        "Family Trust Investment Loan": <InvestmentLoan />,
        "Family Trust Details": <FamilyDetails />,

        "Family Investment Home": <FamilyInvestmentPropertyModalComp />,
        "Family Investment Home Loan": <FamilyInvestmentHomeLoanComp />,
        "Family Investment Home Expanse": <FamilyInvestmentHomeExpanse />,

        // Personal insurance
        "Life Insurance": <PersonalInsuranceLife />, //reuseComponent
        "TPD": <PersonalInsuranceTPD />, //reuseComponent
        "Trauma": <PersonalInsuranceTrauma />, //reuseComponent
        "Income Protection": <IncomeProtection />, //reuseComponent

    };

    const ModalContent = (obj) => {
        return componentMapping[obj.title] || null;
    };

    const getInitialValuesRegularIncome = () => {
        let initialValues = {};


        if (questionDetail?.retirementLivingExpenses && questionDetail?.retirementLivingExpenses?._id) {
            // Ensure questionDetail and its nested properties are defined before accessing them
            const data = questionDetail.retirementLivingExpenses;

            // Check if data is defined and has a property `retirementLivingExpense`
            if (data && data._id) {
                initialValues = data;
            }
        }

        // console.log("asda", initialValues,);

        return initialValues;
    };

    let handleSubmitRegularIncome = async (values) => {
        console.log(values)

        let check = questionDetail && questionDetail?.retirementLivingExpenses?._id ? true : false;

        let obj = {
            retirementLivingExpense: values.retirementLivingExpense,
            clientFK: localStorage.getItem("UserID"),
        }

        try {
            let res;

            if (!check) {
                res = await PostAxios(`${DefaultUrl}/api/retirementLivingExpenses/Add`, obj);
            } else {
                obj._id = questionDetail.retirementLivingExpenses._id;
                res = await PatchAxios(`${DefaultUrl}/api/retirementLivingExpenses/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail };
                updatedData["retirementLivingExpenses"] = res;
                setQuestionDetail(updatedData);
            }
            // type, placement, message, description
            openNotificationSuccess("success", 'topRight', "Notification", "Retirement Living Data Successfully Saved!")

        } catch (error) {
            console.error("Error occurred while making API call:", error);
            openNotificationSuccess("error", 'topRight', "Error Notification", "Retirement Living Data is not Saved! Please Try Again.")
        }
    }

    return (
        <div className="container-fluid my-4 ">

            <ModalComponent modalObject={modalObject} setFlagState={setFlagState} flagState={flagState} >
                {ModalContent(modalObject)}
            </ModalComponent>

            <div className="row m-0 justify-content-start align-items-stretch">
                {arrayObj[props.Question].map((elem, index) => {
                    if (CRObject[elem.key] === "Yes") {

                        // const cardSwitch = CardForms.includes(elem.key) ? true : false;
                        const jointClass = JointHidden.includes(elem.key) ? "d-none" : "";
                        const singleSwitch = singleClient.includes(elem.key) ? true : false;
                        const reuseSwitch = reuseModal.includes(elem.key) ? true : false;
                        const combinedSwitch = combinedArray.includes(elem.key) ? true : false;
                        const TowInSwitch = towInOne.includes(elem.key) ? true : false;
                        const SampleOneSwitch = sampleOne.includes(elem.key) ? true : false;

                        const SMSFInP = elem.key === "SMSFInvestmentProperties" ? true : false;
                        const FamilyInP = elem.key === "familyInvestmentProperties" ? true : false;
                        const PartnerClass = localStorage.getItem("UserStatus") === "Single" ? "d-none" : "";

                        if (singleSwitch) {
                            return (
                                <div className={`col-md-3 mb-4`} key={index}>
                                    <Card className="py-4 shadow borderOverAll" style={{ borderRadius: "20px", height: "100%" }}>
                                        <h5 className='text-center' onClick={() => { console.log(questionDetail) }}>{elem.title}</h5>
                                        <div className="QuestionIcon w-25">
                                            <img className="img-fluid" src={elem.img} alt="" />
                                        </div>
                                        <div
                                            className="row justify-content-center align-items-center my-2"
                                        >
                                            <div className='col-12 p-0 '>
                                                <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                                    <label
                                                        className=" d-block text-end"
                                                        htmlFor={"client" + elem.key}
                                                    >General Living</label>

                                                    <label
                                                        className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                                        onClick={() => { OpenModalClient2(elem.title, "client", "General Living") }}
                                                    >
                                                        <div>
                                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="text"
                                            className="form-control inputDesign "
                                            id={"client" + elem.key}
                                            placeholder={"General Living Expenses"}
                                            name={"client" + elem.key}
                                            value={questionDetail && questionDetail?.generalLivingExpenses && questionDetail?.generalLivingExpenses?.generalLivingExpensesTotal ? questionDetail.generalLivingExpenses.generalLivingExpensesTotal : ""}
                                        />
                                        <div
                                            className="row justify-content-center align-items-center my-2"
                                        >
                                            <div className='col-12 p-0 '>
                                                <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                                    <label
                                                        className=" d-block"
                                                        htmlFor={"retirementLivingExpense"}
                                                    >Retirement Living</label>
                                                </div>
                                            </div>
                                        </div>
                                        <Formik
                                            initialValues={getInitialValuesRegularIncome()}
                                            onSubmit={handleSubmitRegularIncome}
                                            enableReinitialize
                                        >
                                            {({ values, setFieldValue }) => {
                                                return (<Form>
                                                    <InputGroup className="inputDesign p-0">
                                                        <Field type="text"
                                                            className="form-control inputDesignDoubleInput"
                                                            id={"retirementLivingExpense"}
                                                            placeholder={elem.title}
                                                            name={"retirementLivingExpense"}
                                                            onChange={(e) => {
                                                                setFieldValue(e.target.name,
                                                                    toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                            }}
                                                        />
                                                        <Button type="submit" className='btn bgColor modalBtn border-0' >
                                                            <FaRegSave />
                                                        </Button>
                                                    </InputGroup>
                                                </Form>)
                                            }}
                                        </Formik>

                                    </Card>
                                </div>
                            );

                        }
                        else if (reuseSwitch) {
                            return (
                                <div className={`col-md-3 mb-4`} key={index}>
                                    <Card className="py-4 shadow borderOverAll" style={{ borderRadius: "20px", height: "100%" }}>
                                        <h5 className='text-center' onClick={() => { console.log(questionDetail[elem.key]) }}>{elem.title}</h5>
                                        <div className="QuestionIcon w-25">
                                            <img className="img-fluid" src={elem.img} alt="" />
                                        </div>
                                        <div
                                            className="row justify-content-center align-items-center my-2"
                                        >
                                            <div className='col-12 p-0 '>
                                                <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                                    <label
                                                        className=" d-block text-end"
                                                        htmlFor={"client" + elem.key}
                                                    >{localStorage.getItem("UserName") || "You"}</label>

                                                    <label
                                                        className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                                        onClick={() => { OpenReuseModal(elem.title, "client", elem.key) }}
                                                    >
                                                        <div>
                                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="text"
                                            className="form-control inputDesign "
                                            id={"client" + elem.key}
                                            placeholder={elem.title}
                                            name={"client" + elem.key}
                                            value={questionDetail && questionDetail[elem.key]?.clientTotal ? questionDetail[elem.key].clientTotal : ""}
                                        />
                                        <div
                                            className={`row justify-content-center align-items-center my-2 ${PartnerClass}`}
                                        >
                                            <div className='col-12 p-0 '>
                                                <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                                    <label
                                                        className=" d-block text-end"
                                                        htmlFor={"partner" + elem.key}
                                                    >{localStorage.getItem("PartnerName") || "Partner"}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="text"
                                            className={`form-control inputDesign ${PartnerClass}`}
                                            id={"partner" + elem.key}
                                            placeholder={elem.title}
                                            name={"partner" + elem.key}
                                            value={questionDetail && questionDetail[elem.key]?.partnerTotal ? questionDetail[elem.key].partnerTotal : ""}
                                        />

                                    </Card>
                                </div>
                            );
                        }
                        else if (SMSFInP) {
                            return (<SMSFInvestmentProperty PartnerClass={PartnerClass} index={index} jointClass={jointClass} elem={elem} OpenModal={OpenModal2} homeArray={homeArray} arrayCount={arrayCount} />);
                        }
                        else if (FamilyInP) {
                            return (<FamilyInvestmentProperty PartnerClass={PartnerClass} index={index} jointClass={jointClass} elem={elem} OpenModal={OpenModal2} homeArray={homeArray} arrayCount={arrayCount} />);
                        }
                        else if (combinedSwitch) {
                            return (<CombinedSwitch PartnerClass={PartnerClass} index={index} jointClass={jointClass} elem={elem} OpenModal={OpenModal2} homeArray={homeArray} arrayCount={arrayCount} />);
                        }
                        else if (TowInSwitch) {
                            return (<TowInOneSwitch PartnerClass={PartnerClass} index={index} jointClass={jointClass} elem={elem} OpenModal={OpenModal2} homeArray={homeArray} arrayCount={arrayCount} />);
                        }
                        else if (SampleOneSwitch) {
                            return (<SampleOne PartnerClass={PartnerClass} index={index} jointClass={jointClass} elem={elem} OpenModal={OpenModal2} homeArray={homeArray} arrayCount={arrayCount} />);
                        }
                        else {
                            // <div className={`col-md-${arrayCount % 2 == 0 ? '6' : '4'} mb-4`} key={index}>
                            // ya hos sukta hai bad ma chnage karna para 

                            return (
                                <div className={`col-md-3 mb-4`} key={index}>
                                    <Card className="py-4 shadow borderOverAll" style={{ borderRadius: "20px", height: "100%" }}>
                                        <h5 className='text-center' onClick={() => { console.log(questionDetail[elem.key]) }}>{elem.title}</h5>
                                        <div className="QuestionIcon w-25">
                                            <img className="img-fluid" src={elem.img} alt="" />
                                        </div>
                                        <div
                                            className="row justify-content-center align-items-center my-2"
                                        >
                                            <div className='col-12 p-0 '>
                                                <div className='d-flex flex-row justify-content-center align-items-center gap-2'>

                                                    <label
                                                        className=" d-block text-end"
                                                        htmlFor={"client" + elem.key}
                                                    >{localStorage.getItem("UserName") || "You"}</label>

                                                    <label
                                                        className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                                        onClick={() => { OpenModal(elem.title, "client") }}
                                                    >
                                                        <div>
                                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="text"
                                            className="form-control inputDesign "
                                            id={"client" + elem.key}
                                            placeholder={elem.title}
                                            name={"client" + elem.key}
                                            value={questionDetail && questionDetail[elem.key]?.clientTotal ? questionDetail[elem.key].clientTotal : ""}
                                        />
                                        <div
                                            className={`row justify-content-center align-items-center my-2 ${PartnerClass}`}
                                        >
                                            <div className='col-12 p-0 '>
                                                <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                                    <label
                                                        className=" d-block text-end"
                                                        htmlFor={"partner" + elem.key}
                                                    >{localStorage.getItem("PartnerName") || "Partner"}</label>

                                                    <label
                                                        className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                                        onClick={() => { OpenModal(elem.title, "partner") }}
                                                    >
                                                        <div>
                                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="text"
                                            className={`form-control inputDesign ${PartnerClass}`}
                                            id={"partner" + elem.key}
                                            placeholder={elem.title}
                                            name={"partner" + elem.key}
                                            value={questionDetail && questionDetail[elem.key]?.partnerTotal ? questionDetail[elem.key].partnerTotal : ""}
                                        />

                                        <div
                                            className={`row justify-content-center align-items-center my-2  ${jointClass} ${PartnerClass}`}
                                        >
                                            <div className='col-12 p-0 '>
                                                <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                                    <label
                                                        className=" d-block text-end"
                                                        htmlFor={"joint" + elem.key}
                                                    >{(localStorage.getItem("UserName") || "You") + " " + (localStorage.getItem("PartnerName") || "")}</label>

                                                    <label
                                                        className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                                        onClick={() => { OpenModal(elem.title, "joint") }}
                                                    >
                                                        <div>
                                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <input type="text"
                                            className={`form-control inputDesign ${jointClass} ${PartnerClass}`}
                                            id={"joint" + elem.key}
                                            placeholder={elem.title}
                                            name={"joint" + elem.key}
                                            value={questionDetail && questionDetail[elem.key]?.jointTotal ? questionDetail[elem.key].jointTotal : ""}
                                        />

                                    </Card>
                                </div>
                            );
                        }

                    }
                    return null;
                })}

                {props.Question == "Lifestyle" && <HolyDayHome JointHidden={JointHidden} OpenModal={OpenModal2} homeArray={homeArray} arrayCount={arrayCount} questionDetail={questionDetail} />}
            </div>

            <div className="row mt-2 d-none">
                <div className="col-md-12">
                    <button
                        onClick={() => {

                            setQuestionChange("income");
                        }}
                        className="float-end btn w-25  bgColor modalBtn"
                    >
                        Next
                    </button>
                    <button
                        onClick={() => {

                            setQuestionChange("InvestmentTrust");
                        }}
                        className="float-end btn w-25  btn-outline  backBtn mx-3">
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}


const HolyDayHome = (props) => {
    let CRObject = useRecoilValue(CRState);
    let loopIndex = CRObject.numberOfHolidayHome || 0;

    let arrayOfHolidayHome = [];

    const PartnerClass = localStorage.getItem("UserStatus") === "Single" ? "d-none" : "";

    for (let i = 0; i < loopIndex; i++) {
        arrayOfHolidayHome.push(
            props.homeArray.map((elem, index) => {
                const jointClass = props.JointHidden.includes(elem.key) ? "d-none" : "";
                return (
                    <div className={`col-md-3 mb-4`} key={i}>
                        <Card className="py-4 shadow borderOverAll" style={{ borderRadius: "20px", height: "100%" }}>
                            <h5 className='text-center' onClick={() => { console.log(props.questionDetail[elem.key]) }}>{elem.title} {parseFloat(i) + 1}</h5>
                            <div className="QuestionIcon w-25">
                                <img className="img-fluid" src={elem.img} alt="" />
                            </div>
                            <div
                                className="row justify-content-center align-items-center my-2"
                            >
                                <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                    <label
                                        className=" d-block text-end"
                                        htmlFor={"client" + elem.key}
                                    >{localStorage.getItem("UserName") || "You"}</label>

                                    <label
                                        className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                        onClick={() => { props.OpenModal(elem.title, "client", i) }}
                                    >
                                        <div>
                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <input type="text"
                                className="form-control inputDesign "
                                id={"client" + elem.key}
                                placeholder={elem.title}
                                name={"client" + elem.key}
                                value={
                                    props.questionDetail &&
                                        props.questionDetail[elem.key] &&
                                        Array.isArray(props.questionDetail[elem.key]) &&
                                        props.questionDetail[elem.key][i] &&
                                        props.questionDetail[elem.key][i].clientTotal
                                        ? props.questionDetail[elem.key][i].clientTotal
                                        : ""
                                }
                            />
                            <div
                                className={`row justify-content-center align-items-center my-2 ${PartnerClass}`}
                            >
                                <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                    <label
                                        className=" d-block text-end"
                                        htmlFor={"partner" + elem.key}
                                    >{localStorage.getItem("PartnerName") || "Partner"}</label>

                                    <label
                                        className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                        onClick={() => { props.OpenModal(elem.title, "partner", i) }}
                                    >
                                        <div>
                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <input type="text"
                                className={`form-control inputDesign ${PartnerClass}`}
                                id={"partner" + elem.key}
                                placeholder={elem.title}
                                name={"partner" + elem.key}
                                value={
                                    props.questionDetail &&
                                        props.questionDetail[elem.key] &&
                                        Array.isArray(props.questionDetail[elem.key]) &&
                                        props.questionDetail[elem.key][i] &&
                                        props.questionDetail[elem.key][i].partnerTotal
                                        ? props.questionDetail[elem.key][i].partnerTotal
                                        : ""
                                }
                            />

                            <div
                                className={`row justify-content-center align-items-center my-2 ${jointClass} ${PartnerClass}`}
                            >
                                <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                    <label
                                        className=" d-block text-end"
                                        htmlFor={"joint" + elem.key}
                                    >{(localStorage.getItem("UserName") || "You") + " " + (localStorage.getItem("PartnerName") || "")}</label>

                                    <label
                                        className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                        onClick={() => { props.OpenModal(elem.title, "joint", i) }}
                                    >
                                        <div>
                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <input type="text"
                                className={`form-control inputDesign ${jointClass} ${PartnerClass}`}
                                id={"joint" + elem.key}
                                placeholder={elem.title}
                                name={"joint" + elem.key}
                                value={
                                    props.questionDetail &&
                                        props.questionDetail[elem.key] &&
                                        Array.isArray(props.questionDetail[elem.key]) &&
                                        props.questionDetail[elem.key][i] &&
                                        props.questionDetail[elem.key][i].jointTotal
                                        ? props.questionDetail[elem.key][i].jointTotal
                                        : ""
                                }

                            />

                        </Card>
                    </div>
                )
            })
        );

    }

    return <>{arrayOfHolidayHome}</>;
};

export default QuestionCards
