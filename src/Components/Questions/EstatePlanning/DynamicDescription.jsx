import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Row } from "react-bootstrap";

const DynamicDescription = (props) => {
  let initialValues = { description: "" };

  // const fillInitialValues = (setFieldValue) => {
  //   console.log(props.modalObject, "modalObject in DynamicDescription");

  //   const index = parseFloat(
  //     props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
  //   );
  //   const BaseKey = props.modalObject.stakeHolder.split(".");

  //   console.log("BaseKey:", BaseKey, "Index:", index);

  //   let editDetails =
  //     props.modalObject.values?.[BaseKey[0]]?.[BaseKey[1].split("[")[0]]?.[
  //       index
  //     ]?.[props.modalObject.key + "description"] || "";

  //   if (editDetails) {
  //     setFieldValue("description", editDetails || "");
  //   } else {
  //     props.setIsEditing(true);
  //   }
  // };

  // const fillInitialValues = (setFieldValue) => {
  //   console.log(props.modalObject, "modalObject in DynamicDescription");

  //   const { stakeHolder, values, key } = props.modalObject;

  //   // Extract base key (client / partner)
  //   const baseKey = stakeHolder.split(".")[0];

  //   // Detect index if exists (client[1])
  //   const indexMatch = baseKey.match(/\[(\d+)\]/);
  //   const index = indexMatch ? Number(indexMatch[1]) : null;

  //   // Clean base key (client / partner)
  //   const cleanBaseKey = baseKey.replace(/\[\d+\]/, "");

  //   let editDetails = "";

  //   console.log(cleanBaseKey, index, key);

  //   if (index !== null) {
  //     // Array-based (client[1])
  //     console.log(
  //       cleanBaseKey,
  //       index,
  //       key,
  //       values?.[cleanBaseKey]?.[index]?.[key + "description"]
  //     );
  //     editDetails =
  //       values?.[cleanBaseKey]?.[index]?.[key + "description"] || "";
  //   } else {
  //     // Object-based (client.)
  //     editDetails = values?.[cleanBaseKey]?.[key + "description"] || "";
  //   }
  //   console.log(values?.[cleanBaseKey]?.[key + "description"]);

  //   if (editDetails) {
  //     setFieldValue("description", editDetails);
  //   } else {
  //     props.setIsEditing(true);
  //   }
  // };

  const fillInitialValues = (setFieldValue) => {
    const modal = props.modalObject;

    if (!modal || !modal.stakeHolder || !modal.values || !modal.key) {
      props.setIsEditing(true);
      return;
    }

    const { stakeHolder, values, key } = modal;

    // Remove trailing dot → client.PersonalInsurance[0]
    const cleanStakeHolder = stakeHolder.replace(/\.$/, "");

    // Split path → ["client", "PersonalInsurance[0]"]
    const pathParts = cleanStakeHolder.split(".");

    let current = values;

    // Walk through object dynamically
    for (let part of pathParts) {
      const match = part.match(/^(\w+)(?:\[(\d+)\])?$/);

      if (!match) {
        current = undefined;
        break;
      }

      const prop = match[1];
      const index = match[2] !== undefined ? Number(match[2]) : null;

      current = current?.[prop];

      if (index !== null) {
        current = current?.[index];
      }

      if (!current) break;
    }

    const editDetails = current?.[`${key}description`] || "";

    if (editDetails) {
      setFieldValue("description", editDetails);
      props.setIsEditing(false);
    } else {
      props.setIsEditing(true);
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
