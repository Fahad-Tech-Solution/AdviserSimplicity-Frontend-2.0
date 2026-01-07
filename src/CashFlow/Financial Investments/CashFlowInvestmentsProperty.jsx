import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form } from "formik";
import { ConfigProvider, Select } from "antd";
import { FaRegBuilding } from "react-icons/fa6";
import { useRecoilState, useRecoilValue } from "recoil";

import DynamicTableForInputsSection from "../../Components/Assets/Table/DynamicTableForInputsSection";
import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import TotalCostBase from "./TotalCostBase";
import CashFlowHomeLoan from "../PersonalAssetsComponents/CashFlowNew/CashFlowHomeLoan";

import {
  CashFlowData,
  CashFlowScenarioData,
  defaultUrl,
  QuestionDetail,
} from "../../Store/Store";

import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  toCommaAndDollar,
} from "../../Components/Assets/Api/Api";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const CashFlowInvestmentsProperty = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);
  const DefaultUrl = useRecoilValue(defaultUrl);

  const [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);

  const [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  let investmentPropertyDetails =
    Object.keys(questionDetail.investmentPropertyDetails || {}).length > 0
      ? questionDetail.investmentPropertyDetails
      : {
          client: [],
          partner: [],
          joint: [],
        };

  const initialValues = {
    numberOfProperties: "",
    client: [],
  };

  /* ------------------ Fill Initial Values ------------------ */
  const fillInitialValues = (setFieldValue) => {
    try {
      setObjAndAPIKey(props.modalObject.key);

      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

      const updateFields = (data, index) => {
        if (!data) return;
        console.log(data?.PropertyAddress || "");

        Object.entries({
          [`streetAddress`]: data.streetAddress || data.PropertyAddress || "",
          [`valueOfProperty`]: data.valueOfProperty || data.CurrentValue || "",
          [`clientOwnership`]:
            data.clientOwnership || data.ClientOwnership || "",
          [`partnerOwnership`]:
            data.partnerOwnership || data.PartnerOwnership || "",
          [`state`]: data.state || "",
          [`yearOfPurchase`]: data.yearOfPurchase || "",
          [`totalCostBase`]: data.totalCostBase || "$0",
          [`totalCostBaseObj`]: data.totalCostBaseObj || {
            costBaseExisting: data?.costBaseExisting || data?.CostBase || "",
          },
          [`expectedGrowthRate`]: data.expectedGrowthRate || "2.50%",
          [`loanBalance`]:
            data.loanBalance ??
            (data.propertyLoanDetailsArray?.length > 0 ? "Yes" : "No"),
          [`loanBalanceObj`]:
            data.loanBalanceObj || data.propertyLoanDetailsArray?.[0] || {},
          [`rentalIncome`]: data.rentalIncome || "",
          [`sellPropertyInYear`]: data.sellPropertyInYear || "No",
          [`convertToPPRYear`]: data.convertToPPRYear || "No",
          [`estimatedFutureSellingCost`]: data.estimatedFutureSellingCost || "",
        }).forEach(([key, value]) => {
          setFieldValue(`client[${index}].` + key, value);
        });
      };

      const hydrate = (src) => {
        if (!src?.client?.length) return;

        setFieldValue("numberOfProperties", src.client.length);

        src.client.forEach((clientData, index) => {
          console.log(clientData);

          updateFields(clientData, index);
        });
      };

      console.log(investmentPropertyDetails);

      // 1️⃣ Discovery Form (only if CF not already saved)
      if (
        scenarioObj?.selectedSource === "discoveryForm" &&
        investmentPropertyDetails?._id &&
        !cashFlowData?.[objAndAPIKey]?._id
      ) {
        console.log("ma chala ");
        hydrate(investmentPropertyDetails);
      }
      // 2️⃣ Cash Flow Scenario
      else if (CashFlowScenarioDataObj?.[objAndAPIKey]?._id) {
        hydrate(CashFlowScenarioDataObj[objAndAPIKey]);
      }
      // 3️⃣ Cash Flow Data (final fallback)
      else {
        hydrate(cashFlowData?.[objAndAPIKey]);
      }
    } catch (error) {
      console.error("Error in fillInitialValues:", error);
    }
  };

  /* ------------------ Ownership Auto % ------------------ */
  const calculatePercentage = (values, setFieldValue, index, field, value) => {
    const numeric = parseFloat(value.replace(/[^0-9.]+/g, "")) || 0;
    const capped = numeric > 100 ? 100 : numeric;

    if (field === "clientOwnership") {
      setFieldValue(
        `investmentProperties[${index}].partnerOwnership`,
        (100 - capped).toFixed(2) + "%"
      );
    }

    if (field === "partnerOwnership") {
      setFieldValue(
        `investmentProperties[${index}].clientOwnership`,
        (100 - capped).toFixed(2) + "%"
      );
    }
  };

  /* ------------------ Inner Modal ------------------ */
  const handleInnerModal = (title, values, key, stakeHolder) => {
    setModalObject({
      title,
      values,
      key,
      stakeHolder,
      ParentObject: props.modalObject,
      cal: true,
    });
    setFlagState(true);
  };

  /* ------------------ Submit ------------------ */
  const onSubmit = async (values) => {
    const entries = values.client || [];

    const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

    const sanitizeNumber = (val) =>
      parseFloat(String(val || "").replace(/[^0-9.-]+/g, "")) || 0;

    const obj = {
      client: entries.map((e) => ({
        ...e,

        // ✅ ensure modal objects are normalized
        totalCostBaseObj: e.totalCostBaseObj || {
          costBaseExisting: e.totalCostBase || "",
        },

        loanBalanceObj: e.loanBalance === "Yes" ? e.loanBalanceObj || {} : {},
      })),

      numberOfProperties: entries.length,

      scenarioFK: scenarioObj?._id,

      // ✅ Sum of property values
      clientTotal: toCommaAndDollar(
        entries.reduce((t, e) => t + sanitizeNumber(e.valueOfProperty), 0)
      ),

      // ✅ Sum of loan balances (safe)
      partnerTotal: toCommaAndDollar(
        entries.reduce(
          (t, e) => t + sanitizeNumber(e.loanBalanceObj?.loanBalance),
          0
        )
      ),
    };

    try {
      let res;

      if (!cashFlowData?.[objAndAPIKey]?._id) {
        res = await PostAxios(`${DefaultUrl}/api/CF/${objAndAPIKey}/Add`, obj);
      } else {
        res = await PatchAxios(
          `${DefaultUrl}/api/CF/${objAndAPIKey}/Update`,
          obj
        );
      }

      if (res) {
        setCashFlowData({ ...cashFlowData, [objAndAPIKey]: res });
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success",
        `Data of "${props.modalObject.title}" is Saved`
      );

      props.setFlagState?.(false);
      props.setIsEditing(!props.isEditing);
    } catch (error) {
      openNotificationSuccess(
        "error",
        "topRight",
        "Error",
        `Data of "${props.modalObject.title}" is not Saved`
      );
    }
  };

  /* ------------------ Columns ------------------ */
  const yearOptionsExisting = Array.from({ length: 31 }, (_, i) =>
    i === 0
      ? { value: "Existing", label: "Existing" }
      : { value: i, label: `Year ${i}` }
  );

  const yearOptionsNo = Array.from({ length: 31 }, (_, i) =>
    i === 0 ? { value: "No", label: "No" } : { value: i, label: `Year ${i}` }
  );

  const indexation = Array.from({ length: 11 }, (_, i) => ({
    value: (i * 0.5).toFixed(2) + "%",
    label: (i * 0.5).toFixed(2) + "%",
  })).filter((o) => o.value !== "0.50%");

  const columns = [
    { title: "No#", dataIndex: "owner", key: "owner", width: 60 },
    {
      title: "Street Address",
      placeholder: "Street Address",
      dataIndex: "streetAddress",
      type: "text",
    },
    {
      title: (
        <>
          Value of Property{" "}
          <a
            href="https://www.property.com.au/"
            target="_blank"
            style={{ color: "#FFF" }}
          >
            <FaRegBuilding />
          </a>
        </>
      ),
      dataIndex: "valueOfProperty",
      placeholder: "Value of Property",
      type: "number-toComma",
    },
    {
      title: "Client % Ownership",
      dataIndex: "clientOwnership",
      placeholder: "Client % Ownership",
      type: "number-toPercent",
      callBack: true,
      func: calculatePercentage,
    },
    {
      title: "Partner % Ownership",
      dataIndex: "partnerOwnership",
      placeholder: "Partner % Ownership",
      type: "number-toPercent",
      callBack: true,
      func: calculatePercentage,
    },
    {
      title: "State",
      dataIndex: "state",
      type: "select",
      options: ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"].map(
        (s) => ({
          value: s,
          label: s,
        })
      ),
    },
    {
      title: "Year of Purchase",
      dataIndex: "yearOfPurchase",
      placeholder: "Year of Purchase",
      type: "select",
      selectedOptionValue: true,
      options: yearOptionsExisting,
    },
    {
      title: "Total Cost Base",
      dataIndex: "totalCostBaseObj",
      placeholder: "Total Cost Base",
      type: "modal",
      key: "totalCostBaseObj",
      innerModalTitle: "Total Cost Base",
      handleInnerModal: handleInnerModal,
    },
    {
      title: "Expected Growth Rate",
      dataIndex: "expectedGrowthRate",
      placeholder: "Expected Growth Rate",
      type: "number-toPercent",
    },
    {
      title: "Loan Balance",
      placeholder: "Loan Balance",
      dataIndex: "loanBalance",
      type: "yesnoModal",
      key: "loanBalanceObj",
      innerModalTitle: "Loan Balance",
      callBack: true,
      func: handleInnerModal,
    },
    {
      title: "Rental Income",
      dataIndex: "rentalIncome",
      type: "yesno",
    },
    {
      title: "Sell Property in Year",
      dataIndex: "sellPropertyInYear",
      type: "select",
      selectedOptionValue: true,
      options: yearOptionsNo,
    },
    {
      title: "Convert to PPR",
      dataIndex: "convertToPPRYear",
      type: "select",
      selectedOptionValue: true,
      options: yearOptionsNo,
    },
    {
      title: "Estimated Future Selling Cost",
      dataIndex: "estimatedFutureSellingCost",
      type: "select",
      selectedOptionValue: true,
      options: indexation,
    },
  ];

  const componentMapping = {
    "Total Cost Base": <TotalCostBase />,
    "Loan Balance": <CashFlowHomeLoan />,
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        const rows = useMemo(() => {
          const count = Number(values.numberOfProperties) || 0;
          return Array.from({ length: count }, (_, i) => ({
            key: `client.${i}`,
            owner: i + 1,
            stakeHolder: `client[${i}]`,
            ...values.client?.[i],
            totalCostBaseObj:
              values.client?.[i]?.totalCostBaseObj?.costBaseExisting ||
              "no data Found",
          }));
        }, [values.numberOfProperties, values.client]);

        return (
          <Form>
            <InnerModal
              modalObject={modalObject}
              setFieldValue={setFieldValue}
              setFlagState={setFlagState}
              flagState={flagState}
            >
              {componentMapping[modalObject.title]}
            </InnerModal>

            <div className="d-flex justify-content-center align-items-center gap-4">
              <label onClick={() => console.log(values)}>
                Number of properties
              </label>
              <ConfigProvider>
                <Select
                  size="large"
                  style={{ minWidth: 80 }}
                  value={values.numberOfProperties || undefined}
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  onChange={(v) => {
                    const capped = v > 10 ? 10 : v;
                    setFieldValue("numberOfProperties", capped);
                  }}
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((v) => (
                    <Option key={v} value={v}>
                      {v}
                    </Option>
                  ))}
                </Select>
              </ConfigProvider>
            </div>

            {values.numberOfProperties > 0 && (
              <div className="mt-4 All_Client reportSection">
                <AntdTable
                  columns={columns}
                  data={rows}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  handleSubmit={props.handleOk}
                  isEditing={props.isEditing}
                  setIsEditing={props.setIsEditing}
                />
              </div>
            )}

            <button
              ref={props.childButtonRef}
              type="button"
              style={{ display: "none" }}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default CashFlowInvestmentsProperty;
