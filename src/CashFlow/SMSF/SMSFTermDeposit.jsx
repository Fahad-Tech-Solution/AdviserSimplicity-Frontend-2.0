import React, { useEffect, useMemo, useState } from "react";
import { Form, Formik } from "formik";
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

import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const SMSFTermDeposit = (props) => {
  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  const CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);
  const questionDetail = useRecoilValue(QuestionDetail);
  const DefaultUrl = useRecoilValue(defaultUrl);

  const [UserStatus] = useState(localStorage.getItem("UserStatus") || "Single");
  const [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

  const [layoutSwitchFlag] = useState(props.modalObject.title === "SMSF Term Deposit");

  const SMSFTermData =
    Object.keys(questionDetail[props.modalObject.sourceKey] || {}).length > 0
      ? questionDetail[props.modalObject.sourceKey]
      : {
          client: [],
          joint: [],
          partner: [],
        };

  const initialValues = {
    client: {},
  };

  const fillInitialValues = (setFieldValue) => {
    try {
      setObjAndAPIKey(props.modalObject.key);

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      const updateFields = (data, prefix) => {
        if (!data || !Object.keys(data).length) return;

        Object.entries({
          openingBalance: data.openingBalance || "$0",
          investmentReturns: data.investmentReturns || "System",
          incomeYield: data.incomeYield || "",
          reinvestIncome: data.reinvestIncome || "No",
          reinvestUpUntil: data.reinvestUpUntil || "No",
          riskProfile: data.riskProfile || "Cash",
          cashOutYear: data.cashOutYear || "No",
        }).forEach(([key, value]) => {
          setFieldValue(`${prefix}.${key}`, value);
        });
      };

      const hydrate = (src) => {
        if (!src?.client) return;

        updateFields(src.client, "client");
      };

      // 1️⃣ Discovery Form (only if CF not already saved)
      if (
        scenarioObj?.selectedSource === "discoveryForm" &&
        SMSFTermData?.client?.length > 0 &&
        !cashFlowData?.[objAndAPIKey]?._id
      ) {
        const transformedData = {
          client: {
            openingBalance: SMSFTermData.clientCurrentBalance || "",
            investmentReturns: "System",
            incomeYield: "",
            reinvestIncome: "No",
            reinvestUpUntil: "No",
            riskProfile: "Cash",
            cashOutYear: "No",
          },
        };
        hydrate(transformedData);
      }
      // 2️⃣ Cash Flow Scenario
      else if (CashFlowScenarioDataObj?.[objAndAPIKey]?._id) {
        hydrate(CashFlowScenarioDataObj[objAndAPIKey]);
      }
      // 3️⃣ Cash Flow Data (final fallback)
      else {
        hydrate(cashFlowData?.[objAndAPIKey]);
      }
    } catch (error) {
      console.error("Error in fillInitialValues:", error);
    }
  };

  const onSubmit = async (values) => {
    console.log("Values:", JSON.stringify(values));

    const obj = {
      ...values,
      scenarioFK: JSON.parse(localStorage.getItem("ScenarioObj"))._id,
      clientTotal: toCommaAndDollar(
        parseFloat(values.client.openingBalance?.replace(/[^0-9.-]+/g, "") || 0)
      ),
    };

    try {
      const exists = cashFlowData?.[objAndAPIKey]?._id;
      const res = exists
        ? await PatchAxios(`${DefaultUrl}/api/CF/${objAndAPIKey}/Update`, obj)
        : await PostAxios(`${DefaultUrl}/api/CF/${objAndAPIKey}/Add`, obj);

      if (res) {
        setCashFlowData({
          ...cashFlowData,
          [objAndAPIKey]: res,
        });
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success",
        `Data of "${props.modalObject.title}" is Saved`
      );

      props.setFlagState?.(false);
      props?.setIsEditing?.(false);
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

  const loanTermOptionsWithZero = Array.from({ length: 31 }, (_, i) => ({
    value: i.toString(),
    label: ("Year " + i).toString(),
  }));

  const InvestmentReturnsOptions = [
    { value: "System", label: "System" },
    { value: "Input Override", label: "Input Override" },
  ];

  const RiskProfileOptions = [
    { value: "Cash", label: "Cash" },
    { value: "Australian Shares", label: "Australian Shares" },
  ];

  const handleInvestmentReturnsChange = (values, setFieldValue, thisInput, stakeHolder) => {
    const isDisabled = thisInput.value === "" || thisInput.value === "System";
    if (isDisabled) {
      setFieldValue(`${stakeHolder}incomeYield`, "");
    }
  };

  const columns = [
    {
      title: "Owner",
      dataIndex: "owner",
      type: "label",
      justText: true,
    },
    {
      title: "Opening Balance",
      dataIndex: "openingBalance",
      type: "number-toComma",
      placeholder: "Opening Balance",
    },
    {
      title: "Investment Returns",
      dataIndex: "investmentReturns",
      type: "select",
      placeholder: "Investment Returns",
      selectedOptionValue: true,
      options: InvestmentReturnsOptions,
      callBack: true,
      func: handleInvestmentReturnsChange,
    },
    {
      title: "Income Yield",
      dataIndex: "incomeYield",
      type: "number-toPercent",
      placeholder: "Income Yield",
      disabled: (values, stakeHolder) => {
        if (values.client?.investmentReturns !== "Input Override") {
          return true;
        }
        return false;
      },
    },
    {
      title: "Reinvest income",
      dataIndex: "reinvestIncome",
      type: "yesno",
      width: 100,
    },
    {
      title: "Reinvest Up Until",
      dataIndex: "reinvestUpUntil",
      type: "select",
      placeholder: "Reinvest Up Until",
      selectedOptionValue: true,
      options: loanTermOptionsWithZero,
    },
    {
      title: "Risk Profile/SAA",
      dataIndex: "riskProfile",
      type: "select",
      placeholder: "Risk Profile/SAA",
      selectedOptionValue: true,
      options: RiskProfileOptions,
    },
    {
      title: "Cashout in Year",
      dataIndex: "cashOutYear",
      type: "select",
      placeholder: "Cashout in Year",
      selectedOptionValue: true,
      options: loanTermOptionsWithZero,
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

        const rows = useMemo(() => {
          const result = [];
          
          // Always include client row
          result.push({
            key: "client",
            owner: RenderName("client"),
            stakeHolder: "client",
            ...values.client,
          });

          return result;
        }, [values.client]);

        return (
          <Form>
            <Row>
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
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SMSFTermDeposit;