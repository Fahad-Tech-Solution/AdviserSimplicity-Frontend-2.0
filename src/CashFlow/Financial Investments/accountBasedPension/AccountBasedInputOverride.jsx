import React, { useEffect } from "react";
import { Form, Formik } from "formik";
import { Row } from "react-bootstrap";

import DynamicTableForInputsSection from "../../../Components/Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const AccountBasedInputOverride = (props) => {
  /* ===============================
     Initial Values
  =============================== */
  const initialValues = {
    incomeYield: "",
    growthRate: "",
    franking: "",
  };

  /* ===============================
     Fill Initial Values
  =============================== */
  let index = parseFloat(
    props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
  );
  let BaseKey = props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "");

  const fillInitialValues = (setFieldValue) => {
    const stored =
      props.modalObject?.values?.[BaseKey]?.[index]?.[
        props.modalObject.key + "Obj"
      ];
    if (!stored) return;

    Object.entries(stored).forEach(([key, value]) => {
      setFieldValue(key, value);
    });
  };

  /* ===============================
     Submit
  =============================== */
  const onSubmit = (values) => {
    console.log(values);
    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key + "Obj",
      values
    );
    props?.setFlagState?.(false);
    props?.setIsEditing?.(false);
  };

  /* ===============================
     AntD Columns
  =============================== */
  const columns = [
    {
      title: "Income Yield",
      placeholder: "Income Yield",
      dataIndex: "incomeYield",
      key: "incomeYield",
      type: "number-toPercent",
    },
    {
      title: "Growth Rate",
      placeholder: "Growth Rate",
      dataIndex: "growthRate",
      key: "growthRate",
      type: "number-toPercent",
    },
    {
      title: "Franking",
      placeholder: "Franking",
      dataIndex: "franking",
      key: "franking",
      type: "number-toPercent",
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
            key: "accountOverrideRow",
            ...values,
          },
        ];

        return (
          <Form>
            <Row>
              <h5
                onClick={() => {
                  console.log(values);
                }}
              >
                asdas
              </h5>
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

export default AccountBasedInputOverride;
