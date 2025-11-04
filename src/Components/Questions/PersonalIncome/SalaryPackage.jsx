import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import {
  handleInputChange,
  handleInputFocus,
  handleInputKeyDown,
  handleInputBlur,
  toCommaAndDollar,
  toPercentage,
} from "../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const AntDTableHOC = DynamicTableForInputsSection("antd");

const SalaryPackage = (props) => {
  let { title, key, parentValues, parentKey } = props.modalObject;

  let initialValues = {
    remunerationType: "Gross Salary",
    SG: "12%",
  };

  const fillInitialValues = (setFieldValue) => {
    // if (parentValues._id && parentValues?.key) {

    if (
      parentValues?.[`${parentKey.replace(".", "")}`]?.[`${key}`] &&
      Object.keys(parentValues?.[`${parentKey.replace(".", "")}`]?.[`${key}`])
        .length > 0
    ) {
      let Data = parentValues[`${parentKey.replace(".", "")}`][`${key}`];

      setFieldValue(
        "remunerationType",
        Data.remunerationType || "Gross Salary"
      );
      setFieldValue("amount", Data.amount);
      setFieldValue("SG", Data.SG || "12%");
      setFieldValue("grossSalary", Data.grossSalary);
      setFieldValue("SGC", Data.SGC);
      setFieldValue(
        "salarySacrificeContributions",
        Data.salarySacrificeContributions
      );
      setFieldValue("afterTaxContributions", Data.afterTaxContributions);
    } else {
      props.setIsEditing(!props.isEditing);
    }
  };

  let onSubmit = async (values) => {
    console.log(values);

    let Obj = {
      remunerationType: values.remunerationType,
      amount: values.amount,
      SG: values.SG,
      grossSalary: values.grossSalary,
      SGC: values.SGC,
      salarySacrificeContributions: values.salarySacrificeContributions,
      afterTaxContributions: values.afterTaxContributions,
    };

    props.setFieldValue(`${parentKey}${key}`, Obj);

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  const FormulaSetting = (values, setFieldValue, currentInput, stakholder) => {
    let remunerationType = values.remunerationType;
    let amount = parseFloat(values.amount.replace(/[^0-9.-]+/g, "")) || 0;
    let SG = parseFloat(values.SG.replace(/[^0-9.-]+/g, "")) || 0;

    let grossSalary = 0;
    let SGC = 0;

    switch (currentInput.name) {
      case "remunerationType":
        remunerationType = currentInput.value;
        break;
      case "amount":
        amount = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
        break;
      default:
        SG = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
        SG = SG > 100 ? 100 : SG; // Cap SG at 100
        break;
    }

    if (remunerationType === "Gross Salary") {
      grossSalary = amount || 0;
      SGC = (amount * (SG / 100)).toFixed(2);
    } else {
      grossSalary = (amount / (1 + SG / 100)).toFixed(2);
      SGC = (amount - grossSalary).toFixed(2);
    }

    // Ensure that SGC and grossSalary are valid numbers
    const validGrossSalary = !isNaN(parseFloat(grossSalary))
      ? toCommaAndDollar(grossSalary)
      : "0$";
    const validSGC = !isNaN(parseFloat(SGC))
      ? toCommaAndDollar(parseFloat(SGC).toFixed(2))
      : "$0";

    if (remunerationType === "Gross Salary") {
      setFieldValue("grossSalary", validGrossSalary);
      setFieldValue("SGC", validSGC);
    } else {
      setFieldValue("grossSalary", validGrossSalary);
      setFieldValue("SGC", validSGC);
    }
  };

  const columns = [
    {
      title: "Remuneration Type",
      dataIndex: "remunerationType",
      key: "remunerationType",
      type: "select",
      placeholder: "Select Remuneration Type",
      options: [
        { label: "Gross Salary", value: "Gross Salary" },
        { label: "Total Package", value: "Total Package" },
      ],
      width: 100,
      callBack: true, // if you need to hook into FormulaSetting
      func: (e, values, setFieldValue) => {
        // same as your onChange(e) + FormulaSetting(...)
        FormulaSetting(values, setFieldValue, e.target);
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      type: "number-toComma", // custom type so you can format $ + commas
      placeholder: "Enter Amount",
      width: 130,
      callBack: true,
      func: (values, setFieldValue, thisInput) => {
        setFieldValue(
          thisInput.name,
          toCommaAndDollar(thisInput.value.replace(/[^0-9.-]+/g, ""))
        );
        FormulaSetting(values, setFieldValue, thisInput);
      },
    },
    {
      title: "SG",
      dataIndex: "SG",
      key: "SG",
      type: "number-toPercent",
      placeholder: "Enter SG %",
      width: 70,
      callBack: true,
      func: FormulaSetting,
    },
    {
      title: "Gross Salary",
      dataIndex: "grossSalary",
      key: "grossSalary",
      type: "text",
      placeholder: "Gross Salary",
      width: 100,
      disabled: true,
    },
    {
      title: "SGC",
      dataIndex: "SGC",
      key: "SGC",
      type: "text",
      placeholder: "SGC",
      width: 100,
      disabled: true,
    },
    {
      title: "Salary Sacrifice Contributions",
      dataIndex: "salarySacrificeContributions",
      key: "salarySacrificeContributions",
      type: "number-toComma",
      placeholder: "Salary Sacrifice",
      width: 100,
      callBack: true,
      func: (values, setFieldValue, thisInput) => {
        setFieldValue(
          thisInput,
          toCommaAndDollar(thisInput.value.replace(/[^0-9.-]+/g, ""))
        );
      },
    },
    {
      title: "After Tax Contributions",
      dataIndex: "afterTaxContributions",
      key: "afterTaxContributions",
      type: "number-toComma",
      placeholder: "After Tax Contributions",
      width: 100,
      callBack: true,
      func: (values, setFieldValue, thisInput) => {
        setFieldValue(
          thisInput,
          toCommaAndDollar(thisInput.value.replace(/[^0-9.-]+/g, ""))
        );
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
      {({ values, handleChange, setFieldValue, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [values.NumberOfMap]);

        const tableData = useMemo(() => {
          const rows = [];

          rows.push({
            key: parentKey.replace(".", ""),
            remunerationType: values?.remunerationType || "--",
            amount: values?.amount || "--",
            SG: values?.SG || "--",
            grossSalary: values?.grossSalary || "--",
            SGC: values?.SGC || "--",
            salarySacrificeContributions:
              values?.salarySacrificeContributions || "--",
            afterTaxContributions: values?.afterTaxContributions || "--",
          });

          return rows;
        }, [values]);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="mt-4 All_Client reportSection">
                    <AntDTableHOC
                      columns={columns}
                      data={tableData}
                      values={values}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      handleSubmit={props?.handleOk}
                      isEditing={props?.isEditing}
                      setIsEditing={props?.setIsEditing}
                    />
                  </div>
                </div>
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SalaryPackage;
