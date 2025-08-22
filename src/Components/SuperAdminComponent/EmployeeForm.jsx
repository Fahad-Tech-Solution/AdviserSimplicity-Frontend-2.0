import React, { useEffect, useState } from "react";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Table } from "react-bootstrap";
import {
  Advisers,
  Employees,
  defaultUrl,
  LoggedInUserData,
  Roles,
  Subscriptions,
} from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
} from "../Assets/Api/Api";
import { Col, ConfigProvider, Input, Select, Row } from "antd";
import { content } from "../../Content/Content";

const EmployeeForm = (props) => {
  const { AdviserObject } = content;
  const { TextArea } = Input;

  let initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    roleID: "",
  };

  let DefaultUrl = useRecoilValue(defaultUrl);
  let subscriptions = useRecoilValue(Subscriptions);
  let [advisers, setAdvisers] = useRecoilState(Advisers);
  let [employee, setEmployee] = useRecoilState(Employees);
  let roles = useRecoilValue(Roles);
  let LoggedUser = useRecoilValue(LoggedInUserData);
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
      "roleID",
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
      values.companyName = LoggedUser.companyName;
      console.log(values);
      if (props.modalObject.Action.toLowerCase() == "newadviser") {
        res = await PostAxios(DefaultUrl + "/api/user/Add/Employee", values);
        if (res) {
          console.log(res);

          setEmployee((prev) => [res, ...prev]);
          openNotificationSuccess(
            "success",
            "topRight",
            "New Plan Added",
            "New subscription plan is added"
          );
        }
      } else if (props.modalObject.Action.toLowerCase() == "edit") {
        values._id = props.modalObject.row._id;
        values.parentUserID = props.modalObject.row.parentUserID;
        res = await PatchAxios(
          DefaultUrl + "/api/user/Update/Employee",
          values
        );
        if (res) {
          setEmployee((prev) =>
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
        error?.response?.data?.error ||
          error?.response?.data ||
          "Some thing went wrong"
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
      column: 12,
      disabled: isDisabled,
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      column: 12,
      disabled: isDisabled,
    },
    {
      name: "email",
      type: "text",
      placeholder: "Email Address",
      column: 12,
      disabled: isDisabled,
    },
    {
      name: "phoneNumber",
      type: "text",
      placeholder: "Phone Number",
      column: 12,
      disabled: isDisabled,
    },
    {
      name: "roleID",
      type: "select",
      placeholder: "Role",
      column: 12,
      options: roles.map((item) => ({
        value: item._id, // or whatever your backend expects as the ID
        label: item.roleName, // this is the text shown in the dropdown
      })),
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
              <Row gutter={[12, 12]} className="justify-content-center">
                {rowConfig.map((item, index) => {
                  const columnSpan = parseFloat(item.column);
                  return (
                    <Col
                      key={index}
                      xs={24}
                      sm={24}
                      md={columnSpan}
                      lg={columnSpan}
                      xl={columnSpan}
                      //   style={{ minWidth: 250 }}
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

export default EmployeeForm;
