import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
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

import { AntdCreatableMultiSelect } from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableForInputsSection from "../../../Components/Assets/Table/DynamicTableForInputsSection";

const AntDTableHOC = DynamicTableForInputsSection("antd");

const CashFlowCenterLink = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  const CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);
  const DefaultUrl = useRecoilValue(defaultUrl);

  const [UserStatus] = useState(localStorage.getItem("UserStatus"));
  const [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

  const incomeFromCentrelink = questionDetail?.incomeFromCentrelink?._id
    ? questionDetail.incomeFromCentrelink
    : {};

  const initialValues = {
    owner: [],
    client: {
      includeFromYear: 1,
      allowCarerAllowance: "No",
      isClientRenting: "No",
      applySeparatedByIllness: "No",
    },
    partner: {
      includeFromYear: 1,
      allowCarerAllowance: "No",
      isClientRenting: "No",
      applySeparatedByIllness: "No",
    },
  };

  /* -------------------- PREFILL -------------------- */
  const fillInitialValues = (setFieldValue) => {
    try {
      const key = props.modalObject.key;
      setObjAndAPIKey(key);

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));
      const savedData = cashFlowData?.[key];

      const mapFields = (data, prefix) => {
        if (!data) return;

        const fields = {
          includeFromYear: data.includeFromYear ?? 1,
          allowCarerAllowance:
            data.allowCarerAllowance ??
            (data.paymentType?.includes("Carer Allowance") ? "Yes" : "No"),
          isClientRenting:
            data.isClientRenting ??
            (data.paymentType?.includes("Rent Assistance") ? "Yes" : "No"),
          centrelinkPayment: data.centrelinkPayment || "",
          applySeparatedByIllness: data.applySeparatedByIllness || "No",
        };

        Object.entries(fields).forEach(([key, value]) =>
          setFieldValue(`${prefix}.${key}`, value)
        );
      };

      // 1️⃣ Discovery Form
      if (
        scenarioObj?.selectedSource === "discoveryForm" &&
        incomeFromCentrelink?._id &&
        !savedData?._id
      ) {
        const owners = incomeFromCentrelink.owner || [];
        setFieldValue("owner", owners);
        console.log("discovrey Data", incomeFromCentrelink);
        if (owners.includes("client"))
          mapFields(incomeFromCentrelink.client, "client");
        if (owners.includes("partner") && UserStatus === "Married")
          mapFields(incomeFromCentrelink.partner, "partner");

        return;
      }

      // 2️⃣ Scenario CashFlow
      const scenarioData = CashFlowScenarioDataObj?.[key];
      if (scenarioData) {
        const owners = scenarioData.owner || [];
        setFieldValue("owner", owners);
        console.log("scenarioData Data", scenarioData);
        if (owners.includes("client")) mapFields(scenarioData.client, "client");
        if (owners.includes("partner") && UserStatus === "Married")
          mapFields(scenarioData.partner, "partner");
      }

      // 3️⃣ Saved CashFlow

      if (savedData?._id) {
        const owners = savedData.owner || [];
        setFieldValue("owner", owners);
        console.log("savedData Data", savedData);

        if (owners.includes("client")) mapFields(savedData.client, "client");
        if (owners.includes("partner") && UserStatus === "Married")
          mapFields(savedData.partner, "partner");
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
        ? "Year " + values.client.includeFromYear
        : "",
      partnerTotal: values.owner.includes("partner")
        ? "Year " + values.partner.includeFromYear
        : "",
    };

    if (!values.owner.includes("client")) obj.client = {};
    if (!values.owner.includes("partner")) obj.partner = {};

    try {
      const exists = cashFlowData?.[objAndAPIKey]?._id;
      const res = exists
        ? await PatchAxios(`${DefaultUrl}/api/CF/${objAndAPIKey}/Update`, obj)
        : await PostAxios(`${DefaultUrl}/api/CF/${objAndAPIKey}/Add`, obj);

      if (res) setCashFlowData({ ...cashFlowData, [objAndAPIKey]: res });

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
    value: i.toString(),
    label: `Year ${i}`,
  }));

  const paymentTypeOptions = [
    { value: "Not Eligible", label: "Not Eligible" },
    { value: "Disability Pension", label: "Disability Pension" },
    { value: "Carers Payment", label: "Carers Payment" },
    { value: "Job Seeker", label: "Job Seeker" },
  ];

  /* -------------------- COLUMNS -------------------- */
  const columns = [
    { title: "Owner", dataIndex: "owner", key: "owner", width: 150 },
    {
      title: "Centrelink Payment",
      dataIndex: "centrelinkPayment",
      key: "centrelinkPayment",
      type: "select",
      options: paymentTypeOptions,
    },
    {
      title: "Include From Year",
      dataIndex: "includeFromYear",
      key: "includeFromYear",
      type: "select",
      options: yearOptions,
    },
    {
      title: "Allow Carer Allowance",
      dataIndex: "allowCarerAllowance",
      key: "allowCarerAllowance",
      type: "yesno",
      width: 100,
    },
    {
      title: "Is Client Renting",
      dataIndex: "isClientRenting",
      key: "isClientRenting",
      type: "yesno",
      width: 100,
    },
    {
      title: "Apply Separated By Illness",
      dataIndex: "applySeparatedByIllness",
      key: "applySeparatedByIllness",
      type: "yesno",
      width: 100,
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
        useEffect(() => fillInitialValues(setFieldValue), []);

        const tableData = useMemo(() => {
          const rows = [];
          if (values.owner.includes("client"))
            rows.push({
              key: "client",
              stakeHolder: "client",
              owner: RenderName("client"),
              ...values.client,
            });
          if (values.owner.includes("partner") && UserStatus === "Married")
            rows.push({
              key: "partner",
              stakeHolder: "partner",
              owner: RenderName("partner"),
              ...values.partner,
            });
          return rows;
        }, [values, UserStatus]);

        return (
          <Form>
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center gap-4">
                <label>Owner</label>
                <div style={{ minWidth: "250px" }}>
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

export default CashFlowCenterLink;
