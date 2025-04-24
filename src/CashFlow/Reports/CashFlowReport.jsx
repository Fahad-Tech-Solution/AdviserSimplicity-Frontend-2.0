import React, { Children, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import CashReport from "./TableReports/CashReport";
import AssetLiabilitiesReport from "./TableReports/AssetLiabilitiesReport";
import { scroller } from "react-scroll";
import CashFlowReportOptions from "../CashFlowOptions/CashFlowReportOptions";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { CashFlowData, defaultUrl, Loading } from "../../Store/Store";
import {
  createTableSection,
  createTaxSection,
  extractIndexesByType,
  openNotificationSuccess,
  PostAxios,
  removeNullRows,
  toCommaAndDollar,
  transformInflowsData,
} from "../../Components/Assets/Api/Api";
import { ConfigProvider } from "antd";
import { content } from "../../Content/Content";

const CashFlowReport = () => {
  let initialValues = {
    category: "",
  };

  const [showFilters, setShowFilters] = useState(false);
  const [step, setStep] = useState(0);

  let onSubmit = (values, resetForm) => {};

  const [fullTableCashFlow, setFullTableCashFlow] = useState([]);

  const [inflow, setInflow] = useState([]);

  const [outFlow, setOutFlow] = useState([]);

  const [surplus, setSurplus] = useState([]);

  const [clientData, setClientData] = useState([]);
  const [partnerData, setPartnerData] = useState([]);

  const [asset, setAssets] = useState([
    {
      type: "Lifestyle Assets",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Family Home",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Direct Share Portfolios",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Managed Funds",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Other Investments",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Cash",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Term Deposits",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Insurance Bonds",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Investment Properties",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Superannuation",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Account Based Pensions",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Annuity Investments",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Trading Company",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Business Trust",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "SMSF Net Assets",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Family Trust Net Assets",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Total Assets",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
  ]);

  const [assetsTestPensionAllowance, setAssetsTestPensionAllowance] = useState([
    {
      type: "Personal Assets",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Lynda Financial Assets",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "abc Financial Assets",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Lynda Superannuation",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "abc Superannuation",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Lynda Pension Assets",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "abc Pension Assets",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Lynda Annuity",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "abc Annuity",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Rental Properties",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Trading Company Net Assets",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Business Trust Net Assets",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Family Trust Net Assets",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Investment Loans",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Investment Property Loan",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Total Assets",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Lower - Pensions",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Lower - Allowance",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Upper",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Excess Assets",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
  ]);

  const [incomeTestPensionsAllowances, setIncomeTestPensionsAllowances] =
    useState([
      {
        type: "Deemed Financial Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Net Rental Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Trust Distributions & Company Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Lynda Salary Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "abc Salary Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Lynda Other Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "abc Other Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Lynda Pension Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "abc Pension Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Lynda Annuity Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "abc Annuity Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Less",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Lynda Deductible Pension Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "abc Deductible Pension Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Lynda Work Bonus",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "abc Work Bonus",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Total Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Lower",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Upper",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Excess Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
    ]);

  const [allowance, setAllowance] = useState([
    {
      type: "Total Income",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Lower",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Upper",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Partner Balance over",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
  ]);

  const [clientIncome, setClientIncome] = useState([
    {
      type: "Deemed Income",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Net Rental Income",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Trust Distributions & Company Income",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Salary Income",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Other Income",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Annuity Income",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Pension Income",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Less",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Deductible Pension Income",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Total Income",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
  ]);

  const [clientPayment, setClientPayment] = useState([
    {
      type: "Client",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Age",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Payment Amount",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Asset Test Reduction",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Under Asset Test",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Income Test Reduction",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Under Income Test",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Actual Payment",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
  ]);

  const [familyTaxBenefitPartA, setFamilyTaxBenefitPartA] = useState([
    {
      type: "Total Maximum rate of FTB- Part A",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Base Rate of FTB-Part A",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Total Adjusted Family Income",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
      rowGreen: "true",
    },
    {
      type: "Income Level For Maximum Rate of FTB-Part A",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Income Level For Base Rate of FTB-Part A",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Income Mantaince Free Area",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Total FTB- Part A (including Supplement)",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
  ]);

  const [liabilities, setLiabilities] = useState([
    {
      type: "Home Loan",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Personal Loans",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Credit Cards",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Investment Loans",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Investment Property Loans",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Total Liabilities",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
  ]);

  let DefaultUrl = useRecoilValue(defaultUrl);
  let cashFlowData = useRecoilValue(CashFlowData);
  let [loading, setLoading] = useRecoilState(Loading);

  useEffect(() => {
    if (
      typeof cashFlowData !== "object" ||
      !cashFlowData ||
      !Object.keys(cashFlowData).length
    ) {
      console.warn("cashFlowData is not a valid object or is empty.");
      return;
    }
    FetchReports();
  }, []);

  const FetchReports = async () => {
    setLoading(true);
    const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

    try {
      const response = await PostAxios(`${DefaultUrl}/api/cal/report`, {
        scenarioID: scenarioObj._id,
      });

      if (response) {
        const InFlow = transformInflowsData(response.REPORTS_Cashflow.inflows);
        const OutFlow = transformInflowsData(
          response.REPORTS_Cashflow.outflows
        );
        const Surplus = transformInflowsData(
          removeNullRows(response.REPORTS_Cashflow.surplusDeficit)
        );

        const client_Tax = transformInflowsData(
          removeNullRows(response.REPORTS_Tax_Summary.clientTaxPosition)
        );

        const partner_Tax = transformInflowsData(
          removeNullRows(response.REPORTS_Tax_Summary.partnerTaxPosition)
        );

        const fullTable = [
          createTableSection("1", "Total Inflows", InFlow, true),
          createTableSection("2", "Total Outflows", OutFlow, true),
          createTableSection("3", "Total Surplus", Surplus),
        ];

        let client_Tax_SessionObj =
          content.cashFlowReport[0].reportsArray.clientTaxPosition;

        const clinet_Tax_Table = createTaxSection(
          client_Tax,
          client_Tax_SessionObj
        );

        const partner_Tax_Table = createTaxSection(
          partner_Tax,
          client_Tax_SessionObj
        );

        setFullTableCashFlow(fullTable);
        setClientData(clinet_Tax_Table);
        setPartnerData(partner_Tax_Table);
      }
    } catch (error) {
      console.error("Report Error:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Report Failed",
        "Something went wrong Fetching Data Please! Try Later."
      );
    } finally {
      setLoading(false);
    }
  };

  let Nev = useNavigate();

  return (
    <div className="container-fluid  ">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue, handleChange, handleBlur, resetForm }) => {
          return (
            <Form>
              <div name="topSection">
                <CashFlowReportOptions step={step} setStep={setStep} />
              </div>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#36b446",
                    colorLink: "#36b446",
                  },
                }}
              >
                <div className="px-0 px-md-4 reportSection">
                  {step == 0 && (
                    <>
                      <CashReport
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                        fullTableCashFlow={fullTableCashFlow}
                        clientData={clientData}
                        partnerData={partnerData}
                        assetsTestPensionAllowance={assetsTestPensionAllowance}
                        incomeTestPensionsAllowances={
                          incomeTestPensionsAllowances
                        }
                        allowance={allowance}
                        clientIncome={clientIncome}
                        // partnerIncome={partnerIncome}
                        clientPayment={clientPayment}
                        familyTaxBenefitPartA={familyTaxBenefitPartA}
                        values={values}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                      />
                    </>
                  )}

                  {step == 1 && (
                    <>
                      <AssetLiabilitiesReport
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                        asset={asset}
                        setInflow={setInflow}
                        liabilities={liabilities}
                        setOutFlow={setOutFlow}
                        surplus={surplus}
                        setSurplus={setSurplus}
                        values={values}
                        setFieldValue={setFieldValue}
                      />
                    </>
                  )}

                  <div className="row justify-content-between px-2 my-5">
                    <button
                      className="btn btn-outline w-25 backBtn"
                      onClick={() => {
                        if (step <= 0) {
                          //  Here, we need a way to check if Nev(-1) is empty.
                          //  The method to check if Nev(-1) is empty is not standard and depends on how Nev function works
                          //  I am making an assumption that Nev is a function that changes the route, similar to react-router-dom
                          //  Assumming Nev returns the route
                          const previousRoute = Nev(-1); // Get the previous route
                          if (
                            previousRoute === undefined ||
                            previousRoute === null ||
                            previousRoute === ""
                          ) {
                            // If Nev(-1) is undefined, null, or an empty string, go to '/Cash-Flow/Reports/'
                            Nev("/Cash-Flow/Reports/");
                          } else {
                            Nev(-1);
                          }
                        }
                        setStep(step - 1);
                        scroller.scrollTo("topSection", {
                          duration: 500,
                          delay: 0,
                          smooth: "easeInOutQuad",
                        });
                      }}
                    >
                      Back
                    </button>
                    <button
                      className="btn bgColor w-25 modalBtn"
                      onClick={() => {
                        setStep(step + 1);
                        scroller.scrollTo("topSection", {
                          duration: 500,
                          delay: 0,
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
          );
        }}
      </Formik>
    </div>
  );
};

export default CashFlowReport;
