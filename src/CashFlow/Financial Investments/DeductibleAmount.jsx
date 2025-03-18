import React, { useEffect } from "react";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { Form, Formik } from "formik";
import { Row, Table } from "react-bootstrap";
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

const DeductibleAmount = (props) => {
  let DefaultUrl = useRecoilValue(defaultUrl);
  let cashFlowData = useRecoilValue(CashFlowData);
  let [cashFlowReCalculateLoading, setCashFlowReCalculateLoading] =
    useRecoilState(CashFlowReCalculateLoading);

  let initialValues = {
    otherDeductibleAmount: "",
    deductibleAmount: "",
  };

  let fillInitialValues = (setFieldValue) => {
    if (props.modalObject.values[props.modalObject.key]) {
      let SubObj = props.modalObject.values[props.modalObject.key];
      if (SubObj) {
        setFieldValue("otherDeductibleAmount", SubObj.otherDeductibleAmount);
        setFieldValue("deductibleAmount", SubObj.deductibleAmount);
      }
    }
  };

  let onSubmit = (values) => {
    console.log(JSON.stringify(values));

    props.setFieldValue(props.modalObject.key, values);

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  let rowConfig = [
    {
      type: "plainText",
      text: props.modalObject.stakeHolder.replace(".", ""),
      styleSet: { fontWeight: "800", fontSize: "16px" },
    },
    {
      name: "otherDeductibleAmount",
      type: "number-toComma",
      placeholder: "Other Deductible Amount",
    },
    {
      name: "deductibleAmount",
      type: "number-toComma",
      placeholder: "Deductible Amount",
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
          originalInvestmentAmount:
            parentValues[`originalInvestmentAmount_${i}`] || "",
          sourceOfFunds: parentValues[`sourceOfFunds_${i}`] || "",
          annuityType: parentValues[`annuityType_${i}`] || "",
          IsThisReversionaryAnnuity:
            parentValues[`IsThisReversionaryAnnuity_${i}`] || "",
          RCV: parentValues[`RCV_${i}`] || "",
          RCVObj: parentValues[`RCVObj_${i}`] || {},
          includeFromYear: parentValues[`includeFromYear_${i}`] || "",
          term: parentValues[`term_${i}`] || "",
          yearsUntilMaturity: parentValues[`yearsUntilMaturity_${i}`] || "",
          annualInflationRate: parentValues[`annualInflationRate_${i}`] || "",
          annualPayment: parentValues[`annualPayment_${i}`] || "",
          deductibleAmount: parentValues[`deductibleAmount_${i}`] || "",
          deductibleAmountObj: parentValues[`deductibleAmountObj_${i}`] || {},
        })
      );

      // Update the correct entry with new child modal values
      structuredEntries[currentIndex][key.replace(/_\d+/, "")] = values;

      // console.log(sourceObj, key, JSON.stringify(structuredEntries));

      updatedData[sourceObj.key][sourceObj.Input] = structuredEntries;
      updatedData[sourceObj.key].numberOfProperties = numberOfProperties;

      // console.log(JSON.stringify(updatedData[sourceObj.key]));

      // throw new Error("API call not implemented yet");

      let res = await PostAxios(
        `${DefaultUrl}/api/cal/financialInvestment/INPUTS_Annuities`,
        updatedData
      );

      if (res) {
        // console.log(res);

        let DataObj =
          res.data[props.modalObject.sourceObj.key][
            props.modalObject.sourceObj.Input
          ][currentIndex];
        // console.log(DataObj, props.modalObject.sourceObj.key, currentIndex);

        if (DataObj?.deductibleAmount) {
          setFieldValue(
            "deductibleAmount",
            toCommaAndDollar(DataObj.deductibleAmount)
          );
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
                          <th>Other Deductible Amount</th>
                          <th>Deductible Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <DynamicTableRow
                          rowConfig={rowConfig}
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
                      Hidden
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

export default DeductibleAmount;
