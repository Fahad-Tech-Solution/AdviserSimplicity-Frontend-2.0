import { React, useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Card, Modal } from "react-bootstrap";
import axios from "axios";
import plus from "./images/plus.svg";
import lawyer from "./images/lawyer.svg";
import notebook from "./images/notebook.svg";
import { NavLink, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { CRState, StepState, defaultUrl } from "../../Store/Store";

function SMSF() {
  
  let DefaultUrl = useRecoilValue(defaultUrl);

  let [CRObject, setCRObject] = useRecoilState(CRState);
  let [Steps, setSteps] = useRecoilState(StepState); //Recoil Step State For First Route When User Login

  const [Accumulation, setAccumulation] = useState(false);
  const [Accumulationshow, setAccumulationShow] = useState(false);
  const AccumulationhandleClose = () => {
    setAccumulationShow(false);
    setAccumulationFlag(false);
  };
  const AccumulationhandleShow = () => setAccumulationShow(true);
  let AccumulationHandler = (elem) => {
    if (elem === "No") {
      setAccumulation(false);
    } else {
      setAccumulation(true);
    }
  };

  const [Pension, setPension] = useState(false);
  const [Pensionshow, setPensionShow] = useState(false);
  const PensionhandleClose = () => {
    setPensionShow(false);
    setPensionAccountFlag(false);
  };
  const PensionhandleShow = () => setPensionShow(true);
  let PensionHandler = (elem) => {
    if (elem === "No") {
      setPension(false);
    } else {
      setPension(true);
    }
  };

  const [BankAccounts, setBankAccounts] = useState(false);
  const [BankAccountsshow, setBankAccountsShow] = useState(false);
  const BankAccountshandleClose = () => {
    setBankAccountsShow(false);
    // setBankAccountFlag(false);
  };
  const BankAccountshandleShow = () => setBankAccountsShow(true);
  let BankAccountsHandler = (elem) => {
    if (elem === "No") {
      setBankAccounts(false);
    } else {
      setBankAccounts(true);
    }
  };

  const [TermDeposit, setTermDeposit] = useState(false);
  const [TermDepositshow, setTermDepositShow] = useState(false);
  const TermDeposithandleClose = () => setTermDepositShow(false);
  const TermDeposithandleShow = () => setTermDepositShow(true);
  let TermDepositHandler = (elem) => {
    if (elem === "No") {
      setTermDeposit(false);
    } else {
      setTermDeposit(true);
    }
  };

  const [AustralianShare, setAustralianShare] = useState(false);
  const [AustralianShareshow, setAustralianShareShow] = useState(false);
  const AustralianSharehandleClose = () => {
    setAustralianShareShow(false);
    setAustralianShareFlag(false);
  };
  const AustralianSharehandleShow = () => setAustralianShareShow(true);
  let AustralianShareHandler = (elem) => {
    if (elem === "No") {
      setAustralianShare(false);
    } else {
      setAustralianShare(true);
    }
  };

  const [ManagedFunds, setManagedFunds] = useState(false);
  const [ManagedFundsshow, setManagedFundsShow] = useState(false);
  const ManagedFundshandleClose = () => {
    setManagedFundsShow(false);
    setManageFundFlag(false);
  };
  const ManagedFundshandleShow = () => setManagedFundsShow(true);
  let ManagedFundsHandler = (elem) => {
    if (elem === "No") {
      setManagedFunds(false);
    } else {
      setManagedFunds(true);
    }
  };

  const [InvestmentProperties, setInvestmentProperties] = useState(false);
  const [InvestmentPropertiesshow, setInvestmentPropertiesShow] =
    useState(false);
  const InvestmentPropertieshandleClose = () => {
    setInvestmentPropertiesShow(false);
    setInvestmentFlag(false);
  };
  const InvestmentPropertieshandleShow = () =>
    setInvestmentPropertiesShow(true);
  let InvestmentPropertiesHandler = (elem) => {
    if (elem === "No") {
      setInvestmentProperties(false);
    } else {
      setInvestmentProperties(true);
    }
  };

  const [InvestmentProperties2, setInvestmentProperties2] = useState(false);
  const [InvestmentProperties2show, setInvestmentProperties2Show] =
    useState(false);
  const InvestmentProperties2handleClose = () =>
    setInvestmentProperties2Show(false);
  const InvestmentProperties2handleShow = () =>
    setInvestmentProperties2Show(true);
  let InvestmentProperties2Handler = (elem) => {
    if (elem === "No") {
      setInvestmentProperties2(false);
    } else {
      setInvestmentProperties2(true);
    }
  };

  let initialValues = {
    PensionRadio: "No",
    AccumulationRadio: "No",
    BankAccountsRadio: "No",
    TermDepositRadio: "No",
    AustralianShareRadio: "No",
    loansAssociatedradio: "No",
    ManagedFundsRadio: "No",
    managedloansAssociatedradio: "No",
    InvestmentPropertiesRadio: "No",

    SMSFFundName: "",
    SMSFTrusteeName: "",
    SMSFFundType: "",
    SMSFABN: "",
    SMSFTrusteeType: "",
    SMSFEstablishmentDate: "",
    SMSFAssetsSegregated: "No",
    SMSFBorrowingInvestment: "No",
    SMSFAcquiringInsurances: "No",
    SMSFAccountant: "",
    SMSFAuditor: "",
    SMSFAccountingAuditing: "",
    SMSFATOLevy: "",
  };

  let validationSchema = Yup.object({
    SMSFFundName:
      CRObject.QuestionSMSF == "No"
        ? Yup.string()
        : Yup.string().required("Required"),
    SMSFFundType:
      CRObject.QuestionSMSF == "No"
        ? Yup.string()
        : Yup.string().required("Required"),
    SMSFABN:
      CRObject.QuestionSMSF == "No"
        ? Yup.string()
        : Yup.string().required("Required"),
    SMSFTrusteeType:
      CRObject.QuestionSMSF == "No"
        ? Yup.string()
        : Yup.string().required("Required"),
    SMSFEstablishmentDate:
      CRObject.QuestionSMSF == "No"
        ? Yup.string()
        : Yup.date().required("Required").nullable(),
    SMSFAccountant:
      CRObject.QuestionSMSF == "No"
        ? Yup.string()
        : Yup.string().required("Required"),
    SMSFAuditor:
      CRObject.QuestionSMSF == "No"
        ? Yup.string()
        : Yup.string().required("Required"),
    SMSFAccountingAuditing:
      CRObject.QuestionSMSF == "No"
        ? Yup.string()
        : Yup.string().required("Required"),
    SMSFATOLevy:
      CRObject.QuestionSMSF == "No"
        ? Yup.string()
        : Yup.string().required("Required"),

    SMSFTrusteeName: Yup.string().when("SMSFTrusteeType", {
      is: (value) => value == "Corporate",
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
  });

  let Navigate = useNavigate();
  function BackFunction() {
    setSteps(8);
    localStorage.setItem("Steps", 8);
    Navigate("/Super-And-Retirment");
  }
  let onSubmit = (values) => {
    // alert(":_:")
    setSteps(10);
    localStorage.setItem("Steps", 10);

    Navigate("/Investment-Trust");

    let SMSF_Form = {
      Email: localStorage.getItem("Email"),
      FundName: CRObject.QuestionSMSF == "No" ? "null" : Values.SMSFFundName,
      FundType: CRObject.QuestionSMSF == "No" ? "null" : Values.SMSFFundType,
      ABN: CRObject.QuestionSMSF == "No" ? 0 : Values.SMSFABN,
      TrusteeType:
        CRObject.QuestionSMSF == "No" ? "null" : Values.SMSFTrusteeType,
      EstablishmentDate:
        CRObject.QuestionSMSF == "No" ? "" : Values.SMSFEstablishmentDate,
      AssetsSegregated: Values.SMSFAssetsSegregated,
      InvestmentBorrowing: Values.SMSFBorrowingInvestment,
      AcquireInsurances: Values.SMSFAcquiringInsurances,
      AccountantName:
        CRObject.QuestionSMSF == "No" ? "null" : Values.SMSFAccountant,
      AuditorName: CRObject.QuestionSMSF == "No" ? "null" : Values.SMSFAuditor,
      AccountingAuditing:
        CRObject.QuestionSMSF == "No" ? 0 : Values.SMSFAccountingAuditing,
      ATOLevy: CRObject.QuestionSMSF == "No" ? 0 : Values.SMSFATOLevy,
      SMSFTrusteeName:
        Values.SMSFTrusteeType == "Corporate" ? Values.SMSFTrusteeName : 0,
    };
    let myData = {
      Email: localStorage.getItem("Email"),
      PensionAccount: Values.PensionRadio,
      Accumulation: Values.AccumulationRadio,
      BankAccount: Values.BankAccountsRadio,
      TermDepositAccount: Values.TermDepositRadio,
      AustralianShareMarket: Values.AustralianShareRadio,
      ManagedFunds: Values.ManagedFundsRadio,
      InvestmentProperties: Values.InvestmentPropertiesRadio,
      AustralianSharePortfolio: Values.loansAssociatedradio,
      ManagedFundsPortfolio: Values.managedloansAssociatedradio,
    };
    // Post Api
    console.log(myData);

    axios
      .post(`${DefaultUrl}/api/Client-SMSF-Client/Add-Client-SMSF`, myData)
      .then((res) => console.log("Client  Added Successfully!"));

    console.log(SMSF_Form);

    setTimeout(() => {
      axios
        .post(`${DefaultUrl}/api/Client-SMSFForm/Add-Client-SMSFForm`, SMSF_Form)
        .then((res) => {
          Navigate("/Investment-Trust");
          console.log("Client Form  Added Successfully!");
        });
    }, 500);
  };

  let Client_initialValues = {
    // Bank123
    CurrentValue1: "",
    FinancialInstitution1: "",
    IncomeYield1: "",
    AnnualIncome1: "",
    CurrentValue2: "",
    FinancialInstitution2: "",
    IncomeYield2: "",
    AnnualIncome2: "",
    CurrentValue3: "",
    FinancialInstitution3: "",
    IncomeYield3: "",
    AnnualIncome3: "",

    AccumulationMemberName: "",
    AccumulationEligibleDate: "",
    AccumulationCurrentBalance: "",
    AccumulationTaxFree: "",
    AccumulationTaxed: "",
    AccumulationNonPreservedRestriction: "",
    AccumulationNonPreservedUnRestriction: "",
    AccumulationPreservedAmount: "",

    PensionMemberName: "",
    PensionType: "",
    PensionCommencementDate: "",
    PensionCurrentBalance: "",
    PensionTaxFree: "",
    PensionTaxed: "",
    // PensionPurchasePrice: "",
    PensionFrequency: "",
    PensionRegularIncomeDrawn: "",
    PensionMinimumRequired: "",
    PensionRelevantNumber: "",
    PensionMaximum: "",
    PensionPurchasePrice: "",
    PensionLumpsumTaken: "",
    PensionDeductibleAmount: "",

    AustralianShareInvestmentName: "",
    AustralianShareNoOfShares: "",
    AustralianShareCurrentPrice: "",
    AustralianShareTotalValue: "",
    AustralianShareCostBase: "",
    AustralianSharePurchaseDate: "",
    AustralianShareIncomePA: "",
    AustralianShareIncomePA2: "",
    AustralianShareTotalIncomePA: "",
    AustralianShareReinvestIncome: "No",
    AustralianShareFrankedAmount: "",
    AustralianShareRegInvestmentsPA: "",

    ManagedFundsPlatformName: "",
    ManagedFundsInvestmentName: "",
    ManagedFundsNoOfShares: "",
    ManagedFundsCurrentPrice: "",
    ManagedFundsCurrentValue: "",
    ManagedFundsOriginalInvestment: "",
    ManagedFundsPurchaseDate: "",
    ManagedFundsIncomePA: "",
    ManagedFundsIncomePA2: "",
    ManagedFundsTotalIncomePA: "",
    ManagedFundsReinvestIncome: "No",
    ManagedFundsRegInvestmentsPA: "",

    InvestmentPropertiesCurrentValue: "",
    InvestmentPropertiesCostBase: "",
    InvestmentPropertiesAddress: "",
    InvestmentPropertiesPostcode: "",
    InvestmentPropertiesRentalIncome: "",
    InvestmentPropertiesFrequency: "",
    InvestmentPropertiesTotalAnnualIncome: "",
    InvestmentPropertiesExpensesPA: "",
    InvestmentPropertiesLoanAttached: "No",
    InvestmentPropertiesCurrentBalance: "",
    InvestmentPropertiesClientBorrowing: "",
    InvestmentPropertiesLender: "",
    InvestmentPropertiesRepaymentAmount: "",
    InvestmentPropertiesFrequency2: "",
    InvestmentPropertiesAnnualRepayment: "",
    InvestmentPropertiesInterestRatePA: "",
    InvestmentPropertiesLoanTerm: "",
    InvestmentPropertiesLoanType: "",
    InvestmentPropertiesDebtLoanAmount: "",
    InvestmentPropertiesYearsRemaining: "",
  };

  let Client_validationSchema = Yup.object({
    // AnnualIncome1: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // IncomeYield1: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // FinancialInstitution1: Yup.string().required("Required"),
    // CurrentValue1: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // AnnualIncome2: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // IncomeYield2: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // FinancialInstitution2: Yup.string().required("Required"),
    // CurrentValue2: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),

    // AnnualIncome1: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // IncomeYield1: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // FinancialInstitution1: Yup.string().required("Required"),
    // CurrentValue1: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // AnnualIncome2: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // IncomeYield2: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // FinancialInstitution2: Yup.string().required("Required"),
    // CurrentValue2: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // AnnualIncome3: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // IncomeYield3: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // FinancialInstitution3: Yup.string().required("Required"),
    // CurrentValue3: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),

    // AccumulationMemberName: Yup.string().required("Required"),
    // AccumulationEligibleDate: Yup.string().required("Required"),
    // AccumulationCurrentBalance: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // AccumulationTaxFree: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // AccumulationTaxed: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // AccumulationNonPreservedRestriction: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // AccumulationNonPreservedUnRestriction: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // AccumulationPreservedAmount: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),

    // PensionMemberName: Yup.string().required("Required"),
    // PensionType: Yup.string().required("Required"),
    // PensionCommencementDate: Yup.string().required("Required"),
    // PensionCurrentBalance: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // PensionTaxFree: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // PensionTaxed: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // PensionPurchasePrice: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // PensionFrequency: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // PensionRegularIncomeDrawn: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // PensionMinimumRequired: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // PensionRelevantNumber: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // PensionPurchasePrice: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // PensionLumpsumTaken: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // PensionDeductibleAmount: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),

    // AustralianShareInvestmentName: Yup.string().required("Required"),
    // AustralianShareNoOfShares: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // AustralianShareCurrentPrice: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // AustralianShareTotalValue: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // AustralianShareCostBase: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // AustralianSharePurchaseDate: Yup.string().required("Required"),
    // AustralianShareIncomePA: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // AustralianShareIncomePA2: Yup.string().required("Required"),
    // AustralianShareTotalIncomePA: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // AustralianShareFrankedAmount: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // AustralianShareRegInvestmentsPA: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),

    // ManagedFundsPlatformName: Yup.string().required("Required"),
    // ManagedFundsInvestmentName: Yup.string().required("Required"),
    // ManagedFundsNoOfShares: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // ManagedFundsCurrentPrice: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // ManagedFundsCurrentValue: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // ManagedFundsOriginalInvestment: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // ManagedFundsPurchaseDate: Yup.string().required("Required"),
    // ManagedFundsIncomePA: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // ManagedFundsIncomePA2: Yup.string().required("Required"),
    // ManagedFundsTotalIncomePA: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    // ManagedFundsRegInvestmentsPA: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),

    InvestmentPropertiesCurrentValue: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    InvestmentPropertiesClientOwnership: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    InvestmentPropertiesCostBase: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    InvestmentPropertiesAddress: Yup.string().required("Required"),
    InvestmentPropertiesPostcode: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    InvestmentPropertiesRentalIncome: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    InvestmentPropertiesFrequency: Yup.string().required("Required"),
    InvestmentPropertiesTotalAnnualIncome: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    InvestmentPropertiesExpensesPA: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    InvestmentPropertiesCurrentBalance: Yup.number().when(
      "InvestmentPropertiesLoanAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive value",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    InvestmentPropertiesClientBorrowing: Yup.number().when(
      "InvestmentPropertiesLoanAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive value",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    InvestmentPropertiesLender: Yup.string().when(
      "InvestmentPropertiesLoanAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    InvestmentPropertiesRepaymentAmount: Yup.number().when(
      "InvestmentPropertiesLoanAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive value",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    InvestmentPropertiesFrequency2: Yup.string().when(
      "InvestmentPropertiesLoanAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    InvestmentPropertiesAnnualRepayment: Yup.number().when(
      "InvestmentPropertiesLoanAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive value",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    InvestmentPropertiesInterestRatePA: Yup.number().when(
      "InvestmentPropertiesLoanAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive value",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    InvestmentPropertiesLoanTerm: Yup.string().when(
      "InvestmentPropertiesLoanAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    InvestmentPropertiesLoanType: Yup.string().when(
      "InvestmentPropertiesLoanAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    InvestmentPropertiesDebtLoanAmount: Yup.number().when(
      "InvestmentPropertiesLoanAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive value",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    InvestmentPropertiesYearsRemaining: Yup.string().when(
      "InvestmentPropertiesLoanAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
  });

  let Client_onSubmit = (Values) => {
    console.log("submited");
    console.log(Values);
  };

  let InvestmentModal_initialValues = {
    InvestmentModalTotalExpense: "",
    InvestmentModalCorporateFees: "",
    InvestmentModalCouncilRates: "",
    InvestmentModalLawnMoving: "",
    InvestmentModalInsurance: "",
    InvestmentModalLandTax: "",
    InvestmentModalRepairs: "",
    InvestmentModalWaterCharges: "",
    InvestmentModalOthers: "",
    InvestmentModalTelephone: "",
    InvestmentModalProfessionalFees: "",
    InvestmentModalAllOthers: "",
  };

  let InvestmentModal_validationSchema = Yup.object({
    InvestmentModalCorporateFees: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0)
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    InvestmentModalCouncilRates: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0)
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    InvestmentModalLawnMoving: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0)
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    InvestmentModalInsurance: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0)
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    InvestmentModalLandTax: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0)
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    InvestmentModalRepairs: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0)
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    InvestmentModalWaterCharges: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0)
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    InvestmentModalOthers: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0)
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    InvestmentModalTelephone: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0)
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    InvestmentModalProfessionalFees: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0)
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    InvestmentModalAllOthers: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0)
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
  });

  let InvestmentModal_onSubmit = (Values) => {
    let myObj = {
      Email: localStorage.getItem("Email"),
      // TotalExpense: Values.InvestmentModalTotalExpense,
      TotalExpense:
        (parseFloat(Values.InvestmentModalCorporateFees) || 0) +
        (parseFloat(Values.InvestmentModalCouncilRates) || 0) +
        (parseFloat(Values.InvestmentModalLawnMoving) || 0) +
        (parseFloat(Values.InvestmentModalInsurance) || 0) +
        (parseFloat(Values.InvestmentModalLandTax) || 0) +
        (parseFloat(Values.InvestmentModalRepairs) || 0) +
        (parseFloat(Values.InvestmentModalWaterCharges) || 0) +
        (parseFloat(Values.InvestmentModalOthers) || 0) +
        (parseFloat(Values.InvestmentModalTelephone) || 0) +
        (parseFloat(Values.InvestmentModalProfessionalFees) || 0) +
        (parseFloat(Values.InvestmentModalAllOthers) || 0), //Calculated value
      CorporateFees: Values.InvestmentModalCorporateFees,
      CouncilRates: Values.InvestmentModalCouncilRates,
      LawnMoving: Values.InvestmentModalLawnMoving,
      Insurance: Values.InvestmentModalInsurance,
      LandTax: Values.InvestmentModalLandTax,
      Repairs: Values.InvestmentModalRepairs,
      WaterCharges: Values.InvestmentModalWaterCharges,
      Others: Values.InvestmentModalOthers,
      Telephone: Values.InvestmentModalTelephone,
      ProfessionalFees: Values.InvestmentModalProfessionalFees,
      AllOthers: Values.InvestmentModalAllOthers,
    };
    console.log(myObj);

    // Post Api
    axios
      .post(
        `${DefaultUrl}/api/Client-SMSF-InvestmentModal/Add-Client-InvestmentModal`,
        myObj
      )
      .then((res) => console.log("Client  Added Successfully!"));
    InvestmentProperties2handleClose();
  };

  let Accumulation_validationSchema = Yup.object({
    AccumulationMemberName: Yup.string().required("Required"),
    AccumulationEligibleDate: Yup.date().required("Required").nullable(),

    AccumulationCurrentBalance: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccumulationTaxFree: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccumulationTaxed: Yup.number().when(
      ["AccumulationCurrentBalance", "AccumulationTaxFree"],
      {
        is: (value1, value2) => value1 <= value2,
        then: Yup.number().required("Required"),
        otherwise: Yup.number().notRequired(),
      }
    ),
    AccumulationNonPreservedRestriction: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccumulationNonPreservedUnRestriction: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccumulationPreservedAmount: Yup.number().when(
      [
        "AccumulationCurrentBalance",
        "AccumulationNonPreservedRestriction",
        "AccumulationNonPreservedUnRestriction",
      ],
      {
        is: (value1, value2, value3) =>
          value1 <= value2 || value1 <= value3 || value1 <= value3 + value2,
        then: Yup.number().required("Required"),
        otherwise: Yup.number().notRequired(),
      }
    ),
  });

  const [AccumulationObj, setAccumulationObj] = useState([]);
  const [accumulationList, setAccumulationList] = useState([]);
  const [AccumulationFlag, setAccumulationFlag] = useState(false);

  let AccumulationModal_onSubmit = (Values) => {
    let Email = localStorage.getItem("Email");

    let myData = {
      Email: localStorage.getItem("Email"),
      MemberName: Values.AccumulationMemberName,
      EligibleDate: Values.AccumulationEligibleDate,
      CurrentBalance: Values.AccumulationCurrentBalance,
      TaxFree: Values.AccumulationTaxFree,
      Taxed:
        parseFloat(Values.AccumulationTaxFree) >=
        parseFloat(Values.AccumulationCurrentBalance)
          ? Values.AccumulationTaxed
          : (parseFloat(Values.AccumulationCurrentBalance) || 0) -
            (parseFloat(Values.AccumulationTaxFree) || 0),
      NonPreservedRestriction: Values.AccumulationNonPreservedRestriction,
      NonPreservedUnRestriction: Values.AccumulationNonPreservedUnRestriction,
      PreservedAmount:
        parseFloat(Values.AccumulationNonPreservedUnRestriction) >=
          parseFloat(Values.AccumulationCurrentBalance) ||
        parseFloat(Values.AccumulationNonPreservedRestriction) >=
          parseFloat(Values.AccumulationCurrentBalance) ||
        parseFloat(Values.AccumulationNonPreservedUnRestriction) +
          parseFloat(Values.AccumulationNonPreservedRestriction) >=
          parseFloat(Values.AccumulationCurrentBalance)
          ? Values.AccumulationPreservedAmount
          : (parseFloat(Values.AccumulationCurrentBalance) || 0) -
            (parseFloat(Values.AccumulationNonPreservedRestriction) || 0) -
            (parseFloat(Values.AccumulationNonPreservedUnRestriction) || 0),
    };

    //  setAccumulationList([...accumulationList,myData])

    console.log(myData);

    if (AccumulationFlag == true) {
      let id = Values.id;

      axios
        .patch(
          `${DefaultUrl}/api/Client-SMSF-Accumulation/Update-Client-Accumulation/${Email}/${id}`,
          myData
        )
        .then((res) => {
          console.log("Client Accumulation  Added Successfully!");
          setAccumulationFlag(false);
        });

      setTimeout(() => {
        // get Api
        axios.get(`${DefaultUrl}/api/Client-SMSF-Accumulation`).then((res) => {
          let childObj = res.data;
          let childFilterObj = childObj.filter((item) => item.Email == Email);
          console.log("Client Accumulation  get Successfully!", childFilterObj);
          setAccumulationList(childFilterObj);
        });
      }, 300);
    } else {
      // Post Api
      axios
        .post(`${DefaultUrl}/api/Client-SMSF-Accumulation/Add-Client-Accumulation`, myData)
        .then((res) => console.log("Client Accumulation  Added Successfully!"));

      setTimeout(() => {
        // get Api
        axios.get(`${DefaultUrl}/api/Client-SMSF-Accumulation`).then((res) => {
          let childObj = res.data;
          let childFilterObj = childObj.filter((item) => item.Email == Email);
          console.log("Client Accumulation  get Successfully!", childFilterObj);
          setAccumulationList(childFilterObj);
        });
      }, 500);
    }

    AccumulationhandleClose();
  };

  let PensionAccount_validationSchema = Yup.object({
    PensionMemberName: Yup.string().required("Required"),
    PensionType: Yup.string().required("Required"),
    PensionCommencementDate: Yup.date().required("Required").nullable(),
    PensionCurrentBalance: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    PensionTaxFree: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    PensionTaxed: Yup.number().when(
      ["PensionCurrentBalance", "PensionTaxFree"],
      {
        is: (value1, value2) => value1 <= value2,
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive value",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(""),
      }
    ),

    // PensionPurchasePrice: Yup.number()
    //   .required("Required")
    //   .test("Is positive?", "Must be a positive value", (value) => value > 0),
    PensionFrequency: Yup.string().required("Required"),
    PensionRegularIncomeDrawn: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    PensionMinimumRequired: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    PensionRelevantNumber: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    PensionPurchasePrice: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    PensionLumpsumTaken: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),

    PensionMaximum: Yup.number().when("PensionType", {
      is: (val) => val == "TTR",
      then: Yup.number().required("Reuired"),
      otherwise: Yup.number().notRequired(""),
    }),
  });
  const [PensionAccountList, setPensionAccountList] = useState([]);
  const [pensionAccountObj, setPensionAccountObj] = useState([]);
  const [PensionAccountFlag, setPensionAccountFlag] = useState(false);

  let PensionAccount_onSubmit = (Values) => {
    let Email = localStorage.getItem("Email");

    let myData = {
      Email: localStorage.getItem("Email"),
      MemberName: Values.PensionMemberName,
      PensionType: Values.PensionType,
      CommencementDateDate: Values.PensionCommencementDate,
      CurrentBalance: Values.PensionCurrentBalance,
      TaxFree: Values.PensionTaxFree,
      Taxed:
        parseFloat(Values.PensionTaxFree) >=
        parseFloat(Values.PensionCurrentBalance)
          ? Values.PensionTaxed
          : (parseFloat(Values.PensionCurrentBalance) || 0) -
            (parseFloat(Values.PensionTaxFree) || 0),
      OriginalPurchasePrice: Values.PensionPurchasePrice,
      Frequency: Values.PensionFrequency,
      RegularIncomeDrawn: Values.PensionRegularIncomeDrawn,
      MinimumRequired: Values.PensionMinimumRequired,
      PensionMaximum: Values.PensionMaximum,
      RelevantNumber: Values.PensionRelevantNumber,
      LumpsumTaken: Values.PensionLumpsumTaken,
      DeductibleAmount: parseFloat(
        (
          ((parseFloat(Values.PensionPurchasePrice) || 0) -
            (parseFloat(Values.PensionLumpsumTaken) || 0)) /
          (parseFloat(Values.PensionRelevantNumber) || 1)
        ).toFixed(2)
      ),
    };

    if (PensionAccountFlag) {
      // patch api
      let id = Values.id;

      axios
        .patch(
          `${DefaultUrl}/api/Client-SMSF-PensionAccount/Update-Client-PensionAccounts/${Email}/${id}`,
          myData
        )
        .then((res) => {
          console.log("Client PensionAccount  Updated Successfully!");

          setPensionAccountFlag(false);
        });
    } else {
      // Post Api
      axios
        .post(
          `${DefaultUrl}/api/Client-SMSF-PensionAccount/Add-Client-PensionAccounts`,
          myData
        )
        .then((res) => console.log("Client  Added Successfully!"));
    }

    console.log(myData);

    setTimeout(() => {
      // get Api
      axios.get(`${DefaultUrl}/api/Client-SMSF-PensionAccount`).then((res) => {
        console.log("Client  Get Successfully!");
        let childObj = res.data;
        let childFilterObj = childObj.filter((item) => item.Email == Email);
        setPensionAccountList(childFilterObj);
      });
    }, 300);

    PensionhandleClose();
  };

  let updateHandler_PensionAccount = (elem) => {
    let date = new Date(elem.CommencementDateDate);
    elem.CommencementDateDate = date;

    let myData = {
      id: elem._id,
      PensionMemberName: elem.MemberName,
      PensionType: elem.PensionType,
      PensionCommencementDate: elem.CommencementDateDate,
      PensionCurrentBalance: elem.CurrentBalance,
      PensionTaxFree: elem.TaxFree,
      PensionTaxed: elem.Taxed,
      PensionPurchasePrice: elem.OriginalPurchasePrice,
      PensionFrequency: elem.Frequency,
      PensionRegularIncomeDrawn: elem.RegularIncomeDrawn,
      PensionMinimumRequired: elem.MinimumRequired,
      PensionRelevantNumber: elem.RelevantNumber,
      PensionLumpsumTaken: elem.LumpsumTaken,
      PensionDeductibleAmount: elem.DeductibleAmount,
    };

    setPensionAccountObj([myData]);

    setPensionAccountFlag(true);
    PensionhandleShow();
  };

  let deleteHandler_PensionAccount = (elem) => {
    let Email = localStorage.getItem("Email");
    let id = elem._id;

    axios
      .delete(
        `${DefaultUrl}/api/Client-SMSF-PensionAccount/Delete-Client-PensionAccounts/${Email}/${id}`
      )
      .then((res) => {
        console.log("PensionAccount Deleted successfully");
      });

    setTimeout(() => {
      // get Api
      axios.get(`${DefaultUrl}/api/Client-SMSF-PensionAccount`).then((res) => {
        console.log("PensionAccount  Get Successfully!");
        let childObj = res.data;
        let childFilterObj = childObj.filter((item) => item.Email == Email);
        setPensionAccountList(childFilterObj);
      });
    }, 300);
  };

  const [bankAccountList, setBankAccountList] = useState([]);
  const [bankAccountList2, setBankAccountList2] = useState([]);
  const [bankAccountFlag, setBankAccountFlag] = useState(false);

  let Bank_validationSchema = Yup.object({
    IncomeYield1: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    FinancialInstitution1: Yup.string().required("Required"),
    CurrentValue1: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),

    IncomeYield2: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    FinancialInstitution2: Yup.string().required("Required"),
    CurrentValue2: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),

    IncomeYield3: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    FinancialInstitution3: Yup.string().required("Required"),
    CurrentValue3: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
  });
  let BankAccount_onSubmit = (Values) => {
    let Email = localStorage.getItem("Email");

    let myData = {
      Email: localStorage.getItem("Email"),
      CurrentValue1: Values.CurrentValue1,
      FinancialInstitution1: Values.FinancialInstitution1,
      IncomeYield1: Values.IncomeYield1,
      AnnualIncome1: parseFloat(
        (
          ((parseFloat(Values.IncomeYield1) || 0) / 100) *
          (parseFloat(Values.CurrentValue1) || 0)
        ).toFixed(2)
      ),
      CurrentValue2: Values.CurrentValue2,
      FinancialInstitution2: Values.FinancialInstitution2,
      IncomeYield2: Values.IncomeYield2,
      AnnualIncome2: parseFloat(
        (
          ((parseFloat(Values.IncomeYield1) || 0) / 100) *
          (parseFloat(Values.CurrentValue1) || 0)
        ).toFixed(2)
      ),
      CurrentValue3: Values.CurrentValue3,
      FinancialInstitution3: Values.FinancialInstitution3,
      IncomeYield3: Values.IncomeYield3,
      AnnualIncome3: parseFloat(
        (
          ((parseFloat(Values.IncomeYield1) || 0) / 100) *
          (parseFloat(Values.CurrentValue1) || 0)
        ).toFixed(2)
      ),
    };

    setBankAccountList([myData]);
    console.log(myData);

    if (bankAccountFlag) {
      // patch

      axios
        .patch(
          `${DefaultUrl}/api/Client-SMSF-BankAccounts/Update-Client-BankAccounts/${Email}`,
          myData
        )
        .then((res) => console.log("BankAccounts Updated Successfully!"));
    } else {
      // Post Api

      axios
        .post(`${DefaultUrl}/api/Client-SMSF-BankAccounts/Add-Client-BankAccounts`, myData)
        .then((res) => {
          console.log("Client  Added Successfully!");
          setBankAccountFlag(true);
        });
    }

    BankAccountshandleClose();
  };

  let deleteHandler1 = (e) => {
    // console.log(e);
    let data = e;
    data.CurrentValue1 = "";
    data.FinancialInstitution1 = "";
    data.IncomeYield1 = "";
    data.AnnualIncome1 = "";

    setBankAccountList([data]);
    setBankAccountFlag(true);
    // console.log(data);
    // setBankAccountsShow(true);

    let Email = localStorage.getItem("Email");

    // patch
    axios
      .patch(
        `${DefaultUrl}/api/Client-SMSF-BankAccounts/Update-Client-BankAccounts/${Email}`,
        data
      )
      .then((res) => console.log("BankAccounts Updated Successfully!"));
  };

  let deleteHandler2 = (e) => {
    // console.log(e);
    let data = e;
    data.CurrentValue2 = "";
    data.FinancialInstitution2 = "";
    data.IncomeYield2 = "";
    data.AnnualIncome2 = "";

    setBankAccountList([data]);
    setBankAccountFlag(true);
    // console.log(data);
    //  setBankAccountsShow(true);

    let Email = localStorage.getItem("Email");

    // patch
    axios
      .patch(
        `${DefaultUrl}/api/Client-SMSF-BankAccounts/Update-Client-BankAccounts/${Email}`,
        data
      )
      .then((res) => console.log("BankAccounts Updated Successfully!"));
  };

  let deleteHandler3 = (e) => {
    let Email = localStorage.getItem("Email");

    // console.log(e);
    let data = e;
    data.CurrentValue3 = "";
    data.FinancialInstitution3 = "";
    data.IncomeYield3 = "";
    data.AnnualIncome3 = "";

    setBankAccountList([data]);
    setBankAccountFlag(true);
    // console.log(data);
    // setBankAccountsShow(true);

    // patch
    axios
      .patch(
        `${DefaultUrl}/api/Client-SMSF-BankAccounts/Update-Client-BankAccounts/${Email}`,
        data
      )
      .then((res) => console.log("BankAccounts Updated Successfully!"));

  };

  let updateHandler_Beneficiaries = (elem) => {
    handleShow3();

    let Email = localStorage.getItem("Email");

    let BeneficiaryData = {
      id: elem._id,
      beneficiariesAttached: elem.NominatedBeneficiary,
      NomiationTypeBeneficiary: elem.NominationType,
      BeneficiariesOptionDetailsBeneficiaries: elem.No_ofBeneficiaries,

      Beneficiary1: elem.Beneficiary1,
      ShareofBenefit1: elem.BenefitShare1,
      RelationshipOptionDetailsRelationship1: elem.Relationship1,

      Beneficiary2: elem.Beneficiary2,
      ShareofBenefit2: elem.BenefitShare2,
      RelationshipOptionDetailsRelationship2: elem.Relationship2,

      Beneficiary3: elem.Beneficiary3,
      ShareofBenefit3: elem.BenefitShare3,
      RelationshipOptionDetailsRelationship3: elem.Relationship3,

      Beneficiary4: elem.Beneficiary4,
      ShareofBenefit4: elem.BenefitShare4,
      RelationshipOptionDetailsRelationship4: elem.Relationship4,

      Beneficiary5: elem.Beneficiary5,
      ShareofBenefit5: elem.BenefitShare5,
      RelationshipOptionDetailsRelationship5: elem.Relationship5,
    };

    setBeneficiariesObj([BeneficiaryData]);
    setBeneficiariesFlag(true);
  };

  let deleteHandler_Beneficiaries = (elem, index) => {
    let Email = localStorage.getItem("Email");
    let id = elem._id;

    axios
      .delete(
        `${DefaultUrl}/api/Client-SMSF-Beneficiary/Delete-Client-Beneficiary/${Email}/${id}`
      )
      .then((res) => {
        console.log("BeneficiaryData added successfully");
      });

    setTimeout(() => {
      axios.get(`${DefaultUrl}/api/Client-SMSF-Beneficiary`).then((res) => {
        let childObj = res.data;
        let childFilterObj = childObj.filter((item) => item.Email == Email);
        setBeneficiaryDataList(childFilterObj);

        console.log("BeneficiaryData get successfully");
      });
    }, 300);
  };

  let deleteHandler_accumulation = (elem) => {
    let email = localStorage.getItem("Email");
    let id = elem._id;

    axios
      .delete(
        `${DefaultUrl}/api/Client-SMSF-Accumulation/Delete-Client-Accumulation/${email}/${id}`
      )
      .then((res) => {
        //Popper Massage
        console.log("Client Accumulation  Delete Successfully!");
      });

    setTimeout(() => {
      // get Api
      axios.get(`${DefaultUrl}/api/Client-SMSF-Accumulation`).then((res) => {
        let childObj = res.data;
        let childFilterObj = childObj.filter((item) => item.Email == email);
        console.log("Client Accumulation  get Successfully!", childFilterObj);
        setAccumulationList(childFilterObj);
      });
    }, 300);
  };

  let updateHandler_accumulation = (elem, index) => {
    let date = new Date(elem.EligibleDate);
    elem.EligibleDate = date;

    let myData = {
      id: elem._id,
      AccumulationMemberName: elem.MemberName,
      AccumulationEligibleDate: elem.EligibleDate,
      AccumulationCurrentBalance: elem.CurrentBalance,
      AccumulationTaxFree: elem.TaxFree,
      AccumulationTaxed: elem.Taxed,
      AccumulationNonPreservedRestriction: elem.NonPreservedRestriction,
      AccumulationNonPreservedUnRestriction: elem.NonPreservedUnRestriction,
      AccumulationPreservedAmount: elem.PreservedAmount,
    };

    setAccumulationObj([myData]);
    setAccumulationFlag(true);
    AccumulationhandleShow();
  };

  const [termAccountList, setTermAccountList] = useState([]);
  //  const [termAccountList2, setTermAccountList2] = useState([])
  const [termAccountFlag, setTermAccountFlag] = useState(false);

  let term_InitialValues = {
    AnnualIncome1: "",
    IncomeYield1: "",
    FinancialInstitution1: "",
    CurrentValue1: "",
    AnnualIncome2: "",
    IncomeYield2: "",
    FinancialInstitution2: "",
    CurrentValue2: "",
    AnnualIncome3: "",
    IncomeYield3: "",
    FinancialInstitution3: "",
    CurrentValue3: "",
  };
  let Term_validationSchema = Yup.object({
    IncomeYield1: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    FinancialInstitution1: Yup.string().required("Required"),
    CurrentValue1: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),

    IncomeYield2: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    FinancialInstitution2: Yup.string().required("Required"),
    CurrentValue2: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),

    IncomeYield3: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    FinancialInstitution3: Yup.string().required("Required"),
    CurrentValue3: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
  });

  let Term_onSubmit = (Values) => {
    // qwerty
    // qwerty

    // qwerty
    // qwerty
    // qwerty
    // qwerty
    // qwerty

    let Email = localStorage.getItem("Email");

    let myData = {
      Email: localStorage.getItem("Email"),
      CurrentValue1: Values.CurrentValue1,
      FinancialInstitution1: Values.FinancialInstitution1,
      IncomeYield1: Values.IncomeYield1,
      AnnualIncome1: parseFloat(
        (
          ((parseFloat(Values.IncomeYield1) || 0) / 100) *
          (parseFloat(Values.CurrentValue1) || 0)
        ).toFixed(2)
      ),

      CurrentValue2: Values.CurrentValue2,
      FinancialInstitution2: Values.FinancialInstitution2,
      IncomeYield2: Values.IncomeYield2,
      AnnualIncome2: parseFloat(
        (
          ((parseFloat(Values.IncomeYield1) || 0) / 100) *
          (parseFloat(Values.CurrentValue1) || 0)
        ).toFixed(2)
      ),

      CurrentValue3: Values.CurrentValue3,
      FinancialInstitution3: Values.FinancialInstitution3,
      IncomeYield3: Values.IncomeYield3,
      AnnualIncome3: parseFloat(
        (
          ((parseFloat(Values.IncomeYield1) || 0) / 100) *
          (parseFloat(Values.CurrentValue1) || 0)
        ).toFixed(2)
      ),
    };

    setTermAccountList([myData]);

    console.log(myData);

    if (termAccountFlag) {
      // patch
      axios
        .patch(
          `${DefaultUrl}/api/Client-SMSF-TermDeposit/Update-Client-TermDeposit/${Email}`,
          myData
        )
        .then((res) => console.log("TermDeposit Updated Successfully!"));
    } else {
      // Post Api
      axios
        .post(`${DefaultUrl}/api/Client-SMSF-TermDeposit/Add-Client-TermDeposit`, myData)
        .then((res) => {
          console.log("Data Added Successfully !");
          setTermAccountFlag(true);
        });
    }

    TermDeposithandleClose();
  };

  let TermDepositDeleteHandler1 = (e) => {
    let Email = localStorage.getItem("Email");

    let data = e;
    data.CurrentValue1 = "";
    data.FinancialInstitution1 = "";
    data.IncomeYield1 = "";
    data.AnnualIncome1 = "";
    // console.log(data);

    // patch
    axios
      .patch(
        `${DefaultUrl}/api/Client-SMSF-TermDeposit/Update-Client-TermDeposit/${Email}`,
        data
      )
      .then((res) => console.log("TermDeposit Updated Successfully!"));

    setTermAccountList([data]);
    // setTermAccountFlag(true);
  };
  let TermDepositDeleteHandler2 = (e) => {
    let Email = localStorage.getItem("Email");

    let data = e;
    data.CurrentValue2 = "";
    data.FinancialInstitution2 = "";
    data.IncomeYield2 = "";
    data.AnnualIncome2 = "";
    // console.log(data);

    // patch
    axios
      .patch(
        `${DefaultUrl}/api/Client-SMSF-TermDeposit/Update-Client-TermDeposit/${Email}`,
        data
      )
      .then((res) => console.log("TermDeposit Updated Successfully!"));
    setTermAccountList([data]);
    // setTermAccountFlag(true);
  };

  let TermDepositDeleteHandler3 = (e) => {
    let Email = localStorage.getItem("Email");

    let data = e;
    data.CurrentValue3 = "";
    data.FinancialInstitution3 = "";
    data.IncomeYield3 = "";
    data.AnnualIncome3 = "";
    // console.log(data);

    // patch
    axios
      .patch(
        `${DefaultUrl}/api/Client-SMSF-TermDeposit/Update-Client-TermDeposit/${Email}`,
        data
      )
      .then((res) => console.log("TermDeposit Updated Successfully!"));
    setTermAccountList([data]);
    // setTermAccountFlag(true);
  };

  const [AustralianShareList, setAustralianShareList] = useState([]);

  let Australian_validationSchema = Yup.object({
    AustralianShareInvestmentName: Yup.string().required("Required"),
    AustralianShareNoOfShares: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AustralianShareCurrentPrice: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AustralianShareCostBase: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AustralianSharePurchaseDate: Yup.date().required("Required").nullable(),
    AustralianShareIncomePA: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AustralianShareIncomePA2: Yup.string().required("Required"),
    AustralianShareFrankedAmount: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AustralianShareRegInvestmentsPA: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
  });

  const [AustralianShareObj, setAustralianShareObj] = useState([]);
  const [AustralianShareFlag, setAustralianShareFlag] = useState(false);
  let Australian_onSubmit = (Values) => {
    let Email = localStorage.getItem("Email");

    let myData = {
      Email: localStorage.getItem("Email"),
      InvestmentName: Values.AustralianShareInvestmentName,
      NoOfShares: Values.AustralianShareNoOfShares,
      CurrentSharePrice: Values.AustralianShareCurrentPrice,
      TotalShareValue:
        (parseFloat(Values.AustralianShareCurrentPrice) || 0) *
        (parseFloat(Values.AustralianShareNoOfShares) || 0),
      CostBase: Values.AustralianShareCostBase,
      PurchaseDate: Values.AustralianSharePurchaseDate,
      IncomePA: Values.AustralianShareIncomePA,
      IncomePAType: Values.AustralianShareIncomePA2,
      TotalIncomePA:
        Values.AustralianShareIncomePA2 == ""
          ? 0
          : Values.AustralianShareIncomePA2 == "dollor"
          ? parseFloat(Values.AustralianShareIncomePA) || 0
          : parseFloat(
              (
                ((parseFloat(Values.AustralianShareIncomePA) || 0) / 100) *
                ((parseFloat(Values.AustralianShareCurrentPrice) || 0) *
                  (parseFloat(Values.AustralianShareNoOfShares) || 0))
              ).toFixed(2)
            ),
      ReinvestIncome: Values.AustralianShareReinvestIncome,
      FrankedAmount: Values.AustralianShareFrankedAmount,
      RegInvestmentsPA: Values.AustralianShareRegInvestmentsPA,
    };

    if (AustralianShareFlag) {
      //  patch api

      let id = Values.id;
      axios
        .patch(
          `${DefaultUrl}/api/Client-SMSF-AustralianShareMarket/Update-Client-AustralianShareMarket/${Email}/${id}`,
          myData
        )
        .then((res) => {
          console.log("Client AustralianShareMarket  Updated Successfully!");
          setAustralianShareFlag(false);
        });
    } else {
      // Post Api
      axios
        .post(
          `${DefaultUrl}/api/Client-SMSF-AustralianShareMarket/Add-Client-AustralianShareMarket`,
          myData
        )
        .then((res) => console.log("data added successfully"));
    }

    setTimeout(() => {
      axios.get(`${DefaultUrl}/api/Client-SMSF-AustralianShareMarket`).then((res) => {
        console.log("AustralianShareMarket get successfully");
        let childObj = res.data;
        let childFilterObj = childObj.filter((item) => item.Email == Email);
        setAustralianShareList(childFilterObj);
      });
    }, 300);

    console.log(myData);

    AustralianSharehandleClose();
  };

  let updateHandler_AustralianShare = (elem) => {
    let date = new Date(elem.PurchaseDate);
    elem.PurchaseDate = date;
    let myData = {
      id: elem._id,
      AustralianShareInvestmentName: elem.InvestmentName,
      AustralianShareNoOfShares: elem.NoOfShares,
      AustralianShareCurrentPrice: elem.CurrentSharePrice,
      AustralianShareTotalValue: elem.TotalShareValue,
      AustralianShareCostBase: elem.CostBase,
      AustralianSharePurchaseDate: elem.PurchaseDate,
      AustralianShareIncomePA: elem.IncomePA,
      AustralianShareIncomePA2: elem.IncomePAType,
      AustralianShareTotalIncomePA: elem.TotalIncomePA,
      AustralianShareReinvestIncome: elem.ReinvestIncome,
      AustralianShareFrankedAmount: elem.FrankedAmount,
      AustralianShareRegInvestmentsPA: elem.RegInvestmentsPA,
    };
    setAustralianShareObj([myData]);
    setAustralianShareFlag(true);
    AustralianSharehandleShow();
  };

  let deleteHandler_AustralianShare = (elem) => {
    // set_isEdit_BankAccountList(true)

    let Email = localStorage.getItem("Email");
    let id = elem._id;
    axios
      .delete(
        `${DefaultUrl}/api/Client-SMSF-AustralianShareMarket/Delete-Client-AustralianShareMarket/${Email}/${id}`
      )
      .then((res) => {
        console.log("Client AustralianShareMarket  Delete Successfully!");
      });

    setTimeout(() => {
      axios.get(`${DefaultUrl}/api/Client-SMSF-AustralianShareMarket`).then((res) => {
        console.log("AustralianShareMarket get successfully");
        let childObj = res.data;
        let childFilterObj = childObj.filter((item) => item.Email == Email);
        setAustralianShareList(childFilterObj);
      });
    }, 300);
  };

  const [manageFundFlag, setManageFundFlag] = useState(false);
  const [manageFundObj, setManageFundObj] = useState([]);
  const [manageFundList, setManageFundList] = useState([]);

  let Manage_validationSchema = Yup.object({
    ManagedFundsPlatformName: Yup.string().required("Required"),
    ManagedFundsInvestmentName: Yup.string().required("Required"),
    ManagedFundsNoOfShares: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    ManagedFundsCurrentPrice: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    ManagedFundsOriginalInvestment: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    ManagedFundsPurchaseDate: Yup.date().required("Required").nullable(),
    ManagedFundsIncomePA: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    ManagedFundsIncomePA2: Yup.string().required("Required"),

    ManagedFundsRegInvestmentsPA: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
  });

  let ManageFund_onSubmit = (Values) => {
    let Email = localStorage.getItem("Email");

    let myData = {
      Email: localStorage.getItem("Email"),
      PlatformName: Values.ManagedFundsPlatformName,
      InvestmentName: Values.ManagedFundsInvestmentName,
      NoOfShares: Values.ManagedFundsNoOfShares,
      CurrentSharePrice: Values.ManagedFundsCurrentPrice,
      CurrentShareValue:
        (parseFloat(Values.ManagedFundsNoOfShares) || 0) *
        (parseFloat(Values.ManagedFundsCurrentPrice) || 0),
      OriginalInvestment: Values.ManagedFundsOriginalInvestment,
      PurchaseDate: Values.ManagedFundsPurchaseDate,
      IncomePA: Values.ManagedFundsIncomePA,
      IncomePAType: Values.ManagedFundsIncomePA2,
      TotalIncomePA:
        Values.ManagedFundsIncomePA2 == ""
          ? 0
          : Values.ManagedFundsIncomePA2 == "dollor"
          ? parseFloat(Values.ManagedFundsIncomePA) || 0
          : parseFloat(
              (
                ((parseFloat(Values.ManagedFundsIncomePA) || 0) / 100) *
                ((parseFloat(Values.ManagedFundsNoOfShares) || 0) *
                  (parseFloat(Values.ManagedFundsCurrentPrice) || 0))
              ).toFixed(2)
            ),
      ReinvestIncome: Values.ManagedFundsReinvestIncome,
      RegInvestmentsPA: Values.ManagedFundsRegInvestmentsPA,
    };

    console.log(myData);

    if (manageFundFlag) {
      let id = Values.id;
      axios
        .patch(
          `${DefaultUrl}/api/Client-SMSF-ManagedFunds/Update-Client-ManagedFunds/${Email}/${id}`,
          myData
        )
        .then((res) => {
          console.log("Client Accumulation  Added Successfully!");
          setAccumulationFlag(false);
        });
    } else {
      // Post Api
      axios
        .post(`${DefaultUrl}/api/Client-SMSF-ManagedFunds/Add-Client-ManagedFunds`, myData)
        .then((res) => {
          console.log("data added successfully");
        });
    }

    setTimeout(() => {
      axios.get(`${DefaultUrl}/api/Client-SMSF-ManagedFunds`).then((res) => {
        let childObj = res.data;
        let childFilterObj = childObj.filter((item) => item.Email == Email);
        setManageFundList(childFilterObj);

        console.log("Client-SMSF-ManagedFunds get successfully");
      });
    }, 300);

    ManagedFundshandleClose();
  };

  let updateHandler_ManageFund = (elem) => {
    let date = new Date(elem.PurchaseDate);
    elem.PurchaseDate = date;

    let myData = {
      id: elem._id,
      ManagedFundsPlatformName: elem.PlatformName,
      ManagedFundsInvestmentName: elem.InvestmentName,
      ManagedFundsNoOfShares: elem.NoOfShares,
      ManagedFundsCurrentPrice: elem.CurrentSharePrice,
      ManagedFundsCurrentValue: elem.CurrentShareValue,
      ManagedFundsOriginalInvestment: elem.OriginalInvestment,
      ManagedFundsPurchaseDate: elem.PurchaseDate,
      ManagedFundsIncomePA: elem.IncomePA,
      ManagedFundsIncomePA2: elem.IncomePAType,
      ManagedFundsTotalIncomePA: elem.TotalIncomePA,
      ManagedFundsReinvestIncome: elem.ReinvestIncome,
      ManagedFundsRegInvestmentsPA: elem.RegInvestmentsPA,
    };

    setManageFundObj([myData]);
    setManageFundFlag(true);
    console.log(manageFundObj);
    ManagedFundshandleShow();
  };

  let deleteHandler_ManageFund = (elem) => {
    let Email = localStorage.getItem("Email");
    let id = elem._id;
    axios
      .delete(
        `${DefaultUrl}/api/Client-SMSF-ManagedFunds/Delete-Client-ManagedFunds/${Email}/${id}`
      )
      .then((res) => {
        console.log("Client ManagedFunds Delete Successfully!");
      });

    setTimeout(() => {
      axios.get(`${DefaultUrl}/api/Client-SMSF-ManagedFunds`).then((res) => {
        let childObj = res.data;
        let childFilterObj = childObj.filter((item) => item.Email == Email);
        setManageFundList(childFilterObj);

        console.log("Client-SMSF-ManagedFunds get successfully");
      });
    }, 300);
  };

  const [investmentFlag, setInvestmentFlag] = useState(false);
  const [investmentObj, setInvestmentObj] = useState([]);
  const [investmentList, setInvestmentList] = useState([]);

  let Investment_validationSchema = Yup.object({
    InvestmentPropertiesCurrentValue: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    // InvestmentPropertiesClientOwnership: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    InvestmentPropertiesCostBase: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    InvestmentPropertiesAddress: Yup.string().required("Required"),
    InvestmentPropertiesPostcode: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    InvestmentPropertiesRentalIncome: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    InvestmentPropertiesFrequency: Yup.string().required("Required"),
    InvestmentPropertiesExpensesPA: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    InvestmentPropertiesCurrentBalance: Yup.number().when(
      "InvestmentPropertiesLoanAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive value",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),

    // InvestmentPropertiesClientBorrowing: Yup.number().when('InvestmentPropertiesLoanAttached',{
    //   is: val => val && val.length === 3,
    //   then: Yup.number().required("Required").test("Is positive?", "Must be a positive value", (value) => value > 0),
    //   otherwise: Yup.number().notRequired()
    // }),
    InvestmentPropertiesLender: Yup.string().when(
      "InvestmentPropertiesLoanAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    InvestmentPropertiesRepaymentAmount: Yup.number().when(
      "InvestmentPropertiesLoanAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive value",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    InvestmentPropertiesFrequency2: Yup.string().when(
      "InvestmentPropertiesLoanAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    InvestmentPropertiesInterestRatePA: Yup.number().when(
      "InvestmentPropertiesLoanAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive value",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    InvestmentPropertiesLoanTerm: Yup.string().when(
      "InvestmentPropertiesLoanAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    InvestmentPropertiesLoanType: Yup.string().when(
      "InvestmentPropertiesLoanAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    InvestmentPropertiesDebtLoanAmount: Yup.number().when(
      "InvestmentPropertiesLoanAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive value",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    InvestmentPropertiesYearsRemaining: Yup.string().when(
      "InvestmentPropertiesLoanAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
  });

  let Investment_onSubmit = (Values) => {
    let Email = localStorage.getItem("Email");
    let id = Values.id;
    let myData = {
      Email: localStorage.getItem("Email"),
      CurrentValue: Values.InvestmentPropertiesCurrentValue,
      CostBase: Values.InvestmentPropertiesCostBase,
      PropertyAddress: Values.InvestmentPropertiesAddress,
      PostCode: Values.InvestmentPropertiesPostcode,
      RentalIncome: Values.InvestmentPropertiesRentalIncome,
      Frequency: Values.InvestmentPropertiesFrequency,
      TotalAnnualIncome:
        (parseFloat(Values.InvestmentPropertiesRentalIncome) || 0) * 52,
      ExpensesPA: Values.InvestmentPropertiesExpensesPA,
      LoanAttached: Values.InvestmentPropertiesLoanAttached,
      CurrentBalance: Values.InvestmentPropertiesCurrentBalance,

      Lender: Values.InvestmentPropertiesLender,
      RepaymentAmount: Values.InvestmentPropertiesRepaymentAmount,
      Frequency2: Values.InvestmentPropertiesFrequency2,
      AnnualRepayments:
        Values.InvestmentPropertiesFrequency2 == "Weekly"
          ? (parseFloat(Values.InvestmentPropertiesRepaymentAmount) || 0) * 52
          : Values.InvestmentPropertiesFrequency2 == "Monthly"
          ? (parseFloat(Values.InvestmentPropertiesRepaymentAmount) || 0) * 12
          : 0,
      InterestRatePA: Values.InvestmentPropertiesInterestRatePA,
      LoanTerm: Values.InvestmentPropertiesLoanTerm,
      LoanType: Values.InvestmentPropertiesLoanType,
      DebtAmountLoan: Values.InvestmentPropertiesDebtLoanAmount,
      YearsRemaining: Values.InvestmentPropertiesYearsRemaining,
    };
    console.log(myData);

    if (investmentFlag) {
      axios
        .patch(
          `${DefaultUrl}/api/Client-SMSF-InvestmentProperties/Update-Client-InvestmentProperties/${Email}/${id}`,
          myData
        )
        .then((res) => {
          console.log("Client InvestmentProperties  Updated Successfully!");
          setInvestmentFlag(false);
        });
    } else {
      // Post Api
      axios
        .post(
          `${DefaultUrl}/api/Client-SMSF-InvestmentProperties/Add-Client-InvestmentProperties`,
          myData
        )
        .then((res) => console.log("Data added successfully"));
    }

    setTimeout(() => {
      // Post Api
      axios.get(`${DefaultUrl}/api/Client-SMSF-InvestmentProperties`).then((res) => {
        console.log("Data get successfully");
        let childObj = res.data;
        let childFilterObj = childObj.filter((item) => item.Email == Email);
        setInvestmentList(childFilterObj);
      });
    }, 300);

    InvestmentPropertieshandleClose();
  };

  let updateHandler_Investment = (elem) => {
    let myData = {
      id: elem._id,
      InvestmentPropertiesCurrentValue: elem.CurrentValue,
      InvestmentPropertiesCostBase: elem.CostBase,
      InvestmentPropertiesAddress: elem.PropertyAddress,
      InvestmentPropertiesPostcode: elem.PostCode,
      InvestmentPropertiesRentalIncome: elem.RentalIncome,
      InvestmentPropertiesFrequency: elem.Frequency,
      InvestmentPropertiesTotalAnnualIncome: elem.TotalAnnualIncome,
      InvestmentPropertiesExpensesPA: elem.ExpensesPA,
      InvestmentPropertiesLoanAttached: elem.LoanAttached,
      InvestmentPropertiesCurrentBalance: elem.CurrentBalance,

      InvestmentPropertiesLender: elem.Lender,
      InvestmentPropertiesRepaymentAmount: elem.RepaymentAmount,
      InvestmentPropertiesFrequency2: elem.Frequency2,
      InvestmentPropertiesAnnualRepayment: elem.AnnualRepayments,
      InvestmentPropertiesInterestRatePA: elem.InterestRatePA,
      InvestmentPropertiesLoanTerm: elem.LoanTerm,
      InvestmentPropertiesLoanType: elem.LoanType,
      InvestmentPropertiesDebtLoanAmount: elem.DebtAmountLoan,
      InvestmentPropertiesYearsRemaining: elem.YearsRemaining,
    };

    setInvestmentObj([myData]);
    setInvestmentFlag(true);
    InvestmentPropertieshandleShow();
  };

  let deleteHandler_Investment = (elem) => {
    let email = localStorage.getItem("Email");
    let id = elem._id;

    axios
      .delete(
        `${DefaultUrl}/api/Client-SMSF-InvestmentProperties/Delete-Client-InvestmentProperties/${email}/${id}`
      )
      .then((res) => {
        //Popper Massage
        console.log("Client Investment  Deleted Successfully!");
      });

    setTimeout(() => {
      // Post Api
      axios.get(`${DefaultUrl}/api/Client-SMSF-InvestmentProperties`).then((res) => {
        console.log("Data get successfully");
        let childObj = res.data;
        let childFilterObj = childObj.filter((item) => item.Email == email);
        setInvestmentList(childFilterObj);
      });
    }, 300);
  };

  const [show4, setShow4] = useState(false);
  const handleClose4 = () => {
    setShow4(false);
    setAustralianLoanFlag(false);
  };
  const handleShow4 = () => setShow4(true);

  const [AustralianLoanFlag, setAustralianLoanFlag] = useState(false);
  const [AustralianLoanObj, setAustralianLoanObj] = useState([]);
  const [AustralianLoanList, setAustralianLoanList] = useState([]);

  let Australian_loansAssociated_initialValues = {
    AustralianPortfolioLoanType: "",
    AustralianPortfolioCurrentBalance: "",
    AustralianPortfolioLender: "",
    AustralianInterestRatePA: "",

    AustralianPortfolioRepaymentAmount: "",
    AustralianPortfolioFrequency: "",
    AustralianPortfolioAnnualRepayment: "", //readonly

    AustralianPortfolioLoanTerm: "",
    AustralianPortfolioLoanType2: "",
    AustralianPortfolioDeductibleLoanAmount: "",
    AustralianPortfolioYearRemaining: "",
  };
  let Australian_loansAssociated_validationSchema = Yup.object({
    AustralianPortfolioLoanType: Yup.string().required("Required"),
    AustralianPortfolioCurrentBalance: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),

    AustralianPortfolioLender: Yup.string().required("Required"),
    AustralianPortfolioRepaymentAmount: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),

    AustralianPortfolioFrequency: Yup.string().required("Required"),
    AustralianInterestRatePA: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),

    AustralianPortfolioLoanTerm: Yup.string().required("Required"),
    AustralianPortfolioLoanType2: Yup.string().required("Required"),

    AustralianPortfolioDeductibleLoanAmount: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),

    AustralianPortfolioYearRemaining: Yup.string().required("Required"),
  });
  let Australian_loansAssociated_onSubmit = (values) => {
    let Email = localStorage.getItem("Email");

    let myData = {
      Email: localStorage.getItem("Email"),
      AustralianPortfolioLoanType: values.AustralianPortfolioLoanType,
      AustralianPortfolioCurrentBalance:
        values.AustralianPortfolioCurrentBalance,
      AustralianPortfolioLender: values.AustralianPortfolioLender,
      AustralianInterestRatePA: values.AustralianInterestRatePA,

      AustralianPortfolioRepaymentAmount:
        values.AustralianPortfolioRepaymentAmount,
      AustralianPortfolioFrequency: values.AustralianPortfolioFrequency,
      AustralianPortfolioAnnualRepayment:
        values.AustralianPortfolioFrequency == ""
          ? 0
          : values.AustralianPortfolioFrequency == "Weekly"
          ? (parseFloat(values.AustralianPortfolioRepaymentAmount) || 0) * 52
          : values.AustralianPortfolioFrequency == "Fortnightly"
          ? (parseFloat(values.AustralianPortfolioRepaymentAmount) || 0) * 26
          : values.AustralianPortfolioFrequency == "Monthly"
          ? (parseFloat(values.AustralianPortfolioRepaymentAmount) || 0) * 12
          : (parseFloat(values.AustralianPortfolioRepaymentAmount) || 0) * 1, //AustralianPortfolioAnnualRepayment:'', //readonly

      AustralianPortfolioLoanTerm: values.AustralianPortfolioLoanTerm,
      AustralianPortfolioLoanType2: values.AustralianPortfolioLoanType2,
      AustralianPortfolioDeductibleLoanAmount:
        values.AustralianPortfolioDeductibleLoanAmount,
      AustralianPortfolioYearRemaining: values.AustralianPortfolioYearRemaining,
    };
    console.log(myData);

    if (AustralianLoanFlag) {
      let id = values.id;

      axios
        .patch(
          `${DefaultUrl}/api/Client-SMSF-AustralianSharePortfolio/Update-Client-Australian-Market-Portfolio/${Email}/${id}`,
          myData
        )
        .then((res) => {
          console.log("Client AustralianSharePortfolio  updated Successfully!");
          setAustralianLoanFlag(false);
        });
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Client-SMSF-AustralianSharePortfolio/Add-Client-Australian-Market-Portfolio`,
          myData
        )
        .then((res) => {
          console.log("Australian Share Portfolio Added Successfully ...!");
        });
    }

    handleClose4();
    setTimeout(() => {
      axios
        .get(
          `${DefaultUrl}/api/Client-SMSF-AustralianSharePortfolio/Australian-Market-Portfolio`
        )
        .then((res) => {
          let childObj = res.data;
          let childFilterObj = childObj.filter((item) => item.Email == Email);

          console.log("Australian Share Portfolio get Successfully ...!");
          setAustralianLoanList(childFilterObj);
        });
    }, 300);
  };

  let updateHandler_AustralianLoan = (elem) => {
    let myData = {
      id: elem._id,
      AustralianPortfolioLoanType: elem.AustralianPortfolioLoanType,
      AustralianPortfolioCurrentBalance: elem.AustralianPortfolioCurrentBalance,
      AustralianPortfolioLender: elem.AustralianPortfolioLender,
      AustralianInterestRatePA: elem.AustralianInterestRatePA,

      AustralianPortfolioRepaymentAmount:
        elem.AustralianPortfolioRepaymentAmount,
      AustralianPortfolioFrequency: elem.AustralianPortfolioFrequency,
      AustralianPortfolioAnnualRepayment:
        elem.AustralianPortfolioAnnualRepayment,

      AustralianPortfolioLoanTerm: elem.AustralianPortfolioLoanTerm,
      AustralianPortfolioLoanType2: elem.AustralianPortfolioLoanType2,
      AustralianPortfolioDeductibleLoanAmount:
        elem.AustralianPortfolioDeductibleLoanAmount,
      AustralianPortfolioYearRemaining: elem.AustralianPortfolioYearRemaining,
    };

    setAustralianLoanObj([myData]);
    setAustralianLoanFlag(true);
    handleShow4();
  };

  let deleteHandler_AustralianLoan = (elem) => {
    let email = localStorage.getItem("Email");
    let id = elem._id;

    axios
      .delete(
        `${DefaultUrl}/api/Client-SMSF-AustralianSharePortfolio/Delete-Client-Australian-Market-Portfolio/${email}/${id}`
      )
      .then((res) => {
        //Popper Massage
        console.log("Client AustralianSharePortfolio  Delete Successfully!");
      });

    setTimeout(() => {
      axios
        .get(
          `${DefaultUrl}/api/Client-SMSF-AustralianSharePortfolio/Australian-Market-Portfolio`
        )
        .then((res) => {
          let childObj = res.data;
          let childFilterObj = childObj.filter((item) => item.Email == email);

          console.log("Australian Share Portfolio get Successfully ...!");
          setAustralianLoanList(childFilterObj);
        });
    }, 300);
  };

  const [show6, setShow6] = useState(false);
  const handleClose6 = () => {
    setShow6(false);
    setManageLoanFlag(false);
  };
  const handleShow6 = () => setShow6(true);

  const [manageLoanFlag, setManageLoanFlag] = useState(false);
  const [manageFundLoanObj, setManageFundLoanObj] = useState([]);
  const [manageLoanList, setManageLoanList] = useState([]);

  let manageFundPortfolio_initialValues = {
    Typeofloan: "",
    CurrentBalance: "",
    Lender: "",
    RepaymentsAmount: "",
    Frequency: "",
    managedAnnualRepayments: "", //readonly
    InterestRatePA: "",
    LoanTermInYears: "",
    LoanType: "",
    DeductibleAmountofLoan: "",
    YearRemaning: "",
  };

  let manageFundPortfolio_validationSchema = Yup.object({
    Typeofloan: Yup.string().required("Required"),
    CurrentBalance: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),

    Lender: Yup.string().required("Required"),
    RepaymentsAmount: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Frequency: Yup.string().required("Required"),

    LoanTermInYears: Yup.string().required("Required"),
    LoanType: Yup.string().required("Required"),
    DeductibleAmountofLoan: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    YearRemaning: Yup.string().required("Required"),
  });

  let manageFundPortfolio_onSubmit = (values) => {
    let Email = localStorage.getItem("Email");

    let myData = {
      Email: localStorage.getItem("Email"),
      ManagedFundsPortfolioLoanType: values.Typeofloan,
      ManagedFundsPortfolioCurrentBalance: values.CurrentBalance,
      ManagedFundsPortfolioLender: values.Lender,

      ManagedFundsPortfolioRepaymentAmount: values.RepaymentsAmount,
      ManagedFundsPortfolioFrequency: values.Frequency,

      ManagedFundsPortfolioAnnualRepayments:
        values.Frequency == ""
          ? 0
          : values.Frequency == "Weekly"
          ? (parseFloat(values.RepaymentsAmount) || 0) * 52
          : values.Frequency == "Fortnightly"
          ? (parseFloat(values.RepaymentsAmount) || 0) * 26
          : values.Frequency == "Monthly"
          ? (parseFloat(values.RepaymentsAmount) || 0) * 12
          : (parseFloat(values.RepaymentsAmount) || 0) * 1, //  managedAnnualRepayments, //readonly
      ManagedFundsPortfolioInterestRatePA: values.InterestRatePA,

      ManagedFundsPortfolioLoanTerm: values.LoanTermInYears,
      ManagedFundsPortfolioLoanType2: values.LoanType,
      ManagedFundsPortfolioDeductibleLoanAmount: values.DeductibleAmountofLoan,
      ManagedFundsPortfolioYearRemaining: values.YearRemaning,
    };

    if (manageLoanFlag) {
      let id = values.id;

      axios
        .patch(
          `${DefaultUrl}/api/Client-SMSF-ManagedFundsPortfolio/Update-Client-ManagedFunds-Portfolio/${Email}/${id}`,
          myData
        )
        .then((res) => {
          console.log("Client ManagedFundsPortfolio Update Successfully!");
          setManageLoanFlag(false);
        });
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Client-SMSF-ManagedFundsPortfolio/Add-Client-ManagedFunds-Portfolio`,
          myData
        )
        .then((res) => {
          console.log("ManagedFunds Portfolio Added Successfully ...!");
        });
    }

    setTimeout(() => {
      axios.get(`${DefaultUrl}/api/Client-SMSF-ManagedFundsPortfolio`).then((res) => {
        let childObj = res.data;
        let childFilterObj = childObj.filter((item) => item.Email == Email);

        setManageLoanList(childFilterObj);
        console.log("ManagedFunds Portfolio Get Successfully ...!");
      });
    }, 300);

    handleClose6();
  };

  let updateHandler_ManageLoan = (elem) => {
    let myData = {
      id: elem._id,
      Typeofloan: elem.ManagedFundsPortfolioLoanType,
      CurrentBalance: elem.ManagedFundsPortfolioCurrentBalance,
      Lender: elem.ManagedFundsPortfolioLender,
      RepaymentsAmount: elem.ManagedFundsPortfolioRepaymentAmount,
      Frequency: elem.ManagedFundsPortfolioFrequency,
      managedAnnualRepayments: elem.ManagedFundsPortfolioAnnualRepayments, //  managedAnnualRepayments, //readonly
      InterestRatePA: elem.ManagedFundsPortfolioInterestRatePA,
      LoanTermInYears: elem.ManagedFundsPortfolioLoanTerm,
      LoanType: elem.ManagedFundsPortfolioLoanType2,
      DeductibleAmountofLoan: elem.ManagedFundsPortfolioDeductibleLoanAmount,
      YearRemaning: elem.ManagedFundsPortfolioYearRemaining,
    };
    console.log(myData);
    setManageFundLoanObj([myData]);
    setManageLoanFlag(true);

    handleShow6();
  };

  let deleteHandler_ManageLoan = (elem) => {
    let email = localStorage.getItem("Email");
    let id = elem._id;

    axios
      .delete(
        `${DefaultUrl}/api/Client-SMSF-ManagedFundsPortfolio/Delete-Client-ManagedFunds-Portfolio/${email}/${id}`
      )
      .then((res) => {
        //Popper Massage
        console.log("Client ManagedFundsPortfolio  Delete Successfully!");
      });

    setTimeout(() => {
      axios.get(`${DefaultUrl}/api/Client-SMSF-ManagedFundsPortfolio`).then((res) => {
        let childObj = res.data;
        let childFilterObj = childObj.filter((item) => item.Email == email);

        setManageLoanList(childFilterObj);
        console.log("ManagedFunds Portfolio Get Successfully ...!");
      });
    }, 300);
  };

  // NESTED BENFICIARIES MODAL STATES
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => {
    setShow3(false);
    setBeneficiariesFlag(false);
  };
  const handleShow3 = () => setShow3(true);

  // CLIENT SUPER ACCOUNT --> BENEFICIARIES
  let initialValues_Beneficiaries = {
    beneficiariesAttached: "No",
    NomiationTypeBeneficiary: "",
    BeneficiariesOptionDetailsBeneficiaries: "",

    Beneficiary1: "",
    ShareofBenefit1: "",
    RelationshipOptionDetailsRelationship1: "",

    Beneficiary2: "",
    ShareofBenefit2: "",
    RelationshipOptionDetailsRelationship2: "",

    Beneficiary3: "",
    ShareofBenefit3: "",
    RelationshipOptionDetailsRelationship3: "",

    Beneficiary4: "",
    ShareofBenefit4: "",
    RelationshipOptionDetailsRelationship4: "",

    Beneficiary5: "",
    ShareofBenefit5: "",
    RelationshipOptionDetailsRelationship5: "",
  };
  let validateSchema_Beneficiaries = Yup.object({
    NomiationTypeBeneficiary: Yup.string().when("beneficiariesAttached", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    BeneficiariesOptionDetailsBeneficiaries: Yup.string().when(
      ["beneficiariesAttached", "NomiationTypeBeneficiary"],
      {
        is: (value1, value2) =>
          value1 == "No" || value2 == "Legal Representative(Your Estate)",
        then: Yup.string().notRequired(),
        otherwise: Yup.string().required("Required"),
      }
    ),
    Beneficiary1: Yup.string().when("BeneficiariesOptionDetailsBeneficiaries", {
      is: (val) => val && val >= parseFloat("1"),
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ShareofBenefit1: Yup.number().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("1"),
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Amount must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    RelationshipOptionDetailsRelationship1: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("1"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),

    Beneficiary2: Yup.string().when("BeneficiariesOptionDetailsBeneficiaries", {
      is: (val) => val && val >= parseFloat("2"),
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ShareofBenefit2: Yup.number().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("2"),
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Amount must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    RelationshipOptionDetailsRelationship2: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("2"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),

    Beneficiary3: Yup.string().when("BeneficiariesOptionDetailsBeneficiaries", {
      is: (val) => val && val >= parseFloat("3"),
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ShareofBenefit3: Yup.number().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("3"),
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Amount must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    RelationshipOptionDetailsRelationship3: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("3"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),

    Beneficiary4: Yup.string().when("BeneficiariesOptionDetailsBeneficiaries", {
      is: (val) => val && val >= parseFloat("4"),
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ShareofBenefit4: Yup.number().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("4"),
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Amount must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    RelationshipOptionDetailsRelationship4: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("4"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),

    Beneficiary5: Yup.string().when("BeneficiariesOptionDetailsBeneficiaries", {
      is: (val) => val && val >= parseFloat("5"),
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ShareofBenefit5: Yup.number().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("5"),
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Amount must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),

    RelationshipOptionDetailsRelationship5: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("5"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
  });

  const [BeneficiaryDataList, setBeneficiaryDataList] = useState([]);
  const [BeneficiariesObj, setBeneficiariesObj] = useState([]);
  const [BeneficiariesFlag, setBeneficiariesFlag] = useState(false);

  let onSubmit_Beneficiaries = (values) => {
    handleClose3();
    let Email = localStorage.getItem("Email");
    let id = values.id;

    let BeneficiaryData = {
      Email: localStorage.getItem("Email"),
      NominatedBeneficiary: values.beneficiariesAttached,
      NominationType: values.NomiationTypeBeneficiary,
      No_ofBeneficiaries: values.BeneficiariesOptionDetailsBeneficiaries,

      Beneficiary1: values.Beneficiary1,
      BenefitShare1: values.ShareofBenefit1,
      Relationship1: values.RelationshipOptionDetailsRelationship1,

      Beneficiary2: values.Beneficiary2,
      BenefitShare2: values.ShareofBenefit2,
      Relationship2: values.RelationshipOptionDetailsRelationship2,

      Beneficiary3: values.Beneficiary3,
      BenefitShare3: values.ShareofBenefit3,
      Relationship3: values.RelationshipOptionDetailsRelationship3,

      Beneficiary4: values.Beneficiary4,
      BenefitShare4: values.ShareofBenefit4,
      Relationship4: values.RelationshipOptionDetailsRelationship4,

      Beneficiary5: values.Beneficiary5,
      BenefitShare5: values.ShareofBenefit5,
      Relationship5: values.RelationshipOptionDetailsRelationship5,
    };

    if (BeneficiariesFlag == true) {
      axios
        .patch(
          `${DefaultUrl}/api/Client-SMSF-Beneficiary/Update-Client-Beneficiary/${Email}/${id}`,
          BeneficiaryData
        )
        .then((res) => {
          console.log("Client Accumulation  updated Successfully!");
          setBeneficiariesFlag(false);
        });

      setTimeout(() => {
        axios.get(`${DefaultUrl}/api/Client-SMSF-Beneficiary`).then((res) => {
          let childObj = res.data;
          let childFilterObj = childObj.filter((item) => item.Email == Email);
          setBeneficiaryDataList(childFilterObj);

          console.log("BeneficiaryData get successfully");
        });
      }, 300);
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Client-SMSF-Beneficiary/Add-Client-Beneficiary`,
          BeneficiaryData
        )
        .then((res) => {
          console.log("BeneficiaryData added successfully");
        });

      setTimeout(() => {
        axios.get(`${DefaultUrl}/api/Client-SMSF-Beneficiary`).then((res) => {
          let childObj = res.data;
          let childFilterObj = childObj.filter((item) => item.Email == Email);
          setBeneficiaryDataList(childFilterObj);

          console.log("BeneficiaryData get successfully");
        });
      }, 300);

      console.log(BeneficiaryData);
    }
  };

  // NESTED CONTRIBUTIONS MODAL STATES

  const [contributionShow, setcontributionShow] = useState(false);
  const contributionHandleClose = () => {
    setcontributionShow(false);
    setContributionFlag(false);
  };
  const handlecontributionShow = () => setcontributionShow(true);
  const [contributionModal, setcontributionModal] = useState([]);

  // CLIENT SUPER ACCOUNT --> CONTRIBUTIONS
  let initialValues_Contribution = {
    contributeFundRadio: "No",
    Non_Concessional1: "",
    Other1: "",
    EmployerContributions1: "",
    SalarySacAndPersonalDed1: "",

    Non_Concessional2: "",
    Other2: "",
    EmployerContributions2: "",
    SalarySacAndPersonalDed2: "",

    Non_Concessional3: "",
    Other3: "",
    EmployerContributions3: "",
    SalarySacAndPersonalDed3: "",
  };
  let validateSchema_Contribution = Yup.object({
    Non_Concessional1: Yup.number().when("contributeFundRadio", {
      is: (val) => val && val.length == 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Amount must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),

    Other1: Yup.number().when("contributeFundRadio", {
      is: (val) => val && val.length == 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Amount must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    EmployerContributions1: Yup.number().when("contributeFundRadio", {
      is: (val) => val && val.length == 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Amount must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    SalarySacAndPersonalDed1: Yup.number().when("contributeFundRadio", {
      is: (val) => val && val.length == 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Amount must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),

    Non_Concessional2: Yup.number().when("contributeFundRadio", {
      is: (val) => val && val.length == 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Amount must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    Other2: Yup.number().when("contributeFundRadio", {
      is: (val) => val && val.length == 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Amount must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    EmployerContributions2: Yup.number().when("contributeFundRadio", {
      is: (val) => val && val.length == 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Amount must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    SalarySacAndPersonalDed2: Yup.number().when("contributeFundRadio", {
      is: (val) => val && val.length == 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Amount must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),

    Non_Concessional3: Yup.number().when("contributeFundRadio", {
      is: (val) => val && val.length == 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Amount must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    Other3: Yup.number().when("contributeFundRadio", {
      is: (val) => val && val.length == 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Amount must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    EmployerContributions3: Yup.number().when("contributeFundRadio", {
      is: (val) => val && val.length == 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Amount must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    SalarySacAndPersonalDed3: Yup.number().when("contributeFundRadio", {
      is: (val) => val && val.length == 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Amount must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
  });

  const [ContributionObj, setContributionObj] = useState([]);
  const [ContributionFlag, setContributionFlag] = useState(false);
  let on_Submit_Contribution = (values) => {
    contributionHandleClose();
    // console.log(values)

    let Email = localStorage.getItem("Email");
    let id = values.id;
    let ContributionData = {
      Email: localStorage.getItem("Email"),
      ContributeFund: values.contributeFundRadio,
      NonConcessional1: values.Non_Concessional1,
      Other1: values.Other1,
      EmployerContributions1: values.EmployerContributions1,
      SalaryPersonalDed1: values.SalarySacAndPersonalDed1,

      NonConcessional2: values.Non_Concessional2,
      Other2: values.Other2,
      EmployerContributions2: values.EmployerContributions2,
      SalaryPersonalDed2: values.SalarySacAndPersonalDed2,

      NonConcessional3: values.Non_Concessional3,
      Other3: values.Other3,
      EmployerContributions3: values.EmployerContributions3,
      SalaryPersonalDed3: values.SalarySacAndPersonalDed3,
    };

    if (ContributionFlag == true) {
      axios
        .patch(
          `${DefaultUrl}/api/Client-SMSF-Contribution/Update-Client-Contribution/${Email}/${id}`,
          ContributionData
        )
        .then((res) => {
          console.log("Client Contribution  updated Successfully!");
          setContributionFlag(false);
        });

      setTimeout(() => {
        axios.get(`${DefaultUrl}/api/Client-SMSF-Contribution`).then((res) => {
          console.log("Contribution Data get Successfully...!");

          let childObj = res.data;
          let childFilterObj = childObj.filter((item) => item.Email == Email);
          setcontributionModal(childFilterObj);
        });
      }, 300);
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Client-SMSF-Contribution/Add-Client-Contribution`,
          ContributionData
        )
        .then((res) => {
          console.log("Contribution Data Added Successfully...!");
        });

      setTimeout(() => {
        axios.get(`${DefaultUrl}/api/Client-SMSF-Contribution`).then((res) => {
          console.log("Contribution Data get Successfully...!");

          let childObj = res.data;
          let childFilterObj = childObj.filter((item) => item.Email == Email);
          setcontributionModal(childFilterObj);
        });
      }, 300);
    }
  };

  let updateHandler_Contribution = (values) => {
    let ContributionData = {
      id: values._id,
      contributeFundRadio: values.ContributeFund,
      Non_Concessional1: values.NonConcessional1,
      Other1: values.Other1,
      EmployerContributions1: values.EmployerContributions1,
      SalarySacAndPersonalDed1: values.SalaryPersonalDed1,

      Non_Concessional2: values.NonConcessional2,
      Other2: values.Other2,
      EmployerContributions2: values.EmployerContributions2,
      SalarySacAndPersonalDed2: values.SalaryPersonalDed2,

      Non_Concessional3: values.NonConcessional3,
      Other3: values.Other3,
      EmployerContributions3: values.EmployerContributions3,
      SalarySacAndPersonalDed3: values.SalaryPersonalDed3,
    };
    handlecontributionShow();
    setContributionObj([ContributionData]);
    setContributionFlag(true);
  };

  let deleteHandler_Contribution = (elem, index) => {
    let Email = localStorage.getItem("Email");
    let id = elem._id;

    axios
      .delete(
        `${DefaultUrl}/api/Client-SMSF-Contribution/Delete-Client-Contribution/${Email}/${id}`
      )
      .then((res) => {
        console.log("Contribution Deleted successfully");
      });

    setTimeout(() => {
      axios.get(`${DefaultUrl}/api/Client-SMSF-Contribution`).then((res) => {
        console.log("Contribution Data get Successfully...!");

        let childObj = res.data;
        let childFilterObj = childObj.filter((item) => item.Email == Email);
        setcontributionModal(childFilterObj);
      });
    }, 300);
  };

  return (
    <div className="container-fluid">
      <Card className="shadow px-4 mx-3">
        <div className="row my-3">
          <div className="col-md-12 text-center">
            <h3 className="mt-3">SMSF</h3>
          </div>
        </div>

        <div className="row my-3">
          <div className="col-md-12">
            <Formik
              initialValues={initialValues}
              // validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({ values, handleChange, handleBlur, setFieldValue }) => (
                <Form>
                  {CRObject.QuestionSMSF == "Yes" && (
                    <div>
                      {/* SMSF Details */}
                      <div className="mb-5">
                        {/*  <h3 className="">SMSF</h3>
                    Solicitor */}
                        <div className=" ">
                          <div className="row">
                            <div className="col-6 mb-3">
                              <label
                                htmlFor="SMSFFundName"
                                className="form-label"
                              >
                                Fund Name
                              </label>
                            </div>
                            <div className="col-6 mb-3">
                              <Field
                                name="SMSFFundName"
                                id="SMSFFundName"
                                className="form-control shadow inputDesign"
                                placeholder="Fund Name"
                              />
                              <ErrorMessage
                                name="SMSFFundName"
                                component="div"
                                className="text-danger fw-bold"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6 mb-3">
                              <label
                                htmlFor="SMSFFundType"
                                className="form-label"
                              >
                                Fund Type
                              </label>
                            </div>
                            <div className="col-6 mb-3">
                              <Field
                                as="select"
                                name="SMSFFundType"
                                id="SMSFFundType"
                                className="form-select shadow  inputDesign"
                              >
                                <option value="">Select</option>
                                <option value="SMSF">SMSF</option>
                                <option value="Small APRA Fund (ASF)">
                                  Small APRA Fund (ASF)
                                </option>
                              </Field>
                              <ErrorMessage
                                name="SMSFFundType"
                                component="div"
                                className="text-danger fw-bold"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6 mb-3">
                              <label htmlFor="SMSFABN" className="form-label">
                                ABN
                              </label>
                            </div>
                            <div className="col-6 mb-3">
                              <Field
                                type="number"
                                className="form-control shadow inputDesign"
                                id="SMSFABN"
                                name="SMSFABN"
                                placeholder="ABN"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="SMSFABN"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6 mb-3">
                              <label
                                htmlFor="SMSFTrusteeType"
                                className="form-label"
                              >
                                Trustee Type
                              </label>
                            </div>
                            <div className="col-6 mb-3">
                              <Field
                                as="select"
                                name="SMSFTrusteeType"
                                id="SMSFTrusteeType"
                                className="form-select shadow  inputDesign"
                              >
                                <option value="">Select</option>
                                <option value="Individual">Individual</option>
                                <option value="Corporate">Corporate</option>
                              </Field>
                              <ErrorMessage
                                name="SMSFTrusteeType"
                                component="div"
                                className="text-danger fw-bold"
                              />
                            </div>
                          </div>
                          {values.SMSFTrusteeType == "Corporate" && (
                            <div className="row">
                              <div className="col-6 mb-3">
                                <label
                                  htmlFor="SMSFTrusteeName"
                                  className="form-label"
                                >
                                  Corporate Trustee Name
                                </label>
                              </div>
                              <div className="col-6 mb-3">
                                <Field
                                  type="text"
                                  className="form-control shadow inputDesign"
                                  id="SMSFTrusteeName"
                                  name="SMSFTrusteeName"
                                  placeholder="Corporate Trustee Name"
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="SMSFTrusteeName"
                                />
                              </div>
                            </div>
                          )}
                          <div className="row">
                            <div className="col-6 mb-3">
                              <label
                                htmlFor="SMSFEstablishmentDate"
                                className="form-label"
                              >
                                Establishment Date
                              </label>
                            </div>

                            <div className="col-6 mb-3">
                              <div>
                                <DatePicker
                                  className="form-control inputDesign shadow"
                                  showIcon
                                  id="SMSFEstablishmentDate"
                                  name="SMSFEstablishmentDate"
                                  selected={values.SMSFEstablishmentDate}
                                  onChange={(date) =>
                                    setFieldValue("SMSFEstablishmentDate", date)
                                  }
                                  dateFormat="dd/MM/yyyy"
                                  placeholderText="dd/mm/yyyy"
                                  maxDate={new Date()}
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                  onBlur={handleBlur}
                                />
                              </div>

                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="SMSFEstablishmentDate"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6 mb-3">
                              <label className="form-label">
                                Are assets segregated?
                              </label>
                            </div>
                            {/* switch button style */}
                            <div className="col-6 mb-3">
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="SMSFAssetsSegregated"
                                    id="SMSFAssetsSegregatedOpt1"
                                    value="Yes"
                                    onChange={handleChange}
                                    checked={
                                      values.SMSFAssetsSegregated === "Yes"
                                    }
                                  />
                                  <label
                                    htmlFor="SMSFAssetsSegregatedOpt1"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="SMSFAssetsSegregated"
                                    id="SMSFAssetsSegregatedOpt2"
                                    value="No"
                                    onChange={handleChange}
                                    checked={
                                      values.SMSFAssetsSegregated === "No"
                                    }
                                  />
                                  <label
                                    htmlFor="SMSFAssetsSegregatedOpt2"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6 mb-3">
                              <label className="form-label">
                                Does the trust deed allow for borrowing to
                                invest?
                              </label>
                            </div>
                            {/* switch button style */}
                            <div className="col-6 mb-3">
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="SMSFBorrowingInvestment"
                                    id="SMSFBorrowingInvestmentOpt1"
                                    value="Yes"
                                    onChange={handleChange}
                                    checked={
                                      values.SMSFBorrowingInvestment === "Yes"
                                    }
                                  />
                                  <label
                                    htmlFor="SMSFBorrowingInvestmentOpt1"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="SMSFBorrowingInvestment"
                                    id="SMSFBorrowingInvestmentOpt2"
                                    value="No"
                                    onChange={handleChange}
                                    checked={
                                      values.SMSFBorrowingInvestment === "No"
                                    }
                                  />
                                  <label
                                    htmlFor="SMSFBorrowingInvestmentOpt2"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6 mb-3">
                              <label className="form-label">
                                Does the trust deed allow for trustee to acquire
                                insurances and pay premiums?
                              </label>
                              {/* switch button style */}
                            </div>
                            <div className="col-6 mb-3">
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="SMSFAcquiringInsurances"
                                    id="SMSFAcquiringInsurancesOpt1"
                                    value="Yes"
                                    onChange={handleChange}
                                    checked={
                                      values.SMSFAcquiringInsurances === "Yes"
                                    }
                                  />
                                  <label
                                    htmlFor="SMSFAcquiringInsurancesOpt1"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="SMSFAcquiringInsurances"
                                    id="SMSFAcquiringInsurancesOpt2"
                                    value="No"
                                    onChange={handleChange}
                                    checked={
                                      values.SMSFAcquiringInsurances === "No"
                                    }
                                  />
                                  <label
                                    htmlFor="SMSFAcquiringInsurancesOpt2"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6 mb-3">
                              <label
                                htmlFor="SMSFAccountant"
                                className="form-label"
                              >
                                Name of Accountant
                              </label>
                            </div>
                            <div className="col-6 mb-3">
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="SMSFAccountant"
                                name="SMSFAccountant"
                                placeholder="Accountant Name"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="SMSFAccountant"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6 mb-3">
                              <label
                                htmlFor="SMSFAuditor"
                                className="form-label"
                              >
                                Name of Auditor
                              </label>
                            </div>
                            <div className="col-6 mb-3">
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="SMSFAuditor"
                                name="SMSFAuditor"
                                placeholder="Auditor Name"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="SMSFAuditor"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6 mb-3">
                              <label
                                htmlFor="SMSFAccountingAuditing"
                                className="form-label"
                              >
                                Accounting & Auditing
                              </label>
                            </div>
                            <div className="col-6 mb-3">
                              <Field
                                type="number"
                                className="form-control shadow inputDesign"
                                id="SMSFAccountingAuditing"
                                name="SMSFAccountingAuditing"
                                placeholder="Accounting & Auditing"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="SMSFAccountingAuditing"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6 mb-3">
                              <label
                                htmlFor="SMSFATOLevy"
                                className="form-label"
                              >
                                ATO Levy
                              </label>
                            </div>
                            <div className="col-6 mb-3">
                              <Field
                                type="number"
                                className="form-control shadow inputDesign"
                                id="SMSFATOLevy"
                                name="SMSFATOLevy"
                                placeholder="ATO Levy"
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="SMSFATOLevy"
                              />
                            </div>
                          </div>
                        </div>
                        {/* Solicitor */}

                        {/* Bank Account Detail Form */}

                        {/* ---------------------------------------------------- */}
                      </div>
                      {/* SMSF Details */}

                      {/* Beneficiaries innner modal now here */}
                      {/* NESTED BENFICIARIES MODAL */}
                      <Modal
                        show={show3}
                        onHide={handleClose3}
                        backdrop="static"
                        className="modal-lg"
                        keyboard={false}
                      >
                        <Modal.Header
                          className="text-light modalBG "
                          closeButton
                        >
                          <Modal.Title className="fontStyle">
                            Beneficiaries Details
                          </Modal.Title>
                        </Modal.Header>
                        <Formik
                          initialValues={
                            BeneficiariesFlag
                              ? BeneficiariesObj[0]
                              : initialValues_Beneficiaries
                          }
                          validationSchema={validateSchema_Beneficiaries}
                          onSubmit={onSubmit_Beneficiaries}
                          enableReinitialize
                        >
                          {({
                            values,
                            handleChange,
                            setFieldValue,
                            formik,
                          }) => (
                            <Form>
                              <Modal.Body>
                                {/* Family Assets Details*/}

                                <div className="">
                                  <label className="form-label">
                                    Do you have any Beneficiaries on
                                    the Account?
                                  </label>
                                  {/* switch button style */}
                                  <div className="form-check form-switch m-0 p-0 ">
                                    <div className="radiobutton">
                                      <input
                                        type="radio"
                                        name="beneficiariesAttached"
                                        id="beneficiariesAttached1"
                                        value="Yes"
                                        //  onClick={() => beneficiariesRadioHandler("Yes")}
                                        onChange={handleChange}
                                        checked={
                                          values.beneficiariesAttached === "Yes"
                                        }
                                      />
                                      <label
                                        htmlFor="beneficiariesAttached1"
                                        className="label1"
                                      >
                                        <span>YES</span>
                                      </label>
                                      <input
                                        type="radio"
                                        name="beneficiariesAttached"
                                        id="beneficiariesAttached2"
                                        value="No"
                                        //onClick={() => beneficiariesRadioHandler("No")}
                                        onChange={handleChange}
                                        checked={
                                          values.beneficiariesAttached === "No"
                                        }
                                      />
                                      <label
                                        htmlFor="beneficiariesAttached2"
                                        className="label2"
                                      >
                                        <span>NO</span>
                                      </label>
                                    </div>
                                  </div>
                                  {values.beneficiariesAttached === "Yes" && (
                                    <div>
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="mb-3 mt-5">
                                            <label
                                              htmlFor="NomiationTypeBeneficiary"
                                              className="form-label"
                                            >
                                              Nomination Type
                                            </label>
                                            <Field
                                              as="select"
                                              id="NomiationTypeBeneficiary"
                                              name="NomiationTypeBeneficiary"
                                              className="form-select shadow  inputDesign"
                                              onChange={(e) => {
                                                let thisVal = e.target.value;
                                                handleChange(e);
                                                if (
                                                  thisVal ==
                                                  "Legal Representative(Your Estate)"
                                                ) {
                                                  handleChange({
                                                    target: {
                                                      name: "BeneficiariesOptionDetailsBeneficiaries",
                                                      value: "",
                                                    },
                                                  });
                                                }
                                              }}
                                              value={
                                                values.NomiationTypeBeneficiary
                                              }
                                            >
                                              <option value="">Select</option>
                                              <option value="Non-Lapsing Binding Death Nominations">
                                                Non-Lapsing Binding Death
                                                Nominations
                                              </option>
                                              <option value="Binding Death Nominations">
                                                Binding Death Nominations
                                              </option>
                                              <option value="Non-Binding Death Nominations">
                                                Non-Binding Death Nominations
                                              </option>
                                              <option value="Legal Representative(Your Estate)">
                                                Legal Representative(Your
                                                Estate)
                                              </option>
                                              <option value="Reversionary Beneficiary">
                                                Reversionary Beneficiary
                                              </option>
                                            </Field>
                                            <ErrorMessage
                                              component="div"
                                              className="text-danger fw-bold"
                                              name="NomiationTypeBeneficiary"
                                            />
                                          </div>
                                        </div>

                                        {values.NomiationTypeBeneficiary ==
                                          "Legal Representative(Your Estate)" || (
                                          <div className="col-md-6">
                                            <div className="mb-3 mt-5">
                                              <label
                                                htmlFor="BeneficiariesOptionDetailsBeneficiaries"
                                                className="form-label"
                                              >
                                                How many beneficiaries do you
                                                have?
                                              </label>
                                              <Field
                                                as="select"
                                                id="BeneficiariesOptionDetailsBeneficiaries"
                                                name="BeneficiariesOptionDetailsBeneficiaries"
                                                className="form-select shadow  inputDesign"
                                                //onChange={(e) => setFieldValue("BeneficiariesOptionDetailsBeneficiaries", e.target.value)}
                                                value={
                                                  values.BeneficiariesOptionDetailsBeneficiaries
                                                }
                                              >
                                                <option value="">Select</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                              </Field>
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="BeneficiariesOptionDetailsBeneficiaries"
                                              />
                                            </div>
                                          </div>
                                        )}
                                      </div>

                                      {/* Row 1*/}
                                      {values.BeneficiariesOptionDetailsBeneficiaries >=
                                      1 ? (
                                        <div className="row justify-content-around mt-4 mb-3">
                                          <div className="col-md-4">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="Beneficiary1"
                                                className="form-label"
                                              >
                                                Beneficiary 1
                                              </label>
                                              <Field
                                                type="text"
                                                className="form-control shadow inputDesign"
                                                id="Beneficiary1"
                                                name="Beneficiary1"
                                                placeholder="Beneficiary 1"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="Beneficiary1"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="ShareofBenefit1"
                                                className="form-label"
                                              >
                                                Share of Benefits %{" "}
                                              </label>
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="ShareofBenefit1"
                                                name="ShareofBenefit1"
                                                placeholder="Share of Benefits 1"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="ShareofBenefit1"
                                              />
                                            </div>
                                          </div>

                                          <div className="col-md-4">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="RelationshipOptionDetailsRelationship1"
                                                className="form-label"
                                              >
                                                Relationship
                                              </label>
                                              <Field
                                                as="select"
                                                id="RelationshipOptionDetailsRelationship1"
                                                name="RelationshipOptionDetailsRelationship1"
                                                className="form-select shadow  inputDesign"
                                                //onChange={(e) => setFieldValue("RelationshipOptionDetailsRelationship1", e.target.value)}
                                                value={
                                                  values.RelationshipOptionDetailsRelationship1
                                                }
                                              >
                                                <option value="">Select</option>
                                                <option value="Spouse">
                                                  Spouse
                                                </option>
                                                <option value="Child">
                                                  Child
                                                </option>
                                                <option value="Other">
                                                  Other
                                                </option>
                                                <option value="Interdependency">
                                                  Interdependency
                                                </option>
                                              </Field>
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="RelationshipOptionDetailsRelationship1"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="d-none"></div>
                                      )}

                                      {/* Row 2*/}
                                      {values.BeneficiariesOptionDetailsBeneficiaries >=
                                      2 ? (
                                        <div className="row justify-content-around mt-4 mb-3">
                                          <div className="col-md-4">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="Beneficiary2"
                                                className="form-label"
                                              >
                                                Beneficiary 2
                                              </label>
                                              <Field
                                                type="text"
                                                className="form-control shadow inputDesign"
                                                id="Beneficiary2"
                                                name="Beneficiary2"
                                                placeholder="Beneficiary 2"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="Beneficiary4"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="ShareofBenefit2"
                                                className="form-label"
                                              >
                                                Share of Benefits %{" "}
                                              </label>
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="ShareofBenefit2"
                                                name="ShareofBenefit2"
                                                placeholder="Share of Benefits 2"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="ShareofBenefit2"
                                              />
                                            </div>
                                          </div>

                                          <div className="col-md-4">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="RelationshipOptionDetailsRelationship2"
                                                className="form-label"
                                              >
                                                Relationship
                                              </label>
                                              <Field
                                                as="select"
                                                id="RelationshipOptionDetailsRelationship2"
                                                name="RelationshipOptionDetailsRelationship2"
                                                className="form-select shadow  inputDesign"
                                                //onChange={(e) => setFieldValue("RelationshipOptionDetailsRelationship2", e.target.value)}
                                                value={
                                                  values.RelationshipOptionDetailsRelationship2
                                                }
                                              >
                                                <option value="">Select</option>
                                                <option value="Spouse">
                                                  Spouse
                                                </option>
                                                <option value="Child">
                                                  Child
                                                </option>
                                                <option value="Other">
                                                  Other
                                                </option>
                                                <option value="Interdependency">
                                                  Interdependency
                                                </option>
                                              </Field>
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="RelationshipOptionDetailsRelationship2"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="d-none"></div>
                                      )}
                                      {/* Row 2*/}

                                      {/* Row 3*/}
                                      {values.BeneficiariesOptionDetailsBeneficiaries >=
                                      3 ? (
                                        <div className="row justify-content-around mt-4 mb-3">
                                          <div className="col-md-4">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="Beneficiary3"
                                                className="form-label"
                                              >
                                                Beneficiary 3
                                              </label>
                                              <Field
                                                type="text"
                                                className="form-control shadow inputDesign"
                                                id="Beneficiary3"
                                                name="Beneficiary3"
                                                placeholder="Beneficiary 3"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="Beneficiary3"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="ShareofBenefit3"
                                                className="form-label"
                                              >
                                                Share of Benefits %{" "}
                                              </label>
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="ShareofBenefit3"
                                                name="ShareofBenefit3"
                                                placeholder="Share of Benefits 3"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="ShareofBenefit3"
                                              />
                                            </div>
                                          </div>

                                          <div className="col-md-4">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="RelationshipOptionDetailsRelationship3"
                                                className="form-label"
                                              >
                                                Relationship
                                              </label>
                                              <Field
                                                as="select"
                                                id="RelationshipOptionDetailsRelationship3"
                                                name="RelationshipOptionDetailsRelationship3"
                                                className="form-select shadow  inputDesign"
                                                //onChange={(e) => setFieldValue("RelationshipOptionDetailsRelationship3", e.target.value)}
                                                value={
                                                  values.RelationshipOptionDetailsRelationship3
                                                }
                                              >
                                                <option value="">Select</option>
                                                <option value="Spouse">
                                                  Spouse
                                                </option>
                                                <option value="Child">
                                                  Child
                                                </option>
                                                <option value="Other">
                                                  Other
                                                </option>
                                                <option value="Interdependency">
                                                  Interdependency
                                                </option>
                                              </Field>
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="RelationshipOptionDetailsRelationship3"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="d-none"></div>
                                      )}
                                      {/* Row 3*/}

                                      {/* Row 4*/}
                                      {values.BeneficiariesOptionDetailsBeneficiaries >=
                                      4 ? (
                                        <div className="row justify-content-around mt-4 mb-3">
                                          <div className="col-md-4">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="Beneficiary4"
                                                className="form-label"
                                              >
                                                Beneficiary 4
                                              </label>
                                              <Field
                                                type="text"
                                                className="form-control shadow inputDesign"
                                                id="Beneficiary4"
                                                name="Beneficiary4"
                                                placeholder="Beneficiary 4"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="Beneficiary4"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="ShareofBenefit4"
                                                className="form-label"
                                              >
                                                Share of Benefits %{" "}
                                              </label>
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="ShareofBenefit4"
                                                name="ShareofBenefit4"
                                                placeholder="Share of Benefits 4"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="ShareofBenefit4"
                                              />
                                            </div>
                                          </div>

                                          <div className="col-md-4">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="RelationshipOptionDetailsRelationship4"
                                                className="form-label"
                                              >
                                                Relationship
                                              </label>
                                              <Field
                                                as="select"
                                                id="RelationshipOptionDetailsRelationship4"
                                                name="RelationshipOptionDetailsRelationship4"
                                                className="form-select shadow  inputDesign"
                                                //onChange={(e) => setFieldValue("RelationshipOptionDetailsRelationship4", e.target.value)}
                                                value={
                                                  values.RelationshipOptionDetailsRelationship4
                                                }
                                              >
                                                <option value="">Select</option>
                                                <option value="Spouse">
                                                  Spouse
                                                </option>
                                                <option value="Child">
                                                  Child
                                                </option>
                                                <option value="Other">
                                                  Other
                                                </option>
                                                <option value="Interdependency">
                                                  Interdependency
                                                </option>
                                              </Field>
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="RelationshipOptionDetailsRelationship4"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="d-none"></div>
                                      )}
                                      {/* Row 4*/}

                                      {/* Row 5*/}
                                      {values.BeneficiariesOptionDetailsBeneficiaries >=
                                      5 ? (
                                        <div className="row justify-content-around mt-4 mb-3">
                                          <div className="col-md-4">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="Beneficiary5"
                                                className="form-label"
                                              >
                                                Beneficiary 5
                                              </label>
                                              <Field
                                                type="text"
                                                className="form-control shadow inputDesign"
                                                id="Beneficiary5"
                                                name="Beneficiary5"
                                                placeholder="Beneficiary 5"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="Beneficiary5"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="ShareofBenefit5"
                                                className="form-label"
                                              >
                                                Share of Benefits %{" "}
                                              </label>
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="ShareofBenefit5"
                                                name="ShareofBenefit5"
                                                placeholder="Share of Benefits 5"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="ShareofBenefit5"
                                              />
                                            </div>
                                          </div>

                                          <div className="col-md-4">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="RelationshipOptionDetailsRelationship5"
                                                className="form-label"
                                              >
                                                Relationship
                                              </label>
                                              <Field
                                                as="select"
                                                id="RelationshipOptionDetailsRelationship5"
                                                name="RelationshipOptionDetailsRelationship5"
                                                className="form-select shadow  inputDesign"
                                                //onChange={(e) => setFieldValue("RelationshipOptionDetailsRelationship5", e.target.value)}
                                                value={
                                                  values.RelationshipOptionDetailsRelationship5
                                                }
                                              >
                                                <option value="">Select</option>
                                                <option value="Spouse">
                                                  Spouse
                                                </option>
                                                <option value="Child">
                                                  Child
                                                </option>
                                                <option value="Other">
                                                  Other
                                                </option>
                                                <option value="Interdependency">
                                                  Interdependency
                                                </option>
                                              </Field>
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="RelationshipOptionDetailsRelationship5"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="d-none"></div>
                                      )}
                                      {/* Row 5*/}
                                    </div>
                                  )}
                                </div>
                              </Modal.Body>
                              <Modal.Footer>
                                <div className="col-md-12">
                                  <button
                                    className="float-end btn w-25  bgColor modalBtn"
                                    type="submit"
                                  >
                                    Save
                                  </button>
                                  <button
                                    type="button"
                                    className="float-end btn w-25  btn-outline  backBtn mx-3"
                                    onClick={handleClose3}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </Modal.Footer>
                            </Form>
                          )}
                        </Formik>
                      </Modal>
                      {/* NESTED BENFICIARIES MODAL */}
                      {/* Beneficiaries innner modal now here */}

                      {/* NESTED CONTRIBUTION MODAL Now*/}
                      <Modal
                        show={contributionShow}
                        onHide={contributionHandleClose}
                        backdrop="static"
                        className="modal-lg"
                        keyboard={false}
                      >
                        <Modal.Header
                          className="text-light modalBG "
                          closeButton
                        >
                          <Modal.Title className="fontStyle">
                            Contribution Details
                          </Modal.Title>
                        </Modal.Header>
                        <Formik
                          initialValues={
                            ContributionFlag
                              ? ContributionObj[0]
                              : initialValues_Contribution
                          }
                          validationSchema={validateSchema_Contribution}
                          onSubmit={on_Submit_Contribution}
                          enableReinitialize
                        >
                          {({
                            values,
                            handleChange,
                            setFieldValue,
                            formik,
                          }) => (
                            <Form>
                              <Modal.Body>
                                <div className="">
                                  <label className="form-label">
                                    Do you contribute to this fund?
                                  </label>
                                  {/* switch button style */}
                                  <div className="form-check form-switch m-0 p-0 ">
                                    <div className="radiobutton">
                                      <input
                                        type="radio"
                                        name="contributeFundRadio"
                                        id="contributeFund1"
                                        value="Yes"
                                        onChange={handleChange}
                                        checked={
                                          values.contributeFundRadio === "Yes"
                                        }
                                      />
                                      <label
                                        htmlFor="contributeFund1"
                                        className="label1"
                                      >
                                        <span>YES</span>
                                      </label>
                                      <input
                                        type="radio"
                                        name="contributeFundRadio"
                                        id="contributeFund2"
                                        value="No"
                                        onChange={handleChange}
                                        checked={
                                          values.contributeFundRadio === "No"
                                        }
                                      />
                                      <label
                                        htmlFor="contributeFund2"
                                        className="label2"
                                      >
                                        <span>NO</span>
                                      </label>
                                    </div>
                                  </div>
                                  {values.contributeFundRadio === "Yes" && (
                                    <div>
                                      {/* Row 1*/}
                                      <div>
                                        <h3 className="mt-5">FY2023</h3>

                                        <div className="row justify-content-around mt-3 mb-3">
                                          <div className="col-md-3">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="Non_Concessional1"
                                                className="form-label"
                                              >
                                                Non Concessional
                                              </label>
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="Non_Concessional1"
                                                name="Non_Concessional1"
                                                placeholder="Non Concessional"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="Non_Concessional1"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-3">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="Other1"
                                                className="form-label"
                                              >
                                                Other
                                              </label>
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="Other1"
                                                name="Other1"
                                                placeholder="Other"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="Other1"
                                              />
                                            </div>
                                          </div>

                                          <div className="col-md-3">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="EmployerContributions1"
                                                className="form-label"
                                              >
                                                Contributions
                                              </label>
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="EmployerContributions1"
                                                name="EmployerContributions1"
                                                placeholder="Employer Contributions"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="EmployerContributions1"
                                              />
                                            </div>
                                          </div>

                                          <div className="col-md-3">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="SalarySacAndPersonalDed1"
                                                className="form-label"
                                              >
                                                Salary Sac & Ded
                                              </label>
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="SalarySacAndPersonalDed1"
                                                name="SalarySacAndPersonalDed1"
                                                placeholder="Salary Sac & Personal Ded"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="SalarySacAndPersonalDed1"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {/* Row # 2 */}
                                      <div>
                                        <h3 className="mt-2">FY2022</h3>

                                        <div className="row justify-content-around mt-3 mb-3">
                                          <div className="col-md-3">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="Non_Concessional2"
                                                className="form-label"
                                              >
                                                Non Concessional
                                              </label>
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="Non_Concessional2"
                                                name="Non_Concessional2"
                                                placeholder="Non Concessional"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="Non_Concessional2"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-3">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="Other2"
                                                className="form-label"
                                              >
                                                Other
                                              </label>
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="Other2"
                                                name="Other2"
                                                placeholder="Other"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="Other2"
                                              />
                                            </div>
                                          </div>

                                          <div className="col-md-3">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="EmployerContributions2"
                                                className="form-label"
                                              >
                                                Contributions
                                              </label>
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="EmployerContributions2"
                                                name="EmployerContributions2"
                                                placeholder="Employer Contributions"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="EmployerContributions2"
                                              />
                                            </div>
                                          </div>

                                          <div className="col-md-3">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="SalarySacAndPersonalDed2"
                                                className="form-label"
                                              >
                                                Salary Sac & Ded
                                              </label>
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="SalarySacAndPersonalDed2"
                                                name="SalarySacAndPersonalDed2"
                                                placeholder="Salary Sac & Personal Ded"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="SalarySacAndPersonalDed2"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {/* Row # 2 */}

                                      {/* Row # 3 */}
                                      <div>
                                        <h3 className="mt-2">FY2021</h3>

                                        <div className="row justify-content-around mt-3 mb-3">
                                          <div className="col-md-3">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="Non_Concessional3"
                                                className="form-label"
                                              >
                                                Non Concessional
                                              </label>
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="Non_Concessional3"
                                                name="Non_Concessional3"
                                                placeholder="Non Concessional"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="Non_Concessional3"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-3">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="Other3"
                                                className="form-label"
                                              >
                                                Other
                                              </label>
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="Other3"
                                                name="Other3"
                                                placeholder="Other"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="Other3"
                                              />
                                            </div>
                                          </div>

                                          <div className="col-md-3">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="EmployerContributions3"
                                                className="form-label"
                                              >
                                                Contributions
                                              </label>
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="EmployerContributions3"
                                                name="EmployerContributions3"
                                                placeholder="Employer Contributions"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="EmployerContributions3"
                                              />
                                            </div>
                                          </div>

                                          <div className="col-md-3">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="SalarySacAndPersonalDed3"
                                                className="form-label"
                                              >
                                                Salary Sac & Ded
                                              </label>
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="SalarySacAndPersonalDed3"
                                                name="SalarySacAndPersonalDed3"
                                                placeholder="Salary Sac & Personal Ded"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="SalarySacAndPersonalDed3"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {/* Row # 3 */}
                                    </div>
                                  )}
                                </div>
                              </Modal.Body>
                              <Modal.Footer>
                                <div className="col-md-12">
                                  <button
                                    className="float-end btn w-25  bgColor modalBtn"
                                    // onClick={contributionHandleClose}
                                    type="submit"
                                  >
                                    Save
                                  </button>
                                  <button
                                    type="button"
                                    className="float-end btn w-25  btn-outline  backBtn mx-3"
                                    onClick={contributionHandleClose}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </Modal.Footer>
                            </Form>
                          )}
                        </Formik>
                      </Modal>
                      {/* NESTED CONTRIBUTION MODALNow */}

                      {/* Accumulation Details */}
                      <div className="mb-5">
                        <h3 className="">Accumulation</h3>

                        {/* 1 row */}
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Do you have any Accumulation?
                              </label>
                              {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="AccumulationRadio"
                                    id="AccumulationRadioopt1"
                                    value="Yes"
                                    onClick={() => AccumulationHandler("Yes")}
                                    onChange={handleChange}
                                    checked={values.AccumulationRadio === "Yes"}
                                  />
                                  <label
                                    htmlFor="AccumulationRadioopt1"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="AccumulationRadio"
                                    id="AccumulationRadioopt2"
                                    value="No"
                                    onClick={() => AccumulationHandler("No")}
                                    onChange={handleChange}
                                    checked={values.AccumulationRadio === "No"}
                                  />
                                  <label
                                    htmlFor="AccumulationRadioopt2"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          {Accumulation && (
                            <div className="col-md-6">
                              <label className="form-label">
                                Please enter the details of your Accumulation
                                Accounts
                              </label>
                              <br />

                              <span
                                className=" btn h-50 w-50
                                btn-outline-success "
                                onClick={AccumulationhandleShow}
                              >
                                <div className="iconContainer mx-1">
                                  <img
                                    className="img-fluid"
                                    src={plus}
                                    alt=""
                                  />
                                </div>
                                Enter Details
                              </span>
                            </div>
                          )}
                        </div>
                        {/* 1 row */}

                        {/* --------------------------------------------- */}

                        <Modal
                          show={Accumulationshow}
                          onHide={AccumulationhandleClose}
                          backdrop="static"
                          className="modal-lg"
                          keyboard={false}
                        >
                          <Modal.Header
                            className="text-light modalBG "
                            closeButton
                          >
                            <Modal.Title className="fontStyle">
                              Accumulation Account Details
                              <div className="iconContainerLg">
                                <img
                                  className="img-fluid"
                                  src={notebook}
                                  alt=""
                                />
                              </div>
                            </Modal.Title>
                          </Modal.Header>
                          <Formik
                            initialValues={
                              AccumulationFlag
                                ? AccumulationObj[0]
                                : Client_initialValues
                            }
                            validationSchema={Accumulation_validationSchema}
                            onSubmit={AccumulationModal_onSubmit}
                          >
                            {({
                              values,
                              setFieldValue,
                              setValues,
                              handleChange,
                              handleBlur,
                            }) => (
                              <Form>
                                <Modal.Body>
                                  {/* Professional Advisor Detail Form */}

                                  <div className=" ">
                                    <h3 className="">
                                      <div className="iconContainerLg mx-1">
                                        <img
                                          className="img-fluid"
                                          src={lawyer}
                                          alt=""
                                        />
                                      </div>
                                      Accumulation Accounts
                                    </h3>
                                    <div className="row">
                                      {/* <Field type="hidden" name="_id" /> */}

                                      <div className="col-md-6">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="AccumulationMemberName"
                                            className="form-label"
                                          >
                                            Member Name
                                          </label>
                                          <Field
                                            as="select"
                                            name="AccumulationMemberName"
                                            id="AccumulationMemberName"
                                            className="form-select shadow  inputDesign"
                                          >
                                            <option value="">Select</option>
                                            <option value="Client">
                                              Client
                                            </option>
                                            <option value="Partner">
                                              Partner
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            name="AccumulationMemberName"
                                            component="div"
                                            className="text-danger fw-bold"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="AccumulationEligibleDate"
                                            className="form-label"
                                          >
                                            Eligible Date
                                          </label>

                                          <div>
                                            <DatePicker
                                              className="form-control inputDesign shadow"
                                              showIcon
                                              id="AccumulationEligibleDate"
                                              name="AccumulationEligibleDate"
                                              selected={
                                                values.AccumulationEligibleDate
                                              }
                                              onChange={(date) =>
                                                setFieldValue(
                                                  "AccumulationEligibleDate",
                                                  date
                                                )
                                              }
                                              dateFormat="dd/MM/yyyy"
                                              placeholderText="dd/mm/yyyy"
                                              maxDate={new Date()}
                                              showMonthDropdown
                                              showYearDropdown
                                              dropdownMode="select"
                                              onBlur={handleBlur}
                                            />
                                          </div>

                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="AccumulationEligibleDate"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="AccumulationCurrentBalance"
                                            className="form-label"
                                          >
                                            Current Balance
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="AccumulationCurrentBalance"
                                            name="AccumulationCurrentBalance"
                                            placeholder="Current Balance"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="AccumulationCurrentBalance"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="AccumulationTaxFree"
                                            className="form-label"
                                          >
                                            Tax Free
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="AccumulationTaxFree"
                                            name="AccumulationTaxFree"
                                            placeholder="Tax Free"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="AccumulationTaxFree"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="AccumulationTaxed"
                                            className="form-label"
                                          >
                                            Taxed
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="AccumulationTaxed"
                                            name="AccumulationTaxed"
                                            placeholder="Taxed"
                                            value={
                                              parseFloat(
                                                values.AccumulationTaxFree
                                              ) >=
                                              parseFloat(
                                                values.AccumulationCurrentBalance
                                              )
                                                ? values.AccumulationTaxed
                                                : (parseFloat(
                                                    values.AccumulationCurrentBalance
                                                  ) || 0) -
                                                  (parseFloat(
                                                    values.AccumulationTaxFree
                                                  ) || 0)
                                            }
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="AccumulationTaxed"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="AccumulationNonPreservedRestriction"
                                            className="form-label"
                                          >
                                            Restriction Non Preserved
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="AccumulationNonPreservedRestriction"
                                            name="AccumulationNonPreservedRestriction"
                                            placeholder="Restriction Non Preserved"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="AccumulationNonPreservedRestriction"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="AccumulationNonPreservedUnRestriction"
                                            className="form-label"
                                          >
                                            Un-Restriction Non Preserved
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="AccumulationNonPreservedUnRestriction"
                                            name="AccumulationNonPreservedUnRestriction"
                                            placeholder="Un-restriction Non Preserved"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="AccumulationNonPreservedUnRestriction"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="AccumulationPreservedAmount"
                                            className="form-label"
                                          >
                                            Preserved Amount
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="AccumulationPreservedAmount"
                                            name="AccumulationPreservedAmount"
                                            placeholder="Member No"
                                            value={
                                              parseFloat(
                                                values.AccumulationNonPreservedUnRestriction
                                              ) >=
                                                parseFloat(
                                                  values.AccumulationCurrentBalance
                                                ) ||
                                              parseFloat(
                                                values.AccumulationNonPreservedRestriction
                                              ) >=
                                                parseFloat(
                                                  values.AccumulationCurrentBalance
                                                ) ||
                                              parseFloat(
                                                values.AccumulationNonPreservedUnRestriction
                                              ) +
                                                parseFloat(
                                                  values.AccumulationNonPreservedRestriction
                                                ) >=
                                                parseFloat(
                                                  values.AccumulationCurrentBalance
                                                )
                                                ? values.AccumulationPreservedAmount
                                                : (parseFloat(
                                                    values.AccumulationCurrentBalance
                                                  ) || 0) -
                                                  (parseFloat(
                                                    values.AccumulationNonPreservedRestriction
                                                  ) || 0) -
                                                  (parseFloat(
                                                    values.AccumulationNonPreservedUnRestriction
                                                  ) || 0)
                                            }
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="AccumulationPreservedAmount"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    {/* nested modal */}
                                    <button
                                      type="button"
                                      onClick={handleShow3}
                                      className="btn bgColor modalBtn"
                                    >
                                      Beneficiaries
                                    </button>
                                    {/* Beneficiaries innner modal was here */}
                                    {/* Beneficiaries innner modal was here */}

                                    {/* nested modal */}

                                    <button
                                      type="button"
                                      onClick={handlecontributionShow}
                                      className="btn bgColor modalBtn mx-2"
                                    >
                                      Contributions
                                    </button>

                                    {/* NESTED CONTRIBUTION MODAL was here */}
                                    {/* NESTED CONTRIBUTION MODAL was here */}
                                  </div>
                                </Modal.Body>
                                <Modal.Footer>
                                  <div className="col-md-12">
                                    <button
                                      className="float-end btn w-25  bgColor modalBtn"
                                      type="submit"
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      className="float-end btn w-25  btn-outline  backBtn mx-3"
                                      onClick={AccumulationhandleClose}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </Modal.Footer>
                              </Form>
                            )}
                          </Formik>
                        </Modal>
                        {/* ---------------------------------------------------- */}
                        {/* AccumulationTable */}

                        <div className="table-responsive my-3">
                          <table className="table table-bordered table-hover text-center">
                            <thead className="text-light" id="tableHead">
                              <tr>
                                <th>No</th>

                                <th>MemberName</th>
                                <th>Current Value</th>
                                <th>Operations</th>
                              </tr>
                            </thead>
                            <tbody>
                              {accumulationList.map((elem, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>

                                    <td>{elem.MemberName}</td>
                                    <td>{elem.CurrentBalance}</td>
                                    <td>
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          deleteHandler_accumulation(
                                            elem,
                                            index
                                          )
                                        }
                                        className="btn btn-danger btn-sm"
                                      >
                                        delete
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          updateHandler_accumulation(
                                            elem,
                                            index
                                          )
                                        }
                                        className="btn btn-warning btn-sm mx-2"
                                      >
                                        update
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        {/* AccumulationTable */}

                        {/* BeneficiariesTable */}
                        <h3>Beneficiaries</h3>
                        <div className="table-responsive my-3">
                          <table className="table table-bordered table-hover text-center">
                            <thead className="text-light" id="tableHead">
                              <tr>
                                <th>No</th>
                                <th>Beneficiaries</th>

                                <th>Operations</th>
                              </tr>
                            </thead>
                            <tbody>
                              {BeneficiaryDataList.map((elem, index) => {
                                return (
                                  //arham
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{elem.NominatedBeneficiary}</td>

                                    <td>
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          deleteHandler_Beneficiaries(
                                            elem,
                                            index
                                          )
                                        }
                                        className="btn btn-danger btn-sm"
                                      >
                                        delete
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          updateHandler_Beneficiaries(elem)
                                        }
                                        className="btn btn-warning btn-sm mx-2"
                                      >
                                        update
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        {/* BeneficiariesTable */}

                        {/* ContributionTable */}
                        <h3>Contribution</h3>
                        <div className="table-responsive my-3">
                          <table className="table table-bordered table-hover text-center">
                            <thead className="text-light" id="tableHead">
                              <tr>
                                <th>No</th>
                                <th>Contribution</th>

                                <th>Operations</th>
                              </tr>
                            </thead>
                            <tbody>
                              {contributionModal.map((elem, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{elem.ContributeFund}</td>

                                    <td>
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          deleteHandler_Contribution(
                                            elem,
                                            index
                                          )
                                        }
                                        className="btn btn-danger btn-sm"
                                      >
                                        delete
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          updateHandler_Contribution(elem)
                                        }
                                        className="btn btn-warning btn-sm mx-2"
                                      >
                                        update
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        {/* ContributionTable */}
                      </div>
                      {/* Accumulation Details */}

                      {/* Pension Account Details */}
                      <div className="mb-5">
                        <h3 className="">Pension Account</h3>

                        {/* 1 row */}
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Do you have any Pension Accounts?
                              </label>
                              {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="PensionRadio"
                                    id="PensionRadioopt1"
                                    value="Yes"
                                    onClick={() => PensionHandler("Yes")}
                                    onChange={handleChange}
                                    checked={values.PensionRadio === "Yes"}
                                  />
                                  <label
                                    htmlFor="PensionRadioopt1"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="PensionRadio"
                                    id="PensionRadioopt2"
                                    value="No"
                                    onClick={() => PensionHandler("No")}
                                    onChange={handleChange}
                                    checked={values.PensionRadio === "No"}
                                  />
                                  <label
                                    htmlFor="PensionRadioopt2"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          {values.PensionRadio === "Yes" && (
                            <div className="col-md-6">
                              <label className="form-label">
                                Please enter the details of your Pension
                                Accounts
                              </label>
                              <br />

                              <span
                                className=" btn h-50 w-50
                                btn-outline-success "
                                onClick={PensionhandleShow}
                              >
                                <div className="iconContainer mx-1">
                                  <img
                                    className="img-fluid"
                                    src={plus}
                                    alt=""
                                  />
                                </div>
                                Enter Details
                              </span>
                            </div>
                          )}
                        </div>
                        {/* 1 row */}

                        {/* --------------------------------------------- */}

                        <Modal
                          show={Pensionshow}
                          onHide={PensionhandleClose}
                          backdrop="static"
                          className="modal-lg"
                          keyboard={false}
                        >
                          <Modal.Header
                            className="text-light modalBG "
                            closeButton
                          >
                            <Modal.Title className="fontStyle">
                              Pension Account Details
                              <div className="iconContainerLg">
                                <img
                                  className="img-fluid"
                                  src={notebook}
                                  alt=""
                                />
                              </div>
                            </Modal.Title>
                          </Modal.Header>
                          <Formik
                            initialValues={
                              PensionAccountFlag
                                ? pensionAccountObj[0]
                                : Client_initialValues
                            }
                            validationSchema={PensionAccount_validationSchema}
                            onSubmit={PensionAccount_onSubmit}
                          >
                            {({
                              values,
                              setFieldValue,
                              setValues,
                              handleChange,
                              formik,
                            }) => (
                              <Form>
                                <Modal.Body>
                                  {/* Professional Advisor Detail Form */}

                                  {/* Solicitor */}
                                  <div className=" ">
                                    <h3 className="">
                                      <div className="iconContainerLg mx-1">
                                        <img
                                          className="img-fluid"
                                          src={lawyer}
                                          alt=""
                                        />
                                      </div>
                                      Pension Accounts
                                    </h3>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="PensionMemberName"
                                          className="form-label"
                                        >
                                          Member Name
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          as="select"
                                          name="PensionMemberName"
                                          id="PensionMemberName"
                                          className="form-select shadow  inputDesign"
                                        >
                                          <option value="">Select</option>
                                          <option value="Client">Client</option>
                                        </Field>
                                        <ErrorMessage
                                          name="PensionMemberName"
                                          component="div"
                                          className="text-danger fw-bold"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="PensionType"
                                          className="form-label"
                                        >
                                          Pension Type
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          as="select"
                                          name="PensionType"
                                          id="PensionType"
                                          className="form-select shadow  inputDesign"
                                        >
                                          <option value="">Select</option>
                                          <option value="TTR">TTR</option>
                                          <option value="Account Based">
                                            Account Based
                                          </option>
                                        </Field>
                                        <ErrorMessage
                                          name="PensionType"
                                          component="div"
                                          className="text-danger fw-bold"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="PensionCommencementDate"
                                          className="form-label"
                                        >
                                          Commencment Date
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <div>
                                          <DatePicker
                                            className="form-control inputDesign shadow"
                                            showIcon
                                            id="PensionCommencementDate"
                                            name="PensionCommencementDate"
                                            selected={
                                              values.PensionCommencementDate
                                            }
                                            onChange={(date) =>
                                              setFieldValue(
                                                "PensionCommencementDate",
                                                date
                                              )
                                            }
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="dd/mm/yyyy"
                                            maxDate={new Date()}
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            onBlur={handleBlur}
                                          />
                                        </div>
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="PensionCommencementDate"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="PensionCurrentBalance"
                                          className="form-label"
                                        >
                                          Current Balance
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="PensionCurrentBalance"
                                          name="PensionCurrentBalance"
                                          placeholder="Current Balance"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="PensionCurrentBalance"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="PensionTaxFree"
                                          className="form-label"
                                        >
                                          Tax Free
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="PensionTaxFree"
                                          name="PensionTaxFree"
                                          placeholder="Tax Free"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="PensionTaxFree"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="PensionTaxed"
                                          className="form-label"
                                        >
                                          Taxed
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="PensionTaxed"
                                          name="PensionTaxed"
                                          placeholder="Taxed"
                                          value={
                                            parseFloat(values.PensionTaxFree) >=
                                            parseFloat(
                                              values.PensionCurrentBalance
                                            )
                                              ? values.PensionTaxed
                                              : (parseFloat(
                                                  values.PensionCurrentBalance
                                                ) || 0) -
                                                (parseFloat(
                                                  values.PensionTaxFree
                                                ) || 0)
                                          }
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="PensionTaxed"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="PensionPurchasePrice"
                                          className="form-label"
                                        >
                                          Original Purchase Price
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="PensionPurchasePrice"
                                          name="PensionPurchasePrice"
                                          placeholder="Original Purchase Price"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="PensionPurchasePrice"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="PensionFrequency"
                                          className="form-label"
                                        >
                                          Frequency
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          as="select"
                                          name="PensionFrequency"
                                          id="PensionFrequency"
                                          className="form-select shadow  inputDesign"
                                        >
                                          <option value="">Select</option>
                                          <option value="Fortnightly">
                                            Fortnightly
                                          </option>
                                          <option value="Monthly">
                                            Monthly
                                          </option>
                                          <option value="Quarterly">
                                            Quarterly
                                          </option>
                                          <option value="Six Monthly">
                                            Six Monthly
                                          </option>
                                          <option value="Anually">
                                            Anually
                                          </option>
                                        </Field>
                                        <ErrorMessage
                                          name="PensionFrequency"
                                          component="div"
                                          className="text-danger fw-bold"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="PensionRegularIncomeDrawn"
                                          className="form-label"
                                        >
                                          Regular Income Drawn
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="PensionRegularIncomeDrawn"
                                          name="PensionRegularIncomeDrawn"
                                          placeholder="Regular Income Drawn"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="PensionRegularIncomeDrawn"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="PensionMinimumRequired"
                                          className="form-label"
                                        >
                                          Minimum Required
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="PensionMinimumRequired"
                                          name="PensionMinimumRequired"
                                          placeholder="Minimum Required"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="PensionMinimumRequired"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="PensionRelevantNumber"
                                          className="form-label"
                                        >
                                          Relevant Number
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="PensionRelevantNumber"
                                          name="PensionRelevantNumber"
                                          placeholder="Relevant Number"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="PensionRelevantNumber"
                                        />
                                      </div>
                                    </div>

                                    {values.PensionType == "TTR" && (
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="PensionMaximum"
                                            className="form-label"
                                          >
                                            Maximum
                                          </label>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="PensionMaximum"
                                            name="PensionMaximum"
                                            placeholder="Relevant Number"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="PensionMaximum"
                                          />
                                        </div>
                                      </div>
                                    )}
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="PensionLumpsumTaken"
                                          className="form-label"
                                        >
                                          Lumpsum Withdrawl Taken
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="PensionLumpsumTaken"
                                          name="PensionLumpsumTaken"
                                          placeholder="Lumpsum Withdrawl Taken"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="PensionLumpsumTaken"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="PensionDeductibleAmount"
                                          className="form-label"
                                        >
                                          Deductible Amount
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="PensionDeductibleAmount"
                                          name="PensionDeductibleAmount"
                                          placeholder="Deductible Amount"
                                          readOnly
                                          value={parseFloat(
                                            (
                                              ((parseFloat(
                                                values.PensionPurchasePrice
                                              ) || 0) -
                                                (parseFloat(
                                                  values.PensionLumpsumTaken
                                                ) || 0)) /
                                              (parseFloat(
                                                values.PensionRelevantNumber
                                              ) || 1)
                                            ).toFixed(2)
                                          )}
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="PensionDeductibleAmount"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  {/* Solicitor */}

                                  {/* Bank Account Detail Form */}
                                </Modal.Body>
                                <Modal.Footer>
                                  <div className="col-md-12">
                                    <button
                                      className="float-end btn w-25  bgColor modalBtn"
                                      // onClick={BankhandleClose}
                                      type="submit"
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      className="float-end btn w-25  btn-outline  backBtn mx-3"
                                      onClick={PensionhandleClose}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </Modal.Footer>
                              </Form>
                            )}
                          </Formik>
                        </Modal>
                        {/* ---------------------------------------------------- */}
                        {/* Pension Account Table */}

                        <div className="table-responsive my-3">
                          <table className="table table-bordered table-hover text-center">
                            <thead className="text-light" id="tableHead">
                              <tr>
                                <th>Member Name</th>
                                <th>Current Value</th>
                                <th>Original Purchase Price</th>
                                <th>Pension Payment Frequency</th>

                                <th>Operations</th>
                              </tr>
                            </thead>
                            <tbody>
                              {PensionAccountList.map((elem, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{elem.MemberName}</td>
                                    <td>{elem.CurrentBalance}</td>
                                    <td>{elem.OriginalPurchasePrice}</td>
                                    <td>{elem.Frequency}</td>

                                    <td>
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          deleteHandler_PensionAccount(
                                            elem,
                                            index
                                          )
                                        }
                                        className="btn btn-danger btn-sm mt-1"
                                      >
                                        delete
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          updateHandler_PensionAccount(elem)
                                        }
                                        className="btn btn-warning btn-sm mx-2 mt-1"
                                      >
                                        update
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        {/* Pension AccountTable */}
                      </div>
                      {/* Pension Account Details */}

                      {/* Bank Accounts Details */}
                      <div className="mb-5">
                        <h3 className="">Bank Accounts</h3>

                        {/* 1 row */}
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Do you have any Bank Accounts?
                              </label>
                              {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="BankAccountsRadio"
                                    id="BankAccountsopt1"
                                    value="Yes"
                                    onClick={() => BankAccountsHandler("Yes")}
                                    onChange={handleChange}
                                    checked={values.BankAccountsRadio === "Yes"}
                                  />
                                  <label
                                    htmlFor="BankAccountsopt1"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="BankAccountsRadio"
                                    id="BankAccountsopt2"
                                    value="No"
                                    onClick={() => BankAccountsHandler("No")}
                                    onChange={handleChange}
                                    checked={values.BankAccountsRadio === "No"}
                                  />
                                  <label
                                    htmlFor="BankAccountsopt2"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          {BankAccounts && (
                            <div className="col-md-6">
                              <label className="form-label">
                                Please enter the details of your Bank Accounts
                              </label>
                              <br />

                              <span
                                className=" btn h-50 w-50
                                btn-outline-success "
                                onClick={BankAccountshandleShow}
                              >
                                <div className="iconContainer mx-1">
                                  <img
                                    className="img-fluid"
                                    src={plus}
                                    alt=""
                                  />
                                </div>
                                Enter Details
                              </span>
                            </div>
                          )}
                        </div>
                        {/* 1 row */}

                        {/* --------------------------------------------- */}

                         {/* ---------------------BankAccounts------------------------ */}

                      <Modal
                        show={BankAccountsshow}
                        onHide={BankAccountshandleClose}
                        backdrop="static"
                        className="modal-lg"
                        keyboard={false}
                      >
                        <Modal.Header
                          className="text-light modalBG "
                          closeButton
                        >
                          <Modal.Title className="fontStyle">
                            Bank Account Details
                            <div className="iconContainerLg">
                              <img
                                className="img-fluid"
                                src={notebook}
                                alt=""
                              />
                            </div>
                          </Modal.Title>
                        </Modal.Header>
                        <Formik
                          initialValues={
                            bankAccountFlag
                              ? bankAccountList[0]
                              : Client_initialValues
                          }
                          validationSchema={Bank_validationSchema}
                          onSubmit={BankAccount_onSubmit}
                        >
                          {({
                            values,
                            setFieldValue,
                            setValues,
                            handleChange,
                            formik,
                          }) => (
                            <Form>
                              <Modal.Body>
                                {/* Professional Advisor Detail Form */}

                                {/* Bank #1 */}

                                <div className=" ">
                                  <h3 className="">
                                    <div className="iconContainerLg mx-1">
                                      <img
                                        className="img-fluid"
                                        src={lawyer}
                                        alt=""
                                      />
                                    </div>
                                    Bank #1
                                  </h3>

                                  <div className="row mb-3">
                                      <div className="col-6">
                                        <label
                                          htmlFor="CurrentValue1"
                                          className="form-label"
                                        >
                                          Current Value
                                        </label>
                                      </div>

                                  <div className="col-6">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="CurrentValue1"
                                          name="CurrentValue1"
                                          placeholder="Current Value"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="CurrentValue1"
                                        />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                      <div className="col-6">
                                        <label
                                          htmlFor="FinancialInstitution1"
                                          className="form-label"
                                        >
                                          Financial Institution
                                        </label>
                                      </div>

                                  <div className="col-6">
                                        <Field
                                          type="text"
                                          className="form-control shadow inputDesign"
                                          id="FinancialInstitution1"
                                          name="FinancialInstitution1"
                                          placeholder="Financial Institution"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="FinancialInstitution1"
                                        />
                                    </div>
                                  </div>
                                  <div className="row mb-3">
                                      <div className="col-6">
                                        <label
                                          htmlFor="IncomeYield1"
                                          className="form-label"
                                        >
                                          Income Yield %
                                        </label>
                                      </div>

                                  <div className="col-md-6">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="IncomeYield1"
                                          name="IncomeYield1"
                                          placeholder="Income Yield %"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="IncomeYield1"
                                        />
                                    </div>
                                    </div>

                                  <div className="row mb-3">
                                  
                                      <div className="col-6">
                                        <label
                                          htmlFor="AnnualIncome1"
                                          className="form-label"
                                        >
                                          Annual Income
                                        </label>
                                    </div>

                                    <div className="col-md-6">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="AnnualIncome1"
                                          name="AnnualIncome1"
                                          placeholder="Annual Income"
                                          readOnly
                                          value={parseFloat(
                                            (
                                              ((parseFloat(
                                                values.IncomeYield1
                                              ) || 0) /
                                                100) *
                                              (parseFloat(
                                                values.CurrentValue1
                                              ) || 0)
                                            ).toFixed(2)
                                          )}
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="AnnualIncome1"
                                        />
                                      </div>
                                  </div>
                                </div>
                                {/* Bank #1 */}

                                {/* Bank #2 */}
                                <div className="d-none  ">
                                  <h3 className="">
                                    <div className="iconContainerLg mx-1">
                                      <img
                                        className="img-fluid"
                                        src={lawyer}
                                        alt=""
                                      />
                                    </div>
                                    Bank #2
                                  </h3>
                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label
                                          htmlFor="CurrentValue2"
                                          className="form-label"
                                        >
                                          Current Value
                                        </label>
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="CurrentValue2"
                                          name="CurrentValue2"
                                          placeholder="Current Value"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="CurrentValue2"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label
                                          htmlFor="FinancialInstitution2"
                                          className="form-label"
                                        >
                                          Financial Institution
                                        </label>
                                        <Field
                                          type="text"
                                          className="form-control shadow inputDesign"
                                          id="FinancialInstitution2"
                                          name="FinancialInstitution2"
                                          placeholder="Financial Institution"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="FinancialInstitution2"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label
                                          htmlFor="IncomeYield2"
                                          className="form-label"
                                        >
                                          Income Yield %
                                        </label>
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="IncomeYield2"
                                          name="IncomeYield2"
                                          placeholder="Income Yield %"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="IncomeYield2"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label
                                          htmlFor="AnnualIncome2"
                                          className="form-label"
                                        >
                                          Annual Income
                                        </label>
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="AnnualIncome2"
                                          name="AnnualIncome2"
                                          placeholder="Annual Income"
                                          readOnly
                                          value={parseFloat(
                                            (
                                              ((parseFloat(
                                                values.IncomeYield2
                                              ) || 0) /
                                                100) *
                                              (parseFloat(
                                                values.CurrentValue2
                                              ) || 0)
                                            ).toFixed(2)
                                          )}
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="AnnualIncome2"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* Bank #2 */}

                                {/* Bank #3 */}
                                <div className="d-none ">
                                  <h3 className="">
                                    <div className="iconContainerLg mx-1">
                                      <img
                                        className="img-fluid"
                                        src={lawyer}
                                        alt=""
                                      />
                                    </div>
                                    Bank #3
                                  </h3>
                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label
                                          htmlFor="CurrentValue3"
                                          className="form-label"
                                        >
                                          Current Value
                                        </label>
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="CurrentValue3"
                                          name="CurrentValue3"
                                          placeholder="Current Value"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="CurrentValue3"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label
                                          htmlFor="FinancialInstitution3"
                                          className="form-label"
                                        >
                                          Financial Institution
                                        </label>
                                        <Field
                                          type="text"
                                          className="form-control shadow inputDesign"
                                          id="FinancialInstitution3"
                                          name="FinancialInstitution3"
                                          placeholder="Financial Institution"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="FinancialInstitution3"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label
                                          htmlFor="IncomeYield3"
                                          className="form-label"
                                        >
                                          Income Yield %
                                        </label>
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="IncomeYield3"
                                          name="IncomeYield3"
                                          placeholder="Income Yield %"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="IncomeYield3"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label
                                          htmlFor="AnnualIncome3"
                                          className="form-label"
                                        >
                                          Annual Income
                                        </label>
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="AnnualIncome3"
                                          name="AnnualIncome3"
                                          placeholder="Annual Income"
                                          readOnly
                                          value={parseFloat(
                                            (
                                              ((parseFloat(
                                                values.IncomeYield3
                                              ) || 0) /
                                                100) *
                                              (parseFloat(
                                                values.CurrentValue3
                                              ) || 0)
                                            ).toFixed(2)
                                          )}
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="AnnualIncome3"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* Bank #3 */}

                                {/* Bank Account Detail Form */}
                              </Modal.Body>
                              <Modal.Footer>
                                <div className="col-md-12">
                                  <button
                                    className="float-end btn w-25  bgColor modalBtn"
                                    // onClick={BankhandleClose}
                                    type="submit"
                                  >
                                    Save
                                  </button>
                                  <button
                                    type="button"
                                    className="float-end btn w-25  btn-outline  backBtn mx-3"
                                    onClick={BankAccountshandleClose}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </Modal.Footer>
                            </Form>
                          )}
                        </Formik>
                      </Modal>
                      {/* ----------------------BankAccounts----------------------- */}
                        {/* ---------------------------------------------------- */}
                        {/* bankTable */}
                        <div className="table-responsive my-3">
                          <table className="table table-bordered table-hover text-center">
                            <thead className="text-light" id="tableHead">
                              <tr>
                                <th>Current Value</th>
                                <th>Financial Institution</th>
                                <th>Income Yield</th>
                                <th>Annual Income</th>
                                <th>Operations</th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* {  bankAccountList.map((elem,index)=>{
                                        // let {ChildName,childDoBID,childRelationship,childAge,childGender}=elem;
                                      
                                  return(
                                    
                                    <tr key={index}>
                                        <td>{elem.CurrentValue}</td>
                                        <td>{elem.FinancialInstitution}</td>
                                        <td>{elem.IncomeYield}</td>
                                        <td>{elem.AnnualIncome}</td>
                                        <td >
                                        <button  type='button' onClick={(e)=>deleteHandler_Bank(elem,index)} className='btn btn-danger btn-sm'>delete</button>
                                        <button  type='button' onClick={(e)=>updateHandler_Bank(elem)} className='btn btn-warning btn-sm mx-2'>update</button>

                                        </td> 
                                    
                                    </tr>
                                    );
                                        
                                    }) } */}
                              {/* b123 */}

                              {/* Bank #1  */}

                              {bankAccountList.map((elem, index) => {
                                let {
                                  CurrentValue1,
                                  FinancialInstitution1,
                                  IncomeYield1,
                                  AnnualIncome1,
                                } = elem;
                                if (
                                  bankAccountList[0].CurrentValue1 !== "" ||
                                  bankAccountList[0].FinancialInstitution1 !==
                                    ""
                                ) {
                                  return (
                                    <tr key={index}>
                                      {/* <td className='fw-bold'>Bank #1</td> */}
                                      <td>{CurrentValue1}</td>
                                      <td>{FinancialInstitution1}</td>
                                      <td>{IncomeYield1}</td>
                                      <td>{AnnualIncome1}</td>
                                      <td>
                                        {/* <span type='button'   className='btn btn-danger btn-sm'>delete</span> */}
                                        <button
                                          type="button"
                                          onClick={() => deleteHandler1(elem)}
                                          className="btn btn-danger btn-sm"
                                        >
                                          delete
                                        </button>

                                        {/* <button type='button' className='btn btn-warning btn-sm mx-2 my-1'>update</button> */}
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setBankAccountFlag(true);
                                            BankAccountshandleShow();
                                          }}
                                          className="btn btn-warning btn-sm mx-2 my-1"
                                        >
                                          update
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                } else {
                                }
                              })}

                              {/* Bank #1  */}

                              {/* Bank #2  */}

                              {bankAccountList.map((elem, index) => {
                                let {
                                  CurrentValue2,
                                  FinancialInstitution2,
                                  IncomeYield2,
                                  AnnualIncome2,
                                } = elem;
                                if (
                                  bankAccountList[0].CurrentValue2 !== "" ||
                                  bankAccountList[0].FinancialInstitution2 !==
                                    ""
                                ) {
                                  return (
                                    <tr key={index}>
                                      {/* <td className='fw-bold'>Bank #1</td> */}
                                      <td>{CurrentValue2}</td>
                                      <td>{FinancialInstitution2}</td>
                                      <td>{IncomeYield2}</td>
                                      <td>{AnnualIncome2}</td>
                                      <td>
                                        <button
                                          type="button"
                                          onClick={() => deleteHandler2(elem)}
                                          className="btn btn-danger btn-sm"
                                        >
                                          delete
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setBankAccountFlag(true);
                                            BankAccountshandleShow();
                                          }}
                                          className="btn btn-warning btn-sm mx-2 my-1"
                                        >
                                          update
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                } else {
                                }
                              })}

                              {/* Bank #2  */}

                              {/* Bank #3  */}

                              {bankAccountList.map((elem, index) => {
                                let {
                                  CurrentValue3,
                                  FinancialInstitution3,
                                  IncomeYield3,
                                  AnnualIncome3,
                                } = elem;
                                if (
                                  bankAccountList[0].CurrentValue3 !== "" ||
                                  bankAccountList[0].FinancialInstitution3 !==
                                    ""
                                ) {
                                  return (
                                    <tr key={index}>
                                      {/* <td className='fw-bold'>Bank #1</td> */}
                                      <td>{CurrentValue3}</td>
                                      <td>{FinancialInstitution3}</td>
                                      <td>{IncomeYield3}</td>
                                      <td>{AnnualIncome3}</td>
                                      <td>
                                        {/* <span type='button'   className='btn btn-danger btn-sm'>delete</span> */}
                                        <button
                                          type="button"
                                          onClick={() => deleteHandler3(elem)}
                                          className="btn btn-danger btn-sm"
                                        >
                                          delete
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setBankAccountFlag(true);
                                            BankAccountshandleShow();
                                          }}
                                          className="btn btn-warning btn-sm mx-2 my-1"
                                        >
                                          update
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                } else {
                                }
                              })}

                              {/* Bank #3  */}
                            </tbody>
                          </table>
                        </div>

                        {/* bankTable */}
                      </div>
                      {/* Bank Accounts Details */}

                      {/* TermDeposit Accounts Details */}
                      {CRObject.TermSharesManaged == "Yes" && (
                        <div className="mb-5">
                          <h3 className="">Term Deposit Accounts</h3>

                          {/* 1 row */}
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Do you have any Term Deposit Accounts?
                                </label>
                                {/* switch button style */}
                                <div className="form-check form-switch m-0 p-0 ">
                                  <div className="radiobutton">
                                    <input
                                      type="radio"
                                      name="TermDepositRadio"
                                      id="TermDepositopt1"
                                      value="Yes"
                                      onClick={() => TermDepositHandler("Yes")}
                                      onChange={handleChange}
                                      checked={
                                        values.TermDepositRadio === "Yes"
                                      }
                                    />
                                    <label
                                      htmlFor="TermDepositopt1"
                                      className="label1"
                                    >
                                      <span>YES</span>
                                    </label>
                                    <input
                                      type="radio"
                                      name="TermDepositRadio"
                                      id="TermDepositopt2"
                                      value="No"
                                      onClick={() => TermDepositHandler("No")}
                                      onChange={handleChange}
                                      checked={values.TermDepositRadio === "No"}
                                    />
                                    <label
                                      htmlFor="TermDepositopt2"
                                      className="label2"
                                    >
                                      <span>NO</span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {TermDeposit && (
                              <div className="col-md-6">
                                <label className="form-label">
                                  Please enter the details of your TermDeposit
                                  Accounts
                                </label>
                                <br />

                                <span
                                  className=" btn h-50 w-50
                                btn-outline-success "
                                  onClick={TermDeposithandleShow}
                                >
                                  <div className="iconContainer mx-1">
                                    <img
                                      className="img-fluid"
                                      src={plus}
                                      alt=""
                                    />
                                  </div>
                                  Enter Details
                                </span>
                              </div>
                            )}
                          </div>
                          {/* 1 row */}

                          {/* --------------------------------------------- */}

                             {/* ------------------termDepost--------------------------- */}

                             <Modal
                          show={TermDepositshow}
                          onHide={TermDeposithandleClose}
                          backdrop="static"
                          className="modal-lg"
                          keyboard={false}
                        >
                          <Modal.Header
                            className="text-light modalBG "
                            closeButton
                          >
                            <Modal.Title className="fontStyle">
                              Term Deposit Account Details
                              <div className="iconContainerLg">
                                <img
                                  className="img-fluid"
                                  src={notebook}
                                  alt=""
                                />
                              </div>
                            </Modal.Title>
                          </Modal.Header>
                          <Formik
                            initialValues={
                              termAccountFlag
                                ? termAccountList[0]
                                : term_InitialValues
                            }
                            validationSchema={Term_validationSchema}
                            onSubmit={Term_onSubmit}
                          >
                            {({
                              values,
                              setFieldValue,
                              setValues,
                              handleChange,
                              formik,
                            }) => (
                              <Form>
                                <Modal.Body>
                                  {/* Professional Advisor Detail Form */}

                                  {/*  TermDeposit #1 */}
                                  <div className=" ">
                                    <h3 className="">
                                      <div className="iconContainerLg mx-1">
                                        <img
                                          className="img-fluid"
                                          src={lawyer}
                                          alt=""
                                        />
                                      </div>
                                      TermDeposit #1
                                    </h3>

                                    <div className="row mb-3">
                                        <div className="col-6">
                                          <label
                                            htmlFor="CurrentValue1"
                                            className="form-label"
                                          >
                                            Current Value
                                          </label>
                                      </div>

                                    <div className="col-6">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="CurrentValue1"
                                            name="CurrentValue1"
                                            placeholder="Current Value"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="CurrentValue1"
                                          />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-6">
                                          <label
                                            htmlFor="FinancialInstitution1"
                                            className="form-label"
                                          >
                                            Financial Institution
                                          </label>
                                      </div>

                                    <div className="col-6">
                                          <Field
                                            type="text"
                                            className="form-control shadow inputDesign"
                                            id="FinancialInstitution1"
                                            name="FinancialInstitution1"
                                            placeholder="Financial Institution"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="FinancialInstitution1"
                                          />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-6">
                                          <label
                                            htmlFor="IncomeYield1"
                                            className="form-label"
                                          >
                                            Income Yield %
                                          </label>
                                      </div>

                                    <div className="col-6">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="IncomeYield1"
                                            name="IncomeYield1"
                                            placeholder="Income Yield %"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="IncomeYield1"
                                          />
                                        </div>
                                      </div>
                                    <div className="row mb-3">
                                    
                                        <div className="col-6">
                                          <label
                                            htmlFor="AnnualIncome1"
                                            className="form-label"
                                          >
                                            Annual Income
                                          </label>
                                      </div>

                                      <div className="col-6">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="AnnualIncome1"
                                            name="AnnualIncome1"
                                            placeholder="Annual Income"
                                            readOnly
                                            value={parseFloat(
                                              (
                                                ((parseFloat(
                                                  values.IncomeYield1
                                                ) || 0) /
                                                  100) *
                                                (parseFloat(
                                                  values.CurrentValue1
                                                ) || 0)
                                              ).toFixed(2)
                                            )}
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="AnnualIncome1"
                                          />
                                        </div>
                                    </div>
                                  </div>
                                  {/*  TermDeposit #1 */}

                                  {/*  TermDeposit #2 */}
                                  <div className=" d-none">
                                    <h3 className="">
                                      <div className="iconContainerLg mx-1">
                                        <img
                                          className="img-fluid"
                                          src={lawyer}
                                          alt=""
                                        />
                                      </div>
                                      TermDeposit #2
                                    </h3>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="CurrentValue2"
                                            className="form-label"
                                          >
                                            Current Value
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="CurrentValue2"
                                            name="CurrentValue2"
                                            placeholder="Current Value"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="CurrentValue2"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="FinancialInstitution2"
                                            className="form-label"
                                          >
                                            Financial Institution
                                          </label>
                                          <Field
                                            type="text"
                                            className="form-control shadow inputDesign"
                                            id="FinancialInstitution2"
                                            name="FinancialInstitution2"
                                            placeholder="Financial Institution"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="FinancialInstitution2"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="IncomeYield2"
                                            className="form-label"
                                          >
                                            Income Yield %
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="IncomeYield2"
                                            name="IncomeYield2"
                                            placeholder="Income Yield %"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="IncomeYield2"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="AnnualIncome2"
                                            className="form-label"
                                          >
                                            Annual Income
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="AnnualIncome2"
                                            name="AnnualIncome2"
                                            placeholder="Annual Income"
                                            readOnly
                                            value={parseFloat(
                                              (
                                                ((parseFloat(
                                                  values.IncomeYield2
                                                ) || 0) /
                                                  100) *
                                                (parseFloat(
                                                  values.CurrentValue2
                                                ) || 0)
                                              ).toFixed(2)
                                            )}
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="AnnualIncome2"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/*  TermDeposit #2 */}

                                  {/*  TermDeposit #3*/}
                                  <div className="d-none ">
                                    <h3 className="">
                                      <div className="iconContainerLg mx-1">
                                        <img
                                          className="img-fluid"
                                          src={lawyer}
                                          alt=""
                                        />
                                      </div>
                                      TermDeposit #3
                                    </h3>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="CurrentValue3"
                                            className="form-label"
                                          >
                                            Current Value
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="CurrentValue3"
                                            name="CurrentValue3"
                                            placeholder="Current Value"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="CurrentValue3"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="FinancialInstitution3"
                                            className="form-label"
                                          >
                                            Financial Institution
                                          </label>
                                          <Field
                                            type="text"
                                            className="form-control shadow inputDesign"
                                            id="FinancialInstitution3"
                                            name="FinancialInstitution3"
                                            placeholder="Financial Institution"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="FinancialInstitution3"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="IncomeYield3"
                                            className="form-label"
                                          >
                                            Income Yield %
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="IncomeYield3"
                                            name="IncomeYield3"
                                            placeholder="Income Yield %"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="IncomeYield3"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="AnnualIncome3"
                                            className="form-label"
                                          >
                                            Annual Income
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="AnnualIncome3"
                                            name="AnnualIncome3"
                                            placeholder="Annual Income"
                                            readOnly
                                            value={parseFloat(
                                              (
                                                ((parseFloat(
                                                  values.IncomeYield3
                                                ) || 0) /
                                                  100) *
                                                (parseFloat(
                                                  values.CurrentValue3
                                                ) || 0)
                                              ).toFixed(2)
                                            )}
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="AnnualIncome3"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/*  TermDeposit #3 */}

                                  {/* TermDeposit Account Detail Form */}
                                </Modal.Body>
                                <Modal.Footer>
                                  <div className="col-md-12">
                                    <button
                                      className="float-end btn w-25  bgColor modalBtn"
                                      // onClick={TermDeposithandleClose}
                                      type="submit"
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      className="float-end btn w-25  btn-outline  backBtn mx-3"
                                      onClick={TermDeposithandleClose}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </Modal.Footer>
                              </Form>
                            )}
                          </Formik>
                        </Modal>
                        {/* ----------------------------termDepost------------------------ */}
                          {/* ---------------------------------------------------- */}
                          {/* TermTable */}
                          <div className="table-responsive my-3">
                            <table className="table table-bordered table-hover text-center">
                              <thead className="text-light" id="tableHead">
                                <tr>
                                  <th>Current Value</th>
                                  <th>Financial Institution</th>
                                  <th>Income Yield</th>
                                  <th>Annual Income</th>
                                  <th>Operations</th>
                                </tr>
                              </thead>
                              <tbody>
                                {/* term123 */}

                                {/* Term Deposit #1  */}
                                {termAccountList.map((elem, index) => {
                                  let {
                                    CurrentValue1,
                                    FinancialInstitution1,
                                    IncomeYield1,
                                    AnnualIncome1,
                                  } = elem;
                                  if (
                                    termAccountList[0].CurrentValue1 !== "" ||
                                    termAccountList[0].FinancialInstitution1 !==
                                      ""
                                  ) {
                                    return (
                                      <tr key={index}>
                                        {/* <td className='fw-bold'>Bank #1</td> */}
                                        <td>{CurrentValue1}</td>
                                        <td>{FinancialInstitution1}</td>
                                        <td>{IncomeYield1}</td>
                                        <td>{AnnualIncome1}</td>
                                        <td>
                                          {/* <button  type='button'  className='btn btn-danger btn-sm'>delete</button> */}
                                          <button
                                            type="button"
                                            onClick={(e) =>
                                              TermDepositDeleteHandler1(elem)
                                            }
                                            className="btn btn-danger btn-sm"
                                          >
                                            delete
                                          </button>

                                          {/* <button type='button' className='btn btn-warning btn-sm mx-2'>update</button> */}
                                          <button
                                            type="button"
                                            onClick={TermDeposithandleShow}
                                            className="btn btn-warning btn-sm mx-2"
                                          >
                                            update
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  } else {
                                  }
                                })}
                                {/* Term Deposit #1  */}

                                {/* Term Deposit #2  */}
                                {termAccountList.map((elem, index) => {
                                  let {
                                    CurrentValue2,
                                    FinancialInstitution2,
                                    IncomeYield2,
                                    AnnualIncome2,
                                  } = elem;
                                  if (
                                    termAccountList[0].CurrentValue2 !== "" ||
                                    termAccountList[0].FinancialInstitution2 !==
                                      ""
                                  ) {
                                    return (
                                      <tr key={index}>
                                        {/* <td className='fw-bold'>Bank #1</td> */}
                                        <td>{CurrentValue2}</td>
                                        <td>{FinancialInstitution2}</td>
                                        <td>{IncomeYield2}</td>
                                        <td>{AnnualIncome2}</td>
                                        <td>
                                          {/* <button  type='button'  className='btn btn-danger btn-sm'>delete</button> */}
                                          <button
                                            type="button"
                                            onClick={(e) =>
                                              TermDepositDeleteHandler2(elem)
                                            }
                                            className="btn btn-danger btn-sm"
                                          >
                                            delete
                                          </button>

                                          {/* <button type='button' className='btn btn-warning btn-sm mx-2'>update</button> */}
                                          <button
                                            type="button"
                                            onClick={TermDeposithandleShow}
                                            className="btn btn-warning btn-sm mx-2"
                                          >
                                            update
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  } else {
                                  }
                                })}
                                {/* Term Deposit #2  */}

                                {/* Term Deposit #3  */}
                                {termAccountList.map((elem, index) => {
                                  let {
                                    CurrentValue3,
                                    FinancialInstitution3,
                                    IncomeYield3,
                                    AnnualIncome3,
                                  } = elem;
                                  if (
                                    termAccountList[0].CurrentValue3 !== "" ||
                                    termAccountList[0].FinancialInstitution3 !==
                                      ""
                                  ) {
                                    return (
                                      <tr key={index}>
                                        {/* <td className='fw-bold'>Bank #1</td> */}
                                        <td>{CurrentValue3}</td>
                                        <td>{FinancialInstitution3}</td>
                                        <td>{IncomeYield3}</td>
                                        <td>{AnnualIncome3}</td>
                                        <td>
                                          {/* <button  type='button'  className='btn btn-danger btn-sm'>delete</button> */}
                                          <button
                                            type="button"
                                            onClick={(e) =>
                                              TermDepositDeleteHandler3(elem)
                                            }
                                            className="btn btn-danger btn-sm"
                                          >
                                            delete
                                          </button>

                                          {/* <button type='button' className='btn btn-warning btn-sm mx-2'>update</button> */}
                                          <button
                                            type="button"
                                            onClick={TermDeposithandleShow}
                                            className="btn btn-warning btn-sm mx-2"
                                          >
                                            update
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  } else {
                                  }
                                })}
                                {/* Term Deposit #3  */}

                                {/* term123 */}
                              </tbody>
                            </table>
                          </div>

                          {/* TermTable */}
                        </div>
                      )}
                      {/* TermDeposit Accounts Details */}

                      {/* Australian Share Market Details */}
                      {CRObject.TermSharesManaged == "Yes" && (
                        <div className="mb-5">
                          <h3 className="">Australian Share Market</h3>

                          {/* 1 row */}
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Do you have any Australian Market Shares?
                                </label>
                                {/* switch button style */}
                                <div className="form-check form-switch m-0 p-0 ">
                                  <div className="radiobutton">
                                    <input
                                      type="radio"
                                      name="AustralianShareRadio"
                                      id="AustralianShareopt1"
                                      value="Yes"
                                      onClick={() =>
                                        AustralianShareHandler("Yes")
                                      }
                                      onChange={handleChange}
                                      checked={
                                        values.AustralianShareRadio === "Yes"
                                      }
                                    />
                                    <label
                                      htmlFor="AustralianShareopt1"
                                      className="label1"
                                    >
                                      <span>YES</span>
                                    </label>
                                    <input
                                      type="radio"
                                      name="AustralianShareRadio"
                                      id="AustralianShareopt2"
                                      value="No"
                                      onClick={() =>
                                        AustralianShareHandler("No")
                                      }
                                      onChange={handleChange}
                                      checked={
                                        values.AustralianShareRadio === "No"
                                      }
                                    />
                                    <label
                                      htmlFor="AustralianShareopt2"
                                      className="label2"
                                    >
                                      <span>NO</span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {values.AustralianShareRadio === "Yes" && (
                              <div className="col-md-6">
                                <label className="form-label">
                                  Please enter the details of your Australian
                                  Market Shares
                                </label>
                                <br />

                                <span
                                  className=" btn h-50 w-50
                                btn-outline-success "
                                  onClick={AustralianSharehandleShow}
                                >
                                  <div className="iconContainer mx-1">
                                    <img
                                      className="img-fluid"
                                      src={plus}
                                      alt=""
                                    />
                                  </div>
                                  Enter Details
                                </span>
                              </div>
                            )}
                          </div>
                          {/* 1 row */}

                          {/* --------------------------------------------- */}

                          <Modal
                            show={AustralianShareshow}
                            onHide={AustralianSharehandleClose}
                            backdrop="static"
                            className="modal-lg"
                            keyboard={false}
                          >
                            <Modal.Header
                              className="text-light modalBG "
                              closeButton
                            >
                              <Modal.Title className="fontStyle">
                                Australian Share Market Details
                                <div className="iconContainerLg">
                                  <img
                                    className="img-fluid"
                                    src={notebook}
                                    alt=""
                                  />
                                </div>
                              </Modal.Title>
                            </Modal.Header>
                            <Formik
                              initialValues={
                                AustralianShareFlag
                                  ? AustralianShareObj[0]
                                  : Client_initialValues
                              }
                              validationSchema={Australian_validationSchema}
                              onSubmit={Australian_onSubmit}
                            >
                              {({
                                values,
                                setFieldValue,
                                setValues,
                                handleChange,
                                handleBlur,
                              }) => (
                                <Form>
                                  <Modal.Body>
                                    {/* Professional Advisor Detail Form */}

                                    {/* Solicitor */}
                                    <div className=" ">
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="AustralianShareInvestmentName"
                                            className="form-label"
                                          >
                                            Investment Name
                                          </label>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            as="select"
                                            name="AustralianShareInvestmentName"
                                            id="AustralianShareInvestmentName"
                                            className="form-select shadow  inputDesign"
                                          >
                                            <option value="">Select</option>
                                            <option value="1AL">1AL</option>
                                            <option value="3PL">3PL</option>
                                            <option value="88E">88E</option>
                                            <option value="A2M">A2M</option>
                                          </Field>
                                          <ErrorMessage
                                            name="AustralianShareInvestmentName"
                                            component="div"
                                            className="text-danger fw-bold"
                                          />
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="AustralianShareNoOfShares"
                                            className="form-label"
                                          >
                                            No. of Shares
                                          </label>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="AustralianShareNoOfShares"
                                            name="AustralianShareNoOfShares"
                                            placeholder="No. of Shares"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="AustralianShareNoOfShares"
                                          />
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="AustralianShareCurrentPrice"
                                            className="form-label"
                                          >
                                            Current Share Price
                                          </label>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="AustralianShareCurrentPrice"
                                            name="AustralianShareCurrentPrice"
                                            placeholder="Current Share Price"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="AustralianShareCurrentPrice"
                                          />
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="AustralianShareTotalValue"
                                            className="form-label"
                                          >
                                            Total Share Value
                                          </label>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="AustralianShareTotalValue"
                                            name="AustralianShareTotalValue"
                                            placeholder="Total Share Value"
                                            readOnly
                                            value={
                                              (parseFloat(
                                                values.AustralianShareCurrentPrice
                                              ) || 0) *
                                              (parseFloat(
                                                values.AustralianShareNoOfShares
                                              ) || 0)
                                            }
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="AustralianShareTotalValue"
                                          />
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="AustralianShareCostBase"
                                            className="form-label"
                                          >
                                            Cost Base
                                          </label>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="AustralianShareCostBase"
                                            name="AustralianShareCostBase"
                                            placeholder="Cost Base"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="AustralianShareCostBase"
                                          />
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="AustralianSharePurchaseDate"
                                            className="form-label"
                                          >
                                            Purchase Date
                                          </label>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <div>
                                            <DatePicker
                                              className="form-control inputDesign shadow"
                                              showIcon
                                              id="AustralianSharePurchaseDate"
                                              name="AustralianSharePurchaseDate"
                                              selected={
                                                values.AustralianSharePurchaseDate
                                              }
                                              onChange={(date) =>
                                                setFieldValue(
                                                  "AustralianSharePurchaseDate",
                                                  date
                                                )
                                              }
                                              dateFormat="dd/MM/yyyy"
                                              placeholderText="dd/mm/yyyy"
                                              maxDate={new Date()}
                                              showMonthDropdown
                                              showYearDropdown
                                              dropdownMode="select"
                                              onBlur={handleBlur}
                                            />
                                          </div>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="AustralianSharePurchaseDate"
                                          />
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="AustralianShareIncomePA"
                                            className="form-label"
                                          >
                                            Income P.A.
                                          </label>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <div className="row">
                                            <div className="col-md-8">
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="AustralianShareIncomePA"
                                                name="AustralianShareIncomePA"
                                                placeholder="Income P.A."
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="AustralianShareIncomePA"
                                              />
                                            </div>
                                            <div className="col-md-4">
                                              <Field
                                                as="select"
                                                name="AustralianShareIncomePA2"
                                                id="AustralianShareIncomePA2"
                                                className="form-select shadow  inputDesign"
                                              >
                                                <option value="">Select</option>
                                                <option value="dollor">
                                                  $
                                                </option>
                                                <option value="percentage">
                                                  %
                                                </option>
                                              </Field>
                                              <ErrorMessage
                                                name="AustralianShareIncomePA2"
                                                component="div"
                                                className="text-danger fw-bold"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="AustralianShareTotalIncomePA"
                                            className="form-label"
                                          >
                                            Total Income P.A.
                                          </label>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="AustralianShareTotalIncomePA"
                                            name="AustralianShareTotalIncomePA"
                                            placeholder="Total Income P.A."
                                            readOnly
                                            value={
                                              values.AustralianShareIncomePA2 ==
                                              ""
                                                ? 0
                                                : values.AustralianShareIncomePA2 ==
                                                  "dollor"
                                                ? parseFloat(
                                                    values.AustralianShareIncomePA
                                                  ) || 0
                                                : parseFloat(
                                                    (
                                                      ((parseFloat(
                                                        values.AustralianShareIncomePA
                                                      ) || 0) /
                                                        100) *
                                                      ((parseFloat(
                                                        values.AustralianShareCurrentPrice
                                                      ) || 0) *
                                                        (parseFloat(
                                                          values.AustralianShareNoOfShares
                                                        ) || 0))
                                                    ).toFixed(2)
                                                  )
                                            }
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="AustralianShareTotalIncomePA"
                                          />
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <label className="form-label">
                                            Reinvest Income
                                          </label>
                                          {/* switch button style */}
                                        </div>
                                        <div className="col-6 mb-3">
                                          <div className="form-check form-switch m-0 p-0 ">
                                            <div className="radiobutton">
                                              <input
                                                type="radio"
                                                name="AustralianShareReinvestIncome"
                                                id="AustralianShareReinvestIncomeOpt1"
                                                value="Yes"
                                                onChange={handleChange}
                                                checked={
                                                  values.AustralianShareReinvestIncome ===
                                                  "Yes"
                                                }
                                              />
                                              <label
                                                htmlFor="AustralianShareReinvestIncomeOpt1"
                                                className="label1"
                                              >
                                                <span>YES</span>
                                              </label>
                                              <input
                                                type="radio"
                                                name="AustralianShareReinvestIncome"
                                                id="AustralianShareReinvestIncomeOpt2"
                                                value="No"
                                                onChange={handleChange}
                                                checked={
                                                  values.AustralianShareReinvestIncome ===
                                                  "No"
                                                }
                                              />
                                              <label
                                                htmlFor="AustralianShareReinvestIncomeOpt2"
                                                className="label2"
                                              >
                                                <span>NO</span>
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="AustralianShareFrankedAmount"
                                            className="form-label"
                                          >
                                            Franked Amount %
                                          </label>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="AustralianShareFrankedAmount"
                                            name="AustralianShareFrankedAmount"
                                            placeholder="Franked Amount %"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="AustralianShareFrankedAmount"
                                          />
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="AustralianShareRegInvestmentsPA"
                                            className="form-label"
                                          >
                                            Reg Investments P.A.
                                          </label>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="AustralianShareRegInvestmentsPA"
                                            name="AustralianShareRegInvestmentsPA"
                                            placeholder="Reg Investments P.A."
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="AustralianShareRegInvestmentsPA"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    {/* Solicitor */}

                                    {/* Bank Account Detail Form */}
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <div className="col-md-12">
                                      <button
                                        className="float-end btn w-25  bgColor modalBtn"
                                        // onClick={BankhandleClose}
                                        type="submit"
                                      >
                                        Save
                                      </button>
                                      <button
                                        type="button"
                                        className="float-end btn w-25  btn-outline  backBtn mx-3"
                                        onClick={AustralianSharehandleClose}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </Modal.Footer>
                                </Form>
                              )}
                            </Formik>
                          </Modal>
                          {/* ---------------------------------------------------- */}
                          {/* Australian Table */}

                          <div className="table-responsive my-3">
                            <table className="table table-bordered table-hover text-center">
                              <thead className="text-light" id="tableHead">
                                <tr>
                                  <th>Company Name</th>
                                  <th>Total Share Value</th>
                                  <th>Cost Base</th>
                                  <th>Income pa</th>
                                  <th>Reinvest Income</th>
                                  <th>Operations</th>
                                </tr>
                              </thead>
                              <tbody>
                                {AustralianShareList.map((elem, index) => {
                                  // let {ChildName,childDoBID,childRelationship,childAge,childGender}=elem;

                                  return (
                                    <tr key={index}>
                                      <td>{elem.InvestmentName}</td>
                                      <td>{elem.TotalShareValue}</td>
                                      <td>{elem.CostBase}</td>
                                      <td>{elem.IncomePA}</td>
                                      <td>{elem.ReinvestIncome}</td>
                                      <td>
                                        <button
                                          type="button"
                                          onClick={(e) =>
                                            deleteHandler_AustralianShare(
                                              elem,
                                              index
                                            )
                                          }
                                          className="btn btn-danger btn-sm"
                                        >
                                          delete
                                        </button>
                                        <button
                                          type="button"
                                          onClick={(e) =>
                                            updateHandler_AustralianShare(elem)
                                          }
                                          className="btn btn-warning btn-sm mx-2"
                                        >
                                          update
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>

                          {/* Australian Table */}

                          {/* Aus loans portfolio associated */}

                          {CRObject.TermSharesManaged == "Yes" &&
                            CRObject.InvestmentLoans == "Yes" && (
                              <div className=" mt-5">
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="mb-3">
                                      <label className="form-label">
                                        Does your share portfolio have any loans
                                        associated with them?
                                      </label>
                                      {/* switch button style */}
                                      <div className="form-check form-switch m-0 p-0 ">
                                        <div className="radiobutton">
                                          <input
                                            type="radio"
                                            name="loansAssociatedradio"
                                            id="loansAssociatedopt1"
                                            onChange={handleChange}
                                            value="Yes"
                                            checked={
                                              values.loansAssociatedradio ===
                                              "Yes"
                                            }
                                          />
                                          <label
                                            htmlFor="loansAssociatedopt1"
                                            className="label1"
                                          >
                                            <span>YES</span>
                                          </label>
                                          <input
                                            type="radio"
                                            name="loansAssociatedradio"
                                            id="loansAssociatedopt2"
                                            onChange={handleChange}
                                            value="No"
                                            checked={
                                              values.loansAssociatedradio ===
                                              "No"
                                            }
                                          />
                                          <label
                                            htmlFor="loansAssociatedopt2"
                                            className="label2"
                                          >
                                            <span>NO</span>
                                          </label>
                                        </div>
                                      </div>
                                      {/* switch button style */}
                                    </div>
                                  </div>
                                  {values.loansAssociatedradio === "Yes" && (
                                    <div className="col-md-6 my-2">
                                      <label className="form-label">
                                        Please enter the details
                                      </label>
                                      <br />

                                      <span
                                        className=" btn h-50 w-50
                            btn-outline-success "
                                        onClick={handleShow4}
                                      >
                                        <div className="iconContainer mx-1">
                                          <img
                                            className="img-fluid"
                                            src={plus}
                                            alt=""
                                          />
                                        </div>
                                        Enter Details
                                      </span>
                                    </div>
                                  )}
                                </div>
                                {/* loans associated modal */}

                                <Modal
                                  show={show4}
                                  onHide={handleClose4}
                                  backdrop="static"
                                  className="modal-lg"
                                  keyboard={false}
                                >
                                  <Modal.Header
                                    className="text-light modalBG "
                                    closeButton
                                  >
                                    <Modal.Title className="fontStyle">
                                      Add Loan Details
                                      <div className="iconContainerLg">
                                        <img
                                          className="img-fluid"
                                          src={notebook}
                                          alt=""
                                        />
                                      </div>
                                    </Modal.Title>
                                  </Modal.Header>
                                  <Formik
                                    initialValues={
                                      AustralianLoanFlag
                                        ? AustralianLoanObj[0]
                                        : Australian_loansAssociated_initialValues
                                    }
                                    validationSchema={
                                      Australian_loansAssociated_validationSchema
                                    }
                                    onSubmit={
                                      Australian_loansAssociated_onSubmit
                                    }
                                  >
                                    {({
                                      values,
                                      setFieldValue,
                                      handleBlur,
                                      setValues,
                                      handleChange,
                                      formik,
                                    }) => (
                                      <Form>
                                        <Modal.Body>
                                          {/* Share details 3rd*/}

                                          <div className="">
                                            <div className="row">
                                              <div className="col-6 mb-3">
                                                <label
                                                  htmlFor="AustralianPortfolioLoanType"
                                                  className="form-label"
                                                >
                                                  Type of loan
                                                </label>
                                              </div>
                                              <div className="col-6 mb-3">
                                                <Field
                                                  as="select"
                                                  id="AustralianPortfolioLoanType"
                                                  className="form-select shadow  inputDesign"
                                                  name="AustralianPortfolioLoanType"
                                                >
                                                  <option value="">
                                                    Select
                                                  </option>
                                                  <option value="InvestmentLoan">
                                                    Investment Loan
                                                  </option>
                                                </Field>
                                                <ErrorMessage
                                                  className="text-danger fw-bold"
                                                  component="div"
                                                  name="AustralianPortfolioLoanType"
                                                />
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-6 mb-3">
                                                <label
                                                  htmlFor="AustralianPortfolioCurrentBalance"
                                                  className="form-label"
                                                >
                                                  Current Balance
                                                </label>
                                              </div>
                                              <div className="col-6 mb-3">
                                                <Field
                                                  type="number"
                                                  className="form-control shadow inputDesign"
                                                  id="AustralianPortfolioCurrentBalance"
                                                  name="AustralianPortfolioCurrentBalance"
                                                  placeholder="Current Balance"
                                                />
                                                <ErrorMessage
                                                  className="text-danger fw-bold"
                                                  component="div"
                                                  name="AustralianPortfolioCurrentBalance"
                                                />
                                              </div>
                                            </div>

                                            <div className="row">
                                              <div className="col-6 mb-3">
                                                <label
                                                  htmlFor="AustralianPortfolioLender"
                                                  className="form-label"
                                                >
                                                  Lender
                                                </label>
                                              </div>
                                              <div className="col-6 mb-3">
                                                <Field
                                                  type="text"
                                                  className="form-control shadow inputDesign"
                                                  id="AustralianPortfolioLender"
                                                  name="AustralianPortfolioLender"
                                                  placeholder="Lender"
                                                />
                                                <ErrorMessage
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                  name="AustralianPortfolioLender"
                                                />
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-6 mb-3">
                                                <label
                                                  htmlFor="AustralianPortfolioRepaymentAmount"
                                                  className="form-label"
                                                >
                                                  Repayments Amount
                                                </label>
                                              </div>
                                              <div className="col-6 mb-3">
                                                <Field
                                                  type="number"
                                                  className="form-control shadow inputDesign"
                                                  id="AustralianPortfolioRepaymentAmount"
                                                  name="AustralianPortfolioRepaymentAmount"
                                                  placeholder="Repayments Amount"
                                                />
                                                <ErrorMessage
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                  name="AustralianPortfolioRepaymentAmount"
                                                />
                                              </div>
                                            </div>

                                            <div className="row">
                                              <div className="col-6 mb-3">
                                                <label
                                                  htmlFor="AustralianPortfolioFrequency"
                                                  className="form-label"
                                                >
                                                  Frequency
                                                </label>
                                              </div>
                                              <div className="col-6 mb-3">
                                                <Field
                                                  as="select"
                                                  id="AustralianPortfolioFrequency"
                                                  className="form-select shadow  inputDesign"
                                                  name="AustralianPortfolioFrequency"
                                                >
                                                  <option value="">
                                                    Select
                                                  </option>
                                                  <option value="Weekly">
                                                    {" "}
                                                    Weekly
                                                  </option>
                                                  <option value="Fortnightly">
                                                    Fortnightly
                                                  </option>
                                                  <option value="Monthly">
                                                    Monthly
                                                  </option>
                                                  <option value="Annually">
                                                    Annually
                                                  </option>
                                                </Field>
                                                <ErrorMessage
                                                  className="text-danger fw-bold"
                                                  component="div"
                                                  name="AustralianPortfolioFrequency"
                                                />
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-6 mb-3">
                                                <label
                                                  htmlFor=""
                                                  className="form-label"
                                                >
                                                  Annual Repayments
                                                </label>
                                              </div>
                                              <div className="col-6 mb-3">
                                                <Field
                                                  type="number"
                                                  className="form-control shadow inputDesign"
                                                  id="AustralianPortfolioAnnualRepayment"
                                                  name="AustralianPortfolioAnnualRepayment"
                                                  placeholder="Annual Repayments"
                                                  readOnly
                                                  value={
                                                    values.AustralianPortfolioFrequency ==
                                                    ""
                                                      ? 0
                                                      : values.AustralianPortfolioFrequency ==
                                                        "Weekly"
                                                      ? (parseFloat(
                                                          values.AustralianPortfolioRepaymentAmount
                                                        ) || 0) * 52
                                                      : values.AustralianPortfolioFrequency ==
                                                        "Fortnightly"
                                                      ? (parseFloat(
                                                          values.AustralianPortfolioRepaymentAmount
                                                        ) || 0) * 26
                                                      : values.AustralianPortfolioFrequency ==
                                                        "Monthly"
                                                      ? (parseFloat(
                                                          values.AustralianPortfolioRepaymentAmount
                                                        ) || 0) * 12
                                                      : (parseFloat(
                                                          values.AustralianPortfolioRepaymentAmount
                                                        ) || 0) * 1
                                                  }
                                                />
                                              </div>
                                            </div>

                                            <div className="row">
                                              <div className="col-6 mb-3">
                                                <label
                                                  htmlFor="AustralianInterestRatePA"
                                                  className="form-label"
                                                >
                                                  Interest Rate (p.a)
                                                </label>
                                              </div>
                                              <div className="col-6 mb-3">
                                                <Field
                                                  type="number"
                                                  className="form-control shadow inputDesign"
                                                  id="AustralianInterestRatePA"
                                                  name="AustralianInterestRatePA"
                                                  placeholder="Current Balance"
                                                />
                                                <ErrorMessage
                                                  className="text-danger fw-bold"
                                                  component="div"
                                                  name="AustralianInterestRatePA"
                                                />
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-6 mb-3">
                                                <label
                                                  htmlFor="AustralianPortfolioLoanTerm"
                                                  className="form-label"
                                                >
                                                  Loan Term (1-30 Years)
                                                </label>
                                              </div>
                                              <div className="col-6 mb-3">
                                                <Field
                                                  as="select"
                                                  id="AustralianPortfolioLoanTerm"
                                                  className="form-select shadow  inputDesign"
                                                  name="AustralianPortfolioLoanTerm"
                                                >
                                                  <option value="">
                                                    Select
                                                  </option>
                                                  <option value="1">1</option>
                                                  <option value="2">2</option>
                                                  <option value="3">3</option>
                                                  <option value="4">4</option>
                                                  <option value="5">5</option>
                                                  <option value="6">6</option>
                                                  <option value="7">7</option>
                                                  <option value="8">8</option>
                                                  <option value="9">9</option>
                                                  <option value="10">10</option>
                                                  <option value="11">11</option>
                                                  <option value="12">12</option>
                                                  <option value="13">13</option>
                                                  <option value="14">14</option>
                                                  <option value="15">15</option>
                                                  <option value="16">16</option>
                                                  <option value="17">17</option>
                                                  <option value="18">18</option>
                                                  <option value="19">19</option>
                                                  <option value="20">20</option>
                                                  <option value="21">21</option>
                                                  <option value="22">22</option>
                                                  <option value="23">23</option>
                                                  <option value="24">24</option>
                                                  <option value="25">25</option>
                                                  <option value="26">26</option>
                                                  <option value="27">27</option>
                                                  <option value="28">28</option>
                                                  <option value="29">29</option>
                                                  <option value="30">30</option>
                                                </Field>
                                                <ErrorMessage
                                                  className="text-danger fw-bold"
                                                  component="div"
                                                  name="AustralianPortfolioLoanTerm"
                                                />
                                              </div>
                                            </div>

                                            <div className="row">
                                              <div className="col-6 mb-3">
                                                <label
                                                  htmlFor="AustralianPortfolioLoanType2"
                                                  className="form-label"
                                                >
                                                  Loan Type
                                                </label>
                                              </div>
                                              <div className="col-6 mb-3">
                                                <Field
                                                  as="select"
                                                  id="AustralianPortfolioLoanType2"
                                                  className="form-select shadow  inputDesign"
                                                  name="AustralianPortfolioLoanType2"
                                                >
                                                  <option value="">
                                                    Select
                                                  </option>
                                                  <option value="IByOnly">
                                                    I/Only
                                                  </option>
                                                  <option value="P&I">
                                                    P&I
                                                  </option>
                                                </Field>
                                                <ErrorMessage
                                                  className="text-danger fw-bold"
                                                  component="div"
                                                  name="AustralianPortfolioLoanType2"
                                                />
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-6 mb-3">
                                                <label
                                                  htmlFor="AustralianPortfolioDeductibleLoanAmount"
                                                  className="form-label"
                                                >
                                                  Deductible Amount of Loan (%)
                                                </label>
                                              </div>
                                              <div className="col-6 mb-3">
                                                <Field
                                                  type="number"
                                                  className="form-control shadow inputDesign"
                                                  id="AustralianPortfolioDeductibleLoanAmount"
                                                  name="AustralianPortfolioDeductibleLoanAmount"
                                                  placeholder="Deductible Amount of Loan"
                                                />
                                                <ErrorMessage
                                                  className="text-danger fw-bold"
                                                  component="div"
                                                  name="AustralianPortfolioDeductibleLoanAmount"
                                                />
                                              </div>
                                            </div>

                                            <div className="row">
                                              <div className="col-6 mb-3">
                                                <label
                                                  htmlFor="AustralianPortfolioYearRemaining"
                                                  className="form-label"
                                                >
                                                  Year Remaning (1-30 Years)
                                                </label>
                                              </div>
                                              <div className="col-6 mb-3">
                                                <Field
                                                  as="select"
                                                  id="AustralianPortfolioYearRemaining"
                                                  className="form-select shadow  inputDesign"
                                                  name="AustralianPortfolioYearRemaining"
                                                >
                                                  <option value="">
                                                    Select
                                                  </option>
                                                  <option value="1">1</option>
                                                  <option value="2">2</option>
                                                  <option value="3">3</option>
                                                  <option value="4">4</option>
                                                  <option value="5">5</option>
                                                  <option value="6">6</option>
                                                  <option value="7">7</option>
                                                  <option value="8">8</option>
                                                  <option value="9">9</option>
                                                  <option value="10">10</option>
                                                  <option value="11">11</option>
                                                  <option value="12">12</option>
                                                  <option value="13">13</option>
                                                  <option value="14">14</option>
                                                  <option value="15">15</option>
                                                  <option value="16">16</option>
                                                  <option value="17">17</option>
                                                  <option value="18">18</option>
                                                  <option value="19">19</option>
                                                  <option value="20">20</option>
                                                  <option value="21">21</option>
                                                  <option value="22">22</option>
                                                  <option value="23">23</option>
                                                  <option value="24">24</option>
                                                  <option value="25">25</option>
                                                  <option value="26">26</option>
                                                  <option value="27">27</option>
                                                  <option value="28">28</option>
                                                  <option value="29">29</option>
                                                  <option value="30">30</option>
                                                </Field>
                                                <ErrorMessage
                                                  className="text-danger fw-bold"
                                                  component="div"
                                                  name="AustralianPortfolioYearRemaining"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          {/* Share details */}
                                        </Modal.Body>
                                        <Modal.Footer>
                                          <div className="col-md-12">
                                            <button
                                              className="float-end btn w-25  bgColor modalBtn"
                                              // onClick={handleClose}
                                              type="submit"
                                            >
                                              Save
                                            </button>
                                            <button
                                              type="button"
                                              className="float-end btn w-25  btn-outline  backBtn mx-3"
                                              onClick={handleClose4}
                                            >
                                              Cancel
                                            </button>
                                          </div>
                                        </Modal.Footer>
                                      </Form>
                                    )}
                                  </Formik>
                                </Modal>
                                {/* loans associated modal */}

                                {/* Australian Table */}

                                <div className="table-responsive my-3">
                                  <table className="table table-bordered table-hover text-center">
                                    <thead
                                      className="text-light"
                                      id="tableHead"
                                    >
                                      <tr>
                                        <th>Type of Loan</th>
                                        <th>Current Balance</th>
                                        <th>Lender</th>
                                        <th>Annual Repayments</th>
                                        <th>Interest Rate (p.a)</th>
                                        <th>Operations</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {AustralianLoanList.map((elem, index) => {
                                        return (
                                          <tr key={index}>
                                            <td>
                                              {elem.AustralianPortfolioLoanType}
                                            </td>
                                            <td>
                                              {
                                                elem.AustralianPortfolioCurrentBalance
                                              }
                                            </td>
                                            <td>
                                              {elem.AustralianPortfolioLender}
                                            </td>
                                            <td>
                                              {
                                                elem.AustralianPortfolioRepaymentAmount
                                              }
                                            </td>
                                            <td>
                                              {elem.AustralianInterestRatePA}
                                            </td>
                                            <td>
                                              <button
                                                type="button"
                                                onClick={(e) =>
                                                  deleteHandler_AustralianLoan(
                                                    elem,
                                                    index
                                                  )
                                                }
                                                className="btn btn-danger btn-sm"
                                              >
                                                delete
                                              </button>
                                              <button
                                                type="button"
                                                onClick={(e) =>
                                                  updateHandler_AustralianLoan(
                                                    elem
                                                  )
                                                }
                                                className="btn btn-warning btn-sm mx-2"
                                              >
                                                update
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>

                                {/* Australian TableLoan */}
                              </div>
                            )}

                          {/*  Aus loans portfolio associated */}
                        </div>
                      )}
                      {/* Australian Share Market Details */}

                      {/* Managed Funds Details */}
                      {CRObject.TermSharesManaged == "Yes" && (
                        <div className="mb-5">
                          <h3 className="">Managed Funds</h3>

                          {/* 1 row */}
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Do you have any Managed Funds?
                                </label>
                                {/* switch button style */}
                                <div className="form-check form-switch m-0 p-0 ">
                                  <div className="radiobutton">
                                    <input
                                      type="radio"
                                      name="ManagedFundsRadio"
                                      id="ManagedFundsopt1"
                                      value="Yes"
                                      onClick={() => ManagedFundsHandler("Yes")}
                                      onChange={handleChange}
                                      checked={
                                        values.ManagedFundsRadio === "Yes"
                                      }
                                    />
                                    <label
                                      htmlFor="ManagedFundsopt1"
                                      className="label1"
                                    >
                                      <span>YES</span>
                                    </label>
                                    <input
                                      type="radio"
                                      name="ManagedFundsRadio"
                                      id="ManagedFundsopt2"
                                      value="No"
                                      onClick={() => ManagedFundsHandler("No")}
                                      onChange={handleChange}
                                      checked={
                                        values.ManagedFundsRadio === "No"
                                      }
                                    />
                                    <label
                                      htmlFor="ManagedFundsopt2"
                                      className="label2"
                                    >
                                      <span>NO</span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {values.ManagedFundsRadio === "Yes" && (
                              <div className="col-md-6">
                                <label className="form-label">
                                  Please enter the details of your Managed Funds
                                </label>
                                <br />

                                <span
                                  className=" btn h-50 w-50
                                btn-outline-success "
                                  onClick={ManagedFundshandleShow}
                                >
                                  <div className="iconContainer mx-1">
                                    <img
                                      className="img-fluid"
                                      src={plus}
                                      alt=""
                                    />
                                  </div>
                                  Enter Details
                                </span>
                              </div>
                            )}
                          </div>
                          {/* 1 row */}

                          {/* --------------------------------------------- */}

                                          {/* -------------------- manageFund ---------------------*/}
 
<Modal
                          show={ManagedFundsshow}
                          onHide={ManagedFundshandleClose}
                          backdrop="static"
                          className="modal-lg"
                          keyboard={false}
                        >
                          <Modal.Header
                            className="text-light modalBG "
                            closeButton
                          >
                            <Modal.Title className="fontStyle">
                              Managed Funds Details
                              <div className="iconContainerLg">
                                <img
                                  className="img-fluid"
                                  src={notebook}
                                  alt=""
                                />
                              </div>
                            </Modal.Title>
                          </Modal.Header>
                          <Formik
                            initialValues={
                              manageFundFlag
                                ? manageFundObj[0]
                                : Client_initialValues
                            }
                            validationSchema={Manage_validationSchema}
                            onSubmit={ManageFund_onSubmit}
                          >
                            {({
                              values,
                              setFieldValue,
                              setValues,
                              handleChange,
                              handleBlur,
                            }) => (
                              <Form>
                                <Modal.Body>
                                  {/* Professional Advisor Detail Form */}

                                  {/* Solicitor */}
                                  <div className=" ">

                              
                                    <div className="row mb-3">


                                        <div className="col-6">
                                          <label
                                            htmlFor="ManagedFundsPlatformName"
                                            className="form-label"
                                          >
                                            Platform Name
                                          </label>
                                      </div>

                                      <div className="col-6">
                                          <Field
                                            as="select"
                                            name="ManagedFundsPlatformName"
                                            id="ManagedFundsPlatformName"
                                            className="form-select shadow  inputDesign"
                                          >
                                            <option value="">Select</option>
                                            <option value="AMP - Choice">
                                              AMP - Choice
                                            </option>
                                            <option value="AMP - Core">
                                              AMP - Core
                                            </option>
                                            <option value="AMP - Select">
                                              AMP - Select
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            name="ManagedFundsPlatformName"
                                            component="div"
                                            className="text-danger fw-bold"
                                          />
                                        </div>
                                      </div>

                                    <div className="row mb-3">

                                        <div className="col-6">
                                          <label
                                            htmlFor="ManagedFundsInvestmentName"
                                            className="form-label"
                                          >
                                            Investment Name
                                          </label>
                                        </div>

                                      <div className="col-6">
                                          <Field
                                            as="select"
                                            name="ManagedFundsInvestmentName"
                                            id="ManagedFundsInvestmentName"
                                            className="form-select shadow  inputDesign"
                                          >
                                            <option value="">Select</option>
                                            <option value="1AL">1AL</option>
                                            <option value="3PL">3PL</option>
                                            <option value="88E">88E</option>
                                            <option value="A2M">A2M</option>
                                          </Field>
                                          <ErrorMessage
                                            name="ManagedFundsInvestmentName"
                                            component="div"
                                            className="text-danger fw-bold"
                                          />
                                      </div>
                                      </div>

                                      <div className="row mb-3">

                                        <div className="col-6">
                                          <label
                                            htmlFor="ManagedFundsNoOfShares"
                                            className="form-label"
                                          >
                                            No. of Units/Shares
                                          </label>
                                        </div>

                                      <div className="col-6">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="ManagedFundsNoOfShares"
                                            name="ManagedFundsNoOfShares"
                                            placeholder="No. of Shares"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="ManagedFundsNoOfShares"
                                          />
                                      </div>
                                      </div>



                                      <div className="row mb-3">

                                        <div className="col-6">
                                          <label
                                            htmlFor="ManagedFundsCurrentPrice"
                                            className="form-label"
                                          >
                                            Current Unit/Share Price
                                          </label>
                                        </div>

                                      <div className="col-6">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="ManagedFundsCurrentPrice"
                                            name="ManagedFundsCurrentPrice"
                                            placeholder="Current Share Price"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="ManagedFundsCurrentPrice"
                                          />
                                      </div>
                                      </div>



                                      <div className="row mb-3">

                                        <div className="col-6">
                                          <label
                                            htmlFor="ManagedFundsCurrentValue"
                                            className="form-label"
                                          >
                                            Current Value
                                          </label>
                                        </div>

                                      <div className="col-6">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="ManagedFundsCurrentValue"
                                            name="ManagedFundsCurrentValue"
                                            placeholder="Current Value"
                                            readOnly
                                            value={
                                              (parseFloat(
                                                values.ManagedFundsNoOfShares
                                              ) || 0) *
                                              (parseFloat(
                                                values.ManagedFundsCurrentPrice
                                              ) || 0)
                                            }
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="ManagedFundsCurrentValue"
                                          />
                                      </div>
                                      </div>

                                      <div className="row mb-3">


                                        <div className="col-6">
                                          <label
                                            htmlFor="ManagedFundsOriginalInvestment"
                                            className="form-label"
                                          >
                                            Original Investment
                                          </label>
                                        </div>

                                      <div className="col-6">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="ManagedFundsOriginalInvestment"
                                            name="ManagedFundsOriginalInvestment"
                                            placeholder="Original Investment"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="ManagedFundsOriginalInvestment"
                                          />
                                      </div>
                                      </div>


                                      <div className="row mb-3">

                                        <div className="col-6">
                                          <label
                                            htmlFor="ManagedFundsPurchaseDate"
                                            className="form-label"
                                          >
                                            Purchase Date
                                          </label>
                                        </div>

                                      <div className="col-md-6">
                                          <div>
                                            <DatePicker
                                              className="form-control inputDesign shadow"
                                              showIcon
                                              id="ManagedFundsPurchaseDate"
                                              name="ManagedFundsPurchaseDate"
                                              selected={
                                                values.ManagedFundsPurchaseDate
                                              }
                                              onChange={(date) =>
                                                setFieldValue(
                                                  "ManagedFundsPurchaseDate",
                                                  date
                                                )
                                              }
                                              dateFormat="dd/MM/yyyy"
                                              placeholderText="dd/mm/yyyy"
                                              maxDate={new Date()}
                                              showMonthDropdown
                                              showYearDropdown
                                              dropdownMode="select"
                                              onBlur={handleBlur}
                                            />
                                          </div>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="ManagedFundsPurchaseDate"
                                          />
                                      </div>
                                      </div>


                                      <div className="row mb-3">

                                        <div className="col-6">
                                          <label
                                            htmlFor="ManagedFundsIncomePA"
                                            className="form-label"
                                          >
                                            Income P.A.
                                          </label>
                                        </div>

                                      <div className="col-md-6">
                                          <div className="row">
                                            <div className="col-md-8">
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="ManagedFundsIncomePA"
                                                name="ManagedFundsIncomePA"
                                                placeholder="Income P.A."
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="ManagedFundsIncomePA"
                                              />
                                            </div>
                                            <div className="col-md-4">
                                              <Field
                                                as="select"
                                                name="ManagedFundsIncomePA2"
                                                id="ManagedFundsIncomePA2"
                                                className="form-select shadow  inputDesign"
                                              >
                                                <option value="">Select</option>
                                                <option value="dollor">
                                                  $
                                                </option>
                                                <option value="percentage">
                                                  %
                                                </option>
                                              </Field>
                                              <ErrorMessage
                                                name="ManagedFundsIncomePA2"
                                                component="div"
                                                className="text-danger fw-bold"
                                              />
                                            </div>
                                          </div>
                                      </div>
                                      </div>

                                    <div className="row mb-3">

                                        <div className="col-6">
                                          <label
                                            htmlFor="ManagedFundsTotalIncomePA"
                                            className="form-label"
                                          >
                                            Total Income P.A.
                                          </label>
                                        </div>

                                      <div className="col-6">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="ManagedFundsTotalIncomePA"
                                            name="ManagedFundsTotalIncomePA"
                                            placeholder="Total Income P.A."
                                            readOnly
                                            value={
                                              values.ManagedFundsIncomePA2 == ""
                                                ? 0
                                                : values.ManagedFundsIncomePA2 ==
                                                  "dollor"
                                                ? parseFloat(
                                                    values.ManagedFundsIncomePA
                                                  ) || 0
                                                : parseFloat(
                                                    (
                                                      ((parseFloat(
                                                        values.ManagedFundsIncomePA
                                                      ) || 0) /
                                                        100) *
                                                      ((parseFloat(
                                                        values.ManagedFundsNoOfShares
                                                      ) || 0) *
                                                        (parseFloat(
                                                          values.ManagedFundsCurrentPrice
                                                        ) || 0))
                                                    ).toFixed(2)
                                                  )
                                            }
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="ManagedFundsTotalIncomePA"
                                          />
                                      </div>
                                      </div>
                                    <div className="row mb-3">

                                        <div className="col-6">
                                          <label className="form-label">
                                            Reinvest Income
                                          </label>
                                        </div>

                                      <div className="col-6">
                                          {/* switch button style */}
                                          <div className="form-check form-switch m-0 p-0 ">
                                            <div className="radiobutton">
                                              <input
                                                type="radio"
                                                name="ManagedFundsReinvestIncome"
                                                id="ManagedFundsReinvestIncomeOpt1"
                                                value="Yes"
                                                onChange={handleChange}
                                                checked={
                                                  values.ManagedFundsReinvestIncome ===
                                                  "Yes"
                                                }
                                              />
                                              <label
                                                htmlFor="ManagedFundsReinvestIncomeOpt1"
                                                className="label1"
                                              >
                                                <span>YES</span>
                                              </label>
                                              <input
                                                type="radio"
                                                name="ManagedFundsReinvestIncome"
                                                id="ManagedFundsReinvestIncomeOpt2"
                                                value="No"
                                                onChange={handleChange}
                                                checked={
                                                  values.ManagedFundsReinvestIncome ===
                                                  "No"
                                                }
                                              />
                                              <label
                                                htmlFor="ManagedFundsReinvestIncomeOpt2"
                                                className="label2"
                                              >
                                                <span>NO</span>
                                              </label>
                                            </div>
                                          </div>
                                      </div>
                                      </div>

                                      <div className="row mb-3">
                                        <div className="col-6">
                                          <label
                                            htmlFor="ManagedFundsRegInvestmentsPA"
                                            className="form-label"
                                          >
                                            Reg Investments P.A.
                                          </label>
                                        </div>

                                      <div className="col-6">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="ManagedFundsRegInvestmentsPA"
                                            name="ManagedFundsRegInvestmentsPA"
                                            placeholder="Reg Investments P.A."
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="ManagedFundsRegInvestmentsPA"
                                          />
                                      </div>
                                      </div>
                                    
                                  </div>
                                  {/* Solicitor */}

                                  {/* Bank Account Detail Form */}
                                </Modal.Body>
                                <Modal.Footer>
                                  <div className="col-md-12">
                                    <button
                                      className="float-end btn w-25  bgColor modalBtn"
                                      // onClick={BankhandleClose}
                                      type="submit"
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      className="float-end btn w-25  btn-outline  backBtn mx-3"
                                      onClick={ManagedFundshandleClose}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </Modal.Footer>
                              </Form>
                            )}
                          </Formik>
                        </Modal>
                          {/* ---------------------------------------------------- */}

                          {/* manageFund Table */}

                          <div className="table-responsive my-3">
                            <table className="table table-bordered table-hover text-center">
                              <thead className="text-light" id="tableHead">
                                <tr>
                                  <th>Platform Name</th>
                                  <th>Total Portfolio Value</th>
                                  <th>Total Cost Base</th>

                                  <th>Operations</th>
                                </tr>
                              </thead>
                              <tbody>
                                {manageFundList.map((elem, index) => {
                                  // let {ChildName,childDoBID,childRelationship,childAge,childGender}=elem;

                                  return (
                                    <tr key={index}>
                                      <td>{elem.PlatformName}</td>
                                      <td>{elem.CurrentShareValue}</td>
                                      <td>{elem.OriginalInvestment}</td>
                                      <td>
                                        <button
                                          type="button"
                                          onClick={(e) =>
                                            deleteHandler_ManageFund(
                                              elem,
                                              index
                                            )
                                          }
                                          className="btn btn-danger btn-sm"
                                        >
                                          delete
                                        </button>
                                        <button
                                          type="button"
                                          onClick={(e) =>
                                            updateHandler_ManageFund(elem)
                                          }
                                          className="btn btn-warning btn-sm mx-2"
                                        >
                                          update
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>

                          {/* manageFund table */}
                        </div>
                      )}
                      {/* Managed Funds Details */}

                      {/*managed  loans associated */}
                      {CRObject.TermSharesManaged == "Yes" &&
                        CRObject.InvestmentLoans == "Yes" && (
                          <div className=" mt-5">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Do you managed funds have any loan
                                    associated with them?
                                  </label>
                                  {/* switch button style */}
                                  <div className="form-check form-switch m-0 p-0 ">
                                    <div className="radiobutton">
                                      <input
                                        type="radio"
                                        name="managedloansAssociatedradio"
                                        id="managedloansAssociatedopt1"
                                        onChange={handleChange}
                                        value="Yes"
                                        checked={
                                          values.managedloansAssociatedradio ===
                                          "Yes"
                                        }
                                      />
                                      <label
                                        htmlFor="managedloansAssociatedopt1"
                                        className="label1"
                                      >
                                        <span>YES</span>
                                      </label>
                                      <input
                                        type="radio"
                                        name="managedloansAssociatedradio"
                                        id="managedloansAssociatedopt2"
                                        onChange={handleChange}
                                        value="No"
                                        checked={
                                          values.managedloansAssociatedradio ===
                                          "No"
                                        }
                                      />
                                      <label
                                        htmlFor="managedloansAssociatedopt2"
                                        className="label2"
                                      >
                                        <span>NO</span>
                                      </label>
                                    </div>
                                  </div>
                                  {/* switch button style */}
                                </div>
                              </div>
                              {values.managedloansAssociatedradio === "Yes" && (
                                <div className="col-md-6 my-2">
                                  <label className="form-label">
                                    Please enter the details
                                  </label>
                                  <br />

                                  <span
                                    className=" btn h-50 w-50
                            btn-outline-success "
                                    onClick={handleShow6}
                                  >
                                    <div className="iconContainer mx-1">
                                      <img
                                        className="img-fluid"
                                        src={plus}
                                        alt=""
                                      />
                                    </div>
                                    Enter Details
                                  </span>
                                </div>
                              )}
                            </div>
                            {/*Manage loans associated modal */}

                            {/*Manage loans associated modal */}

                          <Modal
                            show={show6}
                            onHide={handleClose6}
                            backdrop="static"
                            className="modal-lg"
                            keyboard={false}
                          >
                            <Modal.Header
                              className="text-light modalBG "
                              closeButton
                            >
                              <Modal.Title className="fontStyle">
                                Add Loan Details
                                <div className="iconContainerLg">
                                  <img
                                    className="img-fluid"
                                    src={notebook}
                                    alt=""
                                  />
                                </div>
                              </Modal.Title>
                            </Modal.Header>
                            <Formik
                              initialValues={
                                manageLoanFlag
                                  ? manageFundLoanObj[0]
                                  : manageFundPortfolio_initialValues
                              }
                              validationSchema={
                                manageFundPortfolio_validationSchema
                              }
                              onSubmit={manageFundPortfolio_onSubmit}
                            >
                              {({
                                values,
                                setFieldValue,
                                handleBlur,
                                setValues,
                                handleChange,
                                formik,
                              }) => (
                                <Form>
                                  <Modal.Body>
                                    {/* Share details 3rd*/}

                                    <div className="">
                                      

                                      <div className="row mb-3">

                                          <div className="col-6">
                                            <label
                                              htmlFor="Typeofloan"
                                              className="form-label"
                                            >
                                              Type of loan
                                            </label>
                                        </div>

                                        <div className="col-6">
                                            <Field
                                              as="select"
                                              id="Typeofloan"
                                              className="form-select shadow  inputDesign"
                                              name="Typeofloan"
                                            >
                                              <option value="">Select</option>
                                              <option value="InvestmentLoan">
                                                Investment Loan
                                              </option>
                                            </Field>
                                            <ErrorMessage
                                              className="text-danger fw-bold"
                                              component="div"
                                              name="Typeofloan"
                                            />
                                          </div>
                                        </div>
                                        <div className="row mb-3">

                                          <div className="col-6">
                                            <label
                                              htmlFor="CurrentBalance"
                                              className="form-label"
                                            >
                                              Current Balance
                                            </label>
                                          </div>

                                        <div className="col-6">
                                            <Field
                                              type="number"
                                              className="form-control shadow inputDesign"
                                              id="CurrentBalance"
                                              name="CurrentBalance"
                                              placeholder="Current Balance"
                                            />
                                            <ErrorMessage
                                              className="text-danger fw-bold"
                                              component="div"
                                              name="CurrentBalance"
                                            />
                                        </div>
                                      </div>

                                      <div className="row mb-3">
                                          <div className="col-6">
                                            <label
                                              htmlFor="Lender"
                                              className="form-label"
                                            >
                                              Lender
                                            </label>
                                          </div>

                                        <div className="col-6">
                                            <Field
                                              type="text"
                                              className="form-control shadow inputDesign"
                                              id="Lender"
                                              name="Lender"
                                              placeholder="Lender"
                                            />
                                            <ErrorMessage
                                              component="div"
                                              className="text-danger fw-bold"
                                              name="Lender"
                                            />
                                        </div>
                                        </div>
                                        <div className="row mb-3">

                                          <div className="col-6">
                                            <label
                                              htmlFor="RepaymentsAmount"
                                              className="form-label"
                                            >
                                              Repayments Amount
                                            </label>
                                          </div>

                                        <div className="col-6">
                                            <Field
                                              type="number"
                                              className="form-control shadow inputDesign"
                                              id="RepaymentsAmount"
                                              name="RepaymentsAmount"
                                              placeholder="Repayments Amount"
                                            />
                                            <ErrorMessage
                                              component="div"
                                              className="text-danger fw-bold"
                                              name="RepaymentsAmount"
                                            />
                                        </div>
                                      </div>

                                      <div className="row mb-3">
                                          <div className="col-6">
                                            <label
                                              htmlFor="Frequency"
                                              className="form-label"
                                            >
                                              Frequency
                                            </label>
                                          </div>

                                        <div className="col-6">
                                            <Field
                                              as="select"
                                              id="Frequency"
                                              className="form-select shadow  inputDesign"
                                              name="Frequency"
                                            >
                                              <option value="">Select</option>
                                              <option value="Weekly">
                                                {" "}
                                                Weekly
                                              </option>
                                              <option value="Fortnightly">
                                                {" "}
                                                Fortnightly{" "}
                                              </option>
                                              <option value="Monthly">
                                                Monthly
                                              </option>
                                              <option value="Annually">
                                                {" "}
                                                Annually{" "}
                                              </option>
                                            </Field>
                                            <ErrorMessage
                                              className="text-danger fw-bold"
                                              component="div"
                                              name="Frequency"
                                            />
                                        </div>
                                        </div>
                                        <div className="row mb-3">

                                          <div className="col-6">
                                            <label
                                              htmlFor=""
                                              className="form-label"
                                            >
                                              Annual Repayments
                                            </label>
                                        </div>

                                        <div className="col-6">
                                            <Field
                                              type="number"
                                              className="form-control shadow inputDesign"
                                              id="managedAnnualRepayments"
                                              name="managedAnnualRepayments"
                                              placeholder="Annual Repayments"
                                              readOnly
                                              value={
                                                values.Frequency == ""
                                                  ? 0
                                                  : values.Frequency == "Weekly"
                                                  ? (parseFloat(
                                                      values.RepaymentsAmount
                                                    ) || 0) * 52
                                                  : values.Frequency ==
                                                    "Fortnightly"
                                                  ? (parseFloat(
                                                      values.RepaymentsAmount
                                                    ) || 0) * 26
                                                  : values.Frequency ==
                                                    "Monthly"
                                                  ? (parseFloat(
                                                      values.RepaymentsAmount
                                                    ) || 0) * 12
                                                  : (parseFloat(
                                                      values.RepaymentsAmount
                                                    ) || 0) * 1
                                              }
                                            />
                                          </div>
                                      </div>

                                      <div className="row mb-3">
                                          <div className="col-6">
                                            <label
                                              htmlFor="InterestRatePA"
                                              className="form-label"
                                            >
                                              Interest Rate (p.a)
                                            </label>
                                          </div>

                                        <div className="col-6">
                                            <Field
                                              type="number"
                                              className="form-control shadow inputDesign"
                                              id="InterestRatePA"
                                              name="InterestRatePA"
                                              placeholder="Current Balance"
                                            />
                                            <ErrorMessage
                                              className="text-danger fw-bold"
                                              component="div"
                                              name="InterestRatePA"
                                            />
                                        </div>
                                        </div>
                                        <div className="row mb-3">
                                          <div className="col-6">
                                            <label
                                              htmlFor="LoanTermInYears"
                                              className="form-label"
                                            >
                                              Loan Term (1-30 Years)
                                            </label>
                                          </div>

                                        <div className="col-6">
                                            <Field
                                              as="select"
                                              id="LoanTermInYears"
                                              className="form-select shadow  inputDesign"
                                              name="LoanTermInYears"
                                            >
                                              <option value="">Select</option>
                                              <option value="1">1</option>
                                              <option value="2">2</option>
                                              <option value="3">3</option>
                                              <option value="4">4</option>
                                              <option value="5">5</option>
                                              <option value="6">6</option>
                                              <option value="7">7</option>
                                              <option value="8">8</option>
                                              <option value="9">9</option>
                                              <option value="10">10</option>
                                              <option value="11">11</option>
                                              <option value="12">12</option>
                                              <option value="13">13</option>
                                              <option value="14">14</option>
                                              <option value="15">15</option>
                                              <option value="16">16</option>
                                              <option value="17">17</option>
                                              <option value="18">18</option>
                                              <option value="19">19</option>
                                              <option value="20">20</option>
                                              <option value="21">21</option>
                                              <option value="22">22</option>
                                              <option value="23">23</option>
                                              <option value="24">24</option>
                                              <option value="25">25</option>
                                              <option value="26">26</option>
                                              <option value="27">27</option>
                                              <option value="28">28</option>
                                              <option value="29">29</option>
                                              <option value="30">30</option>
                                            </Field>
                                            <ErrorMessage
                                              className="text-danger fw-bold"
                                              component="div"
                                              name="LoanTermInYears"
                                            />
                                        </div>
                                      </div>

                                      <div className="row mb-3">
                                          <div className="col-6">
                                            <label
                                              htmlFor="LoanType"
                                              className="form-label"
                                            >
                                              Loan Type
                                            </label>
                                          </div>

                                        <div className="col-6">
                                            <Field
                                              as="select"
                                              id="LoanType"
                                              className="form-select shadow  inputDesign"
                                              name="LoanType"
                                            >
                                              <option value="">Select</option>
                                              <option value="IByOnly">
                                                I/Only
                                              </option>
                                              <option value="P&I">P&I</option>
                                            </Field>
                                            <ErrorMessage
                                              className="text-danger fw-bold"
                                              component="div"
                                              name="LoanType"
                                            />
                                        </div>
                                        </div>
                                      <div className="row mb-3">

                                          <div className="col-6">
                                            <label
                                              htmlFor="DeductibleAmountofLoan"
                                              className="form-label"
                                            >
                                              Deductible Amount of Loan (%)
                                            </label>
                                        </div>

                                        <div className="col-6">
                                            <Field
                                              type="number"
                                              className="form-control shadow inputDesign"
                                              id="DeductibleAmountofLoan"
                                              name="DeductibleAmountofLoan"
                                              placeholder="Deductible Amount of Loan"
                                            />
                                            <ErrorMessage
                                              className="text-danger fw-bold"
                                              component="div"
                                              name="DeductibleAmountofLoan"
                                            />
                                          </div>
                                      </div>

                                      <div className="row mb-3">
                                          <div className="col-6">
                                            <label
                                              htmlFor="YearRemaning"
                                              className="form-label"
                                            >
                                              Year Remaning (1-30 Years)
                                            </label>
                                        </div>

                                        <div className="col-6">
                                            <Field
                                              as="select"
                                              id="YearRemaning"
                                              className="form-select shadow  inputDesign"
                                              name="YearRemaning"
                                            >
                                              <option value="">Select</option>
                                              <option value="1">1</option>
                                              <option value="2">2</option>
                                              <option value="3">3</option>
                                              <option value="4">4</option>
                                              <option value="5">5</option>
                                              <option value="6">6</option>
                                              <option value="7">7</option>
                                              <option value="8">8</option>
                                              <option value="9">9</option>
                                              <option value="10">10</option>
                                              <option value="11">11</option>
                                              <option value="12">12</option>
                                              <option value="13">13</option>
                                              <option value="14">14</option>
                                              <option value="15">15</option>
                                              <option value="16">16</option>
                                              <option value="17">17</option>
                                              <option value="18">18</option>
                                              <option value="19">19</option>
                                              <option value="20">20</option>
                                              <option value="21">21</option>
                                              <option value="22">22</option>
                                              <option value="23">23</option>
                                              <option value="24">24</option>
                                              <option value="25">25</option>
                                              <option value="26">26</option>
                                              <option value="27">27</option>
                                              <option value="28">28</option>
                                              <option value="29">29</option>
                                              <option value="30">30</option>
                                            </Field>
                                            <ErrorMessage
                                              className="text-danger fw-bold"
                                              component="div"
                                              name="YearRemaning"
                                            />
                                          </div>
                                      </div>
                                    </div>
                                    {/* Share details */}
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <div className="col-md-12">
                                      <button
                                        className="float-end btn w-25  bgColor modalBtn"
                                        // onClick={handleClose}
                                        type="submit"
                                      >
                                        Save
                                      </button>
                                      <button
                                        type="button"
                                        className="float-end btn w-25  btn-outline  backBtn mx-3"
                                        onClick={handleClose6}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </Modal.Footer>
                                </Form>
                              )}
                            </Formik>
                          </Modal>
                          {/*Manage loans associated modal */}
                            {/*Manage loans associated modal */}
                          </div>
                        )}
                      {/* Manage loans associated */}

                      {/* manageLoan Table */}
                      {CRObject.TermSharesManaged == "Yes" &&
                        CRObject.InvestmentLoans == "Yes" && (
                          <div className="table-responsive">
                            <table className="table table-bordered table-hover text-center">
                              <thead className="text-light" id="tableHead">
                                <tr>
                                  <th>Type of Loan</th>
                                  <th>Current Balance</th>
                                  <th>Lender</th>
                                  <th>Annual Repayments</th>
                                  <th>Interest Rate (p.a)</th>
                                  <th>Operations</th>
                                </tr>
                              </thead>
                              <tbody>
                                {manageLoanList.map((elem, index) => {
                                  // let {ChildName,childDoBID,childRelationship,childAge,childGender}=elem;

                                  return (
                                    <tr key={index}>
                                      <td>
                                        {elem.ManagedFundsPortfolioLoanType}
                                      </td>
                                      <td>
                                        {
                                          elem.ManagedFundsPortfolioCurrentBalance
                                        }
                                      </td>
                                      <td>
                                        {elem.ManagedFundsPortfolioLender}
                                      </td>
                                      <td>
                                        {
                                          elem.ManagedFundsPortfolioRepaymentAmount
                                        }
                                      </td>
                                      <td>
                                        {
                                          elem.ManagedFundsPortfolioInterestRatePA
                                        }
                                      </td>
                                      <td>
                                        <button
                                          type="button"
                                          onClick={(e) =>
                                            deleteHandler_ManageLoan(
                                              elem,
                                              index
                                            )
                                          }
                                          className="btn btn-danger btn-sm mt-1"
                                        >
                                          delete
                                        </button>
                                        <button
                                          type="button"
                                          onClick={(e) =>
                                            updateHandler_ManageLoan(elem)
                                          }
                                          className="btn btn-warning btn-sm mx-2 mt-1"
                                        >
                                          update
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}
                      {/* manageLoan TableLoan */}

                      {/* Investment Properties Details */}
                      {CRObject.DirectProperty == "Yes" && (
                        <div className="mb-5">
                          <h3 className="">Investment Properties</h3>

                          {/* --------------------------------------------- */}
                          {/* 1 row */}
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Do you have any Investment Properties?
                                </label>
                                {/* switch button style */}
                                <div className="form-check form-switch m-0 p-0 ">
                                  <div className="radiobutton">
                                    <input
                                      type="radio"
                                      name="InvestmentPropertiesRadio"
                                      id="InvestmentPropertiesOpt1"
                                      value="Yes"
                                      // onClick={()=>InvestmentPropertiesHandler("Yes")}
                                      onChange={handleChange}
                                      checked={
                                        values.InvestmentPropertiesRadio ===
                                        "Yes"
                                      }
                                    />
                                    <label
                                      htmlFor="InvestmentPropertiesOpt1"
                                      className="label1"
                                    >
                                      <span>YES</span>
                                    </label>
                                    <input
                                      type="radio"
                                      name="InvestmentPropertiesRadio"
                                      id="InvestmentPropertiesOpt2"
                                      value="No"
                                      // onClick={()=>InvestmentPropertiesHandler("No")}
                                      onChange={handleChange}
                                      checked={
                                        values.InvestmentPropertiesRadio ===
                                        "No"
                                      }
                                    />
                                    <label
                                      htmlFor="InvestmentPropertiesOpt2"
                                      className="label2"
                                    >
                                      <span>NO</span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {values.InvestmentPropertiesRadio === "Yes" && (
                              <div className="col-md-6">
                                <label className="form-label">
                                  Please enter the details of your Investment
                                  Properties
                                </label>
                                <br />

                                <span
                                  className=" btn h-50 w-50
                                btn-outline-success "
                                  onClick={InvestmentPropertieshandleShow}
                                >
                                  <div className="iconContainer mx-1">
                                    <img
                                      className="img-fluid"
                                      src={plus}
                                      alt=""
                                    />
                                  </div>
                                  Enter Details
                                </span>
                              </div>
                            )}
                          </div>
                          {/* 1 row */}

                          <Modal
                            show={InvestmentPropertiesshow}
                            onHide={InvestmentPropertieshandleClose}
                            backdrop="static"
                            className="modal-lg"
                            keyboard={false}
                          >
                            <Modal.Header
                              className="text-light modalBG "
                              closeButton
                            >
                              <Modal.Title className="fontStyle">
                                Investment Properties Details
                                <div className="iconContainerLg">
                                  <img
                                    className="img-fluid"
                                    src={notebook}
                                    alt=""
                                  />
                                </div>
                              </Modal.Title>
                            </Modal.Header>
                            <Formik
                              initialValues={
                                investmentFlag
                                  ? investmentObj[0]
                                  : Client_initialValues
                              }
                              validationSchema={Investment_validationSchema}
                              onSubmit={Investment_onSubmit}
                            >
                              {({
                                values,
                                setFieldValue,
                                setValues,
                                handleChange,
                                formik,
                              }) => (
                                <Form>
                                  <Modal.Body>
                                    {/* Australian Share Market Form */}

                                    {/* Solicitor */}
                                    <div className=" ">
                                      <h3 className="">
                                        <div className="iconContainerLg mx-1">
                                          <img
                                            className="img-fluid"
                                            src={lawyer}
                                            alt=""
                                          />
                                        </div>
                                        Investment Properties
                                      </h3>
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="InvestmentPropertiesCurrentValue"
                                            className="form-label"
                                          >
                                            Current Value
                                          </label>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="InvestmentPropertiesCurrentValue"
                                            name="InvestmentPropertiesCurrentValue"
                                            placeholder="Current Value"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="InvestmentPropertiesCurrentValue"
                                          />
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="InvestmentPropertiesCostBase"
                                            className="form-label"
                                          >
                                            Cost Base
                                          </label>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="InvestmentPropertiesCostBase"
                                            name="InvestmentPropertiesCostBase"
                                            placeholder="Cost Base"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="InvestmentPropertiesCostBase"
                                          />
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="InvestmentPropertiesAddress"
                                            className="form-label"
                                          >
                                            Property Address
                                          </label>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            type="text"
                                            className="form-control shadow inputDesign"
                                            id="InvestmentPropertiesAddress"
                                            name="InvestmentPropertiesAddress"
                                            placeholder="Property Address"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="InvestmentPropertiesAddress"
                                          />
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="InvestmentPropertiesPostcode"
                                            className="form-label"
                                          >
                                            Postcode
                                          </label>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="InvestmentPropertiesPostcode"
                                            name="InvestmentPropertiesPostcode"
                                            placeholder="No. of shares"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="InvestmentPropertiesPostcode"
                                          />
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="InvestmentPropertiesRentalIncome"
                                            className="form-label"
                                          >
                                            Rental Income
                                          </label>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="InvestmentPropertiesRentalIncome"
                                            name="InvestmentPropertiesRentalIncome"
                                            placeholder="No. of shares"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="InvestmentPropertiesRentalIncome"
                                          />
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="InvestmentPropertiesFrequency"
                                            className="form-label"
                                          >
                                            Frequency
                                          </label>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            as="select"
                                            name="InvestmentPropertiesFrequency"
                                            id="InvestmentPropertiesFrequency"
                                            className="form-select shadow  inputDesign"
                                          >
                                            <option value="">Select</option>
                                            <option value="Weekly">
                                              Weekly
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            name="InvestmentPropertiesFrequency"
                                            component="div"
                                            className="text-danger fw-bold"
                                          />
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="InvestmentPropertiesTotalAnnualIncome"
                                            className="form-label"
                                          >
                                            Total Annual Income
                                          </label>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="InvestmentPropertiesTotalAnnualIncome"
                                            name="InvestmentPropertiesTotalAnnualIncome"
                                            placeholder="No. of shares"
                                            readOnly
                                            value={
                                              values.InvestmentPropertiesFrequency ==
                                              "Weekly"
                                                ? (parseFloat(
                                                    values.InvestmentPropertiesRentalIncome
                                                  ) || 0) * 52
                                                : 0
                                            }
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="InvestmentPropertiesTotalAnnualIncome"
                                          />
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="InvestmentPropertiesExpensesPA"
                                            className="form-label"
                                          >
                                            Expenses P.A.
                                          </label>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="InvestmentPropertiesExpensesPA"
                                            name="InvestmentPropertiesExpensesPA"
                                            placeholder="No. of shares"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="InvestmentPropertiesExpensesPA"
                                          />
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <label className="form-label">
                                            Is there any loan attached?
                                          </label>
                                        </div>
                                        {/* switch button style */}
                                        <div className="col-6 mb-3">
                                          <div className="form-check form-switch m-0 p-0 ">
                                            <div className="radiobutton">
                                              <input
                                                type="radio"
                                                name="InvestmentPropertiesLoanAttached"
                                                id="InvestmentPropertiesLoanAttachedOpt1"
                                                value="Yes"
                                                onClick={() =>
                                                  InvestmentProperties2Handler(
                                                    "Yes"
                                                  )
                                                }
                                                onChange={handleChange}
                                                checked={
                                                  values.InvestmentPropertiesLoanAttached ===
                                                  "Yes"
                                                }
                                              />
                                              <label
                                                htmlFor="InvestmentPropertiesLoanAttachedOpt1"
                                                className="label1"
                                              >
                                                <span>YES</span>
                                              </label>
                                              <input
                                                type="radio"
                                                name="InvestmentPropertiesLoanAttached"
                                                id="InvestmentPropertiesLoanAttachedOpt2"
                                                value="No"
                                                onClick={() =>
                                                  InvestmentProperties2Handler(
                                                    "No"
                                                  )
                                                }
                                                onChange={handleChange}
                                                checked={
                                                  values.InvestmentPropertiesLoanAttached ===
                                                  "No"
                                                }
                                              />
                                              <label
                                                htmlFor="InvestmentPropertiesLoanAttachedOpt2"
                                                className="label2"
                                              >
                                                <span>NO</span>
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <div>
                                            <label className="form-label">
                                              Expense Schedule
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <button type="button"
                                            className=" btn 
                                btn-outline-success "
                                            onClick={
                                              InvestmentProperties2handleShow
                                            }
                                          >
                                            <div className="iconContainer mx-1">
                                              <img
                                                className="img-fluid"
                                                src={plus}
                                                alt=""
                                              />
                                            </div>
                                            Enter Details
                                          </button>
                                        </div>
                                      </div>
                                      <Modal
                                        show={InvestmentProperties2show}
                                        onHide={
                                          InvestmentProperties2handleClose
                                        }
                                        backdrop="static"
                                        className="modal-lg"
                                        keyboard={false}
                                      >
                                        <Modal.Header
                                          className="text-light modalBG "
                                          closeButton
                                        >
                                          <Modal.Title className="fontStyle">
                                            Investment Properties Details
                                            <div className="iconContainerLg">
                                              <img
                                                className="img-fluid"
                                                src={notebook}
                                                alt=""
                                              />
                                            </div>
                                          </Modal.Title>
                                        </Modal.Header>
                                        <Formik
                                          initialValues={
                                            InvestmentModal_initialValues
                                          }
                                          validationSchema={
                                            InvestmentModal_validationSchema
                                          }
                                          onSubmit={InvestmentModal_onSubmit}
                                        >
                                          {({
                                            values,
                                            setFieldValue,
                                            setValues,
                                            handleChange,
                                            formik,
                                          }) => (
                                            <Form>
                                              <Modal.Body>
                                                {/* Australian Share Market Form */}

                                                {/* Solicitor */}
                                                <div className=" ">
                                                  <h3 className="">
                                                    <div className="iconContainerLg mx-1">
                                                      <img
                                                        className="img-fluid"
                                                        src={lawyer}
                                                        alt=""
                                                      />
                                                    </div>
                                                    Expense Schedule
                                                  </h3>
                                                  <div className="row">
                                                    <div className="col-6 mb-3">
                                                      <label
                                                        htmlFor="InvestmentModalTotalExpense"
                                                        className="form-label"
                                                      >
                                                        Total Property Expenses
                                                      </label>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                      <Field
                                                        type="number"
                                                        className="form-control shadow inputDesign"
                                                        id="InvestmentModalTotalExpense"
                                                        name="InvestmentModalTotalExpense"
                                                        readOnly
                                                        value={
                                                          (parseFloat(
                                                            values.InvestmentModalCorporateFees
                                                          ) || 0) +
                                                          (parseFloat(
                                                            values.InvestmentModalCouncilRates
                                                          ) || 0) +
                                                          (parseFloat(
                                                            values.InvestmentModalLawnMoving
                                                          ) || 0) +
                                                          (parseFloat(
                                                            values.InvestmentModalInsurance
                                                          ) || 0) +
                                                          (parseFloat(
                                                            values.InvestmentModalLandTax
                                                          ) || 0) +
                                                          (parseFloat(
                                                            values.InvestmentModalRepairs
                                                          ) || 0) +
                                                          (parseFloat(
                                                            values.InvestmentModalWaterCharges
                                                          ) || 0) +
                                                          (parseFloat(
                                                            values.InvestmentModalOthers
                                                          ) || 0) +
                                                          (parseFloat(
                                                            values.InvestmentModalTelephone
                                                          ) || 0) +
                                                          (parseFloat(
                                                            values.InvestmentModalProfessionalFees
                                                          ) || 0) +
                                                          (parseFloat(
                                                            values.InvestmentModalAllOthers
                                                          ) || 0)
                                                        }
                                                      />
                                                      {/* <ErrorMessage component='div' className='text-danger fw-bold' name='InvestmentModalTotalExpense' /> */}
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-6 mb-3">
                                                      <label
                                                        htmlFor="InvestmentModalCorporateFees"
                                                        className="form-label"
                                                      >
                                                        Body Corporate Fees
                                                      </label>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                      <Field
                                                        type="number"
                                                        className="form-control shadow inputDesign"
                                                        id="InvestmentModalCorporateFees"
                                                        name="InvestmentModalCorporateFees"
                                                        placeholder="Body Corporate Fees"
                                                      />
                                                      <ErrorMessage
                                                        component="div"
                                                        className="text-danger fw-bold"
                                                        name="InvestmentModalCorporateFees"
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-6 mb-3">
                                                      <label
                                                        htmlFor="InvestmentModalCouncilRates"
                                                        className="form-label"
                                                      >
                                                        Council Rates
                                                      </label>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                      <Field
                                                        type="number"
                                                        className="form-control shadow inputDesign"
                                                        id="InvestmentModalCouncilRates"
                                                        name="InvestmentModalCouncilRates"
                                                        placeholder="Council Rates"
                                                      />
                                                      <ErrorMessage
                                                        component="div"
                                                        className="text-danger fw-bold"
                                                        name="InvestmentModalCouncilRates"
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-6 mb-3">
                                                      <label
                                                        htmlFor="InvestmentModalLawnMoving"
                                                        className="form-label"
                                                      >
                                                        Gardening and Lawn
                                                        Moving
                                                      </label>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                      <Field
                                                        type="number"
                                                        className="form-control shadow inputDesign"
                                                        id="InvestmentModalLawnMoving"
                                                        name="InvestmentModalLawnMoving"
                                                        placeholder="Gardening and Lawn Moving"
                                                      />
                                                      <ErrorMessage
                                                        component="div"
                                                        className="text-danger fw-bold"
                                                        name="InvestmentModalLawnMoving"
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-6 mb-3">
                                                      <label
                                                        htmlFor="InvestmentModalInsurance"
                                                        className="form-label"
                                                      >
                                                        Insurance
                                                      </label>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                      <Field
                                                        type="number"
                                                        className="form-control shadow inputDesign"
                                                        id="InvestmentModalInsurance"
                                                        name="InvestmentModalInsurance"
                                                        placeholder="Insurance"
                                                      />
                                                      <ErrorMessage
                                                        component="div"
                                                        className="text-danger fw-bold"
                                                        name="InvestmentModalInsurance"
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-6 mb-3">
                                                      <label
                                                        htmlFor="InvestmentModalLandTax"
                                                        className="form-label"
                                                      >
                                                        Land Tax
                                                      </label>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                      <Field
                                                        type="number"
                                                        className="form-control shadow inputDesign"
                                                        id="InvestmentModalLandTax"
                                                        name="InvestmentModalLandTax"
                                                        placeholder="Land Tax"
                                                      />
                                                      <ErrorMessage
                                                        component="div"
                                                        className="text-danger fw-bold"
                                                        name="InvestmentModalLandTax"
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-6 mb-3">
                                                      <label
                                                        htmlFor="InvestmentModalRepairs"
                                                        className="form-label"
                                                      >
                                                        Repairs and Maintenance
                                                      </label>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                      <Field
                                                        type="number"
                                                        className="form-control shadow inputDesign"
                                                        id="InvestmentModalRepairs"
                                                        name="InvestmentModalRepairs"
                                                        placeholder="Repairs and Maintenance"
                                                      />
                                                      <ErrorMessage
                                                        component="div"
                                                        className="text-danger fw-bold"
                                                        name="InvestmentModalRepairs"
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-6 mb-3">
                                                      <label
                                                        htmlFor="InvestmentModalWaterCharges"
                                                        className="form-label"
                                                      >
                                                        Water Charges
                                                      </label>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                      <Field
                                                        type="number"
                                                        className="form-control shadow inputDesign"
                                                        id="InvestmentModalWaterCharges"
                                                        name="InvestmentModalWaterCharges"
                                                        placeholder="Water Charges"
                                                      />
                                                      <ErrorMessage
                                                        component="div"
                                                        className="text-danger fw-bold"
                                                        name="InvestmentModalWaterCharges"
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-6 mb-3">
                                                      <label
                                                        htmlFor="InvestmentModalOthers"
                                                        className="form-label"
                                                      >
                                                        Other
                                                      </label>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                      <Field
                                                        type="number"
                                                        className="form-control shadow inputDesign"
                                                        id="InvestmentModalOthers"
                                                        name="InvestmentModalOthers"
                                                        placeholder="Other"
                                                      />
                                                      <ErrorMessage
                                                        component="div"
                                                        className="text-danger fw-bold"
                                                        name="InvestmentModalOthers"
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-6 mb-3">
                                                      <label
                                                        htmlFor="InvestmentModalTelephone"
                                                        className="form-label"
                                                      >
                                                        Telephone & Internet
                                                      </label>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                      <Field
                                                        type="number"
                                                        className="form-control shadow inputDesign"
                                                        id="InvestmentModalTelephone"
                                                        name="InvestmentModalTelephone"
                                                        placeholder="Telephone & Internet"
                                                      />
                                                      <ErrorMessage
                                                        component="div"
                                                        className="text-danger fw-bold"
                                                        name="InvestmentModalTelephone"
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-6 mb-3">
                                                      <label
                                                        htmlFor="InvestmentModalProfessionalFees"
                                                        className="form-label"
                                                      >
                                                        Professional Fees
                                                      </label>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                      <Field
                                                        type="number"
                                                        className="form-control shadow inputDesign"
                                                        id="InvestmentModalProfessionalFees"
                                                        name="InvestmentModalProfessionalFees"
                                                        placeholder="Professional Fees"
                                                      />
                                                      <ErrorMessage
                                                        component="div"
                                                        className="text-danger fw-bold"
                                                        name="InvestmentModalProfessionalFees"
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-6 mb-3">
                                                      <label
                                                        htmlFor="InvestmentModalAllOthers"
                                                        className="form-label"
                                                      >
                                                        All Other
                                                      </label>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                      <Field
                                                        type="number"
                                                        className="form-control shadow inputDesign"
                                                        id="InvestmentModalAllOthers"
                                                        name="InvestmentModalAllOthers"
                                                        placeholder="All Others"
                                                      />
                                                      <ErrorMessage
                                                        component="div"
                                                        className="text-danger fw-bold"
                                                        name="InvestmentModalAllOthers"
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                                {/* Solicitor */}

                                                {/*Australian Share Detail Form */}
                                              </Modal.Body>
                                              <Modal.Footer>
                                                <div className="col-md-12">
                                                  <button
                                                    className="float-end btn w-25  bgColor modalBtn"
                                                    type="submit"
                                                  >
                                                    Save
                                                  </button>
                                                  <button
                                                    type="button"
                                                    className="float-end btn w-25  btn-outline  backBtn mx-3"
                                                    onClick={
                                                      InvestmentProperties2handleClose
                                                    }
                                                  >
                                                    Cancel
                                                  </button>
                                                </div>
                                              </Modal.Footer>
                                            </Form>
                                          )}
                                        </Formik>
                                      </Modal>

                                      {values.InvestmentPropertiesLoanAttached ===
                                        "Yes" && (
                                        <>
                                          <div className="row">
                                            <div className="col-6 mb-3">
                                              <label
                                                htmlFor="InvestmentPropertiesCurrentBalance"
                                                className="form-label"
                                              >
                                                Current Balance
                                              </label>
                                            </div>
                                            <div className="col-6 mb-3">
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="InvestmentPropertiesCurrentBalance"
                                                name="InvestmentPropertiesCurrentBalance"
                                                placeholder="Current Balance"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="InvestmentPropertiesCurrentBalance"
                                              />
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-6 mb-3">
                                              <label
                                                htmlFor="InvestmentPropertiesLender"
                                                className="form-label"
                                              >
                                                Lender
                                              </label>
                                            </div>
                                            <div className="col-6 mb-3">
                                              <Field
                                                type="text"
                                                className="form-control shadow inputDesign"
                                                id="InvestmentPropertiesLender"
                                                name="InvestmentPropertiesLender"
                                                placeholder="Lender"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="InvestmentPropertiesLender"
                                              />
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-6 mb-3">
                                              <label
                                                htmlFor="InvestmentPropertiesRepaymentAmount"
                                                className="form-label"
                                              >
                                                Repayment Amount
                                              </label>
                                            </div>
                                            <div className="col-6 mb-3">
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="InvestmentPropertiesRepaymentAmount"
                                                name="InvestmentPropertiesRepaymentAmount"
                                                placeholder="Repayment Amount"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="InvestmentPropertiesRepaymentAmount"
                                              />
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-6 mb-3">
                                              <label
                                                htmlFor="InvestmentPropertiesFrequency2"
                                                className="form-label"
                                              >
                                                Frequency
                                              </label>
                                            </div>
                                            <div className="col-6 mb-3">
                                              <Field
                                                as="select"
                                                name="InvestmentPropertiesFrequency2"
                                                id="InvestmentPropertiesFrequency2"
                                                className="form-select shadow  inputDesign"
                                              >
                                                <option value="">Select</option>
                                                <option value="Weekly">
                                                  Weekly
                                                </option>
                                                <option value="Monthly">
                                                  Monthly
                                                </option>
                                              </Field>
                                              <ErrorMessage
                                                name="InvestmentPropertiesFrequency2"
                                                component="div"
                                                className="text-danger fw-bold"
                                              />
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-6 mb-3">
                                              <label
                                                htmlFor="InvestmentPropertiesAnnualRepayment"
                                                className="form-label"
                                              >
                                                Annual Repayments
                                              </label>
                                            </div>
                                            <div className="col-6 mb-3">
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="InvestmentPropertiesAnnualRepayment"
                                                name="InvestmentPropertiesAnnualRepayment"
                                                placeholder="Annual Repayment"
                                                readOnly
                                                value={
                                                  values.InvestmentPropertiesFrequency2 ==
                                                  "Weekly"
                                                    ? (parseFloat(
                                                        values.InvestmentPropertiesRepaymentAmount
                                                      ) || 0) * 52
                                                    : values.InvestmentPropertiesFrequency2 ==
                                                      "Monthly"
                                                    ? (parseFloat(
                                                        values.InvestmentPropertiesRepaymentAmount
                                                      ) || 0) * 12
                                                    : 0
                                                }
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="InvestmentPropertiesAnnualRepayment"
                                              />
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-6 mb-3">
                                              <label
                                                htmlFor="InvestmentPropertiesInterestRatePA"
                                                className="form-label"
                                              >
                                                Interest Rate P.A.
                                              </label>
                                            </div>
                                            <div className="col-6 mb-3">
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="InvestmentPropertiesInterestRatePA"
                                                name="InvestmentPropertiesInterestRatePA"
                                                placeholder="Repayment Amount"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="InvestmentPropertiesInterestRatePA"
                                              />
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-6 mb-3">
                                              <label
                                                htmlFor="InvestmentPropertiesLoanTerm"
                                                className="form-label"
                                              >
                                                Loan Term (1-30 Years)
                                              </label>
                                            </div>
                                            <div className="col-6 mb-3">
                                              <Field
                                                as="select"
                                                name="InvestmentPropertiesLoanTerm"
                                                id="InvestmentPropertiesLoanTerm"
                                                className="form-select shadow  inputDesign"
                                              >
                                                <option value="">Select</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                              </Field>
                                              <ErrorMessage
                                                name="InvestmentPropertiesLoanTerm"
                                                component="div"
                                                className="text-danger fw-bold"
                                              />
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-6 mb-3">
                                              <label
                                                htmlFor="InvestmentPropertiesLoanType"
                                                className="form-label"
                                              >
                                                Loan Type
                                              </label>
                                            </div>
                                            <div className="col-6 mb-3">
                                              <Field
                                                as="select"
                                                name="InvestmentPropertiesLoanType"
                                                id="InvestmentPropertiesLoanType"
                                                className="form-select shadow  inputDesign"
                                              >
                                                <option value="">Select</option>
                                                <option value="I/Only">
                                                  I/Only
                                                </option>
                                                <option value="P & I">
                                                  P & I
                                                </option>
                                              </Field>
                                              <ErrorMessage
                                                name="InvestmentPropertiesLoanType"
                                                component="div"
                                                className="text-danger fw-bold"
                                              />
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-6 mb-3">
                                              <label
                                                htmlFor="InvestmentPropertiesDebtLoanAmount"
                                                className="form-label"
                                              >
                                                Debt Amount of Loan
                                              </label>
                                            </div>
                                            <div className="col-6 mb-3">
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="InvestmentPropertiesDebtLoanAmount"
                                                name="InvestmentPropertiesDebtLoanAmount"
                                                placeholder="Debt Loan Amount"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="InvestmentPropertiesDebtLoanAmount"
                                              />
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-6 mb-3">
                                              <label
                                                htmlFor="InvestmentPropertiesYearsRemaining"
                                                className="form-label"
                                              >
                                                Years Remaining (1-30 Years)
                                              </label>
                                            </div>
                                            <div className="col-6 mb-3">
                                              <Field
                                                as="select"
                                                name="InvestmentPropertiesYearsRemaining"
                                                id="InvestmentPropertiesYearsRemaining"
                                                className="form-select shadow  inputDesign"
                                              >
                                                <option value="">Select</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                              </Field>
                                              <ErrorMessage
                                                name="InvestmentPropertiesYearsRemaining"
                                                component="div"
                                                className="text-danger fw-bold"
                                              />
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                    {/* Solicitor */}

                                    {/*Australian Share Detail Form */}
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <div className="col-md-12">
                                      <button
                                        className="float-end btn w-25  bgColor modalBtn"
                                        // onClick={ManagedFundshandleClose}
                                        type="submit"
                                      >
                                        Save
                                      </button>
                                      <button
                                        type="button"
                                        className="float-end btn w-25  btn-outline  backBtn mx-3"
                                        onClick={
                                          InvestmentPropertieshandleClose
                                        }
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </Modal.Footer>
                                </Form>
                              )}
                            </Formik>
                          </Modal>
                          {/* ---------------------------------------------------- */}

                          {/* InvestMent properties Table Table */}

                          <div className="table-responsive my-3">
                            <table className="table table-bordered table-hover text-center">
                              <thead className="text-light" id="tableHead">
                                <tr>
                                  <th>Property Address</th>
                                  <th>Value</th>
                                  <th>Rent p.a</th>
                                  <th>Annual Expenses</th>
                                  <th>Current Loan Balance</th>
                                  <th>Repayments p.a</th>

                                  <th>Operations</th>
                                </tr>
                              </thead>
                              <tbody>
                                {investmentList.map((elem, index) => {
                                  // let {ChildName,childDoBID,childRelationship,childAge,childGender}=elem;

                                  return (
                                    <tr key={index}>
                                      <td>{elem.PropertyAddress}</td>
                                      <td>{elem.CurrentValue}</td>
                                      <td>{elem.RentalIncome}</td>
                                      <td>{elem.AnnualRepayments}</td>
                                      <td>{elem.CurrentBalance}</td>
                                      <td>{elem.RepaymentAmount}</td>

                                      <td>
                                        <button
                                          type="button"
                                          onClick={(e) =>
                                            deleteHandler_Investment(
                                              elem,
                                              index
                                            )
                                          }
                                          className="btn btn-danger btn-sm mt-1"
                                        >
                                          delete
                                        </button>
                                        <button
                                          type="button"
                                          onClick={(e) =>
                                            updateHandler_Investment(elem)
                                          }
                                          className="btn btn-warning btn-sm mx-2 mt-1"
                                        >
                                          update
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>

                          {/* InvestMent properties Table */}
                        </div>
                      )}
                      {/* Investment Properties Details */}
                    </div>
                  )}

                  {CRObject.QuestionSMSF == "No" && (
                    <div className="row">
                      <div className="col-md-12 text-center">
                        <p>
                          Nothing to add here you can press{" "}
                          <NavLink
                            to="/Investment-Trust"
                            style={{ color: "#36B446" }}
                          >
                            <b>next button</b>
                          </NavLink>
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="row mt-5 mb-3">
                    <div className="col-md-12">
                      {CRObject.QuestionSMSF == "Yes" && (
                        <button
                          type="submit"
                          className="float-end btn w-25  bgColor modalBtn"
                        >
                          Next
                        </button>
                      )}
                      {CRObject.QuestionSMSF == "No" && (
                        <button
                          type="submit"
                          className="float-end btn w-25  bgColor modalBtn"
                        >
                          Next
                        </button>
                      )}

                      <button
                        className="float-end btn w-25  btn-outline backBtn mx-3"
                        onClick={BackFunction}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SMSF;
