import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form } from "formik";
import { useRecoilValue } from "recoil";
import { ConfigProvider, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { defaultUrl } from "../../../../Store/Store";
import { toCommaAndDollar } from "../../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const Contributions = (props) => {
  const DefaultUrl = useRecoilValue(defaultUrl);
  const [dynamicFields, setDynamicFields] = useState([]);

  // ---------------- INITIAL VALUES ----------------
  const initialValues = {
    NumberOfMap: "",
    newEntries: [],
  };

  // ---------------- FILL EXISTING DATA ----------------
  const fillInitialValues = (setFieldValue) => {
    const index = parseFloat(
      props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
    );
    const BaseKey = props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "");

    let data =
      props.modalObject.values?.[BaseKey]?.[index]?.[
        props.modalObject.key + "Array"
      ] || [];

    // NEW: Read the stored start year if available
    const savedStartYear =
      props.modalObject.values?.[BaseKey]?.[index]?.[
        props.modalObject.key + "StartYear"
      ] || null;

    // Set startYear (so FY list rebuilds correctly)
    if (savedStartYear) {
      setFieldValue("startYear", savedStartYear);
    }

    if (data.length > 0) {
      // Populate rows data (entries)
      setFieldValue("newEntries", data);
    } else {
      props.setIsEditing(true);
    }
  };

  // ---------------- FORM SUBMIT ----------------
  const onSubmit = async (values) => {
    const { startYear, newEntries } = values;

    // 1️⃣ Generate financial year array based on startYear
    const fyArray = getFinancialYearsFrom(Number(startYear));

    // 2️⃣ Align entries with FY count
    //    Only take entries up to FY count
    const alignedEntries = (newEntries || []).slice(0, fyArray.length);

    // 3️⃣ Save startYear + entries into parent form
    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}Array`,
      alignedEntries
    );

    // Also save startYear
    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}StartYear`,
      startYear
    );

    // 4️⃣ Close modal / exit edit mode
    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  // ---------------- CALCULATE CONTRIBUTIONS ----------------
  const Calculate = (values, setFieldValue, currentInput, stakeHolder) => {
    try {
      console.log("Calculating contributions...");
      const index = parseFloat(stakeHolder?.match(/\[(\d+)\]/)?.[1] || 0);
      const getVal = (field) =>
        parseFloat(
          values?.newEntries?.[index]?.[field]
            ?.toString()
            .replace(/[^0-9.-]+/g, "") || 0
        );
      const rawVal =
        parseFloat(
          currentInput?.value?.toString().replace(/[^0-9.-]+/g, "") || 0
        ) || 0;

      let employerContributions = getVal("employerContributions");
      let concessional = getVal("concessional");

      if (currentInput.name === `newEntries[${index}].concessional`)
        concessional = rawVal;
      else if (
        currentInput.name === `newEntries[${index}].employerContributions`
      )
        employerContributions = rawVal;

      const totalConcessional = employerContributions + concessional;

      setFieldValue(
        `newEntries[${index}].totalConcessional`,
        toCommaAndDollar(totalConcessional)
      );
    } catch (err) {
      console.error("❌ Calculation error:", err);
    }
  };

  // ---------------- TABLE COLUMNS ----------------
  const columns = [
    { title: "No#", dataIndex: "no", key: "no", justText: true, width: 60 },
    {
      title: "Financial Years",
      dataIndex: "financialYears",
      key: "financialYears",
      justText: true,
    },
    {
      title: "Employer Contributions",
      dataIndex: "employerContributions",
      key: "employerContributions",
      type: "number-toComma",
      placeholder: "Employer Contributions",
      func: Calculate,
      callBack: true,
    },
    {
      title: "Concessional (Inc. Salary Sac)",
      dataIndex: "concessional",
      key: "concessional",
      type: "number-toComma",
      placeholder: "Concessional",
      callBack: true,
      func: Calculate,
    },
    {
      title: "Total Concessional Contributions",
      dataIndex: "totalConcessional",
      key: "totalConcessional",
      type: "number-toComma",
      placeholder: "Total Concessional",
      disabled: true,
    },
    {
      title: "Non-Concessional Contributions",
      dataIndex: "nonConcessionalContributions",
      key: "nonConcessionalContributions",
      type: "number-toComma",
      placeholder: "Non-Concessional Contributions",
    },
  ];

  function getFinancialYearsFrom(startYear) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0 = Jan, 11 = Dec

    // Determine the CURRENT Australian financial year end
    // If July (6) or later, current FY ends next year
    const currentFYEnd = currentMonth >= 6 ? currentYear + 1 : currentYear;

    const years = [];

    for (let y = startYear; y < currentFYEnd; y++) {
      years.push(`${y}/${y + 1}`);
    }

    return years;
  }

  // ---------------- RENDER ----------------
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleBlur, handleChange }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        const dataRows = useMemo(() => {
          const startYear = Number(values.startYear); // user selected year
          if (!startYear) return [];

          const fyArray = getFinancialYearsFrom(startYear); // ["2025/2026", ...]

          return fyArray.map((fy, i) => {
            const entry = values.newEntries?.[i] || {};

            return {
              key: i,
              index: i,
              no: i + 1,
              financialYears: fy,
              stakeHolder: `newEntries[${i}]`,
              employerContributions: entry.employerContributions || "",
              concessional: entry.concessional || "",
              totalConcessional: entry.totalConcessional || "",
              nonConcessionalContributions:
                entry.nonConcessionalContributions || "",
            };
          });
        }, [values.startYear, values.newEntries]);

        return (
          <Form>
            <ConfigProvider
              theme={{
                components: {
                  Select: { colorBorder: "#36b446" },
                  DatePicker: { colorBorder: "#36b446" },
                },
              }}
            >
              <div className="d-flex flex-row justify-content-center align-items-center gap-3 mt-2">
                <p
                  className="mt-3"
                  onClick={() => {
                    console.log(values);
                  }}
                >
                  {props.modalObject.question}
                </p>

                <DatePicker
                  picker="year"
                  placeholder="Select Year"
                  size="large"
                  name="startYear"
                  style={{ width: "15%" }}
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  disabledDate={(current) => {
                    // Disable future years
                    return current && current.year() > new Date().getFullYear();
                  }}
                  value={
                    values.startYear ? dayjs(values.startYear.toString()) : null
                  }
                  disabled={props?.isEditing === false}
                  onChange={(date) => {
                    if (date) {
                      const year = date.year();
                      setFieldValue("startYear", year);
                    }
                  }}
                />
              </div>
            </ConfigProvider>

            {values?.startYear && (
              <div className="mt-4 All_Client reportSection">
                <AntdTable
                  columns={columns}
                  data={dataRows}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isEditing={props?.isEditing}
                  setIsEditing={props?.setIsEditing}
                />
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default Contributions;
