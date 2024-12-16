import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { CreatableMultiSelectField } from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableRow from "../../../Components/Assets/Dynamic/DynamicTableRow";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
  toCommaAndDollar,
} from "../../../Components/Assets/Api/Api";
import { Row, Table } from "react-bootstrap";
import { CashFlowData, CashFlowScenarioData, defaultUrl, QuestionDetail } from "../../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";

const CashFlowCenterLink = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));
  let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

  let DefaultUrl = useRecoilValue(defaultUrl);

  let incomeFromCentrelink =
    Object.keys(questionDetail.incomeFromCentrelink || {}).length > 0
      ? questionDetail.incomeFromCentrelink
      : {
        client: [],
        partner: [],
        joint: [],
      };

  let initialValues = {
    owner: [],
    client: {

      includeFromYear: 1,
      allowCarerAllowance: ["No"],
      isClientRenting: ["No"],
      applySeparatedByIllness: "No"
    },
    partner: {
      includeFromYear: 1,
      allowCarerAllowance: ["No"],
      isClientRenting: ["No"],
      applySeparatedByIllness: "No"
    },
  };


  const fillInitialValues = (setFieldValue) => {
    try {
      // Set the object and API key
      setObjAndAPIKey(props.modalObject.key);

      console.log(incomeFromCentrelink, "Discovery Form Data");
      // console.log(cashFlowData, "cashFlowData Form Data");
      // console.log(CashFlowScenarioDataObj, "CashFlowScenarioDataObj Form Data");

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      // Helper function to update field values
      const updateFields = (data, prefix) => {

        if (!data || !Object.keys(data).length) return;
        const fields = {
          includeFromYear: data.includeFromYear || 1,
          allowCarerAllowance: data.allowCarerAllowance || data.paymentType || "",
          isClientRenting: data.isClientRenting || data.paymentType || "",
          centrelinkPayment: data.centrelinkPayment || data.paymentType || "",
          applySeparatedByIllness: data.applySeparatedByIllness || "",
        };

        Object.entries(fields).forEach(([key, value]) => {
          setFieldValue(`${prefix}.${key}`, value);
        });
      };

      // Update owner field
      if (scenarioObj?.selectedSource === "discoveryForm" && incomeFromCentrelink && incomeFromCentrelink._id) {
        setFieldValue(`owner`, incomeFromCentrelink.owner || "");

        // Update client-related fields
        if (incomeFromCentrelink.owner.includes("client")) {
          updateFields(incomeFromCentrelink.client, "client");
        }

        // Update partner-related fields
        if (UserStatus === "Married" && incomeFromCentrelink.owner.includes("partner")) {
          updateFields(incomeFromCentrelink.partner, "partner");
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
      obj.clientTotal = "Year " + values.client.includeFromYear || "";
    }
    else {
      obj.clientTotal = ""
    }

    if (values.owner.includes("partner")) {
      obj.partnerTotal = "Year " + values.partner.includeFromYear || "";
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

  const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
    value: (i + 1).toString(),
    label: ("Year " + (i + 1)).toString(),
  }));

  const indexation = Array.from({ length: 21 }, (_, i) => ({
    value: (i * 0.5).toFixed(2) + "%",
    label: (i * 0.5).toFixed(2) + "%",
  }));

  const options =
    UserStatus !== "Single"
      ? [
        { value: "client", label: RenderName("client") },
        { value: "partner", label: RenderName("partner") },
      ]
      : [{ value: "client", label: RenderName("client") }];

  let paymentType = [

    { value: "Age Pension", label: "Age Pension" },
    { value: "Disability Pension", label: "Disability Pension" },
    { value: "Carer Payment", label: "Carer Payment" },
    { value: "Carer Allowance", label: "Carer Allowance" },
    { value: "Jobseeker", label: "Jobseeker" },
    { value: "Family Tax Benefit A", label: "Family Tax Benefit A" },
    { value: "Family Tax Benefit B", label: "Family Tax Benefit B" },
    { value: "Rent Assistance", label: "Rent Assistance" },
    { value: "No", label: "No" },
  ];


  let CheckMultiSelect = (value, setFieldValue, currentInput) => {
    let selectedArray = currentInput.value;

    // console.log(selectedArray);

    // Check if "No" is selected
    const hasNoValue = selectedArray.some((item) => item.value === "No");
    const noIndex = selectedArray.findIndex((item) => item.value === "No");

    // If only "No" is selected or if "No" is the last selection, set only ["No"]
    if (
      (selectedArray.length === 1 && hasNoValue) ||
      (selectedArray.length === 2 && hasNoValue && noIndex === 1)
    ) {
      setFieldValue(currentInput.name, ["No"]);
      return;
    }

    if (hasNoValue && selectedArray.length > 2) {
      // If "No" is present in a larger selection, prioritize it and set only ["No"]
      setFieldValue(currentInput.name, ["No"]);
    } else {
      // Filter out any "No" values and use the remaining selected items
      const filtered = selectedArray
        .filter((item) => item.value !== "No")
        .map((item) => item.value);
      setFieldValue(currentInput.name, filtered);
    }
  };

  const rowConfig = [
    {
      name: "centrelinkPayment",
      type: "select-multi",
      options: paymentType,
    },
    {
      name: "includeFromYear",
      type: "select",
      options: loanTermOptions,
    },
    {
      name: "allowCarerAllowance",
      type: "select-multi",
      options: paymentType,
      callBack: true,
      func: CheckMultiSelect,
    },
    {
      name: "isClientRenting",
      type: "select-multi",
      options: paymentType,
      callBack: true,
      func: CheckMultiSelect,
    },
    {
      name: "applySeparatedByIllness",
      type: "yesno",
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
                        <th>Centrelink Payment</th>
                        <th>Include From Year</th>
                        <th>Allow Carer Allowance</th>
                        <th>Is Client Renting</th>
                        <th>Apply Separated By illness</th>
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

export default CashFlowCenterLink;
