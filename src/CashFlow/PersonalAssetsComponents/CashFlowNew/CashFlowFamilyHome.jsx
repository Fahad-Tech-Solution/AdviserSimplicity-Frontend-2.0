import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { CashFlowData, CashFlowScenarioData, defaultUrl, PersonalDetailsData, QuestionDetail } from "../../../Store/Store";

import { openNotificationSuccess, PatchAxios, PostAxios } from "../../../Components/Assets/Api/Api";

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

  let [dis, setDis] = useState("");
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

      console.log(familyHome, "Discovery Form Data");
      // console.log(cashFlowData[props.modalObject.key], "cashFlowData Form Data");
      // console.log(CashFlowScenarioDataObj, "CashFlowScenarioDataObj Form Data");

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      // Helper function to update field values
      const updateFields = (data, prefix) => {

        if (!data || !Object.keys(data).length) return;
        // console.log(familyHome, "Data");

        const fields = {
          address: data.address || PersonalData.client.clientHomeAddress || "",
          currentValue: data.currentValue || "$0",
          clientOwnership: data.clientOwnership || "2.50%",
          partnerOwnership: data.partnerOwnership || "2.50%",
          yearOfPurchase: data.yearOfPurchase || "1",
          totalCostBase: data.totalCostBase || data.costBase || "$0",
          totalCostBaseObj: data.totalCostBaseObj || {},
          loanBalance: data.loanBalance || data.loanAttached || "",
          familyHomeLoan: data.familyHomeLoan || data.HomeLoanModal || {},
          expectedGrowthRate: data.expectedGrowthRate || "2.50%",
          sellPropertyInYear: data.sellPropertyInYear || "No",
        };

        Object.entries(fields).forEach(([key, value]) => {
          setFieldValue(`${key}`, value);
        });
      };

      // Update owner field
      if (scenarioObj?.selectedSource === "discoveryForm" && familyHome && familyHome._id) {
        setFieldValue(`address`, PersonalData.client.clientHomeAddress || "");
        updateFields(familyHome, "client");
      }
      else {
        // Handle cashFlowData scenario
        const cashFlowDetails = CashFlowScenarioDataObj?.[objAndAPIKey];
        console.log(cashFlowDetails, "cashFlowDetails")
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
    // console.log(JSON.stringify(values));
    // return (false);
    let obj = values

    obj.scenarioFK = (JSON.parse(localStorage.getItem("ScenarioObj")))._id;

    obj.clientTotal = values.currentValue || "$0";

    obj.partnerTotal = values.familyHomeLoan.loanBalance || "$0";

    const bankAccountArray = cashFlowData?.[objAndAPIKey]?._id || "";

    console.log(JSON.stringify(obj), "final obj");

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

  let CalculatePercentage = (values, setFieldValue, CurrentInput, stakeHolder) => {
    // console.log(values, setFieldValue, CurrentInput, stakeHolder);

    let clientOwnership = values.clientOwnership.replace(/[^0-9.]+/g, "") || 0;
    let partnerOwnership = values.partnerOwnership.replace(/[^0-9.]+/g, "") || 0;

    switch (CurrentInput.name) {
      case "clientOwnership":
        clientOwnership = CurrentInput.value.replace(/[^0-9.]+/g, "");
        setFieldValue("partnerOwnership", (100 - (clientOwnership > 100 ? 100 : clientOwnership)).toFixed(2) + "%")
        break;
      case "partnerOwnership":
        partnerOwnership = CurrentInput.value.replace(/[^0-9.]+/g, "");
        setFieldValue("clientOwnership", (100 - (partnerOwnership > 100 ? 100 : partnerOwnership)).toFixed(2) + "%")
        break;
      default:
        console.log("Ma nahi Btao gha")
        break;
    }
  }

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
      key: "totalCostBase",
      func: handleInnerModal,
    },

    {
      name: "loanBalance",
      innerModalTitle: "Home Loan",
      type: "yesnoModal",
      callBack: true,
      key: "familyHomeLoan",
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
          setDis(values.loanAttached);
        }, [values]);

        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <InnerModal
                    modalObject={modalObject}
                    setFieldValue={setFieldValue}
                    setFlagState={setFlagState}
                    flagState={flagState}
                  >
                    {modalObject.key === "familyHomeLoan" ? (
                      <CashFlowHomeLoan />
                    ) : modalObject.key === "totalCostBase" ? (
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
                          <th>Client Ownership</th>
                          <th>Partner Ownership</th>
                          <th>Year Of Purchase</th>
                          <th>Total Cost Base</th>
                          <th>Loan Balance</th>
                          <th>Expected Growth Rate</th>
                          <th>Sell Property In Year</th>
                        </tr>
                      </thead>
                      <tbody>
                        <DynamicTableRow
                          rowConfig={rowConfig}
                          values={values}
                          setFieldValue={setFieldValue}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                        />
                      </tbody>
                    </Table>
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

export default CashFlowFamilyHome;
