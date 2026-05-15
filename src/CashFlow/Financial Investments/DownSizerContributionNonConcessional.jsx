import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Row } from "react-bootstrap";

import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";
import { RenderName } from "../../Components/Assets/Api/Api";

const AntdTable = DynamicTableForInputsSection("antd");

const DownSizerContributionNonConcessional = (props) => {
  const [flagState, setFlagState] = useState(false); // optional if modal is used later

  /* ===============================
     Initial Values
  =============================== */
  const initialValues = {
    downSizerContribution: "",
    contributionsToFund: "",
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
  const contributionsFundOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "SMSF", label: "SMSF" },
  ];

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
      title: "Downsizer contribution (Year 1 only)",
      placeholder: "Downsizer contribution (Year 1 only)",
      dataIndex: "downSizerContribution",
      key: "downSizerContribution",
      type: "number-toComma",
    },
    {
      title: "Contributions To Fund",
      dataIndex: "contributionsToFund",
      key: "contributionsToFund",
      type: "select",
      selectedOptionValue: true,
      options: contributionsFundOptions,
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
            key: "downSizerRow",
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

export default DownSizerContributionNonConcessional;
