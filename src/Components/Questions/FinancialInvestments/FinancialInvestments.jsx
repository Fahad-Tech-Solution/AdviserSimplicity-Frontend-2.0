import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import BankImg from "../svgs/bank.svg";
import TermImg from "../svgs/TermDepositCanva.png";
import PortFolio from "../svgs/portfolio.svg";
import certificate from "../svgs/certificate.svg";
import funds from "../svgs/funds.svg";
import loan from "../svgs/loan.svg";
import analytics from "../svgs/analytics.png";
// Super Anutes 
import piggybank1 from "../svgs/piggy-bank.svg";
import piggybank2 from "../svgs/piggy-bank-new.svg";
import calender from "../svgs/calendar.png";
// Investment 
import property from "../svgs/property-value.svg";

import { useRecoilState, useRecoilValue } from "recoil";
import { CRState, defaultUrl } from "../../../Store/Store";
import { GetAxios, openNotificationSuccess, PatchAxios, PostAxios } from '../../Assets/Api/Api';

import DynamicQuestionBlocks from '../../Assets/DynamicQuestionBlocks/DynamicQuestionBlocks';



const FinancialInvestments = (props) => {


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
        if (CRObject._id) {
            setFlagState(true);
        }
        else {
            FetchQuestions();
        }
    }, []);

    const handleResponse = (values) => {
        setCRObject(values);
        localStorage.setItem("QuestionsState", JSON.stringify(values));
        props.setQuestionChange(false);
        localStorage.setItem("Question", "PersonalAssets");
    };

    const onSubmit = async (values) => {
        values.clientFK = localStorage.getItem("UserID");
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
            title: "Bank Accounts",
            img: BankImg,
            key: "bankAccountFinance",
        },
        {
            title: "Term Deposits",
            img: TermImg,
            key: "termDepositsFinance",
        },
        {
            title: "Australian Shares/ETFs",
            img: PortFolio,
            key: "australianShareMarket",
        },
        {
            title: "Platform Investments",
            img: funds,
            key: "managedFund",
        },
        {
            title: "Investment Bonds",
            img: loan,
            key: "managedFundsLOC",
        },
        // Questions of SMS 
        {
            title: "Superannuation",
            img: piggybank1,
            key: "superAnnuationIssues",
        },
        {
            title: "Account Based Pensions",
            img: piggybank2,
            key: "accountBasedPensionIssues",
        },
        {
            title: "Annuities",
            img: calender,
            key: "annuitiesIssues",
        },
        // One Question of Investment
        {
            title: "Investment Properties",
            img: property,
            key: "investmentPropertyDetails",
        },
        {
            title: "Investment Loans",
            img: certificate,
            key: "investmentBondFinance",
        },
        {
            title: "Margin Loans",
            img: analytics,
            key: "managedFundsMarginLoan",
        },

        // Questions of SMS 




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
                            <div className="row my-3 justify-content-center">
                                <DynamicQuestionBlocks QuestionArray={QuestionArray} QuestionClick={QuestionClick} values={values} setFieldValue={setFieldValue} />



                                <div className="col-md-12 d-none">
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

                            <div className="row my-3 d-none">
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


                            <div className="row my-3 d-none">
                                <div className="col-md-12">
                                    <div className="mb-3 ">
                                        <label htmlFor="" className="form-label">
                                            Do you have any Money invested in Australian Shares?
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


                            <div className="row my-3 d-none">
                                <div className="col-md-12">
                                    <div className="mb-3 ">
                                        <label htmlFor="" className="form-label">
                                            Do you have any Money invested  Managed Funds or via a Platform?
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

                            <div className="row my-3 d-none">
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

                            <div className="row my-3 d-none">
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

                            <div className="row my-3 d-none">
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
