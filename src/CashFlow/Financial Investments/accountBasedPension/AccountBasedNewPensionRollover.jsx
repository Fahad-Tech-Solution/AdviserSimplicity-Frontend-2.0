import React, { useEffect, useState } from "react";
import DynamicTableRow from "../../../Components/Assets/Dynamic/DynamicTableRow";
import { Form, Formik } from "formik";
import { Row, Table } from "react-bootstrap";
import {
  openNotificationSuccess,
  PostAxios,
  PostAxiosBlob,
  RenderName,
  toCommaAndDollar,
} from "../../../Components/Assets/Api/Api";
import {
  CashFlowData,
  CashFlowDownloading,
  CashFlowReCalculateLoading,
  defaultUrl,
} from "../../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";

const AccountBasedNewPensionRollover = (props) => {
  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let DefaultUrl = useRecoilValue(defaultUrl);
  let cashFlowData = useRecoilValue(CashFlowData);
  let [cashFlowReCalculateLoading, setCashFlowReCalculateLoading] =
    useRecoilState(CashFlowReCalculateLoading);

  let [cashFlowDownloading, setCashFlowDownloading] =
    useRecoilState(CashFlowDownloading);

  let initialValues = {
    commencePensionInYear: "",
    currentPensionDetails: "",
    totalSuperannuationBenefits: "",
    nominatedRolloverAmount: "",
    reversionaryPensionOption: "",
    nominatedPensionAmount: "",
    otherAmount: "",
    indexationPension: "",
    pensionFunding: "",
    applyFromYear: "",
    minimumPension: "",
    maximumPension: "",
  };

  let fillInitialValues = (setFieldValue) => {
    console.log(props.modalObject);
    if (props.modalObject.values[props.modalObject.key]) {
      let Data = props.modalObject.values[props.modalObject.key];
      setFieldValue("commencePensionInYear", Data.commencePensionInYear);
      setFieldValue("currentPensionDetails", Data.currentPensionDetails);
      setFieldValue(
        "totalSuperannuationBenefits",
        Data.totalSuperannuationBenefits
      );
      setFieldValue("nominatedRolloverAmount", Data.nominatedRolloverAmount);
      setFieldValue(
        "reversionaryPensionOption",
        Data.reversionaryPensionOption
      );
      setFieldValue("nominatedPensionAmount", Data.nominatedPensionAmount);
      setFieldValue("otherAmount", Data.otherAmount);
      setFieldValue("indexationPension", Data.indexationPension);
      setFieldValue("pensionFunding", Data.pensionFunding);
      setFieldValue("applyFromYear", Data.applyFromYear);
      setFieldValue("minimumPension", Data.minimumPension);
      setFieldValue("maximumPension", Data.maximumPension);
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

  const nominatedPensionAmountOptions = [
    { value: "Minimum", label: "Minimum" },
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

  const indexation = Array.from({ length: 11 }, (_, i) => ({
    value: (i * 0.5).toFixed(2) + "%",
    label: (i * 0.5).toFixed(2) + "%",
  }));

  const commencePensionInYearOptions = Array.from({ length: 30 }, (_, i) => {
    if (i == 0) {
      return {
        value: "No".toString(),
        label: "No ".toString(),
      };
    } else {
      return {
        value: (i + 1).toString(),
        label: ("Year " + (i + 1)).toString(),
      };
    }
  });

  const YearOptionsWithNo = Array.from({ length: 31 }, (_, i) => {
    if (i == 0) {
      return {
        value: "No".toString(),
        label: "No ".toString(),
      };
    } else {
      return {
        value: i.toString(),
        label: ("Year " + i).toString(),
      };
    }
  });

  let rowConfig = [
    {
      type: "plainText2.0",
      value: parseFloat(props.modalObject.key.match(/\d+/)?.[0] || 0) + 1,
      // styleSet: { fontWeight: "800", fontSize: "16px" },
    },
    {
      name: "commencePensionInYear",
      type: "select",
      options: commencePensionInYearOptions,
      placeholder: "Commence Pension in year",
    },
    {
      name: "currentPensionDetails",
      type: "number-toComma",
      disabled: true,
      placeholder: "Current Pension Details",
    },
    {
      name: "totalSuperannuationBenefits",
      type: "number-toComma",
      disabled: true,
      placeholder: "Total Superannuation Benefits",
    },
    {
      name: "nominatedRolloverAmount",
      type: "number-toComma",
      placeholder: "Nominated Rollover Amount",
    },
    {
      name: "reversionaryPensionOption",
      type: "yesno",
      placeholder: "Reversionary Pension Option",
    },
    {
      name: "nominatedPensionAmount",
      type: "select",
      options: nominatedPensionAmountOptions,
      placeholder: "Nominated Pension Amount",
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
      name: "pensionFunding",
      type: "number-toPercent",
      placeholder: "Pension Funding",
    },
    {
      name: "applyFromYear",
      type: "select",
      options: YearOptionsWithNo,
      placeholder: "Apply from Year",
    },
    {
      name: "minimumPension",
      type: "number-toComma",
      placeholder: "Minimum Pension",
      disabled: true,
    },
    {
      name: "maximumPension",
      type: "number-toComma",
      placeholder: "Maximum Pension",
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

      // console.log(
      //   `${DefaultUrl}/api/cal/${apiKey[props.modalObject.sourceObj.key].key}/${
      //     apiKey[props.modalObject.sourceObj.key].param
      //   }`
      // );

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

        console.log(DataObj, "DataObj");

        setFieldValue("currentPensionDetails", DataObj.currentPensionDetails);
        setFieldValue(
          "totalSuperannuationBenefits",
          DataObj.totalSuperannuationBenefits
        );
        setFieldValue("minimumPension", DataObj.newMinimumPension);
        setFieldValue("maximumPension", DataObj.maximumPension);

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

  let handleChildButtonDownloadClick = async (values, setFieldValue) => {
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

      try {
        const response = await PostAxiosBlob(
          `${DefaultUrl}/api/cal/workBookDownload`,
          updatedData
        );

        const fileName = `UpdatedWorkbook_of_${RenderName("client")}.xlsx`;

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        openNotificationSuccess(
          "success",
          "topRight",
          "Success Notification",
          `Excel file "${fileName}" is downloaded.`
        );
      } catch (error) {
        console.error("Download Error:", error);
        openNotificationSuccess(
          "error",
          "topRight",
          "Download Failed",
          "Something went wrong while downloading the Excel file."
        );
      } finally {
        setCashFlowDownloading(false); // Always hide loading spinner
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
                          <th>No#</th>
                          <th>Commence Pension in year</th>
                          <th>Current Pension Details</th>
                          <th>Total Superannuation Benefits</th>
                          <th>Nominated Rollover Amount</th>
                          <th>Reversionary Pension Option</th>
                          <th>Nominated Pension Amount</th>
                          <th>Other Amount</th>
                          <th>Indexation of Pension</th>
                          <th style={{ color: "black" }}>Pension Funding</th>
                          <th style={{ color: "black" }}>Apply from Year</th>
                          <th>Minimum Pension</th>
                          <th>Maximum Pension</th>
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
                    <button
                      ref={props.childButtonDownloadRef}
                      onClick={() => {
                        handleChildButtonDownloadClick(values, setFieldValue);
                      }}
                      style={{ display: "none" }} // Hidden button
                      type="button"
                    >
                      Hidden Child Button Download
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

export default AccountBasedNewPensionRollover;
