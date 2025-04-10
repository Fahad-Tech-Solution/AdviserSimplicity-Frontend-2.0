import React, { useEffect, useState } from "react";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { Form, Formik } from "formik";
import { Row, Table } from "react-bootstrap";

const CFSMSFInsurancePremiums = (props) => {
  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let initialValues = {
    insurancePremiums: "",
    yearsInclude: "",
    indexationOfPremiums: "2.50%",
  };

  let fillInitialValues = (setFieldValue) => {
    if (
      props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]
    ) {
      let SubObj =
        props.modalObject.values[
          props.modalObject.stakeHolder.replace(".", "")
        ];
      if (SubObj[props.modalObject.key + "Obj"]) {
        let Data = SubObj[props.modalObject.key + "Obj"];
        setFieldValue("insurancePremiums", Data.insurancePremiums);
        setFieldValue("yearsInclude", Data.yearsInclude);
        setFieldValue("indexationOfPremiums", Data.indexationOfPremiums);
      }
    }
  };

  let onSubmit = (values) => {
    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key + "Obj",
      values
    );

    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  const yearsIncludedArray = Array.from({ length: 31 }, (_, i) => ({
    value: i.toString(),
    label: ("Year " + i).toString(),
  }));

  const indexation = Array.from({ length: 31 }, (_, i) => ({
    value: (i * 0.5).toFixed(2) + "%",
    label: (i * 0.5).toFixed(2) + "%",
  }));

  let rowConfig = [
    {
      type: "plainText",
      text: props.modalObject.stakeHolder.replace(".", ""),
      styleSet: { fontWeight: "800", fontSize: "16px" },
    },
    {
      name: "insurancePremiums",
      type: "number-toComma",
      placeholder: "Insurance Premiums",
    },
    {
      name: "yearsInclude",
      type: "select",
      options: yearsIncludedArray,
      placeholder: "Years to Include",
    },
    {
      name: "indexationOfPremiums",
      type: "select",
      options: indexation,
      placeholder: "Indexation of Premiums",
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
                          <th>Member</th>
                          <th>Insurance Premiums</th>
                          <th>Years to Include</th>
                          <th>Indexation of Premiums</th>
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

export default CFSMSFInsurancePremiums;
