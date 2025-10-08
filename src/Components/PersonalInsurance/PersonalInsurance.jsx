import { React, useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import notsmoking from "./images/no-smoking.svg";
import notebook from "./images/notebook.svg";
import smoking from "./images/smoking.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import plus from "./images/plus.svg";

import { Card, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { CRState, StepState, defaultUrl } from "../../Store/Store";

function PersonalInsurance() {

  let DefaultUrl = useRecoilValue(defaultUrl)

  let [CRObject, setCRObject] = useRecoilState(CRState); // eslint-disable-line no-unused-vars
  //Recoil Step State For First Route When User Login
  let [Steps, setSteps] = useRecoilState(StepState); // eslint-disable-line no-unused-vars

  //Array States to Store Data Temporarily
  //Client Arrays

  const [isClientListLifeTPD, setIsClientListLifeTPD] = useState([]);
  const [isClientListIncomeProtection, setIsClientListIncomeProtection] =
    useState([]);

  //Client Arrays
  //Partner Arrays

  const [isPartnerListLifeTPD, setIsPartnerListLifeTPD] = useState([]);
  const [isPartnerListIncomeProtection, setIsPartnerListIncomeProtection] =
    useState([]);

  //Partner Arrays
  // two states for Changing Modal Number
  const [isClientNumber, setIsClientNumber] = useState(1);
  const [isClientNumber2, setIsClientNumber2] = useState(1);

  const [isPartnerNumber, setIsPartnerNumber] = useState(1);
  const [isPartnerNumber2, setIsPartnerNumber2] = useState(1);
  // two states for Changing Modal Number

  //Flags
  const [ClientLifeTPDUpdateFlag, setClientLifeTPDUpdateFlag] = useState(false);
  const [ClientListLifeTPDTOUpdate, setClientListLifeTPDTOUpdate] = useState(
    []
  );

  const [
    ClientIncomeProtectionUpdateFlag,
    setClientIncomeProtectionUpdateFlag,
  ] = useState(false);
  const [
    ClientListIncomeProtectionUpdate,
    setClientListIncomeProtectionUpdate,
  ] = useState([]);

  const [PartnerLifeTPDUpdateFlag, setPartnerLifeTPDUpdateFlag] =
    useState(false);
  const [PartnerListLifeTPDTOUpdate, setPartnerListLifeTPDTOUpdate] = useState(
    []
  );

  const [
    PartnerIncomeProtectionUpdateFlag,
    setPartnerIncomeProtectionUpdateFlag,
  ] = useState(false);
  const [
    PartnerListIncomeProtectionUpdate,
    setPartnerListIncomeProtectionUpdate,
  ] = useState([]);

  let partner = localStorage.getItem("partner");
  const [isPartnered, setIsPartnered] = useState();

  useEffect(() => {
    if (partner === "true") {
      setIsPartnered(true);
    } else {
      setIsPartnered(false);
    }

    setIsClientListLifeTPD((prevState) =>
      [...prevState].sort((a, b) =>
        a.Life_PolicyID > b.Life_PolicyID ? 1 : -1
      )
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [BenefitClaimed, setBenefitClaimed] = useState(false);
  let BenefitHandler = (e) => {
    if (e === "no") {
      setBenefitClaimed(false);
    } else {
      setBenefitClaimed(true);
    }
  };
  const [BenefitClaimed2, setBenefitClaimed2] = useState(false);
  let Benefit2Handler = (e) => {
    if (e === "no") {
      setBenefitClaimed2(false);
    } else {
      setBenefitClaimed2(true);
    }
  };

  const [ApplicationInsurance, setApplicationInsurance] = useState(false);
  let ApplicationInsuranceHandler = (e) => {
    if (e === "no") {
      setApplicationInsurance(false);
    } else {
      setApplicationInsurance(true);
    }
  };
  const [ApplicationInsurance2, setApplicationInsurance2] = useState(false);
  let ApplicationInsurance2Handler = (e) => {
    if (e === "no") {
      setApplicationInsurance2(false);
    } else {
      setApplicationInsurance2(true);
    }
  };

  const [ImpedimentReason, setImpedimentReason] = useState(false);
  let ImpedimentReasonHandler = (e) => {
    if (e === "no") {
      setImpedimentReason(false);
    } else {
      setImpedimentReason(true);
    }
  };
  const [ImpedimentReason2, setImpedimentReason2] = useState(false);
  let ImpedimentReason2Handler = (e) => {
    if (e === "no") {
      setImpedimentReason2(false);
    } else {
      setImpedimentReason2(true);
    }
  };

  const [PersonalInsuranceCover, setPersonalInsuranceCover] = useState(false);
  const [PersonalInsuranceCovershow, setPersonalInsuranceCoverShow] =
    useState(false);
  const PersonalInsuranceCoverhandleClose = () => {
    setPersonalInsuranceCoverShow(false);
    setClientLifeTPDUpdateFlag(false);
  };
  const PersonalInsuranceCoverhandleShow = () =>
    setPersonalInsuranceCoverShow(true);
  let PersonalInsuranceCoverHandler = (elem) => {
    if (elem === "No") {
      setPersonalInsuranceCover(false);
    } else {
      setPersonalInsuranceCover(true);
    }
  };

  const [Partner_PersonalInsuranceCover, setPartner_PersonalInsuranceCover] =
    useState(false);
  const [
    Partner_PersonalInsuranceCovershow,
    setPartner_PersonalInsuranceCoverShow,
  ] = useState(false);
  const Partner_PersonalInsuranceCoverhandleClose = () => {
    setPartner_PersonalInsuranceCoverShow(false);
    setPartnerLifeTPDUpdateFlag(false);
  };
  const Partner_PersonalInsuranceCoverhandleShow = () =>
    setPartner_PersonalInsuranceCoverShow(true);
  let Partner_PersonalInsuranceCoverHandler = (elem) => {
    if (elem === "No") {
      setPartner_PersonalInsuranceCover(false);
    } else {
      setPartner_PersonalInsuranceCover(true);
    }
  };

  const [PersonalInsuranceCovershow2, setPersonalInsuranceCoverShow2] =
    useState(false);
  const PersonalInsuranceCover2handleClose = () => {
    setPersonalInsuranceCoverShow2(false);
    setClientIncomeProtectionUpdateFlag(false);
  };
  const PersonalInsuranceCover2handleShow = () =>
    setPersonalInsuranceCoverShow2(true);

  const [
    Partner_PersonalInsuranceCovershow2,
    setPartner_PersonalInsuranceCoverShow2,
  ] = useState(false);
  const Partner_PersonalInsuranceCover2handleClose = () => {
    setPartner_PersonalInsuranceCoverShow2(false);
    setPartnerIncomeProtectionUpdateFlag(false);
  };
  const Partner_PersonalInsuranceCover2handleShow = () =>
    setPartner_PersonalInsuranceCoverShow2(true);

  const [clientSmoker, setClientSmoker] = useState(true);
  const [clientSmoker_Life, setClientSmoker_Life] = useState(true); // eslint-disable-line no-unused-vars

  let smokerHandler = (elem) => {
    if (elem === "smoker") {
      // notSmokingID
      document.getElementById("YesSmokerID").classList.add("selectedimage");
      document.getElementById("notSmokingID").classList.add("notSelectedimage");
      document.getElementById("notSmokingID").classList.remove("selectedimage");
      setClientSmoker(true);
    } else {
      document.getElementById("notSmokingID").classList.add("selectedimage");
      document.getElementById("YesSmokerID").classList.remove("selectedimage");
      document.getElementById("YesSmokerID").classList.add("notSelectedimage");
      setClientSmoker(false);
    }
  };

  let client_Life_smokerHandler = (elem) => {
    if (elem === true) {
      document
        .getElementById("YesSmokerID_Life")
        .classList.add("selectedimage");
      document
        .getElementById("notSmokingID_Life")
        .classList.add("notSelectedimage");
      document
        .getElementById("notSmokingID_Life")
        .classList.remove("selectedimage");
      setClientSmoker_Life(true);
    } else {
      document
        .getElementById("notSmokingID_Life")
        .classList.add("selectedimage");
      document
        .getElementById("YesSmokerID_Life")
        .classList.remove("selectedimage");
      document
        .getElementById("YesSmokerID_Life")
        .classList.add("notSelectedimage");
      setClientSmoker_Life(false);
    }
  };

  let initialValues = {
    PersonalInsuranceWeeks: "",
    PersonalInsuranceWeeks2: "",

    PersonalInsuranceBenefitClaimedradio: "No",
    PersonalInsuranceApplicationInsuranceradio: "No",
    PersonalInsuranceImpedimentReasonradio: "No",
    PersonalInsuranceCoverRadio: "No",

    PersonalInsuranceBenefitClaimed2radio: "No",
    PersonalInsuranceApplicationInsurance2radio: "No",
    PersonalInsuranceImpedimentReason2radio: "No",
    PersonalInsuranceCover2Radio: "No",

    PersonalInsuranceBenefitsDescription: "",
    PersonalInsuranceApplicationDescription: "",
    PersonalInsuranceImpedimentReasonDescription: "",

    PersonalInsuranceBenefitsDescription2: "",
    PersonalInsuranceApplicationDescription2: "",
    PersonalInsuranceImpedimentReasonDescription2: "",
  };

  // let OnlyClient_initialValues = {
  //   PersonalInsuranceWeeks: "",
  //   PersonalInsuranceBenefitClaimedradio: "No",
  //   PersonalInsuranceApplicationInsuranceradio: "No",
  //   PersonalInsuranceImpedimentReasonradio: "No",
  //   PersonalInsuranceCoverRadio: "No",
  //   PersonalInsuranceBenefitsDescription: "",
  //   PersonalInsuranceApplicationDescription: "",
  //   PersonalInsuranceImpedimentReasonDescription: "",
  // };

  let validationSchema = Yup.object({
    PersonalInsuranceWeeks: Yup.number().required("Required"),
    PersonalInsuranceWeeks2: Yup.number().required("Required"),

    PersonalInsuranceBenefitsDescription: Yup.string().when(
      "PersonalInsuranceBenefitClaimedradio",
      {
        is: (val) => val && val.length === 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    PersonalInsuranceApplicationDescription: Yup.string().when(
      "PersonalInsuranceApplicationInsuranceradio",
      {
        is: (val) => val && val.length === 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    PersonalInsuranceImpedimentReasonDescription: Yup.string().when(
      "PersonalInsuranceImpedimentReasonradio",
      {
        is: (val) => val && val.length === 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),

    PersonalInsuranceBenefitsDescription2: Yup.string().when(
      "PersonalInsuranceBenefitClaimed2radio",
      {
        is: (val) => val && val.length === 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    PersonalInsuranceApplicationDescription2: Yup.string().when(
      "PersonalInsuranceApplicationInsurance2radio",
      {
        is: (val) => val && val.length === 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    PersonalInsuranceImpedimentReasonDescription2: Yup.string().when(
      "PersonalInsuranceImpedimentReason2radio",
      {
        is: (val) => val && val.length === 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
  });

  let OnlyClient_ValidationSchema = Yup.object({
    PersonalInsuranceWeeks: Yup.number().required("Required"),

    PersonalInsuranceBenefitsDescription: Yup.string().when(
      "PersonalInsuranceBenefitClaimedradio",
      {
        is: (val) => val && val.length === 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    PersonalInsuranceApplicationDescription: Yup.string().when(
      "PersonalInsuranceApplicationInsuranceradio",
      {
        is: (val) => val && val.length === 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
    PersonalInsuranceImpedimentReasonDescription: Yup.string().when(
      "PersonalInsuranceImpedimentReasonradio",
      {
        is: (val) => val && val.length === 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
  });

  let Navigate = useNavigate();
  function BackFunction() {
    setSteps(10);
    localStorage.setItem("Steps", 10);
    Navigate("/Investment-Trust");
  }

  let onSubmit = (values) => {
    // setSteps(12;
    // localStorage.setItem("Steps", 12;

    // Navigate('/Risk-Profile')

    let clientData = {
      Email: localStorage.getItem("Email"),
      Weeks_without_PrimaryIncome: values.PersonalInsuranceWeeks,

      ClaimedBenifit: values.PersonalInsuranceBenefitClaimedradio,
      Details_ClaimedBenifit: values.PersonalInsuranceBenefitsDescription,

      InusranceRejected: values.PersonalInsuranceApplicationInsuranceradio,
      Details_InusranceRejected: values.PersonalInsuranceApplicationDescription,

      Reason_Impediment_Disability:
        values.PersonalInsuranceImpedimentReasonradio,
      Details_Reason_Impediment_Disability:
        values.PersonalInsuranceImpedimentReasonDescription,

      PersonalInsuranceCover: values.PersonalInsuranceCoverRadio,
    };

    let partnerData = {
      Email: localStorage.getItem("Email"),
      Weeks_without_PrimaryIncome: values.PersonalInsuranceWeeks2,
      InusranceRejected: values.PersonalInsuranceApplicationInsurance2radio,
      Details_InusranceRejected:
        values.PersonalInsuranceApplicationDescription2,
      ClaimedBenifit: values.PersonalInsuranceBenefitClaimed2radio,
      Details_ClaimedBenifit: values.PersonalInsuranceBenefitsDescription2,
      Reason_Impediment_Disability:
        values.PersonalInsuranceImpedimentReason2radio,
      Details_Reason_Impediment_Disability:
        values.PersonalInsuranceImpedimentReasonDescription2,
      PersonalInsuranceCover: values.PersonalInsuranceCover2Radio,
    };
    // console.log("clientData",clientData)
    // console.log("partnerData",partnerData)

    if (isPartnered === true) {
      axios
        .post(
          `${DefaultUrl}/api/Client-Insurance/Add-Client-Insurance`,
          clientData
        )
        .then((res) => {
          console.log("Client Data Added Successfully!");
        });

      axios
        .post(
          `${DefaultUrl}/api/Partner-Insurance/Add-Partner-Insurance`,
          partnerData
        )
        .then((res) => {
          console.log("Partner Data Added Successfully!");
        });
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Client-Insurance/Add-Client-Insurance`,
          clientData
        )
        .then((res) => {
          // const data = res.data;
          console.log("Data Added Successfully");
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.status);
            console.log(err.response.statusText);
            console.log(err.message);
            console.log(err.response.headers); // 👉️ {... response headers here}
            console.log("ss", err.response.data); // 👉️ {... response data here}
          }
        });
    }
  };

  let Client_initialValues = {
    PersonalInsurancePolicyNO1: isClientNumber,
    PersonalInsuranceLifeRadio: "No",
    LifeInput: "",
    PersonalInsuranceTPDRadio: "No",
    TPDInput: "",
    PersonalInsuranceTraumaRadio: "No",
    TraumaInput: "",
    PersonalInsurancePolicyOwner: "",
    PersonalInsuranceLifeInsured: "",
    PersonalInsuranceInsuranceCompany: "",
    PersonalInsuranceProductName: "",
    PersonalInsurancePolicySrNo: "",
    PersonalInsuranceCommencedDate: "",
    PersonalInsuranceRenewalDate: "",
    PersonalInsurancePremiumPA: "",
    PersonalInsurancePremiumType: "",
    PersonalInsuranceCPIIndexedRadio: "No",
    PersonalInsuranceSuperannuationRadio: "No",
    PersonalInsuranceContinuationRadio: "No",
    PersonalInsuranceLoadingRadio: "No",
    PersonalInsuranceLoadingDescription1: "",

    PersonalInsurance2PolicyNO1: isClientNumber2,
    PersonalInsurance2PolicyOwner: "",
    PersonalInsurance2LifeInsured: "",
    PersonalInsurance2InsuranceCompany: "",
    PersonalInsurance2ProductName: "",
    PersonalInsurance2PolicySrNo: "",
    PersonalInsurance2CommencedDate: "",
    PersonalInsurance2RenewalDate: "",
    PersonalInsurance2MonthlyBenefit: "",
    PersonalInsurance2SuperContinuance: "",
    PersonalInsurance2WaitingPeriod: "",
    PersonalInsurance2BenefitPeriod: "",
    PersonalInsurance2IndemnityPeriod: "",
    PersonalInsurance2PremiumPA: "",
    PersonalInsurance2PremiumType: "",
    PersonalInsurance2SuperannuationRadio: "No",
    PersonalInsurance2AccidentRadio: "No",
    PersonalInsurance2IncreasingClaimsRadio: "No",
    PersonalInsurance2TPDRadio: "No",
    PersonalInsurance2BenefitIndexedRadio: "No",
    PersonalInsurance2LoadingRadio: "No",
    PersonalInsurance2LoadingDescription2: "",
  };

  let ClientLife_validationSchema = Yup.object({
    PersonalInsurancePolicyOwner: Yup.string().required("Required"),
    LifeInput: Yup.string().when("PersonalInsuranceLifeRadio", {
      is: (val) => val && val === "Yes",
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    TPDInput: Yup.string().when("PersonalInsuranceTPDRadio", {
      is: (val) => val && val === "Yes",
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    TraumaInput: Yup.string().when("PersonalInsuranceTraumaRadio", {
      is: (val) => val && val === "Yes",
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    PersonalInsuranceLifeInsured: Yup.string().required("Required"),
    PersonalInsuranceInsuranceCompany: Yup.string().required("Required"),
    PersonalInsuranceProductName: Yup.string().required("Required"),
    PersonalInsurancePolicySrNo: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    PersonalInsuranceCommencedDate: Yup.date().required("Required").nullable(),
    PersonalInsuranceRenewalDate: Yup.date().required("Required").nullable(),
    PersonalInsurancePremiumPA: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    PersonalInsurancePremiumType: Yup.string().required("Required"),
    PersonalInsuranceLoadingDescription1: Yup.string().when(
      "PersonalInsuranceLoadingRadio",
      {
        is: (val) => val && val.length === 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
  });

  let ClientIncome_validationSchema = Yup.object({
    PersonalInsurance2PolicyOwner: Yup.string().required("Required"),
    PersonalInsurance2LifeInsured: Yup.string().required("Required"),
    PersonalInsurance2InsuranceCompany: Yup.string().required("Required"),
    PersonalInsurance2ProductName: Yup.string().required("Required"),
    PersonalInsurance2PolicySrNo: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    PersonalInsurance2CommencedDate: Yup.date().required("Required").nullable(),
    PersonalInsurance2RenewalDate: Yup.date().required("Required").nullable(),
    PersonalInsurance2MonthlyBenefit: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    PersonalInsurance2SuperContinuance: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    PersonalInsurance2WaitingPeriod: Yup.string().required("Required"),
    PersonalInsurance2BenefitPeriod: Yup.string().required("Required"),
    PersonalInsurance2IndemnityPeriod: Yup.string().required("Required"),
    PersonalInsurance2PremiumPA: Yup.number()
      .required("Required")
      .test("Is positive?", "Must be a positive number", (value) => value > 0),
    PersonalInsurance2PremiumType: Yup.string().required("Required"),
    PersonalInsurance2LoadingDescription2: Yup.string().when(
      "PersonalInsurance2LoadingRadio",
      {
        is: (val) => val && val.length === 3,
        then: Yup.string().required("Required"),
        otherwise: Yup.string().notRequired(),
      }
    ),
  });

  let Partner_initialValues = {
    PersonalInsurancePolicyNO1: isPartnerNumber,
    PersonalInsuranceLifeRadio: "No",
    LifeInput: "",
    PersonalInsuranceTPDRadio: "No",
    TPDInput: "",
    PersonalInsuranceTraumaRadio: "No",
    TraumaInput: "",
    PersonalInsurancePolicyOwner: "",
    PersonalInsuranceLifeInsured: "",
    PersonalInsuranceInsuranceCompany: "",
    PersonalInsuranceProductName: "",
    PersonalInsurancePolicySrNo: "",
    PersonalInsuranceCommencedDate: "",
    PersonalInsuranceRenewalDate: "",
    PersonalInsurancePremiumPA: "",
    PersonalInsurancePremiumType: "",
    PersonalInsuranceCPIIndexedRadio: "No",
    PersonalInsuranceSuperannuationRadio: "No",
    PersonalInsuranceContinuationRadio: "No",
    PersonalInsuranceLoadingRadio: "No",
    PersonalInsuranceLoadingDescription1: "",

    PersonalInsurance2PolicyNO1: isPartnerNumber2,
    PersonalInsurance2PolicyOwner: "",
    PersonalInsurance2LifeInsured: "",
    PersonalInsurance2InsuranceCompany: "",
    PersonalInsurance2ProductName: "",
    PersonalInsurance2PolicySrNo: "",
    PersonalInsurance2CommencedDate: "",
    PersonalInsurance2RenewalDate: "",
    PersonalInsurance2MonthlyBenefit: "",
    PersonalInsurance2SuperContinuance: "",
    PersonalInsurance2WaitingPeriod: "",
    PersonalInsurance2BenefitPeriod: "",
    PersonalInsurance2IndemnityPeriod: "",
    PersonalInsurance2PremiumPA: "",
    PersonalInsurance2PremiumType: "",
    PersonalInsurance2SuperannuationRadio: "No",
    PersonalInsurance2AccidentRadio: "No",
    PersonalInsurance2IncreasingClaimsRadio: "No",
    PersonalInsurance2TPDRadio: "No",
    PersonalInsurance2BenefitIndexedRadio: "No",
    PersonalInsurance2LoadingRadio: "No",
    PersonalInsurance2LoadingDescription2: "",
  };

  let Partner_onSubmit_Life = (values) => {
    let LifeData = {
      Email: localStorage.getItem("Email"),
      Life_PolicyID: values.PersonalInsurancePolicyNO1, // read only
      Life: values.PersonalInsuranceLifeRadio,
      TPD: values.PersonalInsuranceTPDRadio,
      Trauma: values.PersonalInsuranceTraumaRadio,
      LifeInput: values.LifeInput,
      TPDInput: values.TPDInput,
      TraumaInput: values.TraumaInput,

      Life_PolicyOwner: values.PersonalInsurancePolicyOwner,
      Life_Insured: values.PersonalInsuranceLifeInsured,
      Life_InsuranceCompany: values.PersonalInsuranceInsuranceCompany,
      Life_InsuranceProduct: values.PersonalInsuranceProductName,
      Life_PolicyNumber: values.PersonalInsurancePolicySrNo,
      Life_PolicyDateCommenced: values.PersonalInsuranceCommencedDate,
      Life_PolicyDateRenewal: values.PersonalInsuranceRenewalDate,
      Life_Smoker: clientSmoker,
      Life_PremiumPA: values.PersonalInsurancePremiumPA,
      Life_PremiumType: values.PersonalInsurancePremiumType,

      Life_CPI_Indexed: values.PersonalInsuranceCPIIndexedRadio,
      Life_SuperannuationPolicy: values.PersonalInsuranceSuperannuationRadio,
      Life_ContinuationPolicy: values.PersonalInsuranceContinuationRadio,
      Life_LoadingExecutions: values.PersonalInsuranceLoadingRadio,
      Life_Details_LoadingExecutions:
        values.PersonalInsuranceLoadingDescription1,
    };

    if (PartnerLifeTPDUpdateFlag) {
      let id = values.id;
      console.log(LifeData);

      axios
        .patch(
          `${DefaultUrl}/api/Partner-Life-Insurance/Update-Partner-Insurance-Life/${LifeData.Email}/${id}`,
          LifeData
        )
        .then((res) => {
          console.log("data Updated successfully");
          Partner_PersonalInsuranceCoverhandleClose();
          setPartnerLifeTPDUpdateFlag(false);
        });
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Partner-Life-Insurance/Add-Partner-Insurance-Life`,
          LifeData
        )
        .then((ref) => {
          console.log("Partner List Life TPD added ");
          Partner_PersonalInsuranceCoverhandleClose();
        });
    }

    setTimeout(() => {
      axios
        .get(
          `${DefaultUrl}/api/Partner-Life-Insurance`
        )
        .then((res) => {
          console.log("got it");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter(
            (item) => item.Email === LifeData.Email
          );
          setIsPartnerListLifeTPD(clientFilterObj);
          setIsPartnerNumber(
            clientFilterObj[clientFilterObj.length - 1].Life_PolicyID + 1
          );
          console.log(clientFilterObj);
        });
    }, 500);
  };

  let PartnerListLifeTPDDeleteHandler = (elem, ind) => {
    // setIsPartnerListLifeTPD(isPartnerListLifeTPD.filter((isPartnerListLifeTPD, index) => index !=== ind));
    // setIsPartnerNumber(isPartnerNumber-1);

    let id = elem._id;
    let email = elem.Email;

    axios
      .delete(
        `${DefaultUrl}/api/Partner-Life-Insurance/Delete-Partner-Insurance-Life/${email}/${id}`
      )
      .then((res) => {
        //Popper Massage
        console.log("Partner List Life TPD Remove");
      });

    setTimeout(() => {
      axios
        .get(
          `${DefaultUrl}/api/Partner-Life-Insurance`
        )
        .then((res) => {
          console.log("got it");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter(
            (item) => item.Email === email
          );
          setIsPartnerListLifeTPD(clientFilterObj);
          if (clientFilterObj.length === 0) {
            setIsPartnerNumber(1);
          } else {
            setIsPartnerNumber(
              clientFilterObj[clientFilterObj.length - 1].Life_PolicyID + 1
            );
          }
          console.log(clientFilterObj);
        });
    }, 500);
  };

  let PartnerListLifeTPDUpdateHandler = (elem, ind) => {
    setPartnerLifeTPDUpdateFlag(true);

    let date = new Date(elem.Life_PolicyDateCommenced);
    elem.Life_PolicyDateCommenced = date;
    date = new Date(elem.Life_PolicyDateRenewal);
    elem.Life_PolicyDateRenewal = date;

    let LifeData = {
      id: elem._id,
      Email: localStorage.getItem("Email"),
      PersonalInsurancePolicyNO1: elem.Life_PolicyID, // read only
      PersonalInsuranceLifeRadio: elem.Life,
      PersonalInsuranceTPDRadio: elem.TPD,
      PersonalInsuranceTraumaRadio: elem.Trauma,
      LifeInput: elem.LifeInput,
      TPDInput: elem.TPDInput,
      TraumaInput: elem.TraumaInput,

      PersonalInsurancePolicyOwner: elem.Life_PolicyOwner,
      PersonalInsuranceLifeInsured: elem.Life_Insured,
      PersonalInsuranceInsuranceCompany: elem.Life_InsuranceCompany,
      PersonalInsuranceProductName: elem.Life_InsuranceProduct,
      PersonalInsurancePolicySrNo: elem.Life_PolicyNumber,
      PersonalInsuranceCommencedDate: elem.Life_PolicyDateCommenced,
      PersonalInsuranceRenewalDate: elem.Life_PolicyDateRenewal,
      // Life_Smoker:clientSmoker,
      PersonalInsurancePremiumPA: elem.Life_PremiumPA,
      PersonalInsurancePremiumType: elem.Life_PremiumType,

      PersonalInsuranceCPIIndexedRadio: elem.Life_CPI_Indexed,
      PersonalInsuranceSuperannuationRadio: elem.Life_SuperannuationPolicy,
      PersonalInsuranceContinuationRadio: elem.Life_ContinuationPolicy,
      PersonalInsuranceLoadingRadio: elem.Life_LoadingExecutions,
      PersonalInsuranceLoadingDescription1: elem.Life_Details_LoadingExecutions,
    };

    setPartnerListLifeTPDTOUpdate([LifeData]);
    Partner_PersonalInsuranceCoverhandleShow();
  };

  let Partner_onSubmit_Income = (values) => {
    let partnerData = {
      Email: localStorage.getItem("Email"),
      Income_PolicyID: values.PersonalInsurance2PolicyNO1, // read only
      Income_PolicyOwner: values.PersonalInsurance2PolicyOwner,
      Income_LifeInsured: values.PersonalInsurance2LifeInsured,
      Income_InsuranceCompany: values.PersonalInsurance2InsuranceCompany,
      Income_InsuranceProduct: values.PersonalInsurance2ProductName,
      Income_PolicyNumber: values.PersonalInsurance2PolicySrNo,
      Income_PolicyDateCommenced: values.PersonalInsurance2CommencedDate,
      Income_PolicyDateRenewal: values.PersonalInsurance2RenewalDate,
      Income_Smoker: clientSmoker,
      Income_MonthlyBenefit: values.PersonalInsurance2MonthlyBenefit,
      Income_ContinuanceAmount: values.PersonalInsurance2SuperContinuance,
      Income_WaitingPeriod: values.PersonalInsurance2WaitingPeriod,
      Income_BenefitPeriod: values.PersonalInsurance2BenefitPeriod,
      Income_Agreed: values.PersonalInsurance2IndemnityPeriod,
      Income_PremiumPA: values.PersonalInsurance2PremiumPA,
      Income_PremiumType: values.PersonalInsurance2PremiumType,
      Income_SuperannuationPolicy: values.PersonalInsurance2SuperannuationRadio,
      Income_Accident: values.PersonalInsurance2AccidentRadio,
      Income_IncreasingClaim: values.PersonalInsurance2IncreasingClaimsRadio,
      Income_TPD: values.PersonalInsurance2TPDRadio,
      Income_BenefitIndexed: values.PersonalInsurance2BenefitIndexedRadio,
      Income_LoadingExecutions: values.PersonalInsurance2LoadingRadio,
      Income_Details_LoadingExecutions:
        values.PersonalInsurance2LoadingDescription2,
    };

    if (PartnerIncomeProtectionUpdateFlag) {
      let id = values.id;
      console.log(partnerData);

      axios
        .patch(
          `${DefaultUrl}/api/Partner-Income-Insurance/Update-Partner-Insurance-Income/${partnerData.Email}/${id}`,
          partnerData
        )
        .then((res) => {
          console.log("Partner_Income Updated successfully");
          Partner_PersonalInsuranceCover2handleClose();
          setPartnerIncomeProtectionUpdateFlag(false);
        });
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Partner-Income-Insurance/Add-Partner-Insurance-Income`,
          partnerData
        )
        .then((res) => {
          console.log("Partner_Income Added Successfully!");
          Partner_PersonalInsuranceCover2handleClose();
        });
    }

    setTimeout(() => {
      axios
        .get(
          `${DefaultUrl}/api/Partner-Income-Insurance`
        )
        .then((res) => {
          console.log("got it");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter(
            (item) => item.Email === partnerData.Email
          );
          setIsPartnerListIncomeProtection(clientFilterObj);
          setIsPartnerNumber2(
            clientFilterObj[clientFilterObj.length - 1].Income_PolicyID + 1
          );
          console.log(clientFilterObj);
        });
    }, 500);
  };

  let PartnerListIncomeProtectionDeleteHandler = (elem, ind) => {
    // setIsPartnerListIncomeProtection(isPartnerListIncomeProtection.filter((isPartnerListIncomeProtection, index) => index !=== ind));
    // setIsPartnerNumber2(isPartnerNumber2-1);

    let id = elem._id;
    let email = elem.Email;

    axios
      .delete(
        `${DefaultUrl}/api/Partner-Income-Insurance/Delete-Partner-Insurance-Income/${email}/${id}`
      )
      .then((res) => {
        //Popper Massage
        console.log("Partner List Income Protection TPD Remove");
      });

    setTimeout(() => {
      axios
        .get(
          `${DefaultUrl}/api/Partner-Income-Insurance`
        )
        .then((res) => {
          console.log("got it");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter(
            (item) => item.Email === email
          );
          setIsPartnerListIncomeProtection(clientFilterObj);
          if (clientFilterObj.length === 0) {
            setIsPartnerNumber2(1);
          } else {
            setIsPartnerNumber2(
              clientFilterObj[clientFilterObj.length - 1].Income_PolicyID + 1
            );
          }
          console.log(clientFilterObj);
        });
    }, 500);
  };

  let PartnerListIncomeProtectionUpdateHandler = (elem, ind) => {
    setPartnerIncomeProtectionUpdateFlag(true);

    let date = new Date(elem.Income_PolicyDateCommenced);
    elem.Income_PolicyDateCommenced = date;
    date = new Date(elem.Income_PolicyDateRenewal);
    elem.Income_PolicyDateRenewal = date;

    let clientData = {
      id: elem._id,
      Email: localStorage.getItem("Email"),
      PersonalInsurance2PolicyNO1: elem.Income_PolicyID, // read only
      PersonalInsurance2PolicyOwner: elem.Income_PolicyOwner,
      PersonalInsurance2LifeInsured: elem.Income_LifeInsured,
      PersonalInsurance2InsuranceCompany: elem.Income_InsuranceCompany,
      PersonalInsurance2ProductName: elem.Income_InsuranceProduct,
      PersonalInsurance2PolicySrNo: elem.Income_PolicyNumber,
      PersonalInsurance2CommencedDate: elem.Income_PolicyDateCommenced,
      PersonalInsurance2RenewalDate: elem.Income_PolicyDateRenewal,
      // Income_Smoker:clientSmoker,Income_Smoker
      PersonalInsurance2MonthlyBenefit: elem.Income_MonthlyBenefit,
      PersonalInsurance2SuperContinuance: elem.Income_ContinuanceAmount,
      PersonalInsurance2WaitingPeriod: elem.Income_WaitingPeriod,
      PersonalInsurance2BenefitPeriod: elem.Income_BenefitPeriod,
      PersonalInsurance2IndemnityPeriod: elem.Income_Agreed,
      PersonalInsurance2PremiumPA: elem.Income_PremiumPA,
      PersonalInsurance2PremiumType: elem.Income_PremiumType,
      PersonalInsurance2SuperannuationRadio: elem.Income_SuperannuationPolicy,
      PersonalInsurance2AccidentRadio: elem.Income_Accident,
      PersonalInsurance2IncreasingClaimsRadio: elem.Income_IncreasingClaim,
      PersonalInsurance2TPDRadio: elem.Income_TPD,
      PersonalInsurance2BenefitIndexedRadio: elem.Income_BenefitIndexed,
      PersonalInsurance2LoadingRadio: elem.Income_LoadingExecutions,
      PersonalInsurance2LoadingDescription2:
        elem.Income_Details_LoadingExecutions,
    };

    setPartnerListIncomeProtectionUpdate([clientData]);
    // setUpdateIndex(ind);
    Partner_PersonalInsuranceCover2handleShow();
  };

  let Client_onSubmit_Life = (values) => {
    let LifeData = {
      Email: localStorage.getItem("Email"),
      Life_PolicyID: values.PersonalInsurancePolicyNO1, // read only
      Life: values.PersonalInsuranceLifeRadio,
      LifeInput: values.LifeInput,
      TPD: values.PersonalInsuranceTPDRadio,
      TPDInput: values.TPDInput,
      Trauma: values.PersonalInsuranceTraumaRadio,
      TraumaInput: values.TraumaInput,

      Life_PolicyOwner: values.PersonalInsurancePolicyOwner,
      Life_Insured: values.PersonalInsuranceLifeInsured,
      Life_InsuranceCompany: values.PersonalInsuranceInsuranceCompany,
      Life_InsuranceProduct: values.PersonalInsuranceProductName,
      Life_PolicyNumber: values.PersonalInsurancePolicySrNo,
      Life_PolicyDateCommenced: values.PersonalInsuranceCommencedDate,
      Life_PolicyDateRenewal: values.PersonalInsuranceRenewalDate,
      Life_Smoker: clientSmoker,
      Life_PremiumPA: values.PersonalInsurancePremiumPA,
      Life_PremiumType: values.PersonalInsurancePremiumType,

      Life_CPI_Indexed: values.PersonalInsuranceCPIIndexedRadio,
      Life_SuperannuationPolicy: values.PersonalInsuranceSuperannuationRadio,
      Life_ContinuationPolicy: values.PersonalInsuranceContinuationRadio,
      Life_LoadingExecutions: values.PersonalInsuranceLoadingRadio,
      Life_Details_LoadingExecutions:
        values.PersonalInsuranceLoadingDescription1,
    };

    if (ClientLifeTPDUpdateFlag) {
      let id = values.id;
      console.log(LifeData);

      axios
        .patch(
          `${DefaultUrl}/api/Client-Life-Insurance/Update-Client-Insurance-Life/${LifeData.Email}/${id}`,
          LifeData
        )
        .then((res) => {
          console.log("data Updated successfully");
          PersonalInsuranceCoverhandleClose();
          setClientLifeTPDUpdateFlag(false);
        });
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Client-Life-Insurance/Add-Client-Insurance-Life`,
          LifeData
        )
        .then((ref) => {
          console.log("cliend life data added successfully!");
          PersonalInsuranceCoverhandleClose();
        });
    }

    // /Add-Client-Insurance-Life

    setTimeout(() => {
      axios
        .get(
          `${DefaultUrl}/api/Client-Life-Insurance`
        )
        .then((res) => {
          console.log("got it");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter(
            (item) => item.Email === LifeData.Email
          );
          setIsClientListLifeTPD(clientFilterObj);
          // alert(clientFilterObj.length);
          setIsClientNumber(
            clientFilterObj[clientFilterObj.length - 1].Life_PolicyID + 1
          );
          console.log(clientFilterObj);
        });
    }, 500);
  };
  let ClientListLifeTPDDeleteHandler = (elem, ind) => {
    // alert("ClientListLifeTPDDeleteHandler");
    // setIsClientListLifeTPD(isClientListLifeTPD.filter((isClientListLifeTPD, index) => index !=== ind));
    // setIsClientNumber(isClientNumber-1);

    let id = elem._id;
    let email = elem.Email;

    axios
      .delete(
        `${DefaultUrl}/api/Client-Life-Insurance/Delete-Client-Insurance-Life/${email}/${id}`
      )
      .then((res) => {
        //Popper Massage
        console.log("Australian Share Market Remove");
      });

    setTimeout(() => {
      axios
        .get(
          `${DefaultUrl}/api/Client-Life-Insurance`
        )
        .then((res) => {
          console.log("got it");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter(
            (item) => item.Email === email
          );
          setIsClientListLifeTPD(clientFilterObj);
          if (clientFilterObj.length === 0) {
            setIsClientNumber(1);
          } else {
            setIsClientNumber(
              clientFilterObj[clientFilterObj.length - 1].Life_PolicyID + 1
            );
          }
          console.log(clientFilterObj);
        });
    }, 500);
  };
  let ClientListLifeTPDUpdateHandler = (elem, ind) => {
    setClientLifeTPDUpdateFlag(true);

    let date = new Date(elem.Life_PolicyDateCommenced);
    elem.Life_PolicyDateCommenced = date;
    date = new Date(elem.Life_PolicyDateRenewal);
    elem.Life_PolicyDateRenewal = date;

    let LifeData = {
      id: elem._id,
      Email: localStorage.getItem("Email"),
      PersonalInsurancePolicyNO1: elem.Life_PolicyID, // read only
      PersonalInsuranceLifeRadio: elem.Life,
      PersonalInsuranceTPDRadio: elem.TPD,
      PersonalInsuranceTraumaRadio: elem.Trauma,
      LifeInput: elem.LifeInput,
      TPDInput: elem.TPDInput,
      TraumaInput: elem.TraumaInput,

      PersonalInsurancePolicyOwner: elem.Life_PolicyOwner,
      PersonalInsuranceLifeInsured: elem.Life_Insured,
      PersonalInsuranceInsuranceCompany: elem.Life_InsuranceCompany,
      PersonalInsuranceProductName: elem.Life_InsuranceProduct,
      PersonalInsurancePolicySrNo: elem.Life_PolicyNumber,
      PersonalInsuranceCommencedDate: elem.Life_PolicyDateCommenced,
      PersonalInsuranceRenewalDate: elem.Life_PolicyDateRenewal,
      // Life_Smoker:clientSmoker,
      PersonalInsurancePremiumPA: elem.Life_PremiumPA,
      PersonalInsurancePremiumType: elem.Life_PremiumType,

      PersonalInsuranceCPIIndexedRadio: elem.Life_CPI_Indexed,
      PersonalInsuranceSuperannuationRadio: elem.Life_SuperannuationPolicy,
      PersonalInsuranceContinuationRadio: elem.Life_ContinuationPolicy,
      PersonalInsuranceLoadingRadio: elem.Life_LoadingExecutions,
      PersonalInsuranceLoadingDescription1: elem.Life_Details_LoadingExecutions,
    };

    // console.log(LifeData);

    setClientListLifeTPDTOUpdate([LifeData]);
    // setUpdateIndex(ind);
    PersonalInsuranceCoverhandleShow();
  };

  let Client_onSubmit_Income = (values) => {
    let clientData = {
      Email: localStorage.getItem("Email"),
      Income_PolicyID: values.PersonalInsurance2PolicyNO1, // read only
      Income_PolicyOwner: values.PersonalInsurance2PolicyOwner,
      Income_LifeInsured: values.PersonalInsurance2LifeInsured,
      Income_InsuranceCompany: values.PersonalInsurance2InsuranceCompany,
      Income_InsuranceProduct: values.PersonalInsurance2ProductName,
      Income_PolicyNumber: values.PersonalInsurance2PolicySrNo,
      Income_PolicyDateCommenced: values.PersonalInsurance2CommencedDate,
      Income_PolicyDateRenewal: values.PersonalInsurance2RenewalDate,
      Income_Smoker: clientSmoker,
      Income_MonthlyBenefit: values.PersonalInsurance2MonthlyBenefit,
      Income_ContinuanceAmount: values.PersonalInsurance2SuperContinuance,
      Income_WaitingPeriod: values.PersonalInsurance2WaitingPeriod,
      Income_BenefitPeriod: values.PersonalInsurance2BenefitPeriod,
      Income_Agreed: values.PersonalInsurance2IndemnityPeriod,
      Income_PremiumPA: values.PersonalInsurance2PremiumPA,
      Income_PremiumType: values.PersonalInsurance2PremiumType,
      Income_SuperannuationPolicy: values.PersonalInsurance2SuperannuationRadio,
      Income_Accident: values.PersonalInsurance2AccidentRadio,
      Income_IncreasingClaim: values.PersonalInsurance2IncreasingClaimsRadio,
      Income_TPD: values.PersonalInsurance2TPDRadio,
      Income_BenefitIndexed: values.PersonalInsurance2BenefitIndexedRadio,
      Income_LoadingExecutions: values.PersonalInsurance2LoadingRadio,
      Income_Details_LoadingExecutions:
        values.PersonalInsurance2LoadingDescription2,
    };

    if (ClientIncomeProtectionUpdateFlag) {
      let id = values.id;
      console.log(clientData);

      axios
        .patch(
          `${DefaultUrl}/api/Client-Income-Insurance/Update-Client-Insurance-Income/${clientData.Email}/${id}`,
          clientData
        )
        .then((res) => {
          console.log("data Updated successfully");
          PersonalInsuranceCover2handleClose();
          setClientIncomeProtectionUpdateFlag(false);
        });
    } else {
      axios
        .post(
          `${DefaultUrl}/api/Client-Income-Insurance/Add-Client-Insurance-Income`,
          clientData
        )
        .then((res) => {
          console.log("Data Added Successfully!");
          PersonalInsuranceCover2handleClose();
        });
      // /Add-Client-Insurance-Life
    }

    setTimeout(() => {
      axios
        .get(
          `${DefaultUrl}/api/Client-Income-Insurance`
        )
        .then((res) => {
          console.log("got it");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter(
            (item) => item.Email === clientData.Email
          );
          setIsClientListIncomeProtection(clientFilterObj);
          setIsClientNumber2(
            clientFilterObj[clientFilterObj.length - 1].Income_PolicyID + 1
          );
          console.log(clientFilterObj);
        });
    }, 500);
  };
  let ClientListIncomeProtectionDeleteHandler = (elem, ind) => {
    // setIsClientListIncomeProtection(isClientListIncomeProtection.filter((isClientListIncomeProtection, index) => index !=== ind));
    // setIsClientNumber2(isClientNumber2-1);

    let id = elem._id;
    let email = elem.Email;

    axios
      .delete(
        `${DefaultUrl}/api/Client-Income-Insurance/Delete-Client-Insurance/${email}/${id}`
      )
      .then((res) => {
        //Popper Massage
        console.log("Australian Share Market Remove");
      });

    setTimeout(() => {
      axios
        .get(
          `${DefaultUrl}/api/Client-Income-Insurance`
        )
        .then((res) => {
          console.log("got it");
          let clientObj = res.data;
          let clientFilterObj = clientObj.filter(
            (item) => item.Email === email
          );
          setIsClientListIncomeProtection(clientFilterObj);
          if (clientFilterObj.length === 0) {
            setIsClientNumber2(1);
          } else {
            setIsClientNumber2(
              clientFilterObj[clientFilterObj.length - 1].Income_PolicyID + 1
            );
          }
          console.log(clientFilterObj);
        });
    }, 500);
  };

  let ClientListIncomeProtectionUpdateHandler = (elem, ind) => {
    setClientIncomeProtectionUpdateFlag(true);

    let date = new Date(elem.Income_PolicyDateCommenced);
    elem.Income_PolicyDateCommenced = date;
    date = new Date(elem.Income_PolicyDateRenewal);
    elem.Income_PolicyDateRenewal = date;

    let clientData = {
      id: elem._id,
      Email: localStorage.getItem("Email"),
      PersonalInsurance2PolicyNO1: elem.Income_PolicyID, // read only
      PersonalInsurance2PolicyOwner: elem.Income_PolicyOwner,
      PersonalInsurance2LifeInsured: elem.Income_LifeInsured,
      PersonalInsurance2InsuranceCompany: elem.Income_InsuranceCompany,
      PersonalInsurance2ProductName: elem.Income_InsuranceProduct,
      PersonalInsurance2PolicySrNo: elem.Income_PolicyNumber,
      PersonalInsurance2CommencedDate: elem.Income_PolicyDateCommenced,
      PersonalInsurance2RenewalDate: elem.Income_PolicyDateRenewal,
      // Income_Smoker:clientSmoker,Income_Smoker
      PersonalInsurance2MonthlyBenefit: elem.Income_MonthlyBenefit,
      PersonalInsurance2SuperContinuance: elem.Income_ContinuanceAmount,
      PersonalInsurance2WaitingPeriod: elem.Income_WaitingPeriod,
      PersonalInsurance2BenefitPeriod: elem.Income_BenefitPeriod,
      PersonalInsurance2IndemnityPeriod: elem.Income_Agreed,
      PersonalInsurance2PremiumPA: elem.Income_PremiumPA,
      PersonalInsurance2PremiumType: elem.Income_PremiumType,
      PersonalInsurance2SuperannuationRadio: elem.Income_SuperannuationPolicy,
      PersonalInsurance2AccidentRadio: elem.Income_Accident,
      PersonalInsurance2IncreasingClaimsRadio: elem.Income_IncreasingClaim,
      PersonalInsurance2TPDRadio: elem.Income_TPD,
      PersonalInsurance2BenefitIndexedRadio: elem.Income_BenefitIndexed,
      PersonalInsurance2LoadingRadio: elem.Income_LoadingExecutions,
      PersonalInsurance2LoadingDescription2:
        elem.Income_Details_LoadingExecutions,
    };

    setClientListIncomeProtectionUpdate([clientData]);
    // setUpdateIndex(ind);
    PersonalInsuranceCover2handleShow();
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row px-0 m-0">
          <div className="col-md-12">
            {/* --------------------------Start client Form-------------------- */}
            <Card className="shadow px-4 py-4 my-5">
              <Formik
                initialValues={initialValues}
                validationSchema={
                  isPartnered ? validationSchema : OnlyClient_ValidationSchema
                }
                onSubmit={onSubmit}
                enableReinitialize
              >
                {({ values, setFieldValue, handleChange, errors, touched }) => (
                  <Form>

                    <div className="container-fluid mt-4">
                      <div className="row">
                        <div className="col-md-2 "></div>
                        <div className="col-md-12">
                          <h3 className="text-center">Client Personal Insurance</h3>

                          <div className="row my-3">
                            <div className="col-md-6">
                              <div className="mb-5">
                                <label
                                  htmlFor="PersonalInsuranceWeeks"
                                  className="form-label"
                                >
                                  Number of weeks that you could maintain your
                                  standard of living without your primary income?
                                </label>
                                <Field
                                  name="PersonalInsuranceWeeks"
                                  id="PersonalInsuranceWeeks"
                                  type="number"
                                  className="form-control shadow inputDesign"
                                  placeholder="No. of Weeks"
                                />
                                <ErrorMessage
                                  name="PersonalInsuranceWeeks"
                                  component="div"
                                  className="text-danger fw-bold"
                                />
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="mb-3">
                                <label htmlFor="" className="form-label">
                                  Are you claiming or have you ever claimed a benefit
                                  from any source?
                                </label>
                                {/* health button style */}
                                <div className="form-check form-switch m-0 p-0 ">
                                  <div className="radiobutton">
                                    <input
                                      type="radio"
                                      name="PersonalInsuranceBenefitClaimedradio"
                                      id="PersonalInsuranceBenefitClaimedopt1"
                                      value="Yes"
                                      onClick={() => BenefitHandler("yes")}
                                      onChange={handleChange}
                                      checked={
                                        values.PersonalInsuranceBenefitClaimedradio ===
                                        "Yes"
                                      }
                                    />
                                    <label
                                      htmlFor="PersonalInsuranceBenefitClaimedopt1"
                                      className="label1"
                                    >
                                      <span>YES</span>
                                    </label>
                                    <input
                                      type="radio"
                                      name="PersonalInsuranceBenefitClaimedradio"
                                      onClick={() => BenefitHandler("no")}
                                      id="PersonalInsuranceBenefitClaimedopt2"
                                      value="No"
                                      onChange={handleChange}
                                      checked={
                                        values.PersonalInsuranceBenefitClaimedradio ===
                                        "No"
                                      }
                                    />
                                    <label
                                      htmlFor="PersonalInsuranceBenefitClaimedopt2"
                                      className="label2"
                                    >
                                      <span>NO</span>
                                    </label>
                                  </div>
                                </div>
                                {/* health switch button style */}
                              </div>
                            </div>
                            {BenefitClaimed && (
                              <div
                                className="col-md-6"
                                id="PersonalInsuranceBenefitsDescription"
                              >
                                <div className="mb-5">
                                  <label
                                    htmlFor="PersonalInsuranceBenefitsDescription"
                                    className="form-label"
                                  >
                                    Description
                                  </label>
                                  <Field
                                    as="textarea"
                                    className="form-control shadow inputDesign"
                                    id="PersonalInsuranceBenefitsDescription"
                                    name="PersonalInsuranceBenefitsDescription"
                                    placeholder="Description"
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="PersonalInsuranceBenefitsDescription"
                                  />
                                </div>
                              </div>
                            )}

                            <div className="col-md-12">
                              <div className="mb-3">
                                <label htmlFor="" className="form-label">
                                  Have you had an application for personal insurance
                                  rejected for any reason?
                                </label>
                                {/* health button style */}
                                <div className="form-check form-switch m-0 p-0 ">
                                  <div className="radiobutton">
                                    <input
                                      type="radio"
                                      name="PersonalInsuranceApplicationInsuranceradio"
                                      id="PersonalInsuranceApplicationInsuranceopt1"
                                      value="Yes"
                                      onClick={() =>
                                        ApplicationInsuranceHandler("yes")
                                      }
                                      onChange={handleChange}
                                      checked={
                                        values.PersonalInsuranceApplicationInsuranceradio ===
                                        "Yes"
                                      }
                                    />
                                    <label
                                      htmlFor="PersonalInsuranceApplicationInsuranceopt1"
                                      className="label1"
                                    >
                                      <span>YES</span>
                                    </label>
                                    <input
                                      type="radio"
                                      name="PersonalInsuranceApplicationInsuranceradio"
                                      onClick={() =>
                                        ApplicationInsuranceHandler("no")
                                      }
                                      id="PersonalInsuranceApplicationInsuranceopt2"
                                      value="No"
                                      onChange={handleChange}
                                      checked={
                                        values.PersonalInsuranceApplicationInsuranceradio ===
                                        "No"
                                      }
                                    />
                                    <label
                                      htmlFor="PersonalInsuranceApplicationInsuranceopt2"
                                      className="label2"
                                    >
                                      <span>NO</span>
                                    </label>
                                  </div>
                                </div>
                                {/* health switch button style */}
                              </div>
                            </div>
                            {ApplicationInsurance && (
                              <div
                                className="col-md-6"
                                id="PersonalInsuranceApplicationDescription"
                              >
                                <div className="mb-5">
                                  <label
                                    htmlFor="PersonalInsuranceApplicationDescription"
                                    className="form-label"
                                  >
                                    Description
                                  </label>
                                  <Field
                                    as="textarea"
                                    className="form-control shadow inputDesign"
                                    id="PersonalInsuranceApplicationDescription"
                                    name="PersonalInsuranceApplicationDescription"
                                    placeholder="Description"
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="PersonalInsuranceApplicationDescription"
                                  />
                                </div>
                              </div>
                            )}

                            <div className="col-md-12">
                              <div className="mb-3">
                                <label htmlFor="" className="form-label">
                                  Are you aware of any reason or impediment to you
                                  obtaining life or disability cover from an insurer?
                                </label>
                                {/* health button style */}
                                <div className="form-check form-switch m-0 p-0 ">
                                  <div className="radiobutton">
                                    <input
                                      type="radio"
                                      name="PersonalInsuranceImpedimentReasonradio"
                                      id="PersonalInsuranceImpedimentReasonopt1"
                                      value="Yes"
                                      onClick={() => ImpedimentReasonHandler("yes")}
                                      onChange={handleChange}
                                      checked={
                                        values.PersonalInsuranceImpedimentReasonradio ===
                                        "Yes"
                                      }
                                    />
                                    <label
                                      htmlFor="PersonalInsuranceImpedimentReasonopt1"
                                      className="label1"
                                    >
                                      <span>YES</span>
                                    </label>
                                    <input
                                      type="radio"
                                      name="PersonalInsuranceImpedimentReasonradio"
                                      onClick={() => ImpedimentReasonHandler("no")}
                                      id="PersonalInsuranceImpedimentReasonopt2"
                                      value="No"
                                      onChange={handleChange}
                                      checked={
                                        values.PersonalInsuranceImpedimentReasonradio ===
                                        "No"
                                      }
                                    />
                                    <label
                                      htmlFor="PersonalInsuranceImpedimentReasonopt2"
                                      className="label2"
                                    >
                                      <span>NO</span>
                                    </label>
                                  </div>
                                </div>
                                {/* health switch button style */}
                              </div>
                            </div>
                            {ImpedimentReason && (
                              <div
                                className="col-md-6"
                                id="PersonalInsuranceImpedimentReasonDescription"
                              >
                                <div className="mb-5">
                                  <label
                                    htmlFor="PersonalInsuranceImpedimentReasonDescription"
                                    className="form-label"
                                  >
                                    Description
                                  </label>
                                  <Field
                                    as="textarea"
                                    className="form-control shadow inputDesign"
                                    id="PersonalInsuranceImpedimentReasonDescription"
                                    name="PersonalInsuranceImpedimentReasonDescription"
                                    placeholder="Description"
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="PersonalInsuranceImpedimentReasonDescription"
                                  />
                                </div>
                              </div>
                            )}

                            {CRObject.CoverOutsideIssuesradio === "Yes" && (
                              <div className="my-3">
                                {/* --------------------------------------------- */}
                                {/* 1 row */}
                                <div className="row mb-3">
                                  <div className="col-md-12">
                                    <div className="mb-3">
                                      <label className="form-label">
                                        Do you have any personal Insurance cover?
                                        (Retail Cover Outside and Inside Super)
                                      </label>
                                      {/* switch button style */}
                                      <div className="form-check form-switch m-0 p-0 ">
                                        <div className="radiobutton">
                                          <input
                                            type="radio"
                                            name="PersonalInsuranceCoverRadio"
                                            id="PersonalInsuranceCoverOpt1"
                                            value="Yes"
                                            onClick={() =>
                                              PersonalInsuranceCoverHandler("Yes")
                                            }
                                            onChange={handleChange}
                                            checked={
                                              values.PersonalInsuranceCoverRadio ===
                                              "Yes"
                                            }
                                          />
                                          <label
                                            htmlFor="PersonalInsuranceCoverOpt1"
                                            className="label1"
                                          >
                                            <span>YES</span>
                                          </label>
                                          <input
                                            type="radio"
                                            name="PersonalInsuranceCoverRadio"
                                            id="PersonalInsuranceCoverOpt2"
                                            value="No"
                                            onClick={() =>
                                              PersonalInsuranceCoverHandler("No")
                                            }
                                            onChange={handleChange}
                                            checked={
                                              values.PersonalInsuranceCoverRadio ===
                                              "No"
                                            }
                                          />
                                          <label
                                            htmlFor="PersonalInsuranceCoverOpt2"
                                            className="label2"
                                          >
                                            <span>NO</span>
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {PersonalInsuranceCover && (
                                    <div className="col-md-12 my-4">
                                      <div className="col-md-3">
                                        <label className="form-label">
                                          Life/TPD/Trauma
                                        </label>
                                        <br />

                                        <button
                                          type="button"
                                          className="btn btn-outline-success "
                                          onClick={PersonalInsuranceCoverhandleShow}
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
                                      <div className="col-md-12">
                                        <div className="table-responsive my-3">
                                          <table className="table table-bordered table-hover text-center">
                                            <thead
                                              className="text-light"
                                              id="tableHead"
                                            >
                                              <tr>
                                                <th>Policy Owner</th>
                                                <th>Life/TPD/Trauma</th>
                                                <th>Life Insured</th>
                                                <th>Insurance Company</th>
                                                <th>Name of Product</th>
                                                <th>Policy Number</th>
                                                <th>Operation</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {isClientListLifeTPD.map(
                                                (elem, index) => {
                                                  return (
                                                    <tr key={index}>
                                                      <td className="fw-bold">
                                                        {elem.Life_PolicyOwner}
                                                      </td>
                                                      <td>
                                                        {elem.LifeInput}/
                                                        {elem.TPDInput}/
                                                        {elem.TraumaInput}
                                                      </td>
                                                      <td>{elem.Life_Insured}</td>
                                                      <td>
                                                        {elem.Life_InsuranceCompany}
                                                      </td>
                                                      <td>
                                                        {elem.Life_InsuranceProduct}
                                                      </td>
                                                      <td>
                                                        {elem.Life_PolicyNumber}
                                                      </td>
                                                      <td>
                                                        <button
                                                          type="button"
                                                          onClick={(e) => {
                                                            ClientListLifeTPDDeleteHandler(
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
                                                            ClientListLifeTPDUpdateHandler(
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
                                                }
                                              )}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {PersonalInsuranceCover && (
                                    <div className="col-md-12 my-4">
                                      <div className="col-md-3">
                                        <label className="form-label">
                                          Income Protection
                                        </label>
                                        <br />

                                        <button
                                          type="button"
                                          className=" btn
                                              btn-outline-success "
                                          onClick={PersonalInsuranceCover2handleShow}
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
                                      <div className="col-md-12">
                                        <div className="table-responsive my-3">
                                          <table className="table table-bordered table-hover text-center">
                                            <thead
                                              className="text-light"
                                              id="tableHead"
                                            >
                                              <tr>
                                                <th>Policy Owner</th>
                                                <th>Monthly Benefits</th>
                                                <th>Life Insured</th>
                                                <th>Insurance Company</th>
                                                <th>Name of Product</th>
                                                <th>Policy Number</th>
                                                <th>Operation</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {isClientListIncomeProtection.map(
                                                (elem, index) => {
                                                  return (
                                                    <tr key={index}>
                                                      <td className="fw-bold">
                                                        {elem.Income_PolicyOwner}
                                                      </td>
                                                      <td>Cal</td>
                                                      <td>
                                                        {elem.Income_LifeInsured}
                                                      </td>
                                                      <td>
                                                        {elem.Income_InsuranceCompany}
                                                      </td>
                                                      <td>
                                                        {elem.Income_InsuranceProduct}
                                                      </td>
                                                      <td>
                                                        {elem.Income_PolicyNumber}
                                                      </td>
                                                      <td>
                                                        <button
                                                          type="button"
                                                          onClick={(e) => {
                                                            ClientListIncomeProtectionDeleteHandler(
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
                                                            ClientListIncomeProtectionUpdateHandler(
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
                                                }
                                              )}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                {/* 1 row */}

                                {/* Client LifeTPD */}
                                <Modal
                                  show={PersonalInsuranceCovershow}
                                  onHide={PersonalInsuranceCoverhandleClose}
                                  backdrop="static"
                                  className="modal-lg"
                                  keyboard={false}
                                >
                                  <Modal.Header
                                    className="text-light modalBG "
                                    closeButton
                                  >
                                    <Modal.Title className="fontStyle">
                                      Life / TPD / Trauma
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
                                      ClientLifeTPDUpdateFlag
                                        ? ClientListLifeTPDTOUpdate[0]
                                        : Client_initialValues
                                    }
                                    validationSchema={ClientLife_validationSchema}
                                    onSubmit={Client_onSubmit_Life}
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
                                          {/* Australian Share Market Form */}

                                          {/* Solicitor */}
                                          <div className=" ">
                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsurancePolicyNO1"
                                                  className="form-label"
                                                >
                                                  Policy#
                                                </label>
                                              </div>
                                              <div className="col-6">
                                                <Field
                                                  type="number"
                                                  className="form-control shadow inputDesign"
                                                  readOnly
                                                  id="PersonalInsurancePolicyNO1"
                                                  name="PersonalInsurancePolicyNO1"
                                                />
                                                <ErrorMessage
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                  name="PersonalInsurancePolicyNO1"
                                                />
                                              </div>
                                            </div>

                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label className="form-label">
                                                  Life
                                                </label>
                                                {/* switch button style */}
                                              </div>
                                              <div className="col-6">
                                                <div className="form-check form-switch m-0 p-0 ">
                                                  <div className="radiobutton">
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsuranceLifeRadio"
                                                      id="PersonalInsuranceLifeOpt1"
                                                      value="Yes"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsuranceLifeRadio ===
                                                        "Yes"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsuranceLifeOpt1"
                                                      className="label1"
                                                    >
                                                      <span>YES</span>
                                                    </label>
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsuranceLifeRadio"
                                                      id="PersonalInsuranceLifeOpt2"
                                                      value="No"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsuranceLifeRadio ===
                                                        "No"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsuranceLifeOpt2"
                                                      className="label2"
                                                    >
                                                      <span>NO</span>
                                                    </label>
                                                  </div>
                                                </div>
                                                {values.PersonalInsuranceLifeRadio ===
                                                  "Yes" && (
                                                    <div className="mt-4">
                                                      <Field
                                                        type="number"
                                                        name="LifeInput"
                                                        className="form-control shadow inputDesign"
                                                        placeholder="Life Insurance amount"
                                                        id="LifeInput"
                                                      />
                                                      <ErrorMessage
                                                        name="LifeInput"
                                                        component="div"
                                                        className="text-danger fw-bold"
                                                      />
                                                    </div>
                                                  )}
                                              </div>
                                            </div>

                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label className="form-label">
                                                  TPD
                                                </label>
                                              </div>
                                              <div className="col-6">
                                                {/* switch button style */}
                                                <div className="form-check form-switch m-0 p-0 ">
                                                  <div className="radiobutton">
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsuranceTPDRadio"
                                                      id="PersonalInsuranceTPDOpt1"
                                                      value="Yes"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsuranceTPDRadio ===
                                                        "Yes"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsuranceTPDOpt1"
                                                      className="label1"
                                                    >
                                                      <span>YES</span>
                                                    </label>
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsuranceTPDRadio"
                                                      id="PersonalInsuranceTPDOpt2"
                                                      value="No"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsuranceTPDRadio ===
                                                        "No"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsuranceTPDOpt2"
                                                      className="label2"
                                                    >
                                                      <span>NO</span>
                                                    </label>
                                                  </div>
                                                </div>
                                                {values.PersonalInsuranceTPDRadio ===
                                                  "Yes" && (
                                                    <div className="mt-4">
                                                      <Field
                                                        type="number"
                                                        name="TPDInput"
                                                        className="form-control shadow inputDesign"
                                                        placeholder="TPD Insurance amount"
                                                        id="TPDInput"
                                                      />
                                                      <ErrorMessage
                                                        name="TPDInput"
                                                        component="div"
                                                        className="text-danger fw-bold"
                                                      />
                                                    </div>
                                                  )}
                                              </div>
                                            </div>

                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label className="form-label">
                                                  Trauma
                                                </label>
                                              </div>
                                              <div className="col-6">
                                                {/* switch button style */}
                                                <div className="form-check form-switch m-0 p-0 ">
                                                  <div className="radiobutton">
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsuranceTraumaRadio"
                                                      id="PersonalInsuranceTraumaOpt1"
                                                      value="Yes"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsuranceTraumaRadio ===
                                                        "Yes"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsuranceTraumaOpt1"
                                                      className="label1"
                                                    >
                                                      <span>YES</span>
                                                    </label>
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsuranceTraumaRadio"
                                                      id="PersonalInsuranceTraumaOpt2"
                                                      value="No"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsuranceTraumaRadio ===
                                                        "No"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsuranceTraumaOpt2"
                                                      className="label2"
                                                    >
                                                      <span>NO</span>
                                                    </label>
                                                  </div>
                                                </div>
                                                {values.PersonalInsuranceTraumaRadio ===
                                                  "Yes" && (
                                                    <div className="mt-4">
                                                      <Field
                                                        type="number"
                                                        name="TraumaInput"
                                                        className="form-control shadow inputDesign"
                                                        placeholder="Trauma Insurance amount"
                                                        id="TraumaInput"
                                                      />
                                                      <ErrorMessage
                                                        name="TraumaInput"
                                                        component="div"
                                                        className="text-danger fw-bold"
                                                      />
                                                    </div>
                                                  )}
                                              </div>
                                            </div>

                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsurancePolicyOwner"
                                                  className="form-label"
                                                >
                                                  Policy Owner
                                                </label>
                                              </div>
                                              <div className="col-6">
                                                <Field
                                                  as="select"
                                                  name="PersonalInsurancePolicyOwner"
                                                  id="PersonalInsurancePolicyOwner"
                                                  className="form-select shadow  inputDesign"
                                                >
                                                  <option value="">Select</option>
                                                  <option value="SMSF">SMSF</option>
                                                  <option value="Superannuation Fund">
                                                    Superannuation Fund
                                                  </option>
                                                  <option value="Super Trustee">
                                                    Super Trustee
                                                  </option>
                                                  <option value="Client">
                                                    Client
                                                  </option>
                                                </Field>
                                                <ErrorMessage
                                                  name="PersonalInsurancePolicyOwner"
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                />
                                              </div>
                                            </div>

                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsuranceLifeInsured"
                                                  className="form-label"
                                                >
                                                  Life Insured
                                                </label>
                                              </div>
                                              <div className="col-6">
                                                <Field
                                                  type="text"
                                                  className="form-control shadow inputDesign"
                                                  placeholder="Life Insured"
                                                  id="PersonalInsuranceLifeInsured"
                                                  name="PersonalInsuranceLifeInsured"
                                                />
                                                <ErrorMessage
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                  name="PersonalInsuranceLifeInsured"
                                                />
                                              </div>
                                            </div>

                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsuranceInsuranceCompany"
                                                  className="form-label"
                                                >
                                                  Insurance Company
                                                </label>
                                              </div>
                                              <div className="col-6">
                                                <Field
                                                  type="text"
                                                  className="form-control shadow inputDesign"
                                                  placeholder="Insurance Company"
                                                  id="PersonalInsuranceInsuranceCompany"
                                                  name="PersonalInsuranceInsuranceCompany"
                                                />
                                                <ErrorMessage
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                  name="PersonalInsuranceInsuranceCompany"
                                                />
                                              </div>
                                            </div>

                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsuranceProductName"
                                                  className="form-label"
                                                >
                                                  Name of Product
                                                </label>
                                              </div>
                                              <div className="col-6">
                                                <Field
                                                  type="text"
                                                  className="form-control shadow inputDesign"
                                                  placeholder="Product Name"
                                                  id="PersonalInsuranceProductName"
                                                  name="PersonalInsuranceProductName"
                                                />
                                                <ErrorMessage
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                  name="PersonalInsuranceProductName"
                                                />
                                              </div>
                                            </div>

                                            <div className="row mb-3 ">
                                              <div className="col-6 ">
                                                <label
                                                  htmlFor="PersonalInsurancePolicySrNo"
                                                  className="form-label"
                                                >
                                                  Policy No.
                                                </label>
                                              </div>
                                              <div className="col-6">
                                                <Field
                                                  type="number"
                                                  className="form-control shadow inputDesign"
                                                  placeholder="Policy No"
                                                  id="PersonalInsurancePolicySrNo"
                                                  name="PersonalInsurancePolicySrNo"
                                                />
                                                <ErrorMessage
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                  name="PersonalInsurancePolicySrNo"
                                                />
                                              </div>
                                            </div>

                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsuranceCommencedDate"
                                                  className="form-label"
                                                >
                                                  Date Commenced
                                                </label>
                                              </div>
                                              <div className="col-6">
                                                <div>
                                                  <DatePicker
                                                    className="form-control inputDesign shadow"
                                                    showIcon
                                                    id="PersonalInsuranceCommencedDate"
                                                    name="PersonalInsuranceCommencedDate"
                                                    selected={
                                                      values.PersonalInsuranceCommencedDate
                                                    }
                                                    onChange={(date) =>
                                                      setFieldValue(
                                                        "PersonalInsuranceCommencedDate",
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
                                                  name="PersonalInsuranceCommencedDate"
                                                />
                                              </div>
                                            </div>

                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsuranceRenewalDate"
                                                  className="form-label"
                                                >
                                                  Renewal Date
                                                </label>
                                              </div>
                                              <div className="col-6">
                                                <div>
                                                  <DatePicker
                                                    className="form-control inputDesign shadow"
                                                    showIcon
                                                    id="PersonalInsuranceRenewalDate"
                                                    name="PersonalInsuranceRenewalDate"
                                                    selected={
                                                      values.PersonalInsuranceRenewalDate
                                                    }
                                                    onChange={(date) =>
                                                      setFieldValue(
                                                        "PersonalInsuranceRenewalDate",
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
                                                  name="PersonalInsuranceRenewalDate"
                                                />
                                              </div>
                                            </div>

                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label className="form-label">
                                                  client life Smoker
                                                </label>
                                              </div>
                                              <div className="col-6">
                                                <div className="">
                                                  <div
                                                    id="YesSmokerID_Life"
                                                    className=" selectedimage"
                                                    onClick={() =>
                                                      client_Life_smokerHandler(true)
                                                    }
                                                  >
                                                    <img
                                                      className="img-fluid imgPerson"
                                                      htmlFor="YesSmokerID_Life"
                                                      src={smoking}
                                                      alt=""
                                                    />
                                                  </div>

                                                  <div
                                                    id="notSmokingID_Life"
                                                    className="mx-1 notSelectedimage  "
                                                    onClick={() =>
                                                      client_Life_smokerHandler(false)
                                                    }
                                                  >
                                                    <img
                                                      className=" img-fluid imgPerson"
                                                      htmlFor="notSmokingID_Life"
                                                      src={notsmoking}
                                                      alt=""
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>

                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsurancePremiumPA"
                                                  className="form-label"
                                                >
                                                  Premium P.A.
                                                </label>
                                              </div>
                                              <div className="col-6">
                                                <Field
                                                  type="number"
                                                  className="form-control shadow inputDesign"
                                                  placeholder="Premium P.A."
                                                  id="PersonalInsurancePremiumPA"
                                                  name="PersonalInsurancePremiumPA"
                                                />
                                                <ErrorMessage
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                  name="PersonalInsurancePremiumPA"
                                                />
                                              </div>
                                            </div>

                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsurancePremiumType"
                                                  className="form-label"
                                                >
                                                  Premium Type
                                                </label>
                                              </div>
                                              <div className="col-6">
                                                <Field
                                                  as="select"
                                                  name="PersonalInsurancePremiumType"
                                                  id="PersonalInsurancePremiumType"
                                                  className="form-select shadow  inputDesign"
                                                >
                                                  <option value="">Select</option>
                                                  <option value="Level">Level</option>
                                                  <option value="Stepped">
                                                    Stepped
                                                  </option>
                                                  <option value="Other">Other</option>
                                                </Field>
                                                <ErrorMessage
                                                  name="PersonalInsurancePremiumType"
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                />
                                              </div>
                                            </div>

                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label className="form-label">
                                                  Indexed to CPI?
                                                </label>
                                              </div>
                                              {/* switch button style */}
                                              <div className="col-6">
                                                <div className="form-check form-switch m-0 p-0 ">
                                                  <div className="radiobutton">
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsuranceCPIIndexedRadio"
                                                      id="PersonalInsuranceCPIIndexedOpt1"
                                                      value="Yes"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsuranceCPIIndexedRadio ===
                                                        "Yes"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsuranceCPIIndexedOpt1"
                                                      className="label1"
                                                    >
                                                      <span>YES</span>
                                                    </label>
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsuranceCPIIndexedRadio"
                                                      id="PersonalInsuranceCPIIndexedOpt2"
                                                      value="No"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsuranceCPIIndexedRadio ===
                                                        "No"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsuranceCPIIndexedOpt2"
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
                                                <label className="form-label">
                                                  Superannuation Policy?
                                                </label>
                                              </div>
                                              <div className="col-6">
                                                {/* switch button style */}
                                                <div className="form-check form-switch m-0 p-0 ">
                                                  <div className="radiobutton">
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsuranceSuperannuationRadio"
                                                      id="PersonalInsuranceSuperannuationOpt1"
                                                      value="Yes"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsuranceSuperannuationRadio ===
                                                        "Yes"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsuranceSuperannuationOpt1"
                                                      className="label1"
                                                    >
                                                      <span>YES</span>
                                                    </label>
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsuranceSuperannuationRadio"
                                                      id="PersonalInsuranceSuperannuationOpt2"
                                                      value="No"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsuranceSuperannuationRadio ===
                                                        "No"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsuranceSuperannuationOpt2"
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
                                                <label className="form-label">
                                                  Continuation Option?
                                                </label>
                                              </div>
                                              <div className="col-6">
                                                {/* switch button style */}
                                                <div className="form-check form-switch m-0 p-0 ">
                                                  <div className="radiobutton">
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsuranceContinuationRadio"
                                                      id="PersonalInsuranceContinuationOpt1"
                                                      value="Yes"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsuranceContinuationRadio ===
                                                        "Yes"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsuranceContinuationOpt1"
                                                      className="label1"
                                                    >
                                                      <span>YES</span>
                                                    </label>
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsuranceContinuationRadio"
                                                      id="PersonalInsuranceContinuationOpt2"
                                                      value="No"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsuranceContinuationRadio ===
                                                        "No"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsuranceContinuationOpt2"
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
                                                <label className="form-label">
                                                  Any Loading Or Exclusions
                                                </label>
                                              </div>
                                              <div className="col-6">
                                                {/* switch button style */}
                                                <div className="form-check form-switch m-0 p-0 ">
                                                  <div className="radiobutton">
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsuranceLoadingRadio"
                                                      id="PersonalInsuranceLoadingOpt1"
                                                      value="Yes"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsuranceLoadingRadio ===
                                                        "Yes"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsuranceLoadingOpt1"
                                                      className="label1"
                                                    >
                                                      <span>YES</span>
                                                    </label>
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsuranceLoadingRadio"
                                                      id="PersonalInsuranceLoadingOpt2"
                                                      value="No"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsuranceLoadingRadio ===
                                                        "No"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsuranceLoadingOpt2"
                                                      className="label2"
                                                    >
                                                      <span>NO</span>
                                                    </label>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            {values.PersonalInsuranceLoadingRadio ===
                                              "Yes" && (
                                                <div className="row">
                                                  {" "}
                                                  <div className="col-6">
                                                    <label
                                                      htmlFor="PersonalInsuranceLoadingDescription1"
                                                      className="form-label"
                                                    >
                                                      Description
                                                    </label>
                                                  </div>
                                                  <div
                                                    className="col-6"
                                                    id="PersonalInsuranceLoadingDescription1"
                                                  >
                                                    <Field
                                                      as="textarea"
                                                      className="form-control shadow inputDesign"
                                                      id="PersonalInsuranceLoadingDescription1"
                                                      name="PersonalInsuranceLoadingDescription1"
                                                      placeholder="Description"
                                                    />
                                                    <ErrorMessage
                                                      component="div"
                                                      className="text-danger fw-bold"
                                                      name="PersonalInsuranceLoadingDescription1"
                                                    />
                                                  </div>
                                                </div>
                                              )}
                                          </div>
                                          {/* Solicitor */}

                                          {/*Australian Share Detail Form */}
                                        </Modal.Body>
                                        <Modal.Footer>
                                          <div className="col-md-12">
                                            <button
                                              className="float-end btn w-25  bgColor modalBtn"
                                              // onClick={PersonalInsuranceCoverhandleClose}
                                              type="submit"
                                            >
                                              Save
                                            </button>
                                            <button
                                              type="button"
                                              className="float-end btn w-25  btn-outline  backBtn mx-3"
                                              onClick={
                                                PersonalInsuranceCoverhandleClose
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
                                {/* Client LifeTPD end */}

                                {/* Client IncomeProtection  */}
                                <Modal
                                  show={PersonalInsuranceCovershow2}
                                  onHide={PersonalInsuranceCover2handleClose}
                                  backdrop="static"
                                  className="modal-lg"
                                  keyboard={false}
                                >
                                  <Modal.Header
                                    className="text-light modalBG "
                                    closeButton
                                  >
                                    <Modal.Title className="fontStyle">
                                      Income Protection
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
                                      ClientIncomeProtectionUpdateFlag
                                        ? ClientListIncomeProtectionUpdate[0]
                                        : Client_initialValues
                                    }
                                    validationSchema={ClientIncome_validationSchema}
                                    onSubmit={Client_onSubmit_Income}
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
                                          {/* Australian Share Market Form */}

                                          {/* Solicitor */}
                                          <div className=" ">
                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsurance2PolicyNO1"
                                                  className="form-label"
                                                >
                                                  Policy# C2
                                                </label>
                                              </div>

                                              <div className="col-6">
                                                <Field
                                                  type="number"
                                                  className="form-control shadow inputDesign "
                                                  readOnly
                                                  id="PersonalInsurance2PolicyNO1"
                                                  name="PersonalInsurance2PolicyNO1"
                                                />
                                                <ErrorMessage
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                  name="PersonalInsurance2PolicyNO1"
                                                />
                                              </div>
                                            </div>

                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsurance2PolicyOwner"
                                                  className="form-label"
                                                >
                                                  Policy Owner
                                                </label>
                                              </div>

                                              <div className="col-6">
                                                <Field
                                                  as="select"
                                                  name="PersonalInsurance2PolicyOwner"
                                                  id="PersonalInsurance2PolicyOwner"
                                                  className="form-select shadow  inputDesign"
                                                >
                                                  <option value="">Select</option>
                                                  <option value="SMSF">SMSF</option>
                                                  <option value="Superannuation Fund">
                                                    Superannuation Fund
                                                  </option>
                                                  <option value="Super Trustee">
                                                    Super Trustee
                                                  </option>
                                                  <option value="Client">
                                                    Client
                                                  </option>
                                                </Field>
                                                <ErrorMessage
                                                  name="PersonalInsurance2PolicyOwner"
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                />
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsurance2LifeInsured"
                                                  className="form-label"
                                                >
                                                  Life Insured
                                                </label>
                                              </div>

                                              <div className="col-6">
                                                <Field
                                                  type="text"
                                                  className="form-control shadow inputDesign"
                                                  placeholder="Life Insured"
                                                  id="PersonalInsurance2LifeInsured"
                                                  name="PersonalInsurance2LifeInsured"
                                                />
                                                <ErrorMessage
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                  name="PersonalInsurance2LifeInsured"
                                                />
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsurance2InsuranceCompany"
                                                  className="form-label"
                                                >
                                                  Insurance Company
                                                </label>
                                              </div>

                                              <div className="col-6">
                                                <Field
                                                  type="text"
                                                  className="form-control shadow inputDesign"
                                                  placeholder="Insurance Company"
                                                  id="PersonalInsurance2InsuranceCompany"
                                                  name="PersonalInsurance2InsuranceCompany"
                                                />
                                                <ErrorMessage
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                  name="PersonalInsurance2InsuranceCompany"
                                                />
                                              </div>
                                            </div>
                                            <div className="row mb-3 ">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsurance2ProductName"
                                                  className="form-label"
                                                >
                                                  Name of Product
                                                </label>
                                              </div>

                                              <div className="col-6">
                                                <Field
                                                  type="text"
                                                  className="form-control shadow inputDesign"
                                                  placeholder="Product Name"
                                                  id="PersonalInsurance2ProductName"
                                                  name="PersonalInsurance2ProductName"
                                                />
                                                <ErrorMessage
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                  name="PersonalInsurance2ProductName"
                                                />
                                              </div>
                                            </div>
                                            <div className="row mb-3 ">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsurance2PolicySrNo"
                                                  className="form-label"
                                                >
                                                  Policy No.
                                                </label>
                                              </div>

                                              <div className="col-6">
                                                <Field
                                                  type="number"
                                                  className="form-control shadow inputDesign"
                                                  placeholder="Policy No"
                                                  id="PersonalInsurance2PolicySrNo"
                                                  name="PersonalInsurance2PolicySrNo"
                                                />
                                                <ErrorMessage
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                  name="PersonalInsurance2PolicySrNo"
                                                />
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsurance2CommencedDate"
                                                  className="form-label"
                                                >
                                                  Date Commenced
                                                </label>
                                              </div>

                                              <div className="col-6">
                                                <div>
                                                  <DatePicker
                                                    className="form-control inputDesign shadow"
                                                    showIcon
                                                    id="PersonalInsurance2CommencedDate"
                                                    name="PersonalInsurance2CommencedDate"
                                                    selected={
                                                      values.PersonalInsurance2CommencedDate
                                                    }
                                                    onChange={(date) =>
                                                      setFieldValue(
                                                        "PersonalInsurance2CommencedDate",
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
                                                  name="PersonalInsurance2CommencedDate"
                                                />
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsurance2RenewalDate"
                                                  className="form-label"
                                                >
                                                  Renewal Date
                                                </label>
                                              </div>

                                              <div className="col-6">
                                                <div>
                                                  <DatePicker
                                                    className="form-control inputDesign shadow"
                                                    showIcon
                                                    id="PersonalInsurance2RenewalDate"
                                                    name="PersonalInsurance2RenewalDate"
                                                    selected={
                                                      values.PersonalInsurance2RenewalDate
                                                    }
                                                    onChange={(date) =>
                                                      setFieldValue(
                                                        "PersonalInsurance2RenewalDate",
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
                                                  name="PersonalInsurance2RenewalDate"
                                                />
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label className="form-label">
                                                  Smoker
                                                </label>
                                              </div>

                                              <div className="col-6">
                                                <div className="">
                                                  <div
                                                    id="YesSmokerID"
                                                    className=" selectedimage"
                                                    onClick={() =>
                                                      smokerHandler("smoker")
                                                    }
                                                  >
                                                    <img
                                                      className="img-fluid imgPerson"
                                                      htmlFor="YesSmokerID"
                                                      src={smoking}
                                                      alt=""
                                                    />
                                                  </div>

                                                  <div
                                                    id="notSmokingID"
                                                    className="mx-1 notSelectedimage  "
                                                    onClick={() =>
                                                      smokerHandler("notSmoker")
                                                    }
                                                  >
                                                    <img
                                                      className=" img-fluid imgPerson"
                                                      htmlFor="notSmokingID"
                                                      src={notsmoking}
                                                      alt=""
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsurance2MonthlyBenefit"
                                                  className="form-label"
                                                >
                                                  Monthly Benefit
                                                </label>
                                              </div>

                                              <div className="col-6">
                                                <Field
                                                  type="number"
                                                  className="form-control shadow inputDesign"
                                                  placeholder="Monthly Benefit"
                                                  id="PersonalInsurance2MonthlyBenefit"
                                                  name="PersonalInsurance2MonthlyBenefit"
                                                />
                                                <ErrorMessage
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                  name="PersonalInsurance2MonthlyBenefit"
                                                />
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsurance2SuperContinuance"
                                                  className="form-label"
                                                >
                                                  Super Continuance Amount (monthly)
                                                </label>
                                              </div>

                                              <div className="col-6">
                                                <Field
                                                  type="number"
                                                  className="form-control shadow inputDesign"
                                                  placeholder="Super Continuance Amount"
                                                  id="PersonalInsurance2SuperContinuance"
                                                  name="PersonalInsurance2SuperContinuance"
                                                />
                                                <ErrorMessage
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                  name="PersonalInsurance2SuperContinuance"
                                                />
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsurance2WaitingPeriod"
                                                  className="form-label"
                                                >
                                                  Waiting Period
                                                </label>
                                              </div>

                                              <div className="col-6">
                                                <Field
                                                  as="select"
                                                  name="PersonalInsurance2WaitingPeriod"
                                                  id="PersonalInsurance2WaitingPeriod"
                                                  className="form-select shadow  inputDesign"
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
                                                  <option value="1 Year">
                                                    1 Year
                                                  </option>
                                                  <option value="2 Year">
                                                    2 Year
                                                  </option>
                                                </Field>
                                                <ErrorMessage
                                                  name="PersonalInsurance2WaitingPeriod"
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                />
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsurance2BenefitPeriod"
                                                  className="form-label"
                                                >
                                                  Benefit Period
                                                </label>
                                              </div>

                                              <div className="col-6">
                                                <Field
                                                  as="select"
                                                  name="PersonalInsurance2BenefitPeriod"
                                                  id="PersonalInsurance2BenefitPeriod"
                                                  className="form-select shadow  inputDesign"
                                                >
                                                  <option value="">Select</option>
                                                  <option value="1 Year">
                                                    1 Year
                                                  </option>
                                                  <option value="2 Year">
                                                    2 Year
                                                  </option>
                                                  <option value="5 Year">
                                                    5 Year
                                                  </option>
                                                  <option value="Until Age 60">
                                                    Until Age 60
                                                  </option>
                                                  <option value="Until Age 65">
                                                    Until Age 65
                                                  </option>
                                                  <option value="Until Age 67">
                                                    Until Age 67
                                                  </option>
                                                  <option value="Until Age 70">
                                                    Until Age 70
                                                  </option>
                                                </Field>
                                                <ErrorMessage
                                                  name="PersonalInsurance2BenefitPeriod"
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                />
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsurance2IndemnityPeriod"
                                                  className="form-label"
                                                >
                                                  Agreed or Indemnity?
                                                </label>
                                              </div>

                                              <div className="col-6">
                                                <Field
                                                  as="select"
                                                  name="PersonalInsurance2IndemnityPeriod"
                                                  id="PersonalInsurance2IndemnityPeriod"
                                                  className="form-select shadow  inputDesign"
                                                >
                                                  <option value="">Select</option>
                                                  <option value="Agreed">
                                                    Agreed
                                                  </option>
                                                  <option value="Indemnity">
                                                    Indemnity
                                                  </option>
                                                </Field>
                                                <ErrorMessage
                                                  name="PersonalInsurance2IndemnityPeriod"
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                />
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsurance2PremiumPA"
                                                  className="form-label"
                                                >
                                                  Premium P.A.
                                                </label>
                                              </div>

                                              <div className="col-6">
                                                <Field
                                                  type="number"
                                                  className="form-control shadow inputDesign"
                                                  placeholder="Premium P.A."
                                                  id="PersonalInsurance2PremiumPA"
                                                  name="PersonalInsurance2PremiumPA"
                                                />
                                                <ErrorMessage
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                  name="PersonalInsurance2PremiumPA"
                                                />
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label
                                                  htmlFor="PersonalInsurance2PremiumType"
                                                  className="form-label"
                                                >
                                                  Premium Type
                                                </label>
                                              </div>

                                              <div className="col-6">
                                                <Field
                                                  as="select"
                                                  name="PersonalInsurance2PremiumType"
                                                  id="PersonalInsurance2PremiumType"
                                                  className="form-select shadow  inputDesign"
                                                >
                                                  <option value="">Select</option>
                                                  <option value="Level">Level</option>
                                                  <option value="Stepped">
                                                    Stepped
                                                  </option>
                                                  <option value="Other">Other</option>
                                                </Field>
                                                <ErrorMessage
                                                  name="PersonalInsurance2PremiumType"
                                                  component="div"
                                                  className="text-danger fw-bold"
                                                />
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <div className="col-6">
                                                <label className="form-label">
                                                  Superannuation Policy?
                                                </label>
                                              </div>

                                              <div className="col-md-6">
                                                {/* switch button style */}
                                                <div className="form-check form-switch m-0 p-0 ">
                                                  <div className="radiobutton">
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsurance2SuperannuationRadio"
                                                      id="PersonalInsurance2SuperannuationOpt1"
                                                      value="Yes"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsurance2SuperannuationRadio ===
                                                        "Yes"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsurance2SuperannuationOpt1"
                                                      className="label1"
                                                    >
                                                      <span>YES</span>
                                                    </label>
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsurance2SuperannuationRadio"
                                                      id="PersonalInsurance2SuperannuationOpt2"
                                                      value="No"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsurance2SuperannuationRadio ===
                                                        "No"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsurance2SuperannuationOpt2"
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
                                                <label className="form-label">
                                                  Accident Option?
                                                </label>
                                              </div>

                                              <div className="col-6">
                                                {/* switch button style */}
                                                <div className="form-check form-switch m-0 p-0 ">
                                                  <div className="radiobutton">
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsurance2AccidentRadio"
                                                      id="PersonalInsurance2AccidentOpt1"
                                                      value="Yes"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsurance2AccidentRadio ===
                                                        "Yes"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsurance2AccidentOpt1"
                                                      className="label1"
                                                    >
                                                      <span>YES</span>
                                                    </label>
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsurance2AccidentRadio"
                                                      id="PersonalInsurance2AccidentOpt2"
                                                      value="No"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsurance2AccidentRadio ===
                                                        "No"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsurance2AccidentOpt2"
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
                                                <label className="form-label">
                                                  Increasing Claims Option?
                                                </label>
                                              </div>

                                              <div className="col-6">
                                                {/* switch button style */}
                                                <div className="form-check form-switch m-0 p-0 ">
                                                  <div className="radiobutton">
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsurance2IncreasingClaimsRadio"
                                                      id="PersonalInsurance2IncreasingClaimsOpt1"
                                                      value="Yes"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsurance2IncreasingClaimsRadio ===
                                                        "Yes"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsurance2IncreasingClaimsOpt1"
                                                      className="label1"
                                                    >
                                                      <span>YES</span>
                                                    </label>
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsurance2IncreasingClaimsRadio"
                                                      id="PersonalInsurance2IncreasingClaimsOpt2"
                                                      value="No"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsurance2IncreasingClaimsRadio ===
                                                        "No"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsurance2IncreasingClaimsOpt2"
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
                                                <label className="form-label">
                                                  TPD Option?
                                                </label>
                                              </div>

                                              <div className="col-6">
                                                {/* switch button style */}
                                                <div className="form-check form-switch m-0 p-0 ">
                                                  <div className="radiobutton">
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsurance2TPDRadio"
                                                      id="PersonalInsurance2TPDOpt1"
                                                      value="Yes"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsurance2TPDRadio ===
                                                        "Yes"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsurance2TPDOpt1"
                                                      className="label1"
                                                    >
                                                      <span>YES</span>
                                                    </label>
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsurance2TPDRadio"
                                                      id="PersonalInsurance2TPDOpt2"
                                                      value="No"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsurance2TPDRadio ===
                                                        "No"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsurance2TPDOpt2"
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
                                                <label className="form-label">
                                                  Is the benefit indexed?
                                                </label>
                                              </div>

                                              <div className="col-6">
                                                {/* switch button style */}
                                                <div className="form-check form-switch m-0 p-0 ">
                                                  <div className="radiobutton">
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsurance2BenefitIndexedRadio"
                                                      id="PersonalInsurance2BenefitIndexedOpt1"
                                                      value="Yes"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsurance2BenefitIndexedRadio ===
                                                        "Yes"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsurance2BenefitIndexedOpt1"
                                                      className="label1"
                                                    >
                                                      <span>YES</span>
                                                    </label>
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsurance2BenefitIndexedRadio"
                                                      id="PersonalInsurance2BenefitIndexedOpt2"
                                                      value="No"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsurance2BenefitIndexedRadio ===
                                                        "No"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsurance2BenefitIndexedOpt2"
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
                                                <label className="form-label">
                                                  Any Loading Or Exclusions
                                                </label>
                                              </div>

                                              <div className="col-6">
                                                {/* switch button style */}
                                                <div className="form-check form-switch m-0 p-0 ">
                                                  <div className="radiobutton">
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsurance2LoadingRadio"
                                                      id="PersonalInsurance2LoadingOpt1"
                                                      value="Yes"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsurance2LoadingRadio ===
                                                        "Yes"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsurance2LoadingOpt1"
                                                      className="label1"
                                                    >
                                                      <span>YES</span>
                                                    </label>
                                                    <input
                                                      type="radio"
                                                      name="PersonalInsurance2LoadingRadio"
                                                      id="PersonalInsurance2LoadingOpt2"
                                                      value="No"
                                                      onChange={handleChange}
                                                      checked={
                                                        values.PersonalInsurance2LoadingRadio ===
                                                        "No"
                                                      }
                                                    />
                                                    <label
                                                      htmlFor="PersonalInsurance2LoadingOpt2"
                                                      className="label2"
                                                    >
                                                      <span>NO</span>
                                                    </label>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>

                                            {values.PersonalInsurance2LoadingRadio ===
                                              "Yes" && (
                                                <div className="row mb-3">
                                                  <div className="col-6">
                                                    <label
                                                      htmlFor="PersonalInsurance2LoadingDescription2"
                                                      className="form-label"
                                                    >
                                                      Description
                                                    </label>
                                                  </div>

                                                  <div
                                                    className="col-md-6"
                                                    id="PersonalInsurance2LoadingDescription2"
                                                  >
                                                    <Field
                                                      as="textarea"
                                                      className="form-control shadow inputDesign"
                                                      id="PersonalInsurance2LoadingDescription2"
                                                      name="PersonalInsurance2LoadingDescription2"
                                                      placeholder="Description"
                                                    />
                                                    <ErrorMessage
                                                      component="div"
                                                      className="text-danger fw-bold"
                                                      name="PersonalInsurance2LoadingDescription2"
                                                    />
                                                  </div>
                                                </div>
                                              )}
                                          </div>
                                          {/* Solicitor */}

                                          {/*Australian Share Detail Form */}
                                        </Modal.Body>
                                        <Modal.Footer>
                                          <div className="col-md-12">
                                            <button
                                              className="float-end btn w-25  bgColor modalBtn"
                                              // onClick={PersonalInsuranceCoverhandleClose}
                                              type="submit"
                                            >
                                              Save
                                            </button>
                                            <button
                                              type="button"
                                              className="float-end btn w-25  btn-outline  backBtn mx-3"
                                              onClick={
                                                PersonalInsuranceCover2handleClose
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
                                {/* Client IncomeProtection  */}

                                {/* ---------------------------------------------------- */}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {isPartnered && (
                      <div className="container-fluid mt-4">
                        <div className="row m-0 p-0 ">
                          <div className="col-md-2 m-0 p-0 "></div>
                          <div className="col-md-12">
                            <h3 className="text-center">
                              Partner Personal Insurance
                            </h3>

                            <div className="row my-3">
                              <div className="col-md-6">
                                <div className="mb-5">
                                  <label
                                    htmlFor="PersonalInsuranceWeeks2"
                                    className="form-label"
                                  >
                                    Number of weeks that you could maintain your
                                    standard of living without your primary income?
                                  </label>
                                  <Field
                                    name="PersonalInsuranceWeeks2"
                                    id="PersonalInsuranceWeeks2"
                                    type="number"
                                    className="form-control shadow inputDesign"
                                    placeholder="No. of Weeks"
                                  />
                                  <ErrorMessage
                                    name="PersonalInsuranceWeeks2"
                                    component="div"
                                    className="text-danger fw-bold"
                                  />
                                </div>
                              </div>

                              <div className="col-md-12">
                                <div className="mb-3">
                                  <label htmlFor="" className="form-label">
                                    Are you claiming or have you ever claimed a
                                    benefit from any source?
                                  </label>
                                  {/* health button style */}
                                  <div className="form-check form-switch m-0 p-0 ">
                                    <div className="radiobutton">
                                      <input
                                        type="radio"
                                        name="PersonalInsuranceBenefitClaimed2radio"
                                        id="PersonalInsuranceBenefitClaimed2opt1"
                                        value="Yes"
                                        onClick={() => Benefit2Handler("yes")}
                                        onChange={handleChange}
                                        checked={
                                          values.PersonalInsuranceBenefitClaimed2radio ===
                                          "Yes"
                                        }
                                      />
                                      <label
                                        htmlFor="PersonalInsuranceBenefitClaimed2opt1"
                                        className="label1"
                                      >
                                        <span>YES</span>
                                      </label>
                                      <input
                                        type="radio"
                                        name="PersonalInsuranceBenefitClaimed2radio"
                                        onClick={() => Benefit2Handler("no")}
                                        id="PersonalInsuranceBenefitClaimed2opt2"
                                        value="No"
                                        onChange={handleChange}
                                        checked={
                                          values.PersonalInsuranceBenefitClaimed2radio ===
                                          "No"
                                        }
                                      />
                                      <label
                                        htmlFor="PersonalInsuranceBenefitClaimed2opt2"
                                        className="label2"
                                      >
                                        <span>NO</span>
                                      </label>
                                    </div>
                                  </div>
                                  {/* health switch button style */}
                                </div>
                              </div>
                              {BenefitClaimed2 && (
                                <div
                                  className="col-md-6"
                                  id="PersonalInsuranceBenefitsDescription2"
                                >
                                  <div className="mb-5">
                                    <label
                                      htmlFor="PersonalInsuranceBenefitsDescription2"
                                      className="form-label"
                                    >
                                      Description
                                    </label>
                                    <Field
                                      as="textarea"
                                      className="form-control shadow inputDesign"
                                      id="PersonalInsuranceBenefitsDescription2"
                                      name="PersonalInsuranceBenefitsDescription2"
                                      placeholder="Description"
                                    />
                                    <ErrorMessage
                                      component="div"
                                      className="text-danger fw-bold"
                                      name="PersonalInsuranceBenefitsDescription2"
                                    />
                                  </div>
                                </div>
                              )}

                              <div className="col-md-12">
                                <div className="mb-3">
                                  <label htmlFor="" className="form-label">
                                    Have you had an application for personal insurance
                                    rejected for any reason?
                                  </label>
                                  {/* health button style */}
                                  <div className="form-check form-switch m-0 p-0 ">
                                    <div className="radiobutton">
                                      <input
                                        type="radio"
                                        name="PersonalInsuranceApplicationInsurance2radio"
                                        id="PersonalInsuranceApplicationInsurance2opt1"
                                        value="Yes"
                                        onClick={() =>
                                          ApplicationInsurance2Handler("yes")
                                        }
                                        onChange={handleChange}
                                        checked={
                                          values.PersonalInsuranceApplicationInsurance2radio ===
                                          "Yes"
                                        }
                                      />
                                      <label
                                        htmlFor="PersonalInsuranceApplicationInsurance2opt1"
                                        className="label1"
                                      >
                                        <span>YES</span>
                                      </label>
                                      <input
                                        type="radio"
                                        name="PersonalInsuranceApplicationInsurance2radio"
                                        onClick={() =>
                                          ApplicationInsurance2Handler("no")
                                        }
                                        id="PersonalInsuranceApplicationInsurance2opt2"
                                        value="No"
                                        onChange={handleChange}
                                        checked={
                                          values.PersonalInsuranceApplicationInsurance2radio ===
                                          "No"
                                        }
                                      />
                                      <label
                                        htmlFor="PersonalInsuranceApplicationInsurance2opt2"
                                        className="label2"
                                      >
                                        <span>NO</span>
                                      </label>
                                    </div>
                                  </div>
                                  {/* health switch button style */}
                                </div>
                              </div>
                              {ApplicationInsurance2 && (
                                <div
                                  className="col-md-6"
                                  id="PersonalInsuranceApplicationDescription2"
                                >
                                  <div className="mb-5">
                                    <label
                                      htmlFor="PersonalInsuranceApplicationDescription2"
                                      className="form-label"
                                    >
                                      Description
                                    </label>
                                    <Field
                                      as="textarea"
                                      className="form-control shadow inputDesign"
                                      id="PersonalInsuranceApplicationDescription2"
                                      name="PersonalInsuranceApplicationDescription2"
                                      placeholder="Description"
                                    />
                                    <ErrorMessage
                                      component="div"
                                      className="text-danger fw-bold"
                                      name="PersonalInsuranceApplicationDescription2"
                                    />
                                  </div>
                                </div>
                              )}

                              <div className="col-md-12">
                                <div className="mb-3">
                                  <label htmlFor="" className="form-label">
                                    Are you aware of any reason or impediment to you
                                    obtaining life or disability cover from an
                                    insurer?
                                  </label>
                                  {/* health button style */}
                                  <div className="form-check form-switch m-0 p-0 ">
                                    <div className="radiobutton">
                                      <input
                                        type="radio"
                                        name="PersonalInsuranceImpedimentReason2radio"
                                        id="PersonalInsuranceImpedimentReason2opt1"
                                        value="Yes"
                                        onClick={() =>
                                          ImpedimentReason2Handler("yes")
                                        }
                                        onChange={handleChange}
                                        checked={
                                          values.PersonalInsuranceImpedimentReason2radio ===
                                          "Yes"
                                        }
                                      />
                                      <label
                                        htmlFor="PersonalInsuranceImpedimentReason2opt1"
                                        className="label1"
                                      >
                                        <span>YES</span>
                                      </label>
                                      <input
                                        type="radio"
                                        name="PersonalInsuranceImpedimentReason2radio"
                                        onClick={() => ImpedimentReason2Handler("no")}
                                        id="PersonalInsuranceImpedimentReason2opt2"
                                        value="No"
                                        onChange={handleChange}
                                        checked={
                                          values.PersonalInsuranceImpedimentReason2radio ===
                                          "No"
                                        }
                                      />
                                      <label
                                        htmlFor="PersonalInsuranceImpedimentReason2opt2"
                                        className="label2"
                                      >
                                        <span>NO</span>
                                      </label>
                                    </div>
                                  </div>
                                  {/* health switch button style */}
                                </div>
                              </div>
                              {ImpedimentReason2 && (
                                <div
                                  className="col-md-6"
                                  id="PersonalInsuranceImpedimentReasonDescription2"
                                >
                                  <div className="mb-5">
                                    <label
                                      htmlFor="PersonalInsuranceImpedimentReasonDescription2"
                                      className="form-label"
                                    >
                                      Description
                                    </label>
                                    <Field
                                      as="textarea"
                                      className="form-control shadow inputDesign"
                                      id="PersonalInsuranceImpedimentReasonDescription2"
                                      name="PersonalInsuranceImpedimentReasonDescription2"
                                      placeholder="Description"
                                    />
                                    <ErrorMessage
                                      component="div"
                                      className="text-danger fw-bold"
                                      name="PersonalInsuranceImpedimentReasonDescription2"
                                    />
                                  </div>
                                </div>
                              )}
                              {CRObject.CoverOutsideIssuesradio === "Yes" && (
                                <div className="my-3">
                                  {/* --------------------------------------------- */}
                                  {/* 1 row */}
                                  <div className="row mb-3">
                                    <div className="col-md-12">
                                      <div className="mb-3">
                                        <label className="form-label">
                                          Do you have any personal Insurance cover?
                                          (Retail Cover Outside and Inside Super)
                                        </label>
                                        {/* switch button style */}
                                        <div className="form-check form-switch m-0 p-0 ">
                                          <div className="radiobutton">
                                            <input
                                              type="radio"
                                              name="PersonalInsuranceCover2Radio"
                                              id="PersonalInsuranceCover2Opt1"
                                              value="Yes"
                                              onClick={() =>
                                                Partner_PersonalInsuranceCoverHandler(
                                                  "Yes"
                                                )
                                              }
                                              onChange={handleChange}
                                              checked={
                                                values.PersonalInsuranceCover2Radio ===
                                                "Yes"
                                              }
                                            />
                                            <label
                                              htmlFor="PersonalInsuranceCover2Opt1"
                                              className="label1"
                                            >
                                              <span>YES</span>
                                            </label>
                                            <input
                                              type="radio"
                                              name="PersonalInsuranceCover2Radio"
                                              id="PersonalInsuranceCover2Opt2"
                                              value="No"
                                              onClick={() =>
                                                Partner_PersonalInsuranceCoverHandler(
                                                  "No"
                                                )
                                              }
                                              onChange={handleChange}
                                              checked={
                                                values.PersonalInsuranceCover2Radio ===
                                                "No"
                                              }
                                            />
                                            <label
                                              htmlFor="PersonalInsuranceCover2Opt2"
                                              className="label2"
                                            >
                                              <span>NO</span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {Partner_PersonalInsuranceCover && (
                                      <div className="col-md-12  my-4">
                                        <div className="col-md-3">
                                          <label className="form-label">
                                            Life/TPD/Trauma
                                          </label>
                                          <br />

                                          <button
                                            type="button"
                                            className="btn btn-outline-success "
                                            onClick={
                                              Partner_PersonalInsuranceCoverhandleShow
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
                                        <div className="col-md-12">
                                          <div className="table-responsive my-3">
                                            <table className="table table-bordered table-hover text-center">
                                              <thead
                                                className="text-light"
                                                id="tableHead"
                                              >
                                                <tr>
                                                  <th>Policy Owner</th>
                                                  <th>Life/TPD/Trauma</th>
                                                  <th>Life Insured</th>
                                                  <th>Insurance Company</th>
                                                  <th>Name of Product</th>
                                                  <th>Policy Number</th>
                                                  <th>Operation</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {isPartnerListLifeTPD.map(
                                                  (elem, index) => {
                                                    return (
                                                      <tr key={index}>
                                                        <td className="fw-bold">
                                                          {elem.Life_PolicyOwner}
                                                        </td>
                                                        <td>
                                                          {elem.LifeInput}/
                                                          {elem.TPDInput}/
                                                          {elem.TraumaInput}
                                                        </td>
                                                        <td>{elem.Life_Insured}</td>
                                                        <td>
                                                          {elem.Life_InsuranceCompany}
                                                        </td>
                                                        <td>
                                                          {elem.Life_InsuranceProduct}
                                                        </td>
                                                        <td>
                                                          {elem.Life_PolicyNumber}
                                                        </td>
                                                        <td>
                                                          <button
                                                            type="button"
                                                            onClick={(e) => {
                                                              PartnerListLifeTPDDeleteHandler(
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
                                                              PartnerListLifeTPDUpdateHandler(
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
                                                  }
                                                )}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                    {Partner_PersonalInsuranceCover && (
                                      <div className="col-md-12 my-4">
                                        <div className="col-md-3">
                                          <label className="form-label">
                                            Income Protection
                                          </label>
                                          <br />

                                          <button
                                            type="button"
                                            className=" btn 
                                                btn-outline-success "
                                            onClick={
                                              Partner_PersonalInsuranceCover2handleShow
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
                                        <div className="col-md-12">
                                          <div className="table-responsive my-3">
                                            <table className="table table-bordered table-hover text-center">
                                              <thead
                                                className="text-light"
                                                id="tableHead"
                                              >
                                                <tr>
                                                  <th>Policy Owner</th>
                                                  <th>Monthly Benefits</th>
                                                  <th>Life Insured</th>
                                                  <th>Insurance Company</th>
                                                  <th>Name of Product</th>
                                                  <th>Policy Number</th>
                                                  <th>Operation</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {isPartnerListIncomeProtection.map(
                                                  (elem, index) => {
                                                    return (
                                                      <tr key={index}>
                                                        <td className="fw-bold">
                                                          {elem.Income_PolicyOwner}
                                                        </td>
                                                        <td>Cal</td>
                                                        <td>
                                                          {elem.Income_LifeInsured}
                                                        </td>
                                                        <td>
                                                          {
                                                            elem.Income_InsuranceCompany
                                                          }
                                                        </td>
                                                        <td>
                                                          {
                                                            elem.Income_InsuranceProduct
                                                          }
                                                        </td>
                                                        <td>
                                                          {elem.Income_PolicyNumber}
                                                        </td>
                                                        <td>
                                                          <button
                                                            type="button"
                                                            onClick={(e) => {
                                                              PartnerListIncomeProtectionDeleteHandler(
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
                                                              PartnerListIncomeProtectionUpdateHandler(
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
                                                  }
                                                )}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  {/* 1 row */}

                                  {/* Partner List Protection end */}
                                  <Modal
                                    show={Partner_PersonalInsuranceCovershow}
                                    onHide={Partner_PersonalInsuranceCoverhandleClose}
                                    backdrop="static"
                                    className="modal-lg"
                                    keyboard={false}
                                  >
                                    <Modal.Header
                                      className="text-light modalBG "
                                      closeButton
                                    >
                                      <Modal.Title className="fontStyle">
                                        Life / TPD / Trauma
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
                                        PartnerLifeTPDUpdateFlag
                                          ? PartnerListLifeTPDTOUpdate[0]
                                          : Partner_initialValues
                                      }
                                      validationSchema={ClientLife_validationSchema}
                                      onSubmit={Partner_onSubmit_Life}
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
                                            {/* Australian Share Market Form */}

                                            {/* Solicitor */}
                                            <div className=" ">
                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsurancePolicyNO1"
                                                    className="form-label"
                                                  >
                                                    Policy#
                                                  </label>
                                                </div>
                                                <div className="col-6">
                                                  <Field
                                                    type="number"
                                                    className="form-control shadow inputDesign"
                                                    readOnly
                                                    id="PersonalInsurancePolicyNO1"
                                                    name="PersonalInsurancePolicyNO1"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="PersonalInsurancePolicyNO1"
                                                  />
                                                </div>
                                              </div>

                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label className="form-label">
                                                    Life
                                                  </label>
                                                  {/* switch button style */}
                                                </div>
                                                <div className="col-6">
                                                  <div className="form-check form-switch m-0 p-0 ">
                                                    <div className="radiobutton">
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsuranceLifeRadio"
                                                        id="PersonalInsuranceLifeOpt1"
                                                        value="Yes"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsuranceLifeRadio ===
                                                          "Yes"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsuranceLifeOpt1"
                                                        className="label1"
                                                      >
                                                        <span>YES</span>
                                                      </label>
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsuranceLifeRadio"
                                                        id="PersonalInsuranceLifeOpt2"
                                                        value="No"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsuranceLifeRadio ===
                                                          "No"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsuranceLifeOpt2"
                                                        className="label2"
                                                      >
                                                        <span>NO</span>
                                                      </label>
                                                    </div>
                                                  </div>
                                                  {values.PersonalInsuranceLifeRadio ===
                                                    "Yes" && (
                                                      <div className="mt-4">
                                                        <Field
                                                          type="number"
                                                          name="LifeInput"
                                                          className="form-control shadow inputDesign"
                                                          placeholder="Life Insurance amount"
                                                          id="LifeInput"
                                                        />
                                                        <ErrorMessage
                                                          name="LifeInput"
                                                          component="div"
                                                          className="text-danger fw-bold"
                                                        />
                                                      </div>
                                                    )}
                                                </div>
                                              </div>

                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label className="form-label">
                                                    TPD
                                                  </label>
                                                </div>
                                                <div className="col-6">
                                                  {/* switch button style */}
                                                  <div className="form-check form-switch m-0 p-0 ">
                                                    <div className="radiobutton">
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsuranceTPDRadio"
                                                        id="PersonalInsuranceTPDOpt1"
                                                        value="Yes"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsuranceTPDRadio ===
                                                          "Yes"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsuranceTPDOpt1"
                                                        className="label1"
                                                      >
                                                        <span>YES</span>
                                                      </label>
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsuranceTPDRadio"
                                                        id="PersonalInsuranceTPDOpt2"
                                                        value="No"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsuranceTPDRadio ===
                                                          "No"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsuranceTPDOpt2"
                                                        className="label2"
                                                      >
                                                        <span>NO</span>
                                                      </label>
                                                    </div>
                                                  </div>
                                                  {values.PersonalInsuranceTPDRadio ===
                                                    "Yes" && (
                                                      <div className="mt-4">
                                                        <Field
                                                          type="number"
                                                          name="TPDInput"
                                                          className="form-control shadow inputDesign"
                                                          placeholder="TPD Insurance amount"
                                                          id="TPDInput"
                                                        />
                                                        <ErrorMessage
                                                          name="TPDInput"
                                                          component="div"
                                                          className="text-danger fw-bold"
                                                        />
                                                      </div>
                                                    )}
                                                </div>
                                              </div>

                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label className="form-label">
                                                    Trauma
                                                  </label>
                                                </div>
                                                <div className="col-6">
                                                  {/* switch button style */}
                                                  <div className="form-check form-switch m-0 p-0 ">
                                                    <div className="radiobutton">
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsuranceTraumaRadio"
                                                        id="PersonalInsuranceTraumaOpt1"
                                                        value="Yes"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsuranceTraumaRadio ===
                                                          "Yes"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsuranceTraumaOpt1"
                                                        className="label1"
                                                      >
                                                        <span>YES</span>
                                                      </label>
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsuranceTraumaRadio"
                                                        id="PersonalInsuranceTraumaOpt2"
                                                        value="No"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsuranceTraumaRadio ===
                                                          "No"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsuranceTraumaOpt2"
                                                        className="label2"
                                                      >
                                                        <span>NO</span>
                                                      </label>
                                                    </div>
                                                  </div>
                                                  {values.PersonalInsuranceTraumaRadio ===
                                                    "Yes" && (
                                                      <div className="mt-4">
                                                        <Field
                                                          type="number"
                                                          name="TraumaInput"
                                                          className="form-control shadow inputDesign"
                                                          placeholder="Trauma Insurance amount"
                                                          id="TraumaInput"
                                                        />
                                                        <ErrorMessage
                                                          name="TraumaInput"
                                                          component="div"
                                                          className="text-danger fw-bold"
                                                        />
                                                      </div>
                                                    )}
                                                </div>
                                              </div>

                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsurancePolicyOwner"
                                                    className="form-label"
                                                  >
                                                    Policy Owner
                                                  </label>
                                                </div>
                                                <div className="col-6">
                                                  <Field
                                                    as="select"
                                                    name="PersonalInsurancePolicyOwner"
                                                    id="PersonalInsurancePolicyOwner"
                                                    className="form-select shadow  inputDesign"
                                                  >
                                                    <option value="">Select</option>
                                                    <option value="SMSF">SMSF</option>
                                                    <option value="Superannuation Fund">
                                                      Superannuation Fund
                                                    </option>
                                                    <option value="Super Trustee">
                                                      Super Trustee
                                                    </option>
                                                    <option value="Client">
                                                      Client
                                                    </option>
                                                  </Field>
                                                  <ErrorMessage
                                                    name="PersonalInsurancePolicyOwner"
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                  />
                                                </div>
                                              </div>

                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsuranceLifeInsured"
                                                    className="form-label"
                                                  >
                                                    Life Insured
                                                  </label>
                                                </div>
                                                <div className="col-6">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    placeholder="Life Insured"
                                                    id="PersonalInsuranceLifeInsured"
                                                    name="PersonalInsuranceLifeInsured"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="PersonalInsuranceLifeInsured"
                                                  />
                                                </div>
                                              </div>

                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsuranceInsuranceCompany"
                                                    className="form-label"
                                                  >
                                                    Insurance Company
                                                  </label>
                                                </div>
                                                <div className="col-6">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    placeholder="Insurance Company"
                                                    id="PersonalInsuranceInsuranceCompany"
                                                    name="PersonalInsuranceInsuranceCompany"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="PersonalInsuranceInsuranceCompany"
                                                  />
                                                </div>
                                              </div>

                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsuranceProductName"
                                                    className="form-label"
                                                  >
                                                    Name of Product
                                                  </label>
                                                </div>
                                                <div className="col-6">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    placeholder="Product Name"
                                                    id="PersonalInsuranceProductName"
                                                    name="PersonalInsuranceProductName"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="PersonalInsuranceProductName"
                                                  />
                                                </div>
                                              </div>

                                              <div className="row mb-3 ">
                                                <div className="col-6 ">
                                                  <label
                                                    htmlFor="PersonalInsurancePolicySrNo"
                                                    className="form-label"
                                                  >
                                                    Policy No.
                                                  </label>
                                                </div>
                                                <div className="col-6">
                                                  <Field
                                                    type="number"
                                                    className="form-control shadow inputDesign"
                                                    placeholder="Policy No"
                                                    id="PersonalInsurancePolicySrNo"
                                                    name="PersonalInsurancePolicySrNo"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="PersonalInsurancePolicySrNo"
                                                  />
                                                </div>
                                              </div>

                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsuranceCommencedDate"
                                                    className="form-label"
                                                  >
                                                    Date Commenced
                                                  </label>
                                                </div>
                                                <div className="col-6">
                                                  <div>
                                                    <DatePicker
                                                      className="form-control inputDesign shadow"
                                                      showIcon
                                                      id="PersonalInsuranceCommencedDate"
                                                      name="PersonalInsuranceCommencedDate"
                                                      selected={
                                                        values.PersonalInsuranceCommencedDate
                                                      }
                                                      onChange={(date) =>
                                                        setFieldValue(
                                                          "PersonalInsuranceCommencedDate",
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
                                                    name="PersonalInsuranceCommencedDate"
                                                  />
                                                </div>
                                              </div>

                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsuranceRenewalDate"
                                                    className="form-label"
                                                  >
                                                    Renewal Date
                                                  </label>
                                                </div>
                                                <div className="col-6">
                                                  <div>
                                                    <DatePicker
                                                      className="form-control inputDesign shadow"
                                                      showIcon
                                                      id="PersonalInsuranceRenewalDate"
                                                      name="PersonalInsuranceRenewalDate"
                                                      selected={
                                                        values.PersonalInsuranceRenewalDate
                                                      }
                                                      onChange={(date) =>
                                                        setFieldValue(
                                                          "PersonalInsuranceRenewalDate",
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
                                                    name="PersonalInsuranceRenewalDate"
                                                  />
                                                </div>
                                              </div>

                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label className="form-label">
                                                    client life Smoker
                                                  </label>
                                                </div>
                                                <div className="col-6">
                                                  <div className="">
                                                    <div
                                                      id="YesSmokerID_Life"
                                                      className=" selectedimage"
                                                      onClick={() =>
                                                        client_Life_smokerHandler(
                                                          true
                                                        )
                                                      }
                                                    >
                                                      <img
                                                        className="img-fluid imgPerson"
                                                        htmlFor="YesSmokerID_Life"
                                                        src={smoking}
                                                        alt=""
                                                      />
                                                    </div>

                                                    <div
                                                      id="notSmokingID_Life"
                                                      className="mx-1 notSelectedimage  "
                                                      onClick={() =>
                                                        client_Life_smokerHandler(
                                                          false
                                                        )
                                                      }
                                                    >
                                                      <img
                                                        className=" img-fluid imgPerson"
                                                        htmlFor="notSmokingID_Life"
                                                        src={notsmoking}
                                                        alt=""
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsurancePremiumPA"
                                                    className="form-label"
                                                  >
                                                    Premium P.A.
                                                  </label>
                                                </div>
                                                <div className="col-6">
                                                  <Field
                                                    type="number"
                                                    className="form-control shadow inputDesign"
                                                    placeholder="Premium P.A."
                                                    id="PersonalInsurancePremiumPA"
                                                    name="PersonalInsurancePremiumPA"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="PersonalInsurancePremiumPA"
                                                  />
                                                </div>
                                              </div>

                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsurancePremiumType"
                                                    className="form-label"
                                                  >
                                                    Premium Type
                                                  </label>
                                                </div>
                                                <div className="col-6">
                                                  <Field
                                                    as="select"
                                                    name="PersonalInsurancePremiumType"
                                                    id="PersonalInsurancePremiumType"
                                                    className="form-select shadow  inputDesign"
                                                  >
                                                    <option value="">Select</option>
                                                    <option value="Level">
                                                      Level
                                                    </option>
                                                    <option value="Stepped">
                                                      Stepped
                                                    </option>
                                                    <option value="Other">
                                                      Other
                                                    </option>
                                                  </Field>
                                                  <ErrorMessage
                                                    name="PersonalInsurancePremiumType"
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                  />
                                                </div>
                                              </div>

                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label className="form-label">
                                                    Indexed to CPI?
                                                  </label>
                                                </div>
                                                {/* switch button style */}
                                                <div className="col-6">
                                                  <div className="form-check form-switch m-0 p-0 ">
                                                    <div className="radiobutton">
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsuranceCPIIndexedRadio"
                                                        id="PersonalInsuranceCPIIndexedOpt1"
                                                        value="Yes"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsuranceCPIIndexedRadio ===
                                                          "Yes"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsuranceCPIIndexedOpt1"
                                                        className="label1"
                                                      >
                                                        <span>YES</span>
                                                      </label>
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsuranceCPIIndexedRadio"
                                                        id="PersonalInsuranceCPIIndexedOpt2"
                                                        value="No"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsuranceCPIIndexedRadio ===
                                                          "No"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsuranceCPIIndexedOpt2"
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
                                                  <label className="form-label">
                                                    Superannuation Policy?
                                                  </label>
                                                </div>
                                                <div className="col-6">
                                                  {/* switch button style */}
                                                  <div className="form-check form-switch m-0 p-0 ">
                                                    <div className="radiobutton">
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsuranceSuperannuationRadio"
                                                        id="PersonalInsuranceSuperannuationOpt1"
                                                        value="Yes"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsuranceSuperannuationRadio ===
                                                          "Yes"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsuranceSuperannuationOpt1"
                                                        className="label1"
                                                      >
                                                        <span>YES</span>
                                                      </label>
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsuranceSuperannuationRadio"
                                                        id="PersonalInsuranceSuperannuationOpt2"
                                                        value="No"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsuranceSuperannuationRadio ===
                                                          "No"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsuranceSuperannuationOpt2"
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
                                                  <label className="form-label">
                                                    Continuation Option?
                                                  </label>
                                                </div>
                                                <div className="col-6">
                                                  {/* switch button style */}
                                                  <div className="form-check form-switch m-0 p-0 ">
                                                    <div className="radiobutton">
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsuranceContinuationRadio"
                                                        id="PersonalInsuranceContinuationOpt1"
                                                        value="Yes"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsuranceContinuationRadio ===
                                                          "Yes"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsuranceContinuationOpt1"
                                                        className="label1"
                                                      >
                                                        <span>YES</span>
                                                      </label>
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsuranceContinuationRadio"
                                                        id="PersonalInsuranceContinuationOpt2"
                                                        value="No"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsuranceContinuationRadio ===
                                                          "No"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsuranceContinuationOpt2"
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
                                                  <label className="form-label">
                                                    Any Loading Or Exclusions
                                                  </label>
                                                </div>
                                                <div className="col-6">
                                                  {/* switch button style */}
                                                  <div className="form-check form-switch m-0 p-0 ">
                                                    <div className="radiobutton">
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsuranceLoadingRadio"
                                                        id="PersonalInsuranceLoadingOpt1"
                                                        value="Yes"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsuranceLoadingRadio ===
                                                          "Yes"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsuranceLoadingOpt1"
                                                        className="label1"
                                                      >
                                                        <span>YES</span>
                                                      </label>
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsuranceLoadingRadio"
                                                        id="PersonalInsuranceLoadingOpt2"
                                                        value="No"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsuranceLoadingRadio ===
                                                          "No"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsuranceLoadingOpt2"
                                                        className="label2"
                                                      >
                                                        <span>NO</span>
                                                      </label>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              {values.PersonalInsuranceLoadingRadio ===
                                                "Yes" && (
                                                  <div className="row">
                                                    {" "}
                                                    <div className="col-6">
                                                      <label
                                                        htmlFor="PersonalInsuranceLoadingDescription1"
                                                        className="form-label"
                                                      >
                                                        Description
                                                      </label>
                                                    </div>
                                                    <div
                                                      className="col-6"
                                                      id="PersonalInsuranceLoadingDescription1"
                                                    >
                                                      <Field
                                                        as="textarea"
                                                        className="form-control shadow inputDesign"
                                                        id="PersonalInsuranceLoadingDescription1"
                                                        name="PersonalInsuranceLoadingDescription1"
                                                        placeholder="Description"
                                                      />
                                                      <ErrorMessage
                                                        component="div"
                                                        className="text-danger fw-bold"
                                                        name="PersonalInsuranceLoadingDescription1"
                                                      />
                                                    </div>
                                                  </div>
                                                )}
                                            </div>
                                            {/* Solicitor */}

                                            {/*Australian Share Detail Form */}
                                          </Modal.Body>
                                          <Modal.Footer>
                                            <div className="col-md-12">
                                              <button
                                                className="float-end btn w-25  bgColor modalBtn"
                                                // onClick={PersonalInsuranceCoverhandleClose}
                                                type="submit"
                                              >
                                                Save
                                              </button>
                                              <button
                                                type="button"
                                                className="float-end btn w-25  btn-outline  backBtn mx-3"
                                                onClick={
                                                  PersonalInsuranceCoverhandleClose
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
                                  {/* Partner List Protection end */}

                                  {/* Partner  Income Protection*/}
                                  <Modal
                                    show={Partner_PersonalInsuranceCovershow2}
                                    onHide={
                                      Partner_PersonalInsuranceCover2handleClose
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
                                        Income Protection
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
                                        PartnerIncomeProtectionUpdateFlag
                                          ? PartnerListIncomeProtectionUpdate[0]
                                          : Partner_initialValues
                                      }
                                      // partnerIncome
                                      validationSchema={ClientIncome_validationSchema}
                                      onSubmit={Partner_onSubmit_Income}
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
                                            {/* Australian Share Market Form */}

                                            {/* Solicitor */}
                                            <div className=" ">
                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsurance2PolicyNO1"
                                                    className="form-label"
                                                  >
                                                    Policy# C2
                                                  </label>
                                                </div>

                                                <div className="col-6">
                                                  <Field
                                                    type="number"
                                                    className="form-control shadow inputDesign "
                                                    readOnly
                                                    id="PersonalInsurance2PolicyNO1"
                                                    name="PersonalInsurance2PolicyNO1"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="PersonalInsurance2PolicyNO1"
                                                  />
                                                </div>
                                              </div>

                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsurance2PolicyOwner"
                                                    className="form-label"
                                                  >
                                                    Policy Owner
                                                  </label>
                                                </div>

                                                <div className="col-6">
                                                  <Field
                                                    as="select"
                                                    name="PersonalInsurance2PolicyOwner"
                                                    id="PersonalInsurance2PolicyOwner"
                                                    className="form-select shadow  inputDesign"
                                                  >
                                                    <option value="">Select</option>
                                                    <option value="SMSF">SMSF</option>
                                                    <option value="Superannuation Fund">
                                                      Superannuation Fund
                                                    </option>
                                                    <option value="Super Trustee">
                                                      Super Trustee
                                                    </option>
                                                    <option value="Client">
                                                      Client
                                                    </option>
                                                  </Field>
                                                  <ErrorMessage
                                                    name="PersonalInsurance2PolicyOwner"
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                  />
                                                </div>
                                              </div>
                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsurance2LifeInsured"
                                                    className="form-label"
                                                  >
                                                    Life Insured
                                                  </label>
                                                </div>

                                                <div className="col-6">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    placeholder="Life Insured"
                                                    id="PersonalInsurance2LifeInsured"
                                                    name="PersonalInsurance2LifeInsured"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="PersonalInsurance2LifeInsured"
                                                  />
                                                </div>
                                              </div>
                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsurance2InsuranceCompany"
                                                    className="form-label"
                                                  >
                                                    Insurance Company
                                                  </label>
                                                </div>

                                                <div className="col-6">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    placeholder="Insurance Company"
                                                    id="PersonalInsurance2InsuranceCompany"
                                                    name="PersonalInsurance2InsuranceCompany"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="PersonalInsurance2InsuranceCompany"
                                                  />
                                                </div>
                                              </div>
                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsurance2ProductName"
                                                    className="form-label"
                                                  >
                                                    Name of Product
                                                  </label>
                                                </div>

                                                <div className="col-6">
                                                  <Field
                                                    type="text"
                                                    className="form-control shadow inputDesign"
                                                    placeholder="Product Name"
                                                    id="PersonalInsurance2ProductName"
                                                    name="PersonalInsurance2ProductName"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="PersonalInsurance2ProductName"
                                                  />
                                                </div>
                                              </div>
                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsurance2PolicySrNo"
                                                    className="form-label"
                                                  >
                                                    Policy No.
                                                  </label>
                                                </div>

                                                <div className="col-6">
                                                  <Field
                                                    type="number"
                                                    className="form-control shadow inputDesign"
                                                    placeholder="Policy No"
                                                    id="PersonalInsurance2PolicySrNo"
                                                    name="PersonalInsurance2PolicySrNo"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="PersonalInsurance2PolicySrNo"
                                                  />
                                                </div>
                                              </div>
                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsurance2CommencedDate"
                                                    className="form-label"
                                                  >
                                                    Date Commenced
                                                  </label>
                                                </div>

                                                <div className="col-6">
                                                  <div>
                                                    <DatePicker
                                                      className="form-control inputDesign shadow"
                                                      showIcon
                                                      id="PersonalInsurance2CommencedDate"
                                                      name="PersonalInsurance2CommencedDate"
                                                      selected={
                                                        values.PersonalInsurance2CommencedDate
                                                      }
                                                      onChange={(date) =>
                                                        setFieldValue(
                                                          "PersonalInsurance2CommencedDate",
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
                                                    name="PersonalInsurance2CommencedDate"
                                                  />
                                                </div>
                                              </div>
                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsurance2RenewalDate"
                                                    className="form-label"
                                                  >
                                                    Renewal Date
                                                  </label>
                                                </div>

                                                <div className="col-6">
                                                  <div>
                                                    <DatePicker
                                                      className="form-control inputDesign shadow"
                                                      showIcon
                                                      id="PersonalInsurance2RenewalDate"
                                                      name="PersonalInsurance2RenewalDate"
                                                      selected={
                                                        values.PersonalInsurance2RenewalDate
                                                      }
                                                      onChange={(date) =>
                                                        setFieldValue(
                                                          "PersonalInsurance2RenewalDate",
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
                                                    name="PersonalInsurance2RenewalDate"
                                                  />
                                                </div>
                                              </div>
                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label className="form-label">
                                                    Smoker
                                                  </label>
                                                </div>

                                                <div className="col-6">
                                                  <div className="">
                                                    <div
                                                      id="YesSmokerID"
                                                      className=" selectedimage"
                                                      onClick={() =>
                                                        smokerHandler("smoker")
                                                      }
                                                    >
                                                      <img
                                                        className="img-fluid imgPerson"
                                                        htmlFor="YesSmokerID"
                                                        src={smoking}
                                                        alt=""
                                                      />
                                                    </div>

                                                    <div
                                                      id="notSmokingID"
                                                      className="mx-1 notSelectedimage  "
                                                      onClick={() =>
                                                        smokerHandler("notSmoker")
                                                      }
                                                    >
                                                      <img
                                                        className=" img-fluid imgPerson"
                                                        htmlFor="notSmokingID"
                                                        src={notsmoking}
                                                        alt=""
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsurance2MonthlyBenefit"
                                                    className="form-label"
                                                  >
                                                    Monthly Benefit
                                                  </label>
                                                </div>

                                                <div className="col-6">
                                                  <Field
                                                    type="number"
                                                    className="form-control shadow inputDesign"
                                                    placeholder="Monthly Benefit"
                                                    id="PersonalInsurance2MonthlyBenefit"
                                                    name="PersonalInsurance2MonthlyBenefit"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="PersonalInsurance2MonthlyBenefit"
                                                  />
                                                </div>
                                              </div>
                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsurance2SuperContinuance"
                                                    className="form-label"
                                                  >
                                                    Super Continuance Amount (monthly)
                                                  </label>
                                                </div>

                                                <div className="col-6">
                                                  <Field
                                                    type="number"
                                                    className="form-control shadow inputDesign"
                                                    placeholder="Super Continuance Amount"
                                                    id="PersonalInsurance2SuperContinuance"
                                                    name="PersonalInsurance2SuperContinuance"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="PersonalInsurance2SuperContinuance"
                                                  />
                                                </div>
                                              </div>
                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsurance2WaitingPeriod"
                                                    className="form-label"
                                                  >
                                                    Waiting Period
                                                  </label>
                                                </div>

                                                <div className="col-6">
                                                  <Field
                                                    as="select"
                                                    name="PersonalInsurance2WaitingPeriod"
                                                    id="PersonalInsurance2WaitingPeriod"
                                                    className="form-select shadow  inputDesign"
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
                                                    <option value="1 Year">
                                                      1 Year
                                                    </option>
                                                    <option value="2 Year">
                                                      2 Year
                                                    </option>
                                                  </Field>
                                                  <ErrorMessage
                                                    name="PersonalInsurance2WaitingPeriod"
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                  />
                                                </div>
                                              </div>
                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsurance2BenefitPeriod"
                                                    className="form-label"
                                                  >
                                                    Benefit Period
                                                  </label>
                                                </div>

                                                <div className="col-6">
                                                  <Field
                                                    as="select"
                                                    name="PersonalInsurance2BenefitPeriod"
                                                    id="PersonalInsurance2BenefitPeriod"
                                                    className="form-select shadow  inputDesign"
                                                  >
                                                    <option value="">Select</option>
                                                    <option value="1 Year">
                                                      1 Year
                                                    </option>
                                                    <option value="2 Year">
                                                      2 Year
                                                    </option>
                                                    <option value="5 Year">
                                                      5 Year
                                                    </option>
                                                    <option value="Until Age 60">
                                                      Until Age 60
                                                    </option>
                                                    <option value="Until Age 65">
                                                      Until Age 65
                                                    </option>
                                                    <option value="Until Age 67">
                                                      Until Age 67
                                                    </option>
                                                    <option value="Until Age 70">
                                                      Until Age 70
                                                    </option>
                                                  </Field>
                                                  <ErrorMessage
                                                    name="PersonalInsurance2BenefitPeriod"
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                  />
                                                </div>
                                              </div>
                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsurance2IndemnityPeriod"
                                                    className="form-label"
                                                  >
                                                    Agreed or Indemnity?
                                                  </label>
                                                </div>

                                                <div className="col-6">
                                                  <Field
                                                    as="select"
                                                    name="PersonalInsurance2IndemnityPeriod"
                                                    id="PersonalInsurance2IndemnityPeriod"
                                                    className="form-select shadow  inputDesign"
                                                  >
                                                    <option value="">Select</option>
                                                    <option value="Agreed">
                                                      Agreed
                                                    </option>
                                                    <option value="Indemnity">
                                                      Indemnity
                                                    </option>
                                                  </Field>
                                                  <ErrorMessage
                                                    name="PersonalInsurance2IndemnityPeriod"
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                  />
                                                </div>
                                              </div>
                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsurance2PremiumPA"
                                                    className="form-label"
                                                  >
                                                    Premium P.A.
                                                  </label>
                                                </div>

                                                <div className="col-6">
                                                  <Field
                                                    type="number"
                                                    className="form-control shadow inputDesign"
                                                    placeholder="Premium P.A."
                                                    id="PersonalInsurance2PremiumPA"
                                                    name="PersonalInsurance2PremiumPA"
                                                  />
                                                  <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="PersonalInsurance2PremiumPA"
                                                  />
                                                </div>
                                              </div>
                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label
                                                    htmlFor="PersonalInsurance2PremiumType"
                                                    className="form-label"
                                                  >
                                                    Premium Type
                                                  </label>
                                                </div>

                                                <div className="col-6">
                                                  <Field
                                                    as="select"
                                                    name="PersonalInsurance2PremiumType"
                                                    id="PersonalInsurance2PremiumType"
                                                    className="form-select shadow  inputDesign"
                                                  >
                                                    <option value="">Select</option>
                                                    <option value="Level">
                                                      Level
                                                    </option>
                                                    <option value="Stepped">
                                                      Stepped
                                                    </option>
                                                    <option value="Other">
                                                      Other
                                                    </option>
                                                  </Field>
                                                  <ErrorMessage
                                                    name="PersonalInsurance2PremiumType"
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                  />
                                                </div>
                                              </div>
                                              <div className="row mb-3">
                                                <div className="col-6">
                                                  <label className="form-label">
                                                    Superannuation Policy?
                                                  </label>
                                                </div>

                                                <div className="col-md-6">
                                                  {/* switch button style */}
                                                  <div className="form-check form-switch m-0 p-0 ">
                                                    <div className="radiobutton">
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsurance2SuperannuationRadio"
                                                        id="PersonalInsurance2SuperannuationOpt1"
                                                        value="Yes"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsurance2SuperannuationRadio ===
                                                          "Yes"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsurance2SuperannuationOpt1"
                                                        className="label1"
                                                      >
                                                        <span>YES</span>
                                                      </label>
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsurance2SuperannuationRadio"
                                                        id="PersonalInsurance2SuperannuationOpt2"
                                                        value="No"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsurance2SuperannuationRadio ===
                                                          "No"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsurance2SuperannuationOpt2"
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
                                                  <label className="form-label">
                                                    Accident Option?
                                                  </label>
                                                </div>

                                                <div className="col-6">
                                                  {/* switch button style */}
                                                  <div className="form-check form-switch m-0 p-0 ">
                                                    <div className="radiobutton">
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsurance2AccidentRadio"
                                                        id="PersonalInsurance2AccidentOpt1"
                                                        value="Yes"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsurance2AccidentRadio ===
                                                          "Yes"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsurance2AccidentOpt1"
                                                        className="label1"
                                                      >
                                                        <span>YES</span>
                                                      </label>
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsurance2AccidentRadio"
                                                        id="PersonalInsurance2AccidentOpt2"
                                                        value="No"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsurance2AccidentRadio ===
                                                          "No"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsurance2AccidentOpt2"
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
                                                  <label className="form-label">
                                                    Increasing Claims Option?
                                                  </label>
                                                </div>

                                                <div className="col-6">
                                                  {/* switch button style */}
                                                  <div className="form-check form-switch m-0 p-0 ">
                                                    <div className="radiobutton">
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsurance2IncreasingClaimsRadio"
                                                        id="PersonalInsurance2IncreasingClaimsOpt1"
                                                        value="Yes"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsurance2IncreasingClaimsRadio ===
                                                          "Yes"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsurance2IncreasingClaimsOpt1"
                                                        className="label1"
                                                      >
                                                        <span>YES</span>
                                                      </label>
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsurance2IncreasingClaimsRadio"
                                                        id="PersonalInsurance2IncreasingClaimsOpt2"
                                                        value="No"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsurance2IncreasingClaimsRadio ===
                                                          "No"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsurance2IncreasingClaimsOpt2"
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
                                                  <label className="form-label">
                                                    TPD Option?
                                                  </label>
                                                </div>

                                                <div className="col-6">
                                                  {/* switch button style */}
                                                  <div className="form-check form-switch m-0 p-0 ">
                                                    <div className="radiobutton">
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsurance2TPDRadio"
                                                        id="PersonalInsurance2TPDOpt1"
                                                        value="Yes"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsurance2TPDRadio ===
                                                          "Yes"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsurance2TPDOpt1"
                                                        className="label1"
                                                      >
                                                        <span>YES</span>
                                                      </label>
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsurance2TPDRadio"
                                                        id="PersonalInsurance2TPDOpt2"
                                                        value="No"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsurance2TPDRadio ===
                                                          "No"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsurance2TPDOpt2"
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
                                                  <label className="form-label">
                                                    Is the benefit indexed?
                                                  </label>
                                                </div>

                                                <div className="col-6">
                                                  {/* switch button style */}
                                                  <div className="form-check form-switch m-0 p-0 ">
                                                    <div className="radiobutton">
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsurance2BenefitIndexedRadio"
                                                        id="PersonalInsurance2BenefitIndexedOpt1"
                                                        value="Yes"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsurance2BenefitIndexedRadio ===
                                                          "Yes"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsurance2BenefitIndexedOpt1"
                                                        className="label1"
                                                      >
                                                        <span>YES</span>
                                                      </label>
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsurance2BenefitIndexedRadio"
                                                        id="PersonalInsurance2BenefitIndexedOpt2"
                                                        value="No"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsurance2BenefitIndexedRadio ===
                                                          "No"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsurance2BenefitIndexedOpt2"
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
                                                  <label className="form-label">
                                                    Any Loading Or Exclusions
                                                  </label>
                                                </div>

                                                <div className="col-6">
                                                  {/* switch button style */}
                                                  <div className="form-check form-switch m-0 p-0 ">
                                                    <div className="radiobutton">
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsurance2LoadingRadio"
                                                        id="PersonalInsurance2LoadingOpt1"
                                                        value="Yes"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsurance2LoadingRadio ===
                                                          "Yes"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsurance2LoadingOpt1"
                                                        className="label1"
                                                      >
                                                        <span>YES</span>
                                                      </label>
                                                      <input
                                                        type="radio"
                                                        name="PersonalInsurance2LoadingRadio"
                                                        id="PersonalInsurance2LoadingOpt2"
                                                        value="No"
                                                        onChange={handleChange}
                                                        checked={
                                                          values.PersonalInsurance2LoadingRadio ===
                                                          "No"
                                                        }
                                                      />
                                                      <label
                                                        htmlFor="PersonalInsurance2LoadingOpt2"
                                                        className="label2"
                                                      >
                                                        <span>NO</span>
                                                      </label>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              {values.PersonalInsurance2LoadingRadio ===
                                                "Yes" && (
                                                  <div className="row mb-3">
                                                    <div className="col-6">
                                                      <label
                                                        htmlFor="PersonalInsurance2LoadingDescription2"
                                                        className="form-label"
                                                      >
                                                        Description
                                                      </label>
                                                    </div>

                                                    <div
                                                      className="col-md-6"
                                                      id="PersonalInsurance2LoadingDescription2"
                                                    >
                                                      <Field
                                                        as="textarea"
                                                        className="form-control shadow inputDesign"
                                                        id="PersonalInsurance2LoadingDescription2"
                                                        name="PersonalInsurance2LoadingDescription2"
                                                        placeholder="Description"
                                                      />
                                                      <ErrorMessage
                                                        component="div"
                                                        className="text-danger fw-bold"
                                                        name="PersonalInsurance2LoadingDescription2"
                                                      />
                                                    </div>
                                                  </div>
                                                )}
                                            </div>
                                            {/* Solicitor */}

                                            {/*Australian Share Detail Form */}
                                          </Modal.Body>
                                          <Modal.Footer>
                                            <div className="col-md-12">
                                              <button
                                                className="float-end btn w-25  bgColor modalBtn"
                                                // onClick={PersonalInsuranceCoverhandleClose}
                                                type="submit"
                                              >
                                                Save
                                              </button>
                                              <button
                                                type="button"
                                                className="float-end btn w-25  btn-outline  backBtn mx-3"
                                                onClick={
                                                  PersonalInsuranceCover2handleClose
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
                                  {/*  Partner  Income Protection end */}

                                  {/* ---------------------------------------------------- */}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="row mb-4 mt-2">
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
                  </Form>
                )}
              </Formik>
            </Card>
          </div>
        </div>
      </div>

    </>
  );
}

export default PersonalInsurance;
