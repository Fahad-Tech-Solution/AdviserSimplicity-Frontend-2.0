import React, { useEffect, useState } from "react";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Row, Table } from "react-bootstrap";
import { Advisers, defaultUrl, Subscriptions } from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  openNotificationSuccess,
  passwordGenerator,
  PatchAxios,
  PostAxios,
} from "../Assets/Api/Api";
import { ConfigProvider, Input, Select } from "antd";

const AdviserFrom = (props) => {
  let initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    ABN: "",
    streetAddress: "",
    state: "",
  };

  let DefaultUrl = useRecoilValue(defaultUrl);
  let subscriptions = useRecoilValue(Subscriptions);
  let [advisers, setAdvisers] = useRecoilState(Advisers);
  let [isDisabled, setIsdisabled] = useState(false);
  let [isDisabledPlanCod, setIsdisabledPlanCod] = useState(false);

  let fillInitialValues = (setFieldValue) => {
    // console.log(props.modalObject);
    if (props.modalObject.Action.toLowerCase() == "edit") {
      let Data = props.modalObject.row;
      setFieldValue("firstName", Data.firstName);
      setFieldValue("lastName", Data.lastName);
      setFieldValue("email", Data.email);
      setFieldValue("phoneNumber", Data.phoneNumber);
      setFieldValue("companyName", Data.companyName);
      setFieldValue("ABN", Data.ABN);
      setFieldValue("streetAddress", Data.streetAddress);
      setFieldValue("state", Data.state);
      // setFieldValue("subscriptionName", Data.subscriptionName);
      setIsdisabledPlanCod(true);
    } else if (props.modalObject.Action.toLowerCase() == "view") {
      let Data = props.modalObject.row;
      setFieldValue("firstName", Data.firstName);
      setFieldValue("lastName", Data.lastName);
      setFieldValue("email", Data.email);
      setFieldValue("phoneNumber", Data.phoneNumber);
      setFieldValue("companyName", Data.companyName);
      setFieldValue("ABN", Data.ABN);
      setFieldValue("streetAddress", Data.streetAddress);
      setFieldValue("state", Data.state);
      // setFieldValue("subscriptionName", Data.subscriptionName);
      setIsdisabled(true);
    }
  };

  let onSubmit = async (values, { resetForm }) => {
    try {
      let res = "";
      values.passwordHash = passwordGenerator(12);
      console.log(values);
      if (props.modalObject.Action.toLowerCase() == "newadviser") {
        res = await PostAxios(DefaultUrl + "/api/user/Add/Adviser", values);
        if (res) {
          console.log(res);

          setAdvisers((prev) => [res, ...prev]);
          openNotificationSuccess(
            "success",
            "topRight",
            "New Plan Added",
            "New subscription plan is added"
          );
        }
      } else if (props.modalObject.Action.toLowerCase() == "edit") {
        values._id = props.modalObject.row._id;
        res = await PatchAxios(DefaultUrl + "/api/user/Update", values);
        if (res) {
          setAdvisers((prev) =>
            prev.map((item) =>
              item._id === props.modalObject.row._id ? res : item
            )
          );
          openNotificationSuccess(
            "success",
            "topRight",
            "Plan is Updated",
            "Subscription plan is updated"
          );
        }
      }
    } catch (error) {
      console.log("Something went wrong:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        error?.response?.data?.error || "Some thing went wrong"
      );
    } finally {
      resetForm();
      if (props.flagState) {
        props.setFlagState(false);
      }
    }
  };

  const rowConfig = [
    {
      name: "firstName",
      type: "text",
      placeholder: "First Name",
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
    },
    {
      name: "email",
      type: "text",
      placeholder: "Email Address",
    },
    {
      name: "phoneNumber",
      type: "text",
      placeholder: "Phone Number",
    },
    {
      name: "companyName",
      type: "text",
      placeholder: "Company Name",
    },
    {
      name: "ABN",
      type: "text",
      placeholder: "ABN",
    },
    {
      name: "streetAddress",
      type: "text",
      placeholder: "Street Address",
    },
    {
      name: "state",
      type: "text",
      placeholder: "State",
    },
  ];

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
              <div className="col-md-12 All_Client reportSection">
                <div className="row justify-content-center mt-4 d-none">
                  <Table striped bordered responsive hover>
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Address</th>
                        <th>Phone number</th>
                        <th>Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      <DynamicTableRow
                        rowConfig={rowConfig.map((row) =>
                          row.name === "paymentRaferenceNo"
                            ? {
                                ...row,
                                disabled: values.paymentMethod !== "Online",
                              }
                            : row
                        )}
                        values={values}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                      />
                    </tbody>
                  </Table>
                </div>
                <div className="d-flex flex-wrap gap-3">
                  {rowConfig.map((item, index) => {
                    // Check if it's the last field and there are odd number of fields
                    const isLast = index === rowConfig.length - 1;
                    const isOdd = rowConfig.length % 2 !== 0;
                    const shouldTakeFullWidth = isOdd && isLast;

                    return (
                      <div
                        key={index}
                        className="form-item"
                        style={{
                          flex: shouldTakeFullWidth
                            ? "1 1 100%"
                            : "1 1 calc(50% - 0.75rem)",
                          minWidth: "250px",
                        }}
                      >
                        <label
                          htmlFor={item.name}
                          className="fw-bold"
                          style={{ fontSize: "15px" }}
                        >
                          {item.placeholder}:
                        </label>

                        <Field name={item.name}>
                          {({ field, form }) =>
                            item.type === "select" ? (
                              <ConfigProvider
                                getPopupContainer={(trigger) =>
                                  trigger.parentNode
                                }
                              >
                                <Select
                                  {...field}
                                  id={item.name}
                                  style={{ width: "100%" }}
                                  placeholder={item.placeholder}
                                  size="large"
                                  options={item.options}
                                  onChange={(value) =>
                                    form.setFieldValue(item.name, value)
                                  }
                                  onBlur={() =>
                                    form.setFieldTouched(item.name, true)
                                  }
                                  getPopupContainer={(triggerNode) =>
                                    triggerNode.parentNode
                                  }
                                />
                              </ConfigProvider>
                            ) : (
                              <Input
                                {...field}
                                id={item.name}
                                type={item.type}
                                placeholder={item.placeholder}
                                size="large"
                                className="w-100"
                              />
                            )
                          }
                        </Field>

                        <ErrorMessage
                          name={item.name}
                          component="div"
                          className="text-danger mt-1"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AdviserFrom;
