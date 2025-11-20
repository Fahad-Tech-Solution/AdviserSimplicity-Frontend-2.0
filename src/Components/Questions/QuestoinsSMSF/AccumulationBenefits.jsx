import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form } from "formik";
import { useRecoilValue } from "recoil";
import { ConfigProvider, Select } from "antd";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { toCommaAndDollar } from "../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const AccumulationBenefits = (props) => {
  const DefaultUrl = useRecoilValue(defaultUrl);
  const questionDetail = useRecoilValue(QuestionDetail);
  const [dynamicFields, setDynamicFields] = useState([]);

  // ---------------- INITIAL VALUES ----------------
  const initialValues = {
    NumberOfMap: 1,
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

    console.log("Data", data);
    
    setFieldValue("NumberOfMap", data.length || 1);
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
          commencementDate: "",
          eligibleServiceDate: "",
          taxFreeComponent: "",
          currentBalance: "",
          taxableComponent: "",
          restrictedNonPreserved: "",
          unRestrictedNonPreserved: "",
          preservedAmount: "",
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

    const totalTaxFreeComponent = filteredEntries.reduce(
      (sum, entry) =>
        sum +
        parseFloat(entry.taxFreeComponent?.replace(/[^0-9.-]+/g, "") || 0),
      0
    );

    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}`,
      toCommaAndDollar(totalTaxFreeComponent)
    );

    if (props.flagState) {
      props.setFlagState(false);
      if (props.setIsEditing) {
        props.setIsEditing(!props.isEditing);
      }
    }
  };

  // ---------------- CALCULATE BENEFITS ----------------
  const CalculateBenefits = (
    values,
    setFieldValue,
    currentInput,
    stakeHolder
  ) => {
    try {
      console.log("Calculating accumulation benefits...");
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

      let taxFreeComponent = getVal("taxFreeComponent");
      let currentBalance = getVal("currentBalance");
      let restrictedNonPreserved = getVal("restrictedNonPreserved");
      let unRestrictedNonPreserved = getVal("unRestrictedNonPreserved");

      // Update the field that was changed
      switch (currentInput.name) {
        case `newEntries[${index}].taxFreeComponent`:
          taxFreeComponent = rawVal;
          break;
        case `newEntries[${index}].currentBalance`:
          currentBalance = rawVal;
          break;
        case `newEntries[${index}].restrictedNonPreserved`:
          restrictedNonPreserved = rawVal;
          break;
        case `newEntries[${index}].unRestrictedNonPreserved`:
          unRestrictedNonPreserved = rawVal;
          break;
        default:
          break;
      }

      // Calculate taxable component
      const taxableComponent = currentBalance - taxFreeComponent;

      // Calculate preserved amount
      const preservedAmount =
        currentBalance - restrictedNonPreserved - unRestrictedNonPreserved;

      // Update calculated fields
      setFieldValue(
        `newEntries[${index}].taxableComponent`,
        toCommaAndDollar(taxableComponent)
      );

      setFieldValue(
        `newEntries[${index}].preservedAmount`,
        toCommaAndDollar(preservedAmount)
      );
    } catch (err) {
      console.error("❌ Calculation error:", err);
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
      title: "Commencement Date",
      dataIndex: "commencementDate",
      key: "commencementDate",
      type: "antdate",
      width: 150,
    },
    {
      title: "Eligible Service Date",
      dataIndex: "eligibleServiceDate",
      key: "eligibleServiceDate",
      type: "antdate",
      width: 150,
    },
    {
      title: "Tax Free Component",
      dataIndex: "taxFreeComponent",
      key: "taxFreeComponent",
      type: "number-toComma",
      placeholder: "Tax Free Component",
      func: CalculateBenefits,
      callBack: true,
      width: 150,
    },
    {
      title: "Current Balance",
      dataIndex: "currentBalance",
      key: "currentBalance",
      type: "number-toComma",
      placeholder: "Current Balance",
      callBack: true,
      func: CalculateBenefits,
      width: 150,
    },
    {
      title: "Taxable Component",
      dataIndex: "taxableComponent",
      key: "taxableComponent",
      type: "number-toComma",
      placeholder: "Taxable Component",
      disabled: true,
      width: 150,
    },
    {
      title: "Restricted Non Preserved",
      dataIndex: "restrictedNonPreserved",
      key: "restrictedNonPreserved",
      type: "number-toComma",
      placeholder: "Restricted Non Preserved",
      callBack: true,
      func: CalculateBenefits,
      width: 180,
    },
    {
      title: "Unrestricted Non Preserved",
      dataIndex: "unRestrictedNonPreserved",
      key: "unRestrictedNonPreserved",
      type: "number-toComma",
      placeholder: "Unrestricted Non Preserved",
      callBack: true,
      func: CalculateBenefits,
      width: 200,
    },
    {
      title: "Preserved Amount",
      dataIndex: "preservedAmount",
      key: "preservedAmount",
      type: "number-toComma",
      placeholder: "Preserved Amount",
      disabled: true,
      width: 150,
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
          return Array.from({ length: num }, (_, i) => {
            const entry = values.newEntries?.[i] || {};
            return {
              key: i,
              index: i,
              no: i + 1,
              stakeHolder: `newEntries[${i}]`,
              commencementDate: entry.commencementDate || "",
              eligibleServiceDate: entry.eligibleServiceDate || "",
              taxFreeComponent: entry.taxFreeComponent || "",
              currentBalance: entry.currentBalance || "",
              taxableComponent: entry.taxableComponent || "",
              restrictedNonPreserved: entry.restrictedNonPreserved || "",
              unRestrictedNonPreserved: entry.unRestrictedNonPreserved || "",
              preservedAmount: entry.preservedAmount || "",
            };
          });
        }, [values.NumberOfMap, values.newEntries]);

        return (
          <Form>
            <div className="d-flex flex-column justify-content-center align-items-center gap-3 mt-2">
              <ConfigProvider
                theme={{
                  components: {
                    Select: { colorBorder: "#36b446" },
                  },
                }}
              ></ConfigProvider>
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

export default AccumulationBenefits;
