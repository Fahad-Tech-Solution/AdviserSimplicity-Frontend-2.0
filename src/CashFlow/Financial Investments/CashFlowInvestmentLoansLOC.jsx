import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { CreatableMultiSelectField } from "../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
  toCommaAndDollar,
} from "../../Components/Assets/Api/Api";
import { Row, Table } from "react-bootstrap";
import {
  CashFlowData,
  CashFlowReCalculateLoading,
  CashFlowScenarioData,
  defaultUrl,
  QuestionDetail,
} from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";

const CashFlowInvestmentLoansLOC = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));
  let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

  let DefaultUrl = useRecoilValue(defaultUrl);

  let [cashFlowReCalculateLoading, setCashFlowReCalculateLoading] =
    useRecoilState(CashFlowReCalculateLoading);

  let managedFundsLOC =
    Object.keys(questionDetail.managedFundsLOC || {}).length > 0
      ? questionDetail.managedFundsLOC
      : {
          client: [],
          partner: [],
          joint: [],
        }; // Use an empty object as default if managedFundsLOC is undefined

  let initialValues = {
    owner: [],
  };

  const fillInitialValues = (setFieldValue) => {
    try {
      // Set the object and API key
      setObjAndAPIKey(props.modalObject.key);

      console.log(managedFundsLOC, "Discovery Form Data");
      // console.log(cashFlowData, "cashFlowData Form Data");
      // console.log(CashFlowScenarioDataObj, "CashFlowScenarioDataObj Form Data");

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      // Helper function to update field values
      const updateFields = (data, prefix) => {
        if (!data || !Object.keys(data).length) return;
        const fields = {
          yearOfLoan: data.yearOfLoan || "",
          currentLoanBalance: data.currentLoanBalance || data.loanBalance || "",
          loanType: data.loanType || "",
          loanTerm: data.loanTerm || "",
          interestOnlyPeriod: data.interestOnlyPeriod || "",
          applyMinimumRepaymentsOR: data.applyMinimumRepaymentsOR || "",
          initialInterestRate:
            data.initialInterestRate || data.interestRate || "",
          deductibleInterest:
            data.deductibleInterest || data.deductibleLoanAmount || "",
          minimumRepayments: data.minimumRepayments || "",
          actualAnnualRepayments:
            data.actualAnnualRepayments || data.annualRepayments || "",
          repayLoanYear: data.repayLoanYear || "No",
        };

        Object.entries(fields).forEach(([key, value]) => {
          setFieldValue(`${prefix}.${key}`, value);
        });
      };

      // Update owner field
      if (
        scenarioObj?.selectedSource === "discoveryForm" &&
        managedFundsLOC &&
        managedFundsLOC._id
      ) {
        setFieldValue(`owner`, managedFundsLOC.owner || "");

        // Update client-related fields
        if (managedFundsLOC.owner.includes("client")) {
          updateFields(managedFundsLOC.client, "client");
        }

        // Update partner-related fields
        if (
          UserStatus === "Married" &&
          managedFundsLOC.owner.includes("partner")
        ) {
          updateFields(managedFundsLOC.partner, "partner");
        }
      } else {
        // Handle cashFlowData scenario
        const cashFlowDetails = CashFlowScenarioDataObj?.[objAndAPIKey];
        console.log(cashFlowDetails, "cashFlowDetails");
        if (cashFlowDetails) {
          setFieldValue(`owner`, cashFlowDetails.owner || "");
          if (cashFlowDetails.owner.includes("client")) {
            // Update client details
            updateFields(cashFlowDetails.client, "client");
          }

          if (
            UserStatus === "Married" &&
            cashFlowDetails.owner.includes("partner")
          ) {
            // Update partner details
            updateFields(cashFlowDetails.partner, "partner");
          }
        }
      }

      // Additional data from cashFlowData
      if (cashFlowData?.[objAndAPIKey]?._id) {
        const cashFlowDataDetails = cashFlowData[objAndAPIKey];
        setFieldValue(`owner`, cashFlowDataDetails.owner || "");

        if (cashFlowDataDetails.owner.includes("client")) {
          // Update client details
          updateFields(cashFlowDataDetails.client, "client");
        }

        if (
          UserStatus === "Married" &&
          cashFlowDataDetails.owner.includes("partner")
        ) {
          // Update partner details
          updateFields(cashFlowDataDetails.partner, "partner");
        }
      }
    } catch (error) {
      console.error("Error in fillInitialValues:", error);
    }
  };

  let onSubmit = async (values) => {
    console.log(JSON.stringify(values));
    // return (false);
    let obj = values;

    obj.scenarioFK = JSON.parse(localStorage.getItem("ScenarioObj"))._id;

    let JointActualAnnualRepayments = 0;

    if (values.owner.includes("joint")) {
      JointActualAnnualRepayments = parseFloat(
        values.joint.actualAnnualRepayments.replace(/[^0-9.-]+/g, "")
      );
    }

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

    console.log(obj, "final obj");

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
        console.log(res);
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

      // Reset the flag state if necessary
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
    // value: (i + 1).toString(),
    value: i,
    label: ("Year " + i).toString(),
  }));

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

  const options =
    UserStatus !== "Single"
      ? [
          { value: "client", label: RenderName("client") },
          { value: "partner", label: RenderName("partner") },
        ]
      : [{ value: "client", label: RenderName("client") }];

  let loanTypeOptions = [
    { value: "I/Only", label: "I/Only" },
    { value: "P & I", label: "P & I" },
  ];

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

  let handleChildButtonClick = async (values, setFieldValue) => {
    try {
      let obj = JSON.parse(JSON.stringify(cashFlowData));

      obj.cf_investmentLoansLOC = values;

      let res = await PostAxios(
        `${DefaultUrl}/api/cal/financialInvestment/INPUTS_Investment_Loans`,
        obj
      );

      if (res) {
        // console.log(res);
        let { cf_investmentLoansLOC } = res.data;

        // console.log(
        //   typeof cf_investmentLoansLOC.minimumRepayments,
        //   "cf_investmentLoansLOC.minimumRepayments"
        // );

        if (values.owner.includes("client")) {
          if (typeof cf_investmentLoansLOC.minimumRepayments === "number") {
            setFieldValue(
              "client.minimumRepayments",
              toCommaAndDollar(cf_investmentLoansLOC.minimumRepayments)
            );
          } else {
            setFieldValue("client.minimumRepayments", "$0");
          }
        }

        if (values.owner.includes("partner")) {
          if (typeof cf_investmentLoansLOC.minimumRepayments === "number") {
            setFieldValue(
              "partner.minimumRepayments",
              toCommaAndDollar(cf_investmentLoansLOC.minimumRepayments)
            );
          } else {
            setFieldValue("partner.minimumRepayments", "$0");
          }
        }

        setCashFlowReCalculateLoading(false);
        openNotificationSuccess(
          "success",
          "topRight",
          "Success Notification",
          'Data of "' + props.modalObject.title + '" is Saved'
        );
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
      setCashFlowReCalculateLoading(false);
    }
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
                        <th
                          onClick={() => {
                            console.log(values);
                          }}
                        >
                          Owner
                        </th>
                        <th style={{ color: "black" }}>Year of Loan</th>
                        <th>Current Loan Balance</th>
                        <th>Loan Type</th>
                        <th>Loan Term</th>
                        <th style={{ color: "black" }}>Interest Only Period</th>
                        <th>Initial Interest Rate (p.a.)</th>
                        <th>Deductible interest</th>
                        <th>Minimum Repayments (p.a)</th>
                        <th style={{ color: "black" }}>
                          Apply Minimum Repayments OR
                        </th>
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
                          // handleInnerModal={handleInnerModal}
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
                            // handleInnerModal={handleInnerModal}
                            stakeHolder="partner."
                          />
                        )}

                      {values.owner.includes("joint") &&
                        UserStatus === "Married" && (
                          <DynamicTableRow
                            rowConfig={rowConfig}
                            values={values}
                            setFieldValue={setFieldValue}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            // handleInnerModal={handleInnerModal}
                            stakeHolder="joint."
                          />
                        )}
                    </tbody>
                  </Table>
                  <button
                    ref={props.childButtonRef}
                    onClick={() => {
                      handleChildButtonClick(values, setFieldValue);
                    }}
                    style={{ display: "none" }} // Hidden button
                    type="button"
                  >
                    Hidden Child Button
                  </button>
                </div>
              )}
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CashFlowInvestmentLoansLOC;
