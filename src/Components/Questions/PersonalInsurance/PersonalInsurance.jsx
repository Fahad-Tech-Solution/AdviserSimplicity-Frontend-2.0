import { Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { toCommaAndDollar } from "../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const PersonalInsurance = (props) => {
  const [UserStatus] = useState(localStorage.getItem("UserStatus"));

  const initialValues = {};

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
      }
    } catch (err) {
      console.error("Error initializing values:", err);
    }
  };

  const onSubmit = async (values) => {
    const rows = values || [];
    console.log("Submitted NewLoadingExclusion values:", values);

    // Save rows back to parent field
    props.setFieldValue(
      `${props.modalObject.stakeHolder || ""}${props.modalObject.key}Details`,
      values
    );

    props.setFieldValue(
      `${props.modalObject.stakeHolder || ""}${props.modalObject.key}`,
      rows.monthlyAmount
    );

    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  const columns = [
    {
      title: "No#",
      dataIndex: "index",
      key: "index",
      render: (_, __, i) => i + 1,
      justText: true,
      width: 60,
    },
    {
      title: "Monthly Amount",
      dataIndex: "monthlyAmount",
      key: "monthlyAmount",
      type: "number-toComma",
      placeholder: "$0,000",
      width: 160,
    },
    {
      title: "Waiting Period",
      dataIndex: "waitingPeriod",
      key: "waitingPeriod",
      type: "select",
      options: [
        { value: "30 Days", label: "30 Days" },
        { value: "60 Days", label: "60 Days" },
        { value: "90 Days", label: "90 Days" },
        { value: "120 Days", label: "120 Days" },
        { value: "180 Days", label: "180 Days" },
        { value: "2 Years", label: "2 Years" },
      ],
      width: 160,
    },
    {
      title: "Benefit Period",
      dataIndex: "benefitPeriod",
      key: "benefitPeriod",
      type: "select",
      options: [
        { value: "2 Years", label: "2 Years" },
        { value: "5 Years", label: "5 Years" },
        { value: "To Age 60", label: "To Age 60" },
        { value: "To Age 65", label: "To Age 65" },
        { value: "To Age 70", label: "To Age 70" },
      ],
      width: 160,
    },
    {
      title: "Own Occ Period",
      dataIndex: "ownOccPeriod",
      key: "ownOccPeriod",
      type: "select",
      options: [
        { value: "2 Years", label: "2 Years" },
        { value: "5 Years", label: "5 Years" },
        { value: "To Age 60", label: "To Age 60" },
        { value: "To Age 65", label: "To Age 65" },
        { value: "To Age 70", label: "To Age 70" },
      ],
      width: 160,
    },
    {
      title: "Premium Type",
      dataIndex: "premiumType",
      key: "premiumType",
      type: "select",
      options: [
        { value: "Stepped", label: "Stepped" },
        { value: "Level", label: "Level" },
      ],
      width: 150,
    },
    {
      title: "Benefit Type",
      dataIndex: "benefitType",
      key: "benefitType",
      type: "select",
      options: [
        { value: "Agreed", label: "Agreed" },
        { value: "Indemnity", label: "Indemnity" },
      ],
      width: 150,
    },
    {
      title: "CPI",
      dataIndex: "CPI",
      key: "CPI",
      type: "yesno",
      width: 100,
    },
    {
      title: "Increasing Claims",
      dataIndex: "increasingClaims",
      key: "increasingClaims",
      type: "yesno",
      width: 150,
    },
    {
      title: "Accident Option",
      dataIndex: "accidentOption",
      key: "accidentOption",
      type: "yesno",
      width: 150,
    },
    {
      title: "Superlinked",
      dataIndex: "superlinked",
      key: "superlinked",
      type: "yesno",
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
          return Array.from({ length: 1 }, (_, i) => ({
            key: i,
            index: 1,
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

export default PersonalInsurance;
