import { Form, Formik } from "formik";
import React, { useEffect, useMemo } from "react";
import { ConfigProvider } from "antd";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

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

    if (props.flagState) props.setFlagState(false);
  };

  // AntD table columns
  const tableFields = [
    {
      key: "leaveType",
      dataIndex: "leaveType",
      type: "text",
      title: "Leave Type",
      disabled: true,
    },
    {
      key: "amount",
      dataIndex: "amount",
      type: "number",
      title: "Amount",
      placeholder: "Enter amount",
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
    },
  ];

  const AntDynamicTable = DynamicTableForInputsSection("antd");

  return (
    <Formik
      initialValues={initialValues} // start empty, filled with setFieldValue
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
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
              <AntDynamicTable
                columns={tableFields}
                data={tableData}
                values={values}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </ConfigProvider>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LeaveEntitlementsModal;
