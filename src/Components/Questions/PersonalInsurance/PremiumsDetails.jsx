import { Field, Form, Formik } from "formik";
import React, { useEffect, useState, useMemo } from "react";
import {
  RenderName,
  toCommaAndDollar,
  toPercentage,
} from "../../Assets/Api/Api";
import { useRecoilValue } from "recoil";
import { QuestionDetail } from "../../../Store/Store";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import { Placeholder } from "react-bootstrap";

const AntdTable = DynamicTableForInputsSection("antd");

const PremiumsDetails = (props) => {
  const [UserStatus] = useState(localStorage.getItem("UserStatus"));
  const questionDetail = useRecoilValue(QuestionDetail);

  const initialValues = {};

  // ✅ Fill initial values for edit
  const fillInitialValues = (setFieldValue) => {
    try {
      const index = parseFloat(
        props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
      );
      const BaseKey = props.modalObject.stakeHolder.split(".");

      console.log("BaseKey:", BaseKey, "Index:", index);

      let editDetails =
        props.modalObject.values?.[BaseKey[0]]?.[BaseKey[1].split("[")[0]]?.[
          index
        ]?.[props.modalObject.key + "Details"] || [];

      if (editDetails && Object.keys(editDetails).length > 0) {
        Object.keys(editDetails).forEach((field) => {
          setFieldValue(field, editDetails[field] || "");
        });
      } else {
        props.setIsEditing(true);
      }
    } catch (err) {
      console.error("Error initializing values:", err);
      props.setIsEditing(true);
    }
  };

  let onSubmit = async (values) => {
    console.log(values, props.modalObject);
    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}Details`,
      values
    );
    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}`,
      values.commissionPayable
    );

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  const FormulaSetting = (values, setFieldValue, currentInput, stakeHolder) => {
    try {
      const row = values || {};

      // Extract field name
      const fieldName = currentInput.name.split(".").pop();

      // Get all premium values
      let life =
        parseFloat((row.life || "").toString().replace(/[^0-9.-]+/g, "")) || 0;
      let tpd =
        parseFloat((row.tpd || "").toString().replace(/[^0-9.-]+/g, "")) || 0;
      let trauma =
        parseFloat((row.trauma || "").toString().replace(/[^0-9.-]+/g, "")) ||
        0;
      let ip =
        parseFloat((row.ip || "").toString().replace(/[^0-9.-]+/g, "")) || 0;
      let frequency = parseFloat(row.frequency) || 1;
      let commissionRate =
        parseFloat(
          (row.commissionRate || "").toString().replace(/[^0-9.-]+/g, "")
        ) || 0;

      // Update values if field changed
      if (fieldName === "life") {
        life = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
      } else if (fieldName === "tpd") {
        tpd = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
      } else if (fieldName === "trauma") {
        trauma = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
      } else if (fieldName === "ip") {
        ip = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
      } else if (fieldName === "frequency") {
        frequency = parseFloat(currentInput.value) || 1;
      } else if (fieldName === "commissionRate") {
        commissionRate =
          parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
      }

      // Calculate total cost: (Life + TPD + Trauma + IP) * Frequency
      const totalPremiums = life + tpd + trauma + ip;
      const totalCost = totalPremiums * frequency;

      // Calculate commission payable: Total Cost * Commission Rate / 100
      const commissionPayable = totalCost * commissionRate;

      // Update field values
      setFieldValue(`totalCost`, toCommaAndDollar(totalCost));
      setFieldValue(`commissionPayable`, toCommaAndDollar(commissionPayable));
    } catch (error) {
      console.error("Error in FormulaSetting:", error);
    }
  };

  const columns = [
    {
      title: "No#",
      dataIndex: "index",
      key: "index",
      render: (_, __, i) => i + 1,
      width: 60,
      justText: true,
    },
    {
      title: "Life",
      dataIndex: "life",
      key: "life",
      placeholder: "Life",
      type: "number-toComma",
      width: 120,
      callBack: true,
      func: FormulaSetting,
    },
    {
      title: "TPD",
      dataIndex: "tpd",
      placeholder: "TPD",
      key: "tpd",
      type: "number-toComma",
      width: 120,
      callBack: true,
      func: FormulaSetting,
    },
    {
      title: "Trauma",
      dataIndex: "trauma",
      key: "trauma",
      type: "number-toComma",
      placeholder: "Trauma",
      width: 120,
      callBack: true,
      func: FormulaSetting,
    },
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip",
      type: "number-toComma",
      placeholder: "IP",
      width: 120,
      callBack: true,
      func: FormulaSetting,
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      type: "select",
      width: 150,
      selectedOptionValue: true,
      callBack: true,
      func: FormulaSetting,
      options: [
        { value: "12", label: "Monthly" },
        { value: "4", label: "Quarterly" },
        { value: "6", label: "Half Yearly" },
        { value: "1", label: "Yearly" },
      ],
    },
    {
      title: "Total Cost p.a",
      dataIndex: "totalCost",
      key: "totalCost",
      type: "text",
      placeholder: "Total Cost p.a",
      disabled: true,
      width: 150,
    },
    {
      title: "Payee of Premiums",
      dataIndex: "payeeOfPremiums",
      key: "payeeOfPremiums",
      type: "select",
      selectedOptionValue: true,
      options: [
        { value: "Client", label: RenderName("client") },
        ...(UserStatus !== "Single"
          ? [{ value: "Partner", label: RenderName("partner") }]
          : []),
        { value: "Super Rollover", label: "Super Rollover" },
        { value: "SMSF", label: "SMSF" },
        { value: "Business", label: "Business" },
        { value: "Company (Pty Ltd)", label: "Company (Pty Ltd)" },
        { value: "Family Trust", label: "Family Trust" },
        { value: "Other", label: "Other" },
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
      type: "number-toPercent",
      placeholder: "Commission Rate",
      width: 150,
      callBack: true,
      func: FormulaSetting,
    },
    {
      title: "Commission Payable",
      dataIndex: "commissionPayable",
      key: "commissionPayable",
      type: "text",
      disabled: true,
      width: 150,
      placeholder: "Commission Payable",
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
            ...values,
          }));
        }, [values]);

        return (
          <Form>
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
            <button type="submit" style={{ display: "none" }}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PremiumsDetails;
