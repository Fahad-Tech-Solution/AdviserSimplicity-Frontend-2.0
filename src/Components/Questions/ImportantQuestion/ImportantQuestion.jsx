import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { scroller, Element } from 'react-scroll';
import DynamicQuestionBlocks from '../../Assets/DynamicQuestionBlocks/DynamicQuestionBlocks';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CRState, defaultUrl, QuestionDetail } from '../../../Store/Store';

import Business_SMSF from "../svgs/money-bag-svgrepo-com.svg";
import Questions_People from "../svgs/Questions_People.png";

import Business_building from "../svgs/building-small-svgrepo-com.svg";
import Business_TeamHandshake from "../svgs/team_Handshake.png";

import insuranceProtection from "../svgs/insuranceProtection.png";
import propertyValue from "../svgs/property-value.svg";

import { Form, Formik } from 'formik';
import { GetAxios, openNotificationSuccess, PatchAxios, PostAxios } from '../../Assets/Api/Api';

const ImportantQuestion = () => {

    let [CRObjectNoUse, setCRObject] = useRecoilState(CRState);
    let CRObject = useRecoilValue(CRState);
    let [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);

    let DefaultUrl = useRecoilValue(defaultUrl)


    useEffect(() => {
        // console.log("QuestionDetails Data condition :", Object.keys(questionDetail).length)



        if (questionDetail && Object.keys(questionDetail).length <= 0) {
            fetchDataAllInOne();
        }

        if (!CRObjectNoUse?._id) {
            FetchQuestions();
        }


    }, [])

    const FetchQuestions = async () => {
        try {
            const res = await GetAxios(`${DefaultUrl}/api/questions/${localStorage.getItem("UserID")}`);
            if (res) {
                setCRObject(res);
            }
        } catch (error) {
            setCRObject({
                //Financial Assets 
                QuestionsFlag: false,
                clientFK: "",

                bankAccountFinance: "No",
                termDepositsFinance: "No",
                australianShareMarket: "No",
                managedFund: "No",
                investmentBondFinance: "No",
                managedFundsLOC: "No",
                managedFundsMarginLoan: "No",

                car: "No",
                boat: "No",
                caravan: "No",
                houseHold: "No",
                otherAssets: "No",

                personalLoans: "No",

                creditCards: "No",

                familyHome: "No",
                familyHomeLoan: "No",
                numberOfHolidayHome: 0,

                investmentPropertyDetails: "No",
                investmentPropertyLoan: "No",
                incomeExpenses: "No",

                superAnnuationIssues: "No",
                accountBasedPensionIssues: "No",
                annuitiesIssues: "No",

                will: "No",
                POA: "No",
                professionalAdviser: "No",


                incomeFromOwnBusiness: "No",
                incomeFromSoleTrader: "No",
                incomeFromPartnership: "No",
                incomeFromCentrelink: "No",
                incomeFromSuperPayment: "No",
                incomeFromOverseasPension: "No",
                incomeFromInheritance: "No",
                incomeFromLumpsumExpense: "No",
                incomeFromRegularLivingExpenses: "Yes", // this one should be yes always

                BusinessAsCompanyStructure: "No",
                BusinessAsTrusts: "No",

                //keys which just controls rendering 
                investmentPropertyTab: "No",
                personalInsuranceTab: "No",

                // companyStructureBusinessTab: "No",
                // trustStructureBusinessTab: "No",

                SMSFManagedFundsTab: "No",
                businessAsInvestmentTab: "No",

                SMSFBank: "Yes",
                SMSFTermDeposits: "No",
                SMSFAustralianShares: "No",
                SMSFManagedFunds: "No",
                SMSFInvestmentLoan: "No",
                SMSFInvestmentProperties: "No",
                numberOfSMSFInvestmentProperties: 0,
                SMSFPensionPhase: "No",

                //loop keys
                // SMSFInvestmentPropertiesLoan
                // SMSFInvestmentExpenses

                SMSFDetails: "Yes", // this one should be yes always
                SMSFAccumulationDetails: "Yes", // this one should be yes always

                familyBank: "Yes", // this one should be yes always

                familyTermDeposit: "No",
                familyAustralianShare: "No",
                familyMangedFunds: "No",
                familyInvestmentHomeLoan: "No",
                familyInvestmentProperties: "No",
                numberOfFamilyInvestmentProperties: 0,
                familyPensionPhase: "No",

                //loop keys
                // familyInvestmentPropertiesLoan
                // familyInvestmentExpenses

                familyDetails: "Yes", // this one should be yes always


                life: "No",
                TPD: "No",
                trauma: "No",
                incomeProtection: "No",

            })
            console.error("Error fetching questions:", error);
        }
    };

    const fetchDataAllInOne = async () => {
        try {
            const res = await GetAxios(`${DefaultUrl}/api/dataOfAllSection/${localStorage.getItem("UserID")}`);
            console.log(JSON.stringify(res), ":res of get all inner Question Data")
            if (res) {
                setQuestionDetail(res);
                // setFlagState(true)
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };



    const formRef = useRef(null);  // Create a ref to store the form instance


    // let [flagState, setFlagState] = useState(false);


    let Nav = useNavigate();

    let CloseModal = () => {

        // setFlagState(false)
        let id = localStorage.getItem("UserID");

        if (id) {
            Nav("/PersonalDetail#" + id);
        }
        else {
            Nav("/PersonalDetail")
        }

    }


    let QuestionArray = [
        {
            title: "Investment Properties",
            img: propertyValue,
            key: "investmentPropertyTab",
        },
        {
            title: "Personal Insurance",
            img: insuranceProtection,
            key: "personalInsuranceTab",
        },
        {
            title: "A Company (Pty Ltd) Structure to run a business ",
            img: Business_building,
            key: "BusinessAsCompanyStructure",
        },
        {
            title: "A Trust Structure to run a business ",
            img: Business_TeamHandshake,
            key: "BusinessAsTrusts",
        },
        {
            title: "A Self-Managed Super Fund",
            img: Business_SMSF,
            key: "SMSFManagedFundsTab",
        },
        {
            title: "An Investment Family Trust ",
            img: Questions_People,
            key: "businessAsInvestmentTab",
        },

    ]
    const QuestionClick = (index, elem, values, setFieldValue) => {

        if (values[elem.key] == "No") {
            setFieldValue(elem.key, "Yes");
        }
        if (values[elem.key] == "Yes") {
            setFieldValue(elem.key, "No");
        }
    };

    const handleResponse = (values) => {
        setCRObject(values);
        localStorage.setItem("QuestionsState", JSON.stringify(values));
        localStorage.setItem("Question", "PersonalAssets");
        Nav("/PersonalIncome");
    };

    const onSubmit = async (values) => {
        let obj = JSON.parse(JSON.stringify(values));
        obj.clientFK = localStorage.getItem("UserID");

        try {
            if (!CRObject?._id) {
                const PostRes = await PostAxios(`${DefaultUrl}/api/questions/Add`, obj);
                if (PostRes) {
                    // setFlagState(true);
                    handleResponse(PostRes);
                }
            } else {
                const PatchRes = await PatchAxios(`${DefaultUrl}/api/questions/Update/${localStorage.getItem("UserID")}`, obj);
                if (PatchRes) {
                    // setFlagState(true);
                    handleResponse(PatchRes);
                }
            }


            // type, placement, message, description
            openNotificationSuccess("success", 'topRight', "Notification", "User Data Successfully Saved!")
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div>
            <Formik
                initialValues={CRObject}
                onSubmit={onSubmit}
                enableReinitialize
                innerRef={formRef}
            >
                {({ values, handleChange, setFieldValue }) => (
                    <Form>
                        <div className="row px-5 mt-4">
                            <div className="col-md-12 text-center ">
                                <div className="row my-3 justify-content-center">
                                    <DynamicQuestionBlocks QuestionArray={QuestionArray} QuestionClick={QuestionClick} values={values} setFieldValue={setFieldValue} />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <div className='d-flex justify-content-center'>

                                    <button
                                        onClick={CloseModal}
                                        type='button'
                                        className="float-center btn w-25  btn-outline  backBtn mx-3">
                                        Back
                                    </button>
                                    <button
                                        type='submit'
                                        className="float-center btn w-25  bgColor modalBtn"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ImportantQuestion

// {props.Question ? Question : "Submit"}