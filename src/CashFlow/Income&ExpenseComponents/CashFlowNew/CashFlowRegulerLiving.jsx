import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  CashFlowData,
  CashFlowScenarioData,
  defaultUrl,
  QuestionDetail,
} from "../../../Store/Store";

import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
} from "../../../Components/Assets/Api/Api";

import DynamicTableForInputsSection from "../../../Components/Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const CashFlowRegularLiving = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const DefaultUrl = useRecoilValue(defaultUrl);

  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  const CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

  const [objAndAPIKey, setObjAndAPIKey] = useState(
    props?.modalObject?.key || ""
  );

  const generalLivingExpenses =
    questionDetail?.generalLivingExpenses &&
    Object.keys(questionDetail.generalLivingExpenses).length > 0
      ? questionDetail.generalLivingExpenses
      : {};

  const initialValues = {
    client: {
      expenses: "",
      amount: "",
      includeFromYear: 1,
      upUntillYear: 30,
      indexation: "2.50%",
    },
  };

  /* ===============================
     Fill Initial Values
  =============================== */
  const fillInitialValues = (setFieldValue) => {
    setObjAndAPIKey(props.modalObject.key);

    const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

    const updateClientFields = (data) => {
      if (!data) return;

      setFieldValue("client.expenses", data.expenses || "");
      setFieldValue(
        "client.amount",
        data.amount || data.generalLivingExpensesTotal || ""
      );
      setFieldValue("client.includeFromYear", data.includeFromYear || 1);
      setFieldValue("client.upUntillYear", data.upUntillYear || 30);
      setFieldValue("client.indexation", data.indexation || "2.50%");
    };

    /* Discovery Form Source */
    if (
      scenarioObj?.selectedSource === "discoveryForm" &&
      generalLivingExpenses?._id
    ) {
      updateClientFields(generalLivingExpenses);
    } else {
      /* Scenario Source */
      const scenarioData = CashFlowScenarioDataObj?.[objAndAPIKey];
      if (scenarioData?.client) {
        updateClientFields(scenarioData.client);
      }
    }

    /* Saved CashFlow Data */
    const savedCF = cashFlowData?.[objAndAPIKey];
    if (savedCF?.client) {
      updateClientFields(savedCF.client);
    }
  };

  /* ===============================
     Submit
  =============================== */
  const onSubmit = async (values) => {
    const obj = {
      ...values,
      scenarioFK: JSON.parse(localStorage.getItem("ScenarioObj"))?._id,
      clientTotal: values.client.amount || "$0",
    };

    const alreadySaved = cashFlowData?.[objAndAPIKey]?._id;
    console.log(obj);

    try {
      let res;
      if (!alreadySaved) {
        res = await PostAxios(`${DefaultUrl}/api/CF/${objAndAPIKey}/Add`, obj);
      } else {
        res = await PatchAxios(
          `${DefaultUrl}/api/CF/${objAndAPIKey}/Update`,
          obj
        );
      }

      if (res) {
        setCashFlowData({
          ...cashFlowData,
          [objAndAPIKey]: res,
        });
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        `Data of "${props.modalObject.title}" is Saved`
      );

      props?.setFlagState?.(false);
      props.setIsEditing?.(false);
    } catch (error) {
      console.error(error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Data of "${props.modalObject.title}" is not Saved`
      );
    }
  };

  /* ===============================
     Options
  =============================== */
  const expenseOptions = [
    "Living Expenses",
    "Reduce Living Expenses",
    "ASFS Retirement Standards",
    "Holidays",
    "Other",
    "Personal Insurance",
  ].map((v) => ({ value: v, label: v }));

  const yearOptions = Array.from({ length: 31 }, (_, i) => ({
    value: i,
    label: `Year ${i}`,
  }));

  const yearOptionsWithNo = [
    { value: "No", label: "No" },
    ...Array.from({ length: 30 }, (_, i) => ({
      value: `${i + 1}`,
      label: `Year ${i + 1}`,
    })),
  ];

  const indexationOptions = Array.from({ length: 21 }, (_, i) => ({
    value: `${(i * 0.5).toFixed(2)}%`,
    label: `${(i * 0.5).toFixed(2)}%`,
  }));

  const amountOptions = [
    { value: "Modest", label: "Modest" },
    { value: "Comfortable", label: "Comfortable" },
    { value: "No", label: "No" },
  ];

  /* ===============================
     Table Columns (AntD)
  =============================== */
  const columns = [
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      justText: true,
    },
    {
      title: "Expenses",
      dataIndex: "expenses",
      key: "expenses",
      type: "select",
      options: expenseOptions,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      type: "number-toComma",
    },
    {
      title: "Include From Year",
      dataIndex: "includeFromYear",
      key: "includeFromYear",
      type: "select",
      options: yearOptions,
    },
    {
      title: "Up Until Year",
      dataIndex: "upUntillYear",
      key: "upUntillYear",
      type: "select",
      options: yearOptions,
    },
    {
      title: "Indexation",
      dataIndex: "indexation",
      key: "indexation",
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

        const isASFS = values?.client?.expenses === "ASFS Retirement Standards";

        const finalColumns = columns.map((col) => {
          if (isASFS && col.dataIndex === "amount") {
            return { ...col, type: "select", options: amountOptions };
          }
          if (isASFS && col.dataIndex === "includeFromYear") {
            return { ...col, options: yearOptionsWithNo };
          }
          if (isASFS && col.dataIndex === "upUntillYear") {
            return { ...col, disabled: true };
          }
          return col;
        });

        const dataRows = [
          {
            key: "client",
            stakeHolder: "client",
            owner: RenderName("client"),
            ...values.client,
          },
        ];

        return (
          <Form>
            <Row>
              <div className="col-md-12 mt-4 reportSection">
                <AntdTable
                  columns={finalColumns}
                  data={dataRows}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  handleSubmit={props?.handleOk}
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

export default CashFlowRegularLiving;
