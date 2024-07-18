import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import will from "../svgs/page-with-curl-svgrepo-com.svg";
import POA from "../svgs/conversation-person-svgrepo-com.svg";
import advisor from "../svgs/online-interview-male-svgrepo-com.svg";

import {
    faCircleInfo,
    faCircleQuestion,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import { useRecoilState } from "recoil";
import { QuestionShift, CRState } from "../../../Store/Store";
import { Form, Formik } from "formik";
const EstatePlanning = (props) => {

    let [CRObject, setCRObject] = useRecoilState(CRState);
    let [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);
    let onSubmit = (values) => {

        if (props.flagState) {
            props.setFlagState(false);
        }

        setCRObject(values);
        localStorage.setItem("QuestionsState", JSON.stringify(values));
        props.setQuestionChange(false);
        localStorage.setItem("Question", "SMSF");

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
                    {({ values, handleChange }) => <Form>
                        <div className="col-md-12 text-center">
                            <h4 className="heading d-none">Estate Planning & Professional Adviser</h4>

                            <div className="row my-3">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">
                                            Do you have a Will?
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

                            <div className="row my-3">
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

                            <div className="row my-3">
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
        </div>
    );
};

export default EstatePlanning;
