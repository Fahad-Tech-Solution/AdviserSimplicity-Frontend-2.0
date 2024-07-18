import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./businessTextStructure.css"
import plus from "./images/plus.svg";
import notebook from "./images/notebook.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import MyForm from "./test1";
let validationSchema = Yup.object({
  // clientValidation
  ClientSalaryIncome: Yup.number().when("ClientEdit",{
    is:'Yes',
    then:schema => schema.required('Required').min(0, 'Must be a positive number'),
    otherwise: schema => schema.min(0, 'Must be a positive number').nullable(true),
  }),
  ClientIncludeFromYearSalary: Yup.string().when("ClientEdit", {
    is:'Yes',
    then:schema => schema.required("Required"),
    otherwise: schema => schema.notRequired(),
  }),
  ClientupUntilYearSalary:Yup.string().when("ClientEdit", {
    is:'Yes',
    then: schema => schema.required("Required").test('is-greater', 'To Year must be greater than From Year', function(value) {
      const fromYear = parseInt(this.resolve(Yup.ref('ClientIncludeFromYearSalary')));
      const toYear = parseInt(value);
      return toYear >= fromYear;
          }),
    otherwise: schema => schema.notRequired().nullable(true),
  }),

  // ClientupUntilYearSalary: Yup.string().when("ClientEdit", {
  //   is:'Yes',
  //   then: schema => schema
  //     .required("Required")
  //     .test(
  //       "is-greater",
  //       "To Year must be greater than From Year",
  //       function (value) {
  //         const fromYear = parseInt(
  //           this.resolve(Yup.ref("ClientIncludeFromYearSalary"))
  //         );
  //         const toYear = parseInt(value);
  //         return toYear >= fromYear;
  //       }
  //     ),
  //   otherwise:schema => schema
  //     .test(
  //       "is-greater",
  //       "To Year must be greater than From Year",
  //       function (value) {
  //         const fromYear = this.parent.ClientIncludeFromYearSalary;
  //         const toYear = parseInt(value);
  //         return !toYear || toYear >= fromYear;
  //       }
  //     )
  //     .nullable(true),
  // }),
  ClientReducedSalaryIncome: Yup.number().when("ClientEdit", {
    is:'Yes',
    then: schema => schema
      .required("Required")
      .min(0, "Must be a positive number"),
    otherwise: schema => schema
      .min(0, "Must be a positive number")
      .nullable(true),
  }),
  ClientIndexationofSalary: Yup.string().when("ClientEdit", {
    is:'Yes',
    then: schema => schema.required("Required"),
    otherwise: schema => schema.notRequired(),
  }),
  ClientemployerFBTStatus: Yup.string().when("ClientapplySalaryPackaging", {
    is:'Yes',
    then: schema => schema.required("Required"),
    otherwise: schema => schema.notRequired(),
  }),
  ClientCostBaseofCar: Yup.number().when("ClientapplySalaryPackaging", {
  is:'Yes',
    then: schema => schema
      .required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
    otherwise: schema => schema.notRequired(),
  }),

  ClientRunningCostsofCar: Yup.number().when("ClientapplySalaryPackaging", {
  is:'Yes',
    then: schema => schema
      .required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
    otherwise: schema => schema.notRequired(),
  }),
  ClientIndexation: Yup.string().when("ClientapplySalaryPackaging", {
    is:'Yes',
    then: schema => schema.required("Required"),
    otherwise: schema => schema.notRequired(),
  }),
  ClientIncludeFromYearIndexation: Yup.string().when(
    "ClientapplySalaryPackaging",
    {
      is:'Yes',
      then: schema => schema.required("Required"),
      otherwise: schema => schema.notRequired(),
    }
  ),
  // // ClientUpUntilYearIndexation:Yup.string().when("ClientapplySalaryPackaging", {
  // //   is:'Yes',
  // //   then: schema => schema.required("Required"),
  // //   otherwise: Yup.string().notRequired(),
  // // }),

  ClientUpUntilYearIndexation: Yup.string().when(
    "ClientapplySalaryPackaging",
    {
    is:'Yes',
      then:schema => schema
        .required("Required")
        .test(
          "is-greater",
          "To Year must be greater than From Year",
          function (value) {
            const fromYear = parseInt(
              this.resolve(Yup.ref("ClientIncludeFromYearIndexation"))
            );
            const toYear = parseInt(value);
            return toYear >= fromYear;
          }
        ),
      otherwise: schema => schema
       .notRequired()
        .nullable(true),
    }
  ),
  ClientOtherSalary: Yup.number().when("ClientapplySalaryPackaging", {
  is:'Yes',
    then:schema => schema
      .required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
    otherwise: schema => schema.notRequired(),
  }),
  ClientGSTStatus: Yup.string().when("ClientapplySalaryPackaging", {
    is:'Yes',
    then: schema => schema.required("Required"),
    otherwise: schema => schema.notRequired(),
  }),
  ClientIncludeFromYearGST: Yup.string().when("ClientapplySalaryPackaging", {
    is:'Yes',
    then: schema => schema.required("Required"),
    otherwise:schema => schema.notRequired(),
  }),
  // ClientUpUntilYearGST:Yup.string().when("ClientapplySalaryPackaging", {
  //   is:'Yes',
  //   then: schema => schema.required("Required"),
  //   otherwise: Yup.string().notRequired(),
  // }),

  ClientUpUntilYearGST: Yup.string().when("ClientapplySalaryPackaging", {
  is:'Yes',
    then:schema => schema
      .required("Required")
      .test(
        "is-greater",
        "To Year must be greater than From Year",
        function (value) {
          const fromYear = parseInt(
            this.resolve(Yup.ref("ClientIncludeFromYearGST"))
          );
          const toYear = parseInt(value);
          return toYear >= fromYear;
        }
      ),
    otherwise:schema => schema
      .notRequired()
      .nullable(true),
  }),
  // // clientvalidation

  // // partnervalidation
  PartnerSalaryIncome: Yup.number().when("PartnerEdit", {
  is:'Yes',
    then: schema => schema
      .required("Required")
      .min(0, "Must be a positive number"),
    otherwise: schema => schema
      .min(0, "Must be a positive number")
      .nullable(true),
  }),

  PartnerIncludeFromYearSalary: Yup.string().when("PartnerEdit", {
    is:'Yes',
    then: schema => schema.required("Required"),
    otherwise:schema => schema.notRequired(),
  }),
  // // PartnerupUntilYearSalary:Yup.string().when("PartnerEdit", {
  // //   is:'Yes',
  // //   then: schema => schema.required("Required").test('is-greater', 'To Year must be greater than From Year', function(value) {
  // //     const fromYear = parseInt(this.resolve(Yup.ref('PartnerIncludeFromYearSalary')));
  // //     const toYear = parseInt(value);
  // //     return toYear >= fromYear;
  // //         }),
  // //   otherwise: Yup.string().notRequired(),
  // // }),

  PartnerupUntilYearSalary: Yup.string().when("PartnerEdit", {
  is:'Yes',
    then: schema => schema
      .required("Required")
      .test(
        "is-greater",
        "To Year must be greater than From Year",
        function (value) {
          const fromYear = parseInt(
            this.resolve(Yup.ref("PartnerIncludeFromYearSalary"))
          );
          const toYear = parseInt(value);
          return toYear >= fromYear;
        }
      ),
    otherwise: schema => schema
     .notRequired()
      .nullable(true),
  }),
  PartnerReducedSalaryIncome: Yup.number().when("PartnerEdit", {
  is:'Yes',
   then: schema => schema
      .required("Required")
      .min(0, "Must be a positive number"),
    otherwise: schema => schema
      .min(0, "Must be a positive number")
      .nullable(true),
  }),
  PartnerIndexationofSalary: Yup.string().when("PartnerEdit", {
    is:'Yes',
    then: schema => schema.required("Required"),
    otherwise: schema => schema.notRequired(),
  }),
  PartneremployerFBTStatus: Yup.string().when("PartnerApplySalaryPackaging", {
    is:'Yes',
    then: schema => schema.required("Required"),
    otherwise:schema => schema.notRequired(),
  }),
  PartnerCostBaseofCar: Yup.number().when("PartnerApplySalaryPackaging", {
  is:'Yes',
   then: schema => schema
      .required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
    otherwise: schema => schema.notRequired(),
  }),

  PartnerRunningCostsofCar: Yup.number().when("PartnerApplySalaryPackaging", {
  is:'Yes',
   then: schema => schema
      .required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
    otherwise: schema => schema.notRequired(),
  }),
  PartnerIndexation: Yup.string().when("PartnerApplySalaryPackaging", {
    is:'Yes',
    then: schema => schema.required("Required"),
    otherwise:  schema => schema.notRequired(),
  }),
  PartnerIncludeFromYearIndexation: Yup.string().when(
    "PartnerApplySalaryPackaging",
    {
      is:'Yes',
      then: schema => schema.required("Required"),
      otherwise:  schema => schema.notRequired(),
    }
  ),
  // // PartnerUpUntilYearIndexation:Yup.string().when("PartnerApplySalaryPackaging", {
  // //   is:'Yes',
  // //   then: schema => schema.required("Required"),
  // //   otherwise: Yup.string().notRequired(),
  // // }),

  PartnerUpUntilYearIndexation: Yup.string().when(
    "PartnerApplySalaryPackaging",
    {
    is:'Yes',
      then: schema => schema
        .required("Required")
        .test(
          "is-greater",
          "To Year must be greater than From Year",
          function (value) {
            const fromYear = parseInt(
              this.resolve(Yup.ref("PartnerIncludeFromYearIndexation"))
            );
            const toYear = parseInt(value);
            return toYear >= fromYear;
          }
        ),
      otherwise:  schema => schema
        .notRequired()
        .nullable(true),
    }
  ),

  PartnerOtherSalary: Yup.number().when("PartnerApplySalaryPackaging", {
  is:'Yes',
   then: schema => schema
      .required("Required")
      .test(
        "Is positive?",
        "Must be a positive number",
        (value) => value > 0
      ),
    otherwise: schema => schema.notRequired(),
  }),
  PartnerGSTStatus: Yup.string().when("PartnerApplySalaryPackaging", {
    is:'Yes',
    then: schema => schema.required("Required"),
    otherwise: schema => schema.notRequired(),
  }),
  PartnerIncludeFromYearGST: Yup.string().when(
    "PartnerApplySalaryPackaging",
    {
      is:'Yes',
      then: schema => schema.required("Required"),
      otherwise: schema => schema.notRequired(),
    }
  ),
  // // PartnerUpUntilYearGST:Yup.string().when("PartnerApplySalaryPackaging", {
  // //   is:'Yes',
  // //   then: schema => schema.required("Required"),
  // //   otherwise: Yup.string().notRequired(),
  // // }),

  PartnerUpUntilYearGST: Yup.string().when("PartnerApplySalaryPackaging", {
  is:'Yes',
    then: schema => schema
      .required("Required")
      .test(
        "is-greater",
        "To Year must be greater than From Year",
        function (value) {
          const fromYear = parseInt(
            this.resolve(Yup.ref("PartnerIncludeFromYearGST"))
          );
          const toYear = parseInt(value);
          return toYear >= fromYear;
        }
      ),
    otherwise:  schema => schema
      .notRequired()
      .nullable(true),
  }),

  // partnervalidation
});
const EmploymentIncome = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let initialValues = {
    // ClientInitialValue
    ClientEdit: "Yes",
    ClientSalaryIncome: "",
    ClientIncludeFromYearSalary: "",
    ClientupUntilYearSalary: "",
    ClientReducedSalaryIncome: "",
    ClientIndexationofSalary: "",
    ClientapplySalaryPackaging: "No",
    ClientemployerFBTStatus: "",
    ClientCostBaseofCar: "",
    ClientFBTPaidByEmployer: "No",
    ClientRunningCostsofCar: "",
    ClientIndexation: "",
    ClientIncludeFromYearIndexation: "",
    ClientUpUntilYearIndexation: "",
    ClientOtherSalary: "",
    ClientGSTStatus: "",
    ClientIncludeFromYearGST: "",
    ClientUpUntilYearGST: "",

    // ClientInitialValue
    PartnerEdit: "No",
    PartnerSalaryIncome: "",
    PartnerIncludeFromYearSalary: "",
    PartnerupUntilYearSalary: "",
    PartnerReducedSalaryIncome: "",
    PartnerIndexationofSalary: "",
    PartnerApplySalaryPackaging: "No",
    PartneremployerFBTStatus: "",
    PartnerCostBaseofCar: "",
    PartnerFBTPaidByEmployer: "No",
    PartnerRunningCostsofCar: "",
    PartnerIndexation: "",
    PartnerIncludeFromYearIndexation: "",
    PartnerUpUntilYearIndexation: "",
    PartnerOtherSalary: "",
    PartnerGSTStatus: "",
    PartnerIncludeFromYearGST: "",
    PartnerUpUntilYearGST: "",

    // partnerInitialValue

    // partnerInitialValue
  };

  
  let onSubmit = (values) => {
    let clientObj = {
      ClientSalaryIncome: values.ClientSalaryIncome,
      ClientIncludeFromYearSalary: values.ClientIncludeFromYearSalary,
      ClientupUntilYearSalary: values.ClientupUntilYearSalary,
      ClientReducedSalaryIncome: values.ClientReducedSalaryIncome,
      ClientIndexationofSalary: values.ClientIndexationofSalary,
      ClientapplySalaryPackaging: values.ClientapplySalaryPackaging,
      ClientemployerFBTStatus: values.ClientemployerFBTStatus,
      ClientCostBaseofCar: values.ClientCostBaseofCar,
      ClientFBTPaidByEmployer: values.ClientFBTPaidByEmployer,
      ClientRunningCostsofCar: values.ClientRunningCostsofCar,
      ClientIndexation: values.ClientIndexation,
      ClientIncludeFromYearIndexation: values.ClientIncludeFromYearIndexation,
      ClientUpUntilYearIndexation: values.ClientUpUntilYearIndexation,
      ClientOtherSalary: values.ClientOtherSalary,
      ClientGSTStatus: values.ClientGSTStatus,
      ClientIncludeFromYearGST: values.ClientIncludeFromYearGST,
      ClientUpUntilYearGST: values.ClientUpUntilYearGST,
    };

    let partnerObj = {
      PartnerSalaryIncome: values.PartnerSalaryIncome,
      PartnerIncludeFromYearSalary: values.PartnerIncludeFromYearSalary,
      PartnerupUntilYearSalary: values.PartnerupUntilYearSalary,
      PartnerReducedSalaryIncome: values.PartnerReducedSalaryIncome,
      PartnerIndexationofSalary: values.PartnerIndexationofSalary,
      PartnerapplySalaryPackaging: values.PartnerapplySalaryPackaging,
      PartneremployerFBTStatus: values.PartneremployerFBTStatus,
      PartnerCostBaseofCar: values.PartnerCostBaseofCar,
      PartnerFBTPaidByEmployer: values.PartnerFBTPaidByEmployer,
      PartnerRunningCostsofCar: values.PartnerRunningCostsofCar,
      PartnerIndexation: values.PartnerIndexation,
      PartnerIncludeFromYearIndexation: values.PartnerIncludeFromYearIndexation,
      PartnerUpUntilYearIndexation: values.PartnerUpUntilYearIndexation,
      PartnerOtherSalary: values.PartnerOtherSalary,
      PartnerGSTStatus: values.PartnerGSTStatus,
      PartnerIncludeFromYearGST: values.PartnerIncludeFromYearGST,
      PartnerUpUntilYearGST: values.PartnerUpUntilYearGST,
    };

    console.log("client", clientObj);
    console.log("partner", partnerObj);

    handleClose();
  };
  return (
    <>
      <label htmlFor="" className="form-label">
        Employment Income
      </label>
      {/* <MyForm/> */}
      <div>
        <button
          type="button"
          className=" btn
                                btn-outline-success "
          onClick={handleShow}
        >
          <div className="iconContainer mx-1">
            <img className="img-fluid" src={plus} alt="" />
          </div>
          Enter Details
        </button>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            {/* --------------------------------------------------------------- */}
            <div>
              {/* Business Expense Schedule */}
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                className="modal-xl"
                keyboard={false}
              >
                <Modal.Header className="text-light modalBG " closeButton>
                  <Modal.Title className="fontStyle">
                    Employment Income
                    <div className="iconContainerLg">
                      <img className="img-fluid" src={notebook} alt="" />
                    </div>
                  </Modal.Title>
                </Modal.Header>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                  enableReinitialize
                >
                  {({ values, handleChange, setFieldValue, handleBlur }) => (
                    <Form>
                      <Modal.Body>
                        {/* ClientForm */}

                        <div classname="row">
                          <div className="col-md-3">
                            <div className="mb-3">
                              <label className="form-label">Client</label>

                              {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="ClientEdit"
                                    id="ClientEditopt1"
                                    onChange={handleChange}
                                    value="Yes"
                                    checked={values.ClientEdit == "Yes"}
                                  />
                                  <label
                                    htmlFor="ClientEditopt1"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <input
                                    type="radio"
                                    name="ClientEdit"
                                    id="ClientEditopt2"
                                    onChange={handleChange}
                                    value="No"
                                    checked={values.ClientEdit == "No"}
                                  />
                                  <label
                                    htmlFor="ClientEditopt2"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                              {/* switch button style */}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="ClientSalaryIncome"
                                className="form-label"
                              >
                                Salary Income
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign shadow"
                                id="ClientSalaryIncome"
                                name="ClientSalaryIncome"
                                placeholder="salary income"
                                disabled={values.ClientEdit !== "Yes"}
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="ClientSalaryIncome"
                              />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="ClientIncludeFromYearSalary"
                                className="form-label"
                              >
                                Include From Year
                              </label>
                              <Field
                                id="ClientIncludeFromYearSalary"
                                name="ClientIncludeFromYearSalary"
                                className="form-select shadow  inputDesign"
                                as="select"
                                disabled={
                                  values.ClientEdit === "Yes" ? false : true
                                }
                              >
                                <option value="">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                              </Field>
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="ClientIncludeFromYearSalary"
                              />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="ClientupUntilYearSalary"
                                className="form-label"
                              >
                                Up Until Year
                              </label>
                              <Field
                                id="ClientupUntilYearSalary"
                                name="ClientupUntilYearSalary"
                                className="form-select shadow  inputDesign"
                                as="select"
                                disabled={
                                  values.ClientEdit === "Yes" ? false : true
                                }
                              >
                                <option value="">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                              </Field>
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="ClientupUntilYearSalary"
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="ClientReducedSalaryIncome"
                                className="form-label"
                              >
                                Reduced Salary Income
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="ClientReducedSalaryIncome"
                                name="ClientReducedSalaryIncome"
                                placeholder="Reduced Salary Income"
                                disabled={
                                  values.ClientEdit === "Yes" ? false : true
                                }
                              />
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="ClientReducedSalaryIncome"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="ClientIndexationofSalary"
                                className="form-label"
                              >
                                Indexation of Salary
                              </label>
                              <Field
                                id="ClientIndexationofSalary"
                                name="ClientIndexationofSalary"
                                className="form-select shadow  inputDesign"
                                as="select"
                                disabled={
                                  values.ClientEdit === "Yes" ? false : true
                                }
                              >
                                <option value="">select</option>
                                <option value="0.00%">0.00%</option>
                                <option value="0.50%">0.50%</option>
                                <option value="1.00%">1.00%</option>
                                <option value="1.50%">1.50%</option>
                                <option value="2.00%">2.00%</option>
                                <option value="2.50%">2.50%</option>
                                <option value="3.00%">3.00%</option>
                                <option value="3.50%">3.50%</option>
                                <option value="4.00%">4.00%</option>
                                <option value="4.50%">4.50%</option>
                                <option value="5.00%">5.00%</option>
                                <option value="5.50%">5.50%</option>
                                <option value="6.00%">6.00%</option>
                                <option value="6.50%">6.50%</option>
                                <option value="7.00%">7.00%</option>
                                <option value="7.50%">7.50%</option>
                                <option value="8.00%">8.00%</option>
                                <option value="8.50%">8.50%</option>
                                <option value="9.00%">9.00%</option>
                                <option value="9.50%">9.50%</option>
                                <option value="10.00%">10.00%</option>
                              </Field>
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="ClientIndexationofSalary"
                              />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label className="form-label">
                                Apply Salary Packaging
                              </label>

                              {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input
                                    type="radio"
                                    name="ClientapplySalaryPackaging"
                                    id="ClientapplySalaryPackagingopt1"
                                    onChange={handleChange}
                                    value="Yes"
                                    checked={
                                      values.ClientapplySalaryPackaging ===
                                      "Yes"
                                    }
                                    disabled={
                                      values.ClientEdit === "Yes" ? false : true
                                    }
                                  />
                                  <label
                                    htmlFor="ClientapplySalaryPackagingopt1"
                                    className="label1"
                                  >
                                    <span>YES</span>
                                  </label>
                                  <Field
                                    type="radio"
                                    name="ClientapplySalaryPackaging"
                                    id="ClientapplySalaryPackagingopt2"
                                    // onChange={handleChange}
                                    value="No"
                                    checked={
                                      values.ClientapplySalaryPackaging === "No"
                                    }
                                    disabled={
                                      values.ClientEdit === "Yes" ? false : true
                                    }
                                    onChange={() => {
                                      setFieldValue(
                                        "ClientapplySalaryPackaging",
                                        "No"
                                      );
                                      setFieldValue("ClientCostBaseofCar", "");
                                      setFieldValue(
                                        "ClientemployerFBTStatus",
                                        ""
                                      );
                                    }}
                                  />
                                  <label
                                    htmlFor="ClientapplySalaryPackagingopt2"
                                    className="label2"
                                  >
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                              {/* switch button style */}
                            </div>
                          </div>

                          {values.ClientapplySalaryPackaging == "Yes" && (
                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="ClientemployerFBTStatus"
                                  className="form-label"
                                >
                                  Employer FBT Status
                                </label>
                                <Field
                                  id="ClientemployerFBTStatus"
                                  name="ClientemployerFBTStatus"
                                  className="form-select shadow  inputDesign"
                                  as="select"
                                  disabled={
                                    values.ClientEdit === "Yes" ? false : true
                                  }
                                >
                                  <option value="">Select</option>
                                  <option value="Full FBT">Full FBT</option>
                                  <option value="Rebatable">Rebatable</option>
                                  <option value="Exempt($17k Cap)">
                                    Exempt($17k Cap)
                                  </option>
                                  <option value="Exempt($30k Cap)">
                                    Exempt($30k Cap)
                                  </option>
                                </Field>
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="ClientemployerFBTStatus"
                                />
                              </div>
                            </div>
                          )}
                          {values.ClientapplySalaryPackaging == "Yes" && (
                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="ClientCostBaseofCar"
                                  className="form-label"
                                >
                                  Cost Base of Car
                                </label>
                                <Field
                                  type="number"
                                  className="form-control inputDesign  shadow"
                                  id="ClientCostBaseofCar"
                                  name="ClientCostBaseofCar"
                                  placeholder="Cost Base of Car"
                                  disabled={
                                    values.ClientEdit === "Yes" ? false : true
                                  }
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="ClientCostBaseofCar"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {values.ClientapplySalaryPackaging == "Yes" && (
                          <div className="row">
                            <div className="col-md-3">
                              <div className="mb-3">
                                <label className="form-label">
                                  FBT Paid By Employer
                                </label>

                                {/* switch button style */}
                                <div className="form-check form-switch m-0 p-0 ">
                                  <div className="radiobutton">
                                    <input
                                      type="radio"
                                      name="ClientFBTPaidByEmployer"
                                      id="ClientFBTPaidByEmployeropt1"
                                      onChange={handleChange}
                                      value="Yes"
                                      checked={
                                        values.ClientFBTPaidByEmployer === "Yes"
                                      }
                                      disabled={
                                        values.ClientEdit === "Yes"
                                          ? false
                                          : true
                                      }
                                    />
                                    <label
                                      htmlFor="ClientFBTPaidByEmployeropt1"
                                      className="label1"
                                    >
                                      <span>YES</span>
                                    </label>
                                    <input
                                      type="radio"
                                      name="ClientFBTPaidByEmployer"
                                      id="ClientFBTPaidByEmployeropt2"
                                      onChange={handleChange}
                                      value="No"
                                      checked={
                                        values.ClientFBTPaidByEmployer === "No"
                                      }
                                      disabled={
                                        values.ClientEdit === "Yes"
                                          ? false
                                          : true
                                      }
                                    />
                                    <label
                                      htmlFor="ClientFBTPaidByEmployeropt2"
                                      className="label2"
                                    >
                                      <span>NO</span>
                                    </label>
                                  </div>
                                </div>
                                {/* switch button style */}
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="ClientRunningCostsofCar"
                                  className="form-label"
                                >
                                  Running Costs of Car Packaged
                                </label>
                                <Field
                                  type="number"
                                  className="form-control inputDesign  shadow"
                                  id="ClientRunningCostsofCar"
                                  name="ClientRunningCostsofCar"
                                  placeholder="Running Costs of Car"
                                  disabled={
                                    values.ClientEdit === "Yes" ? false : true
                                  }
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="ClientRunningCostsofCar"
                                />
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="ClientIndexation"
                                  className="form-label"
                                >
                                  Indexation
                                </label>
                                <Field
                                  id="ClientIndexation"
                                  name="ClientIndexation"
                                  className="form-select shadow  inputDesign"
                                  as="select"
                                  disabled={
                                    values.ClientEdit === "Yes" ? false : true
                                  }
                                >
                                  <option value="">select</option>
                                  <option value="0.00%">0.00%</option>
                                  <option value="0.50%">0.50%</option>
                                  <option value="1.00%">1.00%</option>
                                  <option value="1.50%">1.50%</option>
                                  <option value="2.00%">2.00%</option>
                                  <option value="2.50%">2.50%</option>
                                  <option value="3.00%">3.00%</option>
                                  <option value="3.50%">3.50%</option>
                                  <option value="4.00%">4.00%</option>
                                  <option value="4.50%">4.50%</option>
                                  <option value="5.00%">5.00%</option>
                                  <option value="5.50%">5.50%</option>
                                  <option value="6.00%">6.00%</option>
                                  <option value="6.50%">6.50%</option>
                                  <option value="7.00%">7.00%</option>
                                  <option value="7.50%">7.50%</option>
                                  <option value="8.00%">8.00%</option>
                                  <option value="8.50%">8.50%</option>
                                  <option value="9.00%">9.00%</option>
                                  <option value="9.50%">9.50%</option>
                                  <option value="10.00%">10.00%</option>
                                </Field>
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="ClientIndexation"
                                />
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="ClientIncludeFromYearIndexation"
                                  className="form-label"
                                >
                                  Include From Year
                                </label>
                                <Field
                                  id="ClientIncludeFromYearIndexation"
                                  name="ClientIncludeFromYearIndexation"
                                  className="form-select shadow  inputDesign"
                                  as="select"
                                  disabled={
                                    values.ClientEdit === "Yes" ? false : true
                                  }
                                >
                                  <option value="">Select</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                                  <option value="11">11</option>
                                  <option value="12">12</option>
                                  <option value="13">13</option>
                                  <option value="14">14</option>
                                  <option value="15">15</option>
                                  <option value="16">16</option>
                                  <option value="17">17</option>
                                  <option value="18">18</option>
                                  <option value="19">19</option>
                                  <option value="20">20</option>
                                  <option value="21">21</option>
                                  <option value="22">22</option>
                                  <option value="23">23</option>
                                  <option value="24">24</option>
                                  <option value="25">25</option>
                                  <option value="26">26</option>
                                  <option value="27">27</option>
                                  <option value="28">28</option>
                                  <option value="29">29</option>
                                  <option value="30">30</option>
                                </Field>
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="ClientIncludeFromYearIndexation"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {values.ClientapplySalaryPackaging == "Yes" && (
                          <div className="row">
                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="ClientUpUntilYearIndexation"
                                  className="form-label"
                                >
                                  Up Until Year
                                </label>
                                <Field
                                  id="ClientUpUntilYearIndexation"
                                  name="ClientUpUntilYearIndexation"
                                  className="form-select shadow  inputDesign"
                                  as="select"
                                  disabled={
                                    values.ClientEdit === "Yes" ? false : true
                                  }
                                >
                                  <option value="">Select</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                                  <option value="11">11</option>
                                  <option value="12">12</option>
                                  <option value="13">13</option>
                                  <option value="14">14</option>
                                  <option value="15">15</option>
                                  <option value="16">16</option>
                                  <option value="17">17</option>
                                  <option value="18">18</option>
                                  <option value="19">19</option>
                                  <option value="20">20</option>
                                  <option value="21">21</option>
                                  <option value="22">22</option>
                                  <option value="23">23</option>
                                  <option value="24">24</option>
                                  <option value="25">25</option>
                                  <option value="26">26</option>
                                  <option value="27">27</option>
                                  <option value="28">28</option>
                                  <option value="29">29</option>
                                  <option value="30">30</option>
                                </Field>
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="ClientUpUntilYearIndexation"
                                />
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="ClientOtherSalary"
                                  className="form-label"
                                >
                                  Other Salary Packaged Items
                                </label>
                                <Field
                                  type="number"
                                  className="form-control inputDesign  shadow"
                                  id="ClientOtherSalary"
                                  name="ClientOtherSalary"
                                  placeholder="Other Salary"
                                  disabled={
                                    values.ClientEdit === "Yes" ? false : true
                                  }
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="ClientOtherSalary"
                                />
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="ClientGSTStatus"
                                  className="form-label"
                                >
                                  GST Status
                                </label>
                                <Field
                                  id="ClientGSTStatus"
                                  name="ClientGSTStatus"
                                  className="form-select shadow  inputDesign"
                                  as="select"
                                  disabled={
                                    values.ClientEdit === "Yes" ? false : true
                                  }
                                >
                                  <option value="">Select</option>
                                  <option value="WithGST">With GST</option>
                                  <option value="WithoutGST">
                                    Without GST
                                  </option>
                                </Field>
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="ClientGSTStatus"
                                />
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="ClientIncludeFromYearGST"
                                  className="form-label"
                                >
                                  Include From Year
                                </label>
                                <Field
                                  id="ClientIncludeFromYearGST"
                                  name="ClientIncludeFromYearGST"
                                  className="form-select shadow  inputDesign"
                                  as="select"
                                  disabled={
                                    values.ClientEdit === "Yes" ? false : true
                                  }
                                >
                                  <option value="">Select</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                                  <option value="11">11</option>
                                  <option value="12">12</option>
                                  <option value="13">13</option>
                                  <option value="14">14</option>
                                  <option value="15">15</option>
                                  <option value="16">16</option>
                                  <option value="17">17</option>
                                  <option value="18">18</option>
                                  <option value="19">19</option>
                                  <option value="20">20</option>
                                  <option value="21">21</option>
                                  <option value="22">22</option>
                                  <option value="23">23</option>
                                  <option value="24">24</option>
                                  <option value="25">25</option>
                                  <option value="26">26</option>
                                  <option value="27">27</option>
                                  <option value="28">28</option>
                                  <option value="29">29</option>
                                  <option value="30">30</option>
                                </Field>
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="ClientIncludeFromYearGST"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {values.ClientapplySalaryPackaging == "Yes" && (
                          <div className="row">
                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="ClientUpUntilYearGST"
                                  className="form-label"
                                >
                                  Up Until Year
                                </label>
                                <Field
                                  id="ClientUpUntilYearGST"
                                  name="ClientUpUntilYearGST"
                                  className="form-select shadow  inputDesign"
                                  as="select"
                                  disabled={
                                    values.ClientEdit === "Yes" ? false : true
                                  }
                                >
                                  <option value="">Select</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                                  <option value="11">11</option>
                                  <option value="12">12</option>
                                  <option value="13">13</option>
                                  <option value="14">14</option>
                                  <option value="15">15</option>
                                  <option value="16">16</option>
                                  <option value="17">17</option>
                                  <option value="18">18</option>
                                  <option value="19">19</option>
                                  <option value="20">20</option>
                                  <option value="21">21</option>
                                  <option value="22">22</option>
                                  <option value="23">23</option>
                                  <option value="24">24</option>
                                  <option value="25">25</option>
                                  <option value="26">26</option>
                                  <option value="27">27</option>
                                  <option value="28">28</option>
                                  <option value="29">29</option>
                                  <option value="30">30</option>
                                </Field>
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="ClientUpUntilYearGST"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ClientForm */}

                        <hr />
                        {/* partnerForm */}
                        <div>
                          <div classname="row">
                            <div className="col-md-3">
                              <div className="mb-3">
                                <label className="form-label">Partner</label>

                                {/* switch button style */}
                                <div className="form-check form-switch m-0 p-0 ">
                                  <div className="radiobutton">
                                    <input
                                      type="radio"
                                      name="PartnerEdit"
                                      id="PartnerEditopt1"
                                      onChange={handleChange}
                                      value="Yes"
                                      checked={values.PartnerEdit === "Yes"}
                                    />
                                    <label
                                      htmlFor="PartnerEditopt1"
                                      className="label1"
                                    >
                                      <span>YES</span>
                                    </label>
                                    <input
                                      type="radio"
                                      name="PartnerEdit"
                                      id="PartnerEditopt2"
                                      onChange={handleChange}
                                      value="No"
                                      checked={values.PartnerEdit === "No"}
                                    />
                                    <label
                                      htmlFor="PartnerEditopt2"
                                      className="label2"
                                    >
                                      <span>NO</span>
                                    </label>
                                  </div>
                                </div>
                                {/* switch button style */}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="PartnerSalaryIncome"
                                  className="form-label"
                                >
                                  Salary Income
                                </label>
                                <Field
                                  type="number"
                                  className="form-control inputDesign  shadow"
                                  id="PartnerSalaryIncome"
                                  name="PartnerSalaryIncome"
                                  placeholder="PartnerSalaryIncome"
                                  disabled={
                                    values.PartnerEdit === "Yes" ? false : true
                                  }
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="PartnerSalaryIncome"
                                />
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="PartnerIncludeFromYearSalary"
                                  className="form-label"
                                >
                                  Include From Year
                                </label>
                                <Field
                                  id="PartnerIncludeFromYearSalary"
                                  name="PartnerIncludeFromYearSalary"
                                  className="form-select shadow  inputDesign"
                                  as="select"
                                  disabled={
                                    values.PartnerEdit === "Yes" ? false : true
                                  }
                                >
                                  <option value="">Select</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                                  <option value="11">11</option>
                                  <option value="12">12</option>
                                  <option value="13">13</option>
                                  <option value="14">14</option>
                                  <option value="15">15</option>
                                  <option value="16">16</option>
                                  <option value="17">17</option>
                                  <option value="18">18</option>
                                  <option value="19">19</option>
                                  <option value="20">20</option>
                                  <option value="21">21</option>
                                  <option value="22">22</option>
                                  <option value="23">23</option>
                                  <option value="24">24</option>
                                  <option value="25">25</option>
                                  <option value="26">26</option>
                                  <option value="27">27</option>
                                  <option value="28">28</option>
                                  <option value="29">29</option>
                                  <option value="30">30</option>
                                </Field>
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="PartnerIncludeFromYearSalary"
                                />
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="PartnerupUntilYearSalary"
                                  className="form-label"
                                >
                                  Up Until Year
                                </label>
                                <Field
                                  id="PartnerupUntilYearSalary"
                                  name="PartnerupUntilYearSalary"
                                  className="form-select shadow  inputDesign"
                                  as="select"
                                  disabled={
                                    values.PartnerEdit === "Yes" ? false : true
                                  }
                                >
                                  <option value="">Select</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                                  <option value="11">11</option>
                                  <option value="12">12</option>
                                  <option value="13">13</option>
                                  <option value="14">14</option>
                                  <option value="15">15</option>
                                  <option value="16">16</option>
                                  <option value="17">17</option>
                                  <option value="18">18</option>
                                  <option value="19">19</option>
                                  <option value="20">20</option>
                                  <option value="21">21</option>
                                  <option value="22">22</option>
                                  <option value="23">23</option>
                                  <option value="24">24</option>
                                  <option value="25">25</option>
                                  <option value="26">26</option>
                                  <option value="27">27</option>
                                  <option value="28">28</option>
                                  <option value="29">29</option>
                                  <option value="30">30</option>
                                </Field>
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="PartnerupUntilYearSalary"
                                />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="PartnerReducedSalaryIncome"
                                  className="form-label"
                                >
                                  Reduced Salary Income
                                </label>
                                <Field
                                  type="number"
                                  className="form-control inputDesign  shadow"
                                  id="PartnerReducedSalaryIncome"
                                  name="PartnerReducedSalaryIncome"
                                  placeholder="Reduced Salary Income"
                                  disabled={
                                    values.PartnerEdit === "Yes" ? false : true
                                  }
                                />
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="PartnerReducedSalaryIncome"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-3">
                              <div className="mb-3">
                                <label
                                  htmlFor="PartnerIndexationofSalary"
                                  className="form-label"
                                >
                                  Indexation of Salary
                                </label>
                                <Field
                                  id="PartnerIndexationofSalary"
                                  name="PartnerIndexationofSalary"
                                  className="form-select shadow  inputDesign"
                                  as="select"
                                  disabled={
                                    values.PartnerEdit === "Yes" ? false : true
                                  }
                                >
                                  <option value="">select</option>
                                  <option value="0.00%">0.00%</option>
                                  <option value="0.50%">0.50%</option>
                                  <option value="1.00%">1.00%</option>
                                  <option value="1.50%">1.50%</option>
                                  <option value="2.00%">2.00%</option>
                                  <option value="2.50%">2.50%</option>
                                  <option value="3.00%">3.00%</option>
                                  <option value="3.50%">3.50%</option>
                                  <option value="4.00%">4.00%</option>
                                  <option value="4.50%">4.50%</option>
                                  <option value="5.00%">5.00%</option>
                                  <option value="5.50%">5.50%</option>
                                  <option value="6.00%">6.00%</option>
                                  <option value="6.50%">6.50%</option>
                                  <option value="7.00%">7.00%</option>
                                  <option value="7.50%">7.50%</option>
                                  <option value="8.00%">8.00%</option>
                                  <option value="8.50%">8.50%</option>
                                  <option value="9.00%">9.00%</option>
                                  <option value="9.50%">9.50%</option>
                                  <option value="10.00%">10.00%</option>
                                </Field>
                                <ErrorMessage
                                  component="div"
                                  className="text-danger fw-bold"
                                  name="PartnerIndexationofSalary"
                                />
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="mb-3">
                                <label className="form-label">
                                  Apply Salary Packaging
                                </label>

                                {/* switch button style */}
                                <div className="form-check form-switch m-0 p-0 ">
                                  <div className="radiobutton">
                                    <input
                                      type="radio"
                                      name="PartnerApplySalaryPackaging"
                                      id="PartnerApplySalaryPackagingopt1"
                                      onChange={handleChange}
                                      value="Yes"
                                      checked={
                                        values.PartnerApplySalaryPackaging ===
                                        "Yes"
                                      }
                                      disabled={
                                        values.PartnerEdit === "Yes"
                                          ? false
                                          : true
                                      }
                                    />
                                    <label
                                      htmlFor="PartnerApplySalaryPackagingopt1"
                                      className="label1"
                                    >
                                      <span>YES</span>
                                    </label>
                                    <input
                                      type="radio"
                                      name="PartnerApplySalaryPackaging"
                                      id="PartnerApplySalaryPackagingopt2"
                                      onChange={handleChange}
                                      value="No"
                                      checked={
                                        values.PartnerApplySalaryPackaging ===
                                        "No"
                                      }
                                      disabled={
                                        values.PartnerEdit === "Yes"
                                          ? false
                                          : true
                                      }
                                    />
                                    <label
                                      htmlFor="PartnerApplySalaryPackagingopt2"
                                      className="label2"
                                    >
                                      <span>NO</span>
                                    </label>
                                  </div>
                                </div>
                                {/* switch button style */}
                              </div>
                            </div>

                            {values.PartnerApplySalaryPackaging == "Yes" && (
                              <div className="col-md-3">
                                <div className="mb-3">
                                  <label
                                    htmlFor="PartneremployerFBTStatus"
                                    className="form-label"
                                  >
                                    Employer FBT Status
                                  </label>
                                  <Field
                                    id="PartneremployerFBTStatus"
                                    name="PartneremployerFBTStatus"
                                    className="form-select shadow  inputDesign"
                                    as="select"
                                    disabled={
                                      values.PartnerEdit === "Yes"
                                        ? false
                                        : true
                                    }
                                  >
                                    <option value="">Select</option>
                                    <option value="Full FBT">Full FBT</option>
                                    <option value="Rebatable">Rebatable</option>
                                    <option value="Exempt($17k Cap)">
                                      Exempt($17k Cap)
                                    </option>
                                    <option value="Exempt($30k Cap)">
                                      Exempt($30k Cap)
                                    </option>
                                  </Field>
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="PartneremployerFBTStatus"
                                  />
                                </div>
                              </div>
                            )}
                            {values.PartnerApplySalaryPackaging == "Yes" && (
                              <div className="col-md-3">
                                <div className="mb-3">
                                  <label
                                    htmlFor="PartnerCostBaseofCar"
                                    className="form-label"
                                  >
                                    Cost Base of Car
                                  </label>
                                  <Field
                                    type="number"
                                    className="form-control inputDesign  shadow"
                                    id="PartnerCostBaseofCar"
                                    name="PartnerCostBaseofCar"
                                    placeholder="Cost Base of Car"
                                    disabled={
                                      values.PartnerEdit === "Yes"
                                        ? false
                                        : true
                                    }
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="PartnerCostBaseofCar"
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          {values.PartnerApplySalaryPackaging == "Yes" && (
                            <div className="row">
                              <div className="col-md-3">
                                <div className="mb-3">
                                  <label className="form-label">
                                    FBT Paid By Employer
                                  </label>

                                  {/* switch button style */}
                                  <div className="form-check form-switch m-0 p-0 ">
                                    <div className="radiobutton">
                                      <input
                                        type="radio"
                                        name="PartnerFBTPaidByEmployer"
                                        id="PartnerFBTPaidByEmployeropt1"
                                        onChange={handleChange}
                                        value="Yes"
                                        checked={
                                          values.PartnerFBTPaidByEmployer ===
                                          "Yes"
                                        }
                                        disabled={
                                          values.PartnerEdit === "Yes"
                                            ? false
                                            : true
                                        }
                                      />
                                      <label
                                        htmlFor="PartnerFBTPaidByEmployeropt1"
                                        className="label1"
                                      >
                                        <span>YES</span>
                                      </label>
                                      <input
                                        type="radio"
                                        name="PartnerFBTPaidByEmployer"
                                        id="PartnerFBTPaidByEmployeropt2"
                                        onChange={handleChange}
                                        value="No"
                                        checked={
                                          values.PartnerFBTPaidByEmployer ===
                                          "No"
                                        }
                                        disabled={
                                          values.PartnerEdit === "Yes"
                                            ? false
                                            : true
                                        }
                                      />
                                      <label
                                        htmlFor="PartnerFBTPaidByEmployeropt2"
                                        className="label2"
                                      >
                                        <span>NO</span>
                                      </label>
                                    </div>
                                  </div>
                                  {/* switch button style */}
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="mb-3">
                                  <label
                                    htmlFor="PartnerRunningCostsofCar"
                                    className="form-label"
                                  >
                                    Running Costs of Car Packaged
                                  </label>
                                  <Field
                                    type="number"
                                    className="form-control inputDesign  shadow"
                                    id="PartnerRunningCostsofCar"
                                    name="PartnerRunningCostsofCar"
                                    placeholder="Running Costs of Car"
                                    disabled={
                                      values.PartnerEdit === "Yes"
                                        ? false
                                        : true
                                    }
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="PartnerRunningCostsofCar"
                                  />
                                </div>
                              </div>

                              <div className="col-md-3">
                                <div className="mb-3">
                                  <label
                                    htmlFor="PartnerIndexation"
                                    className="form-label"
                                  >
                                    Indexation
                                  </label>
                                  <Field
                                    id="PartnerIndexation"
                                    name="PartnerIndexation"
                                    className="form-select shadow  inputDesign"
                                    as="select"
                                    disabled={
                                      values.PartnerEdit === "Yes"
                                        ? false
                                        : true
                                    }
                                  >
                                    <option value="">select</option>
                                    <option value="0.00%">0.00%</option>
                                    <option value="0.50%">0.50%</option>
                                    <option value="1.00%">1.00%</option>
                                    <option value="1.50%">1.50%</option>
                                    <option value="2.00%">2.00%</option>
                                    <option value="2.50%">2.50%</option>
                                    <option value="3.00%">3.00%</option>
                                    <option value="3.50%">3.50%</option>
                                    <option value="4.00%">4.00%</option>
                                    <option value="4.50%">4.50%</option>
                                    <option value="5.00%">5.00%</option>
                                    <option value="5.50%">5.50%</option>
                                    <option value="6.00%">6.00%</option>
                                    <option value="6.50%">6.50%</option>
                                    <option value="7.00%">7.00%</option>
                                    <option value="7.50%">7.50%</option>
                                    <option value="8.00%">8.00%</option>
                                    <option value="8.50%">8.50%</option>
                                    <option value="9.00%">9.00%</option>
                                    <option value="9.50%">9.50%</option>
                                    <option value="10.00%">10.00%</option>
                                  </Field>
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="PartnerIndexation"
                                  />
                                </div>
                              </div>

                              <div className="col-md-3">
                                <div className="mb-3">
                                  <label
                                    htmlFor="PartnerIncludeFromYearIndexation"
                                    className="form-label"
                                  >
                                    Include From Year
                                  </label>
                                  <Field
                                    id="PartnerIncludeFromYearIndexation"
                                    name="PartnerIncludeFromYearIndexation"
                                    className="form-select shadow  inputDesign"
                                    as="select"
                                    disabled={
                                      values.PartnerEdit === "Yes"
                                        ? false
                                        : true
                                    }
                                  >
                                    <option value="">Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                  </Field>
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="PartnerIncludeFromYearIndexation"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {values.PartnerApplySalaryPackaging == "Yes" && (
                            <div className="row">
                              <div className="col-md-3">
                                <div className="mb-3">
                                  <label
                                    htmlFor="PartnerUpUntilYearIndexation"
                                    className="form-label"
                                  >
                                    Up Until Year
                                  </label>
                                  <Field
                                    id="PartnerUpUntilYearIndexation"
                                    name="PartnerUpUntilYearIndexation"
                                    className="form-select shadow  inputDesign"
                                    as="select"
                                    disabled={
                                      values.PartnerEdit === "Yes"
                                        ? false
                                        : true
                                    }
                                  >
                                    <option value="">Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                  </Field>
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="PartnerUpUntilYearIndexation"
                                  />
                                </div>
                              </div>

                              <div className="col-md-3">
                                <div className="mb-3">
                                  <label
                                    htmlFor="PartnerOtherSalary"
                                    className="form-label"
                                  >
                                    Other Salary Packaged Items
                                  </label>
                                  <Field
                                    type="number"
                                    className="form-control inputDesign  shadow"
                                    id="PartnerOtherSalary"
                                    name="PartnerOtherSalary"
                                    placeholder="Other Salary"
                                    disabled={
                                      values.PartnerEdit === "Yes"
                                        ? false
                                        : true
                                    }
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="PartnerOtherSalary"
                                  />
                                </div>
                              </div>

                              <div className="col-md-3">
                                <div className="mb-3">
                                  <label
                                    htmlFor="PartnerGSTStatus"
                                    className="form-label"
                                  >
                                    GST Status
                                  </label>
                                  <Field
                                    id="PartnerGSTStatus"
                                    name="PartnerGSTStatus"
                                    className="form-select shadow  inputDesign"
                                    as="select"
                                    disabled={
                                      values.PartnerEdit === "Yes"
                                        ? false
                                        : true
                                    }
                                  >
                                    <option value="">Select</option>
                                    <option value="WithGST">With GST</option>
                                    <option value="WithoutGST">
                                      Without GST
                                    </option>
                                  </Field>
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="PartnerGSTStatus"
                                  />
                                </div>
                              </div>

                              <div className="col-md-3">
                                <div className="mb-3">
                                  <label
                                    htmlFor="PartnerIncludeFromYearGST"
                                    className="form-label"
                                  >
                                    Include From Year
                                  </label>
                                  <Field
                                    id="PartnerIncludeFromYearGST"
                                    name="PartnerIncludeFromYearGST"
                                    className="form-select shadow  inputDesign"
                                    as="select"
                                    disabled={
                                      values.PartnerEdit === "Yes"
                                        ? false
                                        : true
                                    }
                                  >
                                    <option value="">Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                  </Field>
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="PartnerIncludeFromYearGST"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {values.PartnerApplySalaryPackaging == "Yes" && (
                            <div className="row">
                              <div className="col-md-3">
                                <div className="mb-3">
                                  <label
                                    htmlFor="PartnerUpUntilYearGST"
                                    className="form-label"
                                  >
                                    Up Until Year
                                  </label>
                                  <Field
                                    id="PartnerUpUntilYearGST"
                                    name="PartnerUpUntilYearGST"
                                    className="form-select shadow  inputDesign"
                                    as="select"
                                    disabled={
                                      values.PartnerEdit === "Yes"
                                        ? false
                                        : true
                                    }
                                  >
                                    <option value="">Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                  </Field>
                                  <ErrorMessage
                                    component="div"
                                    className="text-danger fw-bold"
                                    name="PartnerUpUntilYearGST"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* PartnerForm */}
                      </Modal.Body>

                      <Modal.Footer>
                        <div className="col-md-12">
                          <button
                            type="submit"
                            className="float-end btn w-25  bgColor modalBtn"
                            // onClick={handleClose}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="float-end btn w-25  btn-outline  backBtn mx-3"
                            onClick={handleClose}
                          >
                            Cancel
                          </button>
                        </div>
                      </Modal.Footer>
                    </Form>
                  )}
                </Formik>
              </Modal>
              {/* Business Expense Schedule */}
            </div>

            {/* --------------------------------------------------------------- */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmploymentIncome;
