import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { defaultUrl } from "../../../Store/Store";
import {
  toCommaAndDollar,
} from "../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const AntDTableHOC = DynamicTableForInputsSection("antd");

const SalaryPackage = (props) => {
  const { title, key, parentValues, parentKey } = props.modalObject;

  const DefaultUrl = useRecoilValue(defaultUrl);

  // ✅ Fill data if exists, otherwise switch to edit mode
  const fillInitialValues = (setFieldValue) => {
    const existingData =
      parentValues?.[`${parentKey.replace(".", "")}`]?.[`${key}`];

    if (existingData && Object.keys(existingData).length > 0) {
      setFieldValue("remunerationType", existingData.remunerationType || "Gross Salary");
      setFieldValue("amount", existingData.amount || "");
      setFieldValue("SG", existingData.SG || "12%");
      setFieldValue("grossSalary", existingData.grossSalary || "");
      setFieldValue("SGC", existingData.SGC || "");
      setFieldValue("salarySacrificeContributions", existingData.salarySacrificeContributions || "");
      setFieldValue("afterTaxContributions", existingData.afterTaxContributions || "");
    } else {
      props.setIsEditing(true);
    }
  };

  // ✅ Initial values
  const initialValues = {
    remunerationType: "Gross Salary",
    amount: "",
    SG: "12%",
    grossSalary: "",
    SGC: "",
    salarySacrificeContributions: "",
    afterTaxContributions: "",
  };

  // ✅ Formula logic
  const FormulaSetting = (values, setFieldValue, currentInput) => {
    let remunerationType = values.remunerationType;
    let amount = parseFloat(values.amount?.replace(/[^0-9.-]+/g, "")) || 0;
    let SG = parseFloat(values.SG?.replace(/[^0-9.-]+/g, "")) || 0;

    switch (currentInput?.name) {
      case "remunerationType":
        remunerationType = currentInput.value;
        break;
      case "amount":
        amount = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
        break;
      default:
        SG = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
        SG = SG > 100 ? 100 : SG;
        break;
    }

    let grossSalary = 0;
    let SGC = 0;

    if (remunerationType === "Gross Salary") {
      grossSalary = amount;
      SGC = (amount * (SG / 100)).toFixed(2);
    } else {
      grossSalary = (amount / (1 + SG / 100)).toFixed(2);
      SGC = (amount - grossSalary).toFixed(2);
    }

    setFieldValue("grossSalary", toCommaAndDollar(grossSalary));
    setFieldValue("SGC", toCommaAndDollar(SGC));
  };

  // ✅ Submit handler (save to main object)
  const onSubmit = async (values) => {
    const Obj = {
      remunerationType: values.remunerationType,
      amount: values.amount,
      SG: values.SG,
      grossSalary: values.grossSalary,
      SGC: values.SGC,
      salarySacrificeContributions: values.salarySacrificeContributions,
      afterTaxContributions: values.afterTaxContributions,
    };

    props.setFieldValue(`${parentKey}${key}`, Obj);

    // ✅ toggle edit/view
    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(false);
    }
  };



  props.setFieldValue(`${parentKey}${key}`, Obj);

  // ✅ change main button to "Save & Exit"
  if (props.setIsEditing) {
    props.setIsEditing(true);
  }

  // ✅ toggle inner modal state
  if (props.flagState) {
    props.setFlagState(false);
    props.setIsEditing(false);
  }
};


  // ✅ Table column definitions
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
      callBack: true,
      func: (values, setFieldValue, thisInput) =>
        FormulaSetting(values, setFieldValue, thisInput),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      type: "number-toComma",
      placeholder: "Enter Amount",
      width: 130,
      callBack: true,
      func: (values, setFieldValue, thisInput) => {
        const cleanVal = thisInput.value.replace(/[^0-9.-]+/g, "");
        setFieldValue(thisInput.name, toCommaAndDollar(cleanVal));
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
        const cleanVal = thisInput.value.replace(/[^0-9.-]+/g, "");
        setFieldValue(thisInput.name, toCommaAndDollar(cleanVal));
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
        const cleanVal = thisInput.value.replace(/[^0-9.-]+/g, "");
        setFieldValue(thisInput.name, toCommaAndDollar(cleanVal));
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

        const tableData = useMemo(() => {
          return [
            {
              key: parentKey.replace(".", ""),
              remunerationType: values?.remunerationType || "",
              amount: values?.amount || "",
              SG: values?.SG || "",
              grossSalary: values?.grossSalary || "",
              SGC: values?.SGC || "",
              salarySacrificeContributions:
                values?.salarySacrificeContributions || "",
              afterTaxContributions: values?.afterTaxContributions || "",
            },
          ];
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
