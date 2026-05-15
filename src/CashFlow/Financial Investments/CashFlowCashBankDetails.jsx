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
import RegularContributions from "./RegularContributions";

const AntdTable = DynamicTableForInputsSection("antd");

const CashFlowCashBankDetails = (props) => {
  /*
       This component is a dynamic and reusable modal component designed to handle the following modal types:
       1. "Cash"
       2. "Term Deposits"
       3. "Investment Bonds"
   
       TODO-IMPORTANT:
       - Ensure any changes to this component are planned carefully to avoid unintended effects on all supported modals.
       - If specific modifications are required for one modal type, consider implementing targeted logic or extensions 
         to maintain the integrity of the shared functionality.
   */

  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  const CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);
  const questionDetail = useRecoilValue(QuestionDetail);
  const DefaultUrl = useRecoilValue(defaultUrl);

  const [UserStatus] = useState(localStorage.getItem("UserStatus"));
  const objKey = props.modalObject.key;

  /* ---------------- Layout Switches ---------------- */
  const layoutSwitchFlag = ["Term Deposits", "Investment Bonds"].includes(
    props.modalObject.title
  );
  const layoutSwitchFlag2 = props.modalObject.title === "Investment Bonds";

  /* ---------------- Modal ---------------- */
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  /* ---------------- Initial Values ---------------- */
  const initialValues = {
    owner: [],
    client: {},
    partner: {},
    joint: {},
  };

  /* ---------------- Fill Initial Values ---------------- */
  const fillInitialValues = (setFieldValue) => {
    const data = CashFlowScenarioDataObj?.[objKey] || cashFlowData?.[objKey];

    if (!data) return;

    setFieldValue("owner", data.owner || []);

    ["client", "partner", "joint"].forEach((stake) => {
      if (data.owner?.includes(stake) && data[stake]) {
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
    if (values.owner.includes("joint")) {
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

  let InvestmentReturnsOptions = [
    { value: "system", label: "System" },
    { value: "input Override", label: "Input Override" },
  ];

  let RiskProfileOptions = [
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

  let surplusDeficitOptions = [
    { value: "client", label: RenderName("client") },
    { value: "partner", label: RenderName("partner") },
    { value: "joint", label: RenderName("joint") },
    { value: "Spent", label: "Spent" },
  ];

  const reinvestUpUntilOptions = Array.from({ length: 31 }, (_, i) => {
    return {
      value: i.toString(),
      label: ("Year " + i).toString(),
    };
  });

  /* ---------------- Columns ---------------- */
  const columns = [
    { title: "Owner", dataIndex: "owner", type: "label", justText: true },
    {
      title: "Current Balance",
      placeholder: "Current Balance",
      dataIndex: "currentBalance",
      type: "number-toComma",
    },
    ...(layoutSwitchFlag2
      ? [
          {
            title: "Cost Base",
            placeholder: "Cost Base",
            dataIndex: "costBase",
            type: "number-toComma",
          },
        ]
      : []),
    {
      title: "Investment Returns",
      placeholder: "Investment Returns",
      dataIndex: "investmentReturns",
      type: "select",
      innerModalTitle: "Input Override",
      selectedOptionValue: true,
      callBack: true,
      options: InvestmentReturnsOptions,
      func: (values, setFieldValue, thisInput, stakeHolder) => {
        console.log(thisInput);
        if (thisInput.value == "system") {
          setFieldValue(
            stakeHolder + (layoutSwitchFlag2 ? "earningsRate" : "incomeYield"),
            ""
          );
        }
      },
    },
    {
      title: layoutSwitchFlag2 ? "Earnings Rate" : "Income Yield",
      dataIndex: layoutSwitchFlag2 ? "earningsRate" : "incomeYield",
      type: "number-toPercent",
      placeholder: layoutSwitchFlag2 ? "Earnings Rate" : "Income Yield",
      disabled: (values, stakeHolder) => {
        if (
          values?.[stakeHolder.replace(".", "")]?.investmentReturns == "system"
        ) {
          return true;
        } else {
          return false;
        }
      },
    },
    ...(!layoutSwitchFlag2
      ? [
          {
            title: "Reinvest Income",
            dataIndex: "reinvestIncome",
            type: "yesno",
          },
          {
            title: "Reinvest Up Until",
            dataIndex: "reinvestUpUntil",
            type: "select",
            options: reinvestUpUntilOptions,
            selectedOptionValue: true,
          },
        ]
      : []),
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
      selectedOptionValue: true,
      type: "select",
      options:
        props.modalObject.title === "Cash"
          ? [{ value: "Cash", label: "Cash", selected: true }]
          : props.modalObject.title === "Term Deposits"
          ? [
              { value: "Cash", label: "Cash" },
              {
                value: "Australian Fixed Interest",
                label: "Australian Fixed Interest",
                selected: true,
              },
            ]
          : RiskProfileOptions,
    },
    ...(layoutSwitchFlag2
      ? [
          {
            title: "Investment Fees",
            dataIndex: "investmentFees",
            type: "number-toPercent",
            placeholder: "Investmet Fees",
          },
        ]
      : []),
    ...(layoutSwitchFlag
      ? [
          {
            title: `Cashout in ${layoutSwitchFlag2 ? "Funds" : "Year"}`,
            placeholder: `Cashout in ${layoutSwitchFlag2 ? "Funds" : "Year"}`,
            dataIndex: "cashOutYear",
            selectedOptionValue: true,
            type: "select",
            options: reinvestUpUntilOptions,
          },
        ]
      : []),
    ...(props.modalObject.title === "Cash"
      ? [
          {
            title: "Surplus / Deficit",
            dataIndex: "surplusDeficit",
            selectedOptionValue: true,
            type: "select",
            options: surplusDeficitOptions,
          },
        ]
      : []),
  ];

  /* ---------------- Owner Options ---------------- */
  const options =
    UserStatus !== "Single"
      ? [
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

        const rows = React.useMemo(
          () => {
          const result = [];

          if (values.owner.includes("client"))
            result.push({
              key: "client",
              owner: RenderName("client"),
              stakeHolder: "client",
              ...values.client,
            });

          if (values.owner.includes("partner") && UserStatus === "Married")
            result.push({
              key: "partner",
              owner: RenderName("partner"),
              stakeHolder: "partner",
              ...values.partner,
            });

          if (values.owner.includes("joint") && UserStatus === "Married")
            result.push({
              key: "joint",
              owner: RenderName("joint"),
              stakeHolder: "joint",
              ...values.joint,
            });

          return result;
        }, [values.owner, values.client, values.partner, values.joint, UserStatus]);

        return (
          <Form>
            <Row>
              <InnerModal
                modalObject={modalObject}
                setFieldValue={setFieldValue}
                setFlagState={setFlagState}
                flagState={flagState}
              >
                <RegularContributions />
              </InnerModal>

              <div className="col-md-12">
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <label
                    className="mb-0"
                    onClick={() => {
                      console.log(values);
                    }}
                  >
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

export default CashFlowCashBankDetails;
