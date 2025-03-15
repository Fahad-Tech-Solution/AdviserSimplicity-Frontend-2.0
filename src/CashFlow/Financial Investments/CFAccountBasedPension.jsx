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
// import InputOverride from "./InputOverride";
import Withdrawals from "./Withdrawals";
import BalanceRolloverAmount from "./BalanceRolloverAmount";
import NewPensionRollover from "./NewPensionRollover";
import PensionPayments from "./PensionPayments";
import AccountBasedInputOverride from "./accountBasedPension/AccountBasedInputOverride";
import AccounntBasedWithdrawals from "./accountBasedPension/AccounntBasedWithdrawals";
import AccountBasedNewPensionRollover from "./accountBasedPension/AccountBasedNewPensionRollover";
import AccountBasedPensionPayments from "./accountBasedPension/AccountBasedPensionPayments";

const CFAccountBasedPension = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

  let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));
  let DefaultUrl = useRecoilValue(defaultUrl);

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let accountBasedPensionIssues =
    Object.keys(questionDetail.accountBasedPensionIssues || {}).length > 0
      ? questionDetail.accountBasedPensionIssues
      : {
          client: [],
          partner: [],
          joint: [],
        }; // Use an empty object as default if accountBasedPensionIssues is undefined

  let initialValues = {
    owner: [],
  };

  const fillInitialValues = (setFieldValue) => {
    try {
      // Set the object and API key
      setObjAndAPIKey(props.modalObject.key);

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      // Helper function to update field values
      const updateFields = (data, prefix) => {
        if (!data || Object.keys(data).length === 0) return;

        const fields = {
          [`balanceRolloverAmount_${prefix}`]: data.balanceRolloverAmount || "",
          [`balanceRolloverAmountObj_${prefix}`]:
            data.balanceRolloverAmountObj || {},
          [`yearToCommence_${prefix}`]: data.yearToCommence || "",
          [`riskProfile_${prefix}`]: data.riskProfile || "",
          [`investmentReturns_${prefix}`]: data.investmentReturns || "",
          [`investmentReturnsObj_${prefix}`]: data.investmentReturnsObj || {},
          [`investmentFees_${prefix}`]: data.investmentFees || "",
          [`adviserServiceFee_${prefix}`]: data.adviserServiceFee || "",
          [`pensionPayments_${prefix}`]: data.pensionPayments || "",
          [`pensionPaymentsObj_${prefix}`]: data.pensionPaymentsObj || {},
          [`newPensionRollover_${prefix}`]: data.newPensionRollover || "",
          [`newPensionRolloverObj_${prefix}`]: data.newPensionRolloverObj || {},
          [`withdrawals_${prefix}`]: data.withdrawals || "",
          [`withdrawalsObj_${prefix}`]: data.withdrawalsObj || {},
        };

        Object.entries(fields).forEach(([key, value]) => {
          setFieldValue(key, value);
        });
      };

      // Handle discoveryForm scenario
      if (
        scenarioObj?.selectedSource === "discoveryForm" &&
        accountBasedPensionIssues &&
        accountBasedPensionIssues._id
      ) {
        if (accountBasedPensionIssues.client.length > 0) {
          accountBasedPensionIssues.client.forEach((clientData, index) => {
            let Obj = {
              balanceRolloverAmount:
                accountBasedPensionIssues.clientCurrentBalance,
              balanceBenefitDetails: toCommaAndDollar(
                accountBasedPensionIssues.client.reduce(
                  (total, entry) =>
                    total +
                    parseFloat(
                      entry.balanceBenefitDetails.replace(/[^0-9.-]+/g, "")
                    ),
                  0
                )
              ),
              annuityType: clientData.annuityType,
              includeFromYear: clientData.yearsMaturity,
              term: clientData.term,
            };

            updateFields(Obj, index);
          });
        }

        if (
          UserStatus === "Married" &&
          accountBasedPensionIssues?.partner?.length > 0
        ) {
          accountBasedPensionIssues.partner.forEach((partnerData, index) => {
            let Obj = {
              balanceRolloverAmount:
                accountBasedPensionIssues.partnerCurrentBalance,
              balanceBenefitDetails: toCommaAndDollar(
                accountBasedPensionIssues.partner.reduce(
                  (total, entry) =>
                    total +
                    parseFloat(
                      entry.balanceBenefitDetails.replace(/[^0-9.-]+/g, "")
                    ),
                  0
                )
              ),
              annuityType: partnerData.annuityType,
              includeFromYear: partnerData.yearsMaturity,
              term: partnerData.term,
            };

            updateFields(Obj, index);
          });
        }
      } else {
        // Handle cashFlowData scenario
        const cashFlowDetails = CashFlowScenarioDataObj?.[objAndAPIKey];

        if (cashFlowDetails) {
          setFieldValue(
            "numberOfProperties",
            cashFlowDetails[props.modalObject.Input].length || ""
          );

          if (
            props.modalObject.Input == "client" &&
            cashFlowDetails.client.length > 0
          ) {
            cashFlowDetails.client.forEach((clientData, index) => {
              updateFields(clientData, index);
            });
          }

          if (
            UserStatus === "Married" &&
            props.modalObject.Input == "partner" &&
            cashFlowDetails?.partner?.length > 0
          ) {
            cashFlowDetails.partner.forEach((partnerData, index) => {
              updateFields(partnerData, index);
            });
          }
        }
      }

      // Additional data from cashFlowData
      if (cashFlowData?.[objAndAPIKey]?._id) {
        const cashFlowDataDetails = cashFlowData[objAndAPIKey];

        setFieldValue(
          "numberOfProperties",
          cashFlowDataDetails[props.modalObject.Input].length || ""
        );

        if (
          props.modalObject.Input == "client" &&
          cashFlowDataDetails.client.length > 0
        ) {
          cashFlowDataDetails.client.forEach((clientData, index) => {
            updateFields(clientData, index);
          });
        }

        if (
          UserStatus === "Married" &&
          props.modalObject.Input == "partner" &&
          cashFlowDataDetails?.partner?.length > 0
        ) {
          cashFlowDataDetails.partner.forEach((partnerData, index) => {
            updateFields(partnerData, index);
          });
        }
      }
    } catch (error) {
      console.error("Error in fillInitialValues:", error);
    }
  };

  let onSubmit = async (values) => {
    const numberOfEntries = parseInt(values.numberOfProperties, 10);
    const newEntries = [];

    for (let i = 0; i < numberOfEntries; i++) {
      const newEntry = {};

      rowConfig.forEach((config) => {
        if (config.name) {
          newEntry[config.name] = values[`${config.name}_${i}`] || "";
        }
        if (config?.key) {
          newEntry[config.key] = values[`${config.key}_${i}`] || "";
        }
      });

      newEntries.push(newEntry);
    }

    let obj = {
      [props.modalObject.Input]: newEntries,
      scenarioFK: JSON.parse(localStorage.getItem("ScenarioObj"))._id,
      numberOfProperties: numberOfEntries,
    };

    obj[props.modalObject.Input + "Total"] = toCommaAndDollar(
      newEntries.reduce(
        (total, entry) =>
          total +
            parseFloat(entry.adviserServiceFee?.replace(/[^0-9.-]+/g, "")) || 0,
        0
      )
    );

    if (cashFlowData?.[objAndAPIKey]?._id) {
      const cashFlowDataDetails = cashFlowData[objAndAPIKey];

      if (props.modalObject.Input === "partner") {
        obj.client = cashFlowDataDetails?.client || [];
        obj.clientTotal = cashFlowDataDetails?.clientTotal || "$0";
      } else {
        obj.partner = cashFlowDataDetails?.partner || [];
        obj.partnerTotal = cashFlowDataDetails?.partnerTotal || "$0";
      }
    }

    console.log(JSON.stringify(obj), "Final Object");
    return false;

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
        `Data of "${props.modalObject.title}" is Saved`
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
        `Data of "${props.modalObject.title}" is not Saved. Please try again.`
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
      sourceObj: props.modalObject,
      cal: title !== "Withdrawals" && title !== "Input Override",
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

  let riskProfileOptions = [
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

  let InvestmentReturnsOptions = [
    { value: "system", label: "System" },
    { value: "input Override", label: "Input Override" },
  ];
  const yearOptionsWithExisting = Array.from({ length: 31 }, (_, i) => {
    if (i == 0) {
      return {
        value: "Existing",
        label: "Existing",
      };
    } else {
      return {
        value: i.toString(),
        label: ("Year " + i).toString(),
      };
    }
  });

  const [rowConfig, setRowConfig] = useState(() => {
    let OriginalArray = [
      {
        value: "1",
        type: "plainText2.0",
      },
      {
        name: "balanceRolloverAmount",
        type: "number-toComma-Modal",
        placeholder: "Balance & Rollover Amount",
        callBack: true,
        innerModalTitle: "Balance & Rollover Amount",
        key: "balanceRolloverAmountObj",
        func: handleInnerModal,
        disabled: true,
      },
      {
        name: "yearToCommence",
        type: "select",
        options: yearOptionsWithExisting,
        placeholder: "Year To Commence",
      },
      {
        name: "riskProfile",
        type: "select",
        options: riskProfileOptions,
        placeholder: "Year to Commence",
      },
      {
        name: "investmentReturns",
        type: "selectModal",
        placeholder: "Investment Returns",
        options: InvestmentReturnsOptions,
        ModalOption: "input Override",
        innerModalTitle: "Input Override",
        key: "investmentReturnsObj",
      },
      {
        name: "investmentFees",
        type: "number-toPercent",
        placeholder: "Investment Fees %",
      },
      {
        name: "adviserServiceFee",
        type: "number-toComma",
        placeholder: "Adviser Service Fee ($)",
      },
      {
        name: "pensionPayments",
        type: "number-toComma-Modal",
        placeholder: "Pension Payments",
        callBack: true,
        innerModalTitle: "Pension Payments",
        key: "pensionPaymentsObj",
        func: handleInnerModal,
      },
      {
        name: "newPensionRollover",
        type: "yesnoModal",
        placeholder: "New Pension Rollover",
        callBack: true,
        key: "newPensionRolloverObj",
        innerModalTitle: "New Pension Rollover",
        func: handleInnerModal,
      },
      {
        name: "withdrawals",
        type: "yesnoModal",
        placeholder: "Withdrawals",
        callBack: true,
        key: "withdrawalsObj",
        innerModalTitle: "Withdrawals",
        func: handleInnerModal,
      },
    ];

    return OriginalArray;
  });

  const componentMapping = {
    "Input Override": <AccountBasedInputOverride />,
    "Balance & Rollover Amount": <BalanceRolloverAmount />,
    "Withdrawals": <AccounntBasedWithdrawals />,
    "New Pension Rollover": <AccountBasedNewPensionRollover />,
    "Pension Payments": <AccountBasedPensionPayments />,
  };

  const ModalContent = (obj) => {
    return componentMapping[obj.title] || null;
  };

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
                    Number of Account Based Pension does{" "}
                    {RenderName(props.modalObject.Input)} have :
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
              {values.numberOfProperties > 0 && (
                <div className="mt-4">
                  <Table striped bordered responsive hover>
                    <thead>
                      <tr>
                        <th
                          onClick={() => {
                            console.log(values);
                          }}
                        >
                          No#
                        </th>
                        <th>Balance & Rollover Amount</th>
                        <th>Year to Commence</th>
                        <th>Risk Profile</th>
                        <th>Investment Returns</th>
                        <th>Investment Fees %</th>
                        <th>Adviser Service Fee ($)</th>
                        <th>Pension Payments</th>
                        <th>New Pension Rollover</th>
                        <th>Withdrawals</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({
                        length: values.numberOfProperties,
                      }).map((_, index) => {
                        // Ensure each rowConfig object has a name before concatenating the index
                        const updatedRowConfig = rowConfig.map((row) => ({
                          ...row,
                          name: row.name ? `${row.name}_${index}` : row.name,
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
              )}
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CFAccountBasedPension;
