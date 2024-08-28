import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, RiskQuestion } from "../../Store/Store";
import { Field, Form, Formik } from "formik";
import { PatchAxios, PostAxios } from "../Assets/Api/Api";
import { Button, Image, Modal, Row } from "react-bootstrap";

import LOW1 from "./METER/1- LOW.png"
import ModeratelyLOW from "./METER/2-Moderately Low.png"
import Moderate from "./METER/3- Moderate.png"
import ModeratelyHigh from "./METER/4- Moderately high.png"
import High from "./METER/5-  High.png"
import VeryHigh from "./METER/6- Very High.png"

import parse from 'html-react-parser';


const RiskGoalForm = (props) => {
    let [disc, setDisc] = useState("");
    let [ReasonSelection, setReasonSelection] = useState(false);
    let [riskQuestion, setRiskQuestion] = useRecoilState(RiskQuestion);

    const [flagState, setFlagState] = useState(false); // State to handle user input
    const [modalObject, setModalObject] = useState({}); // State to handle user input

    let DefaultUrl = useRecoilValue(defaultUrl);

    const onSubmit = async (values) => {

        if ((values.riskGoal[props.modalObject.innerKey] === riskQuestion.riskGoal[props.modalObject.innerKey]) || ReasonSelection === true) {

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
        }
        else {
            // functionality of Confirmation

            setModalObject({
                title: "You are Trying change Risk Goal",
                values
            })

            setFlagState(true)

        }

    };

    let handleOk = () => {

        // alert("ma chala")
        setReasonSelection(true);
        setFlagState(false)

    }



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
            img: LOW1,
            des: "<b>Cash Management</b> - Your responses indicate an extremely low tolerance to investment risk or, alternatively, you have a short investment time frame. The only appropriate investment for this risk profile or time frame is a cash-based investment such as bank accounts, cash management trusts and term deposits."
        },
        {
            title: "Conservative",
            value: "Conservative",
            img: ModeratelyLOW,
            des: "<b>Conservative</b> - As a Conservative investor, you really don't like risk. Your risk profile suggests you are most concerned with keeping what you have. As a result, you are prepared to accept lower returns to reduce the risk of losing capital. Based on your risk profile you would generally prefer an investment mix that is positioned defensively to produce a stable return with a higher proportion invested in bonds and cash and a smaller proportion of money in shares and property investments. Minimum Investment Term: 2 years"
        },
        {
            title: "Moderately Conservative",
            value: "Moderately Conservative",
            img: Moderate,
            des: "<b>Moderately Conservative</b> - As a Moderately Conservative investor, you seek consistent returns using a steady growth strategy. Your risk profile suggests you want some potential for capital growth, but prefer not to have large fluctuations in short term performance. Based on your risk profile, you would generally prefer a diversified portfolio with a balance of defensive assets, such as bonds and cash and growth assets such as shares and property. Minimum Investment Term: 3 years"
        },
        {
            title: "Balanced",
            value: "Balanced",
            img: ModeratelyHigh,
            des: "<b>Balanced</b> - As a Balanced investor, you seek a portfolio that will give you the best opportunity to achieve your medium to long term financial goals. Your risk profile suggests you are prepared to experience short term fluctuations in performance for potentially higher returns over the long term. Based on your risk profile, you would generally prefer a diversified portfolio with a bias towards growth assets such as shares and property. Minimum Investment Term: 5 years"
        },
        {
            title: "Growth",
            value: "Growth",
            img: High,
            des: "<b>Growth</b> - As a Growth investor, you focus on assets with greater growth potential. Your risk profile suggests you are prepared to accept short term fluctuations in performance for potentially greater returns over the longer term. Based on your risk profile, you would generally prefer a diversified portfolio with a strong bias towards growth investments such as shares and property. Minimum Investment Term: 5 years"
        },
        {
            title: "High Growth",
            value: "High Growth",
            img: VeryHigh,
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


                                <Modal
                                    size={"lg"}
                                    backdrop="static"
                                    keyboard={false}
                                    centered
                                    show={flagState}
                                    onHide={() => setFlagState(false)}
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title>{modalObject.title}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label className="d-block" htmlFor={"riskDescription"}>
                                                    Please provide a description for why you are changing your plan:
                                                </label>
                                                <Field
                                                    as="textarea"
                                                    placeholder={"Enter your reason here..."}
                                                    id="riskDescription"
                                                    name={`riskDescription.${props.modalObject.innerKey}`}
                                                    className="form-control inputDesign mt-3"
                                                />
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setFlagState(false)}>
                                            Close
                                        </Button>
                                        <button
                                            onClick={handleOk}
                                            type="button"
                                            className='btn bgColor modalBtn'
                                        >
                                            Submit
                                        </button>
                                    </Modal.Footer>
                                </Modal>


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
                                                            <div className="mx-auto" style={{ width: "40%" }}>
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
