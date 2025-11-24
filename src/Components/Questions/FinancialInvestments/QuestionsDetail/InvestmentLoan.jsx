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

  // Empty initial values
  let initialValues = {};

  const fillInitialValues = (setFieldValue) => {
    console.log(managedFundsLOC);

    // Force set owner based on modal type
    if (props.modalObject.key === "SMSFInvestmentLoan") {
      setFieldValue("owner", ["SMSF"]);
    } else if (props.modalObject.key === "familyInvestmentHomeLoan") {
      setFieldValue("owner", ["trust"]);
    }

    if (managedFundsLOC && managedFundsLOC._id) {
      // For SMSFInvestmentLoan, only set SMSF data
      if (props.modalObject.key === "SMSFInvestmentLoan") {
        if (managedFundsLOC?.SMSF && Object.keys(managedFundsLOC?.SMSF).length) {
          setFieldValue(`SMSF.lender`, managedFundsLOC.SMSF.lender || "");
          setFieldValue(`SMSF.loanBalance`, managedFundsLOC.SMSF.loanBalance || "");
          setFieldValue(`SMSF.loanType`, managedFundsLOC.SMSF.loanType || "");
          setFieldValue(`SMSF.repaymentsAmount`, managedFundsLOC.SMSF.repaymentsAmount || "");
          setFieldValue(`SMSF.frequency`, managedFundsLOC.SMSF.frequency || "");
          setFieldValue(`SMSF.annualRepayments`, managedFundsLOC.SMSF.annualRepayments || "");
          setFieldValue(`SMSF.serviceFeeType`, managedFundsLOC.SMSF.serviceFeeType || "");
          setFieldValue(`SMSF.interestRate`, managedFundsLOC.SMSF.interestRate || "");
          setFieldValue(`SMSF.loanTerm`, managedFundsLOC.SMSF.loanTerm || "");
          setFieldValue(`SMSF.loanTermRemaining`, managedFundsLOC.SMSF.loanTermRemaining || "");
          setFieldValue(`SMSF.deductibleLoanAmount`, managedFundsLOC.SMSF.deductibleLoanAmount || "");
        }
      }
      // For familyInvestmentHomeLoan, only set trust data
      else if (props.modalObject.key === "familyInvestmentHomeLoan") {
        if (managedFundsLOC?.trust && Object.keys(managedFundsLOC?.trust).length) {
          setFieldValue(`trust.lender`, managedFundsLOC.trust.lender || "");
          setFieldValue(`trust.loanBalance`, managedFundsLOC.trust.loanBalance || "");
          setFieldValue(`trust.loanType`, managedFundsLOC.trust.loanType || "");
          setFieldValue(`trust.repaymentsAmount`, managedFundsLOC.trust.repaymentsAmount || "");
          setFieldValue(`trust.frequency`, managedFundsLOC.trust.frequency || "");
          setFieldValue(`trust.annualRepayments`, managedFundsLOC.trust.annualRepayments || "");
          setFieldValue(`trust.serviceFeeType`, managedFundsLOC.trust.serviceFeeType || "");
          setFieldValue(`trust.interestRate`, managedFundsLOC.trust.interestRate || "");
          setFieldValue(`trust.loanTerm`, managedFundsLOC.trust.loanTerm || "");
          setFieldValue(`trust.loanTermRemaining`, managedFundsLOC.trust.loanTermRemaining || "");
          setFieldValue(`trust.deductibleLoanAmount`, managedFundsLOC.trust.deductibleLoanAmount || "");
        }
      }
      // For regular investment loans, set data based on owner selection
      else {
        // Set the owner field
        setFieldValue(`owner`, managedFundsLOC.owner || []);

        // For client-related fields if "client" is included in the owner array
        if (managedFundsLOC.owner.includes("client")) {
          if (managedFundsLOC?.client && Object.keys(managedFundsLOC?.client).length) {
            setFieldValue(`client.lender`, managedFundsLOC.client.lender || "");
            setFieldValue(`client.loanBalance`, managedFundsLOC.client.loanBalance || "");
            setFieldValue(`client.loanType`, managedFundsLOC.client.loanType || "");
            setFieldValue(`client.repaymentsAmount`, managedFundsLOC.client.repaymentsAmount || "");
            setFieldValue(`client.frequency`, managedFundsLOC.client.frequency || "");
            setFieldValue(`client.annualRepayments`, managedFundsLOC.client.annualRepayments || "");
            setFieldValue(`client.serviceFeeType`, managedFundsLOC.client.serviceFeeType || "");
            setFieldValue(`client.interestRate`, managedFundsLOC.client.interestRate || "");
            setFieldValue(`client.loanTerm`, managedFundsLOC.client.loanTerm || "");
            setFieldValue(`client.loanTermRemaining`, managedFundsLOC.client.loanTermRemaining || "");
            setFieldValue(`client.deductibleLoanAmount`, managedFundsLOC.client.deductibleLoanAmount || "");
          }
        }

        // For partner-related fields
        if (UserStatus === "Married" && managedFundsLOC.owner.includes("partner")) {
          if (managedFundsLOC?.partner && Object.keys(managedFundsLOC?.partner).length) {
            setFieldValue(`partner.lender`, managedFundsLOC.partner.lender || "");
            setFieldValue(`partner.loanBalance`, managedFundsLOC.partner.loanBalance || "");
            setFieldValue(`partner.loanType`, managedFundsLOC.partner.loanType || "");
            setFieldValue(`partner.repaymentsAmount`, managedFundsLOC.partner.repaymentsAmount || "");
            setFieldValue(`partner.frequency`, managedFundsLOC.partner.frequency || "");
            setFieldValue(`partner.annualRepayments`, managedFundsLOC.partner.annualRepayments || "");
            setFieldValue(`partner.serviceFeeType`, managedFundsLOC.partner.serviceFeeType || "");
            setFieldValue(`partner.interestRate`, managedFundsLOC.partner.interestRate || "");
            setFieldValue(`partner.loanTerm`, managedFundsLOC.partner.loanTerm || "");
            setFieldValue(`partner.loanTermRemaining`, managedFundsLOC.partner.loanTermRemaining || "");
            setFieldValue(`partner.deductibleLoanAmount`, managedFundsLOC.partner.deductibleLoanAmount || "");
          }
        }

        // For joint-related fields
        if (managedFundsLOC.owner.includes("joint")) {
          if (managedFundsLOC?.joint && Object.keys(managedFundsLOC?.joint).length) {
            setFieldValue(`joint.lender`, managedFundsLOC.joint.lender || "");
            setFieldValue(`joint.loanBalance`, managedFundsLOC.joint.loanBalance || "");
            setFieldValue(`joint.loanType`, managedFundsLOC.joint.loanType || "");
            setFieldValue(`joint.repaymentsAmount`, managedFundsLOC.joint.repaymentsAmount || "");
            setFieldValue(`joint.frequency`, managedFundsLOC.joint.frequency || "");
            setFieldValue(`joint.annualRepayments`, managedFundsLOC.joint.annualRepayments || "");
            setFieldValue(`joint.serviceFeeType`, managedFundsLOC.joint.serviceFeeType || "");
            setFieldValue(`joint.interestRate`, managedFundsLOC.joint.interestRate || "");
            setFieldValue(`joint.loanTerm`, managedFundsLOC.joint.loanTerm || "");
            setFieldValue(`joint.loanTermRemaining`, managedFundsLOC.joint.loanTermRemaining || "");
            setFieldValue(`joint.deductibleLoanAmount`, managedFundsLOC.joint.deductibleLoanAmount || "");
          }
        }
      }
    }
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
  console.log("Form values:", values);

  let obj = {
    ...values,
    clientFK: localStorage.getItem("UserID")
  };

  // Reset totals
  obj.clientTotal = "";
  obj.partnerTotal = "";
  obj.SMSFTotal = "";
  obj.trustTotal = "";

  let fiftyPercent = 0;
  
  // Safe check for owner array
  const ownerArray = values.owner || [];

  // Calculate joint portion (only for regular investment loans)
  if (ownerArray.includes("joint") && obj.joint?.annualRepayments) {
    try {
      let annualRepayments = parseFloat(
        (obj.joint.annualRepayments || "0").replace(/[^0-9.-]+/g, "")
      );
      fiftyPercent = isNaN(annualRepayments) ? 0 : annualRepayments / 2;
    } catch (error) {
      console.error("Error calculating fiftyPercent:", error);
      fiftyPercent = 0;
    }
  }

  // Calculate client total (only for regular investment loans)
  if (ownerArray.includes("client") && obj.client?.annualRepayments) {
    let clientAnnual = parseFloat(
      obj.client.annualRepayments.replace(/[^0-9.-]+/g, "")
    );
    obj.clientTotal = toCommaAndDollar(clientAnnual + fiftyPercent);
  } else if (ownerArray.includes("joint")) {
    obj.clientTotal = toCommaAndDollar(fiftyPercent);
  }

  // Calculate partner total (only for regular investment loans)
  if (ownerArray.includes("partner") && UserStatus === "Married" && obj.partner?.annualRepayments) {
    let partnerAnnual = parseFloat(
      obj.partner.annualRepayments.replace(/[^0-9.-]+/g, "")
    );
    obj.partnerTotal = toCommaAndDollar(partnerAnnual + fiftyPercent);
  } else if (ownerArray.includes("joint") && UserStatus === "Married") {
    obj.partnerTotal = toCommaAndDollar(fiftyPercent);
  }

  // Calculate SMSF total - FIXED CALCULATION
  if (ownerArray.includes("SMSF") && obj.SMSF?.annualRepayments) {
    try {
      let smsfAnnual = parseFloat(
        obj.SMSF.annualRepayments.replace(/[^0-9.-]+/g, "")
      );
      obj.SMSFTotal = toCommaAndDollar(smsfAnnual);
      console.log("SMSF Total calculated:", obj.SMSFTotal);
    } catch (error) {
      console.error("Error calculating SMSF total:", error);
      obj.SMSFTotal = toCommaAndDollar(0);
    }
  }

  // Calculate trust total
  if (ownerArray.includes("trust") && obj.trust?.annualRepayments) {
    try {
      let trustAnnual = parseFloat(
        obj.trust.annualRepayments.replace(/[^0-9.-]+/g, "")
      );
      obj.trustTotal = toCommaAndDollar(trustAnnual);
    } catch (error) {
      console.error("Error calculating trust total:", error);
      obj.trustTotal = toCommaAndDollar(0);
    }
  }

  // FORCE CLEANUP BASED ON MODAL TYPE
  if (props.modalObject.key === "SMSFInvestmentLoan") {
    // Only keep SMSF data - DON'T delete SMSFTotal
    delete obj.client;
    delete obj.partner;
    delete obj.joint;
    delete obj.trust;
    delete obj.clientTotal;
    delete obj.partnerTotal;
    delete obj.trustTotal;
    
    // Ensure SMSFTotal is included even if it's empty
    if (!obj.SMSFTotal) {
      obj.SMSFTotal = toCommaAndDollar(0);
    }
  } else if (props.modalObject.key === "familyInvestmentHomeLoan") {
    // Only keep trust data
    delete obj.client;
    delete obj.partner;
    delete obj.joint;
    delete obj.SMSF;
    delete obj.clientTotal;
    delete obj.partnerTotal;
    delete obj.SMSFTotal;
    
    // Ensure trustTotal is included even if it's empty
    if (!obj.trustTotal) {
      obj.trustTotal = toCommaAndDollar(0);
    }
  } else {
    // For regular investment loans, cleanup based on owner selection
    if (!ownerArray.includes("client")) delete obj.client;
    if (!ownerArray.includes("partner") || UserStatus !== "Married") delete obj.partner;
    if (!ownerArray.includes("joint")) delete obj.joint;
    if (!ownerArray.includes("SMSF")) delete obj.SMSF;
    if (!ownerArray.includes("trust")) delete obj.trust;
  }

  // DON'T remove empty total fields for SMSF and trust in their respective modals
  if (props.modalObject.key !== "SMSFInvestmentLoan") {
    if (!obj.clientTotal || obj.clientTotal === "$0") delete obj.clientTotal;
    if (!obj.partnerTotal || obj.partnerTotal === "$0") delete obj.partnerTotal;
  }
  if (props.modalObject.key !== "familyInvestmentHomeLoan") {
    if (!obj.SMSFTotal || obj.SMSFTotal === "$0") delete obj.SMSFTotal;
    if (!obj.trustTotal || obj.trustTotal === "$0") delete obj.trustTotal;
  }

  console.log("Final API payload:", JSON.stringify(obj, null, 2));

  try {
    const recordExists = managedFundsLOC && managedFundsLOC._id;
    let res;

    if (!recordExists) {
      res = await PostAxios(
        `${DefaultUrl}/api/${props.modalObject.key}/Add`,
        obj
      );
    } else {
      // For PATCH, include the ID
      obj._id = managedFundsLOC._id;
      res = await PatchAxios(
        `${DefaultUrl}/api/${props.modalObject.key}/Update`,
        obj
      );
    }

    if (res) {
      console.log("API Response:", res);
      const updatedData = {
        ...questionDetail,
        [props.modalObject.key]: res,
      };
      setQuestionDetail(updatedData);
      
      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        `Data of "${props.modalObject.title}" is Saved`
      );

      if (props.flagState) {
        props.setFlagState(false);
        props.setIsEditing(!props.isEditing);
      }
    }
  } catch (error) {
    console.error("Error occurred while making API call:", error);
    console.error("Error details:", error.response?.data);
    
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
    console.log(stackHolder, "calculateAnnualRepayments");
    
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
      type: "text",
      placeholder: "Enter Owner Name",
      width: 150,
    },
    {
      title: "Lender",
      dataIndex: "lender",
      key: "lender",
      type: "select",
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
      type: "select",
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
      type: "select",
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
      type: "number-toComma",
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
      type: "select",
      options: loanTermOptions,
      width: 150,
    },
    {
      title: "Loan Term Remaining",
      dataIndex: "loanTermRemaining",
      key: "loanTermRemaining",
      type: "select",
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
          const ownerArray = values.owner || [];

          // For SMSFInvestmentLoan, only show SMSF row
          if (props.modalObject.key === "SMSFInvestmentLoan") {
            rows.push({
              key: "SMSF",
              stakeHolder: "SMSF",
              owner: "SMSF",
              ...(values.SMSF || {}),
            });
          }
          // For familyInvestmentHomeLoan, only show trust row
          else if (props.modalObject.key === "familyInvestmentHomeLoan") {
            rows.push({
              key: "trust",
              stakeHolder: "trust",
              owner: "Trust",
              ...(values.trust || {}),
            });
          }
          // For regular investment loans, show based on owner selection
          else {
            if (ownerArray.includes("client")) {
              rows.push({
                key: "client",
                stakeHolder: "client",
                owner: RenderName("client"),
                ...(values.client || {}),
              });
            }

            if (ownerArray.includes("partner")) {
              rows.push({
                key: "partner",
                stakeHolder: "partner",
                owner: RenderName("partner"),
                ...(values.partner || {}),
              });
            }

            if (ownerArray.includes("joint")) {
              rows.push({
                key: "joint",
                stakeHolder: "joint",
                owner: RenderName("joint"),
                ...(values.joint || {}),
              });
            }
          }
          
          return rows;
        }, [values, props.modalObject.key]);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <div
                      className={`d-flex flex-row justify-content-start align-items-center gap-2 ${
                        props.modalObject.key === "familyInvestmentHomeLoan" ||
                        props.modalObject.key === "SMSFInvestmentLoan"
                          ? "d-none"
                          : ""
                      }`}
                    >
                      <label htmlFor="" className="text-end">
                        {props.modalObject.title !== "Investment Loan"
                          ? "Members"
                          : "Owner"}
                      </label>

                      <div style={{ minWidth: "200px" }}>
                        <Field
                          name={`owner`}
                          component={AntdCreatableMultiSelect}
                          options={options}
                          onChangefun={() => { }}
                        />
                      </div>
                    </div>
                  </div>
                  {(values.owner || []).length > 0 && (
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