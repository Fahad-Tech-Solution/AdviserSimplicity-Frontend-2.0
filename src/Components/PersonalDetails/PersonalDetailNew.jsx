import React, { useEffect, useMemo, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Alert, Button, Card, Spin } from "antd";
import * as Yup from "yup";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CRState,
  defaultUrl,
  PersonalDetailsData,
  QuestionDetail,
  StepsStatus,
} from "../../Store/Store";
import {
  ConvertDate,
  GetAxios,
  getNestedValue,
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  toSentenceCase,
} from "../Assets/Api/Api";
import { useLocation, useNavigate } from "react-router-dom";
import DynamicTableForInputsSection from "../Assets/Table/DynamicTableForInputsSection";
import DynamicYesNo from "../Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo";
import dayjs from "dayjs";
import ProfileCard from "./ProfileCard";
import ImportantQuestion from "../Questions/ImportantQuestion/ImportantQuestion";
import ModalComponent from "../Questions/FinancialInvestments/ModalComponent";
import { differenceInYears } from "date-fns";

const childSchema = Yup.object({
  depenantChild: Yup.string()
    .oneOf(["Yes", "No"])
    .required("Dependent required"),
  name: Yup.string().required("Child name required"),
  dob: Yup.date().required("Child DOB required"),
  gender: Yup.string().required("Gender required"),
  relationship: Yup.string().required("Relationship required"),
});

const contactSchema = Yup.object({
  homeAddress: Yup.string().required("Home address is required"),
  postcodeSuburb: Yup.string()
    .typeError("PostCode must be a number")
    .required("Postcode is required"),
  SameAsAbove: Yup.boolean(),
  postalAddress: Yup.string().required("Postal address is required"),
  postalPostCode: Yup.string()
    .typeError("Postal postcode must be a number")
    .required("Postal postcode is required"),
  mobile: Yup.string()
    .matches(/^[0-9]+$/, "Mobile must be digits only")
    .required("Mobile is required"),
  homePhone: Yup.string(),
  workPhone: Yup.string(),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const personSchema = Yup.object({
  title: Yup.string().required("Required"),
  firstName: Yup.string().required("First Name is required"),
  middleName: Yup.string(),
  lastName: Yup.string().required("Last Name is required"),
  preferred: Yup.string(),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.date().required("DOB is required"),
  age: Yup.number().nullable(),
  marital: Yup.string(),
  employment: Yup.string(),
  occupation: Yup.string(),
  retAge: Yup.string(),
  smoker: Yup.string(),
  taxRes: Yup.string(),
  healthCover: Yup.string(),
  health: Yup.string(),
  helpDebt: Yup.string(),
  image: Yup.object({
    url: Yup.string().url("Must be a valid URL").nullable(),
  }),
  contact: contactSchema,
});

export const validationSchema = Yup.object({
  client: personSchema,

  // Partner is conditionally required
  partner: Yup.mixed().when("client.marital", {
    is: (marital) => marital && !["Single", "Widowed", ""].includes(marital),
    then: () => personSchema.required("Partner details required"),
    otherwise: () => Yup.mixed().notRequired(),
  }),

  haveAnyChildren: Yup.string()
    .oneOf(["Yes", "No"])
    .required("Please select Yes or No"),

  numberOfChildren: Yup.mixed().when("haveAnyChildren", {
    is: "Yes",
    then: () =>
      Yup.number()
        .typeError("Must be a number")
        .min(1, "At least 1 child required")
        .required("Number of children is required"),
    otherwise: () => Yup.number().nullable(),
  }),

  // Children required only when haveAnyChildren = Yes AND numberOfChildren > 0
  children: Yup.mixed().when(["haveAnyChildren", "numberOfChildren"], {
    is: (haveAnyChildren, numberOfChildren) =>
      haveAnyChildren === "Yes" && Number(numberOfChildren) > 0,
    then: () =>
      Yup.array()
        .of(childSchema)
        .min(1, "At least one child detail is required"),
    otherwise: () => Yup.array().notRequired(),
  }),
});

const AntdDynamicTable = DynamicTableForInputsSection("antd");

const formatDate = (date) =>
  date ? dayjs(date, ["DD/MM/YYYY", "YYYY-MM-DD"]).toISOString() : null;

const mapContactFromBackend = (contact, prefix = "client") => ({
  homeAddress: contact?.[`${prefix}HomeAddress`] || "",
  postcodeSuburb: contact?.[`${prefix}Postcode`] || "",
  SameAsAbove:
    contact?.[`${prefix}SameAsAbove`] ||
    contact?.[`${prefix}SameAsClient`] ||
    false,
  postalAddress: contact?.[`${prefix}PostalAddress`] || "",
  postalPostCode: contact?.[`${prefix}PostalPostCode`] || "",
  mobile: contact?.[`${prefix}Mobile`] || "",
  homePhone: contact?.[`${prefix}HomePhone`] || "",
  workPhone: contact?.[`${prefix}WorkPhone`] || "",
  email: contact?.[`${prefix}Email`] || contact?.Email || "",
});

const mapPersonFromBackend = (person, type) => {
  if (!person) return {};
  const prefix = type === "client" ? "client" : "partner";

  return {
    title: person?.[`${prefix}Title`] || "",
    firstName: person?.[`${prefix}GivenName`] || "",
    middleName: person?.[`${prefix}MiddleName`] || "",
    lastName: person?.[`${prefix}LastName`] || "",
    preferred: person?.[`${prefix}PreferredName`] || "",
    gender: person?.[`${prefix}Gender`] || "",
    dob: person?.[`${prefix}DOB`] ? formatDate(person[`${prefix}DOB`]) : "",
    age: person?.[`${prefix}Age`] || "",
    marital: person?.[`${prefix}MaritalStatus`] || "",
    employment: person?.[`${prefix}EmploymentStatus`] || "",
    occupation: person?.[`${prefix}OccupationID`] || "",
    retAge: person?.[`${prefix}PlannedRetirementAge`] || "",
    smoker: person?.[`${prefix}Smoker`] || "",
    taxRes: person?.[`${prefix}TaxResidentRadio`] || "",
    healthCover: person?.[`${prefix}PrivateHealthCoverRadio`] || "",
    health: person?.[`${prefix}Health`] || "",
    helpDebt: person?.[`${prefix}HELPSDebtRadio`] || "",
    image: person?.[`${prefix}.image`] || { url: "" },
    contact: mapContactFromBackend(person, prefix),
  };
};

const mapChildrenFromBackend = (children = []) =>
  children.map((child, i) => ({
    key: `child_${i}`,
    depenantChild: child?.depenantChild || "No",
    name: child?.name || "",
    gender: child?.gender || "",
    relationship: child?.relationship || "",
    dob: child?.dob ? formatDate(child.dob) : "",
  }));

const mapContactForSubmit = (contact, prefix = "client") => ({
  [`${prefix}HomeAddress`]: contact?.homeAddress || "",
  [`${prefix}Postcode`]: contact?.postcodeSuburb || "",
  [`${prefix}SameAs${prefix === "client" ? "Above" : "Client"}`]:
    contact?.SameAsAbove || false,
  [`${prefix}PostalAddress`]: contact?.postalAddress || "",
  [`${prefix}PostalPostCode`]: contact?.postalPostCode || "",
  [`${prefix}Mobile`]: contact?.mobile || "",
  [`${prefix}HomePhone`]: contact?.homePhone || "",
  [`${prefix}WorkPhone`]: contact?.workPhone || "",
  [`${prefix}Email`]: contact?.email || "",
});

const mapPersonForSubmit = (person, type) => {
  if (!person) return {};
  const prefix = type === "client" ? "client" : "partner";

  return {
    [`${prefix}Title`]: person.title,
    [`${prefix}GivenName`]: person.firstName,
    [`${prefix}MiddleName`]: person.middleName,
    [`${prefix}LastName`]: person.lastName,
    [`${prefix}PreferredName`]: person.preferred,
    [`${prefix}Gender`]: person.gender,
    [`${prefix}DOB`]: formatDate(person.dob),
    [`${prefix}Age`]: person.age,
    [`${prefix}MaritalStatus`]: person.marital,
    [`${prefix}EmploymentStatus`]: person.employment,
    [`${prefix}OccupationID`]: person.occupation,
    [`${prefix}PlannedRetirementAge`]: person.retAge,
    [`${prefix}Smoker`]: person.smoker,
    [`${prefix}TaxResidentRadio`]: person.taxRes,
    [`${prefix}PrivateHealthCoverRadio`]: person.healthCover,
    [`${prefix}Health`]: person.health,
    [`${prefix}HELPSDebtRadio`]: person.helpDebt,
    ...mapContactForSubmit(person.contact, prefix),
  };
};

const mapChildrenForSubmit = (children = []) =>
  children.map((child) => ({
    depenantChild: child.depenantChild,
    name: child.name,
    gender: child.gender,
    relationship: child.relationship,
    dob: formatDate(child.dob),
  }));

const PersonalDetailNew = () => {
  const formRef = useRef(null);
  const [switchStep, setSwitchStep] = useState(0);
  const [errorShow, setErrorShow] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLeading] = useState(false);
  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});
  const [personalDetailObj, setPersonalDetailObj] =
    useRecoilState(PersonalDetailsData);
  let [CRObjectNoUse, setCRObject] = useRecoilState(CRState);
  let [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);
  const defaultUrlValue = useRecoilValue(defaultUrl);
  const location = useLocation();
  const Nav = useNavigate();

  const initialValues = {
    client: {},
    partner: {},
    haveAnyChildren: "No",
  };

  const personalFields = [
    {
      title: "Title",
      dataIndex: "title",
      type: "select",
      options: [
        { value: "Mr", label: "Mr" },
        { value: "Mrs", label: "Mrs" },
        { value: "Ms", label: "Ms" },
        { value: "Miss", label: "Miss" },
        { value: "Dr", label: "Dr" },
        { value: "Other", label: "Other" },
      ],
      key: "title",
      CheckError: true,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      type: "text",
      key: "firstName",
      CheckError: true,
    },
    {
      title: "Middle Name",
      dataIndex: "middleName",
      type: "text",
      key: "middleName",
      CheckError: true,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      type: "text",
      key: "lastName",
      CheckError: true,
    },
    {
      title: "Preferred",
      dataIndex: "preferred",
      type: "text",
      key: "preferred",
      fixed: "left",
      CheckError: true,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      type: "select",
      options: [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Other", label: "Other" },
      ],
      key: "gender",
      CheckError: true,
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      type: "antdate",
      key: "dob",
      CheckError: true,
      callBack: true,
      func: (values, setFieldValue, thisInput, stakeHolder) => {
        const age =
          differenceInYears(new Date(), new Date(thisInput.value)) || 0;
        setFieldValue(stakeHolder + "age", age);
      },
    },
    {
      title: "Age",
      dataIndex: "age",
      type: "text",
      key: "age",
      CheckError: true,
      disabled: true,
    },
    {
      title: "Marital Status",
      dataIndex: "marital",
      type: "select",
      options: [
        { value: "Single", label: "Single" },
        { value: "Married", label: "Married" },
        { value: "De Facto", label: "De Facto" },
        { value: "Partnered", label: "Partnered" },
        { value: "Widowed", label: "Widowed" },
      ],
      key: "marital",
      CheckError: true,
    },
    {
      title: "Employment Status",
      dataIndex: "employment",
      type: "select",
      options: [
        { value: "Employee", label: "Employee" },
        { value: "Homemaker", label: "Homemaker" },
        { value: "Not Working", label: "Not Working" },
        { value: "Self-funded Retiree", label: "Self-funded Retiree" },
        { value: "Centrelink Retiree", label: "Centrelink Retiree" },
        { value: "Centrelink Recipient", label: "Centrelink Recipient" },
        { value: "Self Employed", label: "Self Employed" },
        { value: "Student", label: "Student" },
        { value: "Unemployed", label: "Unemployed" },
      ],
      key: "employment",
      CheckError: true,
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      type: "text",
      key: "occupation",
      CheckError: true,
    },
    {
      title: "Planned Retirement Age",
      dataIndex: "retAge",
      type: "text",
      key: "retAge",
      CheckError: true,
    },
    {
      title: "Health",
      dataIndex: "health",
      type: "select",
      options: [
        { value: "execlent", label: "execlent" },
        { value: "good", label: "good" },
        { value: "average", label: "average" },
        { value: "poor", label: "poor" },
      ],
      key: "health",
      CheckError: true,
    },
    {
      title: "Smoker",
      dataIndex: "smoker",
      type: "yesno",
      key: "smoker",
      width: 100,
    },
    {
      title: "Tax Resident",
      dataIndex: "taxRes",
      type: "yesno",
      key: "taxRes",
      width: 100,
    },
    {
      title: "Private Health Cover",
      dataIndex: "healthCover",
      type: "yesno",
      key: "healthCover",
      width: 100,
    },
    {
      title: "HELP Debt",
      dataIndex: "helpDebt",
      type: "yesno",
      key: "helpDebt",
      width: 100,
    },
  ];

  const contactFields = [
    {
      title: "Name",
      dataIndex: "preferred",
      type: "text",
      key: "owner",
      fixed: "left",
      CheckError: true,
    },
    {
      title: "Home Address",
      dataIndex: "homeAddress",
      type: "text",
      key: "homeAddress",
      CheckError: true,
    },
    {
      title: "Postcode/Suburb",
      dataIndex: "postcodeSuburb",
      type: "postcode-antd",
      key: "postcodeSuburb",
      width: 200,
      CheckError: true,
    },
    {
      title: "Postal Address",
      dataIndex: "postalAddress",
      type: "postal-with-checkbox",
      key: "postalAddress",
      width: 230,
      CheckError: true,
      disabled: (values, stakeHolder) =>
        getNestedValue(values, `${stakeHolder}SameAsAbove`) === true, // 👈 use stakeHolderF
      checkCallBack: true,
      checkfunc: (values, setFieldValue, thisInput, stakeHolder) => {
        const homeAddress = getNestedValue(values, `${stakeHolder}homeAddress`);
        const postcodeSuburb = getNestedValue(
          values,
          `${stakeHolder}postcodeSuburb`
        );

        console.log("stakeHolder:", stakeHolder);
        console.log("homeAddress:", homeAddress);
        console.log("postcodeSuburb:", postcodeSuburb);
        console.log("checked:", thisInput.checked);

        if (thisInput.checked) {
          setFieldValue(`${stakeHolder}postalAddress`, homeAddress || "");
          setFieldValue(`${stakeHolder}postalPostCode`, postcodeSuburb || "");
        }
      },
    },
    {
      title: "Postcode/Suburb",
      dataIndex: "postalPostCode",
      type: "postcode-antd",
      key: "postalPostCode",
      width: 200,

      disabled: (values, stakeHolder) => {
        return getNestedValue(values, `${stakeHolder}SameAsAbove`) === true;
      },
      CheckError: true,
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile",
      type: "text",
      key: "mobile",
      CheckError: true,
    },
    {
      title: "Home Phone",
      dataIndex: "homePhone",
      type: "text",
      key: "homePhone",
      CheckError: true,
    },
    {
      title: "Work Phone",
      dataIndex: "workPhone",
      type: "text",
      key: "workPhone",
      CheckError: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      type: "text",
      key: "email",
      width: 230,
      fixed: "right",
      CheckError: true,
    },
  ];

  const childrenFields = [
    {
      title: "Name",
      dataIndex: "name",
      type: "text",
      key: "name",
      fixed: "left",
      CheckError: true,
    },
    {
      title: "DOB",
      dataIndex: "dob",
      type: "antdate",
      key: "dob",
      CheckError: true,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      type: "select",
      options: [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Other", label: "Other" },
      ],
      key: "gender",
      CheckError: true,
    },
    {
      title: "Add in Relation",
      dataIndex: "relationship",
      type: "select",
      options: [
        { value: "Son", label: "Son" },
        { value: "Daughter", label: "Daughter" },
        { value: "Step Daughter", label: "Step Daughter" },
        { value: "Step Son", label: "Step Son" },
      ],
      key: "relationship",
      CheckError: true,
    },
    {
      title: "Add in is Child Depenant",
      dataIndex: "depenantChild",
      type: "yesno",
      key: "depenantChild",
      CheckError: true,
    },
  ];

  const getApiFunction = async (id) => {
    setLeading(true);
    try {
      const res = await GetAxios(
        `${defaultUrlValue}/api/personalDetails/getUserById/${id}`
      );
      if (res) {
        // console.log(res);
        setPersonalDetailObj(res);
        setUserData(res);
        localStorage.setItem("UserID", res._id);
        localStorage.setItem("UserName", res.client.clientPreferredName);
        localStorage.setItem("Email", res.client?.Email || "");
        localStorage.setItem(
          "UserStatus",
          ["Single", "Widowed"].includes(res.client.clientMaritalStatus)
            ? "Single"
            : "Married"
        );
        if (res.partner?.partnerPreferredName) {
          localStorage.setItem("PartnerName", res.partner.partnerPreferredName);
        }
        // console.log(res);
        setSwitchStep(2);
      }
    } catch (error) {
      console.error("❌ Error in API:", error);
      setErrorShow(true);
    } finally {
      setLeading(false);
    }
  };

  const storeData = (setFieldValue) => {
    try {
      if (!personalDetailObj?._id) return;

      setFieldValue(
        "client",
        mapPersonFromBackend(personalDetailObj.client, "client")
      );

      const marital = personalDetailObj.client?.clientMaritalStatus;
      if (marital && !["Single", "Widowed"].includes(marital)) {
        setFieldValue(
          "partner",
          mapPersonFromBackend(personalDetailObj.partner, "partner")
        );
      }

      setFieldValue(
        "haveAnyChildren",
        personalDetailObj.haveAnyChildren || "No"
      );

      if (
        personalDetailObj.haveAnyChildren === "Yes" &&
        personalDetailObj.children?.arrayOfChildren
      ) {
        const children = mapChildrenFromBackend(
          personalDetailObj.children.arrayOfChildren
        );
        setFieldValue("children", children);
        setFieldValue("numberOfChildren", children.length);
      }
    } catch (error) {
      console.error("❌ Error in storeData:", error);
    }
  };

  const onSubmit = async (values) => {
    const payload = {
      client: mapPersonForSubmit(values.client, "client"),
      partner: ["Single", "Widowed"].includes(values.client.marital)
        ? {}
        : mapPersonForSubmit(values.partner, "partner"),
      haveAnyChildren: values.haveAnyChildren,
      children: {
        arrayOfChildren:
          values.haveAnyChildren === "Yes"
            ? mapChildrenForSubmit(values.children)
            : [],
      },
    };
    payload.client.Email = payload.client.clientEmail;
    payload.client.clientEmail = undefined;

    // console.log("Submitting payload:", payload);

    try {
      const foundId = personalDetailObj?._id;
      const res = foundId
        ? await PatchAxios(`${defaultUrlValue}/api/personalDetails/Update`, {
            ...payload,
            _id: foundId,
          })
        : await PostAxios(
            `${defaultUrlValue}/api/personalDetails/Add`,
            payload
          );

      if (res) {
        localStorage.setItem("UserID", res._id);
        localStorage.setItem("UserName", res.client?.preferred || "");
        localStorage.setItem("Emial", res.client?.Email || "");
        localStorage.setItem(
          "UserStatus",
          ["Single", "Widowed"].includes(res.client?.marital)
            ? "Single"
            : "Married"
        );
        if (res.partner?.preferred) {
          localStorage.setItem("PartnerName", res.partner.preferred);
        }
        setSwitchStep(2);
        setPersonalDetailObj(res);
        openNotificationSuccess(
          "success",
          "topRight",
          "Notification",
          "User Data Successfully Saved!"
        );
      }
    } catch (error) {
      console.error("❌ API Error:", error?.response);
      const msg =
        error?.response?.status === 409 && error?.response?.data?.message
          ? error.response.data.message
          : "Something went wrong please check data again!";
      openNotificationSuccess("error", "topRight", "Notification", msg);
    }
  };

  useEffect(() => {
    const id = location.hash.replace("#", "");
    if (id) {
      getApiFunction(id);
      getQuestions(id); // this fetches the Yes and No Questions of client
      getQuestionsDetails(id); // this fetches the Detailed Data of client
    } else {
      setSwitchStep(1);
    }
  }, []);

  useEffect(() => {
    if (
      switchStep === 2 &&
      CRObjectNoUse &&
      Object.keys(CRObjectNoUse).length > 0
    ) {
      if (
        CRObjectNoUse.investmentPropertyTab === "No" &&
        CRObjectNoUse.personalInsuranceTab === "No" &&
        CRObjectNoUse.BusinessAsCompanyStructure === "No" &&
        CRObjectNoUse.SMSFManagedFundsTab === "No" &&
        CRObjectNoUse.businessAsInvestmentTab === "No"
      ) {
        setModalObject({ title: "Important Questions" });
        setFlagState(true);
      }
    }
  }, [switchStep, CRObjectNoUse]); // 👈 also depend on CRObjectNoUse

  async function getQuestions(id) {
    try {
      const res = await GetAxios(`${defaultUrlValue}/api/questions/${id}`);
      if (res) {
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
    }
  }

  async function getQuestionsDetails(id) {
    try {
      const res = await GetAxios(
        `${defaultUrlValue}/api/dataOfAllSection/${id}`
      );
      if (res) {
        setQuestionDetail(res);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      innerRef={formRef}
      enableReinitialize
    >
      {({ values, setFieldValue, handleChange, handleBlur, errors }) => {
        useEffect(() => {
          storeData(setFieldValue);
        }, [userData]);

        const tableData = useMemo(() => {
          // console.log(values.client.taxRes);
          const rows = [
            {
              key: "client",
              stakeHolder: "client",
              smoker: values.client.smoker,
              taxRes: values.client.taxRes,
              healthCover: values.client.healthCover,
              helpDebt: values.client.helpDebt,
              ...values.client,
            },
          ];

          if (!["Single", "Widowed", ""].includes(values.client.marital)) {
            rows.push({
              key: "partner",
              stakeHolder: "partner",
              smoker: values.partner.smoker,
              taxRes: values.partner.taxRes,
              healthCover: values.partner.healthCover,
              helpDebt: values.partner.helpDebt,
              ...values.partner,
            });
          }

          return rows;
        }, [values]);

        const contactTableData = useMemo(() => {
          const rows = [
            {
              key: "client.contact",
              stakeHolder: "client.contact",
              ...values.client,
              ...values.client.contact,
            },
          ];
          if (!["Single", "Widowed", ""].includes(values.client.marital)) {
            rows.push({
              key: "partner.contact",
              stakeHolder: "partner.contact",
              ...values.partner,
              ...values.partner.contact,
            });
          }
          return rows;
        }, [values]);

        const childrenTableData = useMemo(() => {
          const num = Number(values.numberOfChildren) || 0;
          if (values.haveAnyChildren === "Yes" && num > 0) {
            return Array.from({ length: num }, (_, i) => ({
              key: `children.${i}`,
              stakeHolder: `children.${i}`,
              ...(values.children?.[i] || {}),
            }));
          }
          return [];
        }, [values]);

        const flattenErrors = (obj, parentKey = "") =>
          Object.entries(obj || {}).flatMap(([key, val]) => {
            const path = parentKey ? `${parentKey}.${key}` : key;
            return typeof val === "string"
              ? [[path, val]]
              : flattenErrors(val, path);
          });

        return (
          <Form
            className="All_Client reportSection"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // 🚫 stop form submit
              }
            }}
          >
            <ModalComponent
              modalObject={modalObject}
              setFlagState={setFlagState}
              flagState={flagState}
            >
              <ImportantQuestion />
            </ModalComponent>
            {loading && (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "40vh", width: "100%" }}
              >
                <Spin size="large" />
              </div>
            )}
            {!loading && (
              <>
                {/* Show global error alert only when errors exist */}
                {errorShow &&
                  values &&
                  errors &&
                  Object.keys(errors).length > 0 && (
                    <div className="mt-3">
                      <Alert
                        message="Validation Errors"
                        description={
                          <div>
                            <p>
                              Some required fields are missing or invalid.
                              Please edit to fix them:
                            </p>
                            <ul style={{ marginLeft: 20 }}>
                              {flattenErrors(errors).map(
                                ([field, errorMsg]) => {
                                  const baseObject = field.split(".")[0]; // 👈 only take root key
                                  return (
                                    <li key={field}>
                                      <strong>
                                        {errorMsg} in (
                                        {toSentenceCase(baseObject)})
                                      </strong>
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                        }
                        type="error"
                        showIcon
                        className="mb-3"
                      />
                    </div>
                  )}

                {switchStep == 1 && (
                  <>
                    <h3 className="mt-4 fw-bold">Personal Details</h3>
                    <AntdDynamicTable
                      columns={personalFields}
                      data={tableData}
                      values={values}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />

                    <h3
                      className="mt-5 fw-bold"
                      onClick={() => {
                        console.log(values);
                      }}
                    >
                      Contact
                    </h3>
                    <AntdDynamicTable
                      columns={contactFields}
                      data={contactTableData}
                      values={values}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />

                    <h3
                      className="mt-5 fw-bold"
                      onClick={() => {
                        console.log(values);
                      }}
                    >
                      Children Details
                    </h3>

                    <div className="row justify-content-start align-items-center mb-3">
                      <div className="col-md-3">
                        <label className="form-label fw-bold">
                          Do you have any children?
                        </label>
                      </div>
                      <div className="col-md-1">
                        <DynamicYesNo
                          name={"haveAnyChildren"}
                          values={values}
                          handleChange={handleChange}
                        />
                      </div>
                    </div>
                    {values.haveAnyChildren === "Yes" && (
                      <div className="row justify-content-start align-items-center mb-3">
                        <div className="col-md-3">
                          <label className="form-label fw-bold">
                            How many children do you have :
                          </label>
                        </div>
                        <div className="col-md-1">
                          <Field
                            name="numberOfChildren"
                            as="select"
                            className="form-select"
                          >
                            {[0, 1, 2, 3, 4, 5].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <ErrorMessage
                          name={"numberOfChildren"}
                          component="div"
                          className="text-danger small mt-1"
                        />
                      </div>
                    )}

                    {values.haveAnyChildren === "Yes" &&
                      values.numberOfChildren > 0 && (
                        <AntdDynamicTable
                          columns={childrenFields}
                          data={childrenTableData}
                          values={values}
                          setFieldValue={setFieldValue}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                        />
                      )}

                    <div className="row justify-content-center align-items-center mb-3 mt-4">
                      <div className="col-md-4">
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="w-100"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </>
                )}
                {switchStep == 2 && (
                  <>
                    <div className="row justify-content-center mt-4">
                      <div className="col-md-3 mt-4">
                        <ProfileCard owner="client" Data={values.client} />
                      </div>
                      {!["Single", "Widowed", ""].includes(
                        values.client.marital
                      ) && (
                        <div className="col-md-3 mt-4">
                          <ProfileCard owner="partner" Data={values.partner} />
                        </div>
                      )}
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-md-2 mt-4">
                        <Button
                          htmlType="button"
                          className="w-100"
                          onClick={() => {
                            setSwitchStep(1);
                            setErrorShow(true);
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                      <div className="col-md-2 mt-4">
                        <Button
                          htmlType="button"
                          color="default"
                          variant="filled"
                          className="w-100"
                          onClick={() => {
                            setModalObject({
                              title: "Important Questions",
                            });
                            setFlagState(true);
                          }}
                        >
                          Edit Questions
                        </Button>
                      </div>
                      <div className="col-md-2 mt-4">
                        <Button
                          htmlType="button"
                          type="primary"
                          className="w-100"
                          onClick={() => {
                            Nav("/user/personal-income");
                          }}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default PersonalDetailNew;
