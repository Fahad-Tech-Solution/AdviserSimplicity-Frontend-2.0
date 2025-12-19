import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  CashFlowData,
  CashFlowScenarioData,
  defaultUrl,
} from "../../../Store/Store";

import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
} from "../../../Components/Assets/Api/Api";

import { AntdCreatableMultiSelect } from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";

import DynamicTableForInputsSection from "../../../Components/Assets/Table/DynamicTableForInputsSection";

const AntDTableHOC = DynamicTableForInputsSection("antd");

const CashFlowOverseasPensions = (props) => {
  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  const CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);
  const DefaultUrl = useRecoilValue(defaultUrl);

  const [UserStatus] = useState(localStorage.getItem("UserStatus"));
  const [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

  const incomeFromOverseasPension = cashFlowData?.incomeFromOverseasPension?._id
    ? cashFlowData.incomeFromOverseasPension
    : {};

  const initialValues = { owner: [] };

  /* -------------------- PREFILL -------------------- */
  const fillInitialValues = (setFieldValue) => {
    try {
      // Set key once
      const key = props.modalObject.key;
      setObjAndAPIKey(key);

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      /**
       * Helper to map fields safely
       */
      const mapFields = (data, prefix) => {
        if (!data) return;

        setFieldValue(
          `${prefix}.otherTaxableIncome`,
          data.otherTaxableIncome || ""
        );
        setFieldValue(`${prefix}.includeFromYear`, data.includeFromYear ?? 1);
        setFieldValue(`${prefix}.upUntillYear`, data.upUntillYear ?? 30);
        setFieldValue(`${prefix}.indexation`, data.indexation || "2.50%");
      };

      /**
       * 1️⃣ Discovery Form (highest priority)
       */
      if (
        scenarioObj?.selectedSource === "discoveryForm" &&
        incomeFromOverseasPension?._id
      ) {
        const owners = incomeFromOverseasPension.owner || [];
        setFieldValue("owner", owners);

        if (owners.includes("client")) {
          mapFields(incomeFromOverseasPension.client, "client");
        }

        if (owners.includes("partner") && UserStatus === "Married") {
          mapFields(incomeFromOverseasPension.partner, "partner");
        }

        return; // 🚫 stop further overrides
      }

      /**
       * 2️⃣ Scenario CashFlow data
       */
      const scenarioData = CashFlowScenarioDataObj?.[key];
      if (scenarioData) {
        const owners = scenarioData.owner || [];
        setFieldValue("owner", owners);

        if (owners.includes("client")) {
          mapFields(scenarioData.client, "client");
        }

        if (owners.includes("partner") && UserStatus === "Married") {
          mapFields(scenarioData.partner, "partner");
        }
      }

      /**
       * 3️⃣ Saved CashFlow data (fallback)
       */
      const savedData = cashFlowData?.[key];
      if (savedData?._id) {
        const owners = savedData.owner || [];
        setFieldValue("owner", owners);

        if (owners.includes("client")) {
          mapFields(savedData.client, "client");
        }

        if (owners.includes("partner") && UserStatus === "Married") {
          mapFields(savedData.partner, "partner");
        }
      }
    } catch (error) {
      console.error("fillInitialValues error:", error);
    }
  };

  /* -------------------- SUBMIT -------------------- */
  const onSubmit = async (values) => {
    const obj = {
      ...values,
      scenarioFK: JSON.parse(localStorage.getItem("ScenarioObj"))._id,
      clientTotal: values.owner.includes("client")
        ? values.client?.otherTaxableIncome || "$0"
        : "",
      partnerTotal: values.owner.includes("partner")
        ? values.partner?.otherTaxableIncome || "$0"
        : "",
    };

    try {
      const exists = cashFlowData?.[objAndAPIKey]?._id;
      const res = exists
        ? await PatchAxios(`${DefaultUrl}/api/CF/${objAndAPIKey}/Update`, obj)
        : await PostAxios(`${DefaultUrl}/api/CF/${objAndAPIKey}/Add`, obj);

      if (res) {
        setCashFlowData({ ...cashFlowData, [objAndAPIKey]: res });
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success",
        `"${props.modalObject.title}" saved`
      );

      props.setFlagState?.(false);
      props.setIsEditing?.(false);
    } catch {
      openNotificationSuccess(
        "error",
        "topRight",
        "Error",
        `"${props.modalObject.title}" not saved`
      );
    }
  };

  /* -------------------- OPTIONS -------------------- */
  const ownerOptions =
    UserStatus !== "Single"
      ? [
          { value: "client", label: RenderName("client") },
          { value: "partner", label: RenderName("partner") },
        ]
      : [{ value: "client", label: RenderName("client") }];

  const yearOptions = Array.from({ length: 31 }, (_, i) => ({
    value: i,
    label: `Year ${i}`,
  }));

  const indexationOptions = Array.from({ length: 21 }, (_, i) => ({
    value: `${(i * 0.5).toFixed(2)}%`,
    label: `${(i * 0.5).toFixed(2)}%`,
  }));

  /* -------------------- COLUMNS -------------------- */
  const columns = [
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      type: "text",
      width: 150,
    },
    {
      title: "Other Taxable Income",
      dataIndex: "otherTaxableIncome",
      key: "otherTaxableIncome",
      type: "number-toComma",
      width: 200,
    },
    {
      title: "Include From Year",
      dataIndex: "includeFromYear",
      key: "includeFromYear",
      type: "select",
      options: yearOptions,
      width: 150,
    },
    {
      title: "Up Until Year",
      dataIndex: "upUntillYear",
      key: "upUntillYear",
      type: "select",
      options: yearOptions,
      width: 150,
    },
    {
      title: "Indexation",
      dataIndex: "indexation",
      key: "indexation",
      type: "select",
      options: indexationOptions,
      width: 150,
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
          const rows = [];

          if (values.owner.includes("client")) {
            rows.push({
              key: "client",
              stakeHolder: "client",
              owner: RenderName("client"),
              ...values.client,
            });
          }

          if (values.owner.includes("partner") && UserStatus === "Married") {
            rows.push({
              key: "partner",
              stakeHolder: "partner",
              owner: RenderName("partner"),
              ...values.partner,
            });
          }

          return rows;
        }, [values, UserStatus]);

        return (
          <Form>
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center gap-4">
                <label
                  onClick={() => {
                    console.log(values);
                  }}
                >
                  Owner
                </label>
                <div style={{ minWidth: "250px" }}>
                  <Field
                    name="owner"
                    component={AntdCreatableMultiSelect}
                    options={ownerOptions}
                  />
                </div>
              </div>

              {values.owner.length > 0 && (
                <div className="col-md-12 mt-4  All_Client reportSection">
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
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CashFlowOverseasPensions;
