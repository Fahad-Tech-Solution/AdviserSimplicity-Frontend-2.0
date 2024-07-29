import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { PatchAxios, PostAxios } from "../../Assets/Api/Api";
import DatePicker from "react-datepicker";

const FamilyPensionBenefits = (props) => {
  let initialValues = props.modalObject.editArray.length
    ? { NumberOfMap: props.modalObject.editArray.length }
    : { NumberOfMap: "" };

  const options = ["Zeller"];

  // useEffect(() => {
  //     if (initialValues.NumberOfMap) {
  //         generateFields(initialValues.NumberOfMap);
  //     }
  // }, [initialValues.NumberOfMap]);

  const [dynamicFields, setDynamicFields] = useState([]);

  // const generateFields = (iteration) => {
  //   const upTill = parseFloat(iteration);
  //   const rows = [];

  //   for (let i = 0; i < upTill; i++) {
  //     rows.push(
  //       <tr key={i}>
  //         <td>{1 + i}</td>
  //         <td>
  //           <DatePicker
  //             className="form-control inputDesign shadow"
  //             showIcon
  //             id="commencementDate"
  //             name="commencementDate"
  //             selected={values.commencementDate}
  //             onChange={(date) => setFieldValue("commencementDate", date)}
  //             dateFormat="dd/MM/yyyy"
  //             placeholderText="dd/mm/yyyy"
  //             maxDate={new Date()}
  //             showMonthDropdown
  //             showYearDropdown
  //             dropdownMode="select"
  //             onBlur={handleBlur}
  //             wrapperClassName="w-100"
  //           />
  //         </td>
  //         <td></td>
  //         <td></td>
  //         <td>
  //           <Field
  //             type="number"
  //             placeholder="Tax Free component"
  //             id={`taxFreeComponent${i}`}
  //             name={`taxFreeComponent${i}`}
  //             className="form-control inputDesign"
  //           />
  //         </td>
  //         <td>
  //           <Field
  //             type="text"
  //             placeholder="Taxable component"
  //             id={`taxableComponent${i}`}
  //             name={`taxableComponent${i}`}
  //             className="form-control inputDesign"
  //             //   disabled
  //           />
  //         </td>
  //         <td>
  //           <Field
  //             type="number"
  //             placeholder="Deductible amount"
  //             id={`deductibleAmount${i}`}
  //             name={`deductibleAmount${i}`}
  //             className="form-control inputDesign"
  //           />
  //         </td>
  //         <td>
  //           <Field
  //             type="number"
  //             placeholder="Lumpsum Withdrawal Taken"
  //             id={`LumpsumWithdrawalTaken${i}`}
  //             name={`LumpsumWithdrawalTaken${i}`}
  //             className="form-control inputDesign"
  //           />
  //         </td>
  //         {/* <td>
  //           <Field
  //             as="select"
  //             id={`investmentOption${i}`}
  //             name={`investmentOption${i}`}
  //             className="form-select inputDesign"
  //           >
  //             <option value={""}>Please Select</option>
  //             {options.map((elem, index) => {
  //               return (
  //                 <option key={index} value={elem}>
  //                   {elem}
  //                 </option>
  //               );
  //             })}
  //           </Field>
  //         </td> */}
  //         {/* <td>
  //           <Field
  //             type="text"
  //             placeholder="Investment Code"
  //             id={`taxableComponent${i}`}
  //             name={`taxableComponent${i}`}
  //             className="form-control inputDesign"
  //             disabled
  //           />
  //         </td>
  //         <td>
  //           <Field
  //             type="number"
  //             placeholder="Investment Value"
  //             id={`taxFreeComponent${i}`}
  //             name={`taxFreeComponent${i}`}
  //             className="form-control inputDesign"
  //           />
  //         </td> */}
  //       </tr>
  //     );
  //   }

  //   setDynamicFields(rows);
  // };

  const fillInitialValues = (setFieldValue) => {
    if (props.modalObject.editArray.length) {
      // generateFields(props.modalObject.editArray.length);
    }

    // setTimeout(() => {

    if (props.modalObject.editArray) {
      props.modalObject.editArray.forEach((data, i) => {
        if (data) {
          console.log(data.investmentOption);
          setFieldValue(`investmentOption${i}`, data.investmentOption || "");
          setFieldValue(`taxableComponent${i}`, data.taxableComponent || "");
          setFieldValue(`taxFreeComponent${i}`, data.taxFreeComponent || "");
          setFieldValue(`deductibleAmount${i}`, data.deductibleAmount || "");
          setFieldValue(
            `LumpsumWithdrawalTaken${i}`,
            data.LumpsumWithdrawalTaken || ""
          );
        }
      });
    }
    // }, 500);
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
        investmentOption: values[`investmentOption${i}`] || "",
        taxableComponent: values[`taxableComponent${i}`] || "",
        taxFreeComponent: values[`taxFreeComponent${i}`] || "",
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
      total - 475721
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
                                  <DatePicker
                                    className="form-control inputDesign shadow"
                                    showIcon
                                    id={`originalPurchaseDate${i}`}
                                    name={`originalPurchaseDate${i}`}
                                    selected={values[`originalPurchaseDate${i}`]}
                                    onChange={(date) =>
                                      setFieldValue(
                                        `originalPurchaseDate${i}`,
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
                                {/* <td>
                                                              <Field
                                                                as="select"
                                                                id={`investmentOption${i}`}
                                                                name={`investmentOption${i}`}
                                                                className="form-select inputDesign"
                                                              >
                                                                <option value={""}>Please Select</option>
                                                                {options.map((elem, index) => {
                                                                  return (
                                                                    <option key={index} value={elem}>
                                                                      {elem}
                                                                    </option>
                                                                  );
                                                                })}
                                                              </Field>
                                                            </td> */}
                                {/* <td>
                                                              <Field
                                                                type="text"
                                                                placeholder="Investment Code"
                                                                id={`taxableComponent${i}`}
                                                                name={`taxableComponent${i}`}
                                                                className="form-control inputDesign"
                                                                disabled
                                                              />
                                                            </td>
                                                            <td>
                                                              <Field
                                                                type="number"
                                                                placeholder="Investment Value"
                                                                id={`taxFreeComponent${i}`}
                                                                name={`taxFreeComponent${i}`}
                                                                className="form-control inputDesign"
                                                              />
                                                            </td> */}
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

export default FamilyPensionBenefits;
