import { ConfigProvider, Descriptions, Divider } from "antd";
import { Form, Formik } from "formik";
import React from "react";
import { ConvertDate } from "../Components/Assets/Api/Api";

const ViewClient = (props) => {
  const Data = props?.modalObject?.row || {};
  const sharedItemStyle = { style: { textAlign: "left" } };

  const clientItems = [
    {
      label: "Preferred Name",
      children: Data.client?.clientPreferredName || "--",
      ...sharedItemStyle,
    },
    {
      label: "Date of Birth",
      children: ConvertDate(Data.client?.clientDOB) || "--",
      ...sharedItemStyle,
    },
    {
      label: "Age",
      children: Data.client?.clientAge || "--",
      ...sharedItemStyle,
    },
    {
      label: "Gender",
      children: Data.client?.clientGender || "--",
      ...sharedItemStyle,
    },
    {
      label: "Marital Status",
      children: Data.client?.clientMaritalStatus || "--",
      ...sharedItemStyle,
    },
    {
      label: "Email",
      children: Data.client?.Email || "--",
      ...sharedItemStyle,
    },
    {
      label: "Mobile",
      children: Data.client?.clientWorkPhone || "--",
      ...sharedItemStyle,
    },
    {
      label: "Home Address",
      children: Data.client?.clientHomeAddress || "--",
      ...sharedItemStyle,
    },
  ];

  const partnerItems = [
    {
      label: "Preferred Name",
      children: Data.partner?.partnerPreferredName || "--",
      ...sharedItemStyle,
    },
    {
      label: "Date of Birth",
      children: ConvertDate(Data.partner?.partnerDOB) || "--",
      ...sharedItemStyle,
    },
    {
      label: "Age",
      children: Data.partner?.partnerAge || "--",
      ...sharedItemStyle,
    },
    {
      label: "Gender",
      children: Data.partner?.partnerGender || "--",
      ...sharedItemStyle,
    },
    {
      label: "Marital Status",
      children: Data.partner?.partnerMaritalStatus || "--",
      ...sharedItemStyle,
    },
    {
      label: "Email",
      children: Data.partner?.partnerEmail || "--",
      ...sharedItemStyle,
    },
    {
      label: "Mobile",
      children: Data.partner?.partnerWorkPhone || "--",
      ...sharedItemStyle,
    },
    {
      label: "Home Address",
      children: Data.partner?.partnerHomeAddress || "--",
      ...sharedItemStyle,
    },
  ];

  return (
    <Formik
      initialValues={{}}
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
              Client & Partner Information
            </h5>

            <Divider orientation="left">Client Information</Divider>
            <Descriptions
              bordered
              column={2}
              size="small"
              items={clientItems}
            />
            {(Data.client?.clientMaritalStatus).toLowerCase() !== "single" &&
              (Data.client?.clientMaritalStatus).toLowerCase() !== "widowed" &&
              Data?.partner?.preferredName !== "" && (
                <>
                  <Divider orientation="left">Partner Information</Divider>
                  <Descriptions
                    bordered
                    column={2}
                    size="small"
                    items={partnerItems}
                  />
                </>
              )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ViewClient;
