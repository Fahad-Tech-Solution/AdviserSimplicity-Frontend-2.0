import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";

import {
  CashFlowData,
  CashFlowDownloading,
  CashFlowReCalculateLoading,
  defaultUrl,
} from "../../Store/Store";

import {
  openNotificationSuccess,
  PostAxios,
  RenderName,
} from "../../Components/Assets/Api/Api";

import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const TotalCostBase = (props) => {
  const DefaultUrl = useRecoilValue(defaultUrl);
  const cashFlowData = useRecoilValue(CashFlowData);

  const [, setCashFlowReCalculateLoading] = useRecoilState(
    CashFlowReCalculateLoading
  );
  const [, setCashFlowDownloading] = useRecoilState(CashFlowDownloading);

  /* ===============================
     Initial Values
  =============================== */
  const initialValues = {
    stampDutyType: "",
    stampDutyValue: "",
    otherPurchaseCosts: "",
    costBaseExisting: "",
    totalCostBase: "",
  };

  /* ===============================
     Fill Initial Values
  =============================== */
  const fillInitialValues = (setFieldValue) => {
    let index = parseFloat(
      props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
    );
    let BaseKey = props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "");

    const data =
      props.modalObject.values?.[BaseKey]?.[index]?.[props.modalObject.key];
    if (!data) return;

    setFieldValue("stampDutyType", data.stampDutyType || "");
    setFieldValue("stampDutyValue", data.stampDutyValue || "");
    setFieldValue("otherPurchaseCosts", data.otherPurchaseCosts || "");
    setFieldValue("costBaseExisting", data.costBaseExisting || "");
    setFieldValue("totalCostBase", data.totalCostBase || "");
  };

  /* ===============================
     Save Child Modal
  =============================== */
  const onSubmit = (values) => {
    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key,
      values
    );
    props?.setFlagState?.(false);
    props.setIsEditing(!props.isEditing);
  };

  /* ===============================
     API – Recalculate
  =============================== */
  const handleRecalculate = async (values, setFieldValue) => {
    try {
      setCashFlowReCalculateLoading(true);

      const {
        values: parentValues,
        key,
        ParentObject,
        title,
      } = props.modalObject;

      const numberOfProperties =
        parseInt(parentValues.numberOfProperties, 10) || 1;

      const currentIndex = key.match(/\d+/)?.[0] || 0;

      const structuredEntries = Array.from(
        { length: numberOfProperties },
        (_, i) => ({
          streetAddress: parentValues[`streetAddress_${i}`] || "",
          valueOfProperty: parentValues[`valueOfProperty_${i}`] || "",
          clientOwnership: parentValues[`clientOwnership_${i}`] || "0%",
          partnerOwnership: parentValues[`partnerOwnership_${i}`] || "0%",
          state: parentValues[`state_${i}`] || "",
          yearOfPurchase: parentValues[`yearOfPurchase_${i}`] || "",
          totalCostBase: parentValues[`totalCostBase_${i}`] || "",
          totalCostBaseObj: parentValues[`totalCostBaseObj_${i}`] || {},
          expectedGrowthRate: parentValues[`expectedGrowthRate_${i}`] || "",
          loanBalance: parentValues[`loanBalance_${i}`] || "",
          loanBalanceObj: parentValues[`loanBalanceObj_${i}`] || {},
          rentalIncome: parentValues[`rentalIncome_${i}`] || "",
          sellPropertyInYear: parentValues[`sellPropertyInYear_${i}`] || "",
          convertToPPRYear: parentValues[`convertToPPRYear_${i}`] || "",
          estimatedFutureSellingCost:
            parentValues[`estimatedFutureSellingCost_${i}`] || "",
        })
      );

      structuredEntries[currentIndex][key.replace(/_\d+/, "")] = values;

      const payload = {
        ...cashFlowData,
        [ParentObject.key]: {
          client: structuredEntries,
          numberOfProperties,
        },
      };

      const apiMap = {
        cf_familyHome: {
          key: "cf_familyHome",
          param: "INPUTS_Lifestyle_Assets_Debt",
        },
        cf_investmentsProperty: {
          key: "financialInvestment",
          param: "INPUTS_Property",
        },
        cf_SMSFInvestmentProperties: {
          key: "SMSF",
          param: "INPUTS_SMSF_Property",
        },
        cf_FamilyTrustInvestmentProperties: {
          key: "investmentsTrust",
          param: "INPUTS_TRUST_Property",
        },
      };

      const api = `${DefaultUrl}/api/cal/${apiMap[ParentObject.key].key}/${
        apiMap[ParentObject.key].param
      }`;

      const res = await PostAxios(api, payload);

      const resultObj =
        res?.data?.[ParentObject.key]?.[currentIndex]?.totalCostBaseObj;

      if (values.stampDutyType !== "Manual") {
        setFieldValue("stampDutyValue", resultObj?.stampDutyValue);
      }

      setFieldValue("totalCostBase", resultObj?.totalCostBase);

      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        `Data of "${title}" is Saved`
      );
    } catch (error) {
      console.error(error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Data of "${props.modalObject.title}" was not saved`
      );
    } finally {
      setCashFlowReCalculateLoading(false);
    }
  };

  /* ===============================
     API – Download Excel
  =============================== */
  const handleDownload = async () => {
    try {
      setCashFlowDownloading(true);

      const response = await axios.post(
        `${DefaultUrl}/api/cal/workBookDownload`,
        cashFlowData,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `UpdatedWorkbook_of_${RenderName("client")}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);

      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        "Excel file downloaded successfully"
      );
    } catch (error) {
      console.error(error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        "File download failed"
      );
    } finally {
      setCashFlowDownloading(false);
    }
  };

  /* ===============================
     AntD Columns
  =============================== */
  const columns = [
    {
      title: "Stamp Duty",
      dataIndex: "stampDutyType",
      key: "stampDutyType",
      type: "select",
      onHeaderCell: () => ({ colSpan: 2 }),
      options: [
        { value: "Standard Rates", label: "Standard Rates" },
        { value: "Manual", label: "Manual" },
      ],
    },
    {
      title: "Stamp Duty Value",
      placeholder: "Stamp Duty Value",
      dataIndex: "stampDutyValue",
      key: "stampDutyValue",
      type: "number-toComma",
      disabled: true,
      onHeaderCell: () => ({ colSpan: 0 }),
    },
    {
      title: "Other Purchase Costs",
      placeholder: "Other Purchase Costs",
      dataIndex: "otherPurchaseCosts",
      key: "otherPurchaseCosts",
      type: "number-toComma",
    },
    {
      title: "Cost Base (Existing)",
      placeholder: "Cost Base (Existing)",
      dataIndex: "costBaseExisting",
      key: "costBaseExisting",
      type: "number-toComma",
    },
    {
      title: "Total Cost Base",
      placeholder: "Total Cost Base",
      dataIndex: "totalCostBase",
      key: "totalCostBase",
      type: "number-toComma",
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

        const finalColumns = columns.map((col) => ({
          ...col,
          disabled:
            col.dataIndex === "stampDutyValue"
              ? values.stampDutyType !== "Manual"
              : col.disabled,
        }));

        return (
          <Form>
            <Row>
              <div className="col-md-12 mt-4 All_Client reportSection">
                <AntdTable
                  columns={finalColumns}
                  data={[{ key: "totalCostBase", ...values }]}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isEditing={props?.isEditing}
                  setIsEditing={props?.setIsEditing}
                />

                {/* Hidden Buttons */}
                <button
                  ref={props.childButtonRef}
                  type="button"
                  hidden
                  onClick={() => handleRecalculate(values, setFieldValue)}
                />

                <button
                  ref={props.childButtonDownloadRef}
                  type="button"
                  hidden
                  onClick={handleDownload}
                />
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default TotalCostBase;
