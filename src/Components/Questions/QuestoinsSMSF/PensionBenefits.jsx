import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { defaultUrl } from "../../../Store/Store";
import DatePicker from "react-datepicker";

const PensionBenefits = (props) => {
  let initialValues = props.modalObject.editArray.length
    ? { NumberOfMap: props.modalObject.editArray.length }
    : { NumberOfMap: "" };



  const [dynamicFields, setDynamicFields] = useState([]);

  const fillInitialValues = (setFieldValue) => {
    if (props.modalObject.editArray.length) {
      let arr = [];

      for (let i = 0; i < props.modalObject.editArray.length; i++) {
        arr.push("");
      }

      setDynamicFields(arr);
    }

    if (props.modalObject.editArray) {
      props.modalObject.editArray.forEach((data, i) => {
        if (data) {
          console.log(data.investmentOption);
          setFieldValue(`commencementDate${i}`, data.commencementDate || "");
          setFieldValue(`originalPurchaseDate${i}`, data.originalPurchaseDate || "");
          setFieldValue(`eligibleServiceDate${i}`, data.eligibleServiceDate || "");
          setFieldValue(`taxFreeComponent${i}`, data.taxFreeComponent || "");
          setFieldValue(`taxableComponent${i}`, data.taxableComponent || "");
          setFieldValue(`deductibleAmount${i}`, data.deductibleAmount || "");
          setFieldValue(`LumpsumWithdrawalTaken${i}`, data.LumpsumWithdrawalTaken || "");
        }
      });
    }

  };

  let handleInput = (e, setFieldValue) => {
    const value = e.target.value > 10 ? 10 : e.target.value;
    setFieldValue(e.target.id, value);

    let arr = [];

    for (let i = 0; i < value; i++) {
      arr.push("");
    }

    setDynamicFields(arr);

    // generateFields(value);
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    console.log(values);

    const newEntries = [];

    let loopLength = parseFloat(values.NumberOfMap);

    // Iterate through each map entry and create a new object
    for (let i = 0; i < loopLength; i++) {
      // alert("loop chala")
      const newEntry = {
        commencementDate: values[`commencementDate${i}`] || "",
        originalPurchaseDate: values[`originalPurchaseDate${i}`] || "",
        eligibleServiceDate: values[`eligibleServiceDate${i}`] || "",
        taxFreeComponent: values[`taxFreeComponent${i}`] || "",
        taxableComponent: values[`taxableComponent${i}`] || "",
        deductibleAmount: values[`deductibleAmount${i}`] || "",
        LumpsumWithdrawalTaken: values[`LumpsumWithdrawalTaken${i}`] || "",
      };
      newEntries.push(newEntry);
    }

    // Log the new entries to verify
    console.log(newEntries);

    let total = newEntries.reduce(
      (total, entry) => total + entry.taxFreeComponent,
      0
    );

    props.setFieldValue(
      `${props.modalObject.key}${props.modalObject.index}`,
      newEntries
    );
    props.setFieldValue(
      `${props.modalObject.key3}${props.modalObject.index}`,
      total
    );
    props.setFieldValue(
      `${props.modalObject.mainKey}${props.modalObject.index}`,
      total 
    );

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
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
        }, [values.NumberOfMap]);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="col-md-7">
                    <p className="text-end mt-1">
                      {props.modalObject.question}
                    </p>
                  </div>
                  <div className="col-md-3">
                    <Field
                      type="number"
                      id="NumberOfMap"
                      name="NumberOfMap"
                      className="form-control inputDesign"
                      onChange={(e) => handleInput(e, setFieldValue)}
                    />
                  </div>
                  {values.NumberOfMap && (
                    <div className="mt-4">
                      <Table striped bordered responsive hover>
                        <thead>
                          <tr>
                            <th>No#</th>
                            <th>Commencement Date</th>
                            <th>Original Purchase Price</th>
                            <th>Eligible Service Date</th>
                            <th>Tax Free component </th>
                            <th>Taxable component </th>
                            <th>Deductible amount</th>
                            <th>Lumpsum Withdrawal Taken</th>
                          </tr>
                        </thead>
                        <tbody>
                          {" "}
                          {dynamicFields.map((elem, i) => {
                            return (
                              <tr key={i}>
                                <td>{1 + i}</td>
                                <td>
                                  <DatePicker
                                    className="form-control inputDesign shadow"
                                    showIcon
                                    id={`commencementDate${i}`}
                                    name={`commencementDate${i}`}
                                    selected={values[`commencementDate${i}`]}
                                    onChange={(date) =>
                                      setFieldValue(`commencementDate${i}`, date)
                                    }
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="dd/mm/yyyy"
                                    maxDate={new Date()}
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    onBlur={handleBlur}
                                    wrapperClassName="w-100"
                                  />
                                </td>
                                <td>
                                  {" "}
                                  <Field
                                  type="number"
                                  placeholder="Tax Free component"
                                  id={`originalPurchaseDate${i}`}
                                  name={`originalPurchaseDate${i}`}
                                  className="form-control inputDesign"
                                />
                                </td>
                                <td>
                                  {" "}
                                  <DatePicker
                                    className="form-control inputDesign shadow"
                                    showIcon
                                    id={`eligibleServiceDate${i}`}
                                    name={`eligibleServiceDate${i}`}
                                    selected={values[`eligibleServiceDate${i}`]}
                                    onChange={(date) =>
                                      setFieldValue(
                                        `eligibleServiceDate${i}`,
                                        date
                                      )
                                    }
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="dd/mm/yyyy"
                                    maxDate={new Date()}
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    onBlur={handleBlur}
                                    wrapperClassName="w-100"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="Tax Free component"
                                    id={`taxFreeComponent${i}`}
                                    name={`taxFreeComponent${i}`}
                                    className="form-control inputDesign"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    placeholder="Taxable component"
                                    id={`taxableComponent${i}`}
                                    name={`taxableComponent${i}`}
                                    className="form-control inputDesign"
                                  //   disabled
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="Deductible amount"
                                    id={`deductibleAmount${i}`}
                                    name={`deductibleAmount${i}`}
                                    className="form-control inputDesign"
                                  />
                                </td>
                                <td>
                                  <Field
                                    type="number"
                                    placeholder="Lumpsum Withdrawal Taken"
                                    id={`LumpsumWithdrawalTaken${i}`}
                                    name={`LumpsumWithdrawalTaken${i}`}
                                    className="form-control inputDesign"
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </div>
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PensionBenefits;
