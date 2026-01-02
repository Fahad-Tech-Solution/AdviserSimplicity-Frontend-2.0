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
  PostAxiosBlob,
  RenderName,
  toCommaAndDollar,
} from "../../Components/Assets/Api/Api";

import {
  CashFlowData,
  CashFlowDownloading,
  CashFlowReCalculateLoading,
  CashFlowScenarioData,
  defaultUrl,
  QuestionDetail,
} from "../../Store/Store";

const AntDTableHOC = DynamicTableForInputsSection("antd");

const CashFlowInvestmentLoansLOC = (props) => {
  /* -------------------- STATE -------------------- */
  const questionDetail = useRecoilValue(QuestionDetail);
  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  const cashFlowScenarioData = useRecoilValue(CashFlowScenarioData);

  const [userStatus] = useState(localStorage.getItem("UserStatus"));
  const [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key);

  const defaultURL = useRecoilValue(defaultUrl);

  const [, setRecalculateLoading] = useRecoilState(CashFlowReCalculateLoading);
  const [, setDownloading] = useRecoilState(CashFlowDownloading);

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
    const managedFundsLOC = questionDetail.managedFundsLOC || {};

    const updateFields = (data, prefix) => {
      if (!data) return;
      Object.entries(data).forEach(([k, v]) => {
        setFieldValue(`${prefix}.${k}`, v || "");
      });
    };

    if (
      scenarioObj?.selectedSource === "discoveryForm" &&
      managedFundsLOC?._id
    ) {
      setFieldValue("owner", managedFundsLOC.owner || []);

      if (managedFundsLOC.owner?.includes("client"))
        updateFields(managedFundsLOC.client, "client");

      if (
        userStatus === "Married" &&
        managedFundsLOC.owner?.includes("partner")
      )
        updateFields(managedFundsLOC.partner, "partner");
    } else {
      const cfData =
        cashFlowScenarioData?.[objAndAPIKey] || cashFlowData?.[objAndAPIKey];

      if (cfData) {
        setFieldValue("owner", cfData.owner || []);

        if (cfData.owner.includes("client"))
          updateFields(cfData.client, "client");

        if (userStatus === "Married" && cfData.owner.includes("partner"))
          updateFields(cfData.partner, "partner");

        if (userStatus === "Married" && cfData.owner.includes("joint"))
          updateFields(cfData.joint, "joint");
      }
    }
  };

  /* -------------------- SUBMIT -------------------- */
  const onSubmit = async (values) => {
    const obj = {
      ...values,
      scenarioFK: JSON.parse(localStorage.getItem("ScenarioObj"))._id,
    };

    const jointRepayment = values.owner.includes("joint")
      ? parseFloat(
          values.joint?.actualAnnualRepayments?.replace(/[^0-9.-]+/g, "")
        )
      : 0;

    obj.clientTotal = values.owner.includes("client")
      ? toCommaAndDollar(
          parseFloat(
            values.client?.actualAnnualRepayments?.replace(/[^0-9.-]+/g, "")
          ) +
            jointRepayment / 2
        )
      : "";

    obj.partnerTotal = values.owner.includes("partner")
      ? toCommaAndDollar(
          parseFloat(
            values.partner?.actualAnnualRepayments?.replace(/[^0-9.-]+/g, "")
          ) +
            jointRepayment / 2
        )
      : "";

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
        `"${props.modalObject.title}" saved successfully`
      );

      props.flagState && props.setFlagState(false);
    } catch {
      openNotificationSuccess(
        "error",
        "topRight",
        "Error",
        `"${props.modalObject.title}" could not be saved`
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

  /* -------------------- COLUMNS -------------------- */
  const columns = useMemo(
    () => [
      {
        title: "Year of Loan",
        dataIndex: "yearOfLoan",
        type: "select",
        selectOptionValue: true,
        options: loanYearsWithExisting,
      },
      {
        title: "Current Loan Balance",
        placeholder: "Current Loan Balance",
        dataIndex: "currentLoanBalance",
        type: "number-toComma",
      },
      {
        title: "Loan Type",
        dataIndex: "loanType",
        type: "select",
        selectOptionValue: true,
        options: [
          { value: "I/Only", label: "I/Only" },
          { value: "P & I", label: "P & I" },
        ],
      },
      {
        title: "Loan Term",
        dataIndex: "loanTerm",
        type: "select",
        selectOptionValue: true,
        options: loanYears,
      },
      {
        title: "Interest Only Period",
        dataIndex: "interestOnlyPeriod",
        type: "select",
        options: loanYears,
        selectOptionValue: true,
      },
      {
        title: "Initial Interest Rate (p.a.)",
        placeholder: "Initial Interest Rate (p.a.)",
        dataIndex: "initialInterestRate",
        type: "number-toPercent",
      },
      {
        title: "Deductible Interest",
        placeholder: "Deductible Interest",
        dataIndex: "deductibleInterest",
        type: "number-toPercent",
      },
      {
        title: "Minimum Repayments (p.a)",
        placeholder: "Minimum Repayments (p.a)",
        dataIndex: "minimumRepayments",
        type: "number-toComma",
        disabled: true,
      },
      {
        title: "Apply Minimum Repayments OR",
        dataIndex: "applyMinimumRepaymentsOR",
        type: "yesno",
      },
      {
        title: "Actual Annual Repayments",
        placeholder: "Actual Annual Repayments",
        dataIndex: "actualAnnualRepayments",
        type: "number-toComma",
      },
      {
        title: "Repay Loan in Year",
        dataIndex: "repayLoanYear",
        type: "select",
        options: loanYearsWithNo,
        selectOptionValue: true,
      },
    ],
    [loanYears, loanYearsWithNo, loanYearsWithExisting]
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
              key: "item",
              owner: RenderName("item"),
              stakeHolder: "item",
              ...values?.[item],
            });
          });

          return result;
        }, [values.owner]);

        return (
          <Form>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <label>Owner</label>
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

            {/* Hidden buttons */}
            <button
              ref={props.childButtonRef}
              onClick={() => props.handleRecalculate?.(values, setFieldValue)}
              type="button"
              hidden
            />
            <button
              ref={props.childButtonDownloadRef}
              onClick={() => props.handleDownload?.(values, setFieldValue)}
              type="button"
              hidden
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default CashFlowInvestmentLoansLOC;
