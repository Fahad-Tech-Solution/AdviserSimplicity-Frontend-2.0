import React, { useEffect, useMemo, useState } from "react";
import { Form, Formik } from "formik";
import { useRecoilValue } from "recoil";
import { BankDetail, defaultUrl } from "../../../Store/Store";
import { toCommaAndDollar, toPercentage } from "../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import { ConfigProvider, Select } from "antd";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const SmsfPensionAccount = (props) => {
  const bankDetailObj = useRecoilValue(BankDetail);
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
    setModalObject({
      title:
        props.modalObject.title.split("_")[0] +
        "_" +
        props.modalObject.title.split("_").slice(1)[0] +
        innerModalTitle,
      question: `Number of Portfolio:`,
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

      /* this code could revert back to calclation
      const taxableComponent =
        parseFloat(entry.taxableComponent?.replace(/[^0-9.-]+/g, "")) || 0;

      const unrestrictedNonPreserved =
        parseFloat(entry.unrestrictedNonPreserved?.replace(/[^0-9.-]+/g, "")) ||
        0;

      const total = taxableComponent + unrestrictedNonPreserved;
*/

      props.setFieldValue(
        `${props.modalObject.stakeHolder}${props.modalObject.key}Details`,
        entry
      );

      props.setFieldValue(
        `${props.modalObject.stakeHolder}${props.modalObject.key}`,
        entry.portfolioValue
      );

      if (props.flagState) {
        props.setFlagState(false);
        props.setIsEditing?.((prev) => !prev);
      }
    } catch (err) {
      console.error("❌ Error in onSubmit:", err);
    }
  };

  const optionFundType = [
    { value: "Account Based", label: "Account Based" },
    { value: "TTR", label: "TTR" },
  ];

  const Calculate = (values, setFieldValue, currentInput) => {
    try {
      const getVal = (field) =>
        parseFloat(values?.[field]?.toString().replace(/[^0-9.-]+/g, "") || 0);

      let portfolioValue = getVal("portfolioValue");
      let taxFree = getVal("taxFree");
      let restrictedNonPreserved = getVal("restrictedNonPreserved");
      let preservedAmount = getVal("preservedAmount");

      const fieldName = currentInput.name;
      const rawVal =
        parseFloat(
          currentInput?.value?.toString().replace(/[^0-9.-]+/g, "") || 0
        ) || 0;

      switch (fieldName) {
        case "portfolioValue":
          portfolioValue = rawVal;
          break;
        case "taxFree":
          taxFree = rawVal;
          break;
        case "restrictedNonPreserved":
          restrictedNonPreserved = rawVal;
          break;
        case "preservedAmount":
          preservedAmount = rawVal;
          break;
        default:
          break;
      }

      const taxFreeComponent = portfolioValue * (taxFree / 100);
      const taxableComponent = portfolioValue - taxFreeComponent;
      setFieldValue(`taxFreeComponent`, toCommaAndDollar(taxFreeComponent));
      setFieldValue(`taxableComponent`, toCommaAndDollar(taxableComponent));

      const unrestrictedNonPreserved =
        portfolioValue - (restrictedNonPreserved + preservedAmount);
      setFieldValue(
        `unrestrictedNonPreserved`,
        toCommaAndDollar(unrestrictedNonPreserved)
      );
    } catch (err) {
      console.error("❌ Calculation error:", err);
    }
  };

  const columns = [
    { title: "No#", dataIndex: "owner", key: "owner", width: 60 },
    {
      title: "Pension Type",
      dataIndex: "fundType",
      key: "fundType",
      type: "select",
      options: optionFundType,
      placeholder: "Select Pension Type",
    },
    {
      title: "Portfolio Value",
      dataIndex: "portfolioValue",
      key: "portfolioValue",
      type: "number-toComma",
      placeholder: "Portfolio Value",
      callBack: true,
      func: Calculate,
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
      title: "Purchase Price",
      placeholder: "Purchase Price",
      dataIndex: "purchasePrice",
      key: "purchasePrice",
      type: "number-toComma",
      width: 150,
    },
    {
      title: "Tax Free %",
      dataIndex: "taxFree",
      key: "taxFree",
      type: "number-toPercent",
      placeholder: "Tax Free %",
      callBack: true,
      func: Calculate,
    },
    {
      title: "Tax Free Component",
      dataIndex: "taxFreeComponent",
      key: "taxFreeComponent",
      type: "text",
      disabled: true,
      placeholder: "Tax Free Component",
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
      title: "Unrestricted Non Preserved",
      dataIndex: "unrestrictedNonPreserved",
      key: "unrestrictedNonPreserved",
      type: "text",
      disabled: true,
      placeholder: "Unrestricted Non Preserved",
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
      title: "Preserved Amount",
      dataIndex: "preservedAmount",
      key: "preservedAmount",
      type: "number-toComma",
      placeholder: "Preserved Amount",
      callBack: true,
      func: Calculate,
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
              key: "fund",
              owner: 1,
              fundType: values?.fundType || "",
              portfolioValue: values?.portfolioValue || "",
              eligibleServiceDate: values?.eligibleServiceDate || "",
              commencementDate: values?.commencementDate || "",
              taxFree: values?.taxFree || "",
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

export default SmsfPensionAccount;
