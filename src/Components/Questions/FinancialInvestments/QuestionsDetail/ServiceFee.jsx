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
  const Platform = props.modalObject.Platform || {};
  const initialEditArray = props.modalObject.editArray || [];

  const initialValues = {
    NumberOfMap: initialEditArray.length || "",
    investments: initialEditArray.length ? initialEditArray : [],
  };

  // Find code for selected option
  const getCodeForOption = (SelectedOffer) => {
    let code = "";
    if (Platform) {
      const offer = Platform.arrayOfOffers?.find(
        (offer) => offer._id === SelectedOffer
      );
      if (offer) code = offer.investmentCode;
    }
    return code;
  };

  let OnInvestmentOptionSelect = (
    values,
    setFieldValue,
    currentName,
    stakeHolder
  ) => {
    let code = getCodeForOption(currentName.value);
    setFieldValue(stakeHolder + "investmentCode", code || "");
  };

  const onSubmit = async (values) => {
    const newEntries = values.investments;
    const total = newEntries.reduce(
      (total, entry) =>
        total +
        parseFloat(entry.investmentValue?.replace(/[^0-9.-]+/g, "") || 0),
      0
    );

    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}Array`,
      newEntries
    );
    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}`,
      toCommaAndDollar(total)
    );

    if (props.flagState) props.setFlagState(false);
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
