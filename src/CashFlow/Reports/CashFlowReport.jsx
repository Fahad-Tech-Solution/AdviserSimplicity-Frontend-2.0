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
  openNotificationSuccess,
  PostAxios,
  toCommaAndDollar,
} from "../../Components/Assets/Api/Api";
import { ConfigProvider } from "antd";

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

  const [clientData, setClientData] = useState([
    {
      type: "Age",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Gross Employment Income",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Other taxable Income",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Investment Income(Shares & Mgd Funds)",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Interest Income",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Other Investment Income",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Franking Credits",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Capital Gains Tax",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Rental Income",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Net Trust Distribution",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Centrelink",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Annuity Income",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Lifetime Pension",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Super Pension",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Total Assessable income",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Deductible Superannuation Contributions",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Other Deductible Expenses",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Deductible interest Costs",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Income Protection Insurance",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Annuity Deductible Amount",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Lifetime Pension",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Tax Free Pension Amount",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Total Allowable Deductions",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Total Taxable Income",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Basic Tax payable",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Budget Repair Levy",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Medicare levy",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Medicare Levy Surcharge",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Total Tax payable",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "15% Pension Rebate",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "10% Pension Rebate",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Spouse Super Rebate",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "SAPTO",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "30% Rebate for insurance Bonds",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "LITO",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Total Rebates",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Franking Credits",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Total Tax payable",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Reportable Fringe Benefits",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Unused SAPTO",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Additional Contributions Tax",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
  ]);

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

  let FetchReports = async () => {
    setLoading(true);
    // Data is in cashFlowData
    const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));
    try {
      const response = await PostAxios(`${DefaultUrl}/api/cal/report`, {
        scenarioID: scenarioObj._id,
      });
      if (response) {
        // console.log("Usama", response.REPORTS_Cashflow.surplusDeficit);
        // console.log(transformInflowsData(response.REPORTS_Cashflow.outflows));
        let InFlow = transformInflowsData(response.REPORTS_Cashflow.inflows);
        let OutFlow = transformInflowsData(response.REPORTS_Cashflow.outflows);
        let Surplus = transformInflowsData(
          removeNullRows(response.REPORTS_Cashflow.surplusDeficit)
        );

        let fullTable = [
          {
            key: "1",
            type: "Total Inflows",
            children: InFlow,
            ...Array.from({ length: 30 }, (_, i) => i + 1).reduce(
              (acc, year) => {
                acc[`year${year}`] =
                  InFlow[InFlow.length - 1]?.[`year${year}`] || "$0";
                return acc;
              },
              {}
            ),
          },
          {
            key: "2",
            type: "Total Outflows",
            children: OutFlow,
            ...Array.from({ length: 30 }, (_, i) => i + 1).reduce(
              (acc, year) => {
                acc[`year${year}`] =
                  OutFlow[OutFlow.length - 1]?.[`year${year}`] || "$0";
                return acc;
              },
              {}
            ),
          },
          {
            key: "3",
            type: "Total Surplus",
            children: Surplus,
            ...Array.from({ length: 30 }, (_, i) => i + 1).reduce(
              (acc, year) => {
                acc[`year${year}`] =
                  Surplus[Surplus.length - 1]?.[`year${year}`] || "$0";
                return acc;
              },
              {}
            ),
          },
        ];

        console.log("Usama", fullTable);

        setFullTableCashFlow(fullTable);

        // setInflow();
        // setOutFlow();
        // let Surplus = ;
        // setSurplus(transformInflowsData(Surplus));
        // response.REPORTS_Cashflow;
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

  function removeNullRows(data) {
    return data.filter((row) => {
      // Keep the row if it has any non-null and non-undefined value (excluding the first item)
      return row
        .slice(1)
        .some((value) => value !== null && value !== undefined);
    });
  }

  function transformInflowsData(inflows = []) {
    const result = [];
    const yearSums = new Array(10).fill(0);

    inflows.forEach((row) => {
      const [type, ...values] = row;
      const formatted = { type };

      for (let i = 0; i < 30; i++) {
        const val = Number(values[i]);
        const safeVal = isNaN(val) ? 0 : val;
        formatted[`year${i + 1}`] = toCommaAndDollar(safeVal);
        yearSums[i] += safeVal;
      }

      result.push(formatted);
    });

    // ✅ Update the last row (Total Inflows)
    const lastRow = result[result.length - 1];
    // if (lastRow?.type === "Total Inflows") {
    for (let i = 0; i < 10; i++) {
      const key = `year${i + 1}`;
      const currentVal = Number((lastRow[key] || "").replace(/[^0-9.-]+/g, ""));

      // Update only if value is 0 or NaN
      if (isNaN(currentVal) || currentVal === 0) {
        lastRow[key] = toCommaAndDollar(yearSums[i]);
      }
    }
    // }

    return result;
  }

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
                          // Nev("/Cash-Flow/Reports/");
                          Nev(-1);
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
