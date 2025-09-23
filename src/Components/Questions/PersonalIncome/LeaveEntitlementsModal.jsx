import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { toCommaAndDollar, toPercentage } from "../../Assets/Api/Api";

const LeaveEntitlementsModal = (props) => {
  let { title, key, parentValues, parentKey } = props.modalObject;

  let initialValues = {
    annualLeave: "Annual Leave",
    annualLeaveAmount: "",
    annualLeaveTime: "",

    sickLeave: "Sick Leave",
    sickLeaveAmount: "",
    sickLeaveTime: "",

    longServiceLeave: "Long Service Leave",
    longServiceLeaveAmount: "",
    longServiceLeaveTime: "",
  };

  const fillInitialValues = (setFieldValue) => {
    // if (parentValues._id && parentValues?.key) {
    // console.log(JSON.stringify(parentValues));
    if (
      parentValues?.[`${parentKey.replace(".", "")}`]?.[`${key}`] &&
      Object.keys(parentValues?.[`${parentKey.replace(".", "")}`]?.[`${key}`])
        .length > 0
    ) {
      let Data = parentValues[`${parentKey.replace(".", "")}`][`${key}`];
      console.log("incondition", JSON.stringify(Data));

      setFieldValue("annualLeave", Data.annualLeave);
      setFieldValue("annualLeaveAmount", Data.annualLeaveAmount);
      setFieldValue("annualLeaveTime", Data.annualLeaveTime);

      setFieldValue("sickLeave", Data.sickLeave);
      setFieldValue("sickLeaveAmount", Data.sickLeaveAmount);
      setFieldValue("sickLeaveTime", Data.sickLeaveTime);

      setFieldValue("longServiceLeave", Data.longServiceLeave);
      setFieldValue("longServiceLeaveAmount", Data.longServiceLeaveAmount);
      setFieldValue("longServiceLeaveTime", Data.longServiceLeaveTime);
    }
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    console.log(values);

    let Obj = {
      annualLeave: values.annualLeave,
      annualLeaveAmount: values.annualLeaveAmount,
      annualLeaveTime: values.annualLeaveTime,
      sickLeave: values.sickLeave,
      sickLeaveAmount: values.sickLeaveAmount,
      sickLeaveTime: values.sickLeaveTime,
      longServiceLeave: values.longServiceLeave,
      longServiceLeaveAmount: values.longServiceLeaveAmount,
      longServiceLeaveTime: values.longServiceLeaveTime,
    };

    props.setFieldValue(`${parentKey}${key}`, Obj);

    // props.setFieldValue(`${props.modalObject.key3}${props.modalObject.index}`, total)
    // props.setFieldValue(`${props.modalObject.mainKey}${props.modalObject.index}`, total - 475721)

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
                          <th>Leave Type</th>
                          <th>Amount</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <Field
                              type="text"
                              placeholder="Leave Type"
                              id={`annualLeave`}
                              name={`annualLeave`}
                              className="form-control inputDesignDoubleInput"
                              disabled
                            />
                          </td>
                          <td>
                            <Field
                              type="number"
                              placeholder="Amount"
                              id={`annualLeaveAmount`}
                              name={`annualLeaveAmount`}
                              className="form-control inputDesignDoubleInput"
                            />
                          </td>
                          <td style={{ minWidth: "250px" }}>
                            <Field
                              as="select"
                              id={`annualLeaveTime`}
                              name={`annualLeaveTime`}
                              className="form-select inputDesignDoubleInput"
                            >
                              <option value={""}>Select</option>
                              <option value={"Days"}>Days</option>
                              <option value={"Weeks"}>Weeks</option>
                              <option value={"Hours"}>Hours</option>
                            </Field>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Field
                              type="text"
                              placeholder="Leave Type"
                              id={`sickLeave`}
                              name={`sickLeave`}
                              className="form-control inputDesignDoubleInput"
                              disabled
                            />
                          </td>
                          <td>
                            <Field
                              type="number"
                              placeholder="Amount"
                              id={`sickLeaveAmount`}
                              name={`sickLeaveAmount`}
                              className="form-control inputDesignDoubleInput"
                            />
                          </td>
                          <td>
                            <Field
                              as="select"
                              id={`sickLeaveTime`}
                              name={`sickLeaveTime`}
                              className="form-select inputDesignDoubleInput"
                            >
                              <option value={""}>Select</option>
                              <option value={"Days"}>Days</option>
                              <option value={"Weeks"}>Weeks</option>
                              <option value={"Hours"}>Hours</option>
                            </Field>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Field
                              type="text"
                              placeholder="Leave Type"
                              id={`longServiceLeave`}
                              name={`longServiceLeave`}
                              className="form-control inputDesignDoubleInput"
                              disabled
                            />
                          </td>
                          <td>
                            <Field
                              type="number"
                              placeholder="Amount"
                              id={`longServiceLeaveAmount`}
                              name={`longServiceLeaveAmount`}
                              className="form-control inputDesignDoubleInput"
                            />
                          </td>
                          <td>
                            <Field
                              as="select"
                              id={`longServiceLeaveTime`}
                              name={`longServiceLeaveTime`}
                              className="form-select inputDesignDoubleInput"
                            >
                              <option value={""}>Select</option>
                              <option value={"Days"}>Days</option>
                              <option value={"Weeks"}>Weeks</option>
                              <option value={"Hours"}>Hours</option>
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

export default LeaveEntitlementsModal;
