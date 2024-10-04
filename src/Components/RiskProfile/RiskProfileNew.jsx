import { Form, Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import DynamicYesNo from '../Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import RiskQuestion1 from './RiskQuestion1'

// import "./riskProfile.css"

import Risk1 from "../Questions/svgs/Risk-safebox.svg"
import Risk2 from "../Questions/svgs/Risk-coin.png"
import Risk3 from "../Questions/svgs/Risk-loss-graph-finance-svgrepo-com.svg"
import Risk4 from "../Questions/svgs/Risk-grocery.png"
import Risk5 from "../Questions/svgs/Risk-contract-svgrepo-com.svg"
import Risk6 from "../Questions/svgs/Risk-innovation.png"
import Risk7 from "../Questions/svgs/Risk-bar-chart-finance-business.svg"
import Risk8 from "../Questions/svgs/Risk-chart-pie-chart.svg"
import RiskReward from "../Questions/svgs/RiskReward.png"
import ProgressBar from './ProgressBar/ProgressBar'

import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import { GetAxios, PatchAxios, PostAxios } from '../Assets/Api/Api'
import { defaultUrl, RiskQuestion } from '../../Store/Store'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Image } from 'react-bootstrap'


const RiskProfileNew = () => {

    let DefaultUrl = useRecoilValue(defaultUrl)
    let [riskQuestion, setRiskQuestion] = useRecoilState(RiskQuestion);

    let [Progress, setProgress] = useState(10);
    let [SwitchBtn, setSwitchBtn] = useState(false);
    // let Form = useRef(null);
    let [mainBoard, setMainBoard] = useState(false);

    useEffect(() => {
        GetRiskData();
    }, [])



    const GetRiskData = async () => {
        try {
            // Make the GET request to fetch risk data
            const res = await GetAxios(`${DefaultUrl}/api/riskProfile/${localStorage.getItem("UserID")}`);

            // Check if the response is successful and contains data
            if (res && res._id) {
                console.log('Risk Data:', res);
                setRiskQuestion(res);  // Assuming response data contains the risk question
            } else {
                console.error('Unexpected response format:', res);
            }
        } catch (error) {
            // Handle any errors during the API call
            console.error('Error fetching risk data:', error);
            setRiskQuestion(initialValues);
            // Optionally, you might want to provide user feedback here
        }
    };



    let initialValues = {
        joinedProfile: "No",
        question1: { client: 1, partner: 1, },
        question2: { client: 1, partner: 1, },
        question3: { client: 1, partner: 1, },
        question4: { client: 1, partner: 1, },
        question5: { client: 1, partner: 1, },
        question6: { client: 1, partner: 1, },
        question7: { client: 1, partner: 1, },
        question8: { client: 1, partner: 1, },
        riskDescription: { client: "", partner: "", },
        riskGoal: { client: "Conservative", partner: "Conservative", },
    }

    const onSubmit = async (values) => {
        try {
            console.log(JSON.stringify(values));

            const obj = { ...values, clientFK: localStorage.getItem("UserID") };

            // Check if riskQuestion exists and has an ID
            if (riskQuestion && Object.keys(riskQuestion).length > 0 && !riskQuestion._id) {
                // POST request for adding new risk question
                const res = await PostAxios(`${DefaultUrl}/api/riskProfile/Add`, obj);

                if (res && res._id) {
                    console.log('Add Response:', res);
                    setRiskQuestion(res);  // Assuming response data contains the updated risk question
                    Nav("/Risk-Profile-Cards")
                } else {
                    console.error('Unexpected response format for Add:', res);
                }
            } else {
                // PATCH request for updating existing risk question
                obj._id = riskQuestion._id;
                const res = await PatchAxios(`${DefaultUrl}/api/riskProfile/Update`, obj);

                if (res && res._id) {
                    console.log('Update Response:', res);
                    setRiskQuestion(res);  // Assuming response data contains the updated risk question
                    Nav("/Risk-Profile-Cards")
                } else {
                    console.error('Unexpected response format for Update:', res);
                }
            }
        } catch (error) {
            // Handle any errors during API calls
            console.error('Error during API call:', error);
            // Optionally, you might want to provide user feedback here
        }
    };

    // let validationSchema = {}

    let QuestionArray = [
        {
            route: "/",
            key: "LandingPage",
            question: "",
            choices: ["Less than one year", "1 – 3 years", "3 – 5 years", "More than 5 years"],
            imgUrl: RiskReward,
        },
        {
            route: "/Q1",
            key: "question1",
            question: "<div className='d-inline-block text-green'>Question 1: Accessibility of your Funds - Desired Liquidity.</div> Based on your stated goals, how long do you envisage these funds can be invested before you require access to them?",
            choices: ["Less than one year", "1 – 3 years", "3 – 5 years", "More than 5 years"],
            imgUrl: Risk1,
        },
        {
            route: "/Q2",
            key: "question2",
            question: "<div className='d-inline-block text-green'>Question 2: Your desired rate of return.</div> What annual rate of return do you expect your investments to achieve in order to satisfy your previously stated goals?",
            choices: ["Less than 5%", "5% - 10%", "More than 10%"],
            imgUrl: Risk2,
        },
        {
            route: "/Q3",
            key: "question3",
            question: "<div className='d-inline-block text-green'>Question 3: Your attitude to Capital Risk.</div> Which response best describes your attitude toward investing?",
            choices: [
                "The safety of my capital is of primary importance to me. I am happier to achieve a lower rate of return rather than risk any significant loss of my capital.",
                "I would like the value of my capital to remain relatively stable but it is important that my investments meet my income requirements.",
                "I am comfortable with the value of my investment going up and down in value over time to try and achieve higher returns over the long term.",
                "I'm comfortable and prepared to take on high risk for the chance of getting higher returns on my money over the long term."
            ],
            imgUrl: Risk3,
        },
        {
            route: "/Q4",
            key: "question4",
            question: "<div className='d-inline-block text-green'>Question 4: Your concerns about inflation.</div>  How concerned are you with your savings being eroded due to inflation and the rising costs of necessities such as groceries, utilities, and healthcare.",
            choices: [
                "Not concerned",
                "Slightly concerned",
                "Moderately concerned",
                "Very concerned",
                "Highly concerned"
            ],
            imgUrl: Risk4,
        },
        {
            route: "/Q5",
            key: "question5",
            question: "<div className='d-inline-block text-green'>Question 5: Your concerns about Legislative Risk.</div> Investors often arrange their finances in order to qualify for government benefits and / or tax advantages. However, potential changes in the law risk leaving them worse off after those rearrangements have been made. Would you still rearrange your investments to qualify for these benefits, despite the risks of being worse off?",
            choices: [
                "No, I wouldn't do it if there's a risk, I'd be worse off.",
                "I would only do it if there is a slight risk I would be worse off.",
                "If there are potential changes in the law, I am willing to adjust my finances to protect my financial situation.",
                "If it improves my situation now, I'm willing to rearrange my investments and finances, regardless of future changes in the law.",
            ],
            imgUrl: Risk5,
        },
        {
            route: "/Q6",
            key: "question6",
            question: "<div className='d-inline-block text-green'>Question 6: Your investment knowledge & experience.</div> How familiar are you with Investment Markets?",
            choices: [
                "I don’t understand anything about investment markets.",
                "I have a basic understanding of investment markets. I know they go up and down but I'm not sure about the reasons behind these fluctuations.",
                "I understand that markets like the Australian ASX 200 and US S&P 500 and others can go up and down, each with different income, growth, and tax characteristics. I understand the importance of diversification to help me reduce risk and avoid putting all my eggs in the one basket.",
                "I am experienced with all investment sectors and understand the various factors that can impact investment performance. In the past, I have invested in some or all of the following assets: shares, ETFs, and managed funds.",

            ],
            imgUrl: Risk6,
        },
        {
            route: "/Q7",
            key: "question7",
            question: "<div className='d-inline-block text-green'>Question 7: Your concern about volatility - The changes in how much money your investments make, and the chance of losing money. <h5 className='d-inline p-0 m-0 fw-bold text-black'>If you invested $100,000 a year ago and you find out today it's worth $80,000, how would you feel?<div></div>",
            choices: [
                "I would panic and sell my investment and then put the remaining amount in cash.",
                "I would feel nervous, and I might consider moving some or all of my money to a safer option.",
                "I would be confident in my investment strategy and keep my money where it is and stick to my long-term plan.",
                "I would see this as an opportunity and if I had more money, invest into more growth assets such as Australian and international shares. ",
            ],
            imgUrl: Risk7,
        },
        {
            route: "/Q8",
            key: "question8",
            question: "<div className='d-inline-block text-green'>Question 8: Your investment preferences – Asset allocation.</div> What level of investment risk are you comfortable with?.",
            choices: [
                "No risk and I don’t want my capital to go down at all even if I get a 0% return on my money.",
                "I prefer low risk and am comfortable allocating a small portion (up to 40%) of my money to the share market aiming for better returns than the cash rate.",
                "I am comfortable with a medium level of risk and have my money allocated with similar amounts between the share market and cash and fixed interest/term deposits.",
                "I would prefer to have my money invested in a well diversified portfolio which includes more than 600% to Australian and international shares and property with the balance to cash and fixed interest/term deposits.",
                "I would prefer to have a minimum of  80% of my money invested in   Australian and international shares, possibly up to 100% if needed, aiming for higher returns even if there are significant ups and downs and wild swings like recent market events such as  COVID (2020), or the Global Financial Crises (2008)  because I won't need the money for a long time (10 years minimum).",
            ],
            imgUrl: Risk8,
        }
    ]


    let Nav = useNavigate();
    let loc = useLocation();


    let [BackButton, setBackButton] = useState(false);

    useEffect(() => {
        const currentPath = loc.pathname === "/Risk-Profile" ? "/Risk-Profile/" : loc.pathname;
        const currentIndex = QuestionArray.findIndex(q => "/Risk-Profile" + q.route === currentPath);

        if (currentIndex >= 0 && currentIndex < QuestionArray.length) {
            let progressRate = (90 / (QuestionArray.length - 1)) * currentIndex;
            setProgress((progressRate == 0 ? 10 : progressRate));
            setSwitchBtn(currentIndex === QuestionArray.length - 1);

            if (currentIndex == 0) {
                setBackButton(false);
                setMainBoard(false)
            }
            else {
                setBackButton(true);
                setMainBoard(true)
            }


        }

    }, [loc]);

    const BackHandle = () => {

        const currentPath = loc.pathname === "/Risk-Profile" ? "/Risk-Profile/" : loc.pathname;

        const currentIndex = QuestionArray.findIndex(q => "/Risk-Profile" + q.route === currentPath);

        if (currentIndex > 0) {
            Nav("/Risk-Profile" + QuestionArray[currentIndex - 1].route);
        } else {
            console.log('Already at the starting point');
        }

    };

    const HandleSubmit = () => {
        //yahan kuch karo ga taka first time ma Data Sheet show ho

        const currentPath = loc.pathname === "/Risk-Profile" ? "/Risk-Profile/" : loc.pathname;
        const currentIndex = QuestionArray.findIndex(q => "/Risk-Profile" + q.route === currentPath);

        if (currentIndex < QuestionArray.length - 1) {
            setBackButton(true)
            Nav("/Risk-Profile" + QuestionArray[currentIndex + 1].route);
        } else {
            console.log('Form submitted or navigate to the summary page');
            // Form.current.handleSubmit();
        }


    };

    let fillTheValues = (setFieldValue) => {
        if (riskQuestion && Object.keys(riskQuestion).length > 0 && riskQuestion._id) {
            setFieldValue("question1", riskQuestion.question1)
            setFieldValue("question2", riskQuestion.question2)
            setFieldValue("question3", riskQuestion.question3)
            setFieldValue("question4", riskQuestion.question4)
            setFieldValue("question5", riskQuestion.question5)
            setFieldValue("question6", riskQuestion.question6)
            setFieldValue("question7", riskQuestion.question7)
            setFieldValue("question8", riskQuestion.question8)
            setFieldValue("riskGoal", riskQuestion.riskGoal)
            setFieldValue("riskDescription", riskQuestion.riskDescription)
            setFieldValue("joinedProfile", riskQuestion.joinedProfile)
        }
    }

    return (
        <div className="container-fluid pt-3">
            <div className="row px-0 m-0">
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    {({ setValues, values, setFieldValue, handleChange }) => {
                        useEffect(() => {
                            fillTheValues(setFieldValue);
                        }, [riskQuestion])

                        return (<Form>
                            <div className="col-md-12">

                                <Routes>
                                    {QuestionArray.map((elem, index) => {
                                        return (
                                            <Route
                                                key={index}
                                                path={elem.route}
                                                element={<RiskQuestion1 Obj={{ setValues, values, setFieldValue, handleChange }}
                                                    QuestionProps={elem} />}
                                            />
                                        )
                                    })}
                                </Routes>


                                <div className={`row  ${BackButton ? "justify-content-between" : mainBoard === false ? "justify-content-center" : "justify-content-end"} my-3`}>
                                    {BackButton &&
                                        <div className='col-md-2'>
                                            <button
                                                type='button'
                                                onClick={BackHandle}
                                                className="float-center btn w-100  btn-outline  backBtn mx-3 d-flex justify-content-center align-items-center gap-1">
                                                <FaArrowLeftLong /> Back
                                            </button>
                                        </div>
                                    }

                                    <div className={mainBoard === false ? "col-md-4" : 'col-md-2'}>
                                        {!SwitchBtn &&
                                            <button
                                                type='button'
                                                onClick={HandleSubmit}
                                                className="float-center btn w-100  bgColor modalBtn  d-flex justify-content-center align-items-center gap-1"
                                            >
                                                {mainBoard === false ?
                                                    <React.Fragment> Submit </React.Fragment>
                                                    :
                                                    <React.Fragment>Next <FaArrowRightLong /></React.Fragment>
                                                }

                                            </button>
                                        }

                                        {SwitchBtn &&
                                            <button
                                                type='Submit'
                                                className="float-center btn w-100  bgColor modalBtn"
                                            >
                                                Submit
                                            </button>
                                        }

                                    </div>
                                </div>
                            </div>
                        </Form>);
                    }}

                </Formik>


            </div>
        </div>
    )
}

export default RiskProfileNew