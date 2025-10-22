import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form } from "formik";
import { useRecoilValue } from "recoil";
import { ConfigProvider, Select, DatePicker } from "antd";
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
    NumberOfMap: props.modalObject?.editArray?.newEntries?.length || "",
    startingYear:
      props.modalObject?.editArray?.startingYear || dayjs().startOf("year"),
    newEntries: props.modalObject?.editArray?.newEntries || [],
  };

  // ---------------- FILL EXISTING DATA ----------------
  const fillInitialValues = (setFieldValue) => {
    if (props.modalObject?.editArray?.newEntries) {
      const arr = Array(props.modalObject.editArray.newEntries.length).fill("");
      setDynamicFields(arr);
      setFieldValue(
        "NumberOfMap",
        props.modalObject.editArray.newEntries.length
      );
      setFieldValue(
        "startingYear",
        dayjs(props.modalObject.editArray.startingYear)
      );
      setFieldValue("newEntries", props.modalObject.editArray.newEntries);
    }
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
        .map((_, i) => ({
          employerContributions: "",
          concessional: "",
          totalConcessional: "",
          nonConcessionalContributions: "",
        }))
    );
  };

  // ---------------- FORM SUBMIT ----------------
  const onSubmit = async (values) => {
    const { NumberOfMap, startingYear, newEntries } = values;

    const filteredEntries = (newEntries || []).slice(0, NumberOfMap);

    const Obj = {
      startingYear,
      newEntries: filteredEntries,
    };

    props.setFieldValue(
      `${props.modalObject.key}${props.modalObject.index}`,
      Obj
    );

    if (props.flagState) props.setFlagState(false);
  };

  let Calculate = (values, setFieldValue, currentInput, stakeHolder) => {
    try {
      // Extract index for dynamic row update
      const index = parseFloat(stakeHolder?.match(/\[(\d+)\]/)?.[1] || 0);

      // Helper to safely extract numeric values
      const getVal = (field) =>
        parseFloat(
          values?.newEntries?.[index]?.[field]
            ?.toString()
            .replace(/[^0-9.-]+/g, "") || 0
        );

      // Get the raw numeric value of current input
      const rawVal =
        parseFloat(
          currentInput?.value?.toString().replace(/[^0-9.-]+/g, "") || 0
        ) || 0;

      // Existing employer contribution
      let employerContributions = getVal("employerContributions");
      let concessional = getVal("concessional");

      // Update concessional
      if (currentInput.name == "concessional") {
        concessional = rawVal;
      } else if (currentInput.name == "employerContributions") {
        employerContributions = rawVal;
      }

      console.log(employerContributions, concessional, rawVal, currentInput);

      // Calculate total concessional
      const totalConcessional = employerContributions + concessional;

      setFieldValue(
        `newEntries[${index}].totalConcessional`,
        toCommaAndDollar(totalConcessional)
      );

      // Optional debug log
      // console.log(
      //   `Row ${index + 1} → Employer: ${employerContributions}, Concessional: ${concessional}, Total: ${totalConcessional}`
      // );
    } catch (err) {
      console.error("❌ Calculation error in Concessional column:", err);
    }
  };

  // ---------------- TABLE COLUMNS ----------------
  const columns = [
    {
      title: "No#",
      dataIndex: "no",
      key: "no",
      justText: true,
      width: 60,
    },
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
      onChange: Calculate,
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
          const startYear = dayjs(values.startingYear).year() || dayjs().year();
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
        }, [values.NumberOfMap, values.newEntries, values.startingYear]);

        return (
          <Form>
            <div className="d-flex flex-column justify-content-center align-items-center gap-3 mt-2 ">
              <ConfigProvider
                theme={{
                  components: {
                    Select: { colorBorder: "#36b446" },
                  },
                }}
              >
                <div className="d-flex flex-row justify-content-center align-items-center gap-3 mt-2  w-75">
                  <p className="mt-3">{props.modalObject.question}</p>

                  <Select
                    id="NumberOfMap"
                    name="NumberOfMap"
                    className="w-25"
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
                <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 mt-2">
                  <p className="text-wrap mt-3">Starting From</p>
                  <DatePicker
                    picker="year"
                    value={
                      values.startingYear ? dayjs(values.startingYear) : null
                    }
                    onChange={(date) => setFieldValue("startingYear", date)}
                    className="w-25"
                    placeholder="Select Year"
                    size="large"
                    format="YYYY"
                    disabledDate={(current) => current && current > dayjs()}
                    getPopupContainer={(triggerNode) =>
                      triggerNode.closest("table") || triggerNode
                    }
                  />
                </div>
              </ConfigProvider>
            </div>

            {values.NumberOfMap && (
              <div className="mt-4 All_Client reportSection">
                <AntdTable
                  columns={columns}
                  data={dataRows}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
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
