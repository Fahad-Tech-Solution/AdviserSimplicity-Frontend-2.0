import { Field, Form, Formik } from "formik";
<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { toCommaAndDollar } from "../../../Assets/Api/Api";
import { BankDetail } from "../../../../Store/Store";
import { useRecoilValue } from "recoil";

const BankTermForm = (props) => {
  let bankDetailObj = useRecoilValue(BankDetail);
  const [title, setTitle] = useState(() => {
    // let head = props.modalObject.title;
    let currentTitle = props.modalObject.title;

    // Check if the title contains an underscore
    if (currentTitle.includes("_")) {
      currentTitle = currentTitle.split("_").slice(1)[0];
    }

    return currentTitle;
  });

  let [nameSet] = useState(() => {
=======
import React, { useEffect, useState, useMemo } from "react";
import { useRecoilValue } from "recoil";
import {
  BankDetail,
  defaultUrl,
  QuestionDetail,
} from "../../../../Store/Store";
import {
  PostAxios,
  PatchAxios,
  toCommaAndDollar,
  openNotificationSuccess,
} from "../../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";
import { ConfigProvider, Select } from "antd";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const BankTermForm = (props) => {
  const bankDetailObj = useRecoilValue(BankDetail);

  const [nameSet] = useState(() => {
>>>>>>> origin/master
    if (props.modalObject.Input === "client") {
      return localStorage.getItem("UserName");
    } else if (props.modalObject.Input === "partner") {
      return localStorage.getItem("PartnerName");
    } else if (props.modalObject.Input === "joint") {
      return (
        localStorage.getItem("UserName") +
        " & " +
        localStorage.getItem("PartnerName")
      );
    }
<<<<<<< HEAD
  });

  let initialValues = { NumberOfMap: "" };

  const fillInitialValues = (setFieldValue) => {
    if (
      props.modalObject.values[props.modalObject.Input] &&
      props.modalObject.values[props.modalObject.Input].length > 0
    ) {
      setFieldValue(
        `NumberOfMap`,
        props.modalObject.values[props.modalObject.Input].length || ""
      );
      props.modalObject.values[props.modalObject.Input].forEach((data, i) => {
        if (data) {
          setFieldValue(`Institution${i}`, data.Institution || "");
          setFieldValue(`accountNumber${i}`, data.accountNumber || "");
          setFieldValue(`currentBalance${i}`, data.currentBalance || "");
        }
      });
    }
  };

  let handleInput = (e, setFieldValue) => {
    let value = 0;
    if (
      title === "SMSF Bank Accounts Detail" ||
      title === "Family Trust Bank Accounts Detail"
    ) {
      value = e.target.value > 5 ? 5 : e.target.value;
    } else {
      value = e.target.value > 10 ? 10 : e.target.value;
    }

    setFieldValue(e.target.id, value);
  };

  let onSubmit = async (values) => {
    // Extract the number of maps from the values
    const numberOfMaps = parseInt(values.NumberOfMap, 10);
    const newEntries = [];

    // Iterate through each map entry and create a new object
    for (let i = 0; i < numberOfMaps; i++) {
      const newEntry = {
        Institution: values[`Institution${i}`] || "",
        accountNumber: values[`accountNumber${i}`] || "",
        currentBalance: values[`currentBalance${i}`] || "",
      };
      newEntries.push(newEntry);
    }

    let DataOf = props.modalObject.Input;

    props.setFieldValue(DataOf, newEntries);

    let total = newEntries.reduce(
      (total, entry) =>
        total + parseFloat(entry.currentBalance.replace(/[^0-9.-]+/g, "")),
      0
    );

    props.setFieldValue(DataOf + "CurrentBalance", toCommaAndDollar(total));

    props.modalObject.setShowError((prevState) => ({
      ...prevState,
      [`${DataOf + "CurrentBalance"}Error`]: false,
      [`${DataOf + "CurrentBalance"}Message`]: "",
    }));

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
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
                <div className="row justify-content-center">
                  <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                    <p className="text-end mt-3">
                      How many {title} does {nameSet} have :
                    </p>

                    <div className="w-25">
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
                    <div className="mt-4">
                      <Table striped bordered responsive hover>
                        <thead>
                          <tr>
                            <th>No#</th>
                            <th>Name of Institution</th>
                            <th>Account number</th>
                            <th>Current Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: values.NumberOfMap }).map(
                            (_, i) => (
                              <tr key={i}>
                                <td>{1 + i}</td>
                                <td style={{ width: "20rem" }}>
                                  <Field
                                    as="select"
                                    placeholder="Name of Institution"
                                    id={`Institution${i}`}
                                    name={`Institution${i}`}
                                    className="form-select inputDesignDoubleInput"
                                  >
                                    <option value={""}>Please Select</option>
                                    {bankDetailObj?.FinancialInstitutions
                                      ?.length > 0 &&
                                      bankDetailObj.FinancialInstitutions.map(
                                        (elem, index) => {
                                          if (!elem?._id || !elem?.platformName)
                                            return null;
                                          return (
                                            <option
                                              key={index}
                                              value={elem._id}
                                            >
                                              {elem.platformName}
                                            </option>
                                          );
                                        }
                                      )}
                                  </Field>
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Account number"
                                    id={`accountNumber${i}`}
                                    name={`accountNumber${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Current Balance"
                                    id={`currentBalance${i}`}
                                    name={`currentBalance${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(
                                        e.target.name,
                                        toCommaAndDollar(
                                          e.target.value.replace(
                                            /[^0-9.-]+/g,
                                            ""
                                          )
                                        )
                                      );
                                    }}
                                  />
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </div>
              </div>
            </Row>
=======
    return "";
  });

  // Title cleanup
  const [title] = useState(() => {
    let currentTitle = props.modalObject.title;
    if (currentTitle.includes("_")) {
      currentTitle = currentTitle.split("_").slice(1).join("_");
    }
    return currentTitle;
  });

  // Extract previous data (if any)
  const existingData =
    props.modalObject.values?.[
      props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "")
    ]?.[props.modalObject.Input + "Array"] || [];

  // Initial Formik values
  const initialValues = {
    NumberOfMap: existingData.length || "",
    bankAccounts: existingData.length ? existingData : [],
  };

  // Generate Financial Institution options
  const [institutionOptions, setInstitutionOptions] = useState(() => {
    if (!bankDetailObj?.FinancialInstitutions) return [];
    return bankDetailObj.FinancialInstitutions.map((elem) => ({
      value: elem._id,
      label: elem.platformName,
    }));
  });

  const fillInitialValues = (setFieldValue) => {
    if (existingData.length) {
      setFieldValue("NumberOfMap", existingData.length);
      setFieldValue("bankAccounts", existingData);
    }
  };

  const onSubmit = async (values) => {
    const bankData = values.bankAccounts;
    const DataOf = props.modalObject.Input;

    // Compute total balance
    const totalBalance = bankData.reduce(
      (total, entry) =>
        total +
        parseFloat(
          (entry?.currentBalance || "$0")?.replace(/[^0-9.-]+/g, "") || 0
        ),
      0
    );

    // Update parent form values
    props.setFieldValue(
      props.modalObject.stakeHolder + DataOf + "Array",
      bankData
    );

    props.setFieldValue(
      props.modalObject.stakeHolder + "currentBalance",
      toCommaAndDollar(totalBalance)
    );

    // Reset errors
    props.modalObject.setShowError?.((prev) => ({
      ...prev,
      [`${DataOf + "currentBalance"}Error`]: false,
      [`${DataOf + "currentBalance"}Message`]: "",
    }));

    if (props.flagState) props.setFlagState(false);
  };

  // Define table columns
  const columns = [
    {
      title: "No#",
      dataIndex: "owner",
      key: "owner",
      width: 60,
    },
    {
      title: "Name of Institution",
      dataIndex: "Institution",
      key: "Institution",
      type: "select",
      options: institutionOptions,
      placeholder: "Select Institution",
      selectedOptionValue: true,
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
      type: "text",
      placeholder: "Account Number",
    },
    {
      title: "Current Balance",
      dataIndex: "currentBalance",
      key: "currentBalance",
      type: "number-toComma",
      placeholder: "Current Balance",
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
          const num = Number(values.NumberOfMap) || 0;
          if (num > 0) {
            return Array.from({ length: num }, (_, i) => ({
              key: `bankAccount.${i}`,
              owner: i + 1,
              stakeHolder: `bankAccounts[${i}]`,
              Institution: values.bankAccounts?.[i]?.Institution || "",
              accountNumber: values.bankAccounts?.[i]?.accountNumber || "",
              currentBalance: values.bankAccounts?.[i]?.currentBalance || "",
            }));
          }
          return [];
        }, [values.NumberOfMap, values.bankAccounts]);

        return (
          <Form>
            <div className="d-flex justify-content-center align-items-center gap-4">
              <p
                className="text-end mt-1 pt-2"
                onClick={() => {
                  console.log(props.modalObject.values);
                }}
              >
                How many {title} does {nameSet} have :
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
                  <Field name="NumberOfMap">
                    {({ field, form }) => (
                      <Select
                        id="NumberOfMap"
                        className="w-100 h-100"
                        placeholder="Select"
                        size="large"
                        value={field.value || undefined}
                        onChange={(value) =>
                          form.setFieldValue(field.name, value)
                        }
                        onBlur={() => form.setFieldTouched(field.name, true)}
                        getPopupContainer={(triggerNode) =>
                          triggerNode.parentNode
                        }
                      >
                        {Array.from(
                          { length: props?.modalObject?.pageLimit || 10 },
                          (_, i) => (
                            <Option key={i} value={i + 1}>
                              {i + 1}
                            </Option>
                          )
                        )}
                      </Select>
                    )}
                  </Field>
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
                  handleSubmit={props?.handleOk}
                />
              </div>
            )}

            <button type="submit" style={{ display: "none" }}>
              Submit
            </button>
>>>>>>> origin/master
          </Form>
        );
      }}
    </Formik>
  );
};

export default BankTermForm;
