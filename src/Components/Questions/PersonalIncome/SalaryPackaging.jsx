import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { toCommaAndDollar, toPercentage } from "../../Assets/Api/Api";
import DynamicYesNo from "../FinancialInvestments/QuestionsDetail/DynamicYesNo";

const SalaryPackaging = (props) => {
  let { title, key, parentValues, parentKey } = props.modalObject;

  let initialValues = {};

  const fillInitialValues = (setFieldValue) => {
    // if (parentValues._id && parentValues?.key) {
    // console.log(JSON.stringify(parentValues));
    if (
      parentValues?.[`${parentKey.replace(".", "")}`]?.[`${key}Modal`] &&
      Object.keys(
        parentValues?.[`${parentKey.replace(".", "")}`]?.[`${key}Modal`]
      ).length > 0
    ) {
      let Data = parentValues[`${parentKey.replace(".", "")}`][`${key}Modal`];
      console.log("incondition", JSON.stringify(Data));

      setFieldValue("employerFBTStatus", Data.employerFBTStatus);
      setFieldValue(
        "creditCardMortgageRepayments",
        Data.creditCardMortgageRepayments
      );
      setFieldValue("costBaseOfCar", Data.costBaseOfCar);
      setFieldValue("FBTPaidByEmployer", Data.FBTPaidByEmployer);
      setFieldValue("runningCostsOfCar", Data.runningCostsOfCar);
    }
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    console.log(values);

    let Obj = {
      employerFBTStatus: values.employerFBTStatus,
      creditCardMortgageRepayments: values.creditCardMortgageRepayments,
      costBaseOfCar: values.costBaseOfCar,
      FBTPaidByEmployer: values.FBTPaidByEmployer,
      runningCostsOfCar: values.runningCostsOfCar,
    };

    console.log(`${parentKey}${key}Modal`);

    props.setFieldValue(`${parentKey}${key}Modal`, Obj);

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
        }, [values.NumberOfMap]);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="mt-4">
                    <Table striped bordered responsive hover>
                      <thead>
                        <tr>
                          <th>Employer FBT Status</th>
                          <th>Credit Card/Mortgage Repayments</th>
                          <th>Cost Base of Car</th>
                          <th>FBT Paid By Employer</th>
                          <th>Running Costs of Car</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <Field
                              as="select"
                              id={`employerFBTStatus`}
                              name={`employerFBTStatus`}
                              className="form-select inputDesignDoubleInput"
                            >
                              <option value={""}>Select</option>
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
                          <td style={{ minWidth: "100px" }}>
                            <Field
                              type="text"
                              placeholder="Credit Card/Mortgage Repayments"
                              id={`creditCardMortgageRepayments`}
                              name={`creditCardMortgageRepayments`}
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
                          <td style={{ minWidth: "100px" }}>
                            <Field
                              type="text"
                              placeholder="Cost Base of Car"
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

                          <td style={{ minWidth: "100px" }}>
                            <DynamicYesNo
                              name={`FBTPaidByEmployer`}
                              values={values}
                              handleChange={handleChange}
                            />
                          </td>
                          <td style={{ minWidth: "100px" }}>
                            <Field
                              type="text"
                              placeholder="Running Costs of Car"
                              id={`runningCostsOfCar`}
                              name={`runningCostsOfCar`}
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

export default SalaryPackaging;
