import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { BankDetail, QuestionDetail } from "../../../Store/Store";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import { toCommaAndDollar } from "../../Assets/Api/Api";

const AntdTable = DynamicTableForInputsSection("antd");

const HomeLoan = (props) => {
  const bankDetailObj = useRecoilValue(BankDetail);

  let [lenderOption, setLenderOption] = useState(() => {
    if (!bankDetailObj?.FinancialInstitutions) return [];

    // Create an options array
    const optionsArray = bankDetailObj.FinancialInstitutions.map((elem) => ({
      value: elem._id,
      label: elem.platformName,
    }));

    return optionsArray;
  });

  const AnnualFormula = (values, setFieldValue, currentInput, stakeHolder) => {
    let repaymentsAmount =
      parseFloat(values?.repaymentsAmount?.replace(/[^0-9.-]+/g, "") || 0) || 0;
    let frequency = parseFloat(values?.frequency || 0) || 0;

    // if the user is currently editing one of these, update it in memory
    const fieldName = currentInput.name.split(".").pop();
    if (fieldName === "repaymentsAmount") {
      repaymentsAmount =
        parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
    } else if (fieldName === "frequency") {
      frequency = parseFloat(currentInput.value) || 0;
    }

    const annualRepayments = frequency * repaymentsAmount;
    console.log(
      "clculated Values",
      annualRepayments,
      frequency,
      repaymentsAmount
    );
    setFieldValue(`annualRepayments`, toCommaAndDollar(annualRepayments));
  };

  const fillInitialValues = (setFieldValue) => {
    if (props.modalObject?.values?.HomeLoanModal) {
      const data = props.modalObject.values.HomeLoanModal;
      Object.keys(data).forEach((key) => {
        setFieldValue(key, data[key]);
      });
    } else {
      props.setIsEditing(!props.isEditing);
    }
  };

  const onSubmit = async (values) => {
    props.setFieldValue("HomeLoanModal", values);
    props.setFieldValue("loanAmount", values.loanBalance);
    props.setFieldValue("annualRepayments", values.annualRepayments);

    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `Year ${i + 1}`,
  }));

  // ✅ AntD column config
  const columns = [
    {
      title: "Lender",
      dataIndex: "lender",
      key: "lender",
      type: "select",
      selectedOptionValue: true,
      options: lenderOption,
      placeholder: "Lender",
      width: 260,
    },
    {
      title: "Loan Balance",
      dataIndex: "loanBalance",
      key: "loanBalance",
      type: "number-toComma",
      placeholder: "Loan Balance",
    },
    {
      title: "Loan Type",
      dataIndex: "loanType",
      key: "loanType",
      type: "select",
      options: [
        { value: "i/only", label: "i/only" },
        { value: "P&i", label: "P&i" },
      ],
    },
    {
      title: "Repayments Amount",
      dataIndex: "repaymentsAmount",
      key: "repaymentsAmount",
      type: "number-toComma",
      placeholder: "Repayments Amount",
      callBack: true,
      func: AnnualFormula,
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      type: "select",
      selectedOptionValue: true,
      callBack: true,
      func: AnnualFormula,
      options: [
        { value: "52", label: "Weekly" },
        { value: "26", label: "Fortnightly" },
        { value: "12", label: "Monthly" },
        { value: "1", label: "Annually" },
      ],
      styleSet: { width: "200px" },
    },
    {
      title: "Annual Repayments",
      dataIndex: "annualRepayments",
      key: "annualRepayments",
      type: "number-toComma",
      placeholder: "Annual Repayments",
      disabled: true,
    },
    {
      title: "Interest Rate (p.a)",
      dataIndex: "interestRatePA",
      key: "interestRatePA",
      type: "number-toPercent",
      placeholder: "Interest Rate (p.a)",
    },
    {
      title: "Loan Term",
      dataIndex: "loanTerm",
      key: "loanTerm",
      type: "select",
      options: loanTermOptions,
    },
    {
      title: "Loan Term Remaining",
      dataIndex: "loanTermRemaining",
      key: "loanTermRemaining",
      type: "select",
      options: loanTermOptions,
    },
  ];

  return (
    <Formik
      initialValues={{}}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        const dataRows = values.HomeLoan || [
          {
            key: "0",
            lender: values.lender,
            loanBalance: values.loanBalance,
            loanType: values.loanType,
            repaymentsAmount: values.repaymentsAmount,
            frequency: values.frequency,
            annualRepayments: values.annualRepayments,
            interestRatePA: values.interestRatePA,
            loanTerm: values.loanTerm,
            loanTermRemaining: values.loanTermRemaining,
          },
        ];

        return (
          <Form>
            {dataRows.length > 0 && (
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
          </Form>
        );
      }}
    </Formik>
  );
};

export default HomeLoan;
