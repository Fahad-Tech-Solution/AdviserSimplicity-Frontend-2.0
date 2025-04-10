import React, { useEffect, useState } from "react";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { Form, Formik } from "formik";
import { Row, Table } from "react-bootstrap";

const ApplySpouseContribution = (props) => {
  let initialValues = {
    yearToCommence: "",
    yearsToInclude: "",
  };

  let fillInitialValues = (setFieldValue) => {
    console.log(props.modalObject);
    if (props.modalObject.values[props.modalObject.key + "Obj"]) {
      let Data = props.modalObject.values[props.modalObject.key + "Obj"];
      setFieldValue("yearToCommence", Data.yearToCommence);
      setFieldValue("yearsToInclude", Data.yearsToInclude);
    }
  };

  let onSubmit = (values) => {
    props.setFieldValue(props.modalObject.key + "Obj", values);

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  const yearsIncludedArray = Array.from({ length: 31 }, (_, i) => {
    return {
      value: i.toString(),
      label: ("Year " + i).toString(),
    };
  });

  let rowConfig = [
    {
      type: "plainText",
      text: props.modalObject.stakeHolder.replace(".", ""),
      styleSet: { fontWeight: "800", fontSize: "16px" },
    },
    {
      name: "yearToCommence",
      type: "select",
      options: yearsIncludedArray,
      placeholder: "Year to Commence",
    },
    {
      name: "yearsToInclude",
      type: "select",
      options: yearsIncludedArray,
      placeholder: "Years to Include",
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
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="mt-4">
                    <Table striped bordered responsive hover>
                      <thead>
                        <tr>
                          <th>Owner</th>
                          <th>Year to Commence</th>
                          <th>Years to Include</th>
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
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ApplySpouseContribution;
