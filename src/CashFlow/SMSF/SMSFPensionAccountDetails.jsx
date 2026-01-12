import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
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

import Withdrawals from "../Financial Investments/Withdrawals";
import CFSMSFBalance from "./CFSMSFBalance";
import PensionPayments from "../Financial Investments/PensionPayments";
import NewPensionRollover from "../Financial Investments/NewPensionRollover";

const AntdTable = DynamicTableForInputsSection("antd");

const SMSFPensionAccountDetails = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  const CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);
  const DefaultUrl = useRecoilValue(defaultUrl);

  const [UserStatus] = useState(localStorage.getItem("UserStatus"));
  const objKey = props.modalObject.key;

  /* ---------------- Modal State ---------------- */
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  /* ---------------- Initial Values ---------------- */
  const initialValues = {
    owner: [],
  };

  /* ---------------- Fill Initial Values ---------------- */
  const fillInitialValues = (setFieldValue) => {
    const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));
    const SMSFPensionPhase =
      Object.keys(questionDetail.SMSFPensionPhase || {}).length > 0
        ? questionDetail.SMSFPensionPhase
        : { client: [], partner: [], joint: [] };

    const data = cashFlowData?.[objKey] || CashFlowScenarioDataObj?.[objKey];

    const updateFields = (dataObj, stake) => {
      if (!dataObj || Object.keys(dataObj).length === 0) return;

      const fields = {
        balanceRolloverAmount: dataObj.balanceRolloverAmount || "",
        balanceRolloverAmountObj: dataObj.balanceRolloverAmountObj || {},
        yearToCommence: dataObj.yearToCommence || "",
        pensionPayments: dataObj.pensionPayments || "",
        pensionPaymentsObj: dataObj.pensionPaymentsObj || {},
        newPensionRollover: dataObj.newPensionRollover || "No",
        newPensionRolloverObj: dataObj.newPensionRolloverObj || {},
        withdrawals: dataObj.withdrawals || "No",
        withdrawalsObj: dataObj.withdrawalsObj || {},
      };

      Object.entries(fields).forEach(([key, value]) => {
        setFieldValue(`${stake}.${key}`, value);
      });
    };

    if (
      scenarioObj?.selectedSource === "discoveryForm" &&
      !cashFlowData?.[objKey]?._id
    ) {
      // Set owner based on data availability
      const owners = [];
      if (SMSFPensionPhase?.client?.length > 0) owners.push("client");
      if (SMSFPensionPhase?.partner?.length > 0 && UserStatus === "Married") {
        owners.push("partner");
      }
      setFieldValue("owner", owners);

      // Update client fields
      if (SMSFPensionPhase?.client?.length > 0) {
        const clientData = SMSFPensionPhase.client[0];
        const pensionBenefits =
          clientData?.pensionBenefitsTotalArray?.[0] || {};
        const pensionBenefitsArray =
          pensionBenefits?.pensionBenefitsarray?.[0] || {};

        const clientObj = {
          balanceRolloverAmountObj: {
            pensionType: pensionBenefits?.pensionType?.trim() || "",
            commencePensionYear: cashFlowData?.cf_personalDetails?.client
              ?.retirementYear
              ? String(
                  parseFloat(
                    cashFlowData.cf_personalDetails.client.retirementYear
                  )
                )
              : "30",
            taxFreeComponent: pensionBenefitsArray?.taxFreeComponent || "",
          },
        };

        updateFields(clientObj, "client");
      }

      // Update partner fields
      if (SMSFPensionPhase?.partner?.length > 0 && UserStatus === "Married") {
        const partnerData = SMSFPensionPhase.partner[0];
        const pensionBenefits =
          partnerData?.pensionBenefitsTotalArray?.[0] || {};
        const pensionBenefitsArray =
          pensionBenefits?.pensionBenefitsarray?.[0] || {};

        const partnerObj = {
          balanceRolloverAmountObj: {
            pensionType: pensionBenefits?.pensionType?.trim() || "",
            commencePensionYear: cashFlowData?.cf_personalDetails?.partner
              ?.retirementYear
              ? String(
                  parseFloat(
                    cashFlowData.cf_personalDetails.partner.retirementYear
                  )
                )
              : "30",
            taxFreeComponent: pensionBenefitsArray?.taxFreeComponent || "",
          },
        };

        updateFields(partnerObj, "partner");
      }
    } else if (
      CashFlowScenarioDataObj?.[objKey] &&
      Object.keys(CashFlowScenarioDataObj?.[objKey]).length > 0
    ) {
      // Handle cash flow data scenario
      setFieldValue("owner", data.owner || []);

      if (data.owner?.includes("client") && data.client) {
        updateFields(data.client, "client");
      }

      if (
        UserStatus === "Married" &&
        data.owner?.includes("partner") &&
        data.partner
      ) {
        updateFields(data.partner, "partner");
      }
    } else if (
      cashFlowData?.[objKey] &&
      Object.keys(cashFlowData?.[objKey]).length > 0
    ) {
      // Handle cash flow data scenario
      setFieldValue("owner", data.owner || []);

      if (data.owner?.includes("client") && data.client) {
        updateFields(data.client, "client");
      }

      if (
        UserStatus === "Married" &&
        data.owner?.includes("partner") &&
        data.partner
      ) {
        updateFields(data.partner, "partner");
      }
    }
  };

  /* ---------------- Submit ---------------- */
  const onSubmit = async (values) => {
    const obj = {
      ...values,
      scenarioFK: JSON.parse(localStorage.getItem("ScenarioObj"))._id,
    };

    if (values.owner.includes("client")) {
      obj.clientTotal = values.client?.balanceRolloverAmount || "";
    } else {
      obj.clientTotal = "";
    }

    if (values.owner.includes("partner")) {
      obj.partnerTotal = values.partner?.balanceRolloverAmount || "";
    } else {
      obj.partnerTotal = "";
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
    setModalObject({
      title,
      values,
      key,
      stakeHolder,
      sourceObj: props.modalObject,
      cal: title !== "Withdrawals",
    });
    setFlagState(true);
  };

  /* ---------------- Component Mapping ---------------- */
  const componentMapping = {
    "Balance Rollover Amount": <CFSMSFBalance />,
    "Pension Payments": <PensionPayments />,
    "New Pension Rollover": <NewPensionRollover />,
    Withdrawals: <Withdrawals />,
  };

  /* ---------------- Year Options ---------------- */
  const yearsOptions = Array.from({ length: 30 }, (_, i) => ({
    value: (i + 1).toString(),
    label: ("Year " + (i + 1)).toString(),
  }));

  /* ---------------- Table Columns ---------------- */
  const columns = [
    { title: "Owner", dataIndex: "owner", type: "label", justText: true },
    {
      title: "Balance Rollover Amount",
      placeholder: "Balance Rollover Amount",
      dataIndex: "balanceRolloverAmount",
      type: "number-toComma-Modal",
      innerModalTitle: "Balance Rollover Amount",
      key: "balanceRolloverAmount",
      callBack: true,
      disabled: true,
      func: handleInnerModal,
    },
    {
      title: "Year to Commence",
      dataIndex: "yearToCommence",
      type: "select",
      options: yearsOptions,
      disabled: true,
    },
    {
      title: "Pension Payments",
      placeholder: "Pension Payments",
      dataIndex: "pensionPayments",
      type: "number-toComma-Modal",
      innerModalTitle: "Pension Payments",
      key: "pensionPayments",
      callBack: true,
      disabled: true,
      func: handleInnerModal,
    },
    {
      title: "New Pension Rollover",
      dataIndex: "newPensionRollover",
      type: "yesnoModal",
      innerModalTitle: "New Pension Rollover",
      key: "newPensionRollover",
      callBack: true,
      func: handleInnerModal,
    },
    {
      title: "Withdrawals",
      dataIndex: "withdrawals",
      type: "yesnoModal",
      innerModalTitle: "Withdrawals",
      key: "withdrawals",
      callBack: true,
      func: handleInnerModal,
    },
  ];

  /* ---------------- Owner Options ---------------- */
  const options =
    UserStatus !== "Single"
      ? [
          { value: "client", label: RenderName("client") },
          { value: "partner", label: RenderName("partner") },
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

        const rows = useMemo(() => {
          const rowsArray = [];

          if (values.owner?.includes("client") && values.client)
            rowsArray.push({
              key: "client",
              owner: RenderName("client"),
              stakeHolder: "client",
              ...values.client,
            });

          if (
            values.owner?.includes("partner") &&
            UserStatus === "Married" &&
            values.partner
          )
            rowsArray.push({
              key: "partner",
              owner: RenderName("partner"),
              stakeHolder: "partner",
              ...values.partner,
            });

          return rowsArray;
        }, [values, UserStatus]);

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

              <div className="col-md-12">
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <label className="mb-0">Owner</label>
                  <div style={{ minWidth: 220 }}>
                    <Field
                      name="owner"
                      component={AntdCreatableMultiSelect}
                      options={options}
                    />
                  </div>
                </div>
              </div>

              {values?.owner?.length > 0 && (
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

export default SMSFPensionAccountDetails;
