import React, { useEffect, useState } from "react";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Row, Table } from "react-bootstrap";
import { defaultUrl, Subscriptions } from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
} from "../Assets/Api/Api";

const SubscriptionForms = (props) => {
  let DefaultUrl = useRecoilValue(defaultUrl);
  let [isDisabled, setIsdisabled] = useState(false);
  let [isDisabledPlanCod, setIsdisabledPlanCod] = useState(false);
  let [subscriptions, setSubscriptions] = useRecoilState(Subscriptions);

  let initialValues = {
    planName: "",
    planCode: "",
    description: "",
    price: "",
  };

  let fillInitialValues = (setFieldValue) => {
    // console.log(props.modalObject);
    if (props.modalObject.Action.toLowerCase() == "edit") {
      let Data = props.modalObject.row;
      setFieldValue("planName", Data.planName);
      setFieldValue("planCode", Data.planCode);
      setFieldValue("description", Data.description);
      setFieldValue("price", Data.price);
      setIsdisabledPlanCod(true);
    } else if (props.modalObject.Action.toLowerCase() == "view") {
      let Data = props.modalObject.row;
      setFieldValue("planName", Data.planName);
      setFieldValue("planCode", Data.planCode);
      setFieldValue("description", Data.description);
      setFieldValue("price", Data.price);
      setIsdisabled(true);
    }
  };

  let onSubmit = async (values, { resetForm }) => {
    try {
      let res = "";
      if (props.modalObject.Action.toLowerCase() == "newsubscription") {
        res = await PostAxios(DefaultUrl + "/api/subscriptionPlan/Add", values);
        if (res) {
          setSubscriptions((prev) => [...prev, res]);
          openNotificationSuccess(
            "success",
            "topRight",
            "New Plan Added",
            "New subscription plan is added"
          );
        }
      } else if (props.modalObject.Action.toLowerCase() == "edit") {
        values._id = props.modalObject.row._id;
        values.status = props.modalObject.row.status;
        res = await PatchAxios(
          DefaultUrl + "/api/subscriptionPlan/Update",
          values
        );
        if (res) {
          setSubscriptions((prev) =>
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

  let rowConfig = [
    {
      name: "planName",
      type: "text",
      placeholder: "Plan Name",
      disabled: isDisabled,
    },
    {
      name: "planCode",
      type: "text",
      placeholder: "Plan Code",
      disabled:
        isDisabled == true
          ? isDisabled
          : isDisabledPlanCod == true
          ? isDisabledPlanCod
          : false,
    },
    {
      name: "price",
      type: "number-toComma",
      placeholder: "Price",
      disabled: isDisabled,
    },
    {
      name: "description",
      type: "text",
      placeholder: "Description",
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
            <Row>
              <div className="col-md-12 All_Client reportSection">
                <div className="row justify-content-center mt-4">
                  <Table striped bordered responsive hover>
                    <thead>
                      <tr>
                        <th>Plan Name</th>
                        <th>Plan Code</th>
                        <th>Price</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <DynamicTableRow
                        rowConfig={rowConfig}
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

export default SubscriptionForms;
