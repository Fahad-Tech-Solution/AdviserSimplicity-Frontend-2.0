import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'

// import React from "react";

import Businessman from "../svgs/businessman.svg";
import businessIncome from "../svgs/business-income.png";
import businessPartnership from "../svgs/businessPartnership.png";
import Gears from "../svgs/gears-gear-svgrepo-com.svg";
import money from "../svgs/money-3.svg";
import overseas from "../svgs/overseas.svg";
import inheritance from "../svgs/inheritance.png";
import moneyBag from "../svgs/money-bag-svgrepo-com.svg";

import { useRecoilState } from "recoil";
import { QuestionShift, CRState } from "../../../Store/Store";

const PersonalIncome = (props) => {

    let [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);
    let [CRObject, setCRObject] = useRecoilState(CRState);
    let [flagState, setFlagState] = useState(false);


    let onSubmit = (values) => {

        if (props.flagState) {
            props.setFlagState(false);
        }

        setCRObject(values);
        localStorage.setItem("QuestionsState", JSON.stringify(values));
        props.setQuestionChange(false);
        localStorage.setItem("Question", "PersonalAssets");

        console.log("what to do");

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


                            <div className="row my-3">
                                <div className="col-md-12">
                                    <div className="mb-3 ">
                                        <label htmlFor="incomeFromOwnBusiness" className="form-label">
                                            Are you recieving any Income from employement (including from your own company)?
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={Businessman} alt="" />
                                        </div>
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter ">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="incomeFromOwnBusiness"
                                                    id="incomeFromOwnBusiness"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.incomeFromOwnBusiness === "No"}
                                                />
                                                <label
                                                    htmlFor="incomeFromOwnBusiness"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="incomeFromOwnBusiness"
                                                    id="incomeFromOwnBusiness2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.incomeFromOwnBusiness === "Yes"}
                                                />
                                                <label
                                                    htmlFor="incomeFromOwnBusiness2"
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
                                <div className="col-md-12">
                                    <div className="mb-3 ">
                                        <label htmlFor="" className="form-label">
                                            Are you recieving any Business Income as a Sole Trader?
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={businessIncome} alt="" />
                                        </div>
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter ">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="incomeFromSoleTrader"
                                                    id="incomeFromSoleTrader"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.incomeFromSoleTrader === "No"}
                                                />
                                                <label
                                                    htmlFor="incomeFromSoleTrader"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="incomeFromSoleTrader"
                                                    id="incomeFromSoleTrader2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.incomeFromSoleTrader === "Yes"}
                                                />
                                                <label
                                                    htmlFor="incomeFromSoleTrader2"
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
                                <div className="col-md-12">
                                    <div className="mb-3 ">
                                        <label htmlFor="" className="form-label">
                                            Are you receiving any Business Income from a Partnership?
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={businessPartnership} alt="" />
                                        </div>
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter ">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="incomeFromPartnership"
                                                    id="incomeFromPartnership"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.incomeFromPartnership === "No"}
                                                />
                                                <label
                                                    htmlFor="incomeFromPartnership"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="incomeFromPartnership"
                                                    id="incomeFromPartnership2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.incomeFromPartnership === "Yes"}
                                                />
                                                <label
                                                    htmlFor="incomeFromPartnership2"
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
                                <div className="col-md-12">
                                    <div className="mb-3 ">
                                        <label htmlFor="" className="form-label">
                                            Are you receiving any Centerlink Payments (including FTBA & B or any Health Care Cards)?
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={Gears} alt="" />
                                        </div>
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter ">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="incomeFromCentrelink"
                                                    id="incomeFromCentrelink"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.incomeFromCentrelink === "No"}
                                                />
                                                <label
                                                    htmlFor="incomeFromCentrelink"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="incomeFromCentrelink"
                                                    id="incomeFromCentrelink2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.incomeFromCentrelink === "Yes"}
                                                />
                                                <label
                                                    htmlFor="incomeFromCentrelink2"
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
                                <div className="col-md-12">
                                    <div className="mb-3 ">
                                        <label htmlFor="" className="form-label">
                                            Are you receiving any other Regular Lifetime/Defined Benefit Super payments?
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={money} alt="" />
                                        </div>
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter ">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="incomeFromSuperPayment"
                                                    id="incomeFromSuperPayment"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.incomeFromSuperPayment === "No"}
                                                />
                                                <label
                                                    htmlFor="incomeFromSuperPayment"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="incomeFromSuperPayment"
                                                    id="incomeFromSuperPayment2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.incomeFromSuperPayment === "Yes"}
                                                />
                                                <label
                                                    htmlFor="incomeFromSuperPayment2"
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
                                <div className="col-md-12">
                                    <div className="mb-3 ">
                                        <label htmlFor="" className="form-label">
                                            Are you receiving any Overseas Pension?
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={overseas} alt="" />
                                        </div>
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter ">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="incomeFromOverseasPension"
                                                    id="incomeFromOverseasPension"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.incomeFromOverseasPension === "No"}
                                                />
                                                <label
                                                    htmlFor="incomeFromOverseasPension"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="incomeFromOverseasPension"
                                                    id="incomeFromOverseasPension2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.incomeFromOverseasPension === "Yes"}
                                                />
                                                <label
                                                    htmlFor="incomeFromOverseasPension2"
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
                                <div className="col-md-12">
                                    <div className="mb-3 ">
                                        <label htmlFor="" className="form-label">
                                            Are you Expecting any Inheritance?
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={inheritance} alt="" />
                                        </div>
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter ">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="incomeFromInheritance"
                                                    id="incomeFromInheritance"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.incomeFromInheritance === "No"}
                                                />
                                                <label
                                                    htmlFor="incomeFromInheritance"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="incomeFromInheritance"
                                                    id="incomeFromInheritance2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.incomeFromInheritance === "Yes"}
                                                />
                                                <label
                                                    htmlFor="incomeFromInheritance2"
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
                                <div className="col-md-12">
                                    <div className="mb-3 ">
                                        <label htmlFor="" className="form-label">
                                            Do you have any one off lumpsum expenses?
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={moneyBag} alt="" />
                                        </div>
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter ">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="incomeFromLumpsumExpense"
                                                    id="incomeFromLumpsumExpense"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.incomeFromLumpsumExpense === "No"}
                                                />
                                                <label
                                                    htmlFor="incomeFromLumpsumExpense"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="incomeFromLumpsumExpense"
                                                    id="incomeFromLumpsumExpense2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.incomeFromLumpsumExpense === "Yes"}
                                                />
                                                <label
                                                    htmlFor="incomeFromLumpsumExpense2"
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
                                        onClick={() => {

                                        }}
                                        type="submit"
                                        className="float-end btn w-25  bgColor modalBtn"
                                    >
                                        Next
                                    </button>
                                    <button
                                        onClick={() => {

                                        }}
                                        className="float-end btn w-25  btn-outline  backBtn mx-3 d-none">
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
}

export default PersonalIncome
