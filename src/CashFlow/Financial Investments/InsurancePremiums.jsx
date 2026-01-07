import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { toCommaAndDollar } from "../../Components/Assets/Api/Api";

import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const InsurancePremiums = (props) => {
  const [doubleRowFlag, setDoubleRowFlag] = useState(false);

  /* ===============================
     Initial Values
  =============================== */
  const initialValues = {
    insurancePremiums: "",
    yearsInclude: "",
    indexationPremiums: "",
  };

  /* ===============================
     Fill Initial Values
  =============================== */
  const fillInitialValues = (setFieldValue) => {
    let Double = false;
    const stakeKey = props.modalObject.stakeHolder.replace(".", "");
    const DiscoveryObj = props.modalObject.DiscoveryObj;

    let totalPremiums = 0;

    if (DiscoveryObj?.[stakeKey]) {
      const arr = DiscoveryObj[stakeKey];

      totalPremiums = arr.reduce(
        (total, entry) =>
          total +
          parseFloat(
            entry.groupInsuranceArray.lifeCover.replace(/[^0-9.-]+/g, "")
          ) +
          parseFloat(
            entry.groupInsuranceArray.TPDCover.replace(/[^0-9.-]+/g, "")
          ) +
          parseFloat(entry.groupInsuranceArray.cost.replace(/[^0-9.-]+/g, "")) +
          parseFloat(entry.groupInsuranceArray.cost2.replace(/[^0-9.-]+/g, "")),
        0
      );

      setFieldValue("insurancePremiums", toCommaAndDollar(totalPremiums));

      if (arr.length > 1) {
        Double = true;
        setDoubleRowFlag(true);

        setFieldValue("insurancePremiums1", toCommaAndDollar(totalPremiums));
      }
    }

    const stored =
      props.modalObject.values?.[stakeKey]?.[props.modalObject.key + "Obj"];

    if (!stored) return;

    Object.entries(stored).forEach(([key, val]) => {
      setFieldValue(
        key,
        val ||
          (key.includes("insurancePremiums")
            ? toCommaAndDollar(totalPremiums)
            : "")
      );
    });
  };

  /* ===============================
     Save Child Modal
  =============================== */
  const onSubmit = (values) => {
    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key + "Obj",
      values
    );

    props?.setFlagState?.(false);
  };

  /* ===============================
     Select Options
  =============================== */
  const yearsIncludedOptions = Array.from({ length: 31 }, (_, i) => ({
    value: i.toString(),
    label: `Year ${i}`,
  }));

  const indexationOptions = Array.from({ length: 31 }, (_, i) => ({
    value: `${(i * 0.5).toFixed(2)}%`,
    label: `${(i * 0.5).toFixed(2)}%`,
  }));

  /* ===============================
     AntD Columns
  =============================== */
  const columns = [
    {
      title: "Fund",
      dataIndex: "index",
      key: "index",
      type: "plainText2.0",
      justText: true,
    },
    {
      title: "Insurance Premiums",
      dataIndex: "insurancePremiums",
      key: "insurancePremiums",
      type: "number-toComma",
    },
    {
      title: "Years to Include",
      dataIndex: "yearsInclude",
      key: "yearsInclude",
      selectedOptionValue: true,
      type: "select",
      options: yearsIncludedOptions,
    },
    {
      title: "Indexation of Premiums",
      dataIndex: "indexationPremiums",
      key: "indexationPremiums",
      selectedOptionValue: true,
      type: "select",
      options: indexationOptions,
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
            key: "fund1",
            index: "Fund 1",
            ...values,
          },
          ...(doubleRowFlag
            ? [
                {
                  key: "fund2",
                  index: "Fund 2",
                  insurancePremiums: values.insurancePremiums1,
                  yearsInclude: values.yearsInclude1,
                  indexationPremiums: values.indexationPremiums1,
                },
              ]
            : []),
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

export default InsurancePremiums;
