import { Form, Formik } from "formik";
import React, { useEffect, useMemo } from "react";
import { Row } from "react-bootstrap";
import {
  RenderName,
  toCommaAndDollar,
} from "../../../Components/Assets/Api/Api";
import DynamicYesNo from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo";
import DynamicTableForInputsSection from "../../../Components/Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const SalaryPackagingCar = (props) => {
  const initialValues = {
    employerFBTStatus: "",
    costBaseOfCar: "",
    FBTPaidByEmployer: "",
    runningCostsOfCarPackaged: "",
    includeFromYear: "1",
    upUntilYear: "30",
    indexation: "2.50%",
  };

  /** Prefill values */
  const fillInitialValues = (setFieldValue) => {
    const sourceObj =
      props.modalObject.values[
        props.modalObject.stakeHolder.replace(".", "")
      ] || {};

    if (sourceObj?.[props.modalObject.key]) {
      const data = sourceObj[props.modalObject.key];
      setFieldValue("employerFBTStatus", data.employerFBTStatus || "");
      setFieldValue("costBaseOfCar", data.costBaseOfCar || "");
      setFieldValue("FBTPaidByEmployer", data.FBTPaidByEmployer || "");
      setFieldValue(
        "runningCostsOfCarPackaged",
        data.runningCostsOfCarPackaged || ""
      );
      setFieldValue("includeFromYear", data.includeFromYear || "1");
      setFieldValue("upUntilYear", data.upUntilYear || "30");
      setFieldValue("indexation", data.indexation || "2.50%");
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

  /** Indexation options */
  const indexationOptions = Array.from({ length: 21 }, (_, i) => ({
    value: `${(i * 0.5).toFixed(2)}%`,
    label: `${(i * 0.5).toFixed(2)}%`,
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
      title: "Employer FBT Status",
      dataIndex: "employerFBTStatus",
      key: "employerFBTStatus",
      type: "select",
      placeholder: "Select Status",
      options: [
        { value: "Full FBT", label: "Full FBT" },
        { value: "Rebatable", label: "Rebatable" },
        { value: "Exempt ($17K Cap)", label: "Exempt ($17K Cap)" },
        { value: "Exempt ($30K Cap)", label: "Exempt ($30K Cap)" },
      ],
      selectedOptionValue: true,
    },
    {
      title: "Cost Base Of Car",
      dataIndex: "costBaseOfCar",
      key: "costBaseOfCar",
      type: "number-toComma",
      placeholder: "Cost Base Of Car",
      callBack: true,
      func: (values, setFieldValue, currentInput) => {
        setFieldValue(
          currentInput.name,
          toCommaAndDollar(currentInput.value.replace(/[^0-9.-]+/g, ""))
        );
      },
    },
    {
      title: "FBT Paid By Employer",
      dataIndex: "FBTPaidByEmployer",
      key: "FBTPaidByEmployer",
      type: "yesno",
    },
    {
      title: "Running Costs of Car Packaged",
      dataIndex: "runningCostsOfCarPackaged",
      key: "runningCostsOfCarPackaged",
      type: "number-toComma",
      placeholder: "Running Costs",
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
    {
      title: "Indexation",
      dataIndex: "indexation",
      key: "indexation",
      type: "select",
      options: indexationOptions,
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
              key: "SalaryPackagingCar",
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

export default SalaryPackagingCar;
