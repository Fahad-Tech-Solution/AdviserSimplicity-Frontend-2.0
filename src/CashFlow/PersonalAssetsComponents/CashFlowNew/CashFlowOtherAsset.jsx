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
import { Card, Row, Table } from "react-bootstrap";
import { CashFlowData, CashFlowScenarioData, defaultUrl, GoalsDetail, QuestionDetail } from "../../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";

const CashFlowOtherAsset = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));
  let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");


  let goalsDetail = useRecoilValue(GoalsDetail);
  let DefaultUrl = useRecoilValue(defaultUrl);

  let other =
    Object.keys(questionDetail[props.modalObject.key.replace("cf_", "")] || {}).length > 0
      ? questionDetail[props.modalObject.key.replace("cf_", "")]
      : {
        client: [],
        partner: [],
        joint: [],
      };

  let initialValues = {
    owner: [],
    client: {
      currentValue: "",
      sellInYear: "No",
      newPurchase: "",
      purchaseInYear: 30,
      indexation: "2.50%",
    },
    partner: {
      currentValue: "",
      sellInYear: "No",
      newPurchase: "",
      purchaseInYear: 30,
      indexation: "2.50%",
    },
  };

  let onlyJoint = ["Boat", "Caravan", "House hold"];

  const fillInitialValues = (setFieldValue) => {
    try {
      // Set the object and API key
      setObjAndAPIKey(props.modalObject.key);

      // console.log(other, "Discovery Form Data");
      // console.log(cashFlowData, "cashFlowData Form Data");
      // console.log(CashFlowScenarioDataObj, "CashFlowScenarioDataObj Form Data");

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      // Helper function to update field values
      const updateFields = (data, prefix) => {

        if (!data || !Object.keys(data).length) return;
        const fields = {
          currentValue: data.currentValue || "",
          sellInYear: data.sellInYear || "No",
          newPurchase: data.newPurchase || "$0",
          purchaseInYear: data.purchaseInYear || 30,
          indexation: data.indexation || "2.50%",
        };

        if (props.modalObject.title === "Car" && goalsDetail.carGoal && goalsDetail.carGoal.estimatedValue) {
          fields.newPurchase = goalsDetail.carGoal.estimatedValue || "";
            fields.purchaseInYear = parseFloat(goalsDetail.carGoal.when.match(/\d+/g).join('')) || 30;
        }

        Object.entries(fields).forEach(([key, value]) => {
          setFieldValue(`${prefix}.${key}`, value);
        });
      };

      // Update owner field
      if (scenarioObj?.selectedSource === "discoveryForm" && other && other._id) {
        setFieldValue(`owner`, other.owner || "");

        if (onlyJoint.includes(props.modalObject.title)) {
          if (other.owner.includes("joint")) {
            if (other?.joint && Object.keys(other.joint).length) {
              updateFields(other.joint, "joint");
            }
          }
        }


        // Update client-related fields
        if (other.owner.includes("client")) {
          updateFields(other.client, "client");
        }

        // Update partner-related fields
        if (UserStatus === "Married" && other.owner.includes("partner")) {
          updateFields(other.partner, "partner");
        }

      }
      else {
        // Handle cashFlowData scenario
        const cashFlowDetails = CashFlowScenarioDataObj?.[objAndAPIKey];
        console.log(cashFlowDetails, "cashFlowDetails")
        if (cashFlowDetails) {
          setFieldValue(`owner`, cashFlowDetails.owner || "");
          if (cashFlowDetails.owner.includes("client")) {
            // Update client details
            updateFields(cashFlowDetails.client, "client");
          }

          if (UserStatus === "Married" && cashFlowDetails.owner.includes("partner")) {
            // Update partner details
            updateFields(cashFlowDetails.partner, "partner");
          }

          if (cashFlowDataDetails.owner.includes("joint")) {
            // Update joint details
            updateFields(cashFlowDataDetails.joint, "joint");
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

        if (UserStatus === "Married" && cashFlowDataDetails.owner.includes("partner")) {
          // Update partner details
          updateFields(cashFlowDataDetails.partner, "partner");
        }

        if (cashFlowDataDetails.owner.includes("joint")) {
          // Update joint details
          updateFields(cashFlowDataDetails.joint, "joint");
        }
      }
    } catch (error) {
      console.error("Error in fillInitialValues:", error);
    }
  };

  let onSubmit = async (values) => {
    console.log(JSON.stringify(values));
    // return (false);
    let obj = values

    obj.scenarioFK = (JSON.parse(localStorage.getItem("ScenarioObj")))._id;

    if (values.owner.includes("client")) {
      obj.clientTotal = values.client.currentValue || "$0";
    }
    else if (values.owner.includes("joint")) {
      obj.clientTotal = values.joint.currentValue || "$0";
    }
    else {
      obj.clientTotal = ""
    }

    if (values.owner.includes("partner")) {
      obj.partnerTotal = values.partner.currentValue || "$0";
    }
    else {
      obj.partnerTotal = ""
    }

    const bankAccountArray = cashFlowData?.[objAndAPIKey]?._id || "";

    console.log(obj, "final obj");

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/CF/${objAndAPIKey}/Add`,
          obj
        );
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

  const loanTermOptions = Array.from({ length: 31 }, (_, i) => {

    if (i === 0) {
      return ({
        value: "No",
        label: "No"
      });
    }

    return ({
      value: i.toString(),
      label: `Year ${i}`
    })
  });

  const indexation = [
    // Negative values from -0.00% to -5.00% in increments of 0.50%
    ...Array.from({ length: 11 }, (_, i) => ({
      value: `-${(i * 0.5).toFixed(2)}%`,
      label: `-${(i * 0.5).toFixed(2)}%`
    })),

    // Positive values from 0.00% to 5.00% in increments of 0.50%
    ...Array.from({ length: 11 }, (_, i) => ({
      value: (i * 0.5).toFixed(2) + "%",
      label: (i * 0.5).toFixed(2) + "%"
    }))
  ];


  const options = onlyJoint.includes(props.modalObject.title) ? [
    { value: "joint", label: RenderName("joint") }
  ] :
    (UserStatus === "Married") ?

      [{ value: "client", label: RenderName("client") },
      { value: "partner", label: RenderName("partner") }] :

      [{ value: "client", label: RenderName("client") },];

  const rowConfig = [
    {
      name: "currentValue",
      type: "number-toComma",
      placeholder: "Current Value",
    },
    {
      name: "sellInYear",
      type: "select",
      options: loanTermOptions,
    },
    {
      name: "newPurchase",
      type: "number-toComma",
      placeholder: "New Purchase",
    },
    {
      name: "purchaseInYear",
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
                        <th>Current Value</th>
                        <th>Sell In Year</th>
                        <th>New Purchase</th>
                        <th>Purchase In Year</th>
                        <th>Indexation</th>
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

                      {values.owner.includes("joint") && (
                        <DynamicTableRow
                          rowConfig={rowConfig}
                          values={values}
                          setFieldValue={setFieldValue}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          stakeHolder="joint."
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

export default CashFlowOtherAsset;
