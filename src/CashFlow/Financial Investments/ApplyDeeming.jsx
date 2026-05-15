import React, { useEffect, useMemo } from "react";
import { Formik, Form } from "formik";
import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const ApplyDeeming = (props) => {
  const initialValues = {
    purchasePrice: "",
    centreLinkRelevantNumber: "",
  };

  const fillInitialValues = (setFieldValue) => {
    if (props.modalObject.values[props.modalObject.key + "Obj"]) {
      const data = props.modalObject.values[props.modalObject.key + "Obj"];

      setFieldValue("purchasePrice", data.purchasePrice || "");
      setFieldValue(
        "centreLinkRelevantNumber",
        data.centreLinkRelevantNumber || ""
      );
    }
  };

  const onSubmit = (values) => {
    props.setFieldValue(props.modalObject.key + "Obj", values);

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
      props?.setIsEditing?.(false);
    }
  };

  const columns = [
    {
      title: "Purchase Price (Less Commut)",
      dataIndex: "purchasePrice",
      placeholder: "Purchase Price (Less Commut)",
      type: "number-toComma",
    },
    {
      title: "Centrelink Relevant Number",
      dataIndex: "centreLinkRelevantNumber",
      placeholder: "Centrelink Relevant Number",
      type: "number",
      BlurHandler: (values, setFieldValue, thisInput, stakeholder) => {
        setFieldValue(thisInput.name, parseFloat(thisInput.value).toFixed(2));
      },
    },
  ];

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

        const rows = useMemo(() => {
          return [
            {
              key: 1,
              owner: 1,
              ...values,
            },
          ];
        }, [values]);

        return (
          <Form>
            <div className="mt-4 All_Client reportSection">
              <AntdTable
                columns={columns}
                data={rows}
                values={values}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleSubmit={props.handleOk}
                isEditing={props.isEditing}
                setIsEditing={props.setIsEditing}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ApplyDeeming;
