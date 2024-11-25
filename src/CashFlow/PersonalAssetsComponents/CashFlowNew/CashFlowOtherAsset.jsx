import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { CreatableMultiSelectField } from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableRow from "../../../Components/Assets/Dynamic/DynamicTableRow";
import {
  openNotificationSuccess,
  RenderName,
} from "../../../Components/Assets/Api/Api";
import { Card, Row, Table } from "react-bootstrap";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { useRecoilValue } from "recoil";

const CashFlowOtherAsset = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));
  let DefaultUrl = useRecoilValue(defaultUrl);

  let other =
    Object.keys(questionDetail[props.modalObject.key] || {}).length > 0
      ? questionDetail[props.modalObject.key]
      : {
        client: [],
        partner: [],
        joint: [],
      };

  let initialValues = {
    owner: [],
    client: {
    },
    partner: {
    },
  };

  let onlyJoint = ["Boat", "Caravan", "House hold"];

  const fillInitialValues = (setFieldValue) => {
    console.log(other, "data", questionDetail[props.modalObject.key], props.modalObject.key);
    if (other && other._id) {

      setFieldValue(`owner`, other.owner || "");

      if (onlyJoint.includes(props.modalObject.title)) {
        if (other.owner.includes("joint")) {
          if (other?.joint && Object.keys(other.joint).length) {


            setFieldValue(`joint.currentValue`, other.joint.currentValue || "");

            return (false);
          }
        }
      }


      // Handle client-related conditions
      if (other.owner.includes("client")) {
        if (other?.client && Object.keys(other.client).length) {
          setFieldValue(`client.currentValue`, other.client.currentValue || "");

        }
      }

      // Handle partner-related conditions
      if (UserStatus === "Married" && other.owner.includes("partner")) {
        if (other?.partner && Object.keys(other.partner).length) {
          setFieldValue(`partner.currentValue`, other.partner.currentValue || "");
        }
      }

    }
  };

  let onSubmit = async (values) => {
    console.log(JSON.stringify(values));
    // return (false);

    let obj = values;
    obj.clientFK = localStorage.getItem("UserID");
    console.log(obj, "new Object");

    // Handle client-related conditions
    if (values.owner.includes("client")) {
      obj.clientTotal = values.client.regularIncomePA;
      console.log("Client total set");
    } else {
      obj.client = {};
      obj.clientTotal = "";
      console.log("Client data cleared");
    }

    // Handle partner-related conditions
    if (values.owner.includes("partner") && UserStatus === "Married") {
      obj.partnerTotal = values.partner.regularIncomePA;
      console.log("Partner total set");
    } else {
      obj.partner = {};
      obj.partnerTotal = "";
      console.log("Partner data cleared");
    }

    console.log(obj, "final obj");
    const bankAccountArray = other.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(`${DefaultUrl}/api/${props.modalObject.key}/Add`, obj);
      } else {
        res = await PatchAxios(`${DefaultUrl}/api/${props.modalObject.key}/Update`, obj);
      }

      if (res) {
        console.log(res);
        const updatedData = {
          ...questionDetail,
          [props.modalObject.key]: res,
        };
        setQuestionDetail(updatedData);
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
    value: i.toString(),
    label: `Year ${i}`
  }));

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
  ] : (UserStatus !== "Single") ? [
    { value: "client", label: RenderName("client") },
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
                      
                      {values.owner.includes("joint") &&
                        UserStatus === "Married" && (
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
