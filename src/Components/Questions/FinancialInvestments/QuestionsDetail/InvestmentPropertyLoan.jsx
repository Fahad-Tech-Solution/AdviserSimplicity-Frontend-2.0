import { Field, Form, Formik } from "formik";
import React, { useEffect, useState, useMemo } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  BankDetail,
  defaultUrl,
  QuestionDetail,
} from "../../../../Store/Store";
import {
  handleInputBlur,
  handleInputChange,
  handleInputFocus,
  handleInputKeyDown,
  PatchAxios,
  PostAxios,
  toCommaAndDollar,
  toPercentage,
} from "../../../Assets/Api/Api";
import axios from "axios";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";

const InvestmentPropertyLoan = (props) => {
  console.log("props in investment property loan", props);
  let bankDetailObj = useRecoilValue(BankDetail);

  let [lenderOption, setLenderOption] = useState(() => {
    if (!bankDetailObj?.FinancialInstitutions) return [];

    // Create an options array
    const optionsArray = bankDetailObj.FinancialInstitutions.map((elem) => ({
      value: elem._id,
      label: elem.platformName,
    }));

    return optionsArray;
  });

  let optionsFrequency = [
    { value: 52, label: "Weekly" },
    { value: 26, label: "Fortnightly" },
    { value: 12, label: "Monthly" },
    { value: 1, label: "Annually" },
  ];

  let [nameSet] = useState(() => {
    if (props.modalObject.Input === "client") {
      return localStorage.getItem("UserName");
    } else if (props.modalObject.Input === "partner") {
      return localStorage.getItem("PartnerName");
    } else if (props.modalObject.Input === "joint") {
      return (
        localStorage.getItem("UserName") +
        " & " +
        localStorage.getItem("PartnerName")
      );
    }
  });

  let initialValues = { NumberOfMap: "1", DeductibleLoanAmount: "100%" };

  const fillInitialValues = (setFieldValue) => {
    let index = props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "");
    let propertyLoanData =
      props.modalObject.values?.[
        props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "")
      ]?.[index]?.[props.modalObject.key + "Array"];

    // If we found data, populate form fields dynamically
    if (
      propertyLoanData &&
      Array.isArray(propertyLoanData) &&
      propertyLoanData.length > 0
    ) {
      propertyLoanData.map((data, index) => {
        setFieldValue(`LenderCurrent`, data.LenderCurrent || "");
        setFieldValue(`LoanBalance`, data.LoanBalance || "");
        setFieldValue(`LoanType`, data.LoanType || "");
        setFieldValue(`RepaymentsAmount`, data.RepaymentsAmount || "");
        setFieldValue(`Frequency`, data.Frequency || "");
        setFieldValue(`AnnualRepayments`, data.AnnualRepayments || "");
        setFieldValue(`InterestRate`, data.InterestRate || "");
        setFieldValue(`LoanTerm`, data.LoanTerm || "");
        setFieldValue(`LoanTermRemaining`, data.LoanTermRemaining || "");
        setFieldValue(`DeductibleLoanAmount`, data.DeductibleLoanAmount || "");
      });
    } else {
      props.setIsEditing(true);
    }
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    // Extract the number of maps from the values
    const numberOfMaps = parseInt(values.NumberOfMap, 10);
    const newEntries = [];

    // Iterate through each map entry and create a new object
    for (let i = 0; i < numberOfMaps; i++) {
      const newEntry = {
        LenderCurrent: values[`LenderCurrent`] || "",
        LoanBalance: values[`LoanBalance`] || "",
        LoanType: values[`LoanType`] || "",
        RepaymentsAmount: values[`RepaymentsAmount`] || "",
        Frequency: values[`Frequency`] || "",
        AnnualRepayments: values[`AnnualRepayments`] || "",
        InterestRate: values[`InterestRate`] || "",
        LoanTerm: values[`LoanTerm`] || "",
        LoanTermRemaining: values[`LoanTermRemaining`] || "",
        DeductibleLoanAmount: values[`DeductibleLoanAmount`] || "",
      };
      newEntries.push(newEntry);
    }

    // Log the new entries to verify
    console.log("newEntries", newEntries);

    let total = newEntries.reduce(
      (total, entry) =>
        total +
        (parseFloat(entry.AnnualRepayments.replace(/[^0-9.-]+/g, "")) || 0),
      0
    );

    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}Array`,
      newEntries
    );
    // props.setFieldValue(`${props.modalObject.key3}${props.modalObject.index}`, total)
    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}`,
      toCommaAndDollar(total)
    );

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  const options = [
    "Adelaide Bank",
    "Alliance Bank",
    "AMP",
    "ANZ",
    "Arab Bank Australia",
    "Australian Military Bank (ADCU)",
    "Australian Mutual Bank",
    "Australian Unity",
    "Auswide Bank",
    "AWA Alliance Bank",
    "Bank Australia (bankmecu)",
    "Bank First",
    "Bank of Melbourne",
    "Bank of Queensland (BOQ)",
    "Bank of Sydney",
    "BankSA",
    "BankVic",
    "Bankwest",
    "BCU",
    "BDCU Alliance Bank",
    "Bendigo Bank",
    "Beyond Bank",
    "Border Bank",
    "Circle Alliance Bank",
    "Citi",
    "Commonwealth Bank",
    "Community First Bank",
    "Credit Union SA",
    "Defence Bank",
    "Delphi Bank",
    "Easy Street",
    "First Choice Credit Union",
    "First Option Bank",
    "firstmac",
    "G&C Mutual",
    "Gateway Bank Ltd",
    "Geelong Bank",
    "Great Southern Bank",
    "Greater Bank",
    "Hay",
    "Heartland Bank",
    "Heritage Bank",
    "Horizon Bank",
    "HSBC Australia",
    "Hume Bank",
    "Illawarra Credit Union",
    "IMB",
    "ING",
    "Judo Bank",
    "Macquarie Bank",
    "ME",
    "MOVE Bank",
    "MyState Bank",
    "NAB",
    "Newcastle Permanent",
    "P&N Bank",
    "People’s Choice CU",
    "Policebank",
    "Prospa",
    "Qudos Bank",
    "Rabobank",
    "RACQ",
    "RAMS",
    "Regional Australia Bank",
    "Rural Bank",
    "Service One Alliance Bank",
    "St.George",
    "Suncorp Bank",
    "Teachers Mutual Bank",
    "Ubank",
    "UniBank",
    "Up Bank",
    "Virgin Money",
    "Westpac",
    "Zeller",
  ];

  const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
    value: (i + 1).toString(),
    label: ("Year " + (i + 1)).toString(),
  }));

  let FormulaSetting = () => {};
  let optionsLender = [
    { value: "i/only", label: "i/only" },
    { value: "P&I", label: "P&I" },
  ];
  const calculateAnnualRepayments = (
    values,
    setFieldValue,
    thisInput,
    stakeHolder
  ) => {
    console.log(
      values,
      thisInput.value,
      stakeHolder,
      "calculateAnnualRepayments111"
    );

    // safely extract numeric values
    const cleanNumber = (val) => {
      if (val === undefined || val === null) return 0;
      if (typeof val === "number") return val;
      const cleaned = String(val).replace(/[^0-9.-]+/g, "");
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 0 : parsed;
    };

    let repaymentsAmount = cleanNumber(values?.RepaymentsAmount);
    let frequency = cleanNumber(values?.Frequency);

    // Handle real-time updates from current input
    switch (thisInput.name) {
      case "RepaymentsAmount":
        repaymentsAmount = cleanNumber(thisInput.value);
        break;
      case "Frequency":
        frequency = cleanNumber(thisInput.value);
        break;
      default:
        break;
    }

    console.log(repaymentsAmount, frequency, "repaymentsAmount, frequency");

    const annualRepayments = repaymentsAmount * frequency;

    // ✅ Corrected field path
    setFieldValue(`AnnualRepayments`, toCommaAndDollar(annualRepayments || 0));
  };

  const AntDTableHOC = DynamicTableForInputsSection("antd");

  const columns = [
    // {
    //   title: "Owner",
    //   dataIndex: "owner",
    //   key: "owner",
    //   type: "text", // simple static text or could be DynamicFormField if editable
    //   placeholder: "Enter Owner Name",
    //   width: 150,
    // },
    {
      title: "Lender",
      dataIndex: "LenderCurrent",
      key: "LenderCurrent",
      type: "select", // simple static text or could be DynamicFormField if editable
      options: lenderOption,
      width: 150,
      selectedOptionValue: true,
    },
    {
      title: "Loan Balance",
      dataIndex: "LoanBalance",
      key: "LoanBalance",
      type: "number-toComma",
      placeholder: "Loan Balance",
      width: 200,
    },
    {
      title: "Loan Type",
      dataIndex: "LoanType",
      key: "LoanType",
      type: "select", // simple static text or could be DynamicFormField if editable
      options: optionsLender,
      width: 150,
    },
    {
      title: "Repayments Amount",
      dataIndex: "RepaymentsAmount",
      key: "RepaymentsAmount",
      type: "number-toComma",
      placeholder: "Repayments Amount",
      width: 200,
      callBack: true,
      func: calculateAnnualRepayments,
    },
    {
      title: "Frequency",
      dataIndex: "Frequency",
      key: "Frequency",
      type: "select", // simple static text or could be DynamicFormField if editable
      options: optionsFrequency,
      width: 150,
      callBack: true,
      func: calculateAnnualRepayments,
      selectedOptionValue: true,
    },
    {
      title: "Annual Repayments",
      dataIndex: "AnnualRepayments",
      key: "AnnualRepayments",
      type: "number-toComma", // simple static text or could be DynamicFormField if editable
      placeholder: "Annual Repayments",
      disabled: true,
      width: 150,
    },
    {
      title: "Interest Rate",
      dataIndex: "InterestRate",
      key: "InterestRate",
      type: "number-toPercent",
      placeholder: "Interest Rate",
      width: 200,
    },
    {
      title: "Loan Term",
      dataIndex: "LoanTerm",
      key: "LoanTerm",
      type: "select", // simple static text or could be DynamicFormField if editable
      options: loanTermOptions,
      width: 150,
    },
    {
      title: "Loan Term Remaining",
      dataIndex: "LoanTermRemaining",
      key: "LoanTermRemaining",
      type: "select", // simple static text or could be DynamicFormField if editable
      options: loanTermOptions,
      width: 150,
    },
    {
      title: "Deductible Loan Amount",
      dataIndex: "DeductibleLoanAmount",
      key: "DeductibleLoanAmount",
      type: "number-toPercent",
      placeholder: "Deductible Loan Amount",
      width: 200,
    },
  ];

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
        const tableData = useMemo(() => {
          // console.log("values:", values);
          const rows = [
            {
              key: 0,
              owner: nameSet,
              LenderCurrent: values?.LenderCurrent || "",
              LoanBalance: values?.LoanBalance || "",
              LoanType: values?.LoanType || "",
              RepaymentsAmount: values?.RepaymentsAmount || "",
              Frequency: values?.Frequency || "",
              AnnualRepayments: values?.AnnualRepayments || "",
              InterestRate: values?.InterestRate || "",
              LoanTerm: values?.LoanTerm || "",
              LoanTermRemaining: values?.LoanTermRemaining || "",
              DeductibleLoanAmount: values?.DeductibleLoanAmount || "",
            },
          ];

          return rows;
        }, [values]);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="col-md-5 d-none">
                    <p
                      className="text-end mt-1"
                      onClick={() => {
                        console.log(values);
                      }}
                    >
                      How many {props.modalObject.title} does {nameSet} have :
                    </p>
                  </div>
                  <div className="col-md-2 d-none">
                    <Field
                      type="number"
                      id="NumberOfMap"
                      name="NumberOfMap"
                      className="form-control inputDesignDoubleInput"
                      onChange={(e) => handleInput(e, setFieldValue)}
                    />
                  </div>
                  {values.NumberOfMap && (
                    <div className="mt-4 All_Client reportSection">
                      <AntDTableHOC
                        columns={columns}
                        data={tableData}
                        values={values}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        isEditing={props?.isEditing}
                        setIsEditing={props?.setIsEditing}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default InvestmentPropertyLoan;
