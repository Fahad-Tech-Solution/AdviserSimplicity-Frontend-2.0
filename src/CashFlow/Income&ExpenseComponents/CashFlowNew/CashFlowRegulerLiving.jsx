import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { CreatableMultiSelectField } from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableRow from "../../../Components/Assets/Dynamic/DynamicTableRow";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
} from "../../../Components/Assets/Api/Api";
import { Row, Table } from "react-bootstrap";
import {
  CashFlowData,
  CashFlowScenarioData,
  defaultUrl,
  QuestionDetail,
} from "../../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";

const CashFlowRegularLiving = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));
  let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

  let DefaultUrl = useRecoilValue(defaultUrl);

  let generalLivingExpenses =
    Object.keys(questionDetail.generalLivingExpenses || {}).length > 0
      ? questionDetail.generalLivingExpenses
      : {
          client: [],
        }; // Use an empty object as default if generalLivingExpenses is undefined

  let initialValues = {
    client: {
      includeFromYear: 1,
      upUntillYear: 30,
      indexation: "2.50%",
    },
  };

  //   const fillInitialValues = (setFieldValue) => {
  //     console.log(generalLivingExpenses.generalLivingExpensesTotal, "data");
  //     if (generalLivingExpenses && generalLivingExpenses._id) {
  //       setFieldValue(`client.amount`, generalLivingExpenses.generalLivingExpensesTotal || "");

  //   };
  // };

  const fillInitialValues = (setFieldValue) => {
    try {
      // Set the object and API key
      setObjAndAPIKey(props.modalObject.key);

      console.log(generalLivingExpenses, "Discovery Form Data");
      // console.log(cashFlowData, "cashFlowData Form Data");
      // console.log(CashFlowScenarioDataObj, "CashFlowScenarioDataObj Form Data");

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      // Helper function to update field values
      const updateFields = (data, prefix) => {
        if (!data || !Object.keys(data).length) return;
        const fields = {
          expenses: data.expenses || "",
          amount: data.amount || data.generalLivingExpensesTotal || "",
          includeFromYear: data.includeFromYear || 1,
          upUntillYear: data.upUntillYear || 30,
          indexation: data.indexation || "2.50%",
        };

        Object.entries(fields).forEach(([key, value]) => {
          setFieldValue(`${prefix}.${key}`, value);
        });
      };

      // Update owner field
      if (
        scenarioObj?.selectedSource === "discoveryForm" &&
        generalLivingExpenses &&
        generalLivingExpenses._id
      ) {
        // setFieldValue(`owner`, generalLivingExpenses.owner || "");

        // Update client-related fields
        // if (generalLivingExpenses.owner.includes("client")) {
        updateFields(generalLivingExpenses, "client");
        // }

        // // Update partner-related fields
        // if (UserStatus === "Married" && generalLivingExpenses.owner.includes("partner")) {
        //   updateFields(generalLivingExpenses.partner, "partner");
        // }
      } else {
        // Handle cashFlowData scenario
        const cashFlowDetails = CashFlowScenarioDataObj?.[objAndAPIKey];
        console.log(cashFlowDetails, "cashFlowDetails");
        if (cashFlowDetails) {
          // setFieldValue(`owner`, cashFlowDetails.owner || "");
          if (cashFlowDetails.owner.includes("client")) {
            // Update client details
            updateFields(cashFlowDetails.client, "client");
          }

          // if (UserStatus === "Married" && cashFlowDetails.owner.includes("partner")) {
          //   // Update partner details
          //   updateFields(cashFlowDetails.partner, "partner");
          // }
        }
      }

      // Additional data from cashFlowData
      if (cashFlowData?.[objAndAPIKey]?._id) {
        const cashFlowDataDetails = cashFlowData[objAndAPIKey];
        // setFieldValue(`owner`, cashFlowDataDetails.owner || "");

        // if (cashFlowDataDetails.owner.includes("client")) {
        // Update client details
        updateFields(cashFlowDataDetails.client, "client");
        // }

        // if (UserStatus === "Married" && cashFlowDataDetails.owner.includes("partner")) {
        //   // Update partner details
        //   updateFields(cashFlowDataDetails.partner, "partner");
        // }
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

    obj.clientTotal = values.client.amount || "$0";

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

  const loanTermOptions = Array.from({ length: 31 }, (_, i) => ({
    value: i,
    label: ("Year " + i).toString(),
  }));

  const loanTermOptionsWithNo = [
    { value: "No", label: "No" },
    ...Array.from({ length: 30 }, (_, i) => ({
      value: (i + 1).toString(),
      label: ("Year " + (i + 1)).toString(),
    })),
  ];

  const indexation = Array.from({ length: 21 }, (_, i) => ({
    value: (i * 0.5).toFixed(2) + "%",
    label: (i * 0.5).toFixed(2) + "%",
  }));

  const optionOfExpenses = [
    "Living Expenses",
    "Reduce Living Expenses",
    "ASFS Retirement Standards",
    "Holidays",
    "Other",
    "Personal Insurance",
    // "Income Protection",
    // "Other Deductible",
  ];

  const ArrayOfExpenses = optionOfExpenses.map((key) => ({
    value: key,
    label: key,
  }));

  let arrayOfAmount = [
    { value: "Modest", label: "Modest" },
    { value: "Comfortable", label: "Comfortable" },
    { value: "No", label: "No" },
  ];

  const rowConfig = [
    {
      name: "expenses",
      type: "select",
      options: ArrayOfExpenses,
      callBack: true,
      func: (values, setFieldValue, currentInput, stakeHolder) => {
        if (currentInput.value === "ASFS Retirement Standards") {
          setFieldValue("client.upUntillYear", "");
        }
      },
    },
    {
      name: "amount",
      type: "number-toComma",
      placeholder: "Other Taxable Income",
    },
    {
      name: "includeFromYear",
      type: "select",
      options: loanTermOptions,
    },
    {
      name: "upUntillYear",
      type: "select",
      options: loanTermOptions,
    },
    {
      name: "indexation",
      type: "select",
      options: indexation,
    },

    // { name: "businessAddress", type: "text", placeholder: "Business Address" },
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
                      <th>Expenses</th>
                      <th>Amount</th>
                      <th>Include From Year</th>
                      <th>Up Until Year</th>
                      <th>Indexation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <DynamicTableRow
                      rowConfig={
                        values.client.expenses === "ASFS Retirement Standards"
                          ? rowConfig.map((config) => {
                              if (config.name === "amount") {
                                return {
                                  ...config,
                                  type: "select",
                                  options: arrayOfAmount,
                                };
                              }
                              if (config.name === "includeFromYear") {
                                return {
                                  ...config,
                                  options: loanTermOptionsWithNo,
                                };
                              }
                              if (config.name === "upUntillYear") {
                                return {
                                  ...config,
                                  disabled: true,
                                };
                              }

                              return config;
                            })
                          : rowConfig
                      } // Use the original rowConfig if condition is false
                      values={values}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      stakeHolder="client."
                    />
                  </tbody>
                </Table>
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CashFlowRegularLiving;
