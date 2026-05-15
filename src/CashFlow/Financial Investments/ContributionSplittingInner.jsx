import React, { useEffect } from "react";
import { Form, Formik } from "formik";
import { Row } from "react-bootstrap";

import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";
import { RenderName } from "../../Components/Assets/Api/Api";

const AntdTable = DynamicTableForInputsSection("antd");

const ContributionSplittingInner = (props) => {
  /* ===============================
     Initial Values
  =============================== */
  const initialValues = {
    contributionSplitting: "",
    yearToCommence: "",
    yearsToInclude: "",
    contributionsToFund: "",
    previousLumpsumWithdrawals: "",
  };

  /* ===============================
     Fill Initial Values
  =============================== */
  const fillInitialValues = (setFieldValue) => {
    const stored = props.modalObject.values?.[props.modalObject.key + "Obj"];

    if (!stored) return;

    Object.entries(stored).forEach(([key, value]) => {
      setFieldValue(key, value);
    });
  };

  /* ===============================
     Submit
  =============================== */
  const onSubmit = (values) => {
    props.setFieldValue(props.modalObject.key + "Obj", values);

    props?.setFlagState?.(false);
     props?.setIsEditing?.(false);
  };

  /* ===============================
     Options
  =============================== */
  const yearsIncludedOptions = Array.from({ length: 31 }, (_, i) => ({
    value: i.toString(),
    label: `Year ${i}`,
  }));

  const contributionsFundOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "SMSF", label: "SMSF" },
  ];

  /* ===============================
     AntD Columns
  =============================== */
  const columns = [
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      type: "plainText2.0",
    },
    {
      title: "Contribution Splitting",
      dataIndex: "contributionSplitting",
      key: "contributionSplitting",
      type: "number-toPercent",
      placeholder: "Contribution Splitting",
    },
    {
      title: "Year to Commence",
      dataIndex: "yearToCommence",
      key: "yearToCommence",
      selectedOptionValue: true,
      type: "select",
      options: yearsIncludedOptions,
    },
    {
      title: "Years to Include",
      dataIndex: "yearsToInclude",
      key: "yearsToInclude",
      selectedOptionValue: true,
      type: "select",
      options: yearsIncludedOptions,
    },
    {
      title: "Contributions To Fund",
      dataIndex: "contributionsToFund",
      key: "contributionsToFund",
      selectedOptionValue: true,
      type: "select",
      options: contributionsFundOptions,
    },
    {
      title: "Previous Lumpsum Withdrawals",
      placeholder: "Previous Lumpsum Withdrawals",
      dataIndex: "previousLumpsumWithdrawals",
      key: "previousLumpsumWithdrawals",
      type: "number-toComma",
    },
  ];

  /* ===============================
     Render
  =============================== */
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

        const tableData = [
          {
            key: "contributionSplittingRow",
            owner: RenderName(props.modalObject.stakeHolder.replace(".", "")),
            ...values,
          },
        ];

        return (
          <Form>
            <Row>
              <div className="col-md-12 mt-4 All_Client reportSection">
                <AntdTable
                  columns={columns}
                  data={tableData}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isEditing={props?.isEditing}
                  setIsEditing={props?.setIsEditing}
                />
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ContributionSplittingInner;
