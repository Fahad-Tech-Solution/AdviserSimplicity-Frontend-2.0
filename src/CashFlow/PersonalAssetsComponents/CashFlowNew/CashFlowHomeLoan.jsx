import { Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import InnerModal from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import CashFlowLoanBelanceLVR from "./CashFlowLoanBelanceLVR";
import DynamicTableForInputsSection from "../../../Components/Assets/Table/DynamicTableForInputsSection";

import {
  CashFlowData,
  CashFlowDownloading,
  CashFlowReCalculateLoading,
  defaultUrl,
} from "../../../Store/Store";

import {
  createStructuredEntries,
  openNotificationSuccess,
  PostAxios,
  PostAxiosBlob,
  RenderName,
} from "../../../Components/Assets/Api/Api";

const AntDTableHOC = DynamicTableForInputsSection("antd");

const CashFlowHomeLoan = (props) => {
  /*
     This component is a dynamic and reusable modal component designed to handle the following modal types:
     1. "Home Loan"  inner Modal
     2. "Financial Investment/Investment Loan/Loan Balance" inner Modal
     3. "SMSF/Investment property/Loan Balance" inner Modal
     4. "Family trust Investment property/Loan Balance" inner Modal
 
     TODO-IMPORTANT:
     - Ensure any changes to this component are planned carefully to avoid unintended effects on all supported modals.
     - If specific modifications are required for one modal type, consider implementing targeted logic or extensions 
       to maintain the integrity of the shared functionality.
 */

  const DefaultUrl = useRecoilValue(defaultUrl);
  const cashFlowData = useRecoilValue(CashFlowData);

  const [, setCashFlowReCalculateLoading] = useRecoilState(
    CashFlowReCalculateLoading
  );
  const [, setCashFlowDownloading] = useRecoilState(CashFlowDownloading);

  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});
  const [addInputFlag, setAddInputFlag] = useState(false);
  const [clientPartnerPer, setClientPartnerPer] = useState(false);

  /* -------------------- INITIAL VALUES -------------------- */
  const initialValues = {
    loanBalance: "",
    loanBalanceCashFlowLoanBelanceLVR: {},
    loanType: "",
    loanTerm: "30",
    interestOnlyPeriod: "",
    initialInterestRatePA: "",
    minimumRepaymentsPA: "",
    applyMinimumRepaymentsOR: "No",
    actualAnnualRepayments: "",
    repayLoanInYear: "No",
    surplusToHomeLoan: "No",
    deductibleInterest: "100%",
  };

  /* -------------------- FLAGS -------------------- */
  const deductibleInterestForms = [
    "SMSF Investment Properties",
    "Investments Property",
    "Family Trust Investment Properties",
  ];

  const clientPartnerPerForms = [
    "SMSF Investment Properties",
    "Family Trust Investment Properties",
  ];

  /* -------------------- PREFILL -------------------- */
  const fillInitialValues = (setFieldValue) => {
    const index = parseFloat(
      props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
    );

    let BaseKey = props.modalObject.stakeHolder.split(".").map((item, idx) => {
      return item.replace(/[^a-zA-Z]+/g, "");
    });

    const parentTitle = props.modalObject.ParentObject.title;

    setAddInputFlag(deductibleInterestForms.includes(parentTitle));
    setClientPartnerPer(clientPartnerPerForms.includes(parentTitle));

    // const data = props.modalObject.values?.[props.modalObject.key];
    const data =
      props.modalObject.values?.[BaseKey[0]]?.[index]?.[props.modalObject.key];

    console.log(data);

    if (!data) return;

    setFieldValue("loanBalance", data.loanBalance || data.LoanBalance || "");
    setFieldValue(
      "loanBalanceCashFlowLoanBelanceLVR",
      data.loanBalanceCashFlowLoanBelanceLVR || {
        loanAmount: data.loanBalance || "",
      }
    );
    setFieldValue("loanType", data.loanType || "");
    setFieldValue("loanTerm", data.loanTerm || "30");
    setFieldValue("interestOnlyPeriod", data.interestOnlyPeriod || "");
    setFieldValue(
      "initialInterestRatePA",
      data.initialInterestRatePA || data.interestRatePA || ""
    );
    setFieldValue("minimumRepaymentsPA", data.minimumRepaymentsPA || "");
    setFieldValue("actualAnnualRepayments", data.actualAnnualRepayments || "");
    setFieldValue("repayLoanInYear", data.repayLoanInYear || "No");
    setFieldValue(
      "applyMinimumRepaymentsOR",
      data.applyMinimumRepaymentsOR || "No"
    );
    setFieldValue("surplusToHomeLoan", data.surplusToHomeLoan || "No");

    if (addInputFlag) {
      setFieldValue("deductibleInterest", data.deductibleInterest || "100%");
    }
  };

  /* -------------------- OPTIONS -------------------- */
  const yearOptions = Array.from({ length: 31 }, (_, i) => ({
    value: `${i}`,
    label: `Year ${i}`,
  }));

  const repayYearOptions = [
    { value: "No", label: "No" },
    ...Array.from({ length: 30 }, (_, i) => ({
      value: `${i + 1}`,
      label: `Year ${i + 1}`,
    })),
  ];

  /* -------------------- INNER MODAL -------------------- */
  const handleInnerModal = (title, values, key) => {
    console.log("Inner Modal Called:", title, values, key);

    setModalObject({
      title,
      values,
      key,
      ParentObject: props.modalObject,
      clientPartnerPer,
      cal: true,
    });
    setFlagState(true);
  };

  /* -------------------- TABLE COLUMNS -------------------- */
  const columns = useMemo(() => {
    const base = [
      {
        title: "Loan Balance",
        placeholder: "Loan Balance",
        dataIndex: "loanBalance",
        key: "loanBalance",
        innerModalTitle: "Loan Balance Details",
        type: "number-toComma-Modal",
        disabled: true,
        callBack: true,
        func: handleInnerModal,
      },
      {
        title: "Loan Type",
        dataIndex: "loanType",
        type: "select",
        placeholder: "Loan Type",
        options: [
          { value: "I/Only", label: "I/Only" },
          { value: "P & I", label: "P & I" },
        ],
      },
      {
        title: "Loan Term",
        placeholder: "Loan Term",
        dataIndex: "loanTerm",
        type: "select",
        selectedOptionValue: true,
        options: yearOptions,
      },
      {
        title: "Interest Only Period",
        placeholder: "Interest Only Period",
        dataIndex: "interestOnlyPeriod",
        type: "select",
        selectedOptionValue: true,
        options: yearOptions,
      },
      {
        title: "Interest Rate (p.a)",
        placeholder: "Interest Rate (p.a)",
        dataIndex: "initialInterestRatePA",
        type: "number-toPercent",
      },
    ];

    if (addInputFlag) {
      base.push({
        title: "Deductible Interest %",
        placeholder: "Deductible Interest %",
        dataIndex: "deductibleInterest",
        type: "number-toPercent",
      });
    }

    base.push(
      {
        title: "Minimum Repayments (p.a)",
        dataIndex: "minimumRepaymentsPA",
        placeholder: "Minimum Repayments (p.a)",
        type: "number-toComma",
        disabled: true,
      },
      {
        title: "Apply Minimum Repayments OR",
        dataIndex: "applyMinimumRepaymentsOR",
        placeholder: "Apply Minimum Repayments OR",
        type: "yesno",
      },
      {
        title: "Actual Annual Repayments",
        dataIndex: "actualAnnualRepayments",
        placeholder: "Actual Annual Repayments",
        type: "number-toComma",
      },
      {
        title: "Repay Loan In Year",
        dataIndex: "repayLoanInYear",
        type: "select",
        placeholder: "Repay Loan In Year",
        options: repayYearOptions,
        selectedOptionValue: true,
      }
    );

    if (!addInputFlag) {
      base.push({
        title: "Surplus To Home Loan",
        dataIndex: "surplusToHomeLoan",
        placeholder: "Surplus To Home Loan",
        type: "yesno",
      });
    }

    return base;
  }, [addInputFlag]);

  /* -------------------- SUBMIT (LOCAL ONLY) -------------------- */
  const onSubmit = (values) => {
    if (!addInputFlag) values.deductibleInterest = undefined;
    if (addInputFlag) values.surplusToHomeLoan = undefined;

    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key,
      values
    );
    props.setFlagState?.(false);
    props.setIsEditing(!props.isEditing);
  };

  /* -------------------- CHILD ACTIONS -------------------- */
  const recalcLoan = async (values, setFieldValue) => {
    try {
      setCashFlowReCalculateLoading(true);

      let updatedData = JSON.parse(JSON.stringify(cashFlowData));
      const { values: parentValues, key, ParentObject } = props.modalObject;

      const count = parseInt(parentValues.numberOfProperties, 10) || 1;
      const index = key.match(/\d+/)?.[0] || 0;

      let structured = createStructuredEntries(
        parentValues,
        ParentObject.key,
        count
      );

      structured[index][key.replace(/_\d+/, "")] = values;
      updatedData[ParentObject.key].client = structured;
      updatedData[ParentObject.key].numberOfProperties = count;

      const apiMap = {
        cf_familyHome: ["cf_familyHome", "INPUTS_Lifestyle_Assets_Debt"],
        cf_investmentsProperty: ["financialInvestment", "INPUTS_Property"],
        cf_FamilyTrustInvestmentProperties: [
          "investmentsTrust",
          "INPUTS_TRUST_Property",
        ],
        cf_SMSFInvestmentProperties: ["SMSF", "INPUTS_SMSF_Property"],
      };

      const [keyApi, param] = apiMap[ParentObject.key];

      const res = await PostAxios(
        `${DefaultUrl}/api/cal/${keyApi}/${param}`,
        updatedData
      );

      const loan = res.data[ParentObject.key][index]?.loan || {};

      setFieldValue("minimumRepaymentsPA", loan.minimumRepaymentsPA || 0);

      openNotificationSuccess("success", "topRight", "Success", "Recalculated");
    } finally {
      setCashFlowReCalculateLoading(false);
    }
  };

  /* -------------------- DOWNLOAD -------------------- */
  const downloadExcel = async (values) => {
    try {
      setCashFlowDownloading(true);
      const res = await PostAxiosBlob(
        `${DefaultUrl}/api/cal/workBookDownload`,
        cashFlowData
      );

      const fileName = `UpdatedWorkbook_of_${RenderName("client")}.xlsx`;
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);

      openNotificationSuccess("success", "topRight", "Downloaded", fileName);
    } finally {
      setCashFlowDownloading(false);
    }
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

        const dataRows = useMemo(() => {
          return [
            {
              key: `CashFlowHomeLoan`,
              loanBalance: values.loanBalance || "",
              loanType: values.loanType || "",
              loanTerm: values.loanTerm || "",
              interestOnlyPeriod: values.interestOnlyPeriod || "",
              initialInterestRatePA: values.initialInterestRatePA || "",
              deductibleInterest: values.deductibleInterest || "",
              minimumRepaymentsPA: values.minimumRepaymentsPA || "",
              applyMinimumRepaymentsOR: values.applyMinimumRepaymentsOR || "",
              actualAnnualRepayments: values.actualAnnualRepayments || "",
              repayLoanInYear: values.repayLoanInYear || "",
              surplusToHomeLoan: values.surplusToHomeLoan || "",
            },
          ];
        }, [values]);

        return (
          <Form>
            <InnerModal
              modalObject={modalObject}
              setFieldValue={setFieldValue}
              setFlagState={setFlagState}
              flagState={flagState}
            >
              {modalObject.key === "loanBalance" && <CashFlowLoanBelanceLVR />}
            </InnerModal>

            <h3
              className="d-none"
              onClick={() => {
                console.log(values);
              }}
            >
              askdjalks
            </h3>
            <div className="mt-4 All_Client reportSection">
              <AntDTableHOC
                columns={columns}
                data={dataRows}
                values={values}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleSubmit={props.handleOk}
                isEditing={props.isEditing}
                setIsEditing={props.setIsEditing}
              />
            </div>

            {/* Hidden triggers */}
            <button
              ref={props.childButtonRef}
              type="button"
              onClick={() => recalcLoan(values, setFieldValue)}
              hidden
            />
            <button
              ref={props.childButtonDownloadRef}
              type="button"
              onClick={() => downloadExcel(values)}
              hidden
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default CashFlowHomeLoan;
