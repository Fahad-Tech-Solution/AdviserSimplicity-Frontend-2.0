import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Button, Card, InputGroup } from 'react-bootstrap'
import { defaultUrl, RiskQuestion } from '../../Store/Store'
import { useRecoilState, useRecoilValue } from 'recoil'
import { GetAxios, openNotificationSuccess, PatchAxios, PostAxios } from '../Assets/Api/Api'
import { ErrorMessage, Field, Form, Formik } from 'formik'

import ApexChart from './ApexChart'
import InnerModal from '../Questions/FinancialInvestments/QuestionsDetail/InnerModal'
import RiskGoalForm from './RiskGoalForm'

import single from "../Svgs/single-2.svg";
import couple from "../Svgs/couple-2.svg";
import { content } from '../../Content/Content'
import parse from 'html-react-parser';
import { FiPlus } from 'react-icons/fi'
import DynamicDescription from '../Questions/EstatePlanning/DynamicDescription'
import RiskTermsAndConditions from './RiskTermsAndConditions'
import RechartsPieChart from './RechartsPieChart'

import "yup-phone";
import * as Yup from 'yup';

const RiskProfileCards = () => {


    let DefaultUrl = useRecoilValue(defaultUrl)
    let [riskQuestion, setRiskQuestion] = useRecoilState(RiskQuestion);
    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let [UserStatus] = useState(localStorage.getItem('UserStatus'));

    let { RiskGoals } = content;


    useEffect(() => {
        if (riskQuestion && Object.keys(riskQuestion).length > 0 && riskQuestion._id == null) {
            GetRiskData();
        }
    }, [])


    let initialValues = {
        "client": {
            "question1": 1,
            "question2": 1,
            "question3": 1,
            "question4": 1,
            "question5": 1,
            "question6": 1,
            "question7": 1,
            "question8": 1,
            "riskGoal": "Conservative",
            "riskDescription": "",
            "happyWithResult": false,
            "confirmRiskProfileCheck1": false,
            "confirmRiskProfileCheck2": false,
            "confirmRiskProfileCheck3": false,
            "addNoteDescription": ""
        },
        "partner": {
            "question1": 1,
            "question2": 1,
            "question3": 1,
            "question4": 1,
            "question5": 1,
            "question6": 1,
            "question7": 1,
            "question8": 1,
            "riskGoal": "Conservative",
            "riskDescription": "",
            "happyWithResult": false,
            "confirmRiskProfileCheck1": false,
            "confirmRiskProfileCheck2": false,
            "confirmRiskProfileCheck3": false,
            "addNoteDescription": ""
        },
        "joinedProfile": "No",
        "currentQuestion": "5"
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


    let onSubmit = async (values) => {
        try {
            console.log(JSON.stringify(values))

            let riskData = riskQuestion?.clientFK;

            let res = "";
            let obj = values;

            if (!riskData) {
                // res= await PostAxios("")
                //ya Post Case hai but in current case Post yahan pa kabhi nahi chala ga 
            }
            else {
                obj.clientFK = riskQuestion.clientFK;
                res = await PatchAxios(`${DefaultUrl}/api/riskProfile/Update`, values)
            }

            if (res) {
                console.log(res)
                setRiskQuestion(res);
                openNotificationSuccess("success", "topRight", "Success Notification", "Data of Risk Profile is Saved");
            }
        } catch (error) { console.log(error) }



    }

    let fillTheValues = (setFieldValue) => {
        if (riskQuestion && Object.keys(riskQuestion).length > 0 && riskQuestion._id) {

            let data = riskQuestion;

            setFieldValue("joinedProfile", riskQuestion.joinedProfile)

            if (data.client) {
                setFieldValue("client.question1", data.client.question1)
                setFieldValue("client.question2", data.client.question2)
                setFieldValue("client.question3", data.client.question3)
                setFieldValue("client.question4", data.client.question4)
                setFieldValue("client.question5", data.client.question5)
                setFieldValue("client.question6", data.client.question6)
                setFieldValue("client.question7", data.client.question7)
                setFieldValue("client.question8", data.client.question8)
                setFieldValue("client.riskGoal", data.client.riskGoal)
                setFieldValue("client.riskDescription", data.client.riskDescription)
                setFieldValue("client.happyWithResult", data.client.happyWithResult)
                setFieldValue("client.confirmRiskProfileCheck1", data.client.confirmRiskProfileCheck1)
                setFieldValue("client.confirmRiskProfileCheck2", data.client.confirmRiskProfileCheck2)
                setFieldValue("client.confirmRiskProfileCheck3", data.client.confirmRiskProfileCheck3)
                setFieldValue("client.addNoteDescription", data.client.addNoteDescription)


            }

            if (riskQuestion.joinedProfile == "No" && data.partner) {

                setFieldValue("partner.question1", data.partner.question1)
                setFieldValue("partner.question2", data.partner.question2)
                setFieldValue("partner.question3", data.partner.question3)
                setFieldValue("partner.question4", data.partner.question4)
                setFieldValue("partner.question5", data.partner.question5)
                setFieldValue("partner.question6", data.partner.question6)
                setFieldValue("partner.question7", data.partner.question7)
                setFieldValue("partner.question8", data.partner.question8)

                setFieldValue("partner.riskGoal", data.partner.riskGoal)
                setFieldValue("partner.riskDescription", data.partner.riskDescription)

                setFieldValue("partner.happyWithResult", data.partner.happyWithResult)
                setFieldValue("partner.confirmRiskProfileCheck1", data.partner.confirmRiskProfileCheck1)
                setFieldValue("partner.confirmRiskProfileCheck2", data.partner.confirmRiskProfileCheck2)
                setFieldValue("partner.confirmRiskProfileCheck3", data.partner.confirmRiskProfileCheck3)
                setFieldValue("partner.addNoteDescription", data.partner.addNoteDescription)
            }


            console.log(riskQuestion, ":riskQuestion");
        }
    }

    let OpenModal = (title, values, innerKey, stackHolder, key) => {
        // alert(title + " ++ " + Input);
        setModalObject({
            title,
            values,
            innerKey,
            stackHolder,
            key
        })
        setFlagState(true);
    }

    let SelectedDiscription = (selectedValue) => {

        const currentIndex = RiskGoals.findIndex(q => q.value === selectedValue);
        // console.log(currentIndex, selectedValue, RiskGoals[currentIndex].des)
        // if (currentIndex) {
        let { des } = RiskGoals[currentIndex] || "";
        return (parse(des || ""))
        // }
    }

    const validationSchema = UserStatus !== "Married" ?
        Yup.object({
            client: Yup.object({
                happyWithResult: Yup.boolean()
                    .oneOf([true], 'Client must be happy with the result')
                    .required('Required'),
                confirmRiskProfileCheck1: Yup.boolean()
                    .oneOf([true], 'Client must confirm Risk Profile Check 1')
                    .required('Required'),
                confirmRiskProfileCheck2: Yup.boolean()
                    .oneOf([true], 'Client must confirm Risk Profile Check 2')
                    .required('Required'),
                confirmRiskProfileCheck3: Yup.boolean()
                    .oneOf([true], 'Client must confirm Risk Profile Check 3')
                    .required('Required'),
            }),
        })

        : Yup.object({
            client: Yup.object({
                happyWithResult: Yup.boolean()
                    .oneOf([true], 'Client must be happy with the result')
                    .required('Required'),
                confirmRiskProfileCheck1: Yup.boolean()
                    .oneOf([true], 'Client must confirm Risk Profile Check 1')
                    .required('Required'),
                confirmRiskProfileCheck2: Yup.boolean()
                    .oneOf([true], 'Client must confirm Risk Profile Check 2')
                    .required('Required'),
                confirmRiskProfileCheck3: Yup.boolean()
                    .oneOf([true], 'Client must confirm Risk Profile Check 3')
                    .required('Required'),
            }),
            partner: Yup.object({
                happyWithResult: Yup.boolean()
                    .oneOf([true], 'Partner must be happy with the result')
                    .required('Required'),
                confirmRiskProfileCheck1: Yup.boolean()
                    .oneOf([true], 'Partner must confirm Risk Profile Check 1')
                    .required('Required'),
                confirmRiskProfileCheck2: Yup.boolean()
                    .oneOf([true], 'Partner must confirm Risk Profile Check 2')
                    .required('Required'),
                confirmRiskProfileCheck3: Yup.boolean()
                    .oneOf([true], 'Partner must confirm Risk Profile Check 3')
                    .required('Required'),
            }),
        })

    return (
        <div className="container-fluid pt-3">
            <div className="row px-0 m-0 ">
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    enableReinitialize
                >
                    {({ setValues, values, setFieldValue, handleChange }) => {
                        useEffect(() => {
                            fillTheValues(setFieldValue);
                        }, [riskQuestion, setRiskQuestion])
                        return (
                            <div className='col-md-12'>
                                <Form>

                                    {/*  modal */}
                                    <InnerModal modalObject={modalObject} setFieldValue={setFieldValue} setFlagState={setFlagState} flagState={flagState}>
                                        {
                                            modalObject.title == "Risk Goals" ? <RiskGoalForm /> :
                                                modalObject.title == "Add Note" ? <DynamicDescription /> :
                                                    modalObject.title == "Terms and Conditions" ? <RiskTermsAndConditions /> : ""

                                        }
                                    </InnerModal>
                                    {/*  modal */}



                                    <div className='row justify-content-center align-items-stretch'>
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
                                                {/*
                                                    <div className="d-flex justify-content-center align-items-stretch w-100 d-none" style={{ minHeight: "30vh" }}>
                                                    <ApexChart data={[30, 20, 60, 15, 15, 15,]} title={values.riskGoal.client} />
                                                    </div>
                                                    */}


                                                <div className="d-flex justify-content-center align-items-stretch w-100" style={{ minHeight: "30vh" }}>
                                                    <RechartsPieChart data={[30, 20, 60, 15, 15, 15,]} title={values.client.riskGoal} />
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

                                                <Field id="ClientData" name={"client.riskGoal"} disabled className="form-control inputDesign text-center" />

                                                <div className="row justify-content-center align-items-center my-2">
                                                    <div className='col-12 text-center'>
                                                        {SelectedDiscription(values.client.riskGoal)}
                                                    </div>

                                                    <div className='col-md-12 text-center mt-2'>
                                                        <InputGroup>
                                                            <Button className='btn bgColor modalBtn border-0' id="button-addon2"
                                                                onClick={() => { OpenModal("Add Note", values, "client", "addNoteDescription.", "client",) }}
                                                            >
                                                                <FiPlus />
                                                            </Button>
                                                            <Field id="ClientData" name={"client.addNoteDescription"} className="form-control inputDesign text-center" placeholder={"Add Note"} />
                                                        </InputGroup>
                                                    </div>
                                                    <div className='col-md-12 text-center mt-2'>
                                                        <Field type="checkbox" id="ClienthappyWithResult"
                                                            checked={values.client.happyWithResult}
                                                            values={false}
                                                            name={"client.happyWithResult"} className="form-check-input newCheck"
                                                            onChange={(e) => {
                                                                const updatedValue = !values.client.happyWithResult;

                                                                // Batch all the field updates
                                                                setValues({
                                                                    ...values,
                                                                    client: {
                                                                        ...values.client,
                                                                        happyWithResult: updatedValue,
                                                                        confirmRiskProfileCheck1: updatedValue,
                                                                        confirmRiskProfileCheck2: updatedValue,
                                                                        confirmRiskProfileCheck3: updatedValue,
                                                                    },
                                                                });
                                                            }}
                                                        />
                                                        <div className='d-inline-block ms-2'>
                                                            <label htmlFor='ClienthappyWithResult'>Please confirm that you are happy with the risk result </label>
                                                        </div>

                                                        <ErrorMessage component={"div"} className='text-danger' name="client.happyWithResult" />



                                                    </div>

                                                    <div className='col-md-12 text-center mt-2'>
                                                        <div className='d-inline-block ms-2 text-muted'>
                                                            <a href='#' className='text-reset' onClick={(e) => OpenModal("Terms and Conditions", values, "client", "client")}>Terms & Conditions</a>
                                                        </div>
                                                    </div>

                                                    <div className='col-md-12 text-center mt-2'>
                                                        <button
                                                            type="submit"
                                                            className='btn bgColor modalBtn w-75'
                                                        >
                                                            Submit
                                                        </button>
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
                                                    {/*
                                                        <div className="d-flex justify-content-center align-items-stretch w-100" style={{ minHeight: "30vh" }}>
                                                        <ApexChart data={[30, 20, 60, 15, 15, 10]} title={values.riskGoal.partner} />
                                                        </div>
                                                        */}
                                                    <div className="d-flex justify-content-center align-items-stretch w-100" style={{ minHeight: "30vh" }}>
                                                        <RechartsPieChart data={[30, 20, 60, 15, 15, 10]} title={values.partner.riskGoal} />
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
                                                    <Field id="partnerData" name={"partner.riskGoal"} disabled className="form-control inputDesign text-center" />
                                                    <div className="row justify-content-center align-items-center my-2">
                                                        <div className='col-12 text-center'>
                                                            {SelectedDiscription(values.partner.riskGoal)}
                                                        </div>
                                                        <div className='col-md-12 text-center mt-2 d-flex justify-content-center'>
                                                            <InputGroup className='cardInputGroup'>
                                                                <Button className='btn bgColor modalBtn border-0' id="button-addon2"
                                                                    onClick={() => { OpenModal("Add Note", values, "partner", "addNoteDescription.", "partner",) }}
                                                                >
                                                                    <FiPlus />
                                                                </Button>
                                                                <Field id="PartnerData" name={"partner.addNoteDescription"} className="form-control inputDesignDoubleInput text-center" placeholder={"Add Note"} />
                                                            </InputGroup>
                                                        </div>
                                                        <div className='col-md-12 text-center mt-2'>
                                                            <Field type="checkbox" id="partnerhappyWithResult"
                                                                checked={values.partner.happyWithResult}
                                                                values={false}
                                                                onChange={(e) => {
                                                                    const updatedValue = !values.partner.happyWithResult;

                                                                    // Batch all the field updates
                                                                    setValues({
                                                                        ...values,
                                                                        partner: {
                                                                            ...values.partner,
                                                                            happyWithResult: updatedValue,
                                                                            confirmRiskProfileCheck1: updatedValue,
                                                                            confirmRiskProfileCheck2: updatedValue,
                                                                            confirmRiskProfileCheck3: updatedValue,
                                                                        },
                                                                    });
                                                                }}
                                                                name={"partner.happyWithResult"} className="form-check-input newCheck" />
                                                            <div className='d-inline-block ms-2'>
                                                                <label htmlFor='partnerhappyWithResult'>Please confirm that you are happy with the risk result </label>
                                                            </div>

                                                            <ErrorMessage component={"div"} className='text-danger' name="partner.happyWithResult" />

                                                        </div>
                                                        <div className='col-md-12 text-center mt-2'>
                                                            <div className='d-inline-block ms-2 text-muted'>
                                                                <a href='#' className='text-reset' onClick={(e) => OpenModal("Terms and Conditions", values, "partner", "partner")}>Terms & Conditions</a>
                                                            </div>
                                                        </div>


                                                        <div className='col-md-12 text-center mt-2'>
                                                            <button
                                                                type="submit"
                                                                className='btn bgColor modalBtn w-75'
                                                            >
                                                                Submit
                                                            </button>
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
