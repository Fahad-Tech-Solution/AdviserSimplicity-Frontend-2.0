import React, { useEffect, useRef, useState } from "react";
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
  GetAxios,
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  touchFields,
} from "../Assets/Api/Api";
import { useLocation, useNavigate } from "react-router-dom";
import Childe from "./Childe";
import DynamicTableForInputsSection from "../Assets/Table/DynamicTableForInputsSection";

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

    contact: {
      clientName: "",
      homeAddress: "",
      postcode: "",
      suburb: "",
      state: "",
      postalAddress: "",
      mobile: "",
      email: "",
    },
    children: {
      name: "",
      dob: "",
      gender: "",
      relationship: "",
      dependant: false,
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

      if (data._id) {
        setFieldValue("client", {
          title: data.client.clientTitle || "",
          firstName: data.client.clientGivenName || "",
          middleName: data.client.clientMiddleName || "",
          lastName: data.client.clientSurname || "",
          preferred: data.client.clientPreferredName || "",
          gender: data.client.clientGender || "",
          dob: data.client.clientDOB || "",
          age: data.client.clientAge || "",
          marital: data.client.clientMaritalStatus || "",
          employment: data.client.clientEmploymentStatus || "",
          occupation: data.client.clientOccupationID || "",
          retAge: data.client.clientPlannedRetirementAge || "",
          smoker: data.client.clientSmoker,
          taxRes: data.client.clientTaxResidentRadio,
          healthCover: data.client.clientPrivateHealthCoverRadio,
          helpDebt: data.client.clientHELPSDebtRadio,
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
            dob: data.partner.partnerDOB || "",
            age: data.partner.partnerAge || "",
            marital: data.partner.partnerMaritalStatus || "",
            employment: data.partner.partnerEmploymentStatus || "",
            occupation: data.partner.partnerOccupationID || "",
            retAge: data.partner.partnerPlannedRetirementAge || "",
            smoker: data.partner.partnerSmoker,
            taxRes: data.partner.partnerTaxResidentRadio,
            healthCover: data.partner.partnerPrivateHealthCoverRadio,
            helpDebt: data.partner.partnerHELPSDebtRadio,
          });
        }

        setFieldValue("contact", [
          {
            clientName:
              `${data.client.clientGivenName} ${data.client.clientSurname}` ||
              "",
            homeAddress: data.client.clientHomeAddress || "",
            postcode: data.client.clientPostcode || "",
            suburb: "",
            state: "",
            postalAddress: data.client.clientPostalAddress || "",
            mobile: data.client.clientMobile || "",
            email: data.client.Email || "",
          },
        ]);

        setFieldValue("children", data.children?.arrayOfChildren || []);
        setFieldValue("haveAnyChildren", data.haveAnyChildren || "No");
        setSwitchStep(3);
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
    },
    {
      title: "Surname",
      dataIndex: "clientSurname",
      type: "text",
      key: "clientSurname",
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
      title: "Client Health",
      dataIndex: "clientHealth",
      type: "select",
      options: [
        { value: "execlent", label: "execlent" },
        { value: "good", label: "good" },
        { value: "average", label: "average" },
        { value: "poor", label: "poor" },
      ],
      key: "clientHealth",
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
      title: "Client Name",
      dataIndex: "clientName",
      type: "text",
      key: "clientName",
    },
    {
      title: "Home Address",
      dataIndex: "homeAddress",
      type: "text",
      key: "homeAddress",
    },
    {
      title: "Postcode/Suburb",
      dataIndex: "clientPostcode",
      type: "text",
      key: "clientPostcode",
    },
    {
      title: "Postcode",
      dataIndex: "postcode",
      type: "text",
      key: "postcode",
    },
    {
      title: "Suburb",
      dataIndex: "suburb",
      type: "text",
      key: "suburb",
    },
    {
      title: "State",
      dataIndex: "state",
      type: "text",
      key: "state",
    },
    {
      title: "Postal Address",
      dataIndex: "postalAddress",
      type: "text",
      key: "postalAddress",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      type: "text",
      key: "mobile",
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
      title: "Relationship",
      dataIndex: "relationship",
      type: "select",
      options: [
        { value: "Son", label: "Son" },
        { value: "Daughter", label: "Daughter" },
        { value: "Other", label: "Other" },
      ],
      key: "relationship",
    },
    {
      title: "Dependant",
      dataIndex: "dependant",
      type: "yesno",
      key: "dependant",
    },
  ];

  const onSubmit = async (values) => {
    if (switchStep === 1) {
      setSwitchStep(2);
    } else if (switchStep === 2) {
      const obj = {
        client: values.client,
        partner: values.partner,
        contact: values.contact,
        children: values.children,
        haveAnyChildren: values.haveAnyChildren,
      };

      if (
        values.client.marital === "Single" ||
        values.client.marital === "Widowed"
      ) {
        obj.partner = {};
      }

      if (values.haveAnyChildren === "No") {
        obj.children = [];
      }

      const foundId = personalDetailObj._id || "";

      try {
        let res;
        if (!foundId) {
          res = await PostAxios(
            `${defaultUrlValue}/api/personalDetails/Add`,
            obj
          );
        } else {
          obj._id = personalDetailObj._id;
          res = await PatchAxios(
            `${defaultUrlValue}/api/personalDetails/Update`,
            obj
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
    } else {
      setStepsStatus(false);
      navigate("/user/important-question");
    }
  };

  const submitChild = () => {
    if (formRefOfChild.current) {
      formRefOfChild.current.handleSubmit();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
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

        const combinedPersonal = [
          { ...values.client, key: 1, role: "Client", stakeHolder: "client" },
        ];

        if (
          values.client.marital &&
          values.client.marital !== "Single" &&
          values.client.marital !== "Widowed"
        ) {
          combinedPersonal.push({
            ...values.partner,
            key: 2,
            role: "Partner",
            stakeHolder: "partner",
          });
        }

        return (
          <Form className="PersonalDetailsForm">
            <ConfigProvider
              theme={{
                components: {
                  Table: {
                    headerBg: "#36B446",
                    headerColor: "white",
                    headerFontWeight: "bold",
                  },
                },
              }}
            >
              {switchStep === 1 && (
                <Card title="Personal Details">
                  <h3 className="mt-4">Personal Details</h3>
                  <AntdDynamicTable
                    columns={personalFields}
                    data={combinedPersonal}
                    values={values}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />

                  <h3 className="mt-4">Contact Details</h3>
                  <AntdDynamicTable
                    columns={contactFields}
                    data={[values.contact]} // 👈 wrap object into array
                    values={values}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />

                  <h3 className="mt-4">Children Details</h3>
                  <div style={{ marginTop: 16 }}>
                    <Field
                      as={Radio.Group}
                      name="haveAnyChildren"
                      onChange={handleChange}
                    >
                      <Radio value="Yes">Yes</Radio>
                      <Radio value="No">No</Radio>
                    </Field>
                    <ErrorMessage name="haveAnyChildren" component="div" />
                  </div>
                  <AntdDynamicTable
                    columns={childrenFields}
                    data={[values.children]} // 👈 wrap object into array
                    values={values}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                </Card>
              )}

              {switchStep === 2 && (
                <Childe
                  formRefOfChield={formRefOfChild}
                  FoundData={personalDetailObj}
                  values={values}
                  ParentformRef={formRef}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              )}

              {switchStep === 3 && (
                <Card title="Personal Details Summary">
                  <h3 className="mt-4">Personal Details</h3>
                  <AntdDynamicTable
                    columns={personalFields}
                    data={combinedPersonal}
                    values={values}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />

                  <h3 className="mt-4">Contact Details</h3>
                  <AntdDynamicTable
                    columns={contactFields}
                    data={[{ ...values.contact, key: "contactRow" }]} // ✅ unique key
                    // ✅ AntD knows how to separate rows
                    values={values}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />

                  <h3 className="mt-4">Children Details</h3>
                  <AntdDynamicTable
                    columns={childrenFields}
                    data={[{ ...values.children }]} // ✅ different key
                    values={values}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                </Card>
              )}

              <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                {switchStep !== 1 && (
                  <Button
                    onClick={() => setSwitchStep(switchStep - 1)}
                    style={{ marginRight: 8 }}
                  >
                    {switchStep === 3 ? "Edit" : "Back"}
                  </Button>
                )}
                <Button
                  type="primary"
                  onClick={
                    switchStep === 1
                      ? async () => {
                          const isValid = await touchFields(
                            setFieldTouched,
                            [
                              "client.firstName",
                              "client.lastName",
                              "client.dob",
                              "partner.firstName",
                              "partner.lastName",
                              "partner.dob",
                            ],
                            values,
                            validationSchema
                          );
                          if (isValid) setSwitchStep(switchStep + 1);
                        }
                      : switchStep === 2
                      ? submitChild
                      : () => formRef.current.handleSubmit()
                  }
                >
                  {switchStep === 3 ? "Next" : "Submit"}
                </Button>
              </div>
            </ConfigProvider>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PersonalDetailNew;
