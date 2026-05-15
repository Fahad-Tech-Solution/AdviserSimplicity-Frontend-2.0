import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Row } from "react-bootstrap";

import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";
import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import ApplyDeeming from "./ApplyDeeming";
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

const BalanceRolloverAmount = (props) => {
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});
  const [disabledFlag, setDisabledFlag] = useState(true);

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
    pensionType: "",
    commencePensionYear: "",
    applyDeeming: "",
    applyDeemingObj: {},
    totalSuperAnnuationBenefits: "",
    nominatedRolloverAmountType: "No",
    nominatedRolloverAmount: "",
    taxFreeComponent: "",
  };

  /* ===============================
     Fill Initial Values
  =============================== */
  let index = parseFloat(
    props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
  );
  let BaseKey = props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "");

  const fillInitialValues = (setFieldValue) => {
    console.log(
      props.modalObject,
      props.modalObject.key.match(/\d+/)?.[0] || 0
    );

    if (
      props.modalObject.values?.[BaseKey]?.[index]?.[
        props.modalObject.key + "Obj"
      ]
    ) {
      const Data =
        props.modalObject.values?.[BaseKey]?.[index]?.[
          props.modalObject.key + "Obj"
        ];
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

  /* ===============================
     Submit
  =============================== */
  const onSubmit = (values) => {
    console.log(JSON.stringify(values));

    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key,
      values.taxFreeComponent
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
    setModalObject({
      title,
      values,
      key,
      stakeHolder: props.modalObject.stakeHolder,
    });
    setFlagState(true);
  };

  /* ===============================
     Callback Functions
  =============================== */
  const nominatedRolloverAmountDisableHandle = (
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

        setFieldValue(
          "totalSuperAnnuationBenefits",
          DataObj.totalSuperAnnuationBenefits
        );

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
     Options
  =============================== */
  const yearsIncludedOptions = Array.from({ length: 32 }, (_, i) => {
    if (i === 0) {
      return {
        value: "Existing",
        label: "Existing",
      };
    }
    return {
      value: (i - 1).toString(),
      label: `Year ${i - 1}`,
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

  /* ===============================
     Component Mapping for Inner Modal
  =============================== */
  const componentMapping = {
    "Apply Deeming": <ApplyDeeming />,
  };

  const ModalContent = (obj) => {
    return componentMapping[obj.title] || null;
  };

  /* ===============================
     AntD Columns
  =============================== */
  const columns = [
    {
      title: "No#",
      dataIndex: "index",
      key: "index",
      justText: true,
    },
    {
      title: "Pension Type",
      dataIndex: "pensionType",
      key: "pensionType",
      type: "select",
      placeholder: "Pension Type",
      options: pensionTypeOptions,
      selectedOptionValue: true,
    },
    {
      title: "Commence Pension in Year",
      dataIndex: "commencePensionYear",
      key: "commencePensionYear",
      type: "select",
      placeholder: "Commence Pension in Year",
      options: yearsIncludedOptions,
      selectedOptionValue: true,
    },
    {
      title: "Apply Deeming",
      dataIndex: "applyDeeming",
      key: "applyDeeming",
      type: "yesnoModal",
      placeholder: "Apply Deeming",
      callBack: true,
      innerModalTitle: "Apply Deeming",
      func: handleInnerModal,
    },
    {
      title: "Total Superannuation Benefits",
      dataIndex: "totalSuperAnnuationBenefits",
      key: "totalSuperAnnuationBenefits",
      type: "number-toComma",
      placeholder: "Total Superannuation Benefits",
      disabled: true,
    },
    {
      title: "Nominated Rollover Amount Type",
      dataIndex: "nominatedRolloverAmountType",
      key: "nominatedRolloverAmountType",
      type: "select",
      selectedOptionValue: true,
      placeholder: "Nominated Rollover Amount",
      options: nominatedRolloverAmountTypeOptions,
    },
    {
      title: "Nominated Rollover Amount",
      dataIndex: "nominatedRolloverAmount",
      key: "nominatedRolloverAmount",
      type: "number-toComma",
      placeholder: "Nominated Rollover Amount",
      disabled: disabledFlag,
    },
    {
      title: "Tax-free Component",
      dataIndex: "taxFreeComponent",
      key: "taxFreeComponent",
      type: "number-toComma",
      placeholder: "Tax-free Component",
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
            key: "balanceRolloverAmountRow",
            index: parseFloat(props.modalObject.key.match(/\d+/)?.[0] || 0) + 1,
            ...values,
          },
        ];

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

export default BalanceRolloverAmount;
