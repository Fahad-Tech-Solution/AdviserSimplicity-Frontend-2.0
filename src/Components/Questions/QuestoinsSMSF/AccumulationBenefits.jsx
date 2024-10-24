import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { defaultUrl, } from "../../../Store/Store";
import DatePicker from "react-datepicker";
import { toCommaAndDollar } from "../../Assets/Api/Api";

const AccumulationBenefits = (props) => {

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

  const fillInitialValues = (setFieldValue) => {

    console.log(props.modalObject.values[`${props.modalObject.Input}`])

    if (props.modalObject.values[`${props.modalObject.Input}`]) {

      let Obj = props.modalObject.values[`${props.modalObject.Input}`]
      if (Obj.accumulationBenefitsOBJ) {
        let data = Obj.accumulationBenefitsOBJ;

        setFieldValue(`commencementDate`, data.commencementDate || "");
        setFieldValue(`eligibleServiceDate`, data.eligibleServiceDate || "");
        setFieldValue(`taxFreeComponent`, data.taxFreeComponent || "");
        setFieldValue(`currentBalance`, data.currentBalance || "");
        setFieldValue(`taxableComponent`, data.taxableComponent || "");
        setFieldValue(`restrictedNonPreserved`, data.restrictedNonPreserved || "");
        setFieldValue(`unRestrictedNonPreserved`, data.unRestrictedNonPreserved || "");
        setFieldValue(`preservedAmount`, data.preservedAmount || "");
      }
    }

  };


  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    console.log(values, props.modalObject);


    props.setFieldValue(props.modalObject.Input + ".accumulationBenefitsOBJ", values);

    props.setFieldValue(props.modalObject.Input + ".accumulationBenefits", values.preservedAmount);

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  function FormulaSetting(values, setFieldValue, currentInput) {
    try {
      // Extract and sanitize values
      let taxFreeComponent = parseFloat(values[`taxFreeComponent`]?.replace(/[^0-9.-]+/g, "")) || 0;
      let currentBalance = parseFloat(values[`currentBalance`]?.replace(/[^0-9.-]+/g, "")) || 0;
      let restrictedNonPreserved = parseFloat(values[`restrictedNonPreserved`]?.replace(/[^0-9.-]+/g, "")) || 0;
      let unRestrictedNonPreserved = parseFloat(values[`unRestrictedNonPreserved`]?.replace(/[^0-9.-]+/g, "")) || 0;
      let taxableComponent = 0;
      let preservedAmount = 0;
      let collection = "";

      // Handle input changes for specific fields
      switch (currentInput?.name) {
        case "taxFreeComponent":
          taxFreeComponent = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
          collection = "A";
          break;
        case "currentBalance":
          currentBalance = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
          collection = "A";
          break;
        case "restrictedNonPreserved":
          restrictedNonPreserved = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
          collection = "B";
          break;
        case "unRestrictedNonPreserved":
          unRestrictedNonPreserved = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
          collection = "B";
          break;
        default:
          console.error("No valid input selected");
          break;
      }

      // Calculate taxableComponent
      taxableComponent = currentBalance - taxFreeComponent;
      if (isNaN(taxableComponent)) throw new Error("Invalid taxable component calculation");

      // Update the 'taxableComponent' field value
      setFieldValue("taxableComponent", toCommaAndDollar(taxableComponent));

      // Calculate preservedAmount
      preservedAmount = currentBalance - restrictedNonPreserved - unRestrictedNonPreserved;
      if (isNaN(preservedAmount)) throw new Error("Invalid preserved amount calculation");

      // Update the 'preservedAmount' field value
      setFieldValue("preservedAmount", toCommaAndDollar(preservedAmount));
    } catch (error) {
      console.error("Error in FormulaSetting:", error.message);
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="mt-4">
                    <Table striped bordered responsive hover>
                      <thead>
                        <tr>
                          <th>Member</th>
                          <th>Commencement Date</th>
                          <th>Eligible Service Date</th>
                          <th>Tax Free component</th>
                          <th>Current Balance</th>
                          <th>Taxable component </th>
                          <th>Restricted non preserved</th>
                          <th>Unrestricted non preserved</th>
                          <th>Preserved amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="pt-3">{props.modalObject.SMSFOwner}</td>
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
                              disabled
                              name={`taxableComponent`}
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
                              placeholder="Unrestricted non preserved"
                              id={`preservedAmount`}
                              disabled
                              name={`preservedAmount`}
                              className="form-control inputDesignDoubleInput"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
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
