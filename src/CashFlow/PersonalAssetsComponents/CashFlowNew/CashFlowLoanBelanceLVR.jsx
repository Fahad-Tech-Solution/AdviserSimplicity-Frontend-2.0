import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  BankDetail,
  CashFlowData,
  CashFlowDownloading,
  CashFlowReCalculateLoading,
  defaultUrl,
  QuestionDetail,
} from "../../../Store/Store";
import DynamicTableRow from "../../../Components/Assets/Dynamic/DynamicTableRow";
import InnerModal from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import {
  createStructuredEntries,
  openNotificationSuccess,
  PostAxios,
  PostAxiosBlob,
  RenderName,
  toCommaAndDollar,
} from "../../../Components/Assets/Api/Api";

const CashFlowLoanBelanceLVR = (props) => {
  let DefaultUrl = useRecoilValue(defaultUrl);
  let cashFlowData = useRecoilValue(CashFlowData);
  let [cashFlowReCalculateLoading, setCashFlowReCalculateLoading] =
    useRecoilState(CashFlowReCalculateLoading);

  let [cashFlowDownloading, setCashFlowDownloading] =
    useRecoilState(CashFlowDownloading);

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
    console.log(
      "values",
      values,
      props.modalObject.key,
      props.modalObject.ParentObject
    );

    props.setFieldValue(
      props.modalObject.key + "CashFlowLoanBelanceLVR",
      values
    );

    props.setFieldValue(props.modalObject.key, values.loanAmount);

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

  const handleChildButtonClick = async (values, setFieldValue) => {
    try {
      let updatedData = JSON.parse(JSON.stringify(cashFlowData));

      const {
        values: parentValues,
        key,
        title,
        ParentObject,
      } = props.modalObject;

      const {
        values: grandValues,
        key: parentKey,
        title: parentTitle,
        ParentObject: GrandParentObject,
      } = ParentObject;

      const numberOfProperties =
        parseInt(grandValues.numberOfProperties, 10) || 1;
      const currentIndex = parentKey.match(/\d+/)?.[0] || 0; // Extract numeric index from key

      let structuredEntries = createStructuredEntries(
        grandValues,
        GrandParentObject.key,
        numberOfProperties
      );

      // Update the correct entry with new child modal values
      structuredEntries[currentIndex][ParentObject.key.replace(/_\d+/, "")] =
        parentValues;

      structuredEntries[currentIndex][ParentObject.key.replace(/_\d+/, "")][
        key + "CashFlowLoanBelanceLVR"
      ] = values;

      for (let i = 0; i < numberOfProperties; i++) {
        if (i != currentIndex) {
          structuredEntries[i].totalCostBaseObj = {};
          structuredEntries[i].familyHomeLoanObj = {};
        }
      }

      updatedData[GrandParentObject.key].client = structuredEntries;
      updatedData[GrandParentObject.key].numberOfProperties =
        numberOfProperties;

      // API Key Mapping
      let apiKey = {
        cf_familyHome: {
          key: "cf_familyHome",
          param: "INPUTS_Lifestyle_Assets_Debt",
        },
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

      let apiEndpoint = apiKey[ParentObject.ParentObject.key];
      console.log(updatedData[GrandParentObject.key]);

      // API Call
      const res = await PostAxios(
        `${DefaultUrl}/api/cal/${apiEndpoint.key}/${apiEndpoint.param}`,
        updatedData
      );

      if (res) {
        let loanData =
          res.data[ParentObject.ParentObject.key][currentIndex]?.loan || {};

        setFieldValue("loanBalance", loanData.LVR?.loanBalance || 0);

        if (!props.modalObject.clientPartnerPer) {
          setFieldValue(
            "clientOwnership",
            structuredEntries[currentIndex].clientOwnership
          );
          setFieldValue(
            "partnerOwnership",
            structuredEntries[currentIndex].partnerOwnership
          );
        }

        setCashFlowReCalculateLoading(false);
        openNotificationSuccess(
          "success",
          "topRight",
          "Success Notification",
          `Data of "${title}" is Saved`
        );
      }
    } catch (error) {
      console.error("API Error:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Data of "${props.modalObject.title}" was not saved. Please try again.`
      );
      setCashFlowReCalculateLoading(false);
    }
  };

  const handleChildButtonDownloadClick = async (values, setFieldValue) => {
    try {
      let updatedData = JSON.parse(JSON.stringify(cashFlowData));

      const {
        values: parentValues,
        key,
        title,
        ParentObject,
      } = props.modalObject;

      const {
        values: grandValues,
        key: parentKey,
        title: parentTitle,
        ParentObject: GrandParentObject,
      } = ParentObject;

      const numberOfProperties =
        parseInt(grandValues.numberOfProperties, 10) || 1;
      const currentIndex = parentKey.match(/\d+/)?.[0] || 0; // Extract numeric index from key

      let structuredEntries = createStructuredEntries(
        grandValues,
        GrandParentObject.key,
        numberOfProperties
      );

      // Update the correct entry with new child modal values
      structuredEntries[currentIndex][ParentObject.key.replace(/_\d+/, "")] =
        parentValues;

      structuredEntries[currentIndex][ParentObject.key.replace(/_\d+/, "")][
        key + "CashFlowLoanBelanceLVR"
      ] = values;

      for (let i = 0; i < numberOfProperties; i++) {
        if (i != currentIndex) {
          structuredEntries[i].totalCostBaseObj = {};
          structuredEntries[i].familyHomeLoanObj = {};
        }
      }

      updatedData[GrandParentObject.key].client = structuredEntries;
      updatedData[GrandParentObject.key].numberOfProperties =
        numberOfProperties;

      try {
        const response = await PostAxiosBlob(
          `${DefaultUrl}/api/cal/workBookDownload`,
          updatedData
        );

        console.log(response, "response");

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
      console.error("API Error:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Data of "${props.modalObject.title}" was not saved. Please try again.`
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
export default CashFlowLoanBelanceLVR;
