import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Business_building from "../svgs/building-small-svgrepo-com.svg";
import Business_TeamHandshake from "../svgs/team_Handshake.png";
import Business_SMSF from "../svgs/money-bag-svgrepo-com.svg";
import Questions_People from "../svgs/Questions_People.png";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  QuestionShift,
  CRState,
  StepState,
  defaultUrl,
} from "../../../Store/Store";

import { NavLink, useNavigate } from "react-router-dom";
import {
  GetAxios,
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
} from "../../Assets/Api/Api";
import { Image } from "react-bootstrap";
import DynamicQuestionBlocks from "../../Assets/DynamicQuestionBlocks/DynamicQuestionBlocks";

const BusinessEntities = (props) => {
  let [CRObject, setCRObject] = useRecoilState(CRState);

  const [flagState, setFlagState] = useState(false);

  let DefaultUrl = useRecoilValue(defaultUrl);

  const FetchQuestions = async () => {
    try {
      const res = await GetAxios(
        `${DefaultUrl}/api/questions/${localStorage.getItem("UserID")}`
      );
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

        life: "No",
        TPD: "No",
        trauma: "No",
        incomeProtection: "No",
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
        const PostRes = await PostAxios(
          `${DefaultUrl}/api/questions/Add`,
          values
        );
        if (PostRes) {
          if (props.flagState) {
            props.setFlagState(false);
          }
          handleResponse(values);
        }
      } else {
        const PatchRes = await PatchAxios(
          `${DefaultUrl}/api/questions/Update/${localStorage.getItem(
            "UserID"
          )}`,
          values
        );
        if (PatchRes) {
          if (props.flagState) {
            props.setFlagState(false);
          }
          handleResponse(values);
        }
      }
      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        'Data of "' + props.modalObject.title + '" is Saved'
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        'Data of "' +
          props.modalObject.title +
          '" is not Saved Please! try again'
      );
    }
  };

  let QuestionArray = [
    {
      title: "Trading Company",
      img: Business_building,
      key: "BusinessAsCompanyStructure",
    },
    {
      title: "Business Trust",
      img: Business_TeamHandshake,
      key: "BusinessAsTrusts",
    },
  ];
  const QuestionClick = (index, elem, values, setFieldValue) => {
    // // console.log("image clicked in goals", index, elem.key, values);
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
                <h4 className="heading d-none">Investment Trust</h4>
                <div className="row my-3 justify-content-center">
                  <DynamicQuestionBlocks
                    QuestionArray={QuestionArray}
                    QuestionClick={QuestionClick}
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                </div>

                <div className="row mt-2 d-none">
                  <div className="col-md-12">
                    <button
                      type="submit"
                      onClick={() => {}}
                      className="float-end btn w-25  bgColor modalBtn"
                    >
                      Next
                    </button>
                    <button
                      className="float-end btn w-25  btn-outline  backBtn mx-3"
                      onClick={() => {
                        setQuestionChange("SMSF");
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
