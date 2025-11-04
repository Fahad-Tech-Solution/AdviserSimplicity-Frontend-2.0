import React, { useEffect, useState } from "react";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { Field, Form, Formik } from "formik";
import { Row, Table } from "react-bootstrap";
import { FaRegBuilding } from "react-icons/fa6";
import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
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
import TotalCostBase from "../Financial Investments/TotalCostBase";
import CashFlowHomeLoan from "../PersonalAssetsComponents/CashFlowNew/CashFlowHomeLoan";

const SMSFInvestmentProperties = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));
  let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let DefaultUrl = useRecoilValue(defaultUrl);

  let managedFundsLOC = questionDetail?.managedFundsLOC || {};

  let initialValues = { numberOfProperties: "" };

  let SMSFInvestmentLoan =
    Object.keys(questionDetail[props.modalObject.sourceKey] || {}).length > 0
      ? questionDetail[props.modalObject.sourceKey]
      : {
          client: [],
          joint: [],
          partner: [],
        }; // Use an empty object as default if SMSFBank is undefined

  const fillInitialValues = (setFieldValue) => {
    try {
      setObjAndAPIKey(props.modalObject.key);
      // console.log("cashFlowData:", cashFlowData);

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      const updateFields = (data, index) => {
        if (!data || Object.keys(data).length === 0) return;

        const fields = {
          [`streetAddress_${index}`]:
            data.streetAddress || data.PropertyAddress || "",
          [`valueOfProperty_${index}`]:
            data.valueOfProperty || data.CurrentValue || "",
          [`state_${index}`]: data.state || "",
          [`yearOfPurchase_${index}`]: data.yearOfPurchase || "",
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
          [`estimatedFutureSellingCost_${index}`]:
            data.estimatedFutureSellingCost || "",
        };

        Object.entries(fields).forEach(([key, value]) => {
          setFieldValue(key, value);
        });
      };

      if (
        scenarioObj?.selectedSource === "discoveryForm" &&
        managedFundsLOC &&
        managedFundsLOC._id
      ) {
        if (SMSFInvestmentLoan.client.length > 0) {
          SMSFInvestmentLoan.client.forEach((clientData, index) => {
            updateFields(clientData, index);
          });
        }
      } else {
        const cashFlowDetails = CashFlowScenarioDataObj?.[objAndAPIKey];
        if (cashFlowDetails?.client) {
          cashFlowDetails.client.forEach((clientData, index) => {
            updateFields(clientData, index);
          });
        }
      }

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

    // Iterate through each map entry and create a new object
    for (let i = 0; i < numberOfProperties; i++) {
      const newEntry = {
        streetAddress: values[`streetAddress_${i}`] || "",
        valueOfProperty: values[`valueOfProperty_${i}`] || "",
        state: values[`state_${i}`] || "",
        yearOfPurchase: values[`yearOfPurchase_${i}`] || "",
        totalCostBase: values[`totalCostBase_${i}`] || "$0",
        totalCostBaseObj: values[`totalCostBaseObj_${i}`] || {},
        expectedGrowthRate: values[`expectedGrowthRate_${i}`] || "",
        loanBalance: values[`loanBalance_${i}`] || "$0",
        loanBalanceObj: values[`loanBalanceObj_${i}`] || {},
        rentalIncome: values[`rentalIncome_${i}`] || "",
        sellPropertyInYear: values[`sellPropertyInYear_${i}`] || "",
        estimatedFutureSellingCost:
          values[`estimatedFutureSellingCost_${i}`] || "",
      };
      newEntries.push(newEntry);
    }

    let obj = {
      client: newEntries,
    };

    obj.numberOfProperties = parseInt(values.numberOfProperties, 10);
    obj.scenarioFK = JSON.parse(localStorage.getItem("ScenarioObj"))._id;

    obj.clientTotal = toCommaAndDollar(
      newEntries.reduce(
        (total, entry) =>
          total + parseFloat(entry.valueOfProperty.replace(/[^0-9.-]+/g, "")) ||
          0,
        0
      )
    );
    obj.partnerTotal = toCommaAndDollar(
      newEntries.reduce(
        (total, entry) =>
          total +
            parseFloat(
              entry.loanBalanceObj.loanBalance.replace(/[^0-9.-]+/g, "")
            ) || 0,
        0
      )
    );

    console.log(JSON.stringify(obj));
    // return false;
    const bankAccountArray = cashFlowData?.[objAndAPIKey]?._id || "";

    // console.log("obj", obj);

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

  const loanTermOptions = Array.from({ length: 32 }, (_, i) => {
    if (i === 0) {
      return {
        value: "Existing",
        label: "Existing",
      };
    }
    return {
      value: (i - 1).toString(),
      label: ("Year " + (i - 1)).toString(),
    };
  });

  const loanTermOptionsWithNo = Array.from({ length: 31 }, (_, i) => {
    if (i === 0) {
      return {
        value: "No",
        label: "No",
      };
    }

    return {
      // value: (i + 1).toString(),
      value: i,
      label: ("Year " + i).toString(),
    };
  });

  let handleInnerModal = (title, values, key, stakeHolder) => {
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
      type: "yesno", width: 100,
      placeholder: "Rental Income",
    },
    {
      name: "sellPropertyInYear",
      type: "select",
      placeholder: "Sell Property in Year",
      options: loanTermOptionsWithNo,
    },
    {
      name: "estimatedFutureSellingCost",
      type: "select",
      options: estimatedFutureSellingCostOptions,
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
    let value = 0;
    if (props.modalObject.title === "SMSF Investment Properties") {
      value = e.target.value > 5 ? 5 : e.target.value;
    } else {
      value = e.target.value > 10 ? 10 : e.target.value;
    }
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
                            <th style={{ color: "black" }}>State</th>
                            <th>Year Of Purchase</th>
                            <th>Total Cost Base</th>
                            <th>Expected Growth Rate</th>
                            <th>Loan Balance</th>
                            <th>Rental Income</th>
                            <th>Sell Property in Year</th>
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

export default SMSFInvestmentProperties;
