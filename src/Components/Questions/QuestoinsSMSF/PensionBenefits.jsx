import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { defaultUrl } from "../../../Store/Store";
import DatePicker from "react-datepicker";
import { handleInputBlur, handleInputChange, handleInputFocus, handleInputKeyDown, toCommaAndDollar, toPercentage } from "../../Assets/Api/Api";

const PensionBenefits = (props) => {

  let initialValues = { NumberOfMap: "1" };



  const [dynamicFields, setDynamicFields] = useState([]);

  const fillInitialValues = (setFieldValue) => {
    if (props.modalObject.editArray.length) {
      let arr = [];

      for (let i = 0; i < props.modalObject.editArray.length; i++) {
        arr.push("");
      }

      setDynamicFields(arr);
    }

    if (props.modalObject.editArray) {
      props.modalObject.editArray.forEach((data, i) => {
        if (data) {
          console.log(data.investmentOption);
          setFieldValue(`commencementDate${i}`, data.commencementDate || "");
          setFieldValue(`originalPurchaseDate${i}`, data.originalPurchaseDate || "");
          setFieldValue(`eligibleServiceDate${i}`, data.eligibleServiceDate || "");
          setFieldValue(`taxFree${i}`, data.taxFree || "");
          setFieldValue(`currentBalance${i}`, data.currentBalance || "");
          setFieldValue(`taxFreeComponent${i}`, data.taxFreeComponent || "");
          setFieldValue(`taxableComponent${i}`, data.taxableComponent || "");
          setFieldValue(`deductibleAmount${i}`, data.deductibleAmount || "");
          setFieldValue(`LumpsumWithdrawalTaken${i}`, data.LumpsumWithdrawalTaken || "");
        }
      });
    }

  };

  let onSubmit = async (values) => {
    console.log(values);

    const newEntries = [];

    let loopLength = parseFloat(values.NumberOfMap);

    // Iterate through each map entry and create a new object
    for (let i = 0; i < loopLength; i++) {
      // alert("loop chala")
      const newEntry = {
        commencementDate: values[`commencementDate${i}`] || "",
        originalPurchaseDate: values[`originalPurchaseDate${i}`] || "",
        eligibleServiceDate: values[`eligibleServiceDate${i}`] || "",
        taxFree: values[`taxFree${i}`] || "",
        currentBalance: values[`currentBalance${i}`] || "",
        taxFreeComponent: values[`taxFreeComponent${i}`] || "",
        taxableComponent: values[`taxableComponent${i}`] || "",
        deductibleAmount: values[`deductibleAmount${i}`] || "",
        LumpsumWithdrawalTaken: values[`LumpsumWithdrawalTaken${i}`] || "",
      };
      newEntries.push(newEntry);
    }

    // Log the new entries to verify
    console.log(newEntries);

    let total = newEntries.reduce(
      (total, entry) => total + parseFloat(entry.taxableComponent.replace(/[^0-9.-]+/g, "")),
      0
    );

    props.setFieldValue(
      `${props.modalObject.key}${props.modalObject.index}`,
      newEntries
    );
    props.setFieldValue(
      `${props.modalObject.key3}${props.modalObject.index}`,
      toCommaAndDollar(total)
    );
    props.setFieldValue(
      `${props.modalObject.mainKey}${props.modalObject.index}`,
      toCommaAndDollar(total)
    );

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  
  const FormulaSetting = (values, setFieldValue, currentInput, stockholder) => {
    try {
      console.log(values, setFieldValue, currentInput, stockholder);

      // Safely parse numeric values
      let taxFree = parseFloat(values[`taxFree0`]?.replace(/[^0-9.-]+/g, "") || 0) || 0;
      let currentBalance = parseFloat(values[`currentBalance0`]?.replace(/[^0-9.-]+/g, "") || 0) || 0;

      // Update values based on current input
      switch (currentInput.name) {
        case "taxFree0":
          taxFree = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
          break;
        case "currentBalance0":
          currentBalance = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
          break;
        default:
          console.warn("Unhandled input name:", currentInput.name);
      }

      // Calculate components
      const taxFreeComponent = (taxFree / 100) * currentBalance;
      const taxableComponent = currentBalance - taxFreeComponent;

      // Set field values, formatting as needed
      setFieldValue("taxFreeComponent0", toCommaAndDollar(taxFreeComponent));
      setFieldValue("taxableComponent0", toCommaAndDollar(taxableComponent));

    } catch (error) {
      console.error("An error occurred in FormulaSetting:", error);
    }
  };




  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, handleChange, setFieldValue, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="col-md-7 d-none">
                    <p className="text-end mt-1">
                      {props.modalObject.question}
                    </p>
                  </div>
                  <div className="col-md-3 d-none">
                    <Field
                      type="text"
                      id="NumberOfMap"
                      name="NumberOfMap"
                      className="form-control inputDesignDoubleInput"
                    />
                  </div>
                  {values.NumberOfMap && (
                    <div className="mt-4">
                      <Table striped bordered responsive hover>
                        <thead>
                          <tr>
                            <th>No#</th>
                            <th>Commencement Date</th>
                            <th>Original Purchase Price</th>
                            <th>Eligible Service Date</th>
                            <th>Tax Free</th>
                            <th>Current Balance</th>
                            <th>Tax Free component </th>
                            <th>Taxable component </th>
                            <th>Deductible amount</th>
                            <th>Lumpsum Withdrawal Taken</th>
                          </tr>
                        </thead>
                        <tbody>
                          {" "}
                          {Array.from({ length: values.NumberOfMap }).map((_, i) => {
                            return (
                              <tr key={i}>
                                <td>{1 + i}</td>
                                <td style={{ minWidth: "8rem" }}>
                                  <DatePicker
                                    className="form-control inputDesignDoubleInput shadow DateInputPadding"
                                    showIcon
                                    id={`commencementDate${i}`}
                                    name={`commencementDate${i}`}
                                    selected={values[`commencementDate${i}`]}
                                    onChange={(date) =>
                                      setFieldValue(`commencementDate${i}`, date)
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
                                <td style={{ minWidth: "8rem" }}>
                                  {" "}
                                  <Field
                                    type="text"
                                    placeholder="Original Purchase prise "
                                    id={`originalPurchaseDate${i}`}
                                    name={`originalPurchaseDate${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(e.target.name,
                                        toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                    }}
                                  />
                                </td>
                                <td style={{ minWidth: "8rem" }}>
                                  {" "}
                                  <DatePicker
                                    className="form-control inputDesignDoubleInput shadow DateInputPadding"
                                    showIcon
                                    id={`eligibleServiceDate${i}`}
                                    name={`eligibleServiceDate${i}`}
                                    selected={values[`eligibleServiceDate${i}`]}
                                    onChange={(date) =>
                                      setFieldValue(
                                        `eligibleServiceDate${i}`,
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
                                    placeholder="Tax Free"
                                    style={{ width: "10rem" }}
                                    id={`taxFree${i}`}
                                    name={`taxFree${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => handleInputChange(e, setFieldValue, FormulaSetting, values)}
                                    onFocus={(e) => handleInputFocus(e, setFieldValue)}
                                    onKeyDown={(e) => handleInputKeyDown(e)}
                                    onBlur={(e) => handleInputBlur(e, setFieldValue, toPercentage, FormulaSetting, values)}
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    style={{ width: "10rem" }}
                                    placeholder="Current Balance"
                                    id={`currentBalance${i}`}
                                    name={`currentBalance${i}`}
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
                                    placeholder="Tax Free component"
                                    id={`taxFreeComponent${i}`}
                                    name={`taxFreeComponent${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    disabled
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Taxable component"
                                    id={`taxableComponent${i}`}
                                    name={`taxableComponent${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    disabled
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Deductible amount"
                                    id={`deductibleAmount${i}`}
                                    name={`deductibleAmount${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                    }}
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Lumpsum Withdrawal Taken"
                                    id={`LumpsumWithdrawalTaken${i}`}
                                    name={`LumpsumWithdrawalTaken${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                    }}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
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

export default PensionBenefits;
