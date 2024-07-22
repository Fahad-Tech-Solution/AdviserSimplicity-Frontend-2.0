import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Questions_People from "../svgs/Questions_People.png";
import Questions_loan from "../svgs/loan.svg";
import Questions_Bank from "../svgs/property-value.svg";
import QuestionMoney from "../svgs/QuestionMoney.jpg";

import { useRecoilState } from "recoil";
import { QuestionShift, CRState, StepState } from "../../../Store/Store";

import { NavLink, useNavigate } from "react-router-dom";

const BusinessEntities = (props) => {
    let [CRObject, setCRObject] = useRecoilState(CRState);
    let [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);
    let [Steps, setSteps] = useRecoilState(StepState);

    let Navigation = useNavigate();

    let onSubmit = (values) => {


        if (props.flagState) {
            props.setFlagState(false);
        }


        setCRObject(values);
        localStorage.setItem("QuestionsState", JSON.stringify(values));
        props.setQuestionChange(false);
        // setQuestionChange("QuestionCards");
        // localStorage.setItem("Question", "QuestionCards");


        // setSteps(2);
        // localStorage.setItem("Steps", 2);
        // setCRObject(values);
        // localStorage.setItem("QuestionsState", JSON.stringify(values));
        // Navigation("/Business-Tax-Structure");
        // localStorage.removeItem("Question");
    };

    return (
        <div className="container-fluid my-4">
            <div className="row m-0">
                <Formik
                    initialValues={CRObject}
                    onSubmit={onSubmit}
                    enableReinitialize
                    innerRef={props.formRef}
                >
                    {({ values, handleChange }) => (
                        <Form>
                            <div className="col-md-12 text-center">
                                <h4 className="heading d-none">Investment Trust</h4>
                                <div className="row my-3">
                                    <div className="col-md-12 ">
                                        <div className="mb-3">
                                            <label className="form-label">
                                            Are you Running a business  a Company Structure (Pty Ltd)?{" "}
                                            </label>
                                            <div className="QuestionIcon">
                                                <img
                                                    className="img-fluid"
                                                    src={Questions_People}
                                                    alt=""
                                                />
                                            </div>
                                            {/* switch button style */}
                                            <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                                                <div className="radiobutton">
                                                    <input
                                                        type="radio"
                                                        name="BusinessAsCompanyStructure"
                                                        className="form-check-input"
                                                        id="BusinessAsCompanyStructure1"
                                                        value="No"
                                                        onChange={handleChange}
                                                        checked={values.BusinessAsCompanyStructure === "No"}
                                                    />
                                                    <label
                                                        htmlFor="BusinessAsCompanyStructure1"
                                                        className="label1"
                                                        onClick={() => {
                                                            handleChange({ target: { name: "ITTermSharesManaged", value: "No", } });
                                                            handleChange({ target: { name: "ITInvestmentLoans", value: "No", } });
                                                            handleChange({ target: { name: "ITDirectProperty", value: "No", } });
                                                        }}
                                                    >
                                                        <span>No</span>
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        name="BusinessAsCompanyStructure"
                                                        id="BusinessAsCompanyStructure2"
                                                        className="form-check-input"
                                                        value="Yes"
                                                        onChange={handleChange}
                                                        checked={values.BusinessAsCompanyStructure === "Yes"}
                                                    />
                                                    <label
                                                        htmlFor="BusinessAsCompanyStructure2"
                                                        className="label2"
                                                    >
                                                        <span>Yes</span>
                                                    </label>
                                                </div>
                                            </div>
                                            {/* switch button style */}
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-2 d-none">
                                    <div className="col-md-12">
                                        <button
                                            type="submit"
                                            onClick={() => {

                                            }}
                                            className="float-end btn w-25  bgColor modalBtn"
                                        >
                                            Next
                                        </button>
                                        <button className="float-end btn w-25  btn-outline  backBtn mx-3"
                                            onClick={() => {

                                                setQuestionChange("SMSF")
                                            }}
                                        >
                                            Back
                                        </button>
                                    </div>
                                </div>

                                {/*end children details form */}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default BusinessEntities;
