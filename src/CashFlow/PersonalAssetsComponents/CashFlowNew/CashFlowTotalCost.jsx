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
    if (
      Object.keys(props.modalObject.values[props.modalObject.key + "Obj"] || {})
        .length > 0
    ) {
      let Data = props.modalObject.values[props.modalObject.key + "Obj"];
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

    props.setFieldValue(props.modalObject.key + "Obj", values);
    props.setFieldValue(props.modalObject.key, values.costBaseExisting);

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
        { value: "FH Buyer", label: "FH Buyer" },
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

  let handleChildButtonClick = async (values, setFieldValue) => {

    try {
      let obj = JSON.parse(JSON.stringify(cashFlowData));

      obj.cf_familyHome = props.modalObject.values;

      obj.cf_familyHome[props.modalObject.key + "Obj"] = values;

      let res = await PostAxios(`${DefaultUrl}/api/cal/cf_familyHome`, obj);
      if (res) {
        let { totalCostBaseObj } = res.data;

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
