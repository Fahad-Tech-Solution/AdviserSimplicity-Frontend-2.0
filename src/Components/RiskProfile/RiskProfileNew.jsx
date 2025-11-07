import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import DynamicYesNo from "../Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import RiskQuestion1 from "./RiskQuestion1";

// import "./riskProfile.css"

import Risk1 from "../Questions/svgs/Risk-safebox.svg";
import Risk2 from "../Questions/svgs/Risk-coin.png";
import Risk3 from "../Questions/svgs/Risk-loss-graph-finance-svgrepo-com.svg";
import Risk4 from "../Questions/svgs/Risk-grocery.png";
import Risk5 from "../Questions/svgs/Risk-contract-svgrepo-com.svg";
import Risk6 from "../Questions/svgs/Risk-innovation.png";
import Risk7 from "../Questions/svgs/Risk-bar-chart-finance-business.svg";
import Risk8 from "../Questions/svgs/Risk-chart-pie-chart.svg";
import RiskReward from "../Questions/svgs/RiskReward.png";
import ProgressBar from "./ProgressBar/ProgressBar";

import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import {
  GetAxios,
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
} from "../Assets/Api/Api";
import {
  defaultUrl,
  RiskQuestion,
  SelectedClientDetails,
} from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import { Image } from "react-bootstrap";
import RiskProfileCards from "./RiskProfileCards";

import "yup-phone";
import * as Yup from "yup";
import Notfound404 from "../Questions/svgs/Notfound404";
import { ConfigProvider, notification, Spin } from "antd";

const RiskProfileNew = () => {
  let DefaultUrl = useRecoilValue(defaultUrl);
  let [riskQuestion, setRiskQuestion] = useRecoilState(RiskQuestion);
  let selectedClientDetails = useRecoilValue(SelectedClientDetails);

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));

  let [Progress, setProgress] = useState(10);
  let [confirmFlag, setConfirmFlag] = useState({
    client: false,
    partner: false,
  });
  let [SwitchBtn, setSwitchBtn] = useState(false);
  let [loading, setLoading] = useState(false);
  // let Form = useRef(null);
  let [mainBoard, setMainBoard] = useState(false);

  let renderOnce = 1;

  useEffect(() => {
    if (selectedClientDetails?._id) {
      GetRiskData();
    } else {
      if (renderOnce == 1) {
        renderOnce = 2;
        openNotificationSuccess(
          "info",
          "topRight",
          "Info Notification",
          "Please! select a user first"
        );
        Nav("/user/my-clients");
      }
    }
  }, []);

  const GetRiskData = async () => {
    try {
      const res = await GetAxios(
        `${DefaultUrl}/api/riskProfile/${localStorage.getItem("UserID")}`
      );

      if (res && res._id) {
        setRiskQuestion(res);
        Nav("/user/risk-profile/cards");
      }
    } catch (error) {
      console.error("Error fetching risk data:", error);
    } finally {
      // 🟢 always stop loading after API completes
      setLoading(false);
    }
  };

  let initialValues = {
    client: {
      question1: 1,
      question2: 1,
      question3: 1,
      question4: 1,
      question5: 1,
      question6: 1,
      question7: 1,
      question8: 1,
      riskGoal: "Conservative",
      riskDescription: "",
      happyWithResult: false,
      confirmRiskProfileCheck1: false,
      confirmRiskProfileCheck2: false,
      confirmRiskProfileCheck3: false,
      addNoteDescription: "",
    },
    partner: {
      question1: 1,
      question2: 1,
      question3: 1,
      question4: 1,
      question5: 1,
      question6: 1,
      question7: 1,
      question8: 1,
      riskGoal: "Conservative",
      riskDescription: "",
      happyWithResult: false,
      confirmRiskProfileCheck1: false,
      confirmRiskProfileCheck2: false,
      confirmRiskProfileCheck3: false,
      addNoteDescription: "",
    },
    joinedProfile: "No",
    currentQuestion: "5",
  };

  const onSubmit = async (values) => {
    try {
      // console.log(JSON.stringify(values));

      const obj = { ...values, clientFK: localStorage.getItem("UserID") };

      // Check if riskQuestion exists and has an ID
      if (
        riskQuestion &&
        Object.keys(riskQuestion).length > 0 &&
        !riskQuestion._id
      ) {
        // POST request for adding new risk question

        if (!confirmFlag.client) {
          obj.client.riskDescription = "";
          obj.client.riskGoal = "";
          obj.client.addNoteDescription = "";
        }

        if (!confirmFlag.partner) {
          obj.partner.riskDescription = "";
          obj.partner.riskGoal = "";
          obj.partner.addNoteDescription = "";
        }

        const res = await PostAxios(`${DefaultUrl}/api/riskProfile/Add`, obj);

        if (res && res._id) {
          // console.log('Add Response:', res);
          setRiskQuestion(res); // Assuming response data contains the updated risk question
          // Nav("/risk-profile/cards")
        } else {
          console.error("Unexpected response format for Add:", res);
        }
      } else {
        // PATCH request for updating existing risk question
        obj._id = riskQuestion._id;

        if (!confirmFlag.client) {
          obj.client.riskDescription = riskQuestion.client.riskDescription;
          obj.client.riskGoal = riskQuestion.client.riskGoal;
          obj.client.addNoteDescription =
            riskQuestion.client.addNoteDescription;
        }

        if (!confirmFlag.partner) {
          obj.partner.riskDescription = riskQuestion.partner.riskDescription;
          obj.partner.riskGoal = riskQuestion.partner.riskGoal;
          obj.partner.addNoteDescription =
            riskQuestion.partner.addNoteDescription;
        }

        const res = await PatchAxios(
          `${DefaultUrl}/api/riskProfile/Update`,
          obj
        );

        if (res && res._id) {
          console.log("Update Response:", res);
          setRiskQuestion(res); // Assuming response data contains the updated risk question
          openNotificationSuccess(
            "success",
            "topRight",
            "Success Notification",
            "Data of Risk Profile is Saved"
          );
          // Nav("/risk-profile/cards")
        } else {
          console.error("Unexpected response format for Update:", res);
          openNotificationSuccess(
            "error",
            "topRight",
            "Error Notification",
            "Data of Risk Profile is not Saved Please! try again"
          );
        }
      }
    } catch (error) {
      // Handle any errors during API calls
      console.error("Error during API call:", error);
      // Optionally, you might want to provide user feedback here
    }
  };

  let QuestionArray = [
    {
      route: "/",
      key: "LandingPage",
      question: "",
      choices: [
        "Less than one year",
        "1 – 3 years",
        "3 – 5 years",
        "More than 5 years",
      ],
      imgUrl: RiskReward,
    },
    {
      route: "/Q1",
      key: "question1",
      question:
        "<div className='d-inline-block text-green'>Question 1: Accessibility of your Funds - Desired Liquidity.</div> Based on your stated goals, how long do you envisage these funds can be invested before you require access to them?",
      choices: [
        "Less than one year",
        "1 – 3 years",
        "3 – 5 years",
        "More than 5 years",
      ],
      imgUrl: Risk1,
    },
    {
      route: "/Q2",
      key: "question2",
      question:
        "<div className='d-inline-block text-green'>Question 2: Your desired rate of return.</div> What annual rate of return do you expect your investments to achieve in order to satisfy your previously stated goals?",
      choices: ["Less than 5%", "5% - 10%", "More than 10%"],
      imgUrl: Risk2,
    },
    {
      route: "/Q3",
      key: "question3",
      question:
        "<div className='d-inline-block text-green'>Question 3: Your attitude to Capital Risk.</div> Which response best describes your attitude toward investing?",
      choices: [
        "The safety of my capital is of primary importance to me. I am happier to achieve a lower rate of return rather than risk any significant loss of my capital.",
        "I would like the value of my capital to remain relatively stable but it is important that my investments meet my income requirements.",
        "I am comfortable with the value of my investment going up and down in value over time to try and achieve higher returns over the long term.",
        "I'm comfortable and prepared to take on high risk for the chance of getting higher returns on my money over the long term.",
      ],
      imgUrl: Risk3,
    },
    {
      route: "/Q4",
      key: "question4",
      question:
        "<div className='d-inline-block text-green'>Question 4: Your concerns about inflation.</div>  How concerned are you with your savings being eroded due to inflation and the rising costs of necessities such as groceries, utilities, and healthcare.",
      choices: [
        "Not concerned",
        "Slightly concerned",
        "Moderately concerned",
        "Very concerned",
        "Highly concerned",
      ],
      imgUrl: Risk4,
    },
    {
      route: "/Q5",
      key: "question5",
      question:
        "<div className='d-inline-block text-green'>Question 5: Your concerns about Legislative Risk.</div> Investors often arrange their finances in order to qualify for government benefits and / or tax advantages. However, potential changes in the law risk leaving them worse off after those rearrangements have been made. Would you still rearrange your investments to qualify for these benefits, despite the risks of being worse off?",
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
      question:
        "<div className='d-inline-block text-green'>Question 6: Your investment knowledge & experience.</div> How familiar are you with Investment Markets?",
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
      question:
        "<div className='d-inline-block text-green'>Question 7: Your concern about volatility - The changes in how much money your investments make, and the chance of losing money. <h5 className='d-inline p-0 m-0 fw-bold text-black font-Montserrat'>If you invested $100,000 a year ago and you find out today it's worth $80,000 how would you feel?<div></div>",
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
      question:
        "<div className='d-inline-block text-green'>Question 8: Your investment preferences – Asset allocation.</div> What level of investment risk are you comfortable with?",
      choices: [
        "No risk and I don’t want my capital to go down at all even if I get a 0% return on my money.",
        "I prefer low risk and am comfortable allocating a small portion (up to 40%) of my money to the share market aiming for better returns than the cash rate.",
        "I am comfortable with a medium level of risk and have my money allocated with similar amounts between the share market and cash and fixed interest/term deposits.",
        "I would prefer to have my money invested in a well diversified portfolio which includes more than 600% to Australian and international shares and property with the balance to cash and fixed interest/term deposits.",
        "I would prefer to have a minimum of  80% of my money invested in   Australian and international shares, possibly up to 100% if needed, aiming for higher returns even if there are significant ups and downs and wild swings like recent market events such as  COVID (2020), or the Global Financial Crises (2008)  because I won't need the money for a long time (10 years minimum).",
      ],
      imgUrl: Risk8,
    },
    {
      route: "/cards",
      key: "cardSet",
      question: "",
      choices: [
        "No risk and I don’t want my capital to go down at all even if I get a 0% return on my money.",
      ],
      imgUrl: Risk8,
    },
  ];

  let Nav = useNavigate();
  let loc = useLocation();

  let [BackButton, setBackButton] = useState(false);

  useEffect(() => {
    const currentPath =
      loc.pathname === "/user/risk-profile"
        ? "/user/risk-profile/"
        : loc.pathname;
    const currentIndex = QuestionArray.findIndex(
      (q) => "/user/risk-profile" + q.route === currentPath
    );

    if (currentIndex >= 0 && currentIndex < QuestionArray.length) {
      let progressRate = (90 / (QuestionArray.length - 1)) * currentIndex;
      setProgress(progressRate == 0 ? 10 : progressRate);
      setSwitchBtn(currentIndex === QuestionArray.length - 1);

      if (currentIndex == 0) {
        setBackButton(false);
        setMainBoard(false);
      } else {
        setBackButton(true);
        setMainBoard(true);
      }
    }
  }, [loc]);

  const BackHandle = () => {
    const currentPath =
      loc.pathname === "/user/risk-profile"
        ? "/user/risk-profile/"
        : loc.pathname;

    // console.log(currentPath);
    const currentIndex = QuestionArray.findIndex(
      (q) => "/user/risk-profile" + q.route === currentPath
    );

    // console.log(currentIndex);
    if (currentIndex > 0) {
      console.log(QuestionArray[currentIndex - 1].route);
      Nav("/user/risk-profile" + QuestionArray[currentIndex - 1].route);
    } else {
      console.log("Already at the starting point");
    }
  };

  const HandleSubmit = () => {
    //yahan kuch karo ga taka first time ma Data Sheet show ho

    const currentPath =
      loc.pathname === "/user/risk-profile"
        ? "/user/risk-profile/"
        : loc.pathname;

    const currentIndex = QuestionArray.findIndex(
      (q) => "/user/risk-profile" + q.route === currentPath
    );

    if (currentIndex < QuestionArray.length - 1) {
      setBackButton(true);
      Nav("/user/risk-profile" + QuestionArray[currentIndex + 1].route);
    } else {
      console.log("Form submitted or navigate to the summary page");
      // Form.current.handleSubmit();
    }
  };

  let fillTheValues = (setFieldValue) => {
    if (
      riskQuestion &&
      Object.keys(riskQuestion).length > 0 &&
      riskQuestion._id
    ) {
      let data = riskQuestion;

      setFieldValue("joinedProfile", riskQuestion.joinedProfile);

      if (data.client) {
        setFieldValue("client.question1", data.client.question1);
        setFieldValue("client.question2", data.client.question2);
        setFieldValue("client.question3", data.client.question3);
        setFieldValue("client.question4", data.client.question4);
        setFieldValue("client.question5", data.client.question5);
        setFieldValue("client.question6", data.client.question6);
        setFieldValue("client.question7", data.client.question7);
        setFieldValue("client.question8", data.client.question8);
        setFieldValue("client.riskGoal", data.client.riskGoal);
        setFieldValue("client.riskDescription", data.client.riskDescription);
        setFieldValue("client.happyWithResult", data.client.happyWithResult);
        setFieldValue(
          "client.confirmRiskProfileCheck1",
          data.client.confirmRiskProfileCheck1
        );
        setFieldValue(
          "client.confirmRiskProfileCheck2",
          data.client.confirmRiskProfileCheck2
        );
        setFieldValue(
          "client.confirmRiskProfileCheck3",
          data.client.confirmRiskProfileCheck3
        );
        setFieldValue(
          "client.addNoteDescription",
          data.client.addNoteDescription
        );
      }

      if (riskQuestion.joinedProfile == "No" && data.partner) {
        setFieldValue("partner.question1", data.partner.question1);
        setFieldValue("partner.question2", data.partner.question2);
        setFieldValue("partner.question3", data.partner.question3);
        setFieldValue("partner.question4", data.partner.question4);
        setFieldValue("partner.question5", data.partner.question5);
        setFieldValue("partner.question6", data.partner.question6);
        setFieldValue("partner.question7", data.partner.question7);
        setFieldValue("partner.question8", data.partner.question8);

        setFieldValue("partner.riskGoal", data.partner.riskGoal);
        setFieldValue("partner.riskDescription", data.partner.riskDescription);

        setFieldValue("partner.happyWithResult", data.partner.happyWithResult);
        setFieldValue(
          "partner.confirmRiskProfileCheck1",
          data.partner.confirmRiskProfileCheck1
        );
        setFieldValue(
          "partner.confirmRiskProfileCheck2",
          data.partner.confirmRiskProfileCheck2
        );
        setFieldValue(
          "partner.confirmRiskProfileCheck3",
          data.partner.confirmRiskProfileCheck3
        );
        setFieldValue(
          "partner.addNoteDescription",
          data.partner.addNoteDescription
        );
      }

      console.log(riskQuestion, ":riskQuestion");
    }
  };

  const validationSchema =
    UserStatus !== "Married"
      ? Yup.object({
          client: Yup.object({
            happyWithResult: Yup.boolean()
              .oneOf([true], "Client must be happy with the result")
              .required("Required"),
            confirmRiskProfileCheck1: Yup.boolean()
              .oneOf([true], "Client must confirm Risk Profile Check 1")
              .required("Required"),
            confirmRiskProfileCheck2: Yup.boolean()
              .oneOf([true], "Client must confirm Risk Profile Check 2")
              .required("Required"),
            confirmRiskProfileCheck3: Yup.boolean()
              .oneOf([true], "Client must confirm Risk Profile Check 3")
              .required("Required"),
          }),
        })
      : Yup.object({
          client: Yup.object({
            happyWithResult: Yup.boolean()
              .oneOf([true], "Client must be happy with the result")
              .required("Required"),
            confirmRiskProfileCheck1: Yup.boolean()
              .oneOf([true], "Client must confirm Risk Profile Check 1")
              .required("Required"),
            confirmRiskProfileCheck2: Yup.boolean()
              .oneOf([true], "Client must confirm Risk Profile Check 2")
              .required("Required"),
            confirmRiskProfileCheck3: Yup.boolean()
              .oneOf([true], "Client must confirm Risk Profile Check 3")
              .required("Required"),
          }),
          partner: Yup.object({
            happyWithResult: Yup.boolean()
              .oneOf([true], "Partner must be happy with the result")
              .required("Required"),
            confirmRiskProfileCheck1: Yup.boolean()
              .oneOf([true], "Partner must confirm Risk Profile Check 1")
              .required("Required"),
            confirmRiskProfileCheck2: Yup.boolean()
              .oneOf([true], "Partner must confirm Risk Profile Check 2")
              .required("Required"),
            confirmRiskProfileCheck3: Yup.boolean()
              .oneOf([true], "Partner must confirm Risk Profile Check 3")
              .required("Required"),
          }),
        });

  const sendlink = async () => {
    let Obj = {
      name: selectedClientDetails.client.clientGivenName,
      email: selectedClientDetails.client.Email,
      clientFK: selectedClientDetails._id,
    };

    // Unique key to update the same notification
    const key = "sendingEmail";

    // Show loading notification
    notification.open({
      key,
      message: "Sending Email",
      description: "Please wait while we send the Risk Profile...",
      duration: 0, // stays open until updated/closed
      icon: (
        <ConfigProvider
          theme={{
            token: {
              /* here is your global tokens */
              colorPrimary: "#36b446",
            },
          }}
        >
          <Spin size="small" />
        </ConfigProvider>
      ),
    });

    try {
      let res = await PostAxios(`${DefaultUrl}/api/riskprofile/email`, Obj);

      if (res) {
        // Update notification to success
        notification.success({
          key,
          message: "Risk Profile Sent",
          description: "Risk Profile has been sent successfully.",
          duration: 3,
        });
      }
    } catch (error) {
      // Update notification to error
      notification.error({
        key,
        message: "Failed to Send",
        description: "An error occurred while sending the Risk Profile.",
        duration: 3,
      });
      console.log("Error in sendRiskProfile function:", error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spin size="large" tip="Loading Risk Profile..." />
      </div>
    );
  }

  return (
    <div className="container-fluid pt-3">
      <div className="row px-0 m-0">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({ setValues, values, setFieldValue, handleChange }) => {
            useEffect(() => {
              fillTheValues(setFieldValue);
            }, [riskQuestion]);

            return (
              <Form>
                <div className="col-md-12">
                  <Routes>
                    {/* <Route
                    key={"404NotFund"}
                    path="/404NotFound"
                    element={
                      <div style={{ marginTop: "-18%", padding: "0px 20%" }}>
                        <Notfound404 />
                        <p
                          className="text-center"
                          style={{ marginTop: "-15%" }}
                        >
                          Client Haven't filled the Risk Profile yet do you
                          want to send him a link
                        </p>
                        <div
                          className={
                            "w-100 d-flex flex-row justify-content-center align-items-center"
                          }
                        >
                          <div className={"w-50 border"}>
                            <button
                              type="button"
                              className="float-center btn w-100  bgColor modalBtn"
                              onClick={sendlink}
                            >
                              Send link
                            </button>
                          </div>
                        </div>
                      </div>
                    }
                  /> */}
                    {QuestionArray.map((elem, index) => {
                      if (elem.key === "cardSet") {
                        return (
                          <Route
                            key={index}
                            path={elem.route}
                            element={
                              <RiskProfileCards
                                Obj={{
                                  setValues,
                                  values,
                                  setFieldValue,
                                  handleChange,
                                  confirmFlag,
                                  setConfirmFlag,
                                }}
                                QuestionProps={elem}
                              />
                            }
                          />
                        );
                      } else {
                        return (
                          <Route
                            key={index}
                            path={elem.route}
                            element={
                              <RiskQuestion1
                                Obj={{
                                  setValues,
                                  values,
                                  setFieldValue,
                                  handleChange,
                                }}
                                QuestionProps={elem}
                              />
                            }
                          />
                        );
                      }
                    })}
                  </Routes>

                  <div
                    className={`row  ${
                      BackButton
                        ? "justify-content-between"
                        : mainBoard === false
                        ? "justify-content-center"
                        : "justify-content-end"
                    } my-3`}
                  >
                    {BackButton && (
                      <div className="col-md-2">
                        <button
                          type="button"
                          onClick={BackHandle}
                          className="float-center btn w-100  btn-outline  backBtn mx-3 d-flex justify-content-center align-items-center gap-1"
                        >
                          <FaArrowLeftLong /> Back
                        </button>
                      </div>
                    )}

                    <div
                      className={mainBoard === false ? "col-md-4" : "col-md-2"}
                    >
                      {!SwitchBtn && (
                        <button
                          type="button"
                          onClick={HandleSubmit}
                          className="float-center btn w-100  bgColor modalBtn  d-flex justify-content-center align-items-center gap-1"
                        >
                          {mainBoard === false ? (
                            <React.Fragment> Submit </React.Fragment>
                          ) : (
                            <React.Fragment>
                              Next <FaArrowRightLong />
                            </React.Fragment>
                          )}
                        </button>
                      )}

                      {SwitchBtn && (
                        <button
                          type="Submit"
                          className="float-center btn w-100  bgColor modalBtn"
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default RiskProfileNew;
