import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Row } from "react-bootstrap";

import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";
import { RenderName } from "../../Components/Assets/Api/Api";

const AntdTable = DynamicTableForInputsSection("antd");

const ApplySpouseContribution = (props) => {
  const [flagState, setFlagState] = useState(false); // optional if modal is used later

  /* ===============================
     Initial Values
  =============================== */
  const initialValues = {
    yearToCommence: "",
    yearsToInclude: "",
  };

  /* ===============================
     Fill Initial Values
  =============================== */
  const fillInitialValues = (setFieldValue) => {
    const stored = props.modalObject?.values?.[props.modalObject.key + "Obj"];
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

  /* ===============================
     Columns
  =============================== */
  const columns = [
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      type: "plainText2.0",
    },
    {
      title: "Year to Commence",
      dataIndex: "yearToCommence",
      key: "yearToCommence",
      type: "select",
      selectedOptionValue: true,
      options: yearsIncludedOptions,
    },
    {
      title: "Years to Include",
      dataIndex: "yearsToInclude",
      key: "yearsToInclude",
      type: "select",
      selectedOptionValue: true,
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
            key: "applySpouseRow",
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
                  handleInnerModal={() => {}} // no inner modal here
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

export default ApplySpouseContribution;
