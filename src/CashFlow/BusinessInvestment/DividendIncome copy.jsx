import React, { useEffect, useState } from "react";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { Form, Formik } from "formik";
import { Row, Table } from "react-bootstrap";

const DividendIncome = (props) => {
  let [layoutSwitchFlag, setLayoutSwitchFlag] = useState(
    props.modalObject.title
  );

  let initialValues = {
    dividendIncome: "",
    franking: "",
    includeFromYear: "1",
    upUntilYear: "30",
    takeAsCashFromUntilYear: "1",
    indexation: "2.50%",
  };

  let fillInitialValues = (setFieldValue) => {
    // console.log(props.modalObject);
    if (
      props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]
    ) {
      let SubObj =
        props.modalObject.values[
          props.modalObject.stakeHolder.replace(".", "")
        ];
      if (SubObj[props.modalObject.key + "Obj"]) {
        let Data = SubObj[props.modalObject.key + "Obj"];
        setFieldValue("dividendIncome", Data.dividendIncome);
        setFieldValue("franking", Data.franking);
        setFieldValue("includeFromYear", Data.includeFromYear);
        setFieldValue("upUntilYear", Data.upUntilYear);
        if (props.modalObject.sourceObj.title !== "Bucket Company") {
          setFieldValue(
            "takeAsCashFromUntilYear",
            Data.takeAsCashFromUntilYear
          );
        }
        setFieldValue("indexation", Data.indexation);

        if (props.modalObject.sourceObj.title === "Bucket Company") {
          setFieldValue("clientOfDividend", Data.clientOfDividend);
          setFieldValue("partnerOfDividend", Data.partnerOfDividend);
        }
      }
    }
  };

  let onSubmit = (values) => {
    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key,
      values.dividendIncome
    );
    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key + "Obj",
      values
    );

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  const yearsArray = Array.from({ length: 31 }, (_, i) => {
    return {
      value: i.toString(),
      label: ("Year " + i).toString(),
    };
  });

  const indexation = Array.from({ length: 21 }, (_, i) => ({
    value: (i * 0.5).toFixed(2) + "%",
    label: (i * 0.5).toFixed(2) + "%",
  }));

  const [rowConfig, setRowConfig] = useState(() => {
    let OriginalArray = [
      {
        name: "dividendIncome",
        type: "number-toComma",
        placeholder: "Dividend Income",
      },
      {
        name: "franking",
        type: "number-toPercent",
        placeholder: "Franking",
      },
      {
        name: "includeFromYear",
        placeholder: "Include From Year",
        type: "select",
        options: yearsArray,
      },
      {
        name: "upUntilYear",
        placeholder: "Up Until Year",
        type: "select",
        options: yearsArray,
      },
      {
        name: "takeAsCashFromUntilYear",
        placeholder: "Take As Cash From Until Year",
        type: "select",
        options: yearsArray,
      },
      {
        name: "indexation",
        type: "select",
        placeholder: "Indexation",
        options: indexation,
      },
    ];

    if (props.modalObject.sourceObj.title === "Bucket Company") {
      OriginalArray = OriginalArray.filter(
        (item) => item.name !== "takeAsCashFromUntilYear"
      );

      OriginalArray.push(
        {
          name: "clientOfDividend",
          placeholder: "Client % of Dividend",
          type: "number-toPercent",
        },
        {
          name: "partnerOfDividend",
          placeholder: "Partner % of Dividend",
          type: "number-toPercent",
        }
      );
    }

    return OriginalArray;
  });

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
                          <th>Dividend Income</th>
                          <th>Franking</th>
                          <th>Include From Year</th>
                          <th>Up Until Year</th>
                          {props.modalObject.sourceObj.title !==
                            "Bucket Company" && (
                            <th> Take As Cash From Until Year</th>
                          )}
                          <th>Indexation</th>
                          {props.modalObject.sourceObj.title ===
                            "Bucket Company" && (
                            <React.Fragment>
                              <th>Client % of Dividend</th>
                              <th>Partner % of Dividend</th>
                            </React.Fragment>
                          )}
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

export default DividendIncome;