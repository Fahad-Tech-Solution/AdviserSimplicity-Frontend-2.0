import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Advisers,
  AllUsers,
  defaultUrl,
  Employees,
  Roles,
  Subscriptions,
} from "../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  openNotificationSuccess,
  passwordGenerator,
  PatchAxios,
  PostAxios,
} from "../Components/Assets/Api/Api";
import { ConfigProvider, Input, Select } from "antd";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { Col, Row } from "react-bootstrap";

const AssignUser = (props) => {
  let initialValues = {
    assignIDOld: "",
    assignID: "",
  };

  let DefaultUrl = useRecoilValue(defaultUrl);
  let [advisers, setAdvisers] = useRecoilState(Advisers);
  let employee = useRecoilValue(Employees);
  const [PerosnalDetail2, setPersonalDetail] = useRecoilState(AllUsers);

  const fillInitialValues = (setFieldValue) => {
    const Data = props?.modalObject?.row || {};

    const firstName = Data?.assignID?.firstName || "-";
    const lastName = Data?.assignID?.lastName || "-";
    const email = Data?.assignID?.email || "-";

    setFieldValue("assignIDOld", `${firstName} ${lastName} (${email})`);
  };

  let onSubmit = async (values, { resetForm }) => {
    try {
      let Data = {
        employeeID: values.assignID,
        clientID: props?.modalObject?.row?._id,
      };

      console.log(Data);

      let res = await PatchAxios(DefaultUrl + "/api/user/AssignClient", Data);
      if (res) {
        console.log(res);

        res.clients.children = null;

        // res.client.assignID
        setPersonalDetail((prev) =>
          prev.map((user) => (user._id === Data.clientID ? res.clients : user))
        );

        openNotificationSuccess(
          "success",
          "topRight",
          "Client is Assigned",
          "This client is Selected"
        );
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
              <Row gutter={[16, 16]} className="justify-content-center">
                {/* Old Assignee */}
                <Col md={"5"}>
                  <label
                    htmlFor={"assignIDOld"}
                    className="fw-bold"
                    style={{ fontSize: "15px" }}
                  >
                    Current Assignee:
                  </label>

                  <Field name={"assignIDOld"}>
                    {({ field }) => (
                      <ConfigProvider
                        getPopupContainer={(trigger) => trigger.parentNode}
                      >
                        <Input
                          {...field}
                          size="large"
                          className="w-100"
                          readOnly
                          disabled
                        />
                      </ConfigProvider>
                    )}
                  </Field>
                </Col>

                {/* Arrow Icon */}
                <Col
                  md={"1"}
                  className="d-flex align-items-end pb-2 justify-content-center"
                >
                  <FaArrowRightArrowLeft size={20} />
                </Col>

                {/* New Assignee */}
                <Col md={"5"}>
                  <label
                    htmlFor={"assignID"}
                    className="fw-bold"
                    style={{ fontSize: "15px" }}
                  >
                    New Assignee:
                  </label>

                  <Field name={"assignID"}>
                    {({ field, form }) => (
                      <ConfigProvider
                        getPopupContainer={(trigger) => trigger.parentNode}
                      >
                        <Select
                          {...field}
                          id={"assignID"}
                          style={{ width: "100%" }}
                          size="large"
                          options={(employee || []).map((item) => ({
                            value: item._id,
                            label: `${item.firstName} ${item.lastName} (${item.email})`,
                          }))}
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
                            console.log("Selected Id ", value);
                            form.setFieldValue("assignID", value);
                          }}
                          // onBlur={() => form.setFieldTouched("assignID", true)}
                        />
                      </ConfigProvider>
                    )}
                  </Field>
                </Col>
              </Row>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AssignUser;
