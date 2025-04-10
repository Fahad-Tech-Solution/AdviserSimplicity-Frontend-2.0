import React, { useEffect, useState } from "react";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { Form, Formik } from "formik";
import { Row, Table } from "react-bootstrap";

const RegularContributions = (props) => {
  let initialValues = {
    contribution: "",
    regularContributions: "",
    contributeFromYear: "",
    contributeUpUntil: "",
    indexation: "",
  };

  let fillInitialValues = (setFieldValue) => {
    console.log(props.modalObject);
    if (
      props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]
    ) {
      let SubObj =
        props.modalObject.values[
          props.modalObject.stakeHolder.replace(".", "")
        ];
      if (SubObj[props.modalObject.key + "Obj"]) {
        let Data = SubObj[props.modalObject.key + "Obj"];
        setFieldValue("contribution", Data.contribution);
        setFieldValue("regularContributions", Data.regularContributions);
        setFieldValue("contributeFromYear", Data.contributeFromYear);
        setFieldValue("contributeUpUntil", Data.contributeUpUntil);
        setFieldValue("indexation", Data.indexation);
      }
    }
  };

  let onSubmit = (values) => {
    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key + "Obj",
      values
    );

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  const loanTermOptions = Array.from({ length: 31 }, (_, i) => ({
    value: i,
    label: ("Year " + i).toString(),
  }));

  const indexation = Array.from({ length: 21 }, (_, i) => ({
    value: (i * 0.5).toFixed(2) + "%",
    label: (i * 0.5).toFixed(2) + "%",
  }));

  let rowConfig = [
    {
      name: "contribution",
      type: "number-toComma",
      placeholder: "Contribution",
    },
    {
      name: "regularContributions",
      type: "number-toComma",
      placeholder: "Regular contributions p.a",
    },
    {
      name: "contributeFromYear",
      type: "select",
      placeholder: "Contribute from Year",
      options: loanTermOptions,
    },
    {
      name: "contributeUpUntil",
      type: "select",
      placeholder: "Contribute Up Until",
      options: loanTermOptions,
    },
    {
      name: "indexation",
      type: "select",
      placeholder: "Indexation",
      options: indexation,
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
                          <th>Contribution</th>
                          <th>Regular contributions p.a</th>
                          <th>Contribute from Year</th>
                          <th>Contribute Up Until</th>
                          <th>Indexation</th>
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

export default RegularContributions;
