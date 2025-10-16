import { Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { BankDetail, defaultUrl } from "../../../../Store/Store";
import { toCommaAndDollar } from "../../../Assets/Api/Api";
import { ConfigProvider, Pagination, Select } from "antd";
import { SimpleSelectField } from "./CreatableMultiSelectField";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const ServiceFee = (props) => {
  const Platform = props.modalObject.Platform || {};
  const initialEditArray = props.modalObject.editArray || [];

  const initialValues = {
    NumberOfMap: initialEditArray.length || "",
    investments: initialEditArray.length ? initialEditArray : [],
  };

  const [dynamicFields, setDynamicFields] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    if (initialEditArray.length) {
      setDynamicFields(Array(initialEditArray.length).fill(""));
    }
  }, [initialEditArray]);



  const handleInput = (e, setFieldValue) => {
    const value = e.target.value > 50 ? 50 : e.target.value;
    setFieldValue("NumberOfMap", value);
    setDynamicFields(Array(Number(value)).fill(""));
    setFieldValue(
      "investments",
      Array(Number(value))
        .fill()
        .map((_, i) => ({
          investmentOption: "",
          investmentCode: "",
          investmentValue: "",
          ...(initialValues.investments[i] || {}),
        }))
    );
  };

  // Create dynamic options for a given platform
  const generateOptions = () => {
    const options = [];
    if (Platform) {
      if (Array.isArray(Platform.arrayOfOffers)) {
        Platform.arrayOfOffers.forEach((offer) => {
          options.push({
            value: offer._id,
            label: `${offer.investmentName} (${offer.investmentCode})`,
          });
        });
      }
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

  let OnInvestmentOptionSelect = (
    values,
    setFieldValue,
    currentName,
    stakeHolder
  ) => {
    let code = getCodeForOption(currentName.value);
    setFieldValue(stakeHolder + "investmentCode", code || "");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onSubmit = async (values) => {
    const newEntries = values.investments;
    const total = newEntries.reduce(
      (total, entry) =>
        total +
        parseFloat(entry.investmentValue?.replace(/[^0-9.-]+/g, "") || 0),
      0
    );

    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}Array`,
      newEntries
    );
    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}`,
      toCommaAndDollar(total)
    );

    if (props.flagState) props.setFlagState(false);
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
      {({ values, setFieldValue, handleBlur }) => {
        useEffect(() => {
          //   fillInitialValues(setFieldValue);
        }, []);

        // Pagination logic — filter only visible rows for Ant Table
        const paginatedRows = useMemo(() => {
          const num = Number(initialValues.NumberOfMap) || 0;
          if (!values?.investments) return [];
          const start = (currentPage - 1) * pageSize;
          const end = start + pageSize;
          return values.investments.slice(start, end).map((inv, i) => ({
            key: `investment.${start + i}`, // ensures unique keys
            owner: start + i + 1, // ✅ keeps numbering continuous across pages
            stakeHolder: `investments[${start + i}]`,
            investmentOption: inv.investmentOption || "",
            investmentCode: inv.investmentCode || "",
            investmentValue: inv.investmentValue || "",
          }));
        }, [currentPage, values?.investments]);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                    <p className="text-end mt-3">
                      {props?.modalObject?.question || "Question"}
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
                            // Create a synthetic event to reuse handleInput logic
                            handleInput({ target: { value } }, setFieldValue);
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
                        data={paginatedRows}
                        values={values}
                        setFieldValue={setFieldValue}
                      />

                      {dynamicFields.length >= 10 && (
                        <div className="w-100 CustomPaginantion d-flex justify-content-center mt-3">
                          <Pagination
                            align="start"
                            defaultCurrent={1}
                            current={currentPage}
                            total={dynamicFields.length}
                            pageSize={pageSize}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                          />
                        </div>
                      )}
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

export default ServiceFee;
