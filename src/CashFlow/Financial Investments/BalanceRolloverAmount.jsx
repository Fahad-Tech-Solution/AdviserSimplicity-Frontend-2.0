import React, { useEffect, useState } from "react";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { Form, Formik } from "formik";
import { Row, Table } from "react-bootstrap";
import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import ApplyDeeming from "./ApplyDeeming";
import {
  openNotificationSuccess,
  PostAxios,
  toCommaAndDollar,
} from "../../Components/Assets/Api/Api";
import {
  CashFlowData,
  CashFlowReCalculateLoading,
  defaultUrl,
} from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import { number } from "yup";

const BalanceRolloverAmount = (props) => {
  let [disabledFlag, setDisabledFlag] = useState(true);
  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let DefaultUrl = useRecoilValue(defaultUrl);
  let cashFlowData = useRecoilValue(CashFlowData);
  let [cashFlowReCalculateLoading, setCashFlowReCalculateLoading] =
    useRecoilState(CashFlowReCalculateLoading);

  let initialValues = {
    pensionType: "",
    commencePensionYear: "",
    applyDeeming: "",
    applyDeemingObj: {},
    totalSuperAnnuationBenefits: "",
    nominatedRolloverAmountType: "No",
    nominatedRolloverAmount: "",
    taxFreeComponent: "",
  };

  let fillInitialValues = (setFieldValue) => {
    console.log(
      props.modalObject,
      props.modalObject.key.match(/\d+/)?.[0] || 0
    );
    if (props.modalObject.values[props.modalObject.key]) {
      let Data = props.modalObject.values[props.modalObject.key];
      setFieldValue("pensionType", Data.pensionType);
      setFieldValue("commencePensionYear", Data.commencePensionYear);
      setFieldValue("applyDeeming", Data.applyDeeming);
      setFieldValue("applyDeemingObj", Data.applyDeemingObj);
      setFieldValue(
        "totalSuperAnnuationBenefits",
        Data.totalSuperAnnuationBenefits
      );
      setFieldValue(
        "nominatedRolloverAmountType",
        Data.nominatedRolloverAmountType
      );
      setFieldValue("nominatedRolloverAmount", Data.nominatedRolloverAmount);
      setFieldValue("taxFreeComponent", Data.taxFreeComponent);
    }
  };

  let onSubmit = (values) => {
    console.log(JSON.stringify(values));

    props.setFieldValue(
      props.modalObject.key.replace("Obj", ""),
      values.taxFreeComponent
    );
    props.setFieldValue(props.modalObject.key, values);

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  const yearsIncludedArray = Array.from({ length: 30 }, (_, i) => {
    return {
      value: (i + 1).toString(),
      label: ("Year " + (i + 1)).toString(),
    };
  });

  const nominatedRolloverAmountTypeOptions = [
    { value: "Partial", label: "Partial" },
    { value: "No", label: "No" },
    { value: "Full ", label: "Full " },
  ];

  const pensionTypeOptions = [
    { value: "Account Based", label: "Account Based" },
    { value: "TTR", label: "TTR" },
  ];

  let handleInnerModal = (title, values, key, stakeHolder) => {
    console.log(title, values, key, stakeHolder);
    setModalObject({
      title,
      values,
      key,
      stakeHolder: props.modalObject.stakeHolder,
    });
    setFlagState(true);
  };

  let nominatedRolloverAmountDisableHandle = (
    values,
    setFieldValue,
    CurrentInput,
    stakeHolder
  ) => {
    if (CurrentInput.value === "Partial") {
      setDisabledFlag(false);
    } else {
      setDisabledFlag(true);
    }
  };

  let rowConfig = [
    {
      type: "plainText2.0",
      value: parseFloat(props.modalObject.key.match(/\d+/)?.[0] || 0) + 1,
      // styleSet: { fontWeight: "800", fontSize: "16px" },
    },
    {
      name: "pensionType",
      type: "select",
      options: pensionTypeOptions,
      placeholder: "Pension Type",
    },
    {
      name: "commencePensionYear",
      type: "select",
      options: yearsIncludedArray,
      placeholder: "Commence Pension in Year",
    },
    {
      name: "applyDeeming",
      type: "yesnoModal",
      placeholder: "Apply Deeming",
      callBack: true,
      key: "applyDeeming",
      innerModalTitle: "Apply Deeming",
      func: handleInnerModal,
    },
    {
      name: "totalSuperAnnuationBenefits",
      type: "number-toComma",
      placeholder: "Total Superannuation Benefits",
      disabled: true,
    },
    {
      name: "nominatedRolloverAmountType",
      type: "select",
      options: nominatedRolloverAmountTypeOptions,
      placeholder: "Nominated Rollover Amount",
      styleSet: { minWidth: "10vw" },
      callBack: true,
      func: nominatedRolloverAmountDisableHandle,
    },
    {
      name: "nominatedRolloverAmount",
      type: "number-toComma",
      placeholder: "Nominated Rollover Amount",
      disabled: disabledFlag,
    },
    {
      name: "taxFreeComponent",
      type: "number-toComma",
      placeholder: "Tax-free Component",
    },
  ];

  const componentMapping = {
    "Apply Deeming": <ApplyDeeming />,
  };

  const ModalContent = (obj) => {
    return componentMapping[obj.title] || null;
  };

  let handleChildButtonClick = async (values, setFieldValue) => {
    try {
      let updatedData = JSON.parse(JSON.stringify(cashFlowData));

      const { values: parentValues, key, title, sourceObj } = props.modalObject;

      const numberOfProperties =
        parseInt(parentValues.numberOfProperties, 10) || 1;

      const currentIndex = key.match(/\d+/)?.[0] || 0; // Extract numeric index from key

      let structuredEntries = Array.from(
        { length: numberOfProperties },
        (_, i) => ({
          balanceRolloverAmount:
            parentValues[`balanceRolloverAmount_${i}`] || "",
          balanceRolloverAmountObj:
            parentValues[`balanceRolloverAmountObj_${i}`] || {},
          yearToCommence: parentValues[`yearToCommence_${i}`] || "",
          riskProfile: parentValues[`riskProfile_${i}`] || "",
          investmentReturns: parentValues[`investmentReturns_${i}`] || "",
          investmentReturnsObj: parentValues[`investmentReturnsObj_${i}`] || {},
          investmentFees: parentValues[`investmentFees_${i}`] || "",
          adviserServiceFee: parentValues[`adviserServiceFee_${i}`] || "",
          pensionPayments: parentValues[`pensionPayments_${i}`] || "",
          pensionPaymentsObj: parentValues[`pensionPaymentsObj_${i}`] || {},
          newPensionRollover: parentValues[`newPensionRollover_${i}`] || "",
          newPensionRolloverObj:
            parentValues[`newPensionRolloverObj_${i}`] || {},
          withdrawals: parentValues[`withdrawals_${i}`] || "",
          withdrawalsObj: parentValues[`withdrawalsObj_${i}`] || {},
        })
      );

      // Update the correct entry with new child modal values
      structuredEntries[currentIndex][key.replace(/_\d+/, "")] = values;

      console.log(sourceObj, key, JSON.stringify(structuredEntries));

      updatedData[sourceObj.key][sourceObj.Input] = structuredEntries;
      updatedData[sourceObj.key].numberOfProperties = numberOfProperties;

      // console.log(JSON.stringify(updatedData[sourceObj.key]));

      let apiKey = {
        cf_accountBasedPension: {
          key: "financialInvestment",
          param: "INPUTS_Super_Pension",
        },
        cf_SMSFPensionAccountDetails: {
          key: "SMSF",
          param: "INPUTS_SMSF_Member_Balances",
        },
      };

      // throw new Error("API call not implemented yet");

      let res = await PostAxios(
        `${DefaultUrl}/api/cal/${apiKey[props.modalObject.sourceObj.key].key}/${
          apiKey[props.modalObject.sourceObj.key].param
        }`,
        updatedData
      );

      if (res) {
        // console.log(res);

        let DataObj =
          res.data[props.modalObject.sourceObj.key][
            props.modalObject.sourceObj.Input
          ][currentIndex];

        // console.log(DataObj, props.modalObject.sourceObj.key, currentIndex);

        if (
          DataObj?.totalSuperAnnuationBenefits &&
          typeof DataObj.totalSuperAnnuationBenefits === "number"
        ) {
          setFieldValue(
            "totalSuperAnnuationBenefits",
            DataObj.totalSuperAnnuationBenefits
          );
        } else {
          setFieldValue("totalSuperAnnuationBenefits", "$0");
        }

        setCashFlowReCalculateLoading(false);
        openNotificationSuccess(
          "success",
          "topRight",
          "Success Notification",
          'Data of "' + props.modalObject.title + '" is Saved'
        );
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
      setCashFlowReCalculateLoading(false);
    }
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
                <div className="row justify-content-center">
                  <div className="mt-4">
                    <Table striped bordered responsive hover>
                      <thead>
                        <tr>
                          <th>No#</th>
                          <th>Pension Type</th>
                          <th>Commence Pension in Year</th>
                          <th>Apply Deeming</th>
                          <th>Total Superannuation Benefits</th>
                          <th colSpan={2}>Nominated Rollover amount</th>
                          <th>Tax-free Component</th>
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

export default BalanceRolloverAmount;
