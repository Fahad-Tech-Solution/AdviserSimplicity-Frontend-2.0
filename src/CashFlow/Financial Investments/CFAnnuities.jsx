import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form } from "formik";
import { ConfigProvider, Select, Table } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";

import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";
import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import InputOverride from "./InputOverride";
import RegularContributions from "./RegularContributions";
import RCV from "./RCV";
import DeductibleAmount from "./DeductibleAmount";

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

const CFAnnuities = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);
  const DefaultUrl = useRecoilValue(defaultUrl);
  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);

  const [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});
  const [UserStatus] = useState(localStorage.getItem("UserStatus") || "Single");

  let annuitiesIssues =
    Object.keys(questionDetail.annuitiesIssues || {}).length > 0
      ? questionDetail.annuitiesIssues
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
          [`originalInvestmentAmount`]: data.originalInvestmentAmount || "",
          [`sourceOfFunds`]: data.sourceOfFunds || data.sourceFunds || "",
          [`annuityType`]: data.annuityType || "",
          [`IsThisReversionaryAnnuity`]: data.IsThisReversionaryAnnuity || "No",
          [`RCV`]: data.RCV || "No",
          [`RCVObj`]: data.RCVObj || {},
          [`includeFromYear`]: data.includeFromYear || "1",
          [`term`]: data.term || 30,
          [`yearsUntilMaturity`]: data.yearsUntilMaturity || "30",
          [`annualInflationRate`]: data.annualInflationRate || "",
          [`annualPayment`]: data.annualPayment || "",
          [`deductibleAmount`]: data.deductibleAmount || "No",
          [`deductibleAmountObj`]: data.deductibleAmountObj || {},
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
        annuitiesIssues?._id &&
        !cashFlowData?.[objAndAPIKey]?._id
      ) {
        if (inputType === "client" && annuitiesIssues.client.length > 0) {
          const transformedData = {
            [inputType]: annuitiesIssues.client.map((clientData, index) => ({
              originalInvestmentAmount:
                clientData.originalInvestmentAmount || "",
              sourceOfFunds: clientData.sourceOfFunds || "",
              annuityType: clientData.annuityType || "",
              IsThisReversionaryAnnuity:
                clientData.IsThisReversionaryAnnuity || "No",
              RCV: "No",
              RCVObj: {},
              includeFromYear: clientData.includeFromYear || "1",
              term: clientData.term || 30,
              yearsUntilMaturity: clientData.yearsUntilMaturity || "30",
              annualInflationRate: clientData.annualInflationRate || "",
              annualPayment: clientData.annualPayment || "",
              deductibleAmount: "No",
              deductibleAmountObj: {},
            })),
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
      cal: true,
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
        RCVObj: e.RCV === "Yes" ? e.RCVObj || {} : {},
        deductibleAmountObj:
          e.deductibleAmount === "Yes" ? e.deductibleAmountObj || {} : {},
      })),

      numberOfProperties: entries.length,
      scenarioFK: scenarioObj?._id,

      // Sum of annual payments
      [`${inputType}Total`]: toCommaAndDollar(
        entries.reduce((t, e) => t + sanitizeNumber(e.annualPayment), 0)
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
  const sourceOfFundsOptions = [
    { value: "Ordinary", label: "Ordinary" },
    { value: "Super", label: "Super" },
  ];

  const annuityTypeOptions = [
    { value: "Short-Term", label: "Short-Term" },
    { value: "Long-Term", label: "Long-Term" },
    { value: "Life-Time", label: "Life-Time" },
  ];

  const indexation = Array.from({ length: 21 }, (_, i) => ({
    value: (i * 0.5).toFixed(2) + "%",
    label: (i * 0.5).toFixed(2) + "%",
  }));

  const yearsIncludedArray = Array.from({ length: 31 }, (_, i) => ({
    value: i.toString(),
    label: ("Year " + i).toString(),
  }));

  const yearsIncludedArrayWithExisting = Array.from({ length: 32 }, (_, i) => {
    if (i === 0) {
      return {
        value: "Existing",
        label: "Existing",
      };
    }
    return {
      value: (i - 1).toString(),
      label: ("Year " + (i - 1)).toString(),
    };
  });

  const columns = [
    { title: "No#", dataIndex: "owner", key: "owner", width: 60 },
    {
      title: "Original Investment Amount",
      dataIndex: "originalInvestmentAmount",
      placeholder: "Original Investment Amount",
      type: "number-toComma",
    },
    {
      title: "Source of Funds",
      dataIndex: "sourceOfFunds",
      placeholder: "Source of Funds",
      type: "select",
      selectedOptionValue: true,
      options: sourceOfFundsOptions,
    },
    {
      title: "Annuity Type",
      dataIndex: "annuityType",
      placeholder: "Annuity Type",
      type: "select",
      selectedOptionValue: true,
      options: annuityTypeOptions,
    },
    {
      title: "Is this a Reversionary Annuity",
      dataIndex: "IsThisReversionaryAnnuity",
      placeholder: "Is this a Reversionary Annuity",
      type: "yesno",
      width: 100,
    },
    {
      title: "RCV",
      dataIndex: "RCV",
      placeholder: "RCV",
      type: "yesnoModal",
      key: "RCV",
      innerModalTitle: "RCV",
      callBack: true,
      func: handleInnerModal,
    },
    {
      title: "Include From Year",
      dataIndex: "includeFromYear",
      placeholder: "Include From Year",
      type: "select",
      selectedOptionValue: true,
      options: yearsIncludedArrayWithExisting,
    },
    {
      title: "Term",
      dataIndex: "term",
      placeholder: "Term",
      type: "select",
      selectedOptionValue: true,
      options: yearsIncludedArray,
    },
    {
      title: "Years Until Maturity",
      dataIndex: "yearsUntilMaturity",
      placeholder: "Years Until Maturity",
      type: "select",
      selectedOptionValue: true,
      options: yearsIncludedArray,
    },
    {
      title: "Annual Inflation Rate",
      dataIndex: "annualInflationRate",
      placeholder: "Annual Inflation Rate",
      type: "select",
      selectedOptionValue: true,
      options: indexation,
    },
    {
      title: "Annual Payment",
      dataIndex: "annualPayment",
      placeholder: "Annual Payment",
      type: "number-toComma",
    },
    {
      title: "Deductible Amount",
      dataIndex: "deductibleAmount",
      placeholder: "Deductible Amount",
      type: "yesnoModal",
      key: "deductibleAmount",
      innerModalTitle: "Deductible Amount",
      callBack: true,
      func: handleInnerModal,
    },
  ];

  const componentMapping = {
    // "Input Override": <InputOverride />,
    // "Regular Contributions": <RegularContributions />,
    RCV: <RCV />,
    "Deductible Amount": <DeductibleAmount />,
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
                Number of Annuities does {RenderName(props.modalObject.Input)}{" "}
                have:
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

export default CFAnnuities;
