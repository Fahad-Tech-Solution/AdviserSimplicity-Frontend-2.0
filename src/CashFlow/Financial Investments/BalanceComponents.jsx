import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
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
  toCommaAndDollar,
} from "../../Components/Assets/Api/Api";

import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const BalanceComponents = (props) => {
  const [doubleRowFlag, setDoubleRowFlag] = useState(false);

  const DefaultUrl = useRecoilValue(defaultUrl);
  const cashFlowData = useRecoilValue(CashFlowData);

  const [, setCashFlowReCalculateLoading] = useRecoilState(
    CashFlowReCalculateLoading
  );
  const [, setCashFlowDownloading] = useRecoilState(CashFlowDownloading);

  /* ===============================
     Initial Values
  =============================== */
  const initialValues = {};

  /* ===============================
     Fill Initial Values
  =============================== */
  const fillInitialValues = (setFieldValue) => {
    let Double = false;
    const DiscoveryObj = props.modalObject.DiscoveryObj;
    const stakeKey = props.modalObject.stakeHolder.replace(".", "");

    if (DiscoveryObj?.[stakeKey]) {
      const arr = DiscoveryObj[stakeKey];

      const totalBalance = arr.reduce(
        (t, e) => t + parseFloat(e.annualAdvice.replace(/[^0-9.-]+/g, "")),
        0
      );

      const taxFreeTotal = arr.reduce(
        (t, e) =>
          t +
          parseFloat(
            e.balanceBenefitDetailsArray[0].taxFreeComponent.replace(
              /[^0-9.-]+/g,
              ""
            )
          ),
        0
      );

      setFieldValue("currentBalance", toCommaAndDollar(totalBalance));
      setFieldValue("taxFreeComponent", toCommaAndDollar(taxFreeTotal));

      if (arr.length > 1) {
        Double = true;
        setDoubleRowFlag(true);

        setFieldValue("currentBalance1", toCommaAndDollar(totalBalance));
        setFieldValue("taxFreeComponent1", toCommaAndDollar(taxFreeTotal));
      }
    }

    const stored =
      props.modalObject.values?.[stakeKey]?.[props.modalObject.key + "Obj"];

    if (!stored) return;

    Object.entries(stored).forEach(([key, val]) => {
      setFieldValue(key, val);
    });
  };

  /* ===============================
     Save Child Modal
  =============================== */
  const onSubmit = (values) => {
    const totalBalance = doubleRowFlag
      ? toCommaAndDollar(
          parseFloat(values.currentBalance.replace(/[^0-9.-]+/g, "")) +
            parseFloat(values.currentBalance1.replace(/[^0-9.-]+/g, ""))
        )
      : values.currentBalance;

    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key,
      totalBalance
    );

    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key + "Obj",
      values
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

      const stakeKey = props.modalObject.stakeHolder.replace(".", "");

      const payload = {
        ...cashFlowData,
        cf_superFund: {
          ...props.modalObject.values,
          [stakeKey]: {
            ...props.modalObject.values[stakeKey],
            [props.modalObject.key + "Obj"]: values,
          },
        },
      };

      const res = await PostAxios(
        `${DefaultUrl}/api/cal/financialInvestment/INPUTS_Super_Pension`,
        payload
      );

      const result = res?.data?.cf_superFund?.[stakeKey];

      setFieldValue("totalTaxFreeComponent", result?.totalTaxFreeComponent);
      setFieldValue("taxableComponent", result?.taxableComponent);

      if (doubleRowFlag) {
        setFieldValue("totalTaxFreeComponent1", result?.totalTaxFreeComponent1);
        setFieldValue("taxableComponent1", result?.taxableComponent1);
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        `Data of "${props.modalObject.title}" is Saved`
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

      const stakeKey = props.modalObject.stakeHolder.replace(".", "");

      const payload = {
        ...cashFlowData,
        cf_superFund: {
          ...props.modalObject.values,
          [stakeKey]: {
            ...props.modalObject.values[stakeKey],
            [props.modalObject.key + "Obj"]: values,
          },
        },
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
  const baseColumns = [
    {
      title: "Fund",
      dataIndex: "index",
      key: "index",
      type: "plainText2.0",
      justText: true,
    },
    {
      title: "Current Balance",
      placeholder: "Current Balance",
      dataIndex: "currentBalance",
      key: "currentBalance",
      type: "number-toComma",
    },
    {
      title: "Tax-Free Component",
      placeholder: "Tax-Free Component",
      dataIndex: "taxFreeComponent",
      key: "taxFreeComponent",
      type: "number-toComma",
    },
    {
      title: "Pension Rollback (Year 1 Only)",
      placeholder: "Pension Rollback (Year 1 Only)",
      dataIndex: "pensionRollback",
      key: "pensionRollback",
      type: "number-toComma",
    },
    {
      title: "Tax-Free Component of Pension",
      placeholder: "Tax-Free Component of Pension",
      dataIndex: "taxFreeComponentPension",
      key: "taxFreeComponentPension",
      type: "number-toComma",
    },
    {
      title: "Tax-Free Component",
      placeholder: "Tax-Free Component",
      dataIndex: "totalTaxFreeComponent",
      key: "totalTaxFreeComponent",
      type: "number-toComma",
      disabled: true,
    },
    {
      title: "Taxable Component",
      placeholder: "Taxable Component",
      dataIndex: "taxableComponent",
      key: "taxableComponent",
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

        const tableData = [
          { key: "row1", index: "1", fund: "1", ...values },
          ...(doubleRowFlag
            ? [{ key: "row2", index: "2", fund: "2", ...values }]
            : []),
        ];

        return (
          <Form>
            <Row>
              <div className="col-md-12 mt-4 All_Client reportSection">
                <AntdTable
                  columns={baseColumns}
                  data={tableData}
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

export default BalanceComponents;
