// ...existing code...
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { differenceInYears } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CashFlowData,
  CashFlowDownloading,
  CashFlowScenarioData,
  defaultUrl,
  Loading,
  PersonalDetailsData,
  QuestionShift,
} from "../../../Store/Store";
import DynamicYesNo from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  PostAxiosBlob,
  RenderName,
  validateName,
  toCommaAndDollar,
} from "../../../Components/Assets/Api/Api";
import { useNavigate } from "react-router-dom";
import { ConfigProvider, Divider, Spin, Alert, Button } from "antd";
import { FaDownload } from "react-icons/fa";
import DynamicTableForInputsSection from "../../../Components/Assets/Table/DynamicTableForInputsSection";

const AntdDynamicTable = DynamicTableForInputsSection("antd");

const PersonalDetails_cashFlow = (Props) => {
  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  const [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);
  const [loadingState, setLoadingState] = useRecoilState(Loading);
  const [isEditing, setIsEditing] = useState(false);
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
    client: Yup.object({
      maritalStatus: Yup.string().required("Marital Status is required"),
      plannedRetirementAge: Yup.number()
        .min(0, "Planned Retirement age cannot be negative.")
        .required("Planned Retirement age is required"),
    }),

    // partner validation only active when client.maritalStatus is NOT Single or Widowed
    partner: Yup.object().when("client.maritalStatus", {
      is: (val) => !singleArray.includes(val),
      then: Yup.object({
        maritalStatus: Yup.string().required(
          "Partner Marital Status is required"
        ),
        plannedRetirementAge: Yup.number()
          .min(0, "Planned Retirement age cannot be negative.")
          .required("Planned Retirement age is required"),
        name: Yup.string().required("Partner name is required"),
        DOB: Yup.string().nullable(), // keep other partner fields optional or add rules as needed
      }).required(),
      otherwise: Yup.object().notRequired().nullable(),
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

      // Finally override with any saved cashFlowData
      if (cashFlowData?.cf_personalDetails) {
        updateFields(cashFlowData.cf_personalDetails.client, "client");
        updateFields(cashFlowData.cf_personalDetails.partner, "partner");
      }
    } catch (err) {
      console.error("Error in fillInitialValues:", err);
    }
  };

  // Submit (kept largely as original, with same API endpoints)
  const onSubmit = async (values) => {
    try {
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
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
              <div className="col-md-12">
                <h4 className="mt-4 fw-bold">Personal Details</h4>

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
            </div>

            <div className="row justify-content-end gap-2 my-4">
              <div className={`col-md-2 cashFlowNextBtn`}>
                <Button
                  variant="secondary"
                  style={{ width: "100%", minWidth: "fit-content" }}
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
              </div>
              <div className={`col-md-2 cashFlowNextBtn`}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-100"
                  onClick={() => {
                    // setErrorShow(true);
                    setIsEditing(!isEditing);
                  }}
                >
                  {isEditing ? "Next" : "Edit"}
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PersonalDetails_cashFlow;
// ...existing code...
