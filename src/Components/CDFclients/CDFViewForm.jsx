import { ConfigProvider, Descriptions, Divider } from "antd";
import { Form, Formik } from "formik";
import React from "react";
import { toCommaAndDollar } from "../Assets/Api/Api";

const CDFViewForm = (props) => {
  const Data = props?.modalObject?.row || {};

  const sharedItemStyle = {
    style: { textAlign: "left" },
  };

  const clientItems = [
    {
      label: "Name",
      children: `${Data.client?.firstName || ""} ${Data.client?.surname || ""}`,
      ...sharedItemStyle,
    },
    {
      label: "Preferred Name",
      children: Data.client?.preferredName || "--",
      ...sharedItemStyle,
    },
    {
      label: "Date of Birth",
      children: Data.client?.dateOfBirth || "--",
      ...sharedItemStyle,
    },
    {
      label: "Email",
      children: Data.client?.email || "--",
      ...sharedItemStyle,
    },
    {
      label: "Phone Number",
      children: Data.client?.phoneNumber || "--",
      ...sharedItemStyle,
    },
    {
      label: "Relationship Status",
      children: Data.client?.relationshipStatus || "--",
      ...sharedItemStyle,
    },
  ];

  const clientIncomeItems = [
    {
      label: "Employment Income",
      children: toCommaAndDollar(parseFloat(Data.client?.employmentIncome || 0)),
      ...sharedItemStyle,
    },
    {
      label: "Business Income",
      children: toCommaAndDollar(parseFloat(Data.client?.businessIncome || 0)),
      ...sharedItemStyle,
    },
    {
      label: "Centrelink Payments",
      children: toCommaAndDollar(parseFloat(Data.client?.centrelinkPayments || 0)),
      ...sharedItemStyle,
    },
    {
      label: "Super Payments",
      children: toCommaAndDollar(parseFloat(Data.client?.superannuationPayments || 0)),
      ...sharedItemStyle,
    },
  ];

  const partnerItems = [
    {
      label: "Name",
      children: `${Data.partner?.firstName || ""} ${Data.partner?.surname || ""}`,
      ...sharedItemStyle,
    },
    {
      label: "Preferred Name",
      children: Data.partner?.preferredName || "--",
      ...sharedItemStyle,
    },
    {
      label: "Date of Birth",
      children: Data.partner?.dateOfBirth || "--",
      ...sharedItemStyle,
    },
    {
      label: "Email",
      children: Data.partner?.email || "--",
      ...sharedItemStyle,
    },
    {
      label: "Phone Number",
      children: Data.partner?.phoneNumber || "--",
      ...sharedItemStyle,
    },
    {
      label: "Relationship Status",
      children: Data.partner?.relationshipStatus || "--",
      ...sharedItemStyle,
    },
  ];

  const partnerIncomeItems = [
    {
      label: "Employment Income",
      children: toCommaAndDollar(parseFloat(Data.partner?.employmentIncome || 0)),
      ...sharedItemStyle,
    },
    {
      label: "Business Income",
      children: toCommaAndDollar(parseFloat(Data.partner?.businessIncome || 0)),
      ...sharedItemStyle,
    },
    {
      label: "Centrelink Payments",
      children: toCommaAndDollar(parseFloat(Data.partner?.centrelinkPayments || 0)),
      ...sharedItemStyle,
    },
    {
      label: "Super Payments",
      children: toCommaAndDollar(parseFloat(Data.partner?.superannuationPayments || 0)),
      ...sharedItemStyle,
    },
  ];

  return (
    <Formik
      initialValues={props?.modalObject?.row?.areaOfAdvice || {}}
      onSubmit={() => {
        if (props.flagState) {
          props.setFlagState(false);
        }
      }}
      innerRef={props.formRef}
    >
      {() => (
        <Form className="w-100 reportSection">
          <div className="row">
            <h5 className="text-green fontFamily-Inter fw-bold">
              Personal Details
            </h5>

            <Divider orientation="left">Client Data</Divider>
            <Descriptions
              bordered
              column={2}
              size="small"
              items={clientItems}
            />

            <Divider orientation="left">Client Employment & Income</Divider>
            <Descriptions
              bordered
              column={2}
              size="small"
              items={clientIncomeItems}
            />

            <Divider orientation="left">Partner Data</Divider>
            <Descriptions
              bordered
              column={2}
              size="small"
              items={partnerItems}
            />

            <Divider orientation="left">Partner Employment & Income</Divider>
            <Descriptions
              bordered
              column={2}
              size="small"
              items={partnerIncomeItems}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CDFViewForm;
