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

const AdviserFrom = (props) => {
  let initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    paymentMethod: "",
    paymentRaferenceNo: "",
    planID: "",
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
      // setFieldValue("subscriptionName", Data.subscriptionName);
      setIsdisabledPlanCod(true);
    } else if (props.modalObject.Action.toLowerCase() == "view") {
      let Data = props.modalObject.row;
      setFieldValue("firstName", Data.firstName);
      setFieldValue("lastName", Data.lastName);
      setFieldValue("email", Data.email);
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
          let obj = {
            ...res.user,
            ...res.subscription,
          };

          setAdvisers((prev) => [...prev, obj]);
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
      name: "address",
      type: "text",
      placeholder: "Address",
    },
    {
      name: "paymentMethod",
      type: "select",
      placeholder: "Payment Method",
      options: [
        { value: "Cash", label: "Cash" },
        { value: "Online", label: "Online" },
      ],
    },
    {
      name: "paymentRaferenceNo",
      type: "text",
      placeholder: "Payment Raference No",
      disabled: true,
    },
    {
      name: "planID",
      type: "select",
      placeholder: "Subscription Plan Name",
      options: subscriptions
        .filter((item) => item.isActive)
        .map((item) => ({
          value: item._id,
          label: `${item.planName} (${item.planCode})`,
        })),
    },
    {
      name: "subscriptionMonths",
      type: "select",
      placeholder: "Subscription Months",
      options: Array.from({ length: 12 }, (_, i) => ({
        value: (i + 1).toString(), // e.g., "1", "2", ...
        label: `${i + 1} Month${i === 0 ? "" : "s"}`, // "1 Month", "2 Months", ...
      })),
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
                <div className="row justify-content-center mt-4">
                  <Table striped bordered responsive hover>
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Address</th>
                        <th>Phone number</th>
                        <th>Address</th>
                        <th>Payment Method</th>
                        <th>Payment Raference No</th>
                        <th>Subscription Plan Name</th>
                        <th>Subscription Months</th>
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
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AdviserFrom;
