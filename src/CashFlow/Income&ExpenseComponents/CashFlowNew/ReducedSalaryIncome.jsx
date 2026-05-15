import { Form, Formik } from "formik";
import React, { useEffect, useMemo } from "react";
import { Row } from "react-bootstrap";
import {
  toCommaAndDollar,
  RenderName,
} from "../../../Components/Assets/Api/Api";
import DynamicTableForInputsSection from "../../../Components/Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const ReducedSalaryIncome = (props) => {
  const initialValues = {
    reducedSalaryIncome: "",
    includeFromYear: "1",
    upUntilYear: "30",
  };

  /** Prefill values when editing */
  const fillInitialValues = (setFieldValue) => {
    const sourceObj =
      props.modalObject.values[
        props.modalObject.stakeHolder.replace(".", "")
      ] || {};

    if (sourceObj?.[props.modalObject.key]) {
      const data = sourceObj[props.modalObject.key];
      setFieldValue("reducedSalaryIncome", data.reducedSalaryIncome || "");
      setFieldValue("includeFromYear", data.includeFromYear || "1");
      setFieldValue("upUntilYear", data.upUntilYear || "30");
    }
  };

  const onSubmit = async (values) => {
    console.log("ReducedSalaryIncome values", values, props);
    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}`,
      values
    );

    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  /** Year dropdown options */
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
      title: "Reduced Salary Income",
      dataIndex: "reducedSalaryIncome",
      key: "reducedSalaryIncome",
      type: "number-toComma",
      placeholder: "Reduced Salary Income",
      callBack: true,
      func: (values, setFieldValue, currentInput) => {
        setFieldValue(
          currentInput.name,
          toCommaAndDollar(currentInput.value.replace(/[^0-9.-]+/g, ""))
        );
      },
    },
    {
      title: "Include From Year",
      dataIndex: "includeFromYear",
      key: "includeFromYear",
      type: "select",
      options: yearOptions,
      placeholder: "Select Year",
      selectedOptionValue: true,
    },
    {
      title: "Up Until Year",
      dataIndex: "upUntilYear",
      key: "upUntilYear",
      type: "select",
      options: yearOptions,
      placeholder: "Select Year",
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

        /** Single-row table data */
        const tableData = useMemo(
          () => [
            {
              key: "ReducedSalaryIncome",
              owner: 1,
              reducedSalaryIncome: values.reducedSalaryIncome,
              includeFromYear: values.includeFromYear,
              upUntilYear: values.upUntilYear,
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

export default ReducedSalaryIncome;
