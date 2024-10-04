import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Button, Card, InputGroup } from 'react-bootstrap'
import { defaultUrl, RiskQuestion } from '../../Store/Store'
import { useRecoilState, useRecoilValue } from 'recoil'
import { GetAxios } from '../Assets/Api/Api'
import { Field, Form, Formik } from 'formik'

import ApexChart from './ApexChart'
import ModalComponent from '../Questions/FinancialInvestments/ModalComponent'
import RiskGoalForm from './RiskGoalForm'

import single from "../Svgs/single-2.svg";
import couple from "../Svgs/couple-2.svg";
import { content } from '../../Content/Content'
import parse from 'html-react-parser';
import { FiPlus } from 'react-icons/fi'
import DynamicDescription from '../Questions/EstatePlanning/DynamicDescription'


const RiskProfileCards = () => {


    let DefaultUrl = useRecoilValue(defaultUrl)
    let [riskQuestion, setRiskQuestion] = useRecoilState(RiskQuestion);
    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let { RiskGoals } = content;


    useEffect(() => {
        if (riskQuestion && Object.keys(riskQuestion).length > 0 && riskQuestion._id == null) {
            GetRiskData();
        }
    }, [])


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
        riskDescription: { client: "1", partner: "1", },
        riskGoal: { client: "1", partner: "1", },

    }


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


    let onSubmit = (values) => {
        console.log(JSON.stringify(values))
    }

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
            console.log(riskQuestion, ":riskQuestion");
        }
    }

    let OpenModal = (title, values, innerKey, stackHolder) => {
        // alert(title + " ++ " + Input);
        setModalObject({
            title,
            values,
            innerKey,
            stackHolder
        })
        setFlagState(true);
    }

    let SelectedDiscription = (selectedValue) => {

        const currentIndex = RiskGoals.findIndex(q => q.value === selectedValue);
        // alert(selectedValue)
        if (currentIndex) {
            let { des } = RiskGoals[currentIndex] || "";
            return (parse(des || ""))
        }
    }

    return (
        <div className="container-fluid pt-3">

            {/*  modal */}
            <ModalComponent modalObject={modalObject} setFlagState={setFlagState} flagState={flagState}>
                {
                    modalObject.title == "Risk Goals" ? <RiskGoalForm /> :
                        modalObject.title == "Add Note" ? <DynamicDescription /> : ""

                }
            </ModalComponent>
            {/*  modal */}

            <div className="row px-0 m-0 ">
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    {({ setValues, values, setFieldValue, handleChange }) => {
                        useEffect(() => {
                            fillTheValues(setFieldValue);
                        }, [riskQuestion, setRiskQuestion])
                        return (
                            <div className='col-md-12'>
                                <Form>
                                    <div className='row justify-content-center align-items-center'>
                                        <div className='col-md-6 my-3'>
                                            <Card className="py-4 shadow borderOverAll" style={{ borderRadius: "20px", height: "100%" }}>
                                                <h5 className='text-center' onClick={() => { console.log(riskQuestion) }}>
                                                    Client
                                                    <div className="iconContainerLg m-0 p-0">
                                                        <img
                                                            src={single}
                                                            alt="single svg"
                                                            className="w-50 "
                                                        />
                                                    </div>
                                                </h5>

                                                <div className="d-flex justify-content-center align-items-stretch w-100" style={{ minHeight: "30vh" }}>
                                                    <ApexChart data={[30, 20, 60, 15, 15, 15,]} title={values.riskGoal.client} />
                                                </div>
                                                <div className="row justify-content-center align-items-center my-2">
                                                    <div className='col-12 p-0 '>
                                                        <div className='d-flex flex-row justify-content-center align-items-center gap-2'>

                                                            <label
                                                                className=" d-block text-end"
                                                                htmlFor={"client"}
                                                            >  {localStorage.getItem("UserName") || "Client"} </label>
                                                            <label
                                                                className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                                                onClick={() => { OpenModal("Risk Goals", values, "client") }}
                                                            >
                                                                <div>
                                                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                </div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Field id="ClientData" name={"riskGoal.client"} disabled className="form-control inputDesign text-center" />
                                                <div className="row justify-content-center align-items-center my-2">
                                                    <div className='col-12 text-center'>
                                                        {SelectedDiscription(values.riskGoal.client)}
                                                    </div>
                                                    <div className='col-md-12 text-center mt-2'>
                                                        <InputGroup>
                                                            <Button className='btn bgColor modalBtn border-0' id="button-addon2"
                                                                onClick={() => { OpenModal("Add Note", values, "client", "client") }}
                                                            >
                                                                <FiPlus />
                                                            </Button>
                                                            <Field id="ClientData" name={"riskGoal.client"} className="form-control inputDesign text-center" placeholder={"Add Note"} />
                                                        </InputGroup>
                                                    </div>
                                                    <div className='col-md-12 text-center mt-2'>
                                                        <Field type="checkbox" id="ClienthappyWithResult" name={"happyWithResult.client"} className="form-check-input newCheck" />
                                                        <div className='d-inline-block ms-2'>
                                                            <label htmlFor='ClienthappyWithResult'>Please confirm that you are happy with the risk result </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                        {values.joinedProfile === "No" &&

                                            <div className='col-md-6 my-3'>
                                                <Card className="py-4 shadow borderOverAll" style={{ borderRadius: "20px", height: "100%" }}>
                                                    <h5 className='text-center' onClick={() => { console.log(riskQuestion) }}>
                                                        Partner
                                                        <div className="iconContainerLg">
                                                            <img
                                                                src={couple}
                                                                alt="single svg"
                                                                className="w-50 "
                                                            />
                                                        </div>
                                                    </h5>

                                                    <div className="d-flex justify-content-center align-items-stretch w-100" style={{ minHeight: "30vh" }}>
                                                        <ApexChart data={[30, 20, 60, 15, 15, 10]} title={values.riskGoal.partner} />
                                                    </div>
                                                    <div className="row justify-content-center align-items-center my-2">
                                                        <div className='col-12 p-0 '>
                                                            <div className='d-flex flex-row justify-content-center align-items-center gap-2'>

                                                                <label
                                                                    className=" d-block text-end"
                                                                    htmlFor={"partner"}
                                                                >{localStorage.getItem("PartnerName") || "Partner"}</label>
                                                                <label
                                                                    className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                                                    onClick={() => { OpenModal("Risk Goals", values, "partner") }}
                                                                >
                                                                    <div>
                                                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Field id="partnerData" name={"riskGoal.partner"} disabled className="form-control inputDesign text-center" />
                                                    <div className="row justify-content-center align-items-center my-2">
                                                        <div className='col-12 text-center'>
                                                            {SelectedDiscription(values.riskGoal.partner)}
                                                        </div>
                                                        <div className='col-md-12 text-center mt-2'>
                                                            <InputGroup>
                                                                <Button className='btn bgColor modalBtn border-0' id="button-addon2"
                                                                    onClick={() => { OpenModal("Add Note", values, "partner", "partner") }}
                                                                >
                                                                    <FiPlus />
                                                                </Button>
                                                                <Field id="ClientData" name={"addNoteDescription.partner"} className="form-control inputDesign text-center" placeholder={"Add Note"} />
                                                            </InputGroup>
                                                        </div>
                                                        <div className='col-md-12 text-center mt-2'>
                                                            <Field type="checkbox" id="partnerhappyWithResult" name={"happyWithResult.partner"} className="form-check-input newCheck" />
                                                            <div className='d-inline-block ms-2'>
                                                                <label htmlFor='partnerhappyWithResult'>Please confirm that you are happy with the risk result </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </div>

                                        }
                                    </div>
                                </Form>
                            </div>)
                    }}

                </Formik>
            </div>
        </div>
    )
}

export default RiskProfileCards
