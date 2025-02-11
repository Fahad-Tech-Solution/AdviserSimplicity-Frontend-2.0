import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { CreatableMultiSelectField } from "../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
  toCommaAndDollar,
} from "../../Components/Assets/Api/Api";
import { Row, Table } from "react-bootstrap";
import {
  CashFlowData,
  CashFlowScenarioData,
  defaultUrl,
  QuestionDetail,
} from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import InputOverride from "./InputOverride";
import RegularContributions from "./RegularContributions";

const CashFlowCashBankDetails = (props) => {
  /*
       This component is a dynamic and reusable modal component designed to handle the following modal types:
       1. "Cash"
       2. "Term Deposits"
       3. "Investment Bonds"
   
       TODO-IMPORTANT:
       - Ensure any changes to this component are planned carefully to avoid unintended effects on all supported modals.
       - If specific modifications are required for one modal type, consider implementing targeted logic or extensions 
         to maintain the integrity of the shared functionality.
   */

  let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");
  let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

  let layoutSwitchArray = ["Term Deposits", "Investment Bonds"];

  let [layoutSwitchFlag, setLayoutSwitchFlag] = useState(() => {
    if (layoutSwitchArray.includes(props.modalObject.title)) {
      return true;
    }
    return false;
  });

  let [layoutSwitchFlag2, setLayoutSwitchFlag2] = useState(() => {
    if (props.modalObject.title === "Investment Bonds") {
      return true;
    }
    return false;
  });

  let questionDetail = useRecoilValue(QuestionDetail);

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));
  let DefaultUrl = useRecoilValue(defaultUrl);

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let incomeFromOverseasPension =
    Object.keys(questionDetail[props.modalObject.sourceKey] || {}).length > 0
      ? questionDetail[props.modalObject.sourceKey]
      : {
          client: [],
          joint: [],
          partner: [],
        }; // Use an empty object as default if incomeFromOverseasPension is undefined

  let initialValues = {
    owner: [],
    client: {
      investmentReturns: "",
    },
    partner: {
      investmentReturns: "",
    },
    joint: {
      investmentReturns: "",
    },
  };

  const fillInitialValues = (setFieldValue) => {
    try {
      // Set the object and API key
      setObjAndAPIKey(props.modalObject.key);

      console.log(
        incomeFromOverseasPension,
        "Discovery Form Data " +
          props.modalObject.key +
          " and SourceKey " +
          props.modalObject.sourceKey
      );
      // console.log(cashFlowData?.[objAndAPIKey].client, "cashFlowData Form Data");
      // console.log(CashFlowScenarioDataObj, "CashFlowScenarioDataObj Form Data");

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      // Helper function to update field values
      const updateFields = (data, prefix) => {
        if (!data || !Object.keys(data).length) return;
        const fields = {
          currentBalance: data.currentBalance || "$0",
          investmentReturns: data.investmentReturns || "",

          regularContributions: data.regularContributions || "No",
          regularContributionsObj: data.regularContributionsObj || "No",
          riskProfile: data.riskProfile || "Cash",
        };

        if (!layoutSwitchFlag2) {
          fields.reinvestIncome = data.reinvestIncome || "No";
        }

        if (layoutSwitchArray.includes(props.modalObject.title)) {
          fields.cashOutYear = data.cashOutYear || "No";
        }

        if (props.modalObject.title === "Investment Bonds") {
          fields.earningsRate = data.earningsRate || "";
          fields.investmentFees = data.investmentFees || "";
          fields.costBase = data.costBase || "$0";
        } else {
          fields.incomeYield = data.incomeYield || "";
        }

        Object.entries(fields).forEach(([key, value]) => {
          setFieldValue(`${prefix}.${key}`, value);
        });
      };

      // Update owner field
      if (
        scenarioObj?.selectedSource === "discoveryForm" &&
        incomeFromOverseasPension &&
        incomeFromOverseasPension._id
      ) {
        // setFieldValue(`owner`, incomeFromOverseasPension.owner || "");

        // Update client-related fields
        if (incomeFromOverseasPension?.client.length > 0) {
          let Obj = {
            currentBalance:
              incomeFromOverseasPension.clientCurrentBalance || "",
          };
          if (incomeFromOverseasPension?.clientCostBaseTemp) {
            Obj.costBase = incomeFromOverseasPension.clientCostBaseTemp || "";
          }
          updateFields(Obj, "client");
        }

        // Update partner-related fields
        if (
          UserStatus === "Married" &&
          incomeFromOverseasPension?.partner.length > 0
        ) {
          let Obj = {
            currentBalance:
              incomeFromOverseasPension.partnerCurrentBalance || "",
          };
          if (incomeFromOverseasPension?.partnerCostBaseTemp) {
            Obj.costBase = incomeFromOverseasPension.partnerCostBaseTemp || "";
          }
          updateFields(Obj, "partner");
        }

        // Update partner-related fields
        if (
          UserStatus === "Married" &&
          incomeFromOverseasPension?.joint.length > 0
        ) {
          let Obj = {
            currentBalance: incomeFromOverseasPension.jointCurrentBalance || "",
          };
          if (incomeFromOverseasPension?.jointCostBaseTemp) {
            Obj.costBase = incomeFromOverseasPension.jointCostBaseTemp || "";
          }
          updateFields(Obj, "joint");
        }
      } else {
        // Handle cashFlowData scenario
        const cashFlowDetails = CashFlowScenarioDataObj?.[objAndAPIKey];
        console.log(cashFlowDetails, "cashFlowDetails");
        if (cashFlowDetails) {
          setFieldValue(`owner`, cashFlowDetails.owner || "");
          if (cashFlowDetails.owner.includes("client")) {
            // Update client details
            updateFields(cashFlowDetails.client, "client");
          }

          if (
            UserStatus === "Married" &&
            cashFlowDetails.owner.includes("partner")
          ) {
            // Update partner details
            updateFields(cashFlowDetails.partner, "partner");
          }

          if (
            UserStatus === "Married" &&
            cashFlowDetails.owner.includes("joint")
          ) {
            // Update partner details
            updateFields(cashFlowDetails.joint, "joint");
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

        if (
          UserStatus === "Married" &&
          cashFlowDataDetails.owner.includes("partner")
        ) {
          // Update partner details
          updateFields(cashFlowDataDetails.partner, "partner");
        }

        if (
          UserStatus === "Married" &&
          cashFlowDataDetails.owner.includes("joint")
        ) {
          // Update partner details
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
    let obj = values;

    obj.scenarioFK = JSON.parse(localStorage.getItem("ScenarioObj"))._id;

    let JointCurrentBalance = 0;

    if (values.owner.includes("joint")) {
      JointCurrentBalance = parseFloat(
        values.joint.currentBalance.replace(/[^0-9.-]+/g, "")
      );
    }

    if (values.owner.includes("client")) {
      obj.clientTotal =
        toCommaAndDollar(
          parseFloat(values.client.currentBalance.replace(/[^0-9.-]+/g, "")) +
            JointCurrentBalance / 2
        ) || "$0";
    } else {
      obj.clientTotal = "";
    }

    if (values.owner.includes("partner")) {
      obj.partnerTotal =
        toCommaAndDollar(
          parseFloat(values.partner.currentBalance.replace(/[^0-9.-]+/g, "")) +
            JointCurrentBalance / 2
        ) || "$0";
    } else {
      obj.partnerTotal = "";
    }

    const bankAccountArray = cashFlowData?.[objAndAPIKey]?._id || "";

    console.log(obj, "final obj");

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

  let handleInnerModal = (title, values, key, stakeHolder) => {
    // console.log(title, values, key);
    setModalObject({
      title,
      values,
      key,
      stakeHolder,
    });
    setFlagState(true);
  };

  const options =
    UserStatus !== "Single"
      ? [
          { value: "client", label: RenderName("client") },
          { value: "partner", label: RenderName("partner") },
          { value: "joint", label: RenderName("joint") },
        ]
      : [{ value: "client", label: RenderName("client") }];

  const loanTermOptions = Array.from({ length: 31 }, (_, i) => {
    if (i === 0) {
      return {
        value: "No",
        label: "No",
      };
    } else {
      return {
        value: i.toString(),
        label: ("Year " + i).toString(),
      };
    }
  });

  let InvestmentReturnsOptions = [
    { value: "system", label: "System" },
    { value: "input Override", label: "Input Override" },
  ];

  let RiskProfileOptions = [
    { value: "Conservative", label: "Conservative" },
    { value: "Moderately Conservative", label: "Moderately Conservative" },
    { value: "Balanced", label: "Balanced" },
    { value: "Growth", label: "Growth" },
    { value: "High Growth", label: "High Growth" },
    { value: "Cash", label: "Cash" },
    { value: "International Shares", label: "International Shares" },
    { value: "Property", label: "Property" },
    { value: "Australian Fixed Interest", label: "Australian Fixed Interest" },
    {
      value: "International Fixed Interest",
      label: "International Fixed Interest",
    },
    { value: "Other", label: "Other" },
    { value: "Australian Shares", label: "Australian Shares" },
  ];

  const reinvestUpUntilOptions = Array.from({ length: 31 }, (_, i) => {
    return {
      value: i.toString(),
      label: ("Year " + i).toString(),
    };
  });

  const [rowConfigClient, setRowConfigClient] = useState(() =>
    createInitialRowConfig(true)
  );
  const [rowConfigPartner, setRowConfigPartner] = useState(() =>
    createInitialRowConfig(true)
  );
  const [rowConfigJoint, setRowConfigJoint] = useState(() =>
    createInitialRowConfig(true)
  );

  function createInitialRowConfig(isDisabled) {
    let inputArray = [
      {
        name: "currentBalance",
        type: "number-toComma",
        placeholder: "Current Balance",
      },
      // {
      //     name: "costBase",
      //     type: "number-toComma",
      //     placeholder: "Cost Base",
      // },
      {
        name: "investmentReturns",
        type: "select",
        placeholder: "Investment Returns",
        options: InvestmentReturnsOptions,
        callBack: true,
        func: AddExtraInput,
      },
      {
        name: layoutSwitchFlag2 ? "earningsRate" : "incomeYield",
        type: "number-toPercent",
        placeholder: layoutSwitchFlag2 ? "Earnings Rate" : "Income Yield",
        disabled: isDisabled, // Configurable based on the initial state
      },
      // {
      //     name: "reinvestIncome",
      //     type: "yesno",
      //     placeholder: "Reinvest income",
      // },

      // {
      //     name: "reinvestUpUntil",
      //     type: "select",
      //     options: reinvestUpUntilOptions,
      //     placeholder: "Reinvest Up Until",
      //   },
      {
        name: "regularContributions",
        type: "yesnoModal",
        placeholder: "Regular Contributions",
        callBack: true,
        key: "regularContributions",
        innerModalTitle: "Regular Contributions",
        func: handleInnerModal,
      },
      {
        name: "riskProfile",
        type: "select",
        placeholder: "Risk Profile",
        options: RiskProfileOptions,
      },
    ];

    if (layoutSwitchFlag2) {
      inputArray.push({
        name: "investmentFees",
        type: "number-toPercent",
        placeholder: "Investment Fees",
      });

      const newObject = {
        name: "costBase",
        type: "number-toComma",
        placeholder: "Cost Base",
      };

      // Find the index of the "cashOutFunds" object
      const cashOutFundsIndex = inputArray.findIndex(
        (item) => item.name === "investmentReturns"
      );

      // Insert the new object before "cashOutFunds"
      if (cashOutFundsIndex !== -1) {
        inputArray.splice(cashOutFundsIndex, 0, newObject);
      }
    }

    if (layoutSwitchFlag) {
      inputArray.push({
        name: "cashOutYear",
        type: "select",
        placeholder: "Cashout " + layoutSwitchFlag2 ? "Funds" : "Year",
        options: loanTermOptions,
      });
    }

    if (!layoutSwitchFlag2) {
      // fields.reinvestIncome = data.reinvestIncome || "No",

      const newObject = {
        name: "reinvestIncome",
        type: "yesno",
        placeholder: "Reinvest income",
      };

      // Find the index of the "cashOutFunds" object
      const cashOutFundsIndex = inputArray.findIndex(
        (item) => item.name === "regularContributions"
      );

      // Insert the new object before "cashOutFunds"
      if (cashOutFundsIndex !== -1) {
        inputArray.splice(cashOutFundsIndex, 0, newObject);

        const newObject2 = {
          name: "reinvestUpUntil",
          type: "select",
          options: reinvestUpUntilOptions,
          placeholder: "Reinvest Up Until",
        };

        let cashOutFundsIndexNew = inputArray.findIndex(
          (item) => item.name === "regularContributions"
        );

        inputArray.splice(cashOutFundsIndexNew, 0, newObject2);
      }
    }

    return inputArray;
  }

  function updateRowConfig(stakeHolder, isDisabled) {
    const updatedConfig = createInitialRowConfig(isDisabled);
    if (stakeHolder === "client.") setRowConfigClient(updatedConfig);
    if (stakeHolder === "partner.") setRowConfigPartner(updatedConfig);
    if (stakeHolder === "joint.") setRowConfigJoint(updatedConfig);
  }

  // Modify AddExtraInput to update specific configurations
  function AddExtraInput(values, setFieldValue, currentInput, stakeHolder) {
    const isDisabled =
      currentInput.value === "" || currentInput.value === "system";
    if (isDisabled) {
      let inputName = layoutSwitchFlag2 ? "earningsRate" : "incomeYield";
      setFieldValue(stakeHolder + inputName, "");
    }
    updateRowConfig(stakeHolder, isDisabled);
  }

  const componentMapping = {
    "Regular Contributions": <RegularContributions />,
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
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);
        return (
          <Form>
            <Row>
              <InnerModal
                modalObject={modalObject}
                setFieldValue={setFieldValue}
                setFlagState={setFlagState}
                flagState={flagState}
              >
                {ModalContent(modalObject)}
              </InnerModal>

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
                        <th>Current Balance</th>
                        {layoutSwitchFlag2 && <th>Cost Base</th>}
                        <th>Investment Returns</th>
                        <th>
                          {layoutSwitchFlag2 ? "Earnings Rate" : "Income Yield"}
                        </th>
                        {!layoutSwitchFlag2 && <th>Reinvest income</th>}
                        {!layoutSwitchFlag2 && <th>Reinvest Up Until</th>}
                        <th>Regular Contributions</th>
                        <th>Risk Profile/SAA</th>
                        {layoutSwitchFlag2 && <th>Investment Fees</th>}
                        {layoutSwitchFlag && (
                          <th>
                            Cashout in {layoutSwitchFlag2 ? "Funds" : "Year"}
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {values.owner.includes("client") && (
                        <DynamicTableRow
                          rowConfig={rowConfigClient}
                          values={values}
                          setFieldValue={setFieldValue}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          handleInnerModal={handleInnerModal}
                          stakeHolder="client."
                        />
                      )}

                      {values.owner.includes("partner") &&
                        UserStatus === "Married" && (
                          <DynamicTableRow
                            rowConfig={rowConfigPartner}
                            values={values}
                            setFieldValue={setFieldValue}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            handleInnerModal={handleInnerModal}
                            stakeHolder="partner."
                          />
                        )}

                      {values.owner.includes("joint") &&
                        UserStatus === "Married" && (
                          <DynamicTableRow
                            rowConfig={rowConfigJoint}
                            values={values}
                            setFieldValue={setFieldValue}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            handleInnerModal={handleInnerModal}
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

export default CashFlowCashBankDetails;
