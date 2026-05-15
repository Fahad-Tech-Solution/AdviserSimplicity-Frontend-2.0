import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Placeholder, Row } from "react-bootstrap";
import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";
import {
  CashFlowData,
  CashFlowDownloading,
  CashFlowReCalculateLoading,
  defaultUrl,
} from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  openNotificationSuccess,
  PostAxios,
  PostAxiosBlob,
  RenderName,
  toCommaAndDollar,
} from "../../Components/Assets/Api/Api";

const AntdTable = DynamicTableForInputsSection("antd");

const RCV = (props) => {
  const DefaultUrl = useRecoilValue(defaultUrl);
  const cashFlowData = useRecoilValue(CashFlowData);
  const [cashFlowReCalculateLoading, setCashFlowReCalculateLoading] =
    useRecoilState(CashFlowReCalculateLoading);
  const [cashFlowDownloading, setCashFlowDownloading] =
    useRecoilState(CashFlowDownloading);
  let BaseKey = props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "");
  let index = parseFloat(
    props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
  );

  const [layoutSwitchFlag] = useState(props.modalObject.title);

  const initialValues = {
    RCV: "",
    RCVOther: "",
    communicationEndTerm: "",
  };

  const fillInitialValues = (setFieldValue) => {
    if (
      props.modalObject.values?.[BaseKey]?.[index]?.[
        props.modalObject.key + "Obj"
      ]
    ) {
      const SubObj =
        props.modalObject.values?.[BaseKey]?.[index]?.[
          props.modalObject.key + "Obj"
        ];
      if (SubObj) {
        setFieldValue("RCV", SubObj.RCV);
        setFieldValue("RCVOther", SubObj.RCVOther);
        setFieldValue("communicationEndTerm", SubObj.communicationEndTerm);
      }
    }
  };

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

  const handleChildButtonClick = async (values, setFieldValue) => {
    try {
      const updatedData = JSON.parse(JSON.stringify(cashFlowData));

      const { values: parentValues, key, title, sourceObj } = props.modalObject;

      const numberOfProperties =
        parseInt(parentValues.numberOfProperties, 10) || 1;

      const currentIndex = key.match(/\d+/)?.[0] || 0; // Extract numeric index from key

      // Convert old format (field_0, field_1) to new format (client[0].field, client[1].field)
      const structuredEntries = Array.from(
        { length: numberOfProperties },
        (_, i) => ({
          originalInvestmentAmount:
            parentValues[`client[${i}].originalInvestmentAmount`] ||
            parentValues[`originalInvestmentAmount_${i}`] ||
            "",
          sourceOfFunds:
            parentValues[`client[${i}].sourceOfFunds`] ||
            parentValues[`sourceOfFunds_${i}`] ||
            "",
          annuityType:
            parentValues[`client[${i}].annuityType`] ||
            parentValues[`annuityType_${i}`] ||
            "",
          IsThisReversionaryAnnuity:
            parentValues[`client[${i}].IsThisReversionaryAnnuity`] ||
            parentValues[`IsThisReversionaryAnnuity_${i}`] ||
            "",
          RCV:
            parentValues[`client[${i}].RCV`] || parentValues[`RCV_${i}`] || "",
          RCVObj:
            parentValues[`client[${i}].RCVObj`] ||
            parentValues[`RCVObj_${i}`] ||
            {},
          includeFromYear:
            parentValues[`client[${i}].includeFromYear`] ||
            parentValues[`includeFromYear_${i}`] ||
            "",
          term:
            parentValues[`client[${i}].term`] ||
            parentValues[`term_${i}`] ||
            "",
          yearsUntilMaturity:
            parentValues[`client[${i}].yearsUntilMaturity`] ||
            parentValues[`yearsUntilMaturity_${i}`] ||
            "",
          annualInflationRate:
            parentValues[`client[${i}].annualInflationRate`] ||
            parentValues[`annualInflationRate_${i}`] ||
            "",
          annualPayment:
            parentValues[`client[${i}].annualPayment`] ||
            parentValues[`annualPayment_${i}`] ||
            "",
          deductibleAmount:
            parentValues[`client[${i}].deductibleAmount`] ||
            parentValues[`deductibleAmount_${i}`] ||
            "",
          deductibleAmountObj:
            parentValues[`client[${i}].deductibleAmountObj`] ||
            parentValues[`deductibleAmountObj_${i}`] ||
            {},
        })
      );

      // Update the correct entry with new child modal values
      structuredEntries[currentIndex][key.replace(/_\d+/, "")] = values;

      updatedData[sourceObj.key][sourceObj.Input] = structuredEntries;
      updatedData[sourceObj.key].numberOfProperties = numberOfProperties;

      const res = await PostAxios(
        `${DefaultUrl}/api/cal/financialInvestment/INPUTS_Annuities`,
        updatedData
      );

      if (res) {
        const DataObj =
          res.data[props.modalObject.sourceObj.key][
            props.modalObject.sourceObj.Input
          ][currentIndex];

        console.log(DataObj, props.modalObject.sourceObj.key, currentIndex);

        if (DataObj?.RCVOther) {
          setFieldValue("RCVOther", DataObj.RCVOther);
        }

        setCashFlowReCalculateLoading(false);
        openNotificationSuccess(
          "success",
          "topRight",
          "Success",
          `Data of "${props.modalObject.title}" is Saved`
        );
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error",
        `Data of "${props.modalObject.title}" is not Saved. Please try again.`
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

      const currentIndex = key.match(/\d+/)?.[0] || 0; // Extract numeric index from key

      // Convert old format (field_0, field_1) to new format (client[0].field, client[1].field)
      const structuredEntries = Array.from(
        { length: numberOfProperties },
        (_, i) => ({
          originalInvestmentAmount:
            parentValues[`client[${i}].originalInvestmentAmount`] ||
            parentValues[`originalInvestmentAmount_${i}`] ||
            "",
          sourceOfFunds:
            parentValues[`client[${i}].sourceOfFunds`] ||
            parentValues[`sourceOfFunds_${i}`] ||
            "",
          annuityType:
            parentValues[`client[${i}].annuityType`] ||
            parentValues[`annuityType_${i}`] ||
            "",
          IsThisReversionaryAnnuity:
            parentValues[`client[${i}].IsThisReversionaryAnnuity`] ||
            parentValues[`IsThisReversionaryAnnuity_${i}`] ||
            "",
          RCV:
            parentValues[`client[${i}].RCV`] || parentValues[`RCV_${i}`] || "",
          RCVObj:
            parentValues[`client[${i}].RCVObj`] ||
            parentValues[`RCVObj_${i}`] ||
            {},
          includeFromYear:
            parentValues[`client[${i}].includeFromYear`] ||
            parentValues[`includeFromYear_${i}`] ||
            "",
          term:
            parentValues[`client[${i}].term`] ||
            parentValues[`term_${i}`] ||
            "",
          yearsUntilMaturity:
            parentValues[`client[${i}].yearsUntilMaturity`] ||
            parentValues[`yearsUntilMaturity_${i}`] ||
            "",
          annualInflationRate:
            parentValues[`client[${i}].annualInflationRate`] ||
            parentValues[`annualInflationRate_${i}`] ||
            "",
          annualPayment:
            parentValues[`client[${i}].annualPayment`] ||
            parentValues[`annualPayment_${i}`] ||
            "",
          deductibleAmount:
            parentValues[`client[${i}].deductibleAmount`] ||
            parentValues[`deductibleAmount_${i}`] ||
            "",
          deductibleAmountObj:
            parentValues[`client[${i}].deductibleAmountObj`] ||
            parentValues[`deductibleAmountObj_${i}`] ||
            {},
        })
      );

      // Update the correct entry with new child modal values
      structuredEntries[currentIndex][key.replace(/_\d+/, "")] = values;

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
          "Success",
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
        "Error",
        `Data of "${props.modalObject.title}" is not Saved. Please try again.`
      );
      setCashFlowReCalculateLoading(false);
    }
  };

  /* ---------------- Table Columns ---------------- */
  const getColumns = () => {
    return [
      {
        title: "Owner",
        dataIndex: "owner",
        justText: true,
      },
      {
        title: "RCV",
        dataIndex: "RCV",
        type: "number-toPercent",
        placeholder: "RCV",
      },
      {
        title: "RCV Other",
        dataIndex: "RCVOther",
        type: "number-toComma",
        placeholder: "RCV Other",
        disabled: true,
      },
      {
        title: "Communication at End of Term",
        dataIndex: "communicationEndTerm",
        type: "number-toComma",
        placeholder: "Communication at End of Term",
      },
    ];
  };

  const columns = getColumns();
  /* ---------------- Table Data ---------------- */
  const getTableData = (values) => {
    return [
      {
        key: "rcvRow",
        owner: RenderName(BaseKey),
        ...values,
      },
    ];
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

        const tableData = getTableData(values);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="mt-4 All_Client reportSection">
                    <AntdTable
                      columns={columns}
                      data={tableData}
                      values={values}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      handleSubmit={props?.handleOk}
                      isEditing={props?.isEditing}
                      setIsEditing={props?.setIsEditing}
                    />
                  </div>
                </div>
                <button
                  ref={props.childButtonRef}
                  onClick={() => {
                    handleChildButtonClick(values, setFieldValue);
                  }}
                  style={{ display: "none" }}
                  type="button"
                >
                  Hidden
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
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RCV;
