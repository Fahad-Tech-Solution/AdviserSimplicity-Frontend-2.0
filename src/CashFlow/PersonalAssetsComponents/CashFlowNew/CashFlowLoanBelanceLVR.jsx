import { Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import InnerModal from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
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

const CashFlowLoanBelanceLVR = (props) => {
  const DefaultUrl = useRecoilValue(defaultUrl);
  const cashFlowData = useRecoilValue(CashFlowData);

  const [, setCashFlowReCalculateLoading] = useRecoilState(
    CashFlowReCalculateLoading
  );
  const [, setCashFlowDownloading] = useRecoilState(CashFlowDownloading);

  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  /* -------------------- INITIAL VALUES -------------------- */
  const initialValues = {
    LVR: "",
    loanAmount: "",
    loanBalance: "",
    clientOwnership: "",
    partnerOwnership: "",
  };

  /* -------------------- PREFILL -------------------- */
  const fillInitialValues = (setFieldValue) => {
    try {
      const lvrKey = props.modalObject.key + "CashFlowLoanBelanceLVR";

      const existing = props.modalObject.values?.[lvrKey];

      if (existing && Object.keys(existing).length) {
        setFieldValue("LVR", existing.LVR || "");
        setFieldValue("loanAmount", existing.loanAmount || "");
        setFieldValue("loanBalance", existing.loanBalance || "");
        setFieldValue("clientOwnership", existing.clientOwnership || "");
        setFieldValue("partnerOwnership", existing.partnerOwnership || "");
        return;
      }

      const parentValues =
        props.modalObject?.ParentObject?.values?.[
          props.modalObject.ParentObject.key
        ];

      if (parentValues?.loanBalance) {
        setFieldValue("loanAmount", parentValues.loanBalance);
      }
    } catch (err) {
      console.error("LVR fill error:", err);
    }
  };

  /* -------------------- OWNERSHIP AUTO % -------------------- */
  const calculatePercentage = (values, setFieldValue, currentInput) => {
    let client =
      parseFloat(values.clientOwnership?.replace(/[^0-9.]/g, "")) || 0;
    let partner =
      parseFloat(values.partnerOwnership?.replace(/[^0-9.]/g, "")) || 0;

    if (currentInput.name === "clientOwnership") {
      client = Math.min(100, parseFloat(currentInput.value) || 0);
      setFieldValue("partnerOwnership", (100 - client).toFixed(2) + "%");
    }

    if (currentInput.name === "partnerOwnership") {
      partner = Math.min(100, parseFloat(currentInput.value) || 0);
      setFieldValue("clientOwnership", (100 - partner).toFixed(2) + "%");
    }
  };

  /* -------------------- TABLE COLUMNS -------------------- */
  const columns = useMemo(() => {
    const base = [
      {
        title: "Loan to Value Ratio (LVR)",
        dataIndex: "LVR",
        type: "number-toPercent",
        placeholder: "Loan to Value Ratio (LVR)",
      },
      {
        title: "Loan Amount",
        placeholder: "Loan Amount",
        dataIndex: "loanAmount",
        type: "number-toComma",
      },
      {
        title: "Loan Balance",
        placeholder: "Loan Balance",
        dataIndex: "loanBalance",
        type: "number-toComma",
        disabled: true,
      },
    ];

    if (!props.modalObject.clientPartnerPer) {
      base.push(
        {
          title: "Client % Ownership",
          placeholder: "Client % Ownership",
          dataIndex: "clientOwnership",
          type: "number-toPercent",
          callBack: true,
          func: calculatePercentage,
          disabled: true,
        },
        {
          title: "Partner % Ownership",
          placeholder: "Partner % Ownership",
          dataIndex: "partnerOwnership",
          type: "number-toPercent",
          callBack: true,
          func: calculatePercentage,
          disabled: true,
        }
      );
    }

    return base;
  }, [props.modalObject.clientPartnerPer]);

  /* -------------------- SUBMIT (LOCAL) -------------------- */
  const onSubmit = (values) => {
    const lvrKey = props.modalObject.key + "CashFlowLoanBelanceLVR";

    props.setFieldValue(lvrKey, values);
    props.setFieldValue(props.modalObject.key, values.loanAmount);

    props.setFlagState?.(false);
    props.setIsEditing(!props.isEditing);
  };

  /* -------------------- RECALCULATE -------------------- */
  const handleRecalculate = async (values, setFieldValue) => {
    try {
      setCashFlowReCalculateLoading(true);

      let updatedData = JSON.parse(JSON.stringify(cashFlowData));

      const { ParentObject, key } = props.modalObject;
      const { ParentObject: GrandParent, values: parentValues } = ParentObject;

      const count = parseInt(GrandParent.values.numberOfProperties, 10) || 1;

      const index = ParentObject.key.match(/\d+/)?.[0] || 0;

      let structured = createStructuredEntries(
        GrandParent.values,
        GrandParent.key,
        count
      );

      structured[index][ParentObject.key.replace(/_\d+/, "")] = parentValues;

      structured[index][ParentObject.key.replace(/_\d+/, "")][
        key + "CashFlowLoanBelanceLVR"
      ] = values;

      updatedData[GrandParent.key].client = structured;
      updatedData[GrandParent.key].numberOfProperties = count;

      const apiMap = {
        cf_familyHome: ["cf_familyHome", "INPUTS_Lifestyle_Assets_Debt"],
        cf_investmentsProperty: ["financialInvestment", "INPUTS_Property"],
        cf_FamilyTrustInvestmentProperties: [
          "investmentsTrust",
          "INPUTS_TRUST_Property",
        ],
        cf_SMSFInvestmentProperties: ["SMSF", "INPUTS_SMSF_Property"],
      };

      const [apiKey, param] = apiMap[GrandParent.key];

      const res = await PostAxios(
        `${DefaultUrl}/api/cal/${apiKey}/${param}`,
        updatedData
      );

      const loan = res.data[GrandParent.key][index]?.loan?.LVR || {};

      setFieldValue("loanBalance", loan.loanBalance || 0);

      if (!props.modalObject.clientPartnerPer) {
        setFieldValue("clientOwnership", structured[index].clientOwnership);
        setFieldValue("partnerOwnership", structured[index].partnerOwnership);
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success",
        "LVR recalculated"
      );
    } finally {
      setCashFlowReCalculateLoading(false);
    }
  };

  /* -------------------- DOWNLOAD -------------------- */
  const handleDownload = async () => {
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
              key: `CashFlowLoanBelanceLVR`,
              LVR: values.LVR,
              loanAmount: values.loanAmount,
              loanBalance: values.loanBalance,
              clientOwnership: values.clientOwnership,
              partnerOwnership: values.partnerOwnership,
            },
          ];
        }, [values]);

        return (
          <Form className="mt-4 All_Client reportSection">
            <InnerModal
              modalObject={modalObject}
              setFieldValue={setFieldValue}
              setFlagState={setFlagState}
              flagState={flagState}
            />

            <AntDTableHOC
              columns={columns}
              data={dataRows}
              values={values}
              setFieldValue={setFieldValue}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isEditing={props.isEditing}
              setIsEditing={props.setIsEditing}
            />

            {/* Hidden triggers */}
            <button
              ref={props.childButtonRef}
              type="button"
              onClick={() => handleRecalculate(values, setFieldValue)}
              hidden
            />
            <button
              ref={props.childButtonDownloadRef}
              type="button"
              onClick={handleDownload}
              hidden
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default CashFlowLoanBelanceLVR;
