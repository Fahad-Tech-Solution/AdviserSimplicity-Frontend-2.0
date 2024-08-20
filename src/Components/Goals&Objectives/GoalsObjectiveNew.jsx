import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Card, InputGroup } from 'react-bootstrap'


//images or SVGs import for Goals
import BankImg from "../Questions/svgs/bank.svg";
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
import inheritance from "../Questions/svgs/inheritance.png";
import shareholders from "../Questions/svgs/shareholders.png";
import gearsGear from "../Questions/svgs/gears-gear-svgrepo-com.svg";
import Questions_People from "../Questions/svgs/Questions_People.png";
import moneyBagSvgRepo from "../Questions/svgs/money-bag-svgrepo-com.svg";
import marriageRings from "../Questions/svgs/marriage-rings.svg";
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

//Goals and Objective Questions
import Add from "../Questions/svgs/add-circle-solid-svgrepo-com.svg";



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalComponent from '../Questions/FinancialInvestments/ModalComponent';
import GoalsForm from './GoalsForm';
import { defaultUrl, GoalsDetail, GQState } from '../../Store/Store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { GetAxios } from '../Assets/Api/Api';
import GoalsObjectivesQuestions from './GoalsObjectivesQuestions';

const GoalsObjectiveNew = () => {

    useEffect(() => {
        GetGoals();
        GetGoalsQuestion();
    }, [])

    let DefaultUrl = useRecoilValue(defaultUrl)
    let GQSObj = useRecoilValue(GQState)


    let [GQObject, setGQObject] = useRecoilState(GQState);



    let [goalsDetail, setGoalsDetail] = useRecoilState(GoalsDetail)
    let GetGoals = async () => {
        try {
            const res = await GetAxios(`${DefaultUrl}/api/CombinedGoalsAndObjectives/${localStorage.getItem("UserID")}`);
            // console.log(res)
            if (res) {
                setGoalsDetail(res);
            }
        } catch (error) {
            console.error("Error fetching Goals:", error);
        }
    };

    let GetGoalsQuestion = async () => {
        try {
            const res = await GetAxios(`${DefaultUrl}/api/goalsQuestions/getByClient/${localStorage.getItem("UserID")}`);
            console.log(res)
            if (res) {
                setGQObject(res);
            }
        } catch (error) {
            console.error("Error fetching Goals:", error);
        }
    };



    let allGoals = [
        {
            title: "Set up a Budget",
            key: "budgetGoal",
            img: bill,
            modalBtn: "label",
            whenScopeIs: "",
            descriptionArray: []
        },
        {
            title: "Pay off Credit Card/Debt",
            key: "creditCardGoal",
            img: credit,
            modalBtn: "label",
            whenScopeIs: "Debt Management",
            descriptionArray: [
                { text: "I/We would like Reduce our/my current personal loan/credit cards as soon as possible /ahead of retirement." },
                { text: "I/We want to know how much I/We need  to pay off our/my personal loan/credit cards each month so I/we can be debt free in retirement/pay it off in the next XX Years" },
            ]
        },
        {
            title: "Protect my Lifestyle & Family",
            key: "familyLifeStyleGoal",
            img: FamilyProtection,
            modalBtn: "label",
            whenScopeIs: "Personal Insurance",
            descriptionArray: [
                { text: "I/We want  to make sure in  the event we/I were/was  to  die prematurely or are/am unable to work due to sickness, injury or every again that our/my   family will be   protected financially.  I/We would like to consider all types of personal insurance cover.  I/We are  able/happy to  spend up to $XX0 per month from our/my  own  personal cashflow and were possible we would like to have any insurance   cover  funded  an paid through our/my  super.        (Full Insurance review)." },
                { text: "I/We would specifically like to take out Life cover of $XXX,XXX and TPD of $XXX,XXX to make sure that our/my  family is  protected if I/we to  die or become total and permanently disabled.   This would also us/me to pay off our /my current home loan/debts and be debt free.    Where possible I/we would like to have these premiums funded via super. (Life and TPD cover)" },
                { text: "I/We  want to make sure if I/we  suffered a medical event such as a cancer or a heart attack  that we/I  could receive a lumpsum payout of $XXX,XXX to help out financially while I/we  focus on my/our  recovery/so my  spouse could take time off work if needed to look after me  so this wouldn’t affect us  financially while I recovered(Trauma cover)" },
                { text: "I/We  want to make sure that my/our  income  is  protected in the event I/we am/are unable to work due to an  injury or became sick so we/I  can    receive a regular income during this period  to help us/me pay   my/our  home loan repayments and all other bills. Where possible I/we would like to have these premiums funded via super  (Income protection only)" },
            ]
        },
        {
            title: "Take a Holiday",
            key: "holidayGoal",
            img: beachChair,
            modalBtn: "label",
            whenScopeIs: "Budgeting & Cashflow",
            descriptionArray: [{
                text: "We/I would like to take a holiday to XXXXXX and want to allow an amount of $XX.000 to do this comfortable so I/we can enjoy ourselves like I/we e want to.    We/I will use the funds I/we have sitting in cash/in super/from  the inheritance/other"
            }]
        },
        {
            title: "Buy a Car",
            key: "carGoal",
            img: jeepCar,
            modalBtn: "label",
            whenScopeIs: "Budgeting & Cashflow",
            descriptionArray: [{
                text: "We/I would like to upgrade our car/buy a new car  and want to get car make/model. We/I want to allow an amount of $XX.000 to do this.  We/I will use the funds I/we have sitting in cash/in super/from the inheritance/other"
            }]
        },
        {
            title: "Accumulate Emergency Fund",
            key: "emergencyFundGoal",
            img: briefcase,
            modalBtn: "label",
            whenScopeIs: "",
            descriptionArray: []
        },
        {
            title: "Regular Savings Plan",
            key: "regularSavingsGoal",
            img: clipboard,
            modalBtn: "label",
            whenScopeIs: "",
            descriptionArray: []
        },
        {
            title: "Buy a House",
            key: "houseGoal",
            img: home,
            modalBtn: "label",
            whenScopeIs: "",
            descriptionArray: []
        },
        {
            title: "Buy a Boat",
            key: "boatGoal",
            img: boat,
            modalBtn: "label",
            whenScopeIs: "Budgeting & Cashflow",
            descriptionArray: [
                {
                    text: "We/I would like to buy a boat   and want to allow an amount of $XX.000 to do this.  We/I will use the funds I/we have sitting in cash/in super/from the inheritance/other"
                }
            ]
        },
        {
            title: "Buy a Carvan",
            key: "caravanGoal",
            img: caravan,
            modalBtn: "label",
            whenScopeIs: "Budgeting & Cashflow",
            descriptionArray: [
                {
                    text: "We/I would like to buy a caravan so we can take more road trips around Australia/name of State    and want to allow an amount of $XX.000 to do this.  We/I will use the funds I/we have sitting in cash/in super/from the inheritance/other"
                }
            ]
        },
        {
            title: "Upgrade Family Home",
            key: "upgradeFamilyHomeGoal",
            img: upgradeHome,
            modalBtn: "label",
            whenScopeIs: "",
            descriptionArray: []
        },
        {
            title: "Renovate Family Home",
            key: "renovateFamilyHomeGoal",
            img: paintHome,
            modalBtn: "label",
            whenScopeIs: "Budgeting & Cashflow",
            descriptionArray: [
                {
                    text: "We/I would like to renovate my/our  home and want to allow an amount of $XX.000 to do this.    We/I will use the funds I/we have sitting in cash/in super/from the inheritance/other. "
                }
            ]
        },
        {
            title: "Downsize Family Home",
            key: "downSizeFamilyHomeGoal",
            img: shiftHome,
            modalBtn: "label",
            whenScopeIs: "",
            descriptionArray: []
        },
        {
            title: "Buy an Investment Property",
            key: "investmentPropertyGoal",
            img: investment,
            modalBtn: "label",
            whenScopeIs: "",
            descriptionArray: []
        },
        {
            title: "Pay off Home Loan",
            key: "homeLoanGoal",
            img: loan,
            modalBtn: "label",
            whenScopeIs: "Debt Management",
            descriptionArray: [
                { text: "<span>I/We</span> would like Reduce <span>our/my</span> current home loan <span>as soon as possible /ahead of retirement.</span>" },
                { text: "<span>I/We</span> want to know how much <span>I/We</span> need  to pay off <span>our/my</span> home loan  each <span>week/fortnight/month</span> so <span>I/we can be debt free in retirement/pay it off in the next XX Years</span>" },
            ]
        },
        {
            title: "Start a Business",
            key: "businessGoal",
            img: BuildingSmall,
            modalBtn: "label",
            whenScopeIs: "",
            descriptionArray: []
        },
        {
            title: "Save for Children’s Education",
            key: "childrenEducationGoal",
            img: graduationMortarboard,
            modalBtn: "label",
            whenScopeIs: "",
            descriptionArray: []
        },
        {
            title: "Plan for Retirement",
            key: "planForRetirementGoal",
            img: timeMoney,
            modalBtn: "label",
            whenScopeIs: "",
            descriptionArray: []
        },
        {
            title: "Start a Family",
            key: "startFamilyGoal",
            img: familySilhouette,
            modalBtn: "label",
            whenScopeIs: "",
            descriptionArray: []
        },
        {
            title: "Care for Ageing Family Member",
            key: "careGoal",
            img: BankImg,
            modalBtn: "label",
            whenScopeIs: "",
            descriptionArray: []
        },
        {
            title: "Receive an Inheritance",
            key: "inheritanceGoal",
            img: inheritance,
            modalBtn: "label",
            whenScopeIs: "",
            descriptionArray: []
        },
        {
            title: "Leave an Inheritance",
            key: "leaveInheritanceGoal",
            img: shareholders,
            modalBtn: "label",
            whenScopeIs: "",
            descriptionArray: []
        },
        {
            title: "Eligibility to Centrelink",
            key: "centreLinkEligibilityGoal",
            img: gearsGear,
            modalBtn: "label",
            whenScopeIs: "Retirement Planning",
            descriptionArray: [
                { text: "We/I  would like to know if We/I  will  get any Age pension entitlements now that We/I  had reached age pension age. It would be great if We/I  could get a small amount of age pension and this would give us/me the  Pension Card. We/I really want the benefits that come with the cards such as cheaper medicine, and other discounts on our/my bills such as Council and Water rates, utilities (Gas and Electricity) and our/my Car registration." },
                { text: "We/I like to know if we/I am/are entitled to any health care cards from Centrelink because I/we are/am  paying too much on our/my regular medication on a monthly basis." },
            ]
        },
        {
            title: "Set up a Family Trust",
            key: "familyTrustGoal",
            img: Questions_People,
            modalBtn: "label",
            whenScopeIs: "",
            descriptionArray: []
        },
        {
            title: "Set up an SMSF",
            key: "SMSFGoal",
            img: moneyBagSvgRepo,
            modalBtn: "label",
            whenScopeIs: "Superannuation",
            descriptionArray: [
                { text: "We would like set up our own Self-Managed Super Fund (SMSF) and combine our superannuation money and have it invested together as a couple/family. I/We feel this will provide us /me with more flexibility and control of our/my retirement savings. I/We would like to retain the insurances I/we have attached to our/my current fund/s." },
                { text: "/We would like set up our own Self-Managed Super Fund (SMSF) and use our/my superannuation money to buy a business premises/factory so I/we can use it to run our/my business from. I/We feel this will provide us /me with more flexibility and control of our/my retirement savings. I/We would like to retain the insurances I/we have attached to  our/my current fund/s." },
            ]
        },
        {
            title: "Save for a Wedding",
            key: "weddingGoal",
            img: marriageRings,
            modalBtn: "label",
            whenScopeIs: "",
            descriptionArray: []
        },
        {
            title: "Estate Planning",
            key: "estatePlanningGoal",
            img: will,
            modalBtn: "label",
            whenScopeIs: "Estate Planning",
            descriptionArray: [
                { text: "I/We would like to make sure that if our/my super money is left to my/our  daughters/sons/Kids  in the event of  our/my passing that they  pay the least amount of tax possible.." },
            ]
        },
        {
            title: "Set up an Investment Portfolio",
            key: "investmentPortfolioGoal",
            img: portfolio,
            modalBtn: "label",
            whenScopeIs: "Investments",
            descriptionArray: [
                { text: "I/We like to  Invest an amount of $XXX,000 from our/my  cash sitting in my/our  bank account into managed  investments where our/my  money will  grow in value over time.   I/We   want to start slow and are/am happy to invest a regular amount of $XXX per month as I/we can  afford to spare this amount of money each month I/we would like to keep building up this  investment. " },
            ]
        },
        {
            title: "Review Investment Portfolio",
            key: "reviewInvestmentPortfolioGoal",
            img: investmentChart,
            modalBtn: "label",
            whenScopeIs: "",
            descriptionArray: []
        },
        {
            title: "Pay Less Tax",
            key: "payLessTaxGoal",
            img: taxCutting,
            modalBtn: "label",
            whenScopeIs: "",
            descriptionArray: []
        },
        {
            title: "Ongoing Financial Advice",
            key: "financialAdviceGoal",
            img: businessPersonConsultant,
            modalBtn: "label",
            whenScopeIs: "Other",
            descriptionArray: [
                { text: "I/We would like to have someone help us /me manage our/my money in our/my  retirement to make sure that our/my  money will last us/me  and that  I/We are/am  adjusting   our strategy  every year so we continue to meet our/my  goals.   " },
            ]
        },
        {
            title: "Review my Super",
            key: "reviewSuperGoal",
            img: piggyBank,
            modalBtn: "label",
            whenScopeIs: "Superannuation",
            descriptionArray: [
                { text: "I/We would like to review our/my current super fund/s and considering other products that are more suitable for us /me and give us /me more flexibility and ease of use when I/We are dealing with the product. I/We would like to retain the insurances I/we have attached to  our/my current fund/s. (Consider a better product )" },
                { text: "I/We would like to review our/my current super fund/s and considering other products that are more suitable for us /me and help us/me reduce the overall fees if possible. I/We would like to retain the insurances I/we have attached to  our/my current fund/s. (Consider a more cost effective product)" },
            ]
        },
        {
            title: "Combine my Super into One",
            key: "combinedSuperIntoOneGoal",
            img: piggyBankFull,
            modalBtn: "label",
            whenScopeIs: "Superannuation",
            descriptionArray: [
                { text: "I would like to consider rolling my X super funds  into the one if possible to help me reduce the fees and statements that I currently receive so it can help me track my super better." },
            ]
        },
        {
            title: "Contribute Money into Super",
            key: "contributeMoneyIntoSuperGoal",
            img: piggyBankPNG,
            modalBtn: "label",
            whenScopeIs: "Superannuation",
            descriptionArray: [
                { text: "I/We would like to build up our/my super as much as I/we can before I/we retire so I/we can have more for our/my retirement and if possible, allow us to reduce the amount to tax I/we currently pay. (concessional contributions)" },
                { text: "I/We would like to start contributing some money into our/my super so  I/we can start building it up.  For now we are happy to contribute an net amount of $x,000 per week/fortnight/month as this is how much I/We are able/comfortable  to contribute based upon my/our own cashflow perspective. (regular contributions concessional or non-concessional)" },
                { text: "I/We like to know what I/We should do with the money I/we have sitting in my/our   bank account from the sale of an investment property/from the inheritance we have/will receive from  Client/Partners mum/dad’s estate.  I/We currently had an amount of approximately $XXX,000 in cash and wanted to invest an amount of $XXX,000 and retain an amount of $XXX,000 as buffer for emergencies/for home renovations/purchase of a new car/to take a holiday to XXXX.  I/We wanted to know if I/We could invest this money into superannuation if possible so I/We can build up this investment. (Investing money into super as NCC)." },
            ]
        },
        {
            title: "Generate a Retirement Income Stream",
            key: "retirementIncomeStreamGoal",
            img: calendar,
            modalBtn: "label",
            whenScopeIs: "Retirement Planning",
            descriptionArray: [
                { text: "I/We like to use be able to receive an amount of $X,000 per week/fortnight/month for us/me to be comfortable in my/our retirement and live the way I/We want to." },
            ]
        },
        {
            title: "Set up a Super Income Stream",
            key: "setSuperIncomeStreamGoal",
            img: piggyBankNew,
            modalBtn: "label",
            whenScopeIs: "Retirement Planning",
            descriptionArray: [
                { text: "I/We like to use my super to draw an income from it like a regular wage to help us /me meet our/my living expenses.  I/We feel that we need an amount of $X,000 per week/fortnight/month for us/me  to be comfortable in my/our retirement and live the way I/We  want to." },
            ]
        },
        {
            title: "Review your Current Personal Insurance Cover",
            key: "reviewPersonalInsuranceCoverGoal",
            img: insurance,
            modalBtn: "label",
            whenScopeIs: "Personal Insurance",
            descriptionArray: [
                { text: "We/I would like to  Review my/our  current levels of personal insurance cover  I/we have in place  and consider what would be the right levels and types of cover for us/me." },
            ]
        },
        {
            title: "Analysis of your Personal Insurance needs",
            key: "analysisOfPersonalInsuranceGoal",
            img: insuranceProtection,
            modalBtn: "label",
            whenScopeIs: "Personal Insurance",
            descriptionArray: [
                { text: "I/We want  to make sure in  the event we/I were/was  to  die prematurely or are/am unable to work due to sickness, injury or every again that our/my   family will be   protected financially.  I/We would like to consider all types of personal insurance cover.  I/We are  able/happy to  spend up to $XX0 per month from our/my  own  personal cashflow and were possible we would like to have any insurance   cover  funded  an paid through our/my  super. (Full Insurance review)." },
            ]
        },
        {
            title: "Retain Current Personal Insurances as is",
            key: "retainCurrentPersonalInsurancesGoal",
            img: socialInsurance,
            modalBtn: "label",
            whenScopeIs: "Personal Insurance",
            descriptionArray: [
                { text: "We/I would like to retain our current personal insurances  with XXXX as they are for now and not have these reviewed. We would like you to take over the servicing rights of our/my polices so we/I can obtain all relevant policy details as required." },
            ]
        },
        {
            title: "Reduce my Current Personal Insurance Cover",
            key: "reducePersonalInsuranceCoverGoal",
            img: insuranceSecurity,
            modalBtn: "label",
            whenScopeIs: "Personal Insurance",
            descriptionArray: [
                { text: "We/I would like to Reduce our/my   Life cover down to $XXX, XXX and   TPD to $XXX,XXX  so we/I can   reduce the premiums down as they are now starting  to  get costly. Given our/my current financial situation now I/we don’t  need this level of cover anymore as this was taken out a long time ago when our/my  situation was different and the kids were younger.  (Reduce Life and TPD)" },
                { text: "We/I would like to Reduce our/my   Trauma cover down to $XXX, XXX so we/I can   reduce the premiums down as they are now starting  to  get costly. ( Reduce Trauma cover)" },
                { text: "We/I would like to change the   the waiting period on  my/our  income protection policy with Name of Provider to a XX Day waiting period to help reduce the cost of these premiums.  We/I currently have over XX days in Sick/Annual Leave/Long Service Leave available that I/we  could use  if  I/we wasn’t/weren’t  able to work during this period. (Reduce Waiting Period on Income protection)." },
            ]
        },
        {
            title: "Advice on Surplus Income",
            key: "adviceOnSurplusIncomeGoal",
            img: savingMoney,
            modalBtn: "label",
            whenScopeIs: "",
            descriptionArray: []
        },
    ]

    let [flagState, setFlagState] = useState(false)
    let [modalObject, setModalObject] = useState({})

    let modalOpen = (Values) => {
        setModalObject(Values);
        setFlagState(true);
    }

    let modalOpenQuestions = (Values) => {
        setModalObject(Values);
        setFlagState(true);
    }

    return (
        <div className="container-fluid GoalsObjectives">

            <ModalComponent modalObject={modalObject} setFlagState={setFlagState} flagState={flagState} >
                {modalObject.key !== "MainModal" ?
                    <GoalsForm />
                    : <GoalsObjectivesQuestions />
                }
            </ModalComponent>

            <div className="row">
                <div className="col-md-12">
                    <div className="pb-4 px-4 mb-3">
                        <h3 className="text-center GreenColor" onClick={() => { console.log(goalsDetail) }}>
                            <b>Goals & Objectives</b>
                        </h3>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="d-flex justify-content-center ">
                        <div className="QuestionIcon p-3 curser-pointer" style={{ marginTop: "-50px", width: "9%" }} onClick={() => {
                            modalOpenQuestions({
                                title: "Goals and Objectives Questions",
                                key: "MainModal",
                                allGoals,

                            })
                        }}>

                            <img className="img-fluid" src={Add} alt="" />
                        </div>
                        {/* <h3>komail</h3> */}
                    </div>
                    <h3 className='text-center d-none' style={{ marginTop: "-20px" }}>
                        Add Your Goals
                    </h3>
                    {/* <hr /> */}

                </div>
            </div>


            <div className="row justify-content-center">

                {allGoals.map((elem, index) => {
                    if (GQSObj[elem.key] === "Yes") {
                        return (
                            <div className={`col-md-4  mb-4`} key={index}>
                                <Card className="py-4 shadow px-4" style={{ borderRadius: "20px", height: "100%" }}>
                                    <h5 className='text-center mt-2 capitalize' onClick={() => { console.log(goalsDetail[elem.key]) }}>
                                        {elem.title}
                                    </h5>
                                    <div className="QuestionIcon w-25">
                                        <img className="img-fluid" src={elem.img} alt="" />
                                    </div>
                                    <div className='d-flex justify-content-center align-items-center gap-3 d-none'>
                                        <div className=''>
                                            <h5 className='text-center mt-2 capitalize' onClick={() => { console.log(goalsDetail[elem.key]) }}>
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
                                        initialValues={{
                                            scopeOfAdvice: "",
                                            when: "",
                                            estimatedValue: "",
                                            description: "",
                                        }}
                                        onSubmit={() => { }}
                                        enableReinitialize
                                    >
                                        {({ values, setFieldValue }) => {
                                            return (<Form className='smallerInput'>
                                                <div
                                                    className="row justify-content-center align-items-center my-2 "
                                                >
                                                    <div className='col-12 p-0 '>
                                                        <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                                            <label
                                                                className=" d-block text-center"
                                                                htmlFor={"scopeOfAdvice" + [elem.key]}
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
                                                    type="text"
                                                    className="form-control inputDesign "
                                                    id={"scopeOfAdvice" + [elem.key]}
                                                    placeholder={"Scope of Advice"}
                                                    name={"scopeOfAdvice"}
                                                    readOnly
                                                    value={goalsDetail[elem.key]?.scopeOfAdvice || ""}
                                                />
                                                <div
                                                    className={`row justify-content-center align-items-center my-2 `}
                                                >
                                                    <div className='col-12 p-0 '>
                                                        <label
                                                            className=" d-block text-center"
                                                            htmlFor={"when" + [elem.key]}
                                                        >When </label>
                                                    </div>
                                                </div>
                                                <Field
                                                    type="text"
                                                    className={`form-control inputDesign `}
                                                    id={"when" + [elem.key]}
                                                    placeholder={"When"}
                                                    name={"when"}
                                                    readOnly
                                                    value={goalsDetail[elem.key]?.when || ""}
                                                />
                                                <div
                                                    className={`row justify-content-center align-items-center my-2 `}
                                                >
                                                    <div className='col-12 p-0 '>
                                                        <label
                                                            className=" d-block text-center"
                                                            htmlFor={"estimatedValue" + [elem.key]}
                                                        >Amount </label>
                                                    </div>
                                                </div>
                                                <Field
                                                    type="text"
                                                    className={`form-control inputDesign `}
                                                    id={"estimatedValue" + [elem.key]}
                                                    placeholder={"Amount"}
                                                    name={"estimatedValue"}
                                                    readOnly
                                                    value={goalsDetail[elem.key]?.estimatedValue ? `$ ${goalsDetail[elem.key].estimatedValue}` : ""}
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
                    }
                })}

            </div>
        </div >
    )
}

export default GoalsObjectiveNew
