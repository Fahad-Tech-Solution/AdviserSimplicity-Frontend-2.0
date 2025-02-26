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

// import Balance from "./Balance";
// import RolloverAmount from "./RolloverAmount";
// import PensionPayments from "./PensionPayments";
// import NewPensionRollover from "./NewPensionRollover";

import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
} from "../../Components/Assets/Api/Api";
import Withdrawals from "../Financial Investments/Withdrawals";
import CFSMSFBalance from "./CFSMSFBalance";
import PensionPayments from "../Financial Investments/PensionPayments";
import NewPensionRollover from "../Financial Investments/NewPensionRollover";

const SMSFPensionAccountDetails = (props) => {
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

  let SMSFPensionPhase =
    Object.keys(questionDetail.SMSFPensionPhase || {}).length > 0
      ? questionDetail.SMSFPensionPhase
      : {
          client: [],
          partner: [],
          joint: [],
        }; // Use an empty object as default if incomeFromOverseasPension is undefined

  const fillInitialValues = (setFieldValue) => {
    try {
      setObjAndAPIKey(props.modalObject.key);

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      const updateFields = (data, prefix) => {
        if (!data || !Object.keys(data).length) return;

        const fields = {
          balanceRolloverAmount: data.balanceRolloverAmount || "",
          balanceRolloverAmountObj: data.balanceRolloverAmountObj || {},
          yearToCommence: data.yearToCommence || "",
          pensionPayments: data.pensionPayments || "",
          pensionPaymentsObj: data.pensionPaymentsObj || {},
          newPensionRollover: data.newPensionRollover || "No",
          newPensionRolloverObj: data.newPensionRolloverObj || {},
          withdrawals: data.withdrawals || "No",
          withdrawalsObj: data.withdrawalsObj || {},
        };

        Object.entries(fields).forEach(([key, value]) => {
          setFieldValue(`${prefix}.${key}`, value);
        });
      };

      if (scenarioObj?.selectedSource === "discoveryForm") {
        // questionDetail

        // Update client-related fields
        if (SMSFPensionPhase?.client?.length > 0) {
          const clientData = SMSFPensionPhase.client[0];
          const pensionBenefits =
            clientData?.pensionBenefitsTotalArray?.[0] || {};
          const pensionBenefitsArray =
            pensionBenefits?.pensionBenefitsarray?.[0] || {};

          const Obj = {
            balanceRolloverAmountObj: {
              pensionType: pensionBenefits?.pensionType?.trim() || "",
              commencePensionYear: cashFlowData?.cf_personalDetails?.client
                ?.retirementYear
                ? String(
                    parseFloat(
                      cashFlowData.cf_personalDetails.client.retirementYear
                    )
                  )
                : "30",
              taxFreeComponent: pensionBenefitsArray?.taxFreeComponent || "",
            },
          };

          updateFields(Obj, "client");
        }

        // Update partner-related fields
        if (SMSFPensionPhase?.partner?.length > 0) {
          const partnerData = SMSFPensionPhase.partner[0];
          const pensionBenefits =
            partnerData?.pensionBenefitsTotalArray?.[0] || {};
          const pensionBenefitsArray =
            pensionBenefits?.pensionBenefitsarray?.[0] || {};

          const Obj = {
            balanceRolloverAmountObj: {
              pensionType: pensionBenefits?.pensionType?.trim() || "",
              commencePensionYear: cashFlowData?.cf_personalDetails?.partner
                ?.retirementYear
                ? String(
                    parseFloat(
                      cashFlowData.cf_personalDetails.partner.retirementYear
                    )
                  )
                : "30",
              taxFreeComponent: pensionBenefitsArray?.taxFreeComponent || "",
            },
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
      obj.clientTotal = values.client.balanceRolloverAmount || "$0";
    } else {
      obj.clientTotal = "";
    }

    if (values.owner.includes("partner")) {
      obj.partnerTotal = values.partner.balanceRolloverAmount || "$0";
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
      cal: title !== "Withdrawals",
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

  const yearsArray = Array.from({ length: 30 }, (_, i) => {
    return {
      value: (i + 1).toString(),
      label: ("Year " + (i + 1)).toString(),
    };
  });

  const [rowConfig, setRowConfig] = useState(() => {
    return [
      {
        name: "balanceRolloverAmount",
        type: "number-toComma-Modal",
        placeholder: "Balance Rollover Amount",
        callBack: true,
        innerModalTitle: "Balance Rollover Amount",
        key: "balanceRolloverAmount",
        func: handleInnerModal,
        disabled: true,
      },
      {
        name: "yearToCommence",
        type: "select",
        placeholder: "Year to Commence",
        options: yearsArray,
        disabled: true,
      },
      {
        name: "pensionPayments",
        type: "number-toComma-Modal",
        placeholder: "Pension Payments",
        callBack: true,
        innerModalTitle: "Pension Payments",
        key: "pensionPayments",
        func: handleInnerModal,
      },
      {
        name: "newPensionRollover",
        type: "yesnoModal",
        placeholder: "New Pension Rollover",
        callBack: true,
        innerModalTitle: "New Pension Rollover",
        key: "newPensionRollover",
        func: handleInnerModal,
      },
      {
        name: "withdrawals",
        type: "yesnoModal",
        placeholder: "Withdrawals",
        callBack: true,
        innerModalTitle: "Withdrawals",
        key: "withdrawals",
        func: handleInnerModal,
      },
    ];
  });

  const componentMapping = {
    "Balance Rollover Amount": <CFSMSFBalance />,
    // "Year to Commence": <YearToCommence />,
    "Pension Payments": <PensionPayments />,
    "New Pension Rollover": <NewPensionRollover />,
    Withdrawals: <Withdrawals />,
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
                        <th>Owner</th>
                        <th>Balance Rollover Amount</th>
                        <th>Year to Commence</th>
                        <th>Pension Payments</th>
                        <th>New Pension Rollover</th>
                        <th>Withdrawals</th>
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
                          handleInnerModal={handleInnerModal}
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

export default SMSFPensionAccountDetails;
