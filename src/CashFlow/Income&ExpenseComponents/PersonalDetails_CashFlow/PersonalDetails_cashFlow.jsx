// ...existing code...
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInYears } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CashFlowData,
  CashFlowDownloading,
  CashFlowLastSyncAt,
  CashFlowScenarioData,
  defaultUrl,
  Loading,
  PersonalDetailsData,
  QuestionShift,
} from "../../../Store/Store";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  PostAxiosBlob,
  RenderName,
} from "../../../Components/Assets/Api/Api";
import { useNavigate } from "react-router-dom";
import { ConfigProvider, Divider, Spin, Alert, Button, Tooltip } from "antd";
import { FaDownload } from "react-icons/fa";
import DynamicTableForInputsSection from "../../../Components/Assets/Table/DynamicTableForInputsSection";
import { IoReload } from "react-icons/io5";
import ProfileCard from "../../../Components/PersonalDetails/ProfileCard";
import { FaCaretRight } from "react-icons/fa6";
import { Grid } from "antd";
import ProfileCard_cashFlow from "./ProfileCard_cashFlow";
const { useBreakpoint } = Grid;
const AntdDynamicTable = DynamicTableForInputsSection("antd");

const clientSchema = Yup.object({
  maritalStatus: Yup.string().required("Marital Status is required"),

  plannedRetirementAge: Yup.number()
    .min(0, "Planned Retirement age cannot be negative.")
    .required("Planned Retirement age is required"),
});

const partnerSchema = Yup.object({
  maritalStatus: Yup.string().required("Partner Marital Status is required"),

  plannedRetirementAge: Yup.number()
    .min(0, "Planned Retirement age cannot be negative.")
    .required("Planned Retirement age is required"),

  name: Yup.string().required("Partner name is required"),

  DOB: Yup.date().nullable(),
});

const PersonalDetails_cashFlow = (Props) => {
  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  const [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);
  const [cashFlowLastSyncAt, setCashFlowLastSyncAt] =
    useRecoilState(CashFlowLastSyncAt);
  const screens = useBreakpoint();
  const [loadingState, setLoadingState] = useRecoilState(Loading);
  const [step, setStep] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef(null);

  const DefaultUrl = useRecoilValue(defaultUrl);
  const PersonalDetailObj = useRecoilValue(PersonalDetailsData);
  const CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);
  const [cashFlowDownloading, setCashFlowDownloading] =
    useRecoilState(CashFlowDownloading);

  const Nev = useNavigate();

  const singleArray = ["Single", "Widowed"];

  const initialValues = {
    client: {
      name: "",
      DOB: "",
      age: "",
      maritalStatus: "",
      gender: "",
      privateHealthCover: "",
      retirementYear: "",
      plannedRetirementAge: "",
      preservationAge: "",
    },
    partner: {
      name: "",
      DOB: "",
      age: "",
      maritalStatus: "",
      gender: "",
      privateHealthCover: "",
      retirementYear: "",
      plannedRetirementAge: "",
      preservationAge: "",
    },
  };

  // Validation schema (guided by PersonalDetailNew)
  const validationSchema = Yup.object({
    /**
     * CLIENT
     * Always required
     */
    client: clientSchema.required(),

    /**
     * PARTNER
     * Required only when client.maritalStatus
     * is NOT Single or Widowed
     */
    partner: Yup.object().when("client.maritalStatus", {
      is: (status) => !singleArray.includes(status),

      then: partnerSchema.required(),

      otherwise: Yup.object().nullable().notRequired(),
    }),
  });

  // ...existing code...

  // Table columns (simple text/select/antdate/yesno types)
  const maritalStatusOptions = [
    { value: "Married", label: "Married" },
    { value: "Partnered", label: "Partnered" },
    { value: "Single", label: "Single" },
    { value: "DeFacto", label: "De-Facto" },
    { value: "Widowed", label: "Widowed" },
  ];

  const GenderStatusOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
    value: (i + 1).toString(),
    label: "Year " + (i + 1),
  }));

  const personalFields = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      type: "text",
      CheckError: true,
      justText: true,
    },
    {
      title: "Date of Birth",
      dataIndex: "DOB",
      key: "DOB",
      type: "antdate",
      CheckError: true,
      callBack: true,
      func: (values, setFieldValue, thisInput, stakeHolder) => {
        const age =
          differenceInYears(
            new Date(),
            new Date(thisInput.value || thisInput)
          ) || 0;
        setFieldValue(`${stakeHolder}.age`, age ? Math.max(0, age - 1) : 0);
      },
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      type: "text",
      disabled: true,
    },
    {
      title: "Marital Status",
      dataIndex: "maritalStatus",
      key: "maritalStatus",
      type: "select",
      options: maritalStatusOptions,
      CheckError: true,
    },
    {
      title: "Sex",
      dataIndex: "gender",
      key: "gender",
      type: "select",
      options: GenderStatusOptions,
    },
    {
      title: "Private Health Cover",
      dataIndex: "privateHealthCover",
      key: "privateHealthCover",
      type: "yesno",
      width: screens.xxl ? 94 : 100,
    },
    {
      title: "Retirement Year",
      dataIndex: "retirementYear",
      key: "retirementYear",
      type: "select",
      options: loanTermOptions,
    },
    {
      title: "Planned Retirement age",
      dataIndex: "plannedRetirementAge",
      key: "plannedRetirementAge",
      type: "number",
      CheckError: true,
      disabled: true,
    },
    {
      title: "Preservation age",
      dataIndex: "preservationAge",
      key: "preservationAge",
      type: "number",
      disabled: true,
    },
  ];

  // Helper: flatten Formik errors to [path, message] list
  const flattenErrors = (obj, parentKey = "") =>
    Object.entries(obj || {}).flatMap(([key, val]) => {
      const path = parentKey ? `${parentKey}.${key}` : key;
      return typeof val === "string" ? [[path, val]] : flattenErrors(val, path);
    });

  // Component: show section-level errors (similar to PersonalDetailNew)
  const SectionErrorAlert = ({
    title,
    columns,
    errors,
    errorShow,
    flattenErrors,
    BaseKey,
  }) => {
    const fieldKeys = columns.map((col) => col.dataIndex);
    const baseKeys = Array.isArray(BaseKey) ? BaseKey : [BaseKey];
    const sectionErrors = flattenErrors(errors).filter(([field]) => {
      const lastKey = field.split(".").pop();
      const matchesBase =
        !BaseKey ||
        baseKeys.some(
          (key) => key && (field === key || field.startsWith(`${key}.`))
        );
      const matchesField = fieldKeys.includes(lastKey);
      return matchesBase && matchesField;
    });

    if (!errorShow || sectionErrors.length === 0) return null;
    return (
      <div className="mt-3">
        <Alert
          message={`Validation Errors (${title})`}
          description={
            <ul style={{ marginLeft: 20 }}>
              {sectionErrors.map(([field, errorMsg]) => (
                <li key={field}>
                  <strong>{errorMsg}</strong>
                </li>
              ))}
            </ul>
          }
          type="error"
          showIcon
          className="mb-3"
        />
      </div>
    );
  };

  // Fill initial values (merge data from PersonalDetailObj, CashFlowScenarioDataObj, cashFlowData)
  const fillInitialValues = (setFieldValue) => {
    try {
      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj")) || {};
      const updateFields = (data, prefix) => {
        if (!data) return;
        const fields =
          prefix === "client"
            ? {
                name: data.name || data.clientGivenName || "",
                DOB: data.DOB || data.clientDOB || "",
                age: data.age || data.clientAge || "",
                gender: data.gender || data.clientGender || "",
                privateHealthCover:
                  data.privateHealthCover ||
                  data.clientPrivateHealthCoverRadio ||
                  "",
                maritalStatus:
                  data.maritalStatus || data.clientMaritalStatus || "",
                retirementYear: data.retirementYear || "",
                plannedRetirementAge: data.plannedRetirementAge || "",
                preservationAge: data.preservationAge || "",
              }
            : {
                name: data.name || data.partnerGivenName || "",
                DOB: data.DOB || data.partnerDOB || "",
                age: data.age || data.partnerAge || "",
                gender: data.gender || data.partnerGender || "",
                privateHealthCover:
                  data.privateHealthCover ||
                  data.partnerPrivateHealthCoverRadio ||
                  "",
                maritalStatus:
                  data.maritalStatus || data.partnerMaritalStatus || "",
                retirementYear: data.retirementYear || "",
                plannedRetirementAge: data.plannedRetirementAge || "",
                preservationAge: data.preservationAge || "",
              };

        Object.entries(fields).forEach(([key, value]) => {
          setFieldValue(`${prefix}.${key}`, value);
          if (prefix === "client") {
            if (key === "name") localStorage.setItem("UserName", value);
            if (key === "maritalStatus")
              localStorage.setItem(
                "UserStatus",
                singleArray.includes(value) ? "Single" : "Married"
              );
          }
          if (prefix === "partner" && key === "name") {
            localStorage.setItem("PartnerName", value);
          }
        });
      };

      // Prefill from PersonalDetailObj if available
      if (PersonalDetailObj && PersonalDetailObj.client) {
        updateFields(PersonalDetailObj.client, "client");
        updateFields(PersonalDetailObj.partner, "partner");
      } else if (CashFlowScenarioDataObj?.cf_personalDetails) {
        // Prefill from cashflow scenario
        updateFields(
          CashFlowScenarioDataObj.cf_personalDetails.client,
          "client"
        );
        updateFields(
          CashFlowScenarioDataObj.cf_personalDetails.partner,
          "partner"
        );
      }

      setStep(0);

      // Finally override with any saved cashFlowData
      if (cashFlowData?.cf_personalDetails) {
        updateFields(cashFlowData.cf_personalDetails.client, "client");
        updateFields(cashFlowData.cf_personalDetails.partner, "partner");
        setStep(1);
      }
    } catch (err) {
      console.error("Error in fillInitialValues:", err);
    }
  };

  // Submit (kept largely as original, with same API endpoints)
  const onSubmit = async (values) => {
    try {
      console.log("submit chala");
      const obj = { ...values };
      obj.scenarioFK = JSON.parse(localStorage.getItem("ScenarioObj"))._id;

      obj.client.maritalStatus === "Single" ||
      obj.client.maritalStatus === "Widowed"
        ? (obj.partner = {})
        : (obj.partner = obj.partner);

      const bankAccountArray = cashFlowData?.cf_personalDetails?._id || "";
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/CF/cf_personalDetails/Add`,
          obj
        );
      } else {
        obj._id = cashFlowData.cf_personalDetails._id;
        res = await PatchAxios(
          `${DefaultUrl}/api/CF/cf_personalDetails/Update`,
          obj
        );
      }

      if (res) {
        const updatedData = { ...cashFlowData, cf_personalDetails: res };
        setCashFlowData(updatedData);

        localStorage.setItem(
          "UserStatus",
          singleArray.includes(res.client.maritalStatus) ? "Single" : "Married"
        );
        localStorage.setItem("UserName", res.client.name);
        if (
          res.client.maritalStatus !== "Single" &&
          res.client.maritalStatus !== "Widowed"
        ) {
          localStorage.setItem("PartnerName", res.partner.name);
        }

        openNotificationSuccess(
          "success",
          "topRight",
          "Success Notification",
          `Data of CashFlow Personal Detail is Saved`
        );

        setQuestionChange("Income-And-Expenses");
        Nev(`/user/cashflow/income-and-expenses`);
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Data of CashFlow Personal Detail is not Saved. Please try again.`
      );
    }
  };

  const DownloadExcelSheet = async (values) => {
    setCashFlowDownloading(true);
    setLoadingState(true);
    const updatedData = { ...cashFlowData, cf_personalDetails: values };
    try {
      const response = await PostAxiosBlob(
        `${DefaultUrl}/api/cal/workBookDownload`,
        updatedData
      );
      const fileName = `UpdatedWorkbook_of_${RenderName("client")}.xlsx`;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        `Excel file "${fileName}" is downloaded.`
      );
    } catch (error) {
      console.error("Download Error:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Download Failed",
        "Something went wrong while downloading the Excel file."
      );
    } finally {
      setCashFlowDownloading(false);
      setLoadingState(false);
    }
  };

  // Calculate ages / preservation / planned retirement from API and set fields
  const handleCalculateAges = async (values, setFieldValue) => {
    setLoadingState(true);
    try {
      // Quick validation: at least client DOB and retirementYear should be present
      const clientDOB = values?.client?.DOB;
      const clientRetYear = parseInt(values?.client?.retirementYear, 10) || 0;
      const partnerDOB = values?.partner?.DOB;
      const partnerRetYear = parseInt(values?.partner?.retirementYear, 10) || 0;

      if (
        (!clientDOB ||
          isNaN(new Date(clientDOB).getTime()) ||
          clientRetYear <= 0) &&
        (!partnerDOB ||
          isNaN(new Date(partnerDOB).getTime()) ||
          partnerRetYear <= 0)
      ) {
        setLoadingState(false);
        let name =
          values.client.name +
          (!["Single", "Widowed", ""].includes(
            values.client.maritalStatus || ""
          )
            ? " and " + values.partner.name
            : "");

        openNotificationSuccess(
          "error",
          "topRight",
          "Error Notification",
          `Please fill retirement year of ` + name
        );
        return;
      }
      let scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      let data = JSON.parse(JSON.stringify(cashFlowData || {}));
      data.cf_personalDetails = { ...values, scenarioFK: scenarioObj._id };

      const res = await PostAxios(
        `${DefaultUrl}/api/cal/cf_personalDetails`,
        data
      );

      if (res && res.data) {
        console.log(res, "Api Responce ya hai");
        const clientObj = res.data.client || {};
        const partnerObj = res.data.partner || {};

        if (clientObj) {
          if (typeof clientObj.preservationAge !== "undefined")
            setFieldValue(
              "client.preservationAge",
              Math.round(clientObj.preservationAge || 0)
            );
          if (typeof clientObj.plannedRetirementAge !== "undefined")
            setFieldValue(
              "client.plannedRetirementAge",
              Math.min(Math.round(clientObj.plannedRetirementAge || 0), 30)
            );
          if (typeof clientObj.age !== "undefined")
            setFieldValue("client.age", Math.round(clientObj.age || 0));
        }

        if (partnerObj) {
          if (typeof partnerObj.preservationAge !== "undefined")
            setFieldValue(
              "partner.preservationAge",
              Math.round(partnerObj.preservationAge || 0)
            );
          if (typeof partnerObj.plannedRetirementAge !== "undefined")
            setFieldValue(
              "partner.plannedRetirementAge",
              Math.min(Math.round(partnerObj.plannedRetirementAge || 0), 30)
            );
          if (typeof partnerObj.age !== "undefined")
            setFieldValue("partner.age", Math.round(partnerObj.age || 0));
        }

        setCashFlowLastSyncAt(res.lastSyncAt);
      }
    } catch (err) {
      console.error("handleCalculateAges failed:", err);
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={formRef}
    >
      {({
        values,
        setFieldValue,
        handleBlur,
        handleChange,
        errors,
        touched,
      }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [PersonalDetailObj, cashFlowData]);

        const tableData = useMemo(() => {
          const rows = [
            {
              key: "client",
              stakeHolder: "client",
              ...values.client,
            },
          ];
          if (
            !["Single", "Widowed", ""].includes(
              values.client.maritalStatus || ""
            )
          ) {
            rows.push({
              key: "partner",
              stakeHolder: "partner",
              ...values.partner,
            });
          }
          return rows;
        }, [values]);

        const flatten = (obj, parentKey = "") =>
          Object.entries(obj || {}).flatMap(([key, val]) => {
            const path = parentKey ? `${parentKey}.${key}` : key;
            return typeof val === "string" ? [[path, val]] : flatten(val, path);
          });

        const errorShow =
          Object.keys(errors || {}).length > 0 &&
          Object.keys(touched || {}).length > 0;

        return (
          <Form className="container-fluid mt-2 mt-md-0 p-0 px-md-5">
            <div className="row">
              {/* Data Table (antD) */}
              {step === 0 ? (
                <div className="col-md-12">
                  <div className="d-flex justify-content-between align-item-center">
                    <div>
                      <h4 className=" fw-bold">Personal Details</h4>
                    </div>
                    <div>
                      <Tooltip
                        title={
                          <p>
                            Last syncronized at : <br />{" "}
                            {new Date(cashFlowLastSyncAt).toLocaleString()}
                          </p>
                        }
                        color={"#36b446"}
                        key={"#36b446"}
                      >
                        <Button
                          variant="secondary"
                          onClick={() =>
                            handleCalculateAges(values, setFieldValue)
                          }
                          disabled={loadingState}
                        >
                          <IoReload />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>

                  {errorShow && errors && Object.keys(errors).length > 0 && (
                    <SectionErrorAlert
                      title="Personal Details"
                      columns={personalFields}
                      errors={errors}
                      errorShow={true}
                      flattenErrors={flatten}
                      BaseKey={["client", "partner"]}
                    />
                  )}

                  <ConfigProvider
                    theme={{
                      components: {
                        Table: {
                          headerBg: "#36B446",
                          headerColor: "#fff",
                          fontWeight: "bold",
                        },
                      },
                    }}
                  >
                    <AntdDynamicTable
                      columns={personalFields}
                      data={tableData}
                      values={values}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      isEditing={isEditing}
                      setIsEditing={setIsEditing}
                    />
                  </ConfigProvider>
                </div>
              ) : (
                <div className="col-md-12">
                  <div className="row justify-content-center align-item-center">
                    <div className={screens.xxl ? "col-md-2" : "col-md-3"}>
                      <ProfileCard_cashFlow
                        owner="client"
                        Data={{
                          ...values.client,
                          email:
                            PersonalDetailObj.client.Email ||
                            "example@maileator.com",
                          image: PersonalDetailObj.client?.image?.url || "",
                        }}
                      />
                    </div>
                    {values.client.maritalStatus !== "Single" &&
                    values.client.maritalStatus !== "Widowed" ? (
                      <div className={screens.xxl ? "col-md-2" : "col-md-3"}>
                        <ProfileCard_cashFlow
                          owner="partner"
                          Data={{
                            ...values.partner,
                            email:
                              PersonalDetailObj.partner.partnerEmail ||
                              "example2@maileator.com",
                            image: PersonalDetailObj.partner?.image?.url || "",
                          }}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>

            {/* next buttons */}
            <div
              className={"d-flex flex-row justify-content-center gap-3 my-4"}
            >
              {!isEditing &&
                (step == 1 ? (
                  <Button
                    variant="secondary"
                    style={{
                      width: screens.xxl ? "10%" : "15%",
                      minWidth: "fit-content",
                    }}
                    onClick={() => setStep(0)}
                    disabled={cashFlowDownloading}
                  >
                    View
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    style={{
                      width: screens.xxl ? "10%" : "15%",
                      minWidth: "fit-content",
                    }}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                ))}

              <Button
                variant="secondary"
                style={{
                  width: screens.xxl ? "10%" : "15%",
                  minWidth: "fit-content",
                }}
                onClick={() => DownloadExcelSheet(values)}
                disabled={cashFlowDownloading}
              >
                Download Report &nbsp;
                {cashFlowDownloading ? (
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#fff",
                      },
                    }}
                  >
                    <Spin size="small" />
                  </ConfigProvider>
                ) : (
                  <FaDownload size={14} style={{ marginBottom: "4px" }} />
                )}
              </Button>

              {isEditing ? (
                <Button
                  type="primary"
                  style={{ width: screens.xxl ? "10%" : "15%" }}
                  onClick={() => formRef.current?.submitForm()}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  type="primary"
                  style={{ width: screens.xxl ? "10%" : "15%" }}
                  onClick={() => Nev(`/user/cashflow/income-and-expenses`)}
                >
                  Next
                </Button>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PersonalDetails_cashFlow;
// ...existing code...
