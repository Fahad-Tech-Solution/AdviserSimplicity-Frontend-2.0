import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Row } from "react-bootstrap";

import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";
import {
  openNotificationSuccess,
  PostAxios,
  PostAxiosBlob,
  RenderName,
} from "../../Components/Assets/Api/Api";
import {
  CashFlowData,
  CashFlowDownloading,
  CashFlowReCalculateLoading,
  defaultUrl,
} from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";

const AntdTable = DynamicTableForInputsSection("antd");

const CFSMSFAccumulationDetails = (props) => {
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
    totalFundNetAssetValue: "",
    percentageOfFundForMember: "",
    actualValueToMember: "",
    taxFreeComponent: "",
    taxableComponent: "",
  };

  /* ===============================
     Fill Initial Values
  =============================== */
  let BaseKey = props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "");
  let index = parseFloat(
    props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
  );
  const fillInitialValues = (setFieldValue) => {
    if (props.modalObject.values?.[BaseKey]?.[props.modalObject.key + "Obj"]) {
      const Data =
        props.modalObject.values?.[BaseKey]?.[
          props.modalObject.key + "Obj"
        ];

      setFieldValue("totalFundNetAssetValue", Data.totalFundNetAssetValue);
      setFieldValue(
        "percentageOfFundForMember",
        Data.percentageOfFundForMember
      );
      setFieldValue("actualValueToMember", Data.actualValueToMember);
      setFieldValue("taxFreeComponent", Data.taxFreeComponent);
      setFieldValue("taxableComponent", Data.taxableComponent);
    }
  };

  /* ===============================
     Submit
  =============================== */
  const onSubmit = (values) => {
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

      const res = await PostAxios(
        `${DefaultUrl}/api/cal/SMSF/INPUTS_SMSF_Member_Balances`,
        updatedData
      );

      if (res) {
        console.log(res);

        const DataObj =
          res.data[props.modalObject.sourceObj.key][
            props.modalObject.sourceObj.Input
          ][currentIndex];

        console.log(DataObj, "DataObj");

        setFieldValue("totalFundNetAssetValue", DataObj.totalFundNetAssetValue);
        setFieldValue("actualValueToMember", DataObj.actualValueToMember);
        setFieldValue("taxableComponent", DataObj.taxableComponent);

        setCashFlowReCalculateLoading(false);
        openNotificationSuccess(
          "success",
          "topRight",
          "Success Notification",
          'Data of "' + props.modalObject.title + '" is calculated'
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
          '" is not calculated Please! try again'
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
          '" is not calculated Please! try again'
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
      dataIndex: "owner",
      key: "owner",
      justText: true,
    },
    {
      title: "Total Fund Net Asset Value",
      dataIndex: "totalFundNetAssetValue",
      key: "totalFundNetAssetValue",
      type: "number-toComma",
      placeholder: "Total Fund Net Asset Value",
      disabled: true,
    },
    {
      title: "% of Fund For Member",
      dataIndex: "percentageOfFundForMember",
      key: "percentageOfFundForMember",
      type: "number-toPercent",
      placeholder: "% of Fund For Member",
    },
    {
      title: "Actual Value to Member",
      dataIndex: "actualValueToMember",
      key: "actualValueToMember",
      type: "number-toComma",
      placeholder: "Actual Value to Member",
      disabled: true,
    },
    {
      title: "Tax-Free Component",
      dataIndex: "taxFreeComponent",
      key: "taxFreeComponent",
      type: "number-toComma",
      placeholder: "Tax-Free Component",
    },
    {
      title: "Taxable Component",
      dataIndex: "taxableComponent",
      key: "taxableComponent",
      type: "number-toComma",
      placeholder: "Taxable Component",
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
            key: "smsfAccumulationRow",
            owner: RenderName(props.modalObject.stakeHolder.replace(".", "")),
            index: parseFloat(props.modalObject.key.match(/\d+/)?.[0] || 0) + 1,
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

export default CFSMSFAccumulationDetails;
