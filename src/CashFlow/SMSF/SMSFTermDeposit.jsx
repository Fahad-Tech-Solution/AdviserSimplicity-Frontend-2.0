import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { CreatableMultiSelectField } from "../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { Row, Table } from "react-bootstrap";
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
  RenderName,
  toCommaAndDollar,
} from "../../Components/Assets/Api/Api";

const SMSFTermDeposit = (props) => {
  let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");
  let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

  let [layoutSwitchFlag, setLayoutSwitchFlag] = useState(() => {
    return props.modalObject.title === "SMSF Term Deposit";
  });

  let questionDetail = useRecoilValue(QuestionDetail);

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));
  let DefaultUrl = useRecoilValue(defaultUrl);

  let initialValues = {
    owner: ["client"],
  };

  let SMSFTerm =
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

      console.log(SMSFTerm);

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      const updateFields = (data, prefix) => {
        if (!data || !Object.keys(data).length) return;
        const fields = {
          openingBalance: data.openingBalance || "$0",
          investmentReturns: data.investmentReturns || "",
          incomeYield: data.incomeYield || "",
          reinvestIncome: data.reinvestIncome || "No",
          reinvestUpUntil: data.reinvestUpUntil || "No",
          riskProfile: data.riskProfile || "Cash",
          cashOutYear: data.cashOutYear || "No",
        };

        Object.entries(fields).forEach(([key, value]) => {
          setFieldValue(`${prefix}.${key}`, value);
        });
      };

      if (
        scenarioObj?.selectedSource === "discoveryForm" &&
        questionDetail[props.modalObject.sourceKey]
      ) {
        if (SMSFTerm?.client.length > 0) {
          let Obj = {
            openingBalance: SMSFTerm.clientCurrentBalance || "",
          };
          updateFields(Obj, "client");
        }

        if (
          UserStatus === "Married" &&
          Array.isArray(SMSFTerm?.partner) &&
          SMSFTerm?.partner.length > 0
        ) {
          let Obj = {
            openingBalance: SMSFTerm.partnerCurrentBalance || "",
          };
          updateFields(Obj, "partner");
        }
      } else {
        const cashFlowDetails = CashFlowScenarioDataObj?.[objAndAPIKey];
        if (cashFlowDetails) {
          setFieldValue(`owner`, cashFlowDetails.owner || "");
          if (cashFlowDetails.owner.includes("client")) {
            updateFields(cashFlowDetails.client, "client");
          }

          // if (
          //   UserStatus === "Married" &&
          //   cashFlowDetails.owner.includes("partner")
          // ) {
          //   updateFields(cashFlowDetails.partner, "partner");
          // }
        }
      }

      if (cashFlowData?.[objAndAPIKey]?._id) {
        const cashFlowDataDetails = cashFlowData[objAndAPIKey];
        setFieldValue(`owner`, cashFlowDataDetails.owner || "");

        if (cashFlowDataDetails.owner.includes("client")) {
          updateFields(cashFlowDataDetails.client, "client");
        }

        // if (
        //   UserStatus === "Married" &&
        //   cashFlowDataDetails.owner.includes("partner")
        // ) {
        //   updateFields(cashFlowDataDetails.partner, "partner");
        // }
      }
    } catch (error) {
      console.error("Error in fillInitialValues:", error);
    }
  };

  let onSubmit = async (values) => {
    console.log("Values:", JSON.stringify(values));

    let obj = values;
    obj.scenarioFK = JSON.parse(localStorage.getItem("ScenarioObj"))._id;

    let JointCurrentBalance = 0;

    // if (values.owner.includes("joint")) {
    //   JointCurrentBalance = parseFloat(
    //     values.joint.openingBalance.replace(/[^0-9.-]+/g, "")
    //   );
    // }

    if (values.owner.includes("client")) {
      obj.clientTotal =
        toCommaAndDollar(
          parseFloat(values.client.openingBalance.replace(/[^0-9.-]+/g, "")) +
            JointCurrentBalance / 2
        ) || "$0";
    } else {
      obj.clientTotal = "";
    }

    // if (values.owner.includes("partner")) {
    //   obj.partnerTotal =
    //     toCommaAndDollar(
    //       parseFloat(values.partner.openingBalance.replace(/[^0-9.-]+/g, "")) +
    //         JointCurrentBalance / 2
    //     ) || "$0";
    // } else {
    //   obj.partnerTotal = "";
    // }

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

  const loanTermOptionswithZero = Array.from({ length: 31 }, (_, i) => {
    return {
      value: i.toString(),
      label: ("Year " + i).toString(),
    };
  });

  let InvestmentReturnsOptions = [
    { value: "system", label: "System" },
    { value: "input Override", label: "Input Override" },
  ];

  let RiskProfileOptions = [
    { value: "Cash", label: "Cash" },
    { value: "Australian Shares", label: "Australian Shares" },
  ];

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
        name: "openingBalance",
        type: "number-toComma",
        placeholder: "Opening Balance",
      },
      {
        name: "investmentReturns",
        type: "select",
        placeholder: "Investment Returns",
        options: InvestmentReturnsOptions,
        callBack: true,
        func: AddExtraInput,
      },
      {
        name: "incomeYield",
        type: "number-toPercent",
        placeholder: "Income Yield",
        disabled: isDisabled,
      },
      {
        name: "reinvestIncome",
        type: "yesno", width: 100,
        placeholder: "Reinvest income",
      },
      {
        name: "reinvestUpUntil",
        type: "select",
        placeholder: "Reinvest Up Until",
        options: loanTermOptionswithZero,
      },
      {
        name: "riskProfile",
        type: "select",
        placeholder: "Risk Profile",
        options: RiskProfileOptions,
      },
      {
        name: "cashOutYear",
        type: "select",
        placeholder: "Cashout Year",
        options: loanTermOptionswithZero,
      },
    ];

    return inputArray;
  }

  function updateRowConfig(stakeHolder, isDisabled) {
    const updatedConfig = createInitialRowConfig(isDisabled);
    if (stakeHolder === "client.") setRowConfigClient(updatedConfig);
    if (stakeHolder === "partner.") setRowConfigPartner(updatedConfig);
    if (stakeHolder === "joint.") setRowConfigJoint(updatedConfig);
  }

  function AddExtraInput(values, setFieldValue, currentInput, stakeHolder) {
    const isDisabled =
      currentInput.value === "" || currentInput.value === "system";
    if (isDisabled) {
      setFieldValue(stakeHolder + "incomeYield", "");
    }
    updateRowConfig(stakeHolder, isDisabled);
  }

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
              {/*
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
               */}

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
                        <th>Opening Balance</th>
                        <th>Investment Returns</th>
                        <th>Income Yield</th>
                        <th>Reinvest income</th>
                        <th>Reinvest Up Until</th>
                        <th>Risk Profile/SAA</th>
                        <th>Cashout in Year</th>
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
                          stakeHolder="client."
                        />
                      )}
                      {/*
                      {values.owner.includes("partner") &&
                        UserStatus === "Married" && (
                          <DynamicTableRow
                            rowConfig={rowConfigPartner}
                            values={values}
                            setFieldValue={setFieldValue}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            stakeHolder="partner."
                          />
                        )}
                      */}
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

export default SMSFTermDeposit;
