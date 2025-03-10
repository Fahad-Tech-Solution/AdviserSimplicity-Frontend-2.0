import React, { useEffect, useState } from "react";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { Form, Formik } from "formik";
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

  let initialValues = {
    streetAddress: "",
    valueOfProperty: "",
    clientOwnership: "",
    partnerOwnership: "",
    yearOfPurchase: "",
    totalCostBaseObj: {},
    expectedGrowthRate: "",
    loanBalance: "",
    loanBalanceObj: {},
    rentalIncome: "",
    sellPropertyInYear: "",
    convertToPPRYear: "",
  };

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

      // console.log(investmentPropertyDetails, "Discovery Form Data");
      // console.log(cashFlowData[props.modalObject.key], "cashFlowData Form Data");
      // console.log(CashFlowScenarioDataObj, "CashFlowScenarioDataObj Form Data");

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      // Helper function to update field values
      const updateFields = (data, prefix) => {
        if (!data || !Object.keys(data).length) return;

        console.log(data.propertyLoanDetailsArray, "Data");

        const fields = {
          streetAddress: data.streetAddress || data.PropertyAddress || "",
          valueOfProperty: data.valueOfProperty || data.CurrentValue || "",
          clientOwnership: data.clientOwnership || data.ClientOwnership || "",
          partnerOwnership:
          data.partnerOwnership || data.PartnerOwnership || "",
          state: data.state || "",
          yearOfPurchase: data.yearOfPurchase || "",
          totalCostBaseObj: data.totalCostBaseObj || {
            costBaseExisting: data.costBaseExisting || data.CostBase || "",
          },
          expectedGrowthRate: data.expectedGrowthRate || "2.50%",
          loanBalance:
            data.loanBalance ||
            (data.propertyLoanDetailsArray.length > 0 && "Yes") ||
            "No",
          loanBalanceObj:
            data.loanBalanceObj || data.propertyLoanDetailsArray[0] || {},
          rentalIncome: data.rentalIncome || "",
          sellPropertyInYear: data.sellPropertyInYear || "No",
          convertToPPRYear: data.convertToPPRYear || "No",
          estimatedFutureSellingCost: data.estimatedFutureSellingCost || "",
        };

        Object.entries(fields).forEach(([key, value]) => {
          setFieldValue(`${key}`, value);
        });
      };

      // Update owner field
      if (
        scenarioObj?.selectedSource === "discoveryForm" &&
        investmentPropertyDetails &&
        investmentPropertyDetails._id
      ) {
        // setFieldValue(`address`, PersonalData.client.clientHomeAddress || "");

        let Obj = investmentPropertyDetails?.client[0];
        updateFields(Obj, "client");
      } else {
        // Handle cashFlowData scenario
        const cashFlowDetails = CashFlowScenarioDataObj?.[objAndAPIKey];
        console.log(cashFlowDetails, "cashFlowDetails");
        if (cashFlowDetails) {
          updateFields(cashFlowDetails, "client");
        }
      }

      // Additional data from cashFlowData
      if (cashFlowData?.[objAndAPIKey]?._id) {
        const cashFlowDataDetails = cashFlowData[objAndAPIKey];
        updateFields(cashFlowDataDetails, "client");
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

    obj.clientTotal = values.valueOfProperty || "$0";

    obj.partnerTotal = values.loanBalanceObj.loanBalance || "$0";

    const bankAccountArray = cashFlowData?.[objAndAPIKey]?._id || "";

    console.log(JSON.stringify(obj), "final obj");

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
    // console.log(values, setFieldValue, CurrentInput, stakeHolder);

    let clientOwnership = values.clientOwnership.replace(/[^0-9.]+/g, "") || 0;
    let partnerOwnership =
      values.partnerOwnership.replace(/[^0-9.]+/g, "") || 0;

    switch (CurrentInput.name) {
      case "clientOwnership":
        clientOwnership = CurrentInput.value.replace(/[^0-9.]+/g, "");
        setFieldValue(
          "partnerOwnership",
          (100 - (clientOwnership > 100 ? 100 : clientOwnership)).toFixed(2) +
            "%"
        );
        break;
      case "partnerOwnership":
        partnerOwnership = CurrentInput.value.replace(/[^0-9.]+/g, "");
        setFieldValue(
          "clientOwnership",
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
                        <DynamicTableRow
                          rowConfig={rowConfig}
                          values={values}
                          setFieldValue={setFieldValue}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          handleInnerModal={handleInnerModal}
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

export default CashFlowInvestmentsProperty;
