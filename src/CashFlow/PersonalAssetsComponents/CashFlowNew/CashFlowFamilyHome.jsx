import { Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CashFlowData,
  CashFlowScenarioData,
  defaultUrl,
  PersonalDetailsData,
} from "../../../Store/Store";

import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  toCommaAndDollar,
} from "../../../Components/Assets/Api/Api";

import DynamicTableForInputsSection from "../../../Components/Assets/Table/DynamicTableForInputsSection";
import InnerModal from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import CashFlowHomeLoan from "./CashFlowHomeLoan";
import CashFlowTotalCost from "./CashFlowTotalCost";

import { ConfigProvider, Select } from "antd";
import { Grid } from "antd";
const { useBreakpoint } = Grid;
const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const CashFlowFamilyHome = (props) => {
  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
  const scenarioData = useRecoilValue(CashFlowScenarioData);
  const personalData = useRecoilValue(PersonalDetailsData);
  const DefaultUrl = useRecoilValue(defaultUrl);
  const screens = useBreakpoint();

  const [modalObject, setModalObject] = useState({});
  const [flagState, setFlagState] = useState(false);

  const objKey = props.modalObject.key;
  const existingData = cashFlowData?.[objKey];

  // ------------------------------------
  // Initial Values
  // ------------------------------------
  const initialValues = {
    numberOfProperties: existingData?.numberOfProperties || 0,
    familyHomes: existingData?.client || [],
  };

  // ------------------------------------
  // Fill Initial Values
  // ------------------------------------
  const fillInitialValues = (setFieldValue) => {
    const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

    if (
      scenarioObj?.selectedSource === "discoveryForm" &&
      personalData?.client?.clientHomeAddress &&
      !existingData?._id
    ) {
      setFieldValue("familyHomes", [
        {
          address: personalData.client.clientHomeAddress,
          clientOwnership: "100%",
          partnerOwnership: "0%",
          expectedGrowthRate: "2.50%",
        },
      ]);
      setFieldValue("numberOfProperties", 1);
    } else if (scenarioData?.[objKey]) {
      setFieldValue("familyHomes", scenarioData[objKey].client || []);
      setFieldValue(
        "numberOfProperties",
        scenarioData[objKey].client?.length || 0
      );
    } else if (existingData) {
      setFieldValue("familyHomes", existingData.client || []);
      setFieldValue("numberOfProperties", existingData.numberOfProperties || 0);
    }
  };

  // ------------------------------------
  // Submit
  // ------------------------------------
  const onSubmit = async (values) => {
    const homes = values.familyHomes || [];

    const obj = {
      client: homes,
      numberOfProperties: homes.length,
      scenarioFK: JSON.parse(localStorage.getItem("ScenarioObj"))._id,
      clientTotal: toCommaAndDollar(
        homes.reduce(
          (t, h) =>
            t + parseFloat(h.currentValue?.replace(/[^0-9.-]+/g, "") || 0),
          0
        )
      ),
      partnerTotal: toCommaAndDollar(
        homes.reduce(
          (t, h) =>
            t +
            parseFloat(
              h?.familyHomeLoanObj?.loanBalance?.replace(/[^0-9.-]+/g, "") || 0
            ),
          0
        )
      ),
    };

    try {
      const hasExisting = cashFlowData?.[objKey]?._id;

      const res = hasExisting
        ? await PatchAxios(`${DefaultUrl}/api/CF/${objKey}/Update`, obj)
        : await PostAxios(`${DefaultUrl}/api/CF/${objKey}/Add`, obj);

      if (res) {
        setCashFlowData((prev) => ({ ...prev, [objKey]: res }));
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success",
        `Data of "${props.modalObject.title}" saved`
      );

      props.flagState && props.setFlagState(false);
      props?.setIsEditing?.(false);
    } catch {
      openNotificationSuccess(
        "error",
        "topRight",
        "Error",
        `Failed to save "${props.modalObject.title}"`
      );
    }
  };

  // ------------------------------------
  // Inner Modal
  // ------------------------------------
  const handleInnerModal = (title, values, key, stakeHolder) => {
    console.log("Inner Modal Called:", title, values, key);
    setModalObject({
      title,
      values,
      key,
      ParentObject: props.modalObject,
      cal: true,
      stakeHolder,
    });
    setFlagState(true);
  };

  // ------------------------------------
  // Columns
  // ------------------------------------
  const columns = [
    { title: "No#", render: (_, __, i) => i + 1, width: 60, justText: true },
    { title: "Address", dataIndex: "address", type: "text", disabled: true },
    {
      title: "Current Value",
      dataIndex: "currentValue",
      type: "number-toComma",
    },
    {
      title: "State",
      dataIndex: "state",
      type: "select",
      options: ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"].map(
        (s) => ({
          label: s,
          value: s,
        })
      ),
    },
    {
      title: "Client %",
      dataIndex: "clientOwnership",
      type: "number-toPercent",
    },
    {
      title: "Partner %",
      dataIndex: "partnerOwnership",
      type: "number-toPercent",
    },
    {
      title: "Total Cost Base",
      dataIndex: "totalCostBase",
      type: "number-toComma-Modal",
      innerModalTitle: "Total Cost Base",
      callBack: true,
      key: "totalCostBaseObj",
      func: handleInnerModal,
      disabled: true,
    },
    {
      title: "Loan",
      dataIndex: "loanBalance",
      type: "yesnoModal",
      innerModalTitle: "Home Loan",
      callBack: true,
      key: "familyHomeLoanObj",
      width: screens.xxl ? 85 : 80,
      func: handleInnerModal,
    },
    {
      title: "Growth %",
      dataIndex: "expectedGrowthRate",
      type: "number-toPercent",
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      innerRef={props.formRef}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        // ------------------------------------
        // Rows
        // ------------------------------------
        const dataRows = useMemo(() => {
          const num = Number(values?.numberOfProperties) || 0;
          Array.from({ length: num }, (_, i) => {
            setFieldValue(
              `familyHomes[${i}].address`,
              values.familyHomes?.[i]?.address ||
                personalData.client.clientHomeAddress
            );
          });

          return Array.from({ length: num }, (_, i) => ({
            key: `familyHomes.${i}`,
            stakeHolder: `familyHomes[${i}]`,
            ...values.familyHomes?.[i],
          }));
        }, [values?.numberOfProperties, values.familyHomes]);

        return (
          <Form>
            <div className="d-flex justify-content-center gap-3">
              <p
                className="pt-2"
                onClick={() => {
                  console.log(values);
                }}
              >
                Number of Homes :
              </p>
              <div style={{ minWidth: "10%" }}>
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        colorBorder: "#36b446",
                      },
                    },
                  }}
                >
                  <Select
                    id="numberOfProperties"
                    name="numberOfProperties"
                    className="w-100 h-100"
                    placeholder="Select"
                    size="large"
                    value={values.numberOfProperties || undefined}
                    onChange={(value) => {
                      setFieldValue("numberOfProperties", value);
                    }}
                    onBlur={handleBlur}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  >
                    {[1, 2].map((n) => (
                      <Option key={n} value={n}>
                        {n}
                      </Option>
                    ))}
                  </Select>
                </ConfigProvider>
              </div>
            </div>

            {values.numberOfProperties > 0 && (
              <div className="mt-4 All_Client reportSection">
                <InnerModal
                  modalObject={modalObject}
                  setFieldValue={setFieldValue}
                  setFlagState={setFlagState}
                  flagState={flagState}
                >
                  {modalObject.key?.includes("familyHomeLoanObj") ? (
                    <CashFlowHomeLoan />
                  ) : modalObject.key?.includes("totalCostBaseObj") ? (
                    <CashFlowTotalCost />
                  ) : null}
                </InnerModal>

                <AntdTable
                  columns={columns}
                  data={dataRows}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isEditing={props?.isEditing}
                  setIsEditing={props?.setIsEditing}
                />
              </div>
            )}

            <button type="submit" hidden />
          </Form>
        );
      }}
    </Formik>
  );
};

export default CashFlowFamilyHome;
