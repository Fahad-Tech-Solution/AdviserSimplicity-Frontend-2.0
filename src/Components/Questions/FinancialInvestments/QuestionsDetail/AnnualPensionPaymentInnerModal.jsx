import React, { useEffect, useMemo, useState } from "react";
import { Form, Formik } from "formik";
import { useRecoilValue } from "recoil";
import { defaultUrl } from "../../../../Store/Store";
import { toCommaAndDollar } from "../../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";
import { Select } from "antd";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const AnnualPensionPaymentInnerModal = (props) => {
  const DefaultUrl = useRecoilValue(defaultUrl);
  const [dynamicFields, setDynamicFields] = useState([""]);

  let index = parseFloat(
    props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
  );
  let BaseKey = props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "");

  const existingData =
    props.modalObject.values?.[BaseKey]?.[index]?.[
      `${props.modalObject.key}Details`
    ] || {};

  const initialValues = {
    regularAmount: existingData.regularAmount || "",
    frequency: existingData.frequency || "",
    total: existingData.total || "",
  };

  const fillInitialValues = (setFieldValue) => {
    if (props.modalObject.editArray?.length) {
      const data = props.modalObject.editArray[0];
      Object.keys(data).forEach((field) => {
        setFieldValue(field, data[field] || "");
      });
    } else {
      props.setIsEditing(true);
    }
  };

  const Calculate = (values, setFieldValue, currentInput) => {
    try {
      const getVal = (field) =>
        parseFloat(values?.[field]?.toString().replace(/[^0-9.-]+/g, "") || 0);

      let regularAmount = getVal("regularAmount");
      let frequency = getVal("frequency");

      const fieldName = currentInput.name;
      const rawVal =
        parseFloat(
          currentInput?.value?.toString().replace(/[^0-9.-]+/g, "") || 0
        ) || 0;

      switch (fieldName) {
        case "regularAmount":
          regularAmount = rawVal;
          break;
        case "frequency":
          frequency = rawVal;
          break;
        default:
          break;
      }

      const total = regularAmount * frequency;
      setFieldValue(`total`, toCommaAndDollar(total));
    } catch (err) {
      console.error("❌ Calculation error:", err);
    }
  };

  const onSubmit = async (values) => {
    try {
      const entry = {
        regularAmount: values.regularAmount || "",
        frequency: values.frequency || "",
        total: values.total || "",
      };

      const totalValue =
        parseFloat(values.total?.replace(/[^0-9.-]+/g, "")) || 0;

      props.setFieldValue(
        `${props.modalObject.stakeHolder}${props.modalObject.key}Details`,
        entry
      );

      props.setFieldValue(
        `${props.modalObject.stakeHolder}${props.modalObject.key}`,
        toCommaAndDollar(totalValue)
      );

      if (props.flagState) {
        props.setFlagState(false);
        props.setIsEditing(!props.isEditing);
      }
    } catch (err) {
      console.error("❌ Error in onSubmit:", err);
    }
  };

  const frequencyOptions = [
    { label: "Weekly", value: 52 },
    { label: "Fortnightly", value: 26 },
    { label: "Monthly", value: 12 },
    { label: "Quarterly", value: 4 },
    { label: "Half Yearly", value: 2 },
    { label: "Annually", value: 1 },
  ];

  const columns = [
    { title: "No#", dataIndex: "owner", key: "owner", width: 60 },
    {
      title: "Regular Amount",
      dataIndex: "regularAmount",
      key: "regularAmount",
      type: "number-toComma",
      placeholder: "Regular Amount",
      callBack: true,
      func: Calculate,
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      type: "select",
      options: frequencyOptions,
      placeholder: "Select Frequency",
      callBack: true,
      func: Calculate,
      selectedOptionValue: true,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      type: "text",
      disabled: true,
      placeholder: "Total",
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      innerRef={props.formRef}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [props.modalObject.editArray]);

        const dataRows = useMemo(() => {
          return [
            {
              key: "row1",
              owner: 1,
              regularAmount: values?.regularAmount || "",
              frequency: values?.frequency || "",
              total: values?.total || "",
            },
          ];
        }, [values]);

        return (
          <Form>
            <div className="mt-4 All_Client reportSection">
              <AntdTable
                columns={columns}
                data={dataRows}
                values={values}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isEditing={props?.isEditing}
                setIsEditing={props?.setIsEditing}
              />
            </div>

            <button type="submit" style={{ display: "none" }}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AnnualPensionPaymentInnerModal;
