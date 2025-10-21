import React, { useEffect, useMemo, useState } from "react";
import { Form, Formik } from "formik";
import { useRecoilValue } from "recoil";
import { BankDetail, defaultUrl } from "../../../../Store/Store";
import { toCommaAndDollar, RenderName } from "../../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";
import InnerModal from "./InnerModal";
import DatePicker from "react-datepicker";
import { ConfigProvider, Select } from "antd";
import PortfolioValue from "./PortfolioValue";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const MemberNumber = (props) => {
  const bankDetailObj = useRecoilValue(BankDetail);
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});
  const [dynamicFields, setDynamicFields] = useState([]);

  const existingData =
    props.modalObject.values?.[
      `${props.modalObject.key}${props.modalObject.index}`
    ] || [];

  const initialValues = {
    NumberOfMap: existingData.length || 1,
    funds: existingData.length ? existingData : [],
  };

  useEffect(() => {
    if (existingData.length) {
      setDynamicFields(Array(existingData.length).fill(""));
    }
  }, [existingData]);

  const fillInitialValues = (setFieldValue) => {
    if (existingData.length) {
      setFieldValue("funds", existingData);
    }
  };

  const handleInnerModal = (innerModalTitle, values, key, stakeHolder) => {
    console.log({
      title:
        RenderName(props.modalObject.stakeHolder.replace(".", "")) +
        innerModalTitle,
      question: `How many Underlying Investments does ${RenderName(
        props.modalObject.stakeHolder.replace(".", "")
      )} have :`,
      key,
      editArray: values?.[key + "Array"] || [],
      values,
      Platform: props.modalObject.Platform,
    });

    setModalObject({
      title:
        RenderName(props.modalObject.stakeHolder.replace(".", "")) +
        innerModalTitle,
      question: `How many Underlying Investments does ${RenderName(
        props.modalObject.stakeHolder.replace(".", "")
      )} have :`,
      key,
      editArray: values?.[key + "Array"] || [],
      values,
      Platform: props.modalObject.Platform,
    });
    setFlagState(true);
  };

  const onSubmit = async (values) => {
    const newEntries = values.funds || [];
    const total = newEntries.reduce(
      (total, entry) =>
        total +
        (parseFloat(entry.taxableComponent?.replace(/[^0-9.-]+/g, "")) || 0),
      0
    );
    const total2 = newEntries.reduce(
      (total, entry) =>
        total +
        (parseFloat(entry.preservedAmount?.replace(/[^0-9.-]+/g, "")) || 0),
      0
    );

    props.setFieldValue(
      `${props.modalObject.key}${props.modalObject.index}`,
      newEntries
    );
    props.setFieldValue(
      `${props.modalObject.mainKey}${props.modalObject.index}`,
      toCommaAndDollar(total + total2)
    );

    if (props.flagState) props.setFlagState(false);
  };

  const optionFundType = [
    { value: "Accumulation", label: "Accumulation" },
    { value: "Defined Benefit", label: "Defined Benefit" },
  ];

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
    },
    {
      title: "Unrestricted Non Preserved",
      dataIndex: "unrestrictedNonPreserved",
      key: "unrestrictedNonPreserved",
      type: "number-toComma",
      placeholder: "Unrestricted Non Preserved",
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
          const num = 1;
          if (num > 0) {
            return Array.from({ length: num }, (_, i) => ({
              key: `fund.${i}`,
              owner: i + 1,
              fundType: values?.[i]?.fundType || "",
              portfolioValue: values?.[i]?.portfolioValue || "",
              eligibleServiceDate: values?.[i]?.eligibleServiceDate || "",
              commencementDate: values?.[i]?.commencementDate || "",
              taxFreeComponent: values?.[i]?.taxFreeComponent || "",
              taxableComponent: values?.[i]?.taxableComponent || "",
              restrictedNonPreserved: values?.[i]?.restrictedNonPreserved || "",
              unrestrictedNonPreserved:
                values?.[i]?.unrestrictedNonPreserved || "",
              preservedAmount: values?.[i]?.preservedAmount || "",
            }));
          }
          return [];
        }, [values.funds]);

        return (
          <Form>
            <InnerModal
              modalObject={modalObject}
              setFieldValue={setFieldValue}
              setFlagState={setFlagState}
              flagState={flagState}
            >
              <PortfolioValue />
            </InnerModal>

            <p
              className="text-end mt-1 pt-2 d-none"
              onClick={() => {
                console.log(values);
              }}
            >
              Test Text
            </p>

            <div className="mt-4 All_Client reportSection">
              <AntdTable
                columns={columns}
                data={dataRows}
                values={values}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                handleBlur={handleBlur}
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
