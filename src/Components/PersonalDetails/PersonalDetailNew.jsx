import React, { useEffect, useMemo, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Card } from "antd";
import * as Yup from "yup";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  defaultUrl,
  PersonalDetailsData,
  StepsStatus,
} from "../../Store/Store";
import {
  ConvertDate,
  GetAxios,
  getNestedValue,
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
} from "../Assets/Api/Api";
import { useLocation, useNavigate } from "react-router-dom";
import DynamicTableForInputsSection from "../Assets/Table/DynamicTableForInputsSection";
import DynamicYesNo from "../Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo";
import dayjs from "dayjs";
import ProfileCard from "./ProfileCard";

const validationSchema = Yup.object({
  client: Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Surname is required"),
    dob: Yup.string().required("Date of birth is required"),
  }),
  partner: Yup.object().shape({
    firstName: Yup.string().when("client.marital", {
      is: (val) => val !== "Single" && val !== "Widowed",
      then: Yup.string().required("First name is required"),
    }),
    lastName: Yup.string().when("client.marital", {
      is: (val) => val !== "Single" && val !== "Widowed",
      then: Yup.string().required("Surname is required"),
    }),
    dob: Yup.string().when("client.marital", {
      is: (val) => val !== "Single" && val !== "Widowed",
      then: Yup.string().required("Date of birth is required"),
    }),
  }),
  haveAnyChildren: Yup.string()
    .oneOf(["Yes", "No"], "Please select Yes or No")
    .required("This field is required"),
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
    surname: person?.[`${prefix}Surname`] || "",
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
    [`${prefix}Surname`]: person.surname,
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
  const [switchStep, setSwitchStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [personalDetailObj, setPersonalDetailObj] =
    useRecoilState(PersonalDetailsData);
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
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      type: "text",
      key: "firstName",
    },
    {
      title: "Middle Name",
      dataIndex: "middleName",
      type: "text",
      key: "middleName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      type: "text",
      key: "lastName",
    },
    {
      title: "Preferred",
      dataIndex: "preferred",
      type: "text",
      key: "preferred",
      fixed: "left",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      type: "text",
      key: "surname",
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
    },
    {
      title: "DOB",
      dataIndex: "dob",
      type: "antdate",
      key: "dob",
    },
    {
      title: "Age",
      dataIndex: "age",
      type: "text",
      key: "age",
    },
    {
      title: "Marital",
      dataIndex: "marital",
      type: "select",
      options: [
        { value: "Single", label: "Single" },
        { value: "Married", label: "Married" },
        { value: "De Facto", label: "De Facto" },
        { value: "Divorced", label: "Divorced" },
        { value: "Widowed", label: "Widowed" },
      ],
      key: "marital",
    },
    {
      title: "Employment",
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
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      type: "text",
      key: "occupation",
    },
    {
      title: "Ret Age",
      dataIndex: "retAge",
      type: "text",
      key: "retAge",
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
    },
    {
      title: "Smoker",
      dataIndex: "smoker",
      type: "yesno",
      key: "smoker",
    },
    {
      title: "Tax Res",
      dataIndex: "taxRes",
      type: "yesno",
      key: "taxRes",
    },
    {
      title: "Health Cover",
      dataIndex: "healthCover",
      type: "yesno",
      key: "healthCover",
    },
    {
      title: "HELP Debt",
      dataIndex: "helpDebt",
      type: "yesno",
      key: "helpDebt",
    },
  ];

  const contactFields = [
    {
      title: "Name",
      dataIndex: "preferred",
      type: "text",
      key: "owner",
      fixed: "left",
    },
    {
      title: "Home Address",
      dataIndex: "homeAddress",
      type: "text",
      key: "homeAddress",
    },
    {
      title: "Postcode/Suburb",
      dataIndex: "postcodeSuburb",
      type: "text",
      key: "postcodeSuburb",
    },
    {
      title: "Same As Home Address",
      placeholder: "Same As Home Address",
      dataIndex: "SameAsAbove",
      type: "checkbox",
      key: "SameAsAbove",
      width: 230,
      callBack: true,
      func: (values, setFieldValue, thisInput, stakeHolder) => {
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
      title: "Postal Address",
      dataIndex: "postalAddress",
      type: "text",
      key: "postalAddress",
      disabled: (values, stakeHolder) =>
        getNestedValue(values, `${stakeHolder}SameAsAbove`) === true, // 👈 use stakeHolderF
    },
    {
      title: "Postcode/Suburb",
      dataIndex: "postalPostCode",
      type: "text",
      key: "postalPostCode",
      disabled: (values, stakeHolder) => {
        console.log(
          stakeHolder,
          getNestedValue(values, `${stakeHolder}SameAsAbove`)
        );
        return getNestedValue(values, `${stakeHolder}SameAsAbove`) === true;
      },
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      type: "text",
      key: "mobile",
    },
    {
      title: "Home Phone",
      dataIndex: "homePhone",
      type: "text",
      key: "homePhone",
    },
    {
      title: "Work Phone",
      dataIndex: "workPhone",
      type: "text",
      key: "workPhone",
    },
    {
      title: "Email",
      dataIndex: "email",
      type: "text",
      key: "email",
    },
  ];

  const childrenFields = [
    {
      title: "Name",
      dataIndex: "name",
      type: "text",
      key: "name",
      fixed: "left",
    },
    {
      title: "DOB",
      dataIndex: "dob",
      type: "antdate",
      key: "dob",
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
    },
    {
      title: "Add in is Child Depenant",
      dataIndex: "depenantChild",
      type: "yesno",
      key: "depenantChild",
    },
  ];

  const getApiFunction = async (id) => {
    try {
      const res = await GetAxios(
        `${defaultUrlValue}/api/personalDetails/getUserById/${id}`
      );
      if (res) {
        setPersonalDetailObj(res);
        setUserData(res);
        localStorage.setItem("UserID", res._id);
        localStorage.setItem("UserName", res.client.clientPreferredName);
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
    if (id) getApiFunction(id);
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      innerRef={formRef}
      enableReinitialize
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          storeData(setFieldValue);
        }, [userData]);

        const tableData = useMemo(() => {
          const rows = [
            { key: "client", stakeHolder: "client", ...values.client },
          ];
          if (!["Single", "Widowed", ""].includes(values.client.marital)) {
            rows.push({
              key: "partner",
              stakeHolder: "partner",
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

        return (
          <Form className="All_Client reportSection">
            {switchStep == 1 && (
              <>
                <h3 className="mt-4">Personal Details</h3>
                <AntdDynamicTable
                  columns={personalFields}
                  data={tableData}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />

                <h3
                  className="mt-4"
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
                  className="mt-4"
                  onClick={() => {
                    console.log(values);
                  }}
                >
                  Children Details
                </h3>

                <div className="row justify-content-center align-items-center mb-3">
                  <div className="col-md-3">
                    <label className="form-label fw-bold">
                      Do you have any children?
                    </label>
                  </div>
                  <div className="col-md-2">
                    <DynamicYesNo
                      name={"haveAnyChildren"}
                      values={values}
                      handleChange={handleChange}
                    />
                  </div>
                </div>
                {values.haveAnyChildren === "Yes" && (
                  <div className="row justify-content-center align-items-center mb-3">
                    <div className="col-md-3">
                      <label className="form-label fw-bold">
                        How many children do you have :
                      </label>
                    </div>
                    <div className="col-md-1">
                      <Field
                        name="numberOfChildren"
                        type="number"
                        className="form-control"
                        min="0"
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val < 5) {
                            setFieldValue(e.target.name, e.target.value);
                          } else {
                            setFieldValue(e.target.name, 5);
                          }
                        }}
                        onWheel={(e) => e.target.blur()} // 👈 disables mouse wheel increment/decrement
                      />
                    </div>
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
                    <Button type="primary" htmlType="submit" className="w-100">
                      Submit
                    </Button>
                  </div>
                </div>
              </>
            )}
            {switchStep == 2 && (
              <>
                <h3
                  className="mt-4"
                  onClick={() => {
                    console.log(values);
                  }}
                >
                  Personal Details Summay
                </h3>
                <div className="row justify-content-center">
                  <div className="col-md-4  mt-4">
                    <ProfileCard owner="client" Data={values.client} />
                  </div>
                  <div className="col-md-4  mt-4">
                    <ProfileCard owner="partner" Data={values.partner} />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-2 mt-4">
                    <Button
                      htmlType="button"
                      className="w-100"
                      onClick={() => {
                        setSwitchStep(1);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                  <div className="col-md-2 mt-4">
                    <Button
                      htmlType="button"
                      type="primary"
                      className="w-100"
                      onClick={() => {
                        Nav("/user/important-question");
                      }}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default PersonalDetailNew;
