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

const CashFlowOtherNoneTaxable = (props) => {
  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  const CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);
  const DefaultUrl = useRecoilValue(defaultUrl);

  const [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");
  const [UserStatus] = useState(localStorage.getItem("UserStatus"));

  /* -------------------- INITIAL VALUES -------------------- */
  const initialValues = {
    owner: [],
    client: {
      otherNoneTaxableIncome: "",
      includeFromYear: 1,
      upUntillYear: 30,
      indexation: "2.50%",
    },
    partner: {
      otherNoneTaxableIncome: "",
      includeFromYear: 1,
      upUntillYear: 30,
      indexation: "2.50%",
    },
  };

  /* -------------------- PREFILL -------------------- */
  const fillInitialValues = (setFieldValue) => {
    try {
      const key = props.modalObject.key;
      setObjAndAPIKey(key);

      const mapFields = (data, prefix) => {
        if (!data) return;

        setFieldValue(
          `${prefix}.otherNoneTaxableIncome`,
          data.otherNoneTaxableIncome || ""
        );
        setFieldValue(`${prefix}.includeFromYear`, data.includeFromYear || 1);
        setFieldValue(`${prefix}.upUntillYear`, data.upUntillYear || 30);
        setFieldValue(`${prefix}.indexation`, data.indexation || "2.50%");
      };

      /* 1️⃣ Scenario */
      const scenarioData = CashFlowScenarioDataObj?.[key];
      if (scenarioData) {
        setFieldValue("owner", scenarioData.owner || []);
        if (scenarioData.owner.includes("client")) {
          mapFields(scenarioData.client, "client");
        }
        if (
          scenarioData.owner.includes("partner") &&
          UserStatus === "Married"
        ) {
          mapFields(scenarioData.partner, "partner");
        }
      }

      /* 2️⃣ Saved */
      const savedData = cashFlowData?.[key];
      if (savedData?._id) {
        setFieldValue("owner", savedData.owner || []);
        if (savedData.owner.includes("client")) {
          mapFields(savedData.client, "client");
        }
        if (savedData.owner.includes("partner") && UserStatus === "Married") {
          mapFields(savedData.partner, "partner");
        }
      }
    } catch (err) {
      console.error("fillInitialValues error:", err);
    }
  };

  /* -------------------- SUBMIT -------------------- */
  const onSubmit = async (values) => {
    const obj = {
      ...values,
      scenarioFK: JSON.parse(localStorage.getItem("ScenarioObj"))._id,
      clientTotal: values.owner.includes("client")
        ? values.client.otherNoneTaxableIncome || "$0"
        : "",
      partnerTotal: values.owner.includes("partner")
        ? values.partner.otherNoneTaxableIncome || "$0"
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

  /* -------------------- TABLE COLUMNS -------------------- */
  const columns = [
    { title: "Owner", dataIndex: "owner", width: 150, justText: true },
    {
      title: "Other None Taxable Income",
      dataIndex: "otherNoneTaxableIncome",
      type: "number-toComma",
      width: 260,
    },
    {
      title: "Include From Year",
      dataIndex: "includeFromYear",
      type: "select",
      options: yearOptions,
    },
    {
      title: "Up Until Year",
      dataIndex: "upUntillYear",
      type: "select",
      options: yearOptions,
    },
    {
      title: "Indexation",
      dataIndex: "indexation",
      type: "select",
      options: indexationOptions,
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
              <div className="col-md-12 d-flex justify-content-center align-items-center gap-4">
                <label>Owner</label>
                <div style={{ minWidth: 250 }}>
                  <Field
                    name="owner"
                    component={AntdCreatableMultiSelect}
                    options={ownerOptions}
                  />
                </div>
              </div>

              {values.owner.length > 0 && (
                <div className="col-md-12 mt-4 All_Client reportSection">
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

export default CashFlowOtherNoneTaxable;
