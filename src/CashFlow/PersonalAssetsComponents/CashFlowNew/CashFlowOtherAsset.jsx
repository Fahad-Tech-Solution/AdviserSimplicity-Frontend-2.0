import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  CashFlowData,
  CashFlowScenarioData,
  defaultUrl,
  GoalsDetail,
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

const AntdTable = DynamicTableForInputsSection("antd");

const CashFlowOtherAsset = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const goalsDetail = useRecoilValue(GoalsDetail);

  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  const CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

  const DefaultUrl = useRecoilValue(defaultUrl);
  const [UserStatus] = useState(localStorage.getItem("UserStatus"));

  const objKey = props.modalObject.key;

  /* ---------------- Initial Values ---------------- */
  const initialValues = {
    owner: [],
    client: {
      currentValue: "",
      sellInYear: "No",
      newPurchase: "",
      purchaseInYear: 30,
      indexation: "2.50%",
    },
    partner: {
      currentValue: "",
      sellInYear: "No",
      newPurchase: "",
      purchaseInYear: 30,
      indexation: "2.50%",
    },
    joint: {
      currentValue: "",
      sellInYear: "No",
      newPurchase: "",
      purchaseInYear: 30,
      indexation: "2.50%",
    },
  };

  /* ---------------- Fill Initial Values ---------------- */
  const fillInitialValues = (setFieldValue) => {
    const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));
    const cfData = CashFlowScenarioDataObj?.[objKey] || cashFlowData?.[objKey];

    if (!cfData) return;

    setFieldValue("owner", cfData.owner || []);

    ["client", "partner", "joint"].forEach((stake) => {
      if (cfData.owner?.includes(stake) && cfData[stake]) {
        Object.entries(cfData[stake]).forEach(([k, v]) => {
          setFieldValue(`${stake}.${k}`, v ?? "");
        });
      }
    });

    /* ---- Auto-fill Car Goal ---- */
    if (
      props.modalObject.title === "Car" &&
      goalsDetail?.carGoal?.estimatedValue
    ) {
      setFieldValue("client.newPurchase", goalsDetail.carGoal.estimatedValue);
      setFieldValue(
        "client.purchaseInYear",
        parseFloat(goalsDetail.carGoal.when.match(/\d+/)?.[0]) || 30
      );
    }
  };

  /* ---------------- Submit ---------------- */
  const onSubmit = async (values) => {
    const obj = {
      ...values,
      scenarioFK: JSON.parse(localStorage.getItem("ScenarioObj"))._id,
    };

    obj.clientTotal = values.owner.includes("client")
      ? values.client.currentValue
      : values.owner.includes("joint")
      ? values.joint.currentValue
      : "";

    obj.partnerTotal = values.owner.includes("partner")
      ? values.partner.currentValue
      : "";

    try {
      const existingId = cashFlowData?.[objKey]?._id;
      const res = existingId
        ? await PatchAxios(`${DefaultUrl}/api/CF/${objKey}/Update`, obj)
        : await PostAxios(`${DefaultUrl}/api/CF/${objKey}/Add`, obj);

      if (res) {
        setCashFlowData({
          ...cashFlowData,
          [objKey]: res,
        });
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success",
        `Data of "${props.modalObject.title}" is saved`
      );

      props.setFlagState?.(false);
    } catch (error) {
      console.error(error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error",
        `Data of "${props.modalObject.title}" not saved`
      );
    }
  };

  /* ---------------- Owner Options ---------------- */
  const onlyJoint = ["Boat", "Caravan", "House hold"];
  const onlyClient = ["Contents", "Other Assets"];

  const ownerOptions = onlyJoint.includes(props.modalObject.title)
    ? [{ value: "joint", label: RenderName("joint") }]
    : onlyClient.includes(props.modalObject.title)
    ? [{ value: "client", label: RenderName("client") }]
    : UserStatus === "Married"
    ? [
        { value: "client", label: RenderName("client") },
        { value: "partner", label: RenderName("partner") },
      ]
    : [{ value: "client", label: RenderName("client") }];

  const loanTermOptionsWithNo = Array.from({ length: 32 }, (_, i) => {
    if (i === 0) {
      return {
        value: "No",
        label: "No",
      };
    }

    return {
      value: (i - 1).toString(),
      label: `Year ${i - 1}`,
    };
  });

  const loanTermOptions = Array.from({ length: 31 }, (_, i) => {
    return {
      value: i.toString(),
      label: `Year ${i}`,
    };
  });

  const indexation = [
    // Negative values from -0.00% to -5.00% in increments of 0.50%
    ...Array.from({ length: 11 }, (_, i) => ({
      value: `-${(i * 0.5).toFixed(2)}%`,
      label: `-${(i * 0.5).toFixed(2)}%`,
    })),

    // Positive values from 0.00% to 5.00% in increments of 0.50%
    ...Array.from({ length: 11 }, (_, i) => ({
      value: (i * 0.5).toFixed(2) + "%",
      label: (i * 0.5).toFixed(2) + "%",
    })),
  ];

  /* ---------------- Table Columns ---------------- */
  const columns = [
    { title: "Owner", dataIndex: "owner", key: "owner", type: "label" },
    {
      title: "Current Value",
      dataIndex: "currentValue",
      type: "number-toComma",
    },
    {
      title: "Sell In Year",
      dataIndex: "sellInYear",
      type: "select",
      options: loanTermOptionsWithNo,
    },
    {
      title: "New Purchase",
      dataIndex: "newPurchase",
      type: "number-toComma",
    },
    {
      title: "Purchase In Year",
      dataIndex: "purchaseInYear",
      type: "select",
      options: loanTermOptions,
    },
    {
      title: "Indexation",
      dataIndex: "indexation",
      type: "select",
      options: indexation,
    },
  ];

  /* ---------------- Render ---------------- */
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

        const rows = [];

        if (values.owner.includes("client"))
          rows.push({
            key: "client",
            owner: RenderName("client"),
            stakeHolder: "client",
            ...values.client,
          });

        if (values.owner.includes("partner") && UserStatus === "Married")
          rows.push({
            key: "partner",
            owner: RenderName("partner"),
            stakeHolder: "partner",
            ...values.partner,
          });

        if (values.owner.includes("joint"))
          rows.push({
            key: "joint",
            owner: RenderName("joint"),
            stakeHolder: "joint",
            ...values.joint,
          });

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                {/* Owner Selector */}
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <label className="mb-0">Owner</label>
                  <div style={{ minWidth: 220 }}>
                    <Field
                      name="owner"
                      component={AntdCreatableMultiSelect}
                      options={ownerOptions}
                    />
                  </div>
                </div>

                {values.owner.length > 0 && (
                  <div className="mt-4 reportSection">
                    <AntdTable
                      columns={columns}
                      data={rows}
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
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CashFlowOtherAsset;
