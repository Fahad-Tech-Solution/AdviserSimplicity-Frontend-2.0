import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form } from "formik";
import { ConfigProvider, Select } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";

import DynamicTableForInputsSection from "../../../Components/Assets/Table/DynamicTableForInputsSection";
import DynamicYesNo from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo";

import {
  handleInputBlur,
  handleInputChange,
  handleInputFocus,
  handleInputKeyDown,
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  PostAxiosBlob,
  RenderName,
  toCommaAndDollar,
  toPercentage,
} from "../../../Components/Assets/Api/Api";

import {
  CashFlowData,
  CashFlowDownloading,
  CashFlowReCalculateLoading,
  CashFlowScenarioData,
  defaultUrl,
  QuestionDetail,
} from "../../../Store/Store";
import { Placeholder } from "react-bootstrap";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const CashFlowPersonalDebt = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);
  const DefaultUrl = useRecoilValue(defaultUrl);

  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  const [, setCashFlowReCalculateLoading] = useRecoilState(
    CashFlowReCalculateLoading
  );
  const [, setCashFlowDownloading] = useRecoilState(CashFlowDownloading);

  const [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

  const existingData =
    questionDetail?.[props.modalObject.discoveryKey]?.client || [];

  const initialValues = {
    NumberOfMap: existingData.length || "",
    personalDebts: existingData.length ? existingData : [],
  };

  const fillInitialValues = (setFieldValue) => {
    setObjAndAPIKey(props.modalObject.key);

    const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));
    const cashFlowDetails =
      CashFlowScenarioDataObj?.[objAndAPIKey] || cashFlowData?.[objAndAPIKey];

    if (cashFlowDetails?.client) {
      setFieldValue("NumberOfMap", cashFlowDetails.NumberOfMap || 0);
      setFieldValue("personalDebts", cashFlowDetails.client);
    }
  };

  const handleInput = (value, setFieldValue) => {
    const cappedValue = value > 2 ? 2 : value;
    setFieldValue("NumberOfMap", cappedValue);

    setFieldValue(
      "personalDebts",
      Array(cappedValue)
        .fill()
        .map((_, i) => ({
          YearLoan: "",
          CurrentLoanBalance: "",
          LoanType: "",
          LoanTerm: "",
          InterestRate: "",
          MinimumRepayments: "",
          ActualAnnualRepayments: "",
          applyMinimumRepaymentsOR: "",
          RepayLoanInYear: "No",
          ...(initialValues.personalDebts[i] || {}),
        }))
    );
  };

  const onSubmit = async (values) => {
    const personalLoansArray = values.personalDebts || [];

    const obj = {
      NumberOfMap: values.NumberOfMap,
      client: personalLoansArray,
      clientTotal:
        toCommaAndDollar(
          personalLoansArray.reduce(
            (total, entry) =>
              total +
              parseFloat(
                entry.CurrentLoanBalance?.replace(/[^0-9.-]+/g, "") || 0
              ),
            0
          )
        ) || "$0",
      scenarioFK: JSON.parse(localStorage.getItem("ScenarioObj"))._id,
    };

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
        setCashFlowData({
          ...cashFlowData,
          [objAndAPIKey]: res,
        });
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        `Data of "${props.modalObject.title}" is Saved`
      );

      props.setFlagState?.(false);
      props?.setIsEditing?.(false);
    } catch (error) {
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Data of "${props.modalObject.title}" is not Saved`
      );
    }
  };

  const columns = [
    { title: "No#", dataIndex: "owner", key: "owner", width: 60 },
    {
      title: "Year of Loan",
      placeholder: "Year of Loan",
      dataIndex: "YearLoan",
      key: "YearLoan",
      type: "select",
      options: Array.from({ length: 31 }).map((_, i) =>
        i === 0
          ? { value: "Existing", label: "Existing" }
          : { value: i, label: `Year ${i}` }
      ),
    },
    {
      title: "Current Loan Balance",
      dataIndex: "CurrentLoanBalance",
      placeholder: "Current Loan Balance",
      key: "CurrentLoanBalance",
      type: "number-toComma",
    },
    {
      title: "Loan Type",
      dataIndex: "LoanType",
      key: "LoanType",
      type: "select",
      options: [
        { value: "I/Only", label: "I/Only" },
        { value: "P & I", label: "P & I" },
      ],
    },
    {
      title: "Loan Term",
      dataIndex: "LoanTerm",
      key: "LoanTerm",
      type: "select",
      options: Array.from({ length: 31 }).map((_, i) => ({
        value: i,
        label: `Year ${i}`,
      })),
    },
    {
      title: "Interest Rate (p.a.)",
      dataIndex: "InterestRate",
      key: "InterestRate",
      type: "number-toPercent",
      placeholder: "Interest Rate (p.a.)",
    },
    {
      title: "Minimum Repayments (p.a)",
      placeholder: "Minimum Repayments (p.a)",
      dataIndex: "MinimumRepayments",
      key: "MinimumRepayments",
      type: "number-toComma",
      disabled: true,
    },
    {
      title: "Apply Minimum Repayments OR",
      dataIndex: "applyMinimumRepaymentsOR",
      key: "applyMinimumRepaymentsOR",
      type: "yesno",
    },
    {
      title: "Actual Annual Repayments",
      dataIndex: "ActualAnnualRepayments",
      placeholder: "Actual Annual Repayments",
      key: "ActualAnnualRepayments",
      type: "number-toComma",
    },
    {
      title: "Repay Loan in Year",
      dataIndex: "RepayLoanInYear",
      key: "RepayLoanInYear",
      type: "select",
      options: [
        { value: "No", label: "No" },
        ...Array.from({ length: 30 }).map((_, i) => ({
          value: i + 1,
          label: `Year ${i + 1}`,
        })),
      ],
    },
  ];

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

        const dataRows = useMemo(() => {
          const num = Number(values.NumberOfMap) || 0;
          return Array.from({ length: num }, (_, i) => ({
            key: `personalDebts.${i}`,
            owner: i + 1,
            stakeHolder: `personalDebts[${i}]`,
            ...values.personalDebts?.[i],
          }));
        }, [values.NumberOfMap, values.personalDebts]);

        return (
          <Form>
            <div className="d-flex justify-content-center align-items-center gap-4">
              <p className="mt-1">Number of {props.modalObject.title}:</p>

              <ConfigProvider>
                <Select
                  size="large"
                  style={{ minWidth: 80 }}
                  value={values.NumberOfMap || undefined}
                  onChange={(value) => handleInput(value, setFieldValue)}
                >
                  {[1, 2].map((v) => (
                    <Option key={v} value={v}>
                      {v}
                    </Option>
                  ))}
                </Select>
              </ConfigProvider>
            </div>

            {values.NumberOfMap > 0 && (
              <div className="mt-4 All_Client reportSection">
                <AntdTable
                  columns={columns}
                  data={dataRows}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isEditing={props?.isEditing}
                  setIsEditing={props?.setIsEditing}
                />
              </div>
            )}

            {/* Hidden buttons (unchanged behaviour) */}
            <button
              ref={props.childButtonRef}
              type="button"
              style={{ display: "none" }}
            />
            <button
              ref={props.childButtonDownloadRef}
              type="button"
              style={{ display: "none" }}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default CashFlowPersonalDebt;
