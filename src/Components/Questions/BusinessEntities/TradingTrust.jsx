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
  handleInputBlur
} from "../../Assets/Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import { ConfigProvider, Select, Button, Input, Modal } from "antd";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

function InnerDirectors(props) {
  const innerInitialValues = { 
    NumberOfDirectors: props.modalObject.values?.[`NumberOfDirectors${props.modalObject.index}`] || "" 
  };

  const handleInnerSubmit = (values) => {
    const newEntries = [];

    for (let i = 0; i < parseFloat(values.NumberOfDirectors); i++) {
      const newEntry = {
        directorName: values[`directorName${i}`] || "",
      };
      newEntries.push(newEntry);
    }

    props.setFieldValue(`NumberOfDirectors${props.modalObject.index}`, parseFloat(values.NumberOfDirectors));
    props.setFieldValue(`directorsNames${props.modalObject.index}`, newEntries);

    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  const fillInitialValues = (setFieldValue) => {
    const directors = props.modalObject.values?.[`directorsNames${props.modalObject.index}`] || [];
    
    if (directors.length > 0) {
      directors.forEach((element, index) => {
        setFieldValue(`directorName${index}`, element.directorName);
      });
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
      title: "Director Name",
      dataIndex: "directorName",
      key: "directorName",
      type: "text",
      placeholder: "Director Name",
    },
  ];

  return (
    <Modal
      centered
      width={600}
      open={props.flagState}
      onCancel={() => props.setFlagState(false)}
      footer={null}
    >
      <Formik
        initialValues={innerInitialValues}
        onSubmit={handleInnerSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue, handleChange, handleBlur }) => {
          useEffect(() => {
            fillInitialValues(setFieldValue);
          }, []);

          const dataRows = useMemo(() => {
            const num = Number(values.NumberOfDirectors) || 0;
            if (num > 0) {
              return Array.from({ length: num }, (_, i) => ({
                key: `director.${i}`,
                owner: i + 1,
                stakeHolder: `director[${i}]`,
                directorName: values[`directorName${i}`] || "",
              }));
            }
            return [];
          }, [values.NumberOfDirectors, values]);

          return (
            <Form>
              <Modal.Header>
                <Modal.Title>Directors</Modal.Title>
              </Modal.Header>
              <Modal.Body className="px-4">
                <div className="d-flex justify-content-center align-items-center gap-4">
                  <p className="text-end mt-1 pt-2">
                    How many directors does the Corporate Trustee have:
                  </p>
                  <div style={{ minWidth: "20%" }}>
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
                        id="NumberOfDirectors"
                        name="NumberOfDirectors"
                        className="w-100 h-100"
                        placeholder="Select"
                        size="large"
                        value={values.NumberOfDirectors || undefined}
                        onChange={(value) => {
                          setFieldValue("NumberOfDirectors", value);
                        }}
                        onBlur={handleBlur}
                        getPopupContainer={(triggerNode) => triggerNode.parentNode}
                      >
                        {Array.from({ length: 4 }, (_, i) => (
                          <Option key={i} value={i + 1}>
                            {i + 1}
                          </Option>
                        ))}
                      </Select>
                    </ConfigProvider>
                  </div>
                </div>

                {values.NumberOfDirectors && (
                  <div className="mt-4">
                    <AntdTable
                      columns={columns}
                      data={dataRows}
                      values={values}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => props.setFlagState(false)}>
                  Close
                </Button>
                <Button type="primary" className="bgColor modalBtn" htmlType="submit">
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}

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
      return localStorage.getItem("UserName") + " & " + localStorage.getItem("PartnerName");
    }
    return "";
  });

  // Load existing data if available
  const existingData = props.modalObject.values?.[props.modalObject.key] || [];

  const initialValues = {
    NumberOfMap: existingData.length || "",
    tradingTrusts: existingData.length ? existingData : [],
  };

  const fillInitialValues = (setFieldValue) => {
    if (existingData.length) {
      setFieldValue("tradingTrusts", existingData);
    }
  };

   const onSubmit = async (values) => {
      const DataOf = props.modalObject.Input;
      const companyData = values.tradingTrusts || [];
  
      // Calculate total equity position
      const totalEquity = companyData.reduce(
        (sum, entry) => sum + parseFloat(entry.businessValuation?.replace(/[^0-9.-]+/g, "") || 0),
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

  const handleInnerModal = (innerModalTitle, key, stakeHolder, values, index) => {
    setModalObject({
      title: innerModalTitle,
      key,
      stakeHolder,
      values,
      index,
    });
    setInnerFlagState(true);
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
      width:200,
      placeholder: "Business Name",
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
      width:200,

    },
    {
      title: "Trustee Type",
      dataIndex: "trusteeType",
      key: "trusteeType",
      type: "select",
      options: [
        { value: "Corporate", label: "Corporate" },
        { value: "Individual", label: "Individual" },
      ],
      placeholder: "Trustee Type",
      customOnChange: (value, setFieldValue, values, fieldName, index) => {
        setFieldValue(fieldName, value);
        // Clear director data if trustee type is not Corporate
        if (value !== "Corporate") {
          setFieldValue(`tradingTrusts[${index}].NumberOfDirectors`, "");
          setFieldValue(`tradingTrusts[${index}].directorsNames`, []);
        }
      },
      renderSuffix: (record, index) => {
        if (record.trusteeType === "Corporate") {
          return (
            <Button 
              className="bgColor modalBtn border-0" 
              onClick={() => {
                handleInnerModal(
                  "Directors",
                  "directorsNames",
                  "trusteeType",
                  values,
                  index
                );
              }}
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </Button>
          );
        }
        return null;
      },
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
      width:200,
      customOnChange: (e, setFieldValue, values, fieldName) => {
        handleInputChange(e, setFieldValue, () => {}, values);
      },
      customOnFocus: (e, setFieldValue) => {
        handleInputFocus(e, setFieldValue);
      },
      customOnKeyDown: (e) => {
        handleInputKeyDown(e);
      },
      customOnBlur: (e, setFieldValue, values, fieldName) => {
        handleInputBlur(e, setFieldValue, toPercentage, () => {}, values);
      },
    },
    {
      title: "Distribution Received",
      dataIndex: "distributionReceived",
      key: "distributionReceived",
      type: "text",
      placeholder: "Distribution Received",
      width:200,

    },
    {
      title: "Business Valuation",
      dataIndex: "businessValuation",
      key: "businessValuation",
      type: "number-toComma",
      width:200,

      placeholder: "Business Valuation",
      customOnChange: (e, setFieldValue, values, fieldName) => {
        const value = toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, ""));
        setFieldValue(fieldName, value);
      },
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
              aBN: values.tradingTrusts?.[i]?.aBN || "",
              businessAddress: values.tradingTrusts?.[i]?.businessAddress || "",
              trusteeType: values.tradingTrusts?.[i]?.trusteeType || "",
              trusteeName: values.tradingTrusts?.[i]?.trusteeName || "",
              aNC: values.tradingTrusts?.[i]?.aNC || "",
              businessOwnership: values.tradingTrusts?.[i]?.businessOwnership || "",
              distributionReceived: values.tradingTrusts?.[i]?.distributionReceived || "",
              businessValuation: values.tradingTrusts?.[i]?.businessValuation || "",
              NumberOfDirectors: values.tradingTrusts?.[i]?.NumberOfDirectors || "",
              directorsNames: values.tradingTrusts?.[i]?.directorsNames || [],
            }));
          }
          return [];
        }, [values.NumberOfMap, values.tradingTrusts]);

        return (
          <Form>
            <InnerDirectors 
              setFieldValue={setFieldValue} 
              flagState={innerFlagState} 
              setFlagState={setInnerFlagState} 
              modalObject={modalObject} 
            />

            <div className="d-flex justify-content-center align-items-center gap-4">
              <p className="text-end mt-1 pt-2">
                How many {props.modalObject.title} does {nameSet} have:
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
                    {Array.from({ length: 10 }, (_, i) => (
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