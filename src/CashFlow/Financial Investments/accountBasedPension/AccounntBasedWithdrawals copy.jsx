import React, { useEffect, useState } from "react";
import DynamicTableRow from "../../../Components/Assets/Dynamic/DynamicTableRow";
import { Form, Formik } from "formik";
import { Row, Table } from "react-bootstrap";

const AccounntBasedWithdrawals = (props) => {
  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let initialValues = {
    contributionsToFund: "",
    year: "",
    amount: "",
  };

  let fillInitialValues = (setFieldValue) => {
    console.log(props.modalObject);
    if (props.modalObject.values[props.modalObject.key]) {
      let Data = props.modalObject.values[props.modalObject.key];
      setFieldValue("contributionsToFund", Data.contributionsToFund);
      setFieldValue("year", Data.year);
      setFieldValue("amount", Data.amount);
    }
  };

  let onSubmit = (values) => {
    console.log(JSON.stringify(values));

    props.setFieldValue(props.modalObject.key, values);

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  const yearsIncludedArray = Array.from({ length: 30 }, (_, i) => {
    return {
      value: (i + 1).toString(),
      label: ("Year " + (i + 1)).toString(),
    };
  });

  const contributionsFundOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "SMSF", label: "SMSF" },
  ];

  let handleInnerModal = (title, values, key, stakeHolder) => {
    console.log(title, values, key, stakeHolder);
    setModalObject({
      title,
      values,
      key,
      stakeHolder: props.modalObject.stakeHolder,
    });
    setFlagState(true);
  };

  let rowConfig = [
    {
      type: "plainText2.0",
      value: parseFloat(props.modalObject.key.match(/\d+/)?.[0] || 0) + 1,
      // styleSet: { fontWeight: "800", fontSize: "16px" },
    },
    {
      name: "contributionsToFund",
      type: "select",
      options: contributionsFundOptions,
      placeholder: "Contributions To Fund",
    },
    {
      name: "year",
      type: "select",
      options: yearsIncludedArray,
      placeholder: "Year",
    },
    {
      name: "amount",
      type: "number-toComma",
      placeholder: "Amount",
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
                          <th>No#</th>
                          <th>Contributions To Fund</th>
                          <th>Year</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <DynamicTableRow
                          rowConfig={rowConfig}
                          values={values}
                          setFieldValue={setFieldValue}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          handleInnerModal={handleInnerModal}
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

export default AccounntBasedWithdrawals;
