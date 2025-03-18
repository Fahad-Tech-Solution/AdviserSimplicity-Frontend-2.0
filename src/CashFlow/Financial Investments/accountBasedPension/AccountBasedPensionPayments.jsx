import React, { useEffect, useState } from "react";
import DynamicTableRow from "../../../Components/Assets/Dynamic/DynamicTableRow";
import { Form, Formik } from "formik";
import { Row, Table } from "react-bootstrap";
import {
  CashFlowData,
  CashFlowReCalculateLoading,
  defaultUrl,
} from "../../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  openNotificationSuccess,
  PostAxios,
  toCommaAndDollar,
} from "../../../Components/Assets/Api/Api";

const AccountBasedPensionPayments = (props) => {
  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let DefaultUrl = useRecoilValue(defaultUrl);
  let cashFlowData = useRecoilValue(CashFlowData);
  let [cashFlowReCalculateLoading, setCashFlowReCalculateLoading] =
    useRecoilState(CashFlowReCalculateLoading);

  let initialValues = {
    nominatedPensionAmount: "Other",
    reversionaryPensionOption: "",
    otherAmount: "",
    indexationPension: "",
    preservationAge: "",
    preservationAgeYear: "",
    minimumPension: "",
    maximumTTRPension: "",
  };

  let fillInitialValues = (setFieldValue) => {
    console.log(props.modalObject);
    if (props.modalObject.values[props.modalObject.key]) {
      let Data = props.modalObject.values[props.modalObject.key];
      setFieldValue("nominatedPensionAmount", Data.nominatedPensionAmount);
      setFieldValue(
        "reversionaryPensionOption",
        Data.reversionaryPensionOption
      );
      setFieldValue("otherAmount", Data.otherAmount);
      setFieldValue("indexationPension", Data.indexationPension);
      setFieldValue("preservationAge", Data.preservationAge);
      setFieldValue("preservationAgeYear", Data.preservationAgeYear);
      setFieldValue("minimumPension", Data.minimumPension);
      setFieldValue("maximumTTRPension", Data.maximumTTRPension);
    }
  };

  let onSubmit = (values) => {
    console.log(JSON.stringify(values), props.modalObject.key);

    props.setFieldValue(
      props.modalObject.key.replace("Obj", ""),
      values.otherAmount
    );

    props.setFieldValue(props.modalObject.key, values);

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  const nominatedPensionAmountOptions = [
    { value: "Minimum", label: "Minimum" },
    { value: "Maximum", label: "Maximum" },
    { value: "Other", label: "Other" },
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

  const indexation = Array.from({ length: 21 }, (_, i) => ({
    value: (i * 0.5).toFixed(2) + "%",
    label: (i * 0.5).toFixed(2) + "%",
  }));

  let rowConfig = [
    {
      type: "plainText2.0",
      value: parseFloat(props.modalObject.key.match(/\d+/)?.[0] || 0) + 1,
      // styleSet: { fontWeight: "800", fontSize: "16px" },
    },
    {
      name: "nominatedPensionAmount",
      type: "select",
      options: nominatedPensionAmountOptions,
      placeholder: "Nominated Pension Amount",
    },
    {
      name: "reversionaryPensionOption",
      type: "yesno",
      placeholder: "Reversionary Pension Option",
    },
    {
      name: "otherAmount",
      type: "number-toComma",
      placeholder: "Other Amount",
    },
    {
      name: "indexationPension",
      type: "select",
      options: indexation,
      placeholder: "Indexation of Pension",
    },
    {
      name: "preservationAge",
      type: "number-toComma",
      placeholder: "Preservation Age",
      disabled: true,
    },
    {
      name: "preservationAgeYear",
      type: "number-toComma",
      placeholder: "Preservation Age in Year",
      disabled: true,
    },
    {
      name: "minimumPension",
      type: "number-toComma",
      placeholder: "Minimum Pension",
      disabled: true,
    },
    {
      name: "maximumTTRPension",
      type: "number-toComma",
      placeholder: "Maximum TTR Pension",
      disabled: true,
    },
  ];

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

      // console.log(sourceObj, key, JSON.stringify(structuredEntries));

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
        console.log(res);

        let DataObj =
          res.data[props.modalObject.sourceObj.key][
            props.modalObject.sourceObj.Input
          ][currentIndex];

        if (
          DataObj.preservationAge &&
          typeof DataObj.preservationAge === "number"
        ) {
          setFieldValue("preservationAge", DataObj.preservationAge);
        } else {
          setFieldValue("preservationAge", "0");
        }

        if (
          DataObj.preservationAge &&
          typeof DataObj.preservationAgeYear === "number"
        ) {
          setFieldValue("preservationAgeYear", DataObj.preservationAgeYear);
        } else {
          setFieldValue("preservationAgeYear", "0");
        }

        if (
          DataObj.minimumPension &&
          typeof DataObj.minimumPension === "number"
        ) {
          setFieldValue(
            "minimumPension",
            toCommaAndDollar(DataObj.minimumPension)
          );
        } else {
          setFieldValue("minimumPension", "$0");
        }

        if (
          DataObj.maximumTTRPension &&
          typeof DataObj.maximumTTRPension === "number"
        ) {
          setFieldValue(
            "maximumTTRPension",
            toCommaAndDollar(DataObj.maximumTTRPension)
          );
        } else {
          setFieldValue("maximumTTRPension", "$0");
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
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="mt-4">
                    <Table striped bordered responsive hover>
                      <thead>
                        <tr>
                          <th>Owner</th>
                          <th>Nominated Pension Amount</th>
                          <th>Reversionary Pension Option</th>
                          <th>Other Amount</th>
                          <th>Indexation of Pension</th>
                          <th>Preservation Age</th>
                          <th>Preservation Age in Year</th>
                          <th>Minimum Pension</th>
                          <th>Maximum TTR Pension</th>
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

export default AccountBasedPensionPayments;
