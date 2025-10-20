import { Field, Form, Formik } from "formik";
import React, { useEffect, useState, useMemo } from "react";
import {
  handleInputBlur,
  handleInputChange,
  handleInputFocus,
  handleInputKeyDown,
  RenderName,
  toCommaAndDollar,
  toPercentage,
} from "../../Assets/Api/Api";
import { useRecoilValue } from "recoil";
import { QuestionDetail } from "../../../Store/Store";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const PremiumsDetails = (props) => {
  const [UserStatus] = useState(localStorage.getItem("UserStatus"));
  const questionDetail = useRecoilValue(QuestionDetail);

  const initialValues = {
  };
  const fillInitialValues = (setFieldValue) => {
    try {
      const { stakeHolder, parentValues, key } = props.modalObject

      let index = stakeHolder.replace(/[^0-9]+/g, "");
      let BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");

      let data = parentValues?.[BaseKey]?.[index]?.[key + "Details"] || {};

      console.log(data);

      if (!data || typeof data !== "object") return;

      // Fill form fields using the same structure used in onSubmit
      setFieldValue("coverType", data.coverType || "");
      setFieldValue("premiums", data.premiums || "");
      setFieldValue("frequency", data.frequency || "");
      setFieldValue("totalCost", data.totalCost || "");
      setFieldValue("payeeOfPremiums", data.payeeOfPremiums || "");
      setFieldValue("paymentMethod", data.paymentMethod || "");
      setFieldValue("commissionRate", data.commissionRate || "");


    } catch (err) {
      console.error("Error in fillInitialValues:", err);
    }
  };



  let onSubmit = async (values) => {

    console.log(values, props.modalObject)
    props.setFieldValue(`${props.modalObject.stakeHolder}${props.modalObject.key}Details`, values)
    props.setFieldValue(`${props.modalObject.stakeHolder}${props.modalObject.key}`, values.totalCost)

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  const FormulaSetting = (values, setFieldValue, currentInput, stakeHolder) => {
    try {

      const row = values || {};

      // Step 1: extract which field triggered the change
      const fieldName = currentInput.name.split(".").pop();

      // Step 2: initialize base values
      let premiums =
        parseFloat((row.premiums || "").toString().replace(/[^0-9.-]+/g, "")) || 0;
      let frequency = parseFloat(row.frequency) || 1;

      // Step 3: handle input-specific logic
      if (fieldName === "premiums") {
        premiums =
          parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
      } else if (fieldName === "frequency") {
        frequency = parseFloat(currentInput.value) || 1;
      }

      // Step 4: calculate total cost
      const totalCost = premiums * frequency;

      // Step 5: update field value safely
      setFieldValue(`totalCost`, toCommaAndDollar(totalCost));
    } catch (error) {
      console.error("Error in FormulaSetting:", error);
    }
  };


  const columns = [
    {
      title: "No#",
      dataIndex: "index",
      key: "owner",
      render: (_, __, i) => i + 1,
      width: 60,
    },
    {
      title: "Cover Type",
      dataIndex: "coverType",
      key: "coverType",
      type: "select",
      options: [
        { value: "Life", label: "Life" },
        { value: "TPD", label: "TPD" },
        { value: "Trauma", label: "Trauma" },
        { value: "Income protection", label: "Income protection" },
      ],
      width: 200,
    },
    {
      title: "Premiums",
      dataIndex: "premiums",
      key: "premiums",
      type: "number-toComma",
      width: 150,
      callBack: true,
      func: FormulaSetting,
    },


    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      type: "select",
      width: 150,
      callBack: true,
      func: FormulaSetting,
      options: [
        { value: "12", label: "Monthly" },
        { value: "6", label: "6 Monthly" },
        { value: "1", label: "Yearly" },
      ],
    },

    {
      title: "Total Cost p.a",
      dataIndex: "totalCost",
      key: "totalCost",
      type: "text",
      disabled: true,
      width: 150,
    },
    {
      title: "Payee of Premiums",
      dataIndex: "payeeOfPremiums",
      key: "payeeOfPremiums",
      type: "select",
      options: [
        { value: "client", label: RenderName("client") },
        ...(UserStatus !== "Single"
          ? [{ value: "partner", label: RenderName("partner") }]
          : []),
        { value: "SMSF", label: "SMSF" },
        { value: "Super Trustees", label: "Super Trustees" },
        { value: "Company (Pty Ltd)", label: "Company (Pty Ltd)" },
        { value: "Family Trust", label: "Family Trust" },
      ],
      width: 200,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      type: "select",
      options: [
        { value: "Credit Card", label: "Credit Card" },
        { value: "Direct Debit", label: "Direct Debit" },
        { value: "Rollover", label: "Rollover" },
        { value: "Manual", label: "Manual" },
      ],
      width: 200,
    },
    {
      title: "Commission Rate",
      dataIndex: "commissionRate",
      key: "commissionRate",
      type: "text",

      width: 150,
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        const dataRows = useMemo(() => {
          const num = Number(values.NumberOfMap) || 1;
          return Array.from({ length: num }, (_, i) => ({
            key: i,
            ...values
          }));
        }, [values]);

        return (
          <Form>
            <p className="text-end mt-1 pt-2" onClick={() => console.log(values)}>
              How many
            </p>
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
            <button type="submit" style={{ display: "none" }}>Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PremiumsDetails;
