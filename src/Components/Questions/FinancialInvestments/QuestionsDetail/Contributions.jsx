import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form } from "formik";
import { useRecoilValue } from "recoil";
import { ConfigProvider, Select } from "antd";
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

    setFieldValue("NumberOfMap", data.length);
    setFieldValue("newEntries", data);
  };

  // ---------------- HANDLE NUMBER CHANGE ----------------
  const handleInput = (value, setFieldValue) => {
    const limited = value > 10 ? 10 : value;
    setFieldValue("NumberOfMap", limited);
    const arr = Array(limited).fill("");
    setDynamicFields(arr);

    setFieldValue(
      "newEntries",
      Array(limited)
        .fill()
        .map(() => ({
          employerContributions: "",
          concessional: "",
          totalConcessional: "",
          nonConcessionalContributions: "",
        }))
    );
  };

  // ---------------- FORM SUBMIT ----------------
  const onSubmit = async (values) => {
    const { NumberOfMap, newEntries } = values;
    const filteredEntries = (newEntries || []).slice(0, NumberOfMap);

    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}Array`,
      filteredEntries
    );

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
      title: "Concessional (Include. Salary Sac)",
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
          const num = Number(values.NumberOfMap) || 0;
          const startYear = dayjs().year(); // Always current year
          return Array.from({ length: num }, (_, i) => {
            const fy = `${startYear + i}/${startYear + i + 1}`;
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
        }, [values.NumberOfMap, values.newEntries]);

        return (
          <Form>
            <ConfigProvider
              theme={{
                components: {
                  Select: { colorBorder: "#36b446" },
                },
              }}
            >
              <div className="d-flex flex-row justify-content-center align-items-center gap-3 mt-2">
                <p className="mt-3">{props.modalObject.question}</p>

                <Select
                  id="NumberOfMap"
                  name="NumberOfMap"
                  style={{ width: "10%" }}
                  placeholder="Select Count"
                  size="large"
                  value={values.NumberOfMap || undefined}
                  onChange={(value) => handleInput(value, setFieldValue)}
                  onBlur={handleBlur}
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <Option key={i + 1} value={i + 1}>
                      {i + 1}
                    </Option>
                  ))}
                </Select>
              </div>
            </ConfigProvider>

            {values.NumberOfMap >= 1 && (
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
