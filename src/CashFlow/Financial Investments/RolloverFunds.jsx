import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Row } from "react-bootstrap";

import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const RolloverFunds = (props) => {
  /* ===============================
     Initial Values
  =============================== */
  const initialValues = {
    rolloverBenefitFund: "",
    rolloverBenefitsYear: "",
    rolloverBenefitFund1: "",
    rolloverBenefitsYear1: "",
  };

  /* ===============================
     Fill Initial Values
  =============================== */
  const fillInitialValues = (setFieldValue) => {
    const stakeKey = props.modalObject.stakeHolder.replace(".", "");
    const stored =
      props.modalObject.values?.[stakeKey]?.[props.modalObject.key + "Obj"];

    if (!stored) return;

    Object.entries(stored).forEach(([key, value]) => {
      setFieldValue(key, value);
    });
  };

  /* ===============================
     Submit
  =============================== */
  const onSubmit = (values) => {
    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key + "Obj",
      values
    );

    props?.setFlagState?.(false);
  };

  /* ===============================
     Options
  =============================== */
  const yearsIncludedOptions = Array.from({ length: 30 }, (_, i) => ({
    value: i.toString(),
    label: `Year ${i}`,
  }));

  const rolloverFundOptions = [
    { value: "N/A", label: "N/A" },
    { value: "SMSF", label: "SMSF" },
  ];

  /* ===============================
     AntD Columns
  =============================== */
  const columns = [
    {
      title: "Fund",
      dataIndex: "index",
      key: "index",
      type: "plainText2.0",
      justText: true,
    },
    {
      title: "Rollover Benefit to Fund",
      dataIndex: "rolloverBenefitFund",
      key: "rolloverBenefitFund",
      type: "select",
      options: rolloverFundOptions,
      selectedOptionsValues: true,
    },
    {
      title: "Rollover Benefits in Year",
      dataIndex: "rolloverBenefitsYear",
      key: "rolloverBenefitsYear",
      type: "select",
      selectedOptionsValues: true,
      options: yearsIncludedOptions,
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
            key: "fund1",
            index: "Fund 1",
            stackHolder: "fund1",
            rolloverBenefitFund: values.rolloverBenefitFund,
            rolloverBenefitsYear: values.rolloverBenefitsYear,
          },
          {
            key: "fund2",
            index: "Fund 2",
            stackHolder: "fund2",
            rolloverBenefitFund: values.rolloverBenefitFund1,
            rolloverBenefitsYear: values.rolloverBenefitsYear1,
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

export default RolloverFunds;
