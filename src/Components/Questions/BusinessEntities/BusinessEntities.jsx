import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Business_building from "../svgs/building-small-svgrepo-com.svg";
import Business_TeamHandshake from "../svgs/team_Handshake.png";
import Business_SMSF from "../svgs/money-bag-svgrepo-com.svg";
import Questions_People from "../svgs/Questions_People.png";

import { useRecoilState, useRecoilValue } from "recoil";
import { QuestionShift, CRState, StepState, defaultUrl } from "../../../Store/Store";

import { NavLink, useNavigate } from "react-router-dom";
import { GetAxios, PatchAxios, PostAxios } from "../../Assets/Api/Api";

const BusinessEntities = (props) => {

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
                                                    src={Business_building}
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

                                <div className="row my-3">
                                    <div className="col-md-12 ">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Are you Running a business via a Trusts?{" "}
                                            </label>
                                            <div className="QuestionIcon">
                                                <img
                                                    className="img-fluid"
                                                    src={Business_TeamHandshake}
                                                    alt=""
                                                />
                                            </div>
                                            {/* switch button style */}
                                            <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                                                <div className="radiobutton">
                                                    <input
                                                        type="radio"
                                                        name="BusinessAsTrusts"
                                                        className="form-check-input"
                                                        id="BusinessAsTrusts1"
                                                        value="No"
                                                        onChange={handleChange}
                                                        checked={values.BusinessAsTrusts === "No"}
                                                    />
                                                    <label
                                                        htmlFor="BusinessAsTrusts1"
                                                        className="label1"
                                                    >
                                                        <span>No</span>
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        name="BusinessAsTrusts"
                                                        id="BusinessAsTrusts2"
                                                        className="form-check-input"
                                                        value="Yes"
                                                        onChange={handleChange}
                                                        checked={values.BusinessAsTrusts === "Yes"}
                                                    />
                                                    <label
                                                        htmlFor="BusinessAsTrusts2"
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

                                <div className="row my-3">
                                    <div className="col-md-12 ">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Do you have a Self Manged Super Fund(SMSF)?{" "}
                                            </label>
                                            <div className="QuestionIcon">
                                                <img
                                                    className="img-fluid"
                                                    src={Business_SMSF}
                                                    alt=""
                                                />
                                            </div>
                                            {/* switch button style */}
                                            <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                                                <div className="radiobutton">
                                                    <input
                                                        type="radio"
                                                        name="BusinessAsSMSF"
                                                        className="form-check-input"
                                                        id="BusinessAsSMSF1"
                                                        value="No"
                                                        onChange={handleChange}
                                                        checked={values.BusinessAsSMSF === "No"}
                                                    />
                                                    <label
                                                        htmlFor="BusinessAsSMSF1"
                                                        className="label1"
                                                    >
                                                        <span>No</span>
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        name="BusinessAsSMSF"
                                                        id="BusinessAsSMSF2"
                                                        className="form-check-input"
                                                        value="Yes"
                                                        onChange={handleChange}
                                                        checked={values.BusinessAsSMSF === "Yes"}
                                                    />
                                                    <label
                                                        htmlFor="BusinessAsSMSF2"
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

                                <div className="row my-3">
                                    <div className="col-md-12 ">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Do you have an Investment Trust?{" "}
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
                                                        name="BusinessAsInvestmentTrust"
                                                        className="form-check-input"
                                                        id="BusinessAsInvestmentTrust1"
                                                        value="No"
                                                        onChange={handleChange}
                                                        checked={values.BusinessAsInvestmentTrust === "No"}
                                                    />
                                                    <label
                                                        htmlFor="BusinessAsInvestmentTrust1"
                                                        className="label1"
                                                    >
                                                        <span>No</span>
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        name="BusinessAsInvestmentTrust"
                                                        id="BusinessAsInvestmentTrust2"
                                                        className="form-check-input"
                                                        value="Yes"
                                                        onChange={handleChange}
                                                        checked={values.BusinessAsInvestmentTrust === "Yes"}
                                                    />
                                                    <label
                                                        htmlFor="BusinessAsInvestmentTrust2"
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
