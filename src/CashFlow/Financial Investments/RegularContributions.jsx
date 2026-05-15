import React, { useEffect, useMemo } from "react";
import { Form, Formik } from "formik";

import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";

const AntDTableHOC = DynamicTableForInputsSection("antd");

const RegularContributions = (props) => {
  /* -------------------- INITIAL VALUES -------------------- */
  const initialValues = {
    contribution: "",
    regularContributions: "",
    contributeFromYear: "",
    contributeUpUntil: "",
    indexation: "",
  };

  /* -------------------- PREFILL -------------------- */
  const fillInitialValues = (setFieldValue) => {
    console.log(props.modalObject);
    const holderKey = props.modalObject.stakeHolder.replace(".", "");
    const subObj = props.modalObject.values?.[holderKey];

    if (subObj?.[props.modalObject.key + "Obj"]) {
      const data = subObj[props.modalObject.key + "Obj"];
      setFieldValue("contribution", data.contribution || "");
      setFieldValue("regularContributions", data.regularContributions || "");
      setFieldValue("contributeFromYear", data.contributeFromYear || "");
      setFieldValue("contributeUpUntil", data.contributeUpUntil || "");
      setFieldValue("indexation", data.indexation || "");
    }
  };

  /* -------------------- SUBMIT -------------------- */
  const onSubmit = (values) => {
    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key + "Obj",
      values
    );

    if (props.flagState) {
      props.setFlagState(false);
      props?.setIsEditing?.(false);
    }
  };

  /* -------------------- OPTIONS -------------------- */
  const loanTermOptions = useMemo(
    () =>
      Array.from({ length: 31 }, (_, i) => ({
        value: i,
        label: `Year ${i}`,
      })),
    []
  );

  const indexationOptions = useMemo(
    () =>
      Array.from({ length: 21 }, (_, i) => ({
        value: (i * 0.5).toFixed(2) + "%",
        label: (i * 0.5).toFixed(2) + "%",
      })),
    []
  );

  /* -------------------- TABLE COLUMNS -------------------- */
  const columns = useMemo(
    () => [
      {
        title: "Contribution",
        placeholder: "Contribution",
        dataIndex: "contribution",
        type: "number-toComma",
      },
      {
        title: `${props.modalObject.title} p.a`,
        dataIndex: "regularContributions",
        type: "number-toComma",
        placeholder: `${props.modalObject.title} p.a`,
      },
      {
        title: "Contribute From Year",
        dataIndex: "contributeFromYear",
        type: "select",
        selectedOptionValue: true,
        options: loanTermOptions,
      },
      {
        title: "Contribute Up Until",
        dataIndex: "contributeUpUntil",
        type: "select",
        selectedOptionValue: true,
        options: loanTermOptions,
      },
      {
        title: "Indexation",
        dataIndex: "indexation",
        type: "select",
        selectedOptionValue: true,
        options: indexationOptions,
      },
    ],
    [loanTermOptions, indexationOptions, props.modalObject.title]
  );

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

        /* -------------------- TABLE DATA -------------------- */
        const tableData = useMemo(() => {
          return [{ key: "regularContributions", ...values }];
        }, [values]);

        return (
          <Form className="mt-4 All_Client reportSection">
            <AntDTableHOC
              columns={columns}
              data={tableData}
              values={values}
              setFieldValue={setFieldValue}
              handleChange={handleChange}
              handleBlur={handleBlur}
              handleSubmit={props.handleOk}
              isEditing={props.isEditing}
              setIsEditing={props.setIsEditing}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegularContributions;
