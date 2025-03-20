import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import DynamicTableRow from "../../../Components/Assets/Dynamic/DynamicTableRow";
import {
  openNotificationSuccess,
  PostAxios,
  toCommaAndDollar,
} from "../../../Components/Assets/Api/Api";
import {
  CashFlowData,
  CashFlowReCalculateLoading,
  defaultUrl,
} from "../../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";

const CashFlowTotalCost = (props) => {
  let [cashFlowReCalculateLoading, setCashFlowReCalculateLoading] =
    useRecoilState(CashFlowReCalculateLoading);

  let initialValues = {
    stampDuty: "",
    stampDutyCalculation: "",
    otherPurchaseCosts: "",
    costBaseExisting: props.modalObject.values.totalCostBase || "",
    totalCostBase: "",
  };

  let DefaultUrl = useRecoilValue(defaultUrl);
  let cashFlowData = useRecoilValue(CashFlowData);

  const fillInitialValues = (setFieldValue) => {
    console.log(
      props.modalObject.values[props.modalObject.key],
      props.modalObject.key
    );
    if (
      Object.keys(props.modalObject.values[props.modalObject.key] || {})
        .length > 0
    ) {
      let Data = props.modalObject.values[props.modalObject.key];
      setFieldValue("stampDuty", Data.stampDuty);
      setFieldValue("stampDutyCalculation", Data.stampDutyCalculation);
      setFieldValue("otherPurchaseCosts", Data.otherPurchaseCosts);
      setFieldValue(
        "costBaseExisting",
        Data.costBaseExisting || props.modalObject.values.totalCostBase || ""
      );
      setFieldValue("totalCostBase", Data.totalCostBase);
    }
  };

  let onSubmit = async (values) => {
    console.log("values", values);

    props.setFieldValue(props.modalObject.key, values);
    props.setFieldValue(
      props.modalObject.key.replace(/Obj/, ""),
      values.costBaseExisting
    );

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  const rowConfig = [
    {
      name: "stampDuty",
      type: "select",
      styleSet: { width: "150px" },
      options: [
        { value: "Standard Rates", label: "Standard Rates" },
        {
          value:
            props.modalObject.key.match(/\d+/)?.[0] === "0"
              ? "FH Buyer"
              : "Pensioner",
          label:
            props.modalObject.key.match(/\d+/)?.[0] === "0"
              ? "FH Buyer"
              : "Pensioner",
        },
        { value: "Manual", label: "Manual" },
      ],
    },

    {
      name: "stampDutyCalculation",
      type: "number-toComma",
      placeholder: "Stamp Duty Calculation",
      disabled: false,
    },
    {
      name: "otherPurchaseCosts",
      type: "number-toComma",
      placeholder: "Other Purchase Costs",
    },
    {
      name: "costBaseExisting",
      type: "number-toComma",
      placeholder: "Cost Base (Existing)",
    },

    {
      name: "totalCostBase",
      type: "number-toComma",
      placeholder: "Total Cost Base",
      disabled: true,
    },
  ];

  const handleChildButtonClick = async (values, setFieldValue) => {
    try {
      let updatedData = JSON.parse(JSON.stringify(cashFlowData));

      const { values: parentValues, key, title } = props.modalObject;

      const numberOfProperties =
        parseInt(parentValues.numberOfProperties, 10) || 1;

      const currentIndex = key.match(/\d+/)?.[0] || 0; // Extract numeric index from key
      console.log(currentIndex);

      let structuredEntries = Array.from(
        { length: numberOfProperties },
        (_, i) => ({
          address: parentValues[`address_${i}`] || "",
          currentValue: parentValues[`currentValue_${i}`] || "",
          state: parentValues[`state_${i}`] || "",
          clientOwnership: parentValues[`clientOwnership_${i}`] || "0%",
          partnerOwnership: parentValues[`partnerOwnership_${i}`] || "0%",
          yearOfPurchase: parentValues[`yearOfPurchase_${i}`] || "",
          totalCostBase: parentValues[`totalCostBase_${i}`] || "",
          totalCostBaseObj: parentValues[`totalCostBaseObj_${i}`] || "",
          loanBalance: parentValues[`loanBalance_${i}`] || "",
          familyHomeLoanObj: parentValues[`familyHomeLoanObj_${i}`] || {},
          expectedGrowthRate: parentValues[`expectedGrowthRate_${i}`] || "",
          sellPropertyInYear: parentValues[`sellPropertyInYear_${i}`] || "",
          estimatedFutureSellingCost:
            parentValues[`estimatedFutureSellingCost_${i}`] || "",
        })
      );

      // Update the correct entry with new child modal values
      structuredEntries[currentIndex][key.replace(/_\d+/, "")] = values;

      for (let i = 0; i < numberOfProperties; i++) {
        if (i != currentIndex) {
          structuredEntries[i].totalCostBaseObj = {};
          structuredEntries[i].familyHomeLoanObj = {};
        } else if (
          structuredEntries[i]?.familyHomeLoanObj &&
          !structuredEntries[i].familyHomeLoanObj.interestOnlyPeriod
        ) {
          structuredEntries[i].familyHomeLoanObj = {};
        }
      }

      updatedData.cf_familyHome.client = structuredEntries;
      updatedData.cf_familyHome.numberOfProperties = numberOfProperties;

      console.log(JSON.stringify(updatedData));

      // throw new Error("An error occurred while processing the data.");

      // Send API request
      const res = await PostAxios(
        `${DefaultUrl}/api/cal/cf_familyHome/INPUTS_Lifestyle_Assets_Debt`,
        updatedData
      );

      if (res) {
        console.log(res);
        const { totalCostBaseObj } = res.data.cf_familyHome[currentIndex];

        if (values.stampDuty !== "Manual") {
          setFieldValue(
            "stampDutyCalculation",
            toCommaAndDollar(totalCostBaseObj.stampDutyCalculation)
          );
        }
        setFieldValue(
          "totalCostBase",
          toCommaAndDollar(totalCostBaseObj.totalCostBase)
        );
        setCashFlowReCalculateLoading(false);
        openNotificationSuccess(
          "success",
          "topRight",
          "Success Notification",
          `Data of "${title}" is Saved`
        );
      }
    } catch (error) {
      console.error("API Error:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Data of "${props.modalObject.title}" was not saved. Please try again.`
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
      {({ values, handleChange, setFieldValue, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [values.NumberOfMap]);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="mt-4">
                    <Table striped bordered responsive hover>
                      <thead>
                        <tr>
                          <th colSpan={2}>Stamp Duty</th>
                          {/*
                                                        <th>Stamp Duty Calculation</th>
                                                        */}
                          <th>Other Purchase Costs</th>
                          <th>Cost Base (Existing)</th>
                          <th>Total Cost Base</th>
                        </tr>
                      </thead>
                      <tbody>
                        <DynamicTableRow
                          rowConfig={rowConfig.map((item) => ({
                            ...item,
                            disabled:
                              item.name === "stampDutyCalculation"
                                ? values.stampDuty !== "Manual"
                                : item.disabled,
                          }))}
                          values={values}
                          setFieldValue={setFieldValue}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                        />
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
                </div>
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};
export default CashFlowTotalCost;
