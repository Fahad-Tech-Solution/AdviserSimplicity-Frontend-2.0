import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import { handleInputBlur, handleInputChange, handleInputFocus, handleInputKeyDown, RenderName, toCommaAndDollar, toPercentage } from '../../Assets/Api/Api';

const PremiumsDetails = (props) => {


  let initialValues = {
    coverType: "",
    premiums: "",
    frequency: "",
    totalCost: "",
    payeeOfPremiums: "",
    paymentMethod: "",
    commissionRate: "",
  };

  let [UserStatus] = useState(localStorage.getItem('UserStatus'));

  const fillInitialValues = (setFieldValue) => {
    if (props.modalObject.values[`${props.modalObject.key}${props.modalObject.index}`]) {

      let data = props.modalObject.values[`${props.modalObject.key}${props.modalObject.index}`];
      setFieldValue("coverType", data.coverType);
      setFieldValue("premiums", data.premiums);
      setFieldValue("frequency", data.frequency);
      setFieldValue("totalCost", data.totalCost);
      setFieldValue("payeeOfPremiums", data.payeeOfPremiums);
      setFieldValue("paymentMethod", data.paymentMethod);
      setFieldValue("commissionRate", data.commissionRate);

    }
  };

  let onSubmit = async (values) => {

    console.log(values)

    props.setFieldValue(`${props.modalObject.key}${props.modalObject.index}`, values)


    props.setFieldValue(`premiums${props.modalObject.index}`, values.totalCost)



    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  let FormulaSetting = (values, setFieldValue, currentinput) => {
    try {
      // Extract necessary values
      let premiums = values.premiums.replace(/[^0-9.-]+/g, "");
      let frequency = values.frequency;
      let totalCost = values.totalCost;

      // Perform actions based on currentinput
      switch (currentinput.name) {
        case "premiums":
          // Safely parse the input and handle invalid input cases
          premiums = parseFloat(currentinput.value.replace(/[^0-9.-]+/g, ""));
          if (isNaN(premiums)) {
            premiums = 0; // Set a default value if parsing fails
          }
          break;
        case "frequency":
          frequency = parseFloat(currentinput.value);
          if (isNaN(frequency) || frequency === undefined || frequency === null || frequency === "") {
            frequency = 1; // Set a default value if frequency is invalid
          }
          break;
        default:
          console.log("No valid input setting for:", currentinput);
          break;
      }

      // Ensure that premiums and frequency are valid numbers before calculation
      if (!isNaN(premiums) && !isNaN(frequency)) {
        totalCost = premiums * frequency;
      } else {
        totalCost = 0; // Fallback if any value is invalid
      }

      // Set totalCost safely
      setFieldValue("totalCost", toCommaAndDollar(totalCost));

    } catch (error) {
      // Log any unexpected errors and handle gracefully
      console.error("Error in FormulaSetting:", error);
      setFieldValue("totalCost", 0); // Set a default in case of error
    }
  };

  let emptyArrow = () => { }

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
                <div className='row justify-content-center'>
                  <div className='mt-4'>
                    <Table striped bordered responsive hover>
                      <thead>
                        <tr>
                          <th>No#</th>
                          <th>Cover Type</th>
                          <th>Premiums</th>
                          <th>Frequency</th>
                          <th>Total Cost p.a</th>
                          <th>Payee of Premiums</th>
                          <th>Payment Method</th>
                          <th>Commission Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{1}</td>
                          <td>
                            <Field
                              as="select"
                              id={`coverType`}
                              name={`coverType`}
                              className="form-select inputDesignDoubleInput"
                            >
                              <option value={""}>Select</option>
                              <option value={"Life"}>Life</option>
                              <option value={"TPD"}>TPD</option>
                              <option value={"Trauma"}>Trauma</option>
                              <option value={"Income protection"}>Income protection</option>
                            </Field>
                          </td>
                          <td>
                            <Field
                              type="text"
                              placeholder="Premiums"
                              id={`premiums`}
                              name={`premiums`}
                              className="form-control inputDesignDoubleInput"
                              onChange={(e) => {
                                setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")))
                                FormulaSetting(values, setFieldValue, e.target)
                              }}
                            />
                          </td>
                          <td style={{ minWidth: "150px" }}>
                            <Field
                              as="select"
                              id={`frequency`}
                              name={`frequency`}
                              className="form-select inputDesignDoubleInput"
                              onChange={(e) => {
                                setFieldValue(e.target.name, e.target.value);
                                FormulaSetting(values, setFieldValue, e.target)
                              }}
                            >
                              <option value={""}>Select</option>
                              <option value={12}>Monthly</option>
                              <option value={2}>6 Monthly</option>
                              <option value={1}>Yearly</option>
                            </Field>
                          </td>
                          <td>
                            <Field
                              type="text"
                              placeholder="Total Cost p.a"
                              id={`totalCost`}
                              name={`totalCost`}
                              disabled
                              className="form-control inputDesignDoubleInput"
                            />
                          </td>
                          <td>
                            <Field
                              as="select"
                              id={`payeeOfPremiums`}
                              name={`payeeOfPremiums`}
                              className="form-select inputDesignDoubleInput"
                            >
                              <option value={""}>Select</option>
                              <option value={"client"}>{RenderName("client")}</option>
                              {UserStatus !== "Single" &&
                                <React.Fragment>
                                  <option value={"partner"}>{RenderName("partner")}</option>
                                </React.Fragment>
                              }
                              <option value={"SMSF"}>SMSF</option>
                              <option value={"Super Trustees"}>Super Trustees </option>
                              <option value={"Company (Pty Ltd)"}>Company (Pty Ltd)</option>
                              <option value={"Family Trust"}>Family Trust</option>
                            </Field>
                          </td>
                          <td>
                            <Field
                              as="select"
                              id={`paymentMethod`}
                              name={`paymentMethod`}
                              className="form-select inputDesignDoubleInput"
                            >
                              <option value={""}>Select</option>
                              <option value={"Credit Card"}>Credit Card</option>
                              <option value={"Direct Debit"}>Direct Debit</option>
                              <option value={"Rollover"}>Rollover</option>
                              <option value={"Manual"}>Manual</option>
                            </Field>
                          </td>
                          <td>
                            <Field
                              type="text"
                              placeholder="Commission Rate"
                              id={`commissionRate`}
                              name={`commissionRate`}
                              className="form-control inputDesignDoubleInput"
                              onChange={(e) => handleInputChange(e, setFieldValue, emptyArrow, values)}
                              onFocus={(e) => handleInputFocus(e, setFieldValue)}
                              onKeyDown={(e) => handleInputKeyDown(e)}
                              onBlur={(e) => handleInputBlur(e, setFieldValue, toPercentage, emptyArrow, values)}
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

export default PremiumsDetails;
