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
import umbrela from "../svgs/WhatsApp Image 2023-08-11 at 19.13.12.jpg";
import will from "../svgs/page-with-curl-svgrepo-com.svg";
import POA from "../svgs/conversation-person-svgrepo-com.svg";
import advisor from "../svgs/online-interview-male-svgrepo-com.svg";
import building from "../svgs/building-small-svgrepo-com.svg";

// Q set 7
import Businessman from "../svgs/businessman.svg";
import businessIncome from "../svgs/business-income.png";
import businessPartnership from "../svgs/businessPartnership.png";
import Gears from "../svgs/gears-gear-svgrepo-com.svg";
import money from "../svgs/money-3.svg";
import overseas from "../svgs/overseas.svg";
import inheritance from "../svgs/inheritance.png";
import moneyBag from "../svgs/money-bag-svgrepo-com.svg";

//Q set 8
import Questions_SMSF from "../svgs/money-bag-svgrepo-com.svg";
import Dollar_Chart from "../svgs/WhatsApp Image 2023-08-11 at 19.42.35.jpg";
import Questions_loan from "../svgs/loan.svg";
import Questions_Bank from "../svgs/property-value.svg";

//Q set 9
import Questions_People from "../svgs/Questions_People.png";
import QuestionMoney from "../svgs/QuestionMoney.jpg";



import { useRecoilState, useRecoilValue } from "recoil";
import { QuestionShift, CRState, defaultUrl, QuestionDetail } from "../../../Store/Store";
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import ModalComponent from './ModalComponent';
import ExampleForm from './QuestionsDetail/BankTermForm';
import BankTermForm from './QuestionsDetail/BankTermForm';
import { GetAxios, PatchAxios, PostAxios } from '../../Assets/Api/Api';
import TermDeposit from './QuestionsDetail/TermDeposit';


import { json } from 'react-router-dom';
import AustralianShares from './QuestionsDetail/AustralianShares';
import ManagedFunds from './QuestionsDetail/ManagedFunds';
import InvestmentLoan from './QuestionsDetail/InvestmentLoan';
import InvestmentBond from './QuestionsDetail/InvestmentBond';
import { Button } from 'bootstrap';
import MarginLoan from './QuestionsDetail/MarginLoan';
import PersonalLoan from './QuestionsDetail/PersonalLoan';
import CreditCard from './QuestionsDetail/CreditCard';
import HomeLoan from './QuestionsDetail/HomeLoan';
import OwnFamilyHome from './QuestionsDetail/OwnFamilyHome';
import InvestmentPropertyDetails from './QuestionsDetail/InvestmentPropertyDetails';
import InvestmentPropertyLoan from './QuestionsDetail/InvestmentPropertyLoan';
import QuestionIncomeExpanse from './QuestionsDetail/QuestionIncomeExpanse';
import SuperFunds from './QuestionsDetail/SuperFunds';
import AccountBasedPension from './QuestionsDetail/AccountBasedPension';
import InvestedAnnuities from './QuestionsDetail/InvestedAnnuities';
import HolidayHome from './QuestionsDetail/HolidayHome';
import EstatePlanningWill from './QuestionsDetail/EstatePlanningWill';
import EstatePlanningPOA from './QuestionsDetail/EstatePlanningPOA';
import EstatePlanningProfessionalAdviser from './QuestionsDetail/EstatePlanningProfessionalAdviser';
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


const QuestionCards = (props) => {

    let [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);
    let [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);
    let CRObject = useRecoilValue(CRState);
    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});
    let [arrayCount, setArrayCount] = useState();
    let [lifeStyle, setLifeStyle] = useState(false);

    let arrayObj = {
        FinancialInvestments: [
            {
                title: "Bank Accounts",
                key: "BankAccountFinance",
                img: BankImg
            },
            {
                title: "Term Deposits",
                key: "termDepositsFinance",
                img: TermImg
            },
            {
                title: "Australian Shares",
                key: "australianSharesFinance",
                img: PortFolio
            },
            {
                title: "Managed Funds",
                key: "managedFunds",
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

        ],
        PersonalAssets: [
            {
                title: "Car",
                key: "cars",
                api: "/car",
                img: car
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
                title: "Personal Assets",
                key: "personalAssets",
                api: "/personalAssets",
                img: settingMoney
            },
            {
                title: "Personal Loan",
                key: "personalLoans",
                img: moneyGiving
            },
            {
                title: "Credit Card",
                key: "creditCards",
                img: credit
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
                title: "invested in Annuities",
                key: "annuitiesIssues",
                img: calender
            },

        ],
        EstatePlanning: [
            {
                title: "Will",
                key: "will",
                img: will
            },
            {
                title: "Power of Attorney",
                key: "POA",
                img: POA
            },
            {
                title: "Professional Adviser",
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
                img: moneyBag
            },

        ],
        ProfessionalAdvisor: [
            {
                title: "Personal Insurance cover",
                key: "CoverOutsideIssuesradio",
                img: umbrela
            },
            {
                title: "Wills or Power of Attornies",
                key: "PowerofAttorniesIssuesradio",
                img: will
            },
            {
                title: "Professional Advisers",
                key: "ProfessionalAdvisersIssuesradio",
                img: advisor
            },
            {
                title: "Business or Related Entities",
                key: "RelatedEntitiesIssuesradio",
                img: building
            },
        ],
        SMSF: [
            {
                title: "Self Manged Super Fund",
                key: "QuestionSMSF",
                img: Questions_SMSF
            },
            {
                title: "Investments such as Term Deposits, Shares or Managed Funds",
                key: "TermSharesManaged",
                img: Dollar_Chart
            },
            {
                title: "Investment Loans",
                key: "InvestmentLoans",
                img: Questions_loan
            },
            {
                title: "Direct Property",
                key: "DirectProperty",
                img: Questions_Bank
            },
        ],
        InvestmentTrust: [
            {
                title: "Investment Trust",
                key: "InvestmentTrust",
                img: Questions_People
            },
            {
                title: "Term Deposits, Shares or Managed Funds",
                key: "ITTermSharesManaged",
                img: QuestionMoney
            },
            {
                title: "Investment Loans",
                key: "ITInvestmentLoans",
                img: Questions_loan
            },
            {
                title: "Direct Property",
                key: "ITDirectProperty",
                img: Questions_Bank
            },
        ],
    }

    useEffect(() => {
        countYesAttributes();

        // fetchData();
    }, [CRObject])

    function countYesAttributes() {
        let a = []
        arrayObj[props.Question].map((elem, index) => {
            if (CRObject[elem.key] === "Yes") {
                a.push("yes");
                console.log("yes")
            }
        })
        // console.log(a.length, " = a ki length ya hai ")
        setArrayCount(a.length)
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
    let DefaultUrl = useRecoilValue(defaultUrl)

    // async function fetchData() {
    //     let updatedData = { ...questionDetail };
    //     const userID = localStorage.getItem("UserID");

    //     // List of API endpoints and corresponding keys in updatedData
    //     const apiEndpoints = [
    //         { url: `${DefaultUrl}/api/bankAccountFinance/${userID}`, key: 'BankAccountFinance' },
    //         { url: `${DefaultUrl}/api/termDeposit/${userID}`, key: 'termDepositsFinance' },
    //         { url: `${DefaultUrl}/api/australianShareMarket/${userID}`, key: 'australianSharesFinance' },
    //         { url: `${DefaultUrl}/api/manageFund/${userID}`, key: 'managedFunds' },
    //         { url: `${DefaultUrl}/api/investmentBondFinance/${userID}`, key: 'investmentBondFinance' },
    //         { url: `${DefaultUrl}/api/managedFundsLOC/${userID}`, key: 'managedFundsLOC' },
    //         { url: `${DefaultUrl}/api/managedFundsMarginLoan/${userID}`, key: 'managedFundsMarginLoan' },

    //         { url: `${DefaultUrl}/api/car/${userID}`, key: 'cars' },
    //         { url: `${DefaultUrl}/api/boat/${userID}`, key: 'boat' },
    //         { url: `${DefaultUrl}/api/caravan/${userID}`, key: 'caravan' },
    //         { url: `${DefaultUrl}/api/personalAssets/${userID}`, key: 'personalAssets' },
    //         { url: `${DefaultUrl}/api/personalLoans/${userID}`, key: 'personalLoans' },
    //         { url: `${DefaultUrl}/api/creditCards/${userID}`, key: 'creditCards' },

    //         { url: `${DefaultUrl}/api/familyHome/${userID}`, key: 'familyHome' },
    //         { url: `${DefaultUrl}/api/familyHomeLoan/${userID}`, key: 'familyHomeLoan' },
    //         { url: `${DefaultUrl}/api/holidayHome/${userID}`, key: 'holidayHome' },
    //         { url: `${DefaultUrl}/api/holidayHomeLoan/${userID}`, key: 'holidayHomeLoan' },

    //         { url: `${DefaultUrl}/api/investmentPropertyDetails/${userID}`, key: 'investmentPropertyDetails' },
    //         { url: `${DefaultUrl}/api/investmentPropertyLoan/${userID}`, key: 'investmentPropertyLoan' },
    //         { url: `${DefaultUrl}/api/incomeExpenses/${userID}`, key: 'incomeExpenses' },

    //         { url: `${DefaultUrl}/api/superAnnuationIssues/${userID}`, key: 'superAnnuationIssues' },
    //         { url: `${DefaultUrl}/api/accountBasedPensionIssues/${userID}`, key: 'accountBasedPensionIssues' },
    //         { url: `${DefaultUrl}/api/annuitiesIssues/${userID}`, key: 'annuitiesIssues' },
    //     ];

    //     // Default structure for finance data 1122
    //     const defaultFinanceData = {
    //         client: [],
    //         partner: [],
    //         joint: [],
    //     };

    //     try {
    //         // Function to fetch data from an API and update the corresponding key in updatedData
    //         const fetchAndUpdateData = async (endpoint) => {
    //             try {
    //                 const res = await GetAxios(endpoint.url);
    //                 if (res) {
    //                     // console.log(endpoint.key, res)
    //                     updatedData = { ...updatedData, [endpoint.key]: res };
    //                 } else {
    //                     updatedData = { ...updatedData, [endpoint.key]: defaultFinanceData };
    //                 }
    //             } catch (error) {
    //                 updatedData = { ...updatedData, [endpoint.key]: defaultFinanceData };
    //                 console.error(`Error fetching data from ${endpoint.url}:`, error);
    //             }
    //         };

    //         // Run all API calls concurrently
    //         await Promise.all(apiEndpoints.map(fetchAndUpdateData));

    //         // Update the state with the final updated data
    //         setQuestionDetail(updatedData);

    //     } catch (error) {
    //         console.error("An error occurred:", error);
    //         setQuestionDetail(updatedData); // Set the updated data in case of an error
    //     }
    // }

    const CardForms = ["cars", "boat", "caravan", "personalAssets"]; // add "Key" of Question on which you want to add Form in Cards only no pop ups
    const JointHidden = ["superAnnuationIssues", "accountBasedPensionIssues", "annuitiesIssues", "will", "POA", "professionalAdviser", "incomeFromOwnBusiness", "incomeFromSoleTrader", "incomeFromPartnership", "incomeFromCentrelink", "incomeFromSuperPayment", "incomeFromOverseasPension", "incomeFromInheritance", "incomeFromLumpsumExpense", "incomeFromRegularLivingExpenses"]; // Add other titles that should use "xl" here
    const singleClient = ["incomeFromRegularLivingExpenses"]; // add "Key" of Question on which you want to add Form in Cards only no pop ups


    let handleSubmit = async (values) => {
        // alert("ma chal gaya")
        console.log(values)

        let check = questionDetail && questionDetail[values.key]?.clientTotal
            ? true
            : false;

        let obj = {
            clientTotal: values[`client${values.key}`] || 0,
            partnerTotal: values[`partner${values.key}`] || 0,
            clientFK: localStorage.getItem("UserID"),
        }

        // console.log(obj, "obj");
        try {
            let res;

            if (!check) {
                res = await PostAxios(`${DefaultUrl}/api${values.api}/Add`, obj);
            } else {
                // obj.collection = 
                res = await PatchAxios(`${DefaultUrl}/api${values.api}/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail };
                updatedData[values.key] = res;
                setQuestionDetail(updatedData);
            }

        } catch (error) {
            console.error("Error occurred while making API call:", error);
        }

    }

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
        "Bank Accounts": <BankTermForm />,
        "Term Deposits": <TermDeposit />,
        "Australian Shares": <AustralianShares />,
        "Managed Funds": <ManagedFunds />,
        "Investment Bond": <InvestmentBond />,
        "Investment Loan": <InvestmentLoan />,
        "Margin Loan": <MarginLoan />,
        "Personal Loan": <PersonalLoan />,
        "Credit Card": <CreditCard />,
        "Own a Family Home": <OwnFamilyHome />,
        "Home Loan": <HomeLoan />,
        "Holiday Home": <HolidayHome />,
        "Holiday Home Loan": <HolidayHomeLoan />,
        "Investment Property Details": <InvestmentPropertyDetails />,
        "Investment Property Loan": <InvestmentPropertyLoan />,
        "Income & Expenses": <QuestionIncomeExpanse />,
        "Super Funds": <SuperFunds />,
        "Account Based Pension": <AccountBasedPension />,
        "invested in Annuities": <InvestedAnnuities />,
        "Will": <EstatePlanningWill />,
        "Power of Attorney": <EstatePlanningPOA />,
        //Income and Expense
        "Professional Adviser": <EstatePlanningProfessionalAdviser />,
        "Employement Income": <EmploymentIncome />,
        "Centerlink Payments": <CenterLinkPayments />,
        "Sole Trader": <SoleTrader />,
        "Partnership": <Partnership />,
        "Regular Living Expenses": <RegularLivingExpenses />,
        "LifeTime Benefits": <LifeTimeBeneFits />,
        "Overseas Pension": <OverseasPension />,
        "Inheritance": <Inheritance />,
        "Lumpsum Expenses": <LumpsumExpenses />,
    };

    const ModalContent = (obj) => {
        return componentMapping[obj.title] || null;
    };

    return (
        <div className="container-fluid my-4 ">

            <ModalComponent modalObject={modalObject} setFlagState={setFlagState} flagState={flagState} >
                {ModalContent(modalObject)}
            </ModalComponent>

            <div className="row m-0 justify-content-center align-items-stretch">
                {arrayObj[props.Question].map((elem, index) => {
                    if (CRObject[elem.key] === "Yes") {
                        const cardSwitch = CardForms.includes(elem.key) ? true : false;
                        const jointClass = JointHidden.includes(elem.key) ? "d-none" : "";
                        const singleSwitch = singleClient.includes(elem.key) ? true : false;

                        if (cardSwitch) {
                            const getInitialValues = () => {
                                let initialValues = {};

                                initialValues[`client${elem.key}`] = questionDetail && questionDetail[elem.key]?.clientTotal
                                    ? questionDetail[elem.key].clientTotal
                                    : "";

                                initialValues[`partner${elem.key}`] = questionDetail && questionDetail[elem.key]?.partnerTotal
                                    ? questionDetail[elem.key].partnerTotal
                                    : "";

                                initialValues[`api`] = elem.api;
                                initialValues[`key`] = elem.key;

                                return initialValues;
                            };

                            return (
                                <div className={`col-md-${arrayCount % 2 == 0 ? '6' : '4'} mb-4`} key={index}>
                                    <Card className="py-4 shadow borderOverAll" style={{ borderRadius: "20px", height: "100%" }}>
                                        <div className="QuestionIcon w-25">
                                            <img className="img-fluid" src={elem.img} alt="" />
                                        </div>
                                        <h5 className='text-center' onClick={() => { console.log(questionDetail) }}>{elem.title}</h5>
                                        <Formik
                                            initialValues={getInitialValues()}
                                            onSubmit={handleSubmit}
                                            enableReinitialize
                                        >
                                            {({ values }) => {
                                                return (<Form>
                                                    <div
                                                        className="row justify-content-center align-items-center my-2"
                                                    >
                                                        <div className='col-12 p-0 '>
                                                            <label
                                                                className=" d-block text-center"
                                                                htmlFor={"client" + elem.key}
                                                            >You</label>
                                                        </div>
                                                    </div>
                                                    <Field
                                                        type="number"
                                                        className="form-control inputDesign "
                                                        id={"client" + elem.key}
                                                        placeholder={"Client " + elem.title}
                                                        name={"client" + elem.key}
                                                    />
                                                    <div
                                                        className="row justify-content-center align-items-center my-2"
                                                    >
                                                        <div className='col-12 p-0 '>
                                                            <label
                                                                className=" d-block text-center"
                                                                htmlFor={"partner" + elem.key}
                                                            >Partner</label>
                                                        </div>
                                                    </div>
                                                    <Field
                                                        type="number"
                                                        className="form-control inputDesign "
                                                        id={"partner" + elem.key}
                                                        placeholder={"Partner " + elem.title}
                                                        name={"partner" + elem.key}
                                                    />
                                                    <button type='submit' className='btn bgColor modalBtn w-100 mt-4'>
                                                        {questionDetail && questionDetail[elem.key]?.clientTotal
                                                            ? "Update"
                                                            : "Save"}
                                                    </button>
                                                </Form>)
                                            }}

                                        </Formik>
                                    </Card>
                                </div>
                            );
                        }
                        else if (singleSwitch) {
                            return (
                                <div className={`col-md-${arrayCount % 2 == 0 ? '6' : '4'} mb-4`} key={index}>
                                    <Card className="py-4 shadow borderOverAll" style={{ borderRadius: "20px", height: "100%" }}>
                                        <div className="QuestionIcon w-25">
                                            <img className="img-fluid" src={elem.img} alt="" />
                                        </div>
                                        <h5 className='text-center' onClick={() => { console.log(questionDetail[elem.key]) }}>{elem.title}</h5>
                                        <div
                                            className="row justify-content-center align-items-center my-2"
                                        >
                                            <div className='col-6 p-0 '>
                                                <label
                                                    className=" d-block text-end"
                                                    htmlFor={"client" + elem.key}
                                                >General Living</label>
                                            </div>
                                            <div className='col-6 px-1 '>
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
                                        <input type="number"
                                            className="form-control inputDesign "
                                            id={"client" + elem.key}
                                            placeholder={"General Living Expenses"}
                                            name={"client" + elem.key}
                                            value={questionDetail && questionDetail[elem.key]?.clientTotal ? questionDetail[elem.key].clientTotal : ""}
                                        />
                                        <div
                                            className="row justify-content-center align-items-center my-2"
                                        >
                                            <div className='col-6 p-0 '>
                                                <label
                                                    className=" d-block text-end"
                                                    htmlFor={"client" + elem.key}
                                                >Retirement Living</label>
                                            </div>
                                            <div className='col-6 px-1 '>
                                                <label
                                                    className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                                    onClick={() => { OpenModalClient2(elem.title, "client", "Retirement Living Expenses") }}
                                                >
                                                    <div>
                                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <input type="number"
                                            className="form-control inputDesign "
                                            id={"partner" + elem.key}
                                            placeholder={elem.title}
                                            name={"partner" + elem.key}
                                            value={questionDetail && questionDetail[elem.key]?.partnerTotal ? questionDetail[elem.key].partnerTotal : ""}
                                        />
                                    </Card>
                                </div>
                            );

                        }
                        else {
                            return (
                                <div className={`col-md-${arrayCount % 2 == 0 ? '6' : '4'} mb-4`} key={index}>
                                    <Card className="py-4 shadow borderOverAll" style={{ borderRadius: "20px", height: "100%" }}>
                                        <div className="QuestionIcon w-25">
                                            <img className="img-fluid" src={elem.img} alt="" />
                                        </div>
                                        <h5 className='text-center' onClick={() => { console.log(questionDetail[elem.key]) }}>{elem.title}</h5>
                                        <div
                                            className="row justify-content-center align-items-center my-2"
                                        >
                                            <div className='col-6 p-0 '>
                                                <label
                                                    className=" d-block text-end"
                                                    htmlFor={"client" + elem.key}
                                                >You</label>
                                            </div>
                                            <div className='col-6 px-1 '>
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
                                        <input type="number"
                                            className="form-control inputDesign "
                                            id={"client" + elem.key}
                                            placeholder={elem.title}
                                            name={"client" + elem.key}
                                            value={questionDetail && questionDetail[elem.key]?.clientTotal ? questionDetail[elem.key].clientTotal : ""}
                                        />
                                        <div
                                            className="row justify-content-center align-items-center my-2"
                                        >
                                            <div className='col-6 p-0 '>
                                                <label
                                                    className=" d-block text-end"
                                                    htmlFor={"partner" + elem.key}
                                                >Partner</label>
                                            </div>
                                            <div className='col-6 px-1 '>
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
                                        <input type="number"
                                            className="form-control inputDesign "
                                            id={"partner" + elem.key}
                                            placeholder={elem.title}
                                            name={"partner" + elem.key}
                                            value={questionDetail && questionDetail[elem.key]?.partnerTotal ? questionDetail[elem.key].partnerTotal : ""}
                                        />

                                        <div
                                            className={`row justify-content-center align-items-center my-2  ${jointClass}`}
                                        >
                                            <div className='col-6 p-0 '>
                                                <label
                                                    className=" d-block text-end"
                                                    htmlFor={"joint" + elem.key}
                                                >Joint</label>
                                            </div>
                                            <div className='col-6 px-1 '>
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

                                        <input type="number"
                                            className={`form-control inputDesign ${jointClass}`}
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

                {props.Question == "Lifestyle" && <HolyDayHome OpenModal={OpenModal2} homeArray={homeArray} arrayCount={arrayCount} questionDetail={questionDetail} />}


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

    for (let i = 0; i < loopIndex; i++) {
        arrayOfHolidayHome.push(
            props.homeArray.map((elem, index) => {
                return (
                    <div className={`col-md-${props.arrayCount % 2 == 0 ? '6' : '4'} mb-4`} key={i}>
                        <Card className="py-4 shadow borderOverAll" style={{ borderRadius: "20px", height: "100%" }}>
                            <div className="QuestionIcon w-25">
                                <img className="img-fluid" src={elem.img} alt="" />
                            </div>
                            <h5 className='text-center' onClick={() => { console.log(props.questionDetail[elem.key]) }}>{elem.title} {parseFloat(i) + 1}</h5>
                            <div
                                className="row justify-content-center align-items-center my-2"
                            >
                                <div className='col-6 p-0 '>
                                    <label
                                        className=" d-block text-end"
                                        htmlFor={"client" + elem.key}
                                    >You</label>
                                </div>
                                <div className='col-6 px-1 '>
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
                            <input type="number"
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
                                className="row justify-content-center align-items-center my-2"
                            >
                                <div className='col-6 p-0 '>
                                    <label
                                        className=" d-block text-end"
                                        htmlFor={"partner" + elem.key}
                                    >Partner</label>
                                </div>
                                <div className='col-6 px-1 '>
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
                            <input type="number"
                                className="form-control inputDesign "
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
                                className={`row justify-content-center align-items-center my-2 `}
                            >
                                <div className='col-6 p-0 '>
                                    <label
                                        className=" d-block text-end"
                                        htmlFor={"joint" + elem.key}
                                    >Joint</label>
                                </div>
                                <div className='col-6 px-1 '>
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

                            <input type="number"
                                className={`form-control inputDesign`}
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
