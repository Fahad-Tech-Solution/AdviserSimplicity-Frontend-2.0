import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import TermImg from "../svgs/TermDepositCanva.png";
import PortFolio from "../svgs/portfolio.svg";
import funds from "../svgs/funds.svg";
import analytics from "../svgs/analytics.png";
import investmentCircle from "../svgs/investmentCircle.png";
import property from "../svgs/property-value.svg";

import { useRecoilState, useRecoilValue } from "recoil";
import { QuestionShift, CRState, defaultUrl } from "../../../Store/Store";
import {
  GetAxios,
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
} from "../../Assets/Api/Api";
import { Image } from "react-bootstrap";
import DynamicQuestionBlocks from "../../Assets/DynamicQuestionBlocks/DynamicQuestionBlocks";
const QuestionsFamily = (props) => {
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
      title: "Term Deposits",
      img: TermImg,
      key: "familyTermDeposit",
    },
    {
      title: "Australian Shares/ETFs",
      img: PortFolio,
      key: "familyAustralianShare",
    },
    {
      title: "Platform Investments",
      img: funds,
      key: "familyMangedFunds",
    },
    {
      title: "Investment Loans",
      img: analytics,
      key: "familyInvestmentHomeLoan",
    },
    {
      title: "Investment Properties",
      img: property,
      key: "familyInvestmentProperties",
    },
    {
      title: "Other investments",
      img: investmentCircle,
      key: "familyOtherInvestment",
    },
  ];
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
                <h4 className="heading d-none">Family Trust Investment</h4>
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
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          left: 0,
                          behavior: "smooth",
                        });
                      }}
                      type="submit"
                      className="float-end btn w-25 bgColor modalBtn"
                    >
                      Next
                    </button>
                    <button
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          left: 0,
                          behavior: "smooth",
                        });
                        setQuestionChange("ProfessionalAdvisor");
                      }}
                      type="button"
                      className="float-end btn w-25  btn-outline  backBtn mx-3"
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

export default QuestionsFamily;
