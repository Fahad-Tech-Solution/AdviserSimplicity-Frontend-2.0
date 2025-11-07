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

const CreditCard = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  const bankDetailObj = useRecoilValue(BankDetail);
  const DefaultUrl = useRecoilValue(defaultUrl);

  const [nameSet] = useState(localStorage.getItem("UserName"));

  const creditCards =
    Object.keys(questionDetail.creditCards || {}).length > 0
      ? questionDetail.creditCards
      : { client: [], partner: [], joint: [] };

  let initialValues = {
    creditCards:
      Array.isArray(creditCards["client"]) && creditCards["client"].length > 0
        ? creditCards["client"]
        : [],
    NumberOfMap:
      Array.isArray(creditCards["client"]) && creditCards["client"].length > 0
        ? creditCards["client"].length
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
    if (creditCards["client"] && creditCards["client"].length) {
      setDynamicFields(Array(creditCards["client"].length).fill(""));
    }
  }, [creditCards["client"]]);

  const fillInitialValues = (setFieldValue) => {
    if (creditCards["client"] && creditCards["client"].length) {
      setFieldValue("creditCards", creditCards["client"]);
    }
  };

  const handleInput = (e, setFieldValue) => {
    const value = e.target.value > 2 ? 2 : e.target.value;
    setFieldValue("NumberOfMap", value);
    setDynamicFields(Array(Number(value)).fill(""));
    setFieldValue(
      "creditCards",
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
          ...(initialValues.creditCards[i] || {}),
        }))
    );
  };

  const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
    value: `Year ${i + 1}`,
    label: `Year ${i + 1}`,
  }));

  const AnnualFormula = (values, setFieldValue, currentInput, index) => {
    console.log(
      "Annual Remayment Check Credit Card",
      values,
      index.replace(/[^0-9]+/g, "")
    );
    let RepaymentsAmount = parseFloat(
      values.creditCards[
        index.replace(/[^0-9]+/g, "")
      ]?.RepaymentsAmount?.replace(/[^0-9.-]+/g, "") || 0
    );
    let Frequency = parseFloat(
      values.creditCards[index.replace(/[^0-9]+/g, "")]?.Frequency || 0
    );

    console.log(currentInput.name, currentInput.name.split(".").pop());

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

  const onSubmit = async (values) => {
    const creditCardData = values.creditCards;
    const DataOf = "client";

    const obj = {
      clientFK: localStorage.getItem("UserID"),
      [DataOf]: creditCardData,
      [DataOf + "Total"]: toCommaAndDollar(
        creditCardData.reduce(
          (total, entry) =>
            total +
            parseFloat(entry.AnnualRepayments?.replace(/[^0-9.-]+/g, "") || 0),
          0
        )
      ),
    };

    setQuestionDetail((prev) => ({
      ...prev,
      creditCards: {
        ...prev.creditCards,
        ["client"]: creditCardData,
      },
    }));

    try {
      let res;
      const bankAccountArray = creditCards.clientFK || "";
      if (!bankAccountArray) {
        res = await PostAxios(`${DefaultUrl}/api/creditCards/Add`, obj);
      } else {
        obj.collection = "client";
        res = await PatchAxios(`${DefaultUrl}/api/creditCards/Update`, obj);
      }

      if (res) {
        const updatedData = { ...questionDetail, creditCards: res };
        setQuestionDetail(updatedData);
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        `Data of "${props.modalObject.title}" is Saved`
      );

      if (props.setFieldValue)
        props.setFieldValue("creditCards", creditCardData);
      if (props.flagState) {
        props.setFlagState(false);
        props.setIsEditing(!props.isEditing);
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
      selectedOptionValue: true,
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
      selectedOptionValue: true,
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
        }, [creditCards["client"]]);

        const dataRows = useMemo(() => {
          const num = Number(values.NumberOfMap) || 0;
          if (num > 0) {
            return Array.from({ length: num }, (_, i) => ({
              key: `creditCard.${i}`,
              stakeHolder: `creditCards[${i}]`,
              LenderCurrent: values.creditCards?.[i]?.LenderCurrent || "",
              LoanBalance: values.creditCards?.[i]?.LoanBalance || "",
              LoanType: values.creditCards?.[i]?.LoanType || "",
              RepaymentsAmount: values.creditCards?.[i]?.RepaymentsAmount || "",
              Frequency: values.creditCards?.[i]?.Frequency || "",
              AnnualRepayments: values.creditCards?.[i]?.AnnualRepayments || "",
              InterestRate: values.creditCards?.[i]?.InterestRate || "",
              LoanTerm: values.creditCards?.[i]?.LoanTerm || "",
              LoanTermRemaining:
                values.creditCards?.[i]?.LoanTermRemaining || "",
            }));
          }
          return [];
        }, [values.NumberOfMap, values.creditCards]);

        return (
          <Form>
            <div className="d-flex justify-content-center align-items-center gap-4">
              <p
                className="text-end mt-1 pt-2"
                onClick={() => {
                  console.log(values);
                }}
              >
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
                  handleSubmit={props?.handleOk}
                  isEditing={props?.isEditing}
                  setIsEditing={props?.setIsEditing}
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

export default CreditCard;
