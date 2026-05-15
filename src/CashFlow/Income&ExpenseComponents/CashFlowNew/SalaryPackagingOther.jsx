import { Form, Formik } from "formik";
import React, { useEffect, useMemo } from "react";
import { Row } from "react-bootstrap";
import {
  RenderName,
  toCommaAndDollar,
} from "../../../Components/Assets/Api/Api";
import DynamicTableForInputsSection from "../../../Components/Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const SalaryPackagingOther = (props) => {
  const initialValues = {
    salaryPackagingOther: "",
    GSTStatus: "Without GST",
    includeFromYear: "1",
    upUntilYear: "30",
  };

  /** Prefill values */
  const fillInitialValues = (setFieldValue) => {
    const sourceObj =
      props.modalObject.values[
        props.modalObject.stakeHolder.replace(".", "")
      ] || {};

    if (sourceObj?.[props.modalObject.key]) {
      const data = sourceObj[props.modalObject.key];
      setFieldValue("salaryPackagingOther", data.salaryPackagingOther || "");
      setFieldValue("GSTStatus", data.GSTStatus || "Without GST");
      setFieldValue("includeFromYear", data.includeFromYear || "1");
      setFieldValue("upUntilYear", data.upUntilYear || "30");
    }
  };

  const onSubmit = async (values) => {
    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}`,
      values
    );

    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  /** Year options */
  const yearOptions = Array.from({ length: 31 }, (_, i) => ({
    value: i.toString(),
    label: `Year ${i}`,
  }));

  /** AntD Table Columns */
  const columns = [
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      width: 120,
      render: () => RenderName(props.modalObject.stakeHolder.replace(".", "")),
    },
    {
      title: "Salary Packaging (Other)",
      dataIndex: "salaryPackagingOther",
      key: "salaryPackagingOther",
      type: "number-toComma",
      placeholder: "Salary Packaging (Other)",
      callBack: true,
      func: (values, setFieldValue, currentInput) => {
        setFieldValue(
          currentInput.name,
          toCommaAndDollar(currentInput.value.replace(/[^0-9.-]+/g, ""))
        );
      },
    },
    {
      title: "GST Status",
      dataIndex: "GSTStatus",
      key: "GSTStatus",
      type: "select",
      placeholder: "GST Status",
      options: [
        { value: "With GST", label: "With GST" },
        { value: "Without GST", label: "Without GST" },
      ],
      selectedOptionValue: true,
    },
    {
      title: "Include From Year",
      dataIndex: "includeFromYear",
      key: "includeFromYear",
      type: "select",
      options: yearOptions,
      selectedOptionValue: true,
    },
    {
      title: "Up Until Year",
      dataIndex: "upUntilYear",
      key: "upUntilYear",
      type: "select",
      options: yearOptions,
      selectedOptionValue: true,
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleBlur, handleChange }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        const tableData = useMemo(
          () => [
            {
              key: "SalaryPackagingOther",
              owner: 1,
              ...values,
            },
          ],
          [values]
        );

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="mt-4 All_Client reportSection">
                    <AntdTable
                      columns={columns}
                      data={tableData}
                      values={values}
                      setFieldValue={setFieldValue}
                      handleSubmit={props?.handleOk}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      isEditing={props?.isEditing}
                      setIsEditing={props?.setIsEditing}
                    />
                  </div>
                </div>
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SalaryPackagingOther;
