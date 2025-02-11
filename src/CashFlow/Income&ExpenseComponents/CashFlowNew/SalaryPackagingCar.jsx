import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import {
  RenderName,
  toCommaAndDollar,
} from "../../../Components/Assets/Api/Api";
import DynamicYesNo from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo";

const SalaryPackagingCar = (props) => {
  let initialValues = {
    employerFBTStatus: "",
    costBaseOfCar: "",
    FBTPaidByEmployer: "",
    includeFromYear: "1",
    upUntilYear: "30",
    indexation: "2.50%",
  };

  const fillInitialValues = (setFieldValue) => {
    let SourceObj =
      props.modalObject.values[
        props.modalObject.stakeHolder.replace(".", "")
      ] || {};
    if (Object.keys(SourceObj).length > 0) {
      console.log(
        props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]
      );
      if (SourceObj[props.modalObject.key]) {
        let Data = SourceObj[props.modalObject.key];
        setFieldValue("employerFBTStatus", Data.employerFBTStatus);
        setFieldValue("costBaseOfCar", Data.costBaseOfCar); //costBaseOfCar Value From Discovery Form
        setFieldValue("FBTPaidByEmployer", Data.FBTPaidByEmployer);
        setFieldValue(
          "runningCostsOfCarPackaged",
          Data.runningCostsOfCarPackaged
        ); //runningCostsOfCarPackaged Value From Discovery Form
        setFieldValue("includeFromYear", Data.includeFromYear || "1");
        setFieldValue("upUntilYear", Data.upUntilYear || "30");
        setFieldValue("indexation", Data.indexation || "2.50%");
      }
    }
  };

  let onSubmit = async (values) => {
    console.log(values);

    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key,
      values
    );

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
    value: (i + 1).toString(),
    label: ("Year " + (i + 1)).toString(),
  }));

  const indexation = Array.from({ length: 21 }, (_, i) => ({
    value: (i * 0.5).toFixed(2) + "%",
    label: (i * 0.5).toFixed(2) + "%",
  }));

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
                  <div className="mt-4">
                    <Table striped bordered responsive hover>
                      <thead>
                        <tr>
                          <th>Owner</th>
                          <th>Employer FBT Status</th>
                          <th>Cost Base Of Car</th>
                          <th>FBT Paid By Employer</th>
                          <th>Running Costs of Car Packaged</th>
                          <th>Include From Year</th>
                          <th>Up Until Year</th>
                          <th>Indexation</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {RenderName(
                              props.modalObject.stakeHolder.replace(".", "")
                            )}
                          </td>
                          <td>
                            <Field
                              as="select"
                              placeholder="Employer FBT Status"
                              id={`employerFBTStatus`}
                              name={`employerFBTStatus`}
                              className="form-select inputDesignDoubleInput"
                            >
                              <option value={""}>Please Select</option>
                              <option
                                value={"Full FBT/Rebatable/Exempt (17K Cap)"}
                              >
                                Full FBT/Rebatable/Exempt (17K Cap)
                              </option>
                              <option value={"Exempt (30K Cap)"}>
                                Exempt (30K Cap)
                              </option>
                            </Field>
                          </td>
                          <td>
                            <Field
                              type="text"
                              placeholder="Cost Base Of Car"
                              id={`costBaseOfCar`}
                              name={`costBaseOfCar`}
                              className="form-control inputDesignDoubleInput"
                              onChange={(e) => {
                                setFieldValue(
                                  e.target.name,
                                  toCommaAndDollar(
                                    e.target.value.replace(/[^0-9.-]+/g, "")
                                  )
                                );
                              }}
                            />
                          </td>
                          <td>
                            <div className="d-flex flex-column justify-content-center align-items-center gap-2 pt-1">
                              <DynamicYesNo
                                name={`FBTPaidByEmployer`}
                                values={values}
                                handleChange={handleChange}
                              />
                            </div>
                          </td>
                          <td>
                            <Field
                              type="text"
                              placeholder="Running Costs of Car Packaged"
                              id={`runningCostsOfCarPackaged`}
                              name={`runningCostsOfCarPackaged`}
                              className="form-control inputDesignDoubleInput"
                              onChange={(e) => {
                                setFieldValue(
                                  e.target.name,
                                  toCommaAndDollar(
                                    e.target.value.replace(/[^0-9.-]+/g, "")
                                  )
                                );
                              }}
                            />
                          </td>
                          <td>
                            <Field
                              as="select"
                              placeholder="Include From Year"
                              id={`includeFromYear`}
                              name={`includeFromYear`}
                              className="form-select inputDesignDoubleInput"
                            >
                              <option value={""}>Please Select</option>
                              {loanTermOptions.map((elem, index) => {
                                return (
                                  <option key={index} value={elem.value}>
                                    {elem.label}
                                  </option>
                                );
                              })}
                            </Field>
                          </td>
                          <td>
                            <Field
                              as="select"
                              placeholder="Up Until Year"
                              id={`upUntilYear`}
                              name={`upUntilYear`}
                              className="form-select inputDesignDoubleInput"
                            >
                              <option value={""}>Please Select</option>
                              {loanTermOptions.map((elem, index) => {
                                return (
                                  <option key={index} value={elem.value}>
                                    {elem.label}
                                  </option>
                                );
                              })}
                            </Field>
                          </td>
                          <td>
                            <Field
                              as="select"
                              placeholder="indexation"
                              id={`indexation`}
                              name={`indexation`}
                              className="form-select inputDesignDoubleInput"
                            >
                              <option value={""}>Please Select</option>
                              {indexation.map((elem, index) => {
                                return (
                                  <option key={index} value={elem.value}>
                                    {elem.label}
                                  </option>
                                );
                              })}
                            </Field>
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

export default SalaryPackagingCar;
