import React, { useEffect, useMemo, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Radio, Card, ConfigProvider } from "antd";
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
  touchFields,
} from "../Assets/Api/Api";
import { useLocation, useNavigate } from "react-router-dom";
import DynamicTableForInputsSection from "../Assets/Table/DynamicTableForInputsSection";
import DynamicYesNo from "../Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo";
import dayjs from "dayjs";

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
  contact: Yup.object().shape({
    clientName: Yup.string().required("Client name is required"),
    homeAddress: Yup.string().required("Home address is required"),
  }),
  children: Yup.object().shape({
    name: Yup.string().when("haveAnyChildren", {
      is: "Yes",
      then: Yup.string().required("Child name is required"),
    }),
    dob: Yup.string().when("haveAnyChildren", {
      is: "Yes",
      then: Yup.string().required("Date of birth is required"),
    }),
  }),
  haveAnyChildren: Yup.string()
    .oneOf(["Yes", "No"], "Please select Yes or No")
    .required("This field is required"),
});

const PersonalDetailNew = () => {
  const formRef = useRef(null);
  const formRefOfChild = useRef(null);

  const [switchStep, setSwitchStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [personalDetailObj, setPersonalDetailObj] =
    useRecoilState(PersonalDetailsData);
  const [stepsStatus, setStepsStatus] = useRecoilState(StepsStatus);
  const defaultUrlValue = useRecoilValue(defaultUrl);

  const AntdDynamicTable = DynamicTableForInputsSection("antd");

  let initialValues = {
    client: {
      title: "",
      firstName: "",
      middleName: "",
      lastName: "",
      preferred: "",
      gender: "",
      dob: "",
      age: "",
      marital: "",
      employment: "",
      occupation: "",
      retAge: "",
      smoker: false,
      taxRes: false,
      healthCover: false,
      helpDebt: false,
    },
    partner: {
      title: "",
      firstName: "",
      middleName: "",
      lastName: "",
      preferred: "",
      gender: "",
      dob: "",
      age: "",
      marital: "",
      employment: "",
      occupation: "",
      retAge: "",
      smoker: false,
      taxRes: false,
      healthCover: false,
      helpDebt: false,
    },
    haveAnyChildren: "No",
  };

  const location = useLocation();
  const navigate = useNavigate();
  const hashing = location.hash;

  useEffect(() => {
    const id = hashing.replace("#", "");
    if (id) {
      getApiFunction(id);
    }
  }, []);

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

        if (
          res.client.clientMaritalStatus === "Single" ||
          res.client.clientMaritalStatus === "Widowed"
        ) {
          localStorage.setItem("UserStatus", "Single");
        } else {
          localStorage.setItem("UserStatus", "Married");
          localStorage.setItem("PartnerName", res.partner.partnerPreferredName);
        }
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
    }
  };

  const storeData = (setFieldValue) => {
    try {
      const data = JSON.parse(JSON.stringify(personalDetailObj)) || {};
      console.log("personalDetailObj", personalDetailObj);

      if (data._id) {
        setFieldValue("client", {
          title: data.client.clientTitle || "",
          firstName: data.client.clientGivenName || "",
          middleName: data.client.clientMiddleName || "",
          lastName: data.client.clientSurname || "",
          preferred: data.client.clientPreferredName || "",
          gender: data.client.clientGender || "",
          dob: data?.client?.clientDOB
            ? ConvertDate(data?.client?.clientDOB)
            : "",
          age: data.client.clientAge || "",
          marital: data.client.clientMaritalStatus || "",
          employment: data.client.clientEmploymentStatus || "",
          occupation: data.client.clientOccupationID || "",
          retAge: data.client.clientPlannedRetirementAge || "",
          smoker: data.client.clientSmoker,
          taxRes: data.client.clientTaxResidentRadio,
          healthCover: data.client.clientPrivateHealthCoverRadio,
          helpDebt: data.client.clientHELPSDebtRadio,

          // contact fields
          contact: {
            homeAddress: data?.client?.clientHomeAddress || "",
            postcodeSuburb: data?.client?.clientPostcode || "",
            SameAsAbove: data?.client?.clientSameAsAbove || false,
            postalAddress: data?.client?.clientPostalAddress || "",
            postalPostCode: data?.client?.clientPostalPostCode || "",
            mobile: data?.client?.clientMobile || "",
            homePhone: data?.client?.clientHomePhone || "",
            workPhone: data?.client?.clientWorkPhone || "",
            email: data?.client?.Email || "",
          },
        });

        const maritalStatus = data.client?.clientMaritalStatus;
        if (
          maritalStatus &&
          maritalStatus !== "Single" &&
          maritalStatus !== "Widowed"
        ) {
          setFieldValue("partner", {
            title: data.partner.partnerTitle || "",
            firstName: data.partner.partnerGivenName || "",
            middleName: data.partner.partnerMiddleName || "",
            lastName: data.partner.partnerSurname || "",
            preferred: data.partner.partnerPreferredName || "",
            gender: data.partner.partnerGender || "",
            dob: data?.partner?.partnerDOB
              ? ConvertDate(data?.partner?.partnerDOB)
              : "",
            age: data.partner.partnerAge || "",
            marital: data.partner.partnerMaritalStatus || "",
            employment: data.partner.partnerEmploymentStatus || "",
            occupation: data.partner.partnerOccupationID || "",
            retAge: data.partner.partnerPlannedRetirementAge || "",
            smoker: data.partner.partnerSmoker,
            taxRes: data.partner.partnerTaxResidentRadio,
            healthCover: data.partner.partnerPrivateHealthCoverRadio,
            helpDebt: data.partner.partnerHELPSDebtRadio,

            // contact fields
            contact: {
              homeAddress: data?.partner?.partnerHomeAddress || "",
              postcodeSuburb: data?.partner?.partnerPostcode || "",
              SameAsAbove: data?.partner?.partnerSameAsAbove || false,
              postalAddress: data?.partner?.partnerPostalAddress || "",
              postalPostCode: data?.partner?.partnerPostalPostCode || "",
              mobile: data?.partner?.partnerMobile || "",
              homePhone: data?.partner?.partnerHomePhone || "",
              workPhone: data?.partner?.partnerWorkPhone || "",
              email: data?.partner?.partnerEmail || "",
            },
          });
        }

        setFieldValue("haveAnyChildren", data.haveAnyChildren || "No");

        if (data?.haveAnyChildren === "Yes" && data?.numberOfChildren > 0) {
          let newChildren = [];

          for (let i = 0; i < data.numberOfChildren; i++) {
            newChildren.push({
              key: `child_${i}`,
              ...(data.children?.[i] || {}), // keep existing data if already filled
            });
          }

          console.log("newChildren:", newChildren);

          setFieldValue("children", newChildren);
        }
      }
    } catch (error) {
      console.error("An error occurred while storing data:", error);
    }
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

  const onSubmit = async (values) => {
    const payload = {
      client: {
        clientTitle: values.client.title,
        clientGivenName: values.client.firstName,
        clientMiddleName: values.client.middleName,
        clientLastName: values.client.lastName,
        clientSurname: values.client.surname,
        clientPreferredName: values.client.preferred,
        clientGender: values.client.gender,
        clientDOB: values.client.dob
          ? dayjs(values.client.dob, "DD/MM/YYYY").toISOString()
          : null,
        clientAge: values.client.age,
        clientMaritalStatus: values.client.marital,
        clientEmploymentStatus: values.client.employment,
        clientOccupationID: values.client.occupation,
        clientPlannedRetirementAge: values.client.retAge,
        clientSmoker: values.client.smoker,
        clientTaxResidentRadio: values.client.taxRes,
        clientPrivateHealthCoverRadio: values.client.healthCover,
        clientHELPSDebtRadio: values.client.helpDebt,

        // flatten contact
        clientHomeAddress: values.client.contact?.homeAddress,
        clientPostcode: values.client.contact?.postcodeSuburb,
        clientSameAsAbove: values.client.contact?.SameAsAbove||false||false,
        clientPostalAddress: values.client.contact?.postalAddress,
        clientPostalPostCode: values.client.contact?.postalPostCode,
        clientMobile: values.client.contact?.mobile,
        clientHomePhone: values.client.contact?.homePhone,
        clientWorkPhone: values.client.contact?.workPhone,
        Email: values.client.contact?.email,
      },
      partner: {
        partnerTitle: values.partner?.title,
        partnerGivenName: values.partner?.firstName,
        partnerMiddleName: values.partner?.middleName,
        partnerLastName: values.partner.lastName,
        partnerSurname: values.partner.surname,
        partnerPreferredName: values.partner?.preferred,
        partnerGender: values.partner?.gender,
        partnerDOB: values.partner?.dob
          ? dayjs(values.partner.dob, "DD/MM/YYYY").toISOString()
          : null,
        partnerAge: values.partner?.age,
        partnerMaritalStatus: values.partner?.marital,
        partnerEmploymentStatus: values.partner?.employment,
        partnerOccupationID: values.partner?.occupation,
        partnerPlannedRetirementAge: values.partner?.retAge,
        partnerSmoker: values.partner?.smoker,
        partnerTaxResidentRadio: values.partner?.taxRes,
        partnerPrivateHealthCoverRadio: values.partner?.healthCover,
        partnerHELPSDebtRadio: values.partner?.helpDebt,

        // flatten contact
        partnerHomeAddress: values.partner?.contact?.homeAddress,
        partnerPostcode: values.partner?.contact?.postcodeSuburb,
        partnerSameAsClient: values.partner?.contact?.SameAsAbove||false,
        partnerPostalAddress: values.partner?.contact?.postalAddress,
        partnerPostalPostCode: values.partner?.contact?.postalPostCode,
        partnerMobile: values.partner?.contact?.mobile,
        partnerHomePhone: values.partner?.contact?.homePhone,
        partnerWorkPhone: values.partner?.contact?.workPhone,
        partnerEmail: values.partner?.contact?.email,
      },
      haveAnyChildren: values.haveAnyChildren,
      children: {
        arrayOfChildren: values.children?.map((child) => ({
          depenantChild: child.depenantChild,
          name: child.name,
          gender: child.gender,
          relationship: child.relationship,
          dob: child.dob
            ? dayjs(child.dob, ["DD/MM/YYYY", "YYYY-MM-DD"]).toISOString()
            : null,
        })),
      },
    };

    console.log("🚀 Final Payload", payload);

    if (
      values.client.marital === "Single" ||
      values.client.marital === "Widowed"
    ) {
      payload.partner = {};
    }

    if (values.haveAnyChildren === "No") {
      payload.children = [];
    }

    const foundId = personalDetailObj._id || "";

    try {
      let res;
      if (!foundId) {
        res = await PostAxios(
          `${defaultUrlValue}/api/personalDetails/Add`,
          payload
        );
      } else {
        payload._id = personalDetailObj._id;
        res = await PatchAxios(
          `${defaultUrlValue}/api/personalDetails/Update`,
          payload
        );
      }

      if (res) {
        localStorage.setItem("UserID", res._id);
        localStorage.setItem("UserName", res.client.preferred);

        if (
          values.client.marital === "Single" ||
          values.client.marital === "Widowed"
        ) {
          localStorage.setItem("UserStatus", "Single");
        } else {
          localStorage.setItem("UserStatus", "Married");
          localStorage.setItem("PartnerName", res.partner.preferred);
        }

        setSwitchStep(3);
        setPersonalDetailObj(res);
        openNotificationSuccess(
          "success",
          "topRight",
          "Notification",
          "User Data Successfully Saved!"
        );
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error?.response);
      if (error?.response?.status === 409) {
        if (error?.response?.data?.message) {
          openNotificationSuccess(
            "error",
            "topRight",
            "Notification",
            error.response.data.message
          );
        }
      } else {
        openNotificationSuccess(
          "error",
          "topRight",
          "Notification",
          "Something went wrong please check data again!"
        );
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema}

      onSubmit={onSubmit}
      innerRef={formRef}
      enableReinitialize
    >
      {({
        values,
        setFieldValue,
        handleChange,
        handleBlur,
        setFieldTouched,
      }) => {
        useEffect(() => {
          storeData(setFieldValue);
        }, [userData]);

        const tableData = useMemo(() => {
          const rows = [];

          rows.push({
            key: "client",
            stakeHolder: "client",
            ...values.client,
          });

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
          const rows = [];

          rows.push({
            key: "client.contact",
            stakeHolder: "client.contact", // 👈 point to nested contact
            ...values.client,
            ...values.client.contact, // flatten contact fields
          });

          if (!["Single", "Widowed", ""].includes(values.client.marital)) {
            rows.push({
              key: "partner.contact",
              stakeHolder: "partner.contact", // 👈 point to nested contact
              ...values.partner,
              ...values.partner.contact,
            });
          }

          return rows;
        }, [values]);

        const childrenTableData = useMemo(() => {
          // Ensure numberOfChildren is a number
          const numChildren = Number(values.numberOfChildren) || 0;
          if (values.haveAnyChildren === "Yes" && numChildren > 0) {
            // If values.children exists and is an array, use it; otherwise, create empty objects
            const childrenArr = Array.from(
              { length: numChildren },
              (_, index) => {
                const child = values.children?.[index] || {};
                return {
                  key: `children.${index}`,
                  stakeHolder: `children.${index}`,
                  ...child,
                };
              }
            );
            return childrenArr;
          }
          return [];
        }, [values]);

        return (
          <Form className=" All_Client reportSection">
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
                  {" "}
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PersonalDetailNew;
