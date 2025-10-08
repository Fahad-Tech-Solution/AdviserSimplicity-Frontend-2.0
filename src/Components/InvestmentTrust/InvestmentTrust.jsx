import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import "yup-phone";
import plus from "./images/plus.svg";
import notebook from "./images/notebook.svg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";

import { useRecoilState, useRecoilValue } from "recoil";
import { QuestionShift, CRState, StepState, defaultUrl } from "../../Store/Store";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

const InvestmentTrust = () => {
  
  let DefaultUrl = useRecoilValue(defaultUrl);

  let [CRObject, setCRObject] = useRecoilState(CRState);
  let [Steps, setSteps] = useRecoilState(StepState); //Recoil Step State For First Route When User Login

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => {
    setShow3(false);
    setIs_Share(false);
  };
  const handleShow3 = () => setShow3(true);

  const [show4, setShow4] = useState(false);
  const handleClose4 = () => {
    setShow4(false);
    setIs_Loan(false);
  };
  const handleShow4 = () => setShow4(true);
  // manage funds
  // 1st modal
  const [show5, setShow5] = useState(false);
  const handleClose5 = () => {
    setShow5(false);
    setIs_manageFund(false);
  };
  const handleShow5 = () => setShow5(true);

  // 2nd modal
  const [show6, setShow6] = useState(false);
  const handleClose6 = () => {
    setShow6(false);
    setIs_manageLoan(false);
  };
  const handleShow6 = () => setShow6(true);

  // manage funds

  //investment properties
  const [show7, setShow7] = useState(false);
  const handleClose7 = () => {
    setShow7(false);
    setIs_investment(false);
  };
  const handleShow7 = () => setShow7(true);

  //  ModalinModal
  const [show8, setShow8] = useState(false);
  const handleClose8 = () => setShow8(false);
  const handleShow8 = () => setShow8(true);
  //investment properties

  let letters = /^[a-zA-Z ]*$/;
  const [DistributionsTakenState, setDistributionsTakenState] = useState(false);
  const [loansAssociatedState, setloansAssociatedState] = useState(false);

  let loansAssociatedHandler = (elem) => {
    if (elem === "No") {
      setloansAssociatedState(false);
    } else {
      setloansAssociatedState(true);
    }
  };

  let initialValues = {
    NameofFamilyTrust: "",
    TypeofTrust: "",
    ABN: "",
    TrusteeType: "",
    CorporateTrusteeName: "",
    NumberofDirectors: "",
    EstablishmentDate: "",
    NameofAccountant: "",
    DistributionCashradio: "No",
    DirectorName1: "",
    DirectorName2: "",
    DirectorName3: "",
    DirectorName4: "",
    loansAssociatedradio: "No",
    managedloansAssociatedradio: "No",
  };
  let validationSchema = Yup.object({
    NameofFamilyTrust:
      CRObject.InvestmentTrust == "No"
        ? Yup.string()
        : Yup.string().matches(letters, "only letters").required("Required"),
    TypeofTrust:
      CRObject.InvestmentTrust == "No"
        ? Yup.string()
        : Yup.string().required("Required"),
    ABN:
      CRObject.InvestmentTrust == "No"
        ? Yup.string()
        : Yup.string().required("Required"),
    TrusteeType:
      CRObject.InvestmentTrust == "No"
        ? Yup.string()
        : Yup.string().required("Required"),
    CorporateTrusteeName: Yup.string().when("TrusteeType", {
      is: (val) => val && val.length == 9,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    EstablishmentDate:
      CRObject.InvestmentTrust == "No"
        ? Yup.string()
        : Yup.date().required("Required").nullable(),
    NameofAccountant:
      CRObject.InvestmentTrust == "No"
        ? Yup.string()
        : Yup.string().matches(letters, "only letters").required("Required"),
    NumberofDirectors:
      CRObject.InvestmentTrust == "No"
        ? Yup.string()
        : Yup.string().required("Required"),

    DirectorName1: Yup.string().when("NumberofDirectors", {
      is: (val) => val && val >= 1,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    DirectorName2: Yup.string().when("NumberofDirectors", {
      is: (val) => val && val >= 2,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    DirectorName3: Yup.string().when("NumberofDirectors", {
      is: (val) => val && val >= 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    DirectorName4: Yup.string().when("NumberofDirectors", {
      is: (val) => val && val >= 4,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
  });

  let Navigate = useNavigate();
  function BackFunction() {
    setSteps(9);
    localStorage.setItem("Steps", 9);
    Navigate("/SMSF");
  }
  let onSubmit = (values) => {
    let AddData = {
      Email: localStorage.getItem("Email"),
      FamilyTrustName:
        CRObject.InvestmentTrust == "No" ? "null" : values.NameofFamilyTrust,

      TrusteeType:
        CRObject.InvestmentTrust == "No" ? "null" : values.TrusteeType,
      ABN: CRObject.InvestmentTrust == "No" ? 0 : values.ABN,

      CorporateTrusteeName:
        values.TrusteeType != "Corporate"
          ? "null"
          : values.CorporateTrusteeName, //miss in backend

      EstablishmentDate:
        CRObject.InvestmentTrust == "No" ? " " : values.EstablishmentDate,
      AccountantName:
        CRObject.InvestmentTrust == "No" ? "null" : values.NameofAccountant,
      TrustType: CRObject.InvestmentTrust == "No" ? "null" : values.TypeofTrust,

      TotalDirectors:
        CRObject.InvestmentTrust == "No" ? " " : values.NumberofDirectors,

      CashDistribution: values.DistributionCashradio,
      Director1Name: values.DirectorName1,
      Director2Name: values.DirectorName2,
      Director3Name: values.DirectorName3,
      Director4Name: values.DirectorName4,

      AustralianSharePortfolio: values.loansAssociatedradio,
      ManagedFunds: values.managedloansAssociatedradio,
    };
    // console.log(AddData);
    // Post Api

    setSteps(11);
    localStorage.setItem("Steps", 11);
    Navigate("/Personal-Insurance"); //! Bad ma Khatam karna hai

    axios
      .post(
        `${DefaultUrl}/api/Client-InvestmentTrust-InvestmentForm/Add-Client-InvestmentForm`,
        AddData
      )
      .then((res) => {
        console.log("Client  Added Successfully!");
        Navigate("/Personal-Insurance");
      });
  };

  const [bankAccountList, setBankAccountList] = useState([]);
  const [isEdit_bankAccountList, set_isEdit_BankAccountList] = useState(false);

  let Bank_initialValues = {
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
  };
  let Bank_validationSchema = Yup.object({
    CurrentValue1: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    FinancialInstitution1: Yup.string(),
    IncomeYield1: Yup.number().test(
      "Is positive?",
      "Must be a positive number",

      (value) => value > 0
    ),

    CurrentValue2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    FinancialInstitution2: Yup.string(),
    IncomeYield2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",

      (value) => value > 0
    ),

    CurrentValue3: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    FinancialInstitution3: Yup.string(),
    IncomeYield3: Yup.number().test(
      "Is positive?",
      "Must be a positive number",

      (value) => value > 0
    ),
  });

  let Bank_onSubmit = (values) => {
    let emailasID = localStorage.getItem("Email");
    // alert("data ");
    let Bank_Data = {
      Email: localStorage.getItem("Email"),

      CurrentValue1: values.CurrentValue1,
      FinancialInstitution1: values.FinancialInstitution1,
      IncomeYield1: values.IncomeYield1,
      // AnnualIncome1:values.AnnualIncome1,
      AnnualIncome1: values.CurrentValue1 * values.IncomeYield1,

      CurrentValue2: values.CurrentValue2,
      FinancialInstitution2: values.FinancialInstitution2,
      IncomeYield2: values.IncomeYield2,
      // AnnualIncome2:values.AnnualIncome2,
      AnnualIncome2: values.CurrentValue2 * values.IncomeYield2,

      CurrentValue3: values.CurrentValue3,
      FinancialInstitution3: values.FinancialInstitution3,
      IncomeYield3: values.IncomeYield3,
      // AnnualIncome3:values.AnnualIncome3,
      AnnualIncome3: values.CurrentValue3 * values.IncomeYield3,
    };

    if (isEdit_bankAccountList) {
      axios
        .patch(
          `${DefaultUrl}/api/Client-InvestmentTrust-BankAccounts/Update-Client-BankAccounts/${Bank_Data.Email}`,
          Bank_Data
        )
        .then((res) => console.log("data Updated successfully"));
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Client-InvestmentTrust-BankAccounts/Add-Client-BankAccounts`,
          Bank_Data
        )
        .then((res) => console.log("data added successfully"));
      set_isEdit_BankAccountList(true);
    }

    setTimeout(() => {
      axios.get(`${DefaultUrl}/api/Client-InvestmentTrust-BankAccounts`).then((res) => {
        console.log("got it");
        let clientObj = res.data;
        let clientFilterObj = clientObj.filter(
          (item) => item.Email == Bank_Data.Email
        );
        setBankAccountList(clientFilterObj);
      });
    }, 500);

    handleClose();
  };

  let deleteHandler_Bank1 = (e) => {
    let data = e;

    data.CurrentValue1 = "";
    data.FinancialInstitution1 = "";
    data.IncomeYield1 = "";
    // AnnualIncome1:values.AnnualIncome1,
    data.AnnualIncome1 = "";

    // setBankAccountList([data]);

    axios
      .patch(
        `${DefaultUrl}/api/Client-InvestmentTrust-BankAccounts/Update-Client-BankAccounts/${data.Email}`,
        data
      )
      .then((res) => console.log("data Updated successfully"));

    setTimeout(() => {
      axios.get(`${DefaultUrl}/api/Client-InvestmentTrust-BankAccounts`).then((res) => {
        console.log("got it");
        let clientObj = res.data;
        let clientFilterObj = clientObj.filter(
          (item) => item.Email == data.Email
        );
        setBankAccountList(clientFilterObj);
      });
    }, 500);
  };

  let deleteHandler_Bank2 = (e) => {
    // let emailasID = localStorage.getItem("Email");

    let data = e;

    data.CurrentValue2 = "";
    data.FinancialInstitution2 = "";
    data.IncomeYield2 = "";
    data.AnnualIncome2 = "";

    axios
      .patch(
        `${DefaultUrl}/api/Client-InvestmentTrust-BankAccounts/Update-Client-BankAccounts/${data.Email}`,
        data
      )
      .then((res) => console.log("data Updated successfully"));

    setTimeout(() => {
      axios.get(`${DefaultUrl}/api/Client-InvestmentTrust-BankAccounts`).then((res) => {
        console.log("got it");
        let clientObj = res.data;
        let clientFilterObj = clientObj.filter(
          (item) => item.Email == data.Email
        );
        setBankAccountList(clientFilterObj);
      });
    }, 500);
  };

  let deleteHandler_Bank3 = (e) => {
    let data = e;

    data.CurrentValue3 = "";
    data.FinancialInstitution3 = "";
    data.IncomeYield3 = "";
    data.AnnualIncome3 = "";

    axios
      .patch(
        `${DefaultUrl}/api/Client-InvestmentTrust-BankAccounts/Update-Client-BankAccounts/${data.Email}`,
        data
      )
      .then((res) => console.log("data Updated successfully"));

    setTimeout(() => {
      axios.get(`${DefaultUrl}/api/Client-InvestmentTrust-BankAccounts`).then((res) => {
        console.log("got it");
        let clientObj = res.data;
        let clientFilterObj = clientObj.filter(
          (item) => item.Email == data.Email
        );
        setBankAccountList(clientFilterObj);
      });
    }, 500);
  };

  const [depositList, setDepositList] = useState([]);
  const [deposit_InitialValue2, setdeposit_InitialValue2] = useState([]);

  const [isEdit_deposit, set_isEdit_deposit] = useState(false);

  let Deposit_initialValues = {
    DepositCurrentValue1: "",
    DepositFinancialInstitution1: "",
    DepositIncomeYield1: "",
    DepositAnnualIncome1: "",

    DepositCurrentValue2: "",
    DepositFinancialInstitution2: "",
    DepositIncomeYield2: "",
    DepositAnnualIncome2: "",

    DepositCurrentValue3: "",
    DepositFinancialInstitution3: "",
    DepositIncomeYield3: "",
    DepositAnnualIncome3: "",
  };
  let Deposit_validationSchema = Yup.object({
    DepositCurrentValue1: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    DepositFinancialInstitution1: Yup.string(),
    DepositIncomeYield1: Yup.number().test(
      "Is positive?",
      "Must be a positive number",

      (value) => value > 0
    ),

    DepositCurrentValue2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    DepositFinancialInstitution2: Yup.string(),
    DepositIncomeYield2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",

      (value) => value > 0
    ),

    DepositCurrentValue3: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    DepositFinancialInstitution3: Yup.string(),
    DepositIncomeYield3: Yup.number().test(
      "Is positive?",
      "Must be a positive number",

      (value) => value > 0
    ),
  });

  let Deposit_onSubmit = (values) => {
    let depositData = {
      Email: localStorage.getItem("Email"),

      CurrentValue1: values.DepositCurrentValue1,
      FinancialInstitution1: values.DepositFinancialInstitution1,
      IncomeYield1: values.DepositIncomeYield1,
      // AnnualIncome1:values.DepositAnnualIncome1,
      AnnualIncome1: values.DepositCurrentValue1 * values.DepositIncomeYield1,

      CurrentValue2: values.DepositCurrentValue2,
      FinancialInstitution2: values.DepositFinancialInstitution2,
      IncomeYield2: values.DepositIncomeYield2,
      // AnnualIncome2:values.DepositAnnualIncome2,
      AnnualIncome2: values.DepositCurrentValue2 * values.DepositIncomeYield2,

      CurrentValue3: values.DepositCurrentValue3,
      FinancialInstitution3: values.DepositFinancialInstitution3,
      IncomeYield3: values.DepositIncomeYield3,
      // AnnualIncome3:values.DepositAnnualIncome3,
      AnnualIncome3: values.DepositCurrentValue3 * values.DepositIncomeYield3,
    };

    console.log(" Deposits ", depositData);

    if (isEdit_deposit) {
      axios
        .patch(
          `${DefaultUrl}/api/Client-InvestmentTrust-TermDeposit/Update-Client-TermDeposit/${depositData.Email}`,
          depositData
        )
        .then((res) => console.log("data Updated successfully"));
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Client-InvestmentTrust-TermDeposit/Add-Client-TermDeposit`,
          depositData
        )
        .then((res) => console.log("data added successfully"));
    }

    setTimeout(() => {
      axios.get(`${DefaultUrl}/api/Client-InvestmentTrust-TermDeposit`).then((res) => {
        console.log("got it");
        let clientObj = res.data;
        let clientFilterObj = clientObj.filter(
          (item) => item.Email == depositData.Email
        );
        setDepositList(clientFilterObj);
        console.log(clientFilterObj);
      });
    }, 500);

    handleClose2();
  };

  let UpdateHandler_Deposit = (elem) => {
    set_isEdit_deposit(true);

    let depositData = {
      DepositCurrentValue1: elem.CurrentValue1,
      DepositFinancialInstitution1: elem.FinancialInstitution1,
      DepositIncomeYield1: elem.IncomeYield1,
      // AnnualIncome1:values.DepositAnnualIncome1,
      DepositAnnualIncome1: elem.AnnualIncome1,

      DepositCurrentValue2: elem.CurrentValue2,
      DepositFinancialInstitution2: elem.FinancialInstitution2,
      DepositIncomeYield2: elem.IncomeYield2,
      // AnnualIncome2:values.DepositAnnualIncome2,
      DepositAnnualIncome2: elem.AnnualIncome2,

      DepositCurrentValue3: elem.CurrentValue3,
      DepositFinancialInstitution3: elem.FinancialInstitution3,
      DepositIncomeYield3: elem.IncomeYield3,
      // AnnualIncome3:values.DepositAnnualIncome3,
      DepositAnnualIncome3: elem.AnnualIncome3,
    };
    setdeposit_InitialValue2([depositData]);

    handleShow2();
  };

  let deleteHandler_Deposit1 = (e) => {
    // console.log(e)
    // setDepositList(

    let data = e;
    data.CurrentValue1 = "";
    data.FinancialInstitution1 = "";
    data.IncomeYield1 = "";
    // AnnualIncome1:values.DepositAnnualIncome1,
    data.AnnualIncome1 = "";

    // setDepositList([data]);

    axios
      .patch(
        `${DefaultUrl}/api/Client-InvestmentTrust-TermDeposit/Update-Client-TermDeposit/${data.Email}`,
        data
      )
      .then((res) => console.log("data Updated successfully"));

    setTimeout(() => {
      axios.get(`${DefaultUrl}/api/Client-InvestmentTrust-TermDeposit`).then((res) => {
        console.log("got it");
        let clientObj = res.data;
        let clientFilterObj = clientObj.filter(
          (item) => item.Email == data.Email
        );
        setDepositList(clientFilterObj);
      });
    }, 500);
  };
  let deleteHandler_Deposit2 = (e) => {
    // console.log(e)
    // setDepositList(
    let data = e;
    data.CurrentValue2 = "";
    data.FinancialInstitution2 = "";
    data.IncomeYield2 = "";
    // AnnualIncome1:values.DepositAnnualIncome1,
    data.AnnualIncome2 = "";

    axios
      .patch(
        `${DefaultUrl}/api/Client-InvestmentTrust-TermDeposit/Update-Client-TermDeposit/${data.Email}`,
        data
      )
      .then((res) => console.log("data Updated successfully"));

    setTimeout(() => {
      axios.get(`${DefaultUrl}/api/Client-InvestmentTrust-TermDeposit`).then((res) => {
        console.log("got it");
        let clientObj = res.data;
        let clientFilterObj = clientObj.filter(
          (item) => item.Email == data.Email
        );
        setDepositList(clientFilterObj);
      });
    }, 500);
  };
  let deleteHandler_Deposit3 = (e) => {
    // console.log(e)
    // setDepositList(
    let data = e;
    data.CurrentValue3 = "";
    data.FinancialInstitution3 = "";
    data.IncomeYield3 = "";
    // AnnualIncome1:values.DepositAnnualIncome1,
    data.AnnualIncome3 = "";

    axios
      .patch(
        `${DefaultUrl}/api/Client-InvestmentTrust-TermDeposit/Update-Client-TermDeposit/${data.Email}`,
        data
      )
      .then((res) => console.log("data Updated successfully"));

    setTimeout(() => {
      axios.get(`${DefaultUrl}/api/Client-InvestmentTrust-TermDeposit`).then((res) => {
        console.log("got it");
        let clientObj = res.data;
        let clientFilterObj = clientObj.filter(
          (item) => item.Email == data.Email
        );
        setDepositList(clientFilterObj);
      });
    }, 500);
  };

  const [Share_initialValues2, setShare_initialValues2] = useState([]);
  const [is_Share, setIs_Share] = useState(false);
  const [AustralianShareList, setAustralianShareList] = useState([]);

  // start Australian tab
  let Share_initialValues = {
    ShareInvestmentName: "",
    NoOfShares: "",
    CurrentSharePrice: "",
    TotalShareValue: "", //read only
    CostBase: "",
    PurchaseDate: "",
    Incomepa: "",
    IncomepaType: "",
    TotalIncomePa: "", //read only
    FrankedAmount: "",
    RegInvestmentsPA: "",
    Reinvestincomeradio: "No",
  };
  let Share_validationSchema = Yup.object({
    ShareInvestmentName: Yup.string(),
    NoOfShares: Yup.number().test(
      "Is positive?",
      "Must be positive number",

      (value) => value > 0
    ),
    CurrentSharePrice: Yup.number().test(
      "Is positive?",
      "Must be positive number",
      (value) => value > 0
    ),

    CostBase: Yup.number().test(
      "Is positive?",
      "Must be positive number",

      (value) => value > 0
    ),
    PurchaseDate: Yup.date().nullable(),
    Incomepa: Yup.number().test(
      "Is positive?",
      "Must be positive number",

      (value) => value > 0
    ),
    IncomepaType: Yup.string(),

    FrankedAmount: Yup.number()
      .test(
        "Is positive?",
        "Must be positive number",

        (value) => value > 0
      )
      .max("100", "value must be less then or equal to 100"),
    RegInvestmentsPA: Yup.number().test(
      "Is positive?",
      "Must be positive number",
      (value) => value > 0
    ),
  });

  let Share_onSubmit = (values) => {
    // console.log(PurchaseDate)
    let AddData = {
      Email: localStorage.getItem("Email"),
      InvestmentName: values.ShareInvestmentName,
      NumberOfShares: values.NoOfShares,
      CurrentSharePrice: values.CurrentSharePrice,
      TotalShareValue: values.NoOfShares * values.CurrentSharePrice, //TotalShareValue:'', read only
      CostBase: values.CostBase,
      PurchaseDate: values.PurchaseDate,
      IncomePA: values.Incomepa,

      IncomePAType: values.IncomepaType,

      TotalIncomePA:
        values.IncomepaType == ""
          ? 0
          : values.IncomepaType == "dollar"
          ? parseFloat(values.Incomepa) || 0
          : parseFloat(
              ((parseFloat(values.Incomepa) || 0) / 100) *
                (values.NoOfShares * values.CurrentSharePrice)
            ), //TotalIncomePa:'', //read only

      FrankedAmount: values.FrankedAmount,

      ReinvestIncome: values.Reinvestincomeradio,

      RegInvestmentsPA: values.RegInvestmentsPA,
    };

    if (is_Share) {
      let id = values.id;

      axios
        .patch(
          `${DefaultUrl}/api/Client-InvestmentTrust-AustralianShareMarket/Update-Client-Australian-Market-Share/${AddData.Email}/${id}`,
          AddData
        )
        .then((res) => console.log("data Updated successfully"));

      setIs_Share(false);
      // handleClose3();
    } else {
      console.log(AddData);
      axios
        .post(
          `${DefaultUrl}/api/Client-InvestmentTrust-AustralianShareMarket/Add-Client-Australian-Market-Share`,
          AddData
        )
        .then((res) => console.log("Data Added Successfully"));
    }

    setTimeout(() => {
      axios
        .get(
          `${DefaultUrl}/api/Client-InvestmentTrust-AustralianShareMarket/Australian-Market-Share`
        )
        .then((res) => {
          console.log("Australian Share List get Successfully");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter(
            (item) => item.Email == AddData.Email
          );
          setAustralianShareList(clientFilterObj);
          console.log(clientFilterObj);
        });
    }, 500);

    handleClose3();
  };

  let updateHandler_AustralianShare = (elem, ind) => {
    setIs_Share(true);

    let date = new Date(elem.PurchaseDate);
    elem.PurchaseDate = date;

    let AddData2 = {
      id: elem._id,
      ShareInvestmentName: elem.InvestmentName,
      NoOfShares: elem.NumberOfShares,
      CurrentSharePrice: elem.CurrentSharePrice,
      TotalShareValue: elem.TotalShareValue, //TotalShareValue:'', read only
      CostBase: elem.CostBase,
      PurchaseDate: elem.PurchaseDate,
      Incomepa: elem.IncomePA,
      IncomepaType: elem.IncomePAType,
      TotalIncomePa: elem.TotalIncomePA, //TotalIncomePa:'', //read only
      FrankedAmount: elem.FrankedAmount,
      Reinvestincomeradio: elem.ReinvestIncome,
      RegInvestmentsPA: elem.RegInvestmentsPA,
    };
    setShare_initialValues2(AddData2);
    // setUpdateIndex(ind);
    handleShow3();
    console.log(AddData2);
  };

  let deleteHandler_AustralianShare = (elem, ind) => {
    // set_isEdit_BankAccountList(true)
    // setAustralianShareList(
    //   AustralianShareList.filter((AustralianShareList, index) => index !== ind)
    // );

    let id = elem._id;
    let email = elem.Email;

    axios
      .delete(
        `${DefaultUrl}/api/Client-InvestmentTrust-AustralianShareMarket/Delete-Client-Australian-Market-Share/${email}/${id}`
      )
      .then((res) => {
        //Popper Massage
        console.log("Australian Share Market Remove");
      });

    setTimeout(() => {
      axios
        .get(
          `${DefaultUrl}/api/Client-InvestmentTrust-AustralianShareMarket/Australian-Market-Share`
        )
        .then((res) => {
          console.log("Australian Share List get Successfully");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter((item) => item.Email == email);
          setAustralianShareList(clientFilterObj);
          console.log(clientFilterObj);
        });
    }, 500);

    // handleShow3();
  };

  const [loan_initialValues2, setLoan_initialValues2] = useState([]);
  const [is_Loan, setIs_Loan] = useState(false);
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
    AustralianPortfolioLoanType: Yup.string(),
    AustralianPortfolioCurrentBalance: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    AustralianPortfolioLender: Yup.string(),
    AustralianPortfolioRepaymentAmount: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    AustralianPortfolioFrequency: Yup.string(),
    AustralianInterestRatePA: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    AustralianPortfolioLoanTerm: Yup.string(),
    AustralianPortfolioLoanType2: Yup.string(),
    AustralianPortfolioDeductibleLoanAmount: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    AustralianPortfolioYearRemaining: Yup.string(),
  });
  let Australian_loansAssociated_onSubmit = (values) => {
    let myData = {
      // myloan

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
        values.AustralianPortfolioFrequency *
        values.AustralianPortfolioRepaymentAmount, //AustralianPortfolioAnnualRepayment:'', //readonly

      AustralianPortfolioLoanTerm: values.AustralianPortfolioLoanTerm,
      AustralianPortfolioLoanType2: values.AustralianPortfolioLoanType2,
      AustralianPortfolioDeductibleLoanAmount:
        values.AustralianPortfolioDeductibleLoanAmount,
      AustralianPortfolioYearRemaining: values.AustralianPortfolioYearRemaining,
    };

    console.log(myData);

    if (is_Loan) {
      let id = values.id;

      axios
        .patch(
          `${DefaultUrl}/api/Client-InvestmentTrust-AustralianSharePortfolio/Update-Client-Australian-Market-Portfolio/${myData.Email}/${id}`,
          myData
        )
        .then((res) => {
          console.log("data Updated successfully");
          handleClose4();
        });

      setIs_Loan(false);
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Client-InvestmentTrust-AustralianSharePortfolio/Add-Client-Australian-Market-Portfolio`,
          myData
        )
        .then((res) => {
          console.log("data Added Successfully");
          handleClose4();
        });
    }

    setTimeout(() => {
      axios
        .get(
          `${DefaultUrl}/api/Client-InvestmentTrust-AustralianSharePortfolio/Australian-Market-Portfolio`
        )
        .then((res) => {
          console.log("Australian Share List get Successfully");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter(
            (item) => item.Email == myData.Email
          );
          setAustralianLoanList(clientFilterObj);
          console.log(clientFilterObj);
        });
    }, 500);
  };

  let updateHandler_AustralianLoan = (elem, ind) => {
    setIs_Loan(true);

    let myData = {
      id: elem._id,
      Email: localStorage.getItem("Email"),
      AustralianPortfolioLoanType: elem.AustralianPortfolioLoanType,
      AustralianPortfolioCurrentBalance: elem.AustralianPortfolioCurrentBalance,
      AustralianPortfolioLender: elem.AustralianPortfolioLender,
      AustralianInterestRatePA: elem.AustralianInterestRatePA,

      AustralianPortfolioRepaymentAmount:
        elem.AustralianPortfolioRepaymentAmount,
      AustralianPortfolioFrequency: elem.AustralianPortfolioFrequency,
      AustralianPortfolioAnnualRepayment: 5000, //AustralianPortfolioAnnualRepayment:'', //readonly

      AustralianPortfolioLoanTerm: elem.AustralianPortfolioLoanTerm,
      AustralianPortfolioLoanType2: elem.AustralianPortfolioLoanType2,
      AustralianPortfolioDeductibleLoanAmount:
        elem.AustralianPortfolioDeductibleLoanAmount,
      AustralianPortfolioYearRemaining: elem.AustralianPortfolioYearRemaining,
    };

    setLoan_initialValues2([myData]);
    // setUpdateIndex(ind);
    handleShow4();
  };

  let deleteHandler_AustralianLoan = (elem, ind) => {
    let id = elem._id;
    let email = elem.Email;

    axios
      .delete(
        `${DefaultUrl}/api/Client-InvestmentTrust-AustralianSharePortfolio/Delete-Client-Australian-Market-Portfolio/${email}/${id}`
      )
      .then((res) => {
        //Popper Massage
        console.log("Australian Share Market Remove");
      });

    setTimeout(() => {
      axios
        .get(
          `${DefaultUrl}/api/Client-InvestmentTrust-AustralianSharePortfolio/Australian-Market-Portfolio`
        )
        .then((res) => {
          console.log("Australian Share List get Successfully");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter((item) => item.Email == email);
          setAustralianLoanList(clientFilterObj);
          console.log(clientFilterObj);
        });
    }, 500);
    // handleShow4();
  };

  // end Australian tab
  // managed funds tab start

  // managed fund

  const [manageFund_initialValues2, setManageFund_initialValues2] = useState(
    []
  );
  const [is_manageFund, setIs_manageFund] = useState(false);
  const [manageFundList, setManageFundList] = useState([]);
  let manageFund_initialValues = {
    PlatformName: "",
    InvestmentName: "",
    NoOfUnitsShares: "",
    CurrentShareUnitPrice: "",
    managedCurrentValue: "", //readonly
    OriginalInvestment: "",
    managedPurchaseDate: "",
    managedIncomepa: "",
    managedIncomepaType: "",
    managedTotalIncomePA: "", //readonly
    managedRegInvestmentsPA: "",
    managedReinvestincomeradio: "No",
  };

  let manageFund_validationSchema = Yup.object({
    PlatformName: Yup.string(),
    InvestmentName: Yup.string(),
    NoOfUnitsShares: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),

    CurrentShareUnitPrice: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),

    OriginalInvestment: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    managedPurchaseDate: Yup.date().nullable(),

    managedIncomepa: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    managedIncomepaType: Yup.string().nullable(),
    managedRegInvestmentsPA: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
  });

  let manageFund_onSubmit = (values) => {
    let myData = {
      Email: localStorage.getItem("Email"),
      PlatformName: values.PlatformName,
      InvestmentName: values.InvestmentName,
      NoOfShares: values.NoOfUnitsShares,
      CurrentSharePrice: values.CurrentShareUnitPrice,
      CurrentShareValue: values.NoOfUnitsShares * values.CurrentShareUnitPrice, //managedCurrentValue read only
      OriginalInvestment: values.OriginalInvestment,
      PurchaseDate: values.managedPurchaseDate,
      IncomePA: values.managedIncomepa,
      IncomePAType: values.managedIncomepaType,
      TotalIncomePA:
        values.managedIncomepaType == ""
          ? 0
          : values.managedIncomepaType == "dollar"
          ? parseFloat(values.managedIncomepa) || 0
          : parseFloat(
              ((parseFloat(values.managedIncomepa) || 0) / 100) *
                (values.NoOfUnitsShares * values.CurrentShareUnitPrice)
            ), //managedTotalIncomePA read only
      RegInvestmentsPA: values.managedRegInvestmentsPA,
      ReinvestIncome: values.managedReinvestincomeradio,
    };

    console.log(myData);

    if (is_manageFund) {
      let id = values.id;

      axios
        .patch(
          `${DefaultUrl}/api/Client-InvestmentTrust-ManagedFunds/Update-Client-ManagedFunds/${myData.Email}/${id}`,
          myData
        )
        .then((res) => {
          console.log("data Updated successfully");
          handleClose5();
          setIs_manageFund(false);
        });
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Client-InvestmentTrust-ManagedFunds/Add-Client-ManagedFunds`,
          myData
        )
        .then((ref) => {
          console.log("Manage Fund List get Successfully !");
          handleClose5();
        });
    }

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-InvestmentTrust-ManagedFunds/Client-ManagedFunds`)
        .then((res) => {
          console.log("Manage Fund List get Successfully");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter(
            (item) => item.Email == myData.Email
          );
          setManageFundList(clientFilterObj);
          console.log(clientFilterObj);
        });
    }, 500);
  };
  let updateHandler_ManageFund = (elem, ind) => {
    // console.log(elem);
    setIs_manageFund(true);

    let date = new Date(elem.PurchaseDate);
    elem.PurchaseDate = date;

    let myData = {
      id: elem._id,
      Email: localStorage.getItem("Email"),
      PlatformName: elem.PlatformName,
      InvestmentName: elem.InvestmentName,
      NoOfUnitsShares: elem.NoOfShares,
      CurrentShareUnitPrice: elem.CurrentSharePrice,
      managedCurrentValue: 5000, //managedCurrentValue read only
      OriginalInvestment: elem.OriginalInvestment,
      managedPurchaseDate: elem.PurchaseDate,
      managedIncomepa: elem.IncomePA,
      managedIncomepaType: elem.IncomePAType,
      managedTotalIncomePA: 5000, //managedTotalIncomePA read only
      managedRegInvestmentsPA: elem.RegInvestmentsPA,
      managedReinvestincomeradio: elem.ReinvestIncome,
    };

    setManageFund_initialValues2([myData]);

    // setUpdateIndex(ind);
    handleShow5();
  };

  let deleteHandler_ManageFund = (elem, ind) => {
    let id = elem._id;
    let email = elem.Email;

    axios
      .delete(
        `${DefaultUrl}/api/Client-InvestmentTrust-ManagedFunds/Delete-Client-ManagedFunds/${email}/${id}`
      )
      .then((res) => {
        //Popper Massage
        console.log("Manage Fund List Remove");
      });

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-InvestmentTrust-ManagedFunds/Client-ManagedFunds`)
        .then((res) => {
          console.log("Manage Fund List get Successfully");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter((item) => item.Email == email);
          setManageFundList(clientFilterObj);
          console.log(clientFilterObj);
        });
    }, 500);
  };

  // managed fund

  // managed loan

  const [manageloan_initialValues2, setmanageLoan_initialValues2] = useState(
    []
  );
  const [is_manageLoan, setIs_manageLoan] = useState(false);
  const [manageLoanList, setManageLoanList] = useState([]);
  let managed_initialValues = {
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

  let managed_validationSchema = Yup.object({
    Typeofloan: Yup.string(),
    CurrentBalance: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    Lender: Yup.string(),
    RepaymentsAmount: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    Frequency: Yup.string(),
    InterestRatePA: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    LoanTermInYears: Yup.string(),
    LoanType: Yup.string(),
    DeductibleAmountofLoan: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    YearRemaning: Yup.string(),
  });

  let managed_onSubmit = (values) => {
    let myData = {
      Email: localStorage.getItem("Email"),
      ManagedFundsPortfolioLoanType: values.Typeofloan,
      ManagedFundsPortfolioCurrentBalance: values.CurrentBalance,
      ManagedFundsPortfolioLender: values.Lender,

      ManagedFundsPortfolioRepaymentAmount: values.RepaymentsAmount,
      ManagedFundsPortfolioFrequency: values.Frequency,

      ManagedFundsPortfolioAnnualRepayments:
        values.RepaymentsAmount * values.Frequency, //  managedAnnualRepayments, //readonly
      ManagedFundsPortfolioInterestRatePA: values.InterestRatePA,

      ManagedFundsPortfolioLoanTerm: values.LoanTermInYears,
      ManagedFundsPortfolioLoanType2: values.LoanType,
      ManagedFundsPortfolioDeductibleLoanAmount: values.DeductibleAmountofLoan,
      ManagedFundsPortfolioYearRemaining: values.YearRemaning,
    };

    console.log(myData);

    if (is_manageLoan) {
      let id = values.id;

      axios
        .patch(
          `${DefaultUrl}/api/Client-InvestmentTrust-ManagedFundsPortfolio/Update-Client-ManagedFunds-Portfolio/${myData.Email}/${id}`,
          myData
        )
        .then((res) => {
          console.log("data Updated successfully");
          handleClose6();
          setIs_manageLoan(false);
        });
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Client-InvestmentTrust-ManagedFundsPortfolio/Add-Client-ManagedFunds-Portfolio`,
          myData
        )
        .then((ref) => {
          console.log("Managed Fund Portfolio Added Succeccfully!");
          // setManageLoanList([...manageLoanList, myData]);
          handleClose6();
        });
    }

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-InvestmentTrust-ManagedFundsPortfolio`)
        .then((res) => {
          console.log("Manage Fund List get Successfully");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter(
            (item) => item.Email == myData.Email
          );
          setManageLoanList(clientFilterObj);
          console.log(clientFilterObj);
        });
    }, 500);
  };

  let updateHandler_ManageLoan = (elem, ind) => {
    setIs_manageLoan(true);

    let myData = {
      id: elem._id,
      Email: localStorage.getItem("Email"),
      Typeofloan: elem.ManagedFundsPortfolioLoanType,
      CurrentBalance: elem.ManagedFundsPortfolioCurrentBalance,
      Lender: elem.ManagedFundsPortfolioLender,

      RepaymentsAmount: elem.ManagedFundsPortfolioRepaymentAmount,
      Frequency: elem.ManagedFundsPortfolioFrequency,

      managedAnnualRepayments: 5000, //  managedAnnualRepayments, //readonly
      InterestRatePA: elem.ManagedFundsPortfolioInterestRatePA,

      LoanTermInYears: elem.ManagedFundsPortfolioLoanTerm,
      LoanType: elem.ManagedFundsPortfolioLoanType2,
      DeductibleAmountofLoan: elem.ManagedFundsPortfolioDeductibleLoanAmount,
      YearRemaning: elem.ManagedFundsPortfolioYearRemaining,
    };

    setmanageLoan_initialValues2([myData]);
    // setUpdateIndex(ind);
    handleShow6();
  };

  let deleteHandler_ManageLoan = (elem, ind) => {
    // setManageLoanList(manageLoanList.filter((manageLoanList, index) => index !== ind));

    let id = elem._id;
    let email = elem.Email;

    axios
      .delete(
        `${DefaultUrl}/api/Client-InvestmentTrust-ManagedFundsPortfolio/Delete-Client-ManagedFunds-Portfolio/${email}/${id}`
      )
      .then((res) => {
        //Popper Massage
        console.log("Manage Loan List Remove");
      });

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-InvestmentTrust-ManagedFundsPortfolio`)
        .then((res) => {
          console.log("Manage Fund List get Successfully");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter((item) => item.Email == email);
          setManageLoanList(clientFilterObj);
          console.log(clientFilterObj);
        });
    }, 500);
  };
  // managed loan

  // managed funds tab end

  //investment properties

  const [investment_initialValues2, setInvestment_initialValues2] = useState(
    []
  );
  const [is_investment, setIs_investment] = useState(false);
  const [investmentList, setInvestmentList] = useState([]);

  let Investment_initialValues = {
    InvestmentCurrentValue: "", // num
    InvestmentCostBasePurchasePrice: "", // num
    InvestmentPropertyAddress: "",
    investmentPostcodeSuburb: "",
    InvestmentRentalIncome: "",
    InvestmentFrequency: "",
    InvestmentTotalAnnualIncome: "", // readonly
    InvestmentExpensesPA: "",

    loanAttachedradio: "No", // radio

    InvestmentCurrentBalance: "",
    InvestmentLender: "",
    InvestmentRepaymentsAmount: "",
    InvestmentFrequencyRadio: "",
    InvestmentAnnualRepayments: "", //readOnly
    InvestmentInterestRatePA: "",
    InvestmentLoanTermInYear: "",
    InvestmentLoanType: "",
    InvestmentDedAmountOfLoan: "", // num
    InvestmentYearsRemainingYear: "", // select
  };
  let Investment_validationSchema = Yup.object({
    InvestmentCurrentValue: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    InvestmentCostBasePurchasePrice: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    InvestmentPropertyAddress: Yup.string(),
    investmentPostcodeSuburb: Yup.string(),
    InvestmentRentalIncome: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    InvestmentFrequency: Yup.string(),
    InvestmentExpensesPA: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),

    // conditional validation

    InvestmentCurrentBalance: Yup.number().when("loanAttachedradio", {
      is: (val) => val && val.length === 3,
      then: Yup.number().test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      otherwise: Yup.number().notRequired(),
    }),

    InvestmentLender: Yup.string().when("loanAttachedradio", {
      is: (val) => val && val.length == 3,
      then: Yup.string(),
      otherwise: Yup.string().notRequired(),
    }),

    InvestmentRepaymentsAmount: Yup.number().when("loanAttachedradio", {
      is: (val) => val && val.length === 3,
      then: Yup.number().test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      otherwise: Yup.number().notRequired(),
    }),

    InvestmentFrequencyRadio: Yup.string().when("loanAttachedradio", {
      is: (val) => val && val.length == 3,
      then: Yup.string(),
      otherwise: Yup.string().notRequired(),
    }),

    InvestmentInterestRatePA: Yup.number().when("loanAttachedradio", {
      is: (val) => val && val.length === 3,
      then: Yup.number().test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      otherwise: Yup.number().notRequired(),
    }),

    InvestmentLoanTermInYear: Yup.string().when("loanAttachedradio", {
      is: (val) => val && val.length == 3,
      then: Yup.string(),
      otherwise: Yup.string().notRequired(),
    }),

    InvestmentLoanType: Yup.string().when("loanAttachedradio", {
      is: (val) => val && val.length == 3,
      then: Yup.string(),
      otherwise: Yup.string().notRequired(),
    }),

    InvestmentDedAmountOfLoan: Yup.number().when("loanAttachedradio", {
      is: (val) => val && val.length === 3,
      then: Yup.number().test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
      otherwise: Yup.number().notRequired(),
    }),

    InvestmentYearsRemainingYear: Yup.string().when("loanAttachedradio", {
      is: (val) => val && val.length == 3,
      then: Yup.string(),
      otherwise: Yup.string().notRequired(),
    }),
  });

  let Investment_onSubmit = (values) => {
    let myData = {
      Email: localStorage.getItem("Email"),
      CurrentValue: values.InvestmentCurrentValue, // num
      CostBase: values.InvestmentCostBasePurchasePrice, // num
      PropertyAddress: values.InvestmentPropertyAddress,
      PostCode: values.investmentPostcodeSuburb,
      RentalIncome: values.InvestmentRentalIncome,
      Frequency: values.InvestmentFrequency,
      TotalAnnualIncome:
        values.InvestmentRentalIncome * values.InvestmentFrequency, //InvestmentTotalAnnualIncome readonly
      ExpensesPA: values.InvestmentExpensesPA,

      LoanAttached: values.loanAttachedradio,

      CurrentBalance: values.InvestmentCurrentBalance,
      Lender: values.InvestmentLender,
      RepaymentAmount: values.InvestmentRepaymentsAmount,
      Frequency2: values.InvestmentFrequencyRadio,
      AnnualRepayments:
        values.InvestmentRepaymentsAmount * values.InvestmentFrequencyRadio, // InvestmentAnnualRepayments readOnly
      InterestRatePA: values.InvestmentInterestRatePA,
      LoanTerm: values.InvestmentLoanTermInYear,
      LoanType: values.InvestmentLoanType,
      DebtAmountLoan: values.InvestmentDedAmountOfLoan,
      YearsRemaining: values.InvestmentYearsRemainingYear,
    };

    console.log(myData);

    if (is_investment) {
      let id = values.id;

      axios
        .patch(
          `${DefaultUrl}/api/Client-InvestmentTrust-InvestmentProperties/Update-Client-InvestmentProperties/${myData.Email}/${id}`,
          myData
        )
        .then((res) => {
          console.log("data Updated successfully");
          handleClose7();
          setIs_investment(false);
        });
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Client-InvestmentTrust-InvestmentProperties/Add-Client-InvestmentProperties`,
          myData
        )
        .then((res) => {
          console.log("Data added sussessfully!");
          handleClose7();
        });
    }

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-InvestmentTrust-InvestmentProperties`)
        .then((res) => {
          console.log("Manage Fund List get Successfully");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter(
            (item) => item.Email == myData.Email
          );
          setInvestmentList(clientFilterObj);
          console.log(clientFilterObj);
        });
    }, 500);
  };

  let updateHandler_Investment = (elem, ind) => {
    setIs_investment(true);

    let myData = {
      id: elem._id,
      Email: localStorage.getItem("Email"),
      InvestmentCurrentValue: elem.CurrentValue, // num
      InvestmentCostBasePurchasePrice: elem.CostBase, // num
      InvestmentPropertyAddress: elem.PropertyAddress,
      investmentPostcodeSuburb: elem.PostCode,
      InvestmentRentalIncome: elem.RentalIncome,
      InvestmentFrequency: elem.Frequency,
      TotalAnnualIncome: 5000, //InvestmentTotalAnnualIncome readonly
      InvestmentExpensesPA: elem.ExpensesPA,

      loanAttachedradio: elem.LoanAttached,

      InvestmentCurrentBalance: elem.CurrentBalance,
      InvestmentLender: elem.Lender,
      InvestmentRepaymentsAmount: elem.RepaymentAmount,
      InvestmentFrequencyRadio: elem.Frequency2,
      AnnualRepayments: 5000, // InvestmentAnnualRepayments readOnly
      InvestmentInterestRatePA: elem.InterestRatePA,
      InvestmentLoanTermInYear: elem.LoanTerm,
      InvestmentLoanType: elem.LoanType,
      InvestmentDedAmountOfLoan: elem.DebtAmountLoan,
      InvestmentYearsRemainingYear: elem.YearsRemaining,
    };

    setInvestment_initialValues2([myData]);
    // setUpdateIndex(ind);
    handleShow7();
    // handleShow4()
  };

  let deleteHandler_Investment = (elem, ind) => {
    // alert("delete");
    // setInvestmentList(investmentList.filter((investmentList, index) => index !== ind));

    let id = elem._id;
    let email = elem.Email;

    axios
      .delete(
        `${DefaultUrl}/api/Client-InvestmentTrust-InvestmentProperties/Delete-Client-InvestmentProperties/${email}/${id}`
      )
      .then((res) => {
        //Popper Massage
        console.log("Manage Loan List Remove");
      });

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-InvestmentTrust-InvestmentProperties`)
        .then((res) => {
          console.log("Manage Fund List get Successfully");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter((item) => item.Email == email);
          setInvestmentList(clientFilterObj);
          console.log(clientFilterObj);
        });
    }, 500);
  };
  //investment properties

  //investment properties modal within modal

  let Investment_initialValues_Modal = {
    TotalPropertyExpenses2: "", //readonly
    BodyCorporateFees2: "",
    CouncilRates2: "",
    GardeningAndLawnmowing2: "",
    Insurance2: "",
    LandTax2: "",
    RepairsAndMaintenance2: "",
    WaterCharges2: "",
    Other2: "",
    TelephoneAndInternet2: "",
    ProfessionalFees2: "",
    AllOther2: "",
  };
  let Investment_validationSchema_Modal = Yup.object({
    BodyCorporateFees2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    CouncilRates2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    GardeningAndLawnmowing2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    Insurance2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    LandTax2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    RepairsAndMaintenance2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    WaterCharges2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    Other2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    TelephoneAndInternet2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
    ProfessionalFees2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),

    AllOther2: Yup.number().test(
      "Is positive?",
      "Must be a positive number",
      (value) => value > 0
    ),
  });
  let Investment_onSubmit_Modal = (values) => {
    let myData = {
      Email: localStorage.getItem("Email"),

      TotalPropertyExpenses:
        values.BodyCorporateFees2 +
        values.CouncilRates2 +
        values.GardeningAndLawnmowing2 +
        values.Insurance2 +
        values.LandTax2 +
        values.RepairsAndMaintenance2 +
        values.WaterCharges2 +
        values.Other2 +
        values.TelephoneAndInternet2 +
        values.ProfessionalFees2 +
        values.AllOther2, //readonly
      BodyCorporateFees: values.BodyCorporateFees2,
      CouncilRates: values.CouncilRates2,
      GardeningAndLawnMowing: values.GardeningAndLawnmowing2,
      Insurance: values.Insurance2,
      LandTax: values.LandTax2,
      RepairsAndMaintenance: values.RepairsAndMaintenance2,
      WaterCharges: values.WaterCharges2,
      Other: values.Other2,
      TelephoneAndInternet: values.TelephoneAndInternet2,
      ProfessionalFees: values.ProfessionalFees2,
      AllOther: values.AllOther,
    };
    console.log(myData);

    axios
      .post(
        `${DefaultUrl}/api/Client-InvestmentTrust-InvestmentProperties-Modal/Add-Client-InvestmentPropertiesModal`,
        myData
      )
      .then((res) => {
        console.log("Data Added Successfully!");
      });
    handleClose8();
  };

  useEffect(() => {
    let email = localStorage.getItem("Email");

    //BankAccounts is added in get Api
    axios.get(`${DefaultUrl}/api/Client-InvestmentTrust-BankAccounts`).then((res) => {
      let clientObj = res.data;
      let clientFilterObj = clientObj.filter((item) => item.Email == email);
      let data = {
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
      };
      if (clientFilterObj.length > 0) {
        setBankAccountList([data]);
        set_isEdit_BankAccountList(true);
      }
    });

    axios.get(`${DefaultUrl}/api/Client-InvestmentTrust-TermDeposit`).then((res) => {
      console.log("got it");
      let clientObj = res.data;
      let clientFilterObj = clientObj.filter((item) => item.Email == email);
      let data = {
        DepositCurrentValue1: " ",
        DepositFinancialInstitution1: " ",
        DepositIncomeYield1: " ",
        DepositAnnualIncome1: " ",

        DepositCurrentValue2: " ",
        DepositFinancialInstitution2: " ",
        DepositIncomeYield2: " ",
        DepositAnnualIncome2: " ",

        DepositCurrentValue3: " ",
        DepositFinancialInstitution3: " ",
        DepositIncomeYield3: " ",
        DepositAnnualIncome3: " ",
      };

      if (clientFilterObj.length > 0) {
        setdeposit_InitialValue2([data]);
        set_isEdit_deposit(true);
      }
    });
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row px-0 m-0">
          <div className="col-md-12">
            <Formik
              initialValues={initialValues}
              // validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, handleChange, setFieldValue, handleBlur }) => (
                <Form>
                  <Card className="shadow py-4 px-4 my-3">
                    <h3 className="text-center">Investment Trust</h3>

                    {CRObject.InvestmentTrust == "Yes" && (
                      <div>
                        <div className="row mb-3">
                          <div className="col-6">
                            <label
                              htmlFor="NameofFamilyTrust"
                              className="form-label"
                            >
                              Name of Family Trust
                            </label>
                          </div>
                          <div className="col-6">
                            <Field
                              type="text"
                              className="form-control shadow inputDesign"
                              id="NameofFamilyTrust"
                              name="NameofFamilyTrust"
                              placeholder="Name of Family Trust"
                            />
                            <ErrorMessage
                              name="NameofFamilyTrust"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-6">
                            <label htmlFor="TypeofTrust" className="form-label">
                              Type of Trust
                            </label>
                          </div>
                          <div className="col-6">
                            <Field
                              as="select"
                              id="TypeofTrust"
                              className="form-select shadow  inputDesign"
                              name="TypeofTrust"
                            >
                              <option value="">Select</option>
                              <option value="DiscretionaryFamilyTrust">
                                Discretionary Family Trust
                              </option>
                              <option value="Other">Other</option>
                            </Field>
                            <ErrorMessage
                              className="text-danger fw-bold"
                              component="div"
                              name="TypeofTrust"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-6">
                            <label htmlFor="ABN" className="form-label">
                              ABN
                            </label>
                          </div>
                          <div className="col-6">
                            <Field
                              type="text"
                              className="form-control shadow inputDesign"
                              id="ABN"
                              name="ABN"
                              placeholder="ABN"
                            />
                            <ErrorMessage
                              name="ABN"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-6">
                            <label className="form-label">
                              Distribution Taken As Cash?
                            </label>
                          </div>
                          <div className="col-6">
                            <div className="radiobutton">
                              <input
                                type="radio"
                                name="DistributionCashradio"
                                id="DistributionCashopt1"
                                value="Yes"
                                onChange={handleChange}
                                checked={values.DistributionCashradio === "Yes"}
                              />
                              <label
                                htmlFor="DistributionCashopt1"
                                className="label1"
                              >
                                <span>YES</span>
                              </label>
                              <input
                                type="radio"
                                name="DistributionCashradio"
                                id="DistributionCashopt2"
                                value="No"
                                onChange={handleChange}
                                checked={values.DistributionCashradio === "No"}
                              />
                              <label
                                htmlFor="DistributionCashopt2"
                                className="label2"
                              >
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-6">
                            <label
                              htmlFor="EstablishmentDate"
                              className="form-label"
                            >
                              {" "}
                              Establishment Date{" "}
                            </label>
                          </div>
                          <div className="col-6">
                            <div>
                              <DatePicker
                                className="form-control inputDesign shadow"
                                showIcon
                                id="EstablishmentDate"
                                name="EstablishmentDate"
                                selected={values.EstablishmentDate}
                                onChange={(date) =>
                                  setFieldValue("EstablishmentDate", date)
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
                              className="text-danger fw-bold"
                              component="div"
                              name="EstablishmentDate"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-6">
                            <label
                              htmlFor="NameofAccountant"
                              className="form-label"
                            >
                              {" "}
                              Name of Accountant{" "}
                            </label>
                          </div>
                          <div className="col-6">
                            <Field
                              type="text"
                              className="form-control shadow inputDesign"
                              id="NameofAccountant"
                              name="NameofAccountant"
                              placeholder="Name of Accountant"
                            />
                            <ErrorMessage
                              name="NameofAccountant"
                              component="div"
                              className="text-danger fw-bold"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-6">
                            <label htmlFor="TrusteeType" className="form-label">
                              Trustee Type
                            </label>
                          </div>
                          <div className="col-6">
                            <Field
                              as="select"
                              id="TrusteeType"
                              className="form-select shadow  inputDesign"
                              name="TrusteeType"
                            >
                              <option value="">Select</option>
                              <option value="Individual">Individual</option>
                              <option value="Corporate">Corporate</option>
                            </Field>
                            <ErrorMessage
                              className="text-danger fw-bold"
                              component="div"
                              name="TrusteeType"
                            />
                          </div>
                        </div>

                        {values.TrusteeType === "Corporate" && (
                          <div className="row mb-3">
                            <div className="col-6">
                              <label
                                htmlFor="CorporateTrusteeName"
                                className="form-label"
                              >
                                Corporate Trustee Name
                              </label>
                            </div>
                            <div className="col-6">
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="CorporateTrusteeName"
                                name="CorporateTrusteeName"
                                placeholder="Corporate Trustee Name"
                              />
                              <ErrorMessage
                                name="CorporateTrusteeName"
                                component="div"
                                className="text-danger fw-bold"
                              />
                            </div>
                          </div>
                        )}

                        <div className="row mb-3">
                          <div className="col-6">
                            <label htmlFor="TrusteeType" className="form-label">
                              Number of Directors(1 to 4)
                            </label>
                          </div>
                          <div className="col-6">
                            <Field
                              as="select"
                              id="NumberofDirectors"
                              className="form-select shadow  inputDesign"
                              name="NumberofDirectors"
                            >
                              <option value="">Select</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </Field>
                            <ErrorMessage
                              className="text-danger fw-bold"
                              component="div"
                              name="NumberofDirectors"
                            />
                          </div>
                        </div>

                        {values.NumberofDirectors >= 1 && (
                          <div className="row mb-3">
                            <div className="col-6">
                              <label
                                htmlFor="DirectorName1"
                                className="form-label"
                              >
                                Director Name 1
                              </label>
                            </div>
                            <div className="col-6">
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="DirectorName1"
                                name="DirectorName1"
                                placeholder="Director Name 1"
                              />
                              <ErrorMessage
                                name="DirectorName1"
                                component="div"
                                className="text-danger fw-bold"
                              />
                            </div>
                          </div>
                        )}

                        {values.NumberofDirectors >= 2 && (
                          <div className="row mb-3">
                            <div className="col-6">
                              <label
                                htmlFor="DirectorName2"
                                className="form-label"
                              >
                                Director Name 2
                              </label>
                            </div>
                            <div className="col-6">
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="DirectorName2"
                                name="DirectorName2"
                                placeholder="Director Name 2"
                              />
                              <ErrorMessage
                                name="DirectorName2"
                                component="div"
                                className="text-danger fw-bold"
                              />
                            </div>
                          </div>
                        )}

                        {values.NumberofDirectors >= 3 && (
                          <div className="row mb-3">
                            <div className="col-6">
                              <label
                                htmlFor="DirectorName3"
                                className="form-label"
                              >
                                Director Name 3
                              </label>
                            </div>
                            <div className="col-6">
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="DirectorName3"
                                name="DirectorName3"
                                placeholder="Director Name 3"
                              />
                              <ErrorMessage
                                name="DirectorName3"
                                component="div"
                                className="text-danger fw-bold"
                              />
                            </div>
                          </div>
                        )}
                        {values.NumberofDirectors >= 4 && (
                          <div className="row mb-3">
                            <div className="col-6">
                              <label
                                htmlFor="DirectorName4"
                                className="form-label"
                              >
                                Director Name 4
                              </label>
                            </div>
                            <div className="col-6">
                              <Field
                                type="text"
                                className="form-control shadow inputDesign"
                                id="DirectorName4"
                                name="DirectorName4"
                                placeholder="Director Name 4"
                              />
                              <ErrorMessage
                                name="DirectorName4"
                                component="div"
                                className="text-danger fw-bold"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {CRObject.InvestmentTrust == "No" && (
                      <div className="row">
                        <div className="col-md-12 text-center">
                          <p>
                            Nothing to add here you can press{" "}
                            <NavLink
                              to="/Personal-Insurance"
                              style={{ color: "#36B446" }}
                            >
                              <b>next button</b>
                            </NavLink>
                          </p>
                        </div>
                      </div>
                    )}
                    {CRObject.InvestmentTrust == "No" && (
                      <div className="row mt-2 mb-3">
                        <div className="col-md-12">
                          <button
                            type="submit"
                            className="float-end btn w-25  bgColor modalBtn"
                          >
                            Next
                          </button>

                          <button
                            className="float-end btn w-25  btn-outline  backBtn mx-3"
                            onClick={BackFunction}
                          >
                            Back
                          </button>
                        </div>
                      </div>
                    )}
                  </Card>

                  {/* bank accounts */}
                  {CRObject.InvestmentTrust == "Yes" && (
                    <Card className="shadow py-4 px-4 my-5">
                      <h3 className="text-center">Bank Accounts</h3>
                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label">
                            Please enter the bank account details
                          </label>
                          <br />

                          <span
                            className=" btn h-50 w-50
                            btn-outline-success "
                            onClick={handleShow}
                          >
                            <div className="iconContainer mx-1">
                              <img className="img-fluid" src={plus} alt="" />
                            </div>
                            Enter Details
                          </span>
                        </div>
                      </div>
                      {/* -------------bank accounts modal---------------------------- */}

                      <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        className="modal-lg"
                        keyboard={false}
                      >
                        <Modal.Header
                          className="text-light modalBG "
                          closeButton
                        >
                          <Modal.Title className="fontStyle">
                            Add Bank Account Details
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
                            isEdit_bankAccountList
                              ? bankAccountList[0]
                              : Bank_initialValues
                          }
                          validationSchema={Bank_validationSchema}
                          onSubmit={Bank_onSubmit}
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
                                {/* bank sccounts */}

                                <div className="">
                                  {/* Bank 1 */}
                                  <div className=" ">
                                    <h3 className=""> Bank #1 </h3>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="CurrentValue1"
                                          className="form-label"
                                        >
                                          Current Value
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
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
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="FinancialInstitution1"
                                          className="form-label"
                                        >
                                          Financial Instituion
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          type="text"
                                          className="form-control shadow inputDesign"
                                          id="FinancialInstitution1"
                                          name="FinancialInstitution1"
                                          placeholder="Financial Instituion"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="FinancialInstitution1"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="IncomeYield1"
                                          className="form-label"
                                        >
                                          Income Yield (%)
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="IncomeYield1"
                                          name="IncomeYield1"
                                          placeholder="IncomeYield"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="IncomeYield1"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="AnnualIncome1"
                                          className="form-label"
                                        >
                                          Annual Income
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="AnnualIncome1"
                                          name="AnnualIncome1"
                                          placeholder="Annual Income"
                                          readOnly={true}
                                          value={
                                            values.CurrentValue1 *
                                            values.IncomeYield1
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  {/* Bank 1 */}
                                </div>
                                {/* bank accounts */}
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
                                    onClick={handleClose}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </Modal.Footer>
                            </Form>
                          )}
                        </Formik>
                      </Modal>
                      {/* -------------bank accounts modal---------------------------- */}
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
                            {bankAccountList.map((elem, index) => {
                              //bank one
                              if (elem.FinancialInstitution1) {
                                return (
                                  <tr key={index}>
                                    <td>{elem.CurrentValue1}</td>
                                    <td>{elem.FinancialInstitution1}</td>
                                    <td>{elem.IncomeYield1}</td>
                                    <td>{elem.AnnualIncome1}</td>
                                    <td>
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          deleteHandler_Bank1(elem)
                                        }
                                        className="btn btn-danger btn-sm"
                                      >
                                        delete
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          set_isEdit_BankAccountList(true);
                                          handleShow();
                                        }}
                                        className="btn btn-warning btn-sm mx-2"
                                      >
                                        update
                                      </button>
                                    </td>
                                  </tr>
                                );
                              }
                            })}

                            {bankAccountList.map((elem, index) => {
                              //bank two
                              if (elem.FinancialInstitution2) {
                                return (
                                  <tr key={index}>
                                    <td>{elem.CurrentValue2}</td>
                                    <td>{elem.FinancialInstitution2}</td>
                                    <td>{elem.IncomeYield2}</td>
                                    <td>{elem.AnnualIncome2}</td>
                                    <td>
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          deleteHandler_Bank2(elem)
                                        }
                                        className="btn btn-danger btn-sm"
                                      >
                                        delete
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          set_isEdit_BankAccountList(true);
                                          handleShow();
                                        }}
                                        className="btn btn-warning btn-sm mx-2"
                                      >
                                        update
                                      </button>
                                    </td>
                                  </tr>
                                );
                              }
                            })}

                            {bankAccountList.map((elem, index) => {
                              //bank two
                              if (elem.FinancialInstitution3) {
                                return (
                                  <tr key={index}>
                                    <td>{elem.CurrentValue3}</td>
                                    <td>{elem.FinancialInstitution3}</td>
                                    <td>{elem.IncomeYield3}</td>
                                    <td>{elem.AnnualIncome3}</td>
                                    <td>
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          deleteHandler_Bank3(elem)
                                        }
                                        className="btn btn-danger btn-sm"
                                      >
                                        delete
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          set_isEdit_BankAccountList(true);
                                          handleShow();
                                        }}
                                        className="btn btn-warning btn-sm mx-2"
                                      >
                                        update
                                      </button>
                                    </td>
                                  </tr>
                                );
                              }
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* bankTable */}
                    </Card>
                  )}

                  {/* bank accounts */}

                  {/* term deposit */}
                  {CRObject.ITTermSharesManaged == "Yes" && (
                    <Card className="shadow py-4 px-4 my-5">
                      <h3 className="text-center">Term Deposit</h3>
                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label">
                            Please Enter Term Deposit Detail
                          </label>
                          <br />

                          <span
                            className=" btn h-50 w-50
                            btn-outline-success "
                            onClick={handleShow2}
                          >
                            <div className="iconContainer mx-1">
                              <img className="img-fluid" src={plus} alt="" />
                            </div>
                            Enter Details
                          </span>
                        </div>
                      </div>
                      {/* -------------Deposit modal---------------------------- */}

                      <Modal
                        show={show2}
                        onHide={handleClose2}
                        backdrop="static"
                        className="modal-lg"
                        keyboard={false}
                      >
                        <Modal.Header
                          className="text-light modalBG "
                          closeButton
                        >
                          <Modal.Title className="fontStyle">
                            Add Term Deposit Details
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
                            isEdit_deposit
                              ? deposit_InitialValue2[0]
                              : Deposit_initialValues
                          }
                          validationSchema={Deposit_validationSchema}
                          onSubmit={Deposit_onSubmit}
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
                                {/* Deposit accounts */}

                                <div className="">
                                  {/* Deposit 1 */}
                                  <div className=" ">
                                    <h3 className=""> Deposit #1 </h3>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="DepositCurrentValue1"
                                          className="form-label"
                                        >
                                          Current Value
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="DepositCurrentValue1"
                                          name="DepositCurrentValue1"
                                          placeholder="Current Value"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="DepositCurrentValue1"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="DepositFinancialInstitution1"
                                          className="form-label"
                                        >
                                          Financial Instituion
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          type="text"
                                          className="form-control shadow inputDesign"
                                          id="DepositFinancialInstitution1"
                                          name="DepositFinancialInstitution1"
                                          placeholder="Financial Instituion"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="DepositFinancialInstitution1"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="DepositIncomeYield1"
                                          className="form-label"
                                        >
                                          Income Yield (%)
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="DepositIncomeYield1"
                                          name="DepositIncomeYield1"
                                          placeholder="IncomeYield"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="DepositIncomeYield1"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="DepositAnnualIncome1"
                                          className="form-label"
                                        >
                                          Annual Income
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="DepositAnnualIncome1"
                                          name="DepositAnnualIncome1"
                                          placeholder="Annual Income"
                                          readOnly={true}
                                          value={
                                            values.DepositCurrentValue1 *
                                            values.DepositIncomeYield1
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  {/* Deposit 1 */}
                                </div>
                                {/* Deposit */}
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
                                    onClick={handleClose2}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </Modal.Footer>
                            </Form>
                          )}
                        </Formik>
                      </Modal>
                      {/* -------------Deposit modal---------------------------- */}

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
                            {depositList.map((elem, index) => {
                              if (elem.FinancialInstitution1) {
                                return (
                                  <tr key={index}>
                                    <td>{elem.CurrentValue1}</td>
                                    <td>{elem.FinancialInstitution1}</td>
                                    <td>{elem.IncomeYield1}</td>
                                    <td>{elem.AnnualIncome1}</td>
                                    <td>
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          deleteHandler_Deposit1(elem, index)
                                        }
                                        className="btn btn-danger btn-sm"
                                      >
                                        delete
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          UpdateHandler_Deposit(elem)
                                        }
                                        className="btn btn-warning btn-sm mx-2"
                                      >
                                        update
                                      </button>
                                    </td>
                                  </tr>
                                );
                              }
                            })}

                            {depositList.map((elem, index) => {
                              if (elem.FinancialInstitution2) {
                                return (
                                  <tr key={index}>
                                    <td>{elem.CurrentValue2}</td>
                                    <td>{elem.FinancialInstitution2}</td>
                                    <td>{elem.IncomeYield2}</td>
                                    <td>{elem.AnnualIncome2}</td>
                                    <td>
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          deleteHandler_Deposit2(elem, index)
                                        }
                                        className="btn btn-danger btn-sm"
                                      >
                                        delete
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          UpdateHandler_Deposit(elem);
                                        }}
                                        className="btn btn-warning btn-sm mx-2"
                                      >
                                        update
                                      </button>
                                    </td>
                                  </tr>
                                );
                              }
                            })}

                            {depositList.map((elem, index) => {
                              if (elem.FinancialInstitution3) {
                                return (
                                  <tr key={index}>
                                    <td>{elem.CurrentValue3}</td>
                                    <td>{elem.FinancialInstitution3}</td>
                                    <td>{elem.IncomeYield3}</td>
                                    <td>{elem.AnnualIncome3}</td>
                                    <td>
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          deleteHandler_Deposit3(elem, index)
                                        }
                                        className="btn btn-danger btn-sm"
                                      >
                                        delete
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          UpdateHandler_Deposit(elem);
                                        }}
                                        className="btn btn-warning btn-sm mx-2"
                                      >
                                        update
                                      </button>
                                    </td>
                                  </tr>
                                );
                              }
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* TermTable */}
                    </Card>
                  )}
                  {/* term deposit */}

                  {/* Australian Share Market modal */}
                  {CRObject.ITTermSharesManaged == "Yes" && (
                    <Card className="shadow py-4 px-4 my-5">
                      <h3 className="text-center">Australian Share Market</h3>
                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label">
                            Please enter the details
                          </label>
                          <br />

                          <span
                            className=" btn h-50 w-50
                            btn-outline-success "
                            onClick={handleShow3}
                          >
                            <div className="iconContainer mx-1">
                              <img className="img-fluid" src={plus} alt="" />
                            </div>
                            Enter Details
                          </span>
                        </div>
                      </div>
                      {/* Australian Share Market modal */}

                      <Modal
                      show={show3}
                      onHide={handleClose3}
                      backdrop="static"
                      className="modal-lg"
                      keyboard={false}
                    >
                      <Modal.Header className="text-light modalBG " closeButton>
                        <Modal.Title className="fontStyle">
                          Add Share Details
                          <div className="iconContainerLg">
                            <img className="img-fluid" src={notebook} alt="" />
                          </div>
                        </Modal.Title>
                      </Modal.Header>
                      <Formik
                        initialValues={
                          is_Share ? Share_initialValues2 : Share_initialValues
                        }
                        validationSchema={Share_validationSchema}
                        onSubmit={Share_onSubmit}
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
                                        htmlFor="ShareInvestmentName"
                                        className="form-label"
                                        >
                                        Investment Name
                                      </label>
                                        </div>

                                  <div className="col-6">
                                      <Field
                                        type="text"
                                        className="form-control shadow inputDesign"
                                        id="ShareInvestmentName"
                                        name="ShareInvestmentName"
                                        placeholder="Investment Name"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="ShareInvestmentName"
                                      />
                                  </div>
                                  </div>

                                <div className="row mb-3">

                                    <div className="col-6">
                                      <label
                                        htmlFor="NoOfShares"
                                        className="form-label"
                                      >
                                        No of Shares
                                      </label>
                                    </div>
                                      <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="NoOfShares"
                                        name="NoOfShares"
                                        placeholder="No of Shares"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="NoOfShares"
                                      />
                                  </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="CurrentSharePrice"
                                        className="form-label"
                                      >
                                        Current Share Price
                                      </label>
                                    </div>
                                  <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="CurrentSharePrice"
                                        name="CurrentSharePrice"
                                        placeholder="Current Share Price"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="CurrentSharePrice"
                                      />
                                  </div>
                                  </div>
                                  <div className="row mb-3">

                                    <div className="col-6">
                                      <label htmlFor="" className="form-label">
                                        Total Share Value
                                      </label>
                                        </div>
                                      <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="TotalShareValue"
                                        name="TotalShareValue"
                                        placeholder="Total Share Value"
                                        readOnly={true}
                                        value={values.NoOfShares* values.CurrentSharePrice}

                                      />
                                  </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="CostBase"
                                        className="form-label"
                                      >
                                        Cost Base
                                      </label>
                                      </div>
                                  <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="CostBase"
                                        name="CostBase"
                                        placeholder="Cost Base"
                                      />
                                      <ErrorMessage
                                        name="CostBase"
                                        component="div"
                                        className="text-danger fw-bold"
                                      />
                                  </div>
                                  </div>
                                  <div className="row mb-3">

                                  {/* datepicker */}
                                    <div className="col-6">
                                      <label
                                        htmlFor="PurchaseDate"
                                        className="form-label"
                                      >
                                        Purchase Date
                                      </label>
                                      </div>
                                  <div className="col-6">
                                      <div>
                                        <DatePicker
                                          className="form-control inputDesign shadow"
                                          showIcon
                                          id="PurchaseDate"
                                          name="PurchaseDate"
                                          selected={values.PurchaseDate}
                                          onChange={(date) =>
                                            setFieldValue("PurchaseDate", date)
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
                                        className="text-danger fw-bold"
                                        component="div"
                                        name="PurchaseDate"
                                      />
                                  </div>
                                </div>

                                <div className="row mb-3">
                                <div className="col-6">
                                          <label
                                            htmlFor="Incomepa"
                                            className="form-label"
                                          >
                                            Income pa
                                          </label>
                                          </div>

                                  <div className="col-6">
                                    <div className="row">
                                      <div className="col-7">
                                        
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="Incomepa"
                                            name="Incomepa"
                                            placeholder="Income pa"
                                          />
                                          <ErrorMessage
                                            name="Incomepa"
                                            component="div"
                                            className="text-danger fw-bold"
                                          />
                                      </div>
                                      <div className="col-5">
                                     
                                          <Field
                                            as="select"
                                            id="IncomepaType"
                                            className="form-select shadow  inputDesign"
                                            name="IncomepaType"
                                          >
                                            <option value="">Select</option>
                                            <option value="dollar">$</option>
                                            <option value="percentage">
                                              %
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            className="text-danger fw-bold"
                                            component="div"
                                            name="IncomepaType"
                                          />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                  <div className="row mb-3">

                                    <div className="col-6">
                                      <label htmlFor="" className="form-label">
                                        Total Income pa
                                      </label>
                                    </div>
                                      <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="TotalIncomePa"
                                        name="TotalIncomePa"
                                        readOnly={true}
                                        value={ values.IncomepaType==""? 0 : values.IncomepaType=="dollar"? 
                                        (parseFloat(values.Incomepa)||0) : 
                                        (parseFloat((((parseFloat(values.Incomepa)||0)/100) * (values.NoOfShares * values.CurrentSharePrice)
                                        ))
                                        ) 
                                       }
                                      />
                                  </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="FrankedAmount"
                                        className="form-label" 
                                      >
                                        Franked Amount %
                                      </label>
                                    </div>

                                  <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="FrankedAmount"
                                        name="FrankedAmount"
                                        placeholder="Franked Amount"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="FrankedAmount"
                                      />
                                  </div>
                                  </div>

                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="RegInvestmentsPA"
                                        className="form-label"
                                      >
                                        Reg Investments pa
                                      </label>
                                  </div>

                                  <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="RegInvestmentsPA"
                                        name="RegInvestmentsPA"
                                        placeholder="Reg Investments"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="RegInvestmentsPA"
                                      />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label className="form-label">
                                        Reinvest income
                                      </label>
                                      </div>
                                  <div className="col-6">
                                      <div className="form-check form-switch m-0 p-0 ">
                                        <div className="radiobutton">
                                          <input
                                            type="radio"
                                            name="Reinvestincomeradio"
                                            className="form-check-input"
                                            id="Reinvestincomeopt1"
                                            value="Yes"
                                            onChange={handleChange}
                                            checked={
                                              values.Reinvestincomeradio ===
                                              "Yes"
                                            }
                                          />
                                          <label
                                            htmlFor="Reinvestincomeopt1"
                                            className="label1"
                                          >
                                            <span>YES</span>
                                          </label>
                                          <input
                                            type="radio"
                                            name="Reinvestincomeradio"
                                            id="Reinvestincomeopt2"
                                            className="form-check-input"
                                            value="No"
                                            onChange={handleChange}
                                            checked={
                                              values.Reinvestincomeradio ===
                                              "No"
                                            }
                                          />
                                          <label
                                            htmlFor="Reinvestincomeopt2"
                                            className="label2"
                                          >
                                            <span>NO</span>
                                          </label>
                                        </div>
                                      </div>
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
                                type='button'
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

                      {/* Australian Share Market modal */}

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
                                        updateHandler_AustralianShare(
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

                      {/* Australian Table */}

                      {/* Aus loans portfolio associated */}

                      {CRObject.ITInvestmentLoans == "Yes" && (
                        <div className=" my-5">
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
                                        values.loansAssociatedradio === "Yes"
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
                                        values.loansAssociatedradio === "No"
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
                                is_Loan
                                  ? loan_initialValues2[0]
                                  : Australian_loansAssociated_initialValues
                              }
                              validationSchema={
                                Australian_loansAssociated_validationSchema
                              }
                              onSubmit={Australian_loansAssociated_onSubmit}
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
                                              htmlFor="AustralianPortfolioLoanType"
                                              className="form-label"
                                            >
                                              Type of loan aus loan
                                            </label>
                                          </div>
                                        <div className="col-6">
                                            <Field
                                              as="select"
                                              id="AustralianPortfolioLoanType"
                                              className="form-select shadow  inputDesign"
                                              name="AustralianPortfolioLoanType"
                                            >
                                              <option value="">Select</option>
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
                                        <div className="row mb-3">

                                          <div className="col-6">
                                            <label
                                              htmlFor="AustralianPortfolioCurrentBalance"
                                              className="form-label"
                                            >
                                              Current Balance
                                            </label>
                                          </div>

                                        <div className="col-6">
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

                                      <div className="row mb-3">
                                          <div className="col-6">
                                            <label
                                              htmlFor="AustralianPortfolioLender"
                                              className="form-label"
                                            >
                                              Lender
                                            </label>
                                        </div>

                                        <div className="col-6">
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

                                      <div className="row mb-3">

                                          <div className="col-6">
                                            <label
                                              htmlFor="AustralianPortfolioRepaymentAmount"
                                              className="form-label"
                                            >
                                              Repayments Amount
                                            </label>
                                        </div>

                                        <div className="col-6">
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

                                      <div className="row mb-3">
                                          <div className="col-6">
                                            <label
                                              htmlFor="AustralianPortfolioFrequency"
                                              className="form-label"
                                            >
                                              Frequency
                                            </label>
                                        </div>

                                        <div className="col-6">
                                            <Field
                                              as="select"
                                              id="AustralianPortfolioFrequency"
                                              className="form-select shadow  inputDesign"
                                              name="AustralianPortfolioFrequency"
                                            >
                                              <option value="">Select</option>
                                              <option value={52}>
                                                Weekly
                                              </option>
                                              <option value={26}>
                                                Fortnightly
                                              </option>
                                              <option value={12}>
                                                Monthly
                                              </option>
                                              <option value={1}>
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
                                              id="AustralianPortfolioAnnualRepayment"
                                              name="AustralianPortfolioAnnualRepayment"
                                              placeholder="Annual Repayments"
                                              readOnly={true}
                                              value={values.AustralianPortfolioFrequency * values.AustralianPortfolioRepaymentAmount }
                                            />
                                          </div>
                                      </div>

                                      <div className="row mb-3">
                                          <div className="col-6">
                                            <label
                                              htmlFor="AustralianInterestRatePA"
                                              className="form-label"
                                            >
                                              Interest Rate (p.a)
                                            </label>
                                        </div>

                                        <div className="col-6">
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
                                      <div className="row mb-3">

                                          <div className="col-6">
                                            <label
                                              htmlFor="AustralianPortfolioLoanTerm"
                                              className="form-label"
                                            >
                                              Loan Term (1-30 Years)
                                            </label>
                                        </div>

                                        <div className="col-6">
                                            <Field
                                              as="select"
                                              id="AustralianPortfolioLoanTerm"
                                              className="form-select shadow  inputDesign"
                                              name="AustralianPortfolioLoanTerm"
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
                                              name="AustralianPortfolioLoanTerm"
                                            />
                                          </div>
                                      </div>

                                      <div className="row mb-3">
                                          <div className="col-6">
                                            <label
                                              htmlFor="AustralianPortfolioLoanType2"
                                              className="form-label"
                                            >
                                              Loan Type
                                            </label>
                                        </div>

                                        <div className="col-6">
                                            <Field
                                              as="select"
                                              id="AustralianPortfolioLoanType2"
                                              className="form-select shadow  inputDesign"
                                              name="AustralianPortfolioLoanType2"
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
                                              name="AustralianPortfolioLoanType2"
                                            />
                                          </div>
                                        </div>

                                      <div className="row mb-3">

                                          <div className="col-6">
                                            <label
                                              htmlFor="AustralianPortfolioDeductibleLoanAmount"
                                              className="form-label"
                                            >
                                              Deductible Amount of Loan (%)
                                            </label>
                                        </div>

                                        <div className="col-6">
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

                                      <div className="row mb-3">
                                          <div className="col-6">
                                            <label
                                              htmlFor="AustralianPortfolioYearRemaining"
                                              className="form-label"
                                            >
                                              Year Remaning (1-30 Years)
                                            </label>
                                        </div>

                                        <div className="col-6">
                                            <Field
                                              as="select"
                                              id="AustralianPortfolioYearRemaining"
                                              className="form-select shadow  inputDesign"
                                              name="AustralianPortfolioYearRemaining"
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
                                      type='button'
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
                                {AustralianLoanList.map((elem, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>
                                        {elem.AustralianPortfolioLoanType}
                                      </td>
                                      <td>
                                        {elem.AustralianPortfolioCurrentBalance}
                                      </td>
                                      <td>{elem.AustralianPortfolioLender}</td>
                                      <td>
                                        {
                                          elem.AustralianPortfolioRepaymentAmount
                                        }
                                      </td>
                                      <td>{elem.AustralianInterestRatePA}</td>
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

                          {/* Australian TableLoan */}
                        </div>
                      )}
                      {/*  Aus loans portfolio associated */}
                    </Card>
                  )}
                  {/* Australian Share Market */}

                  {/*Manage Funds */}
                  {CRObject.ITTermSharesManaged == "Yes" && (
                    <Card className="shadow py-4 px-4 my-5">
                      <h3 className="text-center">Managed Funds</h3>
                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label">
                            Please enter the details
                          </label>
                          <br />

                          <span
                            className=" btn h-50 w-50
                            btn-outline-success "
                            onClick={handleShow5}
                          >
                            <div className="iconContainer mx-1">
                              <img className="img-fluid" src={plus} alt="" />
                            </div>
                            Enter Details
                          </span>
                        </div>
                      </div>
                      {/* manage Funds modal */}

                      <Modal
                        show={show5}
                        onHide={handleClose5}
                        backdrop="static"
                        className="modal-lg"
                        keyboard={false}
                      >
                        <Modal.Header
                          className="text-light modalBG "
                          closeButton
                        >
                          <Modal.Title className="fontStyle">
                            Add Managed Fund Details
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
                            is_manageFund
                              ? manageFund_initialValues2[0]
                              : manageFund_initialValues
                          }
                          validationSchema={manageFund_validationSchema}
                          onSubmit={manageFund_onSubmit}
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
                                        htmlFor="PlatformName"
                                        className="form-label"
                                      >
                                        Platform Name
                                      </label>
                                    </div>
                                    <div className="col-6 mb-3">
                                      <Field
                                        as="select"
                                        id="PlatformName"
                                        className="form-select shadow  inputDesign"
                                        name="PlatformName"
                                      >
                                        <option value="">Platform Name</option>
                                        <option value="NorthInvestmentsChoice">
                                          AMP My North Investments -Choice
                                        </option>
                                        <option value="NorthInvestmentsCore">
                                          AMP My North Investments -Core
                                        </option>
                                        <option value="NorthInvestmentsSelect">
                                          AMP My North Investments -Select
                                        </option>
                                        <option value="FristchoiceWholesaleInvestments">
                                          Colonial First State - Fristchoice
                                          Wholesale Investments
                                        </option>
                                        <option value="DirectManagedFunds">
                                          Direct Managed Funds{" "}
                                        </option>
                                        <option value="ExchangeTradedFundsETF">
                                          Exchange-Traded Funds (ETF’s)
                                        </option>
                                      </Field>
                                      <ErrorMessage
                                        className="text-danger fw-bold"
                                        component="div"
                                        name="PlatformName"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-6 mb-3">
                                      <label
                                        htmlFor="InvestmentName"
                                        className="form-label"
                                      >
                                        Investment Name
                                      </label>
                                    </div>
                                    <div className="col-6 mb-3">
                                      <Field
                                        type="text"
                                        className="form-control shadow inputDesign"
                                        id="InvestmentName"
                                        name="InvestmentName"
                                        placeholder="Investment Name"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="InvestmentName"
                                      />
                                    </div>
                                  </div>

                                  <div className="row">
                                    <div className="col-6 mb-3">
                                      <label
                                        htmlFor="NoOfUnitsShares"
                                        className="form-label"
                                      >
                                        No of Units/Shares
                                      </label>
                                    </div>
                                    <div className="col-6 mb-3">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="NoOfUnitsShares"
                                        name="NoOfUnitsShares"
                                        placeholder="No of Units/Shares"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="NoOfUnitsShares"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-6 mb-3">
                                      <label
                                        htmlFor="CurrentShareUnitPrice"
                                        className="form-label"
                                      >
                                        Current share/Unit Price
                                      </label>
                                    </div>
                                    <div className="col-6 mb-3 ">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="CurrentShareUnitPrice"
                                        name="CurrentShareUnitPrice"
                                        placeholder="Current share/Unit Price"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="CurrentShareUnitPrice"
                                      />
                                    </div>
                                  </div>

                                  <div className="row">
                                    <div className="col-6 mb-3">
                                      <label htmlFor="" className="form-label">
                                        Current Value
                                      </label>
                                    </div>
                                    <div className="col-6 mb-3">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="managedCurrentValue"
                                        name="managedCurrentValue"
                                        placeholder="Current Value"
                                        readOnly={true}
                                        value={
                                          values.NoOfUnitsShares *
                                          values.CurrentShareUnitPrice
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-6 mb-3">
                                      <label
                                        htmlFor="OriginalInvestment"
                                        className="form-label"
                                      >
                                        Original Investment
                                      </label>
                                    </div>
                                    <div className="col-6 mb-3">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="OriginalInvestment"
                                        name="OriginalInvestment"
                                        placeholder="Original Investment"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="OriginalInvestment"
                                      />
                                    </div>
                                  </div>

                                  <div className="row">
                                    {/* datepicker */}
                                    <div className="col-6 mb-3">
                                      <label
                                        htmlFor="managedPurchaseDate"
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
                                          id="managedPurchaseDate"
                                          name="managedPurchaseDate"
                                          selected={values.managedPurchaseDate}
                                          onChange={(date) =>
                                            setFieldValue(
                                              "managedPurchaseDate",
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
                                        className="text-danger fw-bold"
                                        component="div"
                                        name="managedPurchaseDate"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-6 mb-3">
                                      <label
                                        htmlFor="managedIncomepa"
                                        className="form-label"
                                      >
                                        Income pa
                                      </label>
                                    </div>
                                    <div className="col-6 mb-3">
                                      <div className="row">
                                        <div className="col-md-7">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="managedIncomepa"
                                            name="managedIncomepa"
                                            placeholder="Income pa"
                                          />
                                          <ErrorMessage
                                            name="managedIncomepa"
                                            component="div"
                                            className="text-danger fw-bold"
                                          />
                                        </div>
                                        <div className="col-md-5">
                                          <div className="mb-3">
                                            <Field
                                              as="select"
                                              id="managedIncomepaType"
                                              className="form-select shadow  inputDesign"
                                              name="managedIncomepaType"
                                            >
                                              <option value="">Select</option>
                                              <option value="dollar">$</option>
                                              <option value="percentage">
                                                %
                                              </option>
                                            </Field>
                                            <ErrorMessage
                                              className="text-danger fw-bold"
                                              component="div"
                                              name="managedIncomepaType"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="row">
                                    <div className="col-6 mb-3">
                                      <label htmlFor="" className="form-label">
                                        Total Income pa
                                      </label>
                                    </div>
                                    <div className="col-6 mb-3">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="managedTotalIncomePA"
                                        name="managedTotalIncomePA"
                                        placeholder="Total Income pa"
                                        readOnly={true}
                                        // arham
                                        value={
                                          values.managedIncomepaType == ""
                                            ? 0
                                            : values.managedIncomepaType ==
                                              "dollar"
                                            ? parseFloat(
                                                values.managedIncomepa
                                              ) || 0
                                            : parseFloat(
                                                ((parseFloat(
                                                  values.managedIncomepa
                                                ) || 0) /
                                                  100) *
                                                  (values.NoOfUnitsShares *
                                                    values.CurrentShareUnitPrice)
                                              )
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-6 mb-3">
                                      <label
                                        htmlFor="managedRegInvestmentsPA"
                                        className="form-label"
                                      >
                                        Reg Investments pa
                                      </label>
                                    </div>
                                    <div className="col-6 mb-3">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="managedRegInvestmentsPA"
                                        name="managedRegInvestmentsPA"
                                        placeholder="Reg Investments"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="managedRegInvestmentsPA"
                                      />
                                    </div>
                                  </div>

                                  <div className="row">
                                    <div className="col-6 mb-3">
                                      <label className="form-label">
                                        Reinvest income
                                      </label>
                                    </div>
                                    <div className="col-6 mb-3">
                                      <div className="form-check form-switch m-0 p-0 ">
                                        <div className="radiobutton">
                                          <input
                                            type="radio"
                                            name="managedReinvestincomeradio"
                                            className="form-check-input"
                                            id="Reinvestincomeopt1"
                                            value="Yes"
                                            onChange={handleChange}
                                            checked={
                                              values.managedReinvestincomeradio ===
                                              "Yes"
                                            }
                                          />
                                          <label
                                            htmlFor="Reinvestincomeopt1"
                                            className="label1"
                                          >
                                            <span>YES</span>
                                          </label>
                                          <input
                                            type="radio"
                                            name="managedReinvestincomeradio"
                                            id="Reinvestincomeopt2"
                                            className="form-check-input"
                                            value="No"
                                            onChange={handleChange}
                                            checked={
                                              values.managedReinvestincomeradio ===
                                              "No"
                                            }
                                          />
                                          <label
                                            htmlFor="Reinvestincomeopt2"
                                            className="label2"
                                          >
                                            <span>NO</span>
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* managed details */}
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
                                    onClick={handleClose5}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </Modal.Footer>
                            </Form>
                          )}
                        </Formik>
                      </Modal>
                      {/* managed modal */}

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
                                        deleteHandler_ManageFund(elem, index)
                                      }
                                      className="btn btn-danger btn-sm"
                                    >
                                      delete
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) =>
                                        updateHandler_ManageFund(elem, index)
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

                      {/*managed  loans associated */}

                      {CRObject.ITInvestmentLoans == "Yes" && (
                        <div className=" my-5">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label">
                                  Do you managed funds have any loan associated
                                  with them?
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
                          initialValues={is_manageLoan ? manageloan_initialValues2[0] :managed_initialValues}
                          validationSchema={managed_validationSchema}
                          onSubmit={managed_onSubmit}
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
                                          Type of loan Manage loan
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
                                          <option value={52}>
                                            {" "}
                                            Weekly
                                          </option>
                                          <option value={26}>
                                            Fortnightly
                                          </option>
                                          <option value={12}>
                                            Monthly
                                          </option>
                                          <option value={1}>
                                            Annually
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
                                          Annual Repayments manage
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="managedAnnualRepayments"
                                          name="managedAnnualRepayments"
                                          placeholder="Annual Repayments"
                                          readOnly={true}
                                          value={values.RepaymentsAmount * values.Frequency}
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
                                  type='button'
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
                        </div>
                      )}
                      {/* Manage loans associated */}

                      {/* manageLoan Table */}

                      {CRObject.ITInvestmentLoans == "Yes" && (
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
                                      {elem.ManagedFundsPortfolioCurrentBalance}{" "}
                                    </td>
                                    <td>{elem.ManagedFundsPortfolioLender}</td>
                                    <td>
                                      {" "}
                                      {
                                        elem.ManagedFundsPortfolioRepaymentAmount
                                      }{" "}
                                    </td>
                                    <td>
                                      {elem.ManagedFundsPortfolioInterestRatePA}
                                    </td>
                                    <td>
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          deleteHandler_ManageLoan(elem, index)
                                        }
                                        className="btn btn-danger btn-sm mt-1"
                                      >
                                        delete
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          updateHandler_ManageLoan(elem, index)
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
                    </Card>
                  )}
                  {/*Manage Funds */}

                  {/* investment Properties */}
                  {CRObject.ITDirectProperty == "Yes" && (
                    <Card className="shadow py-4 px-4 my-5">
                      <h3 className="text-center">Investment properties</h3>
                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label">
                            Please Enter Details
                          </label>
                          <br />

                          <button
                            className=" btn
                            btn-outline-success "
                            type="button"
                            onClick={handleShow7}
                          >
                            <div className="iconContainer mx-1">
                              <img className="img-fluid" src={plus} alt="" />
                            </div>
                            Enter Details
                          </button>
                        </div>
                      </div>
                      {/* -------------investment Properties modal---------------------------- */}

                      <Modal
                        show={show7}
                        onHide={handleClose7}
                        backdrop="static"
                        className="modal-lg"
                        keyboard={false}
                      >
                        <Modal.Header
                          className="text-light modalBG "
                          closeButton
                        >
                          <Modal.Title className="fontStyle">
                            Investments Properties Details
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
                            is_investment
                              ? investment_initialValues2[0]
                              : Investment_initialValues
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
                                <div className="">
                                  <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="InvestmentCurrentValue"
                                        className="form-label"
                                      >
                                        Current Value
                                      </label>
                                    </div>
                                    <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="InvestmentCurrentValue"
                                        name="InvestmentCurrentValue"
                                        placeholder="Current Value"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="InvestmentCurrentValue"
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="InvestmentCostBasePurchasePrice"
                                        className="form-label"
                                      >
                                        Cost Base/(Purchase Price)
                                      </label>
                                    </div>
                                    <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="InvestmentCostBasePurchasePrice"
                                        name="InvestmentCostBasePurchasePrice"
                                        placeholder="Cost Base/(Purchase Price)"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="InvestmentCostBasePurchasePrice"
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="InvestmentPropertyAddress"
                                        className="form-label"
                                      >
                                        Property Address
                                      </label>
                                    </div>
                                    <div className="col-6">
                                      <Field
                                        type="text"
                                        className="form-control shadow inputDesign"
                                        id="InvestmentPropertyAddress"
                                        name="InvestmentPropertyAddress"
                                        placeholder="Property Address"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="InvestmentPropertyAddress"
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="investmentPostcodeSuburb"
                                        className="form-label"
                                      >
                                        Postcode/Suburb
                                      </label>
                                    </div>
                                    <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="investmentPostcodeSuburb"
                                        name="investmentPostcodeSuburb"
                                        placeholder="Postcode/Suburb"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="investmentPostcodeSuburb"
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="InvestmentRentalIncome"
                                        className="form-label"
                                      >
                                        Rental Income
                                      </label>
                                    </div>
                                    <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="InvestmentRentalIncome"
                                        name="InvestmentRentalIncome"
                                        placeholder="Rental Income"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="InvestmentRentalIncome"
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="InvestmentFrequency"
                                        className="form-label"
                                      >
                                        Frequency
                                      </label>
                                    </div>
                                    <div className="col-6">
                                      <Field
                                        as="select"
                                        id="InvestmentFrequency"
                                        className="form-select shadow  inputDesign"
                                        name="InvestmentFrequency"
                                      >
                                        <option value="">Select</option>
                                        <option value={52}>Weekly</option>
                                      </Field>
                                      <ErrorMessage
                                        className="text-danger fw-bold"
                                        component="div"
                                        name="InvestmentFrequency"
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="InvestmentTotalAnnualIncome"
                                        className="form-label"
                                      >
                                        Total Annual Income trust
                                      </label>
                                    </div>
                                    <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="InvestmentTotalAnnualIncome"
                                        name="InvestmentTotalAnnualIncome"
                                        placeholder="Total Annual Income"
                                        readOnly={true}
                                        value={
                                          values.InvestmentRentalIncome *
                                          values.InvestmentFrequency
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-6">
                                      <label className="form-label">
                                        Please Enter Term Deposit Detail
                                      </label>
                                    </div>
                                    <div className="col-6">
                                      <button
                                        type="button"
                                        className="btn btn-outline-success "
                                        onClick={handleShow8}
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

                                  <div className="row mb-3">
                                    <div className="col-6">
                                      <label className="form-label">
                                        Does this property have a loan attached
                                        to it?
                                      </label>
                                    </div>
                                    <div className="col-6">
                                      <div className="radiobutton">
                                        <input
                                          type="radio"
                                          name="loanAttachedradio"
                                          className="form-check-input"
                                          id="loanAttachedopt1"
                                          value="Yes"
                                          onChange={handleChange}
                                          checked={
                                            values.loanAttachedradio === "Yes"
                                          }
                                        />
                                        <label
                                          htmlFor="loanAttachedopt1"
                                          className="label1"
                                        >
                                          <span>YES</span>
                                        </label>
                                        <input
                                          type="radio"
                                          name="loanAttachedradio"
                                          id="loanAttachedopt2"
                                          className="form-check-input"
                                          value="No"
                                          onChange={handleChange}
                                          checked={
                                            values.loanAttachedradio === "No"
                                          }
                                        />
                                        <label
                                          htmlFor="loanAttachedopt2"
                                          className="label2"
                                        >
                                          <span>NO</span>
                                        </label>
                                      </div>
                                    </div>
                                  </div>

                                  {/*Investment ModalAdded */}

                                  {values.loanAttachedradio === "Yes" && (
                                    <div>
                                      <div className="row mb-3">
                                        <div className="col-6">
                                          <label
                                            htmlFor="InvestmentCurrentBalance"
                                            className="form-label"
                                          >
                                            Current Balance
                                          </label>
                                        </div>
                                        <div className="col-6">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="InvestmentCurrentBalance"
                                            name="InvestmentCurrentBalance"
                                            placeholder="Current Balance"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="InvestmentCurrentBalance"
                                          />
                                        </div>
                                      </div>

                                      <div className="row mb-3">
                                        <div className="col-6">
                                          <label
                                            htmlFor="InvestmentLender"
                                            className="form-label"
                                          >
                                            Lender
                                          </label>
                                        </div>
                                        <div className="col-6">
                                          <Field
                                            type="text"
                                            className="form-control shadow inputDesign"
                                            id="InvestmentLender"
                                            name="InvestmentLender"
                                            placeholder="Lender"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="InvestmentLender"
                                          />
                                        </div>
                                      </div>

                                      <div className="row mb-3">
                                        <div className="col-6">
                                          <label
                                            htmlFor="InvestmentRepaymentsAmount"
                                            className="form-label"
                                          >
                                            Repayments Amount
                                          </label>
                                        </div>
                                        <div className="col-6">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="InvestmentRepaymentsAmount"
                                            name="InvestmentRepaymentsAmount"
                                            placeholder="Repayments Amount"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="InvestmentRepaymentsAmount"
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-3">
                                        <div className="col-6">
                                          <label
                                            htmlFor="InvestmentFrequencyRadio"
                                            className="form-label"
                                          >
                                            Frequency
                                          </label>
                                        </div>
                                        <div className="col-6">
                                          <Field
                                            as="select"
                                            id="InvestmentFrequencyRadio"
                                            className="form-select shadow  inputDesign"
                                            name="InvestmentFrequencyRadio"
                                          >
                                            <option value="">Select</option>
                                            <option value={52}>Weekly</option>
                                            <option value={12}>Monthly</option>
                                          </Field>
                                          <ErrorMessage
                                            className="text-danger fw-bold"
                                            component="div"
                                            name="InvestmentFrequencyRadio"
                                          />
                                        </div>
                                      </div>

                                      <div className="row mb-3">
                                        <div className="col-6">
                                          <label
                                            htmlFor="InvestmentAnnualRepayments"
                                            className="form-label"
                                          >
                                            Annual Repayments
                                          </label>
                                        </div>
                                        <div className="col-6">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="InvestmentAnnualRepayments"
                                            name="InvestmentAnnualRepayments"
                                            placeholder="Annual Repayments"
                                            readOnly={true}
                                            value={
                                              values.InvestmentRepaymentsAmount *
                                              values.InvestmentFrequencyRadio
                                            }
                                          />
                                        </div>
                                      </div>

                                      <div className="row mb-3">
                                        <div className="col-6">
                                          <label
                                            htmlFor="InvestmentInterestRatePA"
                                            className="form-label"
                                          >
                                            Interest Rate (p.a)
                                          </label>
                                        </div>
                                        <div className="col-6">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="InvestmentInterestRatePA"
                                            name="InvestmentInterestRatePA"
                                            placeholder="Interest Rate (p.a)"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="InvestmentInterestRatePA"
                                          />
                                        </div>
                                      </div>

                                      <div className="row mb-3">
                                        <div className="col-6">
                                          <label
                                            htmlFor="InvestmentLoanTermInYear"
                                            className="form-label"
                                          >
                                            Loan Term (1-30 Years)
                                          </label>
                                        </div>
                                        <div className="col-6">
                                          <Field
                                            as="select"
                                            id="InvestmentLoanTermInYear"
                                            className="form-select shadow  inputDesign"
                                            name="InvestmentLoanTermInYear"
                                          >
                                            <option value="">Select</option>
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
                                            name="InvestmentLoanTermInYear"
                                          />
                                        </div>
                                      </div>

                                      <div className="row mb-3">
                                        <div className="col-6">
                                          <label
                                            htmlFor="InvestmentLoanType"
                                            className="form-label"
                                          >
                                            Loan Type
                                          </label>
                                        </div>
                                        <div className="col-6">
                                          <Field
                                            as="select"
                                            id="InvestmentLoanType"
                                            className="form-select shadow  inputDesign"
                                            name="InvestmentLoanType"
                                          >
                                            <option value="">Select</option>
                                            <option value="I/Only">
                                              I/Only
                                            </option>
                                            <option value="P&I">P & I</option>
                                          </Field>
                                          <ErrorMessage
                                            className="text-danger fw-bold"
                                            component="div"
                                            name="InvestmentLoanType"
                                          />
                                        </div>
                                      </div>

                                      <div className="row mb-3">
                                        <div className="col-6">
                                          <label
                                            htmlFor="InvestmentDedAmountOfLoan"
                                            className="form-label"
                                          >
                                            Ded Amount of Loan
                                          </label>
                                        </div>
                                        <div className="col-6">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="InvestmentDedAmountOfLoan"
                                            name="InvestmentDedAmountOfLoan"
                                            placeholder="Ded Amount of Loan"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="InvestmentDedAmountOfLoan"
                                          />
                                        </div>
                                      </div>

                                      <div className="row mb-3">
                                        <div className="col-6">
                                          <label
                                            htmlFor="InvestmentYearsRemainingYear"
                                            className="form-label"
                                          >
                                            Years Remaining (1-30 Years)
                                          </label>
                                        </div>
                                        <div className="col-6">
                                          <Field
                                            as="select"
                                            id="InvestmentYearsRemainingYear"
                                            className="form-select shadow  inputDesign"
                                            name="InvestmentYearsRemainingYear"
                                          >
                                            <option value="">Select</option>
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
                                            name="InvestmentYearsRemainingYear"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
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
                                    onClick={handleClose7}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </Modal.Footer>
                            </Form>
                          )}
                        </Formik>
                      </Modal>
                      {/* -------------investment Properties modal---------------------------- */}

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
                                        deleteHandler_Investment(elem, index)
                                      }
                                      className="btn btn-danger btn-sm mt-1"
                                    >
                                      delete
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) =>
                                        updateHandler_Investment(elem, index)
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
                    </Card>
                  )}
                  {/* investment Properties */}

                  {/* ModalInMOdal */}
                  {/* -------------Deposit modal---------------------------- */}

                  <Modal
                    show={show8}
                    onHide={handleClose8}
                    backdrop="static"
                    className="modal-lg"
                    keyboard={false}
                  >
                    <Modal.Header className="text-light modalBG " closeButton>
                      <Modal.Title className="fontStyle">
                        Investments Properties Details
                        <div className="iconContainerLg">
                          <img className="img-fluid" src={notebook} alt="" />
                        </div>
                      </Modal.Title>
                    </Modal.Header>
                    <Formik
                      initialValues={Investment_initialValues_Modal}
                      validationSchema={Investment_validationSchema_Modal}
                      onSubmit={Investment_onSubmit_Modal}
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
                            {/* Deposit accounts */}

                              <div className=" ">
                                
                                  <div className="row mb-3">
                                    <div className="col-6">
                                    <label htmlFor="" className="form-label">
                                        Total Property Expenses
                                        </label>
                                        </div>
                                        <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="TotalPropertyExpenses2"
                                        name="TotalPropertyExpenses2"
                                        placeholder="Total Property Expenses"
                                        readOnly={true}
                                        value={
                                          values.BodyCorporateFees2 +
                                          values.CouncilRates2 +
                                          values.GardeningAndLawnmowing2 +
                                          values.Insurance2 +
                                          values.LandTax2 +
                                          values.RepairsAndMaintenance2 +
                                          values.WaterCharges2 +
                                          values.Other2 +
                                          values.TelephoneAndInternet2 +
                                          values.ProfessionalFees2 +
                                          values.AllOther2
                                        }
                                      />
                                    </div>
                                </div>
                                
                                  <div className="row mb-3">
                                    <div className="col-6">
                                    <label
                                    htmlFor="BodyCorporateFees2"
                                        className="form-label"
                                        >
                                        Body Corporate Fees
                                        </label>
                                        </div>
                                        <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="BodyCorporateFees2"
                                        name="BodyCorporateFees2"
                                        placeholder="Body Corporate Fees"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="BodyCorporateFees2"
                                      />
                                    </div>
                                  </div>
                                
                                  <div className="row mb-3">
                                    <div className="col-6">
                                    <label
                                        htmlFor="CouncilRates2"
                                        className="form-label"
                                        >
                                        Council Rates
                                        </label>
                                        </div>
                                        <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="CouncilRates2"
                                        name="CouncilRates2"
                                        placeholder="Council Rates"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="CouncilRates2"
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-6">
                                    <label
                                        htmlFor="GardeningAndLawnmowing2"
                                        className="form-label"
                                        >
                                        Gardening and Lawn mowing
                                        </label>
                                        </div>
                                        <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="GardeningAndLawnmowing2"
                                        name="GardeningAndLawnmowing2"
                                        placeholder="Gardening and Lawn mowing"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="GardeningAndLawnmowing2"
                                      />
                                    </div>
                                  </div>
                              
                                  <div className="row mb-3">
                                    <div className="col-6">
                                    <label
                                        htmlFor="Insurance2"
                                        className="form-label"
                                      >
                                        Insurance
                                      </label>
                                        </div>
                                        <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Insurance2"
                                        name="Insurance2"
                                        placeholder="Insurance"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Insurance2"
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-6">
                                    <label
                                        htmlFor="LandTax2"
                                        className="form-label"
                                      >
                                      Land Tax
                                      </label>
                                        </div>
                                        <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="LandTax2"
                                        name="LandTax2"
                                        placeholder="Land Tax"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="LandTax2"
                                      />
                                    </div>
                                  </div>
                              
                                  <div className="row mb-3">
                                  <div className="col-6">
                                      <label
                                      htmlFor="RepairsAndMaintenance2"
                                      className="form-label"
                                      >
                                      Repairs and Maintenance
                                      </label>
                                        </div>
                                        <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="RepairsAndMaintenance2"
                                        name="RepairsAndMaintenance2"
                                        placeholder="Repairs and Maintenance"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="RepairsAndMaintenance2"
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                  <div className="col-6">
                                      <label
                                      htmlFor="WaterCharges2"
                                        className="form-label"
                                        >
                                        Water Charges
                                        </label>
                                        </div>
                                        <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="WaterCharges2"
                                        name="WaterCharges2"
                                        placeholder="Water Charges"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="WaterCharges2"
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-6">
                                    <label
                                    htmlFor="Other2"
                                        className="form-label"
                                        >
                                        Other
                                        </label>
                                        </div>
                                        <div className="col-6">
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

                                  <div className="row mb-3">
                                    <div className="col-6">
                                    <label
                                        htmlFor="TelephoneAndInternet2"
                                        className="form-label"
                                      >
                                      Telephone and Internet
                                      </label>
                                        </div>
                                        <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="TelephoneAndInternet2"
                                        name="TelephoneAndInternet2"
                                        placeholder="Telephone and Internet"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="TelephoneAndInternet2"
                                      />
                                    </div>
                                  </div>
                                
                                  <div className="row mb-3">
                                  <div className="col-6">
                                  <label
                                  htmlFor="Other2"
                                        className="form-label"
                                      >
                                      Professional Fees (Accounting or Other)
                                      </label>
                                        </div>
                                        <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="ProfessionalFees2"
                                        name="ProfessionalFees2"
                                        placeholder="Professional Fees (Accounting or Other)"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="ProfessionalFees2"
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                  <div className="col-6">
                                      <label
                                        htmlFor="AllOther2"
                                        className="form-label"
                                        >
                                        All Other
                                        </label>
                                        </div>
                                        <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AllOther2"
                                        name="AllOther2"
                                        placeholder="All Other"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AllOther2"
                                      />
                                    </div>
                                  </div>
                                
                            </div>
                            
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
                                onClick={handleClose8}
                              >
                                Cancel
                              </button>
                            </div>
                          </Modal.Footer>
                        </Form>
                      )}
                    </Formik>
                  </Modal>
                  {/* -------------Deposit modal---------------------------- */}

                  {/* ModalInMOdal */}

                  {CRObject.InvestmentTrust == "Yes" && (
                    <div className="row mt-5 mb-3">
                      <div className="col-md-12">
                        <button
                          type="submit"
                          className="float-end btn w-25  bgColor modalBtn"
                        >
                          Next
                        </button>
                        <button
                          className="float-end btn w-25  btn-outline  backBtn mx-3"
                          onClick={BackFunction}
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestmentTrust;
