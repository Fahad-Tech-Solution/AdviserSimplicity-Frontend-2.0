import React, { useEffect, useState } from "react";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { Form, Formik } from "formik";
import { Row, Table } from "react-bootstrap";
import {
  openNotificationSuccess,
  PostAxios,
  PostAxiosBlob,
  RenderName,
  toCommaAndDollar,
} from "../../Components/Assets/Api/Api";
import {
  CashFlowData,
  CashFlowDownloading,
  CashFlowReCalculateLoading,
  defaultUrl,
} from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";

const TotalCostBase = (props) => {
  let DefaultUrl = useRecoilValue(defaultUrl);
  let cashFlowData = useRecoilValue(CashFlowData);
  let [cashFlowReCalculateLoading, setCashFlowReCalculateLoading] =
    useRecoilState(CashFlowReCalculateLoading);
  let [cashFlowDownloading, setCashFlowDownloading] =
    useRecoilState(CashFlowDownloading);

  let initialValues = {
    stampDutyType: "",
    stampDutyValue: "",
    otherPurchaseCosts: "",
    costBaseExisting: "",
    totalCostBase: "",
  };

  let fillInitialValues = (setFieldValue) => {
    let SubObj = props.modalObject.values;
    if (SubObj[props.modalObject.key]) {
      let Data = SubObj[props.modalObject.key];
      setFieldValue("stampDutyType", Data.stampDutyType);
      setFieldValue("stampDutyValue", Data.stampDutyValue);
      setFieldValue("otherPurchaseCosts", Data.otherPurchaseCosts);
      setFieldValue("costBaseExisting", Data.costBaseExisting);
      setFieldValue("totalCostBase", Data.totalCostBase);
    }
  };

  let onSubmit = (values) => {
    props.setFieldValue(props.modalObject.key, values);

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  //   let StampDutyOptions =
  //     props.modalObject.ParentObject.title === "Investments Property"
  //       ? [
  //           { value: "Standard Rates", label: "Standard Rates" },
  //           { value: "FH Buyer", label: "FH Buyer" },
  //           { value: "Manual", label: "Manual" },
  //         ]
  //       : [
  //           { value: "Standard Rates", label: "Standard Rates" },
  //           { value: "Manual", label: "Manual" },
  //         ];

  let StampDutyOptions = [
    { value: "Standard Rates", label: "Standard Rates" },
    { value: "Manual", label: "Manual" },
  ];

  let CalculateTotal = (values, setFieldValue, currentInput, stakeHolder) => {
    let stampDutyType = values.stampDutyType;
    let stampDutyValue = values.stampDutyValue.replace(/[^0-9.-]+/g, "");
    let otherPurchaseCosts = values.otherPurchaseCosts.replace(
      /[^0-9.-]+/g,
      ""
    );

    switch (currentInput.name) {
      case "stampDutyType":
        stampDutyType = currentInput.value;
        break;
      case "stampDutyValue":
        stampDutyValue = currentInput.value.replace(/[^0-9.-]+/g, "");
        break;
      case "otherPurchaseCosts":
        otherPurchaseCosts = currentInput.value.replace(/[^0-9.-]+/g, "");
        break;
      default:
        console.warn("No valid input selected"); // Use warn for non-critical issues
        break;
    }

    // console.log(StampDutyType, StampDutyValue, OtherPurchaseCosts, props.modalObject.values);

    if (stampDutyType === "Manual") {
      // Try-catch block for parsing and calculation
      try {
        const parsedValueOfProperty =
          parseFloat(
            props.modalObject.values.valueOfProperty.replace(/[^0-9.-]+/g, "")
          ) || 0;

        const totalCostBase =
          parseFloat(stampDutyValue) +
          parseFloat(otherPurchaseCosts) +
          parsedValueOfProperty;
        console.log(totalCostBase);
        setFieldValue("totalCostBase", toCommaAndDollar(totalCostBase));
      } catch (error) {
        console.error("Error calculating total cost base:", error);
        // Handle the error here (e.g., display an error message to the user)
      }
    }
  };

  let rowConfig = [
    {
      name: "stampDutyType",
      type: "select",
      placeholder: "Stamp Duty",
      options: StampDutyOptions,
      callBack: true,
      func: CalculateTotal,
    },
    {
      name: "stampDutyValue",
      type: "number-toComma",
      placeholder: "Stamp Duty Value",
      disabled: true,
      callBack: true,
      func: CalculateTotal,
    },
    {
      name: "otherPurchaseCosts",
      type: "number-toComma",
      placeholder: "Other Purchase Costs",
      callBack: true,
      func: CalculateTotal,
    },
    {
      name: "costBaseExisting",
      type: "number-toComma",
      placeholder: "Cost Base Existing",
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

      const {
        values: parentValues,
        key,
        title,
        ParentObject,
      } = props.modalObject;

      const numberOfProperties =
        parseInt(parentValues.numberOfProperties, 10) || 1;

      const currentIndex = key.match(/\d+/)?.[0] || 0; // Extract numeric index from key

      let structuredEntries = Array.from(
        { length: numberOfProperties },
        (_, i) => ({
          streetAddress: parentValues[`streetAddress_${i}`] || "",
          valueOfProperty: parentValues[`valueOfProperty_${i}`] || "",
          clientOwnership: parentValues[`clientOwnership_${i}`] || "0%",
          partnerOwnership: parentValues[`partnerOwnership_${i}`] || "0%",
          state: parentValues[`state_${i}`] || "",
          yearOfPurchase: parentValues[`yearOfPurchase_${i}`] || "",
          totalCostBase: parentValues[`totalCostBase_${i}`] || "",
          totalCostBaseObj: parentValues[`totalCostBaseObj_${i}`] || {},
          expectedGrowthRate: parentValues[`expectedGrowthRate_${i}`] || "",
          loanBalance: parentValues[`loanBalance_${i}`] || "",
          loanBalanceObj: parentValues[`loanBalanceObj_${i}`] || {},
          rentalIncome: parentValues[`rentalIncome_${i}`] || "",
          sellPropertyInYear: parentValues[`sellPropertyInYear_${i}`] || "",
          convertToPPRYear: parentValues[`convertToPPRYear_${i}`] || "",
          estimatedFutureSellingCost:
            parentValues[`estimatedFutureSellingCost_${i}`] || "",
        })
      );

      // Update the correct entry with new child modal values
      structuredEntries[currentIndex][key.replace(/_\d+/, "")] = values;

      updatedData[ParentObject.key].client = structuredEntries;
      updatedData[ParentObject.key].numberOfProperties = numberOfProperties;

      // console.log(
      //   JSON.stringify(updatedData[ParentObject.key], null, 2),
      //   ParentObject.key
      // );

      let apiKey = {
        cf_familyHome: {
          key: "cf_familyHome",
          param: "INPUTS_Lifestyle_Assets_Debt",
        },
        cf_investmentsProperty: {
          key: "financialInvestment",
          param: "INPUTS_Property",
        },
        cf_SMSFInvestmentProperties: {
          key: "SMSF",
          param: "INPUTS_SMSF_Property",
        },
        cf_FamilyTrustInvestmentProperties: {
          key: "investmentsTrust",
          param: "INPUTS_TRUST_Property",
        },
      };

      let api = `${DefaultUrl}/api/cal/${apiKey[ParentObject.key].key}/${
        apiKey[ParentObject.key].param
      }`;
      console.log(api);

      // throw new Error("An error occurred while processing the data.");

      // Send API request
      const res = await PostAxios(api, updatedData);

      if (res) {
        console.log(res.data, ParentObject.key, currentIndex);
        const { totalCostBaseObj } = res.data[ParentObject.key][currentIndex];

        if (values.stampDuty !== "Manual") {
          setFieldValue("stampDutyValue", totalCostBaseObj.stampDutyValue);
        }

        setFieldValue("totalCostBase", totalCostBaseObj.totalCostBase);

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

  const handleChildButtonDownloadClick = async (values, setFieldValue) => {
    try {
      let updatedData = JSON.parse(JSON.stringify(cashFlowData));

      const {
        values: parentValues,
        key,
        title,
        ParentObject,
      } = props.modalObject;

      const numberOfProperties =
        parseInt(parentValues.numberOfProperties, 10) || 1;

      const currentIndex = key.match(/\d+/)?.[0] || 0; // Extract numeric index from key

      let structuredEntries = Array.from(
        { length: numberOfProperties },
        (_, i) => ({
          streetAddress: parentValues[`streetAddress_${i}`] || "",
          valueOfProperty: parentValues[`valueOfProperty_${i}`] || "",
          clientOwnership: parentValues[`clientOwnership_${i}`] || "0%",
          partnerOwnership: parentValues[`partnerOwnership_${i}`] || "0%",
          state: parentValues[`state_${i}`] || "",
          yearOfPurchase: parentValues[`yearOfPurchase_${i}`] || "",
          totalCostBase: parentValues[`totalCostBase_${i}`] || "",
          totalCostBaseObj: parentValues[`totalCostBaseObj_${i}`] || {},
          expectedGrowthRate: parentValues[`expectedGrowthRate_${i}`] || "",
          loanBalance: parentValues[`loanBalance_${i}`] || "",
          loanBalanceObj: parentValues[`loanBalanceObj_${i}`] || {},
          rentalIncome: parentValues[`rentalIncome_${i}`] || "",
          sellPropertyInYear: parentValues[`sellPropertyInYear_${i}`] || "",
          convertToPPRYear: parentValues[`convertToPPRYear_${i}`] || "",
          estimatedFutureSellingCost:
            parentValues[`estimatedFutureSellingCost_${i}`] || "",
        })
      );

      // Update the correct entry with new child modal values
      structuredEntries[currentIndex][key.replace(/_\d+/, "")] = values;

      updatedData[ParentObject.key].client = structuredEntries;
      updatedData[ParentObject.key].numberOfProperties = numberOfProperties;

      try {
        const response = await PostAxiosBlob(
          `${DefaultUrl}/api/cal/workBookDownload`,
          updatedData
        );

        const fileName = `UpdatedWorkbook_of_${RenderName("client")}.xlsx`;

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        openNotificationSuccess(
          "success",
          "topRight",
          "Success Notification",
          `Excel file "${fileName}" is downloaded.`
        );
      } catch (error) {
        console.error("Download Error:", error);
        openNotificationSuccess(
          "error",
          "topRight",
          "Download Failed",
          "Something went wrong while downloading the Excel file."
        );
      } finally {
        setCashFlowDownloading(false); // Always hide loading spinner
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
        }, []);

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
                          <th>Other Purchase Costs</th>
                          <th>Cost Base (Existing)</th>
                          <th>Total Cost Base</th>
                        </tr>
                      </thead>
                      <tbody>
                        <DynamicTableRow
                          // rowConfig={rowConfig}
                          rowConfig={rowConfig.map((item) => ({
                            ...item,
                            disabled:
                              item.name === "stampDutyValue"
                                ? values.stampDutyType !== "Manual"
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
                    <button
                      ref={props.childButtonDownloadRef}
                      onClick={() => {
                        handleChildButtonDownloadClick(values, setFieldValue);
                      }}
                      style={{ display: "none" }} // Hidden button
                      type="button"
                    >
                      Hidden Child Button Download
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

export default TotalCostBase;
