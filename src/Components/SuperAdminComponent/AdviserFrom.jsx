import React, { useEffect, useState } from "react";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Table } from "react-bootstrap";
import { Advisers, defaultUrl, Subscriptions } from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  openNotificationSuccess,
  passwordGenerator,
  PatchAxios,
  PostAxios,
} from "../Assets/Api/Api";
import { Col, ConfigProvider, Input, Select, Row } from "antd";
import { content } from "../../Content/Content";

const AdviserFrom = (props) => {
  const { AdviserObject } = content;
  const { TextArea } = Input;

  let initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    LicenseeName: "",
    ABN: "",
    companyAddress: "",
    state: "",
    ASIC: "",
    AFSNumber: "",
    AFSName: "",
  };

  let DefaultUrl = useRecoilValue(defaultUrl);
  let subscriptions = useRecoilValue(Subscriptions);
  let [advisers, setAdvisers] = useRecoilState(Advisers);
  let [isDisabled, setIsdisabled] = useState(false);
  let [isDisabledPlanCod, setIsdisabledPlanCod] = useState(false);

  const fillInitialValues = (setFieldValue) => {
    const { Action, row: Data } = props.modalObject;
    const action = Action.toLowerCase();

    const fieldsToSet = [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "companyName",
      "LicenseeName",
      "ABN",
      "companyAddress",
      "state",
      "ASIC",
      "AFSNumber",
      "AFSName",
      // "subscriptionName", // Uncomment if needed
    ];

    fieldsToSet.forEach((field) => {
      setFieldValue(field, Data[field] ?? "");
    });

    if (action === "edit") {
      setIsdisabledPlanCod(true);
    } else if (action === "view") {
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
      column: 3,
      disabled: isDisabled,
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      column: 3,
      disabled: isDisabled,
    },
    {
      name: "email",
      type: "text",
      placeholder: "Email Address",
      column: 3,
      disabled: isDisabled,
    },
    {
      name: "phoneNumber",
      type: "text",
      placeholder: "Phone Number",
      column: 3,
      disabled: isDisabled,
    },
    {
      name: "companyName",
      type: "text",
      placeholder: "Company Name",
      column: 3,
      disabled: isDisabled,
    },
    {
      name: "LicenseeName",
      type: "text",
      placeholder: "Licensee Name",
      column: 3,
      disabled: isDisabled,
    },
    {
      name: "ABN",
      type: "text",
      placeholder: "ABN",
      column: 3,
      disabled: isDisabled,
    },
    {
      name: "companyAddress",
      type: "text",
      placeholder: "Company Address",
      column: 3,
      disabled: isDisabled,
    },
    {
      name: "state",
      type: "text",
      placeholder: "State",
      column: 3,
      disabled: isDisabled,
    },
    {
      name: "ASIC",
      type: "text",
      placeholder: "ASIC Number",
      column: 3,
      disabled: isDisabled,
    },
    {
      name: "AFSNumber",
      type: "select",
      placeholder: "AFS Number",
      options: [
        ...AdviserObject.map((item) => ({
          label: item.AFSNumber,
          value: item.AFSNumber,
        })),
      ],
      action: (setFieldvalue, value) => {
        if (value) {
          let selectedAdviser = AdviserObject.find(
            (item) => item.AFSNumber === value
          );
          if (selectedAdviser) {
            setFieldvalue("AFSName", selectedAdviser.AFSName);
          }
        }
      },
      column: 3,
      disabled: isDisabled,
    },
    {
      name: "AFSName",
      type: "textarea",
      readOnly: true,
      placeholder: "AFS Name",
      column: 3,
      rows: 3,
      disabled: isDisabled,
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
              <Row gutter={[16, 16]}>
                {rowConfig.map((item, index) => {
                  // Check if it's the last field and there are odd number of fields
                  const isLast = index === rowConfig.length - 1;
                  const isOdd = rowConfig.length % 2 !== 0;
                  const shouldTakeFullWidth = isOdd && isLast;
                  const columnSpan = Math.floor(24 / item.column);
                  return (
                    <Col
                      key={index}
                      xs={24}
                      sm={24}
                      md={columnSpan}
                      lg={columnSpan}
                      xl={columnSpan}
                      style={{ minWidth: 250 }}
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
                                showSearch
                                optionFilterProp="label"
                                filterOption={(input, option) =>
                                  (option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                                }
                                filterSort={(optionA, optionB) =>
                                  (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                      (optionB?.label ?? "").toLowerCase()
                                    )
                                }
                                onChange={(value) => {
                                  form.setFieldValue(item.name, value);
                                  item.action?.(form.setFieldValue, value); // optional chaining in case action is not provided
                                }}
                                onBlur={() =>
                                  form.setFieldTouched(item.name, true)
                                }
                                getPopupContainer={(triggerNode) =>
                                  triggerNode.parentNode
                                }
                                disabled={item.disabled}
                                readOnly={item.readOnly}
                              />
                            </ConfigProvider>
                          ) : item.type === "textarea" ? (
                            <TextArea
                              {...field}
                              id={item.name}
                              placeholder={item.placeholder}
                              size="large"
                              rows={item.rows || 4} // You can customize the number of rows from config
                              className="w-100"
                              disabled={item.disabled}
                              readOnly={item.readOnly}
                            />
                          ) : (
                            <Input
                              {...field}
                              id={item.name}
                              type={item.type}
                              placeholder={item.placeholder}
                              size="large"
                              className="w-100"
                              disabled={item.disabled}
                              readOnly={item.readOnly}
                            />
                          )
                        }
                      </Field>

                      <ErrorMessage
                        name={item.name}
                        component="div"
                        className="text-danger mt-1"
                      />
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AdviserFrom;
