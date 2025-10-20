<<<<<<< HEAD
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { BankDetail, defaultUrl } from '../../../../Store/Store';
import { toCommaAndDollar } from '../../../Assets/Api/Api';
import { Pagination } from 'antd';
import { SimpleSelectField } from './CreatableMultiSelectField';

const PortfolioValue = (props) => {


    let initialValues = props.modalObject.editArray.length ? { NumberOfMap: props.modalObject.editArray.length } : { NumberOfMap: "" };
    let bankDetailObj = useRecoilValue(BankDetail);

    let Platform = props.modalObject.Platform || [];


    // const options = [
    //     "Adelaide Bank",
    //     "Alliance Bank",
    //     "AMP",
    //     "ANZ",
    //     "Arab Bank Australia",
    //     "Australian Military Bank (ADCU)",
    //     "Australian Mutual Bank",
    //     "Australian Unity",
    //     "Auswide Bank",
    //     "AWA Alliance Bank",
    //     "Bank Australia (bankmecu)",
    //     "Bank First",
    //     "Bank of Melbourne",
    //     "Bank of Queensland (BOQ)",
    //     "Bank of Sydney",
    //     "BankSA",
    //     "BankVic",
    //     "Bankwest",
    //     "BCU",
    //     "BDCU Alliance Bank",
    //     "Bendigo Bank",
    //     "Beyond Bank",
    //     "Border Bank",
    //     "Circle Alliance Bank",
    //     "Citi",
    //     "Commonwealth Bank",
    //     "Community First Bank",
    //     "Credit Union SA",
    //     "Defence Bank",
    //     "Delphi Bank",
    //     "Easy Street",
    //     "First Choice Credit Union",
    //     "First Option Bank",
    //     "firstmac",
    //     "G&C Mutual",
    //     "Gateway Bank Ltd",
    //     "Geelong Bank",
    //     "Great Southern Bank",
    //     "Greater Bank",
    //     "Hay",
    //     "Heartland Bank",
    //     "Heritage Bank",
    //     "Horizon Bank",
    //     "HSBC Australia",
    //     "Hume Bank",
    //     "Illawarra Credit Union",
    //     "IMB",
    //     "ING",
    //     "Judo Bank",
    //     "Macquarie Bank",
    //     "ME",
    //     "MOVE Bank",
    //     "MyState Bank",
    //     "NAB",
    //     "Newcastle Permanent",
    //     "P&N Bank",
    //     "People’s Choice CU",
    //     "Policebank",
    //     "Prospa",
    //     "Qudos Bank",
    //     "Rabobank",
    //     "RACQ",
    //     "RAMS",
    //     "Regional Australia Bank",
    //     "Rural Bank",
    //     "Service One Alliance Bank",
    //     "St.George",
    //     "Suncorp Bank",
    //     "Teachers Mutual Bank",
    //     "Ubank",
    //     "UniBank",
    //     "Up Bank",
    //     "Virgin Money",
    //     "Westpac",
    //     "Zeller"
    // ];

    const [dynamicFields, setDynamicFields] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const fillInitialValues = (setFieldValue) => {



        let arr = []

        for (let index = 0; index < props.modalObject.editArray.length; index++) {

            arr.push("")

        }

        setDynamicFields(arr)

        if (props.modalObject.editArray.length > 0) {
            setFieldValue(`NumberOfMap`, props.modalObject.editArray.length || '');

            // console.log(props.modalObject.editArray)
            // return

            props.modalObject.editArray.forEach((data, i) => {
                if (data) {
                    console.log(data.investmentOption)
                    setFieldValue(`investmentOption${i}`, data.investmentOption || '');
                    setFieldValue(`investmentCode${i}`, data.investmentCode || '');
                    setFieldValue(`investmentValue${i}`, data.investmentValue || '');
                }
            });
        }
    };

    let handleInput = (e, setFieldValue) => {
        const value = e.target.value > 50 ? 50 : e.target.value;
        setFieldValue(e.target.id, value);

        let arr = []

        for (let index = 0; index < value; index++) {

            arr.push("")

        }

        setDynamicFields(arr)


        // generateFields(value);
    };

    let DefaultUrl = useRecoilValue(defaultUrl)

    let onSubmit = async (values) => {

        console.log(values)

        const newEntries = [];

        let loopLength = parseFloat(values.NumberOfMap)

        // Iterate through each map entry and create a new object
        for (let i = 0; i < loopLength; i++) {
            // alert("loop chala")
            const newEntry = {
                investmentOption: values[`investmentOption${i}`] || "",
                investmentCode: values[`investmentCode${i}`] || "",
                investmentValue: values[`investmentValue${i}`] || "",
            };
            newEntries.push(newEntry);
        }

        // Log the new entries to verify
        console.log(newEntries);

        let total = newEntries.reduce((total, entry) => total + parseFloat((entry.investmentValue).replace(/[^0-9.-]+/g, "")), 0);


        props.setFieldValue(`${props.modalObject.key}${props.modalObject.index}`, newEntries)
        // props.setFieldValue(`${props.modalObject.key3}${props.modalObject.index}`, toCommaAndDollar(total))
        // props.setFieldValue(`${props.modalObject.mainKey}${props.modalObject.index}`, toCommaAndDollar(total - 475721))
        props.setFieldValue(`${props.modalObject.mainKey}${props.modalObject.index}`, toCommaAndDollar(total))

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }
    };

    const generateOptions = (platformName) => {
        const InstituteOptions = [];

        console.log(Platform, Platform._id === platformName, "===|platfrom|===", platformName)
        // Ensure the platform is an object and has an arrayOfOffers
        if (Platform && Platform._id === platformName) {
            // Check if arrayOfOffers is an array and has elements
            if (Array.isArray(Platform.arrayOfOffers) && Platform.arrayOfOffers.length > 0) {
                // Iterate over arrayOfOffers to create options
                Platform.arrayOfOffers.forEach((offerElem) => {
                    InstituteOptions.push({
                        value: offerElem._id,
                        label: `${offerElem.investmentName} (${offerElem.investmentCode})`,
                    });
                });
            }
        }

        return InstituteOptions;
    };

    const getCodeForOption = (SelectedOffer, platformName) => {
        let code = "";

        // Ensure Platform is an object and matches the provided platformName
        if (Platform && Platform._id === platformName) {
            // Check if arrayOfOffers is an array and has elements
            if (Array.isArray(Platform.arrayOfOffers) && Platform.arrayOfOffers.length > 0) {
                // Iterate over arrayOfOffers to find the selected offer
                Platform.arrayOfOffers.forEach((offerElem) => {
                    if (SelectedOffer === offerElem._id) {
                        code = offerElem.investmentCode;
                    }
                });
            }
        }

        return code;
    };


    const renderRows = (currentPage, setFieldValue, values, handleChange) => {
        const pageSize = 10;
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        return dynamicFields.map((_, i) => {
            if (i >= startIndex && i < endIndex) {
                return (
                    <tr key={i}>
                        <td>{1 + i}</td>
                        <td>

                            <Field
                                name={`investmentOption${i}`}
                                component={SimpleSelectField}
                                label="Multi Select Field"
                                options={generateOptions(props.modalObject.values[`platformName${props.modalObject.index}`])}
                                onChange={(selectedOption) => {

                                    const code = getCodeForOption(selectedOption.value, props.modalObject.values[`platformName${props.modalObject.index}`]);
                                    // Custom function on change
                                    console.log(`Selected option: ${selectedOption.value}`, "code is :", code);
                                    // Run additional logic or actions

                                    setFieldValue(`investmentOption${i}`, selectedOption.value)

                                    setFieldValue(`investmentCode${i}`, code)

                                }}
                            />

                        </td>
                        <td style={{ width: "150px" }}>
                            <Field
                                type="text"
                                placeholder="Investment Code"
                                id={`investmentCode${i}`}
                                name={`investmentCode${i}`}
                                className="form-control inputDesignDoubleInput"
                                disabled
                            />
                        </td>
                        <td style={{ width: "150px" }}>
                            <Field
                                type="text"
                                placeholder="Investment Value"
                                id={`investmentValue${i}`}
                                name={`investmentValue${i}`}
                                className="form-control inputDesignDoubleInput"
                                onChange={(e) => {
                                    setFieldValue(e.target.name,
                                        toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                }}
                            />
                        </td>
                    </tr>
                );
            }
            return null;
        });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            innerRef={props.formRef}
        >
            {({ values, handleChange, setFieldValue }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, []);

                return (
                    <Form>
                        <Row>
                            <div className="col-md-12">
                                <div className='row justify-content-center'>
                                    <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                        <p className='text-end mt-3'>
                                            {props.modalObject.question}
                                        </p>
                                        <div style={{ width: "15%" }}>
                                            <Field
                                                type="number"
                                                id="NumberOfMap"
                                                name="NumberOfMap"
                                                className="form-control inputDesignDoubleInput"
                                                onChange={(e) => handleInput(e, setFieldValue)}
                                            />
                                        </div>
                                    </div>

                                    {values.NumberOfMap && (
                                        <div className='mt-4'>
                                            <Table striped bordered responsive hover>
                                                <thead>
                                                    <tr>
                                                        <th>No#</th>
                                                        <th>Investment Option</th>
                                                        <th>Investment Code</th>
                                                        <th>Investment Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {renderRows(currentPage, setFieldValue, values, handleChange)}
                                                </tbody>
                                            </Table>

                                            {dynamicFields.length >= 10 && (
                                                <div className='w-100 CustomPaginantion d-flex justify-content-center'>
                                                    <Pagination
                                                        align="start"
                                                        defaultCurrent={1}
                                                        current={currentPage}
                                                        total={dynamicFields.length}
                                                        pageSize={pageSize}
                                                        onChange={handlePageChange}
                                                        showSizeChanger={false} // Optional, you can allow page size change if needed
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
=======
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
                        data={allRows}
                        values={values}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        pagination={true}
                        handleSubmit={props?.handleOk}
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
>>>>>>> origin/master
};

export default PortfolioValue;
