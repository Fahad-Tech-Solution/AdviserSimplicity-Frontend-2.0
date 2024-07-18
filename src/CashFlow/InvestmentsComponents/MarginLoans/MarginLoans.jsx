import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./businessTextStructure.css"
import plus from "./images/plus.svg"
import notebook from "./images/notebook.svg"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MarginLoans = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let initialValues = {

    ClientEdit: "No",
    ClientYearLoan: "",
    ClientCurrentLoanBalance: "",
    ClientLoanTerm: "",
    ClientInitialInterest: "",
    ClientDeductibleInterest:"",
    ClientMonthlyContributions:"",
    ClientContributeYear:"",
    ClientContributeUpUntil:"",
    ClientIndexation:"",
    ClientRepayLoan: "",
    
    PartnerEdit: "No",
    PartnerYearLoan: "",
    PartnerCurrentLoanBalance: "",
    PartnerLoanTerm: "",
    PartnerInitialInterest: "",
    PartnerDeductibleInterest:"",
    PartnerMonthlyContributions:"",
    PartnerContributeYear:"",
    PartnerContributeUpUntil:"",
    PartnerIndexation:"",
    PartnerRepayLoan:"",
    
    JointEdit: "No",
    JointYearLoan: "",
    JointCurrentLoanBalance: "",
    JointLoanTerm: "",
    JointInitialInterest: "",
    JointDeductibleInterest:"",
    JointMonthlyContributions:"",
    JointContributeYear:"",
    JointContributeUpUntil:"",
    JointIndexation:"",
    JointRepayLoan:"",
  }

  let validationSchema = Yup.object({
    ClientYearLoan: Yup.string().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    ClientCurrentLoanBalance: Yup.number().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",

        (value) => value > 0
      )
    }),
    ClientLoanTerm: Yup.string().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    ClientInitialInterest: Yup.number().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",

        (value) => value > 0
      ).min(0, 'Too Short!')
      .max(100, 'Must be less than or equal to 100'),
    }),
    ClientDeductibleInterest: Yup.number().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",

        (value) => value > 0
      ).min(0, 'Too Short!')
      .max(100, 'Must be less than or equal to 100'),
    }),
    ClientMonthlyContributions: Yup.number().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",

        (value) => value > 0
      )
    }),
    ClientContributeYear: Yup.string().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    ClientContributeUpUntil: Yup.string().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string()
      .required('Required')
      .test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('ClientContributeYear')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
        }),
      otherwise: Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('ClientContributeYear')));
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),
    ClientIndexation: Yup.string().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    ClientRepayLoan: Yup.string().when('ClientEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),


    PartnerYearLoan: Yup.string().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    PartnerCurrentLoanBalance: Yup.number().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",

        (value) => value > 0
      )
    }),
    PartnerLoanTerm: Yup.string().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    PartnerInitialInterest: Yup.number().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",

        (value) => value > 0
      ).min(0, 'Too Short!')
      .max(100, 'Must be less than or equal to 100'),
    }),
    PartnerDeductibleInterest: Yup.number().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",

        (value) => value > 0
      ).min(0, 'Too Short!')
      .max(100, 'Must be less than or equal to 100'),
    }),
    PartnerMonthlyContributions: Yup.number().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",

        (value) => value > 0
      )
    }),
    PartnerContributeYear: Yup.string().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    PartnerContributeUpUntil: Yup.string().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string()
      .required('Required')
      .test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('PartnerContributeYear')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise:Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('PartnerContributeYear')));
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),
    PartnerIndexation: Yup.string().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    PartnerRepayLoan: Yup.string().when('PartnerEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    
    
    
    JointYearLoan: Yup.string().when('JointEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    JointCurrentLoanBalance: Yup.number().when('JointEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",

        (value) => value > 0
      )
    }),
    JointLoanTerm: Yup.string().when('JointEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    JointInitialInterest: Yup.number().when('JointEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",

        (value) => value > 0
      ).min(0, 'Too Short!')
      .max(100, 'Must be less than or equal to 100'),
    }),
    JointDeductibleInterest: Yup.number().when('JointEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",

        (value) => value > 0
      ).min(0, 'Too Short!')
      .max(100, 'Must be less than or equal to 100'),
    }),
    JointMonthlyContributions: Yup.number().when('JointEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.number().required("Required").test(
        "Is positive?",
        "Must be a positive number",

        (value) => value > 0
      )
    }),
    JointContributeYear: Yup.string().when('JointEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    JointContributeUpUntil: Yup.string().when('JointEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string()
      .required('Required')
      .test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('JointContributeYear')));
        const toYear = parseInt(value);
        return toYear >= fromYear;
      }),
      otherwise:Yup.string().test('is-greater', 'To Year must be greater than From Year', function(value) {
        const fromYear = parseInt(this.resolve(Yup.ref('JointContributeYear')));
        const toYear = parseInt(value);
        return !toYear || toYear >= fromYear;
      }).nullable(true),
    }),
    JointIndexation: Yup.string().when('JointEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
    JointRepayLoan: Yup.string().when('JointEdit', {
      is: (val) => val && val.length == 3,
      then: Yup.string().required("Required")
    }),
  })



  let onSubmit = (values) => {
    console.log(values);

  }
  return (
    <>

      <label htmlFor="" className="form-label">
        Margin Loans
      </label>
      <div>
        <button type="button"
          className="btn btn-outline-success"

          onClick={handleShow}
        >
          <div className="iconContainer mx-1">
            <img className="img-fluid" src={plus} alt="" />

          </div>
          Margin Loans
        </button>


      </div>



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
              Margin Loans
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
                  <div>
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
                          <label htmlFor="ClientYearLoan" className="form-label">
                            Year of Loan
                          </label>
                          <Field
                            id="ClientYearLoan"
                            name='ClientYearLoan'
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientYearLoan" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientCurrentLoanBalance"
                            className="form-label"
                          >
                            Current Loan Balance
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientCurrentLoanBalance"
                            name='ClientCurrentLoanBalance'
                            placeholder="Current Loan Balance"
                            disabled={values.ClientEdit === "Yes" ? false : true}

                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientCurrentLoanBalance' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientLoanTerm" className="form-label">
                            Loan Term
                          </label>
                          <Field
                            id="ClientLoanTerm"
                            name='ClientLoanTerm'
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientLoanTerm" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientInitialInterest"
                            className="form-label"
                          >
                            Initial Interest Rate(p.a)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientInitialInterest"
                            name='ClientInitialInterest'
                            placeholder="Initial Interest Rate(p.a)"
                            disabled={values.ClientEdit === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientInitialInterest' />
                        </div>
                      </div>

                    </div>

                    {/* Second Row Client*/}

                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientDeductibleInterest"
                            className="form-label"
                          >
                            Deductible Interest (%)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientDeductibleInterest"
                            name='ClientDeductibleInterest'
                            placeholder="Deductible Interest (%)"
                            disabled={values.ClientEdit === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientDeductibleInterest' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="ClientMonthlyContributions"
                            className="form-label"
                          >
                            Monthly Contributions(p.a)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="ClientMonthlyContributions"
                            name='ClientMonthlyContributions'
                            placeholder="Monthly Contributions"
                            disabled={values.ClientEdit === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='ClientMonthlyContributions' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientContributeYear" className="form-label">
                            Contribute from Year
                          </label>
                          <Field
                            id="ClientContributeYear"
                            name='ClientContributeYear'
                            className="form-select shadow inputDesign"
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientContributeYear" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientContributeUpUntil" className="form-label">
                            Contribute Up Until
                          </label>
                          <Field
                            id="ClientContributeUpUntil"
                            name='ClientContributeUpUntil'
                            className="form-select shadow inputDesign"
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientContributeUpUntil" />
                        </div>
                      </div>


                    </div>


                    {/* Third Row Client*/}
                    <div className="row">

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

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="ClientRepayLoan" className="form-label">
                            Repay Loan In Year
                          </label>
                          <Field
                            id="ClientRepayLoan"
                            name='ClientRepayLoan'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.ClientEdit === "Yes" ? false : true}

                          >
                            <option value="">Select</option>
                            <option value="NO">NO</option>
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="ClientRepayLoan" />
                        </div>
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
                                checked={values.PartnerEdit == "Yes"} />
                              <label htmlFor="PartnerEditopt1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="PartnerEdit" id="PartnerEditopt2"
                                onChange={handleChange} value="No"

                                checked={values.PartnerEdit == "No"} />
                              <label htmlFor="PartnerEditopt2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}


                        </div>
                      </div>
                    </div>

                    {/* First Row Partner*/}
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerYearLoan" className="form-label">
                            Year of Loan
                          </label>
                          <Field
                            id="PartnerYearLoan"
                            name='PartnerYearLoan'
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerYearLoan" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerCurrentLoanBalance"
                            className="form-label"
                          >
                            Current Loan Balance
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerCurrentLoanBalance"
                            name='PartnerCurrentLoanBalance'
                            placeholder="Current Loan Balance"
                            disabled={values.PartnerEdit === "Yes" ? false : true}

                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerCurrentLoanBalance' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerLoanTerm" className="form-label">
                            Loan Term
                          </label>
                          <Field
                            id="PartnerLoanTerm"
                            name='PartnerLoanTerm'
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerLoanTerm" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerInitialInterest"
                            className="form-label"
                          >
                            Initial Interest Rate(p.a)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerInitialInterest"
                            name='PartnerInitialInterest'
                            placeholder="Initial Interest Rate(p.a)"
                            disabled={values.PartnerEdit === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerInitialInterest' />
                        </div>
                      </div>

                    </div>

                    {/* Second Row Partner*/}

                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerDeductibleInterest"
                            className="form-label"
                          >
                            Deductible Interest (%)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerDeductibleInterest"
                            name='PartnerDeductibleInterest'
                            placeholder="Deductible Interest (%)"
                            disabled={values.PartnerEdit === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerDeductibleInterest' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="PartnerMonthlyContributions"
                            className="form-label"
                          >
                            Monthly Contributions(p.a)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="PartnerMonthlyContributions"
                            name='PartnerMonthlyContributions'
                            placeholder="Monthly Contributions"
                            disabled={values.PartnerEdit === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='PartnerMonthlyContributions' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerContributeYear" className="form-label">
                            Contribute from Year
                          </label>
                          <Field
                            id="PartnerContributeYear"
                            name='PartnerContributeYear'
                            className="form-select shadow inputDesign"
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerContributeYear" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerContributeUpUntil" className="form-label">
                            Contribute Up Until
                          </label>
                          <Field
                            id="PartnerContributeUpUntil"
                            name='PartnerContributeUpUntil'
                            className="form-select shadow inputDesign"
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerContributeUpUntil" />
                        </div>
                      </div>


                    </div>


                    {/* Third Row Partner*/}
                    <div className="row">

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

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="PartnerRepayLoan" className="form-label">
                            Repay Loan In Year
                          </label>
                          <Field
                            id="PartnerRepayLoan"
                            name='PartnerRepayLoan'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.PartnerEdit === "Yes" ? false : true}

                          >
                            <option value="">Select</option>
                            <option value="NO">NO</option>
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="PartnerRepayLoan" />
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* PartnerForm */}



                  <hr />
                  {/* JointForm */}
                  <div>
                    <div classname="row">
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">
                            Joint
                          </label>

                          {/* switch button style */}
                          <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                              <input type="radio" name="JointEdit" id="JointEditopt1"
                                onChange={handleChange} value="Yes"
                                checked={values.JointEdit == "Yes"} />
                              <label htmlFor="JointEditopt1" className="label1">
                                <span>YES</span>
                              </label>
                              <input type="radio" name="JointEdit" id="JointEditopt2"
                                onChange={handleChange} value="No"

                                checked={values.JointEdit == "No"} />
                              <label htmlFor="JointEditopt2" className="label2">
                                <span>NO</span>
                              </label>
                            </div>
                          </div>
                          {/* switch button style */}


                        </div>
                      </div>
                    </div>

                    {/* First Row Joint*/}
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="JointYearLoan" className="form-label">
                            Year of Loan
                          </label>
                          <Field
                            id="JointYearLoan"
                            name='JointYearLoan'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.JointEdit === "Yes" ? false : true}

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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="JointYearLoan" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="JointCurrentLoanBalance"
                            className="form-label"
                          >
                            Current Loan Balance
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="JointCurrentLoanBalance"
                            name='JointCurrentLoanBalance'
                            placeholder="Current Loan Balance"
                            disabled={values.JointEdit === "Yes" ? false : true}

                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='JointCurrentLoanBalance' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="JointLoanTerm" className="form-label">
                            Loan Term
                          </label>
                          <Field
                            id="JointLoanTerm"
                            name='JointLoanTerm'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.JointEdit === "Yes" ? false : true}

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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="JointLoanTerm" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="JointInitialInterest"
                            className="form-label"
                          >
                            Initial Interest Rate(p.a)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="JointInitialInterest"
                            name='JointInitialInterest'
                            placeholder="Initial Interest Rate(p.a)"
                            disabled={values.JointEdit === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='JointInitialInterest' />
                        </div>
                      </div>

                    </div>

                    {/* Second Row Joint*/}

                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="JointDeductibleInterest"
                            className="form-label"
                          >
                            Deductible Interest (%)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="JointDeductibleInterest"
                            name='JointDeductibleInterest'
                            placeholder="Deductible Interest (%)"
                            disabled={values.JointEdit === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='JointDeductibleInterest' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="JointMonthlyContributions"
                            className="form-label"
                          >
                            Monthly Contributions(p.a)
                          </label>
                          <Field
                            type="number"
                            className="form-control inputDesign  shadow"
                            id="JointMonthlyContributions"
                            name='JointMonthlyContributions'
                            placeholder="Monthly Contributions"
                            disabled={values.JointEdit === "Yes" ? false : true}
                          />
                          <ErrorMessage component='div' className="text-danger fw-bold" name='JointMonthlyContributions' />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="JointContributeYear" className="form-label">
                            Contribute from Year
                          </label>
                          <Field
                            id="JointContributeYear"
                            name='JointContributeYear'
                            className="form-select shadow inputDesign"
                            as='select'
                            disabled={values.JointEdit === "Yes" ? false : true}

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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="JointContributeYear" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="JointContributeUpUntil" className="form-label">
                            Contribute Up Until
                          </label>
                          <Field
                            id="JointContributeUpUntil"
                            name='JointContributeUpUntil'
                            className="form-select shadow inputDesign"
                            as='select'
                            disabled={values.JointEdit === "Yes" ? false : true}

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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="JointContributeUpUntil" />
                        </div>
                      </div>


                    </div>


                    {/* Third Row Joint*/}
                    <div className="row">

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="JointIndexation" className="form-label">
                            Indexation
                          </label>
                          <Field
                            id="JointIndexation"
                            name='JointIndexation'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.JointEdit === "Yes" ? false : true}

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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="JointIndexation" />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="JointRepayLoan" className="form-label">
                            Repay Loan In Year
                          </label>
                          <Field
                            id="JointRepayLoan"
                            name='JointRepayLoan'
                            className="form-select shadow  inputDesign"
                            as='select'
                            disabled={values.JointEdit === "Yes" ? false : true}

                          >
                            <option value="">Select</option>
                            <option value="NO">NO</option>
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
                          <ErrorMessage component='div' className='text-danger fw-bold' name="JointRepayLoan" />
                        </div>
                      </div>

                    </div>

                  </div>
                  {/* JointForm */}







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


    </>
  )
}

export default MarginLoans;
