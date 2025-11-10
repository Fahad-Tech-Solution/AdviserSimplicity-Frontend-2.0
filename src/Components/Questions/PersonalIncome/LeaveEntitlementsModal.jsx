import { Form, Formik } from "formik";
import React, { useEffect, useMemo } from "react";
import { ConfigProvider, Alert } from "antd";
import * as Yup from "yup"; // Add Yup import
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

// Validation schema for each leave type
const leaveTypeSchema = Yup.object({
  leaveType: Yup.string().required("Leave type is required"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .min(0, "Amount cannot be negative")
    .required("Amount is required"),
  time: Yup.string()
    .oneOf(["Days", "Weeks", "Hours"], "Invalid time unit")
    .required("Time unit is required"),
});

// Main validation schema
const validationSchema = Yup.object({
  annual: leaveTypeSchema,
  sick: leaveTypeSchema,
  longService: leaveTypeSchema,
});

const AntDynamicTable = DynamicTableForInputsSection("antd");
const LeaveEntitlementsModal = (props) => {
  const { key, parentValues, parentKey } = props.modalObject;

  let initialValues = {
    annual: { leaveType: "Annual Leave", amount: "", time: "" },
    sick: { leaveType: "Sick Leave", amount: "", time: "" },
    longService: { leaveType: "Long Service Leave", amount: "", time: "" },
  };

  // Fill initial values dynamically
  const fillInitialValues = (setFieldValue) => {
    const modalData =
      parentValues?.[parentKey.replace(".", "")]?.[`${key}`] || {};
    if (Object.keys(modalData).length > 0) {
      setFieldValue("annual.leaveType", "Annual Leave");
      setFieldValue("annual.amount", modalData.annualLeaveAmount ?? "");
      setFieldValue("annual.time", modalData.annualLeaveTime ?? "");

      setFieldValue("sick.leaveType", "Sick Leave");
      setFieldValue("sick.amount", modalData.sickLeaveAmount ?? "");
      setFieldValue("sick.time", modalData.sickLeaveTime ?? "");

      setFieldValue("longService.leaveType", "Long Service Leave");
      setFieldValue(
        "longService.amount",
        modalData.longServiceLeaveAmount ?? ""
      );
      setFieldValue("longService.time", modalData.longServiceLeaveTime ?? "");
    } else {
      props.setIsEditing(!props.isEditing);
    }
  };

  // Submit handler
  const onSubmit = (values) => {
    console.log(values);
    const Obj = {
      annualLeaveAmount: values.annual.amount ?? "",
      annualLeaveTime: values.annual.time ?? "",

      sickLeaveAmount: values.sick.amount ?? "",
      sickLeaveTime: values.sick.time ?? "",

      longServiceLeaveAmount: values.longService.amount ?? "",
      longServiceLeaveTime: values.longService.time ?? "",
    };

    console.log(Obj);

    props.setFieldValue(`${parentKey}${key}`, Obj);

    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  // AntD table columns
  const tableFields = [
    {
      key: "leaveType",
      dataIndex: "leaveType",
      type: "text",
      title: "Leave Type",
      disabled: true,
      CheckError: true,
    },
    {
      key: "time",
      dataIndex: "time",
      type: "select",
      title: "Time",
      placeholder: "Select",
      options: [
        { value: "Days", label: "Days" },
        { value: "Weeks", label: "Weeks" },
        { value: "Hours", label: "Hours" },
      ],
      CheckError: true,
    },
    {
      key: "amount",
      dataIndex: "amount",
      type: "number",
      title: "Amount",
      placeholder: "Enter amount",
      CheckError: true,
    },
  ];

  const getFieldTitle = (BaseKey, values, key) => {
    return values?.[BaseKey]?.[key] || BaseKey;
  };

  return (
    <Formik
      initialValues={initialValues} // start empty, filled with setFieldValue
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize
      innerRef={props.formRef}
      validateOnMount={false} // ⬅️ Important
    >
      {({
        values,
        setFieldValue,
        handleChange,
        handleBlur,
        errors,
        touched,
      }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [parentValues]);

        // Table data rows
        const tableData = useMemo(
          () => [
            {
              key: "annualLeave",
              stakeHolder: "annual",
              leaveType: "Annual Leave",
              amount: values?.annual?.amount || "",
              time: values?.annual?.time || "",
            },
            {
              key: "sickLeave",
              stakeHolder: "sick",
              leaveType: "Sick Leave",
              amount: values?.sick?.amount || "",
              time: values?.sick?.time || "",
            },
            {
              key: "longServiceLeave",
              stakeHolder: "longService",
              leaveType: "Long Service Leave",
              amount: values?.longService?.amount || "",
              time: values?.longService?.time || "",
            },
          ],
          [values]
        );

        return (
          <Form>
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
              {Object.keys(errors).length > 0 && touched && (
                <Alert
                  type="error"
                  message="Validation Errors"
                  description={
                    <ul className="mb-0">
                      {Object.entries(errors).map(([key, value]) => {
                        const errorKeys = Object.keys(value || {});
                        return errorKeys.map((errorKey) => (
                          <li key={`${key}-${errorKey}`}>
                            {`${getFieldTitle(key, values, "leaveType")}: ${
                              typeof value[errorKey] === "string"
                                ? value[errorKey]
                                : Object.values(value[errorKey])[0]
                            }`}
                          </li>
                        ));
                      })}
                    </ul>
                  }
                  className="mb-4"
                  showIcon
                />
              )}

              <AntDynamicTable
                columns={tableFields}
                data={tableData}
                values={values}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleSubmit={props?.handleOk}
                isEditing={props?.isEditing}
                setIsEditing={props?.setIsEditing}
                errors={errors}
                touched={touched}
              />
            </ConfigProvider>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LeaveEntitlementsModal;
