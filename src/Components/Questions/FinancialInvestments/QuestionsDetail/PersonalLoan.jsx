import { Form, Formik } from "formik";
import React, { useEffect, useState, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  BankDetail,
  defaultUrl,
  QuestionDetail,
} from "../../../../Store/Store";
import {
  handleInputChange,
  handleInputFocus,
  handleInputKeyDown,
  handleInputBlur,
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  toCommaAndDollar,
  toPercentage,
} from "../../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const PersonalLoan = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  let bankDetailObj = useRecoilValue(BankDetail);
  let DefaultUrl = useRecoilValue(defaultUrl);

  let [nameSet] = useState(localStorage.getItem("UserName"));

  let personalLoans =
    Object.keys(questionDetail.personalLoans || {}).length > 0
      ? questionDetail.personalLoans
      : {
          client: [],
          partner: [],
          joint: [],
        };

  let initialValues = {
    personalLoans:
      Array.isArray(personalLoans["client"]) &&
      personalLoans["client"].length > 0
        ? personalLoans["client"]
        : [],
    NumberOfMap:
      Array.isArray(personalLoans["client"]) &&
      personalLoans["client"].length > 0
        ? personalLoans["client"].length
        : "",
  };

  const [dynamicFields, setDynamicFields] = useState([]);

  const [lenderOption, setLenderOption] = useState(() => {
    if (!bankDetailObj?.FinancialInstitutions) return [];
    return bankDetailObj.FinancialInstitutions.map((elem) => ({
      value: elem._id,
      label: elem.platformName,
    }));
  });

  useEffect(() => {
    if (
      personalLoans["client"] &&
      personalLoans["client"].length
    ) {
      setDynamicFields(
        Array(personalLoans["client"].length).fill("")
      );
    }
  }, [personalLoans["client"]]);

  const fillInitialValues = (setFieldValue) => {
    if (
      personalLoans["client"] &&
      personalLoans["client"].length
    ) {
      setFieldValue("personalLoans", personalLoans["client"]);
    }
  };

  let handleInput = (e, setFieldValue) => {
    const value = e.target.value > 2 ? 2 : e.target.value;
    setFieldValue("NumberOfMap", value);
    setDynamicFields(Array(Number(value)).fill(""));
    // Initialize new personalLoans array with empty objects if needed
    setFieldValue(
      "personalLoans",
      Array(Number(value))
        .fill()
        .map((_, i) => ({
          LenderCurrent: "",
          LoanBalance: "",
          LoanType: "",
          RepaymentsAmount: "",
          Frequency: "",
          AnnualRepayments: "",
          InterestRate: "",
          LoanTerm: "",
          LoanTermRemaining: "",
          ...(initialValues.personalLoans[i] || {}),
        }))
    );
  };

  const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
    value: `Year ${i + 1}`,
    label: `Year ${i + 1}`,
  }));

  let AnnualFormula = (values, setFieldValue, currentInput, index) => {
    // alert("ma chala")
    let RepaymentsAmount = parseFloat(
      values.personalLoans[
        index.replace(/[^0-9]+/g, "")
      ]?.RepaymentsAmount?.replace(/[^0-9.-]+/g, "") || 0
    );
    let Frequency = parseFloat(
      values.personalLoans[index.replace(/[^0-9]+/g, "")]?.Frequency || 0
    );

    switch (currentInput.name.split(".").pop()) {
      case "RepaymentsAmount":
        RepaymentsAmount =
          parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
        break;
      case "Frequency":
        Frequency = parseFloat(currentInput.value) || 0;
        break;
    }

    const AnnualRepayments = Frequency * RepaymentsAmount;

    console.log(AnnualRepayments, Frequency, RepaymentsAmount);

    setFieldValue(
      `[${index}].AnnualRepayments`,
      toCommaAndDollar(AnnualRepayments)
    );
  };

  let FormulaSetting = () => {};

  let onSubmit = async (values) => {
    // Use the personalLoans array directly from values
    const personalLoanData = values.personalLoans;

    // Create API payload
    let DataOf = "client";
    let obj = {
      clientFK: localStorage.getItem("UserID"),
      [DataOf]: personalLoanData,
      [DataOf + "Total"]: toCommaAndDollar(
        personalLoanData.reduce(
          (total, entry) =>
            total +
            parseFloat(entry.AnnualRepayments.replace(/[^0-9.-]+/g, "") || 0),
          0
        )
      ),
    };

    // Update the questionDetail state
    setQuestionDetail((prev) => ({
      ...prev,
      personalLoans: {
        ...prev.personalLoans,
        ["client"]: personalLoanData,
      },
    }));

    try {
      let res;
      const bankAccountArray = personalLoans.clientFK || "";
      if (!bankAccountArray) {
        res = await PostAxios(`${DefaultUrl}/api/personalLoans/Add`, obj);
      } else {
        obj.collection = "client";
        res = await PatchAxios(`${DefaultUrl}/api/personalLoans/Update`, obj);
      }

      if (res) {
        console.log(res);
        const updatedData = { ...questionDetail, personalLoans: res };
        setQuestionDetail(updatedData);
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        `Data of "${props.modalObject.title}" is Saved`
      );

      // Update parent component if needed
      if (props.setFieldValue) {
        props.setFieldValue("personalLoans", personalLoanData);
      }
      if (props.flagState) {
        props.setFlagState(false);
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Data of "${props.modalObject.title}" is not Saved. Please try again!`
      );
    }
  };

  const columns = [
    {
      title: "No#",
      dataIndex: "index",
      key: "owner",
      type: "number",
      render: (_, __, i) => i + 1,
      width: 60,
    },
    {
      title: "Lender",
      dataIndex: "LenderCurrent",
      key: "LenderCurrent",
      type: "select",
      options: lenderOption,
      placeholder: "Lender",
      width: 260,
    },
    {
      title: "Loan Balance",
      dataIndex: "LoanBalance",
      key: "LoanBalance",
      type: "number-toComma",
      placeholder: "Loan Balance",
    },
    {
      title: "Loan Type",
      dataIndex: "LoanType",
      key: "LoanType",
      type: "select",
      options: [
        { value: "i/only", label: "i/only" },
        { value: "P&I", label: "P&I" },
      ],
    },
    {
      title: "Repayments Amount",
      dataIndex: "RepaymentsAmount",
      key: "RepaymentsAmount",
      type: "number-toComma",
      placeholder: "Repayments Amount",
      callBack: true,
      func: AnnualFormula,
    },
    {
      title: "Frequency",
      dataIndex: "Frequency",
      key: "Frequency",
      type: "select",
      options: [
        { value: "52", label: "Weekly" },
        { value: "26", label: "Fortnightly" },
        { value: "12", label: "Monthly" },
        { value: "1", label: "Annually" },
      ],
      styleSet: { width: "200px" },
      callBack: true,
      func: AnnualFormula,
    },
    {
      title: "Annual Repayments",
      dataIndex: "AnnualRepayments",
      key: "AnnualRepayments",
      type: "number-toComma",
      placeholder: "Annual Repayments",
      disabled: true,
      callBack: true,
      func: AnnualFormula,
    },
    {
      title: "Interest Rate (p.a)",
      dataIndex: "InterestRate",
      key: "InterestRate",
      type: "number-toPercent",
      placeholder: "Interest Rate (p.a)",
    },
    {
      title: "Loan Term",
      dataIndex: "LoanTerm",
      key: "LoanTerm",
      type: "select",
      options: loanTermOptions,
    },
    {
      title: "Loan Term Remaining",
      dataIndex: "LoanTermRemaining",
      key: "LoanTermRemaining",
      type: "select",
      options: loanTermOptions,
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      innerRef={props.formRef}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [personalLoans["client"]]);

        const dataRows = useMemo(() => {
          const num = Number(values.NumberOfMap) || 0;
          if (num > 0) {
            return Array.from({ length: num }, (_, i) => ({
              key: `personalLoan.${i}`,
              stakeHolder: `personalLoans[${i}]`,
              LenderCurrent: values.personalLoans?.[i]?.LenderCurrent || "",
              LoanBalance: values.personalLoans?.[i]?.LoanBalance || "",
              LoanType: values.personalLoans?.[i]?.LoanType || "",
              RepaymentsAmount:
                values.personalLoans?.[i]?.RepaymentsAmount || "",
              Frequency: values.personalLoans?.[i]?.Frequency || "",
              AnnualRepayments:
                values.personalLoans?.[i]?.AnnualRepayments || "",
              InterestRate: values.personalLoans?.[i]?.InterestRate || "",
              LoanTerm: values.personalLoans?.[i]?.LoanTerm || "",
              LoanTermRemaining:
                values.personalLoans?.[i]?.LoanTermRemaining || "",
            }));
          }
          return [];
        }, [values.NumberOfMap, values.personalLoans]);

        return (
          <Form>
            <div className="d-flex justify-content-center align-items-center gap-4">
              <p className="text-end mt-1 pt-2">
                How many {props.modalObject.title} does {nameSet} have :
              </p>
              <div style={{ minWidth: "10%" }}>
                <select
                  id="NumberOfMap"
                  name="NumberOfMap"
                  className="form-select inputDesignDoubleInput"
                  onChange={(e) => handleInput(e, setFieldValue)}
                  value={values.NumberOfMap}
                >
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
            </div>

            {values.NumberOfMap && (
              <div className="mt-4 All_Client reportSection">
                <AntdTable
                  columns={columns}
                  data={dataRows}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </div>
            )}
            <button type="submit" style={{ display: "none" }}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PersonalLoan;
