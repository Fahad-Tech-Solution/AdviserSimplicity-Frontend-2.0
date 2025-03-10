import React, { useEffect, useState } from "react";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { Form, Formik } from "formik";
import { Row, Table } from "react-bootstrap";
import {
  openNotificationSuccess,
  PostAxios,
  toCommaAndDollar,
} from "../../Components/Assets/Api/Api";
import {
  CashFlowData,
  CashFlowReCalculateLoading,
  defaultUrl,
} from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";

const TotalCostBase = (props) => {
  let DefaultUrl = useRecoilValue(defaultUrl);
  let cashFlowData = useRecoilValue(CashFlowData);
  let [cashFlowReCalculateLoading, setCashFlowReCalculateLoading] =
    useRecoilState(CashFlowReCalculateLoading);

  let initialValues = {
    stampDutyType: "",
    stampDutyValue: "",
    otherPurchaseCosts: "",
    costBaseExisting: "",
    totalCostBase: "",
  };

  let fillInitialValues = (setFieldValue) => {
    console.log(props.modalObject);
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

  let handleChildButtonClick = async (values, setFieldValue) => {
    try {
      let obj = JSON.parse(JSON.stringify(cashFlowData));

      obj[props.modalObject.ParentObject.key] = props.modalObject.values;

      obj[props.modalObject.ParentObject.key][props.modalObject.key] = values;

      console.log(obj[props.modalObject.ParentObject.key]);

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

      console.log(
        "props.modalObject.ParentObject.key",
        props.modalObject.ParentObject.key
      );

      let api = `${DefaultUrl}/api/cal/${
        apiKey[props.modalObject.ParentObject.key].key
      }/${apiKey[props.modalObject.ParentObject.key].param}`;
      console.log(api);

      // throw "Error";

      let res = await PostAxios(api, obj);
      if (res) {
        console.log(res.data);

        let DataObj = res.data[props.modalObject.ParentObject.key];

        if (values.stampDuty !== "Manual") {
          setFieldValue(
            "stampDutyValue",
            toCommaAndDollar(DataObj.totalCostBaseObj.stampDutyValue)
          );
        }
        setFieldValue(
          "totalCostBase",
          toCommaAndDollar(DataObj.totalCostBaseObj.totalCostBase)
        );

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
