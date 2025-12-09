import React, { useEffect, useMemo, useState } from "react";
import { Form, Formik } from "formik";
import { useRecoilValue } from "recoil";
import { defaultUrl } from "../../../../Store/Store";
import { toCommaAndDollar } from "../../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";
import InnerModal from "./InnerModal";
import { Select } from "antd";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const GroupInsurance = (props) => {
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});
  const DefaultUrl = useRecoilValue(defaultUrl);

  const initialValues = {
    lifeCover: "",
    TPDCover: "",
    coverType: "",
    cost: "",
    monthlyIncome: "",
    waitingPeriod: "",
    BenefitPeriod: "",
    coverType2: "",
    cost2: "",
  };

  // 🔁 Pre-fill data for edit mode
  const fillInitialValues = (setFieldValue) => {
    let index = parseFloat(
      props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
    );
    let BaseKey = props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "");

    const data =
      props.modalObject?.values?.[BaseKey]?.[index]?.[
        props.modalObject?.key + "Details"
      ] || {};
    console.log("Filling initial values for Group Insurance:", data);
    if (Object.keys(data).length > 0) {
      Object.keys(initialValues).forEach((key) => {
        if (data[key] !== undefined) setFieldValue(key, data[key]);
      });
    } else {
      props.setIsEditing(true);
    }
  };

  const onSubmit = async (values) => {
    console.log("Submitting Group Insurance:", values);

    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}Details`,
      values
    );

    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  // 📊 Define table columns for Group Insurance
  const columns = [
    {
      title: "Life Cover",
      dataIndex: "lifeCover",
      key: "lifeCover",
      type: "number-toComma",
      placeholder: "Life Cover",
      callBack: true,
      func: (values, setFieldValue, input) =>
        setFieldValue(
          input.name,
          toCommaAndDollar(input.value.replace(/[^0-9.-]+/g, ""))
        ),
    },
    {
      title: "TPD Cover",
      dataIndex: "TPDCover",
      key: "TPDCover",
      type: "number-toComma",
      placeholder: "TPD Cover",
      callBack: true,
      func: (values, setFieldValue, input) =>
        setFieldValue(
          input.name,
          toCommaAndDollar(input.value.replace(/[^0-9.-]+/g, ""))
        ),
    },
    {
      title: "Cover Type",
      dataIndex: "coverType",
      key: "coverType",
      type: "select",
      options: [
        { value: "Unitised", label: "Unitised" },
        { value: "Fixed", label: "Fixed" },
      ],
    },
    {
      title: "Cost p.a.",
      dataIndex: "cost",
      key: "cost",
      type: "number-toComma",
      placeholder: "Cost p.a.",
      callBack: true,
      func: (values, setFieldValue, input) =>
        setFieldValue(
          input.name,
          toCommaAndDollar(input.value.replace(/[^0-9.-]+/g, ""))
        ),
    },
    {
      title: "Monthly Income Protection",
      dataIndex: "monthlyIncome",
      key: "monthlyIncome",
      type: "number-toComma",
      placeholder: "Monthly Income Protection",
      callBack: true,
      func: (values, setFieldValue, input) =>
        setFieldValue(
          input.name,
          toCommaAndDollar(input.value.replace(/[^0-9.-]+/g, ""))
        ),
    },
    {
      title: "Waiting Period",
      dataIndex: "waitingPeriod",
      key: "waitingPeriod",
      type: "select",
      options: [
        { value: 30, label: "30 Days" },
        { value: 60, label: "60 Days" },
        { value: 90, label: "90 Days" },
        { value: 180, label: "180 Days" },
      ],
    },
    {
      title: "Benefit Period",
      dataIndex: "BenefitPeriod",
      key: "BenefitPeriod",
      type: "select",
      options: [
        { value: "2 Years", label: "2 Years" },
        { value: "5 Years", label: "5 Years" },
        { value: "To age 60", label: "To age 60" },
        { value: "To Age 65", label: "To Age 65" },
        { value: "To Age 67", label: "To Age 67" },
      ],
    },
    {
      title: "Cover Type ",
      dataIndex: "coverType2",
      key: "coverType2",
      type: "select",
      options: [
        { value: "Unitised", label: "Unitised" },
        { value: "Fixed", label: "Fixed" },
      ],
    },
    {
      title: "Cost p.a.",
      dataIndex: "cost2",
      key: "cost2",
      type: "number-toComma",
      placeholder: "Cost p.a.",
      callBack: true,
      func: (values, setFieldValue, input) =>
        setFieldValue(
          input.name,
          toCommaAndDollar(input.value.replace(/[^0-9.-]+/g, ""))
        ),
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
        }, [props.modalObject?.editArray]);

        const dataRows = useMemo(() => {
          return [
            {
              key: "groupInsurance",
              ...values,
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

export default GroupInsurance;
