import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  BankDetail,
  defaultUrl,
  QuestionDetail,
} from "../../../../Store/Store";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
  toCommaAndDollar,
} from "../../../Assets/Api/Api";
import axios from "axios";
import DynamicTableRow from "../../../Assets/Dynamic/DynamicTableRow";
import {
  AntdCreatableMultiSelect,
  CreatableMultiSelectField,
} from "./CreatableMultiSelectField";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";

const InvestmentLoan = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

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

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));

  let managedFundsLOC =
    Object.keys(questionDetail[props.modalObject.key] || {}).length > 0
      ? questionDetail[props.modalObject.key]
      : {
          client: [],
          partner: [],
          joint: [],
        }; // Use an empty object as default if managedFundsLOC is undefined

  let initialValues = {
    owner: "",
    client: {
      deductibleLoanAmount: "100%",
    },
    partner: {
      deductibleLoanAmount: "100%",
    },
    joint: {
      deductibleLoanAmount: "100%",
    },
  };

  const fillInitialValues = (setFieldValue) => {
    console.log(managedFundsLOC);

    if (managedFundsLOC && managedFundsLOC._id) {
      // Set the owner field, which is now an array
      setFieldValue(`owner`, managedFundsLOC.owner || []);

      // For client-related fields if "client" is included in the owner array
      if (managedFundsLOC.owner.includes("client")) {
        if (
          managedFundsLOC?.client &&
          Object.keys(managedFundsLOC?.client).length
        ) {
          setFieldValue(`client.lender`, managedFundsLOC.client.lender || "");
          setFieldValue(
            `client.loanBalance`,
            managedFundsLOC.client.loanBalance || ""
          );
          setFieldValue(
            `client.loanType`,
            managedFundsLOC.client.loanType || ""
          );
          setFieldValue(
            `client.repaymentsAmount`,
            managedFundsLOC.client.repaymentsAmount || ""
          );
          setFieldValue(
            `client.frequency`,
            managedFundsLOC.client.frequency || ""
          );
          setFieldValue(
            `client.annualRepayments`,
            managedFundsLOC.client.annualRepayments || ""
          );
          setFieldValue(
            `client.serviceFeeType`,
            managedFundsLOC.client.serviceFeeType || ""
          );
          setFieldValue(
            `client.interestRate`,
            managedFundsLOC.client.interestRate || ""
          );
          setFieldValue(
            `client.loanTerm`,
            managedFundsLOC.client.loanTerm || ""
          );
          setFieldValue(
            `client.loanTermRemaining`,
            managedFundsLOC.client.loanTermRemaining || ""
          );
          setFieldValue(
            `client.deductibleLoanAmount`,
            managedFundsLOC.client.deductibleLoanAmount || ""
          );
        }
      }

      // For partner-related fields if "partner" is included in the owner array and user status is "Married"
      if (
        UserStatus === "Married" &&
        managedFundsLOC.owner.includes("partner")
      ) {
        if (
          managedFundsLOC?.partner &&
          Object.keys(managedFundsLOC?.partner).length
        ) {
          setFieldValue(`partner.lender`, managedFundsLOC.partner.lender || "");
          setFieldValue(
            `partner.loanBalance`,
            managedFundsLOC.partner.loanBalance || ""
          );
          setFieldValue(
            `partner.loanType`,
            managedFundsLOC.partner.loanType || ""
          );
          setFieldValue(
            `partner.repaymentsAmount`,
            managedFundsLOC.partner.repaymentsAmount || ""
          );
          setFieldValue(
            `partner.frequency`,
            managedFundsLOC.partner.frequency || ""
          );
          setFieldValue(
            `partner.annualRepayments`,
            managedFundsLOC.partner.annualRepayments || ""
          );
          setFieldValue(
            `partner.serviceFeeType`,
            managedFundsLOC.partner.serviceFeeType || ""
          );
          setFieldValue(
            `partner.interestRate`,
            managedFundsLOC.partner.interestRate || ""
          );
          setFieldValue(
            `partner.loanTerm`,
            managedFundsLOC.partner.loanTerm || ""
          );
          setFieldValue(
            `partner.loanTermRemaining`,
            managedFundsLOC.partner.loanTermRemaining || ""
          );
          setFieldValue(
            `partner.deductibleLoanAmount`,
            managedFundsLOC.partner.deductibleLoanAmount || ""
          );
        }
      }

      // For joint-related fields if "joint" is included in the owner array
      if (managedFundsLOC.owner.includes("joint")) {
        if (
          managedFundsLOC?.joint &&
          Object.keys(managedFundsLOC?.joint).length
        ) {
          setFieldValue(`joint.lender`, managedFundsLOC.joint.lender || "");
          setFieldValue(
            `joint.loanBalance`,
            managedFundsLOC.joint.loanBalance || ""
          );
          setFieldValue(`joint.loanType`, managedFundsLOC.joint.loanType || "");
          setFieldValue(
            `joint.repaymentsAmount`,
            managedFundsLOC.joint.repaymentsAmount || ""
          );
          setFieldValue(
            `joint.frequency`,
            managedFundsLOC.joint.frequency || ""
          );
          setFieldValue(
            `joint.annualRepayments`,
            managedFundsLOC.joint.annualRepayments || ""
          );
          setFieldValue(
            `joint.serviceFeeType`,
            managedFundsLOC.joint.serviceFeeType || ""
          );
          setFieldValue(
            `joint.interestRate`,
            managedFundsLOC.joint.interestRate || ""
          );
          setFieldValue(`joint.loanTerm`, managedFundsLOC.joint.loanTerm || "");
          setFieldValue(
            `joint.loanTermRemaining`,
            managedFundsLOC.joint.loanTermRemaining || ""
          );
          setFieldValue(
            `joint.deductibleLoanAmount`,
            managedFundsLOC.joint.deductibleLoanAmount || ""
          );
        }
      }
    }
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    console.log(values, "values");
    let obj = values;
    obj.clientFK = localStorage.getItem("UserID");

    let fiftyPercent;

    try {
      // Safely parse the value after removing non-numeric characters
      let annualRepayments =
        parseFloat(
          (obj.joint?.annualRepayments || "0").replace(/[^0-9.-]+/g, "")
        ) *
        parseFloat(
          (obj.joint?.serviceFeeType || "0").replace(/[^0-9.-]+/g, "")
        );

      // Check if the parsed value is a valid number
      if (isNaN(annualRepayments) || annualRepayments === undefined) {
        fiftyPercent = 0; // Set to 0 if invalid
      } else {
        fiftyPercent = annualRepayments / 2; // Calculate fifty percent if valid
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error calculating fiftyPercent:", error);
      fiftyPercent = 0; // Set to 0 in case of error
    }

    // For "client" related calculations
    if (values.owner.includes("client")) {
      console.log(obj.client, "obj.client");
      obj.clientTotal = toCommaAndDollar(
        parseFloat(obj.client.annualRepayments.replace(/[^0-9.-]+/g, "")) *
          parseFloat(obj.client.frequency.replace(/[^0-9.-]+/g, "")) +
          fiftyPercent
      );
    } else if (values.owner.includes("joint")) {
      obj.clientTotal = toCommaAndDollar(fiftyPercent);
    } else {
      obj.clientTotal = "";
      obj.client = {};
    }

    // For "partner" related calculations
    if (values.owner.includes("partner") && UserStatus === "Married") {
      obj.partnerTotal = toCommaAndDollar(
        parseFloat(obj.partner?.annualRepayments.replace(/[^0-9.-]+/g, "")) *
          parseFloat(obj.partner?.frequency.replace(/[^0-9.-]+/g, "")) +
          fiftyPercent
      );
    } else if (values.owner.includes("joint")) {
      obj.partnerTotal = toCommaAndDollar(fiftyPercent);
    } else {
      obj.partnerTotal = "";
      obj.partner = {};
    }

    // If the user status is not married, reset partner-related data
    if (UserStatus !== "Married") {
      obj.partnerTotal = "";
      obj.partner = {};
    }

    console.log(obj, "final obj");

    // Check if managedFundsLOC and the array at props.modalObject.Input exist
    const bankAccountArray = managedFundsLOC.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        // Make a POST request if no bank account is found
        res = await PostAxios(
          `${DefaultUrl}/api/${props.modalObject.key}/Add`,
          obj
        );
      } else {
        // Make a PATCH request if a bank account is found
        res = await PatchAxios(
          `${DefaultUrl}/api/${props.modalObject.key}/Update`,
          obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = {
          ...questionDetail,
          [props.modalObject.key]: res,
        };
        setQuestionDetail(updatedData);
      }
      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        `Data of "${props.modalObject.title}" is Saved`
      );

      // Reset flag state if necessary
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
        `Data of "${props.modalObject.title}" is not saved. Please try again!`
      );
    }
  };

  let optionsLender = [
    { value: "i/only", label: "i/only" },
    { value: "P&I", label: "P&I" },
  ];

  let optionsFrequency = [
    { value: 52, label: "Weekly" },
    { value: 26, label: "Fortnightly" },
    { value: 12, label: "Monthly" },
    { value: 1, label: "Annually" },
  ];

  const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
    value: (i + 1).toString(),
    label: ("Year " + (i + 1)).toString(),
  }));
  const calculateAnnualRepayments = (
    values,
    setFieldValue,
    thisInput,
    stackHolder
  ) => {
    console.log(
      // values,
      // thisInput.value,
      stackHolder,
      "calculateAnnualRepayments"
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

  

  const options =
    UserStatus !== "Single"
      ? [
          { value: "client", label: RenderName("client") },
          { value: "partner", label: RenderName("partner") },
          { value: "joint", label: RenderName("joint") },
        ]
      : [{ value: "client", label: RenderName("client") }];

  const AntDTableHOC = DynamicTableForInputsSection("antd");

  const columns = [
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      type: "text", // simple static text or could be DynamicFormField if editable
      placeholder: "Enter Owner Name",
      width: 150,
    },
    {
      title: "Lender",
      dataIndex: "lender",
      key: "lender",
      type: "select", // simple static text or could be DynamicFormField if editable
      options: lenderOption,
      width: 150,
      selectedOptionValue: true,
    },
    {
      title: "Loan Balance",
      dataIndex: "loanBalance",
      key: "loanBalance",
      type: "number-toComma",
      placeholder: "Loan Balance",
      width: 200,
    },
    {
      title: "Loan Type",
      dataIndex: "loanType",
      key: "loanType",
      type: "select", // simple static text or could be DynamicFormField if editable
      options: optionsLender,
      width: 150,
    },
    {
      title: "Repayments Amount",
      dataIndex: "repaymentsAmount",
      key: "repaymentsAmount",
      type: "number-toComma",
      placeholder: "Repayments Amount",
      width: 200,
      callBack: true,
      func: calculateAnnualRepayments,
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      type: "select", // simple static text or could be DynamicFormField if editable
      options: optionsFrequency,
      width: 150,
      callBack: true,
      func: calculateAnnualRepayments,
      selectedOptionValue: true,
    },
    {
      title: "Annual Repayments",
      dataIndex: "annualRepayments",
      key: "annualRepayments",
      type: "number-toComma", // simple static text or could be DynamicFormField if editable
      placeholder: "Annual Repayments",
      disabled: true,
      width: 150,
    },
    {
      title: "Interest Rate",
      dataIndex: "interestRate",
      key: "interestRate",
      type: "number-toPercent",
      placeholder: "Interest Rate",
      width: 200,
    },
    {
      title: "Loan Term",
      dataIndex: "loanTerm",
      key: "loanTerm",
      type: "select", // simple static text or could be DynamicFormField if editable
      options: loanTermOptions,
      width: 150,
    },
    {
      title: "Loan Term Remaining",
      dataIndex: "loanTermRemaining",
      key: "loanTermRemaining",
      type: "select", // simple static text or could be DynamicFormField if editable
      options: loanTermOptions,
      width: 150,
    },
    {
      title: "Deductible Loan Amount",
      dataIndex: "deductibleLoanAmount",
      key: "deductibleLoanAmount",
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
          const rows = [];

          if (values.owner.includes("client")) {
            rows.push({
              key: "client",
              stakeHolder: "client", // 🔥 pass this to renderCell
              owner: RenderName("client"),
              // lender: values?.client?.lender || "",
              // loanBalance: values?.client?.loanBalance || "",
              ...values.client,
            });
          }

          if (values.owner.includes("partner")) {
            rows.push({
              key: "partner",
              stakeHolder: "partner", // 🔥 pass this to renderCell
              owner: RenderName("partner"),
              ...values.partner,
            });
          }

          return rows;
        }, [values]);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                      <label htmlFor="" className="text-end ">
                        {props.modalObject.title !== "Investment Loan"
                          ? "Members"
                          : "Owner"}
                      </label>

                      {/* <div style={{ minWidth: "25%" }}>
                        <Field
                          name={`owner`}
                          component={CreatableMultiSelectField}
                          label="Multi Select Field"
                          options={options}
                        />
                      </div> */}
                      <div style={{ minWidth: "200px" }}>
                        <Field
                          name={`owner`}
                          component={AntdCreatableMultiSelect}
                          options={options}
                          onChangefun={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                  {values.owner.length > 0 && (
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

export default InvestmentLoan;
