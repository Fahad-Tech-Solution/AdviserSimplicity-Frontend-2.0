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
} from "../../../Store/Store";

import {
  openNotificationSuccess,
  PostAxios,
  RenderName,
} from "../../../Components/Assets/Api/Api";

import DynamicTableForInputsSection from "../../../Components/Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const CashFlowTotalCost = (props) => {
  const DefaultUrl = useRecoilValue(defaultUrl);
  const cashFlowData = useRecoilValue(CashFlowData);

  const [, setCashFlowReCalculateLoading] = useRecoilState(
    CashFlowReCalculateLoading
  );
  const [, setCashFlowDownloading] = useRecoilState(CashFlowDownloading);

  const initialValues = {
    stampDuty: "",
    stampDutyCalculation: "",
    otherPurchaseCosts: "",
    costBaseExisting: props.modalObject.values.totalCostBase || "",
    totalCostBase: "",
  };

  /* ===============================
     Fill Initial Values
  =============================== */
  const fillInitialValues = (setFieldValue) => {
    const index = parseFloat(
      props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
    );

    let BaseKey = props.modalObject.stakeHolder.split(".").map((item, idx) => {
      return item.replace(/[^a-zA-Z]+/g, "");
    });

    console.log(
      props.modalObject.values?.[BaseKey[0]]?.[index]?.[props.modalObject.key],
      "Values Game"
    );
    console.log(props.modalObject.stakeHolder);

    const data =
      props.modalObject.values?.[BaseKey]?.[index]?.[props.modalObject.key] ||
      {};

    if (typeof data == "object" && Object.keys(data).length === 0) return;

    setFieldValue("stampDuty", data.stampDuty || "");
    setFieldValue("stampDutyCalculation", data.stampDutyCalculation || "");
    setFieldValue("otherPurchaseCosts", data.otherPurchaseCosts || "");
    setFieldValue(
      "costBaseExisting",
      data.costBaseExisting || props.modalObject.values.totalCostBase || ""
    );
    setFieldValue("totalCostBase", data.totalCostBase || "");
  };

  /* ===============================
     Save Child Modal
  =============================== */
  const onSubmit = async (values) => {
    console.log(
      props.modalObject.stakeHolder + props.modalObject.key.replace(/Obj/, "")
    );
    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key,
      values
    );
    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key.replace(/Obj/, ""),
      values.costBaseExisting
    );

    props?.setFlagState?.(false);
    props?.setIsEditing?.(false);
  };

  /* ===============================
     API – Recalculate
  =============================== */
  const handleRecalculate = async (values, setFieldValue) => {
    try {
      setCashFlowReCalculateLoading(true);

      const { values: parentValues, key, title } = props.modalObject;
      const numberOfProperties =
        parseInt(parentValues.numberOfProperties, 10) || 1;

      const currentIndex = key.match(/\d+/)?.[0] || 0;

      const structuredEntries = Array.from(
        { length: numberOfProperties },
        (_, i) => ({
          address: parentValues[`address_${i}`] || "",
          currentValue: parentValues[`currentValue_${i}`] || "",
          state: parentValues[`state_${i}`] || "",
          clientOwnership: parentValues[`clientOwnership_${i}`] || "0%",
          partnerOwnership: parentValues[`partnerOwnership_${i}`] || "0%",
          yearOfPurchase: parentValues[`yearOfPurchase_${i}`] || "",
          totalCostBase: parentValues[`totalCostBase_${i}`] || "",
          totalCostBaseObj: parentValues[`totalCostBaseObj_${i}`] || {},
          loanBalance: parentValues[`loanBalance_${i}`] || "",
          familyHomeLoanObj: parentValues[`familyHomeLoanObj_${i}`] || {},
          expectedGrowthRate: parentValues[`expectedGrowthRate_${i}`] || "",
          sellPropertyInYear: parentValues[`sellPropertyInYear_${i}`] || "",
          estimatedFutureSellingCost:
            parentValues[`estimatedFutureSellingCost_${i}`] || "",
        })
      );

      structuredEntries[currentIndex][key.replace(/_\d+/, "")] = values;

      const payload = {
        ...cashFlowData,
        cf_familyHome: {
          client: structuredEntries,
          numberOfProperties,
        },
      };

      const res = await PostAxios(
        `${DefaultUrl}/api/cal/cf_familyHome/INPUTS_Lifestyle_Assets_Debt`,
        payload
      );

      const resultObj =
        res?.data?.cf_familyHome?.[currentIndex]?.totalCostBaseObj;

      if (values.stampDuty !== "Manual") {
        setFieldValue("stampDutyCalculation", resultObj?.stampDutyCalculation);
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
  const handleDownload = async (values) => {
    try {
      setCashFlowDownloading(true);

      const payload = {
        ...cashFlowData,
      };

      const response = await axios.post(
        `${DefaultUrl}/api/cal/workBookDownload`,
        payload,
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
      dataIndex: "stampDuty",
      key: "stampDuty",
      type: "select",
      onHeaderCell: () => ({
        colSpan: 2, // hide this header cell
      }),
      options: [
        { value: "Standard Rates", label: "Standard Rates" },
        {
          value:
            props.modalObject.key.match(/\d+/)?.[0] === "0"
              ? "FH Buyer"
              : "Pensioner",
          label:
            props.modalObject.key.match(/\d+/)?.[0] === "0"
              ? "FH Buyer"
              : "Pensioner",
        },
        { value: "Manual", label: "Manual" },
      ],
    },
    {
      title: "Stamp Duty Calculation",
      dataIndex: "stampDutyCalculation",
      key: "stampDutyCalculation",
      type: "number-toComma",
      disabled: true,
      onHeaderCell: () => ({
        colSpan: 0, // hide this header cell
      }),
    },
    {
      title: "Other Purchase Costs",
      dataIndex: "otherPurchaseCosts",
      key: "otherPurchaseCosts",
      type: "number-toComma",
    },
    {
      title: "Cost Base (Existing)",
      dataIndex: "costBaseExisting",
      key: "costBaseExisting",
      type: "number-toComma",
    },
    {
      title: "Total Cost Base",
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
            col.dataIndex === "stampDutyCalculation"
              ? values.stampDuty !== "Manual"
              : col.disabled,
        }));

        return (
          <Form>
            <Row>
              <div className="col-md-12 mt-4 All_Client reportSection">
                <AntdTable
                  columns={finalColumns}
                  data={[{ key: "totalCost", ...values }]}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isEditing={props?.isEditing}
                  setIsEditing={props?.setIsEditing}
                />

                {/* Hidden Buttons (Parent Controlled) */}
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
                  onClick={() => handleDownload(values)}
                />
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CashFlowTotalCost;
