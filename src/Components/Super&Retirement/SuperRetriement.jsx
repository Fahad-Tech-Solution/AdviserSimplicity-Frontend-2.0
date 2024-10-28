import { React, useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage, validateYupSchema } from "formik";
import { Card, Modal } from "react-bootstrap";

import plus from "./images/plus.svg";
import accounting from "./images/accounting.svg";
import businessman from "./images/businessman.svg";
import doctor from "./images/doctor.svg";
import lawyer from "./images/lawyer.svg";
import notebook from "./images/notebook.svg";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useRecoilState, useRecoilValue } from "recoil";
import { QuestionShift, CRState, StepState, defaultUrl } from "../../Store/Store";

function SuperRetriement() {

  
  let DefaultUrl = useRecoilValue(defaultUrl)

  let [CRObject, setCRObject] = useRecoilState(CRState);
  let [Steps, setSteps] = useRecoilState(StepState); //Recoil Step State For First Route When User Login


  let phonePattern = /^[1-9][0-9]{9}$/;

  const [ClientSuperAccounts, setClientSuperAccounts] = useState([]);
  const [ClientSuperAccountsObj, setClientSuperAccountsObj] = useState([]);
  const [ClientSuperAccountsUpdateFlag, setClientSuperAccountsUpdateFlag] =
    useState(false);

  const [PartnerSuperAccounts, setPartnerSuperAccounts] = useState([]);
  const [PartnerSuperAccountsObj, setPartnerSuperAccountsObj] = useState([]);
  const [PartnerSuperAccountsUpdateFlag, setPartnerSuperAccountsUpdateFlag] =
    useState(false);

  const [ClientLifetimePension, setClientLifetimePension] = useState([]);
  const [ClientLifetimePensionObj, setClientLifetimePensionObj] = useState([]);
  const [ClientLifetimePensionUpdateFlag, setClientLifetimePensionUpdateFlag] =
    useState(false);

  const [PartnerLifetimePension, setPartnerLifetimePension] = useState([]);
  const [PartnerLifetimePensionObj, setPartnerLifetimePensionObj] = useState(
    []
  );
  const [
    PartnerLifetimePensionUpdateFlag,
    setPartnerLifetimePensionUpdateFlag,
  ] = useState(false);

  const [updateIndex, setUpdateIndex] = useState();

  //NESTED INVESTMENT MODAL STATES
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setInvestmentModalEdit(false);
  };
  const handleShow = () => setShow(true);

  const [InvestmentModal, setInvestmentModal] = useState([]);
  const [InvestmentModalObj, setInvestmentModalObj] = useState([]);
  const [InvestmentModalEdit, setInvestmentModalEdit] = useState(false);

  //PARTNER
  const [showPartner, setShowPartner] = useState(false);
  const handleClosePartner = () => {
    setShowPartner(false);
    setInvestmentModalPartnerEdit(false);
  };
  const handleShowPartner = () => setShowPartner(true);

  const [InvestmentModalPartner, setInvestmentModalPartner] = useState([]);
  const [InvestmentModalPartnerObj, setInvestmentModalPartnerObj] = useState(
    []
  );
  const [InvestmentModalPartnerEdit, setInvestmentModalPartnerEdit] =
    useState(false);
  //NESTED INVESTMENT MODAL STATES

  // NESTED INSURANCE MODAL STATES
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => {
    setShow2(false);
    setInsuranceDataListUpdateFlag(false);
  };
  const handleShow2 = () => setShow2(true);

  // CONDITIONAL RENDERING
  let investmentRadioHandler = (data) => {
    if (data === "Yes") {
      // alert("yess");
    } else {
      // alert("No");
    }
  };
  const [InsuranceDataList, setInsuranceDataList] = useState([]);
  const [InsuranceDataListObj, setInsuranceDataListObj] = useState([]);
  const [InsuranceDataListUpdateFlag, setInsuranceDataListUpdateFlag] =
    useState(false);

  //PARTNER NESTED INSURANCE
  const [showPartner2, setShowPartner2] = useState(false);
  const handleClosePartner2 = () => {
    setShowPartner2(false);
    setInsuranceDataPartnerListUpdateFlag(false);
  };
  const handleShowPartner2 = () => setShowPartner2(true);

  const [InsuranceDataPartnerList, setInsuranceDataPartnerList] = useState([]);
  const [
    InsuranceDataPartnerListUpdateFlag,
    setInsuranceDataPartnerListUpdateFlag,
  ] = useState(false);
  const [InsuranceDataPartnerListObj, setInsuranceDataPartnerListObj] =
    useState([]);

  //PARTNER NESTED INSURANCE
  // NESTED INSURANCE MODAL STATES

  // NESTED BENFICIARIES MODAL STATES
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => {
    setShow3(false);
    setBeneficiaryDataListUpdateFlag(false);
  };
  const handleShow3 = () => setShow3(true);

  const [BeneficiaryDataList, setBeneficiaryDataList] = useState([]);
  const [BeneficiaryDataListObj, setBeneficiaryDataListObj] = useState([]);
  const [BeneficiaryDataListUpdateFlag, setBeneficiaryDataListUpdateFlag] =
    useState(false);

  //PARTNER NESTED MODAL
  const [showPartner3, setShowPartner3] = useState(false);
  const handleClosePartner3 = () => {
    setShowPartner3(false);
    setBeneficiaryDataPartnerListUpdateFlag(false);
  };
  const handleShowPartner3 = () => setShowPartner3(true);

  const [BeneficiaryDataPartnerList, setBeneficiaryDataPartnerList] = useState(
    []
  );
  const [BeneficiaryDataPartnerListObj, setBeneficiaryDataPartnerListObj] =
    useState([]);
  const [
    BeneficiaryDataPartnerListUpdateFlag,
    setBeneficiaryDataPartnerListUpdateFlag,
  ] = useState(false);

  //PARTNER NESTED MODAL
  // NESTED BENFICIARIES MODAL STATES

  // NESTED CONTRIBUTIONS MODAL STATES
  const [show4, setShow4] = useState(false);
  const handleClose4 = () => {
    setShow4(false);
    setcontributionModalUpdateFlag(false);
  };
  const handleShow4 = () => setShow4(true);

  const [contributionModal, setcontributionModal] = useState([]);
  const [contributionModalUpdateFlag, setcontributionModalUpdateFlag] =
    useState(false);
  const [contributionModalObj, setcontributionModalObj] = useState([]);

  //PARTNER NESTED CONTRIBUTION MODAL

  const [showPartner4, setShowPartner4] = useState(false);
  const handleClosePartner4 = () => {
    setShowPartner4(false);
    setcontributionPartnerModalUpdateFlag(false);
  };
  const handleShowPartner4 = () => setShowPartner4(true);

  const [contributionPartnerModal, setcontributionPartnerModal] = useState([]);
  const [
    contributionPartnerModalUpdateFlag,
    setcontributionPartnerModalUpdateFlag,
  ] = useState(false);
  const [contributionPartnerModalObj, setcontributionPartnerModalObj] =
    useState([]);
  //PARTNER NESTED CONTRIBUTION MODAL
  // NESTED CONTRIBUTIONS MODAL STATES

  let partner = window.localStorage.getItem("partner");
  const [isPartnered, setIsPartnered] = useState();

  const [ClientObj, setClientObj] = useState([]);
  const [PartnerObj, setPartnerObj] = useState([]);

  useEffect(() => {
    if (partner == "true") {
      setIsPartnered(true);
    } else {
      setIsPartnered(false);
    }
  }, []);

  // CLIENT ->SUPER ACCOUNT
  const [Super, setSuper] = useState(false);
  const [Supershow, setSuperShow] = useState(false);
  const SuperhandleClose = () => {
    setSuperShow(false);
    setClientSuperAccountsUpdateFlag(false);
  };
  const SuperhandleShow = () => setSuperShow(true);

  let SuperHandler = (elem) => {
    if (elem === "No") {
      setSuper(false);
    } else {
      setSuper(true);
    }
  };

  const [Super2, setSuper2] = useState(false);
  const [Super2show, setSuper2Show] = useState(false);
  const Super2handleClose = () => {
    setSuper2Show(false);
    setPartnerSuperAccountsUpdateFlag(false);
  };
  const Super2handleShow = () => setSuper2Show(true);
  let Super2Handler = (elem) => {
    if (elem === "No") {
      setSuper2(false);
    } else {
      setSuper2(true);
    }
  };

  const [Pension, setPension] = useState(false);
  const [Pensionshow, setPensionShow] = useState(false);
  const PensionhandleClose = () => {
    setPensionShow(false);
    setclientPensionDataListEdit(false);
  };
  const PensionhandleShow = () => setPensionShow(true);

  const [clientPensionDataList, setclientPensionDataList] = useState([]);
  const [clientPensionDataListObj, setclientPensionDataListObj] = useState([]);
  const [clientPensionDataListEdit, setclientPensionDataListEdit] =
    useState(false);

  let PensionHandler = (elem) => {
    if (elem === "No") {
      setPension(false);
    } else {
      setPension(true);
    }
  };

  const [Pension2, setPension2] = useState(false);
  const [Pension2show, setPension2Show] = useState(false);
  const Pension2handleClose = () => {
    setPension2Show(false);
    setPension2PartnerDataListEdit(false);
  };
  const Pension2handleShow = () => setPension2Show(true);

  const [Pension2PartnerDataList, setPension2PartnerDataList] = useState([]);
  const [Pension2PartnerDataListObj, setPension2PartnerDataListObj] = useState(
    []
  );
  const [Pension2PartnerDataListEdit, setPension2PartnerDataListEdit] =
    useState(false);

  let Pension2Handler = (elem) => {
    if (elem === "No") {
      setPension2(false);
    } else {
      setPension2(true);
    }
  };

  const [Annuities, setAnnuities] = useState(false);
  const [Annuitiesshow, setAnnuitiesShow] = useState(false);
  const AnnuitieshandleClose = () => {
    setAnnuitiesShow(false);
    setAnnuitiesDataListEdit(false);
  };
  const AnnuitieshandleShow = () => setAnnuitiesShow(true);

  const [AnnuitiesDataList, setAnnuitiesDataList] = useState([]);
  const [AnnuitiesDataListObj, setAnnuitiesDataListObj] = useState([]);

  const [AnnuitiesDataListEdit, setAnnuitiesDataListEdit] = useState(false);
  let AnnuitiesHandler = (elem) => {
    if (elem === "No") {
      setAnnuities(false);
    } else {
      setAnnuities(true);
    }
  };

  const [Annuities2, setAnnuities2] = useState(false);
  const [Annuities2show, setAnnuities2Show] = useState(false);
  const Annuities2handleClose = () => {
    setAnnuities2Show(false);
    setAnnuitiesData2ListEdit(false);
  };
  const Annuities2handleShow = () => setAnnuities2Show(true);
  const [AnnuitiesData2List, setAnnuitiesData2List] = useState([]);
  const [AnnuitiesData2ListObj, setAnnuitiesData2ListObj] = useState([]);
  const [AnnuitiesData2ListEdit, setAnnuitiesData2ListEdit] = useState(false);

  let Annuities2Handler = (elem) => {
    if (elem === "No") {
      setAnnuities2(false);
    } else {
      setAnnuities2(true);
    }
  };

  const [LifetimePension, setLifetimePension] = useState(false);
  const [LifetimePensionshow, setLifetimePensionShow] = useState(false);
  const LifetimePensionhandleClose = () => {
    setLifetimePensionShow(false);
    setClientLifetimePensionUpdateFlag(false);
  };
  const LifetimePensionhandleShow = () => setLifetimePensionShow(true);

  const [LifetimePensionDataList, setLifetimePensionDataList] = useState([]);
  const [LifetimePensionDataListEdit, setLifetimePensionDataListEdit] =
    useState(false);
  let LifetimePensionHandler = (elem) => {
    if (elem === "No") {
      setLifetimePension(false);
    } else {
      setLifetimePension(true);
    }
  };

  const [LifetimePension2, setLifetimePension2] = useState(false);
  const [LifetimePension2show, setLifetimePension2Show] = useState(false);
  const LifetimePension2handleClose = () => {
    setLifetimePension2Show(false);
    setPartnerLifetimePensionUpdateFlag(false);
  };
  const LifetimePension2handleShow = () => setLifetimePension2Show(true);
  let LifetimePension2Handler = (elem) => {
    if (elem === "No") {
      setLifetimePension2(false);
    } else {
      setLifetimePension2(true);
    }
  };
  //NESTED PENSION CLIENT INVESTMENT MODAL STATES
  const [showPensionClient, setShowPensionClient] = useState(false);
  const handleClosePensionClient = () => {
    setShowPensionClient(false);
    setPensionClientInvestmentModalEdit(false);
  };
  const handleShowPensionClient = () => setShowPensionClient(true);

  const [PensionClientInvestmentModal, setPensionClientInvestmentModal] =
    useState([]);
  const [PensionClientInvestmentModalObj, setPensionClientInvestmentModalObj] =
    useState([]);
  const [
    PensionClientInvestmentModalEdit,
    setPensionClientInvestmentModalEdit,
  ] = useState(false);

  //NESTED PENSION PARTNER INVESTMENT MODAL STATES
  const [showPensionPartner, setShowPensionPartner] = useState(false);
  const handleClosePensionPartner = () => {
    setShowPensionPartner(false);
    setPensionPartnerInvestmentModalEdit(false);
  };
  const handleShowPensionPartner = () => setShowPensionPartner(true);

  const [PensionPartnerInvestmentModal, setPensionPartnerInvestmentModal] =
    useState([]);
  const [
    PensionPartnerInvestmentModalObj,
    setPensionPartnerInvestmentModalObj,
  ] = useState([]);
  const [
    PensionPartnerInvestmentModalEdit,
    setPensionPartnerInvestmentModalEdit,
  ] = useState(false);

  //NESTED PENSION PARTNER BENEFICIARY MODAL STATES
  const [showPartnerBeneficiary, setShowPartnerBeneficiary] = useState(false);
  const handleClosePartnerBeneficiary = () => {
    setShowPartnerBeneficiary(false);
    setPartnerBeneficiaryDataListUpdateFlag(false);
  };
  const handleShowPartnerBeneficiary = () => setShowPartnerBeneficiary(true);

  const [PartnerBeneficiaryDataList, setPartnerBeneficiaryDataList] = useState(
    []
  );
  const [PartnerBeneficiaryDataListObj, setPartnerBeneficiaryDataListObj] =
    useState([]);
  const [
    PartnerBeneficiaryDataListUpdateFlag,
    setPartnerBeneficiaryDataListUpdateFlag,
  ] = useState(false);

  //NESTED PENSION Client BENEFICIARY MODAL STATES
  const [showClientBeneficiary, setShowClientBeneficiary] = useState(false);
  const handleCloseClientBeneficiary = () => {
    setShowClientBeneficiary(false);
    setClientBeneficiaryDataListUpdateFlag(false);
  };
  const handleShowClientBeneficiary = () => setShowClientBeneficiary(true);

  const [ClientBeneficiaryDataList, setClientBeneficiaryDataList] = useState(
    []
  );
  const [ClientBeneficiaryDataListObj, setClientBeneficiaryDataListObj] =
    useState([]);
  const [
    ClientBeneficiaryDataListUpdateFlag,
    setClientBeneficiaryDataListUpdateFlag,
  ] = useState(false);

  let Navigate = useNavigate();
  function BackFunction() {
    setSteps(7);
    localStorage.setItem("Steps", 7);
    Navigate("/Estate-Planning");
  }

  // 4 FORMS MERGED DATA
  let Client_initialValues = {
    SuperFundName: "",
    SuperMemberNo: "",
    SuperFundType: "",
    SuperContactNO: "",
    SuperFaxNO: "",
    SuperPostalAddress: "",
    SuperABN: "",
    SuperSPIN: "",
    SuperWebsite: "",
    SuperEmail: "",
    SuperFundType2: "",
    SuperCommencementDate: "",
    SuperEligibleDate: "",
    SuperTFNQuoted: "No",
    SuperCurrentBalance: "",
    SuperTaxFree: "",
    SuperTaxed: "",
    SuperRestrictionNonPreserved: "",
    SuperUnRestrictionNonPreserved: "",
    SuperPreservedAmount: "",

    AccountPension_FundName: "",
    AccountPension_MemberNO: "",
    AccountPension_FundType: "",
    AccountPension_ContactNO: "",
    AccountPension_FaxNO: "",
    AccountPension_PostalAddress: "",
    AccountPension_ABN: "",
    AccountPension_SPIN: "",
    AccountPension_Website: "",
    AccountPension_Email: "",
    AccountPension_PensionType: "",
    AccountPension_CommencementDate: "",
    AccountPension_EligibleService: "",
    AccountPension_CurrentBalance: "",
    AccountPension_TaxFree: "",
    AccountPension_Taxed: "",
    AccountPension_OriginalPrice: "",
    AccountPension_Frequency: "",
    AccountPension_IncomeDrawn: "",
    AccountPension_MinimumRequired: "",
    AccountPension_RelevantNumber: "",
    // AccountPension_OriginalPrice: "",
    AccountPension_LumpsumTaken: "",
    AccountPension_DeductibleAmount: "",

    Annuities_ProductProvider: "",
    Annuities_InvestmentAmount: "",
    Annuities_CurrentValue: "",
    Annuities_AnnuityType: "",
    Annuities_RCV: "",
    Annuities_Term: "",
    Annuities_YearsUntilMaturity: "",
    Annuities_RegularIncome: "",
    Annuities_Frequency: "",
    Annuities_AnnualInflation: "",

    LifetimeAccountPension_FundName: "",
    LifetimePensionIncomeDrawn: "",
    LifetimeAccountPension_Frequency: "",
    LifetimeAccountPension_DeductibleAmount: "",
    LifetimeAccountPension_TaxFree: "No",
    LifetimePensionTaxableAmount: "",
  };

  // CLIENT -> SUPER ACCOUNT
  let InitialValuesMainClientSuperAccount = {
    SuperFundName: "",
    SuperMemberNo: "",
    SuperFundType: "",
    SuperContactNO: "",
    SuperFaxNO: "",
    SuperPostalAddress: "",
    SuperABN: "",
    SuperSPIN: "",
    SuperWebsite: "",
    SuperEmail: "",
    SuperFundType2: "",
    SuperCommencementDate: "",
    SuperEligibleDate: "",
    SuperTFNQuoted: "No",
    SuperCurrentBalance: "",
    SuperTaxFree: "",
    SuperTaxed: "",
    SuperRestrictionNonPreserved: "",
    SuperUnRestrictionNonPreserved: "",
    SuperPreservedAmount: "",
  };
  let clientSuperAccountMainValidationSchema = Yup.object({
    SuperFundName: Yup.string().required("Required"),
    SuperMemberNo: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    SuperFundType: Yup.string().required("Required"),
    SuperContactNO: Yup.string().matches(phonePattern, "invalid phone number"),
    SuperFaxNO: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    SuperPostalAddress: Yup.string().required("Required"),
    SuperABN: Yup.string().required("Required"),
    SuperSPIN: Yup.string().required("Required"),
    SuperWebsite: Yup.string().required("Required"),
    SuperEmail: Yup.string().required("Required"),
    SuperFundType2: Yup.string().required("Required"),
    SuperCommencementDate: Yup.string().required("Required"),
    SuperEligibleDate: Yup.string().required("Required"),
    SuperCurrentBalance: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    SuperTaxFree: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    // SuperTaxed: Yup.number()
    //   .required("Required")
    //   .test("Is positive?", "Must be a positive value", (value) => value > 0),
    SuperRestrictionNonPreserved: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    SuperUnRestrictionNonPreserved: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    // SuperPreservedAmount: Yup.number()
    //   .required("Required")
    //   .test("Is positive?", "Must be a positive value", (value) => value > 0),
  });
  // CLIENT PENSION ACCOUNT
  let InitialValuesMainClientPensionAccount = {
    AccountPension_FundName: "",
    AccountPension_MemberNO: "",
    AccountPension_FundType: "",
    AccountPension_ContactNO: "",
    AccountPension_FaxNO: "",
    AccountPension_PostalAddress: "",
    AccountPension_ABN: "",
    AccountPension_SPIN: "",
    AccountPension_Website: "",
    AccountPension_Email: "",
    AccountPension_PensionType: "",
    AccountPension_CommencementDate: "",
    AccountPension_EligibleService: "",
    AccountPension_CurrentBalance: "",
    AccountPension_TaxFree: "",
    AccountPension_Taxed: "",
    AccountPension_OriginalPrice: "",
    AccountPension_Frequency: "",
    AccountPension_IncomeDrawn: "",
    AccountPension_MinimumRequired: "",
    AccountPension_MaximumRequired:"",
    AccountPension_RelevantNumber: "",
    // AccountPension_OriginalPrice: "",
    AccountPension_LumpsumTaken: "",
    AccountPension_DeductibleAmount: "",
  };
  let clientPensionAccountMainValidationSchema = Yup.object({
    AccountPension_FundName: Yup.string().required("Required"),
    AccountPension_MemberNO: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_FundType: Yup.string().required("Required"),
    AccountPension_ContactNO: Yup.string().matches(
      phonePattern,
      "invalid phone number"
    ),
    AccountPension_FaxNO: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_PostalAddress: Yup.string().required("Required"),
    AccountPension_ABN: Yup.string().required("Required"),
    AccountPension_SPIN: Yup.string().required("Required"),
    AccountPension_Website: Yup.string().required("Required"),
    AccountPension_Email: Yup.string().required("Required"),
    AccountPension_PensionType: Yup.string().required("Required"),
    AccountPension_CommencementDate: Yup.string().required("Required"),
    AccountPension_EligibleService: Yup.string().required("Required"),
    AccountPension_CurrentBalance: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_TaxFree: Yup.string().required("Required"),
    // AccountPension_Taxed: Yup.string().required("Required"),
    // AccountPension_OriginalPrice: Yup.string().required("Required"),
    AccountPension_Frequency: Yup.string().required("Required"),
    AccountPension_IncomeDrawn: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_MinimumRequired: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
      AccountPension_MaximumRequired: Yup.number()
      .when('AccountPension_PensionType',{
        is: val => val && val.length ===3,
        then:Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value)=> value >0
        ),
        otherwise: Yup.number().notRequired()
      }),
    
    AccountPension_RelevantNumber: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_OriginalPrice: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_LumpsumTaken: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    // AccountPension_DeductibleAmount: Yup.number()
    //   .required("Required")
    //   .test("Is positive?", "Must be a positive value", (value) => value > 0),
  });
  //CLIENT MAIN ANNUITIES
  let InitialValuesMainClientAnnuitiesAccount = {
    Annuities_ProductProvider: "",
    Annuities_Other:"",
    Annuities_InvestmentAmount: "",
    Annuities_CurrentValue: "",
    Annuities_AnnuityType: "",
    Annuities_RCV: "",
    Annuities_Term: "",
    Annuities_YearsUntilMaturity: "",
    Annuities_RegularIncome: "",
    Annuities_Frequency: "",
    Annuities_AnnualInflation: "",
  };
  let clientAnnuitiesAccountMainValidationSchema = Yup.object({
    Annuities_ProductProvider: Yup.string().required("Required"),

    Annuities_Other:Yup.string()
    .when('Annuities_ProductProvider',{
      is: val => val && val ==="Other",
      then:Yup.string().required("Required"),
      otherwise: Yup.string().notRequired()
    }),
    Annuities_InvestmentAmount: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Annuities_CurrentValue: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Annuities_AnnuityType: Yup.string().required("Required"),
    Annuities_RCV: Yup.number().required("Required"),
    Annuities_Term: Yup.number().required("Required"),
    Annuities_YearsUntilMaturity: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Annuities_RegularIncome: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Annuities_Frequency: Yup.string().required("Required"),
    Annuities_AnnualInflation: Yup.string().required("Required"),
  });
  //CLIENT LIFETIME MAIN SECTION
  let InitialValuesMainClientLifetimePensionAccount = {
    LifetimeAccountPension_FundName: "",
    LifetimePensionIncomeDrawn: "",
    LifetimeAccountPension_Frequency: "",
    LifetimeAccountPension_DeductibleAmount: "",
    LifetimeAccountPension_TaxFree: "No",
    LifetimePensionTaxableAmount: "",
  };
  let clientLifetimePensionAccountMainValidationSchema = Yup.object({
    LifetimeAccountPension_FundName: Yup.string().required("Required"),
    LifetimePensionIncomeDrawn: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    LifetimeAccountPension_Frequency: Yup.string().required("Required"),
    LifetimeAccountPension_DeductibleAmount: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    LifetimePensionTaxableAmount: Yup.number()
      .when('LifetimeAccountPension_TaxFree',{
        is: val => val && val ==="No",
        then:Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value)=> value >0
        ),
        otherwise: Yup.number().notRequired()
      }),
  });
  // 4 CLIENT FORMS VALIDATION SCHEMA
  let Client_validationSchema = Yup.object({
    SuperFundName: Yup.string().required("Required"),
    SuperMemberNo: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    SuperFundType: Yup.string().required("Required"),
    SuperContactNO: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    SuperFaxNO: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    SuperPostalAddress: Yup.string().required("Required"),
    SuperABN: Yup.string().required("Required"),
    SuperSPIN: Yup.string().required("Required"),
    SuperWebsite: Yup.string().required("Required"),
    SuperEmail: Yup.string().required("Required"),
    SuperFundType2: Yup.string().required("Required"),
    SuperCommencementDate: Yup.string().required("Required"),
    SuperEligibleDate: Yup.string().required("Required"),
    SuperCurrentBalance: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    SuperTaxFree: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    // SuperTaxed: Yup.number()
    //   .required("Required")
    //   .test("Is positive?", "Must be a positive value", (value) => value > 0),
    SuperRestrictionNonPreserved: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    SuperUnRestrictionNonPreserved: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    // SuperPreservedAmount: Yup.number()
    //   .required("Required")
    //   .test("Is positive?", "Must be a positive value", (value) => value > 0),

    AccountPension_FundName: Yup.string().required("Required"),
    AccountPension_MemberNO: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_FundType: Yup.string().required("Required"),
    AccountPension_ContactNO: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_FaxNO: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_PostalAddress: Yup.string().required("Required"),
    AccountPension_ABN: Yup.string().required("Required"),
    AccountPension_SPIN: Yup.string().required("Required"),
    AccountPension_Website: Yup.string().required("Required"),
    AccountPension_Email: Yup.string().required("Required"),
    AccountPension_PensionType: Yup.string().required("Required"),
    AccountPension_CommencementDate: Yup.string().required("Required"),
    AccountPension_EligibleService: Yup.string().required("Required"),
    AccountPension_CurrentBalance: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_TaxFree: Yup.string().required("Required"),
    // AccountPension_Taxed: Yup.string().required("Required"),
    // AccountPension_OriginalPrice: Yup.string().required("Required"),
    AccountPension_Frequency: Yup.string().required("Required"),
    AccountPension_IncomeDrawn: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_MinimumRequired: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_RelevantNumber: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_OriginalPrice: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_LumpsumTaken: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_DeductibleAmount: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),

    Annuities_ProductProvider: Yup.string().required("Required"),
    Annuities_InvestmentAmount: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Annuities_CurrentValue: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Annuities_AnnuityType: Yup.string().required("Required"),
    Annuities_RCV: Yup.number().required("Required"),
    Annuities_Term: Yup.number().required("Required"),
    Annuities_YearsUntilMaturity: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Annuities_RegularIncome: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Annuities_Frequency: Yup.string().required("Required"),
    Annuities_AnnualInflation: Yup.string().required("Required"),

    LifetimeAccountPension_FundName: Yup.string().required("Required"),
    LifetimePensionIncomeDrawn: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    LifetimeAccountPension_Frequency: Yup.string().required("Required"),
    LifetimeAccountPension_DeductibleAmount: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    LifetimePensionTaxableAmount: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
  });

  //4 FORMS MERGED DATA
  let Partner_initialValues = {
    Super2FundName: "",
    Super2MemberNo: "",
    Super2FundType: "",
    Super2ContactNO: "",
    Super2FaxNO: "",
    Super2PostalAddress: "",
    Super2ABN: "",
    Super2SPIN: "",
    Super2Website: "",
    Super2Email: "",
    Super2FundType2: "",
    Super2CommencementDate: "",
    Super2EligibleDate: "",
    Super2TFNQuoted: "No",
    Super2CurrentBalance: "",
    Super2TaxFree: "",
    Super2Taxed: "",
    Super2RestrictionNonPreserved: "",
    Super2UnRestrictionNonPreserved: "",
    Super2PreservedAmount: "",

    AccountPension_FundName: "",
    AccountPension_MemberNO: "",
    AccountPension_FundType: "",
    AccountPension_ContactNO: "",
    AccountPension_FaxNO: "",
    AccountPension_PostalAddress: "",
    AccountPension_ABN: "",
    AccountPension_SPIN: "",
    AccountPension_Website: "",
    AccountPension_Email: "",
    AccountPension_FundType2: "",
    AccountPension_CommencementDate: "",
    AccountPension_EligibleService: "",
    AccountPension_CurrentBalance: "",
    AccountPension_TaxFree: "",
    AccountPension_Taxed: "",
    AccountPension_OriginalPrice: "",
    AccountPension_Frequency: "",
    AccountPension_IncomeDrawn: "",
    AccountPension_MinimumRequired: "",
    AccountPension_RelevantNumber: "",
    // AccountPension_OriginalPrice: "",
    AccountPension_LumpsumTaken: "",
    AccountPension_DeductibleAmount: "",

    Annuities_ProductProvider: "",
    Annuities_InvestmentAmount: "",
    Annuities_CurrentValue: "",
    Annuities_AnnuityType: "",
    Annuities_RCV: "",
    Annuities_Term: "",
    Annuities_YearsUntilMaturity: "",
    Annuities_RegularIncome: "",
    Annuities_Frequency: "",
    Annuities_AnnualInflation: "",

    LifetimeAccountPension_FundName: "",
    LifetimePension2IncomeDrawn: "",
    LifetimeAccountPension_Frequency: "",
    LifetimeAccountPension_DeductibleAmount: "",
    LifetimeAccountPension_TaxFree: "No",
    LifetimePension2TaxableAmount: "",
  };
  //PARTNER -> SUPER ACCOUNT
  let InitialValuesMainPartnerSuperAccount = {
    Super2FundName: "",
    Super2MemberNo: "",
    Super2FundType: "",
    Super2ContactNO: "",
    Super2FaxNO: "",
    Super2PostalAddress: "",
    Super2ABN: "",
    Super2SPIN: "",
    Super2Website: "",
    Super2Email: "",
    Super2FundType2: "",
    Super2CommencementDate: "",
    Super2EligibleDate: "",
    Super2TFNQuoted: "No",
    Super2CurrentBalance: "",
    Super2TaxFree: "",
    Super2Taxed: "",
    Super2RestrictionNonPreserved: "",
    Super2UnRestrictionNonPreserved: "",
    Super2PreservedAmount: "",
  };
  let partnerSuperAccountMainValidationSchema = Yup.object({
    Super2FundName: Yup.string().required("Required"),
    Super2MemberNo: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Super2FundType: Yup.string().required("Required"),
    Super2ContactNO: Yup.string().matches(phonePattern, "invalid phone number"),
    Super2FaxNO: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Super2PostalAddress: Yup.string().required("Required"),
    Super2ABN: Yup.string().required("Required"),
    Super2SPIN: Yup.string().required("Required"),
    Super2Website: Yup.string().required("Required"),
    Super2Email: Yup.string().required("Required"),
    Super2FundType2: Yup.string().required("Required"),
    Super2CommencementDate: Yup.string().required("Required"),
    Super2EligibleDate: Yup.string().required("Required"),
    Super2CurrentBalance: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Super2TaxFree: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    // Super2Taxed: Yup.number()
    //   .required("Required")
    //   .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Super2RestrictionNonPreserved: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Super2UnRestrictionNonPreserved: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    // Super2PreservedAmount: Yup.number()
    //   .required("Required")
    //   .test("Is positive?", "Must be a positive value", (value) => value > 0),
  });
  //PARTNER PENSION ACCOUNT
  let InitialValuesMainPartnerPensionAccount = {
    AccountPension_FundName: "",
    AccountPension_MemberNO: "",
    AccountPension_FundType: "",
    AccountPension_ContactNO: "",
    AccountPension_FaxNO: "",
    AccountPension_PostalAddress: "",
    AccountPension_ABN: "",
    AccountPension_SPIN: "",
    AccountPension_Website: "",
    AccountPension_Email: "",
    AccountPension_FundType2: "",
    AccountPension_CommencementDate: "",
    AccountPension_EligibleService: "",
    AccountPension_CurrentBalance: "",
    AccountPension_TaxFree: "",
    AccountPension_Taxed: "",
    AccountPension_OriginalPrice: "",
    AccountPension_Frequency: "",
    AccountPension_IncomeDrawn: "",
    AccountPension_MinimumRequired: "",
    AccountPension_MaximumRequired:"",
    AccountPension_RelevantNumber: "",
    AccountPension_LumpsumTaken: "",
    AccountPension_DeductibleAmount: "",
  };
  let partnerPensionAccountMainValidationSchema = Yup.object({
    AccountPension_FundName: Yup.string().required("Required"),
    AccountPension_MemberNO: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_FundType: Yup.string().required("Required"),
    AccountPension_ContactNO: Yup.string().matches(
      phonePattern,
      "invalid phone number"
    ),
    AccountPension_FaxNO: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_PostalAddress: Yup.string().required("Required"),
    AccountPension_ABN: Yup.string().required("Required"),
    AccountPension_SPIN: Yup.string().required("Required"),
    AccountPension_Website: Yup.string().required("Required"),
    AccountPension_Email: Yup.string().required("Required"),
    AccountPension_FundType2: Yup.string().required("Required"),
    AccountPension_CommencementDate: Yup.string().required("Required"),
    AccountPension_EligibleService: Yup.string().required("Required"),
    AccountPension_CurrentBalance: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_TaxFree: Yup.string().required("Required"),
    // AccountPension_Taxed: Yup.string().required("Required"),
    // AccountPension_OriginalPrice: Yup.string().required("Required"),
    AccountPension_Frequency: Yup.string().required("Required"),
    AccountPension_IncomeDrawn: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_MinimumRequired: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
      AccountPension_MaximumRequired: Yup.number()
      .when('AccountPension_FundType2',{
        is: val => val && val.length ===3,
        then:Yup.number().required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value)=> value >0
        ),
        otherwise: Yup.number().notRequired()
      }),
    AccountPension_RelevantNumber: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_LumpsumTaken: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    // AccountPension_DeductibleAmount: Yup.number()
    //   .required("Required")
    //   .test("Is positive?", "Must be a positive value", (value) => value > 0),
  });

  // PARTNER -> ANNUITIES
  let InitialValuesMainPartnerAnnuitiesAccount = {
    Annuities_ProductProvider: "",
    Annuities_Other:"",
    Annuities_InvestmentAmount: "",
    Annuities_CurrentValue: "",
    Annuities_AnnuityType: "",
    Annuities_RCV: "",
    Annuities_Term: "",
    Annuities_YearsUntilMaturity: "",
    Annuities_RegularIncome: "",
    Annuities_Frequency: "",
    Annuities_AnnualInflation: "",
  };
  let partnerAnnuitiesAccountMainValidationSchema = Yup.object({
    Annuities_ProductProvider: Yup.string().required("Required"),
    Annuities_Other:Yup.string().when("Annuities_ProductProvider", {
      is: (val) => val && val === "Other",
      then: Yup.string()
        .required("Required"),
      
      otherwise: Yup.string().notRequired(),
    }),
    Annuities_InvestmentAmount: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Annuities_CurrentValue: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Annuities_AnnuityType: Yup.string().required("Required"),
    Annuities_RCV: Yup.number().required("Required"),
    Annuities_Term: Yup.number().required("Required"),
    Annuities_YearsUntilMaturity: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Annuities_RegularIncome: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Annuities_Frequency: Yup.string().required("Required"),
    Annuities_AnnualInflation: Yup.string().required("Required"),
  });
  // PARTNER LIFETIME PENSION MAIN
  let InitialValuesMainPartnerLifetimePensionAccount = {
    LifetimeAccountPension_FundName: "",
    LifetimePension2IncomeDrawn: "",
    LifetimeAccountPension_Frequency: "",
    LifetimeAccountPension_DeductibleAmount: "",
    LifetimeAccountPension_TaxFree: "No",
    LifetimePension2TaxableAmount: "",
  };
  let partnerLifetimePensionAccountMainValidationSchema = Yup.object({
    LifetimeAccountPension_FundName: Yup.string().required("Required"),
    LifetimePension2IncomeDrawn: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    LifetimeAccountPension_Frequency: Yup.string().required("Required"),
    LifetimeAccountPension_DeductibleAmount: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    LifetimePension2TaxableAmount:  Yup.number()
    .when('LifetimeAccountPension_TaxFree',{
      is: val => val && val ==="No",
      then:Yup.number().required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value)=> value >0
      ),
      otherwise: Yup.number().notRequired()
    }),
  });

  let Partner_validationSchema = Yup.object({
    Super2FundName: Yup.string().required("Required"),
    Super2MemberNo: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Super2FundType: Yup.string().required("Required"),
    Super2ContactNO: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Super2FaxNO: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Super2PostalAddress: Yup.string().required("Required"),
    Super2ABN: Yup.string().required("Required"),
    Super2SPIN: Yup.string().required("Required"),
    Super2Website: Yup.string().required("Required"),
    Super2Email: Yup.string().required("Required"),
    Super2FundType2: Yup.string().required("Required"),
    Super2CommencementDate: Yup.string().required("Required"),
    Super2EligibleDate: Yup.string().required("Required"),
    Super2CurrentBalance: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Super2TaxFree: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Super2RestrictionNonPreserved: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Super2UnRestrictionNonPreserved: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Super2PreservedAmount: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),

    AccountPension_FundName: Yup.string().required("Required"),
    AccountPension_MemberNO: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_FundType: Yup.string().required("Required"),
    AccountPension_ContactNO: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_FaxNO: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_PostalAddress: Yup.string().required("Required"),
    AccountPension_ABN: Yup.string().required("Required"),
    AccountPension_SPIN: Yup.string().required("Required"),
    AccountPension_Website: Yup.string().required("Required"),
    AccountPension_Email: Yup.string().required("Required"),
    AccountPension_FundType2: Yup.string().required("Required"),
    AccountPension_CommencementDate: Yup.string().required("Required"),
    AccountPension_EligibleService: Yup.string().required("Required"),
    AccountPension_CurrentBalance: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_TaxFree: Yup.string().required("Required"),
    // AccountPension_Taxed: Yup.string().required("Required"),
    // AccountPension_OriginalPrice: Yup.string().required("Required"),
    AccountPension_Frequency: Yup.string().required("Required"),
    AccountPension_IncomeDrawn: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_MinimumRequired: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_RelevantNumber: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_OriginalPrice: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_LumpsumTaken: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    AccountPension_DeductibleAmount: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),

    Annuities_ProductProvider: Yup.string().required("Required"),
    Annuities_InvestmentAmount: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Annuities_CurrentValue: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Annuities_AnnuityType: Yup.string().required("Required"),
    Annuities_RCV: Yup.number().required("Required"),
    Annuities_Term: Yup.number().required("Required"),
    Annuities_YearsUntilMaturity: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Annuities_RegularIncome: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    Annuities_Frequency: Yup.string().required("Required"),
    Annuities_AnnualInflation: Yup.string().required("Required"),

    LifetimeAccountPension_FundName: Yup.string().required("Required"),
    LifetimePension2IncomeDrawn: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    LifetimeAccountPension_Frequency: Yup.string().required("Required"),
    LifetimeAccountPension_DeductibleAmount: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
    LifetimePension2TaxableAmount: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive value", (value) => value > 0),
  });

  let ClientSuperAccount_onSubmit = (values) => {
    //gogo

    let Email = localStorage.getItem("Email");

    let SuperAccountDetails = {
      Email: localStorage.getItem("Email"),
      Super_FundName: values.SuperFundName,
      Super_MemberNO: values.SuperMemberNo,
      Super_FundType: values.SuperFundType,
      Super_ContactNO: values.SuperContactNO,
      Super_FaxNO: values.SuperFaxNO,
      Super_PostalAddress: values.SuperPostalAddress,
      Super_ABN: values.SuperABN,
      Super_SPIN: values.SuperSPIN,
      Super_Website: values.SuperWebsite,
      Super_Email: values.SuperEmail,
      Super_FundType_2: values.SuperFundType2,
      Super_CommencementDate: values.SuperCommencementDate,
      Super_EligibleServiceDate: values.SuperEligibleDate,
      Super_TFN: values.SuperTFNQuoted,
      Super_CurrentBalance: values.SuperCurrentBalance,
      Super_TaxFree: values.SuperTaxFree,
      Super_Taxed: values.SuperCurrentBalance - values.SuperTaxFree, //SuperTaxed
      Super_Restricted: values.SuperRestrictionNonPreserved,
      Super_Unrestricted: values.SuperUnRestrictionNonPreserved,
      Super_PreservedAmount: values.SuperCurrentBalance - values.SuperRestrictionNonPreserved-values.SuperUnRestrictionNonPreserved,    //SuperPreservedAmount
    };

    console.log(SuperAccountDetails);

    if (ClientSuperAccountsUpdateFlag) {
      let id = values.id;
 
      axios
        .patch(
          `${DefaultUrl}/api/Client-Super-Retirement/Update-Client-RetirementSuperAccount/${Email}/${id}`,
          SuperAccountDetails
        )
        .then((res) => console.log("Shapaik update"));

      setTimeout(() => {
        axios
          .get(`${DefaultUrl}/api/Client-Super-Retirement`)
          .then((res) => {
            console.log(res.data);

            let childObj = res.data;
            let childFilterObj = childObj.filter(
              (item) => item.Email == SuperAccountDetails.Email
            );

            setClientSuperAccounts(childFilterObj);
            console.log("child", childFilterObj);
          });
      }, 500);

      setClientSuperAccountsUpdateFlag(false);
    } else {
      // setClientSuperAccounts([...ClientSuperAccounts,SuperAccountDetails]);

      axios
        .post(
          `${DefaultUrl}/api/Client-Super-Retirement/Add-Client-SuperAccount`,
          SuperAccountDetails
        )
        .then((res) => console.log("Client Super Account Added Successfully!"));

      setTimeout(() => {
        axios
          .get(`${DefaultUrl}/api/Client-Super-Retirement`)
          .then((res) => {
            console.log(res.data);

            let childObj = res.data;
            let childFilterObj = childObj.filter(
              (item) => item.Email == SuperAccountDetails.Email
            );

            setClientSuperAccounts(childFilterObj);
            console.log("child", childFilterObj);
          });
      }, 300);
    }
    SuperhandleClose();
  };

  let PartnerSuperAccount_onSubmit = (values) => {
    let SuperAccountDetails = {
      Email: localStorage.getItem("Email"),
      Super_FundName: values.Super2FundName,
      Super_MemberNO: values.Super2MemberNo,
      Super_FundType: values.Super2FundType,
      Super_ContactNO: values.Super2ContactNO,
      Super_FaxNO: values.Super2FaxNO,
      Super_PostalAddress: values.Super2PostalAddress,
      Super_ABN: values.Super2ABN,
      Super_SPIN: values.Super2SPIN,
      Super_Website: values.Super2Website,
      Super_Email: values.Super2Email,
      Super_FundType_2: values.Super2FundType2,
      Super_CommencementDate: values.Super2CommencementDate,
      Super_EligibleServiceDate: values.Super2EligibleDate,
      Super_TFN: values.Super2TFNQuoted,
      Super_CurrentBalance: values.Super2CurrentBalance,
      Super_TaxFree: values.Super2TaxFree,
      Super_Taxed: values.Super2CurrentBalance - values.Super2TaxFree ,
      // values.Super2Taxed,
      Super_Restricted: values.Super2RestrictionNonPreserved,
      Super_Unrestricted: values.Super2UnRestrictionNonPreserved,
      Super_PreservedAmount: (values.Super2CurrentBalance - values.Super2RestrictionNonPreserved - values.Super2UnRestrictionNonPreserved),

      //  values.Super2PreservedAmount,
    };

    if (PartnerSuperAccountsUpdateFlag) {
      axios
        .patch(
          `${DefaultUrl}/api/Partner-Super-Retirement/Update-Partner-SuperAccount/${SuperAccountDetails.Email}/${values.id}`,
          SuperAccountDetails
        )
        .then((res) => {
          console.log("Updated!");
          Super2handleClose();
          setPartnerSuperAccountsUpdateFlag(false);
        });
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Partner-Super-Retirement/Add-Partner-SuperAccount`,
          SuperAccountDetails
        )
        .then((res) => {
          console.log("Partner Super Account Added Successfully!");
          Super2handleClose();
        });
      console.log(SuperAccountDetails);
    }

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Partner-Super-Retirement`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == SuperAccountDetails.Email
          );

          setPartnerSuperAccounts(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 500);
  };

  let ClientPensionAccount_onSubmit = (values) => {
    // alert("client22")
    let PensionAccountDetails = {
      Email: localStorage.getItem("Email"),
      AccountPension_FundName: values.AccountPension_FundName,
      AccountPension_MemberNO: values.AccountPension_MemberNO,
      AccountPension_FundType: values.AccountPension_FundType,
      AccountPension_ContactNO: values.AccountPension_ContactNO,
      AccountPension_FaxNO: values.AccountPension_FaxNO,
      AccountPension_PostalAddress: values.AccountPension_PostalAddress,
      AccountPension_ABN: values.AccountPension_ABN,
      AccountPension_SPIN: values.AccountPension_SPIN,
      AccountPension_Website: values.AccountPension_Website,
      AccountPension_Email: values.AccountPension_Email,
      AccountPension_PensionType: values.AccountPension_PensionType,
      AccountPension_CurrentBalance: values.AccountPension_CurrentBalance,
      AccountPension_TaxFree: values.AccountPension_TaxFree,
      AccountPension_Taxed:parseFloat(values.AccountPension_CurrentBalance - values.AccountPension_TaxFree), //values.AccountPension_Taxed,
      AccountPension_EligibleService: values.AccountPension_EligibleService,
      AccountPension_CommencementDate: values.AccountPension_CommencementDate,
      AccountPension_OriginalPrice: values.AccountPension_OriginalPrice,
      AccountPension_IncomeDrawn: values.AccountPension_IncomeDrawn,
      AccountPension_Frequency: values.AccountPension_Frequency,
      AccountPension_MinimumRequired: values.AccountPension_MinimumRequired,
      AccountPension_MaximumRequired:values.AccountPension_MaximumRequired, // new attribute
      AccountPension_RelevantNumber: values.AccountPension_RelevantNumber,
      AccountPension_LumpsumTaken: values.AccountPension_LumpsumTaken,
      AccountPension_DeductibleAmount: values.AccountPension_OriginalPrice-values.AccountPension_LumpsumTaken, // values.AccountPension_DeductibleAmount,
    };

    console.log(PensionAccountDetails)

    if (clientPensionDataListEdit) {
      let id = values.id;

      axios
        .patch(
          `${DefaultUrl}/api/Client-Pension-Retirement/Update-Client-PensionAccount/${PensionAccountDetails.Email}/${id}`,
          PensionAccountDetails
        )
        .then((res) => {
          console.log("data Updated successfully");
          PensionhandleClose();
          setclientPensionDataListEdit(false);
        });
    } else {
      // setclientPensionDataList([PensionAccountDetails]);
      axios
        .post(
          `${DefaultUrl}/api/Client-Pension-Retirement/Add-Client-PensionAccount`,
          PensionAccountDetails
        )
        .then((res) => {
          console.log("Client Pension Account Added Successfully!");
          PensionhandleClose();
        });
      console.log(PensionAccountDetails);
    }

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-Pension-Retirement`)
        .then((res) => {
          console.log("Client Pension Account get Successfully");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter(
            (item) => item.Email == PensionAccountDetails.Email
          );
          setclientPensionDataList(clientFilterObj);
          console.log(clientFilterObj);
        });
    }, 500);
  };

  let PartnerPensionAccount_onSubmit = (values) => {
    let PensionAccountDetails = {
      Email: localStorage.getItem("Email"),
      AccountPension_FundName: values.AccountPension_FundName,
      AccountPension_MemberNO: values.AccountPension_MemberNO,
      AccountPension_FundType: values.AccountPension_FundType,
      AccountPension_ContactNO: values.AccountPension_ContactNO,
      AccountPension_FaxNO: values.AccountPension_FaxNO,
      AccountPension_PostalAddress: values.AccountPension_PostalAddress,
      AccountPension_ABN: values.AccountPension_ABN,
      AccountPension_SPIN: values.AccountPension_SPIN,
      AccountPension_Website: values.AccountPension_Website,
      AccountPension_Email: values.AccountPension_Email,
      AccountPension_PensionType: values.AccountPension_FundType2,
      AccountPension_CurrentBalance: values.AccountPension_CurrentBalance,
      AccountPension_TaxFree: values.AccountPension_TaxFree,
      AccountPension_Taxed: (values.AccountPension_CurrentBalance - values.AccountPension_TaxFree),
      // values.AccountPension_Taxed,
      AccountPension_EligibleService: values.AccountPension_EligibleService,
      AccountPension_CommencementDate: values.AccountPension_CommencementDate,
      AccountPension_OriginalPrice: values.AccountPension_OriginalPrice,
      AccountPension_IncomeDrawn: values.AccountPension_IncomeDrawn,
      AccountPension_Frequency: values.AccountPension_Frequency,
      AccountPension_MinimumRequired: values.AccountPension_MinimumRequired,
      AccountPension_MaximumRequired: values.AccountPension_MaximumRequired,

      AccountPension_RelevantNumber: values.AccountPension_RelevantNumber,
      AccountPension_LumpsumTaken: values.AccountPension_LumpsumTaken,
      AccountPension_DeductibleAmount: (values.AccountPension_OriginalPrice - values.AccountPension_LumpsumTaken)
      // values.AccountPension_DeductibleAmount,
    };

    if (Pension2PartnerDataListEdit) {
      // alert("JaerKutai");
      // setPension2PartnerDataList(
      //   Pension2PartnerDataList.filter(
      //     (Pension2PartnerDataList, index) => index !== updateIndex
      //   )
      // );
      // setPension2PartnerDataList((Pension2PartnerDataList) => [
      //   ...Pension2PartnerDataList,
      //   PensionAccountDetails,
      // ]);
      axios
        .patch(
          `${DefaultUrl}/api/Partner-Pesnison-Retirement/Update-Partner-PensionAccount/${PensionAccountDetails.Email}/${values.id}`,
          PensionAccountDetails
        )
        .then((res) => console.log("Updated!"));
      setPension2PartnerDataListEdit(false);
      Pension2handleClose();
    } else {
      setPension2PartnerDataList([
        ...Pension2PartnerDataList,
        PensionAccountDetails,
      ]);

      // Used Wrong API
      axios
        .post(
          `${DefaultUrl}/api/Partner-Pesnison-Retirement/Add-Partner-PensionAccount`,
          PensionAccountDetails
        )
        .then((res) =>
          console.log("Partner Pension Account Added Successfully!")
        );
      console.log(PensionAccountDetails);
    }

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Partner-Pesnison-Retirement`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == PensionAccountDetails.Email
          );

          setPension2PartnerDataList(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);

    Pension2handleClose();
  };

  let ClientAnnuities_onSubmit = (values) => {
    let ClientAnnuitiesDetails = {
      Email: localStorage.getItem("Email"),
      Annuities_ProductProvider: values.Annuities_ProductProvider,
      Annuities_InvestmentAmount: values.Annuities_InvestmentAmount,
      Annuities_CurrentValue: values.Annuities_CurrentValue,
      Annuities_AnnuityType: values.Annuities_AnnuityType,
      Annuities_RCV: values.Annuities_RCV,
      Annuities_Term: values.Annuities_Term,
      Annuities_YearsUntilMaturity: values.Annuities_YearsUntilMaturity,
      Annuities_RegularIncome: values.Annuities_RegularIncome,
      Annuities_Frequency: values.Annuities_Frequency,
      Annuities_AnnualInflation: values.Annuities_AnnualInflation,
    };

    if (AnnuitiesDataListEdit) {
      let id = values.id;

      axios
        .patch(
          `${DefaultUrl}/api/Client-Annuities-Retirement/Update-Client-AnnuitiesAccount/${ClientAnnuitiesDetails.Email}/${id}`,
          ClientAnnuitiesDetails
        )
        .then((res) => {
          console.log("data Updated successfully");
          AnnuitieshandleClose();
          setAnnuitiesDataListEdit(false);
        });
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Client-Annuities-Retirement/Add-Client-AnnuitiesAccount`,
          ClientAnnuitiesDetails
        )
        .then((res) => {
          console.log("Client Annuities Added Successfully!");
          AnnuitieshandleClose();
        });
    }

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-Annuities-Retirement`)
        .then((res) => {
          console.log("Client Annuities get Successfully");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter(
            (item) => item.Email == ClientAnnuitiesDetails.Email
          );
          setAnnuitiesDataList(clientFilterObj);
          console.log(clientFilterObj);
        });
    }, 500);

    // console.log(ClientAnnuitiesDetails)
  };

  let PartnerAnnuities_onSubmit = (values) => {
    let PartnerAnnuitiesDetails = {
      Email: localStorage.getItem("Email"),
      Annuities_ProductProvider: values.Annuities_ProductProvider,
      Annuities_Other:values.Annuities_Other, // to be added
      Annuities_InvestmentAmount: values.Annuities_InvestmentAmount,
      Annuities_CurrentValue: values.Annuities_CurrentValue,
      Annuities_AnnuityType: values.Annuities_AnnuityType,
      Annuities_RCV: values.Annuities_RCV,
      Annuities_Term: values.Annuities_Term,
      Annuities_YearsUntilMaturity: values.Annuities_YearsUntilMaturity,
      Annuities_RegularIncome: values.Annuities_RegularIncome,
      Annuities_Frequency: values.Annuities_Frequency,
      Annuities_AnnualInflation: values.Annuities_AnnualInflation,
    };
    console.log(PartnerAnnuitiesDetails)

    if (AnnuitiesData2ListEdit) {
      // alert("bdg");
      axios
        .patch(
          `${DefaultUrl}/api/Partner-Annuities-Retirement/Update-Partner-AnnuitiesAccount/${PartnerAnnuitiesDetails.Email}/${values.id}`,
          PartnerAnnuitiesDetails
        )
        .then((res) => console.log("Updated!"));
      setAnnuitiesData2ListEdit(false);
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Partner-Annuities-Retirement/Add-Partner-AnnuitiesAccount`,
          PartnerAnnuitiesDetails
        )
        .then((res) => console.log("Partner Annuities Added Successfully!"));
    }

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Partner-Annuities-Retirement`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == PartnerAnnuitiesDetails.Email
          );

          setAnnuitiesData2List(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);
    Annuities2handleClose();
  };

  let ClientLifetimePension_onSubmit = (values) => {
let pensionAmount;
   

    let ClientLifetimePensionDetails = {
      Email: localStorage.getItem("Email"),
      LifePension_FundName: values.LifetimeAccountPension_FundName,
      LifePension_RegularIncome: values.LifetimePensionIncomeDrawn,
      LifePension_Frequency: values.LifetimeAccountPension_Frequency,
      LifePension_DeductibleAmount:
        values.LifetimeAccountPension_DeductibleAmount,
      LifePension_TaxFree_Pension: values.LifetimeAccountPension_TaxFree,
      LifePension_TaxablePensionAmount: (values.LifetimeAccountPension_TaxFree=="Yes" ? values.LifetimePensionIncomeDrawn:values.LifetimePensionTaxableAmount ) ,
      // LifePension_TaxablePensionAmount: pensionAmount,

    };

    console.log(ClientLifetimePensionDetails)

    if (ClientLifetimePensionUpdateFlag) {
      // setClientLifetimePension(
      //   ClientLifetimePension.filter(
      //     (ClientLifetimePension, index) => index !== updateIndex
      //   )
      // );
      // setClientLifetimePension((ClientLifetimePension) => [
      //   ...ClientLifetimePension,
      //   ClientLifetimePensionDetails,
      // ]);

      axios
        .patch(
          `${DefaultUrl}/api/Client-LifetimePension-Retirement/Update-Client-LifetimePension/${ClientLifetimePensionDetails.Email}/${values.id}`,
          ClientLifetimePensionDetails
        )
        .then((res) => console.log("Updated!"));

      LifetimePensionhandleClose();
      setClientLifetimePensionUpdateFlag(false);
    } else {
      // setClientLifetimePension([
      //   ...ClientLifetimePension,
      //   ClientLifetimePensionDetails,
      // ]);
      LifetimePensionhandleClose();

      axios
        .post(
          `${DefaultUrl}/api/Client-LifetimePension-Retirement/Add-Client-LifetimePension`,
          ClientLifetimePensionDetails
        )
        .then((res) =>
          console.log("Client LifeTime Pension Added Successfully!")
        );
      // console.log(ClientLifetimePensionDetails);
    }

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-LifetimePension-Retirement`)
        .then((res) => {
          // console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == ClientLifetimePensionDetails.Email
          );

          setClientLifetimePension(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);
  };

  let PartnerLifetimePension_onSubmit = (values) => {
    // LifetimePension2handleClose();

    let PartnerLifetimePensionDetails = {
      Email: localStorage.getItem("Email"),
      LifePension_FundName: values.LifetimeAccountPension_FundName,
      LifePension_RegularIncome: values.LifetimePension2IncomeDrawn,
      LifePension_Frequency: values.LifetimeAccountPension_Frequency,
      LifePension_DeductibleAmount:
        values.LifetimeAccountPension_DeductibleAmount,
      LifePension_TaxFree_Pension: values.LifetimeAccountPension_TaxFree,

      LifePension_TaxablePensionAmount: (values.LifetimeAccountPension_TaxFree=="Yes" ? values.LifetimePension2IncomeDrawn : values.LifetimePension2TaxableAmount),
    };

    console.log(PartnerLifetimePensionDetails);

    if (PartnerLifetimePensionUpdateFlag) {
      // setPartnerLifetimePension(
      //   PartnerLifetimePension.filter(
      //     (PartnerLifetimePension, index) => index !== updateIndex
      //   )
      // );
      // setPartnerLifetimePension((PartnerLifetimePension) => [
      //   ...PartnerLifetimePension,
      //   PartnerLifetimePensionDetails,
      // ]);

      axios
        .patch(
          `${DefaultUrl}/api/Partner-LifetimePension-Retirement/Update-Partner-LifetimePension/${PartnerLifetimePensionDetails.Email}/${values.id}`,
          PartnerLifetimePensionDetails
        )
        .then((res) => console.log("Updated!"));

      LifetimePension2handleClose();
      setPartnerLifetimePensionUpdateFlag(false);
    } else {
      // setPartnerLifetimePension([
      //   ...PartnerLifetimePension,
      //   PartnerLifetimePensionDetails,
      // ]);
      LifetimePension2handleClose();

      axios
        .post(
          `${DefaultUrl}/api/Partner-LifetimePension-Retirement/Add-Partner-LifetimePension`,
          PartnerLifetimePensionDetails
        )
        .then((res) => console.log("Partner Life Time Added Successfully!"));
      // console.log(PartnerLifetimePensionDetails)
    }

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Partner-LifetimePension-Retirement`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == PartnerLifetimePensionDetails.Email
          );

          setPartnerLifetimePension(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);
  };

  let initialValues = {
    SuperRadio: "No",
    Super2Radio: "No",

    PensionRadio: "No",
    Pension2Radio: "No",

    AnnuitiesRadio: "No",
    Annuities2Radio: "No",

    LifetimePensionRadio: "No",
    LifetimePension2Radio: "No",
  };

  let onSubmit = (Values) => {
    setSteps(9);
    localStorage.setItem("Steps", 9);
   
    Navigate("/SMSF");
    let clientData = {
      Email: localStorage.getItem("Email"),
      Super: Values.SuperRadio,
      AccountPension: Values.PensionRadio,
      Annuities: Values.AnnuitiesRadio,
      LifetimePension: Values.LifetimePensionRadio,
    };

    let partnerData = {
      Email: localStorage.getItem("Email"),
      Super: Values.Super2Radio,
      AccountPension: Values.Pension2Radio,
      Annuities: Values.Annuities2Radio,
      LifetimePension: Values.LifetimePension2Radio,
    };
    console.log(clientData);
    console.log(partnerData);

    if (isPartnered == true) {
      axios
        .post(
          `${DefaultUrl}/api/Client-Retirement/Add-Client-Retirement`,
          clientData
        )
        .then((ref) => {
          console.log("Client Data Added Successfully");
        });

      axios
        .post(
          `${DefaultUrl}/api/Partner-Retirement/Add-Partner`,
          partnerData
        )
        .then((res) => {
          console.log("Partner Data Added Successfully");
        });
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Client-Retirement/Add-Client-Retirement`,
          clientData
        )
        .then((ref) => {
          console.log("Client Data Added Successfully");
        });
    }
  };
  // InvestmentOptionDetails Client FORMIK DATA
  let initialValuesInvestmentOptionDetails = {
    InvestmentOptionDetailsInvestment: "",
    InvestmentOptionDetailsCurrentValue: "",
  };
  let validateYupSchemaInvestmentOptionDetails = Yup.object({
    InvestmentOptionDetailsInvestment: Yup.string().required("*Required"),
    InvestmentOptionDetailsCurrentValue: Yup.number().required("*Required"),
  });
  let On_submit_validateYupSchemaInvestmentOptionDetails = (values) => {
    let InvestmentOptionDetailsData = {
      Email: localStorage.getItem("Email"),
      InvestmentOption: values.InvestmentOptionDetailsInvestment,
      CurrentValue: values.InvestmentOptionDetailsCurrentValue,
    };

    if (InvestmentModalEdit) {
      axios
        .patch(
          `${DefaultUrl}/api/Client-Retirement-Investment/Update-Client-Super-Investment/${InvestmentOptionDetailsData.Email}/${values.id}`,
          InvestmentOptionDetailsData
        )
        .then((res) => console.log("Updated!"));

      setTimeout(() => {
        axios
          .get(`${DefaultUrl}/api/Client-Retirement-Investment`)
          .then((res) => {
            console.log(res.data);

            let childObj = res.data;
            let childFilterObj = childObj.filter(
              (item) => item.Email == InvestmentOptionDetailsData.Email
            );

            setInvestmentModal(childFilterObj);
            console.log("child", childFilterObj);
          });
      }, 300);

      // handleClose5();
      setInvestmentModalEdit(false);
      handleClose();
      handleShow();
    } else {
      // setInvestmentModal([...InvestmentModal, InvestmentOptionDetailsData]);
      setInvestmentModalEdit(false);
      // console.log(InvestmentOptionDetailsData);
      axios
        .post(
          `${DefaultUrl}/api/Client-Retirement-Investment/Add-Client-Super-Investment`,
          InvestmentOptionDetailsData
        )
        .then(() => {
          console.log("data added successfully!");
        });

      setTimeout(() => {
        axios
          .get(`${DefaultUrl}/api/Client-Retirement-Investment`)
          .then((res) => {
            console.log(res.data);

            let childObj = res.data;
            let childFilterObj = childObj.filter(
              (item) => item.Email == InvestmentOptionDetailsData.Email
            );

            setInvestmentModal(childFilterObj);
            console.log("child", childFilterObj);
          });
      }, 300);

      handleClose();
    }
  };
  //PARTNER INVESTMENT
  let initialValuesInvestmentPartnerOptionDetails = {
    InvestmentOptionDetailsInvestmentPartner: "",
    InvestmentOptionDetailsCurrentValuePartner: "",
  };
  let validateYupSchemaInvestmentPartnerOptionDetails = Yup.object({
    InvestmentOptionDetailsInvestmentPartner:
      Yup.string().required("*Required"),
    InvestmentOptionDetailsCurrentValuePartner:
      Yup.number().required("*Required"),
  });

  //
  let On_submit_validateYupSchemaInvestmentPartnerOptionDetails = (values) => {
    let InvestmentOptionDetailsData = {
      Email: localStorage.getItem("Email"),
      InvestmentOption: values.InvestmentOptionDetailsInvestmentPartner,
      CurrentValue: values.InvestmentOptionDetailsCurrentValuePartner,
    };

    if (InvestmentModalPartnerEdit) {
      axios
        .patch(
          `${DefaultUrl}/api/Partner-Retirement-Investment/Update-Partner-Super-Investment/${values.Email}/${values.id}`,
          InvestmentOptionDetailsData
        )
        .then((res) => console.log("Updated!"));

      setInvestmentModalPartnerEdit(false);
      handleClosePartner();
      handleShowPartner();
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Partner-Retirement-Investment/Add-Partner-Super-Investment`,
          InvestmentOptionDetailsData
        )
        .then((ref) => {
          console.log("data added successfully!");
        });

      handleClosePartner();
    }
    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Partner-Retirement-Investment`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == InvestmentOptionDetailsData.Email
          );

          setInvestmentModalPartner(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);
  };
  //PARTNER INVESTMENT
  // InvestmentOptionDetails FORMIK DATA

  // CLIENT SUPER ACCOUNT --> CONTRIBUTIONS
  let initialValuesContributionOptionDetails = {
    clientinvestmentAttached: "No",

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
  let validateYupSchemaContributionOptionDetails = Yup.object({
    Non_Concessional1: Yup.number().when("clientinvestmentAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    Other1: Yup.number().when("clientinvestmentAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    EmployerContributions1: Yup.number().when("clientinvestmentAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    SalarySacAndPersonalDed1: Yup.number().when("clientinvestmentAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),

    Non_Concessional2: Yup.number().when("clientinvestmentAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    Other2: Yup.number().when("clientinvestmentAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    EmployerContributions2: Yup.number().when("clientinvestmentAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    SalarySacAndPersonalDed2: Yup.number().when("clientinvestmentAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),

    Non_Concessional3: Yup.number().when("clientinvestmentAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    Other3: Yup.number().when("clientinvestmentAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    EmployerContributions3: Yup.number().when("clientinvestmentAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    SalarySacAndPersonalDed3: Yup.number().when("clientinvestmentAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
  });

  let On_submit_validateYupSchemaContributionOptionDetails = (values) => {
    handleClose4();

    let ContributionOptionDetailsData = {
      Email: localStorage.getItem("Email"),
      ContributeFund: values.clientinvestmentAttached,

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
    console.log(ContributionOptionDetailsData);
    if (contributionModalUpdateFlag) {
      axios
        .patch(
          `${DefaultUrl}/api/Client-Retirement-Contributions/Update-Client-Super-Contribution/${ContributionOptionDetailsData.Email}/${values.id}`,
          ContributionOptionDetailsData
        )
        .then((res) => console.log("Updated!"));

      setcontributionModalUpdateFlag(false);
      // setcontributionModal([...contributionModal, ContributionOptionDetailsData]);
      // console.log(ContributionOptionDetailsData);
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Client-Retirement-Contributions/Add-Client-Super-Contribution`,
          ContributionOptionDetailsData
        )
        .then(() => {
          console.log("data added successfully!");
        });
    }

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-Retirement-Contributions`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == ContributionOptionDetailsData.Email
          );
          setcontributionModal(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);
  };
  //PARTNER SUPER ACCOUNT --> CONTRIBUTION
  let initialValuesContributionPartnerOptionDetails = {
    partnerInvestmentAttached: "No",

    Non_ConcessionalPartner1: "",
    OtherPartner1: "",
    EmployerContributionsPartner1: "",
    SalarySacAndPersonalDedPartner1: "",

    Non_ConcessionalPartner2: "",
    OtherPartner2: "",
    EmployerContributionsPartner2: "",
    SalarySacAndPersonalDedPartner2: "",

    Non_ConcessionalPartner3: "",
    OtherPartner3: "",
    EmployerContributionsPartner3: "",
    SalarySacAndPersonalDedPartner3: "",
  };
  let validateYupSchemaContributionPartnerOptionDetails = Yup.object({
    Non_ConcessionalPartner1: Yup.number().when("partnerInvestmentAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    OtherPartner1: Yup.number().when("partnerInvestmentAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    EmployerContributionsPartner1: Yup.number().when(
      "partnerInvestmentAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    SalarySacAndPersonalDedPartner1: Yup.number().when(
      "partnerInvestmentAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),

    Non_ConcessionalPartner2: Yup.number().when("partnerInvestmentAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    OtherPartner2: Yup.number().when("partnerInvestmentAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    EmployerContributionsPartner2: Yup.number().when(
      "partnerInvestmentAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    SalarySacAndPersonalDedPartner2: Yup.number().when(
      "partnerInvestmentAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),

    Non_ConcessionalPartner3: Yup.number().when("partnerInvestmentAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    OtherPartner3: Yup.number().when("partnerInvestmentAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    EmployerContributionsPartner3: Yup.number().when(
      "partnerInvestmentAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    SalarySacAndPersonalDedPartner3: Yup.number().when(
      "partnerInvestmentAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
  });

  let On_submit_validateYupSchemaContributionPartnerOptionDetails = (
    values
  ) => {
    // console.log(values)

    let ContributionOptionDetailsData = {
      Email: localStorage.getItem("Email"),
      ContributeFund: values.partnerInvestmentAttached,

      NonConcessional1: values.Non_ConcessionalPartner1,
      Other1: values.OtherPartner1,
      EmployerContributions1: values.EmployerContributionsPartner1,
      SalaryPersonalDed1: values.SalarySacAndPersonalDedPartner1,

      NonConcessional2: values.Non_ConcessionalPartner2,
      Other2: values.OtherPartner2,
      EmployerContributions2: values.EmployerContributionsPartner2,
      SalaryPersonalDed2: values.SalarySacAndPersonalDedPartner2,

      NonConcessional3: values.Non_ConcessionalPartner3,
      Other3: values.OtherPartner3,
      EmployerContributions3: values.EmployerContributionsPartner3,
      SalaryPersonalDed3: values.SalarySacAndPersonalDedPartner3,
    };
    // setcontributionPartnerModalUpdateFlag
    if (contributionPartnerModalUpdateFlag) {
      axios
        .patch(
          `${DefaultUrl}/api/Partner-Retirement-Contributions/Update-Partner-Super-Contribution/${ContributionOptionDetailsData.Email}/${values.id}`,
          ContributionOptionDetailsData
        )
        .then((res) => console.log("Updated!"));
      setcontributionPartnerModalUpdateFlag(false);
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Partner-Retirement-Contributions/Add-Partner-Super-Contribution`,
          ContributionOptionDetailsData
        )
        .then((ref) => {
          console.log("data added successfully!");
        });
    }

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Partner-Retirement-Contributions`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == ContributionOptionDetailsData.Email
          );

          setcontributionPartnerModal(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);

    handleClosePartner4();
  };

  //PARTNER SUPER ACCOUNT --> CONTRIBUTION
  // CLIENT SUPER ACCOUNT --> BENEFICIARIES
  let initialValuesBeneficiariesOptionDetails = {
    clientNestedbeneficiariesAttached: "No",
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
// 123
    Beneficiary4: "",
    ShareofBenefit4: "",
    RelationshipOptionDetailsRelationship4: "",

    Beneficiary5: "",
    ShareofBenefit5: "",
    RelationshipOptionDetailsRelationship5: "",
  };
  let validateYupSchemaBeneficiariesOptionDetails = Yup.object({
    NomiationTypeBeneficiary: Yup.string().when(
      "clientNestedbeneficiariesAttached",
      {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),

    BeneficiariesOptionDetailsBeneficiaries: Yup.string().when(
      "clientNestedbeneficiariesAttached",
      {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
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
            "Must be a positive number",
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
            "Must be a positive number",
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
            "Must be a positive number",
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
            "Must be a positive number",
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
            "Must be a positive number",
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
  let On_submit_validateYupSchemaBeneficiariesOptionDetails = (values) => {
    let BeneficiaryData = {
      Email: localStorage.getItem("Email"),
      NominatedBeneficiary: values.clientNestedbeneficiariesAttached,
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
    if (BeneficiaryDataListUpdateFlag) {
      axios
        .patch(
          `${DefaultUrl}/api/Client-Retirement-Beneficiaries/Update-Client-Super-Beneficiaries/${BeneficiaryData.Email}/${values.id}`,
          BeneficiaryData
        )
        .then((res) => console.log("Updated!"));

      setBeneficiaryDataListUpdateFlag(false);
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Client-Retirement-Beneficiaries/Add-Client-Super-Beneficiaries`,
          BeneficiaryData
        )
        .then((ref) => {
          console.log("data added successfully!");
        });
    }
    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-Retirement-Beneficiaries`)
        .then((res) => {
          console.log("found data");

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == BeneficiaryData.Email
          );

          setBeneficiaryDataList(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);

    handleClose3();
  };
  // PARTNER SUPER ACCOUNT->BENEFICIARIES
  let initialValuesBeneficiariesPartnerOptionDetails = {
    partnerNestedBeneficiariesAttached: "No",

    beneficiariesPartnerAttached1: "",
    NomiationTypePartnerBeneficiary: "",

    BeneficiaryPartner1: "",
    ShareofBenefitPartner1: "",
    RelationshipOptionDetailsRelationshipPartner1: "",

    BeneficiaryPartner2: "",
    ShareofBenefitPartner2: "",
    RelationshipOptionDetailsRelationshipPartner2: "",

    BeneficiaryPartner3: "",
    ShareofBenefitPartner3: "",
    RelationshipOptionDetailsRelationshipPartner3: "",

    BeneficiaryPartner4: "",
    ShareofBenefitPartner4: "",
    RelationshipOptionDetailsRelationshipPartner4: "",

    BeneficiaryPartner5: "",
    ShareofBenefitPartner5: "",
    RelationshipOptionDetailsRelationshipPartner5: "",
  };
  let validateYupSchemaBeneficiariesOptionPartnerDetails = Yup.object({
    beneficiariesPartnerAttached1: Yup.string().when(
      "partnerNestedBeneficiariesAttached",
      {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    NomiationTypePartnerBeneficiary: Yup.string().when(
      "partnerNestedBeneficiariesAttached",
      {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),

    BeneficiaryPartner1: Yup.string().when("NomiationTypePartnerBeneficiary", {
      is: (val) => val && val >= parseFloat("1"),
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ShareofBenefitPartner1: Yup.number().when(
      "NomiationTypePartnerBeneficiary",
      {
        is: (val) => val && val >= parseFloat("1"),
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),

    RelationshipOptionDetailsRelationshipPartner1: Yup.string().when(
      "NomiationTypePartnerBeneficiary",
      {
        is: (val) => val && val >= parseFloat("1"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),

    BeneficiaryPartner2: Yup.string().when("NomiationTypePartnerBeneficiary", {
      is: (val) => val && val >= parseFloat("2"),
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ShareofBenefitPartner2: Yup.number().when(
      "NomiationTypePartnerBeneficiary",
      {
        is: (val) => val && val >= parseFloat("2"),
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    RelationshipOptionDetailsRelationshipPartner2: Yup.string().when(
      "NomiationTypePartnerBeneficiary",
      {
        is: (val) => val && val >= parseFloat("2"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),

    BeneficiaryPartner3: Yup.string().when("NomiationTypePartnerBeneficiary", {
      is: (val) => val && val >= parseFloat("3"),
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ShareofBenefitPartner3: Yup.number().when(
      "NomiationTypePartnerBeneficiary",
      {
        is: (val) => val && val >= parseFloat("3"),
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    RelationshipOptionDetailsRelationshipPartner3: Yup.string().when(
      "NomiationTypePartnerBeneficiary",
      {
        is: (val) => val && val >= parseFloat("3"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),

    BeneficiaryPartner4: Yup.string().when("NomiationTypePartnerBeneficiary", {
      is: (val) => val && val >= parseFloat("4"),
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ShareofBenefitPartner4: Yup.number().when(
      "NomiationTypePartnerBeneficiary",
      {
        is: (val) => val && val >= parseFloat("4"),
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    RelationshipOptionDetailsRelationshipPartner4: Yup.string().when(
      "NomiationTypePartnerBeneficiary",
      {
        is: (val) => val && val >= parseFloat("4"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),

    BeneficiaryPartner5: Yup.string().when("NomiationTypePartnerBeneficiary", {
      is: (val) => val && val >= parseFloat("5"),
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    ShareofBenefitPartner5: Yup.number().when(
      "NomiationTypePartnerBeneficiary",
      {
        is: (val) => val && val >= parseFloat("5"),
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    RelationshipOptionDetailsRelationshipPartner5: Yup.string().when(
      "NomiationTypePartnerBeneficiary",
      {
        is: (val) => val && val >= parseFloat("5"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
  });

  let On_submit_validateYupSchemaPartnerBeneficiariesOptionDetails = (
    values
  ) => {
    let BeneficiaryData = {
      Email: localStorage.getItem("Email"),

      NominatedBeneficiary: values.partnerNestedBeneficiariesAttached,
      NominationType: values.beneficiariesPartnerAttached1,
      No_ofBeneficiaries: values.NomiationTypePartnerBeneficiary,

      Beneficiary1: values.BeneficiaryPartner1,
      BenefitShare1: values.ShareofBenefitPartner1,
      Relationship1: values.RelationshipOptionDetailsRelationshipPartner1,

      Beneficiary2: values.BeneficiaryPartner2,
      BenefitShare2: values.ShareofBenefitPartner2,
      Relationship2: values.RelationshipOptionDetailsRelationshipPartner2,

      Beneficiary3: values.BeneficiaryPartner3,
      BenefitShare3: values.ShareofBenefitPartner3,
      Relationship3: values.RelationshipOptionDetailsRelationshipPartner3,

      Beneficiary4: values.BeneficiaryPartner4,
      BenefitShare4: values.ShareofBenefitPartner4,
      Relationship4: values.RelationshipOptionDetailsRelationshipPartner4,

      Beneficiary5: values.BeneficiaryPartner5,
      BenefitShare5: values.ShareofBenefitPartner5,
      Relationship5: values.RelationshipOptionDetailsRelationshipPartner5,
    };

    // setBeneficiaryDataPartnerListUpdateFlag

    if (BeneficiaryDataPartnerListUpdateFlag) {
      axios
        .patch(
          `${DefaultUrl}/api/Partner-Retirement-Beneficiaries/Update-Partner-Super-Beneficiaries/${BeneficiaryData.Email}/${values.id}`,
          BeneficiaryData
        )
        .then((res) => console.log("Updated!"));

      setBeneficiaryDataPartnerListUpdateFlag(false);
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Partner-Retirement-Beneficiaries/Add-Partner-Super-Beneficiaries`,
          BeneficiaryData
        )
        .then((ref) => {
          console.log("data added successfully!");
        });
    }

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Partner-Retirement-Beneficiaries`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == BeneficiaryData.Email
          );

          setBeneficiaryDataPartnerList(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);

    handleClosePartner3();
  };

  // PARTNER SUPER ACCOUNT->BENEFICIARIES

  // CLIENT SUPER ACCOUNT->INSURANCE
  let initialValuesInsuranceOptionDetails = {
    insuranceAttachedOption: "No",
    insuranceLifeTPDAttached: "No",

    // Row 1
    CoverType: "",
    LifeCover: "",
    TPDCover: "",

    //Row 2
    CostPA: "",
    PremiumType: "",
    anyLoadingOrExclusionsAttached: "No",

    //Row 3
    Pleaseprovidedetails: "",
    incomeProtectionAttached: "No",
    MonthlyBenefit: "",

    //Row 4
    waitingPeriod: "",
    benefitPeriod: "",
    agreedOrIndemnity: "",

    //Row 5
    CostPASecond: "",
    PremiumTypeSecond: "",
    IncludesSuperContinuance: "No",

    //Row 6
    Isthebenefitindexed: "No",
    AnyLoadingOrExclusions: "No",
    PleaseprovidedetailsSecond: "",
  };
  let validateYupSchemaInsuranceOptionDetails = Yup.object({
    insuranceAttachedOption: Yup.string("*Required"),
    insuranceLifeTPDAttached: Yup.string().when("insuranceAttachedOption", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),

    // Row 1
    CoverType: Yup.string().when("insuranceLifeTPDAttached", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    LifeCover: Yup.number().when("insuranceLifeTPDAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    TPDCover: Yup.number().when("insuranceLifeTPDAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),

    //Row 2
    CostPA: Yup.number().when("insuranceLifeTPDAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    PremiumType: Yup.string().when("insuranceLifeTPDAttached", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    // anyLoadingOrExclusionsAttached: Yup.string()
    // .when("insuranceLifeTPDAttached", {
    //   is: val => val && val.length == 3,
    //   then: Yup.string().required("Required")
    //   , otherwise: Yup.string()
    //     .notRequired()
    // }),

    //Row 3
    Pleaseprovidedetails: Yup.string().when("anyLoadingOrExclusionsAttached", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),

    // incomeProtectionAttached:Yup.string().required("*Required"),
    MonthlyBenefit: Yup.number().when("incomeProtectionAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),

    //Row 4
    waitingPeriod: Yup.string().when("incomeProtectionAttached", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    benefitPeriod: Yup.string().when("incomeProtectionAttached", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    agreedOrIndemnity: Yup.string().when("incomeProtectionAttached", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),

    //Row 5
    CostPASecond: Yup.number().when("incomeProtectionAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    PremiumTypeSecond: Yup.string().when("incomeProtectionAttached", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    // IncludesSuperContinuance:Yup.string().required("*Required"),

    //Row 6
    // Isthebenefitindexed:Yup.string().required("*Required"),
    // AnyLoadingOrExclusions:Yup.string().required("*Required"),
    PleaseprovidedetailsSecond: Yup.string().when("incomeProtectionAttached", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
  });
  let On_submit_validateYupSchemaInsuranceOptionDetails = (values) => {
    // handleClose2();

    let InsuranceData = {
      Email: localStorage.getItem("Email"),
      InsuranceAttached: values.insuranceAttachedOption,
      Life_TPD_Insurance: values.insuranceLifeTPDAttached,

      // Row 1
      CoverType: values.CoverType,
      LifeCover: values.LifeCover,
      TPDCover: values.TPDCover,

      //Row 2
      CostPA: values.CostPA,
      PremiumType: values.PremiumType,
      LoadingExecutions: values.anyLoadingOrExclusionsAttached,

      //Row 3
      LoadingExecution_Details: values.Pleaseprovidedetails,
      IncomeProtection: values.incomeProtectionAttached,
      MonthlyBenefit: values.MonthlyBenefit,

      //Row 4
      WaitingPeriod: values.waitingPeriod,
      BenefitPeriod: values.benefitPeriod,
      Indemnity: values.agreedOrIndemnity,

      //Row 5
      CostPA_2: values.CostPASecond,
      PremiumType_2: values.PremiumTypeSecond,
      Includes_SuperContinuance: values.IncludesSuperContinuance,

      //Row 6
      BenefitIndexed: values.Isthebenefitindexed,
      LoadingExecutions_2: values.AnyLoadingOrExclusions,
      LoadingExecutions_2_Details: values.PleaseprovidedetailsSecond,
    };

    if (InsuranceDataListUpdateFlag) {
      // alert(InsuranceData.Email);
      axios
        .patch(
          `${DefaultUrl}/api/Client-Retirement-Insurance/Update-Client-Super-Insurance/${InsuranceData.Email}/${values.id}`,
          InsuranceData
        )
        .then((res) => console.log("Updated!"));

      setInsuranceDataListUpdateFlag(false);
    } else {
      setInsuranceDataList([InsuranceData]);
      console.log(InsuranceData);

      axios
        .post(
          `${DefaultUrl}/api/Client-Retirement-Insurance/Add-Client-Super-Insurance`,
          InsuranceData
        )
        .then(() => {
          console.log("data added successfully!");
        });
    }

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-Retirement-Insurance`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == InsuranceData.Email
          );

          setInsuranceDataList(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);

    handleClose2();
  };
  //  SUPER ACCOUNT -> PARTNER INSURANCE
  let initialValuesInsurancePartnerOptionDetails = {
    insurancePartnerAttachedOption: "No",
    insuranceLifeTPDPartnerAttached: "No",

    // Row 1
    CoverTypePartner: "",
    LifeCoverPartner: "",
    TPDCoverPartner: "",

    //Row 2
    CostPAPartner: "",
    PremiumTypePartner: "",
    anyLoadingOrExclusionsPartnerAttached: "No",

    //Row 3
    PleaseprovidePartnerdetails: "",
    incomeProtectionPartnerAttached: "No",
    MonthlyBenefitPartner: "",

    //Row 4
    waitingPeriodPartner: "",
    benefitPeriodPartner: "",
    agreedOrIndemnityPartner: "",

    //Row 5
    CostPASecondPartner: "",
    PremiumTypeSecondPartner: "",
    IncludesSuperContinuancePartner: "No",

    //Row 6
    IsthebenefitindexedPartner: "No",
    AnyLoadingOrExclusionsPartner: "No",
    PleaseprovidedetailsSecondPartner: "",
  };
  let validateYupSchemaInsurancePartnerOptionDetails = Yup.object({
    // insurancePartnerAttachedOption:Yup.string("*Required"),

    insuranceLifeTPDPartnerAttached: Yup.string().when(
      "insurancePartnerAttachedOption",
      {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),

    // Row 1
    CoverTypePartner: Yup.string().when("insuranceLifeTPDPartnerAttached", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    LifeCoverPartner: Yup.number().when("insuranceLifeTPDPartnerAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    TPDCoverPartner: Yup.number().when("insuranceLifeTPDPartnerAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),

    //Row 2
    CostPAPartner: Yup.number().when("insuranceLifeTPDPartnerAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),
    PremiumTypePartner: Yup.string().when("insuranceLifeTPDPartnerAttached", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    // anyLoadingOrExclusionsPartnerAttached:Yup.string("*Required"),

    //Row 3
    PleaseprovidePartnerdetails: Yup.string().when(
      "anyLoadingOrExclusionsPartnerAttached",
      {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    // incomeProtectionPartnerAttached:Yup.string("*Required"),
    MonthlyBenefitPartner: Yup.number().when(
      "incomeProtectionPartnerAttached",
      {
        is: (val) => val && val.length === 3,
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),

    //Row 4
    waitingPeriodPartner: Yup.string().when("incomeProtectionPartnerAttached", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    benefitPeriodPartner: Yup.string().when("incomeProtectionPartnerAttached", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    agreedOrIndemnityPartner: Yup.string().when(
      "incomeProtectionPartnerAttached",
      {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),

    //Row 5
    CostPASecondPartner: Yup.number().when("incomeProtectionPartnerAttached", {
      is: (val) => val && val.length === 3,
      then: Yup.number()
        .required("Required")
        .test(
          "Is positive?",
          "Must be a positive number",
          (value) => value > 0
        ),
      otherwise: Yup.number().notRequired(),
    }),

    PremiumTypeSecondPartner: Yup.string().when(
      "incomeProtectionPartnerAttached",
      {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    // IncludesSuperContinuancePartner:Yup.string().required("*Required"),

    //Row 6
    // IsthebenefitindexedPartner:Yup.string().required("*Required"),
    // AnyLoadingOrExclusionsPartner:Yup.string().required("*Required"),
    PleaseprovidedetailsSecondPartner: Yup.string().when(
      "AnyLoadingOrExclusionsPartner",
      {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
  });
  let On_submit_validateYupSchemaInsurancePartnerOptionDetails = (values) => {
    handleClosePartner2();
    let InsuranceData = {
      Email: localStorage.getItem("Email"),
      InsuranceAttached: values.insurancePartnerAttachedOption,
      Life_TPD_Insurance: values.insuranceLifeTPDPartnerAttached,

      // Row 1
      CoverType: values.CoverTypePartner,
      LifeCover: values.LifeCoverPartner,
      TPDCover: values.TPDCoverPartner,

      //Row 2
      CostPA: values.CostPAPartner,
      PremiumType: values.PremiumTypePartner,
      LoadingExecutions: values.anyLoadingOrExclusionsPartnerAttached,

      //Row 3
      LoadingExecution_Details: values.PleaseprovidePartnerdetails,
      IncomeProtection: values.incomeProtectionPartnerAttached,
      MonthlyBenefit: values.MonthlyBenefitPartner,

      //Row 4
      WaitingPeriod: values.waitingPeriodPartner,
      BenefitPeriod: values.benefitPeriodPartner,
      Indemnity: values.agreedOrIndemnityPartner,

      //Row 5
      CostPA_2: values.CostPASecondPartner,
      PremiumType_2: values.PremiumTypeSecondPartner,
      Includes_SuperContinuance: values.IncludesSuperContinuancePartner,

      //Row 6
      BenefitIndexed: values.IsthebenefitindexedPartner,
      LoadingExecutions_2: values.AnyLoadingOrExclusionsPartner,
      LoadingExecutions_2_Details: values.PleaseprovidedetailsSecondPartner,
    };
    if (InsuranceDataPartnerListUpdateFlag) {
      axios
        .patch(
          `${DefaultUrl}/api/Partner-Retirement-Insurance/Update-Partner-Super-Insurance/${InsuranceData.Email}/${values.id}`,
          InsuranceData
        )
        .then((ref) => {
          console.log("Updated");
        });
      handleClosePartner2();
      setInsuranceDataPartnerListUpdateFlag(false);
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Partner-Retirement-Insurance/Add-Partner-Super-Insurance`,
          InsuranceData
        )
        .then((ref) => {
          console.log("data added successfully!");
        });
    }

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Partner-Retirement-Insurance`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == InsuranceData.Email
          );

          setInsuranceDataPartnerList(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);
  };
  // PENSION ->CLIENT NESTED INVESTMENT MODAL
  let initialValuesClientPensionNestedModal = {
    InvestmentClientPensionOption: "",
    InvestmentClientPensionCurrentValue: "",
  };
  let validateYupSchemaClientPensionNestedModal = Yup.object({
    InvestmentClientPensionOption: Yup.string().required("*Required"),
    InvestmentClientPensionCurrentValue: Yup.number().required("*Required"),
  });
  let On_submit_validateClientPensionNestedModal = (values) => {
    let InvestmentOptionDetailsData = {
      Email: localStorage.getItem("Email"),
      InvestmentOption: values.InvestmentClientPensionOption,
      CurrentValue: values.InvestmentClientPensionCurrentValue,
    };

    if (PensionClientInvestmentModalEdit) {
      let id = values.id;

      axios
        .patch(
          `${DefaultUrl}/api/Client-Retirement-PensionInvestment/Update-Client-PensionAccount-Investment/${InvestmentOptionDetailsData.Email}/${id}`,
          InvestmentOptionDetailsData
        )
        .then((res) => {
          console.log("data Updated successfully");
          handleClosePensionClient();
          setPensionClientInvestmentModalEdit(false);
          handleShowPensionClient();
        });

      // handleClosePensionClient();
    } else {
      // setPensionClientInvestmentModal([...PensionClientInvestmentModal,InvestmentOptionDetailsData]);
      // setPensionClientInvestmentModalEdit(false);
      console.log(InvestmentOptionDetailsData);

      axios
        .post(
          `${DefaultUrl}/api/Client-Retirement-PensionInvestment/Add-Client-PensionAccount-Investment`,
          InvestmentOptionDetailsData
        )
        .then((ref) => {
          console.log(" Client Pension -> Investment data added successfully!");
        });
    }

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-Retirement-PensionInvestment`)
        .then((res) => {
          console.log("Client Pension Account get Successfully");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter(
            (item) => item.Email == InvestmentOptionDetailsData.Email
          );
          setPensionClientInvestmentModal(clientFilterObj);
          console.log(clientFilterObj);
        });
    }, 500);
  };
  //PENSION PARTNER NESTED INVESTMNENT MODAL
  let initialValuesPartnerPensionNestedModal = {
    InvestmentPartnerPensionOption: "",
    InvestmentPartnerPensionCurrentValue: "",
  };
  let validateYupSchemaPartnerPensionNestedModal = Yup.object({
    InvestmentPartnerPensionOption: Yup.string().required("*Required"),
    InvestmentPartnerPensionCurrentValue: Yup.number().required("*Required"),
  });
  let On_submit_validatePartnerPensionNestedModal = (values) => {
    let InvestmentOptionDetailsData = {
      Email: localStorage.getItem("Email"),
      InvestmentOption: values.InvestmentPartnerPensionOption,
      CurrentValue: values.InvestmentPartnerPensionCurrentValue,
    };

    if (PensionPartnerInvestmentModalEdit) {
      axios
        .patch(
          `${DefaultUrl}/api/Partner-Retirement-PensionInvestment/Update-Partner-PensionAccount-Investment/${InvestmentOptionDetailsData.Email}/${values.id}`,
          InvestmentOptionDetailsData
        )
        .then((res) => console.log("Updated!"));

      setPensionPartnerInvestmentModalEdit(false);
      handleClosePensionPartner();
      handleShowPensionPartner();
    } else {
      // setPensionPartnerInvestmentModal([
      //   ...PensionPartnerInvestmentModal,
      //   InvestmentOptionDetailsData,
      // ]);
      // setPensionPartnerInvestmentModalEdit(false);
      // console.log(InvestmentOptionDetailsData);

      axios
        .post(
          `${DefaultUrl}/api/Partner-Retirement-PensionInvestment/Add-Partner-PensionAccount-Investment`,
          InvestmentOptionDetailsData
        )
        .then((ref) => {
          console.log(
            "Partner -> Pension -> Investment data added successfully!"
          );
        });
      handleClosePensionPartner();
    }

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Partner-Retirement-PensionInvestment`)
        .then((res) => {
          // console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == InvestmentOptionDetailsData.Email
          );

          setPensionPartnerInvestmentModal(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 500);
  };
  //PARTNER-> NESTED PENSION BENEFICIARY
  let initialValuesPensionBeneficiaryPartner = {
    partnerPensionBeneficiaryAttached: "No",

    NomiationTypePensionPartnerBeneficiary: "",
    BeneficiariesOptionDetailsBeneficiaries: "",

    BeneficiaryPensionPartner1: "",
    ShareofBenefitPensionPartner1: "",
    RelationshipOptionDetailsPensionPartner1: "",

    BeneficiaryPensionPartner2: "",
    ShareofBenefit2PensionPartner2: "",
    RelationshipOptionDetailsPensionPartner2: "",

    BeneficiaryPensionPartner3: "",
    ShareofBenefitPensionPartner3: "",
    RelationshipOptionDetailsPensionPartner3: "",

    BeneficiaryPensionPartner4: "",
    ShareofBenefitPensionPartner4: "",
    RelationshipOptionDetailsPensionPartner4: "",

    BeneficiaryPensionPartner5: "",
    ShareofBenefitPensionPartner5: "",
    RelationshipOptionDetailsPensionPartner5: "",
  };
  let validateSchemaPensionPartnerBeneficiary = Yup.object({
    NomiationTypePensionPartnerBeneficiary: Yup.string().when(
      "partnerPensionBeneficiaryAttached",
      {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    // BeneficiariesOptionDetailsBeneficiaries: Yup.string().when(
    //   "partnerPensionBeneficiaryAttached",
    //   {
    //     is: (val) => val && val.length == 3,
    //     then: Yup.string().required("Required"),
    //     otherwise: Yup.string().notRequired(),
    //   }
    // ),

    BeneficiariesOptionDetailsBeneficiaries: Yup.string().when(
      ["partnerPensionBeneficiaryAttached","NomiationTypePensionPartnerBeneficiary"],
      {
        is: (value1,value2) => value1 == "No" || value2 == "Legal Representative(Your Estate)",
        then: Yup.string().notRequired(),
        otherwise: Yup.string().required("Required"),
      }
    ),

    BeneficiaryPensionPartner1: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("1"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    ShareofBenefitPensionPartner1: Yup.number().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("1"),
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    RelationshipOptionDetailsPensionPartner1: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("1"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),

    BeneficiaryPensionPartner2: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("2"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    ShareofBenefit2PensionPartner2: Yup.number().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("2"),
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    RelationshipOptionDetailsPensionPartner2: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("2"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),

    BeneficiaryPensionPartner3: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("3"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    ShareofBenefitPensionPartner3: Yup.number().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("3"),
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    RelationshipOptionDetailsPensionPartner3: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("3"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),

    BeneficiaryPensionPartner4: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("4"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    ShareofBenefitPensionPartner4: Yup.number().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("4"),
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    RelationshipOptionDetailsPensionPartner4: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("4"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),

    BeneficiaryPensionPartner5: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("5"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    ShareofBenefitPensionPartner5: Yup.number().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("5"),
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    RelationshipOptionDetailsPensionPartner5: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("5"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
  });
  let On_submit_PenionBeneficiaryPartner = (values) => {
    let BeneficiaryData = {
      Email: localStorage.getItem("Email"),

      NominatedBeneficiary: values.partnerPensionBeneficiaryAttached,
      NominationType: values.NomiationTypePensionPartnerBeneficiary,
      No_ofBeneficiaries: values.BeneficiariesOptionDetailsBeneficiaries,

      Beneficiary1: values.BeneficiaryPensionPartner1,
      BenefitShare1: values.ShareofBenefitPensionPartner1,
      Relationship1: values.RelationshipOptionDetailsPensionPartner1,

      Beneficiary2: values.BeneficiaryPensionPartner2,
      BenefitShare2: values.ShareofBenefit2PensionPartner2,
      Relationship2: values.RelationshipOptionDetailsPensionPartner2,

      Beneficiary3: values.BeneficiaryPensionPartner3,
      BenefitShare3: values.ShareofBenefitPensionPartner3,
      Relationship3: values.RelationshipOptionDetailsPensionPartner3,

      Beneficiary4: values.BeneficiaryPensionPartner4,
      BenefitShare4: values.ShareofBenefitPensionPartner4,
      Relationship4: values.RelationshipOptionDetailsPensionPartner4,

      Beneficiary5: values.BeneficiaryPensionPartner5,
      BenefitShare5: values.ShareofBenefitPensionPartner5,
      Relationship5: values.RelationshipOptionDetailsPensionPartner5,
    };
    console.log(BeneficiaryData)

    if (PartnerBeneficiaryDataListUpdateFlag) {
      axios
        .patch(
          `${DefaultUrl}/api/Partner-Retirement-PensionBeneficiaries/Update-Partner-PensionAccount-Beneficiaries/${BeneficiaryData.Email}/${values.id}`,
          BeneficiaryData
        )
        .then((res) => console.log("Deleted!"));
      setPartnerBeneficiaryDataListUpdateFlag(false);
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Partner-Retirement-PensionBeneficiaries/Add-Partner-PensionAccount-Beneficiaries`,
          BeneficiaryData
        )
        .then((ref) => {
          console.log(
            " Partner -> Pension -> Beneficiary -> data added successfully!"
          );
        });
    }

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Partner-Retirement-PensionBeneficiaries`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == BeneficiaryData.Email
          );

          setPartnerBeneficiaryDataList(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);

    handleClosePartnerBeneficiary();
  };
  //CLIENT -> PENSION BENEFICIARY
  let initialValuesPensionBeneficiaryClient = {
    clientPensionBeneficiaryAttached: "No",

    NomiationTypePensionClientBeneficiary: "",
    BeneficiariesOptionDetailsBeneficiaries: "",

    BeneficiaryPensionClient1: "",
    ShareofBenefitPensionClient1: "",
    RelationshipOptionDetailsPensionClient1: "",

    BeneficiaryPensionClient2: "",
    ShareofBenefit2PensionClient2: "",
    RelationshipOptionDetailsPensionClient2: "",

    BeneficiaryPensionClient3: "",
    ShareofBenefitPensionClient3: "",
    RelationshipOptionDetailsPensionClient3: "",

    BeneficiaryPensionClient4: "",
    ShareofBenefitPensionClient4: "",
    RelationshipOptionDetailsPensionClient4: "",

    BeneficiaryPensionClient5: "",
    ShareofBenefitPensionClient5: "",
    RelationshipOptionDetailsPensionClient5: "",
  };
  let validateSchemaPensionClientBeneficiary = Yup.object({
    NomiationTypePensionClientBeneficiary: Yup.string().when(
      "clientPensionBeneficiaryAttached",
      {
        is: (val) => val && val.length == 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),

    

    // BeneficiariesOptionDetailsBeneficiaries: Yup.string().when(
    //   "clientPensionBeneficiaryAttached",
    //   {
    //     is: (val) => val && val.length == 3,
    //     then: Yup.string().required("Required"),
    //     otherwise: Yup.string().notRequired(),
    //   }
    // ),

    BeneficiariesOptionDetailsBeneficiaries: Yup.string().when(
      ["clientPensionBeneficiaryAttached","NomiationTypePensionClientBeneficiary"],
      {
        is: (value1,value2) => value1 == "No" || value2 == "Legal Representative(Your Estate)",
        then: Yup.string().notRequired(),
        otherwise: Yup.string().required("Required"),
      }
    ),

    BeneficiaryPensionClient1: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("1"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    ShareofBenefitPensionClient1: Yup.number().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("1"),
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    RelationshipOptionDetailsPensionClient1: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("1"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),

    BeneficiaryPensionClient2: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("2"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    ShareofBenefit2PensionClient2: Yup.number().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("2"),
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    RelationshipOptionDetailsPensionClient2: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("2"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),

    BeneficiaryPensionClient3: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("3"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    ShareofBenefitPensionClient3: Yup.number().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("3"),
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    RelationshipOptionDetailsPensionClient3: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("3"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),

    BeneficiaryPensionClient4: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("4"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    ShareofBenefitPensionClient4: Yup.number().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("4"),
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    RelationshipOptionDetailsPensionClient4: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("4"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),

    BeneficiaryPensionClient5: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("5"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    ShareofBenefitPensionClient5: Yup.number().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("5"),
        then: Yup.number()
          .required("Required")
          .test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
          ),
        otherwise: Yup.number().notRequired(),
      }
    ),
    RelationshipOptionDetailsPensionClient5: Yup.string().when(
      "BeneficiariesOptionDetailsBeneficiaries",
      {
        is: (val) => val && val >= parseFloat("5"),
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
  });
  let On_submit_PenionBeneficiaryClient = (values) => {
    let BeneficiaryData = {
      Email: localStorage.getItem("Email"),
      NominatedBeneficiary: values.clientPensionBeneficiaryAttached,

      NominationType: values.NomiationTypePensionClientBeneficiary,
      No_ofBeneficiaries: values.BeneficiariesOptionDetailsBeneficiaries,

      Beneficiary1: values.BeneficiaryPensionClient1,
      BenefitShare1: values.ShareofBenefitPensionClient1,
      Relationship1: values.RelationshipOptionDetailsPensionClient1,

      Beneficiary2: values.BeneficiaryPensionClient2,
      BenefitShare2: values.ShareofBenefit2PensionClient2,
      Relationship2: values.RelationshipOptionDetailsPensionClient2,

      Beneficiary3: values.BeneficiaryPensionClient3,
      BenefitShare3: values.ShareofBenefitPensionClient3,
      Relationship3: values.RelationshipOptionDetailsPensionClient3,

      Beneficiary4: values.BeneficiaryPensionClient4,
      BenefitShare4: values.ShareofBenefitPensionClient4,
      Relationship4: values.RelationshipOptionDetailsPensionClient4,

      Beneficiary5: values.BeneficiaryPensionClient5,
      BenefitShare5: values.ShareofBenefitPensionClient5,
      Relationship5: values.RelationshipOptionDetailsPensionClient5,
    };
    if (ClientBeneficiaryDataListUpdateFlag) {
      // setClientBeneficiaryDataList(ClientBeneficiaryDataList.filter((ClientBeneficiaryDataList, index) => index !== updateIndex));
      // setClientBeneficiaryDataList(ClientBeneficiaryDataList =>[...ClientBeneficiaryDataList, BeneficiaryData]);
      let id = values.id;

      axios
        .patch(
          `${DefaultUrl}/api/Client-Retirement-PensionBeneficiaries/Update-Client-PensionAccount-Beneficiaries/${BeneficiaryData.Email}/${id}`,
          BeneficiaryData
        )
        .then((res) => {
          console.log("data Updated successfully");
          handleCloseClientBeneficiary();
          setClientBeneficiaryDataListUpdateFlag(false);
        });
    } else {
      // console.log(BeneficiaryData)
      // setClientBeneficiaryDataList([...ClientBeneficiaryDataList,BeneficiaryData])

      axios
        .post(
          `${DefaultUrl}/api/Client-Retirement-PensionBeneficiaries/Add-Client-PensionAccount-Beneficiaries`,
          BeneficiaryData
        )
        .then((ref) => {
          console.log("data added successfully!");
          handleCloseClientBeneficiary();
        });
    }
    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-Retirement-PensionBeneficiaries`)
        .then((res) => {
          console.log("Client Pension Account get Successfully");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter(
            (item) => item.Email == BeneficiaryData.Email
          );
          setClientBeneficiaryDataList(clientFilterObj);
          console.log(clientFilterObj);
        });
    }, 500);
  };
  //INVESTMENT CLIENT NESTED MODAL EVENT HANDLER
  let InvestmentModalupdateHandler = (elem, ind) => {
    setInvestmentModalEdit(true);
    let InvestmentOptionDetailsData = {
      id: elem._id,
      Email: localStorage.getItem("Email"),
      InvestmentOptionDetailsInvestment: elem.InvestmentOption,
      InvestmentOptionDetailsCurrentValue: elem.CurrentValue,
    };

    setInvestmentModalObj([InvestmentOptionDetailsData]);

    setUpdateIndex(ind);
    handleClose();
    handleShow();
  };
  let InvestmentModaldeleteHandler = (e) => {
    axios
      .delete(
        `${DefaultUrl}/api/Client-Retirement-Investment/Delete-Client-Super-Investment/${e.Email}/${e._id}`
      )
      .then((res) => console.log("Deleted!"));

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-Retirement-Investment`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter((item) => item.Email == e.Email);

          setInvestmentModal(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);
  };

  //INVESTMENT PARTNER NESTED MODAL EVENT HANDLER
  let PartnerInvestmentModalupdateHandler = (elem, ind) => {
    setInvestmentModalPartnerEdit(true);

    let InvestmentOptionDetailsData = {
      id: elem._id,
      Email: localStorage.getItem("Email"),
      InvestmentOptionDetailsInvestmentPartner: elem.InvestmentOption,
      InvestmentOptionDetailsCurrentValuePartner: elem.CurrentValue,
    };

    setInvestmentModalPartnerObj([InvestmentOptionDetailsData]);
    setUpdateIndex(ind);
    handleClosePartner();
    handleShowPartner();
  };
  let InvestmentModalPartnerdeleteHandler = (e) => {
    axios
      .delete(
        `${DefaultUrl}/api/Partner-Retirement-Investment/Delete-Partner-Super-Investment/${e.Email}/${e._id}`
      )
      .then((res) => console.log("Deleted!"));

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Partner-Retirement-Investment`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter((item) => item.Email == e.Email);

          setInvestmentModalPartner(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);
    setInvestmentModalPartnerEdit(false);
  };
  //CLIENT PENSION->NESTED INVESTED MODAL EVENT HANDLERS
  let ClientPensionInvestmentModalupdateHandler = (elem, ind) => {
    let InvestmentOptionDetailsData = {
      id: elem._id,
      Email: localStorage.getItem("Email"),
      InvestmentClientPensionOption: elem.InvestmentOption,
      InvestmentClientPensionCurrentValue: elem.CurrentValue,
    };

    setPensionClientInvestmentModalObj([InvestmentOptionDetailsData]);
    setPensionClientInvestmentModalEdit(true);

    // setUpdateIndex(ind);
    handleClosePensionClient();
    handleShowPensionClient();
  };
  let ClientPensionInvestmentModaldeleteHandler = (elem) => {
    let id = elem._id;
    let email = elem.Email;

    axios
      .delete(
        `${DefaultUrl}/api/Client-Retirement-PensionInvestment/Delete-Client-PensionAccount-Investment/${email}/${id}`
      )
      .then((res) => {
        //Popper Massage
        console.log("Client Pension Investment Removed");
      });

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-Retirement-PensionInvestment`)
        .then((res) => {
          console.log("Client Pension Investment get Successfully");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter((item) => item.Email == email);
          setPensionClientInvestmentModal(clientFilterObj);
          console.log(clientFilterObj);
        });
    }, 500);
  };

  //PARTNER PENSION->NESTED INVESTED MODAL EVENT HANDLERS
  let PartnerPensionInvestmentModalupdateHandler = (elem, ind) => {
    setPensionPartnerInvestmentModalEdit(true);

    setUpdateIndex(ind);
    let InvestmentOptionDetailsData = {
      id: elem._id,
      Email: localStorage.getItem("Email"),
      InvestmentPartnerPensionOption: elem.InvestmentOption,
      InvestmentPartnerPensionCurrentValue: elem.CurrentValue,
    };
    setPensionPartnerInvestmentModalObj([InvestmentOptionDetailsData]);

    handleClosePensionPartner();
    handleShowPensionPartner();
  };
  let PartnerPensionInvestmentModaldeleteHandler = (e) => {
    axios
      .delete(
        `${DefaultUrl}/api/Partner-Retirement-PensionInvestment/Delete-Partner-PensionAccount-Investment/${e.Email}/${e._id}`
      )
      .then((res) => console.log("Deleted!"));
    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Partner-Retirement-PensionInvestment`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter((item) => item.Email == e.Email);

          setPensionPartnerInvestmentModal(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);
    setPensionPartnerInvestmentModalEdit(false);
  };
  //CLIENT ANNUITY EVENT HANDLER
  let clientAnnuitiesupdateHandler = (elem) => {
    setAnnuitiesDataListEdit(true);

    let ClientAnnuitiesDetails = {
      id: elem._id,
      Annuities_ProductProvider: elem.Annuities_ProductProvider,
      Annuities_InvestmentAmount: elem.Annuities_InvestmentAmount,
      Annuities_CurrentValue: elem.Annuities_CurrentValue,
      Annuities_AnnuityType: elem.Annuities_AnnuityType,
      Annuities_RCV: elem.Annuities_RCV,
      Annuities_Term: elem.Annuities_Term,
      Annuities_YearsUntilMaturity: elem.Annuities_YearsUntilMaturity,
      Annuities_RegularIncome: elem.Annuities_RegularIncome,
      Annuities_Frequency: elem.Annuities_Frequency,
      Annuities_AnnualInflation: elem.Annuities_AnnualInflation,
    };

    setAnnuitiesDataListObj([ClientAnnuitiesDetails]);
    AnnuitieshandleShow();
  };
  let clientAnnuitiesdeleteHandler = (elem) => {
    let id = elem._id;
    let email = elem.Email;

    axios
      .delete(
        `${DefaultUrl}/api/Client-Annuities-Retirement/Delete-Client-AnnuitiesAccount/${email}/${id}`
      )
      .then((res) => {
        //Popper Massage
        console.log("client Pension List Removed");
      });

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-Annuities-Retirement`)
        .then((res) => {
          console.log("Client Annuities get Successfully");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter((item) => item.Email == email);
          setAnnuitiesDataList(clientFilterObj);
          console.log(clientFilterObj);
        });
    }, 500);
  };

  //PARTNER ANNUITY
  let partnerAnnuitiesupdateHandler = (e) => {
    setAnnuitiesData2ListEdit(true);
    let PartnerAnnuitiesDetails = {
      id: e._id,
      Email: localStorage.getItem("Email"),
      Annuities_ProductProvider: e.Annuities_ProductProvider,
      Annuities_InvestmentAmount: e.Annuities_InvestmentAmount,
      Annuities_CurrentValue: e.Annuities_CurrentValue,
      Annuities_AnnuityType: e.Annuities_AnnuityType,
      Annuities_RCV: e.Annuities_RCV,
      Annuities_Term: e.Annuities_Term,
      Annuities_YearsUntilMaturity: e.Annuities_YearsUntilMaturity,
      Annuities_RegularIncome: e.Annuities_RegularIncome,
      Annuities_Frequency: e.Annuities_Frequency,
      Annuities_AnnualInflation: e.Annuities_AnnualInflation,
    };
    console.log(PartnerAnnuitiesDetails);
    setAnnuitiesData2ListObj([PartnerAnnuitiesDetails]);
    Annuities2handleShow();
  };
  let partnerAnnuitiesdeleteHandler = (e) => {
    axios
      .delete(
        `${DefaultUrl}/api/Partner-Annuities-Retirement/Delete-Partner-AnnuitiesAccount/${e.Email}/${e._id}`
      )
      .then((res) => console.log("Deleted!"));

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Partner-Annuities-Retirement`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter((item) => item.Email == e.Email);

          setAnnuitiesData2List(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);
  };
  //CLIENT PENSION
  let clientPensionupdateHandler = (elem, ind) => {
    setclientPensionDataListEdit(true);

    let AccountPension_EligibleService = new Date(
      elem.AccountPension_EligibleService
    );
    elem.AccountPension_EligibleService = AccountPension_EligibleService;

    let AccountPension_CommencementDate = new Date(
      elem.AccountPension_CommencementDate
    );
    elem.AccountPension_CommencementDate = AccountPension_CommencementDate;

    let PensionAccountDetails = {
      id: elem._id,
      Email: localStorage.getItem("Email"),
      AccountPension_FundName: elem.AccountPension_FundName,
      AccountPension_MemberNO: elem.AccountPension_MemberNO,
      AccountPension_FundType: elem.AccountPension_FundType,
      AccountPension_ContactNO: elem.AccountPension_ContactNO,
      AccountPension_FaxNO: elem.AccountPension_FaxNO,
      AccountPension_PostalAddress: elem.AccountPension_PostalAddress,
      AccountPension_ABN: elem.AccountPension_ABN,
      AccountPension_SPIN: elem.AccountPension_SPIN,
      AccountPension_Website: elem.AccountPension_Website,
      AccountPension_Email: elem.AccountPension_Email,
      AccountPension_PensionType: elem.AccountPension_PensionType,
      AccountPension_CurrentBalance: elem.AccountPension_CurrentBalance,
      AccountPension_TaxFree: elem.AccountPension_TaxFree,
      AccountPension_Taxed: elem.AccountPension_Taxed,
      AccountPension_EligibleService: elem.AccountPension_EligibleService,
      AccountPension_CommencementDate: elem.AccountPension_CommencementDate,
      AccountPension_OriginalPrice: elem.AccountPension_OriginalPrice,
      AccountPension_IncomeDrawn: elem.AccountPension_IncomeDrawn,
      AccountPension_Frequency: elem.AccountPension_Frequency,
      AccountPension_MinimumRequired: elem.AccountPension_MinimumRequired,
      AccountPension_RelevantNumber: elem.AccountPension_RelevantNumber,
      AccountPension_LumpsumTaken: elem.AccountPension_LumpsumTaken,
      AccountPension_DeductibleAmount: elem.AccountPension_DeductibleAmount,
    };

    setclientPensionDataListObj([PensionAccountDetails]);
    setUpdateIndex(ind);
    PensionhandleShow();
  };
  let clientPensiondeleteHandler = (elem) => {
    let id = elem._id;
    let email = elem.Email;

    axios
      .delete(
        `${DefaultUrl}/api/Client-Pension-Retirement/Delete-Client-PensionAccount/${email}/${id}`
      )
      .then((res) => {
        //Popper Massage
        console.log("client Pension List Removed");
      });

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-Pension-Retirement`)
        .then((res) => {
          console.log("Client Pension Account get Successfully");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter((item) => item.Email == email);
          setclientPensionDataList(clientFilterObj);
          console.log(clientFilterObj);
        });
    }, 500);
  };

  //PARTNER PENSION
  let partnerPensionupdateHandler = (elem, ind) => {
    setPension2PartnerDataListEdit(true);

    // console.log(elem);

    let AccountPension_CommencementDate = new Date(
      elem.AccountPension_CommencementDate
    );
    elem.AccountPension_CommencementDate = AccountPension_CommencementDate;

    let AccountPension_EligibleService = new Date(
      elem.AccountPension_EligibleService
    );
    elem.AccountPension_EligibleService = AccountPension_EligibleService;

    let PensionAccountDetails = {
      id: elem._id,
      Email: localStorage.getItem("Email"),
      AccountPension_FundName: elem.AccountPension_FundName,
      AccountPension_MemberNO: elem.AccountPension_MemberNO,
      AccountPension_FundType: elem.AccountPension_FundType,
      AccountPension_ContactNO: elem.AccountPension_ContactNO,
      AccountPension_FaxNO: elem.AccountPension_FaxNO,
      AccountPension_PostalAddress: elem.AccountPension_PostalAddress,
      AccountPension_ABN: elem.AccountPension_ABN,
      AccountPension_SPIN: elem.AccountPension_SPIN,
      AccountPension_Website: elem.AccountPension_Website,
      AccountPension_Email: elem.AccountPension_Email,
      AccountPension_FundType2: elem.AccountPension_PensionType,
      AccountPension_CurrentBalance: elem.AccountPension_CurrentBalance,
      AccountPension_TaxFree: elem.AccountPension_TaxFree,
      AccountPension_Taxed: elem.AccountPension_Taxed,
      AccountPension_EligibleService: elem.AccountPension_EligibleService,
      AccountPension_CommencementDate: elem.AccountPension_CommencementDate,
      AccountPension_OriginalPrice: elem.AccountPension_OriginalPrice,
      AccountPension_IncomeDrawn: elem.AccountPension_IncomeDrawn,
      AccountPension_Frequency: elem.AccountPension_Frequency,
      AccountPension_MinimumRequired: elem.AccountPension_MinimumRequired,
      AccountPension_RelevantNumber: elem.AccountPension_RelevantNumber,
      AccountPension_LumpsumTaken: elem.AccountPension_LumpsumTaken,
      AccountPension_DeductibleAmount: elem.AccountPension_DeductibleAmount,
    };

    setPartnerSuperAccountsObj([PensionAccountDetails]);
    setUpdateIndex(ind);
    Pension2handleShow();
  };
  let partnerPensiondeleteHandler = (e) => {
    let data = e;

    axios
      .delete(
        `${DefaultUrl}/api/Partner-Pesnison-Retirement/Delete-Partner-PensionAccount/${e.Email}/${e._id}`
      )
      .then((res) => console.log("Deleted!"));

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Partner-Pesnison-Retirement`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter((item) => item.Email == e.Email);

          setPension2PartnerDataList(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);
    setPension2PartnerDataListEdit(false);
  };

  let ClientSuperAccountsDeleteHandler = (elem, ind) => {
    // setClientSuperAccounts(
    //   ClientSuperAccounts.filter((ClientSuperAccounts, index) => index !== ind)
    // );

    let email = localStorage.getItem("Email");

    let id = elem._id;

    axios
      .delete(
        `${DefaultUrl}/api/Client-Super-Retirement/Delete-Client-RetirementSuperAccount/${email}/${id}`
      )
      .then((res) => console.log("Shapaik"));

    setTimeout(() => {
      axios.get(`${DefaultUrl}/api/Client-Super-Retirement`).then((res) => {
        console.log(res.data);

        let childObj = res.data;
        let childFilterObj = childObj.filter((item) => item.Email == email);

        setClientSuperAccounts(childFilterObj);
        console.log("child", childFilterObj);
      });
    }, 300);
  };
  let ClientSuperAccountsUpdateHandler = (elem, ind) => {
    setClientSuperAccountsUpdateFlag(true);

    // let date = new Date(clientFilterObj[0].EstablishmentDate);
    // clientFilterObj[0].EstablishmentDate=date;

    let Super_CommencementDate = new Date(elem.Super_CommencementDate);
    elem.Super_CommencementDate = Super_CommencementDate;

    let Super_EligibleServiceDate = new Date(elem.Super_EligibleServiceDate);
    elem.Super_EligibleServiceDate = Super_EligibleServiceDate;

    let SuperAccountDetails = {
      id: elem._id,
      Email: localStorage.getItem("Email"),
      SuperFundName: elem.Super_FundName,
      SuperMemberNo: elem.Super_MemberNO,
      SuperFundType: elem.Super_FundType,
      SuperContactNO: elem.Super_ContactNO,
      SuperFaxNO: elem.Super_FaxNO,
      SuperPostalAddress: elem.Super_PostalAddress,
      SuperABN: elem.Super_ABN,
      SuperSPIN: elem.Super_SPIN,
      SuperWebsite: elem.Super_Website,
      SuperEmail: elem.Super_Email,
      SuperFundType2: elem.Super_FundType_2,
      SuperCommencementDate: elem.Super_CommencementDate,
      SuperEligibleDate: elem.Super_EligibleServiceDate,
      SuperTFNQuoted: elem.Super_TFN,
      SuperCurrentBalance: elem.Super_CurrentBalance,
      SuperTaxFree: elem.Super_TaxFree,
      SuperTaxed: elem.Super_Taxed,
      SuperRestrictionNonPreserved: elem.Super_Restricted,
      SuperUnRestrictionNonPreserved: elem.Super_Unrestricted,
      SuperPreservedAmount: elem.Super_PreservedAmount,
    };

    setClientSuperAccountsObj([SuperAccountDetails]);
    setUpdateIndex(ind);
    SuperhandleShow();
  };

  let PartnerSuperAccountsDeleteHandler = (elem, ind) => {
    // setPartnerSuperAccounts(
    //   PartnerSuperAccounts.filter(
    //     (PartnerSuperAccounts, index) => index !== ind
    //   )
    // );
    axios
      .delete(
        `${DefaultUrl}/api/Partner-Super-Retirement/Delete-Partner-SuperAccount/${elem.Email}/${elem._id}`
      )
      .then((res) => console.log("Deleted!"));
    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Partner-Super-Retirement`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == elem.Email
          );

          setPartnerSuperAccounts(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);
  };
  let PartnerSuperAccountsUpdateHandler = (elem, ind) => {
    setPartnerSuperAccountsUpdateFlag(true);

    let Super_CommencementDate = new Date(elem.Super_CommencementDate);
    elem.Super_CommencementDate = Super_CommencementDate;

    let Super_EligibleServiceDate = new Date(elem.Super_EligibleServiceDate);
    elem.Super_EligibleServiceDate = Super_EligibleServiceDate;

    console.log(elem);

    let SuperAccountDetails = {
      id: elem._id,
      Email: localStorage.getItem("Email"),
      Super2FundName: elem.Super_FundName,
      Super2MemberNo: elem.Super_MemberNO,
      Super2FundType: elem.Super_FundType,
      Super2ContactNO: elem.Super_ContactNO,
      Super2FaxNO: elem.Super_FaxNO,
      Super2PostalAddress: elem.Super_PostalAddress,
      Super2ABN: elem.Super_ABN,
      Super2SPIN: elem.Super_SPIN,
      Super2Website: elem.Super_Website,
      Super2Email: elem.Super_Email,
      Super2FundType2: elem.Super_FundType_2,
      Super2CommencementDate: elem.Super_CommencementDate,
      Super2EligibleDate: elem.Super_EligibleServiceDate,
      Super2TFNQuoted: elem.Super_TFN,
      Super2CurrentBalance: elem.Super_CurrentBalance,
      Super2TaxFree: elem.Super_TaxFree,
      Super2Taxed: elem.Super_Taxed,
      Super2RestrictionNonPreserved: elem.Super_Restricted,
      Super2UnRestrictionNonPreserved: elem.Super_Unrestricted,
      Super2PreservedAmount: elem.Super_PreservedAmount,
    };

    // alert("usama")

    setPension2PartnerDataListObj([SuperAccountDetails]);
    // setUpdateIndex(ind);
    Super2handleShow();
  };

  let ClientLifetimePensionDeleteHandler = (elem, ind) => {
    // setClientLifetimePension(
    //   ClientLifetimePension.filter(
    //     (ClientLifetimePension, index) => index !== ind
    //   )
    // );

    axios
      .delete(
        `${DefaultUrl}/api/Client-LifetimePension-Retirement/Delete-Client-LifetimePension/${elem.Email}/${elem._id}`
      )
      .then((res) => console.log("Deleted!"));

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-LifetimePension-Retirement`)
        .then((res) => {
          // console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == elem.Email
          );

          setClientLifetimePension(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);
  };
  let ClientLifetimePensionUpdateHandler = (elem, ind) => {
    setClientLifetimePensionUpdateFlag(true);

    let ClientLifetimePensionDetails = {
      id: elem._id,
      Email: localStorage.getItem("Email"),
      LifetimeAccountPension_FundName: elem.LifePension_FundName,
      LifetimePensionIncomeDrawn: elem.LifePension_RegularIncome,
      LifetimeAccountPension_Frequency: elem.LifePension_Frequency,
      LifetimeAccountPension_DeductibleAmount:
        elem.LifePension_DeductibleAmount,
      LifetimeAccountPension_TaxFree: elem.LifePension_TaxFree_Pension,
      LifetimePensionTaxableAmount: elem.LifePension_TaxablePensionAmount,
    };

    // alert("usama")

    setClientLifetimePensionObj([ClientLifetimePensionDetails]);
    setUpdateIndex(ind);
    LifetimePensionhandleShow();
  };

  let PartnerLifetimePensionDeleteHandler = (elem, ind) => {
    // setPartnerLifetimePension(
    //   PartnerLifetimePension.filter(
    //     (PartnerLifetimePension, index) => index !== ind
    //   )
    // );

    axios
      .delete(
        `${DefaultUrl}/api/Partner-LifetimePension-Retirement/Delete-Partner-LifetimePension/${elem.Email}/${elem._id}`
      )
      .then((res) => console.log("Deleted!"));

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Partner-LifetimePension-Retirement`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == elem.Email
          );

          setPartnerLifetimePension(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);
  };
  let PartnerLifetimePensionUpdateHandler = (elem, ind) => {
    setPartnerLifetimePensionUpdateFlag(true);

    let PartnerLifetimePensionDetails = {
      id: elem._id,
      Email: localStorage.getItem("PartnerEmail"),
      LifetimeAccountPension_FundName: elem.LifePension_FundName,
      LifetimePension2IncomeDrawn: elem.LifePension_RegularIncome,
      LifetimeAccountPension_Frequency: elem.LifePension_Frequency,
      LifetimeAccountPension_DeductibleAmount:
        elem.LifePension_DeductibleAmount,
      LifetimeAccountPension_TaxFree: elem.LifePension_TaxFree_Pension,
      LifetimePension2TaxableAmount: elem.LifePension_TaxablePensionAmount,
    };

    setPartnerLifetimePensionObj([PartnerLifetimePensionDetails]);
    setUpdateIndex(ind);
    LifetimePension2handleShow();
  };

  let InsuranceDataListDeleteHandler = (elem, ind) => {
    axios
      .delete(
        `${DefaultUrl}/api/Client-Retirement-Insurance/Delete-Client-Super-Insurance/${elem.Email}/${elem._id}`
      )
      .then((res) => console.log("Deleted!"));

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-Retirement-Insurance`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == elem.Email
          );

          setInsuranceDataList(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);
  };
  let InsuranceDataListUpdateHandler = (elem, ind) => {
    setInsuranceDataListUpdateFlag(true);
    let InsuranceData = {
      id: elem._id,
      insuranceAttachedOption: elem.InsuranceAttached,
      insuranceLifeTPDAttached: elem.Life_TPD_Insurance,

      // Row 1
      CoverType: elem.CoverType,
      LifeCover: elem.LifeCover,
      TPDCover: elem.TPDCover,

      //Row 2
      CostPA: elem.CostPA,
      PremiumType: elem.PremiumType,
      anyLoadingOrExclusionsAttached: elem.LoadingExecutions,

      //Row 3
      Pleaseprovidedetails: elem.LoadingExecution_Details,
      incomeProtectionAttached: elem.IncomeProtection,
      MonthlyBenefit: elem.MonthlyBenefit,

      //Row 4
      waitingPeriod: elem.WaitingPeriod,
      benefitPeriod: elem.BenefitPeriod,
      agreedOrIndemnity: elem.Indemnity,

      //Row 5
      CostPASecond: elem.CostPA_2,
      PremiumTypeSecond: elem.PremiumType_2,
      IncludesSuperContinuance: elem.Includes_SuperContinuance,

      //Row 6
      Isthebenefitindexed: elem.BenefitIndexed,
      AnyLoadingOrExclusions: elem.LoadingExecutions_2,
      PleaseprovidedetailsSecond: elem.LoadingExecutions_2_Details,
    };
    setInsuranceDataListObj([InsuranceData]);
    setUpdateIndex(ind);
    setShow2(true);
    // alert("Kuta");
  };

  let BeneficiaryDataListDeleteHandler = (elem, ind) => {
    axios
      .delete(
        `${DefaultUrl}/api/Client-Retirement-Beneficiaries/Delete-Client-Super-Beneficiaries/${elem.Email}/${elem._id}`
      )
      .then((res) => console.log("Deleted!"));

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-Retirement-Beneficiaries`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == elem.Email
          );

          setBeneficiaryDataList(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);
  };
  let BeneficiaryDataListUpdateHandler = (elem, ind) => {
    setBeneficiaryDataListUpdateFlag(true);

    let BeneficiaryData = {
      id: elem._id,
      clientNestedbeneficiariesAttached: elem.NominatedBeneficiary,
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

    setBeneficiaryDataListObj([BeneficiaryData]);
    setUpdateIndex(ind);
    handleShow3(true);
    // alert(BeneficiaryData.id);
  };

  let contributionModalDeleteHandler = (elem, ind) => {
    setcontributionModal(
      contributionModal.filter((contributionModal, index) => index !== ind)
    );
    axios
      .delete(
        `${DefaultUrl}/api/Client-Retirement-Contributions/Delete-Client-Super-Contribution/${elem.Email}/${elem._id}`
      )
      .then((res) => console.log("Deleted!"));

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-Retirement-Contributions`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == elem.Email
          );

          setcontributionModal(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);
  };
  let contributionModalUpdateHandler = (elem, ind) => {
    setcontributionModalUpdateFlag(true);

    let ContributionOptionDetailsData = {
      id: elem._id,
      Email: localStorage.getItem("Email"),
      clientinvestmentAttached: elem.ContributeFund,

      Non_Concessional1: elem.NonConcessional1,
      Other1: elem.Other1,
      EmployerContributions1: elem.EmployerContributions1,
      SalarySacAndPersonalDed1: elem.SalaryPersonalDed1,

      Non_Concessional2: elem.NonConcessional2,
      Other2: elem.Other2,
      EmployerContributions2: elem.EmployerContributions2,
      SalarySacAndPersonalDed2: elem.SalaryPersonalDed2,

      Non_Concessional3: elem.NonConcessional3,
      Other3: elem.Other3,
      EmployerContributions3: elem.EmployerContributions3,
      SalarySacAndPersonalDed3: elem.SalaryPersonalDed3,
    };

    setcontributionModalObj([ContributionOptionDetailsData]);
    setUpdateIndex(ind);
    handleShow4(true);
    // alert("Kuta");
  };

  let InsuranceDataPartnerListDeleteHandler = (elem, ind) => {
    setInsuranceDataPartnerList(
      InsuranceDataPartnerList.filter(
        (InsuranceDataPartnerList, index) => index !== ind
      )
    );
  };
  let InsuranceDataPartnerListUpdateHandler = (elem, ind) => {
    setInsuranceDataPartnerListUpdateFlag(true);

    let InsuranceData = {
      Email: localStorage.getItem("Email"),
      insurancePartnerAttachedOption: elem.InsuranceAttached,
      insuranceLifeTPDPartnerAttached: elem.Life_TPD_Insurance,

      // Row 1
      CoverTypePartner: elem.CoverType,
      LifeCoverPartner: elem.LifeCover,
      TPDCoverPartner: elem.TPDCover,

      //Row 2
      CostPAPartner: elem.CostPA,
      PremiumTypePartner: elem.PremiumType,
      anyLoadingOrExclusionsPartnerAttached: elem.LoadingExecutions,

      //Row 3
      PleaseprovidePartnerdetails: elem.LoadingExecution_Details,
      incomeProtectionPartnerAttached: elem.IncomeProtection,
      MonthlyBenefitPartner: elem.MonthlyBenefit,

      //Row 4
      waitingPeriodPartner: elem.WaitingPeriod,
      benefitPeriodPartner: elem.BenefitPeriod,
      agreedOrIndemnityPartner: elem.Indemnity,

      //Row 5
      CostPASecondPartner: elem.CostPA_2,
      PremiumTypeSecondPartner: elem.PremiumType_2,
      IncludesSuperContinuancePartner: elem.Includes_SuperContinuance,

      //Row 6
      IsthebenefitindexedPartner: elem.BenefitIndexed,
      AnyLoadingOrExclusionsPartner: elem.LoadingExecutions_2,
      PleaseprovidedetailsSecondPartner: elem.LoadingExecutions_2_Details,
    };

    setInsuranceDataPartnerListObj([InsuranceData]);
    setUpdateIndex(ind);
    handleShowPartner2();
    // alert("Kuta");
  };

  let BeneficiaryDataPartnerListDeleteHandler = (elem, ind) => {
    axios
      .delete(
        `${DefaultUrl}/api/Partner-Retirement-Beneficiaries/Delete-Partner-Super-Beneficiaries/${elem.Email}/${elem._id}`
      )
      .then((res) => console.log("Deleted!"));

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Partner-Retirement-Beneficiaries`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == elem.Email
          );

          setBeneficiaryDataPartnerList(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);
  };
  let BeneficiaryDataPartnerListUpdateHandler = (elem, ind) => {
    setBeneficiaryDataPartnerListUpdateFlag(true);

    let BeneficiaryData = {
      id: elem._id,
      Email: localStorage.getItem("Email"),

      partnerNestedBeneficiariesAttached: elem.NominatedBeneficiary,
      beneficiariesPartnerAttached1: elem.NominationType,
      NomiationTypePartnerBeneficiary: elem.No_ofBeneficiaries,

      BeneficiaryPartner1: elem.Beneficiary1,
      ShareofBenefitPartner1: elem.BenefitShare1,
      RelationshipOptionDetailsRelationshipPartner1: elem.Relationship1,

      BeneficiaryPartner2: elem.Beneficiary2,
      ShareofBenefitPartner2: elem.BenefitShare2,
      RelationshipOptionDetailsRelationshipPartner2: elem.Relationship2,

      BeneficiaryPartner3: elem.Beneficiary3,
      ShareofBenefitPartner3: elem.BenefitShare3,
      RelationshipOptionDetailsRelationshipPartner3: elem.Relationship3,

      BeneficiaryPartner4: elem.Beneficiary4,
      ShareofBenefitPartner4: elem.BenefitShare4,
      RelationshipOptionDetailsRelationshipPartner4: elem.Relationship4,

      BeneficiaryPartner5: elem.Beneficiary5,
      ShareofBenefitPartner5: elem.BenefitShare5,
      RelationshipOptionDetailsRelationshipPartner5: elem.Relationship5,
    };

    setBeneficiaryDataPartnerListObj([BeneficiaryData]);
    setUpdateIndex(ind);
    handleShowPartner3(true);
    // alert("Kuta");
  };

  let contributionPartnerModalDeleteHandler = (elem, ind) => {
    // setcontributionPartnerModal(
    //   contributionPartnerModal.filter(
    //     (contributionPartnerModal, index) => index !== ind
    //   )
    // );
    axios
      .delete(
        `${DefaultUrl}/api/Partner-Retirement-Contributions/Delete-Partner-Super-Contribution/${elem.Email}/${elem._id}`
      )
      .then((res) => console.log("Deleted!"));
    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Partner-Retirement-Contributions`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == elem.Email
          );

          setcontributionPartnerModal(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);
  };
  let contributionPartnerModalUpdateHandler = (elem, ind) => {
    setcontributionPartnerModalUpdateFlag(true);

    let ContributionOptionDetailsData = {
      id: elem._id,
      Email: localStorage.getItem("Email"),
      partnerInvestmentAttached: elem.ContributeFund,

      Non_ConcessionalPartner1: elem.NonConcessional1,
      OtherPartner1: elem.Other1,
      EmployerContributionsPartner1: elem.EmployerContributions1,
      SalarySacAndPersonalDedPartner1: elem.SalaryPersonalDed1,

      Non_ConcessionalPartner2: elem.NonConcessional2,
      OtherPartner2: elem.Other2,
      EmployerContributionsPartner2: elem.EmployerContributions2,
      SalarySacAndPersonalDedPartner2: elem.SalaryPersonalDed2,

      Non_ConcessionalPartner3: elem.NonConcessional3,
      OtherPartner3: elem.Other3,
      EmployerContributionsPartner3: elem.EmployerContributions3,
      SalarySacAndPersonalDedPartner3: elem.SalaryPersonalDed3,
    };

    setcontributionPartnerModalObj([ContributionOptionDetailsData]);
    setUpdateIndex(ind);
    handleShowPartner4(true);
  };

  let ClientBeneficiaryDataListDeleteHandler = (elem, ind) => {
    // setClientBeneficiaryDataList(ClientBeneficiaryDataList.filter((ClientBeneficiaryDataList, index) => index !== ind));
    let id = elem._id;
    let email = elem.Email;

    axios
      .delete(
        `${DefaultUrl}/api/Client-Retirement-PensionBeneficiaries/Delete-Client-PensionAccount-Beneficiaries/${email}/${id}`
      )
      .then((res) => {
        //Popper Massage
        console.log("client Pension List Removed");
      });

    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Client-Retirement-PensionBeneficiaries`)
        .then((res) => {
          console.log("Client Pension Account get Successfully");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter((item) => item.Email == email);
          setClientBeneficiaryDataList(clientFilterObj);
          console.log(clientFilterObj);
        });
    }, 500);
  };
  let ClientBeneficiaryDataListUpdateHandler = (elem, ind) => {
    setClientBeneficiaryDataListUpdateFlag(true);

    let BeneficiaryData = {
      id: elem._id,
      Email: localStorage.getItem("Email"),
      clientPensionBeneficiaryAttached: elem.NominatedBeneficiary,

      NomiationTypePensionClientBeneficiary: elem.NominationType,
      BeneficiariesOptionDetailsBeneficiaries: elem.No_ofBeneficiaries,

      BeneficiaryPensionClient1: elem.Beneficiary1,
      ShareofBenefitPensionClient1: elem.BenefitShare1,
      RelationshipOptionDetailsPensionClient1: elem.Relationship1,

      BeneficiaryPensionClient2: elem.Beneficiary2,
      ShareofBenefit2PensionClient2: elem.BenefitShare2,
      RelationshipOptionDetailsPensionClient2: elem.Relationship2,

      BeneficiaryPensionClient3: elem.Beneficiary3,
      ShareofBenefitPensionClient3: elem.BenefitShare3,
      RelationshipOptionDetailsPensionClient3: elem.Relationship3,

      BeneficiaryPensionClient4: elem.Beneficiary4,
      ShareofBenefitPensionClient4: elem.BenefitShare4,
      RelationshipOptionDetailsPensionClient4: elem.Relationship4,

      BeneficiaryPensionClient5: elem.Beneficiary5,
      ShareofBenefitPensionClient5: elem.BenefitShare5,
      RelationshipOptionDetailsPensionClient5: elem.Relationship5,
    };

    setClientBeneficiaryDataListObj([BeneficiaryData]);
    // setUpdateIndex(ind);
    PensionhandleShow();
    handleShowClientBeneficiary();
  };

  let PartnerBeneficiaryDataListDeleteHandler = (elem, ind) => {
    // setPartnerBeneficiaryDataList(
    //   PartnerBeneficiaryDataList.filter(
    //     (PartnerBeneficiaryDataList, index) => index !== ind
    //   )
    // );
    axios
      .delete(
        `${DefaultUrl}/api/Partner-Retirement-PensionBeneficiaries/Delete-Partner-PensionAccount-Beneficiaries/${elem.Email}/${elem._id}`,
        elem
      )
      .then((res) => console.log("Deleted!"));
    setTimeout(() => {
      axios
        .get(`${DefaultUrl}/api/Partner-Retirement-PensionBeneficiaries`)
        .then((res) => {
          console.log(res.data);

          let childObj = res.data;
          let childFilterObj = childObj.filter(
            (item) => item.Email == elem.Email
          );

          setPartnerBeneficiaryDataList(childFilterObj);
          console.log("child", childFilterObj);
        });
    }, 300);
  };

  let PartnerBeneficiaryDataListUpdateHandler = (elem, ind) => {
    setPartnerBeneficiaryDataListUpdateFlag(true);

    let BeneficiaryData = {
      id: elem._id,
      Email: localStorage.getItem("Email"),

      partnerPensionBeneficiaryAttached: elem.NominatedBeneficiary,
      NomiationTypePensionPartnerBeneficiary: elem.NominationType,
      BeneficiariesOptionDetailsBeneficiaries: elem.No_ofBeneficiaries,

      BeneficiaryPensionPartner1: elem.Beneficiary1,
      ShareofBenefitPensionPartner1: elem.BenefitShare1,
      RelationshipOptionDetailsPensionPartner1: elem.Relationship1,

      BeneficiaryPensionPartner2: elem.Beneficiary2,
      ShareofBenefit2PensionPartner2: elem.BenefitShare2,
      RelationshipOptionDetailsPensionPartner2: elem.Relationship2,

      BeneficiaryPensionPartner3: elem.Beneficiary3,
      ShareofBenefitPensionPartner3: elem.BenefitShare3,
      RelationshipOptionDetailsPensionPartner3: elem.Relationship3,

      BeneficiaryPensionPartner4: elem.Beneficiary4,
      ShareofBenefitPensionPartner4: elem.BenefitShare4,
      RelationshipOptionDetailsPensionPartner4: elem.Relationship4,

      BeneficiaryPensionPartner5: elem.Beneficiary5,
      ShareofBenefitPensionPartner5: elem.BenefitShare5,
      RelationshipOptionDetailsPensionPartner5: elem.Relationship5,
    };

    setPartnerBeneficiaryDataListObj([BeneficiaryData]);
    setUpdateIndex(ind);
    handleShowPartnerBeneficiary();
  };

  return (
    <div className="container-fluid">
      <Card className="shadow px-4 mx-3">
        <div className="row my-5">
          <div className="col-md-12 text-center">
            <h3 className="mt-3">Super & Retirement</h3>
          </div>
        </div>

        <div className="row my-3">
          <div className="col-md-12">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({ values, handleChange }) => (
                <Form>
                  {/* Super Details */}
                  <div className="mb-5">
                    <h3 className="">Client Super Accounts</h3>

                    {/* 1 row */}
                    <div className="row">
                      <div className="col-6 mb-3">
                          <label className="form-label">
                            Do you have any Super Accounts?
                          </label>

                            </div>
                        <div className="col-6 mb-3">
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input
                                type="radio"
                                name="SuperRadio"
                                id="SuperRadioopt1"
                                value="Yes"
                                onClick={() => SuperHandler("Yes")}
                                onChange={handleChange}
                                checked={values.SuperRadio === "Yes"}
                              />
                              <label
                                htmlFor="SuperRadioopt1"
                                className="label1"
                              >
                                <span>YES</span>
                              </label>
                              <input
                                type="radio"
                                name="SuperRadio"
                                id="SuperRadioopt2"
                                value="No"
                                onClick={() => SuperHandler("No")}
                                onChange={handleChange}
                                checked={values.SuperRadio === "No"}
                              />
                              <label
                                htmlFor="SuperRadioopt2"
                                className="label2"
                              >
                                <span>NO</span>
                              </label>
                          </div>
                        </div>
                      </div>
                      </div>
                      {Super && (
                      <div className="row">
                          
                        <div className="col-6 mb-3">
                          <label className="form-label">
                            Please enter the details of your Super Accounts
                          </label>
                          </div>
                        <div className="col-6 mb-3">
                        

                          <button
                            type="button"
                            className=" btn 
                                btn-outline-success "
                            onClick={SuperhandleShow}
                          >
                            <div className="iconContainer mx-1">
                              <img className="img-fluid" src={plus} alt="" />
                            </div>
                            Enter Details
                          </button>
                        </div>
                    </div>
                      )}
                    {/* 1 row */}

                    {/* --------------------------------------------- */}

                    <Modal
                      show={Supershow}
                      onHide={SuperhandleClose}
                      backdrop="static"
                      className="modal-lg"
                      keyboard={false}
                    >
                      <Modal.Header className="text-light modalBG " closeButton>
                        <Modal.Title className="fontStyle">
                          Super Account Details  Client
                          <div className="iconContainerLg">
                            <img className="img-fluid" src={notebook} alt="" />
                          </div>
                        </Modal.Title>
                      </Modal.Header>
                      <Formik
                        initialValues={
                          ClientSuperAccountsUpdateFlag
                            ? ClientSuperAccountsObj[0]
                            : InitialValuesMainClientSuperAccount
                        }
                        validationSchema={
                          clientSuperAccountMainValidationSchema
                        }
                        onSubmit={ClientSuperAccount_onSubmit}
                      >
                        {({
                          values,
                          setFieldValue,
                          setValues,
                          handleChange,
                          handleBlur,
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
                                  Super Accounts
                                </h3>
                                <div className="row">
                                  <div className="col-6 mb-3">
                                    <label
                                      htmlFor="SuperFundName"
                                      className="form-label"
                                    >
                                      Fund Name
                                    </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                    <Field
                                      as="select"
                                      name="SuperFundName"
                                      id="SuperFundName"
                                      className="form-select shadow  inputDesign"
                                    >
                                      <option value="">Select</option>
                                      <option value="AMIST Super">
                                        AMIST Super
                                      </option>
                                      <option value="AMP Choice">
                                        AMP Choice
                                      </option>
                                      <option value="AMP North">
                                        AMP North
                                      </option>
                                      <option value="AMP South">
                                        AMP South
                                      </option>
                                    </Field>
                                    <ErrorMessage
                                      name="SuperFundName"
                                      component="div"
                                      className="text-danger fw-bold"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 mb-3">
                                    <label
                                      htmlFor="SuperMemberNo"
                                      className="form-label"
                                    >
                                      Member No
                                    </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                    <Field
                                      type="number"
                                      className="form-control shadow inputDesign"
                                      id="SuperMemberNo"
                                      name="SuperMemberNo"
                                      placeholder="Member No"
                                    />
                                    <ErrorMessage
                                      component="div"
                                      className="text-danger fw-bold"
                                      name="SuperMemberNo"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 mb-3">
                                    <label
                                      htmlFor="SuperFundType"
                                      className="form-label"
                                    >
                                      Fund Type
                                    </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                    <Field
                                      as="select"
                                      name="SuperFundType"
                                      id="SuperFundType"
                                      className="form-select shadow  inputDesign"
                                    >
                                      <option value="">Select</option>
                                      <option value="Personal Industry">
                                        Personal Industry
                                      </option>
                                      <option value="Personal Retail">
                                        Personal Retail
                                      </option>
                                      <option value="Personal Master">
                                        Personal Master
                                      </option>
                                      <option value="Personal WRAP">
                                        Personal WRAP
                                      </option>
                                      <option value="Personal Public Sector">
                                        Personal Public Sector
                                      </option>
                                    </Field>
                                    <ErrorMessage
                                      name="SuperFundType"
                                      component="div"
                                      className="text-danger fw-bold"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 mb-3">
                                    <label
                                      htmlFor="SuperContactNO"
                                      className="form-label"
                                    >
                                      Contact No
                                    </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                    <Field
                                      type="number"
                                      className="form-control shadow inputDesign"
                                      id="SuperContactNO"
                                      name="SuperContactNO"
                                      placeholder="Contact No"
                                    />
                                    <ErrorMessage
                                      component="div"
                                      className="text-danger fw-bold"
                                      name="SuperContactNO"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 mb-3">
                                    <label
                                      htmlFor="SuperFaxNO"
                                      className="form-label"
                                    >
                                      Fax No
                                    </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                    <Field
                                      type="number"
                                      className="form-control shadow inputDesign"
                                      id="SuperFaxNO"
                                      name="SuperFaxNO"
                                      placeholder="Fax No"
                                    />
                                    <ErrorMessage
                                      component="div"
                                      className="text-danger fw-bold"
                                      name="SuperFaxNO"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 mb-3">
                                    <label
                                      htmlFor="SuperPostalAddress"
                                      className="form-label"
                                    >
                                      Postal Address
                                    </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                    <Field
                                      type="text"
                                      className="form-control shadow inputDesign"
                                      id="SuperPostalAddress"
                                      name="SuperPostalAddress"
                                      placeholder="Postal Address"
                                    />
                                    <ErrorMessage
                                      component="div"
                                      className="text-danger fw-bold"
                                      name="SuperPostalAddress"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 mb-3">
                                    <label
                                      htmlFor="SuperABN"
                                      className="form-label"
                                    >
                                      ABN
                                    </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                    <Field
                                      type="number"
                                      className="form-control shadow inputDesign"
                                      id="SuperABN"
                                      name="SuperABN"
                                      placeholder="ABN"
                                    />
                                    <ErrorMessage
                                      component="div"
                                      className="text-danger fw-bold"
                                      name="SuperABN"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 mb-3">
                                    <label
                                      htmlFor="SuperSPIN"
                                      className="form-label"
                                    >
                                      SPIN
                                    </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                    <Field
                                      type="text"
                                      className="form-control shadow inputDesign"
                                      id="SuperSPIN"
                                      name="SuperSPIN"
                                      placeholder="SPIN"
                                    />
                                    <ErrorMessage
                                      component="div"
                                      className="text-danger fw-bold"
                                      name="SuperSPIN"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 mb-3">
                                    <label
                                      htmlFor="SuperWebsite"
                                      className="form-label"
                                    >
                                      Website
                                    </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                    <Field
                                      type="text"
                                      className="form-control shadow inputDesign"
                                      id="SuperWebsite"
                                      name="SuperWebsite"
                                      placeholder="Website"
                                    />
                                    <ErrorMessage
                                      component="div"
                                      className="text-danger fw-bold"
                                      name="SuperWebsite"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 mb-3">
                                    <label
                                      htmlFor="SuperEmail"
                                      className="form-label"
                                    >
                                      Email
                                    </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                    <Field
                                      type="text"
                                      className="form-control shadow inputDesign"
                                      id="SuperEmail"
                                      name="SuperEmail"
                                      placeholder="Email"
                                    />
                                    <ErrorMessage
                                      component="div"
                                      className="text-danger fw-bold"
                                      name="SuperEmail"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 mb-3">
                                    <label
                                      htmlFor="SuperFundType2"
                                      className="form-label"
                                    >
                                      Fund Type
                                    </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                    <Field
                                      as="select"
                                      name="SuperFundType2"
                                      id="SuperFundType2"
                                      className="form-select shadow  inputDesign"
                                    >
                                      <option value="">Select</option>
                                      <option value="Accumulation">
                                        Accumulation
                                      </option>
                                      <option value="Defined Benefit">
                                        Defined Benefit
                                      </option>
                                    </Field>
                                    <ErrorMessage
                                      name="SuperFundType2"
                                      component="div"
                                      className="text-danger fw-bold"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 mb-3">
                                    <label
                                      htmlFor="SuperCommencementDate"
                                      className="form-label"
                                    >
                                      Commencment Date
                                    </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                    {/*<Field type="date" className="form-control shadow inputDesign"
                                        id="SuperCommencementDate" name='SuperCommencementDate' /> */}
                                    <div>
                                      <DatePicker
                                        className="form-control inputDesign shadow"
                                        showIcon
                                        id="SuperCommencementDate"
                                        name="SuperCommencementDate"
                                        selected={values.SuperCommencementDate}
                                        onChange={(date) =>
                                          setFieldValue(
                                            "SuperCommencementDate",
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
                                      name="SuperCommencementDate"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 mb-3">
                                    <label
                                      htmlFor="SuperEligibleDate"
                                      className="form-label"
                                    >
                                      Eligible Service Date
                                    </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                    {/*<Field type="date" className="form-control shadow inputDesign"
                                        id="SuperEligibleDate" name='SuperEligibleDate' /> */}
                                    <div>
                                      <DatePicker
                                        className="form-control inputDesign shadow"
                                        showIcon
                                        id="SuperEligibleDate"
                                        name="SuperEligibleDate"
                                        selected={values.SuperEligibleDate}
                                        onChange={(date) =>
                                          setFieldValue(
                                            "SuperEligibleDate",
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
                                      name="SuperEligibleDate"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 mb-3">
                                    <label className="form-label">
                                      TFN Quoted
                                    </label>
                                  </div>
                                  {/* switch button style */}
                                  <div className="col-6 mb-3">
                                    <div className="form-check form-switch m-0 p-0 ">
                                      <div className="radiobutton">
                                        <input
                                          type="radio"
                                          name="SuperTFNQuoted"
                                          id="SuperTFNQuoted1opt1"
                                          value="Yes"
                                          onChange={handleChange}
                                          checked={
                                            values.SuperTFNQuoted === "Yes"
                                          }
                                        />
                                        <label
                                          htmlFor="SuperTFNQuoted1opt1"
                                          className="label1"
                                        >
                                          <span>YES</span>
                                        </label>
                                        <input
                                          type="radio"
                                          name="SuperTFNQuoted"
                                          id="SuperTFNQuotedopt2"
                                          value="No"
                                          onChange={handleChange}
                                          checked={
                                            values.SuperTFNQuoted === "No"
                                          }
                                        />
                                        <label
                                          htmlFor="SuperTFNQuotedopt2"
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
                                      htmlFor="SuperCurrentBalance"
                                      className="form-label"
                                    >
                                      Current Balance
                                    </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                    <Field
                                      type="number"
                                      className="form-control shadow inputDesign"
                                      id="SuperCurrentBalance"
                                      name="SuperCurrentBalance"
                                      placeholder="Current Balance"
                                    />
                                    <ErrorMessage
                                      component="div"
                                      className="text-danger fw-bold"
                                      name="SuperCurrentBalance"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 mb-3">
                                    <label
                                      htmlFor="SuperTaxFree"
                                      className="form-label"
                                    >
                                      Tax Free
                                    </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                    <Field
                                      type="number"
                                      className="form-control shadow inputDesign"
                                      id="SuperTaxFree"
                                      name="SuperTaxFree"
                                      placeholder="Tax Free"
                                    />
                                    <ErrorMessage
                                      component="div"
                                      className="text-danger fw-bold"
                                      name="SuperTaxFree"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 mb-3">
                                    <label
                                      htmlFor="SuperTaxed"
                                      className="form-label"
                                    >
                                      Taxed
                                    </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                    <Field
                                      type="number"
                                      className="form-control shadow inputDesign"
                                      id="SuperTaxed"
                                      name="SuperTaxed"
                                      placeholder="Taxed"
                                      readOnly={true}
                                      value={
                                        values.SuperCurrentBalance -
                                        values.SuperTaxFree
                                      }
                                    />
                                    {/* <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="SuperTaxed"
                                      /> */}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 mb-3">
                                    <label
                                      htmlFor="SuperRestrictionNonPreserved"
                                      className="form-label"
                                    >
                                      Restriction Non Preserved
                                    </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                    <Field
                                      type="number"
                                      className="form-control shadow inputDesign"
                                      id="SuperRestrictionNonPreserved"
                                      name="SuperRestrictionNonPreserved"
                                      placeholder="Restriction Non Preserved"
                                    />
                                    <ErrorMessage
                                      component="div"
                                      className="text-danger fw-bold"
                                      name="SuperRestrictionNonPreserved"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 mb-3">
                                    <label
                                      htmlFor="SuperUnRestrictionNonPreserved"
                                      className="form-label"
                                    >
                                      Un-Restriction Non Preserved
                                    </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                    <Field
                                      type="number"
                                      className="form-control shadow inputDesign"
                                      id="SuperUnRestrictionNonPreserved"
                                      name="SuperUnRestrictionNonPreserved"
                                      placeholder="UnRestriction Non Preserved"
                                    />
                                    <ErrorMessage
                                      component="div"
                                      className="text-danger fw-bold"
                                      name="SuperUnRestrictionNonPreserved"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 mb-3">
                                    <label
                                      htmlFor="SuperPreservedAmount"
                                      className="form-label"
                                    >
                                      Preserved Amount
                                    </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                    <Field
                                      type="number"
                                      className="form-control shadow inputDesign"
                                      id="SuperPreservedAmount"
                                      name="SuperPreservedAmount"
                                      placeholder="Preserved Amount"
                                      readOnly={true}
                                      value={
                                        values.SuperCurrentBalance -
                                        values.SuperRestrictionNonPreserved -
                                        values.SuperUnRestrictionNonPreserved
                                      }
                                    />
                                    {/* <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="SuperPreservedAmount"
                                      /> */}
                                  </div>
                                </div>
                              </div>
                              {/* Solicitor */}

                              {/* <------------------------------------------------------------> */}

                              {/* INVESTMENT MODEL TRIGGER BUTTON */}
                              <button
                                type="button"
                                onClick={handleShow}
                                className="btn bgColor modalBtn"
                              >
                                Investments
                              </button>

                              {/* NESTED INVESTMENT MODAL */}
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
                                    Investment Option Details
                                  </Modal.Title>
                                </Modal.Header>
                                <Formik
                                  initialValues={
                                    InvestmentModalEdit
                                      ? InvestmentModalObj[0]
                                      : initialValuesInvestmentOptionDetails
                                  }
                                  validationSchema={
                                    validateYupSchemaInvestmentOptionDetails
                                  }
                                  onSubmit={
                                    On_submit_validateYupSchemaInvestmentOptionDetails
                                  }
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
                                          {/* Row 1*/}
                                          <div className="row">
                                            <div className="col-6 mb-3">
                                              <label
                                                htmlFor="InvestmentOptionDetailsInvestment"
                                                className="form-label"
                                              >
                                                Investment
                                              </label>
                                            </div>
                                            <div className="col-6 mb-3">
                                              <Field
                                                as="select"
                                                id="InvestmentOptionDetailsInvestment"
                                                name="InvestmentOptionDetailsInvestment"
                                                className="form-select shadow  inputDesign"
                                                onChange={(e) =>
                                                  setFieldValue(
                                                    "InvestmentOptionDetailsInvestment",
                                                    e.target.value
                                                  )
                                                }
                                                value={
                                                  values.InvestmentOptionDetailsInvestment
                                                }
                                              >
                                                <option value="Select">
                                                  Select Investment Options
                                                </option>
                                                <option value="AMI001SUP - AMIST Super-Secure">
                                                  AMI001SUP - AMIST Super-Secure
                                                </option>
                                                <option value="AMI002SUP - AMIST Super-Capital Stable">
                                                  AMI002SUP - AMIST
                                                  Super-Capital Stable
                                                </option>
                                                <option value="AMI003SUP - AMIST Super-Balanced">
                                                  AMI003SUP - AMIST
                                                  Super-Balanced
                                                </option>
                                                <option value="AMI004SUP - AMIST Super-Growth">
                                                  AMI004SUP - AMIST Super-Growth
                                                </option>
                                                <option value="AMI005SUP - AMIST Super-High Growth">
                                                  AMI005SUP - AMIST Super-High
                                                  Growth
                                                </option>
                                              </Field>
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="InvestmentOptionDetailsInvestment"
                                              />
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-6 mb-3">
                                              <label
                                                htmlFor="InvestmentOptionDetailsCurrentValue"
                                                className="form-label"
                                              >
                                                Current Value
                                              </label>
                                            </div>
                                            <div className="col-6 mb-3">
                                              <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="InvestmentOptionDetailsCurrentValue"
                                                name="InvestmentOptionDetailsCurrentValue"
                                                value={
                                                  values.InvestmentOptionDetailsCurrentValue
                                                }
                                                placeholder="Current Value"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="InvestmentOptionDetailsCurrentValue"
                                              />
                                            </div>
                                          </div>

                                          {/* Row 1*/}
                                          {/* DISPLAY TABLE */}
                                          <div
                                            className="table-responsive my-3"
                                            id="InvestmentOptionDetailsTable"
                                          >
                                            <table className="table table-bordered table-hover text-center">
                                              <thead
                                                className="text-light"
                                                id="tableHead"
                                              >
                                                <tr>
                                                  <th>Code</th>
                                                  <th>Option</th>
                                                  <th>Current Value</th>
                                                  <th>Operations</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {InvestmentModal.map(
                                                  (elem, index) => {
                                                    // let { InvestmentOptionDetailsInvestment, InvestmentOptionDetailsCurrentValue } = elem;
                                                    return (
                                                      <tr>
                                                        <td>2r5rs</td>
                                                        <td>
                                                          {
                                                            elem.InvestmentOption
                                                          }
                                                        </td>
                                                        <td>
                                                          {" "}
                                                          {elem.CurrentValue}
                                                        </td>
                                                        <td>
                                                          <button
                                                            type="button"
                                                            onClick={(e) =>
                                                              InvestmentModaldeleteHandler(
                                                                elem
                                                              )
                                                            }
                                                            className="btn btn-danger btn-sm"
                                                          >
                                                            delete
                                                          </button>
                                                          <button
                                                            type="button"
                                                            onClick={(e) =>
                                                              InvestmentModalupdateHandler(
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
                                                  }
                                                )}
                                              </tbody>
                                            </table>
                                          </div>
                                          {/* DISPLAY TABLE */}
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
                              {/* NESTED INVESTMENT MODAL */}

                              <button
                                type="button"
                                onClick={handleShow2}
                                className="btn bgColor modalBtn mx-2"
                              >
                                Insurance
                              </button>
                              {/* NESTED INSURANCE MODAL at line 4461 */}

                              <button
                                type="button"
                                onClick={handleShow3}
                                className="btn bgColor modalBtn"
                              >
                                Beneficiaries
                              </button>
                              {/* NESTED BENFICIARIES MODAL  at line 4648  */}

                              <button
                                type="button"
                                onClick={handleShow4}
                                className="btn bgColor modalBtn mx-2"
                              >
                                Contributions
                              </button>
                              {/* NESTED CONTRIBUTION MODAL */}

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
                                  onClick={SuperhandleClose}
                                >
                                  Cancel
                                </button>
                              </div>
                            </Modal.Footer>
                          </Form>
                        )}
                      </Formik>
                    </Modal>
                    {/* INNer Modals  */}

                    {/* NESTED INSURANCE MODAL */}
                    <Modal
                      show={show2}
                      onHide={handleClose2}
                      backdrop="static"
                      className="modal-lg"
                      keyboard={false}
                    >
                      <Modal.Header className="text-light modalBG " closeButton>
                        <Modal.Title className="fontStyle">
                          Insurance Details
                        </Modal.Title>
                      </Modal.Header>
                      <Formik
                        initialValues={
                          InsuranceDataListUpdateFlag
                            ? InsuranceDataListObj[0]
                            : initialValuesInsuranceOptionDetails
                        }
                        validationSchema={
                          validateYupSchemaInsuranceOptionDetails
                        }
                        onSubmit={
                          On_submit_validateYupSchemaInsuranceOptionDetails
                        }
                        enableReinitialize
                      >
                        {({ values, handleChange, setFieldValue, formik }) => (
                          <Form>
                            <Modal.Body>
                              <div className="row">
                                <div className="col-6 mb-3">
                                  {/* Toggle 1*/}
                                  <label className="form-label">
                                    Do you have any insurance attached?
                                  </label>
                                </div>
                                <div className="col-6 mb-3">
                                  {/* switch button style */}
                                  <div className="form-check form-switch m-0 p-0 ">
                                    <div className="radiobutton">
                                      <input
                                        type="radio"
                                        name="insuranceAttachedOption"
                                        id="insuranceAttachedOption"
                                        value="Yes"
                                        //  onClick={() => investmentRadioHandler("Yes")}
                                        onChange={handleChange}
                                        checked={
                                          values.insuranceAttachedOption ===
                                          "Yes"
                                        }
                                      />
                                      <label
                                        htmlFor="insuranceAttachedOption"
                                        className="label1"
                                      >
                                        <span>YES</span>
                                      </label>
                                      <input
                                        type="radio"
                                        name="insuranceAttachedOption"
                                        id="insuranceAttachedOption1"
                                        value="No"
                                        // onClick={() => investmentRadioHandler("No")}
                                        onChange={handleChange}
                                        checked={
                                          values.insuranceAttachedOption ===
                                          "No"
                                        }
                                      />
                                      <label
                                        htmlFor="insuranceAttachedOption1"
                                        className="label2"
                                      >
                                        <span>NO</span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                {/* Toggle # 1*/}
                              </div>
                              {values.insuranceAttachedOption === "Yes" && (
                                <div className="row">
                                  <div className="col-6 mb-3">
                                    {/* Toggle 2*/}
                                    <label className="form-label">
                                      Do you have any Life/TPD insurance?
                                    </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                    {/* switch button style */}
                                    <div className="form-check form-switch m-0 p-0 ">
                                      <div className="radiobutton">
                                        <input
                                          type="radio"
                                          name="insuranceLifeTPDAttached"
                                          id="insuranceLifeTPDAttached"
                                          value="Yes"
                                          //  onClick={() => investmentRadioHandler("Yes")}
                                          onChange={handleChange}
                                          checked={
                                            values.insuranceLifeTPDAttached ===
                                            "Yes"
                                          }
                                        />
                                        <label
                                          htmlFor="insuranceLifeTPDAttached"
                                          className="label1"
                                        >
                                          <span>YES</span>
                                        </label>
                                        <input
                                          type="radio"
                                          name="insuranceLifeTPDAttached"
                                          id="insuranceLifeTPDAttached1"
                                          value="No"
                                          //onClick={() => investmentRadioHandler("No")}
                                          onChange={handleChange}
                                          checked={
                                            values.insuranceLifeTPDAttached ===
                                            "No"
                                          }
                                        />
                                        <label
                                          htmlFor="insuranceLifeTPDAttached1"
                                          className="label2"
                                        >
                                          <span>NO</span>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Toggle # 2*/}
                                </div>
                              )}

                              {values.insuranceLifeTPDAttached == "Yes" &&
                                values.insuranceAttachedOption == "Yes" && (
                                  <div>
                                    {/* Row # 1 */}
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="CoverType"
                                          className="form-label"
                                        >
                                          Cover Type
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          as="select"
                                          id="CoverType"
                                          name="CoverType"
                                          className="form-select shadow  inputDesign"
                                          onChange={(e) =>
                                            setFieldValue(
                                              "CoverType",
                                              e.target.value
                                            )
                                          }
                                          value={values.CoverType}
                                        >
                                          <option value="">Select</option>
                                          <option value="Fixed Level">
                                            Fixed Level
                                          </option>
                                          <option value="Unitised">
                                            Unitised
                                          </option>
                                        </Field>
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="CoverType"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="LifeCover"
                                          className="form-label"
                                        >
                                          Life Cover
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="LifeCover"
                                          name="LifeCover"
                                          placeholder="Life Cover"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="LifeCover"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="TPDCover"
                                          className="form-label"
                                        >
                                          TPD Cover
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="TPDCover"
                                          name="TPDCover"
                                          placeholder="TPD Cover"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="TPDCover"
                                        />
                                      </div>
                                    </div>

                                    {/* Row # 1 */}
                                    {/* Row # 2 */}
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="CostPA"
                                          className="form-label"
                                        >
                                          Cost p.a.
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="CostPA"
                                          name="CostPA"
                                          placeholder="Cost p.a."
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="CostPA"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="PremiumType"
                                          className="form-label"
                                        >
                                          Premium Type
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          as="select"
                                          id="PremiumType"
                                          name="PremiumType"
                                          placeholder="Premium Type"
                                          className="form-select shadow  inputDesign"
                                          //onChange={(e) => setFieldValue("PremiumType", e.target.value)}
                                          value={values.PremiumType}
                                        >
                                          <option value="Level">Level</option>
                                          <option value="Stepped">
                                            Stepped
                                          </option>
                                          <option value="Other">Other</option>
                                        </Field>
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="PremiumType"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label className="form-label">
                                          Any Loading Or Exclusions?
                                        </label>
                                        {/* switch button style */}
                                      </div>
                                      <div className="col-6 mb-3">
                                        <div className="form-check form-switch m-0 p-0 ">
                                          <div className="radiobutton">
                                            <input
                                              type="radio"
                                              name="anyLoadingOrExclusionsAttached"
                                              id="anyLoadingOrExclusionsAttached"
                                              value="Yes"
                                              //  onClick={() => investmentRadioHandler("Yes")}
                                              onChange={handleChange}
                                              checked={
                                                values.anyLoadingOrExclusionsAttached ===
                                                "Yes"
                                              }
                                            />
                                            <label
                                              htmlFor="anyLoadingOrExclusionsAttached"
                                              className="label1"
                                            >
                                              <span>YES</span>
                                            </label>
                                            <input
                                              type="radio"
                                              name="anyLoadingOrExclusionsAttached"
                                              id="anyLoadingOrExclusionsAttached1"
                                              value="No"
                                              //onClick={() => investmentRadioHandler("No")}
                                              onChange={handleChange}
                                              checked={
                                                values.anyLoadingOrExclusionsAttached ===
                                                "No"
                                              }
                                            />
                                            <label
                                              htmlFor="anyLoadingOrExclusionsAttached1"
                                              className="label2"
                                            >
                                              <span>NO</span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Row # 2 */}
                                  </div>
                                )}
                              {/* Row # 3 */}

                              {values.anyLoadingOrExclusionsAttached ===
                                "Yes" &&
                                values.insuranceLifeTPDAttached === "Yes" &&
                                values.insuranceAttachedOption === "Yes" && (
                                  <div className="row">
                                    <div className="col-6 mb-3">
                                      <label
                                        htmlFor="Pleaseprovidedetails"
                                        className="form-label"
                                      >
                                        Please provide details{" "}
                                      </label>
                                    </div>
                                    <div className="col-6 mb-3">
                                      <Field
                                        className="form-control shadow inputDesign"
                                        id="Pleaseprovidedetails"
                                        name="Pleaseprovidedetails"
                                        placeholder="Please provide details"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Pleaseprovidedetails"
                                      />
                                    </div>
                                  </div>
                                )}

                              {values.insuranceAttachedOption === "Yes" && (
                                <div className="row">
                                  <div className="col-6 mb-3">
                                    <label className="form-label">
                                      Have any Income Protection?
                                    </label>
                                    {/* switch button style */}
                                  </div>
                                  <div className="col-6 mb-3">
                                    <div className="form-check form-switch m-0 p-0 ">
                                      <div className="radiobutton">
                                        <input
                                          type="radio"
                                          name="incomeProtectionAttached"
                                          id="incomeProtectionAttached"
                                          value="Yes"
                                          //  onClick={() => investmentRadioHandler("Yes")}
                                          onChange={handleChange}
                                          checked={
                                            values.incomeProtectionAttached ===
                                            "Yes"
                                          }
                                        />
                                        <label
                                          htmlFor="incomeProtectionAttached"
                                          className="label1"
                                        >
                                          <span>YES</span>
                                        </label>
                                        <input
                                          type="radio"
                                          name="incomeProtectionAttached"
                                          id="incomeProtectionAttached1"
                                          value="No"
                                          //onClick={() => investmentRadioHandler("No")}
                                          onChange={handleChange}
                                          checked={
                                            values.incomeProtectionAttached ===
                                            "No"
                                          }
                                        />
                                        <label
                                          htmlFor="incomeProtectionAttached1"
                                          className="label2"
                                        >
                                          <span>NO</span>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* YAHN SE RENDERING START */}

                              {values.incomeProtectionAttached == "Yes" && values.insuranceAttachedOption == "Yes" && (
                                  <div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="MonthlyBenefit"
                                          className="form-label"
                                        >
                                          Monthly Benefit
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="MonthlyBenefit"
                                          name="MonthlyBenefit"
                                          placeholder="Monthly Benefit"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="MonthlyBenefit"
                                        />
                                      </div>
                                    </div>

                                    {/* Row # 3 */}

                                    {/* Row # 4 */}
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="waitingPeriod"
                                          className="form-label"
                                        >
                                          Waiting Period
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          as="select"
                                          id="waitingPeriod"
                                          name="waitingPeriod"
                                          placeholder="Waiting Period"
                                          className="form-select shadow  inputDesign"
                                          onChange={(e) =>
                                            setFieldValue(
                                              "waitingPeriod",
                                              e.target.value
                                            )
                                          }
                                          value={values.waitingPeriod}
                                        >
                                          <option value="">Select</option>
                                          <option value="30 Days">
                                            30 Days
                                          </option>
                                          <option value="60 Days">
                                            60 Days
                                          </option>
                                          <option value="90 Days">
                                            90 Days
                                          </option>
                                          <option value="180 Days">
                                            180 Days
                                          </option>
                                          <option value="1 Year">1 Year</option>
                                          <option value="2 Year">2 Year</option>
                                        </Field>
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="waitingPeriod"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="benefitPeriod"
                                          className="form-label"
                                        >
                                          Benefit Period
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          as="select"
                                          id="benefitPeriod"
                                          name="benefitPeriod"
                                          placeholder="Benefit Period"
                                          className="form-select shadow  inputDesign"
                                          //onChange={(e) => setFieldValue("benefitPeriod", e.target.value)}
                                          value={values.benefitPeriod}
                                        >
                                          <option value="Select">Select</option>
                                          <option value="1 Year">1 Year</option>
                                          <option value="2 Years">
                                            2 Years
                                          </option>
                                          <option value="5 Years">
                                            5 Years
                                          </option>
                                          <option value="Age Until 60">
                                            Age Until 60
                                          </option>
                                          <option value="Age Until 65">
                                            Age Until 65
                                          </option>
                                          <option value="Age Until 67">
                                            Age Until 67
                                          </option>
                                          <option value="Age Until 70">
                                            Age Until 70
                                          </option>
                                        </Field>
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="benefitPeriod"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="agreedOrIndemnity"
                                          className="form-label"
                                        >
                                          Agreed or indemnity?
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          as="select"
                                          id="agreedOrIndemnity"
                                          name="agreedOrIndemnity"
                                          placeholder="Agreed or indemnity?"
                                          className="form-select shadow  inputDesign"
                                          //onChange={(e) => setFieldValue("agreedOrIndemnity", e.target.value)}
                                          value={values.agreedOrIndemnity}
                                        >
                                          <option value="Select">Select</option>
                                          <option value="Agreed">Agreed</option>
                                          <option value="Indemnity">
                                            Indemnitys
                                          </option>
                                        </Field>
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="agreedOrIndemnity"
                                        />
                                      </div>
                                    </div>
                                    {/* Row # 4 */}
                                    {/* Row # 5 */}
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="CostPASecond"
                                          className="form-label"
                                        >
                                          Cost p.a.
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="CostPASecond"
                                          name="CostPASecond"
                                          placeholder="Cost p.a."
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="CostPASecond"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="PremiumTypeSecond"
                                          className="form-label"
                                        >
                                          Premium Type
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          as="select"
                                          id="PremiumTypeSecond"
                                          name="PremiumTypeSecond"
                                          placeholder="Premium Type"
                                          className="form-select shadow  inputDesign"
                                          //onChange={(e) => setFieldValue("PremiumTypeSecond", e.target.value)}
                                          value={values.PremiumTypeSecond}
                                        >
                                          <option value="Level">Level</option>
                                          <option value="Stepped">
                                            Stepped
                                          </option>
                                          <option value="Other">Other</option>
                                        </Field>
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="PremiumTypeSecond"
                                        />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label className="form-label">
                                          Includes Super Continuance?
                                        </label>
                                        {/* switch button style */}
                                      </div>
                                      <div className="col-6 mb-3">
                                        <div className="form-check form-switch m-0 p-0 ">
                                          <div className="radiobutton">
                                            <input
                                              type="radio"
                                              name="IncludesSuperContinuance"
                                              id="IncludesSuperContinuance"
                                              value="Yes"
                                              //  onClick={() => investmentRadioHandler("Yes")}
                                              onChange={handleChange}
                                              checked={
                                                values.IncludesSuperContinuance ===
                                                "Yes"
                                              }
                                            />
                                            <label
                                              htmlFor="IncludesSuperContinuance"
                                              className="label1"
                                            >
                                              <span>YES</span>
                                            </label>
                                            <input
                                              type="radio"
                                              name="IncludesSuperContinuance"
                                              id="IncludesSuperContinuance1"
                                              value="No"
                                              //onClick={() => investmentRadioHandler("No")}
                                              onChange={handleChange}
                                              checked={
                                                values.IncludesSuperContinuance ===
                                                "No"
                                              }
                                            />
                                            <label
                                              htmlFor="IncludesSuperContinuance1"
                                              className="label2"
                                            >
                                              <span>NO</span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* Row # 5 */}

                                    {/* Row # 6 */}
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label className="form-label">
                                          Is the benefit indexed?
                                        </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 ">
                                          <div className="radiobutton">
                                            <input
                                              type="radio"
                                              name="Isthebenefitindexed"
                                              id="Isthebenefitindexed"
                                              value="Yes"
                                              //  onClick={() => investmentRadioHandler("Yes")}
                                              onChange={handleChange}
                                              checked={
                                                values.Isthebenefitindexed ===
                                                "Yes"
                                              }
                                            />
                                            <label
                                              htmlFor="Isthebenefitindexed"
                                              className="label1"
                                            >
                                              <span>YES</span>
                                            </label>
                                            <input
                                              type="radio"
                                              name="Isthebenefitindexed"
                                              id="Isthebenefitindexed1"
                                              value="No"
                                              //onClick={() => investmentRadioHandler("No")}
                                              onChange={handleChange}
                                              checked={
                                                values.Isthebenefitindexed ===
                                                "No"
                                              }
                                            />
                                            <label
                                              htmlFor="Isthebenefitindexed1"
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
                                          Any Loading Or Exclusions?
                                        </label>
                                      </div>
                                      {/* switch button style */}
                                      <div className="col-6 mb-3">
                                        <div className="form-check form-switch m-0 p-0 ">
                                          <div className="radiobutton">
                                            <input
                                              type="radio"
                                              name="AnyLoadingOrExclusions"
                                              id="AnyLoadingOrExclusions"
                                              value="Yes"
                                              //  onClick={() => investmentRadioHandler("Yes")}
                                              onChange={handleChange}
                                              checked={
                                                values.AnyLoadingOrExclusions ===
                                                "Yes"
                                              }
                                            />
                                            <label
                                              htmlFor="AnyLoadingOrExclusions"
                                              className="label1"
                                            >
                                              <span>YES</span>
                                            </label>
                                            <input
                                              type="radio"
                                              name="AnyLoadingOrExclusions"
                                              id="AnyLoadingOrExclusions1"
                                              value="No"
                                              //onClick={() => investmentRadioHandler("No")}
                                              onChange={handleChange}
                                              checked={
                                                values.AnyLoadingOrExclusions ===
                                                "No"
                                              }
                                            />
                                            <label
                                              htmlFor="AnyLoadingOrExclusions1"
                                              className="label2"
                                            >
                                              <span>NO</span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {values.AnyLoadingOrExclusions ===
                                      "Yes" && (
                                      <div className="row">
                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="PleaseprovidedetailsSecond"
                                            className="form-label"
                                          >
                                            Please provide details
                                          </label>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            className="form-control shadow inputDesign"
                                            id="PleaseprovidedetailsSecond"
                                            name="PleaseprovidedetailsSecond"
                                            placeholder="Please provide details"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="PleaseprovidedetailsSecond"
                                          />
                                        </div>
                                      </div>
                                    )}
                                    {/* Row # 6 */}
                                  </div>
                                )}
                            </Modal.Body>
                            <Modal.Footer>
                              <div className="col-md-12">
                                <button
                                  className="float-end btn w-25  bgColor modalBtn"
                                  //onClick={handleClose2}
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
                    {/* NESTED INSURANCE MODAL */}

                    {/* NESTED BENFICIARIES MODAL */}
                    <Modal
                      show={show3}
                      onHide={handleClose3}
                      backdrop="static"
                      className="modal-lg"
                      keyboard={false}
                    >
                      <Modal.Header className="text-light modalBG " closeButton>
                        <Modal.Title className="fontStyle">
                          Beneficiaries Details 
                        </Modal.Title>
                      </Modal.Header>
                      <Formik
                        initialValues={
                          BeneficiaryDataListUpdateFlag
                            ? BeneficiaryDataListObj[0]
                            : initialValuesBeneficiariesOptionDetails
                        }
                        validationSchema={
                          validateYupSchemaBeneficiariesOptionDetails
                        }
                        onSubmit={
                          On_submit_validateYupSchemaBeneficiariesOptionDetails
                        }
                        enableReinitialize
                      >
                        {({ values, handleChange, setFieldValue, formik }) => (
                          <Form>
                            <Modal.Body>
                              {/* Family Assets Details*/}
                              <div className="row">
                                <div className="col-6 mb-3">
                              <label className="form-label">
                                Do you have any Nominated Beneficiaries on the
                                Account?
                              </label>
                                </div>
                                <div className="col-6 mb-3">

                              {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="clientNestedbeneficiariesAttached"
                                    id="clientNestedbeneficiariesAttached1"
                                    value="Yes"
                                    //  onClick={() => beneficiariesRadioHandler("Yes")}
                                    onChange={handleChange}
                                    checked={
                                      values.clientNestedbeneficiariesAttached ===
                                      "Yes"
                                    }
                                  />
                                  <label
                                    htmlFor="clientNestedbeneficiariesAttached1"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="clientNestedbeneficiariesAttached"
                                    id="clientNestedbeneficiariesAttached2"
                                    value="No"
                                    //onClick={() => beneficiariesRadioHandler("No")}
                                    onChange={handleChange}
                                    checked={
                                      values.clientNestedbeneficiariesAttached ===
                                      "No"
                                    }
                                  />
                                  <label
                                    htmlFor="clientNestedbeneficiariesAttached2"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                              </div>
                            </div>

                              {values.clientNestedbeneficiariesAttached ==
                                "Yes" && (
                                <div className="">
                                  <div className="row">

                                    <div className="col-6 mb-3">
                                        <label
                                          htmlFor="NomiationTypeBeneficiary"
                                          className="form-label"
                                          >
                                          Nomination Type
                                        </label>
                                          </div>
                                          <div className="col-6 mb-3">
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
                                            <div className="row">

                                      <div className="col-6 mb-3">
                                        <label
                                          htmlFor="BeneficiariesOptionDetailsBeneficiaries"
                                          className="form-label"
                                          >
                                          How many beneficiaries do you have?
                                        </label>
                                          </div>           
                                          <div className="col-6 mb-3">
                                        <Field
                                          as="select"
                                          id="BeneficiariesOptionDetailsBeneficiaries"
                                          name="BeneficiariesOptionDetailsBeneficiaries"
                                          className="form-select shadow  inputDesign"
                                          onChange={(e) =>
                                            setFieldValue(
                                              "BeneficiariesOptionDetailsBeneficiaries",
                                              e.target.value
                                            )
                                          }
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
                                            <option value="Child">Child</option>
                                            <option value="Other">Other</option>
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
                                            className="form-control shadow inputDesign"
                                            id="Beneficiary2"
                                            name="Beneficiary2"
                                            placeholder="Beneficiary 2"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="Beneficiary2"
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
                                            <option value="Child">Child</option>
                                            <option value="Other">Other</option>
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
                                            <option value="Child">Child</option>
                                            <option value="Other">Other</option>
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
                                            <option value="Child">Child</option>
                                            <option value="Other">Other</option>
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
                                            <option value="Child">Child</option>
                                            <option value="Other">Other</option>
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
                            </Modal.Body>
                            <Modal.Footer>
                              <div className="col-md-12">
                                <button
                                  className="float-end btn w-25  bgColor modalBtn"
                                  // onClick={handleClose3}
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

                    {/* NESTED CONTRIBUTION MODAL */}
                    <Modal
                      show={show4}
                      onHide={handleClose4}
                      backdrop="static"
                      className="modal-lg"
                      keyboard={false}
                    >
                      <Modal.Header className="text-light modalBG " closeButton>
                        <Modal.Title className="fontStyle">
                          Contribution Details here
                        </Modal.Title>
                      </Modal.Header>
                      <Formik
                        initialValues={
                          contributionModalUpdateFlag
                            ? contributionModalObj[0]
                            : initialValuesContributionOptionDetails
                        }
                        validationSchema={
                          validateYupSchemaContributionOptionDetails
                        }
                        onSubmit={
                          On_submit_validateYupSchemaContributionOptionDetails
                        }
                        enableReinitialize
                      >
                        {({ values, handleChange, setFieldValue, formik }) => (
                          <Form>
                            <Modal.Body>
                              <label className="form-label">
                                Do you contribute to this fund?
                              </label>
                              {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="clientinvestmentAttached"
                                    id="clientinvestmentAttached"
                                    value="Yes"
                                    //  onClick={() => investmentRadioHandler("Yes")}
                                    onChange={handleChange}
                                    checked={
                                      values.clientinvestmentAttached === "Yes"
                                    }
                                  />
                                  <label
                                    htmlFor="clientinvestmentAttached"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="clientinvestmentAttached"
                                    id="clientinvestmentAttached2"
                                    value="No"
                                    //onClick={() => investmentRadioHandler("No")}
                                    onChange={handleChange}
                                    checked={
                                      values.clientinvestmentAttached === "No"
                                    }
                                  />
                                  <label
                                    htmlFor="clientinvestmentAttached2"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                              {values.clientinvestmentAttached == "Yes" && (
                                <div className="">
                                  {/* Row 1*/}
                                  <div>
                                    <h3 className="mt-5">FY 2023</h3>

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
                                    <h3 className="mt-2">FY 2022</h3>

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
                                    <h3 className="mt-2">FY 2021</h3>

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
                            </Modal.Body>
                            <Modal.Footer>
                              <div className="col-md-12">
                                <button
                                  className="float-end btn w-25  bgColor modalBtn"
                                  // onClick={handleClose4}
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
                    {/* NESTED CONTRIBUTION MODAL */}

                    {/* INNer Modals  */}

                    {/* ---------------------------------------------------- */}
                    {/*CLIENT SUPER ACCOUNT DISPLAY TABLE */}
                    <div
                      className="table-responsive my-3"
                      id="ClientSuperAccountDisplayTable"
                    >
                      <table className="table table-bordered table-hover text-center">
                        <thead className="text-light" id="tableHead">
                          <tr>
                            <th>Fund Name</th>
                            <th>Member #</th>
                            <th>Current Value</th>
                            <th>Investment Options</th>
                            <th>Insurance Attached</th>
                            <th>Contributions</th>
                            <th>Nominated Beneficiaries</th>
                            <th>Operations</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ClientSuperAccounts.map((elem, index) => {
                            return (
                              <tr>
                                <td>{elem.Super_FundName}</td>
                                <td>{elem.Super_MemberNO}</td>
                                <td>{elem.Super_CurrentBalance}</td>
                                <td>Yes</td>
                                <td>Yes</td>
                                <td>No</td>
                                <td>Yes</td>
                                <td>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      ClientSuperAccountsDeleteHandler(
                                        elem,
                                        index
                                      );
                                    }}
                                    className="btn btn-danger btn-sm"
                                  >
                                    delete
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      ClientSuperAccountsUpdateHandler(
                                        elem,
                                        index
                                      );
                                    }}
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
                    {/*CLIENT SUPER ACCOUNT DISPLAY TABLE */}

                    {/*CLIENT SUPER ACCOUNT Insurance  DISPLAY TABLE */}
                    <h3>Client Insurance</h3>
                    <div className="table-responsive my-3">
                      <table className="table table-bordered table-hover text-center">
                        <thead className="text-light" id="tableHead">
                          <tr>
                            <th>Cover Type</th>
                            <th>Life Cover</th>
                            <th>TPD Cover</th>
                            <th>Cost p.a.</th>
                            <th>Premium Type</th>
                            <th>Any Loading Or Exclusions?</th>
                            <th>Waiting Period</th>
                            <th>Operations</th>
                          </tr>
                        </thead>
                        <tbody>
                          {InsuranceDataList.map((elem, index) => {
                            return (
                              <tr>
                                <th>{elem.CoverType}</th>
                                <th>{elem.LifeCover}</th>
                                <th>{elem.TPDCover}</th>
                                <th>{elem.CostPA}</th>
                                <th>{elem.PremiumType}</th>
                                <th>{elem.LoadingExecutions}</th>
                                <th>{elem.WaitingPeriod}</th>

                                <th>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      InsuranceDataListDeleteHandler(
                                        elem,
                                        index
                                      );
                                    }}
                                    className="btn btn-danger btn-sm"
                                  >
                                    delete
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      InsuranceDataListUpdateHandler(
                                        elem,
                                        index
                                      );
                                    }}
                                    className="btn btn-warning btn-sm mx-2"
                                  >
                                    update
                                  </button>
                                </th>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    {/*CLIENT SUPER ACCOUNT Insurance  DISPLAY TABLE */}

                    {/*CLIENT SUPER ACCOUNT BENFICIARIES  DISPLAY TABLE */}
                    <h3>Client Benficiaries</h3>
                    <div className="table-responsive my-3">
                      <table className="table table-bordered table-hover text-center">
                        <thead className="text-light" id="tableHead">
                          <tr>
                            <th>No_ofBeneficiaries</th>
                            <th>NominatedBeneficiary</th>
                            <th>NominationType</th>
                            <th>Operations</th>
                          </tr>
                        </thead>
                        <tbody>
                          {BeneficiaryDataList.map((elem, index) => {
                            return (
                              <tr>
                                <th>{elem.No_ofBeneficiaries}</th>
                                <th>{elem.NominatedBeneficiary}</th>
                                <th>{elem.NominationType}</th>

                                <th>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      BeneficiaryDataListDeleteHandler(
                                        elem,
                                        index
                                      );
                                    }}
                                    className="btn btn-danger btn-sm"
                                  >
                                    delete
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      BeneficiaryDataListUpdateHandler(
                                        elem,
                                        index
                                      );
                                    }}
                                    className="btn btn-warning btn-sm mx-2"
                                  >
                                    update
                                  </button>
                                </th>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    {/*CLIENT SUPER ACCOUNT BENFICIARIES  DISPLAY TABLE */}

                    {/*CLIENT SUPER ACCOUNT CONTRIBUTION  DISPLAY TABLE */}
                    <h3>Client Contributions</h3>
                    <div className="table-responsive my-3">
                      <table className="table table-bordered table-hover text-center">
                        <thead className="text-light" id="tableHead">
                          <tr>
                            <th>Non Concessional Fy2023</th>
                            <th>Salary Sac & Ded Fy2023</th>
                            <th>Non Concessional Fy2022</th>
                            <th>Salary Sac & Ded Fy2022</th>
                            <th>Non Concessional Fy2021</th>
                            <th>Salary Sac & Ded Fy2021</th>
                            <th>Operations</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contributionModal.map((elem, index) => {
                            return (
                              <tr>
                                <th>{elem.NonConcessional1}</th>
                                <th>{elem.SalaryPersonalDed1}</th>
                                <th>{elem.NonConcessional2}</th>
                                <th>{elem.SalaryPersonalDed2}</th>
                                <th>{elem.NonConcessional3}</th>
                                <th>{elem.SalaryPersonalDed3}</th>
                                <th>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      contributionModalDeleteHandler(
                                        elem,
                                        index
                                      );
                                    }}
                                    className="btn btn-danger btn-sm"
                                  >
                                    delete
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      contributionModalUpdateHandler(
                                        elem,
                                        index
                                      );
                                    }}
                                    className="btn btn-warning btn-sm mx-2"
                                  >
                                    update
                                  </button>
                                </th>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    {/*CLIENT SUPER ACCOUNT CONTRIBUTION  DISPLAY TABLE */}

                    <h3 className="">Partner Super Accounts</h3>

                    {/* 1 row */}
                    <div className="row">
                      <div className="col-6 mb-3">
                          <label className="form-label">
                            Do you have any Super Accounts?
                          </label>
                        </div>
                        <div className="col-6 mb-3">
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input
                                type="radio"
                                name="Super2Radio"
                                id="Super2Radioopt1"
                                value="Yes"
                                onClick={() => Super2Handler("Yes")}
                                onChange={handleChange}
                                checked={values.Super2Radio === "Yes"}
                              />
                              <label
                                htmlFor="Super2Radioopt1"
                                className="label1"
                              >
                                <span>YES</span>
                              </label>
                              <input
                                type="radio"
                                name="Super2Radio"
                                id="Super2Radioopt2"
                                value="No"
                                onClick={() => Super2Handler("No")}
                                onChange={handleChange}
                                checked={values.Super2Radio === "No"}
                              />
                              <label
                                htmlFor="Super2Radioopt2"
                                className="label2"
                              >
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                      </div>
                      </div>
                        
                      {Super2 && (
                      <div className="row">
                        <div className="col-6 mb-3">
                          <label className="form-label">
                            Please enter the details of your Super Accounts
                          </label>
                          
                        </div>
                        <div className="col-6 mb-3">
                          <button
                          type="button"
                            className=" btn 
                            btn-outline-success "
                            onClick={Super2handleShow}
                          >
                            <div className="iconContainer mx-1">
                              <img className="img-fluid" src={plus} alt="" />
                            </div>
                            Enter Details
                          </button>
                        </div>
                    </div>
                      )}
                    {/* 1 row */}

                    {/* --------------------------------------------- */}

                    <Modal
                      show={Super2show}
                      onHide={Super2handleClose}
                      backdrop="static"
                      className="modal-lg"
                      keyboard={false}
                    >
                      <Modal.Header className="text-light modalBG " closeButton>
                        <Modal.Title className="fontStyle">
                          Partner Super Account Details
                          <div className="iconContainerLg">
                            <img className="img-fluid" src={notebook} alt="" />
                          </div>
                        </Modal.Title>
                      </Modal.Header>
                      <Formik
                        initialValues={
                          PartnerSuperAccountsUpdateFlag
                            ? Pension2PartnerDataListObj[0]
                            : InitialValuesMainPartnerSuperAccount
                        }
                        validationSchema={
                          partnerSuperAccountMainValidationSchema
                        }
                        onSubmit={PartnerSuperAccount_onSubmit}
                      >
                        {({
                          values,
                          setFieldValue,
                          setValues,
                          handleChange,
                          handleBlur,
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
                                  Super Accounts
                                </h3>
                                <div className="row">

                                    <div className="col-6 mb-3">
                                      <label
                                        htmlFor="Super2FundName"
                                        className="form-label"
                                      >
                                        Fund Name
                                      </label>
                                </div>
                                  <div className="col-6 mb-3">
                                      <Field
                                        as="select"
                                        name="Super2FundName"
                                        id="Super2FundName"
                                        className="form-select shadow  inputDesign"
                                      >
                                        <option value="">Select</option>
                                        <option value="AMIST Super2">
                                          AMIST Super2
                                        </option>
                                        <option value="AMP Choice">
                                          AMP Choice
                                        </option>
                                        <option value="AMP North">
                                          AMP North
                                        </option>
                                        <option value="AMP South">
                                          AMP South
                                        </option>
                                      </Field>
                                      <ErrorMessage
                                        name="Super2FundName"
                                        component="div"
                                        className="text-danger fw-bold"
                                      />
                                    </div>
                                  </div>

                                  <div className="row">

                                  <div className="col-6 mb-3">
                                      <label
                                        htmlFor="Super2MemberNo"
                                        className="form-label"
                                      >
                                        Member No
                                      </label>
                                      </div>
                                    <div className="col-6 mb-3">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Super2MemberNo"
                                        name="Super2MemberNo"
                                        placeholder="Member No"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Super2MemberNo"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">

                                    <div className="col-6 mb-3">
                                      <label
                                        htmlFor="Super2FundType"
                                        className="form-label"
                                      >
                                        Fund Type
                                      </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                      <Field
                                        as="select"
                                        name="Super2FundType"
                                        id="Super2FundType"
                                        className="form-select shadow  inputDesign"
                                      >
                                        <option value="">Select</option>
                                        <option value="Personal Industry">
                                          Personal Industry
                                        </option>
                                        <option value="Personal Retail">
                                          Personal Retail
                                        </option>
                                        <option value="Personal Master">
                                          Personal Master
                                        </option>
                                        <option value="Personal WRAP">
                                          Personal WRAP
                                        </option>
                                        <option value="Personal Public Sector">
                                          Personal Public Sector
                                        </option>
                                      </Field>
                                      <ErrorMessage
                                        name="Super2FundType"
                                        component="div"
                                        className="text-danger fw-bold"
                                      />
                                    </div>
                                  </div>
                                    <div className="row">


                                    <div className="col-6 mb-3">
                                      <label
                                        htmlFor="Super2ContactNO"
                                        className="form-label"
                                        >
                                        Contact No
                                      </label>
                                        </div>
                                  <div className="col-6 mb-3">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Super2ContactNO"
                                        name="Super2ContactNO"
                                        placeholder="Contact No"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Super2ContactNO"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">

                                    <div className="col-6 mb-3">
                                      <label
                                        htmlFor="Super2FaxNO"
                                        className="form-label"
                                      >
                                        Fax No
                                      </label>
                                      </div>
                                  <div className="col-6 mb-3">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Super2FaxNO"
                                        name="Super2FaxNO"
                                        placeholder="Fax No"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Super2FaxNO"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">

                                  <div className="col-6 mb-3">
                                      <label
                                        htmlFor="Super2PostalAddress"
                                        className="form-label"
                                      >
                                        Postal Address
                                      </label>
                                  </div>
                                    <div className="col-6 mb-3">
                                      <Field
                                        type="text"
                                        className="form-control shadow inputDesign"
                                        id="Super2PostalAddress"
                                        name="Super2PostalAddress"
                                        placeholder="Postal Address"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Super2PostalAddress"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">

                                  <div className="col-6 mb-3">
                                      <label
                                        htmlFor="Super2ABN"
                                        className="form-label"
                                      >
                                        ABN
                                      </label>
                                      </div>
                                    <div className="col-6 mb-3">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Super2ABN"
                                        name="Super2ABN"
                                        placeholder="ABN"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Super2ABN"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">

                                    <div className="col-6 mb-3">
                                      <label
                                        htmlFor="Super2SPIN"
                                        className="form-label"
                                      >
                                        SPIN
                                      </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                      <Field
                                        type="text"
                                        className="form-control shadow inputDesign"
                                        id="Super2SPIN"
                                        name="Super2SPIN"
                                        placeholder="SPIN"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Super2SPIN"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">

                                    <div className="col-6 mb-3">
                                      <label
                                        htmlFor="Super2Website"
                                        className="form-label"
                                      >
                                        Website
                                      </label>
                                      </div>
                                  <div className="col-6 mb-3">
                                      <Field
                                        type="text"
                                        className="form-control shadow inputDesign"
                                        id="Super2Website"
                                        name="Super2Website"
                                        placeholder="Website"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Super2Website"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">

                                    <div className="col-6 mb-3">
                                      <label
                                        htmlFor="Super2Email"
                                        className="form-label"
                                      >
                                        Email
                                      </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                      <Field
                                        type="text"
                                        className="form-control shadow inputDesign"
                                        id="Super2Email"
                                        name="Super2Email"
                                        placeholder="Email"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Super2Email"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">

                                    <div className="col-6 mb-3">
                                      <label
                                        htmlFor="Super2FundType2"
                                        className="form-label"
                                      >
                                        Fund Type
                                      </label>
                                      </div>
                                  <div className="col-6 mb-3">
                                      <Field
                                        as="select"
                                        name="Super2FundType2"
                                        id="Super2FundType2"
                                        className="form-select shadow  inputDesign"
                                      >
                                        <option value="">Select</option>
                                        <option value="Accumulation">
                                          Accumulation
                                        </option>
                                        <option value="Defined Benefit">
                                          Defined Benefit
                                        </option>
                                      </Field>
                                      <ErrorMessage
                                        name="Super2FundType2"
                                        component="div"
                                        className="text-danger fw-bold"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">

                                  <div className="col-6 mb-3">
                                      <label
                                        htmlFor="Super2CommencementDate"
                                        className="form-label"
                                      >
                                        Commencment Date
                                      </label>
                                      {/**   <Field type="date" className="form-control shadow inputDesign"
                                        id="Super2CommencementDate" name='Super2CommencementDate' /> */}
                                  </div>
                                        <div className="col-6 mb-3">
                                      <div>
                                        <DatePicker
                                          className="form-control inputDesign shadow"
                                          showIcon
                                          id="Super2CommencementDate"
                                          name="Super2CommencementDate"
                                          selected={
                                            values.Super2CommencementDate
                                          }
                                          onChange={(date) =>
                                            setFieldValue(
                                              "Super2CommencementDate",
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
                                        name="Super2CommencementDate"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">

                                    <div className="col-6 mb-3">
                                      <label
                                        htmlFor="Super2EligibleDate"
                                        className="form-label"
                                      >
                                        Eligible Service Date
                                      </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                      {/**  <Field type="date" className="form-control shadow inputDesign"
                                        id="Super2EligibleDate" name='Super2EligibleDate' /> */}
                                      <div>
                                        <DatePicker
                                          className="form-control inputDesign shadow"
                                          showIcon
                                          id="Super2EligibleDate"
                                          name="Super2EligibleDate"
                                          selected={values.Super2EligibleDate}
                                          onChange={(date) =>
                                            setFieldValue(
                                              "Super2EligibleDate",
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
                                        name="Super2EligibleDate"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">

                                  <div className="col-6 mb-3">
                                      <label className="form-label">
                                        TFN Quoted
                                      </label>
                                      {/* switch button style */}
                                          </div>
                                    <div className="col-6 mb-3">
                                      <div className="form-check form-switch m-0 p-0 ">
                                        <div className="radiobutton">
                                          <input
                                            type="radio"
                                            name="Super2TFNQuoted"
                                            id="Super2TFNQuoted1opt1"
                                            value="Yes"
                                            onChange={handleChange}
                                            checked={
                                              values.Super2TFNQuoted === "Yes"
                                            }
                                          />
                                          <label
                                            htmlFor="Super2TFNQuoted1opt1"
                                            className="label1"
                                          >
                                            <span>YES</span>
                                          </label>
                                          <input
                                            type="radio"
                                            name="Super2TFNQuoted"
                                            id="Super2TFNQuotedopt2"
                                            value="No"
                                            onChange={handleChange}
                                            checked={
                                              values.Super2TFNQuoted === "No"
                                            }
                                          />
                                          <label
                                            htmlFor="Super2TFNQuotedopt2"
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
                                        htmlFor="Super2CurrentBalance"
                                        className="form-label"
                                      >
                                        Current Balance
                                      </label>
                                      </div>
                                    <div className="col-6 mb-3">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Super2CurrentBalance"
                                        name="Super2CurrentBalance"
                                        placeholder="Current Balance"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Super2CurrentBalance"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">

                                    <div className="col-6 mb-3">
                                      <label
                                        htmlFor="Super2TaxFree"
                                        className="form-label"
                                      >
                                        Tax Free
                                      </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Super2TaxFree"
                                        name="Super2TaxFree"
                                        placeholder="Tax Free"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Super2TaxFree"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">

                                  <div className="col-6 mb-3">
                                      <label
                                        htmlFor="Super2Taxed"
                                        className="form-label"
                                      >
                                        Taxed
                                      </label>
                                  </div>
                                    <div className="col-6 mb-3">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Super2Taxed"
                                        name="Super2Taxed"
                                        placeholder="Taxed"
                                        value={
                                          values.Super2CurrentBalance -
                                          values.Super2TaxFree
                                        }
                                        readOnly={true}
                                      />
                                    </div>
                                  </div>
                                  <div className="row">

                                  <div className="col-6 mb-3">
                                      <label
                                        htmlFor="Super2RestrictionNonPreserved"
                                        className="form-label"
                                      >
                                        Restriction Non Preserved
                                      </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Super2RestrictionNonPreserved"
                                        name="Super2RestrictionNonPreserved"
                                        placeholder="Restriction Non Preserved"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Super2RestrictionNonPreserved"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">

                                  <div className="col-6 mb-3">
                                      <label
                                        htmlFor="Super2UnRestrictionNonPreserved"
                                        className="form-label"
                                      >
                                        Un-Restriction Non Preserved
                                      </label>
                                  </div>
                                    <div className="col-6 mb-3">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Super2UnRestrictionNonPreserved"
                                        name="Super2UnRestrictionNonPreserved"
                                        placeholder="UnRestriction Non Preserved"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Super2UnRestrictionNonPreserved"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">

                                    <div className="col-6 mb-3">
                                      <label
                                        htmlFor="Super2PreservedAmount"
                                        className="form-label"
                                      >
                                        Preserved Amount
                                      </label>
                                  </div>
                                  <div className="col-6 mb-3">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Super2PreservedAmount"
                                        name="Super2PreservedAmount"
                                        placeholder="Preserved Amount"
                                        value={
                                          values.Super2CurrentBalance -
                                          values.Super2RestrictionNonPreserved -
                                          values.Super2UnRestrictionNonPreserved
                                        }
                                        readOnly={true}
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Super2PreservedAmount"
                                      />
                                    </div>
                                  </div>
                          
                              </div>
                              {/* Solicitor */}

                              {/* Bank Account Detail Form */}

                              {/* INVESTMENT MODEL PARTNER TRIGGER BUTTON */}
                              <button
                                type="button"
                                onClick={handleShowPartner}
                                className="btn bgColor modalBtn"
                              >
                                Investments
                              </button>

                              {/* NESTED MODAL PARTNER -> INVESTMENT */}
                              <Modal
                                show={showPartner}
                                onHide={handleClosePartner}
                                backdrop="static"
                                className="modal-lg"
                                keyboard={false}
                              >
                                <Modal.Header
                                  className="text-light modalBG "
                                  closeButton
                                >
                                  <Modal.Title className="fontStyle">
                                    Investment Option Details
                                  </Modal.Title>
                                </Modal.Header>
                                <Formik
                                  initialValues={
                                    InvestmentModalPartnerEdit
                                      ? InvestmentModalPartnerObj[0]
                                      : initialValuesInvestmentPartnerOptionDetails
                                  }
                                  validationSchema={
                                    validateYupSchemaInvestmentPartnerOptionDetails
                                  }
                                  onSubmit={
                                    On_submit_validateYupSchemaInvestmentPartnerOptionDetails
                                  }
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
                                          {/* Row 1*/}
                                          <div className="row">
                                            <div className="col-6 mb-3">
                                                <label
                                                  htmlFor="InvestmentOptionDetailsInvestmentPartner"
                                                  className="form-label"
                                                >
                                                  Investment
                                                </label>
                                            </div>
                                                <div className="col-6 mb-3">
                                                <Field
                                                  as="select"
                                                  id="InvestmentOptionDetailsInvestmentPartner"
                                                  name="InvestmentOptionDetailsInvestmentPartner"
                                                  className="form-select shadow  inputDesign"
                                                  onChange={(e) =>
                                                    setFieldValue(
                                                      "InvestmentOptionDetailsInvestmentPartner",
                                                      e.target.value
                                                    )
                                                  }
                                                  value={
                                                    values.InvestmentOptionDetailsInvestmentPartner
                                                  }
                                                >
                                                  <option value="Select">
                                                    Select Investment Options
                                                  </option>
                                                  <option value="AMI001SUP - AMIST Super-Secure">
                                                    AMI001SUP - AMIST
                                                    Super-Secure
                                                  </option>
                                                  <option value="AMI002SUP - AMIST Super-Capital Stable">
                                                    AMI002SUP - AMIST
                                                    Super-Capital Stable
                                                  </option>
                                                  <option value="AMI003SUP - AMIST Super-Balanced">
                                                    AMI003SUP - AMIST
                                                    Super-Balanced
                                                  </option>
                                                  <option value="AMI004SUP - AMIST Super-Growth">
                                                    AMI004SUP - AMIST
                                                    Super-Growth
                                                  </option>
                                                  <option value="AMI005SUP - AMIST Super-High Growth">
                                                    AMI005SUP - AMIST Super-High
                                                    Growth
                                                  </option>
                                                </Field>
                                                <ErrorMessage
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                  name="InvestmentOptionDetailsInvestmentPartner"
                                                />
                                            </div>
                                            </div>
                                            <div className="row">
                                              
                                            <div className="col-6 mb-3">
                                                <label
                                                  htmlFor="InvestmentOptionDetailsCurrentValuePartner"
                                                  className="form-label"
                                                >
                                                  Current Value
                                                </label>
                                                  </div>
                                              <div className="col-6 mb-3">
                                                <Field
                                                  type="number"
                                                  className="form-control shadow inputDesign"
                                                  id="InvestmentOptionDetailsCurrentValuePartner"
                                                  name="InvestmentOptionDetailsCurrentValuePartner"
                                                  placeholder="Current Value"
                                                />
                                                <ErrorMessage
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                  name="InvestmentOptionDetailsCurrentValuePartner"
                                                />
                                            </div>
                                          </div>
                                          {/* Row 1*/}
                                          {/* DISPLAY TABLE */}
                                          <div
                                            className="table-responsive my-3"
                                            id="InvestmentOptionDetailsTable"
                                          >
                                            <table className="table table-bordered table-hover text-center">
                                              <thead
                                                className="text-light"
                                                id="tableHead"
                                              >
                                                <tr>
                                                  <th>Code</th>
                                                  <th>Option</th>
                                                  <th>Current Value</th>
                                                  <th>Operations</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {InvestmentModalPartner.map(
                                                  (elem, index) => {
                                                    return (
                                                      <tr>
                                                        <td>2r5rs</td>
                                                        <td>
                                                          {
                                                            elem.InvestmentOption
                                                          }
                                                        </td>
                                                        <td>
                                                          {" "}
                                                          {elem.CurrentValue}
                                                        </td>
                                                        <td>
                                                          <button
                                                            type="button"
                                                            onClick={() =>
                                                              InvestmentModalPartnerdeleteHandler(
                                                                elem
                                                              )
                                                            }
                                                            className="btn btn-danger btn-sm"
                                                          >
                                                            delete
                                                          </button>
                                                          <button
                                                            type="button"
                                                            onClick={() =>
                                                              PartnerInvestmentModalupdateHandler(
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
                                                  }
                                                )}
                                              </tbody>
                                            </table>
                                          </div>
                                          {/* DISPLAY TABLE */}
                                        </div>
                                      </Modal.Body>
                                      <Modal.Footer>
                                        <div className="col-md-12">
                                          <button
                                            className="float-end btn w-25  bgColor modalBtn"
                                            // onClick={handleClosePartner}
                                            type="submit"
                                          >
                                            Save
                                          </button>
                                          <button
                                            type="button"
                                            className="float-end btn w-25  btn-outline  backBtn mx-3"
                                            onClick={handleClosePartner}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </Modal.Footer>
                                    </Form>
                                  )}
                                </Formik>
                              </Modal>
                              {/* NESTED MODAL PARTNER -> INVESTMENT */}

                              {/* INSURANCE MODEL PARTNER TRIGGER BUTTON */}
                              <button
                                type="button"
                                onClick={handleShowPartner2}
                                className="btn bgColor modalBtn mx-2"
                              >
                                Insurance
                              </button>
                              {/* NESTED MODAL PARTNER -> INSURANCE at line 6347 */}

                              {/* BENEFICIARIES MODEL PARTNER TRIGGER BUTTON */}

                              {/* NESTED MODAL PARTNER -> BENEFICIARIES  */}
                              <button
                                type="button"
                                onClick={handleShowPartner3}
                                className="btn bgColor modalBtn"
                              >
                                Beneficiaries
                              </button>
                              {/* NESTED BENFICIARIES MODAL on line 6542 */}

                              <button
                                type="button"
                                onClick={handleShowPartner4}
                                className="btn bgColor modalBtn mx-2"
                              >
                                Contributions
                              </button>
                              {/* NESTED PARTNER -> CONTRIBUTION MODAL */}
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
                                  onClick={Super2handleClose}
                                >
                                  Cancel
                                </button>
                              </div>
                            </Modal.Footer>
                          </Form>
                        )}
                      </Formik>
                    </Modal>
                    {/* Partner Inner Modal */}

                    {/* NESTED MODAL PARTNER -> INSURANCE */}
                    {/* NESTED INSURANCE MODAL */}
                    <Modal
                      show={showPartner2}
                      onHide={handleClosePartner2}
                      backdrop="static"
                      className="modal-lg"
                      keyboard={false}
                    >
                      <Modal.Header className="text-light modalBG " closeButton>
                        <Modal.Title className="fontStyle">
                          Insurance Details
                        </Modal.Title>
                      </Modal.Header>
                      <Formik
                        initialValues={
                          InsuranceDataPartnerListUpdateFlag
                            ? InsuranceDataPartnerListObj[0]
                            : initialValuesInsurancePartnerOptionDetails
                        }
                        validationSchema={
                          validateYupSchemaInsurancePartnerOptionDetails
                        }
                        onSubmit={
                          On_submit_validateYupSchemaInsurancePartnerOptionDetails
                        }
                        enableReinitialize
                      >
                        {({ values, handleChange, setFieldValue, formik }) => (
                          <Form>
                            <Modal.Body>
                              <div className="row ">
                                <div className="col-6 mb-3">
                                  {/* Toggle 1*/}
                                  <label className="form-label">
                                    Do you have any insurance attached?
                                  </label>
                                  </div>
                                  <div className="col-6 mb-3">

                                  
                                  {/* switch button style */}
                                  <div className="form-check form-switch m-0 p-0 ">
                                    <div className="radiobutton">
                                      <input
                                        type="radio"
                                        name="insurancePartnerAttachedOption"
                                        id="insurancePartnerAttachedOption"
                                        value="Yes"
                                        //  onClick={() => investmentRadioHandler("Yes")}
                                        onChange={handleChange}
                                        checked={
                                          values.insurancePartnerAttachedOption ===
                                          "Yes"
                                        }
                                      />
                                      <label
                                        htmlFor="insurancePartnerAttachedOption"
                                        className="label1"
                                      >
                                        <span>YES</span>
                                      </label>
                                      <input
                                        type="radio"
                                        name="insurancePartnerAttachedOption"
                                        id="insurancePartnerAttachedOption1"
                                        value="No"
                                        //onClick={() => investmentRadioHandler("No")}
                                        onChange={handleChange}
                                        checked={
                                          values.insurancePartnerAttachedOption ===
                                          "No"
                                        }
                                      />
                                      <label
                                        htmlFor="insurancePartnerAttachedOption1"
                                        className="label2"
                                      >
                                        <span>NO</span>
                                      </label>
                                    </div>
                                  </div>
                                  </div>
                                  </div>
                                {/* Toggle # 1*/}

                                {values.insurancePartnerAttachedOption ===
                                  "Yes" &&
                                  values.insurancePartnerAttachedOption ==
                                    "Yes" && (
                                      <div className="row">

                                    <div className="col-6 mb-3">
                                      {/* Toggle 2*/}
                                      <label className="form-label">
                                        Do you have any Life/TPD insurance?
                                      </label>
                                      </div>
                                      <div className="col-6 mb-3">
                                        
                                      {/* switch button style */}
                                      <div className="form-check form-switch m-0 p-0 ">
                                        <div className="radiobutton">
                                          <input
                                            type="radio"
                                            name="insuranceLifeTPDPartnerAttached"
                                            id="insuranceLifeTPDPartnerAttached"
                                            value="Yes"
                                            //  onClick={() => investmentRadioHandler("Yes")}
                                            onChange={handleChange}
                                            checked={
                                              values.insuranceLifeTPDPartnerAttached ===
                                              "Yes"
                                            }
                                          />
                                          <label
                                            htmlFor="insuranceLifeTPDPartnerAttached"
                                            className="label1"
                                          >
                                            <span>YES</span>
                                          </label>
                                          <input
                                            type="radio"
                                            name="insuranceLifeTPDPartnerAttached"
                                            id="insuranceLifeTPDPartnerAttached1"
                                            value="No"
                                            //onClick={() => investmentRadioHandler("No")}
                                            onChange={handleChange}
                                            checked={
                                              values.insuranceLifeTPDPartnerAttached ===
                                              "No"
                                            }
                                          />
                                          <label
                                            htmlFor="insuranceLifeTPDPartnerAttached1"
                                            className="label2"
                                            >
                                            <span>NO</span>
                                          </label>
                                        </div>
                                      </div>
                                            </div>
                                      {/* Toggle # 2*/}
                                    </div>
                                  )}
                             

                              {values.insuranceLifeTPDPartnerAttached ===
                                "Yes" &&
                                values.insurancePartnerAttachedOption ==
                                "Yes" && (
                                  <div>
                                    {/* Row # 1 */}
                                    <div className="row">
                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="CoverType"
                                            className="form-label"
                                          >
                                            Cover Type
                                          </label>
                                    </div>
                                      <div className="col-6 mb-3">
                                          <Field
                                            as="select"
                                            id="CoverTypePartner"
                                            name="CoverTypePartner"
                                            className="form-select shadow  inputDesign"
                                            //onChange={(e) => setFieldValue("CoverTypePartner", e.target.value)}
                                            value={values.CoverTypePartner}
                                          >
                                            <option value="Select">
                                              Select
                                            </option>
                                            <option value="Fixed Level">
                                              Fixed Level
                                            </option>
                                            <option value="Unitised">
                                              Unitised
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="CoverTypePartner"
                                          />
                                      </div>
                                      <div className="col-6 mb-3">
                                          <label
                                            htmlFor="LifeCoverPartner"
                                            className="form-label"
                                          >
                                            Life Cover
                                          </label>
                                          </div>
                                          <div className="col-6 mb-3">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="LifeCoverPartner"
                                            name="LifeCoverPartner"
                                            placeholder="Life Cover"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="LifeCoverPartner"
                                          />
                                      </div>
                                      <div className="col-6 mb-3">
                                          <label
                                            htmlFor="TPDCoverPartner"
                                            className="form-label"
                                          >
                                            TPD Cover
                                          </label>
                                            </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="TPDCoverPartner"
                                            name="TPDCoverPartner"
                                            placeholder="TPD Cover"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="TPDCoverPartner"
                                          />
                                      </div>
                                    </div>
                                    {/* Row # 1 */}
                                    {/* Row # 2 */}
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                          <label
                                            htmlFor="CostPAPartner"
                                            className="form-label"
                                          >
                                            Cost p.a.
                                          </label>
                                            </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="CostPAPartner"
                                            name="CostPAPartner"
                                            placeholder="Cost p.a."
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="CostPAPartner"
                                          />
                                      </div>

                                      <div className="col-6 mb-3">
                                          <label
                                            htmlFor="PremiumType"
                                            className="form-label"
                                          >
                                            Premium Type
                                          </label>
                                        </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            as="select"
                                            id="PremiumTypePartner"
                                            name="PremiumTypePartner"
                                            placeholder="Premium Type"
                                            className="form-select shadow  inputDesign"
                                            //onChange={(e) => setFieldValue("PremiumTypePartner", e.target.value)}
                                            value={values.PremiumTypePartner}
                                          >
                                            <option value="Level">Level</option>
                                            <option value="Stepped">
                                              Stepped
                                            </option>
                                            <option value="Other">Other</option>
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="PremiumTypePartner"
                                          />
                                      </div>

                                      <div className="col-6 mb-3">
                                        <label className="form-label">
                                          Any Loading Or Exclusions?
                                        </label>
                                        {/* switch button style */}
                                        </div>
                                        <div className="col-6 mb-3">
                                          
                                        <div className="form-check form-switch m-0 p-0 ">
                                          <div className="radiobutton">
                                            <input
                                              type="radio"
                                              name="anyLoadingOrExclusionsPartnerAttached"
                                              id="anyLoadingOrExclusionsPartnerAttached"
                                              value="Yes"
                                              //  onClick={() => investmentRadioHandler("Yes")}
                                              onChange={handleChange}
                                              checked={
                                                values.anyLoadingOrExclusionsPartnerAttached ===
                                                "Yes"
                                              }
                                            />
                                            <label
                                              htmlFor="anyLoadingOrExclusionsPartnerAttached"
                                              className="label1"
                                            >
                                              <span>YES</span>
                                            </label>
                                            <input
                                              type="radio"
                                              name="anyLoadingOrExclusionsPartnerAttached"
                                              id="anyLoadingOrExclusionsPartnerAttached1"
                                              value="No"
                                              //onClick={() => investmentRadioHandler("No")}
                                              onChange={handleChange}
                                              checked={
                                                values.anyLoadingOrExclusionsPartnerAttached ===
                                                "No"
                                              }
                                            />
                                            <label
                                              htmlFor="anyLoadingOrExclusionsPartnerAttached1"
                                              className="label2"
                                            >
                                              <span>NO</span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              {/* Row # 2 */}

                              {/* Row # 3 */}
                                {values.anyLoadingOrExclusionsPartnerAttached ===
                                  "Yes" && (
                              <div className="row">

                                    <div className="col-6 mb-3">
                                      <label
                                        htmlFor="PleaseprovidePartnerdetails"
                                        className="form-label"
                                        >
                                        Please provide details
                                      </label>
                                        </div>
                                  <div className="col-6 mb-3">
                                      <Field
                                        className="form-control shadow inputDesign"
                                        id="PleaseprovidePartnerdetails"
                                        name="PleaseprovidePartnerdetails"
                                        placeholder="Please provide details"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="PleaseprovidePartnerdetails"
                                      />
                                    </div>
                                  </div>
                                )}

                                {values.insurancePartnerAttachedOption ===
                                  "Yes" && (
                                    <div className="row">

                                  <div className="col-6 mb-3">
                                    <label className="form-label">
                                      Have any Income Protection?
                                    </label>
                                        </div>
                                    {/* switch button style */}
                                    <div className="col-6 mb-3">

                                    <div className="form-check form-switch m-0 p-0 ">
                                      <div className="radiobutton">
                                        <input
                                          type="radio"
                                          name="incomeProtectionPartnerAttached"
                                          id="incomeProtectionPartnerAttached"
                                          value="Yes"
                                          //  onClick={() => investmentRadioHandler("Yes")}
                                          onChange={handleChange}
                                          checked={
                                            values.incomeProtectionPartnerAttached ===
                                            "Yes"
                                          }
                                        />
                                        <label
                                          htmlFor="incomeProtectionPartnerAttached"
                                          className="label1"
                                        >
                                          <span>YES</span>
                                        </label>
                                        <input
                                          type="radio"
                                          name="incomeProtectionPartnerAttached"
                                          id="incomeProtectionPartnerAttached1"
                                          value="No"
                                          //onClick={() => investmentRadioHandler("No")}
                                          onChange={handleChange}
                                          checked={
                                            values.incomeProtectionPartnerAttached ===
                                            "No"
                                          }
                                        />
                                        <label
                                          htmlFor="incomeProtectionPartnerAttached1"
                                          className="label2"
                                        >
                                          <span>NO</span>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                          </div>
                                )}
                        

                              {values.incomeProtectionPartnerAttached ==
                                "Yes" &&
                                values.insurancePartnerAttachedOption ==
                                  "Yes" && (
                                  <div>
                                  <div className="row">

                                    <div className="col-6 mb-3">
                                        <label
                                          htmlFor="MonthlyBenefitPartner"
                                          className="form-label"
                                        >
                                          Monthly Benefit
                                        </label>
                                        </div>
                                      <div className="col-6 mb-3">
                                        <Field
                                          type="number"
                                          className="form-control shadow inputDesign"
                                          id="MonthlyBenefitPartner"
                                          name="MonthlyBenefitPartner"
                                          placeholder="Monthly Benefit"
                                        />
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="MonthlyBenefitPartner"
                                          />
                                    </div>
                                  </div>

                                    {/* Row # 3 */}

                                    {/* Row # 4 */}
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                          <label
                                            htmlFor="waitingPeriodPartner"
                                            className="form-label"
                                          >
                                            Waiting Period
                                          </label>
                                          </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            as="select"
                                            id="waitingPeriodPartner"
                                            name="waitingPeriodPartner"
                                            placeholder="Waiting Period"
                                            className="form-select shadow  inputDesign"
                                            //onChange={(e) => setFieldValue("waitingPeriodPartner", e.target.value)}
                                            //value={values.waitingPeriodPartner}
                                          >
                                            <option value="Select">
                                              Select
                                            </option>
                                            <option value="30 Days">
                                              30 Days
                                            </option>
                                            <option value="60 Days">
                                              60 Days
                                            </option>
                                            <option value="90 Days">
                                              90 Days
                                            </option>
                                            <option value="180 Days">
                                              180 Days
                                            </option>
                                            <option value="1 Year">
                                              1 Year
                                            </option>
                                            <option value="2 Year">
                                              2 Year
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="waitingPeriodPartner"
                                          />
                                      </div>
                                      </div>
                                        <div className="row">

                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="benefitPeriodPartner"
                                            className="form-label"
                                          >
                                            Benefit Period
                                          </label>
                                          </div>
                                      <div className="col-6 mb-3">
                                          <Field
                                            as="select"
                                            id="benefitPeriodPartner"
                                            name="benefitPeriodPartner"
                                            placeholder="Benefit Period"
                                            className="form-select shadow  inputDesign"
                                            //onChange={(e) => setFieldValue("benefitPeriodPartner", e.target.value)}
                                            //value={values.benefitPeriodPartner}
                                          >
                                            <option value="Select">
                                              Select
                                            </option>
                                            <option value="1 Year">
                                              1 Year
                                            </option>
                                            <option value="2 Years">
                                              2 Years
                                            </option>
                                            <option value="5 Years">
                                              5 Years
                                            </option>
                                            <option value="Age Until 60">
                                              Age Until 60
                                            </option>
                                            <option value="Age Until 65">
                                              Age Until 65
                                            </option>
                                            <option value="Age Until 67">
                                              Age Until 67
                                            </option>
                                            <option value="Age Until 70">
                                              Age Until 70
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="benefitPeriodPartner"
                                          />
                                        </div>
                                      </div>
                                      <div className="row">
                                        
                                      <div className="col-6 mb-3">
                                          <label
                                            htmlFor="agreedOrIndemnityPartner"
                                            className="form-label"
                                          >
                                            Agreed or indemnity?
                                          </label>
                                      </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            as="select"
                                            id="agreedOrIndemnityPartner"
                                            name="agreedOrIndemnityPartner"
                                            placeholder="Agreed or indemnity?"
                                            className="form-select shadow  inputDesign"
                                            //onChange={(e) => setFieldValue("agreedOrIndemnityPartner", e.target.value)}
                                            //value={values.agreedOrIndemnityPartner}
                                          >
                                            <option value="Select">
                                              Select
                                            </option>
                                            <option value="Agreed">
                                              Agreed
                                            </option>
                                            <option value="Indemnity">
                                              Indemnitys
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="agreedOrIndemnityPartner"
                                          />
                                        </div>
                                      </div>
                                  
                                    {/* Row # 4 */}
                                    {/* Row # 5 */}
                                    <div className="row">

                                      <div className="col-6 mb-3">
                                          <label
                                            htmlFor="CostPASecondPartner"
                                            className="form-label"
                                            >
                                            Cost p.a.
                                          </label>
                                            </div>
                                        <div className="col-6 mb-3">
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="CostPASecondPartner"
                                            name="CostPASecondPartner"
                                            placeholder="Cost p.a."
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="CostPASecondPartner"
                                          />
                                        </div>
                                      </div>
                                    <div className="row">

                                        <div className="col-6 mb-3">
                                          <label
                                            htmlFor="PremiumTypeSecondPartner"
                                            className="form-label"
                                          >
                                            Premium Type
                                          </label>
                                          </div>
                                      <div className="col-6 mb-3">
                                          <Field
                                            as="select"
                                            id="PremiumTypeSecondPartner"
                                            name="PremiumTypeSecondPartner"
                                            placeholder="Premium Type"
                                            className="form-select shadow  inputDesign"
                                            //onChange={(e) => setFieldValue("PremiumTypeSecondPartner", e.target.value)}
                                            //value={values.PremiumTypeSecondPartner}
                                          >
                                            <option value="Level">Level</option>
                                            <option value="Stepped">
                                              Stepped
                                            </option>
                                            <option value="Other">Other</option>
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="PremiumTypeSecondPartner"
                                          />
                                        </div>
                                      </div>
                                    <div className="row">

                       
                                      <div className="col-6 mb-3">
                                        <label className="form-label">
                                          Includes Super Continuance?
                                        </label>
                                        {/* switch button style */}
                                        </div>
                                        <div className="col-6 mb-3">
                                          
                                        <div className="form-check form-switch m-0 p-0 ">
                                          <div className="radiobutton">
                                            <input
                                              type="radio"
                                              name="IncludesSuperContinuancePartner"
                                              id="IncludesSuperContinuancePartner"
                                              value="Yes"
                                              //  onClick={() => investmentRadioHandler("Yes")}
                                              onChange={handleChange}
                                              checked={
                                                values.IncludesSuperContinuancePartner ===
                                                "Yes"
                                              }
                                            />
                                            <label
                                              htmlFor="IncludesSuperContinuancePartner"
                                              className="label1"
                                            >
                                              <span>YES</span>
                                            </label>
                                            <input
                                              type="radio"
                                              name="IncludesSuperContinuancePartner"
                                              id="IncludesSuperContinuancePartner1"
                                              value="No"
                                              //onClick={() => investmentRadioHandler("No")}
                                              onChange={handleChange}
                                              checked={
                                                values.IncludesSuperContinuancePartner ===
                                                "No"
                                              }
                                            />
                                            <label
                                              htmlFor="IncludesSuperContinuancePartner1"
                                              className="label2"
                                            >
                                              <span>NO</span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                      </div>
                                    {/* Row # 5 */}

                                    {/* Row # 6 */}
                                    <div className="row">
                                      <div className="col-6 mb-3">
                                        <label className="form-label">
                                          Is the benefit indexed?
                                        </label>
                                        </div>
                                        <div className="col-6 mb-3">
                                          
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 ">
                                          <div className="radiobutton">
                                            <input
                                              type="radio"
                                              name="IsthebenefitindexedPartner"
                                              id="IsthebenefitindexedPartner"
                                              value="Yes"
                                              //  onClick={() => investmentRadioHandler("Yes")}
                                              onChange={handleChange}
                                              checked={
                                                values.IsthebenefitindexedPartner ===
                                                "Yes"
                                              }
                                            />
                                            <label
                                              htmlFor="IsthebenefitindexedPartner"
                                              className="label1"
                                            >
                                              <span>YES</span>
                                            </label>
                                            <input
                                              type="radio"
                                              name="IsthebenefitindexedPartner"
                                              id="IsthebenefitindexedPartner1"
                                              value="No"
                                              //onClick={() => investmentRadioHandler("No")}
                                              onChange={handleChange}
                                              checked={
                                                values.IsthebenefitindexedPartner ===
                                                "No"
                                              }
                                            />
                                            <label
                                              htmlFor="IsthebenefitindexedPartner1"
                                              className="label2"
                                            >
                                              <span>NO</span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-6 mb-3">
                                        <label className="form-label">
                                          Any Loading Or Exclusions?
                                        </label>
                                        {/* switch button style */}
                                        </div>
                                        <div className="col-6 mb-3">
                                          
                                        <div className="form-check form-switch m-0 p-0 ">
                                          <div className="radiobutton">
                                            <input
                                              type="radio"
                                              name="AnyLoadingOrExclusionsPartner"
                                              id="AnyLoadingOrExclusionsPartner"
                                              value="Yes"
                                              //  onClick={() => investmentRadioHandler("Yes")}
                                              onChange={handleChange}
                                              checked={
                                                values.AnyLoadingOrExclusionsPartner ===
                                                "Yes"
                                              }
                                            />
                                            <label
                                              htmlFor="AnyLoadingOrExclusionsPartner"
                                              className="label1"
                                            >
                                              <span>YES</span>
                                            </label>
                                            <input
                                              type="radio"
                                              name="AnyLoadingOrExclusionsPartner"
                                              id="AnyLoadingOrExclusionsPartner1"
                                              value="No"
                                              //onClick={() => investmentRadioHandler("No")}
                                              onChange={handleChange}
                                              checked={
                                                values.AnyLoadingOrExclusionsPartner ===
                                                "No"
                                              }
                                            />
                                            <label
                                              htmlFor="AnyLoadingOrExclusionsPartner1"
                                              className="label2"
                                            >
                                              <span>NO</span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>

                                      {values.AnyLoadingOrExclusionsPartner ===
                                        "Yes" &&
                                        values.incomeProtectionPartnerAttached ==
                                          "Yes" && (
                                            <>
                                          <div className="col-6 mb-3">
                                              <label
                                                htmlFor="PleaseprovidedetailsSecondPartner"
                                                className="form-label"
                                                >
                                                Please provide details
                                              </label>
                                                </div>
                                            <div className="col-6 mb-3">
                                              <Field
                                                className="form-control shadow inputDesign"
                                                id="PleaseprovidedetailsSecondPartner"
                                                name="PleaseprovidedetailsSecondPartner"
                                                placeholder="Please provide details"
                                              />
                                              <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="PleaseprovidedetailsSecondPartner"
                                              />
                                            </div>
                                            </>
                                        )}
                                    </div>
                                    {/* Row # 6 */}
                                  </div>
                                )}
                            </Modal.Body>
                            <Modal.Footer>
                              <div className="col-md-12">
                                <button
                                  className="float-end btn w-25  bgColor modalBtn"
                                  //onClick={handleClose2}
                                  type="submit"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  className="float-end btn w-25  btn-outline  backBtn mx-3"
                                  onClick={handleClosePartner2}
                                >
                                  Cancel
                                </button>
                              </div>
                            </Modal.Footer>
                          </Form>
                        )}
                      </Formik>
                    </Modal>
                    {/* NESTED INSURANCE MODAL */}
                    {/* NESTED MODAL PARTNER -> INSURANCE */}

                    {/* NESTED BENFICIARIES MODAL */}
                    <Modal
                      show={showPartner3}
                      onHide={handleClosePartner3}
                      backdrop="static"
                      className="modal-lg"
                      keyboard={false}
                    >
                      <Modal.Header className="text-light modalBG " closeButton>
                        <Modal.Title className="fontStyle">
                          Beneficiaries Details
                        </Modal.Title>
                      </Modal.Header>
                      <Formik
                        initialValues={
                          BeneficiaryDataPartnerListUpdateFlag
                            ? BeneficiaryDataPartnerListObj[0]
                            : initialValuesBeneficiariesPartnerOptionDetails
                        }
                        validationSchema={
                          validateYupSchemaBeneficiariesOptionPartnerDetails
                        }
                        onSubmit={
                          On_submit_validateYupSchemaPartnerBeneficiariesOptionDetails
                        }
                        enableReinitialize
                      >
                        {({ values, handleChange, setFieldValue, formik }) => (
                          <Form>
                            <Modal.Body>
                              <div className="row">
                                <div className="col-6 mb-3">

                              <label className="form-label">
                                Do you have any Nominated Beneficiaries on the
                                Account?
                              </label>
                              </div>
                              {/* switch button style */}
                              <div className="col-6 mb-3">

                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="partnerNestedBeneficiariesAttached"
                                    id="partnerNestedBeneficiariesAttached1"
                                    value="Yes"
                                    //  onClick={() => beneficiariesRadioHandler("Yes")}
                                    onChange={handleChange}
                                    checked={
                                      values.partnerNestedBeneficiariesAttached ===
                                      "Yes"
                                    }
                                  />
                                  <label
                                    htmlFor="partnerNestedBeneficiariesAttached1"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="partnerNestedBeneficiariesAttached"
                                    id="partnerNestedBeneficiariesAttached2"
                                    value="No"
                                    //onClick={() => beneficiariesRadioHandler("No")}
                                    onChange={handleChange}
                                    checked={
                                      values.partnerNestedBeneficiariesAttached ===
                                      "No"
                                    }
                                  />
                                  <label
                                    htmlFor="partnerNestedBeneficiariesAttached2"
                                    className="label2"
                                    >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                                      </div>
                                    </div>

                              {values.partnerNestedBeneficiariesAttached ==
                                "Yes" && (
                                <div className="">
                                  <div className="row">
                                    <div className="col-6 mb-3">
                                        <label
                                          htmlFor="beneficiariesPartnerAttached1"
                                          className="form-label"
                                        >
                                          Nomination Type
                                        </label>
                                          </div>
                                        <div className="col-6 mb-3">
                                        <Field
                                          as="select"
                                          id="beneficiariesPartnerAttached1"
                                          name="beneficiariesPartnerAttached1"
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
                                                  name: "NomiationTypePartnerBeneficiary",
                                                  value: "",
                                                },
                                              });
                                            }
                                          }}
                                          value={
                                            values.beneficiariesPartnerAttached1
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
                                            Legal Representative(Your Estate)
                                          </option>
                                          <option value="Reversionary Beneficiary">
                                            Reversionary Beneficiary
                                          </option>
                                        </Field>
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="beneficiariesPartnerAttached1"
                                        />
                                    </div>
                                          </div>
                                          {values.beneficiariesPartnerAttached1 ==
                                          "Legal Representative(Your Estate)" || (
                                           <>
                                                    <div className="row">
                                            
                                            <div className="col-6 mb-3">
                                                <label
                                                  htmlFor="NomiationTypePartnerBeneficiary"
                                                  className="form-label"
                                                >
                                                  How many beneficiaries do you have?
                                                </label>
                                                </div>
                                                <div className="col-6 mb-3">
                                                <Field
                                                  as="select"
                                                  id="NomiationTypePartnerBeneficiary"
                                                  name="NomiationTypePartnerBeneficiary"
                                                  className="form-select shadow  inputDesign"
                                                  //onChange={(e) => setFieldValue("NomiationTypePartnerBeneficiary", e.target.value)}
                                                  value={
                                                    values.NomiationTypePartnerBeneficiary
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
                                                  name="NomiationTypePartnerBeneficiary"
                                                />
                                              
                                            </div>
                                          </div>
                                           </>
                                          )}
                                 

                                  {/* Row 1*/}
                                  {values.NomiationTypePartnerBeneficiary >=
                                  1 ? (
                                    <div className="row justify-content-around mt-4 mb-3">
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="BeneficiaryPartner1"
                                            className="form-label"
                                          >
                                            Beneficiary 1
                                          </label>
                                          <Field
                                            className="form-control shadow inputDesign"
                                            id="BeneficiaryPartner1"
                                            name="BeneficiaryPartner1"
                                            placeholder="Beneficiary 1"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="BeneficiaryPartner1"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="ShareofBenefitPartner1"
                                            className="form-label"
                                          >
                                            Share of Benefits %{" "}
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="ShareofBenefitPartner1"
                                            name="ShareofBenefitPartner1"
                                            placeholder="Share of Benefits 1"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="ShareofBenefitPartner1"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="RelationshipOptionDetailsRelationshipPartner1"
                                            className="form-label"
                                          >
                                            Relationship
                                          </label>
                                          <Field
                                            as="select"
                                            id="RelationshipOptionDetailsRelationshipPartner1"
                                            name="RelationshipOptionDetailsRelationshipPartner1"
                                            className="form-select shadow  inputDesign"
                                            //onChange={(e) => setFieldValue("RelationshipOptionDetailsRelationshipPartner1", e.target.value)}
                                            value={
                                              values.RelationshipOptionDetailsRelationshipPartner1
                                            }
                                          >
                                            <option value="">Select</option>
                                            <option value="Spouse">
                                              Spouse
                                            </option>
                                            <option value="Child">Child</option>
                                            <option value="Other">Other</option>
                                            <option value="Interdependency">
                                              Interdependency
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="RelationshipOptionDetailsRelationshipPartner1"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="d-none"></div>
                                  )}

                                  {/* Row 2*/}
                                  {values.NomiationTypePartnerBeneficiary >=
                                  2 ? (
                                    <div className="row justify-content-around mt-4 mb-3">
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="BeneficiaryPartner2"
                                            className="form-label"
                                          >
                                            Beneficiary 2
                                          </label>
                                          <Field
                                            className="form-control shadow inputDesign"
                                            id="BeneficiaryPartner2"
                                            name="BeneficiaryPartner2"
                                            placeholder="Beneficiary 2"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="BeneficiaryPartner2"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="ShareofBenefitPartner2"
                                            className="form-label"
                                          >
                                            Share of Benefits %{" "}
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="ShareofBenefitPartner2"
                                            name="ShareofBenefitPartner2"
                                            placeholder="Share of Benefits 2"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="ShareofBenefitPartner2"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="RelationshipOptionDetailsRelationshipPartner2"
                                            className="form-label"
                                          >
                                            Relationship
                                          </label>
                                          <Field
                                            as="select"
                                            id="RelationshipOptionDetailsRelationshipPartner2"
                                            name="RelationshipOptionDetailsRelationshipPartner2"
                                            className="form-select shadow  inputDesign"
                                            //onChange={(e) => setFieldValue("RelationshipOptionDetailsRelationshipPartner2", e.target.value)}
                                            value={
                                              values.RelationshipOptionDetailsRelationshipPartner2
                                            }
                                          >
                                            <option value="">Select</option>
                                            <option value="Spouse">
                                              Spouse
                                            </option>
                                            <option value="Child">Child</option>
                                            <option value="Other">Other</option>
                                            <option value="Interdependency">
                                              Interdependency
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="RelationshipOptionDetailsRelationshipPartner2"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="d-none"></div>
                                  )}
                                  {/* Row 2*/}

                                  {/* Row 3*/}
                                  {values.NomiationTypePartnerBeneficiary >=
                                  3 ? (
                                    <div className="row justify-content-around mt-4 mb-3">
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="BeneficiaryPartner3"
                                            className="form-label"
                                          >
                                            Beneficiary 3
                                          </label>
                                          <Field
                                            className="form-control shadow inputDesign"
                                            id="BeneficiaryPartner3"
                                            name="BeneficiaryPartner3"
                                            placeholder="Beneficiary 3"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="BeneficiaryPartner3"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="ShareofBenefitPartner3"
                                            className="form-label"
                                          >
                                            Share of Benefits %{" "}
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="ShareofBenefitPartner3"
                                            name="ShareofBenefitPartner3"
                                            placeholder="Share of Benefits 3"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="ShareofBenefitPartner3"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="RelationshipOptionDetailsRelationshipPartner3"
                                            className="form-label"
                                          >
                                            Relationship
                                          </label>
                                          <Field
                                            as="select"
                                            id="RelationshipOptionDetailsRelationshipPartner3"
                                            name="RelationshipOptionDetailsRelationshipPartner3"
                                            className="form-select shadow  inputDesign"
                                            //onChange={(e) => setFieldValue("RelationshipOptionDetailsRelationshipPartner3", e.target.value)}
                                            value={
                                              values.RelationshipOptionDetailsRelationshipPartner3
                                            }
                                          >
                                            <option value="">Select</option>
                                            <option value="Spouse">
                                              Spouse
                                            </option>
                                            <option value="Child">Child</option>
                                            <option value="Other">Other</option>
                                            <option value="Interdependency">
                                              Interdependency
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="RelationshipOptionDetailsRelationshipPartner3"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="d-none"></div>
                                  )}
                                  {/* Row 3*/}

                                  {/* Row 4*/}
                                  {values.NomiationTypePartnerBeneficiary >=
                                  4 ? (
                                    <div className="row justify-content-around mt-4 mb-3">
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="BeneficiaryPartner4"
                                            className="form-label"
                                          >
                                            Beneficiary 4
                                          </label>
                                          <Field
                                            className="form-control shadow inputDesign"
                                            id="BeneficiaryPartner4"
                                            name="BeneficiaryPartner4"
                                            placeholder="Beneficiary 4"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="BeneficiaryPartner4"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="ShareofBenefitPartner4"
                                            className="form-label"
                                          >
                                            Share of Benefits %{" "}
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="ShareofBenefitPartner4"
                                            name="ShareofBenefitPartner4"
                                            placeholder="Share of Benefits 4"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="ShareofBenefitPartner4"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="RelationshipOptionDetailsRelationshipPartner4"
                                            className="form-label"
                                          >
                                            Relationship
                                          </label>
                                          <Field
                                            as="select"
                                            id="RelationshipOptionDetailsRelationshipPartner4"
                                            name="RelationshipOptionDetailsRelationshipPartner4"
                                            className="form-select shadow  inputDesign"
                                            //onChange={(e) => setFieldValue("RelationshipOptionDetailsRelationshipPartner4", e.target.value)}
                                            value={
                                              values.RelationshipOptionDetailsRelationshipPartner4
                                            }
                                          >
                                            <option value="">Select</option>
                                            <option value="Spouse">
                                              Spouse
                                            </option>
                                            <option value="Child">Child</option>
                                            <option value="Other">Other</option>
                                            <option value="Interdependency">
                                              Interdependency
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="RelationshipOptionDetailsRelationshipPartner4"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="d-none"></div>
                                  )}
                                  {/* Row 4*/}

                                  {/* Row 5*/}
                                  {values.NomiationTypePartnerBeneficiary >=
                                  5 ? (
                                    <div className="row justify-content-around mt-4 mb-3">
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="BeneficiaryPartner5"
                                            className="form-label"
                                          >
                                            Beneficiary 5
                                          </label>
                                          <Field
                                            className="form-control shadow inputDesign"
                                            id="BeneficiaryPartner5"
                                            name="BeneficiaryPartner5"
                                            placeholder="Beneficiary 5"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="BeneficiaryPartner5"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="ShareofBenefitPartner5"
                                            className="form-label"
                                          >
                                            Share of Benefits %{" "}
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="ShareofBenefitPartner5"
                                            name="ShareofBenefitPartner5"
                                            placeholder="Share of Benefits 5"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="ShareofBenefitPartner5"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="RelationshipOptionDetailsRelationshipPartner5"
                                            className="form-label"
                                          >
                                            Relationship
                                          </label>
                                          <Field
                                            as="select"
                                            id="RelationshipOptionDetailsRelationshipPartner5"
                                            name="RelationshipOptionDetailsRelationshipPartner5"
                                            className="form-select shadow  inputDesign"
                                            //onChange={(e) => setFieldValue("RelationshipOptionDetailsRelationshipPartner5", e.target.value)}
                                            value={
                                              values.RelationshipOptionDetailsRelationshipPartner5
                                            }
                                          >
                                            <option value="">Select</option>
                                            <option value="Spouse">
                                              Spouse
                                            </option>
                                            <option value="Child">Child</option>
                                            <option value="Other">Other</option>
                                            <option value="Interdependency">
                                              Interdependency
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="RelationshipOptionDetailsRelationshipPartner5"
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
                            </Modal.Body>
                            <Modal.Footer>
                              <div className="col-md-12">
                                <button
                                  className="float-end btn w-25  bgColor modalBtn"
                                  // onClick={handleClosePartner3}
                                  type="submit"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  className="float-end btn w-25  btn-outline  backBtn mx-3"
                                  onClick={handleClosePartner3}
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
                    {/* NESTED MODAL PARTNER -> BENEFICIARIES  */}

                    {/* NESTED PARTNER -> CONTRIBUTION MODAL */}

                    <Modal
                      show={showPartner4}
                      onHide={handleClosePartner4}
                      backdrop="static"
                      className="modal-lg"
                      keyboard={false}
                    >
                      <Modal.Header className="text-light modalBG " closeButton>
                        <Modal.Title className="fontStyle">
                          Contribution Details
                        </Modal.Title>
                      </Modal.Header>
                      <Formik
                        initialValues={
                          contributionPartnerModalUpdateFlag
                            ? contributionPartnerModalObj[0]
                            : initialValuesContributionPartnerOptionDetails
                        }
                        validationSchema={
                          validateYupSchemaContributionPartnerOptionDetails
                        }
                        onSubmit={
                          On_submit_validateYupSchemaContributionPartnerOptionDetails
                        }
                        enableReinitialize
                      >
                        {({ values, handleChange, setFieldValue, formik }) => (
                          <Form>
                            <Modal.Body>
                              <label className="form-label">
                                Do you contribute to this fund?
                              </label>
                              {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="partnerInvestmentAttached"
                                    id="partnerInvestmentAttached"
                                    value="Yes"
                                    //  onClick={() => investmentRadioHandler("Yes")}
                                    onChange={handleChange}
                                    checked={
                                      values.partnerInvestmentAttached === "Yes"
                                    }
                                  />
                                  <label
                                    htmlFor="partnerInvestmentAttached"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="partnerInvestmentAttached"
                                    id="partnerInvestmentAttached2"
                                    value="No"
                                    //onClick={() => investmentRadioHandler("No")}
                                    onChange={handleChange}
                                    checked={
                                      values.partnerInvestmentAttached === "No"
                                    }
                                  />
                                  <label
                                    htmlFor="partnerInvestmentAttached2"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                              {values.partnerInvestmentAttached == "Yes" && (
                                <div className="">
                                  {/* Row 1*/}
                                  <div>
                                    <h3 className="mt-5">FY 2023</h3>

                                    <div className="row justify-content-around mt-3 mb-3">
                                      <div className="col-md-3">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="Non_ConcessionalPartner1"
                                            className="form-label"
                                          >
                                            Non Concessional
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="Non_ConcessionalPartner1"
                                            name="Non_ConcessionalPartner1"
                                            placeholder="Non Concessional"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="Non_ConcessionalPartner1"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="OtherPartner1"
                                            className="form-label"
                                          >
                                            Other
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="OtherPartner1"
                                            name="OtherPartner1"
                                            placeholder="Other"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="OtherPartner1"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-3">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="EmployerContributionsPartner1"
                                            className="form-label"
                                          >
                                            Contributions
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="EmployerContributionsPartner1"
                                            name="EmployerContributionsPartner1"
                                            placeholder="Employer Contributions"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="EmployerContributionsPartner1"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-3">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="SalarySacAndPersonalDedPartner1"
                                            className="form-label"
                                          >
                                            Salary Sac & Ded
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="SalarySacAndPersonalDedPartner1"
                                            name="SalarySacAndPersonalDedPartner1"
                                            placeholder="Salary Sac & Personal Ded"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="SalarySacAndPersonalDedPartner1"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Row # 2 */}
                                  <div>
                                    <h3 className="mt-2">FY 2022</h3>

                                    <div className="row justify-content-around mt-3 mb-3">
                                      <div className="col-md-3">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="Non_ConcessionalPartner2"
                                            className="form-label"
                                          >
                                            Non Concessional
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="Non_ConcessionalPartner2"
                                            name="Non_ConcessionalPartner2"
                                            placeholder="Non Concessional"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="Non_ConcessionalPartner2"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="OtherPartner2"
                                            className="form-label"
                                          >
                                            Other
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="OtherPartner2"
                                            name="OtherPartner2"
                                            placeholder="Other"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="OtherPartner2"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-3">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="EmployerContributionsPartner2"
                                            className="form-label"
                                          >
                                            Contributions
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="EmployerContributionsPartner2"
                                            name="EmployerContributionsPartner2"
                                            placeholder="Employer Contributions"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="EmployerContributionsPartner2"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-3">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="SalarySacAndPersonalDedPartner2"
                                            className="form-label"
                                          >
                                            Salary Sac & Ded
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="SalarySacAndPersonalDedPartner2"
                                            name="SalarySacAndPersonalDedPartner2"
                                            placeholder="Salary Sac & Personal Ded"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="SalarySacAndPersonalDedPartner2"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Row # 2 */}

                                  {/* Row # 3 */}
                                  <div>
                                    <h3 className="mt-2">FY 2021</h3>

                                    <div className="row justify-content-around mt-3 mb-3">
                                      <div className="col-md-3">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="Non_ConcessionalPartner3"
                                            className="form-label"
                                          >
                                            Non Concessional
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="Non_ConcessionalPartner3"
                                            name="Non_ConcessionalPartner3"
                                            placeholder="Non Concessional"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="Non_ConcessionalPartner3"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="OtherPartner3"
                                            className="form-label"
                                          >
                                            Other
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="OtherPartner3"
                                            name="OtherPartner3"
                                            placeholder="Other"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="OtherPartner3"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-3">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="EmployerContributionsPartner3"
                                            className="form-label"
                                          >
                                            Contributions
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="EmployerContributionsPartner3"
                                            name="EmployerContributionsPartner3"
                                            placeholder="Employer Contributions"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="EmployerContributionsPartner3"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-3">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="SalarySacAndPersonalDedPartner3"
                                            className="form-label"
                                          >
                                            Salary Sac & Ded
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="SalarySacAndPersonalDedPartner3"
                                            name="SalarySacAndPersonalDedPartner3"
                                            placeholder="Salary Sac & Personal Ded"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="SalarySacAndPersonalDedPartner3"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Row # 3 */}
                                </div>
                              )}
                            </Modal.Body>
                            <Modal.Footer>
                              <div className="col-md-12">
                                <button
                                  className="float-end btn w-25  bgColor modalBtn"
                                  // onClick={handleClose4}
                                  type="submit"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  className="float-end btn w-25  btn-outline  backBtn mx-3"
                                  onClick={handleClosePartner4}
                                >
                                  Cancel
                                </button>
                              </div>
                            </Modal.Footer>
                          </Form>
                        )}
                      </Formik>
                    </Modal>
                    {/* NESTED PARTNER -> CONTRIBUTION MODAL */}

                    {/* Partner Inner Modal */}
                    {/* ---------------------------------------------------- */}
                  </div>
                  {/*PARTNER SUPER ACCOUNT DISPLAY TABLE */}
                  <div
                    className="table-responsive my-3"
                    id="PartnerSuperAccountDisplayTable"
                  >
                    <table className="table table-bordered table-hover text-center">
                      <thead className="text-light" id="tableHead">
                        <tr>
                          <th>Fund Name</th>
                          <th>Member #</th>
                          <th>Current Value</th>
                          <th>Investment Options</th>
                          <th>Insurance Attached</th>
                          <th>Contributions</th>
                          <th>Nominated Beneficiaries</th>
                          <th>Operations</th>
                        </tr>
                      </thead>
                      <tbody>
                        {PartnerSuperAccounts.map((elem, index) => {
                          return (
                            <tr>
                              <td>{elem.Super_FundName}</td>
                              <td>{elem.Super_MemberNO}</td>
                              <td>{elem.Super_CurrentBalance}</td>
                              <td>Yes</td>
                              <td>Yes</td>
                              <td>No</td>
                              <td>Yes</td>
                              <td>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    PartnerSuperAccountsDeleteHandler(
                                      elem,
                                      index
                                    );
                                  }}
                                  className="btn btn-danger btn-sm"
                                >
                                  delete
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    PartnerSuperAccountsUpdateHandler(
                                      elem,
                                      index
                                    );
                                  }}
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
                  {/*PARTNER SUPER ACCOUNT DISPLAY TABLE */}

                  {/*PARTNER SUPER ACCOUNT Insurance  DISPLAY TABLE */}
                  <h3>Partner Insurance</h3>
                  <div className="table-responsive my-3">
                    <table className="table table-bordered table-hover text-center">
                      <thead className="text-light" id="tableHead">
                        <tr>
                          <th>Cover Type</th>
                          <th>Life Cover</th>
                          <th>TPD Cover</th>
                          <th>Cost p.a.</th>
                          <th>Premium Type</th>
                          <th>Any Loading Or Exclusions?</th>
                          <th>Waiting Period</th>
                          <th>Operations</th>
                        </tr>
                      </thead>
                      <tbody>
                        {InsuranceDataPartnerList.map((elem, index) => {
                          return (
                            <tr>
                              <th>{elem.CoverType}</th>
                              <th>{elem.LifeCover}</th>
                              <th>{elem.TPDCover}</th>
                              <th>{elem.CostPA}</th>
                              <th>{elem.PremiumType}</th>
                              <th>{elem.LoadingExecutions}</th>
                              <th>{elem.WaitingPeriod}</th>

                              <th>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    InsuranceDataPartnerListDeleteHandler(
                                      elem,
                                      index
                                    );
                                  }}
                                  className="btn btn-danger btn-sm"
                                >
                                  delete
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    InsuranceDataPartnerListUpdateHandler(
                                      elem,
                                      index
                                    );
                                  }}
                                  className="btn btn-warning btn-sm mx-2"
                                >
                                  update
                                </button>
                              </th>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {/*PARTNER SUPER ACCOUNT Insurance  DISPLAY TABLE */}

                  {/*PARTNER SUPER ACCOUNT BENFICIARIES  DISPLAY TABLE */}
                  <h3>Partner Benficiaries</h3>
                  <div className="table-responsive my-3">
                    <table className="table table-bordered table-hover text-center">
                      <thead className="text-light" id="tableHead">
                        <tr>
                          <th>No_ofBeneficiaries</th>
                          <th>NominatedBeneficiary</th>
                          <th>NominationType</th>
                          <th>Operations</th>
                        </tr>
                      </thead>
                      <tbody>
                        {BeneficiaryDataPartnerList.map((elem, index) => {
                          return (
                            <tr>
                              <th>{elem.No_ofBeneficiaries}</th>
                              <th>{elem.NominatedBeneficiary}</th>
                              <th>{elem.NominationType}</th>

                              <th>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    BeneficiaryDataPartnerListDeleteHandler(
                                      elem,
                                      index
                                    );
                                  }}
                                  className="btn btn-danger btn-sm"
                                >
                                  delete
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    BeneficiaryDataPartnerListUpdateHandler(
                                      elem,
                                      index
                                    );
                                  }}
                                  className="btn btn-warning btn-sm mx-2"
                                >
                                  update
                                </button>
                              </th>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {/*PARTNER SUPER ACCOUNT BENFICIARIES  DISPLAY TABLE */}

                  {/*PARTNER SUPER ACCOUNT CONTRIBUTION  DISPLAY TABLE */}
                  <h3>Partner Contributions</h3>
                  <div className="table-responsive my-3">
                    <table className="table table-bordered table-hover text-center">
                      <thead className="text-light" id="tableHead">
                        <tr>
                          <th>Non Concessional Fy2023</th>
                          <th>Salary Sac & Ded Fy2023</th>
                          <th>Non Concessional Fy2022</th>
                          <th>Salary Sac & Ded Fy2022</th>
                          <th>Non Concessional Fy2021</th>
                          <th>Salary Sac & Ded Fy2021</th>
                          <th>Operations</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contributionPartnerModal.map((elem, index) => {
                          return (
                            <tr>
                              <th>{elem.NonConcessional1}</th>
                              <th>{elem.SalaryPersonalDed1}</th>
                              <th>{elem.NonConcessional2}</th>
                              <th>{elem.SalaryPersonalDed2}</th>
                              <th>{elem.NonConcessional3}</th>
                              <th>{elem.SalaryPersonalDed3}</th>
                              <th>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    contributionPartnerModalDeleteHandler(
                                      elem,
                                      index
                                    );
                                  }}
                                  className="btn btn-danger btn-sm"
                                >
                                  delete
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    contributionPartnerModalUpdateHandler(
                                      elem,
                                      index
                                    );
                                  }}
                                  className="btn btn-warning btn-sm mx-2"
                                >
                                  update
                                </button>
                              </th>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {/*PARTNER SUPER ACCOUNT CONTRIBUTION  DISPLAY TABLE */}

                  {/* Super Details */}

                  {/* Pension Account Details */}
                  <div className="my-5">
                    {CRObject.AccountBasedPensionIssuesradio == "Yes" &&  <h3 className="">Client Pension Account</h3>
}
                   
                      {CRObject.AccountBasedPensionIssuesradio == "Yes" &&
                    <div className="row">
                      <div className="col-6 mb-3">
                          <label className="form-label">
                            Do you have any Pension Accounts?
                          </label>
                          
                              </div>
                        <div className="col-6 mb-3">
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
                      </div>}
                        
                      {Pension && (
                      <div className="row">

                        <div className="col-6 mb-3">
                          <label className="form-label">
                            Please enter the details of your Pension Accounts
                          </label>
                        
                        </div>
                        <div className="col-6 mb-3">
                          <button
                          type="button"
                            className=" btn
                                btn-outline-success "
                            onClick={PensionhandleShow}
                          >
                            <div className="iconContainer mx-1">
                              <img className="img-fluid" src={plus} alt="" />
                            </div>
                            Enter Details
                          </button>
                        </div>
                    </div>
                      )}
                    {/* 1 row */}

                    {/* --------------------------------------------- */}

                    <Modal
                      show={Pensionshow}
                      onHide={PensionhandleClose}
                      backdrop="static"
                      className="modal-lg"
                      keyboard={false}
                    >
                      <Modal.Header className="text-light modalBG " closeButton>
                        <Modal.Title className="fontStyle">
                          Pension Account Details
                          <div className="iconContainerLg">
                            <img className="img-fluid" src={notebook} alt="" />
                          </div>
                        </Modal.Title>
                      </Modal.Header>
                      <Formik
                        initialValues={
                          clientPensionDataListEdit
                            ? clientPensionDataListObj[0]
                            : InitialValuesMainClientPensionAccount
                        }
                        validationSchema={
                          clientPensionAccountMainValidationSchema
                        }
                        onSubmit={ClientPensionAccount_onSubmit}
                        enableReinitialize
                      >
                        {({
                          values,
                          setFieldValue,
                          setValues,
                          handleChange,
                          handleBlur,
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
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_FundName"
                                        className="form-label"
                                      >
                                        Fund Name
                                      </label>
                                    </div>

                                  <div className="col-6">
                                      <Field
                                        as="select"
                                        name="AccountPension_FundName"
                                        id="AccountPension_FundName"
                                        className="form-select shadow  inputDesign"
                                      >
                                        <option value="">Select</option>
                                        <option value="AMIST Pension">
                                          AMIST Pension
                                        </option>
                                        <option value="AMP Choice">
                                          AMP Choice
                                        </option>
                                        <option value="AMP North">
                                          AMP North
                                        </option>
                                        <option value="AMP South">
                                          AMP South
                                        </option>
                                      </Field>
                                      <ErrorMessage
                                        name="AccountPension_FundName"
                                        component="div"
                                        className="text-danger fw-bold"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_MemberNO"
                                        className="form-label"
                                      >
                                        Member No
                                      </label>
                                    </div>

                                  <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_MemberNO"
                                        name="AccountPension_MemberNO"
                                        placeholder="Member No"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_MemberNO"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_FundType"
                                        className="form-label"
                                      >
                                        Fund Type
                                      </label>
                                    </div>

                                     <div className="col-6">
                                      <Field
                                        as="select"
                                        name="AccountPension_FundType"
                                        id="AccountPension_FundType"
                                        className="form-select shadow  inputDesign"
                                      >
                                        <option value="">Select</option>
                                        <option value="Personal Industry">
                                          Personal Industry
                                        </option>
                                        <option value="Personal Retail">
                                          Personal Retail
                                        </option>
                                        <option value="Personal Master">
                                          Personal Master
                                        </option>
                                        <option value="Personal WRAP">
                                          Personal WRAP
                                        </option>
                                        <option value="Personal Public Sector">
                                          Personal Public Sector
                                        </option>
                                      </Field>
                                      <ErrorMessage
                                        name="AccountPension_FundType"
                                        component="div"
                                        className="text-danger fw-bold"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_ContactNO"
                                        className="form-label"
                                      >
                                        Contact No
                                      </label>
                                    </div>

                                   <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_ContactNO"
                                        name="AccountPension_ContactNO"
                                        placeholder="Contact No"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_ContactNO"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_FaxNO"
                                        className="form-label"
                                      >
                                        Fax No
                                      </label>
                                  </div>

                                      <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_FaxNO"
                                        name="AccountPension_FaxNO"
                                        placeholder="Fax No"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_FaxNO"
                                      />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_PostalAddress"
                                        className="form-label"
                                      >
                                        Postal Address
                                      </label>
                                  </div>

                                   <div className="col-6">
                                      <Field
                                        type="text"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_PostalAddress"
                                        name="AccountPension_PostalAddress"
                                        placeholder="Postal Address"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_PostalAddress"
                                      />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_ABN"
                                        className="form-label"
                                      >
                                        ABN
                                      </label>
                                  </div>

                                      <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_ABN"
                                        name="AccountPension_ABN"
                                        placeholder="ABN"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_ABN"
                                      />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_SPIN"
                                        className="form-label"
                                      >
                                        SPIN
                                      </label>
                                  </div>

                                       <div className="col-6">
                                      <Field
                                        type="text"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_SPIN"
                                        name="AccountPension_SPIN"
                                        placeholder="SPIN"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_SPIN"
                                      />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_Website"
                                        className="form-label"
                                      >
                                        Website
                                      </label>
                                    </div>

                                <div className="col-6">
                                      <Field
                                        type="text"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_Website"
                                        name="AccountPension_Website"
                                        placeholder="Website"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_Website"
                                      />
                                  </div> 
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_Email"
                                        className="form-label"
                                      >
                                        Email
                                      </label>
                                    </div>

                                <div className="col-6">
                                      <Field
                                        type="text"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_Email"
                                        name="AccountPension_Email"
                                        placeholder="Email"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_Email"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_PensionType"
                                        className="form-label"
                                      >
                                        Pension Type
                                      </label>
                                    </div>

                                <div className="col-6">
                                      <Field
                                        as="select"
                                        name="AccountPension_PensionType"
                                        id="AccountPension_PensionType"
                                        className="form-select shadow  inputDesign"
                                      >
                                        <option value="">Select</option>
                                        <option value="TTR">TTR</option>
                                        <option value="Account Based">
                                          Account Based
                                        </option>
                                      </Field>
                                      <ErrorMessage
                                        name="AccountPension_PensionType"
                                        component="div"
                                        className="text-danger fw-bold"
                                      />
                                </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_CommencementDate"
                                        className="form-label"
                                      >
                                        Commencment Date
                                      </label>
                                    </div>

                                <div className="col-6">
                                      {/**   <Field type="date" className="form-control shadow inputDesign"
                                        id="AccountPension_CommencementDate" name='AccountPension_CommencementDate' /> */}
                                      <div>
                                        <DatePicker
                                          className="form-control inputDesign shadow"
                                          showIcon
                                          id="AccountPension_CommencementDate"
                                          name="AccountPension_CommencementDate"
                                          selected={
                                            values.AccountPension_CommencementDate
                                          }
                                          onChange={(date) =>
                                            setFieldValue(
                                              "AccountPension_CommencementDate",
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
                                        name="AccountPension_CommencementDate"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_EligibleService"
                                        className="form-label"
                                      >
                                        Eligible Service Date
                                      </label>
                                    </div>

                                <div className="col-6">
                                      {/**       <Field type="date" className="form-control shadow inputDesign"
                                        id="AccountPension_EligibleService" name='AccountPension_EligibleService' /> */}
                                      <div>
                                        <DatePicker
                                          className="form-control inputDesign shadow"
                                          showIcon
                                          id="AccountPension_EligibleService"
                                          name="AccountPension_EligibleService"
                                          selected={
                                            values.AccountPension_EligibleService
                                          }
                                          onChange={(date) =>
                                            setFieldValue(
                                              "AccountPension_EligibleService",
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
                                        name="AccountPension_EligibleService"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_CurrentBalance"
                                        className="form-label"
                                      >
                                        Current Balance
                                      </label>
                                    </div>

                                <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_CurrentBalance"
                                        name="AccountPension_CurrentBalance"
                                        placeholder="Current Balance"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_CurrentBalance"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_TaxFree"
                                        className="form-label"
                                      >
                                        Tax Free
                                      </label>
                                    </div>

                                 <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_TaxFree"
                                        name="AccountPension_TaxFree"
                                        placeholder="Tax Free"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_TaxFree"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_Taxed"
                                        className="form-label"
                                      >
                                        Taxed
                                      </label>
                                    </div>

                                 <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_Taxed"
                                        name="AccountPension_Taxed"
                                        placeholder="Taxed"
                                        readOnly={true}
                                        value={values.AccountPension_CurrentBalance - values.AccountPension_TaxFree}
                                      />
                                      {/* <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_Taxed"
                                      /> */}
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_OriginalPrice"
                                        className="form-label"
                                      >
                                        Original Purchase Price
                                      </label>
                                    </div>

                                 <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_OriginalPrice"
                                        name="AccountPension_OriginalPrice"
                                        placeholder="Original Purchase Price"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_OriginalPrice"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_Frequency"
                                        className="form-label"
                                      >
                                        Frequency
                                      </label>
                                    </div>

                                <div className="col-6">
                                      <Field
                                        as="select"
                                        name="AccountPension_Frequency"
                                        id="AccountPension_Frequency"
                                        className="form-select shadow  inputDesign"
                                      >
                                        <option value="">Select</option>
                                        <option value="Fortnightly">
                                          Fortnightly
                                        </option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Quarterly">
                                          Quarterly
                                        </option>
                                        <option value="Six Monthly">
                                          Six Monthly
                                        </option>
                                        <option value="Anually">Anually</option>
                                      </Field>
                                      <ErrorMessage
                                        name="AccountPension_Frequency"
                                        component="div"
                                        className="text-danger fw-bold"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_IncomeDrawn"
                                        className="form-label"
                                      >
                                        Regular Income Drawn
                                      </label>
                                  </div>

                                     <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_IncomeDrawn"
                                        name="AccountPension_IncomeDrawn"
                                        placeholder="Regular Income Drawn"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_IncomeDrawn"
                                      />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_MinimumRequired"
                                        className="form-label"
                                      >
                                        Minimum Required
                                      </label>
                                  </div>

                                       <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_MinimumRequired"
                                        name="AccountPension_MinimumRequired"
                                        placeholder="Minimum Required"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_MinimumRequired"
                                      />
                                    </div>
                                </div>
                                 {values.AccountPension_PensionType==="TTR" && 
                                <div className="row mb-3">
                                       {/* new Field */}
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_MaximumRequired"
                                        className="form-label"
                                      >
                                        Maximum
                                      </label>
                                    </div>

                                 <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_MaximumRequired"
                                        name="AccountPension_MaximumRequired"
                                        placeholder="Maximum Required"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_MaximumRequired"
                                      />
                                  </div>
                                </div>
                                  }

                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_RelevantNumber"
                                        className="form-label"
                                      >
                                        Relevant Number
                                      </label>
                                    </div>

                                 <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_RelevantNumber"
                                        name="AccountPension_RelevantNumber"
                                        placeholder="Relevant Number"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_RelevantNumber"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_LumpsumTaken"
                                        className="form-label"
                                      >
                                        Lumpsum Withdrawl Taken
                                      </label>
                                    </div>

                                    <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_LumpsumTaken"
                                        name="AccountPension_LumpsumTaken"
                                        placeholder="Lumpsum Withdrawl Taken"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_LumpsumTaken"
                                      />
                                  </div>
                                </div>
                                

                                <div className="row mb-3">
   
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_DeductibleAmount"
                                        className="form-label"
                                      >
                                        Deductible Amount
                                      </label>
                                    </div>

                                  <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_DeductibleAmount"
                                        name="AccountPension_DeductibleAmount"
                                        placeholder="Deductible Amount"
                                        readOnly={true}
                                        value={values.AccountPension_OriginalPrice-values.AccountPension_LumpsumTaken}
                                      />
                                      {/* <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_DeductibleAmount"
                                      /> */}
                                  </div>
                                </div>
                              </div>
                              {/* Solicitor */}

                              {/* Bank Account Detail Form */}

                              {/* NESTED MODAL CLIENT PENSION -> INVESTMENTS START*/}
                              <button
                                type="button"
                                onClick={handleShowPensionClient}
                                className="btn bgColor modalBtn mx-2"
                              >
                                Investments
                              </button>
                              <Modal
                                show={showPensionClient}
                                onHide={handleClosePensionClient}
                                backdrop="static"
                                className="modal-lg"
                                keyboard={false}
                              >
                                <Modal.Header
                                  className="text-light modalBG "
                                  closeButton
                                >
                                  <Modal.Title className="fontStyle">
                                    Investment Option Details
                                  </Modal.Title>
                                </Modal.Header>
                                <Formik
                                  initialValues={
                                    PensionClientInvestmentModalEdit
                                      ? PensionClientInvestmentModalObj[0]
                                      : initialValuesClientPensionNestedModal
                                  }
                                  validationSchema={
                                    validateYupSchemaClientPensionNestedModal
                                  }
                                  onSubmit={
                                    On_submit_validateClientPensionNestedModal
                                  }
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
                                          {/* Row 1*/}
                                          <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="InvestmentClientPensionOption"
                                                  className="form-label"
                                                >
                                                  Investment
                                                </label>
                                              </div>

                                           <div className="col-6">
                                                <Field
                                                  as="select"
                                                  id="InvestmentClientPensionOption"
                                                  name="InvestmentClientPensionOption"
                                                  className="form-select shadow  inputDesign"
                                                  onChange={(e) =>
                                                    setFieldValue(
                                                      "InvestmentClientPensionOption",
                                                      e.target.value
                                                    )
                                                  }
                                                  value={
                                                    values.InvestmentClientPensionOption
                                                  }
                                                >
                                                  <option value="Select">
                                                    Select Investment Options
                                                  </option>
                                                  <option value="AMI001SUP - AMIST Super-Secure">
                                                    AMI001SUP - AMIST
                                                    Super-Secure
                                                  </option>
                                                  <option value="AMI002SUP - AMIST Super-Capital Stable">
                                                    AMI002SUP - AMIST
                                                    Super-Capital Stable
                                                  </option>
                                                  <option value="AMI003SUP - AMIST Super-Balanced">
                                                    AMI003SUP - AMIST
                                                    Super-Balanced
                                                  </option>
                                                  <option value="AMI004SUP - AMIST Super-Growth">
                                                    AMI004SUP - AMIST
                                                    Super-Growth
                                                  </option>
                                                  <option value="AMI005SUP - AMIST Super-High Growth">
                                                    AMI005SUP - AMIST Super-High
                                                    Growth
                                                  </option>
                                                </Field>
                                                <ErrorMessage
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                  name="InvestmentClientPensionOption"
                                                />
                                            </div>
                                          </div>

                                          <div className="row mb-3">
                                           
                                              <div className="col-6">
                                                <label
                                                  htmlFor="InvestmentClientPensionCurrentValue"
                                                  className="form-label"
                                                >
                                                  Current Value
                                                </label>
                                              </div>

                                            <div className="col-6">
                                                <Field
                                                  type="number"
                                                  className="form-control shadow inputDesign"
                                                  id="InvestmentClientPensionCurrentValue"
                                                  name="InvestmentClientPensionCurrentValue"
                                                  placeholder="Current Value"
                                                />
                                                <ErrorMessage
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                  name="InvestmentClientPensionCurrentValue"
                                                />
                                            </div>
                                          </div>
                                          {/* Row 1*/}
                                          {/* DISPLAY TABLE */}
                                          <div
                                            className="table-responsive my-3"
                                            id="InvestmentOptionDetailsTable"
                                          >
                                            <table className="table table-bordered table-hover text-center">
                                              <thead
                                                className="text-light"
                                                id="tableHead"
                                              >
                                                <tr>
                                                  <th>Code</th>
                                                  <th>Option</th>
                                                  <th>Current Value</th>
                                                  <th>Operations</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {PensionClientInvestmentModal.map(
                                                  (elem, index) => {
                                                    return (
                                                      <tr>
                                                        <td>2r5rs</td>
                                                        <td>
                                                          {
                                                            elem.InvestmentOption
                                                          }
                                                        </td>
                                                        <td>
                                                          {" "}
                                                          {elem.CurrentValue}
                                                        </td>

                                                        <td>
                                                          <button
                                                            type="button"
                                                            onClick={() =>
                                                              ClientPensionInvestmentModaldeleteHandler(
                                                                elem
                                                              )
                                                            }
                                                            className="btn btn-danger btn-sm"
                                                          >
                                                            delete
                                                          </button>
                                                          <button
                                                            type="button"
                                                            onClick={() =>
                                                              ClientPensionInvestmentModalupdateHandler(
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
                                                  }
                                                )}
                                              </tbody>
                                            </table>
                                          </div>
                                          {/* DISPLAY TABLE */}
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
                                            onClick={handleClosePensionClient}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </Modal.Footer>
                                    </Form>
                                  )}
                                </Formik>
                              </Modal>
                              {/* NESTED MODAL CLIENT PENSION -> INVESTMENTS ENDS*/}

                              {/* NESTED MODAL CLIENT PENSION -> BENEFICIARY */}
                              <button
                                type="button"
                                onClick={handleShowClientBeneficiary}
                                className="btn bgColor modalBtn"
                              >
                                Beneficiaries
                              </button>
                              {/* NESTED PARTNER PENSION BENEFICIARY MODAL  */}
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

                    {/* NESTED PARTNER PENSION BENEFICIARY MODAL  */}
                    <Modal
                      show={showClientBeneficiary}
                      onHide={handleCloseClientBeneficiary}
                      backdrop="static"
                      className="modal-lg"
                      keyboard={false}
                    >
                      <Modal.Header className="text-light modalBG " closeButton>
                        <Modal.Title className="fontStyle">
                          Beneficiaries Details
                        </Modal.Title>
                      </Modal.Header>
                      <Formik
                        initialValues={
                          ClientBeneficiaryDataListUpdateFlag
                            ? ClientBeneficiaryDataListObj[0]
                            : initialValuesPensionBeneficiaryClient
                        }
                        validationSchema={
                          validateSchemaPensionClientBeneficiary
                        }
                        onSubmit={On_submit_PenionBeneficiaryClient}
                        enableReinitialize
                      >
                        {({ values, handleChange, setFieldValue, formik }) => (
                          <Form>
                            <Modal.Body>
                              {/* Family Assets Details*/}

                              <div className="row">
                              <div className="col-6">
                              <label className="form-label">
                                  Do you have any Nominated Beneficiaries on the
                                  Account?
                                </label>
                              </div>
                              <div className="col-6">

                                {/* switch button style */}
                                <div className="form-check form-switch m-0 p-0 ">
                                  <div className="radiobutton">
                                    <input
                                      type="radio"
                                      name="clientPensionBeneficiaryAttached"
                                      id="clientPensionBeneficiaryAttached1"
                                      value="Yes"
                                      // onClick={() => beneficiariesRadioHandler("Yes")}
                                      onChange={handleChange}
                                      checked={
                                        values.clientPensionBeneficiaryAttached ===
                                        "Yes"
                                      }
                                    />
                                    <label
                                      htmlFor="clientPensionBeneficiaryAttached1"
                                      className="label1"
                                    >
                                      <span>YES</span>
                                    </label>
                                    <input
                                      type="radio"
                                      name="clientPensionBeneficiaryAttached"
                                      id="clientPensionBeneficiaryAttached2"
                                      value="No"
                                      // onClick={() => beneficiariesRadioHandler("No")}
                                      onChange={handleChange}
                                      checked={
                                        values.clientPensionBeneficiaryAttached ===
                                        "No"
                                      }
                                    />
                                    <label
                                      htmlFor="clientPensionBeneficiaryAttached2"
                                      className="label2"
                                    >
                                      <span>NO</span>
                                    </label>
                                  </div>
                                </div>
                                </div>
                              </div>

                              {values.clientPensionBeneficiaryAttached ==
                                "Yes" && (
                                <div className="">
                                  <div className="row mb-3">
                                      <div className="col-6">
                                        <label
                                          htmlFor="NomiationTypeBeneficiary"
                                          className="form-label"
                                        >
                                          Nomination Type client pension
                                        </label>
                                      </div>

                                    <div className="col-6">
                                        <Field
                                          as="select"
                                          id="NomiationTypePensionClientBeneficiary"
                                          name="NomiationTypePensionClientBeneficiary"
                                          className="form-select shadow  inputDesign"
                                          // onChange={(e) =>
                                          //   setFieldValue(
                                          //     "NomiationTypePensionClientBeneficiary",
                                          //     e.target.value
                                          //   )
                                          // }

                                          onChange={(e) => {
                                            let thisVal = e.target.value;
                                            handleChange(e);
                                            if (thisVal == "Legal Representative(Your Estate)") {
                                              handleChange({
                                                target: { name: 'BeneficiariesOptionDetailsBeneficiaries', value: "" },
                                              })
                                            }
                                          }}
                                          



                                         
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
                                            Legal Representative(Your Estate)
                                          </option>
                                          <option value="Reversionary Beneficiary">
                                            Reversionary Beneficiary
                                          </option>
                                        </Field>
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="NomiationTypePensionClientBeneficiary"
                                        />
                                    </div>
                                    </div>
                                    {values.NomiationTypePensionClientBeneficiary  =="Legal Representative(Your Estate)" ||

                                  <div className="row mb-3">

                                      <div className="col-6">
                                        <label
                                          htmlFor="BeneficiariesOptionDetailsBeneficiaries"
                                          className="form-label"
                                        >
                                          How many beneficiaries do you have?
                                        </label>
                                      </div>

                                    <div className="col-6">
                                        <Field
                                          as="select"
                                          id="BeneficiariesOptionDetailsBeneficiaries"
                                          name="BeneficiariesOptionDetailsBeneficiaries"
                                          className="form-select shadow  inputDesign"
                                          onChange={(e) =>
                                            setFieldValue(
                                              "BeneficiariesOptionDetailsBeneficiaries",
                                              e.target.value
                                            )
                                          }
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
                                  }
                                  {/* Row 1*/}
                                  {values.BeneficiariesOptionDetailsBeneficiaries >=
                                  1 ? (
                                    <div className="row justify-content-around mt-4 mb-3">
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="BeneficiaryPensionClient1"
                                            className="form-label"
                                          >
                                            Beneficiary 1
                                          </label>
                                          <Field
                                            className="form-control shadow inputDesign"
                                            id="BeneficiaryPensionClient1"
                                            name="BeneficiaryPensionClient1"
                                            placeholder="Beneficiary 1"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="BeneficiaryPensionClient1"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="ShareofBenefitPensionClient1"
                                            className="form-label"
                                          >
                                            Share of Benefits %{" "}
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="ShareofBenefitPensionClient1"
                                            name="ShareofBenefitPensionClient1"
                                            placeholder="Share of Benefits 1"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="ShareofBenefitPensionClient1"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="RelationshipOptionDetailsPensionClient1"
                                            className="form-label"
                                          >
                                            Relationship
                                          </label>
                                          <Field
                                            as="select"
                                            id="RelationshipOptionDetailsPensionClient1"
                                            name="RelationshipOptionDetailsPensionClient1"
                                            className="form-select shadow  inputDesign"
                                            //onChange={(e) => setFieldValue("RelationshipOptionDetailsPensionClient1", e.target.value)}
                                            value={
                                              values.RelationshipOptionDetailsPensionClient1
                                            }
                                          >
                                            <option value="">Select</option>
                                            <option value="Spouse">
                                              Spouse
                                            </option>
                                            <option value="Child">Child</option>
                                            <option value="Other">Other</option>
                                            <option value="Interdependency">
                                              Interdependency
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="RelationshipOptionDetailsPensionClient1"
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
                                            htmlFor="BeneficiaryPensionClient2"
                                            className="form-label"
                                          >
                                            Beneficiary 2
                                          </label>
                                          <Field
                                            className="form-control shadow inputDesign"
                                            id="BeneficiaryPensionClient2"
                                            name="BeneficiaryPensionClient2"
                                            placeholder="Beneficiary 2"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="BeneficiaryPensionClient2"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="ShareofBenefit2PensionClient2"
                                            className="form-label"
                                          >
                                            Share of Benefits %{" "}
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="ShareofBenefit2PensionClient2"
                                            name="ShareofBenefit2PensionClient2"
                                            placeholder="Share of Benefits 2"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="ShareofBenefit2PensionClient2"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="RelationshipOptionDetailsPensionClient2"
                                            className="form-label"
                                          >
                                            Relationship
                                          </label>
                                          <Field
                                            as="select"
                                            id="RelationshipOptionDetailsPensionClient2"
                                            name="RelationshipOptionDetailsPensionClient2"
                                            className="form-select shadow  inputDesign"
                                            //onChange={(e) => setFieldValue("RelationshipOptionDetailsPensionClient2", e.target.value)}
                                            value={
                                              values.RelationshipOptionDetailsPensionClient2
                                            }
                                          >
                                            <option value="">Select</option>
                                            <option value="Spouse">
                                              Spouse
                                            </option>
                                            <option value="Child">Child</option>
                                            <option value="Other">Other</option>
                                            <option value="Interdependency">
                                              Interdependency
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="RelationshipOptionDetailsPensionClient2"
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
                                            htmlFor="BeneficiaryPensionClient3"
                                            className="form-label"
                                          >
                                            Beneficiary 3
                                          </label>
                                          <Field
                                            className="form-control shadow inputDesign"
                                            id="BeneficiaryPensionClient3"
                                            name="BeneficiaryPensionClient3"
                                            placeholder="Beneficiary 3"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="BeneficiaryPensionClient3"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="ShareofBenefitPensionClient3"
                                            className="form-label"
                                          >
                                            Share of Benefits %{" "}
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="ShareofBenefitPensionClient3"
                                            name="ShareofBenefitPensionClient3"
                                            placeholder="Share of Benefits 3"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="ShareofBenefitPensionClient3"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="RelationshipOptionDetailsPensionClient3"
                                            className="form-label"
                                          >
                                            Relationship
                                          </label>
                                          <Field
                                            as="select"
                                            id="RelationshipOptionDetailsPensionClient3"
                                            name="RelationshipOptionDetailsPensionClient3"
                                            className="form-select shadow  inputDesign"
                                            //onChange={(e) => setFieldValue("RelationshipOptionDetailsPensionClient3", e.target.value)}
                                            value={
                                              values.RelationshipOptionDetailsPensionClient3
                                            }
                                          >
                                            <option value="">Select</option>
                                            <option value="Spouse">
                                              Spouse
                                            </option>
                                            <option value="Child">Child</option>
                                            <option value="Other">Other</option>
                                            <option value="Interdependency">
                                              Interdependency
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="RelationshipOptionDetailsPensionClient3"
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
                                            htmlFor="BeneficiaryPensionClient4"
                                            className="form-label"
                                          >
                                            Beneficiary 4
                                          </label>
                                          <Field
                                            className="form-control shadow inputDesign"
                                            id="BeneficiaryPensionClient4"
                                            name="BeneficiaryPensionClient4"
                                            placeholder="Beneficiary 4"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="BeneficiaryPensionClient4"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="ShareofBenefitPensionClient4"
                                            className="form-label"
                                          >
                                            Share of Benefits %{" "}
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="ShareofBenefitPensionClient4"
                                            name="ShareofBenefitPensionClient4"
                                            placeholder="Share of Benefits 4"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="ShareofBenefitPensionClient4"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="RelationshipOptionDetailsPensionClient4"
                                            className="form-label"
                                          >
                                            Relationship
                                          </label>
                                          <Field
                                            as="select"
                                            id="RelationshipOptionDetailsPensionClient4"
                                            name="RelationshipOptionDetailsPensionClient4"
                                            className="form-select shadow  inputDesign"
                                            //onChange={(e) => setFieldValue("RelationshipOptionDetailsPensionClient4", e.target.value)}
                                            value={
                                              values.RelationshipOptionDetailsPensionClient4
                                            }
                                          >
                                            <option value="">Select</option>
                                            <option value="Spouse">
                                              Spouse
                                            </option>
                                            <option value="Child">Child</option>
                                            <option value="Other">Other</option>
                                            <option value="Interdependency">
                                              Interdependency
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="RelationshipOptionDetailsPensionClient4"
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
                                            htmlFor="BeneficiaryPensionClient5"
                                            className="form-label"
                                          >
                                            Beneficiary 5
                                          </label>
                                          <Field
                                            className="form-control shadow inputDesign"
                                            id="BeneficiaryPensionClient5"
                                            name="BeneficiaryPensionClient5"
                                            placeholder="Beneficiary 5"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="BeneficiaryPensionClient5"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="ShareofBenefitPensionClient5"
                                            className="form-label"
                                          >
                                            Share of Benefits %{" "}
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="ShareofBenefitPensionClient5"
                                            name="ShareofBenefitPensionClient5"
                                            placeholder="Share of Benefits 5"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="ShareofBenefitPensionClient5"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="RelationshipOptionDetailsPensionClient5"
                                            className="form-label"
                                          >
                                            Relationship
                                          </label>
                                          <Field
                                            as="select"
                                            id="RelationshipOptionDetailsPensionClient5"
                                            name="RelationshipOptionDetailsPensionClient5"
                                            className="form-select shadow  inputDesign"
                                            //onChange={(e) => setFieldValue("RelationshipOptionDetailsPensionClient5", e.target.value)}
                                            value={
                                              values.RelationshipOptionDetailsPensionClient5
                                            }
                                          >
                                            <option value="">Select</option>
                                            <option value="Spouse">
                                              Spouse
                                            </option>
                                            <option value="Child">Child</option>
                                            <option value="Other">Other</option>
                                            <option value="Interdependency">
                                              Interdependency
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="RelationshipOptionDetailsPensionClient5"
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
                            </Modal.Body>
                            <Modal.Footer>
                              <div className="col-md-12">
                                <button
                                  className="float-end btn w-25  bgColor modalBtn"
                                  // onClick={handleClose3}
                                  type="submit"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  className="float-end btn w-25  btn-outline  backBtn mx-3"
                                  onClick={handleCloseClientBeneficiary}
                                >
                                  Cancel
                                </button>
                              </div>
                            </Modal.Footer>
                          </Form>
                        )}
                      </Formik>
                    </Modal>
                    {/* NESTED MODAL CLIENT PENSION -> BENEFICIARY */}

                    {/*CLIENT PENSION ACCOUNT DISPLAY TABLE */}
                    {CRObject.AccountBasedPensionIssuesradio == "Yes" &&<div
                      className="table-responsive my-3"
                      id="ClientPensionAccountDisplayTable"
                    >
                      <table className="table table-bordered table-hover text-center">
                        <thead className="text-light" id="tableHead">
                          <tr>
                            <th>Fund Name</th>
                            <th>Member #</th>
                            <th>Current Value</th>
                            <th>Original Purchase Price</th>
                            <th>Nominated Beneficiaries</th>
                            <th>Operations</th>
                          </tr>
                        </thead>
                        <tbody>
                          {clientPensionDataList.map((elem, index) => {
                            let {
                              AccountPension_FundName,
                              AccountPension_MemberNO,
                              AccountPension_CurrentBalance,
                              AccountPension_OriginalPrice,
                              AccountPension_LumpsumTaken,
                            } = elem;
                            return (
                              <tr key={index}>
                                <td>{AccountPension_FundName}</td>
                                <td>{AccountPension_MemberNO}</td>
                                <td> {AccountPension_CurrentBalance}</td>
                                <td> {AccountPension_OriginalPrice}</td>
                                <td> {AccountPension_LumpsumTaken}</td>
                                <td>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      clientPensiondeleteHandler(elem)
                                    }
                                    className="btn btn-danger btn-sm"
                                  >
                                    delete
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      clientPensionupdateHandler(elem, index)
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
                    </div>}
                    {/*CLIENT SUPER ACCOUNT DISPLAY TABLE */}
                    {/*PARTNER SUPER ACCOUNT BENFICIARIES  DISPLAY TABLE */}
                   { CRObject.AccountBasedPensionIssuesradio == "Yes" && <h3>Client Benficiaries</h3>}
                   { CRObject.AccountBasedPensionIssuesradio == "Yes" &&<div className="table-responsive my-3">
                      <table className="table table-bordered table-hover text-center">
                        <thead className="text-light" id="tableHead">
                          <tr>
                            <th>No_ofBeneficiaries</th>
                            <th>NominatedBeneficiary</th>
                            <th>NominationType</th>
                            <th>Operations</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ClientBeneficiaryDataList.map((elem, index) => {
                            return (
                              <tr>
                                <th>{elem.No_ofBeneficiaries}</th>
                                <th>{elem.NominatedBeneficiary}</th>
                                <th>{elem.NominationType}</th>

                                <th>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      ClientBeneficiaryDataListDeleteHandler(
                                        elem,
                                        index
                                      );
                                    }}
                                    className="btn btn-danger btn-sm"
                                  >
                                    delete
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      ClientBeneficiaryDataListUpdateHandler(
                                        elem,
                                        index
                                      );
                                    }}
                                    className="btn btn-warning btn-sm mx-2"
                                  >
                                    update
                                  </button>
                                </th>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>}
                    {/*PARTNER SUPER ACCOUNT BENFICIARIES  DISPLAY TABLE */}
                    {/* ---------------------------------------------------- */}
                    
 { CRObject.AccountBasedPensionIssuesradio == "Yes" &&<h3 className="">Partner Pension Account</h3>
}
                    {/* 1 row */}
                     {CRObject.AccountBasedPensionIssuesradio == "Yes" && 
                    <div className="row">
                     <div className="col-6 mb-3">
                          <label className="form-label">
                            Do you have any Pension Accounts?
                          </label>
                          </div>
                        <div className="col-6 mb-3">
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input
                                type="radio"
                                name="Pension2Radio"
                                id="Pension2Radioopt1"
                                value="Yes"
                                onClick={() => Pension2Handler("Yes")}
                                onChange={handleChange}
                                checked={values.Pension2Radio === "Yes"}
                              />
                              <label
                                htmlFor="Pension2Radioopt1"
                                className="label1"
                              >
                                <span>YES</span>
                              </label>
                              <input
                                type="radio"
                                name="Pension2Radio"
                                id="Pension2Radioopt2"
                                value="No"
                                onClick={() => Pension2Handler("No")}
                                onChange={handleChange}
                                checked={values.Pension2Radio === "No"}
                              />
                              <label
                                htmlFor="Pension2Radioopt2"
                                className="label2"
                              >
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      }
                      

                      {Pension2 && (
                        <div className="row">
                        <div className="col-6 mb-3">
                          <label className="form-label">
                            Please enter the details of your Pension Accounts
                          </label>
                        
                          </div>
                          <div className="col-6 mb-3">
                          <button
                          type="button"
                            className=" btn 
                                btn-outline-success "
                            onClick={Pension2handleShow}
                          >
                            <div className="iconContainer mx-1">
                              <img className="img-fluid" src={plus} alt="" />
                            </div>
                            Enter Details
                          </button>
                        </div>
                    </div>
                      )}
                    {/* 1 row */}

                    {/* --------------------------------------------- */}

                    <Modal
                      show={Pension2show}
                      onHide={Pension2handleClose}
                      backdrop="static"
                      className="modal-lg"
                      keyboard={false}
                    >
                      <Modal.Header className="text-light modalBG " closeButton>
                        <Modal.Title className="fontStyle">
                          Pension Account Details
                          <div className="iconContainerLg">
                            <img className="img-fluid" src={notebook} alt="" />
                          </div>
                        </Modal.Title>
                      </Modal.Header>
                      <Formik
                        initialValues={
                          Pension2PartnerDataListEdit
                            ? PartnerSuperAccountsObj[0]
                            : InitialValuesMainPartnerPensionAccount
                        }
                        validationSchema={
                          partnerPensionAccountMainValidationSchema
                        }
                        onSubmit={PartnerPensionAccount_onSubmit}
                      >
                        {({
                          values,
                          setFieldValue,
                          setValues,
                          handleChange,
                          handleBlur,
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
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_FundName"
                                        className="form-label"
                                      >
                                        Fund Name
                                      </label>
                                    </div>

                                  <div className="col-6">
                                      <Field
                                        as="select"
                                        name="AccountPension_FundName"
                                        id="AccountPension_FundName"
                                        className="form-select shadow  inputDesign"
                                      >
                                        <option value="">Select</option>
                                        <option value="AMIST Pension">
                                          AMIST Pension
                                        </option>
                                        <option value="AMP Choice">
                                          AMP Choice
                                        </option>
                                        <option value="AMP North">
                                          AMP North
                                        </option>
                                        <option value="AMP South">
                                          AMP South
                                        </option>
                                      </Field>
                                      <ErrorMessage
                                        name="AccountPension_FundName"
                                        component="div"
                                        className="text-danger fw-bold"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_MemberNO"
                                        className="form-label"
                                      >
                                        Member No
                                      </label>
                                    </div>

                                  <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_MemberNO"
                                        name="AccountPension_MemberNO"
                                        placeholder="Member No"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_MemberNO"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_FundType"
                                        className="form-label"
                                      >
                                        Fund Type
                                      </label>
                                    </div>

                                     <div className="col-6">
                                      <Field
                                        as="select"
                                        name="AccountPension_FundType"
                                        id="AccountPension_FundType"
                                        className="form-select shadow  inputDesign"
                                      >
                                        <option value="">Select</option>
                                        <option value="Personal Industry">
                                          Personal Industry
                                        </option>
                                        <option value="Personal Retail">
                                          Personal Retail
                                        </option>
                                        <option value="Personal Master">
                                          Personal Master
                                        </option>
                                        <option value="Personal WRAP">
                                          Personal WRAP
                                        </option>
                                        <option value="Personal Public Sector">
                                          Personal Public Sector
                                        </option>
                                      </Field>
                                      <ErrorMessage
                                        name="AccountPension_FundType"
                                        component="div"
                                        className="text-danger fw-bold"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_ContactNO"
                                        className="form-label"
                                      >
                                        Contact No
                                      </label>
                                    </div>

                                   <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_ContactNO"
                                        name="AccountPension_ContactNO"
                                        placeholder="Contact No"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_ContactNO"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_FaxNO"
                                        className="form-label"
                                      >
                                        Fax No
                                      </label>
                                  </div>

                                      <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_FaxNO"
                                        name="AccountPension_FaxNO"
                                        placeholder="Fax No"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_FaxNO"
                                      />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_PostalAddress"
                                        className="form-label"
                                      >
                                        Postal Address
                                      </label>
                                  </div>

                                   <div className="col-6">
                                      <Field
                                        type="text"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_PostalAddress"
                                        name="AccountPension_PostalAddress"
                                        placeholder="Postal Address"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_PostalAddress"
                                      />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_ABN"
                                        className="form-label"
                                      >
                                        ABN
                                      </label>
                                  </div>

                                      <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_ABN"
                                        name="AccountPension_ABN"
                                        placeholder="ABN"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_ABN"
                                      />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_SPIN"
                                        className="form-label"
                                      >
                                        SPIN
                                      </label>
                                  </div>

                                       <div className="col-6">
                                      <Field
                                        type="text"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_SPIN"
                                        name="AccountPension_SPIN"
                                        placeholder="SPIN"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_SPIN"
                                      />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_Website"
                                        className="form-label"
                                      >
                                        Website
                                      </label>
                                    </div>

                                <div className="col-6">
                                      <Field
                                        type="text"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_Website"
                                        name="AccountPension_Website"
                                        placeholder="Website"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_Website"
                                      />
                                  </div> 
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_Email"
                                        className="form-label"
                                      >
                                        Email
                                      </label>
                                    </div>

                                <div className="col-6">
                                      <Field
                                        type="text"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_Email"
                                        name="AccountPension_Email"
                                        placeholder="Email"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_Email"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_PensionType"
                                        className="form-label"
                                      >
                                        Pension Type
                                      </label>
                                    </div>

                                <div className="col-6">
                                      <Field
                                        as="select"
                                        name="AccountPension_PensionType"
                                        id="AccountPension_PensionType"
                                        className="form-select shadow  inputDesign"
                                      >
                                        <option value="">Select</option>
                                        <option value="TTR">TTR</option>
                                        <option value="Account Based">
                                          Account Based
                                        </option>
                                      </Field>
                                      <ErrorMessage
                                        name="AccountPension_PensionType"
                                        component="div"
                                        className="text-danger fw-bold"
                                      />
                                </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_CommencementDate"
                                        className="form-label"
                                      >
                                        Commencment Date
                                      </label>
                                    </div>

                                <div className="col-6">
                                      {/**   <Field type="date" className="form-control shadow inputDesign"
                                        id="AccountPension_CommencementDate" name='AccountPension_CommencementDate' /> */}
                                      <div>
                                        <DatePicker
                                          className="form-control inputDesign shadow"
                                          showIcon
                                          id="AccountPension_CommencementDate"
                                          name="AccountPension_CommencementDate"
                                          selected={
                                            values.AccountPension_CommencementDate
                                          }
                                          onChange={(date) =>
                                            setFieldValue(
                                              "AccountPension_CommencementDate",
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
                                        name="AccountPension_CommencementDate"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_EligibleService"
                                        className="form-label"
                                      >
                                        Eligible Service Date
                                      </label>
                                    </div>

                                <div className="col-6">
                                      {/**       <Field type="date" className="form-control shadow inputDesign"
                                        id="AccountPension_EligibleService" name='AccountPension_EligibleService' /> */}
                                      <div>
                                        <DatePicker
                                          className="form-control inputDesign shadow"
                                          showIcon
                                          id="AccountPension_EligibleService"
                                          name="AccountPension_EligibleService"
                                          selected={
                                            values.AccountPension_EligibleService
                                          }
                                          onChange={(date) =>
                                            setFieldValue(
                                              "AccountPension_EligibleService",
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
                                        name="AccountPension_EligibleService"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_CurrentBalance"
                                        className="form-label"
                                      >
                                        Current Balance
                                      </label>
                                    </div>

                                <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_CurrentBalance"
                                        name="AccountPension_CurrentBalance"
                                        placeholder="Current Balance"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_CurrentBalance"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_TaxFree"
                                        className="form-label"
                                      >
                                        Tax Free
                                      </label>
                                    </div>

                                 <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_TaxFree"
                                        name="AccountPension_TaxFree"
                                        placeholder="Tax Free"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_TaxFree"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_Taxed"
                                        className="form-label"
                                      >
                                        Taxed
                                      </label>
                                    </div>

                                 <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_Taxed"
                                        name="AccountPension_Taxed"
                                        placeholder="Taxed"
                                        readOnly={true}
                                        value={values.AccountPension_CurrentBalance - values.AccountPension_TaxFree}
                                      />
                                      {/* <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_Taxed"
                                      /> */}
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_OriginalPrice"
                                        className="form-label"
                                      >
                                        Original Purchase Price
                                      </label>
                                    </div>

                                 <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_OriginalPrice"
                                        name="AccountPension_OriginalPrice"
                                        placeholder="Original Purchase Price"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_OriginalPrice"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_Frequency"
                                        className="form-label"
                                      >
                                        Frequency
                                      </label>
                                    </div>

                                <div className="col-6">
                                      <Field
                                        as="select"
                                        name="AccountPension_Frequency"
                                        id="AccountPension_Frequency"
                                        className="form-select shadow  inputDesign"
                                      >
                                        <option value="">Select</option>
                                        <option value="Fortnightly">
                                          Fortnightly
                                        </option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Quarterly">
                                          Quarterly
                                        </option>
                                        <option value="Six Monthly">
                                          Six Monthly
                                        </option>
                                        <option value="Anually">Anually</option>
                                      </Field>
                                      <ErrorMessage
                                        name="AccountPension_Frequency"
                                        component="div"
                                        className="text-danger fw-bold"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_IncomeDrawn"
                                        className="form-label"
                                      >
                                        Regular Income Drawn
                                      </label>
                                  </div>

                                     <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_IncomeDrawn"
                                        name="AccountPension_IncomeDrawn"
                                        placeholder="Regular Income Drawn"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_IncomeDrawn"
                                      />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_MinimumRequired"
                                        className="form-label"
                                      >
                                        Minimum Required
                                      </label>
                                  </div>

                                       <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_MinimumRequired"
                                        name="AccountPension_MinimumRequired"
                                        placeholder="Minimum Required"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_MinimumRequired"
                                      />
                                    </div>
                                </div>
                                 {values.AccountPension_PensionType==="TTR" && 
                                <div className="row mb-3">
                                       {/* new Field */}
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_MaximumRequired"
                                        className="form-label"
                                      >
                                        Maximum
                                      </label>
                                    </div>

                                 <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_MaximumRequired"
                                        name="AccountPension_MaximumRequired"
                                        placeholder="Maximum Required"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_MaximumRequired"
                                      />
                                  </div>
                                </div>
                                  }

                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_RelevantNumber"
                                        className="form-label"
                                      >
                                        Relevant Number
                                      </label>
                                    </div>

                                 <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_RelevantNumber"
                                        name="AccountPension_RelevantNumber"
                                        placeholder="Relevant Number"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_RelevantNumber"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_LumpsumTaken"
                                        className="form-label"
                                      >
                                        Lumpsum Withdrawl Taken
                                      </label>
                                    </div>

                                    <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_LumpsumTaken"
                                        name="AccountPension_LumpsumTaken"
                                        placeholder="Lumpsum Withdrawl Taken"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_LumpsumTaken"
                                      />
                                  </div>
                                </div>
                                

                                <div className="row mb-3">
   
                                    <div className="col-6">
                                      <label
                                        htmlFor="AccountPension_DeductibleAmount"
                                        className="form-label"
                                      >
                                        Deductible Amount
                                      </label>
                                    </div>

                                  <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="AccountPension_DeductibleAmount"
                                        name="AccountPension_DeductibleAmount"
                                        placeholder="Deductible Amount"
                                        readOnly={true}
                                        value={values.AccountPension_OriginalPrice-values.AccountPension_LumpsumTaken}
                                      />
                                      {/* <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="AccountPension_DeductibleAmount"
                                      /> */}
                                  </div>
                                </div>
                              </div>
                              {/* Solicitor */}

                              {/* Bank Account Detail Form */}
                              {/* NESTED PARTNER PENSION INSURANCE MODAL  */}
                              <button
                                type="button"
                                onClick={handleShowPensionPartner}
                                className="btn bgColor modalBtn mx-2"
                              >
                                Investments
                              </button>
                              <Modal
                                show={showPensionPartner}
                                onHide={handleClosePensionPartner}
                                backdrop="static"
                                className="modal-lg"
                                keyboard={false}
                              >
                                <Modal.Header
                                  className="text-light modalBG "
                                  closeButton
                                >
                                  <Modal.Title className="fontStyle">
                                    Investment Option Details
                                  </Modal.Title>
                                </Modal.Header>
                                <Formik
                                  initialValues={
                                    PensionPartnerInvestmentModalEdit
                                      ? PensionPartnerInvestmentModalObj[0]
                                      : initialValuesPartnerPensionNestedModal
                                  }
                                  validationSchema={
                                    validateYupSchemaPartnerPensionNestedModal
                                  }
                                  onSubmit={
                                    On_submit_validatePartnerPensionNestedModal
                                  }
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
                                          {/* Row 1*/}
                                          <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="InvestmentPartnerPensionOption"
                                                  className="form-label"
                                                >
                                                  Investment
                                                </label>
                                              </div>

                                          <div className="col-6">
                                                <Field
                                                  as="select"
                                                  id="InvestmentPartnerPensionOption"
                                                  name="InvestmentPartnerPensionOption"
                                                  className="form-select shadow  inputDesign"
                                                  onChange={(e) =>
                                                    setFieldValue(
                                                      "InvestmentPartnerPensionOption",
                                                      e.target.value
                                                    )
                                                  }
                                                  value={
                                                    values.InvestmentPartnerPensionOption
                                                  }
                                                >
                                                  <option value="Select">
                                                    Select Investment Options
                                                  </option>
                                                  <option value="AMI001SUP - AMIST Super-Secure">
                                                    AMI001SUP - AMIST
                                                    Super-Secure
                                                  </option>
                                                  <option value="AMI002SUP - AMIST Super-Capital Stable">
                                                    AMI002SUP - AMIST
                                                    Super-Capital Stable
                                                  </option>
                                                  <option value="AMI003SUP - AMIST Super-Balanced">
                                                    AMI003SUP - AMIST
                                                    Super-Balanced
                                                  </option>
                                                  <option value="AMI004SUP - AMIST Super-Growth">
                                                    AMI004SUP - AMIST
                                                    Super-Growth
                                                  </option>
                                                  <option value="AMI005SUP - AMIST Super-High Growth">
                                                    AMI005SUP - AMIST Super-High
                                                    Growth
                                                  </option>
                                                </Field>
                                                <ErrorMessage
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                  name="InvestmentPartnerPensionOption"
                                                />
                                            </div>
                                          </div>

                                          <div className="row mb-3">
                                            
                                              <div className="col-6">
                                                <label
                                                  htmlFor="InvestmentPartnerPensionCurrentValue"
                                                  className="form-label"
                                                >
                                                  Current Value
                                                </label>
                                              </div>

                                            <div className="col-6">
                                                <Field
                                                  type="number"
                                                  className="form-control shadow inputDesign"
                                                  id="InvestmentPartnerPensionCurrentValue"
                                                  name="InvestmentPartnerPensionCurrentValue"
                                                  placeholder="Current Value"
                                                />
                                                <ErrorMessage
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                  name="InvestmentPartnerPensionCurrentValue"
                                                  value={
                                                    values.InvestmentPartnerPensionCurrentValue
                                                  }
                                                />
                                            </div>
                                          </div>
                                          {/* Row 1*/}
                                          {/* DISPLAY TABLE */}
                                          <div
                                            className="table-responsive my-3"
                                            id="InvestmentOptionDetailsTable"
                                          >
                                            <table className="table table-bordered table-hover text-center">
                                              <thead
                                                className="text-light"
                                                id="tableHead"
                                              >
                                                <tr>
                                                  <th>Code</th>
                                                  <th>Option</th>
                                                  <th>Current Value</th>
                                                  <th>Operations</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {PensionPartnerInvestmentModal.map(
                                                  (elem, index) => {
                                                    return (
                                                      <tr>
                                                        <td>2r5rs</td>
                                                        <td>
                                                          {
                                                            elem.InvestmentOption
                                                          }
                                                        </td>
                                                        <td>
                                                          {" "}
                                                          {elem.CurrentValue}
                                                        </td>

                                                        <td>
                                                          <button
                                                            type="button"
                                                            onClick={() =>
                                                              PartnerPensionInvestmentModaldeleteHandler(
                                                                elem
                                                              )
                                                            }
                                                            className="btn btn-danger btn-sm"
                                                          >
                                                            delete
                                                          </button>
                                                          <button
                                                            type="button"
                                                            onClick={() =>
                                                              PartnerPensionInvestmentModalupdateHandler(
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
                                                  }
                                                )}
                                              </tbody>
                                            </table>
                                          </div>
                                          {/* DISPLAY TABLE */}
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
                                            onClick={handleClosePensionPartner}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </Modal.Footer>
                                    </Form>
                                  )}
                                </Formik>
                              </Modal>
                              {/* NESTED PARTNER PENSION INSURANCE MODAL  */}

                              <button
                                type="button"
                                onClick={handleShowPartnerBeneficiary}
                                className="btn bgColor modalBtn"
                              >
                                Beneficiaries
                              </button>
                              {/* NESTED PARTNER PENSION BENEFICIARY MODAL  */}
                            </Modal.Body>
                            <Modal.Footer>
                              <div className="col-md-12">
                                <button
                                  className="float-end btn w-25  bgColor modalBtn"
                                  // onClick={Pension2handleClose}
                                  type="submit"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  className="float-end btn w-25  btn-outline  backBtn mx-3"
                                  onClick={Pension2handleClose}
                                >
                                  Cancel
                                </button>
                              </div>
                            </Modal.Footer>
                          </Form>
                        )}
                      </Formik>
                    </Modal>
                    {/* NESTED PARTNER PENSION BENEFICIARY MODAL  */}
                    <Modal
                      show={showPartnerBeneficiary}
                      onHide={handleClosePartnerBeneficiary}
                      backdrop="static"
                      className="modal-lg"
                      keyboard={false}
                    >
                      <Modal.Header className="text-light modalBG " closeButton>
                        <Modal.Title className="fontStyle">
                          Beneficiaries Details
                        </Modal.Title>
                      </Modal.Header>
                      <Formik
                        initialValues={
                          PartnerBeneficiaryDataListUpdateFlag
                            ? PartnerBeneficiaryDataListObj[0]
                            : initialValuesPensionBeneficiaryPartner
                        }
                        validationSchema={
                          validateSchemaPensionPartnerBeneficiary
                        }
                        onSubmit={On_submit_PenionBeneficiaryPartner}
                        enableReinitialize
                      >
                        {({ values, handleChange, setFieldValue, formik }) => (
                          <Form>
                            <Modal.Body>
                              {/* Family Assets Details*/}
                              <div className="row mb-3">
                              <div className="col-6">
                              <label className="form-label">
                                Do you have any Nominated Beneficiaries on the
                                Account?
                              </label>
                              </div>
                              <div className="col-6">
                                  {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="partnerPensionBeneficiaryAttached"
                                    id="partnerPensionBeneficiaryAttached1"
                                    value="Yes"
                                    //  onClick={() => beneficiariesRadioHandler("Yes")}
                                    onChange={handleChange}
                                    checked={
                                      values.partnerPensionBeneficiaryAttached ===
                                      "Yes"
                                    }
                                  />
                                  <label
                                    htmlFor="partnerPensionBeneficiaryAttached1"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="partnerPensionBeneficiaryAttached"
                                    id="partnerPensionBeneficiaryAttached2"
                                    value="No"
                                    //onClick={() => beneficiariesRadioHandler("No")}
                                    onChange={handleChange}
                                    checked={
                                      values.partnerPensionBeneficiaryAttached ===
                                      "No"
                                    }
                                  />
                                  <label
                                    htmlFor="partnerPensionBeneficiaryAttached2"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                              </div>


                              </div>
                             
                            
                              {values.partnerPensionBeneficiaryAttached ==
                                "Yes" && (
                                <div className="">
                                  <div className="row mb-3">
                                      <div className="col-6">
                                        <label
                                          htmlFor="NomiationTypePensionPartnerBeneficiary"
                                          className="form-label"
                                        >
                                          Nomination Type partner pension
                                        </label>
                                      </div>

                                    <div className="col-6">
                                        <Field
                                          as="select"
                                          id="NomiationTypePensionPartnerBeneficiary"
                                          name="NomiationTypePensionPartnerBeneficiary"
                                          className="form-select shadow  inputDesign"

                                          onChange={(e) => {
                                            let thisVal = e.target.value;
                                            handleChange(e);
                                            if (thisVal == "Legal Representative(Your Estate)") {
                                              handleChange({
                                                target: { name: 'BeneficiariesOptionDetailsBeneficiaries', value: "" },
                                              })
                                            }
                                          }}
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
                                            Legal Representative(Your Estate)
                                          </option>
                                          <option value="Reversionary Beneficiary">
                                            Reversionary Beneficiary
                                          </option>
                                        </Field>
                                        <ErrorMessage
                                          component="div"
                                          className="text-danger fw-bold"
                                          name="NomiationTypePensionPartnerBeneficiary"
                                        />
                                    </div>
                                    </div>
                                    {values.NomiationTypePensionPartnerBeneficiary=="Legal Representative(Your Estate)" || 

                                    <div className="row mb-3">

                                      <div className="col-6">
                                        <label
                                          htmlFor="BeneficiariesOptionDetailsBeneficiaries"
                                          className="form-label"
                                        >
                                          How many beneficiaries do you have?
                                        </label>
                                      </div>

                                    <div className="col-6">
                                        <Field
                                          as="select"
                                          id="BeneficiariesOptionDetailsBeneficiaries"
                                          name="BeneficiariesOptionDetailsBeneficiaries"
                                          className="form-select shadow  inputDesign"
                                          onChange={(e) =>
                                            setFieldValue(
                                              "BeneficiariesOptionDetailsBeneficiaries",
                                              e.target.value
                                            )
                                          }
                                          value={
                                            values.BeneficiariesOptionDetailsBeneficiaries
                                          }
                                        >
                                          <option value="Select">Select</option>
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

                                  </div>}

                                  {/* Row 1*/}
                                  {values.BeneficiariesOptionDetailsBeneficiaries >=
                                  1 ? (
                                    <div className="row justify-content-around mt-4 mb-3">
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="BeneficiaryPensionPartner1"
                                            className="form-label"
                                          >
                                            Beneficiary 1
                                          </label>
                                          <Field
                                            className="form-control shadow inputDesign"
                                            id="BeneficiaryPensionPartner1"
                                            name="BeneficiaryPensionPartner1"
                                            placeholder="Beneficiary 1"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="BeneficiaryPensionPartner1"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="ShareofBenefitPensionPartner1"
                                            className="form-label"
                                          >
                                            Share of Benefits %{" "}
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="ShareofBenefitPensionPartner1"
                                            name="ShareofBenefitPensionPartner1"
                                            placeholder="Share of Benefits 1"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="ShareofBenefitPensionPartner1"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="RelationshipOptionDetailsPensionPartner1"
                                            className="form-label"
                                          >
                                            Relationship
                                          </label>
                                          <Field
                                            as="select"
                                            id="RelationshipOptionDetailsPensionPartner1"
                                            name="RelationshipOptionDetailsPensionPartner1"
                                            className="form-select shadow  inputDesign"
                                            //onChange={(e) => setFieldValue("RelationshipOptionDetailsPensionPartner1", e.target.value)}
                                            value={
                                              values.RelationshipOptionDetailsPensionPartner1
                                            }
                                          >
                                            <option value="Select">
                                              Select
                                            </option>
                                            <option value="Spouse">
                                              Spouse
                                            </option>
                                            <option value="Child">Child</option>
                                            <option value="Other">Other</option>
                                            <option value="Interdependency">
                                              Interdependency
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="RelationshipOptionDetailsPensionPartner1"
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
                                            htmlFor="BeneficiaryPensionPartner2"
                                            className="form-label"
                                          >
                                            Beneficiary 2
                                          </label>
                                          <Field
                                            className="form-control shadow inputDesign"
                                            id="BeneficiaryPensionPartner2"
                                            name="BeneficiaryPensionPartner2"
                                            placeholder="Beneficiary 2"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="BeneficiaryPensionPartner2"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="ShareofBenefit2PensionPartner2"
                                            className="form-label"
                                          >
                                            Share of Benefits %{" "}
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="ShareofBenefit2PensionPartner2"
                                            name="ShareofBenefit2PensionPartner2"
                                            placeholder="Share of Benefits 2"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="ShareofBenefit2PensionPartner2"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="RelationshipOptionDetailsPensionPartner2"
                                            className="form-label"
                                          >
                                            Relationship
                                          </label>
                                          <Field
                                            as="select"
                                            id="RelationshipOptionDetailsPensionPartner2"
                                            name="RelationshipOptionDetailsPensionPartner2"
                                            className="form-select shadow  inputDesign"
                                            onChange={(e) =>
                                              setFieldValue(
                                                "RelationshipOptionDetailsPensionPartner2",
                                                e.target.value
                                              )
                                            }
                                            value={
                                              values.RelationshipOptionDetailsPensionPartner2
                                            }
                                          >
                                            <option value="">Select</option>
                                            <option value="Spouse">
                                              Spouse
                                            </option>
                                            <option value="Child">Child</option>
                                            <option value="Other">Other</option>
                                            <option value="Interdependency">
                                              Interdependency
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="RelationshipOptionDetailsPensionPartner2"
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
                                            htmlFor="BeneficiaryPensionPartner3"
                                            className="form-label"
                                          >
                                            Beneficiary 3
                                          </label>
                                          <Field
                                            className="form-control shadow inputDesign"
                                            id="BeneficiaryPensionPartner3"
                                            name="BeneficiaryPensionPartner3"
                                            placeholder="Beneficiary 3"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="BeneficiaryPensionPartner3"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="ShareofBenefitPensionPartner3"
                                            className="form-label"
                                          >
                                            Share of Benefits %{" "}
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="ShareofBenefitPensionPartner3"
                                            name="ShareofBenefitPensionPartner3"
                                            placeholder="Share of Benefits 3"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="ShareofBenefitPensionPartner3"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="RelationshipOptionDetailsPensionPartner3"
                                            className="form-label"
                                          >
                                            Relationship
                                          </label>
                                          <Field
                                            as="select"
                                            id="RelationshipOptionDetailsPensionPartner3"
                                            name="RelationshipOptionDetailsPensionPartner3"
                                            className="form-select shadow  inputDesign"
                                            //onChange={(e) => setFieldValue("RelationshipOptionDetailsPensionPartner3", e.target.value)}
                                            value={
                                              values.RelationshipOptionDetailsPensionPartner3
                                            }
                                          >
                                            <option value="">Select</option>
                                            <option value="Spouse">
                                              Spouse
                                            </option>
                                            <option value="Child">Child</option>
                                            <option value="Other">Other</option>
                                            <option value="Interdependency">
                                              Interdependency
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="RelationshipOptionDetailsPensionPartner3"
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
                                            htmlFor="BeneficiaryPensionPartner4"
                                            className="form-label"
                                          >
                                            Beneficiary 4
                                          </label>
                                          <Field
                                            className="form-control shadow inputDesign"
                                            id="BeneficiaryPensionPartner4"
                                            name="BeneficiaryPensionPartner4"
                                            placeholder="Beneficiary 4"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="BeneficiaryPensionPartner4"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="ShareofBenefitPensionPartner4"
                                            className="form-label"
                                          >
                                            Share of Benefits %{" "}
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="ShareofBenefitPensionPartner4"
                                            name="ShareofBenefitPensionPartner4"
                                            placeholder="Share of Benefits 4"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="ShareofBenefitPensionPartner4"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="RelationshipOptionDetailsPensionPartner4"
                                            className="form-label"
                                          >
                                            Relationship
                                          </label>
                                          <Field
                                            as="select"
                                            id="RelationshipOptionDetailsPensionPartner4"
                                            name="RelationshipOptionDetailsPensionPartner4"
                                            className="form-select shadow  inputDesign"
                                            //onChange={(e) => setFieldValue("RelationshipOptionDetailsPensionPartner4", e.target.value)}
                                            value={
                                              values.RelationshipOptionDetailsPensionPartner4
                                            }
                                          >
                                            <option value="">Select</option>
                                            <option value="Spouse">
                                              Spouse
                                            </option>
                                            <option value="Child">Child</option>
                                            <option value="Other">Other</option>
                                            <option value="Interdependency">
                                              Interdependency
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="RelationshipOptionDetailsPensionPartner4"
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
                                            htmlFor="BeneficiaryPensionPartner5"
                                            className="form-label"
                                          >
                                            Beneficiary 5
                                          </label>
                                          <Field
                                            className="form-control shadow inputDesign"
                                            id="BeneficiaryPensionPartner5"
                                            name="BeneficiaryPensionPartner5"
                                            placeholder="Beneficiary 5"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="BeneficiaryPensionPartner5"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="ShareofBenefitPensionPartner5"
                                            className="form-label"
                                          >
                                            Share of Benefits %
                                          </label>
                                          <Field
                                            type="number"
                                            className="form-control shadow inputDesign"
                                            id="ShareofBenefitPensionPartner5"
                                            name="ShareofBenefitPensionPartner5"
                                            placeholder="Share of Benefits 5"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="ShareofBenefitPensionPartner5"
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-4">
                                        <div className="mb-3">
                                          <label
                                            htmlFor="RelationshipOptionDetailsPensionPartner5"
                                            className="form-label"
                                          >
                                            Relationship
                                          </label>
                                          <Field
                                            as="select"
                                            id="RelationshipOptionDetailsPensionPartner5"
                                            name="RelationshipOptionDetailsPensionPartner5"
                                            className="form-select shadow  inputDesign"
                                            //onChange={(e) => setFieldValue("RelationshipOptionDetailsPensionPartner5", e.target.value)}
                                            value={
                                              values.RelationshipOptionDetailsPensionPartner5
                                            }
                                          >
                                            <option value="">Select</option>
                                            <option value="Spouse">
                                              Spouse
                                            </option>
                                            <option value="Child">Child</option>
                                            <option value="Other">Other</option>
                                            <option value="Interdependency">
                                              Interdependency
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            className="text-danger fw-bold"
                                            name="RelationshipOptionDetailsPensionPartner5"
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
                            </Modal.Body>
                            <Modal.Footer>
                              <div className="col-md-12">
                                <button
                                  className="float-end btn w-25  bgColor modalBtn"
                                  // onClick={handleClose3}
                                  type="submit"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  className="float-end btn w-25  btn-outline  backBtn mx-3"
                                  onClick={handleClosePartnerBeneficiary}
                                >
                                  Cancel
                                </button>
                              </div>
                            </Modal.Footer>
                          </Form>
                        )}
                      </Formik>
                    </Modal>
                    {/* NESTED PARTNER PENSION BENEFICIARY MODAL  */}
                    {/* ---------------------------------------------------- */}
                  </div>
                  {/* Pension Account Details */}

                  {/*PARTNER PENSION ACCOUNT DISPLAY TABLE */}
               {CRObject.AccountBasedPensionIssuesradio == "Yes" &&    <div
                    className="table-responsive my-3"
                    id="PartnerPensionAccountDisplayTable"
                  >
                    <table className="table table-bordered table-hover text-center">
                      <thead className="text-light" id="tableHead">
                        <tr>
                          <th>Fund Name</th>
                          <th>Member #</th>
                          <th>Current Value</th>
                          <th>Original Purchase Price</th>
                          <th>Nominated Beneficiaries</th>
                          <th>Operations</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Pension2PartnerDataList.map((elem, index) => {
                          let {
                            AccountPension_FundName,
                            AccountPension_MemberNO,
                            AccountPension_CurrentBalance,
                            AccountPension_OriginalPrice,
                            AccountPension_LumpsumTaken,
                          } = elem;
                          return (
                            <tr key={index}>
                              <td>{AccountPension_FundName}</td>
                              <td>{AccountPension_MemberNO}</td>
                              <td> {AccountPension_CurrentBalance}</td>
                              <td> {AccountPension_OriginalPrice}</td>
                              <td> {AccountPension_LumpsumTaken}</td>
                              <td>
                                <button
                                  type="button"
                                  onClick={() =>
                                    partnerPensiondeleteHandler(elem)
                                  }
                                  className="btn btn-danger btn-sm"
                                >
                                  delete
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    partnerPensionupdateHandler(elem, index)
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
                  </div>}
                  {/*PARTNER PENSION ACCOUNT DISPLAY TABLE */}

                  {/*PARTNER SUPER ACCOUNT BENFICIARIES  DISPLAY TABLE */}
                 {CRObject.AccountBasedPensionIssuesradio == "Yes" &&  <h3>Partner Benficiaries</h3>}
                {CRObject.AccountBasedPensionIssuesradio == "Yes" &&   <div className="table-responsive my-3">
                    <table className="table table-bordered table-hover text-center">
                      <thead className="text-light" id="tableHead">
                        <tr>
                          <th>No_ofBeneficiaries</th>
                          <th>NominatedBeneficiary</th>
                          <th>NominationType</th>
                          <th>Operations</th>
                        </tr>
                      </thead>
                      <tbody>
                        {PartnerBeneficiaryDataList.map((elem, index) => {
                          return (
                            <tr>
                              <th>{elem.No_ofBeneficiaries}</th>
                              <th>{elem.NominatedBeneficiary}</th>
                              <th>{elem.NominationType}</th>
                              <th>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    PartnerBeneficiaryDataListDeleteHandler(
                                      elem,
                                      index
                                    );
                                  }}
                                  className="btn btn-danger btn-sm"
                                >
                                  delete
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    PartnerBeneficiaryDataListUpdateHandler(
                                      elem,
                                      index
                                    );
                                  }}
                                  className="btn btn-warning btn-sm mx-2"
                                >
                                  update
                                </button>
                              </th>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>}
                  {/*PARTNER SUPER ACCOUNT BENFICIARIES  DISPLAY TABLE */}

                  {/* --------------------------------------------- */}
                  {/* Annuities Details */}
                  <div className="">
{ CRObject.AnnuitiesIssuesradio == "Yes" && <h3 className="my-5">Client Annuities</h3>
}
                    {/* 1 row */}
                      {CRObject.AnnuitiesIssuesradio == "Yes" &&
                    <div className="row">
                       <div className="col-6 mb-3">
                          <label className="form-label">
                            Do you have any Annuities?
                          </label>
                          {/* switch button style */}
                          </div>
                        <div className="col-6 mb-3">
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input
                                type="radio"
                                name="AnnuitiesRadio"
                                id="AnnuitiesRadioopt1"
                                value="Yes"
                                onClick={() => AnnuitiesHandler("Yes")}
                                onChange={handleChange}
                                checked={values.AnnuitiesRadio === "Yes"}
                              />
                              <label
                                htmlFor="AnnuitiesRadioopt1"
                                className="label1"
                              >
                                <span>YES</span>
                              </label>
                              <input
                                type="radio"
                                name="AnnuitiesRadio"
                                id="AnnuitiesRadioopt2"
                                value="No"
                                onClick={() => AnnuitiesHandler("No")}
                                onChange={handleChange}
                                checked={values.AnnuitiesRadio === "No"}
                              />
                              <label
                                htmlFor="AnnuitiesRadioopt2"
                                className="label2"
                              >
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>}
                      {Annuities && (
                        <div className="row">
                        <div className="col-6 mb-3">
                          <label className="form-label">
                            Please enter the details of your Annuities Accounts
                          </label>
                          </div>
                        <div className="col-6 mb-3">

                          <button
                          type="button"
                            className=" btn
                                btn-outline-success "
                            onClick={AnnuitieshandleShow}
                          >
                            <div className="iconContainer mx-1">
                              <img className="img-fluid" src={plus} alt="" />
                            </div>
                            Enter Details
                          </button>
                        </div>
                    </div>
                      )}
                    {/* 1 row */}

                    {/* --------------------------------------------- */}
                    <Modal
                      show={Annuitiesshow}
                      onHide={AnnuitieshandleClose}
                      backdrop="static"
                      className="modal-lg"
                      keyboard={false}
                    >
                      <Modal.Header className="text-light modalBG " closeButton>
                        <Modal.Title className="fontStyle">
                          Annuities Account Details
                          <div className="iconContainerLg">
                            <img className="img-fluid" src={notebook} alt="" />
                          </div>
                        </Modal.Title>
                      </Modal.Header>
                      <Formik
                        initialValues={
                          AnnuitiesDataListEdit
                            ? AnnuitiesDataListObj[0]
                            : InitialValuesMainClientAnnuitiesAccount
                        }
                        validationSchema={
                          clientAnnuitiesAccountMainValidationSchema
                        }
                        onSubmit={ClientAnnuities_onSubmit}
                        enableReinitialize
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
                                  Annuities Accounts
                                </h3>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="Annuities_ProductProvider"
                                        className="form-label"
                                      >
                                        Product Provider
                                      </label>
                                    </div>

                                <div className="col-6">
                                      <Field
                                        as="select"
                                        name="Annuities_ProductProvider"
                                        id="Annuities_ProductProvider"
                                        className="form-select shadow  inputDesign"
                                        value={values.Annuities_ProductProvider}
                                      >
                                        <option value="">Select</option>
                                        <option value="Challenger">
                                          Challenger
                                        </option>
                                        <option value="CommInsure">
                                          CommInsure
                                        </option>
                                        <option value="Other">Other</option>
                                      </Field>
                                      <ErrorMessage
                                        name="Annuities_ProductProvider"
                                        component="div"
                                        className="text-danger fw-bold"
                                      />
                                  </div> 
                                </div>

                                {values.Annuities_ProductProvider ==="Other" && <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="Annuities_Other"
                                        className="form-label"
                                      >
                                        Other
                                      </label>
                                    </div>

                                <div className="col-6">
                                      <Field
                                        type="text"
                                        className="form-control shadow inputDesign"
                                        id="Annuities_Other"
                                        name="Annuities_Other"
                                        placeholder="Other"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Annuities_Other"
                                      />
                                  </div>
                                </div>}

                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="Annuities_InvestmentAmount"
                                        className="form-label"
                                      >
                                        Original Investment Amount
                                      </label>
                                    </div>

                                <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Annuities_InvestmentAmount"
                                        name="Annuities_InvestmentAmount"
                                        placeholder="Original Investment Amount"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Annuities_InvestmentAmount"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="Annuities_CurrentValue"
                                        className="form-label"
                                      >
                                        Current Value
                                      </label>
                                    </div>

                                  <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Annuities_CurrentValue"
                                        name="Annuities_CurrentValue"
                                        placeholder="Current Value"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Annuities_CurrentValue"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="Annuities_AnnuityType"
                                        className="form-label"
                                      >
                                        Annuity Type
                                      </label>
                                    </div>

                                  <div className="col-6">
                                      <Field
                                        as="select"
                                        name="Annuities_AnnuityType"
                                        id="Annuities_AnnuityType"
                                        className="form-select shadow  inputDesign"
                                      >
                                        <option value="">Select</option>
                                        <option value="Short Term">
                                          Short Term
                                        </option>
                                        <option value="Long Term">
                                          Long Term
                                        </option>
                                      </Field>
                                      <ErrorMessage
                                        name="Annuities_AnnuityType"
                                        component="div"
                                        className="text-danger fw-bold"
                                      />
                                  </div>
                                  </div>
                                  <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="Annuities_RCV"
                                        className="form-label"
                                      >
                                        RCV
                                      </label>
                                    </div>

                                  <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Annuities_RCV"
                                        name="Annuities_RCV"
                                        placeholder="RCV"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Annuities_RCV"
                                      />
                                  </div>
                                  </div>
                                  <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="Annuities_Term"
                                        className="form-label"
                                      >
                                        Term
                                      </label>
                                    </div>

                                  <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Annuities_Term"
                                        name="Annuities_Term"
                                        placeholder="Term"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Annuities_Term"
                                      />
                                  </div>
                                  </div>
                                  <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="Annuities_YearsUntilMaturity"
                                        className="form-label"
                                      >
                                        Years Until Maturity
                                      </label>
                                    </div>

                                   <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Annuities_YearsUntilMaturity"
                                        name="Annuities_YearsUntilMaturity"
                                        placeholder="Years Until Maturity"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Annuities_YearsUntilMaturity"
                                      />
                                  </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="Annuities_RegularIncome"
                                        className="form-label"
                                      >
                                        Regular Income Drawn
                                      </label>
                                    </div>

                                 <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Annuities_RegularIncome"
                                        name="Annuities_RegularIncome"
                                        placeholder="Regular Income Drawn"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Annuities_RegularIncome"
                                      />
                                  </div>
                                </div>

                                 <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="Annuities_Frequency"
                                        className="form-label"
                                      >
                                        Frequency
                                      </label>
                                      
                                  </div>

                                   <div className="col-6">
                                      <Field
                                        as="select"
                                        name="Annuities_Frequency"
                                        id="Annuities_Frequency"
                                        className="form-select shadow  inputDesign"
                                      >
                                        <option value="">Select</option>
                                        <option value="Fortnightly">
                                          Fortnightly
                                        </option>
                                        <option value="Monthky">Monthky</option>
                                        <option value="Quarterly">
                                          Quarterly
                                        </option>
                                        <option value="Six Monthly">
                                          Six Monthly
                                        </option>
                                        <option value="Annually">
                                          Annually
                                        </option>
                                      </Field>
                                      <ErrorMessage
                                        name="Annuities_Frequency"
                                        component="div"
                                        className="text-danger fw-bold"
                                      />
                                  </div>
                                </div>

                                <div className="row mb-3">
                                 

                                    <div className="col-6">
                                      <label
                                        htmlFor="Annuities_AnnualInflation"
                                        className="form-label"
                                      >
                                        Annual Inflation Rate
                                      </label>
                                    </div>

                                  <div className="col-6">
                                      <Field
                                        as="select"
                                        name="Annuities_AnnualInflation"
                                        id="Annuities_AnnualInflation"
                                        className="form-select shadow  inputDesign"
                                      >
                                        <option value="">Select</option>
                                        <option value="%0.00">%0.00</option>
                                        <option value="%0.50">%0.50</option>
                                        <option value="%1.00">%1.00</option>
                                        <option value="%1.50">%1.50</option>
                                        <option value="%2.00">%2.00</option>
                                        <option value="%2.50">%2.50</option>
                                        <option value="%3.00">%3.00</option>
                                        <option value="%3.50">%3.50</option>
                                        <option value="%4.00">%4.00</option>
                                        <option value="%4.50">%4.50</option>
                                        <option value="%5.00">%5.00</option>
                                        <option value="%5.50">%5.50</option>
                                        <option value="%6.00">%6.00</option>
                                        <option value="%6.50">%6.50</option>
                                        <option value="%7.00">%7.00</option>
                                        <option value="%7.50">%7.50</option>
                                        <option value="%8.00">%8.00</option>
                                        <option value="%8.50">%8.50</option>
                                        <option value="%9.00">%9.00</option>
                                        <option value="%9.50">%9.50</option>
                                        <option value="%10.00">%10.00</option>
                                      </Field>
                                      <ErrorMessage
                                        name="Annuities_AnnualInflation"
                                        component="div"
                                        className="text-danger fw-bold"
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
                                  onClick={AnnuitieshandleClose}
                                >
                                  Cancel
                                </button>
                              </div>
                            </Modal.Footer>
                          </Form>
                        )}
                      </Formik>
                    </Modal>
                    {/*CLIENT ANNUITIES ACCOUNT DISPLAY TABLE */}
                    {CRObject.AnnuitiesIssuesradio == "Yes" && <div
                      className="table-responsive my-3"
                      id="ClientAnnuitiesAccountDisplayTable"
                    >
                      <table className="table table-bordered table-hover text-center">
                        <thead className="text-light" id="tableHead">
                          <tr>
                            <th>Product Provider</th>
                            <th>Current Value</th>
                            <th>Original Investment</th>
                            <th>Term</th>
                            <th>Income Payment Frequency</th>
                            <th>RCV</th>
                            <th>Operations</th>
                          </tr>
                        </thead>
                        <tbody>
                          {AnnuitiesDataList.map((elem, index) => {
                            let {
                              Annuities_ProductProvider,
                              Annuities_CurrentValue,
                              Annuities_InvestmentAmount,
                              Annuities_Term,
                              Annuities_RegularIncome,
                              Annuities_RCV,
                            } = elem;
                            return (
                              <tr key={index}>
                                <td>{Annuities_ProductProvider}</td>
                                <td>{Annuities_CurrentValue}</td>
                                <td> {Annuities_InvestmentAmount}</td>
                                <td> {Annuities_Term}</td>
                                <td> {Annuities_RegularIncome}</td>
                                <td> {Annuities_RCV}</td>
                                <td>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      clientAnnuitiesdeleteHandler(elem)
                                    }
                                    className="btn btn-danger btn-sm"
                                  >
                                    delete
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      clientAnnuitiesupdateHandler(elem)
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
                    </div>}
                    {/*CLIENT ANNUTIES ACCOUNT DISPLAY TABLE */}
                    {/* ---------------------------------------------------- */}

                    {/* ---------------------------------------------------- */}

                  {CRObject.AnnuitiesIssuesradio == "Yes" &&  <h3 className="">Partner Annuities</h3>}

                    {/* 1 row */}
                     {CRObject.AnnuitiesIssuesradio == "Yes" && 
                       <div className="row">
                     <div className="col-6 mb-3">
                          <label className="form-label">
                            Do you have any Annuities?
                          </label>
                          </div>
                        <div className="col-6 mb-3">
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input
                                type="radio"
                                name="Annuities2Radio"
                                id="Annuities2Radioopt1"
                                value="Yes"
                                onClick={() => Annuities2Handler("Yes")}
                                onChange={handleChange}
                                checked={values.Annuities2Radio === "Yes"}
                              />
                              <label
                                htmlFor="Annuities2Radioopt1"
                                className="label1"
                              >
                                <span>YES</span>
                              </label>
                              <input
                                type="radio"
                                name="Annuities2Radio"
                                id="Annuities2Radioopt2"
                                value="No"
                                onClick={() => Annuities2Handler("No")}
                                onChange={handleChange}
                                checked={values.Annuities2Radio === "No"}
                              />
                              <label
                                htmlFor="Annuities2Radioopt2"
                                className="label2"
                              >
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>}
                      {Annuities2 && (
                        <div className="row">
                        <div className="col-6 mb-3">
                          <label className="form-label">
                            Please enter the details of your Annuities Accounts
                          </label>
                        
                        </div>
                        <div className="col-6 mb-3">
                          <button
                          type="button"
                            className=" btn 
                                btn-outline-success "
                            onClick={Annuities2handleShow}
                          >
                            <div className="iconContainer mx-1">
                              <img className="img-fluid" src={plus} alt="" />
                            </div>
                            Enter Details
                          </button>
                        </div>
                          </div>
                      )}
                    {/* 1 row */}

                    {/* --------------------------------------------- */}

                    <Modal
                      show={Annuities2show}
                      onHide={Annuities2handleClose}
                      backdrop="static"
                      className="modal-lg"
                      keyboard={false}
                    >
                      <Modal.Header className="text-light modalBG " closeButton>
                        <Modal.Title className="fontStyle">
                          Annuities Account Details
                          <div className="iconContainerLg">
                            <img className="img-fluid" src={notebook} alt="" />
                          </div>
                        </Modal.Title>
                      </Modal.Header>
                      <Formik
                        initialValues={
                          AnnuitiesData2ListEdit
                            ? AnnuitiesData2ListObj[0]
                            : InitialValuesMainPartnerAnnuitiesAccount
                        }
                        validationSchema={
                          partnerAnnuitiesAccountMainValidationSchema
                        }
                        onSubmit={PartnerAnnuities_onSubmit}
                        enableReinitialize
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
                                  Annuities Accounts
                                </h3>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="Annuities_ProductProvider"
                                        className="form-label"
                                      >
                                        Product Provider partner
                                      </label>
                                    </div>

                                  <div className="col-6">
                                      <Field
                                        as="select"
                                        name="Annuities_ProductProvider"
                                        id="Annuities_ProductProvider"
                                        className="form-select shadow  inputDesign"
                                      >
                                        <option value="">Select</option>
                                        <option value="Challenger">
                                          Challenger
                                        </option>
                                        <option value="CommInsure">
                                          CommInsure
                                        </option>
                                        <option value="Other">Other</option>
                                      </Field>
                                      <ErrorMessage
                                        name="Annuities_ProductProvider"
                                        component="div"
                                        className="text-danger fw-bold"
                                      />
                                  </div>
                                </div>
                                {values.Annuities_ProductProvider==="Other" &&
                                <div className="row mb-3">
                                 
                                    <div className="col-6">
                                      <label
                                        htmlFor="Annuities_Other"
                                        className="form-label"
                                      >
                                        Other
                                      </label>
                                    </div>

                                  <div className="col-6">
                                      <Field
                                        type="text"
                                        className="form-control shadow inputDesign"
                                        id="Annuities_Other"
                                        name="Annuities_Other"
                                        placeholder="Annuities_Other"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Annuities_Other"
                                      />
                                  </div>
                                </div>
                                }
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="Annuities_InvestmentAmount"
                                        className="form-label"
                                      >
                                        Original Investment Amount
                                      </label>
                                    </div>

                                 <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Annuities_InvestmentAmount"
                                        name="Annuities_InvestmentAmount"
                                        placeholder="Original Investment Amount"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Annuities_InvestmentAmount"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="Annuities_CurrentValue"
                                        className="form-label"
                                      >
                                        Current Value
                                      </label>
                                    </div>

                                 <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Annuities_CurrentValue"
                                        name="Annuities_CurrentValue"
                                        placeholder="Current Value"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Annuities_CurrentValue"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="Annuities_AnnuityType"
                                        className="form-label"
                                      >
                                        Annuity Type
                                      </label>
                                    </div>

                                 <div className="col-6">
                                      <Field
                                        as="select"
                                        name="Annuities_AnnuityType"
                                        id="Annuities_AnnuityType"
                                        className="form-select shadow  inputDesign"
                                      >
                                        <option value="">Select</option>
                                        <option value="Short Term">
                                          Short Term
                                        </option>
                                        <option value="Long Term">
                                          Long Term
                                        </option>
                                      </Field>
                                      <ErrorMessage
                                        name="Annuities_AnnuityType"
                                        component="div"
                                        className="text-danger fw-bold"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="Annuities_RCV"
                                        className="form-label"
                                      >
                                        RCV
                                      </label>
                                    </div>

                                   <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Annuities_RCV"
                                        name="Annuities_RCV"
                                        placeholder="RCV"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Annuities_RCV"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="Annuities_Term"
                                        className="form-label"
                                      >
                                        Term
                                      </label>
                                    </div>

                                 <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Annuities_Term"
                                        name="Annuities_Term"
                                        placeholder="Term"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Annuities_Term"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="Annuities_YearsUntilMaturity"
                                        className="form-label"
                                      >
                                        Years Until Maturity
                                      </label>
                                    </div>

                                   <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Annuities_YearsUntilMaturity"
                                        name="Annuities_YearsUntilMaturity"
                                        placeholder="Years Until Maturity"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Annuities_YearsUntilMaturity"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="Annuities_RegularIncome"
                                        className="form-label"
                                      >
                                        Regular Income Drawn
                                      </label>
                                    </div>

                                 <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="Annuities_RegularIncome"
                                        name="Annuities_RegularIncome"
                                        placeholder="Regular Income Drawn"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="Annuities_RegularIncome"
                                      />
                                  </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="Annuities_Frequency"
                                        className="form-label"
                                      >
                                        Frequency
                                      </label>
                                    </div>

                                <div className="col-6">
                                      <Field
                                        as="select"
                                        name="Annuities_Frequency"
                                        id="Annuities_Frequency"
                                        className="form-select shadow  inputDesign"
                                      >
                                        <option value="">Select</option>
                                        <option value="Fortnightly">
                                          Fortnightly
                                        </option>
                                        <option value="Monthky">Monthky</option>
                                        <option value="Quarterly">
                                          Quarterly
                                        </option>
                                        <option value="Six Monthly">
                                          Six Monthly
                                        </option>
                                        <option value="Annually">
                                          Annually
                                        </option>
                                      </Field>
                                      <ErrorMessage
                                        name="Annuities_Frequency"
                                        component="div"
                                        className="text-danger fw-bold"
                                      />
                                  </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="Annuities_AnnualInflation"
                                        className="form-label"
                                      >
                                        Annual Inflation Rate
                                      </label>
                                    </div>

                                  <div className="col-6">
                                      <Field
                                        as="select"
                                        name="Annuities_AnnualInflation"
                                        id="Annuities_AnnualInflation"
                                        className="form-select shadow  inputDesign"
                                      >
                                        <option value="">Select</option>
                                        <option value="%0.00">%0.00</option>
                                        <option value="%0.50">%0.50</option>
                                        <option value="%1.00">%1.00</option>
                                        <option value="%1.50">%1.50</option>
                                        <option value="%2.00">%2.00</option>
                                        <option value="%2.50">%2.50</option>
                                        <option value="%3.00">%3.00</option>
                                        <option value="%3.50">%3.50</option>
                                        <option value="%4.00">%4.00</option>
                                        <option value="%4.50">%4.50</option>
                                        <option value="%5.00">%5.00</option>
                                        <option value="%5.50">%5.50</option>
                                        <option value="%6.00">%6.00</option>
                                        <option value="%6.50">%6.50</option>
                                        <option value="%7.00">%7.00</option>
                                        <option value="%7.50">%7.50</option>
                                        <option value="%8.00">%8.00</option>
                                        <option value="%8.50">%8.50</option>
                                        <option value="%9.00">%9.00</option>
                                        <option value="%9.50">%9.50</option>
                                        <option value="%10.00">%10.00</option>
                                      </Field>
                                      <ErrorMessage
                                        name="Annuities_AnnualInflation"
                                        component="div"
                                        className="text-danger fw-bold"
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
                                  onClick={Annuities2handleClose}
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
                  </div>
                  {/* Annuities Details */}
                  {/*PARTNER ANNUITIES ACCOUNT DISPLAY TABLE */}
                  {CRObject.AnnuitiesIssuesradio == "Yes" &&<div
                    className="table-responsive my-3"
                    id="PartnerAnnuitiesAccountDisplayTable"
                  >
                    <table className="table table-bordered table-hover text-center">
                      <thead className="text-light" id="tableHead">
                        <tr>
                          <th>Product Provider</th>
                          <th>Current Value</th>
                          <th>Original Investment</th>
                          <th>Term</th>
                          <th>Income Payment Frequency</th>
                          <th>RCV</th>
                          <th>Operations</th>
                        </tr>
                      </thead>
                      <tbody>
                        {AnnuitiesData2List.map((elem, index) => {
                          let {
                            Annuities_ProductProvider,
                            Annuities_CurrentValue,
                            Annuities_InvestmentAmount,
                            Annuities_Term,
                            Annuities_RegularIncome,
                            Annuities_RCV,
                          } = elem;
                          return (
                            <tr key={index}>
                              <td>{Annuities_ProductProvider}</td>
                              <td>{Annuities_CurrentValue}</td>
                              <td> {Annuities_InvestmentAmount}</td>
                              <td> {Annuities_Term}</td>
                              <td> {Annuities_RegularIncome}</td>
                              <td> {Annuities_RCV}</td>
                              <td>
                                <button
                                  type="button"
                                  onClick={() =>
                                    partnerAnnuitiesdeleteHandler(elem)
                                  }
                                  className="btn btn-danger btn-sm"
                                >
                                  delete
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    partnerAnnuitiesupdateHandler(elem)
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
                  </div>}
                  {/*PARTNER ANNUTIES ACCOUNT DISPLAY TABLE */}

                  {/* Lifetime Pension Details */}
                  <div className="">
                    <h3 className="">Client Lifetime Pension</h3>

                    {/* 1 row */}
                    <div className="row">
                      <div className="col-6 mb-3">
                          <label className="form-label">
                            Do you have any Lifetime Pension?
                          </label>
                          </div>
                        <div className="col-6 mb-3">
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input
                                type="radio"
                                name="LifetimePensionRadio"
                                id="LifetimePensionRadioopt1"
                                value="Yes"
                                onClick={() => LifetimePensionHandler("Yes")}
                                onChange={handleChange}
                                checked={values.LifetimePensionRadio === "Yes"}
                              />
                              <label
                                htmlFor="LifetimePensionRadioopt1"
                                className="label1"
                              >
                                <span>YES</span>
                              </label>
                              <input
                                type="radio"
                                name="LifetimePensionRadio"
                                id="LifetimePensionRadioopt2"
                                value="No"
                                onClick={() => LifetimePensionHandler("No")}
                                onChange={handleChange}
                                checked={values.LifetimePensionRadio === "No"}
                              />
                              <label
                                htmlFor="LifetimePensionRadioopt2"
                                className="label2"
                              >
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      {LifetimePension && (
                        <div className="row">
                          <div className="col-6 mb-3">
                          <label className="form-label">
                            Please enter the details of your Lifetime Pension
                            Accounts
                          </label>
                          <br />
                          </div>
                          <div className="col-6 mb-3">
                          <button
                            type="button"
                            className=" btn
                                btn-outline-success "
                            onClick={LifetimePensionhandleShow}
                          >
                            <div className="iconContainer mx-1">
                              <img className="img-fluid" src={plus} alt="" />
                            </div>
                            Enter Details
                          </button>
                        </div>
                    </div>
                      )}
                    {/* 1 row */}

                    {/* --------------------------------------------- */}

                    <Modal
                      show={LifetimePensionshow}
                      onHide={LifetimePensionhandleClose}
                      backdrop="static"
                      className="modal-lg"
                      keyboard={false}
                    >
                      <Modal.Header className="text-light modalBG " closeButton>
                        <Modal.Title className="fontStyle">
                          Lifetime Pension Account Details
                          <div className="iconContainerLg">
                            <img className="img-fluid" src={notebook} alt="" />
                          </div>
                        </Modal.Title>
                      </Modal.Header>
                      <Formik
                        initialValues={
                          ClientLifetimePensionUpdateFlag
                            ? ClientLifetimePensionObj[0]
                            : InitialValuesMainClientLifetimePensionAccount
                        }
                        validationSchema={
                          clientLifetimePensionAccountMainValidationSchema
                        }
                        onSubmit={ClientLifetimePension_onSubmit}
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
                                  Lifetime Pension Accounts
                                </h3>

                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="LifetimeAccountPension_FundName"
                                        className="form-label"
                                      >
                                        Fund Name
                                      </label>
                                    </div>

                                <div className="col-6">
                                      <Field
                                        type="text"
                                        className="form-control shadow inputDesign"
                                        id="LifetimeAccountPension_FundName"
                                        name="LifetimeAccountPension_FundName"
                                        placeholder="Fund Name"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="LifetimeAccountPension_FundName"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="LifetimePensionIncomeDrawn"
                                        className="form-label"
                                      >
                                        Regular Income Drawn
                                      </label>
                                    </div>

                                <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="LifetimePensionIncomeDrawn"
                                        name="LifetimePensionIncomeDrawn"
                                        placeholder="Regular Income Drawn"
                                        // value={values.LifetimePensionIncomeDrawn}
                                    
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="LifetimePensionIncomeDrawn"
                                      />
                                  </div> 
                                </div>
                                <div className="row mb-3">
                                      
                                    <div className="col-6">
                                      <label
                                        htmlFor="LifetimeAccountPension_Frequency"
                                        className="form-label"
                                      >
                                        Frequency
                                      </label>
                                    </div>

                                <div className="col-6">
                                      <Field
                                        as="select"
                                        name="LifetimeAccountPension_Frequency"
                                        id="LifetimeAccountPension_Frequency"
                                        className="form-select shadow  inputDesign"
                                      >
                                        <option value="">Select</option>
                                        <option value="Fortnightly">
                                          Fortnightly
                                        </option>
                                        <option value="Monthky">Monthky</option>
                                        <option value="Quarterly">
                                          Quarterly
                                        </option>
                                        <option value="Six Monthly">
                                          Six Monthly
                                        </option>
                                        <option value="Annually">
                                          Annually
                                        </option>
                                      </Field>
                                      <ErrorMessage
                                        name="LifetimeAccountPension_Frequency"
                                        component="div"
                                        className="text-danger fw-bold"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="LifetimeAccountPension_DeductibleAmount"
                                        className="form-label"
                                      >
                                        Deductible Amount
                                      </label>
                                    </div>

                                <div className="col-md-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="LifetimeAccountPension_DeductibleAmount"
                                        name="LifetimeAccountPension_DeductibleAmount"
                                        placeholder="Deductible Amount"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="LifetimeAccountPension_DeductibleAmount"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label className="form-label">
                                        Is this Pension Tax-Free?
                                      </label>
                                      </div>

                                <div className="col-6">
                                      {/* switch button style */}
                                      <div className="form-check form-switch m-0 p-0 ">
                                        <div className="radiobutton">
                                          <input
                                            type="radio"
                                            name="LifetimeAccountPension_TaxFree"
                                            id="LifetimePensionopt1"
                                            value="Yes"
                                            onChange={handleChange}
                                            checked={
                                              values.LifetimeAccountPension_TaxFree ==="Yes"
                                            }
                                          />
                                          <label
                                            htmlFor="LifetimePensionopt1"
                                            className="label1"
                                          >
                                            <span>YES</span>
                                          </label>
                                          <input
                                            type="radio"
                                            name="LifetimeAccountPension_TaxFree"
                                            id="LifetimePensionopt2"
                                            value="No"
                                            onChange={handleChange}
                                            checked={
                                              values.LifetimeAccountPension_TaxFree ===
                                              "No"
                                            }
                                          />
                                          <label
                                            htmlFor="LifetimePensionopt2"
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
                                        htmlFor="LifetimePensionTaxableAmount"
                                        className="form-label"
                                      >
                                        Taxable Pension Amount
                                      </label>
                                    </div>

                                  <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="LifetimePensionTaxableAmount"
                                        name="LifetimePensionTaxableAmount"
                                        placeholder="Taxable Pension Amount"
                                        value={values.LifetimeAccountPension_TaxFree==="Yes" ? values.LifetimePensionIncomeDrawn : values.LifetimePensionTaxableAmount }
                                        
                                        
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="LifetimePensionTaxableAmount"
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
                                  onClick={LifetimePensionhandleClose}
                                >
                                  Cancel
                                </button>
                              </div>
                            </Modal.Footer>
                          </Form>
                        )}
                      </Formik>
                    </Modal>
                    {/*CLIENT LIFETIME PENSION DISPLAY TABLE */}
                    <div
                      className="table-responsive my-3"
                      id="ClientLifetimePension"
                    >
                      <table className="table table-bordered table-hover text-center">
                        <thead className="text-light" id="tableHead">
                          <tr>
                            <th>Member Name</th>
                            <th>Pension Payment Frequency</th>
                            <th>Original Investment</th>
                            <th>Deductable Amount</th>
                            <th>Taxable Pension Amount</th>
                            <th>Operations</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ClientLifetimePension.map((elem, index) => {
                            let {
                              InvestmentOptionDetailsInvestment,
                              InvestmentOptionDetailsCurrentValue,
                            } = elem;
                            return (
                              <tr>
                                <td>{elem.LifePension_FundName}</td>
                                <td>{elem.LifePension_RegularIncome}</td>
                                <td>{elem.LifePension_Frequency}</td>
                                <td>{elem.LifePension_DeductibleAmount}</td>
                                <td>{elem.LifePension_TaxFree_Pension}</td>
                                <td>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      ClientLifetimePensionDeleteHandler(
                                        elem,
                                        index
                                      );
                                    }}
                                    className="btn btn-danger btn-sm"
                                  >
                                    {" "}
                                    delete{" "}
                                  </button>

                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      ClientLifetimePensionUpdateHandler(
                                        elem,
                                        index
                                      );
                                    }}
                                    className="btn btn-warning btn-sm mx-2"
                                  >
                                    {" "}
                                    update{" "}
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    {/*CLIENT LIFETIME PENSION DISPLAY TABLE */}

                    {/* ---------------------------------------------------- */}
                    <h3 className="">Partner Lifetime Pension</h3>

                    {/* 1 row */}
                    <div className="row">
                      <div className="col-6 mb-3">
                          <label className="form-label">
                            Do you have any Lifetime Pension?
                          </label>
                          </div>
                        <div className="col-6 mb-3">
                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input
                                type="radio"
                                name="LifetimePension2Radio"
                                id="LifetimePension2Radioopt1"
                                value="Yes"
                                onClick={() => LifetimePension2Handler("Yes")}
                                onChange={handleChange}
                                checked={values.LifetimePension2Radio === "Yes"}
                              />
                              <label
                                htmlFor="LifetimePension2Radioopt1"
                                className="label1"
                              >
                                <span>YES</span>
                              </label>
                              <input
                                type="radio"
                                name="LifetimePension2Radio"
                                id="LifetimePension2Radioopt2"
                                value="No"
                                onClick={() => LifetimePension2Handler("No")}
                                onChange={handleChange}
                                checked={values.LifetimePension2Radio === "No"}
                              />
                              <label
                                htmlFor="LifetimePension2Radioopt2"
                                className="label2"
                              >
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      {LifetimePension2 && (
                        <div className="row">
                        <div className="col-6 mb-3">
                          <label className="form-label">
                            Please enter the details of your Lifetime Pension
                            Accounts
                          </label>
                          </div>
                        <div className="col-6 mb-3">

                          <button
                          type="button"
                            className=" btn 
                                btn-outline-success "
                            onClick={LifetimePension2handleShow}
                          >
                            <div className="iconContainer mx-1">
                              <img className="img-fluid" src={plus} alt="" />
                            </div>
                            Enter Details
                          </button>
                        </div>
                    </div>
                      )}
                    {/* 1 row */}

                    {/* --------------------------------------------- */}

                    <Modal
                      show={LifetimePension2show}
                      onHide={LifetimePension2handleClose}
                      backdrop="static"
                      className="modal-lg"
                      keyboard={false}
                    >
                      <Modal.Header className="text-light modalBG " closeButton>
                        <Modal.Title className="fontStyle">
                          Lifetime Pension Account Details
                          <div className="iconContainerLg">
                            <img className="img-fluid" src={notebook} alt="" />
                          </div>
                        </Modal.Title>
                      </Modal.Header>
                      <Formik
                        initialValues={
                          PartnerLifetimePensionUpdateFlag
                            ? PartnerLifetimePensionObj[0]
                            : InitialValuesMainPartnerLifetimePensionAccount
                        }
                        validationSchema={
                          partnerLifetimePensionAccountMainValidationSchema
                        }
                        onSubmit={PartnerLifetimePension_onSubmit}
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
                                  Lifetime Pension Accounts
                                </h3>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="LifetimeAccountPension_FundName"
                                        className="form-label"
                                      >
                                        Fund Name
                                      </label>
                                    </div>

                                <div className="col-6">
                                      <Field
                                        type="text"
                                        className="form-control shadow inputDesign"
                                        id="LifetimeAccountPension_FundName"
                                        name="LifetimeAccountPension_FundName"
                                        placeholder="Fund Name"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="LifetimeAccountPension_FundName"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="LifetimePension2IncomeDrawn"
                                        className="form-label"
                                      >
                                        Regular Income Drawn
                                      </label>
                                    </div>

                                <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="LifetimePension2IncomeDrawn"
                                        name="LifetimePension2IncomeDrawn"
                                        placeholder="Regular Income Drawn"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="LifetimePension2IncomeDrawn"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="LifetimeAccountPension_Frequency"
                                        className="form-label"
                                      >
                                        Frequency
                                      </label>
                                    </div>

                                <div className="col-6">
                                      <Field
                                        as="select"
                                        name="LifetimeAccountPension_Frequency"
                                        id="LifetimeAccountPension_Frequency"
                                        className="form-select shadow  inputDesign"
                                      >
                                        <option value="">Select</option>
                                        <option value="Fortnightly">
                                          Fortnightly
                                        </option>
                                        <option value="Monthky">Monthky</option>
                                        <option value="Quarterly">
                                          Quarterly
                                        </option>
                                        <option value="Six Monthly">
                                          Six Monthly
                                        </option>
                                        <option value="Annually">
                                          Annually
                                        </option>
                                      </Field>
                                      <ErrorMessage
                                        name="LifetimeAccountPension_Frequency"
                                        component="div"
                                        className="text-danger fw-bold"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label
                                        htmlFor="LifetimeAccountPension_DeductibleAmount"
                                        className="form-label"
                                      >
                                        Deductible Amount
                                      </label>
                                    </div>

                                <div className="col-6">
                                      <Field
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="LifetimeAccountPension_DeductibleAmount"
                                        name="LifetimeAccountPension_DeductibleAmount"
                                        placeholder="Deductible Amount"
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="LifetimeAccountPension_DeductibleAmount"
                                      />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                      <label className="form-label">
                                        Is this Pension Tax-Free?
                                      </label>
                                    </div>

                                <div className="col-6">
                                      {/* switch button style */}
                                      <div className="form-check form-switch m-0 p-0 ">
                                        <div className="radiobutton">
                                          <input
                                            type="radio"
                                            name="LifetimeAccountPension_TaxFree"
                                            id="LifetimePension2opt1"
                                            value="Yes"
                                            onChange={handleChange}
                                            checked={
                                              values.LifetimeAccountPension_TaxFree ===
                                              "Yes"
                                            }
                                          />
                                          <label
                                            htmlFor="LifetimePension2opt1"
                                            className="label1"
                                          >
                                            <span>YES</span>
                                          </label>
                                          <input
                                            type="radio"
                                            name="LifetimeAccountPension_TaxFree"
                                            id="LifetimePension2opt2"
                                            value="No"
                                            onChange={handleChange}
                                            checked={
                                              values.LifetimeAccountPension_TaxFree ===
                                              "No"
                                            }
                                          />
                                          <label
                                            htmlFor="LifetimePension2opt2"
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
                                        htmlFor="LifetimePension2TaxableAmount"
                                        className="form-label"
                                      >
                                        Taxable Pension Amount
                                      </label>
                                    </div>

                                  <div className="col-6">
                                      <Field 
                                        type="number"
                                        className="form-control shadow inputDesign"
                                        id="LifetimePension2TaxableAmount"
                                        name="LifetimePension2TaxableAmount"
                                        placeholder="Taxable Pension Amount"
                                        value={values.LifetimeAccountPension_TaxFree==="Yes" ? values.LifetimePension2IncomeDrawn : values.LifetimePension2TaxableAmount }
                                        
                                      />
                                      <ErrorMessage
                                        component="div"
                                        className="text-danger fw-bold"
                                        name="LifetimePension2TaxableAmount"
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
                                  onClick={LifetimePension2handleClose}
                                >
                                  Cancel
                                </button>
                              </div>
                            </Modal.Footer>
                          </Form>
                        )}
                      </Formik>
                    </Modal>
                    {/*PARTNER LIFETIME PENSION DISPLAY TABLE */}
                    <div
                      className="table-responsive my-3"
                      id="PartnerLifetimePension"
                    >
                      <table className="table table-bordered table-hover text-center">
                        <thead className="text-light" id="tableHead">
                          <tr>
                            <th>Member Name</th>
                            <th>Pension Payment Frequency</th>
                            <th>Original Investment</th>
                            <th>Deductable Amount</th>
                            <th>Taxable Pension Amount</th>
                            <th>Operations</th>
                          </tr>
                        </thead>
                        <tbody>
                          {PartnerLifetimePension.map((elem, index) => {
                            return (
                              <tr>
                                <td>{elem.LifePension_FundName}</td>
                                <td>{elem.LifePension_RegularIncome}</td>
                                <td>{elem.LifePension_Frequency}</td>
                                <td>{elem.LifePension_DeductibleAmount}</td>
                                <td>{elem.LifePension_TaxFree_Pension}</td>
                                <td>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      PartnerLifetimePensionDeleteHandler(
                                        elem,
                                        index
                                      );
                                    }}
                                    className="btn btn-danger btn-sm"
                                  >
                                    {" "}
                                    delete{" "}
                                  </button>

                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      PartnerLifetimePensionUpdateHandler(
                                        elem,
                                        index
                                      );
                                    }}
                                    className="btn btn-warning btn-sm mx-2"
                                  >
                                    {" "}
                                    update{" "}
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    {/*PARTNER LIFETIME PENSION DISPLAY TABLE */}
                    {/* ---------------------------------------------------- */}
                  </div>
                  {/* Lifetime Pension Details */}

                  <div className="row mt-5 mb-3">
                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="float-end btn w-25  bgColor modalBtn"
                      >
                        Next
                      </button>
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

export default SuperRetriement;
