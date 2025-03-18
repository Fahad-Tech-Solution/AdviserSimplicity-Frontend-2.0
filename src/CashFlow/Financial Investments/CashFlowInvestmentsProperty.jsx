import React, { useEffect, useState } from "react";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { Field, Form, Formik } from "formik";
import { Row, Table } from "react-bootstrap";
import { FaRegBuilding } from "react-icons/fa6";
import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import TotalCostBase from "./TotalCostBase";
import CashFlowHomeLoan from "../PersonalAssetsComponents/CashFlowNew/CashFlowHomeLoan";
import {
  CashFlowData,
  CashFlowScenarioData,
  defaultUrl,
  QuestionDetail,
} from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  toCommaAndDollar,
} from "../../Components/Assets/Api/Api";

const CashFlowInvestmentsProperty = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));
  let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let DefaultUrl = useRecoilValue(defaultUrl);

  let initialValues = { numberOfProperties: "" };
  
  let investmentPropertyDetails =
    Object.keys(questionDetail.investmentPropertyDetails || {}).length > 0
      ? questionDetail.investmentPropertyDetails
      : {
          client: [],
          partner: [],
          joint: [],
        };

  const fillInitialValues = (setFieldValue) => {
    try {
      // Set the object and API key
      setObjAndAPIKey(props.modalObject.key);

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      // Helper function to update field values dynamically based on index
      const updateFields = (data, index) => {
        if (!data || !Object.keys(data).length) return;

        // console.log(data.propertyLoanDetailsArray, "Data");

        const fields = {
          [`streetAddress_${index}`]:
            data.streetAddress || data.PropertyAddress || "",
          [`valueOfProperty_${index}`]:
            data.valueOfProperty || data.CurrentValue || "",
          [`clientOwnership_${index}`]:
            data.clientOwnership || data.ClientOwnership || "",
          [`partnerOwnership_${index}`]:
            data.partnerOwnership || data.PartnerOwnership || "",
          [`state_${index}`]: data.state || "",
          [`yearOfPurchase_${index}`]: data.yearOfPurchase || "",
          [`totalCostBase_${index}`]: data.totalCostBase || "$0",
          [`totalCostBaseObj_${index}`]: data.totalCostBaseObj || {
            costBaseExisting: data.costBaseExisting || data.CostBase || "",
          },
          [`expectedGrowthRate_${index}`]: data.expectedGrowthRate || "2.50%",
          [`loanBalance_${index}`]:
            data.loanBalance ||
            (data.propertyLoanDetailsArray?.length > 0 ? "Yes" : "No"),
          [`loanBalanceObj_${index}`]:
            data.loanBalanceObj || data.propertyLoanDetailsArray?.[0] || {},
          [`rentalIncome_${index}`]: data.rentalIncome || "",
          [`sellPropertyInYear_${index}`]: data.sellPropertyInYear || "No",
          [`convertToPPRYear_${index}`]: data.convertToPPRYear || "No",
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
        investmentPropertyDetails &&
        investmentPropertyDetails._id
      ) {
        investmentPropertyDetails.client.forEach((clientData, index) => {
          updateFields(clientData, index);
        });
      } else {
        // Handle cashFlowData scenario
        const cashFlowDetails = CashFlowScenarioDataObj?.[objAndAPIKey];
        console.log(cashFlowDetails, "cashFlowDetails");

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
    const numberOfProperties = parseInt(values.numberOfProperties, 10);
    const newEntries = [];

    // Iterate through properties and structure data
    for (let i = 0; i < numberOfProperties; i++) {
      const newEntry = {
        streetAddress: values[`streetAddress_${i}`] || "",
        clientOwnership: values[`clientOwnership_${i}`] || "",
        partnerOwnership: values[`partnerOwnership_${i}`] || "",
        valueOfProperty: values[`valueOfProperty_${i}`] || "",
        state: values[`state_${i}`] || "",
        yearOfPurchase: values[`yearOfPurchase_${i}`] || "",
        totalCostBase: values[`totalCostBase_${i}`] || "",
        totalCostBaseObj: values[`totalCostBaseObj_${i}`] || "",
        expectedGrowthRate: values[`expectedGrowthRate_${i}`] || "",
        loanBalance: values[`loanBalance_${i}`] || "",
        loanBalanceObj: values[`loanBalanceObj_${i}`] || "",
        rentalIncome: values[`rentalIncome_${i}`] || "",
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
            (parseFloat(entry.valueOfProperty.replace(/[^0-9.-]+/g, "")) || 0),
          0
        )
      ),
      partnerTotal: toCommaAndDollar(
        newEntries.reduce(
          (total, entry) =>
            total +
            (parseFloat(
              entry.loanBalanceObj?.loanBalance?.replace(/[^0-9.-]+/g, "")
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

  const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
    value: (i + 1).toString(),
    label: ("Year " + (i + 1)).toString(),
  }));

  const loanTermOptionsWithNo = Array.from({ length: 31 }, (_, i) => {
    if (i === 0) {
      return {
        value: "No",
        label: "No",
      };
    }

    return {
      // value: (i + 1).toString(),
      value: i + 1,
      label: ("Year " + (i + 1)).toString(),
    };
  });

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
        console.log("Ma nahi Btao gha");
        break;
    }
  };

  let handleInnerModal = (title, values, key, stakeHolder) => {
    console.log(title, values, key);
    setModalObject({
      title,
      values,
      key,
      stakeHolder,
      ParentObject: props.modalObject,
      cal: true,
    });
    setFlagState(true);
  };

  const indexation = Array.from(
    { length: 11 },
    (_, i) => (i * 0.5).toFixed(2) + "%"
  )
    .filter((value) => value !== "0.50%")
    .map((value) => ({ value, label: value }));

  let rowConfig = [
    {
      value: "1",
      type: "plainText2.0",
    },
    {
      name: "streetAddress",
      type: "text",
      placeholder: "Street Address",
    },
    {
      name: "valueOfProperty",
      type: "number-toComma",
      placeholder: "Value of Property",
    },
    {
      name: "clientOwnership",
      type: "number-toPercent",
      callBack: true,
      func: CalculatePercentage,
      placeholder: "Client % Ownership",
    },
    {
      name: "partnerOwnership",
      type: "number-toPercent",
      callBack: true,
      func: CalculatePercentage,
      placeholder: "Partner % Ownership",
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
      name: "yearOfPurchase",
      type: "select",
      placeholder: "Year of Purchase",
      options: loanTermOptions,
    },
    {
      name: "totalCostBaseObj",
      type: "modal",
      placeholder: "Total Cost Base",
      innerModalTitle: "Total Cost Base",
      key: "totalCostBaseObj",
    },
    {
      name: "expectedGrowthRate",
      type: "number-toPercent",
      placeholder: "Expected Growth Rate",
    },
    {
      name: "loanBalance",
      type: "yesnoModal",
      placeholder: "Loan Balance",
      innerModalTitle: "Loan Balance",
      key: "loanBalanceObj",
      callBack: true,
      func: handleInnerModal,
    },
    {
      name: "rentalIncome",
      type: "yesno",
      placeholder: "Rental Income",
    },
    {
      name: "sellPropertyInYear",
      type: "select",
      placeholder: "Sell Property in Year",
      options: loanTermOptionsWithNo,
    },
    {
      name: "convertToPPRYear",
      type: "select",
      placeholder: "Convert into PPR in Year",
      options: loanTermOptionsWithNo,
    },
    {
      name: "estimatedFutureSellingCost",
      type: "select",
      placeholder: "Estimated Future Sellling Cost (%)",
      options: indexation,
    },
  ];

  const componentMapping = {
    "Total Cost Base": <TotalCostBase />,
    "Loan Balance": <CashFlowHomeLoan />,
  };

  const ModalContent = (obj) => {
    return componentMapping[obj.title] || null;
  };

  let handleInput = (e, setFieldValue) => {
    let value = e.target.value > 10 ? 10 : e.target.value;

    setFieldValue(e.target.id, value);
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
            <InnerModal
              modalObject={modalObject}
              setFieldValue={setFieldValue}
              setFlagState={setFlagState}
              flagState={flagState}
            >
              {ModalContent(modalObject)}
            </InnerModal>

            <Row>
              <div className="col-md-12">
                <div className="d-flex justify-content-center align-items-center gap-4">
                  <label htmlFor="" className="text-end fw-bold">
                    Number of properties
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
                    <div className="mt-4">
                      <Table striped bordered responsive hover>
                        <thead>
                          <tr>
                            <th>No#</th>
                            <th>Street Address</th>
                            <th>
                              Value of Property -{" "}
                              <a
                                href="https://www.property.com.au/"
                                target="_blank"
                                className="text-white"
                              >
                                <FaRegBuilding />
                              </a>
                            </th>
                            <th>Client %Ownership</th>
                            <th>Partner %Ownership</th>
                            <th style={{ color: "black" }}>State</th>
                            <th>Year Of Purchase</th>
                            <th>Total Cost Base</th>
                            <th>Expected Growth Rate</th>
                            <th>Loan Balance</th>
                            <th>Rental Income</th>
                            <th>Sell Property in Year</th>
                            <th>Convert into PPR in year</th>
                            <th style={{ color: "black" }}>
                              Estimated Future Sellling Cost (%)
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
              )}
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CashFlowInvestmentsProperty;
