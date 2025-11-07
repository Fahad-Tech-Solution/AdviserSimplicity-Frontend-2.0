import DynamicQuestionBlocks from "../../Assets/DynamicQuestionBlocks/DynamicQuestionBlocks";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CRState,
  defaultUrl,
  SelectedClientDetails,
} from "../../../Store/Store";

import Business_SMSF from "../svgs/money-bag-svgrepo-com.svg";
import Questions_People from "../svgs/Questions_People.png";

import Business_building from "../svgs/building-small-svgrepo-com.svg";
import Business_TeamHandshake from "../svgs/team_Handshake.png";

import insuranceProtection from "../svgs/insuranceProtection.png";
import propertyValue from "../svgs/property-value.svg";

import { Form, Formik } from "formik";
import {
  GetAxios,
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
} from "../../Assets/Api/Api";
import { useEffect, useState } from "react";
import { ConfigProvider, Spin } from "antd";

const ImportantQuestion = (props) => {
  let [CRObjectNoUse, setCRObject] = useRecoilState(CRState);
  let CRObject = useRecoilValue(CRState);
  let selectedClientDetails = useRecoilValue(SelectedClientDetails);
  const [loading, setLeading] = useState(false);
  let DefaultUrl = useRecoilValue(defaultUrl);

  let QuestionArray = [
    // {
    //   title: "Investment Properties",
    //   img: propertyValue,
    //   key: "investmentPropertyTab",
    // },
    {
      title: "Personal Insurance",
      img: insuranceProtection,
      key: "personalInsuranceTab",
    },
    {
      title: "A Company (Pty Ltd) structure to run a business",
      img: Business_building,
      key: "BusinessAsCompanyStructure",
    },
    {
      title: "A Trust structure to run a business",
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
  ];
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
    // Nav("/user/personal-income");
    props.flagState && props.setFlagState(false);
  };

  const onSubmit = async (values) => {
    let obj = JSON.parse(JSON.stringify(values));
    obj.clientFK = localStorage.getItem("UserID");

    try {
      if (!CRObject?._id) {
        // console.log("obj.clientFK", obj);
        const PostRes = await PostAxios(`${DefaultUrl}/api/questions/Add`, obj);
        if (PostRes) {
          // setFlagState(true);
          handleResponse(PostRes);
        }
      } else {
        const PatchRes = await PatchAxios(
          `${DefaultUrl}/api/questions/Update/${localStorage.getItem(
            "UserID"
          )}`,
          obj
        );
        if (PatchRes) {
          // setFlagState(true);
          handleResponse(PatchRes);
        }
      }

      // type, placement, message, description
      openNotificationSuccess(
        "success",
        "topRight",
        "Notification",
        "User Data Successfully Saved!"
      );
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    console.log("selectedClientDetails", selectedClientDetails);
    console.log("CRObject", CRObject);
    if (
      (!CRObject?._id && selectedClientDetails?._id) ||
      (selectedClientDetails._id !== CRObject.clientFK)
    ) {
      getQuestions(selectedClientDetails._id);
    }
  }, []);

  async function getQuestions(id) {
    setLeading(true);
    try {
      const res = await GetAxios(`${DefaultUrl}/api/questions/${id}`);
      if (res) {
        console.log("res", res);
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
      console.error("Error fetching questions:", error);
    } finally {
      setLeading(false);
    }
  }

  return (
    <div className="position-relative">
      {loading && (
        <div
          className="position-absolute top-0 d-flex justify-content-center align-items-center bg-gray"
          style={{
            width: "100%",
            height: "100%",
            zIndex: "1000",
          }}
        >
          <Spin size="large" />
        </div>
      )}
      <Formik
        initialValues={CRObject}
        onSubmit={onSubmit}
        enableReinitialize
        innerRef={props.formRef}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <div className="row px-5 mt-4">
              <div className="col-md-12 text-center ">
                <div className="row my-3 justify-content-center">
                  <DynamicQuestionBlocks
                    QuestionArray={QuestionArray}
                    QuestionClick={QuestionClick}
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ImportantQuestion;

// {props.Question ? Question : "Submit"}
