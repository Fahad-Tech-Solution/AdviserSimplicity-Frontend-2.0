import React, { useState } from "react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import { ConfigProvider } from "antd";
import CashFlowReportOptions from "../CashFlowOptions/CashFlowReportOptions";
import CashReport from "./TableReports/CashReport";
import AssetLiabilitiesReport from "./TableReports/AssetLiabilitiesReport";
import FinancialInvestmentsReport from "./TableReports/FinancialInvestmentsReport";
import BusinessReport from "./TableReports/BusinessReport";
import { useRecoilValue } from "recoil";
import { ReportsData } from "../../Store/Store";
import FamilyTrustReport from "./TableReports/FamilyTrustReport";
import SMSFReport from "./TableReports/SMSFReport";
import IncomeExpensesReports from "./TableReports/IncomeExpensesReports";

const CashFlowReport = () => {
  const initialValues = { category: "" };
  const [step, setStep] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const reportSections = useRecoilValue(ReportsData);

  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
        enableReinitialize
      >
        {({ values, setFieldValue, handleChange, handleBlur }) => (
          <Form>
            <div name="topSection">
              <CashFlowReportOptions step={step} setStep={setStep} />
            </div>

            <ConfigProvider
              theme={{
                token: { colorPrimary: "#36b446", colorLink: "#36b446" },
              }}
            >
              <div className="px-0 px-md-4 reportSection">
                {step === 0 && (
                  <CashReport
                    {...{
                      showFilters,
                      setShowFilters,
                      values,
                      setFieldValue,
                      handleChange,
                      handleBlur,
                    }}
                    {...reportSections}
                  />
                )}
{/* 
                {step === 0 && (
                  <IncomeExpensesReports
                    {...{
                      showFilters,
                      setShowFilters,
                      values,
                      setFieldValue,
                      handleChange,
                      handleBlur,
                    }}
                    {...reportSections}
                  />
                )} */}
                {step === 1 && (
                  <AssetLiabilitiesReport
                    {...{
                      showFilters,
                      setShowFilters,
                      values,
                      setFieldValue,
                      handleChange,
                      handleBlur,
                    }}
                    asset={reportSections.asset}
                    asstesAndLiabilities={reportSections.asstesAndLiabilities}
                  />
                )}
                {step === 2 && (
                  <FinancialInvestmentsReport
                    {...{
                      showFilters,
                      setShowFilters,
                      values,
                      setFieldValue,
                      handleChange,
                      handleBlur,
                    }}
                    {...reportSections}
                  />
                )}
                {step === 3 && (
                  <BusinessReport
                    {...{
                      showFilters,
                      setShowFilters,
                      values,
                      setFieldValue,
                      handleChange,
                      handleBlur,
                    }}
                    {...reportSections}
                  />
                )}
                {step === 4 && (
                  <SMSFReport
                    {...{
                      showFilters,
                      setShowFilters,
                      values,
                      setFieldValue,
                      handleChange,
                      handleBlur,
                    }}
                    {...reportSections}
                  />
                )}
                {step === 5 && (
                  <FamilyTrustReport
                    {...{
                      showFilters,
                      setShowFilters,
                      values,
                      setFieldValue,
                      handleChange,
                      handleBlur,
                    }}
                    {...reportSections}
                  />
                )}

                <div className="row justify-content-between px-2 my-5">
                  <button
                    className="btn btn-outline w-25 backBtn"
                    type="button"
                    onClick={() => {
                      if (step <= 0) {
                        navigate(-1);
                      } else {
                        setStep(step - 1);
                        scroller.scrollTo("topSection", {
                          duration: 500,
                          smooth: "easeInOutQuad",
                        });
                      }
                    }}
                  >
                    Back
                  </button>
                  <button
                    className="btn bgColor w-25 modalBtn"
                    type="button"
                    onClick={() => {
                      setStep(step + 1);
                      scroller.scrollTo("topSection", {
                        duration: 500,
                        smooth: "easeInOutQuad",
                      });
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </ConfigProvider>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CashFlowReport;
