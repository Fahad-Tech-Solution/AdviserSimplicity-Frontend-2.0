import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, RiskQuestion } from "../../Store/Store";
import { Form, Formik } from "formik";
import { PatchAxios, PostAxios } from "../Assets/Api/Api";
import { Image, Row } from "react-bootstrap";

import temp from "../Questions/svgs/settingMoney.svg"
import parse from 'html-react-parser';


const RiskGoalForm = (props) => {
    let [disc, setDisc] = useState("");
    let [riskQuestion, setRiskQuestion] = useRecoilState(RiskQuestion);

    let DefaultUrl = useRecoilValue(defaultUrl);

    const onSubmit = async (values) => {
        let obj = JSON.parse(JSON.stringify(values));

        obj.clientFK = localStorage.getItem("UserID") || "";

        console.log(obj, "FinalOBject");

        try {
            const PatchRes = await PatchAxios(`${DefaultUrl}/api/riskProfile/Update`, obj);
            if (PatchRes) {
                if (props.flagState) {
                    props.setFlagState(false);
                }
                setRiskQuestion(PatchRes);
            }

        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };


    const goalsClick = (index, elem, setFieldValue) => {
        setFieldValue(`riskGoal.${props.modalObject.innerKey}`, elem.value);
        setDisc(elem.des);
    };

    useEffect(() => {
        let dec = printTitleIfMatch(riskQuestion.riskGoal[props.modalObject.innerKey])
        // alert("data  :" + riskQuestion[props.modalObject.innerKey]);
        setDisc(dec);
    }, [])


    const printTitleIfMatch = (valueToMatch) => {
        const match = RiskGoals.find(obj => obj.value === valueToMatch);
        return match ? match.des : "Default Title";
    };



    let RiskGoals = [
        {
            title: "Cash Management",
            value: "Cash Management",
            img: temp,
            des: "<b>Cash Management</b> - Your responses indicate an extremely low tolerance to investment risk or, alternatively, you have a short investment time frame. The only appropriate investment for this risk profile or time frame is a cash-based investment such as bank accounts, cash management trusts and term deposits."
        },
        {
            title: "Conservative",
            value: "Conservative",
            img: temp,
            des: "<b>Conservative</b> - As a Conservative investor, you really don't like risk. Your risk profile suggests you are most concerned with keeping what you have. As a result, you are prepared to accept lower returns to reduce the risk of losing capital. Based on your risk profile you would generally prefer an investment mix that is positioned defensively to produce a stable return with a higher proportion invested in bonds and cash and a smaller proportion of money in shares and property investments. Minimum Investment Term: 2 years"
        },
        {
            title: "Moderately Conservative",
            value: "Moderately Conservative",
            img: temp,
            des: "<b>Moderately Conservative</b> - As a Moderately Conservative investor, you seek consistent returns using a steady growth strategy. Your risk profile suggests you want some potential for capital growth, but prefer not to have large fluctuations in short term performance. Based on your risk profile, you would generally prefer a diversified portfolio with a balance of defensive assets, such as bonds and cash and growth assets such as shares and property. Minimum Investment Term: 3 years"
        },
        {
            title: "Balanced",
            value: "Balanced",
            img: temp,
            des: "<b>Balanced</b> - As a Balanced investor, you seek a portfolio that will give you the best opportunity to achieve your medium to long term financial goals. Your risk profile suggests you are prepared to experience short term fluctuations in performance for potentially higher returns over the long term. Based on your risk profile, you would generally prefer a diversified portfolio with a bias towards growth assets such as shares and property. Minimum Investment Term: 5 years"
        },
        {
            title: "Growth",
            value: "Growth",
            img: temp,
            des: "<b>Growth</b> - As a Growth investor, you focus on assets with greater growth potential. Your risk profile suggests you are prepared to accept short term fluctuations in performance for potentially greater returns over the longer term. Based on your risk profile, you would generally prefer a diversified portfolio with a strong bias towards growth investments such as shares and property. Minimum Investment Term: 5 years"
        },
        {
            title: "High Growth",
            value: "High Growth",
            img: temp,
            des: "<b>High Growth</b> - As a High Growth investor, you are prepared to compromise portfolio balance to pursue potential long-term gains. Your risk profile suggests you acknowledge there will be short term fluctuations in performance and are comfortable to invest in high risk investments. Based on your risk profile you would generally prefer a portfolio comprising solely growth assets such as shares and property. Minimum Investment Term: 7 years. "
        }
    ]


    return (
        <div className="container-fluid">
            <div className="row m-0">
                <Formik
                    initialValues={riskQuestion}
                    onSubmit={onSubmit}
                    enableReinitialize
                    innerRef={props.formRef}
                >
                    {({ values, handleChange, setFieldValue }) => (
                        <Form>
                            <div className="col-md-12 text-center">
                                <Row className="justify-content-center">
                                    {RiskGoals.map((elem, index) => {
                                        return (
                                            <div className="col-md-4 px-2 pb-3 d-flex ">
                                                <div className="flex-grow-1 d-flex">
                                                    <div
                                                        className={`${values.riskGoal[props.modalObject.innerKey] == elem.value ? "customBorder p-3" : "border p-3"} 
                                                             flex-grow-1`}
                                                        onClick={() =>
                                                            goalsClick(index, elem, setFieldValue)
                                                        }
                                                    >
                                                        <div className="text-center">
                                                            <div className="mx-auto" style={{ width: "20%" }}>
                                                                <Image src={elem.img} fluid />
                                                            </div>
                                                        </div>
                                                        <label htmlFor={elem.key} className="form-label">
                                                            {elem.title}
                                                        </label>
                                                    </div>

                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className="col-md-12">
                                        {parse(disc)}
                                    </div>
                                </Row>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default RiskGoalForm;
