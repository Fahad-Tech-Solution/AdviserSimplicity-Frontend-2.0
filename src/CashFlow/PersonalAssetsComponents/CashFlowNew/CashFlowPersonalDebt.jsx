import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import {
  handleInputBlur,
  handleInputChange,
  handleInputFocus,
  handleInputKeyDown,
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  toCommaAndDollar,
  toPercentage,
} from "../../../Components/Assets/Api/Api";
import DynamicYesNo from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo";
import {
  CashFlowData,
  CashFlowReCalculateLoading,
  CashFlowScenarioData,
  defaultUrl,
  QuestionDetail,
} from "../../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";

const CashFlowPersonalDebt = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);

  let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));
  let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

  let DefaultUrl = useRecoilValue(defaultUrl);
  let [cashFlowReCalculateLoading, setCashFlowReCalculateLoading] =
    useRecoilState(CashFlowReCalculateLoading);

  let personalLoans =
    Object.keys(questionDetail?.[props.modalObject.discoveryKey] || {}).length >
    0
      ? questionDetail[props.modalObject.discoveryKey]
      : {
          client: [],
          partner: [],
          joint: [],
        };

  let handleInput = (e, setFieldValue) => {
    const value = e.target.value > 2 ? 2 : e.target.value;
    setFieldValue(e.target.id, value);
  };

  let initialValues = { NumberOfMap: "" };

  const fillInitialValues = (setFieldValue) => {
    try {
      // Set the object and API key
      setObjAndAPIKey(props.modalObject.key);

      // console.log(personalLoans, "Discovery Form Data");
      // console.log(
      //   cashFlowData[props.modalObject.key],
      //   "cashFlowData Form Data"
      // );
      // console.log(CashFlowScenarioDataObj, "CashFlowScenarioDataObj Form Data");

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      // Helper function to update field values
      const updateFields = (data, prefix) => {
        if (!data || !Object.keys(data).length) return;
        const fields = {
          YearLoan: data.YearLoan || "",
          CurrentLoanBalance: data.CurrentLoanBalance || data.LoanBalance || "",
          LoanType: data.LoanType || "",
          LoanTerm: data.LoanTerm || "",
          InterestRate: data.InterestRate || "",
          MinimumRepayments: data.MinimumRepayments || "",
          ActualAnnualRepayments:
            data.ActualAnnualRepayments || data.AnnualRepayments || "",
          applyMinimumRepaymentsOR: data.applyMinimumRepaymentsOR || "",
          RepayLoanInYear:
            data.RepayLoanInYear || data.LoanTermRemaining || "No",
        };

        // console.log(fields);
        Object.entries(fields).forEach(([key, value]) => {
          setFieldValue(`${key}${prefix}`, value);
        });
      };

      // Update owner field
      if (
        scenarioObj?.selectedSource === "discoveryForm" &&
        personalLoans &&
        personalLoans._id
      ) {
        // Update client-related fields
        if (personalLoans?.client) {
          // console.log(personalLoans.client, "personalLoans");
          setFieldValue(`NumberOfMap`, personalLoans.client.length || "");
          personalLoans.client.forEach((data, index) => {
            updateFields(data, index);
          });
        }
      } else {
        // Handle cashFlowData scenario
        const cashFlowDetails = CashFlowScenarioDataObj?.[objAndAPIKey];
        // console.log(cashFlowDetails, "cashFlowDetails")
        if (cashFlowDetails) {
          setFieldValue(`NumberOfMap`, cashFlowDetails.NumberOfMap || 0);
          if (cashFlowDetails?.client) {
            cashFlowDetails.client.forEach((child, index) => {
              updateFields(child, index);
            });
          }
        }
      }

      // Additional data from cashFlowData
      if (cashFlowData?.[objAndAPIKey]?._id) {
        // Handle cashFlowData scenario
        const cashFlowDetails = cashFlowData?.[objAndAPIKey];
        // console.log(cashFlowDetails, "cashFlowDetails")
        if (cashFlowDetails) {
          setFieldValue(`NumberOfMap`, cashFlowDetails.NumberOfMap || 0);
          if (cashFlowDetails?.client) {
            cashFlowDetails.client.forEach((child, index) => {
              updateFields(child, index);
            });
          }
        }
      }
    } catch (error) {
      console.error("Error in fillInitialValues:", error);
    }
  };

  let onSubmit = async (values) => {
    const personalLoansArray = [];
    for (let i = 0; i < values.NumberOfMap; i++) {
      personalLoansArray.push({
        YearLoan: values[`YearLoan${i}`],
        CurrentLoanBalance: values[`CurrentLoanBalance${i}`],
        LoanType: values[`LoanType${i}`],
        LoanTerm: values[`LoanTerm${i}`],
        InterestRate: values[`InterestRate${i}`],
        MinimumRepayments: values[`MinimumRepayments${i}`],
        ActualAnnualRepayments: values[`ActualAnnualRepayments${i}`],
        applyMinimumRepaymentsOR: values[`applyMinimumRepaymentsOR${i}`],
        RepayLoanInYear: values[`RepayLoanInYear${i}`],
      });
    }

    // console.log(JSON.stringify(personalLoansArray));
    // return (false);
    let obj = {
      NumberOfMap: values.NumberOfMap,
      client: personalLoansArray,
      clientTotal:
        toCommaAndDollar(
          personalLoansArray.reduce(
            (total, entry) =>
              total +
              parseFloat(
                entry.CurrentLoanBalance.replace(/[^0-9.-]+/g, "") || 0
              ),
            0
          )
        ) || "$0",
    };

    obj.scenarioFK = JSON.parse(localStorage.getItem("ScenarioObj"))._id;

    const bankAccountArray = cashFlowData?.[objAndAPIKey]?._id || "";

    console.log(JSON.stringify(obj), "final obj");

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

  let FormulaSetting = () => {};

  let handleChildButtonClick = async (values, setFieldValue) => {
    try {
      let obj = JSON.parse(JSON.stringify(cashFlowData));

      const personalLoansArray = [];
      for (let i = 0; i < values.NumberOfMap; i++) {
        personalLoansArray.push({
          YearLoan: values[`YearLoan${i}`],
          CurrentLoanBalance: values[`CurrentLoanBalance${i}`],
          LoanType: values[`LoanType${i}`],
          LoanTerm: values[`LoanTerm${i}`],
          InterestRate: values[`InterestRate${i}`],
          MinimumRepayments: values[`MinimumRepayments${i}`],
          ActualAnnualRepayments: values[`ActualAnnualRepayments${i}`],
          applyMinimumRepaymentsOR: values[`applyMinimumRepaymentsOR${i}`],
          RepayLoanInYear: values[`RepayLoanInYear${i}`],
        });
      }

      let FullObj = {
        NumberOfMap: values.NumberOfMap,
        client: personalLoansArray,
        clientTotal:
          toCommaAndDollar(
            personalLoansArray.reduce(
              (total, entry) =>
                total +
                parseFloat(
                  entry.CurrentLoanBalance.replace(/[^0-9.-]+/g, "") || 0
                ),
              0
            )
          ) || "$0",
      };

      FullObj.scenarioFK = JSON.parse(localStorage.getItem("ScenarioObj"))._id;

      obj[props.modalObject.key] = FullObj;

      console.log(obj[props.modalObject.key], ":obj");

      let res = await PostAxios(
        `${DefaultUrl}/api/cal/cf_familyHome/INPUTS_Property`,
        obj
      );
      if (res) {
        console.log(res.data[props.modalObject.key]);
        let Data = res.data[props.modalObject.key];

        if (values.NumberOfMap > 0) {
          for (let i = 0; i < values.NumberOfMap; i++) {
            console.log(Data["MinimumRepayments" + (i + 1)]);
            if (
              Data["MinimumRepayments" + (i + 1)] &&
              typeof Data["MinimumRepayments" + (i + 1)] == "number"
            ) {
              setFieldValue(
                `MinimumRepayments${i}`,
                toCommaAndDollar(Data["MinimumRepayments" + (i + 1)])
              );
            } else {
              setFieldValue(`MinimumRepayments${i}`, "$0");
            }
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
      {({ values, setFieldValue, handleChange }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="d-flex justify-content-center align-items-center gap-4">
                    <p className="text-end mt-1 pt-2">
                      How many {props.modalObject.title} does{" "}
                      {localStorage.getItem("UserName")} have:
                    </p>
                    <div style={{ minWidth: "4%", maxWidth: "8%" }}>
                      <Field
                        type="number"
                        id="NumberOfMap"
                        name="NumberOfMap"
                        className="form-control inputDesignDoubleInput"
                        onChange={(e) => handleInput(e, setFieldValue)}
                      />
                    </div>
                  </div>

                  {values.NumberOfMap > 0 && (
                    <div className="mt-4">
                      <Table striped bordered responsive hover>
                        <thead>
                          <tr>
                            <th>No#</th>
                            <th>Year of Loan</th>
                            <th>Current Loan Balance</th>
                            <th>Loan Type</th>
                            <th>Loan Term</th>
                            <th>Initial Interest Rate (p.a.)</th>
                            <th>Minimum Repayments (p.a)</th>
                            <th style={{ color: "black" }}>
                              Apply Minimum Repayments OR
                            </th>
                            <th>Actual Annual Repayments</th>
                            <th>Repay Loan in Year</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: values.NumberOfMap }).map(
                            (_, i) => {
                              return (
                                <tr key={i}>
                                  <td>{1 + i}</td>
                                  <td style={{ width: "150px" }}>
                                    <Field
                                      as="select"
                                      placeholder="Year of Loan"
                                      id={`YearLoan${i}`}
                                      name={`YearLoan${i}`}
                                      className="form-select inputDesignDoubleInput"
                                    >
                                      <option value={""}>Please Select</option>
                                      {Array.from({ length: 31 }).map(
                                        (_, i) => {
                                          if (i === 0) {
                                            return (
                                              <option
                                                key={i}
                                                value={"Existing"}
                                              >
                                                Existing
                                              </option>
                                            );
                                          } else {
                                            return (
                                              <option key={i} value={i}>
                                                Year {i}
                                              </option>
                                            );
                                          }
                                        }
                                      )}
                                    </Field>
                                  </td>
                                  <td>
                                    <Field
                                      type="text"
                                      placeholder="Current Loan Balance"
                                      id={`CurrentLoanBalance${i}`}
                                      name={`CurrentLoanBalance${i}`}
                                      className="form-control inputDesignDoubleInput"
                                      onChange={(e) => {
                                        setFieldValue(
                                          e.target.name,
                                          toCommaAndDollar(
                                            e.target.value.replace(
                                              /[^0-9.-]+/g,
                                              ""
                                            )
                                          )
                                        );
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <Field
                                      as="select"
                                      placeholder="Loan Type"
                                      id={`LoanType${i}`}
                                      name={`LoanType${i}`}
                                      className="form-select inputDesignDoubleInput"
                                    >
                                      <option value={""}>Please Select</option>
                                      <option value={"I/Only"}>I/Only</option>
                                      <option value={"P & I"}>P & I</option>
                                    </Field>
                                  </td>
                                  <td>
                                    <Field
                                      as="select"
                                      placeholder="Loan Term"
                                      id={`LoanTerm${i}`}
                                      name={`LoanTerm${i}`}
                                      className="form-select inputDesignDoubleInput"
                                      onChange={(e) => {
                                        setFieldValue(
                                          e.target.name,
                                          e.target.value
                                        );
                                      }}
                                    >
                                      <option value={""}>Please Select</option>
                                      {Array.from({ length: 30 }).map(
                                        (_, i) => (
                                          <option key={i} value={i + 1}>
                                            Year {i + 1}
                                          </option>
                                        )
                                      )}
                                    </Field>
                                  </td>
                                  <td>
                                    <Field
                                      type="text"
                                      placeholder="Initial Interest Rate (p.a.)"
                                      id={`InterestRate${i}`}
                                      name={`InterestRate${i}`}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          setFieldValue,
                                          FormulaSetting,
                                          values
                                        )
                                      }
                                      onFocus={(e) =>
                                        handleInputFocus(e, setFieldValue)
                                      }
                                      onKeyDown={(e) => handleInputKeyDown(e)}
                                      onBlur={(e) =>
                                        handleInputBlur(
                                          e,
                                          setFieldValue,
                                          toPercentage,
                                          FormulaSetting,
                                          values
                                        )
                                      }
                                      className="form-control inputDesignDoubleInput"
                                    />
                                  </td>
                                  <td>
                                    <Field
                                      type="text"
                                      placeholder="Minimum Repayments (p.a)"
                                      id={`MinimumRepayments${i}`}
                                      name={`MinimumRepayments${i}`}
                                      className="form-control inputDesignDoubleInput"
                                      disabled
                                    />
                                  </td>
                                  <td>
                                    {/*applyMinimumRepaymentsOR */}
                                    <div className="d-flex flex-column justify-content-center align-items-center gap-2 pt-1">
                                      <DynamicYesNo
                                        name={`applyMinimumRepaymentsOR${i}`}
                                        values={values}
                                        handleChange={handleChange}
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <Field
                                      type="text"
                                      placeholder="Actual Annual Repayments"
                                      id={`ActualAnnualRepayments${i}`}
                                      name={`ActualAnnualRepayments${i}`}
                                      className="form-control inputDesignDoubleInput"
                                      onChange={(e) => {
                                        setFieldValue(
                                          e.target.name,
                                          toCommaAndDollar(
                                            e.target.value.replace(
                                              /[^0-9.-]+/g,
                                              ""
                                            )
                                          )
                                        );
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <Field
                                      as="select"
                                      placeholder="Repay Loan in Year"
                                      id={`RepayLoanInYear${i}`}
                                      name={`RepayLoanInYear${i}`}
                                      className="form-select inputDesignDoubleInput"
                                    >
                                      <option value={""}>Please Select</option>
                                      <option selected value={"No"}>
                                        No
                                      </option>
                                      {Array.from({ length: 30 }).map(
                                        (_, i) => (
                                          <option key={i} value={i + 1}>
                                            Year {i + 1}
                                          </option>
                                        )
                                      )}
                                    </Field>
                                  </td>
                                </tr>
                              );
                            }
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
                </div>
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CashFlowPersonalDebt;
