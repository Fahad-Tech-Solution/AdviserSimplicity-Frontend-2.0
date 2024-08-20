import { Form, Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import DynamicYesNo from '../Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import RiskQuestion1 from './RiskQuestion1'

import Risk1 from "../Questions/svgs/Risk-safebox.svg"
import Risk2 from "../Questions/svgs/Risk-coin.png"
import Risk3 from "../Questions/svgs/Risk-loss-graph-finance-svgrepo-com.svg"
import Risk4 from "../Questions/svgs/Risk-grocery.png"
import Risk5 from "../Questions/svgs/Risk-contract-svgrepo-com.svg"
import Risk6 from "../Questions/svgs/Risk-innovation.png"
import Risk7 from "../Questions/svgs/Risk-bar-chart-finance-business.svg"
import Risk8 from "../Questions/svgs/Risk-chart-pie-chart.svg"
import ProgressBar from './ProgressBar/ProgressBar'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import { GetAxios, PostAxios } from '../Assets/Api/Api'
import { defaultUrl, RiskQuestion } from '../../Store/Store'
import { useRecoilState, useRecoilValue } from 'recoil'


const RiskProfileNew = () => {

    let DefaultUrl = useRecoilValue(defaultUrl)
    let [riskQuestion, setRiskQuestion] = useRecoilState(RiskQuestion);

    let [Progress, setProgress] = useState(10);
    let [SwitchBtn, setSwitchBtn] = useState(false);
    // let Form = useRef(null);

    useEffect(() => {
        GetRiskData();
    }, [])


    let GetRiskData = async () => {

        let res = await GetAxios(DefaultUrl + "/api/riskProfile/");
        if (res) {
            console.log(res);
            setRiskQuestion(res);
            
        }

    }



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
        riskDescription: "text",
        riskGoal: "text",

    }

    let onSubmit = async (values) => {

        console.log(JSON.stringify(values));


        let res = await PostAxios(DefaultUrl + "/api/riskProfile/Add", values);
        if (res) {
            console.log(res);
            setRiskQuestion(res);
        }


    }
    // let validationSchema = {}

    let QuestionArray = [
        {
            route: "/",
            key: "question1",
            question: "Question 1: Accessibility of your Funds - Desired Liquidity. Based on your stated goals, how long do you envisage these funds can be invested before you require access to them?",
            choices: ["Less than one year", "1 – 3 years", "3 – 5 years", "More than 5 years"],
            imgUrl: Risk1,
        },
        {
            route: "/Q2",
            key: "question2",
            question: "Question 2: Your desired rate of return.  What annual rate of return do you expect your investments to achieve in order to satisfy your previously stated goals?",
            choices: ["More than 10%", "5% - 10%", "More than 10%"],
            imgUrl: Risk2,
        },
        {
            route: "/Q3",
            key: "question3",
            question: "Question 3: Your attitude to Capital Risk. Which response best describes your attitude toward investing?",
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
            question: "Question 4: Your concerns about inflation: How concerned are you with your savings being eroded due to inflation and the rising costs of necessities  such as groceries, utilities, and healthcare.",
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
            question: "Question 5: Your concerns about Legislative Risk. Investors often arrange their finances in order  to qualify for government benefits and / or tax advantages. However, potential changes in the law risk leaving them worse off after those rearrangements have been made.  Would you still rearrange your investments to qualify for these benefits, despite the risks of being worse off?",
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
            question: "Question 6: Your investment knowledge & experience. How familiar are you with Investment Markets?",
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
            question: "Question 7: Your concern about volatility - The changes in how much money your investments make, and the chance of losing money. If you invested $100,000 a year ago and you find out today it's worth $80,000, how would you feel?",
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
            question: "Question 8: Your investment preferences – Asset allocation. What level of investment risk are you comfortable with?",
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
        if (loc.pathname === "/Risk-Profile/" || loc.pathname === "/Risk-Profile") {
            setBackButton(false)
        }
        else {
            setBackButton(true)
        }
    }, [loc])

    const BackHandle = () => {
        const currentPath = loc.pathname;

        if (currentPath !== "/Risk-Profile") {
            let route = loc.pathname === "/Risk-Profile" ? "/Risk-Profile/" : loc.pathname;

            const currentIndex = QuestionArray.findIndex(q => "/Risk-Profile" + q.route === route);

            if (currentIndex > 0) {
                Nav("/Risk-Profile" + QuestionArray[currentIndex - 1].route);
                setProgress((prevProgress) => {
                    return currentIndex === 1 ? 10 : prevProgress - (90 / (QuestionArray.length - 1));
                });
                if (currentIndex == QuestionArray.length - 1) {
                    // alert("anam")
                    setSwitchBtn(false)
                }
            } else {
                console.log('Already at the starting point');
            }
        } else {
            console.log("Already at the starting point");
        }
    };

    const HandleSubmit = () => {
        let route = loc.pathname === "/Risk-Profile" ? "/Risk-Profile/" : loc.pathname;

        const currentIndex = QuestionArray.findIndex(q => "/Risk-Profile" + q.route === route);

        if (currentIndex < QuestionArray.length - 1) {
            Nav("/Risk-Profile" + QuestionArray[currentIndex + 1].route);
            setProgress((prevProgress) => prevProgress + (90 / (QuestionArray.length - 1)));
            if (currentIndex == QuestionArray.length - 2) {
                // alert("anam")
                setSwitchBtn(true)
            }
        } else {
            console.log('Form submitted or navigate to the summary page');
            // Form.current.handleSubmit();
        }

    };


    let fillTheValues = ({ setFieldValue }) => {
        if (riskQuestion && Object.keys(riskQuestion).length > 0) {
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
                                <div className='mb-5'>
                                    <ProgressBar progress={Progress} /> {/* Here 50 is the progress percentage */}
                                </div>


                                <h3 className="text-center mainHeading d-none" onClick={() => { console.log(JSON.stringify(values)) }}>
                                    <b>Risk Profile</b>
                                </h3>

                                {/* question  */}
                                <div className="mb-3">
                                    <label className="form-label w-100 text-center">Joined Profile?</label>
                                    {/* switch button style */}
                                    <div className='d-flex justify-content-center mt-3'>
                                        <div className="w-25">
                                            <DynamicYesNo name={`joinedProfile`} values={values} handleChange={handleChange} />
                                        </div>
                                    </div>
                                </div>

                                <Routes>
                                    {QuestionArray.map((elem, index) => (
                                        <Route
                                            key={index}
                                            path={elem.route}
                                            element={<RiskQuestion1 Obj={{ setValues, values, setFieldValue, handleChange }}
                                                QuestionProps={elem} />}
                                        />
                                    ))}
                                </Routes>


                                <div className={`row  ${BackButton ? "justify-content-between" : "justify-content-end"} my-3`}>
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
                                    <div className='col-md-2'>
                                        {!SwitchBtn &&
                                            <button
                                                type='button'
                                                onClick={HandleSubmit}
                                                className="float-center btn w-100  bgColor modalBtn  d-flex justify-content-center align-items-center gap-1"
                                            >
                                                Next <FaArrowRightLong />
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