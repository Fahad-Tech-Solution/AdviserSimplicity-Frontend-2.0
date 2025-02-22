import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  BankDetail,
  CashFlowData,
  CashFlowReCalculateLoading,
  defaultUrl,
  QuestionDetail,
} from "../../../Store/Store";
import DynamicTableRow from "../../../Components/Assets/Dynamic/DynamicTableRow";
import InnerModal from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import {
  openNotificationSuccess,
  PostAxios,
  toCommaAndDollar,
} from "../../../Components/Assets/Api/Api";

const CashFlowLoanBelanceLVR = (props) => {
  let DefaultUrl = useRecoilValue(defaultUrl);
  let cashFlowData = useRecoilValue(CashFlowData);
  let [cashFlowReCalculateLoading, setCashFlowReCalculateLoading] =
    useRecoilState(CashFlowReCalculateLoading);

  let initialValues = {};

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  const fillInitialValues = (setFieldValue) => {
    try {
      if (
        Object.keys(
          props.modalObject.values[
            props.modalObject.key + "CashFlowLoanBelanceLVR"
          ] || {}
        ).length > 0
      ) {
        let Data =
          props.modalObject.values[
            props.modalObject.key + "CashFlowLoanBelanceLVR"
          ];
        setFieldValue("LVR", Data.LVR);
        setFieldValue("loanAmount", Data.loanAmount || "");
        setFieldValue("loanBalance", Data.loanBalance || "");
        setFieldValue("clientOwnership", Data.clientOwnership);
        setFieldValue("partnerOwnership", Data.partnerOwnership);
      } else if (
        props.modalObject &&
        props.modalObject.ParentObject &&
        props.modalObject.ParentObject.values
      ) {
        let dataParent =
          props.modalObject.ParentObject.values[
            props.modalObject.ParentObject.key
          ] || {};
        console.log(dataParent.loanBalance, "dataParent.loanBalance");

        setFieldValue("loanAmount", dataParent.loanBalance || "");
      }
    } catch (error) {
      console.error("Error filling initial values:", error);
    }
  };

  let onSubmit = async (values) => {
    console.log("values", values);

    props.setFieldValue(
      props.modalObject.key + "CashFlowLoanBelanceLVR",
      values
    );
    props.setFieldValue(props.modalObject.key, values.loanBalance);

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  let CalculatePercentage = (
    values,
    setFieldValue,
    CurrentInput,
    stakeHolder
  ) => {
    // console.log(values, setFieldValue, CurrentInput, stakeHolder);

    let clientOwnership = values.clientOwnership.replace(/[^0-9.]+/g, "") || 0;
    let partnerOwnership =
      values.partnerOwnership.replace(/[^0-9.]+/g, "") || 0;

    switch (CurrentInput.name) {
      case "clientOwnership":
        clientOwnership = CurrentInput.value.replace(/[^0-9.]+/g, "");
        setFieldValue(
          "partnerOwnership",
          (100 - (clientOwnership > 100 ? 100 : clientOwnership)).toFixed(2) +
            "%"
        );
        break;
      case "partnerOwnership":
        partnerOwnership = CurrentInput.value.replace(/[^0-9.]+/g, "");
        setFieldValue(
          "clientOwnership",
          (100 - (partnerOwnership > 100 ? 100 : partnerOwnership)).toFixed(2) +
            "%"
        );
        break;
      default:
        console.log("Ma nahi Btao gha");
        break;
    }
  };

  const rowConfig = [
    {
      name: "LVR",
      type: "number-toPercent",
      placeholder: "LVR",
    },
    {
      name: "loanAmount",
      type: "number-toComma",
      placeholder: "Loan Amount",
    },
    {
      name: "loanBalance",
      type: "number-toComma",
      placeholder: "Loan Balance",
      disabled: true,
    },
    {
      name: "clientOwnership",
      type: "number-toPercent",
      callBack: true,
      func: CalculatePercentage,
      disabled: true,
      placeholder: "Client Ownership",
    },
    {
      name: "partnerOwnership",
      type: "number-toPercent",
      callBack: true,
      func: CalculatePercentage,
      placeholder: "Partner Ownership",
      disabled: true,
    },
  ];

  let handleChildButtonClick = async (values, setFieldValue) => {
    try {
      let obj = JSON.parse(JSON.stringify(cashFlowData));
      let FullObj = props.modalObject.ParentObject.values;

      props.modalObject.values[
        props.modalObject.key + "CashFlowLoanBelanceLVR"
      ] = values;

      FullObj[props.modalObject.ParentObject.key] = props.modalObject.values;

      obj[props.modalObject.ParentObject.ParentObject.key] = FullObj;

      console.log(props.modalObject, "props.modalObject");

      let apiKey = {
        cf_familyHome: { key: "cf_familyHome", param: "" },
        cf_investmentsProperty: {
          key: "financialInvestment",
          param: "INPUTS_Property",
        },
        cf_FamilyTrustInvestmentProperties: {
          key: "investmentsTrust",
          param: "INPUTS_TRUST_Property",
        },
        cf_SMSFInvestmentProperties: {
          key: "SMSF",
          param: "INPUTS_SMSF_Property",
        },
      };

      let res = await PostAxios(
        `${DefaultUrl}/api/cal/${
          apiKey[props.modalObject.ParentObject.ParentObject.key].key
        }/${apiKey[props.modalObject.ParentObject.ParentObject.key].param}`,
        obj
      );
      if (res) {
        console.log(res);

        let loan = {};

        if (
          props.modalObject.ParentObject.ParentObject.key === "cf_familyHome"
        ) {
          loan = res.data.loan;
        } else {
          loan = res.data[props.modalObject.ParentObject.ParentObject.key].loan;
        }

        // let { loan } = res.data[props.modalObject.ParentObject.ParentObject.key];

        setFieldValue("loanBalance", toCommaAndDollar(loan.LVR.loanBalance));

        if (!props.modalObject.clientPartnerPer) {
          setFieldValue("clientOwnership", FullObj.clientOwnership);
          setFieldValue("partnerOwnership", FullObj.partnerOwnership);
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
        }, [values.NumberOfMap]);

        return (
          <Form>
            <InnerModal
              modalObject={modalObject}
              setFieldValue={setFieldValue}
              setFlagState={setFlagState}
              flagState={flagState}
            ></InnerModal>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="mt-4">
                    <Table striped bordered responsive hover>
                      <thead>
                        <tr>
                          <th>Loan to Value Ratio (LVR) </th>
                          <th>Loan Amount</th>
                          <th>Loan Balance</th>
                          {!props.modalObject.clientPartnerPer && (
                            <React.Fragment>
                              <th>Client %Ownership</th>
                              <th>Partner %Ownership</th>
                            </React.Fragment>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        <DynamicTableRow
                          rowConfig={rowConfig.filter(
                            (row) =>
                              !props.modalObject.clientPartnerPer ||
                              (row.name !== "clientOwnership" &&
                                row.name !== "partnerOwnership")
                          )}
                          values={values}
                          setFieldValue={setFieldValue}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
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
export default CashFlowLoanBelanceLVR;
