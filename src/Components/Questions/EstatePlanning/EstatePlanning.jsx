import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import will from "../svgs/page-with-curl-svgrepo-com.svg";
import POA from "../svgs/conversation-person-svgrepo-com.svg";
import advisor from "../svgs/online-interview-male-svgrepo-com.svg";


import {
    faCircleInfo,
    faCircleQuestion,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import { useRecoilState, useRecoilValue } from "recoil";
import { QuestionShift, CRState, defaultUrl } from "../../../Store/Store";
import { Form, Formik } from "formik";
import { GetAxios, openNotificationSuccess, PatchAxios, PostAxios } from "../../Assets/Api/Api";
import { FaCircleQuestion } from "react-icons/fa6";
import { Tooltip } from "antd";
import { Image } from "react-bootstrap";
import DynamicQuestionBlocks from "../../Assets/DynamicQuestionBlocks/DynamicQuestionBlocks";



const EstatePlanning = (props) => {

    let [CRObject, setCRObject] = useRecoilState(CRState);

    const [flagState, setFlagState] = useState(false);

    let DefaultUrl = useRecoilValue(defaultUrl)

    const FetchQuestions = async () => {
        try {
            const res = await GetAxios(`${DefaultUrl}/api/questions/${localStorage.getItem("UserID")}`);
            if (res) {
                setCRObject(res);
                setFlagState(true);
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    useEffect(() => {
        FetchQuestions();
    }, []);

    const handleResponse = (values) => {
        setCRObject(values);
        localStorage.setItem("QuestionsState", JSON.stringify(values));
        props.setQuestionChange(false);
        localStorage.setItem("Question", "PersonalAssets");
    };

    const onSubmit = async (values) => {
        try {
            if (!flagState) {
                const PostRes = await PostAxios(`${DefaultUrl}/api/questions/Add`, values);
                if (PostRes) {
                    if (props.flagState) {
                        props.setFlagState(false);
                    }
                    handleResponse(values);
                }
            } else {
                const PatchRes = await PatchAxios(`${DefaultUrl}/api/questions/Update/${localStorage.getItem("UserID")}`, values);
                if (PatchRes) {
                    if (props.flagState) {
                        props.setFlagState(false);
                    }
                    handleResponse(values);
                }
            }
            openNotificationSuccess("success", "topRight", "Success Notification", "Data of \"" + props.modalObject.title + "\" is Saved");
        } catch (error) {
            console.error("Error submitting form:", error);
            openNotificationSuccess("error", "topRight", "Error Notification", "Data of \"" + props.modalObject.title + "\" is not Saved Please! try again");
        }
    };


    let QuestionArray = [
        {
            title: "Do you have a Will?",
            img: will,
            key: "will",
            info: "When yes is selected for Partner for Wills  and POA have an option to copy details from Client Answers for Will  and POA this will apply for when client and partner have a Will together."
        },
        {
            title: "Do you have a Power of Attorney in place?",
            img: POA,
            key: "POA",
            info: "When yes is selected for Partner for Wills  and POA have an option to copy details from Client Answers for Will  and POA this will apply for when client and partner have a Will together."
        },
        {
            title: "Do you have any Professional Advisers",
            img: advisor,
            key: "professionalAdviser",
        },
    ]

    const QuestionClick = (index, elem, values, setFieldValue) => {
        // console.log("image clicked in goals", index, elem.key, values);
        if (values[elem.key] == "No") {
            setFieldValue(elem.key, "Yes");
        }
        if (values[elem.key] == "Yes") {
            setFieldValue(elem.key, "No");
        }
    };

    return (
        <div className="container-fluid">
            <div className="row m-0">
                <Formik
                    initialValues={CRObject}
                    onSubmit={onSubmit}
                    enableReinitialize
                    innerRef={props.formRef}
                >
                    {({ values, handleChange, setFieldValue }) => <Form>
                        <div className="col-md-12 text-center">
                            <h4 className="heading d-none">Estate Planning & Professional Adviser</h4>

                            <div className="row my-3 justify-content-center">
                                <DynamicQuestionBlocks QuestionArray={QuestionArray} QuestionClick={QuestionClick} values={values} setFieldValue={setFieldValue} />
                            </div>


                            <div className="row mt-2 d-none">
                                <div className="col-md-12">
                                    <button
                                        onClick={() => {

                                        }}
                                        type="submit"
                                        className="float-end btn w-25  bgColor modalBtn"
                                    >
                                        Next
                                    </button>
                                    <button
                                        type="button" className="float-end btn w-25  btn-outline  backBtn mx-3"
                                        onClick={() => {

                                            setQuestionChange("SuperAndRetirement")
                                        }}
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>

                        </div>

                    </Form>}
                </Formik>
            </div>
        </div>
    );
};

export default EstatePlanning;
