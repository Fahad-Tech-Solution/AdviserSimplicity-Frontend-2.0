import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CashFlowData,
  CashFlowScenarioData,
  defaultUrl,
  PersonalDetailsData,
  QuestionDetail,
} from "../../../Store/Store";

import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  toCommaAndDollar,
} from "../../../Components/Assets/Api/Api";

import DynamicTableRow from "../../../Components/Assets/Dynamic/DynamicTableRow";
import InnerModal from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import CashFlowHomeLoan from "./CashFlowHomeLoan";
import CashFlowTotalCost from "./CashFlowTotalCost";

const CashFlowFamilyHome = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));
  let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

  let DefaultUrl = useRecoilValue(defaultUrl);
  let PersonalData = useRecoilValue(PersonalDetailsData);

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let familyHome =
    Object.keys(questionDetail.familyHome || {}).length > 0
      ? questionDetail.familyHome
      : {
          client: [],
          partner: [],
          joint: [],
        }; // Use an empty object as default if familyHome is undefined

  let initialValues = {
    expectedGrowthRate: "2.50%",
    sellPropertyInYear: "No",
    yearOfPurchase: familyHome.currentValue ? "Existing" : "",
  };

  const fillInitialValues = (setFieldValue) => {
    try {
      // Set the object and API key
      setObjAndAPIKey(props.modalObject.key);

      // console.log(familyHome, "Discovery Form Data");

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      // Helper function to update field values dynamically based on index
      const updateFields = (data, index) => {
        if (!data || !Object.keys(data).length) return;

        const fields = {
          [`address_${index}`]:
            data.address || PersonalData.client.clientHomeAddress || "",
          [`currentValue_${index}`]: data.currentValue || "$0",
          [`clientOwnership_${index}`]: data.clientOwnership || "0%",
          [`partnerOwnership_${index}`]: data.partnerOwnership || "0%",
          [`yearOfPurchase_${index}`]: data.yearOfPurchase || "1",
          [`totalCostBase_${index}`]:
            data.totalCostBase || data.costBase || "$0",
          [`totalCostBaseObj_${index}`]: data.totalCostBaseObj || {},
          [`loanBalance_${index}`]: data.loanBalance || data.loanAttached || "",
          [`familyHomeLoanObj_${index}`]:
            data.familyHomeLoanObj || data.HomeLoanModal || {},
          [`expectedGrowthRate_${index}`]: data.expectedGrowthRate || "2.50%",
          [`sellPropertyInYear_${index}`]: data.sellPropertyInYear || "No",
          [`state_${index}`]: data.state || "",
          [`estimatedFutureSellingCost_${index}`]:
            data.estimatedFutureSellingCost || "",
        };

        Object.entries(fields).forEach(([key, value]) => {
          setFieldValue(key, value);
        });
      };

      // Update owner field based on selected source
      if (
        scenarioObj?.selectedSource === "discoveryForm" &&
        familyHome &&
        familyHome._id
      ) {
        // setFieldValue(`address_0`, PersonalData.client.clientHomeAddress || "");
        // setFieldValue(`address_1`, PersonalData.client.clientHomeAddress || "");
        updateFields(familyHome, 0);
      } else {
        // Handle cashFlowData scenario
        const cashFlowDetails = CashFlowScenarioDataObj?.[objAndAPIKey];
        // console.log(cashFlowDetails, "cashFlowDetails");

        setFieldValue("numberOfProperties", cashFlowDetails.client.length);

        if (cashFlowDetails?.client) {
          cashFlowDetails.client.forEach((clientData, index) => {
            updateFields(clientData, index);
          });
        }
      }

      // Additional data from cashFlowData
      if (cashFlowData?.[objAndAPIKey]?._id) {
        const cashFlowDataDetails = cashFlowData[objAndAPIKey];

        setFieldValue("numberOfProperties", cashFlowDataDetails.client.length);

        cashFlowDataDetails.client.forEach((clientData, index) => {
          updateFields(clientData, index);
        });
      }
    } catch (error) {
      console.error("Error in fillInitialValues:", error);
    }
  };

  let onSubmit = async (values) => {
    const numberOfProperties = parseInt(values.numberOfProperties, 10) || 1;
    const newEntries = [];

    // Iterate through properties and structure data
    for (let i = 0; i < numberOfProperties; i++) {
      const newEntry = {
        address: values[`address_${i}`] || "",
        currentValue: values[`currentValue_${i}`] || "",
        state: values[`state_${i}`] || "",
        clientOwnership: values[`clientOwnership_${i}`] || "$0",
        partnerOwnership: values[`partnerOwnership_${i}`] || "",
        yearOfPurchase: values[`yearOfPurchase_${i}`] || "",
        totalCostBase: values[`totalCostBase_${i}`] || "",
        totalCostBaseObj: values[`totalCostBaseObj_${i}`] || "",
        loanBalance: values[`loanBalance_${i}`] || "",
        familyHomeLoanObj: values[`familyHomeLoanObj_${i}`] || {},
        expectedGrowthRate: values[`expectedGrowthRate_${i}`] || "",
        sellPropertyInYear: values[`sellPropertyInYear_${i}`] || "",
        estimatedFutureSellingCost:
          values[`estimatedFutureSellingCost_${i}`] || "",
      };
      newEntries.push(newEntry);
    }

    let obj = {
      client: newEntries,
      scenarioFK: JSON.parse(localStorage.getItem("ScenarioObj"))._id,
      numberOfProperties,
      clientTotal: toCommaAndDollar(
        newEntries.reduce(
          (total, entry) =>
            total +
            (parseFloat(entry.currentValue.replace(/[^0-9.-]+/g, "")) || 0),
          0
        )
      ),
      partnerTotal: toCommaAndDollar(
        newEntries.reduce(
          (total, entry) =>
            total +
            (parseFloat(
              entry?.familyHomeLoanObj?.loanBalance?.replace(/[^0-9.-]+/g, "")
            ) || 0),
          0
        )
      ),
    };

    console.log(JSON.stringify(obj), "final obj");

    const bankAccountArray = cashFlowData?.[objAndAPIKey]?._id || "";

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
        console.log("API Returns Data", res);
        setCashFlowData({ ...cashFlowData, [objAndAPIKey]: res });
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        `Data of "${props.modalObject.title}" is Saved`
      );

      if (props.flagState) props.setFlagState(false);
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Data of "${props.modalObject.title}" is not Saved. Please try again.`
      );
    }
  };

  const sellPropertyInYearNo = [
    { value: "No", label: "No" },
    ...Array.from({ length: 30 }, (_, i) => ({
      value: (i + 1).toString(),
      label: "Year " + (i + 1),
    })),
  ];

  const indexation = Array.from({ length: 21 }, (_, i) => ({
    value: (i * 0.5).toFixed(2) + "%",
    label: (i * 0.5).toFixed(2) + "%",
  }));

  const yearOfPurchaseExisting = [
    { value: "Existing", label: "Existing" },
    ...Array.from({ length: 30 }, (_, i) => ({
      value: (i + 1).toString(),
      label: "Year " + (i + 1),
    })),
  ];

  const estimatedFutureSellingCostOptions = [
    { value: "0.00%", label: "0.00%" },
    { value: "1.00%", label: "1.00%" },
    { value: "1.50%", label: "1.50%" },
    { value: "2.00%", label: "2.00%" },
    { value: "2.50%", label: "2.50%" },
    { value: "3.00%", label: "3.00%" },
    { value: "3.50%", label: "3.50%" },
    { value: "4.00%", label: "4.00%" },
    { value: "4.50%", label: "4.50%" },
    { value: "5.00%", label: "5.00%" },
  ];

  let handleInnerModal = (title, values, key) => {
    // console.log(values);

    setModalObject({
      title,
      values,
      key,
      ParentObject: props.modalObject,
      cal: true,
    });
    setFlagState(true);
  };

  let CalculatePercentage = (
    values,
    setFieldValue,
    CurrentInput,
    stakeHolder
  ) => {
    // Extract index from the field name
    const match = CurrentInput.name.match(/_(\d+)$/);
    const index = match ? match[1] : 0;

    let clientOwnership =
      values[`clientOwnership_${index}`]?.replace(/[^0-9.]+/g, "") || 0;
    let partnerOwnership =
      values[`partnerOwnership_${index}`]?.replace(/[^0-9.]+/g, "") || 0;

    switch (CurrentInput.name) {
      case `clientOwnership_${index}`:
        clientOwnership = CurrentInput.value.replace(/[^0-9.]+/g, "");
        setFieldValue(
          `partnerOwnership_${index}`,
          (100 - (clientOwnership > 100 ? 100 : clientOwnership)).toFixed(2) +
            "%"
        );
        break;
      case `partnerOwnership_${index}`:
        partnerOwnership = CurrentInput.value.replace(/[^0-9.]+/g, "");
        setFieldValue(
          `clientOwnership_${index}`,
          (100 - (partnerOwnership > 100 ? 100 : partnerOwnership)).toFixed(2) +
            "%"
        );
        break;
      default:
        console.log("Unexpected input name");
        break;
    }
  };

  const rowConfig = [
    {
      name: "address",
      type: "text",
      placeholder: "Address",
      disabled: true,
    },
    {
      name: "currentValue",
      type: "number-toComma",
      placeholder: "Current Value",
    },
    {
      name: "state",
      type: "select",
      placeholder: "State",
      options: [
        { value: "ACT", label: "ACT" },
        { value: "NSW", label: "NSW" },
        { value: "NT", label: "NT" },
        { value: "QLD", label: "QLD" },
        { value: "SA", label: "SA" },
        { value: "TAS", label: "TAS" },
        { value: "VIC", label: "VIC" },
        { value: "WA", label: "WA" },
      ],
    },
    {
      name: "clientOwnership",
      type: "number-toPercent",
      callBack: true,
      func: CalculatePercentage,
      placeholder: "Client Ownership",
    },
    {
      name: "partnerOwnership",
      type: "number-toPercent",
      callBack: true,
      func: CalculatePercentage,
      placeholder: "Partner Ownership",
    },
    {
      name: "yearOfPurchase",
      type: "select",
      options: yearOfPurchaseExisting,
    },

    {
      name: "totalCostBase",
      innerModalTitle: "Total Cost Base",
      type: "number-toComma-Modal",
      placeholder: "Total Cost Base",
      callBack: true,
      key: "totalCostBaseObj",
      func: handleInnerModal,
    },

    {
      name: "loanBalance",
      innerModalTitle: "Home Loan",
      type: "yesnoModal",
      callBack: true,
      key: "familyHomeLoanObj",
      func: handleInnerModal,
    },
    {
      name: "expectedGrowthRate",
      type: "select",
      options: indexation,
    },
    {
      name: "sellPropertyInYear",
      type: "select",
      options: sellPropertyInYearNo,
    },
    {
      name: "estimatedFutureSellingCost",
      type: "select",
      options: estimatedFutureSellingCostOptions,
    },
  ];

  let handleInput = (e, setFieldValue) => {
    let value = e.target.value > 2 ? 2 : e.target.value;

    setFieldValue(e.target.id, value);
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
              <div className="col-md-12 mb-3">
                <div className="d-flex justify-content-center align-items-center gap-4">
                  <label htmlFor="" className="text-end fw-bold">
                    Number of Homes :
                  </label>

                  <div style={{ minWidth: "5%", maxWidth: "10%" }}>
                    <Field
                      type="number"
                      id="numberOfProperties"
                      name="numberOfProperties"
                      className="form-control inputDesignDoubleInput"
                      onChange={(e) => handleInput(e, setFieldValue)}
                    />
                  </div>
                </div>
              </div>
              {values.numberOfProperties && (
                <div className="col-md-12">
                  <div className="row justify-content-center">
                    <InnerModal
                      modalObject={modalObject}
                      setFieldValue={setFieldValue}
                      setFlagState={setFlagState}
                      flagState={flagState}
                    >
                      {modalObject.key === "familyHomeLoanObj_0" ||
                      modalObject.key === "familyHomeLoanObj_1" ? (
                        <CashFlowHomeLoan />
                      ) : modalObject.key === "totalCostBaseObj_0" ||
                        modalObject.key == "totalCostBaseObj_1" ? (
                        <CashFlowTotalCost />
                      ) : (
                        ""
                      )}
                    </InnerModal>

                    <div className="mt-2">
                      <Table striped bordered responsive hover>
                        <thead>
                          <tr>
                            <th>Street Address</th>
                            <th>Current Value/Purchase Price </th>
                            <th style={{ color: "black" }}>State</th>
                            <th>Client Ownership</th>
                            <th>Partner Ownership</th>
                            <th>Year Of Purchase</th>
                            <th>Total Cost Base</th>
                            <th>Loan Balance</th>
                            <th>Expected Growth Rate</th>
                            <th>Sell Property In Year</th>
                            <th style={{ color: "black" }}>
                              Estimated Future Selling Cost (%)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({
                            length: values.numberOfProperties,
                          }).map((_, index) => {
                            // Ensure each rowConfig object has a name before concatenating the index
                            const updatedRowConfig = rowConfig.map((row) => ({
                              ...row,
                              name: row.name
                                ? `${row.name}_${index}`
                                : row.name,
                              key: row.key ? `${row.key}_${index}` : row.key,
                              value: row.value ? index + 1 : row.value,
                            }));

                            return (
                              <DynamicTableRow
                                rowConfig={updatedRowConfig}
                                values={values}
                                setFieldValue={setFieldValue}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                handleInnerModal={handleInnerModal}
                              />
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CashFlowFamilyHome;
