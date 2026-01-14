import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
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
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";
import { AntdCreatableMultiSelect } from "./CreatableMultiSelectField";
const AntdTable = DynamicTableForInputsSection("antd");

const MarginLoan = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [, setQuestionDetail] = useRecoilState(QuestionDetail);
  const bankDetailObj = useRecoilValue(BankDetail);
  const [UserStatus] = useState(localStorage.getItem("UserStatus"));
  const DefaultUrl = useRecoilValue(defaultUrl);

  const lenderOption =
    bankDetailObj?.FinancialInstitutions?.map((elem) => ({
      value: elem._id,
      label: elem.platformName,
    })) || [];

  const managedFundsLOC =
    questionDetail[props.modalObject.key] &&
    Object.keys(questionDetail[props.modalObject.key]).length > 0
      ? questionDetail[props.modalObject.key]
      : {
          client: {},
          partner: {},
          joint: {},
        };

  const initialValues = {
    owner: [],
    client: {
      lender: "",
      loanBalance: "",
      monthlyContribution: "",
      annualLoan: "",
      interestRate: "",
      loanTerm: "",
      loanTermRemaining: "",
      deductibleLoanAmount: "100.00%",
    },
    partner: {
      lender: "",
      loanBalance: "",
      monthlyContribution: "",
      annualLoan: "",
      interestRate: "",
      loanTerm: "",
      loanTermRemaining: "",
      deductibleLoanAmount: "100.00%",
    },
    joint: {
      lender: "",
      loanBalance: "",
      monthlyContribution: "",
      annualLoan: "",
      interestRate: "",
      loanTerm: "",
      loanTermRemaining: "",
      deductibleLoanAmount: "100.00%",
    },
  };

  const fillInitialValues = (setFieldValue) => {
    console.log(props.modalObject);
    const data = managedFundsLOC;
    if (data && data._id) {
      setFieldValue("owner", data.owner || []);

      const setLoanDetails = (prefix, values) => {
        if (!values) return;
        Object.keys(values).forEach((key) => {
          setFieldValue(`${prefix}.${key}`, values[key] || "");
        });
      };

      if (data.owner?.includes("client")) setLoanDetails("client", data.client);
      if (data.owner?.includes("partner") && UserStatus === "Married")
        setLoanDetails("partner", data.partner);
      if (data.owner?.includes("joint"))
        setLoanDetails("joint", data.joint || {});
    } else {
      props.setIsEditing(true);
    }
  };

  const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
    value: `${i + 1}`,
    label: `Year ${i + 1}`,
  }));

  const FormulaSetting = (values, setFieldValue, currentInput, stakeHolder) => {
    if (!currentInput) return;

    const monthly =
      parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
    const annual = monthly * 12;

    console.log("FormulaSetting:", { monthly, annual });

    setFieldValue(stakeHolder + "annualLoan", toCommaAndDollar(annual));
  };

  const onSubmit = async (values) => {
    let obj = { ...values };
    obj.clientFK = localStorage.getItem("UserID");

    let fiftyPercent = 0;
    try {
      const jointAnnual =
        parseFloat(values.joint?.annualLoan?.replace(/[^0-9.-]+/g, "")) || 0;
      fiftyPercent = jointAnnual / 2;
    } catch {
      fiftyPercent = 0;
    }

    if (values.owner.includes("client")) {
      obj.clientTotal = toCommaAndDollar(
        (parseFloat(values.client?.annualLoan?.replace(/[^0-9.-]+/g, "")) ||
          0) + fiftyPercent
      );
    } else if (values.owner.includes("joint")) {
      obj.clientTotal = toCommaAndDollar(fiftyPercent);
    } else {
      obj.clientTotal = "";
      obj.client = {};
    }

    if (UserStatus === "Married" && values.owner.includes("partner")) {
      obj.partnerTotal = toCommaAndDollar(
        (parseFloat(values.partner?.annualLoan?.replace(/[^0-9.-]+/g, "")) ||
          0) + fiftyPercent
      );
    } else if (values.owner.includes("joint")) {
      obj.partnerTotal = toCommaAndDollar(fiftyPercent);
    } else {
      obj.partnerTotal = "";
      obj.partner = {};
    }

    if (UserStatus !== "Married") {
      obj.partnerTotal = "";
      obj.partner = {};
    }

    try {
      let res;
      const GotData = managedFundsLOC.clientFK || "";
      if (!GotData) {
        res = await PostAxios(
          `${DefaultUrl}/api/${props.modalObject.key}/Add`,
          obj
        );
      } else {
        res = await PatchAxios(
          `${DefaultUrl}/api/${props.modalObject.key}/Update`,
          obj
        );
      }

      if (res) {
        const updatedData = { ...questionDetail, [props.modalObject.key]: res };
        setQuestionDetail(updatedData);
      }

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
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Data of "${props.modalObject.title}" is not Saved. Please try again.`
      );
    }
  };

  const columns = [
    { title: "Owner", dataIndex: "owner", key: "owner" },
    {
      title: "Lender",
      dataIndex: "lender",
      key: "lender",
      type: "select",
      options: lenderOption,
      selectedOptionValue: true,
      width: 200,
    },
    {
      title: "Loan Balance",
      dataIndex: "loanBalance",
      key: "loanBalance",
      type: "number-toComma",
      placeholder: "Loan Balance",
      width: 160,
    },
    {
      title: "Monthly Contribution",
      dataIndex: "monthlyContribution",
      key: "monthlyContribution",
      type: "number-toComma",
      placeholder: "Monthly Contribution",
      callBack: true,
      func: FormulaSetting,
      width: 180,
    },
    {
      title: "Annual Loan Contributions",
      dataIndex: "annualLoan",
      key: "annualLoan",
      type: "text",
      disabled: true,
      width: 200,
    },
    {
      title: "Interest Rate (p.a)",
      dataIndex: "interestRate",
      key: "interestRate",
      type: "number-toPercent",
      placeholder: "Interest Rate",
      width: 150,
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
      width: 180,
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

  const ownerOptions = () => {
    const opts = [{ value: "client", label: RenderName("client") }];
    if (UserStatus !== "Single") {
      opts.push({ value: "partner", label: RenderName("partner") });
      opts.push({ value: "joint", label: RenderName("joint") });
    }
    return opts;
  };

  const handleInnerModal = (name, values) => {
    console.log("Modal trigger:", name, values);
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

        const dataRows = [
          ...(values.owner.includes("client")
            ? [
                {
                  key: "client",
                  owner: RenderName("client"),
                  stakeHolder: "client",
                  ...values.client,
                },
              ]
            : []),
          ...(values.owner.includes("partner") && UserStatus === "Married"
            ? [
                {
                  key: "partner",
                  owner: RenderName("partner"),
                  stakeHolder: "partner",
                  ...values.partner,
                },
              ]
            : []),
          ...(values.owner.includes("joint")
            ? [
                {
                  key: "joint",
                  owner: RenderName("joint"),
                  stakeHolder: "joint",
                  ...values.joint,
                },
              ]
            : []),
        ];

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="d-flex justify-content-center align-items-center gap-4">
                  <label
                    className="text-end"
                    onClick={() => {
                      console.log(values);
                    }}
                  >
                    Owner
                  </label>
                  <div style={{ minWidth: "250px" }}>
                    <Field
                      name="owner"
                      component={AntdCreatableMultiSelect}
                      options={ownerOptions()}
                      disabled={!props?.isEditing}
                    />
                  </div>
                </div>

                {values.owner.length > 0 && (
                  <div className="mt-4 All_Client reportSection">
                    <AntdTable
                      columns={columns}
                      data={dataRows}
                      values={values}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      handleInnerModal={handleInnerModal}
                      isEditing={props?.isEditing}
                      setIsEditing={props?.setIsEditing}
                    />
                  </div>
                )}
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default MarginLoan;
