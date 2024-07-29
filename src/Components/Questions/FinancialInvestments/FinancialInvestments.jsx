import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'

// import React from "react";

// import "./AdditionalQueries.css";
import BankImg from "../svgs/bank.svg";
import TermImg from "../svgs/Chart.jpg";
import PortFolio from "../svgs/portfolio.svg";
import certificate from "../svgs/certificate.svg";
import funds from "../svgs/funds.svg";
import loan from "../svgs/loan.svg";
import analytics from "../svgs/analytics.png";
import Add from "../svgs/add-circle-solid-svgrepo-com.svg";
import { useRecoilState } from "recoil";
import { QuestionShift, CRState } from "../../../Store/Store";
import { Element, scroller } from 'react-scroll';



const FinancialInvestments = (props) => {

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
                                        <label htmlFor="" className="form-label">
                                            Do you have any Money in Bank Accounts?
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={BankImg} alt="" />
                                        </div>
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter ">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="bankAccountFinance"
                                                    id="bankAccountFinance"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.bankAccountFinance === "No"}
                                                />
                                                <label
                                                    htmlFor="bankAccountFinance"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="bankAccountFinance"
                                                    id="bankAccountFinance2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.bankAccountFinance === "Yes"}
                                                />
                                                <label
                                                    htmlFor="bankAccountFinance2"
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
                                            Do you have any Money invested in Term Deposits?
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={TermImg} alt="" />
                                        </div>
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter ">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="termDepositsFinance"
                                                    id="termDepositsFinance"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.termDepositsFinance === "No"}
                                                />
                                                <label
                                                    htmlFor="termDepositsFinance"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="termDepositsFinance"
                                                    id="termDepositsFinance2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.termDepositsFinance === "Yes"}
                                                />
                                                <label
                                                    htmlFor="termDepositsFinance2"
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
                                            Do you have any Money in Australian Shares?
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={PortFolio} alt="" />
                                        </div>
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter ">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="australianShareMarket"
                                                    id="australianShareMarket"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.australianShareMarket === "No"}
                                                />
                                                <label
                                                    htmlFor="australianShareMarket"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="australianShareMarket"
                                                    id="australianShareMarket2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.australianShareMarket === "Yes"}
                                                />
                                                <label
                                                    htmlFor="australianShareMarket2"
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
                                            Do you have any Money in Managed Funds?
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={funds} alt="" />
                                        </div>
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter ">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="managedFund"
                                                    id="managedFund"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.managedFund === "No"}
                                                />
                                                <label
                                                    htmlFor="managedFund"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="managedFund"
                                                    id="managedFund2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.managedFund === "Yes"}
                                                />
                                                <label
                                                    htmlFor="managedFund2"
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
                                            Do you have any Money in an Investment Bond?
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={certificate} alt="" />
                                        </div>
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter ">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="investmentBondFinance"
                                                    id="investmentBondFinance"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.investmentBondFinance === "No"}
                                                />
                                                <label
                                                    htmlFor="investmentBondFinance"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="investmentBondFinance"
                                                    id="investmentBondFinance2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.investmentBondFinance === "Yes"}
                                                />
                                                <label
                                                    htmlFor="investmentBondFinance2"
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
                                            Do you have a Investment Loan (LOC)  attached to your shares of Managed Funds?
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={loan} alt="" />
                                        </div>
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter ">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="managedFundsLOC"
                                                    id="managedFundsLOC"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.managedFundsLOC === "No"}
                                                />
                                                <label
                                                    htmlFor="managedFundsLOC"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="managedFundsLOC"
                                                    id="managedFundsLOC2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.managedFundsLOC === "Yes"}
                                                />
                                                <label
                                                    htmlFor="managedFundsLOC2"
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
                                            Do you have a Margin Loan attached to your shares of Managed Funds?
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={analytics} alt="" />
                                        </div>
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter ">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="managedFundsMarginLoan"
                                                    id="managedFundsMarginLoan"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.managedFundsMarginLoan === "No"}
                                                />
                                                <label
                                                    htmlFor="managedFundsMarginLoan"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="managedFundsMarginLoan"
                                                    id="managedFundsMarginLoan2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.managedFundsMarginLoan === "Yes"}
                                                />
                                                <label
                                                    htmlFor="managedFundsMarginLoan2"
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

export default FinancialInvestments
