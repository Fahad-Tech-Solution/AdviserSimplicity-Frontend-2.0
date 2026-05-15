import { Form, Formik } from "formik";
import React from "react";
import DynamicQuestionBlocks from "../Assets/DynamicQuestionBlocks/DynamicQuestionBlocks";

import Home from "../../Components/Questions/svgs/home-svgrepo-com.svg";
import Loan from "../../Components/Questions/svgs/loan.svg";
import Insurance from "../../Components/Questions/svgs/insurance.png";
import Pig1 from "../../Components/Questions/svgs/piggy-bank.png";
import Time from "../../Components/Questions/svgs/time-is-money.svg";
import Gear from "../../Components/Questions/svgs/gears-gear-svgrepo-com.svg";
import Investing from "../../Components/Questions/svgs/portfolio.svg";
import Bill from "../../Components/Questions/svgs/bill.png";
import Payless from "../../Components/Questions/svgs/taxCutting.png";
import Inheritance from "../../Components/Questions/svgs/inheritance.png";
import medical from "../../Components/Questions/svgs/medical-insurance-svgrepo-com.svg";
import moneyBag from "../../Components/Questions/svgs/money-bag-svgrepo-com.svg";

const CDFForm = (props) => {
  let QuestionArray = [
    {
      key: "buyAProperty",
      title: "Buy A Property",
      img: Home,
    },
    {
      key: "payOffHomeLoan",
      title: "Pay Off The Home Loan",
      img: Loan,
    },
    {
      key: "incomeProtectionInsurance",
      title: "Life & Income Protection Insurance",
      img: Insurance,
    },
    {
      key: "buildSuperannuation",
      title: "Build Up Super",

      img: Pig1,
    },
    {
      key: "retirementPlanning",
      title: "Plan For Retirement",
      img: Time,
    },
    {
      key: "centreLinkEligibility",
      title: "Eligibility To Centrelink",
      img: Gear,
    },
    {
      key: "investing",
      title: "Investing Money",
      img: Investing,
    },
    {
      key: "moneyManagement",
      title: "Manage Our Money And Finances Better",
      img: Bill,
    },
    {
      key: "taxMinimization",
      title: "Pay Less Tax",
      img: Payless,
    },
    {
      key: "inheritancePlanning",
      title: "An Inheritance",
      img: Inheritance,
    },
    {
      key: "agedCare",
      title: "Aged Care",
      img: medical,
    },
    {
      key: "selfManagedSuperFund",
      title: "Self Managed Super Fund",
      img: moneyBag,
    },
  ];

  const QuestionClick = (index, elem, values, setFieldValue) => {
    // if (values[elem.key] == "No") {
    //   setFieldValue(elem.key, "Yes");
    // }
    // if (values[elem.key] == "Yes") {
    //   setFieldValue(elem.key, "No");
    // }
  };

  return (
    <Formik
      initialValues={props?.modalObject?.row?.areaOfAdvice || {}}
      onSubmit={() => {
        if (props.flagState) {
          props.setFlagState(false);
        }
      }}
      innerRef={props.formRef}
    >
      {({ setValues, setFieldValue, values, handleChange }) => {
        return (
          <Form className="w-100">
            <div className="row px-5 mt-4">
              <h3 className="text-center text-green">Area of Advice Needed</h3>

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
        );
      }}
    </Formik>
  );
};

export default CDFForm;
