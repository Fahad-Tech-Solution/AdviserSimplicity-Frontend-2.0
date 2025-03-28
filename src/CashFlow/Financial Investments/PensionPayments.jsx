import React, { useEffect, useState } from "react";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { Form, Formik } from "formik";
import { Row, Table } from "react-bootstrap";
import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import ApplyDeeming from "./ApplyDeeming";
import {
  CashFlowData,
  CashFlowReCalculateLoading,
  defaultUrl,
} from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  openNotificationSuccess,
  PostAxios,
  toCommaAndDollar,
} from "../../Components/Assets/Api/Api";

const PensionPayments = (props) => {
  let [disabledFlag, setDisabledFlag] = useState(true);
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
    if (
      props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]
    ) {
      let SubObj =
        props.modalObject.values[
          props.modalObject.stakeHolder.replace(".", "")
        ];
      if (SubObj[props.modalObject.key + "Obj"]) {
        let Data = SubObj[props.modalObject.key + "Obj"];
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
    }
  };

  let onSubmit = (values) => {
    console.log(JSON.stringify(values));

    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key,
      values.otherAmount
    );
    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key + "Obj",
      values
    );

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
      type: "plainText",
      text: props.modalObject.stakeHolder.replace(".", ""),
      styleSet: { fontWeight: "800", fontSize: "16px" },
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
      let obj = JSON.parse(JSON.stringify(cashFlowData));

      obj[props.modalObject.sourceObj.key] = props.modalObject.values;

      obj[props.modalObject.sourceObj.key][
        props.modalObject.stakeHolder.replace(".", "")
      ][props.modalObject.key + "Obj"] = values;

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
        obj
      );

      if (res) {
        console.log(res);

        let DataObj =
          res.data[props.modalObject.sourceObj.key][
            props.modalObject.stakeHolder.replace(".", "")
          ];

        setFieldValue("preservationAge", DataObj.preservationAge);
        setFieldValue("preservationAgeYear", DataObj.preservationAgeYear);
        setFieldValue("minimumPension", DataObj.minimumPension);
        setFieldValue("maximumTTRPension", DataObj.maximumTTRPension);

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

export default PensionPayments;
