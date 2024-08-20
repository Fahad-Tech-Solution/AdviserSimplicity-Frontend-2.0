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
import { GetAxios, PatchAxios, PostAxios } from "../../Assets/Api/Api";
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
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };


    let QuestionArray = [
        {
            title: "Do you have a Will?",
            img: will,
            key: "will",
        },
        {
            title: "Do you have a Power of Attorney in place?",
            img: POA,
            key: "POA",
        },
        {
            title: "Do you have any Professional Advisers",
            img: advisor,
            key: "professionalAdviser",
        },
    ]

    const QuestionClick = (index, elem, values, setFieldValue) => {
        console.log("image clicked in goals", index, elem.key, values);
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

                                <div className="col-md-12 d-none">
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">
                                            Do you have a Will? &nbsp;
                                            <Tooltip placement="top" title={" When yes is selected for Partner for Wills and POA"}>
                                                <FaCircleQuestion style={{ fontSize: '24px', cursor: 'pointer' }} />
                                            </Tooltip>
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={will} alt="" />
                                        </div>
                                        {/* health button style */}

                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                                            <div className="radiobutton ">
                                                <input
                                                    type="radio"
                                                    name="will"
                                                    id="will"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.will === "No"}
                                                />
                                                <label
                                                    htmlFor="will"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="will"
                                                    id="will2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.will === "Yes"}
                                                />
                                                <label
                                                    htmlFor="will2"
                                                    className="label2"
                                                >
                                                    <span>Yes</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* health switch button style */}
                                    </div>
                                </div>
                            </div>

                            <div className="row my-3 d-none">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">
                                            Do you have a Power of Attorney in place?
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={POA} alt="" />
                                        </div>
                                        {/* health button style */}

                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="POA"
                                                    id="POA"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.POA === "No"}
                                                />
                                                <label
                                                    htmlFor="POA"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="POA"
                                                    id="POA2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.POA === "Yes"}
                                                />
                                                <label
                                                    htmlFor="POA2"
                                                    className="label2"
                                                >
                                                    <span>Yes</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* health switch button style */}
                                    </div>
                                </div>
                            </div>

                            <div className="row my-3 d-none">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">
                                            Do you have any Professional Advisers
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={advisor} alt="" />
                                        </div>
                                        {/* health button style */}

                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter ">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="professionalAdviser"
                                                    id="professionalAdviser"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.professionalAdviser === "No"}
                                                />
                                                <label
                                                    htmlFor="professionalAdvisers"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="professionalAdviser"
                                                    id="professionalAdviser2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.professionalAdviser === "Yes"}
                                                />
                                                <label
                                                    htmlFor="professionalAdviser2"
                                                    className="label2"
                                                >
                                                    <span>Yes</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* health switch button style */}
                                    </div>
                                </div>
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
        </div >
    );
};

export default EstatePlanning;
