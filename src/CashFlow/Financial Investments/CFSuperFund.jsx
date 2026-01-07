import React, { useEffect, useMemo, useState } from "react";
import { Field, Form, Formik } from "formik";
import { useRecoilState, useRecoilValue } from "recoil";

import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";
import {
  AntdCreatableMultiSelect,
  CreatableMultiSelectField,
} from "../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";

import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
  toCommaAndDollar,
} from "../../Components/Assets/Api/Api";

import {
  CashFlowData,
  CashFlowScenarioData,
  defaultUrl,
  QuestionDetail,
} from "../../Store/Store";

import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";

import InputOverride from "./InputOverride";
import BalanceComponents from "./BalanceComponents";
import InsurancePremiums from "./InsurancePremiums";
import RolloverFunds from "./RolloverFunds";
import ConcessionalContributions from "./ConcessionalContributions";
import NonConcessionalContributions from "./NonConcessionalContributions";
import Withdrawals from "./Withdrawals";

const AntDTableHOC = DynamicTableForInputsSection("antd");

const CFSuperFund = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  const CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);
  const DefaultUrl = useRecoilValue(defaultUrl);

  const [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});
  const UserStatus = localStorage.getItem("UserStatus");

  const superAnnuationIssues = questionDetail.superAnnuationIssues || {
    client: [],
    partner: [],
    joint: [],
  };

  /* -------------------- INITIAL VALUES -------------------- */
  const initialValues = {
    owner: [],
  };

  /* -------------------- PREFILL -------------------- */
  const fillInitialValues = (setFieldValue) => {
    try {
      setObjAndAPIKey(props.modalObject.key);
      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      const updateFields = (data, prefix) => {
        if (!data) return;

        Object.entries(data).forEach(([key, value]) => {
          setFieldValue(`${prefix}.${key}`, value ?? "");
        });
      };

      const cashFlowDetails =
        CashFlowScenarioDataObj?.[objAndAPIKey] || cashFlowData?.[objAndAPIKey];

      if (cashFlowDetails) {
        setFieldValue("owner", cashFlowDetails.owner || []);

        if (cashFlowDetails.owner?.includes("client")) {
          updateFields(cashFlowDetails.client, "client");
        }

        if (
          UserStatus === "Married" &&
          cashFlowDetails.owner?.includes("partner")
        ) {
          updateFields(cashFlowDetails.partner, "partner");
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
        ? values.client?.adviserServiceFee || "$0"
        : "",
      partnerTotal: values.owner.includes("partner")
        ? values.partner?.adviserServiceFee || "$0"
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
        `"${props.modalObject.title}" saved successfully`
      );

      props.flagState && props.setFlagState(false);
    } catch (err) {
      openNotificationSuccess(
        "error",
        "topRight",
        "Error",
        `"${props.modalObject.title}" could not be saved`
      );
    }
  };

  /* -------------------- INNER MODAL -------------------- */
  const handleInnerModal = (title, values, key, stakeHolder) => {
    setModalObject({ title, values, key, stakeHolder });
    setFlagState(true);
  };

  /* -------------------- OPTIONS -------------------- */
  const ownerOptions =
    UserStatus !== "Single"
      ? [
          { value: "client", label: RenderName("client") },
          { value: "partner", label: RenderName("partner") },
        ]
      : [{ value: "client", label: RenderName("client") }];

  let InvestmentReturnsOptions = [
    { value: "system", label: "System" },
    { value: "input Override", label: "Input Override" },
  ];

  /* -------------------- TABLE COLUMNS -------------------- */
  const columns = useMemo(
    () => [
      {
        title: "Owner",
        dataIndex: "owner",
        type: "text",
        key: "owner",
        justText: true,
      },
      {
        title: "Balance & Components",
        placeholder: "Balance & Components",
        dataIndex: "balanceComponents",
        type: "number-toComma-Modal",
        innerModalTitle: "Balance & Components",
        key: "balanceComponents",
        func: handleInnerModal,
        disabled: true,
      },
      {
        title: "Risk Profile",
        placeholder: "Risk Profile",
        dataIndex: "riskProfile",
        type: "select",
        options: ["Conservative", "Balanced", "Growth", "High Growth"].map(
          (v) => ({ value: v, label: v })
        ),
      },
      {
        title: "Investment Returns",
        placeholder: "Investment Returns",
        dataIndex: "investmentReturns",
        type: "selectModal",
        options: InvestmentReturnsOptions,
        ModalOption: "input Override",
        innerModalTitle: "Input Override",
        key: "investmentReturns",
        func: handleInnerModal,
      },
      {
        title: "Investment Fees %",
        placeholder: "Investment Fees %",
        dataIndex: "investmentFees",
        type: "number-toPercent",
      },
      {
        title: "Adviser Service Fee ($)",
        placeholder: "Adviser Service Fee ($)",
        dataIndex: "adviserServiceFee",
        type: "number-toComma",
      },
      {
        title: "Insurance Premiums",
        dataIndex: "insurancePremiums",
        type: "yesnoModal",
        callBack: true,
        key: "insurancePremiums",
        innerModalTitle: "Insurance Premiums",
        func: handleInnerModal,
      },
      {
        title: "Rollover Funds",
        dataIndex: "rolloverFunds",
        type: "yesnoModal",
        callBack: true,
        key: "rolloverFunds",
        innerModalTitle: "Rollover Funds",
        func: handleInnerModal,
      },
      {
        title: "Concessional Contributions",
        dataIndex: "concessionalContributions",
        type: "yesnoModal",
        callBack: true,
        key: "concessionalContributions",
        innerModalTitle: "Concessional Contributions",
        func: handleInnerModal,
      },
      {
        title: "Non Concessional Contributions",
        dataIndex: "nonConcessionalContributions",
        type: "yesnoModal",
        callBack: true,
        key: "nonConcessionalContributions",
        innerModalTitle: "Non Concessional Contributions",
        func: handleInnerModal,
      },
      {
        title: "Withdrawals",
        dataIndex: "withdrawals",
        type: "yesnoModal",
        callBack: true,
        key: "withdrawals",
        innerModalTitle: "Withdrawals",
        func: handleInnerModal,
      },
    ],
    []
  );

  const componentMapping = {
    "Balance & Components": <BalanceComponents />,
    "Input Override": <InputOverride />,
    "Insurance Premiums": <InsurancePremiums />,
    "Rollover Funds": <RolloverFunds />,
    "Concessional Contributions": <ConcessionalContributions />,
    "Non Concessional Contributions": <NonConcessionalContributions />,
    Withdrawals: <Withdrawals />,
  };

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

          return result;
        }, [values.owner]);

        return (
          <Form>
            <InnerModal
              modalObject={modalObject}
              setFieldValue={setFieldValue}
              setFlagState={setFlagState}
              flagState={flagState}
            >
              {componentMapping[modalObject.title]}
            </InnerModal>

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
                  options={ownerOptions}
                />
              </div>
            </div>

            {values.owner?.length > 0 && (
              <div className="mt-4 All_Client reportSection">
                <AntDTableHOC
                  columns={columns}
                  data={tableData.filter((r) => values.owner.includes(r.key))}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  handleSubmit={props.handleOk}
                  isEditing={props.isEditing}
                  setIsEditing={props.setIsEditing}
                />
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default CFSuperFund;
