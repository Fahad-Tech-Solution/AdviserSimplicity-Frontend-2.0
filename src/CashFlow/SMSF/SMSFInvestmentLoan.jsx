import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { Placeholder, Row } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  CashFlowData,
  CashFlowDownloading,
  CashFlowReCalculateLoading,
  CashFlowScenarioData,
  defaultUrl,
  QuestionDetail,
} from "../../Store/Store";

import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  PostAxiosBlob,
  RenderName,
  toCommaAndDollar,
} from "../../Components/Assets/Api/Api";

import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const SMSFInvestmentLoan = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  const CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);
  const DefaultUrl = useRecoilValue(defaultUrl);

  const [UserStatus] = useState(localStorage.getItem("UserStatus"));
  const [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

  const [cashFlowReCalculateLoading, setCashFlowReCalculateLoading] =
    useRecoilState(CashFlowReCalculateLoading);
  const [cashFlowDownloading, setCashFlowDownloading] =
    useRecoilState(CashFlowDownloading);

  /* ---------------- Initial Values ---------------- */
  const initialValues = {
    owner: ["client"],
    client: {
      yearOfLoan: "",
      currentLoanBalance: "",
      loanType: "",
      loanTerm: "",
      initialInterestRate: "",
      deductibleInterest: "",
      minimumRepayments: "",
      actualAnnualRepayments: "",
      repayLoanYear: "No",
      interestOnlyPeriod: "",
      applyMinimumRepaymentsOR: "No",
    },
  };

  /* ---------------- Fill Initial Values ---------------- */
  const fillInitialValues = (setFieldValue) => {
    try {
      setObjAndAPIKey(props.modalObject.key);

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      const updateFields = (data, prefix) => {
        if (!data || !Object.keys(data).length) return;
        const fields = {
          yearOfLoan: data.yearOfLoan || "",
          currentLoanBalance: data.currentLoanBalance || data.loanBalance || "",
          loanType: data.loanType || "",
          loanTerm: data.loanTerm || "",
          initialInterestRate:
            data.initialInterestRate || data.interestRate || "",
          deductibleInterest:
            data.deductibleInterest || data.deductibleLoanAmount || "",
          minimumRepayments: data.minimumRepayments || "",
          actualAnnualRepayments:
            data.actualAnnualRepayments || data.annualRepayments || "",
          repayLoanYear: data.repayLoanYear || "No",
          interestOnlyPeriod: data.interestOnlyPeriod || "",
          applyMinimumRepaymentsOR: data.applyMinimumRepaymentsOR || "No",
        };

        Object.entries(fields).forEach(([key, value]) => {
          setFieldValue(`${prefix}.${key}`, value);
        });
      };

      if (scenarioObj?.selectedSource === "discoveryForm") {
        const SMSFInvestmentLoan =
          Object.keys(questionDetail[props.modalObject.sourceKey] || {}).length >
          0
            ? questionDetail[props.modalObject.sourceKey]
            : { client: [] };

        updateFields(SMSFInvestmentLoan.client, "client");
      } else {
        const cashFlowDetails = CashFlowScenarioDataObj?.[objAndAPIKey];
        if (cashFlowDetails) {
          if (cashFlowDetails.owner.includes("client")) {
            updateFields(cashFlowDetails.client, "client");
          }
        }
      }

      if (cashFlowData?.[objAndAPIKey]?._id) {
        const cashFlowDataDetails = cashFlowData[objAndAPIKey];
        if (cashFlowDataDetails.owner.includes("client")) {
          updateFields(cashFlowDataDetails.client, "client");
        }
      }
    } catch (error) {
      console.error("Error in fillInitialValues:", error);
    }
  };

  /* ---------------- Submit ---------------- */
  const onSubmit = async (values) => {
    console.log(values)
    const obj = {
      ...values,
      scenarioFK: JSON.parse(localStorage.getItem("ScenarioObj"))._id,
    };

    let JointActualAnnualRepayments = 0;

    if (values.owner.includes("client")) {
      obj.clientTotal =
        toCommaAndDollar(
          parseFloat(
            values.client.actualAnnualRepayments?.replace(/[^0-9.-]+/g, "") || 0
          ) +
            JointActualAnnualRepayments / 2
        ) || "$0";
    } else {
      obj.clientTotal = "";
    }

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

  /* ---------------- Loan Term Options ---------------- */
  const loanTermOptions = Array.from({ length: 31 }, (_, i) => ({
    value: i.toString(),
    label: ("Year " + i).toString(),
  }));

  const loanTermOptionsWithNo = Array.from({ length: 31 }, (_, i) => {
    if (i === 0) {
      return {
        value: "No",
        label: "No",
      };
    }
    return {
      value: i.toString(),
      label: ("Year " + i).toString(),
    };
  });

  const loanTermOptionsWithExisting = Array.from({ length: 31 }, (_, i) => {
    if (i === 0) {
      return {
        value: "Existing",
        label: "Existing",
      };
    }
    return {
      value: i.toString(),
      label: ("Year " + i).toString(),
    };
  });

  const loanTypeOptions = [
    { value: "I/Only", label: "I/Only" },
    { value: "P & I", label: "P & I" },
  ];

  /* ---------------- Table Columns ---------------- */
  const columns = [
    { title: "Owner", dataIndex: "owner", type: "label", justText: true },
    {
      title: "Year of Loan",
      dataIndex: "yearOfLoan",
      type: "select",
      options: loanTermOptionsWithExisting,
    },
    {
      title: "Current Loan Balance",
      dataIndex: "currentLoanBalance",
      type: "number-toComma",
      placeholder:"Current Loan Balance",
    },
    {
      title: "Loan Type",
      dataIndex: "loanType",
      type: "select",
      options: loanTypeOptions,
    },
    {
      title: "Loan Term",
      dataIndex: "loanTerm",
      type: "select",
      options: loanTermOptions,
    },
    {
      title: "Interest Only Period",
      dataIndex: "interestOnlyPeriod",
      type: "select",
      options: loanTermOptions,
    },
    {
      title: "Initial Interest Rate (p.a.)",
      dataIndex: "initialInterestRate",
      type: "number-toPercent",
      placeholder:"Initial Interest Rate (p.a.)",
    },
    {
      title: "Deductible interest",
      dataIndex: "deductibleInterest",
      type: "number-toPercent",
      placeholder:"Deductible interest",
    },
    {
      title: "Minimum Repayments (p.a)",
      dataIndex: "minimumRepayments",
      type: "number-toComma",
      disabled: true,
      placeholder:"Minimum Repayments (p.a)",
    },
    {
      title: "Apply Minimum Repayments OR",
      dataIndex: "applyMinimumRepaymentsOR",
      type: "yesno",
    },
    {
      title: "Actual Annual Repayments",
      dataIndex: "actualAnnualRepayments",
      type: "number-toComma",
      placeholder:"Annual Repayments",
    },
    {
      title: "Repay Loan in Year",
      dataIndex: "repayLoanYear",
      type: "select",
      options: loanTermOptionsWithNo,
    },
  ];

  /* ---------------- Calculate Handler ---------------- */
  const handleChildButtonClick = async (values, setFieldValue) => {
    try {
      const obj = JSON.parse(JSON.stringify(cashFlowData));
      obj[props.modalObject.key] = values;

      const calculateApiArray = {
        cf_SMSFInvestmentLoan: {
          key: "SMSF",
          param: "INPUTS_SMSF_Investments",
        },
        cf_FamilyTrustInvestmentLoan: {
          key: "investmentsTrust",
          param: "INPUTS_TRUST_Investments",
        },
      };

      const res = await PostAxios(
        `${DefaultUrl}/api/cal/${
          calculateApiArray[props.modalObject.key].key
        }/${calculateApiArray[props.modalObject.key].param}`,
        obj
      );

      if (res) {
        const Data = res.data[props.modalObject.key];

        if (values.owner.includes("client")) {
          setFieldValue("client.minimumRepayments", Data.minimumRepayments);
        }

        setCashFlowReCalculateLoading(false);
        openNotificationSuccess(
          "success",
          "topRight",
          "Success",
          `Data of "${props.modalObject.title}" is saved`
        );
      }
    } catch (error) {
      console.error("Error in handleChildButtonClick:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error",
        `Data of "${props.modalObject.title}" not saved`
      );
      setCashFlowReCalculateLoading(false);
    }
  };

  /* ---------------- Download Handler ---------------- */
  const handleChildButtonDownloadClick = async () => {
    try {
      const obj = JSON.parse(JSON.stringify(cashFlowData));

      const response = await PostAxiosBlob(
        `${DefaultUrl}/api/cal/workBookDownload`,
        obj
      );

      const fileName = `UpdatedWorkbook_of_${RenderName("client")}.xlsx`;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      openNotificationSuccess(
        "success",
        "topRight",
        "Success",
        `Excel file "${fileName}" is downloaded.`
      );
    } catch (error) {
      console.error("Download Error:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Download Failed",
        "Something went wrong while downloading the Excel file."
      );
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

        /* ---------------- Generate Rows ---------------- */
        const rows = useMemo(() => {
          const rowsArray = [];

          if (values.owner?.includes("client") && values.client) {
            rowsArray.push({
              key: "client",
              owner: RenderName("client"),
              stakeHolder: "client",
              ...values.client,
            });
          }

          if (
            values.owner?.includes("partner") &&
            UserStatus === "Married" &&
            values.partner
          ) {
            rowsArray.push({
              key: "partner",
              owner: RenderName("partner"),
              stakeHolder: "partner",
              ...values.partner,
            });
          }

          return rowsArray;
        }, [values, UserStatus]);

        return (
          <Form>
            <Row>
              {/* Hidden buttons for calculations and downloads */}
              <button
                ref={props.childButtonRef}
                onClick={() => handleChildButtonClick(values, setFieldValue)}
                style={{ display: "none" }}
                type="button"
              >
                Hidden Child Button
              </button>
              <button
                ref={props.childButtonDownloadRef}
                onClick={handleChildButtonDownloadClick}
                style={{ display: "none" }}
                type="button"
              >
                Hidden Child Button Download
              </button>

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

export default SMSFInvestmentLoan;