import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { CreatableMultiSelectField } from "../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { Row, Table } from "react-bootstrap";
import {
  CashFlowData,
  CashFlowScenarioData,
  defaultUrl,
  QuestionDetail,
} from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
  toCommaAndDollar,
} from "../../Components/Assets/Api/Api";

const SMSFInvestmentLoan = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);

  let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));
  let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

  let DefaultUrl = useRecoilValue(defaultUrl);

  let initialValues = { owner: [] };

  let SMSFInvestmentLoan =
    Object.keys(questionDetail[props.modalObject.sourceKey] || {}).length > 0
      ? questionDetail[props.modalObject.sourceKey]
      : {
          client: [],
          joint: [],
          partner: [],
        }; // Use an empty object as default if SMSFBank is undefined

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
        setFieldValue(`owner`, SMSFInvestmentLoan.owner || "");

        if (SMSFInvestmentLoan.owner.includes("client")) {
          updateFields(SMSFInvestmentLoan.client, "client");
        }

        if (
          UserStatus === "Married" &&
          SMSFInvestmentLoan.owner.includes("partner")
        ) {
          updateFields(SMSFInvestmentLoan.partner, "partner");
        }
      } else {
        const cashFlowDetails = CashFlowScenarioDataObj?.[objAndAPIKey];
        if (cashFlowDetails) {
          setFieldValue(`owner`, cashFlowDetails.owner || "");
          if (cashFlowDetails.owner.includes("client")) {
            updateFields(cashFlowDetails.client, "client");
          }

          if (
            UserStatus === "Married" &&
            cashFlowDetails.owner.includes("partner")
          ) {
            updateFields(cashFlowDetails.partner, "partner");
          }
        }
      }

      if (cashFlowData?.[objAndAPIKey]?._id) {
        const cashFlowDataDetails = cashFlowData[objAndAPIKey];
        setFieldValue(`owner`, cashFlowDataDetails.owner || "");

        if (cashFlowDataDetails.owner.includes("client")) {
          updateFields(cashFlowDataDetails.client, "client");
        }

        if (
          UserStatus === "Married" &&
          cashFlowDataDetails.owner.includes("partner")
        ) {
          updateFields(cashFlowDataDetails.partner, "partner");
        }
      }
    } catch (error) {
      console.error("Error in fillInitialValues:", error);
    }
  };

  let onSubmit = async (values) => {
    let obj = values;
    obj.scenarioFK = JSON.parse(localStorage.getItem("ScenarioObj"))._id;

    let JointActualAnnualRepayments = 0;

    if (values.owner.includes("client")) {
      obj.clientTotal =
        toCommaAndDollar(
          parseFloat(
            values.client.actualAnnualRepayments.replace(/[^0-9.-]+/g, "")
          ) +
            JointActualAnnualRepayments / 2
        ) || "$0";
    } else {
      obj.clientTotal = "";
    }

    if (values.owner.includes("partner")) {
      obj.partnerTotal =
        toCommaAndDollar(
          parseFloat(
            values.partner.actualAnnualRepayments.replace(/[^0-9.-]+/g, "")
          ) +
            JointActualAnnualRepayments / 2
        ) || "$0";
    } else {
      obj.partnerTotal = "";
    }

    const bankAccountArray = cashFlowData?.[objAndAPIKey]?._id || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(`${DefaultUrl}/api/CF/${objAndAPIKey}/Add`, obj);
      } else {
        res = await PatchAxios(
          `${DefaultUrl}/api/CF/${objAndAPIKey}/Update`,
          obj
        );
      }

      if (res) {
        const updatedData = {
          ...cashFlowData,
          [objAndAPIKey]: res,
        };
        setCashFlowData(updatedData);
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        'Data of "' + props.modalObject.title + '" is Saved'
      );

      if (props.flagState) {
        props.setFlagState(false);
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        'Data of "' +
          props.modalObject.title +
          '" is not Saved Please! try again'
      );
    }
  };

  const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
    value: i + 1,
    label: ("Year " + (i + 1)).toString(),
  }));

  const options =
    UserStatus !== "Single"
      ? [
          { value: "client", label: RenderName("client") },
          { value: "partner", label: RenderName("partner") },
        ]
      : [{ value: "client", label: RenderName("client") }];

  const loanTermOptionsWithNo = Array.from({ length: 31 }, (_, i) => {
    if (i === 0) {
      return {
        value: "No",
        label: "No",
      };
    }

    return {
      // value: (i + 1).toString(),
      value: i + 1,
      label: ("Year " + (i + 1)).toString(),
    };
  });

  let loanTypeOptions = [
    { value: "i/only", label: "i/only" },
    { value: "P&I", label: "P&I" },
  ];

  const loanTermOptionsWithExisting = Array.from({ length: 31 }, (_, i) => {
    if (i === 0) {
      return {
        value: "Existing",
        label: "Existing",
      };
    }

    return {
      // value: (i + 1).toString(),
      value: i + 1,
      label: ("Year " + (i + 1)).toString(),
    };
  });

  const rowConfig = [
    {
      name: "yearOfLoan",
      placeholder: "Year of Loan",
      type: "select",
      options: loanTermOptionsWithExisting,
    },
    {
      name: "currentLoanBalance",
      placeholder: "Current Loan Balance",
      type: "number-toComma",
    },
    {
      name: "loanType",
      placeholder: "Loan Type",
      type: "select",
      options: loanTypeOptions,
    },
    {
      name: "loanTerm",
      placeholder: "Loan Term",
      type: "select",
      options: loanTermOptions,
    },
    {
      name: "interestOnlyPeriod",
      placeholder: "Interest Only Period",
      type: "select",
      options: loanTermOptions,
    },
    {
      name: "initialInterestRate",
      placeholder: "Initial Interest Rate (p.a.)",
      type: "number-toPercent",
    },
    {
      name: "deductibleInterest",
      placeholder: "Deductible interest",
      type: "number-toPercent",
    },
    {
      name: "minimumRepayments",
      placeholder: "Minimum Repayments (p.a)",
      type: "number-toComma",
      disabled: true,
    },
    {
      name: "applyMinimumRepaymentsOR",
      type: "yesno",
      placeholder: "Apply Minimum Repayments OR",
    },
    {
      name: "actualAnnualRepayments",
      placeholder: "Actual Annual Repayments",
      type: "number-toComma",
    },
    {
      name: "repayLoanYear",
      placeholder: "Repay Loan in Year",
      type: "select",
      options: loanTermOptionsWithNo,
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

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="d-flex justify-content-center align-items-center gap-4">
                  <label htmlFor="" className="text-end ">
                    Owner
                  </label>

                  <div style={{ minWidth: "25%" }}>
                    <Field
                      name={`owner`}
                      component={CreatableMultiSelectField}
                      label="Multi Select Field"
                      options={options}
                    />
                  </div>
                </div>
              </div>
              {values.owner.length > 0 && (
                <div className="mt-4">
                  <Table striped bordered responsive hover>
                    <thead>
                      <tr>
                        <th>Owner</th>
                        <th>Year of Loan</th>
                        <th>Current Loan Balance</th>
                        <th>Loan Type</th>
                        <th>Loan Term</th>
                        <th>Interest Only Period</th>
                        <th>Initial Interest Rate (p.a.)</th>
                        <th>Deductible interest</th>
                        <th>Minimum Repayments (p.a)</th>
                        <th>Apply Minimum Repayments OR</th>
                        <th>Actual Annual Repayments</th>
                        <th>Repay Loan in Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {values.owner.includes("client") && (
                        <DynamicTableRow
                          rowConfig={rowConfig}
                          values={values}
                          setFieldValue={setFieldValue}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          stakeHolder="client."
                        />
                      )}

                      {values.owner.includes("partner") &&
                        UserStatus === "Married" && (
                          <DynamicTableRow
                            rowConfig={rowConfig}
                            values={values}
                            setFieldValue={setFieldValue}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            stakeHolder="partner."
                          />
                        )}
                    </tbody>
                  </Table>
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
