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

const AccountBasedNewPensionRollover = (props) => {
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

  /* ===============================
     Submit
  =============================== */
  const onSubmit = (values) => {
    console.log(JSON.stringify(values));

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
    { value: "Other", label: "Other" },
  ];

  const indexationPensionOptions = Array.from({ length: 11 }, (_, i) => ({
    value: (i * 0.5).toFixed(2) + "%",
    label: (i * 0.5).toFixed(2) + "%",
  }));

  const commencePensionInYearOptions = Array.from({ length: 30 }, (_, i) => {
    if (i === 0) {
      return {
        value: "No",
        label: "No",
      };
    }
    return {
      value: (i + 1).toString(),
      label: `Year ${i + 1}`,
    };
  });

  const YearOptionsWithNo = Array.from({ length: 31 }, (_, i) => {
    if (i === 0) {
      return {
        value: "No",
        label: "No",
      };
    }
    return {
      value: i.toString(),
      label: `Year ${i}`,
    };
  });

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
        const DataObj =
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
      title: "No#",
      dataIndex: "index",
      key: "index",
      justText: true,
    },
    {
      title: "Commence Pension in year",
      dataIndex: "commencePensionInYear",
      key: "commencePensionInYear",
      type: "select",
      placeholder: "Commence Pension in year",
      options: commencePensionInYearOptions,
      selectedOptionValue: true,
    },
    {
      title: "Current Pension Details",
      dataIndex: "currentPensionDetails",
      key: "currentPensionDetails",
      type: "number-toComma",
      placeholder: "Current Pension Details",
      disabled: true,
    },
    {
      title: "Total Superannuation Benefits",
      dataIndex: "totalSuperannuationBenefits",
      key: "totalSuperannuationBenefits",
      type: "number-toComma",
      placeholder: "Total Superannuation Benefits",
      disabled: true,
    },
    {
      title: "Nominated Rollover Amount",
      dataIndex: "nominatedRolloverAmount",
      key: "nominatedRolloverAmount",
      type: "number-toComma",
      placeholder: "Nominated Rollover Amount",
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
      title: "Nominated Pension Amount",
      dataIndex: "nominatedPensionAmount",
      key: "nominatedPensionAmount",
      type: "select",
      placeholder: "Nominated Pension Amount",
      options: nominatedPensionAmountOptions,
      selectedOptionValue: true,
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
      title: "Pension Funding",
      dataIndex: "pensionFunding",
      key: "pensionFunding",
      type: "number-toPercent",
      placeholder: "Pension Funding",
    },
    {
      title: "Apply from Year",
      dataIndex: "applyFromYear",
      key: "applyFromYear",
      type: "select",
      placeholder: "Apply from Year",
      options: YearOptionsWithNo,
      selectedOptionValue: true,
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
      title: "Maximum Pension",
      dataIndex: "maximumPension",
      key: "maximumPension",
      type: "number-toComma",
      placeholder: "Maximum Pension",
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
            key: "newPensionRolloverRow",
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

export default AccountBasedNewPensionRollover;
