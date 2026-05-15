import React, { useEffect, useMemo, useState } from "react";
import { Form, Formik, Field } from "formik";
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
import RegularContributions from "./RegularContributions";

const AntDTableHOC = DynamicTableForInputsSection("antd");

const CashFlowMarginLoan = (props) => {
  /* -------------------- STATE -------------------- */
  const questionDetail = useRecoilValue(QuestionDetail);
  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  const cashFlowScenarioData = useRecoilValue(CashFlowScenarioData);

  const [userStatus] = useState(localStorage.getItem("UserStatus"));
  const [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key);

  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  const defaultURL = useRecoilValue(defaultUrl);

  /* -------------------- INITIAL VALUES -------------------- */
  const initialValues = {
    owner: [],
    client: {},
    partner: {},
    joint: {},
  };

  /* -------------------- PREFILL -------------------- */
  const fillInitialValues = (setFieldValue) => {
    setObjAndAPIKey(props.modalObject.key);

    const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));
    const managedFunds = questionDetail.managedFundsMarginLoan || {};

    const updateFields = (data, prefix) => {
      if (!data) return;
      Object.entries({
        yearOfLoan: data.yearOfLoan,
        currentLoanBalance: data.currentLoanBalance || data.loanBalance,
        loanTerm: data.loanTerm,
        initialInterestRate: data.initialInterestRate || data.interestRate,
        deductibleInterest:
          data.deductibleInterest || data.deductibleLoanAmount,
        monthlyContributions: data.monthlyContributions,
        monthlyContributionsObj: data.monthlyContributionsObj || {},
        repayLoanYear: data.repayLoanYear || "No",
      }).forEach(([k, v]) => {
        setFieldValue(`${prefix}.${k}`, v ?? "");
      });
    };

    const hydrate = (src) => {
      if (!src) return;
      setFieldValue("owner", src.owner || []);

      if (src.owner?.includes("client")) updateFields(src.client, "client");
      if (userStatus === "Married" && src.owner?.includes("partner"))
        updateFields(src.partner, "partner");
      if (userStatus === "Married" && src.owner?.includes("joint"))
        updateFields(src.joint, "joint");
    };

    if (
      scenarioObj?.selectedSource === "discoveryForm" &&
      managedFunds?._id &&
      !cashFlowData?.[objAndAPIKey]?._id
    ) {
      hydrate(managedFunds);
    } else if (cashFlowScenarioData?.[objAndAPIKey]?._id) {
      hydrate(cashFlowScenarioData?.[objAndAPIKey]);
    } else {
      hydrate(cashFlowData?.[objAndAPIKey]);
    }
  };

  /* -------------------- SUBMIT -------------------- */
  const onSubmit = async (values) => {
    const obj = {
      ...values,
      scenarioFK: JSON.parse(localStorage.getItem("ScenarioObj"))._id,
    };

    const jointBalance = values.owner.includes("joint")
      ? parseFloat(values.joint.currentLoanBalance?.replace(/[^0-9.-]+/g, ""))
      : 0;

    if (values.owner.includes("client")) {
      obj.clientTotal = toCommaAndDollar(
        parseFloat(
          values.client.currentLoanBalance?.replace(/[^0-9.-]+/g, "")
        ) +
          jointBalance / 2
      );
      if (values.client.monthlyContributions === "No") {
        obj.client.monthlyContributionsObj = {};
      }
    }

    if (values.owner.includes("partner")) {
      obj.partnerTotal = toCommaAndDollar(
        parseFloat(
          values.partner.currentLoanBalance?.replace(/[^0-9.-]+/g, "")
        ) +
          jointBalance / 2
      );
      if (values.partner.monthlyContributions === "No") {
        obj.partner.monthlyContributionsObj = {};
      }
    }

    try {
      const existing = cashFlowData?.[objAndAPIKey]?._id;

      const res = existing
        ? await PatchAxios(`${defaultURL}/api/CF/${objAndAPIKey}/Update`, obj)
        : await PostAxios(`${defaultURL}/api/CF/${objAndAPIKey}/Add`, obj);

      setCashFlowData({ ...cashFlowData, [objAndAPIKey]: res });

      openNotificationSuccess(
        "success",
        "topRight",
        "Success",
        `"${props.modalObject.title}" saved`
      );

      props.flagState && props.setFlagState(false);
      props?.setIsEditing?.(false);
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
  const loanYears = useMemo(
    () =>
      Array.from({ length: 31 }, (_, i) => ({
        value: i,
        label: `Year ${i}`,
      })),
    []
  );

  const loanYearsWithNo = [{ value: "No", label: "No" }, ...loanYears];
  const loanYearsWithExisting = [
    { value: "Existing", label: "Existing" },
    ...loanYears,
  ];

  const ownerOptions =
    userStatus !== "Single"
      ? ["client", "partner", "joint"].map((o) => ({
          value: o,
          label: RenderName(o),
        }))
      : [{ value: "client", label: RenderName("client") }];

  /* -------------------- INNER MODAL -------------------- */
  const handleInnerModal = (title, values, key, stakeHolder) => {
    console.log(stakeHolder);
    setModalObject({ title, values, key, stakeHolder });
    setFlagState(true);
  };

  const componentMapping = {
    "Monthly Contributions": <RegularContributions />,
  };

  /* -------------------- COLUMNS -------------------- */
  const columns = useMemo(
    () => [
      {
        title: "Owner",
        dataIndex: "owner",
        key: "owner",
      },
      {
        title: "Year of Loan",
        dataIndex: "yearOfLoan",
        type: "select",
        selectedOptionValue: true,
        options: loanYearsWithExisting,
      },
      {
        title: "Current Loan Balance",
        dataIndex: "currentLoanBalance",
        type: "number-toComma",
      },
      {
        title: "Loan Term",
        dataIndex: "loanTerm",
        type: "select",
        selectedOptionValue: true,
        options: loanYears,
      },
      {
        title: "Initial Interest Rate (p.a.)",
        dataIndex: "initialInterestRate",
        type: "number-toPercent",
      },
      {
        title: "Deductible Interest",
        dataIndex: "deductibleInterest",
        type: "number-toPercent",
      },
      {
        title: "Monthly Contributions",
        dataIndex: "monthlyContributions",
        key: "monthlyContributions",
        type: "yesnoModal",
        innerModalTitle: "Monthly Contributions",
        callBack: true,
        func: handleInnerModal,
      },
      {
        title: "Repay Loan in Year",
        dataIndex: "repayLoanYear",
        type: "select",
        selectedOptionValue: true,
        options: loanYearsWithNo,
      },
    ],
    [loanYears, loanYearsWithExisting, loanYearsWithNo]
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      innerRef={props.formRef}
      enableReinitialize
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        /* -------------------- ROWS -------------------- */

        const tableRows = useMemo(() => {
          const result = [];

          values.owner.map((item, index) => {
            result.push({
              key: item,
              owner: RenderName(item),
              stakeHolder: item,
              ...values?.[item],
            });
          });

          return result;
        }, [values.owner]);

        return (
          <Form>
            <InnerModal
              modalObject={modalObject}
              setFieldValue={setFieldValue}
              flagState={flagState}
              setFlagState={setFlagState}
            >
              {componentMapping[modalObject.title] || null}
            </InnerModal>

            <div className="d-flex justify-content-center align-items-center gap-2">
              <label
                onClick={() => {
                  console.log(values, tableRows);
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
            <div className="mt-3 All_Client reportSection">
              {values.owner.length > 0 && (
                <AntDTableHOC
                  columns={columns}
                  data={tableRows}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  handleSubmit={props.handleOk}
                  isEditing={props.isEditing}
                  setIsEditing={props.setIsEditing}
                />
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CashFlowMarginLoan;
