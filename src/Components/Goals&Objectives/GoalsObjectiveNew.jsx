import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Card } from 'react-bootstrap'

import plus from "./images/plus.svg";

import BankImg from "../Questions/svgs/bank.svg";

//images or SVGs import for Goals
import bill from "../Questions/svgs/bill.png";
import credit from "../Questions/svgs/credit-card-refund-svgrepo-com.svg";
import FamilyProtection from "../Questions/svgs/WhatsApp Image 2023-08-11 at 19.13.12.jpg";
import beachChair from "../Questions/svgs/beach-chair.png";
import jeepCar from "../Questions/svgs/jeep-car-svgrepo-com.svg";
import briefcase from "../Questions/svgs/briefcase.png";
import clipboard from "../Questions/svgs/clipboard.png";
import home from "../Questions/svgs/home-svgrepo-com.svg";
import boat from "../Questions/svgs/boat.svg";
import caravan from "../Questions/svgs/trailer-caravan.svg";
import upgradeHome from "../Questions/svgs/upgradeHome.png";
import paintHome from "../Questions/svgs/paintHome.png";
import shiftHome from "../Questions/svgs/shift.png";
import investment from "../Questions/svgs/investment.png";
import loan from "../Questions/svgs/loan.svg";
import BuildingSmall from "../Questions/svgs/building-small-svgrepo-com.svg";
import graduationMortarboard from "../Questions/svgs/graduation-mortarboard.svg";
import timeMoney from "../Questions/svgs/time-is-money.svg";
import familySilhouette from "../Questions/svgs/family-silhouette.svg";
//miss
import inheritance from "../Questions/svgs/inheritance.png";
import shareholders from "../Questions/svgs/shareholders.png";
//miss
import gearsGear from "../Questions/svgs/gears-gear-svgrepo-com.svg";
import Questions_People from "../Questions/svgs/Questions_People.png";
import moneyBagSvgRepo from "../Questions/svgs/money-bag-svgrepo-com.svg";
import marriageRings from "../Questions/svgs/marriage-rings.svg";
//miss
import will from "../Questions/svgs/page-with-curl-svgrepo-com.svg";
import portfolio from "../Questions/svgs/portfolio copy.svg";
import investmentChart from "../Questions/svgs/investmentChart.png";
import taxCutting from "../Questions/svgs/taxCutting.png";
import piggyBank from "../Questions/svgs/piggy-bank.svg";
import piggyBankNew from "../Questions/svgs/piggy-bank-new.svg";
import businessPersonConsultant from "../Questions/svgs/business-Person-consultant.svg";
import piggyBankPNG from "../Questions/svgs/piggy-bank.png";
import piggyBankFull from "../Questions/svgs/piggy-bank-Full.png";
import insurance from "../Questions/svgs/insurance.png";
import insuranceProtection from "../Questions/svgs/insuranceProtection.png";
import insuranceSecurity from "../Questions/svgs/insurance Security.png";
import socialInsurance from "../Questions/svgs/social-insurance.png";
import savingMoney from "../Questions/svgs/saving-money.png";

import calendar from "../Questions/svgs/calendar.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InnerModal from '../Questions/FinancialInvestments/QuestionsDetail/InnerModal';
import ModalComponent from '../Questions/FinancialInvestments/ModalComponent';

const GoalsObjectiveNew = () => {


    let allGoals = [
        {
            title: "Set up a budget",
            key: "budgetGoal",
            img: bill,
            modalBtn: "label"
        },
        {
            title: "Pay off Credit Card/Debt",
            key: "creditCardGoal",
            img: credit,
            modalBtn: "label"
        },
        {
            title: "Protect my Lifestyle & Family",
            key: "familyLifeStyleGoal",
            img: FamilyProtection,
            modalBtn: "label"
        },
        {
            title: "Take a holiday",
            key: "holidayGoal",
            img: beachChair,
            modalBtn: "label"
        },
        {
            title: "Buy a Car",
            key: "carGoal",
            img: jeepCar,
            modalBtn: "label"
        },
        {
            title: "Accumulate Emergency Fund",
            key: "emergencyFundGoal",
            img: briefcase,
            modalBtn: "label"
        },
        {
            title: "Regular Savings Plan",
            key: "regularSavingsGoal",
            img: clipboard,
            modalBtn: "label"
        },
        {
            title: "Buy a House",
            key: "houseGoal",
            img: home,
            modalBtn: "label"
        },
        {
            title: "Buy a boat",
            key: "boatGoal",
            img: boat,
            modalBtn: "label"
        },
        {
            title: "Buy a Carvan",
            key: "caravanGoal",
            img: caravan,
            modalBtn: "label"
        },
        {
            title: "Upgrade Family Home",
            key: "upgradeFamilyHomeGoal",
            img: upgradeHome,
            modalBtn: "label"
        },
        {
            title: "Renovate Family Home",
            key: "renovateFamilyHomeGoal",
            img: paintHome,
            modalBtn: "label"
        },
        {
            title: "Downsize Family Home",
            key: "downSizeFamilyHomeGoal",
            img: shiftHome,
            modalBtn: "label"
        },
        {
            title: "Buy an Investment Property",
            key: "investmentPropertyGoal",
            img: investment,
            modalBtn: "label"
        },
        {
            title: "Pay off Home Loan",
            key: "homeLoanGoal",
            img: loan,
            modalBtn: "label"
        },
        {
            title: "Start a Business",
            key: "businessGoal",
            img: BuildingSmall,
            modalBtn: "label"
        },
        {
            title: "Save for Children’s Education",
            key: "childrenEducationGoal",
            img: graduationMortarboard,
            modalBtn: "label"
        },
        {
            title: "Plan for Retirement",
            key: "planForRetirementGoal",
            img: timeMoney,
            modalBtn: "label"
        },
        {
            title: "Start a Family",
            key: "startFamilyGoal",
            img: familySilhouette,
            modalBtn: "label"
        },
        {
            title: "Care for Ageing Family Member",
            key: "careGoal",
            img: BankImg,
            modalBtn: "label"
        },
        {
            title: "Receive an Inheritance",
            key: "inheritanceGoal",
            img: inheritance,
            modalBtn: "label"
        },
        {
            title: "leave an inheritance",
            key: "leaveInheritance",
            img: shareholders,
            modalBtn: "label"
        },
        {
            title: "Eligibility to Centrelink",
            key: "centreLinkEligibilityGoal",
            img: gearsGear,
            modalBtn: "label"
        },
        {
            title: "Set up a Family Trust",
            key: "familyTrustGoal",
            img: Questions_People,
            modalBtn: "label"
        },
        {
            title: "Set up an SMSF",
            key: "SMSFGoal",
            img: moneyBagSvgRepo,
            modalBtn: "label"
        },
        {
            title: "Save for a Wedding",
            key: "weddingGoal",
            img: marriageRings,
            modalBtn: "label"
        },
        {
            title: "Estate Planning",
            key: "estatePlanningGoal",
            img: will,
            modalBtn: "label"
        },
        {
            title: "Set up an Investment Portfolio",
            key: "investmentPortfolioGoal",
            img: portfolio,
            modalBtn: "label"
        },
        {
            title: "Review investment Portfolio",
            key: "reviewInvestmentPortfolioGoal",
            img: investmentChart,
            modalBtn: "label"
        },
        {
            title: "Pay Less Tax",
            key: "payLessTaxGoal",
            img: taxCutting,
            modalBtn: "label"
        },
        {
            title: "Ongoing Financial Advice",
            key: "financialAdviceGoal",
            img: businessPersonConsultant,
            modalBtn: "label"
        },
        {
            title: "Review my Super",
            key: "reviewSuper",
            img: piggyBank,
            modalBtn: "label"
        },
        {
            title: "Combine my Super into One",
            key: "combinedSuperIntoOne",
            img: piggyBankFull,
            modalBtn: "label"
        },
        {
            title: "Contribute money into super",
            key: "contributeMoneyIntoSuper",
            img: piggyBankPNG,
            modalBtn: "label"
        },
        {
            title: "Generate a Retirement Income Stream",
            key: "retirementIncomeStreamGoal",
            img: calendar,
            modalBtn: "label"
        },
        {
            title: "Set up a Super income stream",
            key: "setSuperIncomeStream",
            img: piggyBankNew,
            modalBtn: "label"
        },
        {
            title: "Review your Current Personal Insurance Cover",
            key: "reviewPersonalInsuranceCover",
            img: insurance,
            modalBtn: "label"
        },
        {
            title: "Analysis of your Personal Insurance needs",
            key: "analysisOfPersonalInsuranceGoal",
            img: insuranceProtection,
            modalBtn: "label"
        },
        {
            title: "Retain current Personal Insurances as is",
            key: "retainCurrentPersonalInsurancesGoal",
            img: socialInsurance,
            modalBtn: "label"
        },
        {
            title: "Reduce my Current Personal Insurance Cover",
            key: "reducePersonalInsuranceCoverGoal",
            img: insuranceSecurity,
            modalBtn: "label"
        },
        {
            title: "Advice on Surplus income",
            key: "adviceOnSurplusIncomeGoal",
            img: savingMoney,
            modalBtn: "label"
        },
    ]

    let [flagState, setFlagState] = useState(false)
    let [modalObject, setModalObject] = useState({})


    let getInitialValues = () => {

    }

    let handleSubmit = () => {

    }

    let modalOpen = (Values) => {
        setModalObject(Values);
        setFlagState(true);
    }
    return (
        <div className="container-fluid">
            <div className="row px-0 m-0 mb-5 pb-5">
                <div className="col-md-12">
                    <div className=" pb-4 px-4 mb-5">
                        <h3 className="text-center GreenColor">
                            <b>Goals & Objectives</b>
                        </h3>
                    </div>
                </div>
                {allGoals.map((elem, index) => {
                    return (
                        <div className={`col-md-4 mb-4`} key={index}>
                            <Card className="py-4 shadow px-4" style={{ borderRadius: "20px", height: "100%" }}>
                                <div className="QuestionIcon w-25">
                                    <img className="img-fluid" src={elem.img} alt="" />
                                </div>
                                <div className='d-flex justify-content-center align-items-center gap-3 '>
                                    <div className=''>
                                        <h5 className='text-center mt-2' onClick={() => { console.log(elem.title) }}>
                                            {elem.title}
                                        </h5>
                                    </div>
                                    {elem.modalBtn === "head" &&
                                        <div className=''>
                                            <label
                                                className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                            >
                                                <div>
                                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                </div>
                                            </label>
                                        </div>
                                    }
                                </div>
                                <Formik
                                    initialValues={getInitialValues(elem.key)}
                                    onSubmit={handleSubmit}
                                    enableReinitialize
                                >
                                    {({ values }) => {
                                        return (<Form>
                                            <div
                                                className="row justify-content-center align-items-center my-2"
                                            >
                                                <div className='col-12 p-0 '>
                                                    <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                                        <label
                                                            className=" d-block text-center"
                                                            htmlFor={"scopeOfAdvice"}
                                                        >Scope of Advice</label>

                                                        {elem.modalBtn === "label" &&
                                                            <label
                                                                className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"

                                                                onClick={() => { modalOpen(elem) }}
                                                            >
                                                                <div>
                                                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                </div>
                                                            </label>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <Field
                                                type="number"
                                                className="form-control inputDesign "
                                                id={"scopeOfAdvice"}
                                                placeholder={"Scope of Advice"}
                                                name={"scopeOfAdvice"}
                                            />
                                            <div
                                                className={`row justify-content-center align-items-center my-2 `}
                                            >
                                                <div className='col-12 p-0 '>
                                                    <label
                                                        className=" d-block text-center"
                                                        htmlFor={"when"}
                                                    >When </label>
                                                </div>
                                            </div>
                                            <Field
                                                type="number"
                                                className={`form-control inputDesign `}
                                                id={"when"}
                                                placeholder={"When"}
                                                name={"when"}
                                            />
                                            <div
                                                className={`row justify-content-center align-items-center my-2 `}
                                            >
                                                <div className='col-12 p-0 '>
                                                    <label
                                                        className=" d-block text-center"
                                                        htmlFor={"when"}
                                                    >Amount </label>
                                                </div>
                                            </div>
                                            <Field
                                                type="number"
                                                className={`form-control inputDesign `}
                                                id={"amount"}
                                                placeholder={"Amount"}
                                                name={"amount"}
                                            />
                                            {elem.modalBtn === "button" &&
                                                <button
                                                    className=" btn btn-outline-secondary w-100 mt-3"

                                                >
                                                    Enter Details
                                                    <div className="iconContainer ms-3">

                                                        {/*
                                                        <img className="img-fluid" src={plus} alt="" />
                                                        */}
                                                        <label
                                                            className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                                        >
                                                            <div>
                                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                            </div>
                                                        </label>
                                                    </div>

                                                </button>
                                            }

                                        </Form>)
                                    }}

                                </Formik>
                            </Card>
                        </div>
                    )
                })}

            </div>

            <ModalComponent modalObject={modalObject} setFlagState={setFlagState} flagState={flagState} >
                <GoalsForm />
            </ModalComponent>
        </div>
    )
}

export default GoalsObjectiveNew
