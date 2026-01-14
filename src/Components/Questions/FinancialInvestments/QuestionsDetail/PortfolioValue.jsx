import { Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { Row } from "react-bootstrap";
import { ConfigProvider, Select } from "antd";
import { toCommaAndDollar } from "../../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const PortfolioValue = (props) => {
  const Platform = props.modalObject.Platform || {};
  const initialEditArray = props.modalObject.editArray || [];

  const initialValues = {
    NumberOfMap: initialEditArray.length || "",
    investments: initialEditArray.length ? initialEditArray : [],
  };

  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
    if (initialEditArray.length) {
      setDynamicFields(Array(initialEditArray.length).fill(""));
    } else {
      props.setIsEditing(true);
    }
  }, [initialEditArray]);

  // Create dynamic options for a given platform
  const generateOptions = () => {
    const options = [];
    if (Platform && Array.isArray(Platform.arrayOfOffers)) {
      Platform.arrayOfOffers.forEach((offer) => {
        options.push({
          value: offer._id,
          label: `${offer.investmentName} (${offer.investmentCode})`,
        });
      });
    }
    return options;
  };

  // Find code for selected option
  const getCodeForOption = (SelectedOffer) => {
    let code = "";
    if (Platform) {
      const offer = Platform.arrayOfOffers?.find(
        (offer) => offer._id === SelectedOffer
      );
      if (offer) code = offer.investmentCode;
    }
    return code;
  };

  const OnInvestmentOptionSelect = (
    values,
    setFieldValue,
    currentName,
    stakeHolder
  ) => {
    const code = getCodeForOption(currentName.value);
    setFieldValue(stakeHolder + "investmentCode", code || "");
  };

  const onSubmit = async (values) => {
    const count = Number(values.NumberOfMap) || values.investments?.length || 0;

    const newEntries = Array.isArray(values.investments)
      ? values.investments.slice(0, count)
      : [];

    const total = newEntries.reduce(
      (total, entry) =>
        total +
        parseFloat(entry.investmentValue?.replace(/[^0-9.-]+/g, "") || 0),
      0
    );

    props.setFieldValue(
      `${props.modalObject.stakeHolder || ""}${props.modalObject.key}Array`,
      newEntries
    );
    props.setFieldValue(
      `${props.modalObject.stakeHolder || ""}${props.modalObject.key}`,
      toCommaAndDollar(total)
    );

    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  // Define columns for Antd Table
  const columns = [
    {
      title: "No#",
      dataIndex: "owner",
      key: "owner",
      width: 60,
    },
    {
      title: "Investment Option",
      dataIndex: "investmentOption",
      key: "investmentOption",
      type: "select-antd",
      selectedOptionValue: true,
      options: generateOptions(),
      func: OnInvestmentOptionSelect,
    },
    {
      title: "Investment Code",
      dataIndex: "investmentCode",
      key: "investmentCode",
      type: "text",
      disabled: true,
      placeholder: "Investment Code",
    },
    {
      title: "Investment Value",
      dataIndex: "investmentValue",
      key: "investmentValue",
      type: "number-toComma",
      placeholder: "Investment Value",
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleBlur, handleChange }) => {
        const allRows = useMemo(() => {
          const num = Number(values.NumberOfMap) || 0;
          return Array.from({ length: num }, (_, i) => ({
            key: `investment.${i}`,
            owner: i + 1,
            stakeHolder: `investments[${i}]`,
            investmentOption: values.investments?.[i]?.investmentOption || "",
            investmentCode: values.investments?.[i]?.investmentCode || "",
            investmentValue: values.investments?.[i]?.investmentValue || "",
          }));
        }, [values.NumberOfMap, values.investments]);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                    <p className="text-end mt-3">
                      {props?.modalObject?.question || "Number of Platforms :"}
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
                          disabled={!props?.isEditing}
                          size="large"
                          value={values.NumberOfMap || undefined}
                          onChange={(value) => {
                            setFieldValue("NumberOfMap", value);
                          }}
                          onBlur={handleBlur}
                          getPopupContainer={(triggerNode) =>
                            triggerNode.parentNode
                          }
                        >
                          {Array.from({ length: 50 }, (_, i) => (
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
                        data={allRows}
                        values={values}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        pagination={true}
                        handleSubmit={props?.handleOk}
                        isEditing={props?.isEditing}
                        setIsEditing={props?.setIsEditing}
                        deleteButton={true}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PortfolioValue;
