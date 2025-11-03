import { Field, Form, Formik } from "formik";
import React, { useEffect, useState, useMemo } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import DatePicker from "react-datepicker";
import { RenderName, toCommaAndDollar } from "../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const AntDTableHOC = DynamicTableForInputsSection("antd");
const AccumulationBenefits = (props) => {
  console.log(props, "modalObject in AccumulationBenefits");
  let questionDetail = useRecoilValue(QuestionDetail);

  let initialValues = {
    commencementDate: "",
    eligibleServiceDate: "",
    taxFreeComponent: "",
    currentBalance: "",
    taxableComponent: "",
    restrictedNonPreserved: "",
    unRestrictedNonPreserved: "",
    preservedAmount: "",
  };

  const options = ["Restricted non preserved", "Unrestricted non preserved"];

  const fillInitialValues = (setFieldValue) => {
    let BaseKey = props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "");
    let data =
      props.modalObject.values?.[BaseKey]?.[
        props.modalObject.key + "array"
      ] || {};

    console.log(
      props.modalObject.values,
      BaseKey,
      props.modalObject.key,
      data,
      "data here"
    );

    if (Object.keys(data).length > 0) {
      setFieldValue(`commencementDate`, data.commencementDate || "");
      setFieldValue(`eligibleServiceDate`, data.eligibleServiceDate || "");
      setFieldValue(`taxFreeComponent`, data.taxFreeComponent || "");
      setFieldValue(`taxableComponent`, data.taxableComponent || "");
      setFieldValue(`currentBalance`, data.currentBalance || "");
      setFieldValue(
        `restrictedNonPreserved`,
        data.restrictedNonPreserved || ""
      );
      setFieldValue(
        `unRestrictedNonPreserved`,
        data.unRestrictedNonPreserved || ""
      );
      setFieldValue(`preservedAmount`, data.preservedAmount || "");
    }
  };

  let onSubmit = async (values) => {
    console.log(values);

    const newEntry = {
      commencementDate: values[`commencementDate`] || "",
      eligibleServiceDate: values[`eligibleServiceDate`] || "",
      taxFreeComponent: values[`taxFreeComponent`] || "",
      taxableComponent: values[`taxableComponent`] || "",
      restrictedNonPreserved: values[`restrictedNonPreserved`] || "",
      unRestrictedNonPreserved: values[`unRestrictedNonPreserved`] || "",
      preservedAmount: values[`preservedAmount`] || "",
      currentBalance: values[`currentBalance`] || "",
    };

    // // Log the new entries to verify
    console.log(
      "newEntry: ",
      newEntry,
      `${props.modalObject.stakeHolder}${props.modalObject.key}`
    );

    let total = newEntry.taxFreeComponent;

    // alert(values.taxFreeComponent);
console.log(`${props.modalObject.stakeHolder}${props.modalObject.key}array`,"xyz")
    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}array`,
      newEntry
    );
    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}`,
      total
    );
    // alert(`${props.modalObject.mainKey}${props.modalObject.index}`)
    // props.setFieldValue(
    //   `${props.modalObject.mainKey}${props.modalObject.index}`,
    //   values.taxFreeComponent
    // );

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
    }
  };

  function FormulaSetting(values, setFieldValue, currentInput) {
    try {
      // Extract and sanitize values
      let taxFreeComponent =
        parseFloat(values[`taxFreeComponent`]?.replace(/[^0-9.-]+/g, "")) || 0;
      let currentBalance =
        parseFloat(values[`currentBalance`]?.replace(/[^0-9.-]+/g, "")) || 0;
      let restrictedNonPreserved =
        parseFloat(
          values[`restrictedNonPreserved`]?.replace(/[^0-9.-]+/g, "")
        ) || 0;
      let unRestrictedNonPreserved =
        parseFloat(
          values[`unRestrictedNonPreserved`]?.replace(/[^0-9.-]+/g, "")
        ) || 0;
      let taxableComponent = 0;
      let preservedAmount = 0;
      let collection = "";

      // Handle input changes for specific fields
      switch (currentInput?.name) {
        case "taxFreeComponent":
          taxFreeComponent =
            parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
          collection = "A";
          break;
        case "currentBalance":
          currentBalance =
            parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
          collection = "A";
          break;
        case "restrictedNonPreserved":
          restrictedNonPreserved =
            parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
          collection = "B";
          break;
        case "unRestrictedNonPreserved":
          unRestrictedNonPreserved =
            parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
          collection = "B";
          break;
        default:
          console.error("No valid input selected");
          break;
      }

      // Calculate taxableComponent
      taxableComponent = currentBalance - taxFreeComponent;
      if (isNaN(taxableComponent))
        throw new Error("Invalid taxable component calculation");

      // Update the 'taxableComponent' field value
      setFieldValue("taxableComponent", toCommaAndDollar(taxableComponent));

      // Calculate preservedAmount
      preservedAmount =
        currentBalance - restrictedNonPreserved - unRestrictedNonPreserved;
      if (isNaN(preservedAmount))
        throw new Error("Invalid preserved amount calculation");

      // Update the 'preservedAmount' field value
      setFieldValue("preservedAmount", toCommaAndDollar(preservedAmount));
    } catch (error) {
      console.error("Error in FormulaSetting:", error.message);
    }
  }

  const calculateBalanceComponents = (values, setFieldValue, thisInput) => {
    // 🧹 Helper: safely clean numeric input
    const cleanNumber = (val) => {
      if (val === undefined || val === null) return 0;
      if (typeof val === "number") return val;
      const cleaned = String(val).replace(/[^0-9.-]+/g, "");
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 0 : parsed;
    };

    // 🧾 Extract current numeric values from Formik
    let currentBalance = cleanNumber(values?.currentBalance);
    let taxFreeComponent = cleanNumber(values?.taxFreeComponent);
    let restrictedNonPreserved = cleanNumber(values?.restrictedNonPreserved);
    let unRestrictedNonPreserved = cleanNumber(
      values?.unRestrictedNonPreserved
    );

    // 🛠 Handle live edits (update the field user is typing in)
    switch (thisInput.name) {
      case "currentBalance":
        currentBalance = cleanNumber(thisInput.value);
        break;
      case "taxFreeComponent":
        taxFreeComponent = cleanNumber(thisInput.value);
        break;
      case "restrictedNonPreserved":
        restrictedNonPreserved = cleanNumber(thisInput.value);
        break;
      case "unRestrictedNonPreserved":
        unRestrictedNonPreserved = cleanNumber(thisInput.value);
        break;
      default:
        break;
    }

    // 💰 Calculate values
    const taxableComponent = currentBalance - taxFreeComponent;
    const preservedAmount =
      currentBalance - (restrictedNonPreserved + unRestrictedNonPreserved);

    // ✅ Update Formik fields
    // setFieldValue("taxableComponent", toCommaAndDollar(taxableComponent >= 0 ? taxableComponent : 0));
    setFieldValue("taxableComponent", toCommaAndDollar(taxableComponent));
    setFieldValue("preservedAmount", toCommaAndDollar(preservedAmount));
  };

  const columns = [
    {
      title: "Member",
      dataIndex: "owner",
      key: "owner",
      type: "text", // simple static text or could be DynamicFormField if editable
      placeholder: "Enter Owner Name",
      width: 150,
    },
    {
      title: "Commencement Date",
      dataIndex: "commencementDate",
      key: "commencementDate",
      type: "antdate", // simple static text or could be DynamicFormField if editable
      // options: lenderOption,
      width: 150,
      selectedOptionValue: true,
    },
    {
      title: "Eligible Service Date",
      dataIndex: "eligibleServiceDate",
      key: "eligibleServiceDate",
      type: "antdate",
      placeholder: "Loan Balance",
      width: 200,
    },
    {
      title: "Tax Free Component",
      dataIndex: "taxFreeComponent",
      key: "taxFreeComponent",
      type: "number-toComma", // simple static text or could be DynamicFormField if editable
      placeholder: "Tax Free Component",
      
      width: 150,
      callBack: true,

      func: calculateBalanceComponents,
    },
    {
      title: "Current Balance",
      dataIndex: "currentBalance",
      key: "currentBalance",
      type: "number-toComma",
      placeholder: "Repayments Amount",
      //   width: 200,
      callBack: true,
      func: calculateBalanceComponents,
    },
    {
      title: "Taxable Component",
      dataIndex: "taxableComponent",
      key: "taxableComponent",
      type: "number-toComma",
      placeholder: "Taxable Component",

      disabled: true,
    },
    {
      title: "Restricted non Preserved",
      dataIndex: "restrictedNonPreserved",
      key: "restrictedNonPreserved",
      type: "number-toComma", // simple static text or could be DynamicFormField if editable
      placeholder: "Restricted non Preserved",
      width: 150,
      callBack: true,
      func: calculateBalanceComponents,
    },
    {
      title: "Unrestricted non Preserved",
      dataIndex: "unRestrictedNonPreserved",
      key: "unRestrictedNonPreserved",
      type: "number-toComma",
      placeholder: "Unrestricted non Preserved",
      width: 200,
      callBack: true,
      func: calculateBalanceComponents,
    },
    {
      title: "Preserved Amount",
      dataIndex: "preservedAmount",
      key: "preservedAmount",
      type: "number-toComma", // simple static text or could be DynamicFormField if editable
      placeholder: "Preserved Amount",
      width: 150,
      disabled: true,
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
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);
        const tableData = useMemo(() => {
          const rows = [];

          rows.push({
            key: "Data1",
            owner: RenderName(props.modalObject.stakeHolder.replace(".", "")),
            ...values,
          });

          return rows;
        }, [values]);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="mt-4">
                    <div className="mt-4 All_Client reportSection">
                      <AntDTableHOC
                        columns={columns}
                        data={tableData}
                        values={values}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        isEditing={props?.isEditing}
                        setIsEditing={props?.setIsEditing}
                      />
                    </div>
                    {/* <Table striped bordered responsive hover>
                      <thead>
                        <tr>
                          <th>Member</th>
                          <th>Commencement Date</th>
                          <th>Eligible Service Date</th>
                          <th>Tax Free component </th>
                          <th>Current Balance</th>
                          <th>Taxable component </th>
                          <th>Restricted non preserved</th>
                          <th>Unrestricted non preserved</th>
                          <th>Preserved amount</th>
                        </tr>
                      </thead>
                      <tbody>

                        <tr>
                          <td>{RenderName(props.modalObject.values[`member`][props.modalObject.index])}</td>
                          <td style={{ minWidth: "10rem" }}>
                            <DatePicker
                              className="form-control inputDesignDoubleInput shadow DateInputPadding"
                              showIcon
                              id={`commencementDate`}
                              name={`commencementDate`}
                              selected={values[`commencementDate`]}
                              onChange={(date) =>
                                setFieldValue(
                                  `commencementDate`,
                                  date
                                )
                              }
                              dateFormat="dd/MM/yyyy"
                              placeholderText="dd/mm/yyyy"
                              maxDate={new Date()}
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              onBlur={handleBlur}
                              wrapperClassName="w-100"
                            />
                          </td>
                          <td style={{ minWidth: "10rem" }}>
                            {" "}
                            <DatePicker
                              className="form-control inputDesignDoubleInput shadow DateInputPadding"
                              showIcon
                              id={`eligibleServiceDate`}
                              name={`eligibleServiceDate`}
                              selected={values[`eligibleServiceDate`]}
                              onChange={(date) =>
                                setFieldValue(
                                  `eligibleServiceDate`,
                                  date
                                )
                              }
                              dateFormat="dd/MM/yyyy"
                              placeholderText="dd/mm/yyyy"
                              maxDate={new Date()}
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              onBlur={handleBlur}
                              wrapperClassName="w-100"
                            />
                          </td>
                          <td>
                            <Field
                              type="text"
                              placeholder="Tax Free component"
                              id={`taxFreeComponent`}
                              name={`taxFreeComponent`}
                              className="form-control inputDesignDoubleInput"
                              onChange={(e) => {
                                setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                FormulaSetting(values, setFieldValue, e.target);
                              }}
                            />
                          </td>
                          <td>
                            <Field
                              type="text"
                              placeholder="Current Balance"
                              id={`currentBalance`}
                              name={`currentBalance`}
                              className="form-control inputDesignDoubleInput"
                              onChange={(e) => {
                                setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                FormulaSetting(values, setFieldValue, e.target);
                              }}
                            />
                          </td>
                          <td>
                            <Field
                              type="text"
                              placeholder="Taxable component"
                              id={`taxableComponent`}
                              name={`taxableComponent`}
                              className="form-control inputDesignDoubleInput"
                              disabled
                            />
                          </td>
                          <td>
                            <Field
                              type="text"
                              placeholder="Restricted non preserved"
                              id={`restrictedNonPreserved`}
                              name={`restrictedNonPreserved`}
                              className="form-control inputDesignDoubleInput"
                              onChange={(e) => {
                                setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                FormulaSetting(values, setFieldValue, e.target);
                              }}
                            />
                          </td>
                          <td>
                            <Field
                              type="text"
                              placeholder="Unrestricted non preserved"
                              id={`unRestrictedNonPreserved`}
                              name={`unRestrictedNonPreserved`}
                              className="form-control inputDesignDoubleInput"
                              onChange={(e) => {
                                setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                FormulaSetting(values, setFieldValue, e.target);
                              }}
                            />
                          </td>
                          <td>
                            <Field
                              type="text"
                              placeholder="Preserved amount"
                              id={`preservedAmount`}
                              name={`preservedAmount`}
                              className="form-control inputDesignDoubleInput"
                              disabled
                            />
                          </td>
                        </tr>

                      </tbody>
                    </Table> */}
                  </div>
                </div>
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AccumulationBenefits;

// solution
