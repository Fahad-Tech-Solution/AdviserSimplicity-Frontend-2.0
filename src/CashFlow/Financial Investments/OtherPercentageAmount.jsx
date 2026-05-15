import React, { useEffect } from "react";
import { Form, Formik } from "formik";
import { Row } from "react-bootstrap";

import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const OtherPercentageAmount = (props) => {
  /* ===============================
     Initial Values
  =============================== */
  const initialValues = {
    otherPercentageAmount: "",
  };

  /* ===============================
     Fill Initial Values
  =============================== */
  const fillInitialValues = (setFieldValue) => {
    const stored = props.modalObject.values?.[props.modalObject.key + "Obj"];

    if (!stored) return;

    setFieldValue("otherPercentageAmount", stored.otherPercentageAmount);
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
     AntD Columns
  =============================== */
  const columns = [
    {
      title: "Other Percentage Amount",
      dataIndex: "otherPercentageAmount",
      key: "otherPercentageAmount",
      type: "number-toPercent",
      placeholder: "Other Percentage Amount",
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
            key: "otherPercentageRow",
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

export default OtherPercentageAmount;
