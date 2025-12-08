import { Formik, Form } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { defaultUrl } from "../../../Store/Store";
import {
  toCommaAndDollar,
  toPercentage,
  handleInputChange,
  handleInputFocus,
  handleInputKeyDown,
  handleInputBlur,
} from "../../Assets/Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import { ConfigProvider, Select, Button, Input, Modal } from "antd";
import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
import InnerDirectors from "../QuestoinsSMSF/InnerDirectors";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const TradingTrust = (props) => {
  const [flagState, setFlagState] = useState(false);
  const [innerFlagState, setInnerFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  const [nameSet] = useState(() => {
    const input = props.modalObject.Input;
    if (input === "client") {
      return localStorage.getItem("UserName");
    } else if (input === "partner") {
      return localStorage.getItem("PartnerName");
    } else if (input === "joint") {
      return (
        localStorage.getItem("UserName") +
        " & " +
        localStorage.getItem("PartnerName")
      );
    }
    return "";
  });

  const [title] = useState(() => {
    let currentTitle = props.modalObject.title;
    if (currentTitle.includes("_")) {
      currentTitle = currentTitle.split("_").slice(1).join("_");
    }
    return currentTitle;
  });

  // Load existing data if available
  const existingData =
    props.modalObject.values?.[
      props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "")
    ]?.[props.modalObject.Input + "Array"] || [];

  const initialValues = {
    NumberOfMap: existingData.length || "",
    tradingTrusts: existingData.length ? existingData : [],
  };

  const fillInitialValues = (setFieldValue) => {
    if (existingData.length) {
      setFieldValue("tradingTrusts", existingData);
    } else {
      props.setIsEditing(true);
    }
  };

  const onSubmit = async (values) => {
    const DataOf = props.modalObject.Input;
    const companyData = values.tradingTrusts || [];

    // Calculate total equity position
    const totalEquity = companyData.reduce(
      (sum, entry) =>
        sum +
        parseFloat(entry.businessValuation?.replace(/[^0-9.-]+/g, "") || 0),
      0
    );

    props.setFieldValue(
      props.modalObject.stakeHolder + DataOf + "Array",
      companyData
    );

    props.setFieldValue(
      props.modalObject.stakeHolder + "currentBalance",
      toCommaAndDollar(totalEquity)
    );

    props.modalObject.setShowError?.((prev) => ({
      ...prev,
      [`${DataOf + "currentBalance"}Error`]: false,
      [`${DataOf + "currentBalance"}Message`]: "",
    }));

    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  let handleInnerModal = (innerModalTitle, values, key, stakeHolder) => {
    let ParentModal = props.modalObject.title;
    let title = innerModalTitle;
    let question = "";
    let columnHead = "";
    const index = parseFloat(stakeHolder.replace(/[^0-9-]+/g, ""));
    const BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");

    if (values?.[BaseKey]?.[index]?.trusteeType == "Corporate") {
      title = "Company Directors";
      question = "Number of Directors :";
      columnHead = "Director Name";
    } else {
      title = "Trustee Name";
      question = "Number of Trustees :";
      columnHead = "Trustee Name";
    }

    setModalObject({
      title,
      innerModalTitle,
      values,
      key,
      stakeHolder,
      columnHead,
      question,
      ParentModal,
      directorLimit: 4,
    });

    setFlagState(true);
  };

  const columns = [
    {
      title: "No#",
      dataIndex: "owner",
      key: "owner",
      width: 60,
    },
    {
      title: "Business Name",
      dataIndex: "businessName",
      key: "businessName",
      type: "textarea",
      width: 200,
      placeholder: "Business Name",
    },
    {
      title: "Postcode/Suburb",
      dataIndex: "postcodeSuburb",
      type: "postcode-antd",
      key: "postcodeSuburb",
      width: 230,
    },
    {
      title: "ABN",
      dataIndex: "aBN",
      key: "aBN",
      type: "number",
      placeholder: "ABN",
    },
    {
      title: "Business Address",
      dataIndex: "businessAddress",
      key: "businessAddress",
      type: "text",
      placeholder: "Business Address",
      width: 200,
    },
    {
      title: "Trustee Type",
      dataIndex: "trusteeType",
      key: "trusteeType",
      type: "selectModal",
      options: ["Corporate", "Individual"].map((v) => ({ label: v, value: v })),
      placeholder: "Trustee Type",
      width: 180,
      ModalOption: ["Corporate", "Individual"], // 👈 add this — triggers modal icon when selected
      func: handleInnerModal,
      innerModalTitle: "Company Directors", // optional but recommended
    },
    {
      title: "Trustee Name",
      dataIndex: "trusteeName",
      key: "trusteeName",
      type: "text",
      placeholder: "Trustee Name",
    },
    {
      title: "ACN",
      dataIndex: "aNC",
      key: "aNC",
      type: "number",
      placeholder: "ACN",
    },
    {
      title: "Business Ownership",
      dataIndex: "businessOwnership",
      key: "businessOwnership",
      type: "number-toPercent",
      placeholder: "Business Ownership",
      width: 200,
    },
    {
      title: "Distribution Received",
      dataIndex: "distributionReceived",
      key: "distributionReceived",
      type: "number-toComma",
      placeholder: "Distribution Received",
      width: 200,
    },
    {
      title: "Business Valuation",
      dataIndex: "businessValuation",
      key: "businessValuation",
      type: "number-toComma",
      width: 200,
      placeholder: "Business Valuation",
    },
  ];

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
        }, [existingData]);

        const dataRows = useMemo(() => {
          const num = Number(values.NumberOfMap) || 0;
          if (num > 0) {
            return Array.from({ length: num }, (_, i) => ({
              key: `tradingTrusts.${i}`,
              owner: i + 1,
              stakeHolder: `tradingTrusts[${i}]`,
              businessName: values.tradingTrusts?.[i]?.businessName || "",
              postcodeSuburb: values.tradingTrusts?.[i]?.postcodeSuburb || "",
              aBN: values.tradingTrusts?.[i]?.aBN || "",
              businessAddress: values.tradingTrusts?.[i]?.businessAddress || "",
              trusteeType: values.tradingTrusts?.[i]?.trusteeType || "",
              trusteeName: values.tradingTrusts?.[i]?.trusteeName || "",
              aNC: values.tradingTrusts?.[i]?.aNC || "",
              businessOwnership:
                values.tradingTrusts?.[i]?.businessOwnership || "",
              distributionReceived:
                values.tradingTrusts?.[i]?.distributionReceived || "",
              businessValuation:
                values.tradingTrusts?.[i]?.businessValuation || "",
              NumberOfDirectors:
                values.tradingTrusts?.[i]?.NumberOfDirectors || "",
              directorsNames: values.tradingTrusts?.[i]?.directorsNames || [],
            }));
          }
          return [];
        }, [values.NumberOfMap, values.tradingTrusts]);

        return (
          <Form>
            <InnerModal
              modalObject={modalObject}
              setFieldValue={setFieldValue}
              setFlagState={setFlagState}
              flagState={flagState}
              setIsEditing={props.setIsEditing}
            >
              <InnerDirectors />
            </InnerModal>

            <div className="d-flex justify-content-center align-items-center gap-4">
              <p
                className="text-end mt-1 pt-2"
                onClick={() => {
                  console.log(values);
                }}
              >
                Number of {title}:
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
                    id="NumberOfMap"
                    name="NumberOfMap"
                    className="w-100 h-100"
                    placeholder="Select"
                    size="large"
                    value={values.NumberOfMap || undefined}
                    onChange={(value) => {
                      setFieldValue("NumberOfMap", value);
                    }}
                    onBlur={handleBlur}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  >
                    {Array.from({ length: 3 }, (_, i) => (
                      <Option key={i} value={i + 1}>
                        {i + 1}
                      </Option>
                    ))}
                  </Select>
                </ConfigProvider>
              </div>
            </div>

            {values.NumberOfMap && (
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
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default TradingTrust;
