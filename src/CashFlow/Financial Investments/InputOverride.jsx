import React, { useEffect, useMemo } from "react";
import { Form, Formik } from "formik";

import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";

const AntDTableHOC = DynamicTableForInputsSection("antd");

const InputOverride = (props) => {
  /* -------------------- INITIAL VALUES -------------------- */
  const initialValues = {
    incomeYield: "",
    growthRate: "",
    franking: "",
  };

  /* -------------------- PREFILL -------------------- */
  const fillInitialValues = (setFieldValue) => {
    const holderKey = props.modalObject.stakeHolder.replace(".", "");
    const subObj = props.modalObject.values?.[holderKey];

    if (subObj?.[props.modalObject.key + "Obj"]) {
      const data = subObj[props.modalObject.key + "Obj"];
      setFieldValue("incomeYield", data.incomeYield || "");
      setFieldValue("growthRate", data.growthRate || "");
      setFieldValue("franking", data.franking || "");
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

  /* -------------------- TABLE COLUMNS -------------------- */
  const columns = useMemo(
    () => [
      {
        title: "Income Yield",
        dataIndex: "incomeYield",
        type: "number-toPercent",
        placeholder: "Income Yield",
      },
      {
        title: "Growth Rate",
        dataIndex: "growthRate",
        type: "number-toPercent",
        placeholder: "Growth Rate",
      },
      {
        title: "Franking",
        dataIndex: "franking",
        type: "number-toPercent",
        placeholder: "Franking",
      },
    ],
    []
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
          return [{ key: "inputOverride", ...values }];
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

export default InputOverride;
