import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Row } from "react-bootstrap";

import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";
import { RenderName } from "../../Components/Assets/Api/Api";

const AntdTable = DynamicTableForInputsSection("antd");

const CFSMSFInsurancePremiums = (props) => {
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  /* ===============================
     Initial Values
  =============================== */
  const initialValues = {
    insurancePremiums: "",
    yearsInclude: "",
    indexationOfPremiums: "2.50%",
  };

  /* ===============================
     Fill Initial Values
  =============================== */
  let BaseKey = props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "");
  let index = parseFloat(
    props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
  );
  
  const fillInitialValues = (setFieldValue) => {
    if (props.modalObject.values?.[BaseKey]?.[props.modalObject.key + "Obj"]) {
      const Data =
        props.modalObject.values?.[BaseKey]?.[props.modalObject.key + "Obj"];

      setFieldValue("insurancePremiums", Data.insurancePremiums);
      setFieldValue("yearsInclude", Data.yearsInclude);
      setFieldValue("indexationOfPremiums", Data.indexationOfPremiums);
    }
  };

  /* ===============================
     Submit
  =============================== */
  const onSubmit = (values) => {
    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key + "Obj",
      values
    );

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
      props?.setIsEditing?.(false);
    }
  };

  /* ===============================
     Handle Inner Modal
  =============================== */
  const handleInnerModal = (title, values, key, stakeHolder) => {
    console.log(title, values, key, stakeHolder);
    setModalObject({
      title,
      values,
      key,
      stakeHolder: props.modalObject.stakeHolder,
    });
    setFlagState(true);
  };

  /* ===============================
     Options
  =============================== */
  const yearsIncludedOptions = Array.from({ length: 31 }, (_, i) => ({
    value: i.toString(),
    label: `Year ${i}`,
  }));

  const indexationOptions = Array.from({ length: 31 }, (_, i) => ({
    value: (i * 0.5).toFixed(2) + "%",
    label: (i * 0.5).toFixed(2) + "%",
  }));

  /* ===============================
     AntD Columns
  =============================== */
  const columns = [
    {
      title: "Member",
      dataIndex: "member",
      key: "member",
      justText: true,
    },
    {
      title: "Insurance Premiums",
      dataIndex: "insurancePremiums",
      key: "insurancePremiums",
      type: "number-toComma",
      placeholder: "Insurance Premiums",
    },
    {
      title: "Years to Include",
      dataIndex: "yearsInclude",
      key: "yearsInclude",
      type: "select",
      placeholder: "Years to Include",
      options: yearsIncludedOptions,
      selectedOptionValue: true,
    },
    {
      title: "Indexation of Premiums",
      dataIndex: "indexationOfPremiums",
      key: "indexationOfPremiums",
      type: "select",
      placeholder: "Indexation of Premiums",
      options: indexationOptions,
      selectedOptionValue: true,
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
            key: "smsfInsurancePremiumsRow",
            member: RenderName(props.modalObject.stakeHolder.replace(".", "")),
            index: parseFloat(props.modalObject.key.match(/\d+/)?.[0] || 0) + 1,
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
                  handleInnerModal={handleInnerModal}
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

export default CFSMSFInsurancePremiums;
