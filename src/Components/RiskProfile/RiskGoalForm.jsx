import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, RiskQuestion } from "../../Store/Store";
import { Field, Form, Formik } from "formik";
import { openNotificationSuccess, PatchAxios, PostAxios } from "../Assets/Api/Api";
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


        console.log(JSON.stringify(values))


        props.setFieldValue(`${props.modalObject.innerKey}.riskGoal`, values[`${props.modalObject.innerKey}`].riskGoal);
        props.setFieldValue(`${props.modalObject.innerKey}.riskDescription`, values[`${props.modalObject.innerKey}`].riskDescription);

        if (props.flagState) {
            props.setFlagState(false);
        }

    };

    let handleOk = () => {
        setReasonSelection(true);
        setFlagState(false)
    }

    const goalsClick = (index, elem, setFieldValue, values) => {

        if (elem.value !== values[props.modalObject.innerKey].riskGoal) {
            setFlagState(true)
        }


        setFieldValue(`${props.modalObject.innerKey}.riskGoal`, elem.value);
        setDisc(elem.des);


    };

    // useEffect(() => {
    //     let dec = printTitleIfMatch(riskQuestion[props.modalObject.innerKey].riskGoal)
    //     // alert("data  :" + riskQuestion[props.modalObject.innerKey]);
    //     setDisc(dec);
    // }, [])


    const printTitleIfMatch = (valueToMatch) => {
        const match = RiskGoals.find(obj => obj.value === valueToMatch);
        return match ? match.des : "";
    };


    let fillTheValues = (setFieldValue) => {
        let Data = props.modalObject.values;

        setFieldValue(`${props.modalObject.innerKey}.riskGoal`, Data[`${props.modalObject.innerKey}`].riskGoal)
        setFieldValue(`${props.modalObject.innerKey}.riskDescription`, Data[`${props.modalObject.innerKey}`].riskDescription)

        let dec = printTitleIfMatch(Data[`${props.modalObject.innerKey}`].riskGoal)
        // alert("data  :" + riskQuestion[props.modalObject.innerKey]);
        setDisc(dec);
    }


    return (
        <div className="container-fluid">
            <div className="row m-0">
                <Formik
                    initialValues={riskQuestion}
                    onSubmit={onSubmit}
                    enableReinitialize
                    innerRef={props.formRef}
                >
                    {({ values, handleChange, setFieldValue }) => {
                        useEffect(() => {
                            fillTheValues(setFieldValue);
                        }, [])

                        return (
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
                                                        Please provide a reason/description of why you are changing the Risk Profile:
                                                    </label>
                                                    <Field
                                                        as="textarea"
                                                        placeholder={"Enter your reason here..."}
                                                        id="riskDescription"
                                                        name={`${props.modalObject.innerKey}.riskDescription`}
                                                        className="form-control inputDesignDoubleInput mt-3"
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
                                                            className={`${values[`${props.modalObject.innerKey}`].riskGoal == elem.value ? "customBorder p-3" : "border p-3"} 
                                                             flex-grow-1`}
                                                            onClick={() =>
                                                                goalsClick(index, elem, setFieldValue, values)
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
                        )
                    }
                    }
                </Formik>
            </div>
        </div>
    );
};

export default RiskGoalForm;
