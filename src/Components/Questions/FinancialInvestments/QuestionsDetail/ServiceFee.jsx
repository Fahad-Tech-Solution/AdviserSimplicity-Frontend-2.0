import { Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { BankDetail, defaultUrl } from "../../../../Store/Store";
import { toCommaAndDollar } from "../../../Assets/Api/Api";
import { ConfigProvider, Pagination, Select } from "antd";
import { SimpleSelectField } from "./CreatableMultiSelectField";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const ServiceFee = (props) => {
  const initialEditArray = props.modalObject.editArray || [];

  const initialValues = {
    NumberOfMap: initialEditArray.length || "",
    ...initialEditArray,
  };

  let OnInvestmentOptionSelect = (
    values,
    setFieldValue,
    currentInput,
    stakeHolder
  ) => {
    let serviceFee = values.serviceFee || "";
    let frequency = values.frequency || "";
    let annualAdviserServiceFee = 0;
    switch (currentInput.name) {
      case "serviceFee":
        serviceFee = currentInput.value;
        break;
      case "frequency":
        frequency = currentInput.value;
        break;
    }

    if (frequency === "Monthly") {
      annualAdviserServiceFee = parseFloat(
        (parseFloat(serviceFee?.replace(/[^0-9.-]+/g, "") || 0) || 0) * 12
      );
    } else if (frequency === "Annualy") {
      annualAdviserServiceFee = parseFloat(
        parseFloat(serviceFee?.replace(/[^0-9.-]+/g, "") || 0) || 0
      );
    }
    setFieldValue(
      `annualAdviserServiceFee`,
      toCommaAndDollar(annualAdviserServiceFee)
    );
  };

  const onSubmit = async (values) => {
    const newEntries = values;

    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}Array`,
      newEntries
    );
    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}`,
      values.annualAdviserServiceFee
    );

    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  // Define columns for Antd Table
  const columns = [
    {
      title: "No#",
      dataIndex: "owner",
      key: "owner",
      width: 60,
    },
    {
      title: "Service Fee",
      dataIndex: "serviceFee",
      key: "serviceFee",
      type: "number-toComma",
      callBack: true,
      func: OnInvestmentOptionSelect,
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      type: "radio",
      options: [
        { value: "Monthly", lable: "Monthly" },
        { value: "Annualy", lable: "Annualy" },
      ],
      callBack: true,
      func: OnInvestmentOptionSelect,
    },
    {
      title: "Annual Adviser Service Fee p.a",
      dataIndex: "annualAdviserServiceFee",
      key: "annualAdviserServiceFee",
      type: "number-toComma",
      placeholder: "Annual Adviser Service Fee p.a",
      disabled: true,
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
        // Pagination logic — filter only visible rows for Ant Table
        const paginatedRows = useMemo(() => {
          return Array.from({ length: 1 }).map((_, i) => ({
            key: `ServiceFee${i}`, // ensures unique keys
            owner: i + 1, // ✅ keeps numbering continuous across pages
            serviceFee: values.serviceFee || "",
            frequency: values.frequency || "",
            annualAdviserServiceFee: values.annualAdviserServiceFee || "",
          }));
        }, [values]);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="mt-4 All_Client reportSection">
                    <AntdTable
                      columns={columns}
                      data={paginatedRows}
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

export default ServiceFee;
