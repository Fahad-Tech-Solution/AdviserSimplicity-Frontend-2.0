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

  let initialValues = { NumberOfMap: "1" };

  // const fillInitialValues = (setFieldValue) => {
  //   let arr = [];
  //   // if (props.modalObject.editArray.length) {
  //   //   props.modalObject.editArray.map((data, index) => {
  //   //     setFieldValue(`LenderCurrent${index}`, data.LenderCurrent);
  //   //     setFieldValue(`LoanBalance${index}`, data.LoanBalance);
  //   //     setFieldValue(`LoanType${index}`, data.LoanType);
  //   //     setFieldValue(`RepaymentsAmount${index}`, data.RepaymentsAmount);
  //   //     setFieldValue(`Frequency${index}`, data.Frequency);
  //   //     setFieldValue(`AnnualRepayments${index}`, data.AnnualRepayments);
  //   //     setFieldValue(`InterestRate${index}`, data.InterestRate);
  //   //     setFieldValue(`LoanTerm${index}`, data.LoanTerm);
  //   //     setFieldValue(`LoanTermRemaining${index}`, data.LoanTermRemaining);
  //   //     setFieldValue(
  //   //       `DeductibleLoanAmount${index}`,
  //   //       data.DeductibleLoanAmount
  //   //     );
  //   //   });
  //   // }
  // };

  const fillInitialValues = (setFieldValue) => {
    console.log("props.modalObject Loan", props.modalObject);
    // console.log(
    //   "props.modalObject Loan",
    //   props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
    // );
    // Extract index (the number part) from stakeHolder, e.g. "client1" -> 1
    let index = props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "");

    let propertyLoanData =
      props.modalObject.values?.[
        props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "")
      ]?.[index]?.[props.modalObject.key + "Array"];
    console.log("fillInitialValues -> loan", propertyLoanData);

    // If we found data, populate form fields dynamically
    if (propertyLoanData && propertyLoanData.length) {
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
    stackHolder
  ) => {
    console.log(
      values,
      thisInput.value,
      stackHolder,
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

    let repaymentsAmount = cleanNumber(
      values?.[stackHolder.replace(".", "")]?.repaymentsAmount
    );
    let frequency = cleanNumber(
      values?.[stackHolder.replace(".", "")]?.frequency
    );

    // Handle real-time updates from current input
    switch (thisInput.name) {
      case stackHolder + "repaymentsAmount":
        repaymentsAmount = cleanNumber(thisInput.value);
        break;
      case stackHolder + "frequency":
        frequency = cleanNumber(thisInput.value);
        break;
      default:
        break;
    }

    console.log(repaymentsAmount, frequency, "repaymentsAmount, frequency");

    const annualRepayments = repaymentsAmount * frequency;

    // ✅ Corrected field path
    setFieldValue(
      `${stackHolder}annualRepayments`,
      toCommaAndDollar(annualRepayments || 0)
    );
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
                    <p className="text-end mt-1">
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
                      {/* <Table striped bordered responsive hover>
                                                <thead>
                                                    <tr>
                                                        <th>No#</th>
                                                        <th>Lender</th>
                                                        <th>Loan Balance</th>
                                                        <th>Loan Type</th>
                                                        <th>Repayments Amount</th>
                                                        <th>Frequency</th>
                                                        <th>Annual Repayments</th>
                                                        <th>Interest Rate (p.a)</th>
                                                        <th>Loan Term</th>
                                                        <th>Loan Term Remaining</th>
                                                        <th>Deductible Loan Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Array.from({ length: values.NumberOfMap }).map((_, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{1 + i}</td>
                                                                <td>
                                                                    <Field
                                                                        style={{ width: "150px" }}
                                                                        as="select"
                                                                        placeholder="Lender Current"
                                                                        id={`LenderCurrent${i}`}
                                                                        name={`LenderCurrent${i}`}
                                                                        className="form-select inputDesignDoubleInput"
                                                                    >
                                                                        <option value={""}>Please Select</option>
                                                                        {
                                                                            bankDetailObj?.FinancialInstitutions && bankDetailObj.FinancialInstitutions.length > 0 ? (
                                                                                bankDetailObj.FinancialInstitutions.map((elem, index) => (
                                                                                    <option key={index} value={elem._id}>
                                                                                        {elem.platformName}
                                                                                    </option>
                                                                                ))
                                                                            ) : (
                                                                                <option disabled>No Platforms Added in Super Annuation Funds</option>
                                                                            )
                                                                        }
                                                                    </Field>
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Loan Balance"
                                                                        id={`LoanBalance${i}`}
                                                                        name={`LoanBalance${i}`}
                                                                        className="form-control inputDesignDoubleInput"
                                                                        onChange={(e) => {
                                                                            setFieldValue(e.target.name,
                                                                                toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        as="select"
                                                                        placeholder="Lender Current"
                                                                        id={`LoanType${i}`}
                                                                        name={`LoanType${i}`}
                                                                        className="form-select inputDesignDoubleInput"
                                                                    >
                                                                        <option value={""}>Please Select</option>
                                                                        <option value={"i/only"}>i/only</option>
                                                                        <option value={"P&I"}>P&I</option>
                                                                    </Field>
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Repayments Amount"
                                                                        id={`RepaymentsAmount${i}`}
                                                                        name={`RepaymentsAmount${i}`}
                                                                        className="form-control inputDesignDoubleInput"
                                                                        onChange={(e) => {
                                                                            setFieldValue(e.target.name,
                                                                                toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));

                                                                            let frequency = values[`Frequency${i}`] || 0;
                                                                            let RepaymentsAmount = parseFloat(e.target.value.replace(/[^0-9.-]+/g, "")) || 0;

                                                                            setFieldValue(`AnnualRepayments${i}`, toCommaAndDollar(RepaymentsAmount * frequency));


                                                                        }}
                                                                    />
                                                                </td>

                                                                <td>
                                                                    <Field
                                                                        style={{ width: "150px" }}
                                                                        as="select"
                                                                        placeholder="Lender Current"
                                                                        id={`Frequency${i}`}
                                                                        name={`Frequency${i}`}
                                                                        className="form-select inputDesignDoubleInput"
                                                                        onChange={(e) => {
                                                                            setFieldValue(`Frequency${i}`, e.target.value);

                                                                            let frequency = e.target.value;
                                                                            let RepaymentsAmount = parseFloat(values[`RepaymentsAmount${i}`].replace(/[^0-9.-]+/g, ""));

                                                                            setFieldValue(`AnnualRepayments${i}`, toCommaAndDollar(RepaymentsAmount * frequency));
                                                                        }}
                                                                    >
                                                                        <option value={""}>Please Select</option>
                                                                        <option value={52}>Weekly </option>
                                                                        <option value={26}>Fortnightly </option>
                                                                        <option value={12}>Monthly </option>
                                                                        <option value={1}>Annually </option>

                                                                    </Field>
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Annual Repayments"
                                                                        id={`AnnualRepayments${i}`}
                                                                        name={`AnnualRepayments${i}`}
                                                                        disabled
                                                                        className="form-control inputDesignDoubleInput"
                                                                        onChange={(e) => {
                                                                            setFieldValue(e.target.name,
                                                                                toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Interest Rate (p.a)"
                                                                        id={`InterestRate${i}`}
                                                                        name={`InterestRate${i}`}
                                                                        onChange={(e) => handleInputChange(e, setFieldValue, FormulaSetting, values)}
                                                                        onFocus={(e) => handleInputFocus(e, setFieldValue)}
                                                                        onKeyDown={(e) => handleInputKeyDown(e)}
                                                                        onBlur={(e) => handleInputBlur(e, setFieldValue, toPercentage, FormulaSetting, values)}
                                                                        className="form-control inputDesignDoubleInput"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        as="select"
                                                                        placeholder="Lender Current"
                                                                        id={`LoanTerm${i}`}
                                                                        name={`LoanTerm${i}`}
                                                                        className="form-select inputDesignDoubleInput"
                                                                    >
                                                                        <option value={""}>Please Select</option>
                                                                        {loanTermOptions.map((option) => (
                                                                            <option key={option.value} value={option.value}>
                                                                                {option.label}
                                                                            </option>
                                                                        ))}
                                                                    </Field>
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        as="select"
                                                                        placeholder="Lender Current"
                                                                        id={`LoanTermRemaining${i}`}
                                                                        name={`LoanTermRemaining${i}`}
                                                                        className="form-select inputDesignDoubleInput"
                                                                    >
                                                                        <option value={""}>Please Select</option>
                                                                        {loanTermOptions.map((option) => (
                                                                            <option key={option.value} value={option.value}>
                                                                                {option.label}
                                                                            </option>
                                                                        ))}

                                                                    </Field>
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Deductible Loan Amount"
                                                                        id={`DeductibleLoanAmount${i}`}
                                                                        name={`DeductibleLoanAmount${i}`}
                                                                        onChange={(e) => handleInputChange(e, setFieldValue, FormulaSetting, values)}
                                                                        onFocus={(e) => handleInputFocus(e, setFieldValue)}
                                                                        onKeyDown={(e) => handleInputKeyDown(e)}
                                                                        onBlur={(e) => handleInputBlur(e, setFieldValue, toPercentage, FormulaSetting, values)}
                                                                        className="form-control inputDesignDoubleInput"
                                                                    />
                                                                </td>
                                                            </tr>)
                                                    })}
                                                </tbody>
                                            </Table> */}
                      <AntDTableHOC
                        columns={columns}
                        data={tableData}
                        values={values}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
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
