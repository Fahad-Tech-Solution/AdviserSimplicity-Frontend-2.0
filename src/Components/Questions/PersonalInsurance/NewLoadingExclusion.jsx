import { Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { toCommaAndDollar } from "../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const NewLoadingExclusion = (props) => {
  const [UserStatus] = useState(localStorage.getItem("UserStatus"));

  // ✅ Initial values
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
      }
    } catch (err) {
      console.error("Error initializing values:", err);
    }
  };

  // ✅ Submit logic
  const onSubmit = async (values) => {
    const rows = values || [];
    console.log("Submitted NewLoadingExclusion values:", values);

    // Save rows back to parent field
    props.setFieldValue(
      `${props.modalObject.stakeHolder || ""}${props.modalObject.key}Details`,
      values
    );

    // Calculate total Life + TPD + Trauma if needed
    // const life = parseFloat((rows.life || "").replace(/[^0-9.-]+/g, ""));
    // const tpd = parseFloat((rows.TPD || "").replace(/[^0-9.-]+/g, ""));
    // const trauma = parseFloat((rows.trauma || "").replace(/[^0-9.-]+/g, ""));
    // let total = (life || 0) + (tpd || 0) + (trauma || 0);

    props.setFieldValue(
      `${props.modalObject.stakeHolder || ""}life`,
      rows.life
    );
    props.setFieldValue(`${props.modalObject.stakeHolder || ""}TPD`, rows.TPD);
    props.setFieldValue(
      `${props.modalObject.stakeHolder || ""}trauma`,
      rows.trauma
    );

    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  // ✅ Table Columns (based on your image)
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
      title: "Life",
      dataIndex: "life",
      key: "life",
      type: "number-toComma",
      placeholder: "Life ($)",
      width: 120,
    },
    {
      title: "TPD",
      dataIndex: "TPD",
      key: "TPD",
      type: "number-toComma",
      placeholder: "TPD ($)",
      width: 120,
    },
    {
      title: "Trauma",
      dataIndex: "trauma",
      key: "trauma",
      type: "number-toComma",
      placeholder: "Trauma ($)",
      width: 120,
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
      title: "TPD Definition",
      dataIndex: "TPDDefinition",
      key: "TPDDefinition",
      type: "select",
      options: [
        { value: "Any", label: "Any" },
        { value: "Own", label: "Own" },
        { value: "Split (Own)", label: "Split (Own)" },
      ],
      width: 180,
    },
    {
      title: "Trauma Plus",
      dataIndex: "traumaPlus",
      key: "traumaPlus",
      type: "yesno", width: 100,
      
    },
    {
      title: "CPI",
      dataIndex: "CPI",
      key: "CPI",
      type: "yesno", width: 100,
      
    },
    {
      title: "Superlinked",
      dataIndex: "superlinked",
      key: "superlinked",
      type: "yesno", width: 100,
      
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
            <div className="mt-3 All_Client reportSection">
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

export default NewLoadingExclusion;
