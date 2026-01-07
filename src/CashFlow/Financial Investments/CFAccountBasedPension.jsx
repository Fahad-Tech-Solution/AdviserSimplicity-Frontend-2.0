import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form } from "formik";
import { ConfigProvider, Select, Table } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";

import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";
import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import BalanceRolloverAmount from "./BalanceRolloverAmount";
import AccountBasedInputOverride from "./accountBasedPension/AccountBasedInputOverride";
import AccounntBasedWithdrawals from "./accountBasedPension/AccounntBasedWithdrawals";
import AccountBasedNewPensionRollover from "./accountBasedPension/AccountBasedNewPensionRollover";
import AccountBasedPensionPayments from "./accountBasedPension/AccountBasedPensionPayments";

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

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const CFAccountBasedPension = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);
  const DefaultUrl = useRecoilValue(defaultUrl);
  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);

  const [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});
  const [UserStatus] = useState(localStorage.getItem("UserStatus") || "Single");

  let accountBasedPensionIssues =
    Object.keys(questionDetail.accountBasedPensionIssues || {}).length > 0
      ? questionDetail.accountBasedPensionIssues
      : {
          client: [],
          partner: [],
          joint: [],
        };

  const initialValues = {
    numberOfProperties: "",
    client: [],
  };

  /* ------------------ Fill Initial Values ------------------ */
  const fillInitialValues = (setFieldValue) => {
    try {
      setObjAndAPIKey(props.modalObject.key);

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      const updateFields = (data, index) => {
        if (!data) return;

        Object.entries({
          [`balanceRolloverAmount`]: data.balanceRolloverAmount || "",
          [`balanceRolloverAmountObj`]: data.balanceRolloverAmountObj || {},
          [`yearToCommence`]: data.yearToCommence || "",
          [`riskProfile`]: data.riskProfile || "",
          [`investmentReturns`]: data.investmentReturns || "",
          [`investmentReturnsObj`]: data.investmentReturnsObj || {},
          [`investmentFees`]: data.investmentFees || "",
          [`adviserServiceFee`]: data.adviserServiceFee || "",
          [`pensionPayments`]: data.pensionPayments || "",
          [`pensionPaymentsObj`]: data.pensionPaymentsObj || {},
          [`newPensionRollover`]: data.newPensionRollover || "",
          [`newPensionRolloverObj`]: data.newPensionRolloverObj || {},
          [`withdrawals`]: data.withdrawals || "",
          [`withdrawalsObj`]: data.withdrawalsObj || {},
        }).forEach(([key, value]) => {
          setFieldValue(`client[${index}].` + key, value);
        });
      };

      const hydrate = (src, inputType) => {
        if (!src?.[inputType]?.length) return;

        setFieldValue("numberOfProperties", src[inputType].length);

        src[inputType].forEach((data, index) => {
          updateFields(data, index);
        });
      };

      const inputType = props.modalObject.Input || "client";

      // 1️⃣ Discovery Form (only if CF not already saved)
      if (
        scenarioObj?.selectedSource === "discoveryForm" &&
        accountBasedPensionIssues?._id &&
        !cashFlowData?.[objAndAPIKey]?._id
      ) {
        // Transform discovery form data to match table structure
        if (
          inputType === "client" &&
          accountBasedPensionIssues.client.length > 0
        ) {
          const transformedData = {
            [inputType]: accountBasedPensionIssues.client.map(
              (clientData, index) => ({
                balanceRolloverAmount:
                  accountBasedPensionIssues.clientCurrentBalance,
                balanceRolloverAmountObj: {
                  costBaseExisting:
                    accountBasedPensionIssues.clientCurrentBalance,
                },
                yearToCommence: clientData.yearsMaturity || "",
                riskProfile: "",
                investmentReturns: "",
                investmentFees: "",
                adviserServiceFee: "",
                pensionPayments: "",
                newPensionRollover: "No",
                withdrawals: "No",
              })
            ),
          };
          hydrate(transformedData, inputType);
        }
      }
      // 2️⃣ Cash Flow Scenario
      else if (CashFlowScenarioDataObj?.[objAndAPIKey]?._id) {
        hydrate(CashFlowScenarioDataObj[objAndAPIKey], inputType);
      }
      // 3️⃣ Cash Flow Data (final fallback)
      else {
        hydrate(cashFlowData?.[objAndAPIKey], inputType);
      }
    } catch (error) {
      console.error("Error in fillInitialValues:", error);
    }
  };

  /* ------------------ Inner Modal ------------------ */
  const handleInnerModal = (title, values, key, stakeHolder) => {
    setModalObject({
      title,
      values,
      key,
      stakeHolder,
      ParentObject: props.modalObject,
      cal: title !== "Withdrawals" && title !== "Input Override",
    });
    setFlagState(true);
  };

  /* ------------------ Submit ------------------ */
  const onSubmit = async (values) => {
    const entries = values.client || [];
    const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

    const sanitizeNumber = (val) =>
      parseFloat(String(val || "").replace(/[^0-9.-]+/g, "")) || 0;

    const inputType = props.modalObject.Input || "client";
    const otherType = inputType === "client" ? "partner" : "client";

    const obj = {
      [inputType]: entries.map((e) => ({
        ...e,
        // Ensure modal objects are normalized
        balanceRolloverAmountObj: e.balanceRolloverAmountObj || {
          costBaseExisting: e.balanceRolloverAmount || "",
        },
        investmentReturnsObj:
          e.investmentReturns === "Input Override"
            ? e.investmentReturnsObj || {}
            : {},
        pensionPaymentsObj: e.pensionPayments ? e.pensionPaymentsObj || {} : {},
        newPensionRolloverObj:
          e.newPensionRollover === "Yes" ? e.newPensionRolloverObj || {} : {},
        withdrawalsObj: e.withdrawals === "Yes" ? e.withdrawalsObj || {} : {},
      })),

      numberOfProperties: entries.length,
      scenarioFK: scenarioObj?._id,

      // Sum of adviser service fees
      [`${inputType}Total`]: toCommaAndDollar(
        entries.reduce((t, e) => t + sanitizeNumber(e.adviserServiceFee), 0)
      ),
    };

    // Preserve other stakeholder's data if it exists
    if (cashFlowData?.[objAndAPIKey]?._id) {
      const existingData = cashFlowData[objAndAPIKey];
      if (existingData[otherType]) {
        obj[otherType] = existingData[otherType];
        obj[`${otherType}Total`] = existingData[`${otherType}Total`] || "$0";
      }
    }

    try {
      let res;
      if (!cashFlowData?.[objAndAPIKey]?._id) {
        res = await PostAxios(`${DefaultUrl}/api/CF/${objAndAPIKey}/Add`, obj);
      } else {
        res = await PatchAxios(
          `${DefaultUrl}/api/CF/${objAndAPIKey}/Update`,
          obj
        );
      }

      if (res) {
        setCashFlowData({ ...cashFlowData, [objAndAPIKey]: res });
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success",
        `Data of "${props.modalObject.title}" is Saved`
      );

      props.setFlagState?.(false);
      props.setIsEditing?.(!props.isEditing);
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error",
        `Data of "${props.modalObject.title}" is not Saved. Please try again.`
      );
    }
  };

  /* ------------------ Columns ------------------ */
  const yearOptionsWithExisting = Array.from({ length: 31 }, (_, i) =>
    i === 0
      ? { value: "Existing", label: "Existing" }
      : { value: i, label: `Year ${i}` }
  );

  const riskProfileOptions = [
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

  const InvestmentReturnsOptions = [
    { value: "System", label: "System" },
    { value: "Input Override", label: "Input Override" },
  ];

  const columns = [
    { title: "No#", dataIndex: "owner", key: "owner", width: 60 },
    {
      title: "Balance & Rollover Amount",
      dataIndex: "balanceRolloverAmount",
      placeholder: "Balance & Rollover Amount",
      type: "number-toComma-Modal",
      key: "balanceRolloverAmount",
      innerModalTitle: "Balance & Rollover Amount",
      callBack: true,
      func: handleInnerModal,
      disabled: true,
    },
    {
      title: "Year to Commence",
      dataIndex: "yearToCommence",
      placeholder: "Year to Commence",
      type: "select",
      selectedOptionValue: true,
      options: yearOptionsWithExisting,
    },
    {
      title: "Risk Profile",
      dataIndex: "riskProfile",
      placeholder: "Risk Profile",
      type: "select",
      selectedOptionValue: true,
      options: riskProfileOptions,
    },
    {
      title: "Investment Returns",
      dataIndex: "investmentReturns",
      placeholder: "Investment Returns",
      type: "selectModal",
      options: InvestmentReturnsOptions,
      ModalOption: "Input Override",
      callBack: true,
      func: handleInnerModal,
      innerModalTitle: "Input Override",
      key: "investmentReturns",
    },
    {
      title: "Investment Fees %",
      dataIndex: "investmentFees",
      placeholder: "Investment Fees %",
      type: "number-toPercent",
    },
    {
      title: "Adviser Service Fee ($)",
      dataIndex: "adviserServiceFee",
      placeholder: "Adviser Service Fee ($)",
      type: "number-toComma",
    },
    {
      title: "Pension Payments",
      dataIndex: "pensionPayments",
      placeholder: "Pension Payments",
      type: "number-toComma-Modal",
      key: "pensionPayments",
      innerModalTitle: "Pension Payments",
      func: handleInnerModal,
      callBack: true,
      disabled: true,
    },
    {
      title: "New Pension Rollover",
      dataIndex: "newPensionRollover",
      placeholder: "New Pension Rollover",
      type: "yesnoModal",
      key: "newPensionRollover",
      innerModalTitle: "New Pension Rollover",
      callBack: true,
      func: handleInnerModal,
    },
    {
      title: "Withdrawals",
      dataIndex: "withdrawals",
      placeholder: "Withdrawals",
      type: "yesnoModal",
      key: "withdrawals",
      innerModalTitle: "Withdrawals",
      callBack: true,
      func: handleInnerModal,
    },
  ];

  const componentMapping = {
    "Input Override": <AccountBasedInputOverride />,
    "Balance & Rollover Amount": <BalanceRolloverAmount />,
    Withdrawals: <AccounntBasedWithdrawals />,
    "New Pension Rollover": <AccountBasedNewPensionRollover />,
    "Pension Payments": <AccountBasedPensionPayments />,
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        const rows = useMemo(() => {
          const count = Number(values.numberOfProperties) || 0;
          return Array.from({ length: count }, (_, i) => ({
            key: `client.${i}`,
            owner: i + 1,
            stakeHolder: `client[${i}]`,
            ...values.client?.[i],
            balanceRolloverAmountObj:
              values.client?.[i]?.balanceRolloverAmountObj?.costBaseExisting ||
              "no data Found",
          }));
        }, [values.numberOfProperties, values.client]);

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

            <div className="d-flex justify-content-center align-items-center gap-4">
              <label
                onClick={() => {
                  console.log(values);
                }}
              >
                Number of Account Based Pension does{" "}
                {RenderName(props.modalObject.Input)} have:
              </label>
              <ConfigProvider>
                <Select
                  size="large"
                  style={{ minWidth: 80 }}
                  value={values.numberOfProperties || undefined}
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  onChange={(v) => {
                    const capped = v > 10 ? 10 : v;
                    setFieldValue("numberOfProperties", capped);
                  }}
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((v) => (
                    <Option key={v} value={v}>
                      {v}
                    </Option>
                  ))}
                </Select>
              </ConfigProvider>
            </div>

            {values.numberOfProperties > 0 && (
              <div className="mt-4 All_Client reportSection">
                <AntdTable
                  columns={columns}
                  data={rows}
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

            <button
              ref={props.childButtonRef}
              type="button"
              style={{ display: "none" }}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default CFAccountBasedPension;
