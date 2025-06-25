import { ErrorMessage, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import PersonalDetailsClientPartner from "./PersonalDetailsClientPartner";
import "yup-phone";
import * as Yup from "yup";
import Childe from "./Childe";
import PersonalDetailCards from "./PersonalDetailCards";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  defaultUrl,
  PersonalDetailsData,
  StepsStatus,
} from "../../Store/Store";
import {
  ConvertDate,
  GetAxios,
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  touchFields,
} from "../Assets/Api/Api";
import { useLocation, useNavigate } from "react-router-dom";
import { differenceInYears, isValid } from "date-fns";

const PersonalDetailNew = () => {
  let formRef = useRef(null);
  let formRefOfChield = useRef(null);

  let [Switch, setSwitch] = useState(1);
  let [userData, setUserData] = useState({});
  let [PersonalDetailObj, setPersonalDetailObj] =
    useRecoilState(PersonalDetailsData);
  let [stepsStatus, setStepsStatus] = useRecoilState(StepsStatus); // eslint-disable-line no-unused-vars
  let DefaultUrl = useRecoilValue(defaultUrl);

  let initialValues = {
    client: {
      clientTitle: "",
      clientGivenName: "",
      clientSurname: "",
      clientPreferredName: "",
      clientGender: "",
      clientDOB: "",
      clientAge: "",
      clientMaritalStatus: "",
      clientEmploymentStatus: "",
      clientHealth: "",
      clientSmoker: "nonsmoker",
      clientPlannedRetirementAge: "",
      clientHomeAddress: "",
      clientPostcode: "",
      clientHomePhone: "",
      clientWorkPhone: "",
      clientMobile: "",
      Email: "",
      clientPostalAddress: "",
      clientPostalPostCode: "",
      clientMiddleName: "",
      clientOccupationID: "",
      clientTaxResidentRadio: "No",
      clientPrivateHealthCoverRadio: "No",
      clientHELPSDebtRadio: "No",
      clientSameAsAbove: false,
      // clientRetirement: "",
    },
    partner: {
      partnerTitle: "",
      partnerGivenName: "",
      partnerSurname: "",
      partnerPreferredName: "",
      partnerGender: "",
      partnerDOB: "",
      partnerAge: "",
      partnerMaritalStatus: "",
      partnerEmploymentStatus: "",
      partnerHealth: "",
      partnerSmoker: "nonsmoker",
      partnerPlannedRetirementAge: "",
      partnerHomeAddress: "",
      partnerPostcode: "",
      partnerHomePhone: "",
      partnerWorkPhone: "",
      partnerMobile: "",
      partnerEmail: "",
      partnerPostalAddress: "",
      partnerPostalPostCode: "",
      partnerMiddleName: "",
      partnerOccupationID: "",
      partnerTaxResidentRadio: "No",
      partnerPrivateHealthCoverRadio: "No",
      partnerHELPSDebtRadio: "No",
      partnerSameAsClient: false,
      // partnerRetirement: ""
    },
    children: {
      numberOfChildren: 0,
      arrayOfChildren: [],
    },
    haveAnyChildren: "No",
  };

  let location = useLocation();
  let hashing = location.hash;

  useEffect(() => {
    setPersonalDetailObj({
      client: {
        clientTitle: "Mr.",
        clientGivenName: "John",
        clientSurname: "Doe",
        clientPreferredName: "Johnny",
        clientGender: "Male",
        clientDOB: "1990-01-01",
        clientAge: 34,
        clientMaritalStatus: "Single",
        clientEmploymentStatus: "Employed",
        clientHealth: "Good",
        clientSmoker: "No",
        clientPlannedRetirementAge: 65,
        clientHomeAddress: "123 Main St",
        clientPostcode: 12345,
        clientHomePhone: "555-555-5555",
        clientWorkPhone: "555-555-5556",
        clientMobile: "555-555-5557",
        Email: "john.doe@example.com",
        clientPostalAddress: "123 Main St",
        clientPostalPostCode: 12345,
        clientMiddleName: "Michael",
        clientOccupationID: "OCC123",
        clientTaxResidentRadio: "Yes",
        clientPrivateHealthCoverRadio: "Yes",
        clientHELPSDebtRadio: "No",
        clientSameAsAbove: true,
        clientRetirement: "Comfortable",
      },
      partner: {},
      children: {
        numberOfChildren: 0,
      },
      haveAnyChildren: "No",
    });

    let Id = hashing.replace("#", "");

    if (Id) {
      GetApiFunction(Id);
      // setSwitch(3);
    }
  }, []);

  async function GetApiFunction(id) {
    try {
      let res = await GetAxios(
        `${DefaultUrl}/api/personalDetails/getUserById/${id}`
      );
      if (res) {
        console.log(res);
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
  }

  let Nav = useNavigate();

  // Updated validation schema to handle nested structures correctly
  let validationSchema = Yup.object({
    client: Yup.object({
      Email: Yup.string().email("Invalid email format").required("Required"),
    }),
    haveAnyChildren: Yup.string()
      .oneOf(["Yes", "No"], "Please select Yes or No")
      .required("This field is required"),
  });

  const validateForm = (values) => {
    const errors = {};
    const client = values.client || {};
    const partner = values.partner || {};

    const clientErrors = {};
    const partnerErrors = {};

    const maritalStatus = client.clientMaritalStatus?.toLowerCase();

    // === Reusable Validators ===
    const required = (value, msg) => (!value ? msg : undefined);
    const isAlphaSpace = (value, msg) =>
      value && !/^[a-zA-Z\s]+$/.test(value) ? msg : undefined;
    const isValidEmail = (value) =>
      value && !Yup.string().email().isValidSync(value)
        ? "Invalid email format"
        : undefined;
    const isValidDOB = (value) =>
      value && !/^\d{2}\/\d{2}\/\d{4}$/.test(ConvertDate(value))
        ? "Date must be in DD/MM/YYYY format"
        : undefined;
    const isPositiveNumber = (value, msg) =>
      value !== 0 && (!value || isNaN(value) || value < 0) ? msg : undefined;

    // === Client Field Configs ===
    const clientFields = [
      {
        key: "Email",
        validator: (val) =>
          required(val, "Email is required") || isValidEmail(val),
      },
      {
        key: "clientSurname",
        validator: (val) =>
          required(val, "Surname is required") ||
          isAlphaSpace(val, "Surname must contain only letters and spaces"),
      },
      {
        key: "clientGivenName",
        validator: (val) =>
          required(val, "Given name is required") ||
          isAlphaSpace(val, "Given name must contain only letters and spaces"),
      },
      {
        key: "clientPreferredName",
        validator: (val) =>
          required(val, "Preferred name is required") ||
          isAlphaSpace(
            val,
            "Preferred name must contain only letters and spaces"
          ),
      },
      {
        key: "clientDOB",
        validator: (val) =>
          required(val, "Date of birth is required") || isValidDOB(val),
      },
      {
        key: "clientAge",
        validator: (val) =>
          isPositiveNumber(val, "Age must be a valid positive number"),
      },
      {
        key: "clientMaritalStatus",
        validator: (val) => required(val, "Marital status is required"),
      },
      {
        key: "clientHomeAddress",
        validator: (val) => required(val, "Home address is required"),
      },
    ];

    // === Partner Field Configs (conditionally validated) ===

    const partnerFields = [
      {
        key: "partnerEmail",
        validator: (val) =>
          required(val, "Email is required") || isValidEmail(val),
      },
      {
        key: "partnerSurname",
        validator: (val) =>
          required(val, "Surname is required") ||
          isAlphaSpace(val, "Surname must contain only letters and spaces"),
      },
      {
        key: "partnerGivenName",
        validator: (val) =>
          required(val, "Given name is required") ||
          isAlphaSpace(val, "Given name must contain only letters and spaces"),
      },
      {
        key: "partnerPreferredName",
        validator: (val) =>
          required(val, "Preferred name is required") ||
          isAlphaSpace(
            val,
            "Preferred name must contain only letters and spaces"
          ),
      },
      {
        key: "partnerDOB",
        validator: (val) =>
          required(val, "Date of birth is required") || isValidDOB(val),
      },
      {
        key: "partnerAge",
        validator: (val) =>
          isPositiveNumber(val, "Age must be a valid positive number"),
      },
      {
        key: "partnerMaritalStatus",
        validator: (val) => required(val, "Marital status is required"),
      },
      {
        key: "partnerHomeAddress",
        validator: (val) => required(val, "Home address is required"),
      },
    ];

    // === Run Validation Loop for Client
    clientFields.forEach(({ key, validator }) => {
      const error = validator(client[key]);
      if (error) clientErrors[key] = error;
    });

    // === Conditional Partner Validation
    if (maritalStatus !== "single" && maritalStatus !== "widowed") {
      partnerFields.forEach(({ key, validator }) => {
        const error = validator(partner[key]);
        if (error) partnerErrors[key] = error;
      });
    }

    // === Children Section
    if (!values.haveAnyChildren) {
      errors.haveAnyChildren = "This field is required";
    } else if (!["Yes", "No"].includes(values.haveAnyChildren)) {
      errors.haveAnyChildren = "Please select Yes or No";
    }

    // === Merge Errors
    if (Object.keys(clientErrors).length > 0) errors.client = clientErrors;
    if (Object.keys(partnerErrors).length > 0) errors.partner = partnerErrors;

    return errors;
  };

  let includeArray = [
    "clientAge",
    "partnerAge",
    "clientPlannedRetirementAge",
    "partnerPlannedRetirementAge",
    "clientPostcode",
    "partnerPostcode",
    "clientPostalPostCode",
    "partnerPostalPostCode",
  ];

  const checkAndReplaceEmptyData = (data) => {
    for (let key in data) {
      if (data[key] === "" || data[key] === null) {
        if (includeArray.includes(key)) {
          data[key] = 0;
        } else if (key === "partnerEmail") {
          data[key] = "dani11221@gmail.com";
        } else if (key === "partnerDOB" || key === "clientDOB") {
          data[key] = "01/01/1999";
        } else if (typeof data[key] === "string") {
          data[key] = "dummy Data";
        } else if (typeof data[key] === "number") {
          data[key] = 0;
        } else if (typeof data[key] === "boolean") {
          data[key] = false;
        } else {
          data[key] = "dummy Data"; // Fallback for any other type
        }
      }
    }
    return data;
  };

  let onSubmit = async (values) => {
    console.log("Parent on submit : ", values);
    if (Switch === 1) {
      setSwitch(2);
    } else if (Switch === 2) {
      let obj = values;

      if (
        values.client.clientMaritalStatus === "Single" ||
        values.client.clientMaritalStatus === "Widowed"
      ) {
        obj.partner = {};
      }

      if (values.haveAnyChildren === "No") {
        obj.children = {};
      }

      let FoundId = PersonalDetailObj._id || "";

      // console.log(JSON.stringify(obj))

      try {
        let res;
        if (!FoundId) {
          checkAndReplaceEmptyData(obj.client);

          checkAndReplaceEmptyData(obj.partner);

          console.log(JSON.stringify(obj));

          res = await PostAxios(`${DefaultUrl}/api/personalDetails/Add`, obj);
        } else {
          obj._id = PersonalDetailObj._id;
          res = await PatchAxios(
            `${DefaultUrl}/api/personalDetails/Update`,
            obj
          );
        }

        if (res) {
          console.log(res);

          localStorage.setItem("UserID", res._id);
          localStorage.setItem("UserName", res.client.clientPreferredName);

          if (
            values.client.clientMaritalStatus === "Single" ||
            values.client.clientMaritalStatus === "Widowed"
          ) {
            localStorage.setItem("UserStatus", "Single");
          } else {
            localStorage.setItem("UserStatus", "Married");
            localStorage.setItem(
              "PartnerName",
              res.partner.partnerPreferredName
            );
          }

          setSwitch(3);
          setPersonalDetailObj(res);

          // type, placement, message, description
          openNotificationSuccess(
            "success",
            "topRight",
            "Notification",
            "User Data Successfully Saved!"
          );
        }
      } catch (error) {
        console.error("Error occurred while making API call:", error?.response);
        if (error?.response?.status == 409) {
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
            "Something when wrong please check data again!"
          );
        }
      }
    } else {
      setStepsStatus(false);
      Nav("/ImportantQuestion");
    }
  };

  const StoreData = (setFieldValue) => {
    try {
      const data = JSON.parse(JSON.stringify(PersonalDetailObj)) || {};

      // Function to set field values dynamically
      const setFields = (prefix, obj) => {
        if (!obj || typeof obj !== "object") {
          throw new Error(`Invalid object for prefix ${prefix}`);
        }

        Object.keys(obj).forEach((key) => {
          try {
            if (key === "clientSameAsAbove" || key === "partnerSameAsClient") {
              setFieldValue(`${prefix}.${key}`, obj[key] || false);
            } else {
              setFieldValue(`${prefix}.${key}`, obj[key] || "");
            }
          } catch (error) {
            console.error(
              `Error setting field value for ${prefix}.${key}:`,
              error
            );
          }
        });
      };

      if (data?.client?.clientDOB) {
        const clientDOB = new Date(data.client.clientDOB);
        if (isValid(clientDOB)) {
          data.client.clientAge =
            differenceInYears(new Date(), clientDOB) || "0";
        }
      }

      if (data?.partner?.partnerDOB) {
        const partnerDOB = new Date(data.partner.partnerDOB);
        if (isValid(partnerDOB)) {
          data.partner.partnerAge =
            differenceInYears(new Date(), partnerDOB) || "0";
        }
      }

      // Check if the user data has an ID
      if (data._id) {
        setFields("client", data.client);

        // Only set partner fields if marital status is not "Single" or "Widowed"
        const maritalStatus = data.client?.clientMaritalStatus;
        if (
          maritalStatus &&
          maritalStatus !== "Single" &&
          maritalStatus !== "Widowed"
        ) {
          setFields("partner", data.partner);
        }

        // Set children and 'haveAnyChildren' fields
        setFieldValue(
          "children.numberOfChildren",
          data.children?.numberOfChildren || ""
        );
        setFieldValue(
          "children.arrayOfChildren",
          data.children?.arrayOfChildren || ""
        );
        setFieldValue("haveAnyChildren", data.haveAnyChildren.trim() || "No");
        setSwitch(3);
      }
    } catch (error) {
      console.error("An error occurred while storing data:", error);
    }
  };

  let submitChiled = () => {
    if (formRefOfChield.current) {
      formRefOfChield.current.handleSubmit(); // Trigger Formik's handleSubmit
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validate={validateForm}
      onSubmit={onSubmit}
      innerRef={formRef}
      enableReinitialize
    >
      {({
        values,
        setFieldValue,
        handleChange,
        errors,
        handleBlur,
        setFieldTouched,
      }) => {
        useEffect(() => {
          // Store Usre Data
          StoreData(setFieldValue);
        }, [userData]);

        return (
          <Form className="PersonalDetailsForm">
            {Switch == 1 && (
              <PersonalDetailsClientPartner
                values={values}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            )}

            {Switch == 2 && (
              <Childe
                formRefOfChield={formRefOfChield}
                FoundData={PersonalDetailObj}
                values={values}
                ParentformRef={formRef}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            )}

            {Switch == 3 && <PersonalDetailCards data={PersonalDetailObj} />}

            <div className={`row justify-content-center gap-2 mb-4`}>
              {Switch !== 1 && (
                <div className="col-md-3 px-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSwitch(--Switch);
                    }}
                    className="float-center w-100 btn btn-outline  backBtn "
                  >
                    {Switch == 3 ? "Edit" : "Back"}
                  </button>
                </div>
              )}

              <div
                className={` ${
                  Switch !== 1 ? "col-md-3" : "col-md-4 submitPadding"
                } `}
              >
                {Switch === 1 ? (
                  <button
                    type="button"
                    className=" btn w-100  bgColor modalBtn"
                    onClick={async () => {
                      let isValud = await touchFields(
                        setFieldTouched,
                        [
                          "client.Email",
                          "client.clientSurname",
                          "client.clientGivenName",
                          "client.clientPreferredName",
                          "client.clientDOB",
                          "client.clientAge",
                          "client.clientHomeAddress",
                          //partners
                          "partner.Email",
                          "partner.partnerSurname",
                          "partner.partnerGivenName",
                          "partner.partnerPreferredName",
                          "partner.partnerDOB",
                          "partner.partnerAge",
                          "partner.partnerHomeAddress",
                        ],
                        values,
                        validateForm
                      );

                      console.log("isValud : ", isValud);

                      if (isValud) {
                        setSwitch(++Switch);
                      }
                    }}
                  >
                    Submit
                  </button>
                ) : Switch === 2 ? (
                  <button
                    type="button"
                    className=" btn w-100  bgColor modalBtn"
                    onClick={submitChiled}
                  >
                    {Switch == 3 ? "Next" : "Submit"}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className=" btn w-100  bgColor modalBtn"
                  >
                    {Switch == 3 ? "Next" : "Submit"}
                  </button>
                )}
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PersonalDetailNew;
