import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, RiskQuestion } from "../../Store/Store";
import { Field, Form, Formik } from "formik";
import { PatchAxios, PostAxios } from "../Assets/Api/Api";
import { Button, Image, Modal, Row } from "react-bootstrap";

import parse from 'html-react-parser';
import { content } from "../../Content/Content";


const RiskGoalForm = (props) => {
    let [disc, setDisc] = useState("");
    let [ReasonSelection, setReasonSelection] = useState(false);
    let [riskQuestion, setRiskQuestion] = useRecoilState(RiskQuestion);


    let { RiskGoals } = content;


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
