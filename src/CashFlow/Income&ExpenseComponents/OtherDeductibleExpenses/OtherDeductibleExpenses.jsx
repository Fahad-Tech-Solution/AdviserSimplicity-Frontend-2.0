import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./businessTextStructure.css"
import plus from "./images/plus.svg"
import notebook from "./images/notebook.svg"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OtherDeductibleExpenses = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let initialValues = {

    // ClientInitialValue
    ClientEdit: "No",
    ClientIncomeInsurance:"",
    ClientIncludeFromYear:"",
    ClientUpUntilYear:"",
    ClientIndexation:"",
    ClientDeductibleExpenses:"",
    ClientIncludeFromYearDeductible:"",
    ClientUpUntilYearDeductible:"",
    ClientIndexationDeductible:"",
    
    // ClientInitialValue
    PartnerEdit: "No",
    PartnerIncomeInsurance:"",
    PartnerIncludeFromYear:"",
    PartnerUpUntilYear:"",
    PartnerIndexation:"",
    PartnerDeductibleExpenses:"",
    PartnerIncludeFromYearDeductible:"",
    PartnerUpUntilYearDeductible:"",
    PartnerIndexationDeductible:"",


  }

  let validationSchema = Yup.object({

    // ClientEdit: "No",
    ClientIncomeInsurance:Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
      otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
    }),
    ClientIncludeFromYear:Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required('Required'),
      otherwise: Yup.string().notRequired(""),
    }),
//     ClientUpUntilYear:Yup.string().when("ClientEdit", {
//       is: (val) => val && val.length == 3,
//       then: Yup.string().required('Required').test('is-greater', 'To Year must be greater than From Year', function(value) {
//         const fromYear = parseInt(this.resolve(Yup.ref('ClientIncludeFromYear')));
//         const toYear = parseInt(value);
//         return toYear >= fromYear;
//         }),
//       otherwise: Yup.string().notRequired(""),
//     }),

    ClientUpUntilYear: Yup.string().when("ClientEdit", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required").test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('ClientIncludeFromYear')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise: Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = this.parent.ClientIncludeFromYear;
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),


    ClientIndexation:Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required('Required'),
      otherwise: Yup.string().notRequired(""),
    }),
    ClientDeductibleExpenses:Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
      otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
    }),
    ClientIncludeFromYearDeductible:Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required('Required'),
      otherwise: Yup.string().notRequired(""),
    }),
//     ClientUpUntilYearDeductible:Yup.string().when("ClientEdit", {
//       is: (val) => val && val.length == 3,
//       then: Yup.string().required('Required').test('is-greater', 'To Year must be greater than From Year', function(value) {
//         const fromYear = parseInt(this.resolve(Yup.ref('ClientIncludeFromYearDeductible')));
//         const toYear = parseInt(value);
//         return toYear >= fromYear;
//         }),
//       otherwise: Yup.string().notRequired(""),
//     }),

    ClientUpUntilYearDeductible: Yup.string().when("ClientEdit", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required").test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('ClientIncludeFromYearDeductible')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise: Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = this.parent.ClientIncludeFromYearDeductible;
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),


    ClientIndexationDeductible:Yup.string().when("ClientEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required('Required'),
      otherwise: Yup.string().notRequired(""),
    }),
  
    //Partner 
    // PartnerEdit: "No",
    PartnerIncomeInsurance:Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
      otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
    }),
    PartnerIncludeFromYear:Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required('Required'),
      otherwise: Yup.string().notRequired(""),
    }),
//     PartnerUpUntilYear:Yup.string().when("PartnerEdit", {
//       is: (val) => val && val.length == 3,
//       then: Yup.string().required('Required').test('is-greater', 'To Year must be greater than From Year', function(value) {
//         const fromYear = parseInt(this.resolve(Yup.ref('PartnerIncludeFromYear')));
//         const toYear = parseInt(value);
//         return toYear >= fromYear;
//         }),
//       otherwise: Yup.string().notRequired(""),
//     }),


    PartnerUpUntilYear: Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required").test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('PartnerIncludeFromYear')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise: Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = this.parent.PartnerIncludeFromYear;
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),



    PartnerIndexation:Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required('Required'),
      otherwise: Yup.string().notRequired(""),
    }),
    PartnerDeductibleExpenses:Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').required('Required'),
      otherwise: Yup.string().matches(/^(1|[1-9][0-9]*)$/, 'Must be a positive number').notRequired(""),
    }),
    PartnerIncludeFromYearDeductible:Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required('Required'),
      otherwise: Yup.string().notRequired(""),
    }),
//     PartnerUpUntilYearDeductible:Yup.string().when("PartnerEdit", {
//       is: (val) => val && val.length == 3,
//       then: Yup.string().required('Required').test('is-greater', 'To Year must be greater than From Year', function(value) {
//         const fromYear = parseInt(this.resolve(Yup.ref('PartnerIncludeFromYearDeductible')));
//         const toYear = parseInt(value);
//         return toYear >= fromYear;
//         }),
//       otherwise: Yup.string().notRequired(""),
//     }),


    PartnerUpUntilYearDeductible: Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length === 3,
      then: Yup.string().required("Required").test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('PartnerIncludeFromYearDeductible')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise: Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = this.parent.PartnerIncludeFromYearDeductible;
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),
    PartnerIndexationDeductible:Yup.string().when("PartnerEdit", {
      is: (val) => val && val.length == 3,
      then: Yup.string().required('Required'),
      otherwise: Yup.string().notRequired(""),
    }),
  
  })
  let onSubmit = (values) => {
    console.log(values);

  }
  return (
    <>

      <label htmlFor="" className="form-label">
      Other Deductible Expenses
      </label>
      <div>
        <button
        type="button"
          className=" btn btn-outline-success "
          onClick={handleShow}
        >
          <div className="iconContainer mx-1">
            <img className="img-fluid" src={plus} alt="" />

          </div>
          Enter Details
        </button>


      </div>

      <div className='row'>
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
                <Modal.Header
                  className="text-light modalBG "
                  closeButton
                >
                  <Modal.Title className="fontStyle">
                  Other Deductible Expenses
                    <div className="iconContainerLg">
                      <img className="img-fluid" src={notebook} alt="" />

                    </div>
                  </Modal.Title>
                </Modal.Header>

                <Formik initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                  enableReinitialize>
                  {({ values, handleChange, setFieldValue, handleBlur }) => (
                    <Form>
                      <Modal.Body>

                        {/* ClientForm */}

                        <div classname="row">
                          <div className="col-md-3">
                            <div className="mb-3">
                              <label className="form-label">
                                Client
                              </label>

                              {/* switch button style */}
                              <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                  <input type="radio" name="ClientEdit" id="ClientEditopt1"
                                    onChange={handleChange} value="Yes"
                                    checked={values.ClientEdit == "Yes"} />
                                  <label htmlFor="ClientEditopt1" className="label1">
                                    <span>YES</span>
                                  </label>
                                  <input type="radio" name="ClientEdit" id="ClientEditopt2"
                                    onChange={handleChange} value="No"

                                    checked={values.ClientEdit == "No"} />
                                  <label htmlFor="ClientEditopt2" className="label2">
                                    <span>NO</span>
                                  </label>
                                </div>
                              </div>
                              {/* switch button style */}


                            </div>
                          </div>
                        </div>

                        {/* First Row Client*/}
                        <div className="row">

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="ClientIncomeInsurance"
                                className="form-label"
                              >
                                Income Protection Insurance
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="ClientIncomeInsurance"
                                name='ClientIncomeInsurance'
                                placeholder="Income Protection Insurance"
                                disabled={values.ClientEdit === "Yes" ? false : true}
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='ClientIncomeInsurance' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="ClientIncludeFromYear" className="form-label">
                                Include From Year
                              </label>
                              <Field
                                id="ClientIncludeFromYear"
                                name='ClientIncludeFromYear'
                                className="form-select shadow  inputDesign"
                                as='select'
                                disabled={values.ClientEdit === "Yes" ? false : true}
                              >
                                <option value="">Select</option>
                                <option value="0">0</option>
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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="ClientIncludeFromYear" />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="ClientUpUntilYear" className="form-label">
                                Up Until Year
                              </label>
                              <Field
                                id="ClientUpUntilYear"
                                name='ClientUpUntilYear'
                                className="form-select shadow  inputDesign"
                                as='select'
                                disabled={values.ClientEdit === "Yes" ? false : true}

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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="ClientUpUntilYear" />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="ClientIndexation" className="form-label">
                                Indexation
                              </label>
                              <Field
                                id="ClientIndexation"
                                name='ClientIndexation'
                                className="form-select shadow  inputDesign"
                                as='select'
                                disabled={values.ClientEdit === "Yes" ? false : true}

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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="ClientIndexation" />
                            </div>
                          </div>

                        </div>

                        {/* Second Row Client*/}

                        <div className="row">

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="ClientDeductibleExpenses"
                                className="form-label"
                              >
                                Other Deductible Expenses
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="ClientDeductibleExpenses"
                                name='ClientDeductibleExpenses'
                                placeholder="Other Deductible Expenses"
                                disabled={values.ClientEdit === "Yes" ? false : true}
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='ClientDeductibleExpenses' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="ClientIncludeFromYearDeductible" className="form-label">
                                Include From Year
                              </label>
                              <Field
                                id="ClientIncludeFromYearDeductible"
                                name='ClientIncludeFromYearDeductible'
                                className="form-select shadow  inputDesign"
                                as='select'
                                disabled={values.ClientEdit === "Yes" ? false : true}

                              >
                                <option value="">Select</option>
                                <option value="Existing">Existing</option>
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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="ClientIncludeFromYearDeductible" />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="ClientUpUntilYearDeductible" className="form-label">
                                Up Until Year
                              </label>
                              <Field
                                id="ClientUpUntilYearDeductible"
                                name='ClientUpUntilYearDeductible'
                                className="form-select shadow  inputDesign"
                                as='select'
                                disabled={values.ClientEdit === "Yes" ? false : true}

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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="ClientUpUntilYearDeductible" />
                            </div>
                          </div>



                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="ClientIndexationDeductible" className="form-label">
                                Indexation
                              </label>
                              <Field
                                id="ClientIndexationDeductible"
                                name='ClientIndexationDeductible'
                                className="form-select shadow  inputDesign"
                                as='select'
                                disabled={values.ClientEdit === "Yes" ? false : true}

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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="ClientIndexationDeductible" />
                            </div>
                          </div>



                        </div>


                        {/* ClientForm */}

                        <hr />
                        {/* partnerForm */}
                        <div>
                           <div classname="row">
                            <div className="col-md-3">
                              <div className="mb-3">
                                <label className="form-label">
                                  Partner
                                </label>

                                {/* switch button style */}
                                <div className="form-check form-switch m-0 p-0 ">
                                  <div className="radiobutton">
                                    <input type="radio" name="PartnerEdit" id="PartnerEditopt1"
                                      onChange={handleChange} value="Yes"
                                      checked={values.PartnerEdit === "Yes"} />
                                    <label htmlFor="PartnerEditopt1" className="label1">
                                      <span>YES</span>
                                    </label>
                                    <input type="radio" name="PartnerEdit" id="PartnerEditopt2"
                                      onChange={handleChange} value="No"

                                      checked={values.PartnerEdit === "No"} />
                                    <label htmlFor="PartnerEditopt2" className="label2">
                                      <span>NO</span>
                                    </label>
                                  </div>
                                </div>
                                {/* switch button style */}


                              </div>
                            </div>
                          </div>
                          {/* First Row Partner */}
                          <div className="row">

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="PartnerIncomeInsurance"
                                className="form-label"
                              >
                                Income Protection Insurance
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="PartnerIncomeInsurance"
                                name='PartnerIncomeInsurance'
                                placeholder="Income Protection Insurance"
                                disabled={values.PartnerEdit === "Yes" ? false : true}
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerIncomeInsurance' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="PartnerIncludeFromYear" className="form-label">
                                Include From Year
                              </label>
                              <Field
                                id="PartnerIncludeFromYear"
                                name='PartnerIncludeFromYear'
                                className="form-select shadow  inputDesign"
                                as='select'
                                disabled={values.PartnerEdit === "Yes" ? false : true}
                              >
                                <option value="">Select</option>
                                <option value="0">0</option>
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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerIncludeFromYear" />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="PartnerUpUntilYear" className="form-label">
                                Up Until Year
                              </label>
                              <Field
                                id="PartnerUpUntilYear"
                                name='PartnerUpUntilYear'
                                className="form-select shadow  inputDesign"
                                as='select'
                                disabled={values.PartnerEdit === "Yes" ? false : true}

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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerUpUntilYear" />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="PartnerIndexation" className="form-label">
                                Indexation
                              </label>
                              <Field
                                id="PartnerIndexation"
                                name='PartnerIndexation'
                                className="form-select shadow  inputDesign"
                                as='select'
                                disabled={values.PartnerEdit === "Yes" ? false : true}

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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerIndexation" />
                            </div>
                          </div>


                          </div>

                          {/*Second Row Partner */}

                          <div className="row">

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label
                                htmlFor="PartnerDeductibleExpenses"
                                className="form-label"
                              >
                                Other Deductible Expenses
                              </label>
                              <Field
                                type="number"
                                className="form-control inputDesign  shadow"
                                id="PartnerDeductibleExpenses"
                                name='PartnerDeductibleExpenses'
                                placeholder="Other Deductible Expenses"
                                disabled={values.PartnerEdit === "Yes" ? false : true}
                              />
                              <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerDeductibleExpenses' />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="PartnerIncludeFromYearDeductible" className="form-label">
                                Include From Year
                              </label>
                              <Field
                                id="PartnerIncludeFromYearDeductible"
                                name='PartnerIncludeFromYearDeductible'
                                className="form-select shadow  inputDesign"
                                as='select'
                                disabled={values.PartnerEdit === "Yes" ? false : true}

                              >
                                <option value="">Select</option>
                                <option value="Existing">Existing</option>
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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerIncludeFromYearDeductible" />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="PartnerUpUntilYearDeductible" className="form-label">
                                Up Until Year
                              </label>
                              <Field
                                id="PartnerUpUntilYearDeductible"
                                name='PartnerUpUntilYearDeductible'
                                className="form-select shadow  inputDesign"
                                as='select'
                                disabled={values.PartnerEdit === "Yes" ? false : true}

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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerUpUntilYearDeductible" />
                            </div>
                          </div>



                          <div className="col-md-3">
                            <div className="mb-3">
                              <label htmlFor="PartnerIndexationDeductible" className="form-label">
                                Indexation
                              </label>
                              <Field
                                id="PartnerIndexationDeductible"
                                name='PartnerIndexationDeductible'
                                className="form-select shadow  inputDesign"
                                as='select'
                                disabled={values.PartnerEdit === "Yes" ? false : true}

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
                              <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerIndexationDeductible" />
                            </div>
                          </div>

                          </div>


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
                            type='button'
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
  )
}

export default OtherDeductibleExpenses;
