import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Row } from "react-bootstrap";

import DynamicTableForInputsSection from "../../../Components/Assets/Table/DynamicTableForInputsSection";
import {
  openNotificationSuccess,
  PostAxios,
  PostAxiosBlob,
  RenderName,
} from "../../../Components/Assets/Api/Api";
import {
  CashFlowData,
  CashFlowDownloading,
  CashFlowReCalculateLoading,
  defaultUrl,
} from "../../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";

const AntdTable = DynamicTableForInputsSection("antd");

const AccountBasedPensionPayments = (props) => {
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  const DefaultUrl = useRecoilValue(defaultUrl);
  const cashFlowData = useRecoilValue(CashFlowData);
  const [cashFlowReCalculateLoading, setCashFlowReCalculateLoading] =
    useRecoilState(CashFlowReCalculateLoading);
  const [cashFlowDownloading, setCashFlowDownloading] =
    useRecoilState(CashFlowDownloading);

  /* ===============================
     Initial Values
  =============================== */
  const initialValues = {
    nominatedPensionAmount: "Other",
    reversionaryPensionOption: "",
    otherAmount: "",
    indexationPension: "",
    preservationAge: "",
    preservationAgeYear: "",
    minimumPension: "",
    maximumTTRPension: "",
  };

  /* ===============================
     Fill Initial Values
  =============================== */
  let BaseKey = props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "");
  let index = parseFloat(
    props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
  );
  const fillInitialValues = (setFieldValue) => {
    console.log(props.modalObject);

    if (
      props.modalObject.values?.[BaseKey]?.[index]?.[
        props.modalObject.key + "Obj"
      ]
    ) {
      const Data =
        props.modalObject.values?.[BaseKey]?.[index]?.[
          props.modalObject.key + "Obj"
        ];

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

  /* ===============================
     Submit
  =============================== */
  const onSubmit = (values) => {
    console.log(JSON.stringify(values), props.modalObject.key);

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
      props?.setIsEditing?.(false);
    }
  };

  /* ===============================
     Handle Inner Modal
  =============================== */
  const handleInnerModal = (title, values, key, stakeHolder) => {
    console.log(title, values, key, stakeHolder);
    setModalObject({
      title,
      values,
      key,
      stakeHolder: props.modalObject.stakeHolder,
    });
    setFlagState(true);
  };

  /* ===============================
     Options
  =============================== */
  const nominatedPensionAmountOptions = [
    { value: "Minimum", label: "Minimum" },
    { value: "Maximum", label: "Maximum" },
    { value: "Other", label: "Other" },
  ];

  const indexationPensionOptions = Array.from({ length: 11 }, (_, i) => ({
    value: (i * 0.5).toFixed(2) + "%",
    label: (i * 0.5).toFixed(2) + "%",
  }));

  /* ===============================
     API Handling Functions
  =============================== */
  const handleChildButtonClick = async (values, setFieldValue) => {
    try {
      const updatedData = JSON.parse(JSON.stringify(cashFlowData));

      const { values: parentValues, key, title, sourceObj } = props.modalObject;
      const numberOfProperties =
        parseInt(parentValues.numberOfProperties, 10) || 1;
      const currentIndex = key.match(/\d+/)?.[0] || 0;

      const structuredEntries = Array.from(
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

      structuredEntries[currentIndex][key.replace(/_\d+/, "")] = values;

      console.log(sourceObj, key, JSON.stringify(structuredEntries));

      updatedData[sourceObj.key][sourceObj.Input] = structuredEntries;
      updatedData[sourceObj.key].numberOfProperties = numberOfProperties;

      const apiKey = {
        cf_accountBasedPension: {
          key: "financialInvestment",
          param: "INPUTS_Super_Pension",
        },
        cf_SMSFPensionAccountDetails: {
          key: "SMSF",
          param: "INPUTS_SMSF_Member_Balances",
        },
      };

      const res = await PostAxios(
        `${DefaultUrl}/api/cal/${apiKey[props.modalObject.sourceObj.key].key}/${
          apiKey[props.modalObject.sourceObj.key].param
        }`,
        updatedData
      );

      if (res) {
        console.log(res);

        const DataObj =
          res.data[props.modalObject.sourceObj.key][
            props.modalObject.sourceObj.Input
          ][currentIndex];

        console.log(DataObj, "DataObj");

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

  const handleChildButtonDownloadClick = async (values, setFieldValue) => {
    try {
      const updatedData = JSON.parse(JSON.stringify(cashFlowData));

      const { values: parentValues, key, title, sourceObj } = props.modalObject;
      const numberOfProperties =
        parseInt(parentValues.numberOfProperties, 10) || 1;
      const currentIndex = key.match(/\d+/)?.[0] || 0;

      const structuredEntries = Array.from(
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

      structuredEntries[currentIndex][key.replace(/_\d+/, "")] = values;

      console.log(sourceObj, key, JSON.stringify(structuredEntries));

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
        setCashFlowDownloading(false);
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

  /* ===============================
     AntD Columns
  =============================== */
  const columns = [
    {
      title: "Owner",
      dataIndex: "index",
      key: "index",
      justText: true,
    },
    {
      title: "Nominated Pension Amount",
      dataIndex: "nominatedPensionAmount",
      key: "nominatedPensionAmount",
      type: "select",
      placeholder: "Nominated Pension Amount",
      options: nominatedPensionAmountOptions,
      selectedOptionValue: true,
    },
    {
      title: "Reversionary Pension Option",
      dataIndex: "reversionaryPensionOption",
      key: "reversionaryPensionOption",
      type: "yesno",
      width: 100,
      placeholder: "Reversionary Pension Option",
    },
    {
      title: "Other Amount",
      dataIndex: "otherAmount",
      key: "otherAmount",
      type: "number-toComma",
      placeholder: "Other Amount",
    },
    {
      title: "Indexation of Pension",
      dataIndex: "indexationPension",
      key: "indexationPension",
      type: "select",
      placeholder: "Indexation of Pension",
      options: indexationPensionOptions,
      selectedOptionValue: true,
    },
    {
      title: "Preservation Age",
      dataIndex: "preservationAge",
      key: "preservationAge",
      type: "number-toComma",
      placeholder: "Preservation Age",
      disabled: true,
    },
    {
      title: "Preservation Age in Year",
      dataIndex: "preservationAgeYear",
      key: "preservationAgeYear",
      type: "number-toComma",
      placeholder: "Preservation Age in Year",
      disabled: true,
    },
    {
      title: "Minimum Pension",
      dataIndex: "minimumPension",
      key: "minimumPension",
      type: "number-toComma",
      placeholder: "Minimum Pension",
      disabled: true,
    },
    {
      title: "Maximum TTR Pension",
      dataIndex: "maximumTTRPension",
      key: "maximumTTRPension",
      type: "number-toComma",
      placeholder: "Maximum TTR Pension",
      disabled: true,
    },
  ];

  /* ===============================
     Render
  =============================== */
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

        const tableData = [
          {
            key: "pensionPaymentsRow",
            index: 1,
            ...values,
          },
        ];

        return (
          <Form>
            <Row>
              <div className="col-md-12 mt-4 All_Client reportSection">
                <AntdTable
                  columns={columns}
                  data={tableData}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  handleInnerModal={handleInnerModal}
                  isEditing={props?.isEditing}
                  setIsEditing={props?.setIsEditing}
                />
              </div>

              <button
                ref={props.childButtonRef}
                onClick={() => {
                  handleChildButtonClick(values, setFieldValue);
                }}
                style={{ display: "none" }}
                type="button"
              >
                Hidden Child Button
              </button>
              <button
                ref={props.childButtonDownloadRef}
                onClick={() => {
                  handleChildButtonDownloadClick(values, setFieldValue);
                }}
                style={{ display: "none" }}
                type="button"
              >
                Hidden Child Button Download
              </button>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AccountBasedPensionPayments;
