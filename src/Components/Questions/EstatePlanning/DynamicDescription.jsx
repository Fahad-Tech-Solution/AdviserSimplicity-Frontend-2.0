import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Row } from "react-bootstrap";

const DynamicDescription = (props) => {
  let initialValues = { description: "" };

  const fillInitialValues = (setFieldValue) => {
    console.log(props.modalObject, "modalObject in DynamicDescription");

    const index = parseFloat(
      props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
    );
    const BaseKey = props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "");

    let editDetails =
      props.modalObject.values?.[BaseKey]?.[index]?.[
        props.modalObject.key + "description"
      ];

    if (editDetails) {
      setFieldValue("description", editDetails || "");
    }
  };

  let onSubmit = async (values) => {
    props.setFieldValue(
      `${props.modalObject.stakeHolder}${props.modalObject.key}description`,
      values.description
    );

    // if (props.modalObject.values.owner === "together") {
    //   props.setFieldValue(
    //     `partner.${props.modalObject.key}`,
    //     values.description
    //   );
    // }

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing(!props.isEditing);
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
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-start">
                  <div className="col-md-12">
                    <label className="fw-bold">Description</label>
                    <Field
                      type="text"
                      as="textarea"
                      name="description"
                      className="form-control mt-2 inputDesignDoubleInput"
                      disabled={!props.isEditing}
                    ></Field>
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

export default DynamicDescription;
