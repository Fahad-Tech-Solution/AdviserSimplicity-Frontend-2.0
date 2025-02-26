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
import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
} from "../../Components/Assets/Api/Api";

const SMSFBank = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));
  let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

  let DefaultUrl = useRecoilValue(defaultUrl);

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let [layoutSwitchFlag, setLayoutSwitchFlag] = useState(
    props.modalObject.title
  );

  let initialValues = {
    owner: [],
  };

  let SMSFBank =
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

      console.log(SMSFBank);

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      const updateFields = (data, prefix) => {
        if (!data || !Object.keys(data).length) return;

        const fields = {
          openingBalance: data.openingBalance || "$0",
          investmentReturns: data.investmentReturns || "System",
          incomeYield: data.incomeYield || "",
          accountingFees: data.accountingFees || "",
          atoLevy: data.atoLevy || "",
          adviserFees: data.adviserFees || "",
          indexationFundFees: data.indexationFundFees || "2.50%",
          windupFundYear: data.windupFundYear || "No",
        };

        Object.entries(fields).forEach(([key, value]) => {
          setFieldValue(`${prefix}.${key}`, value);
        });
      };

      if (scenarioObj?.selectedSource === "discoveryForm") {
        // setFieldValue(`owner`, SMSFBank.owner || "");

        // Update client-related fields
        if (SMSFBank?.client.length > 0) {
          let Obj = {
            openingBalance: SMSFBank.clientCurrentBalance || "",
          };

          updateFields(Obj, "client");
        }

        // Update partner-related fields
        if (
          UserStatus === "Married" &&
          Object.keys(SMSFBank.partner||{}).length > 0 &&
          SMSFBank?.partner.length > 0
        ) {
          let Obj = {
            openingBalance: SMSFBank.partnerCurrentBalance || "",
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
          if (
            UserStatus === "Married" &&
            cashFlowDetails.owner.includes("partner")
          ) {
            updateFields(cashFlowDetails.partner, "partner");
          }
        }
      }

      if (cashFlowData?.[objAndAPIKey]?._id) {
        const cashFlowDataDetails = cashFlowData[objAndAPIKey];
        setFieldValue(`owner`, cashFlowDataDetails.owner || "");

        if (cashFlowDataDetails.owner.includes("client")) {
          updateFields(cashFlowDataDetails.client, "client");
        }

        if (
          UserStatus === "Married" &&
          cashFlowDataDetails.owner.includes("partner")
        ) {
          updateFields(cashFlowDataDetails.partner, "partner");
        }
      }
    } catch (error) {
      console.error("Error in fillInitialValues:", error);
    }
  };

  let onSubmit = async (values) => {
    console.log(JSON.stringify(values));

    let obj = values;
    obj.scenarioFK = JSON.parse(localStorage.getItem("ScenarioObj"))._id;

    if (values.owner.includes("client")) {
      obj.clientTotal = values.client.openingBalance || "$0";
    } else {
      obj.clientTotal = "";
    }

    if (values.owner.includes("partner")) {
      obj.partnerTotal = values.partner.openingBalance || "$0";
    } else {
      obj.partnerTotal = "";
    }

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

  let handleInnerModal = (title, values, key, stakeHolder) => {
    setModalObject({
      title,
      values,
      key,
      stakeHolder,
      sourceObj: props.modalObject,
    });
    setFlagState(true);
  };

  const options =
    UserStatus !== "Single"
      ? [
          { value: "client", label: RenderName("client") },
          { value: "partner", label: RenderName("partner") },
        ]
      : [{ value: "client", label: RenderName("client") }];

  const indexation = Array.from({ length: 21 }, (_, i) => ({
    value: (i * 0.5).toFixed(2) + "%",
    label: (i * 0.5).toFixed(2) + "%",
  }));

  const InvestmentReturnsOptions = [
    { value: "System", label: "System" },
    { value: "Input Override", label: "Input Override" },
  ];

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

  const [rowConfig, setRowConfig] = useState(() => {
    return [
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
      },
      {
        name: "incomeYield",
        type: "number-toComma",
        placeholder: "Income Yield",
      },
      {
        name: "accountingFees",
        type: "number-toComma",
        placeholder: "Accounting & Auditing Fees",
      },
      {
        name: "atoLevy",
        type: "number-toComma",
        placeholder: "ATO LEVY",
      },
      {
        name: "adviserFees",
        type: "number-toComma",
        placeholder: "Adviser Service Fees",
      },
      {
        name: "indexationFundFees",
        type: "select",
        placeholder: "Indexation of Fund Fees",
        options: indexation,
      },
      {
        name: "windupFundYear",
        type: "select",
        placeholder: "Windup Fund in Year",
        options: loanTermOptionsWithNo,
      },
    ];
  });

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
                {/* Modal content can be added here */}
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
                        <th>Owner</th>
                        <th>Opening Balance</th>
                        <th>Investment Returns</th>
                        <th>Income Yield</th>
                        <th>Accounting & Auditing Fees</th>
                        <th>ATO LEVY</th>
                        <th>Adviser Service Fees</th>
                        <th>Indexation of Fund Fees</th>
                        <th>Windup Fund in Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {values.owner.includes("client") && (
                        <DynamicTableRow
                          rowConfig={rowConfig.map((config) => {
                            if (config.name === "incomeYield") {
                              return {
                                ...config,
                                disabled:
                                  values.client?.investmentReturns !==
                                  "Input Override",
                              };
                            }
                            return config;
                          })}
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
                            rowConfig={rowConfig.map((config) => {
                              if (config.name === "incomeYield") {
                                return {
                                  ...config,
                                  disabled:
                                    values.partner?.investmentReturns !==
                                    "Input Override",
                                };
                              }
                              return config;
                            })}
                            values={values}
                            setFieldValue={setFieldValue}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            handleInnerModal={handleInnerModal}
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

export default SMSFBank;
