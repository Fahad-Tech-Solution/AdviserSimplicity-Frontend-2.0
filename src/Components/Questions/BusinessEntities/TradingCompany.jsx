import { Formik, Form } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import {
  toCommaAndDollar,
  toPercentage,
  handleInputChange,
  handleInputFocus,
  handleInputKeyDown,
  handleInputBlur
} from "../../Assets/Api/Api";
import DynamicYesNo from "../FinancialInvestments/QuestionsDetail/DynamicYesNo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import TradingTrust from "./TradingTrust";
import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import { ConfigProvider, Select, Button, Input } from "antd";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const TradingCompany = (props) => {
  const questionDetail = useRecoilValue(QuestionDetail);
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  const [title] = useState(() => {
    let currentTitle = props.modalObject.title;
    if (currentTitle.includes('_')) {
      currentTitle = currentTitle.split('_').slice(1)[0];
    }
    return currentTitle;
  });

  const [nameSet] = useState(() => {
    const input = props.modalObject.Input;
    if (input === "client") {
      return localStorage.getItem("UserName");
    } else if (input === "partner") {
      return localStorage.getItem("PartnerName");
    } else if (input === "joint") {
      return localStorage.getItem("UserName") + " & " + localStorage.getItem("PartnerName");
    }
    return "";
  });

  // Load existing data if available
  const existingData =
    props.modalObject.values?.[
    props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "")
    ]?.[props.modalObject.Input + "Array"] || [];

  const initialValues = {
    NumberOfMap: existingData.length || "",
    tradingCompanies: existingData.length ? existingData : [],
  };

  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
    if (existingData.length) {
      setDynamicFields(Array(existingData.length).fill(""));
    }
  }, [existingData]);

  const fillInitialValues = (setFieldValue) => {
    if (existingData.length) {
      setFieldValue("tradingCompanies", existingData);
    }
  };

  const handleInnerModal = (innerModalTitle, key, stakeHolder, values) => {
    const index = parseFloat(stakeHolder.replace(/[^0-9-]+/g, ""));
    const BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");

    setModalObject({
      title: `${nameSet} ${innerModalTitle}`,
      key,
      stakeHolder,
      editArray: values?.[BaseKey]?.[index]?.[key] || [],
      values,
      ParentModalObject: props.modalObject,
    });
    setFlagState(true);
  };

  const onSubmit = async (values) => {
    const DataOf = props.modalObject.Input;
    const companyData = values.tradingCompanies || [];

    // Calculate total equity position
    const totalEquity = companyData.reduce(
      (sum, entry) => sum + parseFloat(entry.equityPosition?.replace(/[^0-9.-]+/g, "") || 0),
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
      type: "text",
      placeholder: "Business Name",
      width: 200,
    },
    {
      title: "ABN/ACN",
      dataIndex: "aBNACN",
      key: "aBNACN",
      type: "number",
      placeholder: "ABN/ACN",
    },
    {
      title: "Business Address",
      dataIndex: "businessAddress",
      key: "businessAddress",
      type: "number",
      placeholder: "Business Address",
      width: 200,
    },
    {
      title: "Number of Directors",
      dataIndex: "numberOfDirectors",
      key: "numberOfDirectors",
      type: "number",
      placeholder: "Number of Directors",
      width: 200,
    },
    {
      title: "Directorship",
      dataIndex: "directorship",
      key: "directorship",
      type: "yesno",
      // render: (_, record, index) => (
      //   <DynamicYesNo
      //     name={`tradingCompanies[${index}].directorship`}
      //     values={record}
      //     handleChange={(e) => {
      //       // Handle change for DynamicYesNo component
      //       console.log("Directorship change:", e.target.value);
      //     }}
      //   />
      // ),
    },
    {
      title: "Shareholding",
      dataIndex: "shareholding",
      key: "shareholding",
      type: "number-toPercent",
      placeholder: "Shareholding",
      customOnChange: (e, setFieldValue, values, fieldName) => {
        handleInputChange(e, setFieldValue, () => { }, values);
      },
      customOnFocus: (e, setFieldValue) => {
        handleInputFocus(e, setFieldValue);
      },
      customOnKeyDown: (e) => {
        handleInputKeyDown(e);
      },
      customOnBlur: (e, setFieldValue, values, fieldName) => {
        handleInputBlur(e, setFieldValue, toPercentage, () => { }, values);
      },
    },
    {
      title: "Dividend Received",
      dataIndex: "dividendReceived",
      key: "dividendReceived",
      type: "number-toComma",
      placeholder: "Dividend Received",
      width: 180,
      customOnChange: (e, setFieldValue, values, fieldName) => {
        const value = toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, ""));
        setFieldValue(fieldName, value);
      },
    },
    {
      title: "Equity Position",
      dataIndex: "equityPosition",
      key: "equityPosition",
      type: "number-toComma",
      innerModalTitle: "Business as Trusts",
      placeholder: "Equity Position",
      width: 160,
      customOnChange: (e, setFieldValue, values, fieldName) => {
        const value = toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, ""));
        setFieldValue(fieldName, value);
      },
      func: (innerModalTitle, values, key, stakeHolder) =>
        handleInnerModal(innerModalTitle, key, stakeHolder, values),
      renderSuffix: (record, index) => (
        <Button
          className="bgColor modalBtn border-0"
          onClick={() => {
            handleInnerModal(
              "Business as Trusts",
              `equityPositionArray`,
              `tradingCompanies[${index}]`,
              values
            );
          }}
        >
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </Button>
      ),
    },
  ];

  const ModalContent = (obj) => {
    return obj.title === "Business as Trusts" ? <TradingTrust /> : null;
  };

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
          const num = Number(values.NumberOfMap) || 0;
          if (num > 0) {
            return Array.from({ length: num }, (_, i) => ({
              key: `tradingCompanies.${i}`,
              owner: i + 1,
              stakeHolder: `tradingCompanies[${i}]`,
              businessName: values.tradingCompanies?.[i]?.businessName || "",
              aBNACN: values.tradingCompanies?.[i]?.aBNACN || "",
              businessAddress: values.tradingCompanies?.[i]?.businessAddress || "",
              numberOfDirectors: values.tradingCompanies?.[i]?.numberOfDirectors || "",
              directorship: values.tradingCompanies?.[i]?.directorship || "",
              shareholding: values.tradingCompanies?.[i]?.shareholding || "",
              dividendReceived: values.tradingCompanies?.[i]?.dividendReceived || "",
              equityPosition: values.tradingCompanies?.[i]?.equityPosition || "",
              equityPositionArray: values.tradingCompanies?.[i]?.equityPositionArray || "",
            }));
          }
          return [];
        }, [values.NumberOfMap, values.tradingCompanies]);

        return (
          <Form>
            <InnerModal
              modalObject={modalObject}
              setFieldValue={setFieldValue}
              setFlagState={setFlagState}
              flagState={flagState}
              setIsEditing={props.setIsEditing}
            >
              {ModalContent(modalObject)}
            </InnerModal>

            <div className="d-flex justify-content-center align-items-center gap-4">
              <p className="text-end mt-1 pt-2">
                How many {title} does {nameSet} have:
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

export default TradingCompany;