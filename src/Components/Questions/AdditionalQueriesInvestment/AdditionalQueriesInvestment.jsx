import React, { useEffect, useState } from "react";
import "./AdditionalQueries.css";

import bank from "../svgs/bank.svg";
import property from "../svgs/property-value.svg";
import loan from "../svgs/loan.svg";
import rent from "../svgs/rent.svg";

import { useRecoilState, useRecoilValue } from "recoil";
import { QuestionShift, CRState, defaultUrl } from "../../../Store/Store";
import { Form, Formik } from "formik";
import { GetAxios, openNotificationSuccess, PatchAxios, PostAxios } from "../../Assets/Api/Api";
import { Image } from "react-bootstrap";
import DynamicQuestionBlocks from "../../Assets/DynamicQuestionBlocks/DynamicQuestionBlocks";

const AdditionalQueriesInvestment = (props) => {


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

        will: "Yes",
        POA: "Yes",
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

        SMSFOtherInvestment: "No",
        familyOtherInvestment: "No",

        //loop keys
        // familyInvestmentPropertiesLoan
        // familyInvestmentExpenses

        familyDetails: "Yes", // this one should be yes always

        life: "Yes",
        TPD: "Yes",
        trauma: "Yes",
        incomeProtection: "Yes",
      });
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
      openNotificationSuccess("success", "topRight", "Success Notification", "Data of \"" + props.modalObject.title + "\" is Saved");
    } catch (error) {
      console.error("Error submitting form:", error);
      openNotificationSuccess("error", "topRight", "Error Notification", "Data of \"" + props.modalObject.title + "\" is not Saved Please! try again");
    }
  };

  let QuestionArray = [
    {
      title: "Investment Property Details?",
      img: property,
      key: "investmentPropertyDetails",
    },
    {
      title: "Investment Property Loan?",
      img: loan,
      key: "investmentPropertyLoan",
    },
    {
      title: " Income & Expense?",
      img: rent,
      key: "incomeExpenses",
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
    <div className="container-fluid my-4">
      <div className="row m-0">
        <Formik
          initialValues={CRObject}
          onSubmit={onSubmit}
          enableReinitialize
          innerRef={props.formRef}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <div className="col-md-12 text-center">

                <h4 className="heading d-none">Investment</h4>

                <div className="row my-3 justify-content-center">
                  <DynamicQuestionBlocks QuestionArray={QuestionArray} QuestionClick={QuestionClick} values={values} setFieldValue={setFieldValue} />


                  <div className="col-md-12 d-none">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Investment Property Details?
                      </label>
                      <div className="QuestionIcon">
                        <img className="img-fluid" src={property} alt="" />
                      </div>
                      {/* health button style */}

                      <div className="form-check form-switch m-0 p-0 float-center col-md-12 QuestionYesNoCenter">
                        <div className="radiobutton">
                          <input
                            type="radio"
                            name="investmentPropertyDetails"
                            id="investmentPropertyDetails1"
                            value="No"
                            onChange={handleChange}
                            checked={values.investmentPropertyDetails === "No"}
                          />
                          <label
                            htmlFor="investmentPropertyDetails1"
                            className="label1"
                          >
                            <span>No</span>
                          </label>
                          <input
                            type="radio"
                            name="investmentPropertyDetails"
                            id="investmentPropertyDetails2"
                            value="Yes"
                            onChange={handleChange}
                            checked={values.investmentPropertyDetails === "Yes"}
                          />
                          <label
                            htmlFor="investmentPropertyDetails2"
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
                        Investment Property Loan?
                      </label>
                      <div className="QuestionIcon">
                        <img className="img-fluid" src={loan} alt="" />
                      </div>
                      {/* health button style */}

                      <div className="form-check form-switch m-0 p-0 float-center col-md-12 QuestionYesNoCenter">
                        <div className="radiobutton">
                          <input
                            type="radio"
                            name="investmentPropertyLoan"
                            id="investmentPropertyLoan1"
                            value="No"
                            onChange={handleChange}
                            checked={values.investmentPropertyLoan === "No"}
                          />
                          <label
                            htmlFor="investmentPropertyLoan1"
                            className="label1"
                          >
                            <span>No</span>
                          </label>
                          <input
                            type="radio"
                            name="investmentPropertyLoan"
                            id="investmentPropertyLoan2"
                            value="Yes"
                            onChange={handleChange}
                            checked={values.investmentPropertyLoan === "Yes"}
                          />
                          <label
                            htmlFor="investmentPropertyLoan2"
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
                        Income & Expense?
                      </label>
                      <div className="QuestionIcon">
                        <img className="img-fluid" src={rent} alt="" />
                      </div>
                      {/* health button style */}

                      <div className="form-check form-switch m-0 p-0 float-center col-md-12 QuestionYesNoCenter">
                        <div className="radiobutton">
                          <input
                            type="radio"
                            name="incomeExpenses"
                            id="incomeExpenses1"
                            value="No"
                            onChange={handleChange}
                            checked={values.incomeExpenses === "No"}
                          />
                          <label
                            htmlFor="incomeExpenses1"
                            className="label1"
                          >
                            <span>No</span>
                          </label>
                          <input
                            type="radio"
                            name="incomeExpenses"
                            id="incomeExpenses2"
                            value="Yes"
                            onChange={handleChange}
                            checked={values.incomeExpenses === "Yes"}
                          />
                          <label
                            htmlFor="incomeExpenses2"
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
                    <button type="button" className="float-end btn w-25  btn-outline  backBtn mx-3"
                      onClick={() => {

                        setQuestionChange("Lifestyle")
                      }}
                    >
                      Back
                    </button>
                  </div>
                </div>

              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdditionalQueriesInvestment;
