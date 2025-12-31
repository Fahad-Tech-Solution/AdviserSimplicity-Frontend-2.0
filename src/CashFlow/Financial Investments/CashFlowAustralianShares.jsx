import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  CashFlowData,
  CashFlowScenarioData,
  defaultUrl,
  QuestionDetail,
} from "../../Store/Store";

import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
  toCommaAndDollar,
} from "../../Components/Assets/Api/Api";

import { AntdCreatableMultiSelect } from "../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";

import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import InputOverride from "./InputOverride";
import RegularContributions from "./RegularContributions";

const AntdTable = DynamicTableForInputsSection("antd");

const CashFlowAustralianShares = (props) => {
  /*
         This component is a dynamic and reusable modal component designed to handle the following modal types:
         1. "Australian Shares"
         2. "Platform Investment"
         3. "Other Investments"
         4. "SMSF Australian Shares"
         s. "SMSF Platform Investment"
     
         TODO-IMPORTANT:
         - Ensure any changes to this component are planned carefully to avoid unintended effects on all supported modals.
         - If specific modifications are required for one modal type, consider implementing targeted logic or extensions 
           to maintain the integrity of the shared functionality.
     */

  const questionDetail = useRecoilValue(QuestionDetail);
  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  const CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);
  const DefaultUrl = useRecoilValue(defaultUrl);

  const [UserStatus] = useState(localStorage.getItem("UserStatus"));
  const objKey = props.modalObject.key;

  /* ---------------- Layout Switches ---------------- */
  const layoutSwitchArray = [
    "Platform Investment",
    "Other Investments",
    "SMSF Platform Investment",
    "SMSF Australian Shares",
    "SMSF",
    "Family Trust Australian Shares",
    "Family Trust Platform Investment",
    "Family Trust",
  ];

  const layoutSwitchSMSFArray = [
    "SMSF Platform Investment",
    "SMSF Australian Shares",
    "SMSF",
    "Family Trust Australian Shares",
    "Family Trust Platform Investment",
    "Family Trust",
  ];

  const layoutSwitchFlag = layoutSwitchArray.includes(props.modalObject.title);
  const layoutSwitchSMSFFlag = layoutSwitchSMSFArray.includes(
    props.modalObject.title
  );

  /* ---------------- Modal State ---------------- */
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  /* ---------------- Initial Values ---------------- */
  const initialValues = {
    owner: layoutSwitchSMSFFlag ? ["client"] : [],
    client: { cashOutFunds: "No" },
    partner: { cashOutFunds: "No" },
    joint: { cashOutFunds: "No" },
  };

  /* ---------------- Fill Initial Values ---------------- */
  const fillInitialValues = (setFieldValue) => {
    const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));
    const data = CashFlowScenarioDataObj?.[objKey] || cashFlowData?.[objKey];

    if (!data) return;

    setFieldValue(
      "owner",
      layoutSwitchSMSFFlag
        ? data.owner?.filter((o) => o === "client")
        : data.owner || []
    );

    ["client", "partner", "joint"].forEach((stake) => {
      if (
        data.owner?.includes(stake) &&
        data[stake] &&
        (!layoutSwitchSMSFFlag || stake === "client")
      ) {
        Object.entries(data[stake]).forEach(([k, v]) => {
          setFieldValue(`${stake}.${k}`, v ?? "");
        });
      }
    });
  };

  /* ---------------- Submit ---------------- */
  const onSubmit = async (values) => {
    const obj = {
      ...values,
      scenarioFK: JSON.parse(localStorage.getItem("ScenarioObj"))._id,
    };

    let jointBalance = 0;

    if (values.owner.includes("joint") && !layoutSwitchSMSFFlag) {
      jointBalance = parseFloat(
        values.joint.currentBalance?.replace(/[^0-9.-]+/g, "") || 0
      );
    }

    obj.clientTotal = values.owner.includes("client")
      ? toCommaAndDollar(
          parseFloat(
            values.client.currentBalance?.replace(/[^0-9.-]+/g, "") || 0
          ) +
            jointBalance / 2
        )
      : "";

    obj.partnerTotal = values.owner.includes("partner")
      ? toCommaAndDollar(
          parseFloat(
            values.partner.currentBalance?.replace(/[^0-9.-]+/g, "") || 0
          ) +
            jointBalance / 2
        )
      : "";

    if (layoutSwitchSMSFFlag) {
      obj.partner = undefined;
      obj.partnerTotal = undefined;
      obj.joint = undefined;
      obj.jointTotal = undefined;
    }

    try {
      const exists = cashFlowData?.[objKey]?._id;
      const res = exists
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
      props?.setIsEditing?.(false);
    } catch (err) {
      console.error(err);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error",
        `Data of "${props.modalObject.title}" not saved`
      );
    }
  };

  /* ---------------- Inner Modal ---------------- */
  const handleInnerModal = (title, values, key, stakeHolder) => {
    setModalObject({ title, values, key, stakeHolder });
    setFlagState(true);
  };

  const componentMapping = {
    "Input Override": <InputOverride />,
    "Regular Contributions": <RegularContributions />,
  };

  const reinvestUpUntilOptions = Array.from({ length: 31 }, (_, i) => {
    return {
      value: i.toString(),
      label: ("Year " + i).toString(),
    };
  });

  let investmentReturnsOptions = [
    { value: "system", label: "System" },
    { value: "input Override", label: "Input Override" },
  ];

  let RiskProfileOnlyAustralianOptionArray = [
    "Family Trust Australian Shares",
    "SMSF Australian Shares",
    "Australian Shares",
  ];
  const loanTermOptions = Array.from({ length: 31 }, (_, i) => {
    return {
      value: i.toString(),
      label: ("Year " + i).toString(),
    };
  });

  let riskProfileOptions = [
    { value: "Conservative", label: "Conservative" },
    { value: "Moderately Conservative", label: "Moderately Conservative" },
    { value: "Balanced", label: "Balanced" },
    { value: "Growth", label: "Growth" },
    { value: "High Growth", label: "High Growth" },
    { value: "Cash", label: "Cash" },
    { value: "International Shares", label: "International Shares" },
    { value: "Property", label: "Property" },
    { value: "Australian Fixed Interest", label: "Australian Fixed Interest" },
    {
      value: "International Fixed Interest",
      label: "International Fixed Interest",
    },
    { value: "Other", label: "Other" },
    { value: "Australian Shares", label: "Australian Shares" },
  ];

  /* ---------------- Table Columns ---------------- */
  const columns = [
    { title: "Owner", dataIndex: "owner", type: "label", justText: true },
    {
      title: layoutSwitchSMSFFlag ? "Opening Balance" : "Current Balance",
      dataIndex: "currentBalance",
      type: "number-toComma",
    },
    { title: "Cost Base", dataIndex: "costBase", type: "number-toComma" },
    {
      title: "Investment Returns",
      dataIndex: "investmentReturns",
      key: "investmentReturns",
      type: "selectModal",
      ModalOption: "input Override",
      selectedOptionValue: true,
      innerModalTitle: "Input Override",
      options: investmentReturnsOptions,
      func: handleInnerModal,
    },
    { title: "Reinvest Income", dataIndex: "reinvestIncome", type: "yesno" },
    {
      title: "Reinvest Up Until",
      dataIndex: "reinvestUpUntil",
      type: "select",
      selectedOptionValue: true,
      options: reinvestUpUntilOptions,
    },
    {
      title: "Regular Contributions",
      dataIndex: "regularContributions",
      type: "yesnoModal",
      innerModalTitle: "Regular Contributions",
      key: "regularContributions",
      callBack: true,
      func: handleInnerModal,
    },
    {
      title: "Risk Profile / SAA",
      dataIndex: "riskProfile",
      type: "select",
      options: RiskProfileOnlyAustralianOptionArray.includes(
        props.modalObject.title
      )
        ? [{ value: "Australian Shares", label: "Australian Shares" }]
        : riskProfileOptions,
    },
    ...(layoutSwitchFlag
      ? [
          {
            title: "Investment Fees",
            dataIndex: "investmentFees",
            type: "number-toPercent",
          },
        ]
      : []),
    {
      title: "Cashout Funds",
      dataIndex: "cashOutFunds",
      type: "select",
      options: loanTermOptions,
    },
  ];

  /* ---------------- Owner Options ---------------- */
  const options =
    UserStatus !== "Single"
      ? layoutSwitchSMSFFlag
        ? [{ value: "client", label: RenderName("client") }]
        : [
            { value: "client", label: RenderName("client") },
            { value: "partner", label: RenderName("partner") },
            { value: "joint", label: RenderName("joint") },
          ]
      : [{ value: "client", label: RenderName("client") }];

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

        if (values.owner.includes("joint") && UserStatus === "Married")
          rows.push({
            key: "joint",
            owner: RenderName("joint"),
            stakeHolder: "joint",
            ...values.joint,
          });

        return (
          <Form>
            <Row>
              <InnerModal
                modalObject={modalObject}
                setFieldValue={setFieldValue}
                setFlagState={setFlagState}
                flagState={flagState}
              >
                {componentMapping[modalObject.title]}
              </InnerModal>

              {!layoutSwitchSMSFFlag && (
                <div className="col-md-12">
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <label className="mb-0" onClick={() => console.log(values)}>
                      Owner
                    </label>
                    <div style={{ minWidth: 220 }}>
                      <Field
                        name="owner"
                        component={AntdCreatableMultiSelect}
                        options={options}
                      />
                    </div>
                  </div>
                </div>
              )}

              {values.owner.length > 0 && (
                <div className="mt-4 All_Client reportSection">
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
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CashFlowAustralianShares;
