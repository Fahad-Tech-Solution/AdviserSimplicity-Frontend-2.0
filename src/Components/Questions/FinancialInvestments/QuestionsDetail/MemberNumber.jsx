import React, { useEffect, useMemo, useState } from "react";
import { Form, Formik } from "formik";
import { useRecoilValue } from "recoil";
import { BankDetail, defaultUrl } from "../../../../Store/Store";
import {
  toCommaAndDollar,
  RenderName,
  replacePlaceholderWithLabel,
} from "../../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";
import InnerModal from "./InnerModal";
import { ConfigProvider, Select } from "antd";
import PortfolioValue from "./PortfolioValue";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const MemberNumber = (props) => {
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});
  const [dynamicFields, setDynamicFields] = useState([]);

  let index = parseFloat(
    props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
  );
  let BaseKey = props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "");

  const existingData =
    props.modalObject.values?.[BaseKey]?.[index]?.[
      `${props.modalObject.key}Details`
    ] || {};

  const initialValues = {};

  useEffect(() => {
    if (Object.keys(existingData).length) {
      setDynamicFields(Array(Object.keys(existingData).length).fill(""));
    }
  }, [existingData]);

  const fillInitialValues = (setFieldValue) => {
    if (Object.keys(existingData).length) {
      Object.keys(existingData).forEach((field) => {
        setFieldValue(field, existingData[field] || "");
      });
    } else {
      props.setIsEditing(true);
    }
  };

  const handleInnerModal = (innerModalTitle, values, key, stakeHolder) => {
    let title = `${
      RenderName(
        props.modalObject.ParentModalObject.stakeHolder.replace(".", "")
      ) +
      "_" +
      props.modalObject.title.split("_").slice(1)[0] +
      "_Portfolio Value"
    }`;

    setModalObject({
      title,
      key,
      editArray: values?.[key + "Array"] || [],
      values,
      Platform: props.modalObject.Platform,
      modalObject: props.modalObject,
    });
    setFlagState(true);
  };

  const onSubmit = async (values) => {
    try {
      const entry = values || {};

      // // Extract numeric values safely
      // const taxableComponent =
      //   parseFloat(entry.taxableComponent?.replace(/[^0-9.-]+/g, "")) || 0;

      // const preservedAmount =
      //   parseFloat(entry.preservedAmount?.replace(/[^0-9.-]+/g, "")) || 0;

      // // Calculate total
      // const total = taxableComponent + preservedAmount;
      const total =
        parseFloat(entry.portfolioValue?.replace(/[^0-9.-]+/g, "")) || 0;

      // 🧾 Update Formik fields in parent
      props.setFieldValue(
        `${props.modalObject.stakeHolder}${props.modalObject.key}Details`,
        entry
      );

      props.setFieldValue(
        `${props.modalObject.stakeHolder}${props.modalObject.key}`,
        toCommaAndDollar(total)
      );

      // ✅ Reset flag if needed
      if (props.flagState) {
        props.setFlagState(false);
        props.setIsEditing(!props.isEditing);
      }

      // console.log("✅ Submitted values:", entry);
    } catch (err) {
      console.error("❌ Error in onSubmit:", err);
    }
  };

  const optionFundType = [
    { value: "Accumulation", label: "Accumulation" },
    { value: "Defined Benefit", label: "Defined Benefit" },
  ];

  const Calculate = (values, setFieldValue, currentInput, stakeHolder) => {
    try {
      // Extract the base path (like funds[0]) for dynamic fields

      const getVal = (field) =>
        parseFloat(values?.[field]?.toString().replace(/[^0-9.-]+/g, "") || 0);

      let portfolioValue = getVal("portfolioValue");
      let taxFreeComponent = getVal("taxFreeComponent");
      let restrictedNonPreserved = getVal("restrictedNonPreserved");
      let unrestrictedNonPreserved = getVal("unrestrictedNonPreserved");

      // Update values based on which input triggered the change
      const fieldName = currentInput.name;
      const rawVal =
        parseFloat(
          currentInput?.value?.toString().replace(/[^0-9.-]+/g, "") || 0
        ) || 0;

      switch (fieldName) {
        case "portfolioValue":
          portfolioValue = rawVal;
          break;
        case "taxFreeComponent":
          taxFreeComponent = rawVal;
          break;
        case "restrictedNonPreserved":
          restrictedNonPreserved = rawVal;
          break;
        case "unrestrictedNonPreserved":
          unrestrictedNonPreserved = rawVal;
          break;
        default:
          break;
      }

      // 💰 Calculate taxable component
      const taxableComponent = portfolioValue - taxFreeComponent;
      setFieldValue(`taxableComponent`, toCommaAndDollar(taxableComponent));

      // 🏦 Calculate preserved amount
      const preservedAmount =
        portfolioValue - (restrictedNonPreserved + unrestrictedNonPreserved);
      setFieldValue(`preservedAmount`, toCommaAndDollar(preservedAmount));

      // Optional: log for debugging
      // console.log(
      //   "📊 Calculated:",
      //   "Portfolio:",
      //   portfolioValue,
      //   "TaxFree:",
      //   taxFreeComponent,
      //   "Restricted:",
      //   restrictedNonPreserved,
      //   "Unrestricted:",
      //   unrestrictedNonPreserved,
      //   "→ Taxable:",
      //   taxableComponent,
      //   "Preserved:",
      //   preservedAmount
      // );
    } catch (err) {
      console.error("❌ Calculation error:", err);
    }
  };

  const columns = [
    { title: "No#", dataIndex: "owner", key: "owner", width: 60 },
    {
      title: "Fund Type",
      dataIndex: "fundType",
      key: "fundType",
      type: "select",
      options: optionFundType,
      placeholder: "Select Fund Type",
    },
    {
      title: "Portfolio Value",
      dataIndex: "portfolioValue",
      key: "portfolioValue",
      type: "number-toComma-Modal",
      disabled: true,
      placeholder: "Portfolio Value",
      callBack: true,
      inputChangeFunc: Calculate,
      innerModalTitle: "_Portfolio Value",
      func: (innerModalTitle, values, key, stakeHolder) =>
        handleInnerModal(
          innerModalTitle,
          values,
          key,
          stakeHolder,
          "Portfolio Value"
        ),
    },
    {
      title: "Commencement Date",
      dataIndex: "commencementDate",
      key: "commencementDate",
      type: "antdate",
    },
    {
      title: "Eligible Service Date",
      dataIndex: "eligibleServiceDate",
      key: "eligibleServiceDate",
      type: "antdate",
    },
    {
      title: "Tax Free Component",
      dataIndex: "taxFreeComponent",
      key: "taxFreeComponent",
      type: "number-toComma",
      placeholder: "Tax Free Component",
      callBack: true,
      func: Calculate,
    },
    {
      title: "Taxable Component",
      dataIndex: "taxableComponent",
      key: "taxableComponent",
      type: "text",
      disabled: true,
      placeholder: "Taxable Component",
    },
    {
      title: "Restricted Non Preserved",
      dataIndex: "restrictedNonPreserved",
      key: "restrictedNonPreserved",
      type: "number-toComma",
      placeholder: "Restricted Non Preserved",
      callBack: true,
      func: Calculate,
    },
    {
      title: "Unrestricted Non Preserved",
      dataIndex: "unrestrictedNonPreserved",
      key: "unrestrictedNonPreserved",
      type: "number-toComma",
      placeholder: "Unrestricted Non Preserved",
      callBack: true,
      func: Calculate,
    },
    {
      title: "Preserved Amount",
      dataIndex: "preservedAmount",
      key: "preservedAmount",
      type: "text",
      disabled: true,
      placeholder: "Preserved Amount",
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
        }, [existingData]);

        const dataRows = useMemo(() => {
          return [
            {
              key: `fund`,
              owner: 1,
              fundType: values?.fundType || "",
              portfolioValue: values?.portfolioValue || "",
              eligibleServiceDate: values?.eligibleServiceDate || "",
              commencementDate: values?.commencementDate || "",
              taxFreeComponent: values?.taxFreeComponent || "",
              taxableComponent: values?.taxableComponent || "",
              restrictedNonPreserved: values?.restrictedNonPreserved || "",
              unrestrictedNonPreserved: values?.unrestrictedNonPreserved || "",
              preservedAmount: values?.preservedAmount || "",
            },
          ];
        }, [values]);

        return (
          <Form>
            <InnerModal
              modalObject={modalObject}
              setFieldValue={setFieldValue}
              setFlagState={setFlagState}
              flagState={flagState}
              setIsEditing={props.setIsEditing}
            >
              <PortfolioValue />
            </InnerModal>

            <div className="mt-4 All_Client reportSection">
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

            <button type="submit" style={{ display: "none" }}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default MemberNumber;
