import React, { useEffect, useState } from "react";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Table } from "react-bootstrap";
import { Advisers, defaultUrl, Roles, Subscriptions } from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  openNotificationSuccess,
  randomStringGenerator,
  PatchAxios,
  PostAxios,
} from "../Assets/Api/Api";
import { Col, ConfigProvider, Input, Select, Row } from "antd";
import { content } from "../../Content/Content";
import FormItemLabel from "antd/es/form/FormItemLabel";
import { AiOutlineReload } from "react-icons/ai";
import * as Yup from "yup";

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
    referralID: "",
  };

  let DefaultUrl = useRecoilValue(defaultUrl);
  let subscriptions = useRecoilValue(Subscriptions);
  let [advisers, setAdvisers] = useRecoilState(Advisers);
  let roles = useRecoilValue(Roles);
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
      "referralID",
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
      values.undefined = undefined;
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

          if (props.flagState) {
            props.setFlagState(false);
          }
          resetForm();
        }
      } else if (props.modalObject.Action.toLowerCase() == "edit") {
        values._id = props.modalObject.row._id;
        console.log(props.modalObject.row);
        values.roleID = props.modalObject.row.roleID;
        console.log(values);
        res = await PatchAxios(DefaultUrl + "/api/user/Update/Adviser", values);
        if (res) {
          setAdvisers((prev) =>
            prev.map((item) =>
              item._id === props.modalObject.row._id ? res : item
            )
          );
          openNotificationSuccess(
            "success",
            "topRight",
            "New Adviser",
            "new Adviser successfully is added"
          );
          if (props.flagState) {
            props.setFlagState(false);
          }
          resetForm();
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
    }
  };

  const referralIDGenerator = (
    values,
    setFieldValue,
    target,
    reGen = false
  ) => {
    // Update the changed field first
    setFieldValue(target.name, target.value);

    const { firstName, lastName, companyName, referralID } = values;

    // Only generate if referralID is empty or regeneration requested
    if (!referralID || reGen) {
      const fName = target.name === "firstName" ? target.value : firstName;
      const lName = target.name === "lastName" ? target.value : lastName;
      const cName = target.name === "companyName" ? target.value : companyName;

      if (fName && lName && cName) {
        const initials =
          fName[0].toUpperCase() +
          lName[0].toUpperCase() +
          cName[0].toUpperCase();

        const randomDigits = randomStringGenerator({
          length: 2, // instead of count:2 + join
          count: 1,
          useUppercase: false,
          useLowercase: false,
          useNumbers: true,
          useSpecial: false,
        });

        setFieldValue("referralID", initials + randomDigits);
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
      onChange: referralIDGenerator,
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      column: 3,
      disabled: isDisabled,
      onChange: referralIDGenerator,
    },
    {
      name: "referralID",
      type: "text",
      placeholder: "User ID",
      column: 3,
      reLoad: true,
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
      onChange: referralIDGenerator,
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
      column: 1,
      rows: 2,
      disabled: isDisabled,
    },
  ];

  let validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    companyName: Yup.string().required("Company Name is required"),
    LicenseeName: Yup.string().required("Licensee Name is required"),
    ABN: Yup.string().required("ABN is required"),
    companyAddress: Yup.string().required("Company Address is required"),
    state: Yup.string().required("State is required"),
    ASIC: Yup.string().required("ASIC Number is required"),
    AFSNumber: Yup.string().required("AFS Number is required"),
    AFSName: Yup.string().required("AFS Name is required"),
    referralID: Yup.string()
      .min(5, "User ID must be more than 4 characters")
      .required("User ID is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
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
                        className="fw-bold w-100"
                        style={{ fontSize: "15px" }}
                      >
                        {item.placeholder}:{" "}
                        {item.reLoad && (
                          <button
                            type="button"
                            className="float-end btn p-0 px-2"
                            onClick={() => {
                              referralIDGenerator(
                                values,
                                setFieldValue,
                                {
                                  name: "",
                                  value: "",
                                },
                                true
                              );
                            }}
                          >
                            {" "}
                            <AiOutlineReload />
                          </button>
                        )}
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
                              onChange={(e) => {
                                if (item?.onChange) {
                                  item.onChange(
                                    values,
                                    setFieldValue,
                                    e.target,
                                    false
                                  );
                                } else {
                                  handleChange(e);
                                }
                              }}
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
