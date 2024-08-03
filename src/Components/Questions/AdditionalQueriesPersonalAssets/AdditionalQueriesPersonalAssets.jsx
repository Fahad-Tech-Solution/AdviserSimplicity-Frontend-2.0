import React, { useEffect, useState } from "react";
import "./AdditionalQueries.css";
import car from "../svgs/car.svg";
import boat from "../svgs/boat.svg";
import trailer from "../svgs/trailer-caravan.svg";
import settingMoney from "../svgs/settingMoney.svg";
import moneyGiving from "../svgs/moneyGiving.png";
import credit from "../svgs/credit-card-refund-svgrepo-com.svg";


import { useRecoilState, useRecoilValue } from "recoil";
import { CRState, defaultUrl } from "../../../Store/Store";
import { Form, Formik } from "formik";
import { GetAxios, PatchAxios, PostAxios } from "../../Assets/Api/Api";



const AdditionalQueriesPersonalAssets = (props) => {

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
        } catch (error) {
            console.error("Error submitting form:", error);
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
                    {({ values, handleChange }) => <Form>

                        <div className="col-md-12 text-center">
                            <h4 className="heading d-none">Income</h4>

                            <div className="row my-3">
                                <div className="col-md-12">
                                    <div className="mb-3 ">
                                        <label htmlFor="" className="form-label">
                                            Do you have Cars?
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={car} alt="" />
                                        </div>
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter ">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="cars"
                                                    id="cars1"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.cars === "No"}
                                                />
                                                <label
                                                    htmlFor="cars1"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="cars"
                                                    id="cars2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.cars === "Yes"}
                                                />
                                                <label
                                                    htmlFor="cars2"
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
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">
                                            Do you have a Boat?
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={boat} alt="" />
                                        </div>
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter ">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="boat"
                                                    id="boat1"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.boat === "No"}
                                                />
                                                <label
                                                    htmlFor="boat1"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="boat"
                                                    id="boat2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.boat === "Yes"}
                                                />
                                                <label
                                                    htmlFor="boat2"
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
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">
                                            Do you have a Caravan?
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={trailer} alt="" />
                                        </div>
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="caravan"
                                                    id="caravan1"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.caravan === "No"}
                                                />
                                                <label
                                                    htmlFor="caravan1"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="caravan"
                                                    id="caravan2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.caravan === "Yes"}
                                                />
                                                <label
                                                    htmlFor="caravan2"
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
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">
                                            Do you have any other Personal Assets?
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={settingMoney} alt="" />
                                        </div>
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="personalAssets"
                                                    id="personalAssets1"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.personalAssets === "No"}
                                                />
                                                <label
                                                    htmlFor="personalAssets1"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="personalAssets"
                                                    id="personalAssets2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.personalAssets === "Yes"}
                                                />
                                                <label
                                                    htmlFor="personalAssets2"
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
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">
                                            Do you have any Personal Loans?
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={moneyGiving} alt="" />
                                        </div>
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="personalLoans"
                                                    id="personalLoans1"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.personalLoans === "No"}
                                                />
                                                <label
                                                    htmlFor="personalLoans1"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="personalLoans"
                                                    id="personalLoans2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.personalLoans === "Yes"}
                                                />
                                                <label
                                                    htmlFor="personalLoans2"
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
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">
                                            Do you have any Credit Cards?
                                        </label>
                                        <div className="QuestionIcon">
                                            <img className="img-fluid" src={credit} alt="" />
                                        </div>
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 col-md-12 QuestionYesNoCenter">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="creditCards"
                                                    id="creditCards1"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={values.creditCards === "No"}
                                                />
                                                <label
                                                    htmlFor="creditCards1"
                                                    className="label1"
                                                >
                                                    <span>No</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="creditCards"
                                                    id="creditCards2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={values.creditCards === "Yes"}
                                                />
                                                <label
                                                    htmlFor="creditCards2"
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

                                            setQuestionChange("FinancialInvestments");
                                        }}
                                        className="float-end btn w-25  btn-outline  backBtn mx-3">
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

export default AdditionalQueriesPersonalAssets;
